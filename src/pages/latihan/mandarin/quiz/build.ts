import { buildChoiceQuestion, hashSeed, seededRandom, seededShuffle, type ChoiceQuestion } from '../../../../utils/quiz';
import type { QuizLevel, VocabQuestion } from '../../components/PracticeQuizPage';
import type { MandarinQuizSkill, QuizItem, QuizTopic } from './types';

type Kind = 'meaning' | 'hanzi' | 'heard' | 'pinyin' | 'writing';

// Question types per skill, most characteristic first.
const kindsBySkill: Record<MandarinQuizSkill, Kind[]> = {
  pinyin: ['pinyin', 'heard', 'meaning'],
  cihui: ['meaning', 'hanzi', 'pinyin'],
  yufa: ['hanzi', 'meaning', 'writing'],
  tingli: ['heard', 'meaning', 'pinyin'],
  kouyu: ['hanzi', 'heard', 'meaning'],
  yuedu: ['meaning', 'pinyin', 'heard'],
  xiezuo: ['writing', 'hanzi', 'meaning'],
};

export const QUESTIONS_PER_LEVEL = 10;
const BACKUP_KINDS: Kind[] = ['meaning', 'hanzi', 'heard', 'pinyin'];
const LEVELS: QuizLevel[] = ['Basic', 'Intermediate', 'Advanced'];

// Each vowel with its four tone marks (index 0 = tone 1).
const TONE_MARKS = ['āáǎà', 'ēéěè', 'īíǐì', 'ōóǒò', 'ūúǔù', 'ǖǘǚǜ', 'ĀÁǍÀ', 'ĒÉĚÈ', 'ŌÓǑÒ'];
const toneOf = (char: string) => {
  for (const marks of TONE_MARKS) {
    const tone = marks.indexOf(char);
    if (tone >= 0) return { marks, tone };
  }
  return null;
};
const PLAIN_VOWELS = /[aeiouüAEIOU]/;
const isVowel = (char: string | undefined) => !!char && (PLAIN_VOWELS.test(char) || !!toneOf(char));
const WORD_END = "(?=[\\s,.?!:']|$)";

/** Wrong pinyin for the same Hanzi: one syllable in a different tone, or a commonly confused initial/final. */
export function pinyinVariants(pinyin: string, random: () => number): string[] {
  const edits: Array<(text: string) => string> = [];
  [...pinyin].forEach((char, index) => {
    const found = toneOf(char);
    if (!found) return;
    const before = pinyin[index - 1]?.toLowerCase();
    const after = pinyin[index + 1];
    // 不 and 一 change tone in speech, so a changed tone there would not be clearly wrong.
    if (before === 'b' && found.tone !== 0 && !isVowel(after)) return;
    if (before === 'y' && 'īíì'.includes(char.toLowerCase()) && after !== 'n' && !isVowel(after)) return;
    [0, 1, 2, 3].forEach((tone) => {
      // Third tone often sounds rising before another third tone (sandhi); never offer that as "wrong".
      if (tone === found.tone || (found.tone === 2 && tone === 1)) return;
      edits.push((text) => text.slice(0, index) + found.marks[tone] + text.slice(index + 1));
    });
  });
  edits.push(
    (text) => text.replace(/zh/, 'z'),
    (text) => text.replace(/sh/, 's'),
    (text) => text.replace(/ch/, 'c'),
    (text) => text.replace(/x/, 'sh'),
    (text) => text.replace(/q/, 'ch'),
    (text) => text.replace(/j/, 'zh'),
    (text) => text.replace(new RegExp(`([aāáǎàeēéěè])ng${WORD_END}`), '$1n'),
    (text) => text.replace(new RegExp(`([aāáǎàeēéěè])n${WORD_END}`), '$1ng'),
    (text) => text.replace(new RegExp(`([iīíǐì])ng${WORD_END}`), '$1n'),
    (text) => text.replace(new RegExp(`([iīíǐì])n${WORD_END}`), '$1ng'),
  );
  const variants = new Set<string>();
  seededShuffle(edits, random).forEach((edit) => {
    const variant = edit(pinyin);
    if (variant !== pinyin && variants.size < 3) variants.add(variant);
  });
  return [...variants];
}

// Characters learners mix up: look-alikes and same-sound characters. Swapping one makes a plausible miswriting.
const CHARACTER_SWAPS: Array<[string, string]> = [
  ['己', '已'], ['人', '入'], ['大', '太'], ['天', '夫'], ['未', '末'], ['土', '士'], ['日', '目'],
  ['买', '卖'], ['在', '再'], ['做', '作'], ['那', '哪'], ['午', '牛'], ['王', '玉'], ['木', '本'],
  ['休', '体'], ['问', '间'], ['们', '门'], ['吗', '妈'], ['是', '事'], ['见', '贝'], ['字', '子'],
  ['坐', '座'], ['几', '九'], ['喝', '渴'], ['气', '汽'], ['晴', '睛'], ['请', '清'], ['话', '活'],
  ['的', '得'], ['很', '狠'], ['住', '往'], ['认', '队'], ['语', '话'], ['朋', '明'],
  ['我', '找'], ['开', '升'], ['儿', '几'], ['今', '令'], ['学', '字'], ['生', '先'], ['爸', '把'],
  ['吃', '乞'], ['饭', '板'], ['米', '来'], ['水', '永'], ['电', '由'], ['车', '东'],
  ['里', '理'], ['块', '快'], ['钱', '线'], ['冷', '玲'], ['热', '执'], ['医', '区'], ['姐', '组'],
];

/** Wrong Hanzi for the same word or sentence: one character replaced by a look-alike or homophone. */
export function writingVariants(hanzi: string, random: () => number): string[] {
  const edits: Array<(text: string) => string> = CHARACTER_SWAPS.flatMap(([a, b]) => [
    (text: string) => text.replace(a, b),
    (text: string) => text.replace(b, a),
  ]);
  const variants = new Set<string>();
  seededShuffle(edits, random).forEach((edit) => {
    const variant = edit(hanzi);
    if (variant !== hanzi && variants.size < 3) variants.add(variant);
  });
  return [...variants];
}

type Shape = 'word' | 'phrase' | 'sentence';
const shapeOf = ([hanzi, pinyin]: QuizItem): Shape => (/[。？！?!.]$/.test(hanzi.trim()) ? 'sentence' : pinyin.trim().includes(' ') ? 'phrase' : 'word');

export type QuizPool = { hanzi: string[]; meanings: string[]; shape: Shape[] };

export function buildQuizPool(topics: readonly QuizTopic[]): QuizPool {
  const items = topics.flatMap((topic) => topic.flat());
  return { hanzi: items.map(([hanzi]) => hanzi), meanings: items.map(([, , meaning]) => meaning), shape: items.map(shapeOf) };
}

function ask(kind: Kind, item: QuizItem, pool: QuizPool, random: () => number): ChoiceQuestion | null {
  const [hanzi, pinyin, meaning] = item;
  // Distractors keep the answer's shape: words against words, phrases against phrases, sentences against sentences.
  const shape = shapeOf(item);
  // A distractor never shares the answer's meaning, so only one option can be right.
  const sameShape = (values: string[]) => values.filter((_, index) => pool.shape[index] === shape && pool.meanings[index] !== meaning);
  if (kind === 'writing') {
    const variants = writingVariants(hanzi, random);
    if (variants.length >= 2) return buildChoiceQuestion(`Hanzi yang benar untuk "${pinyin}" (${meaning}) adalah...`, hanzi, variants, random);
    return ask('hanzi', item, pool, random);
  }
  if (kind === 'pinyin') {
    const variants = pinyinVariants(pinyin, random);
    if (variants.length >= 2) return buildChoiceQuestion(`Pinyin yang tepat untuk「${hanzi}」adalah...`, pinyin, variants, random);
    return ask('meaning', item, pool, random);
  }
  if (kind === 'hanzi') return buildChoiceQuestion(`Bahasa Mandarin untuk "${meaning}" adalah...`, hanzi, sameShape(pool.hanzi), random);
  if (kind === 'heard') return buildChoiceQuestion(`Kamu mendengar: "${pinyin}". Artinya...`, meaning, sameShape(pool.meanings), random);
  return buildChoiceQuestion(`Arti「${hanzi}」adalah...`, meaning, sameShape(pool.meanings), random);
}

function authoredQuestion(item: QuizItem, random: () => number): ChoiceQuestion | null {
  const authored = item[3];
  if (!authored) return null;
  const [prompt, answer, ...wrong] = authored;
  return { question: prompt, answer, options: seededShuffle([answer, ...wrong], random) };
}

/** 30 questions (10 per level) for one practice topic, all built from that topic's own items. */
export function buildMandarinTopicQuiz(skill: MandarinQuizSkill, topicId: string, topic: QuizTopic, pool: QuizPool): VocabQuestion[] {
  const random = seededRandom(hashSeed('mandarin-latihan', skill, topicId));
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
