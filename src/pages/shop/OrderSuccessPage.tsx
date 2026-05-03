import { motion } from 'framer-motion';
import { CheckCircle2, Home, Package, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useRef } from 'react';
import PageContainer from '../../components/layout/PageContainer';
import { useCart } from '../../shop/CartContext';
import { formatRupiah } from '../../data/shopData';
import { Stepper } from './ShippingPage';

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const { items, subtotal, shippingMethod, shippingCost, address, clearCart, products, getProductPrice } = useCart();

  /* Snapshot the order before clearing cart */
  const snapshotRef = useRef<{
    items: typeof items;
    subtotal: number;
    shippingCost: number;
    shippingMethodName: string | undefined;
    addressName: string | undefined;
    email: string | undefined;
    orderNumber: string;
  } | null>(null);

  if (snapshotRef.current === null) {
    snapshotRef.current = {
      items,
      subtotal,
      shippingCost,
      shippingMethodName: shippingMethod?.name,
      addressName: address?.fullName,
      email: address?.email,
      orderNumber: `FLY-${Date.now().toString().slice(-8)}`,
    };
  }

  const snap = snapshotRef.current;
  const total = snap.subtotal + snap.shippingCost;

  const lineItems = useMemo(() =>
    snap.items
      .map(it => ({ item: it, product: products.find(p => p.id === it.productId) }))
      .filter((x): x is { item: typeof items[0]; product: NonNullable<typeof x.product> } => Boolean(x.product)),
    [snap.items, items]
  );

  /* Clear cart on mount, runs once */
  useEffect(() => {
    clearCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer>
      <div className="px-5 md:px-0 pt-6 md:pt-0 pb-32 md:pb-8">

        <Stepper step={4} />

        {/* Hero */}
        <motion.div
          className="mt-7 bg-white rounded-3xl border border-gray-100 p-6 md:p-8 text-center relative overflow-hidden"
          style={{ boxShadow: 'var(--shadow-card)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100/40 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          </div>

          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, delay: 0.1 }}
            className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 border border-emerald-200 flex items-center justify-center"
          >
            <CheckCircle2 size={42} className="text-emerald-600" />
          </motion.div>

          <h1 className="text-2xl md:text-3xl font-black text-text-primary mt-5">Order Confirmed!</h1>
          <p className="text-[13px] text-text-secondary mt-2 max-w-md mx-auto leading-relaxed">
            Thank you{snap.addressName ? `, ${snap.addressName}` : ''}! Your order is being processed. A receipt has been sent to{' '}
            <span className="font-extrabold text-text-primary">{snap.email ?? 'your email'}</span>.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-2 rounded-2xl">
            <Package size={14} />
            <span className="text-[12px] font-extrabold">Order #{snap.orderNumber}</span>
          </div>
        </motion.div>

        {/* Recap */}
        <div className="mt-5 grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-4" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
            <h3 className="font-extrabold text-[13px] text-text-primary mb-3">Items</h3>
            <div className="space-y-2.5">
              {lineItems.map(({ item, product }) => (
                <div key={item.productId} className="flex items-center gap-3">
                  <div className="w-11 h-12 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                    <img src={product.cover} alt={product.title} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12.5px] font-extrabold text-text-primary truncate">{product.title}</p>
                    <p className="text-[11px] text-text-muted">×{item.quantity}</p>
                  </div>
                  <p className="text-[12.5px] font-black text-primary-dark">{formatRupiah(getProductPrice(product) * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
            <h3 className="font-extrabold text-[13px] text-text-primary mb-3">Summary</h3>
            <Row label="Subtotal" value={formatRupiah(snap.subtotal)} />
            <Row label="Shipping" value={snap.shippingCost === 0 ? 'FREE' : formatRupiah(snap.shippingCost)} />
            <div className="h-px bg-gray-100 my-2" />
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-extrabold text-text-primary">Total Paid</span>
              <span className="text-xl font-black text-primary-dark">{formatRupiah(total)}</span>
            </div>
            {snap.shippingMethodName && (
              <p className="text-[11px] text-text-muted mt-3">
                Delivery: <span className="font-bold text-text-primary">{snap.shippingMethodName}</span>
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => navigate('/shop')}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary text-white font-extrabold text-[13px] hover:bg-primary-dark transition-colors cursor-pointer"
            style={{ boxShadow: '0 6px 20px rgba(126, 195, 230, 0.4)' }}
          >
            Continue Shopping
            <ArrowRight size={14} />
          </button>
          <button
            onClick={() => navigate('/modul')}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white border border-gray-100 text-text-primary font-extrabold text-[13px] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Home size={14} />
            Back to Home
          </button>
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
