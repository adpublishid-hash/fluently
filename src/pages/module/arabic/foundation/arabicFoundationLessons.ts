import { buildChoiceQuestion, hashSeed, seededRandom, seededShuffle, type ChoiceQuestion } from '../../../../utils/quiz';
import type { ArabicSkillId } from '../arabicModuleData';
import {
  elementaryGrammar,
  elementaryPronunciation,
  getFoundationGrammarPoint,
  pemulaGrammar,
  pemulaPronunciation,
  type ArabicGrammarPoint,
} from './arabicFoundationGrammar';
import {
  elementarySentenceThemes,
  getFoundationLevelSentences,
  getFoundationSentences,
  pemulaSentenceThemes,
  type ArabicSentence,
  type ElementarySentenceTheme,
  type PemulaSentenceTheme,
} from './arabicFoundationSentences';
import { getFoundationLevelWords, getFoundationWordSet, foundationThemeCount, type ArabicWord, type FoundationLevel } from './arabicFoundationVocabulary';

const REVIEW = 'review';
type PlanEntry<Theme extends string> = Theme | typeof REVIEW;

// Topic titles per skill (index = lesson - 1).
export const foundationTopics: Record<FoundationLevel, Record<ArabicSkillId, string[]>> = {
  beginner: {
    kalam: ['Salam dan sapaan', 'Memperkenalkan nama', 'Asal negara', 'Menanyakan kabar', 'Ucapan terima kasih', 'Permintaan maaf', 'Izin dan permisi', 'Keluarga dekat', 'Benda di kelas', 'Aktivitas harian', 'Makanan dan minuman', 'Angka sederhana', 'Waktu dan jam', 'Arah sederhana', 'Berbelanja ringan', 'Transportasi', 'Hobi', 'Cuaca', 'Janji bertemu', 'Review dialog pemula'],
    istima: ['Bunyi pendek dan panjang', 'Salam terdengar', 'Nama orang', 'Asal negara', 'Kata kelas', 'Kata rumah', 'Angka terdengar', 'Warna terdengar', 'Instruksi kelas', 'Makanan dan minuman', 'Apa kabar', 'Jam sederhana', 'Lokasi benda', 'Keluarga terdengar', 'Hobi terdengar', 'Transportasi terdengar', 'Dialog pasar', 'Dialog sekolah', 'Pengumuman pendek', 'Cerita audio mini'],
    qiraah: ['Huruf dan kata pendek', 'Salam tertulis', 'Nama dan asal', 'Keluarga', 'Sekolah', 'Rumah', 'Waktu harian', 'Angka 1-20', 'Warna dan benda', 'Makanan sederhana', 'Pasar kecil', 'Masjid dan tempat umum', 'Cuaca', 'Hobi', 'Transportasi', 'Arah sederhana', 'Kesehatan dasar', 'Pekerjaan', 'Undangan pendek', 'Cerita mini'],
    kitabah: ['Menulis huruf sambung', 'Menyalin kata berharakat', 'Menulis salam', 'Identitas diri', 'Jumlah ismiyyah sederhana', 'Kata tunjuk', 'Dhamir dasar', 'Benda di kelas', 'Keluarga saya', 'Rutinitas pagi', 'Kalimat tanya', 'Jawaban ya/tidak', 'Preposisi dasar', 'Deskripsi warna', 'Angka dalam kalimat', 'Pesan pendek', 'Paragraf 3 kalimat', 'Dialog mini', 'Kartu perkenalan', 'Review tulisan pemula'],
    mufradat: ['Salam', 'Keluarga', 'Kelas', 'Rumah', 'Angka 1-20', 'Warna', 'Makanan', 'Minuman', 'Hari', 'Waktu', 'Anggota tubuh', 'Pakaian', 'Transportasi', 'Tempat umum', 'Profesi', 'Hewan', 'Cuaca', 'Hobi', 'Kata kerja harian', 'Sifat dasar', 'Arah', 'Belanja', 'Alat tulis', 'Buah', 'Sayur', 'Peralatan rumah', 'Masjid', 'Sekolah', 'Kota', 'Negara', 'Perasaan', 'Kesehatan', 'Keluarga besar', 'Aktivitas pagi', 'Aktivitas malam', 'Pertanyaan umum', 'Kata sambung', 'Kata depan', 'Ungkapan sopan', 'Review mufradat'],
    grammar: ['Isim dan fi\'il', 'Mubtada\' dan khabar', 'Kata tunjuk', 'Dhamir munfashil', 'Mudzakkar dan mu\'annats', 'Mufrad, mutsanna, jamak', 'Huruf jar', 'Jumlah ismiyyah', 'Jumlah fi\'liyyah', 'Kata tanya', 'Na\'at dan man\'ut', 'Idhafah dasar', 'Fi\'il madhi', 'Fi\'il mudhari\'', 'Fi\'il amr', 'Negasi laa', 'Negasi maa', 'Urutan kata', 'Kalimat sederhana', 'Review nahwu pemula'],
    pronunciation: ['Makharij tenggorokan', 'Huruf bibir', 'Huruf lidah depan', 'Huruf tebal', 'Huruf tipis', 'Harakat fathah', 'Kasrah', 'Dhammah', 'Sukun', 'Tasydid', 'Mad asli', 'Hamzah', 'Ain dan ha', 'Qaf dan kaf', 'Sin dan shad', 'Dal dan dhad', 'Ra tafkhim', 'Lam jalalah', 'Waqaf pendek', 'Review pelafalan pemula'],
  },
  elementary: {
    kalam: ['Dialog perkenalan panjang', 'Rutinitas harian', 'Keluarga dan pekerjaan', 'Sekolah dan jadwal', 'Rumah dan lingkungan', 'Memesan makanan', 'Belanja dan harga', 'Arah jalan', 'Rencana akhir pekan', 'Kesehatan ringan', 'Hobi dan alasan', 'Cuaca dan musim', 'Mengundang teman', 'Menceritakan pengalaman', 'Rencana masa depan', 'Deskripsi orang', 'Tempat umum', 'Pesan telepon', 'Wawancara mini', 'Review percakapan A2'],
    istima: ['Dialog perkenalan', 'Rutinitas harian', 'Instruksi kelas', 'Percakapan keluarga', 'Dialog sekolah', 'Dialog rumah', 'Belanja sederhana', 'Pesanan restoran', 'Arah jalan', 'Janji bertemu', 'Cuaca harian', 'Hobi dan waktu luang', 'Pengumuman pendek', 'Cerita lampau sederhana', 'Rencana akhir pekan', 'Deskripsi orang', 'Lokasi tempat umum', 'Pesan suara pendek', 'Wawancara mini', 'Review listening A2'],
    qiraah: ['Paragraf perkenalan', 'Kegiatan harian', 'Keluarga dan profesi', 'Sekolah dan jadwal', 'Rumah dan lingkungan', 'Berbelanja', 'Makanan dan restoran', 'Perjalanan kota', 'Arah dan lokasi', 'Kesehatan ringan', 'Hobi dan kebiasaan', 'Cuaca dan musim', 'Undangan dan janji', 'Cerita masa lalu sederhana', 'Rencana besok', 'Deskripsi orang', 'Tempat umum', 'Pesan singkat', 'Cerita cita-cita', 'Review bacaan A2'],
    kitabah: ['Paragraf identitas diri', 'Rutinitas harian', 'Email sederhana', 'Deskripsi keluarga', 'Deskripsi rumah', 'Menulis jadwal', 'Catatan belanja', 'Dialog tertulis', 'Instruksi arah', 'Pesan permintaan maaf', 'Kalimat lampau sederhana', 'Kalimat rencana', 'Menghubungkan kalimat', 'Deskripsi tempat', 'Pendapat sederhana', 'Cerita 5 kalimat', 'Formulir data diri', 'Undangan pendek', 'Balasan pesan', 'Portfolio tulisan A2'],
    mufradat: ['Rutinitas harian', 'Sekolah dan jadwal', 'Keluarga dan profesi', 'Belanja dan harga', 'Restoran', 'Rumah dan ruangan', 'Kota dan arah', 'Kesehatan', 'Hobi dan olahraga', 'Cuaca dan musim', 'Perjalanan', 'Teknologi sederhana', 'Perasaan dan pendapat', 'Kata kerja lampau', 'Kata kerja rencana', 'Deskripsi orang', 'Tempat umum', 'Undangan', 'Pengalaman', 'Review & portfolio kosakata A2'],
    grammar: ['Jumlah ismiyyah lanjutan', 'Jumlah fi\'liyyah lanjutan', 'Fi\'il madhi dan pelaku', 'Fi\'il mudhari\' dan pelaku', 'Huruf jar dalam kalimat', 'Idhafah dalam konteks', 'Na\'at man\'ut lanjutan', 'Kana dan saudaranya', 'Inna dan saudaranya', 'Dhamir muttashil', 'Isyarah mutsanna dan jamak', 'Isim maushul', 'Sa- dan saufa', 'Negasi lan dan lam', 'Laisa', 'Bilangan dan ma\'dud', 'Zharaf waktu dan tempat', 'Larangan (fi\'il nahyi)', 'Huruf \'athaf', 'Review grammar A2'],
    pronunciation: ['Kontras bunyi sulit', 'Mad yang stabil', 'Tekanan kata', 'Intonasi tanya', 'Intonasi dialog', 'Waqaf pada kalimat', 'Ghunnah', 'Idgham ringan', 'Ikhfa\' ringan', 'Qalqalah', 'Ritme bacaan', 'Pengucapan frasa', 'Lam syamsiyyah & qamariyyah', 'Minimal pair', 'Koreksi mandiri', 'Membaca dialog', 'Membaca paragraf', 'Rekam ulang', 'Fluency pendek', 'Review pronunciation A2'],
  },
};

type SentencePlan = {
  beginner: Record<'kalam' | 'istima' | 'qiraah' | 'kitabah' | 'mufradat', Array<PlanEntry<PemulaSentenceTheme>>>;
  elementary: Record<'kalam' | 'istima' | 'qiraah' | 'kitabah' | 'mufradat', Array<PlanEntry<ElementarySentenceTheme>>>;
};

// Sentence theme used by each communicative lesson.
const sentencePlan: SentencePlan = {
  beginner: {
    kalam: ['salam', 'nama', 'asal', 'kabar', 'terimaKasih', 'maaf', 'izin', 'keluarga', 'kelas', 'aktivitas', 'makanan', 'angka', 'waktu', 'arah', 'belanja', 'transportasi', 'hobi', 'cuaca', 'janji', REVIEW],
    istima: ['salam', 'terimaKasih', 'nama', 'asal', 'kelas', 'rumah', 'angka', 'warna', 'izin', 'makanan', 'kabar', 'waktu', 'arah', 'keluarga', 'hobi', 'transportasi', 'belanja', 'aktivitas', 'janji', 'cerita'],
    qiraah: ['salam', 'terimaKasih', 'asal', 'keluarga', 'kelas', 'rumah', 'waktu', 'angka', 'warna', 'makanan', 'belanja', 'tempatUmum', 'cuaca', 'hobi', 'transportasi', 'arah', 'kesehatan', 'pekerjaan', 'undangan', 'cerita'],
    kitabah: ['salam', 'terimaKasih', 'kabar', 'nama', 'rumah', 'belanja', 'pekerjaan', 'kelas', 'keluarga', 'aktivitas', 'hobi', 'undangan', 'arah', 'warna', 'angka', 'janji', 'cerita', 'maaf', 'asal', REVIEW],
    mufradat: ['salam', 'keluarga', 'kelas', 'rumah', 'angka', 'warna', 'makanan', 'makanan', 'waktu', 'waktu', 'kesehatan', 'warna', 'transportasi', 'tempatUmum', 'pekerjaan', 'cerita', 'cuaca', 'hobi', 'aktivitas', 'rumah', 'arah', 'belanja', 'kelas', 'makanan', 'belanja', 'rumah', 'tempatUmum', 'aktivitas', 'transportasi', 'asal', 'kabar', 'kesehatan', 'keluarga', 'aktivitas', 'waktu', 'nama', 'cerita', 'arah', 'terimaKasih', REVIEW],
  },
  elementary: {
    kalam: ['perkenalan', 'rutinitas', 'profesi', 'jadwal', 'lingkungan', 'restoran', 'belanja', 'arahJalan', 'akhirPekan', 'kesehatan', 'hobi', 'musim', 'undangan', 'pengalaman', 'masaDepan', 'deskripsi', 'tempatUmum', 'telepon', 'wawancara', REVIEW],
    istima: ['perkenalan', 'rutinitas', 'jadwal', 'profesi', 'wawancara', 'lingkungan', 'belanja', 'restoran', 'arahJalan', 'undangan', 'musim', 'hobi', 'tempatUmum', 'pengalaman', 'akhirPekan', 'deskripsi', 'arahJalan', 'telepon', 'wawancara', REVIEW],
    qiraah: ['perkenalan', 'rutinitas', 'profesi', 'jadwal', 'lingkungan', 'belanja', 'restoran', 'pengalaman', 'arahJalan', 'kesehatan', 'hobi', 'musim', 'undangan', 'pengalaman', 'akhirPekan', 'deskripsi', 'tempatUmum', 'telepon', 'masaDepan', REVIEW],
    kitabah: ['perkenalan', 'rutinitas', 'telepon', 'profesi', 'lingkungan', 'jadwal', 'belanja', 'restoran', 'arahJalan', 'permintaanMaaf', 'pengalaman', 'akhirPekan', 'kesehatan', 'tempatUmum', 'hobi', 'masaDepan', 'wawancara', 'undangan', 'undangan', REVIEW],
    mufradat: ['rutinitas', 'jadwal', 'profesi', 'belanja', 'restoran', 'lingkungan', 'arahJalan', 'kesehatan', 'hobi', 'musim', 'pengalaman', 'telepon', 'wawancara', 'pengalaman', 'masaDepan', 'deskripsi', 'tempatUmum', 'undangan', 'pengalaman', REVIEW],
  },
};

// Vocabulary theme (0-based index into the level's word bank) per lesson.
// Communicative skills pick the theme that best matches the topic.
const vocabularyPlan: Record<FoundationLevel, Record<Exclude<ArabicSkillId, 'mufradat'>, number[]>> = {
  beginner: {
    kalam: [0, 35, 29, 30, 38, 30, 38, 1, 2, 33, 6, 4, 9, 20, 21, 12, 17, 16, 8, 39],
    istima: [0, 38, 35, 29, 2, 3, 4, 5, 2, 7, 30, 9, 20, 32, 17, 12, 21, 27, 8, 15],
    qiraah: [0, 38, 29, 1, 27, 25, 9, 4, 5, 6, 21, 26, 16, 17, 12, 20, 31, 14, 34, 15],
    kitabah: [23, 38, 0, 35, 3, 22, 14, 2, 1, 33, 35, 17, 37, 5, 4, 9, 18, 30, 29, 40],
    grammar: [18, 19, 22, 14, 1, 2, 37, 3, 33, 35, 5, 25, 34, 17, 20, 7, 6, 12, 29, 39],
    pronunciation: [10, 3, 23, 31, 28, 18, 32, 27, 16, 2, 22, 36, 24, 13, 11, 19, 15, 26, 0, 40],
  },
  elementary: {
    kalam: [0, 0, 2, 1, 5, 4, 3, 6, 14, 7, 8, 9, 17, 18, 14, 15, 16, 11, 12, 19],
    istima: [0, 0, 1, 2, 12, 5, 3, 4, 6, 17, 9, 8, 16, 13, 14, 15, 16, 11, 12, 20],
    qiraah: [2, 0, 2, 1, 5, 3, 4, 10, 6, 7, 8, 9, 17, 13, 14, 15, 16, 11, 18, 19],
    kitabah: [15, 0, 11, 2, 5, 1, 3, 4, 6, 12, 13, 14, 7, 16, 12, 18, 15, 17, 11, 20],
    grammar: [1, 3, 13, 0, 10, 5, 15, 9, 12, 5, 2, 16, 14, 18, 7, 4, 6, 8, 11, 19],
    pronunciation: [15, 14, 16, 12, 13, 18, 1, 6, 10, 8, 0, 3, 9, 7, 11, 4, 5, 2, 17, 20],
  },
};

const levelInfo: Record<FoundationLevel, { title: string; code: string; label: string }> = {
  beginner: { title: 'Beginner', code: 'A1', label: 'pemula' },
  elementary: { title: 'Elementary', code: 'A2', label: 'elementary' },
};

const skillName: Record<ArabicSkillId, string> = {
  kalam: 'Kalam',
  istima: "Istima'",
  qiraah: "Qira'ah",
  kitabah: 'Kitabah',
  mufradat: 'Mufradat',
  grammar: 'Nahwu',
  pronunciation: 'Makharij',
};

const skillFocus: Record<ArabicSkillId, string[]> = {
  kalam: ['Tirukan dialog dengan intonasi natural', 'Ganti kata kunci dengan kosakata lesson', 'Jawab pertanyaan secara lisan tanpa melihat teks', 'Rekam dialog lalu bandingkan dengan TTS'],
  istima: ['Dengarkan tanpa membaca teks', 'Tangkap kata kunci dan kata tanya', 'Dengarkan ulang sambil melihat teks Arab', 'Tulis arti tiap kalimat yang terdengar'],
  qiraah: ['Kenali kata kunci sebelum membaca', 'Baca dari kanan ke kiri dengan jeda alami', 'Cocokkan kalimat Arab dengan arti Indonesia', 'Baca ulang sampai lancar'],
  kitabah: ['Salin contoh dengan huruf sambung yang rapi', 'Perhatikan bentuk huruf awal, tengah, dan akhir', 'Lengkapi harakat pada kata kunci', 'Tulis ulang tanpa melihat contoh'],
  mufradat: ['Dengarkan dan ucapkan tiap kata tiga kali', 'Hafalkan kata bersama contoh kalimat', 'Kelompokkan kata berdasarkan tema', 'Uji diri: lihat arti lalu sebutkan kata Arabnya'],
  grammar: ['Pahami fungsi pola nahwu', 'Tandai i\'rab (harakat akhir) pada contoh', 'Buat kalimat baru dengan pola yang sama', 'Periksa kesesuaian jenis dan jumlah'],
  pronunciation: ['Dengarkan contoh TTS dengan saksama', 'Perhatikan tempat keluar huruf (makhraj)', 'Ucapkan pasangan kata secara bergantian', 'Rekam dan koreksi bunyi yang masih keliru'],
};

const skillTask: Record<ArabicSkillId, (topic: string) => string> = {
  kalam: (topic) => `Praktikkan dialog bertema ${topic.toLowerCase()} bersama teman atau rekam sendiri (4-6 giliran). Pakai minimal 3 kosakata lesson ini.`,
  istima: (topic) => `Putar TTS setiap kalimat bertema ${topic.toLowerCase()} tiga kali, tulis kata kunci yang terdengar, lalu jawab artinya tanpa melihat terjemahan.`,
  qiraah: (topic) => `Baca kalimat bertema ${topic.toLowerCase()} dengan suara jelas, garis bawahi kata yang sudah dikenal, lalu tulis ringkasan artinya.`,
  kitabah: (topic) => `Tulis 5 kalimat Arab berharakat bertema ${topic.toLowerCase()}, sertakan transliterasi dan arti, lalu periksa huruf sambungnya.`,
  mufradat: (topic) => `Buat kartu hafalan untuk kosakata ${topic.toLowerCase()}, lalu susun 3 kalimat pendek memakai kata-kata tersebut.`,
  grammar: (topic) => `Buat 5 kalimat dengan pola ${topic}, tandai harakat akhirnya, dan jelaskan kedudukan kata utamanya.`,
  pronunciation: (topic) => `Rekam pengucapan kata latihan ${topic.toLowerCase()} tiga kali, bandingkan dengan TTS, dan catat bunyi yang perlu diperbaiki.`,
};

export type FoundationLesson = {
  skillId: ArabicSkillId;
  title: string;
  subtitle: string;
  objective: string;
  focus: string[];
  explanation: string[];
  patterns: Array<{ label: string; arabic: string; transliteration: string; meaning: string }>;
  vocabulary: ArabicWord[];
  examples: ArabicSentence[];
  productionSteps: string[];
  practice: ChoiceQuestion[];
  task: string;
};

function reviewSentences(level: FoundationLevel): ArabicSentence[] {
  const themes: Record<string, ArabicSentence[]> = level === 'elementary' ? elementarySentenceThemes : pemulaSentenceThemes;
  return Object.values(themes).filter((_, index) => index % 4 === 0).map((set) => set[0]);
}

function sentencesFor(level: FoundationLevel, theme: string): ArabicSentence[] {
  return theme === REVIEW ? reviewSentences(level) : getFoundationSentences(level, theme);
}

function buildPractice(
  level: FoundationLevel,
  skillId: ArabicSkillId,
  lessonId: number,
  words: ArabicWord[],
  sentences: ArabicSentence[],
  grammarPoints: ArabicGrammarPoint[],
  point?: ArabicGrammarPoint,
): ChoiceQuestion[] {
  const random = seededRandom(hashSeed('arabic-foundation', level, skillId, lessonId));
  const levelWords = getFoundationLevelWords(level);
  const levelSentences = getFoundationLevelSentences(level);
  const questions: Array<ChoiceQuestion | null> = [];

  seededShuffle(words, random).slice(0, 4).forEach((word) => {
    questions.push(buildChoiceQuestion(`Apa arti「${word.arabic}」?`, word.meaning, levelWords.map((item) => item.meaning), random));
  });
  seededShuffle(words, random).slice(0, 3).forEach((word) => {
    questions.push(buildChoiceQuestion(`Kata Arab untuk "${word.meaning}" adalah...`, word.arabic, levelWords.map((item) => item.arabic), random));
  });
  seededShuffle(sentences, random).slice(0, 3).forEach((sentence) => {
    questions.push(buildChoiceQuestion(`Arti kalimat「${sentence.arabic}」adalah...`, sentence.meaning, levelSentences.map((item) => item.meaning), random));
  });
  if (point && !point.pattern.startsWith('Review')) {
    questions.push(buildChoiceQuestion(`Pola "${point.pattern}" dipakai untuk...`, point.meaning, grammarPoints.map((item) => item.meaning), random));
  }
  seededShuffle(words, random).slice(0, 2).forEach((word) => {
    questions.push(buildChoiceQuestion(`Transliterasi yang tepat untuk「${word.arabic}」adalah...`, word.transliteration, levelWords.map((item) => item.transliteration), random));
  });

  return questions.filter((item): item is ChoiceQuestion => item !== null).slice(0, 12);
}

export function getFoundationTopic(level: FoundationLevel, skillId: ArabicSkillId, lessonId: number) {
  return foundationTopics[level][skillId][lessonId - 1] ?? `Review ${skillName[skillId]} ${levelInfo[level].title}`;
}

export function getFoundationLesson(skillId: ArabicSkillId, lessonId: number, level: FoundationLevel): FoundationLesson {
  const info = levelInfo[level];
  const topic = getFoundationTopic(level, skillId, lessonId);
  const grammarPoints = level === 'elementary' ? elementaryGrammar : pemulaGrammar;
  const drills = level === 'elementary' ? elementaryPronunciation : pemulaPronunciation;
  const title = `${skillName[skillId]} ${info.title} - Lesson ${lessonId}`;

  let words: ArabicWord[];
  let sentences: ArabicSentence[];
  let patterns: FoundationLesson['patterns'];
  let explanation: string[];
  let point: ArabicGrammarPoint | undefined;

  if (skillId === 'grammar') {
    point = getFoundationGrammarPoint(grammarPoints, lessonId, info.label);
    words = getFoundationWordSet(level, vocabularyPlan[level].grammar[lessonId - 1] ?? foundationThemeCount(level));
    sentences = [...point.examples];
    patterns = point.examples.map((example) => ({ label: point!.pattern, ...example }));
    explanation = [
      `Pola "${point.pattern}": ${point.meaning}.`,
      `Rumus: ${point.formation}`,
      'Baca contoh dengan harakat lengkap, lalu tandai kata yang menjadi pokok kalimat dan keterangannya.',
    ];
  } else if (skillId === 'pronunciation') {
    const drill = drills[lessonId - 1];
    if (drill) {
      words = drill.words;
      sentences = drill.words;
      patterns = drill.words.map((word) => ({ label: drill.focus, ...word }));
      explanation = [`Fokus bunyi: ${drill.focus}.`, drill.tip, 'Ucapkan pelan, lalu naikkan kecepatan tanpa mengubah makhraj.'];
    } else {
      words = drills.slice(0, 6).map((item) => item.words[0]);
      sentences = drills.filter((_, index) => index % 3 === 0).map((item) => item.words[1]);
      patterns = drills.slice(0, 4).map((item) => ({ label: item.focus, ...item.words[0] }));
      explanation = ['Ulangi semua fokus bunyi pada level ini.', 'Bandingkan rekamanmu dengan TTS untuk setiap pasangan huruf.'];
    }
  } else {
    const plan = sentencePlan[level][skillId];
    const theme = plan[lessonId - 1] ?? REVIEW;
    sentences = sentencesFor(level, theme);
    words = skillId === 'mufradat'
      ? getFoundationWordSet(level, lessonId - 1)
      : getFoundationWordSet(level, vocabularyPlan[level][skillId][lessonId - 1] ?? foundationThemeCount(level));
    patterns = sentences.map((sentence, index) => ({ label: `Kalimat ${index + 1}`, ...sentence }));
    explanation = [
      `Tema lesson ini: ${topic.toLowerCase()}.`,
      `Pelajari ${sentences.length} kalimat inti dan ${words.length} kosakata pendukung, lalu gunakan dalam latihan ${skillName[skillId].toLowerCase()}.`,
      'Dengarkan TTS setiap contoh, perhatikan harakat akhir, dan ulangi sampai lancar.',
    ];
  }

  return {
    skillId,
    title,
    subtitle: topic,
    objective: `Menguasai ${skillName[skillId].toLowerCase()} Arabic ${info.label}/${info.code} bertema ${topic.toLowerCase()} lewat kosakata, contoh berharakat, TTS, dan latihan.`,
    focus: skillFocus[skillId],
    explanation,
    patterns,
    vocabulary: words,
    examples: sentences,
    productionSteps: ['Dengarkan contoh TTS', 'Tirukan dengan harakat lengkap', 'Ganti kata kunci dengan kosakata lesson', 'Buat kalimat atau dialog sendiri'],
    practice: buildPractice(level, skillId, lessonId, words, sentences, grammarPoints, point),
    task: skillTask[skillId](topic),
  };
}
