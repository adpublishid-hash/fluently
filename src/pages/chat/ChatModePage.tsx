import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader, NavCard } from '../../components/shared/NavComponents';
import { chatAIModes } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';

const cefrChatLevels = [
  { id: 'a1', label: 'A1', sublabel: 'Beginner', color: '#7EC3E6', bgColor: '#EAF7FC', icon: 'A1' },
  { id: 'a2', label: 'A2', sublabel: 'Elementary', color: '#4FA3D1', bgColor: '#EAF7FC', icon: 'A2' },
  { id: 'b1', label: 'B1', sublabel: 'Intermediate', color: '#3498DB', bgColor: '#EBF5FB', icon: 'B1' },
  { id: 'b2', label: 'B2', sublabel: 'Upper-Intermediate', color: '#2980B9', bgColor: '#D6EAF8', icon: 'B2' },
  { id: 'c1', label: 'C1', sublabel: 'Advanced', color: '#8E44AD', bgColor: '#F4ECF7', icon: 'C1' },
  { id: 'c2', label: 'C2', sublabel: 'Proficiency', color: '#9B59B6', bgColor: '#F4ECF7', icon: 'C2' },
];

export default function ChatModePage() {
  const { t } = useLanguage();
  const { modeId } = useParams<{ modeId: string }>();
  const navigate = useNavigate();
  const mode = chatAIModes.find((m) => m.id === modeId);

  if (!mode) return null;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey={mode.labelKey as TranslationKey} subtitleKey="chatAi.levelSub" />

        <div className="px-5 md:px-0 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: mode.color }}>
            {mode.icon.startsWith('/assets/') ? (
              <img src={mode.icon} alt="" className="h-5 w-5 object-contain" />
            ) : (
              <span>{mode.icon}</span>
            )}
            {t(mode.labelKey as TranslationKey)}
          </div>
        </div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{t('chatAi.levelTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">{t('chatAi.levelSub')}</p>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {cefrChatLevels.map((level, i) => (
              <NavCard
                key={level.id}
                icon={level.icon}
                label={level.label}
                sublabel={level.sublabel}
                color={level.color}
                bgColor={level.bgColor}
                onClick={() => navigate(`/chat/${modeId}/${level.id}`)}
                delay={0.06 * i}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
