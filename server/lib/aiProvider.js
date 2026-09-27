// AI text providers. The server key goes to Kie AI (OpenAI-compatible
// chat completions); a user's own Google AI Studio key goes straight to the
// Gemini API. Both return { ok, status, text, data }.

const GOOGLE_BASE_URL = (process.env.GOOGLE_AI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta').replace(/\/$/, '');
const STUDIO_KEY_PATTERN = /^AIza[0-9A-Za-z_-]{35}$/;

function isStudioKey(key) {
  return STUDIO_KEY_PATTERN.test(String(key || '').trim());
}

/** Joins the content deltas of an OpenAI-style SSE stream. */
function parseSseText(body) {
  let text = '';
  for (const line of String(body).split('\n')) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('data:')) continue;
    const payload = trimmed.slice(5).trim();
    if (!payload || payload === '[DONE]') continue;
    try {
      const chunk = JSON.parse(payload);
      text += chunk?.choices?.[0]?.delta?.content ?? chunk?.choices?.[0]?.message?.content ?? '';
    } catch {
      // ignore keep-alive or partial lines
    }
  }
  return text;
}

function messageText(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) return content.map((part) => part?.text || '').join('');
  return '';
}

async function callKie({ apiKey, baseUrl, model, prompt, temperature, maxOutputTokens, fetchImpl = fetch }) {
  const res = await fetchImpl(`${String(baseUrl).replace(/\/$/, '')}/${encodeURIComponent(model)}/v1/chat/completions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      stream: false,
      temperature,
      max_tokens: maxOutputTokens,
    }),
  });
  const raw = await res.text();
  const contentType = res.headers?.get?.('content-type') || '';
  if (contentType.includes('text/event-stream') || raw.trimStart().startsWith('data:')) {
    return { ok: res.ok, status: res.status, data: null, text: parseSseText(raw) };
  }
  let data = null;
  try { data = JSON.parse(raw); } catch { data = null; }
  // Kie reports some errors with HTTP 200 and a non-200 "code" field.
  const failed = data && typeof data.code === 'number' && data.code !== 200 && !data.choices;
  return {
    ok: res.ok && !failed,
    status: failed ? data.code : res.status,
    data,
    text: messageText(data?.choices?.[0]?.message?.content),
  };
}

async function callGoogle({ apiKey, model, prompt, temperature, maxOutputTokens, fetchImpl = fetch }) {
  const res = await fetchImpl(`${GOOGLE_BASE_URL}/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature, maxOutputTokens, responseMimeType: 'application/json' },
    }),
  });
  const data = await res.json().catch(() => null);
  const text = data?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('\n') || '';
  return { ok: res.ok, status: res.status, data, text };
}

/** Cheap validity check for a user's AI Studio key (lists models, no tokens used). */
async function verifyStudioKey(apiKey, fetchImpl = fetch) {
  if (!isStudioKey(apiKey)) return { ok: false, reason: 'format' };
  const res = await fetchImpl(`${GOOGLE_BASE_URL}/models?pageSize=1`, { headers: { 'x-goog-api-key': apiKey } });
  if (res.ok) return { ok: true };
  return { ok: false, reason: res.status === 429 ? 'rate_limited' : 'rejected', status: res.status };
}

module.exports = { isStudioKey, parseSseText, callKie, callGoogle, verifyStudioKey };
