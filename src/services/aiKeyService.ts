export const AI_CHAT_API_KEY_STORAGE = 'fluently_ai_chat_api_key';
export const AI_CHAT_MODEL_STORAGE = 'fluently_ai_chat_model';
export const DEFAULT_CHAT_AI_MODEL = 'gemini-2.5-flash';
export const DEFAULT_CHAT_AI_PROVIDER = 'Kie AI · Gemini 3.8 Flash';
const SESSION_KEY = 'talky_session';
const TOKEN_KEY = 'talky_token';

export type AiPlan = 'free' | 'pro' | 'lifetime';

function normalizePlan(plan: unknown): AiPlan {
  return plan === 'pro' || plan === 'lifetime' ? plan : 'free';
}

export function getCurrentUserPlan(): AiPlan {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return 'free';
    const user = JSON.parse(raw);
    return normalizePlan(user?.plan);
  } catch {
    return 'free';
  }
}

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function isPaidAiPlan(plan: unknown): boolean {
  const normalized = normalizePlan(plan);
  return normalized === 'pro' || normalized === 'lifetime';
}

export function getChatAiApiKey(): string | null {
  return localStorage.getItem(AI_CHAT_API_KEY_STORAGE);
}

export function saveChatAiApiKey(key: string): void {
  localStorage.setItem(AI_CHAT_API_KEY_STORAGE, key.trim());
}

export function removeChatAiApiKey(): void {
  localStorage.removeItem(AI_CHAT_API_KEY_STORAGE);
}

export function hasChatAiApiKey(): boolean {
  return true;
}

export function hasUsableChatAiAccess(_plan: unknown = getCurrentUserPlan()): boolean {
  return true;
}

export function getMaskedChatAiKey(): string {
  const key = getChatAiApiKey();
  if (!key) return 'Default key aktif via backend';
  return `${key.slice(0, 6)}...${key.slice(-6)}`;
}

export function getChatAiModel(): string {
  return localStorage.getItem(AI_CHAT_MODEL_STORAGE) || DEFAULT_CHAT_AI_MODEL;
}

export function saveChatAiModel(model: string): void {
  localStorage.setItem(AI_CHAT_MODEL_STORAGE, model.trim() || DEFAULT_CHAT_AI_MODEL);
}
