const fs = require('fs');
const path = require('path');
const bcrypt = require('../server/node_modules/bcrypt');
const { Pool } = require('../server/node_modules/pg');

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

async function main() {
  const pool = new Pool({
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
  });

  const passwordHash = await bcrypt.hash('demo123', 10);
  const result = await pool.query(
    `insert into users (name, email, password_hash)
     values ($1, $2, $3)
     on conflict (email)
     do update set name = excluded.name, password_hash = excluded.password_hash
     returning id, name, email`,
    ['Demo User', 'demo@talky.app', passwordHash],
  );

  await pool.end();
  console.log(JSON.stringify(result.rows[0]));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
