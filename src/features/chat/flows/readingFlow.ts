import {
  buildLocalizedCustomTopicPrompt,
  buildLocalizedFeedback,
  buildLocalizedLesson,
  buildLocalizedPracticeLoopReply,
  buildLocalizedTopicQuestion,
  getLocalizedTopicLabel,
  isCustomLocalizedTopicValue,
  isEnglishChat,
  normalizeLocalizedTopicValue,
} from '../languageAdapters';
import {
  buildReadingFeedback,
  buildReadingGameFeedback,
  buildReadingLesson,
  buildReadingTopicQuestion,
  normalizeReadingTopic,
  readingTopicOptions,
} from '../english';
import type { VocabularyStage } from '../english';
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

export function selectReadingTopic(topicValue: string, runtime: TopicRuntime) {
  const { studentName, levelId, targetLanguage, setMessages, setSelectedTopic, setVocabStage, sendAiReply } = runtime;
  const localized = !isEnglishChat(targetLanguage);

  if (topicValue === 'custom-reading' || (localized && isCustomLocalizedTopicValue(topicValue))) {
    setMessages(prev => [...prev, createUserMessage(localized ? getLocalizedTopicLabel(targetLanguage, 'reading', topicValue) : 'Custom Reading Topic')]);
    setVocabStage('ask-topic');
    sendAiReply(localized
      ? buildLocalizedCustomTopicPrompt(studentName || 'teman', 'reading', targetLanguage)
      : `Boleh, ${studentName || 'teman'}! Tulis topik reading custom yang kamu mau.

Contoh:
- Short news article
- Travel story
- Business email
- Science text`, 900);
    return;
  }

  const topic = localized ? normalizeLocalizedTopicValue(topicValue) : normalizeReadingTopic(topicValue);
  setMessages(prev => [...prev, createUserMessage(localized ? getLocalizedTopicLabel(targetLanguage, 'reading', topicValue) : readingTopicOptions.find((option) => option.value === topicValue)?.label || topic)]);
  setSelectedTopic(topic);
  setVocabStage('practice');
  if (localized) {
    sendAiReply(buildLocalizedLesson(studentName || 'teman', 'reading', topic, targetLanguage, levelId), 1500);
    return;
  }
  sendAiReply(buildReadingLesson(studentName || 'teman', topic, levelId), 1800);
}

export function handleReadingAnswer(userText: string, vocabStage: VocabularyStage, runtime: FlowRuntime) {
  const {
    studentName,
    selectedTopic,
    levelId,
    targetLanguage,
    setStudentName,
    setSelectedTopic,
    setVocabStage,
    sendAiReply,
  } = runtime;

  const localized = !isEnglishChat(targetLanguage);

  if (vocabStage === 'ask-name') {
    const name = userText.split(/\s+/)[0];
    setStudentName(name);
    setVocabStage('ask-topic');
    if (localized) {
      sendAiReply(buildLocalizedTopicQuestion(name, 'reading', targetLanguage), 1200);
      return;
    }
    sendAiReply(buildReadingTopicQuestion(name), 1200);
    return;
  }

  if (vocabStage === 'ask-topic') {
    if (wantsTopicSelect(userText)) {
      sendAiReply(localized
        ? buildLocalizedTopicQuestion(studentName || 'teman', 'reading', targetLanguage)
        : buildReadingTopicQuestion(studentName || 'teman'), 700);
      return;
    }

    const topic = localized ? normalizeLocalizedTopicValue(userText) : normalizeReadingTopic(userText);
    setSelectedTopic(topic);
    setVocabStage('practice');
    if (localized) {
      sendAiReply(buildLocalizedLesson(studentName || 'teman', 'reading', topic, targetLanguage, levelId), 1500);
      return;
    }
    sendAiReply(buildReadingLesson(studentName || 'teman', topic, levelId), 1800);
    return;
  }

  if (localized) {
    if (wantsTopicSelect(userText)) {
      setVocabStage('ask-topic');
      sendAiReply(buildLocalizedTopicQuestion(studentName || 'teman', 'reading', targetLanguage), 900);
      return;
    }

    setVocabStage('practice');
    sendAiReply(`${buildLocalizedFeedback(studentName || 'teman', userText, 'reading', targetLanguage)}

${buildLocalizedPracticeLoopReply(studentName || 'teman', 'reading', targetLanguage)}`, 1400);
    return;
  }

  if (vocabStage === 'practice') {
    setVocabStage('game');
    sendAiReply(buildReadingFeedback(studentName || 'teman', userText, selectedTopic || 'daily life', levelId), 1800);
    return;
  }

  if (vocabStage === 'game') {
    setVocabStage('loop');
    sendAiReply(buildReadingGameFeedback(studentName || 'teman', userText), 1600);
    return;
  }

  const loopText = userText.toLowerCase();
  if (loopText.includes('ganti') || wantsTopicSelect(loopText)) {
    setVocabStage('ask-topic');
    sendAiReply(buildReadingTopicQuestion(studentName || 'teman'), 1000);
    return;
  }

  if (loopText.includes('level')) {
    setVocabStage('ask-topic');
    sendAiReply(`Mantap, ${studentName || 'teman'}! Kita bisa level up reading. Pilih topik baru atau tulis topik sendiri ya.
READING_TOPIC_SELECT`, 900);
    return;
  }

  setVocabStage('ask-topic');
  sendAiReply(buildReadingTopicQuestion(studentName || 'teman'), 900);
}
