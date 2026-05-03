import type { VocabularyRow } from '../types';

import {
  vocabularyExamples,
  vocabularyMeanings,
  vocabularyParts,
  vocabularyPhonetics,
} from './vocabularyLexicon';

import {
  cefrLevelVocabulary,
  fallbackPartsOfSpeech,
  fallbackVocabulary,
  topicSelectOptions,
  topicVocabulary,
  topicVocabularyByLevel,
} from './vocabularyData';

const getVocabularyPart = (word: string, index: number) =>
  vocabularyParts[word] || (word.includes(' ') ? 'phrase' : fallbackPartsOfSpeech[index % fallbackPartsOfSpeech.length]);

const getExampleSentence = (word: string, topic: string, pos: string) => {
  if (vocabularyExamples[word]) return vocabularyExamples[word];
  if (pos === 'verb') return `I want to ${word} better in English.`;
  if (pos === 'adjective') return `This is a ${word} example for ${topic}.`;
  if (pos === 'adverb') return `I ${word} practice English after class.`;
  if (pos === 'phrase') return `"${word}" is useful in casual English.`;
  return `We talked about ${word} in today's ${topic} lesson.`;
};

const normalizeLevel = (levelId?: string) => {
  const level = (levelId || 'a1').toLowerCase();
  return cefrLevelVocabulary[level] ? level : 'a1';
};

const getLevelLabel = (levelId?: string) => normalizeLevel(levelId).toUpperCase();

const normalizeTopic = (value: string) => {
  const text = value.toLowerCase();
  if (text.includes('school')) return 'school';
  if (text.includes('business')) return 'business';
  if (text.includes('travel')) return 'travel';
  if (text.includes('tech')) return 'technology';
  if (text.includes('slang') || text.includes('casual')) return 'slang';
  if (text.includes('daily') || text.includes('life')) return 'daily life';
  return text.trim() || 'daily life';
};

const stripPhoneticSlashes = (ipa: string) => ipa.replace(/^\/|\/$/g, '');

const makePhonetic = (word: string) => {
  const normalized = word.toLowerCase().trim().replace(/\s+/g, ' ');
  if (vocabularyPhonetics[normalized]) return vocabularyPhonetics[normalized];

  const parts = normalized.split(/\s+/).filter(Boolean);
  if (parts.length > 1 && parts.every((part) => vocabularyPhonetics[part])) {
    return `/${parts.map((part) => stripPhoneticSlashes(vocabularyPhonetics[part])).join(' ')}/`;
  }

  return '/IPA unavailable/';
};

function buildVocabularyRows(topicInput: string, levelId?: string): VocabularyRow[] {
  const topic = normalizeTopic(topicInput);
  const level = normalizeLevel(levelId);
  const topicWords = topicVocabularyByLevel[topic]?.[level] || topicVocabulary[topic] || topic.split(/[\s,]+/).filter(Boolean).slice(0, 10);
  const words = [...topicWords, ...cefrLevelVocabulary[level]];
  const uniqueWords = Array.from(new Set(words)).slice(0, 30);
  let fallbackIndex = 0;
  while (uniqueWords.length < 30) {
    const nextWord = cefrLevelVocabulary[level][fallbackIndex % cefrLevelVocabulary[level].length] || fallbackVocabulary[fallbackIndex % fallbackVocabulary.length];
    fallbackIndex += 1;
    if (!uniqueWords.includes(nextWord)) {
      uniqueWords.push(nextWord);
    }
  }

  return uniqueWords.map((word, index) => {
    const pos = getVocabularyPart(word, index);
    return {
      word,
      phonetic: makePhonetic(word),
      meaning: vocabularyMeanings[word] || word,
      pos,
      example: getExampleSentence(word, topic, pos),
    };
  });
}

function buildVocabularyTable(topicInput: string, levelId?: string) {
  const rows = buildVocabularyRows(topicInput, levelId);
  return [
    'VOCAB_TABLE_START',
    ...rows.map((row) => [row.word, row.phonetic, row.meaning, row.pos, row.example].join('|')),
    'VOCAB_TABLE_END',
  ].join('\n');
}

const buildVocabularyGreeting = () => 'Hi! Sebelum mulai, siapa namamu?';

const getVocabularyPracticeWords = (topic: string, levelId?: string, offset = 0) =>
  buildVocabularyRows(topic || 'daily life', levelId).slice(offset, offset + 3).map((row) => row.word);

const getWordsUsedInAnswer = (answer: string, words: string[]) => {
  const text = answer.toLowerCase();
  return words.filter((word) => text.includes(word.toLowerCase()));
};

const buildPracticeWordList = (words: string[], startIndex = 0) =>
  words.map((word, index) => `${startIndex + index + 1}. ${word}`).join('\n');

const buildRemainingPracticeWordList = (words: string[], targetWords: string[], offset: number) =>
  words.map((word) => `${offset + targetWords.indexOf(word) + 1}. ${word}`).join('\n');

const buildTopicQuestion = (name: string) => `Hai, ${name}! 👋
Makasih sudah mau belajar hari ini ya, semangat! 🔥
Kita bakal belajar bahasa Inggris dengan cara seru 😄

Pilih topik yang kamu mau:
TOPIC_SELECT`;

const buildVocabularyPrompt = (name: string, topic: string, levelId?: string) => `Siap, ${name}! Kita pakai topik "${topic}" di level CEFR ${getLevelLabel(levelId)}.

Aku kasih 30 vocabulary yang sudah disesuaikan dengan level CEFR ${getLevelLabel(levelId)} dulu ya:

${buildVocabularyTable(topic, levelId)}

Bagaimana, ${name}? Sudah lumayan banyak ya kata baru yang bisa kita pelajari!

Sekarang, yuk kita coba pakai beberapa kata ini dalam kalimat. Saya mau ${name} membuat 3 kalimat menggunakan kata-kata berikut:

${buildPracticeWordList(getVocabularyPracticeWords(topic, levelId))}

Jangan ragu untuk berkreasi ya. Saya tunggu kalimat-kalimat buatan ${name}. Semangat! 💪`;

const buildSentenceFeedback = (
  name: string,
  answer: string,
  topic: string,
  levelId: string | undefined,
  completedWords: string[],
  offset = 0,
  nextWords: string[] = [],
) => {
  const targetWords = getVocabularyPracticeWords(topic, levelId, offset);
  const remainingWords = targetWords.filter((word) => !completedWords.includes(word));
  const lines = answer.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const checked = (lines.length ? lines : [answer]).slice(0, 3).map((line, index) => {
    const hasSubject = /\b(i|you|we|they|he|she|it|my|the|a|an)\b/i.test(line);
    const hasVerb = /\b(am|is|are|was|were|have|has|do|does|did|go|use|like|learn|practice|make|work|study|travel|need|want)\b/i.test(line);
    const status = hasSubject && hasVerb ? '✅' : hasSubject || hasVerb ? '⚠️' : '❌';
    return `${status} "${line}"
${hasSubject && hasVerb
  ? 'Kalimat ini sudah punya subject dan verb, jadi strukturnya enak dibaca.'
  : 'Idenya sudah ada. Biar lebih lengkap, tambahkan subject + verb yang jelas ya.'}`;
  }).join('\n\n');

  if (remainingWords.length > 0) {
    return `Wah, bagus sekali, ${name}! Saya suka kamu sudah mulai memakai kosakata dari daftar tadi.

${checked}

Nah, masih ada ${remainingWords.length} kata lagi yang bisa ${name} coba buatkan kalimatnya:

${buildRemainingPracticeWordList(remainingWords, targetWords, offset)}

Yuk, lanjut pelan-pelan. Saya yakin ${name} bisa membuat kalimat yang lebih natural lagi. Saya tunggu ya! 😊`;
  }

  if (nextWords.length > 0) {
    return `Mantap, ${name}! Batch ${Math.floor(offset / 3) + 1} sudah selesai. Kalimatmu sudah mengarah ke konteks yang tepat dan makin natural.

${checked}

Sekarang lanjut batch berikutnya ya. Buat 3 kalimat baru memakai kata-kata ini:

${buildPracticeWordList(nextWords, offset + 3)}

Pelan-pelan saja. Target kita sampai semua 30 vocabulary kepakai dalam kalimat. 💪`;
  }

  return `${checked}

Sempurna, ${name}! Semua 30 vocabulary sudah kamu coba pakai. Secara umum, kalimatmu sudah mengarah ke konteks yang tepat dan mudah dipahami.

Hebat banget! Karena ${name} sudah semangat, kita lanjut ke challenge kecil yang lebih menantang ya.

🎉 +15 XP untuk kamu!

🔥 Challenge Time, ${name}!
Jawab 3 soal ini dengan jelas:
1. Multiple choice: Kalimat mana yang paling natural?
   A) I ${targetWords[0]} yesterday.
   B) I learned the word "${targetWords[0]}" today.
   C) I very ${targetWords[0]}.

2. Fill in the blank:
   Please make one sentence with "${targetWords[1]}".

3. Tantangan kalimat:
   Buat 1 kalimat baru yang memakai "${targetWords[2]}" dan tambahkan detail waktu atau tempat.`;
};

const buildGameFeedback = (name: string, answer: string, topic: string, levelId?: string) => {
  const targetWords = getVocabularyPracticeWords(topic, levelId);
  const text = answer.toLowerCase();
  let score = 40;
  if (text.includes('b') || text.includes(targetWords[0].toLowerCase())) score += 20;
  if (text.includes(targetWords[1].toLowerCase())) score += 20;
  if (text.includes(targetWords[2].toLowerCase()) && /\b(today|yesterday|tomorrow|at|in|on|near|after|before)\b/i.test(text)) score += 20;
  score = Math.min(100, score);
  const category = score >= 90 ? 'Excellent 🌟' : score >= 70 ? 'Good 👍' : 'Keep Practicing 💪';

  return `Nice, ${name}! Ini feedback untuk challenge kamu:

1. Multiple choice:
Jawaban terbaik: B) I learned the word "${targetWords[0]}" today.

2. Fill in the blank:
Kalimatmu dinilai dari apakah sudah memakai "${targetWords[1]}" dengan jelas.

3. Tantangan kalimat:
Kalimat terbaik memakai "${targetWords[2]}" plus detail waktu/tempat supaya terdengar lebih natural.

Skor kamu: ${score}/100
Kategori: ${category}

Catatan mentor:
${score >= 80 ? 'Kamu sudah siap naik ke latihan yang sedikit lebih menantang. Coba buat kalimat yang lebih panjang dengan connector seperti because, when, atau after.' : 'Kita pelan-pelan dulu. Fokus utama: satu kalimat lengkap harus punya subject + verb + ide yang jelas.'}

Mau lanjut, ${name}?
- Level up 🚀
- Ganti topik 🔄
- Main game lagi 🎮`;
};

export {
  topicSelectOptions,
  normalizeTopic,
  getLevelLabel,
  buildVocabularyRows,
  buildVocabularyGreeting,
  getVocabularyPracticeWords,
  getWordsUsedInAnswer,
  buildTopicQuestion,
  buildVocabularyPrompt,
  buildSentenceFeedback,
  buildGameFeedback,
};
