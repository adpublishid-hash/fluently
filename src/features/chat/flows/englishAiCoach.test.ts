import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildGrammarLesson } from '../english';
import { getNativeLevelName, usesAiCoach } from '../localizedLesson';
import { handleGrammarAnswer, selectGrammarTopic } from './index';
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
    const fetchMock = vi.fn(async (_url: string, _init: RequestInit) => new Response(JSON.stringify({ lesson: grammarLesson }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const runtime = makeRuntime();
    selectGrammarTopic('past-simple', runtime);
    await flush();
    const body = JSON.parse(String(fetchMock.mock.calls[0][1].body));
    expect(body).toMatchObject({ language: 'english', focus: 'grammar', levelId: 'a2' });
    expect(runtime.setLocalizedLessonContext).toHaveBeenLastCalledWith(expect.stringContaining('Past Simple'));
    expect(String(vi.mocked(runtime.sendAiReply).mock.calls[0][0])).toContain('bahasa Inggris');
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
    const fetchMock = vi.fn(async (_url: string) => new Response(JSON.stringify({
      status: 'incorrect', score: 50, feedback: '"I go" salah.', corrected: 'I went to school.', correctedReading: '', completedItems: [], nextTask: '',
    }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const runtime = makeRuntime({ localizedLessonContext: 'Grammar point: Past Simple' });
    handleGrammarAnswer('I go to school yesterday.', 'practice', runtime);
    await flush();
    expect(fetchMock.mock.calls[0][0]).toBe('/api/ai/localized-feedback');
    expect(String(vi.mocked(runtime.sendAiReply).mock.calls[0][0])).toContain('I went to school.');
  });

  it('keeps the current lesson when regenerating fails', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('{}', { status: 502 })));
    const runtime = makeRuntime({ localizedLessonContext: 'Grammar point: Past Simple' });
    handleGrammarAnswer('lebih mudah', 'practice', runtime);
    await flush();
    expect(runtime.setLocalizedLessonContext).not.toHaveBeenCalled();
    expect(String(vi.mocked(runtime.sendAiReply).mock.calls[0][0])).toContain('lanjutkan dengan materi yang ada');
  });
});
