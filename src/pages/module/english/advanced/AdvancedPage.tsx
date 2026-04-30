import { useNavigate } from 'react-router-dom';
import PageContainer from '../../../../components/layout/PageContainer';
import { PageHeader, NavCard } from '../../../../components/shared/NavComponents';
import { useLanguage } from '../../../../i18n/LanguageContext';
import { englishLevelContent } from '../levelContent';
import type { TranslationKey } from '../../../../i18n/translations';

export default function AdvancedPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const level = englishLevelContent.advanced;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey={level.titleKey as TranslationKey} subtitle={level.subtitle} />

        <div className="px-5 md:px-0 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: level.badgeColor }}>
            <img src={level.badgeIcon} alt="" className="w-5 h-5 object-contain inline-block -mt-0.5" /> {level.badge}
          </div>
        </div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{t('modul.skillsTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">{level.skillsIntro}</p>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {level.skills.map((skill, i) => (
              <NavCard
                key={skill.id}
                icon={skill.icon}
                label={skill.label}
                sublabel={skill.sublabel}
                color={skill.color}
                bgColor={skill.bgColor}
                progress={skill.progress}
                onClick={() => navigate(`/modul/english/advanced/${skill.id}`)}
                delay={0.05 * i}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
