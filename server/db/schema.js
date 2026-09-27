const bcrypt = require('bcrypt');
const { ADMIN_EMAIL, ADMIN_PASSWORD } = require('../config');
const { pool } = require('../db');
const { seedShopSettings } = require('../lib/shopSettings');

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
    create table if not exists ai_usage_daily (
      user_id integer not null references users(id) on delete cascade,
      usage_date text not null,
      used integer not null default 0,
      updated_at timestamptz not null default now(),
      primary key (user_id, usage_date)
    )
  `);

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

module.exports = {
  ensureSchema,
  seedAdminUser,
  initialProducts,
  seedShopProducts,
};
