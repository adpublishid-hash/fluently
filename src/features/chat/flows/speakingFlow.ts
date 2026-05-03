import {
  buildSpeakingFeedback,
  buildSpeakingGameFeedback,
  buildSpeakingLesson,
  buildSpeakingTopicQuestion,
  normalizeSpeakingTopic,
  speakingTopicOptions,
} from '../english';
import type { VocabularyStage } from '../english';
import { buildLocalizedFeedback, buildLocalizedLesson, buildLocalizedTopicQuestion, isEnglishChat } from '../languageAdapters';
import { createUserMessage } from '../session';
import type { FlowRuntime, TopicRuntime } from './types';

const wantsTopicSelect = (text: string) => {
  const normalized = text.toLowerCase();
  return (
    normalized.includes('pilih topik') ||
    normalized.includes('ganti topik') ||
    normalized.includes('topik baru') ||
    normalized === 'topik'
  );
};

export function selectSpeakingTopic(topicValue: string, runtime: TopicRuntime) {
  const {
    studentName,
    levelId,
    targetLanguage,
    setMessages,
    setSelectedTopic,
    setPronunciationTurn,
    setVocabStage,
    sendAiReply,
  } = runtime;

  const localized = !isEnglishChat(targetLanguage);

  if (topicValue === 'custom-speaking') {
    setMessages(prev => [...prev, createUserMessage('Custom Speaking Topic')]);
    setVocabStage('ask-topic');
    sendAiReply(`Boleh, ${studentName || 'teman'}! Tulis topik speaking yang kamu mau.

Contoh:
- Job interview practice
- Ordering food
- Business meeting
- Daily conversation with friends`, 900);
    return;
  }

  const topic = normalizeSpeakingTopic(topicValue);
  setMessages(prev => [...prev, createUserMessage(speakingTopicOptions.find((option) => option.value === topicValue)?.label || topic)]);
  setSelectedTopic(topic);
  setPronunciationTurn(0);
  setVocabStage('practice');
  if (localized) {
    sendAiReply(buildLocalizedLesson(studentName || 'teman', 'speaking', topic, targetLanguage, levelId), 1500);
    return;
  }
  sendAiReply(buildSpeakingLesson(studentName || 'teman', topic, levelId), 1800);
}

export function handleSpeakingAnswer(userText: string, vocabStage: VocabularyStage, runtime: FlowRuntime) {
  const {
    studentName,
    selectedTopic,
    pronunciationTurn,
    levelId,
    targetLanguage,
    setStudentName,
    setSelectedTopic,
    setPronunciationTurn,
    setVocabStage,
    sendAiReply,
  } = runtime;

  const localized = !isEnglishChat(targetLanguage);

  if (vocabStage === 'ask-name') {
    const name = userText.split(/\s+/)[0];
    setStudentName(name);
    setVocabStage('ask-topic');
    if (localized) {
      sendAiReply(buildLocalizedTopicQuestion(name, 'speaking', targetLanguage), 1200);
      return;
    }
    sendAiReply(buildSpeakingTopicQuestion(name), 1200);
    return;
  }

  if (vocabStage === 'ask-topic') {
    if (wantsTopicSelect(userText)) {
      sendAiReply(localized
        ? buildLocalizedTopicQuestion(studentName || 'teman', 'speaking', targetLanguage)
        : buildSpeakingTopicQuestion(studentName || 'teman'), 700);
      return;
    }

    const topic = normalizeSpeakingTopic(userText);
    setSelectedTopic(topic);
    setPronunciationTurn(0);
    setVocabStage('practice');
    if (localized) {
      sendAiReply(buildLocalizedLesson(studentName || 'teman', 'speaking', topic, targetLanguage, levelId), 1500);
      return;
    }
    sendAiReply(buildSpeakingLesson(studentName || 'teman', topic, levelId), 1800);
    return;
  }

  if (localized) {
    if (vocabStage === 'practice') {
      setPronunciationTurn(pronunciationTurn + 1);
      sendAiReply(buildLocalizedFeedback(studentName || 'teman', userText, 'speaking', targetLanguage), 1400);
      return;
    }
    setVocabStage('ask-topic');
    sendAiReply(buildLocalizedTopicQuestion(studentName || 'teman', 'speaking', targetLanguage), 900);
    return;
  }

  if (vocabStage === 'practice') {
    const currentTurn = pronunciationTurn;
    const nextTurn = currentTurn + 1;
    setPronunciationTurn(nextTurn);
    if (nextTurn >= 8) {
      setVocabStage('game');
    }
    sendAiReply(buildSpeakingFeedback(studentName || 'teman', userText, selectedTopic || 'daily conversation', currentTurn), 1800);
    return;
  }

  if (vocabStage === 'game') {
    setVocabStage('loop');
    sendAiReply(buildSpeakingGameFeedback(studentName || 'teman', userText), 1800);
    return;
  }

  const loopText = userText.toLowerCase();
  if (loopText.includes('ganti') || wantsTopicSelect(loopText)) {
    setVocabStage('ask-topic');
    sendAiReply(buildSpeakingTopicQuestion(studentName || 'teman'), 900);
    return;
  }

  if (loopText.includes('latihan') || loopText.includes('lagi')) {
    setVocabStage('practice');
    setPronunciationTurn(0);
    sendAiReply(buildSpeakingLesson(studentName || 'teman', selectedTopic || 'daily conversation', levelId), 1200);
    return;
  }

  if (loopText.includes('level')) {
    setVocabStage('practice');
    setPronunciationTurn(0);
    sendAiReply(`Siap, ${studentName || 'teman'}! Kita naik level 🚀
Jawab speaking prompt berikut dengan kalimat lebih panjang: pakai connector seperti because, but, atau when.`, 900);
    return;
  }

  sendAiReply(buildSpeakingGameFeedback(studentName || 'teman', userText), 1400);
}
