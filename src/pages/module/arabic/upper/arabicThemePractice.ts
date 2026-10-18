import { buildChoiceQuestion, seededRandom, seededShuffle, type ChoiceQuestion } from '../../../../utils/quiz';
import type { ArabicSkillId } from '../arabicModuleData';

export type ThemeSentence = { arabic: string; transliteration: string; meaning: string };
export type ThemeWord = { arabic: string; transliteration: string; meaning: string };

export type ThemePracticeMaterial = {
  /** Theme sentences first (sentence k uses word k), then the lesson passage. */
  sentences: ThemeSentence[];
  /** The lesson's theme words. */
  words: ThemeWord[];
  /** Level-wide pools used for distractors. */
  levelSentences: ThemeSentence[];
  levelWords: ThemeWord[];
  /** Number of leading sentences that pair with words[k]. */
  pairedSentences: number;
};

const TRAILING = /([.؟!،,?]+)$/;

/** Word-order distractors: swap two neighbouring words (final punctuation stays put). */
export function scrambledOrders(arabic: string, random: () => number): string[] {
  const match = arabic.match(TRAILING);
  const end = match?.[1] ?? '';
  const words = arabic.slice(0, arabic.length - end.length).split(/\s+/).filter(Boolean);
  if (words.length < 4) return [];
  const results = new Set<string>();
  seededShuffle(words.slice(0, -1).map((_, index) => index), random).forEach((index) => {
    const swapped = [...words];
    [swapped[index], swapped[index + 1]] = [swapped[index + 1], swapped[index]];
    const joined = `${swapped.join(' ')}${end}`;
    if (joined !== arabic) results.add(joined);
  });
  return [...results].slice(0, 3);
}

type Generator = (material: ThemePracticeMaterial, random: () => number) => ChoiceQuestion | null;

const sentenceMeaning = (index: number): Generator => ({ sentences, levelSentences }, random) => {
  const sentence = sentences[index];
  if (!sentence) return null;
  return buildChoiceQuestion(`Arti kalimat「${sentence.arabic}」adalah...`, sentence.meaning, levelSentences.map((item) => item.meaning), random);
};

const heardMeaning = (index: number): Generator => ({ sentences, levelSentences }, random) => {
  const sentence = sentences[index];
  if (!sentence) return null;
  return buildChoiceQuestion(`Kamu mendengar: "${sentence.transliteration}". Artinya...`, sentence.meaning, levelSentences.map((item) => item.meaning), random);
};

const sentenceForMeaning = (index: number): Generator => ({ sentences, levelSentences }, random) => {
  const sentence = sentences[index];
  if (!sentence) return null;
  return buildChoiceQuestion(`Kalimat Arab untuk "${sentence.meaning}" adalah...`, sentence.arabic, levelSentences.map((item) => item.arabic), random);
};

const sentenceReading = (index: number): Generator => ({ sentences, levelSentences }, random) => {
  const sentence = sentences[index];
  if (!sentence) return null;
  return buildChoiceQuestion(`Bacaan latin yang tepat untuk「${sentence.arabic}」adalah...`, sentence.transliteration, levelSentences.map((item) => item.transliteration), random);
};

const wordOrder = (index: number): Generator => ({ sentences }, random) => {
  const sentence = sentences[index];
  if (!sentence) return null;
  const distractors = scrambledOrders(sentence.arabic, random);
  if (distractors.length < 2) return null;
  return buildChoiceQuestion(`Susunan kalimat yang benar untuk "${sentence.meaning}" adalah...`, sentence.arabic, distractors, random);
};

const themeWordInSentence = (index: number): Generator => ({ sentences, words, levelWords, pairedSentences }, random) => {
  const sentence = sentences[index];
  const word = words[index];
  if (!sentence || !word || index >= pairedSentences) return null;
  return buildChoiceQuestion(`Istilah tema apa yang dipakai dalam kalimat「${sentence.arabic}」?`, word.arabic, levelWords.map((item) => item.arabic), random);
};

const wordInContext = (index: number): Generator => ({ sentences, words, levelWords, pairedSentences }, random) => {
  const sentence = sentences[index];
  const word = words[index];
  if (!sentence || !word || index >= pairedSentences) return null;
  return buildChoiceQuestion(`Dalam kalimat「${sentence.arabic}」, istilah「${word.arabic}」berarti...`, word.meaning, levelWords.map((item) => item.meaning), random);
};

const wordForMeaning = (index: number): Generator => ({ words, levelWords }, random) => {
  const word = words[index];
  if (!word) return null;
  return buildChoiceQuestion(`Istilah Arab untuk "${word.meaning}" adalah...`, word.arabic, levelWords.map((item) => item.arabic), random);
};

const wordReading = (index: number): Generator => ({ words, levelWords }, random) => {
  const word = words[index];
  if (!word) return null;
  return buildChoiceQuestion(`Cara membaca「${word.arabic}」adalah...`, word.transliteration, levelWords.map((item) => item.transliteration), random);
};

// Each skill asks different things about the lesson's theme sentences and
// words, so the seven skills that share a lesson number rarely repeat.
// Sentences 0-2 are theme sentences, 3-8 come from the lesson passage; every
// (generator, index) pair belongs to one skill only.
const skillPlan: Record<ArabicSkillId, Generator[]> = {
  mufradat: [wordForMeaning(0), wordForMeaning(1), wordForMeaning(2), wordForMeaning(3), themeWordInSentence(0), wordInContext(1)],
  qiraah: [sentenceMeaning(0), sentenceMeaning(1), wordInContext(2), sentenceMeaning(4), sentenceMeaning(5), sentenceMeaning(6), sentenceMeaning(7), sentenceMeaning(8)],
  istima: [heardMeaning(0), heardMeaning(1), heardMeaning(2), heardMeaning(5), heardMeaning(3), heardMeaning(6), heardMeaning(4), heardMeaning(7), heardMeaning(8)],
  kalam: [sentenceForMeaning(0), sentenceForMeaning(1), sentenceForMeaning(2), sentenceForMeaning(3), sentenceForMeaning(4), sentenceForMeaning(5), sentenceForMeaning(6), sentenceForMeaning(7), sentenceForMeaning(8)],
  kitabah: [wordOrder(0), themeWordInSentence(1), themeWordInSentence(2), wordOrder(3), wordOrder(5), wordOrder(8)],
  grammar: [wordOrder(1), wordOrder(2), wordInContext(0), wordOrder(4), wordOrder(6), wordOrder(7)],
  pronunciation: [wordReading(0), wordReading(1), wordReading(2), wordReading(3), sentenceReading(0), sentenceReading(1), sentenceReading(2), sentenceReading(3), sentenceReading(4), sentenceReading(5), sentenceReading(6), sentenceReading(7), sentenceReading(8)],
};

export function buildArabicThemePractice(skillId: ArabicSkillId, material: ThemePracticeMaterial, seed: number): ChoiceQuestion[] {
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

const HARAKAT_SWAP: Record<string, string[]> = { '\u064E': ['\u0650', '\u064F'], '\u0650': ['\u064E', '\u064F'], '\u064F': ['\u064E', '\u0650'] };

/** Spelling distractors: the same word with one short vowel changed. */
export function harakatVariants(arabic: string, random: () => number, count = 3): string[] {
  const positions = [...arabic].flatMap((char, index) => (HARAKAT_SWAP[char] ? [index] : []));
  const variants = new Set<string>();
  for (let attempt = 0; attempt < 24 && positions.length && variants.size < count; attempt += 1) {
    const chars = [...arabic];
    const index = positions[Math.floor(random() * positions.length)];
    const options = HARAKAT_SWAP[chars[index]];
    chars[index] = options[Math.floor(random() * options.length)];
    const variant = chars.join('');
    if (variant !== arabic) variants.add(variant);
  }
  return [...variants];
}

type WordDrill = (word: ThemeWord, index: number, material: ThemePracticeMaterial, random: () => number) => ChoiceQuestion | null;

// The theme words drilled in a form that belongs to each skill, so the seven
// skills sharing a theme never ask the same word question. Grammar and
// pronunciation already cover the words in their own plans.
const wordDrills: Partial<Record<ArabicSkillId, WordDrill>> = {
  mufradat: (word, _index, { levelWords }, random) =>
    buildChoiceQuestion(`Apa arti「${word.arabic}」(${word.transliteration})?`, word.meaning, levelWords.map((item) => item.meaning), random),
  istima: (word, _index, { levelWords }, random) =>
    buildChoiceQuestion(`Kamu mendengar istilah "${word.transliteration}". Artinya...`, word.meaning, levelWords.map((item) => item.meaning), random),
  kalam: (word, _index, { levelWords }, random) =>
    buildChoiceQuestion(`Lawan bicaramu menyebut "${word.transliteration}". Istilah yang ia ucapkan adalah...`, word.arabic, levelWords.map((item) => item.arabic), random),
  qiraah: (word, index, { sentences, levelSentences, pairedSentences }, random) => {
    const sentence = index < pairedSentences ? sentences[index] : undefined;
    if (!sentence) return null;
    const pool = levelSentences.filter((item) => item.arabic !== sentence.arabic).map((item) => item.arabic);
    return buildChoiceQuestion(`Kalimat mana yang memuat istilah「${word.arabic}」(${word.meaning})?`, sentence.arabic, pool, random);
  },
  kitabah: (word, _index, _material, random) =>
    buildChoiceQuestion(`Penulisan harakat yang benar untuk "${word.meaning}" adalah...`, word.arabic, harakatVariants(word.arabic, random), random),
};

export function buildArabicWordDrill(skillId: ArabicSkillId, material: ThemePracticeMaterial, seed: number): ChoiceQuestion[] {
  const drill = wordDrills[skillId];
  if (!drill) return [];
  const random = seededRandom(seed);
  return material.words
    .map((word, index) => drill(word, index, material, random))
    .filter((question): question is ChoiceQuestion => question !== null);
}
