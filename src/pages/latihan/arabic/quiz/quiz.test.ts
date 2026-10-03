import { describe, expect, it } from 'vitest';
import { QUESTIONS_PER_LEVEL } from './build';
import { arabicQuizBanks, getArabicTopicQuiz } from './index';
import type { ArabicQuizSkill } from './types';

const skills = Object.keys(arabicQuizBanks) as ArabicQuizSkill[];
const ARABIC = /[؀-ۿ]/;

describe('Arabic practice quiz banks', () => {
  it.each(skills)('%s: 20 topics, four authored items per level, no repeats', (skill) => {
    const bank = arabicQuizBanks[skill]!;
    expect(bank).toHaveLength(20);
    const seen = new Map<string, string>();
    bank.forEach((topic, topicIndex) => topic.forEach((items, level) => {
      const where = `${skill} ${topicIndex + 1} level ${level}`;
      expect(items, where).toHaveLength(4);
      items.forEach(([arabic, transliteration, meaning, authored]) => {
        expect(arabic, where).toMatch(ARABIC);
        expect(transliteration, `${where} ${arabic}`).toMatch(/^["'A-Za-z][A-Za-z ,.?!:;'"()-]*$/);
        expect(meaning.trim().length, where).toBeGreaterThan(0);
        expect(seen.get(arabic), `${where}: ${arabic} repeats`).toBeUndefined();
        seen.set(arabic, where);
        if (authored) {
          const [, answer, ...wrong] = authored;
          expect(wrong.length, where).toBeGreaterThanOrEqual(2);
          expect(new Set([answer, ...wrong]).size, where).toBe(wrong.length + 1);
        }
      });
    }));
  });

  it.each(skills)('%s: every topic quiz has 10 valid questions per level', (skill) => {
    const all: string[] = [];
    arabicQuizBanks[skill]!.forEach((_, index) => {
      const questions = getArabicTopicQuiz(skill, index + 1, `${skill}-${index + 1}`)!;
      (['Basic', 'Intermediate', 'Advanced'] as const).forEach((level) => {
        expect(questions.filter((question) => question.level === level), `${skill} ${index + 1} ${level}`).toHaveLength(QUESTIONS_PER_LEVEL);
      });
      questions.forEach((question) => {
        expect(question.options).toContain(question.answer);
        expect(new Set(question.options).size).toBe(question.options.length);
        expect(question.options.length).toBeGreaterThanOrEqual(3);
        all.push(question.prompt);
      });
    });
    expect(new Set(all).size).toBe(all.length);
  });
});
