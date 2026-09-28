import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Star } from 'lucide-react';
import { StarIcon, FlameIcon, TrendUpIcon, RefreshIcon } from '../../../../../components/Icons';

const REVIEW_DATA = [
  {
    type: "Akhiran -ED",
    rules: [
      { sound: "/t/", rule: "Setelah tak bersuara (p, k, f...)", ex: "Stop ➜ Stopped" },
      { sound: "/d/", rule: "Setelah bersuara (b, g, v...)", ex: "Play ➜ Played" },
      { sound: "/ɪd/", rule: "Setelah T atau D", ex: "Want ➜ Wanted" }
    ],
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    type: "Akhiran -S",
    rules: [
      { sound: "/s/", rule: "Setelah tak bersuara", ex: "Cat ➜ Cats" },
      { sound: "/z/", rule: "Setelah bersuara", ex: "Dog ➜ Dogs" },
      { sound: "/ɪz/", rule: "Setelah desis (s, z, sh...)", ex: "Bus ➜ Buses" }
    ],
    color: "bg-purple-50 text-purple-700 border-purple-200"
  }
];

const LINKING_EXAMPLES = [
  {
    phrase: "Stopped it",
    phonetic: "Stop-tit",
    type: "-ED (/t/) + Vokal",
    desc: "Suara /t/ pindah ke 'it'."
  },
  {
    phrase: "Moved on",
    phonetic: "Move-don",
    type: "-ED (/d/) + Vokal",
    desc: "Suara /d/ pindah ke 'on'."
  },
  {
    phrase: "Likes apples",
    phonetic: "Like-sapples",
    type: "-S (/s/) + Vokal",
    desc: "Suara /s/ pindah ke 'apples'."
  },
  {
    phrase: "Goes out",
    phonetic: "Go-zout",
    type: "-S (/z/) + Vokal",
    desc: "Suara /z/ pindah ke 'out'."
  }
];

const CLUSTER_CHALLENGES = [
  { word: "Asked", phonetic: "/æskt/", tip: "Terdengar seperti 'Ask' + 't'. Tidak ada /ɪd/!" },
  { word: "Texts", phonetic: "/tɛksts/", tip: "K-S-T-S. Sangat tajam." },
  { word: "Clothes", phonetic: "/kloʊðz/", tip: "Sering terdengar seperti 'Close' /kloʊz/ dalam ucapan cepat." },
  { word: "Months", phonetic: "/mʌnθs/", tip: "N-TH-S. Sering disederhanakan menjadi /mʌns/." },
  { word: "Scripts", phonetic: "/skrɪpts/", tip: "P-T-S. Semua tak bersuara." }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Bagaimana Anda menghubungkan 'Walked away'?",
    options: ['Walk-ed away', 'Walk-taway', 'Walk-daway'],
    answer: 'Walk-taway',
    explanation: "'Walked' berakhiran /t/ (K tak bersuara). /t/ terhubung ke 'away'."
  },
  {
    id: 2,
    question: "Dalam ucapan cepat, 'Clothes' sering terdengar persis seperti...",
    options: ['Close (Shut)', 'Cloths (Fabric)', 'Clouds'],
    answer: 'Close (Shut)',
    explanation: "Suara /ð/ (th) sulit di antara vokal/konsonan, jadi penutur asli sering menghilangkannya: /kloʊz/."
  },
  {
    id: 3,
    question: "Kata mana yang memiliki SATU suku kata?",
    options: ['Wanted', 'Needed', 'Asked'],
    answer: 'Asked',
    explanation: "'Asked' berakhiran K (tak bersuara), jadi ED adalah /t/. Tidak ada suku kata tambahan."
  },
  {
    id: 4,
    question: "Bagaimana Anda menghubungkan 'She loves it'?",
    options: ['Love-sit', 'Love-zit', 'Loves-it'],
    answer: 'Love-zit',
    explanation: "'Loves' berakhiran /z/ (V bersuara). /z/ pindah ke 'it'."
  },
  {
    id: 5,
    question: "Ucapkan: 'Desks'.",
    options: ['Des-kes', 'Desks (S-K-S)', 'Desk-iz'],
    answer: 'Desks (S-K-S)',
    explanation: "Tidak ada vokal tambahan. Hanya gugus S-K-S."
  },
  {
    id: 6,
    question: "Bagaimana Anda menghubungkan 'Walked away'...",
    options: ["Walk-ed away","Walk-taway","Walk-daway"],
    answer: "Walk-taway",
    explanation: "'Walked' berakhiran /t/ (K tak bersuara). /t/ terhubung ke 'away'."
  },
  {
    id: 7,
    question: "Dalam ucapan cepat, 'Clothes' sering terdengar persis seperti... ?",
    options: ["Close (Shut)","Cloths (Fabric)","Clouds"],
    answer: "Close (Shut)",
    explanation: "Suara /ð/ (th) sulit di antara vokal/konsonan, jadi penutur asli sering menghilangkannya: /kloʊz/."
  },
  {
    id: 8,
    question: "Kata mana yang memiliki SATU suku kata?",
    options: ["Wanted","Needed","Asked"],
    answer: "Asked",
    explanation: "'Asked' berakhiran K (tak bersuara), jadi ED adalah /t/. Tidak ada suku kata tambahan."
  },
  {
    id: 9,
    question: "Bagaimana Anda menghubungkan 'She loves it'...",
    options: ["Love-sit","Love-zit","Loves-it"],
    answer: "Love-zit",
    explanation: "'Loves' berakhiran /z/ (V bersuara). /z/ pindah ke 'it'."
  },
  {
    id: 10,
    question: "Ucapkan: 'Desks'.",
    options: ["Des-kes","Desks (S-K-S)","Desk-iz"],
    answer: "Desks (S-K-S)",
    explanation: "Tidak ada vokal tambahan. Hanya gugus S-K-S."
  },
  {
    id: 11,
    question: "Bagaimana Anda menghubungkan 'Walked away' ?",
    options: ["Walk-ed away","Walk-taway","Walk-daway"],
    answer: "Walk-taway",
    explanation: "'Walked' berakhiran /t/ (K tak bersuara). /t/ terhubung ke 'away'."
  },
  {
    id: 12,
    question: "Dalam ucapan cepat, 'Clothes' sering terdengar persis seperti...",
    options: ["Close (Shut)","Cloths (Fabric)","Clouds"],
    answer: "Close (Shut)",
    explanation: "Suara /ð/ (th) sulit di antara vokal/konsonan, jadi penutur asli sering menghilangkannya: /kloʊz/."
  },
  {
    id: 13,
    question: "Kata mana yang memiliki SATU suku kata?",
    options: ["Wanted","Needed","Asked"],
    answer: "Asked",
    explanation: "'Asked' berakhiran K (tak bersuara), jadi ED adalah /t/. Tidak ada suku kata tambahan."
  },
  {
    id: 14,
    question: "Bagaimana Anda menghubungkan 'She loves it'?",
    options: ["Love-sit","Love-zit","Loves-it"],
    answer: "Love-zit",
    explanation: "'Loves' berakhiran /z/ (V bersuara). /z/ pindah ke 'it'."
  },
  {
    id: 15,
    question: "Ucapkan: 'Desks'.",
    options: ["Des-kes","Desks (S-K-S)","Desk-iz"],
    answer: "Desks (S-K-S)",
    explanation: "Tidak ada vokal tambahan. Hanya gugus S-K-S."
  },
  {
    id: 16,
    question: "Bagaimana Anda menghubungkan 'Walked away'...",
    options: ["Walk-ed away","Walk-taway","Walk-daway"],
    answer: "Walk-taway",
    explanation: "'Walked' berakhiran /t/ (K tak bersuara). /t/ terhubung ke 'away'."
  },
  {
    id: 17,
    question: "Dalam ucapan cepat, 'Clothes' sering terdengar persis seperti...",
    options: ["Close (Shut)","Cloths (Fabric)","Clouds"],
    answer: "Close (Shut)",
    explanation: "Suara /ð/ (th) sulit di antara vokal/konsonan, jadi penutur asli sering menghilangkannya: /kloʊz/."
  },
  {
    id: 18,
    question: "Kata mana yang memiliki SATU suku kata?",
    options: ["Wanted","Needed","Asked"],
    answer: "Asked",
    explanation: "'Asked' berakhiran K (tak bersuara), jadi ED adalah /t/. Tidak ada suku kata tambahan."
  },
  {
    id: 19,
    question: "Bagaimana Anda menghubungkan 'She loves it'?",
    options: ["Love-sit","Love-zit","Loves-it"],
    answer: "Love-zit",
    explanation: "'Loves' berakhiran /z/ (V bersuara). /z/ pindah ke 'it'."
  },
  {
    id: 20,
    question: "Ucapkan: 'Desks'.",
    options: ["Des-kes","Desks (S-K-S)","Desk-iz"],
    answer: "Desks (S-K-S)",
    explanation: "Tidak ada vokal tambahan. Hanya gugus S-K-S."
  }
];

const ElemPronunLesson7: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_pronunciation', 7);
  const nextLessonPath = '/modul/english/elementary/pronunciation/lesson-8';
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
      lessonLabel={"Elementary Pronunciation Lesson 7"}
      accentColor={"#2E86DE"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="-ed & -s (Lanjutan)"
            subtitle="Pronunciation • Pelajaran 7"
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
                  <RefreshIcon className="w-24 h-24" />
                </div>
                <h2 className="text-xl font-bold mb-2">Rekap Cepat</h2>
                <p className="text-teal-100 text-sm leading-relaxed">
                  Ingat: Suara <b>-ed</b> dan <b>-s</b> berubah tergantung pada suara sebelumnya. Mari kuasai ini sebelum beralih ke menghubungkan!
                </p>
              </motion.section>

              {/* Review Cards */}
              <div className="space-y-4">
                {REVIEW_DATA.map((data, idx) => (
                  <div key={idx} className={`rounded-2xl border p-5 ${data.color.replace('text-', 'border-').split(' ')[2] || 'border-[var(--color-border)]'} bg-white shadow-[var(--shadow-card)]`}>
                    <h3 className={`text-lg font-bold mb-3 ${data.color.split(' ')[1]}`}>{data.type}</h3>
                    <div className="space-y-2">
                      {data.rules.map((r, i) => (
                        <div key={i} className="flex justify-between items-center bg-[var(--color-background)] p-2 rounded-lg text-sm">
                          <div>
                            <span className="font-bold text-[var(--color-text-primary)] mr-2">{r.sound}</span>
                            <span className="text-[var(--color-text-muted)] text-xs">{r.rule}</span>
                          </div>
                          <span className="text-xs font-medium text-[var(--color-text-primary)] bg-white px-2 py-1 rounded border border-[var(--color-border)]">{r.ex}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

<motion.section
                      custom={1}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-start gap-4">
                  <div className="bg-teal-100 p-2 rounded-xl text-[var(--color-primary)]">
                    <TrendUpIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--color-text-primary)] mb-2">Menghubungkan Akhiran</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      Ketika sebuah kata berakhiran <b>-ed</b> atau <b>-s</b> dan kata berikutnya dimulai dengan <b>VOKAL</b>, hubungkan suaranya! Itu membuatmu terdengar lancar.
                    </p>
                  </div>
                </div>
              </motion.section>

              <div className="grid gap-3">
                {LINKING_EXAMPLES.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold bg-gray-100 text-[var(--color-text-muted)] px-2 py-1 rounded">{item.type}</span>
                      <button
                        onClick={() => playSound(item.phrase)}
                        className="w-8 h-8 rounded-full bg-gray-50 text-[var(--color-primary)] flex items-center justify-center hover:bg-teal-100 transition-colors"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">{item.phrase}</h3>
                    <div className="flex items-center gap-2 text-[var(--color-primary)] font-mono text-sm font-bold bg-gray-50/50 p-2 rounded-lg">
                      <span>🔊</span>
                      {item.phonetic}
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>

<div className="max-w-xl mx-auto">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200 border border-[var(--color-border)] text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
                  <FlameIcon className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Gugus Konsonan</h3>
                <p className="text-[var(--color-text-muted)] text-sm mb-8">Beberapa kata berakhir dengan banyak suara konsonan bersamaan. Ini sulit tapi penting! Latih perlahan.</p>

                <div className="space-y-4">
                  {CLUSTER_CHALLENGES.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => playSound(item.word)}
                      className="w-full flex items-center justify-between bg-[var(--color-background)] p-4 rounded-xl border border-[var(--color-border)] hover:border-red-300 hover:bg-white transition-all group"
                    >
                      <div className="text-left">
                        <span className="block font-bold text-lg text-[var(--color-text-primary)]">{item.word}</span>
                        <span className="text-xs text-[var(--color-text-muted)] font-mono">{item.phonetic}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-red-500 font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity mr-3">Putar</span>
                        <Volume2 size={20} />
                      </div>
                    </button>
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
              {CLUSTER_CHALLENGES.map((item: any, idx: number) => (
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

export default ElemPronunLesson7;
