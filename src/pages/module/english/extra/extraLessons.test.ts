import { describe, expect, it } from 'vitest';
import { allExtraEnglishLessons, getExtraEnglishLessons } from '.';

const lessonFiles = Object.keys(import.meta.glob('../*/*/Lesson*.tsx'));
const skills = ['grammar', 'listening', 'pronunciation', 'reading', 'speaking', 'vocabulary', 'writing'];

describe('English extra lessons', () => {
  it.each(['beginner', 'elementary'])('%s: every skill has lessons 1-20 without overlap', (level) => {
    skills.forEach((skill) => {
      const fileIds = lessonFiles
        .map((path) => path.match(new RegExp(`^\\.\\./${level}/${skill}/Lesson(\\d+)\\.tsx$`))?.[1])
        .filter(Boolean)
        .map(Number);
      const extraIds = getExtraEnglishLessons(level, skill).map((lesson) => lesson.id);
      extraIds.forEach((id) => expect(fileIds, `${level}/${skill} lesson ${id} duplicated`).not.toContain(id));
      expect([...fileIds, ...extraIds].sort((a, b) => a - b), `${level}/${skill}`).toEqual(Array.from({ length: 20 }, (_, index) => index + 1));
    });
  });

  it('lessons are well-formed', () => {
    allExtraEnglishLessons().forEach(({ level, skill, lesson }) => {
      const label = `${level}/${skill}/${lesson.id}`;
      expect(lesson.examples.length, label).toBeGreaterThanOrEqual(4);
      expect(lesson.practice.length, label).toBeGreaterThanOrEqual(4);
      if (skill === 'listening' || skill === 'reading') expect(lesson.dialogue?.length ?? 0, label).toBeGreaterThanOrEqual(5);
      lesson.practice.forEach(([question, answer, distractors]) => {
        expect(distractors.length, `${label}: ${question}`).toBeGreaterThanOrEqual(3);
        expect(distractors, `${label}: ${question}`).not.toContain(answer);
        expect(new Set(distractors).size).toBe(distractors.length);
      });
    });
  });
});
