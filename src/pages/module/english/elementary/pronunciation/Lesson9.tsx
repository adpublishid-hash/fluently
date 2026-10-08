import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Star, Lightbulb } from 'lucide-react';
import { StarIcon, RefreshIcon } from '../../../../../components/Icons';

type StressPair = {
  word: string;
  noun: { pronunciation: string; meaning: string; sentence: string };
  verb: { pronunciation: string; meaning: string; sentence: string };
};

const STRESS_PAIRS: StressPair[] = [
  {
    word: "Record",
    noun: { pronunciation: "RE-cord", meaning: "A file or music disc (Berkas/Musik)", sentence: "I bought a vinyl RE-cord." },
    verb: { pronunciation: "re-CORD", meaning: "To capture A/V (Merekam)", sentence: "Please re-CORD this meeting." }
  },
  {
    word: "Present",
    noun: { pronunciation: "PRE-sent", meaning: "A gift (Hadiah)", sentence: "Here is a birthday PRE-sent." },
    verb: { pronunciation: "pre-SENT", meaning: "To show/give (Memberi/Menunjukkan)", sentence: "He will pre-SENT his idea." }
  },
  {
    word: "Object",
    noun: { pronunciation: "OB-ject", meaning: "A thing (Benda)", sentence: "What is that OB-ject?" },
    verb: { pronunciation: "ob-JECT", meaning: "To disagree (Menolak)", sentence: "I ob-JECT to that plan." }
  },
  {
    word: "Project",
    noun: { pronunciation: "PROJ-ect", meaning: "A task/plan (Proyek)", sentence: "This is a big school PROJ-ect." },
    verb: { pronunciation: "pro-JECT", meaning: "To show on screen (Memproyeksikan)", sentence: "The machine will pro-JECT the movie." }
  },
  {
    word: "Contract",
    noun: { pronunciation: "CON-tract", meaning: "Legal agreement (Kontrak)", sentence: "Sign the CON-tract." },
    verb: { pronunciation: "con-TRACT", meaning: "To shrink (Menyusut)", sentence: "Muscles con-TRACT when they work." }
  }
];

const PRACTICE_ITEMS = [
  { id: 1, text: "I bought a new ___ (music album).", word: "Record", correct: "RE-cord (Noun)", type: "Noun" },
  { id: 2, text: "She will ___ (show) her work.", word: "Present", correct: "pre-SENT (Verb)", type: "Verb" },
  { id: 3, text: "Don't touch that strange ___ (thing).", word: "Object", correct: "OB-ject (Noun)", type: "Noun" },
  { id: 4, text: "We need to ___ (tape) the song.", word: "Record", correct: "re-CORD (Verb)", type: "Verb" },
  { id: 5, text: "They signed the ___ (agreement).", word: "Contract", correct: "CON-tract (Noun)", type: "Noun" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Aturan Umum: Jika kata 2 suku kata adalah KATA BENDA (NOUN), di mana penekanannya?",
    options: ['Suku Kata ke-2 (da-DA)', 'Suku Kata ke-1 (DA-da)'],
    answer: 'Suku Kata ke-1 (DA-da)',
    explanation: "Sebagian besar kata benda 2 suku kata menekankan bagian pertama (contoh: TA-ble, PEN-cil, RE-cord)."
  },
  {
    id: 2,
    question: "Aturan Umum: Jika kata 2 suku kata adalah KATA KERJA (VERB), di mana penekanannya?",
    options: ['Suku Kata ke-2 (da-DA)', 'Suku Kata ke-1 (DA-da)'],
    answer: 'Suku Kata ke-2 (da-DA)',
    explanation: "Sebagian besar kata kerja 2 suku kata menekankan bagian kedua (contoh: be-GIN, re-LAX, re-CORD)."
  },
  {
    id: 3,
    question: "Pola penekanan mana yang cocok: 'I will PRE-sent the gift'?",
    options: ['Salah', 'Benar'],
    answer: 'Salah',
    explanation: "Sebagai kata kerja (tindakan memberi), seharusnya pre-SENT."
  },
  {
    id: 4,
    question: "Dengarkan: 'DES-ert' (tempat kering) vs 'de-SERT' (meninggalkan). Mana yang merupakan kata benda?",
    options: ['de-SERT', 'DES-ert'],
    answer: 'DES-ert',
    explanation: "Tempat (Kata Benda) ditekankan pada suku kata pertama."
  },
  {
    id: 5,
    question: "Aturan Umum: Jika kata 2 suku kata adalah KATA BENDA (NOUN), di mana penekanannya...",
    options: ["Suku Kata ke-1 (DA-da)","Suku Kata ke-2 (da-DA)"],
    answer: "Suku Kata ke-1 (DA-da)",
    explanation: "Sebagian besar kata benda 2 suku kata menekankan bagian pertama (contoh: TA-ble, PEN-cil, RE-cord)."
  },
  {
    id: 6,
    question: "Aturan Umum: Jika kata 2 suku kata adalah KATA KERJA (VERB), di mana penekanannya...",
    options: ["Suku Kata ke-1 (DA-da)","Suku Kata ke-2 (da-DA)"],
    answer: "Suku Kata ke-2 (da-DA)",
    explanation: "Sebagian besar kata kerja 2 suku kata menekankan bagian kedua (contoh: be-GIN, re-LAX, re-CORD)."
  },
  {
    id: 7,
    question: "Pola penekanan mana yang cocok: 'I will PRE-sent the gift' ?",
    options: ["Salah", "Benar"],
    answer: "Salah",
    explanation: "Sebagai kata kerja (tindakan memberi), seharusnya pre-SENT."
  },
  {
    id: 8,
    question: "Dengarkan: 'DES-ert' (tempat kering) vs 'de-SERT' (meninggalkan). Mana yang merupakan kata benda?",
    options: ["de-SERT", "DES-ert"],
    answer: "DES-ert",
    explanation: "Tempat (Kata Benda) ditekankan pada suku kata pertama."
  },
  {
    id: 9,
    question: "Aturan Umum: Jika kata 2 suku kata adalah KATA BENDA (NOUN), di mana penekanannya?",
    options: ["Suku Kata ke-2 (da-DA)", "Suku Kata ke-1 (DA-da)"],
    answer: "Suku Kata ke-1 (DA-da)",
    explanation: "Sebagian besar kata benda 2 suku kata menekankan bagian pertama (contoh: TA-ble, PEN-cil, RE-cord)."
  },
  {
    id: 10,
    question: "Aturan Umum: Jika kata 2 suku kata adalah KATA KERJA (VERB), di mana penekanannya...",
    options: ["Suku Kata ke-1 (DA-da)","Suku Kata ke-2 (da-DA)"],
    answer: "Suku Kata ke-2 (da-DA)",
    explanation: "Sebagian besar kata kerja 2 suku kata menekankan bagian kedua (contoh: be-GIN, re-LAX, re-CORD)."
  },
  {
    id: 11,
    question: "Pola penekanan mana yang cocok: 'I will PRE-sent the gift' ?",
    options: ["Salah", "Benar"],
    answer: "Salah",
    explanation: "Sebagai kata kerja (tindakan memberi), seharusnya pre-SENT."
  },
  {
    id: 12,
    question: "Simak kata: 'DES-ert' (tempat kering) vs 'de-SERT' (meninggalkan). Mana yang merupakan kata benda ?",
    options: ["DES-ert","de-SERT"],
    answer: "DES-ert",
    explanation: "Tempat (Kata Benda) ditekankan pada suku kata pertama."
  },
  {
    id: 13,
    question: "Aturan Umum: Jika kata 2 suku kata adalah KATA BENDA (NOUN), di mana penekanannya?",
    options: ["Suku Kata ke-2 (da-DA)", "Suku Kata ke-1 (DA-da)"],
    answer: "Suku Kata ke-1 (DA-da)",
    explanation: "Sebagian besar kata benda 2 suku kata menekankan bagian pertama (contoh: TA-ble, PEN-cil, RE-cord)."
  },
  {
    id: 14,
    question: "Aturan Umum: Jika kata 2 suku kata adalah KATA KERJA (VERB), di mana penekanannya?",
    options: ["Suku Kata ke-2 (da-DA)", "Suku Kata ke-1 (DA-da)"],
    answer: "Suku Kata ke-2 (da-DA)",
    explanation: "Sebagian besar kata kerja 2 suku kata menekankan bagian kedua (contoh: be-GIN, re-LAX, re-CORD)."
  },
  {
    id: 15,
    question: "Pola penekanan mana yang cocok: 'I will PRE-sent the gift' ?",
    options: ["Salah", "Benar"],
    answer: "Salah",
    explanation: "Sebagai kata kerja (tindakan memberi), seharusnya pre-SENT."
  },
  {
    id: 16,
    question: "Simak kata: 'DES-ert' (tempat kering) vs 'de-SERT' (meninggalkan). Mana yang merupakan kata benda?",
    options: ["DES-ert","de-SERT"],
    answer: "DES-ert",
    explanation: "Tempat (Kata Benda) ditekankan pada suku kata pertama."
  },
  {
    id: 17,
    question: "Aturan Umum: Jika kata 2 suku kata adalah KATA BENDA (NOUN), di mana penekanannya?",
    options: ["Suku Kata ke-2 (da-DA)", "Suku Kata ke-1 (DA-da)"],
    answer: "Suku Kata ke-1 (DA-da)",
    explanation: "Sebagian besar kata benda 2 suku kata menekankan bagian pertama (contoh: TA-ble, PEN-cil, RE-cord)."
  },
  {
    id: 18,
    question: "Aturan Umum: Jika kata 2 suku kata adalah KATA KERJA (VERB), di mana penekanannya?",
    options: ["Suku Kata ke-2 (da-DA)", "Suku Kata ke-1 (DA-da)"],
    answer: "Suku Kata ke-2 (da-DA)",
    explanation: "Sebagian besar kata kerja 2 suku kata menekankan bagian kedua (contoh: be-GIN, re-LAX, re-CORD)."
  },
  {
    id: 19,
    question: "Pola penekanan mana yang cocok: 'I will PRE-sent the gift'...",
    options: ["Benar","Salah"],
    answer: "Salah",
    explanation: "Sebagai kata kerja (tindakan memberi), seharusnya pre-SENT."
  },
  {
    id: 20,
    question: "Dengarkan: 'DES-ert' (tempat kering) vs 'de-SERT' (meninggalkan). Mana yang merupakan kata benda?",
    options: ["de-SERT", "DES-ert"],
    answer: "DES-ert",
    explanation: "Tempat (Kata Benda) ditekankan pada suku kata pertama."
  }
];

const ElemPronunLesson9: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_pronunciation', 9);
  const nextLessonPath = '/modul/english/elementary/pronunciation/lesson-10';
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
    const current = PRACTICE_ITEMS[practiceIndex];

    // Check if the selected option matches the correct stress pattern description
    if (option === current.correct) {
      setPracticeFeedback('correct');
      playSound("Correct!");
    } else {
      setPracticeFeedback('incorrect');
      playSound("Try again.");
    }

    setTimeout(() => {
      setPracticeFeedback(null);
      if (practiceIndex < PRACTICE_ITEMS.length - 1) {
        setPracticeIndex(prev => prev + 1);
      } else {
        alert("Latihan Selesai! Pindah ke Kuis.");
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
      lessonLabel={"Elementary Pronunciation Lesson 9"}
      accentColor={"#2E86DE"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Pergeseran Penekanan Kata"
            subtitle="Pronunciation • Pelajaran 9"
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
                      className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <RefreshIcon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Kata Sama, Arti Beda? 🤔</h2>
                  <p className="text-amber-50 text-sm leading-relaxed">
                    Beberapa kata berubah arti tergantung di mana kamu memberikan penekanan!
                    <br /><br />
                    <b>Noun (Benda):</b> Tekan bagian ke-1.<br />
                    <b>Verb (Tindakan):</b> Tekan bagian ke-2.
                  </p>
                </div>
              </motion.section>

              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-[var(--shadow-card)]">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <Lightbulb size={18} className="text-amber-500" />
                  Aturan Emas
                </h3>

                <div className="flex gap-4">
                  <div className="flex-1 bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                    <span className="text-2xl block mb-2">📦</span>
                    <span className="font-bold text-blue-800 block text-lg">NOUN</span>
                    <span className="text-xs text-blue-600 font-mono"><b>DA</b>-da</span>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">Suku Kata ke-1</p>
                  </div>

                  <div className="flex-1 bg-red-50 p-4 rounded-xl border border-red-100 text-center">
                    <span className="text-2xl block mb-2">🏃</span>
                    <span className="font-bold text-red-800 block text-lg">VERB</span>
                    <span className="text-xs text-red-600 font-mono">da-<b>DA</b></span>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">Suku Kata ke-2</p>
                  </div>
                </div>
              </div>

<div className="space-y-6">
              {STRESS_PAIRS.map((pair, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] overflow-hidden">
                  <div className="bg-[var(--color-background)] px-4 py-3 border-b border-[var(--color-border)] flex justify-between items-center">
                    <h3 className="font-bold text-[var(--color-text-primary)] text-lg uppercase tracking-wider">{pair.word}</h3>
                    <div className="flex gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 divide-y divide-gray-100">
                    {/* Noun Side */}
                    <button
                      onClick={() => playSound(pair.noun.sentence)}
                      className="p-4 hover:bg-blue-50 transition-colors text-left group"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">NOUN</span>
                        <Volume2 size={16} />
                      </div>
                      <p className="text-lg font-bold text-[var(--color-text-primary)] mb-1">{pair.noun.pronunciation}</p>
                      <p className="text-xs text-[var(--color-text-muted)] mb-2">{pair.noun.meaning}</p>
                      <p className="text-sm text-[var(--color-text-primary)] italic">"{pair.noun.sentence}"</p>
                    </button>

                    {/* Verb Side */}
                    <button
                      onClick={() => playSound(pair.verb.sentence)}
                      className="p-4 hover:bg-red-50 transition-colors text-left group"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">VERB</span>
                        <Volume2 size={16} />
                      </div>
                      <p className="text-lg font-bold text-[var(--color-text-primary)] mb-1">{pair.verb.pronunciation}</p>
                      <p className="text-xs text-[var(--color-text-muted)] mb-2">{pair.verb.meaning}</p>
                      <p className="text-sm text-[var(--color-text-primary)] italic">"{pair.verb.sentence}"</p>
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
              {PRACTICE_ITEMS.map((item: any, idx: number) => (
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

export default ElemPronunLesson9;
