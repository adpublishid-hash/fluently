import { motion } from 'framer-motion';
import { BookOpen, Gamepad2, FileText, MessageCircle, MoreHorizontal } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';
import type { TabType } from '../../types';
import { useCart } from '../../shop/CartContext';
import MoreSheet from './MoreSheet';

const tabs: { id: TabType; labelKey: TranslationKey; icon: React.ElementType; path: string }[] = [
  { id: 'modul',   labelKey: 'nav.modul',   icon: BookOpen,      path: '/modul'   },
  { id: 'game',    labelKey: 'nav.game',    icon: Gamepad2,      path: '/game'    },
  { id: 'latihan', labelKey: 'nav.latihan', icon: FileText,      path: '/latihan' },
  { id: 'chat',    labelKey: 'nav.chatAi',  icon: MessageCircle, path: '/chat'    },
];

interface Props {
  onLogout?: () => void;
}

export default function BottomNav({ onLogout }: Props) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { itemCount } = useCart();
  const [moreOpen, setMoreOpen] = useState(false);

  /* "More" routes that should highlight the More button as active */
  const morePaths = ['/video', '/shop', '/rank', '/profile', '/admin', '/goals', '/notes', '/ujian', '/analytics', '/settings'];
  const isMoreActive = morePaths.some(p => location.pathname === p || location.pathname.startsWith(p + '/'));

  const activeTab = tabs.find((tab) => location.pathname.startsWith(tab.path))?.id ?? null;

  return (
    <>
      <nav
        className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/85 backdrop-blur-xl border-t border-gray-100/80 z-50 overflow-hidden"
        style={{ boxShadow: '0 -4px 24px rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-center justify-around px-2 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id && !isMoreActive;
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className="relative flex flex-col items-center gap-1 px-3 py-1 cursor-pointer"
                whileTap={{ scale: 0.88 }}
                id={`nav-${tab.id}`}
              >
                <motion.div
                  animate={{
                    backgroundColor: isActive ? 'rgba(126,195,230,0.18)' : 'rgba(0,0,0,0)',
                    scale: isActive ? 1 : 0.85,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  className="w-11 h-7 rounded-full flex items-center justify-center"
                >
                  <Icon
                    size={isActive ? 22 : 20}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className={`transition-colors duration-200 ${isActive ? 'text-primary' : 'text-[#9CA3AF]'}`}
                  />
                </motion.div>
                <motion.span
                  animate={{ color: isActive ? '#4FA3D1' : '#9CA3AF' }}
                  className="text-[9px] font-semibold leading-none"
                >
                  {t(tab.labelKey)}
                </motion.span>
              </motion.button>
            );
          })}

          {/* More */}
          <motion.button
            onClick={() => setMoreOpen(true)}
            className="relative flex flex-col items-center gap-1 px-3 py-1 cursor-pointer"
            whileTap={{ scale: 0.88 }}
            id="nav-more"
          >
            <div className="relative">
              <motion.div
                animate={{
                  backgroundColor: isMoreActive ? 'rgba(126,195,230,0.18)' : 'rgba(0,0,0,0)',
                  scale: isMoreActive ? 1 : 0.85,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="w-11 h-7 rounded-full flex items-center justify-center"
              >
                <MoreHorizontal
                  size={isMoreActive ? 22 : 20}
                  strokeWidth={isMoreActive ? 2.5 : 1.8}
                  className={`transition-colors duration-200 ${isMoreActive ? 'text-primary' : 'text-[#9CA3AF]'}`}
                />
              </motion.div>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-red-500 text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-white">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </div>
            <motion.span
              animate={{ color: isMoreActive ? '#4FA3D1' : '#9CA3AF' }}
              className="text-[9px] font-semibold leading-none"
            >
              {t('nav.more')}
            </motion.span>
          </motion.button>
        </div>
      </nav>

      <MoreSheet open={moreOpen} onClose={() => setMoreOpen(false)} onLogout={onLogout} />
    </>
  );
}
