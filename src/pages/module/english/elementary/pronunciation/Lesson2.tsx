import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Star } from 'lucide-react';
import { StarIcon, TrendUpIcon } from '../../../../../components/Icons';

type Comparison = {
  id: string;
  title: string;
  soundA: { label: string; ipa: string; color: string; desc: string };
  soundB: { label: string; ipa: string; color: string; desc: string };
  pairs: { wordA: string; wordB: string }[];
};

const VOWEL_COMPARISONS: Comparison[] = [
  {
    id: 'i-ee',
    title: "Perbedaan Senyum",
    soundA: { label: "I Pendek", ipa: "/ɪ/", color: "text-blue-600", desc: "Mulut santai. Suara cepat." },
    soundB: { label: "E Panjang", ipa: "/iː/", color: "text-pink-600", desc: "Senyum lebar. Suara panjang." },
    pairs: [
      { wordA: "Sit", wordB: "Seat" },
      { wordA: "Hit", wordB: "Heat" },
      { wordA: "Fill", wordB: "Feel" },
      { wordA: "Ship", wordB: "Sheep" }
    ]
  },
  {
    id: 'e-a',
    title: "Rahang Turun",
    soundA: { label: "E Pendek", ipa: "/e/", color: "text-blue-600", desc: "Mulut sedang. Seperti 'Egg'." },
    soundB: { label: "A Pendek", ipa: "/æ/", color: "text-pink-600", desc: "Buka lebar! Seperti 'Apple'." },
    pairs: [
      { wordA: "Men", wordB: "Man" },
      { wordA: "Bed", wordB: "Bad" },
      { wordA: "Said", wordB: "Sad" },
      { wordA: "Pen", wordB: "Pan" }
    ]
  },
  {
    id: 'u-oo',
    title: "Pembulatan Bibir",
    soundA: { label: "U Pendek", ipa: "/ʊ/", color: "text-blue-600", desc: "Bibir santai. Seperti 'Good'." },
    soundB: { label: "OO Panjang", ipa: "/uː/", color: "text-pink-600", desc: "Bibir lingkaran ketat. Seperti 'Food'." },
    pairs: [
      { wordA: "Pull", wordB: "Pool" },
      { wordA: "Full", wordB: "Fool" },
      { wordA: "Look", wordB: "Luke" },
      { wordA: "Soot", wordB: "Suit" }
    ]
  }
];

const LISTENING_CHALLENGE = [
  { id: 1, word: "Ship", options: ["I Pendek /ɪ/", "E Panjang /iː/"], answer: "I Pendek /ɪ/" },
  { id: 2, word: "Man", options: ["E Pendek /e/", "A Pendek /æ/"], answer: "A Pendek /æ/" },
  { id: 3, word: "Fool", options: ["U Pendek /ʊ/", "OO Panjang /uː/"], answer: "OO Panjang /uː/" },
  { id: 4, word: "Heat", options: ["I Pendek /ɪ/", "E Panjang /iː/"], answer: "E Panjang /iː/" },
  { id: 5, word: "Bed", options: ["E Pendek /e/", "A Pendek /æ/"], answer: "E Pendek /e/" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Untuk membuat suara /iː/ (seperti Sheep), kamu harus...",
    options: ['Merilekskan mulut', 'Tersenyum lebar', 'Menurunkan rahang'],
    answer: 'Tersenyum lebar',
    explanation: "Suara E Panjang /iː/ membutuhkan ketegangan senyum yang lebar."
  },
  {
    id: 2,
    question: "Kata mana yang memiliki suara vokal yang sama dengan 'Good'?",
    options: ['Food', 'Look', 'Blood'],
    answer: 'Look',
    explanation: "'Good' dan 'Look' keduanya menggunakan suara U Pendek /ʊ/."
  },
  {
    id: 3,
    question: "Kata mana yang mengharuskanmu membuka mulut paling lebar?",
    options: ['Men', 'Man', 'Min'],
    answer: 'Man',
    explanation: "Suara /æ/ dalam 'Man' membutuhkan rahang turun lebih rendah daripada /e/ atau /ɪ/."
  },
  {
    id: 4,
    question: "Dengarkan perbedaannya: 'Fill' vs 'Feel'. Mana yang lebih panjang?",
    options: ['Fill', 'Feel'],
    answer: 'Feel',
    explanation: "'Feel' /iː/ adalah vokal panjang."
  },
  {
    id: 5,
    question: "Ketika menghasilkan bunyi /iː/ (seperti Weep), kamu harus...",
    options: ["Merilekskan mulut","Tersenyum lebar","Menurunkan rahang"],
    answer: "Tersenyum lebar",
    explanation: "Suara E Panjang /iː/ membutuhkan ketegangan senyum yang lebar."
  },
  {
    id: 6,
    question: "Pilih kata yang memiliki suara vokal yang sama dengan 'Good' ?",
    options: ["Food","Look","Blood"],
    answer: "Look",
    explanation: "'Good' dan 'Look' keduanya menggunakan suara U Pendek /ʊ/."
  },
  {
    id: 7,
    question: "Dari pilihan berikut, mana yang mengharuskanmu membuka mulut paling lebar?",
    options: ["Men","Man","Min"],
    answer: "Man",
    explanation: "Suara /æ/ dalam 'Man' membutuhkan rahang turun lebih rendah daripada /e/ atau /ɪ/."
  },
  {
    id: 8,
    question: "Dengarkan perbedaannya: 'Fill' vs 'Feel'. Mana yang lebih panjang ?",
    options: ["Fill","Feel"],
    answer: "Feel",
    explanation: "'Feel' /iː/ adalah vokal panjang."
  },
  {
    id: 9,
    question: "Untuk membuat suara /iː/ (seperti Weep), kamu harus...",
    options: ["Merilekskan mulut","Tersenyum lebar","Menurunkan rahang"],
    answer: "Tersenyum lebar",
    explanation: "Suara E Panjang /iː/ membutuhkan ketegangan senyum yang lebar."
  },
  {
    id: 10,
    question: "Dari pilihan berikut, mana yang memiliki suara vokal yang sama dengan 'Good'?",
    options: ["Food","Look","Blood"],
    answer: "Look",
    explanation: "'Good' dan 'Look' keduanya menggunakan suara U Pendek /ʊ/."
  },
  {
    id: 11,
    question: "Kata mana yang mengharuskanmu membuka mulut paling lebar ?",
    options: ["Men","Man","Min"],
    answer: "Man",
    explanation: "Suara /æ/ dalam 'Man' membutuhkan rahang turun lebih rendah daripada /e/ atau /ɪ/."
  },
  {
    id: 12,
    question: "Dengarkan perbedaannya: 'Fill' vs 'Feel'. Mana yang lebih panjang?",
    options: ["Fill","Feel"],
    answer: "Feel",
    explanation: "'Feel' /iː/ adalah vokal panjang."
  },
  {
    id: 13,
    question: "Saat mengucapkan suara /iː/ (seperti Sheep), kamu harus...",
    options: ["Merilekskan mulut","Tersenyum lebar","Menurunkan rahang"],
    answer: "Tersenyum lebar",
    explanation: "Suara E Panjang /iː/ membutuhkan ketegangan senyum yang lebar."
  },
  {
    id: 14,
    question: "Pilih kata yang memiliki suara vokal yang sama dengan 'Good' ?",
    options: ["Food","Look","Blood"],
    answer: "Look",
    explanation: "'Good' dan 'Look' keduanya menggunakan suara U Pendek /ʊ/."
  },
  {
    id: 15,
    question: "Dari pilihan berikut, mana yang mengharuskanmu membuka mulut paling lebar?",
    options: ["Men","Man","Min"],
    answer: "Man",
    explanation: "Suara /æ/ dalam 'Man' membutuhkan rahang turun lebih rendah daripada /e/ atau /ɪ/."
  },
  {
    id: 16,
    question: "Dengarkan perbedaannya: 'Fill' vs 'Feel'. Mana yang lebih panjang ?",
    options: ["Fill","Feel"],
    answer: "Feel",
    explanation: "'Feel' /iː/ adalah vokal panjang."
  },
  {
    id: 17,
    question: "Saat mengucapkan suara /iː/ (seperti Peep), kamu harus...",
    options: ["Merilekskan mulut","Tersenyum lebar","Menurunkan rahang"],
    answer: "Tersenyum lebar",
    explanation: "Suara E Panjang /iː/ membutuhkan ketegangan senyum yang lebar."
  },
  {
    id: 18,
    question: "Manakah kata yang memiliki suara vokal yang sama dengan 'Good' ?",
    options: ["Food","Look","Blood"],
    answer: "Look",
    explanation: "'Good' dan 'Look' keduanya menggunakan suara U Pendek /ʊ/."
  },
  {
    id: 19,
    question: "Manakah kata yang mengharuskanmu membuka mulut paling lebar ?",
    options: ["Men","Man","Min"],
    answer: "Man",
    explanation: "Suara /æ/ dalam 'Man' membutuhkan rahang turun lebih rendah daripada /e/ atau /ɪ/."
  },
  {
    id: 20,
    question: "Dengarkan perbedaannya: 'Fill' vs 'Feel'. Mana yang lebih panjang...",
    options: ["Fill","Feel"],
    answer: "Feel",
    explanation: "'Feel' /iː/ adalah vokal panjang."
  }
];

const ElemPronunLesson2: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_pronunciation', 2);
  const nextLessonPath = '/modul/english/elementary/pronunciation/lesson-3';
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
  const playSound = (text: string) => { playAudio(text, 0.9); };

  // Practice Handlers
  const handlePracticeCheck = (option: string) => {
    if (practiceFeedback) return;
    const current = LISTENING_CHALLENGE[practiceStep];

    if (option === current.answer) {
      setPracticeFeedback('correct');
      playSound("Correct!");
    } else {
      setPracticeFeedback('incorrect');
      playSound("Try again.");
    }

    setTimeout(() => {
      setPracticeFeedback(null);
      if (practiceStep < LISTENING_CHALLENGE.length - 1) {
        setPracticeStep(prev => prev + 1);
      } else {
        alert("Tantangan Mendengarkan Selesai! Coba Kuisnya.");
        /* setActiveTab removed */
        setPracticeStep(0);
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
          <LessonCompleteModal
      show={showCompleteModal}
      onClose={() => setShowCompleteModal(false)}
      lessonLabel={"Elementary Pronunciation Lesson 2"}
      accentColor={"#2E86DE"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Vokal Lanjutan"
            subtitle="Pronunciation • Pelajaran 2"
            accentColor="#E83E8C"
            nextLesson={nextLessonPath}
            tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'challenge', label: 'Tantangan', icon: <Star size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}
            footer={() => (
                <button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #E83E8C, #E83E8Ccc)' }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
                </button>
            )}
        >
            {(tabId) => tabId === 'learn' ? (
        <div className="space-y-8 animate-fade-in">
{/* Intro */}
              <motion.section
                      custom={0}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Volume2 size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Pasangan Vokal Sulit</h2>
                  <p className="text-pink-100 text-sm leading-relaxed">
                    Banyak pelajar bahasa Inggris bingung dengan suara-suara mirip ini. Menguasai perbedaan antara "Sheep" dan "Ship" membuatmu terdengar jauh lebih jelas.
                  </p>
                </div>
              </motion.section>

              {/* Comparisons */}
              <div className="space-y-6">
                {VOWEL_COMPARISONS.map((comp, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] overflow-hidden">
                    <div className="bg-[var(--color-background)] px-4 py-3 border-b border-[var(--color-border)] flex items-center gap-2">
                      <TrendUpIcon className="w-5 h-5 text-[var(--color-text-muted)]" />
                      <h3 className="font-bold text-[var(--color-text-primary)]">{comp.title}</h3>
                    </div>

                    <div className="grid grid-cols-2 divide-x divide-gray-100 border-b border-[var(--color-border)] bg-white">
                      <div className="p-3 text-center">
                        <span className={`text-2xl font-black block ${comp.soundA.color}`}>{comp.soundA.ipa}</span>
                        <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase">{comp.soundA.label}</span>
                        <p className="text-[10px] text-[var(--color-text-muted)] mt-1 leading-tight">{comp.soundA.desc}</p>
                      </div>
                      <div className="p-3 text-center">
                        <span className={`text-2xl font-black block ${comp.soundB.color}`}>{comp.soundB.ipa}</span>
                        <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase">{comp.soundB.label}</span>
                        <p className="text-[10px] text-[var(--color-text-muted)] mt-1 leading-tight">{comp.soundB.desc}</p>
                      </div>
                    </div>

                    <div className="divide-y divide-slate-50">
                      {comp.pairs.map((pair, pIdx) => (
                        <div key={pIdx} className="grid grid-cols-2 divide-x divide-slate-50">
                          <button
                            onClick={() => playSound(pair.wordA)}
                            className="p-3 hover:bg-[var(--color-background)] text-center font-medium text-[var(--color-text-primary)] active:text-blue-600 transition-colors"
                          >
                            {pair.wordA}
                          </button>
                          <button
                            onClick={() => playSound(pair.wordB)}
                            className="p-3 hover:bg-[var(--color-background)] text-center font-bold text-slate-900 active:text-pink-600 transition-colors"
                          >
                            {pair.wordB}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
        </div>
      
      ) : tabId === 'challenge' ? (
        <div className="max-w-xl mx-auto p-4 md:p-8 pb-24 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 text-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Tantangan Mendengarkan</h3>
            <p className="text-xs text-slate-500 mb-4">Tekan tombol audio — pilih suara yang benar.</p>
            <button
              onClick={() => playSound(LISTENING_CHALLENGE[practiceStep % LISTENING_CHALLENGE.length].word)}
              className="w-20 h-20 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mx-auto hover:bg-pink-100 transition-all shadow-inner mb-6"
            >
              <Volume2 size={32} />
            </button>
            <div className="grid grid-cols-1 gap-3">
              {LISTENING_CHALLENGE[practiceStep % LISTENING_CHALLENGE.length].options.map((opt: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handlePracticeCheck(opt)}
                  disabled={!!practiceFeedback}
                  className="py-3 rounded-xl border-2 border-slate-200 hover:border-pink-400 hover:bg-pink-50 font-bold text-slate-700 transition-all active:scale-95 text-sm disabled:opacity-60"
                >
                  {opt}
                </button>
              ))}
            </div>
            {practiceFeedback && (
              <div className={`mt-5 font-bold ${practiceFeedback === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
                {practiceFeedback === 'correct' ? 'Benar! 🎉' : 'Ups! Coba lagi.'}
              </div>
            )}
            <div className="mt-6 text-xs text-slate-400">
              Soal {(practiceStep % LISTENING_CHALLENGE.length) + 1} dari {LISTENING_CHALLENGE.length}
            </div>
          </div>
        </div>
      ) : tabId === 'practice' ? (
        <div className="max-w-xl mx-auto p-4 md:p-8 pb-24 animate-fade-in">
          <div className="animate-fade-in">
          <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-pink-50 text-pink-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
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
                        {quizStep < QUIZ_QUESTIONS.length - 1 ? "Pertanyaan Berikutnya" : "Lihat Hasil"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500">
                    <StarIcon className="w-10 h-10" />
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
            </div>
        </div>
        </div>
      ) : null}
    </LessonShell>
    </>
  );
};

export default ElemPronunLesson2;
