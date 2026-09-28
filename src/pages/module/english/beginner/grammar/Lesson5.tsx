import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle2, XCircle, BookOpen, PenTool, Home, Star } from 'lucide-react';
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



const STRUCTURES = [
  {
    label: "Positif (+)",
    desc: "Menyatakan keberadaan.",
    formula: ["There is + Singular/Uncountable", "There are + Plural"],
    examples: [
      { text: "There is a cat on the sofa.", icon: "🐱" },
      { text: "There are two dogs in the garden.", icon: "🐶🐶" }
    ],
    color: "bg-emerald-50 text-emerald-700 border-blue-200"
  },
  {
    label: "Negatif (-)",
    desc: "Menyatakan ketidakberadaan.",
    formula: ["There isn't (is not)", "There aren't (are not)"],
    examples: [
      { text: "There isn't a cloud in the sky.", icon: "☀️" },
      { text: "There aren't any cookies left.", icon: "🍪" }
    ],
    color: "bg-red-50 text-red-700 border-red-200"
  },
  {
    label: "Pertanyaan (?)",
    desc: "Menanyakan keberadaan.",
    formula: ["Is there...?", "Are there...?"],
    examples: [
      { text: "Is there a bathroom here?", icon: "🚽" },
      { text: "Are there any questions?", icon: "❓" }
    ],
    color: "bg-blue-50 text-blue-700 border-blue-200"
  }
];

const NOUN_RULES = [
  {
    title: "Tunggal (1)",
    rule: "Gunakan 'There is'. Biasanya dengan 'a' atau 'an'.",
    example: "There is a car.",
    subtext: "Kita sering menyingkatnya menjadi 'There's'.",
    icon: "1️⃣"
  },
  {
    title: "Jamak (2+)",
    rule: "Gunakan 'There are'. Dengan angka atau 'some/many'.",
    example: "There are five cars.",
    subtext: "Kita TIDAK menyingkat 'There are'.",
    icon: "🔢"
  },
  {
    title: "Tak Dapat Dihitung",
    rule: "Gunakan 'There is'. Untuk benda yang tak bisa dihitung.",
    example: "There is water / milk / sugar.",
    subtext: "Perlakukan seperti Tunggal.",
    icon: "💧"
  }
];

const PRACTICE_SENTENCES = [
  { id: 1, text: "___ a spider in the bath.", correct: "There is", type: "Tunggal", hint: "Hanya satu laba-laba." },
  { id: 2, text: "___ three apples in the bowl.", correct: "There are", type: "Jamak", hint: "Tiga itu jamak." },
  { id: 3, text: "___ any milk in the fridge?", correct: "Is there", type: "Pertanyaan (Tak Dapat Dihitung)", hint: "Susu tak dapat dihitung." },
  { id: 4, text: "___ many people at the party.", correct: "There are", type: "Jamak", hint: "People (orang-orang) itu jamak." },
  { id: 5, text: "___ a TV in your room?", correct: "Is there", type: "Pertanyaan (Tunggal)", hint: "Sebuah TV adalah satu benda." },
  { id: 6, text: "___ no water left.", correct: "There is", type: "Tak Dapat Dihitung", hint: "Air tak dapat dihitung." },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "___ five students in the class.",
    options: ['There is', 'There are', 'Is there'],
    answer: 'There are',
    explanation: "'Five students' adalah jamak, jadi kita gunakan 'There are'."
  },
  {
    id: 2,
    question: "___ a pen on the table.",
    options: ['There is', 'There are', 'Are there'],
    answer: 'There is',
    explanation: "'A pen' adalah tunggal, jadi kita gunakan 'There is'."
  },
  {
    id: 3,
    question: "___ any water in the bottle?",
    options: ['Is there', 'Are there', 'There is'],
    answer: 'Is there',
    explanation: "Air (water) tidak bisa dihitung (tunggal), dan ini adalah pertanyaan."
  },
  {
    id: 4,
    question: "There ___ some milk in the fridge.",
    options: ['is', 'are', 'be'],
    answer: 'is',
    explanation: "Susu (milk) adalah kata benda tak bisa dihitung (selalu tunggal)."
  },
  {
    id: 5,
    question: "___ many cars on the road.",
    options: ['There is', 'There are', 'There'],
    answer: 'There are',
    explanation: "'Cars' adalah jamak, jadi gunakan 'There are'."
  },
  {
    id: 6,
    question: "___ a problem?",
    options: ['Is there', 'Are there', 'There is'],
    answer: 'Is there',
    explanation: "'A problem' tunggal, bentuk tanya dibalik jadi 'Is there'."
  },
  {
    id: 7,
    question: "There ___ no money left.",
    options: ['is', 'are', 'were'],
    answer: 'is',
    explanation: "'Money' (uang) dianggap uncountable (tunggal) dalam grammar."
  },
  {
    id: 8,
    question: "___ two cats under the chair.",
    options: ['There is', 'There are', 'Is there'],
    answer: 'There are',
    explanation: "'Two cats' = jamak -> There are."
  },
  {
    id: 9,
    question: "There ___ an apple on the desk.",
    options: ['is', 'are', 'am'],
    answer: 'is',
    explanation: "'An apple' = tunggal -> There is."
  },
  {
    id: 10,
    question: "___ any people here?",
    options: ['Is there', 'Are there', 'There are'],
    answer: 'Are there',
    explanation: "'People' (orang-orang) adalah jamak -> Are there."
  },
  {
    id: 11,
    question: "There ___ some information for you.",
    options: ['is', 'are', 'have'],
    answer: 'is',
    explanation: "'Information' adalah uncountable (tak bisa dihitung) -> There is."
  },
  {
    id: 12,
    question: "___ clouds in the sky today.",
    options: ['There is', 'There are', 'Are there'],
    answer: 'There are',
    explanation: "'Clouds' (awan-awan) = jamak -> There are."
  },
  {
    id: 13,
    question: "___ a hotel near here?",
    options: ['Is there', 'Are there', 'There is'],
    answer: 'Is there',
    explanation: "Pertanyaan untuk tempat tunggal 'a hotel'."
  },
  {
    id: 14,
    question: "There ___ lots of sugar in this tea.",
    options: ['is', 'are', 'were'],
    answer: 'is',
    explanation: "'Sugar' (gula) = uncountable noun -> is."
  },
  {
    id: 15,
    question: "There ___ one teacher and ten students.",
    options: ['is', 'are', 'has'],
    answer: 'is',
    explanation: "Kita ikuti kata benda PERTAMA (one teacher), jadi gunakan 'is'."
  },
  {
    id: 16,
    question: "___ any questions?",
    options: ['Is there', 'Are there', 'There is'],
    answer: 'Are there',
    explanation: "'Questions' = jamak -> Are there."
  },
  {
    id: 17,
    question: "There ___ nothing we can do.",
    options: ['is', 'are', 'be'],
    answer: 'is',
    explanation: "'Nothing' diperlakukan sebagai tunggal."
  },
  {
    id: 18,
    question: "There ___ three books on the shelf.",
    options: ['is', 'are', 'was'],
    answer: 'are',
    explanation: "'Three books' = jamak."
  },
  {
    id: 19,
    question: "___ a good movie on TV?",
    options: ['Is there', 'Are there', 'There'],
    answer: 'Is there',
    explanation: "Pertanyaan tunggal 'a movie'."
  },
  {
    id: 20,
    question: "There ___ children in the park.",
    options: ['is', 'are', 'am'],
    answer: 'are',
    explanation: "'Children' (anak-anak) adalah jamak."
  }
];

const GrammarLesson5: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/grammar/lesson-6';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(5));
  const [showGrammarModal, setShowGrammarModal] = React.useState(false);
  const handleSelesai = () => { markGrammarComplete(5); setIsCompleted(true); setShowGrammarModal(true); };
  
  // Practice State
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceResult, setPracticeResult] = useState<'correct' | 'incorrect' | null>(null);

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string) => { playAudio(text, 0.9); };

  // Practice Logic
  const checkPractice = (option: string) => {
    if (practiceResult) return;

    const current = PRACTICE_SENTENCES[practiceIndex];
    if (option === current.correct) {
      setPracticeResult('correct');
      playSound("Correct!");
    } else {
      setPracticeResult('incorrect');
      playSound("Try again.");
    }

    setTimeout(() => {
      setPracticeResult(null);
      if (practiceIndex < PRACTICE_SENTENCES.length - 1) {
        setPracticeIndex(prev => prev + 1);
      } else {
        alert("Practice Complete! Try the Quiz.");
        setPracticeIndex(0);
      }
    }, 1500);
  };

  // Quiz Logic
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

  const grammarModal = showGrammarModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowGrammarModal(false)}>
      <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44AD99)' }}>
          <span style={{ fontSize: 36 }}>🏆</span>
        </div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Pelajaran Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Grammar Lesson 5</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowGrammarModal(false); navigate('/modul/english/beginner/grammar/lesson-6'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADbb)' }}>Next ›</button>
          <button onClick={() => { setShowGrammarModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    {grammarModal}
    <LessonShell
            title="There is / There are"
            subtitle="Grammar • Pelajaran 5"
            accentColor="#8E44AD"
            nextLesson={'/modul/english/beginner/grammar/lesson-6'}
            tabs={[
                { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
                { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> },
                { id: 'quiz', label: 'Kuis', icon: <Star size={14} /> },
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
              <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Home size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Menyatakan Keberadaan</h2>
                  <p className="text-cyan-100 text-sm leading-relaxed">
                    Kita menggunakan <b>"There is"</b> dan <b>"There are"</b> untuk mengatakan sesuatu ada atau berada di suatu tempat. Seperti menunjuk sesuatu dengan kata-kata!
                  </p>
                </div>
              </motion.section>

              {/* Noun Rules */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {NOUN_RULES.map((rule, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-[var(--shadow-card)] text-center">
                    <div className="text-3xl mb-3">{rule.icon}</div>
                    <h3 className="font-bold text-[var(--color-text-primary)] text-lg mb-1">{rule.title}</h3>
                    <p className="text-xs text-[var(--color-text-muted)] font-medium mb-3">{rule.rule}</p>
                    <div className="bg-[var(--color-background)] rounded-lg p-2 text-xs text-[var(--color-text-primary)]">
                      "{rule.example}"
                    </div>
                    <p className="text-[10px] text-[var(--color-text-muted)] mt-2">{rule.subtext}</p>
                  </div>
                ))}
              </div>

              {/* Structures */}
              <div className="space-y-4">
                <h3 className="font-bold text-[var(--color-text-primary)] px-1">Struktur Kalimat</h3>
                {STRUCTURES.map((struct, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${struct.color.replace('bg-', 'border-').split(' ')[2]} relative overflow-hidden`}>
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-lg font-black ${struct.color.split(' ')[1]}`}>{struct.label}</span>
                      <span className="text-[10px] uppercase font-bold bg-white/50 px-2 py-1 rounded">{struct.desc}</span>
                    </div>

                    <div className="space-y-1 mb-4">
                      {struct.formula.map((f, i) => (
                        <p key={i} className="text-xs font-mono bg-white/60 p-1.5 rounded border border-[var(--color-border)]/50 text-[var(--color-text-secondary)]">{f}</p>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {struct.examples.map((ex, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white/40 p-2 rounded-lg">
                          <span className="text-xl">{ex.icon}</span>
                          <span className="text-sm text-[var(--color-text-primary)] font-medium">{ex.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tip */}
              <div className="mt-6 bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <Lightbulb size={24} />
                  <div>
                    <h4 className="font-bold text-yellow-900 text-sm">Pro Tip: "Some" vs "Any"</h4>
                    <p className="text-xs text-yellow-800 mt-1 leading-relaxed">
                      Gunakan <b>Some</b> untuk kalimat positif.<br />
                      <i>"There is <b>some</b> water."</i>
                      <br /><br />
                      Gunakan <b>Any</b> untuk negatif dan pertanyaan.<br />
                      <i>"There isn't <b>any</b> water."</i><br />
                      <i>"Is there <b>any</b> water?"</i>
                    </p>
                  </div>
                </div>
              </div>
                </div>
            ) : tabId === 'practice' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
<div className="max-w-xl mx-auto text-center pt-8">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-cyan-100/50 border border-cyan-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                  <div
                    className="h-full bg-cyan-500 transition-all duration-300"
                    style={{ width: `${((practiceIndex + 1) / PRACTICE_SENTENCES.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-2">Lengkapi Kalimat</h3>
                <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-[var(--color-text-muted)] text-xs font-bold mb-6">
                  Target: {PRACTICE_SENTENCES[practiceIndex].type}
                </span>

                <div className="text-xl font-medium text-[var(--color-text-primary)] mb-8 leading-relaxed">
                  {PRACTICE_SENTENCES[practiceIndex].text.split('___').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="inline-block border-b-2 border-cyan-500 min-w-[80px] text-center mx-1 text-cyan-600 font-bold">
                          {practiceResult === 'correct' ? PRACTICE_SENTENCES[practiceIndex].correct : "___"}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {['There is', 'There are', 'Is there', 'Are there'].map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => checkPractice(opt)}
                      className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-cyan-400 hover:bg-cyan-50 font-bold text-[var(--color-text-secondary)] transition-all active:scale-95 text-lg"
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {practiceResult && (
                  <div className={`mt-6 font-bold animate-bounce ${practiceResult === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
                    {practiceResult === 'correct' ? 'Benar! 🎉' : 'Ups! Coba lagi.'}
                    {practiceResult === 'correct' && (
                      <p className="text-xs font-normal text-[var(--color-text-muted)] mt-1">{PRACTICE_SENTENCES[practiceIndex].hint}</p>
                    )}
                  </div>
                )}
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
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-cyan-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-cyan-50 text-cyan-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-cyan-300 hover:bg-[var(--color-background)]";
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
                        {quizStep < QUIZ_QUESTIONS.length - 1 ? "Pertanyaan Selanjutnya" : "Lihat Hasil"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500">
                    <Star size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Kuis Selesai!</h2>
                  <p className="text-[var(--color-text-muted)] mb-6">Kamu mendapatkan skor {quizScore} dari {QUIZ_QUESTIONS.length}</p>
                  <button
                    onClick={restartQuiz}
                    className="px-8 py-3 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-200"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
                </motion.div>
            )}
        </LessonShell>
      </>
  );
};

export default GrammarLesson5;
