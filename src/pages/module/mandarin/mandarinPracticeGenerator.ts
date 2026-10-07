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

// 不 and 一 change tone by context (bù/bú, yī/yí/yì); a distractor that only
// differs there could still be read as correct, so such variants are skipped.
const sandhiFree = (pinyin: string) => pinyin.toLowerCase().replace(/\bb[ùú]/g, 'bu').replace(/\by[īíì]/g, 'yi');

export function toneVariants(pinyin: string, random: () => number, count = 3): string[] {
  const variants = new Set<string>();
  const base = sandhiFree(pinyin);
  for (let attempt = 0; attempt < 24 && variants.size < count; attempt += 1) {
    let variant = shiftTone(pinyin, random);
    // Longer strings get a second change so the distractor is not a one-letter diff at random.
    if (variant && pinyin.length > 12 && random() < 0.5) variant = shiftTone(variant, random);
    if (variant && variant !== pinyin && sandhiFree(variant) !== base) variants.add(variant);
  }
  return [...variants];
}

const segmenter = typeof Intl !== 'undefined' && 'Segmenter' in Intl ? new Intl.Segmenter('zh', { granularity: 'word' }) : null;

/** Word-order distractors: swap two neighbouring words (punctuation stays put). */
export function scrambledOrders(hanzi: string, random: () => number): string[] {
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

const heardMeaning = (index: number): Generator => ({ sentences, levelSentences }, random) => {
  const sentence = sentences[index];
  if (!sentence?.pinyin) return null;
  return buildChoiceQuestion(`Kamu mendengar: "${sentence.pinyin}" Artinya...`, sentence.meaning, levelSentences.map((item) => item.meaning), random);
};

const wordInSentence = (index: number): Generator => ({ sentences, words, levelSentences }, random) => {
  const word = words[index];
  if (!word) return null;
  const sentence = sentences.find((item) => item.hanzi.includes(word.hanzi));
  if (!sentence) return null;
  const pool = levelSentences.filter((item) => !item.hanzi.includes(word.hanzi)).map((item) => item.hanzi);
  return buildChoiceQuestion(`Kalimat mana yang memakai kata「${word.hanzi}」(${word.meaning})?`, sentence.hanzi, pool, random);
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
  grammar: [wordOrder(0), fillBlank(1), wordOrder(2), wordOrder(3), fillBlank(5), wordOrder(4), wordInSentence(0), wordInSentence(1)],
  speaking: [sentencePinyin(1), sentenceForMeaning(2), wordOrder(1), sentenceForMeaning(4), sentenceForMeaning(3), sentencePinyin(3), sentenceForMeaning(5)],
  listening: [sentenceForMeaning(0), sentenceMeaning(2), sentenceForMeaning(1), sentenceMeaning(5), heardMeaning(0), heardMeaning(1), heardMeaning(3), heardMeaning(4)],
  reading: [sentenceMeaning(0), sentenceMeaning(1), wordMeaning(3), wordMeaning(4), sentenceMeaning(3), sentenceMeaning(4), wordMeaning(0), wordInSentence(2)],
  writing: [fillBlank(0), fillBlank(2), wordForMeaning(4), fillBlank(4), wordOrder(5), wordForMeaning(5), wordInSentence(3)],
  vocabulary: [wordForMeaning(0), wordForMeaning(1), wordForMeaning(2), wordForMeaning(3), wordMeaning(5), fillBlank(3), wordMeaning(1), wordMeaning(2), wordInSentence(4), wordInSentence(5)],
  pronunciation: [wordTone(0), wordTone(1), sentencePinyin(0), wordTone(2), sentencePinyin(2), sentencePinyin(4), wordTone(3), wordTone(4), wordTone(5), sentencePinyin(5), heardMeaning(2), heardMeaning(5)],
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

type WordDrill = (word: PracticeWord, material: PracticeMaterial, random: () => number, used: Set<string>) => ChoiceQuestion | null;

const sameLengthHanzi = (word: PracticeWord, levelWords: PracticeWord[]) => {
  const same = levelWords.filter((item) => item.hanzi.length === word.hanzi.length).map((item) => item.hanzi);
  return same.length >= 3 ? same : levelWords.map((item) => item.hanzi);
};

// Grammar's own fillBlank uses sentences 1 and 5, so the drill blanks other sentences,
// each only once so one blank never shows the answer to another.
const wordDrills: Record<MandarinSkillId, WordDrill> = {
  grammar: (word, { sentences, levelSentences, levelWords }, random, used) => {
    const sentence = [...sentences.filter((_, index) => index !== 1 && index !== 5), ...levelSentences]
      .find((item) => item.hanzi.includes(word.hanzi) && !used.has(item.hanzi));
    if (sentence) used.add(sentence.hanzi);
    if (!sentence) return buildChoiceQuestion(`Kata kunci untuk konsep "${word.meaning}" adalah...`, word.hanzi, sameLengthHanzi(word, levelWords), random);
    return buildChoiceQuestion(`Kata yang tepat untuk「${sentence.hanzi.replace(word.hanzi, '＿＿')}」adalah... (${sentence.meaning})`, word.hanzi, sameLengthHanzi(word, levelWords), random);
  },
  speaking: (word, { levelWords }, random) =>
    buildChoiceQuestion(`Saat berdiskusi, kata「${word.hanzi}」dipakai untuk menyatakan...`, word.meaning, levelWords.map((item) => item.meaning), random),
  listening: (word, { levelWords }, random) =>
    buildChoiceQuestion(`Kamu mendengar kata "${word.pinyin}". Artinya...`, word.meaning, levelWords.map((item) => item.meaning), random),
  reading: (word, { levelWords }, random) =>
    buildChoiceQuestion(`Kata yang dibaca "${word.pinyin}" ditulis...`, word.hanzi, sameLengthHanzi(word, levelWords), random),
  writing: (word, { levelWords }, random) =>
    buildChoiceQuestion(`Tulis dalam Hanzi kata yang berarti "${word.meaning}".`, word.hanzi, sameLengthHanzi(word, levelWords), random),
  vocabulary: (word, { levelWords }, random) =>
    buildChoiceQuestion(`Pinyin kata「${word.hanzi}」adalah...`, word.pinyin, levelWords.map((item) => item.pinyin), random),
  pronunciation: (word, { levelWords }, random) =>
    buildChoiceQuestion(`Kamu mendengar "${word.pinyin}". Kata yang diucapkan adalah...`, word.hanzi, sameLengthHanzi(word, levelWords), random),
};

const sayIt = (index: number): Generator => ({ sentences, levelSentences }, random) => {
  const sentence = sentences[index];
  if (!sentence) return null;
  return buildChoiceQuestion(`Untuk menyampaikan "${sentence.meaning}", kamu berkata...`, sentence.hanzi, levelSentences.map((item) => item.hanzi), random);
};

const readPinyin = (index: number): Generator => ({ sentences, levelSentences }, random) => {
  const sentence = sentences[index];
  if (!sentence?.pinyin) return null;
  return buildChoiceQuestion(`Kalimat yang dibaca "${sentence.pinyin}" ditulis...`, sentence.hanzi, levelSentences.map((item) => item.hanzi), random);
};

const dictation = (index: number): Generator => ({ sentences, levelSentences }, random) => {
  const sentence = sentences[index];
  if (!sentence?.pinyin) return null;
  return buildChoiceQuestion(`Dikte: tulis kalimat yang dibacakan "${sentence.pinyin}"`, sentence.hanzi, levelSentences.map((item) => item.hanzi), random);
};

const spotWord = (index: number): Generator => ({ sentences, words, levelWords }, random) => {
  const sentence = sentences[index];
  const word = sentence && words.find((item) => sentence.hanzi.includes(item.hanzi));
  if (!sentence || !word) return null;
  const pool = levelWords.filter((item) => !sentence.hanzi.includes(item.hanzi)).map((item) => item.hanzi);
  return buildChoiceQuestion(`Kosakata tema yang muncul dalam「${sentence.hanzi}」adalah...`, word.hanzi, pool, random);
};

// Sentence questions in forms each skill's plan does not use yet, so a lesson
// with only four theme words still fills its drill with its own material.
const drillExtras: Record<MandarinSkillId, Generator[]> = {
  grammar: [],
  speaking: [sayIt(0), sayIt(1)],
  listening: [],
  reading: [readPinyin(2), readPinyin(5)],
  writing: [dictation(1), dictation(3), dictation(5), dictation(0)],
  vocabulary: [spotWord(0), spotWord(1), spotWord(2)],
  pronunciation: [],
};

/**
 * One question per lesson word, in a form that belongs to the skill, so the
 * seven skill lessons sharing a theme drill its words in seven different ways.
 */
export function buildWordDrill(skillId: MandarinSkillId, material: PracticeMaterial, seed: number): ChoiceQuestion[] {
  const random = seededRandom(seed);
  const used = new Set<string>();
  return [
    ...material.words.map((word) => wordDrills[skillId](word, material, random, used)),
    ...drillExtras[skillId].map((generate) => generate(material, random)),
  ]
    .filter((question): question is ChoiceQuestion => question !== null);
}
