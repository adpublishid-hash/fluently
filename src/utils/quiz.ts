// Helpers for generated multiple-choice questions. Shuffling is seeded so a
// lesson always renders the same order (stable between renders and devices)
// while the correct answer still lands in a different slot per question.

export type ChoiceQuestion = { question: string; options: string[]; answer: string };

export function hashSeed(...parts: Array<string | number>): number {
  let hash = 2166136261;
  for (const char of parts.join('|')) {
    hash ^= char.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededShuffle<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
}

/**
 * Builds a question with `optionCount` unique options (answer included) drawn
 * from `pool`. Returns null when the pool has too few distinct distractors.
 */
export function buildChoiceQuestion(
  question: string,
  answer: string,
  pool: readonly string[],
  random: () => number,
  optionCount = 4,
): ChoiceQuestion | null {
  const distractors = seededShuffle(
    [...new Set(pool.filter((item) => item && item !== answer))],
    random,
  ).slice(0, optionCount - 1);
  if (distractors.length < Math.min(2, optionCount - 1)) return null;
  return { question, answer, options: seededShuffle([answer, ...distractors], random) };
}

/** Shuffles each question's options (seeded) without changing the questions. */
export function shuffleQuestionOptions<T extends ChoiceQuestion>(questions: readonly T[], seed: number): T[] {
  const random = seededRandom(seed);
  return questions.map((item) => ({ ...item, options: seededShuffle(item.options, random) }));
}
