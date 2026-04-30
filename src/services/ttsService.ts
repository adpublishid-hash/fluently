/**
 * Shared TTS Service — Bring Your Own Key (BYOK)
 * Accessible from anywhere in the app.
 * Uses OpenAI Text-to-Speech API with user-provided API key.
 */

export const TTS_API_KEY_STORAGE = 'talky_openai_api_key';
export const TTS_PREFERRED_VOICE_STORAGE = 'talky_tts_preferred_voice';
export const TTS_PREFERRED_MODEL_STORAGE = 'talky_tts_preferred_model';

export const TTS_VOICES = ['alloy', 'echo', 'fable', 'nova', 'onyx', 'shimmer'] as const;
export const TTS_MODELS = ['tts-1', 'tts-1-hd'] as const;
export type TTSVoice = typeof TTS_VOICES[number];
export type TTSModel = typeof TTS_MODELS[number];

// ─── Key Management ────────────────────────────────────────────────────────────
export function getApiKey(): string | null {
  return localStorage.getItem(TTS_API_KEY_STORAGE);
}
export function saveApiKey(key: string): void {
  localStorage.setItem(TTS_API_KEY_STORAGE, key.trim());
}
export function removeApiKey(): void {
  localStorage.removeItem(TTS_API_KEY_STORAGE);
}
export function hasApiKey(): boolean {
  const k = getApiKey();
  return !!k && k.startsWith('sk-');
}
export function getMaskedKey(): string {
  const k = getApiKey();
  return k ? `sk-...${k.slice(-6)}` : '';
}

// ─── Preferences ──────────────────────────────────────────────────────────────
export function getPreferredVoice(): TTSVoice {
  return (localStorage.getItem(TTS_PREFERRED_VOICE_STORAGE) as TTSVoice) ?? 'nova';
}
export function setPreferredVoice(v: TTSVoice): void {
  localStorage.setItem(TTS_PREFERRED_VOICE_STORAGE, v);
}
export function getPreferredModel(): TTSModel {
  return (localStorage.getItem(TTS_PREFERRED_MODEL_STORAGE) as TTSModel) ?? 'tts-1';
}
export function setPreferredModel(m: TTSModel): void {
  localStorage.setItem(TTS_PREFERRED_MODEL_STORAGE, m);
}

// ─── Speaker voice mapping ────────────────────────────────────────────────────
const SPEAKER_VOICES: TTSVoice[] = ['nova', 'onyx', 'shimmer', 'echo', 'alloy', 'fable'];
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

export async function speakText(
  text: string,
  voice?: TTSVoice,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: string) => void,
): Promise<void> {
  const apiKey = getApiKey();
  if (!apiKey) { onError?.('No API key configured.'); return; }

  stopCurrentAudio();
  const usedVoice = voice ?? getPreferredVoice();
  const usedModel = getPreferredModel();
  const cacheKey = `${usedModel}::${usedVoice}::${text}`;

  try {
    onStart?.();
    if (audioCache.has(cacheKey)) {
      const audio = new Audio(audioCache.get(cacheKey)!);
      currentAudio = audio;
      audio.onended = () => { currentAudio = null; onEnd?.(); };
      audio.onerror = () => { currentAudio = null; onError?.('Playback failed'); };
      audio.play();
      return;
    }

    const res = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: usedModel, input: text, voice: usedVoice, response_format: 'mp3' }),
    });

    if (res.status === 401) { onError?.('Invalid API key. Please check your key.'); return; }
    if (res.status === 429) { onError?.('Rate limit exceeded. Please wait.'); return; }
    if (!res.ok) { onError?.(`API error ${res.status}`); return; }

    const blob = new Blob([await res.arrayBuffer()], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    audioCache.set(cacheKey, url);

    const audio = new Audio(url);
    currentAudio = audio;
    audio.onended = () => { currentAudio = null; onEnd?.(); };
    audio.onerror = () => { currentAudio = null; onError?.('Playback failed'); };
    audio.play();
  } catch (e) {
    currentAudio = null;
    onError?.(e instanceof Error ? e.message : 'Unknown error');
  }
}

// Notify listeners (e.g. global toast) about TTS issues so we never fall back
// to the browser's voice. Lessons must use the user's BYOK AI TTS.
function notify(message: string, variant: 'warn' | 'error' = 'warn') {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('tts:notify', { detail: { message, variant } }));
}

// Unified TTS entry point for lessons. Uses AI TTS (BYOK) only — if no key is
// configured or the request fails, surfaces a toast prompting the user to open
// Profile settings instead of silently using the browser voice.
export function playAudio(text: string, _rate = 0.9): void {
  if (!text) return;
  if (!hasApiKey()) {
    notify('Aktifkan AI Voice — setup API key di Profile untuk mendengar audio.', 'warn');
    return;
  }
  speakText(text, undefined, undefined, undefined, (err) => notify(err || 'AI Voice gagal diputar.', 'error'));
}
