import { beginnerGrammarExtra, beginnerListeningExtra } from './beginnerGrammarListening';
import { beginnerPronunciationExtra, beginnerReadingExtra } from './beginnerPronReading';
import { beginnerSpeakingExtra, beginnerVocabularyExtra, beginnerWritingExtra } from './beginnerSpeakVocabWrite';
import {
  elementaryListeningExtra, elementaryPronunciationExtra, elementaryReadingExtra,
  elementarySpeakingExtra, elementaryVocabularyExtra, elementaryWritingExtra,
} from './elementaryExtra';
import type { ExtraEnglishLesson } from './types';

export type { ExtraEnglishLesson } from './types';

/** Extra Beginner/Elementary lessons that bring every skill to 20 lessons. */
const extraLessons: Record<string, ExtraEnglishLesson[]> = {
  'beginner/grammar': beginnerGrammarExtra,
  'beginner/listening': beginnerListeningExtra,
  'beginner/pronunciation': beginnerPronunciationExtra,
  'beginner/reading': beginnerReadingExtra,
  'beginner/speaking': beginnerSpeakingExtra,
  'beginner/vocabulary': beginnerVocabularyExtra,
  'beginner/writing': beginnerWritingExtra,
  'elementary/listening': elementaryListeningExtra,
  'elementary/pronunciation': elementaryPronunciationExtra,
  'elementary/reading': elementaryReadingExtra,
  'elementary/speaking': elementarySpeakingExtra,
  'elementary/vocabulary': elementaryVocabularyExtra,
  'elementary/writing': elementaryWritingExtra,
};

export function getExtraEnglishLessons(level: string, skill: string): ExtraEnglishLesson[] {
  return extraLessons[`${level}/${skill}`] ?? [];
}

export function getExtraEnglishLesson(level: string, skill: string, id: number): ExtraEnglishLesson | undefined {
  return getExtraEnglishLessons(level, skill).find((lesson) => lesson.id === id);
}

export function allExtraEnglishLessons(): Array<{ level: string; skill: string; lesson: ExtraEnglishLesson }> {
  return Object.entries(extraLessons).flatMap(([key, lessons]) => {
    const [level, skill] = key.split('/');
    return lessons.map((lesson) => ({ level, skill, lesson }));
  });
}
