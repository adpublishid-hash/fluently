import { afterEach, describe, expect, it, vi } from 'vitest';
import { examFormats } from './examFormats';
import { generateAiExam, getAiWritingPart, toFormattedQuestions, weakParts } from './aiExam';

const group = (count: number, extra: Record<string, string> = {}) => ({
  title: 'Teks',
  passage: '',
  audio: '',
  ...extra,
  questions: Array.from({ length: count }, (_, index) => ({
    type: '漢字読み', stem: `【学校】${index}`, options: ['がっこう', 'がこう', 'かっこう', 'がっこ'], answer: 0, explanation: 'Dibaca がっこう.',
  })),
});

afterEach(() => vi.unstubAllGlobals());

describe('AI mock exam', () => {
  it('maps generated groups to exam questions with audio, passages and explanations', () => {
    const [listening, reading] = [examFormats.japanese.parts[3], examFormats.japanese.parts[2]];
    const audio = toFormattedQuestions(listening, 'beginner', [group(1, { audio: '男：すみません。' })]);
    expect(audio[0]).toMatchObject({ answer: 'がっこう', part: 'choukai', section: 'Menyimak', audio: '男：すみません。', type: '漢字読み', explanation: 'Dibaca がっこう.' });
    expect(audio[0].context).toBeUndefined();
    const text = toFormattedQuestions(reading, 'beginner', [group(2, { passage: 'わたしは学生です。' })]);
    expect(text[1].context).toEqual({ title: 'Teks', text: 'わたしは学生です。' });
  });

  it('only adds HSK writing from HSK 3', () => {
    expect(getAiWritingPart('mandarin', 1)).toBeNull();
    expect(getAiWritingPart('mandarin', 2)?.id).toBe('shuxie');
    expect(getAiWritingPart('japanese', 4)).toBeNull();
  });

  it('fills parts the AI could not deliver from the question bank', async () => {
    const fetchMock = vi.fn(async (_url: string, init: RequestInit) => {
      const body = JSON.parse(String(init.body));
      if (body.partId === 'moji-goi') return new Response(JSON.stringify({ groups: [group(5)] }), { status: 200 });
      return new Response(JSON.stringify({ error: 'fail' }), { status: 502 });
    });
    vi.stubGlobal('fetch', fetchMock);
    vi.stubGlobal('localStorage', { getItem: () => null, setItem: () => undefined, removeItem: () => undefined });
    vi.stubGlobal('window', { dispatchEvent: () => true });
    const exam = await generateAiExam('japanese', 'beginner', 0, 'seed');
    expect(fetchMock).toHaveBeenCalledTimes(examFormats.japanese.parts.length);
    const goi = exam.parts.find((part) => part.partId === 'moji-goi')!;
    expect(goi.generated).toBe(5);
    expect(goi.generated + goi.fromBank).toBeLessThanOrEqual(8);
    expect(exam.parts.find((part) => part.partId === 'bunpou')!.generated).toBe(0);
    expect(exam.questions.filter((question) => question.part === 'moji-goi').slice(0, 5).every((question) => question.explanation)).toBe(true);
    expect(exam.writing).toBeNull();
  });

  it('lists weak parts weakest first', () => {
    const weak = weakParts([
      { id: 'a', label: 'A', correct: 5, total: 8 },
      { id: 'b', label: 'B', correct: 1, total: 8 },
      { id: 'c', label: 'C', correct: 4, total: 8 },
    ]);
    expect(weak.map((item) => item.id)).toEqual(['b', 'c']);
  });
});
