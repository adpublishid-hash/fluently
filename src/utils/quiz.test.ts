import { describe, expect, it } from 'vitest';
import { buildChoiceQuestion, hashSeed, seededRandom, seededShuffle, shuffleQuestionOptions } from './quiz';

describe('seeded helpers', () => {
  it('produces the same order for the same seed', () => {
    const items = ['a', 'b', 'c', 'd', 'e'];
    expect(seededShuffle(items, seededRandom(42))).toEqual(seededShuffle(items, seededRandom(42)));
    expect(seededShuffle(items, seededRandom(42)).sort()).toEqual(items);
  });

  it('hashes different lesson keys to different seeds', () => {
    expect(hashSeed('japanese', 'beginner', 'grammar', 1)).not.toBe(hashSeed('japanese', 'beginner', 'grammar', 2));
  });
});

describe('buildChoiceQuestion', () => {
  it('always includes the answer and unique distractors', () => {
    const random = seededRandom(7);
    const question = buildChoiceQuestion('Q', 'benar', ['benar', 'salah1', 'salah2', 'salah2', 'salah3'], random);
    expect(question).not.toBeNull();
    expect(question!.options).toContain('benar');
    expect(new Set(question!.options).size).toBe(question!.options.length);
    expect(question!.options).toHaveLength(4);
  });

  it('returns null when there are not enough distractors', () => {
    expect(buildChoiceQuestion('Q', 'a', ['a', 'b'], seededRandom(1))).toBeNull();
  });

  it('spreads the answer across positions', () => {
    const positions = new Set<number>();
    for (let seed = 0; seed < 40; seed += 1) {
      const question = buildChoiceQuestion('Q', 'x', ['p', 'q', 'r', 's'], seededRandom(seed))!;
      positions.add(question.options.indexOf('x'));
    }
    expect(positions.size).toBeGreaterThan(2);
  });
});

describe('shuffleQuestionOptions', () => {
  it('keeps question text and answer while reordering options', () => {
    const questions = Array.from({ length: 20 }, (_, index) => ({ question: `Q${index}`, options: ['a', 'b', 'c'], answer: 'a' }));
    const shuffled = shuffleQuestionOptions(questions, 99);
    shuffled.forEach((item, index) => {
      expect(item.question).toBe(`Q${index}`);
      expect([...item.options].sort()).toEqual(['a', 'b', 'c']);
    });
    expect(shuffled.filter((item) => item.options[0] === 'a').length).toBeLessThan(20);
  });
});
