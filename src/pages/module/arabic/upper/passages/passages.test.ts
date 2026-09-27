import { describe, expect, it } from 'vitest';
import { arabicUpperThemes, type ArabicUpperLevel } from '../arabicUpperThemes';
import { getGeneratedArabicLesson } from '../../beginner/generatedBeginnerArabicContent';
import { arabicUpperPassages, getArabicUpperPassage } from './index';

const levels = Object.keys(arabicUpperThemes) as ArabicUpperLevel[];
const HARAKAT = /[ً-ْ]/;

describe('Arabic upper-level passages', () => {
  it.each(levels)('%s has one passage per theme', (level) => {
    expect(arabicUpperPassages[level]).toHaveLength(arabicUpperThemes[level].length);
  });

  it.each(levels)('%s passages are well-formed and unique', (level) => {
    const seen = new Set<string>();
    arabicUpperPassages[level].forEach((_, index) => {
      const passage = getArabicUpperPassage(level, index + 1)!;
      expect(passage.sentences.length).toBeGreaterThanOrEqual(4);
      passage.sentences.forEach((sentence) => {
        expect(HARAKAT.test(sentence.arabic), sentence.arabic).toBe(true);
        expect(sentence.transliteration.trim()).not.toBe('');
        expect(sentence.meaning.trim()).not.toBe('');
        expect(seen.has(sentence.arabic), `duplicate sentence ${sentence.arabic}`).toBe(false);
        seen.add(sentence.arabic);
      });
      expect(passage.questions.length).toBeGreaterThanOrEqual(2);
      passage.questions.forEach((question) => {
        expect(question.distractors.length).toBeGreaterThanOrEqual(3);
        expect(question.distractors).not.toContain(question.answer);
        expect(new Set(question.distractors).size).toBe(question.distractors.length);
      });
    });
  });

  it('adds the passage and comprehension questions to reading lessons', () => {
    const lesson = getGeneratedArabicLesson('qiraah', 3, 'advanced');
    expect(lesson.passage?.title).toBe(arabicUpperThemes.advanced[2].title);
    expect(lesson.passage?.listenFirst).toBe(false);
    expect(lesson.practice.filter((item) => item.question.startsWith('Bacaan:'))).toHaveLength(2);
    expect(getGeneratedArabicLesson('istima', 3, 'advanced').passage?.listenFirst).toBe(true);
    expect(getGeneratedArabicLesson('qiraah', 3, 'beginner').passage).toBeUndefined();
  });
});
