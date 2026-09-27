import { buildChoiceQuestion, hashSeed, seededRandom, seededShuffle, type ChoiceQuestion } from '../../utils/quiz';
import { getLevelCloze, getLevelPatterns, getLevelSentences, getLevelWords, type StudyLanguage } from './studyBank';

export type ExamSection = 'Kosakata' | 'Membaca' | 'Tata bahasa';
export type ExamQuestion = ChoiceQuestion & { section: ExamSection; level: string };
export type ExamPlan = { vocabulary: number; reading: number; grammar: number };

/**
 * Builds questions for one level. When a section has no content for a
 * language (e.g. Mandarin grammar), its share moves to vocabulary.
 */
export function buildLevelQuestions(language: StudyLanguage, level: string, plan: ExamPlan, seedKey: string): ExamQuestion[] {
  const random = seededRandom(hashSeed(seedKey, language, level));
  const words = getLevelWords(language, level);
  const sentences = getLevelSentences(language, level);
  const patterns = getLevelPatterns(language, level);
  const cloze = getLevelCloze(language, level);
  const meanings = words.map((word) => word.meaning);
  const terms = words.map((word) => word.term);
  const out: ExamQuestion[] = [];
  const push = (question: ChoiceQuestion | null, section: ExamSection) => {
    if (question && !out.some((item) => item.question === question.question)) out.push({ ...question, section, level });
  };

  let grammarBudget = plan.grammar;
  const grammarSource = patterns.length ? 'patterns' : cloze.length ? 'cloze' : null;
  if (grammarSource === 'patterns') {
    seededShuffle(patterns, random).slice(0, grammarBudget).forEach((pattern) =>
      push(buildChoiceQuestion(`Pola「${pattern.pattern}」dipakai untuk...`, pattern.meaning, patterns.map((item) => item.meaning), random), 'Tata bahasa'));
  } else if (grammarSource === 'cloze') {
    seededShuffle(cloze, random).slice(0, grammarBudget).forEach((item) =>
      push(buildChoiceQuestion(`Lengkapi kalimat: "${item.sentence}"`, item.answer, terms, random), 'Tata bahasa'));
  }
  grammarBudget -= out.length;

  let readingBudget = plan.reading;
  const before = out.length;
  seededShuffle(sentences, random).slice(0, readingBudget).forEach((sentence) =>
    push(buildChoiceQuestion(`Arti kalimat「${sentence.term}」adalah...`, sentence.meaning, sentences.map((item) => item.meaning), random), 'Membaca'));
  readingBudget -= out.length - before;

  const vocabularyTarget = plan.vocabulary + Math.max(0, grammarBudget) + Math.max(0, readingBudget);
  seededShuffle(words, random).forEach((word, index) => {
    if (out.filter((item) => item.section === 'Kosakata').length >= vocabularyTarget) return;
    const reverse = index % 3 === 2;
    push(
      reverse
        ? buildChoiceQuestion(`Pilih kata untuk "${word.meaning}".`, word.term, terms, random)
        : buildChoiceQuestion(`Apa arti「${word.term}」?`, word.meaning, meanings, random),
      'Kosakata',
    );
  });

  return seededShuffle(out, random);
}
