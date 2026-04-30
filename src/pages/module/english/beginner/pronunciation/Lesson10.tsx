import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, Star, Flame, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';


/* ─── Pronunciation Completion Helpers ─── */
const PRONUN_STORAGE_KEY = 'talky_beginner_pronunciation_completed';
function getCompletedPronunLessons(): number[] {
  try { return JSON.parse(localStorage.getItem(PRONUN_STORAGE_KEY) || '[]'); } catch { return []; }
}
function markPronunComplete(lessonId: number) {
  const done = getCompletedPronunLessons();
  if (!done.includes(lessonId)) localStorage.setItem(PRONUN_STORAGE_KEY, JSON.stringify([...done, lessonId]));
}


const REVIEW_POINTS = [
  {
    title: "Vokal & Konsonan",
    desc: "Vokal Pendek vs Panjang. Konsonan Disuarakan (getaran) vs Tak Disuarakan (udara).",
    icon: "🗣️",
    color: "bg-pink-50 text-pink-700 border-pink-200"
  },
  {
    title: "Akhiran (S & ED)",
    desc: "S = /s/, /z/, /ɪz/. ED = /t/, /d/, /ɪd/. Tergantung pada getarannya.",
    icon: "🔚",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    title: "Tekanan & Irama",
    desc: "Tekankan kata-kata penting (Lebih Keras/Panjang). Kata-kata tidak penting cepat.",
    icon: "🥁",
    color: "bg-amber-50 text-amber-700 border-amber-200"
  },
  {
    title: "Intonasi & Linking",
    desc: "Nada Turun ↘ (Pernyataan) atau Naik ↗ (Ya/Tidak). Kata-kata terhubung bersama.",
    icon: "🌊",
    color: "bg-gray-50 text-[var(--color-primary)] border-[var(--color-border)]"
  }
];

const TONGUE_TWISTERS = [
  {
    title: "S vs SH",
    text: "She sells seashells by the seashore.",
    focus: "Perhatikan posisi lidah! S = Senyum, SH = Shush.",
    audio: "She sells seashells by the seashore."
  },
  {
    title: "P vs B",
    text: "Peter Piper picked a peck of pickled peppers.",
    focus: "Letupkan bibir untuk P! Gunakan suara untuk B.",
    audio: "Peter Piper picked a peck of pickled peppers."
  },
  {
    title: "Bunyi TH",
    text: "The thirty-three thieves thought they thrilled the throne.",
    focus: "Julurkan lidah di antara gigi!",
    audio: "The thirty-three thieves thought they thrilled the throne."
  },
  {
    title: "Linking R",
    text: "Four uncles ordered four orange doors.",
    focus: "Hubungkan bunyi R ke vokal berikutnya.",
    audio: "Four uncles ordered four orange doors."
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Kata mana yang memiliki akhiran DISUARAKAN?",
    options: ['Cat', 'Dog', 'Cup'],
    answer: 'Dog',
    explanation: "/g/ disuarakan (tenggorokan bergetar). /t/ dan /p/ tak disuarakan."
  },
  {
    id: 2,
    question: "Bagaimana kamu mengucapkan 'Wanted'?",
    options: ['/wɒntd/', '/wɒntɪd/ (Suku Kata Ekstra)'],
    answer: '/wɒntɪd/ (Suku Kata Ekstra)',
    explanation: "Kata-kata berakhiran T atau D mendapat suku kata ekstra untuk ED."
  },
  {
    id: 3,
    question: "Dalam kalimat 'I love coffee', kata mana yang DITEKANKAN?",
    options: ['I, Love', 'Love, Coffee', 'I, Coffee'],
    answer: 'Love, Coffee',
    explanation: "Kata konten (Kata Kerja, Kata Benda) ditekankan. Kata ganti (I) lemah."
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
    question: "Linking: 'Stop it' terdengar seperti...",
    options: ['Stop... it', 'Sto-pit'],
    answer: 'Sto-pit',
    explanation: "Konsonan pindah ke vokal."
  },
  {
    id: 6,
    question: "Kata mana yang memiliki huruf MATI (Silent)?",
    options: ['Listen', 'Sound', 'Music'],
    answer: 'Listen',
    explanation: "Huruf T di Listen mati (/ˈlɪsən/)."
  },
  {
    id: 7,
    question: "Berapa suku kata dalam 'Banana'?",
    options: ['2', '3', '4'],
    answer: '3',
    explanation: "Ba-na-na memiliki 3 suku kata (3 bunyi vokal)."
  },
  {
    id: 8,
    question: "Pertanyaan 'Are you happy?' memiliki intonasi...",
    options: ['Naik (↗)', 'Turun (↘)'],
    answer: 'Naik (↗)',
    explanation: "Pertanyaan Ya/Tidak memiliki intonasi naik."
  },
  {
    id: 9,
    question: "Perbedaan /p/ dan /b/ adalah...",
    options: ['Posisi bibir', 'Vocal cords: /b/ bersuara, /p/ tidak', 'Tidak ada'],
    answer: 'Vocal cords: /b/ bersuara, /p/ tidak',
    explanation: "/b/ membuat tenggorokan bergetar, /p/ hanya udara."
  },
  {
    id: 10,
    question: "ED dalam 'Wanted' diucapkan sebagai...",
    options: ['/t/', '/d/', '/ɪd/'],
    answer: '/ɪd/',
    explanation: "Kata yang berakhir T atau D mendapat suku kata tambahan /ɪd/."
  },
  {
    id: 11,
    question: "Vokal dalam 'Cake' adalah...",
    options: ['Short A (/æ/)', 'Long A (/eɪ/)'],
    answer: 'Long A (/eɪ/)',
    explanation: "Magic E membuat A menjadi panjang - 'Cake' = /keɪk/."
  },
  {
    id: 12,
    question: "Kata benda 2 suku kata biasanya ditekan di...",
    options: ['Suku kata pertama', 'Suku kata kedua'],
    answer: 'Suku kata pertama',
    explanation: "Contoh: TAble, PENcil, WINdow - semua di awal."
  },
  {
    id: 13,
    question: "Linking terjadi dalam...",
    options: ["'Look at' → 'Loo-kat'", "'Look at' → 'Look. At.'"],
    answer: "'Look at' → 'Loo-kat'",
    explanation: "Kata-kata terhubung untuk ucapan natural."
  },
  {
    id: 14,
    question: "Huruf mana yang silent dalam 'Knife'?",
    options: ['K', 'N', 'E'],
    answer: 'K',
    explanation: "K tidak diucapkan - 'Knife' = /naɪf/."
  },
  {
    id: 15,
    question: "Pertanyaan 'What is your name?' memiliki intonasi...",
    options: ['Naik (↗)', 'Turun (↘)'],
    answer: 'Turun (↘)',
    explanation: "Pertanyaan Wh- memiliki intonasi turun."
  },
  {
    id: 16,
    question: "Kata mana yang berakhir /ɪz/?",
    options: ['Dogs', 'Cats', 'Boxes'],
    answer: 'Boxes',
    explanation: "Setelah bunyi desis (x, s, z, sh, ch), kita tambah /ɪz/."
  },
  {
    id: 17,
    question: "Bunyi /θ/ (seperti dalam 'Think') dibuat dengan...",
    options: ['Lidah menyentuh gigi atas', 'Bibir tertutup', 'Lidah di belakang'],
    answer: 'Lidah menyentuh gigi atas',
    explanation: "TH memerlukan lidah keluar menyentuh gigi."
  },
  {
    id: 18,
    question: "Kata kerja 2 suku kata biasanya ditekan di...",
    options: ['Suku kata pertama', 'Suku kata kedua'],
    answer: 'Suku kata kedua',
    explanation: "Contoh: beCOME, forGET, enJOY - di akhir."
  },
  {
    id: 19,
    question: "Bahasa Inggris adalah bahasa...",
    options: ['Stress-timed (irama berdasarkan tekanan)', 'Syllable-timed (irama berdasarkan suku kata)'],
    answer: 'Stress-timed (irama berdasarkan tekanan)',
    explanation: "Irama dibuat oleh kata-kata yang ditekan, bukan jumlah suku kata."
  },
  {
    id: 20,
    question: "Apa kunci pronunciation bahasa Inggris yang baik?",
    options: ['Ejaan sempurna', 'Praktik dan mendengarkan', 'Hafalan'],
    answer: 'Praktik dan mendengarkan',
    explanation: "Latihan dan mendengarkan penutur asli adalah kunci sukses!"
  }
];

const PronunLesson10: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = null;
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedPronunLessons().includes(10));
  const [showPronunModal, setShowPronunModal] = React.useState(false);
  const handleSelesai = () => { markPronunComplete(10); setIsCompleted(true); setShowPronunModal(true); };

  const pronunModal = showPronunModal ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={() => setShowPronunModal(false)}
    >
      <div
        className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #E83E8C, #E83E8C99)' }}>
          <span style={{ fontSize: 36 }}>🏆</span>
        </div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Pelajaran Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">
          Kamu telah menyelesaikan <b>Pronunciation Lesson 10</b>. Terus semangat!
        </p>
        <div className="flex justify-center gap-2 mb-6">
          <span style={{ fontSize: 26 }}>⭐</span>
          <span style={{ fontSize: 26 }}>⭐</span>
          <span style={{ fontSize: 26 }}>⭐</span>
        </div>
        <div className="flex gap-3">
          {nextLessonPath && (
            <button
              onClick={() => { setShowPronunModal(false); navigate(nextLessonPath); }}
              className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #E83E8C, #E83E8Cbb)' }}
            >
              Next ›
            </button>
          )}
          <button
            onClick={() => { setShowPronunModal(false); navigate(-1); }}
            className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  ) : null;

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
    {pronunModal}
        <LessonShell
            title="Tinjauan & Latihan"
            subtitle="Pronunciation • Pelajaran 10"
            accentColor="#E83E8C"
            tabs={[
                { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
                { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }
            ].filter(Boolean)}
            footer={() => (
                <button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: `linear-gradient(135deg, ${'#E83E8C'}, ${'#E83E8C'}cc)` }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai \u2713' : 'Selesai'}
                </button>
            )}
        >
            {(tabId) => tabId === 'learn' ? (
                <div className="space-y-6">
{/* Intro */}
              <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Star size={96} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Penutup Modul 🎓</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Kamu telah mempelajari rahasia pengucapan bahasa Inggris! Mari tinjau aturan utama agar terdengar seperti penutur asli.
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
                  <Flame size={20} />
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
            ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
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
                        {quizStep < QUIZ_QUESTIONS.length - 1 ? "Pertanyaan Selanjutnya" : "Lihat Hasil"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-500 shadow-inner">
                    <Trophy size={48} />
                  </div>
                  <h2 className="text-3xl font-black text-[var(--color-text-primary)] mb-2">Modul Selesai!</h2>
                  <p className="text-[var(--color-text-muted)] mb-8">Kamu mendapatkan skor {quizScore} dari {QUIZ_QUESTIONS.length}</p>

                  <div className="flex flex-col gap-3">
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
                </motion.div>
            )}
        </LessonShell>
    </>
  );
};

export default PronunLesson10;
