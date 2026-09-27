import { useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Award, BookOpen, Brain, CheckCircle2, ClipboardList, FileText, Headphones, Lock, Mic, PenLine, Play, RotateCcw, Sparkles, Target, Volume2, XCircle, type LucideIcon } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader, NavCard } from '../../components/shared/NavComponents';
import { practiceQuestionTypes } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';
import { useAuth } from '../../auth/AuthContext';
import { FREE_PRACTICE_TOPIC_IDS, hasFullAccess } from '../../utils/accessControl';
import { normalizeTargetLanguage } from '../../features/chat/targetLanguage';
import { arabicLessonCounts, arabicLevels, arabicSkills, normalizeArabicLevel, type ArabicLevelId, type ArabicSkillId } from '../module/arabic/arabicModuleData';
import { getArabicLessonPreview, type GeneratedArabicContentLevel } from '../module/arabic/beginner/generatedBeginnerArabicContent';
import { VocabularyQuizPage } from './components/PracticeQuizPage';

export type QuizLevel = 'Basic' | 'Intermediate' | 'Advanced';

export type Topic = {
  id: string;
  title: string;
  description: string;
};

export type VocabQuestion = {
  id: string;
  level: QuizLevel;
  prompt: string;
  answer: string;
  options: string[];
};

type MistakeRecord = {
  id: string;
  skillId: string;
  topicTitle: string;
  level: QuizLevel;
  prompt: string;
  answer: string;
  selected: string;
  options?: string[];
  savedAt: string;
};

type PracticeAttempt = {
  id: string;
  skillId: string;
  topicId: string;
  topicTitle: string;
  score: number;
  total: number;
  weakestLevel: QuizLevel;
  completedAt: string;
};

export type TopicTerm = {
  word: string;
  meaning: string;
};

type ArabicQuickDrillItem = {
  id: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  prompt: string;
  answer: string;
  hint: string;
};

const mistakeBankKey = 'fluently-mistake-bank-v1';
const practiceHistoryKey = 'fluently-practice-history-v1';

const arabicLevelRoutes = new Set(['beginner', 'pemula', 'elementary', 'intermediate', 'upper-intermediate', 'advanced', 'proficiency', 'mastery', 'scholar']);

function normalizeRouteParam(value?: string) {
  return value?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const arabicPracticeModes: Record<ArabicSkillId, Array<{ title: string; detail: string; icon: LucideIcon }>> = {
  kalam: [
    { title: 'Shadow Reply', detail: 'Dengarkan frasa, ulangi, lalu jawab dengan pola yang sama.', icon: Volume2 },
    { title: 'Dialog Builder', detail: 'Susun respons singkat untuk percakapan harian Arabic.', icon: ClipboardList },
    { title: 'Fluency Sprint', detail: 'Latih jawaban 30-60 detik tanpa berhenti terlalu lama.', icon: Target },
  ],
  istima: [
    { title: 'Listen First', detail: 'Dengarkan audio sebelum melihat teks Arabnya.', icon: Headphones },
    { title: 'Keyword Catch', detail: 'Tangkap kata kunci, angka, tempat, dan maksud pembicara.', icon: Target },
    { title: 'Dictation Mini', detail: 'Tulis ulang frasa pendek setelah mendengarkan.', icon: ClipboardList },
  ],
  qiraah: [
    { title: 'Read Aloud', detail: 'Baca teks Arab dari kanan ke kiri dengan ritme stabil.', icon: Volume2 },
    { title: 'Meaning Check', detail: 'Cari ide utama, detail, dan kosakata penting.', icon: ClipboardList },
    { title: 'Inference Drill', detail: 'Latih pemahaman makna tersirat dari teks pendek.', icon: Target },
  ],
  kitabah: [
    { title: 'Copy Script', detail: 'Salin huruf sambung dan jaga bentuk tulisan tetap rapi.', icon: ClipboardList },
    { title: 'Sentence Build', detail: 'Susun kalimat dari pola dasar ke variasi baru.', icon: Target },
    { title: 'Mini Paragraph', detail: 'Tulis 3-5 kalimat Arabic sesuai topik lesson.', icon: Award },
  ],
  mufradat: [
    { title: 'Flash Meaning', detail: 'Baca kata, dengarkan, lalu sebutkan maknanya.', icon: Volume2 },
    { title: 'Example Sentence', detail: 'Pakai mufradat dalam contoh kalimat pendek.', icon: ClipboardList },
    { title: 'Recall Sprint', detail: 'Ulangi kata lama sampai keluar otomatis.', icon: Target },
  ],
  grammar: [
    { title: "I'rab Check", detail: "Kenali fungsi kata dalam jumlah ismiyyah dan fi'liyyah.", icon: ClipboardList },
    { title: 'Pattern Drill', detail: 'Ulangi nahwu-sharaf lewat pola yang sering muncul.', icon: Target },
    { title: 'Transform Sentence', detail: 'Ubah kata ganti, waktu, atau susunan kalimat.', icon: Award },
  ],
  pronunciation: [
    { title: 'Makharij Focus', detail: 'Latih titik keluarnya huruf Arab satu per satu.', icon: Volume2 },
    { title: 'Minimal Pair', detail: 'Bedakan bunyi mirip seperti ق/ك, ع/ا, dan ح/ه.', icon: Headphones },
    { title: 'Shadow Phrase', detail: 'Tirukan frasa pendek dengan mad, waqaf, dan ritme.', icon: Target },
  ],
};

const arabicSamples: Record<ArabicSkillId, { arabic: string; label: string }> = {
  kalam: { arabic: 'كَيْفَ حَالُكَ؟', label: 'Tanya kabar dan jawab natural' },
  istima: { arabic: 'أَنَا مِنْ إِنْدُونِيسِيَا', label: 'Tangkap kata kunci dari audio' },
  qiraah: { arabic: 'هَذَا بَيْتٌ كَبِيرٌ', label: 'Baca dan pahami teks pendek' },
  kitabah: { arabic: 'أَنَا طَالِبٌ', label: 'Tulis ulang dengan huruf sambung' },
  mufradat: { arabic: 'كِتَابٌ', label: 'Kosakata, arti, dan contoh' },
  grammar: { arabic: 'زَيْدٌ طَالِبٌ', label: 'Mubtada dan khabar dasar' },
  pronunciation: { arabic: 'ع ح ه ء', label: 'Makharij huruf tenggorokan' },
};

const arabicQuickDrills: Record<ArabicSkillId, ArabicQuickDrillItem[]> = {
  kalam: [
    {
      id: 'kalam-greeting',
      arabic: 'السَّلامُ عَلَيْكُمْ',
      transliteration: 'As-salamu alaikum',
      meaning: 'Semoga keselamatan atas kalian.',
      prompt: 'Ucapkan salam, lalu jawab seolah temanmu menyapa lebih dulu.',
      answer: 'وَعَلَيْكُمُ السَّلامُ',
      hint: 'Jawaban dimulai dengan wa alaikum.',
    },
    {
      id: 'kalam-name',
      arabic: 'مَا اسْمُكَ؟',
      transliteration: 'Ma ismuka?',
      meaning: 'Siapa namamu?',
      prompt: 'Jawab dengan nama kamu memakai pola ismi...',
      answer: 'اِسْمِي ...',
      hint: 'Pola: ismi + nama.',
    },
    {
      id: 'kalam-origin',
      arabic: 'مِنْ أَيْنَ أَنْتَ؟',
      transliteration: 'Min ayna anta?',
      meaning: 'Dari mana kamu?',
      prompt: 'Jawab asal negara/kota dengan pola ana min...',
      answer: 'أَنَا مِنْ إِنْدُونِيسِيَا',
      hint: 'Pola: ana min + tempat.',
    },
    {
      id: 'kalam-feeling',
      arabic: 'كَيْفَ حَالُكَ؟',
      transliteration: 'Kayfa haluka?',
      meaning: 'Bagaimana kabarmu?',
      prompt: 'Jawab singkat dan natural.',
      answer: 'أَنَا بِخَيْرٍ، الْحَمْدُ لِلّٰهِ',
      hint: 'Gunakan bi khayr untuk kabar baik.',
    },
  ],
  istima: [
    {
      id: 'istima-origin',
      arabic: 'أَنَا مِنْ إِنْدُونِيسِيَا',
      transliteration: 'Ana min Indunisiya',
      meaning: 'Saya dari Indonesia.',
      prompt: 'Dengarkan. Kata tempat apa yang kamu tangkap?',
      answer: 'إِنْدُونِيسِيَا',
      hint: 'Fokus kata setelah min.',
    },
    {
      id: 'istima-question',
      arabic: 'أَيْنَ الْقَلَمُ؟',
      transliteration: 'Ayna al-qalamu?',
      meaning: 'Di mana pulpen itu?',
      prompt: 'Dengarkan. Kata tanya apa yang dipakai?',
      answer: 'أَيْنَ',
      hint: 'Kata tanya untuk lokasi.',
    },
    {
      id: 'istima-class',
      arabic: 'اِفْتَحِ الْكِتَابَ',
      transliteration: 'Iftahi al-kitaba',
      meaning: 'Bukalah buku itu.',
      prompt: 'Dengarkan instruksi kelas. Apa objeknya?',
      answer: 'الْكِتَابَ',
      hint: 'Objeknya adalah buku.',
    },
    {
      id: 'istima-time',
      arabic: 'السَّاعَةُ السَّابِعَةُ',
      transliteration: 'As-sa ah as-sabi ah',
      meaning: 'Jam tujuh.',
      prompt: 'Dengarkan. Angka berapa yang disebut?',
      answer: 'السَّابِعَةُ',
      hint: 'Dari akar angka tujuh.',
    },
  ],
  qiraah: [
    {
      id: 'qiraah-house',
      arabic: 'هَذَا بَيْتٌ كَبِيرٌ',
      transliteration: 'Hadha baytun kabirun',
      meaning: 'Ini rumah yang besar.',
      prompt: 'Baca dari kanan ke kiri. Kata sifatnya apa?',
      answer: 'كَبِيرٌ',
      hint: 'Kata sifat muncul setelah benda.',
    },
    {
      id: 'qiraah-school',
      arabic: 'الْوَلَدُ فِي الْمَدْرَسَةِ',
      transliteration: 'Al-waladu fi al-madrasati',
      meaning: 'Anak laki-laki itu di sekolah.',
      prompt: 'Temukan lokasi dalam kalimat.',
      answer: 'الْمَدْرَسَةِ',
      hint: 'Lokasi muncul setelah fi.',
    },
    {
      id: 'qiraah-book',
      arabic: 'الْكِتَابُ عَلَى الطَّاوِلَةِ',
      transliteration: 'Al-kitabu ala at-tawilati',
      meaning: 'Buku itu di atas meja.',
      prompt: 'Apa benda utama pada kalimat?',
      answer: 'الْكِتَابُ',
      hint: 'Muncul di awal kalimat.',
    },
    {
      id: 'qiraah-student',
      arabic: 'فَاطِمَةُ طَالِبَةٌ مُجْتَهِدَةٌ',
      transliteration: 'Fatimatu talibatun mujtahidatun',
      meaning: 'Fatimah adalah siswi yang rajin.',
      prompt: 'Apa sifat Fatimah?',
      answer: 'مُجْتَهِدَةٌ',
      hint: 'Sifat terakhir dalam kalimat.',
    },
  ],
  kitabah: [
    {
      id: 'kitabah-intro',
      arabic: 'أَنَا طَالِبٌ',
      transliteration: 'Ana talibun',
      meaning: 'Saya seorang pelajar.',
      prompt: 'Tulis ulang kalimat ini dengan huruf Arab.',
      answer: 'أَنَا طَالِبٌ',
      hint: 'Mulai dengan ana.',
    },
    {
      id: 'kitabah-school',
      arabic: 'هَذِهِ مَدْرَسَةٌ',
      transliteration: 'Hadhihi madrasatun',
      meaning: 'Ini sekolah.',
      prompt: 'Tulis kalimat dengan kata tunjuk untuk benda feminin.',
      answer: 'هَذِهِ مَدْرَسَةٌ',
      hint: 'Gunakan hadhihi.',
    },
    {
      id: 'kitabah-book',
      arabic: 'عِنْدِي كِتَابٌ',
      transliteration: 'Indi kitabun',
      meaning: 'Saya punya sebuah buku.',
      prompt: 'Tulis pola "saya punya..." untuk kata kitab.',
      answer: 'عِنْدِي كِتَابٌ',
      hint: 'Gunakan indi.',
    },
    {
      id: 'kitabah-like',
      arabic: 'أُحِبُّ اللُّغَةَ الْعَرَبِيَّةَ',
      transliteration: 'Uhibbu al-lughata al-arabiyyata',
      meaning: 'Saya suka bahasa Arab.',
      prompt: 'Tulis kalimat tentang menyukai bahasa Arab.',
      answer: 'أُحِبُّ اللُّغَةَ الْعَرَبِيَّةَ',
      hint: 'Mulai dengan uhibbu.',
    },
  ],
  mufradat: [
    {
      id: 'mufradat-book',
      arabic: 'كِتَابٌ',
      transliteration: 'Kitabun',
      meaning: 'Buku.',
      prompt: 'Sebutkan arti kata ini.',
      answer: 'Buku',
      hint: 'Benda yang dibaca.',
    },
    {
      id: 'mufradat-pen',
      arabic: 'قَلَمٌ',
      transliteration: 'Qalamun',
      meaning: 'Pulpen.',
      prompt: 'Sebutkan arti kata ini.',
      answer: 'Pulpen',
      hint: 'Dipakai untuk menulis.',
    },
    {
      id: 'mufradat-house',
      arabic: 'بَيْتٌ',
      transliteration: 'Baytun',
      meaning: 'Rumah.',
      prompt: 'Sebutkan arti kata ini.',
      answer: 'Rumah',
      hint: 'Tempat tinggal.',
    },
    {
      id: 'mufradat-school',
      arabic: 'مَدْرَسَةٌ',
      transliteration: 'Madrasatun',
      meaning: 'Sekolah.',
      prompt: 'Sebutkan arti kata ini.',
      answer: 'Sekolah',
      hint: 'Tempat belajar.',
    },
  ],
  grammar: [
    {
      id: 'grammar-mubtada',
      arabic: 'زَيْدٌ طَالِبٌ',
      transliteration: 'Zaydun talibun',
      meaning: 'Zaid adalah pelajar.',
      prompt: 'Tentukan mubtada dalam jumlah ismiyyah ini.',
      answer: 'زَيْدٌ',
      hint: 'Mubtada biasanya isim pertama.',
    },
    {
      id: 'grammar-khabar',
      arabic: 'الْبَيْتُ كَبِيرٌ',
      transliteration: 'Al-baytu kabirun',
      meaning: 'Rumah itu besar.',
      prompt: 'Tentukan khabar dalam kalimat ini.',
      answer: 'كَبِيرٌ',
      hint: 'Khabar memberi informasi tentang mubtada.',
    },
    {
      id: 'grammar-fiil',
      arabic: 'كَتَبَ الطَّالِبُ',
      transliteration: 'Kataba at-talibu',
      meaning: 'Pelajar itu menulis.',
      prompt: "Tentukan fi'il dalam jumlah fi'liyyah ini.",
      answer: 'كَتَبَ',
      hint: 'Fiil adalah kata kerja.',
    },
    {
      id: 'grammar-jar',
      arabic: 'فِي الْبَيْتِ',
      transliteration: 'Fi al-bayti',
      meaning: 'Di rumah.',
      prompt: 'Huruf jar apa yang dipakai?',
      answer: 'فِي',
      hint: 'Artinya di/dalam.',
    },
  ],
  pronunciation: [
    {
      id: 'pronunciation-ain',
      arabic: 'ع',
      transliteration: 'Ain',
      meaning: 'Huruf tenggorokan tengah.',
      prompt: 'Ucapkan dari tenggorokan, jangan seperti hamzah biasa.',
      answer: 'ع',
      hint: 'Rasa bunyinya dari bagian tengah tenggorokan.',
    },
    {
      id: 'pronunciation-ha',
      arabic: 'ح',
      transliteration: 'Ha',
      meaning: 'Ha tenggorokan tanpa titik.',
      prompt: 'Bedakan ح dari ه.',
      answer: 'ح',
      hint: 'Lebih kuat dan keluar dari tenggorokan.',
    },
    {
      id: 'pronunciation-qaf',
      arabic: 'قَلْبٌ',
      transliteration: 'Qalbun',
      meaning: 'Hati.',
      prompt: 'Ucapkan qaf dengan tebal, bukan kaf.',
      answer: 'قَلْبٌ',
      hint: 'Qaf berasal dari pangkal lidah.',
    },
    {
      id: 'pronunciation-kaf',
      arabic: 'كَلْبٌ',
      transliteration: 'Kalbun',
      meaning: 'Anjing.',
      prompt: 'Ucapkan kaf dengan ringan dan bedakan dari qalbun.',
      answer: 'كَلْبٌ',
      hint: 'Kaf lebih ringan daripada qaf.',
    },
  ],
};

function isArabicSkill(value?: string): value is ArabicSkillId {
  return value === 'kalam' || value === 'istima' || value === 'qiraah' || value === 'kitabah' || value === 'mufradat' || value === 'grammar' || value === 'pronunciation';
}

function isArabicLevelRoute(value?: string) {
  return value ? arabicLevelRoutes.has(value) : false;
}

function getArabicRouteLevel(levelId: ArabicLevelId) {
  return levelId === 'pemula' ? 'beginner' : levelId;
}

function getArabicContentLevel(levelId: ArabicLevelId): GeneratedArabicContentLevel {
  return levelId === 'pemula' ? 'beginner' : levelId;
}

function readArabicCompleted(levelId: ArabicLevelId, skillId: ArabicSkillId): number[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(`talky_arabic_${levelId}_${skillId}_completed`);
    const records = raw ? JSON.parse(raw) : [];
    return Array.isArray(records) ? records.filter((item) => Number.isFinite(Number(item))).map(Number) : [];
  } catch {
    return [];
  }
}

function getArabicLessonTitle(skillId: ArabicSkillId, lesson: number, level: GeneratedArabicContentLevel, skillLabel: string) {
  if (lesson <= 20) return getArabicLessonPreview(skillId, lesson, level);
  return `${skillLabel} Review ${lesson}`;
}

function speakArabicText(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

function loadMistakeBank(): MistakeRecord[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(mistakeBankKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMistakeBank(records: MistakeRecord[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(mistakeBankKey, JSON.stringify(records.slice(0, 120)));
}

function loadPracticeHistory(): PracticeAttempt[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(practiceHistoryKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePracticeAttempt(attempt: PracticeAttempt) {
  if (typeof window === 'undefined') return;
  const nextHistory = [attempt, ...loadPracticeHistory()].slice(0, 200);
  window.localStorage.setItem(practiceHistoryKey, JSON.stringify(nextHistory));
}

function buildQuestionExplanation(question: VocabQuestion, selected?: string) {
  if (selected === question.answer) {
    return `Jawaban benar karena "${question.answer}" paling sesuai dengan instruksi soal.`;
  }

  return `Jawaban yang tepat adalah "${question.answer}". Pilihanmu "${selected || '-'}" belum sesuai dengan konteks soal, jadi ulangi pola pada pertanyaan ini saat review.`;
}

const topics: Topic[] = [
  { id: 'general', title: 'General Vocabulary', description: 'Kata dasar untuk situasi umum sehari-hari.' },
  { id: 'business-office', title: 'Business & Office English', description: 'Kata kerja kantor, meeting, dan email.' },
  { id: 'travel-tourism', title: 'Travel & Tourism', description: 'Kosakata perjalanan, hotel, arah, dan liburan.' },
  { id: 'food-restaurant', title: 'Foods, Cooking & Restaurant', description: 'Kosakata makanan, memasak, dan restoran.' },
  { id: 'health-body', title: 'Health, Medicine & The Body', description: 'Kosakata tubuh, sakit, obat, dan perawatan.' },
  { id: 'technology-social', title: 'Technology & Social Media', description: 'Kosakata internet, perangkat, dan media sosial.' },
  { id: 'personality', title: 'Personality & Character', description: 'Kata sifat tentang sifat, karakter, dan watak.' },
  { id: 'feelings', title: 'Feelings & Emotions', description: 'Kosakata untuk mengungkapkan perasaan dan emosi.' },
  { id: 'education', title: 'Education & Academic', description: 'Kosakata sekolah, universitas, dan dunia akademik.' },
  { id: 'environment', title: 'Environment & Nature', description: 'Kosakata alam, cuaca, lingkungan, dan energi.' },
  { id: 'weather', title: 'Weather & Climate', description: 'Kosakata tentang cuaca, musim, dan iklim.' },
  { id: 'shopping', title: 'Shopping, Fashion & Money', description: 'Kosakata belanja, pakaian, uang, dan harga.' },
  { id: 'house', title: 'House, Home & Chores', description: 'Kosakata rumah, ruangan, benda, dan pekerjaan rumah.' },
  { id: 'sports', title: 'Sports & Fitness', description: 'Kosakata olahraga, pertandingan, dan kebugaran.' },
  { id: 'music-arts', title: 'Music, Movies & Arts', description: 'Kosakata hiburan, film, musik, dan seni.' },
  { id: 'law-crime', title: 'Law & Crime', description: 'Kosakata hukum, pengadilan, dan kriminalitas.' },
  { id: 'media', title: 'Media & Journalism', description: 'Kosakata berita, koran, laporan, dan penyiaran.' },
  { id: 'science', title: 'Science & Space', description: 'Kosakata sains, eksperimen, dan luar angkasa.' },
  { id: 'animals', title: 'Animals & Wildlife', description: 'Kosakata hewan, habitat, dan alam liar.' },
  { id: 'fashion', title: 'Fashion & Style', description: 'Kosakata tren, pakaian, dan gaya.' },
  { id: 'history', title: 'History & Time', description: 'Kosakata sejarah, zaman, dan peristiwa masa lalu.' },
  { id: 'geography', title: 'Geography & Landscapes', description: 'Kosakata alam, peta, negara, dan bentang lahan.' },
  { id: 'money-finance', title: 'Money & Finance', description: 'Kosakata bank, investasi, dan keuangan.' },
  { id: 'transportation', title: 'Transportation & Vehicles', description: 'Kosakata kendaraan, lalu lintas, dan perjalanan.' },
  { id: 'politics', title: 'Politics & Government', description: 'Kosakata pemerintahan, pemilu, dan kebijakan.' },
  { id: 'family', title: 'Family & Relationships', description: 'Kosakata keluarga, hubungan, dan relasi sosial.' },
];

const topicTerms: Record<string, TopicTerm[]> = {
  general: [
    { word: 'Breakfast', meaning: 'a meal eaten in the morning' },
    { word: 'Umbrella', meaning: 'an object used to protect you from rain' },
    { word: 'Uncle', meaning: "your father's or mother's brother" },
    { word: 'Doctor', meaning: 'a person who treats sick people' },
    { word: 'Cinema', meaning: 'a place where people watch movies' },
    { word: 'Student', meaning: 'a person who studies at school' },
    { word: 'Schedule', meaning: 'a plan that shows when things happen' },
    { word: 'Improve', meaning: 'to become better' },
    { word: 'Confident', meaning: 'feeling sure about yourself' },
    { word: 'Opportunity', meaning: 'a good chance to do something' },
  ],
  'business-office': [
    { word: 'Meeting', meaning: 'a formal discussion at work' },
    { word: 'Deadline', meaning: 'the latest time something must be finished' },
    { word: 'Client', meaning: 'a customer who uses professional services' },
    { word: 'Invoice', meaning: 'a document requesting payment' },
    { word: 'Negotiate', meaning: 'to discuss terms before reaching agreement' },
    { word: 'Revenue', meaning: 'money earned by a company' },
    { word: 'Proposal', meaning: 'a suggested plan for business' },
    { word: 'Colleague', meaning: 'a person you work with' },
    { word: 'Strategy', meaning: 'a plan for achieving a goal' },
    { word: 'Productivity', meaning: 'the ability to complete useful work efficiently' },
  ],
  'travel-tourism': [
    { word: 'Passport', meaning: 'an official document for international travel' },
    { word: 'Itinerary', meaning: 'a planned route or travel schedule' },
    { word: 'Reservation', meaning: 'an arrangement to keep a room or seat' },
    { word: 'Luggage', meaning: 'bags used for travel' },
    { word: 'Destination', meaning: 'the place someone is travelling to' },
    { word: 'Accommodation', meaning: 'a place to stay while travelling' },
    { word: 'Tourist', meaning: 'a person visiting a place for pleasure' },
    { word: 'Departure', meaning: 'the act of leaving for a trip' },
    { word: 'Landmark', meaning: 'a famous or easily recognized place' },
    { word: 'Excursion', meaning: 'a short trip for pleasure or learning' },
  ],
  'food-restaurant': [
    { word: 'Menu', meaning: 'a list of food and drinks in a restaurant' },
    { word: 'Appetizer', meaning: 'a small dish eaten before the main meal' },
    { word: 'Ingredient', meaning: 'one item used to make food' },
    { word: 'Recipe', meaning: 'instructions for cooking a dish' },
    { word: 'Waiter', meaning: 'a person who serves food in a restaurant' },
    { word: 'Dessert', meaning: 'sweet food eaten after the main course' },
    { word: 'Spicy', meaning: 'having a hot taste from spices' },
    { word: 'Beverage', meaning: 'a drink' },
    { word: 'Cuisine', meaning: 'a style of cooking' },
    { word: 'Reservation', meaning: 'an arrangement for a restaurant table' },
  ],
  'health-body': [
    { word: 'Symptom', meaning: 'a sign that someone may be ill' },
    { word: 'Medicine', meaning: 'something taken to treat illness' },
    { word: 'Pulse', meaning: 'the beat felt from the heart' },
    { word: 'Injury', meaning: 'damage to the body' },
    { word: 'Prescription', meaning: 'written instructions for medicine' },
    { word: 'Recovery', meaning: 'the process of becoming healthy again' },
    { word: 'Treatment', meaning: 'medical care for a problem' },
    { word: 'Diagnosis', meaning: 'identifying an illness' },
    { word: 'Immune', meaning: 'related to the body fighting disease' },
    { word: 'Therapy', meaning: 'treatment to improve health' },
  ],
  'technology-social': [
    { word: 'Device', meaning: 'a piece of electronic equipment' },
    { word: 'Password', meaning: 'a secret code used to access an account' },
    { word: 'Upload', meaning: 'to send a file to the internet' },
    { word: 'Download', meaning: 'to get a file from the internet' },
    { word: 'Notification', meaning: 'a message alert from an app' },
    { word: 'Algorithm', meaning: 'a set of rules used by software' },
    { word: 'Privacy', meaning: 'control over personal information' },
    { word: 'Platform', meaning: 'an online service where people interact' },
    { word: 'Streaming', meaning: 'watching or listening online in real time' },
    { word: 'Encryption', meaning: 'protecting data by turning it into code' },
  ],
  personality: [
    { word: 'Friendly', meaning: 'kind and pleasant to others' },
    { word: 'Honest', meaning: 'telling the truth' },
    { word: 'Patient', meaning: 'able to wait calmly' },
    { word: 'Brave', meaning: 'not afraid of danger' },
    { word: 'Reliable', meaning: 'able to be trusted' },
    { word: 'Generous', meaning: 'willing to give or share' },
    { word: 'Stubborn', meaning: 'not willing to change your mind' },
    { word: 'Ambitious', meaning: 'strongly wanting success' },
    { word: 'Considerate', meaning: "thinking about other people's feelings" },
    { word: 'Resilient', meaning: 'able to recover after difficulty' },
  ],
  feelings: [
    { word: 'Happy', meaning: 'feeling pleasure or joy' },
    { word: 'Nervous', meaning: 'worried or uneasy' },
    { word: 'Excited', meaning: 'very enthusiastic' },
    { word: 'Lonely', meaning: 'sad because you are alone' },
    { word: 'Relieved', meaning: 'happy because worry has ended' },
    { word: 'Frustrated', meaning: 'annoyed because something is difficult' },
    { word: 'Anxious', meaning: 'very worried about something' },
    { word: 'Grateful', meaning: 'thankful for something' },
    { word: 'Overwhelmed', meaning: 'feeling unable to handle too much' },
    { word: 'Content', meaning: 'calmly satisfied' },
  ],
  education: [
    { word: 'Lesson', meaning: 'a period of learning' },
    { word: 'Homework', meaning: 'school work done at home' },
    { word: 'Subject', meaning: 'an area of study' },
    { word: 'Exam', meaning: 'a formal test' },
    { word: 'Assignment', meaning: 'a task given by a teacher' },
    { word: 'Curriculum', meaning: 'the subjects taught in a course' },
    { word: 'Scholarship', meaning: 'money awarded for study' },
    { word: 'Lecture', meaning: 'a formal educational talk' },
    { word: 'Research', meaning: 'careful study to discover information' },
    { word: 'Thesis', meaning: 'a long academic paper or main argument' },
  ],
  environment: [
    { word: 'Forest', meaning: 'a large area with many trees' },
    { word: 'Pollution', meaning: 'harmful substances in air, water, or soil' },
    { word: 'Recycle', meaning: 'to use waste materials again' },
    { word: 'Wildlife', meaning: 'animals living in nature' },
    { word: 'Conservation', meaning: 'protecting nature and resources' },
    { word: 'Ecosystem', meaning: 'living things and their environment' },
    { word: 'Renewable', meaning: 'able to be naturally replaced' },
    { word: 'Habitat', meaning: 'the natural home of an animal or plant' },
    { word: 'Biodiversity', meaning: 'the variety of living things' },
    { word: 'Sustainability', meaning: 'using resources without harming the future' },
  ],
  weather: [
    { word: 'Cloudy', meaning: 'covered with clouds' },
    { word: 'Rainfall', meaning: 'the amount of rain that falls' },
    { word: 'Storm', meaning: 'violent weather with wind or rain' },
    { word: 'Forecast', meaning: 'a prediction about future weather' },
    { word: 'Humidity', meaning: 'the amount of water in the air' },
    { word: 'Temperature', meaning: 'how hot or cold something is' },
    { word: 'Drought', meaning: 'a long period with little rain' },
    { word: 'Climate', meaning: 'typical weather in a place over time' },
    { word: 'Heatwave', meaning: 'a period of unusually hot weather' },
    { word: 'Precipitation', meaning: 'rain, snow, or hail falling from the sky' },
  ],
  shopping: [
    { word: 'Price', meaning: 'the amount of money something costs' },
    { word: 'Receipt', meaning: 'proof that you paid for something' },
    { word: 'Discount', meaning: 'a reduced price' },
    { word: 'Cashier', meaning: 'a person who takes payment in a shop' },
    { word: 'Refund', meaning: 'money returned after buying something' },
    { word: 'Bargain', meaning: 'something bought for a low price' },
    { word: 'Budget', meaning: 'a plan for spending money' },
    { word: 'Purchase', meaning: 'something bought' },
    { word: 'Installment', meaning: 'one payment in a series' },
    { word: 'Warranty', meaning: 'a promise to repair or replace a product' },
  ],
  house: [
    { word: 'Kitchen', meaning: 'a room used for cooking' },
    { word: 'Bedroom', meaning: 'a room used for sleeping' },
    { word: 'Furniture', meaning: 'large movable items in a room' },
    { word: 'Laundry', meaning: 'clothes that need washing' },
    { word: 'Appliance', meaning: 'a machine used in the home' },
    { word: 'Renovate', meaning: 'to repair or improve a building' },
    { word: 'Mortgage', meaning: 'a loan used to buy a house' },
    { word: 'Tenant', meaning: 'a person who rents a place' },
    { word: 'Household', meaning: 'all the people living in one home' },
    { word: 'Maintenance', meaning: 'work done to keep something in good condition' },
  ],
  sports: [
    { word: 'Team', meaning: 'a group playing together' },
    { word: 'Coach', meaning: 'a person who trains athletes' },
    { word: 'Match', meaning: 'a sports competition' },
    { word: 'Score', meaning: 'points gained in a game' },
    { word: 'Tournament', meaning: 'a series of competitions' },
    { word: 'Fitness', meaning: 'physical health and strength' },
    { word: 'Endurance', meaning: 'the ability to continue for a long time' },
    { word: 'Referee', meaning: 'a person who enforces rules in a game' },
    { word: 'Stamina', meaning: 'energy to keep doing physical activity' },
    { word: 'Championship', meaning: 'a competition to decide the best player or team' },
  ],
  'music-arts': [
    { word: 'Song', meaning: 'music with words' },
    { word: 'Artist', meaning: 'a person who creates art' },
    { word: 'Stage', meaning: 'a raised area for performance' },
    { word: 'Gallery', meaning: 'a place where art is shown' },
    { word: 'Melody', meaning: 'a sequence of musical notes' },
    { word: 'Exhibition', meaning: 'a public display of art' },
    { word: 'Performance', meaning: 'an act of presenting music or drama' },
    { word: 'Composition', meaning: 'a piece of music or art' },
    { word: 'Critique', meaning: 'a careful review of art' },
    { word: 'Aesthetic', meaning: 'related to beauty or artistic style' },
  ],
  'law-crime': [
    { word: 'Law', meaning: 'a rule made by government' },
    { word: 'Crime', meaning: 'an illegal act' },
    { word: 'Judge', meaning: 'a person who decides cases in court' },
    { word: 'Court', meaning: 'a place where legal cases are heard' },
    { word: 'Witness', meaning: 'a person who saw an event' },
    { word: 'Evidence', meaning: 'information used to prove something' },
    { word: 'Verdict', meaning: 'a court decision' },
    { word: 'Sentence', meaning: 'a punishment given by a court' },
    { word: 'Prosecution', meaning: 'the side accusing someone in court' },
    { word: 'Jurisdiction', meaning: 'legal authority over an area or case' },
  ],
  media: [
    { word: 'News', meaning: 'new information about events' },
    { word: 'Headline', meaning: 'the title of a news story' },
    { word: 'Reporter', meaning: 'a person who gathers news' },
    { word: 'Interview', meaning: 'a formal question-and-answer conversation' },
    { word: 'Broadcast', meaning: 'to send a program by TV, radio, or internet' },
    { word: 'Article', meaning: 'a written piece in a newspaper or website' },
    { word: 'Source', meaning: 'where information comes from' },
    { word: 'Editorial', meaning: 'an opinion article from a publication' },
    { word: 'Censorship', meaning: 'control over what can be published' },
    { word: 'Investigative', meaning: 'involving deep research to uncover facts' },
  ],
  science: [
    { word: 'Planet', meaning: 'a large object orbiting a star' },
    { word: 'Experiment', meaning: 'a test done to learn something' },
    { word: 'Gravity', meaning: 'the force that pulls objects together' },
    { word: 'Telescope', meaning: 'a tool used to see distant objects' },
    { word: 'Hypothesis', meaning: 'an idea tested by research' },
    { word: 'Laboratory', meaning: 'a place for scientific work' },
    { word: 'Orbit', meaning: 'the path of an object around another object' },
    { word: 'Molecule', meaning: 'a group of atoms joined together' },
    { word: 'Astronomy', meaning: 'the study of space' },
    { word: 'Quantum', meaning: 'related to very small units of energy or matter' },
  ],
  animals: [
    { word: 'Pet', meaning: 'an animal kept at home' },
    { word: 'Bird', meaning: 'an animal with feathers and wings' },
    { word: 'Predator', meaning: 'an animal that hunts other animals' },
    { word: 'Prey', meaning: 'an animal hunted by another animal' },
    { word: 'Species', meaning: 'a group of similar living things' },
    { word: 'Habitat', meaning: 'the natural home of an animal' },
    { word: 'Migration', meaning: 'movement of animals from one area to another' },
    { word: 'Extinct', meaning: 'no longer existing as a species' },
    { word: 'Conservation', meaning: 'protecting wildlife and nature' },
    { word: 'Nocturnal', meaning: 'active at night' },
  ],
  fashion: [
    { word: 'Shirt', meaning: 'clothing worn on the upper body' },
    { word: 'Dress', meaning: 'one-piece clothing often worn by women' },
    { word: 'Fabric', meaning: 'material used to make clothes' },
    { word: 'Pattern', meaning: 'a repeated design' },
    { word: 'Accessory', meaning: 'an extra item worn for style' },
    { word: 'Trend', meaning: 'a popular style at a time' },
    { word: 'Tailor', meaning: 'a person who makes or adjusts clothes' },
    { word: 'Wardrobe', meaning: 'a collection of clothes' },
    { word: 'Minimalist', meaning: 'simple in style with few details' },
    { word: 'Elegance', meaning: 'graceful and stylish beauty' },
  ],
  history: [
    { word: 'Past', meaning: 'time before now' },
    { word: 'Century', meaning: 'one hundred years' },
    { word: 'Empire', meaning: 'a group of territories ruled by one power' },
    { word: 'Ancient', meaning: 'from a very long time ago' },
    { word: 'Revolution', meaning: 'a major political or social change' },
    { word: 'Artifact', meaning: 'an object made by people in the past' },
    { word: 'Chronology', meaning: 'the order of events in time' },
    { word: 'Heritage', meaning: 'traditions and history passed down' },
    { word: 'Civilization', meaning: 'an advanced organized society' },
    { word: 'Archaeology', meaning: 'the study of ancient people through objects' },
  ],
  geography: [
    { word: 'River', meaning: 'a large natural flow of water' },
    { word: 'Mountain', meaning: 'a very high area of land' },
    { word: 'Island', meaning: 'land surrounded by water' },
    { word: 'Desert', meaning: 'a very dry area of land' },
    { word: 'Valley', meaning: 'low land between hills or mountains' },
    { word: 'Coast', meaning: 'land next to the sea' },
    { word: 'Continent', meaning: "one of the world's large land areas" },
    { word: 'Latitude', meaning: 'distance north or south of the equator' },
    { word: 'Topography', meaning: 'the physical shape of land' },
    { word: 'Archipelago', meaning: 'a group of islands' },
  ],
  'money-finance': [
    { word: 'Cash', meaning: 'money in coins or notes' },
    { word: 'Bank', meaning: 'a place that keeps and lends money' },
    { word: 'Savings', meaning: 'money kept for future use' },
    { word: 'Debt', meaning: 'money owed to someone' },
    { word: 'Interest', meaning: 'extra money paid for borrowing' },
    { word: 'Investment', meaning: 'money put into something to gain profit' },
    { word: 'Profit', meaning: 'money gained after costs' },
    { word: 'Expense', meaning: 'money spent on something' },
    { word: 'Inflation', meaning: 'a rise in general prices' },
    { word: 'Portfolio', meaning: 'a collection of investments' },
  ],
  transportation: [
    { word: 'Bus', meaning: 'a large vehicle for passengers' },
    { word: 'Ticket', meaning: 'proof of payment for travel' },
    { word: 'Station', meaning: 'a place where trains or buses stop' },
    { word: 'Traffic', meaning: 'vehicles moving on roads' },
    { word: 'Commute', meaning: 'travel between home and work' },
    { word: 'Vehicle', meaning: 'a machine used for transport' },
    { word: 'Route', meaning: 'the path taken to reach a place' },
    { word: 'Departure', meaning: 'the act of leaving' },
    { word: 'Congestion', meaning: 'too much traffic in one area' },
    { word: 'Infrastructure', meaning: 'basic transport systems and facilities' },
  ],
  politics: [
    { word: 'Vote', meaning: 'to choose in an election' },
    { word: 'Leader', meaning: 'a person who guides a group' },
    { word: 'Election', meaning: 'a process of choosing leaders' },
    { word: 'Policy', meaning: 'a plan or rule made by authority' },
    { word: 'Government', meaning: 'the system that runs a country' },
    { word: 'Citizen', meaning: 'a legal member of a country' },
    { word: 'Campaign', meaning: 'organized actions to win support' },
    { word: 'Democracy', meaning: 'government chosen by the people' },
    { word: 'Legislation', meaning: 'laws made by a government' },
    { word: 'Accountability', meaning: 'responsibility for decisions and actions' },
  ],
  family: [
    { word: 'Parent', meaning: 'a mother or father' },
    { word: 'Sibling', meaning: 'a brother or sister' },
    { word: 'Cousin', meaning: 'a child of your aunt or uncle' },
    { word: 'Marriage', meaning: 'a legal relationship between partners' },
    { word: 'Relative', meaning: 'a member of your family' },
    { word: 'Supportive', meaning: 'helpful and encouraging' },
    { word: 'Conflict', meaning: 'a serious disagreement' },
    { word: 'Relationship', meaning: 'a connection between people' },
    { word: 'Commitment', meaning: 'a strong promise or responsibility' },
    { word: 'Reconciliation', meaning: 'repairing a damaged relationship' },
  ],
};

const grammarTopics: Topic[] = [
  { id: 'general-grammar', title: 'General Grammar', description: 'Kumpulan soal tata bahasa umum untuk semua level.' },
  { id: 'be-auxiliary', title: 'Mastering "To Be" & Auxiliary Verbs', description: 'Latihan fokus pada Do/Does/Did vs Is/Am/Are/Was/Were.' },
  { id: 'nouns-articles', title: 'Nouns & Articles (A/An/The)', description: 'Latihan Countable/Uncountable Nouns dan penggunaan artikel.' },
  { id: 'prepositions-time-place', title: 'Prepositions of Time & Place', description: 'Latihan fokus pada penggunaan preposisi waktu dan tempat.' },
  { id: 'quantifiers', title: 'Quantifiers (Much/Many/Some/Any)', description: 'Latihan penggunaan kata penunjuk jumlah.' },
  { id: 'comparison', title: 'Degrees of Comparison', description: 'Latihan Comparative dan Superlative (Better/Best, More/Most).' },
  { id: 'tenses', title: 'The 12 Tenses Challenge', description: 'Uji pemahamanmu tentang 12 tenses dasar Bahasa Inggris.' },
  { id: 'pronouns-possessives', title: 'Pronouns & Possessives', description: 'Latihan Subjek, Objek, Kepemilikan (my/mine), dan Reflexive.' },
  { id: 'adjectives-adverbs', title: 'Adjectives vs. Adverbs', description: 'Latihan perbedaan kata sifat (-er/more) dan kata keterangan (-ly).' },
  { id: 'question-tags', title: 'Question Tags', description: 'Latihan membuat pertanyaan penegas di akhir kalimat.' },
  { id: 'relative-clauses', title: 'Relative Clauses (Who/Which/That)', description: 'Latihan menggabungkan kalimat dengan kata hubung relatif.' },
  { id: 'intensifiers', title: 'So / Such / Too / Enough', description: 'Latihan penggunaan intensifier dan penunjuk kecukupan.' },
  { id: 'participles', title: 'Participles (-ed vs -ing)', description: 'Latihan membedakan Bored vs Boring, Excited vs Exciting.' },
  { id: 'used-to', title: 'Used to / Be used to', description: 'Latihan kebiasaan masa lalu dan adaptasi kebiasaan.' },
  { id: 'modal-verbs', title: 'Modal Verbs', description: 'Latihan Can, Should, Must, May, dan bentuk lampaunya.' },
  { id: 'active-passive', title: 'Active vs. Passive Voice', description: 'Latihan mengubah kalimat aktif menjadi pasif (di-/ter-).' },
  { id: 'gerunds-infinitives', title: 'Gerunds vs. Infinitives', description: 'Latihan kapan pakai V-ing dan kapan pakai to V1.' },
  { id: 'conditionals', title: 'Conditional Sentences', description: 'Latihan pengandaian (jika... maka...) Type 0, 1, 2, & 3.' },
  { id: 'conjunctions', title: 'Conjunctions (Kata Sambung)', description: 'Latihan kata hubung seperti and, but, because, although, dll.' },
];

const speakingTopics: Topic[] = [
  {
    "id": "self-introduction",
    "title": "Self Introduction",
    "description": "Latihan memperkenalkan diri dengan natural dan percaya diri."
  },
  {
    "id": "daily-routine",
    "title": "Daily Routine",
    "description": "Bercerita tentang rutinitas harian dengan present simple."
  },
  {
    "id": "ordering-food",
    "title": "Ordering Food",
    "description": "Berbicara sopan saat memesan makanan atau minuman."
  },
  {
    "id": "asking-directions",
    "title": "Asking for Directions",
    "description": "Minta arah dan memastikan instruksi dengan jelas."
  },
  {
    "id": "small-talk",
    "title": "Small Talk",
    "description": "Latihan obrolan ringan agar percakapan mengalir."
  },
  {
    "id": "phone-call",
    "title": "Phone Call",
    "description": "Berbicara di telepon untuk membuka, menahan, dan menutup panggilan."
  },
  {
    "id": "travel-check-in",
    "title": "Travel Check-in",
    "description": "Latihan bicara saat check-in hotel atau bandara."
  },
  {
    "id": "job-interview",
    "title": "Job Interview",
    "description": "Menjawab pertanyaan interview dengan terstruktur."
  },
  {
    "id": "giving-opinion",
    "title": "Giving Opinions",
    "description": "Mengutarakan pendapat dan alasan secara sopan."
  },
  {
    "id": "describing-picture",
    "title": "Describing a Picture",
    "description": "Mendeskripsikan gambar dengan urutan dan detail."
  },
  {
    "id": "storytelling",
    "title": "Storytelling",
    "description": "Menceritakan pengalaman singkat dengan alur jelas."
  },
  {
    "id": "complaint-request",
    "title": "Complaint & Request",
    "description": "Menyampaikan keluhan dengan tetap sopan."
  },
  {
    "id": "presentation-opening",
    "title": "Presentation Opening",
    "description": "Membuka presentasi dengan tujuan dan struktur."
  },
  {
    "id": "agree-disagree",
    "title": "Agreeing & Disagreeing",
    "description": "Setuju dan tidak setuju tanpa terdengar kasar."
  },
  {
    "id": "future-plans",
    "title": "Future Plans",
    "description": "Berbicara tentang rencana, target, dan harapan."
  }
];

const writingTopics: Topic[] = [
  {
    "id": "simple-sentences",
    "title": "Simple Sentences",
    "description": "Latihan membuat kalimat pendek yang jelas dan benar."
  },
  {
    "id": "daily-journal",
    "title": "Daily Journal",
    "description": "Menulis catatan harian singkat dengan urutan waktu."
  },
  {
    "id": "email-request",
    "title": "Email Request",
    "description": "Menulis email permintaan dengan sopan dan rapi."
  },
  {
    "id": "opinion-paragraph",
    "title": "Opinion Paragraph",
    "description": "Menulis pendapat dengan alasan dan contoh."
  },
  {
    "id": "descriptive-place",
    "title": "Describing a Place",
    "description": "Mendeskripsikan tempat dengan detail sensorik."
  },
  {
    "id": "story-writing",
    "title": "Short Story",
    "description": "Menulis cerita pendek dengan awal, konflik, dan akhir."
  },
  {
    "id": "compare-contrast",
    "title": "Compare & Contrast",
    "description": "Membandingkan dua hal dengan connector yang tepat."
  },
  {
    "id": "problem-solution",
    "title": "Problem & Solution",
    "description": "Menulis masalah dan solusi dengan alur logis."
  },
  {
    "id": "social-media-caption",
    "title": "Social Media Caption",
    "description": "Menulis caption singkat yang natural dan menarik."
  },
  {
    "id": "formal-letter",
    "title": "Formal Letter",
    "description": "Menulis surat formal dengan nada profesional."
  },
  {
    "id": "application-message",
    "title": "Application Message",
    "description": "Menulis pesan lamaran singkat dan meyakinkan."
  },
  {
    "id": "review-writing",
    "title": "Review Writing",
    "description": "Menulis ulasan produk, tempat, atau pengalaman."
  },
  {
    "id": "academic-summary",
    "title": "Academic Summary",
    "description": "Merangkum teks akademik dengan singkat dan objektif."
  },
  {
    "id": "argument-essay",
    "title": "Argument Essay",
    "description": "Menulis argumen dengan thesis, alasan, dan counterpoint."
  },
  {
    "id": "editing-proofreading",
    "title": "Editing & Proofreading",
    "description": "Melatih memperbaiki kalimat agar jelas dan akurat."
  }
];

const readingTopics: Topic[] = [
  {
    "id": "daily-life",
    "title": "Daily Life",
    "description": "Bacaan pendek tentang rutinitas dan kebiasaan sehari-hari."
  },
  {
    "id": "school-notice",
    "title": "School Notice",
    "description": "Membaca pengumuman sekolah dan menangkap informasi penting."
  },
  {
    "id": "travel-blog",
    "title": "Travel Blog",
    "description": "Membaca cerita perjalanan dan memahami opini penulis."
  },
  {
    "id": "health-article",
    "title": "Health Article",
    "description": "Membaca artikel kesehatan ringan dengan detail saran."
  },
  {
    "id": "technology-news",
    "title": "Technology News",
    "description": "Membaca berita singkat tentang teknologi dan dampaknya."
  },
  {
    "id": "restaurant-review",
    "title": "Restaurant Review",
    "description": "Membaca ulasan restoran dan membedakan fakta serta opini."
  },
  {
    "id": "work-email",
    "title": "Work Email",
    "description": "Membaca email kantor dan memahami action item."
  },
  {
    "id": "environment",
    "title": "Environment",
    "description": "Membaca teks lingkungan dengan hubungan sebab-akibat."
  },
  {
    "id": "biography",
    "title": "Short Biography",
    "description": "Membaca biografi singkat dan memahami pencapaian tokoh."
  },
  {
    "id": "shopping-policy",
    "title": "Shopping Policy",
    "description": "Membaca aturan toko dan memahami syarat penting."
  },
  {
    "id": "science-fact",
    "title": "Science Fact",
    "description": "Membaca fakta sains singkat dan menarik kesimpulan."
  },
  {
    "id": "event-schedule",
    "title": "Event Schedule",
    "description": "Membaca jadwal acara dan menemukan urutan kegiatan."
  },
  {
    "id": "opinion-column",
    "title": "Opinion Column",
    "description": "Membaca opini dan memahami alasan penulis."
  },
  {
    "id": "instructions",
    "title": "Instructions",
    "description": "Membaca instruksi dan memahami langkah-langkah."
  },
  {
    "id": "culture",
    "title": "Culture",
    "description": "Membaca teks budaya dan memahami makna kebiasaan."
  }
];

const listeningTopics: Topic[] = [
  {
    "id": "coffee-order",
    "title": "Ordering Coffee",
    "description": "Percakapan cepat saat memesan minuman di cafe."
  },
  {
    "id": "hotel-check-in",
    "title": "Hotel Check-in",
    "description": "Dialog resepsionis dan tamu saat check-in."
  },
  {
    "id": "job-interview",
    "title": "Job Interview Small Talk",
    "description": "Pembuka interview sebelum pertanyaan utama."
  },
  {
    "id": "doctor-appointment",
    "title": "Doctor Appointment",
    "description": "Pasien menjelaskan gejala ke dokter."
  },
  {
    "id": "directions",
    "title": "Asking for Directions",
    "description": "Minta arah ke stasiun dan memahami instruksi."
  },
  {
    "id": "meeting-update",
    "title": "Project Meeting Update",
    "description": "Update singkat dalam meeting kantor."
  },
  {
    "id": "airport-security",
    "title": "Airport Security",
    "description": "Instruksi petugas keamanan bandara."
  },
  {
    "id": "restaurant-complaint",
    "title": "Restaurant Complaint",
    "description": "Komplain sopan tentang pesanan restoran."
  },
  {
    "id": "shopping-return",
    "title": "Returning an Item",
    "description": "Mengembalikan barang ke toko."
  },
  {
    "id": "phone-call",
    "title": "Making a Phone Call",
    "description": "Telepon kantor dan meninggalkan pesan."
  },
  {
    "id": "weekend-plans",
    "title": "Weekend Plans",
    "description": "Percakapan santai tentang rencana akhir pekan."
  },
  {
    "id": "apartment-viewing",
    "title": "Apartment Viewing",
    "description": "Melihat apartemen dan bertanya fasilitas."
  },
  {
    "id": "tech-support",
    "title": "Tech Support",
    "description": "Percakapan support saat aplikasi bermasalah."
  },
  {
    "id": "class-discussion",
    "title": "Class Discussion",
    "description": "Diskusi kelas tentang tugas kelompok."
  },
  {
    "id": "news-briefing",
    "title": "Short News Briefing",
    "description": "Mendengar ringkasan berita singkat."
  }
];

const arabicMufradatTopics: Topic[] = [
  {
    "id": "arabic-mufradat-salam",
    "title": "Mufradat 1: Salam",
    "description": "Kosakata salam dan sapaan dasar dalam bahasa Arab."
  },
  {
    "id": "arabic-mufradat-keluarga",
    "title": "Mufradat 2: Keluarga",
    "description": "Kosakata anggota keluarga inti."
  },
  {
    "id": "arabic-mufradat-kelas",
    "title": "Mufradat 3: Kelas",
    "description": "Kosakata benda dan orang di kelas."
  },
  {
    "id": "arabic-mufradat-rumah",
    "title": "Mufradat 4: Rumah",
    "description": "Kosakata bagian rumah sederhana."
  },
  {
    "id": "arabic-mufradat-angka-1-20",
    "title": "Mufradat 5: Angka 1-20",
    "description": "Kosakata angka dasar untuk hitungan awal."
  },
  {
    "id": "arabic-mufradat-warna",
    "title": "Mufradat 6: Warna",
    "description": "Kosakata warna paling sering digunakan."
  },
  {
    "id": "arabic-mufradat-makanan",
    "title": "Mufradat 7: Makanan",
    "description": "Kosakata makanan sehari-hari."
  },
  {
    "id": "arabic-mufradat-minuman",
    "title": "Mufradat 8: Minuman",
    "description": "Kosakata minuman dasar."
  },
  {
    "id": "arabic-mufradat-hari",
    "title": "Mufradat 9: Hari",
    "description": "Kosakata hari dan penanda waktu mingguan."
  },
  {
    "id": "arabic-mufradat-waktu",
    "title": "Mufradat 10: Waktu",
    "description": "Kosakata waktu dasar untuk rutinitas."
  },
  {
    "id": "arabic-mufradat-anggota-tubuh",
    "title": "Mufradat 11: Anggota Tubuh",
    "description": "Kosakata bagian tubuh sederhana."
  },
  {
    "id": "arabic-mufradat-pakaian",
    "title": "Mufradat 12: Pakaian",
    "description": "Kosakata pakaian dan benda yang dikenakan."
  },
  {
    "id": "arabic-mufradat-transportasi",
    "title": "Mufradat 13: Transportasi",
    "description": "Kosakata kendaraan umum dan pribadi."
  },
  {
    "id": "arabic-mufradat-tempat-umum",
    "title": "Mufradat 14: Tempat Umum",
    "description": "Kosakata lokasi umum di sekitar kota."
  },
  {
    "id": "arabic-mufradat-profesi",
    "title": "Mufradat 15: Profesi",
    "description": "Kosakata pekerjaan dasar."
  },
  {
    "id": "arabic-mufradat-hewan",
    "title": "Mufradat 16: Hewan",
    "description": "Kosakata hewan yang sering dikenalkan."
  },
  {
    "id": "arabic-mufradat-cuaca",
    "title": "Mufradat 17: Cuaca",
    "description": "Kosakata cuaca dan kondisi udara."
  },
  {
    "id": "arabic-mufradat-hobi",
    "title": "Mufradat 18: Hobi",
    "description": "Kosakata kegiatan waktu luang."
  },
  {
    "id": "arabic-mufradat-kata-kerja-harian",
    "title": "Mufradat 19: Kata Kerja Harian",
    "description": "Kata kerja dasar untuk aktivitas sehari-hari."
  },
  {
    "id": "arabic-mufradat-sifat-dasar",
    "title": "Mufradat 20: Sifat Dasar",
    "description": "Kosakata sifat untuk mendeskripsikan benda dan orang."
  },
  {
    "id": "arabic-mufradat-arah",
    "title": "Mufradat 21: Arah",
    "description": "Kosakata arah dan posisi dasar."
  },
  {
    "id": "arabic-mufradat-belanja",
    "title": "Mufradat 22: Belanja",
    "description": "Kosakata jual beli dan harga."
  },
  {
    "id": "arabic-mufradat-alat-tulis",
    "title": "Mufradat 23: Alat Tulis",
    "description": "Kosakata perlengkapan belajar."
  },
  {
    "id": "arabic-mufradat-buah",
    "title": "Mufradat 24: Buah",
    "description": "Kosakata buah-buahan dasar."
  },
  {
    "id": "arabic-mufradat-sayur",
    "title": "Mufradat 25: Sayur",
    "description": "Kosakata sayuran yang sering dipakai."
  },
  {
    "id": "arabic-mufradat-peralatan-rumah",
    "title": "Mufradat 26: Peralatan Rumah",
    "description": "Kosakata benda rumah tangga."
  },
  {
    "id": "arabic-mufradat-masjid",
    "title": "Mufradat 27: Masjid",
    "description": "Kosakata aktivitas dan benda di masjid."
  },
  {
    "id": "arabic-mufradat-sekolah",
    "title": "Mufradat 28: Sekolah",
    "description": "Kosakata kegiatan dan elemen sekolah."
  },
  {
    "id": "arabic-mufradat-kota",
    "title": "Mufradat 29: Kota",
    "description": "Kosakata tempat dan bagian kota."
  },
  {
    "id": "arabic-mufradat-negara",
    "title": "Mufradat 30: Negara",
    "description": "Kosakata negara dan identitas umum."
  },
  {
    "id": "arabic-mufradat-perasaan",
    "title": "Mufradat 31: Perasaan",
    "description": "Kosakata untuk mengungkapkan perasaan."
  },
  {
    "id": "arabic-mufradat-kesehatan",
    "title": "Mufradat 32: Kesehatan",
    "description": "Kosakata kesehatan dasar."
  },
  {
    "id": "arabic-mufradat-keluarga-besar",
    "title": "Mufradat 33: Keluarga Besar",
    "description": "Kosakata kerabat dalam keluarga besar."
  },
  {
    "id": "arabic-mufradat-aktivitas-pagi",
    "title": "Mufradat 34: Aktivitas Pagi",
    "description": "Kosakata rutinitas pagi."
  },
  {
    "id": "arabic-mufradat-aktivitas-malam",
    "title": "Mufradat 35: Aktivitas Malam",
    "description": "Kosakata rutinitas malam."
  },
  {
    "id": "arabic-mufradat-pertanyaan-umum",
    "title": "Mufradat 36: Pertanyaan Umum",
    "description": "Kata tanya yang sering dipakai."
  },
  {
    "id": "arabic-mufradat-kata-sambung",
    "title": "Mufradat 37: Kata Sambung",
    "description": "Kosakata penghubung kalimat dasar."
  },
  {
    "id": "arabic-mufradat-kata-depan",
    "title": "Mufradat 38: Kata Depan",
    "description": "Huruf jar dan preposisi paling dasar."
  },
  {
    "id": "arabic-mufradat-ungkapan-sopan",
    "title": "Mufradat 39: Ungkapan Sopan",
    "description": "Frasa sopan untuk percakapan harian."
  },
  {
    "id": "arabic-mufradat-review-mufradat",
    "title": "Mufradat 40: Review Mufradat",
    "description": "Review kosakata inti dari beberapa topik awal."
  }
];

const arabicNahwuTopics: Topic[] = [
  {
    "id": "arabic-nahwu-isim-fiil",
    "title": "Nahwu 1: Isim dan Fiil",
    "description": "Membedakan kata benda, kata kerja, dan huruf dasar dalam kalimat Arab."
  },
  {
    "id": "arabic-nahwu-mubtada-khabar",
    "title": "Nahwu 2: Mubtada dan Khabar",
    "description": "Mengenali subjek dan informasi utama dalam jumlah ismiyyah."
  },
  {
    "id": "arabic-nahwu-kata-tunjuk",
    "title": "Nahwu 3: Kata Tunjuk",
    "description": "Memakai hadza, hadzihi, dzalika, dan tilka sesuai benda yang ditunjuk."
  },
  {
    "id": "arabic-nahwu-dhamir-munfashil",
    "title": "Nahwu 4: Dhamir Munfashil",
    "description": "Menghafal kata ganti terpisah untuk membuat kalimat sederhana."
  },
  {
    "id": "arabic-nahwu-mudzakkar-muannats",
    "title": "Nahwu 5: Mudzakkar dan Muannats",
    "description": "Mengenali jenis kata maskulin dan feminin pada kata Arab dasar."
  },
  {
    "id": "arabic-nahwu-mufrad-mutsanna-jamak",
    "title": "Nahwu 6: Mufrad, Mutsanna, dan Jamak",
    "description": "Mengenal jumlah tunggal, dua, dan banyak dalam kata Arab."
  },
  {
    "id": "arabic-nahwu-huruf-jar",
    "title": "Nahwu 7: Huruf Jar",
    "description": "Memahami kata depan Arab yang membuat isim setelahnya majrur."
  },
  {
    "id": "arabic-nahwu-jumlah-ismiyyah",
    "title": "Nahwu 8: Jumlah Ismiyyah",
    "description": "Mengenali kalimat Arab yang dimulai dengan isim atau dhamir."
  },
  {
    "id": "arabic-nahwu-jumlah-fiiliyyah",
    "title": "Nahwu 9: Jumlah Fiiliyyah",
    "description": "Mengenali kalimat Arab yang dimulai dengan fiil."
  },
  {
    "id": "arabic-nahwu-kata-tanya",
    "title": "Nahwu 10: Kata Tanya",
    "description": "Memakai kata tanya Arab dasar untuk orang, benda, tempat, dan waktu."
  },
  {
    "id": "arabic-nahwu-naat-manuut",
    "title": "Nahwu 11: Naat dan Manuut",
    "description": "Mengenali sifat dan kata yang disifati dalam frasa Arab."
  },
  {
    "id": "arabic-nahwu-idafah-dasar",
    "title": "Nahwu 12: Idafah Dasar",
    "description": "Memahami susunan kepemilikan atau hubungan dua isim."
  },
  {
    "id": "arabic-nahwu-fiil-madhi",
    "title": "Nahwu 13: Fiil Madhi",
    "description": "Mengenali kata kerja lampau pada contoh Arab pendek."
  },
  {
    "id": "arabic-nahwu-fiil-mudhari",
    "title": "Nahwu 14: Fiil Mudhari",
    "description": "Mengenali kata kerja sedang atau akan terjadi."
  },
  {
    "id": "arabic-nahwu-fiil-amr",
    "title": "Nahwu 15: Fiil Amr",
    "description": "Mengenali bentuk perintah Arab yang sering dipakai di kelas."
  },
  {
    "id": "arabic-nahwu-negasi-laa",
    "title": "Nahwu 16: Negasi Laa",
    "description": "Memahami penggunaan laa untuk meniadakan atau melarang."
  },
  {
    "id": "arabic-nahwu-negasi-maa",
    "title": "Nahwu 17: Negasi Maa",
    "description": "Memakai maa untuk meniadakan kejadian lampau atau kepemilikan sederhana."
  },
  {
    "id": "arabic-nahwu-urutan-kata",
    "title": "Nahwu 18: Urutan Kata",
    "description": "Melatih susunan kata dalam jumlah ismiyyah dan fiiliyyah."
  },
  {
    "id": "arabic-nahwu-kalimat-sederhana",
    "title": "Nahwu 19: Kalimat Sederhana",
    "description": "Menyusun kalimat Arab pendek untuk identitas, kepemilikan, dan aktivitas."
  },
  {
    "id": "arabic-nahwu-review-nahwu-pemula",
    "title": "Nahwu 20: Review Nahwu Pemula",
    "description": "Mengulang kaidah inti dari topik nahwu pemula dalam kalimat campuran."
  }
];

const arabicIstimaTopics: Topic[] = [
  {
    "id": "arabic-istima-bunyi-pendek-panjang",
    "title": "Istima 1: Bunyi Pendek dan Panjang",
    "description": "Melatih telinga membedakan harakat pendek dan bunyi mad panjang."
  },
  {
    "id": "arabic-istima-salam-terdengar",
    "title": "Istima 2: Salam Terdengar",
    "description": "Menangkap salam, jawaban salam, dan sapaan Arab sederhana."
  },
  {
    "id": "arabic-istima-nama-orang",
    "title": "Istima 3: Nama Orang",
    "description": "Menangkap nama yang disebut dalam pertanyaan dan jawaban pendek."
  },
  {
    "id": "arabic-istima-asal-negara",
    "title": "Istima 4: Asal Negara",
    "description": "Mendengar frasa asal negara dan kota dengan pola min."
  },
  {
    "id": "arabic-istima-kata-kelas",
    "title": "Istima 5: Kata Kelas",
    "description": "Menangkap kosakata benda kelas dari audio pendek."
  },
  {
    "id": "arabic-istima-kata-rumah",
    "title": "Istima 6: Kata Rumah",
    "description": "Mendengar kata rumah, kamar, pintu, dan dapur dalam kalimat pendek."
  },
  {
    "id": "arabic-istima-angka-terdengar",
    "title": "Istima 7: Angka Terdengar",
    "description": "Melatih telinga mengenali angka Arab dasar dalam konteks pendek."
  },
  {
    "id": "arabic-istima-warna-terdengar",
    "title": "Istima 8: Warna Terdengar",
    "description": "Menangkap nama warna saat mendengar deskripsi benda."
  },
  {
    "id": "arabic-istima-instruksi-kelas",
    "title": "Istima 9: Instruksi Kelas",
    "description": "Memahami perintah guru yang sering terdengar di kelas Arab."
  },
  {
    "id": "arabic-istima-makanan-minuman",
    "title": "Istima 10: Makanan dan Minuman",
    "description": "Mendengar pilihan makanan dan minuman dalam kalimat harian."
  },
  {
    "id": "arabic-istima-apa-kabar",
    "title": "Istima 11: Apa Kabar",
    "description": "Mendengar tanya kabar dan respons singkat dalam percakapan."
  },
  {
    "id": "arabic-istima-jam-sederhana",
    "title": "Istima 12: Jam Sederhana",
    "description": "Menangkap waktu sederhana dari audio Arab pendek."
  },
  {
    "id": "arabic-istima-lokasi-benda",
    "title": "Istima 13: Lokasi Benda",
    "description": "Memahami posisi benda melalui kata depan Arab dasar."
  },
  {
    "id": "arabic-istima-keluarga-terdengar",
    "title": "Istima 14: Keluarga Terdengar",
    "description": "Menangkap sebutan anggota keluarga dalam kalimat pendek."
  },
  {
    "id": "arabic-istima-hobi-terdengar",
    "title": "Istima 15: Hobi Terdengar",
    "description": "Mendengar aktivitas hobi dan kesukaan sederhana."
  },
  {
    "id": "arabic-istima-arah-sederhana",
    "title": "Istima 16: Arah Sederhana",
    "description": "Menangkap arah kanan, kiri, depan, dan belakang."
  },
  {
    "id": "arabic-istima-dialog-pasar",
    "title": "Istima 17: Dialog Pasar",
    "description": "Mendengar frasa jual beli, harga, dan permintaan sederhana."
  },
  {
    "id": "arabic-istima-dialog-sekolah",
    "title": "Istima 18: Dialog Sekolah",
    "description": "Mendengar percakapan singkat tentang kelas, guru, dan pelajaran."
  },
  {
    "id": "arabic-istima-pengumuman-pendek",
    "title": "Istima 19: Pengumuman Pendek",
    "description": "Menangkap informasi penting dari pengumuman Arab singkat."
  },
  {
    "id": "arabic-istima-cerita-audio-mini",
    "title": "Istima 20: Cerita Audio Mini",
    "description": "Memahami cerita sangat pendek tentang rutinitas sehari-hari."
  }
];

const arabicKalamTopics: Topic[] = [
  {
    "id": "arabic-kalam-salam-dan-sapaan",
    "title": "Kalam 1: Salam dan Sapaan",
    "description": "Latihan membuka percakapan dengan salam dan sapaan sederhana."
  },
  {
    "id": "arabic-kalam-memperkenalkan-nama",
    "title": "Kalam 2: Memperkenalkan Nama",
    "description": "Latihan menyebut nama dan menanyakan nama orang lain."
  },
  {
    "id": "arabic-kalam-asal-negara",
    "title": "Kalam 3: Asal Negara",
    "description": "Latihan menyebut asal negara atau kota dengan pola ana min."
  },
  {
    "id": "arabic-kalam-menanyakan-kabar",
    "title": "Kalam 4: Menanyakan Kabar",
    "description": "Latihan tanya kabar dan memberi jawaban singkat yang natural."
  },
  {
    "id": "arabic-kalam-ucapan-terima-kasih",
    "title": "Kalam 5: Ucapan Terima Kasih",
    "description": "Latihan mengucapkan terima kasih dan meresponsnya."
  },
  {
    "id": "arabic-kalam-permintaan-maaf",
    "title": "Kalam 6: Permintaan Maaf",
    "description": "Latihan meminta maaf dan memberi alasan pendek."
  },
  {
    "id": "arabic-kalam-izin-dan-permisi",
    "title": "Kalam 7: Izin dan Permisi",
    "description": "Latihan meminta izin masuk, keluar, atau berbicara."
  },
  {
    "id": "arabic-kalam-keluarga-dekat",
    "title": "Kalam 8: Keluarga Dekat",
    "description": "Latihan berbicara tentang ayah, ibu, saudara, dan saudari."
  },
  {
    "id": "arabic-kalam-benda-di-kelas",
    "title": "Kalam 9: Benda di Kelas",
    "description": "Latihan menyebut benda kelas dan lokasinya."
  },
  {
    "id": "arabic-kalam-aktivitas-harian",
    "title": "Kalam 10: Aktivitas Harian",
    "description": "Latihan berbicara tentang rutinitas pagi, belajar, dan tidur."
  },
  {
    "id": "arabic-kalam-makanan-dan-minuman",
    "title": "Kalam 11: Makanan dan Minuman",
    "description": "Latihan memesan, menyebut suka, dan meminta makanan sederhana."
  },
  {
    "id": "arabic-kalam-angka-sederhana",
    "title": "Kalam 12: Angka Sederhana",
    "description": "Latihan memakai angka dalam percakapan harian."
  },
  {
    "id": "arabic-kalam-waktu-dan-jam",
    "title": "Kalam 13: Waktu dan Jam",
    "description": "Latihan bertanya jam dan menyebut waktu sederhana."
  },
  {
    "id": "arabic-kalam-arah-sederhana",
    "title": "Kalam 14: Arah Sederhana",
    "description": "Latihan meminta dan memberi arah kanan, kiri, depan, dan belakang."
  },
  {
    "id": "arabic-kalam-berbelanja-ringan",
    "title": "Kalam 15: Berbelanja Ringan",
    "description": "Latihan bertanya harga, meminta barang, dan menutup transaksi."
  },
  {
    "id": "arabic-kalam-transportasi",
    "title": "Kalam 16: Transportasi",
    "description": "Latihan bicara tentang kendaraan dan perjalanan singkat."
  },
  {
    "id": "arabic-kalam-hobi",
    "title": "Kalam 17: Hobi",
    "description": "Latihan menyebut hobi dan alasan sederhana."
  },
  {
    "id": "arabic-kalam-cuaca",
    "title": "Kalam 18: Cuaca",
    "description": "Latihan bicara tentang cuaca hari ini."
  },
  {
    "id": "arabic-kalam-janji-bertemu",
    "title": "Kalam 19: Janji Bertemu",
    "description": "Latihan membuat janji bertemu dengan waktu dan tempat sederhana."
  },
  {
    "id": "arabic-kalam-review-dialog-pemula",
    "title": "Kalam 20: Review Dialog Pemula",
    "description": "Menggabungkan salam, perkenalan, asal, kabar, dan penutup."
  }
];

const arabicQiraahTopics: Topic[] = [
  {
    "id": "arabic-qiraah-huruf-dan-kata-pendek",
    "title": "Qiraah 1: Huruf dan Kata Pendek",
    "description": "Melatih membaca kata Arab pendek berharakat dengan makna dasar."
  },
  {
    "id": "arabic-qiraah-salam-tertulis",
    "title": "Qiraah 2: Salam Tertulis",
    "description": "Membaca salam, respons, dan sapaan pendek dalam teks Arab."
  },
  {
    "id": "arabic-qiraah-nama-dan-asal",
    "title": "Qiraah 3: Nama dan Asal",
    "description": "Membaca teks singkat tentang nama, asal negara, dan kota."
  },
  {
    "id": "arabic-qiraah-keluarga",
    "title": "Qiraah 4: Keluarga",
    "description": "Membaca kalimat tentang anggota keluarga dekat."
  },
  {
    "id": "arabic-qiraah-sekolah",
    "title": "Qiraah 5: Sekolah",
    "description": "Membaca teks pendek tentang kelas, guru, dan alat belajar."
  },
  {
    "id": "arabic-qiraah-rumah",
    "title": "Qiraah 6: Rumah",
    "description": "Membaca deskripsi rumah, ruangan, dan posisi benda."
  },
  {
    "id": "arabic-qiraah-waktu-harian",
    "title": "Qiraah 7: Waktu Harian",
    "description": "Membaca kalimat tentang pagi, siang, malam, dan rutinitas."
  },
  {
    "id": "arabic-qiraah-angka-1-20",
    "title": "Qiraah 8: Angka 1-20",
    "description": "Membaca angka sederhana dalam kalimat Arab harian."
  },
  {
    "id": "arabic-qiraah-warna-dan-benda",
    "title": "Qiraah 9: Warna dan Benda",
    "description": "Membaca deskripsi warna untuk benda di sekitar."
  },
  {
    "id": "arabic-qiraah-makanan-sederhana",
    "title": "Qiraah 10: Makanan Sederhana",
    "description": "Membaca teks pendek tentang makanan, minuman, dan kesukaan."
  },
  {
    "id": "arabic-qiraah-pasar-kecil",
    "title": "Qiraah 11: Pasar Kecil",
    "description": "Membaca kalimat jual beli sederhana di pasar."
  },
  {
    "id": "arabic-qiraah-masjid-dan-tempat-umum",
    "title": "Qiraah 12: Masjid dan Tempat Umum",
    "description": "Membaca teks tentang masjid, jalan, toko, dan tempat sekitar."
  },
  {
    "id": "arabic-qiraah-cuaca",
    "title": "Qiraah 13: Cuaca",
    "description": "Membaca kalimat tentang cuaca, panas, dingin, dan hujan."
  },
  {
    "id": "arabic-qiraah-hobi",
    "title": "Qiraah 14: Hobi",
    "description": "Membaca bacaan pendek tentang hobi dan kegiatan waktu luang."
  },
  {
    "id": "arabic-qiraah-transportasi",
    "title": "Qiraah 15: Transportasi",
    "description": "Membaca teks tentang kendaraan dan perjalanan pendek."
  },
  {
    "id": "arabic-qiraah-arah-sederhana",
    "title": "Qiraah 16: Arah Sederhana",
    "description": "Membaca instruksi arah kanan, kiri, depan, dan belakang."
  },
  {
    "id": "arabic-qiraah-kesehatan-dasar",
    "title": "Qiraah 17: Kesehatan Dasar",
    "description": "Membaca teks pendek tentang sakit, sehat, obat, dan dokter."
  },
  {
    "id": "arabic-qiraah-pekerjaan",
    "title": "Qiraah 18: Pekerjaan",
    "description": "Membaca deskripsi profesi dan tempat kerja sederhana."
  },
  {
    "id": "arabic-qiraah-undangan-pendek",
    "title": "Qiraah 19: Undangan Pendek",
    "description": "Membaca undangan sederhana, waktu, tempat, dan ajakan."
  },
  {
    "id": "arabic-qiraah-cerita-mini",
    "title": "Qiraah 20: Cerita Mini",
    "description": "Membaca cerita sangat pendek berisi urutan kegiatan harian."
  }
];

const arabicKitabahTopics: Topic[] = [
  {
    "id": "arabic-kitabah-menulis-huruf-sambung",
    "title": "Kitabah 1: Menulis Huruf Sambung",
    "description": "Melatih bentuk huruf Arab ketika berdiri sendiri dan tersambung."
  },
  {
    "id": "arabic-kitabah-menyalin-kata-berharakat",
    "title": "Kitabah 2: Menyalin Kata Berharakat",
    "description": "Menyalin kata Arab pendek dengan fathah, kasrah, dhammah, dan sukun."
  },
  {
    "id": "arabic-kitabah-menulis-salam",
    "title": "Kitabah 3: Menulis Salam",
    "description": "Menulis salam, jawaban salam, dan sapaan singkat."
  },
  {
    "id": "arabic-kitabah-identitas-diri",
    "title": "Kitabah 4: Menulis Identitas Diri",
    "description": "Menulis nama, asal, status pelajar, dan bahasa yang dipelajari."
  },
  {
    "id": "arabic-kitabah-jumlah-ismiyyah-sederhana",
    "title": "Kitabah 5: Jumlah Ismiyyah Sederhana",
    "description": "Menulis kalimat nominal dasar dengan mubtada dan khabar."
  },
  {
    "id": "arabic-kitabah-kata-tunjuk",
    "title": "Kitabah 6: Kata Tunjuk",
    "description": "Menulis kalimat dengan هذا dan هذه untuk benda maskulin dan feminin."
  },
  {
    "id": "arabic-kitabah-dhamir-dasar",
    "title": "Kitabah 7: Dhamir Dasar",
    "description": "Menulis kalimat pendek memakai kata ganti dasar."
  },
  {
    "id": "arabic-kitabah-benda-di-kelas",
    "title": "Kitabah 8: Benda di Kelas",
    "description": "Menulis kalimat tentang benda kelas dan posisinya."
  },
  {
    "id": "arabic-kitabah-keluarga-saya",
    "title": "Kitabah 9: Keluarga Saya",
    "description": "Menulis kalimat pendek tentang anggota keluarga."
  },
  {
    "id": "arabic-kitabah-rutinitas-pagi",
    "title": "Kitabah 10: Rutinitas Pagi",
    "description": "Menulis kegiatan pagi dengan kata kerja sederhana."
  },
  {
    "id": "arabic-kitabah-kalimat-tanya",
    "title": "Kitabah 11: Kalimat Tanya",
    "description": "Menulis pertanyaan dasar dengan من، ما، أين، كيف."
  },
  {
    "id": "arabic-kitabah-jawaban-ya-tidak",
    "title": "Kitabah 12: Jawaban Ya/Tidak",
    "description": "Menulis jawaban singkat memakai نعم dan لا."
  },
  {
    "id": "arabic-kitabah-preposisi-dasar",
    "title": "Kitabah 13: Preposisi Dasar",
    "description": "Menulis kalimat dengan في، على، من، إلى."
  },
  {
    "id": "arabic-kitabah-deskripsi-warna",
    "title": "Kitabah 14: Deskripsi Warna",
    "description": "Menulis warna benda dengan kesesuaian sederhana."
  },
  {
    "id": "arabic-kitabah-angka-dalam-kalimat",
    "title": "Kitabah 15: Angka dalam Kalimat",
    "description": "Menulis jumlah benda dengan angka dasar."
  },
  {
    "id": "arabic-kitabah-pesan-pendek",
    "title": "Kitabah 16: Pesan Pendek",
    "description": "Menulis pesan singkat untuk teman atau guru."
  },
  {
    "id": "arabic-kitabah-paragraf-3-kalimat",
    "title": "Kitabah 17: Paragraf 3 Kalimat",
    "description": "Menulis paragraf mini berisi tiga kalimat terhubung."
  },
  {
    "id": "arabic-kitabah-dialog-mini",
    "title": "Kitabah 18: Dialog Mini",
    "description": "Menulis dialog sangat pendek berisi tanya jawab harian."
  },
  {
    "id": "arabic-kitabah-kartu-perkenalan",
    "title": "Kitabah 19: Kartu Perkenalan",
    "description": "Menulis kartu identitas sederhana berisi nama, asal, dan hobi."
  },
  {
    "id": "arabic-kitabah-review-tulisan-pemula",
    "title": "Kitabah 20: Review Tulisan Pemula",
    "description": "Menggabungkan salam, identitas, lokasi, dan paragraf pendek."
  }
];

const arabicMakharijTopics: Topic[] = [
  {
    "id": "arabic-makharij-makharij-tenggorokan",
    "title": "Makharij 1: Makharij Tenggorokan",
    "description": "Melatih huruf halqi yang keluar dari area tenggorokan."
  },
  {
    "id": "arabic-makharij-huruf-bibir",
    "title": "Makharij 2: Huruf Bibir",
    "description": "Melatih huruf yang keluar dari bibir dan sekitarnya."
  },
  {
    "id": "arabic-makharij-huruf-lidah-depan",
    "title": "Makharij 3: Huruf Lidah Depan",
    "description": "Melatih huruf yang banyak memakai ujung lidah."
  },
  {
    "id": "arabic-makharij-huruf-tebal",
    "title": "Makharij 4: Huruf Tebal",
    "description": "Melatih huruf tafkhim agar bunyinya penuh dan mantap."
  },
  {
    "id": "arabic-makharij-huruf-tipis",
    "title": "Makharij 5: Huruf Tipis",
    "description": "Melatih huruf tarqiq agar tidak terdengar terlalu berat."
  },
  {
    "id": "arabic-makharij-harakat-fathah",
    "title": "Makharij 6: Harakat Fathah",
    "description": "Melatih bunyi a pendek pada huruf Arab."
  },
  {
    "id": "arabic-makharij-kasrah",
    "title": "Makharij 7: Kasrah",
    "description": "Melatih bunyi i pendek di bawah huruf."
  },
  {
    "id": "arabic-makharij-dhammah",
    "title": "Makharij 8: Dhammah",
    "description": "Melatih bunyi u pendek dengan bibir membulat."
  },
  {
    "id": "arabic-makharij-sukun",
    "title": "Makharij 9: Sukun",
    "description": "Melatih huruf mati tanpa vokal setelahnya."
  },
  {
    "id": "arabic-makharij-tasydid",
    "title": "Makharij 10: Tasydid",
    "description": "Melatih huruf ganda agar ditekan sebentar lalu dilepas."
  },
  {
    "id": "arabic-makharij-mad-asli",
    "title": "Makharij 11: Mad Asli",
    "description": "Melatih panjang dua harakat pada alif, waw, dan ya mad."
  },
  {
    "id": "arabic-makharij-hamzah",
    "title": "Makharij 12: Hamzah",
    "description": "Melatih hamzah di awal, tengah, dan akhir kata."
  },
  {
    "id": "arabic-makharij-ain-dan-ha",
    "title": "Makharij 13: Ain dan Ha",
    "description": "Membedakan ع، ح، ه agar tidak tertukar."
  },
  {
    "id": "arabic-makharij-qaf-dan-kaf",
    "title": "Makharij 14: Qaf dan Kaf",
    "description": "Membedakan ق yang tebal dan ك yang ringan."
  },
  {
    "id": "arabic-makharij-sin-dan-shad",
    "title": "Makharij 15: Sin dan Shad",
    "description": "Membedakan س tipis dan ص tebal."
  },
  {
    "id": "arabic-makharij-dal-dan-dhad",
    "title": "Makharij 16: Dal dan Dhad",
    "description": "Membedakan د tipis dan ض tebal."
  },
  {
    "id": "arabic-makharij-ra-tafkhim",
    "title": "Makharij 17: Ra Tafkhim",
    "description": "Melatih ra yang dibaca tebal dalam kondisi tertentu."
  },
  {
    "id": "arabic-makharij-lam-jalalah",
    "title": "Makharij 18: Lam Jalalah",
    "description": "Melatih lam pada lafaz Allah dalam kondisi tebal dan tipis."
  },
  {
    "id": "arabic-makharij-waqaf-pendek",
    "title": "Makharij 19: Waqaf Pendek",
    "description": "Melatih berhenti singkat di akhir kata dan kalimat."
  },
  {
    "id": "arabic-makharij-review-pelafalan-pemula",
    "title": "Makharij 20: Review Pelafalan Pemula",
    "description": "Menggabungkan huruf halqi, tebal-tipis, mad, dan waqaf."
  }
];

const mandarinPinyinTopics: Topic[] = [
  {
    "id": "mandarin-pinyin-tone-1-high-flat",
    "title": "Pīnyīn 1: Tone 1 High Flat",
    "description": "Melatih nada pertama yang tinggi, datar, dan stabil tanpa naik turun."
  },
  {
    "id": "mandarin-pinyin-tone-2-rising",
    "title": "Pīnyīn 2: Tone 2 Rising",
    "description": "Melatih nada kedua yang naik seperti intonasi bertanya singkat."
  },
  {
    "id": "mandarin-pinyin-tone-3-dipping",
    "title": "Pīnyīn 3: Tone 3 Dipping",
    "description": "Melatih nada ketiga yang rendah dan melengkung turun-naik secara ringan."
  },
  {
    "id": "mandarin-pinyin-tone-4-falling",
    "title": "Pīnyīn 4: Tone 4 Falling",
    "description": "Melatih nada keempat yang jatuh tegas dari tinggi ke rendah."
  },
  {
    "id": "mandarin-pinyin-neutral-tone",
    "title": "Pīnyīn 5: Neutral Tone",
    "description": "Melatih nada netral yang ringan, pendek, dan mengikuti nada sebelumnya."
  },
  {
    "id": "mandarin-pinyin-tone-pairs-1-1-and-1-4",
    "title": "Pīnyīn 6: Tone Pairs 1-1 and 1-4",
    "description": "Melatih pasangan nada dari nada pertama ke nada pertama atau keempat."
  },
  {
    "id": "mandarin-pinyin-tone-pairs-2-2-and-2-4",
    "title": "Pīnyīn 7: Tone Pairs 2-2 and 2-4",
    "description": "Melatih pasangan nada naik-naik dan naik-jatuh dalam kata sehari-hari."
  },
  {
    "id": "mandarin-pinyin-third-tone-sandhi-basics",
    "title": "Pīnyīn 8: Third Tone Sandhi Basics",
    "description": "Melatih perubahan nada ketiga saat bertemu nada ketiga lain."
  },
  {
    "id": "mandarin-pinyin-pinyin-initials-b-p-m-f",
    "title": "Pīnyīn 9: Pinyin Initials b p m f",
    "description": "Melatih bunyi bibir b, p, m, dan f dalam pīnyīn Mandarin."
  },
  {
    "id": "mandarin-pinyin-pinyin-initials-d-t-n-l",
    "title": "Pīnyīn 10: Pinyin Initials d t n l",
    "description": "Melatih bunyi ujung lidah d, t, n, dan l."
  },
  {
    "id": "mandarin-pinyin-pinyin-initials-g-k-h",
    "title": "Pīnyīn 11: Pinyin Initials g k h",
    "description": "Melatih bunyi belakang lidah g, k, dan h."
  },
  {
    "id": "mandarin-pinyin-finals-a-o-e",
    "title": "Pīnyīn 12: Finals a o e",
    "description": "Melatih final dasar a, o, dan e sebagai inti suku kata Mandarin."
  },
  {
    "id": "mandarin-pinyin-finals-i-u-u-umlaut",
    "title": "Pīnyīn 13: Finals i u ü",
    "description": "Melatih final i, u, dan ü, termasuk posisi bibir untuk ü."
  },
  {
    "id": "mandarin-pinyin-finals-ai-ei-ao-ou",
    "title": "Pīnyīn 14: Finals ai ei ao ou",
    "description": "Melatih diftong dasar ai, ei, ao, dan ou dengan transisi vokal jelas."
  },
  {
    "id": "mandarin-pinyin-finals-an-en-ang-eng",
    "title": "Pīnyīn 15: Finals an en ang eng",
    "description": "Melatih nasal depan dan belakang dalam final an, en, ang, dan eng."
  },
  {
    "id": "mandarin-pinyin-syllable-ni-hao",
    "title": "Pīnyīn 16: Syllable nǐ hǎo",
    "description": "Melatih salam paling dasar dengan sandhi nada ketiga yang natural."
  },
  {
    "id": "mandarin-pinyin-syllable-xie-xie",
    "title": "Pīnyīn 17: Syllable xièxie",
    "description": "Melatih x, final ie, dan nada netral dalam ucapan terima kasih."
  },
  {
    "id": "mandarin-pinyin-read-name-slowly",
    "title": "Pīnyīn 18: Read Name Slowly",
    "description": "Melatih membaca nama Mandarin pelan dengan nada dan suku kata terpisah jelas."
  },
  {
    "id": "mandarin-pinyin-shadowing-mini-dialogue",
    "title": "Pīnyīn 19: Shadowing Mini Dialogue",
    "description": "Melatih tiruan pendek untuk salam, nama, dan respons dasar."
  },
  {
    "id": "mandarin-pinyin-hsk-1-pronunciation-review",
    "title": "Pīnyīn 20: HSK 1 Pronunciation Review",
    "description": "Menggabungkan nada, initial-final, sandhi, dan shadowing dasar HSK 1."
  }
];

const mandarinYufaTopics: Topic[] = [
  {
    "id": "mandarin-yufa-basic-word-order-wo-shi",
    "title": "Yǔfǎ 1: Basic Word Order: 我 + 是 + ...",
    "description": "Melatih urutan dasar SVO dalam kalimat identitas sederhana."
  },
  {
    "id": "mandarin-yufa-yes-no-questions-with-ma",
    "title": "Yǔfǎ 2: Yes/No Questions with 吗",
    "description": "Mengubah kalimat pernyataan menjadi pertanyaan ya/tidak memakai 吗."
  },
  {
    "id": "mandarin-yufa-negation-with-bu",
    "title": "Yǔfǎ 3: Negation with 不",
    "description": "Membuat kalimat negatif dasar dengan 不 sebelum kata kerja atau adjektiva."
  },
  {
    "id": "mandarin-yufa-name-sentences-with-jiao",
    "title": "Yǔfǎ 4: Name Sentences with 叫",
    "description": "Memperkenalkan nama dengan pola subjek + 叫 + nama."
  },
  {
    "id": "mandarin-yufa-nationality-with-shi-ren",
    "title": "Yǔfǎ 5: Nationality with 是...人",
    "description": "Menyebut asal negara memakai 是 + negara + 人."
  },
  {
    "id": "mandarin-yufa-possession-with-de",
    "title": "Yǔfǎ 6: Possession with 的",
    "description": "Menyatakan kepemilikan dan hubungan sederhana dengan 的."
  },
  {
    "id": "mandarin-yufa-numbers-in-simple-sentences",
    "title": "Yǔfǎ 7: Numbers in Simple Sentences",
    "description": "Memakai angka dalam kalimat identitas, umur, dan jumlah dasar."
  },
  {
    "id": "mandarin-yufa-measure-word-ge",
    "title": "Yǔfǎ 8: Measure Word 个",
    "description": "Menggunakan 个 sebagai kata ukur umum setelah angka."
  },
  {
    "id": "mandarin-yufa-this-and-that-zhe-na",
    "title": "Yǔfǎ 9: This and That: 这 / 那",
    "description": "Membedakan ini dan itu dalam pola 这/那 + 是 + benda."
  },
  {
    "id": "mandarin-yufa-plural-pronoun-men",
    "title": "Yǔfǎ 10: Plural Pronoun 们",
    "description": "Membentuk kata ganti jamak dasar dengan 们."
  },
  {
    "id": "mandarin-yufa-have-there-is-with-you",
    "title": "Yǔfǎ 11: Have/There Is with 有",
    "description": "Menyatakan punya dan ada memakai 有."
  },
  {
    "id": "mandarin-yufa-want-with-xiang",
    "title": "Yǔfǎ 12: Want with 想",
    "description": "Menyatakan keinginan dasar dengan 想 sebelum kata kerja."
  },
  {
    "id": "mandarin-yufa-like-with-xihuan",
    "title": "Yǔfǎ 13: Like with 喜欢",
    "description": "Menyatakan suka pada benda, orang, atau aktivitas dengan 喜欢."
  },
  {
    "id": "mandarin-yufa-time-word-jintian",
    "title": "Yǔfǎ 14: Time Word 今天",
    "description": "Meletakkan kata waktu seperti 今天 di awal atau setelah subjek."
  },
  {
    "id": "mandarin-yufa-location-with-zai",
    "title": "Yǔfǎ 15: Location with 在",
    "description": "Menyatakan berada di suatu tempat dengan 在."
  },
  {
    "id": "mandarin-yufa-question-words-shei-shenme",
    "title": "Yǔfǎ 16: Question Words 谁 and 什么",
    "description": "Memakai 谁 dan 什么 pada posisi informasi yang ditanyakan."
  },
  {
    "id": "mandarin-yufa-how-many-with-ji",
    "title": "Yǔfǎ 17: How Many with 几",
    "description": "Menanyakan jumlah kecil dengan 几 dan kata ukur."
  },
  {
    "id": "mandarin-yufa-adjective-predicate-hen-hao",
    "title": "Yǔfǎ 18: Adjective Predicate 很好",
    "description": "Membuat kalimat adjektiva dengan 很 sebelum sifat."
  },
  {
    "id": "mandarin-yufa-simple-request-qing",
    "title": "Yǔfǎ 19: Simple Request 请",
    "description": "Membuat permintaan sopan dan instruksi pendek dengan 请."
  },
  {
    "id": "mandarin-yufa-hsk-1-grammar-review",
    "title": "Yǔfǎ 20: HSK 1 Grammar Review",
    "description": "Menggabungkan pola dasar HSK 1 dalam latihan review terpadu."
  }
];

const mandarinCihuiTopics: Topic[] = [
  {
    "id": "mandarin-cihui-greetings-and-polite-words",
    "title": "Cíhuì 1: Greetings and Polite Words",
    "description": "Melatih salam, ucapan terima kasih, pamit, dan permintaan maaf dasar."
  },
  {
    "id": "mandarin-cihui-pronouns-and-people",
    "title": "Cíhuì 2: Pronouns and People",
    "description": "Melatih kata ganti orang paling awal dalam kalimat Mandarin."
  },
  {
    "id": "mandarin-cihui-family-members",
    "title": "Cíhuì 3: Family Members",
    "description": "Melatih kosakata keluarga inti dan saudara kandung dasar."
  },
  {
    "id": "mandarin-cihui-numbers-zero-to-ten",
    "title": "Cíhuì 4: Numbers Zero to Ten",
    "description": "Melatih angka dasar yang sering dipakai untuk umur, jumlah, dan harga."
  },
  {
    "id": "mandarin-cihui-days-and-time",
    "title": "Cíhuì 5: Days and Time",
    "description": "Melatih kata waktu dasar untuk membicarakan hari dan saat ini."
  },
  {
    "id": "mandarin-cihui-places-around-town",
    "title": "Cíhuì 6: Places Around Town",
    "description": "Melatih tempat umum yang sering muncul dalam percakapan HSK 1."
  },
  {
    "id": "mandarin-cihui-classroom-words",
    "title": "Cíhuì 7: Classroom Words",
    "description": "Melatih kata benda dan peran yang sering dipakai di kelas."
  },
  {
    "id": "mandarin-cihui-food-and-drink",
    "title": "Cíhuì 8: Food and Drink",
    "description": "Melatih kata makanan dan minuman dasar untuk kebutuhan harian."
  },
  {
    "id": "mandarin-cihui-fruits",
    "title": "Cíhuì 9: Fruits",
    "description": "Melatih kosakata buah populer untuk belanja dan selera makan."
  },
  {
    "id": "mandarin-cihui-transportation",
    "title": "Cíhuì 10: Transportation",
    "description": "Melatih kendaraan dasar untuk menyebut cara pergi ke tempat tertentu."
  },
  {
    "id": "mandarin-cihui-daily-actions",
    "title": "Cíhuì 11: Daily Actions",
    "description": "Melatih kata kerja harian yang sering menjadi inti kalimat pendek."
  },
  {
    "id": "mandarin-cihui-learning-actions",
    "title": "Cíhuì 12: Learning Actions",
    "description": "Melatih kata kerja belajar: belajar, menulis, membaca, dan berbicara."
  },
  {
    "id": "mandarin-cihui-basic-adjectives",
    "title": "Cíhuì 13: Basic Adjectives",
    "description": "Melatih kata sifat dasar untuk menilai benda, orang, dan jumlah."
  },
  {
    "id": "mandarin-cihui-colors",
    "title": "Cíhuì 14: Colors",
    "description": "Melatih warna dasar untuk mendeskripsikan benda sehari-hari."
  },
  {
    "id": "mandarin-cihui-shopping-and-money",
    "title": "Cíhuì 15: Shopping and Money",
    "description": "Melatih kosakata belanja: uang, membeli, mahal, dan murah."
  },
  {
    "id": "mandarin-cihui-weather-and-temperature",
    "title": "Cíhuì 16: Weather and Temperature",
    "description": "Melatih kata cuaca dan suhu untuk percakapan sehari-hari."
  },
  {
    "id": "mandarin-cihui-body-and-health",
    "title": "Cíhuì 17: Body and Health",
    "description": "Melatih bagian tubuh dan kata kesehatan yang paling sering dipakai."
  },
  {
    "id": "mandarin-cihui-hobbies-and-interests",
    "title": "Cíhuì 18: Hobbies and Interests",
    "description": "Melatih kosakata minat untuk membicarakan aktivitas santai."
  },
  {
    "id": "mandarin-cihui-question-words",
    "title": "Cíhuì 19: Question Words",
    "description": "Melatih kata tanya inti agar cepat mengenali maksud pertanyaan."
  },
  {
    "id": "mandarin-cihui-hsk-1-vocabulary-review",
    "title": "Cíhuì 20: HSK 1 Vocabulary Review",
    "description": "Menggabungkan kosakata penting HSK 1 untuk review akhir Cíhuì pemula."
  }
];

const mandarinXiezuoTopics: Topic[] = [
  {
    "id": "mandarin-xiezuo-stroke-basics-and-simple-hanzi",
    "title": "Xiězuò 1: Stroke Basics and Simple Hanzi",
    "description": "Melatih Hanzi paling sederhana untuk membangun kontrol garis dan bentuk dasar."
  },
  {
    "id": "mandarin-xiezuo-radicals-and-basic-shapes",
    "title": "Xiězuò 2: Radicals and Basic Shapes",
    "description": "Melatih bentuk dasar seperti orang, mulut, matahari, dan bulan."
  },
  {
    "id": "mandarin-xiezuo-pronouns-in-writing",
    "title": "Xiězuò 3: Pronouns in Writing",
    "description": "Melatih menulis kata ganti orang dan membedakan bentuk Hanzi-nya."
  },
  {
    "id": "mandarin-xiezuo-name-and-identity-sentences",
    "title": "Xiězuò 4: Name and Identity Sentences",
    "description": "Melatih kalimat identitas dasar memakai 叫 dan 是."
  },
  {
    "id": "mandarin-xiezuo-family-sentences",
    "title": "Xiězuò 5: Family Sentences",
    "description": "Melatih kalimat pendek tentang keluarga dengan 的 dan kata sifat."
  },
  {
    "id": "mandarin-xiezuo-numbers-and-measure-words",
    "title": "Xiězuò 6: Numbers and Measure Words",
    "description": "Melatih menulis angka dengan kata ukur umum dalam kalimat sederhana."
  },
  {
    "id": "mandarin-xiezuo-time-words-in-sentences",
    "title": "Xiězuò 7: Time Words in Sentences",
    "description": "Melatih kata waktu seperti hari ini, besok, kemarin, dan sekarang."
  },
  {
    "id": "mandarin-xiezuo-location-with-zai",
    "title": "Xiězuò 8: Location with 在",
    "description": "Melatih kalimat lokasi dengan 在 dan tempat umum."
  },
  {
    "id": "mandarin-xiezuo-possession-with-de",
    "title": "Xiězuò 9: Possession with 的",
    "description": "Melatih kepemilikan sederhana dengan 的 dalam frasa benda."
  },
  {
    "id": "mandarin-xiezuo-likes-and-wants",
    "title": "Xiězuò 10: Likes and Wants",
    "description": "Melatih kalimat dengan 喜欢 dan 想 untuk minat serta keinginan."
  },
  {
    "id": "mandarin-xiezuo-food-and-drink-writing",
    "title": "Xiězuò 11: Food and Drink Writing",
    "description": "Melatih kalimat makan, minum, dan selera sederhana."
  },
  {
    "id": "mandarin-xiezuo-shopping-notes",
    "title": "Xiězuò 12: Shopping Notes",
    "description": "Melatih catatan belanja pendek tentang harga dan barang."
  },
  {
    "id": "mandarin-xiezuo-question-sentences",
    "title": "Xiězuò 13: Question Sentences",
    "description": "Melatih menulis pertanyaan pendek dengan 什么, 谁, 哪儿, dan 几."
  },
  {
    "id": "mandarin-xiezuo-weather-journal",
    "title": "Xiězuò 14: Weather Journal",
    "description": "Melatih kalimat catatan cuaca harian yang pendek dan jelas."
  },
  {
    "id": "mandarin-xiezuo-daily-routine",
    "title": "Xiězuò 15: Daily Routine",
    "description": "Melatih kalimat rutinitas dengan belajar, makan, pergi, dan pulang."
  },
  {
    "id": "mandarin-xiezuo-classroom-mini-notes",
    "title": "Xiězuò 16: Classroom Mini Notes",
    "description": "Melatih catatan kelas pendek untuk benda dan instruksi belajar."
  },
  {
    "id": "mandarin-xiezuo-travel-mini-sentences",
    "title": "Xiězuò 17: Travel Mini Sentences",
    "description": "Melatih kalimat perjalanan pendek dengan transportasi dan tempat tujuan."
  },
  {
    "id": "mandarin-xiezuo-short-dialogue-writing",
    "title": "Xiězuò 18: Short Dialogue Writing",
    "description": "Melatih menulis dialog pendek untuk salam, nama, dan pertanyaan dasar."
  },
  {
    "id": "mandarin-xiezuo-mini-paragraph-about-self",
    "title": "Xiězuò 19: Mini Paragraph About Self",
    "description": "Melatih paragraf pendek tentang nama, identitas, bahasa, dan hobi."
  },
  {
    "id": "mandarin-xiezuo-hsk-1-writing-review",
    "title": "Xiězuò 20: HSK 1 Writing Review",
    "description": "Menggabungkan pola writing HSK 1 dari salam sampai paragraf pendek."
  }
];

const mandarinYueduTopics: Topic[] = [
  {
    "id": "mandarin-yuedu-greetings-and-signs",
    "title": "Yuèdú 1: Greetings and Signs",
    "description": "Membaca salam pendek, tanda sederhana, dan respons sopan sehari-hari."
  },
  {
    "id": "mandarin-yuedu-self-introduction",
    "title": "Yuèdú 2: Self Introduction",
    "description": "Membaca perkenalan diri pendek tentang nama, asal, dan identitas."
  },
  {
    "id": "mandarin-yuedu-family-reading",
    "title": "Yuèdú 3: Family Reading",
    "description": "Membaca teks pendek tentang anggota keluarga dan relasi sederhana."
  },
  {
    "id": "mandarin-yuedu-classroom-reading",
    "title": "Yuèdú 4: Classroom Reading",
    "description": "Membaca catatan dan instruksi kelas yang sering muncul di level awal."
  },
  {
    "id": "mandarin-yuedu-daily-schedule",
    "title": "Yuèdú 5: Daily Schedule",
    "description": "Membaca jadwal singkat tentang pagi, siang, sore, dan malam."
  },
  {
    "id": "mandarin-yuedu-places-and-directions",
    "title": "Yuèdú 6: Places and Directions",
    "description": "Membaca lokasi dan arah sederhana dalam kalimat pendek."
  },
  {
    "id": "mandarin-yuedu-shopping-receipts",
    "title": "Yuèdú 7: Shopping Receipts",
    "description": "Membaca informasi belanja sederhana tentang barang, harga, dan jumlah."
  },
  {
    "id": "mandarin-yuedu-menu-reading",
    "title": "Yuèdú 8: Menu Reading",
    "description": "Membaca menu pendek, minuman, dan pilihan makanan dasar."
  },
  {
    "id": "mandarin-yuedu-weather-notes",
    "title": "Yuèdú 9: Weather Notes",
    "description": "Membaca catatan cuaca dan suhu sederhana."
  },
  {
    "id": "mandarin-yuedu-transport-reading",
    "title": "Yuèdú 10: Transport Reading",
    "description": "Membaca informasi transportasi sederhana untuk pergi dan pulang."
  },
  {
    "id": "mandarin-yuedu-friend-messages",
    "title": "Yuèdú 11: Friend Messages",
    "description": "Membaca pesan singkat dari teman tentang rencana dan lokasi."
  },
  {
    "id": "mandarin-yuedu-hobbies-reading",
    "title": "Yuèdú 12: Hobbies Reading",
    "description": "Membaca minat dan aktivitas santai dalam teks pendek."
  },
  {
    "id": "mandarin-yuedu-health-reading",
    "title": "Yuèdú 13: Health Reading",
    "description": "Membaca keluhan tubuh, dokter, dan saran sederhana."
  },
  {
    "id": "mandarin-yuedu-time-and-date-reading",
    "title": "Yuèdú 14: Time and Date Reading",
    "description": "Membaca tanggal, jam, dan urutan kegiatan pendek."
  },
  {
    "id": "mandarin-yuedu-simple-email",
    "title": "Yuèdú 15: Simple Email",
    "description": "Membaca email pendek dengan sapaan, isi, dan penutup."
  },
  {
    "id": "mandarin-yuedu-school-announcements",
    "title": "Yuèdú 16: School Announcements",
    "description": "Membaca pengumuman sekolah singkat tentang kelas dan kegiatan."
  },
  {
    "id": "mandarin-yuedu-home-mini-story",
    "title": "Yuèdú 17: Home Mini Story",
    "description": "Membaca cerita mini tentang kegiatan di rumah."
  },
  {
    "id": "mandarin-yuedu-question-word-reading",
    "title": "Yuèdú 18: Question Word Reading",
    "description": "Mengenali 什么, 谁, 哪儿, 几, dan 怎么 dari konteks bacaan."
  },
  {
    "id": "mandarin-yuedu-reading-connectors",
    "title": "Yuèdú 19: Reading Connectors",
    "description": "Membaca konektor dasar seperti 和, 也, 但是, dan 所以."
  },
  {
    "id": "mandarin-yuedu-hsk-1-reading-review",
    "title": "Yuèdú 20: HSK 1 Reading Review",
    "description": "Review Yuèdú HSK 1 dengan teks gabungan tentang diri, keluarga, kelas, dan kegiatan."
  }
];

const mandarinTingliTopics: Topic[] = [
  {
    "id": "mandarin-tingli-greetings-and-names",
    "title": "Tīnglì 1: Greetings and Names",
    "description": "Melatih mendengar salam, nama, dan respons sopan yang sangat sering muncul."
  },
  {
    "id": "mandarin-tingli-classroom-instructions",
    "title": "Tīnglì 2: Classroom Instructions",
    "description": "Melatih instruksi kelas seperti dengarkan, baca, tulis, dan ulangi."
  },
  {
    "id": "mandarin-tingli-numbers-and-age",
    "title": "Tīnglì 3: Numbers and Age",
    "description": "Melatih angka dasar, umur, dan jumlah orang dari audio pendek."
  },
  {
    "id": "mandarin-tingli-family-introductions",
    "title": "Tīnglì 4: Family Introductions",
    "description": "Melatih anggota keluarga dan hubungan sederhana dari kalimat lisan."
  },
  {
    "id": "mandarin-tingli-time-and-daily-schedule",
    "title": "Tīnglì 5: Time and Daily Schedule",
    "description": "Melatih waktu, jadwal, dan kegiatan harian dari audio singkat."
  },
  {
    "id": "mandarin-tingli-places-and-directions",
    "title": "Tīnglì 6: Places and Directions",
    "description": "Melatih tempat umum, lokasi, dan arah sederhana dalam audio."
  },
  {
    "id": "mandarin-tingli-food-and-drink-orders",
    "title": "Tīnglì 7: Food and Drink Orders",
    "description": "Melatih pesanan makanan dan minuman dalam percakapan pendek."
  },
  {
    "id": "mandarin-tingli-shopping-and-prices",
    "title": "Tīnglì 8: Shopping and Prices",
    "description": "Melatih harga, barang, dan frasa belanja dasar dari audio."
  },
  {
    "id": "mandarin-tingli-weather-and-plans",
    "title": "Tīnglì 9: Weather and Plans",
    "description": "Melatih cuaca, suhu, dan rencana sederhana yang didengar."
  },
  {
    "id": "mandarin-tingli-transportation-messages",
    "title": "Tīnglì 10: Transportation Messages",
    "description": "Melatih kendaraan, pergi-pulang, dan pesan transportasi pendek."
  },
  {
    "id": "mandarin-tingli-phone-numbers-and-dates",
    "title": "Tīnglì 11: Phone Numbers and Dates",
    "description": "Melatih nomor telepon, tanggal, dan hari dari audio pendek."
  },
  {
    "id": "mandarin-tingli-hobbies-and-free-time",
    "title": "Tīnglì 12: Hobbies and Free Time",
    "description": "Melatih hobi, minat, dan aktivitas santai dari audio sederhana."
  },
  {
    "id": "mandarin-tingli-school-announcements",
    "title": "Tīnglì 13: School Announcements",
    "description": "Melatih pengumuman singkat tentang kelas, ruang, dan kegiatan sekolah."
  },
  {
    "id": "mandarin-tingli-friend-invitations",
    "title": "Tīnglì 14: Friend Invitations",
    "description": "Melatih ajakan teman, waktu bertemu, dan respons singkat."
  },
  {
    "id": "mandarin-tingli-health-and-body",
    "title": "Tīnglì 15: Health and Body",
    "description": "Melatih keluhan tubuh dan saran kesehatan sederhana dari audio."
  },
  {
    "id": "mandarin-tingli-home-routines",
    "title": "Tīnglì 16: Home Routines",
    "description": "Melatih aktivitas rumah seperti makan, tidur, membersihkan, dan belajar."
  },
  {
    "id": "mandarin-tingli-travel-and-hotel",
    "title": "Tīnglì 17: Travel and Hotel",
    "description": "Melatih audio perjalanan sederhana tentang hotel, kamar, dan tujuan."
  },
  {
    "id": "mandarin-tingli-question-words-in-audio",
    "title": "Tīnglì 18: Question Words in Audio",
    "description": "Melatih mengenali 谁, 什么, 哪儿, 几, dan 怎么 dari pertanyaan lisan."
  },
  {
    "id": "mandarin-tingli-connectors-and-contrast",
    "title": "Tīnglì 19: Connectors and Contrast",
    "description": "Melatih konektor dasar seperti 和, 也, 但是, dan 所以 dalam audio."
  },
  {
    "id": "mandarin-tingli-hsk-1-listening-review",
    "title": "Tīnglì 20: HSK 1 Listening Review",
    "description": "Review Tīnglì HSK 1 dengan gabungan salam, angka, waktu, tempat, dan aktivitas."
  }
];

const mandarinKouyuTopics: Topic[] = [
  {
    "id": "mandarin-kouyu-greetings-and-polite-responses",
    "title": "Kǒuyǔ 1: Greetings and Polite Responses",
    "description": "Melatih salam, sapaan sopan, dan respons pendek dalam percakapan Mandarin awal."
  },
  {
    "id": "mandarin-kouyu-self-introduction",
    "title": "Kǒuyǔ 2: Self Introduction",
    "description": "Melatih perkenalan diri dasar: nama, asal, identitas, dan bahasa yang dipelajari."
  },
  {
    "id": "mandarin-kouyu-names-nationality-and-language",
    "title": "Kǒuyǔ 3: Names, Nationality and Language",
    "description": "Melatih tanya-jawab nama, kewarganegaraan, dan bahasa yang digunakan."
  },
  {
    "id": "mandarin-kouyu-family-conversations",
    "title": "Kǒuyǔ 4: Family Conversations",
    "description": "Melatih percakapan tentang keluarga, anggota keluarga, dan jumlah orang di rumah."
  },
  {
    "id": "mandarin-kouyu-classroom-speaking",
    "title": "Kǒuyǔ 5: Classroom Speaking",
    "description": "Melatih respons lisan saat belajar di kelas Mandarin."
  },
  {
    "id": "mandarin-kouyu-numbers-age-and-quantity",
    "title": "Kǒuyǔ 6: Numbers, Age and Quantity",
    "description": "Melatih berbicara tentang umur, jumlah, nomor, dan benda sehari-hari."
  },
  {
    "id": "mandarin-kouyu-daily-routine",
    "title": "Kǒuyǔ 7: Daily Routine",
    "description": "Melatih bicara tentang rutinitas pagi, belajar, makan, dan tidur."
  },
  {
    "id": "mandarin-kouyu-time-and-appointments",
    "title": "Kǒuyǔ 8: Time and Appointments",
    "description": "Melatih membuat janji sederhana dengan waktu, hari, dan tempat."
  },
  {
    "id": "mandarin-kouyu-shopping-dialogue",
    "title": "Kǒuyǔ 9: Shopping Dialogue",
    "description": "Melatih tanya harga, membeli barang, dan memberi pendapat saat belanja."
  },
  {
    "id": "mandarin-kouyu-restaurant-ordering",
    "title": "Kǒuyǔ 10: Restaurant Ordering",
    "description": "Melatih memesan makanan, minuman, dan memberi respons di restoran."
  },
  {
    "id": "mandarin-kouyu-directions-and-places",
    "title": "Kǒuyǔ 11: Directions and Places",
    "description": "Melatih bertanya dan menjelaskan lokasi tempat umum."
  },
  {
    "id": "mandarin-kouyu-transport-and-travel",
    "title": "Kǒuyǔ 12: Transport and Travel",
    "description": "Melatih berbicara tentang kendaraan, tujuan, dan perjalanan singkat."
  },
  {
    "id": "mandarin-kouyu-hobbies-and-preferences",
    "title": "Kǒuyǔ 13: Hobbies and Preferences",
    "description": "Melatih menyatakan suka, tidak suka, hobi, dan aktivitas akhir pekan."
  },
  {
    "id": "mandarin-kouyu-weather-and-plans",
    "title": "Kǒuyǔ 14: Weather and Plans",
    "description": "Melatih membicarakan cuaca dan rencana kegiatan sederhana."
  },
  {
    "id": "mandarin-kouyu-phone-conversation",
    "title": "Kǒuyǔ 15: Phone Conversation",
    "description": "Melatih pembuka telepon, meminta bicara dengan seseorang, dan meninggalkan pesan."
  },
  {
    "id": "mandarin-kouyu-health-and-doctor",
    "title": "Kǒuyǔ 16: Health and Doctor",
    "description": "Melatih keluhan kesehatan, saran sederhana, dan percakapan dokter."
  },
  {
    "id": "mandarin-kouyu-invitations-and-responses",
    "title": "Kǒuyǔ 17: Invitations and Responses",
    "description": "Melatih mengajak, menerima, menolak sopan, dan mengatur ulang rencana."
  },
  {
    "id": "mandarin-kouyu-making-requests",
    "title": "Kǒuyǔ 18: Making Requests",
    "description": "Melatih meminta bantuan, izin, dan klarifikasi secara sopan."
  },
  {
    "id": "mandarin-kouyu-mini-storytelling",
    "title": "Kǒuyǔ 19: Mini Storytelling",
    "description": "Melatih menceritakan kegiatan pendek dengan urutan waktu dan konektor dasar."
  },
  {
    "id": "mandarin-kouyu-hsk-1-speaking-review",
    "title": "Kǒuyǔ 20: HSK 1 Speaking Review",
    "description": "Review Kǒuyǔ HSK 1 dengan perkenalan, waktu, keluarga, tempat, dan rencana."
  }
];

function rotateOptions(options: string[], amount: number) {
  const offset = amount % options.length;
  return [...options.slice(offset), ...options.slice(0, offset)];
}

function buildVocabularyQuestionsForTopic(topic: Topic, terms: TopicTerm[], language: 'en' | 'id' = 'en'): VocabQuestion[] {
  const levelPrompts: Record<QuizLevel, (term: TopicTerm) => string> = {
    Basic: (term) => language === 'id' ? `Kata mana yang berarti "${term.meaning}"?` : `Which word means "${term.meaning}"?`,
    Intermediate: (term) => language === 'id'
      ? `Pilih kosakata terbaik untuk ide ini dalam topik ${topic.title}: "${term.meaning}".`
      : `Choose the best vocabulary item for this idea in ${topic.title}: "${term.meaning}".`,
    Advanced: (term) => language === 'id'
      ? `Dalam konteks ${topic.title.toLowerCase()} yang lebih formal, istilah mana yang paling sesuai dengan: "${term.meaning}"?`
      : `In a more formal ${topic.title.toLowerCase()} context, which term best matches: "${term.meaning}"?`,
  };

  return (['Basic', 'Intermediate', 'Advanced'] as QuizLevel[]).flatMap((level, levelIndex) =>
    Array.from({ length: 10 }, (_, index) => {
      const term = terms[(index + levelIndex * 3) % terms.length];
      const distractors = terms.filter((item) => item.word !== term.word);
      const options = rotateOptions(
        [
          term.word,
          distractors[(index + 2) % distractors.length].word,
          distractors[(index + 5) % distractors.length].word,
          distractors[(index + 8) % distractors.length].word,
        ],
        index + levelIndex
      );

      return {
        id: `${topic.id}-${level}-${index}`,
        level,
        prompt: levelPrompts[level](term),
        answer: term.word,
        options,
      };
    })
  );
}

function buildQuestions(topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  const topic = topics.find((item) => item.id === topicId) || topics[0];
  const terms = topicTerms[topic.id] || topicTerms.general;
  return buildVocabularyQuestionsForTopic(topic, terms, language);
}

type SkillTheme = {
  color: string;
  bg: string;
  soft: string;
  icon: LucideIcon;
  label: string;
};

const skillThemes: Record<string, SkillTheme> = {
  vocabulary: { color: '#2563EB', bg: '#DBEAFE', soft: '#EFF6FF', icon: BookOpen, label: 'Vocabulary' },
  grammar: { color: '#7C3AED', bg: '#EDE9FE', soft: '#F5F3FF', icon: Brain, label: 'Grammar' },
  listening: { color: '#0891B2', bg: '#CFFAFE', soft: '#ECFEFF', icon: Headphones, label: 'Listening' },
  speaking: { color: '#DB2777', bg: '#FCE7F3', soft: '#FDF2F8', icon: Mic, label: 'Speaking' },
  writing: { color: '#EA580C', bg: '#FFEDD5', soft: '#FFF7ED', icon: PenLine, label: 'Writing' },
  reading: { color: '#16A34A', bg: '#DCFCE7', soft: '#F0FDF4', icon: FileText, label: 'Reading' },
  mufradat: { color: '#2980B9', bg: '#D6EAF8', soft: '#EFF6FF', icon: BookOpen, label: 'Mufradat' },
  nahwu: { color: '#8E44AD', bg: '#F4ECF7', soft: '#FBF5FF', icon: Brain, label: 'Nahwu' },
  istima: { color: '#0F766E', bg: '#CCFBF1', soft: '#ECFDF5', icon: Headphones, label: 'Istima' },
  kalam: { color: '#E74C3C', bg: '#FDEDEC', soft: '#FFF5F5', icon: Mic, label: 'Kalam' },
  qiraah: { color: '#2563EB', bg: '#DBEAFE', soft: '#EFF6FF', icon: FileText, label: 'Qiraah' },
  kitabah: { color: '#D97706', bg: '#FEF3C7', soft: '#FFFBEB', icon: PenLine, label: 'Kitabah' },
  makharij: { color: '#E83E8C', bg: '#FDEDF4', soft: '#FFF7FB', icon: Volume2, label: 'Makharij' },
  pronunciation: { color: '#E83E8C', bg: '#FDEDF4', soft: '#FFF7FB', icon: Volume2, label: 'Makharij' },
  pinyin: { color: '#DB2777', bg: '#FCE7F3', soft: '#FFF1F2', icon: Volume2, label: 'Pīnyīn' },
  yufa: { color: '#DC2626', bg: '#FEE2E2', soft: '#FEF2F2', icon: Brain, label: 'Yǔfǎ' },
  cihui: { color: '#CA8A04', bg: '#FEF3C7', soft: '#FFFBEB', icon: BookOpen, label: 'Cíhuì' },
  xiezuo: { color: '#16A34A', bg: '#DCFCE7', soft: '#F0FDF4', icon: PenLine, label: 'Xiězuò' },
  yuedu: { color: '#2563EB', bg: '#DBEAFE', soft: '#EFF6FF', icon: FileText, label: 'Yuèdú' },
  tingli: { color: '#0891B2', bg: '#CFFAFE', soft: '#ECFEFF', icon: Headphones, label: 'Tīnglì' },
  kouyu: { color: '#EA580C', bg: '#FFEDD5', soft: '#FFF7ED', icon: Mic, label: 'Kǒuyǔ' },
};

const defaultSkillTheme: SkillTheme = { color: '#2563EB', bg: '#DBEAFE', soft: '#EFF6FF', icon: Sparkles, label: 'Practice' };

function getDedicatedTopicRoute({ levelId, skillId, topicId, topicIndex }: { levelId?: string; skillId: string; topicId: string; topicIndex: number }) {
  if (levelId === 'arabic' && skillId === 'mufradat') {
    return `/latihan/arabic/mufradat/topik${topicIndex + 1}`;
  }

  if (levelId === 'arabic' && (skillId === 'nahwu' || skillId === 'grammar')) {
    return `/latihan/arabic/nahwu/topik${topicIndex + 1}`;
  }

  if (levelId === 'arabic' && skillId === 'istima') {
    return `/latihan/arabic/istima/topik${topicIndex + 1}`;
  }

  if (levelId === 'arabic' && skillId === 'kalam') {
    return `/latihan/arabic/kalam/topik${topicIndex + 1}`;
  }

  if (levelId === 'arabic' && skillId === 'qiraah') {
    return `/latihan/arabic/qiraah/topik${topicIndex + 1}`;
  }

  if (levelId === 'arabic' && skillId === 'kitabah') {
    return `/latihan/arabic/kitabah/topik${topicIndex + 1}`;
  }

  if (levelId === 'arabic' && (skillId === 'makharij' || skillId === 'pronunciation')) {
    return `/latihan/arabic/makharij/topik${topicIndex + 1}`;
  }

  if (levelId === 'mandarin' && (skillId === 'pinyin' || skillId === 'pronunciation')) {
    return `/latihan/mandarin/pinyin/topik${topicIndex + 1}`;
  }

  if (levelId === 'mandarin' && (skillId === 'yufa' || skillId === 'grammar')) {
    return `/latihan/mandarin/yufa/topik${topicIndex + 1}`;
  }

  if (levelId === 'mandarin' && (skillId === 'cihui' || skillId === 'vocabulary')) {
    return `/latihan/mandarin/cihui/topik${topicIndex + 1}`;
  }

  if (levelId === 'mandarin' && (skillId === 'xiezuo' || skillId === 'writing')) {
    return `/latihan/mandarin/xiezuo/topik${topicIndex + 1}`;
  }

  if (levelId === 'mandarin' && (skillId === 'yuedu' || skillId === 'reading')) {
    return `/latihan/mandarin/yuedu/topik${topicIndex + 1}`;
  }

  if (levelId === 'mandarin' && (skillId === 'tingli' || skillId === 'listening')) {
    return `/latihan/mandarin/tingli/topik${topicIndex + 1}`;
  }

  if (levelId === 'mandarin' && (skillId === 'kouyu' || skillId === 'speaking')) {
    return `/latihan/mandarin/kouyu/topik${topicIndex + 1}`;
  }

  if (skillId === 'vocabulary') {
    return `/latihan/english/vocabulary/topik${topicIndex + 1}`;
  }

  if (skillId === 'grammar') {
    return `/latihan/english/grammar/topik${topicIndex + 1}`;
  }

  if (skillId === 'listening') {
    return `/latihan/english/listening/topik${topicIndex + 1}`;
  }

  if (skillId === 'speaking') {
    return `/latihan/english/speaking/topik${topicIndex + 1}`;
  }

  if (skillId === 'writing') {
    return `/latihan/english/writing/topik${topicIndex + 1}`;
  }

  if (skillId === 'reading') {
    return `/latihan/english/reading/topik${topicIndex + 1}`;
  }

  const basePath = levelId ? `/latihan/${levelId}/${skillId}` : `/latihan/${skillId}`;
  return `${basePath}?topic=${topicId}`;
}

function TopicListPage({
  levelId,
  skillId,
  title,
  topics: items,
}: {
  levelId?: string;
  skillId: string;
  title: string;
  topics: Topic[];
}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fullAccess = hasFullAccess(user);
  const freeTopicIds = FREE_PRACTICE_TOPIC_IDS[skillId] || items.slice(0, 3).map((topic) => topic.id);
  const theme = skillThemes[skillId] ?? defaultSkillTheme;
  const HeaderIcon = theme.icon;
  const unlockedCount = fullAccess ? items.length : items.filter((topic) => freeTopicIds.includes(topic.id)).length;

  return (
    <PageContainer>
      <div className="mx-auto max-w-5xl px-5 pb-28 md:px-0 md:pb-10">
        <motion.section
          className="relative overflow-hidden rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full opacity-60 blur-3xl"
            style={{ background: `radial-gradient(circle, ${theme.bg}, transparent 70%)` }}
          />
          <div className="relative flex items-start gap-4">
            <motion.button
              type="button"
              onClick={() => navigate('/latihan')}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gray-100 bg-white text-gray-600 shadow-sm transition hover:bg-gray-50"
              whileTap={{ scale: 0.92 }}
              aria-label="Kembali"
            >
              <ArrowLeft size={18} />
            </motion.button>
            <div className="min-w-0 flex-1">
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em]"
                style={{ backgroundColor: theme.soft, color: theme.color }}
              >
                <Sparkles size={12} />
                Latihan {theme.label}
              </div>
              <h1 className="mt-3 text-2xl font-black leading-tight text-[#1A1A2E] sm:text-3xl">{title}</h1>
              <p className="mt-1.5 max-w-lg text-sm font-semibold leading-relaxed text-gray-500">
                Pilih topik latihan yang ingin kamu kerjakan. {unlockedCount} dari {items.length} topik terbuka untukmu.
              </p>
            </div>
            <div
              className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl sm:grid"
              style={{ backgroundColor: theme.bg, color: theme.color }}
            >
              <HeaderIcon size={26} />
            </div>
          </div>
        </motion.section>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((topic, index) => {
            const locked = !fullAccess && !freeTopicIds.includes(topic.id);
            return (
              <motion.button
                key={topic.id}
                type="button"
                onClick={() => locked ? navigate('/upgrade') : navigate(getDedicatedTopicRoute({ levelId, skillId, topicId: topic.id, topicIndex: index }))}
                className="group relative flex min-h-[168px] flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ ['--tw-ring-color' as string]: `${theme.color}55` }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.02 * index }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, ${theme.color}, ${theme.color}00)` }}
                />
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-sm font-black transition-transform duration-200 group-hover:scale-105"
                      style={locked ? { backgroundColor: '#F1F5F9', color: '#94A3B8' } : { backgroundColor: theme.bg, color: theme.color }}
                    >
                      {locked ? <Lock size={18} /> : String(index + 1).padStart(2, '0')}
                    </div>
                    <span
                      className="text-[10px] font-black uppercase tracking-[0.14em]"
                      style={{ color: locked ? '#94A3B8' : theme.color }}
                    >
                      Topik {index + 1}
                    </span>
                  </div>
                  {locked && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black text-amber-600">
                      <Lock size={11} /> Pro
                    </span>
                  )}
                </div>

                <h2 className="mt-4 text-[15px] font-black leading-snug text-[#1A1A2E]">{topic.title}</h2>
                <p className="mt-1.5 line-clamp-2 text-xs font-semibold leading-relaxed text-gray-500">{topic.description}</p>

                <div
                  className="mt-auto flex items-center gap-1.5 pt-4 text-xs font-black"
                  style={{ color: locked ? '#D97706' : theme.color }}
                >
                  {locked ? 'Upgrade untuk akses' : 'Mulai Latihan'}
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}

function VocabularyTopicList({ levelId }: { levelId?: string }) {
  return <TopicListPage levelId={levelId} skillId="vocabulary" title="Daftar Isi Latihan Vocabulary" topics={topics} />;
}

function GrammarTopicList({ levelId }: { levelId?: string }) {
  return <TopicListPage levelId={levelId} skillId="grammar" title="Daftar Isi Latihan Grammar" topics={grammarTopics} />;
}

function SpeakingTopicList({ levelId }: { levelId?: string }) {
  return <TopicListPage levelId={levelId} skillId="speaking" title="Daftar Isi Latihan Speaking" topics={speakingTopics} />;
}

function WritingTopicList({ levelId }: { levelId?: string }) {
  return <TopicListPage levelId={levelId} skillId="writing" title="Daftar Isi Latihan Writing" topics={writingTopics} />;
}

function ReadingTopicList({ levelId }: { levelId?: string }) {
  return <TopicListPage levelId={levelId} skillId="reading" title="Daftar Isi Latihan Reading" topics={readingTopics} />;
}

function ListeningTopicList({ levelId }: { levelId?: string }) {
  return <TopicListPage levelId={levelId} skillId="listening" title="Native AI Conversation Practice" topics={listeningTopics} />;
}

function ArabicMufradatTopicList() {
  return <TopicListPage levelId="arabic" skillId="mufradat" title="Daftar Isi Latihan Mufradat" topics={arabicMufradatTopics} />;
}

function ArabicNahwuTopicList() {
  return <TopicListPage levelId="arabic" skillId="nahwu" title="Daftar Isi Latihan Nahwu" topics={arabicNahwuTopics} />;
}

function ArabicIstimaTopicList() {
  return <TopicListPage levelId="arabic" skillId="istima" title="Daftar Isi Latihan Istima" topics={arabicIstimaTopics} />;
}

function ArabicKalamTopicList() {
  return <TopicListPage levelId="arabic" skillId="kalam" title="Daftar Isi Latihan Kalam" topics={arabicKalamTopics} />;
}

function ArabicQiraahTopicList() {
  return <TopicListPage levelId="arabic" skillId="qiraah" title="Daftar Isi Latihan Qiraah" topics={arabicQiraahTopics} />;
}

function ArabicKitabahTopicList() {
  return <TopicListPage levelId="arabic" skillId="kitabah" title="Daftar Isi Latihan Kitabah" topics={arabicKitabahTopics} />;
}

function ArabicMakharijTopicList() {
  return <TopicListPage levelId="arabic" skillId="makharij" title="Daftar Isi Latihan Makharij" topics={arabicMakharijTopics} />;
}

function MandarinPinyinTopicList() {
  return <TopicListPage levelId="mandarin" skillId="pinyin" title="Daftar Isi Latihan Pīnyīn" topics={mandarinPinyinTopics} />;
}

function MandarinYufaTopicList() {
  return <TopicListPage levelId="mandarin" skillId="yufa" title="Daftar Isi Latihan Yǔfǎ" topics={mandarinYufaTopics} />;
}

function MandarinCihuiTopicList() {
  return <TopicListPage levelId="mandarin" skillId="cihui" title="Daftar Isi Latihan Cíhuì" topics={mandarinCihuiTopics} />;
}

function MandarinXiezuoTopicList() {
  return <TopicListPage levelId="mandarin" skillId="xiezuo" title="Daftar Isi Latihan Xiězuò" topics={mandarinXiezuoTopics} />;
}

function MandarinYueduTopicList() {
  return <TopicListPage levelId="mandarin" skillId="yuedu" title="Daftar Isi Latihan Yuèdú" topics={mandarinYueduTopics} />;
}

function MandarinTingliTopicList() {
  return <TopicListPage levelId="mandarin" skillId="tingli" title="Daftar Isi Latihan Tīnglì" topics={mandarinTingliTopics} />;
}

function MandarinKouyuTopicList() {
  return <TopicListPage levelId="mandarin" skillId="kouyu" title="Daftar Isi Latihan Kǒuyǔ" topics={mandarinKouyuTopics} />;
}

function ArabicPracticeTopicList({ levelId, skillId }: { levelId?: string; skillId: ArabicSkillId }) {
  const navigate = useNavigate();
  const normalizedLevelId = normalizeArabicLevel(levelId);
  const routeLevelId = getArabicRouteLevel(normalizedLevelId);
  const contentLevel = getArabicContentLevel(normalizedLevelId);
  const skill = arabicSkills.find((item) => item.id === skillId) ?? arabicSkills[0];
  const level = arabicLevels[normalizedLevelId];
  const totalLessons = arabicLessonCounts[normalizedLevelId][skillId];
  const completedLessons = useMemo(() => readArabicCompleted(normalizedLevelId, skillId), [normalizedLevelId, skillId]);
  const completedSet = useMemo(() => new Set(completedLessons), [completedLessons]);
  const completedCount = Math.min(totalLessons, completedLessons.length);
  const progress = Math.round((completedCount / Math.max(1, totalLessons)) * 100);
  const sample = arabicSamples[skillId];
  const nextLesson = Array.from({ length: totalLessons }, (_, index) => index + 1).find((lesson) => !completedSet.has(lesson)) ?? totalLessons;
  const quickDrills = arabicQuickDrills[skillId];
  const [activeModeIndex, setActiveModeIndex] = useState(0);
  const [drillIndex, setDrillIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [draftAnswer, setDraftAnswer] = useState('');
  const [quickCorrect, setQuickCorrect] = useState(0);
  const [quickAnswered, setQuickAnswered] = useState(0);
  const [lastQuickResult, setLastQuickResult] = useState<number | null>(null);
  const [savedQuickScore, setSavedQuickScore] = useState(() => {
    const latest = loadPracticeHistory().find((attempt) => attempt.skillId === skillId && attempt.topicId === `arabic-${skillId}-quick`);
    return latest ? Math.round((latest.score / Math.max(1, latest.total)) * 100) : 0;
  });
  const activeMode = arabicPracticeModes[skillId][activeModeIndex] ?? arabicPracticeModes[skillId][0];
  const activeDrill = quickDrills[drillIndex % quickDrills.length];
  const quickProgress = Math.round((quickAnswered / Math.max(1, quickDrills.length)) * 100);
  const lessons = useMemo(() => (
    Array.from({ length: totalLessons }, (_, index) => {
      const lesson = index + 1;
      return {
        id: lesson,
        title: getArabicLessonTitle(skillId, lesson, contentLevel, skill.label),
        done: completedSet.has(lesson),
      };
    })
  ), [completedSet, contentLevel, skill.label, skillId, totalLessons]);

  const openLesson = (lesson: number) => {
    navigate(`/modul/arabic/${routeLevelId}/${skillId}/lesson-${lesson}?tab=latihan`);
  };

  const resetQuickSession = () => {
    setDrillIndex(0);
    setRevealed(false);
    setDraftAnswer('');
    setQuickCorrect(0);
    setQuickAnswered(0);
    setLastQuickResult(null);
  };

  const choosePracticeMode = (index: number) => {
    setActiveModeIndex(index);
    setRevealed(false);
    setDraftAnswer('');
  };

  const completeQuickCard = (remembered: boolean) => {
    const nextAnswered = quickAnswered + 1;
    const nextCorrect = quickCorrect + (remembered ? 1 : 0);

    if (nextAnswered >= quickDrills.length) {
      const finalScore = Math.round((nextCorrect / Math.max(1, quickDrills.length)) * 100);
      savePracticeAttempt({
        id: `arabic-${skillId}-quick-${Date.now()}`,
        skillId,
        topicId: `arabic-${skillId}-quick`,
        topicTitle: `${skill.label} Quick Drill`,
        score: nextCorrect,
        total: quickDrills.length,
        weakestLevel: finalScore >= 80 ? 'Advanced' : finalScore >= 55 ? 'Intermediate' : 'Basic',
        completedAt: new Date().toISOString(),
      });
      setSavedQuickScore(finalScore);
      setLastQuickResult(finalScore);
      setQuickCorrect(0);
      setQuickAnswered(0);
      setDrillIndex(0);
      setRevealed(false);
      setDraftAnswer('');
      return;
    }

    setQuickCorrect(nextCorrect);
    setQuickAnswered(nextAnswered);
    setDrillIndex((current) => (current + 1) % quickDrills.length);
    setRevealed(false);
    setDraftAnswer('');
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-6xl px-5 pb-28 md:px-0 md:pb-8">
        <PageHeader
          title={`${skill.label} Practice`}
          subtitle={`${level.title} - ${completedCount}/${totalLessons} lesson selesai`}
          onBack={() => navigate('/latihan')}
        />

        <section className="overflow-hidden rounded-[26px] border border-teal-100 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-5 md:p-7">
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl p-2" style={{ backgroundColor: skill.bgColor }}>
                  <img src={skill.icon} alt="" className="h-full w-full object-contain" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0F766E]">Arabic Focus Drill</p>
                  <h1 className="truncate text-2xl font-black text-[#0F172A]">{skill.label}</h1>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm font-semibold leading-relaxed text-slate-500">{skill.sublabel}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Level', value: level.badge },
                  { label: 'Progress', value: `${progress}%` },
                  { label: 'Next', value: `Lesson ${nextLesson}` },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-slate-50 px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">{item.label}</p>
                    <p className="mt-1 truncate text-sm font-black text-[#0F172A]">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => openLesson(nextLesson)}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[#0F766E] px-5 text-sm font-black text-white shadow-sm transition hover:bg-[#0B6B63] focus:outline-none focus:ring-2 focus:ring-teal-200"
                >
                  <Play size={16} />
                  Mulai Latihan Berikutnya
                </button>
                <button
                  onClick={() => navigate(`/modul/arabic/${routeLevelId}/${skillId}`)}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-teal-100 bg-white px-5 text-sm font-black text-[#0F766E] transition hover:bg-teal-50"
                >
                  Buka Modul Lengkap
                </button>
              </div>
            </div>

            <div className="relative min-h-[240px] bg-[#ECFDF5] p-6">
              <div className="absolute inset-6 rounded-[24px] border border-white/70 bg-white/70 shadow-sm" />
              <div className="relative z-10 flex h-full min-h-[210px] flex-col justify-between">
                <div className="rounded-2xl border border-teal-100 bg-white/90 p-4 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-teal-600">Sample Drill</p>
                  <p dir="rtl" lang="ar" className="mt-3 text-4xl font-black leading-relaxed text-[#0F172A]">{sample.arabic}</p>
                  <p className="mt-2 text-xs font-semibold text-slate-500">{sample.label}</p>
                </div>
                <div className="mt-4 overflow-hidden rounded-full bg-white">
                  <div className="h-2 rounded-full bg-[#0F766E]" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-lg font-black text-[#0F172A]">Mode Latihan</h2>
            <p className="mt-0.5 text-[13px] font-semibold text-slate-500">Pilih pola practice yang paling cocok untuk sesi singkat hari ini.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {arabicPracticeModes[skillId].map((mode, index) => {
              const Icon = mode.icon;
              const selected = index === activeModeIndex;
              const openMode = () => {
                if (skillId === 'mufradat' && index === 0) {
                  navigate(`/latihan/arabic/mufradat/topik${Math.min(nextLesson, arabicMufradatTopics.length)}`);
                  return;
                }

                choosePracticeMode(index);
              };

              return (
                <motion.button
                  key={mode.title}
                  type="button"
                  onClick={openMode}
                  className={`rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-100 ${selected ? 'border-[#0F766E] bg-teal-50' : 'border-teal-100 bg-white hover:border-teal-200'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * index }}
                >
                  <div className={`grid h-11 w-11 place-items-center rounded-2xl ${selected ? 'bg-white text-[#0F766E]' : 'bg-teal-50 text-[#0F766E]'}`}>
                    <Icon size={19} />
                  </div>
                  <h3 className="mt-3 font-black text-[#0F172A]">{mode.title}</h3>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{mode.detail}</p>
                </motion.button>
              );
            })}
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[26px] border border-teal-100 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 md:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0F766E]">Quick Drill</p>
                  <h2 className="mt-1 text-xl font-black text-[#0F172A]">{activeMode.title}</h2>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{activeMode.detail}</p>
                </div>
                <div className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-[#0F766E]">
                  {quickAnswered + 1}/{quickDrills.length}
                </div>
              </div>

              <div className="mt-5 rounded-[24px] border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Arabic Card</p>
                    <p dir="rtl" lang="ar" className="mt-3 text-4xl font-black leading-relaxed text-[#0F172A]">{activeDrill.arabic}</p>
                    <p className="mt-2 text-xs font-black text-[#0F766E]">{activeDrill.transliteration}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakArabicText(activeDrill.arabic)}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-teal-100 bg-white text-[#0F766E] transition hover:bg-teal-50"
                    title="Dengarkan Arabic"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>

                <div className="mt-4 rounded-2xl bg-white p-4">
                  <p className="text-sm font-black text-[#0F172A]">{activeDrill.prompt}</p>
                  <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">Hint: {activeDrill.hint}</p>
                </div>

                <textarea
                  value={draftAnswer}
                  onChange={(event) => setDraftAnswer(event.target.value)}
                  rows={3}
                  dir={skillId === 'kitabah' || draftAnswer.match(/[\u0600-\u06FF]/) ? 'rtl' : 'auto'}
                  placeholder={skillId === 'kitabah' ? 'Tulis jawaban Arabmu di sini...' : 'Catat jawabanmu dulu, lalu reveal untuk self-check.'}
                  className="mt-4 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0F172A] outline-none transition placeholder:text-slate-300 focus:border-[#0F766E] focus:ring-2 focus:ring-teal-100"
                />

                {revealed && (
                  <motion.div
                    className="mt-4 rounded-2xl border border-teal-100 bg-white p-4"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-teal-600">Jawaban</p>
                    <p dir="auto" className="mt-2 text-lg font-black text-[#0F172A]">{activeDrill.answer}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{activeDrill.meaning}</p>
                  </motion.div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setRevealed(true)}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-teal-100 bg-white px-5 text-sm font-black text-[#0F766E] transition hover:bg-teal-50"
                  >
                    Lihat Jawaban
                  </button>
                  <button
                    type="button"
                    onClick={() => completeQuickCard(true)}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-[#0F766E] px-5 text-sm font-black text-white shadow-sm transition hover:bg-[#0B6B63]"
                  >
                    Saya Benar
                  </button>
                  <button
                    type="button"
                    onClick={() => completeQuickCard(false)}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-slate-100 px-5 text-sm font-black text-slate-600 transition hover:bg-slate-200"
                  >
                    Perlu Ulang
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-teal-50 bg-[#F8FAFC] p-5 md:p-6 lg:border-l lg:border-t-0">
              <div className="rounded-2xl border border-white bg-white p-4 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Session Score</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {[
                    { label: 'Benar', value: quickCorrect },
                    { label: 'Terjawab', value: quickAnswered },
                    { label: 'Best', value: `${savedQuickScore}%` },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl bg-slate-50 px-4 py-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">{item.label}</p>
                      <p className="mt-1 text-lg font-black text-[#0F172A]">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-[#0F766E] transition-all" style={{ width: `${quickProgress}%` }} />
                </div>
                {lastQuickResult !== null && (
                  <div className="mt-4 rounded-2xl border border-teal-100 bg-teal-50 p-4">
                    <p className="text-sm font-black text-[#0F172A]">Sesi selesai: {lastQuickResult}%</p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">Skor tersimpan dan akan ikut memengaruhi rekomendasi practice.</p>
                  </div>
                )}
              </div>

              <div className="mt-4 rounded-2xl border border-white bg-white p-4 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Practice Flow</p>
                <div className="mt-3 space-y-3">
                  {[
                    'Dengarkan Arabic card 1-2 kali.',
                    'Jawab di scratchpad tanpa melihat jawaban.',
                    'Reveal, self-check, lalu tandai benar atau perlu ulang.',
                  ].map((step, index) => (
                    <div key={step} className="flex gap-3 rounded-2xl bg-slate-50 p-3">
                      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal-50 text-xs font-black text-[#0F766E]">{index + 1}</div>
                      <p className="text-xs font-semibold leading-relaxed text-slate-600">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={resetQuickSession}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-slate-600 transition hover:bg-slate-50"
                  >
                    <RotateCcw size={16} />
                    Reset Quick Drill
                  </button>
                  <button
                    type="button"
                    onClick={() => openLesson(nextLesson)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0F172A] px-5 text-sm font-black text-white transition hover:bg-[#1E293B]"
                  >
                    <Play size={16} />
                    Lanjut ke Lesson {nextLesson}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-black text-[#0F172A]">Lesson Practice</h2>
              <p className="mt-0.5 text-[13px] font-semibold text-slate-500">Buka lesson langsung ke tab Latihan Arabic.</p>
            </div>
            <div className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-[#0F766E]">{completedCount}/{totalLessons} done</div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {lessons.map((lesson, index) => (
              <motion.button
                key={lesson.id}
                type="button"
                onClick={() => openLesson(lesson.id)}
                className={`group rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-100 ${lesson.done ? 'border-teal-100' : 'border-slate-100 hover:border-teal-200'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(0.24, 0.015 * index) }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-flex rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                      Lesson {lesson.id}
                    </span>
                    <h3 className="mt-3 line-clamp-2 font-black text-[#0F172A]">{lesson.title}</h3>
                  </div>
                  <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-2xl ${lesson.done ? 'bg-teal-50 text-[#0F766E]' : 'bg-slate-50 text-slate-300 group-hover:text-[#0F766E]'}`}>
                    {lesson.done ? <CheckCircle2 size={18} /> : <Play size={16} />}
                  </div>
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-500">{lesson.done ? 'Sudah selesai. Bisa diulang untuk review.' : 'Buka tab latihan dengan soal dan drill Arabic.'}</p>
              </motion.button>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

function ReviewMistakesPage() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<MistakeRecord[]>(() => loadMistakeBank());
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = records.slice(0, 30).map((record): VocabQuestion => {
    const fallbackOptions = Array.from(new Set([record.answer, record.selected, 'Review this pattern again.', 'I am not sure.'])).filter(Boolean);
    return {
      id: record.id,
      level: record.level,
      prompt: record.prompt,
      answer: record.answer,
      options: record.options?.length ? record.options : fallbackOptions,
    };
  });
  const answeredCount = Object.keys(answers).length;
  const score = questions.reduce((total, question) => total + (answers[question.id] === question.answer ? 1 : 0), 0);

  const clearBank = () => {
    saveMistakeBank([]);
    setRecords([]);
    setAnswers({});
    setSubmitted(false);
  };

  const submitReview = () => {
    const remaining = records.filter((record) => answers[record.id] !== record.answer);
    saveMistakeBank(remaining);
    setRecords(remaining);
    setSubmitted(true);
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-5xl px-5 pb-28 md:px-0 md:pb-8">
        <div className="overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white shadow-sm">
          <div className="bg-[#F8FAFC] px-5 py-5 md:px-8">
            <div className="flex items-start gap-3">
              <motion.button
                type="button"
                onClick={() => navigate('/latihan', { replace: true })}
                className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gray-100 bg-white shadow-sm transition hover:bg-gray-50"
                whileTap={{ scale: 0.92 }}
              >
                <ArrowLeft size={17} />
              </motion.button>
              <div className="min-w-0 flex-1">
                <span className="inline-flex rounded bg-[#FEF2F2] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#DC2626]">
                  Mistake Review
                </span>
                <h1 className="mt-3 text-[24px] font-black leading-tight text-[#0F172A]">Review Mistakes</h1>
                <p className="mt-1 max-w-2xl text-sm font-semibold leading-relaxed text-gray-500">
                  Latih ulang soal yang sebelumnya salah. Jawaban benar akan otomatis keluar dari bank setelah submit.
                </p>
              </div>
              <div className="h-9 w-9 shrink-0" />
            </div>
          </div>

          <div className="px-5 py-6 md:px-8">
            <div className="mb-5 grid gap-3 md:grid-cols-3">
              {[
                { label: 'Tersimpan', value: records.length, icon: XCircle, color: '#DC2626', bg: '#FEF2F2' },
                { label: 'Review Set', value: questions.length, icon: ClipboardList, color: '#2563EB', bg: '#DBEAFE' },
                { label: 'Skor', value: submitted ? `${score}/${questions.length}` : '-', icon: Award, color: '#F59E0B', bg: '#FEF3C7' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-[8px] border border-[#CBD5E1] bg-white px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">{item.label}</p>
                        <p className="mt-1 text-lg font-black text-[#0F172A]">{item.value}</p>
                      </div>
                      <div className="grid h-9 w-9 place-items-center rounded-[8px]" style={{ backgroundColor: item.bg, color: item.color }}>
                        <Icon size={17} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {questions.length === 0 ? (
              <div className="rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] p-6 text-center">
                <p className="text-lg font-black text-[#0F172A]">Belum ada mistake yang perlu direview.</p>
                <p className="mt-2 text-sm font-semibold text-gray-500">Kerjakan quiz, lalu soal yang salah akan muncul di sini.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((question, index) => {
                  const selected = answers[question.id];
                  const correct = selected === question.answer;

                  return (
                    <div
                      key={question.id}
                      className={`rounded-[8px] border p-4 ${
                        submitted
                          ? correct
                            ? 'border-[#BBF7D0] bg-[#F0FDF4]'
                            : 'border-[#FECACA] bg-[#FFFBFB]'
                          : selected
                            ? 'border-[#BFDBFE] bg-[#F8FAFC]'
                            : 'border-gray-100 bg-white'
                      }`}
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="flex min-w-0 gap-3">
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#EEF2FF] text-xs font-black text-[#2563EB]">
                            {index + 1}
                          </span>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">{records[index]?.skillId} / {question.level}</p>
                            <p className="mt-1 text-sm font-black leading-relaxed text-[#0F172A]">{question.prompt}</p>
                          </div>
                        </div>
                        {submitted && (
                          <span className={`inline-flex shrink-0 items-center gap-1 text-xs font-black ${correct ? 'text-[#047857]' : 'text-[#DC2626]'}`}>
                            {correct ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                            {correct ? 'Clear' : 'Review'}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => {
                          const optionLabel = String.fromCharCode(65 + optionIndex);
                          const isSelected = selected === option;
                          const showCorrect = submitted && option === question.answer;
                          const showWrong = submitted && isSelected && option !== question.answer;

                          return (
                            <label
                              key={`${question.id}-${option}`}
                              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-[6px] border px-3 py-2 text-sm font-semibold transition ${
                                showCorrect
                                  ? 'border-[#10B981] bg-[#ECFDF5] text-[#065F46]'
                                  : showWrong
                                    ? 'border-[#EF4444] bg-[#FEF2F2] text-[#991B1B]'
                                    : isSelected
                                      ? 'border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8]'
                                      : 'border-[#CBD5E1] bg-white text-[#0F172A] hover:border-[#2563EB]'
                              }`}
                            >
                              <input
                                type="radio"
                                name={question.id}
                                checked={isSelected}
                                disabled={submitted}
                                onChange={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
                                className="h-3.5 w-3.5"
                              />
                              <span>{optionLabel}. {option}</span>
                            </label>
                          );
                        })}
                      </div>

                      {submitted && (
                        <div className="mt-3 rounded-[6px] border border-[#CBD5E1] bg-white px-3 py-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Pembahasan</p>
                          <p className="mt-1 text-xs font-semibold leading-relaxed text-gray-600">
                            {buildQuestionExplanation(question, selected)}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="sticky bottom-0 -mx-5 mt-5 flex flex-col gap-3 border-t border-gray-100 bg-white/95 px-5 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between md:-mx-8 md:px-8">
              <button
                type="button"
                onClick={clearBank}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[4px] border border-[#CBD5E1] px-5 text-sm font-black text-[#0F172A] transition hover:bg-gray-50"
              >
                <RotateCcw size={16} />
                Clear Bank
              </button>
              <button
                type="button"
                onClick={submitReview}
                className="inline-flex h-11 items-center justify-center rounded-[4px] bg-[#2563EB] px-6 text-sm font-black text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={questions.length === 0 || answeredCount < questions.length || submitted}
              >
                {answeredCount < questions.length ? `Jawab ${questions.length - answeredCount} soal lagi` : 'Submit Review'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default function LatihanSkillPage() {
  const { t } = useLanguage();
  const params = useParams<{ levelId: string; skillId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const levelId = normalizeRouteParam(params.levelId);
  const skillId = normalizeRouteParam(params.skillId);
  const topicId = searchParams.get('topic');
  const activeSkillId = skillId || levelId;
  const targetLanguage = normalizeTargetLanguage(user?.persona?.targetLanguage);

  if (activeSkillId === 'review-mistakes') {
    return <ReviewMistakesPage />;
  }

  if ((activeSkillId === 'pinyin' || activeSkillId === 'pronunciation') && (levelId === 'mandarin' || (!levelId && targetLanguage === 'Mandarin'))) {
    if (topicId) {
      const topicIndex = mandarinPinyinTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/mandarin/pinyin/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/mandarin/pinyin" replace />;
    }

    return <MandarinPinyinTopicList />;
  }

  if ((activeSkillId === 'yufa' || activeSkillId === 'grammar') && (levelId === 'mandarin' || (!levelId && targetLanguage === 'Mandarin'))) {
    if (topicId) {
      const topicIndex = mandarinYufaTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/mandarin/yufa/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/mandarin/yufa" replace />;
    }

    return <MandarinYufaTopicList />;
  }

  if ((activeSkillId === 'cihui' || activeSkillId === 'vocabulary') && (levelId === 'mandarin' || (!levelId && targetLanguage === 'Mandarin'))) {
    if (topicId) {
      const topicIndex = mandarinCihuiTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/mandarin/cihui/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/mandarin/cihui" replace />;
    }

    return <MandarinCihuiTopicList />;
  }

  if ((activeSkillId === 'xiezuo' || activeSkillId === 'writing') && (levelId === 'mandarin' || (!levelId && targetLanguage === 'Mandarin'))) {
    if (topicId) {
      const topicIndex = mandarinXiezuoTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/mandarin/xiezuo/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/mandarin/xiezuo" replace />;
    }

    return <MandarinXiezuoTopicList />;
  }

  if ((activeSkillId === 'yuedu' || activeSkillId === 'reading') && (levelId === 'mandarin' || (!levelId && targetLanguage === 'Mandarin'))) {
    if (topicId) {
      const topicIndex = mandarinYueduTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/mandarin/yuedu/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/mandarin/yuedu" replace />;
    }

    return <MandarinYueduTopicList />;
  }

  if ((activeSkillId === 'tingli' || activeSkillId === 'listening') && (levelId === 'mandarin' || (!levelId && targetLanguage === 'Mandarin'))) {
    if (topicId) {
      const topicIndex = mandarinTingliTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/mandarin/tingli/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/mandarin/tingli" replace />;
    }

    return <MandarinTingliTopicList />;
  }

  if ((activeSkillId === 'kouyu' || activeSkillId === 'speaking') && (levelId === 'mandarin' || (!levelId && targetLanguage === 'Mandarin'))) {
    if (topicId) {
      const topicIndex = mandarinKouyuTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/mandarin/kouyu/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/mandarin/kouyu" replace />;
    }

    return <MandarinKouyuTopicList />;
  }

  if (levelId === 'arabic' && activeSkillId === 'mufradat') {
    if (topicId) {
      const topicIndex = arabicMufradatTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/arabic/mufradat/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/arabic/mufradat" replace />;
    }

    return <ArabicMufradatTopicList />;
  }

  if (
    (activeSkillId === 'nahwu' && (!levelId || levelId === 'arabic')) ||
    (activeSkillId === 'grammar' && (levelId === 'arabic' || isArabicLevelRoute(levelId) || (!levelId && targetLanguage === 'Arabic')))
  ) {
    if (topicId) {
      const topicIndex = arabicNahwuTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/arabic/nahwu/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/arabic/nahwu" replace />;
    }

    return <ArabicNahwuTopicList />;
  }

  if (activeSkillId === 'istima' && (levelId === 'arabic' || isArabicLevelRoute(levelId) || (!levelId && targetLanguage === 'Arabic'))) {
    if (topicId) {
      const topicIndex = arabicIstimaTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/arabic/istima/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/arabic/istima" replace />;
    }

    return <ArabicIstimaTopicList />;
  }

  if (activeSkillId === 'kalam' && (levelId === 'arabic' || isArabicLevelRoute(levelId) || (!levelId && targetLanguage === 'Arabic'))) {
    if (topicId) {
      const topicIndex = arabicKalamTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/arabic/kalam/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/arabic/kalam" replace />;
    }

    return <ArabicKalamTopicList />;
  }

  if (activeSkillId === 'qiraah' && (levelId === 'arabic' || isArabicLevelRoute(levelId) || (!levelId && targetLanguage === 'Arabic'))) {
    if (topicId) {
      const topicIndex = arabicQiraahTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/arabic/qiraah/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/arabic/qiraah" replace />;
    }

    return <ArabicQiraahTopicList />;
  }

  if (activeSkillId === 'kitabah' && (levelId === 'arabic' || isArabicLevelRoute(levelId) || (!levelId && targetLanguage === 'Arabic'))) {
    if (topicId) {
      const topicIndex = arabicKitabahTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/arabic/kitabah/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/arabic/kitabah" replace />;
    }

    return <ArabicKitabahTopicList />;
  }

  if ((activeSkillId === 'makharij' || activeSkillId === 'pronunciation') && (levelId === 'arabic' || isArabicLevelRoute(levelId) || (!levelId && targetLanguage === 'Arabic'))) {
    if (topicId) {
      const topicIndex = arabicMakharijTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/arabic/makharij/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/arabic/makharij" replace />;
    }

    return <ArabicMakharijTopicList />;
  }

  if (isArabicSkill(activeSkillId) && (isArabicLevelRoute(levelId) || (!levelId && targetLanguage === 'Arabic'))) {
    return <ArabicPracticeTopicList levelId={levelId} skillId={activeSkillId} />;
  }

  if (activeSkillId === 'vocabulary') {
    if (topicId) {
      const topicIndex = topics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/english/vocabulary/topik${topicIndex + 1}`} replace />;
      }
    }

    return topicId ? (
      <VocabularyQuizPage
        topicId={topicId}
        levelId={levelId}
        skillId="vocabulary"
        quizTopics={topics}
        buildQuizQuestions={buildQuestions}
        quizLabel="Vocabulary"
      />
    ) : (
      <VocabularyTopicList levelId={levelId} />
    );
  }

  if (activeSkillId === 'grammar') {
    if (topicId) {
      const topicIndex = grammarTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/english/grammar/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/english/grammar" replace />;
    }

    return <GrammarTopicList levelId={levelId} />;
  }

  if (activeSkillId === 'speaking') {
    if (topicId) {
      const topicIndex = speakingTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/english/speaking/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/english/speaking" replace />;
    }

    return <SpeakingTopicList levelId={levelId} />;
  }

  if (activeSkillId === 'writing') {
    if (topicId) {
      const topicIndex = writingTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/english/writing/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/english/writing" replace />;
    }

    return <WritingTopicList levelId={levelId} />;
  }

  if (activeSkillId === 'reading') {
    if (topicId) {
      const topicIndex = readingTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/english/reading/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/english/reading" replace />;
    }

    return <ReadingTopicList levelId={levelId} />;
  }

  if (activeSkillId === 'listening') {
    if (topicId) {
      const topicIndex = listeningTopics.findIndex((topic) => topic.id === topicId);
      if (topicIndex >= 0) {
        return <Navigate to={`/latihan/english/listening/topik${topicIndex + 1}`} replace />;
      }

      return <Navigate to="/latihan/english/listening" replace />;
    }

    return <ListeningTopicList levelId={levelId} />;
  }

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="latihan.questionTypes" subtitleKey="latihan.questionTypesSub" />

        <div className="px-5 md:px-0">
          <div className="grid gap-3 md:grid-cols-2">
            {practiceQuestionTypes.map((qt, i) => (
              <NavCard
                key={qt.id}
                icon={qt.icon}
                label={t(qt.labelKey as TranslationKey)}
                sublabel={t(qt.sublabelKey as TranslationKey)}
                color={qt.color}
                bgColor={qt.bgColor}
                onClick={() => navigate(`/latihan/${activeSkillId}/start`)}
                delay={0.06 * i}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
