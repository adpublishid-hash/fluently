/** Shared completion helpers for elementary (and beyond) lesson modules. */
import { useCallback, useState } from 'react';

export type LessonModuleKey =
  | 'elementary_grammar'
  | 'elementary_pronunciation'
  | 'elementary_speaking'
  | 'elementary_vocabulary'
  | 'intermediate_pronunciation'
  | 'intermediate_vocabulary'
  | 'intermediate_grammar'
  | 'intermediate_speaking'
  | 'intermediate_reading'
  | 'intermediate_listening'
  | 'intermediate_writing'
  | 'upper_intermediate_vocabulary'
  | 'upper_intermediate_grammar'
  | 'upper_intermediate_pronunciation'
  | 'upper_intermediate_speaking';


const storageKey = (mod: LessonModuleKey) => `talky_${mod}_completed`;

export function getCompletedLessons(mod: LessonModuleKey): number[] {
  try { return JSON.parse(localStorage.getItem(storageKey(mod)) || '[]'); } catch { return []; }
}

export function markLessonComplete(mod: LessonModuleKey, lessonId: number): void {
  const done = getCompletedLessons(mod);
  if (!done.includes(lessonId)) {
    localStorage.setItem(storageKey(mod), JSON.stringify([...done, lessonId]));
  }
}

export function useLessonCompletion(mod: LessonModuleKey, lessonId: number) {
  const [isCompleted, setIsCompleted] = useState(() => getCompletedLessons(mod).includes(lessonId));
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const handleSelesai = useCallback(() => {
    markLessonComplete(mod, lessonId);
    setIsCompleted(true);
    setShowCompleteModal(true);
  }, [mod, lessonId]);

  return { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai };
}
