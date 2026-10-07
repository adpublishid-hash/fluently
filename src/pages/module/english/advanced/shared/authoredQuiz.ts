/** [question, correct answer, three wrong options, explanation] */
export type AuthoredQuiz = [question: string, answer: string, wrong: [string, string, string], explanation: string];

export type QoaQuestion = { q: string; opts: string[]; ans: string; exp: string };

/** Turns authored tuples into quiz questions (options answer-first; callers shuffle them). */
export function fromAuthored(items: readonly AuthoredQuiz[] | undefined): QoaQuestion[] {
  return (items ?? []).map(([q, ans, wrong, exp]) => ({ q, opts: [ans, ...wrong], ans, exp }));
}
