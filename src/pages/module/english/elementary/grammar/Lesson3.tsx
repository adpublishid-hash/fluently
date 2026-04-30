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

const RULES = [
  {
    title: "Pembantu Ajaib: DID",
    desc: "Dalam bentuk lampau, ketika kita membuat kalimat Negatif atau Pertanyaan, kita menggunakan kata kerja bantu 'DID'.",
    icon: "🎩",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200"
  },
  {
    title: "Aturan Emas",
    desc: "Ketika kamu menggunakan DID atau DIDN'T, kata kerja utama kembali ke bentuk DASAR (Present).",
    example: "Did you GO? (BUKAN: Did you WENT?)",
    icon: "⭐",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200"
  }
];

const EXAMPLES_NEGATIVE = [
  { en: "I didn't go to work.", id: "Saya tidak pergi bekerja." },
  { en: "She didn't see the movie.", id: "Dia tidak menonton film itu." },
  { en: "We didn't eat dinner.", id: "Kami tidak makan malam." },
  { en: "He didn't buy the car.", id: "Dia tidak membeli mobil itu." },
  { en: "They didn't play football.", id: "Mereka tidak bermain bola." },
  { en: "You didn't answer the phone.", id: "Kamu tidak mengangkat telepon." },
  { en: "It didn't rain yesterday.", id: "Kemarin tidak hujan." },
  { en: "I didn't know the answer.", id: "Saya tidak tahu jawabannya." },
  { en: "She didn't clean her room.", id: "Dia tidak membersihkan kamarnya." },
  { en: "We didn't travel last year.", id: "Kami tidak bepergian tahun lalu." }
];

const EXAMPLES_QUESTION = [
  { en: "Did you sleep well?", id: "Apakah kamu tidur nyenyak?" },
  { en: "Did he finish his homework?", id: "Apakah dia menyelesaikan PR-nya?" },
  { en: "Did they arrive on time?", id: "Apakah mereka tiba tepat waktu?" },
  { en: "Did she like the gift?", id: "Apakah dia suka hadiahnya?" },
  { en: "Did it snow last night?", id: "Apakah semalam turun salju?" },
  { en: "Did we win the game?", id: "Apakah kita memenangkan pertandingannya?" },
  { en: "Did you call your mom?", id: "Apakah kamu menelepon ibumu?" },
  { en: "Did John meet his friends?", id: "Apakah John bertemu teman-temannya?" },
  { en: "Did the bus stop here?", id: "Apakah busnya berhenti di sini?" },
  { en: "Did you find your keys?", id: "Apakah kamu menemukan kuncimu?" }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Kalimat mana yang benar?",
    options: ['I didn\'t went.', 'I didn\'t go.', 'I not go.'],
    answer: 'I didn\'t go.',
    explanation: "Setelah 'didn't', gunakan Kata Kerja Dasar (Go)."
  },
  {
    id: 2,
    question: "___ you see the bird?",
    options: ['Does', 'Were', 'Did'],
    answer: 'Did',
    explanation: "Gunakan 'Did' untuk pertanyaan waktu lampau dengan kata kerja tindakan."
  },
  {
    id: 3,
    question: "He ___ enjoy the party.",
    options: ['didn\'t', 'doesn\'t', 'don\'t'],
    answer: 'didn\'t',
    explanation: "Karena ini peristiwa lampau, 'didn't' itu benar. (Doesn't akan untuk kebiasaan saat ini)."
  },
  {
    id: 4,
    question: "Did she ___ a new phone?",
    options: ['bought', 'buy', 'buys'],
    answer: 'buy',
    explanation: "Setelah 'Did', gunakan Kata Kerja Dasar (Buy)."
  },
  {
    id: 5,
    question: "They didn't ___ to the beach.",
    options: ['drive', 'drove', 'driving'],
    answer: 'drive',
    explanation: "Setelah 'didn't', gunakan Kata Kerja Dasar (Drive)."
  },
  {
    id: 6,
    question: "Kalimat mana yang benar?",
    options: ["I didn't went.","I didn't go.","I not go."],
    answer: "I didn't go.",
    explanation: "Setelah 'didn't', gunakan Kata Kerja Dasar (Go)."
  },
  {
    id: 7,
    question: "___ you see the bird?",
    options: ["Does","Were","Did"],
    answer: "Did",
    explanation: "Gunakan 'Did' untuk pertanyaan waktu lampau dengan kata kerja tindakan."
  },
  {
    id: 8,
    question: "He ___ enjoy the party.",
    options: ["didn't","doesn't","don't"],
    answer: "didn't",
    explanation: "Karena ini peristiwa lampau, 'didn't' itu benar. (Doesn't akan untuk kebiasaan saat ini)."
  },
  {
    id: 9,
    question: "Did she ___ a new phone?",
    options: ["bought","buy","buys"],
    answer: "buy",
    explanation: "Setelah 'Did', gunakan Kata Kerja Dasar (Buy)."
  },
  {
    id: 10,
    question: "The dogs didn't ___ to the beach.",
    options: ["drive","drove","driving"],
    answer: "drive",
    explanation: "Setelah 'didn't', gunakan Kata Kerja Dasar (Drive)."
  },
  {
    id: 11,
    question: "Kalimat mana yang benar?",
    options: ["I didn't went.","I didn't go.","I not go."],
    answer: "I didn't go.",
    explanation: "Setelah 'didn't', gunakan Kata Kerja Dasar (Go)."
  },
  {
    id: 12,
    question: "___ you see the bird?",
    options: ["Does","Were","Did"],
    answer: "Did",
    explanation: "Gunakan 'Did' untuk pertanyaan waktu lampau dengan kata kerja tindakan."
  },
  {
    id: 13,
    question: "The boy ___ enjoy the party.",
    options: ["didn't","doesn't","don't"],
    answer: "didn't",
    explanation: "Karena ini peristiwa lampau, 'didn't' itu benar. (Doesn't akan untuk kebiasaan saat ini)."
  },
  {
    id: 14,
    question: "Did she ___ a new phone?",
    options: ["bought","buy","buys"],
    answer: "buy",
    explanation: "Setelah 'Did', gunakan Kata Kerja Dasar (Buy)."
  },
  {
    id: 15,
    question: "They didn't ___ to the beach.",
    options: ["drive","drove","driving"],
    answer: "drive",
    explanation: "Setelah 'didn't', gunakan Kata Kerja Dasar (Drive)."
  },
  {
    id: 16,
    question: "Kalimat mana yang benar?",
    options: ["I didn't went.","I didn't go.","I not go."],
    answer: "I didn't go.",
    explanation: "Setelah 'didn't', gunakan Kata Kerja Dasar (Go)."
  },
  {
    id: 17,
    question: "___ you see the bird?",
    options: ["Does","Were","Did"],
    answer: "Did",
    explanation: "Gunakan 'Did' untuk pertanyaan waktu lampau dengan kata kerja tindakan."
  },
  {
    id: 18,
    question: "My father ___ enjoy the party.",
    options: ["didn't","doesn't","don't"],
    answer: "didn't",
    explanation: "Karena ini peristiwa lampau, 'didn't' itu benar. (Doesn't akan untuk kebiasaan saat ini)."
  },
  {
    id: 19,
    question: "Did she ___ a new phone?",
    options: ["bought","buy","buys"],
    answer: "buy",
    explanation: "Setelah 'Did', gunakan Kata Kerja Dasar (Buy)."
  },
  {
    id: 20,
    question: "The dogs didn't ___ to the beach.",
    options: ["drive","drove","driving"],
    answer: "drive",
    explanation: "Setelah 'didn't', gunakan Kata Kerja Dasar (Drive)."
  }
];

const ElemGrammarLesson3: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 3);
  const nextLessonPath = '/modul/english/elementary/grammar/lesson-4';
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
      lessonLabel={"Elementary Grammar Lesson 3"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Did & Didn't"
            subtitle="Grammar • Pelajaran 3"
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
                  <h2 className="text-xl font-bold mb-2">Tombol "Did"</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    "Did" adalah pembantu yang kuat. Ketika "Did" masuk ke dalam kalimat, ia mencuri bentuk lampau dari kata kerja utama, mengembalikannya ke bentuk normal!
                  </p>
                </div>
              </motion.section>

              {/* Rules Cards */}
              <div className="space-y-4">
                {RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${rule.color.replace('bg-', 'border-').split(' ')[2]} relative overflow-hidden`}>
                    <div className="flex justify-between items-start relative z-10 mb-2">
                      <div>
                        <span className={`text-lg font-bold ${rule.color.split(' ')[1]}`}>{rule.title}</span>
                      </div>
                      <span className="text-2xl">{rule.icon}</span>
                    </div>

                    <p className="text-sm text-[var(--color-text-secondary)] mb-3 font-medium">{rule.desc}</p>

                    {rule.example && (
                      <div className="bg-white/60 p-3 rounded-lg border border-[var(--color-border)]/50">
                        <p className="text-sm font-bold text-[var(--color-text-primary)]">{rule.example}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Visual Formula */}
              <div className="mt-6 bg-[var(--color-background)] rounded-2xl p-5 border border-[var(--color-border)]">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  Rumus
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded font-bold text-xs">(-)</span>
                    <p className="text-sm font-mono text-[var(--color-text-secondary)]">Subject + <b>didn't</b> + Base Verb</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold text-xs">(?)</span>
                    <p className="text-sm font-mono text-[var(--color-text-secondary)]"><b>Did</b> + Subject + Base Verb?</p>
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
                <div className="bg-red-50 px-6 py-4 border-b border-red-100">
                  <h3 className="font-bold text-red-800 flex items-center gap-2">
                    <XCircle size={20} />
                    10 Contoh Negatif
                  </h3>
                  <p className="text-xs text-red-600 mt-1">I did not (didn't) ...</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {EXAMPLES_NEGATIVE.map((item, idx) => (
                    <div key={idx} className="p-4 hover:bg-[var(--color-background)] transition-colors flex items-center justify-between group">
                      <div>
                        <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1">{item.en}</p>
                        <p className="text-xs text-[var(--color-text-muted)] italic">{item.id}</p>
                      </div>
                      <button
                        onClick={() => playSound(item.en)}
                        className="w-8 h-8 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-text-muted)] flex items-center justify-center hover:border-red-300 hover:text-red-600 transition-all"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

<div className="max-w-xl mx-auto">
              <div className="bg-white rounded-[2rem] border border-[var(--color-border)] shadow-[var(--shadow-card)] overflow-hidden">
                <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                  <h3 className="font-bold text-blue-800 flex items-center gap-2">
                    <Info size={20} />
                    10 Contoh Pertanyaan
                  </h3>
                  <p className="text-xs text-blue-600 mt-1">Did you ...?</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {EXAMPLES_QUESTION.map((item, idx) => (
                    <div key={idx} className="p-4 hover:bg-[var(--color-background)] transition-colors flex items-center justify-between group">
                      <div>
                        <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1">{item.en}</p>
                        <p className="text-xs text-[var(--color-text-muted)] italic">{item.id}</p>
                      </div>
                      <button
                        onClick={() => playSound(item.en)}
                        className="w-8 h-8 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-text-muted)] flex items-center justify-center hover:border-blue-300 hover:text-blue-600 transition-all"
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
                    <Star className="w-10 h-10" />
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

export default ElemGrammarLesson3;
