const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { ADMIN_EMAIL, GOOGLE_CLIENT_ID, PUBLIC_APP_URL, RESET_TOKEN_TTL_MIN } = require('../config');
const { pool } = require('../db');
const { normalizeEmail, publicUser } = require('../lib/domain');
const { buildWelcomeEmailHtml, escapeHtml, normalizeWaPhone, sendEmail } = require('../lib/notify');
const { signToken } = require('../middleware/auth');
const { authLimiter, resetLimiter } = require('../middleware/rateLimits');

module.exports = function register(app) {
  async function verifyGoogleIdToken(idToken) {
    if (!idToken || typeof idToken !== 'string') {
      throw new Error('Missing Google credential');
    }

    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload) {
      throw new Error('Google credential is invalid');
    }
    if (payload.aud !== GOOGLE_CLIENT_ID) {
      throw new Error('Google credential audience mismatch');
    }
    if (!['accounts.google.com', 'https://accounts.google.com'].includes(payload.iss)) {
      throw new Error('Google credential issuer mismatch');
    }
    if (payload.email_verified !== 'true' && payload.email_verified !== true) {
      throw new Error('Google email is not verified');
    }

    return {
      sub: String(payload.sub || ''),
      email: normalizeEmail(payload.email || ''),
      name: String(payload.name || payload.given_name || 'Learner').trim(),
      picture: String(payload.picture || ''),
    };
  }

  // ── Register ──────────────────────────────────────────────
  app.post('/api/auth/register', authLimiter, async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone)
      return res.status(400).json({ error: 'All fields required' });
    if (String(password).length < 8)
      return res.status(400).json({ error: 'Password minimal 8 karakter' });
    const normalizedPhone = normalizeWaPhone(phone);
    if (!/^62\d{8,13}$/.test(normalizedPhone)) {
      return res.status(400).json({ error: 'Nomor WhatsApp tidak valid' });
    }

    try {
      const normalized = normalizeEmail(email);
      const exists = await pool.query('SELECT id FROM users WHERE email = $1', [normalized]);
      if (exists.rows.length)
        return res.status(409).json({ error: 'Email already registered' });

      const passwordHash = await bcrypt.hash(password, 10);
      const result = await pool.query(
        `INSERT INTO users (name, email, phone, password_hash, role, plan, status)
         VALUES ($1, $2, $3, $4, $5, $6, 'active')
         RETURNING id, name, email, phone, onboarding_completed, persona, role, plan, plan_expires_at, status, display_name, avatar_url, xp, streak, level`,
        [name, normalized, normalizedPhone, passwordHash, normalized === ADMIN_EMAIL ? 'admin' : 'user', normalized === ADMIN_EMAIL ? 'lifetime' : 'free']
      );
      const user = result.rows[0];
      sendEmail({
        to: user.email,
        subject: 'Selamat datang di Fluently',
        html: buildWelcomeEmailHtml(user),
        text: `Hai ${user.display_name || user.name || 'Learner'}, akun Fluently kamu sudah aktif. Mulai belajar di ${PUBLIC_APP_URL.replace(/\/$/, '')}`,
      }).catch((err) => {
        console.error('[register] welcome email error:', err.message);
      });
      res.json({ success: true, user: publicUser(user), token: signToken(user) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // ── Login ─────────────────────────────────────────────────
  app.post('/api/auth/login', authLimiter, async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required' });

    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [normalizeEmail(email)]);
      if (!result.rows.length)
        return res.status(401).json({ error: 'login.errorInvalidCredentials' });

      const user = result.rows[0];
      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid)
        return res.status(401).json({ error: 'login.errorInvalidCredentials' });
      if (user.status === 'suspended')
        return res.status(403).json({ error: 'Akun sedang dinonaktifkan' });

      await pool.query('UPDATE users SET last_login_at = now(), updated_at = now() WHERE id = $1', [user.id]);
      res.json({ success: true, user: publicUser(user), token: signToken(user) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // ── Google sign in / sign up ──────────────────────────────
  app.post('/api/auth/google', authLimiter, async (req, res) => {
    const credential = req.body?.credential || req.body?.idToken;
    if (!credential) return res.status(400).json({ error: 'Google credential required' });

    try {
      const profile = await verifyGoogleIdToken(credential);
      if (!profile.sub || !profile.email) {
        return res.status(401).json({ error: 'Google credential is incomplete' });
      }

      const existing = await pool.query(
        `SELECT * FROM users WHERE google_sub = $1 OR email = $2 ORDER BY google_sub = $1 DESC LIMIT 1`,
        [profile.sub, profile.email]
      );

      let user;
      let isNewUser = false;

      if (existing.rows.length) {
        const current = existing.rows[0];
        if (current.status === 'suspended') {
          return res.status(403).json({ error: 'Akun sedang dinonaktifkan' });
        }

        const provider = current.auth_provider === 'password' ? 'password_google' : (current.auth_provider || 'google');
        const update = await pool.query(
          `UPDATE users
           SET google_sub = COALESCE(google_sub, $1),
               auth_provider = $2,
               display_name = COALESCE(NULLIF(display_name, ''), $3),
               avatar_url = COALESCE(NULLIF(avatar_url, ''), $4),
               last_login_at = now(),
               updated_at = now()
           WHERE id = $5
           RETURNING id, name, email, phone, onboarding_completed, persona, role, plan, plan_expires_at, status, display_name, avatar_url, xp, streak, level`,
          [profile.sub, provider, profile.name, profile.picture, current.id]
        );
        user = update.rows[0];
      } else {
        isNewUser = true;
        const passwordHash = await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 10);
        const insert = await pool.query(
          `INSERT INTO users (name, email, password_hash, role, plan, status, display_name, avatar_url, auth_provider, google_sub, last_login_at)
           VALUES ($1, $2, $3, $4, $5, 'active', $1, $6, 'google', $7, now())
           RETURNING id, name, email, phone, onboarding_completed, persona, role, plan, plan_expires_at, status, display_name, avatar_url, xp, streak, level`,
          [
            profile.name || profile.email.split('@')[0],
            profile.email,
            passwordHash,
            profile.email === ADMIN_EMAIL ? 'admin' : 'user',
            profile.email === ADMIN_EMAIL ? 'lifetime' : 'free',
            profile.picture,
            profile.sub,
          ]
        );
        user = insert.rows[0];
      }

      if (isNewUser) {
        sendEmail({
          to: user.email,
          subject: 'Selamat datang di Fluently',
          html: buildWelcomeEmailHtml(user),
          text: `Hai ${user.display_name || user.name || 'Learner'}, akun Fluently kamu sudah aktif. Mulai belajar di ${PUBLIC_APP_URL.replace(/\/$/, '')}`,
        }).catch((err) => {
          console.error('[google-auth] welcome email error:', err.message);
        });
      }

      res.json({ success: true, user: publicUser(user), token: signToken(user), isNewUser });
    } catch (err) {
      console.error('[google-auth]', err.message);
      res.status(401).json({ error: 'Google login gagal. Silakan coba lagi.' });
    }
  });

  // ── User exists ───────────────────────────────────────────
  app.get('/api/auth/exists', authLimiter, async (req, res) => {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Email required' });

    try {
      const result = await pool.query('SELECT id FROM users WHERE email = $1', [normalizeEmail(email)]);
      res.json({ exists: result.rows.length > 0 });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // ── Password reset: request token ─────────────────────────
  // Always returns 200 with a generic success to avoid email enumeration.
  app.post('/api/auth/reset/request', resetLimiter, async (req, res) => {
    const email = normalizeEmail(req.body?.email);
    const generic = { success: true };
    if (!email) return res.status(400).json({ error: 'Email required' });

    try {
      const result = await pool.query('SELECT id, email, name FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
      if (user) {
        const rawToken = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
        const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MIN * 60 * 1000);

        await pool.query(
          `INSERT INTO password_reset_tokens (token_hash, user_id, expires_at) VALUES ($1, $2, $3)`,
          [tokenHash, user.id, expiresAt],
        );

        const resetLink = `${PUBLIC_APP_URL.replace(/\/$/, '')}/reset-password?token=${rawToken}`;
        const html = `<!doctype html><html><body style="font-family:-apple-system,sans-serif;padding:24px;background:#f1f5f9">
          <div style="max-width:480px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:20px">
            <h2 style="margin:0 0 8px;color:#0f172a">Reset password Fluently</h2>
            <p style="color:#475569;font-size:14px;line-height:1.6">Hai ${escapeHtml(user.name || '')}, kami menerima permintaan reset password untuk akun ini. Klik tombol di bawah untuk mengganti password. Link berlaku ${RESET_TOKEN_TTL_MIN} menit.</p>
            <p style="text-align:center;margin:20px 0">
              <a href="${resetLink}" style="display:inline-block;background:#0F8DCC;color:#fff;font-weight:800;padding:12px 22px;border-radius:10px;text-decoration:none">Reset Password</a>
            </p>
            <p style="color:#94a3b8;font-size:11px;line-height:1.6">Jika kamu tidak meminta reset, abaikan email ini — password kamu tidak akan berubah. Link: ${escapeHtml(resetLink)}</p>
          </div>
        </body></html>`;
        // Fire and forget so response time stays constant regardless of email send latency.
        sendEmail({ to: user.email, subject: 'Reset password Fluently', html }).catch((err) => {
          console.error('[reset-request] email error:', err.message);
        });
      }

      res.json(generic);
    } catch (err) {
      console.error('[reset-request]', err);
      // Still return generic to prevent enumeration on transient errors.
      res.json(generic);
    }
  });

  // ── Password reset: confirm with token ────────────────────
  app.post('/api/auth/reset/confirm', resetLimiter, async (req, res) => {
    const { token, newPassword } = req.body || {};
    if (!token || !newPassword)
      return res.status(400).json({ error: 'Token and new password required' });
    if (String(newPassword).length < 8)
      return res.status(400).json({ error: 'Password minimal 8 karakter' });

    const tokenHash = crypto.createHash('sha256').update(String(token)).digest('hex');

    try {
      const result = await pool.query(
        `SELECT user_id, expires_at, used_at FROM password_reset_tokens WHERE token_hash = $1`,
        [tokenHash],
      );
      const row = result.rows[0];
      if (!row || row.used_at || new Date(row.expires_at).getTime() < Date.now()) {
        return res.status(400).json({ error: 'Token tidak valid atau sudah kedaluwarsa' });
      }

      const passwordHash = await bcrypt.hash(newPassword, 10);
      await pool.query('UPDATE users SET password_hash = $1, updated_at = now() WHERE id = $2', [passwordHash, row.user_id]);
      await pool.query('UPDATE password_reset_tokens SET used_at = now() WHERE token_hash = $1', [tokenHash]);
      // Invalidate any other outstanding reset tokens for this user.
      await pool.query('DELETE FROM password_reset_tokens WHERE user_id = $1 AND used_at IS NULL', [row.user_id]);

      res.json({ success: true });
    } catch (err) {
      console.error('[reset-confirm]', err);
      res.status(500).json({ error: 'Server error' });
    }
  });
};
