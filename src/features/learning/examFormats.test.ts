import { describe, expect, it } from 'vitest';
import { buildFormattedExam, examFormats } from './examFormats';
import { getStudyLevels, type StudyLanguage } from './studyLanguages';

const languages = Object.keys(examFormats) as StudyLanguage[];

describe('formatted exams', () => {
  it.each(languages)('%s: every level fills every part', (language) => {
    getStudyLevels(language).forEach((level) => {
      const questions = buildFormattedExam(language, level.id, 'test');
      examFormats[language].parts.forEach((part) => {
        expect(questions.filter((item) => item.part === part.id).length, `${language}/${level.id}/${part.id}`).toBe(part.count);
      });
      questions.forEach((item) => {
        expect(item.options).toContain(item.answer);
        expect(new Set(item.options).size).toBe(item.options.length);
      });
    });
  });

  it.each(languages)('%s: listening items are audio-only', (language) => {
    const questions = buildFormattedExam(language, getStudyLevels(language)[2].id, 'audio');
    const listening = questions.filter((item) => item.section === 'Menyimak');
    expect(listening.length).toBeGreaterThan(0);
    listening.forEach((item) => {
      expect(item.audio).toBeTruthy();
      expect(item.question.includes(item.audio!)).toBe(false);
    });
  });

  it('uses long passages for reading from intermediate levels', () => {
    (['japanese', 'mandarin', 'arabic'] as const).forEach((language) => {
      const questions = buildFormattedExam(language, 'intermediate', 'passages');
      expect(questions.some((item) => item.context && item.context.text.length > 60), language).toBe(true);
    });
  });

  it('is deterministic per seed', () => {
    expect(buildFormattedExam('mandarin', 'advanced', 'a')).toEqual(buildFormattedExam('mandarin', 'advanced', 'a'));
  });
});
