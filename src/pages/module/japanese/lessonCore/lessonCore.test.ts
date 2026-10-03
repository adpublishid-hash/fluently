import { describe, expect, it } from 'vitest';
import { getJapaneseLesson } from '../japaneseLessonContent';
import { japaneseLessonCounts, type JapaneseLevelId, type JapaneseSkillId } from '../japaneseModuleData';
import { japaneseLessonCore } from './index';
import type { CorePhrase } from './types';

const levels = Object.keys(japaneseLessonCore) as JapaneseLevelId[];
const JAPANESE = /[぀-ヿ一-鿿]/;

describe('Japanese lesson core', () => {
  it.each(levels)('%s: every skill lesson has its own authored material', (level) => {
    const seen = new Map<string, string>();
    (Object.keys(japaneseLessonCounts[level]) as JapaneseSkillId[]).forEach((skill) => {
      const lessons = japaneseLessonCore[level]?.[skill] ?? [];
      expect(lessons, `${level} ${skill}`).toHaveLength(japaneseLessonCounts[level][skill]);
      lessons.forEach(([title, points, phrases], index) => {
        const where = `${level} ${skill} ${index + 1}`;
        if (title !== null) expect(title.length, where).toBeGreaterThan(3);
        points.forEach((point) => expect(point.length, where).toBeGreaterThan(10));
        expect(phrases, where).toHaveLength(4);
        phrases.forEach(([japanese, romaji, meaning]) => {
          expect(japanese, where).toMatch(JAPANESE);
          expect(romaji, `${where} ${japanese}`).toMatch(/^["A-Za-z0-9][A-Za-z0-9 ,.?!:;"()/~-]*$/);
          expect(meaning.trim().length, where).toBeGreaterThan(0);
          expect(seen.get(japanese), `${where}: ${japanese} repeats`).toBeUndefined();
          seen.set(japanese, where);
        });
      });
    });
  });

  it.each(levels)('%s: core questions lead every lesson quiz', (level) => {
    (Object.keys(japaneseLessonCounts[level]) as JapaneseSkillId[]).forEach((skill) => {
      const lesson = getJapaneseLesson(skill, 1, level);
      const phrases: CorePhrase[] = japaneseLessonCore[level]?.[skill]?.[0]?.[2] ?? [];
      expect(lesson.examples[0].japanese).toBe(phrases[0][0]);
      const fromCore = lesson.practice.filter((item) => phrases.some((phrase) => phrase.some((text) => item.question.includes(text) || item.answer === text)));
      expect(fromCore.length, `${level} ${skill}`).toBeGreaterThanOrEqual(7);
    });
  });
});
