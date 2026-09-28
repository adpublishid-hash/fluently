import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, PlayCircle, Lightbulb, CheckCircle2, XCircle, BookOpen, PenTool, ChevronLeft, Star, TrendingUp } from 'lucide-react';
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



const STRESS_COMPARISONS = [
   {
      id: 1,
      sentence: "Dogs chase cats.",
      robot: "Dogs. Chase. Cats.",
      human: "DOGS CHASE CATS.",
      pattern: ["big", "big", "big"],
      explanation: "Semua kata penting (Kata Isi), jadi semuanya ditekan."
   },
   {
      id: 2,
      sentence: "The dogs chase the cats.",
      robot: "The. Dogs. Chase. The. Cats.",
      human: "The DOGS CHASE the CATS.",
      pattern: ["small", "big", "big", "small", "big"],
      explanation: "'The' hanya tata bahasa (Kata Fungsi). Kita mengucapkannya dengan cepat dan lemah."
   },
   {
      id: 3,
      sentence: "I want to go to the park.",
      robot: "I. Want. To. Go. To. The. Park.",
      human: "I WANT to GO to the PARK.",
      pattern: ["small", "big", "small", "big", "small", "small", "big"],
      explanation: "Fokus pada WANT, GO, dan PARK. Sisanya hanya 'perekat'."
   }
];

const WORD_TYPES = [
   {
      title: "?? Kata Kuat (Isi)",
      desc: "Ditekan. Lebih Keras. Lebih Panjang.",
      examples: ["Nouns (Cat, House)", "Verbs (Run, Eat)", "Adjectives (Big, Red)", "Adverbs (Fast, Now)", "Negatives (Not, Don't)"],
      color: "bg-emerald-50 text-emerald-800 border-blue-200"
   },
   {
      title: "?? Kata Lemah (Fungsi)",
      desc: "Tak Ditekan. Lebih Pelan. Sangat Cepat.",
      examples: ["Pronouns (I, You, He)", "Prepositions (in, on, at)", "Articles (a, an, the)", "Be Verbs (is, are, was)", "Conjunctions (and, but)"],
      color: "bg-[var(--color-background)] text-[var(--color-text-secondary)] border-[var(--color-border)]"
   }
];

const QUIZ_QUESTIONS = [
   {
      id: 1,
      question: "Kata mana yang ditekan dalam: 'She eats apples'?",
      options: ['She, Eats', 'Eats, Apples', 'She, Apples'],
      answer: 'Eats, Apples',
      explanation: "Verb (Eats) dan Noun (Apples) adalah kata isi. 'She' adalah kata ganti (lemah)."
   },
   {
      id: 2,
      question: "Dengarkan iramanya: 'Fish and Chips'.",
      options: ['? ? ? (Tiga ketukan kuat)', '? o ? (Kuat-Lemah-Kuat)'],
      answer: '? o ? (Kuat-Lemah-Kuat)',
      audioText: "Fish and Chips",
      explanation: "'Fish' dan 'Chips' adalah kata benda kuat. 'And'adalah konjungsi lemah (sering diucapkan 'n')."
   },
   {
      id: 3,
      question: "Kata mana yang biasanya TIDAK DITEKAN (Lemah)?",
      options: ['House', 'Beautiful', 'The'],
      answer: 'The',
      explanation: "'The' adalah artikel (kata fungsi) dan biasanya diucapkan sangat cepat."
   },
   {
      id: 4,
      question: "Bahasa Inggris adalah bahasa ___.",
      options: ['Syllable-timed (Senapan Mesin)', 'Stress-timed (Detak Jantung)'],
      answer: 'Stress-timed (Detak Jantung)',
      explanation: "Irama bahasa Inggris bergantung pada ketukan suku kata yang ditekan, bukan jumlah suku kata."
   },
   {
      id: 5,
      question: "Kata mana yang ditekan dalam: 'I love cats'?",
      options: ['I, Cats', 'Love, Cats', 'I, Love'],
      answer: 'Love, Cats',
      explanation: "Love (verb) dan Cats (noun) adalah kata isi yang ditekan."
   },
   {
      id: 6,
      question: "Manakah yang termasuk KATA ISI (Content Words)?",
      options: ['The, A, An', 'Run, Happy, Book', 'Is, Are, Was'],
      answer: 'Run, Happy, Book',
      explanation: "Kata benda, kata kerja, dan kata sifat adalah kata isi yang ditekan."
   },
   {
      id: 7,
      question: "Kata mana yang TIDAK ditekan dalam: 'The dog is  big'?",
      options: ['Dog', 'The, Is', 'Big'],
      answer: 'The, Is',
      audioText: "The dog is big",
      explanation: "'The' (artikel) dan 'is' (be verb) adalah kata fungsi yang lemah."
   },
   {
      id: 8,
      question: "Manakah yang termasuk KATA FUNGSI (Function Words)?",
      options: ['Cat, Run, Fast', 'In, On, The', 'Beautiful, Happy, Slow'],
      answer: 'In, On, The',
      explanation: "Preposisi dan artikel adalah kata fungsi yang tidak ditekan."
   },
   {
      id: 9,
      question: "Kata mana yang ditekan dalam: 'He runs fast'?",
      options: ['He, Fast', 'Runs, Fast', 'He, Runs'],
      answer: 'Runs, Fast',
      audioText: "He runs fast",
      explanation: "Runs (verb) dan Fast (adverb) adalah kata isi yang ditekan."
   },
   {
      id: 10,
      question: "Irama bahasa Inggris bergantung pada...",
      options: ['Jumlah suku kata', 'Kata yang ditekan', 'Jumlah huruf'],
      answer: 'Kata yang ditekan',
      explanation: "Bahasa Inggris stress-timed: irama dibuat oleh kata-kata yang ditekan."
   },
   {
      id: 11,
      question: "Kata mana yang ditekan dalam: 'I want to go'?",
      options: ['I, To', 'Want, Go', 'To, Go'],
      answer: 'Want, Go',
      audioText: "I want to go",
      explanation: "Want dan Go adalah kata kerja (kata isi) yang ditekan."
   },
   {
      id: 12,
      question: "Pronoun (I, You, He, She) biasanya...",
      options: ['Ditekan kuat', 'Tidak ditekan', 'Kadang ditekan'],
      answer: 'Tidak ditekan',
      explanation: "Pronoun adalah kata fungsi yang biasanya diucapkan cepat dan lemah."
   },
   {
      id: 13,
      question: "Kata mana yang ditekan dalam: 'Cats and dogs'?",
      options: ['Cats, And, Dogs', 'Cats, Dogs', 'And, Dogs'],
      answer: 'Cats, Dogs',
      audioText: "Cats and dogs",
      explanation: "Cats dan Dogs adalah kata benda (kata isi). 'And' adalah konjungsi lemah."
   },
   {
      id: 14,
      question: "Artikel (a, an, the) biasanya...",
      options: ['Ditekan kuat', 'Tidak ditekan', 'Selalu ditekan'],
      answer: 'Tidak ditekan',
      explanation: "Artikel adalah kata fungsi yang sangat lemah dan cepat."
   },
   {
      id: 15,
      question: "Kata mana yang ditekan dalam: 'She is happy'?",
      options: ['She, Is', 'Is, Happy', 'She, Happy'],
      answer: 'She, Happy',
      audioText: "She is happy",
      explanation: "She (untuk penekanan konteks) dan Happy (adjective) ditekan. 'Is' lemah."
   },
   {
      id: 16,
      question: "Negatives (not, don't, can't) biasanya...",
      options: ['Tidak ditekan', 'Ditekan kuat', 'Sangat lemah'],
      answer: 'Ditekan kuat',
      explanation: "Kata negatif biasanya ditekan karena penting untuk makna."
   },
   {
      id: 17,
      question: "Kata mana yang ditekan dalam: 'I don't like it'?",
      options: ['I, It', "Don't, Like", 'Like, It'],
      answer: "Don't, Like",
      audioText: "I don't like it",
        explanation: "Don't (negative) dan Like (verb) adalah kata penting yang ditekan."
   },
   {
      id: 18,
      question: "Prepositions (in, on, at) biasanya...",
      options: ['Ditekan kuat', 'Tidak ditekan', 'Kadang ditekan'],
      answer: 'Tidak ditekan',
      explanation: "Preposisi adalah kata fungsi yang lemah."
   },
   {
      id: 19,
      question: "Kata mana yang ditekan dalam: 'Go to the park'?",
      options: ['Go, Park', 'To, Park', 'The, Park'],
      answer: 'Go, Park',
      audioText: "Go to the park",
      explanation: "Go (verb) dan Park (noun) adalah kata isi. 'To' dan 'the' lemah."
   },
   {
      id: 20,
      question: "Kenapa kita tidak menekan semua kata dalam bahasa Inggris?",
      options: ['Terlalu lelah', 'Untuk membuat irama alami', 'Tidak ada alasan'],
      answer: 'Untuk membuat irama alami',
      explanation: "Bahasa Inggris memiliki irama stress-timed yang membuat ucapan alami dan musikal."
   }
];

const PronunLesson6: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/pronunciation/lesson-7';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedPronunLessons().includes(6));
  const [showPronunModal, setShowPronunModal] = React.useState(false);
  const handleSelesai = () => { markPronunComplete(6); setIsCompleted(true); setShowPronunModal(true); };

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
          Kamu telah menyelesaikan <b>Pronunciation Lesson 6</b>. Terus semangat!
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

   // Quiz State
   const [quizStep, setQuizStep] = useState(0);
   const [quizScore, setQuizScore] = useState(0);
   const [showResult, setShowResult] = useState(false);
   const [selectedOption, setSelectedOption] = useState<string | null>(null);
   const [isAnswerChecked, setIsAnswerChecked] = useState(false);

   // Audio Handler
   const playSound = (text: string, rate: number = 0.9) => { playAudio(text, rate); };

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
            title="Irama Kalimat"
            subtitle="Pronunciation • Pelajaran 6"
            accentColor="#E83E8C"
            nextLesson={'/modul/english/beginner/pronunciation/lesson-7'}
            tabs={[
                { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
                { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> },
                { id: 'quiz', label: 'Kuis', icon: <Star size={14} /> },
            ]}
            footer={() => (
                <button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #E83E8C, #E83E8Cbb)' }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai \u2713' : 'Selesai'}
                </button>
            )}
        >
            {(tabId) => tabId === 'learn' ? (
                <div className="space-y-6">
                     <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                           <TrendingUp size={96} />
                        </div>
                        <div className="relative z-10">
                           <h2 className="text-xl font-bold mb-2">Bahasa Inggris punya Irama! 🥁</h2>
                           <p className="text-emerald-50 text-sm leading-relaxed">
                              Bahasa Inggris tidak diucapkan seperti robot (bip-bip-bip). <br />
                              Melainkan diucapkan seperti musik, dengan irama (da-DA-da-DA).<br />
                              Kita hanya menekan <b>kata-kata penting</b>.
                           </p>
                        </div>
                     </motion.section>

                     <div className="mt-6 space-y-4">
                        <h3 className="font-bold text-[var(--color-text-primary)] px-1">Dengarkan bedanya:</h3>

                        {STRESS_COMPARISONS.map((item) => (
                           <div key={item.id} className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-[var(--shadow-card)]">
                              <div className="flex gap-2 mb-4">
                                 <button
                                    onClick={() => playSound(item.robot, 0.6)}
                                    className="flex-1 bg-gray-100 text-[var(--color-text-secondary)] py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                                 >
                                    <span className="text-lg">🤖</span> Robot
                                 </button>
                                 <button
                                    onClick={() => playSound(item.human, 0.9)}
                                    className="flex-1 bg-emerald-100 text-emerald-700 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-200 transition-colors"
                                 >
                                    <span className="text-lg">🗣️</span> Human
                                 </button>
                              </div>

                              <p className="text-center font-medium text-[var(--color-text-primary)] mb-4 text-lg">
                                 {item.human.split(' ').map((word, i) => {
                                    const isStrong = item.pattern[i] === 'big';
                                    return (
                                       <span key={i} className={isStrong ? "font-black text-emerald-600 text-xl mx-1" : "font-normal text-[var(--color-text-muted)] text-sm mx-1"}>
                                          {word}
                                       </span>
                                    )
                                 })}
                              </p>

                              <div className="flex justify-center items-end gap-2 h-8">
                                 {item.pattern.map((size, i) => (
                                    <div
                                       key={i}
                                       className={`rounded-full transition-all duration-300 ${size === 'big' ? 'w-4 h-4 bg-emerald-500 mb-1' : 'w-2 h-2 bg-gray-300 mb-2'}`}
                                    ></div>
                                 ))}
                              </div>
                           </div>
                        ))}
                     </div>
                     

                     <div className="bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-card)] mt-6">
                        <h3 className="font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
                           <Lightbulb size={20} className="text-yellow-500" />
                           Aturan
                        </h3>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                           Kita menekan <b>Kata Isi</b> (makna) dan memeras <b>Kata Fungsi</b> (tata bahasa) agar pas dengan irama.
                        </p>
                     </div>

                     <div className="grid gap-4 mt-6">
                        {WORD_TYPES.map((type, idx) => (
                           <div key={idx} className={`rounded-2xl border p-5 ${type.color.replace('bg-slate-50', 'bg-[var(--color-background)]').replace('border-slate-200', 'border-[var(--color-border)]').replace('text-slate-600', 'text-[var(--color-text-secondary)]')}`}>
                              <h4 className="font-bold text-lg mb-1">{type.title}</h4>
                              <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-4">{type.desc}</p>

                              <div className="flex flex-wrap gap-2">
                                 {type.examples.map((ex, i) => (
                                    <span key={i} className="bg-white/60 px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm shadow-sm border border-black/5">
                                       {ex}
                                    </span>
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
                >
                    <div className="space-y-6">
                   <div className="max-w-xl mx-auto text-center pt-4">
                     <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-100/50 border border-blue-50 relative overflow-hidden">

                        <div className="absolute top-0 right-0 p-6 opacity-5">
                           <Volume2 size={128} />
                        </div>

                        <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-[var(--color-text-muted)] text-xs font-bold mb-6">
                           Latihan {practiceIndex + 1} dari {STRESS_COMPARISONS.length}
                        </span>

                        <div className="mb-8 relative z-10">
                           <div className="flex flex-wrap justify-center items-baseline gap-2 mb-6">
                              {STRESS_COMPARISONS[practiceIndex].human.split(' ').map((word, i) => {
                                 const isStrong = STRESS_COMPARISONS[practiceIndex].pattern[i] === 'big';
                                 return (
                                    <span key={i} className={`transition-all duration-300 ${isStrong ? "text-2xl font-black text-emerald-600 scale-110" : "text-base font-normal text-[var(--color-text-muted)]"}`}>
                                       {word}
                                    </span>
                                 )
                              })}
                           </div>

                           <div className="flex justify-center items-end gap-3 h-12 mb-8 flex-wrap">
                              {STRESS_COMPARISONS[practiceIndex].pattern.map((size, i) => (
                                 <div
                                    key={i}
                                    className={`rounded-full shadow-sm ${size === 'big' ? 'w-6 h-6 bg-emerald-500 animate-pulse' : 'w-2 h-2 bg-gray-300'}`}
                                 ></div>
                              ))}
                           </div>

                           <button
                              onClick={() => playSound(STRESS_COMPARISONS[practiceIndex].human)}
                              className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-200"
                           >
                              <PlayCircle size={40} />
                           </button>
                           <p className="text-xs text-[var(--color-text-muted)] mt-4 font-medium">Ketuk untuk mendengar irama</p>
                        </div>

                        <div className="flex justify-between mt-8 pt-6 border-t border-gray-50">
                           <button
                              onClick={() => setPracticeIndex(prev => Math.max(0, prev - 1))}
                              disabled={practiceIndex === 0}
                              className="text-[var(--color-text-muted)] font-bold text-sm hover:text-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                           >
                              <ChevronLeft size={16} /> Prev
                           </button>
                           <button
                              onClick={() => setPracticeIndex(prev => Math.min(STRESS_COMPARISONS.length - 1, prev + 1))}
                              disabled={practiceIndex === STRESS_COMPARISONS.length - 1}
                              className="text-[var(--color-text-muted)] font-bold text-sm hover:text-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                           >
                              Next <ChevronLeft size={16} className="rotate-180" />
                           </button>
                        </div>
                     </div>
                  </div>
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
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                         <div className="flex justify-between items-center mb-6">
                            <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                            <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                         </div>
                         <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6 flex flex-col gap-2">
                            {QUIZ_QUESTIONS[quizStep].question}
                            {QUIZ_QUESTIONS[quizStep].audioText && (
                               <button
                                  onClick={() => playSound(QUIZ_QUESTIONS[quizStep].audioText || "")}
                                  className="self-start mt-2 flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-emerald-200 transition-colors"
                               >
                                  <Volume2 size={16} /> Dengar
                               </button>
                            )}
                         </h3>
                         <div className="space-y-3">
                            {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                               let btnClass = "border-[var(--color-border)] hover:border-blue-300 hover:bg-gray-50";
                               if (isAnswerChecked) {
                                  if (option === QUIZ_QUESTIONS[quizStep].answer) btnClass = "bg-green-50 border-sky-500 text-green-700";
                                  else if (option === selectedOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                                  else btnClass = "opacity-50 border-[var(--color-border)]";
                               }
                               return (
                                  <button key={idx} onClick={() => handleCheckQuiz(option)} disabled={isAnswerChecked} className={`w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${btnClass}`}>
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
                               <button onClick={nextQuizQuestion} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg">
                                  {quizStep < QUIZ_QUESTIONS.length - 1 ? 'Pertanyaan Selanjutnya →' : 'Lihat Hasil'}
                               </button>
                            </div>
                         )}
                      </div>
                   ) : (
                      <div className="text-center py-8">
                         <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500"><Star size={40} /></div>
                         <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Kuis Selesai! 🎉</h2>
                         <p className="text-[var(--color-text-muted)] mb-2">Skor kamu:</p>
                         <p className="text-4xl font-black text-emerald-600 mb-6">{quizScore} <span className="text-xl font-normal text-[var(--color-text-muted)]">/ {QUIZ_QUESTIONS.length}</span></p>
                         <button onClick={restartQuiz} className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-blue-200">Ulangi Kuis</button>
                      </div>
                   )}
                </motion.div>
            )}
        </LessonShell>
    </>
  );
};

export default PronunLesson6;
