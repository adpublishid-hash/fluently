import type { ArabicUpperLevel } from '../arabicUpperThemes';
import { advancedPassages } from './advanced';
import { intermediatePassages } from './intermediate';
import { masteryPassages } from './mastery';
import { proficiencyPassages } from './proficiency';
import { scholarPassages } from './scholar';
import type { PassageTuple } from './types';
import { upperIntermediatePassages } from './upperIntermediate';

export type ArabicPassageSentence = { arabic: string; transliteration: string; meaning: string };
export type ArabicPassageQuestion = { question: string; answer: string; distractors: string[] };
export type ArabicPassage = { sentences: ArabicPassageSentence[]; questions: ArabicPassageQuestion[] };

export const arabicUpperPassages: Record<ArabicUpperLevel, PassageTuple[]> = {
  intermediate: intermediatePassages,
  'upper-intermediate': upperIntermediatePassages,
  advanced: advancedPassages,
  proficiency: proficiencyPassages,
  mastery: masteryPassages,
  scholar: scholarPassages,
};

/** Reading/listening passage for a B1+ theme lesson (1-based lesson number). */
export function getArabicUpperPassage(level: ArabicUpperLevel, lesson: number): ArabicPassage | null {
  const tuple = arabicUpperPassages[level]?.[lesson - 1];
  if (!tuple) return null;
  const [sentences, questions] = tuple;
  return {
    sentences: sentences.map(([arabic, transliteration, meaning]) => ({ arabic, transliteration, meaning })),
    questions: questions.map(([question, answer, distractors]) => ({ question, answer, distractors })),
  };
}
