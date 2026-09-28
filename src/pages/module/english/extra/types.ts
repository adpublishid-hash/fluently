export type ExtraExample = [english: string, meaning: string];
export type ExtraLine = [speaker: string, english: string, meaning: string];
export type ExtraQuestion = [question: string, answer: string, distractors: string[]];

export type ExtraEnglishLesson = {
  id: number;
  title: string;
  subtitle: string;
  intro: string;
  points: string[];
  examples: ExtraExample[];
  /** Listening script / model dialogue (listening & speaking lessons). */
  dialogue?: ExtraLine[];
  practice: ExtraQuestion[];
  task: string;
};
