import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader, NavCard } from '../../components/shared/NavComponents';
import { gameCategories, gameModes } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';
import { useAuth } from '../../auth/AuthContext';
import { getGamePack, isModeSupported } from '../../features/game/gamePacks';

export default function GameCategoryPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const category = gameCategories.find((c) => c.id === categoryId);
  const gamePack = getGamePack(user?.persona?.targetLanguage);
  const hasPack = Boolean(gamePack);

  if (!category) return null;

  const categoryLabel = hasPack
    ? gamePack?.categoryCopy[categoryId || ''] || t(category.labelKey as TranslationKey)
    : t(category.labelKey as TranslationKey);

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader
          title={hasPack ? categoryLabel : undefined}
          titleKey={hasPack ? undefined : category.labelKey as TranslationKey}
          subtitle={hasPack ? gamePack?.home.chooseSubtitle : undefined}
          subtitleKey={hasPack ? undefined : 'game.modesSubtitle'}
        />

        <div className="px-5 md:px-0 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: hasPack ? gamePack?.accent : category.color }}>
            <span>{categoryLabel}</span>
          </div>
        </div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{hasPack ? gamePack?.home.chooseTitle : t('game.modesTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">{hasPack ? `Mode ${gamePack?.language} untuk ${categoryLabel}.` : t('game.modesSubtitle')}</p>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {gameModes.filter((mode) => isModeSupported(gamePack, mode.id)).map((mode, i) => {
              const copy = hasPack ? gamePack?.modeCopy[mode.id] : null;
              return (
                <NavCard
                  key={mode.id}
                  icon={mode.icon}
                  label={copy?.title || t(mode.labelKey as TranslationKey)}
                  sublabel={copy?.subtitle || t(mode.sublabelKey as TranslationKey)}
                  color={hasPack ? gamePack?.accent : mode.color}
                  bgColor={hasPack ? gamePack?.accentSoft : mode.bgColor}
                  onClick={() => navigate(`/game/${categoryId}/${mode.id}`)}
                  delay={0.06 * i}
                />
              );
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
