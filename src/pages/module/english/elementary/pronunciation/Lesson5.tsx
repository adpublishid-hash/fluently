import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Star, Lightbulb, PlayCircle } from 'lucide-react';
import { StarIcon, FlameIcon, MicIcon, TrendUpIcon, TrophyIcon, RefreshIcon } from '../../../../../components/Icons';

type WeakWordGroup = {
  category: string;
  color: string;
  icon: string;
  items: {
    word: string;
    strong: string;
    weak: string;
    phrase: string;
    phoneticPhrase: string;
  }[];
};

const WEAK_WORDS_DATA: WeakWordGroup[] = [
  {
    category: "Preposisi",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    icon: "📍",
    items: [
      { word: "To", strong: "/tuː/", weak: "/tə/", phrase: "Go to work", phoneticPhrase: "Go-ta-work" },
      { word: "For", strong: "/fɔːr/", weak: "/fər/", phrase: "Just for you", phoneticPhrase: "Just-fer-you" },
      { word: "At", strong: "/æt/", weak: "/ət/", phrase: "Look at that", phoneticPhrase: "Look-at-that" },
      { word: "From", strong: "/frɒm/", weak: "/frəm/", phrase: "From London", phoneticPhrase: "Frum-London" }
    ]
  },
  {
    category: "Kata Kerja (Bantu)",
    color: "bg-rose-50 text-rose-700 border-rose-200",
    icon: "🔧",
    items: [
      { word: "Can", strong: "/kæn/", weak: "/kən/", phrase: "I can swim", phoneticPhrase: "I-kn-swim" },
      { word: "Was", strong: "/wɒz/", weak: "/wəz/", phrase: "He was late", phoneticPhrase: "He-wuz-late" },
      { word: "Do", strong: "/duː/", weak: "/də/", phrase: "What do you want?", phoneticPhrase: "What-da-you..." },
      { word: "Are", strong: "/ɑːr/", weak: "/ər/", phrase: "These are good", phoneticPhrase: "These-er-good" }
    ]
  },
  {
    category: "Penghubung",
    color: "bg-emerald-50 text-emerald-700 border-blue-200",
    icon: "🔗",
    items: [
      { word: "And", strong: "/ænd/", weak: "/ən/ or /n/", phrase: "Fish and chips", phoneticPhrase: "Fish-n-chips" },
      { word: "But", strong: "/bʌt/", weak: "/bət/", phrase: "Nice but expensive", phoneticPhrase: "Nice-bt-expensive" },
      { word: "Than", strong: "/ðæn/", weak: "/ðən/", phrase: "Better than that", phoneticPhrase: "Better-thn-that" }
    ]
  }
];

const PRACTICE_SENTENCES = [
  { id: 1, text: "I can go to the store.", weakWords: ["can", "to", "the"], focus: "can (/kən/), to (/tə/)" },
  { id: 2, text: "Bread and butter.", weakWords: ["and"], focus: "and (/ən/)" },
  { id: 3, text: "It was good for me.", weakWords: ["was", "for"], focus: "was (/wəz/), for (/fər/)" },
  { id: 4, text: "Wait for us at the door.", weakWords: ["for", "at", "the"], focus: "for (/fər/), at (/ət/)" }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Kapan kata 'CAN' biasanya kuat (/kæn/)?",
    options: ['Dalam kalimat biasa', 'Di akhir kalimat ("Yes, I can")', 'Tidak pernah'],
    answer: 'Di akhir kalimat ("Yes, I can")',
    explanation: "Kata fungsi kuat ketika berada di akhir kalimat atau ditekankan."
  },
  {
    id: 2,
    question: "Bagaimana penutur asli biasanya mengucapkan 'FOR' dalam 'Thanks for coming'?",
    options: ['/fɔːr/ (Four)', '/fər/ (Fur)'],
    answer: '/fər/ (Fur)',
    explanation: "Ia direduksi menjadi bentuk lemah /fər/."
  },
  {
    id: 3,
    question: "Suara mana yang mewakili vokal lemah (Schwa)?",
    options: ['/ə/', '/e/', '/i/'],
    answer: '/ə/',
    explanation: "Schwa /ə/ adalah suara paling umum dalam bahasa Inggris, digunakan dalam bentuk lemah."
  },
  {
    id: 4,
    question: "Dengarkan: 'Rock n Roll'. Apa yang terjadi pada 'AND'?",
    options: ['Menjadi Kuat', 'Menjadi Lemah (/n/)'],
    answer: 'Menjadi Lemah (/n/)',
    explanation: "'And' sering kehilangan suara 'd' dan 'a', menjadi hanya 'n'."
  },
  {
    id: 5,
    question: "Kapan kata 'CAN' biasanya kuat (/kæn/)?",
    options: ["Dalam kalimat biasa","Di akhir kalimat (\"Yes, I can\")","Tidak pernah"],
    answer: "Di akhir kalimat (\"Yes, I can\")",
    explanation: "Kata fungsi kuat ketika berada di akhir kalimat atau ditekankan."
  },
  {
    id: 6,
    question: "Bagaimana penutur asli biasanya mengucapkan 'FOR' dalam 'Thanks for coming' ?",
    options: ["/fɔːr/ (Four)","/fər/ (Fur)"],
    answer: "/fər/ (Fur)",
    explanation: "Ia direduksi menjadi bentuk lemah /fər/."
  },
  {
    id: 7,
    question: "Suara mana yang mewakili vokal lemah (Schwa)?",
    options: ["/ə/","/e/","/i/"],
    answer: "/ə/",
    explanation: "Schwa /ə/ adalah suara paling umum dalam bahasa Inggris, digunakan dalam bentuk lemah."
  },
  {
    id: 8,
    question: "Perhatikan: 'Rock n Roll'. Apa yang terjadi pada 'AND'?",
    options: ["Menjadi Kuat","Menjadi Lemah (/n/)"],
    answer: "Menjadi Lemah (/n/)",
    explanation: "'And' sering kehilangan suara 'd' dan 'a', menjadi hanya 'n'."
  },
  {
    id: 9,
    question: "Kapan kata 'CAN' biasanya kuat (/kæn/) ?",
    options: ["Dalam kalimat biasa","Di akhir kalimat (\"Yes, I can\")","Tidak pernah"],
    answer: "Di akhir kalimat (\"Yes, I can\")",
    explanation: "Kata fungsi kuat ketika berada di akhir kalimat atau ditekankan."
  },
  {
    id: 10,
    question: "Bagaimana penutur asli biasanya mengucapkan 'FOR' dalam 'Thanks for coming'...",
    options: ["/fɔːr/ (Four)","/fər/ (Fur)"],
    answer: "/fər/ (Fur)",
    explanation: "Ia direduksi menjadi bentuk lemah /fər/."
  },
  {
    id: 11,
    question: "Suara mana yang mewakili vokal lemah (Schwa)?",
    options: ["/ə/","/e/","/i/"],
    answer: "/ə/",
    explanation: "Schwa /ə/ adalah suara paling umum dalam bahasa Inggris, digunakan dalam bentuk lemah."
  },
  {
    id: 12,
    question: "Dengarkan: 'Rock n Roll'. Apa yang terjadi pada 'AND'?",
    options: ["Menjadi Kuat","Menjadi Lemah (/n/)"],
    answer: "Menjadi Lemah (/n/)",
    explanation: "'And' sering kehilangan suara 'd' dan 'a', menjadi hanya 'n'."
  },
  {
    id: 13,
    question: "Kapan kata 'CAN' biasanya kuat (/kæn/)?",
    options: ["Dalam kalimat biasa","Di akhir kalimat (\"Yes, I can\")","Tidak pernah"],
    answer: "Di akhir kalimat (\"Yes, I can\")",
    explanation: "Kata fungsi kuat ketika berada di akhir kalimat atau ditekankan."
  },
  {
    id: 14,
    question: "Bagaimana penutur asli biasanya mengucapkan 'FOR' dalam 'Thanks for coming'...",
    options: ["/fɔːr/ (Four)","/fər/ (Fur)"],
    answer: "/fər/ (Fur)",
    explanation: "Ia direduksi menjadi bentuk lemah /fər/."
  },
  {
    id: 15,
    question: "Suara mana yang mewakili vokal lemah (Schwa)...",
    options: ["/ə/","/e/","/i/"],
    answer: "/ə/",
    explanation: "Schwa /ə/ adalah suara paling umum dalam bahasa Inggris, digunakan dalam bentuk lemah."
  },
  {
    id: 16,
    question: "Fokus pada: 'Rock n Roll'. Apa yang terjadi pada 'AND'?",
    options: ["Menjadi Kuat","Menjadi Lemah (/n/)"],
    answer: "Menjadi Lemah (/n/)",
    explanation: "'And' sering kehilangan suara 'd' dan 'a', menjadi hanya 'n'."
  },
  {
    id: 17,
    question: "Kapan kata 'CAN' biasanya kuat (/kæn/)...",
    options: ["Dalam kalimat biasa","Di akhir kalimat (\"Yes, I can\")","Tidak pernah"],
    answer: "Di akhir kalimat (\"Yes, I can\")",
    explanation: "Kata fungsi kuat ketika berada di akhir kalimat atau ditekankan."
  },
  {
    id: 18,
    question: "Bagaimana penutur asli biasanya mengucapkan 'FOR' dalam 'Thanks for coming'?",
    options: ["/fɔːr/ (Four)","/fər/ (Fur)"],
    answer: "/fər/ (Fur)",
    explanation: "Ia direduksi menjadi bentuk lemah /fər/."
  },
  {
    id: 19,
    question: "Suara mana yang mewakili vokal lemah (Schwa) ?",
    options: ["/ə/","/e/","/i/"],
    answer: "/ə/",
    explanation: "Schwa /ə/ adalah suara paling umum dalam bahasa Inggris, digunakan dalam bentuk lemah."
  },
  {
    id: 20,
    question: "Dengarkan: 'Rock n Roll'. Apa yang terjadi pada 'AND'?",
    options: ["Menjadi Kuat","Menjadi Lemah (/n/)"],
    answer: "Menjadi Lemah (/n/)",
    explanation: "'And' sering kehilangan suara 'd' dan 'a', menjadi hanya 'n'."
  }
];

const ElemPronunLesson5: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_pronunciation', 5);
  const nextLessonPath = '/modul/english/elementary/pronunciation/lesson-6';
  // Practice State
  const [practiceIndex, setPracticeIndex] = useState(0);

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
      lessonLabel={"Elementary Pronunciation Lesson 5"}
      accentColor={"#2E86DE"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Bentuk Lemah"
            subtitle="Pronunciation • Pelajaran 5"
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
                  <FlameIcon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Rahasia Kelancaran</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Untuk terdengar alami, kamu harus "mengecilkan" kata tata bahasa kecil (seperti <b>to, for, at, dan and</b>).
                    Vokal menjadi suara "uh" kecil yang disebut <b>Schwa /ə/</b>.
                  </p>
                </div>
              </motion.section>

              <div className="space-y-6">
                {WEAK_WORDS_DATA.map((group, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${group.color.replace('text-', 'border-').split(' ')[2]} relative overflow-hidden`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl bg-white p-2 rounded-xl shadow-[var(--shadow-card)]">{group.icon}</span>
                      <h3 className={`text-lg font-bold ${group.color.split(' ')[1]}`}>{group.category}</h3>
                    </div>

                    <div className="grid gap-3">
                      {group.items.map((item, i) => (
                        <div key={i} className="bg-[var(--color-background)] rounded-xl p-3 border border-[var(--color-border)]">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-black text-xl text-[var(--color-text-primary)]">{item.word.toUpperCase()}</span>
                            <div className="text-right">
                              <span className="text-[10px] text-[var(--color-text-muted)] mr-2 line-through">{item.strong}</span>
                              <span className="text-sm font-bold text-[var(--color-primary)] bg-gray-50 px-2 py-0.5 rounded">{item.weak}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => playSound(item.phrase)}
                            className="w-full flex justify-between items-center bg-white p-2 rounded-lg border border-[var(--color-border)] hover:border-indigo-300 transition-all group"
                          >
                            <div className="text-left">
                              <p className="text-sm font-medium text-[var(--color-text-primary)]">"{item.phrase}"</p>
                              <p className="text-xs text-[var(--color-text-muted)] font-mono">Terdengar seperti: {item.phoneticPhrase}</p>
                            </div>
                            <Volume2 size={16} />
                          </button>
                        </div>
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

export default ElemPronunLesson5;
