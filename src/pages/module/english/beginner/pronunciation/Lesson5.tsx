import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Star, TrendingUp, Flame } from 'lucide-react';
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

type StressPattern = {
  id: string;
  pattern: string; // e.g., "DA-da"
  visual: string[]; // e.g., ["big", "small"]
  rule: string;
  examples: { word: string; sentence: string; split: string }[];
  color: string;
};

const STRESS_PATTERNS: StressPattern[] = [
  {
    id: '1st',
    pattern: "Tekanan Suku Kata Pertama",
    visual: ["big", "small"],
    rule: "Kebanyakan Kata Benda & Sifat 2 Suku Kata",
    examples: [
      { word: "Table", split: "TA-ble", sentence: "The table is wood." },
      { word: "Happy", split: "HAP-py", sentence: "I am happy." },
      { word: "Mother", split: "MO-ther", sentence: "She is my mother." }
    ],
    color: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    id: '2nd',
    pattern: "Tekanan Suku Kata Kedua",
    visual: ["small", "big"],
    rule: "Kebanyakan Kata Kerja 2 Suku Kata",
    examples: [
      { word: "Begin", split: "be-GIN", sentence: "Let's begin." },
      { word: "Relax", split: "re-LAX", sentence: "Time to relax." },
      { word: "Decide", split: "de-CIDE", sentence: "You decide." }
    ],
    color: "bg-indigo-50 text-indigo-700 border-indigo-200"
  }
];

const PRACTICE_WORDS = [
  { word: "Garden", split: "GAR-den", pattern: "1st", hint: "Kata Benda" },
  { word: "Forgot", split: "for-GOT", pattern: "2nd", hint: "Kata Kerja" },
  { word: "Doctor", split: "DOC-tor", pattern: "1st", hint: "Kata Benda" },
  { word: "Invite", split: "in-VITE", pattern: "2nd", hint: "Kata Kerja" },
  { word: "Purple", split: "PUR-ple", pattern: "1st", hint: "Kata Sifat" },
  { word: "Explode", split: "ex-PLODE", pattern: "2nd", hint: "Kata Kerja" },
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
    question: "Berapa banyak suku kata dalam 'Banana'?",
    options: ['1', '2', '3'],
    answer: '3',
    explanation: "Ba-na-na. 3 suku kata."
  },
  {
    id: 2,
    question: "Di mana tekanan pada kata 'Teacher'?",
    options: ['1st (TEA-cher)', '2nd (tea-CHER)'],
    answer: '1st (TEA-cher)',
    explanation: "Kebanyakan kata benda 2 suku kata menekan suku kata pertama."
  },
  {
    id: 3,
    question: "Di mana tekanan pada kata 'Become' (Kata Kerja)?",
    options: ['1st (BE-come)', '2nd (be-COME)'],
    answer: '2nd (be-COME)',
    explanation: "Kebanyakan kata kerja 2 suku kata menekan suku kata kedua."
  },
  {
    id: 4,
    question: "Tekanan membuat sebuah suku kata...",
    options: ['Lebih pelan dan pendek', 'Lebih keras dan panjang'],
    answer: 'Lebih keras dan panjang',
    explanation: "Suku kata yang ditekan lebih KERAS, PANJANG, dan memiliki NADA lebih tinggi."
  },
  {
    id: 5,
    question: "Berapa suku kata dalam 'Computer'?",
    options: ['2', '3', '4'],
    answer: '3',
    explanation: "Com-pu-ter. 3 suku kata."
  },
  {
    id: 6,
    question: "Di mana tekanan pada 'Window' (Kata Benda)?",
    options: ['1st (WIN-dow)', '2nd (win-DOW)'],
    answer: '1st (WIN-dow)',
    explanation: "Window adalah kata benda, jadi tekanan di suku kata pertama."
  },
  {
    id: 7,
    question: "Di mana tekanan pada 'Enjoy' (Kata Kerja)?",
    options: ['1st (EN-joy)', '2nd (en-JOY)'],
    answer: '2nd (en-JOY)',
    audioText: "Enjoy",
    explanation: "Enjoy adalah kata kerja, jadi tekanan di suku kata kedua."
  },
  {
    id: 8,
    question: "Berapa suku kata dalam 'Beautiful'?",
    options: ['2', '3', '4'],
    answer: '3',
    explanation: "Beau-ti-ful. 3 suku kata."
  },
  {
    id: 9,
    question: "Apa yang menentukan jumlah suku kata?",
    options: ['Jumlah huruf', 'Jumlah bunyi vokal', 'Jumlah konsonan'],
    answer: 'Jumlah bunyi vokal',
    explanation: "Setiap bunyi vokal = satu suku kata."
  },
  {
    id: 10,
    question: "Di mana tekanan pada 'Doctor' (Kata Benda)?",
    options: ['1st (DOC-tor)', '2nd (doc-TOR)'],
    answer: '1st (DOC-tor)',
    audioText: "Doctor",
    explanation: "Doctor adalah kata benda, tekanan di suku kata pertama."
  },
  {
    id: 11,
    question: "Di mana tekanan pada 'Forget' (Kata Kerja)?",
    options: ['1st (FOR-get)', '2nd (for-GET)'],
    answer: '2nd (for-GET)',
    audioText: "Forget",
    explanation: "Forget adalah kata kerja, tekanan di suku kata kedua."
  },
  {
    id: 12,
    question: "Berapa suku kata dalam 'Chocolate'?",
    options: ['2', '3', '4'],
    answer: '3',
    explanation: "Cho-co-late (atau Choc-late dalam pengucapan cepat). 3 suku kata."
  },
  {
    id: 13,
    question: "Kebanyakan kata BENDA 2 suku kata ditekan di...",
    options: ['Suku kata pertama', 'Suku kata kedua', 'Keduanya sama'],
    answer: 'Suku kata pertama',
    explanation: "Contoh: TAble, PENcil, WINdow - semua ditekan di awal."
  },
  {
    id: 14,
    question: "Kebanyakan kata KERJA 2 suku kata ditekan di...",
    options: ['Suku kata pertama', 'Suku kata kedua', 'Keduanya sama'],
    answer: 'Suku kata kedua',
    explanation: "Contoh: beCOME, forGET, enJOY - semua ditekan di akhir."
  },
  {
    id: 15,
    question: "Di mana tekanan pada 'Happy' (Kata Sifat)?",
    options: ['1st (HAP-py)', '2nd (hap-PY)'],
    answer: '1st (HAP-py)',
    audioText: "Happy",
    explanation: "Kata sifat 2 suku kata biasanya ditekan di suku kata pertama."
  },
  {
    id: 16,
    question: "Berapa suku kata dalam 'English'?",
    options: ['1', '2', '3'],
    answer: '2',
    explanation: "Eng-lish. 2 suku kata."
  },
  {
    id: 17,
    question: "Di mana tekanan pada 'Invite' (Kata Kerja)?",
    options: ['1st (IN-vite)', '2nd (in-VITE)'],
    answer: '2nd (in-VITE)',
    audioText: "Invite",
    explanation: "Invite adalah kata kerja, tekanan di suku kata kedua."
  },
  {
    id: 18,
    question: "Di mana tekanan pada 'Garden' (Kata Benda)?",
    options: ['1st (GAR-den)', '2nd (gar-DEN)'],
    answer: '1st (GAR-den)',
    audioText: "Garden",
    explanation: "Garden adalah kata benda, tekanan di suku kata pertama."
  },
  {
    id: 19,
    question: "Berapa suku kata dalam 'Understand'?",
    options: ['2', '3', '4'],
    answer: '3',
    explanation: "Un-der-stand. 3 suku kata."
  },
  {
    id: 20,
    question: "Suku kata yang ditekan biasanya memiliki...",
    options: ['Nada lebih rendah', 'Nada lebih tinggi', 'Nada sama'],
    answer: 'Nada lebih tinggi',
    explanation: "Suku kata yang ditekan: LEBIH KERAS, LEBIH PANJANG, NADA LEBIH TINGGI."
  }
];

const PronunLesson5: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/pronunciation/lesson-6';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedPronunLessons().includes(5));
  const [showPronunModal, setShowPronunModal] = React.useState(false);
  const handleSelesai = () => { markPronunComplete(5); setIsCompleted(true); setShowPronunModal(true); };

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
          Kamu telah menyelesaikan <b>Pronunciation Lesson 5</b>. Terus semangat!
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
  const [practiceIndex, setPracticeIndex] = useState(0);
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
  const handlePracticeCheck = (pattern: string) => {
    if (practiceFeedback) return;
    const current = PRACTICE_WORDS[practiceIndex];

    if (pattern === current.pattern) {
      setPracticeFeedback('correct');
      playSound("Correct!");
    } else {
      setPracticeFeedback('incorrect');
      playSound("Try again.");
    }

    setTimeout(() => {
      setPracticeFeedback(null);
      if (practiceIndex < PRACTICE_WORDS.length - 1) {
        setPracticeIndex(prev => prev + 1);
      } else {
        alert("Latihan Selesai! Coba Kuis sekarang.");
        setPracticeIndex(0);
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
      playSound("Correct!");
    } else {
      playSound("Incorrect.");
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
            title="Penekanan Kata"
            subtitle="Pronunciation • Pelajaran 5"
            accentColor="#E83E8C"
            nextLesson={'/modul/english/beginner/pronunciation/lesson-6'}
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
              <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendingUp size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Apa itu Suku Kata?</h2>
                  <p className="text-amber-50 text-sm leading-relaxed">
                    Suku kata adalah <b>ketukan</b> dalam sebuah kata.
                    <br />
                    Bayangkan seperti tepuk tangan.
                    <br />
                    <br />
                    Satu bunyi vokal = Satu suku kata.
                  </p>
                </div>
              </motion.section>

              <div className="grid gap-4 mt-6">
                {[
                  { w: "Dog", s: 1, c: "👏" },
                  { w: "Ap-ple", s: 2, c: "👏 👏" },
                  { w: "Ba-na-na", s: 3, c: "👏 👏 👏" },
                  { w: "Wa-ter-mel-on", s: 4, c: "👏 👏 👏 👏" }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => playSound(item.w.replace(/-/g, ''))}
                    className="bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-card)] flex items-center justify-between hover:bg-amber-50 transition-colors active:scale-95"
                  >
                    <div>
                      <span className="text-lg font-bold text-[var(--color-text-primary)]">{item.w}</span>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1">{item.s} Suku Kata</p>
                    </div>
                    <span className="text-xl">{item.c}</span>
                  </button>
                ))}
              </div>

<div className="bg-white rounded-2xl p-5 border border-[var(--color-border)] shadow-[var(--shadow-card)] mb-6">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
                  <Flame size={20} />
                  Apa itu Penekanan?
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Dalam bahasa Inggris, satu suku kata selalu <b>LEBIH KERAS</b> dan <b>LEBIH PANJANG</b> dari yang lain. Kita menyebutnya <b>Penekanan (Stress)</b>.
                </p>
              </div>

              <div className="space-y-6">
                {STRESS_PATTERNS.map((group, idx) => (
                  <div key={idx} className={`rounded-2xl border-2 p-5 ${group.color.replace('text-', 'border-').split(' ')[2] || 'border-[var(--color-border)]'} bg-white`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-lg font-bold ${group.color.split(' ')[1]}`}>{group.pattern}</span>
                      <div className="flex gap-1">
                        {group.visual.map((size, i) => (
                          <div key={i} className={`rounded-full bg-current opacity-80 ${size === 'big' ? 'w-4 h-4' : 'w-2 h-2 mt-1'} ${group.color.split(' ')[1]}`}></div>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)] mb-4">{group.rule}</p>

                    <div className="grid grid-cols-1 gap-2">
                      {group.examples.map((ex, i) => (
                        <button
                          key={i}
                          onClick={() => playSound(ex.word)}
                          className="flex items-center justify-between bg-[var(--color-background)] p-3 rounded-xl border border-[var(--color-border)] hover:bg-white transition-all group"
                        >
                          <div className="flex flex-col text-left">
                            <span className="font-bold text-[var(--color-text-primary)] tracking-wide">{ex.split}</span>
                            <span className="text-xs text-[var(--color-text-muted)]">{ex.sentence}</span>
                          </div>
                          <Volume2 size={16} />
                        </button>
                      ))}
                    </div>
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
<div className="max-w-xl mx-auto text-center pt-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-amber-100 border border-amber-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                  <div
                    className="h-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${((practiceIndex + 1) / PRACTICE_WORDS.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-6">Identifikasi Tekanan</h3>

                <div className="mb-8">
                  <button
                    onClick={() => playSound(PRACTICE_WORDS[practiceIndex].word)}
                    className="bg-amber-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-amber-100 transition-colors shadow-inner animate-pulse-subtle"
                  >
                    <Volume2 size={40} />
                  </button>
                  <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">{PRACTICE_WORDS[practiceIndex].word}</h2>
                  <p className="text-sm text-[var(--color-text-muted)]">Apakah itu Kata Benda atau Kata Kerja?</p>
                  <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-[var(--color-text-muted)] mt-2 inline-block">{PRACTICE_WORDS[practiceIndex].hint}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handlePracticeCheck('1st')}
                    className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-rose-400 hover:bg-rose-50 font-bold text-[var(--color-text-secondary)] flex flex-col items-center gap-2"
                  >
                    <span className="flex gap-1 items-end">
                      <div className="w-4 h-4 bg-rose-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-rose-300 rounded-full mb-1"></div>
                    </span>
                    <span>1st Syllable</span>
                  </button>
                  <button
                    onClick={() => handlePracticeCheck('2nd')}
                    className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-indigo-400 hover:bg-indigo-50 font-bold text-[var(--color-text-secondary)] flex flex-col items-center gap-2"
                  >
                    <span className="flex gap-1 items-end">
                      <div className="w-2 h-2 bg-indigo-300 rounded-full mb-1"></div>
                      <div className="w-4 h-4 bg-indigo-500 rounded-full"></div>
                    </span>
                    <span>2nd Syllable</span>
                  </button>
                </div>

                {practiceFeedback && (
                  <div className={`mt-6 font-bold animate-bounce ${practiceFeedback === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
                    {practiceFeedback === 'correct' ? 'Benar! 🎉' : 'Ups! Coba lagi.'}
                    {practiceFeedback === 'correct' && <p className="text-sm font-normal text-[var(--color-text-muted)] mt-1">{PRACTICE_WORDS[practiceIndex].split}</p>}
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
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-amber-50 text-amber-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6 flex flex-col gap-2">
                    {QUIZ_QUESTIONS[quizStep].question}
                    {QUIZ_QUESTIONS[quizStep].audioText && (
                      <button
                        onClick={() => playSound(QUIZ_QUESTIONS[quizStep].audioText || "")}
                        className="self-start mt-2 flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-amber-200 transition-colors"
                      >
                        <Volume2 size={16} /> Dengar
                      </button>
                    )}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-amber-300 hover:bg-[var(--color-background)]";
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
                    className="px-8 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-200"
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

export default PronunLesson5;
