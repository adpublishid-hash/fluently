// Shared text-to-speech helper for lesson and practice pages. Plays a
// pre-generated recording when one exists, otherwise the browser voice.
import { findPregeneratedAudio } from '../services/audioLibrary';

let currentAudio: HTMLAudioElement | null = null;
let requestId = 0;

export function stopSpeaking() {
  requestId += 1;
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
}

function speakWithBrowser(text: string, lang: string, rate: number, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }
  window.speechSynthesis.speak(utterance);
}

/** Speaks `text` in `lang` (BCP-47, e.g. "ja-JP"). */
export function speak(text: string, lang: string, options: { rate?: number; onEnd?: () => void } = {}) {
  stopSpeaking();
  const id = requestId;
  const rate = options.rate ?? 0.85;
  void findPregeneratedAudio(text, lang).then((url) => {
    if (id !== requestId) return; // a newer request or stop() happened meanwhile
    if (!url) {
      speakWithBrowser(text, lang, rate, options.onEnd);
      return;
    }
    const audio = new Audio(url);
    audio.playbackRate = Math.max(0.5, Math.min(1.5, rate / 0.85));
    currentAudio = audio;
    audio.onended = () => { currentAudio = null; options.onEnd?.(); };
    audio.onerror = () => { currentAudio = null; speakWithBrowser(text, lang, rate, options.onEnd); };
    void audio.play().catch(() => undefined);
  });
}
