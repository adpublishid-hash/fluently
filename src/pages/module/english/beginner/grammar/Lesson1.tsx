import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeftIcon,
  CheckCircleIcon, XCircleIcon, TrendUpIcon, StarIcon, ClipboardIcon
} from '../../../../../components/Icons';
import { playAudio } from '../../../../../services/ttsService';


/* ─── Grammar Completion Helpers ─── */
const GRAMMAR_STORAGE_KEY = 'talky_beginner_grammar_completed';
function getCompletedGrammarLessons(): number[] {
  try { return JSON.parse(localStorage.getItem(GRAMMAR_STORAGE_KEY) || '[]'); } catch { return []; }
}
function markGrammarComplete(lessonId: number) {
  const done = getCompletedGrammarLessons();
  if (!done.includes(lessonId)) localStorage.setItem(GRAMMAR_STORAGE_KEY, JSON.stringify([...done, lessonId]));
}

interface LessonProps {
  apiKey?: string;
  onNavigate?: (view: any) => void;
  userParams?: { name: string; isLifetime: boolean };
}

const SENTENCE_PARTS = [
  {
    part: "Subject",
    role: "Pelaku",
    desc: "Siapa atau apa yang melakukan tindakan. Biasanya Kata Benda atau Kata Ganti.",
    examples: ["I", "The cat", "Sarah", "They"],
    color: "bg-blue-100 text-blue-700 border-blue-200"
  },
  {
    part: "Verb",
    role: "Tindakan",
    desc: "Apa yang terjadi. Setiap kalimat HARUS memiliki kata kerja.",
    examples: ["eat", "sleeps", "is", "like"],
    color: "bg-red-100 text-red-700 border-red-200"
  },
  {
    part: "Object",
    role: "Penerima",
    desc: "Siapa atau apa yang menerima tindakan. (Opsional dalam beberapa kalimat).",
    examples: ["pizza", "the ball", "him", "English"],
    color: "bg-green-100 text-green-700 border-sky-200"
  }
];

const PUNCTUATION_RULES = [
  {
    title: "Huruf Kapital",
    desc: "Mulai setiap kalimat dengan Huruf Besar.",
    wrong: "she eats.",
    correct: "She eats.",
    icon: "🔠"
  },
  {
    title: "Titik",
    desc: "Akhiri setiap pernyataan dengan titik (.).",
    wrong: "She eats",
    correct: "She eats.",
    icon: "🛑"
  }
];

const SCRAMBLED_SENTENCES = [
  { id: 1, words: ["like", "I", "cats"], correct: ["I", "like", "cats"], meaning: "Saya suka kucing." },
  { id: 2, words: ["pizza", "She", "eats"], correct: ["She", "eats", "pizza"], meaning: "Dia makan pizza." },
  { id: 3, words: ["play", "They", "football"], correct: ["They", "play", "football"], meaning: "Mereka bermain sepak bola." },
  { id: 4, words: ["is", "He", "happy"], correct: ["He", "is", "happy"], meaning: "Dia bahagia." },
  { id: 5, words: ["drink", "We", "coffee"], correct: ["We", "drink", "coffee"], meaning: "Kami minum kopi." },
  { id: 6, words: ["book", "reads", "John", "a"], correct: ["John", "reads", "a", "book"], meaning: "John membaca sebuah buku." }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Identifikasi VERB (Kata Kerja): 'Birds fly high.'",
    options: ['Birds', 'fly', 'high'],
    answer: 'fly',
    explanation: "'Fly' adalah tindakannya."
  },
  {
    id: 2,
    question: "Identifikasi SUBJECT (Subjek): 'My mother cooks dinner.'",
    options: ['My mother', 'cooks', 'dinner'],
    answer: 'My mother',
    explanation: "'My mother' adalah orang yang melakukan tindakan."
  },
  {
    id: 3,
    question: "Identifikasi OBJECT (Objek): 'John loves music.'",
    options: ['John', 'loves', 'music'],
    answer: 'music',
    explanation: "'Music' adalah apa yang dicintai John (menerima perasaan)."
  },
  {
    id: 4,
    question: "Apa urutan yang benar?",
    options: ['Subject + Verb + Object', 'Verb + Subject + Object', 'Object + Verb + Subject'],
    answer: 'Subject + Verb + Object',
    explanation: "Bahasa Inggris mengikuti pola S-V-O."
  },
  {
    id: 5,
    question: "Kalimat mana yang ditulis dengan benar?",
    options: ['she likes apples', 'She likes apples.', 'She likes apples'],
    answer: 'She likes apples.',
    explanation: "Harus dimulai dengan Huruf Besar dan diakhiri dengan Titik."
  },
  {
    id: 6,
    question: "Identifikasi VERB: 'The cat sleeps on the sofa.'",
    options: ['The cat', 'sleeps', 'sofa'],
    answer: 'sleeps',
    explanation: "'Sleeps' (tidur) adalah tindakan yang dilakukan kucing."
  },
  {
    id: 7,
    question: "Identifikasi SUBJECT: 'They play football.'",
    options: ['They', 'play', 'football'],
    answer: 'They',
    explanation: "'They' (mereka) adalah pelaku tindakan."
  },
  {
    id: 8,
    question: "Identifikasi OBJECT: 'I drink coffee.'",
    options: ['I', 'drink', 'coffee'],
    answer: 'coffee',
    explanation: "'Coffee' adalah apa yang diminum (penerima tindakan)."
  },
  {
    id: 9,
    question: "Mana yang merupakan kalimat lengkap?",
    options: ['Eats pizza.', 'He eats.', 'The big dog.'],
    answer: 'He eats.',
    explanation: "Kalimat membutuhkan Subjek ('He') dan Kata Kerja ('eats')."
  },
  {
    id: 10,
    question: "Pilih kalimat dengan tanda baca yang benar:",
    options: ['my name is ali.', 'My name is Ali', 'My name is Ali.'],
    answer: 'My name is Ali.',
    explanation: "Huruf kapital di awal, nama orang kapital, dan diakhiri titik."
  },
  {
    id: 11,
    question: "Identifikasi VERB: 'She reads a book.'",
    options: ['She', 'reads', 'book'],
    answer: 'reads',
    explanation: "'Reads' (membaca) adalah kata kerjanya."
  },
  {
    id: 12,
    question: "Apa yang hilang? '___ run fast.'",
    options: ['The cars', 'Is', 'Green'],
    answer: 'The cars',
    explanation: "Kalimat ini membutuhkan Subjek (Pelaku)."
  },
  {
    id: 13,
    question: "Apa yang hilang? 'We ___ lunch.'",
    options: ['eat', 'happy', 'big'],
    answer: 'eat',
    explanation: "Kalimat ini membutuhkan Verb (Kata Kerja)."
  },
  {
    id: 14,
    question: "Susun kata-kata ini: 'likes / He / tea'",
    options: ['Likes he tea', 'He tea likes', 'He likes tea'],
    answer: 'He likes tea',
    explanation: "Pola: Subject (He) + Verb (likes) + Object (tea)."
  },
  {
    id: 15,
    question: "Identifikasi SUBJECT: 'The red car stops here.'",
    options: ['The red car', 'stops', 'here'],
    answer: 'The red car',
    explanation: "Frasa benda 'The red car' adalah subjeknya."
  },
  {
    id: 16,
    question: "Kalimat mana yang SALAH?",
    options: ['I like cats.', 'Cats like I.', 'Cats like milk.'],
    answer: 'Cats like I.',
    explanation: "'I' adalah kata ganti subjek, tidak bisa jadi objek. Harusnya 'Cats like me'."
  },
  {
    id: 17,
    question: "Identifikasi OBJECT: 'We watch TV.'",
    options: ['We', 'watch', 'TV'],
    answer: 'TV',
    explanation: "'TV' adalah apa yang ditonton."
  },
  {
    id: 18,
    question: "Aturan huruf kapital: Mana yang benar?",
    options: ['london is big.', 'London is big.', 'london Is Big.'],
    answer: 'London is big.',
    explanation: "Awal kalimat dan nama kota (London) harus kapital."
  },
  {
    id: 19,
    question: "Lengkapi: 'Fish ___ in water.'",
    options: ['swim', 'swims', 'swimming'],
    answer: 'swim',
    explanation: "Subject jamak (Fish/Ikan-ikan) + Verb dasar (swim)."
  },
  {
    id: 20,
    question: "Apa peran 'The sun' dalam: 'The sun shines.'",
    options: ['Subject', 'Verb', 'Object'],
    answer: 'Subject',
    explanation: "'The sun' adalah apa yang bersinar (Pelaku)."
  }
];

const GrammarLesson1: React.FC<LessonProps> = ({ onNavigate, userParams }) => {
  const navigate = useNavigate();

  const nextLessonPath = '/modul/english/beginner/grammar/lesson-2';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(1));
  const [showGrammarModal, setShowGrammarModal] = React.useState(false);
  const handleSelesai = () => {
    markGrammarComplete(1);
    setIsCompleted(true);
    setShowGrammarModal(true);
  };

  const [activeTab, setActiveTab] = useState<'learn' | 'build' | 'quiz'>('learn');

  // Build State
  const [buildIndex, setBuildIndex] = useState(0);
  const [currentOrder, setCurrentOrder] = useState<string[]>([]);
  const [buildResult, setBuildResult] = useState<'correct' | 'incorrect' | null>(null);

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string) => { playAudio(text, 0.9); };

  // Build Logic
  const addToSentence = (word: string) => {
    if (!currentOrder.includes(word) && currentOrder.length < SCRAMBLED_SENTENCES[buildIndex].words.length) {
      setCurrentOrder([...currentOrder, word]);
    }
  };

  const removeFromSentence = (word: string) => {
    setCurrentOrder(currentOrder.filter(w => w !== word));
    setBuildResult(null);
  };

  const resetBuild = () => {
    setCurrentOrder([]);
    setBuildResult(null);
  };

  const checkBuild = () => {
    const target = SCRAMBLED_SENTENCES[buildIndex];
    if (JSON.stringify(currentOrder) === JSON.stringify(target.correct)) {
      setBuildResult('correct');
      playSound(target.correct.join(' '));
    } else {
      setBuildResult('incorrect');
      playSound("Try again");
    }
  };

  const nextBuild = () => {
    if (buildIndex < SCRAMBLED_SENTENCES.length - 1) {
      setBuildIndex(prev => prev + 1);
      resetBuild();
    } else {
      alert("Kerja bagus! Kamu menyusun semua kalimat.");
      setActiveTab('quiz');
    }
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


  /* ── Grammar Success Modal ── */
  const grammarModal = showGrammarModal ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={() => setShowGrammarModal(false)}
    >
      <div
        className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44AD99)' }}>
          <span style={{ fontSize: 36 }}>🏆</span>
        </div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Pelajaran Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">
          Kamu telah menyelesaikan <b>Grammar Lesson 1</b>. Terus semangat!
        </p>
        <div className="flex justify-center gap-2 mb-6">
          <span style={{ fontSize: 26 }}>⭐</span>
          <span style={{ fontSize: 26 }}>⭐</span>
          <span style={{ fontSize: 26 }}>⭐</span>
        </div>
        <div className="flex gap-3">
          {nextLessonPath && (
            <button
              onClick={() => { setShowGrammarModal(false); navigate(nextLessonPath); }}
              className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADbb)' }}
            >
              Next ›
            </button>
          )}
          <button
            onClick={() => { setShowGrammarModal(false); navigate(-1); }}
            className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    {grammarModal}
    <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50 relative">

      {/* Header */}
      <header className="flex-none bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => onNavigate ? onNavigate(null) : navigate(-1)}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-50 transition text-slate-600 active:bg-slate-100"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h1 className="text-sm font-bold text-slate-800">Dasar Kalimat</h1>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Grammar • Lesson 1</p>
          </div>
          {nextLessonPath ? (
            <button
              onClick={() => navigate(nextLessonPath)}
              className="flex items-center gap-1 px-3 h-9 rounded-full text-xs font-bold text-white"
              style={{ background: '#8E44AD', boxShadow: '0 2px 10px #8E44AD55' }}
            >
              Next ›
            </button>
          ) : (
            <div className="w-10" />
          )}
        </div>
      </header>

      {/* Tabs */}
      <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('learn')}
          className={`flex-1 min-w-[80px] py-3 text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'learn' ? 'text-teal-600 border-b-2 border-sky-600' : 'text-slate-400'}`}
        >
          Struktur
        </button>
        <button
          onClick={() => setActiveTab('build')}
          className={`flex-1 min-w-[80px] py-3 text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'build' ? 'text-teal-600 border-b-2 border-sky-600' : 'text-slate-400'}`}
        >
          Penyusun
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 min-w-[80px] py-3 text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'quiz' ? 'text-teal-600 border-b-2 border-sky-600' : 'text-slate-400'}`}
        >
          Kuis
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">
        <div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">

          {activeTab === 'learn' && (
            <>
              {/* Intro */}
              <section className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <ClipboardIcon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Aturan Emas ✨</h2>
                  <p className="text-teal-100 text-sm leading-relaxed">
                    Kalimat bahasa Inggris mengikuti urutan yang ketat: <br />
                    <b>Subject + Verb + Object (S-V-O)</b>.
                    <br />
                    Anggap saja seperti kereta api: Lokomotif (Subjek) menarik tindakan (Kata Kerja), yang menarik kargo (Objek).
                  </p>
                </div>
              </section>

              {/* Anatomy of a Sentence */}
              <div className="space-y-4 mb-8">
                <h3 className="font-bold text-slate-800 px-1">Bagian-bagian Kalimat</h3>
                {SENTENCE_PARTS.map((part, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-sm ${part.color.replace('bg-', 'border-').split(' ')[2]}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${part.color}`}>{part.part}</span>
                      <span className="text-xs font-bold text-slate-400">{part.role}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">{part.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {part.examples.map((ex, i) => (
                        <span key={i} className="bg-slate-50 border border-slate-100 px-2 py-1 rounded text-xs font-medium text-slate-500">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Visual Example */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-red-400 to-blue-400"></div>
                <h3 className="font-bold text-slate-800 mb-6">Contoh Visual</h3>
                <div className="flex items-center justify-center gap-2 text-sm md:text-base font-bold">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2 text-2xl shadow-sm">🐱</div>
                    <span className="text-blue-600">The cat</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Subject</span>
                  </div>
                  <div className="text-slate-300">➜</div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-2 text-2xl shadow-sm">❤️</div>
                    <span className="text-red-600">loves</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Verb</span>
                  </div>
                  <div className="text-slate-300">➜</div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2 text-2xl shadow-sm">🐟</div>
                    <span className="text-green-600">fish</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Object</span>
                  </div>
                </div>
              </div>

              {/* Punctuation Rules */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 px-1">Aturan Penting</h3>
                {PUNCTUATION_RULES.map((rule, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex items-start gap-4">
                    <div className="text-3xl bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      {rule.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">{rule.title}</h4>
                      <p className="text-sm text-slate-600 mb-2">{rule.desc}</p>
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="text-red-500 line-through opacity-70">❌ {rule.wrong}</span>
                        <span className="text-green-600 font-bold">✅ {rule.correct}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'build' && (
            <div className="max-w-xl mx-auto text-center pt-8">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-sky-100/50 border border-sky-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
                  <div
                    className="h-full bg-teal-500 transition-all duration-300"
                    style={{ width: `${((buildIndex + 1) / SCRAMBLED_SENTENCES.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Susun Kalimat</h3>

                {/* Drop Zone */}
                <div className="min-h-[80px] bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 mb-8 flex flex-wrap items-center justify-center gap-2 p-4 transition-all">
                  {currentOrder.length === 0 && <span className="text-slate-300 text-sm font-medium">Ketuk kata untuk menyusun</span>}
                  {currentOrder.map((word, idx) => (
                    <button
                      key={idx}
                      onClick={() => removeFromSentence(word)}
                      className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 text-slate-800 font-bold animate-fade-in hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors"
                    >
                      {word}
                    </button>
                  ))}
                </div>

                {/* Word Bank */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {SCRAMBLED_SENTENCES[buildIndex].words.map((word, idx) => {
                    const isUsed = currentOrder.includes(word);
                    return (
                      <button
                        key={idx}
                        onClick={() => addToSentence(word)}
                        disabled={isUsed}
                        className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${isUsed
                          ? 'bg-slate-100 text-slate-300 scale-95 opacity-50'
                          : 'bg-teal-50 text-teal-700 hover:bg-teal-100 hover:scale-105 shadow-sm border border-sky-100'
                          }`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>

                {/* Controls */}
                <div className="flex gap-3">
                  <button
                    onClick={resetBuild}
                    className="px-4 py-3 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
                  >
                    Reset
                  </button>

                  {!buildResult && (
                    <button
                      onClick={checkBuild}
                      disabled={currentOrder.length !== SCRAMBLED_SENTENCES[buildIndex].words.length}
                      className="flex-1 bg-slate-900 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-all shadow-lg"
                    >
                      Periksa
                    </button>
                  )}

                  {buildResult && (
                    <button
                      onClick={nextBuild}
                      className={`flex-1 rounded-xl font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2 ${buildResult === 'correct' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'}`}
                    >
                      {buildResult === 'correct' ? 'Kalimat Berikutnya' : 'Coba Lagi'}
                      {buildResult === 'correct' && <TrendUpIcon className="w-4 h-4" />}
                    </button>
                  )}
                </div>

                {buildResult === 'correct' && (
                  <div className="mt-6 bg-green-50 p-4 rounded-xl border border-sky-100 animate-fade-in">
                    <p className="text-green-800 font-bold text-lg mb-1">Benar! 🎉</p>
                    <p className="text-green-600 text-sm">Arti: "{SCRAMBLED_SENTENCES[buildIndex].meaning}"</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-teal-50 text-teal-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-slate-200 hover:border-sky-300 hover:bg-slate-50";
                      if (isAnswerChecked) {
                        if (option === QUIZ_QUESTIONS[quizStep].answer) btnClass = "bg-green-50 border-sky-500 text-green-700";
                        else if (option === selectedOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                        else btnClass = "opacity-50 border-slate-100";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleCheckQuiz(option)}
                          disabled={isAnswerChecked}
                          className={`w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${btnClass}`}
                        >
                          <span>{option}</span>
                          {isAnswerChecked && option === QUIZ_QUESTIONS[quizStep].answer && <CheckCircleIcon className="w-5 h-5 text-green-600" />}
                          {isAnswerChecked && option === selectedOption && option !== QUIZ_QUESTIONS[quizStep].answer && <XCircleIcon className="w-5 h-5 text-red-500" />}
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
                    <StarIcon className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Kuis Selesai!</h2>
                  <p className="text-slate-500 mb-6">Kamu mendapatkan skor {quizScore} dari {QUIZ_QUESTIONS.length}</p>
                  <button
                    onClick={restartQuiz}
                    className="px-8 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-sky-200"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* ── Completed Footer ── */}
      <div className="sticky bottom-0 z-30 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <button
              onClick={isCompleted ? () => navigate(-1) : handleSelesai}
              className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #8E44AD, #8E44ADcc)' }}
            >
              {isCompleted ? '✅ Sudah Selesai ✓' : '✅ Selesai'}
            </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default GrammarLesson1;