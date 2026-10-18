import type { QuestionTuple, SentenceTuple } from '../types';

/** Extra sentences and one more comprehension question that lengthen a passage to six sentences. */
export type PassageExtension = [sentences: SentenceTuple[], question: QuestionTuple];
