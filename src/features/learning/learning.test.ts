import { describe, expect, it } from 'vitest';
import { buildLevelQuestions } from './examQuestions';
import { applyReview, buildReviewQueue, NEW_CARDS_PER_DAY, scheduleCard } from './srs';
import { getLevelWords, getStudyLevels, studyLevelIndex, type StudyLanguage } from './studyBank';

const languages: StudyLanguage[] = ['english', 'japanese', 'mandarin', 'arabic'];

describe('study bank', () => {
  it.each(languages)('%s has words for every level', (language) => {
    getStudyLevels(language).forEach((level) => {
      expect(getLevelWords(language, level.id).length, `${language}/${level.id}`).toBeGreaterThanOrEqual(20);
    });
  });

  it('maps persona levels from onboarding', () => {
    expect(studyLevelIndex('mandarin', 'HSK 3')).toBe(2);
    expect(studyLevelIndex('japanese', 'N4')).toBe(1);
    expect(studyLevelIndex('japanese', 'N1')).toBe(4);
    expect(studyLevelIndex('arabic', 'Superior')).toBe(5);
    expect(studyLevelIndex('arabic', 'Novice')).toBe(0);
    expect(studyLevelIndex('english', 'Upper-Intermediate')).toBe(3);
    expect(studyLevelIndex('english', undefined)).toBe(0);
  });
});

describe('exam questions', () => {
  it.each(languages)('%s builds answerable, unique questions for every level', (language) => {
    getStudyLevels(language).forEach((level) => {
      const questions = buildLevelQuestions(language, level.id, { vocabulary: 12, reading: 10, grammar: 8 }, 'test');
      expect(questions.length, `${language}/${level.id}`).toBeGreaterThanOrEqual(20);
      questions.forEach((question) => {
        expect(question.options).toContain(question.answer);
        expect(new Set(question.options).size).toBe(question.options.length);
      });
      expect(new Set(questions.map((question) => question.question)).size).toBe(questions.length);
    });
  });

  it('is deterministic for the same seed', () => {
    const a = buildLevelQuestions('japanese', 'beginner', { vocabulary: 5, reading: 3, grammar: 2 }, 'seed');
    const b = buildLevelQuestions('japanese', 'beginner', { vocabulary: 5, reading: 3, grammar: 2 }, 'seed');
    expect(a).toEqual(b);
  });
});

describe('spaced repetition', () => {
  it('grows intervals on success and resets on failure', () => {
    const first = scheduleCard(undefined, 'good', 100);
    expect(first.interval).toBe(1);
    expect(first.due).toBe(101);
    const second = scheduleCard(first, 'good', 101);
    expect(second.interval).toBe(3);
    const third = scheduleCard(second, 'good', 104);
    expect(third.interval).toBeGreaterThan(second.interval);
    const lapse = scheduleCard(third, 'again', 110);
    expect(lapse.reps).toBe(0);
    expect(lapse.due).toBe(110);
    expect(lapse.lapses).toBe(1);
    expect(lapse.ease).toBeLessThan(third.ease);
  });

  it('never lets ease drop below 1.3', () => {
    let card = scheduleCard(undefined, 'again', 0);
    for (let day = 1; day < 20; day += 1) card = scheduleCard(card, 'again', day);
    expect(card.ease).toBeGreaterThanOrEqual(1.3);
  });

  it('limits new cards per day and surfaces due cards', () => {
    const words = getLevelWords('japanese', 'beginner');
    let state = { cards: {}, introduced: {} } as Parameters<typeof applyReview>[0];
    const today = 500;
    const queue = buildReviewQueue(words, state, today);
    expect(queue.fresh).toHaveLength(NEW_CARDS_PER_DAY);
    expect(queue.due).toHaveLength(0);
    queue.fresh.forEach((word) => { state = applyReview(state, word, 'good', today); });
    expect(buildReviewQueue(words, state, today).fresh).toHaveLength(0);
    expect(buildReviewQueue(words, state, today + 1).due).toHaveLength(NEW_CARDS_PER_DAY);
  });
});
