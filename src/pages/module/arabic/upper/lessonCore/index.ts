import type { ArabicSkillId } from '../../arabicModuleData';
import type { ArabicUpperLevel } from '../arabicUpperThemes';
import type { CorePool } from './practice';
import type { LessonCoreTuple } from './types';
import { advancedCore } from './advanced';
import { intermediateCore } from './intermediate';
import { upperIntermediateCore } from './upperIntermediate';

export type ArabicLessonCore = {
  points: string[];
  phrases: Array<{ arabic: string; transliteration: string; meaning: string }>;
};

// Authored per-skill lesson material, one entry per lesson (index = lesson - 1).
export const arabicLessonCore: Partial<Record<ArabicUpperLevel, Partial<Record<ArabicSkillId, LessonCoreTuple[]>>>> = {
  intermediate: intermediateCore,
  'upper-intermediate': upperIntermediateCore,
  advanced: advancedCore,
};

export function getArabicLessonCore(level: ArabicUpperLevel, skillId: ArabicSkillId, lesson: number): ArabicLessonCore | null {
  const tuple = arabicLessonCore[level]?.[skillId]?.[lesson - 1];
  if (!tuple) return null;
  const [points, phrases] = tuple;
  return { points, phrases: phrases.map(([arabic, transliteration, meaning]) => ({ arabic, transliteration, meaning })) };
}

const poolCache = new Map<ArabicUpperLevel, CorePool>();

/** Level-wide distractor pool built from every authored phrase of that level. */
export function getArabicLessonCorePool(level: ArabicUpperLevel): CorePool {
  if (!poolCache.has(level)) {
    const phrases = Object.values(arabicLessonCore[level] ?? {}).flatMap((lessons) => (lessons ?? []).flatMap(([, items]) => items));
    poolCache.set(level, {
      meanings: phrases.map(([, , meaning]) => meaning),
      arabic: phrases.map(([arabic]) => arabic),
      transliterations: phrases.map(([, transliteration]) => transliteration),
    });
  }
  return poolCache.get(level)!;
}
