import { describe, expect, it } from 'vitest';
import { runContentAudit } from './contentAudit';
import { arabicLessonCounts } from '../pages/module/arabic/arabicModuleData';

// Quality gate for generated lessons in every language and level.
const audits = runContentAudit();

describe.each(audits.map((audit) => [`${audit.language}/${audit.level}`, audit] as const))('%s', (_, audit) => {
  it('has lessons with practice questions', () => {
    expect(audit.lessons).toBeGreaterThan(0);
    expect(audit.questions).toBeGreaterThan(0);
  });

  it('has only answerable questions', () => {
    expect(audit.invalidQuestions).toEqual([]);
  });

  it('has no duplicated lessons', () => {
    expect(audit.duplicateLessons).toEqual([]);
  });

  it('does not favour one answer position', () => {
    expect(audit.answerFirstRatio).toBeLessThan(0.5);
  });

  // Guards against shared drills flooding every lesson of a level again
  // (every level is at 84% or more; this leaves a small margin).
  it('keeps most practice questions varied across lessons', () => {
    expect(audit.uniqueQuestionRatio).toBeGreaterThan(0.8);
  });
});

describe('arabic lesson counts', () => {
  it('gives every level and skill at least 20 lessons', () => {
    const short = Object.entries(arabicLessonCounts).flatMap(([level, skills]) =>
      Object.entries(skills).filter(([, count]) => count < 20).map(([skill, count]) => `${level}/${skill}=${count}`));
    expect(short).toEqual([]);
  });
});
