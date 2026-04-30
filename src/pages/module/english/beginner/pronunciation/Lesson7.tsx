import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Mic, Star } from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';


/* ─── Pronunciation Completion Helpers ─── */
const PRONUN_STORAGE_KEY = 'talky_beginner_pronunciation_completed';
function getCompletedPronunLessons(): number[] {
  try { return JSON.parse(localStorage.getItem(PRONUN_STORAGE_KEY) || '[]'); } catch { return []; }
}
function markPronunComplete(lessonId: number) {
  const done = getCompletedPronunLessons();
  if (!done.includes(lessonId)) localStorage.setItem(PRONUN_STORAGE_KEY, JSON.stringify([...done, lessonId]));
}

type IntonationPattern = {
  id: string;
  name: string;
  symbol: string;
  description: string;
  condition: string;
  examples: { text: string; subtext: string }[];
  color: string;
  icon: string;
};

const INTONATION_RULES: IntonationPattern[] = [
  {
    id: 'falling',
    name: 'Intonasi Turun',
    symbol: '↘',
    description: "Suara TURUN di akhir. Terdengar percaya diri dan selesai.",
    condition: "Gunakan untuk: Pernyataan & Pertanyaan Wh- (Who, What, Where...)",
    examples: [
      { text: "My name is John.", subtext: "Pernyataan" },
      { text: "It is nice to meet you.", subtext: "Pernyataan" },
      { text: "Where are you from?", subtext: "Pertanyaan Wh-" },
      { text: "What time is it?", subtext: "Pertanyaan Wh-" }
    ],
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "📉"
  },
  {
    id: 'rising',
    name: 'Intonasi Naik',
    symbol: '↗',
    description: "Suara NAIK di akhir. Terdengar seperti Anda sedang memeriksa atau menunggu.",
    condition: "Gunakan untuk: Pertanyaan Ya/Tidak & Keterkejutan",
    examples: [
      { text: "Are you happy?", subtext: "Pertanyaan Ya/Tidak" },
      { text: "Do you like pizza?", subtext: "Pertanyaan Ya/Tidak" },
      { text: "Is she a doctor?", subtext: "Pertanyaan Ya/Tidak" },
      { text: "Really?", subtext: "Keterkejutan" }
    ],
    color: "bg-pink-50 text-pink-700 border-pink-200",
    icon: "📈"
  }
];

const PRACTICE_SENTENCES = [
  { text: "Where is the bank?", type: "falling", hint: "Pertanyaan Wh-" },
  { text: "Do you play football?", type: "rising", hint: "Pertanyaan Ya/Tidak" },
  { text: "I love ice cream.", type: "falling", hint: "Pernyataan" },
  { text: "Can you help me?", type: "rising", hint: "Pertanyaan Ya/Tidak" },
  { text: "Sit down, please.", type: "falling", hint: "Perintah/Pernyataan" },
  { text: "Is it raining?", type: "rising", hint: "Pertanyaan Ya/Tidak" },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Kalimat mana yang biasanya memiliki intonasi TURUN (↘)?",
    options: ['Are you busy?', 'I am busy.', 'Can you help?'],
    answer: 'I am busy.',
    explanation: "Pernyataan biasanya memiliki nada yang turun."
  },
  {
    id: 2,
    question: "Kalimat mana yang biasanya memiliki intonasi NAIK (↗)?",
    options: ['What is your name?', 'Do you like coffee?', 'I live in London.'],
    answer: 'Do you like coffee?',
    explanation: "Ini adalah pertanyaan Ya/Tidak, jadi suaranya naik."
  },
  {
    id: 3,
    question: "Bagaimana cara mengucapkan: 'Where do you live?'",
    options: ['Naik (↗)', 'Turun (↘)'],
    answer: 'Turun (↘)',
    explanation: "Pertanyaan Wh- (Where, What, Who) biasanya TURUN."
  },
  {
    id: 4,
    question: "Intonasi mengubah ___ dari kalimat.",
    options: ['Ejaan', 'Makna/Perasaan'],
    answer: 'Makna/Perasaan',
    explanation: "Nada membantu menunjukkan apakah Anda bertanya, memberi tahu, atau terkejut."
  },
  {
    id: 5,
    question: "Pertanyaan 'Is she a teacher?' memiliki intonasi...",
    options: ['Turun (↘)', 'Naik (↗)'],
    answer: 'Naik (↗)',
    explanation: "Pertanyaan Ya/Tidak (Is, Are, Do, Does) memiliki nada naik."
  },
  {
    id: 6,
    question: "Kalimat 'What time is it?' memiliki intonasi...",
    options: ['Turun (↘)', 'Naik (↗)'],
    answer: 'Turun (↘)',
    explanation: "Pertanyaan Wh- (What) biasanya turun di akhir."
  },
  {
    id: 7,
    question: "Manakah yang merupakan pertanyaan Ya/Tidak?",
    options: ['Where are you?', 'Can you swim?', 'Who is that?'],
    answer: 'Can you swim?',
    explanation: "Can you swim? bisa dijawab dengan Ya atau Tidak, jadi nadanya naik."
  },
  {
    id: 8,
    question: "Kalimat 'Sit down, please.' memiliki intonasi...",
    options: ['Turun (↘)', 'Naik (↗)'],
    answer: 'Turun (↘)',
    explanation: "Perintah biasanya memiliki nada turun."
  },
  {
    id: 9,
    question: "Kata 'Really?' dengan nada naik menunjukkan...",
    options: ['Pernyataan', 'Keterkejutan', 'Perintah'],
    answer: 'Keterkejutan',
    explanation: "Nada naik menunjukkan Anda terkejut atau tidak percaya."
  },
  {
    id: 10,
    question: "Pertanyaan 'How are you?' memiliki intonasi...",
    options: ['Turun (↘)', 'Naik (↗)'],
    answer: 'Turun (↘)',
    explanation: "How adalah pertanyaan Wh-, jadi nadanya turun."
  },
  {
    id: 11,
    question: "Kalimat 'I love pizza.' memiliki intonasi...",
    options: ['Turun (↘)', 'Naik (↗)'],
    answer: 'Turun (↘)',
    explanation: "Pernyataan biasanya turun untuk menunjukkan kepastian."
  },
  {
    id: 12,
    question: "Pertanyaan 'Are you ready?' memiliki intonasi...",
    options: ['Turun (↘)', 'Naik (↗)'],
    answer: 'Naik (↗)',
    explanation: "Pertanyaan Are (Ya/Tidak) memiliki nada naik."
  },
  {
    id: 13,
    question: "Manakah pertanyaan Wh-?",
    options: ['When did you arrive?', 'Did you arrive?', 'You arrived?'],
    answer: 'When did you arrive?',
    explanation: "When adalah Wh-word (pertanyaan informasi)."
  },
  {
    id: 14,
    question: "Kalimat 'Why are you late?' memiliki intonasi...",
    options: ['Turun (↘)', 'Naik (↗)'],
    answer: 'Turun (↘)',
    explanation: "Why adalah pertanyaan Wh-, nadanya turun."
  },
  {
    id: 15,
    question: "Pertanyaan 'Do you speak English?' memiliki intonasi...",
    options: ['Turun (↘)', 'Naik (↗)'],
    answer: 'Naik (↗)',
    explanation: "Do you... adalah pertanyaan Ya/Tidak, nadanya naik."
  },
  {
    id: 16,
    question: "Jika Anda berbicara datar (tanpa intonasi), Anda terdengar...",
    options: ['Ramah', 'Bosan/Robot', 'Excited'],
    answer: 'Bosan/Robot',
    explanation: "Intonasi membuat ucapan terdengar natural dan hidup!"
  },
  {
    id: 17,
    question: "Kalimat 'Who is your teacher?' memiliki intonasi...",
    options: ['Turun (↘)', 'Naik (↗)'],
    answer: 'Turun (↘)',
    explanation: "Who adalah pertanyaan Wh-, nadanya turun."
  },
  {
    id: 18,
    question: "Pertanyaan 'Have you finished?' memiliki intonasi...",
    options: ['Turun (↘)', 'Naik (↗)'],
    answer: 'Naik (↗)',
    explanation: "Have you... adalah pertanyaan Ya/Tidak, nadanya naik."
  },
  {
    id: 19,
    question: "Intonasi membantu menunjukkan...",
    options: ['Emosi dan maksud', 'Ejaan kata', 'Grammar'],
    answer: 'Emosi dan maksud',
    explanation: "Intonasi menunjukkan apakah Anda bertanya, memberi tahu, atau terkejut."
  },
  {
    id: 20,
    question: "Kenapa intonasi penting dalam bahasa Inggris?",
    options: ['Untuk menulis lebih baik', 'Untuk terdengar natural dan dipahami', 'Tidak penting'],
    answer: 'Untuk terdengar natural dan dipahami',
    explanation: "Intonasi yang benar membuat Anda terdengar seperti penutur asli!"
  }
];

const PronunLesson7: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/pronunciation/lesson-8';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedPronunLessons().includes(7));
  const [showPronunModal, setShowPronunModal] = React.useState(false);
  const handleSelesai = () => { markPronunComplete(7); setIsCompleted(true); setShowPronunModal(true); };

  const pronunModal = showPronunModal ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={() => setShowPronunModal(false)}
    >
      <div
        className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #E83E8C, #E83E8C99)' }}>
          <span style={{ fontSize: 36 }}>🏆</span>
        </div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Pelajaran Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">
          Kamu telah menyelesaikan <b>Pronunciation Lesson 7</b>. Terus semangat!
        </p>
        <div className="flex justify-center gap-2 mb-6">
          <span style={{ fontSize: 26 }}>⭐</span>
          <span style={{ fontSize: 26 }}>⭐</span>
          <span style={{ fontSize: 26 }}>⭐</span>
        </div>
        <div className="flex gap-3">
          {nextLessonPath && (
            <button
              onClick={() => { setShowPronunModal(false); navigate(nextLessonPath); }}
              className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #E83E8C, #E83E8Cbb)' }}
            >
              Next ›
            </button>
          )}
          <button
            onClick={() => { setShowPronunModal(false); navigate(-1); }}
            className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  ) : null;

  
  // Practice State
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceFeedback, setPracticeFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string) => { playAudio(text, 0.9); };

  // Practice Logic
  const handlePracticeCheck = (type: 'falling' | 'rising') => {
    if (practiceFeedback) return;
    const current = PRACTICE_SENTENCES[practiceIndex];

    if (type === current.type) {
      setPracticeFeedback('correct');
      playSound("Correct!");
    } else {
      setPracticeFeedback('incorrect');
      playSound("Try again.");
    }

    setTimeout(() => {
      setPracticeFeedback(null);
      if (practiceIndex < PRACTICE_SENTENCES.length - 1) {
        setPracticeIndex(prev => prev + 1);
      } else {
        alert("Latihan Selesai! Coba Kuis sekarang.");
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

  return (
    <>
    {pronunModal}
        <LessonShell
            title="Intonasi"
            subtitle="Pronunciation • Pelajaran 7"
            accentColor="#E83E8C"
            nextLesson={'/modul/english/beginner/pronunciation/lesson-8'}
            tabs={[
                { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
                { id: 'practice', label: 'Latihan', icon: <Mic size={14} /> },
                { id: 'quiz', label: 'Kuis', icon: <Star size={14} /> },
            ]}
            footer={() => (
                <button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: `linear-gradient(135deg, ${'#E83E8C'}, ${'#E83E8C'}cc)` }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai \u2713' : 'Selesai'}
                </button>
            )}
        >
            {(tabId) => tabId === 'learn' ? (
                <div className="space-y-6">
{/* Intro */}
              <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Mic size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Bahasa Inggris adalah Musik 🎵</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Suaramu <b>NAIK</b> dan <b>TURUN</b> seperti melodi.
                    Ini disebut <b>Intonasi</b>.
                    <br /><br />
                    Jika kamu berbicara datar seperti robot, orang mungkin berpikir kamu bosan atau marah!
                  </p>
                </div>
              </motion.section>

              <div className="mt-6 bg-white p-6 rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-4 text-center">Dengarkan bedanya</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => playSound("Hello. My name is Robot.")}
                    className="w-full flex items-center p-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center mr-3 text-xl">🤖</div>
                    <div className="text-left">
                      <span className="block font-bold text-[var(--color-text-primary)]">Suara Robot</span>
                      <span className="text-xs text-[var(--color-text-muted)]">Nada datar. Membosankan.</span>
                    </div>
                    <Volume2 size={20} />
                  </button>

                  <button
                    onClick={() => playSound("Hello! My name is Human.")}
                    className="w-full flex items-center p-3 rounded-xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center mr-3 text-xl">😃</div>
                    <div className="text-left">
                      <span className="block font-bold text-indigo-700">Suara Manusia</span>
                      <span className="text-xs text-indigo-500">Naik dan turun. Ramah.</span>
                    </div>
                    <Volume2 size={20} />
                  </button>
                </div>
              </div>

<div className="space-y-6">
              {INTONATION_RULES.map((rule, idx) => (
                <div key={idx} className={`rounded-2xl border-2 p-5 ${rule.color.replace('text-', 'border-').split(' ')[2] || 'border-[var(--color-border)]'} bg-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{rule.icon}</span>
                      <h3 className={`text-lg font-bold ${rule.color.split(' ')[1]}`}>{rule.name}</h3>
                    </div>
                    <span className="text-2xl font-black">{rule.symbol}</span>
                  </div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)] mb-2">{rule.condition}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mb-4 leading-relaxed">{rule.description}</p>

                  <div className="grid grid-cols-1 gap-2">
                    {rule.examples.map((ex, i) => (
                      <button
                        key={i}
                        onClick={() => playSound(ex.text)}
                        className="flex items-center justify-between bg-[var(--color-background)] p-3 rounded-xl border border-[var(--color-border)] hover:bg-white transition-all group"
                      >
                        <div>
                          <span className="font-bold text-[var(--color-text-primary)] block">{ex.text}</span>
                          <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wide">{ex.subtext}</span>
                        </div>
                        <Volume2 className={`w-4 h-4 opacity-50 group-hover:opacity-100 ${rule.color.split(' ')[1]}`} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
                </div>
            ) : tabId === 'practice' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-xl mx-auto text-center pt-4"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-xl shadow-indigo-100 border border-indigo-50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                      <div
                        className="h-full bg-indigo-500 transition-all duration-300"
                        style={{ width: `${((practiceIndex + 1) / PRACTICE_SENTENCES.length) * 100}%` }}
                      ></div>
                    </div>

                    <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-6">
                      Cocokkan Melodi · {practiceIndex + 1}/{PRACTICE_SENTENCES.length}
                    </h3>

                    <div className="mb-8 relative">
                      <button
                        onClick={() => playSound(PRACTICE_SENTENCES[practiceIndex].text)}
                        className="bg-indigo-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-indigo-100 transition-colors shadow-inner"
                      >
                        <Volume2 size={40} className="text-indigo-500" />
                      </button>
                      <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2 px-2">{PRACTICE_SENTENCES[practiceIndex].text}</h2>
                      <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-[var(--color-text-muted)] inline-block">{PRACTICE_SENTENCES[practiceIndex].hint}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handlePracticeCheck('falling')}
                        className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-blue-400 hover:bg-blue-50 font-bold text-[var(--color-text-secondary)] flex flex-col items-center gap-1 transition-all active:scale-95"
                      >
                        <span className="text-3xl mb-1">↘</span>
                        <span>Turun</span>
                      </button>
                      <button
                        onClick={() => handlePracticeCheck('rising')}
                        className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-pink-400 hover:bg-pink-50 font-bold text-[var(--color-text-secondary)] flex flex-col items-center gap-1 transition-all active:scale-95"
                      >
                        <span className="text-3xl mb-1">↗</span>
                        <span>Naik</span>
                      </button>
                    </div>

                    {practiceFeedback && (
                      <div className={`mt-6 font-bold text-lg ${practiceFeedback === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
                        {practiceFeedback === 'correct' ? 'Benar! 🎉' : 'Ups! Coba lagi.'}
                      </div>
                    )}
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
                              {isAnswerChecked && option === QUIZ_QUESTIONS[quizStep].answer && <CheckCircle2 size={20} className="text-green-600" />}
                              {isAnswerChecked && option === selectedOption && option !== QUIZ_QUESTIONS[quizStep].answer && <XCircle size={20} className="text-red-500" />}
                            </button>
                          );
                        })}
                      </div>

                      {isAnswerChecked && (
                        <div className="mt-6">
                          <div className={`p-3 rounded-lg text-sm mb-4 ${selectedOption === QUIZ_QUESTIONS[quizStep].answer ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'}`}>
                            💡 {QUIZ_QUESTIONS[quizStep].explanation}
                          </div>
                          <button
                            onClick={nextQuizQuestion}
                            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                          >
                            {quizStep < QUIZ_QUESTIONS.length - 1 ? 'Pertanyaan Selanjutnya →' : 'Lihat Hasil'}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500">
                        <Star size={40} />
                      </div>
                      <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Kuis Selesai! 🎉</h2>
                      <p className="text-[var(--color-text-muted)] mb-2">Skor kamu:</p>
                      <p className="text-4xl font-black text-indigo-600 mb-6">{quizScore} <span className="text-xl font-normal text-[var(--color-text-muted)]">/ {QUIZ_QUESTIONS.length}</span></p>
                      <button
                        onClick={restartQuiz}
                        className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                      >
                        Ulangi Kuis
                      </button>
                    </div>
                  )}
                </motion.div>
            )}
        </LessonShell>
    </>
  );
};

export default PronunLesson7;
