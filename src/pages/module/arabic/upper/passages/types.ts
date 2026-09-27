export type SentenceTuple = [arabic: string, transliteration: string, meaning: string];
export type QuestionTuple = [question: string, answer: string, distractors: string[]];
/** A short reading/listening passage and comprehension questions for one theme. */
export type PassageTuple = [sentences: SentenceTuple[], questions: QuestionTuple[]];
