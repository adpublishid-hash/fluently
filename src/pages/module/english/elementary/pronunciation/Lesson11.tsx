import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Star } from 'lucide-react';
import { StarIcon, MicIcon } from '../../../../../components/Icons';

const PROBLEM_SOUNDS = [
  {
    id: 'pf',
    title: "P vs F",
    desc: "Bibir menyatu (P) vs Gigi di Bibir (F)",
    indo_issue: "Orang Indonesia sering menukar ini (mis. 'Fikir' jadi 'Pikir').",
    pairs: [
      { w1: "Pan", w2: "Fan", meaning: "Wajan vs Kipas" },
      { w1: "Peel", w2: "Feel", meaning: "Mengupas vs Merasa" },
      { w1: "Copy", w2: "Coffee", meaning: "Salin vs Kopi" }
    ],
    color: "bg-orange-50 text-orange-700 border-orange-200",
    icon: "👄"
  },
  {
    id: 'th',
    title: "Suara 'TH'",
    desc: "Lidah di antara gigi",
    indo_issue: "Suara ini tidak ada dalam Bahasa Indonesia. Jangan ganti dengan 'T' atau 'D'!",
    pairs: [
      { w1: "Three", w2: "Tree", meaning: "Tiga vs Pohon" },
      { w1: "Thin", w2: "Tin", meaning: "Tipis vs Kaleng" },
      { w1: "They", w2: "Day", meaning: "Mereka vs Hari" }
    ],
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "👅"
  },
  {
    id: 'endings',
    title: "Konsonan Akhir",
    desc: "Jangan 'telan' akhirannya!",
    indo_issue: "Kata Bahasa Indonesia sering memiliki akhiran lembut. Kata Inggris perlu akhiran yang jelas.",
    pairs: [
      { w1: "Nine", w2: "Night", meaning: "Sembilan vs Malam" },
      { w1: "Bus", w2: "Bust", meaning: "Bis vs Patung/Pecah" },
      { w1: "Fine", w2: "Find", meaning: "Baik vs Menemukan" }
    ],
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: "🔚"
  },
  {
    id: 'sh',
    title: "S vs SH",
    desc: "Ular (S) vs Diam (SH)",
    indo_issue: "Jangan bilang 'See' saat maksudmu 'She'. SH /ʃ/ mengharuskan bibir membulat.",
    pairs: [
      { w1: "See", w2: "She", meaning: "Lihat vs Dia (Pr)" },
      { w1: "Seat", w2: "Sheet", meaning: "Kursi vs Lembar" },
      { w1: "Sock", w2: "Shock", meaning: "Kaos kaki vs Kaget" }
    ],
    color: "bg-emerald-50 text-emerald-700 border-blue-200",
    icon: "🤫"
  }
];

const PRACTICE_SENTENCES = [
  {
    id: 1,
    text: "I am a huge fan of this pan.",
    focus: "F vs P",
    audio: "I am a huge fan of this pan."
  },
  {
    id: 2,
    text: "Three trees are over there.",
    focus: "TH vs T",
    audio: "Three trees are over there."
  },
  {
    id: 3,
    text: "She sells sea shells.",
    focus: "SH vs S",
    audio: "She sells sea shells."
  },
  {
    id: 4,
    text: "My mind is fine.",
    focus: "Final D (Mind vs Fine)",
    audio: "My mind is fine."
  }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Jika kamu mengatakan 'Tree' bukannya 'Three', kamu melewatkan suara apa?",
    options: ['F', 'TH', 'S'],
    answer: 'TH',
    explanation: "Three dimulai dengan /θ/ (lidah di antara gigi). Tree dimulai dengan /t/."
  },
  {
    id: 2,
    question: "Pasangan mana yang terdengar berbeda?",
    options: ['Fit - Pit', 'Same - Same', 'Do - Do'],
    answer: 'Fit - Pit',
    explanation: "Fit dimulai dengan F (gigi di bibir), Pit dimulai dengan P (bibir meletup)."
  },
  {
    id: 3,
    question: "Bagaimana kamu mengucapkan akhir kata 'World'?",
    options: ['Worl (D Tak Bersuara)', 'World (L dan D Jelas)'],
    answer: 'World (L dan D Jelas)',
    explanation: "Dalam bahasa Inggris, kamu harus mengucapkan gugus akhir LD. Jangan hilangkan D."
  },
  {
    id: 4,
    question: "She vs See. Mana yang mengharuskan bibir membulat?",
    options: ['See /s/', 'She /ʃ/'],
    answer: 'She /ʃ/',
    explanation: "Suara SH /ʃ/ dibuat dengan membulatkan bibirmu seperti sedang mengatakan 'Ssst'."
  },
  {
    id: 5,
    question: "Apa kesalahan umum dengan V dan W?",
    options: ['Menukarnya (Vet terdengar seperti Wet)', 'Menghilangkannya'],
    answer: 'Menukarnya (Vet terdengar seperti Wet)',
    explanation: "V mengharuskan gigi di bibir. W mengharuskan bibir membulat. Jangan bilang 'Wery good' bukannya 'Very good'."
  },
  {
    id: 6,
    question: "Jika kamu mengatakan 'Tree' bukannya 'Three', kamu melewatkan suara apa...",
    options: ["F","TH","S"],
    answer: "TH",
    explanation: "Three dimulai dengan /θ/ (lidah di antara gigi). Tree dimulai dengan /t/."
  },
  {
    id: 7,
    question: "Pasangan mana yang terdengar berbeda ?",
    options: ["Fit - Pit","Same - Same","Do - Do"],
    answer: "Fit - Pit",
    explanation: "Fit dimulai dengan F (gigi di bibir), Pit dimulai dengan P (bibir meletup)."
  },
  {
    id: 8,
    question: "Bagaimana kamu mengucapkan akhir kata 'World'...",
    options: ["Worl (D Tak Bersuara)","World (L dan D Jelas)"],
    answer: "World (L dan D Jelas)",
    explanation: "Dalam bahasa Inggris, kamu harus mengucapkan gugus akhir LD. Jangan hilangkan D."
  },
  {
    id: 9,
    question: "She vs See. Mana yang mengharuskan bibir membulat...",
    options: ["See /s/","She /ʃ/"],
    answer: "She /ʃ/",
    explanation: "Suara SH /ʃ/ dibuat dengan membulatkan bibirmu seperti sedang mengatakan 'Ssst'."
  },
  {
    id: 10,
    question: "Apa kesalahan umum dengan V dan W...",
    options: ["Menukarnya (Vet terdengar seperti Will)","Menghilangkannya"],
    answer: "Menukarnya (Vet terdengar seperti Will)",
    explanation: "V mengharuskan gigi di bibir. W mengharuskan bibir membulat. Jangan bilang 'Wery good' bukannya 'Vet good'."
  },
  {
    id: 11,
    question: "Jika kamu mengatakan 'Tree' bukannya 'Three', kamu melewatkan suara apa?",
    options: ["F","TH","S"],
    answer: "TH",
    explanation: "Three dimulai dengan /θ/ (lidah di antara gigi). Tree dimulai dengan /t/."
  },
  {
    id: 12,
    question: "Pasangan mana yang terdengar berbeda...",
    options: ["Fit - Pit","Same - Same","Do - Do"],
    answer: "Fit - Pit",
    explanation: "Fit dimulai dengan F (gigi di bibir), Pit dimulai dengan P (bibir meletup)."
  },
  {
    id: 13,
    question: "Bagaimana kamu mengucapkan akhir kata 'World' ?",
    options: ["Worl (D Tak Bersuara)","World (L dan D Jelas)"],
    answer: "World (L dan D Jelas)",
    explanation: "Dalam bahasa Inggris, kamu harus mengucapkan gugus akhir LD. Jangan hilangkan D."
  },
  {
    id: 14,
    question: "She vs See. Mana yang mengharuskan bibir membulat?",
    options: ["See /s/","She /ʃ/"],
    answer: "She /ʃ/",
    explanation: "Suara SH /ʃ/ dibuat dengan membulatkan bibirmu seperti sedang mengatakan 'Ssst'."
  },
  {
    id: 15,
    question: "Apa kesalahan umum dengan V dan W...",
    options: ["Menukarnya (Vet terdengar seperti Will)","Menghilangkannya"],
    answer: "Menukarnya (Vet terdengar seperti Will)",
    explanation: "V mengharuskan gigi di bibir. W mengharuskan bibir membulat. Jangan bilang 'Wery good' bukannya 'Vet good'."
  },
  {
    id: 16,
    question: "Jika kamu mengatakan 'Tree' bukannya 'Three', kamu melewatkan suara apa?",
    options: ["F","TH","S"],
    answer: "TH",
    explanation: "Three dimulai dengan /θ/ (lidah di antara gigi). Tree dimulai dengan /t/."
  },
  {
    id: 17,
    question: "Pasangan mana yang terdengar berbeda?",
    options: ["Fit - Pit","Same - Same","Do - Do"],
    answer: "Fit - Pit",
    explanation: "Fit dimulai dengan F (gigi di bibir), Pit dimulai dengan P (bibir meletup)."
  },
  {
    id: 18,
    question: "Bagaimana kamu mengucapkan akhir kata 'World'?",
    options: ["Worl (D Tak Bersuara)","World (L dan D Jelas)"],
    answer: "World (L dan D Jelas)",
    explanation: "Dalam bahasa Inggris, kamu harus mengucapkan gugus akhir LD. Jangan hilangkan D."
  },
  {
    id: 19,
    question: "She vs See. Mana yang mengharuskan bibir membulat?",
    options: ["See /s/","She /ʃ/"],
    answer: "She /ʃ/",
    explanation: "Suara SH /ʃ/ dibuat dengan membulatkan bibirmu seperti sedang mengatakan 'Ssst'."
  },
  {
    id: 20,
    question: "Apa kesalahan umum dengan V dan W...",
    options: ["Menukarnya (Vet terdengar seperti Wet)","Menghilangkannya"],
    answer: "Menukarnya (Vet terdengar seperti Wet)",
    explanation: "V mengharuskan gigi di bibir. W mengharuskan bibir membulat. Jangan bilang 'Wery good' bukannya 'Very good'."
  }
];

const ElemPronunLesson11: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_pronunciation', 11);
  const nextLessonPath = '/modul/english/elementary/pronunciation/lesson-12';
  // Practice State
  const [practiceIndex, setPracticeIndex] = useState(0);

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
      lessonLabel={"Elementary Pronunciation Lesson 11"}
      accentColor={"#2E86DE"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Panduan Penutur Indonesia"
            subtitle="Pronunciation • Pelajaran 11"
            accentColor="#E83E8C"
            nextLesson={nextLessonPath}
            tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'challenge', label: 'Tantangan', icon: <Star size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}
            footer={() => (
                <button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #E83E8C, #E83E8Ccc)' }}
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
                      className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <MicIcon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Perbaiki Aksenmu 🇮🇩</h2>
                  <p className="text-red-100 text-sm leading-relaxed">
                    Bahasa Indonesia adalah bahasa fonetik, tapi Bahasa Inggris tidak! Ada suara dalam bahasa Inggris (seperti TH, V, F) yang sulit bagi lidah Indonesia. Mari kita perbaiki!
                  </p>
                </div>
              </motion.section>

              <div className="grid gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] flex items-start gap-4">
                  <div className="bg-orange-100 p-2 rounded-lg text-orange-600 font-bold text-xl">P/F</div>
                  <div>
                    <h3 className="font-bold text-[var(--color-text-primary)]">Jangan Tukar P & F</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Orang Indonesia sering bilang "Pikir" untuk "Fikir". Dalam bahasa Inggris, <b>Pan</b> dan <b>Fan</b> sangat berbeda!
                    </p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600 font-bold text-xl">TH</div>
                  <div>
                    <h3 className="font-bold text-[var(--color-text-primary)]">Suara TH</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Bukan 'T' (Tree) atau 'D' (Dare). Kamu HARUS menaruh lidah di antara gigi untuk <b>Three</b> dan <b>There</b>.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] flex items-start gap-4">
                  <div className="bg-purple-100 p-2 rounded-lg text-purple-600 font-bold text-xl">End</div>
                  <div>
                    <h3 className="font-bold text-[var(--color-text-primary)]">Suara Akhiran</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Jangan telan huruf terakhir! <br />
                      "Nine" butuh suara 'N'. "Night" butuh suara 'T'.
                    </p>
                  </div>
                </div>
              </div>

<div className="space-y-8">
              {PROBLEM_SOUNDS.map((group, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] overflow-hidden">
                  <div className={`px-4 py-3 border-b border-[var(--color-border)] flex justify-between items-center ${group.color.split(' ')[0]}`}>
                    <h3 className={`font-bold text-lg ${group.color.split(' ')[1]}`}>{group.title}</h3>
                    <span className="text-2xl">{group.icon}</span>
                  </div>

                  <div className="p-4 bg-[var(--color-background)]/50">
                    <p className="text-xs text-[var(--color-text-muted)] font-medium mb-2 italic">⚠️ {group.indo_issue}</p>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {group.pairs.map((pair, pIdx) => (
                      <div key={pIdx} className="grid grid-cols-2 divide-x divide-gray-100">
                        <button
                          onClick={() => playSound(pair.w1)}
                          className="p-4 hover:bg-[var(--color-background)] transition-colors flex flex-col items-center group"
                        >
                          <span className="font-bold text-[var(--color-text-primary)] text-lg mb-1 group-hover:text-red-600">{pair.w1}</span>
                          <Volume2 size={16} />
                          <span className="text-[10px] text-[var(--color-text-muted)] mt-1">{pair.meaning.split(' vs ')[0]}</span>
                        </button>
                        <button
                          onClick={() => playSound(pair.w2)}
                          className="p-4 hover:bg-[var(--color-background)] transition-colors flex flex-col items-center group"
                        >
                          <span className="font-bold text-[var(--color-text-primary)] text-lg mb-1 group-hover:text-green-600">{pair.w2}</span>
                          <Volume2 size={16} />
                          <span className="text-[10px] text-[var(--color-text-muted)] mt-1">{pair.meaning.split(' vs ')[1]}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
        </div>
      
      ) : tabId === 'challenge' ? (
        <div className="max-w-xl mx-auto p-4 md:p-8 pb-24 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Tantangan Shadowing</h3>
            <p className="text-xs text-slate-500 mb-6 text-center">Tekan tombol putar lalu ulangi dengan lantang.</p>
            <div className="space-y-3">
              {PRACTICE_SENTENCES.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <button
                    onClick={() => playSound(item.sentence)}
                    className="w-11 h-11 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 hover:bg-pink-200 transition-all"
                  >
                    <Volume2 size={18} />
                  </button>
                  <p className="flex-1 text-sm font-semibold text-slate-800">{item.sentence}</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 text-center mt-5 italic">🎤 Ucapkan setiap kalimat 3x — fokus pada ritme dan intonasi.</p>
          </div>
        </div>
      ) : tabId === 'practice' ? (
        <div className="max-w-xl mx-auto p-4 md:p-8 pb-24 animate-fade-in">
          <div className="animate-fade-in">
          <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-red-50 text-red-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
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
                        {quizStep < QUIZ_QUESTIONS.length - 1 ? "Pertanyaan Berikutnya" : "Lihat Hasil"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500">
                    <StarIcon className="w-10 h-10" />
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
        </div>
        </div>
      ) : null}
    </LessonShell>
    </>
  );
};

export default ElemPronunLesson11;
