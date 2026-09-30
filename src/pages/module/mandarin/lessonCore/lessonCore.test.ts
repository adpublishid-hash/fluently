import { describe, expect, it } from 'vitest';
import { getMandarinLessonPreview } from '../mandarinLessonContent';
import { mandarinLessonCounts, mandarinSkills, type MandarinLevelId } from '../mandarinModuleData';
import { mandarinLessonCore } from './index';

const HANZI = /[一-鿿]/;
const TONE = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/;

describe.each(Object.entries(mandarinLessonCore))('mandarin lesson core %s', (_, skills) => {
  it('covers every skill with 20 lessons', () => {
    mandarinSkills.forEach(({ id }) => expect(skills?.[id]?.length, id).toBe(20));
  });

  it('has two points and four complete phrases per lesson', () => {
    Object.entries(skills ?? {}).forEach(([skill, lessons]) => {
      lessons?.forEach(([title, points, phrases], index) => {
        const where = `${skill} #${index + 1}`;
        if (title !== null) expect(title.trim().length, where).toBeGreaterThan(3);
        expect(points.filter((point) => point.trim().length > 10), where).toHaveLength(2);
        expect(phrases, where).toHaveLength(4);
        phrases.forEach(([hanzi, pinyin, meaning]) => {
          expect(HANZI.test(hanzi), `${where}: ${hanzi}`).toBe(true);
          // Pinyin is generated from the Hanzi (npm run content:pinyin).
          expect(TONE.test(pinyin), `${where}: ${hanzi} pinyin "${pinyin}"`).toBe(true);
          expect(meaning.trim(), where).not.toBe('');
        });
      });
    });
  });

  it('never repeats a phrase inside the level', () => {
    const seen = new Map<string, string>();
    const repeats: string[] = [];
    Object.entries(skills ?? {}).forEach(([skill, lessons]) => {
      lessons?.forEach(([, , phrases], index) => phrases.forEach(([hanzi]) => {
        const where = `${skill} #${index + 1}`;
        if (seen.has(hanzi)) repeats.push(`${hanzi} (${seen.get(hanzi)} / ${where})`);
        else seen.set(hanzi, where);
      }));
    });
    expect(repeats).toEqual([]);
  });
});

describe('mandarin lesson titles', () => {
  it('each level keeps its own titles (no title reused by another level)', () => {
    const owner = new Map<string, MandarinLevelId>();
    const shared: string[] = [];
    (Object.keys(mandarinLessonCounts) as MandarinLevelId[]).filter((level) => mandarinLessonCore[level]).forEach((level) => {
      mandarinSkills.forEach(({ id }) => {
        for (let lesson = 1; lesson <= 20; lesson += 1) {
          const title = getMandarinLessonPreview(id, lesson, level);
          const previous = owner.get(title);
          if (previous && previous !== level) shared.push(`${title} (${previous} / ${level})`);
          owner.set(title, level);
        }
      });
    });
    expect(shared).toEqual([]);
  });
});
