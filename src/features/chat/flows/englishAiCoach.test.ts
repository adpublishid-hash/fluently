import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildGrammarLesson } from '../english';
import { getNativeLevelName, usesAiCoach } from '../localizedLesson';
import { handleGrammarAnswer, selectGrammarTopic } from './index';
import { CANCELLED_LESSON_NOTE, CANCELLED_REPLY } from './localizedFlow';
import type { FlowRuntime } from './types';

const grammarLesson = {
  title: 'Past Simple',
  explanation: 'Dipakai untuk kejadian yang sudah selesai.',
  patterns: [{ pattern: 'S + V2', meaning: 'kalimat positif' }],
  examples: [
    { sentence: 'I visited Bali.', reading: '', meaning: 'Saya mengunjungi Bali.' },
    { sentence: 'She watched a movie.', reading: '', meaning: 'Dia menonton film.' },
    { sentence: 'We played football.', reading: '', meaning: 'Kami bermain bola.' },
  ],
  mistakes: [{ wrong: 'I go yesterday.', right: 'I went yesterday.', why: 'Pakai V2.' }],
  drills: ['Buat 3 kalimat tentang kemarin.'],
};

const makeRuntime = (overrides: Partial<FlowRuntime> = {}): FlowRuntime => ({
  studentName: 'Ana',
  selectedTopic: 'past simple',
  completedPracticeWords: [],
  generatedVocabularyWords: [],
  generatedPronunciationRows: [],
  vocabularyPracticeOffset: 0,
  pronunciationTurn: 0,
  localizedLessonContext: '',
  lastCoachMessage: '',
  levelId: 'a2',
  targetLanguage: 'English',
  setMessages: vi.fn(),
  setStudentName: vi.fn(),
  setSelectedTopic: vi.fn(),
  setCompletedPracticeWords: vi.fn(),
  setGeneratedVocabularyWords: vi.fn(),
  setGeneratedPronunciationRows: vi.fn(),
  setVocabularyPracticeOffset: vi.fn(),
  setPronunciationTurn: vi.fn(),
  setVocabStage: vi.fn(),
  setLocalizedLessonContext: vi.fn(),
  sendAiReply: vi.fn(),
  showTyping: vi.fn(),
  signal: new AbortController().signal,
  ...overrides,
});

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

beforeEach(() => {
  vi.stubGlobal('localStorage', { getItem: () => null, setItem: () => undefined, removeItem: () => undefined });
  vi.stubGlobal('window', { dispatchEvent: () => true });
});
afterEach(() => vi.unstubAllGlobals());

describe('English AI coach', () => {
  it('covers English grammar/reading/speaking/writing and every mode of the other languages', () => {
    expect(usesAiCoach('English', 'grammar')).toBe(true);
    expect(usesAiCoach('English', 'vocabulary')).toBe(false);
    expect(usesAiCoach('Japanese', 'vocabulary')).toBe(true);
  });

  it('shows the native exam level for Japanese and Mandarin only', () => {
    expect(getNativeLevelName('Japanese', 'a1')).toBe('JLPT N5');
    expect(getNativeLevelName('Mandarin', 'b2')).toBe('HSK 4');
    expect(getNativeLevelName('English', 'a1')).toBeNull();
    expect(getNativeLevelName('Arabic', 'a1')).toBeNull();
  });

  it('generates English grammar lessons with AI and keeps the context for feedback', async () => {
    const fetchMock = vi.fn(async (url: string, _init?: RequestInit) => new Response(JSON.stringify(
      url.startsWith('/api/chat/mistakes') ? { items: [{ id: 1, original: 'I go yesterday', corrected: 'I went yesterday' }] } : { lesson: grammarLesson },
    ), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const runtime = makeRuntime();
    selectGrammarTopic('past-simple', runtime);
    await flush();
    const lessonCall = fetchMock.mock.calls.find(([url]) => url === '/api/ai/localized-lesson')!;
    const body = JSON.parse(String(lessonCall[1]!.body));
    expect(body).toMatchObject({ language: 'english', focus: 'grammar', levelId: 'a2', review: [{ original: 'I go yesterday', corrected: 'I went yesterday' }] });
    expect(runtime.setLocalizedLessonContext).toHaveBeenLastCalledWith(expect.stringContaining('Past Simple'));
    expect(String(vi.mocked(runtime.sendAiReply).mock.calls[0][0])).toContain('bahasa Inggris');
    expect(String(vi.mocked(runtime.sendAiReply).mock.calls[0][0])).toContain('🔁 Materi ini juga mengulang kesalahanmu sebelumnya:\n• I go yesterday → I went yesterday');
  });

  it('falls back to the built-in English lesson when AI is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('{}', { status: 502 })));
    const runtime = makeRuntime();
    selectGrammarTopic('past-simple', runtime);
    await flush();
    const topic = vi.mocked(runtime.setSelectedTopic).mock.calls[0][0];
    expect(vi.mocked(runtime.sendAiReply).mock.calls[0][0]).toBe(buildGrammarLesson('Ana', topic, 'a2'));
  });

  it('corrects answers with AI once an AI lesson is active', async () => {
    const fetchMock = vi.fn(async (url: string, _init?: RequestInit) => new Response(JSON.stringify(url === '/api/chat/mistakes' ? { saved: 1 } : {
      status: 'incorrect', score: 50, feedback: '"I go" salah. Pakai V2 untuk lampau.', corrected: 'I went to school.', correctedReading: '', completedItems: [], nextTask: '',
    }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const runtime = makeRuntime({ localizedLessonContext: 'Grammar point: Past Simple' });
    handleGrammarAnswer('I go to school yesterday.', 'practice', runtime);
    await flush();
    expect(fetchMock.mock.calls[0][0]).toBe('/api/ai/localized-feedback');
    expect(String(vi.mocked(runtime.sendAiReply).mock.calls[0][0])).toContain('I went to school.');
    const saved = fetchMock.mock.calls.find(([url]) => url === '/api/chat/mistakes')!;
    expect(JSON.parse(String(saved[1]!.body))).toEqual({
      language: 'english', focus: 'grammar', topic: 'past simple',
      items: [{ original: 'I go to school yesterday.', corrected: 'I went to school.', explanation: '"I go" salah.' }],
    });
  });

  it('keeps the current lesson when regenerating fails', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('{}', { status: 502 })));
    const runtime = makeRuntime({ localizedLessonContext: 'Grammar point: Past Simple' });
    handleGrammarAnswer('lebih mudah', 'practice', runtime);
    await flush();
    expect(runtime.setLocalizedLessonContext).not.toHaveBeenCalled();
    expect(String(vi.mocked(runtime.sendAiReply).mock.calls[0][0])).toContain('lanjutkan dengan materi yang ada');
  });

  describe('when the learner cancels', () => {
    // AI endpoints never answer; they only reject once the request is aborted.
    const hangingFetch = vi.fn((url: string, init?: RequestInit) => new Promise<Response>((resolve, reject) => {
      if (url.startsWith('/api/chat/mistakes')) {
        resolve(new Response(JSON.stringify({ items: [] }), { status: 200 }));
        return;
      }
      const abort = () => reject(new DOMException('Aborted', 'AbortError'));
  if (init?.signal?.aborted) abort();
  init?.signal?.addEventListener('abort', abort);
    }));

    it('shows the built-in lesson right away instead of waiting for AI', async () => {
      vi.stubGlobal('fetch', hangingFetch);
      const controller = new AbortController();
      const runtime = makeRuntime({ signal: controller.signal });
      selectGrammarTopic('past-simple', runtime);
      await flush();
      expect(runtime.sendAiReply).not.toHaveBeenCalled();
      controller.abort();
      await flush();
      const topic = vi.mocked(runtime.setSelectedTopic).mock.calls[0][0];
      expect(vi.mocked(runtime.sendAiReply).mock.calls[0][0]).toBe(`${CANCELLED_LESSON_NOTE}\n\n${buildGrammarLesson('Ana', topic, 'a2')}`);
    });

    it('drops a pending correction without offline feedback or saving a mistake', async () => {
      vi.stubGlobal('fetch', hangingFetch);
      const controller = new AbortController();
      const runtime = makeRuntime({ signal: controller.signal, localizedLessonContext: 'Grammar point: Past Simple' });
      handleGrammarAnswer('I go to school yesterday.', 'practice', runtime);
      await flush();
      controller.abort();
      await flush();
      expect(vi.mocked(runtime.sendAiReply).mock.calls).toEqual([[CANCELLED_REPLY, 200]]);
      expect(hangingFetch.mock.calls.some(([url, init]) => url === '/api/chat/mistakes' && init?.method === 'POST')).toBe(false);
    });
  });
});
