import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X, ShoppingBag, BarChart3, Bell, Target, NotebookPen, Award,
  Trophy, Sparkles, Settings, FileText, User, LogOut, ChevronRight, Shield,
} from 'lucide-react';
import { useCart } from '../../shop/CartContext';
import { useAuth } from '../../auth/AuthContext';

const fallbackAvatar = (name: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || 'Learner')}&backgroundColor=b6e3f4`;

type MenuItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  path: string;
  badge?: number;
};

interface Props {
  open: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

export default function MoreSheet({ open, onClose, onLogout }: Props) {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const displayName = user?.displayName || user?.name || 'Learner';
  const avatarUrl = user?.avatarUrl || fallbackAvatar(displayName);
  const xp = user?.xp ?? 0;
  const level = user?.level ?? 1;

  /* Lock body scroll while open */
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const items: MenuItem[] = [
    { id: 'shop',          label: 'Shop',          icon: ShoppingBag,  color: '#10B981', bgColor: '#ECFDF5', path: '/shop',         badge: itemCount },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin', icon: Shield, color: '#0891B2', bgColor: '#E0F2FE', path: '/admin' }] : []),
    { id: 'practice',      label: 'Practice',      icon: FileText,     color: '#F59E0B', bgColor: '#FEF9E7', path: '/latihan' },
    { id: 'leaderboard',   label: 'Leaderboard',   icon: Trophy,       color: '#F39C12', bgColor: '#FEF3C7', path: '/rank' },
    { id: 'notifications', label: 'Notifications', icon: Bell,         color: '#3498DB', bgColor: '#EBF5FB', path: '/notifications' },
    { id: 'goals',         label: 'Goals',         icon: Target,       color: '#E74C3C', bgColor: '#FDEDEC', path: '/goals' },
    { id: 'notes',         label: 'Notes',         icon: NotebookPen,  color: '#4FA3D1', bgColor: '#EAF7FC', path: '/notes' },
    { id: 'badges',        label: 'Badges',        icon: Award,        color: '#9B59B6', bgColor: '#F4ECF7', path: '/badges' },
    { id: 'analytics',     label: 'Analytics',     icon: BarChart3,    color: '#2980B9', bgColor: '#D6EAF8', path: '/analytics' },
    { id: 'settings',      label: 'Settings',      icon: Settings,     color: '#6B7280', bgColor: '#F3F4F6', path: '/settings' },
  ];

  const handleNav = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="md:hidden fixed inset-0 z-[60] bg-black/45 backdrop-blur-sm cursor-pointer"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) onClose();
            }}
            className="md:hidden fixed bottom-0 inset-x-0 mx-auto w-full max-w-[430px] z-[61] bg-white rounded-t-3xl overflow-hidden flex flex-col"
            style={{ boxShadow: '0 -12px 40px rgba(0,0,0,0.18)', maxHeight: '90vh' }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-2.5 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-1 pb-3 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/15">
                  <Sparkles size={15} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-[17px] font-extrabold text-text-primary leading-none">More</h2>
                  <p className="text-[10.5px] text-text-muted font-medium mt-0.5">Quick access to everything</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center cursor-pointer border border-gray-100 transition-colors"
              >
                <X size={16} className="text-text-secondary" />
              </button>
            </div>

            {/* Scrollable area */}
            <div className="flex-1 overflow-y-auto px-5 pb-2">

              {/* Featured: Shop banner */}
              <motion.button
                onClick={() => handleNav('/shop')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mb-3 rounded-2xl overflow-hidden relative cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #7EC3E6 0%, #4FA3D1 60%, #2980B9 100%)' }}
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/15 rounded-full blur-2xl" />
                </div>
                <div className="relative flex items-center gap-3 px-4 py-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center shrink-0">
                    <ShoppingBag size={20} className="text-white" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-white text-[13.5px] font-extrabold leading-tight">Fluently Shop</p>
                    <p className="text-white/80 text-[10.5px] font-medium mt-0.5">eBooks · Books · eCourses</p>
                  </div>
                  {itemCount > 0 ? (
                    <span className="bg-white text-primary text-[10.5px] font-extrabold px-2 py-1 rounded-full shrink-0">
                      {itemCount} item{itemCount > 1 ? 's' : ''}
                    </span>
                  ) : (
                    <ChevronRight size={16} className="text-white/80 shrink-0" />
                  )}
                </div>
              </motion.button>

              {/* Section label */}
              <p className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-2.5 mt-3 px-1">Quick Menu</p>

              {/* Grid */}
              <div className="grid grid-cols-4 gap-2">
                {items.filter(i => i.id !== 'shop').map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNav(item.path)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      whileTap={{ scale: 0.94 }}
                      className="relative bg-white border border-gray-100 rounded-2xl p-2.5 flex flex-col items-center gap-1.5 cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-all min-h-[88px]"
                    >
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="absolute top-1.5 right-1.5 min-w-[16px] h-[16px] px-1 rounded-full bg-red-500 text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-white shadow">
                          {item.badge > 99 ? '99+' : item.badge}
                        </span>
                      )}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: item.bgColor }}
                      >
                        <Icon size={17} style={{ color: item.color }} strokeWidth={2.2} />
                      </div>
                      <span className="text-[10.5px] font-bold text-text-primary text-center leading-[1.15] line-clamp-2">
                        {item.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* User card + logout (sticky bottom) */}
            <div className="px-5 pt-3 pb-[max(1rem,calc(env(safe-area-inset-bottom)+0.5rem))] border-t border-gray-100 bg-white shrink-0">
              <div className="bg-primary/5 border border-primary/15 rounded-2xl p-2.5 flex items-center gap-3">
                <button
                  onClick={() => handleNav('/profile')}
                  className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer text-left"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 shrink-0 bg-primary/10 flex items-center justify-center">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      <User size={16} className="text-primary" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-extrabold text-[13px] text-text-primary truncate">{displayName}</p>
                    <p className="text-[10.5px] text-text-muted">Lv {level} · {xp.toLocaleString()} XP</p>
                  </div>
                </button>
                {onLogout && (
                  <button
                    onClick={() => { onClose(); onLogout(); }}
                    className="w-9 h-9 rounded-xl border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                    aria-label="Log Out"
                  >
                    <LogOut size={15} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
