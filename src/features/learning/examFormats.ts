import { buildChoiceQuestion, hashSeed, seededRandom, seededShuffle, type ChoiceQuestion } from '../../utils/quiz';
import { getPassages, isPassageLanguage, type Passage } from '../passages';
import { buildLevelQuestions, type ExamQuestion, type ExamSection } from './examQuestions';
import { getLevelCloze, getLevelSentences, type StudyLanguage } from './studyBank';

type PartKind = 'listening' | 'reading' | 'vocabulary' | 'grammar';

export type ExamPart = {
  id: string;
  /** Official section name in the target language / exam. */
  native: string;
  /** Indonesian label. */
  label: string;
  kind: PartKind;
  count: number;
};

export type ExamFormat = { name: string; minutes: number; parts: ExamPart[] };

export type FormattedQuestion = ChoiceQuestion & {
  part: string;
  section: ExamSection;
  level: string;
  /** Text to play with TTS instead of showing it (listening). */
  audio?: string;
  /** Reading passage shown above the question. */
  context?: { title: string; text: string };
};

const kindSection: Record<PartKind, ExamSection> = {
  listening: 'Menyimak',
  reading: 'Membaca',
  vocabulary: 'Kosakata',
  grammar: 'Tata bahasa',
};

export const examFormats: Record<StudyLanguage, ExamFormat> = {
  english: {
    name: 'Simulasi CEFR',
    minutes: 25,
    parts: [
      { id: 'listening', native: 'Listening', label: 'Menyimak (dikte)', kind: 'listening', count: 6 },
      { id: 'vocabulary', native: 'Vocabulary', label: 'Kosakata', kind: 'vocabulary', count: 12 },
      { id: 'grammar', native: 'Grammar', label: 'Tata bahasa', kind: 'grammar', count: 12 },
    ],
  },
  japanese: {
    name: 'Simulasi JLPT',
    minutes: 30,
    parts: [
      { id: 'moji-goi', native: '言語知識（文字・語彙）', label: 'Kosakata & huruf', kind: 'vocabulary', count: 8 },
      { id: 'bunpou', native: '言語知識（文法）', label: 'Tata bahasa', kind: 'grammar', count: 6 },
      { id: 'dokkai', native: '読解', label: 'Membaca', kind: 'reading', count: 8 },
      { id: 'choukai', native: '聴解', label: 'Menyimak', kind: 'listening', count: 8 },
    ],
  },
  mandarin: {
    name: 'Simulasi HSK',
    minutes: 30,
    parts: [
      { id: 'tingli', native: '听力', label: 'Menyimak', kind: 'listening', count: 10 },
      { id: 'yuedu', native: '阅读', label: 'Membaca', kind: 'reading', count: 10 },
      { id: 'cihui', native: '词汇与书写', label: 'Kosakata & menulis', kind: 'vocabulary', count: 10 },
    ],
  },
  arabic: {
    name: 'Simulasi TOAFL',
    minutes: 30,
    parts: [
      { id: 'istima', native: 'فهم المسموع', label: "Istima' (menyimak)", kind: 'listening', count: 10 },
      { id: 'tarakib', native: 'التراكيب والتعبير', label: 'Tarakib (struktur)', kind: 'grammar', count: 10 },
      { id: 'qiraah', native: 'فهم المقروء', label: "Qira'ah (membaca)", kind: 'reading', count: 10 },
    ],
  },
};

function passageText(passage: Passage) {
  return passage.sentences.map((sentence) => sentence.text).join(passage.language === 'japanese' || passage.language === 'mandarin' ? '' : ' ');
}

function passageQuestions(passage: Passage, random: () => number, mode: 'listening' | 'reading'): Array<Omit<FormattedQuestion, 'part' | 'level'>> {
  const text = passageText(passage);
  return passage.questions
    .map((item) => buildChoiceQuestion(item.question, item.answer, item.distractors, random))
    .filter((item): item is ChoiceQuestion => item !== null)
    .map((item) => ({
      ...item,
      section: kindSection[mode],
      ...(mode === 'listening' ? { audio: text } : { context: { title: passage.native || passage.title, text } }),
    }));
}

/**
 * Builds an exam in the official section layout for the language (JLPT, HSK,
 * TOAFL, CEFR). Listening items are audio-only; reading items use long
 * passages where the level has them and sentence items otherwise.
 */
export function buildFormattedExam(language: StudyLanguage, level: string, seedKey: string): FormattedQuestion[] {
  const format = examFormats[language];
  const random = seededRandom(hashSeed(seedKey, 'format', language, level));
  const passages = isPassageLanguage(language) ? seededShuffle(getPassages(language, level), random) : [];
  const sentences = seededShuffle(getLevelSentences(language, level), random);
  const cloze = seededShuffle(getLevelCloze(language, level), random);
  const meanings = sentences.map((item) => item.meaning);
  const need = (kind: PartKind) => format.parts.filter((part) => part.kind === kind).reduce((sum, part) => sum + part.count, 0);
  const base: ExamQuestion[] = buildLevelQuestions(language, level, { vocabulary: need('vocabulary'), reading: 0, grammar: need('grammar') }, seedKey);
  const baseBySection = (section: ExamSection) => base.filter((item) => item.section === section);
  const out: FormattedQuestion[] = [];
  const seen = new Set<string>();
  let passageIndex = 0;
  let sentenceIndex = 0;

  const add = (part: ExamPart, question: Omit<FormattedQuestion, 'part' | 'level'>) => {
    const key = `${question.question}|${question.audio ?? ''}|${question.context?.title ?? ''}`;
    if (seen.has(key)) return false;
    seen.add(key);
    out.push({ ...question, part: part.id, level });
    return true;
  };

  format.parts.forEach((part) => {
    let remaining = part.count;
    if (part.kind === 'vocabulary' || part.kind === 'grammar') {
      // Grammar falls back to vocabulary when a level has no grammar source.
      const pool = [...baseBySection(kindSection[part.kind]), ...(part.kind === 'grammar' ? [] : baseBySection('Tata bahasa'))];
      pool.forEach((item) => {
        if (remaining > 0 && add(part, { ...item, section: kindSection[part.kind] })) remaining -= 1;
      });
      if (remaining > 0) {
        baseBySection('Kosakata').forEach((item) => {
          if (remaining > 0 && add(part, { ...item, section: kindSection[part.kind] })) remaining -= 1;
        });
      }
      return;
    }

    // Long passages first (about two thirds of the part), then sentence items.
    while (remaining > part.count / 3 && passageIndex < passages.length) {
      const items = passageQuestions(passages[passageIndex], random, part.kind as 'listening' | 'reading');
      passageIndex += 1;
      items.slice(0, remaining).forEach((item) => {
        if (add(part, item)) remaining -= 1;
      });
    }

    if (language === 'english' && part.kind === 'listening') {
      while (remaining > 0 && sentenceIndex < cloze.length) {
        const item = cloze[sentenceIndex];
        sentenceIndex += 1;
        const words = cloze.map((entry) => entry.answer);
        const question = buildChoiceQuestion(`Dengarkan, lalu isi bagian kosong: "${item.sentence}"`, item.answer, words, random);
        if (question && add(part, { ...question, section: 'Menyimak', audio: item.sentence.replace(/_{2,}/g, item.answer) })) remaining -= 1;
      }
      return;
    }

    while (remaining > 0 && sentenceIndex < sentences.length) {
      const sentence = sentences[sentenceIndex];
      sentenceIndex += 1;
      const question = part.kind === 'listening'
        ? buildChoiceQuestion('Dengarkan kalimat, lalu pilih artinya.', sentence.meaning, meanings, random)
        : buildChoiceQuestion(`Arti kalimat「${sentence.term}」adalah...`, sentence.meaning, meanings, random);
      if (question && add(part, { ...question, section: kindSection[part.kind], ...(part.kind === 'listening' ? { audio: sentence.term } : {}) })) remaining -= 1;
    }
  });

  return out;
}
