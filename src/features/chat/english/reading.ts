import { getSessionScoreCategory } from './scoring';
import { getLevelLabel } from './vocabulary';
import { topicSelectOptions } from './vocabularyData';

const readingTopicOptions = [
  ...topicSelectOptions.map((option) => ({
    value: option.value,
    label: option.label,
  })),
  { value: 'custom-reading', label: 'Tulis topik sendiri' },
];

type ReadingLesson = {
  title: string;
  passage: string;
  questions: string[];
  answers: string[];
  vocabulary: string[];
};

const normalizeReadingTopic = (value: string) => {
  const text = value.toLowerCase().trim();
  if (text.includes('custom')) return 'daily life';
  return text || 'daily life';
};

const getReadingLevelProfile = (levelId?: string) => {
  const level = getLevelLabel(levelId);
  if (level === 'A1' || level === 'A2') {
    return {
      sentenceStyle: 'short',
      instruction: 'Baca pelan-pelan. Fokus ke ide utama, detail sederhana, dan kata kunci.',
      questionStyle: 'jawab singkat dengan A/B/C atau tulis jawabannya langsung',
    };
  }
  if (level === 'B1' || level === 'B2') {
    return {
      sentenceStyle: 'medium',
      instruction: 'Baca untuk memahami main idea, supporting details, inference ringan, dan tone.',
      questionStyle: 'jawab dengan alasan singkat',
    };
  }
  return {
    sentenceStyle: 'advanced',
    instruction: 'Baca secara kritis. Perhatikan argument, implication, nuance, dan writer’s purpose.',
    questionStyle: 'jawab dengan evidence dari teks',
  };
};

const titleCase = (text: string) =>
  text
    .replace(/[-_]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const buildPassage = (topic: string, levelId?: string) => {
  const level = getLevelLabel(levelId);
  const topicTitle = titleCase(topic);

  if (level === 'A1') {
    return `Mira has a small notebook. Every morning, she writes three English words in it. Today, her topic is ${topicTitle.toLowerCase()}. She reads the words, says them slowly, and makes one simple sentence. Mira is happy because she can understand more English each day.`;
  }

  if (level === 'A2') {
    return `Rafi is learning English through short daily reading. This week, he reads about ${topicTitle.toLowerCase()}. He does not understand every word, but he looks for the main idea first. After that, he checks new vocabulary and writes two useful sentences. This habit helps him read faster and feel more confident.`;
  }

  if (level === 'B1') {
    return `Many students improve their English by reading short texts every day. When the topic is ${topicTitle.toLowerCase()}, they usually start by predicting what the text will discuss. Then they read once for the general meaning and read again for details. This method makes reading less stressful because students do not try to translate every single word.`;
  }

  if (level === 'B2') {
    return `Reading effectively is not only about recognizing vocabulary. In a topic such as ${topicTitle.toLowerCase()}, strong readers notice how ideas are organized, which details support the main point, and what the writer wants the reader to believe. They also learn to separate facts from opinions, especially when a text presents a problem and suggests a solution.`;
  }

  if (level === 'C1') {
    return `Advanced reading requires more than surface-level comprehension. When examining a text about ${topicTitle.toLowerCase()}, readers need to identify the author’s assumptions, evaluate the strength of the evidence, and notice subtle shifts in tone. A careful reader does not simply ask what the text says, but also why it is framed in that particular way.`;
  }

  return `At proficiency level, reading becomes an act of interpretation. A sophisticated text on ${topicTitle.toLowerCase()} may combine factual reporting, implied criticism, and carefully selected examples. The reader’s task is to trace the argument, recognize ambiguity, and explain how language choices influence meaning without reducing the text to a simple summary.`;
};

const buildReadingLessonData = (topic: string, levelId?: string): ReadingLesson => {
  const normalizedTopic = normalizeReadingTopic(topic);
  const topicTitle = titleCase(normalizedTopic);
  const passage = buildPassage(normalizedTopic, levelId);
  const level = getLevelLabel(levelId);
  const isBasic = level === 'A1' || level === 'A2';
  const isIntermediate = level === 'B1' || level === 'B2';

  if (isBasic) {
    return {
      title: `${topicTitle} Reading Practice`,
      passage,
      vocabulary: ['main idea', 'detail', 'word', 'sentence', 'understand'],
      questions: [
        '1. What is the text mainly about?',
        '2. Who is learning or practicing English in the text?',
        '3. What does the person do after reading?',
        '4. Why does the person feel better or more confident?',
        '5. Write one new word or phrase from the passage.',
      ],
      answers: ['learning English through reading', level === 'A1' ? 'Mira' : 'Rafi', 'writes words or sentences', 'because practice helps understanding', 'any relevant word from the passage'],
    };
  }

  if (isIntermediate) {
    return {
      title: `${topicTitle} Reading Analysis`,
      passage,
      vocabulary: ['predict', 'main idea', 'supporting detail', 'fact', 'opinion'],
      questions: [
        '1. What is the main idea of the passage?',
        '2. Which reading strategy does the passage recommend?',
        '3. Mention one supporting detail from the text.',
        '4. What can readers avoid by using this strategy?',
        '5. What is the writer’s purpose?',
      ],
      answers: ['effective reading strategy', 'read for main idea before details', 'prediction/details/fact vs opinion', 'translating every word or stress', 'to explain how to read better'],
    };
  }

  return {
    title: `${topicTitle} Critical Reading`,
    passage,
    vocabulary: ['assumption', 'evidence', 'tone', 'argument', 'interpretation'],
    questions: [
      '1. What is the central claim of the passage?',
      '2. What does the text imply about advanced readers?',
      '3. Identify one abstract concept used in the passage.',
      '4. What should a critical reader evaluate?',
      '5. Explain the writer’s purpose in one sentence.',
    ],
    answers: ['reading requires interpretation or critical analysis', 'they evaluate meaning beyond surface level', 'assumption/evidence/tone/argument/ambiguity', 'evidence, tone, language choices, framing', 'to describe advanced reading skills'],
  };
};

const buildReadingGreeting = () => 'Hi! Sebelum mulai reading practice, siapa namamu? 😊';

const buildReadingTopicQuestion = (name: string) => `Hai, ${name}! 👋
Makasih sudah belajar hari ini. Kita akan latihan reading comprehension dengan cara rapi, santai, tapi tetap menantang 📖🔥

${name}, kamu mau reading topic apa hari ini?
READING_TOPIC_SELECT`;

const buildReadingLesson = (name: string, topic: string, levelId?: string) => {
  const profile = getReadingLevelProfile(levelId);
  const lesson = buildReadingLessonData(topic, levelId);

  return `Siap, ${name}! Kita latihan reading di level CEFR ${getLevelLabel(levelId)}.

Topik: ${lesson.title}
Instruksi: ${profile.instruction}

READING_PASSAGE_START
${lesson.passage}
READING_PASSAGE_END

Kata kunci:
${lesson.vocabulary.map((word) => `- ${word}`).join('\n')}

Comprehension Questions:
${lesson.questions.join('\n')}

Sekarang jawab 5 pertanyaan di atas ya, ${name}. Kamu bisa ${profile.questionStyle}.`;
};

const buildReadingFeedback = (name: string, answer: string, topic: string, levelId?: string) => {
  const lesson = buildReadingLessonData(topic, levelId);
  const normalizedAnswer = answer.toLowerCase();
  const answerLines = answer.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const matchedAnswers = lesson.answers.filter((expected) =>
    expected
      .toLowerCase()
      .split(/\s+|,|\/| or /)
      .filter((token) => token.length > 3)
      .some((token) => normalizedAnswer.includes(token)),
  ).length;
  const answeredCount = Math.min(5, Math.max(answerLines.length, (answer.match(/\b[1-5][.)]/g) || []).length));
  const score = Math.min(100, Math.max(48, 45 + matchedAnswers * 9 + answeredCount * 2 + (normalizedAnswer.split(/\s+/).length > 24 ? 8 : 0)));
  const category = getSessionScoreCategory(score);

  return `Good job, ${name}! Ini feedback reading kamu:

Skor: ${score}/100
Kategori: ${category}

Yang sudah bagus:
- Kamu sudah mencoba menjawab berdasarkan teks.
- Jawabanmu menunjukkan usaha menangkap informasi utama.

Kunci jawaban ringkas:
1. ${lesson.answers[0]}
2. ${lesson.answers[1]}
3. ${lesson.answers[2]}
4. ${lesson.answers[3]}
5. ${lesson.answers[4]}

Tips reading:
- Untuk CEFR ${getLevelLabel(levelId)}, jangan translate semua kata.
- Cari main idea dulu, lalu detail pendukung.
- Kalau jawabanmu pendek, tambahkan bukti dari passage.

🔥 Reading Challenge, ${name}!
1. Tulis main idea passage dalam 1 kalimat.
2. Ambil 1 detail dari passage sebagai evidence.
3. Tulis 1 kata baru + artinya.`;
};

const buildReadingGameFeedback = (name: string, answer: string) => {
  const text = answer.toLowerCase();
  let score = 50;
  if (text.includes('main idea') || text.split(/[.!?]/).filter(Boolean).length >= 1) score += 15;
  if (text.includes('because') || text.includes('evidence') || text.includes('passage')) score += 15;
  if (text.includes('word') || text.includes('means') || text.includes('arti')) score += 10;
  if (answer.trim().split(/\s+/).length >= 18) score += 10;
  const finalScore = Math.min(100, score);

  return `Koreksi Reading Challenge:

✅ Main idea: harus menjelaskan inti teks, bukan hanya satu detail.
✅ Evidence: ambil detail yang benar-benar muncul di passage.
✅ New word: tulis kata + arti agar vocabulary kamu ikut naik.

Skor challenge: ${finalScore}/100
Kategori: ${getSessionScoreCategory(finalScore)}

Mau lanjut, ${name}?
- Reading topic baru 🔄
- Level up 🚀
- Challenge lagi 📖`;
};

export {
  readingTopicOptions,
  normalizeReadingTopic,
  buildReadingGreeting,
  buildReadingTopicQuestion,
  buildReadingLesson,
  buildReadingFeedback,
  buildReadingGameFeedback,
};
