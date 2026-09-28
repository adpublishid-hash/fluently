const { pool } = require('../db');
const { adminUser, normalizePlanExpiresAt, productPayload } = require('../lib/domain');
const { defaultShopSettings, getShopSettings } = require('../lib/shopSettings');
const { requireAdmin } = require('../middleware/auth');

module.exports = function register(app) {
  // ── Admin ─────────────────────────────────────────────────
  app.get('/api/admin/summary', requireAdmin, async (_req, res) => {
    try {
      const [users, proUsers, products, orders, revenue] = await Promise.all([
        pool.query('SELECT COUNT(*)::int AS count FROM users'),
        pool.query("SELECT COUNT(*)::int AS count FROM users WHERE plan in ('pro', 'lifetime')"),
        pool.query('SELECT COUNT(*)::int AS count FROM shop_products WHERE active = true'),
        pool.query('SELECT COUNT(*)::int AS count FROM shop_orders'),
        pool.query("SELECT COALESCE(SUM(total), 0)::int AS total FROM shop_orders WHERE payment_status = 'paid'"),
      ]);

      res.json({
        users: users.rows[0].count,
        proUsers: proUsers.rows[0].count,
        products: products.rows[0].count,
        orders: orders.rows[0].count,
        paidRevenue: revenue.rows[0].total,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/api/admin/users', requireAdmin, async (_req, res) => {
    try {
      const result = await pool.query(
        `SELECT id, name, email, phone, role, plan, plan_expires_at, status, onboarding_completed, persona, created_at, updated_at, last_login_at
         FROM users
         ORDER BY created_at DESC`
      );
      res.json({ users: result.rows.map(adminUser) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.patch('/api/admin/users/:id', requireAdmin, async (req, res) => {
    const { name, role, plan, status, planExpiresAt } = req.body || {};
    const hasOwn = (key) => Object.prototype.hasOwnProperty.call(req.body || {}, key);
    const validRoles = new Set(['user', 'admin']);
    const validPlans = new Set(['free', 'pro', 'lifetime']);
    const validStatuses = new Set(['active', 'suspended']);

    if (hasOwn('role') && !validRoles.has(role)) {
      return res.status(400).json({ error: 'Role tidak valid' });
    }
    if (hasOwn('plan') && !validPlans.has(plan)) {
      return res.status(400).json({ error: 'Plan tidak valid' });
    }
    if (hasOwn('status') && !validStatuses.has(status)) {
      return res.status(400).json({ error: 'Status tidak valid' });
    }

    try {
      const currentResult = await pool.query(
        `SELECT id, name, role, plan, status, plan_expires_at
           FROM users
          WHERE id = $1`,
        [req.params.id],
      );

      if (!currentResult.rows.length) return res.status(404).json({ error: 'User not found' });

      const current = currentResult.rows[0];
      const safeName = hasOwn('name') ? (String(name || '').trim() || current.name) : current.name;
      const safeRole = hasOwn('role') ? role : (current.role || 'user');
      const safePlan = hasOwn('plan') ? plan : (current.plan || 'free');
      const safeStatus = hasOwn('status') ? status : (current.status || 'active');
      const safePlanExpiresAt = (hasOwn('plan') || hasOwn('planExpiresAt'))
        ? normalizePlanExpiresAt(safePlan, planExpiresAt)
        : current.plan_expires_at;

      const result = await pool.query(
        `UPDATE users
         SET name = $1,
             role = $2,
             plan = $3,
             status = $4,
             plan_expires_at = $5,
             updated_at = now()
         WHERE id = $6
         RETURNING id, name, email, phone, role, plan, plan_expires_at, status, onboarding_completed, persona, created_at, updated_at, last_login_at`,
        [safeName, safeRole, safePlan, safeStatus, safePlanExpiresAt, req.params.id]
      );

      res.json({ success: true, user: adminUser(result.rows[0]) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/api/admin/shop/products', requireAdmin, async (_req, res) => {
    try {
      res.set('Cache-Control', 'no-store');
      const result = await pool.query('SELECT id, data, active FROM shop_products ORDER BY updated_at DESC');
      res.json({ products: result.rows.map(productPayload) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.post('/api/admin/shop/products', requireAdmin, async (req, res) => {
    const { id, active = true, ...data } = req.body;
    if (!id || !data.title || !data.price) return res.status(400).json({ error: 'Product id, title, and price are required' });

    try {
      const result = await pool.query(
        `INSERT INTO shop_products (id, data, active)
         VALUES ($1, $2::jsonb, $3)
         ON CONFLICT (id) DO UPDATE SET data = excluded.data, active = excluded.active, updated_at = now()
         RETURNING id, data, active`,
        [id, JSON.stringify(data), Boolean(active)]
      );
      res.json({ success: true, product: productPayload(result.rows[0]) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.patch('/api/admin/shop/products/:id', requireAdmin, async (req, res) => {
    const { active, ...patch } = req.body;

    try {
      const current = await pool.query('SELECT id, data, active FROM shop_products WHERE id = $1', [req.params.id]);
      if (!current.rows.length) return res.status(404).json({ error: 'Product not found' });

      const nextData = { ...current.rows[0].data, ...patch };
      const result = await pool.query(
        `UPDATE shop_products
         SET data = $1::jsonb,
             active = COALESCE($2, active),
             updated_at = now()
         WHERE id = $3
         RETURNING id, data, active`,
        [JSON.stringify(nextData), typeof active === 'boolean' ? active : null, req.params.id]
      );
      res.json({ success: true, product: productPayload(result.rows[0]) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.delete('/api/admin/shop/products/:id', requireAdmin, async (req, res) => {
    try {
      const result = await pool.query(
        'DELETE FROM shop_products WHERE id = $1 RETURNING id, data, active',
        [req.params.id]
      );
      if (!result.rows.length) return res.status(404).json({ error: 'Product not found' });
      res.json({ success: true, product: productPayload(result.rows[0]) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/api/admin/shop/orders', requireAdmin, async (_req, res) => {
    try {
      const result = await pool.query('SELECT * FROM shop_orders ORDER BY created_at DESC');
      res.json({ orders: result.rows });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/api/admin/shop/settings', requireAdmin, async (_req, res) => {
    try {
      const settings = await getShopSettings();
      res.json({ settings });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.put('/api/admin/shop/settings', requireAdmin, async (req, res) => {
    const next = { ...defaultShopSettings, ...(req.body || {}) };
    try {
      const result = await pool.query(
        `INSERT INTO shop_settings (key, value, updated_at)
         VALUES ('shipping', $1::jsonb, now())
         ON CONFLICT (key) DO UPDATE SET value = excluded.value, updated_at = now()
         RETURNING value`,
        [JSON.stringify(next)]
      );
      res.json({ success: true, settings: result.rows[0].value });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.patch('/api/admin/shop/orders/:id', requireAdmin, async (req, res) => {
    const { status, paymentStatus } = req.body;

    try {
      const result = await pool.query(
        `UPDATE shop_orders
         SET status = COALESCE($1, status),
             payment_status = COALESCE($2, payment_status),
             updated_at = now()
         WHERE id = $3
         RETURNING *`,
        [status || null, paymentStatus || null, req.params.id]
      );
      if (!result.rows.length) return res.status(404).json({ error: 'Order not found' });
      res.json({ success: true, order: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
};
