import { FREE_CHAT_SCENARIO_IDS, getEffectivePlan, hasFullAccess, type UserPlan } from '../../utils/accessControl';

const FREE_CHAT_TOPIC_STORAGE = 'fluently_free_ai_chat_topic_daily';

type ChatLimitUser = {
  id?: number | string;
  email?: string;
  plan?: UserPlan;
  planExpiresAt?: string | null;
  role?: string;
} | null;

type DailyTopicRecord = {
  date: string;
  userKey: string;
  modeId: string;
  levelId: string;
  topic: string;
  topicKey: string;
};

const todayKey = () => new Date().toISOString().slice(0, 10);

export const normalizeChatTopicKey = (topic: string) =>
  String(topic || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .slice(0, 140);

const getUserKey = (user: ChatLimitUser) =>
  String(user?.email || user?.id || 'guest').trim().toLowerCase();

export const isFreeAiChatUser = (user: ChatLimitUser) => getEffectivePlan(user) === 'free';

export const isFreeChatLevelAllowed = (levelId?: string) =>
  FREE_CHAT_SCENARIO_IDS.includes(String(levelId || 'a1').toLowerCase());

export const getFreeChatLevelBlockMessage = (levelId?: string) => {
  const level = String(levelId || '').toUpperCase();
  return `Level ${level || 'ini'} hanya untuk Pro. Free user bisa memakai AI Chat di A1 Beginner dan A2 Elementary. Upgrade ke Pro untuk membuka B1 sampai C2.`;
};

export function readTodayFreeChatTopic(user: ChatLimitUser): DailyTopicRecord | null {
  try {
    const raw = localStorage.getItem(FREE_CHAT_TOPIC_STORAGE);
    if (!raw) return null;
    const record = JSON.parse(raw) as DailyTopicRecord;
    if (record.date !== todayKey() || record.userKey !== getUserKey(user)) return null;
    return record;
  } catch {
    return null;
  }
}

export function getFreeChatTopicBlockMessage(user: ChatLimitUser, nextTopic: string) {
  const record = readTodayFreeChatTopic(user);
  const activeTopic = record?.topic || 'topik hari ini';
  return `Limit free hari ini sudah terpakai untuk topik "${activeTopic}". Free user hanya bisa generate 1 topik AI Chat per hari. Kamu tetap bisa lanjut topik itu, atau upgrade Pro untuk topik tanpa batas.`;
}

export function canUseFreeChatTopic(user: ChatLimitUser, topic: string) {
  if (hasFullAccess(user)) return true;
  const topicKey = normalizeChatTopicKey(topic);
  if (!topicKey) return true;
  const record = readTodayFreeChatTopic(user);
  return !record || record.topicKey === topicKey;
}

export function recordFreeChatTopic(user: ChatLimitUser, modeId: string | undefined, topic: string, levelId?: string) {
  if (hasFullAccess(user)) return;
  const topicKey = normalizeChatTopicKey(topic);
  if (!topicKey || readTodayFreeChatTopic(user)) return;
  const record: DailyTopicRecord = {
    date: todayKey(),
    userKey: getUserKey(user),
    modeId: modeId || 'chat',
    levelId: String(levelId || 'a1').toLowerCase(),
    topic: String(topic || '').trim().slice(0, 140),
    topicKey,
  };
  localStorage.setItem(FREE_CHAT_TOPIC_STORAGE, JSON.stringify(record));
}
