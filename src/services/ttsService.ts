/**
 * Shared AI voice service.
 * AI Chat uses the default Gemini Flash key through the backend.
 * A personal browser key is optional for direct Gemini TTS playback.
 */

import {
  getChatAiApiKey,
  getMaskedChatAiKey,
  saveChatAiApiKey,
  removeChatAiApiKey,
} from './aiKeyService';

export const TTS_API_KEY_STORAGE = 'fluently_ai_chat_api_key';
const LEGACY_TTS_KEY_STORAGE = 'talky_legacy_tts_api_key';
export const TTS_PREFERRED_VOICE_STORAGE = 'talky_tts_preferred_voice';
export const TTS_PREFERRED_MODEL_STORAGE = 'talky_tts_preferred_model';

export const TTS_VOICES = ['Kore', 'Puck', 'Charon', 'Zephyr', 'Aoede', 'Fenrir'] as const;
export const TTS_MODELS = ['gemini-2.5-flash-preview-tts'] as const;
export type TTSVoice = typeof TTS_VOICES[number];
export type TTSModel = typeof TTS_MODELS[number];

const VOICE_ALIASES: Record<string, TTSVoice> = {
  alloy: 'Kore',
  echo: 'Charon',
  fable: 'Puck',
  nova: 'Zephyr',
  onyx: 'Fenrir',
  shimmer: 'Aoede',
};

function normalizeVoice(value: string | null): TTSVoice {
  if (!value) return 'Kore';
  if ((TTS_VOICES as readonly string[]).includes(value)) return value as TTSVoice;
  return VOICE_ALIASES[value.toLowerCase()] || 'Kore';
}

function normalizeModel(value: string | null): TTSModel {
  if (!value) return 'gemini-2.5-flash-preview-tts';
  if ((TTS_MODELS as readonly string[]).includes(value)) return value as TTSModel;
  return 'gemini-2.5-flash-preview-tts';
}

// ─── Key Management ────────────────────────────────────────────────────────────
export function getApiKey(): string | null {
  return getChatAiApiKey();
}

export function saveApiKey(key: string): void {
  saveChatAiApiKey(key);
  localStorage.removeItem(LEGACY_TTS_KEY_STORAGE);
}

export function removeApiKey(): void {
  removeChatAiApiKey();
  localStorage.removeItem(LEGACY_TTS_KEY_STORAGE);
}

export function hasApiKey(): boolean {
  return true;
}

export function getMaskedKey(): string {
  return getChatAiApiKey() ? getMaskedChatAiKey() : 'Default Gemini Flash aktif';
}

function speakWithBrowserVoice(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: string) => void,
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onError?.('AI Voice belum tersedia di browser ini.');
    return;
  }
  stopCurrentAudio();
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.92;
  utterance.pitch = 1;
  utterance.onstart = () => onStart?.();
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onError?.('Voice playback gagal.');
  window.speechSynthesis.speak(utterance);
}

// ─── Preferences ──────────────────────────────────────────────────────────────
export function getPreferredVoice(): TTSVoice {
  return normalizeVoice(localStorage.getItem(TTS_PREFERRED_VOICE_STORAGE));
}

export function setPreferredVoice(v: TTSVoice): void {
  localStorage.setItem(TTS_PREFERRED_VOICE_STORAGE, normalizeVoice(v));
}

export function getPreferredModel(): TTSModel {
  return normalizeModel(localStorage.getItem(TTS_PREFERRED_MODEL_STORAGE));
}

export function setPreferredModel(m: TTSModel): void {
  localStorage.setItem(TTS_PREFERRED_MODEL_STORAGE, normalizeModel(m));
}

// ─── Speaker voice mapping ────────────────────────────────────────────────────
const SPEAKER_VOICES: TTSVoice[] = ['Zephyr', 'Charon', 'Aoede', 'Puck', 'Kore', 'Fenrir'];
export function getSpeakerVoice(idx: number): TTSVoice {
  return SPEAKER_VOICES[idx % SPEAKER_VOICES.length];
}

// ─── Audio Cache + Playback ───────────────────────────────────────────────────
const audioCache = new Map<string, string>();
let currentAudio: HTMLAudioElement | null = null;

export function stopCurrentAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

function base64ToBytes(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function pcmToWavBlob(pcm: Uint8Array, sampleRate = 24000, channels = 1, bitsPerSample = 16) {
  const blockAlign = channels * bitsPerSample / 8;
  const byteRate = sampleRate * blockAlign;
  const dataSize = pcm.byteLength;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);
  const writeString = (offset: number, value: string) => {
    for (let index = 0; index < value.length; index += 1) {
      view.setUint8(offset + index, value.charCodeAt(index));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, channels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);
  new Uint8Array(buffer, 44).set(pcm);

  return new Blob([buffer], { type: 'audio/wav' });
}

export async function speakText(
  text: string,
  voice?: TTSVoice,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: string) => void,
): Promise<void> {
  const apiKey = getApiKey();
  if (!apiKey) {
    speakWithBrowserVoice(text, onStart, onEnd, onError);
    return;
  }

  stopCurrentAudio();
  const usedVoice = normalizeVoice(voice ?? getPreferredVoice());
  const usedModel = getPreferredModel();
  const trimmedText = text.trim().slice(0, 1200);
  const cacheKey = `${usedModel}::${usedVoice}::${trimmedText}`;

  try {
    onStart?.();
    if (audioCache.has(cacheKey)) {
      const audio = new Audio(audioCache.get(cacheKey)!);
      currentAudio = audio;
      audio.onended = () => { currentAudio = null; onEnd?.(); };
      audio.onerror = () => { currentAudio = null; onError?.('Playback failed'); };
      void audio.play();
      return;
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(usedModel)}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Say clearly and naturally: ${trimmedText}` }] }],
          generationConfig: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: usedVoice },
              },
            },
          },
        }),
      },
    );

    const data = await response.json().catch(() => null);
    if (response.status === 400) { onError?.('Gemini TTS request tidak valid. Cek model/voice.'); return; }
    if (response.status === 401 || response.status === 403) { onError?.('Gemini API key tidak valid atau belum aktif.'); return; }
    if (response.status === 429) { onError?.('Kuota Gemini sedang penuh. Coba lagi sebentar.'); return; }
    if (!response.ok) { onError?.(`Gemini TTS error ${response.status}`); return; }

    const audioBase64 = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data
      || data?.candidates?.[0]?.content?.parts?.[0]?.inline_data?.data;
    if (!audioBase64) { onError?.('Gemini tidak mengembalikan audio.'); return; }

    const blob = pcmToWavBlob(base64ToBytes(audioBase64));
    const url = URL.createObjectURL(blob);
    audioCache.set(cacheKey, url);

    const audio = new Audio(url);
    currentAudio = audio;
    audio.onended = () => { currentAudio = null; onEnd?.(); };
    audio.onerror = () => { currentAudio = null; onError?.('Playback failed'); };
    void audio.play();
  } catch (error) {
    currentAudio = null;
    onError?.(error instanceof Error ? error.message : 'Unknown Gemini TTS error');
  }
}

function notify(message: string, variant: 'warn' | 'error' = 'warn') {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('tts:notify', { detail: { message, variant } }));
}

export function playAudio(text: string, _rate = 0.9): void {
  if (!text) return;
  void speakText(text, undefined, undefined, undefined, (err) => notify(err || 'Gemini AI Voice gagal diputar.', 'error'));
}
