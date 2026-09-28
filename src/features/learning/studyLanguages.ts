// Lightweight language/level metadata (no course content), safe to import from
// eagerly loaded UI such as navigation.
import { normalizeTargetLanguage } from '../chat/targetLanguage';

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
