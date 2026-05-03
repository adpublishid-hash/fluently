import {
  buildGrammarFeedback,
  buildGrammarGameFeedback,
  buildGrammarLesson,
  buildGrammarTopicQuestion,
  getGrammarGuide,
  grammarTopicOptions,
  normalizeGrammarTopic,
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

export function selectGrammarTopic(topicValue: string, runtime: TopicRuntime) {
  const { studentName, levelId, targetLanguage, setMessages, setSelectedTopic, setVocabStage, sendAiReply } = runtime;
  const localized = !isEnglishChat(targetLanguage);

  if (topicValue === 'custom-grammar') {
    setMessages(prev => [...prev, createUserMessage('Custom Grammar Topic')]);
    setVocabStage('ask-topic');
    sendAiReply(`Boleh, ${studentName || 'teman'}! Tulis topik grammar custom yang kamu mau.

Contoh:
- Conditional sentences
- Gerund vs infinitive
- Relative clauses
- Reported speech`, 900);
    return;
  }

  const topic = normalizeGrammarTopic(topicValue);
  setMessages(prev => [...prev, createUserMessage(grammarTopicOptions.find((option) => option.value === topicValue)?.label || topic)]);
  setSelectedTopic(topic);
  setVocabStage('practice');
  if (localized) {
    sendAiReply(buildLocalizedLesson(studentName || 'teman', 'grammar', topic, targetLanguage, levelId), 1500);
    return;
  }
  sendAiReply(buildGrammarLesson(studentName || 'teman', topic, levelId), 1800);
}

export function handleGrammarAnswer(userText: string, vocabStage: VocabularyStage, runtime: FlowRuntime) {
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
      sendAiReply(buildLocalizedTopicQuestion(name, 'grammar', targetLanguage), 1200);
      return;
    }
    sendAiReply(buildGrammarTopicQuestion(name), 1200);
    return;
  }

  if (vocabStage === 'ask-topic') {
    if (wantsTopicSelect(userText)) {
      sendAiReply(localized
        ? buildLocalizedTopicQuestion(studentName || 'teman', 'grammar', targetLanguage)
        : buildGrammarTopicQuestion(studentName || 'teman'), 700);
      return;
    }

    const topic = normalizeGrammarTopic(userText);
    setSelectedTopic(topic);
    setVocabStage('practice');
    if (localized) {
      sendAiReply(buildLocalizedLesson(studentName || 'teman', 'grammar', topic, targetLanguage, levelId), 1500);
      return;
    }
    sendAiReply(buildGrammarLesson(studentName || 'teman', topic, levelId), 1800);
    return;
  }

  if (localized) {
    if (vocabStage === 'practice') {
      setVocabStage('game');
      sendAiReply(buildLocalizedFeedback(studentName || 'teman', userText, 'grammar', targetLanguage), 1400);
      return;
    }

    setVocabStage('ask-topic');
    sendAiReply(buildLocalizedTopicQuestion(studentName || 'teman', 'grammar', targetLanguage), 900);
    return;
  }

  if (vocabStage === 'practice') {
    const grammarSentenceCount = userText.split(/\n+|(?<=[.!?])\s+/).map((line) => line.trim()).filter(Boolean).length;
    if (grammarSentenceCount >= 3) {
      setVocabStage('game');
    }
    sendAiReply(buildGrammarFeedback(studentName || 'teman', userText, selectedTopic || 'simple present'), 1800);
    return;
  }

  if (vocabStage === 'game') {
    setVocabStage('loop');
    sendAiReply(buildGrammarGameFeedback(studentName || 'teman', userText, selectedTopic || 'simple present'), 1800);
    return;
  }

  const loopText = userText.toLowerCase();
  if (loopText.includes('ganti') || wantsTopicSelect(loopText)) {
    setVocabStage('ask-topic');
    sendAiReply(buildGrammarTopicQuestion(studentName || 'teman'), 1000);
    return;
  }

  if (loopText.includes('latihan') || loopText.includes('lagi')) {
    setVocabStage('practice');
    sendAiReply(`${studentName || 'teman'}, coba buat 3 kalimat baru memakai ${getGrammarGuide(selectedTopic || 'simple present').title} ya 🔁`, 900);
    return;
  }

  if (loopText.includes('level')) {
    setVocabStage('practice');
    sendAiReply(`Siap, ${studentName || 'teman'}! Kita level up 🚀
Buat 3 kalimat yang lebih panjang memakai ${getGrammarGuide(selectedTopic || 'simple present').title}. Tambahkan time expression atau connector kalau bisa.`, 900);
    return;
  }

  setVocabStage('ask-topic');
  sendAiReply(buildGrammarTopicQuestion(studentName || 'teman'), 900);
}
