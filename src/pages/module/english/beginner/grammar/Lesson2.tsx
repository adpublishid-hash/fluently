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



const BE_FORMS = [
  {
    title: "Positif (+)",
    desc: "Menyatakan fakta.",
    examples: [
      { sub: "I", verb: "am", rest: "happy." },
      { sub: "He / She / It", verb: "is", rest: "happy." },
      { sub: "You / We / They", verb: "are", rest: "happy." }
    ],
    color: "bg-emerald-50 text-emerald-700 border-blue-200",
    icon: "👍"
  },
  {
    title: "Negatif (-)",
    desc: "Menambahkan 'not'.",
    examples: [
      { sub: "I", verb: "am not", rest: "sad." },
      { sub: "He / She / It", verb: "is not", rest: "sad." },
      { sub: "You / We / They", verb: "are not", rest: "sad." }
    ],
    color: "bg-red-50 text-red-700 border-red-200",
    icon: "🙅"
  },
  {
    title: "Pertanyaan (?)",
    desc: "Tukar Subjek & Kata Kerja.",
    examples: [
      { sub: "Am", verb: "I", rest: "late?" },
      { sub: "Is", verb: "he / she", rest: "late?" },
      { sub: "Are", verb: "you / they", rest: "late?" }
    ],
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "❓"
  }
];

const CONTRACTIONS = [
  { long: "I am", short: "I'm" },
  { long: "You are", short: "You're" },
  { long: "He is", short: "He's" },
  { long: "She is", short: "She's" },
  { long: "It is", short: "It's" },
  { long: "We are", short: "We're" },
  { long: "They are", short: "They're" },
  { long: "is not", short: "isn't" },
  { long: "are not", short: "aren't" },
];

const PRACTICE_SENTENCES = [
  { id: 1, text: "I ___ a student.", correct: "am", options: ["is", "am", "are"] },
  { id: 2, text: "They ___ my friends.", correct: "are", options: ["am", "is", "are"] },
  { id: 3, text: "___ she your sister?", correct: "Is", options: ["Am", "Is", "Are"] },
  { id: 4, text: "We ___ hungry (Negative).", correct: "aren't", options: ["isn't", "aren't", "not"] },
  { id: 5, text: "The dog ___ small.", correct: "is", options: ["am", "is", "are"] },
  { id: 6, text: "___ you happy?", correct: "Are", options: ["Is", "Am", "Are"] },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Kalimat mana yang benar?",
    options: ['He are tall.', 'He am tall.', 'He is tall.'],
    answer: 'He is tall.',
    explanation: "'He' itu tunggal, jadi kita gunakan 'is'."
  },
  {
    id: 2,
    question: "Pilih kontraksi yang benar untuk 'I am':",
    options: ['I\'re', 'I\'m', 'Im'],
    answer: 'I\'m',
    explanation: "'I am' disingkat menjadi 'I'm'."
  },
  {
    id: 3,
    question: "We ___ happy today.",
    options: ['is', 'am', 'are'],
    answer: 'are',
    explanation: "'We' (Kami) itu jamak, jadi gunakan 'are'."
  },
  {
    id: 4,
    question: "Bentuk negatif dari 'She is':",
    options: ['She not is', 'She is not', 'She no is'],
    answer: 'She is not',
    explanation: "Tambahkan 'not' setelah to be."
  },
  {
    id: 5,
    question: "Is ___ your brother?",
    options: ['he', 'we', 'they'],
    answer: 'he',
    explanation: "'Is' digunakan dengan subjek tunggal (he/she/it)."
  },
  {
    id: 6,
    question: "They ___ my friends.",
    options: ['am', 'is', 'are'],
    answer: 'are',
    explanation: "'They' (Mereka) adalah jamak, pasangannya 'are'."
  },
  {
    id: 7,
    question: "I ___ a student.",
    options: ['are', 'is', 'am'],
    answer: 'am',
    explanation: "'I' selalu berpasangan dengan 'am'."
  },
  {
    id: 8,
    question: "It ___ a cat.",
    options: ['is', 'am', 'are'],
    answer: 'is',
    explanation: "'It' (benda/hewan tunggal) menggunakan 'is'."
  },
  {
    id: 9,
    question: "Kalimat tanya yang benar:",
    options: ['Are you tired?', 'You fit tired?', 'Am you tired?'],
    answer: 'Are you tired?',
    explanation: "Untuk pertanyaan dengan 'You', gunakan 'Are' di depan."
  },
  {
    id: 10,
    question: "Apa singkatan dari 'They are'?",
    options: ['They\'re', 'They\'s', 'There'],
    answer: 'They\'re',
    explanation: "Bentuk pendek (contraction) dari 'They are' adalah 'They're'."
  },
  {
    id: 11,
    question: "John and Sarah ___ at home.",
    options: ['is', 'am', 'are'],
    answer: 'are',
    explanation: "John dan Sarah = They (Mereka/Jamak), jadi gunakan 'are'."
  },
  {
    id: 12,
    question: "___ I late?",
    options: ['Am', 'Is', 'Are'],
    answer: 'Am',
    explanation: "Pasangan 'I' adalah 'Am'."
  },
  {
    id: 13,
    question: "You ___ not alone.",
    options: ['is', 'am', 'are'],
    answer: 'are',
    explanation: "'You' selalu menggunakan 'are', baik untuk satu orang atau banyak."
  },
  {
    id: 14,
    question: "My dog ___ cute.",
    options: ['are', 'am', 'is'],
    answer: 'is',
    explanation: "'My dog' = It (Tunggal), jadi gunakan 'is'."
  },
  {
    id: 15,
    question: "Bentuk negatif: 'It is a book.'",
    options: ['It is no a book.', 'It isn\'t a book.', 'It not a book.'],
    answer: 'It isn\'t a book.',
    explanation: "'Isn't' adalah singkatan dari 'is not'."
  },
  {
    id: 16,
    question: "Indra ___ smart.",
    options: ['is', 'am', 'are'],
    answer: 'is',
    explanation: "Indra = He (Tunggal), gunakan 'is'."
  },
  {
    id: 17,
    question: "___ they from Indonesia?",
    options: ['Is', 'Am', 'Are'],
    answer: 'Are',
    explanation: "Untuk 'They', kata tanyanya dimulai dengan 'Are'."
  },
  {
    id: 18,
    question: "Kontraksi 'She is not':",
    options: ['She\'sn\'t', 'She isn\'t', 'She nots'],
    answer: 'She isn\'t',
    explanation: "'She is not' bisa disingkat menjadi 'She isn't' atau 'She's not'."
  },
  {
    id: 19,
    question: "Cats ___ animals.",
    options: ['am', 'is', 'are'],
    answer: 'are',
    explanation: "'Cats' (jamak/banyak kucing) menggunakan 'are'."
  },
  {
    id: 20,
    question: "The sky ___ blue.",
    options: ['is', 'are', 'am'],
    answer: 'is',
    explanation: "'The sky' = It (Tunggal), pakai 'is'."
  }
];

const GrammarLesson2: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/grammar/lesson-3';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(2));
  const [showGrammarModal, setShowGrammarModal] = React.useState(false);
  const handleSelesai = () => { markGrammarComplete(2); setIsCompleted(true); setShowGrammarModal(true); };

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

    const current = PRACTICE_SENTENCES[practiceIndex];
    if (option === current.correct) {
      setPracticeResult('correct');
      playSound("Correct!");
    } else {
      setPracticeResult('incorrect');
      playSound("Try again.");
    }

    setTimeout(() => {
      setPracticeResult(null);
      if (practiceIndex < PRACTICE_SENTENCES.length - 1) {
        setPracticeIndex(prev => prev + 1);
      } else {
        alert("Latihan Selesai! Coba Kuisnya.");
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
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Grammar Lesson 2</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowGrammarModal(false); navigate(nextLessonPath); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADbb)' }}>Next ›</button>
          <button onClick={() => { setShowGrammarModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    {grammarModal}
        <LessonShell
            title="To Be (am / is / are)"
            subtitle="Grammar • Pelajaran 2"
            accentColor="#8E44AD"
            nextLesson={nextLessonPath}
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
              <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Star size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Raja Kata Kerja 👑</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    "To Be" adalah kata kerja paling penting dalam bahasa Inggris. Ia menghubungkan subjek dengan deskripsi atau perasaan.
                  </p>
                </div>
              </motion.section>

              {/* Rules Cards */}
              <div className="space-y-4">
                {BE_FORMS.map((form, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${form.color.replace('bg-', 'border-').split(' ')[2]} relative overflow-hidden`}>
                    <div className="flex justify-between items-start relative z-10 mb-4">
                      <div>
                        <span className={`text-xl font-bold ${form.color.split(' ')[1]}`}>{form.title}</span>
                        <p className="text-xs text-[var(--color-text-muted)] mt-1">{form.desc}</p>
                      </div>
                      <span className="text-2xl">{form.icon}</span>
                    </div>

                    <div className="space-y-2">
                      {form.examples.map((ex, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white/60 p-2 rounded-lg text-sm">
                          <span className="text-[var(--color-text-muted)] w-24 text-right border-r border-[var(--color-border)] pr-2">{ex.sub}</span>
                          <span className="font-bold text-[var(--color-text-primary)]">{ex.verb}</span>
                          <span className="text-[var(--color-text-muted)]">{ex.rest}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Contractions Table */}
              <div className="mt-6 bg-[var(--color-background)] rounded-2xl p-6 border border-[var(--color-border)]">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp size={24} />
                  <h3 className="font-bold text-[var(--color-text-primary)]">Bentuk Pendek (Singkatan)</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {CONTRACTIONS.map((c, i) => (
                    <div key={i} className="flex justify-between bg-white p-3 rounded-xl border border-[var(--color-border)] text-sm">
                      <span className="text-[var(--color-text-muted)]">{c.long}</span>
                      <span className="font-bold text-indigo-600">{c.short}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tip */}
              <div className="mt-6 bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <Lightbulb size={24} />
                  <div>
                    <h4 className="font-bold text-yellow-900 text-sm">Catatan</h4>
                    <p className="text-xs text-yellow-800 mt-1 leading-relaxed">
                      Tidak ada bentuk pendek standar untuk "am not". <br />
                      Kita biasanya mengatakan "I'm not".
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
                    style={{ width: `${((practiceIndex + 1) / PRACTICE_SENTENCES.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-6">Lengkapi Kalimat</h3>

                <div className="text-xl font-medium text-[var(--color-text-primary)] mb-8 leading-relaxed">
                  {PRACTICE_SENTENCES[practiceIndex].text.split('___').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="inline-block border-b-2 border-indigo-500 min-w-[80px] text-center mx-1 text-indigo-600 font-bold">
                          {practiceResult === 'correct' ? PRACTICE_SENTENCES[practiceIndex].correct : "?"}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {PRACTICE_SENTENCES[practiceIndex].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => checkPractice(opt)}
                      className="py-3 rounded-xl border-2 border-[var(--color-border)] hover:border-indigo-400 hover:bg-indigo-50 font-bold text-[var(--color-text-secondary)] transition-all active:scale-95 text-lg"
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

export default GrammarLesson2;
