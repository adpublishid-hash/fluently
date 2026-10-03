/** One authored multiple-choice question: prompt, correct answer, then wrong options. */
export type AuthoredChoice = [prompt: string, answer: string, ...wrong: string[]];

/** Arabic text (with harakat), transliteration, Indonesian meaning, and an optional authored question. */
export type QuizItem = [arabic: string, transliteration: string, meaning: string, authored?: AuthoredChoice];

/** Four items for each tier: Basic (words/phrases), Intermediate (sentences), Advanced (longer sentences). */
export type QuizTopic = [basic: QuizItem[], intermediate: QuizItem[], advanced: QuizItem[]];

export type ArabicQuizSkill = 'mufradat' | 'nahwu' | 'istima' | 'kalam' | 'qiraah' | 'kitabah' | 'makharij';
