const test = require('node:test');
const assert = require('node:assert/strict');
const { callGoogle, callKie, isStudioKey, parseSseText, verifyStudioKey } = require('./aiProvider');

const fakeFetch = (status, body, contentType = 'application/json') => {
  const calls = [];
  const impl = async (url, init) => {
    calls.push({ url, init });
    return {
      ok: status >= 200 && status < 300,
      status,
      headers: { get: () => contentType },
      text: async () => (typeof body === 'string' ? body : JSON.stringify(body)),
      json: async () => body,
    };
  };
  return { impl, calls };
};

test('recognises Google AI Studio keys', () => {
  assert.equal(isStudioKey(`AIza${'a'.repeat(35)}`), true);
  assert.equal(isStudioKey('0123456789abcdef0123456789abcdef'), false);
  assert.equal(isStudioKey(''), false);
});

test('callKie posts OpenAI-style chat completions with the model in the path', async () => {
  const { impl, calls } = fakeFetch(200, { choices: [{ message: { content: '{"ok":1}' } }] });
  const result = await callKie({ apiKey: 'k', baseUrl: 'https://api.kie.ai/', model: 'gemini-3-8-flash', prompt: 'hi', temperature: 0.2, maxOutputTokens: 50, fetchImpl: impl });
  assert.equal(calls[0].url, 'https://api.kie.ai/gemini-3-8-flash/v1/chat/completions');
  assert.equal(calls[0].init.headers.Authorization, 'Bearer k');
  const body = JSON.parse(calls[0].init.body);
  assert.equal(body.stream, false);
  assert.equal(body.messages[0].content, 'hi');
  assert.deepEqual(result, { ok: true, status: 200, data: { choices: [{ message: { content: '{"ok":1}' } }] }, text: '{"ok":1}' });
});

test('callKie treats an error code inside a 200 body as a failure', async () => {
  const { impl } = fakeFetch(200, { code: 402, msg: 'Credits insufficient' });
  const result = await callKie({ apiKey: 'k', baseUrl: 'x', model: 'm', prompt: 'p', fetchImpl: impl });
  assert.equal(result.ok, false);
  assert.equal(result.status, 402);
});

test('callKie joins a streamed (SSE) reply', async () => {
  const sse = 'data: {"choices":[{"delta":{"content":"{\\"a\\":"}}]}\n\ndata: {"choices":[{"delta":{"content":"1}"}}]}\n\ndata: [DONE]\n';
  const { impl } = fakeFetch(200, sse, 'text/event-stream');
  const result = await callKie({ apiKey: 'k', baseUrl: 'x', model: 'm', prompt: 'p', fetchImpl: impl });
  assert.equal(result.text, '{"a":1}');
  assert.equal(parseSseText('data: [DONE]'), '');
});

test('callGoogle sends the key as a header, not in the URL', async () => {
  const { impl, calls } = fakeFetch(200, { candidates: [{ content: { parts: [{ text: '{}' }] } }] });
  const key = `AIza${'b'.repeat(35)}`;
  const result = await callGoogle({ apiKey: key, model: 'gemini-2.5-flash', prompt: 'p', fetchImpl: impl });
  assert.ok(!calls[0].url.includes(key));
  assert.equal(calls[0].init.headers['x-goog-api-key'], key);
  assert.equal(result.text, '{}');
});

test('verifyStudioKey rejects bad formats without a network call', async () => {
  const { impl, calls } = fakeFetch(200, {});
  assert.deepEqual(await verifyStudioKey('nope', impl), { ok: false, reason: 'format' });
  assert.equal(calls.length, 0);
  const denied = fakeFetch(400, {});
  assert.equal((await verifyStudioKey(`AIza${'c'.repeat(35)}`, denied.impl)).reason, 'rejected');
});
