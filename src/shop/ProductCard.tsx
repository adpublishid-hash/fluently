import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import type { Product } from '../types/shop';
import { formatRupiah } from '../data/shopData';
import { useCart } from './CartContext';

const typeBadge: Record<Product['type'], { label: string; color: string; bg: string; icon: string }> = {
  ebook:   { label: 'eBook',   color: '#3498DB', bg: '#EBF5FB', icon: '📱' },
  book:    { label: 'Book',    color: '#E67E22', bg: '#FEF5E7', icon: '📖' },
  ecourse: { label: 'eCourse', color: '#9B59B6', bg: '#F4ECF7', icon: '🎬' },
};

function ProductCardImpl({ product, delay = 0 }: { product: Product; delay?: number }) {
  const navigate = useNavigate();
  const { addItem, getProductDiscountPercent, getProductPrice } = useCart();
  const badge = typeBadge[product.type];
  const memberDiscount = getProductDiscountPercent(product);
  const memberPrice = getProductPrice(product);
  const hasVariants = Boolean(product.variants?.length);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer group flex flex-col"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 220 }}
      whileHover={{ y: -3, boxShadow: '0 12px 28px rgba(0,0,0,0.08)' }}
      onClick={() => navigate(`/shop/product/${product.id}`)}
    >
      {/* Cover */}
      <div className="aspect-[4/5] relative overflow-hidden bg-gray-50">
        <img
          src={product.cover}
          alt={product.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Type badge */}
        <div
          className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold backdrop-blur-sm"
          style={{ backgroundColor: `${badge.bg}f0`, color: badge.color }}
        >
          <span>{badge.icon}</span>
          <span>{badge.label}</span>
        </div>
        {/* Discount */}
        {(memberDiscount > 0 || discount > 0) && (
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-extrabold shadow">
            -{memberDiscount || discount}%
          </div>
        )}
        {/* Status badges row */}
        <div className="absolute bottom-2 left-2 flex gap-1.5">
          {product.bestseller && (
            <span className="bg-amber-100/95 text-amber-700 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full">
              🔥 Bestseller
            </span>
          )}
          {product.newRelease && (
            <span className="bg-emerald-100/95 text-emerald-700 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full">
              ✨ New
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-extrabold text-[13px] text-text-primary leading-tight line-clamp-2 mb-1">{product.title}</h3>
        <p className="text-[11px] text-text-muted truncate mb-1.5">{product.author}</p>

        <div className="flex items-center gap-1 mb-2">
          <Star size={11} className="text-amber-500 fill-amber-500" />
          <span className="text-[11px] font-bold text-text-primary">{product.rating}</span>
          <span className="text-[10px] text-text-muted">({product.reviewCount})</span>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-[14px] font-black text-primary-dark">{formatRupiah(memberPrice)}</span>
            {memberDiscount > 0 ? (
              <span className="text-[10px] text-text-muted line-through">{formatRupiah(product.price)}</span>
            ) : product.originalPrice && (
              <span className="text-[10px] text-text-muted line-through">{formatRupiah(product.originalPrice)}</span>
            )}
          </div>
          {memberDiscount > 0 && (
            <p className="mb-2 text-[10px] font-extrabold text-emerald-600">Member price</p>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (hasVariants) {
                navigate(`/shop/product/${product.id}`);
                return;
              }
              addItem(product.id, 1);
            }}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primary/10 text-primary text-[11px] font-extrabold hover:bg-primary hover:text-white transition-colors cursor-pointer"
          >
            <ShoppingCart size={12} />
            {hasVariants ? 'Choose Variant' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export const ProductCard = memo(ProductCardImpl);
