import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, PlayCircle, Lightbulb, Sparkles, Info, CheckCircle2, XCircle, MessageSquare, BookOpen, PenTool, Mic, Star } from 'lucide-react';
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

type RuleGroup = {
  sound: string;
  condition: string;
  visual: string; // Emoji or symbol
  vibrationText: string;
  examples: { word: string; sentence: string }[];
  color: string;
};

const S_RULES: RuleGroup[] = [
  {
    sound: "/s/",
    condition: "Setelah bunyi tak bersuara (p, t, k, f, th)",
    visual: "💨",
    vibrationText: "Tidak Ada Getaran (Tak Bersuara)",
    examples: [
      { word: "Cats", sentence: "Two cats." },
      { word: "Cups", sentence: "Red cups." },
      { word: "Books", sentence: "Old books." }
    ],
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    sound: "/z/",
    condition: "Setelah bunyi bersuara (b, d, g, v, l, m, n...) & vokal",
    visual: "🐝",
    vibrationText: "Getaran (Bersuara)",
    examples: [
      { word: "Dogs", sentence: "Big dogs." },
      { word: "Cars", sentence: "Fast cars." },
      { word: "Plays", sentence: "She plays." }
    ],
    color: "bg-green-50 text-green-700 border-sky-200"
  },
  {
    sound: "/ɪz/",
    condition: "Setelah bunyi desis (s, z, sh, ch, j, x)",
    visual: "🐍",
    vibrationText: "Suku Kata Tambahan",
    examples: [
      { word: "Buses", sentence: "Yellow buses." },
      { word: "Boxes", sentence: "Cardboard boxes." },
      { word: "Watches", sentence: "He watches TV." }
    ],
    color: "bg-purple-50 text-purple-700 border-purple-200"
  }
];

const ED_RULES: RuleGroup[] = [
  {
    sound: "/t/",
    condition: "Setelah bunyi tak bersuara (p, k, s, sh, ch, f)",
    visual: "💨",
    vibrationText: "Tidak Ada Getaran (Tak Bersuara)",
    examples: [
      { word: "Walked", sentence: "I walked home." },
      { word: "Helped", sentence: "She helped me." },
      { word: "Washed", sentence: "He washed the car." }
    ],
    color: "bg-orange-50 text-orange-700 border-orange-200"
  },
  {
    sound: "/d/",
    condition: "Setelah bunyi bersuara (b, g, v, z, m, n...) & vokal",
    visual: "🐝",
    vibrationText: "Getaran (Bersuara)",
    examples: [
      { word: "Played", sentence: "We played soccer." },
      { word: "Cleaned", sentence: "I cleaned my room." },
      { word: "Loved", sentence: "She loved the movie." }
    ],
    color: "bg-gray-50 text-[var(--color-primary)] border-[var(--color-border)]"
  },
  {
    sound: "/ɪd/",
    condition: "Setelah bunyi 'T' atau 'D'",
    visual: "➕",
    vibrationText: "Suku Kata Tambahan",
    examples: [
      { word: "Wanted", sentence: "I wanted ice cream." },
      { word: "Needed", sentence: "We needed help." },
      { word: "Ended", sentence: "The movie ended." }
    ],
    color: "bg-red-50 text-red-700 border-red-200"
  }
];

const PRACTICE_WORDS = [
  { word: "Kissed", type: "ED", correct: "/t/", hint: "S bersifat tak bersuara" },
  { word: "Called", type: "ED", correct: "/d/", hint: "L bersifat bersuara" },
  { word: "Visited", type: "ED", correct: "/ɪd/", hint: "Berakhiran T" },
  { word: "Laughs", type: "S", correct: "/s/", hint: "GH berbunyi seperti F (tak bersuara)" },
  { word: "Runs", type: "S", correct: "/z/", hint: "N bersifat bersuara" },
  { word: "Washes", type: "S", correct: "/ɪz/", hint: "SH adalah bunyi desis" },
];

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  audioText?: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Bagaimana cara mengucapkan 'S' dalam 'Cats'?",
    options: ['/s/ (seperti Snake)', '/z/ (seperti Zoo)', '/ɪz/ (Tambahan)'],
    answer: '/s/ (seperti Snake)',
    explanation: "'T' tak bersuara, jadi 'S' tetap tak bersuara /s/."
  },
  {
    id: 2,
    question: "Bagaimana cara mengucapkan 'ED' dalam 'Wanted'?",
    options: ['/t/', '/d/', '/ɪd/ (Tambahan)'],
    answer: '/ɪd/ (Tambahan)',
    explanation: "Kata yang berakhiran T atau D mendapatkan suku kata tambahan /ɪd/."
  },
  {
    id: 3,
    question: "Dengarkan! 'Played'. Apa bunyi akhirannya?",
    options: ['/t/', '/d/'],
    answer: '/d/',
    audioText: "Played",
    explanation: "Play berakhiran vokal (bersuara), jadi ED berbunyi seperti /d/."
  },
  {
    id: 4,
    question: "Kata mana yang berakhiran dengan bunyi /ɪz/?",
    options: ['Dogs', 'Books', 'Dishes'],
    answer: 'Dishes',
    explanation: "Dish berakhiran 'sh' (bunyi desis), jadi kita tambahkan suku kata ekstra /ɪz/."
  },
  {
    id: 5,
    question: "Bagaimana cara mengucapkan 'S' dalam 'Dogs'?",
    options: ['/s/', '/z/', '/ɪz/'],
    answer: '/z/',
    audioText: "Dogs",
    explanation: "G adalah bersuara, jadi S berbunyi seperti /z/."
  },
  {
    id: 6,
    question: "Bagaimana cara mengucapkan 'ED' dalam 'Walked'?",
    options: ['/t/', '/d/', '/ɪd/'],
    answer: '/t/',
    audioText: "Walked",
    explanation: "K adalah tak bersuara, jadi ED berbunyi seperti /t/."
  },
  {
    id: 7,
    question: "Kata mana yang 'S' berbunyi /s/?",
    options: ['Runs', 'Cups', 'Boxes'],
    answer: 'Cups',
    explanation: "P adalah tak bersuara, jadi S berbunyi /s/."
  },
  {
    id: 8,
    question: "Bagaimana cara mengucapkan 'ED' dalam 'Needed'?",
    options: ['/t/', '/d/', '/ɪd/'],
    answer: '/ɪd/',
    audioText: "Needed",
    explanation: "Need berakhiran D, jadi ED berbunyi /ɪd/ (suku kata tambahan)."
  },
  {
    id: 9,
    question: "Kata mana yang 'S' berbunyi /z/?",
    options: ['Cats', 'Cars', 'Watches'],
    answer: 'Cars',
    audioText: "Cars",
    explanation: "R adalah bersuara, jadi S berbunyi /z/."
  },
  {
    id: 10,
    question: "Bagaimana cara mengucapkan 'ED' dalam 'Helped'?",
    options: ['/t/', '/d/', '/ɪd/'],
    answer: '/t/',
    audioText: "Helped",
    explanation: "P adalah tak bersuara, jadi ED berbunyi /t/."
  },
  {
    id: 11,
    question: "Bunyi 'S' menjadi /ɪz/ setelah bunyi...",
    options: ['Tak bersuara', 'Bersuara', 'Desis (s, z, sh, ch)'],
    answer: 'Desis (s, z, sh, ch)',
    explanation: "Setelah bunyi desis, kita perlu tambahan suku kata /ɪz/."
  },
  {
    id: 12,
    question: "Bagaimana cara mengucapkan 'ED' dalam 'Cleaned'?",
    options: ['/t/', '/d/', '/ɪd/'],
    answer: '/d/',
    audioText: "Cleaned",
    explanation: "N adalah bersuara, jadi ED berbunyi /d/."
  },
  {
    id: 13,
    question: "Kata mana yang 'S' berbunyi /ɪz/?",
    options: ['Books', 'Dogs', 'Buses'],
    answer: 'Buses',
    audioText: "Buses",
    explanation: "Bus berakhiran bunyi desis 's', jadi kita tambahkan /ɪz/."
  },
  {
    id: 14,
    question: "Bagaimana cara mengucapkan 'ED' dalam 'Loved'?",
    options: ['/t/', '/d/', '/ɪd/'],
    answer: '/d/',
    audioText: "Loved",
    explanation: "V adalah bersuara, jadi ED berbunyi /d/."
  },
  {
    id: 15,
    question: "Kata mana yang 'ED' berbunyi /ɪd/?",
    options: ['Walked', 'Played', 'Visited'],
    answer: 'Visited',
    audioText: "Visited",
    explanation: "Visit berakhiran T, jadi ED berbunyi /ɪd/."
  },
  {
    id: 16,
    question: "Bagaimana cara mengucapkan 'S' dalam 'Washes'?",
    options: ['/s/', '/z/', '/ɪz/'],
    answer: '/ɪz/',
    audioText: "Washes",
    explanation: "Wash berakhiran 'sh' (desis), jadi S berbunyi /ɪz/."
  },
  {
    id: 17,
    question: "Bagaimana cara mengucapkan 'ED' dalam 'Ended'?",
    options: ['/t/', '/d/', '/ɪd/'],
    answer: '/ɪd/',
    audioText: "Ended",
    explanation: "End berakhiran D, jadi ED berbunyi /ɪd/."
  },
  {
    id: 18,
    question: "Kata mana yang 'S' berbunyi /s/?",
    options: ['Plays', 'Laughs', 'Runs'],
    answer: 'Laughs',
    audioText: "Laughs",
    explanation: "GH berbunyi seperti F (tak bersuara), jadi S berbunyi /s/."
  },
  {
    id: 19,
    question: "Kapan 'ED' berbunyi /t/?",
    options: ['Setelah bunyi bersuara', 'Setelah bunyi tak bersuara', 'Setelah T atau D'],
    answer: 'Setelah bunyi tak bersuara',
    explanation: "Jika bunyi terakhir tak bersuara (p, k, s, f), ED berbunyi /t/."
  },
  {
    id: 20,
    question: "Kapan 'S' perlu suku kata tambahan /ɪz/?",
    options: ['Setelah vokal', 'Setelah bunyi desis', 'Setelah konsonan'],
    answer: 'Setelah bunyi desis',
    explanation: "Setelah s, z, sh, ch, j, x - kita perlu tambahan /ɪz/."
  }
];

const PronunLesson4: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/pronunciation/lesson-5';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedPronunLessons().includes(4));
  const [showPronunModal, setShowPronunModal] = React.useState(false);
  const handleSelesai = () => { markPronunComplete(4); setIsCompleted(true); setShowPronunModal(true); };

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
          Kamu telah menyelesaikan <b>Pronunciation Lesson 4</b>. Terus semangat!
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
  const [practiceResult, setPracticeResult] = useState<'correct' | 'incorrect' | null>(null);

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string) => { playAudio(text, 0.9); };

  // Practice Handlers
  const checkPractice = (selectedSound: string) => {
    if (practiceResult) return;
    const current = PRACTICE_WORDS[practiceIndex];
    if (selectedSound === current.correct) {
      setPracticeResult('correct');
      playSound("Correct!");
    } else {
      setPracticeResult('incorrect');
      playSound("Try again.");
    }

    setTimeout(() => {
      setPracticeResult(null);
      if (practiceIndex < PRACTICE_WORDS.length - 1) {
        setPracticeIndex(prev => prev + 1);
      } else {
        alert("Latihan Selesai! Coba Kuis sekarang.");
        setPracticeIndex(0);
      }
    }, 1500);
  };

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
    {pronunModal}
        <LessonShell
            title="Bunyi Akhiran (S & ED)"
            subtitle="Pronunciation • Pelajaran 4"
            accentColor="#E83E8C"
            nextLesson={'/modul/english/beginner/pronunciation/lesson-5'}
            tabs={[
                { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
                { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> },
                { id: 'quiz', label: 'Kuis', icon: <Star size={14} /> },
            ]}
            footer={() => (
                <button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: `linear-gradient(135deg, ${'#E83E8C'}, ${'#E83E8C'}cc)` }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai \u2713' : 'Selesai'}
                </button>
            )}
        >
            {(tabId) => tabId === 'learn' ? (
                <div className="space-y-6">
{/* Intro */}
              <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-start gap-4">
                  <Info size={24} />
                  <div>
                    <h3 className="font-bold text-[var(--color-text-primary)] mb-2">3 Bunyi S</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      Ketika kita menambahkan 'S' pada kata (Jamak atau Kata Kerja), bunyinya bisa <b>/s/</b>, <b>/z/</b>, atau <b>/ɪz/</b>. Bunyinya tergantung pada apakah <i>bunyi terakhir</i> Bersuara (Bergetar) atau Tak Bersuara (Udara).
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Rules List */}
              <div className="space-y-6">
                {S_RULES.map((rule, idx) => (
                  <div key={idx} className={`rounded-2xl border p-5 ${rule.color.replace('text-', 'border-').split(' ')[2] || 'border-[var(--color-border)]'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-3xl font-bold ${rule.color.split(' ')[1]}`}>{rule.sound}</span>
                      <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-full border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                        <span className="text-lg">{rule.visual}</span>
                        <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase">{rule.vibrationText}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wide opacity-70">Rule:</span>
                    <p className="text-sm font-medium text-[var(--color-text-primary)] mb-4 mt-1">{rule.condition}</p>

                    <div className="grid grid-cols-1 gap-2">
                      {rule.examples.map((ex, i) => (
                        <button
                          key={i}
                          onClick={() => playSound(ex.sentence)}
                          className="flex items-center justify-between bg-white/80 p-3 rounded-xl border border-[var(--color-border)]/50 hover:bg-white transition-all group"
                        >
                          <div className="flex flex-col text-left">
                            <span className="font-bold text-[var(--color-text-primary)]">{ex.word}</span>
                            <span className="text-xs text-[var(--color-text-muted)]">{ex.sentence}</span>
                          </div>
                          <Volume2 size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

<motion.section custom={1} variants={sectionVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-start gap-4">
                  <Lightbulb size={24} />
                  <div>
                    <h3 className="font-bold text-[var(--color-text-primary)] mb-2">Bunyi Past Tense (ED)</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      'ED' itu rumit! Biasanya berbunyi seperti <b>/t/</b> atau <b>/d/</b>. Kita hanya mengucapkan suku kata tambahan <b>/ɪd/</b> jika kata tersebut berakhiran T atau D.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Rules List */}
              <div className="space-y-6">
                {ED_RULES.map((rule, idx) => (
                  <div key={idx} className={`rounded-2xl border p-5 ${rule.color.replace('text-', 'border-').split(' ')[2] || 'border-[var(--color-border)]'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-3xl font-bold ${rule.color.split(' ')[1]}`}>{rule.sound}</span>
                      <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-full border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                        <span className="text-lg">{rule.visual}</span>
                        <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase">{rule.vibrationText}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wide opacity-70">Rule:</span>
                    <p className="text-sm font-medium text-[var(--color-text-primary)] mb-4 mt-1">{rule.condition}</p>

                    <div className="grid grid-cols-1 gap-2">
                      {rule.examples.map((ex, i) => (
                        <button
                          key={i}
                          onClick={() => playSound(ex.sentence)}
                          className="flex items-center justify-between bg-white/80 p-3 rounded-xl border border-[var(--color-border)]/50 hover:bg-white transition-all group"
                        >
                          <div className="flex flex-col text-left">
                            <span className="font-bold text-[var(--color-text-primary)]">{ex.word}</span>
                            <span className="text-xs text-[var(--color-text-muted)]">{ex.sentence}</span>
                          </div>
                          <Volume2 size={16} />
                        </button>
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
<div className="max-w-xl mx-auto text-center pt-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-indigo-100 border border-indigo-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                  <div
                    className="h-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${((practiceIndex + 1) / PRACTICE_WORDS.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-6">Permainan Menyortir</h3>

                <div className="mb-8">
                  <button
                    onClick={() => playSound(PRACTICE_WORDS[practiceIndex].word)}
                    className="bg-indigo-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-indigo-100 transition-colors shadow-inner"
                  >
                    <Volume2 size={40} />
                  </button>
                  <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">{PRACTICE_WORDS[practiceIndex].word}</h2>
                  <p className="text-sm text-[var(--color-text-muted)]">Bagaimana bunyi akhirannya?</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {PRACTICE_WORDS[practiceIndex].type === 'S' ? (
                    <>
                      <button onClick={() => checkPractice('/s/')} className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-blue-400 hover:bg-blue-50 font-bold text-[var(--color-text-secondary)]">/s/</button>
                      <button onClick={() => checkPractice('/z/')} className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-sky-400 hover:bg-green-50 font-bold text-[var(--color-text-secondary)]">/z/</button>
                      <button onClick={() => checkPractice('/ɪz/')} className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-purple-400 hover:bg-purple-50 font-bold text-[var(--color-text-secondary)]">/ɪz/</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => checkPractice('/t/')} className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-orange-400 hover:bg-orange-50 font-bold text-[var(--color-text-secondary)]">/t/</button>
                      <button onClick={() => checkPractice('/d/')} className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-sky-400 hover:bg-gray-50 font-bold text-[var(--color-text-secondary)]">/d/</button>
                      <button onClick={() => checkPractice('/ɪd/')} className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-red-400 hover:bg-red-50 font-bold text-[var(--color-text-secondary)]">/ɪd/</button>
                    </>
                  )}
                </div>

                {practiceResult && (
                  <div className={`mt-6 font-bold animate-bounce ${practiceResult === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
                    {practiceResult === 'correct' ? 'Benar! 🎉' : 'Ups! Coba lagi.'}
                    {practiceResult === 'correct' && <p className="text-xs font-normal text-[var(--color-text-muted)] mt-1">{PRACTICE_WORDS[practiceIndex].hint}</p>}
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
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6 flex flex-col gap-2">
                    {QUIZ_QUESTIONS[quizStep].question}
                    {QUIZ_QUESTIONS[quizStep].audioText && (
                      <button
                        onClick={() => playSound(QUIZ_QUESTIONS[quizStep].audioText || "")}
                        className="self-start mt-2 flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-indigo-200 transition-colors"
                      >
                        <Volume2 size={16} /> Dengar
                      </button>
                    )}
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
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
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

export default PronunLesson4;
