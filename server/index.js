const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Load .env manually (no dotenv dependency)
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [key, ...val] = line.split('=');
    if (key && val.length) process.env[key.trim()] = val.join('=').trim();
  });
}

const app = express();
const PORT = process.env.PORT || 4000;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:5173',
  ],
  credentials: true,
}));
app.use(express.json());

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
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    onboardingCompleted: Boolean(user.onboarding_completed),
    persona: user.persona || {},
  };
}

// ── Health check ──────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// ── Register ──────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'All fields required' });

  try {
    const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (exists.rows.length)
      return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, onboarding_completed, persona`,
      [name, email.toLowerCase(), passwordHash]
    );
    res.json({ success: true, user: publicUser(result.rows[0]) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── Login ─────────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    if (!result.rows.length)
      return res.status(401).json({ error: 'login.errorInvalidCredentials' });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid)
      return res.status(401).json({ error: 'login.errorInvalidCredentials' });

    res.json({ success: true, user: publicUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── User exists ───────────────────────────────────────────
app.get('/api/auth/exists', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email required' });

  try {
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    res.json({ exists: result.rows.length > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── Reset password ────────────────────────────────────────
app.post('/api/auth/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword)
    return res.status(400).json({ error: 'Email and new password required' });

  try {
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (!result.rows.length)
      return res.status(404).json({ error: 'forgot.errorEmailNotFound' });

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password_hash = $1 WHERE email = $2', [passwordHash, email.toLowerCase()]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── Save onboarding persona ───────────────────────────────
app.put('/api/users/persona', async (req, res) => {
  const { email, persona } = req.body;
  if (!email || !persona || typeof persona !== 'object')
    return res.status(400).json({ error: 'Email and persona are required' });

  try {
    const result = await pool.query(
      `UPDATE users
       SET persona = $1::jsonb,
           onboarding_completed = true,
           updated_at = now()
       WHERE email = $2
       RETURNING id, name, email, onboarding_completed, persona`,
      [JSON.stringify(persona), email.toLowerCase()]
    );

    if (!result.rows.length)
      return res.status(404).json({ error: 'User not found' });

    res.json({ success: true, user: publicUser(result.rows[0]) });
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
