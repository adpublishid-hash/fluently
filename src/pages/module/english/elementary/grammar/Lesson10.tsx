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

const GRAMMAR_RULES = [
  {
    title: "Gerunds (Verb + -ing)",
    desc: "Digunakan setelah kata kerja tertentu seperti 'Enjoy', 'Finish', 'Stop'. Juga berfungsi sebagai Kata Benda.",
    example: "I enjoy swimming.",
    keywords: ["Enjoy", "Finish", "Stop", "Mind", "Avoid", "Practice", "Miss", "Suggest"],
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "🏊"
  },
  {
    title: "Infinitives (To + Verb)",
    desc: "Digunakan setelah kata kerja tertentu seperti 'Want', 'Need', 'Hope'.",
    example: "I want to go.",
    keywords: ["Want", "Need", "Hope", "Decide", "Plan", "Promise", "Learn", "Would like"],
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: "🗺️"
  }
];

const EXAMPLE_SENTENCES = [
  { type: "Gerund", en: "I enjoy reading books.", id: "Saya menikmati membaca buku.", icon: "📚" },
  { type: "Infinitif", en: "I want to buy a car.", id: "Saya ingin membeli mobil.", icon: "🚗" },
  { type: "Gerund", en: "She finished cooking.", id: "Dia selesai memasak.", icon: "🍳" },
  { type: "Infinitif", en: "He needs to sleep.", id: "Dia butuh tidur.", icon: "😴" },
  { type: "Gerund", en: "Please stop talking.", id: "Tolong berhenti bicara.", icon: "🤫" },
  { type: "Infinitif", en: "We hope to see you.", id: "Kami berharap bertemu denganmu.", icon: "👋" },
  { type: "Gerund", en: "Do you mind helping me?", id: "Apakah kamu keberatan membantuku?", icon: "🤝" },
  { type: "Infinitif", en: "They decided to leave.", id: "Mereka memutuskan untuk pergi.", icon: "🚪" },
  { type: "Gerund", en: "I practice playing guitar.", id: "Saya berlatih bermain gitar.", icon: "🎸" },
  { type: "Infinitif", en: "I plan to visit Paris.", id: "Saya berencana mengunjungi Paris.", icon: "🗼" },
  { type: "Gerund", en: "Avoid eating too much sugar.", id: "Hindari makan terlalu banyak gula.", icon: "🍬" },
  { type: "Infinitif", en: "She learned to drive.", id: "Dia belajar menyetir.", icon: "🚘" },
  { type: "Gerund", en: "I miss seeing my friends.", id: "Saya rindu bertemu teman-teman saya.", icon: "😢" },
  { type: "Infinitif", en: "He promised to help.", id: "Dia berjanji untuk membantu.", icon: "🤙" },
  { type: "Gerund", en: "He suggested going to the cinema.", id: "Dia menyarankan pergi ke bioskop.", icon: "🍿" },
  { type: "Infinitif", en: "I would like to order.", id: "Saya ingin memesan.", icon: "🍽️" },
  { type: "Gerund", en: "Swimming is good for you.", id: "Berenang itu baik untukmu.", icon: "🏊" },
  { type: "Infinitif", en: "Don't forget to lock the door.", id: "Jangan lupa mengunci pintu.", icon: "🔒" },
  { type: "Gerund", en: "She hates waking up early.", id: "Dia benci bangun pagi.", icon: "⏰" },
  { type: "Infinitif", en: "It is important to study.", id: "Penting untuk belajar.", icon: "📝" }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "I want ___ a new phone.",
    options: ['buy', 'buying', 'to buy'],
    answer: 'to buy',
    explanation: "Setelah 'Want', gunakan Infinitive (to + verb)."
  },
  {
    id: 2,
    question: "She enjoys ___ TV.",
    options: ['watch', 'watching', 'to watch'],
    answer: 'watching',
    explanation: "Setelah 'Enjoy', gunakan Gerund (verb + ing)."
  },
  {
    id: 3,
    question: "We decided ___ home.",
    options: ['stay', 'staying', 'to stay'],
    answer: 'to stay',
    explanation: "Setelah 'Decide', gunakan Infinitive (to + verb)."
  },
  {
    id: 4,
    question: "Please stop ___ noise.",
    options: ['make', 'making', 'to make'],
    answer: 'making',
    explanation: "Setelah 'Stop' (berhenti melakukan sesuatu), gunakan Gerund."
  },
  {
    id: 5,
    question: "He needs ___ a doctor.",
    options: ['see', 'seeing', 'to see'],
    answer: 'to see',
    explanation: "Setelah 'Need', gunakan Infinitive."
  },
  {
    id: 6,
    question: "I want ___ a new phone.",
    options: ["buy","buying","to buy"],
    answer: "to buy",
    explanation: "Setelah 'Want', gunakan Infinitive (to + verb)."
  },
  {
    id: 7,
    question: "My sister enjoys ___ TV.",
    options: ["watch","watching","to watch"],
    answer: "watching",
    explanation: "Setelah 'Enjoy', gunakan Gerund (verb + ing)."
  },
  {
    id: 8,
    question: "They decided ___ home.",
    options: ["stay","staying","to stay"],
    answer: "to stay",
    explanation: "Setelah 'Decide', gunakan Infinitive (to + verb)."
  },
  {
    id: 9,
    question: "Please stop ___ noise.",
    options: ["make","making","to make"],
    answer: "making",
    explanation: "Setelah 'Stop' (berhenti melakukan sesuatu), gunakan Gerund."
  },
  {
    id: 10,
    question: "Mark needs ___ a doctor.",
    options: ["see","seeing","to see"],
    answer: "to see",
    explanation: "Setelah 'Need', gunakan Infinitive."
  },
  {
    id: 11,
    question: "I want ___ a new phone.",
    options: ["buy","buying","to buy"],
    answer: "to buy",
    explanation: "Setelah 'Want', gunakan Infinitive (to + verb)."
  },
  {
    id: 12,
    question: "My mother enjoys ___ TV.",
    options: ["watch","watching","to watch"],
    answer: "watching",
    explanation: "Setelah 'Enjoy', gunakan Gerund (verb + ing)."
  },
  {
    id: 13,
    question: "We decided ___ home.",
    options: ["stay","staying","to stay"],
    answer: "to stay",
    explanation: "Setelah 'Decide', gunakan Infinitive (to + verb)."
  },
  {
    id: 14,
    question: "Please stop ___ noise.",
    options: ["make","making","to make"],
    answer: "making",
    explanation: "Setelah 'Stop' (berhenti melakukan sesuatu), gunakan Gerund."
  },
  {
    id: 15,
    question: "She needs ___ a doctor.",
    options: ["see","seeing","to see"],
    answer: "to see",
    explanation: "Setelah 'Need', gunakan Infinitive."
  },
  {
    id: 16,
    question: "I want ___ a new phone.",
    options: ["buy","buying","to buy"],
    answer: "to buy",
    explanation: "Setelah 'Want', gunakan Infinitive (to + verb)."
  },
  {
    id: 17,
    question: "She enjoys ___ TV.",
    options: ["watch","watching","to watch"],
    answer: "watching",
    explanation: "Setelah 'Enjoy', gunakan Gerund (verb + ing)."
  },
  {
    id: 18,
    question: "We decided ___ home.",
    options: ["stay","staying","to stay"],
    answer: "to stay",
    explanation: "Setelah 'Decide', gunakan Infinitive (to + verb)."
  },
  {
    id: 19,
    question: "Please stop ___ noise.",
    options: ["make","making","to make"],
    answer: "making",
    explanation: "Setelah 'Stop' (berhenti melakukan sesuatu), gunakan Gerund."
  },
  {
    id: 20,
    question: "He needs ___ a doctor.",
    options: ["see","seeing","to see"],
    answer: "to see",
    explanation: "Setelah 'Need', gunakan Infinitive."
  }
];

const ElemGrammarLesson10: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 10);
  const nextLessonPath = '/modul/english/elementary/grammar/lesson-11';
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
      lessonLabel={"Elementary Grammar Lesson 10"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Gerund & Infinitif"
            subtitle="Grammar • Pelajaran 10"
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
                  <Star className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Dua Bentuk Kata Kerja</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Kadang kita gunakan <b>Verb + ing</b> (Gerund).<br />
                    Kadang kita gunakan <b>To + Verb</b> (Infinitive).<br />
                    Itu tergantung pada kata kerja pertamanya!
                  </p>
                </div>
              </motion.section>

              {/* Rules List */}
              <div className="space-y-4">
                {GRAMMAR_RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${rule.color.replace('bg-', 'border-').split(' ')[2]} relative`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`text-xl font-bold ${rule.color.split(' ')[1]}`}>{rule.title}</h3>
                      </div>
                      <span className="text-3xl">{rule.icon}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">{rule.desc}</p>

                    <div className="mb-4">
                      <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wide mb-2">Kata Kerja Umum:</p>
                      <div className="flex flex-wrap gap-2">
                        {rule.keywords.map((kw, i) => (
                          <span key={i} className="bg-white px-2 py-1 rounded border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-primary)]">{kw}</span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/60 p-3 rounded-lg border border-[var(--color-border)]/50">
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">"{rule.example}"</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tip */}
              <div className="mt-6 bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <Lightbulb size={24} />
                  <div>
                    <h4 className="font-bold text-yellow-900 mb-1">Kata Kerja Fleksibel</h4>
                    <p className="text-sm text-yellow-800 leading-relaxed">
                      Beberapa kata kerja seperti <b>Like, Love, Hate, Start</b> bisa menggunakan <b>kedua</b> bentuk dengan sedikit perbedaan makna.
                      <br />
                      "I like swimming" = "I like to swim"
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
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${item.type === "Gerund" ? "bg-blue-100 text-blue-600" :
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

export default ElemGrammarLesson10;

