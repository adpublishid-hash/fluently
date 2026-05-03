import {
  buildGameFeedback,
  buildSentenceFeedback,
  buildTopicQuestion,
  buildVocabularyPrompt,
  getVocabularyPracticeWords,
  getWordsUsedInAnswer,
  normalizeTopic,
  topicSelectOptions,
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

export function selectVocabularyTopic(topicValue: string, runtime: TopicRuntime) {
  const {
    studentName,
    levelId,
    targetLanguage,
    setMessages,
    setSelectedTopic,
    setCompletedPracticeWords,
    setVocabularyPracticeOffset,
    setVocabStage,
    sendAiReply,
  } = runtime;

  const localized = !isEnglishChat(targetLanguage);

  if (topicValue === 'custom-topic') {
    setMessages(prev => [...prev, createUserMessage('Custom Topic')]);
    setCompletedPracticeWords([]);
    setVocabularyPracticeOffset(0);
    setVocabStage('ask-topic');
    sendAiReply(`Boleh, ${studentName || 'teman'}! Tulis topik custom yang kamu mau.

Contoh:
- English for nursing
- Coffee shop conversation
- IELTS writing vocabulary
- Gaming vocabulary`, 900);
    return;
  }

  const topic = normalizeTopic(topicValue);
  setMessages(prev => [...prev, createUserMessage(topicSelectOptions.find((option) => option.value === topicValue)?.label || topic)]);
  setSelectedTopic(topic);
  setCompletedPracticeWords([]);
  setVocabularyPracticeOffset(0);
  setVocabStage('practice');
  if (localized) {
    sendAiReply(buildLocalizedLesson(studentName || 'teman', 'vocabulary', topic, targetLanguage, levelId), 1800);
    return;
  }
  sendAiReply(buildVocabularyPrompt(studentName || 'teman', topic, levelId), 2600);
}

export function handleVocabularyAnswer(userText: string, vocabStage: VocabularyStage, runtime: FlowRuntime) {
  const {
    studentName,
    selectedTopic,
    completedPracticeWords,
    vocabularyPracticeOffset,
    levelId,
    targetLanguage,
    setStudentName,
    setSelectedTopic,
    setCompletedPracticeWords,
    setVocabularyPracticeOffset,
    setVocabStage,
    sendAiReply,
  } = runtime;

  const localized = !isEnglishChat(targetLanguage);

  if (vocabStage === 'ask-name') {
    const name = userText.split(/\s+/)[0];
    setStudentName(name);
    setVocabStage('ask-topic');
    if (localized) {
      sendAiReply(buildLocalizedTopicQuestion(name, 'vocabulary', targetLanguage), 1200);
      return;
    }
    sendAiReply(buildTopicQuestion(name), 1200);
    return;
  }

  if (vocabStage === 'ask-topic') {
    if (wantsTopicSelect(userText)) {
      sendAiReply(localized
        ? buildLocalizedTopicQuestion(studentName || 'teman', 'vocabulary', targetLanguage)
        : buildTopicQuestion(studentName || 'teman'), 700);
      return;
    }

    const topic = normalizeTopic(userText);
    setSelectedTopic(topic);
    setCompletedPracticeWords([]);
    setVocabularyPracticeOffset(0);
    setVocabStage('practice');
    if (localized) {
      sendAiReply(buildLocalizedLesson(studentName || 'teman', 'vocabulary', topic, targetLanguage, levelId), 1800);
      return;
    }
    sendAiReply(buildVocabularyPrompt(studentName || 'teman', topic, levelId), 2600);
    return;
  }

  if (localized) {
    if (vocabStage === 'practice') {
      setVocabStage('game');
      sendAiReply(buildLocalizedFeedback(studentName || 'teman', userText, 'vocabulary', targetLanguage), 1400);
      return;
    }

    setVocabStage('ask-topic');
    sendAiReply(buildLocalizedTopicQuestion(studentName || 'teman', 'vocabulary', targetLanguage), 900);
    return;
  }

  if (vocabStage === 'practice') {
    const targetWords = getVocabularyPracticeWords(selectedTopic || 'daily life', levelId, vocabularyPracticeOffset);
    const newlyUsedWords = getWordsUsedInAnswer(userText, targetWords);
    const nextCompletedWords = Array.from(new Set([...completedPracticeWords, ...newlyUsedWords]));
    const batchComplete = targetWords.every((word) => nextCompletedWords.includes(word));
    const nextOffset = vocabularyPracticeOffset + 3;
    const nextWords = batchComplete ? getVocabularyPracticeWords(selectedTopic || 'daily life', levelId, nextOffset) : [];

    if (batchComplete && nextWords.length > 0) {
      setVocabularyPracticeOffset(nextOffset);
      setCompletedPracticeWords([]);
    } else {
      setCompletedPracticeWords(nextCompletedWords);
    }

    if (batchComplete && nextWords.length === 0) {
      setVocabStage('game');
    }

    sendAiReply(
      buildSentenceFeedback(
        studentName || 'teman',
        userText,
        selectedTopic || 'daily life',
        levelId,
        nextCompletedWords,
        vocabularyPracticeOffset,
        nextWords,
      ),
      1800,
    );
    return;
  }

  if (vocabStage === 'game') {
    setVocabStage('loop');
    sendAiReply(buildGameFeedback(studentName || 'teman', userText, selectedTopic || 'daily life', levelId), 1800);
    return;
  }

  const loopText = userText.toLowerCase();
  if (loopText.includes('ganti') || wantsTopicSelect(loopText)) {
    setVocabStage('ask-topic');
    sendAiReply(buildTopicQuestion(studentName || 'teman'), 1200);
    return;
  }

  if (loopText.includes('game')) {
    setVocabStage('game');
    sendAiReply(`🔥 Challenge Time, ${studentName || 'teman'}!
1. Multiple choice: Which one means "jadwal"?
   A) schedule
   B) habit
   C) cloud

2. Fill in the blank:
   My daily ____ starts at 6 AM.

3. Buat 1 kalimat memakai kata "${selectedTopic || 'vocabulary'}".`, 900);
    return;
  }

  setVocabStage('ask-topic');
  setCompletedPracticeWords([]);
  setVocabularyPracticeOffset(0);
  sendAiReply(`Mantap, ${studentName || 'teman'}! Kita level up 🚀

${buildTopicQuestion(studentName || 'teman')}`, 900);
}
