import { buildChoiceQuestion, seededRandom, seededShuffle, type ChoiceQuestion } from '../../../utils/quiz';
import type { MandarinSkillId } from './mandarinModuleData';

export type PracticeSentence = { hanzi: string; pinyin: string; meaning: string };
export type PracticeWord = { hanzi: string; pinyin: string; meaning: string };

export type PracticeMaterial = {
  /** Sentences that belong to this lesson number only. */
  sentences: PracticeSentence[];
  /** Words that belong to this lesson number only. */
  words: PracticeWord[];
  /** Level-wide pools used for distractors. */
  levelSentences: PracticeSentence[];
  levelWords: PracticeWord[];
};

const TONES: Record<string, string[]> = {
  a: ['ā', 'á', 'ǎ', 'à'], e: ['ē', 'é', 'ě', 'è'], i: ['ī', 'í', 'ǐ', 'ì'],
  o: ['ō', 'ó', 'ǒ', 'ò'], u: ['ū', 'ú', 'ǔ', 'ù'], ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
};
const TONED = new Map<string, [base: string, tone: number]>(
  Object.entries(TONES).flatMap(([base, marks]) => marks.map((mark, tone) => [mark, [base, tone]] as [string, [string, number]])),
);
const PUNCTUATION = /^[\s，。？！、；：“”‘’（）…—,.?!;:'"()]+$/;

/** Moves one tone-marked vowel to a different tone (a near-miss pinyin distractor). */
function shiftTone(pinyin: string, random: () => number): string | null {
  const positions = [...pinyin].flatMap((char, index) => (TONED.has(char) ? [index] : []));
  if (positions.length === 0) return null;
  const chars = [...pinyin];
  const index = positions[Math.floor(random() * positions.length)];
  const [base, tone] = TONED.get(chars[index])!;
  const others = [0, 1, 2, 3].filter((item) => item !== tone);
  chars[index] = TONES[base][others[Math.floor(random() * others.length)]];
  return chars.join('');
}

function toneVariants(pinyin: string, random: () => number, count = 3): string[] {
  const variants = new Set<string>();
  for (let attempt = 0; attempt < 24 && variants.size < count; attempt += 1) {
    let variant = shiftTone(pinyin, random);
    // Longer strings get a second change so the distractor is not a one-letter diff at random.
    if (variant && pinyin.length > 12 && random() < 0.5) variant = shiftTone(variant, random);
    if (variant && variant !== pinyin) variants.add(variant);
  }
  return [...variants];
}

const segmenter = typeof Intl !== 'undefined' && 'Segmenter' in Intl ? new Intl.Segmenter('zh', { granularity: 'word' }) : null;

/** Word-order distractors: swap two neighbouring words (punctuation stays put). */
function scrambledOrders(hanzi: string, random: () => number): string[] {
  if (!segmenter) return [];
  const parts = [...segmenter.segment(hanzi)].map((item) => item.segment);
  const movable = parts.flatMap((part, index) => (PUNCTUATION.test(part) ? [] : [index]));
  const pairs = movable.slice(0, -1).flatMap((index, position) => (movable[position + 1] === index + 1 ? [index] : []));
  const results = new Set<string>();
  seededShuffle(pairs, random).forEach((index) => {
    const swapped = [...parts];
    [swapped[index], swapped[index + 1]] = [swapped[index + 1], swapped[index]];
    const joined = swapped.join('');
    if (joined !== hanzi) results.add(joined);
  });
  return [...results].slice(0, 3);
}

type Generator = (material: PracticeMaterial, random: () => number) => ChoiceQuestion | null;

const sentenceMeaning = (index: number): Generator => ({ sentences, levelSentences }, random) => {
  const sentence = sentences[index];
  if (!sentence) return null;
  return buildChoiceQuestion(`Arti kalimat「${sentence.hanzi}」adalah...`, sentence.meaning, levelSentences.map((item) => item.meaning), random);
};

const sentenceForMeaning = (index: number): Generator => ({ sentences, levelSentences }, random) => {
  const sentence = sentences[index];
  if (!sentence) return null;
  return buildChoiceQuestion(`Kalimat Mandarin untuk "${sentence.meaning}" adalah...`, sentence.hanzi, levelSentences.map((item) => item.hanzi), random);
};

const sentencePinyin = (index: number): Generator => ({ sentences }, random) => {
  const sentence = sentences[index];
  if (!sentence?.pinyin) return null;
  return buildChoiceQuestion(`Pinyin dengan nada yang benar untuk「${sentence.hanzi}」adalah...`, sentence.pinyin, toneVariants(sentence.pinyin, random), random);
};

const fillBlank = (index: number): Generator => ({ sentences, words, levelWords }, random) => {
  const sentence = sentences[index];
  if (!sentence) return null;
  const candidates = [...words, ...[...levelWords].sort((a, b) => b.hanzi.length - a.hanzi.length)];
  const target = candidates.find((word) => word.hanzi.length >= 2 && sentence.hanzi.includes(word.hanzi))
    ?? candidates.find((word) => sentence.hanzi.includes(word.hanzi));
  if (!target) return null;
  const sameLength = levelWords.filter((word) => word.hanzi.length === target.hanzi.length).map((word) => word.hanzi);
  const pool = sameLength.length >= 3 ? sameLength : levelWords.map((word) => word.hanzi);
  const blanked = sentence.hanzi.replace(target.hanzi, '＿＿');
  return buildChoiceQuestion(`Lengkapi kalimat: ${blanked} (${sentence.meaning})`, target.hanzi, pool, random);
};

const wordOrder = (index: number): Generator => ({ sentences }, random) => {
  const sentence = sentences[index];
  if (!sentence) return null;
  const distractors = scrambledOrders(sentence.hanzi, random);
  if (distractors.length < 2) return null;
  return buildChoiceQuestion(`Susunan kata yang benar untuk "${sentence.meaning}" adalah...`, sentence.hanzi, distractors, random);
};

const wordForMeaning = (index: number): Generator => ({ words, levelWords }, random) => {
  const word = words[index];
  if (!word) return null;
  return buildChoiceQuestion(`Kata Mandarin untuk "${word.meaning}" adalah...`, word.hanzi, levelWords.map((item) => item.hanzi), random);
};

const wordTone = (index: number): Generator => ({ words }, random) => {
  const word = words[index];
  if (!word?.pinyin) return null;
  return buildChoiceQuestion(`Pinyin dengan nada yang benar untuk ${word.hanzi} adalah...`, word.pinyin, toneVariants(word.pinyin, random), random);
};

const wordMeaning = (index: number): Generator => ({ words, levelWords }, random) => {
  const word = words[index];
  if (!word) return null;
  return buildChoiceQuestion(`Dalam lesson ini, ${word.hanzi} berarti...`, word.meaning, levelWords.map((item) => item.meaning), random);
};

// Each skill asks about different sentences/words of the lesson (no generator
// is used by two skills), so the seven skill lessons that share a lesson
// number never repeat a question.
const skillPlan: Record<MandarinSkillId, Generator[]> = {
  grammar: [wordOrder(0), fillBlank(1), wordOrder(2), wordOrder(3), fillBlank(5)],
  speaking: [sentencePinyin(1), sentenceForMeaning(2), wordOrder(1), sentenceForMeaning(4)],
  listening: [sentenceForMeaning(0), sentenceMeaning(2), sentenceForMeaning(1), sentenceMeaning(5)],
  reading: [sentenceMeaning(0), sentenceMeaning(1), wordMeaning(3), wordMeaning(4), sentenceMeaning(3)],
  writing: [fillBlank(0), fillBlank(2), wordForMeaning(4), fillBlank(4), wordOrder(5)],
  vocabulary: [wordForMeaning(0), wordForMeaning(1), wordForMeaning(2), wordForMeaning(3), wordMeaning(5), fillBlank(3)],
  pronunciation: [wordTone(0), wordTone(1), sentencePinyin(0), wordTone(2), sentencePinyin(2), sentencePinyin(4)],
};

export function buildLessonPractice(skillId: MandarinSkillId, material: PracticeMaterial, seed: number): ChoiceQuestion[] {
  const random = seededRandom(seed);
  const seen = new Set<string>();
  return skillPlan[skillId]
    .map((generate) => generate(material, random))
    .filter((question): question is ChoiceQuestion => {
      if (!question || seen.has(question.question)) return false;
      seen.add(question.question);
      return true;
    });
}
