import { getAuthHeaders } from '../../../services/aiKeyService';
import { localizedLanguageCopy, type LocalizedFocus, type LocalizedLanguage } from '../localizedLesson';

// Mistake notebook: corrections the AI coach made, stored on the server per
// user and language so later lessons (on any device) can practise them again.

export type ChatMistake = {
  id: number;
  focus: string;
  topic: string;
  original: string;
  corrected: string;
  explanation: string;
  timesSeen: number;
  updatedAt: string;
};

export type NewMistake = { original: string; corrected: string; explanation?: string };

export const MISTAKES_CHANGED_EVENT = 'chat:mistakes-changed';

const notifyChanged = () => {
  try {
    window.dispatchEvent(new Event(MISTAKES_CHANGED_EVENT));
  } catch {
    // no window (tests)
  }
};

export async function fetchMistakes(language: LocalizedLanguage, limit = 20): Promise<ChatMistake[]> {
  try {
    const response = await fetch(`/api/chat/mistakes?language=${localizedLanguageCopy[language].apiId}&limit=${limit}`, { headers: getAuthHeaders() });
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data?.items) ? data.items : [];
  } catch {
    return [];
  }
}

export async function saveMistakes(language: LocalizedLanguage, focus: LocalizedFocus, topic: string, items: NewMistake[]) {
  const clean = items.filter((item) => item.original.trim() && item.corrected.trim());
  if (!clean.length) return;
  try {
    const response = await fetch('/api/chat/mistakes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ language: localizedLanguageCopy[language].apiId, focus, topic: topic.replace(/^Day \d+\s*-\s*/i, ''), items: clean }),
    });
    if (response.ok) notifyChanged();
  } catch {
    // The notebook is best effort; the lesson continues without it.
  }
}

export async function markMistakeMastered(id: number): Promise<boolean> {
  try {
    const response = await fetch(`/api/chat/mistakes/${id}/mastered`, { method: 'POST', headers: getAuthHeaders() });
    if (response.ok) notifyChanged();
    return response.ok;
  } catch {
    return false;
  }
}

/** First sentence (or line) of the coach's feedback, used as the notebook explanation. */
export function summarizeFeedback(feedback: string) {
  const firstLine = feedback.split('\n').map((line) => line.replace(/^[-•*\s]+/, '').trim()).find(Boolean) ?? '';
  const sentence = firstLine.match(/^.+?[.!?](\s|$)/)?.[0] ?? firstLine;
  return sentence.trim().slice(0, 240);
}

export function buildReviewNote(mistakes: Array<Pick<ChatMistake, 'original' | 'corrected'>>) {
  if (!mistakes.length) return '';
  return `🔁 Materi ini juga mengulang kesalahanmu sebelumnya:
${mistakes.map((item) => `• ${item.original} → ${item.corrected}`).join('\n')}`;
}
