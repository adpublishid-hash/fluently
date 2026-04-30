import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Gamepad2, FileText, MessageCircle, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';
import type { TabType } from '../../types';

const tabs: { id: TabType; labelKey: TranslationKey; icon: React.ElementType; path: string }[] = [
  { id: 'modul',   labelKey: 'nav.modul',   icon: BookOpen,      path: '/modul' },
  { id: 'game',    labelKey: 'nav.game',     icon: Gamepad2,      path: '/game' },
  { id: 'latihan', labelKey: 'nav.latihan',  icon: FileText,      path: '/latihan' },
  { id: 'chat',    labelKey: 'nav.chatAi',   icon: MessageCircle, path: '/chat' },
  { id: 'profile', labelKey: 'nav.profile',  icon: User,          path: '/profile' },
];

export default function BottomNav() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = tabs.find((tab) => location.pathname.startsWith(tab.path))?.id || 'modul';

  return (
    <nav className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/80 backdrop-blur-xl border-t border-gray-100/80 z-50 overflow-hidden"
      style={{ boxShadow: '0 -4px 24px rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center gap-1 px-3 py-1 cursor-pointer"
              whileTap={{ scale: 0.88 }}
              id={`nav-${tab.id}`}
            >
              {/* Icon container */}
              <div className="relative">
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
                    className={`transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-[#9CA3AF]'
                    }`}
                  />
                </motion.div>

                {/* Active dot indicator removed as per user request */}
              </div>

              {/* Label */}
              <motion.span
                animate={{ color: isActive ? '#4FA3D1' : '#9CA3AF' }}
                className="text-[9px] font-semibold leading-none"
              >
                {t(tab.labelKey)}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
