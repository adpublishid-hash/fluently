import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Sparkles, CheckCircle2, XCircle, BookOpen, PenTool, Star, User } from 'lucide-react';
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



const PRONOUN_TYPES = [
  {
    title: "Subjek",
    desc: "Pelaku (Sebelum Kata Kerja)",
    examples: ["I", "You", "He", "She", "We", "They"],
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    title: "Objek",
    desc: "Penerima (Setelah Kata Kerja)",
    examples: ["Me", "You", "Him", "Her", "Us", "Them"],
    color: "bg-indigo-50 text-indigo-700 border-indigo-200"
  },
  {
    title: "Kepemilikan (Adj)",
    desc: "Pemilik (Sebelum Kata Benda)",
    examples: ["My", "Your", "His", "Her", "Our", "Their"],
    color: "bg-pink-50 text-pink-700 border-pink-200"
  },
  {
    title: "Kepemilikan (Pro)",
    desc: "Pemilik (Tanpa Kata Benda)",
    examples: ["Mine", "Yours", "His", "Hers", "Ours", "Theirs"],
    color: "bg-purple-50 text-purple-700 border-purple-200"
  }
];

const MASTER_CHART = [
  { s: 'I', o: 'Me', pa: 'My', pp: 'Mine' },
  { s: 'You', o: 'You', pa: 'Your', pp: 'Yours' },
  { s: 'He', o: 'Him', pa: 'His', pp: 'His' },
  { s: 'She', o: 'Her', pa: 'Her', pp: 'Hers' },
  { s: 'It', o: 'It', pa: 'Its', pp: '-' },
  { s: 'We', o: 'Us', pa: 'Our', pp: 'Ours' },
  { s: 'They', o: 'Them', pa: 'Their', pp: 'Theirs' },
];

const PRACTICE_SENTENCES = [
  { id: 1, text: "___ am a student.", correct: "I", type: "Subject", options: ["I", "Me", "My"] },
  { id: 2, text: "She loves ___.", correct: "him", type: "Object", options: ["he", "him", "his"] },
  { id: 3, text: "This is ___ car.", correct: "my", type: "Possessive Adj", options: ["I", "me", "my"] },
  { id: 4, text: "The car is ___.", correct: "mine", type: "Possessive Pro", options: ["my", "mine", "me"] },
  { id: 5, text: "___ are friends.", correct: "We", type: "Subject", options: ["Us", "We", "Our"] },
  { id: 6, text: "Give it to ___.", correct: "us", type: "Object", options: ["we", "us", "our"] },
  { id: 7, text: "It is ___ house.", correct: "their", type: "Possessive Adj", options: ["them", "their", "theirs"] },
  { id: 8, text: "Is this pen ___?", correct: "yours", type: "Possessive Pro", options: ["your", "yours", "you"] },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Kalimat mana yang benar?",
    options: ['Him is happy.', 'He is happy.', 'His is happy.'],
    answer: 'He is happy.',
    explanation: "Kita butuh kata ganti Subjek sebelum kata kerja 'is'."
  },
  {
    id: 2,
    question: "This is ___ book. (Saya)",
    options: ['I', 'me', 'my'],
    answer: 'my',
    explanation: "'Book' adalah benda, jadi kita butuh kata sifat kepemilikan 'My'."
  },
  {
    id: 3,
    question: "Call ___ tomorrow. (Dia laki-laki)",
    options: ['he', 'him', 'his'],
    answer: 'him',
    explanation: "Kita butuh kata ganti Objek setelah kata kerja 'Call'."
  },
  {
    id: 4,
    question: "___ car is red. (Mereka)",
    options: ['They', 'Them', 'Their'],
    answer: 'Their',
    explanation: "Kepemilikan untuk 'They' adalah 'Their'."
  },
  {
    id: 5,
    question: "Do you like ___? (Itu)",
    options: ['it', 'its', 'they'],
    answer: 'it',
    explanation: "'It' bisa jadi Subjek atau Objek. Di sini sebagai Objek."
  },
  {
    id: 6,
    question: "___ is my sister.",
    options: ['Her', 'She', 'Him'],
    answer: 'She',
    explanation: "Kita butuh Subjek. 'She' adalah subjek untuk perempuan."
  },
  {
    id: 7,
    question: "Tell ___ the truth. (Saya)",
    options: ['I', 'my', 'me'],
    answer: 'me',
    explanation: "Sebagai objek (setelah kata kerja 'Tell'), gunakan 'me'."
  },
  {
    id: 8,
    question: "We love ___ dog.",
    options: ['our', 'we', 'us'],
    answer: 'our',
    explanation: "Kepemilikan untuk 'We' adalah 'Our'."
  },
  {
    id: 9,
    question: "Please help ___. (Kami)",
    options: ['we', 'our', 'us'],
    answer: 'us',
    explanation: "Objek untuk 'We' adalah 'us'."
  },
  {
    id: 10,
    question: "Where is ___ house? (Kamu)",
    options: ['you', 'your', 'yours'],
    answer: 'your',
    explanation: "Kepemilikan untuk 'You' adalah 'Your'."
  },
  {
    id: 11,
    question: "I see ___. (Dia perempuan)",
    options: ['she', 'her', 'hers'],
    answer: 'her',
    explanation: "Objek untuk 'She' adalah 'her'."
  },
  {
    id: 12,
    question: "___ name is Budi.",
    options: ['Him', 'His', 'He'],
    answer: 'His',
    explanation: "Kepemilikan untuk laki-laki adalah 'His'."
  },
  {
    id: 13,
    question: "Are ___ busy? (Kalian/Kamu)",
    options: ['your', 'you', 'yours'],
    answer: 'you',
    explanation: "'You' di sini sebagai Subjek."
  },
  {
    id: 14,
    question: "Give it to ___. (Mereka)",
    options: ['they', 'their', 'them'],
    answer: 'them',
    explanation: "Objek untuk 'They' adalah 'them'."
  },
  {
    id: 15,
    question: "___ looks delicious. (Benda/Makanan)",
    options: ['It', 'Its', 'They'],
    answer: 'It',
    explanation: "Subjek tunggal untuk benda adalah 'It'."
  },
  {
    id: 16,
    question: "This isn't my pen. It's ___.",
    options: ['he', 'him', 'hers'],
    answer: 'hers',
    explanation: "'Hers' adalah possessive pronoun (milik dia pr) yang berdiri sendiri."
  },
  {
    id: 17,
    question: "___ parents are nice. (Dia lk)",
    options: ['He', 'Him', 'His'],
    answer: 'His',
    explanation: "Menunjukkan milik dia laki-laki -> 'His'."
  },
  {
    id: 18,
    question: "Listen to ___! (Saya)",
    options: ['me', 'my', 'I'],
    answer: 'me',
    explanation: "Objek dari 'I' adalah 'me'."
  },
  {
    id: 19,
    question: "___ don't know.",
    options: ['Me', 'I', 'My'],
    answer: 'I',
    explanation: "Subjek kalimat adalah 'I'."
  },
  {
    id: 20,
    question: "Is that ___ bag? (Dia pr)",
    options: ['she', 'her', 'hers'],
    answer: 'her',
    explanation: "Kepemilikan (Possessive Adjective) untuk perempuan adalah 'her'."
  }
];

const GrammarLesson3: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/grammar/lesson-4';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(3));
  const [showGrammarModal, setShowGrammarModal] = React.useState(false);
  const handleSelesai = () => { markGrammarComplete(3); setIsCompleted(true); setShowGrammarModal(true); };
  
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
    if (option.toLowerCase() === current.correct.toLowerCase()) {
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
        alert("Latihan Selesai! Coba Kuisnya.");
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
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Grammar Lesson 3</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowGrammarModal(false); navigate('/modul/english/beginner/grammar/lesson-4'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADbb)' }}>Next ›</button>
          <button onClick={() => { setShowGrammarModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    {grammarModal}
    <LessonShell
            title="Kata Ganti & Kepemilikan"
            subtitle="Grammar • Pelajaran 3"
            accentColor="#8E44AD"
            nextLesson={'/modul/english/beginner/grammar/lesson-4'}
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
              <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <User size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Siapa & Milik Siapa?</h2>
                  <p className="text-violet-100 text-sm leading-relaxed">
                    Kata ganti menggantikan nama (I, Me, You).<br />
                    Tanda kepemilikan menunjukkan kepunyaan (My, Mine).
                  </p>
                </div>
              </motion.section>

              {/* Concepts Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {PRONOUN_TYPES.map((type, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-4 shadow-[var(--shadow-card)] ${type.color.replace('bg-', 'border-').split(' ')[2]}`}>
                    <h3 className={`font-bold text-sm mb-1 ${type.color.split(' ')[1]}`}>{type.title}</h3>
                    <p className="text-[10px] text-[var(--color-text-muted)] mb-2 h-8">{type.desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {type.examples.slice(0, 3).map((ex, i) => (
                        <span key={i} className="text-[10px] bg-[var(--color-background)] border border-[var(--color-border)] px-1.5 py-0.5 rounded text-[var(--color-text-secondary)]">{ex}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Master Chart */}
              <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-[var(--shadow-card)] mb-6">
                <div className="bg-[var(--color-background)] p-4 border-b border-[var(--color-border)]">
                  <h3 className="font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                    <Sparkles size={20} />
                    Tabel Referensi
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm min-w-[320px]">
                    <thead>
                      <tr className="bg-[var(--color-background)]/50 text-xs font-bold text-[var(--color-text-muted)] uppercase">
                        <th className="p-3">Sub</th>
                        <th className="p-3">Obj</th>
                        <th className="p-3">Pos.Adj</th>
                        <th className="p-3">Pos.Pro</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-[var(--color-text-secondary)]">
                      {MASTER_CHART.map((row, idx) => (
                        <tr key={idx} className="hover:bg-violet-50 transition-colors">
                          <td className="p-3 font-bold text-blue-600">{row.s}</td>
                          <td className="p-3 text-indigo-600">{row.o}</td>
                          <td className="p-3 text-pink-600">{row.pa}</td>
                          <td className="p-3 text-purple-600">{row.pp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Examples */}
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-card)] flex items-center gap-4">
                  <div className="text-2xl">💁‍♂️</div>
                  <div>
                    <p className="text-sm text-[var(--color-text-primary)] font-medium"><span className="text-blue-600 font-bold">I</span> like <span className="text-indigo-600 font-bold">her</span>.</p>
                    <p className="text-xs text-[var(--color-text-muted)]">Subject (I) + Verb + Object (Her)</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-card)] flex items-center gap-4">
                  <div className="text-2xl">🚗</div>
                  <div>
                    <p className="text-sm text-[var(--color-text-primary)] font-medium">It is <span className="text-pink-600 font-bold">my</span> car. It is <span className="text-purple-600 font-bold">mine</span>.</p>
                    <p className="text-xs text-[var(--color-text-muted)]">Adj (My) + Noun vs Pronoun (Mine)</p>
                  </div>
                </div>
              </div>

              {/* Tip */}
              <div className="mt-6 bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <Lightbulb size={24} />
                  <div>
                    <h4 className="font-bold text-yellow-900 text-sm">Kesalahan Umum</h4>
                    <p className="text-xs text-yellow-800 mt-1 leading-relaxed">
                      Jangan katakan "The car is <span className="line-through opacity-70">my</span>." ❌ <br />
                      Katakan "The car is <b>mine</b>." ✅ <br />
                      Kata Sifat Kepemilikan (My, Your) harus memiliki kata benda setelahnya!
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
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-violet-100/50 border border-violet-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                  <div
                    className="h-full bg-violet-500 transition-all duration-300"
                    style={{ width: `${((practiceIndex + 1) / PRACTICE_SENTENCES.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-2">Lengkapi Kalimat</h3>
                <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-[var(--color-text-muted)] text-xs font-bold mb-6">
                  Target: {PRACTICE_SENTENCES[practiceIndex].type}
                </span>

                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 bg-violet-50 rounded-full flex items-center justify-center animate-pulse-subtle">
                    <Sparkles size={32} />
                  </div>
                </div>

                <div className="text-xl font-medium text-[var(--color-text-primary)] mb-8 leading-relaxed">
                  {PRACTICE_SENTENCES[practiceIndex].text.split('___').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="inline-block border-b-2 border-violet-500 min-w-[60px] text-center mx-1 text-violet-600 font-bold">
                          {practiceResult === 'correct' ? PRACTICE_SENTENCES[practiceIndex].correct : "?"}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {PRACTICE_SENTENCES[practiceIndex].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => checkPractice(opt)}
                      className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-violet-400 hover:bg-violet-50 font-bold text-[var(--color-text-secondary)] transition-all active:scale-95 text-lg capitalize"
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {practiceResult && (
                  <div className={`mt-6 font-bold animate-bounce ${practiceResult === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
                    {practiceResult === 'correct' ? 'Benar! 🎉' : 'Ups! Coba lagi.'}
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
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-violet-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-violet-50 text-violet-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-violet-300 hover:bg-[var(--color-background)]";
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
                    className="px-8 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-200"
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

export default GrammarLesson3;
