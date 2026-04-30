/**
 * Elementary Listening Utils — A2 Level
 * Re-exports shared UI components from Beginner Listening,
 * with Elementary-specific progress tracking key.
 */
export { QuizEngine, DialoguePlayer, FillBlankExercise, WordMatchExercise } from '../../beginner/listening/listeningUtils';
export type { QuizItem, DialogueLine, BlankItem, WordPair } from '../../beginner/listening/listeningUtils';

export const ELEM_LISTENING_KEY = 'talky_elementary_listening_completed';
export function getCompletedListeningLessons(): number[] {
  try { return JSON.parse(localStorage.getItem(ELEM_LISTENING_KEY) || '[]'); } catch { return []; }
}
export function markListeningComplete(id: number) {
  const d = getCompletedListeningLessons();
  if (!d.includes(id)) localStorage.setItem(ELEM_LISTENING_KEY, JSON.stringify([...d, id]));
}
