// End-to-end smoke test against a running API (used by CI).
// Usage: API_URL=http://localhost:4000 node scripts/smoke.js
const assert = require('node:assert/strict');

const API_URL = process.env.API_URL || `http://localhost:${process.env.PORT || 4000}`;

async function call(path, { method = 'GET', token, body } = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  return { status: response.status, data };
}

async function main() {
  const email = `smoke-${Date.now()}@example.com`;
  const register = await call('/api/auth/register', {
    method: 'POST',
    body: { name: 'Smoke Test', email, password: 'Password123!', phone: '081234567890' },
  });
  assert.equal(register.status, 200, `register failed: ${JSON.stringify(register.data)}`);
  const { token } = register.data;
  assert.ok(token, 'register returns a token');

  const sourceKey = 'modul/english/beginner/grammar/lesson-1';
  const first = await call('/api/users/xp', { method: 'POST', token, body: { xp: 50, activity: 'lesson', sourceKey } });
  assert.equal(first.status, 200);
  assert.equal(first.data.awarded, 50);

  const repeat = await call('/api/users/xp', { method: 'POST', token, body: { xp: 50, activity: 'lesson', sourceKey } });
  assert.equal(repeat.data.awarded, 0, 'the same lesson cannot be rewarded twice');
  assert.equal(repeat.data.duplicate, true);

  const inflated = await call('/api/users/xp', { method: 'POST', token, body: { xp: 999999, activity: 'game' } });
  assert.ok(inflated.data.awarded <= 500, 'game XP is capped per event');

  const progress = await call('/api/users/progress', {
    method: 'POST',
    token,
    body: { items: ['talky_arabic_pemula_kalam_completed|1', 'not-a-progress-key'] },
  });
  assert.equal(progress.status, 200);
  assert.deepEqual(progress.data.items, ['talky_arabic_pemula_kalam_completed|1']);

  const unauthenticated = await call('/api/users/progress');
  assert.equal(unauthenticated.status, 401);

  console.log('Smoke test passed');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
