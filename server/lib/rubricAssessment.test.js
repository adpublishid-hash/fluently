const test = require('node:test');
const assert = require('node:assert/strict');
const { rubrics, findRubric, buildAssessmentPrompt, normalizeAssessment } = require('./rubricAssessment');

test('every level has speaking and writing rubrics with model answers', () => {
  for (const [language, levels] of Object.entries(rubrics.languages)) {
    assert.ok(levels.length >= 5, language);
    for (const level of levels) {
      for (const skill of ['speaking', 'writing']) {
        const found = findRubric(language, level.id, skill);
        assert.ok(found, `${language}/${level.id}/${skill}`);
        assert.ok(found.rubric.expectations.length >= 3);
        assert.ok(found.rubric.model.length > 20);
        assert.ok(found.rubric.translation.length > 10);
      }
    }
  }
});

test('unknown language, level or skill is rejected', () => {
  assert.equal(findRubric('klingon', 'a1', 'writing'), null);
  assert.equal(findRubric('english', 'z9', 'writing'), null);
  assert.equal(findRubric('english', 'a1', 'reading'), null);
});

test('prompt includes the level expectations and the learner answer', () => {
  const found = findRubric('mandarin', 'advanced', 'writing');
  const prompt = buildAssessmentPrompt({ language: 'mandarin', skill: 'writing', answer: '我觉得短视频很好。', task: '', ...found });
  assert.match(prompt, /HSK 5/);
  assert.match(prompt, /我觉得短视频很好。/);
  found.rubric.expectations.forEach((item) => assert.ok(prompt.includes(item)));
});

test('normalizeAssessment clamps scores and computes overall', () => {
  const { criteria } = findRubric('english', 'b1', 'writing');
  const result = normalizeAssessment({ scores: { task: 4, organization: 3, vocabulary: 9, grammar: 0 }, summary: 'ok', strengths: ['a'], improvements: ['b'] }, criteria);
  assert.deepEqual(result.scores, { task: 4, organization: 3, vocabulary: 4, grammar: 1 });
  assert.equal(result.overall, 75);
  assert.equal(normalizeAssessment({ scores: { task: 'x' } }, criteria), null);
  assert.equal(normalizeAssessment(null, criteria), null);
});
