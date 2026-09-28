import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, BookOpen, PenTool,
  Trophy, Star, TrendingUp
} from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const REVIEW_TOPICS = [
  {
    category: "Tenses & Waktu",
    icon: "⏳",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    points: [
      { label: "Present Simple", detail: "Kebiasaan/Fakta (He works)" },
      { label: "Present Continuous", detail: "Sekarang/Sementara (He is working)" },
      { label: "Past Simple", detail: "Tindakan Selesai (He worked / He went)" },
      { label: "Future", detail: "Will (Keputusan) vs Going to (Rencana)" }
    ]
  },
  {
    category: "Kata Kerja & Modals",
    icon: "💪",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    points: [
      { label: "Modals", detail: "Can, Could, Should, Must (Tanpa 'to')" },
      { label: "Gerunds/Infinitives", detail: "Enjoy doing / Want to do" },
      { label: "Passive Voice", detail: "Is/Was + Past Participle (It is made)" },
      { label: "Conditionals", detail: "If + Present ... Will (First Conditional)" }
    ]
  },
  {
    category: "Kata Benda & Deskripsi",
    icon: "🎨",
    color: "bg-emerald-50 text-emerald-700 border-blue-200",
    points: [
      { label: "Adjectives", detail: "Menjelaskan Kata Benda (Happy girl)" },
      { label: "Adverbs", detail: "Menjelaskan Kata Kerja (Sing happily)" },
      { label: "Comparatives", detail: "Bigger, More expensive" },
      { label: "Quantifiers", detail: "Some, Any, Much, Many" }
    ]
  },
  {
    category: "Struktur & Detail",
    icon: "🧩",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    points: [
      { label: "Prepositions", detail: "IN (Besar), ON (Hari), AT (Waktu)" },
      { label: "Articles", detail: "A/An (Umum) vs The (Spesifik)" },
      { label: "Relative Pronouns", detail: "Who (Orang), Which (Benda)" },
      { label: "Reported Speech", detail: "Mundur Tense (is -> was)" }
    ]
  }
];

const FINAL_QUIZ = [
  {
    id: 1,
    question: "She usually ___ to school by bus.",
    options: ['go', 'goes', 'is going'],
    answer: 'goes',
    explanation: "Present Simple (Rutin) dengan 'She' menggunakan -es."
  },
  {
    id: 2,
    question: "Look! It ___ raining.",
    options: ['is', 'does', 'will'],
    answer: 'is',
    explanation: "Present Continuous (Terjadi sekarang): It is raining."
  },
  {
    id: 3,
    question: "I ___ (not / see) him yesterday.",
    options: ['don\'t see', 'didn\'t saw', 'didn\'t see'],
    answer: 'didn\'t see',
    explanation: "Past Simple Negatif: Didn't + Kata Kerja Dasar."
  },
  {
    id: 4,
    question: "We ___ to the beach last Sunday.",
    options: ['go', 'went', 'gone'],
    answer: 'went',
    explanation: "Past Simple Tidak Beraturan dari 'Go' adalah 'Went'."
  },
  {
    id: 5,
    question: "I think it ___ rain later. (Opinion)",
    options: ['is going to', 'will', 'is'],
    answer: 'will',
    explanation: "Prediksi berdasarkan opini menggunakan 'Will'."
  },
  {
    id: 6,
    question: "This bag is ___ than that one.",
    options: ['heavy', 'heavier', 'more heavy'],
    answer: 'heavier',
    explanation: "Komparatif dari 'Heavy' (berakhiran y) adalah 'Heavier'."
  },
  {
    id: 7,
    question: "I don't have ___ money.",
    options: ['many', 'much', 'some'],
    answer: 'much',
    explanation: "Uang tidak dapat dihitung. Dalam kalimat negatif, gunakan 'much'."
  },
  {
    id: 8,
    question: "He is the ___ player on the team.",
    options: ['goodest', 'best', 'better'],
    answer: 'best',
    explanation: "Superlatif dari 'Good' adalah 'Best'."
  },
  {
    id: 9,
    question: "___ you help me, please?",
    options: ['Should', 'Must', 'Could'],
    answer: 'Could',
    explanation: "'Could' digunakan untuk permintaan sopan."
  },
  {
    id: 10,
    question: "The meeting is ___ Monday.",
    options: ['in', 'at', 'on'],
    answer: 'on',
    explanation: "Hari dalam seminggu menggunakan 'ON'."
  },
  {
    id: 11,
    question: "I wake up ___ 7 AM.",
    options: ['on', 'in', 'at'],
    answer: 'at',
    explanation: "Waktu jam spesifik menggunakan 'AT'."
  },
  {
    id: 12,
    question: "This house ___ built in 1990.",
    options: ['is', 'was', 'were'],
    answer: 'was',
    explanation: "Pasif (Masa Lalu): Rumah (tunggal) 'was' built."
  },
  {
    id: 13,
    question: "She ___ swim very well.",
    options: ['cans', 'can', 'can to'],
    answer: 'can',
    explanation: "Modals tidak pernah berubah bentuk. Tidak ada 's', tidak ada 'to'."
  },
  {
    id: 14,
    question: "He drives very ___.",
    options: ['careful', 'carefully', 'care'],
    answer: 'carefully',
    explanation: "Adverbia menjelaskan kata kerja (Bagaimana dia mengemudi)."
  },
  {
    id: 15,
    question: "I enjoy ___ movies.",
    options: ['watch', 'to watch', 'watching'],
    answer: 'watching',
    explanation: "Setelah 'enjoy', gunakan Gerund (-ing)."
  },
  {
    id: 16,
    question: "If it rains, we ___ inside.",
    options: ['stay', 'will stay', 'stayed'],
    answer: 'will stay',
    explanation: "First Conditional: If + Present, ... Will + Verb."
  },
  {
    id: 17,
    question: "The man ___ called you is here.",
    options: ['which', 'who', 'where'],
    answer: 'who',
    explanation: "Kata ganti relatif untuk orang adalah 'Who'."
  },
  {
    id: 18,
    question: "He said he ___ busy. (Direct: 'I am busy')",
    options: ['is', 'was', 'will be'],
    answer: 'was',
    explanation: "Reported Speech backshift: Present (am) -> Past (was)."
  },
  {
    id: 19,
    question: "I am married ___ a doctor.",
    options: ['with', 'to', 'by'],
    answer: 'to',
    explanation: "Preposisi yang benar adalah 'Married TO'."
  },
  {
    id: 20,
    question: "Where ___ you live?",
    options: ['are', 'do', 'does'],
    answer: 'do',
    explanation: "Pertanyaan Present Simple dengan 'You' menggunakan 'Do'."
  }
];

const ElemGrammarLesson20: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 20);
  const nextLessonPath = undefined;
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const playSound = (text: string) => { playAudio(text, 0.9); };

  const handleCheckQuiz = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);
    if (option === FINAL_QUIZ[quizStep].answer) {
      setQuizScore(prev => prev + 1);
      playSound("Correct!");
    } else {
      playSound("Incorrect.");
    }
  };

  const nextQuizQuestion = () => {
    if (quizStep < FINAL_QUIZ.length - 1) {
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
      lessonLabel={"Elementary Grammar Lesson 20"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
    <LessonShell
      title="Penilaian Akhir"
      subtitle="Grammar • Pelajaran 20"
      accentColor="#8E44AD"
            nextLesson={nextLessonPath}
      tabs={[
        { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
        { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }
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
        <div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">
          {/* Intro */}
          <motion.section
            custom={0}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Trophy className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Modul Selesai! 🎓</h2>
              <p className="text-indigo-100 text-sm leading-relaxed">
                Kamu telah mencakup semua topik tata bahasa penting untuk tingkat Dasar (A2). Mari kita rekap sebelum tes akhir.
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
                  {topic.points.map((item, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-sm font-bold text-[var(--color-text-primary)]">{item.label}</span>
                      <span className="text-xs text-[var(--color-text-muted)] italic">{item.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      
      ) : tabId === 'examples' ? (
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">
          <div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">
            <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in"><BookOpen className="w-16 h-16 text-slate-200 mb-4 mx-auto" /><p className="text-[var(--color-text-secondary)] font-medium">Contoh belum tersedia.</p></div>
          </div>
        </div>
      ) : tabId === 'practice' ? (
        <div className="p-4 md:p-8 pb-24 animate-fade-in">
          <div className="max-w-xl mx-auto">
            {!showResult ? (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100 relative overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {FINAL_QUIZ.length}</span>
                  <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-gray-100 rounded-full mb-6 overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 transition-all duration-500"
                    style={{ width: `${((quizStep) / FINAL_QUIZ.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6 leading-relaxed">
                  {FINAL_QUIZ[quizStep].question}
                </h3>

                <div className="space-y-3">
                  {FINAL_QUIZ[quizStep].options.map((option, idx) => {
                    let btnClass = "border-[var(--color-border)] hover:border-indigo-300 hover:bg-[var(--color-background)]";
                    if (isAnswerChecked) {
                      if (option === FINAL_QUIZ[quizStep].answer) btnClass = "bg-green-50 border-sky-500 text-green-700";
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
                        {isAnswerChecked && option === FINAL_QUIZ[quizStep].answer && <CheckCircle2 size={20} />}
                        {isAnswerChecked && option === selectedOption && option !== FINAL_QUIZ[quizStep].answer && <XCircle size={20} />}
                      </button>
                    );
                  })}
                </div>

                {isAnswerChecked && (
                  <div className="mt-6 animate-fade-in">
                    <div className={`p-4 rounded-xl text-sm mb-4 border ${selectedOption === FINAL_QUIZ[quizStep].answer ? 'bg-green-50 text-green-800 border-sky-100' : 'bg-orange-50 text-orange-800 border-orange-100'}`}>
                      <p className="font-bold mb-1">{selectedOption === FINAL_QUIZ[quizStep].answer ? "Benar!" : "Penjelasan:"}</p>
                      {FINAL_QUIZ[quizStep].explanation}
                    </div>
                    <button
                      onClick={nextQuizQuestion}
                      className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      {quizStep < FINAL_QUIZ.length - 1 ? "Pertanyaan Berikutnya" : "Lihat Hasil"}
                      <TrendingUp className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 animate-slide-up">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 rounded-full"></div>
                  <Trophy className="w-24 h-24 text-yellow-500 relative z-10 drop-shadow-[var(--shadow-card)]" />
                  <div className="absolute -top-2 -right-2">
                    <Star className="w-8 h-8 text-yellow-400 animate-bounce" />
                  </div>
                </div>

                <h2 className="text-3xl font-black text-[var(--color-text-primary)] mb-2">Modul Selesai!</h2>
                <p className="text-[var(--color-text-muted)] mb-8 font-medium">Kamu mendapatkan skor {quizScore} dari {FINAL_QUIZ.length}</p>

                <div className="flex flex-col gap-3 max-w-xs mx-auto">
                  <button
                    onClick={restartQuiz}
                    className="w-full py-3.5 bg-white border-2 border-[var(--color-border)] text-[var(--color-text-primary)] rounded-xl font-bold hover:bg-[var(--color-background)] transition-all"
                  >
                    Coba Lagi
                  </button>
                  <button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                  >
                    Kembali ke Modul
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </LessonShell>
    </>
  );
};

export default ElemGrammarLesson20;
