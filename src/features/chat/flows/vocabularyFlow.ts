import {
  buildGameFeedback,
  buildTopicQuestion,
  buildVocabularyPrompt,
  getVocabularyPracticeWords,
  getWordsUsedInAnswer,
  normalizeTopic,
  topicSelectOptions,
} from '../english';
import type { VocabularyStage } from '../english';
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
import { createUserMessage } from '../session';
import { requestVocabularyCorrection, requestVocabularyLesson } from '../services/vocabularyCorrection';
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

const normalizeWord = (word: string) => word.toLowerCase().trim().replace(/\s+/g, ' ');

const mapCompletedWordsToTargets = (completedWords: string[], targetWords: string[]) => {
  const completedSet = new Set(completedWords.map(normalizeWord));
  return targetWords.filter((word) => completedSet.has(normalizeWord(word)));
};

const getPracticeWords = (topic: string, levelId: string | undefined, offset: number, generatedVocabularyWords: string[]) => {
  if (generatedVocabularyWords.length > 0) {
    return generatedVocabularyWords.slice(offset, offset + 3);
  }
  return getVocabularyPracticeWords(topic, levelId, offset);
};

const buildStrictLocalCorrection = (name: string, answer: string, targetWords: string[]) => {
  const usedWords = getWordsUsedInAnswer(answer, targetWords);
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);
  const hasBasicError =
    /\bhallo\b/i.test(answer) ||
    /\bmy\s+(am|is|are|was|were)\b/i.test(answer) ||
    /\b(i|you|we|they)\s+is\b/i.test(answer) ||
    /\b(he|she|it)\s+are\b/i.test(answer) ||
    /\bmy\s+are\b/i.test(answer);

  const completedWords = hasBasicError ? [] : usedWords;
  const correctedExample = /\bhallo\b/i.test(answer) || /\bmy\s+are\b/i.test(answer)
    ? `Hello, my name is ${displayName}.`
    : `Try: Hello, my name is ${displayName}.`;

  const status = hasBasicError ? '❌' : usedWords.length > 0 ? '✅' : '⚠️';
  const note = hasBasicError
    ? `Kalimatmu belum tepat. "My are..." tidak natural dalam bahasa Inggris. Untuk memperkenalkan nama, pakai pola "My name is..." atau "I am...".`
    : usedWords.length > 0
      ? 'Struktur utamanya sudah cukup jelas. Sekarang coba tambah satu detail kecil agar lebih natural.'
      : `Aku belum melihat target word dari batch ini dipakai dengan jelas. Coba gunakan salah satu kata ini: ${targetWords.join(', ')}.`;

  return {
    feedback: `${status} "${answer}"

Versi yang lebih natural:
"${correctedExample}"

Catatan:
${note}

Tetap bagus karena kamu sudah mencoba. Kita rapikan pelan-pelan ya, ${name}.`,
    completedWords,
  };
};

const buildCorrectionProgressReply = (
  name: string,
  correctionFeedback: string,
  remainingWords: string[],
  nextWords: string[],
  offset: number,
  isFinished: boolean,
) => {
  if (isFinished) {
    return `${correctionFeedback}

Sempurna, ${name}! Semua 30 vocabulary sudah kamu coba pakai. Sekarang kita masuk challenge kecil.

🔥 Challenge Time, ${name}!
1. Multiple choice: Kalimat mana yang paling natural?
   A) I very vocabulary.
   B) I learned a new word today.
   C) I word yesterday.

2. Fill in the blank:
   Please make one sentence with a word from today.

3. Tantangan kalimat:
   Buat 1 kalimat baru dan tambahkan detail waktu atau tempat.`;
  }

  if (nextWords.length > 0) {
    return `${correctionFeedback}

Mantap, ${name}. Batch ${Math.floor(offset / 3) + 1} selesai. Sekarang lanjut ke batch berikutnya.

Buat 3 kalimat baru memakai kata-kata ini:

${nextWords.map((word, index) => `${offset + index + 4}. ${word}`).join('\n')}

Santai saja, fokus satu kalimat yang natural untuk tiap kata.`;
  }

  return `${correctionFeedback}

Masih ada ${remainingWords.length} kata di batch ini yang perlu kamu pakai dengan benar:

${remainingWords.map((word) => `- ${word}`).join('\n')}

Coba lagi ya, ${name}. Buat kalimat sederhana dulu. Contoh pola aman:
"My name is ..."
"I say hello to my teacher."
"Good morning, how are you?"`;
};

export async function selectVocabularyTopic(topicValue: string, runtime: TopicRuntime) {
  const {
    studentName,
    levelId,
    targetLanguage,
    setMessages,
    setSelectedTopic,
    setCompletedPracticeWords,
    setGeneratedVocabularyWords,
    setVocabularyPracticeOffset,
    setVocabStage,
    sendAiReply,
  } = runtime;

  const localized = !isEnglishChat(targetLanguage);

  if (topicValue === 'custom-topic' || (localized && isCustomLocalizedTopicValue(topicValue))) {
    setMessages(prev => [...prev, createUserMessage(localized ? getLocalizedTopicLabel(targetLanguage, 'vocabulary', topicValue) : 'Custom Topic')]);
    setCompletedPracticeWords([]);
    setGeneratedVocabularyWords([]);
    setVocabularyPracticeOffset(0);
    setVocabStage('ask-topic');
    sendAiReply(localized
      ? buildLocalizedCustomTopicPrompt(studentName || 'teman', 'vocabulary', targetLanguage)
      : `Boleh, ${studentName || 'teman'}! Tulis topik custom yang kamu mau.

Contoh:
- English for nursing
- Coffee shop conversation
- TOEFL academic vocabulary
- Gaming vocabulary`, 900);
    return;
  }

  const topic = localized ? normalizeLocalizedTopicValue(topicValue) : normalizeTopic(topicValue);
  setMessages(prev => [...prev, createUserMessage(localized ? getLocalizedTopicLabel(targetLanguage, 'vocabulary', topicValue) : topicSelectOptions.find((option) => option.value === topicValue)?.label || topic)]);
  setSelectedTopic(topic);
  setCompletedPracticeWords([]);
  setGeneratedVocabularyWords([]);
  setVocabularyPracticeOffset(0);
  setVocabStage('practice');
  if (localized) {
    sendAiReply(buildLocalizedLesson(studentName || 'teman', 'vocabulary', topic, targetLanguage, levelId), 1800);
    return;
  }
  const aiLesson = await requestVocabularyLesson({ name: studentName || 'teman', topic, levelId });
  if (aiLesson) {
    setGeneratedVocabularyWords(aiLesson.words);
    sendAiReply(aiLesson.message, 2600);
    return;
  }
  sendAiReply(buildVocabularyPrompt(studentName || 'teman', topic, levelId), 2600);
}

export async function handleVocabularyAnswer(userText: string, vocabStage: VocabularyStage, runtime: FlowRuntime) {
  const {
    studentName,
    selectedTopic,
    completedPracticeWords,
    generatedVocabularyWords,
    vocabularyPracticeOffset,
    levelId,
    targetLanguage,
    setStudentName,
    setSelectedTopic,
    setCompletedPracticeWords,
    setGeneratedVocabularyWords,
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

    const topic = localized ? normalizeLocalizedTopicValue(userText) : normalizeTopic(userText);
    setSelectedTopic(topic);
    setCompletedPracticeWords([]);
    setGeneratedVocabularyWords([]);
    setVocabularyPracticeOffset(0);
    setVocabStage('practice');
    if (localized) {
      sendAiReply(buildLocalizedLesson(studentName || 'teman', 'vocabulary', topic, targetLanguage, levelId), 1800);
      return;
    }
    const aiLesson = await requestVocabularyLesson({ name: studentName || 'teman', topic, levelId });
    if (aiLesson) {
      setGeneratedVocabularyWords(aiLesson.words);
      sendAiReply(aiLesson.message, 2600);
      return;
    }
    sendAiReply(buildVocabularyPrompt(studentName || 'teman', topic, levelId), 2600);
    return;
  }

  if (localized) {
    if (wantsTopicSelect(userText)) {
      setVocabStage('ask-topic');
      sendAiReply(buildLocalizedTopicQuestion(studentName || 'teman', 'vocabulary', targetLanguage), 900);
      return;
    }

    setVocabStage('practice');
    sendAiReply(`${buildLocalizedFeedback(studentName || 'teman', userText, 'vocabulary', targetLanguage)}

${buildLocalizedPracticeLoopReply(studentName || 'teman', 'vocabulary', targetLanguage)}`, 1400);
    return;
  }

  if (vocabStage === 'practice') {
    const targetWords = getPracticeWords(selectedTopic || 'daily life', levelId, vocabularyPracticeOffset, generatedVocabularyWords);
    const aiCorrection = await requestVocabularyCorrection({
      name: studentName || 'teman',
      answer: userText,
      targetWords,
      topic: selectedTopic || 'daily life',
      levelId,
    });
    const correction = aiCorrection || buildStrictLocalCorrection(studentName || 'teman', userText, targetWords);
    const newlyUsedWords = mapCompletedWordsToTargets(correction.completedWords, targetWords);
    const nextCompletedWords = Array.from(new Set([...completedPracticeWords, ...newlyUsedWords]));
    const batchComplete = targetWords.every((word) => nextCompletedWords.includes(word));
    const nextOffset = vocabularyPracticeOffset + 3;
    const nextWords = batchComplete ? getPracticeWords(selectedTopic || 'daily life', levelId, nextOffset, generatedVocabularyWords) : [];
    const remainingWords = targetWords.filter((word) => !nextCompletedWords.includes(word));

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
      buildCorrectionProgressReply(
        studentName || 'teman',
        correction.feedback,
        remainingWords,
        nextWords,
        vocabularyPracticeOffset,
        batchComplete && nextWords.length === 0,
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
  setGeneratedVocabularyWords([]);
  setVocabularyPracticeOffset(0);
  sendAiReply(`Mantap, ${studentName || 'teman'}! Kita level up 🚀

${buildTopicQuestion(studentName || 'teman')}`, 900);
}
