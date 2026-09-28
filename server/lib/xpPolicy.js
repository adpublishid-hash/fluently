// XP award policy. The client only *requests* XP; the server decides how much
// is granted so a tampered client cannot inflate the leaderboard:
//   - every activity has a per-event ceiling,
//   - lesson/practice/exam awards are idempotent per sourceKey (one award per lesson),
//   - total XP granted per user per UTC day is capped.

const XP_PER_LEVEL = 3000;
const DAILY_XP_CAP = Number(process.env.DAILY_XP_CAP || 3000);

const XP_RULES = {
  lesson: { max: 100, requiresSource: true },
  practice: { max: 100, requiresSource: true },
  exam: { max: 300, requiresSource: true },
  game: { max: 500, requiresSource: false },
  chat: { max: 200, requiresSource: false },
  general: { max: 50, requiresSource: false },
};

const SOURCE_KEY_PATTERN = /^[a-z0-9][a-z0-9:/_.-]{0,199}$/i;

function normalizeXpRequest(body) {
  const activity = Object.prototype.hasOwnProperty.call(XP_RULES, body?.activity) ? body.activity : 'general';
  const rule = XP_RULES[activity];
  const requested = Math.floor(Number(body?.xp));
  if (!Number.isFinite(requested) || requested <= 0) {
    return { error: 'xp harus berupa angka positif' };
  }

  const rawSource = typeof body?.sourceKey === 'string' ? body.sourceKey.trim() : '';
  if (rawSource && !SOURCE_KEY_PATTERN.test(rawSource)) {
    return { error: 'sourceKey tidak valid' };
  }
  if (rule.requiresSource && !rawSource) {
    return { error: `sourceKey wajib untuk aktivitas ${activity}` };
  }

  return {
    activity,
    xp: Math.min(requested, rule.max),
    sourceKey: rawSource ? `${activity}:${rawSource}`.toLowerCase() : null,
  };
}

function grantableXp(requested, earnedToday, cap = DAILY_XP_CAP) {
  return Math.max(0, Math.min(requested, cap - Math.max(0, earnedToday)));
}

function levelForXp(xp) {
  return Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1);
}

module.exports = {
  XP_PER_LEVEL,
  DAILY_XP_CAP,
  XP_RULES,
  normalizeXpRequest,
  grantableXp,
  levelForXp,
};
