import { hashSeed, shuffleOpts } from '../../../../../utils/quiz';

/** [question, correct answer, three wrong options, explanation] */
export type AuthoredQuiz = [question: string, answer: string, wrong: [string, string, string], explanation: string];

export type QoaQuestion = { q: string; opts: string[]; ans: string; exp: string };

/** Turns authored tuples into quiz questions (options answer-first; callers shuffle them). */
export function fromAuthored(items: readonly AuthoredQuiz[] | undefined): QoaQuestion[] {
  return (items ?? []).map(([q, ans, wrong, exp]) => ({ q, opts: [ans, ...wrong], ans, exp }));
}

/** Authored tuples as quiz questions with options shuffled per lesson (seeded, so stable between visits). */
export function shuffledAuthored(items: readonly AuthoredQuiz[] | undefined, seedKey: string): QoaQuestion[] {
  return shuffleOpts(fromAuthored(items), hashSeed(seedKey));
}

/** The same questions in the { id, question, options, answer, explanation } shape some lesson pages use. */
export function asNumberedQuestions(items: QoaQuestion[]) {
  return items.map(({ q, opts, ans, exp }, index) => ({ id: index + 1, question: q, options: opts, answer: ans, explanation: exp }));
}
