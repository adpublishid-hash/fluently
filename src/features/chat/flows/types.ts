import type { Dispatch, SetStateAction } from 'react';
import type { ChatMessage } from '../../../types';
import type { VocabularyStage } from '../english';
import type { PronunciationSentenceRow } from '../types';
import type { TargetLanguage } from '../targetLanguage';

export type SendAiReply = (text: string, delay?: number) => void;

export type FlowRuntime = {
  studentName: string;
  selectedTopic: string;
  completedPracticeWords: string[];
  generatedVocabularyWords: string[];
  generatedPronunciationRows: PronunciationSentenceRow[];
  vocabularyPracticeOffset: number;
  pronunciationTurn: number;
  levelId?: string;
  targetLanguage: TargetLanguage;
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  setStudentName: (name: string) => void;
  setSelectedTopic: (topic: string) => void;
  setCompletedPracticeWords: (words: string[]) => void;
  setGeneratedVocabularyWords: (words: string[]) => void;
  setGeneratedPronunciationRows: (rows: PronunciationSentenceRow[]) => void;
  setVocabularyPracticeOffset: (offset: number) => void;
  setPronunciationTurn: (turn: number) => void;
  setVocabStage: (stage: VocabularyStage) => void;
  sendAiReply: SendAiReply;
};

export type TopicRuntime = Pick<
  FlowRuntime,
  | 'studentName'
  | 'levelId'
  | 'targetLanguage'
  | 'setMessages'
  | 'setSelectedTopic'
  | 'setCompletedPracticeWords'
  | 'setGeneratedVocabularyWords'
  | 'setGeneratedPronunciationRows'
  | 'setVocabularyPracticeOffset'
  | 'setPronunciationTurn'
  | 'setVocabStage'
  | 'sendAiReply'
>;
