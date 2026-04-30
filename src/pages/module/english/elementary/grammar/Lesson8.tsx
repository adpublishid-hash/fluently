import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2, PlayCircle, Lightbulb, Sparkles, Info, CheckCircle2, XCircle, MessageSquare, BookOpen, PenTool, Trophy, Star, TrendingUp
} from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const COMPARISON_RULES = [
  {
    type: "1 Suku Kata (Pendek)",
    rule: "Tambahkan -er / -est",
    comp: "Old ➜ Older",
    super: "Old ➜ The Oldest",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    type: "Berakhiran 'Y'",
    rule: "Ubah 'y' menjadi 'i' + er / est",
    comp: "Happy ➜ Happier",
    super: "Happy ➜ The Happiest",
    color: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    type: "2+ Suku Kata (Panjang)",
    rule: "Gunakan More / The Most",
    comp: "Famous ➜ More famous",
    super: "Famous ➜ The Most famous",
    color: "bg-orange-50 text-orange-700 border-orange-200"
  },
  {
    type: "CVC (Besar, Panas)",
    rule: "Gandakan huruf terakhir",
    comp: "Big ➜ Bigger",
    super: "Big ➜ The Biggest",
    color: "bg-gray-50 text-[var(--color-primary)] border-[var(--color-border)]"
  }
];

const IRREGULAR_ADJECTIVES = [
  { base: "Good", comp: "Better", super: "The Best", icon: "👍" },
  { base: "Bad", comp: "Worse", super: "The Worst", icon: "👎" },
  { base: "Far", comp: "Farther / Further", super: "The Farthest", icon: "📏" }
];

const EXAMPLE_SENTENCES = [
  { type: "Komparatif", en: "An elephant is bigger than a mouse.", id: "Gajah lebih besar daripada tikus.", icon: "🐘" },
  { type: "Superlatif", en: "The cheetah is the fastest animal.", id: "Cheetah adalah hewan tercepat.", icon: "🐆" },
  { type: "Komparatif", en: "Summer is hotter than winter.", id: "Musim panas lebih panas daripada musim dingin.", icon: "☀️" },
  { type: "Superlatif", en: "My mom is the best cook.", id: "Ibuku adalah koki terbaik.", icon: "👩‍🍳" },
  { type: "Komparatif", en: "This book is more interesting than that one.", id: "Buku ini lebih menarik daripada yang itu.", icon: "📚" },
  { type: "Superlatif", en: "Russia is the largest country in the world.", id: "Rusia adalah negara terbesar di dunia.", icon: "🗺️" },
  { type: "Komparatif", en: "A plane is faster than a train.", id: "Pesawat lebih cepat daripada kereta.", icon: "✈️" },
  { type: "Superlatif", en: "Jupiter is the biggest planet.", id: "Jupiter adalah planet terbesar.", icon: "🪐" },
  { type: "Komparatif", en: "He is taller than his brother.", id: "Dia lebih tinggi dari saudaranya.", icon: "🧍" },
  { type: "Superlatif", en: "That was the worst movie ever.", id: "Itu adalah film terburuk yang pernah ada.", icon: "🎬" },
  { type: "Komparatif", en: "Health is more important than money.", id: "Kesehatan lebih penting daripada uang.", icon: "❤️" },
  { type: "Superlatif", en: "Mount Everest is the highest mountain.", id: "Gunung Everest adalah gunung tertinggi.", icon: "🏔️" },
  { type: "Komparatif", en: "Today is colder than yesterday.", id: "Hari ini lebih dingin daripada kemarin.", icon: "❄️" },
  { type: "Superlatif", en: "She is the smartest student in class.", id: "Dia murid terpintar di kelas.", icon: "🧠" },
  { type: "Komparatif", en: "My car is older than yours.", id: "Mobilku lebih tua dari mobilmu.", icon: "🚗" },
  { type: "Superlatif", en: "February is the shortest month.", id: "Februari adalah bulan terpendek.", icon: "📅" },
  { type: "Komparatif", en: "English is easier than Chinese.", id: "Bahasa Inggris lebih mudah daripada Bahasa Mandarin.", icon: "🗣️" },
  { type: "Superlatif", en: "Who is the richest person?", id: "Siapa orang terkaya?", icon: "💰" },
  { type: "Komparatif", en: "I am happier now.", id: "Saya lebih bahagia sekarang.", icon: "😊" },
  { type: "Superlatif", en: "It is the most expensive hotel.", id: "Ini adalah hotel paling mahal.", icon: "🏨" }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "This box is ___ than that one.",
    options: ['heavyer', 'heavier', 'more heavy'],
    answer: 'heavier',
    explanation: "Heavy berakhiran 'y', jadi ubah 'y' menjadi 'i' + er."
  },
  {
    id: 2,
    question: "He is the ___ player on the team.",
    options: ['best', 'goodest', 'most good'],
    answer: 'best',
    explanation: "Good itu tidak beraturan. Superlatifnya adalah 'The Best'."
  },
  {
    id: 3,
    question: "Ferrari is ___ than a Toyota.",
    options: ['expensive', 'more expensive', 'expensiver'],
    answer: 'more expensive',
    explanation: "Expensive adalah kata panjang (3 suku kata). Gunakan 'more'."
  },
  {
    id: 4,
    question: "She is the ___ girl in school.",
    options: ['prettyest', 'prettiest', 'most pretty'],
    answer: 'prettiest',
    explanation: "Pretty berakhiran 'y', jadi ubah 'y' menjadi 'i' + est."
  },
  {
    id: 5,
    question: "Your joke was ___ than mine.",
    options: ['badder', 'worse', 'bad'],
    answer: 'worse',
    explanation: "Bad itu tidak beraturan. Komparatifnya adalah 'Worse'."
  },
  {
    id: 6,
    question: "This box is ___ than that one.",
    options: ["heavyer","heavier","more heavy"],
    answer: "heavier",
    explanation: "Heavy berakhiran 'y', jadi ubah 'y' menjadi 'i' + er."
  },
  {
    id: 7,
    question: "He is the ___ player on the team.",
    options: ["best","goodest","most good"],
    answer: "best",
    explanation: "Good itu tidak beraturan. Superlatifnya adalah 'The Best'."
  },
  {
    id: 8,
    question: "Ferrari is ___ than a Toyota.",
    options: ["expensive","more expensive","expensiver"],
    answer: "more expensive",
    explanation: "Expensive adalah kata panjang (3 suku kata). Gunakan 'more'."
  },
  {
    id: 9,
    question: "The girl is the ___ girl in school.",
    options: ["prettyest","prettiest","most pretty"],
    answer: "prettiest",
    explanation: "Pretty berakhiran 'y', jadi ubah 'y' menjadi 'i' + est."
  },
  {
    id: 10,
    question: "Your joke was ___ than mine.",
    options: ["badder","worse","bad"],
    answer: "worse",
    explanation: "Bad itu tidak beraturan. Komparatifnya adalah 'Worse'."
  },
  {
    id: 11,
    question: "This box is ___ than that one.",
    options: ["heavyer","heavier","more heavy"],
    answer: "heavier",
    explanation: "Heavy berakhiran 'y', jadi ubah 'y' menjadi 'i' + er."
  },
  {
    id: 12,
    question: "My father is the ___ player on the team.",
    options: ["best","goodest","most good"],
    answer: "best",
    explanation: "Good itu tidak beraturan. Superlatifnya adalah 'The Best'."
  },
  {
    id: 13,
    question: "Ferrari is ___ than a Toyota.",
    options: ["expensive","more expensive","expensiver"],
    answer: "more expensive",
    explanation: "Expensive adalah kata panjang (3 suku kata). Gunakan 'more'."
  },
  {
    id: 14,
    question: "She is the ___ girl in school.",
    options: ["prettyest","prettiest","most pretty"],
    answer: "prettiest",
    explanation: "Pretty berakhiran 'y', jadi ubah 'y' menjadi 'i' + est."
  },
  {
    id: 15,
    question: "Your joke was ___ than mine.",
    options: ["badder","worse","bad"],
    answer: "worse",
    explanation: "Bad itu tidak beraturan. Komparatifnya adalah 'Worse'."
  },
  {
    id: 16,
    question: "This box is ___ than that one.",
    options: ["heavyer","heavier","more heavy"],
    answer: "heavier",
    explanation: "Heavy berakhiran 'y', jadi ubah 'y' menjadi 'i' + er."
  },
  {
    id: 17,
    question: "He is the ___ player on the team.",
    options: ["best","goodest","most good"],
    answer: "best",
    explanation: "Good itu tidak beraturan. Superlatifnya adalah 'The Best'."
  },
  {
    id: 18,
    question: "Ferrari is ___ than a Toyota.",
    options: ["expensive","more expensive","expensiver"],
    answer: "more expensive",
    explanation: "Expensive adalah kata panjang (3 suku kata). Gunakan 'more'."
  },
  {
    id: 19,
    question: "She is the ___ girl in school.",
    options: ["prettyest","prettiest","most pretty"],
    answer: "prettiest",
    explanation: "Pretty berakhiran 'y', jadi ubah 'y' menjadi 'i' + est."
  },
  {
    id: 20,
    question: "Your joke was ___ than mine.",
    options: ["badder","worse","bad"],
    answer: "worse",
    explanation: "Bad itu tidak beraturan. Komparatifnya adalah 'Worse'."
  }
];

const ElemGrammarLesson8: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 8);
  const nextLessonPath = '/modul/english/elementary/grammar/lesson-9';
  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string) => { playAudio(text, 0.9); };

  // Quiz Handlers
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
          <LessonCompleteModal
      show={showCompleteModal}
      onClose={() => setShowCompleteModal(false)}
      lessonLabel={"Elementary Grammar Lesson 8"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Komparatif & Superlatif"
            subtitle="Grammar • Pelajaran 8"
            accentColor="#8E44AD"
            nextLesson={nextLessonPath}
            tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'examples', label: 'Contoh', icon: <Volume2 size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}
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
        <div className="space-y-8 animate-fade-in">
{/* Intro */}
              <motion.section
                      custom={0}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendingUp className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Membandingkan Sesuatu</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Gunakan <b>Comparatives</b> untuk membandingkan dua hal (lebih besar, lebih cepat).
                    <br />
                    Gunakan <b>Superlatives</b> untuk mengatakan sesuatu adalah Nomor 1 (terbesar, tercepat).
                  </p>
                </div>
              </motion.section>

              {/* Formula Card */}
              <div className="bg-white rounded-2xl p-5 border border-[var(--color-border)] shadow-[var(--shadow-card)] mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-center">
                    <h4 className="font-bold text-blue-800 mb-1">Komparatif</h4>
                    <p className="text-xs text-blue-600 font-mono">Kata Sifat + <b>er</b> + <b>than</b></p>
                    <p className="text-xs text-blue-600 font-mono mt-1"><b>more</b> + Adj + <b>than</b></p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 text-center">
                    <h4 className="font-bold text-purple-800 mb-1">Superlatif</h4>
                    <p className="text-xs text-purple-600 font-mono"><b>the</b> + Adj + <b>est</b></p>
                    <p className="text-xs text-purple-600 font-mono mt-1"><b>the most</b> + Adj</p>
                  </div>
                </div>
              </div>

              {/* Rules List */}
              <div className="space-y-4">
                {COMPARISON_RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-4 shadow-[var(--shadow-card)] ${rule.color.replace('bg-', 'border-').split(' ')[2]}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-bold ${rule.color.split(' ')[1]}`}>{rule.type}</span>
                      <span className="text-[10px] font-medium text-[var(--color-text-muted)] bg-[var(--color-background)] px-2 py-1 rounded">{rule.rule}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm font-medium text-[var(--color-text-primary)]">
                      <div className="bg-white/50 p-2 rounded border border-[var(--color-border)]/50">{rule.comp}</div>
                      <div className="bg-white/50 p-2 rounded border border-[var(--color-border)]/50">{rule.super}</div>
                    </div>
                  </div>
                ))}
              </div>

<div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Kata Sifat Tidak Beraturan (Hafalkan ini!)
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Kata-kata ini tidak mengikuti aturan normal. Kamu harus menghafalnya!
                </p>

                <div className="grid gap-4">
                  {IRREGULAR_ADJECTIVES.map((item, idx) => (
                    <div key={idx} className="bg-[var(--color-background)] p-4 rounded-xl border border-[var(--color-border)]">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-black text-[var(--color-text-primary)] text-lg flex items-center gap-2">
                          {item.icon} {item.base}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-white p-2 rounded border border-[var(--color-border)] text-center">
                          <span className="block text-xs text-[var(--color-text-muted)] uppercase font-bold">Komparatif</span>
                          <span className="font-bold text-indigo-600">{item.comp}</span>
                        </div>
                        <div className="bg-white p-2 rounded border border-[var(--color-border)] text-center">
                          <span className="block text-xs text-[var(--color-text-muted)] uppercase font-bold">Superlatif</span>
                          <span className="font-bold text-purple-600">{item.super}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-50 rounded-2xl p-5 border border-rose-200">
                <h4 className="font-bold text-rose-900 mb-2 flex items-center gap-2"><Lightbulb size={16} /> Kesalahan Umum</h4>
                <p className="text-sm text-rose-800 leading-relaxed">
                  Jangan pernah bilang "More Better" atau "Most Best". <br />
                  Cukup katakan <b>Better</b> atau <b>The Best</b>.
                </p>
              </div>
            </div>


        </div>
      ) : tabId === 'examples' ? (
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">
          <div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">
            <div className="space-y-8 w-full max-w-2xl mx-auto">
<div className="max-w-xl mx-auto">
              <div className="bg-white rounded-[2rem] border border-[var(--color-border)] shadow-[var(--shadow-card)] overflow-hidden">
                <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                  <h3 className="font-bold text-indigo-800 flex items-center gap-2">
                    <BookOpen size={20} />
                    20 Contoh Perbandingan
                  </h3>
                  <p className="text-xs text-indigo-600 mt-1">Ketuk untuk mendengarkan.</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {EXAMPLE_SENTENCES.map((item, idx) => (
                    <div key={idx} className="p-4 hover:bg-[var(--color-background)] transition-colors flex items-center justify-between group">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${item.type === "Komparatif" ? "bg-blue-100 text-blue-600" :
                            "bg-purple-100 text-purple-600"
                            }`}>
                            {item.type}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1 flex items-center gap-2">
                          <span>{item.icon}</span> {item.en}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)] italic">{item.id}</p>
                      </div>
                      <button
                        onClick={() => playSound(item.en)}
                        className="w-8 h-8 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-text-muted)] flex items-center justify-center hover:border-indigo-300 hover:text-indigo-600 transition-all"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        
</div>
          </div>
        </div>
      ) : tabId === 'practice' ? (
        <div className="animate-fade-in">
          <div className="max-w-xl mx-auto">
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
                        {quizStep < QUIZ_QUESTIONS.length - 1 ? "Pertanyaan Berikutnya" : "Lihat Hasil"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500">
                    <Trophy className="w-10 h-10" />
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
            </div>
        </div>
      ) : null}
    </LessonShell>
    </>
  );
};

export default ElemGrammarLesson8;
