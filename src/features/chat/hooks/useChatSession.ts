import { useEffect, useRef, useState } from 'react';
import type { NavigateFunction } from 'react-router-dom';

import { mockChatMessages } from '../../../data/mockData';
import type { ChatMessage } from '../../../types';
import { useAuth } from '../../../auth/AuthContext';
import { buildSessionReport } from '../english';
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
  getChatHeaderSubtitle,
  getChatHeaderTitle,
  getChatInputPlaceholder,
  getChatModeFlags,
} from '../session';
import { normalizeTargetLanguage } from '../targetLanguage';
import { getSpeechRecognitionLanguage } from '../targetLanguage';
import { buildLocalizedReport } from '../languageAdapters';
import { saveRecentChatSession } from '../recentSessions';
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

export const useChatSession = ({ modeId, levelId, navigate }: UseChatSessionArgs) => {
  const { user, awardXp } = useAuth();
  const targetLanguage = normalizeTargetLanguage(user?.persona?.targetLanguage);
  const { isVocabularyMode, isGrammarMode, isPronunciationMode, isReadingMode, isSpeakingMode, isWritingMode, isGuidedMode } = getChatModeFlags(modeId);
  const [messages, setMessages] = useState<ChatMessage[]>(() => createInitialMessages(modeId, mockChatMessages, targetLanguage));
  const [input, setInput] = useState('');
  const { isTyping, sendAiReply, sendAiReplyFromMessages, clearPendingReply, stopTyping } = useAiReplyQueue(setMessages);
  const [isRecording, setIsRecording] = useState(false);
  const [vocabStage, setVocabStage] = useState<VocabularyStage>('ask-name');
  const [studentName, setStudentName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [completedPracticeWords, setCompletedPracticeWords] = useState<string[]>([]);
  const [generatedVocabularyWords, setGeneratedVocabularyWords] = useState<string[]>([]);
  const [generatedPronunciationRows, setGeneratedPronunciationRows] = useState<PronunciationSentenceRow[]>([]);
  const [vocabularyPracticeOffset, setVocabularyPracticeOffset] = useState(0);
  const [pronunciationTurn, setPronunciationTurn] = useState(0);
  const [sessionEnded, setSessionEnded] = useState(false);
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
      sendAiReply(getFreeChatTopicBlockMessage(user, topic), 700);
      return false;
    }
    recordFreeChatTopic(user, modeId, topic, levelId);
    return true;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isGuidedMode || !selectedTopic.trim() || vocabStage === 'ask-name' || vocabStage === 'ask-topic') return;
    saveRecentChatSession(modeId, selectedTopic, levelId);
  }, [isGuidedMode, levelId, modeId, selectedTopic, vocabStage]);

  const resetTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

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
      sendAiReply('Browser ini belum mendukung speech recognition. Coba gunakan Chrome atau Edge, atau tulis transcript pengucapanmu di chat ya.', 600);
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
      sendAiReply('Aku belum bisa menangkap suara dengan jelas. Coba tekan mic lagi, bicara sedikit lebih dekat, lalu ulangi ya.', 600);
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
      sendAiReply('Microphone belum siap. Coba izinkan akses mic di browser lalu tekan tombol mic lagi ya.', 600);
    }
  };

  const handleNewSession = () => {
    clearPendingReply();
    recognitionRef.current?.abort();
    setInput('');
    stopTyping();
    setIsRecording(false);
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
    resetTextarea();
  };

  const handleTopicSelected = (topicValue: string) => {
    if (sessionEnded) return;
    if (topicValue !== 'custom-topic' && !guardFreeTopicLimit(topicValue)) return;
    selectVocabularyTopic(topicValue, flowRuntime);
  };

  const handleGrammarTopicSelected = (topicValue: string) => {
    if (sessionEnded) return;
    if (topicValue !== 'custom-topic' && !guardFreeTopicLimit(topicValue)) return;
    selectGrammarTopic(topicValue, flowRuntime);
  };

  const handlePronunciationTopicSelected = (topicValue: string) => {
    if (sessionEnded) return;
    if (topicValue !== 'custom-topic' && !guardFreeTopicLimit(topicValue)) return;
    selectPronunciationTopic(topicValue, flowRuntime);
  };

  const handleSpeakingTopicSelected = (topicValue: string) => {
    if (sessionEnded) return;
    if (topicValue !== 'custom-topic' && !guardFreeTopicLimit(topicValue)) return;
    selectSpeakingTopic(topicValue, flowRuntime);
  };

  const handleReadingTopicSelected = (topicValue: string) => {
    if (sessionEnded) return;
    if (topicValue !== 'custom-topic' && !guardFreeTopicLimit(topicValue)) return;
    selectReadingTopic(topicValue, flowRuntime);
  };

  const handleWritingTopicSelected = (topicValue: string) => {
    if (sessionEnded) return;
    if (topicValue !== 'custom-topic' && !guardFreeTopicLimit(topicValue)) return;
    selectWritingTopic(topicValue, flowRuntime);
  };

  const handleSend = () => {
    submitUserText(input);
  };

  const handleQuickAction = (label: string) => {
    if (sessionEnded) return;
    setMessages(prev => [...prev, createUserMessage(`I want to: ${label}`)]);
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

  const inputDisabled = (isPronunciationMode || isSpeakingMode) && !sessionEnded && (vocabStage === 'practice' || vocabStage === 'game');
  const microphoneModeLabel = isSpeakingMode ? 'speaking' : 'pronunciation';

  return {
    chatStarted: true,
    headerTitle: getChatHeaderTitle(isGuidedMode),
    headerSubtitle: getChatHeaderSubtitle(modeId, levelId, targetLanguage),
    inputDisabled,
    inputPlaceholder: inputDisabled ? `Tekan tombol mic untuk latihan ${microphoneModeLabel}...` : getChatInputPlaceholder(sessionEnded, isGuidedMode),
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
