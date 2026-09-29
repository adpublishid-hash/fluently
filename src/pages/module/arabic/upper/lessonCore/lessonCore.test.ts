import { describe, expect, it } from 'vitest';
import { arabicSkills } from '../../arabicModuleData';
import { arabicLessonCore } from './index';

const ARABIC = /[؀-ۿ]/;

describe.each(Object.entries(arabicLessonCore))('arabic lesson core %s', (_, skills) => {
  it('covers every skill with 20 lessons', () => {
    arabicSkills.forEach(({ id }) => expect(skills?.[id]?.length, id).toBe(20));
  });

  it('has two points and four complete phrases per lesson', () => {
    Object.entries(skills ?? {}).forEach(([skill, lessons]) => {
      lessons?.forEach(([points, phrases], index) => {
        const where = `${skill} #${index + 1}`;
        expect(points.filter((point) => point.trim().length > 10), where).toHaveLength(2);
        expect(phrases, where).toHaveLength(4);
        phrases.forEach(([arabic, transliteration, meaning]) => {
          expect(ARABIC.test(arabic), `${where}: ${arabic}`).toBe(true);
          expect(transliteration.trim(), where).not.toBe('');
          expect(meaning.trim(), where).not.toBe('');
        });
      });
    });
  });

  it('never repeats a phrase inside the level', () => {
    const seen = new Map<string, string>();
    const repeats: string[] = [];
    Object.entries(skills ?? {}).forEach(([skill, lessons]) => {
      lessons?.forEach(([, phrases], index) => phrases.forEach(([arabic]) => {
        const where = `${skill} #${index + 1}`;
        if (seen.has(arabic)) repeats.push(`${arabic} (${seen.get(arabic)} / ${where})`);
        else seen.set(arabic, where);
      }));
    });
    expect(repeats).toEqual([]);
  });
});
