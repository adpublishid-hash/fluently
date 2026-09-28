import { afterEach, describe, expect, it, vi } from 'vitest';
import { audioKey, audioLangFromTag, detectAudioLang } from './audioKey';
import { findPregeneratedAudio, resetAudioManifest } from './audioLibrary';

describe('audio keys', () => {
  it('are stable, normalised and language-scoped', () => {
    expect(audioKey('ja', '  こんにちは  ')).toBe(audioKey('ja', 'こんにちは'));
    expect(audioKey('ja', 'こんにちは')).toMatch(/^ja\/[0-9a-f]{16}$/);
    expect(audioKey('en', 'Hello there')).not.toBe(audioKey('en', 'Hello  there!'));
    // First half is the standard FNV-1a 32-bit hash of "Hello"; pinned so keys never drift.
    expect(audioKey('en', 'Hello')).toBe('en/f55c314b0f0218fd');
  });

  it('detects language from script or tag', () => {
    expect(detectAudioLang('مرحبا')).toBe('ar');
    expect(detectAudioLang('ひらがな')).toBe('ja');
    expect(detectAudioLang('你好')).toBe('zh');
    expect(detectAudioLang('hello')).toBe('en');
    expect(audioLangFromTag('ja-JP', '日本')).toBe('ja');
    expect(audioLangFromTag(undefined, '日本')).toBe('zh');
  });
});

describe('audio library', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    resetAudioManifest();
  });

  it('returns the file URL listed in the manifest', async () => {
    const key = audioKey('zh', '你好');
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ version: 1, files: { [key]: `${key}.mp3` } }))));
    expect(await findPregeneratedAudio('你好', 'zh-CN')).toBe(`/audio/${key}.mp3`);
    expect(await findPregeneratedAudio('再见', 'zh-CN')).toBeNull();
  });

  it('treats a missing manifest as empty', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('not found', { status: 404 })));
    expect(await findPregeneratedAudio('Hello', 'en-US')).toBeNull();
  });
});
