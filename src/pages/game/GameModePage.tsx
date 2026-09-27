import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, Swords, Crown } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader } from '../../components/shared/NavComponents';
import { gameModes } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';
import { useAuth } from '../../auth/AuthContext';
import { getGamePack } from '../../features/game/gamePacks';

const difficulties = [
  { id: 'easy',   icon: Shield,  labelKey: 'gameDifficulty.easy'   as const, subKey: 'gameDifficulty.easySub'   as const, color: '#2ECC71', bgColor: '#E8F8F0' },
  { id: 'medium', icon: Swords,  labelKey: 'gameDifficulty.medium' as const, subKey: 'gameDifficulty.mediumSub' as const, color: '#F39C12', bgColor: '#FEF9E7' },
  { id: 'hard',   icon: Crown,   labelKey: 'gameDifficulty.hard'   as const, subKey: 'gameDifficulty.hardSub'   as const, color: '#E74C3C', bgColor: '#FDEDEC' },
];

export default function GameModePage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { categoryId, modeId } = useParams<{ categoryId: string; modeId: string }>();
  const navigate = useNavigate();
  const mode = gameModes.find((m) => m.id === modeId);
  const gamePack = getGamePack(user?.persona?.targetLanguage);
  const hasPack = Boolean(gamePack);

  if (!mode) return null;

  const modeCopy = hasPack ? gamePack?.modeCopy[mode.id] : null;
  const modeTitle = modeCopy?.title || t(mode.labelKey as TranslationKey);
  const modeSubtitle = modeCopy?.subtitle || t(mode.sublabelKey as TranslationKey);

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader
          title={hasPack ? modeTitle : undefined}
          titleKey={hasPack ? undefined : mode.labelKey as TranslationKey}
          subtitle={hasPack ? `Pilih level ${gamePack?.language} yang sesuai, lalu mulai latihan.` : undefined}
          subtitleKey={hasPack ? undefined : 'game.difficultySubtitle'}
        />

        {/* Mode info */}
        <motion.div
          className="mx-5 md:mx-0 mb-8 rounded-2xl p-5 text-center"
          style={{ backgroundColor: hasPack ? gamePack?.accentSoft : mode.bgColor, border: `1px solid ${hasPack ? gamePack?.accent : mode.color}20` }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 p-2">
            {mode.icon.startsWith('/assets/') ? (
              <img src={mode.icon} alt="" className="h-full w-full object-contain" />
            ) : (
              <span className="text-4xl">{mode.icon}</span>
            )}
          </div>
          <h3 className="font-bold text-lg text-[#1A1A2E] mt-2">{modeTitle}</h3>
          <p className="text-sm text-[#6B7280]">{modeSubtitle}</p>
        </motion.div>

        {/* Difficulty cards */}
        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{hasPack ? `Pilih Level ${gamePack?.language}` : t('game.difficultyTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">{hasPack ? `Easy, Medium, dan Hard memakai bank soal ${gamePack?.language} berbeda.` : t('game.difficultySubtitle')}</p>

          <div className="grid gap-4 md:grid-cols-3">
            {difficulties.map((diff, i) => {
              const Icon = diff.icon;
              const copy = hasPack ? gamePack?.difficultyCopy[diff.id] : null;
              const color = hasPack ? gamePack?.accent : diff.color;
              const bgColor = hasPack ? gamePack?.accentSoft : diff.bgColor;
              return (
                <motion.button
                  key={diff.id}
                  className="bg-white rounded-2xl p-6 text-center cursor-pointer border border-gray-100/60 group relative overflow-hidden"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ y: -4, boxShadow: `0 8px 28px ${color}20` }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(`/game/${categoryId}/${modeId}/play?difficulty=${diff.id}`)}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ backgroundColor: color }} />
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: bgColor }}>
                    <Icon size={28} style={{ color }} />
                  </div>
                  <h3 className="font-bold text-base text-[#1A1A2E]">{copy?.title || t(diff.labelKey)}</h3>
                  <p className="text-sm text-[#6B7280] mt-1">{copy?.subtitle || t(diff.subKey)}</p>
                  <motion.div
                    className="mt-4 px-6 py-2.5 rounded-xl text-white text-sm font-bold"
                    style={{ backgroundColor: color }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {hasPack ? `Mulai ${gamePack?.language}` : t('common.play')}
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
