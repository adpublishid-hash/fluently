export type CorePhrase = [japanese: string, romaji: string, meaning: string];
export type LessonCoreTuple = [title: string | null, points: [string, string], phrases: [CorePhrase, CorePhrase, CorePhrase, CorePhrase]];
