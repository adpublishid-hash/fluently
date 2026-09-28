import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle2, XCircle, BookOpen, PenTool, History, Star, TrendingUp } from 'lucide-react';
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



const PAST_RULES = [
  {
    title: "Kata Kerja Beraturan (+ed)",
    rule: "Tambahkan '-ed' di akhir.",
    examples: ["Walk ➡️ Walked", "Play ➡️ Played", "Watch ➡️ Watched"],
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "🚶"
  },
  {
    title: "Kata Kerja Tidak Beraturan",
    rule: "Kata berubah sepenuhnya.",
    examples: ["Go ➡️ Went", "Eat ➡️ Ate", "Have ➡️ Had", "Buy ➡️ Bought"],
    color: "bg-red-50 text-red-700 border-red-200",
    icon: "🔄"
  },
  {
    title: "To Be (Was / Were)",
    rule: "Bentuk lampau dari Am/Is/Are.",
    examples: ["I/He/She was happy.", "You/We/They were happy."],
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: "👑"
  }
];

const DID_RULES = [
  {
    type: "Negatif (-)",
    formula: "Subject + Didn't + Base Verb",
    example: "I didn't go. (NOT didn't went)",
    icon: "❌"
  },
  {
    type: "Pertanyaan (?)",
    formula: "Did + Subject + Base Verb?",
    example: "Did you go? (NOT Did you went?)",
    icon: "❓"
  }
];

const PRACTICE_ITEMS = [
  { id: 1, text: "I ___ to the park yesterday.", correct: "went", options: ["go", "went"], hint: "Bentuk lampau tak beraturan 'Go'" },
  { id: 2, text: "She ___ pizza last night.", correct: "ate", options: ["eat", "ate"], hint: "Bentuk lampau tak beraturan 'Eat'" },
  { id: 3, text: "They ___ watch the movie.", correct: "didn't", options: ["don't", "didn't"], hint: "Masa Lalu Negatif" },
  { id: 4, text: "___ you play football?", correct: "Did", options: ["Do", "Did"], hint: "Pertanyaan Masa Lalu" },
  { id: 5, text: "He ___ happy to see us.", correct: "was", options: ["were", "was"], hint: "He (Tunggal) = Was" },
  { id: 6, text: "We ___ not at home.", correct: "were", options: ["was", "were"], hint: "We (Jamak) = Were" },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Pilih kalimat yang benar:",
    options: ['I didn\'t went to school.', 'I didn\'t go to school.', 'I not go to school.'],
    answer: 'I didn\'t go to school.',
    explanation: "Setelah 'didn't', kata kerja kembali ke bentuk DASAR (Go)."
  },
  {
    id: 2,
    question: "Apa bentuk lampau dari 'Buy'?",
    options: ['Buyed', 'Bought', 'Brought'],
    answer: 'Bought',
    explanation: "'Buy' itu tidak beraturan. Bentuk lampaunya adalah 'Bought'."
  },
  {
    id: 3,
    question: "___ they at the party last night?",
    options: ['Was', 'Did', 'Were'],
    answer: 'Were',
    explanation: "Untuk pertanyaan 'To Be' (They), kita gunakan 'Were'. (Did untuk kata kerja aksi)."
  },
  {
    id: 4,
    question: "She ___ English yesterday.",
    options: ['studyed', 'studied', 'study'],
    answer: 'studied',
    explanation: "Aturan Konsonan + y: Ubah 'y' menjadi 'i' dan tambah 'ed' (Studied)."
  },
  {
    id: 5,
    question: "Did you ___ the game?",
    options: ['win', 'won', 'winning'],
    answer: 'win',
    explanation: "Setelah 'Did', gunakan kata kerja DASAR (Win)."
  },
  {
    id: 6,
    question: "He ___ football last Sunday.",
    options: ['play', 'played', 'plaied'],
    answer: 'played',
    explanation: "Regular verb: play + ed = played."
  },
  {
    id: 7,
    question: "I ___ happy yesterday.",
    options: ['was', 'were', 'am'],
    answer: 'was',
    explanation: "Past Tense to be 'I' adalah 'was'."
  },
  {
    id: 8,
    question: "We ___ to the cinema.",
    options: ['go', 'goed', 'went'],
    answer: 'went',
    explanation: "Past Tense 'go' adalah 'went' (Irregular)."
  },
  {
    id: 9,
    question: "They ___ not watch TV.",
    options: ['did', 'do', 'were'],
    answer: 'did',
    explanation: "Negatif lampau menggunakan 'did not' (didn't)."
  },
  {
    id: 10,
    question: "Where ___ you last night?",
    options: ['was', 'were', 'did'],
    answer: 'were',
    explanation: "Pertanyaan to be 'You' = 'Were'."
  },
  {
    id: 11,
    question: "He ___ a new car.",
    options: ['buy', 'bought', 'buyed'],
    answer: 'bought',
    explanation: "Past Tense 'buy' = 'bought'."
  },
  {
    id: 12,
    question: "She ___ pizza.",
    options: ['ate', 'eat', 'eated'],
    answer: 'ate',
    explanation: "Past Tense 'eat' = 'ate'."
  },
  {
    id: 13,
    question: "___ he work yesterday?",
    options: ['Did', 'Was', 'Do'],
    answer: 'Did',
    explanation: "Pertanyaan aksi lampau menggunakan 'Did'."
  },
  {
    id: 14,
    question: "I ___ sleep well.",
    options: ['didn\'t', 'don\'t', 'wasn\'t'],
    answer: 'didn\'t',
    explanation: "Negatif aksi lampau: I didn't sleep."
  },
  {
    id: 15,
    question: "The movie ___ good.",
    options: ['was', 'were', 'did'],
    answer: 'was',
    explanation: "The movie (It) + was."
  },
  {
    id: 16,
    question: "We ___ our homework.",
    options: ['do', 'did', 'done'],
    answer: 'did',
    explanation: "Mengerjakan (Do) di masa lalu = 'did'."
  },
  {
    id: 17,
    question: "She ___ angry.",
    options: ['was', 'were', 'did'],
    answer: 'was',
    explanation: "She + was."
  },
  {
    id: 18,
    question: "They ___ late.",
    options: ['was', 'were', 'did'],
    answer: 'were',
    explanation: "They + were."
  },
  {
    id: 19,
    question: "What ___ you do?",
    options: ['did', 'were', 'was'],
    answer: 'did',
    explanation: "What did you do? (Apa yang kamu lakukan?)."
  },
  {
    id: 20,
    question: "It ___ yesterday.",
    options: ['rain', 'rained', 'raining'],
    answer: 'rained',
    explanation: "Regular verb: rain + ed = rained."
  }
];

const GrammarLesson12: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/grammar/lesson-13';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(12));
  const [showGrammarModal, setShowGrammarModal] = React.useState(false);
  const handleSelesai = () => { markGrammarComplete(12); setIsCompleted(true); setShowGrammarModal(true); };
  
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
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Grammar Lesson 12</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowGrammarModal(false); navigate('/modul/english/beginner/grammar/lesson-13'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADbb)' }}>Next ›</button>
          <button onClick={() => { setShowGrammarModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    {grammarModal}
    <LessonShell
            title="Simple Past"
            subtitle="Grammar • Pelajaran 12"
            accentColor="#8E44AD"
            nextLesson={'/modul/english/beginner/grammar/lesson-13'}
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
                  <History size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Berbicara Tentang Kemarin</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Gunakan <b>Simple Past</b> untuk tindakan yang dimulai dan selesai di masa lalu.
                    <br />
                    Kata waktu: <i>Yesterday, Last week, 2 days ago, In 2010</i>.
                  </p>
                </div>
              </motion.section>

              {/* Rules Cards */}
              <div className="space-y-4">
                {PAST_RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${rule.color.replace('bg-', 'border-').split(' ')[2]} relative overflow-hidden`}>
                    <div className="flex justify-between items-start relative z-10 mb-2">
                      <div>
                        <span className={`text-lg font-bold ${rule.color.split(' ')[1]}`}>{rule.title}</span>
                      </div>
                      <span className="text-2xl">{rule.icon}</span>
                    </div>

                    <p className="text-sm text-[var(--color-text-secondary)] mb-3 font-medium">{rule.rule}</p>

                    <div className="space-y-2">
                      {rule.examples.map((ex, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm font-medium bg-white/60 p-2 rounded">
                          <span className={`w-1.5 h-1.5 rounded-full ${rule.color.split(' ')[1].replace('text', 'bg')}`}></span>
                          <span className="text-[var(--color-text-primary)]">{ex}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* The "Did" Rule */}
              <div className="mt-6 bg-[var(--color-background)] rounded-2xl p-6 border border-[var(--color-border)]">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp size={24} />
                  <h3 className="font-bold text-[var(--color-text-primary)]">Aturan "Did" (Negatif & Pertanyaan)</h3>
                </div>
                <div className="grid gap-3">
                  {DID_RULES.map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-[var(--color-text-primary)] text-sm">{item.type}</span>
                        <span className="text-xl">{item.icon}</span>
                      </div>
                      <div className="text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-background)] p-2 rounded mb-2">{item.formula}</div>
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">{item.example}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tip */}
              <div className="mt-6 bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <Lightbulb size={24} />
                  <div>
                    <h4 className="font-bold text-yellow-900 text-sm">Penting!</h4>
                    <p className="text-xs text-yellow-800 mt-1 leading-relaxed">
                      Ketika menggunakan <b>Did</b> atau <b>Didn't</b>, kata kerja utama kembali ke <b>BENTUK DASAR</b>.
                      <br />
                      ❌ I didn't <span className="line-through">went</span>.
                      <br />
                      ✅ I didn't <b>go</b>.
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

                <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-6">Lengkapi Kalimat</h3>

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

export default GrammarLesson12;
