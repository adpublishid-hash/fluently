import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, BookOpen, PenTool, PlayCircle, Star, Flame } from 'lucide-react';
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

type MistakeType = {
  id: string;
  title: string;
  target: string;
  error: string;
  rule: string;
  visual: string;
  pairs: { correct: string; wrong: string; sentence: string }[];
  color: string;
};

const COMMON_MISTAKES: MistakeType[] = [
  {
    id: 'th',
    title: "Bunyi 'TH'",
    target: "/θ/ atau /ð/",
    error: "/t/, /d/, /s/, atau /z/",
    rule: "Julurkan lidahmu KELUAR di antara gigimu! Jangan sembunyikan di belakang gigi.",
    visual: "👅 di antara 🦷",
    pairs: [
      { correct: "Think", wrong: "Sink / Tink", sentence: "I think so." },
      { correct: "Three", wrong: "Tree", sentence: "Number three." },
      { correct: "This", wrong: "Dis", sentence: "This is it." }
    ],
    color: "bg-indigo-50 text-indigo-700 border-indigo-200"
  },
  {
    id: 'vw',
    title: "V vs W",
    target: "/v/ vs /w/",
    error: "Menukarnya",
    rule: "V: Gigi atas menyentuh bibir bawah (Gigit). W: Bibir bulat seperti ciuman (Lingkaran).",
    visual: "🦷 di 👄 vs ⭕",
    pairs: [
      { correct: "Vet", wrong: "Wet", sentence: "Take the dog to the vet." },
      { correct: "West", wrong: "Vest", sentence: "Go west." },
      { correct: "Very", wrong: "Wery", sentence: "Very good." }
    ],
    color: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    id: 'ship-sheep',
    title: "Sheep vs Ship",
    target: "/iː/ (Panjang) vs /ɪ/ (Pendek)",
    error: "Membuatnya terdengar sama",
    rule: "Sheep: Tersenyum lebar (Panjang). Ship: Mulut rileks (Pendek/Cepat).",
    visual: "😁 vs 😐",
    pairs: [
      { correct: "Sheep", wrong: "Ship", sentence: "A white sheep." },
      { correct: "Eat", wrong: "It", sentence: "I want to eat." },
      { correct: "Seat", wrong: "Sit", sentence: "Take a seat." }
    ],
    color: "bg-emerald-50 text-emerald-700 border-blue-200"
  }
];

const SILENT_LETTERS = [
  { word: "Knife", silent: "K", ipa: "/naɪf/", icon: "🔪" },
  { word: "Knee", silent: "K", ipa: "/niː/", icon: "🦵" },
  { word: "Write", silent: "W", ipa: "/raɪt/", icon: "✍️" },
  { word: "Island", silent: "S", ipa: "/ˈaɪlənd/", icon: "🏝️" },
  { word: "Listen", silent: "T", ipa: "/ˈlɪsən/", icon: "👂" },
  { word: "Hour", silent: "H", ipa: "/aʊər/", icon: "⏳" },
  { word: "Honest", silent: "H", ipa: "/ˈɒnɪst/", icon: "😇" },
  { word: "Muscle", silent: "C", ipa: "/ˈmʌsəl/", icon: "💪" },
];

const LISTENING_CHALLENGE = [
  { id: 1, option1: "Think 🤔", option2: "Sink 🚰", audioWord: "Think", hint: "Lidah di antara gigi (TH)" },
  { id: 2, option1: "Wet 💧", option2: "Vet 🩺", audioWord: "Vet", hint: "Gigi menyentuh bibir (V)" },
  { id: 3, option1: "Sheep 🐑", option2: "Ship 🚢", audioWord: "Ship", hint: "Bunyi pendek (Rileks)" },
  { id: 4, option1: "Mouse 🐭", option2: "Mouth 👄", audioWord: "Mouth", hint: "TH lembut di akhir" },
  { id: 5, option1: "Tree 🌳", option2: "Three 3️⃣", audioWord: "Tree", hint: "Bunyi T tajam (Bukan TH)" },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Kata mana yang memiliki huruf MATI (Silent)?",
    options: ['Desk', 'Knife', 'Milk'],
    answer: 'Knife',
    explanation: "'K' di Knife adalah mati (silent). Kita mengucapkan /naɪf/."
  },
  {
    id: 2,
    question: "Untuk membuat bunyi 'V' (seperti Van), kamu harus...",
    options: ['Bulatkan bibirmu', 'Sentuh gigi atas ke bibir bawah'],
    answer: 'Sentuh gigi atas ke bibir bawah',
    explanation: "V adalah 'Penggigit Bibir'. W adalah 'Pembulat Bibir'."
  },
  {
    id: 3,
    question: "Bagaimana kamu mengucapkan 'Island'?",
    options: ['Ice-land', 'Eye-land'],
    answer: 'Eye-land',
    explanation: "'S' nya mati (silent). Terdengar seperti 'Eye-land'."
  },
  {
    id: 4,
    question: "Kata 'Sheep' memiliki bunyi ___.",
    options: ['Pendek (Rileks)', 'Panjang (Tersenyum)'],
    answer: 'Panjang (Tersenyum)',
    explanation: "Sheep /iː/ itu panjang. Ship /ɪ/ itu pendek."
  },
  {
    id: 5,
    question: "Huruf mana yang silent dalam 'Honest'?",
    options: ['O', 'H', 'T'],
    answer: 'H',
    explanation: "H tidak diucapkan dalam 'Honest' - diucapkan 'onest'."
  },
  {
    id: 6,
    question: "Kesalahan umum: TH diucapkan seperti...",
    options: ['/θ/ atau /ð/ (lidah keluar)', '/s/ atau /z/', '/t/ atau /d/'],
    answer: '/θ/ atau /ð/ (lidah keluar)',
    explanation: "TH memerlukan lidah menyentuh gigi atas, bukan T atau S."
  },
  {
    id: 7,
    question: "Kata mana yang memiliki silent letter?",
    options: ['Table', 'Knee', 'Chair'],
    answer: 'Knee',
    explanation: "K dalam 'Knee' adalah silent - diucapkan 'nee'."
  },
  {
    id: 8,
    question: "Huruf mana yang silent dalam 'Write'?",
    options: ['W', 'R', 'T'],
    answer: 'W',
    explanation: "W tidak diucapkan dalam 'Write' - seperti 'rite'."
  },
  {
    id: 9,
    question: "Kesalahan umum dalam 'Walk' adalah...",
    options: ['Mengucapkan L', 'Mengucapkan W', 'Mengucapkan K'],
    answer: 'Mengucapkan L',
    explanation: "L dalam 'Walk' adalah silent - diucapkan 'wok'."
  },
  {
    id: 10,
    question: "Kata mana yang TIDAK memiliki silent letter?",
    options: ['Climb', 'Comb', 'Come'],
    answer: 'Come',
    explanation: "Climb dan Comb memiliki B  silent. Come tidak ada huruf silent."
  },
  {
    id: 11,
    question: "Huruf mana yang silent dalam 'Island'?",
    options: ['I', 'S', 'D'],
    answer: 'S',
    explanation: "S dalam 'Island' adalah silent - diucapkan 'iland'."
  },
  {
    id: 12,
    question: "Kesalahan umum: V dan W terdengar...",
    options: ['Berbeda (/v/ dan /w/)', 'Sama', 'Seperti B'],
    answer: 'Berbeda (/v/ dan /w/)',
    explanation: "V = gigi menyentuh bibir. W = bibir bulat. Mereka BERBEDA!"
  },
  {
    id: 13,
    question: "Kata mana yang memiliki silent B?",
    options: ['Bed', 'Lamb', 'Bat'],
    answer: 'Lamb',
    explanation: "B dalam 'Lamb' adalah silent - diucapkan 'lam'."
  },
  {
    id: 14,
    question: "Huruf mana yang silent dalam 'Castle'?",
    options: ['C', 'T', 'E'],
    answer: 'T',
    explanation: "T dalam 'Castle' sering tidak diucapkan - 'cas-sul'."
  },
  {
    id: 15,
    question: "Kesalahan umum: SH diucapkan seperti...",
    options: ['/ʃ/ (seperti Shhh)', '/s/', '/ch/'],
    answer: '/ʃ/ (seperti Shhh)',
    explanation: "SH diucapkan seperti 'shhh' (diam), bukan S atau CH."
  },
  {
    id: 16,
    question: "Kata mana yang memiliki silent H?",
    options: ['House', 'Hour', 'Help'],
    answer: 'Hour',
    explanation: "H dalam 'Hour' adalah silent - diucapkan 'our'."
  },
  {
    id: 17,
    question: "Huruf mana yang silent dalam 'Listen'?",
    options: ['L', 'T', 'N'],
    answer: 'T',
    explanation: "T dalam 'Listen' adalah silent - diucapkan 'lissen'."
  },
  {
    id: 18,
    question: "Kesalahan umum: L dan R terdengar...",
    options: ['Berbeda (/l/ dan /r/)', 'Sama', 'Seperti W'],
    answer: 'Berbeda (/l/ dan /r/)',
    explanation: "L = lidah menyentuh langit-langit. R = lidah tidak menyentuh. Berbeda!"
  },
  {
    id: 19,
    question: "Kata mana yang memiliki silent G?",
    options: ['Big', 'Sign', 'Bag'],
    answer: 'Sign',
    explanation: "G dalam 'Sign' adalah silent - diucapkan 'sine'."
  },
  {
    id: 20,
    question: "Kenapa penting mengetahui silent letters?",
    options: ['Untuk ejaan', 'Untuk pronunciation yang benar', 'Tidak penting'],
    answer: 'Untuk pronunciation yang benar',
    explanation: "Silent letters membantu Anda mengucapkan kata dengan benar!"
  }
];

const PronunLesson9: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/pronunciation/lesson-10';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedPronunLessons().includes(9));
  const [showPronunModal, setShowPronunModal] = React.useState(false);
  const handleSelesai = () => { markPronunComplete(9); setIsCompleted(true); setShowPronunModal(true); };

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
          Kamu telah menyelesaikan <b>Pronunciation Lesson 9</b>. Terus semangat!
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

  
  // Ear Training State
  const [listeningStep, setListeningStep] = useState(0);
  const [listeningResult, setListeningResult] = useState<'correct' | 'incorrect' | null>(null);

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string, rate: number = 0.9) => { playAudio(text, rate); };

  // Ear Training Handlers
  const checkListening = (selected: string) => {
    if (listeningResult) return;

    const current = LISTENING_CHALLENGE[listeningStep];
    const correctOption = current.audioWord; // simple check logic

    if (selected.includes(correctOption)) {
      setListeningResult('correct');
      playSound("Correct!");
    } else {
      setListeningResult('incorrect');
      playSound("Try again.");
    }

    setTimeout(() => {
      setListeningResult(null);
      if (listeningStep < LISTENING_CHALLENGE.length - 1) {
        setListeningStep(prev => prev + 1);
      } else {
        alert("Latihan Telinga Selesai! Sekarang coba Kuis.");
        setListeningStep(0);
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
            title="Kesalahan Umum"
            subtitle="Pronunciation • Pelajaran 9"
            accentColor="#E83E8C"
            nextLesson={'/modul/english/beginner/pronunciation/lesson-10'}
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
              <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Flame size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Perbaiki Aksenmu</h2>
                  <p className="text-red-100 text-sm leading-relaxed">
                    Kesalahan kecil bisa mengubah arti kata.
                    <br />"I am <b>sinking</b>" 🚢 (tenggelam) vs "I am <b>thinking</b>" 🤔 (berpikir).
                  </p>
                </div>
              </motion.section>

              <div className="space-y-6">
                {COMMON_MISTAKES.map((item) => (
                  <div key={item.id} className={`rounded-2xl border p-5 ${item.color.replace('text-', 'border-').split(' ')[2] || 'border-[var(--color-border)]'} bg-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold bg-white p-2 rounded-lg shadow-[var(--shadow-card)] border border-[var(--color-border)]">{item.visual}</span>
                        <h3 className={`text-lg font-bold ${item.color.split(' ')[1]}`}>{item.title}</h3>
                      </div>
                    </div>

                    <div className="bg-white/50 rounded-xl p-3 mb-4 text-sm text-[var(--color-text-primary)] border border-[var(--color-border)]">
                      <p className="font-bold mb-1">Aturan:</p>
                      {item.rule}
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {item.pairs.map((pair, i) => (
                        <div key={i} className="flex items-center justify-between bg-white p-3 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                          <div className="flex-1 text-center border-r border-[var(--color-border)] pr-2">
                            <span className="block text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">Kesalahan Umum</span>
                            <button
                              onClick={() => playSound(pair.wrong, 0.9)}
                              className="font-medium text-[var(--color-text-muted)] line-through decoration-red-400 hover:text-red-500 transition-colors"
                            >
                              "{pair.wrong}"
                            </button>
                          </div>
                          <div className="flex-1 text-center pl-2">
                            <span className="block text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1">Cara Benar</span>
                            <button
                              onClick={() => playSound(pair.correct, 0.9)}
                              className="font-bold text-[var(--color-text-primary)] hover:text-green-600 transition-colors"
                            >
                              "{pair.correct}"
                            </button>
                          </div>
                          <button
                            onClick={() => playSound(pair.correct)}
                            className="ml-3 w-10 h-10 rounded-full bg-[var(--color-background)] flex items-center justify-center text-[var(--color-text-muted)] hover:bg-gray-100 hover:text-indigo-600 transition-colors"
                          >
                            <PlayCircle size={24} />
                          </button>
                        </div>
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
                  className="space-y-6"
                >
                  <div className="max-w-xl mx-auto text-center">
                    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-red-100 border border-red-50 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                        <div
                          className="h-full bg-red-500 transition-all duration-300"
                          style={{ width: `${((listeningStep + 1) / LISTENING_CHALLENGE.length) * 100}%` }}
                        ></div>
                      </div>
                      <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-6">Permainan Pasangan Minimal</h3>
                      <p className="text-[var(--color-text-muted)] text-sm mb-6">Ketuk untuk memutar suara, lalu tebak katanya.</p>
                      <div className="mb-8">
                        <button
                          onClick={() => playSound(LISTENING_CHALLENGE[listeningStep].audioWord)}
                          className="w-24 h-24 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto hover:bg-red-100 hover:scale-105 active:scale-95 transition-all shadow-inner"
                        >
                          <Volume2 size={40} />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => checkListening(LISTENING_CHALLENGE[listeningStep].option1)} className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-red-300 hover:bg-red-50 font-bold text-[var(--color-text-primary)] transition-all active:scale-95">{LISTENING_CHALLENGE[listeningStep].option1}</button>
                        <button onClick={() => checkListening(LISTENING_CHALLENGE[listeningStep].option2)} className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-red-300 hover:bg-red-50 font-bold text-[var(--color-text-primary)] transition-all active:scale-95">{LISTENING_CHALLENGE[listeningStep].option2}</button>
                      </div>
                      {listeningResult && (
                        <div className={`mt-6 font-bold ${listeningResult === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
                          {listeningResult === 'correct' ? 'Benar! 🎉' : 'Ups! Coba lagi.'}
                          {listeningResult === 'correct' && <p className="text-xs font-normal text-[var(--color-text-muted)] mt-1">{LISTENING_CHALLENGE[listeningStep].hint}</p>}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] text-center">
                    <h3 className="font-bold text-[var(--color-text-primary)] mb-2 flex items-center justify-center gap-2"><Volume2 size={20} />Huruf Hantu 👻</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">Bahasa Inggris punya huruf yang kita tulis tapi <b>tidak diucapkan</b>.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {SILENT_LETTERS.map((item, idx) => (
                      <button key={idx} onClick={() => playSound(item.word)} className="bg-white p-4 rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:border-red-200 transition-all flex flex-col items-center group relative overflow-hidden">
                        <span className="text-2xl mb-2">{item.icon}</span>
                        <span className="text-lg font-bold text-[var(--color-text-primary)]">{item.word.split('').map((char, cIdx) => (<span key={cIdx} className={char.toLowerCase() === item.silent.toLowerCase() ? "text-red-300 line-through decoration-red-300 decoration-2" : ""}>{char}</span>))}</span>
                        <span className="text-xs text-[var(--color-text-muted)] font-mono mt-1">{item.ipa}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
            ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
<div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-red-50 text-red-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6 flex flex-col gap-2">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-red-300 hover:bg-[var(--color-background)]";
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
                    className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
            </div>
                </motion.div>
            )}
        </LessonShell>
    </>
  );
};

export default PronunLesson9;
