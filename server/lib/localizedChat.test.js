const test = require('node:test');
const assert = require('node:assert/strict');
const {
  buildAssistPrompt,
  buildFeedbackPrompt,
  buildLessonPrompt,
  buildReportPrompt,
  normalizeAssist,
  normalizeAssistAction,
  normalizeCefr,
  normalizeFeedback,
  normalizeFocus,
  normalizeLanguage,
  normalizeLesson,
  normalizeReport,
  normalizeVariation,
} = require('./localizedChat');

const FOCUSES = ['vocabulary', 'grammar', 'pronunciation', 'speaking', 'reading', 'writing'];

test('only the three coached languages and six focuses are accepted', () => {
  assert.equal(normalizeLanguage('Japanese'), 'japanese');
  assert.equal(normalizeLanguage('english'), 'english');
  assert.equal(normalizeLanguage('klingon'), null);
  assert.equal(normalizeFocus('reading'), 'reading');
  assert.equal(normalizeFocus('chat'), null);
  assert.equal(normalizeCefr('b2'), 'B2');
  assert.equal(normalizeCefr('zz'), 'A1');
});

test('lesson prompts carry the language-specific level scale and reading system', () => {
  for (const focus of FOCUSES) {
    const ja = buildLessonPrompt({ language: 'japanese', focus, name: 'Ana', topic: 'Di stasiun', levelId: 'A2' });
    assert.match(ja, /JLPT N4/);
    assert.match(ja, /romaji/);
    const zh = buildLessonPrompt({ language: 'mandarin', focus, name: 'Ana', topic: 'Belanja', levelId: 'B1' });
    assert.match(zh, /HSK 3/);
    assert.match(zh, /tone marks/);
    const ar = buildLessonPrompt({ language: 'arabic', focus, name: 'Ana', topic: 'Keluarga', levelId: 'A1' });
    assert.match(ar, /harakat/);
    assert.match(ar, /transliteration/);
    [ja, zh, ar].forEach((prompt) => assert.match(prompt, /Return valid JSON only/));
  }
});

test('feedback prompt includes the error checklist, context and answer', () => {
  const prompt = buildFeedbackPrompt({
    language: 'mandarin', focus: 'vocabulary', name: 'Ana', topic: 'Sekolah', levelId: 'A1',
    answer: '我是很高兴。', context: '学生, 老师', targetItems: ['学生'],
  });
  assert.match(prompt, /measure words/);
  assert.match(prompt, /我是很高兴。/);
  assert.match(prompt, /Target words for this batch: 学生/);
  assert.match(prompt, /"status" and "score" \(0-100\) must agree/);
});

test('vocabulary lessons need native script and enough rows', () => {
  const row = { word: '食べる', reading: 'たべる · taberu', meaning: 'makan', pos: 'verb', note: 'ichidan', example: 'ご飯を食べます。', exampleReading: 'ごはんをたべます。', exampleMeaning: 'Saya makan nasi.' };
  const rows = Array.from({ length: 14 }, (_, index) => ({ ...row, word: `${row.word}${index}` }));
  assert.equal(normalizeLesson('japanese', 'vocabulary', { rows }).rows.length, 14);
  assert.equal(normalizeLesson('japanese', 'vocabulary', { rows: rows.slice(0, 5) }), null);
  assert.equal(normalizeLesson('arabic', 'vocabulary', { rows }), null, 'Japanese rows are not Arabic');
});

test('reading lessons keep the passage and questions', () => {
  const lesson = normalizeLesson('arabic', 'reading', {
    title: 'عائلتي', passage: 'هَذِهِ عَائِلَتِي.', passageReading: 'haadzihi ʿaa\'ilatii', translation: 'Ini keluargaku.',
    glossary: [{ word: 'عَائِلَة', reading: 'ʿaa\'ilah', meaning: 'keluarga' }],
    questions: ['Apa ide utama?', 'Siapa?', 'Di mana?'], answers: ['Keluarga'],
  });
  assert.equal(lesson.passage, 'هَذِهِ عَائِلَتِي.');
  assert.equal(lesson.questions.length, 3);
  assert.equal(normalizeLesson('arabic', 'reading', { passage: 'hello', questions: ['a', 'b', 'c'] }), null);
});

test('feedback is clamped and completed items are limited to the batch', () => {
  const result = normalizeFeedback({ status: 'weird', score: 140, feedback: 'Bagus', completedItems: ['学生', '老师', '学生'] }, ['学生', '朋友']);
  assert.equal(result.status, 'almost');
  assert.equal(result.score, 100);
  assert.deepEqual(result.completedItems, ['学生']);
  assert.equal(normalizeFeedback({ feedback: '' }), null);
  assert.equal(normalizeFeedback({ feedback: 'ok', score: 'x' }).score, null);
});

test('lesson variations ask for a different, easier or harder set', () => {
  assert.equal(normalizeVariation('Easier'), 'easier');
  assert.equal(normalizeVariation('sideways'), null);
  const base = { language: 'japanese', focus: 'vocabulary', name: 'Ana', topic: 'Kereta', levelId: 'A1' };
  assert.doesNotMatch(buildLessonPrompt(base), /previous set/);
  const prompt = buildLessonPrompt({ ...base, variation: 'harder', avoid: ['駅', '電車'] });
  assert.match(prompt, /more challenging/);
  assert.match(prompt, /Do not reuse these items from the previous set: 駅, 電車/);
});

test('assist prompt carries the question, lesson context and last coach message', () => {
  assert.equal(normalizeAssistAction('HINT'), 'hint');
  assert.equal(normalizeAssistAction('solve'), null);
  const prompt = buildAssistPrompt({
    language: 'japanese', focus: 'grammar', name: 'Ana', topic: 'は vs が', levelId: 'A1', action: 'ask',
    question: 'Bedanya は dan が apa?', context: 'Grammar point: は vs が', lastCoachMessage: '❌ 私が学生です',
  });
  assert.match(prompt, /Bedanya は dan が apa\?/);
  assert.match(prompt, /❌ 私が学生です/);
  assert.match(prompt, /JLPT N5/);
  assert.doesNotMatch(buildAssistPrompt({ language: 'arabic', focus: 'writing', name: 'Ana', topic: 'x', levelId: 'A1', action: 'hint' }), /Student question/);
  assert.equal(normalizeAssist({ reply: '  Coba pakai です.  ' }).reply, 'Coba pakai です.');
  assert.equal(normalizeAssist({ reply: '' }), null);
});

test('report prompt only grades student turns and output is validated', () => {
  const prompt = buildReportPrompt({
    language: 'arabic', focus: 'speaking', name: 'Ana', topic: 'Keluarga', levelId: 'A2',
    transcript: [{ role: 'coach', text: 'مَا اسْمُكَ؟' }, { role: 'student', text: 'اسمي آنا' }],
  });
  assert.match(prompt, /COACH: مَا اسْمُكَ؟\nSTUDENT: اسمي آنا/);
  assert.match(prompt, /Assess ONLY the STUDENT turns/);
  assert.match(prompt, /category: exactly one of "Sangat baik"/);
  assert.match(prompt, /ظ zh/);
  const report = normalizeReport({
    score: 130, category: 'Good', summary: 'Bagus', strengths: ['a'],
    errors: [{ original: 'اسمي آنا', corrected: 'اِسْمِي آنَا', explanation: 'harakat' }, { original: 'x' }],
    vocabulary: [{ word: 'اِسْم', reading: 'ism', meaning: 'nama' }], nextSteps: ['b'],
  });
  assert.equal(report.score, 100);
  assert.equal(report.errors.length, 1);
  assert.equal(normalizeReport({ summary: 'ok', score: 'x' }), null);
  assert.equal(normalizeReport({ score: 50 }), null);
});

test('English uses CEFR names, IPA and an Indonesian-learner error checklist', () => {
  const prompt = buildLessonPrompt({ language: 'english', focus: 'grammar', name: 'Ana', topic: 'Past simple', levelId: 'A2' });
  assert.match(prompt, /CEFR A2 Elementary/);
  assert.match(prompt, /IPA/);
  const feedback = buildFeedbackPrompt({ language: 'english', focus: 'writing', name: 'Ana', topic: 'x', levelId: 'B1', answer: 'I very like it.', context: '', targetItems: [] });
  assert.match(feedback, /I very like/);
  assert.match(feedback, /articles a\/an\/the/);
  const lesson = normalizeLesson('english', 'reading', { passage: 'Tom lives in Jakarta.', questions: ['a?', 'b?', 'c?'] });
  assert.equal(lesson.passage, 'Tom lives in Jakarta.');
});
