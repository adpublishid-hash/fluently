import { describe, expect, it } from 'vitest';
import { QUESTIONS_PER_LEVEL } from './build';
import { getMandarinTopicQuiz, mandarinQuizBanks } from './index';
import type { MandarinQuizSkill } from './types';

const skills = Object.keys(mandarinQuizBanks) as MandarinQuizSkill[];
const HANZI = /[一-鿿]/;
const PINYIN = /^[“A-Za-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüĀÁǍÀĒÉĚÈŌÓǑÒ][A-Za-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüĀÁǍÀĒÉĚÈŌÓǑÒ0-9 ,.?!:;'"“”()-]*$/;

describe('Mandarin practice quiz banks', () => {
  it('covers every practice skill', () => {
    expect(skills.sort()).toEqual(['cihui', 'kouyu', 'pinyin', 'tingli', 'xiezuo', 'yuedu', 'yufa']);
  });

  it.each(skills)('%s: 20 topics, four authored items per level, no repeats', (skill) => {
    const bank = mandarinQuizBanks[skill]!;
    expect(bank).toHaveLength(20);
    const seen = new Map<string, string>();
    bank.forEach((topic, topicIndex) => topic.forEach((items, level) => {
      const where = `${skill} ${topicIndex + 1} level ${level}`;
      expect(items, where).toHaveLength(4);
      items.forEach(([hanzi, pinyin, meaning, authored]) => {
        expect(hanzi, where).toMatch(HANZI);
        expect(pinyin, `${where} ${hanzi}`).toMatch(PINYIN);
        expect(meaning.trim().length, where).toBeGreaterThan(0);
        expect(seen.get(hanzi), `${where}: ${hanzi} repeats`).toBeUndefined();
        seen.set(hanzi, where);
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
    mandarinQuizBanks[skill]!.forEach((_, index) => {
      const questions = getMandarinTopicQuiz(skill, index + 1, `${skill}-${index + 1}`)!;
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
