import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle2, XCircle, BookOpen, PenTool, Hand, Star, TrendingUp } from 'lucide-react';
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

// Custom Icon for 'Stop/Hand'
const HandStopIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </svg>
);



const IMPERATIVE_USES = [
  {
    title: "Perintah",
    ex: "Sit down now.",
    icon: "👮‍♂️",
    color: "bg-red-50 text-red-700 border-red-200"
  },
  {
    title: "Instruksi",
    ex: "Turn left.",
    icon: "🗺️",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    title: "Peringatan",
    ex: "Watch out!",
    icon: "⚠️",
    color: "bg-amber-50 text-amber-700 border-amber-200"
  },
  {
    title: "Saran",
    ex: "Eat an apple.",
    icon: "🍏",
    color: "bg-green-50 text-green-700 border-sky-200"
  }
];

const GRAMMAR_RULES = [
  {
    label: "Positif (+)",
    formula: "Base Verb + (Object)",
    example: "Open the door.",
    note: "Tidak ada 'You'. Tidak ada 's'. Tidak ada 'ing'.",
    color: "bg-emerald-50 text-emerald-700 border-blue-200"
  },
  {
    label: "Negatif (-)",
    formula: "Don't + Base Verb",
    example: "Don't close it.",
    note: "Selalu 'Don't', jangan 'No' atau 'Not'.",
    color: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    label: "Dengan 'Be'",
    formula: "Be + Adjective",
    example: "Be careful. / Don't be sad.",
    note: "Gunakan 'Be', bukan 'Are' atau 'Is'.",
    color: "bg-purple-50 text-purple-700 border-purple-200"
  }
];

const POLITENESS_SCALE = [
  { lvl: "Langsung (Kasar?)", text: "Give me the pen.", color: "text-red-500" },
  { lvl: "Sopan", text: "Please give me the pen.", color: "text-blue-500" },
  { lvl: "Sangat Sopan", text: "Could you give me the pen?", color: "text-green-600" }
];

const PRACTICE_ITEMS = [
  { id: 1, text: "___ quiet, please.", correct: "Be", options: ["Be", "Are", "Is"], hint: "Imperatif menggunakan Bentuk Dasar." },
  { id: 2, text: "___ run in the hallway!", correct: "Don't", options: ["No", "Not", "Don't"], hint: "Perintah negatif = Don't." },
  { id: 3, text: "Please ___ your name here.", correct: "sign", options: ["signs", "sign", "signing"], hint: "Hanya Kata Kerja Dasar." },
  { id: 4, text: "___ you help me?", correct: "Could", options: ["Do", "Could", "Have"], hint: "Pembuka permintaan sopan." },
  { id: 5, text: "___ careful with that knife.", correct: "Be", options: ["Do", "Be", "Have"], hint: "Kata sifat membutuhkan 'Be'." },
  { id: 6, text: "___ touch the painting.", correct: "Don't", options: ["Don't", "Doesn't", "Not"], hint: "Perintah negatif." },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Manakah kalimat perintah negatif yang benar?",
    options: ['No smoke here.', 'Not smoke here.', 'Don\'t smoke here.'],
    answer: 'Don\'t smoke here.',
    explanation: "Imperatif negatif selalu dimulai dengan 'Don't' + Kata Kerja Dasar."
  },
  {
    id: 2,
    question: "___ nice to your sister.",
    options: ['Is', 'Be', 'Are'],
    answer: 'Be',
    explanation: "Saat memberikan perintah dengan kata sifat (nice), gunakan 'Be'."
  },
  {
    id: 3,
    question: "Manakah permintaan yang paling sopan?",
    options: ['Open the window.', 'Open the window, please.', 'Could you open the window?'],
    answer: 'Could you open the window?',
    explanation: "'Could you...' lebih halus dan lebih sopan daripada perintah langsung, bahkan dengan 'please'."
  },
  {
    id: 4,
    question: "___ forget your keys!",
    options: ['Don\'t', 'Not', 'No'],
    answer: 'Don\'t',
    explanation: "Struktur imperatif negatif standar."
  },
  {
    id: 5,
    question: "Please ___ a seat.",
    options: ['takes', 'taking', 'take'],
    answer: 'take',
    explanation: "Imperatif selalu menggunakan BENTUK DASAR dari kata kerja."
  },
  {
    id: 6,
    question: "___ the door.",
    options: ['Close', 'Closes', 'Closing'],
    answer: 'Close',
    explanation: "Gunakan kata kerja dasar: Close."
  },
  {
    id: 7,
    question: "___ careful!",
    options: ['Do', 'Have', 'Be'],
    answer: 'Be',
    explanation: "Be + Adjective (Careful)."
  },
  {
    id: 8,
    question: "Don't ___ that.",
    options: ['touch', 'touches', 'touching'],
    answer: 'touch',
    explanation: "Don't + Verb 1 (touch)."
  },
  {
    id: 9,
    question: "___ you pass the salt?",
    options: ['Could', 'Do', 'Have'],
    answer: 'Could',
    explanation: "Permintaan sopan: Could you...?"
  },
  {
    id: 10,
    question: "___ talk during the exam.",
    options: ['No', 'Don\'t', 'Not'],
    answer: 'Don\'t',
    explanation: "Larangan: Don't talk."
  },
  {
    id: 11,
    question: "___ quiet, please.",
    options: ['Be', 'Get', 'Have'],
    answer: 'Be',
    explanation: "Be quiet (diamlah)."
  },
  {
    id: 12,
    question: "___ up!",
    options: ['Stand', 'Stands', 'Standing'],
    answer: 'Stand',
    explanation: "Stand up."
  },
  {
    id: 13,
    question: "Please ___ me.",
    options: ['help', 'helps', 'helping'],
    answer: 'help',
    explanation: "Kata kerja dasar 'help'."
  },
  {
    id: 14,
    question: "___ late.",
    options: ['Don\'t be', 'Not be', 'No be'],
    answer: 'Don\'t be',
    explanation: "Don't be late (Jangan terlambat)."
  },
  {
    id: 15,
    question: "___ left at the corner.",
    options: ['Turn', 'Turns', 'Turning'],
    answer: 'Turn',
    explanation: "Instruksi arah: Turn left."
  },
  {
    id: 16,
    question: "___ worry.",
    options: ['Don\'t', 'No', 'Not'],
    answer: 'Don\'t',
    explanation: "Don't worry (Jangan khawatir)."
  },
  {
    id: 17,
    question: "Let's ___.",
    options: ['go', 'goes', 'going'],
    answer: 'go',
    explanation: "Let's + Verb 1 (go)."
  },
  {
    id: 18,
    question: "___ your vegetables.",
    options: ['Eat', 'Eats', 'Eating'],
    answer: 'Eat',
    explanation: "Perintah: Eat (Makanlah)."
  },
  {
    id: 19,
    question: "Don't ___ silly.",
    options: ['be', 'is', 'are'],
    answer: 'be',
    explanation: "Don't be silly."
  },
  {
    id: 20,
    question: "___ me the money.",
    options: ['Show', 'Shows', 'Showing'],
    answer: 'Show',
    explanation: "Show me (Tunjukkan padaku)."
  }
];

const GrammarLesson13: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/grammar/lesson-14';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(13));
  const [showGrammarModal, setShowGrammarModal] = React.useState(false);
  const handleSelesai = () => { markGrammarComplete(13); setIsCompleted(true); setShowGrammarModal(true); };
  
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
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Grammar Lesson 13</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowGrammarModal(false); navigate('/modul/english/beginner/grammar/lesson-14'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADbb)' }}>Next ›</button>
          <button onClick={() => { setShowGrammarModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    {grammarModal}
    <LessonShell
            title="Imperatives & Requests"
            subtitle="Grammar • Pelajaran 13"
            accentColor="#8E44AD"
            nextLesson={'/modul/english/beginner/grammar/lesson-14'}
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
                  <Hand size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Instruksi & Perintah</h2>
                  <p className="text-teal-100 text-sm leading-relaxed">
                    Kita menggunakan <b>Imperatives</b> untuk menyuruh orang melakukan sesuatu. Dari perintah langsung ("Stop!") hingga permintaan sopan ("Could you help?").
                  </p>
                </div>
              </motion.section>

              {/* Usage Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {IMPERATIVE_USES.map((use, idx) => (
                  <div key={idx} className={`bg-white p-3 rounded-xl border shadow-[var(--shadow-card)] ${use.color.replace('bg-', 'border-').split(' ')[2]}`}>
                    <div className="text-2xl mb-1">{use.icon}</div>
                    <h4 className={`text-xs font-bold uppercase mb-1 ${use.color.split(' ')[1]}`}>{use.title}</h4>
                    <p className="text-xs text-[var(--color-text-secondary)] italic">"{use.ex}"</p>
                  </div>
                ))}
              </div>

              {/* Rules Cards */}
              <div className="space-y-4 mb-6">
                {GRAMMAR_RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${rule.color.replace('bg-', 'border-').split(' ')[2]} relative overflow-hidden`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-lg font-bold ${rule.color.split(' ')[1]}`}>{rule.label}</span>
                      <span className="text-[10px] uppercase font-bold bg-white/50 px-2 py-1 rounded text-[var(--color-text-muted)]">{rule.note}</span>
                    </div>
                    <p className="text-sm font-mono text-[var(--color-text-primary)] bg-white/50 p-2 rounded mb-2 inline-block border border-[var(--color-border)]/50">{rule.formula}</p>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">"{rule.example}"</p>
                  </div>
                ))}
              </div>

              {/* Politeness Scale */}
              <div className="bg-[var(--color-background)] rounded-2xl p-5 border border-[var(--color-border)]">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <TrendingUp size={20} />
                  Tingkat Kesopanan
                </h3>
                <div className="space-y-3">
                  {POLITENESS_SCALE.map((lvl, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-red-400' : idx === 1 ? 'bg-blue-400' : 'bg-green-500'}`}></div>
                      <div className="flex-1 bg-white p-3 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-card)] flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--color-text-primary)]">"{lvl.text}"</span>
                        <span className={`text-[10px] font-bold uppercase ${lvl.color}`}>{lvl.lvl}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tip */}
              <div className="mt-6 bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <Lightbulb size={24} />
                  <div>
                    <h4 className="font-bold text-yellow-900 text-sm">Jadilah Sopan!</h4>
                    <p className="text-xs text-yellow-800 mt-1 leading-relaxed">
                      Penutur bahasa Inggris sering mengucapkan <b>"Please"</b>! Jika hanya menggunakan perintah langsung, kamu mungkin terdengar kasar.
                    </p>
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

                <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-6">Lengkapi Perintah</h3>

                <div className="text-xl font-medium text-[var(--color-text-primary)] mb-8 leading-relaxed">
                  {PRACTICE_ITEMS[practiceIndex].text.split('___').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="inline-block border-b-2 border-[var(--color-primary)] min-w-[80px] text-center mx-1 text-[var(--color-primary)] font-bold">
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
                      className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-sky-400 hover:bg-gray-50 font-bold text-[var(--color-text-secondary)] transition-all active:scale-95 text-lg"
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

export default GrammarLesson13;
