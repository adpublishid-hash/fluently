import { arabicUpperPassages } from '../../pages/module/arabic/upper/passages';
import { arabicUpperThemes, type ArabicUpperLevel } from '../../pages/module/arabic/upper/arabicUpperThemes';
import { englishPassagesLower } from './englishPassagesLower';
import { englishPassagesUpper } from './englishPassagesUpper';
import { arabicFoundationPassages } from './arabicFoundationPassages';
import { japanesePassages } from './japanesePassages';
import { japanesePassagesBasic } from './japanesePassagesBasic';
import { mandarinPassages } from './mandarinPassages';
import { mandarinPassagesBasic } from './mandarinPassagesBasic';
import type { PassageSource } from './types';

export type PassageLanguage = 'english' | 'japanese' | 'mandarin' | 'arabic';
export type PassageSentence = { text: string; reading: string; meaning: string };
export type PassageQuestion = { question: string; answer: string; distractors: string[] };
export type Passage = {
  id: string;
  language: PassageLanguage;
  level: string;
  title: string;
  native: string;
  sentences: PassageSentence[];
  glossary: PassageSentence[];
  questions: PassageQuestion[];
};

export const passageLanguages: PassageLanguage[] = ['english', 'japanese', 'mandarin', 'arabic'];

/** Level id -> short label, in course order. */
export const passageLevelLabels: Record<PassageLanguage, Array<[level: string, label: string]>> = {
  english: [['a1', 'A1'], ['a2', 'A2'], ['b1', 'B1'], ['b2', 'B2'], ['c1', 'C1'], ['c2', 'C2']],
  japanese: [['beginner', 'N5'], ['elementary', 'N4'], ['intermediate', 'N3'], ['advanced', 'N2'], ['proficiency', 'N1']],
  mandarin: [
    ['beginner', 'HSK 1'], ['elementary', 'HSK 2'], ['intermediate', 'HSK 3'], ['upper-intermediate', 'HSK 4'],
    ['advanced', 'HSK 5'], ['proficiency', 'HSK 6'], ['hsk-7-9', 'HSK 7-9'],
  ],
  arabic: [
    ['beginner', 'Pemula'], ['elementary', 'Elementary'], ['intermediate', 'B1'], ['upper-intermediate', 'B2'], ['advanced', 'C1'],
    ['proficiency', 'C2'], ['mastery', 'Mastery'], ['scholar', 'Scholar'],
  ],
};

const toLine = ([text, reading, meaning]: [string, string, string]): PassageSentence => ({ text, reading, meaning });

function fromSource(language: PassageLanguage, source: PassageSource): Passage {
  return {
    id: source.id,
    language,
    level: source.level,
    title: source.title,
    native: source.native,
    sentences: source.sentences.map(toLine),
    glossary: (source.glossary ?? []).map(toLine),
    questions: source.questions.map(([question, answer, distractors]) => ({ question, answer, distractors })),
  };
}

function arabicPassages(): Passage[] {
  return (Object.keys(arabicUpperPassages) as ArabicUpperLevel[]).flatMap((level) =>
    arabicUpperPassages[level].map(([sentences, questions], index) => {
      const theme = arabicUpperThemes[level][index];
      return {
        id: `ar-${level}-${index + 1}`,
        language: 'arabic' as const,
        level,
        title: theme?.title ?? `Bacaan ${index + 1}`,
        native: theme?.vocabulary[0]?.arabic ?? '',
        sentences: sentences.map(toLine),
        glossary: (theme?.vocabulary ?? []).map((word) => ({ text: word.arabic, reading: word.transliteration, meaning: word.meaning })),
        questions: questions.map(([question, answer, distractors]) => ({ question, answer, distractors })),
      };
    }));
}

let cache: Record<PassageLanguage, Passage[]> | null = null;

function all(): Record<PassageLanguage, Passage[]> {
  cache ??= {
    english: [...englishPassagesLower, ...englishPassagesUpper].map((source) => fromSource('english', source)),
    japanese: [...japanesePassagesBasic, ...japanesePassages].map((source) => fromSource('japanese', source)),
    mandarin: [...mandarinPassagesBasic, ...mandarinPassages].map((source) => fromSource('mandarin', source)),
    arabic: [...arabicFoundationPassages.map((source) => fromSource('arabic', source)), ...arabicPassages()],
  };
  return cache;
}

export function getPassages(language: PassageLanguage, level?: string): Passage[] {
  const list = all()[language];
  return level ? list.filter((passage) => passage.level === level) : list;
}

export function getPassage(language: PassageLanguage, id: string): Passage | undefined {
  return all()[language].find((passage) => passage.id === id);
}

export function isPassageLanguage(value?: string): value is PassageLanguage {
  return value === 'english' || value === 'japanese' || value === 'mandarin' || value === 'arabic';
}
