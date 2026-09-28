const jwt = require('jsonwebtoken');
const { ADMIN_EMAIL, JWT_EXPIRES_IN, JWT_SECRET } = require('../config');
const { pool } = require('../db');

// ── JWT helpers ───────────────────────────────────────────
function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role || 'user' },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

function readBearer(req) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) return null;
  return header.slice('Bearer '.length).trim() || null;
}

async function requireAuth(req, res, next) {
  const token = readBearer(req);
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  const payload = verifyToken(token);
  if (!payload || !payload.sub) return res.status(401).json({ error: 'Invalid or expired token' });

  try {
    const result = await pool.query(
      'SELECT id, name, email, phone, role, plan, plan_expires_at, status, persona, onboarding_completed, display_name, avatar_url, xp, streak, level FROM users WHERE id = $1',
      [payload.sub],
    );
    const user = result.rows[0];
    if (!user || user.status !== 'active') {
      return res.status(401).json({ error: 'Account inactive or removed' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error('[auth] requireAuth error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
}

async function optionalAuth(req, _res, next) {
  const token = readBearer(req);
  if (!token) return next();
  const payload = verifyToken(token);
  if (!payload || !payload.sub) return next();

  try {
    const result = await pool.query(
      'SELECT id, name, email, phone, role, plan, plan_expires_at, status, persona, onboarding_completed, display_name, avatar_url, xp, streak, level FROM users WHERE id = $1',
      [payload.sub],
    );
    const user = result.rows[0];
    if (user && user.status === 'active') req.user = user;
  } catch (err) {
    console.error('[auth] optionalAuth error:', err.message);
  }
  next();
}

function requireAdmin(req, res, next) {
  return requireAuth(req, res, () => {
    if ((req.user.email || '').toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  });
}

module.exports = {
  signToken,
  verifyToken,
  readBearer,
  requireAuth,
  optionalAuth,
  requireAdmin,
};
