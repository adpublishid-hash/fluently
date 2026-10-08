import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, BookOpen, PenTool, BarChart3, Star, TrendingUp } from 'lucide-react';
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



const FREQUENCY_SCALE = [
  { word: "Always", pct: 100, color: "bg-green-500", text: "text-green-700", desc: "Setiap saat", example: "I always brush my teeth." },
  { word: "Usually", pct: 80, color: "bg-emerald-400", text: "text-emerald-700", desc: "Biasanya", example: "I usually go to bed at 10 PM." },
  { word: "Often", pct: 60, color: "bg-teal-400", text: "text-[var(--color-primary)]", desc: "Sering", example: "I often read books." },
  { word: "Sometimes", pct: 40, color: "bg-yellow-400", text: "text-yellow-700", desc: "50/50 (Kadang-kadang)", example: "I sometimes eat fast food." },
  { word: "Rarely", pct: 10, color: "bg-orange-400", text: "text-orange-700", desc: "Jarang", example: "I rarely get sick." },
  { word: "Never", pct: 5, color: "bg-red-500", text: "text-red-700", desc: "0% (Tidak sama sekali)", example: "I never fly a plane." } // pct 5 just for visibility in bar
];

const PLACEMENT_RULES = [
  {
    title: "Kata Kerja Aksi",
    rule: "Subject + Adverb + Verb",
    desc: "Adverb diletakkan SEBELUM kata kerja utama.",
    examples: [
      { correct: "I always eat breakfast.", wrong: "I eat always breakfast." },
      { correct: "She never sleeps late.", wrong: "She sleeps never late." }
    ],
    icon: "🏃",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    title: "To Be (Am/Is/Are)",
    rule: "Subject + To Be + Adverb",
    desc: "Adverb diletakkan SETELAH kata kerja 'To Be'.",
    examples: [
      { correct: "He is always happy.", wrong: "He always is happy." },
      { correct: "They are never late.", wrong: "They never are late." }
    ],
    icon: "🧘",
    color: "bg-purple-50 text-purple-700 border-purple-200"
  }
];

const PRACTICE_ITEMS = [
  { id: 1, text: "I ___ go to the gym. (100%)", correct: "always", options: ["never", "always"] },
  { id: 2, text: "She ___ eats meat. (0%)", correct: "never", options: ["always", "never"] },
  { id: 3, text: "We ___ play football. (40%)", correct: "sometimes", options: ["often", "sometimes"] },
  { id: 4, text: "He is ___ late. (100%)", correct: "always", options: ["always", "rarely"] },
  { id: 5, text: "They ___ watch TV. (80%)", correct: "usually", options: ["never", "usually"] },
  { id: 6, text: "I ___ drink coffee. (10%)", correct: "rarely", options: ["often", "rarely"] },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Pilih urutan yang benar:",
    options: ['I always am happy.', 'I am always happy.'],
    answer: 'I am always happy.',
    explanation: "Adverbs diletakkan SETELAH kata kerja 'To Be' (am, is, are)."
  },
  {
    id: 2,
    question: "Pilih urutan yang benar:",
    options: ['He often plays football.', 'He plays often football.'],
    answer: 'He often plays football.',
    explanation: "Adverbs diletakkan SEBELUM kata kerja aksi (plays)."
  },
  {
    id: 3,
    question: "We ___ eat out on Fridays. (Sering)",
    options: ['seldom', 'often', 'never'],
    answer: 'often',
    explanation: "'Often' berarti sering/banyak kali."
  },
  {
    id: 4,
    question: "She ___ late for work. (0%)",
    options: ['always', 'usually', 'never'],
    answer: 'never',
    explanation: "'Never' berarti tidak pernah sama sekali (0%)."
  },
  {
    id: 5,
    question: "They ___ watch TV in the evening.",
    options: ['usual', 'usually', 'usuallies'],
    answer: 'usually',
    explanation: "Bentuk adverb yang benar adalah 'usually'."
  },
  {
    id: 6,
    question: "My brother ___ helps me. (Jarang)",
    options: ['always', 'usually', 'rarely'],
    answer: 'rarely',
    explanation: "'Rarely' artinya jarang."
  },
  {
    id: 7,
    question: "I ___ drink coffee. (100%)",
    options: ['sometimes', 'never', 'always'],
    answer: 'always',
    explanation: "'Always' artinya selalu (100%)."
  },
  {
    id: 8,
    question: "Where does 'usually' go? 'I ___ go ___ to the park.'",
    options: ['Before go', 'After go'],
    answer: 'Before go',
    explanation: "Sebelum kata kerja aksi: 'I usually go'."
  },
  {
    id: 9,
    question: "Where does 'never' go? 'He ___ is ___ sad.'",
    options: ['After is', 'Before is'],
    answer: 'After is',
    explanation: "Setelah to be: 'He is never sad'."
  },
  {
    id: 10,
    question: "Do you ___ play tennis?",
    options: ['always', 'never', 'ever'],
    answer: 'ever',
    explanation: "Dalam pertanyaan, kita sering menggunakan 'ever' (pernah)."
  },
  {
    id: 11,
    question: "I ___ have breakfast.",
    options: ['hardly ever', 'hard ever', 'hardly'],
    answer: 'hardly ever',
    explanation: "'Hardly ever' adalah frasa umum untuk 'hampir tidak pernah'."
  },
  {
    id: 12,
    question: "Susun kalimat: goes / usually / He / to school",
    options: ['He usually goes to school', 'He goes usually to school'],
    answer: 'He usually goes to school',
    explanation: "Subject + Adverb + Verb."
  },
  {
    id: 13,
    question: "Susun kalimat: is / She / late / always",
    options: ['She is always late', 'She always is late'],
    answer: 'She is always late',
    explanation: "Subject + To Be + Adverb."
  },
  {
    id: 14,
    question: "It ___ snows here in summer.",
    options: ['always', 'never', 'often'],
    answer: 'never',
    explanation: "Secara logika, salju 'tidak pernah' turun di musim panas."
  },
  {
    id: 15,
    question: "We ___ visit our grandparents on Sundays.",
    options: ['sometimes', 'some time', 'sometime'],
    answer: 'sometimes',
    explanation: "Adverb yang benar adalah 'sometimes' (kadang-kadang)."
  },
  {
    id: 16,
    question: "Are you ___ busy?",
    options: ['every', 'day', 'always'],
    answer: 'always',
    explanation: "Pertanyaan: 'Are you always busy?' (Apakah kamu selalu sibuk?)."
  },
  {
    id: 17,
    question: "I don't ___ eat meat.",
    options: ['often', 'ever', 'never'],
    answer: 'often',
    explanation: "Dalam kalimat negatif, kita bisa pakai 'often' (tidak sering)."
  },
  {
    id: 18,
    question: "They are ___ at home on weekends.",
    options: ['usually', 'use', 'usual'],
    answer: 'usually',
    explanation: "Posisi setelah 'are' (to be) -> usually."
  },
  {
    id: 19,
    question: "He ___ reads books.",
    options: ['seldom', 'always', 'never'],
    answer: 'seldom',
    explanation: "Semua benar secara grammar, tapi 'Seldom' berarti jarang."
  },
  {
    id: 20,
    question: "Does she ___ cook?",
    options: ['often', 'sometimes', 'always'],
    answer: 'often',
    explanation: "Posisi adverb di tengah pertanyaan: Does she OFTEN cook?"
  }
];

const GrammarLesson7: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/grammar/lesson-8';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(7));
  const [showGrammarModal, setShowGrammarModal] = React.useState(false);
  const handleSelesai = () => { markGrammarComplete(7); setIsCompleted(true); setShowGrammarModal(true); };
  
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
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Grammar Lesson 7</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowGrammarModal(false); navigate('/modul/english/beginner/grammar/lesson-8'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADbb)' }}>Next ›</button>
          <button onClick={() => { setShowGrammarModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    {grammarModal}
    <LessonShell
            title="Adverbs of Frequency"
            subtitle="Grammar • Pelajaran 7"
            accentColor="#8E44AD"
            nextLesson={'/modul/english/beginner/grammar/lesson-8'}
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
              <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <BarChart3 size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Seberapa Sering?</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Kita menggunakan <b>Adverbs of Frequency</b> untuk mengatakan seberapa sering kita melakukan sesuatu. Dari "Always" (100%) hingga "Never" (0%).
                  </p>
                </div>
              </motion.section>

              {/* Frequency Scale */}
              <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] mb-6 overflow-hidden">
                <div className="bg-[var(--color-background)] p-4 border-b border-[var(--color-border)]">
                  <h3 className="font-bold text-[var(--color-text-primary)]">Skala Frekuensi</h3>
                </div>
                <div className="p-4 space-y-4">
                  {FREQUENCY_SCALE.map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex justify-between items-end mb-1">
                        <span className={`text-sm font-bold ${item.text}`}>{item.word}</span>
                        <span className="text-xs text-[var(--color-text-muted)] font-medium">{item.pct === 5 ? '0' : item.pct}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                        <div className={`h-full ${item.color} transition-all duration-500 group-hover:opacity-80`} style={{ width: `${item.pct}%` }}></div>
                      </div>
                      <p className="text-[10px] text-[var(--color-text-muted)] italic flex justify-between">
                        <span>{item.desc}</span>
                        <span className="text-[var(--color-text-muted)] hidden group-hover:inline">{item.example}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Placement Rules */}
              <h3 className="font-bold text-[var(--color-text-primary)] px-1 mb-3">Aturan Penempatan</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {PLACEMENT_RULES.map((rule, idx) => (
                  <div key={idx} className={`rounded-2xl border p-5 ${rule.color.replace('text-', 'border-').split(' ')[2]} bg-white shadow-[var(--shadow-card)]`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{rule.icon}</span>
                        <h4 className={`text-lg font-bold ${rule.color.split(' ')[1]}`}>{rule.title}</h4>
                      </div>
                    </div>

                    <div className="bg-white/60 p-2 rounded-lg border border-[var(--color-border)]/50 mb-3 text-center">
                      <p className="text-xs font-mono font-bold text-[var(--color-text-primary)]">{rule.rule}</p>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] mb-3">{rule.desc}</p>

                    <ul className="space-y-2">
                      {rule.examples.map((ex, i) => (
                        <li key={i} className="text-xs bg-white/40 p-2 rounded flex flex-col">
                          <span className="text-green-700 font-medium">✅ {ex.correct}</span>
                          <span className="text-red-400 line-through opacity-60 mt-0.5">❌ {ex.wrong}</span>
                        </li>
                      ))}
                    </ul>
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
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-indigo-100/50 border border-indigo-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                  <div
                    className="h-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${((practiceIndex + 1) / PRACTICE_ITEMS.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-6">Lengkapi Kalimat</h3>

                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center animate-pulse-subtle">
                    <TrendingUp size={32} />
                  </div>
                </div>

                <div className="text-xl font-medium text-[var(--color-text-primary)] mb-8 leading-relaxed">
                  {PRACTICE_ITEMS[practiceIndex].text.split('___').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="inline-block border-b-2 border-indigo-500 min-w-[80px] text-center mx-1 text-indigo-600 font-bold">
                          {practiceResult === 'correct' ? PRACTICE_ITEMS[practiceIndex].correct : "?"}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {PRACTICE_ITEMS[practiceIndex].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => checkPractice(opt)}
                      className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-indigo-400 hover:bg-indigo-50 font-bold text-[var(--color-text-secondary)] transition-all active:scale-95 text-lg"
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {practiceResult && (
                  <div className={`mt-6 font-bold animate-bounce ${practiceResult === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
                    {practiceResult === 'correct' ? 'Benar! 🎉' : 'Ups! Coba lagi.'}
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
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
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

export default GrammarLesson7;
