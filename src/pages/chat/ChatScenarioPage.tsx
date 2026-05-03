import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, MessageCircle } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader } from '../../components/shared/NavComponents';
import { chatAIModes } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';

const cefrChatLevels = [
  { id: 'a1', label: 'A1', sublabel: 'Beginner', color: '#7EC3E6', bgColor: '#EAF7FC' },
  { id: 'a2', label: 'A2', sublabel: 'Elementary', color: '#4FA3D1', bgColor: '#EAF7FC' },
  { id: 'b1', label: 'B1', sublabel: 'Intermediate', color: '#3498DB', bgColor: '#EBF5FB' },
  { id: 'b2', label: 'B2', sublabel: 'Upper-Intermediate', color: '#2980B9', bgColor: '#D6EAF8' },
  { id: 'c1', label: 'C1', sublabel: 'Advanced', color: '#8E44AD', bgColor: '#F4ECF7' },
  { id: 'c2', label: 'C2', sublabel: 'Proficiency', color: '#9B59B6', bgColor: '#F4ECF7' },
];

export default function ChatScenarioPage() {
  const { t } = useLanguage();
  const { modeId, scenarioId: levelId } = useParams<{ modeId: string; scenarioId: string }>();
  const navigate = useNavigate();
  const mode = chatAIModes.find((m) => m.id === modeId);
  const level = cefrChatLevels.find((item) => item.id === levelId);

  if (!mode || !level) return null;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="chatAi.readyTitle" subtitleKey="chatAi.readySub" />

        <motion.div
          className="mx-5 md:mx-0 mb-7 rounded-2xl p-5 flex items-center gap-4"
          style={{ backgroundColor: mode.bgColor, border: `1.5px solid ${mode.color}25` }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 p-2"
            style={{ backgroundColor: `${mode.color}18` }}
          >
            {mode.icon.startsWith('/assets/') ? (
              <img src={mode.icon} alt="" className="h-full w-full object-contain" />
            ) : (
              <span className="text-xl font-black" style={{ color: mode.color }}>{mode.icon}</span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-extrabold text-base text-text-primary">{t(mode.labelKey as TranslationKey)}</h3>
            <p className="text-[13px] text-text-secondary mt-0.5">{t(mode.sublabelKey as TranslationKey)}</p>
          </div>
        </motion.div>

        <motion.button
          className="mx-5 md:mx-0 w-[calc(100%-40px)] md:w-full bg-white rounded-2xl p-5 text-left cursor-pointer border border-gray-100 relative overflow-hidden group"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          whileHover={{ y: -3, boxShadow: `0 10px 28px ${level.color}20` }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(`/chat/${modeId}/${levelId}/start`)}
        >
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ backgroundColor: level.color }} />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: level.bgColor }}
            >
              <span className="text-lg font-black" style={{ color: level.color }}>{level.label}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-extrabold text-[16px] text-text-primary">{t('chatAi.levelTitle')}: {level.label}</h2>
              <p className="text-[13px] text-text-muted mt-0.5">{level.sublabel}</p>
            </div>
            <div
              className="flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white text-[13px] font-bold transition-all sm:w-auto"
              style={{ backgroundColor: level.color }}
            >
              <MessageCircle size={15} />
              <span>{t('common.start')}</span>
              <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </motion.button>
      </div>
    </PageContainer>
  );
}
