import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Star } from 'lucide-react';
import { StarIcon, TrendUpIcon } from '../../../../../components/Icons';

const TAG_RULES = [
  {
    type: "Pertanyaan Nyata",
    meaning: "Saya tidak tahu jawabannya. Saya bertanya padamu.",
    pattern: "Naik ↗",
    visual: "❓",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    example: "You haven't seen my keys, have you? ↗"
  },
  {
    type: "Konfirmasi",
    meaning: "Saya tahu jawabannya. Saya ingin kamu setuju dengan saya.",
    pattern: "Turun ↘",
    visual: "🤝",
    color: "bg-emerald-50 text-emerald-700 border-blue-200",
    example: "It's a beautiful day, isn't it? ↘"
  }
];

const LIST_RULES = [
  {
    title: "Daftar (Aturan 1-2-3)",
    desc: "Suara NAIK pada item, TURUN pada yang terakhir.",
    pattern: "Naik ↗, Naik ↗, dan Turun ↘",
    example: "I need eggs ↗, milk ↗, and bread ↘.",
    icon: "📝"
  },
  {
    title: "Pilihan (Ini atau Itu)",
    desc: "Suara NAIK pada pilihan pertama, TURUN pada yang kedua.",
    pattern: "Naik ↗ ... atau ... Turun ↘",
    example: "Do you want coffee ↗ or tea ↘?",
    icon: "⚖️"
  }
];

const PRACTICE_SENTENCES = [
  {
    id: 1,
    text: "We are late, aren't we?",
    context: "Kamu melihat waktu 9:05 untuk rapat jam 9:00.",
    type: "Turun ↘",
    hint: "Kamu tahu kamu terlambat."
  },
  {
    id: 2,
    text: "You're a doctor, aren't you?",
    context: "Kamu pikir begitu, tapi tidak 100% yakin.",
    type: "Naik ↗",
    hint: "Kamu meminta informasi."
  },
  {
    id: 3,
    text: "Red, blue, and green.",
    context: "Menyebutkan warna.",
    type: "Naik, Naik, Turun",
    hint: "Pola daftar standar."
  },
  {
    id: 4,
    text: "Is it Monday or Tuesday?",
    context: "Menanyakan hari apa ini.",
    type: "Naik lalu Turun",
    hint: "Pertanyaan pilihan."
  }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Jika suaramu TURUN (↘) pada question tag, itu berarti...",
    options: ['Kamu menanyakan pertanyaan nyata', 'Kamu mengharapkan orang tersebut setuju'],
    answer: 'Kamu mengharapkan orang tersebut setuju',
    explanation: "Intonasi turun pada tag berarti kamu menyatakan fakta/pendapat, bukan benar-benar bertanya."
  },
  {
    id: 2,
    question: "Apa pola yang benar untuk: 'I bought shoes, a shirt, and a hat.'",
    options: ['↘ ↘ ↘', '↗ ↗ ↘'],
    answer: '↗ ↗ ↘',
    explanation: "Daftar NAIK sampai item terakhir, yang TURUN untuk menunjukkan daftar selesai."
  },
  {
    id: 3,
    question: "Intonasi untuk: 'Do you want water ↗ or juice ↘?'",
    options: ['Pertanyaan Terbuka (Ya/Tidak)', 'Pertanyaan Pilihan'],
    answer: 'Pertanyaan Pilihan',
    explanation: "Saat menawarkan pilihan dengan 'or', suara naik pada yang pertama dan turun pada yang terakhir."
  },
  {
    id: 4,
    question: "Mana yang terdengar lebih sopan/mengundang?",
    options: ['Come in. ↘ (Datar/Rendah)', 'Come in! ↘ (Dinamis Tinggi-ke-Rendah)'],
    answer: 'Come in! ↘ (Dinamis Tinggi-ke-Rendah)',
    explanation: "Rentang nada yang lebih besar biasanya terdengar lebih antusias dan sopan."
  },
  {
    id: 5,
    question: "Jika suaramu TURUN (↘) pada question tag, itu berarti... ?",
    options: ["Kamu menanyakan pertanyaan nyata","Kamu mengharapkan orang tersebut setuju"],
    answer: "Kamu mengharapkan orang tersebut setuju",
    explanation: "Intonasi turun pada tag berarti kamu menyatakan fakta/pendapat, bukan benar-benar bertanya."
  },
  {
    id: 6,
    question: "Apa pola yang benar untuk: 'I bought shoes, a shirt, and a hat.'",
    options: ["↘ ↘ ↘","↗ ↗ ↘"],
    answer: "↗ ↗ ↘",
    explanation: "Daftar NAIK sampai item terakhir, yang TURUN untuk menunjukkan daftar selesai."
  },
  {
    id: 7,
    question: "Intonasi untuk: 'Do you want water ↗ or juice ↘?'",
    options: ["Pertanyaan Terbuka (Ya/Tidak)","Pertanyaan Pilihan"],
    answer: "Pertanyaan Pilihan",
    explanation: "Saat menawarkan pilihan dengan 'or', suara naik pada yang pertama dan turun pada yang terakhir."
  },
  {
    id: 8,
    question: "Mana yang terdengar lebih sopan/mengundang...",
    options: ["Come in. ↘ (Datar/Rendah)","Come in! ↘ (Dinamis Tinggi-ke-Rendah)"],
    answer: "Come in! ↘ (Dinamis Tinggi-ke-Rendah)",
    explanation: "Rentang nada yang lebih besar biasanya terdengar lebih antusias dan sopan."
  },
  {
    id: 9,
    question: "Jika suaramu TURUN (↘) pada question tag, itu berarti:",
    options: ["Kamu menanyakan pertanyaan nyata","Kamu mengharapkan orang tersebut setuju"],
    answer: "Kamu mengharapkan orang tersebut setuju",
    explanation: "Intonasi turun pada tag berarti kamu menyatakan fakta/pendapat, bukan benar-benar bertanya."
  },
  {
    id: 10,
    question: "Apa pola yang benar untuk: 'I bought shoes, a shirt, and a hat.'",
    options: ["↘ ↘ ↘","↗ ↗ ↘"],
    answer: "↗ ↗ ↘",
    explanation: "Daftar NAIK sampai item terakhir, yang TURUN untuk menunjukkan daftar selesai."
  },
  {
    id: 11,
    question: "Intonasi untuk: 'Do you want water ↗ or juice ↘?'",
    options: ["Pertanyaan Terbuka (Ya/Tidak)","Pertanyaan Pilihan"],
    answer: "Pertanyaan Pilihan",
    explanation: "Saat menawarkan pilihan dengan 'or', suara naik pada yang pertama dan turun pada yang terakhir."
  },
  {
    id: 12,
    question: "Mana yang terdengar lebih sopan/mengundang?",
    options: ["Come in. ↘ (Datar/Rendah)","Come in! ↘ (Dinamis Tinggi-ke-Rendah)"],
    answer: "Come in! ↘ (Dinamis Tinggi-ke-Rendah)",
    explanation: "Rentang nada yang lebih besar biasanya terdengar lebih antusias dan sopan."
  },
  {
    id: 13,
    question: "Jika suaramu TURUN (↘) pada question tag, itu berarti... ?",
    options: ["Kamu menanyakan pertanyaan nyata","Kamu mengharapkan orang tersebut setuju"],
    answer: "Kamu mengharapkan orang tersebut setuju",
    explanation: "Intonasi turun pada tag berarti kamu menyatakan fakta/pendapat, bukan benar-benar bertanya."
  },
  {
    id: 14,
    question: "Apa pola yang benar untuk: 'I bought shoes, a shirt, and a hat.'",
    options: ["↘ ↘ ↘","↗ ↗ ↘"],
    answer: "↗ ↗ ↘",
    explanation: "Daftar NAIK sampai item terakhir, yang TURUN untuk menunjukkan daftar selesai."
  },
  {
    id: 15,
    question: "Intonasi untuk: 'Do you want water ↗ or juice ↘?'",
    options: ["Pertanyaan Terbuka (Ya/Tidak)","Pertanyaan Pilihan"],
    answer: "Pertanyaan Pilihan",
    explanation: "Saat menawarkan pilihan dengan 'or', suara naik pada yang pertama dan turun pada yang terakhir."
  },
  {
    id: 16,
    question: "Mana yang terdengar lebih sopan/mengundang?",
    options: ["Come in. ↘ (Datar/Rendah)","Come in! ↘ (Dinamis Tinggi-ke-Rendah)"],
    answer: "Come in! ↘ (Dinamis Tinggi-ke-Rendah)",
    explanation: "Rentang nada yang lebih besar biasanya terdengar lebih antusias dan sopan."
  },
  {
    id: 17,
    question: "Jika suaramu TURUN (↘) pada question tag, itu berarti... ?",
    options: ["Kamu menanyakan pertanyaan nyata","Kamu mengharapkan orang tersebut setuju"],
    answer: "Kamu mengharapkan orang tersebut setuju",
    explanation: "Intonasi turun pada tag berarti kamu menyatakan fakta/pendapat, bukan benar-benar bertanya."
  },
  {
    id: 18,
    question: "Apa pola yang benar untuk: 'I bought shoes, a shirt, and a hat.'",
    options: ["↘ ↘ ↘","↗ ↗ ↘"],
    answer: "↗ ↗ ↘",
    explanation: "Daftar NAIK sampai item terakhir, yang TURUN untuk menunjukkan daftar selesai."
  },
  {
    id: 19,
    question: "Intonasi untuk: 'Do you want water ↗ or juice ↘?'",
    options: ["Pertanyaan Terbuka (Ya/Tidak)","Pertanyaan Pilihan"],
    answer: "Pertanyaan Pilihan",
    explanation: "Saat menawarkan pilihan dengan 'or', suara naik pada yang pertama dan turun pada yang terakhir."
  },
  {
    id: 20,
    question: "Mana yang terdengar lebih sopan/mengundang?",
    options: ["Come in. ↘ (Datar/Rendah)","Come in! ↘ (Dinamis Tinggi-ke-Rendah)"],
    answer: "Come in! ↘ (Dinamis Tinggi-ke-Rendah)",
    explanation: "Rentang nada yang lebih besar biasanya terdengar lebih antusias dan sopan."
  }
];

const ElemPronunLesson8: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_pronunciation', 8);
  const nextLessonPath = '/modul/english/elementary/pronunciation/lesson-9';
  // Practice State
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceFeedback, setPracticeFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string, rate: number = 0.9) => { playAudio(text, rate); };

  // Practice Handlers
  const checkPractice = (option: string) => {
    if (practiceFeedback) return;
    const current = PRACTICE_SENTENCES[practiceIndex];

    if (option === current.type) {
      setPracticeFeedback('correct');
      playSound("Correct!");
    } else {
      setPracticeFeedback('incorrect');
      playSound("Try again.");
    }

    setTimeout(() => {
      setPracticeFeedback(null);
      if (practiceIndex < PRACTICE_SENTENCES.length - 1) {
        setPracticeIndex(prev => prev + 1);
      } else {
        alert("Latihan Intonasi Selesai! Coba Kuis.");
        /* setActiveTab removed */
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
          <LessonCompleteModal
      show={showCompleteModal}
      onClose={() => setShowCompleteModal(false)}
      lessonLabel={"Elementary Pronunciation Lesson 8"}
      accentColor={"#2E86DE"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Pola Intonasi"
            subtitle="Pronunciation • Pelajaran 8"
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
                      className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendUpIcon className="w-24 h-24" />
                </div>
                <h2 className="text-xl font-bold mb-2">Question Tags</h2>
                <p className="text-indigo-100 text-sm leading-relaxed">
                  "It's hot, isn't it?" <br />
                  Maknanya berubah tergantung apakah suaramu NAIK atau TURUN di akhir.
                </p>
              </motion.section>

              <div className="space-y-4">
                {TAG_RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${rule.color.replace('text-', 'border-').split(' ')[2]} relative overflow-hidden`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className={`text-lg font-bold ${rule.color.split(' ')[1]}`}>{rule.type}</h3>
                        <div className="text-2xl mt-1 font-black">{rule.pattern}</div>
                      </div>
                      <span className="text-3xl bg-white/50 p-2 rounded-xl">{rule.visual}</span>
                    </div>

                    <p className="text-sm text-[var(--color-text-secondary)] mb-4">{rule.meaning}</p>

                    <button
                      onClick={() => playSound(rule.example)}
                      className="w-full flex items-center justify-between bg-white/60 p-3 rounded-xl border border-[var(--color-border)]/50 hover:bg-white transition-all group"
                    >
                      <span className="font-bold text-[var(--color-text-primary)] italic">"{rule.example}"</span>
                      <Volume2 className={`w-4 h-4 opacity-50 group-hover:opacity-100 ${rule.color.split(' ')[1]}`} />
                    </button>
                  </div>
                ))}
              </div>

<motion.section
                      custom={1}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                    <StarIcon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Daftar & Pilihan</h2>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                  Saat menyebutkan daftar, suara NAIK untuk menunjukkan "belum selesai", dan TURUN pada item terakhir untuk menunjukkan "selesai".
                </p>
              </motion.section>

              <div className="grid gap-4">
                {LIST_RULES.map((item, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:border-indigo-300 transition-all group">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-[var(--color-text-primary)]">{item.title}</h3>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div className="bg-[var(--color-background)] p-2 rounded-lg text-center mb-3 border border-[var(--color-border)]">
                      <span className="font-mono text-sm font-bold text-indigo-600">{item.pattern}</span>
                    </div>
                    <button
                      onClick={() => playSound(item.example)}
                      className="w-full text-left"
                    >
                      <span className="text-sm text-[var(--color-text-muted)] italic block mb-1">Contoh:</span>
                      <span className="text-base font-medium text-[var(--color-text-primary)] group-hover:text-indigo-700 transition-colors">"{item.example}"</span>
                    </button>
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
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
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

export default ElemPronunLesson8;
