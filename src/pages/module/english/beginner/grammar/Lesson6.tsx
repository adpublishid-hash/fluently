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



const USAGE_SCENARIOS = [
  {
    title: "Kebiasaan & Rutinitas",
    icon: "🏃‍♂️",
    desc: "Hal yang kita sering lakukan.",
    example: "I run every morning."
  },
  {
    title: "Fakta Umum",
    icon: "🌍",
    desc: "Hal yang selalu benar.",
    example: "The sun rises in the east."
  },
  {
    title: "Perasaan & Pikiran",
    icon: "❤️",
    desc: "Keadaan pikiran.",
    example: "She loves chocolate."
  }
];

const STRUCTURE_RULES = [
  {
    title: "Positif (+)",
    desc: "He/She/It butuh 'S'.",
    examples: ["I work.", "He works.", "She eats."],
    color: "bg-emerald-50 text-emerald-700 border-blue-200"
  },
  {
    title: "Negatif (-)",
    desc: "Gunakan Don't atau Doesn't. Kata kerja kembali ke bentuk dasar.",
    examples: ["I don't work.", "He doesn't work.", "It doesn't eat."],
    color: "bg-red-50 text-red-700 border-red-200"
  },
  {
    title: "Pertanyaan (?)",
    desc: "Gunakan Do atau Does. Kata kerja kembali ke bentuk dasar.",
    examples: ["Do you work?", "Does he work?", "Does it eat?"],
    color: "bg-blue-50 text-blue-700 border-blue-200"
  }
];

const SPELLING_RULES = [
  { rule: "Sebagian Besar Kata Kerja", suffix: "Tambah -s", ex: "Walk ➡ Walks" },
  { rule: "Berakhiran -ch, -sh, -s, -x, -o", suffix: "Tambah -es", ex: "Watch ➡ Watches, Go ➡ Goes" },
  { rule: "Konsonan + y", suffix: "Ubah y ➡ ies", ex: "Study ➡ Studies" },
  { rule: "Vokal (a,e,i,o,u) + y", suffix: "Tambah -s", ex: "Play ➡ Plays" }
];

const PRACTICE_ITEMS = [
  { id: 1, text: "She ___ to the park.", correct: "goes", options: ["go", "goes"], hint: "Berakhiran 'o' -> tambah 'es'" },
  { id: 2, text: "We ___ like spiders.", correct: "don't", options: ["doesn't", "don't"], hint: "Kita gunakan 'don't'" },
  { id: 3, text: "He ___ English.", correct: "studies", options: ["studys", "studies"], hint: "Konsonan + y -> ies" },
  { id: 4, text: "___ Tom play tennis?", correct: "Does", options: ["Do", "Does"], hint: "Tom = He" },
  { id: 5, text: "I ___ every day.", correct: "run", options: ["run", "runs"], hint: "I menggunakan kata kerja dasar" },
  { id: 6, text: "My dog ___ cats.", correct: "chases", options: ["chase", "chases"], hint: "Dog = It" },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Kalimat mana yang benar?",
    options: ['He watchs TV.', 'He watches TV.', 'He watchies TV.'],
    answer: 'He watches TV.',
    explanation: "Kata kerja berakhiran -ch ditambahkan -es (Watch -> Watches)."
  },
  {
    id: 2,
    question: "We ___ to school every day.",
    options: ['go', 'goes', 'going'],
    answer: 'go',
    explanation: "Subjek 'We' tidak menambahkan -s/-es pada kata kerja."
  },
  {
    id: 3,
    question: "She ___ English very well.",
    options: ['speak', 'speaks', 'speaking'],
    answer: 'speaks',
    explanation: "Orang ketiga tunggal (She) menambahkan 's' pada kata kerja."
  },
  {
    id: 4,
    question: "___ you live here?",
    options: ['Does', 'Do', 'Are'],
    answer: 'Do',
    explanation: "Pertanyaan untuk 'You' menggunakan 'Do'."
  },
  {
    id: 5,
    question: "The baby ___ a lot.",
    options: ['cry', 'crys', 'cries'],
    answer: 'cries',
    explanation: "Konsonan + y (Cry) berubah menjadi -ies (Cries)."
  },
  {
    id: 6,
    question: "John ___ football on Sundays.",
    options: ['play', 'plays', 'plaies'],
    answer: 'plays',
    explanation: "Vokal + y (Play) hanya ditambah 's' (Plays)."
  },
  {
    id: 7,
    question: "They ___ not like coffee.",
    options: ['does', 'do', 'are'],
    answer: 'do',
    explanation: "Bentuk negatif untuk 'They' adalah 'do not' (don't)."
  },
  {
    id: 8,
    question: "My father ___ in a bank.",
    options: ['work', 'works', 'working'],
    answer: 'works',
    explanation: "My father = He (Tunggal), jadi tambah 's' (works)."
  },
  {
    id: 9,
    question: "___ she have a car?",
    options: ['Do', 'Does', 'Is'],
    answer: 'Does',
    explanation: "Pertanyaan untuk 'She' menggunakan 'Does'."
  },
  {
    id: 10,
    question: "I ___ breakfast at 7 AM.",
    options: ['eats', 'eat', 'eating'],
    answer: 'eat',
    explanation: "Subjek 'I' menggunakan bentuk dasar (eat)."
  },
  {
    id: 11,
    question: "The sun ___ in the east.",
    options: ['rise', 'rises', 'rising'],
    answer: 'rises',
    explanation: "Fakta umum dengan subjek tunggal (The sun) pakai 's'."
  },
  {
    id: 12,
    question: "Where ___ you work?",
    options: ['do', 'does', 'are'],
    answer: 'do',
    explanation: "Pertanyaan dengan 'You' menggunakan 'do'."
  },
  {
    id: 13,
    question: "He ___ his homework every night.",
    options: ['do', 'does', 'dos'],
    answer: 'does',
    explanation: "Kata kerja 'do' untuk orang ketiga tunggal menjadi 'does'."
  },
  {
    id: 14,
    question: "It ___ a lot here in December.",
    options: ['rain', 'rains', 'raining'],
    answer: 'rains',
    explanation: "Cuaca/Alam dengan subjek 'It' pakai 's'."
  },
  {
    id: 15,
    question: "We ___ want to go.",
    options: ['doesn\'t', 'don\'t', 'not'],
    answer: 'don\'t',
    explanation: "Negatif untuk 'We' adalah 'don't'."
  },
  {
    id: 16,
    question: "The train ___ at 9 PM.",
    options: ['leave', 'leaves', 'leaving'],
    answer: 'leaves',
    explanation: "Jadwal (The train = It) menggunakan 's'."
  },
  {
    id: 17,
    question: "___ John and Mary live here?",
    options: ['Does', 'Do', 'Are'],
    answer: 'Do',
    explanation: "John and Mary = They (Jamak), pakai 'Do'."
  },
  {
    id: 18,
    question: "My sister ___ French.",
    options: ['study', 'studies', 'studys'],
    answer: 'studies',
    explanation: "Konsonan + y (Study) berubah jadi 'ies'."
  },
  {
    id: 19,
    question: "You ___ look happy.",
    options: ['doesn\'t', 'don\'t', 'no'],
    answer: 'don\'t',
    explanation: "Negatif untuk 'You' adalah 'don't'."
  },
  {
    id: 20,
    question: "Water ___ at 100 degrees.",
    options: ['boil', 'boils', 'boiling'],
    answer: 'boils',
    explanation: "Fakta ilmiah (Water = It) pakai 's'."
  }
];

const GrammarLesson6: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/grammar/lesson-7';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(6));
  const [showGrammarModal, setShowGrammarModal] = React.useState(false);
  const handleSelesai = () => { markGrammarComplete(6); setIsCompleted(true); setShowGrammarModal(true); };
  
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
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Grammar Lesson 6</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowGrammarModal(false); navigate('/modul/english/beginner/grammar/lesson-7'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADbb)' }}>Next ›</button>
          <button onClick={() => { setShowGrammarModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    {grammarModal}
    <LessonShell
            title="Simple Present Tense"
            subtitle="Grammar • Pelajaran 6"
            accentColor="#8E44AD"
            nextLesson={'/modul/english/beginner/grammar/lesson-7'}
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
                  <Flame size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Kehidupan Sehari-hari</h2>
                  <p className="text-amber-100 text-sm leading-relaxed">
                    Kita menggunakan <b>Simple Present Tense</b> untuk berbicara tentang kebiasaan, fakta, dan hal-hal yang umumnya benar.
                  </p>
                </div>
              </motion.section>

              {/* Usage Cards */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {USAGE_SCENARIOS.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-3 border border-[var(--color-border)] shadow-[var(--shadow-card)] text-center">
                    <span className="text-2xl mb-1 block">{item.icon}</span>
                    <h4 className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wide mb-1">{item.title}</h4>
                    <p className="text-[10px] text-[var(--color-text-muted)] mb-2">{item.desc}</p>
                    <div className="bg-[var(--color-background)] p-1.5 rounded text-[10px] font-medium text-[var(--color-text-primary)] italic">
                      "{item.example}"
                    </div>
                  </div>
                ))}
              </div>

              {/* Structure Rules */}
              <h3 className="font-bold text-[var(--color-text-primary)] px-1 mb-3">Struktur Kalimat</h3>
              <div className="space-y-3 mb-8">
                {STRUCTURE_RULES.map((rule, idx) => (
                  <div key={idx} className={`rounded-2xl border p-4 ${rule.color.replace('text-', 'border-').split(' ')[2]} bg-white shadow-[var(--shadow-card)]`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-lg font-bold ${rule.color.split(' ')[1]}`}>{rule.title}</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Rule</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">{rule.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {rule.examples.map((ex, i) => (
                        <span key={i} className="bg-[var(--color-background)] px-2 py-1 rounded text-xs font-medium border border-[var(--color-border)] text-[var(--color-text-muted)]">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Spelling Rules Table */}
              <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-[var(--shadow-card)] mb-6">
                <div className="bg-[var(--color-background)] p-4 border-b border-[var(--color-border)] flex justify-between items-center">
                  <h3 className="font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                    <BookOpen size={20} />
                    Aturan Ejaan He/She/It
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm min-w-[300px]">
                    <thead>
                      <tr className="bg-[var(--color-background)]/50 text-xs font-bold text-[var(--color-text-muted)] uppercase">
                        <th className="p-3">Verb Ending</th>
                        <th className="p-3">Rule</th>
                        <th className="p-3">Example</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-[var(--color-text-secondary)]">
                      {SPELLING_RULES.map((row, idx) => (
                        <tr key={idx} className="hover:bg-amber-50 transition-colors">
                          <td className="p-3 font-medium">{row.rule}</td>
                          <td className="p-3 font-bold text-amber-600">{row.suffix}</td>
                          <td className="p-3">{row.ex}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tip */}
              <div className="mt-6 bg-indigo-50 rounded-2xl p-5 border border-indigo-200">
                <div className="flex items-start gap-3">
                  <Lightbulb size={24} />
                  <div>
                    <h4 className="font-bold text-indigo-900 text-sm">Ingat!</h4>
                    <p className="text-xs text-indigo-800 mt-1 leading-relaxed">
                      Ketika kamu menggunakan <b>Does</b> atau <b>Doesn't</b>, kata kerja utama kembali ke normal (tanpa 's').
                      <br />
                      Benar: She doesn't <b>eat</b>.
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

                <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-6">Pilih Kata yang Benar</h3>

                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center animate-pulse-subtle">
                    <TrendingUp size={32} />
                  </div>
                </div>

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

export default GrammarLesson6;
