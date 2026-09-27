import { describe, expect, it } from 'vitest';
import { illustrate } from '.';
import { getLevelWords, type StudyLanguage } from '../learning/studyBank';
import { getStudyLevels } from '../learning/studyLanguages';

describe('vocabulary illustrations', () => {
  it('matches concrete and abstract meanings', () => {
    expect(illustrate('kucing')).toBe('🐱');
    expect(illustrate('kereta bawah tanah')).toBe('🚆');
    expect(illustrate('pertumbuhan ekonomi')).toBe('📈');
    expect(illustrate('keadilan sosial')).toBe('⚖️');
    expect(illustrate('penelitian ilmiah')).toBe('🔬');
    expect(illustrate('', 'Library')).toBe('📚');
    expect(illustrate('kata sambung yang jarang')).toBe('🔤');
    expect(illustrate('kepadatan penduduk')).toBe('👥');
    expect(illustrate('konsumsi energi')).toBe('⚡');
    expect(illustrate('xyzzy')).toBeNull();
  });

  it('does not match inside other words', () => {
    expect(illustrate('bahasa')).toBe('🔤');
    expect(illustrate('sepatu')).toBe('👟'); // not "sepa…"
    expect(illustrate('marahnya')).toBeNull();
  });

  it.each(['english', 'japanese', 'mandarin', 'arabic'] as StudyLanguage[])('%s: reports coverage per level', (language) => {
    const coverage = getStudyLevels(language).map((level) => {
      const words = getLevelWords(language, level.id);
      const hits = words.filter((word) => illustrate(word.meaning, language === 'english' ? word.term : undefined)).length;
      return Math.round((hits / Math.max(1, words.length)) * 100);
    });
    console.log(language, coverage.join('% '), '%');
    expect(Math.max(...coverage)).toBeGreaterThan(25);
  });
});
