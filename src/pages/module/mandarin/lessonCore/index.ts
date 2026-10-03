import type { MandarinLevelId, MandarinSkillId } from '../mandarinModuleData';
import type { CorePool } from './practice';
import type { LessonCoreTuple } from './types';
import { advancedCore } from './advanced';
import { beginnerCore } from './beginner';
import { elementaryCore } from './elementary';
import { hsk7Core } from './hsk7';
import { hsk8Core } from './hsk8';
import { hsk9Core } from './hsk9';
import { intermediateCore } from './intermediate';
import { proficiencyCore } from './proficiency';
import { upperIntermediateCore } from './upperIntermediate';

export type MandarinLessonCore = {
  title: string | null;
  points: string[];
  phrases: Array<{ hanzi: string; pinyin: string; meaning: string }>;
};

// Authored per-skill lesson material, one entry per lesson (index = lesson - 1).
export const mandarinLessonCore: Partial<Record<MandarinLevelId, Partial<Record<MandarinSkillId, LessonCoreTuple[]>>>> = {
  beginner: beginnerCore,
  elementary: elementaryCore,
  intermediate: intermediateCore,
  'upper-intermediate': upperIntermediateCore,
  advanced: advancedCore,
  proficiency: proficiencyCore,
  'hsk-7': hsk7Core,
  'hsk-8': hsk8Core,
  'hsk-9': hsk9Core,
};

export function getMandarinLessonCore(level: MandarinLevelId, skillId: MandarinSkillId, lesson: number): MandarinLessonCore | null {
  const tuple = mandarinLessonCore[level]?.[skillId]?.[lesson - 1];
  if (!tuple) return null;
  const [title, points, phrases] = tuple;
  return { title, points, phrases: phrases.map(([hanzi, pinyin, meaning]) => ({ hanzi, pinyin, meaning })) };
}

const poolCache = new Map<MandarinLevelId, CorePool>();

/** Level-wide distractor pool built from every authored phrase of that level. */
export function getMandarinLessonCorePool(level: MandarinLevelId): CorePool {
  if (!poolCache.has(level)) {
    const phrases = Object.values(mandarinLessonCore[level] ?? {}).flatMap((lessons) => (lessons ?? []).flatMap(([, , items]) => items));
    poolCache.set(level, { meanings: phrases.map(([, , meaning]) => meaning), hanzi: phrases.map(([hanzi]) => hanzi) });
  }
  return poolCache.get(level)!;
}
