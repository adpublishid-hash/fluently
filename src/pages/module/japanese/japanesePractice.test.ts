import { describe, expect, it } from 'vitest';
import { getJapaneseLesson } from './japaneseLessonContent';
import { japaneseLessonCounts, type JapaneseLevelId, type JapaneseSkillId } from './japaneseModuleData';

const levels = Object.keys(japaneseLessonCounts) as JapaneseLevelId[];

describe('Japanese lesson practice', () => {
  it.each(levels)('%s: skill-specific questions keep most of the level unique', (level) => {
    const all: string[] = [];
    (Object.keys(japaneseLessonCounts[level]) as JapaneseSkillId[]).forEach((skill) => {
      for (let lesson = 1; lesson <= japaneseLessonCounts[level][skill]; lesson += 1) {
        getJapaneseLesson(skill, lesson, level).practice.forEach((item) => {
          expect(item.options).toContain(item.answer);
          expect(new Set(item.options).size).toBe(item.options.length);
          all.push(item.question);
        });
      }
    });
    expect(new Set(all).size / all.length).toBeGreaterThan(0.45);
  });

  it('grammar and pronunciation lessons ask their own kinds of questions', () => {
    expect(getJapaneseLesson('grammar', 3, 'beginner').practice.some((item) => item.question.startsWith('Partikel yang tepat'))).toBe(true);
    expect(getJapaneseLesson('pronunciation', 5, 'elementary').practice.some((item) => item.question.startsWith('Romaji yang tepat'))).toBe(true);
  });
});
