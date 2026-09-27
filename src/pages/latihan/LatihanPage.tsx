import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  FileText,
  Flame,
  Headphones,
  Mic,
  PenLine,
  Target,
  Trophy,
  type LucideIcon,
} from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { skills } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../auth/AuthContext';
import { normalizeTargetLanguage } from '../../features/chat/targetLanguage';
import { arabicLessonCounts, arabicSkills, type ArabicLevelId, type ArabicSkillId } from '../module/arabic/arabicModuleData';
import { mandarinLessonCounts, mandarinSkills, type MandarinLevelId, type MandarinSkillId } from '../module/mandarin/mandarinModuleData';
import { japaneseLevels, japaneseSkills } from '../module/japanese/japaneseModuleData';
import { japanesePracticeLevel } from './japanese/JapanesePracticePage';

type GameStats = {
  xp: number;
  played: number;
  completed: number;
  bestScore: number;
};

type PracticeAttempt = {
  skillId: string;
  topicTitle: string;
  score: number;
  total: number;
  weakestLevel: string;
  completedAt: string;
};

type PracticeSkillCard = {
  id: string;
  title: string;
  detail: string;
  icon?: LucideIcon;
  iconUrl?: string;
  color: string;
  bg: string;
  route: string;
  progress: number;
};

const mascotSrc = '/assets/mascot/bear1ae6b0cad-ea07-469f-baa3-c9cdfcbc5546.png';

const defaultStats: GameStats = {
  xp: 0,
  played: 0,
  completed: 0,
  bestScore: 0,
};

const practiceSkillCards: PracticeSkillCard[] = [
  { id: 'vocabulary', title: 'Vocabulary', detail: 'Flashcard dan review kata.', icon: BookOpen, color: '#2563EB', bg: '#DBEAFE', route: '/latihan/english/vocabulary', progress: 0 },
  { id: 'grammar', title: 'Grammar', detail: 'Tense dan sentence pattern.', icon: Brain, color: '#7C3AED', bg: '#EDE9FE', route: '/latihan/english/grammar', progress: 0 },
  { id: 'listening', title: 'Listening', detail: 'Audio choice dan dictation.', icon: Headphones, color: '#0891B2', bg: '#CFFAFE', route: '/latihan/english/listening', progress: 0 },
  { id: 'speaking', title: 'Speaking', detail: 'Pronunciation dan response.', icon: Mic, color: '#DB2777', bg: '#FCE7F3', route: '/latihan/english/speaking', progress: 0 },
  { id: 'writing', title: 'Writing', detail: 'Sentence fix dan email polish.', icon: PenLine, color: '#EA580C', bg: '#FFEDD5', route: '/latihan/english/writing', progress: 0 },
  { id: 'reading', title: 'Reading', detail: 'Short passage dan inference.', icon: FileText, color: '#16A34A', bg: '#DCFCE7', route: '/latihan/english/reading', progress: 0 },
];

function readGameStats(): GameStats {
  try {
    return { ...defaultStats, ...JSON.parse(localStorage.getItem('fluently_game_stats') || '{}') };
  } catch {
    return defaultStats;
  }
}

function readPracticeHistory(): PracticeAttempt[] {
  try {
    const records = JSON.parse(localStorage.getItem('fluently-practice-history-v1') || '[]');
    return Array.isArray(records) ? records : [];
  } catch {
    return [];
  }
}

function readArabicCompleted(levelId: ArabicLevelId, skillId: ArabicSkillId): number[] {
  try {
    const records = JSON.parse(localStorage.getItem(`talky_arabic_${levelId}_${skillId}_completed`) || '[]');
    return Array.isArray(records) ? records.filter((item) => Number.isFinite(Number(item))).map(Number) : [];
  } catch {
    return [];
  }
}

function readMandarinCompleted(levelId: MandarinLevelId, skillId: MandarinSkillId): number[] {
  try {
    const records = JSON.parse(localStorage.getItem(`talky_mandarin_${levelId}_${skillId}_completed`) || '[]');
    return Array.isArray(records) ? records.filter((item) => Number.isFinite(Number(item))).map(Number) : [];
  } catch {
    return [];
  }
}

function readJapanesePracticeScores(): Record<string, number> {
  try {
    const parsed = JSON.parse(localStorage.getItem('fluently_japanese_practice_scores_v1') || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function getArabicPracticeLevel(level?: string): ArabicLevelId {
  const value = (level || '').toLowerCase();
  if (value.includes('scholar') || value.includes('research')) return 'scholar';
  if (value.includes('mastery') || value.includes('post-c2')) return 'mastery';
  if (value.includes('proficiency') || value.includes('c2')) return 'proficiency';
  if (value.includes('advanced') || value.includes('c1')) return 'advanced';
  if (value.includes('upper') || value.includes('b2')) return 'upper-intermediate';
  if (value.includes('intermediate') || value.includes('b1')) return 'intermediate';
  if (value.includes('elementary') || value.includes('a2')) return 'elementary';
  return 'pemula';
}

function getMandarinPracticeLevel(level?: string): MandarinLevelId {
  const value = (level || '').toLowerCase();
  if (value.includes('hsk 9') || value.includes('hsk-9') || value.includes('mastery')) return 'hsk-9';
  if (value.includes('hsk 8') || value.includes('hsk-8') || value.includes('scholar')) return 'hsk-8';
  if (value.includes('hsk 7') || value.includes('hsk-7') || value.includes('expert')) return 'hsk-7';
  if (value.includes('proficiency') || value.includes('hsk 6') || value.includes('hsk-6') || value.includes('c2')) return 'proficiency';
  if (value.includes('advanced') || value.includes('hsk 5') || value.includes('hsk-5') || value.includes('c1')) return 'advanced';
  if (value.includes('upper') || value.includes('hsk 4') || value.includes('hsk-4') || value.includes('b2')) return 'upper-intermediate';
  if (value.includes('intermediate') || value.includes('hsk 3') || value.includes('hsk-3') || value.includes('b1')) return 'intermediate';
  if (value.includes('elementary') || value.includes('hsk 2') || value.includes('hsk-2') || value.includes('a2')) return 'elementary';
  return 'beginner';
}

function getArabicRouteLevel(levelId: ArabicLevelId) {
  return levelId === 'pemula' ? 'beginner' : levelId;
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-black text-[#1A1A2E]">{title}</h2>
      <p className="mt-0.5 text-[13px] font-semibold text-gray-500">{subtitle}</p>
    </div>
  );
}

function PracticeCardIcon({ skill, size = 19 }: { skill: PracticeSkillCard; size?: number }) {
  const Icon = skill.icon;
  if (skill.iconUrl) {
    return <img src={skill.iconUrl} alt="" className="h-[70%] w-[70%] object-contain" />;
  }
  if (Icon) {
    return <Icon size={size} />;
  }
  return <span className="text-sm font-black">{skill.title.slice(0, 1)}</span>;
}

export default function LatihanPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const targetLanguage = normalizeTargetLanguage(user?.persona?.targetLanguage);
  const isArabicPractice = targetLanguage === 'Arabic';
  const isMandarinPractice = targetLanguage === 'Mandarin';
  const isJapanesePractice = targetLanguage === 'Japanese';
  const japaneseLevelId = japanesePracticeLevel(user?.persona?.level);
  const arabicLevelId = getArabicPracticeLevel(user?.persona?.level);
  const arabicRouteLevel = getArabicRouteLevel(arabicLevelId);
  const mandarinLevelId = getMandarinPracticeLevel(user?.persona?.level);
  const gameStats = useMemo(() => readGameStats(), []);
  const practiceHistory = useMemo(() => readPracticeHistory(), []);
  const totalSkillDays = skills.reduce((sum, skill) => sum + skill.totalDays, 0);
  const completedSkillDays = skills.reduce((sum, skill) => sum + skill.completedDays, 0);
  const englishModuleProgress = Math.round((completedSkillDays / totalSkillDays) * 100);
  const arabicSummary = useMemo(() => {
    return arabicSkills.reduce(
      (summary, skill) => {
        const total = arabicLessonCounts[arabicLevelId][skill.id];
        const completed = Math.min(total, readArabicCompleted(arabicLevelId, skill.id).length);
        return {
          total: summary.total + total,
          completed: summary.completed + completed,
        };
      },
      { total: 0, completed: 0 }
    );
  }, [arabicLevelId]);
  const mandarinSummary = useMemo(() => {
    return mandarinSkills.reduce(
      (summary, skill) => {
        const total = mandarinLessonCounts[mandarinLevelId][skill.id];
        const completed = Math.min(total, readMandarinCompleted(mandarinLevelId, skill.id).length);
        return {
          total: summary.total + total,
          completed: summary.completed + completed,
        };
      },
      { total: 0, completed: 0 }
    );
  }, [mandarinLevelId]);
  const moduleProgress = isArabicPractice
    ? Math.round((arabicSummary.completed / Math.max(1, arabicSummary.total)) * 100)
    : isMandarinPractice
      ? Math.round((mandarinSummary.completed / Math.max(1, mandarinSummary.total)) * 100)
      : englishModuleProgress;
  const arabicPracticeCards = useMemo<PracticeSkillCard[]>(() => (
    arabicSkills.map((skill) => {
      const isNahwuCard = skill.id === 'grammar';
      const isIstimaCard = skill.id === 'istima';
      const isKalamCard = skill.id === 'kalam';
      const isQiraahCard = skill.id === 'qiraah';
      const isKitabahCard = skill.id === 'kitabah';
      const isMakharijCard = skill.id === 'pronunciation';
      const total = arabicLessonCounts[arabicLevelId][skill.id];
      const completed = Math.min(total, readArabicCompleted(arabicLevelId, skill.id).length);
      return {
        id: isNahwuCard ? 'nahwu' : isMakharijCard ? 'makharij' : skill.id,
        title: isNahwuCard ? 'Nahwu' : isMakharijCard ? 'Makharij' : skill.label,
        detail: isNahwuCard ? 'Nahwu dasar, i\'rab, dan struktur kalimat Arab.' : isMakharijCard ? 'Titik keluar huruf, bunyi, dan pelafalan Arab.' : skill.sublabel,
        iconUrl: skill.icon,
        color: skill.color,
        bg: skill.bgColor,
        route: skill.id === 'mufradat'
          ? '/latihan/arabic/mufradat'
          : isNahwuCard
            ? '/latihan/arabic/nahwu'
            : isIstimaCard
              ? '/latihan/arabic/istima'
              : isKalamCard
                ? '/latihan/arabic/kalam'
                : isQiraahCard
                  ? '/latihan/arabic/qiraah'
                  : isKitabahCard
                    ? '/latihan/arabic/kitabah'
                    : isMakharijCard
                      ? '/latihan/arabic/makharij'
                      : `/latihan/${arabicRouteLevel}/${skill.id}`,
        progress: Math.round((completed / Math.max(1, total)) * 100),
      };
    })
  ), [arabicLevelId, arabicRouteLevel]);
  const mandarinPracticeCards = useMemo<PracticeSkillCard[]>(() => {
    const cihuiSkill = mandarinSkills.find((skill) => skill.id === 'vocabulary') ?? mandarinSkills[0];
    const yufaSkill = mandarinSkills.find((skill) => skill.id === 'grammar') ?? mandarinSkills[0];
    const xiezuoSkill = mandarinSkills.find((skill) => skill.id === 'writing') ?? mandarinSkills[0];
    const yueduSkill = mandarinSkills.find((skill) => skill.id === 'reading') ?? mandarinSkills[0];
    const tingliSkill = mandarinSkills.find((skill) => skill.id === 'listening') ?? mandarinSkills[0];
    const kouyuSkill = mandarinSkills.find((skill) => skill.id === 'speaking') ?? mandarinSkills[0];
    const pronunciationSkill = mandarinSkills.find((skill) => skill.id === 'pronunciation') ?? mandarinSkills[mandarinSkills.length - 1];
    const cihuiTotal = mandarinLessonCounts[mandarinLevelId].vocabulary;
    const cihuiCompleted = Math.min(cihuiTotal, readMandarinCompleted(mandarinLevelId, 'vocabulary').length);
    const yufaTotal = mandarinLessonCounts[mandarinLevelId].grammar;
    const yufaCompleted = Math.min(yufaTotal, readMandarinCompleted(mandarinLevelId, 'grammar').length);
    const xiezuoTotal = mandarinLessonCounts[mandarinLevelId].writing;
    const xiezuoCompleted = Math.min(xiezuoTotal, readMandarinCompleted(mandarinLevelId, 'writing').length);
    const yueduTotal = mandarinLessonCounts[mandarinLevelId].reading;
    const yueduCompleted = Math.min(yueduTotal, readMandarinCompleted(mandarinLevelId, 'reading').length);
    const tingliTotal = mandarinLessonCounts[mandarinLevelId].listening;
    const tingliCompleted = Math.min(tingliTotal, readMandarinCompleted(mandarinLevelId, 'listening').length);
    const kouyuTotal = mandarinLessonCounts[mandarinLevelId].speaking;
    const kouyuCompleted = Math.min(kouyuTotal, readMandarinCompleted(mandarinLevelId, 'speaking').length);
    const pinyinTotal = mandarinLessonCounts[mandarinLevelId].pronunciation;
    const pinyinCompleted = Math.min(pinyinTotal, readMandarinCompleted(mandarinLevelId, 'pronunciation').length);

    return [
      {
        id: 'cihui',
        title: 'Cíhuì',
        detail: 'Kosakata HSK, arti, pinyin, kolokasi, dan contoh kalimat.',
        iconUrl: cihuiSkill.icon,
        color: cihuiSkill.color,
        bg: cihuiSkill.bgColor,
        route: '/latihan/mandarin/cihui',
        progress: Math.round((cihuiCompleted / Math.max(1, cihuiTotal)) * 100),
      },
      {
        id: 'yufa',
        title: 'Yǔfǎ',
        detail: 'Struktur kalimat, partikel, kata kerja, dan pola Mandarin.',
        iconUrl: yufaSkill.icon,
        color: yufaSkill.color,
        bg: yufaSkill.bgColor,
        route: '/latihan/mandarin/yufa',
        progress: Math.round((yufaCompleted / Math.max(1, yufaTotal)) * 100),
      },
      {
        id: 'xiezuo',
        title: 'Xiězuò',
        detail: 'Hanzi, stroke order, kalimat, paragraf, dan tulisan praktis.',
        iconUrl: xiezuoSkill.icon,
        color: xiezuoSkill.color,
        bg: xiezuoSkill.bgColor,
        route: '/latihan/mandarin/xiezuo',
        progress: Math.round((xiezuoCompleted / Math.max(1, xiezuoTotal)) * 100),
      },
      {
        id: 'yuedu',
        title: 'Yuèdú',
        detail: 'Hanzi, pinyin, teks pendek, keyword, dan pemahaman bacaan.',
        iconUrl: yueduSkill.icon,
        color: yueduSkill.color,
        bg: yueduSkill.bgColor,
        route: '/latihan/mandarin/yuedu',
        progress: Math.round((yueduCompleted / Math.max(1, yueduTotal)) * 100),
      },
      {
        id: 'tingli',
        title: 'Tīnglì',
        detail: 'Audio Mandarin, transcript, keyword, tone, dan pemahaman lisan.',
        iconUrl: tingliSkill.icon,
        color: tingliSkill.color,
        bg: tingliSkill.bgColor,
        route: '/latihan/mandarin/tingli',
        progress: Math.round((tingliCompleted / Math.max(1, tingliTotal)) * 100),
      },
      {
        id: 'kouyu',
        title: 'Kǒuyǔ',
        detail: 'Dialog, respons, roleplay, model audio, dan produksi lisan.',
        iconUrl: kouyuSkill.icon,
        color: kouyuSkill.color,
        bg: kouyuSkill.bgColor,
        route: '/latihan/mandarin/kouyu',
        progress: Math.round((kouyuCompleted / Math.max(1, kouyuTotal)) * 100),
      },
      {
        id: 'pinyin',
        title: 'Pīnyīn',
        detail: 'Tone, initial-final, sandhi, dan shadowing Mandarin.',
        iconUrl: pronunciationSkill.icon,
        color: pronunciationSkill.color,
        bg: pronunciationSkill.bgColor,
        route: '/latihan/mandarin/pinyin',
        progress: Math.round((pinyinCompleted / Math.max(1, pinyinTotal)) * 100),
      },
    ];
  }, [mandarinLevelId]);
  const japanesePracticeCards = useMemo<PracticeSkillCard[]>(() => {
    const scores = readJapanesePracticeScores();
    return japaneseSkills.map((skill) => {
      const mastered = Object.entries(scores).filter(([key, value]) => key.startsWith(`${japaneseLevelId}/${skill.id}/`) && value >= 80).length;
      return {
        id: `japanese-${skill.id}`,
        title: skill.label,
        detail: skill.sublabel,
        iconUrl: skill.icon,
        color: skill.color,
        bg: skill.bgColor,
        route: `/latihan/japanese/${skill.id}?level=${japaneseLevelId}`,
        progress: Math.round((mastered / 20) * 100),
      };
    });
  }, [japaneseLevelId]);
  const practiceCards = isArabicPractice
    ? arabicPracticeCards
    : isMandarinPractice
      ? mandarinPracticeCards
      : isJapanesePractice
        ? japanesePracticeCards
        : practiceSkillCards;
  const getSkillProgress = (skillId: string, fallback: number) => {
    const attempts = practiceHistory.filter((attempt) => attempt.skillId === skillId).slice(0, 5);
    if (!attempts.length) return fallback;
    const average = attempts.reduce((sum, attempt) => sum + (attempt.score / attempt.total) * 100, 0) / attempts.length;
    return Math.round(average);
  };
  const skillProgressMap = practiceCards.reduce<Record<string, number>>((map, skill) => {
    map[skill.id] = getSkillProgress(skill.id, skill.progress);
    return map;
  }, {});

  const heroBadge = isArabicPractice ? 'Arabic Practice' : isMandarinPractice ? 'Mandarin Practice' : isJapanesePractice ? 'Japanese Practice' : 'Fluently Practice';
  const heroTitle = isArabicPractice ? 'Arabic Practice' : isMandarinPractice ? 'Mandarin Practice' : isJapanesePractice ? 'Japanese Practice' : t('latihan.title');
  const heroDescription = isArabicPractice
    ? "Latihan Arab singkat untuk mufradat, istima', qira'ah, kitabah, kalam, nahwu, dan pronunciation sesuai progres modulmu."
    : isMandarinPractice
      ? 'Latihan Mandarin singkat untuk Cíhuì, Yǔfǎ, Xiězuò, Yuèdú, Tīnglì, Kǒuyǔ, Pīnyīn, tone, dan shadowing sesuai progres modulmu.'
    : isJapanesePractice
      ? `Latihan Jepang ${japaneseLevels[japaneseLevelId].badge}: kosakata, grammar, membaca, menulis, listening dengan audio, speaking, dan pelafalan.`
    : 'Latihan singkat untuk menjaga ritme belajar, memperkuat skill lemah, dan lanjut dari progres profilmu.';
  const statCards = isArabicPractice
    ? [
      { label: 'Streak', value: user?.streak ?? 0, suffix: 'days', icon: Flame, color: '#EA580C', bg: '#FFEDD5' },
      { label: 'Arabic XP', value: gameStats.xp, suffix: 'xp', icon: Trophy, color: '#CA8A04', bg: '#FEF3C7' },
      { label: 'Lessons', value: arabicSummary.completed, suffix: `/ ${arabicSummary.total}`, icon: BookOpen, color: '#0F766E', bg: '#CCFBF1' },
      { label: 'Practice', value: moduleProgress, suffix: '%', icon: BarChart3, color: '#2563EB', bg: '#DBEAFE' },
    ]
    : isMandarinPractice
      ? [
        { label: 'Streak', value: user?.streak ?? 0, suffix: 'days', icon: Flame, color: '#EA580C', bg: '#FFEDD5' },
        { label: 'Mandarin XP', value: gameStats.xp, suffix: 'xp', icon: Trophy, color: '#CA8A04', bg: '#FEF3C7' },
        { label: 'Lessons', value: mandarinSummary.completed, suffix: `/ ${mandarinSummary.total}`, icon: BookOpen, color: '#DC2626', bg: '#FEE2E2' },
        { label: 'Practice', value: moduleProgress, suffix: '%', icon: BarChart3, color: '#DB2777', bg: '#FCE7F3' },
      ]
    : [
      { label: 'Streak', value: user?.streak ?? 0, suffix: 'days', icon: Flame, color: '#EA580C', bg: '#FFEDD5' },
      { label: 'Game XP', value: gameStats.xp, suffix: 'xp', icon: Trophy, color: '#CA8A04', bg: '#FEF3C7' },
      { label: 'Practice', value: moduleProgress, suffix: '%', icon: BarChart3, color: '#2563EB', bg: '#DBEAFE' },
      { label: 'Best', value: gameStats.bestScore || 0, suffix: 'score', icon: Target, color: '#16A34A', bg: '#DCFCE7' },
    ];

  return (
    <PageContainer>
      <div className="mx-auto max-w-6xl px-5 pb-28 md:px-0 md:pb-10">
        <motion.section
          className="mt-6 overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm md:mt-0"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid gap-0 lg:grid-cols-[1fr_340px]">
            <div className="p-6 sm:p-8">
              <div className="inline-flex items-center rounded-full bg-[#EAF7FC] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#2563EB]">
                {heroBadge}
              </div>
              <h1 className="mt-4 text-3xl font-black leading-tight text-[#1A1A2E] sm:text-5xl">{heroTitle}</h1>
              <p className="mt-3 max-w-xl text-sm font-semibold leading-relaxed text-gray-500">
                {heroDescription}
              </p>
            </div>

            <div className={`relative min-h-[250px] p-6 ${isArabicPractice ? 'bg-[#ECFDF5]' : isMandarinPractice ? 'bg-[#FFF1F2]' : 'bg-[#EAF7FC]'}`}>
              {isArabicPractice && (
                <>
                  <div className="absolute left-5 top-5 z-10 rounded-2xl border border-teal-100 bg-white/85 px-4 py-3 shadow-sm backdrop-blur">
                    <p dir="rtl" lang="ar" className="text-2xl font-black leading-none text-[#0F766E]">السَّلامُ عَلَيْكُمْ</p>
                    <p className="mt-1 text-[11px] font-black uppercase tracking-[0.12em] text-teal-600/70">As-salamu alaikum</p>
                  </div>
                  <div className="absolute bottom-5 right-5 z-10 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-right shadow-sm backdrop-blur">
                    <p className="text-xs font-black text-[#0F172A]">Makharij · Mufradat · Kalam</p>
                    <p className="mt-1 text-[11px] font-semibold text-slate-500">{arabicSummary.completed}/{arabicSummary.total} lessons</p>
                  </div>
                </>
              )}
              {isMandarinPractice && (
                <>
                  <div className="absolute left-5 top-5 z-10 rounded-2xl border border-rose-100 bg-white/85 px-4 py-3 shadow-sm backdrop-blur">
                    <p lang="zh-CN" className="text-2xl font-black leading-none text-[#DC2626]">你好</p>
                    <p className="mt-1 text-[11px] font-black uppercase tracking-[0.12em] text-rose-600/70">nǐ hǎo</p>
                  </div>
                  <div className="absolute bottom-5 right-5 z-10 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-right shadow-sm backdrop-blur">
                    <p className="text-xs font-black text-[#0F172A]">Cíhuì · Tīnglì · Kǒuyǔ</p>
                    <p className="mt-1 text-[11px] font-semibold text-slate-500">{mandarinSummary.completed}/{mandarinSummary.total} lessons</p>
                  </div>
                </>
              )}
              <img
                src={mascotSrc}
                alt=""
                className="absolute bottom-0 left-1/2 h-[240px] max-w-none -translate-x-1/2 object-contain sm:h-[270px] lg:h-[285px]"
              />
            </div>
          </div>
        </motion.section>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * index }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">{stat.label}</p>
                    <p className="mt-1 text-xl font-black text-[#1A1A2E]">
                      {stat.value}
                      <span className="ml-1 text-[11px] font-black text-gray-400">{stat.suffix}</span>
                    </p>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-2xl" style={{ backgroundColor: stat.bg, color: stat.color }}>
                    <Icon size={18} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8">
          <section>
            <SectionHeader
              title={isArabicPractice ? 'Arabic Skill Practice' : isMandarinPractice ? 'Mandarin Skill Practice' : isJapanesePractice ? 'Japanese Skill Practice' : 'Skill Practice'}
              subtitle={isArabicPractice ? 'Pilih skill Arabic yang ingin kamu latih.' : isMandarinPractice ? 'Pilih skill Mandarin yang sudah dipisah agar latihan tetap fokus per topik.' : isJapanesePractice ? 'Pilih skill Jepang. Setiap skill punya 20 topik per level JLPT.' : 'Pilih skill yang ingin kamu latih.'}
            />
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {practiceCards.map((skill, index) => {
                return (
                  <motion.button
                    key={skill.id}
                    onClick={() => navigate(skill.route)}
                    className="group rounded-3xl border border-gray-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#7EC3E6]/40"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * index }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{ backgroundColor: skill.bg, color: skill.color }}>
                        <PracticeCardIcon skill={skill} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-black text-[#1A1A2E]">{skill.title}</h3>
                          <ArrowRight size={15} className="text-gray-300 transition group-hover:text-gray-500" />
                        </div>
                        <p className="mt-1 text-xs font-semibold leading-relaxed text-gray-500">{skill.detail}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: skill.color }}
                            initial={{ width: 0 }}
                              animate={{ width: `${skillProgressMap[skill.id]}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-black" style={{ color: skill.color }}>{skillProgressMap[skill.id]}%</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </PageContainer>
  );
}
