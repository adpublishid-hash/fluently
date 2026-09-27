import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader, NavCard } from '../../components/shared/NavComponents';
import { gameCategories, gameModes } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';
import { useAuth } from '../../auth/AuthContext';
import { normalizeTargetLanguage } from '../../features/chat/targetLanguage';
import { arabicGameCategoryCopy, arabicGameHomeCopy, arabicGameModeCopy } from '../../features/game/arabicGameContent';

export default function GameCategoryPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const category = gameCategories.find((c) => c.id === categoryId);
  const isArabicGame = normalizeTargetLanguage(user?.persona?.targetLanguage) === 'Arabic';

  if (!category) return null;

  const categoryLabel = isArabicGame
    ? arabicGameCategoryCopy[categoryId || ''] || t(category.labelKey as TranslationKey)
    : t(category.labelKey as TranslationKey);

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader
          title={isArabicGame ? categoryLabel : undefined}
          titleKey={isArabicGame ? undefined : category.labelKey as TranslationKey}
          subtitle={isArabicGame ? arabicGameHomeCopy.chooseSubtitle : undefined}
          subtitleKey={isArabicGame ? undefined : 'game.modesSubtitle'}
        />

        <div className="px-5 md:px-0 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: isArabicGame ? '#0F766E' : category.color }}>
            <span>{categoryLabel}</span>
          </div>
        </div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{isArabicGame ? arabicGameHomeCopy.chooseTitle : t('game.modesTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">{isArabicGame ? `Mode Arabic untuk ${categoryLabel}.` : t('game.modesSubtitle')}</p>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {gameModes.map((mode, i) => {
              const copy = isArabicGame ? arabicGameModeCopy[mode.id] : null;
              return (
                <NavCard
                  key={mode.id}
                  icon={mode.icon}
                  label={copy?.title || t(mode.labelKey as TranslationKey)}
                  sublabel={copy?.subtitle || t(mode.sublabelKey as TranslationKey)}
                  color={isArabicGame ? '#0F766E' : mode.color}
                  bgColor={isArabicGame ? '#CCFBF1' : mode.bgColor}
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
