import { getSessionScoreCategory } from './scoring';
import { getLevelLabel } from './vocabulary';
import { topicSelectOptions } from './vocabularyData';

const writingTopicOptions = [
  ...topicSelectOptions.map((option) => ({
    value: option.value,
    label: option.label,
  })),
  { value: 'custom-writing', label: 'Tulis topik sendiri' },
];

type WritingTask = {
  title: string;
  prompt: string;
  requirements: string[];
  usefulLanguage: string[];
  checklist: string[];
};

const normalizeWritingTopic = (value: string) => {
  const text = value.toLowerCase().trim();
  if (text.includes('custom')) return 'daily life';
  return text || 'daily life';
};

const titleCase = (text: string) =>
  text
    .replace(/[-_]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const getWritingLevelProfile = (levelId?: string) => {
  const level = getLevelLabel(levelId);
  if (level === 'A1') {
    return {
      wordTarget: '30-50 words',
      focus: 'simple sentences, subject + verb, basic punctuation',
      format: 'short paragraph',
    };
  }
  if (level === 'A2') {
    return {
      wordTarget: '50-80 words',
      focus: 'clear order, simple connectors, present/past tense',
      format: 'short paragraph or message',
    };
  }
  if (level === 'B1') {
    return {
      wordTarget: '90-130 words',
      focus: 'paragraph structure, reasons, examples, tense consistency',
      format: 'short email, opinion paragraph, or story',
    };
  }
  if (level === 'B2') {
    return {
      wordTarget: '140-180 words',
      focus: 'cohesion, argument, supporting details, natural vocabulary',
      format: 'essay paragraph, formal email, or review',
    };
  }
  return {
    wordTarget: '180-250 words',
    focus: 'nuance, register, advanced cohesion, precise word choice',
    format: 'formal response, essay, or critical reflection',
  };
};

const buildWritingTaskData = (topic: string, levelId?: string): WritingTask => {
  const normalizedTopic = normalizeWritingTopic(topic);
  const topicTitle = titleCase(normalizedTopic);
  const level = getLevelLabel(levelId);
  const profile = getWritingLevelProfile(levelId);

  if (level === 'A1' || level === 'A2') {
    return {
      title: `${topicTitle} Writing Practice`,
      prompt: `Write a short ${profile.format} about ${topicTitle.toLowerCase()}. Use simple sentences and make your meaning clear.`,
      requirements: [
        `Target: ${profile.wordTarget}`,
        'Use at least 3 complete sentences.',
        'Use I / my / there is / there are if useful.',
        'End each sentence with punctuation.',
      ],
      usefulLanguage: ['I like...', 'I have...', 'There is...', 'It is...', 'I want to...'],
      checklist: ['Capital letters', 'Subject + verb', 'Basic punctuation', 'Clear meaning'],
    };
  }

  if (level === 'B1' || level === 'B2') {
    return {
      title: `${topicTitle} Writing Task`,
      prompt: `Write a ${profile.format} about ${topicTitle.toLowerCase()}. Explain your main idea, add reasons, and include one example.`,
      requirements: [
        `Target: ${profile.wordTarget}`,
        'Use one clear opening sentence.',
        'Add at least 2 supporting details.',
        'Use connectors such as because, however, for example, or in addition.',
      ],
      usefulLanguage: ['In my opinion...', 'One reason is...', 'For example,...', 'However,...', 'In conclusion,...'],
      checklist: ['Main idea', 'Supporting details', 'Connectors', 'Tense consistency'],
    };
  }

  return {
    title: `${topicTitle} Advanced Writing`,
    prompt: `Write a ${profile.format} about ${topicTitle.toLowerCase()}. Present a clear position, develop it with evidence, and keep the register appropriate.`,
    requirements: [
      `Target: ${profile.wordTarget}`,
      'State a clear argument or perspective.',
      'Use precise vocabulary and varied sentence structure.',
      'Include evidence, contrast, or implication.',
    ],
    usefulLanguage: ['A key issue is...', 'This suggests that...', 'Nevertheless,...', 'From this perspective,...', 'A more nuanced view is...'],
    checklist: ['Argument clarity', 'Cohesion', 'Register', 'Vocabulary precision'],
  };
};

const buildWritingGreeting = () => 'Hi! Sebelum mulai writing practice, siapa namamu? 😊';

const buildWritingTopicQuestion = (name: string) => `Hai, ${name}! 👋
Makasih sudah belajar hari ini. Kita akan latihan writing dengan feedback yang jelas, practical, dan terasa seperti tutor pribadi ✍️🔥

${name}, kamu mau writing topic apa hari ini?
WRITING_TOPIC_SELECT`;

const buildWritingLesson = (name: string, topic: string, levelId?: string) => {
  const task = buildWritingTaskData(topic, levelId);
  const profile = getWritingLevelProfile(levelId);

  return `Siap, ${name}! Kita latihan writing di level CEFR ${getLevelLabel(levelId)}.

Topik: ${task.title}
Fokus level: ${profile.focus}

WRITING_PROMPT_START
${task.prompt}
WRITING_PROMPT_END

Requirements:
${task.requirements.map((item) => `- ${item}`).join('\n')}

Useful language:
${task.usefulLanguage.map((item) => `- ${item}`).join('\n')}

Checklist sebelum kirim:
${task.checklist.map((item) => `- ${item}`).join('\n')}

Sekarang tulis jawabanmu ya, ${name}. Setelah kamu kirim, aku akan koreksi grammar, structure, vocabulary, dan kasih nilai.`;
};

const splitSentences = (answer: string) =>
  answer.split(/\n+|(?<=[.!?])\s+/).map((line) => line.trim()).filter(Boolean);

const buildWritingFeedback = (name: string, answer: string, topic: string, levelId?: string) => {
  const task = buildWritingTaskData(topic, levelId);
  const words = answer.trim().split(/\s+/).filter(Boolean);
  const sentences = splitSentences(answer);
  const hasConnector = /\b(because|but|and|so|however|although|for example|in addition|therefore|nevertheless)\b/i.test(answer);
  const hasCapitalStart = /^[A-Z]/.test(answer.trim());
  const hasPunctuation = /[.!?]$/.test(answer.trim());
  const likelySubjectVerb = /\b(i|you|we|they|he|she|it|there|my|the|a|an)\b.+\b(am|is|are|was|were|have|has|had|do|does|did|go|goes|went|like|likes|want|wants|study|studies|learn|learns|can|will|should|would)\b/i.test(answer);
  const score = Math.min(
    100,
    Math.max(
      45,
      42 +
        Math.min(words.length, 120) * 0.22 +
        Math.min(sentences.length, 6) * 5 +
        (hasConnector ? 10 : 0) +
        (hasCapitalStart ? 6 : 0) +
        (hasPunctuation ? 6 : 0) +
        (likelySubjectVerb ? 10 : 0),
    ),
  );
  const finalScore = Math.round(score);
  const firstSentence = sentences[0] || answer.trim();
  const improved = firstSentence
    .replace(/\bi\b/g, 'I')
    .replace(/\s+/g, ' ')
    .replace(/[.!?]?$/, '.');
  const category = getSessionScoreCategory(finalScore);

  return `Nice work, ${name}! Ini feedback writing kamu:

Task: ${task.title}
Skor: ${finalScore}/100
Kategori: ${category}

Grammar:
${likelySubjectVerb ? '✅ Struktur subject + verb sudah cukup jelas.' : '⚠️ Beberapa kalimat perlu subject + verb yang lebih jelas.'}

Structure:
${sentences.length >= 3 ? '✅ Kamu sudah menulis beberapa kalimat, jadi ide lebih mudah diikuti.' : '⚠️ Tambahkan minimal 3 kalimat agar tulisan terasa lengkap.'}

Vocabulary:
${words.length >= 40 ? '✅ Vocabulary sudah cukup berkembang untuk latihan ini.' : '⚠️ Tambahkan detail kecil agar vocabulary lebih kaya.'}

Mechanics:
- Capital letter: ${hasCapitalStart ? '✅' : '⚠️'}
- Ending punctuation: ${hasPunctuation ? '✅' : '⚠️'}
- Connector: ${hasConnector ? '✅' : '⚠️'}

Versi lebih rapi dari salah satu kalimat:
"${improved}"

Tips tutor:
Fokus ke ${getWritingLevelProfile(levelId).focus}. Untuk topik ini, pastikan jawabanmu tetap menjawab prompt: "${task.prompt}"

🔥 Writing Challenge, ${name}!
1. Revisi tulisanmu menjadi lebih rapi.
2. Tambahkan 1 connector seperti because/however/for example.
3. Tambahkan 1 detail baru.`;
};

const buildWritingGameFeedback = (name: string, answer: string) => {
  const text = answer.toLowerCase();
  let score = 50;
  if (text.includes('because') || text.includes('however') || text.includes('for example')) score += 18;
  if (answer.trim().split(/\s+/).length >= 35) score += 14;
  if (/[.!?]$/.test(answer.trim())) score += 8;
  if (splitSentences(answer).length >= 3) score += 10;
  const finalScore = Math.min(100, score);

  return `Koreksi Writing Challenge:

✅ Revisi terbaik biasanya punya main idea yang jelas.
✅ Connector membuat tulisan lebih natural dan mudah diikuti.
✅ Detail tambahan membuat jawaban terasa lebih hidup.

Skor challenge: ${finalScore}/100
Kategori: ${getSessionScoreCategory(finalScore)}

Mau lanjut, ${name}?
- Writing topic baru 🔄
- Level up 🚀
- Revisi lagi ✍️`;
};

export {
  writingTopicOptions,
  normalizeWritingTopic,
  buildWritingGreeting,
  buildWritingTopicQuestion,
  buildWritingLesson,
  buildWritingFeedback,
  buildWritingGameFeedback,
};
