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

const GRAMMAR_PILLARS = [
  {
    title: "To Be (Keadaan)",
    desc: "Gunakan untuk deskripsi, perasaan, dan identitas.",
    formula: "I am / He is / They are",
    example: "She is happy. (BUKAN: She does happy.)",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "👑"
  },
  {
    title: "Present Simple (Tindakan)",
    desc: "Gunakan untuk kebiasaan, rutinitas, dan fakta.",
    formula: "I play / He plays / We don't play",
    example: "He runs every day. (BUKAN: He run every day.)",
    color: "bg-emerald-50 text-emerald-700 border-blue-200",
    icon: "🏃"
  },
  {
    title: "Can (Kemampuan)",
    desc: "Gunakan untuk keterampilan dan kemungkinan. Tidak ada 's', tidak ada 'to'.",
    formula: "I can / She can / They can't",
    example: "She can swim. (BUKAN: She cans swim.)",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: "💪"
  }
];

const COMMON_MISTAKES = [
  {
    id: 1,
    wrong: "I am agree.",
    correct: "I agree.",
    reason: "Agree adalah kata kerja (tindakan), bukan kata sifat. Jangan gunakan 'am'."
  },
  {
    id: 2,
    wrong: "She don't like pizza.",
    correct: "She doesn't like pizza.",
    reason: "Untuk He/She/It, gunakan 'Does' atau 'Doesn't'."
  },
  {
    id: 3,
    wrong: "Do you are happy?",
    correct: "Are you happy?",
    reason: "Happy adalah kata sifat. Gunakan 'To Be' (Are), bukan 'Do'."
  },
  {
    id: 4,
    wrong: "He can plays football.",
    correct: "He can play football.",
    reason: "Setelah 'Can', gunakan kata kerja dasar. Jangan pernah tambahkan 's' atau 'ing'."
  },
  {
    id: 5,
    wrong: "Where you go?",
    correct: "Where do you go?",
    reason: "Pertanyaan dengan kata kerja tindakan memerlukan pembantu (Do/Does)."
  }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Kalimat mana yang benar?",
    options: ['She live in London.', 'She lives in London.', 'She is live in London.'],
    answer: 'She lives in London.',
    explanation: "Present Simple: He/She/It memerlukan 's' pada kata kerja."
  },
  {
    id: 2,
    question: "___ you tired?",
    options: ['Do', 'Are', 'Have'],
    answer: 'Are',
    explanation: "Tired adalah kata sifat. Gunakan 'To Be' (Are you...?)."
  },
  {
    id: 3,
    question: "My brother ___ drive a car.",
    options: ['cannot', 'no can', 'don\'t can'],
    answer: 'cannot',
    explanation: "Bentuk negatif dari can adalah 'cannot' atau 'can\'t'."
  },
  {
    id: 4,
    question: "What time ___ you wake up?",
    options: ['are', 'is', 'do'],
    answer: 'do',
    explanation: "Wake up adalah kata kerja tindakan. Gunakan 'Do' untuk pertanyaan."
  },
  {
    id: 5,
    question: "They ___ busy yesterday.",
    options: ['was', 'were', 'did'],
    answer: 'were',
    explanation: "Bentuk lampau dari 'Are' adalah 'Were'."
  },
  {
    id: 6,
    question: "Kalimat mana yang benar?",
    options: ["She live in Paris.","She lives in Paris.","She is live in Paris."],
    answer: "She lives in Paris.",
    explanation: "Present Simple: He/She/It memerlukan 's' pada kata kerja."
  },
  {
    id: 7,
    question: "___ you tired?",
    options: ["Do","Are","Have"],
    answer: "Are",
    explanation: "Tired adalah kata sifat. Gunakan 'To Be' (Are you...?)."
  },
  {
    id: 8,
    question: "My sister ___ drive a car.",
    options: ["cannot","no can","don't can"],
    answer: "cannot",
    explanation: "Bentuk negatif dari can adalah 'cannot' atau 'can't'."
  },
  {
    id: 9,
    question: "What time ___ you wake up?",
    options: ["are","is","do"],
    answer: "do",
    explanation: "Wake up adalah kata kerja tindakan. Gunakan 'Do' untuk pertanyaan."
  },
  {
    id: 10,
    question: "They ___ early last week.",
    options: ["was","were","did"],
    answer: "were",
    explanation: "Bentuk lampau dari 'Are' adalah 'Were'."
  },
  {
    id: 11,
    question: "Kalimat mana yang benar?",
    options: ["She live in Paris.","She lives in Paris.","She is live in Paris."],
    answer: "She lives in Paris.",
    explanation: "Present Simple: Mark/She/It memerlukan 's' pada kata kerja."
  },
  {
    id: 12,
    question: "___ you angry?",
    options: ["Do","Are","Have"],
    answer: "Are",
    explanation: "Tired adalah kata sifat. Gunakan 'To Be' (Are you...?)."
  },
  {
    id: 13,
    question: "My cousin ___ drive a car.",
    options: ["cannot","no can","don't can"],
    answer: "cannot",
    explanation: "Bentuk negatif dari can adalah 'cannot' atau 'can't'."
  },
  {
    id: 14,
    question: "What time ___ you wake up?",
    options: ["are","is","do"],
    answer: "do",
    explanation: "Wake up adalah kata kerja tindakan. Gunakan 'Do' untuk pertanyaan."
  },
  {
    id: 15,
    question: "They ___ busy yesterday.",
    options: ["was","were","did"],
    answer: "were",
    explanation: "Bentuk lampau dari 'Are' adalah 'Were'."
  },
  {
    id: 16,
    question: "Kalimat mana yang benar?",
    options: ["She live in Sydney.","She lives in Sydney.","She is live in Sydney."],
    answer: "She lives in Sydney.",
    explanation: "Present Simple: He/She/It memerlukan 's' pada kata kerja."
  },
  {
    id: 17,
    question: "___ you sad?",
    options: ["Do","Are","Have"],
    answer: "Are",
    explanation: "Tired adalah kata sifat. Gunakan 'To Be' (Are you...?)."
  },
  {
    id: 18,
    question: "My brother ___ drive a car.",
    options: ["cannot","no can","don't can"],
    answer: "cannot",
    explanation: "Bentuk negatif dari can adalah 'cannot' atau 'can't'."
  },
  {
    id: 19,
    question: "What time ___ you wake up?",
    options: ["are","is","do"],
    answer: "do",
    explanation: "Wake up adalah kata kerja tindakan. Gunakan 'Do' untuk pertanyaan."
  },
  {
    id: 20,
    question: "They ___ busy last week.",
    options: ["was","were","did"],
    answer: "were",
    explanation: "Bentuk lampau dari 'Are' adalah 'Were'."
  }
];

const ElemGrammarLesson1: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 1);
  const nextLessonPath = '/modul/english/elementary/grammar/lesson-2';
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
      lessonLabel={"Elementary Grammar Lesson 1"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Ulasan Tata Bahasa A1"
            subtitle="Grammar • Pelajaran 1"
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
                      className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendingUp className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Kembali ke Dasar</h2>
                  <p className="text-sky-100 text-sm leading-relaxed">
                    Sebelum kita mulai level Elementary, mari pastikan fondasimu kuat.
                    Bisakah kamu menggunakan 'To Be', 'Do/Does', dan 'Can' dengan sempurna?
                  </p>
                </div>
              </motion.section>

              <div className="space-y-4">
                {GRAMMAR_PILLARS.map((pillar, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${pillar.color.replace('bg-', 'border-').split(' ')[2] || 'border-[var(--color-border)]'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl bg-white p-2 rounded-xl shadow-[var(--shadow-card)] border border-slate-50">{pillar.icon}</span>
                      <div>
                        <h3 className={`text-lg font-bold ${pillar.color.split(' ')[1]}`}>{pillar.title}</h3>
                        <p className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-wide">{pillar.formula}</p>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">{pillar.desc}</p>
                    <div className="bg-[var(--color-background)] p-3 rounded-lg border border-[var(--color-border)]/50">
                      <p className="text-sm font-medium text-[var(--color-text-primary)] flex items-center gap-2">
                        <CheckCircle2 size={16} />
                        {pillar.example}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

<div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] text-center">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-2 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  Perbaiki Kesalahan
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Berikut adalah kesalahan paling umum yang dibuat pembelajar. Ketuk untuk melihat perbaikannya!
                </p>
              </div>

              <div className="space-y-4">
                {COMMON_MISTAKES.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-md transition-all">
                    <div className="p-4 bg-red-50/50 border-b border-red-100 flex justify-between items-center">
                      <span className="font-bold text-red-600 line-through">{item.wrong}</span>
                      <XCircle size={20} />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 size={20} />
                        <span className="font-bold text-green-700 text-lg">{item.correct}</span>
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] italic bg-[var(--color-background)] p-2 rounded-lg inline-block">
                        💡 {item.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      
      ) : tabId === 'examples' ? (
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">
          <div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">
            <section className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Volume2 className="text-indigo-500 w-5 h-5"/>
                Kalimat Sehari-Hari
              </h3>
              <div className="space-y-4">
                {[
                  { en: "I am a student at the university.", id: "Saya seorang siswa di universitas.", type: "To Be" },
                  { en: "She plays tennis every weekend.", id: "Dia bermain tenis setiap akhir pekan.", type: "Present Simple" },
                  { en: "They can speak three languages.", id: "Mereka bisa berbicara tiga bahasa.", type: "Can" },
                  { en: "Do you like watching movies?", id: "Apakah kamu suka menonton film?", type: "Do/Does" },
                  { en: "He doesn't eat meat.", id: "Dia tidak makan daging.", type: "Don't/Doesn't" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                    <button onClick={() => playSound(item.en)} className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 hover:bg-indigo-200 transition-colors">
                      <PlayCircle size={20} />
                    </button>
                    <div>
                      <p className="font-bold text-slate-800 text-lg">{item.en}</p>
                      <p className="text-sm text-slate-500 mt-1">{item.id}</p>
                      <span className="inline-block px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-400 mt-2">{item.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      ) : tabId === 'practice' ? (
        <div className="animate-fade-in">
          <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-sky-50 text-sky-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-sky-300 hover:bg-[var(--color-background)]";
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
                    <Star className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Kuis Selesai!</h2>
                  <p className="text-[var(--color-text-muted)] mb-6">Kamu mendapatkan skor {quizScore} dari {QUIZ_QUESTIONS.length}</p>
                  <button
                    onClick={restartQuiz}
                    className="px-8 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-200"
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

export default ElemGrammarLesson1;
