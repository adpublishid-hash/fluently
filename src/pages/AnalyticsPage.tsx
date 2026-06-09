import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowLeft,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Flame,
  Gamepad2,
  GraduationCap,
  MessageCircle,
  NotebookText,
  Target,
  Timer,
  Trophy,
  Zap,
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import { useAuth } from '../auth/AuthContext';
import { formatRecentChatTime, getRecentChatRoute, getRecentChatSessions } from '../features/chat/recentSessions';
import { getFocusSessions, getTodayFocusMinutes, getTotalFocusMinutes } from '../utils/focusTimer';

const TOEFL_KEY = 'talky_exam_english_toefl1_result';
const RECENT_MODULES_KEY = 'fluently_recent_modules';
const NOTES_KEY = 'talky_user_notes_v1';
const GOALS_KEY = 'talky_user_goals_v1';
const GAME_STATS_KEY = 'fluently_game_stats';
const PRACTICE_HISTORY_KEY = 'fluently-practice-history-v1';
const MISTAKE_BANK_KEY = 'fluently-mistake-bank-v1';
const AI_CHAT_KEY = 'fluently_ai_chat_api_key';
const XP_PER_LEVEL = 3000;

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface ToeflSection { title: string; raw: number; scaled: number; total: number; }
interface ToeflResult { score: number; sections: ToeflSection[]; submittedAt: string; }
interface RecentModule { title: string; subtitle?: string; route: string; progress?: number; updatedAt: number; category?: string; }
interface Goal { title?: string; current?: number; target?: number; completed?: boolean; createdAt?: string; }
interface Note { title?: string; category?: string; updatedAt?: string; createdAt?: string; content?: string; }
interface PracticeAttempt { skillId?: string; topicTitle?: string; score?: number; total?: number; completedAt?: string; weakestLevel?: string; }
interface GameStats { xp?: number; played?: number; completed?: number; bestScore?: number; modeBest?: Record<string, number>; }
interface FocusSession { minutes: number; source?: string; completedAt: string; }

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function readArray<T>(key: string): T[] {
  const parsed = readJson<unknown>(key, []);
  return Array.isArray(parsed) ? parsed as T[] : [];
}

function formatDate(timestamp?: number | string) {
  if (!timestamp) return 'No date';
  const time = typeof timestamp === 'number' ? timestamp : new Date(timestamp).getTime();
  if (!Number.isFinite(time)) return 'No date';
  const diff = Date.now() - time;
  const day = 24 * 60 * 60 * 1000;
  if (diff < 60 * 1000) return 'Just now';
  if (diff < 60 * 60 * 1000) return `${Math.max(1, Math.floor(diff / 60000))}m ago`;
  if (diff < day) return `${Math.max(1, Math.floor(diff / 3600000))}h ago`;
  if (diff < day * 2) return 'Yesterday';
  return new Date(time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getTimestamp(value?: number | string) {
  if (!value) return 0;
  const timestamp = typeof value === 'number' ? value : new Date(value).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function getWeekBars(streak: number, timestamps: number[]) {
  const today = new Date();
  return DAYS.map((day, i) => {
    const target = new Date(today);
    target.setDate(today.getDate() - (6 - i));
    target.setHours(0, 0, 0, 0);
    const start = target.getTime();
    const end = start + 24 * 60 * 60 * 1000;
    const count = timestamps.filter((timestamp) => timestamp >= start && timestamp < end).length;
    const active = count > 0 || (i >= 7 - streak && streak > 0);
    const value = count > 0 ? Math.min(100, 28 + count * 18) : active ? 24 : 8;
    return { day, value, active };
  });
}

function StatCard({ label, value, icon: Icon, color, bg, delay }: {
  label: string; value: string; icon: React.ElementType;
  color: string; bg: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="rounded-2xl border border-slate-100 bg-white p-4"
    >
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: bg }}>
        <Icon size={17} style={{ color }} />
      </div>
      <p className="text-xl font-black text-[#101828]">{value}</p>
      <p className="mt-0.5 text-xs font-semibold text-slate-400">{label}</p>
    </motion.div>
  );
}

function MiniMetric({ label, value, hint, icon: Icon, color }: {
  label: string; value: string; hint: string; icon: React.ElementType; color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-2xl font-black text-[#101828]">{value}</p>
          <p className="mt-0.5 text-xs font-black text-slate-500">{label}</p>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}18`, color }}>
          <Icon size={17} />
        </div>
      </div>
      <p className="text-[11px] font-semibold leading-relaxed text-slate-400">{hint}</p>
    </div>
  );
}

function ProgressRow({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
        <span className="text-slate-600">{label}</span>
        <span className="text-slate-400">{value}/{total}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const xp     = user?.xp ?? 0;
  const streak = user?.streak ?? 0;
  const level  = user?.level ?? 1;
  const xpInLv = xp % XP_PER_LEVEL;
  const lvPct  = Math.round((xpInLv / XP_PER_LEVEL) * 100);

  const toefl = useMemo<ToeflResult | null>(() => {
    try { return JSON.parse(localStorage.getItem(TOEFL_KEY) ?? 'null'); } catch { return null; }
  }, []);

  const dashboard = useMemo(() => {
    const recentChats = getRecentChatSessions();
    const recentModules = readArray<RecentModule>(RECENT_MODULES_KEY)
      .filter((item) => item?.route)
      .sort((a, b) => getTimestamp(b.updatedAt) - getTimestamp(a.updatedAt));
    const notes = readArray<Note>(NOTES_KEY);
    const goals = readArray<Goal>(GOALS_KEY);
    const practiceHistory = readArray<PracticeAttempt>(PRACTICE_HISTORY_KEY);
    const mistakes = readArray<unknown>(MISTAKE_BANK_KEY);
    const gameStats = readJson<GameStats>(GAME_STATS_KEY, {});
    const focusSessions = getFocusSessions();
    const aiKeyReady = Boolean(localStorage.getItem(AI_CHAT_KEY));

    const completedGoals = goals.filter((goal) => goal.completed).length;
    const avgPracticeScore = practiceHistory.length
      ? Math.round(
          practiceHistory.reduce((sum, attempt) => {
            const score = Number(attempt.score || 0);
            const total = Number(attempt.total || 100);
            return sum + (total > 0 ? (score / total) * 100 : score);
          }, 0) / practiceHistory.length,
        )
      : 0;

    const completedLessons = Object.keys(localStorage)
      .filter((key) => key.startsWith('talky_') && key.endsWith('_completed'))
      .reduce((sum, key) => {
        const value = readJson<unknown>(key, []);
        return sum + (Array.isArray(value) ? value.length : 0);
      }, 0);

    const activity = [
      ...recentChats.map((chat) => ({
        type: 'AI Chat',
        title: chat.title || chat.topic,
        meta: `${chat.modeLabel} • ${chat.levelId?.toUpperCase() || 'AI'}`,
        route: getRecentChatRoute(chat),
        timestamp: chat.updatedAt,
        color: chat.color,
      })),
      ...recentModules.map((module) => ({
        type: 'Module',
        title: module.title,
        meta: module.subtitle || module.category || 'Learning module',
        route: module.route,
        timestamp: getTimestamp(module.updatedAt),
        color: '#4FA3D1',
      })),
      ...practiceHistory.map((attempt) => ({
        type: 'Practice',
        title: attempt.topicTitle || attempt.skillId || 'Practice attempt',
        meta: `${attempt.score ?? 0}/${attempt.total ?? 100} • ${attempt.weakestLevel || 'review'}`,
        route: '/latihan',
        timestamp: getTimestamp(attempt.completedAt),
        color: '#10B981',
      })),
      ...notes.map((note) => ({
        type: 'Note',
        title: note.title || 'Untitled note',
        meta: note.category || 'general',
        route: '/notes',
        timestamp: getTimestamp(note.updatedAt || note.createdAt),
        color: '#7C3AED',
      })),
      ...focusSessions.map((session) => ({
        type: 'Focus',
        title: `${session.minutes} min focus session`,
        meta: session.source || 'Focus timer',
        route: '/goals',
        timestamp: getTimestamp(session.completedAt),
        color: '#0EA5E9',
      })),
      ...(toefl ? [{
        type: 'Exam',
        title: `TOEFL PBT ${toefl.score}`,
        meta: `${toefl.sections?.length || 0} sections completed`,
        route: '/ujian/english',
        timestamp: getTimestamp(toefl.submittedAt),
        color: '#0D2B55',
      }] : []),
    ]
      .filter((item) => item.timestamp > 0)
      .sort((a, b) => b.timestamp - a.timestamp);

    const skillCounts = ['vocabulary', 'pronunciation', 'grammar', 'speaking', 'reading', 'writing'].map((skill) => {
      const chatCount = recentChats.filter((chat) => chat.modeId === skill).length;
      const practiceCount = practiceHistory.filter((attempt) => attempt.skillId === skill).length;
      const noteCount = notes.filter((note) => note.category === skill).length;
      return { skill, total: chatCount + practiceCount + noteCount };
    });

    return {
      recentChats,
      recentModules,
      notes,
      goals,
      focusSessions: focusSessions as FocusSession[],
      practiceHistory,
      mistakes,
      gameStats,
      completedGoals,
      avgPracticeScore,
      completedLessons,
      activity,
      skillCounts,
      aiKeyReady,
      todayFocusMinutes: getTodayFocusMinutes(focusSessions),
      totalFocusMinutes: getTotalFocusMinutes(focusSessions),
    };
  }, [toefl]);

  const activityTimestamps = dashboard.activity.map((item) => item.timestamp);
  const weekBars = useMemo(() => getWeekBars(streak, activityTimestamps), [activityTimestamps, streak]);
  const maxBar   = Math.max(...weekBars.map(b => b.value), 1);

  const stats = [
    { label: 'Total XP',     value: xp.toLocaleString(),         icon: Zap,    color: '#F59E0B', bg: '#FEF3C7', delay: 0 },
    { label: 'Streak',       value: `${streak} days`,            icon: Flame,  color: '#EF4444', bg: '#FEE2E2', delay: 0.04 },
    { label: 'Level',        value: `Lv. ${level}`,              icon: Trophy, color: '#4FA3D1', bg: '#EFF6FF', delay: 0.08 },
    { label: 'Next Level',   value: `${xpInLv}/${XP_PER_LEVEL}`, icon: Target, color: '#10B981', bg: '#D1FAE5', delay: 0.12 },
  ];
  const skillMax = Math.max(...dashboard.skillCounts.map((item) => item.total), 1);

  return (
    <PageContainer>
      <div className="min-h-screen px-4 pb-10 sm:px-0">

        {/* Header */}
        <div className="sticky top-0 z-20 -mx-4 mb-5 border-b border-slate-100 bg-white/90 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-b-3xl">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-black leading-tight text-[#101828]">Analytics</h1>
          </div>
        </div>

        <div className="space-y-4">

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map(s => <StatCard key={s.label} {...s} />)}
          </div>

          {/* All data overview */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
            className="grid grid-cols-2 gap-3 lg:grid-cols-4"
          >
            <MiniMetric
              label="AI Chat"
              value={`${dashboard.recentChats.length}`}
              hint={dashboard.recentChats[0] ? `Last: ${dashboard.recentChats[0].title}` : 'No chat session yet'}
              icon={MessageCircle}
              color="#2980B9"
            />
            <MiniMetric
              label="Modules"
              value={`${dashboard.recentModules.length}`}
              hint={`${dashboard.completedLessons} completed lesson records`}
              icon={GraduationCap}
              color="#4FA3D1"
            />
            <MiniMetric
              label="Practice"
              value={`${dashboard.practiceHistory.length}`}
              hint={dashboard.practiceHistory.length ? `Average score ${dashboard.avgPracticeScore}%` : 'No practice attempt yet'}
              icon={ClipboardList}
              color="#10B981"
            />
            <MiniMetric
              label="Games"
              value={`${dashboard.gameStats.played || 0}`}
              hint={`${dashboard.gameStats.completed || 0} completed • best ${dashboard.gameStats.bestScore || 0}`}
              icon={Gamepad2}
              color="#F59E0B"
            />
            <MiniMetric
              label="Notes"
              value={`${dashboard.notes.length}`}
              hint={dashboard.notes[0]?.title ? `Latest: ${dashboard.notes[0].title}` : 'No saved note yet'}
              icon={NotebookText}
              color="#7C3AED"
            />
            <MiniMetric
              label="Goals"
              value={`${dashboard.completedGoals}/${dashboard.goals.length}`}
              hint={dashboard.goals.length ? 'Completed learning goals' : 'No custom goals yet'}
              icon={CheckCircle2}
              color="#16A34A"
            />
            <MiniMetric
              label="Focus"
              value={`${dashboard.todayFocusMinutes}m`}
              hint={`${dashboard.totalFocusMinutes} minutes total • ${dashboard.focusSessions.length} sessions`}
              icon={Timer}
              color="#0EA5E9"
            />
            <MiniMetric
              label="Mistakes"
              value={`${dashboard.mistakes.length}`}
              hint="Saved for mistake review"
              icon={Activity}
              color="#EF4444"
            />
            <MiniMetric
              label="AI Setup"
              value={dashboard.aiKeyReady ? 'Ready' : 'Default'}
              hint={dashboard.aiKeyReady ? 'Personal Gemini key detected' : 'Using default/free setup'}
              icon={Award}
              color="#8E44AD"
            />
          </motion.div>

          {/* Weekly activity */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
            className="rounded-2xl border border-slate-100 bg-white p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-black text-[#101828]">Weekly Activity</p>
              <span className="text-xs font-semibold text-slate-400">last 7 days</span>
            </div>
            <div className="flex items-end gap-1.5">
              {weekBars.map(bar => (
                <div key={bar.day} className="flex flex-1 flex-col items-center gap-1.5">
                  <div className="relative w-full overflow-hidden rounded-lg bg-slate-50" style={{ height: 80 }}>
                    <motion.div
                      className="absolute bottom-0 w-full rounded-lg"
                      initial={{ height: 0 }}
                      animate={{ height: `${(bar.value / maxBar) * 100}%` }}
                      transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
                      style={{ backgroundColor: bar.active ? '#4FA3D1' : '#E2E8F0' }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{bar.day}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Level progress */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-2xl border border-slate-100 bg-white p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-black text-[#101828]">Level Progress</p>
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-black text-[#4FA3D1]">Lv. {level}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#4FA3D1] to-[#1E6F9F]"
                initial={{ width: 0 }}
                animate={{ width: `${lvPct}%` }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs font-semibold text-slate-400">
              <span>{xpInLv.toLocaleString()} XP</span>
              <span>{lvPct}%</span>
            </div>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-[1fr_1.25fr]">
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
              className="rounded-2xl border border-slate-100 bg-white p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-black text-[#101828]">Skill Mix</p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-400">Based on chat, practice, and notes</p>
                </div>
                <BarChart3 size={18} className="text-slate-300" />
              </div>
              <div className="space-y-3">
                {dashboard.skillCounts.map((item, index) => {
                  const colors = ['#2980B9', '#E83E8C', '#8E44AD', '#E74C3C', '#4FA3D1', '#F39C12'];
                  return (
                    <ProgressRow
                      key={item.skill}
                      label={item.skill.charAt(0).toUpperCase() + item.skill.slice(1)}
                      value={item.total}
                      total={skillMax}
                      color={colors[index]}
                    />
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
              className="rounded-2xl border border-slate-100 bg-white p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-black text-[#101828]">Recent Activity</p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-400">Latest actions across the app</p>
                </div>
                <Clock3 size={18} className="text-slate-300" />
              </div>
              {dashboard.activity.length ? (
                <div className="space-y-2.5">
                  {dashboard.activity.slice(0, 6).map((item, index) => (
                    <button
                      key={`${item.type}-${item.timestamp}-${index}`}
                      type="button"
                      onClick={() => navigate(item.route)}
                      className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 p-3 text-left transition hover:bg-slate-50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white" style={{ backgroundColor: item.color }}>
                        {item.type.slice(0, 1)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-black text-[#101828]">{item.title}</span>
                        <span className="block truncate text-xs font-semibold text-slate-400">{item.type} • {item.meta}</span>
                      </span>
                      <span className="shrink-0 text-[11px] font-bold text-slate-400">{formatRecentChatTime(item.timestamp) || formatDate(item.timestamp)}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center">
                  <Activity size={22} className="mx-auto mb-2 text-slate-300" />
                  <p className="text-sm font-bold text-slate-500">No activity yet</p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-400">Start a module, chat, practice, or exam.</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* TOEFL result */}
          {toefl ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
              className="rounded-2xl bg-gradient-to-br from-[#1E6F9F] to-[#0D2B55] p-5 text-white"
            >
              <div className="mb-1 flex items-center gap-2">
                <BookOpen size={13} className="text-white/60" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Last TOEFL</span>
              </div>
              <p className="mt-1 text-4xl font-black">{toefl.score}</p>
              <p className="mt-0.5 text-xs font-semibold text-white/60">
                Practice Test 1 · {new Date(toefl.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              {toefl.sections?.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {toefl.sections.map(s => (
                    <div key={s.title} className="rounded-xl bg-white/10 p-2.5 text-center">
                      <p className="text-[9px] font-bold uppercase tracking-wide text-white/50">{s.title}</p>
                      <p className="mt-1 text-lg font-black">{s.scaled}</p>
                      <p className="text-[9px] text-white/40">{s.raw}/{s.total}</p>
                    </div>
                  ))}
                </div>
              )}
              <button type="button" onClick={() => navigate('/ujian/english')}
                className="mt-4 w-full rounded-xl bg-white/15 py-2 text-xs font-black text-white hover:bg-white/25">
                Take Another Test
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
              className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center"
            >
              <BookOpen size={24} className="mx-auto mb-2 text-slate-300" />
              <p className="font-bold text-slate-500">No exam data yet</p>
              <p className="mt-0.5 text-sm text-slate-400">Take a TOEFL practice to see results.</p>
              <button type="button" onClick={() => navigate('/ujian/english')}
                className="mt-3 rounded-xl bg-[#4FA3D1] px-4 py-2 text-sm font-black text-white hover:bg-[#2F86B5]">
                Start TOEFL
              </button>
            </motion.div>
          )}

        </div>
      </div>
    </PageContainer>
  );
}
