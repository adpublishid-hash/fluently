// Rewrites Mandarin `pinyin` fields from their Hanzi with tone marks (pinyin-pro).
// Usage: npx vite-node scripts/mandarin-tone-marks.ts [--check]
import { readFileSync, writeFileSync } from 'node:fs';
import { pinyin } from 'pinyin-pro';

const PUNCTUATION: Record<string, string> = {
  '。': '.', '，': ',', '？': '?', '！': '!', '；': ';', '：': ':', '、': ',',
  '“': '"', '”': '"', '‘': "'", '’': "'", '（': '(', '）': ')', '…': '...', '—': '-',
};
const HANZI = /[一-鿿]/;
const VOWEL_START = /^[aeoāáǎàēéěèōóǒò]/;

const segmenter = new Intl.Segmenter('zh', { granularity: 'word' });
const SUFFIXES = new Set([...'性化者论率度感家界式型法学们观']);
const PREFIXES = new Set([...'可反非超']);

function joinSyllables(parts: string[]) {
  return parts.reduce((word, syllable, index) => (index > 0 && VOWEL_START.test(syllable) ? `${word}'${syllable}` : word + syllable), '');
}

function wordPinyin(word: string) {
  return joinSyllables(pinyin(word, { toneType: 'symbol', type: 'array' }));
}

/** Word segments; in vocabulary terms stray single characters are merged back into words. */
function segments(text: string, isTerm: boolean): string[] {
  const parts = [...segmenter.segment(text)].map((item) => item.segment);
  if (!isTerm) return parts;
  const merged: string[] = [];
  parts.forEach((part) => {
    const previous = merged[merged.length - 1];
    if (previous !== undefined && part.length === 1 && (SUFFIXES.has(part) || previous.length === 1)) {
      merged[merged.length - 1] = previous + part;
    } else if (previous !== undefined && previous.length === 1 && PREFIXES.has(previous)) {
      merged[merged.length - 1] = previous + part;
    } else {
      merged.push(part);
    }
  });
  return merged;
}

export function toTonePinyin(hanzi: string): string {
  const isTerm = [...hanzi].every((char) => HANZI.test(char));
  if (isTerm) return segments(hanzi, true).map(wordPinyin).join(' ');
  // Sentences: syllables from the whole sentence (polyphones resolved in
  // context), one syllable per token so no word-segmentation mistakes appear.
  let text = pinyin(hanzi, { toneType: 'symbol', type: 'array', nonZh: 'consecutive' })
    .map((part) => [...part].map((char) => PUNCTUATION[char] ?? char).join(''))
    .join(' ')
    .replace(/\s+([.,?!;:)"])/g, '$1')
    .replace(/([("])\s+/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
  if (/[.?!]$/.test(text)) text = text.charAt(0).toUpperCase() + text.slice(1);
  return text;
}

const files = [
  'src/pages/module/mandarin/mandarinLessonContent.ts',
  'src/pages/module/mandarin/mandarinThemeBank.ts',
];
const check = process.argv.includes('--check');
let changed = 0;

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  let next = source.replace(
    /hanzi:(\s*)'((?:[^'\\]|\\.)*)',(\s*)pinyin:(\s*)'((?:[^'\\]|\\.)*)'/g,
    (match, s1, hanzi, s2, s3, old) => {
      if (!HANZI.test(hanzi)) return match;
      const updated = toTonePinyin(hanzi).replace(/'/g, "\\'");
      if (updated !== old) changed += 1;
      return `hanzi:${s1}'${hanzi}',${s2}pinyin:${s3}'${updated}'`;
    },
  );
  // Theme bank tuples: ['城市化', 'cheng shi hua', 'urbanisasi']
  next = next.replace(/\['([^'\\]+)', '([^'\\]*)', '/g, (match, hanzi, old) => {
    if (!HANZI.test(hanzi) || !/^[\p{L} ']+$/u.test(old)) return match;
    const updated = toTonePinyin(hanzi).replace(/'/g, "\\'");
    if (updated !== old) changed += 1;
    return `['${hanzi}', '${updated}', '`;
  });
  if (!check && next !== source) writeFileSync(file, next);
}

console.log(`${check ? 'Would update' : 'Updated'} ${changed} pinyin fields.`);
