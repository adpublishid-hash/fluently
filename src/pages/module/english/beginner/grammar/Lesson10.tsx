import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, BookOpen, PenTool, Mic, Star, Trophy } from 'lucide-react';
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



const USAGE_SCENARIOS = [
  {
    title: "Kemampuan",
    desc: "Keahlian yang kamu miliki.",
    examples: ["I can swim.", "She can play guitar."],
    icon: "💪",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    title: "Izin",
    desc: "Meminta untuk melakukan sesuatu.",
    examples: ["Can I sit here?", "You can go now."],
    icon: "🔓",
    color: "bg-green-50 text-green-700 border-sky-200"
  },
  {
    title: "Kemungkinan",
    desc: "Hal-hal yang mungkin terjadi.",
    examples: ["It can be cold at night.", "Smoking can cause cancer."],
    icon: "🎲",
    color: "bg-purple-50 text-purple-700 border-purple-200"
  }
];

const SENTENCE_STRUCTURE = [
  {
    type: "Positif (+)",
    formula: "Subject + Can + Base Verb",
    example: "He can run fast.",
    note: "Tanpa 's' untuk He/She/It!",
    color: "bg-emerald-50 text-emerald-700 border-blue-200"
  },
  {
    type: "Negatif (-)",
    formula: "Subject + Can't + Base Verb",
    example: "They can't sing.",
    note: "Cannot = Can't",
    color: "bg-red-50 text-red-700 border-red-200"
  },
  {
    type: "Pertanyaan (?)",
    formula: "Can + Subject + Base Verb?",
    example: "Can you help me?",
    note: "Tukar Subjek dan Can.",
    color: "bg-amber-50 text-amber-700 border-amber-200"
  }
];

const PRACTICE_ITEMS = [
  { id: 1, text: "She ___ (swim) very well.", correct: "can swim", options: ["can swims", "can swim"] },
  { id: 2, text: "He ___ (not / drive).", correct: "can't drive", options: ["can't drive", "can't drives"] },
  { id: 3, text: "___ (you / cook)?", correct: "Can you cook", options: ["Can you cook", "Do you can cook"] },
  { id: 4, text: "We ___ (see) the stars.", correct: "can see", options: ["can seeing", "can see"] },
  { id: 5, text: "Can I ___ (have) water?", correct: "have", options: ["have", "to have"] },
  { id: 6, text: "It ___ (not / be) true.", correct: "can't be", options: ["can't be", "can not is"] },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Pilih kalimat yang benar:",
    options: ['He can speaks English.', 'He can speak English.', 'He cans speak English.'],
    answer: 'He can speak English.',
    explanation: "Jangan pernah menambahkan 's' pada 'Can' atau kata kerja utama setelahnya."
  },
  {
    id: 2,
    question: "She ___ swim very fast.",
    options: ['cannot', 'no can', 'doesn\'t can'],
    answer: 'cannot',
    explanation: "Bentuk negatif dari 'Can' adalah 'Cannot' (atau Can't)."
  },
  {
    id: 3,
    question: "___ you help me?",
    options: ['Are', 'Can', 'Do'],
    answer: 'Can',
    explanation: "Gunakan 'Can' untuk meminta bantuan (kemampuan/kesediaan)."
  },
  {
    id: 4,
    question: "They can ___ the piano.",
    options: ['playing', 'plays', 'play'],
    answer: 'play',
    explanation: "Setelah 'Can', gunakan kata kerja bentuk dasar."
  },
  {
    id: 5,
    question: "Can he ___ a car?",
    options: ['driving', 'drives', 'drive'],
    answer: 'drive',
    explanation: "Pertanyaan dengan 'Can' juga menggunakan kata kerja dasar."
  },
  {
    id: 6,
    question: "I ___ come to the party tonight.",
    options: ['don\'t can', 'can\'t', 'no can'],
    answer: 'can\'t',
    explanation: "'Can't' adalah singkatan dari 'Cannot'."
  },
  {
    id: 7,
    question: "___ I use your phone?",
    options: ['Do', 'Can', 'Have'],
    answer: 'Can',
    explanation: "Can digunakan untuk meminta izin."
  },
  {
    id: 8,
    question: "Birds ___ fly.",
    options: ['cans', 'canning', 'can'],
    answer: 'can',
    explanation: "Subjek jamak atau tunggal tetap menggunakan 'can'."
  },
  {
    id: 9,
    question: "It ___ be true.",
    options: ['can', 'cans', 'does'],
    answer: 'can',
    explanation: "Menyatakan kemungkinan: It can be true."
  },
  {
    id: 10,
    question: "We can ___ pizza tonight.",
    options: ['eating', 'eat', 'eats'],
    answer: 'eat',
    explanation: "Setelah modal verb 'can', gunakan Verb 1 (dasar)."
  },
  {
    id: 11,
    question: "He can ___ Spanish.",
    options: ['speaks', 'speaking', 'speak'],
    answer: 'speak',
    explanation: "Jangan tambahkan 's' pada kata kerja setelah 'can'."
  },
  {
    id: 12,
    question: "___ she cook?",
    options: ['Can', 'Cans', 'Does can'],
    answer: 'Can',
    explanation: "Pindahkan 'Can' ke depan untuk bertanya."
  },
  {
    id: 13,
    question: "You ___ park here. (Dilarang)",
    options: ['not', 'can\'t', 'can'],
    answer: 'can\'t',
    explanation: "Menyatakan larangan/ketidakmampuan: Can't."
  },
  {
    id: 14,
    question: "Can I ___ a glass of water?",
    options: ['having', 'has', 'have'],
    answer: 'have',
    explanation: "Selalu gunakan bentuk dasar 'have'."
  },
  {
    id: 15,
    question: "They ___ see anything.",
    options: ['can no', 'cannot', 'no can'],
    answer: 'cannot',
    explanation: "Bentuk negatif formal yang benar adalah 'cannot'."
  },
  {
    id: 16,
    question: "Can you ___ me?",
    options: ['hearing', 'hears', 'hear'],
    answer: 'hear',
    explanation: "Kata kerja dasar 'hear'."
  },
  {
    id: 17,
    question: "She ___ run fast.",
    options: ['cans', 'do can', 'can'],
    answer: 'can',
    explanation: "She + can (tanpa s)."
  },
  {
    id: 18,
    question: "I ___ believe it!",
    options: ['not can', 'can\'t', 'no can'],
    answer: 'can\'t',
    explanation: "Ungkapan umum: 'I can't believe it'."
  },
  {
    id: 19,
    question: "___ we go now?",
    options: ['Do', 'Can', 'Are'],
    answer: 'Can',
    explanation: "Meminta izin/mengajak: Can we...?"
  },
  {
    id: 20,
    question: "Fish ___ swim.",
    options: ['can', 'can to', 'cans'],
    answer: 'can',
    explanation: "Kita tidak menggunakan 'to' setelah 'can'. Fish can swim."
  }
];

const GrammarLesson10: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/grammar/lesson-11';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(10));
  const [showGrammarModal, setShowGrammarModal] = React.useState(false);
  const handleSelesai = () => { markGrammarComplete(10); setIsCompleted(true); setShowGrammarModal(true); };
  
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
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Grammar Lesson 10</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowGrammarModal(false); navigate('/modul/english/beginner/grammar/lesson-11'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADbb)' }}>Next ›</button>
          <button onClick={() => { setShowGrammarModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    {grammarModal}
    <LessonShell
            title="Can / Cannot"
            subtitle="Grammar • Pelajaran 10"
            accentColor="#8E44AD"
            nextLesson={'/modul/english/beginner/grammar/lesson-11'}
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
              <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Trophy size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Modal Verb "Can"</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    "Can" itu spesial. Tidak pernah berubah! Tanpa 's', tanpa 'ing', tanpa 'to'. Ini membantu kita berbicara tentang kemampuan, izin, dan kemungkinan.
                  </p>
                </div>
              </motion.section>

              {/* Usage Cards */}
              <div className="grid gap-4 mb-6">
                {USAGE_SCENARIOS.map((item, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-4 shadow-[var(--shadow-card)] ${item.color.replace('bg-', 'border-').split(' ')[2]} flex items-center gap-4`}>
                    <div className="text-2xl bg-white p-2 rounded-xl shadow-[var(--shadow-card)]">{item.icon}</div>
                    <div>
                      <h3 className={`text-lg font-bold ${item.color.split(' ')[1]}`}>{item.title}</h3>
                      <p className="text-xs text-[var(--color-text-muted)] mb-1">{item.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.examples.map((ex, i) => (
                          <span key={i} className="text-[10px] font-bold bg-white/50 px-2 py-1 rounded border border-black/5 text-[var(--color-text-primary)]">"{ex}"</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sentence Structures */}
              <h3 className="font-bold text-[var(--color-text-primary)] px-1 mb-3">Rumus Kalimat</h3>
              <div className="space-y-4 mb-6">
                {SENTENCE_STRUCTURE.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${rule.color.replace('bg-', 'border-').split(' ')[2]}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`font-black text-sm uppercase px-2 py-1 rounded ${rule.color.split(' ')[0]} ${rule.color.split(' ')[1]}`}>{rule.type}</span>
                      <span className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">{rule.note}</span>
                    </div>
                    <p className="text-sm font-mono text-[var(--color-text-primary)] font-bold mb-2 text-center bg-[var(--color-background)] p-2 rounded border border-[var(--color-border)]">{rule.formula}</p>
                    <p className="text-xs text-[var(--color-text-muted)] text-center italic">"{rule.example}"</p>
                  </div>
                ))}
              </div>

              {/* Pronunciation Tip */}
              <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <Mic size={24} />
                  <div>
                    <h4 className="font-bold text-yellow-900 text-sm">Tips Pengucapan</h4>
                    <p className="text-xs text-yellow-800 mt-1 leading-relaxed">
                      • <b>Can</b> biasanya lemah /kən/: "I can swim." <br />
                      • <b>Can't</b> biasanya kuat /kænt/: "I can't swim." <br />
                      Perbedaan ini membantu orang mengerti apakah kamu bilang ya atau tidak!
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
                        <span className="inline-block border-b-2 border-indigo-500 min-w-[100px] text-center mx-1 text-indigo-600 font-bold">
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

export default GrammarLesson10;
