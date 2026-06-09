import { motion } from 'framer-motion';
import { BookOpen, Gamepad2, FileText, MessageCircle, ShoppingBag, User, LogOut, Flame, Zap, Shield, BarChart3, Target, NotebookPen, GraduationCap } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';
import type { TabType } from '../../types';
import { useCart } from '../../shop/CartContext';
import { useAuth } from '../../auth/AuthContext';

const XP_PER_LEVEL = 3000;
const fallbackAvatar = (name: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || 'Learner')}&backgroundColor=b6e3f4`;

const tabs: { id: TabType; labelKey: TranslationKey; icon: React.ElementType; path: string; accent: string }[] = [
  { id: 'modul',   labelKey: 'nav.modul',   icon: BookOpen,      path: '/modul',   accent: '#4FA3D1' },
  { id: 'latihan', labelKey: 'nav.latihan',  icon: FileText,      path: '/latihan', accent: '#F59E0B' },
  { id: 'chat',    labelKey: 'nav.chatAi',   icon: MessageCircle, path: '/chat',    accent: '#3B82F6' },
  { id: 'game',    labelKey: 'nav.game',     icon: Gamepad2,      path: '/game',    accent: '#6366F1' },
];

function XpProgressBar({ xp, level }: { xp: number; level: number }) {
  const xpInLevel = xp % XP_PER_LEVEL;
  const progress = (xpInLevel / XP_PER_LEVEL) * 100;
  return (
    <div className="px-2">
      <div className="flex items-center justify-between text-[10px] mb-1.5">
        <span className="font-semibold text-text-secondary">Lv.{level}</span>
        <span className="font-bold text-primary">{xpInLevel.toLocaleString()} / {XP_PER_LEVEL.toLocaleString()}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #4FA3D1, #1E6F9F)' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
        />
      </div>
    </div>
  );
}

export default function SidebarNav({ onLogout }: { onLogout?: () => void }) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { itemCount } = useCart();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const displayName = user?.displayName || user?.name || 'Learner';
  const avatarUrl = user?.avatarUrl || fallbackAvatar(displayName);
  const xp = user?.xp ?? 0;
  const streak = user?.streak ?? 0;
  const level = user?.level ?? 1;

  const activeTab = tabs.find((tab) => location.pathname.startsWith(tab.path))?.id || 'modul';
  const navTabs = isAdmin
    ? [...tabs, { id: 'admin' as TabType, labelKey: 'nav.profile' as TranslationKey, icon: Shield, path: '/admin', accent: '#0891B2' }]
    : tabs;
  const resolvedActiveTab = location.pathname.startsWith('/admin') ? 'admin' : activeTab;

  const isPathActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  type ExtraItem = { label: string; icon: React.ElementType; path: string; accent: string; bg: string };
  const prepItems: ExtraItem[] = [
    { label: 'IELTS Prep', icon: BookOpen,      path: '/ielts',         accent: '#7C3AED', bg: 'rgba(124,58,237,0.10)' },
    { label: 'Exam',       icon: GraduationCap, path: '/ujian/english', accent: '#9B59B6', bg: 'rgba(155,89,182,0.10)' },
  ];
  const toolItems: ExtraItem[] = [
    { label: 'Analytics', icon: BarChart3,   path: '/analytics', accent: '#2980B9', bg: 'rgba(41,128,185,0.10)'  },
    { label: 'Goals',     icon: Target,      path: '/goals',     accent: '#E74C3C', bg: 'rgba(231,76,60,0.10)'   },
    { label: 'Notes',     icon: NotebookPen, path: '/notes',     accent: '#4FA3D1', bg: 'rgba(79,163,209,0.10)'  },
  ];
  const accountItems: ExtraItem[] = [
    { label: 'Shop',    icon: ShoppingBag, path: '/shop',    accent: '#10B981', bg: 'rgba(16,185,129,0.10)' },
    { label: 'Profile', icon: User,        path: '/profile', accent: '#EC4899', bg: 'rgba(236,72,153,0.10)' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-[260px] h-screen fixed left-0 top-0 bg-white border-r border-gray-100 z-40 py-6 px-4">
      {/* Gradient right-edge accent */}
      <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-primary/20 via-transparent to-primary/20" />

      {/* Logo */}
      <div className="flex items-center gap-3 mb-6 px-3">
        <img src="/assets/Logo-fluently.png" alt="Fluently" className="h-10 w-auto object-contain" />
        <span className="text-xl font-extrabold text-text-primary tracking-tight">Fluently</span>
      </div>

      {/* User Widget */}
      <div className="mx-1 mb-6 bg-primary/5 rounded-2xl p-3.5 border border-primary/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
            <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-text-primary truncate">{displayName}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center gap-1 bg-red-50 rounded-full px-1.5 py-0.5">
                <Flame size={11} className="text-[#FF6B6B]" />
                <span className="text-[10px] font-bold text-[#FF6B6B]">{streak}</span>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 rounded-full px-1.5 py-0.5">
                <Zap size={11} className="text-[#F59E0B]" />
                <span className="text-[10px] font-bold text-[#F59E0B]">{xp.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        <XpProgressBar xp={xp} level={level} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-1 scrollbar-none">

        {/* ── Learn ── */}
        <p className="px-3 pb-1 text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Learn</p>
        <div className="space-y-0.5">
          {navTabs.map((tab) => {
            const isActive = resolvedActiveTab === tab.id;
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  isActive ? 'bg-gray-50' : 'hover:bg-gray-50/70'
                }`}
                whileHover={{ x: isActive ? 0 : 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={{
                    backgroundColor: isActive ? `${tab.accent}18` : 'rgba(243,244,246,0.8)',
                    scale: isActive ? 1 : 0.95,
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} style={{ color: isActive ? tab.accent : '#9CA3AF' }} />
                </motion.div>
                <span className={`text-[13.5px] tracking-tight ${isActive ? 'font-bold text-text-primary' : 'font-normal text-text-secondary'}`}>
                  {tab.id === 'admin' ? 'Admin' : t(tab.labelKey)}
                </span>
                {isActive && (
                  <motion.div layoutId="sidebarBar" className="ml-auto w-1 h-5 rounded-full"
                    style={{ backgroundColor: tab.accent }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* ── Test Prep ── */}
        <div className="h-px bg-gray-100 mx-2 mt-3 mb-2" />
        <p className="px-3 pb-1 text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Test Prep</p>
        <div className="space-y-0.5">
          {prepItems.map(item => {
            const Icon = item.icon;
            const isActive = isPathActive(item.path);
            return (
              <motion.button key={item.path} onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${isActive ? 'bg-gray-50' : 'hover:bg-gray-50/70'}`}
                whileHover={{ x: isActive ? 0 : 2 }} whileTap={{ scale: 0.98 }}>
                <motion.div
                  animate={{ backgroundColor: isActive ? item.bg : 'rgba(243,244,246,0.8)', scale: isActive ? 1 : 0.95 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} style={{ color: isActive ? item.accent : '#9CA3AF' }} />
                </motion.div>
                <span className={`text-[13.5px] tracking-tight ${isActive ? 'font-bold text-text-primary' : 'font-normal text-text-secondary'}`}>{item.label}</span>
                {isActive && <div className="ml-auto w-1 h-5 rounded-full" style={{ backgroundColor: item.accent }} />}
              </motion.button>
            );
          })}
        </div>

        {/* ── Tools ── */}
        <div className="h-px bg-gray-100 mx-2 mt-3 mb-2" />
        <p className="px-3 pb-1 text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Tools</p>
        <div className="space-y-0.5">
          {toolItems.map(item => {
            const Icon = item.icon;
            const isActive = isPathActive(item.path);
            return (
              <motion.button key={item.path} onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${isActive ? 'bg-gray-50' : 'hover:bg-gray-50/70'}`}
                whileHover={{ x: isActive ? 0 : 2 }} whileTap={{ scale: 0.98 }}>
                <motion.div
                  animate={{ backgroundColor: isActive ? item.bg : 'rgba(243,244,246,0.8)', scale: isActive ? 1 : 0.95 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} style={{ color: isActive ? item.accent : '#9CA3AF' }} />
                </motion.div>
                <span className={`text-[13.5px] tracking-tight ${isActive ? 'font-bold text-text-primary' : 'font-normal text-text-secondary'}`}>{item.label}</span>
                {isActive && <div className="ml-auto w-1 h-5 rounded-full" style={{ backgroundColor: item.accent }} />}
              </motion.button>
            );
          })}
        </div>

        {/* ── Account ── */}
        <div className="h-px bg-gray-100 mx-2 mt-3 mb-2" />
        <p className="px-3 pb-1 text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Account</p>
        <div className="space-y-0.5">
          {accountItems.map(item => {
            const Icon = item.icon;
            const isActive = isPathActive(item.path);
            return (
              <motion.button key={item.path} onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${isActive ? 'bg-gray-50' : 'hover:bg-gray-50/70'}`}
                whileHover={{ x: isActive ? 0 : 2 }} whileTap={{ scale: 0.98 }}>
                <motion.div
                  animate={{ backgroundColor: isActive ? item.bg : 'rgba(243,244,246,0.8)', scale: isActive ? 1 : 0.95 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} style={{ color: isActive ? item.accent : '#9CA3AF' }} />
                </motion.div>
                <span className={`text-[13.5px] tracking-tight ${isActive ? 'font-bold text-text-primary' : 'font-normal text-text-secondary'}`}>{item.label}</span>
                {item.path === '/shop' && itemCount > 0 && (
                  <span className="ml-auto min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
                {isActive && !( item.path === '/shop' && itemCount > 0) && <div className="ml-auto w-1 h-5 rounded-full" style={{ backgroundColor: item.accent }} />}
              </motion.button>
            );
          })}
        </div>

        <div className="h-4" />{/* bottom spacing */}
      </nav>

      {/* Logout */}
      <div className="px-1 pt-4 border-t border-gray-100">
        {onLogout && (
          <motion.button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-red-50/70 transition-colors cursor-pointer group"
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-9 h-9 rounded-xl bg-red-50/80 group-hover:bg-red-100/80 flex items-center justify-center shrink-0 transition-colors">
              <LogOut size={18} strokeWidth={1.8} className="text-red-400 group-hover:text-red-500" />
            </div>
            <span className="text-[13.5px] font-normal text-red-400 group-hover:text-red-500 tracking-tight transition-colors">
              {t('nav.logOut')}
            </span>
          </motion.button>
        )}
      </div>
    </aside>
  );
}
