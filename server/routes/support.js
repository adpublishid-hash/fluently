const { SUPPORT_EMAIL } = require('../config');
const { buildToeflCompletionEmailHtml, escapeHtml, sendEmail } = require('../lib/notify');
const { requireAuth } = require('../middleware/auth');
const { authLimiter, supportLimiter } = require('../middleware/rateLimits');

module.exports = function register(app) {
  // ── Support & feedback ───────────────────────────────────
  app.post('/api/support/feedback', supportLimiter, requireAuth, async (req, res) => {
    const category = String(req.body?.category || 'feedback').slice(0, 40);
    const subject = String(req.body?.subject || 'Fluently feedback').trim().slice(0, 120);
    const message = String(req.body?.message || '').trim().slice(0, 4000);
    const rating = req.body?.rating === undefined ? null : Number(req.body.rating);
    const page = String(req.body?.page || '').slice(0, 300);

    if (!message || message.length < 5) {
      return res.status(400).json({ error: 'Message must be at least 5 characters' });
    }
    if (rating !== null && (!Number.isFinite(rating) || rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const safeSubject = `[Fluently ${category}] ${subject || 'Support request'}`;
    const rows = [
      ['Name', req.user.display_name || req.user.name || '-'],
      ['Email', req.user.email || '-'],
      ['User ID', req.user.id || '-'],
      ['Category', category],
      ['Rating', rating ? `${rating}/5` : '-'],
      ['Page', page || '-'],
    ];
    const metaRows = rows.map(([label, value]) => `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:12px;font-weight:700">${escapeHtml(label)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:12px;font-weight:700">${escapeHtml(value)}</td>
      </tr>`).join('');

    const html = `<!doctype html><html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;padding:24px">
      <div style="max-width:640px;margin:0 auto;background:white;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden">
        <div style="background:#4f46e5;color:white;padding:18px 20px">
          <h1 style="font-size:20px;line-height:1.3;margin:0">New Fluently ${escapeHtml(category)} message</h1>
          <p style="font-size:13px;opacity:.85;margin:6px 0 0">${escapeHtml(subject || 'Support request')}</p>
        </div>
        <div style="padding:18px 20px">
          <table style="width:100%;border-collapse:collapse;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">${metaRows}</table>
          <h2 style="font-size:14px;margin:20px 0 8px;color:#0f172a">Message</h2>
          <div style="white-space:pre-wrap;color:#334155;font-size:14px;line-height:1.7;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px">${escapeHtml(message)}</div>
        </div>
      </div>
    </body></html>`;

    const text = `${safeSubject}

  Name: ${req.user.display_name || req.user.name || '-'}
  Email: ${req.user.email || '-'}
  User ID: ${req.user.id || '-'}
  Category: ${category}
  Rating: ${rating ? `${rating}/5` : '-'}
  Page: ${page || '-'}

  ${message}`;

    try {
      const result = await sendEmail({ to: SUPPORT_EMAIL, subject: safeSubject, html, text });
      res.json({ success: true, sent: result.sent, outbox: result.file || null });
    } catch (err) {
      console.error('[support-feedback]', err);
      res.status(500).json({ error: 'Unable to send support email' });
    }
  });

  // ── Exam completion certificates ─────────────────────────
  app.post('/api/exams/toefl/completion-email', authLimiter, requireAuth, async (req, res) => {
    const testName = String(req.body?.testName || 'TOEFL Practice Test').trim().slice(0, 80);
    const totalScore = Number(req.body?.totalScore);
    const sections = Array.isArray(req.body?.sections) ? req.body.sections : [];
    const submittedAt = String(req.body?.submittedAt || new Date().toISOString());
    const certificate = req.body?.certificate || {};
    const fileName = String(certificate.fileName || 'TOEFL_Certificate.pdf').replace(/[^\w.\-]+/g, '_').slice(0, 120);
    const base64 = String(certificate.base64 || '');

    if (!Number.isFinite(totalScore) || totalScore < 200 || totalScore > 700) {
      return res.status(400).json({ error: 'Invalid TOEFL score' });
    }
    if (!sections.length || sections.length > 3) {
      return res.status(400).json({ error: 'Invalid TOEFL sections' });
    }
    if (!base64 || base64.length > 2_500_000 || !/^[A-Za-z0-9+/=]+$/.test(base64)) {
      return res.status(400).json({ error: 'Invalid certificate file' });
    }

    const safeSections = sections.map((section) => ({
      title: String(section.title || '').slice(0, 30),
      raw: Number(section.raw || 0),
      scaled: Number(section.scaled || 0),
      total: Number(section.total || 0),
    }));

    try {
      const html = buildToeflCompletionEmailHtml({
        user: req.user,
        testName,
        totalScore,
        sections: safeSections,
        submittedAt,
      });
      const result = await sendEmail({
        to: req.user.email,
        subject: `Sertifikat ${testName} - Skor ${totalScore}`,
        html,
        text: `Selamat ${req.user.display_name || req.user.name || ''}, kamu sudah menyelesaikan ${testName}. Estimasi skor TOEFL PBT: ${totalScore}. Sertifikat PDF terlampir.`,
        attachments: [
          {
            filename: fileName || 'TOEFL_Certificate.pdf',
            content: Buffer.from(base64, 'base64'),
            contentType: 'application/pdf',
          },
        ],
      });
      res.json({ success: true, sent: result.sent, outbox: result.file || null });
    } catch (err) {
      console.error('[toefl-completion-email]', err);
      res.status(500).json({ error: 'Unable to send TOEFL certificate email' });
    }
  });
};
