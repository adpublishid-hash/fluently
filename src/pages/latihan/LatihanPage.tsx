import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Clock3,
  FileText,
  Flame,
  Headphones,
  Mic,
  PenLine,
  Play,
  Target,
  Trophy,
} from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { mockUser, skills } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';

type GameStats = {
  xp: number;
  played: number;
  completed: number;
  bestScore: number;
};

const mascotSrc = '/assets/mascot/wawaa40bc7bc-8c3c-4357-941a-f3265755fb75.webp';

const defaultStats: GameStats = {
  xp: 0,
  played: 0,
  completed: 0,
  bestScore: 0,
};

const practiceSkillCards = [
  { id: 'vocabulary', title: 'Vocabulary', detail: 'Flashcard dan review kata.', icon: BookOpen, color: '#2563EB', bg: '#DBEAFE', route: '/latihan/basic/vocabulary', progress: 72 },
  { id: 'grammar', title: 'Grammar', detail: 'Tense dan sentence pattern.', icon: Brain, color: '#7C3AED', bg: '#EDE9FE', route: '/latihan/basic/grammar', progress: 54 },
  { id: 'listening', title: 'Listening', detail: 'Audio choice dan dictation.', icon: Headphones, color: '#0891B2', bg: '#CFFAFE', route: '/latihan/basic/listening', progress: 46 },
  { id: 'speaking', title: 'Speaking', detail: 'Pronunciation dan response.', icon: Mic, color: '#DB2777', bg: '#FCE7F3', route: '/latihan/basic/speaking', progress: 38 },
  { id: 'writing', title: 'Writing', detail: 'Sentence fix dan email polish.', icon: PenLine, color: '#EA580C', bg: '#FFEDD5', route: '/latihan/basic/writing', progress: 31 },
  { id: 'reading', title: 'Reading', detail: 'Short passage dan inference.', icon: FileText, color: '#16A34A', bg: '#DCFCE7', route: '/latihan/basic/reading', progress: 60 },
];

function readGameStats(): GameStats {
  try {
    return { ...defaultStats, ...JSON.parse(localStorage.getItem('fluently_game_stats') || '{}') };
  } catch {
    return defaultStats;
  }
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-black text-[#1A1A2E]">{title}</h2>
      <p className="mt-0.5 text-[13px] font-semibold text-gray-500">{subtitle}</p>
    </div>
  );
}

export default function LatihanPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [sessionMinutes, setSessionMinutes] = useState(10);

  const gameStats = useMemo(() => readGameStats(), []);
  const totalSkillDays = skills.reduce((sum, skill) => sum + skill.totalDays, 0);
  const completedSkillDays = skills.reduce((sum, skill) => sum + skill.completedDays, 0);
  const moduleProgress = Math.round((completedSkillDays / totalSkillDays) * 100);
  const dailyProgress = Math.min(100, Math.round(((gameStats.completed || 0) % 6) / 6 * 100) + 34);
  const sessionRouteLabel = sessionMinutes === 5 ? 'Word Match' : sessionMinutes === 15 ? 'Response Builder' : 'Listen & Tap';

  const startDailyPractice = () => {
    if (sessionMinutes === 5) {
      navigate('/game/vocabulary/word-match/play?difficulty=easy');
      return;
    }
    if (sessionMinutes === 15) {
      navigate('/game/speaking/response-builder/play?difficulty=easy');
      return;
    }
    navigate('/game/listening/listen-tap/play?difficulty=easy');
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-6xl px-5 pb-28 md:px-0 md:pb-10">
        <motion.section
          className="mt-6 overflow-hidden rounded-[26px] border border-gray-100 bg-white shadow-sm md:mt-0"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid gap-0 lg:grid-cols-[1fr_340px]">
            <div className="p-6 sm:p-8">
              <div className="inline-flex items-center rounded-full bg-[#EAF7FC] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#2563EB]">
                Fluently Practice
              </div>
              <h1 className="mt-4 text-3xl font-black leading-tight text-[#1A1A2E] sm:text-5xl">{t('latihan.title')}</h1>
              <p className="mt-3 max-w-xl text-sm font-semibold leading-relaxed text-gray-500">
                Latihan singkat untuk menjaga ritme belajar, memperkuat skill lemah, dan lanjut dari progres profilmu.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {[5, 10, 15].map((minute) => (
                  <button
                    key={minute}
                    onClick={() => setSessionMinutes(minute)}
                    className={`h-10 rounded-full px-4 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-[#7EC3E6]/50 ${sessionMinutes === minute ? 'bg-[#1A1A2E] text-white shadow-sm' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                  >
                    {minute} min
                  </button>
                ))}
                <button
                  onClick={startDailyPractice}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-[#F59E0B] px-5 text-sm font-black text-white shadow-sm transition hover:bg-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
                >
                  <Play size={16} />
                  Start
                </button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { label: 'Mode', value: sessionRouteLabel },
                  { label: 'Progress', value: `${dailyProgress}%` },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-gray-50 px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-gray-400">{item.label}</p>
                    <p className="mt-1 truncate text-sm font-black text-[#1A1A2E]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[250px] bg-[#EAF7FC] p-6">
              <img
                src={mascotSrc}
                alt=""
                className="absolute bottom-0 left-1/2 h-[240px] max-w-none -translate-x-1/2 object-contain sm:h-[270px] lg:h-[285px]"
              />
            </div>
          </div>
        </motion.section>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Streak', value: mockUser.streak, suffix: 'days', icon: Flame, color: '#EA580C', bg: '#FFEDD5' },
            { label: 'Game XP', value: gameStats.xp, suffix: 'xp', icon: Trophy, color: '#CA8A04', bg: '#FEF3C7' },
            { label: 'Practice', value: moduleProgress, suffix: '%', icon: BarChart3, color: '#2563EB', bg: '#DBEAFE' },
            { label: 'Best', value: gameStats.bestScore || 0, suffix: 'score', icon: Target, color: '#16A34A', bg: '#DCFCE7' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
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
            <SectionHeader title="Skill Practice" subtitle="Pilih skill yang ingin kamu latih." />
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {practiceSkillCards.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.button
                    key={skill.id}
                    onClick={() => navigate(skill.route)}
                    className="group rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#7EC3E6]/40"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * index }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{ backgroundColor: skill.bg, color: skill.color }}>
                        <Icon size={19} />
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
                              animate={{ width: `${skill.progress}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-black" style={{ color: skill.color }}>{skill.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </section>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#F3E8FF] text-[#7C3AED]">
                <Clock3 size={18} />
              </div>
              <div>
                <p className="text-sm font-black text-[#1A1A2E]">Mini Session</p>
                <p className="text-xs font-semibold text-gray-500">{sessionMinutes} menit</p>
              </div>
            </div>
            <button
              onClick={startDailyPractice}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#1A1A2E] px-5 text-sm font-black text-white transition hover:bg-[#2A2A44] focus:outline-none focus:ring-2 focus:ring-[#7EC3E6]/40"
            >
              <Play size={16} />
              Continue Practice
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
