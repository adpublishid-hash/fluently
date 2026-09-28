/** [text, reading (pinyin / transliteration, may be empty), meaning]. */
export type PassageLine = [text: string, reading: string, meaning: string];
/** [question, answer, distractors]. */
export type PassageQuestionTuple = [question: string, answer: string, distractors: string[]];

export type PassageSource = {
  id: string;
  /** Study-bank level id (see features/learning/studyLanguages). */
  level: string;
  /** Indonesian title. */
  title: string;
  /** Title in the target language. */
  native: string;
  sentences: PassageLine[];
  glossary?: PassageLine[];
  questions: PassageQuestionTuple[];
};
