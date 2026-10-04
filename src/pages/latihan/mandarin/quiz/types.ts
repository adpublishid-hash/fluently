/** A hand-written multiple-choice question: prompt, correct answer, then at least two wrong options. */
export type AuthoredChoice = [prompt: string, answer: string, ...wrong: string[]];

/** One authored item: Hanzi, pinyin (citation tones), Indonesian meaning, and an optional extra question. */
export type QuizItem = [hanzi: string, pinyin: string, meaning: string, authored?: AuthoredChoice];

/** Four items per level: Basic (words), Intermediate (short sentences), Advanced (longer sentences). */
export type QuizTopic = [basic: QuizItem[], intermediate: QuizItem[], advanced: QuizItem[]];

export type MandarinQuizSkill = 'pinyin' | 'cihui' | 'yufa' | 'tingli' | 'kouyu' | 'yuedu' | 'xiezuo';
