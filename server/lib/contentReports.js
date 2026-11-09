// Validation for learner reports about wrong AI chat content (shown to admins).
const { normalizeMistakeFocus, normalizeMistakeLanguage } = require('./mistakes');

const REASONS = new Set(['wrong', 'level', 'format', 'other']);
const STATUSES = new Set(['open', 'resolved']);

const clean = (value, max) => String(value ?? '').replace(/[^\S\n]+/g, ' ').trim().slice(0, max);

/** Returns the stored fields, or null when the language or excerpt is missing. */
function normalizeContentReport(body) {
  const language = normalizeMistakeLanguage(body?.language);
  const excerpt = clean(body?.excerpt, 4000);
  if (!language || !excerpt) return null;
  const reason = String(body?.reason || '').trim().toLowerCase();
  return {
    language,
    focus: normalizeMistakeFocus(body?.focus),
    topic: clean(body?.topic, 140).replace(/^Day \d+\s*-\s*/i, ''),
    levelId: clean(body?.levelId, 8).toLowerCase(),
    reason: REASONS.has(reason) ? reason : 'other',
    note: clean(body?.note, 1000),
    excerpt,
  };
}

function normalizeReportStatus(value) {
  const status = String(value || '').trim().toLowerCase();
  return STATUSES.has(status) ? status : null;
}

module.exports = { normalizeContentReport, normalizeReportStatus };
