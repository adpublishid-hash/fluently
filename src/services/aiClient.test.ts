import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { aiFetch } from './aiClient';

// fetch that never answers on its own; it rejects once its signal aborts.
const hangingFetch = vi.fn((_url: string, init?: RequestInit) => new Promise<Response>((_resolve, reject) => {
  const abort = () => reject(new DOMException('Aborted', 'AbortError'));
  if (init?.signal?.aborted) abort();
  init?.signal?.addEventListener('abort', abort);
}));

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal('localStorage', { getItem: () => null, setItem: () => undefined, removeItem: () => undefined });
  vi.stubGlobal('window', { dispatchEvent: () => true });
  vi.stubGlobal('fetch', hangingFetch);
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('aiFetch', () => {
  it('gives up after the timeout', async () => {
    const request = aiFetch('/api/ai/localized-lesson', {}, { timeoutMs: 1000 });
    const outcome = expect(request).rejects.toThrow('Aborted');
    await vi.advanceTimersByTimeAsync(1000);
    await outcome;
  });

  it('stops when the caller aborts', async () => {
    const controller = new AbortController();
    const request = aiFetch('/api/ai/localized-lesson', {}, { signal: controller.signal });
    controller.abort();
    await expect(request).rejects.toThrow('Aborted');
  });

  it('does not start a request whose signal is already aborted', async () => {
    const controller = new AbortController();
    controller.abort();
    await expect(aiFetch('/api/ai/localized-lesson', {}, { signal: controller.signal })).rejects.toThrow('Aborted');
  });
});
