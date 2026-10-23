// Prompts and output validation for the Japanese, Mandarin and Arabic AI Chat
// coach. Each language has its own script, reading system, level scale and
// error checklist, so the generated material is specific to that language
// instead of a translated English lesson.

const LANGUAGES = new Set(['japanese', 'mandarin', 'arabic']);
const FOCUSES = new Set(['vocabulary', 'grammar', 'pronunciation', 'speaking', 'reading', 'writing']);
const CEFR = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const LEVEL_NAMES = {
  japanese: { A1: 'JLPT N5', A2: 'JLPT N4', B1: 'JLPT N3', B2: 'JLPT N2', C1: 'JLPT N1', C2: 'JLPT N1+ (near-native)' },
  mandarin: { A1: 'HSK 1', A2: 'HSK 2', B1: 'HSK 3', B2: 'HSK 4', C1: 'HSK 5', C2: 'HSK 6' },
  arabic: {
    A1: 'A1 Pemula (MSA)',
    A2: 'A2 Elementary (MSA)',
    B1: 'B1 Intermediate (MSA)',
    B2: 'B2 Upper-Intermediate (MSA)',
    C1: 'C1 Advanced (MSA)',
    C2: 'C2 Superior (MSA)',
  },
};

const SPECS = {
  japanese: {
    name: 'Japanese',
    script: /[぀-ヿ㐀-鿿]/,
    word: 'Write the word as a Japanese adult normally writes it (kanji + okurigana). At N5/N4 only use kanji from that JLPT list; otherwise write it in kana.',
    reading: 'Hiragana reading, then " · ", then Hepburn romaji with long vowels written as ou/ei/aa (e.g. "たべる · taberu", "がっこう · gakkou").',
    pos: 'noun, verb, i-adjective, na-adjective, adverb, particle, counter, expression',
    note: 'Verbs: group (godan/ichidan/irregular) + masu-form, e.g. "ichidan · 食べます". Nouns: counter or politeness note when useful. Kanji words: the key kanji with its on/kun reading.',
    example: 'Natural Japanese sentence. A1-A2 use polite です/ます form; B2+ may use plain form when natural.',
    exampleReading: 'The whole example in hiragana (furigana substitute) so a beginner can read every kanji.',
    levelRules: {
      A1: 'N5: hiragana/katakana, basic kanji, です/ます, は/が/を/に/で/へ/と/も, numbers, daily survival words.',
      A2: 'N4: て-form, ない-form, た-form, ～たい, ～ている, ～てもいい, common kanji, everyday situations.',
      B1: 'N3: potential, passive, conditionals と/ば/たら/なら, ～そう/～よう/～らしい, plain style in conversation.',
      B2: 'N2: causative, keigo basics (尊敬語/謙譲語), formal written style, abstract topics, news vocabulary.',
      C1: 'N1: advanced grammar, set phrases, business keigo, nuance between near-synonyms, editorial style.',
      C2: 'N1+: idioms (慣用句/四字熟語), register shifts, literary and academic Japanese.',
    },
    pronunciation: 'long vowels (長音), double consonant っ (促音), moraic ん, mora timing, pitch accent (mark high/low, e.g. "ha↗shi↘ (箸)"), vowel devoicing in です/した, ら-row flap, つ/ふ/しゅ, particle readings は(wa)/へ(e)/を(o), katakana loanwords, question intonation',
    grammarChecklist: 'particles は vs が, を, に vs で, へ, と, も; verb conjugation (ます/て/ない/た/dictionary forms); i-adjective vs na-adjective conjugation; politeness consistency (do not mix plain and です/ます); word order (verb last); counters (～つ, ～人, ～枚, ～本); correct kana vs kanji usage for the level; katakana for loanwords.',
    writingScript: 'Accept hiragana for A1. From A2 encourage the kanji of the level. Romaji answers are allowed at A1 but always show the kana/kanji version.',
    transcriptNote: 'Browser speech recognition returns kanji/kana text, so judge which words were recognised, not the exact kanji choice.',
  },
  mandarin: {
    name: 'Mandarin Chinese',
    script: /[㐀-鿿]/,
    word: 'Simplified Chinese characters (简体字).',
    reading: 'Hanyu Pinyin with tone marks (ā á ǎ à, neutral tone unmarked), syllables of one word written together, e.g. "xuéshēng", "xièxie". Never tone numbers.',
    pos: 'noun, verb, adjective, adverb, measure word, particle, preposition, conjunction, pronoun, phrase',
    note: 'Nouns: the measure word (量词) with pinyin, e.g. "量词: 本 běn". Also give the traditional form if it differs, and any tone sandhi (不/一/3rd tone).',
    example: 'Natural Simplified Chinese sentence using the word.',
    exampleReading: 'Full Hanyu Pinyin with tone marks of the example sentence.',
    levelRules: {
      A1: 'HSK 1: 150 core words, 是/有/在, 吗 questions, 不/没, numbers, time, very short sentences.',
      A2: 'HSK 2: 了, 过, 在 + verb, 要/想/会, 比 comparisons, 因为…所以…, daily situations.',
      B1: 'HSK 3: result/direction complements, 把, 被, 得 degree complement, 虽然…但是…, 一…就….',
      B2: 'HSK 4: potential complements, 连…都, 除了…以外, 不但…而且…, opinions, work and study.',
      C1: 'HSK 5: formal written words, 成语 basics, argumentative connectors, news and society topics.',
      C2: 'HSK 6: 成语, 书面语, nuance and register, academic and professional Chinese.',
    },
    pronunciation: 'four tones + neutral tone, 3rd tone sandhi (你好 ní hǎo), 不/一 tone changes, retroflex zh/ch/sh/r, dental z/c/s, palatal j/q/x, ü (lǜ, qù), -n vs -ng finals, aspirated vs unaspirated (b/p, d/t, g/k), erhua (儿化), sentence rhythm',
    grammarChecklist: 'word order Subject + Time + Place + Verb + Object; measure words between number and noun; 是 not used before adjectives (use 很); aspect particles 了/过/着 and 在 progressive; 的/得/地; complements (result, direction, degree, potential); question forms 吗/呢/吧 and question words in place; negation 不 vs 没; 把/被 structures; correct characters (no homophone errors).',
    writingScript: 'Expect Chinese characters. Pinyin-only answers are allowed at A1 but always show the character version and encourage typing hanzi with a pinyin keyboard.',
    transcriptNote: 'Browser speech recognition returns Chinese characters; a wrong character usually means the tone or initial was unclear.',
  },
  arabic: {
    name: 'Modern Standard Arabic (Fusha)',
    script: /[؀-ۿ]/,
    word: 'Modern Standard Arabic with full harakat (tasykil), e.g. "كِتَابٌ".',
    reading: 'Indonesian-friendly Latin transliteration: long vowels doubled (aa, ii, uu), ʿ for ʿain, \' for hamzah, sy for ش, kh for خ, dz for ذ, e.g. "kitaabun", "ʿilmun".',
    pos: 'isim, fi\'il, harf, shifat, dhamir, zharaf, ungkapan',
    note: 'Isim: gender (mudzakkar/muannats) + plural with harakat, e.g. "mudzakkar · jamak: كُتُبٌ". Fi\'il: madhi–mudhari pair + root, e.g. "كَتَبَ – يَكْتُبُ (k-t-b)".',
    example: 'Fully vocalised MSA sentence (harakat on every word for A1-B1).',
    exampleReading: 'Latin transliteration of the whole example using the same system.',
    levelRules: {
      A1: 'Huruf and harakat, salam, dhamir munfashil, jumlah ismiyyah pendek (mubtada + khabar), hadza/hadzihi, angka 1-10.',
      A2: 'Fi\'il madhi and mudhari for common verbs, idhafah, na\'at-man\'ut, huruf jar, daily routines and places.',
      B1: 'Jumlah fi\'liyyah, maf\'ul bih, kana and inna, negation لا/ما/لم/لن, plural patterns, short paragraphs.',
      B2: 'Masdar, isim fa\'il/maf\'ul, conditional sentences, relative pronouns الذي/التي, opinions and news.',
      C1: 'Wazan (fi\'il tsulatsi mazid), i\'rab in full sentences, formal media and academic Arabic.',
      C2: 'Classical-modern style, balaghah basics, rhetorical connectors, texts without harakat.',
    },
    pronunciation: 'makharij al-huruf (throat letters ء ه ع ح غ خ), heavy letters ص ض ط ظ ق (tafkhim vs tarqiq), pairs ق/ك, ع/ء, ح/ه, س/ص, ذ/ز, ث/س, mad (long vowels), syaddah, sukun and qalqalah, alif lam syamsiyyah vs qamariyyah, hamzah washal, ta marbutah and tanwin at waqf',
    grammarChecklist: 'gender agreement (mudzakkar/muannats) between subject, verb and adjective; number agreement (mufrad/mutsanna/jamak, non-human plural treated as feminine singular); definiteness (alif lam, idhafah has no alif lam on the first noun); i\'rab endings (rafa\'/nashab/jarr); verb conjugation for each dhamir; correct huruf jar; sun/moon letters; spelling of hamzah and ta marbutah.',
    writingScript: 'Expect Arabic script written right to left. Partial harakat is fine. Transliteration is allowed at A1 but always show the Arabic script version with harakat.',
    transcriptNote: 'Browser speech recognition returns unvocalised Arabic, so judge letters and words, not harakat; a swapped letter (e.g. ك for ق) usually means the makhraj was unclear.',
  },
};

const VOCAB_COUNT = 20;
const PRONUNCIATION_COUNT = 12;
const SPEAKING_COUNT = 6;

function normalizeLanguage(value) {
  const language = String(value || '').trim().toLowerCase();
  return LANGUAGES.has(language) ? language : null;
}

function normalizeFocus(value) {
  const focus = String(value || '').trim().toLowerCase();
  return FOCUSES.has(focus) ? focus : null;
}

function normalizeCefr(levelId) {
  const level = String(levelId || '').trim().toUpperCase();
  return CEFR.includes(level) ? level : 'A1';
}

function levelLine(language, levelId) {
  const cefr = normalizeCefr(levelId);
  return `${cefr} = ${LEVEL_NAMES[language][cefr]}. ${SPECS[language].levelRules[cefr]}`;
}

function header(language, { name, topic, levelId }, role) {
  const spec = SPECS[language];
  return `You are Fluently AI, an expert ${spec.name} ${role} for Indonesian learners.

Student: ${name}
Topic: ${topic}
Level: ${levelLine(language, levelId)}

${spec.name} rules:
- Target-language text: ${spec.word}
- Reading column: ${spec.reading}
- Everything explained to the student (meanings, tips, explanations, questions) is in natural Indonesian.
- Use the vocabulary and grammar of this level only; do not jump above it.
- No placeholders, no duplicate items, no fake words, no English-only content.`;
}

function buildLessonPrompt({ language, focus, name, topic, levelId }) {
  const spec = SPECS[language];
  const context = { name, topic, levelId };

  if (focus === 'vocabulary') {
    return `${header(language, context, 'vocabulary curriculum designer')}

Task: generate exactly ${VOCAB_COUNT} ${spec.name} vocabulary items that are genuinely useful for the topic at this level. Mix nouns, verbs, adjectives and set phrases; order them from most to least essential.

Field rules:
- word: ${spec.word}
- reading: ${spec.reading}
- meaning: concise Indonesian meaning.
- pos: one of ${spec.pos}.
- note: ${spec.note}
- example: ${spec.example}
- exampleReading: ${spec.exampleReading}
- exampleMeaning: Indonesian translation of the example.

Return valid JSON only:
{"rows":[{"word":"","reading":"","meaning":"","pos":"","note":"","example":"","exampleReading":"","exampleMeaning":""}]}`;
  }

  if (focus === 'pronunciation') {
    return `${header(language, context, 'pronunciation coach')}

Task: generate exactly ${PRONUNCIATION_COUNT} complete ${spec.name} practice sentences for the topic. Each sentence trains one concrete pronunciation feature of ${spec.name}: ${spec.pronunciation}. Spread the features; keep A1-A2 sentences short.

Field rules:
- sentence: ${spec.example}
- reading: ${spec.exampleReading}
- focus: the pronunciation feature in 2-5 words (e.g. the exact sound, tone pair or rule).
- tip: practical Indonesian coaching tip (mouth/tongue/throat position, length, pitch or tone contour), comparing with Indonesian sounds when it helps.
- meaning: Indonesian translation.

Return valid JSON only:
{"rows":[{"sentence":"","reading":"","focus":"","tip":"","meaning":""}]}`;
  }

  if (focus === 'grammar') {
    return `${header(language, context, 'grammar teacher')}

Task: build a complete mini grammar lesson for the topic. If the topic is not a grammar point, pick the most useful grammar point of this level for that situation.
Explain the grammar the way ${spec.name} grammar actually works (${language === 'arabic' ? 'use nahwu/sharaf terms like mubtada, khabar, fi\'il, fa\'il, i\'rab, with Indonesian explanation' : language === 'japanese' ? 'name the forms used in Japanese textbooks: ます形, て形, ない形, 辞書形, particles' : 'show word order slots and aspect/complement structure; Chinese has no conjugation'}).

Include:
- title: grammar point name (target language + Indonesian).
- explanation: 3-5 Indonesian sentences: function, when to use it, register.
- patterns: 2-4 formulas, each with an Indonesian meaning.
- examples: 5 sentences from easy to harder, each with reading and Indonesian meaning.
- mistakes: 3 typical mistakes Indonesian learners make with this point (wrong, right, why in Indonesian).
- drills: 4 short tasks for the student (Indonesian instructions, e.g. fill-in, transform, translate, make your own sentence).

Return valid JSON only:
{"title":"","explanation":"","patterns":[{"pattern":"","meaning":""}],"examples":[{"sentence":"","reading":"","meaning":""}],"mistakes":[{"wrong":"","right":"","why":""}],"drills":[""]}`;
  }

  if (focus === 'speaking') {
    return `${header(language, context, 'speaking coach')}

Task: create ${SPEAKING_COUNT} speaking prompts that build a realistic conversation for the topic, from simple to more demanding, plus an opening line you (the coach) say to start the roleplay.

Field rules:
- prompt: the situation/question in Indonesian.
- grammarFocus: the grammar the answer should use (2-4 words).
- usefulPattern: the ${spec.name} pattern to use, with its reading in brackets.
- example: model answer (${spec.example}).
- exampleReading: ${spec.exampleReading}
- exampleMeaning: Indonesian translation.
- opener: { text: coach's first line in ${spec.name}, reading, meaning }.

Return valid JSON only:
{"opener":{"text":"","reading":"","meaning":""},"rows":[{"prompt":"","grammarFocus":"","usefulPattern":"","example":"","exampleReading":"","exampleMeaning":""}]}`;
  }

  if (focus === 'reading') {
    const length = { A1: '4-6 short sentences', A2: '6-8 sentences', B1: 'one paragraph of 8-10 sentences', B2: 'two paragraphs', C1: 'two or three paragraphs', C2: 'three paragraphs' }[normalizeCefr(levelId)];
    return `${header(language, context, 'reading teacher')}

Task: write an original ${spec.name} reading text about the topic (${length}) with comprehension work.
${language === 'arabic' ? 'Use full harakat for A1-B1, partial harakat for B2, none for C1-C2.' : language === 'japanese' ? 'Only use kanji appropriate for the JLPT level; write the rest in kana.' : 'Use Simplified characters suitable for the HSK level.'}

Include:
- title: in ${spec.name}.
- passage: the text.
- passageReading: ${language === 'arabic' ? 'Latin transliteration' : language === 'japanese' ? 'full hiragana reading' : 'full pinyin with tone marks'} of the passage for A1-B1; empty string for B2 and above.
- translation: Indonesian translation (used only for checking answers).
- glossary: 6-8 key words from the passage with reading and Indonesian meaning.
- questions: 4 questions in Indonesian: main idea, two detail questions, one inference or vocabulary-in-context question.
- answers: short Indonesian answer key, same order as questions.

Return valid JSON only:
{"title":"","passage":"","passageReading":"","translation":"","glossary":[{"word":"","reading":"","meaning":""}],"questions":[""],"answers":[""]}`;
  }

  return `${header(language, context, 'writing teacher')}

Task: design a writing task about the topic for this level.
Script expectation: ${spec.writingScript}

Include:
- prompt: the task in Indonesian with the required length (A1: 3-4 sentences, A2: 4-6, B1: 6-8, B2: 120-150 characters/words, C1-C2: 2 paragraphs).
- requirements: 3-5 checklist items (content + grammar + script).
- patterns: 3-4 useful ${spec.name} patterns with reading and Indonesian meaning.
- wordBank: 6-8 useful words with reading and Indonesian meaning.
- starter: one opening sentence in ${spec.name} the student may use, with reading.
- modelAnswer: a model answer at this level in ${spec.name} (used only to calibrate feedback, not shown first).

Return valid JSON only:
{"prompt":"","requirements":[""],"patterns":[{"pattern":"","reading":"","meaning":""}],"wordBank":[{"word":"","reading":"","meaning":""}],"starter":{"text":"","reading":""},"modelAnswer":""}`;
}

const FEEDBACK_FOCUS = {
  vocabulary: 'Check whether each target word is used with the correct meaning, form and grammar. Only list a target word in completedItems when it is used correctly and naturally.',
  grammar: 'Check the grammar point of the lesson first, then any other errors.',
  pronunciation: 'This is a speech-recognition transcript of the student reading the expected sentences. Compare it word by word and infer which sounds were unclear.',
  speaking: 'This is a speech-recognition transcript or typed answer to one of the speaking prompts. Judge task completion, grammar, vocabulary and naturalness; ignore punctuation.',
  reading: 'The student answered the comprehension questions about the passage. Use the answer key and translation to judge each answer; answers may be in Indonesian.',
  writing: 'Judge task completion, structure, grammar, vocabulary range and script use against the task and requirements; use the model answer only for calibration.',
};

function buildFeedbackPrompt({ language, focus, name, topic, levelId, answer, context, targetItems }) {
  const spec = SPECS[language];
  return `You are Fluently AI, a warm but precise ${spec.name} tutor for Indonesian learners.

Student: ${name}
Topic: ${topic}
Level: ${levelLine(language, levelId)}
Exercise type: ${focus}
${FEEDBACK_FOCUS[focus]}
${focus === 'pronunciation' || focus === 'speaking' ? `${spec.transcriptNote}\n` : ''}${targetItems.length ? `Target words for this batch: ${targetItems.join(', ')}\n` : ''}Lesson context:
"""${context || '(none)'}"""

Student answer:
"""${answer}"""

${spec.name} error checklist: ${spec.grammarChecklist}
Script: ${spec.writingScript}

Rules:
- Be strict: do not call a sentence correct when it has an error; do not overpraise.
- Quote the student's exact words for each error and explain the fix in simple Indonesian (max 6 bullet points).
- Judge against this level, not native perfection.
- If the answer is in transliteration/romaji/pinyin only, still correct it and show the native-script version.
- "corrected" is the student's answer rewritten correctly in ${spec.name} (keep their ideas); "correctedReading" is its reading (${spec.reading}).
- "nextTask" is one concrete next exercise in Indonesian that continues this lesson.

Return valid JSON only:
{"status":"correct|almost|incorrect","score":0,"feedback":"","corrected":"","correctedReading":"","completedItems":[],"nextTask":""}`;
}

const text = (value, max) => String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
const list = (value, max, limit) => (Array.isArray(value) ? value.map((item) => text(item, max)).filter(Boolean).slice(0, limit) : []);
const objects = (value, limit, map, keep) => (Array.isArray(value) ? value.map((item) => map(item || {})).filter(keep).slice(0, limit) : []);

/** Validates a generated lesson; returns null when it is unusable. */
function normalizeLesson(language, focus, parsed) {
  if (!parsed || typeof parsed !== 'object') return null;
  const hasScript = (value) => SPECS[language].script.test(value);

  if (focus === 'vocabulary') {
    const rows = objects(parsed.rows, VOCAB_COUNT, (row) => ({
      word: text(row.word, 60),
      reading: text(row.reading, 120),
      meaning: text(row.meaning, 120),
      pos: text(row.pos, 40),
      note: text(row.note, 160),
      example: text(row.example, 200),
      exampleReading: text(row.exampleReading, 320),
      exampleMeaning: text(row.exampleMeaning, 220),
    }), (row) => hasScript(row.word) && row.reading && row.meaning && hasScript(row.example));
    return rows.length >= 12 ? { rows } : null;
  }

  if (focus === 'pronunciation') {
    const rows = objects(parsed.rows, PRONUNCIATION_COUNT, (row) => ({
      sentence: text(row.sentence, 180),
      reading: text(row.reading, 320),
      focus: text(row.focus, 80),
      tip: text(row.tip, 240),
      meaning: text(row.meaning, 220),
    }), (row) => hasScript(row.sentence) && row.reading && row.focus && row.tip);
    return rows.length >= 8 ? { rows } : null;
  }

  if (focus === 'grammar') {
    const examples = objects(parsed.examples, 6, (row) => ({
      sentence: text(row.sentence, 200),
      reading: text(row.reading, 320),
      meaning: text(row.meaning, 220),
    }), (row) => hasScript(row.sentence) && row.meaning);
    const patterns = objects(parsed.patterns, 4, (row) => ({ pattern: text(row.pattern, 120), meaning: text(row.meaning, 200) }), (row) => row.pattern);
    if (!text(parsed.title, 1) || !text(parsed.explanation, 1) || examples.length < 3 || patterns.length < 1) return null;
    return {
      title: text(parsed.title, 120),
      explanation: text(parsed.explanation, 900),
      patterns,
      examples,
      mistakes: objects(parsed.mistakes, 4, (row) => ({ wrong: text(row.wrong, 200), right: text(row.right, 200), why: text(row.why, 240) }), (row) => row.wrong && row.right),
      drills: list(parsed.drills, 240, 5),
    };
  }

  if (focus === 'speaking') {
    const rows = objects(parsed.rows, SPEAKING_COUNT, (row) => ({
      prompt: text(row.prompt, 200),
      grammarFocus: text(row.grammarFocus, 60),
      usefulPattern: text(row.usefulPattern, 160),
      example: text(row.example, 220),
      exampleReading: text(row.exampleReading, 320),
      exampleMeaning: text(row.exampleMeaning, 220),
    }), (row) => row.prompt && hasScript(row.example));
    if (rows.length < 4) return null;
    const opener = parsed.opener && typeof parsed.opener === 'object' ? parsed.opener : {};
    return {
      opener: { text: text(opener.text, 200), reading: text(opener.reading, 320), meaning: text(opener.meaning, 220) },
      rows,
    };
  }

  if (focus === 'reading') {
    const passage = String(parsed.passage ?? '').trim().slice(0, 2400);
    const questions = list(parsed.questions, 240, 5);
    if (!hasScript(passage) || questions.length < 3) return null;
    return {
      title: text(parsed.title, 120),
      passage,
      passageReading: String(parsed.passageReading ?? '').trim().slice(0, 3200),
      translation: String(parsed.translation ?? '').trim().slice(0, 3200),
      glossary: objects(parsed.glossary, 8, (row) => ({ word: text(row.word, 60), reading: text(row.reading, 120), meaning: text(row.meaning, 120) }), (row) => hasScript(row.word) && row.meaning),
      questions,
      answers: list(parsed.answers, 300, 5),
    };
  }

  const prompt = text(parsed.prompt, 600);
  if (!prompt) return null;
  const starter = parsed.starter && typeof parsed.starter === 'object' ? parsed.starter : {};
  return {
    prompt,
    requirements: list(parsed.requirements, 200, 5),
    patterns: objects(parsed.patterns, 4, (row) => ({ pattern: text(row.pattern, 120), reading: text(row.reading, 200), meaning: text(row.meaning, 200) }), (row) => row.pattern),
    wordBank: objects(parsed.wordBank, 8, (row) => ({ word: text(row.word, 60), reading: text(row.reading, 120), meaning: text(row.meaning, 120) }), (row) => row.word && row.meaning),
    starter: { text: text(starter.text, 200), reading: text(starter.reading, 320) },
    modelAnswer: String(parsed.modelAnswer ?? '').trim().slice(0, 2000),
  };
}

const STATUSES = new Set(['correct', 'almost', 'incorrect']);

/** Validates tutor feedback; completedItems is limited to the requested target items. */
function normalizeFeedback(parsed, targetItems = []) {
  if (!parsed || typeof parsed !== 'object' || typeof parsed.feedback !== 'string' || !parsed.feedback.trim()) return null;
  const score = Math.round(Number(parsed.score));
  const allowed = new Map(targetItems.map((item) => [item.trim(), item]));
  const completedItems = Array.isArray(parsed.completedItems)
    ? [...new Set(parsed.completedItems.map((item) => allowed.get(String(item ?? '').trim())).filter(Boolean))]
    : [];
  return {
    status: STATUSES.has(parsed.status) ? parsed.status : 'almost',
    score: Number.isFinite(score) ? Math.min(100, Math.max(0, score)) : null,
    feedback: parsed.feedback.trim().slice(0, 3000),
    corrected: String(parsed.corrected ?? '').trim().slice(0, 1500),
    correctedReading: String(parsed.correctedReading ?? '').trim().slice(0, 2000),
    completedItems,
    nextTask: text(parsed.nextTask, 400),
  };
}

module.exports = {
  LEVEL_NAMES,
  buildFeedbackPrompt,
  buildLessonPrompt,
  normalizeCefr,
  normalizeFeedback,
  normalizeFocus,
  normalizeLanguage,
  normalizeLesson,
};
