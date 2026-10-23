import { buildLocalizedFeedback, buildLocalizedLesson, buildLocalizedPracticeLoopReply } from '../languageAdapters';
import {
  VOCABULARY_BATCH_SIZE,
  buildVocabularyBatchTask,
  formatLocalizedFeedback,
  isLocalizedLanguage,
  type LocalizedFocus,
} from '../localizedLesson';
import { requestLocalizedFeedback, requestLocalizedLesson } from '../services/localizedAi';
import type { FlowRuntime, TopicRuntime } from './types';

const PRONUNCIATION_BATCH_SIZE = 2;

/** Generates a Japanese/Mandarin/Arabic lesson with AI, falling back to the built-in sample lesson. */
export async function sendLocalizedLesson(focus: LocalizedFocus, topic: string, runtime: TopicRuntime) {
  const {
    studentName,
    levelId,
    targetLanguage,
    sendAiReply,
    showTyping,
    setLocalizedLessonContext,
    setGeneratedVocabularyWords,
    setGeneratedPronunciationRows,
    setCompletedPracticeWords,
    setVocabularyPracticeOffset,
    setPronunciationTurn,
  } = runtime;
  const name = studentName || 'teman';

  setLocalizedLessonContext('');
  setGeneratedVocabularyWords([]);
  setGeneratedPronunciationRows([]);
  setCompletedPracticeWords([]);
  setVocabularyPracticeOffset(0);
  setPronunciationTurn(0);
  if (!isLocalizedLanguage(targetLanguage)) return;

  showTyping();
  const lesson = await requestLocalizedLesson({ language: targetLanguage, focus, name, topic, levelId });
  if (!lesson) {
    sendAiReply(buildLocalizedLesson(name, focus, topic, targetLanguage, levelId), 600);
    return;
  }

  setLocalizedLessonContext(lesson.context);
  setGeneratedVocabularyWords(lesson.vocabularyWords);
  setGeneratedPronunciationRows(lesson.pronunciationRows);
  sendAiReply(lesson.message, 500);
}

const buildFallbackFeedback = (focus: LocalizedFocus, userText: string, runtime: FlowRuntime) => {
  const name = runtime.studentName || 'teman';
  return `${buildLocalizedFeedback(name, userText, focus, runtime.targetLanguage)}

${buildLocalizedPracticeLoopReply(name, focus, runtime.targetLanguage)}`;
};

/** Corrects a learner answer against the generated lesson and moves vocabulary/pronunciation batches forward. */
export async function sendLocalizedFeedback(focus: LocalizedFocus, userText: string, runtime: FlowRuntime) {
  const {
    studentName,
    selectedTopic,
    levelId,
    targetLanguage,
    localizedLessonContext,
    generatedVocabularyWords,
    generatedPronunciationRows,
    completedPracticeWords,
    vocabularyPracticeOffset,
    pronunciationTurn,
    sendAiReply,
    showTyping,
    setCompletedPracticeWords,
    setVocabularyPracticeOffset,
    setPronunciationTurn,
  } = runtime;
  const name = studentName || 'teman';

  if (!isLocalizedLanguage(targetLanguage) || !localizedLessonContext) {
    if (focus === 'pronunciation') setPronunciationTurn(pronunciationTurn + 1);
    sendAiReply(buildFallbackFeedback(focus, userText, runtime), 1400);
    return;
  }

  const targetItems = focus === 'vocabulary'
    ? generatedVocabularyWords.slice(vocabularyPracticeOffset, vocabularyPracticeOffset + VOCABULARY_BATCH_SIZE)
    : [];
  const pronunciationBatch = focus === 'pronunciation'
    ? generatedPronunciationRows.slice(pronunciationTurn * PRONUNCIATION_BATCH_SIZE, (pronunciationTurn + 1) * PRONUNCIATION_BATCH_SIZE)
    : [];
  const context = focus === 'pronunciation' && pronunciationBatch.length
    ? `Expected sentences:\n${pronunciationBatch.map((row) => `${row.sentence} | ${row.phonetic} | focus: ${row.focus}`).join('\n')}`
    : localizedLessonContext;

  showTyping();
  const result = await requestLocalizedFeedback({
    language: targetLanguage,
    focus,
    name,
    topic: selectedTopic || 'daily life',
    levelId,
    answer: userText,
    context,
    targetItems,
  });

  if (!result) {
    if (focus === 'pronunciation') setPronunciationTurn(pronunciationTurn + 1);
    sendAiReply(buildFallbackFeedback(focus, userText, runtime), 600);
    return;
  }

  if (focus === 'vocabulary' && targetItems.length) {
    const nextCompleted = Array.from(new Set([...completedPracticeWords, ...result.completedItems.filter((item) => targetItems.includes(item))]));
    const remaining = targetItems.filter((item) => !nextCompleted.includes(item));
    const feedback = formatLocalizedFeedback(result, { includeNextTask: false });

    if (remaining.length) {
      setCompletedPracticeWords(nextCompleted);
      sendAiReply(`${feedback}

Masih perlu dipakai dengan benar:
${remaining.map((item) => `- ${item}`).join('\n')}

Coba lagi dengan kalimat pendek dulu, ${name}.`, 500);
      return;
    }

    const nextOffset = vocabularyPracticeOffset + VOCABULARY_BATCH_SIZE;
    const nextWords = generatedVocabularyWords.slice(nextOffset, nextOffset + VOCABULARY_BATCH_SIZE);
    setCompletedPracticeWords([]);
    setVocabularyPracticeOffset(nextOffset);
    if (nextWords.length) {
      sendAiReply(`${feedback}

Batch ${nextOffset / VOCABULARY_BATCH_SIZE} selesai! Lanjut buat 1 kalimat untuk tiap kata ini:
${buildVocabularyBatchTask(nextWords, nextOffset)}`, 500);
      return;
    }

    sendAiReply(`${feedback}

🎉 Semua ${generatedVocabularyWords.length} kosakata sudah kamu pakai, ${name}! Sekarang tulis paragraf pendek (3-5 kalimat) yang menggabungkan minimal 5 kata dari tabel, atau ketik "topik baru" untuk ganti topik.`, 500);
    return;
  }

  if (focus === 'pronunciation' && pronunciationBatch.length) {
    const nextTurn = pronunciationTurn + 1;
    const start = nextTurn * PRONUNCIATION_BATCH_SIZE;
    const nextBatch = generatedPronunciationRows.slice(start, start + PRONUNCIATION_BATCH_SIZE);
    setPronunciationTurn(nextTurn);
    const feedback = formatLocalizedFeedback(result, { includeNextTask: false });
    sendAiReply(nextBatch.length
      ? `${feedback}

Lanjut: tekan mic dan baca kalimat ${nextBatch.map((_, index) => start + index + 1).join(' dan ')}.`
      : `${feedback}

🎉 Semua ${generatedPronunciationRows.length} kalimat sudah kamu latih, ${name}! Ulangi kalimat yang skornya paling rendah, atau ketik "topik baru" untuk fokus bunyi lain.`, 500);
    return;
  }

  sendAiReply(`${formatLocalizedFeedback(result)}

Ketik "topik baru" kalau ingin ganti topik.`, 500);
}
