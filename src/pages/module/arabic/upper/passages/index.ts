import type { ArabicUpperLevel } from '../arabicUpperThemes';
import { advancedPassages } from './advanced';
import { advancedExtensions } from './extensions/advanced';
import { intermediateExtensions } from './extensions/intermediate';
import { masteryExtensions } from './extensions/mastery';
import { proficiencyExtensions } from './extensions/proficiency';
import { scholarExtensions } from './extensions/scholar';
import type { PassageExtension } from './extensions/types';
import { upperIntermediateExtensions } from './extensions/upperIntermediate';
import { intermediatePassages } from './intermediate';
import { masteryPassages } from './mastery';
import { proficiencyPassages } from './proficiency';
import { scholarPassages } from './scholar';
import type { PassageTuple } from './types';
import { upperIntermediatePassages } from './upperIntermediate';

export type ArabicPassageSentence = { arabic: string; transliteration: string; meaning: string };
export type ArabicPassageQuestion = { question: string; answer: string; distractors: string[] };
export type ArabicPassage = { sentences: ArabicPassageSentence[]; questions: ArabicPassageQuestion[] };

/** Appends each extension's sentences and question to the passage at the same index. */
function extend(base: PassageTuple[], extensions: PassageExtension[]): PassageTuple[] {
  return base.map(([sentences, questions], index) => {
    const extension = extensions[index];
    if (!extension) return [sentences, questions];
    const [extraSentences, extraQuestion] = extension;
    return [[...sentences, ...extraSentences], [...questions, extraQuestion]];
  });
}

export const arabicUpperPassages: Record<ArabicUpperLevel, PassageTuple[]> = {
  intermediate: extend(intermediatePassages, intermediateExtensions),
  'upper-intermediate': extend(upperIntermediatePassages, upperIntermediateExtensions),
  advanced: extend(advancedPassages, advancedExtensions),
  proficiency: extend(proficiencyPassages, proficiencyExtensions),
  mastery: extend(masteryPassages, masteryExtensions),
  scholar: extend(scholarPassages, scholarExtensions),
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
