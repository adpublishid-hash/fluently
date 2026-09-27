type LevelLabel = 'Easy' | 'Medium' | 'Hard';

type ArabicVocabEntry = {
  word: string;
  meaning: string;
  icon: string;
  color: string;
  hint: string;
};

const arabicAlphabet = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'.split('');

export const arabicGameCategoryCopy: Record<string, string> = {
  all: 'Semua',
  vocabulary: 'Mufradat',
  grammar: 'Nahwu',
  listening: 'Istima',
  writing: 'Kitabah',
  speaking: 'Kalam',
  reading: "Qira'ah",
};

export const arabicGameModeCopy: Record<string, { title: string; subtitle: string; status: string }> = {
  'word-match': { title: 'Arabic Word Match', subtitle: 'Cocokkan visual dengan mufradat Arab dari Easy sampai Hard.', status: 'Mufradat' },
  'letter-quest': { title: 'Arabic Letter Quest', subtitle: 'Susun huruf Arab menjadi kata yang tepat.', status: 'Huruf Arab' },
  'sentence-builder': { title: 'Arabic Sentence Builder', subtitle: 'Susun kalimat Arab pendek, harian, sampai kompleks.', status: 'Jumlah' },
  'tense-master': { title: "Fi'il Master", subtitle: "Latih fi'il madhi, mudhari, amr, dan pola waktu Arabic.", status: "Fi'il" },
  'verb-forms': { title: 'Sharaf Forms', subtitle: 'Pilih bentuk kata kerja Arab: madhi, mudhari, amr, dan masdar.', status: 'Sharaf' },
  'article-dash': { title: 'Alif Lam Dash', subtitle: 'Latih alif-lam, nakirah, marifah, dan idhafah sederhana.', status: 'ال' },
  'preposition-path': { title: 'Harfu Jar Path', subtitle: 'Kuasai في، إلى، من، على، مع dalam kalimat.', status: 'Huruf Jar' },
  'modal-quest': { title: 'Expression Quest', subtitle: 'Pilih ungkapan fungsi: bisa, harus, ingin, boleh, dan minta tolong.', status: 'Tarakib' },
  'conditional-run': { title: 'Idza Run', subtitle: 'Bangun kalimat syarat Arabic dengan إذا dan لو.', status: 'Syarat' },
  'question-builder': { title: 'Question Builder Arabic', subtitle: 'Pilih kata tanya: هل، أين، متى، كم، لماذا، من.', status: 'Istifham' },
  'error-fix': { title: 'Arabic Error Fix', subtitle: 'Temukan versi kalimat Arab yang lebih benar.', status: 'Koreksi' },
  'clause-connect': { title: 'Arabic Clause Connect', subtitle: 'Latih penghubung karena, tetapi, ketika, dan yang.', status: 'Connect' },
  'grammar-mix': { title: 'Arabic Grammar Mix', subtitle: 'Campuran nahwu-sharaf untuk review cepat.', status: 'Mixed' },
  'listen-tap': { title: 'Arabic Listen & Tap', subtitle: 'Dengarkan kata Arab lalu pilih artinya.', status: 'Istima' },
  'memory-card': { title: 'Arabic Memory Card', subtitle: 'Cocokkan visual dan mufradat Arab.', status: 'Memory' },
  'find-words': { title: 'Find Arabic Words', subtitle: 'Cari kata Arab di grid huruf dan isi jawabannya.', status: 'Word Search' },
  'speed-quiz': { title: 'Arabic Speed Quiz', subtitle: 'Jawab arti mufradat Arab sebelum waktu habis.', status: 'Timed' },
  crossword: { title: 'Arabic Typing Sprint', subtitle: 'Ketik kata Arab dari arti dan hint.', status: 'Kitabah' },
  'typing-sprint': { title: 'Arabic Typing Sprint', subtitle: 'Ketik kata Arab dari arti dan hint.', status: 'Kitabah' },
  'clan-battle': { title: 'Arabic Boss Challenge', subtitle: 'Mode cepat Arabic dengan tekanan waktu dan reward lebih besar.', status: 'Hard' },
  'boss-challenge': { title: 'Arabic Boss Challenge', subtitle: 'Mode cepat Arabic dengan tekanan waktu dan reward lebih besar.', status: 'Hard' },
};

export const arabicGameHomeCopy = {
  title: 'Arabic Arcade',
  subtitle: 'Latihan mufradat, nahwu, istima, dan kitabah dalam game cepat.',
  chooseTitle: 'Pilih Game Arabic',
  chooseSubtitle: 'Filter berdasarkan skill Arabic yang ingin kamu latih.',
  dailyQuestTitle: 'Arabic Daily Quest',
  dailyQuestSubtitle: 'Selesaikan 3 game Arabic untuk bonus arcade.',
};

export const arabicGameDifficultyCopy: Record<string, { title: string; subtitle: string }> = {
  easy: { title: 'Easy Arabic', subtitle: 'Mufradat dan pola kalimat dasar.' },
  medium: { title: 'Medium Arabic', subtitle: 'Kalimat harian dengan variasi nahwu.' },
  hard: { title: 'Hard Arabic', subtitle: 'Tantangan cepat dengan struktur lebih panjang.' },
};

const easyVocab: ArabicVocabEntry[] = [
  ['كتاب', 'Buku', '📘', '#2563EB', 'kitab'], ['قلم', 'Pulpen', '🖊️', '#0EA5E9', 'qalam'], ['بيت', 'Rumah', '🏠', '#64748B', 'bayt'],
  ['ماء', 'Air', '💧', '#0284C7', 'maa'], ['خبز', 'Roti', '🍞', '#D97706', 'khubz'], ['تفاح', 'Apel', '🍎', '#EF4444', 'tuffah'],
  ['مدرسة', 'Sekolah', '🏫', '#4FA3D1', 'madrasah'], ['معلم', 'Guru', '👩‍🏫', '#0EA5E9', 'muallim'], ['طالب', 'Siswa', '🎓', '#7C3AED', 'talib'],
  ['صديق', 'Teman', '🤝', '#10B981', 'sadiq'], ['أسرة', 'Keluarga', '👨‍👩‍👧', '#EC4899', 'usrah'], ['صباح', 'Pagi', '🌅', '#F59E0B', 'sabah'],
  ['ليل', 'Malam', '🌙', '#6366F1', 'layl'], ['طعام', 'Makanan', '🍽️', '#F97316', 'taam'], ['حليب', 'Susu', '🥛', '#94A3B8', 'halib'],
  ['باب', 'Pintu', '🚪', '#92400E', 'bab'], ['نافذة', 'Jendela', '🪟', '#38BDF8', 'nafidzah'], ['حقيبة', 'Tas', '🎒', '#F97316', 'haqibah'],
  ['كرسي', 'Kursi', '🪑', '#A16207', 'kursi'], ['طاولة', 'Meja', '🪵', '#92400E', 'tawilah'], ['قط', 'Kucing', '🐱', '#FBBF24', 'qitt'],
  ['كلب', 'Anjing', '🐶', '#F59E0B', 'kalb'], ['سمك', 'Ikan', '🐟', '#38BDF8', 'samak'], ['طائر', 'Burung', '🐦', '#0EA5E9', 'tair'],
  ['شمس', 'Matahari', '☀️', '#F59E0B', 'syams'], ['قمر', 'Bulan', '🌙', '#A78BFA', 'qamar'], ['شجرة', 'Pohon', '🌲', '#166534', 'syajarah'],
  ['زهرة', 'Bunga', '🌹', '#FB7185', 'zahrah'], ['سيارة', 'Mobil', '🚗', '#DC2626', 'sayyarah'], ['قطار', 'Kereta', '🚆', '#475569', 'qitar'],
].map(([word, meaning, icon, color, hint]) => ({ word, meaning, icon, color, hint }));

const mediumVocab: ArabicVocabEntry[] = [
  ['جدول', 'Jadwal', '📅', '#8B5CF6', 'jadwal'], ['موعد', 'Janji temu', '🕘', '#6366F1', 'mawid'], ['مطار', 'Bandara', '✈️', '#38BDF8', 'matar'],
  ['فندق', 'Hotel', '🏨', '#0EA5E9', 'funduq'], ['مطعم', 'Restoran', '🍽️', '#EA580C', 'matam'], ['سوق', 'Pasar', '🛒', '#F59E0B', 'suq'],
  ['سعر', 'Harga', '🏷️', '#CA8A04', 'sir'], ['تذكرة', 'Tiket', '🎫', '#E11D48', 'tadzkarah'], ['محطة', 'Stasiun', '🚉', '#475569', 'mahattah'],
  ['شارع', 'Jalan', '🛣️', '#64748B', 'syari'], ['مدينة', 'Kota', '🏙️', '#2563EB', 'madinah'], ['قرية', 'Desa', '🏡', '#65A30D', 'qaryah'],
  ['عمل', 'Pekerjaan', '💼', '#7C3AED', 'amal'], ['مكتب', 'Kantor', '🏢', '#334155', 'maktab'], ['اجتماع', 'Rapat', '👥', '#0F766E', 'ijtima'],
  ['رسالة', 'Pesan', '✉️', '#0EA5E9', 'risalah'], ['سؤال', 'Pertanyaan', '❓', '#9333EA', 'sual'], ['جواب', 'Jawaban', '✅', '#16A34A', 'jawab'],
  ['صحة', 'Kesehatan', '🏥', '#DC2626', 'sihhah'], ['طبيب', 'Dokter', '🩺', '#EF4444', 'tabib'], ['دواء', 'Obat', '💊', '#10B981', 'dawa'],
  ['مريض', 'Sakit', '🤒', '#F97316', 'marid'], ['هواية', 'Hobi', '🎨', '#EC4899', 'hiwayah'], ['رياضة', 'Olahraga', '⚽', '#22C55E', 'riyadah'],
  ['لغة', 'Bahasa', '🗣️', '#4FA3D1', 'lughah'], ['درس', 'Pelajaran', '📖', '#3B82F6', 'dars'], ['اختبار', 'Ujian', '📝', '#A855F7', 'ikhtibar'],
  ['نجاح', 'Keberhasilan', '🏆', '#F59E0B', 'najah'], ['خطأ', 'Kesalahan', '❌', '#EF4444', 'khata'], ['تدريب', 'Latihan', '🎯', '#0F766E', 'tadrib'],
].map(([word, meaning, icon, color, hint]) => ({ word, meaning, icon, color, hint }));

const hardVocab: ArabicVocabEntry[] = [
  ['مسؤولية', 'Tanggung jawab', '🧭', '#7C3AED', 'masuliyyah'], ['فرصة', 'Kesempatan', '🚪', '#F59E0B', 'fursah'], ['إنجاز', 'Pencapaian', '🏆', '#CA8A04', 'injaz'],
  ['شرط', 'Syarat', '📌', '#DC2626', 'syart'], ['توصية', 'Rekomendasi', '💡', '#0EA5E9', 'tawsiyah'], ['بيئة', 'Lingkungan', '🌿', '#16A34A', 'biah'],
  ['تطوير', 'Pengembangan', '🛠️', '#2563EB', 'tatwir'], ['اتفاق', 'Kesepakatan', '🤝', '#0F766E', 'ittifaq'], ['تحدي', 'Tantangan', '⛰️', '#9333EA', 'tahaddi'],
  ['حل', 'Solusi', '🔑', '#10B981', 'hall'], ['دليل', 'Bukti/petunjuk', '🧾', '#64748B', 'dalil'], ['بحث', 'Penelitian', '🔍', '#4FA3D1', 'bahth'],
  ['استراتيجية', 'Strategi', '♟️', '#1E293B', 'istratijiyyah'], ['أداء', 'Kinerja', '📈', '#0EA5E9', 'ada'], ['تقدم', 'Kemajuan', '🚀', '#16A34A', 'taqaddum'],
  ['تغذية راجعة', 'Umpan balik', '💬', '#EC4899', 'taghdhiyah rajiah'], ['تفاوض', 'Negosiasi', '🤝', '#F97316', 'tafawudh'], ['عرض', 'Presentasi', '📊', '#8B5CF6', 'ardh'],
  ['محادثة', 'Percakapan', '🗨️', '#06B6D4', 'muhadatsah'], ['تعليمات', 'Instruksi', '📋', '#475569', 'talimat'], ['معلومات', 'Informasi', 'ℹ️', '#2563EB', 'malumat'],
  ['تجربة', 'Pengalaman', '🧪', '#A855F7', 'tajribah'], ['إدارة', 'Manajemen', '🗂️', '#334155', 'idarah'], ['عميل', 'Pelanggan', '🧑', '#F59E0B', 'amil'],
  ['منافس', 'Pesaing', '⚔️', '#DC2626', 'munafis'], ['جمهور', 'Audiens', '👥', '#0EA5E9', 'jumhur'], ['موعد نهائي', 'Tenggat waktu', '⏳', '#EF4444', 'mawid nihai'],
  ['أولوية', 'Prioritas', '⭐', '#FACC15', 'awlawiyyah'], ['كفاءة', 'Efisiensi', '⚡', '#CA8A04', 'kafaah'], ['إبداع', 'Kreativitas', '✨', '#EC4899', 'ibda'],
].map(([word, meaning, icon, color, hint]) => ({ word, meaning, icon, color, hint }));

const vocabByLevel: Record<LevelLabel, ArabicVocabEntry[]> = {
  Easy: easyVocab,
  Medium: mediumVocab,
  Hard: hardVocab,
};

const optionsFor = (answer: string, source: ArabicVocabEntry[]) => [
  answer,
  ...source.filter((item) => item.meaning !== answer).slice(0, 3).map((item) => item.meaning),
];

const makeListenItems = (level: LevelLabel) =>
  vocabByLevel[level].map((item, index, source) => ({
    word: item.word,
    answer: item.meaning,
    options: optionsFor(item.meaning, [...source.slice(index + 1), ...source.slice(0, index)]),
    hint: item.hint,
    level,
  }));

export const arabicWordBank = makeListenItems('Easy').slice(0, 8);
export const arabicListenTapQuestions = [
  ...makeListenItems('Easy'),
  ...makeListenItems('Medium'),
  ...makeListenItems('Hard'),
];

function makeArabicLetterQuestItem(item: ArabicVocabEntry, level: LevelLabel) {
  const cleanWord = item.word.replace(/\s+/g, '');
  const distractors = arabicAlphabet.filter((letter) => !cleanWord.includes(letter));
  const letters = [...cleanWord.split(''), ...distractors.slice(0, Math.max(8, 15 - cleanWord.length))].slice(0, 15);
  return { word: cleanWord, icon: item.icon, color: item.color, level, letters };
}

export const arabicLetterQuestQuestions = (Object.entries(vocabByLevel) as Array<[LevelLabel, ArabicVocabEntry[]]>)
  .flatMap(([level, words]) => words.map((item) => makeArabicLetterQuestItem(item, level)));

function makeSentence(prompt: string, answer: string, level: LevelLabel) {
  const words = answer.split(' ');
  const mixed = [...words.slice(1), words[0]].reverse();
  return { prompt, answer: words, words: mixed, level };
}

export const arabicSentenceBuilderQuestions = [
  ...[
    ['Saya seorang siswa.', 'أنا طالب'], ['Ini rumah saya.', 'هذا بيتي'], ['Saya suka bahasa Arab.', 'أحب اللغة العربية'],
    ['Dia membaca buku.', 'هو يقرأ كتابا'], ['Kami pergi ke sekolah.', 'نذهب إلى المدرسة'], ['Air ini dingin.', 'الماء بارد'],
    ['Guru ada di kelas.', 'المعلم في الفصل'], ['Saya punya pulpen.', 'عندي قلم'], ['Rumah itu dekat.', 'البيت قريب'],
    ['Temanku baik.', 'صديقي لطيف'],
  ].map(([prompt, answer]) => makeSentence(prompt, answer, 'Easy')),
  ...[
    ['Saya belajar bahasa Arab setiap pagi.', 'أتعلم العربية كل صباح'], ['Dia pergi ke kantor dengan mobil.', 'يذهب إلى المكتب بالسيارة'],
    ['Kami makan di restoran baru.', 'نأكل في مطعم جديد'], ['Mereka tinggal di kota besar.', 'يسكنون في مدينة كبيرة'],
    ['Saya ingin membeli tiket kereta.', 'أريد شراء تذكرة القطار'], ['Apakah kamu berbicara bahasa Arab?', 'هل تتكلم العربية'],
    ['Saya tidak mengerti pertanyaan ini.', 'لا أفهم هذا السؤال'], ['Kami akan bertemu besok pagi.', 'سنلتقي غدا صباحا'],
    ['Dia sudah menyelesaikan latihan.', 'أنهى التدريب بنجاح'], ['Saya belajar karena Arabic indah.', 'أتعلم لأنها لغة جميلة'],
  ].map(([prompt, answer]) => makeSentence(prompt, answer, 'Medium')),
  ...[
    ['Meskipun topiknya sulit, saya akan mencoba.', 'رغم أن الموضوع صعب سأحاول'], ['Jika saya punya waktu, saya akan membaca teks Arab.', 'إذا كان عندي وقت سأقرأ النص العربي'],
    ['Guru menjelaskan kaidah itu dengan jelas.', 'شرح المعلم القاعدة بوضوح'], ['Saya ingin meningkatkan kemampuan berbicara saya.', 'أريد تحسين مهارة الكلام عندي'],
    ['Setelah latihan, saya menjadi lebih percaya diri.', 'بعد التدريب أصبحت أكثر ثقة'], ['Kalimat yang benar membantu makna menjadi jelas.', 'الجملة الصحيحة تجعل المعنى واضحا'],
    ['Kami perlu mengulang mufradat sebelum ujian.', 'نحتاج إلى مراجعة المفردات قبل الاختبار'], ['Dia bertanya mengapa saya belajar Arabic.', 'سأل لماذا أتعلم العربية'],
    ['Saya memilih jawaban yang paling sesuai.', 'اخترت الجواب الأنسب'], ['Kita akan melanjutkan diskusi setelah istirahat.', 'سنواصل النقاش بعد الاستراحة'],
  ].map(([prompt, answer]) => makeSentence(prompt, answer, 'Hard')),
];

const repeatToThirty = <T,>(items: T[]) => Array.from({ length: 30 }, (_, index) => items[index % items.length]);

function choiceItem(prompt: string, translation: string, answer: string, options: string[], level: LevelLabel, extra = {}) {
  return { word: prompt, prompt, translation, answer, options: [answer, ...options].slice(0, 4), level, hint: translation, ...extra };
}

export const arabicTenseMasterQuestions = [
  ...repeatToThirty([
    choiceItem('أنا ____ العربية الآن.', 'Saya sedang belajar Arabic sekarang.', 'أتعلم', ['تعلمت', 'اُدْرُسْ', 'درس'], 'Easy', { tense: 'Mudhari', formula: "fi'il mudhari untuk kegiatan sekarang" }),
    choiceItem('هو ____ إلى المدرسة أمس.', 'Dia pergi ke sekolah kemarin.', 'ذهب', ['يذهب', 'اذهب', 'يذهبون'], 'Easy', { tense: 'Madhi', formula: "fi'il madhi untuk masa lalu" }),
    choiceItem('____ الكتاب يا أحمد.', 'Bacalah buku itu, Ahmad.', 'اقرأ', ['قرأ', 'يقرأ', 'نقرأ'], 'Easy', { tense: 'Amr', formula: "fi'il amr untuk perintah" }),
  ]),
  ...repeatToThirty([
    choiceItem('نحن ____ الدرس كل يوم.', 'Kami mempelajari pelajaran setiap hari.', 'ندرس', ['درسنا', 'ادرس', 'يدرس'], 'Medium', { tense: 'Mudhari', formula: 'prefiks نـ untuk نحن' }),
    choiceItem('سارة ____ الرسالة أمس.', 'Sarah menulis pesan kemarin.', 'كتبت', ['تكتب', 'اكتب', 'نكتب'], 'Medium', { tense: 'Madhi', formula: 'madhi muannats memakai ـت' }),
    choiceItem('سوف ____ غدا.', 'Saya akan datang besok.', 'آتي', ['أتيت', 'تعال', 'جاء'], 'Medium', { tense: 'Mustaqbal', formula: 'سوف + mudhari' }),
  ]),
  ...repeatToThirty([
    choiceItem('لو ____ الوقت لراجعت الدرس.', 'Seandainya ada waktu, saya meninjau pelajaran.', 'كان', ['يكون', 'كن', 'كانت'], 'Hard', { tense: 'Syarat', formula: 'لو + madhi untuk pengandaian' }),
    choiceItem('لم ____ السؤال جيدا.', 'Saya belum memahami pertanyaan dengan baik.', 'أفهم', ['فهمت', 'افهم', 'يفهمون'], 'Hard', { tense: 'Jazm', formula: 'لم + mudhari majzum' }),
    choiceItem('كان الطالب ____ في الفصل.', 'Siswa itu sedang menulis di kelas.', 'يكتب', ['كتب', 'اكتب', 'مكتوب'], 'Hard', { tense: 'Kana + Mudhari', formula: 'كان + mudhari untuk aktivitas berlangsung di masa lalu' }),
  ]),
];

const verbs = [
  { root: 'درس', forms: { BASE: 'درس', V2: 'دَرَسَ', V3: 'يَدْرُسُ', ING: 'اُدْرُسْ' }, meaning: 'belajar' },
  { root: 'كتب', forms: { BASE: 'كتب', V2: 'كَتَبَ', V3: 'يَكْتُبُ', ING: 'اُكْتُبْ' }, meaning: 'menulis' },
  { root: 'قرأ', forms: { BASE: 'قرأ', V2: 'قَرَأَ', V3: 'يَقْرَأُ', ING: 'اِقْرَأْ' }, meaning: 'membaca' },
  { root: 'ذهب', forms: { BASE: 'ذهب', V2: 'ذَهَبَ', V3: 'يَذْهَبُ', ING: 'اِذْهَبْ' }, meaning: 'pergi' },
  { root: 'فتح', forms: { BASE: 'فتح', V2: 'فَتَحَ', V3: 'يَفْتَحُ', ING: 'اِفْتَحْ' }, meaning: 'membuka' },
];

export const arabicVerbFormsQuestions = (['Easy', 'Medium', 'Hard'] as LevelLabel[]).flatMap((level) =>
  repeatToThirty(verbs).map((verb, index) => {
    const target = level === 'Easy' ? 'V2' : level === 'Medium' ? 'V3' : 'ING';
    return {
      word: verb.root,
      prompt: `Pilih bentuk ${target === 'V2' ? "fi'il madhi" : target === 'V3' ? "fi'il mudhari" : "fi'il amr"} dari root ${verb.root}.`,
      translation: verb.meaning,
      answer: verb.forms[target],
      options: Object.values(verb.forms).slice(1),
      forms: verb.forms,
      formLabel: `${target} Arabic`,
      pattern: target === 'V2' ? 'masa lalu' : target === 'V3' ? 'sekarang/kebiasaan' : 'perintah',
      level,
      hint: verb.meaning,
      id: `${level}-${verb.root}-${index}`,
    };
  })
);

export const arabicArticleDashQuestions = (['Easy', 'Medium', 'Hard'] as LevelLabel[]).flatMap((level) =>
  repeatToThirty([
    choiceItem('هذا ____كتاب جديد.', 'Ini adalah buku baru.', 'بدون ال', ['ال', 'في', 'من'], level, { rule: 'Nakirah tidak memakai ال untuk benda umum.' }),
    choiceItem('____كتاب على الطاولة.', 'Buku itu ada di atas meja.', 'ال', ['بدون ال', 'إلى', 'مع'], level, { rule: 'Marifah memakai ال: الكتاب.' }),
    choiceItem('أنا في ____مدرسة.', 'Saya di sekolah itu.', 'ال', ['بدون ال', 'من', 'على'], level, { rule: 'Tempat spesifik memakai ال.' }),
  ])
);

export const arabicModalQuestQuestions = (['Easy', 'Medium', 'Hard'] as LevelLabel[]).flatMap((level) =>
  repeatToThirty([
    choiceItem('____ أقرأ العربية.', 'Saya bisa membaca Arabic.', 'أستطيع أن', ['يجب أن', 'أريد أن', 'من فضلك'], level, { tone: 'Ability', rule: 'أستطيع أن + fi’il mudhari' }),
    choiceItem('____ أراجع الدرس.', 'Saya harus meninjau pelajaran.', 'يجب أن', ['أستطيع أن', 'هل يمكن', 'من فضلك'], level, { tone: 'Obligation', rule: 'يجب أن untuk kewajiban' }),
    choiceItem('____ أتعلم كل يوم.', 'Saya ingin belajar setiap hari.', 'أريد أن', ['لا بد أن', 'هل يمكن', 'مع'], level, { tone: 'Intention', rule: 'أريد أن untuk keinginan' }),
  ])
);

export const arabicConditionalRunQuestions = (['Easy', 'Medium', 'Hard'] as LevelLabel[]).flatMap((level) =>
  repeatToThirty([
    choiceItem('إذا ____ الوقت سأدرس.', 'Jika ada waktu, saya akan belajar.', 'كان عندي', ['ذهبت إلى', 'اكتب', 'في البيت'], level, { type: 'إذا الشرطية', rule: 'إذا + kondisi + hasil' }),
    choiceItem('إذا ____ مبكرا سنصل في الوقت.', 'Jika kita berangkat awal, kita sampai tepat waktu.', 'خرجنا', ['نخرجون', 'اخرج', 'خرج'], level, { type: 'First condition', rule: 'fi’il madhi setelah إذا sering dipakai untuk syarat' }),
    choiceItem('لو ____ أكثر لنجحت.', 'Seandainya kamu belajar lebih banyak, kamu berhasil.', 'درست', ['تدرس', 'ادرس', 'يدرس'], level, { type: 'لو', rule: 'لو untuk pengandaian' }),
  ])
);

export const arabicQuestionBuilderQuestions = (['Easy', 'Medium', 'Hard'] as LevelLabel[]).flatMap((level) =>
  repeatToThirty([
    choiceItem('____ اسمك؟', 'Siapa namamu?', 'ما', ['أين', 'متى', 'كم'], level, { type: 'Question word', rule: 'ما untuk menanyakan nama/benda.' }),
    choiceItem('____ تسكن؟', 'Di mana kamu tinggal?', 'أين', ['هل', 'كم', 'من'], level, { type: 'Place question', rule: 'أين untuk tempat.' }),
    choiceItem('____ تتعلم العربية؟', 'Mengapa kamu belajar Arabic?', 'لماذا', ['متى', 'كم', 'هل'], level, { type: 'Reason question', rule: 'لماذا untuk alasan.' }),
  ])
);

function errorFixArabic(wrong: string, correct: string, translation: string, type: string, rule: string, level: LevelLabel) {
  const fallbackOptions = ['أنا طالب جيد.', 'البيت قريب من المدرسة.', 'ذهب الطالب إلى الفصل.'];
  return {
    word: wrong,
    prompt: wrong,
    translation,
    answer: correct,
    options: Array.from(new Set([correct, wrong, ...fallbackOptions.filter((option) => option !== correct)])).slice(0, 4),
    type,
    rule,
    level,
    hint: translation,
  };
}

export const arabicErrorFixQuestions = (['Easy', 'Medium', 'Hard'] as LevelLabel[]).flatMap((level) =>
  repeatToThirty([
    errorFixArabic('أنا طالبة جيد.', 'أنا طالبة جيدة.', 'Saya siswi yang baik.', 'Gender agreement', 'Sifat mengikuti isim dalam mudzakkar/muannats.', level),
    errorFixArabic('البيت قريبة من المدرسة.', 'البيت قريب من المدرسة.', 'Rumah itu dekat dari sekolah.', 'Gender agreement', 'Khabar mengikuti mubtada mudzakkar: البيت قريب.', level),
    errorFixArabic('ذهبت الطالب إلى الفصل.', 'ذهب الطالب إلى الفصل.', 'Siswa itu pergi ke kelas.', 'Fiil-fail', "Fi'il madhi mudzakkar untuk الطالب: ذهب.", level),
  ])
);
