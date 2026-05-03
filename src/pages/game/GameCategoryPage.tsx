import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader, NavCard } from '../../components/shared/NavComponents';
import { gameCategories, gameModes } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';

export default function GameCategoryPage() {
  const { t } = useLanguage();
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const category = gameCategories.find((c) => c.id === categoryId);

  if (!category) return null;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey={category.labelKey as TranslationKey} subtitleKey="game.modesSubtitle" />

        <div className="px-5 md:px-0 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: category.color }}>
            <span>{category.icon}</span> {t(category.labelKey as TranslationKey)}
          </div>
        </div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{t('game.modesTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">{t('game.modesSubtitle')}</p>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {gameModes.map((mode, i) => (
              <NavCard
                key={mode.id}
                icon={mode.icon}
                label={t(mode.labelKey as TranslationKey)}
                sublabel={t(mode.sublabelKey as TranslationKey)}
                color={mode.color}
                bgColor={mode.bgColor}
                onClick={() => navigate(`/game/${categoryId}/${mode.id}`)}
                delay={0.06 * i}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
