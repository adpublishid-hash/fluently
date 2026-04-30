import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, PlayCircle, Lightbulb, Sparkles, Info, CheckCircle2, XCircle, MessageSquare, BookOpen, PenTool, Mic, ChevronLeft, MoreHorizontal, BarChart3, Flame, Hand, History, Home, Star, TrendingUp, Trophy, User } from 'lucide-react';
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



const VERB_DETAILS = [
  {
    word: "LIKE",
    meaning: "Menikmati atau menyukai sesuatu.",
    icon: "❤️",
    color: "bg-pink-50 text-pink-700 border-pink-200",
    forms: [
      { subject: "I / You / We / They", form: "like" },
      { subject: "He / She / It", form: "likes" }
    ],
    negative: "don't like / doesn't like"
  },
  {
    word: "WANT",
    meaning: "Menginginkan atau membutuhkan sesuatu.",
    icon: "🎯",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    forms: [
      { subject: "I / You / We / They", form: "want" },
      { subject: "He / She / It", form: "wants" }
    ],
    negative: "don't want / doesn't want"
  },
  {
    word: "HAVE",
    meaning: "Memiliki atau mempunyai sesuatu.",
    icon: "🎒",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    forms: [
      { subject: "I / You / We / They", form: "have" },
      { subject: "He / She / It", form: "has (Tidak Beraturan!)" }
    ],
    negative: "don't have / doesn't have"
  }
];

const SENTENCE_PATTERNS = [
  { label: "Positif (+)", formula: "Subject + Verb(s)", ex: "She wants a car." },
  { label: "Negatif (-)", formula: "Subject + Don't/Doesn't + Base Verb", ex: "She doesn't want a car." },
  { label: "Pertanyaan (?)", formula: "Do/Does + Subject + Base Verb?", ex: "Does she want a car?" }
];

const PRACTICE_ITEMS = [
  { id: 1, text: "I ___ a big dog. (Kepemilikan)", correct: "have", options: ["have", "has"], hint: "I = have" },
  { id: 2, text: "She ___ ice cream. (Menyukai)", correct: "likes", options: ["like", "likes"], hint: "She = likes" },
  { id: 3, text: "They ___ to go home. (Keinginan)", correct: "want", options: ["want", "wants"], hint: "They = want" },
  { id: 4, text: "He ___ a new bike. (Kepemilikan)", correct: "has", options: ["have", "has"], hint: "He = has (Tidak Beraturan)" },
  { id: 5, text: "We ___ playing games. (Menyukai)", correct: "like", options: ["like", "likes"], hint: "We = like" },
  { id: 6, text: "My phone ___ a camera. (Kepemilikan)", correct: "has", options: ["have", "has"], hint: "It = has" },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Pilih kalimat yang benar:",
    options: ['He have a car.', 'He has a car.', 'He haves a car.'],
    answer: 'He has a car.',
    explanation: "'Have' itu tidak beraturan. Untuk He/She/It, berubah menjadi 'Has'. Kita tidak pernah mengatakan 'haves'."
  },
  {
    id: 2,
    question: "I ___ a sandwich right now. (Keinginan)",
    options: ['like', 'want', 'have'],
    answer: 'want',
    explanation: "Jika kamu menginginkan sesuatu yang spesifik saat ini, kamu 'want' (menginginkan) itu."
  },
  {
    id: 3,
    question: "She ___ reading books.",
    options: ['likes', 'like', 'want'],
    answer: 'likes',
    explanation: "Subjek 'She' membutuhkan akhiran 's'. 'Likes' cocok untuk aktivitas tersebut."
  },
  {
    id: 4,
    question: "Do you ___ a pen? (Bentuk Pertanyaan)",
    options: ['has', 'likes', 'have'],
    answer: 'have',
    explanation: "Setelah 'Do', kata kerja harus dalam Bentuk Dasar. 'Do you have...?'"
  },
  {
    id: 5,
    question: "He ___ pizza. (Negatif)",
    options: ["doesn't like", "don't like", "not like"],
    answer: "doesn't like",
    explanation: "He + Doesn't + Base Verb."
  },
  {
    id: 6,
    question: "They ___ a big house.",
    options: ['has', 'have', 'haves'],
    answer: 'have',
    explanation: "They (jamak) menggunakan 'have'."
  },
  {
    id: 7,
    question: "We ___ to go home.",
    options: ['want', 'wants', 'wanting'],
    answer: 'want',
    explanation: "We (jamak) menggunakan 'want'."
  },
  {
    id: 8,
    question: "My cat ___ fish.",
    options: ['like', 'likes', 'liking'],
    answer: 'likes',
    explanation: "My cat (tunggal) menggunakan 'likes'."
  },
  {
    id: 9,
    question: "She ___ a headache.",
    options: ['have', 'has', 'haved'],
    answer: 'has',
    explanation: "She + has."
  },
  {
    id: 10,
    question: "Does he ___ a bike?",
    options: ['have', 'has', 'haves'],
    answer: 'have',
    explanation: "Pertanyaan 'Does' diikuti kata kerja dasar 'have'."
  },
  {
    id: 11,
    question: "I don't ___ coffee.",
    options: ['like', 'likes', 'liking'],
    answer: 'like',
    explanation: "Setelah 'don't', gunakan kata kerja dasar 'like'."
  },
  {
    id: 12,
    question: "Review: He ___ a brother.",
    options: ['have', 'has', 'is'],
    answer: 'has',
    explanation: "Kepemilikan orang ketiga tunggal: has."
  },
  {
    id: 13,
    question: "Do they ___ ice cream?",
    options: ['want', 'wants', 'wanting'],
    answer: 'want',
    explanation: "Do they want...?"
  },
  {
    id: 14,
    question: "She doesn't ___ any money.",
    options: ['has', 'have', 'had'],
    answer: 'have',
    explanation: "Setelah 'doesn't', kembali ke 'have'."
  },
  {
    id: 15,
    question: "My father ___ new shoes.",
    options: ['want', 'wants', 'is want'],
    answer: 'wants',
    explanation: "My father (He) + wants."
  },
  {
    id: 16,
    question: "We ___ three children.",
    options: ['have', 'has', 'are'],
    answer: 'have',
    explanation: "We + have."
  },
  {
    id: 17,
    question: "Does she ___ chocolate?",
    options: ['like', 'likes', 'liked'],
    answer: 'like',
    explanation: "Pertanyaan: Does + S + like."
  },
  {
    id: 18,
    question: "The dog ___ a bone.",
    options: ['have', 'has', 'want'],
    answer: 'has',
    explanation: "The dog (It) + has."
  },
  {
    id: 19,
    question: "I ___ to become a doctor.",
    options: ['want', 'wants', 'like'],
    answer: 'want',
    explanation: "Cita-cita/keinginan: 'want'."
  },
  {
    id: 20,
    question: "He ___ swimming.",
    options: ['likes', 'wants', 'has'],
    answer: 'likes',
    explanation: "Menyukai hobi: 'likes'."
  }
];

const GrammarLesson11: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/grammar/lesson-12';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(11));
  const [showGrammarModal, setShowGrammarModal] = React.useState(false);
  const handleSelesai = () => { markGrammarComplete(11); setIsCompleted(true); setShowGrammarModal(true); };
  
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
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Grammar Lesson 11</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowGrammarModal(false); navigate('/modul/english/beginner/grammar/lesson-12'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADbb)' }}>Next ›</button>
          <button onClick={() => { setShowGrammarModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    {grammarModal}
    <LessonShell
            title="Like / Want / Have"
            subtitle="Grammar • Pelajaran 11"
            accentColor="#8E44AD"
            nextLesson={'/modul/english/beginner/grammar/lesson-12'}
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
              <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Star size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Kata Kerja Penting</h2>
                  <p className="text-amber-100 text-sm leading-relaxed">
                    Tiga kata kerja ini digunakan setiap hari. <b>Have</b> itu rumit karena berubah menjadi <b>Has</b> untuk He/She/It!
                  </p>
                </div>
              </motion.section>

              {/* Verb Details */}
              <div className="space-y-4">
                {VERB_DETAILS.map((v, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${v.color.replace('bg-', 'border-').split(' ')[2]} relative overflow-hidden`}>
                    <div className="flex justify-between items-start relative z-10 mb-2">
                      <div>
                        <span className={`text-2xl font-black ${v.color.split(' ')[1]}`}>{v.word}</span>
                        <div className="text-xs font-bold text-[var(--color-text-muted)] mt-1 uppercase tracking-wide">{v.meaning}</div>
                      </div>
                      <span className="text-3xl">{v.icon}</span>
                    </div>

                    <div className="space-y-2 mt-4 bg-white/50 p-3 rounded-xl border border-[var(--color-border)]/50">
                      {v.forms.map((f, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-[var(--color-text-muted)]">{f.subject}</span>
                          <span className="font-bold text-[var(--color-text-primary)]">{f.form}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 text-xs text-center text-[var(--color-text-muted)]">
                      Negative: <span className="font-mono font-bold">{v.negative}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sentence Patterns */}
              <div className="mt-6 bg-[var(--color-background)] rounded-2xl p-5 border border-[var(--color-border)]">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                  <BookOpen size={20} />
                  Aturan Tata Bahasa
                </h3>
                <div className="space-y-3">
                  {SENTENCE_PATTERNS.map((pat, i) => (
                    <div key={i} className="bg-white p-3 rounded-xl border border-[var(--color-border)]">
                      <div className="flex justify-between mb-1">
                        <span className="font-bold text-xs text-indigo-600 uppercase">{pat.label}</span>
                      </div>
                      <p className="text-xs font-mono text-[var(--color-text-muted)] mb-1">{pat.formula}</p>
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">"{pat.ex}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tip */}
              <div className="mt-6 bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <Lightbulb size={24} />
                  <div>
                    <h4 className="font-bold text-yellow-900 text-sm">Kata Kerja Keadaan (State Verbs)</h4>
                    <p className="text-xs text-yellow-800 mt-1 leading-relaxed">
                      Kita biasanya <b>tidak</b> menggunakan -ing dengan kata-kata ini.
                      <br />
                      ❌ I am liking pizza.
                      <br />
                      ✅ I <b>like</b> pizza.
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
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-amber-100/50 border border-amber-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                  <div
                    className="h-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${((practiceIndex + 1) / PRACTICE_ITEMS.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-6">Lengkapi Kalimat</h3>

                <div className="text-xl font-medium text-[var(--color-text-primary)] mb-8 leading-relaxed">
                  {PRACTICE_ITEMS[practiceIndex].text.split('___').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="inline-block border-b-2 border-amber-500 min-w-[80px] text-center mx-1 text-amber-600 font-bold">
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
                      className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-amber-400 hover:bg-amber-50 font-bold text-[var(--color-text-secondary)] transition-all active:scale-95 text-lg"
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
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-amber-50 text-amber-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
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

export default GrammarLesson11;
