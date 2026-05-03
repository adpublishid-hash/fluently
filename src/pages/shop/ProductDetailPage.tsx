import { motion } from 'framer-motion';
import { Star, ShoppingCart, Minus, Plus, BookOpen, Clock, Globe, Award, ChevronLeft, Heart, Share2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import PageContainer from '../../components/layout/PageContainer';
import { useCart } from '../../shop/CartContext';
import { formatRupiah } from '../../data/shopData';

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addItem, items, products, getProductDiscountPercent } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<'desc' | 'details' | 'reviews'>('desc');
  const [selectedVariantId, setSelectedVariantId] = useState('');

  const product = useMemo(() => products.find(p => p.id === productId), [productId, products]);
  const variants = product?.variants?.filter((variant) => variant.id && variant.name) ?? [];
  const selectedVariant = variants.find((variant) => variant.id === selectedVariantId);
  const hasVariants = variants.length > 0;
  const selectedBasePrice = selectedVariant?.price || product?.price || 0;
  const selectedStock = selectedVariant?.stock ?? product?.stock ?? 0;
  const canAddToCart = !hasVariants || Boolean(selectedVariant);
  const inCart = items.find(i => i.productId === productId && (i.variantId || '') === (selectedVariantId || ''))?.quantity ?? 0;

  useEffect(() => {
    if (variants.length > 0 && !variants.some((variant) => variant.id === selectedVariantId)) {
      setSelectedVariantId(variants[0].id);
      setQty(1);
    }
    if (variants.length === 0 && selectedVariantId) {
      setSelectedVariantId('');
    }
  }, [selectedVariantId, variants]);

  if (!product) {
    return (
      <PageContainer>
        <div className="px-5 py-20 text-center">
          <p className="text-[13px] text-text-muted">Product not found.</p>
          <button onClick={() => navigate('/shop')} className="mt-4 text-primary font-bold text-[13px] hover:underline">Back to Shop</button>
        </div>
      </PageContainer>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const memberDiscount = getProductDiscountPercent(product);
  const memberPrice = memberDiscount > 0
    ? Math.max(0, Math.round(selectedBasePrice * (100 - memberDiscount) / 100))
    : selectedBasePrice;

  const handleBuyNow = () => {
    if (!canAddToCart) return;
    addItem(product.id, qty, selectedVariantId || undefined);
    navigate('/shop/cart');
  };

  return (
    <PageContainer>
      <div className="pb-32 md:pb-16">

        {/* ── Top bar ── */}
        <div className="flex items-center justify-between px-5 md:px-0 pt-6 md:pt-0 mb-5">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={18} className="text-text-primary" />
          </motion.button>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors">
              <Heart size={16} className="text-text-secondary" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors">
              <Share2 size={16} className="text-text-secondary" />
            </button>
          </div>
        </div>

        <div className="px-5 md:px-0 grid md:grid-cols-2 gap-6 md:gap-8">

          {/* ── Cover ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl overflow-hidden bg-gray-50 aspect-[4/5] md:aspect-square md:sticky md:top-6"
          >
            <img
              src={product.cover}
              alt={product.title}
              loading="eager"
              className="w-full h-full object-cover"
            />
            {(memberDiscount > 0 || discount > 0) && (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-red-500 text-white text-[11px] font-extrabold shadow-lg">
                -{memberDiscount || discount}%
              </div>
            )}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
              {product.bestseller && (
                <span className="bg-amber-100 text-amber-700 text-[10px] font-extrabold uppercase px-2 py-1 rounded-full">🔥 Bestseller</span>
              )}
              {product.newRelease && (
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold uppercase px-2 py-1 rounded-full">✨ New</span>
              )}
            </div>
          </motion.div>

          {/* ── Info ── */}
          <div>
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-full bg-primary/10 text-primary mb-2">
              {product.type}
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-text-primary leading-tight">{product.title}</h1>
            <p className="text-[13px] text-text-secondary mt-1.5">by <span className="font-bold">{product.author}</span></p>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star
                    key={s}
                    size={14}
                    className={s <= Math.round(product.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-200 fill-gray-200'}
                  />
                ))}
              </div>
              <span className="text-[12px] font-bold text-text-primary">{product.rating}</span>
              <span className="text-[11px] text-text-muted">· {product.reviewCount} reviews</span>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-black text-primary-dark">{formatRupiah(memberPrice)}</span>
              {memberDiscount > 0 ? (
                <span className="text-base text-text-muted line-through">{formatRupiah(product.price)}</span>
              ) : product.originalPrice && (
                <span className="text-base text-text-muted line-through">{formatRupiah(product.originalPrice)}</span>
              )}
            </div>
            {memberDiscount > 0 && (
              <p className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-extrabold text-emerald-700">
                Member discount {memberDiscount}% applied
              </p>
            )}

            {hasVariants && (
              <div className="mt-5">
                <p className="text-[11px] font-extrabold text-text-secondary uppercase tracking-wider mb-2">Variation</p>
                <div className="grid grid-cols-2 gap-2">
                  {variants.map((variant) => {
                    const selected = variant.id === selectedVariantId;
                    const disabled = Number(variant.stock ?? product.stock) <= 0;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                          setSelectedVariantId(variant.id);
                          setQty(1);
                        }}
                        className={`rounded-2xl border px-3 py-3 text-left transition ${
                          selected
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-gray-100 bg-white text-text-primary hover:border-primary/40'
                        } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                      >
                        <span className="block text-[12.5px] font-black">{variant.name}</span>
                        <span className="mt-0.5 block text-[10.5px] font-bold text-text-muted">
                          {formatRupiah(variant.price || product.price)} · stock {variant.stock ?? product.stock}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick facts */}
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {product.pages && (
                <Fact icon={<BookOpen size={14} className="text-primary" />} label="Pages" value={`${product.pages}`} />
              )}
              {product.duration && (
                <Fact icon={<Clock size={14} className="text-primary" />} label="Duration" value={product.duration} />
              )}
              <Fact icon={<Globe size={14} className="text-primary" />} label="Language" value={product.language} />
              {product.level && (
                <Fact icon={<Award size={14} className="text-primary" />} label="Level" value={product.level} />
              )}
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.tags.map(tag => (
                <span key={tag} className="text-[10.5px] font-bold px-2 py-1 rounded-full bg-gray-100 text-text-secondary">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Tabs */}
            <div className="mt-7">
              <div className="flex gap-1 border-b border-gray-100 mb-4">
                {[
                  { id: 'desc',    label: 'Description' },
                  { id: 'details', label: 'Details'     },
                  { id: 'reviews', label: 'Reviews'     },
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id as typeof tab)}
                    className={`px-3 py-2 text-[12.5px] font-bold relative cursor-pointer transition-colors ${
                      tab === t.id ? 'text-primary' : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {t.label}
                    {tab === t.id && (
                      <motion.div layoutId="tabline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {tab === 'desc' && (
                <p className="text-[13px] text-text-secondary leading-relaxed">{product.description}</p>
              )}
              {tab === 'details' && (
                <ul className="text-[13px] text-text-secondary space-y-1.5">
                  <li>• Format: <span className="font-bold text-text-primary">{product.type === 'book' ? 'Physical book' : product.type === 'ebook' ? 'PDF / EPUB' : 'Online video'}</span></li>
                  <li>• Stock: <span className="font-bold text-text-primary">{selectedStock > 100 ? 'Always available' : `${selectedStock} left`}</span></li>
                  {selectedVariant && <li>• Variation: <span className="font-bold text-text-primary">{selectedVariant.name}</span></li>}
                  <li>• Author: <span className="font-bold text-text-primary">{product.author}</span></li>
                  <li>• Lifetime access (digital products)</li>
                  <li>• Money-back guarantee within 7 days</li>
                </ul>
              )}
              {tab === 'reviews' && (
                <div className="space-y-3">
                  {[
                    { name: 'Maria S.',  date: '2 weeks ago', rating: 5, text: 'Excellent material! Crystal clear explanations and great practice exercises.' },
                    { name: 'Budi P.',   date: '1 month ago', rating: 5, text: 'Worth every rupiah. Improved my skills dramatically in just a few weeks.' },
                    { name: 'Catherine', date: '2 months ago', rating: 4, text: 'Solid content overall. A few sections could use more examples but very recommended.' },
                  ].map((r, i) => (
                    <div key={i} className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[12px] font-extrabold text-text-primary">{r.name}</p>
                        <span className="text-[10px] text-text-muted">{r.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 mb-1.5">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} size={11} className={s <= r.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200 fill-gray-200'} />
                        ))}
                      </div>
                      <p className="text-[12px] text-text-secondary leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quantity + actions (desktop) */}
            <div className="hidden md:block mt-7">
              <p className="text-[11px] font-extrabold text-text-secondary uppercase tracking-wider mb-2">Quantity</p>
              <div className="flex items-center gap-3 mb-4">
                <QtyControl qty={qty} setQty={setQty} max={selectedStock} />
                {inCart > 0 && (
                  <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    {inCart} in cart
                  </span>
                )}
              </div>
              <div className="flex gap-2.5">
                <button
                  onClick={() => canAddToCart && addItem(product.id, qty, selectedVariantId || undefined)}
                  disabled={!canAddToCart || selectedStock <= 0}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary/10 text-primary font-extrabold text-[13px] hover:bg-primary/20 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!canAddToCart || selectedStock <= 0}
                  className="flex-1 py-3.5 rounded-2xl bg-primary text-white font-extrabold text-[13px] hover:bg-primary-dark transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ boxShadow: '0 6px 20px rgba(126, 195, 230, 0.4)' }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Sticky bottom action (mobile) ── */}
        <div className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-xl border-t border-gray-100 p-3 z-40 flex items-center gap-2.5"
          style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.06)', paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <QtyControl qty={qty} setQty={setQty} max={selectedStock} compact />
          <button
            onClick={() => canAddToCart && addItem(product.id, qty, selectedVariantId || undefined)}
            disabled={!canAddToCart || selectedStock <= 0}
            className="flex items-center justify-center gap-1 py-3 px-4 rounded-2xl bg-primary/10 text-primary font-extrabold text-[12px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart size={14} />
            Add
          </button>
          <button
            onClick={handleBuyNow}
            disabled={!canAddToCart || selectedStock <= 0}
            className="flex-1 py-3 rounded-2xl bg-primary text-white font-extrabold text-[12.5px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            Buy Now
          </button>
        </div>
      </div>
    </PageContainer>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100">
      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-[10px] text-text-muted font-medium leading-none mb-0.5">{label}</p>
        <p className="text-[12px] font-extrabold text-text-primary leading-tight truncate">{value}</p>
      </div>
    </div>
  );
}

function QtyControl({ qty, setQty, max, compact }: { qty: number; setQty: (n: number) => void; max: number; compact?: boolean }) {
  return (
    <div className={`inline-flex items-center bg-gray-50 rounded-2xl border border-gray-100 ${compact ? 'p-0.5' : 'p-1'}`}>
      <button
        onClick={() => setQty(Math.max(1, qty - 1))}
        className={`${compact ? 'w-8 h-8' : 'w-9 h-9'} rounded-xl flex items-center justify-center cursor-pointer hover:bg-white text-text-secondary disabled:opacity-40`}
        disabled={qty <= 1}
      >
        <Minus size={compact ? 12 : 14} />
      </button>
      <span className={`${compact ? 'w-7' : 'w-9'} text-center text-[13px] font-extrabold text-text-primary`}>{qty}</span>
      <button
        onClick={() => setQty(Math.min(max, qty + 1))}
        className={`${compact ? 'w-8 h-8' : 'w-9 h-9'} rounded-xl flex items-center justify-center cursor-pointer hover:bg-white text-text-secondary disabled:opacity-40`}
        disabled={qty >= max}
      >
        <Plus size={compact ? 12 : 14} />
      </button>
    </div>
  );
}
