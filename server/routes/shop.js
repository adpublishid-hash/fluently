const { ONESENDER_ADMIN_PHONE, ORDER_NOTIFY_EMAIL, QRIS_IMAGE_URL, RAJAONGKIR_BASE, RAJAONGKIR_KEY } = require('../config');
const { pool } = require('../db');
const { getServerEffectivePlan, getShopBasePrice, getShopDiscountPercent, getShopItemWeight, getShopProductVariant, getShopUnitPrice, isPhysicalShopProduct, normalizeEmail, productPayload } = require('../lib/domain');
const { buildOrderEmailHtml, buildOrderWaText, sendEmail, sendWhatsApp } = require('../lib/notify');
const { getShopSettings } = require('../lib/shopSettings');
const { optionalAuth } = require('../middleware/auth');

module.exports = function register(app) {
  // ── Public shop settings ──────────────────────────────────
  app.get('/api/shop/settings', async (_req, res) => {
    try {
      const settings = await getShopSettings();
      // Public reveals only what the storefront needs.
      res.json({
        origin: settings.origin,
        sender: { name: settings.sender?.name, phone: settings.sender?.phone },
        confirmWhatsApp: settings.notifyAdminWhatsApp || settings.sender?.phone || '',
        defaultWeightGrams: settings.defaultWeightGrams || 500,
        couriers: settings.couriers || [],
        qrisImage: QRIS_IMAGE_URL,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // ── RajaOngkir (Komerce) proxy ───────────────────────────
  async function komerceRequest(pathname, { method = 'GET', searchParams = null, body = null } = {}) {
    const url = new URL(`${RAJAONGKIR_BASE}${pathname}`);
    if (searchParams) {
      for (const [k, v] of Object.entries(searchParams)) {
        if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
      }
    }
    const headers = { key: RAJAONGKIR_KEY, accept: 'application/json' };
    let payload = null;
    if (body) {
      headers['content-type'] = 'application/x-www-form-urlencoded';
      payload = new URLSearchParams(body).toString();
    }
    const res = await fetch(url.toString(), { method, headers, body: payload });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || data.meta?.status !== 'success') {
      const msg = data?.meta?.message || `RajaOngkir error (HTTP ${res.status})`;
      const error = new Error(msg);
      error.status = data?.meta?.code || res.status;
      throw error;
    }
    return data.data;
  }

  // Search-as-you-type destination (province/city/district/subdistrict + zipcode in one row).
  app.get('/api/shop/rajaongkir/search', async (req, res) => {
    const keyword = String(req.query.keyword || '').trim();
    if (keyword.length < 3) return res.json({ results: [] });
    try {
      const results = await komerceRequest('/destination/domestic-destination', {
        searchParams: { search: keyword, limit: 12, offset: 0 },
      });
      res.json({ results });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/shop/rajaongkir/cost', async (req, res) => {
    const { destination, weight, courier } = req.body || {};
    if (!destination || !weight || !courier) {
      return res.status(400).json({ error: 'destination, weight, courier are required' });
    }
    try {
      const settings = await getShopSettings();
      const originId = settings.origin?.destinationId;
      if (!originId) {
        return res.status(400).json({ error: 'Origin location belum dikonfigurasi admin.' });
      }
      const results = await komerceRequest('/calculate/domestic-cost', {
        method: 'POST',
        body: {
          origin: originId,
          destination,
          weight,
          courier,
        },
      });
      res.json({ results });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ── Public shop ───────────────────────────────────────────
  app.get('/api/shop/products', async (_req, res) => {
    try {
      res.set('Cache-Control', 'no-store');
      const result = await pool.query('SELECT id, data, active FROM shop_products WHERE active = true ORDER BY created_at ASC');
      res.json({ products: result.rows.map(productPayload) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/api/shop/products/:id', async (req, res) => {
    try {
      const result = await pool.query('SELECT id, data, active FROM shop_products WHERE id = $1 AND active = true', [req.params.id]);
      if (!result.rows.length) return res.status(404).json({ error: 'Product not found' });
      res.json({ product: productPayload(result.rows[0]) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.post('/api/shop/orders', optionalAuth, async (req, res) => {
    const {
      customerEmail,
      customerName,
      items,
      shippingAddress,
      shippingMethod,
      paymentMethod,
      paymentFee = 0,
    } = req.body;

    if (!customerEmail || !customerName || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order customer and items are required' });
    }

    const normalizedCustomerEmail = normalizeEmail(customerEmail);
    if (!/.+@.+\..+/.test(normalizedCustomerEmail)) {
      return res.status(400).json({ error: 'Customer email tidak valid' });
    }

    if (paymentMethod && paymentMethod !== 'qris') {
      return res.status(400).json({ error: 'Payment method tidak didukung' });
    }

    const safePaymentFee = Number(paymentFee);
    if (!Number.isInteger(safePaymentFee) || safePaymentFee < 100 || safePaymentFee > 999) {
      return res.status(400).json({ error: 'Kode unik pembayaran tidak valid' });
    }

    // Validate items structure
    for (const it of items) {
      if (!it.productId || !Number.isInteger(Number(it.quantity)) || Number(it.quantity) < 1 || Number(it.quantity) > 99) {
        return res.status(400).json({ error: 'Setiap item harus punya productId dan quantity valid' });
      }
    }

    // Fetch authoritative prices from DB — never trust client-submitted prices
    const productIds = [...new Set(items.map((it) => it.productId))];
    const productRows = await pool.query(
      `SELECT id, data FROM shop_products WHERE id = ANY($1) AND active = true`,
      [productIds],
    ).catch(() => ({ rows: [] }));
    const productMap = new Map();
    for (const row of productRows.rows) {
      productMap.set(row.id, { ...row.data, id: row.id });
    }

    // Verify all products exist and build enriched items with server-side price.
    const plan = getServerEffectivePlan(req.user);
    const enrichedItems = [];
    let hasPhysicalItem = false;
    let totalWeight = 0;
    for (const it of items) {
      const product = productMap.get(it.productId);
      if (!product) {
        return res.status(400).json({ error: `Produk ${it.productId} tidak ditemukan atau sudah tidak aktif` });
      }

      const variant = getShopProductVariant(product, it.variantId);
      const quantity = Number(it.quantity);
      const originalPrice = getShopBasePrice(product, it.variantId);
      const price = getShopUnitPrice(product, it.variantId, plan);
      const memberDiscountPercent = getShopDiscountPercent(product, plan);
      if (isPhysicalShopProduct(product)) {
        hasPhysicalItem = true;
        totalWeight += getShopItemWeight(product, it.variantId) * quantity;
      }

      enrichedItems.push({
        productId: product.id,
        variantId: it.variantId || undefined,
        variantName: variant?.name || '',
        title: product.title,
        price,
        originalPrice,
        memberDiscountPercent,
        quantity,
      });
    }

    const subtotal = enrichedItems.reduce((sum, it) => sum + it.price * Number(it.quantity), 0);
    let verifiedShippingMethod = null;
    let verifiedShippingCost = 0;

    if (hasPhysicalItem) {
      const destination = Number(shippingAddress?.districtId);
      const requestedShippingId = String(shippingMethod?.id || '').trim();
      const [requestedCourier, ...serviceParts] = requestedShippingId.split('-');
      const requestedService = serviceParts.join('-');
      if (!destination || !requestedCourier || !requestedService) {
        return res.status(400).json({ error: 'Metode pengiriman tidak valid atau sudah kedaluwarsa' });
      }

      try {
        const settings = await getShopSettings();
        const originId = settings.origin?.destinationId;
        if (!originId) {
          return res.status(400).json({ error: 'Origin location belum dikonfigurasi admin.' });
        }
        const allowedCouriers = Array.isArray(settings.couriers) ? settings.couriers : [];
        if (allowedCouriers.length && !allowedCouriers.includes(requestedCourier)) {
          return res.status(400).json({ error: 'Kurir tidak tersedia' });
        }
        const shippingRows = await komerceRequest('/calculate/domestic-cost', {
          method: 'POST',
          body: {
            origin: originId,
            destination,
            weight: Math.max(totalWeight, 1000),
            courier: requestedCourier,
          },
        });
        const matched = (Array.isArray(shippingRows) ? shippingRows : []).find((row) =>
          String(row.code || '').toLowerCase() === requestedCourier.toLowerCase() &&
          String(row.service || '') === requestedService
        );
        if (!matched) {
          return res.status(400).json({ error: 'Layanan pengiriman tidak tersedia lagi. Hitung ulang ongkir.' });
        }
        verifiedShippingCost = Number(matched.cost || 0);
        verifiedShippingMethod = {
          id: `${String(matched.code || requestedCourier).toLowerCase()}-${matched.service}`,
          name: `${String(matched.code || requestedCourier).toUpperCase()} ${matched.service}`,
          description: matched.description || matched.name || '',
          cost: verifiedShippingCost,
          eta: matched.etd ? `${matched.etd}` : '',
          icon: 'package',
        };
      } catch (err) {
        console.error('[order-shipping-verify]', err.message);
        return res.status(502).json({ error: 'Gagal memverifikasi ongkir. Coba ulangi checkout.' });
      }
    } else {
      verifiedShippingMethod = {
        id: 'instant',
        name: 'Instant Delivery (Digital)',
        description: 'For eBooks & eCourses',
        cost: 0,
        eta: 'Within minutes',
        icon: 'instant',
      };
    }

    const total = subtotal + verifiedShippingCost + safePaymentFee;
    const orderId = `FLY-${Date.now().toString().slice(-8)}`;

    try {
      const result = await pool.query(
        `INSERT INTO shop_orders (
          id, user_id, customer_email, customer_name, payment_method,
          shipping_address, shipping_method, items, subtotal, shipping_cost, payment_fee, total
        )
        VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8::jsonb, $9, $10, $11, $12)
        RETURNING *`,
        [
          orderId,
          req.user?.id || null,
          normalizedCustomerEmail,
          String(customerName).trim().slice(0, 120),
          paymentMethod || 'qris',
          JSON.stringify(shippingAddress || {}),
          JSON.stringify(verifiedShippingMethod),
          JSON.stringify(enrichedItems),
          Number(subtotal),
          verifiedShippingCost,
          safePaymentFee,
          total,
        ]
      );

      const order = result.rows[0];

      // Send order detail notifications (email + WhatsApp via OneSender) — fire and forget.
      (async () => {
        try {
          const settings = await getShopSettings().catch(() => ({}));
          const adminEmail = settings.notifyAdminEmail || ORDER_NOTIFY_EMAIL;
          const adminWa = settings.notifyAdminWhatsApp || ONESENDER_ADMIN_PHONE;
          const customerPhone = order.shipping_address?.phone || '';

          await Promise.all([
            sendEmail({
              to: order.customer_email,
              subject: `Rincian Pesanan ${order.id} · Fluently Shop`,
              html: buildOrderEmailHtml(order, 'customer'),
            }),
            sendEmail({
              to: adminEmail,
              subject: `[Order Baru] ${order.id} · ${order.customer_name}`,
              html: buildOrderEmailHtml(order, 'admin'),
            }),
            customerPhone ? sendWhatsApp({
              to: customerPhone,
              message: buildOrderWaText(order, 'customer'),
            }) : Promise.resolve({ sent: false, reason: 'no customer phone' }),
            adminWa ? sendWhatsApp({
              to: adminWa,
              message: buildOrderWaText(order, 'admin'),
            }) : Promise.resolve({ sent: false, reason: 'no admin wa' }),
          ]);
        } catch (err) {
          console.error('[order-notify]', err.message);
        }
      })();

      res.json({ success: true, order });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
};
