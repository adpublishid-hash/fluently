import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Volume2, PlayCircle, Lightbulb, CheckCircle2, XCircle,
    BookOpen, PenTool, Star, Sparkles
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

type LetterData = {
    char: string;
    nameIpa: string;
    soundIpa: string;
    example: string;
    type: 'Vowel' | 'Consonant';
};

const ALPHABET_DATA: LetterData[] = [
    { char: 'A', nameIpa: '/eɪ/', soundIpa: '/æ/', example: 'Apple', type: 'Vowel' },
    { char: 'B', nameIpa: '/biː/', soundIpa: '/b/', example: 'Ball', type: 'Consonant' },
    { char: 'C', nameIpa: '/siː/', soundIpa: '/k/', example: 'Cat', type: 'Consonant' },
    { char: 'D', nameIpa: '/diː/', soundIpa: '/d/', example: 'Dog', type: 'Consonant' },
    { char: 'E', nameIpa: '/iː/', soundIpa: '/ɛ/', example: 'Egg', type: 'Vowel' },
    { char: 'F', nameIpa: '/ɛf/', soundIpa: '/f/', example: 'Fish', type: 'Consonant' },
    { char: 'G', nameIpa: '/dʒiː/', soundIpa: '/ɡ/', example: 'Goat', type: 'Consonant' },
    { char: 'H', nameIpa: '/eɪtʃ/', soundIpa: '/h/', example: 'Hat', type: 'Consonant' },
    { char: 'I', nameIpa: '/aɪ/', soundIpa: '/ɪ/', example: 'Igloo', type: 'Vowel' },
    { char: 'J', nameIpa: '/dʒeɪ/', soundIpa: '/dʒ/', example: 'Jam', type: 'Consonant' },
    { char: 'K', nameIpa: '/keɪ/', soundIpa: '/k/', example: 'Kite', type: 'Consonant' },
    { char: 'L', nameIpa: '/ɛl/', soundIpa: '/l/', example: 'Lion', type: 'Consonant' },
    { char: 'M', nameIpa: '/ɛm/', soundIpa: '/m/', example: 'Monkey', type: 'Consonant' },
    { char: 'N', nameIpa: '/ɛn/', soundIpa: '/n/', example: 'Nest', type: 'Consonant' },
    { char: 'O', nameIpa: '/oʊ/', soundIpa: '/ɒ/', example: 'Octopus', type: 'Vowel' },
    { char: 'P', nameIpa: '/piː/', soundIpa: '/p/', example: 'Pig', type: 'Consonant' },
    { char: 'Q', nameIpa: '/kjuː/', soundIpa: '/kw/', example: 'Queen', type: 'Consonant' },
    { char: 'R', nameIpa: '/ɑːr/', soundIpa: '/r/', example: 'Rabbit', type: 'Consonant' },
    { char: 'S', nameIpa: '/ɛs/', soundIpa: '/s/', example: 'Snake', type: 'Consonant' },
    { char: 'T', nameIpa: '/tiː/', soundIpa: '/t/', example: 'Tiger', type: 'Consonant' },
    { char: 'U', nameIpa: '/juː/', soundIpa: '/ʌ/', example: 'Umbrella', type: 'Vowel' },
    { char: 'V', nameIpa: '/viː/', soundIpa: '/v/', example: 'Van', type: 'Consonant' },
    { char: 'W', nameIpa: '/ˈdʌbəl.juː/', soundIpa: '/w/', example: 'Watch', type: 'Consonant' },
    { char: 'X', nameIpa: '/ɛks/', soundIpa: '/ks/', example: 'Box', type: 'Consonant' },
    { char: 'Y', nameIpa: '/waɪ/', soundIpa: '/j/', example: 'Yo-yo', type: 'Consonant' },
    { char: 'Z', nameIpa: '/ziː/', soundIpa: '/z/', example: 'Zebra', type: 'Consonant' },
];

const PRACTICE_QUIZ = [
    { id: 1,  question: "Huruf mana yang membuat bunyi /b/ seperti dalam 'Ball'?",  answer: 'B',    options: ['D', 'B', 'P'] },
    { id: 2,  question: "Huruf mana yang membuat bunyi /s/ seperti dalam 'Sun'?",   answer: 'S',    options: ['C', 'S', 'Z'] },
    { id: 3,  question: "Pilih HURUF VOKAL:",                                        answer: 'E',    options: ['F', 'E', 'G'] },
    { id: 4,  question: "Apa bunyi awal dari 'Fish'?",                               answer: '/f/',  options: ['/p/', '/f/', '/v/'] },
    { id: 5,  question: "Pilih HURUF VOKAL:",                                        answer: 'I',    options: ['L', 'J', 'I'] },
    { id: 6,  question: "Huruf mana yang membuat bunyi /k/ seperti dalam 'Cat'?",   answer: 'C',    options: ['S', 'C', 'K'] },
    { id: 7,  question: "Huruf mana yang membuat bunyi /m/ seperti dalam 'Monkey'?",answer: 'M',    options: ['W', 'N', 'M'] },
    { id: 8,  question: "Pilih HURUF VOKAL:",                                        answer: 'O',    options: ['O', 'Q', 'P'] },
    { id: 9,  question: "Apa bunyi awal dari 'Tiger'?",                              answer: '/t/',  options: ['/t/', '/d/', '/th/'] },
    { id: 10, question: "Huruf mana yang membuat bunyi /h/ seperti dalam 'Hat'?",   answer: 'H',    options: ['G', 'J', 'H'] },
    { id: 11, question: "Pilih HURUF VOKAL:",                                        answer: 'U',    options: ['T', 'V', 'U'] },
    { id: 12, question: "Huruf mana yang membuat bunyi /l/ seperti dalam 'Lion'?",  answer: 'L',    options: ['L', 'I', 'J'] },
    { id: 13, question: "Apa bunyi awal dari 'Rabbit'?",                             answer: '/r/',  options: ['/r/', '/w/', '/l/'] },
    { id: 14, question: "Huruf mana yang membuat bunyi /z/ seperti dalam 'Zebra'?", answer: 'Z',    options: ['Z', 'S', 'X'] },
    { id: 15, question: "Pilih HURUF VOKAL:",                                        answer: 'A',    options: ['A', 'C', 'B'] },
    { id: 16, question: "Huruf mana yang membuat bunyi /n/ seperti dalam 'Nest'?",  answer: 'N',    options: ['N', 'M', 'W'] },
    { id: 17, question: "Apa bunyi awal dari 'Van'?",                                answer: '/v/',  options: ['/v/', '/f/', '/b/'] },
    { id: 18, question: "Huruf mana yang membuat bunyi /w/ seperti dalam 'Watch'?", answer: 'W',    options: ['W', 'U', 'V'] },
    { id: 19, question: "Huruf mana yang membuat bunyi /j/ seperti dalam 'Yo-yo'?", answer: 'Y',    options: ['J', 'Y', 'G'] },
    { id: 20, question: "Apa bunyi awal dari 'Queen'?",                              answer: '/kw/', options: ['/q/', '/kw/', '/k/'] },
];

const PronunLesson1: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/pronunciation/lesson-2';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedPronunLessons().includes(1));
  const [showPronunModal, setShowPronunModal] = React.useState(false);
  const handleSelesai = () => { markPronunComplete(1); setIsCompleted(true); setShowPronunModal(true); };

    const [quizStep, setQuizStep] = useState(0);
    const [quizScore, setQuizScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);

    const playSound = (text: string) => { playAudio(text, 0.8); };

    const playPhonics = (letter: LetterData) => {
        playSound(`The letter ${letter.char}. ${letter.example}.`);
    };

    const handleCheckQuiz = (option: string) => {
        if (isAnswerChecked) return;
        setSelectedOption(option);
        setIsAnswerChecked(true);
        if (option === PRACTICE_QUIZ[quizStep].answer) {
            setQuizScore(prev => prev + 1);
            playSound("Correct!");
        } else {
            playSound("Incorrect.");
        }
    };

    const nextQuizQuestion = () => {
        if (quizStep < PRACTICE_QUIZ.length - 1) {
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

    const vowels = ALPHABET_DATA.filter(l => l.type === 'Vowel');
    const consonants = ALPHABET_DATA.filter(l => l.type === 'Consonant');


  const pronunModal = showPronunModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowPronunModal(false)}>
      <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #7C3AED, #7C3AED99)' }}><span style={{ fontSize: 36 }}>🏆</span></div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Lesson Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Pronunciation Lesson 1</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowPronunModal(false); navigate('/modul/english/beginner/pronunciation/lesson-2'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #7C3AED, #7C3AEDbb)' }}>Next ›</button>
          <button onClick={() => { setShowPronunModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;
    return (
    <>
    {pronunModal}
        <LessonShell
            title="Alfabet & Bunyi"
            subtitle="Pronunciation • Pelajaran 1"
            accentColor="#7C3AED"
            nextLesson={'/modul/english/beginner/pronunciation/lesson-2'}
            tabs={[
                { id: 'learn',   label: 'A-Z Bunyi', icon: <BookOpen size={14} /> },
                { id: 'vowels',  label: 'Vokal',     icon: <Star size={14} /> },
                { id: 'quiz',    label: 'Kuis',      icon: <PenTool size={14} /> },
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
                        className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Volume2 size={96} />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold mb-2">Nama Huruf vs. Bunyi 🎵</h2>
                            <p className="text-purple-100 text-sm leading-relaxed">
                                Setiap huruf memiliki <b>Nama</b> (cara kita menyebutnya) dan <b>Bunyi</b> (cara kita mengucapkannya dalam kata).
                                <br /><br />
                                Contoh: Huruf <b>A</b> — Nama: /eɪ/ — Bunyi dalam 'Apple': /æ/
                            </p>
                        </div>
                    </motion.section>

                    {/* Alphabet Grid */}
                    <motion.section
                        custom={1} variants={sectionVariants} initial="hidden" animate="visible"
                    >
                        <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                            Ketuk huruf untuk mendengar pronunciasinya
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {ALPHABET_DATA.map((item) => (
                                <button
                                    key={item.char}
                                    onClick={() => playPhonics(item)}
                                    className="bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-sm active:scale-95 transition-transform cursor-pointer group hover:border-purple-300 hover:shadow-md text-left"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-2xl font-extrabold ${item.type === 'Vowel' ? 'text-red-500' : 'text-[var(--color-text-primary)]'}`}>
                                            {item.char}
                                        </span>
                                        <Volume2 size={14} className="text-gray-300 group-hover:text-purple-500" />
                                    </div>
                                    <div className="text-[10px] text-[var(--color-text-muted)] font-mono mb-0.5">
                                        Nama: <span className="text-[var(--color-text-secondary)]">{item.nameIpa}</span>
                                    </div>
                                    <div className="text-[10px] text-[var(--color-text-muted)] font-mono mb-2">
                                        Bunyi: <span className="text-purple-600 font-bold">{item.soundIpa}</span>
                                    </div>
                                    <div className="text-xs font-medium text-[var(--color-text-secondary)] bg-gray-50 px-1.5 py-0.5 rounded inline-block">
                                        {item.example}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.section>
                </div>

            ) : tabId === 'vowels' ? (
                <div className="space-y-6">
                    {/* Vowel Info */}
                    <motion.section
                        custom={0} variants={sectionVariants} initial="hidden" animate="visible"
                        className="bg-orange-50 rounded-2xl p-6 border border-orange-100"
                    >
                        <div className="flex items-start gap-3">
                            <Lightbulb size={20} className="text-orange-500 mt-0.5 shrink-0" />
                            <div>
                                <h3 className="font-bold text-orange-900 mb-2">Apa itu Vokal?</h3>
                                <p className="text-sm text-orange-800 leading-relaxed">
                                    Vokal adalah bunyi yang dibuat dengan mulut terbuka. Setiap kata bahasa Inggris harus memiliki setidaknya satu bunyi vokal.
                                    <br /><br />
                                    Vokal utama: <b>A, E, I, O, U</b>
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* 5 Vowels */}
                    <motion.section custom={1} variants={sectionVariants} initial="hidden" animate="visible">
                        <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-3">5 Huruf Vokal</h3>
                        <div className="space-y-3">
                            {vowels.map(vowel => (
                                <button
                                    key={vowel.char}
                                    onClick={() => playPhonics(vowel)}
                                    className="w-full bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-sm flex items-center gap-4 hover:border-red-300 hover:shadow-md transition-all active:scale-[0.98]"
                                >
                                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xl shadow-inner shrink-0">
                                        {vowel.char}
                                    </div>
                                    <div className="text-left flex-1">
                                        <p className="text-sm font-bold text-[var(--color-text-primary)]">{vowel.example}</p>
                                        <p className="text-xs text-[var(--color-text-muted)] font-mono">Bunyi: {vowel.soundIpa}</p>
                                    </div>
                                    <PlayCircle size={28} className="text-red-200 shrink-0" />
                                </button>
                            ))}
                        </div>
                    </motion.section>

                    {/* Consonants */}
                    <motion.section
                        custom={2} variants={sectionVariants} initial="hidden" animate="visible"
                        className="bg-[var(--color-background)] rounded-2xl p-6 border border-[var(--color-border)]"
                    >
                        <h3 className="font-bold text-[var(--color-text-primary)] mb-2">Konsonan ({consonants.length} huruf)</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                            Semua huruf lainnya adalah konsonan. Biasanya diucapkan dengan menghalangi udara menggunakan bibir, gigi, atau lidah.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {consonants.map(c => (
                                <button
                                    key={c.char}
                                    onClick={() => playPhonics(c)}
                                    className="w-9 h-9 flex items-center justify-center bg-white rounded-lg text-sm font-bold text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-purple-300 hover:text-purple-600 transition-colors"
                                >
                                    {c.char}
                                </button>
                            ))}
                        </div>
                    </motion.section>
                </div>

            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-xl mx-auto"
                >
                    {!showResult ? (
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                            {/* Progress */}
                            <div className="w-full bg-gray-100 h-2 rounded-full mb-6 overflow-hidden">
                                <div
                                    className="h-full bg-purple-500 transition-all duration-300"
                                    style={{ width: `${((quizStep + 1) / PRACTICE_QUIZ.length) * 100}%` }}
                                />
                            </div>
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                                    Soal {quizStep + 1} / {PRACTICE_QUIZ.length}
                                </span>
                                <span className="text-xs font-bold bg-purple-50 text-purple-600 px-2 py-1 rounded">
                                    Skor: {quizScore}
                                </span>
                            </div>

                            <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-6">
                                {PRACTICE_QUIZ[quizStep].question}
                            </h3>

                            <div className="space-y-3">
                                {PRACTICE_QUIZ[quizStep].options.map((option, idx) => {
                                    let btnClass = "border-[var(--color-border)] hover:border-purple-300 hover:bg-purple-50";
                                    if (isAnswerChecked) {
                                        if (option === PRACTICE_QUIZ[quizStep].answer) btnClass = "bg-green-50 border-sky-500 text-green-700";
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
                                            {isAnswerChecked && option === PRACTICE_QUIZ[quizStep].answer && <CheckCircle2 size={20} className="text-green-600 shrink-0" />}
                                            {isAnswerChecked && option === selectedOption && option !== PRACTICE_QUIZ[quizStep].answer && <XCircle size={20} className="text-red-500 shrink-0" />}
                                        </button>
                                    );
                                })}
                            </div>

                            {isAnswerChecked && (
                                <div className="mt-6">
                                    <button
                                        onClick={nextQuizQuestion}
                                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                                    >
                                        {quizStep < PRACTICE_QUIZ.length - 1 ? 'Pertanyaan Selanjutnya →' : 'Lihat Hasil'}
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
                            <p className="text-5xl font-black text-purple-600 mb-6">
                                {quizScore} <span className="text-xl font-normal text-[var(--color-text-muted)]">/ {PRACTICE_QUIZ.length}</span>
                            </p>
                            <p className="text-sm text-[var(--color-text-muted)] mb-8">
                                {quizScore >= 17 ? '🏆 Luar biasa! Kamu menguasai alfabet dengan sangat baik!' :
                                 quizScore >= 13 ? '⭐ Bagus! Terus latihan untuk memantapkan alfabet.' :
                                 '💪 Coba lagi — baca ulang tabel A-Z dan pelajari vokalnya.'}
                            </p>
                            <button
                                onClick={restartQuiz}
                                className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200"
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

export default PronunLesson1;