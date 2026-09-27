import { emojiLexicon } from './emojiLexicon';

const keywordMap = new Map<string, string>();
let longestKeyword = 1;
emojiLexicon.forEach(([emoji, keywords]) => keywords.forEach((keyword) => {
  if (!keywordMap.has(keyword)) keywordMap.set(keyword, emoji);
  longestKeyword = Math.max(longestKeyword, keyword.split(' ').length);
}));

function words(text: string): string[] {
  return text.toLowerCase().normalize('NFC').match(/[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*/gu) ?? [];
}

function matchText(text: string): string | null {
  const tokens = words(text);
  // Longest phrase first, then earliest position, so "kereta bawah tanah" beats "tanah".
  for (let size = Math.min(longestKeyword, tokens.length); size >= 1; size -= 1) {
    for (let start = 0; start + size <= tokens.length; start += 1) {
      const emoji = keywordMap.get(tokens.slice(start, start + size).join(' '));
      if (emoji) return emoji;
    }
  }
  return null;
}

/**
 * Picks an illustrative emoji for a vocabulary item from its meaning
 * (Indonesian gloss) or, failing that, the term itself (English words).
 */
export function illustrate(meaning: string, term?: string): string | null {
  return matchText(meaning) ?? (term ? matchText(term) : null);
}
