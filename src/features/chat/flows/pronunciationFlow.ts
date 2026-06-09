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
import {
  buildPronunciationPracticeInstruction,
  requestPronunciationFeedback,
  requestPronunciationLesson,
} from '../services/pronunciationAi';
import { createUserMessage } from '../session';
import type { PronunciationSentenceRow } from '../types';
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

const getGeneratedPronunciationBatch = (rows: PronunciationSentenceRow[], turn: number) =>
  rows.slice(turn * 2, turn * 2 + 2);

const buildPronunciationChallenge = (name: string) => `🔥 Pronunciation Challenge, ${name}!
1. Pilih pengucapan yang benar untuk "think":
   A) ting
   B) sink
   C) thingk

2. Minimal pair:
   Mana yang bunyinya panjang?
   A) ship
   B) sheep

3. Intonation:
   Untuk yes/no question, nada biasanya:
   A) naik di akhir
   B) selalu datar
   C) hilang di akhir`;

export async function selectPronunciationTopic(topicValue: string, runtime: TopicRuntime) {
  const {
    studentName,
    levelId,
    targetLanguage,
    setMessages,
    setSelectedTopic,
    setGeneratedPronunciationRows,
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
  setGeneratedPronunciationRows([]);
  setPronunciationTurn(0);
  setVocabStage('practice');
  if (localized) {
    sendAiReply(buildLocalizedLesson(studentName || 'teman', 'pronunciation', topic, targetLanguage, levelId), 1500);
    return;
  }
  const aiLesson = await requestPronunciationLesson({ name: studentName || 'teman', topic, levelId });
  if (aiLesson) {
    setGeneratedPronunciationRows(aiLesson.rows);
    sendAiReply(aiLesson.message, 700);
    return;
  }
  sendAiReply(buildPronunciationLesson(studentName || 'teman', topic, levelId), 1800);
}

export function handlePronunciationAnswer(userText: string, vocabStage: VocabularyStage, runtime: FlowRuntime) {
  const {
    studentName,
    selectedTopic,
    generatedPronunciationRows,
    pronunciationTurn,
    levelId,
    targetLanguage,
    setStudentName,
    setSelectedTopic,
    setGeneratedPronunciationRows,
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
    setGeneratedPronunciationRows([]);
    setPronunciationTurn(0);
    setVocabStage('practice');
    if (localized) {
      sendAiReply(buildLocalizedLesson(studentName || 'teman', 'pronunciation', topic, targetLanguage, levelId), 1500);
      return;
    }
    requestPronunciationLesson({ name: studentName || 'teman', topic, levelId }).then((aiLesson) => {
      if (aiLesson) {
        setGeneratedPronunciationRows(aiLesson.rows);
        sendAiReply(aiLesson.message, 700);
        return;
      }
      sendAiReply(buildPronunciationLesson(studentName || 'teman', topic, levelId), 1800);
    });
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
    const generatedBatch = getGeneratedPronunciationBatch(generatedPronunciationRows, currentTurn);
    const nextGeneratedBatch = getGeneratedPronunciationBatch(generatedPronunciationRows, nextTurn);
    setPronunciationTurn(nextTurn);
    if (nextTurn >= 8) {
      setVocabStage('game');
    }
    if (generatedBatch.length) {
      requestPronunciationFeedback({
        name: studentName || 'teman',
        answer: userText,
        topic: selectedTopic || 'daily conversation',
        levelId,
        sentences: generatedBatch,
        turn: currentTurn,
        hasNextBatch: nextGeneratedBatch.length > 0,
      }).then((feedback) => {
        const currentNumbers = generatedBatch.map((_, index) => currentTurn * 2 + index + 1).join(' dan ');
        const fallbackFeedback = `Good job, ${studentName || 'teman'}! Ini feedback untuk kalimat ${currentNumbers}.

Aku baca transcriptmu:
"${userText}"

✅ Kamu sudah latihan dengan microphone.
⚠️ Fokus perbaikan:
${generatedBatch.map((item, index) => `${currentTurn * 2 + index + 1}. "${item.sentence}"
   IPA: ${item.phonetic}
   Fokus: ${item.focus}
   Tips: ${item.tip}`).join('\n\n')}`;

        if (nextGeneratedBatch.length) {
          sendAiReply(`${feedback || fallbackFeedback}

${buildPronunciationPracticeInstruction(nextTurn * 2 + 1, nextGeneratedBatch.length)}`, 900);
          return;
        }

        setVocabStage('game');
        sendAiReply(`${feedback || fallbackFeedback}

🎉 Kamu sudah menyelesaikan ${generatedPronunciationRows.length} kalimat pronunciation hari ini.

${buildPronunciationChallenge(studentName || 'teman')}`, 900);
      });
      return;
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
    setGeneratedPronunciationRows([]);
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
