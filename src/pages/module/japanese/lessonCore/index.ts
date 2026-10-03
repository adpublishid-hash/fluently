import type { JapaneseLevelId, JapaneseSkillId } from '../japaneseModuleData';
import type { CorePool } from './practice';
import type { LessonCoreTuple } from './types';
import { advancedCore } from './advanced';
import { beginnerCore } from './beginner';
import { elementaryCore } from './elementary';
import { intermediateCore } from './intermediate';

export type JapaneseLessonCore = {
  title: string | null;
  points: string[];
  phrases: Array<{ japanese: string; romaji: string; meaning: string }>;
};

// Authored per-skill lesson material, one entry per lesson (index = lesson - 1).
export const japaneseLessonCore: Partial<Record<JapaneseLevelId, Partial<Record<JapaneseSkillId, LessonCoreTuple[]>>>> = {
  beginner: beginnerCore,
  elementary: elementaryCore,
  intermediate: intermediateCore,
  advanced: advancedCore,
};

export function getJapaneseLessonCore(level: JapaneseLevelId, skillId: JapaneseSkillId, lesson: number): JapaneseLessonCore | null {
  const tuple = japaneseLessonCore[level]?.[skillId]?.[lesson - 1];
  if (!tuple) return null;
  const [title, points, phrases] = tuple;
  return { title, points, phrases: phrases.map(([japanese, romaji, meaning]) => ({ japanese, romaji, meaning })) };
}

const poolCache = new Map<JapaneseLevelId, CorePool>();

/** Level-wide distractor pool built from every authored phrase of that level. */
export function getJapaneseLessonCorePool(level: JapaneseLevelId): CorePool {
  if (!poolCache.has(level)) {
    const phrases = Object.values(japaneseLessonCore[level] ?? {}).flatMap((lessons) => (lessons ?? []).flatMap(([, , items]) => items));
    poolCache.set(level, { meanings: phrases.map(([, , meaning]) => meaning), japanese: phrases.map(([japanese]) => japanese) });
  }
  return poolCache.get(level)!;
}
