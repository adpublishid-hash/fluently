import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, Info, CheckCircle2, XCircle, BookOpen, PenTool, Mic, Flame, Star } from 'lucide-react';
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



type ConsonantPair = {
  id: string;
  name: string;
  mouthAction: string; // Description of mouth movement
  unvoiced: { char: string; word: string; ipa: string; hint: string };
  voiced: { char: string; word: string; ipa: string; hint: string };
};

const CONSONANT_PAIRS: ConsonantPair[] = [
  {
    id: 'lips',
    name: 'Lip Poppers (Peletup Bibir)',
    mouthAction: 'Tutup bibir, lalu letupkan hingga terbuka.',
    unvoiced: { char: 'P', word: 'Pen', ipa: '/p/', hint: 'Hanya hembusan udara 💨' },
    voiced: { char: 'B', word: 'Ben', ipa: '/b/', hint: 'Gunakan suaramu 🗣️' }
  },
  {
    id: 'teeth',
    name: 'Lip Biters (Penggigit Bibir)',
    mouthAction: 'Gigi atas menyentuh bibir bawah.',
    unvoiced: { char: 'F', word: 'Fan', ipa: '/f/', hint: 'Hembuskan udara keluar 🌬️' },
    voiced: { char: 'V', word: 'Van', ipa: '/v/', hint: 'Getarkan bibir 🐝' }
  },
  {
    id: 'tongue',
    name: 'Tongue Tappers (Pengetuk Lidah)',
    mouthAction: 'Ujung lidah mengetuk di belakang gigi atas.',
    unvoiced: { char: 'T', word: 'Time', ipa: '/t/', hint: 'Ketukan tajam 🥁' },
    voiced: { char: 'D', word: 'Dime', ipa: '/d/', hint: 'Ketukan berat 🔔' }
  },
  {
    id: 'hiss',
    name: 'Hissing Sounds (Bunyi Desis)',
    mouthAction: 'Gigi tertutup, udara memeras keluar.',
    unvoiced: { char: 'S', word: 'Sue', ipa: '/s/', hint: 'Seperti ular 🐍' },
    voiced: { char: 'Z', word: 'Zoo', ipa: '/z/', hint: 'Seperti lebah 🐝' }
  },
  {
    id: 'back',
    name: 'Back Kickers (Penendang Belakang)',
    mouthAction: 'Bagian belakang lidah menendang ke atas.',
    unvoiced: { char: 'K', word: 'Kate', ipa: '/k/', hint: 'Klik cepat 💥' },
    voiced: { char: 'G', word: 'Gate', ipa: '/g/', hint: 'Bunyi dalam 🦍' }
  },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Sentuh tenggorokanmu. Bunyi mana yang membuatnya BERGETAR?",
    options: ['/z/ (Zebra)', '/s/ (Snake)'],
    answer: '/z/ (Zebra)',
    explanation: "Z adalah bunyi BERSUARA. Pita suaramu bergetar seperti lebah."
  },
  {
    id: 2,
    question: "Dengarkan! 'Van'. Apakah bunyi awalnya Bersuara atau Tidak Bersuara?",
    options: ['Unvoiced (Hanya Udara)', 'Voiced (Getaran)'],
    answer: 'Voiced (Getaran)',
    audioText: "Van",
    explanation: "/v/ menggunakan suaramu. /f/ adalah pasangan tak bersuaranya."
  },
  {
    id: 3,
    question: "Bunyi mana yang dibuat dengan meletupkan bibir?",
    options: ['/k/', '/p/'],
    answer: '/p/',
    explanation: "/p/ dan /b/ adalah Peletup Bibir. /k/ dibuat di belakang tenggorokan."
  },
  {
    id: 4,
    question: "Bunyi tak bersuara terasa seperti...",
    options: ['Hembusan udara 💨', 'Getaran berdengung 🐝'],
    answer: 'Hembusan udara 💨',
    explanation: "Bunyi tak bersuara (P, T, K, F, S) hanyalah udara yang bergerak melalui mulutmu."
  },
  {
    id: 5,
    question: "Manakah pasangan Bersuara/Tak Bersuara yang benar?",
    options: ['F (bersuara) - V (tak bersuara)', 'S (bersuara) - Z (tak bersuara)', 'P (tak bersuara) - B (bersuara)'],
    answer: 'P (tak bersuara) - B (bersuara)',
    explanation: "P adalah tak bersuara (hanya udara), B adalah bersuara (getaran)."
  },
  {
    id: 6,
    question: "Kata 'Fan' dimulai dengan bunyi...",
    options: ['Unvoiced (Tak Bersuara)', 'Voiced (Bersuara)'],
    answer: 'Unvoiced (Tak Bersuara)',
    audioText: "Fan",
    explanation: "/f/ adalah tak bersuara. Bandingkan dengan Van (/v/) yang bersuara."
  },
  {
    id: 7,
    question: "Bunyi mana yang membuat tenggorokan bergetar?",
    options: ['/t/', '/d/'],
    answer: '/d/',
    explanation: "/d/ adalah bersuara (Dime). /t/ adalah tak bersuara (Time)."
  },
  {
    id: 8,
    question: "Kata 'Sue' dimulai dengan bunyi...",
    options: ['Unvoiced (Tak Bersuara)', 'Voiced (Bersuara)'],
    answer: 'Unvoiced (Tak Bersuara)',
    audioText: "Sue",
    explanation: "/s/ seperti ular adalah tak bersuara. Bandingkan dengan Zoo (/z/)."
  },
  {
    id: 9,
    question: "Pasangan mana yang keduanya BERSUARA?",
    options: ['F dan S', 'P dan T', 'B dan D'],
    answer: 'B dan D',
    explanation: "B dan D sama-sama bersuara. P, T, F, S adalah tak bersuara."
  },
  {
    id: 10,
    question: "Kata 'Gate' dimulai dengan bunyi...",
    options: ['Unvoiced (Tak Bersuara)', 'Voiced (Bersuara)'],
    answer: 'Voiced (Bersuara)',
    audioText: "Gate",
    explanation: "/g/ adalah bersuara (Gate). Bandingkan dengan Kate (/k/) yang tak bersuara."
  },
  {
    id: 11,
    question: "Bunyi /k/ dibuat di...",
    options: ['Bagian belakang tenggorokan', 'Bagian depan bibir', 'Ujung lidah'],
    answer: 'Bagian belakang tenggorokan',
    explanation: "/k/ dan /g/ adalah Back Kickers - dibuat di belakang mulut."
  },
  {
    id: 12,
    question: "Manakah yang BUKAN pasangan voiced/unvoiced?",
    options: ['P - B', 'T - D', 'M - N'],
    answer: 'M - N',
    explanation: "M dan N sama-sama bersuara. P-B dan T-D adalah pasangan yang benar."
  },
  {
    id: 13,
    question: "Kata 'Zoo' dimulai dengan bunyi...",
    options: ['Voiced (Bersuara)', 'Unvoiced (Tak Bersuara)'],
    answer: 'Voiced (Bersuara)',
    audioText: "Zoo",
    explanation: "/z/ seperti lebah adalah bersuara (getaran)."
  },
  {
    id: 14,
    question: "Bunyi /f/ dan /v/ dibuat dengan...",
    options: ['Lidah mengetuk gigi', 'Gigi atas menyentuh bibir bawah', 'Menutup kedua bibir'],
    answer: 'Gigi atas menyentuh bibir bawah',
    explanation: "Keduanya adalah Lip Biters - gigi menggigit bibir."
  },
  {
    id: 15,
    question: "Kata 'Pen' dimulai dengan bunyi...",
    options: ['Unvoiced (Tak Bersuara)', 'Voiced (Bersuara)'],
    answer: 'Unvoiced (Tak Bersuara)',
    audioText: "Pen",
    explanation: "/p/ adalah tak bersuara. Bandingkan dengan Ben (/b/) yang bersuara."
  },
  {
    id: 16,
    question: "Pasangan mana yang keduanya TAK BERSUARA?",
    options: ['D dan V', 'B dan G', 'P dan K'],
    answer: 'P dan K',
    explanation: "P dan K sama-sama tak bersuara (hanya udara)."
  },
  {
    id: 17,
    question: "Bunyi /t/ dan /d/ dibuat dengan...",
    options: ['Bibir tertutup rapat', 'Ujung lidah mengetuk di belakang gigi atas', 'Lidah di belakang tenggorokan'],
    answer: 'Ujung lidah mengetuk di belakang gigi atas',
    explanation: "Keduanya adalah Tongue Tappers."
  },
  {
    id: 18,
    question: "Kata 'Kate' dimulai dengan bunyi...",
    options: ['Unvoiced (Tak Bersuara)', 'Voiced (Bersuara)'],
    answer: 'Unvoiced (Tak Bersuara)',
    audioText: "Kate",
    explanation: "/k/ adalah tak bersuara. Bandingkan dengan Gate (/g/) yang bersuara."
  },
  {
    id: 19,
    question: "Cara terbaik untuk merasakan perbedaan voiced/unvoiced adalah...",
    options: ['Menyentuh tenggorokan', 'Melihat di cermin', 'Menutup mata'],
    answer: 'Menyentuh tenggorokan',
    explanation: "Sentuh tenggorokan untuk merasakan getaran pada bunyi bersuara!"
  },
  {
    id: 20,
    question: "Kata 'Time' dimulai dengan bunyi...",
    options: ['Unvoiced (Tak Bersuara)', 'Voiced (Bersuara)'],
    answer: 'Unvoiced (Tak Bersuara)',
    audioText: "Time",
    explanation: "/t/ adalah tak bersuara. Bandingkan dengan Dime (/d/) yang bersuara."
  }
];

const PronunLesson3: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/pronunciation/lesson-4';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedPronunLessons().includes(3));
  const [showPronunModal, setShowPronunModal] = React.useState(false);
  const handleSelesai = () => { markPronunComplete(3); setIsCompleted(true); setShowPronunModal(true); };

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
          Kamu telah menyelesaikan <b>Pronunciation Lesson 3</b>. Terus semangat!
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

  
  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string) => { playAudio(text, 0.9); };

  // Quiz Logic
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
            title="Bersuara vs Tak Bersuara"
            subtitle="Pronunciation • Pelajaran 3"
            accentColor="#E83E8C"
            nextLesson={'/modul/english/beginner/pronunciation/lesson-4'}
            tabs={[
                { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
                { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }
            ].filter(Boolean)}
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
{/* Intro Concept */}
              <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Mic size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Trik Tenggorokan</h2>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Tahukah Anda tenggorokan Anda bergetar seperti ponsel ketika Anda mengucapkan beberapa bunyi?
                    Bunyi lainnya hanya angin.
                  </p>
                </div>
              </motion.section>

              {/* Interactive Experiment */}
              <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
                    <Flame size={40} />
                  </div>
                </div>

                <h3 className="text-center font-bold text-[var(--color-text-primary)] text-lg mb-2">Coba ini sekarang juga!</h3>
                <ol className="space-y-4 text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs flex-shrink-0">1</span>
                    <span>Letakkan dua jari dengan lembut di tenggorokan Anda (kotak suara).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs flex-shrink-0">2</span>
                    <span>Katakan <b>"SSSSS"</b> seperti ular. Apakah Anda merasakan sesuatu? <br /> <span className="text-blue-500 font-bold">Tidak ada getaran!</span> Ini Tak Bersuara.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs flex-shrink-0">3</span>
                    <span>Sekarang katakan <b>"ZZZZZ"</b> seperti lebah. Apakah Anda merasakan dengungan? <br /> <span className="text-orange-500 font-bold">Ya! Bergetar!</span> Ini Bersuara.</span>
                  </li>
                </ol>

                <div className="flex gap-3">
                  <button
                    onClick={() => playSound("Ssssssssss")}
                    className="flex-1 bg-blue-50 text-blue-600 py-3 rounded-xl font-bold text-sm hover:bg-blue-100 transition-colors flex flex-col items-center gap-1"
                  >
                    <span>🐍 Tak Bersuara</span>
                    <span className="text-xs font-normal opacity-70">Hanya Udara</span>
                  </button>
                  <button
                    onClick={() => playSound("Zzzzzzzzzz")}
                    className="flex-1 bg-orange-50 text-orange-600 py-3 rounded-xl font-bold text-sm hover:bg-orange-100 transition-colors flex flex-col items-center gap-1"
                  >
                    <span>🐝 Bersuara</span>
                    <span className="text-xs font-normal opacity-70">Getaran</span>
                  </button>
                </div>
              </div>

<div className="flex justify-between items-center mb-4 px-2">
                <span className="text-xs font-bold text-blue-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Tak Bersuara (Udara)</span>
                <span className="text-xs font-bold text-orange-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Bersuara (Getaran)</span>
              </div>

              <div className="space-y-4">
                {CONSONANT_PAIRS.map((group) => (
                  <div key={group.id} className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-[var(--shadow-card)]">
                    {/* Header */}
                    <div className="bg-[var(--color-background)] px-4 py-2 border-b border-[var(--color-border)]">
                      <h3 className="font-bold text-[var(--color-text-primary)]">{group.name}</h3>
                      <p className="text-[10px] text-[var(--color-text-muted)] flex items-center gap-1">
                        <Info size={12} /> {group.mouthAction}
                      </p>
                    </div>

                    {/* Comparison Grid */}
                    <div className="grid grid-cols-2 divide-x divide-gray-100">
                      {/* Unvoiced Side */}
                      <button
                        onClick={() => playSound(`${group.unvoiced.word}. ${group.unvoiced.char}. Unvoiced.`)}
                        className="p-4 flex flex-col items-center hover:bg-blue-50 transition-colors active:scale-95 group relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 opacity-50"></div>
                        <span className="text-3xl font-bold text-blue-500 mb-1">{group.unvoiced.char}</span>
                        <span className="text-sm font-bold text-[var(--color-text-primary)]">{group.unvoiced.word}</span>
                        <span className="text-[10px] text-[var(--color-text-muted)] font-mono mb-2">{group.unvoiced.ipa}</span>
                        <span className="text-[10px] text-blue-400 bg-blue-50 px-2 py-0.5 rounded-full">{group.unvoiced.hint}</span>
                      </button>

                      {/* Voiced Side */}
                      <button
                        onClick={() => playSound(`${group.voiced.word}. ${group.voiced.char}. Voiced.`)}
                        className="p-4 flex flex-col items-center hover:bg-orange-50 transition-colors active:scale-95 group relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-orange-400 opacity-50"></div>
                        <span className="text-3xl font-bold text-orange-500 mb-1">{group.voiced.char}</span>
                        <span className="text-sm font-bold text-[var(--color-text-primary)]">{group.voiced.word}</span>
                        <span className="text-[10px] text-[var(--color-text-muted)] font-mono mb-2">{group.voiced.ipa}</span>
                        <span className="text-[10px] text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">{group.voiced.hint}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
                </div>
            ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
<div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6 flex flex-col gap-2">
                    {QUIZ_QUESTIONS[quizStep].question}
                    {QUIZ_QUESTIONS[quizStep].audioText && (
                      <button
                        onClick={() => playSound(QUIZ_QUESTIONS[quizStep].audioText || "")}
                        className="self-start mt-2 flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-blue-200 transition-colors"
                      >
                        <Volume2 size={16} /> Dengar
                      </button>
                    )}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-blue-300 hover:bg-[var(--color-background)]";
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
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
            </div>
                </motion.div>
            )}
        </LessonShell>
    </>
  );
};

export default PronunLesson3;
