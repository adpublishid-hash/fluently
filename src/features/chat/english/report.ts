import type { ReportContext } from '../types';
import { grammarTopicOptions } from './grammar';
import { pronunciationTopicOptions } from './pronunciation';
import { readingTopicOptions } from './reading';
import { writingTopicOptions } from './writing';
import { getLevelLabel, topicSelectOptions } from './vocabulary';
import { getSessionScoreCategory } from './scoring';

const buildSessionReport = ({ name, topic, levelId, mode, messages, stage }: ReportContext) => {
  const userMessages = messages.filter((message) => !message.isAi);
  const practiceMessages = userMessages.filter((message) => {
    const text = message.text.toLowerCase();
    const isVocabularyTopic = topicSelectOptions.some((option) => option.label.toLowerCase() === text || option.value.toLowerCase() === text);
    const isGrammarTopic = grammarTopicOptions.some((option) => option.label.toLowerCase() === text || option.value.toLowerCase() === text);
    const isPronunciationTopic = pronunciationTopicOptions.some((option) => option.label.toLowerCase() === text || option.value.toLowerCase() === text);
    const isReadingTopic = readingTopicOptions.some((option) => option.label.toLowerCase() === text || option.value.toLowerCase() === text);
    const isWritingTopic = writingTopicOptions.some((option) => option.label.toLowerCase() === text || option.value.toLowerCase() === text);
    return !isVocabularyTopic && !isGrammarTopic && !isPronunciationTopic && !isReadingTopic && !isWritingTopic;
  });
  const hasName = Boolean(name.trim());
  const hasTopic = Boolean(topic.trim());
  const reachedPractice = ['practice', 'game', 'loop'].includes(stage);
  const reachedGame = ['game', 'loop'].includes(stage);
  const completedLoop = stage === 'loop';
  const sentenceCount = practiceMessages.reduce((total, message) => {
    const lines = message.text.split(/\n+/).filter((line) => line.trim().length > 0);
    return total + Math.max(1, lines.length);
  }, 0);

  let score = 45;
  if (hasName) score += 10;
  if (hasTopic) score += 10;
  if (reachedPractice) score += 15;
  if (practiceMessages.length >= 1) score += 8;
  if (sentenceCount >= 3) score += 7;
  if (reachedGame) score += 8;
  if (completedLoop) score += 7;
  score = Math.min(100, score);

  const vocabularyScore = Math.min(100, score + (hasTopic ? 2 : -5));
  const interactionScore = Math.min(100, 55 + Math.min(userMessages.length, 6) * 7);
  const accuracyScore = Math.max(55, Math.min(100, score - (sentenceCount < 3 ? 8 : 0)));
  const category = getSessionScoreCategory(score);
  const focusLabel = mode === 'vocabulary' ? 'Vocabulary' : mode === 'grammar' ? 'Grammar' : mode === 'pronunciation' ? 'Pronunciation' : mode === 'reading' ? 'Reading' : mode === 'writing' ? 'Writing' : 'AI Chat';
  const skillScoreLabel = mode === 'grammar' ? 'Grammar' : mode === 'pronunciation' ? 'Pronunciation' : mode === 'reading' ? 'Reading Comprehension' : mode === 'writing' ? 'Writing' : 'Vocabulary';
  const topicLabel = hasTopic ? topic : 'belum dipilih';
  const learnerName = hasName ? name : 'Learner';
  const nextStep = score >= 85
    ? `Lanjutkan ke level ${getLevelLabel(levelId)} dengan topik baru atau coba mini game yang lebih menantang.`
    : 'Ulangi 3 kosakata paling penting, lalu buat 3 kalimat pendek dengan subject + verb yang jelas.';

  return `📊 Session Report - ${focusLabel}

Nama: ${learnerName}
Level: ${getLevelLabel(levelId)}
Topik: ${topicLabel}
Interaksi murid: ${userMessages.length} pesan
Latihan terdeteksi: ${sentenceCount} jawaban/kalimat

Nilai akhir: ${score}/100
Kategori: ${category}

Detail nilai:
- ${skillScoreLabel}: ${vocabularyScore}/100
- Accuracy: ${accuracyScore}/100
- Interaction: ${interactionScore}/100

Yang sudah bagus:
- ${hasTopic ? 'Kamu sudah memilih fokus/topik belajar dengan jelas.' : 'Kamu sudah memulai sesi dan siap diarahkan.'}
- ${practiceMessages.length > 0 ? 'Kamu sudah mencoba menjawab, ini penting untuk progress.' : 'Kamu sudah masuk ke sesi belajar dasar.'}

Yang perlu ditingkatkan:
- ${sentenceCount >= 3 ? 'Perhatikan natural word choice dan tense supaya kalimat lebih rapi.' : 'Coba buat minimal 3 kalimat latihan agar AI bisa menilai lebih akurat.'}
- Ucapkan kosakata dan example dengan tombol speaker untuk latihan listening dan pronunciation.

Rekomendasi berikutnya:
${nextStep}

Sesi selesai. Klik New Session untuk mulai latihan baru.`;
};

export { buildSessionReport };
