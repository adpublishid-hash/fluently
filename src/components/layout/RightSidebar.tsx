import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Flame, Trophy } from 'lucide-react';
import { mockLeaderboard } from '../../data/mockData';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatRecentChatTime, getRecentChatRoute, getRecentChatSessions } from '../../features/chat/recentSessions';
import { useAuth } from '../../auth/AuthContext';
import { FOCUS_SESSION_EVENT, getFocusSessions, getTodayFocusMinutes, type FocusSession } from '../../utils/focusTimer';

const chatHistory: { id: number; title: string; time: string; mode: string; modeId: string }[] = [];

/* ──────────────────────────────────────────────
   Today's Goal Widget
   ────────────────────────────────────────────── */

const DAILY_XP_GOAL = 50;

function TodaysGoal() {
  const { user } = useAuth();
  const totalXP = user?.xp ?? 0;
  const currentXP = totalXP % DAILY_XP_GOAL; // resets each goal cycle
  const goalXP = DAILY_XP_GOAL;
  const progress = (currentXP / goalXP) * 100;
  const size = 100;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (progress / 100) * c;

  return (
    <div className="desktop-sidebar-widget">
      <h3 className="text-[14px] font-bold text-[#1A1A2E] tracking-tight mb-4">Today's Goal</h3>

      <div className="flex flex-col items-center">
        {/* Circular progress */}
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke="#F3F4F6"
              strokeWidth={stroke}
              fill="none"
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke="#7EC3E6"
              strokeWidth={stroke}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={c}
              initial={{ strokeDashoffset: c }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[11px] text-[#9CA3AF] font-medium">XP</span>
            <Flame size={16} className="text-[#FF6B6B] mt-0.5" />
          </div>
        </div>

        {/* XP counter */}
        <div className="mt-3 text-center">
          <p className="text-[18px] font-extrabold text-[#1A1A2E] tracking-tight">
            {currentXP} / {goalXP} <span className="text-[13px] font-bold text-[#4FA3D1]">XP</span>
          </p>
          <p className="text-[11px] text-[#9CA3AF] font-normal mt-0.5">{currentXP >= goalXP ? 'Goal complete!' : 'Keep going'}</p>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Top Learners Widget
   ────────────────────────────────────────────── */

function TopLearners() {
  const navigate = useNavigate();
  const top3 = mockLeaderboard.slice(0, 3);

  const rankColors: Record<number, string> = {
    1: '#FFD700',
    2: '#C0C0C0',
    3: '#CD7F32',
  };

  return (
    <div className="desktop-sidebar-widget">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-[#F59E0B]" />
          <h3 className="text-[14px] font-bold text-[#1A1A2E] tracking-tight">Top Learners</h3>
        </div>
        <motion.button
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/rank')}
          className="text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>

      <div className="space-y-3">
        {top3.length === 0 && (
          <p className="text-[11px] text-[#9CA3AF] py-2">Belum ada peringkat. Mulai belajar!</p>
        )}
        {top3.map((entry) => (
          <motion.div
            key={entry.rank}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: entry.rank * 0.1 }}
          >
            {/* Rank number */}
            <span
              className="text-[13px] font-extrabold w-5 text-center"
              style={{ color: rankColors[entry.rank] || '#6B7280' }}
            >
              {entry.rank}
            </span>

            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full overflow-hidden ring-2 shrink-0"
              style={{ borderColor: rankColors[entry.rank] }}
            >

              <img
                src={entry.user.avatarUrl}
                alt={entry.user.name}
                className="w-full h-full object-cover"
                style={{ backgroundColor: entry.rank === 1 ? '#ffd5dc' : entry.rank === 2 ? '#c0aede' : '#b6e3f4' }}
              />
            </div>

            {/* Name + XP */}
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-[#1A1A2E] truncate">{entry.user.name}</p>
              <p className="text-[10px] font-semibold" style={{ color: '#7EC3E6' }}>
                {entry.user.xp.toLocaleString()} XP
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Activity Heatmap Widget
   ────────────────────────────────────────────── */

function ActivityHeatmap() {
  const { user } = useAuth();
  const streak = user?.streak ?? 0;
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>(getFocusSessions);
  const todayFocus = getTodayFocusMinutes(focusSessions);

  useEffect(() => {
    const refresh = () => setFocusSessions(getFocusSessions());
    window.addEventListener(FOCUS_SESSION_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(FOCUS_SESSION_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const activityData = [0, 1].map((weekOffset) => (
    days.map((_, dayIndex) => {
      const target = new Date();
      const daysBack = (1 - weekOffset) * 7 + (6 - dayIndex);
      target.setDate(target.getDate() - daysBack);
      target.setHours(0, 0, 0, 0);
      const start = target.getTime();
      const end = start + 24 * 60 * 60 * 1000;
      const minutes = focusSessions
        .filter((session) => {
          const time = new Date(session.completedAt).getTime();
          return time >= start && time < end;
        })
        .reduce((sum, session) => sum + session.minutes, 0);
      if (minutes >= 50) return 4;
      if (minutes >= 25) return 3;
      if (minutes >= 10) return 2;
      if (minutes > 0) return 1;
      return 0;
    })
  ));

  const getColor = (level: number) => {
    if (level === 0) return '#F3F4F6';
    if (level <= 1) return '#BBF7D0';
    if (level <= 2) return '#86EFAC';
    if (level <= 3) return '#4ADE80';
    if (level <= 4) return '#22C55E';
    return '#16A34A';
  };

  return (
    <div className="desktop-sidebar-widget">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[14px]">📅</span>
          <h3 className="text-[14px] font-bold text-[#1A1A2E] tracking-tight">Activity</h3>
        </div>
        <div className="flex items-center gap-1 bg-[#FEF3C7] rounded-full px-2 py-0.5">
          <Flame size={12} className="text-[#F59E0B]" />
          <span className="text-[10px] font-bold text-[#F59E0B]">{todayFocus || streak}</span>
        </div>
      </div>

      {/* Day labels */}
      <div className="flex gap-1.5 mb-1.5">
        {days.map((d, i) => (
          <div key={i} className="w-7 text-center text-[9px] font-semibold text-[#9CA3AF] uppercase">
            {d}
          </div>
        ))}
      </div>

      {/* Heatmap grid */}
      <div className="space-y-1.5">
        {activityData.map((week, wi) => (
          <div key={wi} className="flex gap-1.5">
            {week.map((level, di) => (
              <motion.div
                key={`${wi}-${di}`}
                className="w-7 h-7 rounded-md"
                style={{ backgroundColor: getColor(level) }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: (wi * 7 + di) * 0.03, type: 'spring', stiffness: 400, damping: 20 }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Chat Session Widget
   ────────────────────────────────────────────── */

function ChatSessionWidget() {
  const navigate = useNavigate();
  const recentSessions = getRecentChatSessions();
  const sessions = recentSessions.length ? recentSessions : chatHistory;

  return (
    <div className="desktop-sidebar-widget !p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-text-muted" />
          <h4 className="font-extrabold text-[14px] text-text-primary">Recent Sessions</h4>
        </div>
        <button
          type="button"
          onClick={() => navigate('/chat')}
          className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
        >
          View all
        </button>
      </div>
      <div className="p-3">
        {sessions.slice(0, 4).map((hist) => {
          const route = getRecentChatRoute(hist);
          const mode = 'modeLabel' in hist ? hist.modeLabel : hist.mode;
          const time = 'updatedAt' in hist ? formatRecentChatTime(hist.updatedAt) : hist.time;
          return (
          <button
            key={hist.id}
            type="button"
            onClick={() => navigate(route)}
            className="w-full text-left px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <p className="text-[13px] font-semibold text-text-primary truncate leading-snug">{hist.title}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">{mode}</span>
              <span className="text-[11px] text-text-muted">{time}</span>
            </div>
          </button>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   RIGHT SIDEBAR (exported)
   ────────────────────────────────────────────── */

export default function RightSidebar() {
  const location = useLocation();
  const showChatSession = location.pathname === '/chat' || location.pathname.startsWith('/chat/');

  return (
    <aside className="hidden xl:flex flex-col w-[280px] shrink-0 gap-5 sticky top-8 self-start">
      <TodaysGoal />
      <TopLearners />
      <ActivityHeatmap />
      {showChatSession && <ChatSessionWidget />}
    </aside>
  );
}
