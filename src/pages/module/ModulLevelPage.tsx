import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader, NavCard } from '../../components/shared/NavComponents';
import { cefrLevels, skills } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';

export default function ModulLevelPage() {
  const { t } = useLanguage();
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const level = cefrLevels.find((l) => l.id === levelId);

  if (!level) return null;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey={level.labelKey as TranslationKey} subtitleKey="modul.skillsSubtitle" />

        {/* Level badge */}
        <div className="px-5 md:px-0 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: level.color }}>
            <span>{level.icon.startsWith('/assets/') ? <img src={level.icon} alt="" className="w-5 h-5 object-contain inline-block -mt-0.5" /> : level.icon}</span> {level.sublabel}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{t('modul.skillsTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">{t('modul.skillsSubtitle')}</p>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, i) => (
              <NavCard
                key={skill.id}
                icon={skill.icon}
                label={t(skill.labelKey as TranslationKey)}
                sublabel={t(skill.sublabelKey as TranslationKey)}
                color={skill.color}
                bgColor={skill.bgColor}
                progress={Math.round((skill.completedDays / skill.totalDays) * 100)}
                onClick={() => navigate(`/modul/${levelId}/${skill.id}`)}
                delay={0.05 * i}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
