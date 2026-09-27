import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, PlayCircle, Sparkles, CheckCircle2, XCircle, BookOpen, PenTool, Star, TrendingUp } from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';


/* ─── Pronunciation Completion Helpers ─── */
const PRONUN_STORAGE_KEY = 'talky_beginner_pronunciation_completed';
function getCompletedPronunLessons(): number[] {
  try { return JSON.parse(localStorage.getItem(PRONUN_STORAGE_KEY) || '[]'); } catch { return []; }
}
function markPronunComplete(lessonId: number) {
  const done = getCompletedPronunLessons();
  if (!done.includes(lessonId)) localStorage.setItem(PRONUN_STORAGE_KEY, JSON.stringify([...done, lessonId]));
}

type VowelDetail = {
  letter: string;
  short: { word: string; ipa: string; icon: string; hint: string };
  long: { word: string; ipa: string; icon: string; hint: string };
};

const VOWEL_DATA: VowelDetail[] = [
  {
    letter: 'A',
    short: { word: 'Apple', ipa: '/æ/', icon: '🍎', hint: 'Rahang turun rendah, lidah datar.' },
    long: { word: 'Cake', ipa: '/eɪ/', icon: '🎂', hint: 'Senyum dan ucapkan nama huruf "A".' }
  },
  {
    letter: 'E',
    short: { word: 'Bed', ipa: '/ɛ/', icon: '🛏️', hint: 'Rahang rileks, bukaan sedang.' },
    long: { word: 'Leaf', ipa: '/iː/', icon: '🍃', hint: 'Senyum lebar, gigi hampir tertutup.' }
  },
  {
    letter: 'I',
    short: { word: 'Pig', ipa: '/ɪ/', icon: '🐷', hint: 'Bibir rileks, bunyi pendek.' },
    long: { word: 'Ice', ipa: '/aɪ/', icon: '🧊', hint: 'Buka lebar lalu meluncur ke senyum.' }
  },
  {
    letter: 'O',
    short: { word: 'Dog', ipa: '/ɒ/', icon: '🐶', hint: 'Bibir bulat, rahang terbuka.' },
    long: { word: 'Rose', ipa: '/oʊ/', icon: '🌹', hint: 'Bulatkan bibir dengan kencang.' }
  },
  {
    letter: 'U',
    short: { word: 'Bus', ipa: '/ʌ/', icon: '🚌', hint: 'Bunyi tengah rileks "uh".' },
    long: { word: 'Cube', ipa: '/juː/', icon: '🧊', hint: 'Berbunyi seperti "You".' }
  },
];

const MAGIC_E_PAIRS = [
  { short: 'Tap', long: 'Tape', icon: '🚰 ➡️ 📼' },
  { short: 'Kit', long: 'Kite', icon: '🧰 ➡️ 🪁' },
  { short: 'Hop', long: 'Hope', icon: '🐇 ➡️ 🙏' },
  { short: 'Tub', long: 'Tube', icon: '🛁 ➡️ 🧪' },
  { short: 'Cub', long: 'Cube', icon: '🐻 ➡️ 🧊' },
];

const LISTENING_PRACTICE = [
  { id: 1, word: "Hat", type: "Short", options: ["Short A (Pendek)", "Long A (Panjang)"] },
  { id: 2, word: "Lake", type: "Long", options: ["Short A (Pendek)", "Long A (Panjang)"] },
  { id: 3, word: "Sit", type: "Short", options: ["Short I (Pendek)", "Long I (Panjang)"] },
  { id: 4, word: "Note", type: "Long", options: ["Short O (Pendek)", "Long O (Panjang)"] },
  { id: 5, word: "Cut", type: "Short", options: ["Short U (Pendek)", "Long U (Panjang)"] },
];

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  audioText?: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Kata mana yang memiliki bunyi 'A' PANJANG?",
    options: ['Cat', 'Snake', 'Dad'],
    answer: 'Snake',
    explanation: "Snake memiliki bunyi /eɪ/ (Magic E membuat A menjadi panjang)."
  },
  {
    id: 2,
    question: "Kata mana yang memiliki bunyi 'I' PENDEK?",
    options: ['Bike', 'Fish', 'Nine'],
    answer: 'Fish',
    explanation: "Fish memiliki bunyi /ɪ/. Bike dan Nine adalah I Panjang."
  },
  {
    id: 3,
    question: "Jika Anda menambahkan 'E' ke 'Hop', itu menjadi...",
    options: ['Hoppy', 'Hope', 'Happy'],
    answer: 'Hope',
    explanation: "Magic E mengubah O Pendek (Hop) menjadi O Panjang (Hope)."
  },
  {
    id: 4,
    question: "Apa bunyi vokal dalam 'Blue'?",
    options: ['Short U (Pendek)', 'Long U (Panjang)'],
    answer: 'Long U (Panjang)',
    explanation: "Blue berbunyi seperti /uː/ atau /juː/, yang merupakan bunyi U Panjang."
  },
  {
    id: 5,
    question: "Pasangan mana yang berima (memiliki bunyi vokal yang sama)?",
    options: ['Bed - Red', 'Cat - Kate', 'Dog - Go'],
    answer: 'Bed - Red',
    explanation: "Bed dan Red keduanya memiliki bunyi E Pendek /ɛ/."
  },
  {
    id: 6,
    question: "Kata mana yang memiliki bunyi 'E' PANJANG?",
    options: ['Pet', 'Leaf', 'Bed'],
    answer: 'Leaf',
    explanation: "Leaf memiliki bunyi /iː/ yang merupakan E Panjang."
  },
  {
    id: 7,
    question: "Apa yang terjadi ketika kita menambahkan 'E' ke kata 'Kit'?",
    options: ['Menjadi Kite (vokal I menjadi panjang)', 'Tidak berubah', 'Menjadi Kitty'],
    answer: 'Menjadi Kite (vokal I menjadi panjang)',
    explanation: "Magic E mengubah Kit (/ɪ/) menjadi Kite (/aɪ/)."
  },
  {
    id: 8,
    question: "Kata mana yang memiliki bunyi 'O' PENDEK?",
    options: ['Rose', 'Dog', 'Home'],
    answer: 'Dog',
    explanation: "Dog memiliki bunyi /ɒ/, sedangkan Rose dan Home memiliki O Panjang."
  },
  {
    id: 9,
    question: "Kata mana yang memiliki bunyi 'U' PANJANG?",
    options: ['Bus', 'Cup', 'Cube'],
    answer: 'Cube',
    explanation: "Cube memiliki bunyi /juː/ (U Panjang), sedangkan Bus dan Cup pendek."
  },
  {
    id: 10,
    question: "Manakah pasangan Magic E yang benar?",
    options: ['Tap → Tape', 'Cap → Cape', 'Keduanya benar'],
    answer: 'Keduanya benar',
    explanation: "Keduanya menggunakan Magic E untuk mengubah A Pendek menjadi A Panjang."
  },
  {
    id: 11,
    question: "Kata 'Hat' memiliki bunyi vokal apa?",
    options: ['Short A (Pendek)', 'Long A (Panjang)'],
    answer: 'Short A (Pendek)',
    explanation: "Hat memiliki bunyi /æ/ yang merupakan A Pendek."
  },
  {
    id: 12,
    question: "Kata mana yang memiliki bunyi sama dengan 'Cake'?",
    options: ['Cat', 'Lake', 'Sad'],
    answer: 'Lake',
    explanation: "Lake dan Cake sama-sama memiliki bunyi A Panjang /eɪ/."
  },
  {
    id: 13,
    question: "Jika kita menambahkan 'E' ke 'Tub', apa yang terjadi?",
    options: ['Menjadi Tube dengan U Panjang', 'Tidak berubah', 'Menjadi Tubby'],
    answer: 'Menjadi Tube dengan U Panjang',
    explanation: "Magic E mengubah Tub (/ʌ/) menjadi Tube (/juː/)."
  },
  {
    id: 14,
    question: "Kata 'Bed' memiliki bunyi vokal apa?",
    options: ['Short E (Pendek)', 'Long E (Panjang)'],
    answer: 'Short E (Pendek)',
    explanation: "Bed memiliki bunyi /ɛ/, yang merupakan E Pendek."
  },
  {
    id: 15,
    question: "Kata mana yang memiliki bunyi 'I' PANJANG?",
    options: ['Pig', 'Ice', 'Sit'],
    answer: 'Ice',
    explanation: "Ice memiliki bunyi /aɪ/ (I Panjang), sedangkan Pig dan Sit pendek."
  },
  {
    id: 16,
    question: "Manakah yang BUKAN pasangan Magic E?",
    options: ['Hop → Hope', 'Cat → Cute', 'Cub → Cube'],
    answer: 'Cat → Cute',
    explanation: "Cat menjadi Kate (bukan Cute). Cute berasal dari Cut + Magic E."
  },
  {
    id: 17,
    question: "Kata 'Rose' memiliki bunyi vokal apa?",
    options: ['Short O (Pendek)', 'Long O (Panjang)'],
    answer: 'Long O (Panjang)',
    explanation: "Rose memiliki bunyi /oʊ/ (O Panjang) karena Magic E."
  },
  {
    id: 18,
    question: "Kata mana yang memiliki bunyi sama dengan 'Pig'?",
    options: ['Ice', 'Sit', 'Kite'],
    answer: 'Sit',
    explanation: "Pig dan Sit sama-sama memiliki bunyi I Pendek /ɪ/."
  },
  {
    id: 19,
    question: "Apa bunyi vokal dalam kata 'Apple'?",
    options: ['Short A (Pendek)', 'Long A (Panjang)'],
    answer: 'Short A (Pendek)',
    explanation: "Apple memiliki bunyi /æ/, yang merupakan A Pendek."
  },
  {
    id: 20,
    question: "Magic E mengubah vokal menjadi...",
    options: ['Pendek', 'Panjang (mengucapkan nama huruf)', 'Tidak berubah'],
    answer: 'Panjang (mengucapkan nama huruf)',
    explanation: "Magic E membuat vokal mengucapkan namanya sendiri (A, E, I, O, U)."
  }
];

const PronunLesson2: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/pronunciation/lesson-3';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedPronunLessons().includes(2));
  const [showPronunModal, setShowPronunModal] = React.useState(false);
  const handleSelesai = () => { markPronunComplete(2); setIsCompleted(true); setShowPronunModal(true); };

  const pronunModal = showPronunModal ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={() => setShowPronunModal(false)}
    >
      <div
        className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #E83E8C, #E83E8C99)' }}>
          <span style={{ fontSize: 36 }}>🏆</span>
        </div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Pelajaran Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">
          Kamu telah menyelesaikan <b>Pronunciation Lesson 2</b>. Terus semangat!
        </p>
        <div className="flex justify-center gap-2 mb-6">
          <span style={{ fontSize: 26 }}>⭐</span>
          <span style={{ fontSize: 26 }}>⭐</span>
          <span style={{ fontSize: 26 }}>⭐</span>
        </div>
        <div className="flex gap-3">
          {nextLessonPath && (
            <button
              onClick={() => { setShowPronunModal(false); navigate(nextLessonPath); }}
              className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #E83E8C, #E83E8Cbb)' }}
            >
              Next ›
            </button>
          )}
          <button
            onClick={() => { setShowPronunModal(false); navigate(-1); }}
            className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  ) : null;

  
  // Practice State
  const [practiceStep, setPracticeStep] = useState(0);
  const [practiceFeedback, setPracticeFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string) => { playAudio(text, 0.8); };

  // Practice Handlers
  const handlePracticeCheck = (option: string) => {
    if (practiceFeedback) return;
    const current = LISTENING_PRACTICE[practiceStep];
    const isCorrect = option.includes(current.type);
    setPracticeFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) playSound("Correct!");
    else playSound("Try again.");

    setTimeout(() => {
      if (practiceStep < LISTENING_PRACTICE.length - 1) {
        setPracticeStep(prev => prev + 1);
        setPracticeFeedback(null);
      } else {
        setPracticeFeedback(null);
        setPracticeStep(0); // Reset or show completion
        alert("Latihan Selesai! Coba Kuis sekarang.");
      }
    }, 1500);
  };

  // Quiz Handlers
  const handleCheckQuiz = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);
    if (option === QUIZ_QUESTIONS[quizStep].answer) {
      setQuizScore(prev => prev + 1);
      playSound("Correct");
    } else {
      playSound("Incorrect");
    }
  };

  const nextQuizQuestion = () => {
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswerChecked(false);
  };

  return (
    <>
    {pronunModal}
        <LessonShell
            title="Vokal Pendek vs. Panjang"
            subtitle="Pronunciation • Pelajaran 2"
            accentColor="#E83E8C"
            nextLesson={'/modul/english/beginner/pronunciation/lesson-3'}
            tabs={[
                { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
                { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> },
                { id: 'quiz', label: 'Kuis', icon: <Star size={14} /> },
            ]}
            footer={() => (
                <button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: `linear-gradient(135deg, ${'#E83E8C'}, ${'#E83E8C'}cc)` }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai \u2713' : 'Selesai'}
                </button>
            )}
        >
            {(tabId) => tabId === 'learn' ? (
                <div className="space-y-6">
{/* Intro */}
              <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Volume2 size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Vokal Pendek vs. Panjang</h2>
                  <p className="text-pink-100 text-sm leading-relaxed">
                    <b>Vokal Pendek</b> adalah bunyi yang cepat.<br />
                    <b>Vokal Panjang</b> mengucapkan nama alfabetnya sendiri (A, E, I, O, U).
                  </p>
                </div>
              </motion.section>

              {/* Vowel Cards */}
              <div className="space-y-4">
                {VOWEL_DATA.map((vowel, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-[var(--shadow-card)]">
                    <div className="bg-[var(--color-background)] px-4 py-2 border-b border-[var(--color-border)] flex justify-between items-center">
                      <span className="font-bold text-[var(--color-text-primary)] text-lg">Huruf {vowel.letter}</span>
                    </div>
                    <div className="flex divide-x divide-gray-100">
                      {/* Short Side */}
                      <button
                        onClick={() => playSound(`${vowel.short.word}. Short ${vowel.letter}.`)}
                        className="flex-1 p-4 flex flex-col items-center hover:bg-pink-50 transition-colors active:scale-95 group"
                      >
                        <span className="text-3xl mb-2 filter drop-shadow-[var(--shadow-card)]">{vowel.short.icon}</span>
                        <span className="font-bold text-[var(--color-text-primary)] text-lg">{vowel.short.word}</span>
                        <span className="text-xs text-[var(--color-text-muted)] font-mono mt-1 bg-gray-100 px-2 py-0.5 rounded">Pendek {vowel.short.ipa}</span>
                        <p className="text-[10px] text-[var(--color-text-muted)] mt-2 text-center leading-tight opacity-0 group-hover:opacity-100 transition-opacity">
                          {vowel.short.hint}
                        </p>
                      </button>

                      {/* Long Side */}
                      <button
                        onClick={() => playSound(`${vowel.long.word}. Long ${vowel.letter}.`)}
                        className="flex-1 p-4 flex flex-col items-center hover:bg-purple-50 transition-colors active:scale-95 group"
                      >
                        <span className="text-3xl mb-2 filter drop-shadow-[var(--shadow-card)]">{vowel.long.icon}</span>
                        <span className="font-bold text-purple-600 text-lg">{vowel.long.word}</span>
                        <span className="text-xs text-[var(--color-text-muted)] font-mono mt-1 bg-gray-100 px-2 py-0.5 rounded">Panjang {vowel.long.ipa}</span>
                        <p className="text-[10px] text-[var(--color-text-muted)] mt-2 text-center leading-tight opacity-0 group-hover:opacity-100 transition-opacity">
                          {vowel.long.hint}
                        </p>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

<motion.section custom={1} variants={sectionVariants} initial="hidden" animate="visible" className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                <div className="flex items-start gap-4">
                  <Sparkles size={32} />
                  <div>
                    <h3 className="font-bold text-indigo-900 mb-2 text-lg">Aturan Magic 'E'</h3>
                    <p className="text-sm text-indigo-800 leading-relaxed">
                      Ketika Anda menambahkan <b>'e'</b> bisu di akhir kata vokal pendek, itu membuat vokal tersebut mengucapkan namanya (Bunyi Panjang).
                      <br /><br />
                      Contoh: <b>Hop</b> (O Pendek) ➡️ <b>Hope</b> (O Panjang).
                    </p>
                  </div>
                </div>
              </motion.section>

              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mt-4 px-1">Ketuk untuk mengubah!</h3>

              <div className="grid gap-3 mt-2">
                {MAGIC_E_PAIRS.map((pair, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-card)] flex items-center justify-between">
                    {/* Short Word */}
                    <button
                      onClick={() => playSound(pair.short)}
                      className="flex-1 text-center py-2 rounded-lg hover:bg-[var(--color-background)] active:scale-95 transition-all"
                    >
                      <span className="text-lg font-bold text-[var(--color-text-secondary)]">{pair.short}</span>
                      <span className="block text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">Pendek</span>
                    </button>

                    <div className="flex flex-col items-center px-2">
                      <span className="text-xs text-slate-300 mb-1">{pair.icon}</span>
                      <TrendingUp size={20} />
                    </div>

                    {/* Long Word */}
                    <button
                      onClick={() => playSound(pair.long)}
                      className="flex-1 text-center py-2 rounded-lg hover:bg-indigo-50 active:scale-95 transition-all"
                    >
                      <span className="text-lg font-bold text-indigo-600">{pair.long}</span>
                      <span className="block text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Panjang</span>
                    </button>
                  </div>
                ))}
              </div>
                </div>
            ) : tabId === 'practice' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
<div className="max-w-xl mx-auto">
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200 border border-[var(--color-border)] text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-600 animate-pulse-subtle">
                  <Volume2 size={32} />
                </div>

                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Dengar & Identifikasi</h3>
                <p className="text-[var(--color-text-muted)] text-sm mb-8">Ketuk speaker, lalu pilih jenis bunyinya.</p>

                <div className="mb-8">
                  <button
                    onClick={() => playSound(LISTENING_PRACTICE[practiceStep].word)}
                    className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-slate-800 active:scale-95 transition-all flex items-center gap-3 mx-auto"
                  >
                    <PlayCircle size={24} />
                    Putar Kata {practiceStep + 1}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {LISTENING_PRACTICE[practiceStep].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handlePracticeCheck(opt)}
                      className={`py-4 rounded-xl border-2 font-bold text-sm transition-all ${practiceFeedback
                        ? (opt.includes(LISTENING_PRACTICE[practiceStep].type)
                          ? 'bg-green-50 border-sky-500 text-green-700'
                          : 'opacity-50 border-[var(--color-border)]')
                        : 'border-[var(--color-border)] hover:border-pink-300 hover:bg-pink-50 text-[var(--color-text-secondary)]'
                        }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {practiceFeedback === 'correct' && (
                  <div className="mt-6 text-green-600 font-bold animate-bounce">
                    Benar! 🎉
                  </div>
                )}
                {practiceFeedback === 'incorrect' && (
                  <div className="mt-6 text-red-500 font-bold">
                    Ups! Coba lagi.
                  </div>
                )}
              </div>
            </div>
                </motion.div>
            ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-xl mx-auto"
                >
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-pink-50 text-pink-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6 flex flex-col gap-2">
                    {QUIZ_QUESTIONS[quizStep].question}
                    {QUIZ_QUESTIONS[quizStep].audioText && (
                      <button
                        onClick={() => playSound(QUIZ_QUESTIONS[quizStep].audioText || "")}
                        className="self-start mt-2 flex items-center gap-2 bg-pink-100 text-pink-700 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-pink-200 transition-colors"
                      >
                        <Volume2 size={16} /> Dengar
                      </button>
                    )}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-pink-300 hover:bg-[var(--color-background)]";
                      if (isAnswerChecked) {
                        if (option === QUIZ_QUESTIONS[quizStep].answer) btnClass = "bg-green-50 border-sky-500 text-green-700";
                        else if (option === selectedOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                        else btnClass = "opacity-50 border-[var(--color-border)]";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleCheckQuiz(option)}
                          disabled={isAnswerChecked}
                          className={`w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${btnClass}`}
                        >
                          <span>{option}</span>
                          {isAnswerChecked && option === QUIZ_QUESTIONS[quizStep].answer && <CheckCircle2 size={20} />}
                          {isAnswerChecked && option === selectedOption && option !== QUIZ_QUESTIONS[quizStep].answer && <XCircle size={20} />}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswerChecked && (
                    <div className="mt-6">
                      <div className={`p-3 rounded-lg text-sm mb-4 ${selectedOption === QUIZ_QUESTIONS[quizStep].answer ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'}`}>
                        {QUIZ_QUESTIONS[quizStep].explanation}
                      </div>
                      <button
                        onClick={nextQuizQuestion}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                      >
                        {quizStep < QUIZ_QUESTIONS.length - 1 ? "Pertanyaan Selanjutnya" : "Lihat Hasil"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500">
                    <Star size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Kuis Selesai!</h2>
                  <p className="text-[var(--color-text-muted)] mb-6">Kamu mendapatkan skor {quizScore} dari {QUIZ_QUESTIONS.length}</p>
                  <button
                    onClick={restartQuiz}
                    className="px-8 py-3 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700 transition-all shadow-lg shadow-pink-200"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
                </motion.div>
            )}
        </LessonShell>
    </>
  );
};

export default PronunLesson2;
