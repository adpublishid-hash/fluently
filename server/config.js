const fs = require('fs');
const path = require('path');

// Load .env manually (no dotenv dependency)
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [key, ...val] = line.split('=');
    if (key && val.length && process.env[key.trim()] === undefined) process.env[key.trim()] = val.join('=').trim();
  });
}

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
// Never commit a default key: an unset key disables AI features with a 503.
const FREE_GEMINI_API_KEY = process.env.FREE_GEMINI_API_KEY || '';
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

module.exports = {
  PORT,
  NODE_ENV,
  isProduction,
  requiredEnv,
  csvEnv,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ORDER_NOTIFY_EMAIL,
  SUPPORT_EMAIL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  PUBLIC_APP_URL,
  RESET_TOKEN_TTL_MIN,
  RAJAONGKIR_KEY,
  RAJAONGKIR_BASE,
  QRIS_IMAGE_URL,
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASS,
  GOOGLE_CLIENT_ID,
  GEMINI_API_KEY,
  GEMINI_MODEL,
  FREE_GEMINI_API_KEY,
  KIE_GEMINI_BASE_URL,
  FREE_AI_CHAT_LEVELS,
  ONESENDER_URL,
  ONESENDER_KEY,
  ONESENDER_ADMIN_PHONE,
  corsOrigins,
};
