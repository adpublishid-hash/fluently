import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Trophy, TrendingUp
} from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const MISTAKE_CATEGORIES = [
  {
    title: "Kata Kerja & Tenses",
    desc: "Jangan gunakan 'am' dengan kata kerja biasa. Hati-hati dengan 'Did'!",
    correct: "I agree. / I didn't go.",
    wrong: "I am agree. / I didn't went.",
    color: "bg-red-50 text-red-700 border-red-200",
    icon: "⚡"
  },
  {
    title: "Preposisi",
    desc: "Preposisi bahasa Inggris rumit. Hafalkan polanya.",
    correct: "Married to / Depends on",
    wrong: "Married with / Depends of",
    color: "bg-orange-50 text-orange-700 border-orange-200",
    icon: "📍"
  },
  {
    title: "Kata Sifat vs Keterangan",
    desc: "Good adalah kata sifat (adjective). Well adalah kata keterangan (adverb).",
    correct: "She plays well.",
    wrong: "She plays good.",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "🎨"
  }
];

const COMMON_ERRORS = [
  { type: "Verb", wrong: "I am agree.", correct: "I agree.", explanation: "Agree adalah verb, bukan adjective. Jangan gunakan 'am'." },
  { type: "Negative", wrong: "He don't like it.", correct: "He doesn't like it.", explanation: "Untuk He/She/It, gunakan 'Does' atau 'Doesn't'." },
  { type: "Preposition", wrong: "I am married with him.", correct: "I am married to him.", explanation: "Kita mengatakan 'Married TO' seseorang." },
  { type: "Verb Form", wrong: "I didn't went.", correct: "I didn't go.", explanation: "Setelah 'didn't', gunakan kata kerja DASAR." },
  { type: "Adjective", wrong: "I am boring.", correct: "I am bored.", explanation: "Boring = Membuat bosan. Bored = Merasa bosan." },
  { type: "Preposition", wrong: "It depends of the weather.", correct: "It depends on the weather.", explanation: "Selalu 'Depends ON'." },
  { type: "Noun", wrong: "I have many informations.", correct: "I have a lot of information.", explanation: "'Information' tidak dapat dihitung (Tanpa 's')." },
  { type: "Verb", wrong: "I lost the bus.", correct: "I missed the bus.", explanation: "Gunakan 'Miss' untuk transportasi, 'Lose' untuk benda." },
  { type: "Adverb", wrong: "She sings good.", correct: "She sings well.", explanation: "Jelaskan tindakan dengan 'Well' (Adverb)." },
  { type: "Structure", wrong: "I like very much pizza.", correct: "I like pizza very much.", explanation: "Letakkan 'very much' di akhir." },
  { type: "Verb", wrong: "Can you borrow me a pen?", correct: "Can you lend me a pen?", explanation: "Borrow = Meminjam (mengambil). Lend = Meminjamkan (memberi)." },
  { type: "Modal", wrong: "I must to go.", correct: "I must go.", explanation: "Tidak ada 'to' setelah modal (can, must, should)." },
  { type: "Age", wrong: "I have 25 years.", correct: "I am 25 years old.", explanation: "Gunakan 'To Be' (am/is/are) untuk umur." },
  { type: "Noun", wrong: "There are many peoples.", correct: "There are many people.", explanation: "'People' sudah jamak." },
  { type: "Verb", wrong: "Explain me this.", correct: "Explain this to me.", explanation: "Explain SESUATU kepada SESEORANG." },
  { type: "Comparison", wrong: "More better.", correct: "Better.", explanation: "'Better' sudah komparatif. Tidak perlu 'more'." },
  { type: "Preposition", wrong: "I am good in English.", correct: "I am good at English.", explanation: "Good AT / Bad AT sesuatu." },
  { type: "Question", wrong: "Where you go?", correct: "Where do you go?", explanation: "Kamu butuh kata kerja bantu (Do/Does) untuk pertanyaan." },
  { type: "Phrase", wrong: "Same to you.", correct: "The same to you / You too.", explanation: "'Same to you' bisa terdengar kasar. 'You too' lebih aman." },
  { type: "Tense", wrong: "I am knowing him.", correct: "I know him.", explanation: "'Know' adalah state verb. Tidak pakai -ing." }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Which sentence is correct?",
    options: ['I agreeing with you.', 'I am agree with you.', 'I agree with you.'],
    answer: 'I agree with you.',
    explanation: "'Agree' adalah kata kerja. Ini bertindak seperti 'I eat' atau 'I sleep'. Tidak perlu 'am'."
  },
  {
    id: 2,
    question: "I am married ___ a doctor.",
    options: ['with', 'to', 'by'],
    answer: 'to',
    explanation: "Preposisi yang benar adalah 'Married TO'."
  },
  {
    id: 3,
    question: "I ___ the bus this morning.",
    options: ['missed', 'losed', 'lost'],
    answer: 'missed',
    explanation: "Kita mengatakan 'Miss a bus/train/flight'. 'Lose' untuk kunci atau uang."
  },
  {
    id: 4,
    question: "He plays football very ___.",
    options: ['good', 'well', 'goodly'],
    answer: 'well',
    explanation: "'Play' adalah tindakan. Jelaskan tindakan dengan Adverbia (Well)."
  },
  {
    id: 5,
    question: "It depends ___ the price.",
    options: ['from', 'on', 'of'],
    answer: 'on',
    explanation: "Selalu 'Depends ON'."
  },
  {
    id: 6,
    question: "Which sentence is correct?",
    options: ["I agreeing with you.", "I am agree with you.", "I agree with you."],
    answer: "I agree with you.",
    explanation: "'Agree' adalah kata kerja. Ini bertindak seperti 'I eat' atau 'I sleep'. Tidak perlu 'am'."
  },
  {
    id: 7,
    question: "I am married ___ a doctor.",
    options: ["with","to","by"],
    answer: "to",
    explanation: "Preposisi yang benar adalah 'Married TO'."
  },
  {
    id: 8,
    question: "I ___ the bus this morning.",
    options: ["missed", "losed", "lost"],
    answer: "missed",
    explanation: "Kita mengatakan 'Miss a bus/train/flight'. 'Lose' untuk kunci atau uang."
  },
  {
    id: 9,
    question: "My brother plays chess very ___.",
    options: ["good","goodly","well"],
    answer: "well",
    explanation: "'Play' adalah tindakan. Jelaskan tindakan dengan Adverbia (Well)."
  },
  {
    id: 10,
    question: "It depends ___ the price.",
    options: ["from", "on", "of"],
    answer: "on",
    explanation: "Selalu 'Depends ON'."
  },
  {
    id: 11,
    question: "Which sentence is correct?",
    options: ["I agreeing with you.", "I am agree with you.", "I agree with you."],
    answer: "I agree with you.",
    explanation: "'Agree' adalah kata kerja. Ini bertindak seperti 'I eat' atau 'I sleep'. Tidak perlu 'am'."
  },
  {
    id: 12,
    question: "I am married ___ a doctor.",
    options: ["with","to","by"],
    answer: "to",
    explanation: "Preposisi yang benar adalah 'Married TO'."
  },
  {
    id: 13,
    question: "I ___ the bus this morning.",
    options: ["missed", "losed", "lost"],
    answer: "missed",
    explanation: "Kita mengatakan 'Miss a bus/train/flight'. 'Lose' untuk kunci atau uang."
  },
  {
    id: 14,
    question: "Mark plays football very ___.",
    options: ["well", "goodly", "good"],
    answer: "well",
    explanation: "'Play' adalah tindakan. Jelaskan tindakan dengan Adverbia (Well)."
  },
  {
    id: 15,
    question: "It depends ___ the price.",
    options: ["from", "on", "of"],
    answer: "on",
    explanation: "Selalu 'Depends ON'."
  },
  {
    id: 16,
    question: "Which sentence is correct?",
    options: ["I agreeing with you.", "I am agree with you.", "I agree with you."],
    answer: "I agree with you.",
    explanation: "'Agree' adalah kata kerja. Ini bertindak seperti 'I eat' atau 'I sleep'. Tidak perlu 'am'."
  },
  {
    id: 17,
    question: "I am married ___ a doctor.",
    options: ["with","to","by"],
    answer: "to",
    explanation: "Preposisi yang benar adalah 'Married TO'."
  },
  {
    id: 18,
    question: "I ___ the bus this morning.",
    options: ["missed", "losed", "lost"],
    answer: "missed",
    explanation: "Kita mengatakan 'Miss a bus/train/flight'. 'Lose' untuk kunci atau uang."
  },
  {
    id: 19,
    question: "He plays football very ___.",
    options: ["great", "well", "goodly"],
    answer: "well",
    explanation: "'Play' adalah tindakan. Jelaskan tindakan dengan Adverbia (Well)."
  },
  {
    id: 20,
    question: "It depends ___ the price.",
    options: ["from", "on", "of"],
    answer: "on",
    explanation: "Selalu 'Depends ON'."
  }
];

const ElemGrammarLesson19: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 19);
  const nextLessonPath = '/modul/english/elementary/grammar/lesson-20';
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
      lessonLabel={"Elementary Grammar Lesson 19"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Kesalahan Umum"
            subtitle="Grammar • Pelajaran 19"
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
                      className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendingUp className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Hentikan Kesalahan!</h2>
                  <p className="text-red-100 text-sm leading-relaxed">
                    Kesalahan kecil bisa membuat bahasa Inggrismu terdengar tidak alami.
                    Ayo perbaiki kesalahan paling umum yang dilakukan pelajar.
                  </p>
                </div>
              </motion.section>

              {/* Categories */}
              <div className="grid gap-4">
                {MISTAKE_CATEGORIES.map((cat, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${cat.color.replace('bg-', 'border-').split(' ')[2]} relative`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`text-xl font-bold ${cat.color.split(' ')[1]}`}>{cat.title}</h3>
                      </div>
                      <span className="text-3xl">{cat.icon}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4">{cat.desc}</p>

                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2 text-sm bg-red-50 p-2 rounded text-red-600 border border-red-100">
                        <XCircle size={16} />
                        <span className="line-through decoration-2 opacity-70">{cat.wrong}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm bg-green-50 p-2 rounded text-green-700 border border-sky-100">
                        <CheckCircle2 size={16} />
                        <span className="font-bold">{cat.correct}</span>
                      </div>
                    </div>
                  </div>
                ))}
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
                    20 Kesalahan Teratas
                  </h3>
                  <p className="text-xs text-indigo-600 mt-1">Ketuk kalimat yang benar untuk mendengarkan.</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {COMMON_ERRORS.map((item, idx) => (
                    <div key={idx} className="p-4 hover:bg-[var(--color-background)] transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold bg-gray-100 text-[var(--color-text-muted)] px-2 py-1 rounded uppercase tracking-wide">{item.type}</span>
                        <button
                          onClick={() => playSound(item.correct)}
                          className="w-8 h-8 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-text-muted)] flex items-center justify-center hover:border-sky-300 hover:text-green-600 transition-all"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start gap-3 opacity-60">
                          <XCircle size={20} />
                          <p className="text-sm font-medium text-red-800 line-through decoration-red-400">{item.wrong}</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 size={20} />
                          <p className="text-sm font-bold text-green-800">{item.correct}</p>
                        </div>
                      </div>

                      <div className="mt-3 pl-8">
                        <p className="text-xs text-[var(--color-text-muted)] italic bg-yellow-50 p-2 rounded border border-yellow-100">
                          💡 {item.explanation}
                        </p>
                      </div>
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

export default ElemGrammarLesson19;
