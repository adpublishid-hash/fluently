import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Star, Lightbulb, PlayCircle } from 'lucide-react';
import { StarIcon, FlameIcon, MicIcon, TrendUpIcon, TrophyIcon, RefreshIcon } from '../../../../../components/Icons';

const REVIEW_CARDS = [
  {
    title: "Vokal & Konsonan",
    points: [
      "Vokal Pendek vs Panjang (Ship vs Sheep)",
      "Magic 'E' membuat vokal menyebut namanya (Hop -> Hope)",
      "TH: Lidah di antara gigi",
      "V: Gigi atas di bibir bawah"
    ],
    color: "bg-pink-50 text-pink-700 border-pink-200",
    icon: "🗣️"
  },
  {
    title: "Akhiran Kata",
    points: [
      "-ED berbunyi seperti /t/, /d/, atau /ɪd/",
      "-S berbunyi seperti /s/, /z/, atau /ɪz/",
      "Jangan hilangkan suara akhir! (Nine vs Night)"
    ],
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "🔚"
  },
  {
    title: "Ritme & Aliran",
    points: [
      "Penekanan: Buat kata-kata penting LEBIH KERAS dan LEBIH PANJANG",
      "Bentuk Lemah: 'to', 'for', 'and' menjadi /tə/, /fər/, /ən/",
      "Menghubungkan: Pindahkan konsonan ke vokal (Stop-it -> Sto-pit)"
    ],
    color: "bg-emerald-50 text-emerald-700 border-blue-200",
    icon: "🌊"
  },
  {
    title: "Intonasi",
    points: [
      "Turun ↘: Pernyataan & Pertanyaan 5W+1H",
      "Naik ↗: Pertanyaan Ya/Tidak",
      "Daftar: Naik ↗, Naik ↗, Turun ↘"
    ],
    color: "bg-amber-50 text-amber-700 border-amber-200",
    icon: "🎵"
  }
];

const SOUND_TEST_ITEMS = [
  { id: 1, word: "Three", focus: "Suara TH (Bukan Tree)", ipa: "/θriː/" },
  { id: 2, word: "Very", focus: "Suara V (Bukan Wery)", ipa: "/ˈvɛri/" },
  { id: 3, word: "Walked", focus: "-ED sebagai /t/", ipa: "/wɔːkt/" },
  { id: 4, word: "Clothes", focus: "Gugus TH + S", ipa: "/kloʊðz/" },
  { id: 5, word: "Sheep", focus: "E Panjang (Senyum)", ipa: "/ʃiːp/" }
];

const FLOW_TEST_ITEMS = [
  { id: 1, text: "Fish and chips.", focus: "'and' Lemah (/n/)", tip: "Fish-n-chips" },
  { id: 2, text: "I want to go.", focus: "'to' Lemah (/tə/)", tip: "I want-ta go" },
  { id: 3, text: "Are you happy?", focus: "Intonasi Naik ↗", tip: "Suara naik" },
  { id: 4, text: "Stop it!", focus: "Menghubungkan (K+V)", tip: "Sto-pit" },
  { id: 5, text: "I bought apples, bananas, and pears.", focus: "Daftar (Naik, Naik, Turun)", tip: "↗, ↗, ↘" }
];

const FINAL_QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Kata mana yang memiliki suara Vokal Panjang?",
    options: ['Sit', 'Seat', 'Bit'],
    answer: 'Seat',
    explanation: "Seat menggunakan /iː/ (E Panjang)."
  },
  {
    id: 2,
    question: "Bagaimana kamu mengucapkan -ed dalam 'Started'?",
    options: ['/t/', '/d/', '/ɪd/ (Suku kata tambahan)'],
    answer: '/ɪd/ (Suku kata tambahan)',
    explanation: "Kata-kata yang berakhiran T atau D mendapatkan suku kata tambahan untuk -ed."
  },
  {
    id: 3,
    question: "Dalam kalimat 'She went to the park', kata mana yang DITEKANKAN?",
    options: ['to', 'the', 'park'],
    answer: 'park',
    explanation: "'Park' adalah kata isi (Kata Benda), jadi kuat. 'To' dan 'The' lemah."
  },
  {
    id: 4,
    question: "Bagaimana kamu menghubungkan 'Wake up'?",
    options: ['Wake...up', 'Wa-kup'],
    answer: 'Wa-kup',
    explanation: "Konsonan K pindah ke vokal U."
  },
  {
    id: 5,
    question: "Jika kamu mengajukan pertanyaan Ya/Tidak, suaramu biasanya...",
    options: ['Turun ↘', 'Naik ↗'],
    answer: 'Naik ↗',
    explanation: "Intonasi naik menandakan pertanyaan Ya/Tidak."
  },
  {
    id: 6,
    question: "Bagaimana cara mengucapkan 'Comfortable' secara alami?",
    options: ['Com-for-ta-ble (4 suku kata)', 'Comf-ta-ble (3 suku kata)'],
    answer: 'Comf-ta-ble (3 suku kata)',
    explanation: "Dalam bahasa Inggris alami, 'or' di tengah sering dihilangkan (Elisi Schwa)."
  },
  {
    id: 7,
    question: "Kata 'Vegetable' ditekan pada...",
    options: ['Suku kata ke-1 (VEG-ta-ble)', 'Suku kata ke-2 (ve-GET-a-ble)'],
    answer: 'Suku kata ke-1 (VEG-ta-ble)',
    explanation: "Penekanan ada pada suku kata pertama."
  },
  {
    id: 8,
    question: "Pasangan mana yang merupakan 'Minimal Pairs' (Hanya satu suara yang berbeda)?",
    options: ['Cat - Dog', 'Fan - Van', 'Big - Small'],
    answer: 'Fan - Van',
    explanation: "Hanya suara pertama yang berubah (/f/ vs /v/)."
  },
  {
    id: 9,
    question: "Manakah kata yang memiliki suara Vokal Panjang?",
    options: ["Sit","Greet","Bit"],
    answer: "Greet",
    explanation: "Seat menggunakan /iː/ (E Panjang)."
  },
  {
    id: 10,
    question: "Bagaimana kamu mengucapkan -ed dalam 'Started'?",
    options: ["/t/","/d/","/ɪd/ (Suku kata tambahan)"],
    answer: "/ɪd/ (Suku kata tambahan)",
    explanation: "Kata-kata yang berakhiran T atau D mendapatkan suku kata tambahan untuk -ed."
  },
  {
    id: 11,
    question: "Dalam kalimat 'She went to the school', kata mana yang DITEKANKAN?",
    options: ["to","the","school"],
    answer: "school",
    explanation: "'Park' adalah kata isi (Kata Benda), jadi kuat. 'To' dan 'The' lemah."
  },
  {
    id: 12,
    question: "Bagaimana kamu menghubungkan 'Wake up'?",
    options: ["Wake...up","Wa-kup"],
    answer: "Wa-kup",
    explanation: "Konsonan K pindah ke vokal U."
  },
  {
    id: 13,
    question: "Jika kamu mengajukan pertanyaan Ya/Tidak, suaramu biasanya...",
    options: ["Turun ↘","Naik ↗"],
    answer: "Naik ↗",
    explanation: "Intonasi naik menandakan pertanyaan Ya/Tidak."
  },
  {
    id: 14,
    question: "Bagaimana cara mengucapkan 'Comfortable' secara alami?",
    options: ["Com-for-ta-ble (4 suku kata)","Comf-ta-ble (3 suku kata)"],
    answer: "Comf-ta-ble (3 suku kata)",
    explanation: "Dalam bahasa Inggris alami, 'or' di tengah sering dihilangkan (Elisi Schwa)."
  },
  {
    id: 15,
    question: "Kata 'Vegetable' ditekan pada...",
    options: ["Suku kata ke-1 (VEG-ta-ble)","Suku kata ke-2 (ve-GET-a-ble)"],
    answer: "Suku kata ke-1 (VEG-ta-ble)",
    explanation: "Penekanan ada pada suku kata pertama."
  },
  {
    id: 16,
    question: "Pasangan mana yang merupakan 'Minimal Pairs' (Hanya satu suara yang berbeda)?",
    options: ["Cat - Dog","Fan - Van","Big - Small"],
    answer: "Fan - Van",
    explanation: "Hanya suara pertama yang berubah (/f/ vs /v/)."
  },
  {
    id: 17,
    question: "Kata mana yang memiliki suara Vokal Panjang?",
    options: ["Sit","Greet","Bit"],
    answer: "Greet",
    explanation: "Seat menggunakan /iː/ (E Panjang)."
  },
  {
    id: 18,
    question: "Bagaimana kamu mengucapkan -ed dalam 'Started'?",
    options: ["/t/","/d/","/ɪd/ (Suku kata tambahan)"],
    answer: "/ɪd/ (Suku kata tambahan)",
    explanation: "Kata-kata yang berakhiran T atau D mendapatkan suku kata tambahan untuk -ed."
  },
  {
    id: 19,
    question: "Dalam kalimat 'She ran to the park', kata mana yang DITEKANKAN?",
    options: ["to","the","park"],
    answer: "park",
    explanation: "'Park' adalah kata isi (Kata Benda), jadi kuat. 'To' dan 'The' lemah."
  },
  {
    id: 20,
    question: "Bagaimana kamu menghubungkan 'Wake up'?",
    options: ["Wake...up","Wa-kup"],
    answer: "Wa-kup",
    explanation: "Konsonan K pindah ke vokal U."
  }
];

const ElemPronunLesson15: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_pronunciation', 15);
  const nextLessonPath = undefined;
  // Test States
  const [testScore, setTestScore] = useState({ sounds: 0, flow: 0 });
  const [completedItems, setCompletedItems] = useState<string[]>([]); // Track checked items

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string, rate: number = 0.9) => { playAudio(text, rate); };

  // Self Assessment Handler
  const toggleComplete = (id: string, type: 'sounds' | 'flow') => {
    if (completedItems.includes(id)) {
      setCompletedItems(prev => prev.filter(item => item !== id));
      setTestScore(prev => ({ ...prev, [type]: prev[type] - 1 }));
    } else {
      setCompletedItems(prev => [...prev, id]);
      setTestScore(prev => ({ ...prev, [type]: prev[type] + 1 }));
      playSound("Good job!");
    }
  };

  // Quiz Handlers
  const handleCheckQuiz = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);
    if (option === FINAL_QUIZ_QUESTIONS[quizStep].answer) {
      setQuizScore(prev => prev + 1);
      playSound("Correct!");
    } else {
      playSound("Incorrect.");
    }
  };

  const nextQuizQuestion = () => {
    if (quizStep < FINAL_QUIZ_QUESTIONS.length - 1) {
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
      lessonLabel={"Elementary Pronunciation Lesson 15"}
      accentColor={"#2E86DE"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Penilaian Akhir"
            subtitle="Pronunciation • Pelajaran 15"
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
                      className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrophyIcon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Kamu Berhasil! 🎓</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Ini adalah akhir dari modul Pengucapan Dasar. Mari kita tinjau semua yang telah kamu latih untuk berbicara dengan jelas dan alami.
                  </p>
                </div>
              </motion.section>

              <div className="grid grid-cols-1 gap-4">
                {REVIEW_CARDS.map((card, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${card.color.replace('bg-', 'border-').split(' ')[2]}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl bg-[var(--color-background)] p-2 rounded-lg">{card.icon}</span>
                      <h3 className={`text-lg font-bold ${card.color.split(' ')[1]}`}>{card.title}</h3>
                    </div>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-secondary)] space-y-2">
                      {card.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

<div className="max-w-xl mx-auto">
              <div className="bg-white rounded-[2rem] p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
                  <MicIcon className="w-5 h-5 text-indigo-500" />
                  Penilaian Mandiri: Suara
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                  1. Putar audio model.<br />
                  2. Ucapkan dengan lantang.<br />
                  3. Centang kotak jika kamu merasa percaya diri.
                </p>

                <div className="space-y-3">
                  {SOUND_TEST_ITEMS.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-[var(--color-background)] p-3 rounded-xl border border-[var(--color-border)]">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <button
                            onClick={() => playSound(item.word)}
                            className="w-8 h-8 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:bg-indigo-50 transition-colors shadow-[var(--shadow-card)]"
                          >
                            <Volume2 size={16} />
                          </button>
                          <span className="font-bold text-[var(--color-text-primary)] text-lg">{item.word}</span>
                        </div>
                        <p className="text-xs text-[var(--color-text-muted)] pl-10"><span className="font-mono text-indigo-500">{item.ipa}</span> • {item.focus}</p>
                      </div>

                      <button
                        onClick={() => toggleComplete(`sound-${item.id}`, 'sounds')}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${completedItems.includes(`sound-${item.id}`)
                          ? 'bg-green-500 text-white shadow-md scale-110'
                          : 'bg-white border-2 border-[var(--color-border)] text-slate-300 hover:border-sky-400'
                          }`}
                      >
                        <CheckCircle2 size={24} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-bold text-sm">
                    Skor: {testScore.sounds} / {SOUND_TEST_ITEMS.length}
                  </span>
                </div>
              </div>
            </div>

<div className="max-w-xl mx-auto">
              <div className="bg-white rounded-[2rem] p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
                  <TrendUpIcon className="w-5 h-5 text-indigo-500" />
                  Penilaian Mandiri: Aliran
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                  Bisakah kamu menghubungkan kata-kata dengan lancar? Jangan terdengar seperti robot!
                </p>

                <div className="space-y-3">
                  {FLOW_TEST_ITEMS.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-[var(--color-background)] p-3 rounded-xl border border-[var(--color-border)]">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <button
                            onClick={() => playSound(item.text)}
                            className="w-8 h-8 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:bg-indigo-50 transition-colors shadow-[var(--shadow-card)]"
                          >
                            <Volume2 size={16} />
                          </button>
                          <span className="font-medium text-[var(--color-text-primary)] text-sm">"{item.text}"</span>
                        </div>
                        <p className="text-xs text-[var(--color-text-muted)] pl-10">Target: <span className="font-bold text-indigo-600">{item.focus}</span></p>
                        <p className="text-[10px] text-[var(--color-text-muted)] pl-10 mt-1 italic">{item.tip}</p>
                      </div>

                      <button
                        onClick={() => toggleComplete(`flow-${item.id}`, 'flow')}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${completedItems.includes(`flow-${item.id}`)
                          ? 'bg-green-500 text-white shadow-md scale-110'
                          : 'bg-white border-2 border-[var(--color-border)] text-slate-300 hover:border-sky-400'
                          }`}
                      >
                        <CheckCircle2 size={24} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-bold text-sm">
                    Skor: {testScore.flow} / {FLOW_TEST_ITEMS.length}
                  </span>
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
              {SOUND_TEST_ITEMS.map((item: any, idx: number) => (
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
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {FINAL_QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {FINAL_QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {FINAL_QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-indigo-300 hover:bg-[var(--color-background)]";
                      if (isAnswerChecked) {
                        if (option === FINAL_QUIZ_QUESTIONS[quizStep].answer) btnClass = "bg-green-50 border-sky-500 text-green-700";
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
                          {isAnswerChecked && option === FINAL_QUIZ_QUESTIONS[quizStep].answer && <CheckCircle2 size={20} />}
                          {isAnswerChecked && option === selectedOption && option !== FINAL_QUIZ_QUESTIONS[quizStep].answer && <XCircle size={20} />}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswerChecked && (
                    <div className="mt-6">
                      <div className={`p-3 rounded-lg text-sm mb-4 ${selectedOption === FINAL_QUIZ_QUESTIONS[quizStep].answer ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'}`}>
                        {FINAL_QUIZ_QUESTIONS[quizStep].explanation}
                      </div>
                      <button
                        onClick={nextQuizQuestion}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                      >
                        {quizStep < FINAL_QUIZ_QUESTIONS.length - 1 ? "Pertanyaan Berikutnya" : "Lihat Hasil"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-500 shadow-inner">
                    <TrophyIcon className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl font-black text-[var(--color-text-primary)] mb-2">Kursus Selesai!</h2>
                  <p className="text-[var(--color-text-muted)] mb-8">Kamu mendapatkan skor {quizScore} dari {FINAL_QUIZ_QUESTIONS.length}</p>

                  <div className="flex flex-col gap-3 max-w-xs mx-auto">
                    <button
                      onClick={restartQuiz}
                      className="w-full px-8 py-3 bg-white border-2 border-[var(--color-border)] text-[var(--color-text-primary)] rounded-xl font-bold hover:bg-[var(--color-background)] transition-all"
                    >
                      Ulangi Kuis
                    </button>
                    <button
                      onClick={() => navigate(-1)}
                      className="w-full px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                      Kembali ke Modul
                    </button>
                  </div>
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

export default ElemPronunLesson15;
