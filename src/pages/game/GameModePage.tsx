import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, Swords, Crown } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader } from '../../components/shared/NavComponents';
import { gameModes } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';

const difficulties = [
  { id: 'easy',   icon: Shield,  labelKey: 'gameDifficulty.easy'   as const, subKey: 'gameDifficulty.easySub'   as const, color: '#2ECC71', bgColor: '#E8F8F0' },
  { id: 'medium', icon: Swords,  labelKey: 'gameDifficulty.medium' as const, subKey: 'gameDifficulty.mediumSub' as const, color: '#F39C12', bgColor: '#FEF9E7' },
  { id: 'hard',   icon: Crown,   labelKey: 'gameDifficulty.hard'   as const, subKey: 'gameDifficulty.hardSub'   as const, color: '#E74C3C', bgColor: '#FDEDEC' },
];

export default function GameModePage() {
  const { t } = useLanguage();
  const { categoryId, modeId } = useParams<{ categoryId: string; modeId: string }>();
  const navigate = useNavigate();
  const mode = gameModes.find((m) => m.id === modeId);

  if (!mode) return null;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey={mode.labelKey as TranslationKey} subtitleKey="game.difficultySubtitle" />

        {/* Mode info */}
        <motion.div
          className="mx-5 md:mx-0 mb-8 rounded-2xl p-5 text-center"
          style={{ backgroundColor: mode.bgColor, border: `1px solid ${mode.color}20` }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="text-4xl">{mode.icon}</span>
          <h3 className="font-bold text-lg text-[#1A1A2E] mt-2">{t(mode.labelKey as TranslationKey)}</h3>
          <p className="text-sm text-[#6B7280]">{t(mode.sublabelKey as TranslationKey)}</p>
        </motion.div>

        {/* Difficulty cards */}
        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{t('game.difficultyTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">{t('game.difficultySubtitle')}</p>

          <div className="grid gap-4 md:grid-cols-3">
            {difficulties.map((diff, i) => {
              const Icon = diff.icon;
              return (
                <motion.button
                  key={diff.id}
                  className="bg-white rounded-2xl p-6 text-center cursor-pointer border border-gray-100/60 group relative overflow-hidden"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ y: -4, boxShadow: `0 8px 28px ${diff.color}20` }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(`/game/${categoryId}/${modeId}/play?difficulty=${diff.id}`)}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ backgroundColor: diff.color }} />
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: diff.bgColor }}>
                    <Icon size={28} style={{ color: diff.color }} />
                  </div>
                  <h3 className="font-bold text-base text-[#1A1A2E]">{t(diff.labelKey)}</h3>
                  <p className="text-sm text-[#6B7280] mt-1">{t(diff.subKey)}</p>
                  <motion.div
                    className="mt-4 px-6 py-2.5 rounded-xl text-white text-sm font-bold"
                    style={{ backgroundColor: diff.color }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {t('common.play')}
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
