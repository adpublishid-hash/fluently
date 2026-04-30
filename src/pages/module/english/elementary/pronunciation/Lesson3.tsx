import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Star, Lightbulb, PlayCircle } from 'lucide-react';
import { StarIcon, FlameIcon, MicIcon, TrendUpIcon, TrophyIcon, RefreshIcon } from '../../../../../components/Icons';

type StressRule = {
  id: string;
  name: string;
  suffix: string;
  rule: string;
  pattern: string; // Visual pattern like o O o
  examples: { word: string; split: string }[];
  color: string;
};

const STRESS_RULES: StressRule[] = [
  {
    id: 'tion',
    name: "Aturan 'ION'",
    suffix: "-tion, -sion, -ic",
    rule: "Tekanan pada suku kata SEBELUM akhiran.",
    pattern: "o O ●",
    examples: [
      { word: "Education", split: "Ed-u-CA-tion" },
      { word: "Decision", split: "De-CI-sion" },
      { word: "Realistic", split: "Re-a-LIS-tic" },
      { word: "Economic", split: "Ec-o-NO-mic" }
    ],
    color: "bg-indigo-50 text-indigo-700 border-indigo-200"
  },
  {
    id: 'cy',
    name: "Aturan 'Y'",
    suffix: "-cy, -ty, -phy, -gy",
    rule: "Tekanan pada suku kata ke-3 dari belakang.",
    pattern: "O o o",
    examples: [
      { word: "Democracy", split: "De-MOC-ra-cy" },
      { word: "Photography", split: "Pho-TOG-ra-phy" },
      { word: "Activity", split: "Ac-TIV-i-ty" },
      { word: "Biology", split: "Bi-OL-o-gy" }
    ],
    color: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    id: 'compound',
    name: "Kata Benda Majemuk",
    suffix: "Dua Kata Benda Digabung",
    rule: "Tekanan pada bagian PERTAMA kata.",
    pattern: "O o",
    examples: [
      { word: "Bedroom", split: "BED-room" },
      { word: "Newspaper", split: "NEWS-pa-per" },
      { word: "Greenhouse", split: "GREEN-house" },
      { word: "Blackboard", split: "BLACK-board" }
    ],
    color: "bg-emerald-50 text-emerald-700 border-blue-200"
  }
];

const PRACTICE_WORDS = [
  { word: "Information", syllables: ["In", "for", "MA", "tion"], correctIndex: 2, hint: "Berakhiran -tion" },
  { word: "University", syllables: ["U", "ni", "VER", "si", "ty"], correctIndex: 2, hint: "Berakhiran -ty (ke-3 dari belakang)" },
  { word: "Romantic", syllables: ["Ro", "MAN", "tic"], correctIndex: 1, hint: "Berakhiran -ic" },
  { word: "Technology", syllables: ["Tech", "NOL", "o", "gy"], correctIndex: 1, hint: "Berakhiran -gy (ke-3 dari belakang)" },
  { word: "Toothpaste", syllables: ["TOOTH", "paste"], correctIndex: 0, hint: "Kata Benda Majemuk" },
  { word: "Discussion", syllables: ["Dis", "CUS", "sion"], correctIndex: 1, hint: "Berakhiran -sion" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Di mana tekanan pada 'Situation'?",
    options: ['SI-tu-a-tion', 'Si-tu-A-tion', 'Si-tu-a-TION'],
    answer: 'Si-tu-A-tion',
    explanation: "Kata berakhiran -tion ditekankan pada suku kata sebelum akhiran."
  },
  {
    id: 2,
    question: "Pola apa yang diikuti 'Biology'?",
    options: ['Tekan suku kata ke-1', 'Tekan suku kata terakhir', 'Tekan ke-3 dari belakang'],
    answer: 'Tekan ke-3 dari belakang',
    explanation: "Kata berakhiran -gy memiliki tekanan pada antepenultimate (ke-3 dari akhir) suku kata."
  },
  {
    id: 3,
    question: "Dengarkan 'Laptop'. Di mana tekanannya?",
    options: ['LAP-top', 'lap-TOP'],
    answer: 'LAP-top',
    explanation: "Kata benda majemuk (Lap + Top) menekan bagian pertama."
  },
  {
    id: 4,
    question: "Di mana tekanan pada 'Electric'?",
    options: ['E-lec-tric', 'e-LEC-tric', 'e-lec-TRIC'],
    answer: 'e-LEC-tric',
    explanation: "Kata berakhiran -ic ditekankan pada suku kata sebelum akhiran."
  },
  {
    id: 5,
    question: "Suku kata yang ditekankan selalu...",
    options: ['Lebih Cepat dan Lebih Pelan', 'Lebih Keras dan Lebih Panjang'],
    answer: 'Lebih Keras dan Lebih Panjang',
    explanation: "Ini adalah definisi tekanan kata dalam bahasa Inggris."
  },
  {
    id: 6,
    question: "Di mana tekanan pada 'Situation' ?",
    options: ["SI-tu-a-tion","Si-tu-A-tion","Si-tu-a-TION"],
    answer: "Si-tu-A-tion",
    explanation: "Kata berakhiran -tion ditekankan pada suku kata sebelum akhiran."
  },
  {
    id: 7,
    question: "Pola apa yang diikuti 'Biology' ?",
    options: ["Tekan suku kata ke-1","Tekan suku kata terakhir","Tekan ke-3 dari belakang"],
    answer: "Tekan ke-3 dari belakang",
    explanation: "Kata berakhiran -gy memiliki tekanan pada antepenultimate (ke-3 dari akhir) suku kata."
  },
  {
    id: 8,
    question: "Dengarkan 'Laptop'. Di mana tekanannya?",
    options: ["LAP-top","lap-TOP"],
    answer: "LAP-top",
    explanation: "Kata benda majemuk (Lap + Top) menekan bagian pertama."
  },
  {
    id: 9,
    question: "Di mana tekanan pada 'Electric'?",
    options: ["E-lec-tric","e-LEC-tric","e-lec-TRIC"],
    answer: "e-LEC-tric",
    explanation: "Kata berakhiran -ic ditekankan pada suku kata sebelum akhiran."
  },
  {
    id: 10,
    question: "Suku kata yang ditekankan selalu...",
    options: ["Lebih Cepat dan Lebih Pelan","Lebih Keras dan Lebih Panjang"],
    answer: "Lebih Keras dan Lebih Panjang",
    explanation: "Ini adalah definisi tekanan kata dalam bahasa Inggris."
  },
  {
    id: 11,
    question: "Di mana tekanan pada 'Situation'?",
    options: ["SI-tu-a-tion","Si-tu-A-tion","Si-tu-a-TION"],
    answer: "Si-tu-A-tion",
    explanation: "Kata berakhiran -tion ditekankan pada suku kata sebelum akhiran."
  },
  {
    id: 12,
    question: "Pola apa yang diikuti 'Biology'?",
    options: ["Tekan suku kata ke-1","Tekan suku kata terakhir","Tekan ke-3 dari belakang"],
    answer: "Tekan ke-3 dari belakang",
    explanation: "Kata berakhiran -gy memiliki tekanan pada antepenultimate (ke-3 dari akhir) suku kata."
  },
  {
    id: 13,
    question: "Dengarkan 'Laptop'. Di mana tekanannya?",
    options: ["LAP-top","lap-TOP"],
    answer: "LAP-top",
    explanation: "Kata benda majemuk (Lap + Top) menekan bagian pertama."
  },
  {
    id: 14,
    question: "Di mana tekanan pada 'Electric' ?",
    options: ["E-lec-tric","e-LEC-tric","e-lec-TRIC"],
    answer: "e-LEC-tric",
    explanation: "Kata berakhiran -ic ditekankan pada suku kata sebelum akhiran."
  },
  {
    id: 15,
    question: "Suku kata yang ditekankan selalu:",
    options: ["Lebih Cepat dan Lebih Pelan","Lebih Keras dan Lebih Panjang"],
    answer: "Lebih Keras dan Lebih Panjang",
    explanation: "Ini adalah definisi tekanan kata dalam bahasa Inggris."
  },
  {
    id: 16,
    question: "Di mana tekanan pada 'Situation'...",
    options: ["SI-tu-a-tion","Si-tu-A-tion","Si-tu-a-TION"],
    answer: "Si-tu-A-tion",
    explanation: "Kata berakhiran -tion ditekankan pada suku kata sebelum akhiran."
  },
  {
    id: 17,
    question: "Pola apa yang diikuti 'Biology' ?",
    options: ["Tekan suku kata ke-1","Tekan suku kata terakhir","Tekan ke-3 dari belakang"],
    answer: "Tekan ke-3 dari belakang",
    explanation: "Kata berakhiran -gy memiliki tekanan pada antepenultimate (ke-3 dari akhir) suku kata."
  },
  {
    id: 18,
    question: "Dengarkan 'Laptop'. Di mana tekanannya?",
    options: ["LAP-top","lap-TOP"],
    answer: "LAP-top",
    explanation: "Kata benda majemuk (Lap + Top) menekan bagian pertama."
  },
  {
    id: 19,
    question: "Di mana tekanan pada 'Electric'...",
    options: ["E-lec-tric","e-LEC-tric","e-lec-TRIC"],
    answer: "e-LEC-tric",
    explanation: "Kata berakhiran -ic ditekankan pada suku kata sebelum akhiran."
  },
  {
    id: 20,
    question: "Suku kata yang ditekankan selalu...",
    options: ["Lebih Cepat dan Lebih Pelan","Lebih Keras dan Lebih Panjang"],
    answer: "Lebih Keras dan Lebih Panjang",
    explanation: "Ini adalah definisi tekanan kata dalam bahasa Inggris."
  }
];

const ElemPronunLesson3: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_pronunciation', 3);
  const nextLessonPath = '/modul/english/elementary/pronunciation/lesson-4';
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
  const playSound = (text: string) => { playAudio(text, 0.9); };

  // Practice Handlers
  const handleSyllableClick = (index: number) => {
    if (practiceFeedback) return;
    const current = PRACTICE_WORDS[practiceIndex];

    if (index === current.correctIndex) {
      setPracticeFeedback('correct');
      playSound("Correct!");
    } else {
      setPracticeFeedback('incorrect');
      playSound("Try again.");
    }

    setTimeout(() => {
      setPracticeFeedback(null);
      if (practiceIndex < PRACTICE_WORDS.length - 1) {
        setPracticeIndex(prev => prev + 1);
      } else {
        alert("Ritme yang bagus! Pindah ke Kuis.");
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
      lessonLabel={"Elementary Pronunciation Lesson 3"}
      accentColor={"#2E86DE"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Tekanan Multi-suku kata"
            subtitle="Pronunciation • Pelajaran 3"
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
                      className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendUpIcon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Kata Panjang = Pola</h2>
                  <p className="text-amber-100 text-sm leading-relaxed">
                    Kata bahasa Inggris dengan 3 suku kata atau lebih mengikuti aturan tertentu. Akhiran kata sering memberitahumu di mana tekanan berada!
                  </p>
                </div>
              </motion.section>

              {/* Rules List */}
              <div className="space-y-6">
                {STRESS_RULES.map((rule, idx) => (
                  <div key={idx} className={`rounded-2xl border p-5 ${rule.color.replace('text-', 'border-').split(' ')[2] || 'border-[var(--color-border)]'} bg-white shadow-[var(--shadow-card)]`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-bold ${rule.color.split(' ')[1]}`}>{rule.name}</h3>
                      <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-current opacity-70">{rule.suffix}</span>
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)] mb-2">{rule.rule}</p>

                    <div className="space-y-2">
                      {rule.examples.map((ex, i) => (
                        <button
                          key={i}
                          onClick={() => playSound(ex.word)}
                          className="flex items-center justify-between bg-[var(--color-background)] p-3 rounded-xl border border-[var(--color-border)] hover:bg-white transition-all group w-full"
                        >
                          <span className="font-bold text-[var(--color-text-primary)] tracking-wide">
                            {ex.split.split('-').map((part, j) => (
                              <span key={j} className={part === part.toUpperCase() ? `text-xl ${rule.color.split(' ')[1]}` : "text-sm text-[var(--color-text-muted)] font-normal"}>
                                {part}
                              </span>
                            ))}
                          </span>
                          <Volume2 className={`w-4 h-4 opacity-50 group-hover:opacity-100 ${rule.color.split(' ')[1]}`} />
                        </button>
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
              {PRACTICE_WORDS.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <button
                    onClick={() => playSound(item.word)}
                    className="w-11 h-11 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 hover:bg-pink-200 transition-all"
                  >
                    <Volume2 size={18} />
                  </button>
                  <p className="flex-1 text-sm font-semibold text-slate-800">{item.word}</p>
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
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-amber-50 text-amber-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-amber-300 hover:bg-[var(--color-background)]";
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
                    className="px-8 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-200"
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

export default ElemPronunLesson3;
