export type CorePhrase = [arabic: string, transliteration: string, meaning: string];

/**
 * Authored material for one skill lesson (B1 and above): two teaching points
 * specific to the lesson topic and four model expressions/sentences for it.
 */
export type LessonCoreTuple = [points: [string, string], phrases: [CorePhrase, CorePhrase, CorePhrase, CorePhrase]];
