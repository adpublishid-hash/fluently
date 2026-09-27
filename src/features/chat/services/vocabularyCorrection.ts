import { aiFetch } from '../../../services/aiClient';

export type VocabularyCorrectionResult = {
  feedback: string;
  completedWords: string[];
};

export type VocabularyLessonResult = {
  message: string;
  words: string[];
};

type VocabularyCorrectionRequest = {
  name: string;
  answer: string;
  targetWords: string[];
  topic: string;
  levelId?: string;
};

type VocabularyLessonRequest = {
  name: string;
  topic: string;
  levelId?: string;
};

type AiVocabularyRow = {
  word: string;
  phonetic: string;
  meaning: string;
  pos: string;
  example: string;
};

const normalizeWord = (word: string) => word.toLowerCase().trim().replace(/\s+/g, ' ');

const sanitizeCell = (value: unknown) => String(value || '').replace(/\|/g, '/').replace(/\n+/g, ' ').trim();

export async function requestVocabularyLesson({
  name,
  topic,
  levelId,
}: VocabularyLessonRequest): Promise<VocabularyLessonResult | null> {
  try {
    const response = await aiFetch('/api/ai/vocabulary-lesson', { name, topic, levelId });

    if (!response.ok) return null;
    const data = await response.json();
    if (!data || !Array.isArray(data.rows)) return null;

    const rows: AiVocabularyRow[] = data.rows
      .map((row: Record<string, unknown>) => ({
        word: sanitizeCell(row.word),
        phonetic: sanitizeCell(row.phonetic),
        meaning: sanitizeCell(row.meaning),
        pos: sanitizeCell(row.pos),
        example: sanitizeCell(row.example),
      }))
      .filter((row: AiVocabularyRow) => row.word && row.phonetic && row.meaning && row.pos && row.example)
      .slice(0, 30);

    if (rows.length < 20) return null;

    const levelLabel = (levelId || 'a1').toUpperCase();
    const table = [
      'VOCAB_TABLE_START',
      ...rows.map((row) => [row.word, row.phonetic, row.meaning, row.pos, row.example].join('|')),
      'VOCAB_TABLE_END',
    ].join('\n');

    return {
      words: rows.map((row) => normalizeWord(row.word)),
      message: `Siap, ${name}! Aku generate vocabulary dengan Gemini AI untuk topik "${topic}" di level CEFR ${levelLabel}.

Daftar ini dibuat agar sesuai level kamu:
- A1-A2: kata dasar, kalimat pendek, konteks sehari-hari.
- B1-B2: kata lebih spesifik, collocation, dan kalimat lebih natural.
- C1-C2: vocabulary akademik/profesional, nuansa makna, dan contoh lebih advanced.

Klik speaker di kata atau contoh untuk dengar native AI voice. Fokus kita bukan cuma hafalan, tapi bisa memakai kata dengan benar dalam kalimat.

${table}

Sekarang kita mulai batch pertama. Buat 3 kalimat sederhana menggunakan kata-kata berikut:

${rows.slice(0, 3).map((row, index) => `${index + 1}. ${row.word}`).join('\n')}

Contoh gaya jawaban:
1. My name is Karina.
2. I live in Jakarta.
3. My friend is kind.

Tulis saja dulu, nanti aku koreksi grammar, vocabulary usage, dan kasih versi yang lebih natural.`,
    };
  } catch {
    return null;
  }
}

export async function requestVocabularyCorrection({
  name,
  answer,
  targetWords,
  topic,
  levelId,
}: VocabularyCorrectionRequest): Promise<VocabularyCorrectionResult | null> {
  try {
    const response = await aiFetch('/api/ai/vocabulary-correction', { name, answer, targetWords, topic, levelId });

    if (!response.ok) return null;
    const data = await response.json();
    if (!data || typeof data.feedback !== 'string' || !Array.isArray(data.completedWords)) {
      return null;
    }

    const allowed = new Set(targetWords.map(normalizeWord));
    return {
      feedback: data.feedback.trim(),
      completedWords: data.completedWords
        .map((word: unknown) => normalizeWord(String(word)))
        .filter((word: string) => allowed.has(word)),
    };
  } catch {
    return null;
  }
}
