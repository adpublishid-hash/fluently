import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, KeyRound, Lock, MessageCircle, Search, Sparkles, Zap, Flame, ChevronRight, ArrowRight, Mic, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import PageContainer from '../../components/layout/PageContainer';
import { chatAIModes } from '../../data/mockData';
import { useAuth } from '../../auth/AuthContext';
import { formatRecentChatTime, getRecentChatRoute, getRecentChatSessions } from '../../features/chat/recentSessions';
import { getTargetLanguageLabel, normalizeTargetLanguage } from '../../features/chat/targetLanguage';
import { getLocalizedModeCopy } from '../../features/chat/languageAdapters';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';
import { hasUsableChatAiAccess } from '../../services/aiKeyService';

const fallbackRecentChats: { id: number; title: string; mode: string; modeId: string; time: string; color: string }[] = [];

const arabicShortcuts = [
  { title: 'Makharij Sprint', detail: 'Mulai dari huruf tenggorokan dan mad pendek.', route: '/chat/pronunciation', icon: Volume2 },
  { title: 'Nahwu Check', detail: "Latih mubtada-khabar dan fi'il-fa'il.", route: '/chat/grammar', icon: BookOpen },
  { title: 'Kalam Roleplay', detail: 'Jawab dengan microphone untuk dialog pendek.', route: '/chat/speaking', icon: Mic },
];

export default function ChatAIPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [recentChats, setRecentChats] = useState(() => getRecentChatSessions());
  const [hasAiAccess, setHasAiAccess] = useState(() => hasUsableChatAiAccess(user?.plan));
  const targetLanguage = normalizeTargetLanguage(user?.persona?.targetLanguage);
  const isArabicChat = targetLanguage === 'Arabic';
  const targetLanguageLabel = getTargetLanguageLabel(user?.persona?.targetLanguage);
  const replaceToken = (copy: string, token: string, value: string | number) => copy.replace(token, String(value));
  const heroBackground = isArabicChat
    ? 'linear-gradient(135deg, #0F766E 0%, #0D9488 50%, #115E59 100%)'
    : 'linear-gradient(135deg, #7EC3E6 0%, #4FA3D1 50%, #2980B9 100%)';

  useEffect(() => {
    const refreshRecentChats = () => setRecentChats(getRecentChatSessions());
    const refreshGeminiKey = () => setHasAiAccess(hasUsableChatAiAccess(user?.plan));
    refreshRecentChats();
    refreshGeminiKey();
    window.addEventListener('storage', refreshRecentChats);
    window.addEventListener('storage', refreshGeminiKey);
    window.addEventListener('focus', refreshRecentChats);
    window.addEventListener('focus', refreshGeminiKey);
    return () => {
      window.removeEventListener('storage', refreshRecentChats);
      window.removeEventListener('storage', refreshGeminiKey);
      window.removeEventListener('focus', refreshRecentChats);
      window.removeEventListener('focus', refreshGeminiKey);
    };
  }, [user?.plan]);

  const goToGeminiSetup = () => navigate('/profile');

  const getModeCopy = (mode: typeof chatAIModes[number]) => {
    if (isArabicChat) return getLocalizedModeCopy(targetLanguage, mode.id);
    return {
      label: t(mode.labelKey as TranslationKey),
      sublabel: t(mode.sublabelKey as TranslationKey),
    };
  };

  const filteredModes = chatAIModes.filter(mode => {
    const copy = getModeCopy(mode);
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      copy.label.toLowerCase().includes(q) ||
      copy.sublabel.toLowerCase().includes(q)
    );
  });

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">

        {/* ── Hero ── */}
        <motion.div
          className="mx-5 md:mx-0 mt-6 md:mt-0 rounded-3xl overflow-hidden relative"
          style={{ background: heroBackground }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Decorative blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-8 -right-8 w-44 h-44 bg-white/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-8 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute top-12 left-1/2 w-2 h-2 bg-white/40 rounded-full" />
            <div className="absolute top-20 right-24 w-1.5 h-1.5 bg-white/50 rounded-full" />
          </div>

          {/* Mascot (right side, fits inside the card) */}
          <motion.img
            src="/assets/mascot/ChatGPT-Image-2-Mei-2026-11.57.34-Diedit.png"
            alt="Fluently AI mascot"
            className="absolute right-0 bottom-0 h-full w-[42%] sm:w-[40%] md:w-[38%] lg:w-[34%] object-contain pointer-events-none select-none drop-shadow-xl"
            style={{ objectPosition: '100% 100%' }}
            initial={{ opacity: 0, x: 24, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            loading="eager"
          />

          <div className="relative p-6 md:p-8 pr-[44%] sm:pr-[42%] md:pr-[40%] lg:pr-[36%]">
            {/* Top badge */}
            <motion.div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
            >
              <Sparkles size={11} className="text-white" />
              <span className="text-[10.5px] font-extrabold text-white tracking-wider uppercase">
                {replaceToken(t('chatAi.heroBadge'), '{language}', targetLanguageLabel)}
              </span>
            </motion.div>

            <div className="flex items-start gap-3">
              <motion.div
                className="w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/25 shrink-0 shadow-lg"
                initial={{ rotate: -8, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
              >
                <MessageCircle size={28} className="text-white md:w-8 md:h-8" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-black leading-tight">{t('chatAi.title')}</h1>
                <p className="text-white/80 text-[12.5px] md:text-sm font-medium mt-1.5 leading-relaxed">
                  {isArabicChat ? 'Tutor Arabic AI untuk mufradat, makharij, nahwu-sharaf, kalam, qiraah, dan kitabah.' : t('chatAi.subtitle')}
                </p>
                {isArabicChat && (
                  <div className="mt-3 inline-flex max-w-full flex-col rounded-2xl border border-white/20 bg-white/15 px-4 py-2 backdrop-blur-sm">
                    <span dir="rtl" lang="ar" className="truncate text-xl font-black leading-relaxed text-white">أَهْلًا وَسَهْلًا</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Ahlan wa sahlan</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stat strip — full width, sits below the masthead and behind the mascot's lower edge */}
          <motion.div
            className="relative grid grid-cols-3 gap-2 px-5 md:px-8 pb-5 md:pb-7 -mt-1 z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {[
              { id: 'energy',  icon: Zap,      label: t('chatAi.statAiEnergy'), value: user?.plan === 'free' ? t('chatAi.statDailyQuota') : t('chatAi.statUnlimited') },
              { id: 'streak',  icon: Flame,    label: t('chatAi.statStreak'),   value: `${user?.streak ?? 0} ${t('chatAi.statDays')}` },
              { id: 'session', icon: Sparkles, label: t('chatAi.statSessions'), value: `${recentChats.length} ${t('chatAi.statDone')}` },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="bg-white/15 backdrop-blur-sm rounded-2xl px-2.5 py-2.5 border border-white/20"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon size={11} className="text-white/80 shrink-0" />
                    <span className="text-[9.5px] font-bold text-white/70 uppercase tracking-wider truncate">{stat.label}</span>
                  </div>
                  <p className="text-white text-[13px] font-extrabold leading-none truncate">{stat.value}</p>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {isArabicChat && (
          <motion.section
            className="mx-5 mt-5 rounded-3xl border border-teal-100 bg-white p-4 shadow-sm md:mx-0"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0F766E]">Arabic Coach</p>
                <h2 className="text-base font-black text-[#0F172A]">Mulai cepat sesuai skill Arabic</h2>
              </div>
              <p className="text-xs font-semibold text-slate-500">Pakai voice untuk makharij dan kalam.</p>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {arabicShortcuts.map((shortcut) => {
                const Icon = shortcut.icon;
                return (
                  <button
                    key={shortcut.title}
                    type="button"
                    onClick={() => hasAiAccess ? navigate(shortcut.route) : goToGeminiSetup()}
                    className="group rounded-2xl border border-teal-100 bg-teal-50/50 p-4 text-left transition hover:-translate-y-0.5 hover:bg-teal-50 hover:shadow-sm disabled:opacity-60"
                    disabled={!hasAiAccess}
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white text-[#0F766E]">
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-black text-[#0F172A]">{shortcut.title}</h3>
                        <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{shortcut.detail}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* ── Search bar ── */}
        <motion.div
          className="px-5 md:px-0 mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-center gap-2.5 bg-white rounded-2xl px-4 py-3 border border-gray-100 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/40 transition-all" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <Search size={16} className="text-text-muted shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('chatAi.searchPlaceholder')}
              className="flex-1 bg-transparent text-[13.5px] text-text-primary placeholder:text-text-muted outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-[11px] font-bold text-primary hover:text-primary-dark cursor-pointer"
              >
                {t('common.clear')}
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Focus cards ── */}
        <div className="px-5 md:px-0 mt-7 mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-base font-extrabold text-text-primary">{t('chatAi.focusTitle')}</h2>
            <p className="text-[12.5px] text-text-muted mt-0.5">{t('chatAi.focusSub')}</p>
          </div>
          <span className="text-[11px] font-bold text-text-muted">{filteredModes.length} {t('chatAi.focusUnit')}</span>
        </div>

        {!hasAiAccess && (
          <motion.div
            className="mx-5 md:mx-0 mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
                  <KeyRound size={18} />
                </div>
                <div>
                  <p className="text-sm font-black text-amber-900">{t('chatAi.geminiLockedTitle')}</p>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-amber-700">
                    {t('chatAi.geminiLockedBody')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={goToGeminiSetup}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-black text-white shadow-sm transition hover:bg-amber-600"
              >
                {t('chatAi.setupProfile')}
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}

        <div className="px-5 md:px-0">
          {filteredModes.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 py-12 text-center">
              <p className="text-[13px] text-text-muted">
                {replaceToken(t('chatAi.noFocusMatches'), '{search}', search)}
              </p>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {filteredModes.map((mode, i) => {
                const copy = getModeCopy(mode);
                return (
                  <ModeCard
                    key={mode.id}
                    icon={mode.icon}
                    label={copy.label}
                    sublabel={copy.sublabel}
                    color={isArabicChat ? '#0F766E' : mode.color}
                    bgColor={isArabicChat ? '#CCFBF1' : mode.bgColor}
                    onClick={() => hasAiAccess ? navigate(`/chat/${mode.id}`) : goToGeminiSetup()}
                    delay={0.05 * i}
                    disabled={!hasAiAccess}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* ── Recent chats ── */}
        {!search && (
          <>
            <div className="px-5 md:px-0 mt-8 mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-base font-extrabold text-text-primary">{t('chatAi.continueTitle')}</h2>
                <p className="text-[12.5px] text-text-muted mt-0.5">{t('chatAi.continueSubtitle')}</p>
              </div>
              <button className="text-[11px] font-bold text-primary hover:underline cursor-pointer">{t('common.viewAll')}</button>
            </div>

            <div className="px-5 md:px-0 grid gap-2.5 md:grid-cols-2 lg:grid-cols-3">
              {(recentChats.length ? recentChats : fallbackRecentChats).slice(0, 3).map((chat, i) => {
                const route = getRecentChatRoute(chat);
                const mode = 'modeLabel' in chat ? chat.modeLabel : chat.mode;
                const time = 'updatedAt' in chat ? formatRecentChatTime(chat.updatedAt) : chat.time;
                return (
                <motion.button
                  key={chat.id}
                  className="bg-white rounded-2xl p-4 text-left cursor-pointer border border-gray-100 group flex items-center gap-3"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.4 }}
                  whileHover={{ y: -2, boxShadow: `0 8px 22px ${chat.color}1a` }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => hasAiAccess ? navigate(route) : goToGeminiSetup()}
                  disabled={!hasAiAccess}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${chat.color}18` }}
                  >
                    <MessageCircle size={18} style={{ color: chat.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-extrabold text-text-primary truncate">{chat.title}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: `${chat.color}15`, color: chat.color }}
                      >
                        {mode}
                      </span>
                      <span className="text-[10px] text-text-muted">{time}</span>
                    </div>
                  </div>
                  {hasAiAccess ? (
                    <ArrowRight size={14} className="text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                  ) : (
                    <Lock size={14} className="text-amber-400 shrink-0" />
                  )}
                </motion.button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
}

/* ── Enhanced mode card with badge support ── */
function ModeCard({
  icon, label, sublabel, color, bgColor, onClick, delay = 0, isPopular, isNew, disabled = false,
}: {
  icon: string;
  label: string;
  sublabel: string;
  color: string;
  bgColor: string;
  onClick: () => void;
  delay?: number;
  isPopular?: boolean;
  isNew?: boolean;
  disabled?: boolean;
}) {
  const { t } = useLanguage();
  const [iconFailed, setIconFailed] = useState(false);

  return (
    <motion.button
      className={`w-full rounded-2xl border border-gray-100 bg-white p-5 text-left relative overflow-hidden group ${disabled ? 'cursor-not-allowed opacity-60 grayscale-[0.25]' : 'cursor-pointer'}`}
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, type: 'spring', stiffness: 200 }}
      whileHover={disabled ? undefined : { y: -3, boxShadow: `0 10px 28px ${color}22` }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {/* Accent stripe */}
      <div className="absolute top-0 left-0 w-1 h-full rounded-r-full" style={{ backgroundColor: color }} />

      {/* Top-right badge */}
      {(disabled || isPopular || isNew) && (
        <div className="absolute top-3 right-3">
          {disabled && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-amber-600">
              <Lock size={10} /> {t('chatAi.setupKey')}
            </span>
          )}
          {isPopular && (
            <span
              className="text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider"
              style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}
            >
              🔥 {t('chatAi.popular')}
            </span>
          )}
          {isNew && (
            <span
              className="text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider"
              style={{ backgroundColor: bgColor, color }}
            >
              ✨ {t('chatAi.new')}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 p-2" style={{ backgroundColor: bgColor }}>
          {icon.startsWith('/assets/') && !iconFailed ? (
            <img src={icon} alt="" className="w-full h-full object-contain" onError={() => setIconFailed(true)} />
          ) : (
            <span className="text-lg font-black" style={{ color }}>{icon.startsWith('/assets/') ? label.slice(0, 1) : icon}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-extrabold text-[15px] text-text-primary truncate">{label}</h3>
          <p className="text-[12px] text-text-muted font-medium mt-0.5 line-clamp-2 leading-snug">{sublabel}</p>
        </div>
        {disabled ? (
          <Lock size={18} className="text-amber-400 shrink-0" />
        ) : (
          <ChevronRight size={18} className="text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
        )}
      </div>
    </motion.button>
  );
}
