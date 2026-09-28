// Lesson completion lists live in localStorage under "<prefix>_<module>_completed"
// keys (a JSON array of lesson ids). They are mirrored to the server by
// services/progressSync.ts so progress follows the user across devices.

export const PROGRESS_CHANGED_EVENT = 'fluently-progress-changed';
export const COMPLETION_KEY_PATTERN = /^(talky|fluently)_[a-z0-9_-]{1,120}_completed$/i;

export type LessonId = number | string;

export function readCompletedIds(storageKey: string): LessonId[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return Array.isArray(parsed)
      ? parsed.filter((item): item is LessonId => typeof item === 'number' || typeof item === 'string')
      : [];
  } catch {
    return [];
  }
}

export function writeCompletedIds(storageKey: string, ids: LessonId[]) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(ids));
  } catch {
    return;
  }
  window.dispatchEvent(new Event(PROGRESS_CHANGED_EVENT));
}

/** Adds a lesson id to a completion list. Returns true when it was newly added. */
export function markCompletedId(storageKey: string, lessonId: LessonId): boolean {
  const completed = readCompletedIds(storageKey);
  if (completed.includes(lessonId)) return false;
  writeCompletedIds(storageKey, [...completed, lessonId]);
  return true;
}

export function languageCompletionKey(language: 'arabic' | 'mandarin' | 'japanese', levelId: string, skillId: string) {
  return `talky_${language}_${levelId}_${skillId}_completed`;
}
