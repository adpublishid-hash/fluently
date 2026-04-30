import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader, NavCard } from '../../components/shared/NavComponents';
import { chatAIModes, chatScenarios } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';

export default function ChatModePage() {
  const { t } = useLanguage();
  const { modeId } = useParams<{ modeId: string }>();
  const navigate = useNavigate();
  const mode = chatAIModes.find((m) => m.id === modeId);

  if (!mode) return null;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey={mode.labelKey as TranslationKey} subtitleKey="chatAi.scenariosSub" />

        <div className="px-5 md:px-0 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: mode.color }}>
            <span>{mode.icon}</span> {t(mode.labelKey as TranslationKey)}
          </div>
        </div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{t('chatAi.scenariosTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">{t('chatAi.scenariosSub')}</p>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {chatScenarios.map((scenario, i) => (
              <NavCard
                key={scenario.id}
                icon={scenario.icon}
                label={t(scenario.labelKey as TranslationKey)}
                sublabel={t(scenario.sublabelKey as TranslationKey)}
                color={scenario.color}
                bgColor={scenario.bgColor}
                onClick={() => navigate(`/chat/${modeId}/${scenario.id}`)}
                delay={0.06 * i}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
