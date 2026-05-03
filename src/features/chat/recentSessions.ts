const RECENT_CHAT_SESSIONS_KEY = 'fluently_recent_chat_sessions';
const MAX_RECENT_CHAT_SESSIONS = 6;

export type RecentChatSession = {
  id: string;
  modeId: string;
  modeLabel: string;
  topic: string;
  title: string;
  levelId?: string;
  color: string;
  updatedAt: number;
};

const modeMeta: Record<string, { label: string; color: string }> = {
  vocabulary: { label: 'Vocabulary', color: '#2980B9' },
  pronunciation: { label: 'Pronunciation', color: '#E83E8C' },
  grammar: { label: 'Grammar', color: '#8E44AD' },
  speaking: { label: 'Speaking', color: '#E74C3C' },
  reading: { label: 'Reading', color: '#4FA3D1' },
  writing: { label: 'Writing', color: '#F39C12' },
};

const titleCase = (text: string) =>
  text
    .replace(/[-_]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const getStorage = () => {
  if (typeof window === 'undefined') return null;
  return window.localStorage;
};

export const getRecentChatSessions = (): RecentChatSession[] => {
  const storage = getStorage();
  if (!storage) return [];

  try {
    const parsed = JSON.parse(storage.getItem(RECENT_CHAT_SESSIONS_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is RecentChatSession =>
        item &&
        typeof item.id === 'string' &&
        typeof item.modeId === 'string' &&
        typeof item.topic === 'string' &&
        typeof item.updatedAt === 'number',
      )
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, MAX_RECENT_CHAT_SESSIONS);
  } catch {
    return [];
  }
};

export const saveRecentChatSession = (modeId: string | undefined, topic: string, levelId?: string) => {
  if (!modeId || !topic.trim()) return;

  const storage = getStorage();
  if (!storage) return;

  const meta = modeMeta[modeId] || { label: 'AI Chat', color: '#2980B9' };
  const normalizedTopic = topic.trim();
  const id = `${modeId}:${levelId || 'default'}:${normalizedTopic.toLowerCase()}`;
  const nextSession: RecentChatSession = {
    id,
    modeId,
    modeLabel: meta.label,
    topic: normalizedTopic,
    title: `${titleCase(normalizedTopic)} ${meta.label}`,
    levelId,
    color: meta.color,
    updatedAt: Date.now(),
  };

  const existing = getRecentChatSessions().filter((session) => session.id !== id);
  storage.setItem(RECENT_CHAT_SESSIONS_KEY, JSON.stringify([nextSession, ...existing].slice(0, MAX_RECENT_CHAT_SESSIONS)));
};

export const formatRecentChatTime = (timestamp: number) => {
  const diff = Date.now() - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return 'Just now';
  if (diff < hour) return `${Math.max(1, Math.floor(diff / minute))}m ago`;
  if (diff < day) return `${Math.max(1, Math.floor(diff / hour))}h ago`;
  if (diff < day * 2) return 'Yesterday';
  return `${Math.floor(diff / day)}d ago`;
};

export const getRecentChatRoute = (session: Pick<RecentChatSession, 'modeId' | 'levelId'>) =>
  `/chat/${session.modeId}${session.levelId ? `/${session.levelId}` : ''}`;
