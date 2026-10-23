// Validation for the AI chat mistake notebook (stored per user and language).

const LANGUAGES = new Set(['english', 'japanese', 'mandarin', 'arabic']);
const FOCUSES = new Set(['vocabulary', 'grammar', 'pronunciation', 'speaking', 'reading', 'writing']);
const MAX_ITEMS_PER_SAVE = 8;
const MAX_ACTIVE_PER_LANGUAGE = 200;

const clean = (value, max) => String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

function normalizeMistakeLanguage(value) {
  const language = String(value || '').trim().toLowerCase();
  return LANGUAGES.has(language) ? language : null;
}

/** Same mistake = same original text, ignoring case, spacing and end punctuation. */
function mistakeKey(original) {
  return clean(original, 300).toLowerCase().replace(/[\s.!?。！？،؟]+$/u, '').replace(/\s+/g, ' ');
}

function normalizeMistakeItems(items) {
  if (!Array.isArray(items)) return [];
  const seen = new Set();
  return items
    .map((item) => ({
      original: clean(item?.original, 300),
      corrected: clean(item?.corrected, 300),
      explanation: clean(item?.explanation, 400),
    }))
    .filter((item) => {
      const key = mistakeKey(item.original);
      if (!key || !item.corrected || mistakeKey(item.corrected) === key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, MAX_ITEMS_PER_SAVE)
    .map((item) => ({ ...item, key: mistakeKey(item.original) }));
}

function normalizeMistakeFocus(value) {
  const focus = String(value || '').trim().toLowerCase();
  return FOCUSES.has(focus) ? focus : 'chat';
}

/** Review lines for a lesson prompt: "original → corrected". */
function formatReviewItems(items, limit = 5) {
  return (Array.isArray(items) ? items : [])
    .map((item) => {
      const original = clean(typeof item === 'string' ? item : item?.original, 160);
      const corrected = clean(typeof item === 'string' ? '' : item?.corrected, 160);
      return original && corrected ? `${original} → ${corrected}` : original;
    })
    .filter(Boolean)
    .slice(0, limit);
}

module.exports = {
  MAX_ACTIVE_PER_LANGUAGE,
  formatReviewItems,
  mistakeKey,
  normalizeMistakeFocus,
  normalizeMistakeItems,
  normalizeMistakeLanguage,
};
