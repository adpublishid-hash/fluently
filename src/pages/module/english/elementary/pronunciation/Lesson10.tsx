import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Star } from 'lucide-react';
import { StarIcon, FlameIcon } from '../../../../../components/Icons';

const REVIEW_POINTS = [
  {
    title: "Vokal & Konsonan",
    desc: "Vokal Pendek vs Panjang. Konsonan Bersuara (getaran) vs Tak Bersuara (udara).",
    icon: "🗣️",
    color: "bg-pink-50 text-pink-700 border-pink-200"
  },
  {
    title: "Akhiran (S & ED)",
    desc: "S = /s/, /z/, /ɪz/. ED = /t/, /d/, /ɪd/. Tergantung pada getaran.",
    icon: "🔚",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    title: "Penekanan & Ritme",
    desc: "Tekankan kata-kata penting (Lebih Keras/Panjang). Kata-kata tidak penting cepat.",
    icon: "🥁",
    color: "bg-amber-50 text-amber-700 border-amber-200"
  },
  {
    title: "Intonasi & Menghubungkan",
    desc: "Nada Turun ↘ (Pernyataan) atau Naik ↗ (Ya/Tidak). Kata-kata terhubung bersama.",
    icon: "🌊",
    color: "bg-gray-50 text-[var(--color-primary)] border-[var(--color-border)]"
  }
];

const TONGUE_TWISTERS = [
  {
    title: "S vs SH",
    text: "She sells seashells by the seashore.",
    focus: "Perhatikan posisi lidahmu! S = Senyum, SH = Shush.",
    audio: "She sells seashells by the seashore."
  },
  {
    title: "P vs B",
    text: "Peter Piper picked a peck of pickled peppers.",
    focus: "Letupkan bibirmu untuk P! Gunakan suaramu untuk B.",
    audio: "Peter Piper picked a peck of pickled peppers."
  },
  {
    title: "Suara TH",
    text: "The thirty-three thieves thought they thrilled the throne.",
    focus: "Julurkan lidahmu di antara gigimu!",
    audio: "The thirty-three thieves thought they thrilled the throne."
  },
  {
    title: "Menghubungkan R",
    text: "Four uncles ordered four orange doors.",
    focus: "Hubungkan suara R ke vokal berikutnya.",
    audio: "Four uncles ordered four orange doors."
  }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Kata mana yang memiliki suara akhiran BERSUARA?",
    options: ['Cat', 'Dog', 'Cup'],
    answer: 'Dog',
    explanation: "/g/ bersuara (tenggorokan bergetar). /t/ dan /p/ tidak bersuara."
  },
  {
    id: 2,
    question: "Bagaimana kamu mengucapkan 'Wanted'?",
    options: ['/wɒntd/', '/wɒntɪd/ (Suku Kata Tambahan)'],
    answer: '/wɒntɪd/ (Suku Kata Tambahan)',
    explanation: "Kata-kata yang berakhiran T atau D mendapatkan suku kata tambahan untuk ED."
  },
  {
    id: 3,
    question: "Dalam kalimat 'I love coffee', kata-kata mana yang DITEKANKAN?",
    options: ['I, Love', 'Love, Coffee', 'I, Coffee'],
    answer: 'Love, Coffee',
    explanation: "Kata-kata isi (Kata Kerja, Kata Benda) ditekankan. Kata ganti (I) lemah."
  },
  {
    id: 4,
    question: "Pertanyaan Ya/Tidak biasanya memiliki intonasi ___.",
    options: ['Turun ↘', 'Naik ↗'],
    answer: 'Naik ↗',
    explanation: "Contoh: Are you hungry? ↗"
  },
  {
    id: 5,
    question: "Menghubungkan: 'Stop it' terdengar seperti...",
    options: ['Stop... it', 'Sto-pit'],
    answer: 'Sto-pit',
    explanation: "Konsonan pindah ke vokal."
  },
  {
    id: 6,
    question: "Kata mana yang memiliki huruf DIAM (silent letter)?",
    options: ['Listen', 'Sound', 'Music'],
    answer: 'Listen',
    explanation: "Huruf T dalam Listen diam (/ˈlɪsən/)."
  },
  {
    id: 7,
    question: "Kata mana yang memiliki suara akhiran BERSUARA ?",
    options: ["Bat","Dog","Cup"],
    answer: "Dog",
    explanation: "/g/ bersuara (tenggorokan bergetar). /t/ dan /p/ tidak bersuara."
  },
  {
    id: 8,
    question: "Bagaimana kamu mengucapkan 'Wanted'?",
    options: ["/wɒntd/","/wɒntɪd/ (Suku Kata Tambahan)"],
    answer: "/wɒntɪd/ (Suku Kata Tambahan)",
    explanation: "Kata-kata yang berakhiran T atau D mendapatkan suku kata tambahan untuk ED."
  },
  {
    id: 9,
    question: "Dalam kalimat 'I love coffee', kata-kata mana yang DITEKANKAN?",
    options: ["I, Love","Love, Coffee","I, Coffee"],
    answer: "Love, Coffee",
    explanation: "Kata-kata isi (Kata Kerja, Kata Benda) ditekankan. Kata ganti (I) lemah."
  },
  {
    id: 10,
    question: "Pertanyaan Ya/Tidak biasanya memiliki intonasi ___.",
    options: ["Turun ↘","Naik ↗"],
    answer: "Naik ↗",
    explanation: "Contoh: Are you hungry ? ↗"
  },
  {
    id: 11,
    question: "Menghubungkan: 'Stop it' terdengar seperti...",
    options: ["Stop... it","Sto-pit"],
    answer: "Sto-pit",
    explanation: "Konsonan pindah ke vokal."
  },
  {
    id: 12,
    question: "Pilih kata yang memiliki huruf DIAM (silent letter)...",
    options: ["Listen","Sound","Music"],
    answer: "Listen",
    explanation: "Huruf T dalam Listen diam (/ˈlɪsən/)."
  },
  {
    id: 13,
    question: "Manakah kata yang memiliki suara akhiran BERSUARA?",
    options: ["Mat","Dog","Cup"],
    answer: "Dog",
    explanation: "/g/ bersuara (tenggorokan bergetar). /t/ dan /p/ tidak bersuara."
  },
  {
    id: 14,
    question: "Bagaimana kamu mengucapkan 'Wanted'?",
    options: ["/wɒntd/","/wɒntɪd/ (Suku Kata Tambahan)"],
    answer: "/wɒntɪd/ (Suku Kata Tambahan)",
    explanation: "Kata-kata yang berakhiran T atau D mendapatkan suku kata tambahan untuk ED."
  },
  {
    id: 15,
    question: "Dalam kalimat 'I love coffee', kata-kata mana yang DITEKANKAN ?",
    options: ["I, Love","Love, Coffee","I, Coffee"],
    answer: "Love, Coffee",
    explanation: "Kata-kata isi (Kata Kerja, Kata Benda) ditekankan. Kata ganti (I) lemah."
  },
  {
    id: 16,
    question: "Pertanyaan Ya/Tidak biasanya memiliki intonasi ___.",
    options: ["Turun ↘","Naik ↗"],
    answer: "Naik ↗",
    explanation: "Contoh: Are you hungry? ↗"
  },
  {
    id: 17,
    question: "Menghubungkan: 'Stop it' terdengar seperti:",
    options: ["Stop: it","Sto-pit"],
    answer: "Sto-pit",
    explanation: "Konsonan pindah ke vokal."
  },
  {
    id: 18,
    question: "Manakah kata yang memiliki huruf DIAM (silent letter)?",
    options: ["Listen","Sound","Music"],
    answer: "Listen",
    explanation: "Huruf T dalam Listen diam (/ˈlɪsən/)."
  },
  {
    id: 19,
    question: "Kata mana yang memiliki suara akhiran BERSUARA ?",
    options: ["Cat","Dog","Cup"],
    answer: "Dog",
    explanation: "/g/ bersuara (tenggorokan bergetar). /t/ dan /p/ tidak bersuara."
  },
  {
    id: 20,
    question: "Bagaimana kamu mengucapkan 'Wanted'?",
    options: ["/wɒntd/","/wɒntɪd/ (Suku Kata Tambahan)"],
    answer: "/wɒntɪd/ (Suku Kata Tambahan)",
    explanation: "Kata-kata yang berakhiran T atau D mendapatkan suku kata tambahan untuk ED."
  }
];

const PronunLesson10: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_pronunciation', 10);
  const nextLessonPath = '/modul/english/elementary/pronunciation/lesson-11';
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
          <LessonCompleteModal
      show={showCompleteModal}
      onClose={() => setShowCompleteModal(false)}
      lessonLabel={"Elementary Pronunciation Lesson 10"}
      accentColor={"#2E86DE"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Ulasan & Latihan"
            subtitle="Pronunciation • Pelajaran 10"
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
                      className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <StarIcon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Penutup Modul 🎓</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Kamu telah mempelajari rahasia pengucapan bahasa Inggris! Mari kita tinjau aturan-aturan kunci untuk terdengar seperti penutur asli.
                  </p>
                </div>
              </motion.section>

              <div className="grid gap-4">
                {REVIEW_POINTS.map((item, idx) => (
                  <div key={idx} className={`rounded-2xl border p-5 ${item.color.replace('text-', 'border-').split(' ')[2] || 'border-[var(--color-border)]'} bg-white flex items-start gap-4`}>
                    <div className="text-3xl bg-white/50 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold mb-1 ${item.color.split(' ')[1]}`}>{item.title}</h3>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

<div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] text-center">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-2 flex items-center justify-center gap-2">
                  <FlameIcon className="w-5 h-5 text-orange-500" />
                  Gym untuk Lidahmu!
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Pembelit lidah adalah frasa yang sulit. Ulangi mereka untuk melatih otot mulutmu. Mulai perlahan, lalu cepat!
                </p>
              </div>

              {TONGUE_TWISTERS.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-md transition-all">
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-[var(--color-text-primary)]">{item.title}</h4>
                      <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Tantangan</span>
                    </div>
                    <p className="text-xl font-bold text-[var(--color-text-primary)] leading-snug mb-4">
                      "{item.text}"
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] bg-[var(--color-background)] p-2 rounded-lg border border-[var(--color-border)]">
                      <span className="font-bold text-[var(--color-text-secondary)]">Tip:</span> {item.focus}
                    </p>
                  </div>
                  <div className="bg-[var(--color-background)] px-5 py-3 border-t border-[var(--color-border)] flex gap-2">
                    <button
                      onClick={() => playSound(item.audio, 0.7)}
                      className="flex-1 bg-white border border-[var(--color-border)] rounded-lg py-2 text-xs font-bold text-[var(--color-text-secondary)] hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                    >
                      🐢 Lambat
                    </button>
                    <button
                      onClick={() => playSound(item.audio, 1.1)}
                      className="flex-1 bg-indigo-600 border border-indigo-600 rounded-lg py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                    >
                      🐇 Cepat
                    </button>
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
              {TONGUE_TWISTERS.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <button
                    onClick={() => playSound(item.text)}
                    className="w-11 h-11 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 hover:bg-pink-200 transition-all"
                  >
                    <Volume2 size={18} />
                  </button>
                  <p className="flex-1 text-sm font-semibold text-slate-800">{item.text}</p>
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
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6 flex flex-col gap-2">
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
                    <StarIcon className="w-10 h-10" />
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
        </div>
      ) : null}
    </LessonShell>
    </>
  );
};

export default PronunLesson10;
