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
  buildWritingFeedback,
  buildWritingGameFeedback,
  buildWritingLesson,
  buildWritingTopicQuestion,
  normalizeWritingTopic,
  writingTopicOptions,
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

export function selectWritingTopic(topicValue: string, runtime: TopicRuntime) {
  const { studentName, levelId, targetLanguage, setMessages, setSelectedTopic, setVocabStage, sendAiReply } = runtime;
  const localized = !isEnglishChat(targetLanguage);

  if (topicValue === 'custom-writing' || (localized && isCustomLocalizedTopicValue(topicValue))) {
    setMessages(prev => [...prev, createUserMessage(localized ? getLocalizedTopicLabel(targetLanguage, 'writing', topicValue) : 'Custom Writing Topic')]);
    setVocabStage('ask-topic');
    sendAiReply(localized
      ? buildLocalizedCustomTopicPrompt(studentName || 'teman', 'writing', targetLanguage)
      : `Boleh, ${studentName || 'teman'}! Tulis topik writing custom yang kamu mau.

Contoh:
- Daily journal
- Formal email
- Opinion essay
- Product review`, 900);
    return;
  }

  const topic = localized ? normalizeLocalizedTopicValue(topicValue) : normalizeWritingTopic(topicValue);
  setMessages(prev => [...prev, createUserMessage(localized ? getLocalizedTopicLabel(targetLanguage, 'writing', topicValue) : writingTopicOptions.find((option) => option.value === topicValue)?.label || topic)]);
  setSelectedTopic(topic);
  setVocabStage('practice');
  if (localized) {
    sendAiReply(buildLocalizedLesson(studentName || 'teman', 'writing', topic, targetLanguage, levelId), 1500);
    return;
  }
  sendAiReply(buildWritingLesson(studentName || 'teman', topic, levelId), 1800);
}

export function handleWritingAnswer(userText: string, vocabStage: VocabularyStage, runtime: FlowRuntime) {
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
      sendAiReply(buildLocalizedTopicQuestion(name, 'writing', targetLanguage), 1200);
      return;
    }
    sendAiReply(buildWritingTopicQuestion(name), 1200);
    return;
  }

  if (vocabStage === 'ask-topic') {
    if (wantsTopicSelect(userText)) {
      sendAiReply(localized
        ? buildLocalizedTopicQuestion(studentName || 'teman', 'writing', targetLanguage)
        : buildWritingTopicQuestion(studentName || 'teman'), 700);
      return;
    }

    const topic = localized ? normalizeLocalizedTopicValue(userText) : normalizeWritingTopic(userText);
    setSelectedTopic(topic);
    setVocabStage('practice');
    if (localized) {
      sendAiReply(buildLocalizedLesson(studentName || 'teman', 'writing', topic, targetLanguage, levelId), 1500);
      return;
    }
    sendAiReply(buildWritingLesson(studentName || 'teman', topic, levelId), 1800);
    return;
  }

  if (localized) {
    if (wantsTopicSelect(userText)) {
      setVocabStage('ask-topic');
      sendAiReply(buildLocalizedTopicQuestion(studentName || 'teman', 'writing', targetLanguage), 900);
      return;
    }

    setVocabStage('practice');
    sendAiReply(`${buildLocalizedFeedback(studentName || 'teman', userText, 'writing', targetLanguage)}

${buildLocalizedPracticeLoopReply(studentName || 'teman', 'writing', targetLanguage)}`, 1400);
    return;
  }

  if (vocabStage === 'practice') {
    setVocabStage('game');
    sendAiReply(buildWritingFeedback(studentName || 'teman', userText, selectedTopic || 'daily life', levelId), 1800);
    return;
  }

  if (vocabStage === 'game') {
    setVocabStage('loop');
    sendAiReply(buildWritingGameFeedback(studentName || 'teman', userText), 1600);
    return;
  }

  const loopText = userText.toLowerCase();
  if (loopText.includes('ganti') || wantsTopicSelect(loopText)) {
    setVocabStage('ask-topic');
    sendAiReply(buildWritingTopicQuestion(studentName || 'teman'), 1000);
    return;
  }

  if (loopText.includes('level')) {
    setVocabStage('ask-topic');
    sendAiReply(`Mantap, ${studentName || 'teman'}! Kita bisa level up writing. Pilih topik baru atau tulis topik sendiri ya.
WRITING_TOPIC_SELECT`, 900);
    return;
  }

  setVocabStage('ask-topic');
  sendAiReply(buildWritingTopicQuestion(studentName || 'teman'), 900);
}
