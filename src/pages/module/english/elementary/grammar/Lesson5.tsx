import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2, Sparkles, CheckCircle2, XCircle, BookOpen, PenTool, Star, TrendingUp
} from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const COMPARISON = [
  {
    title: "Present Simple",
    usage: "Kebiasaan, Rutinitas, Fakta",
    keywords: ["Always", "Usually", "Every day", "Often"],
    example: "I play tennis every Sunday.",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    icon: "📅"
  },
  {
    title: "Present Continuous",
    usage: "Sedang Terjadi, Sementara",
    keywords: ["Now", "At the moment", "Right now", "Look!"],
    example: "I am playing tennis now.",
    color: "bg-sky-50 text-sky-700 border-sky-200",
    icon: "⏱️"
  }
];

const STATIVE_VERBS = [
  { verb: "Like", correct: "I like pizza.", wrong: "I am liking pizza." },
  { verb: "Love", correct: "She loves cats.", wrong: "She is loving cats." },
  { verb: "Want", correct: "We want water.", wrong: "We are wanting water." },
  { verb: "Know", correct: "He knows the answer.", wrong: "He is knowing..." },
  { verb: "Understand", correct: "I understand.", wrong: "I am understanding." },
  { verb: "Believe", correct: "They believe you.", wrong: "They are believing..." },
  { verb: "Need", correct: "I need help.", wrong: "I am needing help." },
];

const EXAMPLES = [
  { type: "Simple (Kebiasaan)", en: "I drink coffee every morning.", id: "Saya minum kopi setiap pagi." },
  { type: "Continuous (Sekarang)", en: "I am drinking water now.", id: "Saya sedang minum air sekarang." },
  { type: "Simple (Fakta)", en: "The sun rises in the east.", id: "Matahari terbit di timur." },
  { type: "Continuous (Sementara)", en: "It is raining today.", id: "Hari ini sedang hujan." },
  { type: "Simple (Rutinitas)", en: "She usually walks to work.", id: "Dia biasanya jalan kaki ke kantor." },
  { type: "Continuous (Tindakan)", en: "Look! She is running.", id: "Lihat! Dia sedang berlari." },
  { type: "Simple (Negatif)", en: "We don't watch TV often.", id: "Kami tidak sering nonton TV." },
  { type: "Continuous (Negatif)", en: "We aren't watching TV right now.", id: "Kami tidak sedang nonton TV sekarang." },
  { type: "Simple (Pertanyaan)", en: "Do you live here?", id: "Apakah kamu tinggal di sini?" },
  { type: "Continuous (Pertanyaan)", en: "Are you staying here?", id: "Apakah kamu sedang menginap di sini?" },
  { type: "Stative (Perasaan)", en: "I feel tired.", id: "Saya merasa lelah." },
  { type: "Stative (Kebutuhan)", en: "He needs a pen.", id: "Dia butuh pulpen." },
  { type: "Simple (Frekuensi)", en: "They never eat meat.", id: "Mereka tidak pernah makan daging." },
  { type: "Continuous (Momen)", en: "They are eating fish tonight.", id: "Mereka sedang makan ikan malam ini." },
  { type: "Simple (Fakta)", en: "Cats like milk.", id: "Kucing suka susu." },
  { type: "Continuous (Sementara)", en: "The cat is sleeping on the bed.", id: "Kucing itu sedang tidur di kasur." },
  { type: "Stative (Mental)", en: "I remember you.", id: "Saya ingat kamu." },
  { type: "Continuous (Tindakan)", en: "I am thinking about it.", id: "Saya sedang memikirkannya." },
  { type: "Simple (Jadwal)", en: "The train leaves at 9 PM.", id: "Kereta berangkat jam 9 malam." },
  { type: "Continuous (Rencana)", en: "I am leaving tomorrow.", id: "Saya akan berangkat besok." }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Dengar! Bayi itu ___.",
    options: ['cries', 'is crying', 'cry'],
    answer: 'is crying',
    explanation: "'Dengar!' adalah sinyal bahwa sesuatu sedang terjadi sekarang (Continuous)."
  },
  {
    id: 2,
    question: "Saya biasanya ___ musik di mobil.",
    options: ['listen', 'am listening', 'listening'],
    answer: 'listen',
    explanation: "'Biasanya' menggambarkan kebiasaan (Simple)."
  },
  {
    id: 3,
    question: "Dia ___ (want) es krim.",
    options: ['is wanting', 'wants', 'want'],
    answer: 'wants',
    explanation: "'Want' adalah kata kerja stative. Kita tidak menggunakannya dengan -ing."
  },
  {
    id: 4,
    question: "Ke mana ___ kamu pergi?",
    options: ['do', 'are', 'is'],
    answer: 'are',
    explanation: "Dengan -ing (going), kita membutuhkan 'are' (To Be). 'Where are you going?'"
  },
  {
    id: 5,
    question: "Dia ___ bahasa Inggris setiap hari.",
    options: ['is studying', 'study', 'studies'],
    answer: 'studies',
    explanation: "'Setiap hari' menunjukkan rutinitas (Simple). He + studies."
  },
  {
    id: 6,
    question: "Dengar! Bayi itu ___.",
    options: ["cries","is crying","cry"],
    answer: "is crying",
    explanation: "'Dengar!' adalah sinyal bahwa sesuatu sedang terjadi sekarang (Continuous)."
  },
  {
    id: 7,
    question: "Saya biasanya ___ musik di mobil.",
    options: ["listen","am listening","listening"],
    answer: "listen",
    explanation: "'Biasanya' menggambarkan kebiasaan (Simple)."
  },
  {
    id: 8,
    question: "Dia ___ (want) es krim.",
    options: ["is wanting","wants","want"],
    answer: "wants",
    explanation: "'Want' adalah kata kerja stative. Kita tidak menggunakannya dengan -ing."
  },
  {
    id: 9,
    question: "Ke mana ___ kamu pergi?",
    options: ["do","are","is"],
    answer: "are",
    explanation: "Dengan -ing (going), kita membutuhkan 'are' (To Be). 'Where are you going?'"
  },
  {
    id: 10,
    question: "Dia ___ bahasa Inggris setiap hari.",
    options: ["is studying","study","studies"],
    answer: "studies",
    explanation: "'Setiap hari' menunjukkan rutinitas (Simple). My brother + studies."
  },
  {
    id: 11,
    question: "Dengar! Bayi itu ___.",
    options: ["cries","is crying","cry"],
    answer: "is crying",
    explanation: "'Dengar!' adalah sinyal bahwa sesuatu sedang terjadi sekarang (Continuous)."
  },
  {
    id: 12,
    question: "Saya biasanya ___ musik di mobil.",
    options: ["listen","am listening","listening"],
    answer: "listen",
    explanation: "'Biasanya' menggambarkan kebiasaan (Simple)."
  },
  {
    id: 13,
    question: "Dia ___ (want) es krim.",
    options: ["is wanting","wants","want"],
    answer: "wants",
    explanation: "'Want' adalah kata kerja stative. Kita tidak menggunakannya dengan -ing."
  },
  {
    id: 14,
    question: "Ke mana ___ kamu pergi?",
    options: ["do","are","is"],
    answer: "are",
    explanation: "Dengan -ing (going), kita membutuhkan 'are' (To Be). 'Where are you going?'"
  },
  {
    id: 15,
    question: "Dia ___ bahasa Inggris setiap hari.",
    options: ["is studying","study","studies"],
    answer: "studies",
    explanation: "'Setiap hari' menunjukkan rutinitas (Simple). He + studies."
  },
  {
    id: 16,
    question: "Dengar! Bayi itu ___.",
    options: ["cries","is crying","cry"],
    answer: "is crying",
    explanation: "'Dengar!' adalah sinyal bahwa sesuatu sedang terjadi sekarang (Continuous)."
  },
  {
    id: 17,
    question: "Saya biasanya ___ musik di mobil.",
    options: ["listen","am listening","listening"],
    answer: "listen",
    explanation: "'Biasanya' menggambarkan kebiasaan (Simple)."
  },
  {
    id: 18,
    question: "Dia ___ (want) es krim.",
    options: ["is wanting","wants","want"],
    answer: "wants",
    explanation: "'Want' adalah kata kerja stative. Kita tidak menggunakannya dengan -ing."
  },
  {
    id: 19,
    question: "Ke mana ___ kamu pergi?",
    options: ["do","are","is"],
    answer: "are",
    explanation: "Dengan -ing (going), kita membutuhkan 'are' (To Be). 'Where are you going?'"
  },
  {
    id: 20,
    question: "Dia ___ bahasa Inggris setiap hari.",
    options: ["is studying","study","studies"],
    answer: "studies",
    explanation: "'Setiap hari' menunjukkan rutinitas (Simple). He + studies."
  }
];

const ElemGrammarLesson5: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 5);
  const nextLessonPath = '/modul/english/elementary/grammar/lesson-6';
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
      lessonLabel={"Elementary Grammar Lesson 5"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Simple vs Continuous"
            subtitle="Grammar • Pelajaran 5"
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
                      className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendingUp className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Rutinitas atau Sekarang?</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Ini adalah perbedaan paling penting dalam kata kerja bahasa Inggris.
                    <br />
                    <b>Simple:</b> Apa yang terjadi secara teratur.
                    <br />
                    <b>Continuous:</b> Apa yang sedang terjadi saat ini.
                  </p>
                </div>
              </motion.section>

              {/* Comparison Cards */}
              <div className="grid gap-4 md:grid-cols-2">
                {COMPARISON.map((item, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${item.color.replace('bg-', 'border-').split(' ')[2]} relative overflow-hidden`}>
                    <div className="flex justify-between items-start relative z-10 mb-4">
                      <div>
                        <span className={`text-lg font-bold ${item.color.split(' ')[1]}`}>{item.title}</span>
                        <p className="text-xs text-[var(--color-text-muted)] font-bold uppercase mt-1 tracking-wide">{item.usage}</p>
                      </div>
                      <span className="text-3xl">{item.icon}</span>
                    </div>

                    <div className="bg-white/60 p-3 rounded-lg border border-[var(--color-border)]/50 mb-4">
                      <p className="text-sm font-bold text-[var(--color-text-primary)]">"{item.example}"</p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[var(--color-text-muted)] mb-2">Signal Words:</p>
                      <div className="flex flex-wrap gap-2">
                        {item.keywords.map((kw, i) => (
                          <span key={i} className="px-2 py-1 bg-white rounded-md text-xs font-medium border border-[var(--color-border)] text-[var(--color-text-secondary)]">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

<div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-red-500" />
                  Kata Kerja Stative (Tanpa -ING!)
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Beberapa kata kerja menggambarkan <b>keadaan</b> (perasaan, pikiran, kepemilikan), bukan tindakan. Kita biasanya <b>tidak</b> menggunakannya dalam bentuk Continuous.
                </p>

                <div className="space-y-3">
                  {STATIVE_VERBS.map((item, idx) => (
                    <div key={idx} className="bg-[var(--color-background)] p-4 rounded-xl border border-[var(--color-border)]">
                      <h4 className="font-black text-[var(--color-text-primary)] text-lg mb-2">{item.verb}</h4>
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle2 size={16} />
                          <span className="font-medium">{item.correct}</span>
                        </div>
                        <div className="flex items-center gap-2 text-red-400">
                          <XCircle size={16} />
                          <span className="line-through decoration-2">{item.wrong}</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
                <div className="bg-[var(--color-background)] px-6 py-4 border-b border-[var(--color-border)]">
                  <h3 className="font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                    <BookOpen size={20} />
                    20 Contoh Campuran
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Ketuk untuk mendengarkan.</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {EXAMPLES.map((item, idx) => (
                    <div key={idx} className="p-4 hover:bg-[var(--color-background)] transition-colors flex items-center justify-between group">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${item.type.includes("Stative") ? "bg-red-100 text-red-600" :
                            item.type.includes("Continuous") ? "bg-sky-100 text-sky-600" :
                              "bg-amber-100 text-amber-600"
                            }`}>
                            {item.type}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1">{item.en}</p>
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

export default ElemGrammarLesson5;
