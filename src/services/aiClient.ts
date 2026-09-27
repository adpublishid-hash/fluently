// Client side of the AI quota: every AI request goes through aiFetch so the
// learner's own Google AI Studio key (if saved) is attached and quota/key
// problems open the key prompt.
import { getAuthHeaders, getChatAiApiKey, removeChatAiApiKey, saveChatAiApiKey } from './aiKeyService';

export const AI_KEY_NEEDED_EVENT = 'ai:key-needed';
export const AI_QUOTA_CHANGED_EVENT = 'ai:quota-changed';
export const AI_STUDIO_KEY_URL = 'https://aistudio.google.com/apikey';

export type AiQuota = { plan: string; limit: number; used: number; remaining: number; resetsAt: string; serverConfigured?: boolean };
export type AiKeyNeededDetail = { code: 'AI_QUOTA_EXCEEDED' | 'AI_KEY_REQUIRED' | 'BYOK_INVALID' | 'MANAGE'; message?: string; quota?: AiQuota };

const STUDIO_KEY_PATTERN = /^AIza[0-9A-Za-z_-]{35}$/;

export function isStudioKey(key: string | null | undefined): key is string {
  return STUDIO_KEY_PATTERN.test(String(key || '').trim());
}

export function getStudioKey(): string | null {
  const key = getChatAiApiKey();
  return isStudioKey(key) ? key.trim() : null;
}

export function saveStudioKey(key: string) {
  saveChatAiApiKey(key.trim());
  window.dispatchEvent(new Event(AI_QUOTA_CHANGED_EVENT));
}

export function removeStudioKey() {
  removeChatAiApiKey();
  window.dispatchEvent(new Event(AI_QUOTA_CHANGED_EVENT));
}

export function aiHeaders(): Record<string, string> {
  const key = getStudioKey();
  return { 'Content-Type': 'application/json', ...getAuthHeaders(), ...(key ? { 'X-Gemini-Key': key } : {}) };
}

export function openAiKeyPrompt(detail: AiKeyNeededDetail = { code: 'MANAGE' }) {
  window.dispatchEvent(new CustomEvent<AiKeyNeededDetail>(AI_KEY_NEEDED_EVENT, { detail }));
}

/** POSTs to an AI endpoint; opens the key prompt when the quota is used up or the own key fails. */
export async function aiFetch(path: string, body: unknown): Promise<Response> {
  const response = await fetch(path, { method: 'POST', headers: aiHeaders(), body: JSON.stringify(body) });
  window.dispatchEvent(new Event(AI_QUOTA_CHANGED_EVENT));
  if (response.status === 429 || response.status === 503 || response.status === 400) {
    const data = await response.clone().json().catch(() => null) as { code?: string; error?: string; quota?: AiQuota } | null;
    if (data?.code === 'AI_QUOTA_EXCEEDED' || data?.code === 'AI_KEY_REQUIRED' || data?.code === 'BYOK_INVALID') {
      openAiKeyPrompt({ code: data.code, message: data.error, quota: data.quota });
    }
  }
  return response;
}

export async function fetchAiQuota(): Promise<AiQuota | null> {
  try {
    const response = await fetch('/api/ai/quota', { headers: getAuthHeaders() });
    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
}

export async function verifyStudioKey(key: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch('/api/ai/byok/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ key: key.trim() }),
    });
    const data = await response.json().catch(() => null);
    return response.ok && data?.ok ? { ok: true } : { ok: false, error: data?.error || 'Key tidak bisa diverifikasi.' };
  } catch {
    return { ok: false, error: 'Tidak bisa menghubungi server.' };
  }
}
