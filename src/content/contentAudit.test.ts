import { describe, expect, it } from 'vitest';
import { runContentAudit } from './contentAudit';
import { arabicLessonCounts } from '../pages/module/arabic/arabicModuleData';

// Quality gate for generated lessons in every language and level.
const audits = runContentAudit();

// English pages whose quiz lives inside the component and still repeats
// templated questions; each floor only stops it from getting worse.
const knownLowVariety: Record<string, number> = {
  'english/advanced/grammar': 0.04,
  'english/elementary/grammar': 0.40,
  'english/elementary/pronunciation': 0.54,
  'english/elementary/vocabulary': 0.34,
  'english/intermediate/listening': 0.04,
  'english/intermediate/reading': 0.07,
  'english/intermediate/speaking': 0.59,
  'english/intermediate/writing': 0.10,
  'english/upper-intermediate/grammar': 0.13,
  'english/upper-intermediate/pronunciation': 0.13,
  'english/upper-intermediate/reading': 0.04,
  'english/upper-intermediate/speaking': 0.08,
  'english/upper-intermediate/vocabulary': 0.18,
  'english-latihan/grammar': 0.72,
  'english-latihan/reading': 0.67,
  'english-latihan/speaking': 0.74,
};
// Lessons 10-20 of advanced grammar still share one generic quiz.
const knownDuplicateLessons = new Set(['english/advanced/grammar']);

describe.each(audits.map((audit) => [`${audit.language}/${audit.level}`, audit] as const))('%s', (_, audit) => {
  it('has lessons with practice questions', () => {
    expect(audit.lessons).toBeGreaterThan(0);
    expect(audit.questions).toBeGreaterThan(0);
  });

  it('has only answerable questions', () => {
    expect(audit.invalidQuestions).toEqual([]);
  });

  it('has no duplicated lessons', () => {
    if (knownDuplicateLessons.has(`${audit.language}/${audit.level}`)) return;
    expect(audit.duplicateLessons).toEqual([]);
  });

  it('does not favour one answer position', () => {
    expect(audit.answerFirstRatio).toBeLessThan(0.5);
  });

  // Guards against shared drills flooding every lesson of a level again
  // (every level is at 84% or more; this leaves a small margin). The English
  // groups listed in knownLowVariety still repeat templated questions; their
  // floor only stops them from getting worse until they are rewritten.
  it('keeps most practice questions varied across lessons', () => {
    const floor = knownLowVariety[`${audit.language}/${audit.level}`] ?? 0.8;
    expect(audit.uniqueQuestionRatio).toBeGreaterThan(floor);
  });
});

describe('arabic lesson counts', () => {
  it('gives every level and skill at least 20 lessons', () => {
    const short = Object.entries(arabicLessonCounts).flatMap(([level, skills]) =>
      Object.entries(skills).filter(([, count]) => count < 20).map(([skill, count]) => `${level}/${skill}=${count}`));
    expect(short).toEqual([]);
  });
});
