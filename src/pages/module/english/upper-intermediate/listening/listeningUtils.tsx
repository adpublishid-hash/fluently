/**
 * Upper-Intermediate Listening Utils — B2 Level
 * Re-exports shared UI components from Beginner Listening,
 * with Upper-Intermediate-specific progress tracking.
 */
export { QuizEngine, DialoguePlayer, FillBlankExercise, WordMatchExercise } from '../../beginner/listening/listeningUtils';
export type { QuizItem, DialogueLine, BlankItem, WordPair } from '../../beginner/listening/listeningUtils';

export const UPPER_INTER_LISTENING_KEY = 'talky_upper_intermediate_listening_completed';

export function getCompletedListeningLessons(): number[] {
  try { return JSON.parse(localStorage.getItem(UPPER_INTER_LISTENING_KEY) || '[]'); } catch { return []; }
}

export function markListeningComplete(id: number) {
  const d = getCompletedListeningLessons();
  if (!d.includes(id)) localStorage.setItem(UPPER_INTER_LISTENING_KEY, JSON.stringify([...d, id]));
}
