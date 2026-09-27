import type { ChatMessage } from '../../types';
import { getLocalizedFocusLabel } from './languageAdapters';
import type { TargetLanguage } from './targetLanguage';
import type { PronunciationSentenceRow, VocabularyStage } from './types';

const RECENT_CHAT_SESSIONS_KEY = 'fluently_recent_chat_sessions';
const CHAT_SESSION_STATE_KEY = 'fluently_chat_session_state_v1';
const MAX_RECENT_CHAT_SESSIONS = 6;
const MAX_STORED_CHAT_SESSIONS = 12;

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

export type StoredChatSessionState = {
  id: string;
  modeId: string;
  levelId?: string;
  topic: string;
  messages: ChatMessage[];
  vocabStage: VocabularyStage;
  studentName: string;
  selectedTopic: string;
  completedPracticeWords: string[];
  generatedVocabularyWords: string[];
  generatedPronunciationRows: PronunciationSentenceRow[];
  vocabularyPracticeOffset: number;
  pronunciationTurn: number;
  sessionEnded: boolean;
  updatedAt: number;
};

type PersistedChatMessage = Omit<ChatMessage, 'timestamp'> & {
  timestamp: string | number;
};

type PersistedChatSessionState = Omit<StoredChatSessionState, 'messages'> & {
  messages: PersistedChatMessage[];
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

const cleanRecentTopicTitle = (topic: string) =>
  topic
    .replace(/^day\s+\d+\s*-\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim();

const getStorage = () => {
  if (typeof window === 'undefined') return null;
  return window.localStorage;
};

const normalizeLevelId = (levelId?: string) => levelId || undefined;

const isVocabularyStage = (stage: unknown): stage is VocabularyStage =>
  stage === 'ask-name' || stage === 'ask-topic' || stage === 'practice' || stage === 'game' || stage === 'loop';

const toStringArray = (value: unknown) =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

const toPronunciationRows = (value: unknown): PronunciationSentenceRow[] => {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is PronunciationSentenceRow =>
    item &&
    typeof item === 'object' &&
    typeof (item as PronunciationSentenceRow).sentence === 'string' &&
    typeof (item as PronunciationSentenceRow).phonetic === 'string' &&
    typeof (item as PronunciationSentenceRow).focus === 'string' &&
    typeof (item as PronunciationSentenceRow).tip === 'string',
  );
};

const parseTimestamp = (value: unknown) => {
  const timestamp = typeof value === 'number' || typeof value === 'string' ? new Date(value) : new Date();
  return Number.isNaN(timestamp.getTime()) ? new Date() : timestamp;
};

const parseMessages = (value: unknown): ChatMessage[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const message = item as PersistedChatMessage;
      if (typeof message.id !== 'string' || typeof message.text !== 'string' || typeof message.isAi !== 'boolean') return null;
      return {
        id: message.id,
        text: message.text,
        isAi: message.isAi,
        timestamp: parseTimestamp(message.timestamp),
      };
    })
    .filter((item): item is ChatMessage => Boolean(item));
};

const parseStoredSession = (value: unknown): StoredChatSessionState | null => {
  if (!value || typeof value !== 'object') return null;
  const session = value as PersistedChatSessionState;
  if (
    typeof session.id !== 'string' ||
    typeof session.modeId !== 'string' ||
    typeof session.topic !== 'string' ||
    !isVocabularyStage(session.vocabStage)
  ) {
    return null;
  }

  const updatedAt = typeof session.updatedAt === 'number' ? session.updatedAt : Date.now();

  return {
    id: session.id,
    modeId: session.modeId,
    levelId: normalizeLevelId(session.levelId),
    topic: session.topic,
    messages: parseMessages(session.messages),
    vocabStage: session.vocabStage,
    studentName: typeof session.studentName === 'string' ? session.studentName : '',
    selectedTopic: typeof session.selectedTopic === 'string' ? session.selectedTopic : session.topic,
    completedPracticeWords: toStringArray(session.completedPracticeWords),
    generatedVocabularyWords: toStringArray(session.generatedVocabularyWords),
    generatedPronunciationRows: toPronunciationRows(session.generatedPronunciationRows),
    vocabularyPracticeOffset: typeof session.vocabularyPracticeOffset === 'number' ? session.vocabularyPracticeOffset : 0,
    pronunciationTurn: typeof session.pronunciationTurn === 'number' ? session.pronunciationTurn : 0,
    sessionEnded: Boolean(session.sessionEnded),
    updatedAt,
  };
};

const readStoredSessionMap = (): Record<string, StoredChatSessionState> => {
  const storage = getStorage();
  if (!storage) return {};

  try {
    const parsed = JSON.parse(storage.getItem(CHAT_SESSION_STATE_KEY) || '{}');
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};

    return Object.entries(parsed).reduce<Record<string, StoredChatSessionState>>((acc, [id, value]) => {
      const session = parseStoredSession(value);
      if (session && session.id === id) {
        acc[id] = session;
      }
      return acc;
    }, {});
  } catch {
    return {};
  }
};

const serializeSession = (session: StoredChatSessionState): PersistedChatSessionState => ({
  ...session,
  levelId: normalizeLevelId(session.levelId),
  messages: session.messages.map((message) => ({
    ...message,
    timestamp: message.timestamp instanceof Date ? message.timestamp.toISOString() : new Date(message.timestamp).toISOString(),
  })),
});

const writeStoredSessionMap = (sessions: Record<string, StoredChatSessionState>) => {
  const storage = getStorage();
  if (!storage) return;

  const orderedSessions = Object.values(sessions)
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, MAX_STORED_CHAT_SESSIONS);

  storage.setItem(
    CHAT_SESSION_STATE_KEY,
    JSON.stringify(
      orderedSessions.reduce<Record<string, PersistedChatSessionState>>((acc, session) => {
        acc[session.id] = serializeSession(session);
        return acc;
      }, {}),
    ),
  );
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

export const getRecentChatSessionId = (modeId: string | undefined, topic: string, levelId?: string) => {
  if (!modeId || !topic.trim()) return '';
  return `${modeId}:${levelId || 'default'}:${topic.trim().toLowerCase()}`;
};

export const saveRecentChatSession = (
  modeId: string | undefined,
  topic: string,
  levelId?: string,
  targetLanguage: TargetLanguage = 'English',
) => {
  if (!modeId || !topic.trim()) return null;

  const storage = getStorage();
  if (!storage) return null;

  const meta = modeMeta[modeId] || { label: 'AI Chat', color: '#2980B9' };
  const normalizedTopic = topic.trim();
  const modeLabel = targetLanguage === 'Arabic' ? getLocalizedFocusLabel(targetLanguage, modeId) : meta.label;
  const displayTopic = cleanRecentTopicTitle(normalizedTopic);
  const id = getRecentChatSessionId(modeId, normalizedTopic, levelId);
  const nextSession: RecentChatSession = {
    id,
    modeId,
    modeLabel,
    topic: normalizedTopic,
    title: `${titleCase(displayTopic || normalizedTopic)} ${modeLabel}`,
    levelId,
    color: meta.color,
    updatedAt: Date.now(),
  };

  const existing = getRecentChatSessions().filter((session) => session.id !== id);
  storage.setItem(RECENT_CHAT_SESSIONS_KEY, JSON.stringify([nextSession, ...existing].slice(0, MAX_RECENT_CHAT_SESSIONS)));
  return nextSession;
};

export const readStoredChatSession = (sessionId: string | undefined) => {
  if (!sessionId) return null;
  return readStoredSessionMap()[sessionId] || null;
};

export const saveStoredChatSession = (session: StoredChatSessionState) => {
  if (!session.id || !session.modeId || session.messages.length === 0) return;

  const sessions = readStoredSessionMap();
  sessions[session.id] = {
    ...session,
    levelId: normalizeLevelId(session.levelId),
    topic: session.topic.trim() || session.selectedTopic.trim(),
    selectedTopic: session.selectedTopic.trim(),
    updatedAt: Date.now(),
  };
  writeStoredSessionMap(sessions);
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

export const getRecentChatRoute = (session: Pick<RecentChatSession, 'modeId' | 'levelId'> & { id?: string }) => {
  const path = `/chat/${session.modeId}${session.levelId ? `/${session.levelId}` : ''}`;
  return session.id ? `${path}?session=${encodeURIComponent(session.id)}` : path;
};
