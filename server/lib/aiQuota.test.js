const test = require('node:test');
const assert = require('node:assert/strict');
const { consumeQuota, jakartaDateKey, nextResetIso, quotaLimit } = require('./aiQuota');

test('plan limits come from env with sane defaults', () => {
  delete process.env.AI_DAILY_QUOTA_FREE;
  assert.equal(quotaLimit('free'), 10);
  assert.equal(quotaLimit('pro'), 100);
  process.env.AI_DAILY_QUOTA_FREE = '3';
  assert.equal(quotaLimit('free'), 3);
  process.env.AI_DAILY_QUOTA_FREE = 'abc';
  assert.equal(quotaLimit('free'), 10);
  delete process.env.AI_DAILY_QUOTA_FREE;
});

test('the quota day follows Asia/Jakarta and resets at 00:00 WIB', () => {
  const lateUtc = new Date('2026-09-27T18:30:00Z'); // 01:30 WIB on the 28th
  assert.equal(jakartaDateKey(lateUtc), '2026-09-28');
  assert.equal(nextResetIso(lateUtc), '2026-09-28T17:00:00.000Z');
  assert.equal(nextResetIso(new Date('2026-09-27T10:00:00Z')), '2026-09-27T17:00:00.000Z');
});

test('consumeQuota returns null once the atomic upsert is refused', async () => {
  const queries = [];
  const pool = { query: async (sql, params) => { queries.push(params); return { rows: params[2] > 1 ? [{ used: 1 }] : [] }; } };
  process.env.AI_DAILY_QUOTA_FREE = '5';
  assert.equal(await consumeQuota(pool, 7, 'free'), 1);
  process.env.AI_DAILY_QUOTA_FREE = '1';
  assert.equal(await consumeQuota(pool, 7, 'free'), null);
  process.env.AI_DAILY_QUOTA_FREE = '0';
  assert.equal(await consumeQuota(pool, 7, 'free'), null);
  assert.equal(queries.length, 2);
  delete process.env.AI_DAILY_QUOTA_FREE;
});
