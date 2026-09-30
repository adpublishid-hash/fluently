import type { MandarinLevelId, MandarinSkillId } from '../mandarinModuleData';
import type { CorePool } from './practice';
import type { LessonCoreTuple } from './types';
import { beginnerCore } from './beginner';
import { elementaryCore } from './elementary';

export type MandarinLessonCore = {
  title: string | null;
  points: string[];
  phrases: Array<{ hanzi: string; pinyin: string; meaning: string }>;
};

// Authored per-skill lesson material, one entry per lesson (index = lesson - 1).
export const mandarinLessonCore: Partial<Record<MandarinLevelId, Partial<Record<MandarinSkillId, LessonCoreTuple[]>>>> = {
  beginner: beginnerCore,
  elementary: elementaryCore,
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
