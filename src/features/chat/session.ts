import type { ChatMessage } from '../../types';
import {
  buildGrammarGreeting,
  buildPronunciationGreeting,
  buildReadingGreeting,
  buildSpeakingGreeting,
  buildVocabularyGreeting,
  buildWritingGreeting,
  getLevelLabel,
} from './english';
import { buildLocalizedGreeting, isEnglishChat } from './languageAdapters';
import type { TargetLanguage } from './targetLanguage';

export type ChatModeFlags = {
  isVocabularyMode: boolean;
  isGrammarMode: boolean;
  isPronunciationMode: boolean;
  isReadingMode: boolean;
  isSpeakingMode: boolean;
  isWritingMode: boolean;
  isGuidedMode: boolean;
};

export function getChatModeFlags(modeId?: string): ChatModeFlags {
  const isVocabularyMode = modeId === 'vocabulary';
  const isGrammarMode = modeId === 'grammar';
  const isPronunciationMode = modeId === 'pronunciation';
  const isReadingMode = modeId === 'reading';
  const isSpeakingMode = modeId === 'speaking';
  const isWritingMode = modeId === 'writing';

  return {
    isVocabularyMode,
    isGrammarMode,
    isPronunciationMode,
    isReadingMode,
    isSpeakingMode,
    isWritingMode,
    isGuidedMode: isVocabularyMode || isGrammarMode || isPronunciationMode || isReadingMode || isSpeakingMode || isWritingMode,
  };
}

export function createAiMessage(text: string, id = (Date.now() + 1).toString()): ChatMessage {
  return {
    id,
    text,
    isAi: true,
    timestamp: new Date(),
  };
}

export function createUserMessage(text: string, id = Date.now().toString()): ChatMessage {
  return {
    id,
    text,
    isAi: false,
    timestamp: new Date(),
  };
}

export function getGuidedGreeting(modeId?: string, targetLanguage: TargetLanguage = 'English') {
  if (!isEnglishChat(targetLanguage)) return buildLocalizedGreeting(targetLanguage);
  if (modeId === 'reading') return buildReadingGreeting();
  if (modeId === 'writing') return buildWritingGreeting();
  if (modeId === 'speaking') return buildSpeakingGreeting();
  if (modeId === 'pronunciation') return buildPronunciationGreeting();
  if (modeId === 'grammar') return buildGrammarGreeting();
  return buildVocabularyGreeting();
}

export function createGuidedGreetingMessage(modeId?: string, targetLanguage: TargetLanguage = 'English') {
  return createAiMessage(getGuidedGreeting(modeId, targetLanguage), `${targetLanguage}-${modeId}-greeting`);
}

export function createInitialMessages(
  modeId: string | undefined,
  fallbackMessages: ChatMessage[],
  targetLanguage: TargetLanguage = 'English',
) {
  return getChatModeFlags(modeId).isGuidedMode ? [createGuidedGreetingMessage(modeId, targetLanguage)] : fallbackMessages;
}

export function getChatHeaderTitle(isGuidedMode: boolean) {
  return isGuidedMode ? 'Fluently AI' : 'Fluently Assistant';
}

export function getChatHeaderSubtitle(
  modeId: string | undefined,
  levelId: string | undefined,
  targetLanguage: TargetLanguage = 'English',
) {
  const languagePrefix = targetLanguage === 'English' ? '' : `${targetLanguage} · `;
  if (modeId === 'vocabulary') return `${languagePrefix}Vocabulary Mode · ${getLevelLabel(levelId)}`;
  if (modeId === 'grammar') return `${languagePrefix}Grammar Mode · ${getLevelLabel(levelId)}`;
  if (modeId === 'pronunciation') return `${languagePrefix}Pronunciation Mode · ${getLevelLabel(levelId)}`;
  if (modeId === 'reading') return `${languagePrefix}Reading Mode · ${getLevelLabel(levelId)}`;
  if (modeId === 'speaking') return `${languagePrefix}Speaking Mode · ${getLevelLabel(levelId)}`;
  if (modeId === 'writing') return `${languagePrefix}Writing Mode · ${getLevelLabel(levelId)}`;
  return 'Free Chat Mode';
}

export function getChatInputPlaceholder(sessionEnded: boolean, isGuidedMode: boolean) {
  if (sessionEnded) return 'Session ended. Tap New Session to continue.';
  return isGuidedMode ? 'Type your answer...' : 'Ask anything or practice here...';
}
