import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { NavCard } from '../../components/shared/NavComponents';
import { cefrLevels } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';

export default function LatihanPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const levels = [
    ...cefrLevels,
    { id: 'mixed' as const, labelKey: 'cefr.mixed', sublabel: t('cefr.mixedSublabel'), color: '#1ABC9C', bgColor: '#E8F8F5', icon: '/assets/icons/new/8. Brainstorming.png', progress: 0 },
  ];

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        {/* Hero */}
        <motion.div
          className="mx-5 md:mx-0 mt-6 md:mt-0 rounded-3xl overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #3498DB 0%, #2980B9 50%, #1F6DA0 100%)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 right-10 w-28 h-28 bg-white/30 rounded-full blur-3xl" />
          </div>
          <div className="relative p-6 md:p-8 flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <FileText size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl md:text-3xl font-black">{t('latihan.title')}</h1>
              <p className="text-white/70 text-sm font-medium mt-1">{t('latihan.subtitle')}</p>
            </div>
          </div>
        </motion.div>

        {/* Level cards */}
        <div className="px-5 md:px-0 mt-8">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">Level CEFR</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">{t('latihan.subtitle')}</p>

          <div className="grid gap-3 md:grid-cols-2">
            {levels.map((level, i) => (
              <NavCard
                key={level.id}
                icon={level.icon}
                label={t(level.labelKey as TranslationKey)}
                sublabel={level.sublabel}
                color={level.color}
                bgColor={level.bgColor}
                progress={level.progress}
                onClick={() => navigate(`/latihan/${level.id}`)}
                delay={0.08 * i}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
