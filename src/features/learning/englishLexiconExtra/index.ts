import { englishCefrLexicon } from '../englishCefrLexicon';
import { a1Extra, a2Extra } from './a1a2';
import { b1Extra, b2Extra } from './b1b2';
import { c1Extra, c2Extra } from './c1c2';
import type { LexiconEntry } from './types';

export type { LexiconEntry, SentenceEntry } from './types';
export { englishSentences } from './sentences';

export const englishCefrOrder = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'] as const;

const extras: Record<string, LexiconEntry[]> = { a1: a1Extra, a2: a2Extra, b1: b1Extra, b2: b2Extra, c1: c1Extra, c2: c2Extra };

// Core list first, then the extended list; a word stays at the lowest level
// that introduces it so levels never share vocabulary.
export const englishLexicon: Record<string, LexiconEntry[]> = (() => {
  const seen = new Set<string>();
  const merged: Record<string, LexiconEntry[]> = {};
  const all = englishCefrOrder.map((level) => [level, [...(englishCefrLexicon[level] ?? []), ...(extras[level] ?? [])]] as const);
  // Reserve every core word at its own level before the extras are placed.
  const coreLevel = new Map<string, number>();
  englishCefrOrder.forEach((level, index) => (englishCefrLexicon[level] ?? []).forEach(([word]) => {
    const key = word.toLowerCase();
    if (!coreLevel.has(key)) coreLevel.set(key, index);
  }));
  all.forEach(([level, entries], index) => {
    merged[level] = entries.filter(([word]) => {
      const key = word.toLowerCase();
      if (seen.has(key)) return false;
      const core = coreLevel.get(key);
      if (core !== undefined && core < index) return false;
      seen.add(key);
      return true;
    });
  });
  return merged;
})();
