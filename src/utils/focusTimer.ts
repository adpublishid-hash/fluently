export const FOCUS_SESSIONS_KEY = 'fluently_focus_sessions_v1';
export const GOALS_KEY = 'talky_user_goals_v1';
export const FOCUS_SESSION_EVENT = 'fluently-focus-session';
export const ACTIVE_FOCUS_TIMER_KEY = 'fluently_active_focus_timer_v1';
export const ACTIVE_FOCUS_TIMER_EVENT = 'fluently-active-focus-timer';
export const OPEN_FOCUS_TIMER_EVENT = 'fluently-open-focus-timer';

export interface FocusSession {
  id: string;
  minutes: number;
  source: string;
  completedAt: string;
}

export type FocusLinkType = 'Free' | 'Goals' | 'Module' | 'AI Chat';

export interface ActiveFocusTimer {
  id: string;
  durationMinutes: number;
  startedAt: number;
  endsAt: number;
  remainingSeconds?: number;
  source: string;
  linkType: FocusLinkType;
  linkedTitle?: string;
  running: boolean;
}

interface StoredGoal {
  id?: string;
  title?: string;
  current?: number;
  target?: number;
  unit?: string;
  area?: string;
  completed?: boolean;
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getFocusSessions(): FocusSession[] {
  const parsed = readJson<unknown>(FOCUS_SESSIONS_KEY, []);
  if (!Array.isArray(parsed)) return [];
  return parsed
    .filter((session): session is FocusSession => {
      if (!session || typeof session !== 'object') return false;
      const item = session as Partial<FocusSession>;
      return typeof item.minutes === 'number' && typeof item.completedAt === 'string';
    })
    .map((session) => ({
      id: session.id || crypto.randomUUID(),
      minutes: session.minutes,
      source: session.source || 'Focus timer',
      completedAt: session.completedAt,
    }));
}

export function getTodayFocusMinutes(sessions = getFocusSessions()) {
  const today = new Date().toDateString();
  return sessions
    .filter((session) => new Date(session.completedAt).toDateString() === today)
    .reduce((sum, session) => sum + session.minutes, 0);
}

export function getTotalFocusMinutes(sessions = getFocusSessions()) {
  return sessions.reduce((sum, session) => sum + session.minutes, 0);
}

function updateFocusGoals(minutes: number) {
  const goals = readJson<StoredGoal[]>(GOALS_KEY, []);
  if (!Array.isArray(goals) || goals.length === 0) return;

  const nextGoals = goals.map((goal) => {
    const unit = String(goal.unit || '').toLowerCase();
    const isFocusGoal = goal.area === 'Focus' || unit === 'min' || unit === 'minutes';
    if (!isFocusGoal || goal.completed) return goal;

    const target = Number(goal.target || 0);
    const current = Number(goal.current || 0);
    const nextCurrent = target > 0 ? Math.min(target, current + minutes) : current + minutes;
    return {
      ...goal,
      current: nextCurrent,
      completed: target > 0 ? nextCurrent >= target : goal.completed,
    };
  });

  localStorage.setItem(GOALS_KEY, JSON.stringify(nextGoals));
}

export function recordFocusSession(minutes: number, source = 'Focus timer') {
  const cleanMinutes = Math.max(1, Math.round(minutes));
  const session: FocusSession = {
    id: crypto.randomUUID(),
    minutes: cleanMinutes,
    source,
    completedAt: new Date().toISOString(),
  };
  const nextSessions = [session, ...getFocusSessions()].slice(0, 180);
  localStorage.setItem(FOCUS_SESSIONS_KEY, JSON.stringify(nextSessions));
  updateFocusGoals(cleanMinutes);
  window.dispatchEvent(new CustomEvent(FOCUS_SESSION_EVENT, { detail: session }));
  window.dispatchEvent(new Event('storage'));
  return session;
}

export function getActiveFocusTimer(): ActiveFocusTimer | null {
  const timer = readJson<ActiveFocusTimer | null>(ACTIVE_FOCUS_TIMER_KEY, null);
  if (!timer || typeof timer !== 'object' || !timer.endsAt) return null;
  const durationSeconds = Math.max(60, Math.round(timer.durationMinutes * 60));
  return {
    ...timer,
    remainingSeconds: timer.running
      ? Math.max(0, Math.ceil((timer.endsAt - Date.now()) / 1000))
      : Math.max(0, Math.min(durationSeconds, Math.round(timer.remainingSeconds ?? durationSeconds))),
  };
}

export function saveActiveFocusTimer(timer: ActiveFocusTimer | null) {
  if (timer) {
    localStorage.setItem(ACTIVE_FOCUS_TIMER_KEY, JSON.stringify(timer));
  } else {
    localStorage.removeItem(ACTIVE_FOCUS_TIMER_KEY);
  }
  window.dispatchEvent(new CustomEvent(ACTIVE_FOCUS_TIMER_EVENT, { detail: timer }));
}

export function openFocusTimer(source = 'Focus timer') {
  window.dispatchEvent(new CustomEvent(OPEN_FOCUS_TIMER_EVENT, { detail: { source } }));
}

export function startActiveFocusTimer(options: {
  durationMinutes: number;
  source?: string;
  linkType?: FocusLinkType;
  linkedTitle?: string;
}) {
  const durationMinutes = Math.max(1, Math.round(options.durationMinutes));
  const now = Date.now();
  const timer: ActiveFocusTimer = {
    id: crypto.randomUUID(),
    durationMinutes,
    startedAt: now,
    endsAt: now + durationMinutes * 60 * 1000,
    remainingSeconds: durationMinutes * 60,
    source: options.source || 'Focus timer',
    linkType: options.linkType || 'Free',
    linkedTitle: options.linkedTitle,
    running: true,
  };
  saveActiveFocusTimer(timer);
  return timer;
}

export function pauseActiveFocusTimer(timer: ActiveFocusTimer) {
  const remainingSeconds = Math.max(0, Math.ceil((timer.endsAt - Date.now()) / 1000));
  const next = { ...timer, running: false, remainingSeconds };
  saveActiveFocusTimer(next);
  return next;
}

export function resumeActiveFocusTimer(timer: ActiveFocusTimer) {
  const remainingSeconds = Math.max(0, timer.remainingSeconds ?? Math.ceil((timer.endsAt - Date.now()) / 1000));
  const next = { ...timer, running: true, endsAt: Date.now() + remainingSeconds * 1000, remainingSeconds };
  saveActiveFocusTimer(next);
  return next;
}

export function completeActiveFocusTimer(timer: ActiveFocusTimer) {
  recordFocusSession(timer.durationMinutes, timer.linkedTitle ? `${timer.source} • ${timer.linkedTitle}` : timer.source);
  saveActiveFocusTimer(null);
}

export function formatFocusTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
}
