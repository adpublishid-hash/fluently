import { describe, expect, it } from 'vitest';
import { getGeneratedArabicLesson } from '../beginner/generatedBeginnerArabicContent';
import { arabicUpperThemes, type ArabicUpperLevel } from './arabicUpperThemes';
import { arabicThemeSentences } from './themeSentences';

const strip = (text: string) => text.replace(/[ً-ْٰـ]/g, '').replace(/[أإآ]/g, 'ا');
const levels = Object.keys(arabicThemeSentences) as ArabicUpperLevel[];

describe('Arabic theme sentences', () => {
  it.each(levels)('%s: three sentences per theme, sentence k uses theme word k', (level) => {
    expect(arabicThemeSentences[level]).toHaveLength(arabicUpperThemes[level].length);
    arabicThemeSentences[level].forEach((group, theme) => {
      expect(group).toHaveLength(3);
      group.forEach(([arabic, transliteration, meaning], index) => {
        expect(transliteration.trim()).not.toBe('');
        expect(meaning.trim()).not.toBe('');
        const word = strip(arabicUpperThemes[level][theme].vocabulary[index].arabic).split(' ')[0]
          .replace(/^ال/, '').replace(/[ةى]$/, '').replace(/ات$/, '');
        expect(strip(arabic), `${level} #${theme + 1}`).toContain(word.slice(0, Math.max(3, word.length - 1)));
      });
    });
  });

  it('lessons start with their own theme sentences and lesson-specific questions', () => {
    const first = getGeneratedArabicLesson('qiraah', 1, 'intermediate');
    const second = getGeneratedArabicLesson('qiraah', 2, 'intermediate');
    expect(first.examples[0].arabic).toBe(arabicThemeSentences.intermediate[0][0][0]);
    expect(second.examples[0].arabic).toBe(arabicThemeSentences.intermediate[1][0][0]);
    expect(first.practice.map((item) => item.question)).not.toEqual(second.practice.map((item) => item.question));
    first.practice.forEach((item) => expect(item.options).toContain(item.answer));
  });
});
