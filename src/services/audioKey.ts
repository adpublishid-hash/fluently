// Stable keys for pre-generated audio files. Shared by the client and
// scripts/generate-audio.ts, so both must stay in sync.

export type AudioLang = 'en' | 'ja' | 'zh' | 'ar';

/** Guesses the language of a text from its script. */
export function detectAudioLang(text: string): AudioLang {
  if (/[؀-ۿ]/.test(text)) return 'ar';
  if (/[぀-ヿ]/.test(text)) return 'ja';
  if (/[㐀-鿿]/.test(text)) return 'zh';
  return 'en';
}

/** Maps a BCP-47 tag (en-US, ja-JP, zh-CN, ar-SA) to an audio language. */
export function audioLangFromTag(tag: string | undefined, text: string): AudioLang {
  const prefix = (tag || '').slice(0, 2).toLowerCase();
  return prefix === 'en' || prefix === 'ja' || prefix === 'zh' || prefix === 'ar' ? prefix : detectAudioLang(text);
}

export function normalizeSpeechText(text: string): string {
  return text.normalize('NFC').replace(/\s+/g, ' ').trim();
}

function fnv1a(text: string, seed: number): string {
  let hash = seed >>> 0;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

/** "<lang>/<16 hex chars>" — also the relative file path without extension. */
export function audioKey(lang: AudioLang, text: string): string {
  const normalized = normalizeSpeechText(text);
  return `${lang}/${fnv1a(normalized, 0x811c9dc5)}${fnv1a(normalized, 0x01234567)}`;
}
