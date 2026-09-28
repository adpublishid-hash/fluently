// Pre-generated audio (see scripts/generate-audio.ts). Pages play a recorded
// file when one exists for the exact text and fall back to live TTS otherwise.
import { audioKey, audioLangFromTag } from './audioKey';

type Manifest = { version: number; files: Record<string, string> };

const AUDIO_BASE = (import.meta.env.VITE_AUDIO_BASE_URL as string | undefined)?.replace(/\/$/, '') || '/audio';
let manifestPromise: Promise<Manifest> | null = null;

function loadManifest(): Promise<Manifest> {
  manifestPromise ??= fetch(`${AUDIO_BASE}/manifest.json`)
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => (data && typeof data.files === 'object' ? data as Manifest : { version: 0, files: {} }))
    .catch(() => ({ version: 0, files: {} }));
  return manifestPromise;
}

/** URL of the pre-generated recording for `text`, or null. */
export async function findPregeneratedAudio(text: string, langTag?: string): Promise<string | null> {
  if (!text.trim()) return null;
  const manifest = await loadManifest();
  const file = manifest.files[audioKey(audioLangFromTag(langTag, text), text)];
  return file ? `${AUDIO_BASE}/${file}` : null;
}

/** Test hook: forget the cached manifest. */
export function resetAudioManifest() {
  manifestPromise = null;
}
