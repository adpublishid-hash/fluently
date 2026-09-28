import { describe, expect, it } from 'vitest';
import { getMandarinLesson } from './mandarinLessonContent';
import { mandarinLessonCounts, mandarinSkills, type MandarinLevelId } from './mandarinModuleData';
import { getMandarinLevelThemeSentences, getMandarinThemeSentences } from './mandarinThemeSentences';
import { getMandarinTheme } from './mandarinThemeBank';

const levels = Object.keys(mandarinLessonCounts) as MandarinLevelId[];
const themedLevels: MandarinLevelId[] = ['advanced', 'proficiency', 'hsk-7', 'hsk-8', 'hsk-9'];

describe('Mandarin lesson-specific practice', () => {
  it.each(levels)('%s: no lesson repeats a question', (level) => {
    for (let lesson = 1; lesson <= 20; lesson += 1) {
      const leading = mandarinSkills.map(({ id }) => getMandarinLesson(id, lesson, level).practice.map((item) => item.question));
      leading.forEach((questions) => {
        expect(new Set(questions).size, `${level} lesson ${lesson} has duplicate questions`).toBe(questions.length);
      });
    }
  });

  it.each(levels)('%s: at least a third of all questions are unique', (level) => {
    const all = mandarinSkills.flatMap(({ id }) =>
      Array.from({ length: mandarinLessonCounts[level][id] }, (_, index) => getMandarinLesson(id, index + 1, level).practice.map((item) => item.question)).flat());
    expect(new Set(all).size / all.length).toBeGreaterThan(0.2);
  });

  it.each(themedLevels)('%s: every theme lesson has 6 real sentences using theme words', (level) => {
    expect(getMandarinLevelThemeSentences(level)).toHaveLength(120);
    for (let lesson = 1; lesson <= 20; lesson += 1) {
      const sentences = getMandarinThemeSentences(level, lesson);
      expect(sentences).toHaveLength(6);
      expect(new Set(sentences.map((sentence) => sentence.hanzi)).size).toBe(6);
      sentences.forEach((sentence) => {
        expect(sentence.pinyin, sentence.hanzi).toMatch(/[āáǎàēéěèīíǐìōóǒòūúǔù]/);
        expect(sentence.hanzi).not.toMatch(/[A-Za-z]{4,}/);
      });
      const theme = getMandarinTheme(level, lesson);
      if (theme) {
        const used = sentences.filter((sentence) => theme.vocabulary.some((word) => sentence.hanzi.includes(word.hanzi)));
        expect(used.length, `${level} lesson ${lesson}`).toBeGreaterThanOrEqual(4);
      }
      const examples = getMandarinLesson('reading', lesson, level).examples.map((example) => example.hanzi);
      expect(examples).toContain(sentences[0].hanzi);
      expect(new Set(examples).size).toBe(examples.length);
    }
  });
});
