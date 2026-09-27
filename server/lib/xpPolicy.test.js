const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizeXpRequest, grantableXp, levelForXp, XP_RULES } = require('./xpPolicy');

test('clamps XP to the activity ceiling', () => {
  assert.deepEqual(normalizeXpRequest({ xp: 99999, activity: 'lesson', sourceKey: 'modul/english/beginner/grammar/lesson-1' }), {
    activity: 'lesson',
    xp: XP_RULES.lesson.max,
    sourceKey: 'lesson:modul/english/beginner/grammar/lesson-1',
  });
  assert.equal(normalizeXpRequest({ xp: 900, activity: 'game' }).xp, XP_RULES.game.max);
});

test('unknown activities fall back to general', () => {
  const request = normalizeXpRequest({ xp: 500, activity: 'hack' });
  assert.equal(request.activity, 'general');
  assert.equal(request.xp, XP_RULES.general.max);
});

test('rejects invalid input', () => {
  assert.ok(normalizeXpRequest({ xp: 0, activity: 'game' }).error);
  assert.ok(normalizeXpRequest({ xp: -5, activity: 'game' }).error);
  assert.ok(normalizeXpRequest({ xp: 'abc', activity: 'game' }).error);
  assert.ok(normalizeXpRequest({ xp: 50, activity: 'lesson' }).error, 'lesson requires a sourceKey');
  assert.ok(normalizeXpRequest({ xp: 50, activity: 'lesson', sourceKey: '<script>' }).error);
});

test('respects the daily cap', () => {
  assert.equal(grantableXp(100, 0, 3000), 100);
  assert.equal(grantableXp(500, 2800, 3000), 200);
  assert.equal(grantableXp(500, 3000, 3000), 0);
  assert.equal(grantableXp(500, 4000, 3000), 0);
});

test('levels every 3000 XP', () => {
  assert.equal(levelForXp(0), 1);
  assert.equal(levelForXp(2999), 1);
  assert.equal(levelForXp(3000), 2);
});
