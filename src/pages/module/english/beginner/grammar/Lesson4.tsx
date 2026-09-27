import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle2, XCircle, BookOpen, PenTool, Star } from 'lucide-react';
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



const NOUN_RULES = [
  {
    title: "Jamak Beraturan (+s)",
    rule: "Tambahkan 's' ke sebagian besar kata.",
    examples: ["1 Cat ➡️ 2 Cats", "1 Book ➡️ 2 Books", "1 Dog ➡️ 2 Dogs"],
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    title: "Berakhiran -s, -x, -ch, -sh (+es)",
    rule: "Tambahkan 'es' jika kata mendesis.",
    examples: ["1 Bus ➡️ 2 Buses", "1 Box ➡️ 2 Boxes", "1 Watch ➡️ 2 Watches"],
    color: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    title: "Tak Beraturan (Berubah)",
    rule: "Kata berubah sepenuhnya.",
    examples: ["Man ➡️ Men", "Woman ➡️ Women", "Child ➡️ Children", "Person ➡️ People"],
    color: "bg-orange-50 text-orange-700 border-orange-200"
  }
];

const ARTICLE_RULES = [
  {
    title: "A / An",
    subtitle: "Satu (Umum)",
    rule: "Gunakan 'A' untuk konsonan. Gunakan 'An' untuk bunyi vokal (a, e, i, o, u).",
    examples: ["A car", "An apple", "An hour (H Diam)", "A university (Bunyi 'You')"],
    color: "bg-green-50 text-green-700 border-sky-200"
  },
  {
    title: "The",
    subtitle: "Spesifik",
    rule: "Gunakan ketika kita tahu persis yang mana, atau hanya ada satu.",
    examples: ["The sun", "The book on the table", "The President"],
    color: "bg-gray-50 text-[var(--color-primary)] border-[var(--color-border)]"
  }
];

const PRACTICE_ITEMS = [
  { id: 1, text: "One cat, two ___.", correct: "cats", type: "Plural", hint: "Kata benda beraturan (+s)" },
  { id: 2, text: "I have ___ orange.", correct: "an", type: "Article", hint: "Dimulai dengan O (Bunyi vokal)" },
  { id: 3, text: "Look at ___ moon.", correct: "the", type: "Article", hint: "Hanya ada satu bulan" },
  { id: 4, text: "There are three ___ (bus).", correct: "buses", type: "Plural", hint: "Berakhiran 's' (+es)" },
  { id: 5, text: "He is ___ doctor.", correct: "a", type: "Article", hint: "Dimulai dengan D (Konsonan)" },
  { id: 6, text: "Two ___ (man) are talking.", correct: "men", type: "Plural", hint: "Jamak tak beraturan" },
  { id: 7, text: "She has ___ idea.", correct: "an", type: "Article", hint: "Dimulai dengan I (Vokal)" },
  { id: 8, text: "The ___ (child) are playing.", correct: "children", type: "Plural", hint: "Jamak tak beraturan" },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Apa bentuk jamak dari 'Watch'?",
    options: ['Watchs', 'Watches', 'Watchies'],
    answer: 'Watches',
    explanation: "Kata yang berakhiran -ch ditambahkan -es."
  },
  {
    id: 2,
    question: "I have ___ umbrella.",
    options: ['a', 'an', 'the'],
    answer: 'an',
    explanation: "'Umbrella' dimulai dengan bunyi vokal, jadi gunakan 'an'."
  },
  {
    id: 3,
    question: "___ sun is hot today.",
    options: ['A', 'An', 'The'],
    answer: 'The',
    explanation: "Hanya ada satu matahari, jadi spesifik: gunakan 'The'."
  },
  {
    id: 4,
    question: "Bentuk jamak dari 'Baby'?",
    options: ['Babys', 'Babies', 'Babyes'],
    answer: 'Babies',
    explanation: "Konsonan + y: y berubah menjadi i dan tambahkan -es."
  },
  {
    id: 5,
    question: "I saw ___ dog. ___ dog was cute.",
    options: ['a / The', 'the / A', 'a / A'],
    answer: 'a / The',
    explanation: "Pertama kali sebut gunakan 'a', kedua kali (spesifik) gunakan 'The'."
  },
  {
    id: 6,
    question: "Bentuk jamak dari 'Lady'?",
    options: ['Ladys', 'Ladies', 'Ladyes'],
    answer: 'Ladies',
    explanation: "Akhiran 'y' setelah konsonan berubah menjadi 'ies'."
  },
  {
    id: 7,
    question: "She eats ___ apple.",
    options: ['a', 'an', 'the'],
    answer: 'an',
    explanation: "'Apple' diawali bunyi vokal, gunakan 'an'."
  },
  {
    id: 8,
    question: "Bentuk jamak dari 'Box'?",
    options: ['Boxs', 'Boxes', 'Boxies'],
    answer: 'Boxes',
    explanation: "Kata berakhiran 'x' ditambahkan '-es'."
  },
  {
    id: 9,
    question: "I want to buy ___ car.",
    options: ['a', 'an', 'the'],
    answer: 'a',
    explanation: "'Car' (mobil) umum dan diawali konsonan, gunakan 'a'."
  },
  {
    id: 10,
    question: "___ moon looks beautiful tonight.",
    options: ['A', 'An', 'The'],
    answer: 'The',
    explanation: "Benda unik (satu-satunya) di alam semesta menggunakan 'The'."
  },
  {
    id: 11,
    question: "Bentuk jamak dari 'Man' (Tidak beraturan)?",
    options: ['Mans', 'Men', 'Manes'],
    answer: 'Men',
    explanation: "Plural tidak beraturan: Man -> Men."
  },
  {
    id: 12,
    question: "We saw ___ elephant.",
    options: ['a', 'an', 'the'],
    answer: 'an',
    explanation: "'Elephant' diawali vokal 'e', gunakan 'an'."
  },
  {
    id: 13,
    question: "Bentuk jamak dari 'Bus'?",
    options: ['Buss', 'Buses', 'Busies'],
    answer: 'Buses',
    explanation: "Akhiran 's' ditambahkan '-es'."
  },
  {
    id: 14,
    question: "He is ___ honest man.",
    options: ['a', 'an', 'the'],
    answer: 'an',
    explanation: "'Honest' diawali bunyi vokal (h tidak dibaca), jadi pakai 'an'."
  },
  {
    id: 15,
    question: "Bentuk jamak dari 'Child'?",
    options: ['Childs', 'Children', 'Childrens'],
    answer: 'Children',
    explanation: "Plural tidak beraturan: Child -> Children."
  },
  {
    id: 16,
    question: "There is ___ cat in the garden.",
    options: ['a', 'an', 'the'],
    answer: 'a',
    explanation: "'Cat' diawali konsonan, gunakan 'a'."
  },
  {
    id: 17,
    question: "Bentuk jamak dari 'Boy'?",
    options: ['Bois', 'Boys', 'Boyes'],
    answer: 'Boys',
    explanation: "Vokal + y hanya ditambah 's'."
  },
  {
    id: 18,
    question: "___ sky is blue.",
    options: ['A', 'An', 'The'],
    answer: 'The',
    explanation: "Hanya ada satu langit (unik), gunakan 'The'."
  },
  {
    id: 19,
    question: "Bentuk jamak dari 'Leaf'?",
    options: ['Leafs', 'Leaves', 'Leaves'],
    answer: 'Leaves',
    explanation: "Akhiran 'f'/'fe' sering berubah menjadi 'ves'."
  },
  {
    id: 20,
    question: "She is ___ teacher.",
    options: ['a', 'an', 'the'],
    answer: 'a',
    explanation: "Job/Profesi biasa menggunakan 'a/an'. Teacher dimulai konsonan, jadi 'a'."
  }
];

const GrammarLesson4: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/grammar/lesson-5';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(4));
  const [showGrammarModal, setShowGrammarModal] = React.useState(false);
  const handleSelesai = () => { markGrammarComplete(4); setIsCompleted(true); setShowGrammarModal(true); };
  
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
    if (option.toLowerCase() === current.correct.toLowerCase()) {
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
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Grammar Lesson 4</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowGrammarModal(false); navigate('/modul/english/beginner/grammar/lesson-5'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADbb)' }}>Next ›</button>
          <button onClick={() => { setShowGrammarModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    {grammarModal}
    <LessonShell
            title="Kata Benda & Artikel"
            subtitle="Grammar • Pelajaran 4"
            accentColor="#8E44AD"
            nextLesson={'/modul/english/beginner/grammar/lesson-5'}
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
<motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <BookOpen size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Satu vs Banyak</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    <b>Singular</b> (Tunggal) berarti satu (1 cat).<br />
                    <b>Plural</b> (Jamak) berarti dua atau lebih (2 cats).
                  </p>
                </div>
              </motion.section>

              <div className="space-y-4">
                {NOUN_RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${rule.color.replace('bg-', 'border-').split(' ')[2]} relative overflow-hidden`}>
                    <div className="mb-3">
                      <h3 className={`text-lg font-bold ${rule.color.split(' ')[1]}`}>{rule.title}</h3>
                      <p className="text-xs text-[var(--color-text-muted)]">{rule.rule}</p>
                    </div>
                    <div className="space-y-2">
                      {rule.examples.map((ex, i) => (
                        <div key={i} className="bg-white/60 p-2 rounded-lg text-sm font-medium text-[var(--color-text-primary)] border border-[var(--color-border)]">
                          {ex}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

<motion.section custom={1} variants={sectionVariants} initial="hidden" animate="visible" className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Star size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">A, An, The</h2>
                  <p className="text-teal-100 text-sm leading-relaxed">
                    Kata sandang (Articles) memperkenalkan kata benda. Mereka memberitahu kita apakah sesuatu itu spesifik atau umum.
                  </p>
                </div>
              </motion.section>

              <div className="space-y-4">
                {ARTICLE_RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${rule.color.replace('bg-', 'border-').split(' ')[2]} relative overflow-hidden`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-3xl font-black ${rule.color.split(' ')[1]}`}>{rule.title}</span>
                      <span className="text-xs font-bold bg-white/50 px-2 py-1 rounded uppercase tracking-wider text-[var(--color-text-secondary)]">{rule.subtitle}</span>
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)] mb-4">{rule.rule}</p>
                    <div className="flex flex-wrap gap-2">
                      {rule.examples.map((ex, i) => (
                        <span key={i} className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tip */}
              <div className="mt-6 bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <Lightbulb size={24} />
                  <div>
                    <h4 className="font-bold text-yellow-900 text-sm">Bunyi itu Penting!</h4>
                    <p className="text-xs text-yellow-800 mt-1 leading-relaxed">
                      Ini tergantung pada <b>bunyi</b>, bukan hanya ejaan!<br />
                      • An <b>h</b>our (H Diam → Bunyi O → An)<br />
                      • A <b>u</b>niversity (U berbunyi seperti 'You' (Y) → Konsonan → A)
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
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-indigo-100/50 border border-indigo-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                  <div
                    className="h-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${((practiceIndex + 1) / PRACTICE_ITEMS.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-2">Isi Bagian Kosong</h3>
                <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-[var(--color-text-muted)] text-xs font-bold mb-6">
                  Target: {PRACTICE_ITEMS[practiceIndex].type === 'Article' ? 'Artikel' : 'Jamak'}
                </span>

                <div className="text-xl font-medium text-[var(--color-text-primary)] mb-8 leading-relaxed">
                  {PRACTICE_ITEMS[practiceIndex].text.split('___').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="inline-block border-b-2 border-indigo-500 min-w-[80px] text-center mx-1 text-indigo-600 font-bold">
                          {practiceResult === 'correct' ? PRACTICE_ITEMS[practiceIndex].correct : "___"}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <p className="text-xs text-[var(--color-text-muted)] mb-8 h-4">{practiceResult !== 'correct' ? "" : PRACTICE_ITEMS[practiceIndex].hint}</p>

                <div className="grid grid-cols-2 gap-3">
                  {/* Generate options dynamically or use fixed ones if simpler */}
                  {PRACTICE_ITEMS[practiceIndex].type === "Article"
                    ? ['a', 'an', 'the'].map((opt, idx) => (
                      <button key={idx} onClick={() => checkPractice(opt)} className="py-3 rounded-xl border-2 border-[var(--color-border)] hover:border-indigo-400 font-bold text-[var(--color-text-secondary)]">{opt}</button>
                    ))
                    : (
                      [PRACTICE_ITEMS[practiceIndex].correct,
                      PRACTICE_ITEMS[practiceIndex].correct.endsWith('s') ? PRACTICE_ITEMS[practiceIndex].correct.slice(0, -1) : PRACTICE_ITEMS[practiceIndex].correct + 's'
                      ].sort().map((opt, idx) => (
                        <button key={idx} onClick={() => checkPractice(opt)} className="py-3 rounded-xl border-2 border-[var(--color-border)] hover:border-indigo-400 font-bold text-[var(--color-text-secondary)]">{opt}</button>
                      ))
                    )
                  }
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

export default GrammarLesson4;
