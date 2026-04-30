import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader, NavCard } from '../../components/shared/NavComponents';
import { skills } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';

export default function LatihanLevelPage() {
  const { t } = useLanguage();
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="latihan.skillsTitle" subtitleKey="modul.skillsSubtitle" />

        <div className="px-5 md:px-0">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, i) => (
              <NavCard
                key={skill.id}
                icon={skill.icon}
                label={t(skill.labelKey as TranslationKey)}
                sublabel={t(skill.sublabelKey as TranslationKey)}
                color={skill.color}
                bgColor={skill.bgColor}
                onClick={() => navigate(`/latihan/${levelId}/${skill.id}`)}
                delay={0.05 * i}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
