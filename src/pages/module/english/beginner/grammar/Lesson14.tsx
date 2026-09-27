import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, XCircle, BookOpen, Star, TrendingUp, Trophy } from 'lucide-react';
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



const REVIEW_TOPICS = [
  {
    category: "Dasar-Dasar",
    items: [
      { label: "Urutan Kalimat", text: "Subject + Verb + Object", sub: "She eats pizza." },
      { label: "To Be", text: "I am / He is / You are", sub: "They are happy." },
      { label: "Kata Ganti", text: "I/Me/My, He/Him/His", sub: "It is my book." }
    ],
    icon: "🧱",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    category: "Sekarang & Masa Lalu",
    items: [
      { label: "Present Simple", text: "He/She/It butuh 's'.", sub: "He works. I work." },
      { label: "Do / Does", text: "Untuk Pertanyaan & Negatif.", sub: "Do you? He doesn't." },
      { label: "Simple Past", text: "Verb + ed (atau tak beraturan).", sub: "I played. I went." }
    ],
    icon: "⏳",
    color: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    category: "Kata Benda & Detail",
    items: [
      { label: "Jamak", text: "Biasanya tambah 's' atau 'es'.", sub: "Cat -> Cats. Bus -> Buses." },
      { label: "Artikel", text: "A (konsonan), An (vokal).", sub: "A dog. An orange." },
      { label: "Kata Depan", text: "IN (Besar), ON (Hari), AT (Waktu).", sub: "In London, At 5 PM." }
    ],
    icon: "📦",
    color: "bg-emerald-50 text-emerald-700 border-blue-200"
  },
  {
    category: "Modal & Lainnya",
    items: [
      { label: "Can", text: "Kemampuan. Tanpa 's', Tanpa 'to'.", sub: "I can swim." },
      { label: "Keberadaan", text: "There is (1), There are (2+).", sub: "There is a cat." },
      { label: "Perintah", text: "Hanya Kata Kerja Dasar.", sub: "Stop! Don't run." }
    ],
    icon: "✨",
    color: "bg-amber-50 text-amber-700 border-amber-200"
  }
];

const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    question: "She ___ to the gym every Monday.",
    options: ['go', 'goes', 'going'],
    answer: 'goes',
    explanation: "Present Simple: Orang ketiga tunggal (She) menambahkan -es pada 'go'."
  },
  {
    id: 2,
    question: "___ you play tennis yesterday?",
    options: ['Do', 'Did', 'Are'],
    answer: 'Did',
    explanation: "Pertanyaan Past Simple menggunakan 'Did' + Kata Kerja Dasar."
  },
  {
    id: 3,
    question: "There ___ two birds in the tree.",
    options: ['is', 'are', 'am'],
    answer: 'are',
    explanation: "'Two birds' jamak, jadi kita gunakan 'There are'."
  },
  {
    id: 4,
    question: "I want to eat ___ apple.",
    options: ['a', 'an', 'the'],
    answer: 'an',
    explanation: "Apple dimulai dengan bunyi vokal, jadi kita gunakan 'an'."
  },
  {
    id: 5,
    question: "He ___ swim very well.",
    options: ['no can', 'cannot', 'don\'t can'],
    answer: 'cannot',
    explanation: "Negatif dari 'can' adalah 'cannot' (atau 'can't'). Kita tidak pernah mengatakan 'don't can'."
  },
  {
    id: 6,
    question: "My birthday is ___ October.",
    options: ['on', 'at', 'in'],
    answer: 'in',
    explanation: "Untuk bulan, kita gunakan kata depan 'IN'."
  },
  {
    id: 7,
    question: "___ open the window, please.",
    options: ['Not', 'Don\'t', 'No'],
    answer: 'Don\'t',
    explanation: "Imperatif negatif selalu dimulai dengan 'Don't'."
  },
  {
    id: 8,
    question: "They ___ at home last night.",
    options: ['was', 'were', 'are'],
    answer: 'were',
    explanation: "Bentuk lampau dari 'are' (untuk They) adalah 'were'."
  },
  {
    id: 9,
    question: "Where ___ you live?",
    options: ['do', 'does', 'are'],
    answer: 'do',
    explanation: "Pertanyaan dengan 'You' menggunakan kata bantu 'Do'."
  },
  {
    id: 10,
    question: "This is ___ book.",
    options: ['my', 'I', 'mine'],
    answer: 'my',
    explanation: "Kata sifat kepemilikan sebelum kata benda: 'my book'."
  },
  {
    id: 11,
    question: "He ___ (study) English now.",
    options: ['studies', 'is studying', 'study'],
    answer: 'studies',
    explanation: "Diasumsikan kebiasaan Present Simple: He studies."
  },
  {
    id: 12,
    question: "I usually get up ___ 7 o'clock.",
    options: ['on', 'in', 'at'],
    answer: 'at',
    explanation: "Untuk waktu jam yang spesifik, kita gunakan 'AT'."
  },
  {
    id: 13,
    question: "Look at ___ moon!",
    options: ['a', 'an', 'the'],
    answer: 'the',
    explanation: "Kita menggunakan 'the' karena hanya ada satu bulan."
  },
  {
    id: 14,
    question: "___ she like chocolate?",
    options: ['Do', 'Does', 'Is'],
    answer: 'Does',
    explanation: "Pertanyaan dengan 'She' menggunakan kata bantu 'Does'."
  },
  {
    id: 15,
    question: "I ___ a new car.",
    options: ['have', 'has', 'haves'],
    answer: 'have',
    explanation: "'I' menggunakan 'have'. 'He/She/It' menggunakan 'has'."
  },
  {
    id: 16,
    question: "We ___ soccer every Sunday.",
    options: ['plays', 'playing', 'play'],
    answer: 'play',
    explanation: "'We' adalah jamak, jadi gunakan kata kerja dasar 'play'."
  },
  {
    id: 17,
    question: "___ is your name?",
    options: ['Who', 'What', 'Where'],
    answer: 'What',
    explanation: "Menanyakan nama menggunakan 'What'."
  },
  {
    id: 18,
    question: "She can ___ very well.",
    options: ['cooks', 'cooking', 'cook'],
    answer: 'cook',
    explanation: "Setelah 'can' selalu gunakan Kata Kerja Dasar."
  },
  {
    id: 19,
    question: "They ___ happy today.",
    options: ['is', 'am', 'are'],
    answer: 'are',
    explanation: "'They' pasangannya adalah 'are'."
  },
  {
    id: 20,
    question: "I didn't ___ to school yesterday.",
    options: ['go', 'went', 'going'],
    answer: 'go',
    explanation: "Setelah 'didn't', gunakan Kata Kerja Dasar."
  }
];

const GrammarLesson14: React.FC = () => {
  const navigate = useNavigate();

  const nextLessonPath = null;
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(14));
  const [showGrammarModal, setShowGrammarModal] = React.useState(false);
  const handleSelesai = () => {
    markGrammarComplete(14);
    setIsCompleted(true);
    setShowGrammarModal(true);
  };

  
  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string) => { playAudio(text, 0.9); };

  // Quiz Logic
  const handleCheckQuiz = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);
    if (option === ASSESSMENT_QUESTIONS[quizStep].answer) {
      setQuizScore(prev => prev + 1);
      playSound("Correct!");
    } else {
      playSound("Incorrect.");
    }
  };

  const nextQuizQuestion = () => {
    if (quizStep < ASSESSMENT_QUESTIONS.length - 1) {
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
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Grammar Lesson 14</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowGrammarModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    {grammarModal}
    <LessonShell
            title="Ulasan & Penilaian"
            subtitle="Grammar • Pelajaran 14"
            accentColor="#8E44AD"
            tabs={[
                { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
                { id: 'quiz', label: 'Kuis', icon: <Star size={14} /> }
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
                  <Sparkles size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Master Tata Bahasa! 🎓</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Kamu telah menyelesaikan semua pelajaran tata bahasa pemula! Berikut adalah ringkasan cepat dari semua yang telah kamu pelajari.
                  </p>
                </div>
              </motion.section>

              {/* Review Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {REVIEW_TOPICS.map((topic, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${topic.color.replace('bg-', 'border-').split(' ')[2]}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{topic.icon}</span>
                      <h3 className={`text-lg font-bold ${topic.color.split(' ')[1]}`}>{topic.category}</h3>
                    </div>
                    <div className="space-y-4">
                      {topic.items.map((item, i) => (
                        <div key={i} className="flex flex-col">
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wide">{item.label}</span>
                          </div>
                          <span className="text-sm font-bold text-[var(--color-text-primary)]">{item.text}</span>
                          <span className="text-xs text-[var(--color-text-muted)] italic">{item.sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
                </div>
            ) : tabId === 'quiz' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {ASSESSMENT_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-gray-100 rounded-full mb-6 overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 transition-all duration-500"
                      style={{ width: `${((quizStep) / ASSESSMENT_QUESTIONS.length) * 100}%` }}
                    ></div>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6 leading-relaxed">
                    {ASSESSMENT_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {ASSESSMENT_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-indigo-300 hover:bg-[var(--color-background)]";
                      if (isAnswerChecked) {
                        if (option === ASSESSMENT_QUESTIONS[quizStep].answer) btnClass = "bg-green-50 border-sky-500 text-green-700";
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
                          {isAnswerChecked && option === ASSESSMENT_QUESTIONS[quizStep].answer && <CheckCircle2 size={20} />}
                          {isAnswerChecked && option === selectedOption && option !== ASSESSMENT_QUESTIONS[quizStep].answer && <XCircle size={20} />}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswerChecked && (
                    <div className="mt-6 ">
                      <div className={`p-4 rounded-xl text-sm mb-4 border ${selectedOption === ASSESSMENT_QUESTIONS[quizStep].answer ? 'bg-green-50 text-green-800 border-sky-100' : 'bg-orange-50 text-orange-800 border-orange-100'}`}>
                        <p className="font-bold mb-1">{selectedOption === ASSESSMENT_QUESTIONS[quizStep].answer ? "Benar!" : "Penjelasan:"}</p>
                        {ASSESSMENT_QUESTIONS[quizStep].explanation}
                      </div>
                      <button
                        onClick={nextQuizQuestion}
                        className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        {quizStep < ASSESSMENT_QUESTIONS.length - 1 ? "Pertanyaan Selanjutnya" : "Lihat Hasil"}
                        <TrendingUp size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 animate-slide-up">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 rounded-full"></div>
                    <Trophy size={20} />
                    <div className="absolute -top-2 -right-2">
                      <Star size={16} />
                    </div>
                  </div>

                  <h2 className="text-3xl font-black text-[var(--color-text-primary)] mb-2">Modul Selesai!</h2>
                  <p className="text-[var(--color-text-muted)] mb-8 font-medium">Kamu mendapatkan skor {quizScore} dari {ASSESSMENT_QUESTIONS.length}</p>

                  <div className="flex flex-col gap-3 max-w-xs mx-auto">
                    <button
                      onClick={restartQuiz}
                      className="w-full py-3.5 bg-white border-2 border-[var(--color-border)] text-[var(--color-text-primary)] rounded-xl font-bold hover:bg-[var(--color-background)] transition-all"
                    >
                      Coba Lagi
                    </button>
                    <button
                      onClick={() => navigate(-1)}
                      className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                      Kembali ke Modul
                    </button>
                  </div>
                </div>
              )}
                </motion.div>
            ) : null}
        </LessonShell>
      </>
  );
};

export default GrammarLesson14;
