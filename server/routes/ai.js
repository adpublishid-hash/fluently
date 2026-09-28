const { BYOK_GEMINI_MODEL, FREE_AI_CHAT_LEVELS, FREE_GEMINI_API_KEY, GEMINI_API_KEY, GEMINI_MODEL, KIE_API_KEY, KIE_GEMINI_BASE_URL, KIE_MODEL } = require('../config');
const { pool } = require('../db');
const { getServerEffectivePlan } = require('../lib/domain');
const { requireAuth } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimits');
const { buildAssessmentPrompt, findRubric, normalizeAssessment } = require('../lib/rubricAssessment');
const { callGoogle, callKie, isStudioKey, verifyStudioKey } = require('../lib/aiProvider');
const { consumeQuota, getQuota, refundQuota } = require('../lib/aiQuota');


module.exports = function register(app) {
  function todayJakartaKey() {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  }

  function normalizeAiTopicKey(topic) {
    return String(topic || '').trim().toLowerCase().replace(/\s+/g, ' ').slice(0, 140);
  }

  async function enforceFreeAiChatTopicLimit(req, res, { topic, levelId, mode }) {
    if (getServerEffectivePlan(req.user) !== 'free') return true;

    const normalizedLevel = String(levelId || 'A1').trim().toUpperCase();
    if (!FREE_AI_CHAT_LEVELS.has(normalizedLevel)) {
      res.status(403).json({
        error: 'Free user hanya bisa memakai AI Chat di level A1 Beginner dan A2 Elementary.',
        code: 'FREE_LEVEL_LIMIT',
      });
      return false;
    }

    const topicKey = normalizeAiTopicKey(topic);
    if (!topicKey) {
      res.status(400).json({ error: 'Topic is required.', code: 'TOPIC_REQUIRED' });
      return false;
    }

    const topicDate = todayJakartaKey();
    const userKey = req.user?.id ? `user:${req.user.id}` : `ip:${req.ip || 'unknown'}`;
    const displayTopic = String(topic || '').trim().slice(0, 140);

    const existing = await pool.query(
      'SELECT topic, topic_key FROM ai_chat_daily_topics WHERE user_key = $1 AND topic_date = $2 LIMIT 1',
      [userKey, topicDate],
    );
    if (existing.rows.length) {
      const row = existing.rows[0];
      if (row.topic_key === topicKey) return true;
      res.status(429).json({
        error: `Limit free hari ini sudah terpakai untuk topik "${row.topic}". Free user hanya bisa generate 1 topik AI Chat per hari.`,
        code: 'FREE_DAILY_TOPIC_LIMIT',
        activeTopic: row.topic,
      });
      return false;
    }

    await pool.query(
      `INSERT INTO ai_chat_daily_topics (user_id, user_key, topic_date, mode, level_id, topic, topic_key)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (user_key, topic_date) DO NOTHING`,
      [req.user?.id || null, userKey, topicDate, String(mode || 'chat').slice(0, 40), normalizedLevel, displayTopic, topicKey],
    );

    const afterInsert = await pool.query(
      'SELECT topic, topic_key FROM ai_chat_daily_topics WHERE user_key = $1 AND topic_date = $2 LIMIT 1',
      [userKey, topicDate],
    );
    const saved = afterInsert.rows[0];
    if (saved && saved.topic_key !== topicKey) {
      res.status(429).json({
        error: `Limit free hari ini sudah terpakai untuk topik "${saved.topic}". Free user hanya bisa generate 1 topik AI Chat per hari.`,
        code: 'FREE_DAILY_TOPIC_LIMIT',
        activeTopic: saved.topic,
      });
      return false;
    }

    return true;
  }

  function extractJsonObject(text) {
    const raw = String(text || '').trim();
    try {
      return JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      if (!match) return null;
      try {
        return JSON.parse(match[0]);
      } catch {
        return null;
      }
    }
  }

  // Server key: Kie AI unless a plain Google key is configured instead.
  function serverProvider() {
    if (KIE_API_KEY) return { provider: 'kie', apiKey: KIE_API_KEY, model: KIE_MODEL };
    const apiKey = FREE_GEMINI_API_KEY || GEMINI_API_KEY;
    if (!apiKey) return null;
    const kie = String(process.env.GEMINI_PROVIDER || '').toLowerCase() === 'kie' || /^[a-f0-9]{32}$/i.test(apiKey.trim());
    return kie ? { provider: 'kie', apiKey, model: KIE_MODEL } : { provider: 'google', apiKey, model: GEMINI_MODEL };
  }

  function userStudioKey(req) {
    const key = String(req.get('x-gemini-key') || '').trim();
    return isStudioKey(key) ? key : null;
  }

  /**
   * Picks who pays for this request: the server key while the learner's daily
   * quota lasts, then the learner's own AI Studio key (X-Gemini-Key header).
   * Responds and returns null when neither is available.
   */
  async function resolveAiAccess(req, res) {
    const server = serverProvider();
    const plan = getServerEffectivePlan(req.user);
    if (server && req.user?.id) {
      const used = await consumeQuota(pool, req.user.id, plan);
      if (used !== null) {
        return { ...server, source: 'quota', refund: () => refundQuota(pool, req.user.id) };
      }
    }
    const ownKey = userStudioKey(req);
    if (ownKey) return { provider: 'google', apiKey: ownKey, model: BYOK_GEMINI_MODEL, source: 'byok' };

    if (!server) {
      res.status(503).json({ error: 'AI server belum dikonfigurasi. Masukkan API key Google AI Studio kamu.', code: 'AI_KEY_REQUIRED' });
      return null;
    }
    const quota = await getQuota(pool, req.user.id, plan);
    res.status(429).json({
      error: `Kuota AI harian kamu (${quota.limit}x) sudah habis. Masukkan API key gratis dari Google AI Studio untuk lanjut, atau tunggu reset jam 00.00 WIB.`,
      code: 'AI_QUOTA_EXCEEDED',
      quota,
    });
    return null;
  }

  /** Calls the chosen provider; failed server-quota calls are refunded. */
  async function callAiJson(access, { prompt, temperature, maxOutputTokens }) {
    const call = access.provider === 'kie'
      ? () => callKie({ apiKey: access.apiKey, baseUrl: KIE_GEMINI_BASE_URL, model: access.model, prompt, temperature, maxOutputTokens })
      : () => callGoogle({ apiKey: access.apiKey, model: access.model, prompt, temperature, maxOutputTokens });
    try {
      const result = await call();
      if (!result.ok && access.refund) await access.refund().catch(() => undefined);
      return result;
    } catch (err) {
      if (access.refund) await access.refund().catch(() => undefined);
      throw err;
    }
  }

  /** Error response for a failed provider call; BYOK problems get their own codes. */
  function sendAiFailure(res, access, result, message) {
    if (access.source === 'byok' && [400, 401, 403].includes(result.status)) {
      return res.status(400).json({ error: 'API key Google AI Studio kamu ditolak. Periksa atau ganti key-nya.', code: 'BYOK_INVALID' });
    }
    if (access.source === 'byok' && result.status === 429) {
      return res.status(429).json({ error: 'Batas gratis Google AI Studio kamu sedang penuh. Coba lagi beberapa menit lagi.', code: 'BYOK_RATE_LIMITED' });
    }
    return res.status(502).json({ error: message });
  }

  app.get('/api/ai/quota', requireAuth, async (req, res) => {
    const quota = await getQuota(pool, req.user.id, getServerEffectivePlan(req.user));
    res.json({ ...quota, serverConfigured: Boolean(serverProvider()) });
  });

  // Validates a learner's AI Studio key before the client saves it. The key is not stored.
  app.post('/api/ai/byok/verify', aiLimiter, requireAuth, async (req, res) => {
    const key = String(req.body?.key || '').trim();
    try {
      const result = await verifyStudioKey(key);
      if (result.ok) return res.json({ ok: true, model: BYOK_GEMINI_MODEL });
      const error = result.reason === 'format'
        ? 'Format key tidak valid. Key Google AI Studio diawali "AIza" dan panjangnya 39 karakter.'
        : result.reason === 'rate_limited' ? 'Key valid tapi sedang terkena batas. Coba lagi sebentar.' : 'Key ditolak oleh Google. Pastikan key aktif di AI Studio.';
      return res.status(400).json({ ok: false, error });
    } catch {
      return res.status(502).json({ ok: false, error: 'Tidak bisa menghubungi Google AI Studio.' });
    }
  });

  // ── AI correction ────────────────────────────────────────
  app.post('/api/ai/vocabulary-lesson', aiLimiter, requireAuth, async (req, res) => {
    const name = String(req.body?.name || 'teman').trim().slice(0, 40);
    const topic = String(req.body?.topic || 'daily life').trim().slice(0, 140);
    const levelId = String(req.body?.levelId || 'a1').trim().slice(0, 8).toUpperCase();
    const allowed = await enforceFreeAiChatTopicLimit(req, res, { topic, levelId, mode: 'vocabulary' });
    if (!allowed) return;

    const access = await resolveAiAccess(req, res);
    if (!access) return;
    const { model } = access;

    const prompt = `You are Fluently AI, an expert English vocabulary curriculum designer for Indonesian learners.

  Generate exactly 30 English vocabulary items for:
  - Student: ${name}
  - Topic: ${topic}
  - CEFR level: ${levelId}

  Level rules:
  - A1: very common concrete words/phrases, short examples, daily life. Avoid abstract/academic words.
  - A2: common practical words/phrases, simple collocations, everyday situations.
  - B1: intermediate vocabulary with natural collocations and clearer context.
  - B2: more precise vocabulary, workplace/academic/general discussion contexts.
  - C1: advanced, nuanced, academic/professional vocabulary and natural sentence patterns.
  - C2: highly precise, sophisticated vocabulary with native-like examples.

  Quality rules:
  - Do not split the topic title into useless words like "and", "info", "personal" unless they are truly useful vocabulary.
  - Every item must be a real useful English word or phrase for the topic and level.
  - IPA must be real IPA in slashes. For phrases, provide readable phrase-level IPA.
  - Indonesian meaning must be accurate and concise.
  - Part of speech must be one of: noun, verb, adjective, adverb, phrase, idiom, phrasal verb.
  - Example sentence must use the exact word/phrase naturally and grammatically.
  - Keep examples level-appropriate. A1 examples must be short.
  - Avoid duplicate words, fake words, placeholder words, and generic examples.

  Return valid JSON only:
  {
    "rows": [
      {
        "word": "hello",
        "phonetic": "/həˈloʊ/",
        "meaning": "halo",
        "pos": "interjection",
        "example": "Hello, my name is Indah."
      }
    ]
  }`;

    try {
      const geminiData = await callAiJson(access, { prompt, temperature: 0.35, maxOutputTokens: 5000 });
      if (!geminiData.ok) {
        console.error('[gemini] vocabulary lesson failed:', geminiData.status, geminiData.data);
        return sendAiFailure(res, access, geminiData, 'AI vocabulary generation failed.');
      }

      const parsed = extractJsonObject(geminiData.text);
      const rows = Array.isArray(parsed?.rows) ? parsed.rows : [];
      const cleanRows = rows
        .map((row) => ({
          word: String(row?.word || '').trim().slice(0, 80),
          phonetic: String(row?.phonetic || '').trim().slice(0, 120),
          meaning: String(row?.meaning || '').trim().slice(0, 120),
          pos: String(row?.pos || '').trim().slice(0, 40),
          example: String(row?.example || '').trim().slice(0, 220),
        }))
        .filter((row) => row.word && row.phonetic.startsWith('/') && row.phonetic.endsWith('/') && row.meaning && row.pos && row.example)
        .slice(0, 30);

      if (cleanRows.length < 20) {
        await access.refund?.();
        return res.status(502).json({ error: 'AI vocabulary generation returned insufficient rows.' });
      }

      return res.json({ model, rows: cleanRows });
    } catch (err) {
      console.error('[gemini] vocabulary lesson error:', err.message);
      return res.status(502).json({ error: 'AI vocabulary generation failed.' });
    }
  });

  app.post('/api/ai/pronunciation-lesson', aiLimiter, requireAuth, async (req, res) => {
    const name = String(req.body?.name || 'teman').trim().slice(0, 40);
    const topic = String(req.body?.topic || 'daily conversation').trim().slice(0, 140);
    const levelId = String(req.body?.levelId || 'a1').trim().slice(0, 8).toUpperCase();
    const allowed = await enforceFreeAiChatTopicLimit(req, res, { topic, levelId, mode: 'pronunciation' });
    if (!allowed) return;

    const access = await resolveAiAccess(req, res);
    if (!access) return;
    const { model } = access;

    const prompt = `You are Fluently AI, an expert English pronunciation coach for Indonesian learners.

  Generate exactly 15 complete English practice sentences for:
  - Student: ${name}
  - Topic/focus: ${topic}
  - CEFR level: ${levelId}

  Level rules:
  - A1: short sentences, common words, basic sounds, very clear rhythm.
  - A2: practical daily sentences, common linking, polite questions.
  - B1: longer everyday sentences, word stress, sentence stress, basic connected speech.
  - B2: natural conversation and work/study contexts, intonation, reductions, linking.
  - C1: advanced delivery, emphasis, contrastive stress, rhythm, connected speech.
  - C2: sophisticated, native-like phrasing, discourse-level intonation, nuance, professional delivery.

  Quality rules:
  - Focus on sentences, not single words.
  - Every sentence must be natural, useful, and level-appropriate.
  - IPA must be accurate and wrapped in slashes. Use General American IPA unless topic clearly asks otherwise.
  - Focus must name a pronunciation feature, such as TH sound, /ɪ/ vs /iː/, sentence stress, linking, intonation, reduced forms, word stress, consonant cluster.
  - Tip must be in Indonesian, simple, practical, and coach-like.
  - Avoid fake IPA, placeholders, duplicate sentences, and overly long A1/A2 sentences.

  Return valid JSON only:
  {
    "rows": [
      {
        "sentence": "Hello, my name is Indah.",
        "phonetic": "/həˈloʊ, maɪ neɪm ɪz ˈɪndɑː/",
        "focus": "sentence stress",
        "tip": "Tekankan name dan Indah. Akhiri dengan nada turun."
      }
    ]
  }`;

    try {
      const geminiData = await callAiJson(access, { prompt, temperature: 0.35, maxOutputTokens: 4200 });
      if (!geminiData.ok) {
        console.error('[gemini] pronunciation lesson failed:', geminiData.status, geminiData.data);
        return sendAiFailure(res, access, geminiData, 'AI pronunciation generation failed.');
      }

      const parsed = extractJsonObject(geminiData.text);
      const rows = Array.isArray(parsed?.rows) ? parsed.rows : [];
      const cleanRows = rows
        .map((row) => ({
          sentence: String(row?.sentence || '').trim().slice(0, 180),
          phonetic: String(row?.phonetic || '').trim().slice(0, 220),
          focus: String(row?.focus || '').trim().slice(0, 80),
          tip: String(row?.tip || '').trim().slice(0, 220),
        }))
        .filter((row) => row.sentence && row.phonetic.startsWith('/') && row.phonetic.endsWith('/') && row.focus && row.tip)
        .slice(0, 15);

      if (cleanRows.length < 12) {
        await access.refund?.();
        return res.status(502).json({ error: 'AI pronunciation generation returned insufficient rows.' });
      }

      return res.json({ model, rows: cleanRows });
    } catch (err) {
      console.error('[gemini] pronunciation lesson error:', err.message);
      return res.status(502).json({ error: 'AI pronunciation generation failed.' });
    }
  });

  app.post('/api/ai/pronunciation-feedback', aiLimiter, requireAuth, async (req, res) => {

    const name = String(req.body?.name || 'teman').trim().slice(0, 40);
    const answer = String(req.body?.answer || '').trim().slice(0, 2000);
    const topic = String(req.body?.topic || 'daily conversation').trim().slice(0, 140);
    const levelId = String(req.body?.levelId || 'a1').trim().slice(0, 8).toUpperCase();
    const turn = Number(req.body?.turn || 0);
    const hasNextBatch = Boolean(req.body?.hasNextBatch);
    const sentences = Array.isArray(req.body?.sentences)
      ? req.body.sentences.map((row, index) => ({
        number: turn * 2 + index + 1,
        sentence: String(row?.sentence || '').trim().slice(0, 180),
        phonetic: String(row?.phonetic || '').trim().slice(0, 220),
        focus: String(row?.focus || '').trim().slice(0, 80),
        tip: String(row?.tip || '').trim().slice(0, 220),
      })).filter((row) => row.sentence)
      : [];

    if (!answer || sentences.length === 0) {
      return res.status(400).json({ error: 'answer and sentences are required.' });
    }

    const access = await resolveAiAccess(req, res);
    if (!access) return;
    const { model } = access;

    const prompt = `You are Fluently AI, a warm but strict English pronunciation coach for Indonesian learners.

  Task: Give pronunciation feedback from a speech-recognition transcript.

  Student: ${name}
  CEFR level: ${levelId}
  Topic/focus: ${topic}
  Transcript from microphone: ${answer}
  Expected sentences:
  ${sentences.map((row) => `${row.number}. "${row.sentence}" | IPA: ${row.phonetic} | Focus: ${row.focus} | Tip: ${row.tip}`).join('\n')}

  Important:
  - The transcript may be imperfect because browser speech recognition hears pronunciation, not exact audio.
  - Compare the transcript to the expected sentence(s). If key words are missing or changed, explain what likely needs clearer pronunciation.
  - Do not overpraise incorrect or incomplete transcript.
  - Give feedback in Indonesian, friendly and human.
  - Mention exact sounds/words to fix, mouth/tongue tips, rhythm/intonation tip, and a clarity score 0-100.
  - Keep it concise, 5-9 short paragraphs or bullets.
  - ${hasNextBatch ? 'End by saying the next sentences are ready.' : 'End by congratulating the student for finishing the sentence set.'}

  Return valid JSON only:
  {
    "feedback": "feedback text"
  }`;

    try {
      const geminiData = await callAiJson(access, { prompt, temperature: 0.25, maxOutputTokens: 1000 });
      if (!geminiData.ok) {
        console.error('[gemini] pronunciation feedback failed:', geminiData.status, geminiData.data);
        return sendAiFailure(res, access, geminiData, 'AI pronunciation feedback failed.');
      }

      const parsed = extractJsonObject(geminiData.text);
      if (!parsed || typeof parsed.feedback !== 'string') {
        await access.refund?.();
        return res.status(502).json({ error: 'AI pronunciation feedback returned invalid format.' });
      }

      return res.json({ model, feedback: parsed.feedback.slice(0, 4000) });
    } catch (err) {
      console.error('[gemini] pronunciation feedback error:', err.message);
      return res.status(502).json({ error: 'AI pronunciation feedback failed.' });
    }
  });

  // Rubric-based speaking/writing assessment for every language and level.
  app.post('/api/ai/assess', aiLimiter, requireAuth, async (req, res) => {
    const language = String(req.body?.language || '').trim();
    const levelId = String(req.body?.levelId || '').trim();
    const skill = String(req.body?.skill || '').trim();
    const answer = String(req.body?.answer || '').trim().slice(0, 4000);
    const task = String(req.body?.task || '').trim().slice(0, 300);
    const found = findRubric(language, levelId, skill);
    if (!found) return res.status(400).json({ error: 'language, levelId atau skill tidak dikenal.' });
    if (answer.length < 5) return res.status(400).json({ error: 'Jawaban terlalu pendek untuk dinilai.' });

    const access = await resolveAiAccess(req, res);
    if (!access) return;
    const { model } = access;
    const prompt = buildAssessmentPrompt({ language, skill, task, answer, ...found });

    try {
      const geminiData = await callAiJson(access, { prompt, temperature: 0.2, maxOutputTokens: 2000 });
      if (!geminiData.ok) {
        console.error('[gemini] assessment failed:', geminiData.status, geminiData.data);
        return sendAiFailure(res, access, geminiData, 'Penilaian AI gagal.');
      }
      const result = normalizeAssessment(extractJsonObject(geminiData.text), found.criteria);
      if (!result) {
        await access.refund?.();
        return res.status(502).json({ error: 'Penilaian AI mengembalikan format tidak valid.' });
      }
      return res.json({ model, ...result });
    } catch (err) {
      console.error('[gemini] assessment error:', err.message);
      return res.status(502).json({ error: 'Penilaian AI gagal.' });
    }
  });

  app.post('/api/ai/vocabulary-correction', aiLimiter, requireAuth, async (req, res) => {

    const name = String(req.body?.name || 'teman').trim().slice(0, 40);
    const answer = String(req.body?.answer || '').trim().slice(0, 2000);
    const topic = String(req.body?.topic || 'daily life').trim().slice(0, 120);
    const levelId = String(req.body?.levelId || 'a1').trim().slice(0, 8).toUpperCase();
    const targetWords = Array.isArray(req.body?.targetWords)
      ? req.body.targetWords.map((word) => String(word || '').trim().toLowerCase()).filter(Boolean).slice(0, 6)
      : [];

    if (!answer || targetWords.length === 0) {
      return res.status(400).json({ error: 'answer and targetWords are required.' });
    }

    const access = await resolveAiAccess(req, res);
    if (!access) return;
    const { model } = access;

    const prompt = `You are Fluently AI, a friendly English vocabulary tutor for Indonesian learners.

  Task: Correct the student's sentence(s), decide which target vocabulary words were used correctly, then give the next helpful feedback.

  Student name: ${name}
  CEFR level: ${levelId}
  Topic: ${topic}
  Target words for this batch: ${targetWords.join(', ')}
  Student answer: ${answer}

  Important rules:
  - Be strict. Do NOT mark a sentence correct just because it has a subject and verb.
  - If grammar is wrong, mark it ⚠️ or ❌ and give a correct natural version.
  - Example: "Hallo, My are wahib" is wrong. Correct it as "Hello, my name is Wahib." or "Hi, I am Wahib."
  - Only include a word in completedWords if the student used that exact target word/phrase naturally and grammatically.
  - If the student used Indonesian spelling like "Hallo" for "hello", correct it and do not count it as completed yet unless the English target word is correct.
  - Feedback must be in Indonesian, warm, human, and concise.
  - Mention each target word that still needs to be practiced.

  Return valid JSON only:
  {
    "feedback": "friendly correction with status, corrected version, simple explanation, and encouragement",
    "completedWords": ["target word used correctly"]
  }`;

    try {
      const geminiData = await callAiJson(access, { prompt, temperature: 0.25, maxOutputTokens: 900 });
      if (!geminiData.ok) {
        console.error('[gemini] vocabulary correction failed:', geminiData.status, geminiData.data);
        return sendAiFailure(res, access, geminiData, 'AI correction failed.');
      }

      const parsed = extractJsonObject(geminiData.text);
      if (!parsed || typeof parsed.feedback !== 'string' || !Array.isArray(parsed.completedWords)) {
        await access.refund?.();
        return res.status(502).json({ error: 'AI correction returned invalid format.' });
      }

      const allowed = new Set(targetWords);
      const completedWords = parsed.completedWords
        .map((word) => String(word || '').trim().toLowerCase())
        .filter((word) => allowed.has(word));

      return res.json({
        model,
        feedback: parsed.feedback.slice(0, 4000),
        completedWords,
      });
    } catch (err) {
      console.error('[gemini] vocabulary correction error:', err.message);
      return res.status(502).json({ error: 'AI correction failed.' });
    }
  });
};
