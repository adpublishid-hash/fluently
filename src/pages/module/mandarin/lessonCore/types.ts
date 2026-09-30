export type CorePhrase = [hanzi: string, pinyin: string, meaning: string];

/**
 * One authored lesson: an optional title (replaces the shared topic list),
 * two teaching points and four model phrases. Pinyin is generated from the
 * Hanzi with `npm run content:pinyin`.
 */
export type LessonCoreTuple = [
  title: string | null,
  points: [string, string],
  phrases: [CorePhrase, CorePhrase, CorePhrase, CorePhrase],
];
