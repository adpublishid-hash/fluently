import type { TargetLanguage } from './targetLanguage';

type ChatFocus = 'vocabulary' | 'grammar' | 'pronunciation' | 'speaking' | 'reading' | 'writing' | string | undefined;
type TopicOption = { value: string; label: string };
type LanguageProfile = {
  languageName: string;
  greeting: string;
  topicHint: string;
  sample: string;
  vocabularyRows: Array<{ word: string; phonetic: string; meaning: string; pos: string; example: string }>;
  pronunciationRows: Array<{ sentence: string; phonetic: string; focus: string; tip: string }>;
  speakingRows: Array<{ prompt: string; grammarFocus: string; usefulPattern: string; example: string }>;
  readingPassage: string;
  writingPrompt: string;
};

const focusLabels: Record<string, string> = {
  vocabulary: 'Vocabulary',
  grammar: 'Grammar',
  pronunciation: 'Pronunciation',
  speaking: 'Speaking',
  reading: 'Reading',
  writing: 'Writing',
};

const selectTokens: Record<string, string> = {
  vocabulary: 'TOPIC_SELECT',
  grammar: 'GRAMMAR_TOPIC_SELECT',
  pronunciation: 'PRONUNCIATION_TOPIC_SELECT',
  speaking: 'SPEAKING_TOPIC_SELECT',
  reading: 'READING_TOPIC_SELECT',
  writing: 'WRITING_TOPIC_SELECT',
};

const commonTopicLabels = [
  'Greetings, Introductions & Personal Info',
  'Family & Relationships',
  'Daily Habits & Routines',
  'Food, Cooking & Dining',
  'Travel & Directions',
  'Shopping, Prices & Payment',
  'School & Education',
  'Work & Office',
  'Health & Body',
  'Weather & Seasons',
  'Hobbies & Free Time',
  'Technology & Social Media',
  'Transportation & Commuting',
  'Home & Neighborhood',
  'Feelings & Opinions',
  'Culture & Holidays',
  'Customer Service',
  'Job Interviews',
  'Presentations',
  'News & Current Issues',
  'Environment',
  'Money & Banking',
  'Hotel & Tourism',
  'Restaurant Situations',
  'Emergency Situations',
  'Formal vs Informal Language',
  'Storytelling',
  'Debate & Argumentation',
  'Academic Discussion',
  'Review & Mastery Check',
];

const grammarTopicLabels = [
  'Basic Word Order',
  'Pronouns & Be Verbs',
  'Simple Present',
  'Present Continuous',
  'Simple Past',
  'Future Forms',
  'Questions & Short Answers',
  'Negative Sentences',
  'Articles & Classifiers',
  'Prepositions / Particles',
  'Adjectives & Adverbs',
  'Countable & Uncountable Ideas',
  'Comparatives & Superlatives',
  'Modal Verbs / Ability',
  'Requests & Permission',
  'Imperatives',
  'Conjunctions',
  'Time Expressions',
  'Because, So, But',
  'Object Marking',
  'Passive Voice',
  'Relative Clauses',
  'Conditionals',
  'Reported Speech',
  'Complex Sentences',
  'Cause & Effect',
  'Contrast & Concession',
  'Hypothetical Meaning',
  'Advanced Connectors',
  'Review & Mastery Check',
];

const dayOptions = (labels: string[], customValue: string, customLabel: string) => [
  ...Array.from({ length: 90 }, (_, index) => {
    const label = labels[index % labels.length];
    const dayLabel = `Day ${index + 1} - ${label}`;
    return {
      value: dayLabel,
      label: dayLabel,
    };
  }),
  { value: customValue, label: customLabel },
];

const languageProfiles: Record<TargetLanguage, LanguageProfile> = {
  English: {
    languageName: 'English',
    greeting: 'Hi! Sebelum mulai, siapa namamu?',
    topicHint: 'Pilih topik yang kamu mau.',
    sample: 'Hello, nice to meet you.',
    vocabularyRows: [],
    pronunciationRows: [],
    speakingRows: [],
    readingPassage: 'Hello, my name is Lina. I live in Jakarta and I study English every morning.',
    writingPrompt: 'Write 5-7 sentences about your daily routine.',
  },
  Arabic: {
    languageName: 'Arabic',
    greeting: 'Ahlan! Sebelum mulai, siapa namamu?',
    topicHint: 'Pilih topik bahasa Arab yang mau kamu latih.',
    sample: 'مرحبا، اسمي علي.',
    vocabularyRows: [
      { word: 'مرحبا', phonetic: '/marhaban/', meaning: 'halo', pos: 'phrase', example: 'مرحبا، اسمي علي.' },
      { word: 'اسمي', phonetic: '/ismi/', meaning: 'nama saya', pos: 'phrase', example: 'اسمي سارة.' },
      { word: 'أنا', phonetic: '/ana/', meaning: 'saya', pos: 'pronoun', example: 'أنا طالب.' },
      { word: 'طالب', phonetic: '/taalib/', meaning: 'siswa laki-laki', pos: 'noun', example: 'أنا طالب في المدرسة.' },
      { word: 'طالبة', phonetic: '/taalibah/', meaning: 'siswa perempuan', pos: 'noun', example: 'أنا طالبة في المدرسة.' },
      { word: 'بيت', phonetic: '/bayt/', meaning: 'rumah', pos: 'noun', example: 'بيتي قريب من المدرسة.' },
      { word: 'مدرسة', phonetic: '/madrasah/', meaning: 'sekolah', pos: 'noun', example: 'المدرسة كبيرة.' },
      { word: 'صديق', phonetic: '/sadiiq/', meaning: 'teman laki-laki', pos: 'noun', example: 'صديقي لطيف.' },
      { word: 'طعام', phonetic: '/taam/', meaning: 'makanan', pos: 'noun', example: 'الطعام لذيذ.' },
      { word: 'ماء', phonetic: '/maa/', meaning: 'air', pos: 'noun', example: 'أريد ماء.' },
      { word: 'شكرا', phonetic: '/shukran/', meaning: 'terima kasih', pos: 'phrase', example: 'شكرا جزيلا.' },
      { word: 'أين', phonetic: '/ayna/', meaning: 'di mana', pos: 'question', example: 'أين الفندق؟' },
      { word: 'أريد', phonetic: '/uriid/', meaning: 'saya ingin', pos: 'verb', example: 'أريد تذكرة.' },
      { word: 'اليوم', phonetic: '/al-yawm/', meaning: 'hari ini', pos: 'noun', example: 'اليوم جميل.' },
      { word: 'جيد', phonetic: '/jayyid/', meaning: 'baik', pos: 'adjective', example: 'هذا جيد.' },
    ],
    pronunciationRows: [
      { sentence: 'مرحبا، اسمي علي.', phonetic: '/marhaban ismi ali/', focus: 'ح / h', tip: 'Buka tenggorokan ringan saat membaca ha.' },
      { sentence: 'أنا أتعلم العربية.', phonetic: '/ana ataallam al-arabiyyah/', focus: 'ع', tip: 'Bunyi ain keluar dari tenggorokan, jangan seperti a biasa.' },
      { sentence: 'أريد ماء من فضلك.', phonetic: '/uriid maa min fadlik/', focus: 'قصر/طول', tip: 'Panjangkan maa karena ada alif.' },
      { sentence: 'المدرسة قريبة.', phonetic: '/al-madrasah qariibah/', focus: 'ق', tip: 'Qaf lebih dalam dari k.' },
      { sentence: 'شكرا جزيلا.', phonetic: '/shukran jaziilan/', focus: 'ش / j', tip: 'Sh seperti sy, j seperti j lembut.' },
      { sentence: 'أين محطة القطار؟', phonetic: '/ayna mahattat al-qitaar/', focus: 'ط', tip: 'Tha tebal, lidah lebih kuat.' },
      { sentence: 'هذا الطعام لذيذ.', phonetic: '/haadha at-taam ladhiidh/', focus: 'ذ', tip: 'Dzal seperti th bersuara.' },
      { sentence: 'أنا أعيش في جاكرتا.', phonetic: '/ana aiish fii jakarta/', focus: 'عيش', tip: 'Tahan bunyi ii sedikit lebih lama.' },
      { sentence: 'هل تتكلم العربية؟', phonetic: '/hal tatakallam al-arabiyyah/', focus: 'double consonant', tip: 'Tekankan l pada tatakallam.' },
      { sentence: 'إلى اللقاء.', phonetic: '/ila al-liqaa/', focus: 'qa', tip: 'Akhiri dengan qaa panjang.' },
      { sentence: 'السعر مناسب.', phonetic: '/as-sir munaasib/', focus: 'س', tip: 'Sin tipis, jangan jadi sy.' },
      { sentence: 'أنا سعيد اليوم.', phonetic: '/ana saeed al-yawm/', focus: 'عيد', tip: 'Panjangkan ee pada saeed.' },
      { sentence: 'القهوة ساخنة.', phonetic: '/al-qahwah saakhinah/', focus: 'ق / خ', tip: 'Kh seperti h kasar.' },
      { sentence: 'أحتاج مساعدة.', phonetic: '/ahtaaj musaaadah/', focus: 'ح', tip: 'H tenggorokan tetap lembut.' },
      { sentence: 'رحلتي غدا صباحا.', phonetic: '/rihlati ghadan sabaahan/', focus: 'غ', tip: 'Ghain seperti r Perancis ringan.' },
    ],
    speakingRows: [
      { prompt: 'Perkenalkan diri dalam 2 kalimat.', grammarFocus: 'nominal', usefulPattern: 'أنا ... / اسمي ...', example: 'أنا سارة. اسمي سارة وأنا طالبة.' },
      { prompt: 'Ceritakan tempat tinggalmu.', grammarFocus: 'preposition', usefulPattern: 'أعيش في ...', example: 'أعيش في جاكرتا.' },
      { prompt: 'Pesan makanan sederhana.', grammarFocus: 'request', usefulPattern: 'أريد ... من فضلك', example: 'أريد ماء من فضلك.' },
    ],
    readingPassage: 'مرحبا. اسمي ليلى. أعيش في جاكرتا. أذهب إلى المدرسة كل صباح. أحب اللغة العربية لأنها جميلة.',
    writingPrompt: 'Tulis 4-6 kalimat bahasa Arab tentang dirimu: nama, kota, sekolah/kerja, dan satu hal yang kamu suka.',
  },
  Mandarin: {
    languageName: 'Mandarin',
    greeting: 'Nǐ hǎo! Sebelum mulai, siapa namamu?',
    topicHint: 'Pilih topik Mandarin yang mau kamu latih.',
    sample: '你好，我叫安娜。',
    vocabularyRows: [
      { word: '你好', phonetic: '/ni3 hao3/', meaning: 'halo', pos: 'phrase', example: '你好，我叫安娜。' },
      { word: '我', phonetic: '/wo3/', meaning: 'saya', pos: 'pronoun', example: '我是学生。' },
      { word: '叫', phonetic: '/jiao4/', meaning: 'dipanggil/bernama', pos: 'verb', example: '我叫安娜。' },
      { word: '学生', phonetic: '/xue2 sheng1/', meaning: 'siswa', pos: 'noun', example: '我是学生。' },
      { word: '老师', phonetic: '/lao3 shi1/', meaning: 'guru', pos: 'noun', example: '她是老师。' },
      { word: '朋友', phonetic: '/peng2 you3/', meaning: 'teman', pos: 'noun', example: '他是我的朋友。' },
      { word: '家', phonetic: '/jia1/', meaning: 'rumah/keluarga', pos: 'noun', example: '我家在雅加达。' },
      { word: '学校', phonetic: '/xue2 xiao4/', meaning: 'sekolah', pos: 'noun', example: '学校很大。' },
      { word: '吃', phonetic: '/chi1/', meaning: 'makan', pos: 'verb', example: '我吃米饭。' },
      { word: '喝', phonetic: '/he1/', meaning: 'minum', pos: 'verb', example: '我喝水。' },
      { word: '水', phonetic: '/shui3/', meaning: 'air', pos: 'noun', example: '我要水。' },
      { word: '谢谢', phonetic: '/xie4 xie/', meaning: 'terima kasih', pos: 'phrase', example: '谢谢你。' },
      { word: '哪里', phonetic: '/na3 li3/', meaning: 'di mana', pos: 'question', example: '车站在哪里？' },
      { word: '今天', phonetic: '/jin1 tian1/', meaning: 'hari ini', pos: 'noun', example: '今天很好。' },
      { word: '喜欢', phonetic: '/xi3 huan/', meaning: 'suka', pos: 'verb', example: '我喜欢中文。' },
    ],
    pronunciationRows: [
      { sentence: '你好，我叫安娜。', phonetic: '/ni3 hao3 wo3 jiao4 an1 na4/', focus: 'tones 3-3', tip: 'Ni hao: nada ketiga pertama naik ringan saat bertemu nada ketiga.' },
      { sentence: '我是学生。', phonetic: '/wo3 shi4 xue2 sheng1/', focus: 'xue', tip: 'X dekat bunyi sy tipis, bibir agak maju.' },
      { sentence: '我喜欢中文。', phonetic: '/wo3 xi3 huan zhong1 wen2/', focus: 'zh', tip: 'Zh lebih tebal dari j Indonesia.' },
      { sentence: '请问，车站在哪里？', phonetic: '/qing3 wen4 che1 zhan4 zai4 na3 li3/', focus: 'q / zh', tip: 'Q lebih tajam, zh lebih retroflex.' },
      { sentence: '我要一杯水。', phonetic: '/wo3 yao4 yi4 bei1 shui3/', focus: 'shui', tip: 'Shui mulai dengan sh lalu ui cepat.' },
      { sentence: '今天很热。', phonetic: '/jin1 tian1 hen3 re4/', focus: 'r', tip: 'R Mandarin seperti r tebal, bukan r getar.' },
      { sentence: '我在雅加达。', phonetic: '/wo3 zai4 ya3 jia1 da2/', focus: 'zai', tip: 'Z seperti dz ringan.' },
      { sentence: '这个多少钱？', phonetic: '/zhe4 ge duo1 shao3 qian2/', focus: 'zh / q', tip: 'Bedakan zh tebal dan q tajam.' },
      { sentence: '我明天去学校。', phonetic: '/wo3 ming2 tian1 qu4 xue2 xiao4/', focus: 'qu', tip: 'Q + ü, bibir maju.' },
      { sentence: '谢谢你的帮助。', phonetic: '/xie4 xie ni3 de bang1 zhu4/', focus: 'xie', tip: 'Xie bukan sie, lidah dekat langit-langit.' },
      { sentence: '我想喝咖啡。', phonetic: '/wo3 xiang3 he1 ka1 fei1/', focus: 'xiang', tip: 'Xiang satu suku kata, jangan dipisah.' },
      { sentence: '她是我的朋友。', phonetic: '/ta1 shi4 wo3 de peng2 you3/', focus: 'pengyou', tip: 'You pada pengyou ringan dan pendek.' },
      { sentence: '请说慢一点。', phonetic: '/qing3 shuo1 man4 yi4 dian3/', focus: 'shuo', tip: 'Shuo mulai dari sh lalu wo cepat.' },
      { sentence: '我不太明白。', phonetic: '/wo3 bu2 tai4 ming2 bai2/', focus: 'bu tone change', tip: 'Bu menjadi nada 2 sebelum nada 4.' },
      { sentence: '再见，明天见。', phonetic: '/zai4 jian4 ming2 tian1 jian4/', focus: 'jian', tip: 'Jian lembut, bukan jan.' },
    ],
    speakingRows: [
      { prompt: 'Perkenalkan diri dengan nama dan kota.', grammarFocus: 'SVO', usefulPattern: '我叫... / 我在...', example: '我叫安娜。我在雅加达。' },
      { prompt: 'Pesan minuman.', grammarFocus: 'request', usefulPattern: '我要...', example: '我要一杯水。' },
      { prompt: 'Tanya lokasi.', grammarFocus: 'question', usefulPattern: '...在哪里？', example: '车站在哪里？' },
    ],
    readingPassage: '你好。我叫安娜。我住在雅加达。我每天早上学习中文。我喜欢中文，因为中文很有意思。',
    writingPrompt: 'Tulis 4-6 kalimat Mandarin tentang diri kamu. Pakai 我叫..., 我住在..., 我喜欢...',
  },
  Japanese: {
    languageName: 'Japanese',
    greeting: 'Konnichiwa! Sebelum mulai, siapa namamu?',
    topicHint: 'Pilih topik bahasa Jepang yang mau kamu latih.',
    sample: 'こんにちは、私の名前はアナです。',
    vocabularyRows: [
      { word: 'こんにちは', phonetic: '/konnichiwa/', meaning: 'halo/selamat siang', pos: 'phrase', example: 'こんにちは、アナです。' },
      { word: '私', phonetic: '/watashi/', meaning: 'saya', pos: 'pronoun', example: '私は学生です。' },
      { word: '名前', phonetic: '/namae/', meaning: 'nama', pos: 'noun', example: '私の名前はアナです。' },
      { word: '学生', phonetic: '/gakusei/', meaning: 'siswa', pos: 'noun', example: '私は学生です。' },
      { word: '先生', phonetic: '/sensei/', meaning: 'guru', pos: 'noun', example: '田中先生です。' },
      { word: '友だち', phonetic: '/tomodachi/', meaning: 'teman', pos: 'noun', example: '彼は友だちです。' },
      { word: '家', phonetic: '/ie/', meaning: 'rumah', pos: 'noun', example: '家は近いです。' },
      { word: '学校', phonetic: '/gakkou/', meaning: 'sekolah', pos: 'noun', example: '学校へ行きます。' },
      { word: '食べる', phonetic: '/taberu/', meaning: 'makan', pos: 'verb', example: 'ご飯を食べます。' },
      { word: '飲む', phonetic: '/nomu/', meaning: 'minum', pos: 'verb', example: '水を飲みます。' },
      { word: '水', phonetic: '/mizu/', meaning: 'air', pos: 'noun', example: '水をください。' },
      { word: 'ありがとう', phonetic: '/arigatou/', meaning: 'terima kasih', pos: 'phrase', example: 'ありがとうございます。' },
      { word: 'どこ', phonetic: '/doko/', meaning: 'di mana', pos: 'question', example: '駅はどこですか。' },
      { word: '今日', phonetic: '/kyou/', meaning: 'hari ini', pos: 'noun', example: '今日は暑いです。' },
      { word: '好き', phonetic: '/suki/', meaning: 'suka', pos: 'adjective', example: '日本語が好きです。' },
    ],
    pronunciationRows: [
      { sentence: 'こんにちは、アナです。', phonetic: '/konnichiwa ana desu/', focus: 'double n', tip: 'Tahan n pada konnichiwa sedikit lebih lama.' },
      { sentence: '私は学生です。', phonetic: '/watashi wa gakusei desu/', focus: 'wa particle', tip: 'Partikel は dibaca wa.' },
      { sentence: '日本語が好きです。', phonetic: '/nihongo ga suki desu/', focus: 'su', tip: 'U pada desu sangat ringan.' },
      { sentence: '駅はどこですか。', phonetic: '/eki wa doko desu ka/', focus: 'question intonation', tip: 'Naik sedikit di akhir ka.' },
      { sentence: '水をください。', phonetic: '/mizu o kudasai/', focus: 'wo/o', tip: 'Partikel を biasanya dibaca o.' },
      { sentence: '今日は暑いです。', phonetic: '/kyou wa atsui desu/', focus: 'tsu', tip: 'Tsu seperti t + su cepat.' },
      { sentence: '学校へ行きます。', phonetic: '/gakkou e ikimasu/', focus: 'small tsu', tip: 'Gakkou punya jeda kecil sebelum k.' },
      { sentence: 'ありがとうございます。', phonetic: '/arigatou gozaimasu/', focus: 'long vowel', tip: 'Tou dipanjangkan.' },
      { sentence: '少しゆっくり話してください。', phonetic: '/sukoshi yukkuri hanashite kudasai/', focus: 'yukkuri', tip: 'Ada jeda kecil pada yuk-kuri.' },
      { sentence: '私はインドネシア人です。', phonetic: '/watashi wa indonesia-jin desu/', focus: 'jin', tip: 'Jin pendek dan jelas.' },
      { sentence: '明日、東京へ行きます。', phonetic: '/ashita toukyou e ikimasu/', focus: 'long o', tip: 'Tokyo dibaca toukyou, vokal panjang.' },
      { sentence: 'コーヒーを飲みます。', phonetic: '/koohii o nomimasu/', focus: 'long vowel', tip: 'Koohii punya dua vokal panjang.' },
      { sentence: 'これはいくらですか。', phonetic: '/kore wa ikura desu ka/', focus: 'r', tip: 'R Jepang seperti antara r dan l, sentuh cepat.' },
      { sentence: 'もう一度お願いします。', phonetic: '/mou ichido onegaishimasu/', focus: 'mou', tip: 'Mou dipanjangkan.' },
      { sentence: 'また明日会いましょう。', phonetic: '/mata ashita aimashou/', focus: 'shou', tip: 'Shou panjang dan lembut.' },
    ],
    speakingRows: [
      { prompt: 'Perkenalkan diri dengan nama.', grammarFocus: 'desu', usefulPattern: '私は...です', example: '私はアナです。' },
      { prompt: 'Tanyakan lokasi.', grammarFocus: 'question', usefulPattern: '...はどこですか', example: '駅はどこですか。' },
      { prompt: 'Minta sesuatu dengan sopan.', grammarFocus: 'request', usefulPattern: '...をください', example: '水をください。' },
    ],
    readingPassage: 'こんにちは。私はアナです。ジャカルタに住んでいます。毎朝、日本語を勉強します。日本語はおもしろいです。',
    writingPrompt: 'Tulis 4-6 kalimat Jepang tentang diri kamu. Pakai 私は..., ...です, ...が好きです.',
  },
};

export const isEnglishChat = (targetLanguage: TargetLanguage) => targetLanguage === 'English';

export const buildLocalizedGreeting = (targetLanguage: TargetLanguage) =>
  languageProfiles[targetLanguage].greeting;

export const getLocalizedTopicOptions = (targetLanguage: TargetLanguage, focus: ChatFocus): TopicOption[] => {
  if (targetLanguage === 'English') return [];
  const focusKey = focus || 'vocabulary';
  if (focusKey === 'grammar') return dayOptions(grammarTopicLabels, 'custom-grammar', 'Custom Grammar - Tulis topik sendiri');
  if (focusKey === 'pronunciation') return dayOptions(commonTopicLabels, 'custom-pronunciation', 'Custom Pronunciation - Tulis fokus sendiri');
  if (focusKey === 'speaking') return dayOptions(commonTopicLabels, 'custom-speaking', 'Custom Speaking - Tulis topik sendiri');
  if (focusKey === 'reading') return dayOptions(commonTopicLabels, 'custom-reading', 'Custom Reading - Tulis topik sendiri');
  if (focusKey === 'writing') return dayOptions(commonTopicLabels, 'custom-writing', 'Custom Writing - Tulis topik sendiri');
  return dayOptions(commonTopicLabels, 'custom-topic', 'Custom Topic - Tulis topik sendiri');
};

export const getLocalizedTopicSelectCopy = (targetLanguage: TargetLanguage, focus: ChatFocus) => {
  const language = languageProfiles[targetLanguage].languageName;
  const label = focusLabels[focus || 'vocabulary'] || 'Topic';
  return {
    title: targetLanguage === 'English' ? '' : `Topik ${language} ${label} (90 Days Challenge)`,
    placeholder: targetLanguage === 'English' ? '' : `Pilih topik ${language}...`,
  };
};

const buildVocabularyTable = (profile: LanguageProfile) =>
  `VOCAB_TABLE_START\n${profile.vocabularyRows.map((row) => `${row.word}|${row.phonetic}|${row.meaning}|${row.pos}|${row.example}`).join('\n')}\nVOCAB_TABLE_END`;

const buildPronunciationTable = (profile: LanguageProfile) =>
  `PRONUNCIATION_TABLE_START\n${profile.pronunciationRows.map((row) => `${row.sentence}|${row.phonetic}|${row.focus}|${row.tip}`).join('\n')}\nPRONUNCIATION_TABLE_END`;

const buildSpeakingTable = (profile: LanguageProfile) =>
  `SPEAKING_TABLE_START\n${profile.speakingRows.map((row) => `${row.prompt}|${row.grammarFocus}|${row.usefulPattern}|${row.example}`).join('\n')}\nSPEAKING_TABLE_END`;

export const buildLocalizedTopicQuestion = (name: string, focus: ChatFocus, targetLanguage: TargetLanguage) => {
  const profile = languageProfiles[targetLanguage];
  const label = focusLabels[focus || ''] || 'Chat';
  const token = selectTokens[focus || 'vocabulary'] || selectTokens.vocabulary;

  return `Hai, ${name}! Kita akan latihan ${profile.languageName} ${label}.

${profile.topicHint}
${token}`;
};

export const buildLocalizedLesson = (name: string, focus: ChatFocus, topic: string, targetLanguage: TargetLanguage, levelId?: string) => {
  const profile = languageProfiles[targetLanguage];
  const language = profile.languageName;
  const level = (levelId || 'beginner').toUpperCase();

  if (focus === 'grammar') {
    return `Siap, ${name}! Kita latihan grammar ${language} untuk topik "${topic}" di level ${level}.

Pola singkat:
1. Mulai dari kalimat pendek.
2. Perhatikan urutan kata, partikel, dan penanda waktu.
3. Pakai satu ide utama per kalimat.

Contoh:
${profile.sample}

Challenge:
1. Buat 3 kalimat sederhana.
2. Pakai pola dari topik ini.
3. Aku akan koreksi grammar, pilihan kata, dan natural sentence kamu.`;
  }

  if (focus === 'pronunciation') {
    return `Siap, ${name}! Aku jadi pronunciation coach ${language} kamu hari ini.

Fokus: ${topic}
Level: ${level}

Latihan kalimat:
${buildPronunciationTable(profile)}

Sekarang wajib pakai microphone ya. Coba praktikkan kalimat 1 dan 2 dulu. Aku akan koreksi bunyi, ritme, dan intonasi dari transcript suara kamu.`;
  }

  if (focus === 'speaking') {
    return `Siap, ${name}! Kita latihan speaking ${language} untuk "${topic}" di level ${level}.

Gunakan microphone untuk menjawab. Fokusku adalah mengoreksi grammar dan membuat kalimatmu lebih natural.

${buildSpeakingTable(profile)}

Mulai dari prompt 1 dulu ya. Jawab dengan 2-3 kalimat pendek.`;
  }

  if (focus === 'reading') {
    return `Siap, ${name}! Kita latihan reading ${language} untuk "${topic}" di level ${level}.

READING_PASSAGE_START
${profile.readingPassage}
READING_PASSAGE_END

Tugas:
1. Tulis main idea dalam bahasa Indonesia.
2. Ambil 3 kosakata baru.
3. Jawab: siapa tokohnya, di mana dia tinggal, dan apa kegiatannya?`;
  }

  if (focus === 'writing') {
    return `Siap, ${name}! Kita latihan writing ${language} untuk "${topic}" di level ${level}.

WRITING_PROMPT_START
${profile.writingPrompt}
WRITING_PROMPT_END

Checklist:
1. Minimal 4 kalimat.
2. Pakai kosakata yang sudah kamu tahu.
3. Aku akan koreksi grammar, struktur, dan pilihan kata.`;
  }

  return `Siap, ${name}! Kita latihan vocabulary ${language} untuk topik "${topic}" di level ${level}.

Aku kasih kosakata inti dulu ya:
${buildVocabularyTable(profile)}

Sekarang challenge pertama: buat 3 kalimat memakai kata nomor 1, 2, dan 3. Setelah benar, aku akan lanjutkan challenge berikutnya sampai semua kosakata terpakai.`;
};

export const buildLocalizedFeedback = (name: string, answer: string, focus: ChatFocus, targetLanguage: TargetLanguage) => {
  const language = languageProfiles[targetLanguage].languageName;
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
  const hasEnoughText = wordCount >= 3;
  const score = hasEnoughText ? 84 : 68;
  const focusHint = focus === 'pronunciation'
    ? 'Untuk pronunciation, coba ulangi dengan tempo lebih pelan dan artikulasi lebih jelas.'
    : focus === 'speaking'
      ? 'Untuk speaking, tambahkan subject dan verb supaya grammar lebih kuat.'
      : 'Buat kalimat lebih lengkap dengan subject, detail, dan konteks kecil.';

  return `Nice try, ${name}! Ini feedback ${language} kamu:

Status: ${hasEnoughText ? '✅ Good progress' : '⚠️ Perlu dibuat sedikit lebih lengkap'}

Yang sudah bagus:
- Kamu sudah mencoba memakai ${language} secara aktif.
- Jawabanmu cukup jelas untuk latihan tahap ini.

Yang perlu ditingkatkan:
- ${focusHint}
- Kalau ragu, pakai kalimat pendek dulu.

Skor sementara: ${score}/100

Lanjut challenge berikutnya ya.`;
};

export const buildLocalizedReport = (targetLanguage: TargetLanguage, focus: ChatFocus) => {
  const language = languageProfiles[targetLanguage].languageName;
  const label = focusLabels[focus || ''] || 'AI Chat';

  return `Session Report - ${language} ${label}

Skor: 82/100
Kategori: Good Progress

Ringkasan:
- User sudah memulai latihan ${language}.
- Respons sudah cukup jelas untuk latihan awal.
- Perlu lebih banyak contoh agar koreksi bisa makin spesifik.

Rekomendasi:
1. Lanjutkan dengan topik yang sama.
2. Buat kalimat lebih lengkap.
3. Gunakan microphone untuk pronunciation dan speaking.`;
};
