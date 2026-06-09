import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Plus, CheckCircle2, Trash2, X,
  Zap, Flame, BookOpen, Target, TrendingUp, CalendarDays, Timer, Play,
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import { useAuth } from '../auth/AuthContext';
import { FREE_LIMITS, getEffectivePlan } from '../utils/accessControl';
import {
  ACTIVE_FOCUS_TIMER_EVENT,
  FOCUS_SESSION_EVENT,
  formatFocusTime,
  getActiveFocusTimer,
  getFocusSessions,
  getTodayFocusMinutes,
  getTotalFocusMinutes,
  openFocusTimer,
  type ActiveFocusTimer,
  type FocusSession,
} from '../utils/focusTimer';

const GOALS_KEY = 'talky_user_goals_v1';

type GoalIcon = 'Zap' | 'Flame' | 'BookOpen' | 'Target' | 'TrendingUp';
type GoalArea = 'Study' | 'Vocabulary' | 'Grammar' | 'Speaking' | 'Reading' | 'Writing' | 'Exam' | 'Focus';
type GoalFrequency = 'Daily' | 'Weekly' | 'Monthly' | 'Once';

interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  area: GoalArea;
  frequency: GoalFrequency;
  deadline?: string;
  color: string;
  iconName: GoalIcon;
  completed: boolean;
  createdAt: string;
}

const ICON_MAP: Record<GoalIcon, React.ElementType> = { Zap, Flame, BookOpen, Target, TrendingUp };
const COLORS = ['#4FA3D1', '#EF4444', '#F59E0B', '#10B981', '#7C3AED', '#EC4899'];
const ICON_OPTS: GoalIcon[] = ['Zap', 'Flame', 'BookOpen', 'Target', 'TrendingUp'];

const DEFAULT_GOALS: Goal[] = [
  { id: 'focus', title: 'Daily Focus Session', description: 'Selesaikan 25 menit belajar tanpa distraksi hari ini.', target: 25, current: 0, unit: 'min', area: 'Focus', frequency: 'Daily', color: '#4FA3D1', iconName: 'Target', completed: false, createdAt: new Date().toISOString() },
  { id: 'wls', title: 'Weekly Skill Practice', description: 'Selesaikan 5 sesi latihan skill minggu ini.', target: 5, current: 0, unit: 'sessions', area: 'Study', frequency: 'Weekly', color: '#10B981', iconName: 'BookOpen', completed: false, createdAt: new Date().toISOString() },
];

const GOAL_TEMPLATES: Omit<Goal, 'id' | 'createdAt' | 'completed' | 'current'>[] = [
  { title: 'Master 30 New Words', description: 'Pelajari dan pakai 30 vocabulary baru dalam kalimat.', target: 30, unit: 'words', area: 'Vocabulary', frequency: 'Weekly', color: '#2563EB', iconName: 'BookOpen' },
  { title: 'Grammar Accuracy Drill', description: 'Kerjakan 20 soal grammar dan review kesalahanmu.', target: 20, unit: 'questions', area: 'Grammar', frequency: 'Weekly', color: '#7C3AED', iconName: 'TrendingUp' },
  { title: 'Speaking Confidence', description: 'Latihan speaking dengan microphone selama 10 sesi.', target: 10, unit: 'sessions', area: 'Speaking', frequency: 'Monthly', color: '#DB2777', iconName: 'Flame' },
  { title: 'TOEFL Reading Push', description: 'Selesaikan 5 passage reading dan catat vocabulary penting.', target: 5, unit: 'passages', area: 'Exam', frequency: 'Weekly', color: '#0D2B55', iconName: 'Target' },
];

const AREA_OPTIONS: GoalArea[] = ['Study', 'Vocabulary', 'Grammar', 'Speaking', 'Reading', 'Writing', 'Exam', 'Focus'];
const FREQUENCY_OPTIONS: GoalFrequency[] = ['Daily', 'Weekly', 'Monthly', 'Once'];

function loadGoals(): Goal[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(GOALS_KEY) ?? 'null');
    if (!Array.isArray(parsed)) return DEFAULT_GOALS;
    return parsed.map((g: Partial<Goal>): Goal => ({
      id: g.id ?? crypto.randomUUID(),
      title: g.title ?? 'Untitled Goal',
      description: g.description ?? '',
      target: g.target ?? 1,
      current: g.current ?? 0,
      unit: g.unit ?? 'XP',
      area: (g.area ?? 'Study') as GoalArea,
      frequency: (g.frequency ?? 'Weekly') as GoalFrequency,
      deadline: g.deadline,
      color: g.color ?? '#4FA3D1',
      iconName: (g.iconName && g.iconName in ICON_MAP ? g.iconName : 'Target') as GoalIcon,
      completed: Boolean(g.completed),
      createdAt: g.createdAt ?? new Date().toISOString(),
    }));
  } catch { return DEFAULT_GOALS; }
}

function saveGoals(goals: Goal[]) {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
}

interface AddModalProps {
  onClose: () => void;
  onAdd: (g: Omit<Goal, 'id' | 'createdAt'>) => void;
}

function AddModal({ onClose, onAdd }: AddModalProps) {
  const [title, setTitle]       = useState('');
  const [desc, setDesc]         = useState('');
  const [target, setTarget]     = useState('10');
  const [unit, setUnit]         = useState('XP');
  const [area, setArea]         = useState<GoalArea>('Study');
  const [frequency, setFrequency] = useState<GoalFrequency>('Weekly');
  const [deadline, setDeadline] = useState('');
  const [color, setColor]       = useState(COLORS[0]);
  const [iconName, setIconName] = useState<GoalIcon>('Target');

  const valid = title.trim() && Number(target) > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-0 backdrop-blur-sm sm:items-center sm:px-4"
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 340, damping: 30 }}
        className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-black text-[#101828]">New Goal</h2>
          <button type="button" onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-400">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Daily Study"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-[#101828] outline-none focus:border-[#4FA3D1]" />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-400">Description</label>
            <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Optional"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-[#101828] outline-none focus:border-[#4FA3D1]" />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-400">Target</label>
              <input type="number" value={target} min="1" onChange={e => setTarget(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-[#101828] outline-none focus:border-[#4FA3D1]" />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-400">Unit</label>
              <input value={unit} onChange={e => setUnit(e.target.value)} placeholder="XP"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-[#101828] outline-none focus:border-[#4FA3D1]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-400">Focus Area</label>
              <select value={area} onChange={e => setArea(e.target.value as GoalArea)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-[#101828] outline-none focus:border-[#4FA3D1]">
                {AREA_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-400">Frequency</label>
              <select value={frequency} onChange={e => setFrequency(e.target.value as GoalFrequency)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-[#101828] outline-none focus:border-[#4FA3D1]">
                {FREQUENCY_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-400">Deadline</label>
            <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-[#101828] outline-none focus:border-[#4FA3D1]" />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-slate-400">Color</label>
            <div className="flex gap-2">
              {COLORS.map(c => (
                <button key={c} type="button" onClick={() => setColor(c)}
                  className="h-8 w-8 rounded-full border-2 transition-all"
                  style={{
                    backgroundColor: c,
                    borderColor: color === c ? '#101828' : 'transparent',
                    transform: color === c ? 'scale(1.15)' : 'scale(1)',
                  }} />
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-slate-400">Icon</label>
            <div className="flex gap-2">
              {ICON_OPTS.map(name => {
                const Icon = ICON_MAP[name];
                const sel = iconName === name;
                return (
                  <button key={name} type="button" onClick={() => setIconName(name)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-all ${sel ? 'border-[#101828] bg-slate-100' : 'border-transparent bg-slate-50'}`}>
                    <Icon size={16} style={{ color: sel ? '#101828' : '#9CA3AF' }} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <button type="button" disabled={!valid}
          onClick={() => valid && onAdd({
            title: title.trim(), description: desc.trim(),
            target: Number(target), current: 0, unit, area, frequency, deadline: deadline || undefined, color, iconName, completed: false,
          })}
          className="mt-5 w-full rounded-xl bg-[#4FA3D1] py-3 text-sm font-black text-white disabled:opacity-40 hover:bg-[#2F86B5]">
          Add Goal
        </button>
      </motion.div>
    </motion.div>
  );
}

function GoalCard({ goal, onDelete, onProgress }: { goal: Goal; onDelete: () => void; onProgress: (delta: number) => void }) {
  const Icon = ICON_MAP[goal.iconName];
  const pct  = Math.min(100, Math.round((goal.current / goal.target) * 100));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      className={`rounded-2xl border bg-white p-4 transition-all hover:border-slate-200 hover:shadow-sm ${goal.completed ? 'border-emerald-200/60' : 'border-slate-100'}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: goal.color + '18' }}>
          {goal.completed
            ? <CheckCircle2 size={18} style={{ color: '#10B981' }} />
            : <Icon size={18} style={{ color: goal.color }} />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className={`font-black text-[#101828] ${goal.completed ? 'line-through opacity-50' : ''}`}>
              {goal.title}
            </p>
            <button type="button" onClick={onDelete}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-300 hover:bg-red-50 hover:text-red-400">
              <Trash2 size={12} />
            </button>
          </div>
          {goal.description && (
            <p className="mt-0.5 text-xs text-slate-400">{goal.description}</p>
          )}
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-slate-50 px-2 py-1 text-[10px] font-black text-slate-500">{goal.area}</span>
            <span className="rounded-full bg-slate-50 px-2 py-1 text-[10px] font-black text-slate-500">{goal.frequency}</span>
            {goal.deadline && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1 text-[10px] font-black text-slate-500">
                <CalendarDays size={10} />
                {new Date(goal.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
              <span style={{ color: goal.color }}>{goal.current} / {goal.target} {goal.unit}</span>
              <span className="text-slate-400">{pct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <motion.div className="h-full rounded-full" style={{ backgroundColor: goal.color }}
                initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }} />
            </div>
          </div>
          {!goal.completed && (
            <div className="mt-3 flex gap-2">
              <button type="button" onClick={() => onProgress(-1)}
                className="flex-1 rounded-lg border border-slate-200 py-1.5 text-xs font-black text-slate-500 hover:bg-slate-50">
                − 1
              </button>
              <button type="button" onClick={() => onProgress(1)}
                className="flex-1 rounded-lg py-1.5 text-xs font-black text-white"
                style={{ backgroundColor: goal.color }}>
                + 1
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function getTimerRemaining(timer: ActiveFocusTimer | null) {
  if (!timer) return 0;
  if (!timer.running) return Math.max(0, Math.round(timer.remainingSeconds ?? 0));
  return Math.max(0, Math.ceil((timer.endsAt - Date.now()) / 1000));
}

function GoalsTimerCard({ activeTimer }: { activeTimer: ActiveFocusTimer | null }) {
  const remaining = getTimerRemaining(activeTimer);
  const progress = activeTimer
    ? Math.min(100, Math.round(((activeTimer.durationMinutes * 60 - remaining) / (activeTimer.durationMinutes * 60)) * 100))
    : 0;

  return (
    <motion.button
      type="button"
      onClick={() => openFocusTimer('Goals focus timer')}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full rounded-3xl bg-gradient-to-br from-[#0D2B55] to-[#1E6F9F] p-5 text-left text-white shadow-lg shadow-blue-100"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/60">Focus Timer</p>
          <h2 className="mt-1 text-3xl font-black">
            {activeTimer ? formatFocusTime(remaining) : 'Start Focus'}
          </h2>
          <p className="mt-1 text-xs font-semibold text-white/65">
            {activeTimer
              ? `${activeTimer.running ? 'Running' : 'Paused'} • ${activeTimer.linkedTitle || activeTimer.linkType}`
              : 'Timer Goals sekarang memakai floating timer global yang tetap jalan saat pindah halaman.'}
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
          {activeTimer ? <Timer size={24} /> : <Play size={22} fill="currentColor" />}
        </div>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/15">
        <motion.div className="h-full rounded-full bg-white" animate={{ width: `${progress}%` }} />
      </div>
      <div className="mt-4 inline-flex rounded-2xl bg-white px-4 py-2 text-sm font-black text-[#1E6F9F]">
        {activeTimer ? 'Buka Timer' : 'Mulai Timer'}
      </div>
    </motion.button>
  );
}

export default function GoalsPage() {
  const navigate = useNavigate();
  const { user }  = useAuth();
  const [goals,   setGoals]   = useState<Goal[]>(loadGoals);
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>(getFocusSessions);
  const [activeTimer, setActiveTimer] = useState<ActiveFocusTimer | null>(getActiveFocusTimer);
  const [showAdd, setShowAdd] = useState(false);
  const hasFullAccess = getEffectivePlan(user) !== 'free';
  const freeLimitReached = !hasFullAccess && goals.length >= FREE_LIMITS.goals;

  // Sync streak/XP into default goals
  useEffect(() => {
    setGoals(prev => prev.map(g => {
      if (g.id === 'str') return { ...g, current: Math.min(g.target, user?.streak ?? 0) };
      if (g.id === 'dxp') return { ...g, current: Math.min(g.target, (user?.xp ?? 0) % 100) };
      return g;
    }));
  }, [user?.xp, user?.streak]);

  useEffect(() => {
    const refresh = () => {
      setFocusSessions(getFocusSessions());
      setGoals(loadGoals());
    };
    window.addEventListener(FOCUS_SESSION_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(FOCUS_SESSION_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  useEffect(() => {
    const refresh = () => setActiveTimer(getActiveFocusTimer());
    const tick = window.setInterval(refresh, 1000);
    window.addEventListener(ACTIVE_FOCUS_TIMER_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.clearInterval(tick);
      window.removeEventListener(ACTIVE_FOCUS_TIMER_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const update = (next: Goal[]) => { setGoals(next); saveGoals(next); };

  const addGoal = (draft: Omit<Goal, 'id' | 'createdAt'>) => {
    if (freeLimitReached) {
      setShowAdd(false);
      navigate(`/upgrade?feature=goals&returnTo=${encodeURIComponent('/goals')}`);
      return;
    }
    update([...goals, { ...draft, id: crypto.randomUUID(), createdAt: new Date().toISOString() }]);
    setShowAdd(false);
  };

  const deleteGoal = (id: string) => update(goals.filter(g => g.id !== id));

  const changeProgress = (id: string, delta: number) => {
    update(goals.map(g => {
      if (g.id !== id) return g;
      const next = Math.max(0, Math.min(g.target, g.current + delta));
      return { ...g, current: next, completed: next >= g.target };
    }));
  };

  const addTemplateGoal = (template: Omit<Goal, 'id' | 'createdAt' | 'completed' | 'current'>) => {
    if (freeLimitReached) {
      navigate(`/upgrade?feature=goals&returnTo=${encodeURIComponent('/goals')}`);
      return;
    }
    update([
      ...goals,
      {
        ...template,
        id: crypto.randomUUID(),
        current: 0,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const active    = goals.filter(g => !g.completed);
  const completed = goals.filter(g => g.completed);
  const overallPct = goals.length ? Math.round((completed.length / goals.length) * 100) : 0;
  const totalFocusMinutes = getTotalFocusMinutes(focusSessions);
  const todayFocusMinutes = getTodayFocusMinutes(focusSessions);

  return (
    <>
      <PageContainer>
        <div className="min-h-screen px-4 pb-10 sm:px-0">

          {/* Header */}
          <div className="sticky top-0 z-20 -mx-4 mb-5 border-b border-slate-100 bg-white/90 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-b-3xl">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => navigate(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200">
                  <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-black leading-tight text-[#101828]">Goals</h1>
              </div>
              <button type="button" onClick={() => freeLimitReached ? navigate(`/upgrade?feature=goals&returnTo=${encodeURIComponent('/goals')}`) : setShowAdd(true)}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#4FA3D1] text-white hover:bg-[#2F86B5]">
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-4">

            {/* Compact summary */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-100 bg-white p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Progress</p>
                  <p className="mt-0.5 text-2xl font-black text-[#101828]">{completed.length} / {goals.length}</p>
                  <p className="text-xs font-semibold text-slate-400">goals completed</p>
                </div>
                <div className="rounded-full bg-blue-50 px-3 py-1 text-sm font-black text-[#4FA3D1]">{overallPct}%</div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-[#4FA3D1] to-[#1E6F9F]"
                  initial={{ width: 0 }} animate={{ width: `${overallPct}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-lg font-black text-[#101828]">{active.length}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Active</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-lg font-black text-[#101828]">{todayFocusMinutes}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Focus min today</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-lg font-black text-[#101828]">{totalFocusMinutes}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Total focus</p>
                </div>
              </div>
            </motion.div>

            <GoalsTimerCard activeTimer={activeTimer} />

            {freeLimitReached && (
              <button
                type="button"
                onClick={() => navigate(`/upgrade?feature=goals&returnTo=${encodeURIComponent('/goals')}`)}
                className="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-left text-sm font-bold text-[#1E6F9F]"
              >
                Free member bisa membuat sampai {FREE_LIMITS.goals} goal. Upgrade Pro untuk goal tanpa batas.
              </button>
            )}

            {/* Suggested specific goals */}
            <div>
              <div className="mb-2 flex items-center justify-between px-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Specific Goal Templates</p>
                <span className="text-[11px] font-bold text-slate-300">{goals.length}/{hasFullAccess ? '∞' : FREE_LIMITS.goals}</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {GOAL_TEMPLATES.map((template) => {
                  const Icon = ICON_MAP[template.iconName];
                  const alreadyAdded = goals.some(goal => goal.title === template.title);
                  return (
                    <button
                      key={template.title}
                      type="button"
                      disabled={alreadyAdded}
                      onClick={() => addTemplateGoal(template)}
                      className="rounded-2xl border border-slate-100 bg-white p-3 text-left transition hover:border-slate-200 hover:shadow-sm disabled:opacity-45"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${template.color}18`, color: template.color }}>
                          <Icon size={17} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-black text-[#101828]">{template.title}</p>
                          <p className="mt-0.5 line-clamp-2 text-xs font-semibold leading-relaxed text-slate-400">{template.description}</p>
                          <p className="mt-2 text-[10px] font-black uppercase tracking-wide" style={{ color: template.color }}>
                            {template.target} {template.unit} • {template.frequency}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active goals */}
            {active.length > 0 && (
              <div>
                <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">Active</p>
                <div className="space-y-2.5">
                  <AnimatePresence>
                    {active.map(g => (
                      <GoalCard key={g.id} goal={g}
                        onDelete={() => deleteGoal(g.id)}
                        onProgress={d => changeProgress(g.id, d)} />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Empty state */}
            {active.length === 0 && completed.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50">
                  <Target size={20} className="text-slate-300" />
                </div>
                <p className="font-bold text-slate-500">No goals yet</p>
                <p className="mt-1 text-sm text-slate-400">Set your first learning goal.</p>
                <button type="button" onClick={() => freeLimitReached ? navigate(`/upgrade?feature=goals&returnTo=${encodeURIComponent('/goals')}`) : setShowAdd(true)}
                  className="mt-4 rounded-xl bg-[#4FA3D1] px-5 py-2.5 text-sm font-black text-white hover:bg-[#2F86B5]">
                  Add Goal
                </button>
              </div>
            )}

            {/* Completed */}
            {completed.length > 0 && (
              <div>
                <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">Completed</p>
                <div className="space-y-2.5">
                  <AnimatePresence>
                    {completed.map(g => (
                      <GoalCard key={g.id} goal={g}
                        onDelete={() => deleteGoal(g.id)}
                        onProgress={d => changeProgress(g.id, d)} />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageContainer>

      <AnimatePresence>
        {showAdd && <AddModal onClose={() => setShowAdd(false)} onAdd={addGoal} />}
      </AnimatePresence>
    </>
  );
}
