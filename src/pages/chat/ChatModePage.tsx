import { useParams, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader, NavCard } from '../../components/shared/NavComponents';
import { chatAIModes } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';
import { useAuth } from '../../auth/AuthContext';
import { getFreeChatLevelBlockMessage, isFreeAiChatUser, isFreeChatLevelAllowed } from '../../features/chat/freeChatLimits';
import { getLocalizedModeCopy } from '../../features/chat/languageAdapters';
import { normalizeTargetLanguage } from '../../features/chat/targetLanguage';

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
  const { user } = useAuth();
  const { modeId } = useParams<{ modeId: string }>();
  const navigate = useNavigate();
  const mode = chatAIModes.find((m) => m.id === modeId);
  const isFreeUser = isFreeAiChatUser(user);
  const targetLanguage = normalizeTargetLanguage(user?.persona?.targetLanguage);
  const isArabicChat = targetLanguage === 'Arabic';

  if (!mode) return null;

  const modeCopy = isArabicChat
    ? getLocalizedModeCopy(targetLanguage, mode.id)
    : {
      label: t(mode.labelKey as TranslationKey),
      sublabel: t('chatAi.levelSub'),
    };
  const modeColor = isArabicChat ? '#0F766E' : mode.color;
  const modeBgColor = isArabicChat ? '#CCFBF1' : mode.bgColor;
  const arabicLevelCopy: Record<string, string> = {
    a1: 'Huruf, salam, dan kalimat pendek',
    a2: 'Rutinitas, tanya jawab, dan pola dasar',
    b1: 'Dialog, paragraf pendek, dan alasan',
    b2: 'Opini, cerita, dan koreksi struktur',
    c1: 'Diskusi detail dan teks kompleks',
    c2: 'Kalam, qiraah, dan kitabah tingkat tinggi',
  };

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader
          title={modeCopy.label}
          subtitle={isArabicChat ? modeCopy.sublabel : t('chatAi.levelSub')}
        />

        <div className="px-5 md:px-0 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: modeColor }}>
            {mode.icon.startsWith('/assets/') ? (
              <img src={mode.icon} alt="" className="h-5 w-5 object-contain" />
            ) : (
              <span>{mode.icon}</span>
            )}
            {modeCopy.label}
          </div>
        </div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">
            {isArabicChat ? 'Pilih Level Arabic' : t('chatAi.levelTitle')}
          </h2>
          <p className="text-[13px] text-[#6B7280] mb-5">
            {isArabicChat ? 'Mulai dari A1 untuk pondasi, atau pilih level sesuai kemampuan Arabic kamu.' : t('chatAi.levelSub')}
          </p>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {cefrChatLevels.map((level, i) => {
              const locked = isFreeUser && !isFreeChatLevelAllowed(level.id);
              return (
                <div key={level.id} className="relative">
                  <NavCard
                    icon={level.icon}
                    label={level.label}
                    sublabel={locked ? 'Pro level' : isArabicChat ? arabicLevelCopy[level.id] : level.sublabel}
                    color={locked ? '#CBD5E1' : isArabicChat ? modeColor : level.color}
                    bgColor={locked ? '#F8FAFC' : isArabicChat ? modeBgColor : level.bgColor}
                    onClick={() => locked ? navigate('/upgrade') : navigate(`/chat/${modeId}/${level.id}`)}
                    delay={0.06 * i}
                  />
                  {locked && (
                    <div className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-amber-600">
                      <Lock size={11} />
                      Pro
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {isFreeUser && (
            <p className="mt-4 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-xs font-bold leading-relaxed text-sky-700">
              {getFreeChatLevelBlockMessage('B1')} Free user juga hanya bisa generate 1 topik AI Chat per hari.
            </p>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
