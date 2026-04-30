const fs = require('fs');
const path = require('path');
const { Client } = require('../server/node_modules/pg');

const envPath = path.join(__dirname, '..', 'server', '.env');
const env = Object.fromEntries(
  fs.readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .filter((line) => line && !line.trim().startsWith('#'))
    .map((line) => {
      const index = line.indexOf('=');
      return [line.slice(0, index).trim(), line.slice(index + 1).trim()];
    }),
);

const quoteIdent = (value) => `"${String(value).replace(/"/g, '""')}"`;
const quoteLiteral = (value) => `'${String(value).replace(/'/g, "''")}'`;

async function main() {
  const admin = new Client({
    host: env.DB_HOST || 'localhost',
    port: Number(env.DB_PORT || 5433),
    database: 'postgres',
    user: process.env.USER,
  });

  await admin.connect();

  const role = await admin.query('select 1 from pg_roles where rolname = $1', [env.DB_USER]);
  if (role.rowCount === 0) {
    await admin.query(`create role ${quoteIdent(env.DB_USER)} login password ${quoteLiteral(env.DB_PASSWORD || '')}`);
  } else {
    await admin.query(`alter role ${quoteIdent(env.DB_USER)} login password ${quoteLiteral(env.DB_PASSWORD || '')}`);
  }

  const db = await admin.query('select 1 from pg_database where datname = $1', [env.DB_NAME]);
  if (db.rowCount === 0) {
    await admin.query(`create database ${quoteIdent(env.DB_NAME)} owner ${quoteIdent(env.DB_USER)}`);
  }

  await admin.end();

  const app = new Client({
    host: env.DB_HOST || 'localhost',
    port: Number(env.DB_PORT || 5433),
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
  });

  await app.connect();
  await app.query(`
    create table if not exists users (
      id serial primary key,
      name text not null,
      email text not null unique,
      password_hash text not null,
      persona jsonb not null default '{}'::jsonb,
      onboarding_completed boolean not null default false,
      updated_at timestamptz not null default now(),
      created_at timestamptz not null default now()
    )
  `);
  await app.query('create index if not exists users_email_lower_idx on users (lower(email))');
  await app.query(`alter table users add column if not exists persona jsonb not null default '{}'::jsonb`);
  await app.query(`alter table users add column if not exists onboarding_completed boolean not null default false`);
  await app.query(`alter table users add column if not exists updated_at timestamptz not null default now()`);
  await app.end();

  console.log('PostgreSQL database and users table are ready.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
