import { getLevelLabel } from './vocabulary';
import { topicSelectOptions } from './vocabularyData';

const pronunciationTopicOptions = [
  ...topicSelectOptions
    .filter((option) => option.value !== 'custom-topic')
    .map((option) => ({ value: option.value, label: option.label })),
  { value: 'custom-pronunciation', label: 'Tulis fokus sendiri' },
];
type PronunciationWord = {
  sentence: string;
  phonetic: string;
  focus: string;
  tip: string;
};

const pronunciationSentencesByTopic: Record<string, PronunciationWord[]> = {
  'daily conversation': [
    { sentence: 'Hello, thanks for waiting.', phonetic: '/həˈloʊ, θæŋks fər ˈweɪtɪŋ/', focus: 'th + ending -ing', tip: 'Ucapkan thanks dengan lidah sedikit keluar, lalu waiting berakhir /ɪŋ/.' },
    { sentence: 'How are you today?', phonetic: '/haʊ ɑːr ju təˈdeɪ/', focus: 'r + rising intonation', tip: 'Naikkan nada di akhir karena ini pertanyaan.' },
    { sentence: 'Could you please repeat that?', phonetic: '/kʊd ju pliːz rɪˈpiːt ðæt/', focus: 'please + th voiced', tip: 'ð pada that lebih bersuara daripada th pada thanks.' },
    { sentence: 'I am sorry I was late.', phonetic: '/aɪ əm ˈsɑːri aɪ wəz leɪt/', focus: 'sorry + late', tip: 'Tarik vowel pada sorry, lalu tutup late dengan /t/ jelas.' },
    { sentence: 'That sounds really good.', phonetic: '/ðæt saʊndz ˈrɪəli ɡʊd/', focus: 'ð + really', tip: 'Awali that dengan ð, bukan d atau z.' },
    { sentence: 'Can you say it again?', phonetic: '/kæn ju seɪ ɪt əˈɡen/', focus: 'linking', tip: 'Sambungkan say it menjadi “say-yit”.' },
    { sentence: 'I need a little help.', phonetic: '/aɪ niːd ə ˈlɪtəl help/', focus: 'little', tip: 'American English sering membuat little seperti “lid-l”.' },
    { sentence: 'Let me check my schedule.', phonetic: '/let mi tʃek maɪ ˈskedʒuːl/', focus: 'schedule', tip: 'Gunakan /sk/ di awal untuk American pronunciation.' },
    { sentence: 'I would like some water.', phonetic: '/aɪ wʊd laɪk səm ˈwɔːtər/', focus: 'would + water', tip: 'Would tidak dibaca “wuld” terlalu keras; d hampir halus.' },
    { sentence: 'Nice to meet you.', phonetic: '/naɪs tə miːt ju/', focus: 'meet you', tip: 'Meet you bisa terdengar seperti “mee-chu” secara natural.' },
    { sentence: 'What do you mean?', phonetic: '/wʌt də ju miːn/', focus: 'do you', tip: 'Do you sering melebur menjadi “duh-yu”.' },
    { sentence: 'I think so too.', phonetic: '/aɪ θɪŋk soʊ tuː/', focus: 'think', tip: 'θ bukan t. Lidah sedikit di antara gigi.' },
    { sentence: 'Please call me later.', phonetic: '/pliːz kɔːl mi ˈleɪtər/', focus: 'please + later', tip: 'Tekankan later pada suku kata pertama.' },
    { sentence: 'See you tomorrow morning.', phonetic: '/siː ju təˈmɑːroʊ ˈmɔːrnɪŋ/', focus: 'tomorrow + morning', tip: 'Tekankan tomorrow di bagian /mɑː/.' },
    { sentence: 'Have a wonderful day.', phonetic: '/hæv ə ˈwʌndərfəl deɪ/', focus: 'wonderful', tip: 'Wonderful biasanya tiga ketukan: WUN-der-ful.' },
  ],
  'difficult words': [
    { sentence: 'I think the world is beautiful.', phonetic: '/aɪ θɪŋk ðə wɝːld ɪz ˈbjuːtɪfəl/', focus: 'think + world', tip: 'Latih θ pada think, lalu tahan r pada world.' },
    { sentence: 'This vegetable soup is comfortable to eat.', phonetic: '/ðɪs ˈvedʒtəbəl suːp ɪz ˈkʌmftərbəl tu iːt/', focus: 'vegetable + comfortable', tip: 'Vegetable dan comfortable tidak perlu dibaca per huruf.' },
    { sentence: 'We walked through the third door.', phonetic: '/wi wɔːkt θruː ðə θɝːd dɔːr/', focus: 'through + third', tip: 'Tiga kata th: through, the, third. Bedakan θ dan ð.' },
    { sentence: 'The rural road was very quiet.', phonetic: '/ðə ˈrʊrəl roʊd wəz ˈveri ˈkwaɪət/', focus: 'rural + very', tip: 'Rural punya dua r. Ucapkan pelan dulu.' },
    { sentence: 'My schedule changes every Wednesday.', phonetic: '/maɪ ˈskedʒuːl ˈtʃeɪndʒɪz ˈevri ˈwenzdeɪ/', focus: 'schedule + Wednesday', tip: 'Wednesday tidak dibaca wed-nes-day; cukup WENZ-day.' },
    { sentence: 'She bought enough clothes for the trip.', phonetic: '/ʃi bɔːt ɪˈnʌf kloʊðz fər ðə trɪp/', focus: 'enough + clothes', tip: 'Enough berakhir /f/, clothes berakhir /ðz/.' },
    { sentence: 'I rarely order regular coffee.', phonetic: '/aɪ ˈrerli ˈɔːrdər ˈreɡjələr ˈkɔːfi/', focus: 'rarely + regular', tip: 'Jaga r tetap lembut dan jelas.' },
    { sentence: 'The weather was worse than yesterday.', phonetic: '/ðə ˈweðər wəz wɝːs ðən ˈjestərdeɪ/', focus: 'weather + worse', tip: 'Weather memakai ð, bukan d.' },
    { sentence: 'Please pronounce the word correctly.', phonetic: '/pliːz prəˈnaʊns ðə wɝːd kəˈrektli/', focus: 'pronounce + word', tip: 'Tekankan pronounce pada /naʊns/.' },
    { sentence: 'The squirrel ran around the tree.', phonetic: '/ðə ˈskwɪrəl ræn əˈraʊnd ðə triː/', focus: 'squirrel + around', tip: 'Squirrel cukup dua ketukan: SKWIR-rel.' },
    { sentence: 'I feel comfortable speaking slowly.', phonetic: '/aɪ fiːl ˈkʌmftərbəl ˈspiːkɪŋ ˈsloʊli/', focus: 'comfortable + slowly', tip: 'Tekankan slow pada slowly.' },
    { sentence: 'Three friends traveled through Europe.', phonetic: '/θriː frendz ˈtrævəld θruː ˈjʊrəp/', focus: 'three + through', tip: 'Pastikan three bukan tree.' },
    { sentence: 'The girl wore jewelry to school.', phonetic: '/ðə ɡɝːl wɔːr ˈdʒuːəlri tu skuːl/', focus: 'girl + jewelry', tip: 'Jewelry sering terdengar seperti JOO-el-ree.' },
    { sentence: 'He asked a specific question.', phonetic: '/hi æskt ə spəˈsɪfɪk ˈkwestʃən/', focus: 'asked + specific', tip: 'Asked berakhir /skt/, jangan hilangkan /t/.' },
    { sentence: 'They usually choose the right answer.', phonetic: '/ðeɪ ˈjuːʒuəli tʃuːz ðə raɪt ˈænsər/', focus: 'usually + choose', tip: 'Usually memakai bunyi /ʒ/ seperti “zh”.' },
  ],
  'minimal pairs': [
    { sentence: 'The ship is near the sheep.', phonetic: '/ðə ʃɪp ɪz nɪr ðə ʃiːp/', focus: '/ɪ/ vs /iː/', tip: 'Ship pendek, sheep panjang.' },
    { sentence: 'I bit the bread and felt the beat.', phonetic: '/aɪ bɪt ðə bred ænd felt ðə biːt/', focus: 'bit vs beat', tip: 'Beat ditahan lebih lama.' },
    { sentence: 'Please sit on this seat.', phonetic: '/pliːz sɪt ɑːn ðɪs siːt/', focus: 'sit vs seat', tip: 'Seat panjang /iː/.' },
    { sentence: 'The cap is in the cup.', phonetic: '/ðə kæp ɪz ɪn ðə kʌp/', focus: '/æ/ vs /ʌ/', tip: 'Cap mulut lebih lebar, cup lebih santai.' },
    { sentence: 'He left the light on.', phonetic: '/hi left ðə laɪt ɑːn/', focus: 'left vs light', tip: 'Light memakai diftong /aɪ/.' },
    { sentence: 'The fan is in the van.', phonetic: '/ðə fæn ɪz ɪn ðə væn/', focus: 'f vs v', tip: 'V bergetar di bibir bawah.' },
    { sentence: 'I saw three trees.', phonetic: '/aɪ sɔː θriː triːz/', focus: 'three vs tree', tip: 'Three diawali th, tree diawali t.' },
    { sentence: 'Do not pull the pool rope.', phonetic: '/du nɑːt pʊl ðə puːl roʊp/', focus: 'pull vs pool', tip: 'Pool lebih panjang dan bibir lebih bulat.' },
    { sentence: 'The word was read in red ink.', phonetic: '/ðə wɝːd wəz red ɪn red ɪŋk/', focus: 'read vs red', tip: 'Di sini read past tense berbunyi seperti red.' },
    { sentence: 'The men saw the man.', phonetic: '/ðə men sɔː ðə mæn/', focus: 'men vs man', tip: 'Man memakai /æ/ dengan mulut lebih lebar.' },
    { sentence: 'I want a full file.', phonetic: '/aɪ wɑːnt ə fʊl faɪl/', focus: 'full vs file', tip: 'File memakai /aɪ/.' },
    { sentence: 'She chose cheap chips.', phonetic: '/ʃi tʃoʊz tʃiːp tʃɪps/', focus: 'cheap vs chips', tip: 'Cheap panjang, chips pendek.' },
    { sentence: 'The beach is not a bench.', phonetic: '/ðə biːtʃ ɪz nɑːt ə bentʃ/', focus: 'beach vs bench', tip: 'Beach punya vowel panjang /iː/.' },
    { sentence: 'The coat is on the cot.', phonetic: '/ðə koʊt ɪz ɑːn ðə kɑːt/', focus: 'coat vs cot', tip: 'Coat memakai /oʊ/ dua gerakan.' },
    { sentence: 'I heard a low law sound.', phonetic: '/aɪ hɝːd ə loʊ lɔː saʊnd/', focus: 'low vs law', tip: 'Low berakhir /oʊ/, law lebih terbuka.' },
  ],
  'sentence intonation': [
    { sentence: 'Are you ready today?', phonetic: '/ɑːr ju ˈredi təˈdeɪ/', focus: 'rising question', tip: 'Naikkan nada di akhir today.' },
    { sentence: 'I am ready today.', phonetic: '/aɪ əm ˈredi təˈdeɪ/', focus: 'falling statement', tip: 'Turunkan nada di akhir.' },
    { sentence: 'Really? You finished it?', phonetic: '/ˈrɪəli ju ˈfɪnɪʃt ɪt/', focus: 'surprise', tip: 'Really naik, lalu finished it lebih tegas.' },
    { sentence: 'I practiced because I wanted to improve.', phonetic: '/aɪ ˈpræktɪst bɪˈkɔːz aɪ ˈwɑːntɪd tu ɪmˈpruːv/', focus: 'because clause', tip: 'Tekankan wanted dan improve.' },
    { sentence: 'First, listen. Then, repeat.', phonetic: '/fɝːst ˈlɪsən ðen rɪˈpiːt/', focus: 'chunking', tip: 'Beri jeda pendek setelah first dan then.' },
    { sentence: 'Could you say that again?', phonetic: '/kʊd ju seɪ ðæt əˈɡen/', focus: 'polite rising tone', tip: 'Nada naik lembut, bukan terlalu tinggi.' },
    { sentence: 'I like English, but pronunciation is hard.', phonetic: '/aɪ laɪk ˈɪŋɡlɪʃ bət prəˌnʌnsiˈeɪʃən ɪz hɑːrd/', focus: 'contrast', tip: 'Tekankan but untuk kontras.' },
    { sentence: 'When I speak slowly, I sound clearer.', phonetic: '/wen aɪ spiːk ˈsloʊli aɪ saʊnd ˈklɪrər/', focus: 'sentence rhythm', tip: 'Jeda kecil setelah slowly.' },
    { sentence: 'Do you want tea or coffee?', phonetic: '/du ju wɑːnt tiː ɔːr ˈkɔːfi/', focus: 'choice question', tip: 'Tea naik sedikit, coffee turun.' },
    { sentence: 'What would you like to practice?', phonetic: '/wʌt wʊd ju laɪk tu ˈpræktɪs/', focus: 'wh-question', tip: 'Wh-question biasanya turun di akhir.' },
    { sentence: 'This is easy, right?', phonetic: '/ðɪs ɪz ˈiːzi raɪt/', focus: 'tag question', tip: 'Right bisa naik kalau kamu ingin konfirmasi.' },
    { sentence: 'No, I said thirteen, not thirty.', phonetic: '/noʊ aɪ sed θɝːˈtiːn nɑːt ˈθɝːti/', focus: 'contrastive stress', tip: 'Tekankan thirteen dan thirty secara berbeda.' },
    { sentence: 'I can speak clearly when I slow down.', phonetic: '/aɪ kæn spiːk ˈklɪrli wen aɪ sloʊ daʊn/', focus: 'confidence tone', tip: 'Jaga ritme stabil, jangan terburu-buru.' },
    { sentence: 'That was better than before.', phonetic: '/ðæt wəz ˈbetər ðən bɪˈfɔːr/', focus: 'feedback tone', tip: 'Turunkan nada pada before.' },
    { sentence: 'Let us try one more time.', phonetic: '/let əs traɪ wʌn mɔːr taɪm/', focus: 'encouraging tone', tip: 'Ucapkan one more time dengan nada positif.' },
  ],
};

const normalizePronunciationTopic = (value: string) => {
  const text = value.toLowerCase().trim();
  if (text.includes('minimal') || text.includes('ship') || text.includes('sheep')) return 'minimal pairs';
  if (text.includes('difficult') || text.includes('sulit')) return 'difficult words';
  if (text.includes('intonation') || text.includes('intonasi') || text.includes('sentence')) return 'sentence intonation';
  if (
    text.includes('daily') ||
    text.includes('conversation') ||
    text.includes('greeting') ||
    text.includes('introduction') ||
    text.includes('family') ||
    text.includes('relationship') ||
    text.includes('routine') ||
    text.includes('food') ||
    text.includes('shopping') ||
    text.includes('travel') ||
    text.includes('holiday') ||
    text.includes('place') ||
    text.includes('direction') ||
    text.includes('transportation') ||
    text.includes('commuting') ||
    text.includes('customer service')
  ) return 'daily conversation';
  if (
    text.includes('opinion') ||
    text.includes('preference') ||
    text.includes('connector') ||
    text.includes('linking') ||
    text.includes('transition') ||
    text.includes('presentation') ||
    text.includes('public speaking') ||
    text.includes('debate') ||
    text.includes('argumentation') ||
    text.includes('doubt') ||
    text.includes('certainty') ||
    text.includes('cause') ||
    text.includes('effect') ||
    text.includes('comparing') ||
    text.includes('contrasting') ||
    text.includes('hypothesizing') ||
    text.includes('speculating') ||
    text.includes('persuasion') ||
    text.includes('influence') ||
    text.includes('formal') ||
    text.includes('informal')
  ) return 'sentence intonation';
  if (
    text.includes('synonym') ||
    text.includes('antonym') ||
    text.includes('phrasal') ||
    text.includes('idiom') ||
    text.includes('proverb') ||
    text.includes('slang') ||
    text.includes('colloquialism') ||
    text.includes('academic') ||
    text.includes('legal') ||
    text.includes('medical') ||
    text.includes('healthcare') ||
    text.includes('technology') ||
    text.includes('science') ||
    text.includes('artificial intelligence') ||
    text.includes('robotics')
  ) return 'difficult words';
  if (
    text.includes('review') ||
    text.includes('mastery') ||
    text.includes('sound') ||
    text.includes('pronunciation')
  ) return 'minimal pairs';
  return text || 'daily conversation';
};

const getPronunciationSentences = (topic: string) =>
  pronunciationSentencesByTopic[normalizePronunciationTopic(topic)] || pronunciationSentencesByTopic['difficult words'];

const getPronunciationBatch = (topic: string, batchIndex: number) =>
  getPronunciationSentences(topic).slice(batchIndex * 2, batchIndex * 2 + 2);

const buildPracticeInstruction = (topic: string, batchIndex: number) => {
  const batch = getPronunciationBatch(topic, batchIndex);
  const start = batchIndex * 2 + 1;
  const end = start + batch.length - 1;
  if (!batch.length) return '';
  return `Sekarang wajib pakai microphone ya 🎙️
Coba praktikkan kalimat ${start}${end > start ? ` dan ${end}` : ''}. Tekan tombol mic, baca kalimatnya, lalu berhenti sebentar supaya transcript terkirim otomatis.`;
};

const buildPronunciationSentenceTable = (sentences: PronunciationWord[]) => [
  'PRONUNCIATION_TABLE_START',
  ...sentences.map((item) => `${item.sentence}|${item.phonetic}|${item.focus}|${item.tip}`),
  'PRONUNCIATION_TABLE_END',
].join('\n');

const buildPronunciationGreeting = () => 'Hi! Sebelum mulai, siapa namamu? 😊';

const buildPronunciationTopicQuestion = (name: string) => `Hai, ${name}! 👋
Makasih sudah belajar hari ini ya! Kita bakal latihan pronunciation biar makin pede ngomong Inggris 😄🔥

${name}, kamu mau latihan apa hari ini?
PRONUNCIATION_TOPIC_SELECT`;

const buildPronunciationLesson = (name: string, topic: string, levelId?: string) => {
  const normalized = normalizePronunciationTopic(topic);
  const sentences = getPronunciationSentences(normalized);

  return `Siap, ${name}! Aku jadi pronunciation coach kamu hari ini 🔊

Fokus: ${normalized}
Level: ${getLevelLabel(levelId)}

Cara mainnya:
Aku kasih 15 kalimat lengkap dengan IPA. Kamu praktik lewat microphone, lalu aku koreksi transcript pengucapanmu dan kasih feedback.

${buildPronunciationSentenceTable(sentences)}

${buildPracticeInstruction(normalized, 0)}`;
};

const buildPronunciationFeedback = (name: string, answer: string, topic: string, turn: number) => {
  const currentBatch = getPronunciationBatch(topic, turn);
  const nextBatch = getPronunciationBatch(topic, turn + 1);
  const text = answer.toLowerCase();
  const expectedKeywords = currentBatch.flatMap((item) =>
    item.sentence.toLowerCase().replace(/[^\w\s']/g, '').split(/\s+/).filter((word) => word.length > 3),
  );
  const matchedCount = expectedKeywords.filter((word) => text.includes(word)).length;
  const clarityScore = expectedKeywords.length ? Math.round((matchedCount / expectedKeywords.length) * 100) : 70;
  const score = Math.max(55, Math.min(95, clarityScore + 20));
  const currentNumbers = currentBatch.map((_, index) => turn * 2 + index + 1).join(' dan ');
  const focusFeedback = currentBatch.map((item, index) => {
    const number = turn * 2 + index + 1;
    return `${number}. "${item.sentence}"
   IPA: ${item.phonetic}
   Fokus: ${item.focus}
   Tips: ${item.tip}`;
  }).join('\n\n');

  if (!nextBatch.length) {
    return `Mantap, ${name}! Ini feedback untuk kalimat ${currentNumbers}.

Aku baca jawaban/transkripmu:
"${answer}"

Feedback pronunciation:
✅ Keberanian speaking kamu sudah bagus.
✅ Transcript cukup terbaca untuk latihan microphone.
⚠️ Fokus perbaikan:
${focusFeedback}

Skor clarity sementara: ${score}/100

🎉 Kamu sudah menyelesaikan 15 kalimat pronunciation hari ini.

🔥 Pronunciation Challenge, ${name}!
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
  }

  return `Good job, ${name}! Ini feedback untuk kalimat ${currentNumbers}.

Aku baca jawaban/transkripmu:
"${answer}"

Feedback pronunciation:
✅ Kamu sudah latihan dengan microphone, ini bagus untuk speaking confidence.
⚠️ Fokus perbaikan:
${focusFeedback}

Skor clarity sementara: ${score}/100

${buildPracticeInstruction(topic, turn + 1)}`;
};

const buildPronunciationGameFeedback = (name: string, answer: string) => {
  const text = answer.toLowerCase();
  let score = 40;
  if (text.includes('c') || text.includes('thingk') || text.includes('think')) score += 20;
  if (text.includes('b') || text.includes('sheep')) score += 20;
  if (text.includes('a') || text.includes('naik') || text.includes('rising')) score += 20;
  score = Math.min(100, score);
  const category = score >= 90 ? 'Excellent Speaker 🌟' : score >= 70 ? 'Good Progress 👍' : 'Keep Practicing 💪';

  return `Koreksi Pronunciation Challenge:
1. Jawaban terbaik: C) thingk.
   θ ≠ t/s. Lidah sedikit di antara gigi.

2. Jawaban: B) sheep.
   sheep punya bunyi /iː/ panjang.

3. Jawaban: A) naik di akhir.
   Yes/no question biasanya memakai rising intonation.

Skor kamu: ${score}/100
Kategori: ${category}

Mau lanjut, ${name}?
- Latihan lagi 🔁
- Ganti topik 🔄
- Naik level 🚀`;
};

export {
  pronunciationTopicOptions,
  normalizePronunciationTopic,
  buildPronunciationGreeting,
  buildPronunciationTopicQuestion,
  buildPronunciationLesson,
  buildPronunciationFeedback,
  buildPronunciationGameFeedback,
};
