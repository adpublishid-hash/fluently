// Rewrites Mandarin `pinyin` fields from their Hanzi with tone marks (pinyin-pro).
// Usage: npx vite-node scripts/mandarin-tone-marks.ts [--check]
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { customPinyin, pinyin } from 'pinyin-pro';

// Context readings pinyin-pro gets wrong in this content.
customPinyin({
  大城市: 'dà chéng shì',
  只讨论: 'zhǐ tǎo lùn',
  只追求: 'zhǐ zhuī qiú',
  只看: 'zhǐ kàn',
  难题: 'nán tí',
  保证了: 'bǎo zhèng le',
  传播得: 'chuán bō de',
  说得: 'shuō de',
  过得: 'guò de',
  紧张得: 'jǐn zhāng de',
  只用: 'zhǐ yòng',
  只想: 'zhǐ xiǎng',
  中都: 'zhōng dōu',
  不少: 'bù shǎo',
  中国: 'zhōng guó',
  玩得: 'wán de',
  听得懂: 'tīng de dǒng',
  快乐地: 'kuài lè de',
  此消彼长: 'cǐ xiāo bǐ zhǎng',
  看中文: 'kàn zhōng wén',
  因为: 'yīn wèi',
  为环境: 'wèi huán jìng',
  报道了: 'bào dào le',
  都可: 'dōu kě',
  慢慢地: 'màn màn de',
  参加: 'cān jiā',
  调整: 'tiáo zhěng',
  只为: 'zhǐ wèi',
  只靠: 'zhǐ kào',
  只停留: 'zhǐ tíng liú',
  只调查: 'zhǐ diào chá',
  相互: 'xiāng hù',
  所处: 'suǒ chǔ',
  视为: 'shì wéi',
  尤为: 'yóu wéi',
  为基础: 'wéi jī chǔ',
  不当: 'bù dàng',
  不应: 'bù yīng',
  而应: 'ér yīng',
  倒逼: 'dào bī',
  清楚地: 'qīng chu de',
  经得起: 'jīng de qǐ',
  // Adverbial 地 (read as dì by pinyin-pro).
  ...Object.fromEntries(['更多', '更快', '更好', '勇敢', '有根据'].map((adverb) => [`${adverb}地`, `${pinyin(adverb)} de`])),
  // Verb + 得 complements (pinyin-pro reads them as dé).
  ...Object.fromEntries(['唱', '跑', '写', '忙', '考', '做', '学', '听', '走', '吃', '睡', '来', '讲', '准备', '提炼', '控制', '演', '累', '激动', '害羞'].map((verb) => [`${verb}得`, `${pinyin(verb)} de`])),
  长得: 'zhǎng de',
  // Neutral-tone suffixes.
  东西: 'dōng xi',
  意思: 'yì si',
  清楚: 'qīng chu',
  箱子: 'xiāng zi',
  例子: 'lì zi',
  饺子: 'jiǎo zi',
  粽子: 'zòng zi',
  // Erhua: the r joins the previous syllable after conversion.
  点儿: 'diǎn r',
  那儿: 'nà r',
  一点儿: 'yì diǎn r',
  有点儿: 'yǒu diǎn r',
  哪儿: 'nǎ r',
  一会儿: 'yí huì r',
  有空: 'yǒu kòng',
  有空调: 'yǒu kōng tiáo',
  有空气: 'yǒu kōng qì',
  只听: 'zhǐ tīng',
  用量: 'yòng liàng',
  干嘛: 'gàn má',
  请假: 'qǐng jià',
  只会: 'zhǐ huì',
  只能: 'zhǐ néng',
  只好: 'zhǐ hǎo',
  得懂: 'de dǒng',
  切成: 'qiē chéng',
  词汇量: 'cí huì liàng',
  下载量: 'xià zài liàng',
  得多: 'de duō',
  得连: 'de lián',
  看得出: 'kàn de chū',
  长期: 'cháng qī',
  倒茶: 'dào chá',
  取舍: 'qǔ shě',
  只占: 'zhǐ zhàn',
  病假: 'bìng jià',
  假期: 'jià qī',
  // Degree/result complement 得 before an adverb or evaluation is neutral "de", not dé.
  ...Object.fromEntries(['很', '真', '非常', '太', '越来越', '比', '特别', '挺', '十分', '更', '相当', '又', '让', '这么', '那么', '不错', '不好', '清楚', '流利', '厉害', '远', '近', '早', '晚', '快', '慢'].map((next) => [`得${next}`, `de ${pinyin(next)}`])),
});

const PUNCTUATION: Record<string, string> = {
  '。': '.', '，': ',', '？': '?', '！': '!', '；': ';', '：': ':', '、': ',',
  '‘': "'", '’': "'", '（': '(', '）': ')', '…': '...', '—': '-',
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

// Standalone grammar particles are taught with their neutral-tone reading.
const TERM_OVERRIDES: Record<string, string> = { 了: 'le', 得: 'de', 着: 'zhe', '越…越…': 'yuè... yuè...' };

export function toTonePinyin(hanzi: string, asSentence = false): string {
  if (!asSentence && TERM_OVERRIDES[hanzi]) return TERM_OVERRIDES[hanzi];
  const isTerm = !asSentence && [...hanzi].every((char) => HANZI.test(char));
  if (isTerm) return segments(hanzi, true).map(wordPinyin).join(' ');
  // Sentences: syllables from the whole sentence (polyphones resolved in
  // context), one syllable per token so no word-segmentation mistakes appear.
  let text = pinyin(hanzi, { toneType: 'symbol', type: 'array', nonZh: 'consecutive' })
    .map((part) => [...part].map((char) => PUNCTUATION[char] ?? char).join(''))
    .join(' ')
    .replace(/\s+([.,?!;:)])/g, '$1')
    .replace(/\(\s+/g, '(')
    // Opening/closing quotes keep a space on the outside only.
    .replace(/\s*“\s*/g, ' "')
    .replace(/\s*”\s*/g, '" ')
    .replace(/"\s+([.,?!;:)])/g, '"$1')
    // Erhua overrides produce a separate "r" syllable; join it to the previous one.
    .replace(/ r(?=[\s.,?!;:)"]|$)/g, 'r')
    .replace(/\s{2,}/g, ' ')
    .trim();
  if (/[.?!]$/.test(text)) text = text.charAt(0).toUpperCase() + text.slice(1);
  return text;
}

const files = [
  'src/pages/module/mandarin/mandarinLessonContent.ts',
  'src/pages/module/mandarin/mandarinThemeBank.ts',
  'src/pages/module/mandarin/mandarinThemeSentences.ts',
  'src/pages/module/mandarin/mandarinThemeSentencesExtra.ts',
  'src/pages/module/mandarin/mandarinPackSentences.ts',
  'src/features/passages/mandarinPassages.ts',
  'src/features/passages/mandarinPassagesBasic.ts',
  // Authored lesson cores: src/pages/module/mandarin/lessonCore/<level>/<skill>.ts
  ...readdirSync('src/pages/module/mandarin/lessonCore', { recursive: true, encoding: 'utf8' })
    .filter((path) => /^[\w-]+\/[a-z]+\.ts$/.test(path.replace(/\\/g, '/')) && !path.endsWith('index.ts'))
    .map((path) => `src/pages/module/mandarin/lessonCore/${path.replace(/\\/g, '/')}`),
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
  // Theme bank tuples: ['城市化', 'cheng shi hua', 'urbanisasi'] (sentence tuples in
  // mandarinThemeSentences.ts and mandarinPassages.ts are always regenerated).
  const coreFile = /\/lessonCore\//.test(file);
  const sentenceFile = coreFile || /mandarin(ThemeSentences\w*|PackSentences|Passages\w*)\.ts$/.test(file);
  next = next.replace(/\['([^'\\]+)', '([^'\\]*)', '/g, (match, hanzi, old) => {
    if (!HANZI.test(hanzi) || (!sentenceFile && !/^[\p{L} ']+$/u.test(old))) return match;
    // Lesson-core phrases (words, phrases or sentences) are all read syllable by syllable.
    const updated = toTonePinyin(hanzi, coreFile).replace(/'/g, "\\'");
    if (updated !== old) changed += 1;
    return `['${hanzi}', '${updated}', '`;
  });
  if (!check && next !== source) writeFileSync(file, next);
}

console.log(`${check ? 'Would update' : 'Updated'} ${changed} pinyin fields.`);
