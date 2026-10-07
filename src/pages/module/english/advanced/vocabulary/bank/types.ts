/**
 * One topical word: [word, part of speech, meaning (English), example sentence
 * that contains the word exactly as written, three natural collocations].
 */
export type VocabEntry = [word: string, type: string, meaning: string, example: string, collocations: [string, string, string]];

/** Twelve topical words for one lesson, keyed by lesson id. */
export type VocabLessonBank = Record<number, VocabEntry[]>;
