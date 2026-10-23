const test = require('node:test');
const assert = require('node:assert/strict');
const exam = require('./examGenerator');

const mcq = (stem, options, answer, extra = {}) => ({ type: 't', stem, options, answer, explanation: 'Karena konteksnya.', ...extra });

test('parts follow the official layout and writing starts at HSK 3', () => {
  assert.deepEqual(exam.getExamParts('japanese', 'beginner').map((part) => part.id), ['moji-goi', 'bunpou', 'dokkai', 'choukai']);
  assert.deepEqual(exam.getExamParts('arabic', 'advanced').map((part) => part.id), ['istima', 'tarakib', 'qiraah']);
  assert.equal(exam.findExamPart('mandarin', 'elementary', 'shuxie'), null);
  assert.equal(exam.findExamPart('mandarin', 'intermediate', 'shuxie').kind, 'writing');
  assert.equal(exam.normalizeExamLevel('mandarin', 'a1'), null);
  assert.equal(exam.normalizeExamLevel('english', 'B2'), 'b2');
  assert.equal(exam.normalizeExamLanguage('klingon'), null);
});

test('section prompts name the exam, level, item types and seed', () => {
  const part = exam.findExamPart('japanese', 'elementary', 'bunpou');
  const prompt = exam.buildSectionPrompt({ language: 'japanese', levelId: 'elementary', part, seed: 'abc' });
  assert.match(prompt, /JLPT N4/);
  assert.match(prompt, /文の組み立て/);
  assert.match(prompt, /exactly 6 multiple-choice items/);
  assert.match(prompt, /Variation seed: abc/);
  assert.match(prompt, /Indonesian translation in brackets/);
  const hsk = exam.buildSectionPrompt({ language: 'mandarin', levelId: 'beginner', part: exam.findExamPart('mandarin', 'beginner', 'tingli'), seed: 'x' });
  assert.match(hsk, /pinyin/);
  assert.match(hsk, /NOT shown/);
  const writing = exam.buildSectionPrompt({ language: 'mandarin', levelId: 'advanced', part: exam.findExamPart('mandarin', 'advanced', 'shuxie'), seed: 'x' });
  assert.match(writing, /"task"/);
});

test('normalizeSection keeps valid items, enforces passage/audio and script, and reshuffles keys', () => {
  const part = exam.findExamPart('mandarin', 'beginner', 'yuedu');
  const groups = exam.normalizeSection('mandarin', part, {
    groups: [
      { passage: '我叫小明。我是学生。', questions: [
        mcq('小明是谁？', ['老师', '学生', '医生', '司机'], 1),
        mcq('duplicate', ['学生', '学生', '医生'], 0),
        mcq('bad key', ['老师', '学生'], 5),
        mcq('no explanation', ['老师', '学生'], 0, { explanation: '' }),
      ] },
      { passage: '', questions: [mcq('无文章', ['一', '二'], 0)] },
      { passage: 'English only passage', questions: [mcq('Who?', ['a', 'b'], 0)] },
    ],
  }, () => 0);
  assert.equal(exam.countQuestions(groups), 1);
  const [question] = groups[0].questions;
  assert.equal(question.options[question.answer], '学生');
  assert.notEqual(question.answer, 1, 'options were reshuffled');
});

test('listening groups need audio and labelled TOAFL options keep their order', () => {
  const listening = exam.findExamPart('arabic', 'beginner', 'istima');
  assert.equal(exam.countQuestions(exam.normalizeSection('arabic', listening, { groups: [{ questions: [mcq('مَا اسْمُهُ؟', ['عَلِيٌّ', 'زَيْدٌ'], 0)] }] })), 0);
  const tarakib = exam.findExamPart('arabic', 'beginner', 'tarakib');
  const [group] = exam.normalizeSection('arabic', tarakib, {
    groups: [{ questions: [mcq('حدد الخطأ', ['(أ) ذَهَبَ', '(ب) الطَّالِبَةُ', '(ج) إِلَى', '(د) المَدْرَسَةِ'], 0)] }],
  }, () => 0);
  assert.equal(group.questions[0].answer, 0);
  assert.equal(group.questions[0].options[0], '(أ) ذَهَبَ');
});

test('items are capped at the section count', () => {
  const part = exam.findExamPart('japanese', 'beginner', 'bunpou');
  const questions = Array.from({ length: 9 }, (_, index) => mcq(`わたし（\u3000）学生です。${index}`, ['は', 'を', 'に', 'で'], 0));
  assert.equal(exam.countQuestions(exam.normalizeSection('japanese', part, { groups: [{ questions }] })), part.count);
});

test('verification drops items whose independent answer disagrees or is unclear', () => {
  const groups = [
    { title: '', passage: 'p', audio: '', questions: [mcq('a', ['1', '2'], 0), mcq('b', ['1', '2'], 1)] },
    { title: '', passage: 'q', audio: '', questions: [mcq('c', ['1', '2'], 1)] },
  ];
  const prompt = exam.buildVerifyPrompt({ language: 'english', levelId: 'b1', groups });
  assert.match(prompt, /Q3\. c/);
  const { groups: kept, dropped } = exam.applyVerification(groups, { answers: [{ q: 1, answer: 0 }, { q: 2, answer: 0 }, { q: 3, answer: 1, unclear: true }] });
  assert.equal(dropped, 2);
  assert.equal(kept.length, 1);
  assert.deepEqual(kept[0].questions.map((item) => item.stem), ['a']);
});

test('writing tasks need a prompt and Indonesian instruction', () => {
  assert.deepEqual(exam.normalizeWritingTask({ task: { prompt: '请用下面的词写一段话。', instruction: 'Tulis 80 karakter.', words: ['周末', '公园', ''], target: '80 字' } }), {
    prompt: '请用下面的词写一段话。', instruction: 'Tulis 80 karakter.', words: ['周末', '公园'], target: '80 字',
  });
  assert.equal(exam.normalizeWritingTask({ task: { prompt: 'x' } }), null);
});

test('true/false pairs and find-the-error options keep the order of the stem', () => {
  const tingli = exam.findExamPart('mandarin', 'beginner', 'tingli');
  const [listening] = exam.normalizeSection('mandarin', tingli, {
    groups: [{ audio: '我今天不去学校。', questions: [mcq('他今天去学校。', ['对', '错'], 1)] }],
  }, () => 0);
  assert.deepEqual(listening.questions[0].options, ['对', '错']);
  assert.equal(listening.questions[0].answer, 1);

  const tarakib = exam.findExamPart('arabic', 'beginner', 'tarakib');
  const [group] = exam.normalizeSection('arabic', tarakib, {
    groups: [{ questions: [mcq('هَذِهِ (أ) حَدِيقَةٌ (ب) جَمِيلٌ (ج) فِي الْمَدِينَةِ (د)', ['جَمِيلٌ', 'هَذِهِ', 'فِي الْمَدِينَةِ', 'حَدِيقَةٌ'], 0)] }],
  }, () => 0);
  assert.deepEqual(group.questions[0].options, ['هَذِهِ', 'حَدِيقَةٌ', 'جَمِيلٌ', 'فِي الْمَدِينَةِ']);
  assert.equal(group.questions[0].options[group.questions[0].answer], 'جَمِيلٌ');
});
