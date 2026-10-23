// AI-generated mock exams in the official section layout of each language:
// JLPT (Japanese), HSK (Mandarin), TOAFL (Arabic) and a CEFR test (English).
// Part ids match src/features/learning/examFormats.ts so the client can mix
// generated parts with its built-in question bank.

const LEVELS = {
  english: { a1: 'CEFR A1', a2: 'CEFR A2', b1: 'CEFR B1', b2: 'CEFR B2', c1: 'CEFR C1', c2: 'CEFR C2' },
  japanese: { beginner: 'JLPT N5', elementary: 'JLPT N4', intermediate: 'JLPT N3', advanced: 'JLPT N2', proficiency: 'JLPT N1' },
  mandarin: { beginner: 'HSK 1', elementary: 'HSK 2', intermediate: 'HSK 3', 'upper-intermediate': 'HSK 4', advanced: 'HSK 5', proficiency: 'HSK 6' },
  arabic: {
    beginner: 'TOAFL Pemula (A1)',
    elementary: 'TOAFL Elementary (A2)',
    intermediate: 'TOAFL Intermediate (B1)',
    'upper-intermediate': 'TOAFL Upper-Intermediate (B2)',
    advanced: 'TOAFL Advanced (C1)',
    proficiency: 'TOAFL Superior (C2)',
  },
};

// Levels whose learners still need reading aids in stems and passages.
const BEGINNER_LEVELS = new Set(['a1', 'a2', 'beginner', 'elementary']);

const LANGUAGES = {
  english: {
    name: 'English',
    exam: 'a Cambridge-style CEFR test',
    script: /[A-Za-z]/,
    readingAid: '',
  },
  japanese: {
    name: 'Japanese',
    exam: 'the JLPT (日本語能力試験)',
    script: /[぀-ヿ㐀-鿿]/,
    readingAid: 'Use only kanji of this JLPT level; write harder words in kana.',
  },
  mandarin: {
    name: 'Mandarin Chinese',
    exam: 'the HSK (汉语水平考试)',
    script: /[㐀-鿿]/,
    readingAid: 'Simplified characters only. For HSK 1-2 add tone-marked pinyin in brackets after every Chinese stem, passage and option, as the real HSK 1-2 papers do.',
  },
  arabic: {
    name: 'Modern Standard Arabic',
    exam: 'the TOAFL (Test of Arabic as a Foreign Language)',
    script: /[؀-ۿ]/,
    readingAid: 'Use full harakat for Pemula-Intermediate, partial harakat for Upper-Intermediate, none above.',
  },
};

// kind: listening | reading | vocabulary | grammar | writing
const PARTS = {
  english: [
    { id: 'listening', kind: 'listening', count: 8, native: 'Listening', types: 'short dialogues and announcements; questions on gist, detail, speaker attitude' },
    { id: 'reading', kind: 'reading', count: 8, native: 'Reading', types: '2-3 texts (notice, email, article) with gist, detail, inference and reference questions' },
    { id: 'vocabulary', kind: 'vocabulary', count: 8, native: 'Vocabulary', types: 'word in context, collocation, synonym, word formation' },
    { id: 'grammar', kind: 'grammar', count: 8, native: 'Grammar', types: 'sentence completion and error recognition' },
  ],
  japanese: [
    { id: 'moji-goi', kind: 'vocabulary', count: 8, native: '言語知識（文字・語彙）', types: '漢字読み (choose the kana reading of the word in 【】), 表記 (choose the kanji for the kana word in 【】), 文脈規定 (choose the word for （　）), 言い換え類義 (choose the closest meaning)' },
    { id: 'bunpou', kind: 'grammar', count: 6, native: '言語知識（文法）', types: '文法形式の判断 (choose the grammar form for （　）) and 文の組み立て (sentence with ＿＿ ＿＿ ★ ＿＿; the 4 options are the fragments and the answer is the fragment that goes in ★)' },
    { id: 'dokkai', kind: 'reading', count: 8, native: '読解', types: '短文 and 中文 passages (and 情報検索 notices from N3), questions in Japanese on main point, reason, reference and author view' },
    { id: 'choukai', kind: 'listening', count: 8, native: '聴解', types: '課題理解, ポイント理解, 発話表現 and 即時応答 (one utterance, options are replies); write the audio as a script with speaker labels such as 男： / 女：' },
  ],
  mandarin: [
    { id: 'tingli', kind: 'listening', count: 10, native: '听力', types: '判断对错 (audio sentence + a statement in the stem, options exactly ["对","错"]) and 选择 (short dialogue with 男：/女： labels, question about it)' },
    { id: 'yuedu', kind: 'reading', count: 10, native: '阅读', types: '选词填空 (passage with a blank), 排列顺序 from HSK 4 (passage lists sentences A/B/C, options are orders like "BAC"), 阅读理解 (short passages with questions)' },
    { id: 'cihui', kind: 'vocabulary', count: 10, native: '词汇与书写', types: 'choose the character for the pinyin, choose the measure word (量词), word meaning in context, choose the correct word for the blank' },
    { id: 'shuxie', kind: 'writing', count: 1, native: '书写', minLevel: 'intermediate', types: 'HSK 3: 完成句子 / short paragraph; HSK 4: 看图用词造句 style sentences with given words; HSK 5-6: 80-100 字 short essay using given words' },
  ],
  arabic: [
    { id: 'istima', kind: 'listening', count: 10, native: 'فهم المسموع', types: 'short conversations and monologues (speaker labels such as الرجل: / المرأة:), questions on detail, purpose and inference' },
    { id: 'tarakib', kind: 'grammar', count: 10, native: 'التراكيب والتعبير', types: 'أكمل الفراغ (choose the word for the blank, testing i\'rab, agreement, verb form, huruf jar) and تحديد الخطأ (a sentence with four marked parts (أ)(ب)(ج)(د); the options are those four parts in that order and the answer is the wrong one)' },
    { id: 'qiraah', kind: 'reading', count: 10, native: 'فهم المقروء', types: '2-3 passages with questions on main idea, detail, meaning of a word in context, reference of a pronoun and (from Intermediate) i\'rab of a word' },
  ],
};

const LEVEL_ORDER = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2', 'beginner', 'elementary', 'intermediate', 'upper-intermediate', 'advanced', 'proficiency'];
const levelRank = (language, levelId) => Object.keys(LEVELS[language]).indexOf(levelId);

function normalizeExamLanguage(value) {
  const language = String(value || '').trim().toLowerCase();
  return LANGUAGES[language] ? language : null;
}

function normalizeExamLevel(language, value) {
  const levelId = String(value || '').trim().toLowerCase();
  return LEVELS[language]?.[levelId] && LEVEL_ORDER.includes(levelId) ? levelId : null;
}

/** Parts of one exam level; writing parts only exist from their minimum level. */
function getExamParts(language, levelId) {
  return (PARTS[language] || []).filter((part) => !part.minLevel || levelRank(language, levelId) >= levelRank(language, part.minLevel));
}

function findExamPart(language, levelId, partId) {
  return getExamParts(language, levelId).find((part) => part.id === partId) || null;
}

const instructionLanguage = (language, levelId) => (language === 'english' || !BEGINNER_LEVELS.has(levelId)
  ? `in ${LANGUAGES[language].name}, as on the real exam`
  : `in ${LANGUAGES[language].name} with a short Indonesian translation in brackets, because this is a beginner level`);

function buildSectionPrompt({ language, levelId, part, seed }) {
  const spec = LANGUAGES[language];
  const level = LEVELS[language][levelId];
  const header = `You are an experienced item writer for ${spec.exam}. Write ORIGINAL practice items (never copy real exam items) for Indonesian learners.

Exam: ${spec.exam}
Level: ${level}
Section: ${part.native}
Item types for this section: ${part.types}
${spec.readingAid}
Variation seed: ${seed} (use it to pick fresh situations, topics and words; do not reuse common textbook examples).`;

  if (part.kind === 'writing') {
    return `${header}

Task: write ONE writing task for this section at this level.
- prompt: the task as printed on the exam, ${instructionLanguage(language, levelId)}.
- instruction: the same task explained in Indonesian (what to write, how long).
- words: 3-5 words the answer must use (empty when the format has none).
- target: expected length, e.g. "80 字".

Return valid JSON only:
{"task":{"prompt":"","instruction":"","words":[""],"target":""}}`;
  }

  const grouping = part.kind === 'reading'
    ? 'Group the items by passage: each group has a passage (and optional title) followed by 2-4 questions about it.'
    : part.kind === 'listening'
      ? 'Each group has an "audio" script (what the candidate hears; it is read aloud by text-to-speech and NOT shown) followed by 1-2 questions about it. Never put the answer only in the stem.'
      : 'Put each item in its own group without passage or audio.';

  return `${header}

Task: write exactly ${part.count} multiple-choice items for this section, using a balanced mix of the item types above.
${grouping}

Item rules:
- stem: the question ${instructionLanguage(language, levelId)}.
- options: 4 options (2 only for 对/错 items), all plausible, same form and length, exactly one correct.
- answer: 0-based index of the correct option.
- explanation: Indonesian explanation of why the answer is right and why the strongest distractor is wrong (1-3 sentences).
- type: the item type name used above (e.g. "漢字読み", "判断对错", "تحديد الخطأ").
- Stay strictly within the vocabulary and grammar of ${level}. Double-check every answer key.

Return valid JSON only:
{"groups":[{"title":"","passage":"","audio":"","questions":[{"type":"","stem":"","options":["","","",""],"answer":0,"explanation":""}]}]}`;
}

function buildVerifyPrompt({ language, levelId, groups }) {
  const spec = LANGUAGES[language];
  let number = 0;
  const body = groups.map((group) => {
    const context = [
      group.passage ? `Passage:\n${group.passage}` : '',
      group.audio ? `Audio transcript:\n${group.audio}` : '',
    ].filter(Boolean).join('\n');
    const questions = group.questions.map((question) => {
      number += 1;
      return `Q${number}. ${question.stem}\n${question.options.map((option, index) => `  ${index}) ${option}`).join('\n')}`;
    }).join('\n');
    return [context, questions].filter(Boolean).join('\n');
  }).join('\n\n');

  return `You are taking a ${LEVELS[language][levelId]} ${spec.name} practice test. Answer every question independently and carefully.

${body}

For each question give the 0-based index of the single best option. Set "unclear" to true when no option or more than one option is correct.

Return valid JSON only:
{"answers":[{"q":1,"answer":0,"unclear":false}]}`;
}

const clean = (value, max) => String(value ?? '').trim().slice(0, max);
const LABELLED_OPTION = /^\(?[A-Da-dأ-د]\)|^[A-D][.)]/;

function shuffleOptions(question, random) {
  if (question.options.some((option) => LABELLED_OPTION.test(option))) return question;
  const order = question.options.map((_, index) => index);
  for (let index = order.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [order[index], order[swap]] = [order[swap], order[index]];
  }
  return { ...question, options: order.map((index) => question.options[index]), answer: order.indexOf(question.answer) };
}

/**
 * Validates generated groups: unique non-empty options, an in-range key, an
 * explanation, target-language script, and the passage/audio the section
 * needs. Options are reshuffled so the key position is not biased.
 */
function normalizeSection(language, part, parsed, random = Math.random) {
  if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.groups)) return [];
  const script = LANGUAGES[language].script;
  let remaining = part.count;
  const groups = [];

  for (const raw of parsed.groups) {
    if (remaining <= 0 || !raw || typeof raw !== 'object') break;
    const group = {
      title: clean(raw.title, 160),
      passage: clean(raw.passage, 2500),
      audio: clean(raw.audio, 1500),
    };
    if (part.kind === 'reading' && !group.passage) continue;
    if (part.kind === 'listening' && !group.audio) continue;
    if (part.kind !== 'reading') group.passage = '';
    if (part.kind !== 'listening') group.audio = '';

    const questions = (Array.isArray(raw.questions) ? raw.questions : [])
      .map((item) => {
        const options = Array.isArray(item?.options) ? item.options.map((option) => clean(option, 200)) : [];
        const answer = Number(item?.answer);
        return {
          type: clean(item?.type, 40),
          stem: clean(item?.stem, 600),
          options,
          answer,
          explanation: clean(item?.explanation, 600),
        };
      })
      .filter((item) => item.stem && item.explanation
        && item.options.length >= 2 && item.options.length <= 4
        && item.options.every(Boolean) && new Set(item.options).size === item.options.length
        && Number.isInteger(item.answer) && item.answer >= 0 && item.answer < item.options.length
        && script.test([group.passage, group.audio, item.stem, ...item.options].join(' ')))
      .slice(0, remaining)
      .map((item) => shuffleOptions(item, random));

    if (!questions.length) continue;
    remaining -= questions.length;
    groups.push({ ...group, questions });
  }
  return groups;
}

/** Drops questions whose independent re-answer disagrees with the key or is marked unclear. */
function applyVerification(groups, parsed) {
  const answers = new Map();
  if (parsed && Array.isArray(parsed.answers)) {
    parsed.answers.forEach((item) => answers.set(Number(item?.q), item));
  }
  let number = 0;
  let dropped = 0;
  const kept = groups
    .map((group) => ({
      ...group,
      questions: group.questions.filter((question) => {
        number += 1;
        const check = answers.get(number);
        const ok = check && !check.unclear && Number(check.answer) === question.answer;
        if (!ok) dropped += 1;
        return ok;
      }),
    }))
    .filter((group) => group.questions.length);
  return { groups: kept, dropped };
}

function normalizeWritingTask(parsed) {
  const task = parsed && typeof parsed === 'object' ? parsed.task : null;
  if (!task || typeof task !== 'object') return null;
  const prompt = clean(task.prompt, 600);
  const instruction = clean(task.instruction, 600);
  if (!prompt || !instruction) return null;
  return {
    prompt,
    instruction,
    words: Array.isArray(task.words) ? task.words.map((word) => clean(word, 30)).filter(Boolean).slice(0, 6) : [],
    target: clean(task.target, 60),
  };
}

const countQuestions = (groups) => groups.reduce((sum, group) => sum + group.questions.length, 0);

module.exports = {
  LEVELS,
  applyVerification,
  buildSectionPrompt,
  buildVerifyPrompt,
  countQuestions,
  findExamPart,
  getExamParts,
  normalizeExamLanguage,
  normalizeExamLevel,
  normalizeSection,
  normalizeWritingTask,
};
