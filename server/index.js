const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { PORT, isProduction, corsOrigins } = require('./config');
const { pool } = require('./db');
const { ensureSchema } = require('./db/schema');
const { mailer } = require('./lib/notify');

const app = express();
if (isProduction) app.set('trust proxy', 1);

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

// ── Health check ──────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// ── API routes ────────────────────────────────────────────
require('./routes/ai')(app);
require('./routes/support')(app);
require('./routes/auth')(app);
require('./routes/users')(app);
require('./routes/shop')(app);
require('./routes/admin')(app);

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
