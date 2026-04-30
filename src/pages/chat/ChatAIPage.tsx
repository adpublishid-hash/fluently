import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { NavCard } from '../../components/shared/NavComponents';
import { chatAIModes } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';

export default function ChatAIPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        {/* Hero */}
        <motion.div
          className="mx-5 md:mx-0 mt-6 md:mt-0 rounded-3xl overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 50%, #A93226 100%)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 right-10 w-28 h-28 bg-white/30 rounded-full blur-3xl" />
          </div>
          <div className="relative p-6 md:p-8 flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <MessageCircle size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl md:text-3xl font-black">{t('chatAi.title')}</h1>
              <p className="text-white/70 text-sm font-medium mt-1">{t('chatAi.subtitle')}</p>
            </div>
          </div>
        </motion.div>

        {/* Mode cards */}
        <div className="px-5 md:px-0 mt-8">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {chatAIModes.map((mode, i) => (
              <NavCard
                key={mode.id}
                icon={mode.icon}
                label={t(mode.labelKey as TranslationKey)}
                sublabel={t(mode.sublabelKey as TranslationKey)}
                color={mode.color}
                bgColor={mode.bgColor}
                onClick={() => navigate(`/chat/${mode.id}`)}
                delay={0.06 * i}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
