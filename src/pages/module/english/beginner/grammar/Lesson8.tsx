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



const HELPER_CHART = [
  {
    group: "I / You / We / They",
    helper: "DO",
    negative: "DON'T (do not)",
    icon: "👥",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    group: "He / She / It",
    helper: "DOES",
    negative: "DOESN'T (does not)",
    icon: "👤",
    color: "bg-purple-50 text-purple-700 border-purple-200"
  }
];

const STRUCTURE_RULES = [
  {
    title: "Negatif (-)",
    formula: "Subject + Don't/Doesn't + Base Verb",
    examples: [
      { text: "I don't like coffee.", icon: "☕" },
      { text: "She doesn't play tennis.", icon: "🎾" }
    ],
    color: "bg-red-50 text-red-700 border-red-200"
  },
  {
    title: "Pertanyaan (?)",
    formula: "Do/Does + Subject + Base Verb?",
    examples: [
      { text: "Do you speak English?", icon: "🗣️" },
      { text: "Does he live here?", icon: "🏠" }
    ],
    color: "bg-amber-50 text-amber-700 border-amber-200"
  }
];

const SHORT_ANSWERS = [
  { q: "Do you like it?", y: "Yes, I do.", n: "No, I don't." },
  { q: "Does she work?", y: "Yes, she does.", n: "No, she doesn't." }
];

const PRACTICE_ITEMS = [
  { id: 1, text: "She ___ like pizza.", correct: "doesn't", options: ["don't", "doesn't"], hint: "She pasangannya Doesn't" },
  { id: 2, text: "___ you live here?", correct: "Do", options: ["Do", "Does"], hint: "You pasangannya Do" },
  { id: 3, text: "He ___ play football.", correct: "doesn't", options: ["don't", "doesn't"], hint: "He pasangannya Doesn't" },
  { id: 4, text: "___ she speak English?", correct: "Does", options: ["Do", "Does"], hint: "She pasangannya Does" },
  { id: 5, text: "They ___ know the answer.", correct: "don't", options: ["don't", "doesn't"], hint: "They pasangannya Don't" },
  { id: 6, text: "___ it rain often?", correct: "Does", options: ["Do", "Does"], hint: "It pasangannya Does" },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Pilih kalimat negatif yang benar:",
    options: ['He no likes coffee.', 'He doesn\'t likes coffee.', 'He doesn\'t like coffee.'],
    answer: 'He doesn\'t like coffee.',
    explanation: "Setelah 'doesn't', kata kerja utama kehilangan 's' (Bentuk Dasar)."
  },
  {
    id: 2,
    question: "___ your brother work here?",
    options: ['Do', 'Does', 'Is'],
    answer: 'Does',
    explanation: "'Your brother' adalah tunggal (He), jadi kita gunakan 'Does'."
  },
  {
    id: 3,
    question: "We ___ watch TV in the morning.",
    options: ['doesn\'t', 'not', 'don\'t'],
    answer: 'don\'t',
    explanation: "Untuk 'We', kita gunakan 'don't' (do not)."
  },
  {
    id: 4,
    question: "Does she ___ music?",
    options: ['love', 'loves', 'loving'],
    answer: 'love',
    explanation: "Dalam pertanyaan dengan 'Does', kata kerja harus dalam bentuk dasar (love, bukan loves)."
  },
  {
    id: 5,
    question: "Jawaban: 'Do they eat meat?'",
    options: ['Yes, they does.', 'No, they don\'t.', 'No, they doesn\'t.'],
    answer: 'No, they don\'t.',
    explanation: "Cocokkan kata kerja bantu: Pertanyaan 'Do' -> Jawaban 'Don't'."
  },
  {
    id: 6,
    question: "___ you speak English?",
    options: ['Do', 'Does', 'Are'],
    answer: 'Do',
    explanation: "Pertanyaan untuk 'You' menggunakan 'Do'."
  },
  {
    id: 7,
    question: "He ___ have a car.",
    options: ['don\'t', 'doesn\'t', 'no'],
    answer: 'doesn\'t',
    explanation: "He (tunggal) menggunakan 'doesn't'."
  },
  {
    id: 8,
    question: "Where ___ they live?",
    options: ['do', 'does', 'are'],
    answer: 'do',
    explanation: "They (jamak) menggunakan 'do'."
  },
  {
    id: 9,
    question: "She doesn't ___ tennis.",
    options: ['play', 'plays', 'playing'],
    answer: 'play',
    explanation: "Setelah 'doesn't', gunakan kata kerja dasar (tanpa -s)."
  },
  {
    id: 10,
    question: "Does it ___ often?",
    options: ['rain', 'rains', 'raining'],
    answer: 'rain',
    explanation: "Pertanyaan 'Does' -> kata kerja 'rain' (tanpa s)."
  },
  {
    id: 11,
    question: "I ___ know the answer.",
    options: ['doesn\'t', 'don\'t', 'not'],
    answer: 'don\'t',
    explanation: "I menggunakan 'don't'."
  },
  {
    id: 12,
    question: "Yes, I ___.",
    options: ['do', 'does', 'am'],
    answer: 'do',
    explanation: "Jawaban singkat: 'Yes, I do'."
  },
  {
    id: 13,
    question: "___ John play guitar?",
    options: ['Do', 'Does', 'Is'],
    answer: 'Does',
    explanation: "John = He -> Does."
  },
  {
    id: 14,
    question: "No, she ___.",
    options: ['don\'t', 'doesn\'t', 'not'],
    answer: 'doesn\'t',
    explanation: "Jawaban singkat negatif she: 'No, she doesn't'."
  },
  {
    id: 15,
    question: "Why ___ you cry?",
    options: ['do', 'does', 'is'],
    answer: 'do',
    explanation: "You -> Do."
  },
  {
    id: 16,
    question: "The cat ___ like water.",
    options: ['don\'t', 'doesn\'t', 'no'],
    answer: 'doesn\'t',
    explanation: "The cat = It -> Doesn't."
  },
  {
    id: 17,
    question: "Do we ___ enough money?",
    options: ['have', 'has', 'haves'],
    answer: 'have',
    explanation: "Setelah 'Do', gunakan bentuk dasar 'have'."
  },
  {
    id: 18,
    question: "They ___ want to go.",
    options: ['doesn\'t', 'don\'t', 'aren\'t'],
    answer: 'don\'t',
    explanation: "They -> Don't."
  },
  {
    id: 19,
    question: "When ___ the bus leave?",
    options: ['do', 'does', 'is'],
    answer: 'does',
    explanation: "The bus = It -> Does."
  },
  {
    id: 20,
    question: "Does he ___ French?",
    options: ['speak', 'speaks', 'speaking'],
    answer: 'speak',
    explanation: "Pertanyaan 'Does' menghapus 's' dari kata kerja."
  }
];

const GrammarLesson8: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/grammar/lesson-9';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(8));
  const [showGrammarModal, setShowGrammarModal] = React.useState(false);
  const handleSelesai = () => { markGrammarComplete(8); setIsCompleted(true); setShowGrammarModal(true); };
  
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
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Grammar Lesson 8</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowGrammarModal(false); navigate('/modul/english/beginner/grammar/lesson-9'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADbb)' }}>Next ›</button>
          <button onClick={() => { setShowGrammarModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    {grammarModal}
    <LessonShell
            title="Negatif & Pertanyaan"
            subtitle="Grammar • Pelajaran 8"
            accentColor="#8E44AD"
            nextLesson={'/modul/english/beginner/grammar/lesson-9'}
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
                  <Flame size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Do vs Does</h2>
                  <p className="text-teal-100 text-sm leading-relaxed">
                    Untuk membuat kalimat negatif ("Tidak") atau bertanya, kita memerlukan kata kerja bantu: <b>Do</b> dan <b>Does</b>.
                  </p>
                </div>
              </motion.section>

              {/* Helper Chart */}
              <div className="grid gap-3 mb-6">
                {HELPER_CHART.map((item, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-4 shadow-[var(--shadow-card)] ${item.color.replace('bg-', 'border-').split(' ')[2]}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <span className={`text-lg font-black ${item.color.split(' ')[1]}`}>{item.helper}</span>
                    </div>
                    <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wide mb-2">{item.group}</p>
                    <div className="bg-white/60 p-2 rounded text-sm text-center font-medium">
                      Negative: <span className="font-bold">{item.negative}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sentence Structures */}
              <div className="space-y-4 mb-6">
                <h3 className="font-bold text-[var(--color-text-primary)] px-1">Rumus Kalimat</h3>
                {STRUCTURE_RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${rule.color.replace('bg-', 'border-').split(' ')[2]} relative`}>
                    <h4 className={`text-lg font-bold mb-2 ${rule.color.split(' ')[1]}`}>{rule.title}</h4>
                    <div className="bg-[var(--color-background)] p-2 rounded-lg border border-[var(--color-border)] text-xs font-mono text-center text-[var(--color-text-secondary)] mb-3">
                      {rule.formula}
                    </div>
                    <div className="space-y-2">
                      {rule.examples.map((ex, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <span className="text-xl">{ex.icon}</span>
                          <span className="text-[var(--color-text-primary)] font-medium">{ex.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Short Answers */}
              <div className="bg-[var(--color-background)] rounded-2xl p-5 border border-[var(--color-border)] mb-6">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                  <TrendingUp size={20} />
                  Jawaban Singkat
                </h3>
                <div className="space-y-3">
                  {SHORT_ANSWERS.map((sa, i) => (
                    <div key={i} className="bg-white p-3 rounded-xl border border-[var(--color-border)]">
                      <p className="text-xs text-[var(--color-text-muted)] font-bold mb-1 uppercase">Question: {sa.q}</p>
                      <div className="flex gap-4 text-sm">
                        <span className="text-green-600 font-bold">✓ {sa.y}</span>
                        <span className="text-red-500 font-bold">✗ {sa.n}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Tip */}
              <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <Lightbulb size={24} />
                  <div>
                    <h4 className="font-bold text-yellow-900 text-sm">Aturan "Tanpa S"</h4>
                    <p className="text-xs text-yellow-800 mt-1 leading-relaxed">
                      Ketika kamu menggunakan <b>Does</b> atau <b>Doesn't</b>, kata kerja utama <b>kehilangan 's'</b> (Bentuk Dasar).
                      <br /><br />
                      ❌ She doesn't <span className="line-through">likes</span> pizza.
                      <br />
                      ✅ She doesn't <b>like</b> pizza.
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

                <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-6">Lengkapi Kalimat</h3>

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

export default GrammarLesson8;
