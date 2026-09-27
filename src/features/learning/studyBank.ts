// Shared, level-organised word/sentence banks for the four target languages.
// Used by spaced-repetition review, the placement test and mock exams.
import { englishCefrLexicon } from './englishCefrLexicon';
import { normalizeTargetLanguage } from '../chat/targetLanguage';
import { getGeneratedArabicLesson } from '../../pages/module/arabic/beginner/generatedBeginnerArabicContent';
import { elementaryGrammar, pemulaGrammar } from '../../pages/module/arabic/foundation/arabicFoundationGrammar';
import { getFoundationLevelSentences } from '../../pages/module/arabic/foundation/arabicFoundationSentences';
import { getFoundationLevelWords } from '../../pages/module/arabic/foundation/arabicFoundationVocabulary';
import { getArabicUpperLevelWords } from '../../pages/module/arabic/upper/arabicUpperThemes';
import { japaneseGrammarBank } from '../../pages/module/japanese/japaneseGrammarBank';
import { getJapaneseLevelWords } from '../../pages/module/japanese/japaneseVocabularyBank';
import { getMandarinLesson } from '../../pages/module/mandarin/mandarinLessonContent';
import type { MandarinLevelId } from '../../pages/module/mandarin/mandarinModuleData';
import { getMandarinLevelThemeWords } from '../../pages/module/mandarin/mandarinThemeBank';

export type StudyLanguage = 'english' | 'japanese' | 'mandarin' | 'arabic';

export type StudyLevel = {
  /** Content level id used by the module pages. */
  id: string;
  /** Short label (A1, N5, HSK 1, ...). */
  label: string;
  /** Value stored in user.persona.level (matches onboarding options). */
  personaLevel: string;
};

export type StudyWord = { id: string; term: string; reading?: string; meaning: string; level: string };
export type StudySentence = { term: string; reading?: string; meaning: string; level: string };
export type StudyPattern = { pattern: string; meaning: string; level: string };
/** English sentences come with a blank for cloze questions instead of a translation. */
export type StudyCloze = { sentence: string; answer: string; level: string };

export const studyLanguageLabel: Record<StudyLanguage, string> = {
  english: 'English',
  japanese: 'Japanese',
  mandarin: 'Mandarin',
  arabic: 'Arabic',
};

export const studySpeechLang: Record<StudyLanguage, string> = {
  english: 'en-US',
  japanese: 'ja-JP',
  mandarin: 'zh-CN',
  arabic: 'ar-SA',
};

const levels: Record<StudyLanguage, StudyLevel[]> = {
  english: [
    { id: 'a1', label: 'A1', personaLevel: 'Beginner' },
    { id: 'a2', label: 'A2', personaLevel: 'Elementary' },
    { id: 'b1', label: 'B1', personaLevel: 'Intermediate' },
    { id: 'b2', label: 'B2', personaLevel: 'Upper-Intermediate' },
    { id: 'c1', label: 'C1', personaLevel: 'Advanced' },
    { id: 'c2', label: 'C2', personaLevel: 'Proficiency' },
  ],
  japanese: [
    { id: 'beginner', label: 'N5', personaLevel: 'N5' },
    { id: 'elementary', label: 'N4', personaLevel: 'N4' },
    { id: 'intermediate', label: 'N3', personaLevel: 'N3' },
    { id: 'advanced', label: 'N2', personaLevel: 'N2' },
    { id: 'proficiency', label: 'N1', personaLevel: 'N1' },
  ],
  mandarin: [
    { id: 'beginner', label: 'HSK 1', personaLevel: 'HSK 1' },
    { id: 'elementary', label: 'HSK 2', personaLevel: 'HSK 2' },
    { id: 'intermediate', label: 'HSK 3', personaLevel: 'HSK 3' },
    { id: 'upper-intermediate', label: 'HSK 4', personaLevel: 'HSK 4' },
    { id: 'advanced', label: 'HSK 5', personaLevel: 'HSK 5' },
    { id: 'proficiency', label: 'HSK 6', personaLevel: 'HSK 6' },
  ],
  arabic: [
    { id: 'beginner', label: 'Pemula', personaLevel: 'Novice' },
    { id: 'elementary', label: 'Elementary', personaLevel: 'Elementary' },
    { id: 'intermediate', label: 'Intermediate', personaLevel: 'Intermediate' },
    { id: 'upper-intermediate', label: 'Upper-Intermediate', personaLevel: 'Upper-Intermediate' },
    { id: 'advanced', label: 'Advanced', personaLevel: 'Advanced' },
    { id: 'proficiency', label: 'Superior', personaLevel: 'Superior' },
  ],
};

export function studyLanguageFor(targetLanguage?: string): StudyLanguage {
  const language = normalizeTargetLanguage(targetLanguage);
  if (language === 'Japanese') return 'japanese';
  if (language === 'Mandarin') return 'mandarin';
  if (language === 'Arabic') return 'arabic';
  return 'english';
}

export function getStudyLevels(language: StudyLanguage): StudyLevel[] {
  return levels[language];
}

/** Maps a persona level ("HSK 3", "N4", "Superior", "B1", ...) to an index in getStudyLevels. */
export function studyLevelIndex(language: StudyLanguage, personaLevel?: string): number {
  const value = (personaLevel || '').toLowerCase().trim();
  const list = levels[language];
  const exact = list.findIndex((level) => level.personaLevel.toLowerCase() === value || level.label.toLowerCase() === value || level.id === value);
  if (exact >= 0) return exact;
  const keywords: Array<[RegExp, number]> = [
    [/superior|proficiency|mastery|scholar|c2|n1|hsk ?6/, 5],
    [/advanced|c1|n2|hsk ?5/, 4],
    [/upper|b2|hsk ?4/, 3],
    [/intermediate|b1|n3|hsk ?3/, 2],
    [/elementary|a2|n4|hsk ?2/, 1],
  ];
  const match = keywords.find(([pattern]) => pattern.test(value));
  return Math.min(list.length - 1, match ? match[1] : 0);
}

const cache = new Map<string, unknown>();
function memo<T>(key: string, build: () => T): T {
  if (!cache.has(key)) cache.set(key, build());
  return cache.get(key) as T;
}

function uniqueBy<T>(items: T[], key: (item: T) => string): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const value = key(item);
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

type RawWord = { term: string; reading?: string; meaning: string };

function toWords(language: StudyLanguage, level: string, raw: RawWord[]): StudyWord[] {
  return uniqueBy(raw.filter((word) => word.term && word.meaning), (word) => word.term).map((word) => ({
    id: `${language}:${word.term}`,
    term: word.term,
    reading: word.reading,
    meaning: word.meaning,
    level,
  }));
}

function mandarinLessons(level: string) {
  return memo(`mandarin-lessons:${level}`, () =>
    Array.from({ length: 20 }, (_, index) => getMandarinLesson('vocabulary', index + 1, level as MandarinLevelId)),
  );
}

function arabicUpperLessons(level: string) {
  return memo(`arabic-lessons:${level}`, () =>
    Array.from({ length: 20 }, (_, index) => getGeneratedArabicLesson('mufradat', index + 1, level as 'intermediate')),
  );
}

export function getLevelWords(language: StudyLanguage, level: string): StudyWord[] {
  return memo(`words:${language}:${level}`, () => {
    if (language === 'english') {
      return toWords(language, level, (englishCefrLexicon[level] ?? []).map(([term, meaning]) => ({ term, meaning })));
    }
    if (language === 'japanese') {
      return toWords(language, level, getJapaneseLevelWords(level as 'beginner').map((word) => ({ term: word.japanese, reading: word.romaji, meaning: word.meaning })));
    }
    if (language === 'mandarin') {
      const themed = getMandarinLevelThemeWords(level as MandarinLevelId);
      const fromLessons = mandarinLessons(level).flatMap((lesson) => lesson.vocabulary);
      return toWords(language, level, [...themed, ...fromLessons].map((word) => ({ term: word.hanzi, reading: word.pinyin, meaning: word.meaning })));
    }
    if (level === 'beginner' || level === 'elementary') {
      return toWords(language, level, getFoundationLevelWords(level).map((word) => ({ term: word.arabic, reading: word.transliteration, meaning: word.meaning })));
    }
    const themed = getArabicUpperLevelWords(level as 'intermediate');
    const fromLessons = arabicUpperLessons(level).flatMap((lesson) => lesson.vocabulary ?? []);
    return toWords(language, level, [...themed, ...fromLessons].map((word) => ({ term: word.arabic, reading: word.transliteration, meaning: word.meaning })));
  });
}

export function getLevelSentences(language: StudyLanguage, level: string): StudySentence[] {
  return memo(`sentences:${language}:${level}`, () => {
    if (language === 'english') return [];
    if (language === 'japanese') {
      return japaneseGrammarBank[level as 'beginner'].flatMap((point) => point.examples).map((item) => ({ term: item.japanese, reading: item.romaji, meaning: item.meaning, level }));
    }
    if (language === 'mandarin') {
      return uniqueBy(mandarinLessons(level).flatMap((lesson) => lesson.examples), (item) => item.hanzi)
        // Skip template sentences that embed Latin-script topic titles.
        .filter((item) => !/[A-Za-z]/.test(item.hanzi))
        .map((item) => ({ term: item.hanzi, reading: item.pinyin, meaning: item.meaning, level }));
    }
    if (level === 'beginner' || level === 'elementary') {
      return getFoundationLevelSentences(level).map((item) => ({ term: item.arabic, reading: item.transliteration, meaning: item.meaning, level }));
    }
    return uniqueBy(arabicUpperLessons(level).flatMap((lesson) => lesson.examples), (item) => item.arabic)
      .map((item) => ({ term: item.arabic, reading: item.transliteration, meaning: item.meaning, level }));
  });
}

export function getLevelPatterns(language: StudyLanguage, level: string): StudyPattern[] {
  if (language === 'japanese') return japaneseGrammarBank[level as 'beginner'].map((point) => ({ pattern: point.pattern, meaning: point.meaning, level }));
  if (language === 'arabic' && (level === 'beginner' || level === 'elementary')) {
    return (level === 'beginner' ? pemulaGrammar : elementaryGrammar).map((point) => ({ pattern: point.pattern, meaning: point.meaning, level }));
  }
  return [];
}

export function getLevelCloze(language: StudyLanguage, level: string): StudyCloze[] {
  if (language !== 'english') return [];
  return memo(`cloze:${level}`, () =>
    (englishCefrLexicon[level] ?? []).flatMap(([word, , example]) => {
      const pattern = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (!pattern.test(example)) return [];
      return [{ sentence: example.replace(pattern, '_____'), answer: word, level }];
    }),
  );
}
