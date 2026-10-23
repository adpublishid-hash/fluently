const test = require('node:test');
const assert = require('node:assert/strict');
const {
  buildFeedbackPrompt,
  buildLessonPrompt,
  normalizeCefr,
  normalizeFeedback,
  normalizeFocus,
  normalizeLanguage,
  normalizeLesson,
} = require('./localizedChat');

const FOCUSES = ['vocabulary', 'grammar', 'pronunciation', 'speaking', 'reading', 'writing'];

test('only the three coached languages and six focuses are accepted', () => {
  assert.equal(normalizeLanguage('Japanese'), 'japanese');
  assert.equal(normalizeLanguage('english'), null);
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
