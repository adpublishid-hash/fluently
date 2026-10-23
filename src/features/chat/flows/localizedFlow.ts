import { buildGrammarFeedback, buildReadingFeedback, buildSpeakingFeedback, buildWritingFeedback } from '../english';
import { buildLocalizedFeedback, buildLocalizedLesson, buildLocalizedPracticeLoopReply } from '../languageAdapters';
import {
  VOCABULARY_BATCH_SIZE,
  buildVocabularyBatchTask,
  detectLocalizedCommand,
  formatLocalizedFeedback,
  type LocalizedFocus,
  type LocalizedLessonVariation,
} from '../localizedLesson';
import { requestLocalizedAssist, requestLocalizedFeedback, requestLocalizedLesson } from '../services/localizedAi';
import { buildReviewNote, fetchMistakes, saveMistakes, summarizeFeedback } from '../services/mistakes';

const REVIEW_MISTAKES = 3;
import type { FlowRuntime, TopicRuntime } from './types';

const PRONUNCIATION_BATCH_SIZE = 2;

/** Generates a lesson with AI, falling back to `fallback` or the built-in sample lesson. */
export async function sendLocalizedLesson(
  focus: LocalizedFocus,
  topic: string,
  runtime: TopicRuntime,
  options: { variation?: LocalizedLessonVariation; avoid?: string[]; fallback?: string } = {},
) {
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
  const resetLesson = () => {
    setLocalizedLessonContext('');
    setGeneratedVocabularyWords([]);
    setGeneratedPronunciationRows([]);
    setCompletedPracticeWords([]);
    setVocabularyPracticeOffset(0);
    setPronunciationTurn(0);
  };

  // A new topic starts clean; a regenerated set keeps the current lesson until the new one arrives.
  if (!options.variation) resetLesson();
  showTyping();
  // Past mistakes from the notebook are woven into the new lesson for review.
  const review = (await fetchMistakes(targetLanguage, REVIEW_MISTAKES)).map(({ original, corrected }) => ({ original, corrected }));
  const lesson = await requestLocalizedLesson(
    { language: targetLanguage, focus, name, topic, levelId },
    { variation: options.variation, avoid: options.avoid, review },
  );
  if (!lesson) {
    sendAiReply(options.variation
      ? 'Maaf, materi baru belum bisa dibuat karena AI sedang tidak tersedia. Coba lagi sebentar, atau lanjutkan dengan materi yang ada.'
      : options.fallback ?? buildLocalizedLesson(name, focus, topic, targetLanguage, levelId), 600);
    return;
  }

  if (options.variation) resetLesson();
  setLocalizedLessonContext(lesson.context);
  setGeneratedVocabularyWords(lesson.vocabularyWords);
  setGeneratedPronunciationRows(lesson.pronunciationRows);
  const reviewNote = buildReviewNote(review);
  sendAiReply(reviewNote ? `${lesson.message}\n\n${reviewNote}` : lesson.message, 500);
}

const buildFallbackFeedback = (focus: LocalizedFocus, userText: string, runtime: FlowRuntime) => {
  const name = runtime.studentName || 'teman';
  if (runtime.targetLanguage === 'English') {
    const topic = runtime.selectedTopic || 'daily life';
    if (focus === 'grammar') return buildGrammarFeedback(name, userText, topic);
    if (focus === 'reading') return buildReadingFeedback(name, userText, topic, runtime.levelId);
    if (focus === 'speaking') return buildSpeakingFeedback(name, userText, topic, runtime.pronunciationTurn);
    return buildWritingFeedback(name, userText, topic, runtime.levelId);
  }
  return `${buildLocalizedFeedback(name, userText, focus, runtime.targetLanguage)}

${buildLocalizedPracticeLoopReply(name, focus, runtime.targetLanguage)}`;
};

const currentBatch = (focus: LocalizedFocus, runtime: FlowRuntime) => {
  if (focus === 'vocabulary') {
    return runtime.generatedVocabularyWords.slice(runtime.vocabularyPracticeOffset, runtime.vocabularyPracticeOffset + VOCABULARY_BATCH_SIZE);
  }
  if (focus === 'pronunciation') {
    return runtime.generatedPronunciationRows
      .slice(runtime.pronunciationTurn * PRONUNCIATION_BATCH_SIZE, (runtime.pronunciationTurn + 1) * PRONUNCIATION_BATCH_SIZE)
      .map((row) => `${row.sentence} | ${row.phonetic} | focus: ${row.focus}`);
  }
  return [];
};

/**
 * Handles a learner message during a Japanese/Mandarin/Arabic lesson: help
 * requests ("hint", "contoh jawaban", questions), lesson regeneration
 * ("materi baru", "lebih mudah", "lebih sulit"), otherwise an answer to correct.
 */
export async function handleLocalizedPracticeInput(focus: LocalizedFocus, userText: string, runtime: FlowRuntime) {
  const command = detectLocalizedCommand(userText);
  if (!command) {
    await sendLocalizedFeedback(focus, userText, runtime);
    return;
  }

  if (command.type === 'regenerate') {
    await sendLocalizedLesson(focus, runtime.selectedTopic || 'daily life', runtime, {
      variation: command.variation,
      avoid: focus === 'vocabulary' ? runtime.generatedVocabularyWords : [],
    });
    return;
  }

  const batch = currentBatch(focus, runtime);
  const context = [batch.length ? `Current batch:\n${batch.join('\n')}` : '', runtime.localizedLessonContext].filter(Boolean).join('\n\n');
  runtime.showTyping();
  const reply = await requestLocalizedAssist({
    language: runtime.targetLanguage,
    focus,
    name: runtime.studentName || 'teman',
    topic: runtime.selectedTopic || 'daily life',
    levelId: runtime.levelId,
    action: command.type,
    question: command.type === 'ask' ? command.question : '',
    context,
    lastCoachMessage: runtime.lastCoachMessage,
  });
  runtime.sendAiReply(reply || 'Maaf, bantuan AI sedang tidak tersedia. Coba lagi sebentar, atau kirim jawabanmu dulu dan aku koreksi.', 400);
}

/** Corrects a learner answer against the generated lesson and moves vocabulary/pronunciation batches forward. */
async function sendLocalizedFeedback(focus: LocalizedFocus, userText: string, runtime: FlowRuntime) {
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

  if (!localizedLessonContext) {
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

  // Pronunciation transcripts are speech-recognition output, not the learner's own writing.
  if (result.status !== 'correct' && result.corrected && focus !== 'pronunciation') {
    void saveMistakes(targetLanguage, focus, selectedTopic, [
      { original: userText.slice(0, 300), corrected: result.corrected, explanation: summarizeFeedback(result.feedback) },
    ]);
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
