import { hashSeed, seededRandom, seededShuffle, shuffleOpts } from '../../../../../utils/quiz';
import { vocabBankPart1 } from './bank/part1';
import { vocabBankPart2 } from './bank/part2';
import { vocabBankPart3 } from './bank/part3';
import { vocabBankPart4 } from './bank/part4';
import type { VocabEntry } from './bank/types';

export type AdvancedVocabularyWord = {
  word: string;
  type: string;
  meaning: string;
  example: string;
  collocations: string[];
};

export type AdvancedVocabularyLesson = {
  id: number;
  title: string;
  focus: string;
  words: AdvancedVocabularyWord[];
};

export type AdvancedVocabularyQuizQuestion = { q: string; opts: string[]; ans: string; exp: string };

const lessonTitles = [
  'Academic Excellence',
  'Professional Register',
  'Scientific Discourse',
  'Economic & Financial Terms',
  'Political & Legal Language',
  'Idiomatic Expressions',
  'High-Frequency Collocations',
  'Formal vs Informal Register',
  'Affixation & Word Formation',
  'Metaphor & Figurative Language',
  'Discourse & Rhetoric Vocabulary',
  'Medical & Health Terminology',
  'Technology & Innovation',
  'Environmental & Climate Terms',
  'Philosophical Concepts',
  'Literary & Critical Terms',
  'Psychological Language',
  'International Relations',
  'Arts & Culture',
  'C1 Vocabulary Mastery',
  'Law & Criminal Justice',
  'Architecture & Urban Design',
  'Cognitive Science & Neuroscience',
  'Sociology & Social Theory',
  'Linguistics & Language Theory',
  'Economics of Innovation',
  'Climate Science & Policy',
  'Medical Research & Clinical Trials',
  'Postcolonial & Cultural Studies',
  'Leadership & Organisational Behaviour',
  'Geopolitics & Security',
  'Food Science & Nutrition',
  'Space Science & Astronomy',
  'Financial Markets & Investment',
  'Development Economics',
  'Media & Communication Theory',
  'Bioethics & Medical Ethics',
  'Artificial Intelligence & Machine Learning',
  'Public Health & Epidemiology',
  'Philosophy of Science',
  'Gender Studies & Feminism',
  'Urban Studies & Smart Cities',
  'Energy Systems & Renewables',
  'Human Rights & International Law',
  'Behavioural Economics',
  'Supply Chain & Globalisation',
  'Data Privacy & Digital Rights',
  'Conflict Resolution & Mediation',
  'Environmental Justice',
  'C1/C2 Master Vocabulary Test',
];

const bank: Record<number, VocabEntry[]> = { ...vocabBankPart1, ...vocabBankPart2, ...vocabBankPart3, ...vocabBankPart4 };

/** Review lessons revisit one word from each earlier topic lesson instead of adding new words. */
const REVIEW_LESSONS: Record<number, number[]> = {
  20: Array.from({ length: 19 }, (_, index) => index + 1),
  50: Array.from({ length: 29 }, (_, index) => index + 21),
};

const toWord = ([word, type, meaning, example, collocations]: VocabEntry): AdvancedVocabularyWord => ({ word, type, meaning, example, collocations });

/** Position of a review word inside its source lesson, so review quizzes can use the forms that lesson skipped. */
const reviewIndex = (sourceLesson: number) => sourceLesson % 12;

let lessonsCache: AdvancedVocabularyLesson[] | null = null;

export function getAdvancedVocabularyLessons(): AdvancedVocabularyLesson[] {
  lessonsCache ??= lessonTitles.map((title, index) => {
    const id = index + 1;
    const sources = REVIEW_LESSONS[id];
    const words = sources
      ? sources.map((source) => toWord(bank[source][reviewIndex(source)]))
      : (bank[id] ?? []).map(toWord);
    return {
      id,
      title,
      focus: sources
        ? `Review: ${words.length} key words from lessons ${sources[0]}-${sources[sources.length - 1]}, tested in new ways.`
        : `${words.length} topical C1/C2 words for ${title.toLowerCase()}, with meaning, example sentence, and collocations.`,
      words,
    };
  });
  return lessonsCache;
}

export function getAdvancedVocabularyLesson(id: number) {
  return getAdvancedVocabularyLessons().find((lesson) => lesson.id === id);
}

type Form = 'meaning' | 'define' | 'gap' | 'collocation';
const FORMS: Form[] = ['meaning', 'define', 'gap', 'collocation'];

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const blankOut = (text: string, word: string) => text.replace(new RegExp(escape(word), 'i'), '_____');

function ask(form: Form, item: AdvancedVocabularyWord, others: AdvancedVocabularyWord[], random: () => number): AdvancedVocabularyQuizQuestion | null {
  // Distractors of the same part of speech first, so options are grammatically plausible.
  const pool = seededShuffle([...others.filter((other) => other.type === item.type), ...others.filter((other) => other.type !== item.type)], random)
    .filter((other, index, list) => list.findIndex((entry) => entry.word === other.word) === index)
    .slice(0, 3);
  if (pool.length < 2) return null;
  if (form === 'meaning') {
    return { q: `What does "${item.word}" mean?`, opts: [item.meaning, ...pool.map((other) => other.meaning)], ans: item.meaning, exp: `"${item.word}" (${item.type.toLowerCase()}) means ${item.meaning}.` };
  }
  if (form === 'define') {
    return { q: `Which word means "${item.meaning}"?`, opts: [item.word, ...pool.map((other) => other.word)], ans: item.word, exp: `"${item.word}" means ${item.meaning}. Example: ${item.example}` };
  }
  if (form === 'gap') {
    if (!item.example.toLowerCase().includes(item.word.toLowerCase())) return null;
    return { q: `Complete the sentence: ${blankOut(item.example, item.word)}`, opts: [item.word, ...pool.map((other) => other.word)], ans: item.word, exp: `"${item.example}"` };
  }
  const collocation = item.collocations.find((entry) => entry.toLowerCase().includes(item.word.toLowerCase()));
  if (!collocation) return null;
  return { q: `Complete the collocation: "${blankOut(collocation, item.word)}"`, opts: [item.word, ...pool.map((other) => other.word)], ans: item.word, exp: `"${collocation}" is a natural collocation with "${item.word}".` };
}

const QUIZ_LENGTH = 20;

function buildAdvancedVocabularyQuiz(lesson: AdvancedVocabularyLesson): AdvancedVocabularyQuizQuestion[] {
  const random = seededRandom(hashSeed('advanced-vocabulary-quiz', lesson.id));
  const sources = REVIEW_LESSONS[lesson.id];
  // Topic lessons ask each word in two forms; review lessons use the two forms its own lesson skipped.
  const plan = lesson.words.flatMap((item, index) => {
    const position = sources ? reviewIndex(sources[index]) + 1 : index;
    return [FORMS[position % 4], FORMS[(position + 2) % 4]].map((form) => ({ form, item }));
  });
  const rounds = [plan.filter((_, index) => index % 2 === 0), plan.filter((_, index) => index % 2 === 1)].flat();
  return rounds
    .map(({ form, item }) => ask(form, item, lesson.words.filter((other) => other.word !== item.word), random))
    .filter((question): question is AdvancedVocabularyQuizQuestion => question !== null)
    .slice(0, QUIZ_LENGTH);
}

// Options are written answer-first; shuffle them (seeded per lesson) so the answer is not always A.
export function getAdvancedVocabularyQuiz(lesson: AdvancedVocabularyLesson): AdvancedVocabularyQuizQuestion[] {
  return shuffleOpts(buildAdvancedVocabularyQuiz(lesson), hashSeed('getAdvancedVocabularyQuiz', lesson.title));
}
