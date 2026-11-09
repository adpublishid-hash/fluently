const { pool } = require('../db');
const { requireAdmin, requireAuth } = require('../middleware/auth');
const { supportLimiter } = require('../middleware/rateLimits');
const { normalizeContentReport, normalizeReportStatus } = require('../lib/contentReports');

const toJson = (row) => ({
  id: row.id,
  userName: row.user_name || '',
  userEmail: row.user_email || '',
  language: row.language,
  focus: row.focus,
  topic: row.topic,
  levelId: row.level_id,
  reason: row.reason,
  note: row.note,
  excerpt: row.excerpt,
  status: row.status,
  createdAt: row.created_at,
  resolvedAt: row.resolved_at,
});

module.exports = function register(app) {
  // POST /api/chat/content-reports — a learner flags an AI chat message as wrong.
  app.post('/api/chat/content-reports', supportLimiter, requireAuth, async (req, res) => {
    const report = normalizeContentReport(req.body);
    if (!report) return res.status(400).json({ error: 'language dan isi pesan wajib diisi.' });
    try {
      const result = await pool.query(
        `INSERT INTO ai_content_reports (user_id, language, focus, topic, level_id, reason, note, excerpt)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id`,
        [req.user.id, report.language, report.focus, report.topic, report.levelId, report.reason, report.note, report.excerpt],
      );
      res.json({ id: result.rows[0].id });
    } catch (err) {
      console.error('[content-report]', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // GET /api/admin/content-reports?status=open — newest first; status "all" lists both.
  app.get('/api/admin/content-reports', requireAdmin, async (req, res) => {
    const status = normalizeReportStatus(req.query.status);
    try {
      const result = await pool.query(
        `SELECT r.*, COALESCE(u.display_name, u.name) AS user_name, u.email AS user_email
           FROM ai_content_reports r
           LEFT JOIN users u ON u.id = r.user_id
          WHERE $1::text IS NULL OR r.status = $1
          ORDER BY r.created_at DESC, r.id DESC
          LIMIT 200`,
        [status],
      );
      const open = await pool.query("SELECT COUNT(*)::int AS count FROM ai_content_reports WHERE status = 'open'");
      res.json({ items: result.rows.map(toJson), open: open.rows[0].count });
    } catch (err) {
      console.error('[content-report-list]', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // PATCH /api/admin/content-reports/:id — mark a report resolved (or reopen it).
  app.patch('/api/admin/content-reports/:id', requireAdmin, async (req, res) => {
    const status = normalizeReportStatus(req.body?.status);
    const id = Number(req.params.id);
    if (!status || !Number.isInteger(id)) return res.status(400).json({ error: 'status tidak dikenal.' });
    try {
      const result = await pool.query(
        `UPDATE ai_content_reports
            SET status = $1, resolved_at = CASE WHEN $1 = 'resolved' THEN now() ELSE NULL END
          WHERE id = $2
          RETURNING *`,
        [status, id],
      );
      if (!result.rows.length) return res.status(404).json({ error: 'Laporan tidak ditemukan.' });
      res.json({ item: toJson(result.rows[0]) });
    } catch (err) {
      console.error('[content-report-update]', err);
      res.status(500).json({ error: 'Server error' });
    }
  });
};
