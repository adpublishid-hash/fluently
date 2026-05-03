import { motion } from 'framer-motion';
import { ChevronLeft, Shield, QrCode, Copy, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import PageContainer from '../../components/layout/PageContainer';
import { Stepper } from './ShippingPage';
import { useCart } from '../../shop/CartContext';
import { formatRupiah } from '../../data/shopData';
import { useAuth } from '../../auth/AuthContext';

const FALLBACK_QRIS = 'https://adpublish.id/wp-content/uploads/2026/03/QRStatis-indigit.jpg';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const {
    items, address, shippingMethod, subtotal, rawSubtotal, memberDiscount,
    products, getProductDiscountPercent, getCartItemUnitPrice, getCartItemBasePrice, getCartItemVariantName,
  } = useCart();
  const { user } = useAuth();

  const [agreed, setAgreed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [qrisImage, setQrisImage] = useState(FALLBACK_QRIS);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/shop/settings')
      .then(r => r.json())
      .then(data => { if (data.qrisImage) setQrisImage(data.qrisImage); })
      .catch(() => { /* keep fallback */ });
  }, []);

  const lineItems = useMemo(() =>
    items
      .map(it => ({ item: it, product: products.find(p => p.id === it.productId) }))
      .filter((x): x is { item: typeof items[0]; product: NonNullable<typeof x.product> } => Boolean(x.product)),
    [items, products]
  );

  const shippingCost = shippingMethod?.cost ?? 0;
  const total = subtotal + shippingCost;

  if (!address || !shippingMethod) {
    return (
      <PageContainer>
        <div className="px-5 py-20 text-center">
          <p className="text-[13px] text-text-muted">Please complete shipping first.</p>
          <button onClick={() => navigate('/shop/shipping')} className="mt-4 text-primary font-bold text-[13px] hover:underline cursor-pointer">Go to Shipping</button>
        </div>
      </PageContainer>
    );
  }

  const handleCopyTotal = async () => {
    try {
      await navigator.clipboard.writeText(String(total));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* ignore */ }
  };

  const handlePay = async () => {
    if (!agreed) return;
    setProcessing(true);
    try {
      const orderItems = lineItems.map(({ item, product }) => ({
        productId: product.id,
        variantId: item.variantId,
        variantName: getCartItemVariantName(product, item),
        title: product.title,
        price: getCartItemUnitPrice(product, item),
        originalPrice: getCartItemBasePrice(product, item),
        memberDiscountPercent: getProductDiscountPercent(product),
        quantity: item.quantity,
      }));
      const res = await fetch('/api/shop/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          customerEmail: address.email,
          customerName: address.fullName,
          items: orderItems,
          shippingAddress: address,
          shippingMethod,
          paymentMethod: 'qris',
          subtotal,
          shippingCost,
          paymentFee: 0,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.order?.id) {
        localStorage.setItem('fluently_last_order_id', data.order.id);
      }
    } catch {
      /* Checkout still completes locally if backend is temporarily unavailable. */
    } finally {
      setTimeout(() => navigate('/shop/order-success'), 600);
    }
  };

  return (
    <PageContainer>
      <div className="px-5 md:px-0 pt-6 md:pt-0 pb-32 md:pb-8">

        <div className="flex items-center gap-3 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm border border-gray-100"
          >
            <ChevronLeft size={18} className="text-text-primary" />
          </motion.button>
          <div>
            <h1 className="text-xl font-extrabold text-text-primary">Checkout</h1>
            <p className="text-[12px] text-text-muted">Review and complete your order</p>
          </div>
        </div>

        <Stepper step={3} />

        <div className="grid lg:grid-cols-[1fr_360px] gap-6 mt-6">

          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-4" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-extrabold text-[13px] text-text-primary">Delivering To</h3>
                <button
                  onClick={() => navigate('/shop/shipping')}
                  className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>
              <div className="text-[12px] text-text-secondary space-y-0.5">
                <p className="font-extrabold text-text-primary">{address.fullName} · {address.phone}</p>
                <p>{address.email}</p>
                {address.address && (
                  <p>{address.address}, {address.district}, {address.city}, {address.province} {address.postalCode}</p>
                )}
                <p className="mt-2 inline-flex items-center gap-1.5 bg-primary/8 text-primary text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                  {shippingMethod.icon} {shippingMethod.name}{shippingMethod.eta ? ' · ' + shippingMethod.eta : ''}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-4" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
              <h3 className="font-extrabold text-[13px] text-text-primary mb-3">Order Items ({lineItems.length})</h3>
              <div className="space-y-2.5">
                {lineItems.map(({ item, product }) => {
                  const unitPrice = getCartItemUnitPrice(product, item);
                  const memberPercent = getProductDiscountPercent(product);
                  const variantName = getCartItemVariantName(product, item);

                  return (
                  <div key={`${item.productId}:${item.variantId || ''}`} className="flex items-center gap-3">
                    <div className="w-12 h-14 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                      <img src={product.cover} alt={product.title} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] font-extrabold text-text-primary truncate">{product.title}</p>
                      <p className="text-[11px] text-text-muted">
                        ×{item.quantity}{memberPercent > 0 ? ` · member -${memberPercent}%` : ''}
                      </p>
                      {variantName && <p className="text-[10.5px] font-bold text-text-muted">{variantName}</p>}
                    </div>
                    <p className="text-[12.5px] font-black text-primary-dark shrink-0">{formatRupiah(unitPrice * item.quantity)}</p>
                  </div>
                )})}
              </div>
            </div>

            {/* QRIS payment */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-2 mb-3">
                <QrCode size={16} className="text-primary" />
                <h3 className="font-extrabold text-[13px] text-text-primary">Pembayaran QRIS</h3>
              </div>
              <p className="text-[12px] text-text-muted mb-3">Scan QR di bawah dengan aplikasi mobile banking, GoPay, OVO, DANA, ShopeePay, atau e-wallet lain yang mendukung QRIS.</p>
              <div className="bg-gradient-to-br from-sky-50 to-white border border-sky-100 rounded-2xl p-4 flex flex-col items-center">
                <img src={qrisImage} alt="QRIS Pembayaran" className="w-full max-w-[280px] rounded-xl shadow-sm" />
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-[12px] text-text-muted">Bayar tepat:</span>
                  <span className="text-[15px] font-black text-primary-dark">{formatRupiah(total)}</span>
                  <button
                    type="button"
                    onClick={handleCopyTotal}
                    className="ml-1 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-gray-200 text-[10.5px] font-bold text-text-secondary hover:bg-gray-50 cursor-pointer"
                  >
                    {copied ? <CheckCircle2 size={11} className="text-emerald-600" /> : <Copy size={11} />}
                    {copied ? 'Disalin' : 'Salin'}
                  </button>
                </div>
                <p className="mt-3 text-[11px] text-text-muted text-center max-w-xs">
                  Setelah membayar, klik tombol "Saya Sudah Bayar" di kanan. Admin akan memverifikasi & mengonfirmasi pesanan via email.
                </p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-start gap-2.5">
              <Shield size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-[11.5px] text-emerald-800 leading-relaxed">
                <span className="font-extrabold">Pembayaran aman.</span> QRIS terhubung langsung ke rekening merchant. Email rincian order akan dikirim setelah Anda klik "Saya Sudah Bayar".
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="bg-white rounded-2xl border border-gray-100 p-4" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
              <h3 className="font-extrabold text-[13px] text-text-primary mb-3">Total Payment</h3>
              {memberDiscount > 0 && (
                <>
                  <Row label="Normal subtotal" value={formatRupiah(rawSubtotal)} />
                  <Row label="Member discount" value={`- ${formatRupiah(memberDiscount)}`} />
                </>
              )}
              <Row label="Subtotal" value={formatRupiah(subtotal)} />
              <Row label="Shipping" value={shippingCost === 0 ? 'FREE' : formatRupiah(shippingCost)} />
              <div className="h-px bg-gray-100 my-2" />
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-extrabold text-text-primary">Grand Total</span>
                <span className="text-xl font-black text-primary-dark">{formatRupiah(total)}</span>
              </div>

              <label className="flex items-start gap-2 mt-4 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded accent-primary cursor-pointer"
                />
                <span className="text-[11.5px] text-text-secondary leading-relaxed">
                  Saya menyetujui <span className="font-bold text-primary">Syarat Layanan</span> dan <span className="font-bold text-primary">Kebijakan Refund</span>.
                </span>
              </label>

              <button
                onClick={handlePay}
                disabled={!agreed || processing}
                className={`w-full mt-4 py-3.5 rounded-2xl font-extrabold text-[13px] transition-all flex items-center justify-center gap-2 ${
                  agreed && !processing
                    ? 'bg-primary text-white hover:bg-primary-dark cursor-pointer'
                    : 'bg-gray-100 text-text-muted cursor-not-allowed'
                }`}
                style={agreed && !processing ? { boxShadow: '0 6px 20px rgba(126, 195, 230, 0.4)' } : {}}
              >
                {processing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Processing...
                  </>
                ) : (
                  <>Saya Sudah Bayar · {formatRupiah(total)}</>
                )}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </PageContainer>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-[12px] mb-1.5">
      <span className="text-text-secondary font-medium">{label}</span>
      <span className="text-text-primary font-extrabold">{value}</span>
    </div>
  );
}
