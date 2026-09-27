// Spaced repetition (SM-2 variant) for vocabulary review.
import { getLevelWords, getStudyLevels, type StudyLanguage, type StudyWord } from './studyBank';

export type ReviewGrade = 'again' | 'hard' | 'good' | 'easy';

export type CardState = {
  ease: number;
  /** Days until the next review. */
  interval: number;
  reps: number;
  lapses: number;
  /** Day number (days since epoch, local time) when the card is due. */
  due: number;
};

export type SrsDeckState = {
  cards: Record<string, CardState>;
  /** New cards introduced per day, keyed by day number. */
  introduced: Record<string, number>;
};

export const NEW_CARDS_PER_DAY = 10;
const QUALITY: Record<ReviewGrade, number> = { again: 1, hard: 3, good: 4, easy: 5 };

export function dayNumber(date = new Date()): number {
  return Math.floor((date.getTime() - date.getTimezoneOffset() * 60_000) / 86_400_000);
}

export function scheduleCard(previous: CardState | undefined, grade: ReviewGrade, today: number): CardState {
  const card: CardState = previous ?? { ease: 2.5, interval: 0, reps: 0, lapses: 0, due: today };
  const quality = QUALITY[grade];
  const ease = Math.max(1.3, card.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  if (quality < 3) {
    // Forgotten: see it again today, then relearn from the start.
    return { ease, interval: 0, reps: 0, lapses: card.lapses + 1, due: today };
  }

  const reps = card.reps + 1;
  let interval: number;
  if (reps === 1) interval = grade === 'easy' ? 3 : 1;
  else if (reps === 2) interval = grade === 'hard' ? 2 : grade === 'easy' ? 6 : 3;
  else interval = Math.round(Math.max(1, card.interval) * ease * (grade === 'hard' ? 0.8 : grade === 'easy' ? 1.3 : 1));

  return { ease, interval: Math.max(1, interval), reps, lapses: card.lapses, due: today + Math.max(1, interval) };
}

/** Words available for review: every level up to and including the learner's level. */
export function getDeckWords(language: StudyLanguage, maxLevelIndex: number): StudyWord[] {
  return getStudyLevels(language)
    .slice(0, maxLevelIndex + 1)
    .flatMap((level) => getLevelWords(language, level.id));
}

export type ReviewQueue = { due: StudyWord[]; fresh: StudyWord[] };

export function buildReviewQueue(words: StudyWord[], state: SrsDeckState, today: number): ReviewQueue {
  const due = words
    .filter((word) => state.cards[word.id] && state.cards[word.id].due <= today)
    .sort((a, b) => state.cards[a.id].due - state.cards[b.id].due);
  const allowance = Math.max(0, NEW_CARDS_PER_DAY - (state.introduced[String(today)] ?? 0));
  const fresh = words.filter((word) => !state.cards[word.id]).slice(0, allowance);
  return { due, fresh };
}

export function applyReview(state: SrsDeckState, word: StudyWord, grade: ReviewGrade, today: number): SrsDeckState {
  const isNew = !state.cards[word.id];
  return {
    cards: { ...state.cards, [word.id]: scheduleCard(state.cards[word.id], grade, today) },
    introduced: isNew ? { ...state.introduced, [String(today)]: (state.introduced[String(today)] ?? 0) + 1 } : state.introduced,
  };
}

const storageKey = (language: StudyLanguage) => `fluently_srs_v1_${language}`;

export function loadDeckState(language: StudyLanguage): SrsDeckState {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey(language)) || '{}');
    return { cards: parsed.cards ?? {}, introduced: parsed.introduced ?? {} };
  } catch {
    return { cards: {}, introduced: {} };
  }
}

export function saveDeckState(language: StudyLanguage, state: SrsDeckState) {
  try {
    localStorage.setItem(storageKey(language), JSON.stringify(state));
  } catch {
    // Storage full or unavailable: progress for this session stays in memory.
  }
}
