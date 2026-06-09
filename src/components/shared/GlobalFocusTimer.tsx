import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Pause, Play, RotateCcw, Search, Settings, Timer, X } from 'lucide-react';
import {
  ACTIVE_FOCUS_TIMER_EVENT,
  OPEN_FOCUS_TIMER_EVENT,
  completeActiveFocusTimer,
  formatFocusTime,
  getActiveFocusTimer,
  pauseActiveFocusTimer,
  resumeActiveFocusTimer,
  saveActiveFocusTimer,
  startActiveFocusTimer,
  type ActiveFocusTimer,
  type FocusLinkType,
} from '../../utils/focusTimer';

const RECENT_MODULES_KEY = 'fluently_recent_modules';
const RECENT_CHAT_SESSIONS_KEY = 'fluently_recent_chat_sessions';
const GOALS_KEY = 'talky_user_goals_v1';

const PRESETS = [
  { label: 'Pomodoro', minutes: 25 },
  { label: 'Deep Work', minutes: 50 },
  { label: 'Quick Focus', minutes: 15 },
  { label: 'Custom', minutes: 30 },
];

const LINK_TYPES: Array<{ type: FocusLinkType; label: string; empty: string; placeholder: string }> = [
  {
    type: 'Free',
    label: 'Bebas',
    empty: 'Timer bebas tanpa link khusus.',
    placeholder: 'Contoh: Review vocabulary A1',
  },
  {
    type: 'Goals',
    label: 'Goals',
    empty: 'Belum ada goals aktif.',
    placeholder: 'Cari goals...',
  },
  {
    type: 'Module',
    label: 'Modul',
    empty: 'Belum ada modul recent.',
    placeholder: 'Cari modul recent...',
  },
  {
    type: 'AI Chat',
    label: 'AI Chat',
    empty: 'Belum ada sesi AI chat recent.',
    placeholder: 'Cari sesi AI chat...',
  },
];

function readArray<T>(key: string): T[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getLinkItems(type: FocusLinkType) {
  if (type === 'Goals') {
    return readArray<{ title?: string; description?: string; completed?: boolean }>(GOALS_KEY)
      .filter((goal) => goal.title && !goal.completed)
      .map((goal) => ({ title: goal.title || 'Untitled goal', subtitle: goal.description || 'Learning goal' }));
  }

  if (type === 'Module') {
    return readArray<{ title?: string; subtitle?: string; level?: string; category?: string }>(RECENT_MODULES_KEY)
      .map((module) => ({
        title: module.title || 'Recent module',
        subtitle: module.subtitle || module.level || module.category || 'Module',
      }))
      .slice(0, 8);
  }

  if (type === 'AI Chat') {
    return readArray<{ title?: string; topic?: string; modeLabel?: string; mode?: string; level?: string }>(RECENT_CHAT_SESSIONS_KEY)
      .map((chat) => ({
        title: chat.title || chat.topic || 'Recent chat',
        subtitle: [chat.modeLabel || chat.mode || 'AI chat', chat.level].filter(Boolean).join(' • '),
      }))
      .slice(0, 8);
  }

  return [];
}

function sourceFromPath(pathname: string) {
  if (pathname.startsWith('/chat')) return 'AI chat focus timer';
  if (pathname.startsWith('/modul')) return 'Module focus timer';
  if (pathname.startsWith('/game')) return 'Game focus timer';
  if (pathname.startsWith('/latihan')) return 'Practice focus timer';
  if (pathname.startsWith('/ujian')) return 'Exam focus timer';
  if (pathname.startsWith('/notes')) return 'Notes focus timer';
  if (pathname.startsWith('/goals')) return 'Goals focus timer';
  return 'App focus timer';
}

function secondsLeft(timer: ActiveFocusTimer | null) {
  if (!timer) return 0;
  if (!timer.running) return Math.max(0, Math.round(timer.remainingSeconds ?? 0));
  return Math.max(0, Math.ceil((timer.endsAt - Date.now()) / 1000));
}

export default function GlobalFocusTimer() {
  const [timer, setTimer] = useState<ActiveFocusTimer | null>(getActiveFocusTimer);
  const [remaining, setRemaining] = useState(() => secondsLeft(getActiveFocusTimer()));
  const [showModal, setShowModal] = useState(false);
  const [linkType, setLinkType] = useState<FocusLinkType>('Free');
  const [query, setQuery] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [preset, setPreset] = useState(PRESETS[0]);
  const [customMinutes, setCustomMinutes] = useState('30');
  const [freeLabel, setFreeLabel] = useState('');
  const [doneMessage, setDoneMessage] = useState('');
  const [sourceOverride, setSourceOverride] = useState('');

  useEffect(() => {
    const refresh = () => {
      const active = getActiveFocusTimer();
      setTimer(active);
      setRemaining(secondsLeft(active));
    };
    window.addEventListener(ACTIVE_FOCUS_TIMER_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(ACTIVE_FOCUS_TIMER_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  useEffect(() => {
    const open = (event: Event) => {
      const detail = (event as CustomEvent<{ source?: string }>).detail;
      setSourceOverride(detail?.source || '');
      setShowModal(true);
    };
    window.addEventListener(OPEN_FOCUS_TIMER_EVENT, open);
    return () => window.removeEventListener(OPEN_FOCUS_TIMER_EVENT, open);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const active = getActiveFocusTimer();
      if (!active) {
        setTimer(null);
        setRemaining(0);
        return;
      }
      const nextRemaining = secondsLeft(active);
      setTimer(active);
      setRemaining(nextRemaining);
      if (active.running && nextRemaining <= 0) {
        completeActiveFocusTimer(active);
        setDoneMessage(`${active.linkedTitle || active.linkType} selesai. +${active.durationMinutes} menit fokus tercatat.`);
        window.setTimeout(() => setDoneMessage(''), 5000);
      }
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const linkItems = useMemo(() => {
    const items = getLinkItems(linkType);
    const needle = query.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((item) => `${item.title} ${item.subtitle}`.toLowerCase().includes(needle));
  }, [linkType, query]);

  const progress = timer
    ? Math.min(100, Math.round(((timer.durationMinutes * 60 - remaining) / (timer.durationMinutes * 60)) * 100))
    : 0;

  const selectedMinutes = preset.label === 'Custom'
    ? Math.max(1, Math.min(180, Number(customMinutes) || 30))
    : preset.minutes;
  const activeLinkConfig = LINK_TYPES.find((item) => item.type === linkType) || LINK_TYPES[0];

  const startTimer = () => {
    const linkedTitle = selectedTitle || freeLabel.trim() || undefined;
    const active = startActiveFocusTimer({
      durationMinutes: selectedMinutes,
      source: sourceOverride || sourceFromPath(window.location.pathname),
      linkType,
      linkedTitle,
    });
    setTimer(active);
    setRemaining(secondsLeft(active));
    setShowModal(false);
  };

  const togglePause = () => {
    if (!timer) return;
    setTimer(timer.running ? pauseActiveFocusTimer(timer) : resumeActiveFocusTimer(timer));
  };

  const resetTimer = () => {
    saveActiveFocusTimer(null);
    setTimer(null);
    setRemaining(0);
  };

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990] flex items-center justify-center bg-slate-950/35 px-4 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: 32, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 32, opacity: 0, scale: 0.96 }}
              className="w-full max-w-[520px] overflow-hidden rounded-[28px] bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-red-400">
                      <Play size={30} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-[#101828]">Mulai Timer</h2>
                      <p className="mt-1 text-sm font-semibold text-slate-500">Pilih mode dan mulai</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setShowModal(false)} className="rounded-2xl p-2 text-slate-500 hover:bg-slate-50">
                    <X size={24} />
                  </button>
                </div>

                <p className="mt-8 text-[12px] font-black uppercase tracking-[0.28em] text-slate-500">Link To</p>
                <div className="mt-4 grid grid-cols-4 rounded-2xl border border-red-100 bg-red-50/35 p-1">
                  {LINK_TYPES.map((item) => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => {
                        setLinkType(item.type);
                        setSelectedTitle('');
                        setQuery('');
                      }}
                      className={`rounded-xl py-3 text-sm font-black ${linkType === item.type ? 'bg-white text-[#101828] shadow-sm' : 'text-slate-600'}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {linkType !== 'Free' && (
                  <>
                    <div className="mt-4 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50/25 px-4 py-3">
                      <Search size={20} className="text-slate-500" />
                      <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={activeLinkConfig.placeholder}
                        className="w-full bg-transparent text-sm font-semibold text-[#101828] outline-none placeholder:text-slate-400"
                      />
                    </div>
                    <div className="mt-4 max-h-36 overflow-auto rounded-2xl border border-slate-100">
                      {linkItems.length ? linkItems.map((item) => (
                        <button
                          key={`${item.title}-${item.subtitle}`}
                          type="button"
                          onClick={() => setSelectedTitle(item.title)}
                          className="flex w-full items-center justify-between gap-3 border-b border-slate-50 px-4 py-3 text-left last:border-0 hover:bg-slate-50"
                        >
                          <span>
                            <span className="block text-sm font-black text-[#101828]">{item.title}</span>
                            <span className="block text-xs font-semibold text-slate-400">{item.subtitle}</span>
                          </span>
                          {selectedTitle === item.title && <Check size={18} className="text-[#4FA3D1]" />}
                        </button>
                      )) : (
                        <p className="px-4 py-6 text-center text-sm font-semibold text-slate-400">{activeLinkConfig.empty}</p>
                      )}
                    </div>
                  </>
                )}

                {linkType === 'Free' && (
                  <div className="mt-5">
                    <label className="mb-2 block text-[11px] font-black uppercase tracking-wider text-slate-400">Focus Label</label>
                    <input
                      value={freeLabel}
                      onChange={(event) => setFreeLabel(event.target.value)}
                      placeholder="Contoh: Review vocabulary A1"
                      className="w-full rounded-2xl border border-red-100 bg-red-50/20 px-4 py-3 text-sm font-semibold text-[#101828] outline-none placeholder:text-slate-400 focus:border-[#4FA3D1]"
                    />
                    <p className="mt-3 text-center text-sm font-semibold text-slate-500">{activeLinkConfig.empty}</p>
                  </div>
                )}

                <div className="mt-8 rounded-2xl border border-red-100 bg-red-50/25 px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Settings size={20} className="text-slate-600" />
                    <span className="text-sm font-black text-[#101828]">Customize</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const current = PRESETS.findIndex((item) => item.minutes === preset.minutes);
                      setPreset(PRESETS[(current + 1) % PRESETS.length]);
                    }}
                    className="flex items-center gap-2 text-sm font-bold text-slate-600"
                  >
                    {preset.label} · {selectedMinutes}m <ChevronDown size={16} />
                  </button>
                  </div>
                  {preset.label === 'Custom' && (
                    <div className="mt-4 flex items-center gap-3">
                      <input
                        type="range"
                        min="5"
                        max="180"
                        step="5"
                        value={selectedMinutes}
                        onChange={(event) => setCustomMinutes(event.target.value)}
                        className="h-2 flex-1 accent-[#4FA3D1]"
                      />
                      <input
                        type="number"
                        min="1"
                        max="180"
                        value={customMinutes}
                        onChange={(event) => setCustomMinutes(event.target.value)}
                        className="w-20 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-black text-[#101828] outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 bg-red-50/15 px-7 py-5">
                <button type="button" onClick={() => setShowModal(false)} className="text-sm font-black text-slate-600">Cancel</button>
                <button type="button" onClick={startTimer} className="flex items-center gap-3 rounded-2xl bg-[#101828] px-4 py-2 text-sm font-black text-white hover:bg-[#1E293B]">
                  <Play size={18} fill="currentColor" />
                  Start Timer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-24 right-4 z-[80] hidden md:block sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {doneMessage && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              className="mb-3 max-w-[280px] rounded-2xl border border-emerald-100 bg-white p-3 text-sm font-bold text-emerald-700 shadow-[0_18px_50px_rgba(15,23,42,0.16)]"
            >
              {doneMessage}
            </motion.div>
          )}
        </AnimatePresence>
        {timer ? (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`w-[236px] rounded-3xl border bg-white p-3 shadow-[0_18px_50px_rgba(15,23,42,0.18)] ${timer.running ? 'border-slate-100' : 'border-amber-100'}`}
          >
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#4FA3D1]">
                <Timer size={21} />
                <span className="absolute -bottom-1 rounded-full bg-white px-1.5 text-[9px] font-black text-[#4FA3D1]">{progress}%</span>
              </div>
              <button type="button" onClick={() => setShowModal(true)} className="min-w-0 flex-1 text-left">
                <p className="text-xl font-black text-[#101828]">{formatFocusTime(remaining)}</p>
                <p className="truncate text-[11px] font-bold text-slate-400">
                  {timer.running ? timer.linkedTitle || timer.linkType : `Paused • ${timer.linkedTitle || timer.linkType}`}
                </p>
              </button>
              <button type="button" onClick={togglePause} className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                {timer.running ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}
              </button>
              <button type="button" onClick={resetTimer} className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                <RotateCcw size={14} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            type="button"
            onClick={() => setShowModal(true)}
            className="flex h-14 items-center gap-3 rounded-2xl bg-[#101828] px-4 text-sm font-black text-white shadow-[0_18px_50px_rgba(15,23,42,0.24)] hover:bg-[#1E293B]"
          >
            <Play size={18} fill="currentColor" />
            Focus
          </motion.button>
        )}
      </div>
    </>
  );
}
