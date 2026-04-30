import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Star, Lightbulb, PlayCircle } from 'lucide-react';
import { StarIcon, FlameIcon, MicIcon, TrendUpIcon, TrophyIcon, RefreshIcon } from '../../../../../components/Icons';

const WEAK_FORMS = [
  {
    word: "And",
    strong: "/ænd/",
    weak: "/ən/ (n)",
    example: "Fish 'n' Chips",
    sentence: "Black and white."
  },
  {
    word: "To",
    strong: "/tuː/",
    weak: "/tə/ (ta)",
    example: "Go 'ta' work",
    sentence: "I want to go."
  },
  {
    word: "For",
    strong: "/fɔːr/",
    weak: "/fər/ (fer)",
    example: "Just 'fer' you",
    sentence: "Is this for me?"
  },
  {
    word: "Of",
    strong: "/ɒv/",
    weak: "/əv/ (av)",
    example: "Cup 'a' tea",
    sentence: "Piece of cake."
  }
];

const RHYTHM_DRILLS = [
  {
    id: 1,
    level: "Basic",
    text: "Cats chase mice.",
    pattern: "● ● ●",
    hint: "Semua Kata Isi (Ditekankan)"
  },
  {
    id: 2,
    level: "Medium",
    text: "The cats chase the mice.",
    pattern: "· ● · ● · ●",
    hint: "Tambahkan 'The' (Tidak ditekankan)"
  },
  {
    id: 3,
    level: "Advanced",
    text: "The cats will chase the mice.",
    pattern: "· ● · ● · ●",
    hint: "Tambahkan 'will' (Tidak ditekankan/Lemah)"
  }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Dalam frasa 'Cup of tea', bagaimana 'OF' biasanya diucapkan?",
    options: ['/ɒv/ (Kuat)', '/ə/ atau /əv/ (Lemah)'],
    answer: '/ə/ atau /əv/ (Lemah)',
    explanation: "Dalam ritme alami, 'of' direduksi menjadi suara schwa, terdengar seperti 'Cup-a-tea'."
  },
  {
    id: 2,
    question: "Kata mana yang merupakan Kata Fungsi (biasanya tidak ditekankan)?",
    options: ['Apple', 'Run', 'For'],
    answer: 'For',
    explanation: "Kata depan seperti 'for' adalah kata fungsi dan biasanya lemah/tidak ditekankan."
  },
  {
    id: 3,
    question: "Ritme bahasa Inggris didasarkan pada...",
    options: ['Setiap suku kata sama', 'Ketukan tekanan'],
    answer: 'Ketukan tekanan',
    explanation: "Bahasa Inggris berwaktu tekanan (stress-timed). Kita bergerak cepat di antara kata-kata yang ditekankan."
  },
  {
    id: 4,
    question: "Dengarkan: 'Rock and Roll'. Suara mana yang biasanya menghilang?",
    options: ['Suara /d/ di And', 'Suara /r/ di Rock', 'Suara /l/ di Roll'],
    answer: 'Suara /d/ di And',
    explanation: "'And' menjadi 'n'. Kita mengucapkan 'Rock-n-Roll'."
  },
  {
    id: 5,
    question: "Dalam frasa 'Cup of tea', bagaimana 'OF' biasanya diucapkan ?",
    options: ["/ɒv/ (Kuat)","/ə/ atau /əv/ (Lemah)"],
    answer: "/ə/ atau /əv/ (Lemah)",
    explanation: "Dalam ritme alami, 'of' direduksi menjadi suara schwa, terdengar seperti 'Cup-a-tea'."
  },
  {
    id: 6,
    question: "Dari pilihan berikut, mana yang merupakan Kata Fungsi (biasanya tidak ditekankan)...",
    options: ["Apple","Run","For"],
    answer: "For",
    explanation: "Kata depan seperti 'for' adalah kata fungsi dan biasanya lemah/tidak ditekankan."
  },
  {
    id: 7,
    question: "Ritme bahasa Inggris didasarkan pada:",
    options: ["Setiap suku kata sama","Ketukan tekanan"],
    answer: "Ketukan tekanan",
    explanation: "Bahasa Inggris berwaktu tekanan (stress-timed). Kita bergerak cepat di antara kata-kata yang ditekankan."
  },
  {
    id: 8,
    question: "Perhatikan: 'Rock and Roll'. Suara mana yang biasanya menghilang?",
    options: ["Suara /d/ di And","Suara /r/ di Rock","Suara /l/ di Roll"],
    answer: "Suara /d/ di And",
    explanation: "'And' menjadi 'n'. Kita mengucapkan 'Rock-n-Roll'."
  },
  {
    id: 9,
    question: "Dalam frasa 'Cup of tea', bagaimana 'OF' biasanya diucapkan ?",
    options: ["/ɒv/ (Kuat)","/ə/ atau /əv/ (Lemah)"],
    answer: "/ə/ atau /əv/ (Lemah)",
    explanation: "Dalam ritme alami, 'of' direduksi menjadi suara schwa, terdengar seperti 'Cup-a-tea'."
  },
  {
    id: 10,
    question: "Kata mana yang merupakan Kata Fungsi (biasanya tidak ditekankan)...",
    options: ["Apple","Run","For"],
    answer: "For",
    explanation: "Kata depan seperti 'for' adalah kata fungsi dan biasanya lemah/tidak ditekankan."
  },
  {
    id: 11,
    question: "Ritme bahasa Inggris didasarkan pada...  ?",
    options: ["Setiap suku kata sama","Ketukan tekanan"],
    answer: "Ketukan tekanan",
    explanation: "Bahasa Inggris berwaktu tekanan (stress-timed). Kita bergerak cepat di antara kata-kata yang ditekankan."
  },
  {
    id: 12,
    question: "Perhatikan: 'Rock and Roll'. Suara mana yang biasanya menghilang...",
    options: ["Suara /d/ di And","Suara /r/ di Rock","Suara /l/ di Roll"],
    answer: "Suara /d/ di And",
    explanation: "'And' menjadi 'n'. Kita mengucapkan 'Rock-n-Roll'."
  },
  {
    id: 13,
    question: "Dalam frasa 'Cup of tea', bagaimana 'OF' biasanya diucapkan...",
    options: ["/ɒv/ (Kuat)","/ə/ atau /əv/ (Lemah)"],
    answer: "/ə/ atau /əv/ (Lemah)",
    explanation: "Dalam ritme alami, 'of' direduksi menjadi suara schwa, terdengar seperti 'Cup-a-tea'."
  },
  {
    id: 14,
    question: "Dari pilihan berikut, mana yang merupakan Kata Fungsi (biasanya tidak ditekankan)?",
    options: ["Apple","Run","For"],
    answer: "For",
    explanation: "Kata depan seperti 'for' adalah kata fungsi dan biasanya lemah/tidak ditekankan."
  },
  {
    id: 15,
    question: "Ritme bahasa Inggris didasarkan pada...",
    options: ["Setiap suku kata sama","Ketukan tekanan"],
    answer: "Ketukan tekanan",
    explanation: "Bahasa Inggris berwaktu tekanan (stress-timed). Kita bergerak cepat di antara kata-kata yang ditekankan."
  },
  {
    id: 16,
    question: "Fokus pada: 'Rock and Roll'. Suara mana yang biasanya menghilang?",
    options: ["Suara /d/ di And","Suara /r/ di Rock","Suara /l/ di Roll"],
    answer: "Suara /d/ di And",
    explanation: "'And' menjadi 'n'. Kita mengucapkan 'Rock-n-Roll'."
  },
  {
    id: 17,
    question: "Dalam frasa 'Cup of tea', bagaimana 'OF' biasanya diucapkan?",
    options: ["/ɒv/ (Kuat)","/ə/ atau /əv/ (Lemah)"],
    answer: "/ə/ atau /əv/ (Lemah)",
    explanation: "Dalam ritme alami, 'of' direduksi menjadi suara schwa, terdengar seperti 'Cup-a-tea'."
  },
  {
    id: 18,
    question: "Dari pilihan berikut, mana yang merupakan Kata Fungsi (biasanya tidak ditekankan) ?",
    options: ["Apple","Run","For"],
    answer: "For",
    explanation: "Kata depan seperti 'for' adalah kata fungsi dan biasanya lemah/tidak ditekankan."
  },
  {
    id: 19,
    question: "Ritme bahasa Inggris didasarkan pada:",
    options: ["Setiap suku kata sama","Ketukan tekanan"],
    answer: "Ketukan tekanan",
    explanation: "Bahasa Inggris berwaktu tekanan (stress-timed). Kita bergerak cepat di antara kata-kata yang ditekankan."
  },
  {
    id: 20,
    question: "Perhatikan: 'Rock and Roll'. Suara mana yang biasanya menghilang...",
    options: ["Suara /d/ di And","Suara /r/ di Rock","Suara /l/ di Roll"],
    answer: "Suara /d/ di And",
    explanation: "'And' menjadi 'n'. Kita mengucapkan 'Rock-n-Roll'."
  }
];

const ElemPronunLesson4: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_pronunciation', 4);
  const nextLessonPath = '/modul/english/elementary/pronunciation/lesson-5';
  // Practice State
  const [drillIndex, setDrillIndex] = useState(0);

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
      lessonLabel={"Elementary Pronunciation Lesson 4"}
      accentColor={"#2E86DE"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Ritme Kalimat"
            subtitle="Pronunciation • Pelajaran 4"
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
                  <TrendUpIcon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Detak Jantung Bahasa Inggris</h2>
                  <p className="text-teal-100 text-sm leading-relaxed">
                    Bahasa Inggris tidak diucapkan datar seperti robot 🤖. Ia memiliki ritme seperti musik 🎵. Kita memadatkan kata-kata kecil untuk bergerak lebih cepat ke kata-kata penting.
                  </p>
                </div>
              </motion.section>

              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-[var(--shadow-card)]">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <Lightbulb size={2000} />
                  Kata Isi vs Kata Fungsi
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-xl border border-blue-100">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-emerald-800">Kata Isi (Content Words)</span>
                      <span className="text-xs bg-white px-2 py-1 rounded text-emerald-600 font-bold">DITEKANKAN ●</span>
                    </div>
                    <p className="text-sm text-emerald-700 mb-2">Membawa makna.</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Kata Benda, Kata Kerja, Kata Sifat</p>
                  </div>

                  <div className="bg-[var(--color-background)] p-4 rounded-xl border border-[var(--color-border)]">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-[var(--color-text-secondary)]">Kata Fungsi (Function Words)</span>
                      <span className="text-xs bg-white px-2 py-1 rounded text-[var(--color-text-muted)] font-bold">Tidak ditekankan ·</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] mb-2">Perekat tata bahasa.</p>
                    <p className="text-xs text-[var(--color-text-muted)]">to, for, and, the, a, of</p>
                  </div>
                </div>
              </div>

<div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <FlameIcon className="w-6 h-6 text-orange-500" />
                  <h3 className="font-bold text-[var(--color-text-primary)] text-lg">Suara Schwa /ə/</h3>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Ketika kita berbicara cepat, vokal dalam kata fungsi berubah menjadi suara "uh" kecil yang disebut Schwa. Ini disebut <b>Bentuk Lemah (Weak Form)</b>.
                </p>
              </div>

              <div className="space-y-3">
                {WEAK_FORMS.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-card)] flex flex-col gap-3">
                    <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-2">
                      <span className="font-black text-xl text-[var(--color-primary)] uppercase">{item.word}</span>
                      <div className="text-right">
                        <span className="text-xs text-[var(--color-text-muted)] block line-through">{item.strong}</span>
                        <span className="text-sm font-bold text-[var(--color-text-primary)]">{item.weak}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-[var(--color-text-primary)]">
                        "{item.sentence}"
                      </div>
                      <button
                        onClick={() => playSound(item.sentence)}
                        className="w-10 h-10 rounded-full bg-gray-50 text-[var(--color-primary)] flex items-center justify-center hover:bg-teal-100 transition-colors"
                      >
                        <Volume2 size={20} />
                      </button>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] italic">Terdengar seperti: {item.example}</p>
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
              {RHYTHM_DRILLS.map((item: any, idx: number) => (
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

export default ElemPronunLesson4;
