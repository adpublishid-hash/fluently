import { describe, expect, it } from 'vitest';
import { arabicSkills } from '../arabicModuleData';
import { foundationTopics, getFoundationLesson } from './arabicFoundationLessons';
import type { FoundationLevel } from './arabicFoundationVocabulary';

const LEVELS: FoundationLevel[] = ['beginner', 'elementary'];

function lessonsOf(level: FoundationLevel) {
  return arabicSkills.flatMap(({ id }) =>
    foundationTopics[level][id].map((_, index) => getFoundationLesson(id, index + 1, level)),
  );
}

describe.each(LEVELS)('Arabic %s practice', (level) => {
  const lessons = lessonsOf(level);

  it('gives every lesson enough answerable questions', () => {
    lessons.forEach((lesson) => {
      expect(lesson.practice.length, lesson.title).toBeGreaterThanOrEqual(6);
      lesson.practice.forEach((item) => {
        expect(item.options, item.question).toContain(item.answer);
        expect(new Set(item.options).size, item.question).toBe(item.options.length);
      });
    });
  });

  it('never repeats a question inside one lesson', () => {
    lessons.forEach((lesson) => {
      const questions = lesson.practice.map((item) => item.question);
      expect(new Set(questions).size, lesson.title).toBe(questions.length);
    });
  });

  it('does not ask the same question in two different skills', () => {
    const skillOf = new Map<string, string>();
    lessons.forEach((lesson) => {
      lesson.practice.forEach((item) => {
        const key = `${item.question}→${item.answer}`;
        const previous = skillOf.get(key);
        if (previous) expect(previous, key).toBe(lesson.skillId);
        else skillOf.set(key, lesson.skillId);
      });
    });
  });

  it('keeps more than 90% of questions unique across the level', () => {
    const all = lessons.flatMap((lesson) => lesson.practice.map((item) => `${item.question}→${item.answer}`));
    expect(new Set(all).size / all.length).toBeGreaterThan(0.9);
  });
});
