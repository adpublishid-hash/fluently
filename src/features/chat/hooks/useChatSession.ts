import { useEffect, useRef, useState } from 'react';
import type { NavigateFunction } from 'react-router-dom';

import { mockChatMessages } from '../../../data/mockData';
import { useLanguage } from '../../../i18n/LanguageContext';
import type { ChatMessage } from '../../../types';
import { useAuth } from '../../../auth/AuthContext';
import { buildSessionReport, getLevelLabel } from '../english';
import type { ReportContext, VocabularyStage } from '../english';
import type { PronunciationSentenceRow } from '../types';
import {
  handleGrammarAnswer,
  handlePronunciationAnswer,
  handleReadingAnswer,
  handleSpeakingAnswer,
  handleVocabularyAnswer,
  handleWritingAnswer,
  selectGrammarTopic,
  selectPronunciationTopic,
  selectReadingTopic,
  selectSpeakingTopic,
  selectVocabularyTopic,
  selectWritingTopic,
} from '../flows';
import { aiResponses, quickActionResponses } from '../freeChat';
import {
  createInitialMessages,
  createUserMessage,
  getChatHeaderTitle,
  getChatModeFlags,
} from '../session';
import { normalizeTargetLanguage } from '../targetLanguage';
import { getSpeechRecognitionLanguage } from '../targetLanguage';
import { buildLocalizedReport, getLocalizedFocusLabel, isCustomLocalizedTopicValue } from '../languageAdapters';
import {
  readStoredChatSession,
  saveRecentChatSession,
  saveStoredChatSession,
  type StoredChatSessionState,
} from '../recentSessions';
import {
  canUseFreeChatTopic,
  getFreeChatTopicBlockMessage,
  recordFreeChatTopic,
} from '../freeChatLimits';
import { useAiReplyQueue } from './useAiReplyQueue';

interface UseChatSessionArgs {
  modeId?: string;
  levelId?: string;
  navigate: NavigateFunction;
  sessionId?: string;
}

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<{
    isFinal: boolean;
    0: { transcript: string };
  }>;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

const getSpeechRecognition = (): SpeechRecognitionConstructor | null => {
  if (typeof window === 'undefined') return null;
  const speechWindow = window as typeof window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition || null;
};

const wantsTopicPicker = (text: string) => {
  const normalized = text.toLowerCase().trim();
  return (
    normalized === 'topik' ||
    normalized.includes('pilih topik') ||
    normalized.includes('ganti topik') ||
    normalized.includes('topik baru')
  );
};

const normalizeOptionalId = (value?: string) => value || undefined;

const getMatchingStoredSession = (sessionId: string | undefined, modeId: string | undefined, levelId: string | undefined) => {
  const storedSession = readStoredChatSession(sessionId);
  if (!storedSession) return null;
  if (storedSession.modeId !== modeId) return null;
  if (normalizeOptionalId(storedSession.levelId) !== normalizeOptionalId(levelId)) return null;
  return storedSession;
};

export const useChatSession = ({ modeId, levelId, navigate, sessionId }: UseChatSessionArgs) => {
  const { user, awardXp } = useAuth();
  const { language, t } = useLanguage();
  const targetLanguage = normalizeTargetLanguage(user?.persona?.targetLanguage);
  const { isVocabularyMode, isGrammarMode, isPronunciationMode, isReadingMode, isSpeakingMode, isWritingMode, isGuidedMode } = getChatModeFlags(modeId);
  const [initialStoredSession] = useState(() => getMatchingStoredSession(sessionId, modeId, levelId));
  const [messages, setMessages] = useState<ChatMessage[]>(() => initialStoredSession?.messages ?? createInitialMessages(modeId, mockChatMessages, targetLanguage));
  const [input, setInput] = useState('');
  const { isTyping, sendAiReply, sendAiReplyFromMessages, clearPendingReply, stopTyping } = useAiReplyQueue(setMessages);
  const [isRecording, setIsRecording] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState(() => initialStoredSession?.id || '');
  const [vocabStage, setVocabStage] = useState<VocabularyStage>(() => initialStoredSession?.vocabStage ?? 'ask-name');
  const [studentName, setStudentName] = useState(() => initialStoredSession?.studentName ?? '');
  const [selectedTopic, setSelectedTopic] = useState(() => initialStoredSession?.selectedTopic ?? '');
  const [completedPracticeWords, setCompletedPracticeWords] = useState<string[]>(() => initialStoredSession?.completedPracticeWords ?? []);
  const [generatedVocabularyWords, setGeneratedVocabularyWords] = useState<string[]>(() => initialStoredSession?.generatedVocabularyWords ?? []);
  const [generatedPronunciationRows, setGeneratedPronunciationRows] = useState<PronunciationSentenceRow[]>(() => initialStoredSession?.generatedPronunciationRows ?? []);
  const [vocabularyPracticeOffset, setVocabularyPracticeOffset] = useState(() => initialStoredSession?.vocabularyPracticeOffset ?? 0);
  const [pronunciationTurn, setPronunciationTurn] = useState(() => initialStoredSession?.pronunciationTurn ?? 0);
  const [sessionEnded, setSessionEnded] = useState(() => initialStoredSession?.sessionEnded ?? false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const finalTranscriptRef = useRef('');

  const flowRuntime = {
    studentName,
    selectedTopic,
    completedPracticeWords,
    generatedVocabularyWords,
    generatedPronunciationRows,
    vocabularyPracticeOffset,
    pronunciationTurn,
    levelId,
    targetLanguage,
    setMessages,
    setStudentName,
    setSelectedTopic,
    setCompletedPracticeWords,
    setGeneratedVocabularyWords,
    setGeneratedPronunciationRows,
    setVocabularyPracticeOffset,
    setPronunciationTurn,
    setVocabStage,
    sendAiReply,
  };

  const guardFreeTopicLimit = (topic: string) => {
    if (!canUseFreeChatTopic(user, topic)) {
      sendAiReply(getFreeChatTopicBlockMessage(user, topic, language), 700);
      return false;
    }
    recordFreeChatTopic(user, modeId, topic, levelId);
    return true;
  };

  const resetTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    clearPendingReply();
    recognitionRef.current?.abort();
    finalTranscriptRef.current = '';
    setInput('');
    stopTyping();
    setIsRecording(false);

    const storedSession = getMatchingStoredSession(sessionId, modeId, levelId);
    if (storedSession) {
      setActiveSessionId(storedSession.id);
      setMessages(storedSession.messages);
      setVocabStage(storedSession.vocabStage);
      setStudentName(storedSession.studentName);
      setSelectedTopic(storedSession.selectedTopic);
      setCompletedPracticeWords(storedSession.completedPracticeWords);
      setGeneratedVocabularyWords(storedSession.generatedVocabularyWords);
      setGeneratedPronunciationRows(storedSession.generatedPronunciationRows);
      setVocabularyPracticeOffset(storedSession.vocabularyPracticeOffset);
      setPronunciationTurn(storedSession.pronunciationTurn);
      setSessionEnded(storedSession.sessionEnded);
      resetTextarea();
      return;
    }

    setActiveSessionId('');
    setMessages(createInitialMessages(modeId, mockChatMessages, targetLanguage));
    setVocabStage('ask-name');
    setStudentName('');
    setSelectedTopic('');
    setCompletedPracticeWords([]);
    setGeneratedVocabularyWords([]);
    setGeneratedPronunciationRows([]);
    setVocabularyPracticeOffset(0);
    setPronunciationTurn(0);
    setSessionEnded(false);
    resetTextarea();
  }, [clearPendingReply, levelId, modeId, sessionId, stopTyping, targetLanguage]);

  useEffect(() => {
    if (!isGuidedMode || !selectedTopic.trim() || vocabStage === 'ask-name' || vocabStage === 'ask-topic') return;
    const recentSession = saveRecentChatSession(modeId, selectedTopic, levelId, targetLanguage);
    if (recentSession) {
      setActiveSessionId(recentSession.id);
    }
  }, [isGuidedMode, levelId, modeId, selectedTopic, vocabStage]);

  useEffect(() => {
    if (!activeSessionId || !isGuidedMode || !modeId || !selectedTopic.trim()) return;

    const sessionState: StoredChatSessionState = {
      id: activeSessionId,
      modeId,
      levelId,
      topic: selectedTopic,
      messages,
      vocabStage,
      studentName,
      selectedTopic,
      completedPracticeWords,
      generatedVocabularyWords,
      generatedPronunciationRows,
      vocabularyPracticeOffset,
      pronunciationTurn,
      sessionEnded,
      updatedAt: Date.now(),
    };

    saveStoredChatSession(sessionState);
  }, [
    activeSessionId,
    completedPracticeWords,
    generatedPronunciationRows,
    generatedVocabularyWords,
    isGuidedMode,
    levelId,
    messages,
    modeId,
    pronunciationTurn,
    selectedTopic,
    sessionEnded,
    studentName,
    vocabStage,
    vocabularyPracticeOffset,
  ]);

  const submitUserText = (userText: string) => {
    const trimmedText = userText.trim();
    if (!trimmedText || sessionEnded) return;
    setMessages(prev => [...prev, createUserMessage(trimmedText)]);
    setInput('');
    resetTextarea();

    if (isGuidedMode && vocabStage === 'ask-topic' && !wantsTopicPicker(trimmedText)) {
      if (!guardFreeTopicLimit(trimmedText)) return;
    }

    if (isVocabularyMode) {
      handleVocabularyAnswer(trimmedText, vocabStage, flowRuntime);
      return;
    }

    if (isGrammarMode) {
      handleGrammarAnswer(trimmedText, vocabStage, flowRuntime);
      return;
    }

    if (isPronunciationMode) {
      handlePronunciationAnswer(trimmedText, vocabStage, flowRuntime);
      return;
    }

    if (isReadingMode) {
      handleReadingAnswer(trimmedText, vocabStage, flowRuntime);
      return;
    }

    if (isSpeakingMode) {
      handleSpeakingAnswer(trimmedText, vocabStage, flowRuntime);
      return;
    }

    if (isWritingMode) {
      handleWritingAnswer(trimmedText, vocabStage, flowRuntime);
      return;
    }

    sendAiReply(aiResponses[Math.floor(Math.random() * aiResponses.length)]);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  const startRecording = () => {
    if (sessionEnded) return;
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      sendAiReply(t('chat.micUnsupported'), 600);
      return;
    }

    finalTranscriptRef.current = '';
    const recognition = new SpeechRecognition();
    recognition.lang = getSpeechRecognitionLanguage(targetLanguage);
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const transcript = event.results[index][0].transcript.trim();
        if (event.results[index].isFinal) {
          finalTranscript += `${transcript} `;
        } else {
          interimTranscript += `${transcript} `;
        }
      }

      if (finalTranscript.trim()) {
        finalTranscriptRef.current = `${finalTranscriptRef.current} ${finalTranscript}`.trim();
      }

      const visibleTranscript = finalTranscriptRef.current || interimTranscript.trim();
      if (visibleTranscript) {
        setInput(visibleTranscript);
      }
    };

    recognition.onerror = () => {
      setIsRecording(false);
      sendAiReply(t('chat.micUnclear'), 600);
    };

    recognition.onend = () => {
      setIsRecording(false);
      const transcript = finalTranscriptRef.current.trim();
      if (!transcript) return;
      if (isPronunciationMode || isSpeakingMode) {
        submitUserText(transcript);
      }
    };

    try {
      recognition.start();
      setIsRecording(true);
    } catch {
      setIsRecording(false);
      sendAiReply(t('chat.micNotReady'), 600);
    }
  };

  const handleNewSession = () => {
    clearPendingReply();
    recognitionRef.current?.abort();
    finalTranscriptRef.current = '';
    setInput('');
    stopTyping();
    setIsRecording(false);
    setActiveSessionId('');
    setVocabStage('ask-name');
    setStudentName('');
    setSelectedTopic('');
    setCompletedPracticeWords([]);
    setGeneratedVocabularyWords([]);
    setGeneratedPronunciationRows([]);
    setVocabularyPracticeOffset(0);
    setPronunciationTurn(0);
    setSessionEnded(false);
    setMessages(createInitialMessages(modeId, mockChatMessages, targetLanguage));
    navigate(modeId ? `/chat/${modeId}${levelId ? `/${levelId}` : ''}` : '/chat', { replace: true });
    resetTextarea();
  };

  const handleTopicSelected = (topicValue: string) => {
    if (sessionEnded) return;
    if (!isCustomLocalizedTopicValue(topicValue) && !guardFreeTopicLimit(topicValue)) return;
    selectVocabularyTopic(topicValue, flowRuntime);
  };

  const handleGrammarTopicSelected = (topicValue: string) => {
    if (sessionEnded) return;
    if (!isCustomLocalizedTopicValue(topicValue) && !guardFreeTopicLimit(topicValue)) return;
    selectGrammarTopic(topicValue, flowRuntime);
  };

  const handlePronunciationTopicSelected = (topicValue: string) => {
    if (sessionEnded) return;
    if (!isCustomLocalizedTopicValue(topicValue) && !guardFreeTopicLimit(topicValue)) return;
    selectPronunciationTopic(topicValue, flowRuntime);
  };

  const handleSpeakingTopicSelected = (topicValue: string) => {
    if (sessionEnded) return;
    if (!isCustomLocalizedTopicValue(topicValue) && !guardFreeTopicLimit(topicValue)) return;
    selectSpeakingTopic(topicValue, flowRuntime);
  };

  const handleReadingTopicSelected = (topicValue: string) => {
    if (sessionEnded) return;
    if (!isCustomLocalizedTopicValue(topicValue) && !guardFreeTopicLimit(topicValue)) return;
    selectReadingTopic(topicValue, flowRuntime);
  };

  const handleWritingTopicSelected = (topicValue: string) => {
    if (sessionEnded) return;
    if (!isCustomLocalizedTopicValue(topicValue) && !guardFreeTopicLimit(topicValue)) return;
    selectWritingTopic(topicValue, flowRuntime);
  };

  const handleSend = () => {
    submitUserText(input);
  };

  const handleQuickAction = (label: string) => {
    if (sessionEnded) return;
    const localizedLabel = label === 'Practice Conversation'
      ? t('chat.practiceConversation')
      : label === 'Grammar Help'
        ? t('chat.grammarHelp')
        : label === 'Vocabulary Quiz'
          ? t('chat.vocabularyQuiz')
          : label === 'Daily Challenge'
            ? t('chat.dailyChallenge')
            : label;
    setMessages(prev => [...prev, createUserMessage(`${t('chat.quickActionPrefix')} ${localizedLabel}`)]);
    sendAiReply(quickActionResponses[label] ?? 'Let me help you with that!', 1200);
  };

  const handleEndSession = () => {
    if (sessionEnded) return;
    clearPendingReply();
    recognitionRef.current?.abort();
    setInput('');
    setIsRecording(false);
    setSessionEnded(true);
    resetTextarea();
    // Award XP proportional to conversation length (min 3 messages to count)
    const userMessageCount = messages.filter((m) => !m.isAi).length;
    if (userMessageCount >= 3) {
      const xp = Math.min(10 + userMessageCount * 5, 200);
      awardXp(xp, 'chat');
    }

    const reportContext: ReportContext = {
      name: studentName,
      topic: selectedTopic,
      levelId,
      mode: modeId || 'chat',
      messages,
      stage: vocabStage,
    };

    sendAiReplyFromMessages(
      (prev) => targetLanguage === 'English'
        ? buildSessionReport({ ...reportContext, messages: prev })
        : buildLocalizedReport(targetLanguage, modeId),
      2200,
      `session-report-${Date.now()}`,
    );
  };

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/chat');
  };

  const inputDisabled = targetLanguage !== 'Arabic' && (isPronunciationMode || isSpeakingMode) && !sessionEnded && (vocabStage === 'practice' || vocabStage === 'game');
  const headerSubtitle = (() => {
    if (targetLanguage === 'Arabic' && isGuidedMode) {
      return `Arabic · ${getLocalizedFocusLabel(targetLanguage, modeId)} · ${getLevelLabel(levelId)}`;
    }
    const languagePrefix = targetLanguage === 'English' ? '' : `${targetLanguage} · `;
    const levelLabel = getLevelLabel(levelId);
    if (modeId === 'vocabulary') return `${languagePrefix}${t('chat.mode.vocabulary')} · ${levelLabel}`;
    if (modeId === 'grammar') return `${languagePrefix}${t('chat.mode.grammar')} · ${levelLabel}`;
    if (modeId === 'pronunciation') return `${languagePrefix}${t('chat.mode.pronunciation')} · ${levelLabel}`;
    if (modeId === 'reading') return `${languagePrefix}${t('chat.mode.reading')} · ${levelLabel}`;
    if (modeId === 'speaking') return `${languagePrefix}${t('chat.mode.speaking')} · ${levelLabel}`;
    if (modeId === 'writing') return `${languagePrefix}${t('chat.mode.writing')} · ${levelLabel}`;
    return t('chat.mode.free');
  })();
  const inputPlaceholder = (() => {
    if (targetLanguage === 'Arabic') {
      if ((isSpeakingMode || isPronunciationMode) && !sessionEnded && (vocabStage === 'practice' || vocabStage === 'game')) {
        return isSpeakingMode
          ? 'Tekan mic atau ketik jawaban Arabic/transliterasi...'
          : 'Tekan mic atau ketik bacaan Arabic/transliterasi...';
      }
      if (sessionEnded) return t('chat.sessionEndedPlaceholder');
      return isGuidedMode ? 'Tulis jawaban Arabic, transliterasi, atau campuran...' : t('chat.placeholder');
    }
    if (inputDisabled) return isSpeakingMode ? t('chat.speakingMicPlaceholder') : t('chat.pronunciationMicPlaceholder');
    if (sessionEnded) return t('chat.sessionEndedPlaceholder');
    return isGuidedMode ? t('chat.guidedPlaceholder') : t('chat.placeholder');
  })();

  return {
    chatStarted: true,
    headerTitle: isGuidedMode ? (targetLanguage === 'Arabic' ? 'Arabic AI Coach' : getChatHeaderTitle(isGuidedMode)) : t('chat.assistant'),
    headerSubtitle,
    inputDisabled,
    inputPlaceholder,
    input,
    isGrammarMode,
    isGuidedMode,
    isPronunciationMode,
    isReadingMode,
    isRecording,
    isSpeakingMode,
    isTyping,
    isVocabularyMode,
    isWritingMode,
    messages,
    messagesEndRef,
    sessionEnded,
    targetLanguage,
    textareaRef,
    vocabStage,
    setInput,
    handleBack,
    handleEndSession,
    handleGrammarTopicSelected,
    handleNewSession,
    handlePronunciationTopicSelected,
    handleReadingTopicSelected,
    handleSpeakingTopicSelected,
    handleWritingTopicSelected,
    handleQuickAction,
    handleSend,
    handleTopicSelected,
    toggleRecording: () => {
      if (isRecording) {
        stopRecording();
        return;
      }
      startRecording();
    },
  };
};
