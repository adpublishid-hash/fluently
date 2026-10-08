import React, { useState } from 'react';
import { motion } from 'framer-motion';import {  Volume2, Lightbulb, Sparkles, CheckCircle2, XCircle, BookOpen, PenTool, Star } from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const VOWEL_REVIEW = [
  { letter: "A", short: { word: "Hat", ipa: "/æ/" }, long: { word: "Hate", ipa: "/eɪ/" }, rule: "Magic 'E' membuat huruf menyebut namanya." },
  { letter: "E", short: { word: "Met", ipa: "/ɛ/" }, long: { word: "Meet", ipa: "/iː/" }, rule: "Double 'E' biasanya panjang." },
  { letter: "I", short: { word: "Sit", ipa: "/ɪ/" }, long: { word: "Site", ipa: "/aɪ/" }, rule: "Huruf 'I' pendek itu santai; 'I' panjang itu senyum." },
  { letter: "O", short: { word: "Hop", ipa: "/ɒ/" }, long: { word: "Hope", ipa: "/oʊ/" }, rule: "Bulatkan bibirmu untuk 'O' panjang." },
  { letter: "U", short: { word: "Cut", ipa: "/ʌ/" }, long: { word: "Cute", ipa: "/juː/" }, rule: "Huruf 'U' pendek adalah suara geraman." },
];

const TRICKY_CONSONANTS = [
  { sound: "TH (Unvoiced)", symbol: "/θ/", word: "Think", tip: "Lidah di antara gigi. Hembuskan udara." },
  { sound: "TH (Voiced)", symbol: "/ð/", word: "This", tip: "Lidah di antara gigi. Gunakan suara." },
  { sound: "V vs W", symbol: "/v/ vs /w/", word: "Vet / Wet", tip: "V = Gigit bibir. W = Bulatkan bibir." },
  { sound: "R vs L", symbol: "/r/ vs /l/", word: "Red / Led", tip: "R = Lidah ke belakang. L = Lidah menyentuh langit-langit." }
];

const MINIMAL_PAIRS = [
  { id: 1, pair: ["Ship", "Sheep"], target: "Sheep", hint: "E Panjang (Senyum)" },
  { id: 2, pair: ["Pan", "Pen"], target: "Pan", hint: "Buka mulut lebar /æ/" },
  { id: 3, pair: ["Boat", "Boot"], target: "Boat", hint: "Suara Oh /oʊ/" },
  { id: 4, pair: ["Think", "Sink"], target: "Think", hint: "Lidah keluar /θ/" },
  { id: 5, pair: ["Very", "Berry"], target: "Very", hint: "Gigi di bibir /v/" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Kata mana yang memiliki suara vokal PENDEK?",
    options: ['Feet', 'Cat', 'Late'],
    answer: 'Cat',
    explanation: "Cat memiliki suara /æ/. Late dan Feet adalah vokal panjang."
  },
  {
    id: 2,
    question: "Untuk membuat suara 'TH', lidahmu harus...",
    options: ['Menyentuh langit-langit mulut', 'Tetap datar', 'Berada di antara gigi'],
    answer: 'Berada di antara gigi',
    explanation: "Lidah harus sedikit menjulur di antara gigi."
  },
  {
    id: 3,
    question: "Dengarkan: 'Ship' vs 'Sheep'. Mana yang lebih panjang?",
    options: ['Sheep', 'Ship'],
    answer: 'Sheep',
    explanation: "Sheep /iː/ adalah suara vokal panjang."
  },
  {
    id: 4,
    question: "Huruf apa yang biasanya mengubah vokal Pendek menjadi vokal Panjang?",
    options: ['Silent E', 'Hard C', 'Double S'],
    answer: 'Silent E',
    explanation: "Magic 'E' di akhir kata (contoh: Hop -> Hope)."
  },
  {
    id: 5,
    question: "V vs W: Mana yang mengharuskan bibir 'membulat'?",
    options: ['V (Vet)', 'W (Wet)'],
    answer: 'W (Wet)',
    explanation: "W dibuat dengan membentuk lingkaran kecil dengan bibirmu."
  },
  {
    id: 6,
    question: "Kata mana yang memiliki suara vokal PENDEK?",
    options: ["Feet", "Hat", "Rate"],
    answer: "Hat",
    explanation: "Hat memiliki suara /æ/. Rate dan Feet adalah vokal panjang."
  },
  {
    id: 7,
    question: "Ketika menghasilkan bunyi 'TH', lidahmu harus...",
    options: ["Tetap datar", "Berada di antara gigi", "Menyentuh langit-langit mulut"],
    answer: "Berada di antara gigi",
    explanation: "Lidah harus sedikit menjulur di antara gigi."
  },
  {
    id: 8,
    question: "Dengarkan: 'Ship' vs 'Peep'. Mana yang lebih panjang...",
    options: ["Peep", "Ship"],
    answer: "Peep",
    explanation: "Peep /iː/ adalah suara vokal panjang."
  },
  {
    id: 9,
    question: "Elemen apa yang biasanya mengubah vokal Pendek menjadi vokal Panjang ?",
    options: ["Hard C", "Double S", "Silent E"],
    answer: "Silent E",
    explanation: "Magic 'E' di akhir kata (contoh: Hop -> Hope)."
  },
  {
    id: 10,
    question: "Bandingkan V & W: Mana yang mengharuskan bibir 'membulat'?",
    options: ["V (Vet)","W (Web)"],
    answer: "W (Web)",
    explanation: "W dibuat dengan membentuk lingkaran kecil dengan bibirmu."
  },
  {
    id: 11,
    question: "Kata mana yang memiliki suara vokal PENDEK?",
    options: ["Sweet", "Mat", "Late"],
    answer: "Mat",
    explanation: "Mat memiliki suara /æ/. Late dan Sweet adalah vokal panjang."
  },
  {
    id: 12,
    question: "Untuk membuat suara 'TH', lidahmu harus... ?",
    options: ["Berada di antara gigi", "Menyentuh langit-langit mulut", "Tetap datar"],
    answer: "Berada di antara gigi",
    explanation: "Lidah harus sedikit menjulur di antara gigi."
  },
  {
    id: 13,
    question: "Dengarkan: 'Dip' vs 'Peep'. Mana yang lebih panjang?",
    options: ["Peep", "Dip"],
    answer: "Peep",
    explanation: "Peep /iː/ adalah suara vokal panjang."
  },
  {
    id: 14,
    question: "Huruf apa yang biasanya mengubah vokal Pendek menjadi vokal Panjang?",
    options: ["Silent E", "Hard C", "Double S"],
    answer: "Silent E",
    explanation: "Magic 'E' di akhir kata (contoh: Hop -> Hope)."
  },
  {
    id: 15,
    question: "Suara V dan W: Mana yang mengharuskan bibir 'membulat'?",
    options: ["V (Vet)","W (Web)"],
    answer: "W (Web)",
    explanation: "W dibuat dengan membentuk lingkaran kecil dengan bibirmu."
  },
  {
    id: 16,
    question: "Kata mana yang memiliki suara vokal PENDEK?",
    options: ["Sheet", "Rat", "Rate"],
    answer: "Rat",
    explanation: "Rat memiliki suara /æ/. Rate dan Sheet adalah vokal panjang."
  },
  {
    id: 17,
    question: "Untuk membuat suara 'TH', lidahmu harus...",
    options: ["Menyentuh langit-langit mulut", "Tetap datar", "Berada di antara gigi"],
    answer: "Berada di antara gigi",
    explanation: "Lidah harus sedikit menjulur di antara gigi."
  },
  {
    id: 18,
    question: "Dengarkan: 'Sip' vs 'Weep'. Mana yang lebih panjang?",
    options: ["Weep", "Sip"],
    answer: "Weep",
    explanation: "Weep /iː/ adalah suara vokal panjang."
  },
  {
    id: 19,
    question: "Manakah yang biasanya mengubah vokal Pendek menjadi vokal Panjang?",
    options: ["Double S", "Hard C", "Silent E"],
    answer: "Silent E",
    explanation: "Magic 'E' di akhir kata (contoh: Hop -> Hope)."
  },
  {
    id: 20,
    question: "Bandingkan V & W: Mana yang mengharuskan bibir 'membulat'...",
    options: ["W (Will)", "V (Vet)"],
    answer: "W (Will)",
    explanation: "W dibuat dengan membentuk lingkaran kecil dengan bibirmu."
  }
];

const ElemPronunLesson1: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_pronunciation', 1);
  const nextLessonPath = '/modul/english/elementary/pronunciation/lesson-2';
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
  const checkPractice = (word: string) => {
    if (practiceFeedback) return;
    const current = MINIMAL_PAIRS[practiceIndex];

    if (word === current.target) {
      setPracticeFeedback('correct');
      playSound("Correct!");
    } else {
      setPracticeFeedback('incorrect');
      playSound("Try again.");
    }

    setTimeout(() => {
      setPracticeFeedback(null);
      if (practiceIndex < MINIMAL_PAIRS.length - 1) {
        setPracticeIndex(prev => prev + 1);
      } else {
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
      lessonLabel={"Elementary Pronunciation Lesson 1"}
      accentColor={"#2E86DE"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Tinjauan: Suara & Akurasi"
            subtitle="Pronunciation • Pelajaran 1"
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
            {(tabId: string) => tabId === 'learn' ? (
        <div className="space-y-8 animate-fade-in">
              {/* Vowel Mastery Intro */}
              <motion.section
                      custom={0}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Sparkles className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Penguasaan Vokal</h2>
                  <p className="text-violet-100 text-sm leading-relaxed">
                    Sebelum beralih ke topik lanjutan, mari pastikan vokal Pendek vs Panjangmu sudah sempurna. Ini adalah kunci #1 untuk aksen yang bagus.
                  </p>
                </div>
              </motion.section>

              {/* Vowel Table */}
              <div className="space-y-4">
                {VOWEL_REVIEW.map((v, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] overflow-hidden">
                    <div className="bg-[var(--color-background)] px-4 py-2 border-b border-[var(--color-border)] flex justify-between items-center">
                      <span className="font-bold text-[var(--color-text-primary)]">Huruf {v.letter}</span>
                      <span className="text-[10px] bg-white px-2 py-1 rounded border border-[var(--color-border)] text-[var(--color-text-muted)]">{v.rule}</span>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-gray-100">
                      <button onClick={() => playSound(v.short.word)} className="p-4 hover:bg-violet-50 transition-colors flex flex-col items-center">
                        <span className="text-xs text-[var(--color-text-muted)] font-bold mb-1">PENDEK</span>
                        <span className="text-lg font-bold text-[var(--color-text-primary)]">{v.short.word}</span>
                        <span className="text-xs text-violet-500 font-mono">{v.short.ipa}</span>
                      </button>
                      <button onClick={() => playSound(v.long.word)} className="p-4 hover:bg-violet-50 transition-colors flex flex-col items-center">
                        <span className="text-xs text-[var(--color-text-muted)] font-bold mb-1">PANJANG</span>
                        <span className="text-lg font-bold text-violet-700">{v.long.word}</span>
                        <span className="text-xs text-violet-500 font-mono">{v.long.ipa}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tricky Consonants */}
              <motion.section
                      custom={1}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-8 h-8 text-amber-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[var(--color-text-primary)] mb-2">Konsonan yang Sulit</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      Ini adalah suara-suara yang paling sulit bagi kebanyakan pelajar. Fokus pada posisi mulutmu.
                    </p>
                  </div>
                </div>
              </motion.section>

              <div className="grid gap-4">
                {TRICKY_CONSONANTS.map((item, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[var(--color-text-primary)] text-lg">{item.sound}</h4>
                      <p className="text-sm text-violet-600 font-bold mb-1">"{item.word}"</p>
                      <p className="text-xs text-[var(--color-text-muted)] italic">{item.tip}</p>
                    </div>
                    <button
                      onClick={() => playSound(item.word)}
                      className="w-12 h-12 bg-[var(--color-background)] rounded-full flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-violet-600 hover:text-white transition-all shadow-[var(--shadow-card)]"
                    >
                      <Volume2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
        </div>
      
      ) : tabId === 'challenge' ? (
        <div className="max-w-xl mx-auto p-4 md:p-8 pb-24 animate-fade-in">
          <div className="animate-fade-in space-y-8">
              {/* Minimal Pairs Practice */}
              <div className="max-w-xl mx-auto text-center pt-8">
                <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-violet-100/50 border border-violet-50 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                    <div
                      className="h-full bg-violet-500 transition-all duration-300"
                      style={{ width: `${((practiceIndex + 1) / MINIMAL_PAIRS.length) * 100}%` }}
                    ></div>
                  </div>

                  <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-6">Tantangan Minimal pairs</h3>

                  <div className="mb-8">
                    <button
                      onClick={() => playSound(MINIMAL_PAIRS[practiceIndex].target)}
                      className="w-20 h-20 bg-violet-50 text-violet-600 rounded-full flex items-center justify-center mx-auto hover:bg-violet-100 transition-all shadow-inner mb-4 animate-pulse"
                    >
                      <Volume2 size={32} />
                    </button>
                    <p className="text-[var(--color-text-secondary)] font-medium">Kata mana yang kamu dengar?</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {MINIMAL_PAIRS[practiceIndex].pair.map((word, idx) => (
                      <button
                        key={idx}
                        onClick={() => checkPractice(word)}
                        className="py-4 rounded-xl border-2 border-[var(--color-border)] hover:border-violet-400 hover:bg-violet-50 font-bold text-[var(--color-text-secondary)] transition-all active:scale-95 text-lg"
                      >
                        {word}
                      </button>
                    ))}
                  </div>

                  {practiceFeedback && (
                    <div className={`mt-6 font-bold animate-bounce ${practiceFeedback === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
                      {practiceFeedback === 'correct' ? 'Benar! 🎉' : 'Ups! Coba lagi.'}
                      {practiceFeedback === 'correct' && (
                        <p className="text-xs font-normal text-[var(--color-text-muted)] mt-1">Petunjuk: {MINIMAL_PAIRS[practiceIndex].hint}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
          </div>
        </div>
      ) : tabId === 'practice' ? (
        <div className="max-w-xl mx-auto p-4 md:p-8 pb-24 animate-fade-in">
          {/* Quiz */}
              <div className="max-w-xl mx-auto">
                {!showResult ? (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-violet-100">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                      <span className="text-xs font-bold bg-violet-50 text-violet-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                      {QUIZ_QUESTIONS[quizStep].question}
                    </h3>

                    <div className="space-y-3">
                      {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                        let btnClass = "border-[var(--color-border)] hover:border-violet-300 hover:bg-[var(--color-background)]";
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
                      <Star className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Kuis Selesai!</h2>
                    <p className="text-[var(--color-text-muted)] mb-6">Kamu mendapatkan skor {quizScore} dari {QUIZ_QUESTIONS.length}</p>
                    <button
                      onClick={restartQuiz}
                      className="px-8 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-200"
                    >
                      Coba Lagi
                    </button>
                  </div>
                )}
              </div>
        </div>
      ) : null}
    </LessonShell>
    </>
  );
};

export default ElemPronunLesson1;
