import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import PageContainer from '../../components/layout/PageContainer';
import { useCart } from '../../shop/CartContext';
import { formatRupiah } from '../../data/shopData';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    items, updateQty, removeItem, subtotal, rawSubtotal, memberDiscount,
    itemCount, clearCart, products, getProductDiscountPercent, getCartItemUnitPrice, getCartItemVariantName,
  } = useCart();
  const [promo, setPromo] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

  const lineItems = useMemo(() =>
    items
      .map(it => ({ item: it, product: products.find(p => p.id === it.productId) }))
      .filter((x): x is { item: typeof items[0]; product: NonNullable<typeof x.product> } => Boolean(x.product)),
    [items]
  );

  const discountAmount = appliedPromo?.discount ?? 0;
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (!code) return;
    if (code === 'FLUENTLY10') {
      setAppliedPromo({ code, discount: Math.round(subtotal * 0.1) });
    } else if (code === 'WELCOME50K') {
      setAppliedPromo({ code, discount: 50000 });
    } else {
      setAppliedPromo({ code, discount: 0 });
    }
  };

  if (lineItems.length === 0) {
    return (
      <PageContainer>
        <div className="px-5 md:px-0 pt-6 md:pt-0 pb-8">
          <div className="flex items-center gap-3 mb-8">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm border border-gray-100"
            >
              <ChevronLeft size={18} className="text-text-primary" />
            </motion.button>
            <h1 className="text-xl font-extrabold text-text-primary">Your Cart</h1>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 py-16 text-center" style={{ boxShadow: 'var(--shadow-card)' }}>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring' }}
              className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto mb-4"
            >
              <ShoppingBag size={32} className="text-primary/70" />
            </motion.div>
            <h3 className="font-extrabold text-[15px] text-text-primary mb-1">Your cart is empty</h3>
            <p className="text-[12.5px] text-text-muted mb-6 max-w-[260px] mx-auto">Browse our shop and find your next learning companion</p>
            <button
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white font-extrabold text-[13px] hover:bg-primary-dark cursor-pointer"
              style={{ boxShadow: '0 4px 16px rgba(126, 195, 230, 0.35)' }}
            >
              Browse Shop
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="px-5 md:px-0 pt-6 md:pt-0 pb-32 md:pb-8">

        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm border border-gray-100"
            >
              <ChevronLeft size={18} className="text-text-primary" />
            </motion.button>
            <div>
              <h1 className="text-xl font-extrabold text-text-primary">Your Cart</h1>
              <p className="text-[12px] text-text-muted">{itemCount} items</p>
            </div>
          </div>
          <button
            onClick={() => clearCart()}
            className="text-[11.5px] font-bold text-red-500 hover:text-red-600 px-3 py-1.5 rounded-xl hover:bg-red-50 cursor-pointer"
          >
            Clear all
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">

          {/* ── Items ── */}
          <div className="space-y-3">
            <AnimatePresence>
              {lineItems.map(({ item, product }) => {
                const memberPercent = getProductDiscountPercent(product);
                const unitPrice = getCartItemUnitPrice(product, item);
                const variantName = getCartItemVariantName(product, item);
                const itemKey = `${item.productId}:${item.variantId || ''}`;

                return (
                <motion.div
                  key={itemKey}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl border border-gray-100 p-3 flex gap-3"
                  style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
                >
                  <button
                    onClick={() => navigate(`/shop/product/${product.id}`)}
                    className="w-20 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0 cursor-pointer"
                  >
                    <img src={product.cover} alt={product.title} loading="lazy" className="w-full h-full object-cover" />
                  </button>

                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="inline-block text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary mb-1">
                          {product.type}
                        </span>
                        <h3 className="font-extrabold text-[13px] text-text-primary line-clamp-2 leading-tight">{product.title}</h3>
                        <p className="text-[11px] text-text-muted mt-0.5 truncate">{product.author}</p>
                        {variantName && (
                          <p className="mt-1 inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-black text-text-secondary">
                            {variantName}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="mt-auto pt-2 flex items-center justify-between">
                      <div className="inline-flex items-center bg-gray-50 rounded-xl border border-gray-100">
                        <button
                          onClick={() => updateQty(item.productId, item.quantity - 1, item.variantId)}
                          className="w-8 h-8 rounded-l-xl flex items-center justify-center cursor-pointer hover:bg-white text-text-secondary"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center text-[12px] font-extrabold text-text-primary">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.productId, item.quantity + 1, item.variantId)}
                          className="w-8 h-8 rounded-r-xl flex items-center justify-center cursor-pointer hover:bg-white text-text-secondary"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-[14px] font-black text-primary-dark">{formatRupiah(unitPrice * item.quantity)}</p>
                        {memberPercent > 0 && (
                          <p className="text-[10.5px] font-extrabold text-emerald-600">Member -{memberPercent}%</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )})}
            </AnimatePresence>
          </div>

          {/* ── Summary ── */}
          <aside className="lg:sticky lg:top-6 lg:self-start space-y-3">
            {/* Promo */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
              <p className="text-[11px] font-extrabold text-text-secondary uppercase tracking-wider mb-2">Promo Code</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100">
                  <Tag size={13} className="text-text-muted shrink-0" />
                  <input
                    value={promo}
                    onChange={e => setPromo(e.target.value)}
                    placeholder="Enter code (try FLUENTLY10)"
                    className="flex-1 bg-transparent text-[12px] outline-none placeholder:text-text-muted text-text-primary"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-3 py-2 rounded-xl bg-primary text-white text-[11.5px] font-extrabold hover:bg-primary-dark cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <p className={`text-[11px] font-bold mt-2 ${appliedPromo.discount > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {appliedPromo.discount > 0
                    ? `✅ "${appliedPromo.code}" applied — saved ${formatRupiah(appliedPromo.discount)}`
                    : `❌ "${appliedPromo.code}" is not valid`}
                </p>
              )}
            </div>

            {/* Totals */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2.5" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
              <h3 className="font-extrabold text-[13px] text-text-primary mb-2">Order Summary</h3>
              {memberDiscount > 0 && (
                <>
                  <Row label={`Normal subtotal (${itemCount} items)`} value={formatRupiah(rawSubtotal)} />
                  <Row label="Member discount" value={`- ${formatRupiah(memberDiscount)}`} highlight />
                </>
              )}
              <Row label={`Subtotal (${itemCount} items)`} value={formatRupiah(subtotal)} />
              {appliedPromo && appliedPromo.discount > 0 && (
                <Row label={`Discount (${appliedPromo.code})`} value={`- ${formatRupiah(appliedPromo.discount)}`} highlight />
              )}
              <Row label="Shipping" value="Calculated next" muted />

              <div className="h-px bg-gray-100 my-1" />

              <div className="flex items-center justify-between">
                <span className="text-[13px] font-extrabold text-text-primary">Total</span>
                <span className="text-xl font-black text-primary-dark">{formatRupiah(total)}</span>
              </div>

              <button
                onClick={() => navigate('/shop/shipping')}
                className="w-full mt-3 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary text-white font-extrabold text-[13px] hover:bg-primary-dark transition-colors cursor-pointer"
                style={{ boxShadow: '0 6px 20px rgba(126, 195, 230, 0.4)' }}
              >
                Continue to Shipping
                <ArrowRight size={14} />
              </button>
            </div>

            <p className="text-[10.5px] text-text-muted text-center font-medium">🔒 Secure checkout · Money-back guarantee within 7 days</p>
          </aside>
        </div>
      </div>
    </PageContainer>
  );
}

function Row({ label, value, muted, highlight }: { label: string; value: string; muted?: boolean; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between text-[12px]">
      <span className={`${muted ? 'text-text-muted' : 'text-text-secondary'} font-medium`}>{label}</span>
      <span className={`${highlight ? 'text-emerald-600' : 'text-text-primary'} font-extrabold`}>{value}</span>
    </div>
  );
}
