import { describe, expect, it } from 'vitest';
import { japaneseLessonCounts, type JapaneseLevelId, type JapaneseSkillId } from '../../../module/japanese/japaneseModuleData';
import { japaneseLessonCore } from '../../../module/japanese/lessonCore';
import { QUESTIONS_PER_LEVEL } from './build';
import { getJapaneseTopicQuiz, japaneseQuizBanks } from './index';

const levels = Object.keys(japaneseQuizBanks) as JapaneseLevelId[];
const JAPANESE = /[぀-ヿ一-鿿]/;

describe('Japanese practice quiz banks', () => {
  it('every registered level covers all seven skills', () => {
    levels.forEach((level) => {
      expect(Object.keys(japaneseQuizBanks[level] ?? {}).sort(), level).toEqual(Object.keys(japaneseLessonCounts[level]).sort());
    });
  });

  it.each(levels)('%s: every skill has 20 topics of four Basic and four Advanced items, none repeated in the level', (level) => {
    const seen = new Map<string, string>();
    Object.values(japaneseLessonCore[level] ?? {}).forEach((lessons) => (lessons ?? []).forEach(([, , phrases]) => phrases.forEach(([japanese]) => seen.set(japanese, 'lesson'))));
    (Object.keys(japaneseQuizBanks[level] ?? {}) as JapaneseSkillId[]).forEach((skill) => {
      const bank = japaneseQuizBanks[level]?.[skill];
      expect(bank, `${level} ${skill}`).toHaveLength(japaneseLessonCounts[level][skill]);
      bank!.forEach((tiers, topicIndex) => tiers.forEach((items, tier) => {
        const where = `${level} ${skill} ${topicIndex + 1} tier ${tier}`;
        expect(items, where).toHaveLength(4);
        items.forEach(([japanese, romaji, meaning, authored]) => {
          expect(japanese, where).toMatch(JAPANESE);
          expect(romaji, `${where} ${japanese}`).toMatch(/^["A-Za-z0-9][A-Za-z0-9 ,.?!:;"()/~-]*$/);
          expect(meaning.trim().length, where).toBeGreaterThan(0);
          expect(seen.get(japanese), `${where}: ${japanese} repeats (${seen.get(japanese)})`).toBeUndefined();
          seen.set(japanese, where);
          if (tier === 1) expect(japanese, `${where}: Advanced items are full sentences`).toMatch(/[。？！]$/);
          if (authored) {
            const [, answer, ...wrong] = authored;
            expect(wrong.length, where).toBeGreaterThanOrEqual(2);
            expect(new Set([answer, ...wrong]).size, where).toBe(wrong.length + 1);
          }
        });
      }));
    });
  });

  it.each(levels)('%s: every topic quiz has 10 valid questions per level', (level) => {
    (Object.keys(japaneseQuizBanks[level] ?? {}) as JapaneseSkillId[]).forEach((skill) => {
      const prompts: string[] = [];
      for (let topic = 1; topic <= japaneseLessonCounts[level][skill]; topic += 1) {
        const questions = getJapaneseTopicQuiz(level, skill, topic, `${level}-${skill}-${topic}`)!;
        (['Basic', 'Intermediate', 'Advanced'] as const).forEach((tier) => {
          expect(questions.filter((question) => question.level === tier), `${level} ${skill} ${topic} ${tier}`).toHaveLength(QUESTIONS_PER_LEVEL);
        });
        questions.forEach((question) => {
          expect(question.options).toContain(question.answer);
          expect(new Set(question.options).size).toBe(question.options.length);
          expect(question.options.length).toBeGreaterThanOrEqual(3);
          prompts.push(question.prompt);
        });
      }
      expect(new Set(prompts).size, `${level} ${skill}: repeated prompts`).toBe(prompts.length);
    });
  });
});
