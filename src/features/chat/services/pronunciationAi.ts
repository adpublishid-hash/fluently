import { aiFetch } from '../../../services/aiClient';
import type { PronunciationSentenceRow } from '../types';

type PronunciationLessonRequest = {
  name: string;
  topic: string;
  levelId?: string;
};

type PronunciationFeedbackRequest = {
  name: string;
  answer: string;
  topic: string;
  levelId?: string;
  sentences: PronunciationSentenceRow[];
  turn: number;
  hasNextBatch: boolean;
};

export type PronunciationLessonResult = {
  message: string;
  rows: PronunciationSentenceRow[];
};

const sanitizeCell = (value: unknown) => String(value || '').replace(/\|/g, '/').replace(/\n+/g, ' ').trim();

export const buildPronunciationPracticeInstruction = (startNumber: number, count: number) => {
  const endNumber = startNumber + count - 1;
  return `Sekarang wajib pakai microphone ya 🎙️
Coba praktikkan kalimat ${startNumber}${endNumber > startNumber ? ` dan ${endNumber}` : ''}. Tekan tombol mic, baca kalimatnya, lalu berhenti sebentar supaya transcript terkirim otomatis.`;
};

const buildTable = (rows: PronunciationSentenceRow[]) => [
  'PRONUNCIATION_TABLE_START',
  ...rows.map((row) => [row.sentence, row.phonetic, row.focus, row.tip].join('|')),
  'PRONUNCIATION_TABLE_END',
].join('\n');

export async function requestPronunciationLesson({
  name,
  topic,
  levelId,
}: PronunciationLessonRequest): Promise<PronunciationLessonResult | null> {
  try {
    const response = await aiFetch('/api/ai/pronunciation-lesson', { name, topic, levelId });

    if (!response.ok) return null;
    const data = await response.json();
    if (!data || !Array.isArray(data.rows)) return null;

    const rows: PronunciationSentenceRow[] = data.rows
      .map((row: Record<string, unknown>) => ({
        sentence: sanitizeCell(row.sentence),
        phonetic: sanitizeCell(row.phonetic),
        focus: sanitizeCell(row.focus),
        tip: sanitizeCell(row.tip),
      }))
      .filter((row: PronunciationSentenceRow) => row.sentence && row.phonetic && row.focus && row.tip)
      .slice(0, 15);

    if (rows.length < 12) return null;

    const levelLabel = (levelId || 'a1').toUpperCase();
    return {
      rows,
      message: `Siap, ${name}! Aku generate latihan pronunciation dengan Gemini AI untuk topik "${topic}" di level CEFR ${levelLabel}.

Materinya disesuaikan level:
- A1-A2: kalimat pendek, bunyi dasar, tempo pelan.
- B1-B2: sentence stress, linking, intonation, dan kalimat lebih natural.
- C1-C2: rhythm, connected speech, emphasis, dan delivery profesional.

Klik speaker untuk dengar native AI voice. Setelah itu kamu wajib praktik lewat microphone, bukan diketik manual, supaya aku bisa baca transcript suara kamu dan kasih feedback.

${buildTable(rows)}

${buildPronunciationPracticeInstruction(1, Math.min(2, rows.length))}`,
    };
  } catch {
    return null;
  }
}

export async function requestPronunciationFeedback({
  name,
  answer,
  topic,
  levelId,
  sentences,
  turn,
  hasNextBatch,
}: PronunciationFeedbackRequest): Promise<string | null> {
  try {
    const response = await aiFetch('/api/ai/pronunciation-feedback', {
      name,
      answer,
      topic,
      levelId,
      sentences,
      turn,
      hasNextBatch,
    });

    if (!response.ok) return null;
    const data = await response.json();
    if (!data || typeof data.feedback !== 'string') return null;
    return data.feedback.trim();
  } catch {
    return null;
  }
}
