const test = require('node:test');
const assert = require('node:assert/strict');
const { formatReviewItems, mistakeKey, normalizeMistakeFocus, normalizeMistakeItems, normalizeMistakeLanguage } = require('./mistakes');
const { buildLessonPrompt } = require('./localizedChat');

test('mistake keys ignore case, spacing and end punctuation', () => {
  assert.equal(mistakeKey('  I  go to school yesterday. '), 'i go to school yesterday');
  assert.equal(mistakeKey('私が学生です。'), mistakeKey('私が学生です'));
  assert.equal(mistakeKey('هل انت طالب؟'), 'هل انت طالب');
});

test('items need an original and a different correction, and are deduplicated', () => {
  const items = normalizeMistakeItems([
    { original: 'I very like it', corrected: 'I really like it', explanation: 'very tidak dipakai sebelum kata kerja' },
    { original: 'i very like it.', corrected: 'I like it a lot' },
    { original: 'Hello', corrected: 'hello.' },
    { original: '', corrected: 'x' },
    { original: '我是很高兴', corrected: '' },
  ]);
  assert.deepEqual(items.map((item) => item.original), ['I very like it']);
  assert.equal(items[0].key, 'i very like it');
  assert.deepEqual(normalizeMistakeItems('nope'), []);
});

test('language and focus are validated', () => {
  assert.equal(normalizeMistakeLanguage('Mandarin'), 'mandarin');
  assert.equal(normalizeMistakeLanguage('klingon'), null);
  assert.equal(normalizeMistakeFocus('writing'), 'writing');
  assert.equal(normalizeMistakeFocus('hacking'), 'chat');
});

test('review items reach the lesson prompt', () => {
  const review = formatReviewItems([{ original: '私が学生です', corrected: '私は学生です' }, 'bad', null], 5);
  assert.deepEqual(review, ['私が学生です → 私は学生です', 'bad']);
  const prompt = buildLessonPrompt({ language: 'japanese', focus: 'grammar', name: 'Ana', topic: 'は vs が', levelId: 'A1', review });
  assert.match(prompt, /私が学生です → 私は学生です/);
  assert.doesNotMatch(buildLessonPrompt({ language: 'japanese', focus: 'grammar', name: 'Ana', topic: 'x', levelId: 'A1' }), /earlier sessions/);
});
