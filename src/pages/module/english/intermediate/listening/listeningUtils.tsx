/**
 * Intermediate Listening Utils — B1 Level
 * Re-exports shared UI components from Beginner Listening,
 * with Intermediate-specific progress tracking key.
 */
export { QuizEngine, DialoguePlayer, FillBlankExercise, WordMatchExercise } from '../../beginner/listening/listeningUtils';
export type { QuizItem, DialogueLine, BlankItem, WordPair } from '../../beginner/listening/listeningUtils';

export const INTER_LISTENING_KEY = 'talky_intermediate_listening_completed';

export function getCompletedListeningLessons(): number[] {
  try { return JSON.parse(localStorage.getItem(INTER_LISTENING_KEY) || '[]'); } catch { return []; }
}

export function markListeningComplete(id: number) {
  const d = getCompletedListeningLessons();
  if (!d.includes(id)) localStorage.setItem(INTER_LISTENING_KEY, JSON.stringify([...d, id]));
}
