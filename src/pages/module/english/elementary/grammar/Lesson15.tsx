import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2, Lightbulb, CheckCircle2, XCircle, BookOpen, PenTool, Trophy, TrendingUp
} from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const CONDITIONAL_RULES = [
  {
    title: "Zero Conditional",
    usage: "Fakta, Kebenaran Umum, Aturan.",
    formula: "If + Present Simple, ... Present Simple.",
    example: "If you heat ice, it melts.",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "🧊"
  },
  {
    title: "First Conditional",
    usage: "Kemungkinan Nyata di Masa Depan.",
    formula: "If + Present Simple, ... Will + Verb.",
    example: "If it rains, I will stay home.",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: "☔"
  }
];

const EXAMPLE_SENTENCES = [
  // Zero (Facts/Habits)
  { type: "Zero (Fakta)", en: "If you freeze water, it becomes ice.", id: "Jika kamu membekukan air, itu menjadi es.", icon: "❄️" },
  { type: "Zero (Fakta)", en: "If you mix red and blue, you get purple.", id: "Jika campur merah dan biru, jadi ungu.", icon: "🎨" },
  { type: "Zero (Kebiasaan)", en: "If I am late, my boss gets angry.", id: "Jika saya terlambat, bos saya marah.", icon: "😠" },
  { type: "Zero (Fakta)", en: "If babies are hungry, they cry.", id: "Jika bayi lapar, mereka menangis.", icon: "👶" },
  { type: "Zero (Fakta)", en: "If you touch fire, you get burned.", id: "Jika menyentuh api, kamu terbakar.", icon: "🔥" },
  { type: "Zero (Fakta)", en: "If people eat too much, they get fat.", id: "Jika orang makan terlalu banyak, mereka jadi gemuk.", icon: "🍔" },
  { type: "Zero (Alam)", en: "If the sun sets, it gets dark.", id: "Jika matahari terbenam, hari menjadi gelap.", icon: "🌑" },
  { type: "Zero (Tekno)", en: "If you press this button, the TV turns on.", id: "Jika tekan tombol ini, TV menyala.", icon: "📺" },
  { type: "Zero (Kebiasaan)", en: "If I drink coffee at night, I don't sleep.", id: "Jika minum kopi malam hari, saya tidak tidur.", icon: "☕" },
  { type: "Zero (Alam)", en: "If plants don't get water, they die.", id: "Jika tanaman tidak dapat air, mereka mati.", icon: "🥀" },

  // First (Future Possibility)
  { type: "First (Masa Depan)", en: "If it rains tomorrow, we will cancel the picnic.", id: "Jika besok hujan, kami akan batalkan piknik.", icon: "🌧️" },
  { type: "First (Hasil)", en: "If I study hard, I will pass the exam.", id: "Jika saya belajar giat, saya akan lulus ujian.", icon: "🎓" },
  { type: "First (Rencana)", en: "If you come early, we will have lunch together.", id: "Jika kamu datang awal, kita akan makan siang bersama.", icon: "🍽️" },
  { type: "First (Janji)", en: "If she calls, I will tell her the news.", id: "Jika dia menelepon, saya akan beritahu kabarnya.", icon: "📱" },
  { type: "First (Peringatan)", en: "If they don't hurry, they will miss the bus.", id: "Jika mereka tidak buru-buru, mereka akan ketinggalan bus.", icon: "🚌" },
  { type: "First (Hasil)", en: "If I find your keys, I will text you.", id: "Jika saya temukan kuncimu, saya akan SMS.", icon: "🔑" },
  { type: "First (Tawaran)", en: "If you help me, I will help you.", id: "Jika kamu membantuku, aku akan membantumu.", icon: "🤝" },
  { type: "First (Rencana)", en: "If the weather is nice, we will go to the beach.", id: "Jika cuacanya bagus, kita akan ke pantai.", icon: "🏖️" },
  { type: "First (Peringatan)", en: "If he doesn't work, he won't have money.", id: "Jika dia tidak kerja, dia tidak akan punya uang.", icon: "💸" },
  { type: "First (Rencana)", en: "If we leave now, we will arrive on time.", id: "Jika kita berangkat sekarang, kita akan tiba tepat waktu.", icon: "⏰" }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Zero: If you ___ (heat) ice, it melts.",
    options: ['heat', 'will heat', 'heated'],
    answer: 'heat',
    explanation: "Zero conditional menggunakan Present Simple di kedua bagian (Fakta Umum)."
  },
  {
    id: 2,
    question: "First: If it rains, I ___ (stay) home.",
    options: ['stay', 'will stay', 'staying'],
    answer: 'will stay',
    explanation: "First conditional menggunakan 'Will' untuk hasil (Kemungkinan Masa Depan)."
  },
  {
    id: 3,
    question: "Zero: If you mix yellow and blue, you ___ (get) green.",
    options: ['get', 'will get', 'got'],
    answer: 'get',
    explanation: "Ini adalah fakta ilmiah/kebenaran umum, jadi gunakan Zero Conditional (Present Simple)."
  },
  {
    id: 4,
    question: "First: If she ___ (study), she will pass.",
    options: ['study', 'studies', 'will study'],
    answer: 'studies',
    explanation: "Klausa 'If' selalu menggunakan Present Simple. 'She studies'."
  },
  {
    id: 5,
    question: "Correct sentence:",
    options: ['If I will go, I see him.', 'If I go, I will see him.'],
    answer: 'If I go, I will see him.',
    explanation: "Jangan pernah gunakan 'Will' di bagian 'If' kalimat."
  },
  {
    id: 6,
    question: "Zero: If you ___ (heat) ice, it melts.",
    options: ["heat","will heat","heated"],
    answer: "heat",
    explanation: "Zero conditional menggunakan Present Simple di kedua bagian (Fakta Umum)."
  },
  {
    id: 7,
    question: "First: If it rains, I ___ (stay) home.",
    options: ["stay","will stay","staying"],
    answer: "will stay",
    explanation: "First conditional menggunakan 'Will' untuk hasil (Kemungkinan Masa Depan)."
  },
  {
    id: 8,
    question: "Zero: If you mix yellow and blue, you ___ (get) green.",
    options: ["get","will get","got"],
    answer: "get",
    explanation: "Ini adalah fakta ilmiah/kebenaran umum, jadi gunakan Zero Conditional (Present Simple)."
  },
  {
    id: 9,
    question: "First: If she ___ (study), she will pass.",
    options: ["study","studies","will study"],
    answer: "studies",
    explanation: "Klausa 'If' selalu menggunakan Present Simple. 'My sister studies'."
  },
  {
    id: 10,
    question: "Correct sentence:",
    options: ["If I will go, I see him.","If I go, I will see him."],
    answer: "If I go, I will see him.",
    explanation: "Jangan pernah gunakan 'Will' di bagian 'If' kalimat."
  },
  {
    id: 11,
    question: "Zero: If you ___ (heat) ice, it melts.",
    options: ["heat","will heat","heated"],
    answer: "heat",
    explanation: "Zero conditional menggunakan Present Simple di kedua bagian (Fakta Umum)."
  },
  {
    id: 12,
    question: "First: If it rains, I ___ (stay) home.",
    options: ["stay","will stay","staying"],
    answer: "will stay",
    explanation: "First conditional menggunakan 'Will' untuk hasil (Kemungkinan Masa Depan)."
  },
  {
    id: 13,
    question: "Zero: If you mix yellow and blue, you ___ (get) green.",
    options: ["get","will get","got"],
    answer: "get",
    explanation: "Ini adalah fakta ilmiah/kebenaran umum, jadi gunakan Zero Conditional (Present Simple)."
  },
  {
    id: 14,
    question: "First: If the girl ___ (study), the girl will pass.",
    options: ["study","studies","will study"],
    answer: "studies",
    explanation: "Klausa 'If' selalu menggunakan Present Simple. 'She studies'."
  },
  {
    id: 15,
    question: "Correct sentence:",
    options: ["If I will go, I see him.","If I go, I will see him."],
    answer: "If I go, I will see him.",
    explanation: "Jangan pernah gunakan 'Will' di bagian 'If' kalimat."
  },
  {
    id: 16,
    question: "Zero: If you ___ (heat) ice, it melts.",
    options: ["heat","will heat","heated"],
    answer: "heat",
    explanation: "Zero conditional menggunakan Present Simple di kedua bagian (Fakta Umum)."
  },
  {
    id: 17,
    question: "First: If it rains, I ___ (stay) home.",
    options: ["stay","will stay","staying"],
    answer: "will stay",
    explanation: "First conditional menggunakan 'Will' untuk hasil (Kemungkinan Masa Depan)."
  },
  {
    id: 18,
    question: "Zero: If you mix yellow and blue, you ___ (get) green.",
    options: ["get","will get","got"],
    answer: "get",
    explanation: "Ini adalah fakta ilmiah/kebenaran umum, jadi gunakan Zero Conditional (Present Simple)."
  },
  {
    id: 19,
    question: "First: If she ___ (study), she will pass.",
    options: ["study","studies","will study"],
    answer: "studies",
    explanation: "Klausa 'If' selalu menggunakan Present Simple. 'My sister studies'."
  },
  {
    id: 20,
    question: "Correct sentence:",
    options: ["If I will go, I see him.","If I go, I will see him."],
    answer: "If I go, I will see him.",
    explanation: "Jangan pernah gunakan 'Will' di bagian 'If' kalimat."
  }
];

const ElemGrammarLesson15: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 15);
  const nextLessonPath = undefined;
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
      lessonLabel={"Elementary Grammar Lesson 15"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Kalimat Pengandaian (Zero & 1st)"
            subtitle="Grammar • Pelajaran 15"
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
                      className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendingUp className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Jika Ini, Maka Itu</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Conditionals (kalimat pengandaian) menjelaskan hasil dari sesuatu yang mungkin terjadi (di masa sekarang atau depan).
                    <br />
                    <b>Zero:</b> Selalu benar (Fakta).
                    <br />
                    <b>First:</b> Mungkin terjadi (Masa Depan).
                  </p>
                </div>
              </motion.section>

              {/* Rules List */}
              <div className="grid gap-4">
                {CONDITIONAL_RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${rule.color.replace('bg-', 'border-').split(' ')[2]} relative`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`text-xl font-bold ${rule.color.split(' ')[1]}`}>{rule.title}</h3>
                        <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wide mt-1">{rule.usage}</p>
                      </div>
                      <span className="text-3xl">{rule.icon}</span>
                    </div>
                    <div className="bg-white/60 p-3 rounded-lg border border-[var(--color-border)]/50 mb-3">
                      <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase mb-1">Formula</p>
                      <p className="text-sm font-mono text-[var(--color-text-primary)] font-bold">{rule.formula}</p>
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)] italic">"{rule.example}"</p>
                  </div>
                ))}
              </div>

              {/* Tip */}
              <div className="mt-6 bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <Lightbulb size={24} />
                  <div>
                    <h4 className="font-bold text-yellow-900 mb-1">Aturan Emas</h4>
                    <p className="text-sm text-yellow-800 leading-relaxed">
                      Jangan pernah gunakan <b>WILL</b> setelah <b>IF</b>.
                      <br />
                      Salah: If it <s>will</s> rain...
                      <br />
                      Benar: If it <b>rains</b>...
                    </p>
                  </div>
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
                    20 Contoh
                  </h3>
                  <p className="text-xs text-indigo-600 mt-1">Ketuk untuk mendengarkan.</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {EXAMPLE_SENTENCES.map((item, idx) => (
                    <div key={idx} className="p-4 hover:bg-[var(--color-background)] transition-colors flex items-center justify-between group">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${item.type.includes("Zero") ? "bg-blue-100 text-blue-600" :
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

export default ElemGrammarLesson15;
