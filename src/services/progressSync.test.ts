import { beforeEach, describe, expect, it } from 'vitest';
import { applyRemoteProgress, clearLocalProgress, collectLocalProgress } from './progressSync';

class MemoryStorage {
  private store = new Map<string, string>();
  get length() { return this.store.size; }
  key(index: number) { return [...this.store.keys()][index] ?? null; }
  getItem(key: string) { return this.store.get(key) ?? null; }
  setItem(key: string, value: string) { this.store.set(key, String(value)); }
  removeItem(key: string) { this.store.delete(key); }
  clear() { this.store.clear(); }
}

beforeEach(() => {
  Object.assign(globalThis, { localStorage: new MemoryStorage(), window: new EventTarget() });
});

describe('progress sync mapping', () => {
  it('collects only completion lists as key|id items', () => {
    localStorage.setItem('talky_arabic_pemula_kalam_completed', JSON.stringify([1, 3]));
    localStorage.setItem('fluently_video_lessons_completed', JSON.stringify(['english-beginner-1']));
    localStorage.setItem('talky_session', JSON.stringify({ id: 1 }));
    localStorage.setItem('talky_bad_completed', 'not json');

    expect(collectLocalProgress()).toEqual([
      'fluently_video_lessons_completed|english-beginner-1',
      'talky_arabic_pemula_kalam_completed|1',
      'talky_arabic_pemula_kalam_completed|3',
    ]);
  });

  it('merges remote items without dropping local progress and keeps id types', () => {
    localStorage.setItem('talky_mandarin_beginner_grammar_completed', JSON.stringify([2]));
    const changed = applyRemoteProgress([
      'talky_mandarin_beginner_grammar_completed|2',
      'talky_mandarin_beginner_grammar_completed|5',
      'fluently_video_lessons_completed|arabic-pemula-3',
      'invalid-key|1',
    ]);

    expect(changed).toBe(true);
    expect(JSON.parse(localStorage.getItem('talky_mandarin_beginner_grammar_completed')!)).toEqual([2, 5]);
    expect(JSON.parse(localStorage.getItem('fluently_video_lessons_completed')!)).toEqual(['arabic-pemula-3']);
    expect(localStorage.getItem('invalid-key')).toBeNull();
    expect(applyRemoteProgress(['talky_mandarin_beginner_grammar_completed|5'])).toBe(false);
  });

  it('clears only completion lists', () => {
    localStorage.setItem('talky_beginner_grammar_completed', '[1]');
    localStorage.setItem('talky_token', 'abc');
    clearLocalProgress();
    expect(localStorage.getItem('talky_beginner_grammar_completed')).toBeNull();
    expect(localStorage.getItem('talky_token')).toBe('abc');
  });
});
