import { buildChoiceQuestion, hashSeed, seededRandom, seededShuffle, type ChoiceQuestion } from '../../../utils/quiz';
import { japaneseGrammarBank } from '../../module/japanese/japaneseGrammarBank';
import { getJapaneseLesson } from '../../module/japanese/japaneseLessonContent';
import type { JapaneseLevelId, JapaneseSkillId } from '../../module/japanese/japaneseModuleData';
import { getJapaneseLevelWords } from '../../module/japanese/japaneseVocabularyBank';

export type JapanesePracticeQuestion = ChoiceQuestion & {
  /** Japanese text read aloud with TTS before answering (listening / pronunciation). */
  audio?: string;
  explanation: string;
};

export const JAPANESE_PRACTICE_LENGTH = 10;

type Word = { japanese: string; romaji: string; meaning: string };

/**
 * Practice session for one topic. Uses the same content as the lesson but with
 * skill-specific question types (audio for listening/pronunciation, reverse
 * translation for writing/speaking) and its own seed, so it is not a copy of
 * the lesson quiz.
 */
export function buildJapanesePractice(level: JapaneseLevelId, skill: JapaneseSkillId, topicNumber: number): JapanesePracticeQuestion[] {
  const lesson = getJapaneseLesson(skill, topicNumber, level);
  const random = seededRandom(hashSeed('japanese-practice', level, skill, topicNumber));
  const words: Word[] = lesson.vocabulary;
  const sentences: Word[] = lesson.examples;
  const levelWords = getJapaneseLevelWords(level);
  const levelSentences = japaneseGrammarBank[level].flatMap((point) => point.examples);
  const levelPatterns = japaneseGrammarBank[level];
  const questions: Array<JapanesePracticeQuestion | null> = [];

  const withExplanation = (question: ChoiceQuestion | null, explanation: string, audio?: string): JapanesePracticeQuestion | null =>
    question ? { ...question, explanation, ...(audio ? { audio } : {}) } : null;

  const meaningOf = (word: Word) =>
    withExplanation(
      buildChoiceQuestion(`Apa arti「${word.japanese}」?`, word.meaning, levelWords.map((item) => item.meaning), random),
      `「${word.japanese}」(${word.romaji}) berarti "${word.meaning}".`,
    );
  const wordFor = (word: Word) =>
    withExplanation(
      buildChoiceQuestion(`Pilih kata Jepang untuk "${word.meaning}".`, word.japanese, levelWords.map((item) => item.japanese), random),
      `"${word.meaning}" dalam bahasa Jepang adalah「${word.japanese}」(${word.romaji}).`,
    );
  const readingOf = (word: Word) =>
    withExplanation(
      buildChoiceQuestion(`Bagaimana cara membaca「${word.japanese}」?`, word.romaji, levelWords.map((item) => item.romaji), random),
      `「${word.japanese}」dibaca "${word.romaji}".`,
    );
  const sentenceMeaning = (sentence: Word) =>
    withExplanation(
      buildChoiceQuestion(`Arti kalimat「${sentence.japanese}」adalah...`, sentence.meaning, levelSentences.map((item) => item.meaning), random),
      `${sentence.japanese} (${sentence.romaji}) = "${sentence.meaning}"`,
    );
  const sentenceFor = (sentence: Word) =>
    withExplanation(
      buildChoiceQuestion(`Kalimat Jepang yang tepat untuk "${sentence.meaning}" adalah...`, sentence.japanese, levelSentences.map((item) => item.japanese), random),
      `"${sentence.meaning}" → ${sentence.japanese} (${sentence.romaji}).`,
    );
  const listenSentence = (sentence: Word) =>
    withExplanation(
      buildChoiceQuestion('Dengarkan audio. Apa arti kalimat yang kamu dengar?', sentence.meaning, levelSentences.map((item) => item.meaning), random),
      `Audio: ${sentence.japanese} (${sentence.romaji}) = "${sentence.meaning}".`,
      sentence.japanese,
    );
  const listenWord = (word: Word) =>
    withExplanation(
      buildChoiceQuestion('Dengarkan audio. Kata apa yang diucapkan?', word.meaning, levelWords.map((item) => item.meaning), random),
      `Audio: ${word.japanese} (${word.romaji}) = "${word.meaning}".`,
      word.japanese,
    );
  const hearReading = (word: Word) =>
    withExplanation(
      buildChoiceQuestion('Dengarkan audio. Romaji mana yang sesuai dengan pelafalannya?', word.romaji, levelWords.map((item) => item.romaji), random),
      `${word.japanese} dilafalkan "${word.romaji}". Perhatikan panjang vokal dan small tsu.`,
      word.japanese,
    );
  const patternUse = () => {
    const point = levelPatterns[(topicNumber - 1) % levelPatterns.length];
    return withExplanation(
      buildChoiceQuestion(`Pola「${point.pattern}」dipakai untuk...`, point.meaning, levelPatterns.map((item) => item.meaning), random),
      `${point.pattern}: ${point.meaning}. ${point.formation}`,
    );
  };

  const shuffledWords = () => seededShuffle(words, random);
  const shuffledSentences = () => seededShuffle(sentences, random);

  const plans: Record<JapaneseSkillId, () => void> = {
    vocabulary: () => {
      shuffledWords().forEach((word) => questions.push(meaningOf(word)));
      shuffledWords().slice(0, 3).forEach((word) => questions.push(wordFor(word)));
      shuffledWords().slice(0, 2).forEach((word) => questions.push(readingOf(word)));
    },
    grammar: () => {
      questions.push(patternUse());
      shuffledSentences().forEach((sentence) => questions.push(sentenceMeaning(sentence)));
      shuffledSentences().forEach((sentence) => questions.push(sentenceFor(sentence)));
      shuffledWords().slice(0, 4).forEach((word) => questions.push(meaningOf(word)));
    },
    reading: () => {
      shuffledSentences().forEach((sentence) => questions.push(sentenceMeaning(sentence)));
      shuffledWords().slice(0, 4).forEach((word) => questions.push(readingOf(word)));
      shuffledWords().slice(0, 3).forEach((word) => questions.push(meaningOf(word)));
    },
    writing: () => {
      shuffledSentences().forEach((sentence) => questions.push(sentenceFor(sentence)));
      shuffledWords().forEach((word) => questions.push(wordFor(word)));
      questions.push(patternUse());
    },
    listening: () => {
      shuffledSentences().forEach((sentence) => questions.push(listenSentence(sentence)));
      shuffledWords().forEach((word) => questions.push(listenWord(word)));
    },
    speaking: () => {
      shuffledSentences().forEach((sentence) => questions.push(sentenceFor(sentence)));
      shuffledWords().slice(0, 4).forEach((word) => questions.push(wordFor(word)));
      shuffledSentences().slice(0, 2).forEach((sentence) => questions.push(listenSentence(sentence)));
      questions.push(patternUse());
    },
    pronunciation: () => {
      shuffledWords().forEach((word) => questions.push(hearReading(word)));
      shuffledWords().slice(0, 4).forEach((word) => questions.push(readingOf(word)));
    },
  };
  plans[skill]();

  const unique = new Map<string, JapanesePracticeQuestion>();
  questions.forEach((question) => {
    if (question && !unique.has(`${question.question}|${question.answer}`)) unique.set(`${question.question}|${question.answer}`, question);
  });
  return [...unique.values()].slice(0, JAPANESE_PRACTICE_LENGTH);
}
