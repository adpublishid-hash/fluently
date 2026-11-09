import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { sendContentReport } from './contentReports';

beforeEach(() => {
  vi.stubGlobal('localStorage', { getItem: () => null, setItem: () => undefined, removeItem: () => undefined });
});
afterEach(() => vi.unstubAllGlobals());

describe('sendContentReport', () => {
  it('posts the lesson context with the reported message', async () => {
    const fetchMock = vi.fn(async (_url: string, _init?: RequestInit) => new Response('{"id":1}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const ok = await sendContentReport(
      { language: 'arabic', focus: 'pronunciation', topic: 'Huruf ز', levelId: 'a1' },
      { reason: 'wrong', note: 'ز pakai ujung lidah', excerpt: 'x'.repeat(5000) },
    );
    expect(ok).toBe(true);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/chat/content-reports');
    const body = JSON.parse(String(init!.body));
    expect(body).toMatchObject({ language: 'arabic', focus: 'pronunciation', topic: 'Huruf ز', levelId: 'a1', reason: 'wrong', note: 'ز pakai ujung lidah' });
    expect(body.excerpt).toHaveLength(4000);
  });

  it('reports failure instead of throwing', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('{}', { status: 429 })));
    await expect(sendContentReport({ language: 'english', focus: 'grammar', topic: '' }, { reason: 'other', note: '', excerpt: 'x' })).resolves.toBe(false);
    vi.stubGlobal('fetch', vi.fn(async () => { throw new TypeError('offline'); }));
    await expect(sendContentReport({ language: 'english', focus: 'grammar', topic: '' }, { reason: 'other', note: '', excerpt: 'x' })).resolves.toBe(false);
  });
});
