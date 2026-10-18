import { hashSeed, shuffleOpts } from '../../../../../utils/quiz';
import { buildVocabQuiz } from '../../advanced/shared/vocabQuiz';
import type { VocabEntry } from '../../advanced/vocabulary/bank/types';
import { proficiencyVocabPartA } from './bank/partA';
import { proficiencyVocabPartB } from './bank/partB';
export type ProficiencyVocabularyWord = {
  word: string;
  type: string;
  meaning: string;
  example: string;
  collocations: string[];
};

export type ProficiencyVocabularyQuiz = {
  q: string;
  opts: string[];
  ans: string;
  exp: string;
};

export type ProficiencyVocabularyLessonContent = {
  id: number;
  title: string;
  focus: string;
  words: ProficiencyVocabularyWord[];
  usageTask: string;
  quiz: ProficiencyVocabularyQuiz[];
};

const lessonTitles = [
  'C2 Academic Precision',
  'Rhetoric and Argument',
  'Policy and Governance',
  'Law, Rights, and Ethics',
  'Economics and Markets',
  'Scientific Reasoning',
  'Technology and AI',
  'Climate and Sustainability',
  'Psychology and Cognition',
  'Sociology and Inequality',
  'Literature and Criticism',
  'Culture and Identity',
  'Media and Discourse',
  'Diplomacy and Geopolitics',
  'Business Strategy',
  'Leadership and Organisations',
  'Medical and Public Health',
  'Philosophy and Abstract Thought',
  'Idioms and Figurative Register',
  'C2 Vocabulary Mastery',
];

const bank: Record<number, VocabEntry[]> = { ...proficiencyVocabPartA, ...proficiencyVocabPartB };

/** Lesson 20 reviews one word from each earlier lesson instead of adding new words. */
const REVIEW_LESSON = 20;
const reviewSources = Array.from({ length: REVIEW_LESSON - 1 }, (_, index) => index + 1);
const reviewIndex = (sourceLesson: number) => sourceLesson % 12;

const toWord = ([word, type, meaning, example, collocations]: VocabEntry): ProficiencyVocabularyWord => ({ word, type, meaning, example, collocations });

function wordsFor(id: number): ProficiencyVocabularyWord[] {
  if (id === REVIEW_LESSON) return reviewSources.map((source) => toWord(bank[source][reviewIndex(source)]));
  return (bank[id] ?? []).map(toWord);
}

// Topic lessons ask each word in two forms; the review lesson uses the two forms each word's own lesson skipped.
function makeQuiz(id: number, words: ProficiencyVocabularyWord[]): ProficiencyVocabularyQuiz[] {
  const positions = id === REVIEW_LESSON ? reviewSources.map((source) => reviewIndex(source) + 1) : undefined;
  return buildVocabQuiz(words, hashSeed('proficiency-vocabulary-quiz', id), positions);
}

export const proficiencyVocabularyLessons: ProficiencyVocabularyLessonContent[] = lessonTitles.map((title, index) => {
  const words = wordsFor(index + 1);
  return {
    id: index + 1,
    title,
    focus: index + 1 === REVIEW_LESSON
      ? `Review: ${words.length} key C2 words from lessons 1-19, tested in new ways.`
      : `${words.length} topical C2 words for ${title.toLowerCase()} with meaning, collocation, example usage, and register awareness.`,
    words,
    usageTask: `Write a 180-word paragraph about ${title.toLowerCase()} using at least eight words from this lesson. Include one contrast, one qualification, and one synthesis sentence.`,
    // Options are written answer-first; shuffled per lesson so the answer is not always A.
    quiz: shuffleOpts(makeQuiz(index + 1, words), hashSeed('proficiencyVocabularyContent', title)),
  };
});

export function getProficiencyVocabularyLesson(id: number) {
  return proficiencyVocabularyLessons.find((lesson) => lesson.id === id) ?? proficiencyVocabularyLessons[0];
}
