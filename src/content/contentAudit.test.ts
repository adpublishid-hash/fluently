import { describe, expect, it } from 'vitest';
import { runContentAudit } from './contentAudit';

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
});
