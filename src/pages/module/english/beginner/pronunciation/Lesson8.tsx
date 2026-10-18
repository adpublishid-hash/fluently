import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Volume2, PlayCircle, Lightbulb, Sparkles, CheckCircle2,
    XCircle, BookOpen, PenTool, Star, Flame, ChevronLeft, ChevronRight
} from 'lucide-react';
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

type LinkingRule = {
    id: string;
    name: string;
    formula: string;
    description: string;
    examples: { phrase: string; phonetic: string }[];
    color: string;
    badgeColor: string;
};

const LINKING_RULES: LinkingRule[] = [
    {
        id: 'cv',
        name: 'Konsonan → Vokal',
        formula: 'K + V',
        description: "Ketika kata berakhiran KONSONAN dan kata berikutnya dimulai dengan VOKAL, pindahkan konsonan ke kata berikutnya sehingga terdengar lebih lancar.",
        examples: [
            { phrase: "Stop it", phonetic: "Sto-pit" },
            { phrase: "Need it", phonetic: "Nee-dit" },
            { phrase: "Turn on", phonetic: "Tur-non" },
            { phrase: "Wake up", phonetic: "Way-kup" }
        ],
        color: "bg-indigo-50 border-indigo-200",
        badgeColor: "text-indigo-700"
    },
    {
        id: 'cc',
        name: 'Konsonan Sama',
        formula: 'K = K',
        description: "Ketika kata-kata berbagi bunyi KONSONAN yang sama di batas kata, ucapkan hanya SEKALI — jangan terhenti atau ulangi bunyi tersebut.",
        examples: [
            { phrase: "Black cat", phonetic: "Bla-cat" },
            { phrase: "Good day", phonetic: "Goo-day" },
            { phrase: "Red dress", phonetic: "Re-dress" },
            { phrase: "Big girl", phonetic: "Bi-girl" }
        ],
        color: "bg-rose-50 border-rose-200",
        badgeColor: "text-rose-700"
    }
];

const PRACTICE_ITEMS = [
    { id: 1, phrase: "Wake up",    type: "K+V", broken: "Wake. Up.",   smooth: "Way-kup",  hint: "/k/ dari 'wake' pindah ke 'up'" },
    { id: 2, phrase: "Turn on",    type: "K+V", broken: "Turn. On.",   smooth: "Tur-non",  hint: "/n/ dari 'turn' pindah ke 'on'" },
    { id: 3, phrase: "Black cat",  type: "K+K", broken: "Black. Cat.", smooth: "Bla-cat",  hint: "Satu bunyi /k/, tidak dua kali" },
    { id: 4, phrase: "Stop it",    type: "K+V", broken: "Stop. It.",   smooth: "Sto-pit",  hint: "/p/ dari 'stop' pindah ke 'it'" },
    { id: 5, phrase: "Good day",   type: "K+K", broken: "Good. Day.",  smooth: "Goo-day",  hint: "Satu bunyi /d/, tidak dua kali" },
];

const QUIZ_QUESTIONS = [
    { id: 1,  question: "Bagaimana penutur asli mengucapkan 'Look at'?", options: ['Look. At.', 'Loo-kat', 'Look at'], answer: 'Loo-kat', explanation: "K di 'look' bergabung dengan vokal 'a' di 'at' → Loo-KAT." },
    { id: 2,  question: "Apa itu 'Linking' dalam pronunciation?", options: ['Berhenti di setiap kata', 'Berbicara pelan', 'Menggabungkan bunyi kata'], answer: 'Menggabungkan bunyi kata', explanation: "Linking = menghubungkan akhiran satu kata dengan awal kata berikutnya." },
    { id: 3,  question: "Bagaimana 'Turn it off' diucapkan dengan linking?", options: ['Tur-ni-toff', 'Turn. It. Off.', 'Turn-it-off'], answer: 'Tur-ni-toff', explanation: "N+I terhubung, T+O terhubung sehingga mengalir seperti satu kata." },
    { id: 4,  question: "Kenapa penutur asli menggunakan linking?", options: ['Untuk sulit dipahami', 'Tidak ada alasan', 'Untuk berbicara lebih cepat dan natural'], answer: 'Untuk berbicara lebih cepat dan natural', explanation: "Linking membuat ucapan lebih lancar dan terdengar natural." },
    { id: 5,  question: "Bagaimana 'An apple' diucapkan?", options: ['An-apple', 'A-napple', 'An. Apple.'], answer: 'A-napple', explanation: "N di 'an' bergabung dengan A di 'apple' → A-NAPPLE." },
    { id: 6,  question: "Linking terjadi ketika kata pertama berakhir dengan...", options: ['Vokal atau konsonan', 'Hanya vokal', 'Hanya konsonan'], answer: 'Vokal atau konsonan', explanation: "Linking bisa terjadi dari konsonan ke vokal maupun vokal ke vokal." },
    { id: 7,  question: "Bagaimana 'Come in' diucapkan?", options: ['Come. In.', 'Come-in', 'Co-min'], answer: 'Co-min', explanation: "M di 'come' bergabung dengan I di 'in' → Co-MIN." },
    { id: 8,  question: "Bagaimana 'Put it on' diucapkan dengan linking?", options: ['Pu-ti-ton', 'Put-it-on', 'Put. It. On.'], answer: 'Pu-ti-ton', explanation: "T+I terhubung, T+O terhubung → Pu-ti-TON." },
    { id: 9,  question: "Linking membuat bahasa Inggris terdengar...", options: ['Terputus-putus', 'Lancar dan smooth', 'Lambat'], answer: 'Lancar dan smooth', explanation: "Linking membuat kalimat mengalir seperti satu kata panjang." },
    { id: 10, question: "Bagaimana 'Take it easy' diucapkan?", options: ['Take-it-easy', 'Take. It. Easy.', 'Tay-ki-tee-zy'], answer: 'Tay-ki-tee-zy', explanation: "Semua kata terhubung dengan mulus: Tay-KI-TEE-zy." },
    { id: 11, question: "Bagaimana 'Get up' diucapkan?", options: ['Get-up', 'Ge-tup', 'Get. Up.'], answer: 'Ge-tup', explanation: "T di 'get' bergabung dengan U di 'up' → Ge-TUP." },
    { id: 12, question: "Manakah contoh linking yang benar untuk 'Check it out'?", options: ['Che-ki-tout', 'Check-it-out', 'Check. It. Out.'], answer: 'Che-ki-tout', explanation: "K+I terhubung, T+O terhubung → Che-ki-TOUT." },
    { id: 13, question: "Bagaimana 'Pick it up' diucapkan?", options: ['Pick-it-up', 'Pi-ki-tup', 'Pick. It. Up.'], answer: 'Pi-ki-tup', explanation: "K+I dan T+U terhubung → Pi-ki-TUP." },
    { id: 14, question: "Linking paling umum terjadi antara...", options: ['Kata yang bersebelahan', 'Kalimat berbeda', 'Kata yang terpisah jauh'], answer: 'Kata yang bersebelahan', explanation: "Linking terjadi antara kata-kata yang berdekatan dalam satu frase." },
    { id: 15, question: "Bagaimana 'Stand up' diucapkan?", options: ['Stand. Up.', 'Stand-up', 'Stan-dup'], answer: 'Stan-dup', explanation: "D di 'stand' bergabung dengan U di 'up' → Stan-DUP." },
    { id: 16, question: "Apa yang terjadi pada 'Want to' dalam ucapan cepat?", options: ['Wanna', 'Want. To.', 'Want-to'], answer: 'Wanna', explanation: "'Want to' sering diucapkan sebagai 'wanna' dalam percakapan santai." },
    { id: 17, question: "Bagaimana 'Call it' diucapkan?", options: ['Call. It.', 'Ca-lit', 'Call-it'], answer: 'Ca-lit', explanation: "L di 'call' bergabung dengan I di 'it' → Ca-LIT." },
    { id: 18, question: "Kenapa linking penting untuk dipelajari?", options: ['Tidak penting', 'Untuk memahami penutur asli', 'Untuk menulis'], answer: 'Untuk memahami penutur asli', explanation: "Penutur asli selalu menggunakan linking, jadi kamu perlu memahami mereka." },
    { id: 19, question: "Bagaimana 'Wake up' diucapkan?", options: ['Wake-up', 'Way-kup', 'Wake. Up.'], answer: 'Way-kup', explanation: "K di 'wake' bergabung dengan U di 'up' → Way-KUP." },
    { id: 20, question: "Linking membuat Anda terdengar...", options: ['Seperti penutur asli', 'Seperti robot', 'Tidak jelas'], answer: 'Seperti penutur asli', explanation: "Linking adalah salah satu kunci paling penting untuk terdengar natural!" },
];

const PronunLesson8: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/pronunciation/lesson-9';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedPronunLessons().includes(8));
  const [showPronunModal, setShowPronunModal] = React.useState(false);
  const handleSelesai = () => { markPronunComplete(8); setIsCompleted(true); setShowPronunModal(true); };

    // Practice State
    const [practiceIndex, setPracticeIndex] = useState(0);

    // Quiz State
    const [quizStep, setQuizStep] = useState(0);
    const [quizScore, setQuizScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);

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


  const pronunModal = showPronunModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowPronunModal(false)}>
      <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #7C3AED, #7C3AED99)' }}><span style={{ fontSize: 36 }}>🏆</span></div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Lesson Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Pronunciation Lesson 8</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowPronunModal(false); navigate('/modul/english/beginner/pronunciation/lesson-9'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #7C3AED, #7C3AEDbb)' }}>Next ›</button>
          <button onClick={() => { setShowPronunModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;
    return (
    <>
    {pronunModal}
        <LessonShell
            title="Penggabungan Bunyi"
            subtitle="Pronunciation • Pelajaran 8"
            accentColor="#7C3AED"
            nextLesson={'/modul/english/beginner/pronunciation/lesson-9'}
            tabs={[
                { id: 'learn',    label: 'Pelajari', icon: <BookOpen size={14} /> },
                { id: 'practice', label: 'Latihan',  icon: <PenTool size={14} /> },
                { id: 'quiz',     label: 'Kuis',     icon: <Star size={14} />    },
            ]}
            footer={() => (
                <button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #7C3AED, #7C3AEDbb)' }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai \u2713' : 'Selesai'}
                </button>
            )}
        >
            {(tabId) => tabId === 'learn' ? (
                <div className="space-y-6">
                    {/* Hero Intro */}
                    <motion.section
                        custom={0} variants={sectionVariants} initial="hidden" animate="visible"
                        className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <Flame size={96} />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold mb-2">Ucapan Bersambung 🔗</h2>
                            <p className="text-indigo-100 text-sm leading-relaxed">
                                Penutur asli tidak berbicara seperti robot. Mereka <b>menghubungkan</b> kata-kata.
                                <br /><br />
                                Kata-kata meleleh satu sama lain seperti es krim! 🍦
                            </p>
                        </div>
                    </motion.section>

                    {/* Listen: Robot vs Native */}
                    <motion.section
                        custom={1} variants={sectionVariants} initial="hidden" animate="visible"
                        className="bg-white rounded-2xl p-6 border border-[var(--color-border)] shadow-[var(--shadow-card)]"
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <Lightbulb size={20} className="text-yellow-500 shrink-0 mt-0.5" />
                            <h3 className="font-bold text-[var(--color-text-primary)]">Dengarkan perbedaannya:</h3>
                        </div>

                        <div className="grid gap-3">
                            <button
                                onClick={() => playSound("Stop. It.", 0.7)}
                                className="flex items-center justify-between bg-[var(--color-background)] p-4 rounded-xl border border-[var(--color-border)] hover:bg-gray-100 transition-colors"
                            >
                                <div className="text-left">
                                    <span className="block font-bold text-[var(--color-text-secondary)] text-lg">🤖 Robot</span>
                                    <span className="text-[var(--color-text-muted)] text-sm">"Stop. It." — terputus-putus</span>
                                </div>
                                <PlayCircle size={32} className="text-gray-400" />
                            </button>

                            <button
                                onClick={() => playSound("Stop it", 1)}
                                className="flex items-center justify-between bg-indigo-50 p-4 rounded-xl border border-indigo-200 hover:bg-indigo-100 transition-colors shadow-sm"
                            >
                                <div className="text-left">
                                    <span className="block font-bold text-indigo-700 text-lg">😊 Native</span>
                                    <span className="text-indigo-500 text-sm font-bold">"Sto-pit" — mengalir lancar</span>
                                </div>
                                <PlayCircle size={32} className="text-indigo-400" />
                            </button>
                        </div>
                    </motion.section>

                    {/* Linking Rules */}
                    {LINKING_RULES.map((rule, idx) => (
                        <motion.section
                            key={rule.id}
                            custom={idx + 2} variants={sectionVariants} initial="hidden" animate="visible"
                            className={`rounded-2xl border-2 p-5 bg-white ${rule.color}`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className={`text-lg font-bold ${rule.badgeColor}`}>{rule.name}</h3>
                                <span className={`text-xs font-black px-2 py-1 rounded-full border ${rule.color} ${rule.badgeColor}`}>{rule.formula}</span>
                            </div>
                            <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">{rule.description}</p>

                            <div className="grid grid-cols-1 gap-2">
                                {rule.examples.map((ex, i) => (
                                    <button
                                        key={i}
                                        onClick={() => playSound(ex.phrase)}
                                        className="flex items-center justify-between bg-[var(--color-background)] p-3 rounded-xl border border-[var(--color-border)] hover:bg-white transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-[var(--color-text-primary)]">{ex.phrase}</span>
                                            <span className="text-slate-300">→</span>
                                            <span className={`text-sm font-bold ${rule.badgeColor}`}>{ex.phonetic}</span>
                                        </div>
                                        <Volume2 size={16} className="text-gray-300 group-hover:text-indigo-500" />
                                    </button>
                                ))}
                            </div>
                        </motion.section>
                    ))}
                </div>

            ) : tabId === 'practice' ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-xl mx-auto pt-4"
                >
                    <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-indigo-100/50 border border-indigo-50 relative overflow-hidden">
                        {/* Progress bar */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                            <div
                                className="h-full bg-indigo-500 transition-all duration-300"
                                style={{ width: `${((practiceIndex + 1) / PRACTICE_ITEMS.length) * 100}%` }}
                            />
                        </div>

                        <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-6 text-center">
                            Pembangun Koneksi · {practiceIndex + 1}/{PRACTICE_ITEMS.length}
                        </h3>

                        <div className="mb-6 text-center">
                            <h2 className="text-3xl font-black text-[var(--color-text-primary)] mb-2">
                                {PRACTICE_ITEMS[practiceIndex].phrase}
                            </h2>
                            <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-[var(--color-text-muted)] text-xs font-bold">
                                {PRACTICE_ITEMS[practiceIndex].type}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4 mb-6">
                            <button
                                onClick={() => playSound(PRACTICE_ITEMS[practiceIndex].broken, 0.6)}
                                className="p-4 rounded-xl border-2 border-[var(--color-border)] hover:bg-[var(--color-background)] flex flex-col items-center gap-2 transition-all active:scale-95"
                            >
                                <span className="text-2xl">🤖</span>
                                <span className="text-xs font-bold text-[var(--color-text-muted)]">Robot</span>
                                <span className="text-sm text-[var(--color-text-muted)]">{PRACTICE_ITEMS[practiceIndex].broken}</span>
                            </button>

                            <button
                                onClick={() => playSound(PRACTICE_ITEMS[practiceIndex].phrase, 1)}
                                className="p-4 rounded-xl border-2 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 flex flex-col items-center gap-2 transition-all active:scale-95 shadow-sm"
                            >
                                <span className="text-2xl">😊</span>
                                <span className="text-xs font-bold text-indigo-500">Lancar</span>
                                <span className="text-sm font-bold text-indigo-700">{PRACTICE_ITEMS[practiceIndex].smooth}</span>
                            </button>
                        </div>

                        <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-sm text-yellow-800 flex items-start gap-3 text-left mb-6">
                            <Lightbulb size={18} className="shrink-0 mt-0.5" />
                            <p>{PRACTICE_ITEMS[practiceIndex].hint}</p>
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={() => setPracticeIndex(prev => Math.max(0, prev - 1))}
                                disabled={practiceIndex === 0}
                                className="text-[var(--color-text-muted)] font-bold text-sm hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                            >
                                <ChevronLeft size={16} /> Prev
                            </button>
                            <button
                                onClick={() => setPracticeIndex(prev => Math.min(PRACTICE_ITEMS.length - 1, prev + 1))}
                                disabled={practiceIndex === PRACTICE_ITEMS.length - 1}
                                className="text-[var(--color-text-muted)] font-bold text-sm hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                            >
                                Next <ChevronRight size={16} />
                            </button>
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
                            {/* Progress */}
                            <div className="w-full bg-gray-100 h-2 rounded-full mb-6 overflow-hidden">
                                <div
                                    className="h-full bg-violet-500 transition-all duration-300"
                                    style={{ width: `${((quizStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                                />
                            </div>
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                                    Soal {quizStep + 1} / {QUIZ_QUESTIONS.length}
                                </span>
                                <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
                                    Skor: {quizScore}
                                </span>
                            </div>

                            <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-6">
                                {QUIZ_QUESTIONS[quizStep].question}
                            </h3>

                            <div className="space-y-3">
                                {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                                    let btnClass = "border-[var(--color-border)] hover:border-indigo-300 hover:bg-[var(--color-background)]";
                                    if (isAnswerChecked) {
                                        if (option === QUIZ_QUESTIONS[quizStep].answer) btnClass = "bg-green-50 border-sky-500 text-green-700";
                                        else if (option === selectedOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                                        else btnClass = "opacity-40 border-[var(--color-border)]";
                                    }
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleCheckQuiz(option)}
                                            disabled={isAnswerChecked}
                                            className={`w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${btnClass}`}
                                        >
                                            <span>{option}</span>
                                            {isAnswerChecked && option === QUIZ_QUESTIONS[quizStep].answer && <CheckCircle2 size={20} className="text-green-600 shrink-0" />}
                                            {isAnswerChecked && option === selectedOption && option !== QUIZ_QUESTIONS[quizStep].answer && <XCircle size={20} className="text-red-500 shrink-0" />}
                                        </button>
                                    );
                                })}
                            </div>

                            {isAnswerChecked && (
                                <div className="mt-6">
                                    <div className={`p-3 rounded-lg text-sm mb-4 ${selectedOption === QUIZ_QUESTIONS[quizStep].answer ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'}`}>
                                        💡 {QUIZ_QUESTIONS[quizStep].explanation}
                                    </div>
                                    <button
                                        onClick={nextQuizQuestion}
                                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                                    >
                                        {quizStep < QUIZ_QUESTIONS.length - 1 ? 'Pertanyaan Selanjutnya →' : 'Lihat Hasil'}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Sparkles size={44} className="text-yellow-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Kuis Selesai! 🎉</h2>
                            <p className="text-[var(--color-text-muted)] mb-2">Skor kamu:</p>
                            <p className="text-5xl font-black text-violet-600 mb-6">
                                {quizScore} <span className="text-xl font-normal text-[var(--color-text-muted)]">/ {QUIZ_QUESTIONS.length}</span>
                            </p>
                            <p className="text-sm text-[var(--color-text-muted)] mb-8">
                                {quizScore >= 16 ? '🏆 Luar biasa! Kamu menguasai linking sounds!' :
                                 quizScore >= 12 ? '⭐ Bagus! Terus berlatih linking sounds.' :
                                 '💪 Coba lagi — baca ulang materi Pelajari terlebih dahulu.'}
                            </p>
                            <button
                                onClick={restartQuiz}
                                className="px-8 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-200"
                            >
                                Ulangi Kuis
                            </button>
                        </div>
                    )}
                </motion.div>
            )}
        </LessonShell>
    </>
  );
};

export default PronunLesson8;
