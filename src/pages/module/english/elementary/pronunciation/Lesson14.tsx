import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Star } from 'lucide-react';
import { StarIcon, MicIcon } from '../../../../../components/Icons';

const ACCENT_CONCEPTS = [
  {
    title: "Aksen vs Kesalahan",
    desc: "Aksen adalah 'musik' dari suaramu. Itu menunjukkan asalmu. Sebuah **Kesalahan Pengucapan** mengubah maknanya (mis. 'Sink' daripada 'Think'). Kesalahan itu buruk; Aksen tidak apa-apa!",
    icon: "⚖️",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    title: "Keterpahaman",
    desc: "Tujuannya adalah **Kejelasan**, bukan terdengar 'Asli'. Jika orang memahamimu dengan mudah, pengucapanmu bagus, bahkan jika kamu memiliki aksen.",
    icon: "🎯",
    color: "bg-emerald-50 text-emerald-700 border-blue-200"
  },
  {
    title: "Suara 'R' (Rhoticity)",
    desc: "Dalam Bahasa Inggris **Amerika**, kita biasanya mengucapkan 'R' di akhir kata (Car, Hard). Dalam Bahasa Inggris **Britania** (RP), 'R' sering diam (Ca_, Ha_d).",
    icon: "🦅",
    color: "bg-red-50 text-red-700 border-red-200"
  },
  {
    title: "Suara 'T'",
    desc: "Dalam Bahasa Inggris **Amerika**, 'T' di antara vokal sering terdengar seperti 'D' lembut (Water = Wadder). Dalam Bahasa Inggris **Britania**, biasanya 'T' yang jelas.",
    icon: "☕",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200"
  }
];

const ACCENT_COMPARISONS = [
  {
    word: "Water",
    us_ipa: "/ˈwɔːtər/ (Wadder)",
    uk_ipa: "/ˈwɔːtə/ (War-tuh)",
    desc: "AS: Flap T (D Lembut). UK: T Sejati."
  },
  {
    word: "Car",
    us_ipa: "/kɑːr/ (Carrr)",
    uk_ipa: "/kɑː/ (Caa)",
    desc: "AS: R Keras. UK: R Diam."
  },
  {
    word: "Better",
    us_ipa: "/ˈbɛtər/ (Bedder)",
    uk_ipa: "/ˈbɛtə/ (Bet-uh)",
    desc: "AS: Flap T + R. UK: T Sejati + R Diam."
  },
  {
    word: "Tomato",
    us_ipa: "/təˈmeɪtoʊ/ (To-MAY-to)",
    uk_ipa: "/təˈmɑːtəʊ/ (To-MAH-to)",
    desc: "Suara vokal yang berbeda."
  },
  {
    word: "Schedule",
    us_ipa: "/ˈskɛdʒuːl/ (Sked-jool)",
    uk_ipa: "/ˈʃɛdjuːl/ (Shed-yool)",
    desc: "K Keras vs Suara SH Lembut."
  }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Apakah memiliki aksen itu buruk?",
    options: ['Ya, selalu.', 'Tidak, asalkan kamu jelas.', 'Ya, kamu harus terdengar seperti orang Amerika.'],
    answer: 'Tidak, asalkan kamu jelas.',
    explanation: "Aksenmu adalah bagian dari identitasmu. Kejelasan adalah yang terpenting."
  },
  {
    id: 2,
    question: "Dalam Bahasa Inggris Britania Standar, 'R' di akhir 'Car' biasanya...",
    options: ['Diucapkan dengan kuat', 'Diam / Lembut', 'Digulung seperti bahasa Spanyol'],
    answer: 'Diam / Lembut',
    explanation: "Bahasa Inggris Britania Standar bersifat non-rhotic, artinya mereka menghilangkan R di akhir kata."
  },
  {
    id: 3,
    question: "Orang Amerika biasanya mengucapkan 'T' dalam 'Water' seperti...",
    options: ['T yang tajam', 'D lembut (Flap T)', 'Suara diam'],
    answer: 'D lembut (Flap T)',
    explanation: "Ini disebut 'Flap T'."
  },
  {
    id: 4,
    question: "Mengatakan 'Sink' daripada 'Think' adalah...",
    options: ['Hanya aksen', 'Kesalahan pengucapan'],
    answer: 'Kesalahan pengucapan',
    explanation: "Ini adalah kesalahan karena mengubah arti kata tersebut."
  },
  {
    id: 5,
    question: "Apakah memiliki aksen itu buruk...",
    options: ["Ya, selalu.","Tidak, asalkan kamu jelas.","Ya, kamu harus terdengar seperti orang Amerika."],
    answer: "Tidak, asalkan kamu jelas.",
    explanation: "Aksenmu adalah bagian dari identitasmu. Kejelasan adalah yang terpenting."
  },
  {
    id: 6,
    question: "Dalam Bahasa Inggris Britania Standar, 'R' di akhir 'Car' biasanya...",
    options: ["Diucapkan dengan kuat","Diam / Lembut","Digulung seperti bahasa Spanyol"],
    answer: "Diam / Lembut",
    explanation: "Bahasa Inggris Britania Standar bersifat non-rhotic, artinya mereka menghilangkan R di akhir kata."
  },
  {
    id: 7,
    question: "Orang Amerika biasanya mengucapkan 'T' dalam 'Water' seperti... ?",
    options: ["T yang tajam","D lembut (Flap T)","Suara diam"],
    answer: "D lembut (Flap T)",
    explanation: "Ini disebut 'Flap T'."
  },
  {
    id: 8,
    question: "Mengatakan 'Sit' daripada 'Thin' adalah:",
    options: ["Hanya aksen","Kesalahan pengucapan"],
    answer: "Kesalahan pengucapan",
    explanation: "Ini adalah kesalahan karena mengubah arti kata tersebut."
  },
  {
    id: 9,
    question: "Apakah memiliki aksen itu buruk ?",
    options: ["Ya, selalu.","Tidak, asalkan kamu jelas.","Ya, kamu harus terdengar seperti orang Amerika."],
    answer: "Tidak, asalkan kamu jelas.",
    explanation: "Aksenmu adalah bagian dari identitasmu. Kejelasan adalah yang terpenting."
  },
  {
    id: 10,
    question: "Dalam Bahasa Inggris Britania Standar, 'R' di akhir 'Car' biasanya...",
    options: ["Diucapkan dengan kuat","Diam / Lembut","Digulung seperti bahasa Spanyol"],
    answer: "Diam / Lembut",
    explanation: "Bahasa Inggris Britania Standar bersifat non-rhotic, artinya mereka menghilangkan R di akhir kata."
  },
  {
    id: 11,
    question: "Orang Amerika biasanya mengucapkan 'T' dalam 'Water' seperti:",
    options: ["T yang tajam","D lembut (Flap T)","Suara diam"],
    answer: "D lembut (Flap T)",
    explanation: "Ini disebut 'Flap T'."
  },
  {
    id: 12,
    question: "Mengatakan 'Sit' daripada 'Thank' adalah...",
    options: ["Hanya aksen","Kesalahan pengucapan"],
    answer: "Kesalahan pengucapan",
    explanation: "Ini adalah kesalahan karena mengubah arti kata tersebut."
  },
  {
    id: 13,
    question: "Apakah memiliki aksen itu buruk?",
    options: ["Ya, selalu.","Tidak, asalkan kamu jelas.","Ya, kamu harus terdengar seperti orang Amerika."],
    answer: "Tidak, asalkan kamu jelas.",
    explanation: "Aksenmu adalah bagian dari identitasmu. Kejelasan adalah yang terpenting."
  },
  {
    id: 14,
    question: "Dalam Bahasa Inggris Britania Standar, 'R' di akhir 'Car' biasanya... ?",
    options: ["Diucapkan dengan kuat","Diam / Lembut","Digulung seperti bahasa Spanyol"],
    answer: "Diam / Lembut",
    explanation: "Bahasa Inggris Britania Standar bersifat non-rhotic, artinya mereka menghilangkan R di akhir kata."
  },
  {
    id: 15,
    question: "Orang Amerika biasanya mengucapkan 'T' dalam 'Water' seperti:",
    options: ["T yang tajam","D lembut (Flap T)","Suara diam"],
    answer: "D lembut (Flap T)",
    explanation: "Ini disebut 'Flap T'."
  },
  {
    id: 16,
    question: "Mengatakan 'Sit' daripada 'Thank' adalah...",
    options: ["Hanya aksen","Kesalahan pengucapan"],
    answer: "Kesalahan pengucapan",
    explanation: "Ini adalah kesalahan karena mengubah arti kata tersebut."
  },
  {
    id: 17,
    question: "Apakah memiliki aksen itu buruk?",
    options: ["Ya, selalu.","Tidak, asalkan kamu jelas.","Ya, kamu harus terdengar seperti orang Amerika."],
    answer: "Tidak, asalkan kamu jelas.",
    explanation: "Aksenmu adalah bagian dari identitasmu. Kejelasan adalah yang terpenting."
  },
  {
    id: 18,
    question: "Dalam Bahasa Inggris Britania Standar, 'R' di akhir 'Car' biasanya...",
    options: ["Diucapkan dengan kuat","Diam / Lembut","Digulung seperti bahasa Spanyol"],
    answer: "Diam / Lembut",
    explanation: "Bahasa Inggris Britania Standar bersifat non-rhotic, artinya mereka menghilangkan R di akhir kata."
  },
  {
    id: 19,
    question: "Orang Amerika biasanya mengucapkan 'T' dalam 'Water' seperti...  ?",
    options: ["T yang tajam","D lembut (Flap T)","Suara diam"],
    answer: "D lembut (Flap T)",
    explanation: "Ini disebut 'Flap T'."
  },
  {
    id: 20,
    question: "Mengatakan 'Sick' daripada 'Thief' adalah... ...",
    options: ["Hanya aksen","Kesalahan pengucapan"],
    answer: "Kesalahan pengucapan",
    explanation: "Ini adalah kesalahan karena mengubah arti kata tersebut."
  }
];

const ElemPronunLesson14: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_pronunciation', 14);
  const nextLessonPath = '/modul/english/elementary/pronunciation/lesson-15';
  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const playSound = (text: string, _accent?: 'US' | 'UK') => { playAudio(text, 0.9); };

  // Quiz Handlers
  const handleCheckQuiz = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);
    if (option === QUIZ_QUESTIONS[quizStep].answer) {
      setQuizScore(prev => prev + 1);
      playSound("Correct!", 'US');
    } else {
      playSound("Incorrect.", 'US');
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
      lessonLabel={"Elementary Pronunciation Lesson 14"}
      accentColor={"#2E86DE"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Kesadaran Aksen"
            subtitle="Pronunciation • Pelajaran 14"
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
                      className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <MicIcon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Kamu Tidak Harus Menjadi "Sempurna"</h2>
                  <p className="text-sky-100 text-sm leading-relaxed">
                    Bahasa Inggris adalah bahasa global. Tidak apa-apa terdengar seperti orang Indonesia, Prancis, atau Jepang!
                    <br /><br />
                    Hal yang paling penting adalah orang <b>memahamimu</b>.
                  </p>
                </div>
              </motion.section>

              <div className="space-y-4">
                {ACCENT_CONCEPTS.map((concept, idx) => (
                  <div key={idx} className={`rounded-2xl border p-5 ${concept.color.replace('text-', 'border-').split(' ')[2] || 'border-[var(--color-border)]'} bg-white flex items-start gap-4 shadow-[var(--shadow-card)]`}>
                    <div className="text-3xl bg-white p-2 rounded-xl shadow-[var(--shadow-card)] border border-slate-50 flex-shrink-0">
                      {concept.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold mb-1 ${concept.color.split(' ')[1]}`}>{concept.title}</h3>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{concept.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

<div className="space-y-6">
              <div className="bg-[var(--color-background)] p-4 rounded-xl text-center border border-[var(--color-border)]">
                <p className="text-sm text-[var(--color-text-secondary)] font-medium">Ketuk bendera untuk mendengar perbedaannya!</p>
              </div>

              {ACCENT_COMPARISONS.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-1 text-center">{item.word}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] text-center mb-6">{item.desc}</p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => playSound(item.word, 'US')}
                      className="flex-1 bg-red-50 border border-red-100 p-3 rounded-xl flex flex-col items-center hover:bg-red-100 transition-colors active:scale-95"
                    >
                      <span className="text-2xl mb-1">🇺🇸</span>
                      <span className="text-xs font-bold text-red-700">American</span>
                      <span className="text-[10px] text-red-500 font-mono mt-1">{item.us_ipa}</span>
                    </button>

                    <button
                      onClick={() => playSound(item.word, 'UK')}
                      className="flex-1 bg-blue-50 border border-blue-100 p-3 rounded-xl flex flex-col items-center hover:bg-blue-100 transition-colors active:scale-95"
                    >
                      <span className="text-2xl mb-1">🇬🇧</span>
                      <span className="text-xs font-bold text-blue-700">British</span>
                      <span className="text-[10px] text-blue-500 font-mono mt-1">{item.uk_ipa}</span>
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
              {ACCENT_COMPARISONS.map((item: any, idx: number) => (
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
                    <span className="text-xs font-bold bg-sky-50 text-sky-600 px-2 py-1 rounded">Skor: {quizScore}</span>
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
                    className="px-8 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-200"
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

export default ElemPronunLesson14;
