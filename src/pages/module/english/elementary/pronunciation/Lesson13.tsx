import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Star, Lightbulb, PlayCircle } from 'lucide-react';
import { StarIcon, FlameIcon, MicIcon, TrendUpIcon, TrophyIcon, RefreshIcon } from '../../../../../components/Icons';

const FLUENCY_RULES = [
  {
    id: 'punctuation',
    title: "Jeda Tanda Baca",
    rule: "Selalu jeda pada koma (,) dan titik (.). Ini cara termudah untuk memenggal kalimat.",
    example: "If you are ready, / let's go.",
    icon: "🛑",
    color: "bg-red-50 text-red-700 border-red-200"
  },
  {
    id: 'connectors',
    title: "Jeda Penghubung",
    rule: "Jeda sedikit sebelum kata penghubung seperti 'and', 'but', 'because', 'so'.",
    example: "I wanted to go, / but I was tired.",
    icon: "🔗",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: 'long',
    title: "Jeda Subjek Panjang",
    rule: "Jika subjeknya panjang, jeda sebelum kata kerja.",
    example: "The man in the black coat / is my uncle.",
    icon: "🚶",
    color: "bg-emerald-50 text-emerald-700 border-blue-200"
  }
];

const PRACTICE_SENTENCES = [
  {
    id: 1,
    raw: "I went to the store to buy some milk.",
    chunked: "I went to the store / to buy some milk.",
    focus: "Jeda sebelum 'to' (tujuan)"
  },
  {
    id: 2,
    raw: "When I arrive at the station, I will call you.",
    chunked: "When I arrive at the station, / I will call you.",
    focus: "Jeda pada koma"
  },
  {
    id: 3,
    raw: "She likes coffee but he prefers tea.",
    chunked: "She likes coffee / but he prefers tea.",
    focus: "Jeda sebelum 'but'"
  },
  {
    id: 4,
    raw: "The big yellow bus stopped at the corner.",
    chunked: "The big yellow bus / stopped at the corner.",
    focus: "Kelompok subjek panjang"
  }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Apa itu 'Thought Group'?",
    options: ['Sekelompok orang yang berpikir', 'Kata-kata yang diucapkan bersama dalam satu napas', 'Daftar kosakata'],
    answer: 'Kata-kata yang diucapkan bersama dalam satu napas',
    explanation: "Thought groups (penggalan) memungkinkanmu bernapas dan membantu pendengar memahami maknanya."
  },
  {
    id: 2,
    question: "Di mana tempat terbaik untuk jeda dalam: 'I am hungry so I will eat.'",
    options: ['Setelah "I"', 'Sebelum "so"', 'Setelah "will"'],
    answer: 'Sebelum "so"',
    explanation: "'So' adalah penghubung. Itu memulai pemikiran baru."
  },
  {
    id: 3,
    question: "Bicara seperti robot terjadi saat kamu...",
    options: ['Terlalu banyak jeda (setiap kata)', 'Bicara terlalu cepat', 'Menggunakan kata-kata besar'],
    answer: 'Terlalu banyak jeda (setiap kata)',
    explanation: "Memutus aliran setelah setiap kata membuatmu terdengar seperti robot."
  },
  {
    id: 4,
    question: "Penggalan mana yang lebih baik?",
    options: ['My friend / lives in / London.', 'My friend lives / in London.'],
    answer: 'My friend lives / in London.',
    explanation: "Memisahkan kata depan seperti 'in' dari objeknya ('London') biasanya buruk."
  },
  {
    id: 5,
    question: "Apa itu 'Thought Group'...",
    options: ["Sekelompok orang yang berpikir","Kata-kata yang diucapkan bersama dalam satu napas","Daftar kosakata"],
    answer: "Kata-kata yang diucapkan bersama dalam satu napas",
    explanation: "Thought groups (penggalan) memungkinkanmu bernapas dan membantu pendengar memahami maknanya."
  },
  {
    id: 6,
    question: "Di mana tempat terbaik untuk jeda dalam: 'I am hungry so I will eat.'",
    options: ["Setelah \"I\"","Sebelum \"so\"","Setelah \"will\""],
    answer: "Sebelum \"so\"",
    explanation: "'So' adalah penghubung. Itu memulai pemikiran baru."
  },
  {
    id: 7,
    question: "Bicara seperti robot terjadi saat kamu...",
    options: ["Terlalu banyak jeda (setiap kata)","Bicara terlalu cepat","Menggunakan kata-kata besar"],
    answer: "Terlalu banyak jeda (setiap kata)",
    explanation: "Memutus aliran setelah setiap kata membuatmu terdengar seperti robot."
  },
  {
    id: 8,
    question: "Penggalan mana yang lebih baik...",
    options: ["My friend / lives in / London.","My friend lives / in London."],
    answer: "My friend lives / in London.",
    explanation: "Memisahkan kata depan seperti 'in' dari objeknya ('London') biasanya buruk."
  },
  {
    id: 9,
    question: "Apa itu 'Thought Group'?",
    options: ["Sekelompok orang yang berpikir","Kata-kata yang diucapkan bersama dalam satu napas","Daftar kosakata"],
    answer: "Kata-kata yang diucapkan bersama dalam satu napas",
    explanation: "Thought groups (penggalan) memungkinkanmu bernapas dan membantu pendengar memahami maknanya."
  },
  {
    id: 10,
    question: "Di mana tempat terbaik untuk jeda dalam: 'I am hungry so I will eat.'",
    options: ["Setelah \"I\"","Sebelum \"so\"","Setelah \"will\""],
    answer: "Sebelum \"so\"",
    explanation: "'So' adalah penghubung. Itu memulai pemikiran baru."
  },
  {
    id: 11,
    question: "Bicara seperti robot terjadi saat kamu... ?",
    options: ["Terlalu banyak jeda (setiap kata)","Bicara terlalu cepat","Menggunakan kata-kata besar"],
    answer: "Terlalu banyak jeda (setiap kata)",
    explanation: "Memutus aliran setelah setiap kata membuatmu terdengar seperti robot."
  },
  {
    id: 12,
    question: "Penggalan mana yang lebih baik...",
    options: ["My friend / lives in / London.","My friend lives / in London."],
    answer: "My friend lives / in London.",
    explanation: "Memisahkan kata depan seperti 'in' dari objeknya ('London') biasanya buruk."
  },
  {
    id: 13,
    question: "Apa itu 'Thought Group'?",
    options: ["Sekelompok orang yang berpikir","Kata-kata yang diucapkan bersama dalam satu napas","Daftar kosakata"],
    answer: "Kata-kata yang diucapkan bersama dalam satu napas",
    explanation: "Thought groups (penggalan) memungkinkanmu bernapas dan membantu pendengar memahami maknanya."
  },
  {
    id: 14,
    question: "Di mana tempat terbaik untuk jeda dalam: 'I am hungry so I will eat.'",
    options: ["Setelah \"I\"","Sebelum \"so\"","Setelah \"will\""],
    answer: "Sebelum \"so\"",
    explanation: "'So' adalah penghubung. Itu memulai pemikiran baru."
  },
  {
    id: 15,
    question: "Bicara seperti robot terjadi saat kamu:",
    options: ["Terlalu banyak jeda (setiap kata)","Bicara terlalu cepat","Menggunakan kata-kata besar"],
    answer: "Terlalu banyak jeda (setiap kata)",
    explanation: "Memutus aliran setelah setiap kata membuatmu terdengar seperti robot."
  },
  {
    id: 16,
    question: "Penggalan mana yang lebih baik...",
    options: ["My friend / lives in / London.","My friend lives / in London."],
    answer: "My friend lives / in London.",
    explanation: "Memisahkan kata depan seperti 'in' dari objeknya ('London') biasanya buruk."
  },
  {
    id: 17,
    question: "Apa itu 'Thought Group'...",
    options: ["Sekelompok orang yang berpikir","Kata-kata yang diucapkan bersama dalam satu napas","Daftar kosakata"],
    answer: "Kata-kata yang diucapkan bersama dalam satu napas",
    explanation: "Thought groups (penggalan) memungkinkanmu bernapas dan membantu pendengar memahami maknanya."
  },
  {
    id: 18,
    question: "Di mana tempat terbaik untuk jeda dalam: 'I am hungry so I will eat.'",
    options: ["Setelah \"I\"","Sebelum \"so\"","Setelah \"will\""],
    answer: "Sebelum \"so\"",
    explanation: "'So' adalah penghubung. Itu memulai pemikiran baru."
  },
  {
    id: 19,
    question: "Bicara seperti robot terjadi saat kamu...",
    options: ["Terlalu banyak jeda (setiap kata)","Bicara terlalu cepat","Menggunakan kata-kata besar"],
    answer: "Terlalu banyak jeda (setiap kata)",
    explanation: "Memutus aliran setelah setiap kata membuatmu terdengar seperti robot."
  },
  {
    id: 20,
    question: "Penggalan mana yang lebih baik ?",
    options: ["My friend / lives in / London.","My friend lives / in London."],
    answer: "My friend lives / in London.",
    explanation: "Memisahkan kata depan seperti 'in' dari objeknya ('London') biasanya buruk."
  }
];

const ElemPronunLesson13: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_pronunciation', 13);
  const nextLessonPath = '/modul/english/elementary/pronunciation/lesson-14';
  // Practice State
  const [practiceIndex, setPracticeIndex] = useState(0);

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string, rate: number = 0.9) => { playAudio(text, rate); };

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
      lessonLabel={"Elementary Pronunciation Lesson 13"}
      accentColor={"#2E86DE"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Membangun Kefasihan"
            subtitle="Pronunciation • Pelajaran 13"
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
                      className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendUpIcon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Jangan Jadi Robot 🤖</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Penutur fasih tidak bicara kata demi kata. Mereka bicara dalam <b>Potongan (Chunks)</b> atau <b>Kelompok Pikiran</b>.
                    <br /><br />
                    Ini membantumu bernapas dan membantu pendengar mengerti.
                  </p>
                </div>
              </motion.section>

              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-[var(--shadow-card)]">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <Lightbulb size={18} className="text-amber-500" />
                  Bandingkan Alirannya
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={() => playSound("I. Want. To. Go. To. The. Park.", 0.6)}
                    className="bg-[var(--color-background)] p-4 rounded-xl border border-[var(--color-border)] flex items-center gap-4 hover:bg-gray-100 transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xl">🤖</div>
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text-muted)] mb-1">Mode Robot</p>
                      <p className="font-mono text-[var(--color-text-primary)]">I. Want. To. Go. To. The. Park.</p>
                    </div>
                  </button>

                  <button
                    onClick={() => playSound("I want to go / to the park.")}
                    className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex items-center gap-4 hover:bg-indigo-100 transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-xl">🌊</div>
                    <div>
                      <p className="text-sm font-medium text-indigo-600 mb-1">Mode Fasih</p>
                      <p className="font-medium text-indigo-900">I want to go <span className="text-indigo-400 font-bold mx-1">/</span> to the park.</p>
                    </div>
                  </button>
                </div>
              </div>

<div className="space-y-6">
              {FLUENCY_RULES.map((item, idx) => (
                <div key={idx} className={`rounded-2xl border p-5 ${item.color.replace('text-', 'border-').split(' ')[2] || 'border-[var(--color-border)]'} bg-white shadow-[var(--shadow-card)]`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl bg-white p-2 rounded-xl shadow-[var(--shadow-card)] border border-slate-50">{item.icon}</span>
                    <h3 className={`text-lg font-bold ${item.color.split(' ')[1]}`}>{item.title}</h3>
                  </div>

                  <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed border-l-2 border-[var(--color-border)] pl-3">
                    {item.rule}
                  </p>

                  <button
                    onClick={() => playSound(item.example.replace('/', ','))}
                    className="w-full bg-white/60 p-3 rounded-xl border border-[var(--color-border)] hover:bg-white transition-all text-left flex justify-between items-center group"
                  >
                    <span className="font-medium text-[var(--color-text-primary)]">
                      {item.example.split('/').map((part, i) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < item.example.split('/').length - 1 && <span className="text-red-400 font-black mx-1">/</span>}
                        </React.Fragment>
                      ))}
                    </span>
                    <Volume2 className={`w-4 h-4 opacity-50 group-hover:opacity-100 ${item.color.split(' ')[1]}`} />
                  </button>
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
              {PRACTICE_SENTENCES.map((item: any, idx: number) => (
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
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-indigo-300 hover:bg-[var(--color-background)]";
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
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
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

export default ElemPronunLesson13;
