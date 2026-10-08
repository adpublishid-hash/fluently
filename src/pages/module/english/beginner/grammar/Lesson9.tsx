import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle2, XCircle, BookOpen, PenTool, Star, TrendingUp } from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';


/* ─── Grammar Completion Helpers ─── */
const GRAMMAR_STORAGE_KEY = 'talky_beginner_grammar_completed';
function getCompletedGrammarLessons(): number[] {
  try { return JSON.parse(localStorage.getItem(GRAMMAR_STORAGE_KEY) || '[]'); } catch { return []; }
}
function markGrammarComplete(id: number) {
  const done = getCompletedGrammarLessons();
  if (!done.includes(id)) localStorage.setItem(GRAMMAR_STORAGE_KEY, JSON.stringify([...done, id]));
}



const PREP_RULES = [
  {
    prep: "IN",
    scope: "Umum (Besar)",
    desc: "Ruang tertutup, area luas, periode lama.",
    time: ["Tahun (2024)", "Bulan (July)", "Musim (Summer)", "Abad (21st C)", "Di pagi/sore hari"],
    place: ["Negara (France)", "Kota (London)", "Ruangan (In the kitchen)", "Mobil / Taksi (Kendaraan kecil)"],
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "🌍"
  },
  {
    prep: "ON",
    scope: "Lebih Spesifik",
    desc: "Permukaan, hari, tanggal, transportasi besar.",
    time: ["Hari (Monday)", "Tanggal (May 5th)", "Hari Libur dengan 'Day'", "On the weekend (US)"],
    place: ["Jalan (Oxford St)", "Permukaan (On the table)", "Transportasi Umum (Bus, Train)", "Lantai (1st Floor)"],
    color: "bg-orange-50 text-orange-700 border-orange-200",
    icon: "📅"
  },
  {
    prep: "AT",
    scope: "Sangat Spesifik",
    desc: "Titik tepat dalam waktu atau tempat.",
    time: ["Jam (5 PM)", "At night", "At the moment", "At noon / midnight"],
    place: ["Alamat Tepat (123 Main St)", "Tempat Spesifik (At the door)", "Acara (At a party)", "At home / work / school"],
    color: "bg-red-50 text-red-700 border-red-200",
    icon: "📍"
  }
];

const PRACTICE_ITEMS = [
  { id: 1, text: "I was born ___ 1990.", correct: "in", type: "Waktu (Tahun)", hint: "Tahun itu Umum (Besar)." },
  { id: 2, text: "See you ___ Monday.", correct: "on", type: "Waktu (Hari)", hint: "Hari dalam seminggu menggunakan ON." },
  { id: 3, text: "The meeting is ___ 9:00 AM.", correct: "at", type: "Waktu (Jam)", hint: "Waktu tepat menggunakan AT." },
  { id: 4, text: "I am ___ the bus.", correct: "on", type: "Transportasi", hint: "Transportasi umum (kamu bisa berjalan di dalamnya) menggunakan ON." },
  { id: 5, text: "She is ___ the car.", correct: "in", type: "Transportasi", hint: "Kendaraan kecil (kamu duduk di dalam) menggunakan IN." },
  { id: 6, text: "The shop is ___ 21 Baker St.", correct: "at", type: "Tempat (Alamat)", hint: "Alamat spesifik dengan nomor menggunakan AT." },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "We usually have lunch ___ noon.",
    options: ['on', 'in', 'at'],
    answer: 'at',
    explanation: "'Noon' adalah momen tepat (12:00 PM), jadi kita gunakan AT."
  },
  {
    id: 2,
    question: "My birthday is ___ October.",
    options: ['at', 'in', 'on'],
    answer: 'in',
    explanation: "Untuk bulan (tanpa tanggal spesifik), kita gunakan IN."
  },
  {
    id: 3,
    question: "I will see you ___ Monday.",
    options: ['on', 'at', 'in'],
    answer: 'on',
    explanation: "Untuk hari-hari tertentu dalam seminggu, kita selalu menggunakan ON."
  },
  {
    id: 4,
    question: "He lives ___ London.",
    options: ['in', 'on', 'at'],
    answer: 'in',
    explanation: "Untuk kota dan negara (area tertutup besar), gunakan IN."
  },
  {
    id: 5,
    question: "The book is ___ the table.",
    options: ['on', 'in', 'at'],
    answer: 'on',
    explanation: "Benda itu menempel di permukaan atas, jadi gunakan ON."
  },
  {
    id: 6,
    question: "I wake up ___ 6 o'clock.",
    options: ['in', 'on', 'at'],
    answer: 'at',
    explanation: "Untuk jam spesifik, gunakan AT."
  },
  {
    id: 7,
    question: "She was born ___ 1990.",
    options: ['at', 'in', 'on'],
    answer: 'in',
    explanation: "Untuk tahun, gunakan IN."
  },
  {
    id: 8,
    question: "We have a meeting ___ the morning.",
    options: ['in', 'at', 'on'],
    answer: 'in',
    explanation: "Waktu bagian hari (morning, afternoon, evening) menggunakan IN."
  },
  {
    id: 9,
    question: "My party is ___ Friday night.",
    options: ['on', 'at', 'in'],
    answer: 'on',
    explanation: "Spesifik 'Hari' + Bagian hari, tetap menggunakan ON (karena harinya)."
  },
  {
    id: 10,
    question: "They are ___ the bus.",
    options: ['at', 'in', 'on'],
    answer: 'on',
    explanation: "Transportasi umum yang bisa kita berjalan di dalamnya (Bus, Train, Plane) menggunakan ON."
  },
  {
    id: 11,
    question: "She is ___ the car.",
    options: ['at', 'in', 'on'],
    answer: 'in',
    explanation: "Transportasi kecil/pribadi (Car, Taxi) menggunakan IN."
  },
  {
    id: 12,
    question: "I am ___ home.",
    options: ['at', 'in', 'on'],
    answer: 'at',
    explanation: "Tempat spesifik/poin lokasi 'Home' menggunakan AT."
  },
  {
    id: 13,
    question: "The picture is ___ the wall.",
    options: ['in', 'on', 'at'],
    answer: 'on',
    explanation: "Menempel pada permukaan (dinding) menggunakan ON."
  },
  {
    id: 14,
    question: "See you ___ night.",
    options: ['in', 'on', 'at'],
    answer: 'at',
    explanation: "Pengecualian: 'Night' menggunakan AT (At night)."
  },
  {
    id: 15,
    question: "My birthday is ___ 12th May.",
    options: ['at', 'in', 'on'],
    answer: 'on',
    explanation: "Tanggal lengkap/spesifik menggunakan ON."
  },
  {
    id: 16,
    question: "She is waiting ___ the bus stop.",
    options: ['in', 'at', 'on'],
    answer: 'at',
    explanation: "Lokasi titik tertentu (Bus stop) menggunakan AT."
  },
  {
    id: 17,
    question: "It happened ___ summer.",
    options: ['at', 'in', 'on'],
    answer: 'in',
    explanation: "Musim (Summer, Winter) menggunakan IN."
  },
  {
    id: 18,
    question: "I read it ___ the newspaper.",
    options: ['in', 'at', 'on'],
    answer: 'in',
    explanation: "Media cetak/isi buku menggunakan IN."
  },
  {
    id: 19,
    question: "There is a spider ___ the ceiling.",
    options: ['at', 'on', 'in'],
    answer: 'on',
    explanation: "Menempel di permukaan (langit-langit) menggunakan ON."
  },
  {
    id: 20,
    question: "He is ___ work.",
    options: ['on', 'at', 'in'],
    answer: 'at',
    explanation: "Aktivitas/Tempat 'Work' menggunakan AT."
  }
];

const GrammarLesson9: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/grammar/lesson-10';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(9));
  const [showGrammarModal, setShowGrammarModal] = React.useState(false);
  const handleSelesai = () => { markGrammarComplete(9); setIsCompleted(true); setShowGrammarModal(true); };
  
  // Practice State
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceResult, setPracticeResult] = useState<'correct' | 'incorrect' | null>(null);

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string) => { playAudio(text, 0.9); };

  // Practice Logic
  const checkPractice = (option: string) => {
    if (practiceResult) return;

    const current = PRACTICE_ITEMS[practiceIndex];
    if (option === current.correct) {
      setPracticeResult('correct');
      playSound("Correct!");
    } else {
      setPracticeResult('incorrect');
      playSound("Try again.");
    }

    setTimeout(() => {
      setPracticeResult(null);
      if (practiceIndex < PRACTICE_ITEMS.length - 1) {
        setPracticeIndex(prev => prev + 1);
      } else {
        alert("Practice Complete! Try the Quiz.");
        setPracticeIndex(0);
      }
    }, 1500);
  };

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

  const grammarModal = showGrammarModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowGrammarModal(false)}>
      <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44AD99)' }}>
          <span style={{ fontSize: 36 }}>🏆</span>
        </div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Pelajaran Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Grammar Lesson 9</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowGrammarModal(false); navigate('/modul/english/beginner/grammar/lesson-10'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADbb)' }}>Next ›</button>
          <button onClick={() => { setShowGrammarModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    {grammarModal}
    <LessonShell
            title="Kata Depan (In/On/At)"
            subtitle="Grammar • Pelajaran 9"
            accentColor="#8E44AD"
            nextLesson={'/modul/english/beginner/grammar/lesson-10'}
            tabs={[
                { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
                { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> },
                { id: 'quiz', label: 'Kuis', icon: <Star size={14} /> },
            ]}
            footer={() => (
                <button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #8E44AD, #8E44ADcc)' }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
                </button>
            )}
        >
            {(tabId) => tabId === 'learn' ? (
                <div className="space-y-6">

{/* Intro */}
              <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendingUp size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Aturan Segitiga 🔻</h2>
                  <p className="text-teal-100 text-sm leading-relaxed">
                    Bayangkan sebuah corong. <br />
                    <b>IN</b> itu besar dan umum (atas). <br />
                    <b>ON</b> itu lebih kecil dan spesifik (tengah). <br />
                    <b>AT</b> itu sangat tepat (bawah).
                  </p>
                </div>
              </motion.section>

              {/* Rules Cards */}
              <div className="space-y-4">
                {PREP_RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${rule.color.replace('bg-', 'border-').split(' ')[2]} relative overflow-hidden`}>
                    <div className="flex justify-between items-start relative z-10 mb-2">
                      <div>
                        <span className={`text-3xl font-black ${rule.color.split(' ')[1]}`}>{rule.prep}</span>
                        <div className="text-xs font-bold text-[var(--color-text-muted)] mt-1 uppercase tracking-wide">{rule.scope}</div>
                      </div>
                      <span className="text-3xl">{rule.icon}</span>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] font-medium mb-4 italic">{rule.desc}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[var(--color-background)] p-3 rounded-xl">
                        <h4 className="font-bold text-[var(--color-text-primary)] text-xs uppercase mb-2 flex items-center gap-1">
                          ⏰ Waktu
                        </h4>
                        <ul className="text-xs font-medium text-[var(--color-text-secondary)] space-y-1.5">
                          {rule.time.map((ex, i) => <li key={i}>• {ex}</li>)}
                        </ul>
                      </div>
                      <div className="bg-[var(--color-background)] p-3 rounded-xl">
                        <h4 className="font-bold text-[var(--color-text-primary)] text-xs uppercase mb-2 flex items-center gap-1">
                          📍 Tempat
                        </h4>
                        <ul className="text-xs font-medium text-[var(--color-text-secondary)] space-y-1.5">
                          {rule.place.map((ex, i) => <li key={i}>• {ex}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Transport & Exceptions */}
              <div className="grid gap-4 mt-6 md:grid-cols-2">
                <div className="bg-white rounded-2xl p-5 border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🚌</span>
                    <h4 className="font-bold text-[var(--color-text-primary)] text-sm">Aturan Transportasi</h4>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] mb-2 leading-relaxed">
                    <b>IN</b> a car / taxi (Kamu duduk di dalam).<br />
                    <b>ON</b> a bus / train / plane / ship (Kamu bisa berjalan di atasnya).
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <Lightbulb size={24} />
                    <div>
                      <h4 className="font-bold text-yellow-900 text-sm">Pengecualian</h4>
                      <p className="text-xs text-yellow-800 mt-1 leading-relaxed">
                        • <b>In</b> the morning / afternoon / evening.<br />
                        • <b>At</b> night.<br />
                        • <b>At</b> home / work / school.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
                </div>
            ) : tabId === 'practice' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >

<div className="max-w-xl mx-auto text-center pt-8">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-sky-100/50 border border-sky-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                  <div
                    className="h-full bg-gray-500 transition-all duration-300"
                    style={{ width: `${((practiceIndex + 1) / PRACTICE_ITEMS.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-2">Isi Bagian Kosong</h3>
                <span className="text-xs font-bold bg-gray-100 text-[var(--color-text-muted)] px-2 py-1 rounded inline-block mb-6">
                  {PRACTICE_ITEMS[practiceIndex].type}
                </span>

                <div className="text-xl font-medium text-[var(--color-text-primary)] mb-8 leading-relaxed">
                  {PRACTICE_ITEMS[practiceIndex].text.split('___').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="inline-block border-b-2 border-[var(--color-primary)] min-w-[60px] text-center mx-1 text-[var(--color-primary)] font-bold">
                          {practiceResult === 'correct' ? PRACTICE_ITEMS[practiceIndex].correct.toUpperCase() : "?"}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {['in', 'on', 'at'].map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => checkPractice(opt)}
                      className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-sky-400 hover:bg-gray-50 font-bold text-[var(--color-text-secondary)] transition-all active:scale-95 text-lg uppercase"
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {practiceResult && (
                  <div className={`mt-6 font-bold animate-bounce ${practiceResult === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
                    {practiceResult === 'correct' ? 'Benar! 🎉' : 'Ups! Coba lagi.'}
                    {practiceResult === 'correct' && (
                      <p className="text-xs font-normal text-[var(--color-text-muted)] mt-1">{PRACTICE_ITEMS[practiceIndex].hint}</p>
                    )}
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
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-gray-50 text-[var(--color-primary)] px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-sky-300 hover:bg-[var(--color-background)]";
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
                          <span className="uppercase">{option}</span>
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
                    className="px-8 py-3 bg-[var(--color-primary)] text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-sky-200"
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

export default GrammarLesson9;
