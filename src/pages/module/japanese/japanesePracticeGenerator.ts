import { buildChoiceQuestion, seededRandom, seededShuffle, type ChoiceQuestion } from '../../../utils/quiz';
import type { JapaneseSentence } from './japaneseGrammarBank';
import type { JapaneseSkillId } from './japaneseModuleData';
import type { JapaneseWord } from './japaneseVocabularyBank';

export type JapanesePracticeMaterial = {
  /** The lesson's grammar pattern and its two examples. */
  pattern: string;
  examples: JapaneseSentence[];
  /** The lesson's signature sentence. */
  signature: JapaneseSentence;
  /** Two reading-passage sentences reserved for this lesson number (no romaji). */
  passage: Array<{ japanese: string; meaning: string }>;
  words: JapaneseWord[];
  /** Level-wide pools used for distractors. */
  levelPatterns: string[];
  levelSentences: Array<{ japanese: string; meaning: string }>;
  levelWords: JapaneseWord[];
};

export const PARTICLES = ['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'も', 'から', 'まで'];
// Pairs that are often both acceptable; never offered against each other.
export const CLOSE: Record<string, string[]> = { は: ['が', 'も'], が: ['は', 'も'], も: ['は', 'が'], に: ['へ'], へ: ['に'] };
export const segmenter = typeof Intl !== 'undefined' && 'Segmenter' in Intl ? new Intl.Segmenter('ja', { granularity: 'word' }) : null;

/** Near-miss romaji: dropped/added small tsu and shortened/lengthened vowels. */
export function romajiVariants(romaji: string, random: () => number): string[] {
  const edits: Array<(text: string) => string> = [
    (text) => text.replace(/(kk|tt|pp|ss|tch)/, (match) => match.slice(1)),
    (text) => text.replace(/([ksp])([aiueo])/, '$1$1$2'),
    (text) => text.replace(/ou/, 'o'),
    (text) => text.replace(/uu/, 'u'),
    (text) => text.replace(/ei/, 'e'),
    (text) => text.replace(/(aa|ii)/, (match) => match[0]),
    (text) => text.replace(/o(?![uo])/, 'ou'),
    (text) => text.replace(/([^u])u(?![u])/, '$1uu'),
    (text) => text.replace(/([aeiou])n([aeiou])/, '$1nn$2'),
  ];
  const variants = new Set<string>();
  seededShuffle(edits, random).forEach((edit) => {
    const variant = edit(romaji);
    if (variant !== romaji) variants.add(variant);
  });
  return [...variants].slice(0, 3);
}

type Generator = (material: JapanesePracticeMaterial, random: () => number) => ChoiceQuestion | null;
type SentenceRef = (material: JapanesePracticeMaterial) => JapaneseSentence | { japanese: string; meaning: string; romaji?: string } | undefined;

const example = (index: number): SentenceRef => (material) => material.examples[index];
const signature: SentenceRef = (material) => material.signature;
const passage = (index: number): SentenceRef => (material) => material.passage[index];

const sentenceMeaning = (ref: SentenceRef): Generator => (material, random) => {
  const sentence = ref(material);
  if (!sentence) return null;
  return buildChoiceQuestion(`Arti kalimat「${sentence.japanese}」adalah...`, sentence.meaning, material.levelSentences.map((item) => item.meaning), random);
};

const heardMeaning = (ref: SentenceRef): Generator => (material, random) => {
  const sentence = ref(material);
  if (!sentence || !('romaji' in sentence) || !sentence.romaji) return null;
  return buildChoiceQuestion(`Kamu mendengar: "${sentence.romaji}". Artinya...`, sentence.meaning, material.levelSentences.map((item) => item.meaning), random);
};

const sentenceForMeaning = (ref: SentenceRef): Generator => (material, random) => {
  const sentence = ref(material);
  if (!sentence) return null;
  return buildChoiceQuestion(`Kalimat Jepang untuk "${sentence.meaning}" adalah...`, sentence.japanese, material.levelSentences.map((item) => item.japanese), random);
};

const sentenceRomaji = (ref: SentenceRef): Generator => (material, random) => {
  const sentence = ref(material);
  if (!sentence || !('romaji' in sentence) || !sentence.romaji) return null;
  const variants = romajiVariants(sentence.romaji, random);
  if (variants.length < 2) return null;
  return buildChoiceQuestion(`Romaji yang tepat untuk「${sentence.japanese}」adalah...`, sentence.romaji, variants, random);
};

const particleBlank = (ref: SentenceRef): Generator => (material, random) => {
  const sentence = ref(material);
  if (!sentence || !segmenter) return null;
  const parts = [...segmenter.segment(sentence.japanese)].map((item) => item.segment);
  const positions = parts.flatMap((part, index) => (index > 0 && PARTICLES.includes(part) ? [index] : []));
  if (!positions.length) return null;
  const position = positions[Math.floor(random() * positions.length)];
  const answer = parts[position];
  const blanked = parts.map((part, index) => (index === position ? '＿' : part)).join('');
  const pool = PARTICLES.filter((item) => item !== answer && !(CLOSE[answer] ?? []).includes(item));
  return buildChoiceQuestion(`Partikel yang tepat: ${blanked} (${sentence.meaning})`, answer, pool, random);
};

const patternInSentence = (index: number): Generator => (material, random) => {
  const sentence = material.examples[index];
  if (!sentence || material.pattern.startsWith('Review')) return null;
  return buildChoiceQuestion(`Pola apa yang dipakai dalam kalimat「${sentence.japanese}」?`, material.pattern, material.levelPatterns, random);
};

const wordMeaning = (index: number): Generator => ({ words, levelWords }, random) => {
  const word = words[index];
  if (!word) return null;
  return buildChoiceQuestion(`Dalam lesson ini,「${word.japanese}」berarti...`, word.meaning, levelWords.map((item) => item.meaning), random);
};

const wordForMeaning = (index: number): Generator => ({ words, levelWords }, random) => {
  const word = words[index];
  if (!word) return null;
  return buildChoiceQuestion(`Tulisan Jepang untuk "${word.meaning}" adalah...`, word.japanese, levelWords.map((item) => item.japanese), random);
};

const wordForRomaji = (index: number): Generator => ({ words, levelWords }, random) => {
  const word = words[index];
  if (!word) return null;
  return buildChoiceQuestion(`Tulis dalam huruf Jepang: "${word.romaji}"`, word.japanese, levelWords.map((item) => item.japanese), random);
};

const heardWord = (index: number): Generator => ({ words, levelWords }, random) => {
  const word = words[index];
  if (!word) return null;
  return buildChoiceQuestion(`Kamu mendengar kata "${word.romaji}". Artinya...`, word.meaning, levelWords.map((item) => item.meaning), random);
};

const wordRomaji = (index: number): Generator => ({ words }, random) => {
  const word = words[index];
  if (!word) return null;
  const variants = romajiVariants(word.romaji, random);
  if (variants.length < 2) return null;
  return buildChoiceQuestion(`Romaji yang tepat untuk「${word.japanese}」adalah...`, word.romaji, variants, random);
};

// Each skill asks different things about the lesson's pattern, sentences and
// words, so the seven skill lessons of one lesson number rarely overlap.
const skillPlan: Record<JapaneseSkillId, Generator[]> = {
  grammar: [particleBlank(example(0)), particleBlank(example(1)), patternInSentence(0), particleBlank(signature), particleBlank(passage(0))],
  speaking: [sentenceForMeaning(example(0)), sentenceForMeaning(signature), sentenceForMeaning(passage(1)), wordForMeaning(3)],
  listening: [heardMeaning(example(0)), heardMeaning(example(1)), heardMeaning(signature), heardWord(4), heardWord(2)],
  reading: [sentenceMeaning(passage(0)), sentenceMeaning(passage(1)), sentenceMeaning(signature), wordMeaning(5)],
  writing: [wordForRomaji(0), wordForRomaji(1), sentenceForMeaning(example(1)), sentenceForMeaning(passage(0)), wordForRomaji(2)],
  vocabulary: [wordMeaning(0), wordMeaning(1), wordMeaning(2), wordForMeaning(4), wordForMeaning(5)],
  pronunciation: [wordRomaji(0), wordRomaji(1), wordRomaji(2), sentenceRomaji(example(0)), sentenceRomaji(signature), wordRomaji(3)],
};

export function buildJapanesePractice(skillId: JapaneseSkillId, material: JapanesePracticeMaterial, seed: number): ChoiceQuestion[] {
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
