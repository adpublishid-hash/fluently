// Shared, level-organised word/sentence banks for the four target languages.
// Used by spaced-repetition review, the placement test and mock exams.
import { englishLexicon, englishSentences } from './englishLexiconExtra';
import { getGeneratedArabicLesson } from '../../pages/module/arabic/beginner/generatedBeginnerArabicContent';
import { elementaryGrammar, pemulaGrammar } from '../../pages/module/arabic/foundation/arabicFoundationGrammar';
import { getFoundationLevelSentences } from '../../pages/module/arabic/foundation/arabicFoundationSentences';
import { getFoundationLevelWords } from '../../pages/module/arabic/foundation/arabicFoundationVocabulary';
import { getArabicUpperLevelWords } from '../../pages/module/arabic/upper/arabicUpperThemes';
import { japaneseGrammarBank } from '../../pages/module/japanese/japaneseGrammarBank';
import { getJapaneseLevelWords } from '../../pages/module/japanese/japaneseVocabularyBank';
import { getMandarinLesson } from '../../pages/module/mandarin/mandarinLessonContent';
import type { MandarinLevelId } from '../../pages/module/mandarin/mandarinModuleData';
import { type StudyCloze, type StudyLanguage, type StudyPattern, type StudySentence, type StudyWord } from './studyLanguages';
import { getMandarinLevelThemeWords } from '../../pages/module/mandarin/mandarinThemeBank';

export * from './studyLanguages';

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
      return toWords(language, level, (englishLexicon[level] ?? []).map(([term, meaning]) => ({ term, meaning })));
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
    if (language === 'english') return (englishSentences[level] ?? []).map(([term, meaning]) => ({ term, meaning, level }));
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
    return uniqueBy(arabicUpperLessons(level).flatMap((lesson) => [...(lesson.passage?.sentences ?? []), ...lesson.examples]), (item) => item.arabic)
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
    (englishLexicon[level] ?? []).flatMap(([word, , example]) => {
      const pattern = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (!pattern.test(example)) return [];
      return [{ sentence: example.replace(pattern, '_____'), answer: word, level }];
    }),
  );
}
