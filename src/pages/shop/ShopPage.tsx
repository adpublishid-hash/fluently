import { motion } from 'framer-motion';
import { Search, ShoppingBag, ShoppingCart, SlidersHorizontal, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useDeferredValue } from 'react';
import PageContainer from '../../components/layout/PageContainer';
import { ProductCard } from '../../shop/ProductCard';
import { useCart } from '../../shop/CartContext';
import { productCategories, productTypes } from '../../data/shopData';

type SortKey = 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating';

const sortOptions: { id: SortKey; label: string }[] = [
  { id: 'popular',    label: 'Most Popular'   },
  { id: 'newest',     label: 'Newest'         },
  { id: 'price-low',  label: 'Price: Low → High' },
  { id: 'price-high', label: 'Price: High → Low' },
  { id: 'rating',     label: 'Top Rated'      },
];

export default function ShopPage() {
  const navigate = useNavigate();
  const { itemCount, products } = useCart();

  const [search, setSearch] = useState('');
  const [type, setType] = useState<string>('all');
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<SortKey>('popular');
  const [showFilters, setShowFilters] = useState(false);

  const deferredSearch = useDeferredValue(search);

  const filtered = useMemo(() => {
    let result = products;
    if (type !== 'all') result = result.filter(p => p.type === type);
    if (category !== 'all') result = result.filter(p => p.category === category);
    if (deferredSearch.trim()) {
      const q = deferredSearch.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    switch (sort) {
      case 'newest':     result = [...result].sort((a, b) => Number(!!b.newRelease) - Number(!!a.newRelease)); break;
      case 'price-low':  result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-high': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'rating':     result = [...result].sort((a, b) => b.rating - a.rating); break;
      default:           result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [products, type, category, deferredSearch, sort]);

  const featured = useMemo(() => products.filter(p => p.bestseller).slice(0, 3), [products]);

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">

        {/* ── Hero ── */}
        <motion.div
          className="mx-5 md:mx-0 mt-6 md:mt-0 rounded-3xl overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #7EC3E6 0%, #4FA3D1 50%, #2980B9 100%)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-8 -right-8 w-44 h-44 bg-white/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-8 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
          </div>

          <img
            src="/assets/mascot/Desain tanpa judul - 2026-05-02T141724.252.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-16 hidden w-[220px] select-none object-contain drop-shadow-2xl md:block lg:right-24 lg:w-[260px]"
          />

          <div className="relative p-6 md:p-8">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0 md:max-w-[58%] lg:max-w-[62%]">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 mb-3">
                  <ShoppingBag size={11} className="text-white" />
                  <span className="text-[10.5px] font-extrabold text-white tracking-wider uppercase">Fluently Shop</span>
                </div>
                <h1 className="text-white text-2xl md:text-3xl font-black leading-tight">Learn faster. Shop smarter.</h1>
                <p className="text-white/80 text-[13px] md:text-sm font-medium mt-1.5 leading-relaxed">
                  Curated eBooks, books and eCourses for every level
                </p>
              </div>

              <button
                onClick={() => navigate('/shop/cart')}
                className="relative w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center hover:bg-white/25 transition-colors cursor-pointer shrink-0"
              >
                <ShoppingCart size={18} className="text-white" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Search */}
            <div className="mt-5 flex items-center gap-2.5 bg-white rounded-2xl px-4 py-2.5 shadow-sm md:max-w-[64%] lg:max-w-[68%]">
              <Search size={16} className="text-text-muted shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search books, courses, authors..."
                className="flex-1 bg-transparent text-[13.5px] text-text-primary placeholder:text-text-muted outline-none"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-text-muted hover:text-text-primary">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Type pills ── */}
        <div className="px-5 md:px-0 mt-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max md:flex-wrap md:min-w-0">
            {productTypes.map(pt => {
              const active = type === pt.id;
              return (
                <button
                  key={pt.id}
                  onClick={() => setType(pt.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-[12.5px] font-bold border transition-all cursor-pointer ${
                    active ? 'text-white border-transparent' : 'bg-white text-text-secondary border-gray-100 hover:border-primary/30'
                  }`}
                  style={active ? { backgroundColor: pt.color } : {}}
                >
                  <span>{pt.icon}</span>
                  <span>{pt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Featured strip ── */}
        {!search && type === 'all' && category === 'all' && (
          <section className="mt-7">
            <div className="px-5 md:px-0 flex items-end justify-between mb-3">
              <div>
                <h2 className="text-base font-extrabold text-text-primary">🔥 Bestsellers</h2>
                <p className="text-[12px] text-text-muted mt-0.5">Top picks loved by our learners</p>
              </div>
            </div>
            <div className="px-5 md:px-0 grid gap-3 grid-cols-2 md:grid-cols-3">
              {featured.map((p, i) => <ProductCard key={p.id} product={p} delay={0.04 * i} />)}
            </div>
          </section>
        )}

        {/* ── Category & sort row ── */}
        <div className="px-5 md:px-0 mt-7 mb-3 flex items-center justify-between gap-3">
          <h2 className="text-base font-extrabold text-text-primary">All Products</h2>
          <button
            onClick={() => setShowFilters(s => !s)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11.5px] font-bold border transition-all cursor-pointer ${
              showFilters ? 'bg-primary text-white border-primary' : 'bg-white text-text-secondary border-gray-100'
            }`}
          >
            <SlidersHorizontal size={12} />
            Filter & Sort
          </button>
        </div>

        {showFilters && (
          <motion.div
            className="mx-5 md:mx-0 mb-5 bg-white border border-gray-100 rounded-2xl p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.18 }}
            style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
          >
            <div className="mb-4">
              <p className="text-[11px] font-extrabold text-text-secondary uppercase tracking-wider mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                {productCategories.map(c => {
                  const active = category === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setCategory(c.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11.5px] font-bold border transition-colors cursor-pointer ${
                        active ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-text-secondary border-gray-100 hover:border-primary/30'
                      }`}
                    >
                      <span>{c.icon}</span>
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-extrabold text-text-secondary uppercase tracking-wider mb-2">Sort By</p>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map(o => {
                  const active = sort === o.id;
                  return (
                    <button
                      key={o.id}
                      onClick={() => setSort(o.id)}
                      className={`px-3 py-1.5 rounded-xl text-[11.5px] font-bold border transition-colors cursor-pointer ${
                        active ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-text-secondary border-gray-100 hover:border-primary/30'
                      }`}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Product grid ── */}
        <div className="px-5 md:px-0">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-[13px] font-bold text-text-primary mb-1">No products found</p>
              <p className="text-[12px] text-text-muted">Try a different keyword or filter</p>
            </div>
          ) : (
            <>
              <p className="text-[11.5px] text-text-muted mb-3 font-medium">
                Showing <span className="font-bold text-text-primary">{filtered.length}</span> products
              </p>
              <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filtered.map((p, i) => <ProductCard key={p.id} product={p} delay={Math.min(i * 0.025, 0.3)} />)}
              </div>
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
