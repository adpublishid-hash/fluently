import { describe, expect, it } from 'vitest';
import { getPassage, getPassages, passageLanguages, passageLevelLabels } from './index';

describe('passage bank', () => {
  it.each(passageLanguages)('%s: every listed level has passages', (language) => {
    passageLevelLabels[language].forEach(([level]) => {
      expect(getPassages(language, level).length, `${language}/${level}`).toBeGreaterThanOrEqual(8);
    });
  });

  it.each(passageLanguages)('%s: passages are well-formed', (language) => {
    const ids = new Set<string>();
    getPassages(language).forEach((passage) => {
      expect(ids.has(passage.id)).toBe(false);
      ids.add(passage.id);
      expect(getPassage(language, passage.id)).toBe(passage);
      expect(passage.sentences.length).toBeGreaterThanOrEqual(language === 'arabic' ? 4 : 5);
      expect(passage.questions.length).toBeGreaterThanOrEqual(2);
      passage.sentences.forEach((sentence) => expect(sentence.meaning.trim()).not.toBe(''));
      passage.questions.forEach((question) => {
        expect(question.distractors.length).toBeGreaterThanOrEqual(3);
        expect(question.distractors).not.toContain(question.answer);
      });
    });
  });

  it('Mandarin passages carry tone-marked pinyin', () => {
    getPassages('mandarin').forEach((passage) => {
      [...passage.sentences, ...passage.glossary].forEach((line) => {
        expect(line.reading, line.text).toMatch(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/);
      });
    });
  });

  it('Japanese glossary readings are kana', () => {
    getPassages('japanese').forEach((passage) => {
      expect(passage.glossary.length).toBeGreaterThanOrEqual(3);
      passage.glossary.forEach((word) => expect(word.reading, word.text).toMatch(/^[぀-ヿー]+$/));
    });
  });
});
