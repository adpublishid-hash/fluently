import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Star, Lightbulb } from 'lucide-react';
import { StarIcon, TrendUpIcon } from '../../../../../components/Icons';

type LinkingType = {
  id: string;
  title: string;
  formula: string;
  desc: string;
  examples: { text: string; phonetic: string; hint: string }[];
  color: string;
  icon: string;
};

const LINKING_TYPES: LinkingType[] = [
  {
    id: 'cv',
    title: "Konsonan + Vokal",
    formula: "K 🔗 V",
    desc: "Ketika sebuah kata berakhiran konsonan dan kata berikutnya dimulai dengan vokal, pindahkan konsonan ke kata berikutnya.",
    examples: [
      { text: "Stop it", phonetic: "Sto-pit", hint: "/p/ pindah ke 'it'" },
      { text: "Wake up", phonetic: "Way-kup", hint: "/k/ pindah ke 'up'" },
      { text: "Turn on", phonetic: "Tur-non", hint: "/n/ pindah ke 'on'" }
    ],
    color: "bg-emerald-50 text-emerald-700 border-blue-200",
    icon: "🔗"
  },
  {
    id: 'cc',
    title: "Konsonan Sama",
    formula: "K1 🔗 K1",
    desc: "Ketika dua kata berbagi suara konsonan yang SAMA, ucapkan hanya sekali. Jangan berhenti.",
    examples: [
      { text: "Black cat", phonetic: "Bla-cat", hint: "Satu suara /k/" },
      { text: "Good day", phonetic: "Goo-day", hint: "Satu suara /d/" },
      { text: "Red dress", phonetic: "Re-dress", hint: "Satu suara /d/" }
    ],
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "🤝"
  },
  {
    id: 'vv',
    title: "Vokal + Vokal",
    formula: "V 🔗 V",
    desc: "Ketika dua vokal bertemu, kita menambahkan suara 'w' atau 'y' kecil untuk menghubungkannya.",
    examples: [
      { text: "Go out", phonetic: "Go-w-out", hint: "Tambah suara /w/" },
      { text: "Do it", phonetic: "Do-w-it", hint: "Tambah suara /w/" },
      { text: "I am", phonetic: "I-y-am", hint: "Tambah suara /j/ (y)" },
      { text: "See it", phonetic: "See-y-it", hint: "Tambah suara /j/ (y)" }
    ],
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: "🌊"
  }
];

const PRACTICE_ITEMS = [
  { id: 1, phrase: "Look at", type: "K+V", correct: "Loo-kat", options: ["Look..at", "Loo-kat"], hint: "K pindah ke A" },
  { id: 2, phrase: "Bad dog", type: "K+K", correct: "Ba-dog", options: ["Bad-dog", "Ba-dog"], hint: "Satu suara D" },
  { id: 3, phrase: "Two apples", type: "V+V", correct: "Two-w-apples", options: ["Two-w-apples", "Two-apples"], hint: "Tambah /w/" },
  { id: 4, phrase: "Need it", type: "K+V", correct: "Nee-dit", options: ["Need-it", "Nee-dit"], hint: "D pindah ke I" },
  { id: 5, phrase: "Big girl", type: "K+K", correct: "Bi-girl", options: ["Big-girl", "Bi-girl"], hint: "Satu suara G" },
  { id: 6, phrase: "She is", type: "V+V", correct: "She-y-is", options: ["She-is", "She-y-is"], hint: "Tambah /y/" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Bagaimana penutur asli biasanya mengucapkan 'Stop it'?",
    options: ['Stop... it (Jeda)', 'Sto-pit (Terhubung)'],
    answer: 'Sto-pit (Terhubung)',
    explanation: "Konsonan P terhubung ke Vokal I, terdengar seperti satu kata."
  },
  {
    id: 2,
    question: "Apa yang terjadi pada 'Red door'?",
    options: ['Kita mengucapkan satu suara D panjang', 'Kita mengucapkan dua suara D'],
    answer: 'Kita mengucapkan satu suara D panjang',
    explanation: "Karena 'Red' berakhiran D dan 'Door' dimulai dengan D, mereka menyatu."
  },
  {
    id: 3,
    question: "Suara penghubung apa yang muncul di 'Go out'?",
    options: ['/w/', '/r/', '/y/'],
    answer: '/w/',
    explanation: "Bibir bulat (Go) + Vokal (Out) = Go-w-out."
  },
  {
    id: 4,
    question: "Mengapa kita menghubungkan kata-kata?",
    options: ['Untuk membingungkan orang', 'Untuk berbicara lebih cepat dan lancar'],
    answer: 'Untuk berbicara lebih cepat dan lancar',
    explanation: "Menghubungkan membuat ucapan mengalir seperti sungai, bukan robot."
  },
  {
    id: 5,
    question: "Dengarkan: 'I agree'. Apa yang menghubungkan I dan A?",
    options: ['/y/ (j)', 'Tidak ada', '/w/'],
    answer: '/y/ (j)',
    explanation: "Vokal senyum (I) + Vokal (Agree) = I-y-agree."
  },
  {
    id: 6,
    question: "Bagaimana penutur asli biasanya mengucapkan 'Stop it'?",
    options: ["Stop... ? it (Jeda)","Sto-pit (Terhubung)"],
    answer: "Sto-pit (Terhubung)",
    explanation: "Konsonan P terhubung ke Vokal I, terdengar seperti satu kata."
  },
  {
    id: 7,
    question: "Apa yang terjadi pada 'Red door' ?",
    options: ["Kita mengucapkan satu suara D panjang", "Kita mengucapkan dua suara D"],
    answer: "Kita mengucapkan satu suara D panjang",
    explanation: "Karena 'Red' berakhiran D dan 'Door' dimulai dengan D, mereka menyatu."
  },
  {
    id: 8,
    question: "Suara penghubung apa yang muncul di 'Go out' ?",
    options: ["/w/","/y/","/r/"],
    answer: "/w/",
    explanation: "Bibir bulat (Go) + Vokal (Out) = Go-w-out."
  },
  {
    id: 9,
    question: "Mengapa kita menghubungkan kata-kata ?",
    options: ["Untuk membingungkan orang", "Untuk berbicara lebih cepat dan lancar"],
    answer: "Untuk berbicara lebih cepat dan lancar",
    explanation: "Menghubungkan membuat ucapan mengalir seperti sungai, bukan robot."
  },
  {
    id: 10,
    question: "Simak kata: 'I agree'. Apa yang menghubungkan I dan A...",
    options: ["/y/ (j)", "Tidak ada", "/w/"],
    answer: "/y/ (j)",
    explanation: "Vokal senyum (I) + Vokal (Agree) = I-y-agree."
  },
  {
    id: 11,
    question: "Bagaimana penutur asli biasanya mengucapkan 'Stop it'?",
    options: ["Stop... it (Jeda)","Sto-pit (Terhubung)"],
    answer: "Sto-pit (Terhubung)",
    explanation: "Konsonan P terhubung ke Vokal I, terdengar seperti satu kata."
  },
  {
    id: 12,
    question: "Apa yang terjadi pada 'Red door'...",
    options: ["Kita mengucapkan dua suara D","Kita mengucapkan satu suara D panjang"],
    answer: "Kita mengucapkan satu suara D panjang",
    explanation: "Karena 'Red' berakhiran D dan 'Door' dimulai dengan D, mereka menyatu."
  },
  {
    id: 13,
    question: "Suara penghubung apa yang muncul di 'Go out'...",
    options: ["/y/", "/w/", "/r/"],
    answer: "/w/",
    explanation: "Bibir bulat (Go) + Vokal (Out) = Go-w-out."
  },
  {
    id: 14,
    question: "Mengapa kita menghubungkan kata-kata?",
    options: ["Untuk membingungkan orang", "Untuk berbicara lebih cepat dan lancar"],
    answer: "Untuk berbicara lebih cepat dan lancar",
    explanation: "Menghubungkan membuat ucapan mengalir seperti sungai, bukan robot."
  },
  {
    id: 15,
    question: "Fokus pada: 'I agree'. Apa yang menghubungkan I dan A?",
    options: ["/w/","/y/ (j)","Tidak ada"],
    answer: "/y/ (j)",
    explanation: "Vokal senyum (I) + Vokal (Agree) = I-y-agree."
  },
  {
    id: 16,
    question: "Bagaimana penutur asli biasanya mengucapkan 'Stop it'...",
    options: ["Sto-pit (Terhubung)", "Stop: it (Jeda)"],
    answer: "Sto-pit (Terhubung)",
    explanation: "Konsonan P terhubung ke Vokal I, terdengar seperti satu kata."
  },
  {
    id: 17,
    question: "Apa yang terjadi pada 'Red door'?",
    options: ["Kita mengucapkan satu suara D panjang", "Kita mengucapkan dua suara D"],
    answer: "Kita mengucapkan satu suara D panjang",
    explanation: "Karena 'Red' berakhiran D dan 'Door' dimulai dengan D, mereka menyatu."
  },
  {
    id: 18,
    question: "Suara penghubung apa yang muncul di 'Go out'?",
    options: ["/w/", "/r/", "/y/"],
    answer: "/w/",
    explanation: "Bibir bulat (Go) + Vokal (Out) = Go-w-out."
  },
  {
    id: 19,
    question: "Mengapa kita menghubungkan kata-kata?",
    options: ["Untuk membingungkan orang", "Untuk berbicara lebih cepat dan lancar"],
    answer: "Untuk berbicara lebih cepat dan lancar",
    explanation: "Menghubungkan membuat ucapan mengalir seperti sungai, bukan robot."
  },
  {
    id: 20,
    question: "Simak kata: 'I agree'. Apa yang menghubungkan I dan A?",
    options: ["/w/","/y/ (j)","Tidak ada"],
    answer: "/y/ (j)",
    explanation: "Vokal senyum (I) + Vokal (Agree) = I-y-agree."
  }
];

const ElemPronunLesson6: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_pronunciation', 6);
  const nextLessonPath = '/modul/english/elementary/pronunciation/lesson-7';
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
  const playSound = (text: string, rate: number = 0.9) => { playAudio(text, rate); };

  // Practice Handlers
  const handlePracticeCheck = (option: string) => {
    if (practiceFeedback) return;
    const current = PRACTICE_ITEMS[practiceIndex];

    if (option === current.correct) {
      setPracticeFeedback('correct');
      playSound("Correct!");
    } else {
      setPracticeFeedback('incorrect');
      playSound("Try again.");
    }

    setTimeout(() => {
      setPracticeFeedback(null);
      if (practiceIndex < PRACTICE_ITEMS.length - 1) {
        setPracticeIndex(prev => prev + 1);
      } else {
        alert("Terhubung dengan baik! Pindah ke Kuis.");
        /* setActiveTab removed */
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
          <LessonCompleteModal
      show={showCompleteModal}
      onClose={() => setShowCompleteModal(false)}
      lessonLabel={"Elementary Pronunciation Lesson 6"}
      accentColor={"#2E86DE"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Ucapan Terhubung"
            subtitle="Pronunciation • Pelajaran 6"
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
                      className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendUpIcon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Jangan Bicara Seperti Robot! 🤖</h2>
                  <p className="text-emerald-100 text-sm leading-relaxed">
                    Penutur asli bahasa Inggris tidak berhenti di antara setiap kata. Mereka menghubungkan kata-kata agar ucapan menjadi halus dan cepat.
                    <br /><br />
                    <b>Terdengar seperti:</b> "Stop it" ➜ "Sto-pit".
                  </p>
                </div>
              </motion.section>

              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-[var(--shadow-card)]">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <Lightbulb size={2000} />
                  Mengapa Menghubungkan?
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-[var(--color-background)] p-4 rounded-xl border border-[var(--color-border)]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🤖</span>
                      <span className="font-bold text-[var(--color-text-primary)]">Ucapan Robot</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] italic">"I. Am. In. An. Office."</p>
                    <p className="text-xs text-red-500 font-bold mt-1">Terputus-putus & Tidak Alami</p>
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">😎</span>
                      <span className="font-bold text-emerald-800">Ucapan Alami</span>
                    </div>
                    <p className="text-sm text-emerald-700 italic">"I-yam-in-nan-office."</p>
                    <p className="text-xs text-emerald-600 font-bold mt-1">Halus & Lancar</p>
                  </div>
                </div>
              </div>

<div className="space-y-6">
              {LINKING_TYPES.map((type, idx) => (
                <div key={idx} className={`rounded-2xl border p-5 ${type.color.replace('text-', 'border-').split(' ')[2] || 'border-[var(--color-border)]'} bg-white shadow-[var(--shadow-card)]`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{type.icon}</span>
                      <h3 className={`text-lg font-bold ${type.color.split(' ')[1]}`}>{type.title}</h3>
                    </div>
                    <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-current opacity-70 font-bold">{type.formula}</span>
                  </div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)] mb-3">{type.desc}</p>

                  <div className="space-y-2">
                    {type.examples.map((ex, i) => (
                      <button
                        key={i}
                        onClick={() => playSound(ex.text)}
                        className="flex items-center justify-between bg-[var(--color-background)] p-3 rounded-xl border border-[var(--color-border)] hover:bg-white transition-all group w-full"
                      >
                        <div>
                          <span className="font-bold text-[var(--color-text-primary)] tracking-wide block">{ex.text}</span>
                          <span className="text-xs text-[var(--color-text-muted)]">Terdengar seperti: <b>{ex.phonetic}</b></span>
                        </div>
                        <Volume2 className={`w-4 h-4 opacity-50 group-hover:opacity-100 ${type.color.split(' ')[1]}`} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
        </div>
      
      ) : tabId === 'challenge' ? (
        <div className="max-w-xl mx-auto p-4 md:p-8 pb-24 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Tantangan Shadowing</h3>
            <p className="text-xs text-slate-500 mb-6 text-center">Tekan tombol putar lalu ulangi dengan lantang.</p>
            <div className="space-y-3">
              {PRACTICE_ITEMS.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <button
                    onClick={() => playSound(item.sentence)}
                    className="w-11 h-11 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 hover:bg-pink-200 transition-all"
                  >
                    <Volume2 size={18} />
                  </button>
                  <p className="flex-1 text-sm font-semibold text-slate-800">{item.sentence}</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 text-center mt-5 italic">🎤 Ucapkan setiap kalimat 3x — fokus pada ritme dan intonasi.</p>
          </div>
        </div>
      ) : tabId === 'practice' ? (
        <div className="max-w-xl mx-auto p-4 md:p-8 pb-24 animate-fade-in">
          <div className="animate-fade-in">
          <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
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
                    className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-blue-200"
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

export default ElemPronunLesson6;
