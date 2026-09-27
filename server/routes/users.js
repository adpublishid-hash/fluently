const bcrypt = require('bcrypt');
const { XP_PER_LEVEL, DAILY_XP_CAP, normalizeXpRequest, grantableXp } = require('../lib/xpPolicy');
const { pool } = require('../db');
const { publicUser } = require('../lib/domain');
const { requireAuth } = require('../middleware/auth');
const { progressLimiter, xpLimiter } = require('../middleware/rateLimits');

module.exports = function register(app) {
  // ── Current user (token-verified) ─────────────────────────
  app.get('/api/users/me', requireAuth, (req, res) => {
    res.set('Cache-Control', 'no-store');
    res.json({ user: publicUser(req.user) });
  });

  // ── Update profile (display name + avatar) ────────────────
  app.put('/api/users/profile', requireAuth, async (req, res) => {
    const { displayName, avatarUrl } = req.body || {};
    const trimmedName = typeof displayName === 'string' ? displayName.trim().slice(0, 60) : null;
    const trimmedAvatar = typeof avatarUrl === 'string' ? avatarUrl.trim() : null;

    if (trimmedAvatar && trimmedAvatar.length > 200_000) {
      return res.status(413).json({ error: 'Avatar terlalu besar' });
    }
    if (trimmedAvatar && !/^(https?:\/\/|data:image\/)/i.test(trimmedAvatar)) {
      return res.status(400).json({ error: 'Avatar harus berupa URL https atau data:image/' });
    }

    try {
      const result = await pool.query(
        `UPDATE users
         SET display_name = COALESCE($1, display_name),
             name = COALESCE($1, name),
             avatar_url = COALESCE($2, avatar_url),
             updated_at = now()
         WHERE id = $3
         RETURNING id, name, email, phone, onboarding_completed, persona, role, plan, plan_expires_at, status, display_name, avatar_url, xp, streak, level`,
        [trimmedName, trimmedAvatar, req.user.id],
      );
      res.json({ success: true, user: publicUser(result.rows[0]) });
    } catch (err) {
      console.error('[profile-update]', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // ── Change password ───────────────────────────────────────
  app.put('/api/users/password', requireAuth, async (req, res) => {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Password lama dan password baru wajib diisi' });
    }
    if (String(newPassword).length < 8) {
      return res.status(400).json({ error: 'Password baru minimal 8 karakter' });
    }

    try {
      const result = await pool.query(
        'SELECT id, password_hash FROM users WHERE id = $1',
        [req.user.id],
      );
      const row = result.rows[0];
      if (!row) return res.status(404).json({ error: 'User not found' });

      const valid = await bcrypt.compare(String(currentPassword), row.password_hash);
      if (!valid) return res.status(400).json({ error: 'Password lama tidak sesuai' });

      const passwordHash = await bcrypt.hash(String(newPassword), 10);
      await pool.query(
        'UPDATE users SET password_hash = $1, updated_at = now() WHERE id = $2',
        [passwordHash, req.user.id],
      );
      res.json({ success: true });
    } catch (err) {
      console.error('[password-change]', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // ── Save onboarding persona ───────────────────────────────
  app.put('/api/users/persona', requireAuth, async (req, res) => {
    const { persona } = req.body;
    if (!persona || typeof persona !== 'object')
      return res.status(400).json({ error: 'Persona is required' });

    try {
      const result = await pool.query(
        `UPDATE users
         SET persona = $1::jsonb,
             onboarding_completed = true,
             updated_at = now()
         WHERE id = $2
         RETURNING id, name, email, phone, onboarding_completed, persona, role, plan, plan_expires_at, status, display_name, avatar_url, xp, streak, level`,
        [JSON.stringify(persona), req.user.id]
      );

      if (!result.rows.length)
        return res.status(404).json({ error: 'User not found' });

      res.json({ success: true, user: publicUser(result.rows[0]) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // ── Award XP + update streak ─────────────────────────────
  // POST /api/users/xp  { xp: number, activity: string, sourceKey?: string }
  // The server decides how much XP is granted (see lib/xpPolicy.js):
  // per-activity ceilings, one award per sourceKey, and a daily cap.
  app.post('/api/users/xp', xpLimiter, requireAuth, async (req, res) => {
    const request = normalizeXpRequest(req.body);
    if (request.error) return res.status(400).json({ error: request.error });

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      // Lock the user row so concurrent requests cannot both pass the daily cap.
      await client.query('SELECT id FROM users WHERE id = $1 FOR UPDATE', [req.user.id]);
      const today = await client.query(
        `SELECT COALESCE(SUM(xp), 0)::int AS total FROM xp_events
         WHERE user_id = $1 AND created_at >= date_trunc('day', now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC'`,
        [req.user.id],
      );
      let awarded = grantableXp(request.xp, today.rows[0].total);
      let duplicate = false;

      if (request.sourceKey) {
        const inserted = await client.query(
          `INSERT INTO xp_events (user_id, activity, source_key, xp) VALUES ($1, $2, $3, $4)
           ON CONFLICT (user_id, source_key) WHERE source_key IS NOT NULL DO NOTHING
           RETURNING id`,
          [req.user.id, request.activity, request.sourceKey, awarded],
        );
        if (!inserted.rows.length) {
          duplicate = true;
          awarded = 0;
        }
      } else if (awarded > 0) {
        await client.query(
          'INSERT INTO xp_events (user_id, activity, xp) VALUES ($1, $2, $3)',
          [req.user.id, request.activity, awarded],
        );
      }

      // Use DB time to decide streak: if last activity was yesterday → continue streak,
      // if today → no change, if older → reset to 1.
      const result = await client.query(
        `UPDATE users
         SET xp     = xp + $1,
             level  = GREATEST(1, FLOOR((xp + $1) / $2)::int + 1),
             streak = CASE
               WHEN DATE(COALESCE(last_login_at, created_at) AT TIME ZONE 'UTC') = CURRENT_DATE - INTERVAL '1 day'
                 THEN streak + 1
               WHEN DATE(COALESCE(last_login_at, created_at) AT TIME ZONE 'UTC') = CURRENT_DATE
                 THEN streak
               ELSE 1
             END,
             last_login_at = now(),
             updated_at    = now()
         WHERE id = $3
         RETURNING id, name, email, phone, onboarding_completed, persona, role, plan, plan_expires_at,
                   status, display_name, avatar_url, xp, streak, level`,
        [awarded, XP_PER_LEVEL, req.user.id],
      );
      await client.query('COMMIT');

      if (!result.rows.length) return res.status(404).json({ error: 'User not found' });
      res.json({
        success: true,
        awarded,
        duplicate,
        capped: !duplicate && awarded < request.xp,
        dailyCap: DAILY_XP_CAP,
        user: publicUser(result.rows[0]),
      });
    } catch (err) {
      await client.query('ROLLBACK').catch(() => {});
      console.error('[xp-award]', err);
      res.status(500).json({ error: 'Server error' });
    } finally {
      client.release();
    }
  });

  // ── Lesson progress sync ─────────────────────────────────
  // Progress items are "<storageKey>|<lessonId>" strings mirroring the client's
  // localStorage completion lists, so progress follows the user across devices.
  const PROGRESS_ITEM_PATTERN = /^(talky|fluently)_[a-z0-9_-]{1,120}_completed\|[a-z0-9:/_.-]{1,80}$/i;
  const PROGRESS_MAX_ITEMS = 5000;

  async function readProgress(userId) {
    const result = await pool.query(
      'SELECT item_key FROM lesson_progress WHERE user_id = $1 ORDER BY completed_at',
      [userId],
    );
    return result.rows.map((row) => row.item_key);
  }

  app.get('/api/users/progress', requireAuth, async (req, res) => {
    try {
      res.json({ items: await readProgress(req.user.id) });
    } catch (err) {
      console.error('[progress-read]', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.post('/api/users/progress', progressLimiter, requireAuth, async (req, res) => {
    const raw = Array.isArray(req.body?.items) ? req.body.items : null;
    if (!raw) return res.status(400).json({ error: 'items harus berupa array' });
    if (raw.length > PROGRESS_MAX_ITEMS) return res.status(400).json({ error: `Maksimal ${PROGRESS_MAX_ITEMS} item per sinkronisasi` });
    const items = [...new Set(raw.filter((item) => typeof item === 'string' && PROGRESS_ITEM_PATTERN.test(item)))];

    try {
      if (items.length) {
        await pool.query(
          `INSERT INTO lesson_progress (user_id, item_key)
           SELECT $1, unnest($2::text[])
           ON CONFLICT DO NOTHING`,
          [req.user.id, items],
        );
      }
      res.json({ items: await readProgress(req.user.id) });
    } catch (err) {
      console.error('[progress-write]', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // GET /api/leaderboard?limit=50 — top learners ranked by XP.
  app.get('/api/leaderboard', requireAuth, async (req, res) => {
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 50));
    try {
      const result = await pool.query(
        `SELECT id, name, display_name, avatar_url, xp, streak, level
           FROM users
          WHERE COALESCE(status, 'active') = 'active'
          ORDER BY xp DESC, level DESC, id ASC
          LIMIT $1`,
        [limit],
      );

      const leaderboard = result.rows.map((row, index) => ({
        rank: index + 1,
        user: {
          id: row.id,
          name: row.display_name || row.name,
          avatarUrl: row.avatar_url || '',
          xp: Number(row.xp ?? 0),
          streak: Number(row.streak ?? 0),
          level: Number(row.level ?? 1),
        },
        isCurrentUser: row.id === req.user.id,
      }));

      res.json({ leaderboard });
    } catch (err) {
      console.error('[leaderboard]', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // ── Upgrade membership plan ──────────────────────────────
  app.post('/api/users/upgrade', requireAuth, async (req, res) => {
    return res.status(403).json({
      error: 'Upgrade plan harus diverifikasi oleh admin atau payment provider.',
      code: 'UPGRADE_REQUIRES_VERIFICATION',
    });
  });
};
