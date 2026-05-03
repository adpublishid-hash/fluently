import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Mail, Check, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/translations';
import type { UserPersona } from '../auth/AuthContext';

interface OnboardingPageProps {
  onComplete: (persona?: UserPersona) => void | Promise<void>;
  onSignIn?: () => void;
  introOnly?: boolean;   // Show only the first 3 intro slides (Welcome, Goals, StartLearning)
  surveyOnly?: boolean;  // Skip intro+signup, start from WelcomeUser (survey slides only)
}

/* ──────────────── constants ──────────────── */

const TOTAL_SURVEY_STEPS = 10; // steps 5-14 (after signup)

const AGE_RANGES = ['16-17', '19-24', '25-34', '35-44', '45-60', '65+'];

const TARGET_LANGUAGES = [
  { name: 'English', label: 'Bahasa Inggris', code: 'EN' },
  { name: 'Arabic', label: 'Bahasa Arab', code: 'AR' },
  { name: 'Mandarin', label: 'Bahasa Mandarin', code: 'ZH' },
  { name: 'Japanese', label: 'Bahasa Jepang', code: 'JA' },
];

const LEVELS_BY_LANGUAGE: Record<string, { name: string; desc: string }[]> = {
  English: [
    { name: 'Beginner', desc: 'A1 - A2: basic phrases and simple conversations' },
    { name: 'Elementary', desc: 'A2: everyday topics with more confidence' },
    { name: 'Intermediate', desc: 'B1: independent communication' },
    { name: 'Upper-Intermediate', desc: 'B2: fluent, structured conversations' },
    { name: 'Advanced', desc: 'C1: complex topics and academic/professional use' },
    { name: 'Proficiency', desc: 'C2: near-native precision and fluency' },
  ],
  Arabic: [
    { name: 'Novice', desc: 'ACTFL Novice: letters, sounds, and memorized phrases' },
    { name: 'Elementary', desc: 'ACTFL Novice High: simple daily interactions' },
    { name: 'Intermediate', desc: 'ACTFL Intermediate: familiar topics and connected sentences' },
    { name: 'Upper-Intermediate', desc: 'ACTFL Intermediate High: longer conversations and narration' },
    { name: 'Advanced', desc: 'ACTFL Advanced: paragraph-level speech and real-world tasks' },
    { name: 'Superior', desc: 'ACTFL Superior: abstract, formal, and professional Arabic' },
  ],
  Mandarin: [
    { name: 'HSK 1', desc: 'Beginner: basic words and short phrases' },
    { name: 'HSK 2', desc: 'Elementary: simple daily conversations' },
    { name: 'HSK 3', desc: 'Intermediate: familiar topics and routine situations' },
    { name: 'HSK 4', desc: 'Upper-Intermediate: discuss broader topics fluently' },
    { name: 'HSK 5', desc: 'Advanced: read media and express nuanced ideas' },
    { name: 'HSK 6', desc: 'Proficiency: understand complex Mandarin with ease' },
  ],
  Japanese: [
    { name: 'N5', desc: 'Beginner: hiragana, katakana, and basic phrases' },
    { name: 'N4', desc: 'Elementary: daily expressions and simple conversations' },
    { name: 'N3', desc: 'Intermediate: familiar topics and connected sentences' },
    { name: 'N2', desc: 'Upper-Intermediate: broader texts and natural conversation' },
    { name: 'N1', desc: 'Advanced: complex Japanese in academic and professional contexts' },
  ],
};

const LANGUAGES = [
  { name: 'English', flag: '🇬🇧' },
  { name: 'French', flag: '🇫🇷' },
  { name: 'Spanish', flag: '🇪🇸' },
  { name: 'Italian', flag: '🇮🇹' },
  { name: 'German', flag: '🇩🇪' },
  { name: 'Japanese', flag: '🇯🇵' },
  { name: 'Chinese', flag: '🇨🇳' },
];

/* ──────────────── animation variants ──────────────── */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};
const staggerItem = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

/* ──────────────── shared components ──────────────── */

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex-1 h-2 md:h-2.5 bg-gray-100 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: 'linear-gradient(90deg, #4FA3D1, #2F86B5)' }}
        initial={{ width: 0 }}
        animate={{ width: `${(current / total) * 100}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gray-50 border border-gray-200/60 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all shadow-sm"
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.05 }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      <ChevronLeft size={20} className="text-[#1A1A2E]" />
    </motion.button>
  );
}

function ContinueButton({ onClick, disabled = false, label }: { onClick: () => void; disabled?: boolean; label?: string }) {
  const { t } = useLanguage();
  const buttonLabel = label || t('common.continue');
  return (
    <motion.button
      className="w-full py-4 md:py-4.5 rounded-2xl text-white font-bold text-[15px] md:text-base tracking-wide cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed disabled:shadow-none relative overflow-hidden"
      style={{
        background: !disabled ? 'linear-gradient(135deg, #4FA3D1 0%, #1E6F9F 100%)' : '#7EC3E6',
        boxShadow: !disabled ? '0 8px 24px rgba(79, 163, 209, 0.45), inset 0 1px 0 rgba(255,255,255,0.2)' : 'none',
      }}
      whileHover={!disabled ? { scale: 1.02, boxShadow: '0 10px 28px rgba(79, 163, 209, 0.55), inset 0 1px 0 rgba(255,255,255,0.2)' } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      disabled={disabled}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      {!disabled && <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0" />}
      <span className="relative z-10">{buttonLabel}</span>
    </motion.button>
  );
}

function SurveyHeader({ onBack, step }: { onBack: () => void; step: number }) {
  return (
    <div className="flex items-center gap-4 px-6 md:px-8 pt-6 md:pt-8 pb-2">
      <BackButton onClick={onBack} />
      <ProgressBar current={step} total={TOTAL_SURVEY_STEPS} />
    </div>
  );
}

/* ──────────────── Desktop Layout Wrappers ──────────────── */

/** Left branding panel for split-screen desktop layouts */
function DesktopBrandPanel({ gradient, mascotSrc, mascotAlt }: { gradient: string; mascotSrc?: string; mascotAlt?: string }) {
  return (
    <div className="hidden md:flex flex-col items-center justify-center w-[45%] lg:w-[50%] relative overflow-hidden" style={{ background: gradient }}>
      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-56 h-56 bg-white/8 rounded-full blur-3xl" />
      <motion.div className="absolute top-24 right-16 w-3 h-3 bg-white/40 rounded-full" animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 3 }} />
      <motion.div className="absolute bottom-32 left-20 w-2 h-2 bg-white/50 rounded-full" animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 1 }} />
      
      {/* Mascot */}
      {mascotSrc && (
        <motion.div
          className="relative w-64 h-64 lg:w-80 lg:h-80"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
        >
          <motion.div
            className="absolute -inset-6 rounded-full border-4 border-white/15"
            animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F5A623]/80 to-[#E8941A]/80 flex items-center justify-center overflow-hidden shadow-2xl border-4 border-white/15">
            <img src={mascotSrc} alt={mascotAlt || 'Mascot'} className="w-full h-full object-cover object-top scale-110" />
          </div>
        </motion.div>
      )}

      {/* Tagline */}
      <motion.p
        className="mt-8 text-white/80 text-lg font-semibold text-center max-w-xs leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Learn languages fluently with AI-powered conversations
      </motion.p>
    </div>
  );
}

/** Wrapper for survey steps on desktop — centered card with max-width */
function SurveyDesktopWrapper({ children, bgImage }: { children: React.ReactNode; bgImage?: string }) {
  return (
    <div className="min-h-screen md:flex">
      {/* Desktop left panel */}
      <div className="hidden md:flex flex-col items-center justify-center w-[40%] lg:w-[45%] relative overflow-hidden bg-gradient-to-br from-[#4FA3D1] via-[#2F86B5] to-[#1E6F9F]">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-56 h-56 bg-white/8 rounded-full blur-3xl" />
        <motion.div className="absolute top-24 right-16 w-3 h-3 bg-white/40 rounded-full" animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 3 }} />
        
        {bgImage ? (
          <motion.img
            src={bgImage}
            alt=""
            className="w-64 h-64 lg:w-72 lg:h-72 object-contain drop-shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
          />
        ) : (
          <motion.div
            className="w-48 h-48 rounded-full bg-white/10 backdrop-blur flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <span className="text-8xl">🐻</span>
          </motion.div>
        )}

        <motion.p className="mt-8 text-white/80 text-lg font-semibold text-center max-w-xs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          Learn languages fluently with AI-powered conversations
        </motion.p>
      </div>

      {/* Right content panel */}
      <div className="flex-1 md:flex md:items-center md:justify-center md:bg-gray-50/50">
        <div className="w-full md:max-w-[520px] md:mx-auto md:my-8 md:bg-white md:rounded-3xl md:shadow-xl md:border md:border-gray-100/80 md:overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ──────────────── Language Switcher ──────────────── */

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const options: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
  ];

  return (
    <motion.div
      className="flex bg-white/20 backdrop-blur-md rounded-full p-1 border border-white/30"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      {options.map((opt) => (
        <motion.button
          key={opt.code}
          onClick={(e) => { e.stopPropagation(); setLanguage(opt.code); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer ${
            language === opt.code
              ? 'bg-white text-[#1A1A2E] shadow-md'
              : 'text-white/90 hover:bg-white/10'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg">{opt.flag}</span>
          <span>{opt.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}

/* ──────────────── SCREEN 1: Welcome ──────────────── */

const FEATURES = [
  { icon: '🤖', label: 'AI Conversations', desc: 'Practice with real-time AI tutor' },
  { icon: '🌍', label: '4 Languages', desc: 'English · Arabic · Mandarin · Japanese' },
  { icon: '🏆', label: '50K+ Learners', desc: 'Trusted by learners worldwide' },
];

function WelcomeSlide() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen" style={{ background: 'linear-gradient(160deg, #1A6FA8 0%, #2F86B5 40%, #4FA3D1 100%)' }}>
      <div className="flex flex-col items-center justify-between flex-1 px-6 pt-16 pb-12 relative overflow-hidden">

        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-16 w-56 h-56 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
        <motion.div className="absolute top-24 left-6 w-2.5 h-2.5 bg-white/40 rounded-full" animate={{ y: [0,-14,0], opacity:[0.4,0.9,0.4] }} transition={{ repeat: Infinity, duration: 3 }} />
        <motion.div className="absolute top-40 right-10 w-2 h-2 bg-yellow-300/60 rounded-full" animate={{ y: [0,-10,0] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.7 }} />
        <motion.div className="absolute bottom-52 left-12 w-3 h-3 bg-white/30 rounded-full" animate={{ y: [0,-18,0] }} transition={{ repeat: Infinity, duration: 4, delay: 1.2 }} />

        {/* Logo + Title */}
        <div className="flex flex-col items-center">
          <motion.div
            className="relative mb-5"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 160, damping: 18 }}
          >
            <motion.div
              className="absolute -inset-3 rounded-full border-[3px] border-white/25"
              animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.55, 0.25] }}
              transition={{ repeat: Infinity, duration: 2.8 }}
            />
            <div className="w-24 h-24 rounded-full bg-white shadow-2xl flex items-center justify-center p-3">
              <img src="/assets/Logo-fluently.png" alt="Fluently" className="w-full h-full object-contain" />
            </div>
          </motion.div>

          <motion.p
            className="text-white/70 text-[13px] font-semibold tracking-widest uppercase mb-1"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            Welcome to
          </motion.p>
          <motion.h1
            className="text-white text-[42px] font-extrabold tracking-tight leading-none mb-2"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, type: 'spring' }}
          >
            Fluently
          </motion.h1>
          <motion.p
            className="text-white/75 text-[15px] font-medium text-center leading-relaxed max-w-[260px]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          >
            {t('welcome.title')}
          </motion.p>
        </div>

        {/* Feature cards */}
        <motion.div
          className="w-full space-y-3 mt-2"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.label}
              className="flex items-center gap-4 bg-white/12 backdrop-blur-sm rounded-2xl px-4 py-3.5 border border-white/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.95 + i * 0.1, type: 'spring', stiffness: 200 }}
            >
              <span className="text-2xl shrink-0">{f.icon}</span>
              <div>
                <p className="text-white font-extrabold text-[14px] leading-tight">{f.label}</p>
                <p className="text-white/65 text-[12px] font-medium">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom: language switcher + dots */}
        <motion.div
          className="flex flex-col items-center gap-4 w-full"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
        >
          <LanguageSwitcher />
          <div className="flex gap-2.5 mt-1">
            <div className="w-8 h-2 rounded-full bg-white shadow-sm" />
            <div className="w-2 h-2 rounded-full bg-white/35" />
            <div className="w-2 h-2 rounded-full bg-white/35" />
          </div>
          <p className="text-white/45 text-[11px] font-medium tracking-wide">Tap anywhere to continue</p>
        </motion.div>
      </div>
    </div>
  );
}

/* ──────────────── SCREEN 2: Goals ──────────────── */

const GOAL_FEATURES = [
  { icon: '💬', title: 'AI-Powered Chat', desc: 'Practice real conversations with smart AI feedback' },
  { icon: '📈', title: 'Track Progress', desc: 'XP, streaks, and level system keep you motivated' },
  { icon: '🎯', title: 'Personalized Path', desc: 'Lessons tailored to your goals and level' },
];

const STATS = [
  { value: '50K+', label: 'Learners' },
  { value: '4', label: 'Languages' },
  { value: '4.9★', label: 'Rating' },
];

function GoalsSlide({ onNext, onSignIn }: { onNext: () => void; onSignIn: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen">
      {/* Desktop brand panel */}
      <DesktopBrandPanel
        gradient="linear-gradient(135deg, #FF7EB3 0%, #FF5A8A 100%)"
        mascotSrc="/assets/mascot/Mascot.png"
        mascotAlt="Business Bear"
      />

      {/* Content side */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        {/* Mobile: full-screen image bg */}
        <motion.div
          className="absolute inset-0 z-0 md:hidden"
          style={{ background: 'linear-gradient(160deg, #FF7EB3 0%, #E05A8C 100%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/assets/mascot/Mascot.png"
            alt="Business Bear"
            className="w-full h-full object-cover object-top opacity-80"
          />
          {/* Overlay gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </motion.div>

        {/* Floating stat badges on mobile */}
        <div className="flex-1 relative z-10 flex items-end justify-center pb-4 md:hidden">
          <motion.div
            className="flex gap-3 px-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {STATS.map((s) => (
              <div key={s.label} className="bg-white/95 backdrop-blur rounded-2xl px-3 py-2 text-center shadow-lg border border-white/50">
                <p className="text-[17px] font-extrabold text-[#1A1A2E] leading-tight">{s.value}</p>
                <p className="text-[10px] font-semibold text-[#6B7280]">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* White sheet */}
        <motion.div
          className="bg-white rounded-t-[36px] md:rounded-none px-7 pt-7 pb-8 relative z-10 md:flex md:flex-col md:items-center md:justify-center md:flex-1"
          style={{ boxShadow: '0 -12px 40px rgba(0,0,0,0.1)' }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.55, type: 'spring', stiffness: 100 }}
        >
          <div className="md:max-w-md md:w-full">
            {/* Title */}
            <motion.h2
              className="text-[24px] md:text-3xl font-extrabold text-[#1A1A2E] leading-tight mb-1"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            >
              {t('goals.title').split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </motion.h2>
            <motion.p
              className="text-[13.5px] text-[#6B7280] mb-5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            >
              {t('goals.subtitle')}
            </motion.p>

            {/* Feature list */}
            <motion.div
              className="space-y-3 mb-6"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            >
              {GOAL_FEATURES.map((f) => (
                <div key={f.title} className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
                  <span className="text-xl shrink-0">{f.icon}</span>
                  <div>
                    <p className="text-[13px] font-extrabold text-[#1A1A2E] leading-tight">{f.title}</p>
                    <p className="text-[11px] text-[#9CA3AF] font-medium">{f.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Stats — desktop only (mobile shown above) */}
            <motion.div
              className="hidden md:flex gap-4 mb-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            >
              {STATS.map((s) => (
                <div key={s.label} className="flex-1 bg-primary/5 rounded-2xl py-3 text-center border border-primary/10">
                  <p className="text-[18px] font-extrabold text-primary leading-tight">{s.value}</p>
                  <p className="text-[11px] font-semibold text-[#6B7280]">{s.label}</p>
                </div>
              ))}
            </motion.div>

            <ContinueButton onClick={(e?: React.MouseEvent) => { e?.stopPropagation(); onNext(); }} label={t('goals.getStarted')} />
            <p className="text-center mt-4 text-[13px] text-[#6B7280]">
              Already have an account?{' '}
              <button
                onClick={(e) => { e.stopPropagation(); onSignIn(); }}
                className="font-extrabold text-primary cursor-pointer hover:underline"
              >
                {t('goals.signIn')}
              </button>
            </p>

            <div className="flex justify-center gap-2.5 mt-5">
              <div className="w-2 h-2 rounded-full bg-[#7EC3E6]/30" />
              <div className="w-8 h-2 rounded-full bg-[#7EC3E6]" style={{ boxShadow: '0 0 8px rgba(126,195,230,0.4)' }} />
              <div className="w-2 h-2 rounded-full bg-[#7EC3E6]/30" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ──────────────── SCREEN 3: Start Learning ──────────────── */

function SocialToast({ msg }: { msg: string }) {
  return (
    <motion.div
      className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#1A1A2E] text-white text-[12px] font-bold px-4 py-2.5 rounded-full shadow-xl z-50 whitespace-nowrap"
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {msg}
    </motion.div>
  );
}

function StartLearningSlide({ onNext, onSignIn }: { onNext: () => void; onSignIn: () => void }) {
  const { t } = useLanguage();
  const [toast, setToast] = useState<string | null>(null);

  const showComingSoon = (name: string) => {
    setToast(`${name} login coming soon!`);
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <div className="flex min-h-screen">
      {/* Desktop brand panel */}
      <DesktopBrandPanel
        gradient="linear-gradient(135deg, #B5CC00 0%, #D3E84D 100%)"
        mascotSrc="/assets/mascot/Gemini_Generated_Image_rer4izrer4izrer4 1.png"
        mascotAlt="Super Bear"
      />

      {/* Content side */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        {/* Mobile bg */}
        <motion.div
          className="absolute inset-0 z-0 md:hidden"
          style={{ background: 'linear-gradient(160deg, #B5CC00 0%, #D3E84D 100%)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
        >
          <img
            src="/assets/mascot/Gemini_Generated_Image_rer4izrer4izrer4 1.png"
            alt="Super Bear"
            className="w-full h-full object-cover object-top opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </motion.div>

        <div className="flex-1 relative z-10" />

        {/* White sheet */}
        <motion.div
          className="bg-white rounded-t-[36px] md:rounded-none px-7 pt-7 pb-8 relative z-10 md:flex md:flex-col md:items-center md:justify-center md:flex-1"
          style={{ boxShadow: '0 -12px 40px rgba(0,0,0,0.1)' }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.55, type: 'spring', stiffness: 100 }}
        >
          <div className="md:max-w-md md:w-full">
            {/* Header */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            >
              <h2 className="text-[23px] font-extrabold text-[#1A1A2E] leading-tight mb-1">
                Join 50,000+ Learners 🌟
              </h2>
              <p className="text-[13px] text-[#9CA3AF] font-medium">Create your free account in seconds</p>
            </motion.div>

            {/* Social buttons */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            >
              <button
                onClick={(e) => { e.stopPropagation(); showComingSoon('Google'); }}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl border-2 border-gray-200 bg-white text-[13.5px] font-bold text-[#1A1A2E] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer shadow-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </motion.div>

            {/* Divider */}
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.62 }}
            >
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-gray-100" />
            </motion.div>

            {/* Email CTA */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="w-full py-4 rounded-2xl text-white font-extrabold text-[15px] flex items-center justify-center gap-2.5 cursor-pointer relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #4FA3D1 0%, #1E6F9F 100%)',
                boxShadow: '0 8px 24px rgba(79,163,209,0.45)',
              }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0" />
              <Mail size={18} className="relative z-10" />
              <span className="relative z-10">{t('startLearning.continueEmail')}</span>
            </motion.button>

            {/* Sign In */}
            <motion.p
              className="text-center mt-4 text-[13px] text-[#6B7280]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
            >
              Already a member?{' '}
              <button
                onClick={(e) => { e.stopPropagation(); onSignIn(); }}
                className="font-extrabold text-primary cursor-pointer hover:underline"
              >
                Sign In
              </button>
            </motion.p>

            {/* Terms */}
            <motion.p
              className="text-center mt-3 text-[10.5px] text-[#C4C4C4] leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            >
              {t('startLearning.terms')}{' '}
              <span className="underline cursor-pointer text-[#9CA3AF]">{t('startLearning.termsLink')}</span>{' '}
              {t('startLearning.privacyIntro')}{' '}
              <span className="underline cursor-pointer text-[#9CA3AF]">{t('startLearning.privacyLink')}</span>.
            </motion.p>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-5">
              <div className="w-2 h-2 rounded-full bg-[#7EC3E6]/30" />
              <div className="w-2 h-2 rounded-full bg-[#7EC3E6]/30" />
              <div className="w-8 h-2 rounded-full bg-[#7EC3E6]" style={{ boxShadow: '0 0 8px rgba(126,195,230,0.4)' }} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && <SocialToast msg={toast} />}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────── SCREEN 4: Sign Up ──────────────── */

function getPasswordStrength(pw: string): { score: number; key: 'signUp.passwordStrength.weak' | 'signUp.passwordStrength.fair' | 'signUp.passwordStrength.good' | 'signUp.passwordStrength.strong'; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score: 1, key: 'signUp.passwordStrength.weak', color: '#EF4444' };
  if (score === 2) return { score: 2, key: 'signUp.passwordStrength.fair', color: '#F59E0B' };
  if (score === 3) return { score: 3, key: 'signUp.passwordStrength.good', color: '#3B82F6' };
  return { score: 4, key: 'signUp.passwordStrength.strong', color: '#7EC3E6' };
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-[13px] font-bold text-[#4A4A4A] mb-1.5 ml-1">{label}</label>
      {children}
      {error && (
        <motion.div
          className="flex items-center gap-1.5 mt-1.5 ml-1"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle size={13} className="text-red-500 flex-shrink-0" />
          <span className="text-[12px] font-semibold text-red-500">{error}</span>
        </motion.div>
      )}
    </div>
  );
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUpSlide({ data, setData, onNext, onBack }: {
  data: SignUpData;
  setData: (d: SignUpData) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const markTouched = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));

  // Validation
  const errors: Record<string, string> = {};
  if (!data.name.trim()) errors.name = t('signUp.errorNameRequired');
  if (!data.email.trim()) errors.email = t('signUp.errorEmailRequired');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = t('signUp.errorEmailInvalid');
  if (data.password.length < 8) errors.password = t('signUp.errorPasswordMin');
  if (data.confirmPassword && data.password !== data.confirmPassword) errors.confirmPassword = t('signUp.errorPasswordMatch');

  const showError = (field: string) => (touched[field] || submitted) ? errors[field] : undefined;
  const strength = data.password.length > 0 ? getPasswordStrength(data.password) : null;
  const isValid = Object.keys(errors).length === 0 && data.confirmPassword.length > 0;

  const handleSubmit = () => {
    setSubmitted(true);
    if (isValid) {
      // Store user data
      localStorage.setItem('talky_user', JSON.stringify({ name: data.name, email: data.email }));
      onNext();
    }
  };

  return (
    <SurveyDesktopWrapper>
      <div className="flex flex-col min-h-screen md:min-h-0 bg-gradient-to-b from-white to-[#F0FDF4] md:bg-none">
        <div className="px-5 pt-6 pb-2 md:hidden">
          <BackButton onClick={onBack} />
        </div>
        <div className="flex-1 px-7 pt-2 pb-8 overflow-auto md:py-10 md:px-10">
        {/* Header */}
        <motion.div className="mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h2 className="text-[22px] font-extrabold text-[#1A1A2E] mb-2">{t('signUp.title')}</h2>
          <p className="text-sm text-[#6B7280] font-medium">{t('signUp.subtitle')}</p>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          {/* Name */}
          <FormField label={t('signUp.name')} error={showError('name')}>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              onBlur={() => markTouched('name')}
              placeholder={t('signUp.namePlaceholder')}
              className={`w-full px-4 py-3.5 rounded-xl border-2 text-[15px] font-semibold text-[#1A1A2E] outline-none transition-all placeholder:text-gray-300 bg-white ${
                showError('name') ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100' : 'border-gray-200 focus:border-[#7EC3E6] focus:ring-4 focus:ring-[#7EC3E6]/15'
              }`}
              autoFocus
              id="signup-name"
            />
          </FormField>

          {/* Email */}
          <FormField label={t('signUp.email')} error={showError('email')}>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                onBlur={() => markTouched('email')}
                placeholder={t('signUp.emailPlaceholder')}
                className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 text-[15px] font-semibold text-[#1A1A2E] outline-none transition-all placeholder:text-gray-300 bg-white ${
                  showError('email') ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100' : 'border-gray-200 focus:border-[#7EC3E6] focus:ring-4 focus:ring-[#7EC3E6]/15'
                }`}
                id="signup-email"
              />
            </div>
          </FormField>

          {/* Password */}
          <FormField label={t('signUp.password')} error={showError('password')}>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                onBlur={() => markTouched('password')}
                placeholder={t('signUp.passwordPlaceholder')}
                className={`w-full px-4 pr-12 py-3.5 rounded-xl border-2 text-[15px] font-semibold text-[#1A1A2E] outline-none transition-all placeholder:text-gray-300 bg-white ${
                  showError('password') ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100' : 'border-gray-200 focus:border-[#7EC3E6] focus:ring-4 focus:ring-[#7EC3E6]/15'
                }`}
                id="signup-password"
              />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowPassword(!showPassword); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {/* Password Strength Meter */}
            {strength && (
              <motion.div className="mt-2 ml-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex gap-1.5 mb-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className="h-1.5 flex-1 rounded-full transition-all duration-300"
                      style={{ backgroundColor: level <= strength.score ? strength.color : '#E5E7EB' }}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-bold" style={{ color: strength.color }}>
                  {t(strength.key)}
                </span>
              </motion.div>
            )}
          </FormField>

          {/* Confirm Password */}
          <FormField label={t('signUp.confirmPassword')} error={showError('confirmPassword')}>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={data.confirmPassword}
                onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                onBlur={() => markTouched('confirmPassword')}
                placeholder={t('signUp.confirmPlaceholder')}
                className={`w-full px-4 pr-12 py-3.5 rounded-xl border-2 text-[15px] font-semibold text-[#1A1A2E] outline-none transition-all placeholder:text-gray-300 bg-white ${
                  showError('confirmPassword') ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100' : data.confirmPassword && data.password === data.confirmPassword ? 'border-[#7EC3E6] bg-[#F0FDF4]/50' : 'border-gray-200 focus:border-[#7EC3E6] focus:ring-4 focus:ring-[#7EC3E6]/15'
                }`}
                id="signup-confirm-password"
              />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowConfirm(!showConfirm); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {/* Match check icon */}
              {data.confirmPassword && data.password === data.confirmPassword && (
                <motion.div
                  className="absolute right-12 top-1/2 -translate-y-1/2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Check size={18} className="text-[#7EC3E6]" />
                </motion.div>
              )}
            </div>
          </FormField>
        </motion.div>

        {/* Submit Button */}
        <motion.div className="mt-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <ContinueButton onClick={handleSubmit} disabled={!isValid && submitted} label={t('signUp.createAccount')} />
        </motion.div>

        {/* Sign In Link */}
        <motion.p
          className="text-center mt-5 text-sm text-[#6B7280]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
        >
          {t('signUp.alreadyHaveAccount')} <span className="font-bold text-[#7EC3E6] cursor-pointer hover:underline">{t('goals.signIn')}</span>
        </motion.p>

        {/* Terms */}
        <motion.p
          className="text-center mt-3 text-[11px] text-[#9CA3AF] leading-relaxed"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        >
          {t('startLearning.terms')} <span className="underline cursor-pointer">{t('startLearning.termsLink')}</span> {t('startLearning.privacyIntro')}<br /><span className="underline cursor-pointer">{t('startLearning.privacyLink')}</span>.
        </motion.p>
      </div>
    </div>
    </SurveyDesktopWrapper>
  );
}

/* ──────────────── SCREEN 5: Welcome User ──────────────── */

function WelcomeUserSlide({ name, onNext }: { name: string; onNext: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen">
      <DesktopBrandPanel
        gradient="linear-gradient(135deg, #F5D547 0%, #E8C831 100%)"
        mascotSrc="/assets/mascot/Gemini_Generated_Image_h3av61h3av61h3av 1.png"
        mascotAlt="Peeking Bear"
      />
      <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0 md:hidden bg-[#F5D547]"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src="/assets/mascot/Gemini_Generated_Image_h3av61h3av61h3av 1.png"
            alt="Peeking Bear"
            className="w-full h-full object-cover object-[center_bottom]"
          />
        </motion.div>
        <div className="flex-1 relative z-10" />
        <motion.div
          className="bg-white rounded-t-[36px] md:rounded-none px-8 md:px-12 lg:px-16 py-8 shadow-[0_-8px_40px_rgba(0,0,0,0.08)] relative z-10 md:shadow-none md:flex md:flex-col md:items-center md:justify-center md:flex-1"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 120 }}
        >
          <div className="md:max-w-md md:w-full">
            <h2 className="text-[22px] md:text-3xl font-extrabold text-[#1A1A2E] text-center mb-3">
              {t('welcomeUser.title')} {name || 'Karina'}
            </h2>
            <p className="text-sm md:text-base text-[#6B7280] text-center mb-8 leading-relaxed">
              {t('welcomeUser.subtitle')}
            </p>
            <ContinueButton onClick={onNext} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ──────────────── SCREEN 6: Age Range ──────────────── */

function AgeRangeSlide({ value, setValue, onNext, onBack }: { value: string; setValue: (v: string) => void; onNext: () => void; onBack: () => void }) {
  const { t } = useLanguage();
  return (
    <SurveyDesktopWrapper>
    <div className="flex flex-col min-h-screen md:min-h-0 bg-white">
      <SurveyHeader onBack={onBack} step={1} />
      <div className="flex-1 px-8 pt-6">
        <motion.h2 className="text-[22px] md:text-2xl font-extrabold text-[#1A1A2E] mb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {t('ageRange.title')}
        </motion.h2>
        <motion.p className="text-sm text-[#9CA3AF] mb-7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>{t('ageRange.subtitle')}</motion.p>
        <motion.div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0" variants={staggerContainer} initial="initial" animate="animate">
          {AGE_RANGES.map((age) => (
            <motion.button
              key={age}
              variants={staggerItem}
              className={`w-full py-4 rounded-2xl text-[15px] font-semibold transition-all cursor-pointer border-2 ${
                value === age
                  ? 'bg-[#7EC3E6] text-white border-[#7EC3E6]'
                  : 'bg-white text-[#1A1A2E] border-gray-200 hover:border-[#7EC3E6]/50 hover:bg-[#f0fdf4]'
              }`}
              style={value === age ? { boxShadow: '0 4px 16px rgba(126,195,230,0.35)' } : {}}
              onClick={(e) => { e.stopPropagation(); setValue(age); }}
              whileTap={{ scale: 0.97 }}
            >
              {age}
            </motion.button>
          ))}
        </motion.div>
      </div>
      <div className="px-8 pb-8 pt-4">
        <ContinueButton onClick={onNext} disabled={!value} />
      </div>
    </div>
    </SurveyDesktopWrapper>
  );
}

/* ──────────────── SCREEN 7: Gender ──────────────── */

function GenderSlide({ value, setValue, onNext, onBack }: { value: string; setValue: (v: string) => void; onNext: () => void; onBack: () => void }) {
  const { t } = useLanguage();
  const genderOptions = [
    { key: 'Male', label: t('gender.male') },
    { key: 'Female', label: t('gender.female') },
    { key: 'Non-binary', label: t('gender.nonBinary') },
  ];
  return (
    <SurveyDesktopWrapper>
    <div className="flex flex-col min-h-screen md:min-h-0 bg-white">
      <SurveyHeader onBack={onBack} step={2} />
      <div className="flex-1 px-8 pt-4">
        <motion.h2 className="text-xl md:text-2xl font-extrabold text-[#1A1A2E] mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {t('gender.title')}
        </motion.h2>
        <div className="flex gap-3 justify-center mb-6 flex-wrap">
          {genderOptions.map((g) => (
            <motion.button
              key={g.key}
              className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer border-2 ${
                value === g.key
                  ? 'bg-[#7EC3E6] text-white border-[#7EC3E6] shadow-md'
                  : 'bg-white text-[#1A1A2E] border-gray-200 hover:border-[#7EC3E6]/40'
              }`}
              onClick={(e) => { e.stopPropagation(); setValue(g.key); }}
              whileTap={{ scale: 0.95 }}
            >
              {g.label}
            </motion.button>
          ))}
        </div>
        <p className="text-center text-sm text-[#9CA3AF] cursor-pointer hover:text-[#6B7280]" onClick={(e) => { e.stopPropagation(); setValue('prefer-not'); }}>
          {t('gender.preferNot')}
        </p>
      </div>
      <div className="px-8 pb-8 pt-4">
        <ContinueButton onClick={onNext} disabled={!value} />
      </div>
    </div>
    </SurveyDesktopWrapper>
  );
}

/* ──────────────── SCREEN 8: Language ──────────────── */

function LanguageSlide({ value, setValue, onNext, onBack }: { value: string; setValue: (v: string) => void; onNext: () => void; onBack: () => void }) {
  const { t } = useLanguage();
  return (
    <SurveyDesktopWrapper>
    <div className="flex flex-col min-h-screen md:min-h-0 bg-white">
      <SurveyHeader onBack={onBack} step={3} />
      <div className="flex-1 px-8 pt-6">
        <motion.h2 className="text-[22px] md:text-2xl font-extrabold text-[#1A1A2E] mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {t('language.title')}
        </motion.h2>
        <motion.div className="space-y-2.5" variants={staggerContainer} initial="initial" animate="animate">
          {TARGET_LANGUAGES.map((lang) => (
            <motion.button
              key={lang.name}
              variants={staggerItem}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all cursor-pointer border-2 ${
                value === lang.name
                  ? 'bg-[#EAF7FC] border-[#7EC3E6]'
                  : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
              }`}
              style={value === lang.name ? { boxShadow: '0 2px 12px rgba(126,195,230,0.15)' } : {}}
              onClick={(e) => { e.stopPropagation(); setValue(lang.name); }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="w-8 text-sm font-extrabold text-[#1A1A2E]">{lang.code}</span>
              <span className="text-[15px] font-semibold text-[#1A1A2E]">{lang.label}</span>
              {value === lang.name && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto"><Check size={18} className="text-[#7EC3E6]" /></motion.div>}
            </motion.button>
          ))}
        </motion.div>
      </div>
      <div className="px-8 pb-8 pt-4">
        <ContinueButton onClick={onNext} disabled={!value} />
      </div>
    </div>
    </SurveyDesktopWrapper>
  );
}

/* ──────────────── SCREEN 9: Level ──────────────── */

function LevelSlide({ language, value, setValue, onNext, onBack }: { language: string; value: string; setValue: (v: string) => void; onNext: () => void; onBack: () => void }) {
  const levels = LEVELS_BY_LANGUAGE[language] || LEVELS_BY_LANGUAGE.English;
  const languageLabel = TARGET_LANGUAGES.find((lang) => lang.name === language)?.label || 'Bahasa Inggris';
  return (
    <SurveyDesktopWrapper>
    <div className="flex flex-col min-h-screen md:min-h-0 bg-white">
      <SurveyHeader onBack={onBack} step={4} />
      <div className="flex-1 px-8 pt-6">
        <motion.h2 className="text-[22px] font-extrabold text-[#1A1A2E] mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          Level {languageLabel}
        </motion.h2>
        <motion.div className="space-y-3" variants={staggerContainer} initial="initial" animate="animate">
          {levels.map((lvl) => (
            <motion.button
              key={lvl.name}
              variants={staggerItem}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all cursor-pointer border-2 ${
                value === lvl.name
                  ? 'bg-[#EAF7FC] border-[#7EC3E6]'
                  : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
              }`}
              style={value === lvl.name ? { boxShadow: '0 2px 12px rgba(126,195,230,0.15)' } : {}}
              onClick={(e) => { e.stopPropagation(); setValue(lvl.name); }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold transition-all ${
                  value === lvl.name ? 'bg-[#7EC3E6] text-white shadow-md' : 'bg-gray-100 text-[#6B7280]'
                }`}
              >
                {lvl.name[0]}
              </div>
              <div>
                <p className="text-[15px] font-bold text-[#1A1A2E]">{lvl.name}</p>
                <p className="text-xs text-[#9CA3AF]">{lvl.desc}</p>
              </div>
              {value === lvl.name && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto"><Check size={18} className="text-[#7EC3E6]" /></motion.div>}
            </motion.button>
          ))}
        </motion.div>
      </div>
      <div className="px-8 pb-8 pt-4">
        <ContinueButton onClick={onNext} disabled={!value} />
      </div>
    </div>
    </SurveyDesktopWrapper>
  );
}

/* ──────────────── SCREEN 10: Why Learning ──────────────── */

function WhyLearningSlide({ value, setValue, onNext, onBack }: { value: string; setValue: (v: string) => void; onNext: () => void; onBack: () => void }) {
  const { t } = useLanguage();
  const reasons = [
    { icon: '💼', key: 'Business', label: t('whyLearning.business') },
    { icon: '✈️', key: 'Travel', label: t('whyLearning.travel') },
    { icon: '🎓', key: 'School', label: t('whyLearning.school') },
    { icon: '⚡', key: 'Activities', label: t('whyLearning.activities') },
    { icon: '☀️', key: 'Daily Life', label: t('whyLearning.dailyLife') },
    { icon: '👨‍👩‍👧', key: 'Family & Friends', label: t('whyLearning.familyFriends') },
    { icon: '•••', key: 'Other', label: t('whyLearning.other') },
  ];
  return (
    <SurveyDesktopWrapper>
    <div className="flex flex-col min-h-screen md:min-h-0 bg-white">
      <SurveyHeader onBack={onBack} step={5} />
      <div className="flex-1 px-8 pt-6">
        <motion.h2 className="text-[22px] font-extrabold text-[#1A1A2E] mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {t('whyLearning.title')}
        </motion.h2>
        <motion.div className="space-y-2.5" variants={staggerContainer} initial="initial" animate="animate">
          {reasons.map((r) => (
            <motion.button
              key={r.key}
              variants={staggerItem}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all cursor-pointer border-2 ${
                value === r.key
                  ? 'bg-[#EAF7FC] border-[#7EC3E6]'
                  : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
              }`}
              style={value === r.key ? { boxShadow: '0 2px 12px rgba(126,195,230,0.15)' } : {}}
              onClick={(e) => { e.stopPropagation(); setValue(r.key); }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl w-8 text-center">{r.icon}</span>
              <span className="text-[15px] font-semibold text-[#1A1A2E]">{r.label}</span>
              {value === r.key && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto"><Check size={18} className="text-[#7EC3E6]" /></motion.div>}
            </motion.button>
          ))}
        </motion.div>
      </div>
      <div className="px-8 pb-8 pt-4">
        <ContinueButton onClick={onNext} disabled={!value} />
      </div>
    </div>
    </SurveyDesktopWrapper>
  );
}

/* ──────────────── SCREEN 11: Specific Goals ──────────────── */

function SpecificGoalsSlide({ values, toggle, onNext, onBack }: { values: string[]; toggle: (v: string) => void; onNext: () => void; onBack: () => void }) {
  const { t } = useLanguage();
  const goals = [
    { key: 'Read a newspaper', label: t('specificGoals.readNewspaper') },
    { key: 'Chat with a friend', label: t('specificGoals.chatFriend') },
    { key: 'Watch a movie', label: t('specificGoals.watchMovie') },
    { key: 'Order in a restaurant', label: t('specificGoals.orderRestaurant') },
    { key: 'Give a presentation', label: t('specificGoals.presentation') },
    { key: 'Order a coffee', label: t('specificGoals.orderCoffee') },
    { key: 'Write an email', label: t('specificGoals.writeEmail') },
    { key: 'Speak on the phone', label: t('specificGoals.speakPhone') },
    { key: 'Play video games', label: t('specificGoals.playGames') },
    { key: 'Ace a job interview', label: t('specificGoals.jobInterview') },
    { key: 'Check into a hotel', label: t('specificGoals.checkHotel') },
    { key: 'Listen to music', label: t('specificGoals.listenMusic') },
    { key: 'Tell a joke', label: t('specificGoals.tellJoke') },
    { key: 'Ask for directions', label: t('specificGoals.askDirections') },
  ];
  return (
    <SurveyDesktopWrapper>
    <div className="flex flex-col min-h-screen md:min-h-0 bg-white">
      <SurveyHeader onBack={onBack} step={6} />
      <div className="flex-1 px-8 pt-4 overflow-auto">
        <motion.h2 className="text-xl font-extrabold text-[#1A1A2E] mb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {t('specificGoals.title')}
        </motion.h2>
        <p className="text-sm text-[#9CA3AF] mb-6">{t('specificGoals.subtitle')}</p>
        <p className="text-sm font-semibold text-[#1A1A2E] mb-4">{t('specificGoals.wantTo')}</p>
        <div className="flex flex-wrap gap-2.5">
          {goals.map((goal) => {
            const selected = values.includes(goal.key);
            return (
              <motion.button
                key={goal.key}
                className={`px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer border-2 ${
                  selected
                    ? 'bg-[#7EC3E6] text-white border-[#7EC3E6] shadow-sm'
                    : 'bg-white text-[#1A1A2E] border-gray-200 hover:border-[#7EC3E6]/40'
                }`}
                onClick={(e) => { e.stopPropagation(); toggle(goal.key); }}
                whileTap={{ scale: 0.95 }}
              >
                {selected && '✓ '}{goal.label}
              </motion.button>
            );
          })}
        </div>
      </div>
      <div className="px-8 pb-8 pt-4">
        <ContinueButton onClick={onNext} disabled={values.length === 0} />
      </div>
    </div>
    </SurveyDesktopWrapper>
  );
}

/* ──────────────── SCREEN 12: Interests ──────────────── */

const INTEREST_COLORS = [
  '#7EC3E6', '#6B7280', '#F5A623', '#3B82F6', '#8B5CF6', '#EF4444',
  '#10B981', '#EC4899', '#6366F1', '#F43F5E', '#14B8A6', '#F59E0B',
  '#8B5CF6', '#7EC3E6', '#6B7280', '#3B82F6', '#6366F1', '#F43F5E',
  '#10B981', '#F5A623', '#8B5CF6', '#EF4444', '#EC4899',
];

const INTEREST_KEYS = [
  'interests.animal', 'interests.climateChange', 'interests.food', 'interests.workLife',
  'interests.reading', 'interests.sports', 'interests.outdoors', 'interests.fashion',
  'interests.languages', 'interests.romance', 'interests.selfCare', 'interests.parenting',
  'interests.pets', 'interests.makingFriends', 'interests.culture', 'interests.travel',
  'interests.tech', 'interests.tvMovies', 'interests.gaming', 'interests.shopping',
  'interests.studies', 'interests.fitness', 'interests.music',
] as const;

function InterestsSlide({ values, toggle, onNext, onBack }: { values: string[]; toggle: (v: string) => void; onNext: () => void; onBack: () => void }) {
  const { t } = useLanguage();
  return (
    <SurveyDesktopWrapper>
    <div className="flex flex-col min-h-screen md:min-h-0 bg-white">
      <SurveyHeader onBack={onBack} step={7} />
      <div className="flex-1 px-8 pt-4 overflow-auto">
        <motion.h2 className="text-xl font-extrabold text-[#1A1A2E] mb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {t('interests.title')}
        </motion.h2>
        <p className="text-sm text-[#9CA3AF] mb-6">{t('interests.subtitle')}</p>
        <div className="flex flex-wrap gap-2.5">
          {INTEREST_KEYS.map((key, i) => {
            const label = t(key);
            const selected = values.includes(key);
            const color = INTEREST_COLORS[i % INTEREST_COLORS.length];
            return (
              <motion.button
                key={key}
                className={`px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer border-2 ${
                  selected
                    ? 'text-white shadow-sm'
                    : 'bg-white text-[#1A1A2E] border-gray-200 hover:border-gray-300'
                }`}
                style={selected ? { backgroundColor: color, borderColor: color } : {}}
                onClick={(e) => { e.stopPropagation(); toggle(key); }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
              </motion.button>
            );
          })}
        </div>
      </div>
      <div className="px-8 pb-8 pt-4">
        <ContinueButton onClick={onNext} disabled={values.length === 0} />
      </div>
    </div>
    </SurveyDesktopWrapper>
  );
}

/* ──────────────── SCREEN 13: Great News ──────────────── */

function GreatNewsSlide({ name, onNext }: { name: string; onNext: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen">
      <DesktopBrandPanel
        gradient="linear-gradient(135deg, #D3E84D 0%, #B5CC00 100%)"
        mascotSrc="/assets/mascot/Gemini_Generated_Image_rer4izrer4izrer4 1.png"
        mascotAlt="Super Bear"
      />
      <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        <motion.div className="absolute inset-0 z-0 md:hidden bg-[#D3E84D]" initial={{ scale: 1.05, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }}>
          <img src="/assets/mascot/Gemini_Generated_Image_rer4izrer4izrer4 1.png" alt="Super Bear" className="w-full h-full object-cover object-[center_30%]" />
        </motion.div>
        <div className="absolute top-0 left-0 right-0 h-[60%] pointer-events-none z-0 md:hidden">
          <motion.div className="absolute top-20 left-8 w-3 h-3 bg-white/60 rounded-full" animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 2.5 }} />
          <motion.div className="absolute top-32 right-10 w-2 h-2 bg-white/80 rounded-full" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 0.5 }} />
        </div>
        <div className="flex-1 relative z-10" />
        <motion.div
          className="bg-white rounded-t-[40px] md:rounded-none px-8 md:px-12 lg:px-16 py-9 relative z-10 md:flex md:flex-col md:items-center md:justify-center md:flex-1"
          style={{ boxShadow: '0 -12px 50px rgba(0,0,0,0.06)' }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6, type: 'spring', stiffness: 100 }}
        >
          <div className="md:max-w-md md:w-full">
            <motion.h2 className="text-[24px] md:text-3xl font-extrabold text-[#1A1A2E] text-center mb-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
              {t('greatNews.title')} {name || 'Karina'} 🎉
            </motion.h2>
            <motion.p className="text-sm md:text-base text-[#6B7280] text-center mb-8 leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
              {t('greatNews.subtitle')}
            </motion.p>
            <ContinueButton onClick={onNext} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ──────────────── SCREEN 14: Study Duration ──────────────── */

function StudyDurationSlide({ value, setValue, onNext, onBack }: { value: string; setValue: (v: string) => void; onNext: () => void; onBack: () => void }) {
  const { t } = useLanguage();
  const durations = [
    { key: '10 min / day', label: t('studyDuration.10min') },
    { key: '20 min / day', label: t('studyDuration.20min') },
    { key: '30 min / day', label: t('studyDuration.30min') },
  ];
  return (
    <SurveyDesktopWrapper>
    <div className="flex flex-col min-h-screen md:min-h-0 bg-white">
      <SurveyHeader onBack={onBack} step={9} />
      <div className="flex-1 px-8 pt-4 relative">
        <motion.h2 className="text-xl font-extrabold text-[#1A1A2E] mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {t('studyDuration.title')}
        </motion.h2>
        <div className="space-y-3">
          {durations.map((dur) => (
            <motion.button
              key={dur.key}
              className={`w-full py-4 rounded-2xl text-sm font-semibold transition-all cursor-pointer border-2 ${
                value === dur.key
                  ? 'bg-[#EAF7FC] border-[#7EC3E6] text-[#1A1A2E]'
                  : 'bg-white text-[#1A1A2E] border-gray-200 hover:border-[#7EC3E6]/40'
              }`}
              onClick={(e) => { e.stopPropagation(); setValue(dur.key); }}
              whileTap={{ scale: 0.97 }}
            >
              {dur.label}
              {value === dur.key && <span className="ml-2">✓</span>}
            </motion.button>
          ))}
        </div>
      </div>
      <div className="px-8 pb-8 pt-4">
        <ContinueButton onClick={onNext} disabled={!value} />
      </div>
    </div>
    </SurveyDesktopWrapper>
  );
}

/* ──────────────── SCREEN 15: All Set ──────────────── */

function AllSetSlide({ name, onComplete }: { name: string; onComplete: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen">
      <DesktopBrandPanel
        gradient="linear-gradient(135deg, #F5C842 0%, #E8B731 100%)"
        mascotSrc="/assets/mascot/Gemini_Generated_Image_rer4izrer4izrer4 1herooo.png"
        mascotAlt="Happy Bear"
      />
      <div className="flex-1 flex flex-col relative min-h-screen">
        <motion.div className="absolute inset-0 z-0 md:hidden bg-[#F5C842]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <motion.img
            src="/assets/mascot/Gemini_Generated_Image_rer4izrer4izrer4 1herooo.png"
            alt="Happy Bear"
            className="w-full h-full object-cover object-[center_20%]"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>
        <div className="absolute inset-0 z-0 pointer-events-none md:hidden">
          <motion.div className="absolute top-20 left-10 w-3 h-3 bg-white/40 rounded-full" animate={{ y: [0, -20, 0], x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 3 }} />
          <motion.div className="absolute top-28 right-16 w-2.5 h-2.5 bg-white/60 rounded-full" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.3 }} />
        </div>
        <div className="flex-1 relative z-10 flex flex-col justify-end pb-12 md:justify-center md:items-center md:pb-0">
          <motion.div
            className="bg-white/95 backdrop-blur-sm mx-6 md:mx-auto p-8 rounded-[36px] md:rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] md:shadow-xl text-center relative z-20 md:max-w-md md:w-full"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <h2 className="text-[26px] md:text-3xl font-extrabold text-[#1A1A2E] mb-2">{t('allSet.title')} {name || 'Karina'}! 🎉</h2>
            <p className="text-[15px] md:text-base text-[#4A4A4A]/80 mb-8">{t('allSet.subtitle')}</p>
            <ContinueButton onClick={onComplete} label={t('allSet.letsGo')} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN ONBOARDING COMPONENT
   ══════════════════════════════════════════════════════════ */

export default function OnboardingPage({ onComplete, onSignIn, introOnly, surveyOnly }: OnboardingPageProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  // Form state (only used in full mode)
  const [signUpData, setSignUpData] = useState<SignUpData>({ name: '', email: '', password: '', confirmPassword: '' });
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [whyLearning, setWhyLearning] = useState('');
  const [specificGoals, setSpecificGoals] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [studyDuration, setStudyDuration] = useState('');

  // Get user name from localStorage (set by AuthContext on register)
  const storedUser = (() => {
    try {
      const raw = localStorage.getItem('talky_user');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  })();
  const name = surveyOnly ? (storedUser?.name || 'Learner') : signUpData.name;

  useEffect(() => {
    setLevel('');
  }, [language]);

  const buildPersona = useCallback((): UserPersona => ({
    ageRange: age,
    gender,
    targetLanguage: language,
    level,
    whyLearning,
    specificGoals,
    interests,
    studyDuration,
  }), [age, gender, language, level, whyLearning, specificGoals, interests, studyDuration]);

  const finishOnboarding = useCallback(() => {
    if (introOnly) {
      onComplete();
      return;
    }

    onComplete(buildPersona());
  }, [introOnly, onComplete, buildPersona]);

  // Build slides based on mode
  let slides: Record<number, React.ReactNode>;
  let LAST_STEP: number;
  let tapAdvanceMax: number; // tap-to-advance for intro slides

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => {
      const max = introOnly ? 2 : surveyOnly ? 10 : 14;
      if (s < max) {
        const nextStep = s + 1;
        window.history.pushState({ onboarding: true, step: nextStep }, '');
        return nextStep;
      }
      // If at last step, trigger complete
      finishOnboarding();
      return s;
    });
  }, [introOnly, surveyOnly, finishOnboarding]);

  const goBack = useCallback(() => {
    if (step > 0) {
      window.history.back(); // This triggers popstate which will decrement the step properly
    }
  }, [step]);

  // Hook up history API to support native mobile back button
  useEffect(() => {
    // Set initial state for step 0 so we can pop back to it
    if (!window.history.state || window.history.state.onboarding === undefined) {
      window.history.replaceState({ onboarding: true, step: 0 }, '');
    }

    const handlePopState = (e: PopStateEvent) => {
      const state = e.state;
      if (state && state.onboarding !== undefined) {
        setStep((currentStep) => {
          if (state.step < currentStep) setDirection(-1);
          else if (state.step > currentStep) setDirection(1);
          return state.step;
        });
      } else {
        // Fallback if navigating back from somewhere else
        setDirection(-1);
        setStep((s) => Math.max(0, s - 1));
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleGoal = useCallback((g: string) => {
    setSpecificGoals((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]);
  }, []);

  const toggleInterest = useCallback((i: string) => {
    setInterests((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  }, []);

  const handleSignIn = () => onSignIn?.();

  if (introOnly) {
    // Only show: Welcome → Goals → StartLearning
    slides = {
      0: <WelcomeSlide />,
      1: <GoalsSlide onNext={goNext} onSignIn={handleSignIn} />,
      2: <StartLearningSlide onNext={goNext} onSignIn={handleSignIn} />,
    };
    LAST_STEP = 2;
    tapAdvanceMax = 3; // all 3 are tap-to-advance
  } else if (surveyOnly) {
    // Survey-only: WelcomeUser → Age → Gender → ... → AllSet
    slides = {
      0: <WelcomeUserSlide name={name} onNext={goNext} />,
      1: <AgeRangeSlide value={age} setValue={setAge} onNext={goNext} onBack={goBack} />,
      2: <GenderSlide value={gender} setValue={setGender} onNext={goNext} onBack={goBack} />,
      3: <LanguageSlide value={language} setValue={setLanguage} onNext={goNext} onBack={goBack} />,
      4: <LevelSlide language={language} value={level} setValue={setLevel} onNext={goNext} onBack={goBack} />,
      5: <WhyLearningSlide value={whyLearning} setValue={setWhyLearning} onNext={goNext} onBack={goBack} />,
      6: <SpecificGoalsSlide values={specificGoals} toggle={toggleGoal} onNext={goNext} onBack={goBack} />,
      7: <InterestsSlide values={interests} toggle={toggleInterest} onNext={goNext} onBack={goBack} />,
      8: <GreatNewsSlide name={name} onNext={goNext} />,
      9: <StudyDurationSlide value={studyDuration} setValue={setStudyDuration} onNext={goNext} onBack={goBack} />,
      10: <AllSetSlide name={name} onComplete={finishOnboarding} />,
    };
    LAST_STEP = 10;
    tapAdvanceMax = 0; // WelcomeUser has its own button
  } else {
    // Full flow (legacy)
    slides = {
      0: <WelcomeSlide />,
      1: <GoalsSlide onNext={goNext} onSignIn={handleSignIn} />,
      2: <StartLearningSlide onNext={goNext} onSignIn={handleSignIn} />,
      3: <SignUpSlide data={signUpData} setData={setSignUpData} onNext={goNext} onBack={goBack} />,
      4: <WelcomeUserSlide name={name} onNext={goNext} />,
      5: <AgeRangeSlide value={age} setValue={setAge} onNext={goNext} onBack={goBack} />,
      6: <GenderSlide value={gender} setValue={setGender} onNext={goNext} onBack={goBack} />,
      7: <LanguageSlide value={language} setValue={setLanguage} onNext={goNext} onBack={goBack} />,
      8: <LevelSlide language={language} value={level} setValue={setLevel} onNext={goNext} onBack={goBack} />,
      9: <WhyLearningSlide value={whyLearning} setValue={setWhyLearning} onNext={goNext} onBack={goBack} />,
      10: <SpecificGoalsSlide values={specificGoals} toggle={toggleGoal} onNext={goNext} onBack={goBack} />,
      11: <InterestsSlide values={interests} toggle={toggleInterest} onNext={goNext} onBack={goBack} />,
      12: <GreatNewsSlide name={name} onNext={goNext} />,
      13: <StudyDurationSlide value={studyDuration} setValue={setStudyDuration} onNext={goNext} onBack={goBack} />,
      14: <AllSetSlide name={name} onComplete={finishOnboarding} />,
    };
    LAST_STEP = 14;
    tapAdvanceMax = 3;
  }

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden"
      onClick={() => {
        // Tap to advance on intro slides only
        if (step < tapAdvanceMax) goNext();
      }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 overflow-y-auto"
        >
          {slides[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
