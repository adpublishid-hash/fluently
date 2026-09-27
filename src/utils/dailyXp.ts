// Tracks XP earned per calendar day in localStorage so "Today's Goal" reflects
// real progress. The server only stores cumulative XP, so daily breakdown lives
// client-side and is updated whenever awardXp succeeds.

export const DAILY_XP_KEY = 'talky_daily_xp_v1';
export const DAILY_XP_EVENT = 'talky-daily-xp';

const MAX_DAYS = 400; // keep ~1 year of history, enough for any heatmap reuse

type DailyXpMap = Record<string, number>;

export function dayKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getDailyXpMap(): DailyXpMap {
  try {
    const raw = localStorage.getItem(DAILY_XP_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};
    const result: DailyXpMap = {};
    Object.entries(parsed as Record<string, unknown>).forEach(([key, value]) => {
      const num = Number(value);
      if (Number.isFinite(num) && num > 0) result[key] = num;
    });
    return result;
  } catch {
    return {};
  }
}

export function getTodayXp(map: DailyXpMap = getDailyXpMap()): number {
  return map[dayKey()] ?? 0;
}

export function recordDailyXp(amount: number): number {
  const clean = Math.round(amount);
  if (!Number.isFinite(clean) || clean === 0) return getTodayXp();

  const map = getDailyXpMap();
  const key = dayKey();
  const next = Math.max(0, (map[key] ?? 0) + clean);
  map[key] = next;

  // Trim to the most recent MAX_DAYS to keep storage bounded.
  const keys = Object.keys(map).sort();
  if (keys.length > MAX_DAYS) {
    keys.slice(0, keys.length - MAX_DAYS).forEach((k) => delete map[k]);
  }

  try {
    localStorage.setItem(DAILY_XP_KEY, JSON.stringify(map));
  } catch {
    // Ignore quota/serialization failures — daily XP is best-effort.
  }
  window.dispatchEvent(new CustomEvent(DAILY_XP_EVENT, { detail: { date: key, total: next } }));
  return next;
}
