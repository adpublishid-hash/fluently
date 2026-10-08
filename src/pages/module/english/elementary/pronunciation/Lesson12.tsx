import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Star, PlayCircle } from 'lucide-react';
import { StarIcon, FlameIcon, MicIcon } from '../../../../../components/Icons';

const SHADOWING_STEPS = [
  {
    step: "1. Dengarkan",
    desc: "Dengarkan audio terlebih dahulu tanpa berbicara. Fokus pada ritme dan melodi.",
    icon: "👂",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    step: "2. Bergumam",
    desc: "Dengarkan lagi dan bisikkan perlahan. Jangan khawatir tentang pengucapan yang sempurna dulu.",
    icon: "🤫",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200"
  },
  {
    step: "3. Shadow (Bayangi)",
    desc: "Bicaralah dengan lantang BERSAMA audio. Cobalah untuk menyamai kecepatan dan emosinya dengan tepat.",
    icon: "🗣️",
    color: "bg-rose-50 text-rose-700 border-rose-200"
  }
];

const WARMUP_PHRASES = [
  { text: "How are you today?", hint: "Intonasi naik ↗" },
  { text: "It's a beautiful morning.", hint: "Tekankan 'beau-' dan 'morn-'" },
  { text: "I'm learning to speak English.", hint: "Hubungkan 'speak' + 'English'" },
  { text: "Can you help me with this?", hint: "'Can' lembut, tekankan 'Help'" },
  { text: "I don't know what to do.", hint: "'I don't know' cepat" }
];

const CHALLENGE_TEXT = {
  title: "Rutinitas Harianku",
  text: "Every morning, I wake up at seven o'clock. I like to have a cup of coffee and read the news. It helps me wake up. After that, I take a shower and get dressed for work. I usually take the bus because it's faster than driving.",
  breakdown: [
    "Every morning, / I wake up at seven o'clock.",
    "I like to have a cup of coffee / and read the news.",
    "It helps me wake up.",
    "After that, / I take a shower / and get dressed for work.",
    "I usually take the bus / because it's faster than driving."
  ]
};

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Apa tujuan utama dari Shadowing?",
    options: ['Meniru ritme dan kecepatan', 'Menerjemahkan dengan cepat', 'Menghafal kata-kata'],
    answer: 'Meniru ritme dan kecepatan',
    explanation: "Shadowing membantu mulutmu terbiasa dengan aliran alami, kecepatan, dan musik bahasa Inggris."
  },
  {
    id: 2,
    question: "Saat melakukan shadowing, kamu harus berbicara...",
    options: ['Pada saat yang sama dengan audio', 'Setelah audio selesai', 'Sebelum audio'],
    answer: 'Pada saat yang sama dengan audio',
    explanation: "Kamu mengikuti pembicara seperti bayangan, hampir bersamaan."
  },
  {
    id: 3,
    question: "Jika kamu tidak bisa mengikuti kecepatannya, apa yang harus kamu lakukan?",
    options: ['Bergumam/Berbisik dulu', 'Membaca buku saja', 'Berhenti dan menyerah'],
    answer: 'Bergumam/Berbisik dulu',
    explanation: "Mulailah dengan bergumam untuk mendapatkan ritme sebelum mencoba mengucapkan setiap suara dengan jelas."
  },
  {
    id: 4,
    question: "Shadowing membantu meningkatkan...",
    options: ['Ejaan tulisan', 'Intonasi & Kefasihan', 'Aturan tata bahasa'],
    answer: 'Intonasi & Kefasihan',
    explanation: "Ini melatih memori ototmu untuk pola bicara alami."
  },
  {
    id: 5,
    question: "Apa tujuan utama dari Shadowing?",
    options: ["Meniru ritme dan kecepatan", "Menerjemahkan dengan cepat", "Menghafal kata-kata"],
    answer: "Meniru ritme dan kecepatan",
    explanation: "Shadowing membantu mulutmu terbiasa dengan aliran alami, kecepatan, dan musik bahasa Inggris."
  },
  {
    id: 6,
    question: "Saat melakukan shadowing, kamu harus berbicara:",
    options: ["Pada saat yang sama dengan audio", "Sebelum audio", "Setelah audio selesai"],
    answer: "Pada saat yang sama dengan audio",
    explanation: "Kamu mengikuti pembicara seperti bayangan, hampir bersamaan."
  },
  {
    id: 7,
    question: "Jika kamu tidak bisa mengikuti kecepatannya, apa yang harus kamu lakukan?",
    options: ["Bergumam/Berbisik dulu", "Membaca buku saja", "Berhenti dan menyerah"],
    answer: "Bergumam/Berbisik dulu",
    explanation: "Mulailah dengan bergumam untuk mendapatkan ritme sebelum mencoba mengucapkan setiap suara dengan jelas."
  },
  {
    id: 8,
    question: "Shadowing membantu meningkatkan:",
    options: ["Ejaan tulisan", "Intonasi & Kefasihan", "Aturan tata bahasa"],
    answer: "Intonasi & Kefasihan",
    explanation: "Ini melatih memori ototmu untuk pola bicara alami."
  },
  {
    id: 9,
    question: "Apa tujuan utama dari Shadowing ?",
    options: ["Meniru ritme dan kecepatan", "Menerjemahkan dengan cepat", "Menghafal kata-kata"],
    answer: "Meniru ritme dan kecepatan",
    explanation: "Shadowing membantu mulutmu terbiasa dengan aliran alami, kecepatan, dan musik bahasa Inggris."
  },
  {
    id: 10,
    question: "Saat melakukan shadowing, kamu harus berbicara:",
    options: ["Pada saat yang sama dengan audio", "Sebelum audio", "Setelah audio selesai"],
    answer: "Pada saat yang sama dengan audio",
    explanation: "Kamu mengikuti pembicara seperti bayangan, hampir bersamaan."
  },
  {
    id: 11,
    question: "Jika kamu tidak bisa mengikuti kecepatannya, apa yang harus kamu lakukan?",
    options: ["Bergumam/Berbisik dulu", "Membaca buku saja", "Berhenti dan menyerah"],
    answer: "Bergumam/Berbisik dulu",
    explanation: "Mulailah dengan bergumam untuk mendapatkan ritme sebelum mencoba mengucapkan setiap suara dengan jelas."
  },
  {
    id: 12,
    question: "Shadowing membantu meningkatkan...",
    options: ["Ejaan tulisan", "Intonasi & Kefasihan", "Aturan tata bahasa"],
    answer: "Intonasi & Kefasihan",
    explanation: "Ini melatih memori ototmu untuk pola bicara alami."
  },
  {
    id: 13,
    question: "Apa tujuan utama dari Shadowing?",
    options: ["Meniru ritme dan kecepatan", "Menerjemahkan dengan cepat", "Menghafal kata-kata"],
    answer: "Meniru ritme dan kecepatan",
    explanation: "Shadowing membantu mulutmu terbiasa dengan aliran alami, kecepatan, dan musik bahasa Inggris."
  },
  {
    id: 14,
    question: "Saat melakukan shadowing, kamu harus berbicara...",
    options: ["Pada saat yang sama dengan audio", "Setelah audio selesai", "Sebelum audio"],
    answer: "Pada saat yang sama dengan audio",
    explanation: "Kamu mengikuti pembicara seperti bayangan, hampir bersamaan."
  },
  {
    id: 15,
    question: "Jika kamu tidak bisa mengikuti kecepatannya, apa yang harus kamu lakukan?",
    options: ["Bergumam/Berbisik dulu", "Membaca buku saja", "Berhenti dan menyerah"],
    answer: "Bergumam/Berbisik dulu",
    explanation: "Mulailah dengan bergumam untuk mendapatkan ritme sebelum mencoba mengucapkan setiap suara dengan jelas."
  },
  {
    id: 16,
    question: "Shadowing membantu meningkatkan...",
    options: ["Ejaan tulisan", "Intonasi & Kefasihan", "Aturan tata bahasa"],
    answer: "Intonasi & Kefasihan",
    explanation: "Ini melatih memori ototmu untuk pola bicara alami."
  },
  {
    id: 17,
    question: "Apa tujuan utama dari Shadowing...",
    options: ["Menerjemahkan dengan cepat", "Meniru ritme dan kecepatan", "Menghafal kata-kata"],
    answer: "Meniru ritme dan kecepatan",
    explanation: "Shadowing membantu mulutmu terbiasa dengan aliran alami, kecepatan, dan musik bahasa Inggris."
  },
  {
    id: 18,
    question: "Saat melakukan shadowing, kamu harus berbicara:",
    options: ["Pada saat yang sama dengan audio", "Sebelum audio", "Setelah audio selesai"],
    answer: "Pada saat yang sama dengan audio",
    explanation: "Kamu mengikuti pembicara seperti bayangan, hampir bersamaan."
  },
  {
    id: 19,
    question: "Jika kamu tidak bisa mengikuti kecepatannya, apa yang harus kamu lakukan...",
    options: ["Berhenti dan menyerah", "Membaca buku saja", "Bergumam/Berbisik dulu"],
    answer: "Bergumam/Berbisik dulu",
    explanation: "Mulailah dengan bergumam untuk mendapatkan ritme sebelum mencoba mengucapkan setiap suara dengan jelas."
  },
  {
    id: 20,
    question: "Shadowing membantu meningkatkan... ...",
    options: ["Ejaan tulisan", "Intonasi & Kefasihan", "Aturan tata bahasa"],
    answer: "Intonasi & Kefasihan",
    explanation: "Ini melatih memori ototmu untuk pola bicara alami."
  }
];

const ElemPronunLesson12: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_pronunciation', 12);
  const nextLessonPath = '/modul/english/elementary/pronunciation/lesson-13';
  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string, rate: number = 0.9) => { playAudio(text, rate); };

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
      lessonLabel={"Elementary Pronunciation Lesson 12"}
      accentColor={"#2E86DE"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Teknik Shadowing"
            subtitle="Pronunciation • Pelajaran 12"
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
                      className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <MicIcon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Jadilah Bayangan 👥</h2>
                  <p className="text-teal-100 text-sm leading-relaxed">
                    Shadowing berarti mendengarkan bahasa Inggris dan mengulanginya <b>pada saat yang sama</b>. Ini seperti menyanyi bersama lagu! Ini membantumu berbicara lebih cepat dan alami.
                  </p>
                </div>
              </motion.section>

              <div className="space-y-4">
                {SHADOWING_STEPS.map((step, idx) => (
                  <div key={idx} className={`rounded-2xl border p-5 ${step.color.replace('text-', 'border-').split(' ')[2] || 'border-[var(--color-border)]'} bg-white flex items-start gap-4 shadow-[var(--shadow-card)]`}>
                    <div className="text-3xl bg-white p-2 rounded-xl shadow-[var(--shadow-card)] border border-slate-50 flex-shrink-0">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold mb-1 ${step.color.split(' ')[1]}`}>{step.step}</h3>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

<div className="space-y-4">
              <div className="bg-[var(--color-background)] p-4 rounded-xl text-center border border-[var(--color-border)] mb-2">
                <p className="text-sm text-[var(--color-text-secondary)] font-medium">Ketuk untuk mendengarkan. Ulangi <b>segera</b>.</p>
              </div>

              {WARMUP_PHRASES.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] bg-gray-100 px-2 py-1 rounded">Phrase {idx + 1}</span>
                    <span className="text-xs text-[var(--color-primary)] font-medium">{item.hint}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 text-center">"{item.text}"</h3>

                  <div className="flex gap-3">
                    <button
                      onClick={() => playSound(item.text, 0.7)}
                      className="flex-1 bg-[var(--color-background)] text-[var(--color-text-secondary)] py-2 rounded-xl font-bold text-xs hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                    >
                      🐢 Lambat
                    </button>
                    <button
                      onClick={() => playSound(item.text, 1.0)}
                      className="flex-1 bg-gray-50 text-[var(--color-primary)] py-2 rounded-xl font-bold text-xs hover:bg-teal-100 transition-colors flex items-center justify-center gap-2"
                    >
                      🐇 Normal
                    </button>
                  </div>
                </div>
              ))}
            </div>

<div className="max-w-xl mx-auto">
              <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-sky-100/50 border border-sky-50 relative overflow-hidden">

                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-teal-100 p-2 rounded-xl text-[var(--color-primary)]">
                    <FlameIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Tantangan Shadowing</h3>
                    <p className="text-xs text-[var(--color-text-muted)]">Topik: {CHALLENGE_TEXT.title}</p>
                  </div>
                </div>

                <div className="bg-[var(--color-background)] p-6 rounded-2xl border border-[var(--color-border)] text-[var(--color-text-primary)] text-lg leading-relaxed font-medium mb-6 relative">
                  {CHALLENGE_TEXT.text}
                  <button
                    onClick={() => playSound(CHALLENGE_TEXT.text, 0.9)}
                    className="absolute bottom-4 right-4 w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-teal-700 active:scale-95 transition-all"
                  >
                    <PlayCircle size={24} />
                  </button>
                </div>

                <h4 className="font-bold text-[var(--color-text-primary)] mb-3 px-1">Rincian Langkah-demi-Langkah</h4>
                <div className="space-y-2">
                  {CHALLENGE_TEXT.breakdown.map((line, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 hover:bg-[var(--color-background)] rounded-xl transition-colors cursor-pointer" onClick={() => playSound(line.replace('/', ''), 0.85)}>
                      <span className="w-6 h-6 rounded-full bg-slate-200 text-[var(--color-text-muted)] flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                      <p className="text-sm text-[var(--color-text-secondary)]">{line}</p>
                      <Volume2 size={16} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </div>
      
      ) : tabId === 'challenge' ? (
        <div className="max-w-xl mx-auto p-4 md:p-8 pb-24 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Tantangan Shadowing</h3>
            <p className="text-xs text-slate-500 mb-6 text-center">Tekan tombol putar lalu ulangi dengan lantang.</p>
            <div className="space-y-3">
              {WARMUP_PHRASES.map((item: any, idx: number) => (
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
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-gray-50 text-[var(--color-primary)] px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-sky-300 hover:bg-[var(--color-background)]";
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
                    className="px-8 py-3 bg-[var(--color-primary)] text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-sky-200"
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

export default ElemPronunLesson12;
