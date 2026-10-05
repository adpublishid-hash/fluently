import { hashSeed, seededRandom, seededShuffle } from '../../utils/quiz';
import { easyErrors, hardErrors, mediumErrors, type ErrorFixTuple } from './arabic/errorFix';
import { easyTense, easyVerbs, hardTense, hardVerbs, mediumTense, mediumVerbDistractors, mediumVerbs, type TenseTuple, type VerbTuple } from './arabic/fiil';
import { arabicNormalize, formOneVariants, otherWaznForms, type FormKey } from './arabic/sharaf';
import {
  easyArticles,
  easyConditionals,
  easyModals,
  easyQuestions,
  hardArticles,
  hardConditionals,
  hardModals,
  hardQuestions,
  mediumArticles,
  mediumConditionals,
  mediumModals,
  mediumQuestions,
  questionRules,
  type ChoiceTuple,
} from './arabic/particles';
import { easySentences, hardSentences, mediumSentences, type SentenceTuple } from './arabic/sentences';

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

const LEVELS: LevelLabel[] = ['Easy', 'Medium', 'Hard'];

/** Deterministic shuffle so every build serves the same, non-predictable option order. */
function shuffleFor<T>(items: T[], ...seed: Array<string | number>) {
  return seededShuffle(items, seededRandom(hashSeed('arabic-game', ...seed)));
}

const makeListenItems = (level: LevelLabel) =>
  vocabByLevel[level].map((item, index, source) => ({
    word: item.word,
    answer: item.meaning,
    options: shuffleFor(
      [item.meaning, ...[...source.slice(index + 1), ...source.slice(0, index)].slice(0, 3).map((other) => other.meaning)],
      level,
      item.word,
    ),
    hint: item.hint,
    level,
  }));

export const arabicListenTapQuestions = LEVELS.flatMap(makeListenItems);
export const arabicWordBank = arabicListenTapQuestions.filter((item) => item.level === 'Easy').slice(0, 8);

function makeArabicLetterQuestItem(item: ArabicVocabEntry, level: LevelLabel) {
  const cleanWord = item.word.replace(/\s+/g, '');
  const distractors = shuffleFor(arabicAlphabet.filter((letter) => !cleanWord.includes(letter)), 'letters', item.word);
  const letters = shuffleFor([...cleanWord.split(''), ...distractors.slice(0, Math.max(8, 15 - cleanWord.length))].slice(0, 15), 'board', item.word);
  return { word: cleanWord, icon: item.icon, color: item.color, level, letters };
}

export const arabicLetterQuestQuestions = LEVELS.flatMap((level) => vocabByLevel[level].map((item) => makeArabicLetterQuestItem(item, level)));

function makeSentence([prompt, tokens]: SentenceTuple, level: LevelLabel) {
  const answer = tokens.split(' ');
  let words = shuffleFor(answer, 'sentence', tokens);
  // Never hand out the puzzle already solved.
  for (let shift = 1; words.join(' ') === answer.join(' ') && shift < answer.length; shift += 1) {
    words = [...answer.slice(shift), ...answer.slice(0, shift)];
  }
  return { prompt, answer, words, level };
}

const sentencesByLevel: Record<LevelLabel, SentenceTuple[]> = { Easy: easySentences, Medium: mediumSentences, Hard: hardSentences };
export const arabicSentenceBuilderQuestions = LEVELS.flatMap((level) => sentencesByLevel[level].map((item) => makeSentence(item, level)));

type ChoiceExtra = { tense?: string; formula?: string; type?: string; tone?: string; rule?: string };

function choiceItem(prompt: string, translation: string, answer: string, wrong: string[], level: LevelLabel, extra: ChoiceExtra = {}) {
  return {
    word: prompt,
    prompt,
    translation,
    answer,
    options: shuffleFor([answer, ...wrong.slice(0, 3)], level, prompt, translation),
    level,
    hint: translation,
    ...extra,
  };
}

const tenseByLevel: Record<LevelLabel, TenseTuple[]> = { Easy: easyTense, Medium: mediumTense, Hard: hardTense };
export const arabicTenseMasterQuestions = LEVELS.flatMap((level) =>
  tenseByLevel[level].map(([prompt, translation, answer, wrong, tense, formula]) => choiceItem(prompt, translation, answer, wrong, level, { tense, formula })),
);

const FORM_LABELS: Record<FormKey, { label: string; pattern: string }> = {
  Madhi: { label: "fi'il madhi", pattern: 'masa lampau' },
  Mudhari: { label: "fi'il mudhari", pattern: 'sekarang / kebiasaan' },
  Amr: { label: "fi'il amr", pattern: 'perintah' },
  Masdar: { label: 'masdar', pattern: 'kata benda dari kata kerja' },
};
const FORM_KEYS = Object.keys(FORM_LABELS) as FormKey[];

const verbsByLevel: Record<LevelLabel, VerbTuple[]> = { Easy: easyVerbs, Medium: mediumVerbs, Hard: hardVerbs };

function verbForms([, , madhi, mudhari, amr, masdar]: VerbTuple): Record<FormKey, string> {
  return {
    Madhi: arabicNormalize(madhi),
    Mudhari: arabicNormalize(mudhari),
    Amr: arabicNormalize(amr),
    Masdar: arabicNormalize(masdar),
  };
}

function targetForm(level: LevelLabel, index: number): FormKey {
  if (level === 'Easy') return index % 2 === 0 ? 'Madhi' : 'Mudhari';
  if (level === 'Medium') return index % 2 === 0 ? 'Amr' : 'Mudhari';
  return FORM_KEYS[index % FORM_KEYS.length];
}

/**
 * Wrong options that test morphology rather than root matching:
 * Easy uses the other bab vowels and the passive, Medium the classic weak-verb slips,
 * Hard the same root in other wazns. Other verbs' forms only top up a short list.
 */
function verbDistractors(level: LevelLabel, verb: VerbTuple, target: FormKey, source: VerbTuple[], index: number) {
  const [root, , madhi, , , , wazn] = verb;
  const answer = verbForms(verb)[target];
  let own: string[] = [];
  if (level === 'Easy' && (target === 'Madhi' || target === 'Mudhari')) {
    const variants = formOneVariants(root, target);
    own = variants.includes(answer) ? variants : [];
  } else if (level === 'Medium') {
    own = (mediumVerbDistractors[madhi]?.[target as 'Mudhari' | 'Amr'] ?? []).map(arabicNormalize);
  } else if (level === 'Hard') {
    own = shuffleFor(otherWaznForms(root, arabicNormalize(wazn), target), 'wazn', root, wazn, index);
  }
  const fallback = shuffleFor(source.filter((other) => other !== verb), 'verb', level, root, index).map((other) => verbForms(other)[target]);
  return [...own, ...fallback].filter((form, position, list) => form !== answer && list.indexOf(form) === position).slice(0, 3);
}

export const arabicVerbFormsQuestions = LEVELS.flatMap((level) =>
  verbsByLevel[level].map((verb, index, source) => {
    const [root, meaning, , , , , wazn] = verb;
    const target = targetForm(level, index);
    const forms = verbForms(verb);
    const answer = forms[target];
    const { label, pattern } = FORM_LABELS[target];
    return {
      word: root,
      prompt: `Pilih ${label} dari akar ${root} (${level === 'Hard' ? `wazn ${wazn}, ` : ''}${meaning}).`,
      translation: meaning,
      answer,
      options: shuffleFor([answer, ...verbDistractors(level, verb, target, source, index)], 'verb-options', level, root, index),
      forms,
      activeForm: target,
      formLabel: label,
      pattern,
      level,
      hint: meaning,
      id: `${level}-${root}-${index}`,
    };
  }),
);

function choiceBank(byLevel: Record<LevelLabel, ChoiceTuple[]>, labelKey: 'type' | 'tone', ruleFor?: (answer: string, rule: string) => string) {
  return LEVELS.flatMap((level) =>
    byLevel[level].map(([prompt, translation, answer, wrong, label, rule]) =>
      choiceItem(prompt, translation, answer, wrong, level, { [labelKey]: label, rule: ruleFor ? ruleFor(answer, rule) : rule }),
    ),
  );
}

export const arabicArticleDashQuestions = choiceBank({ Easy: easyArticles, Medium: mediumArticles, Hard: hardArticles }, 'type');
export const arabicModalQuestQuestions = choiceBank({ Easy: easyModals, Medium: mediumModals, Hard: hardModals }, 'tone');
export const arabicConditionalRunQuestions = choiceBank({ Easy: easyConditionals, Medium: mediumConditionals, Hard: hardConditionals }, 'type');
export const arabicQuestionBuilderQuestions = choiceBank(
  { Easy: easyQuestions, Medium: mediumQuestions, Hard: hardQuestions },
  'type',
  // The rule is shown before answering, so drop the leading question word it explains.
  (answer, rule) => (rule || questionRules[answer] || '').replace(/^[^A-Za-z"]+/, '').replace(/^./, (first) => first.toUpperCase()),
);

const errorsByLevel: Record<LevelLabel, ErrorFixTuple[]> = { Easy: easyErrors, Medium: mediumErrors, Hard: hardErrors };
export const arabicErrorFixQuestions = LEVELS.flatMap((level) =>
  errorsByLevel[level].map(([wrong, correct, translation, type, rule, alternatives]) => ({
    word: wrong,
    prompt: wrong,
    translation,
    answer: correct,
    options: shuffleFor([correct, wrong, ...alternatives], 'fix', level, wrong),
    type,
    rule,
    level,
    hint: translation,
  })),
);
