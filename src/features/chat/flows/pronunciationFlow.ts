import {
  buildPronunciationFeedback,
  buildPronunciationGameFeedback,
  buildPronunciationLesson,
  buildPronunciationTopicQuestion,
  normalizePronunciationTopic,
  pronunciationTopicOptions,
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
    normalized.includes('pilih fokus') ||
    normalized === 'topik'
  );
};

export function selectPronunciationTopic(topicValue: string, runtime: TopicRuntime) {
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

  if (topicValue === 'custom-pronunciation') {
    setMessages(prev => [...prev, createUserMessage('Custom Pronunciation Focus')]);
    setVocabStage('ask-topic');
    sendAiReply(`Boleh, ${studentName || 'teman'}! Tulis fokus pronunciation yang kamu mau.

Contoh:
- TH sound
- R and L sounds
- British accent practice
- Interview intonation`, 900);
    return;
  }

  const topic = normalizePronunciationTopic(topicValue);
  setMessages(prev => [...prev, createUserMessage(pronunciationTopicOptions.find((option) => option.value === topicValue)?.label || topic)]);
  setSelectedTopic(topic);
  setPronunciationTurn(0);
  setVocabStage('practice');
  if (localized) {
    sendAiReply(buildLocalizedLesson(studentName || 'teman', 'pronunciation', topic, targetLanguage, levelId), 1500);
    return;
  }
  sendAiReply(buildPronunciationLesson(studentName || 'teman', topic, levelId), 1800);
}

export function handlePronunciationAnswer(userText: string, vocabStage: VocabularyStage, runtime: FlowRuntime) {
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
      sendAiReply(buildLocalizedTopicQuestion(name, 'pronunciation', targetLanguage), 1200);
      return;
    }
    sendAiReply(buildPronunciationTopicQuestion(name), 1200);
    return;
  }

  if (vocabStage === 'ask-topic') {
    if (wantsTopicSelect(userText)) {
      sendAiReply(localized
        ? buildLocalizedTopicQuestion(studentName || 'teman', 'pronunciation', targetLanguage)
        : buildPronunciationTopicQuestion(studentName || 'teman'), 700);
      return;
    }

    const topic = normalizePronunciationTopic(userText);
    setSelectedTopic(topic);
    setPronunciationTurn(0);
    setVocabStage('practice');
    if (localized) {
      sendAiReply(buildLocalizedLesson(studentName || 'teman', 'pronunciation', topic, targetLanguage, levelId), 1500);
      return;
    }
    sendAiReply(buildPronunciationLesson(studentName || 'teman', topic, levelId), 1800);
    return;
  }

  if (localized) {
    if (vocabStage === 'practice') {
      setPronunciationTurn(pronunciationTurn + 1);
      setVocabStage('game');
      sendAiReply(buildLocalizedFeedback(studentName || 'teman', userText, 'pronunciation', targetLanguage), 1400);
      return;
    }

    setVocabStage('ask-topic');
    sendAiReply(buildLocalizedTopicQuestion(studentName || 'teman', 'pronunciation', targetLanguage), 900);
    return;
  }

  if (vocabStage === 'practice') {
    const currentTurn = pronunciationTurn;
    const nextTurn = currentTurn + 1;
    setPronunciationTurn(nextTurn);
    if (nextTurn >= 8) {
      setVocabStage('game');
    }
    sendAiReply(buildPronunciationFeedback(studentName || 'teman', userText, selectedTopic || 'daily conversation', currentTurn), 1800);
    return;
  }

  if (vocabStage === 'game') {
    setVocabStage('loop');
    sendAiReply(buildPronunciationGameFeedback(studentName || 'teman', userText), 1800);
    return;
  }

  const loopText = userText.toLowerCase();
  if (loopText.includes('ganti') || wantsTopicSelect(loopText)) {
    setVocabStage('ask-topic');
    sendAiReply(buildPronunciationTopicQuestion(studentName || 'teman'), 1000);
    return;
  }

  if (loopText.includes('latihan') || loopText.includes('lagi')) {
    setVocabStage('practice');
    setPronunciationTurn(0);
    sendAiReply(buildPronunciationLesson(studentName || 'teman', selectedTopic || 'daily conversation', levelId), 1200);
    return;
  }

  if (loopText.includes('level')) {
    setVocabStage('practice');
    setPronunciationTurn(0);
    sendAiReply(`Siap, ${studentName || 'teman'}! Kita naik level 🚀
Kali ini coba tulis versi pengucapan dengan lebih detail: tandai kata mana yang kamu tekan dan mana yang nadanya naik/turun.`, 900);
    return;
  }

  sendAiReply(buildPronunciationGameFeedback(studentName || 'teman', userText), 1400);
}
