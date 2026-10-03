import { buildChoiceQuestion, hashSeed, seededRandom, seededShuffle, type ChoiceQuestion } from '../../../../utils/quiz';
import type { QuizLevel, VocabQuestion } from '../../components/PracticeQuizPage';
import type { ArabicQuizSkill, QuizItem, QuizTopic } from './types';

type Kind = 'meaning' | 'arabic' | 'heard' | 'reading' | 'spelling';

// Question types per skill, most characteristic first.
const kindsBySkill: Record<ArabicQuizSkill, Kind[]> = {
  mufradat: ['meaning', 'arabic', 'reading'],
  nahwu: ['reading', 'meaning', 'arabic'],
  istima: ['heard', 'meaning', 'reading'],
  kalam: ['arabic', 'heard', 'meaning'],
  qiraah: ['meaning', 'reading', 'heard'],
  kitabah: ['spelling', 'arabic', 'meaning'],
  makharij: ['spelling', 'reading', 'heard'],
};

export const QUESTIONS_PER_LEVEL = 10;
const BACKUP_KINDS: Kind[] = ['meaning', 'arabic', 'heard', 'reading'];
const LEVELS: QuizLevel[] = ['Basic', 'Intermediate', 'Advanced'];

// Pairs of letters learners often confuse; swapping one makes a plausible misspelling.
const LETTER_SWAPS: Array<[string, string]> = [
  ['ت', 'ط'], ['س', 'ص'], ['د', 'ض'], ['ذ', 'ز'], ['ظ', 'ذ'], ['ح', 'ه'],
  ['ع', 'أ'], ['ق', 'ك'], ['ث', 'س'], ['ض', 'ظ'], ['غ', 'خ'],
];
// Ta marbuthah and alif maqshurah only alternate with ha/ta/ya/alif at the end of a word.
const WORD_END = '(?=[\\u064B-\\u0652]*(?:\\s|$|[.،؟!:]))';

/** Plausible misspellings: one confusable letter swapped, or the shadda dropped. */
export function spellingVariants(arabic: string, random: () => number): string[] {
  const edits: Array<(text: string) => string> = LETTER_SWAPS.flatMap(([a, b]) => [
    (text: string) => text.replace(a, b),
    (text: string) => text.replace(b, a),
  ]);
  edits.push((text) => text.replace('ّ', ''));
  edits.push((text) => text.replace(new RegExp(`ى${WORD_END}`), 'ي'));
  edits.push((text) => text.replace(new RegExp(`ي${WORD_END}`), 'ى'));
  edits.push((text) => text.replace(new RegExp(`ا${WORD_END}`), 'ى'));
  edits.push((text) => text.replace(new RegExp(`ة${WORD_END}`), 'ه'));
  edits.push((text) => text.replace(new RegExp(`ة${WORD_END}`), 'ت'));
  edits.push((text) => text.replace(new RegExp(`ه${WORD_END}`), 'ة'));
  const variants = new Set<string>();
  seededShuffle(edits, random).forEach((edit) => {
    const variant = edit(arabic);
    if (variant !== arabic && variants.size < 3) variants.add(variant);
  });
  return [...variants];
}

/** Near-miss transliterations: wrong case ending, lost emphatic/ain, single vs double consonant. */
export function readingVariants(transliteration: string, random: () => number): string[] {
  const edits: Array<(text: string) => string> = [
    (text) => text.replace(/un([.?!]?)$/, 'in$1'),
    (text) => text.replace(/un([.?!]?)$/, 'an$1'),
    (text) => text.replace(/u([.?!]?)$/, 'a$1'),
    (text) => text.replace(/a([.?!]?)$/, 'u$1'),
    (text) => text.replace(/i([.?!]?)$/, 'u$1'),
    (text) => text.replace(/sh/, 's'),
    (text) => text.replace(/th/, 't'),
    (text) => text.replace(/dh/, 'd'),
    (text) => text.replace(/zh/, 'z'),
    (text) => text.replace(/kh/, 'h'),
    (text) => text.replace(/'/, ''),
    (text) => text.replace(/([bdfjklmnqrstwyz])\1/, '$1'),
    (text) => text.replace(/([aiu])([bdfjklmnqrstz])([aiu])/, '$1$2$2$3'),
  ];
  const variants = new Set<string>();
  seededShuffle(edits, random).forEach((edit) => {
    const variant = edit(transliteration);
    if (variant !== transliteration && variants.size < 3) variants.add(variant);
  });
  return [...variants];
}

type Shape = 'word' | 'phrase' | 'sentence';
const shapeOf = (arabic: string): Shape => (/[.؟?!]$/.test(arabic.trim()) ? 'sentence' : arabic.trim().includes(' ') ? 'phrase' : 'word');

export type QuizPool = { arabic: string[]; meanings: string[]; shape: Shape[] };

export function buildQuizPool(topics: readonly QuizTopic[]): QuizPool {
  const items = topics.flatMap((topic) => topic.flat());
  return { arabic: items.map(([arabic]) => arabic), meanings: items.map(([, , meaning]) => meaning), shape: items.map(([arabic]) => shapeOf(arabic)) };
}

function ask(kind: Kind, item: QuizItem, pool: QuizPool, random: () => number): ChoiceQuestion | null {
  const [arabic, transliteration, meaning] = item;
  // Distractors keep the answer's shape: words against words, phrases against phrases, sentences against sentences.
  const shape = shapeOf(arabic);
  const sameShape = (values: string[]) => values.filter((_, index) => pool.shape[index] === shape);
  if (kind === 'spelling') {
    const variants = spellingVariants(arabic, random);
    if (variants.length >= 2) return buildChoiceQuestion(`Tulisan Arab yang benar untuk "${transliteration}" (${meaning}) adalah...`, arabic, variants, random);
    return ask('arabic', item, pool, random);
  }
  if (kind === 'reading') {
    const variants = readingVariants(transliteration, random);
    if (variants.length >= 2) return buildChoiceQuestion(`Bacaan yang tepat untuk「${arabic}」adalah...`, transliteration, variants, random);
    return ask('meaning', item, pool, random);
  }
  if (kind === 'arabic') return buildChoiceQuestion(`Ungkapan Arab untuk "${meaning}" adalah...`, arabic, sameShape(pool.arabic), random);
  if (kind === 'heard') return buildChoiceQuestion(`Kamu mendengar: "${transliteration}". Artinya...`, meaning, sameShape(pool.meanings), random);
  return buildChoiceQuestion(`Arti「${arabic}」adalah...`, meaning, sameShape(pool.meanings), random);
}

function authoredQuestion(item: QuizItem, random: () => number): ChoiceQuestion | null {
  const authored = item[3];
  if (!authored) return null;
  const [prompt, answer, ...wrong] = authored;
  return { question: prompt, answer, options: seededShuffle([answer, ...wrong], random) };
}

/** 30 questions (10 per level) for one practice topic, all built from that topic's own items. */
export function buildArabicTopicQuiz(skill: ArabicQuizSkill, topicId: string, topic: QuizTopic, pool: QuizPool): VocabQuestion[] {
  const random = seededRandom(hashSeed('arabic-latihan', skill, topicId));
  const kinds = kindsBySkill[skill];
  return LEVELS.flatMap((level, levelIndex) => {
    const items = topic[levelIndex];
    const seen = new Set<string>();
    const picked: ChoiceQuestion[] = [];
    const add = (question: ChoiceQuestion | null) => {
      if (!question || seen.has(question.question) || picked.length >= QUESTIONS_PER_LEVEL) return;
      seen.add(question.question);
      picked.push(question);
    };
    items.forEach((item) => add(authoredQuestion(item, random)));
    // Round-robin over kinds so every item is asked in several ways; a repeat falls back to another kind.
    kinds.forEach((_, round) => items.forEach((item, index) => {
      const preferred = kinds[(index + round) % kinds.length];
      for (const kind of [preferred, ...BACKUP_KINDS]) {
        const question = ask(kind, item, pool, random);
        if (question && !seen.has(question.question)) return add(question);
      }
    }));
    return picked.map((question, index) => ({
      id: `${topicId}-${level.toLowerCase()}-${index + 1}`,
      level,
      prompt: question.question,
      answer: question.answer,
      options: question.options,
    }));
  });
}
