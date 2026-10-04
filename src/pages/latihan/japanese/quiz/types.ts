/** A hand-written multiple-choice question: prompt, correct answer, then at least two wrong options. */
export type AuthoredChoice = [prompt: string, answer: string, ...wrong: string[]];

/** One practice item: Japanese, romaji, Indonesian meaning, and an optional extra question. */
export type QuizItem = [japanese: string, romaji: string, meaning: string, authored?: AuthoredChoice];

/**
 * Practice-only items of one topic: Basic (key words and short phrases) and Advanced (longer sentences).
 * The Intermediate level reuses the lesson's own four authored phrases.
 */
export type JapaneseQuizTopic = [basic: QuizItem[], advanced: QuizItem[]];
