import type { ChatMessage } from '../../types';

export type VocabularyStage = 'ask-name' | 'ask-topic' | 'practice' | 'game' | 'loop';

export type VocabularyRow = {
  word: string;
  phonetic: string;
  meaning: string;
  pos: string;
  example: string;
  exampleReading?: string;
  exampleMeaning?: string;
  note?: string;
};

export type PronunciationSentenceRow = {
  sentence: string;
  phonetic: string;
  focus: string;
  tip: string;
  meaning?: string;
};

export type SpeakingPromptRow = {
  prompt: string;
  grammarFocus: string;
  usefulPattern: string;
  example: string;
  exampleReading?: string;
  exampleMeaning?: string;
};

export type ReportContext = {
  name: string;
  topic: string;
  levelId?: string;
  mode: string;
  messages: ChatMessage[];
  stage: VocabularyStage;
};
