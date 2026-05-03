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
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  mailer = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false') === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

const outboxDir = path.join(__dirname, '.outbox');
if (!fs.existsSync(outboxDir)) fs.mkdirSync(outboxDir, { recursive: true });

async function sendEmail({ to, subject, html, text }) {
  const fromName = process.env.SMTP_FROM_NAME || 'Fluently Shop';
  const fromAddr = process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@fluently.local';
  const from = `"${fromName}" <${fromAddr}>`;
  if (mailer) {
    try {
      const info = await mailer.sendMail({ from, to, subject, html, text });
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
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
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
      'SELECT id, name, email, role, plan, plan_expires_at, status, persona, onboarding_completed, display_name, avatar_url, xp, streak, level FROM users WHERE id = $1',
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

function requireAdmin(req, res, next) {
  return requireAuth(req, res, () => {
    if (req.user.role !== 'admin' && req.user.email !== ADMIN_EMAIL) {
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
  await pool.query(`alter table users add column if not exists xp integer not null default 0`);
  await pool.query(`alter table users add column if not exists streak integer not null default 0`);
  await pool.query(`alter table users add column if not exists level integer not null default 1`);
  await pool.query(`alter table users drop constraint if exists users_plan_check`);
  await pool.query(`alter table users add constraint users_role_check check (role in ('user', 'admin')) not valid`).catch(() => {});
  await pool.query(`alter table users add constraint users_plan_check check (plan in ('free', 'pro', 'lifetime')) not valid`).catch(() => {});
  await pool.query(`alter table users add constraint users_status_check check (status in ('active', 'suspended')) not valid`).catch(() => {});

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
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    displayName: user.display_name || user.name,
    avatarUrl: user.avatar_url || '',
    xp: Number(user.xp ?? 0),
    streak: Number(user.streak ?? 0),
    level: Number(user.level ?? 1),
    onboardingCompleted: Boolean(user.onboarding_completed),
    persona: user.persona || {},
    role: user.role || 'user',
    plan: user.plan || 'free',
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
  const count = await pool.query('SELECT COUNT(*)::int AS count FROM shop_products');
  if (count.rows[0].count > 0) return;

  for (const product of initialProducts) {
    const { id, active = true, ...data } = product;
    await pool.query(
      `INSERT INTO shop_products (id, data, active)
       VALUES ($1, $2::jsonb, $3)`,
      [id, JSON.stringify(data), active]
    );
  }
}

// ── Health check ──────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// ── Register ──────────────────────────────────────────────
app.post('/api/auth/register', authLimiter, async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'All fields required' });
  if (String(password).length < 8)
    return res.status(400).json({ error: 'Password minimal 8 karakter' });

  try {
    const normalized = normalizeEmail(email);
    const exists = await pool.query('SELECT id FROM users WHERE email = $1', [normalized]);
    if (exists.rows.length)
      return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, role, plan, status)
       VALUES ($1, $2, $3, $4, $5, 'active')
       RETURNING id, name, email, onboarding_completed, persona, role, plan, plan_expires_at, status, display_name, avatar_url, xp, streak, level`,
      [name, normalized, passwordHash, normalized === ADMIN_EMAIL ? 'admin' : 'user', normalized === ADMIN_EMAIL ? 'lifetime' : 'free']
    );
    const user = result.rows[0];
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
           avatar_url = COALESCE($2, avatar_url),
           updated_at = now()
       WHERE id = $3
       RETURNING id, name, email, onboarding_completed, persona, role, plan, plan_expires_at, status, display_name, avatar_url, xp, streak, level`,
      [trimmedName, trimmedAvatar, req.user.id],
    );
    res.json({ success: true, user: publicUser(result.rows[0]) });
  } catch (err) {
    console.error('[profile-update]', err);
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
       RETURNING id, name, email, onboarding_completed, persona, role, plan, plan_expires_at, status, display_name, avatar_url, xp, streak, level`,
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
// POST /api/users/xp  { xp: number, activity: string }
// XP per level = 3000. Level increments automatically.
const XP_PER_LEVEL = 3000;

app.post('/api/users/xp', requireAuth, async (req, res) => {
  const rawXp = Number(req.body?.xp);
  if (!rawXp || rawXp <= 0 || rawXp > 1000) {
    return res.status(400).json({ error: 'xp harus antara 1–1000' });
  }

  try {
    // Use DB time to decide streak: if last activity was yesterday → continue streak,
    // if today → no change, if older → reset to 1.
    const result = await pool.query(
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
       RETURNING id, name, email, onboarding_completed, persona, role, plan, plan_expires_at,
                 status, display_name, avatar_url, xp, streak, level`,
      [rawXp, XP_PER_LEVEL, req.user.id],
    );

    if (!result.rows.length) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true, user: publicUser(result.rows[0]) });
  } catch (err) {
    console.error('[xp-award]', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── Upgrade membership plan ──────────────────────────────
app.post('/api/users/upgrade', requireAuth, async (req, res) => {
  const { plan } = req.body;
  if (!['pro', 'lifetime'].includes(plan))
    return res.status(400).json({ error: 'Valid plan is required' });

  const planExpiresAt = plan === 'pro' ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : null;

  try {
    const result = await pool.query(
      `UPDATE users
       SET plan = $1,
           plan_expires_at = $2,
           updated_at = now()
       WHERE id = $3
       RETURNING id, name, email, onboarding_completed, persona, role, plan, plan_expires_at, status, display_name, avatar_url, xp, streak, level`,
      [plan, planExpiresAt, req.user.id]
    );

    if (!result.rows.length)
      return res.status(404).json({ error: 'User not found' });

    res.json({ success: true, user: publicUser(result.rows[0]) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── Public shop settings ──────────────────────────────────
app.get('/api/shop/settings', async (_req, res) => {
  try {
    const settings = await getShopSettings();
    // Public reveals only what the storefront needs.
    res.json({
      origin: settings.origin,
      sender: { name: settings.sender?.name, phone: settings.sender?.phone },
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

app.post('/api/shop/orders', async (req, res) => {
  const {
    userId,
    customerEmail,
    customerName,
    items,
    shippingAddress,
    shippingMethod,
    paymentMethod,
    shippingCost = 0,
    paymentFee = 0,
  } = req.body;

  if (!customerEmail || !customerName || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order customer and items are required' });
  }

  // Validate items structure
  for (const it of items) {
    if (!it.productId || !Number.isInteger(Number(it.quantity)) || Number(it.quantity) < 1) {
      return res.status(400).json({ error: 'Setiap item harus punya productId dan quantity valid' });
    }
  }

  // Fetch authoritative prices from DB — never trust client-submitted prices
  const productIds = [...new Set(items.map((it) => it.productId))];
  const productRows = await pool.query(
    `SELECT id, data FROM shop_products WHERE id = ANY($1) AND active = true`,
    [productIds],
  ).catch(() => ({ rows: [] }));
  const priceMap = {};
  for (const row of productRows.rows) {
    priceMap[row.id] = Number(row.data?.price || 0);
  }

  // Verify all products exist and build enriched items with server-side price
  const enrichedItems = [];
  for (const it of items) {
    const price = priceMap[it.productId];
    if (price === undefined) {
      return res.status(400).json({ error: `Produk ${it.productId} tidak ditemukan atau sudah tidak aktif` });
    }
    enrichedItems.push({ ...it, price });
  }

  const subtotal = enrichedItems.reduce((sum, it) => sum + it.price * Number(it.quantity), 0);
  const total = subtotal + Number(shippingCost) + Number(paymentFee);
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
        userId || null,
        normalizeEmail(customerEmail),
        customerName,
        paymentMethod || null,
        JSON.stringify(shippingAddress || {}),
        JSON.stringify(shippingMethod || {}),
        JSON.stringify(enrichedItems),
        Number(subtotal),
        Number(shippingCost),
        Number(paymentFee),
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
      `SELECT id, name, email, role, plan, plan_expires_at, status, onboarding_completed, persona, created_at, updated_at, last_login_at
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
    const { name, role, plan, status, planExpiresAt } = req.body;
    const safeRole = role === 'admin' ? 'admin' : 'user';
  const safePlan = ['free', 'pro', 'lifetime'].includes(plan) ? plan : 'free';
  const safeStatus = status === 'suspended' ? 'suspended' : 'active';

  try {
    const result = await pool.query(
      `UPDATE users
       SET name = COALESCE($1, name),
           role = $2,
           plan = $3,
           status = $4,
           plan_expires_at = $5,
           updated_at = now()
       WHERE id = $6
       RETURNING id, name, email, role, plan, plan_expires_at, status, onboarding_completed, persona, created_at, updated_at, last_login_at`,
      [name || null, safeRole, safePlan, safeStatus, planExpiresAt || null, req.params.id]
    );

    if (!result.rows.length) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true, user: adminUser(result.rows[0]) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/admin/shop/products', requireAdmin, async (_req, res) => {
  try {
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

app.listen(PORT, () => {
  console.log(`Fluently API running on http://localhost:${PORT}`);
  ensureSchema()
    .then(() => pool.query('SELECT NOW()'))
    .then(() => console.log('PostgreSQL connected'))
    .catch(console.error);
});
