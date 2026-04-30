import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader, NavCard } from '../../components/shared/NavComponents';
import { practiceQuestionTypes } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';

export default function LatihanSkillPage() {
  const { t } = useLanguage();
  const { levelId, skillId } = useParams<{ levelId: string; skillId: string }>();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="latihan.questionTypes" subtitleKey="latihan.questionTypesSub" />

        <div className="px-5 md:px-0">
          <div className="grid gap-3 md:grid-cols-2">
            {practiceQuestionTypes.map((qt, i) => (
              <NavCard
                key={qt.id}
                icon={qt.icon}
                label={t(qt.labelKey as TranslationKey)}
                sublabel={t(qt.sublabelKey as TranslationKey)}
                color={qt.color}
                bgColor={qt.bgColor}
                onClick={() => navigate(`/latihan/${levelId}/${skillId}/start`)}
                delay={0.06 * i}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
