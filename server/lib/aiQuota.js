// Per-user daily AI quota for requests paid by the server key. The day
// resets at midnight Asia/Jakarta. Requests made with the user's own AI
// Studio key do not count.

function envInt(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value >= 0 ? Math.floor(value) : fallback;
}

function quotaLimit(plan) {
  if (plan === 'lifetime') return envInt('AI_DAILY_QUOTA_LIFETIME', 150);
  if (plan === 'pro') return envInt('AI_DAILY_QUOTA_PRO', 100);
  return envInt('AI_DAILY_QUOTA_FREE', 10);
}

function jakartaDateKey(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

/** Next midnight in Asia/Jakarta (UTC+7, no DST) as an ISO string. */
function nextResetIso(date = new Date()) {
  const [year, month, day] = jakartaDateKey(date).split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day + 1, -7)).toISOString();
}

/** Atomically uses one unit. Returns the new count, or null when the limit is reached. */
async function consumeQuota(pool, userId, plan) {
  const limit = quotaLimit(plan);
  if (limit <= 0) return null;
  const result = await pool.query(
    `INSERT INTO ai_usage_daily (user_id, usage_date, used) VALUES ($1, $2, 1)
     ON CONFLICT (user_id, usage_date) DO UPDATE SET used = ai_usage_daily.used + 1, updated_at = now()
     WHERE ai_usage_daily.used < $3
     RETURNING used`,
    [userId, jakartaDateKey(), limit],
  );
  return result.rows.length ? result.rows[0].used : null;
}

/** Gives a unit back when the AI call failed. */
async function refundQuota(pool, userId) {
  await pool.query(
    'UPDATE ai_usage_daily SET used = GREATEST(used - 1, 0), updated_at = now() WHERE user_id = $1 AND usage_date = $2',
    [userId, jakartaDateKey()],
  );
}

async function getQuota(pool, userId, plan) {
  const limit = quotaLimit(plan);
  const result = await pool.query('SELECT used FROM ai_usage_daily WHERE user_id = $1 AND usage_date = $2', [userId, jakartaDateKey()]);
  const used = result.rows[0]?.used ?? 0;
  return { plan, limit, used, remaining: Math.max(0, limit - used), resetsAt: nextResetIso() };
}

module.exports = { quotaLimit, jakartaDateKey, nextResetIso, consumeQuota, refundQuota, getQuota };
