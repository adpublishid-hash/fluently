const { pool } = require('../db');
const { requireAuth } = require('../middleware/auth');
const { progressLimiter } = require('../middleware/rateLimits');
const {
  MAX_ACTIVE_PER_LANGUAGE,
  normalizeMistakeFocus,
  normalizeMistakeItems,
  normalizeMistakeLanguage,
} = require('../lib/mistakes');

const toJson = (row) => ({
  id: row.id,
  language: row.language,
  focus: row.focus,
  topic: row.topic,
  original: row.original,
  corrected: row.corrected,
  explanation: row.explanation,
  timesSeen: row.times_seen,
  updatedAt: row.updated_at,
});

module.exports = function register(app) {
  // GET /api/chat/mistakes?language=japanese&limit=20 — open mistakes, most recent first.
  app.get('/api/chat/mistakes', requireAuth, async (req, res) => {
    const language = normalizeMistakeLanguage(req.query.language);
    if (!language) return res.status(400).json({ error: 'language tidak dikenal.' });
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));
    try {
      const result = await pool.query(
        `SELECT * FROM chat_mistakes
          WHERE user_id = $1 AND language = $2 AND NOT mastered
          ORDER BY updated_at DESC, id DESC
          LIMIT $3`,
        [req.user.id, language, limit],
      );
      res.json({ items: result.rows.map(toJson) });
    } catch (err) {
      console.error('[mistakes-read]', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // POST /api/chat/mistakes — records mistakes; a repeated mistake is reopened and counted again.
  app.post('/api/chat/mistakes', progressLimiter, requireAuth, async (req, res) => {
    const language = normalizeMistakeLanguage(req.body?.language);
    if (!language) return res.status(400).json({ error: 'language tidak dikenal.' });
    const items = normalizeMistakeItems(req.body?.items);
    if (!items.length) return res.json({ saved: 0 });
    const focus = normalizeMistakeFocus(req.body?.focus);
    const topic = String(req.body?.topic || '').trim().slice(0, 140);

    try {
      for (const item of items) {
        await pool.query(
          `INSERT INTO chat_mistakes (user_id, language, focus, topic, mistake_key, original, corrected, explanation)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT (user_id, language, mistake_key) DO UPDATE
             SET corrected = EXCLUDED.corrected,
                 explanation = EXCLUDED.explanation,
                 focus = EXCLUDED.focus,
                 topic = EXCLUDED.topic,
                 times_seen = chat_mistakes.times_seen + 1,
                 mastered = false,
                 updated_at = now()`,
          [req.user.id, language, focus, topic, item.key, item.original, item.corrected, item.explanation],
        );
      }
      // Keep the notebook bounded: drop the oldest open mistakes beyond the cap.
      await pool.query(
        `DELETE FROM chat_mistakes
          WHERE id IN (
            SELECT id FROM chat_mistakes
             WHERE user_id = $1 AND language = $2 AND NOT mastered
             ORDER BY updated_at DESC, id DESC
             OFFSET $3
          )`,
        [req.user.id, language, MAX_ACTIVE_PER_LANGUAGE],
      );
      res.json({ saved: items.length });
    } catch (err) {
      console.error('[mistakes-write]', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // POST /api/chat/mistakes/:id/mastered — the learner marks a mistake as understood.
  app.post('/api/chat/mistakes/:id/mastered', progressLimiter, requireAuth, async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: 'id tidak valid.' });
    try {
      const result = await pool.query(
        'UPDATE chat_mistakes SET mastered = true, updated_at = now() WHERE id = $1 AND user_id = $2',
        [id, req.user.id],
      );
      if (!result.rowCount) return res.status(404).json({ error: 'Tidak ditemukan.' });
      res.json({ ok: true });
    } catch (err) {
      console.error('[mistakes-mastered]', err);
      res.status(500).json({ error: 'Server error' });
    }
  });
};
