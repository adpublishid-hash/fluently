import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';

/* ── Breadcrumb-style page header with back button ── */
export function PageHeader({
  title,
  titleKey,
  subtitleKey,
  subtitle,
  onBack,
}: {
  title?: string;
  titleKey?: TranslationKey;
  subtitleKey?: TranslationKey;
  subtitle?: string;
  onBack?: () => void;
}) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const displayTitle = title ?? (titleKey ? t(titleKey) : '');

  return (
    <div className="flex items-center gap-3 px-5 md:px-0 pt-6 md:pt-0 mb-6">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onBack || (() => navigate(-1))}
        className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
      >
        <ArrowLeft size={18} className="text-[#1A1A2E]" />
      </motion.button>
      <div>
        {displayTitle && <h1 className="text-xl font-extrabold text-[#1A1A2E]">{displayTitle}</h1>}
        {(subtitle || subtitleKey) && <p className="text-xs text-[#6B7280] mt-0.5">{subtitle || t(subtitleKey!)}</p>}
      </div>
    </div>
  );
}

/* ── Grid card for Level 1-2 navigation ── */
export function NavCard({
  icon,
  label,
  sublabel,
  color,
  bgColor,
  progress,
  onClick,
  delay = 0,
}: {
  icon: string;
  label: string;
  sublabel: string;
  color: string;
  bgColor: string;
  progress?: number;
  onClick: () => void;
  delay?: number;
}) {
  const [iconFailed, setIconFailed] = useState(false);

  return (
    <motion.button
      className="w-full bg-white rounded-2xl p-5 text-left cursor-pointer border border-gray-100/60 relative overflow-hidden group"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, type: 'spring', stiffness: 200 }}
      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      {/* Accent stripe */}
      <div className="absolute top-0 left-0 w-1 h-full rounded-r-full" style={{ backgroundColor: color }} />

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 p-2" style={{ backgroundColor: bgColor }}>
          {icon.startsWith('/assets/') && !iconFailed ? (
            <img src={icon} alt="" className="w-full h-full object-contain" onError={() => setIconFailed(true)} />
          ) : (
            <span className="text-lg font-black" style={{ color }}>{icon.startsWith('/assets/') ? label.slice(0, 1) : icon}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-[15px] text-[#1A1A2E] truncate">{label}</h3>
          <p className="text-[12px] text-[#6B7280] font-medium mt-0.5">{sublabel}</p>
          {progress !== undefined && progress > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, delay: delay + 0.2 }}
                />
              </div>
              <span className="text-[10px] font-bold" style={{ color }}>{progress}%</span>
            </div>
          )}
        </div>
        <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
      </div>
    </motion.button>
  );
}

/* ── Section title within a page ── */
export function SectionTitle({ titleKey, subtitleKey }: { titleKey: TranslationKey; subtitleKey?: TranslationKey }) {
  const { t } = useLanguage();
  return (
    <div className="px-5 md:px-0 mb-4 mt-2">
      <h2 className="text-lg font-extrabold text-[#1A1A2E]">{t(titleKey)}</h2>
      {subtitleKey && <p className="text-[13px] text-[#6B7280] mt-0.5">{t(subtitleKey)}</p>}
    </div>
  );
}
