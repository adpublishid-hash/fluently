const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { XP_PER_LEVEL, DAILY_XP_CAP, normalizeXpRequest, grantableXp } = require('./lib/xpPolicy');

// Load .env manually (no dotenv dependency)
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [key, ...val] = line.split('=');
    if (key && val.length && process.env[key.trim()] === undefined) process.env[key.trim()] = val.join('=').trim();
  });
}

const app = express();
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = NODE_ENV === 'production';
if (isProduction) app.set('trust proxy', 1);

function requiredEnv(name, { productionOnly = false } = {}) {
  const value = process.env[name];
  if (!value && (!productionOnly || isProduction)) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value || '';
}

function csvEnv(name, fallback = []) {
  const value = process.env[name];
  if (!value) return fallback;
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'wahib.chelsea@gmail.com';
const ADMIN_PASSWORD = requiredEnv('ADMIN_PASSWORD', { productionOnly: true }) || 'ChangeMeDev123!';
const ORDER_NOTIFY_EMAIL = process.env.ORDER_NOTIFY_EMAIL || ADMIN_EMAIL;
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || 'support@fluently.id';

const JWT_SECRET = requiredEnv('JWT_SECRET', { productionOnly: true })
  || (isProduction ? '' : 'dev-only-jwt-secret-change-me-please');
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
if (!isProduction && JWT_SECRET === 'dev-only-jwt-secret-change-me-please') {
  console.warn('[auth] Using dev JWT secret. Set JWT_SECRET in env for production.');
}
const PUBLIC_APP_URL = process.env.PUBLIC_APP_URL || 'http://localhost:5173';
const RESET_TOKEN_TTL_MIN = Number(process.env.RESET_TOKEN_TTL_MIN || 30);
const RAJAONGKIR_KEY = requiredEnv('RAJAONGKIR_KEY', { productionOnly: true });
const RAJAONGKIR_BASE = process.env.RAJAONGKIR_BASE || 'https://rajaongkir.komerce.id/api/v1';
const QRIS_IMAGE_URL = process.env.QRIS_IMAGE_URL || '';
const SMTP_HOST = requiredEnv('SMTP_HOST', { productionOnly: true });
const SMTP_USER = requiredEnv('SMTP_USER', { productionOnly: true });
const SMTP_PASS = requiredEnv('SMTP_PASS', { productionOnly: true });
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '100262738239-agmh7d6rkaficdvrfm2nbfbilne5m8k9.apps.googleusercontent.com';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const FREE_GEMINI_API_KEY = process.env.FREE_GEMINI_API_KEY || 'b47d1cafc545b36030c5198d07fbfd2f';
const KIE_GEMINI_BASE_URL = process.env.KIE_GEMINI_BASE_URL || 'https://api.kie.ai';
const FREE_AI_CHAT_LEVELS = new Set(['A1', 'A2']);

// ── OneSender (WhatsApp) ──────────────────────────────────
const ONESENDER_URL = process.env.ONESENDER_URL || '';
const ONESENDER_KEY = requiredEnv('ONESENDER_KEY', { productionOnly: true });
const ONESENDER_ADMIN_PHONE = process.env.ONESENDER_ADMIN_PHONE || '';

const corsOrigins = csvEnv('CORS_ORIGINS', [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:5173',
]);

function normalizeWaPhone(phone) {
  if (!phone) return '';
  let digits = String(phone).replace(/\D/g, '');
  if (digits.startsWith('0')) digits = '62' + digits.slice(1);
  if (digits.startsWith('620')) digits = '62' + digits.slice(3);
  if (!digits.startsWith('62')) digits = '62' + digits;
  return digits;
}

async function sendWhatsApp({ to, message }) {
  const recipient = normalizeWaPhone(to);
  if (!recipient) return { sent: false, reason: 'no recipient' };
  if (!ONESENDER_URL || !ONESENDER_KEY) return { sent: false, reason: 'whatsapp provider is not configured' };
  try {
    const res = await fetch(ONESENDER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ONESENDER_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        recipient_type: 'individual',
        to: recipient,
        type: 'text',
        text: { body: message },
      }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      console.error('[onesender] failed:', res.status, data);
      return { sent: false, status: res.status, data };
    }
    return { sent: true, data };
  } catch (err) {
    console.error('[onesender] error:', err.message);
    return { sent: false, error: err.message };
  }
}

function buildOrderWaText(order, audience) {
  const a = order.shipping_address || {};
  const m = order.shipping_method || {};
  const items = Array.isArray(order.items) ? order.items : [];
  const lines = [];
  if (audience === 'admin') {
    lines.push(`🛎️ *ORDER BARU* ${order.id}`);
    lines.push(`Customer: ${order.customer_name} (${order.customer_email})`);
    if (a.phone) lines.push(`HP: ${a.phone}`);
  } else {
    lines.push(`Halo *${a.fullName || order.customer_name}*,`);
    lines.push(`Terima kasih atas pesananmu di Fluently Shop! 🎉`);
    lines.push(`No. Order: *${order.id}*`);
  }
  lines.push('');
  lines.push('*Rincian Pesanan:*');
  for (const it of items) {
    lines.push(`• ${it.title || it.productId} ×${it.quantity || 1} — ${rupiah((it.price || 0) * (it.quantity || 1))}`);
  }
  lines.push('');
  lines.push(`Subtotal: ${rupiah(order.subtotal)}`);
  lines.push(`Ongkir (${m.name || '-'}): ${rupiah(order.shipping_cost)}`);
  if (Number(order.payment_fee) > 0) lines.push(`Kode unik: ${rupiah(order.payment_fee)}`);
  lines.push(`*Total: ${rupiah(order.total)}*`);
  if (a.address) {
    lines.push('');
    lines.push('*Alamat Kirim:*');
    lines.push(`${a.address}, ${a.district || ''}, ${a.city || ''}, ${a.province || ''} ${a.postalCode || ''}`);
  }
  if (audience === 'customer') {
    lines.push('');
    lines.push('💳 *Pembayaran QRIS*');
    lines.push(`Scan QR di halaman checkout dan bayar tepat *${rupiah(order.total)}*.`);
    lines.push(`QR: ${QRIS_IMAGE_URL}`);
    lines.push('');
    lines.push('Setelah membayar, kirim bukti transfer ke nomor ini ya. Admin akan memverifikasi & mengirim akses/produk.');
  } else {
    lines.push('');
    lines.push(`Status: *${order.payment_status || 'unpaid'}* · ${order.status || 'pending'}`);
    lines.push('Mohon verifikasi pembayaran QRIS & proses order.');
  }
  return lines.join('\n');
}

// ── Mailer ────────────────────────────────────────────────
let mailer = null;
if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  mailer = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false') === 'true',
    requireTLS: String(process.env.SMTP_REQUIRE_TLS || 'false') === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

const outboxDir = path.join(__dirname, '.outbox');
if (!fs.existsSync(outboxDir)) fs.mkdirSync(outboxDir, { recursive: true });

async function sendEmail({ to, subject, html, text, attachments }) {
  const fromName = process.env.SMTP_FROM_NAME || 'Fluently Shop';
  const fromAddr = process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@fluently.local';
  const from = `"${fromName}" <${fromAddr}>`;
  if (mailer) {
    try {
      const info = await mailer.sendMail({ from, to, subject, html, text, attachments });
      return { sent: true, messageId: info.messageId };
    } catch (err) {
      console.error('[email] send failed:', err.message);
    }
  }
  // Fallback: write outbox file so user can verify content even without SMTP credentials.
  const file = path.join(outboxDir, `${Date.now()}-${String(to).replace(/[^a-zA-Z0-9]/g, '_')}.html`);
  fs.writeFileSync(file, `<!-- to: ${to}\n     subject: ${subject} -->\n\n${html}`);
  console.log(`[email] outbox written: ${file}`);
  return { sent: false, file };
}

function rupiah(n) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(n) || 0);
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function buildWelcomeEmailHtml(user) {
  const firstName = user.display_name || user.name || 'Learner';
  const appUrl = PUBLIC_APP_URL.replace(/\/$/, '');
  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#f1f5f9;margin:0;padding:24px">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden">
      <div style="background:#0F8DCC;color:white;padding:22px 24px">
        <p style="margin:0 0 6px;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;opacity:.8">Welcome to Fluently</p>
        <h1 style="margin:0;font-size:24px;line-height:1.25">Akun kamu sudah aktif</h1>
      </div>
      <div style="padding:22px 24px;color:#334155">
        <p style="margin:0 0 12px;font-size:15px;line-height:1.7">Hai ${escapeHtml(firstName)}, terima kasih sudah daftar di Fluently.</p>
        <p style="margin:0 0 18px;font-size:14px;line-height:1.7">Kamu bisa mulai latihan bahasa, ngobrol dengan AI tutor, mengikuti modul, dan menyimpan progres belajar dari dashboard.</p>
        <p style="text-align:center;margin:24px 0">
          <a href="${appUrl}" style="display:inline-block;background:#0F8DCC;color:#fff;font-weight:800;padding:12px 22px;border-radius:12px;text-decoration:none">Mulai Belajar</a>
        </p>
        <p style="margin:18px 0 0;font-size:12px;line-height:1.7;color:#64748b">Kalau kamu butuh bantuan, balas email ini atau hubungi support Fluently.</p>
      </div>
    </div>
  </body></html>`;
}

function buildToeflCompletionEmailHtml({ user, testName, totalScore, sections, submittedAt }) {
  const name = user.display_name || user.name || 'Learner';
  const sectionRows = sections.map((section) => `
    <tr>
      <td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-weight:800">${escapeHtml(section.title)}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;color:#475569;text-align:center">${Number(section.raw)}/${Number(section.total)}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;color:#0F8DCC;text-align:right;font-weight:900">${Number(section.scaled)}</td>
    </tr>`).join('');
  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#f1f5f9;margin:0;padding:24px">
    <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#0D2B55,#1E6F9F);color:white;padding:24px">
        <p style="margin:0 0 8px;font-size:12px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:#bae6fd">TOEFL Practice Completed</p>
        <h1 style="margin:0;font-size:25px;line-height:1.25">Selamat, ${escapeHtml(name)}!</h1>
        <p style="margin:8px 0 0;color:#dbeafe;font-size:14px;line-height:1.6">Kamu sudah menyelesaikan ${escapeHtml(testName)}.</p>
      </div>
      <div style="padding:24px">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:16px;padding:18px;text-align:center">
          <p style="margin:0;color:#64748b;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.12em">Estimated TOEFL PBT Score</p>
          <p style="margin:6px 0 0;color:#0D2B55;font-size:44px;line-height:1;font-weight:950">${Number(totalScore)}</p>
          <p style="margin:8px 0 0;color:#64748b;font-size:12px">Submitted: ${new Date(submittedAt || Date.now()).toLocaleString('id-ID')}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-top:18px;font-size:13px">
          <thead>
            <tr style="background:#f8fafc;color:#64748b">
              <th align="left" style="padding:9px 8px;border-bottom:1px solid #e2e8f0">Section</th>
              <th style="padding:9px 8px;border-bottom:1px solid #e2e8f0">Correct</th>
              <th align="right" style="padding:9px 8px;border-bottom:1px solid #e2e8f0">Scaled</th>
            </tr>
          </thead>
          <tbody>${sectionRows}</tbody>
        </table>
        <p style="margin:18px 0 0;color:#475569;font-size:14px;line-height:1.7">Sertifikat PDF kamu terlampir di email ini. Simpan sebagai bukti penyelesaian simulasi TOEFL di Fluently.</p>
        <p style="margin:10px 0 0;color:#94a3b8;font-size:11px;line-height:1.6">Catatan: skor ini adalah estimasi dari practice test dan bukan official ETS TOEFL® score report.</p>
      </div>
    </div>
  </body></html>`;
}

function buildOrderEmailHtml(order, audience) {
  const a = order.shipping_address || {};
  const m = order.shipping_method || {};
  const items = Array.isArray(order.items) ? order.items : [];
  const itemRows = items.map((it) => `
    <tr>
      <td style="padding:8px 6px;border-bottom:1px solid #eee">${escapeHtml(it.title || it.productId)}</td>
      <td style="padding:8px 6px;border-bottom:1px solid #eee;text-align:center">×${it.quantity || 1}</td>
      <td style="padding:8px 6px;border-bottom:1px solid #eee;text-align:right">${rupiah((it.price || 0) * (it.quantity || 1))}</td>
    </tr>`).join('');
  const addressBlock = a && a.address ? `
    <p style="margin:4px 0 0;color:#475569;font-size:13px;line-height:1.6">
      ${escapeHtml(a.address)}<br>
      ${escapeHtml(a.district)}, ${escapeHtml(a.city)}, ${escapeHtml(a.province)} ${escapeHtml(a.postalCode || '')}
    </p>` : '';
  const greeting = audience === 'admin'
    ? `<h2 style="margin:0 0 4px;color:#0f172a">Order baru masuk · ${escapeHtml(order.id)}</h2>
       <p style="margin:0;color:#475569;font-size:13px">Pelanggan menunggu konfirmasi pembayaran QRIS.</p>`
    : `<h2 style="margin:0 0 4px;color:#0f172a">Terima kasih atas pesananmu, ${escapeHtml(a.fullName || order.customer_name || '')}!</h2>
       <p style="margin:0;color:#475569;font-size:13px">Berikut rincian pesananmu. Selesaikan pembayaran via QRIS untuk diproses.</p>`;
  const qrisBlock = `
    <div style="background:#f8fafc;border:1px dashed #94a3b8;border-radius:12px;padding:16px;text-align:center">
      <p style="margin:0 0 8px;font-weight:800;color:#0f172a">Scan QRIS untuk Pembayaran</p>
      <img src="${QRIS_IMAGE_URL}" alt="QRIS" style="max-width:240px;border-radius:8px"/>
      <p style="margin:8px 0 0;font-size:12px;color:#475569">Total: <b>${rupiah(order.total)}</b></p>
      ${Number(order.payment_fee) > 0 ? `<p style="margin:4px 0 0;font-size:11px;color:#64748b">Termasuk kode unik ${rupiah(order.payment_fee)} untuk verifikasi.</p>` : ''}
    </div>`;
  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#f1f5f9;margin:0;padding:24px">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:20px">
      ${greeting}
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:14px 0"/>
      <p style="margin:0;color:#0f172a;font-weight:800">Order ${escapeHtml(order.id)}</p>
      <p style="margin:2px 0 12px;color:#64748b;font-size:12px">${new Date(order.created_at || Date.now()).toLocaleString('id-ID')}</p>
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="background:#f8fafc;color:#475569">
          <th align="left" style="padding:8px 6px">Produk</th>
          <th style="padding:8px 6px;width:60px">Qty</th>
          <th align="right" style="padding:8px 6px;width:100px">Subtotal</th>
        </tr></thead>
        <tbody>${itemRows}</tbody>
      </table>
      <table style="width:100%;margin-top:12px;font-size:13px">
        <tr><td style="color:#64748b;padding:3px 0">Subtotal</td><td align="right" style="padding:3px 0">${rupiah(order.subtotal)}</td></tr>
        <tr><td style="color:#64748b;padding:3px 0">Ongkir (${escapeHtml(m.name || '-')})</td><td align="right" style="padding:3px 0">${rupiah(order.shipping_cost)}</td></tr>
        ${Number(order.payment_fee) > 0 ? `<tr><td style="color:#64748b;padding:3px 0">Kode unik</td><td align="right" style="padding:3px 0">${rupiah(order.payment_fee)}</td></tr>` : ''}
        <tr><td style="border-top:1px solid #e2e8f0;padding-top:8px;font-weight:800">Total</td><td align="right" style="border-top:1px solid #e2e8f0;padding-top:8px;font-weight:800;color:#0891B2">${rupiah(order.total)}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:14px 0"/>
      <p style="margin:0;color:#0f172a;font-weight:800">Pengiriman</p>
      <p style="margin:4px 0 0;color:#475569;font-size:13px">${escapeHtml(a.fullName || '')} · ${escapeHtml(a.phone || '')}<br>${escapeHtml(a.email || order.customer_email || '')}</p>
      ${addressBlock}
      <p style="margin:8px 0 0;font-size:12px;color:#0891B2;font-weight:800">${escapeHtml(m.name || '')} ${m.eta ? '· ' + escapeHtml(m.eta) : ''}</p>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:14px 0"/>
      ${qrisBlock}
      <p style="margin:14px 0 0;font-size:11px;color:#94a3b8;text-align:center">Email otomatis · Fluently Shop</p>
    </div>
  </body></html>`;
}

const pool = new Pool({
  host: requiredEnv('DB_HOST', { productionOnly: true }) || process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: requiredEnv('DB_NAME', { productionOnly: true }) || process.env.DB_NAME,
  user: requiredEnv('DB_USER', { productionOnly: true }) || process.env.DB_USER,
  password: requiredEnv('DB_PASSWORD', { productionOnly: true }) || process.env.DB_PASSWORD,
});

app.use(cors({
  origin: corsOrigins,
  credentials: true,
}));

// ── Security headers ──────────────────────────────────────
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '0'); // modern browsers ignore this; rely on CSP instead
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Microphone stays enabled for same-origin pages: speaking & pronunciation lessons use speech recognition.
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(self), geolocation=()');
  if (isProduction) {
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }
  next();
});

app.use(express.json({ limit: '512kb' }));

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

// ── Rate limiters ─────────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts, please try again in a few minutes.' },
});

const resetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many password reset attempts, try again later.' },
});

const supportLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many support requests, please try again in a few minutes.' },
});

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many AI requests, please slow down for a moment.' },
});

const xpLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Terlalu banyak permintaan XP, coba lagi sebentar.' },
});

const progressLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Terlalu banyak sinkronisasi progres, coba lagi sebentar.' },
});

async function ensureSchema() {
  await pool.query(`
    create table if not exists users (
      id serial primary key,
      name text not null,
      email text not null unique,
      password_hash text not null,
      created_at timestamptz not null default now()
    )
  `);
  await pool.query('create index if not exists users_email_lower_idx on users (lower(email))');
  await pool.query(`alter table users add column if not exists persona jsonb not null default '{}'::jsonb`);
  await pool.query(`alter table users add column if not exists onboarding_completed boolean not null default false`);
  await pool.query(`alter table users add column if not exists updated_at timestamptz not null default now()`);
  await pool.query(`alter table users add column if not exists role text not null default 'user'`);
  await pool.query(`alter table users add column if not exists plan text not null default 'free'`);
  await pool.query(`alter table users add column if not exists plan_expires_at timestamptz`);
  await pool.query(`alter table users add column if not exists status text not null default 'active'`);
  await pool.query(`alter table users add column if not exists last_login_at timestamptz`);
  await pool.query(`alter table users add column if not exists display_name text`);
  await pool.query(`alter table users add column if not exists avatar_url text`);
  await pool.query(`alter table users add column if not exists phone text`);
  await pool.query(`alter table users add column if not exists auth_provider text not null default 'password'`);
  await pool.query(`alter table users add column if not exists google_sub text`);
  await pool.query(`alter table users add column if not exists xp integer not null default 0`);
  await pool.query(`alter table users add column if not exists streak integer not null default 0`);
  await pool.query(`alter table users add column if not exists level integer not null default 1`);
  await pool.query(`create unique index if not exists users_google_sub_uidx on users (google_sub) where google_sub is not null`);
  await pool.query(`alter table users drop constraint if exists users_plan_check`);
  await pool.query(`alter table users add constraint users_role_check check (role in ('user', 'admin')) not valid`).catch(() => {});
  await pool.query(`alter table users add constraint users_plan_check check (plan in ('free', 'pro', 'lifetime')) not valid`).catch(() => {});
  await pool.query(`alter table users add constraint users_status_check check (status in ('active', 'suspended')) not valid`).catch(() => {});
  await pool.query(`alter table users add constraint users_auth_provider_check check (auth_provider in ('password', 'google', 'password_google')) not valid`).catch(() => {});

  await pool.query(`
    create table if not exists shop_products (
      id text primary key,
      data jsonb not null,
      active boolean not null default true,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `);

  await pool.query(`
    create table if not exists shop_orders (
      id text primary key,
      user_id integer references users(id) on delete set null,
      customer_email text not null,
      customer_name text not null,
      status text not null default 'pending',
      payment_status text not null default 'unpaid',
      payment_method text,
      shipping_address jsonb not null default '{}'::jsonb,
      shipping_method jsonb not null default '{}'::jsonb,
      items jsonb not null default '[]'::jsonb,
      subtotal integer not null default 0,
      shipping_cost integer not null default 0,
      payment_fee integer not null default 0,
      total integer not null default 0,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `);
  await pool.query('create index if not exists shop_orders_customer_email_idx on shop_orders (lower(customer_email))');

  await pool.query(`
    create table if not exists password_reset_tokens (
      token_hash text primary key,
      user_id integer not null references users(id) on delete cascade,
      expires_at timestamptz not null,
      used_at timestamptz,
      created_at timestamptz not null default now()
    )
  `);
  await pool.query('create index if not exists password_reset_user_idx on password_reset_tokens (user_id)');

  await pool.query(`
    create table if not exists shop_settings (
      key text primary key,
      value jsonb not null default '{}'::jsonb,
      updated_at timestamptz not null default now()
    )
  `);

  await pool.query(`
    create table if not exists app_settings (
      key text primary key,
      value jsonb not null default '{}'::jsonb,
      updated_at timestamptz not null default now()
    )
  `);

  await pool.query(`
    create table if not exists ai_chat_daily_topics (
      id serial primary key,
      user_id integer references users(id) on delete cascade,
      user_key text not null,
      topic_date text not null,
      mode text not null default 'chat',
      level_id text not null default 'A1',
      topic text not null,
      topic_key text not null,
      created_at timestamptz not null default now()
    )
  `);
  await pool.query('create unique index if not exists ai_chat_daily_topics_user_date_uidx on ai_chat_daily_topics (user_key, topic_date)');

  await pool.query(`
    create table if not exists xp_events (
      id bigserial primary key,
      user_id integer not null references users(id) on delete cascade,
      activity text not null,
      source_key text,
      xp integer not null,
      created_at timestamptz not null default now()
    )
  `);
  await pool.query('create unique index if not exists xp_events_user_source_uidx on xp_events (user_id, source_key) where source_key is not null');
  await pool.query('create index if not exists xp_events_user_created_idx on xp_events (user_id, created_at)');

  await pool.query(`
    create table if not exists lesson_progress (
      user_id integer not null references users(id) on delete cascade,
      item_key text not null,
      completed_at timestamptz not null default now(),
      primary key (user_id, item_key)
    )
  `);

  await seedAdminUser();
  await seedShopProducts();
  await seedShopSettings();
}

const defaultShopSettings = {
  origin: {
    destinationId: 34302,
    label: 'PARE, PARE, KEDIRI, JAWA TIMUR, 64211',
    province: 'JAWA TIMUR',
    city: 'KEDIRI',
    district: 'PARE',
    subdistrict: 'PARE',
    zipCode: '64211',
  },
  sender: {
    name: 'Fluently Shop',
    phone: '0812 0000 0000',
    address: 'Pare, Kediri, Jawa Timur',
  },
  defaultWeightGrams: 500,
  couriers: ['jne', 'pos', 'tiki', 'sicepat', 'jnt'],
  notifyAdminEmail: ORDER_NOTIFY_EMAIL,
  notifyAdminWhatsApp: ONESENDER_ADMIN_PHONE,
};

async function seedShopSettings() {
  const existing = await pool.query("SELECT value FROM shop_settings WHERE key = 'shipping'");
  if (!existing.rows.length) {
    await pool.query(
      `INSERT INTO shop_settings (key, value) VALUES ('shipping', $1::jsonb)`,
      [JSON.stringify(defaultShopSettings)]
    );
    return;
  }
  // Migrate from legacy RajaOngkir-Pro shape to Komerce shape if needed.
  const current = existing.rows[0].value || {};
  const isLegacy = current.origin && (current.origin.originType || current.origin.subdistrictId !== undefined) && !current.origin.destinationId;
  if (isLegacy) {
    await pool.query(
      `UPDATE shop_settings SET value = $1::jsonb, updated_at = now() WHERE key = 'shipping'`,
      [JSON.stringify({ ...defaultShopSettings, sender: { ...defaultShopSettings.sender, ...(current.sender || {}) } })]
    );
  }
}

async function getShopSettings() {
  const result = await pool.query("SELECT value FROM shop_settings WHERE key = 'shipping'");
  return result.rows[0]?.value || defaultShopSettings;
}

function publicUser(user) {
  const email = normalizeEmail(user.email || '');
  const isRootAdmin = email === ADMIN_EMAIL;
  return {
    id: user.id,
    name: user.name,
    email,
    phone: user.phone || '',
    displayName: user.display_name || user.name,
    avatarUrl: user.avatar_url || '',
    xp: Number(user.xp ?? 0),
    streak: Number(user.streak ?? 0),
    level: Number(user.level ?? 1),
    onboardingCompleted: Boolean(user.onboarding_completed),
    persona: user.persona || {},
    role: isRootAdmin ? 'admin' : (user.role || 'user'),
    plan: isRootAdmin ? 'lifetime' : (user.plan || 'free'),
    planExpiresAt: user.plan_expires_at,
    status: user.status || 'active',
  };
}

function adminUser(user) {
  return {
    ...publicUser(user),
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    lastLoginAt: user.last_login_at,
  };
}

function productPayload(row) {
  return { ...row.data, id: row.id, active: row.active };
}

function normalizeEmail(email = '') {
  return String(email).trim().toLowerCase();
}

function normalizePlanExpiresAt(plan, value) {
  if (plan !== 'pro') return null;
  if (!value) return null;
  const expiresAt = new Date(value);
  if (!Number.isFinite(expiresAt.getTime())) return null;
  return expiresAt.getTime() > Date.now() ? expiresAt.toISOString() : null;
}

function isPhysicalShopProduct(product) {
  if (product?.delivery) return product.delivery === 'physical';
  return product?.type === 'book';
}

function getShopProductVariant(product, variantId) {
  if (!variantId || !Array.isArray(product?.variants)) return null;
  return product.variants.find((variant) => String(variant.id) === String(variantId)) || null;
}

function getShopDiscountPercent(product, plan) {
  if (plan === 'lifetime') {
    if (product?.lifetimeDiscountEnabled) {
      return Math.max(0, Math.min(100, Number(product.lifetimeDiscountPercent || 0)));
    }
    if (product?.proDiscountEnabled) {
      return Math.max(0, Math.min(100, Number(product.proDiscountPercent || 0)));
    }
  }
  if (plan === 'pro' && product?.proDiscountEnabled) {
    return Math.max(0, Math.min(100, Number(product.proDiscountPercent || 0)));
  }
  return 0;
}

function getShopBasePrice(product, variantId) {
  const variant = getShopProductVariant(product, variantId);
  return Number(variant?.price ?? product?.price ?? 0);
}

function getShopUnitPrice(product, variantId, plan) {
  const basePrice = getShopBasePrice(product, variantId);
  const discountPercent = getShopDiscountPercent(product, plan);
  if (discountPercent <= 0) return basePrice;
  return Math.max(0, Math.round(basePrice * (100 - discountPercent) / 100));
}

function getShopItemWeight(product, variantId) {
  const variant = getShopProductVariant(product, variantId);
  return Number(variant?.weightGrams ?? product?.weightGrams ?? 500);
}

function getServerEffectivePlan(user) {
  if (!user) return 'free';
  const email = normalizeEmail(user.email || '');
  if (email === ADMIN_EMAIL || user.plan === 'lifetime') return 'lifetime';
  if (user.plan === 'pro') {
    if (!user.plan_expires_at) return 'pro';
    return new Date(user.plan_expires_at).getTime() > Date.now() ? 'pro' : 'free';
  }
  return 'free';
}

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

async function seedAdminUser() {
  const email = ADMIN_EMAIL;
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);

  if (existing.rows.length) {
    await pool.query(
      `UPDATE users
       SET role = 'admin',
           plan = 'lifetime',
           status = 'active',
           updated_at = now()
       WHERE email = $1`,
      [email]
    );
    return;
  }

  await pool.query(
    `INSERT INTO users (name, email, password_hash, role, plan, status, onboarding_completed)
     VALUES ($1, $2, $3, 'admin', 'lifetime', 'active', true)`,
    ['Wahib Chelsea', email, passwordHash]
  );
}

const initialProducts = [
  {
    id: 'p1',
    type: 'ebook',
    category: 'beginner',
    title: 'English Grammar for Absolute Beginners',
    author: 'Sarah Whitman',
    description: 'A friendly guide that takes learners from zero to confident in 30 days.',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=70&auto=format',
    rating: 4.8,
    reviewCount: 1240,
    price: 49000,
    originalPrice: 99000,
    stock: 999,
    pages: 220,
    language: 'EN / ID',
    level: 'A1 - A2',
    tags: ['Grammar', 'Beginner', 'Self-Study'],
    bestseller: true,
  },
  {
    id: 'p2',
    type: 'ecourse',
    category: 'business',
    title: 'Business English Mastery',
    author: 'David Carter, MBA',
    description: 'Video lessons covering meetings, presentations, negotiations, and email writing.',
    cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=70&auto=format',
    rating: 4.9,
    reviewCount: 856,
    price: 299000,
    originalPrice: 499000,
    stock: 999,
    duration: '12h 45m',
    language: 'EN',
    level: 'B2 - C1',
    tags: ['Business', 'Career', 'Certificate'],
    bestseller: true,
    newRelease: true,
  },
  {
    id: 'p3',
    type: 'book',
    category: 'kids',
    title: 'Fun English Stories for Kids',
    author: 'Emma Bright',
    description: 'Illustrated short stories with vocabulary builders and comprehension questions.',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=70&auto=format',
    rating: 4.7,
    reviewCount: 432,
    price: 125000,
    stock: 47,
    pages: 156,
    language: 'EN',
    level: 'A1',
    tags: ['Kids', 'Stories', 'Illustrated'],
  },
];

async function seedShopProducts() {
  const seeded = await pool.query("SELECT value FROM app_settings WHERE key = 'shop_products_seeded'");
  const count = await pool.query('SELECT COUNT(*)::int AS count FROM shop_products');
  if (count.rows[0].count > 0) {
    await pool.query(
      `INSERT INTO app_settings (key, value)
       VALUES ('shop_products_seeded', '{"seeded": true}'::jsonb)
       ON CONFLICT (key) DO UPDATE SET value = excluded.value, updated_at = now()`
    );
    return;
  }
  if (seeded.rows.length > 0) return;

  for (const product of initialProducts) {
    const { id, active = true, ...data } = product;
    await pool.query(
      `INSERT INTO shop_products (id, data, active)
       VALUES ($1, $2::jsonb, $3)`,
      [id, JSON.stringify(data), active]
    );
  }
  await pool.query(
    `INSERT INTO app_settings (key, value)
     VALUES ('shop_products_seeded', '{"seeded": true}'::jsonb)
     ON CONFLICT (key) DO UPDATE SET value = excluded.value, updated_at = now()`
  );
}

// ── Health check ──────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

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

function resolveAiAccess(req, res) {
  const requestedModel = String(req.body?.model || GEMINI_MODEL).trim();
  const model = requestedModel || GEMINI_MODEL;
  const apiKey = FREE_GEMINI_API_KEY || GEMINI_API_KEY;

  if (!apiKey) {
    res.status(503).json({ error: 'Default Gemini API key is not configured.' });
    return null;
  }

  return { apiKey, model, plan: 'default' };
}

function shouldUseKieGemini(apiKey) {
  const provider = String(process.env.GEMINI_PROVIDER || '').toLowerCase();
  return provider === 'kie' || /^[a-f0-9]{32}$/i.test(String(apiKey || '').trim());
}

async function callGeminiJson({ apiKey, model, prompt, temperature, maxOutputTokens }) {
  if (shouldUseKieGemini(apiKey)) {
    const res = await fetch(`${KIE_GEMINI_BASE_URL.replace(/\/$/, '')}/gemini-2.5-flash/v1/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'gemini-2.5-flash',
        messages: [{ role: 'user', content: prompt }],
        temperature,
        max_tokens: maxOutputTokens,
      }),
    });
    const data = await res.json().catch(() => null);
    const text = data?.choices?.[0]?.message?.content || '';
    return { ok: res.ok, status: res.status, data, text };
  }

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature,
        maxOutputTokens,
        responseMimeType: 'application/json',
      },
    }),
  });
  const data = await res.json().catch(() => null);
  const text = data?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('\n') || '';
  return { ok: res.ok, status: res.status, data, text };
}

// ── AI correction ────────────────────────────────────────
app.post('/api/ai/vocabulary-lesson', aiLimiter, optionalAuth, async (req, res) => {
  const name = String(req.body?.name || 'teman').trim().slice(0, 40);
  const topic = String(req.body?.topic || 'daily life').trim().slice(0, 140);
  const levelId = String(req.body?.levelId || 'a1').trim().slice(0, 8).toUpperCase();
  const allowed = await enforceFreeAiChatTopicLimit(req, res, { topic, levelId, mode: 'vocabulary' });
  if (!allowed) return;

  const access = resolveAiAccess(req, res);
  if (!access) return;
  const { apiKey, model } = access;

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
    const geminiData = await callGeminiJson({ apiKey, model, prompt, temperature: 0.35, maxOutputTokens: 5000 });
    if (!geminiData.ok) {
      console.error('[gemini] vocabulary lesson failed:', geminiData.status, geminiData.data);
      return res.status(502).json({ error: 'AI vocabulary generation failed.' });
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
      return res.status(502).json({ error: 'AI vocabulary generation returned insufficient rows.' });
    }

    return res.json({ model, rows: cleanRows });
  } catch (err) {
    console.error('[gemini] vocabulary lesson error:', err.message);
    return res.status(502).json({ error: 'AI vocabulary generation failed.' });
  }
});

app.post('/api/ai/pronunciation-lesson', aiLimiter, optionalAuth, async (req, res) => {
  const name = String(req.body?.name || 'teman').trim().slice(0, 40);
  const topic = String(req.body?.topic || 'daily conversation').trim().slice(0, 140);
  const levelId = String(req.body?.levelId || 'a1').trim().slice(0, 8).toUpperCase();
  const allowed = await enforceFreeAiChatTopicLimit(req, res, { topic, levelId, mode: 'pronunciation' });
  if (!allowed) return;

  const access = resolveAiAccess(req, res);
  if (!access) return;
  const { apiKey, model } = access;

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
    const geminiData = await callGeminiJson({ apiKey, model, prompt, temperature: 0.35, maxOutputTokens: 4200 });
    if (!geminiData.ok) {
      console.error('[gemini] pronunciation lesson failed:', geminiData.status, geminiData.data);
      return res.status(502).json({ error: 'AI pronunciation generation failed.' });
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
      return res.status(502).json({ error: 'AI pronunciation generation returned insufficient rows.' });
    }

    return res.json({ model, rows: cleanRows });
  } catch (err) {
    console.error('[gemini] pronunciation lesson error:', err.message);
    return res.status(502).json({ error: 'AI pronunciation generation failed.' });
  }
});

app.post('/api/ai/pronunciation-feedback', aiLimiter, optionalAuth, async (req, res) => {
  const access = resolveAiAccess(req, res);
  if (!access) return;
  const { apiKey, model } = access;

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
    const geminiData = await callGeminiJson({ apiKey, model, prompt, temperature: 0.25, maxOutputTokens: 1000 });
    if (!geminiData.ok) {
      console.error('[gemini] pronunciation feedback failed:', geminiData.status, geminiData.data);
      return res.status(502).json({ error: 'AI pronunciation feedback failed.' });
    }

    const parsed = extractJsonObject(geminiData.text);
    if (!parsed || typeof parsed.feedback !== 'string') {
      return res.status(502).json({ error: 'AI pronunciation feedback returned invalid format.' });
    }

    return res.json({ model, feedback: parsed.feedback.slice(0, 4000) });
  } catch (err) {
    console.error('[gemini] pronunciation feedback error:', err.message);
    return res.status(502).json({ error: 'AI pronunciation feedback failed.' });
  }
});

app.post('/api/ai/vocabulary-correction', aiLimiter, optionalAuth, async (req, res) => {
  const access = resolveAiAccess(req, res);
  if (!access) return;
  const { apiKey, model } = access;

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
    const geminiData = await callGeminiJson({ apiKey, model, prompt, temperature: 0.25, maxOutputTokens: 900 });
    if (!geminiData.ok) {
      console.error('[gemini] vocabulary correction failed:', geminiData.status, geminiData.data);
      return res.status(502).json({ error: 'AI correction failed.' });
    }

    const parsed = extractJsonObject(geminiData.text);
    if (!parsed || typeof parsed.feedback !== 'string' || !Array.isArray(parsed.completedWords)) {
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

// ── Public shop settings ──────────────────────────────────
app.get('/api/shop/settings', async (_req, res) => {
  try {
    const settings = await getShopSettings();
    // Public reveals only what the storefront needs.
    res.json({
      origin: settings.origin,
      sender: { name: settings.sender?.name, phone: settings.sender?.phone },
      confirmWhatsApp: settings.notifyAdminWhatsApp || settings.sender?.phone || '',
      defaultWeightGrams: settings.defaultWeightGrams || 500,
      couriers: settings.couriers || [],
      qrisImage: QRIS_IMAGE_URL,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── RajaOngkir (Komerce) proxy ───────────────────────────
async function komerceRequest(pathname, { method = 'GET', searchParams = null, body = null } = {}) {
  const url = new URL(`${RAJAONGKIR_BASE}${pathname}`);
  if (searchParams) {
    for (const [k, v] of Object.entries(searchParams)) {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
    }
  }
  const headers = { key: RAJAONGKIR_KEY, accept: 'application/json' };
  let payload = null;
  if (body) {
    headers['content-type'] = 'application/x-www-form-urlencoded';
    payload = new URLSearchParams(body).toString();
  }
  const res = await fetch(url.toString(), { method, headers, body: payload });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data || data.meta?.status !== 'success') {
    const msg = data?.meta?.message || `RajaOngkir error (HTTP ${res.status})`;
    const error = new Error(msg);
    error.status = data?.meta?.code || res.status;
    throw error;
  }
  return data.data;
}

// Search-as-you-type destination (province/city/district/subdistrict + zipcode in one row).
app.get('/api/shop/rajaongkir/search', async (req, res) => {
  const keyword = String(req.query.keyword || '').trim();
  if (keyword.length < 3) return res.json({ results: [] });
  try {
    const results = await komerceRequest('/destination/domestic-destination', {
      searchParams: { search: keyword, limit: 12, offset: 0 },
    });
    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/shop/rajaongkir/cost', async (req, res) => {
  const { destination, weight, courier } = req.body || {};
  if (!destination || !weight || !courier) {
    return res.status(400).json({ error: 'destination, weight, courier are required' });
  }
  try {
    const settings = await getShopSettings();
    const originId = settings.origin?.destinationId;
    if (!originId) {
      return res.status(400).json({ error: 'Origin location belum dikonfigurasi admin.' });
    }
    const results = await komerceRequest('/calculate/domestic-cost', {
      method: 'POST',
      body: {
        origin: originId,
        destination,
        weight,
        courier,
      },
    });
    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Public shop ───────────────────────────────────────────
app.get('/api/shop/products', async (_req, res) => {
  try {
    res.set('Cache-Control', 'no-store');
    const result = await pool.query('SELECT id, data, active FROM shop_products WHERE active = true ORDER BY created_at ASC');
    res.json({ products: result.rows.map(productPayload) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/shop/products/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, data, active FROM shop_products WHERE id = $1 AND active = true', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Product not found' });
    res.json({ product: productPayload(result.rows[0]) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/shop/orders', optionalAuth, async (req, res) => {
  const {
    customerEmail,
    customerName,
    items,
    shippingAddress,
    shippingMethod,
    paymentMethod,
    paymentFee = 0,
  } = req.body;

  if (!customerEmail || !customerName || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order customer and items are required' });
  }

  const normalizedCustomerEmail = normalizeEmail(customerEmail);
  if (!/.+@.+\..+/.test(normalizedCustomerEmail)) {
    return res.status(400).json({ error: 'Customer email tidak valid' });
  }

  if (paymentMethod && paymentMethod !== 'qris') {
    return res.status(400).json({ error: 'Payment method tidak didukung' });
  }

  const safePaymentFee = Number(paymentFee);
  if (!Number.isInteger(safePaymentFee) || safePaymentFee < 100 || safePaymentFee > 999) {
    return res.status(400).json({ error: 'Kode unik pembayaran tidak valid' });
  }

  // Validate items structure
  for (const it of items) {
    if (!it.productId || !Number.isInteger(Number(it.quantity)) || Number(it.quantity) < 1 || Number(it.quantity) > 99) {
      return res.status(400).json({ error: 'Setiap item harus punya productId dan quantity valid' });
    }
  }

  // Fetch authoritative prices from DB — never trust client-submitted prices
  const productIds = [...new Set(items.map((it) => it.productId))];
  const productRows = await pool.query(
    `SELECT id, data FROM shop_products WHERE id = ANY($1) AND active = true`,
    [productIds],
  ).catch(() => ({ rows: [] }));
  const productMap = new Map();
  for (const row of productRows.rows) {
    productMap.set(row.id, { ...row.data, id: row.id });
  }

  // Verify all products exist and build enriched items with server-side price.
  const plan = getServerEffectivePlan(req.user);
  const enrichedItems = [];
  let hasPhysicalItem = false;
  let totalWeight = 0;
  for (const it of items) {
    const product = productMap.get(it.productId);
    if (!product) {
      return res.status(400).json({ error: `Produk ${it.productId} tidak ditemukan atau sudah tidak aktif` });
    }

    const variant = getShopProductVariant(product, it.variantId);
    const quantity = Number(it.quantity);
    const originalPrice = getShopBasePrice(product, it.variantId);
    const price = getShopUnitPrice(product, it.variantId, plan);
    const memberDiscountPercent = getShopDiscountPercent(product, plan);
    if (isPhysicalShopProduct(product)) {
      hasPhysicalItem = true;
      totalWeight += getShopItemWeight(product, it.variantId) * quantity;
    }

    enrichedItems.push({
      productId: product.id,
      variantId: it.variantId || undefined,
      variantName: variant?.name || '',
      title: product.title,
      price,
      originalPrice,
      memberDiscountPercent,
      quantity,
    });
  }

  const subtotal = enrichedItems.reduce((sum, it) => sum + it.price * Number(it.quantity), 0);
  let verifiedShippingMethod = null;
  let verifiedShippingCost = 0;

  if (hasPhysicalItem) {
    const destination = Number(shippingAddress?.districtId);
    const requestedShippingId = String(shippingMethod?.id || '').trim();
    const [requestedCourier, ...serviceParts] = requestedShippingId.split('-');
    const requestedService = serviceParts.join('-');
    if (!destination || !requestedCourier || !requestedService) {
      return res.status(400).json({ error: 'Metode pengiriman tidak valid atau sudah kedaluwarsa' });
    }

    try {
      const settings = await getShopSettings();
      const originId = settings.origin?.destinationId;
      if (!originId) {
        return res.status(400).json({ error: 'Origin location belum dikonfigurasi admin.' });
      }
      const allowedCouriers = Array.isArray(settings.couriers) ? settings.couriers : [];
      if (allowedCouriers.length && !allowedCouriers.includes(requestedCourier)) {
        return res.status(400).json({ error: 'Kurir tidak tersedia' });
      }
      const shippingRows = await komerceRequest('/calculate/domestic-cost', {
        method: 'POST',
        body: {
          origin: originId,
          destination,
          weight: Math.max(totalWeight, 1000),
          courier: requestedCourier,
        },
      });
      const matched = (Array.isArray(shippingRows) ? shippingRows : []).find((row) =>
        String(row.code || '').toLowerCase() === requestedCourier.toLowerCase() &&
        String(row.service || '') === requestedService
      );
      if (!matched) {
        return res.status(400).json({ error: 'Layanan pengiriman tidak tersedia lagi. Hitung ulang ongkir.' });
      }
      verifiedShippingCost = Number(matched.cost || 0);
      verifiedShippingMethod = {
        id: `${String(matched.code || requestedCourier).toLowerCase()}-${matched.service}`,
        name: `${String(matched.code || requestedCourier).toUpperCase()} ${matched.service}`,
        description: matched.description || matched.name || '',
        cost: verifiedShippingCost,
        eta: matched.etd ? `${matched.etd}` : '',
        icon: 'package',
      };
    } catch (err) {
      console.error('[order-shipping-verify]', err.message);
      return res.status(502).json({ error: 'Gagal memverifikasi ongkir. Coba ulangi checkout.' });
    }
  } else {
    verifiedShippingMethod = {
      id: 'instant',
      name: 'Instant Delivery (Digital)',
      description: 'For eBooks & eCourses',
      cost: 0,
      eta: 'Within minutes',
      icon: 'instant',
    };
  }

  const total = subtotal + verifiedShippingCost + safePaymentFee;
  const orderId = `FLY-${Date.now().toString().slice(-8)}`;

  try {
    const result = await pool.query(
      `INSERT INTO shop_orders (
        id, user_id, customer_email, customer_name, payment_method,
        shipping_address, shipping_method, items, subtotal, shipping_cost, payment_fee, total
      )
      VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8::jsonb, $9, $10, $11, $12)
      RETURNING *`,
      [
        orderId,
        req.user?.id || null,
        normalizedCustomerEmail,
        String(customerName).trim().slice(0, 120),
        paymentMethod || 'qris',
        JSON.stringify(shippingAddress || {}),
        JSON.stringify(verifiedShippingMethod),
        JSON.stringify(enrichedItems),
        Number(subtotal),
        verifiedShippingCost,
        safePaymentFee,
        total,
      ]
    );

    const order = result.rows[0];

    // Send order detail notifications (email + WhatsApp via OneSender) — fire and forget.
    (async () => {
      try {
        const settings = await getShopSettings().catch(() => ({}));
        const adminEmail = settings.notifyAdminEmail || ORDER_NOTIFY_EMAIL;
        const adminWa = settings.notifyAdminWhatsApp || ONESENDER_ADMIN_PHONE;
        const customerPhone = order.shipping_address?.phone || '';

        await Promise.all([
          sendEmail({
            to: order.customer_email,
            subject: `Rincian Pesanan ${order.id} · Fluently Shop`,
            html: buildOrderEmailHtml(order, 'customer'),
          }),
          sendEmail({
            to: adminEmail,
            subject: `[Order Baru] ${order.id} · ${order.customer_name}`,
            html: buildOrderEmailHtml(order, 'admin'),
          }),
          customerPhone ? sendWhatsApp({
            to: customerPhone,
            message: buildOrderWaText(order, 'customer'),
          }) : Promise.resolve({ sent: false, reason: 'no customer phone' }),
          adminWa ? sendWhatsApp({
            to: adminWa,
            message: buildOrderWaText(order, 'admin'),
          }) : Promise.resolve({ sent: false, reason: 'no admin wa' }),
        ]);
      } catch (err) {
        console.error('[order-notify]', err.message);
      }
    })();

    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── Admin ─────────────────────────────────────────────────
app.get('/api/admin/summary', requireAdmin, async (_req, res) => {
  try {
    const [users, proUsers, products, orders, revenue] = await Promise.all([
      pool.query('SELECT COUNT(*)::int AS count FROM users'),
      pool.query("SELECT COUNT(*)::int AS count FROM users WHERE plan in ('pro', 'lifetime')"),
      pool.query('SELECT COUNT(*)::int AS count FROM shop_products WHERE active = true'),
      pool.query('SELECT COUNT(*)::int AS count FROM shop_orders'),
      pool.query("SELECT COALESCE(SUM(total), 0)::int AS total FROM shop_orders WHERE payment_status = 'paid'"),
    ]);

    res.json({
      users: users.rows[0].count,
      proUsers: proUsers.rows[0].count,
      products: products.rows[0].count,
      orders: orders.rows[0].count,
      paidRevenue: revenue.rows[0].total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/admin/users', requireAdmin, async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, phone, role, plan, plan_expires_at, status, onboarding_completed, persona, created_at, updated_at, last_login_at
       FROM users
       ORDER BY created_at DESC`
    );
    res.json({ users: result.rows.map(adminUser) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.patch('/api/admin/users/:id', requireAdmin, async (req, res) => {
  const { name, role, plan, status, planExpiresAt } = req.body || {};
  const hasOwn = (key) => Object.prototype.hasOwnProperty.call(req.body || {}, key);
  const validRoles = new Set(['user', 'admin']);
  const validPlans = new Set(['free', 'pro', 'lifetime']);
  const validStatuses = new Set(['active', 'suspended']);

  if (hasOwn('role') && !validRoles.has(role)) {
    return res.status(400).json({ error: 'Role tidak valid' });
  }
  if (hasOwn('plan') && !validPlans.has(plan)) {
    return res.status(400).json({ error: 'Plan tidak valid' });
  }
  if (hasOwn('status') && !validStatuses.has(status)) {
    return res.status(400).json({ error: 'Status tidak valid' });
  }

  try {
    const currentResult = await pool.query(
      `SELECT id, name, role, plan, status, plan_expires_at
         FROM users
        WHERE id = $1`,
      [req.params.id],
    );

    if (!currentResult.rows.length) return res.status(404).json({ error: 'User not found' });

    const current = currentResult.rows[0];
    const safeName = hasOwn('name') ? (String(name || '').trim() || current.name) : current.name;
    const safeRole = hasOwn('role') ? role : (current.role || 'user');
    const safePlan = hasOwn('plan') ? plan : (current.plan || 'free');
    const safeStatus = hasOwn('status') ? status : (current.status || 'active');
    const safePlanExpiresAt = (hasOwn('plan') || hasOwn('planExpiresAt'))
      ? normalizePlanExpiresAt(safePlan, planExpiresAt)
      : current.plan_expires_at;

    const result = await pool.query(
      `UPDATE users
       SET name = $1,
           role = $2,
           plan = $3,
           status = $4,
           plan_expires_at = $5,
           updated_at = now()
       WHERE id = $6
       RETURNING id, name, email, phone, role, plan, plan_expires_at, status, onboarding_completed, persona, created_at, updated_at, last_login_at`,
      [safeName, safeRole, safePlan, safeStatus, safePlanExpiresAt, req.params.id]
    );

    res.json({ success: true, user: adminUser(result.rows[0]) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/admin/shop/products', requireAdmin, async (_req, res) => {
  try {
    res.set('Cache-Control', 'no-store');
    const result = await pool.query('SELECT id, data, active FROM shop_products ORDER BY updated_at DESC');
    res.json({ products: result.rows.map(productPayload) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/admin/shop/products', requireAdmin, async (req, res) => {
  const { id, active = true, ...data } = req.body;
  if (!id || !data.title || !data.price) return res.status(400).json({ error: 'Product id, title, and price are required' });

  try {
    const result = await pool.query(
      `INSERT INTO shop_products (id, data, active)
       VALUES ($1, $2::jsonb, $3)
       ON CONFLICT (id) DO UPDATE SET data = excluded.data, active = excluded.active, updated_at = now()
       RETURNING id, data, active`,
      [id, JSON.stringify(data), Boolean(active)]
    );
    res.json({ success: true, product: productPayload(result.rows[0]) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.patch('/api/admin/shop/products/:id', requireAdmin, async (req, res) => {
  const { active, ...patch } = req.body;

  try {
    const current = await pool.query('SELECT id, data, active FROM shop_products WHERE id = $1', [req.params.id]);
    if (!current.rows.length) return res.status(404).json({ error: 'Product not found' });

    const nextData = { ...current.rows[0].data, ...patch };
    const result = await pool.query(
      `UPDATE shop_products
       SET data = $1::jsonb,
           active = COALESCE($2, active),
           updated_at = now()
       WHERE id = $3
       RETURNING id, data, active`,
      [JSON.stringify(nextData), typeof active === 'boolean' ? active : null, req.params.id]
    );
    res.json({ success: true, product: productPayload(result.rows[0]) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/admin/shop/products/:id', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM shop_products WHERE id = $1 RETURNING id, data, active',
      [req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true, product: productPayload(result.rows[0]) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/admin/shop/orders', requireAdmin, async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM shop_orders ORDER BY created_at DESC');
    res.json({ orders: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/admin/shop/settings', requireAdmin, async (_req, res) => {
  try {
    const settings = await getShopSettings();
    res.json({ settings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/admin/shop/settings', requireAdmin, async (req, res) => {
  const next = { ...defaultShopSettings, ...(req.body || {}) };
  try {
    const result = await pool.query(
      `INSERT INTO shop_settings (key, value, updated_at)
       VALUES ('shipping', $1::jsonb, now())
       ON CONFLICT (key) DO UPDATE SET value = excluded.value, updated_at = now()
       RETURNING value`,
      [JSON.stringify(next)]
    );
    res.json({ success: true, settings: result.rows[0].value });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.patch('/api/admin/shop/orders/:id', requireAdmin, async (req, res) => {
  const { status, paymentStatus } = req.body;

  try {
    const result = await pool.query(
      `UPDATE shop_orders
       SET status = COALESCE($1, status),
           payment_status = COALESCE($2, payment_status),
           updated_at = now()
       WHERE id = $3
       RETURNING *`,
      [status || null, paymentStatus || null, req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Order not found' });
    res.json({ success: true, order: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── Production static app with cache headers ──────────────
const clientDistDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(clientDistDir)) {
  app.use('/assets', express.static(path.join(clientDistDir, 'assets'), {
    immutable: true,
    maxAge: '1y',
  }));

  app.use(express.static(clientDistDir, {
    maxAge: '1h',
    setHeaders(res, filePath) {
      const filename = path.basename(filePath);
      if (filename === 'index.html' || filename === 'sw.js' || filename.endsWith('.webmanifest')) {
        res.setHeader('Cache-Control', 'no-cache');
        return;
      }
      if (/\.(?:png|jpg|jpeg|webp|gif|svg|ico|woff2?|ttf|otf)$/i.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=2592000, stale-while-revalidate=86400');
      }
    },
  }));

  app.get('*', (_req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.sendFile(path.join(clientDistDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Fluently API running on http://localhost:${PORT}`);
  ensureSchema()
    .then(() => pool.query('SELECT NOW()'))
    .then(() => console.log('PostgreSQL connected'))
    .then(async () => {
      if (!mailer) return;
      await mailer.verify();
      console.log('SMTP connected');
    })
    .catch((err) => {
      console.error(err);
      if (isProduction) process.exit(1);
    });
});
