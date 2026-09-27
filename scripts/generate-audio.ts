// Pre-generates TTS audio for course content and writes <out>/manifest.json.
//
// Usage:
//   GEMINI_API_KEY=... npm run audio:generate -- [--dry-run] [--scope core|all]
//        [--lang ja,zh,ar,en] [--limit 500] [--out public/audio] [--concurrency 2]
//
// Files are named by audioKey(lang, text) so the client (services/audioLibrary)
// can find them. Existing files are skipped, so the script can be re-run to
// resume. WAV output is converted to MP3 when ffmpeg is installed.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { getPassages, passageLanguages } from '../src/features/passages';
import { getRubricLevels, type RubricLanguage } from '../src/features/rubrics';
import { allExtraEnglishLessons } from '../src/pages/module/english/extra';
import { getMandarinLevelThemeSentences } from '../src/pages/module/mandarin/mandarinThemeSentences';
import { getMandarinLesson } from '../src/pages/module/mandarin/mandarinLessonContent';
import { mandarinLessonCounts, mandarinSkills, type MandarinLevelId } from '../src/pages/module/mandarin/mandarinModuleData';
import { getJapaneseLesson } from '../src/pages/module/japanese/japaneseLessonContent';
import { japaneseLessonCounts, japaneseSkills, type JapaneseLevelId } from '../src/pages/module/japanese/japaneseModuleData';
import { getGeneratedArabicLesson, type GeneratedArabicContentLevel } from '../src/pages/module/arabic/beginner/generatedBeginnerArabicContent';
import { arabicSkills } from '../src/pages/module/arabic/arabicModuleData';
import { audioKey, normalizeSpeechText, type AudioLang } from '../src/services/audioKey';

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(`--${name}`);
const option = (name: string, fallback: string) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

const dryRun = flag('dry-run');
const scope = option('scope', 'core');
const langs = new Set(option('lang', 'en,ja,zh,ar').split(',') as AudioLang[]);
const limit = Number(option('limit', '0')) || Infinity;
const outDir = option('out', 'public/audio');
const concurrency = Math.max(1, Number(option('concurrency', '2')) || 2);
const passageLang: Record<string, AudioLang> = { japanese: 'ja', mandarin: 'zh', arabic: 'ar' };
const rubricLang: Record<RubricLanguage, AudioLang> = { english: 'en', japanese: 'ja', mandarin: 'zh', arabic: 'ar' };

type Item = { lang: AudioLang; text: string };
const items = new Map<string, Item>();
const add = (lang: AudioLang, text: string | undefined) => {
  if (!text) return;
  const normalized = normalizeSpeechText(text);
  if (normalized.length < 1 || normalized.length > 1200 || !langs.has(lang)) return;
  items.set(audioKey(lang, normalized), { lang, text: normalized });
};

// ---------------------------------------------------------------- core
passageLanguages.forEach((language) => {
  const lang = passageLang[language];
  getPassages(language).forEach((passage) => {
    passage.sentences.forEach((sentence) => add(lang, sentence.text));
    passage.glossary.forEach((word) => add(lang, word.text));
    // Exam listening plays the whole passage as one utterance.
    add(lang, passage.sentences.map((sentence) => sentence.text).join(language === 'arabic' ? ' ' : ''));
  });
});
(['advanced', 'proficiency', 'hsk-7', 'hsk-8', 'hsk-9'] as MandarinLevelId[]).forEach((level) =>
  getMandarinLevelThemeSentences(level).forEach((sentence) => add('zh', sentence.hanzi)));
(['english', 'japanese', 'mandarin', 'arabic'] as RubricLanguage[]).forEach((language) =>
  getRubricLevels(language).forEach((level) => {
    add(rubricLang[language], level.speaking.model);
    add(rubricLang[language], level.writing.model);
  }));
allExtraEnglishLessons().forEach(({ lesson }) => {
  lesson.examples.forEach(([english]) => add('en', english));
  lesson.dialogue?.forEach(([, english]) => add('en', english));
  if (lesson.dialogue) add('en', lesson.dialogue.map(([, english]) => english).join(' '));
});

// ---------------------------------------------------------------- all
if (scope === 'all') {
  (Object.keys(mandarinLessonCounts) as MandarinLevelId[]).forEach((level) =>
    mandarinSkills.forEach(({ id }) => {
      for (let lesson = 1; lesson <= mandarinLessonCounts[level][id]; lesson += 1) {
        const data = getMandarinLesson(id, lesson, level);
        [...data.examples, ...data.vocabulary, ...data.patterns].forEach((item) => add('zh', item.hanzi));
      }
    }));
  (Object.keys(japaneseLessonCounts) as JapaneseLevelId[]).forEach((level) =>
    japaneseSkills.forEach(({ id }) => {
      for (let lesson = 1; lesson <= japaneseLessonCounts[level][id]; lesson += 1) {
        const data = getJapaneseLesson(id, lesson, level);
        [...data.examples, ...data.vocabulary, ...data.patterns, ...data.dialogue, data.listeningScript].forEach((item) => add('ja', item?.japanese));
        data.shadowingDrill.forEach((line) => add('ja', line));
      }
    }));
  (['intermediate', 'upper-intermediate', 'advanced', 'proficiency', 'mastery', 'scholar'] as GeneratedArabicContentLevel[]).forEach((level) =>
    arabicSkills.forEach(({ id }) => {
      for (let lesson = 1; lesson <= 20; lesson += 1) {
        const data = getGeneratedArabicLesson(id, lesson, level);
        [...data.examples, ...(data.vocabulary ?? []), ...(data.patterns ?? [])].forEach((item) => add('ar', item.arabic));
      }
    }));
}

// ---------------------------------------------------------------- report
const manifestPath = join(outDir, 'manifest.json');
const manifest: { version: number; generatedAt: string | null; files: Record<string, string> } = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, 'utf8'))
  : { version: 1, generatedAt: null, files: {} };
const pending = [...items.entries()].filter(([key]) => !manifest.files[key]).slice(0, limit);
const byLang = (list: Array<[string, Item]>) => Object.fromEntries(
  (['en', 'ja', 'zh', 'ar'] as AudioLang[]).map((lang) => {
    const rows = list.filter(([, item]) => item.lang === lang);
    return [lang, { items: rows.length, chars: rows.reduce((sum, [, item]) => sum + item.text.length, 0) }];
  }),
);
console.log(`scope=${scope} texts=${items.size} alreadyGenerated=${items.size - [...items.keys()].filter((key) => !manifest.files[key]).length} pending=${pending.length}`);
console.table(byLang(pending));
if (dryRun) process.exit(0);

// ---------------------------------------------------------------- synthesis
const apiKey = process.env.GEMINI_API_KEY || process.env.FREE_GEMINI_API_KEY;
if (!apiKey) {
  console.error('Set GEMINI_API_KEY (or FREE_GEMINI_API_KEY) to generate audio.');
  process.exit(1);
}
const model = process.env.GEMINI_TTS_MODEL || 'gemini-2.5-flash-preview-tts';
const voice: Record<AudioLang, string> = { en: 'Kore', ja: 'Kore', zh: 'Kore', ar: 'Charon' };
const instruction: Record<AudioLang, string> = {
  en: 'Say clearly and naturally',
  ja: 'Read this Japanese clearly and naturally',
  zh: 'Read this Mandarin clearly and naturally with accurate tones',
  ar: 'Read this Arabic clearly and naturally with correct makharij and vowel length',
};
const hasFfmpeg = (() => {
  try { execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' }); return true; } catch { return false; }
})();

function wav(pcm: Buffer, sampleRate = 24000) {
  const header = Buffer.alloc(44);
  header.write('RIFF', 0); header.writeUInt32LE(36 + pcm.length, 4); header.write('WAVE', 8);
  header.write('fmt ', 12); header.writeUInt32LE(16, 16); header.writeUInt16LE(1, 20); header.writeUInt16LE(1, 22);
  header.writeUInt32LE(sampleRate, 24); header.writeUInt32LE(sampleRate * 2, 28); header.writeUInt16LE(2, 32); header.writeUInt16LE(16, 34);
  header.write('data', 36); header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

async function synthesize(item: Item, attempt = 1): Promise<Buffer> {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey!)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `${instruction[item.lang]}: ${item.text}` }] }],
      generationConfig: { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice[item.lang] } } } },
    }),
  });
  if ((response.status === 429 || response.status >= 500) && attempt <= 5) {
    await new Promise((resolve) => setTimeout(resolve, 2000 * 2 ** attempt));
    return synthesize(item, attempt + 1);
  }
  const data = await response.json().catch(() => null) as { candidates?: Array<{ content?: { parts?: Array<{ inlineData?: { data?: string } }> } }> } | null;
  const audio = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!response.ok || !audio) throw new Error(`TTS failed (${response.status})`);
  return Buffer.from(audio, 'base64');
}

function saveManifest() {
  manifest.generatedAt = new Date().toISOString();
  manifest.files = Object.fromEntries(Object.entries(manifest.files).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 1)}\n`);
}

let done = 0;
let failed = 0;
const queue = [...pending];
async function worker() {
  for (let next = queue.shift(); next; next = queue.shift()) {
    const [key, item] = next;
    try {
      const wavPath = join(outDir, `${key}.wav`);
      mkdirSync(dirname(wavPath), { recursive: true });
      writeFileSync(wavPath, wav(await synthesize(item)));
      let file = `${key}.wav`;
      if (hasFfmpeg) {
        execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', wavPath, '-ac', '1', '-b:a', '48k', join(outDir, `${key}.mp3`)]);
        unlinkSync(wavPath);
        file = `${key}.mp3`;
      }
      manifest.files[key] = file;
      done += 1;
      if (done % 20 === 0) {
        saveManifest();
        console.log(`${done}/${pending.length} generated`);
      }
    } catch (error) {
      failed += 1;
      console.warn(`skip ${key}: ${(error as Error).message}`);
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, worker));
saveManifest();
console.log(`Done: ${done} generated, ${failed} failed. Format: ${hasFfmpeg ? 'mp3' : 'wav (install ffmpeg for mp3)'}.`);
