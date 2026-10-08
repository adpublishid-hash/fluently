import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, ClipboardList, TrendingUp, Star, Sparkles } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

// 30 Words divided into 3 categories
const DAILY_ROUTINE_VOCAB = [
  { word: "Wake up", ipa: "/weɪk ʌp/", meaning: "Bangun (membuka mata)" },
  { word: "Get up", ipa: "/ɡɛt ʌp/", meaning: "Bangun (turun dari kasur)" },
  { word: "Turn on", ipa: "/tɜːrn ɒn/", meaning: "Menyalakan" },
  { word: "Turn off", ipa: "/tɜːrn ɒf/", meaning: "Mematikan" },
  { word: "Put on", ipa: "/pʊt ɒn/", meaning: "Memakai (pakaian)" },
  { word: "Take off", ipa: "/teɪk ɒf/", meaning: "Melepas (pakaian)" },
  { word: "Clean up", ipa: "/kliːn ʌp/", meaning: "Membersihkan / Merapikan" },
  { word: "Wash up", ipa: "/wɒʃ ʌp/", meaning: "Mencuci tangan/wajah" },
  { word: "Lie down", ipa: "/laɪ daʊn/", meaning: "Berbaring" },
  { word: "Stand up", ipa: "/stænd ʌp/", meaning: "Berdiri" },
];

const TRAVEL_MOVEMENT_VOCAB = [
  { word: "Get in", ipa: "/ɡɛt ɪn/", meaning: "Masuk (mobil/taksi)" },
  { word: "Get out", ipa: "/ɡɛt aʊt/", meaning: "Keluar (mobil/taksi)" },
  { word: "Get on", ipa: "/ɡɛt ɒn/", meaning: "Naik (bus/kereta/pesawat)" },
  { word: "Get off", ipa: "/ɡɛt ɒf/", meaning: "Turun (bus/kereta/pesawat)" },
  { word: "Go back", ipa: "/ɡoʊ bæk/", meaning: "Kembali (pergi)" },
  { word: "Come back", ipa: "/kʌm bæk/", meaning: "Kembali (datang)" },
  { word: "Go away", ipa: "/ɡoʊ əˈweɪ/", meaning: "Pergi menjauh" },
  { word: "Hurry up", ipa: "/ˈhʌri ʌp/", meaning: "Cepat / Buruan" },
  { word: "Slow down", ipa: "/sloʊ daʊn/", meaning: "Pelan-pelan" },
  { word: "Walk away", ipa: "/wɔːk əˈweɪ/", meaning: "Berjalan pergi" },
];

const ESSENTIAL_ACTIONS_VOCAB = [
  { word: "Look for", ipa: "/lʊk fɔːr/", meaning: "Mencari" },
  { word: "Look at", ipa: "/lʊk æt/", meaning: "Melihat" },
  { word: "Pick up", ipa: "/pɪk ʌp/", meaning: "Mengambil / Menjemput" },
  { word: "Put down", ipa: "/pʊt daʊn/", meaning: "Meletakkan" },
  { word: "Fill in", ipa: "/fɪl ɪn/", meaning: "Mengisi (formulir)" },
  { word: "Write down", ipa: "/raɪt daʊn/", meaning: "Mencatat" },
  { word: "Find out", ipa: "/faɪnd aʊt/", meaning: "Mengetahui / Menemukan info" },
  { word: "Try on", ipa: "/traɪ ɒn/", meaning: "Mencoba (pakaian)" },
  { word: "Give back", ipa: "/ɡɪv bæk/", meaning: "Mengembalikan" },
  { word: "Throw away", ipa: "/θroʊ əˈweɪ/", meaning: "Membuang" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "It is dark in here. Please ___ the light.",
    options: ['get on', 'turn on', 'turn off'],
    answer: 'turn on',
    explanation: "Turn on (menyalakan) berarti mengaktifkan lampu atau mesin."
  },
  {
    id: 2,
    question: "You need to ___ your shoes before entering the mosque.",
    options: ['get off', 'put on', 'take off'],
    answer: 'take off',
    explanation: "Take off (melepas) berarti melepaskan pakaian atau sepatu."
  },
  {
    id: 3,
    question: "The bus is here! Let's ___.",
    options: ['get in', 'get on', 'get up'],
    answer: 'get on',
    explanation: "Kami menggunakan 'get on' untuk transportasi umum seperti bus dan kereta."
  },
  {
    id: 4,
    question: "I lost my keys. Can you help me ___ them?",
    options: ['look after', 'look for', 'look at'],
    answer: 'look for',
    explanation: "Look for (mencari) berarti berusaha menemukan sesuatu."
  },
  {
    id: 5,
    question: "This shirt looks nice. I want to ___ it ___.",
    options: ['try / on', 'fill / in', 'put / away'],
    answer: 'try / on',
    explanation: "Try on (mencoba) berarti mengenakan pakaian untuk memeriksa apakah pas."
  },
  {
    id: 6,
    question: "It is dark in here. Please ___ the light.",
    options: ["get on", "turn on", "turn off"],
    answer: "turn on",
    explanation: "Turn on (menyalakan) berarti mengaktifkan lampu atau mesin."
  },
  {
    id: 7,
    question: "You need to ___ your shoes before entering the mosque.",
    options: ["get off", "put on", "take off"],
    answer: "take off",
    explanation: "Take off (melepas) berarti melepaskan pakaian atau sepatu."
  },
  {
    id: 8,
    question: "The bus is here! Let's ___.",
    options: ["get in","get on","get up"],
    answer: "get on",
    explanation: "Kami menggunakan 'get on' untuk transportasi umum seperti bus dan kereta."
  },
  {
    id: 9,
    question: "I lost my keys. Can you help me ___ them?",
    options: ["look after", "look for", "look at"],
    answer: "look for",
    explanation: "Look for (mencari) berarti berusaha menemukan sesuatu."
  },
  {
    id: 10,
    question: "This shirt looks nice. I want to ___ it ___.",
    options: ["try / on", "fill / in", "put / away"],
    answer: "try / on",
    explanation: "Try on (mencoba) berarti mengenakan pakaian untuk memeriksa apakah pas."
  },
  {
    id: 11,
    question: "It is dark in here. Please ___ the light.",
    options: ["get on", "turn on", "turn off"],
    answer: "turn on",
    explanation: "Turn on (menyalakan) berarti mengaktifkan lampu atau mesin."
  },
  {
    id: 12,
    question: "You need to ___ your shoes before entering the mosque.",
    options: ["get off", "put on", "take off"],
    answer: "take off",
    explanation: "Take off (melepas) berarti melepaskan pakaian atau sepatu."
  },
  {
    id: 13,
    question: "The bus is here! Let's ___.",
    options: ["get in","get on","get up"],
    answer: "get on",
    explanation: "Kami menggunakan 'get on' untuk transportasi umum seperti bus dan kereta."
  },
  {
    id: 14,
    question: "I lost my keys. Can you help me ___ them?",
    options: ["look after", "look for", "look at"],
    answer: "look for",
    explanation: "Look for (mencari) berarti berusaha menemukan sesuatu."
  },
  {
    id: 15,
    question: "This shirt looks nice. I want to ___ it ___.",
    options: ["try / on", "fill / in", "put / away"],
    answer: "try / on",
    explanation: "Try on (mencoba) berarti mengenakan pakaian untuk memeriksa apakah pas."
  },
  {
    id: 16,
    question: "It is dark in here. Please ___ the light.",
    options: ["get on", "turn on", "turn off"],
    answer: "turn on",
    explanation: "Turn on (menyalakan) berarti mengaktifkan lampu atau mesin."
  },
  {
    id: 17,
    question: "You need to ___ your shoes before entering the mosque.",
    options: ["get off", "put on", "take off"],
    answer: "take off",
    explanation: "Take off (melepas) berarti melepaskan pakaian atau sepatu."
  },
  {
    id: 18,
    question: "The bus is here! Let's ___.",
    options: ["get in","get on","get up"],
    answer: "get on",
    explanation: "Kami menggunakan 'get on' untuk transportasi umum seperti bus dan kereta."
  },
  {
    id: 19,
    question: "I lost my keys. Can you help me ___ them?",
    options: ["look after", "look for", "look at"],
    answer: "look for",
    explanation: "Look for (mencari) berarti berusaha menemukan sesuatu."
  },
  {
    id: 20,
    question: "This shirt looks nice. I want to ___ it ___.",
    options: ["try / on", "fill / in", "put / away"],
    answer: "try / on",
    explanation: "Try on (mencoba) berarti mengenakan pakaian untuk memeriksa apakah pas."
  }
];

const Lesson14: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_vocabulary', 14);
  const nextLessonPath = '/modul/english/elementary/vocabulary/lesson-15';
  const [vocabSection, setVocabSection] = useState<'daily' | 'travel' | 'essential'>('daily');

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string) => { playAudio(text, 0.9); };

  // Quiz Logic
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

  const renderVocabList = (list: typeof DAILY_ROUTINE_VOCAB, colorClass: string, icon: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in">
      {list.map((item, idx) => (
        <button
          key={idx}
          onClick={() => playSound(item.word)}
          className={`bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-card)] flex items-center justify-between group hover:border-${colorClass}-300 hover:shadow-md transition-all active:scale-95 text-left`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full bg-${colorClass}-50 text-${colorClass}-500 flex items-center justify-center flex-shrink-0 font-bold text-sm`}>
              {idx + 1}
            </div>
            <div>
              <p className="font-bold text-[var(--color-text-primary)]">{item.word}</p>
              <p className="text-xs text-[var(--color-text-muted)] font-mono mb-1">{item.ipa}</p>
              <p className="text-xs text-[var(--color-text-muted)] italic">{item.meaning}</p>
            </div>
          </div>
          <Volume2 className={`w-5 h-5 text-slate-300 group-hover:text-${colorClass}-500`} />
        </button>
      ))}
    </div>
  );

  return (
        <>
          <LessonCompleteModal
      show={showCompleteModal}
      onClose={() => setShowCompleteModal(false)}
      lessonLabel={"Elementary Vocabulary Lesson 14"}
      accentColor={"#16A085"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Frasa Kerja Umum"
            subtitle="Vocabulary • Pelajaran 14"
            accentColor="#2980B9"
            nextLesson={nextLessonPath}
            tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}
            footer={() => (
                <button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #2980B9, #2980B9cc)' }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
                </button>
            )}
        >
            {(tabId) => tabId === 'learn' ? (
        <div className="space-y-8 animate-fade-in">
{/* Category Switcher */}
              <div className="flex justify-center gap-2 mb-6">
                <button
                  onClick={() => setVocabSection('daily')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'daily' ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Sehari-hari
                </button>
                <button
                  onClick={() => setVocabSection('travel')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'travel' ? 'bg-teal-100 text-[var(--color-primary)] ring-2 ring-teal-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Perjalanan
                </button>
                <button
                  onClick={() => setVocabSection('essential')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'essential' ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Penting
                </button>
              </div>

              {vocabSection === 'daily' && (
                <>
                  <div className="bg-blue-50 p-4 rounded-2xl mb-4 border border-blue-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-blue-500 shadow-[var(--shadow-card)]"><TrendingUp className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-blue-900 text-sm">Rutinitas Harian</h3>
                      <p className="text-xs text-blue-700">Kata kerja yang kita gunakan setiap hari.</p>
                    </div>
                  </div>
                  {renderVocabList(DAILY_ROUTINE_VOCAB, 'blue', TrendingUp)}
                </>
              )}

              {vocabSection === 'travel' && (
                <>
                  <div className="bg-gray-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-[var(--color-primary)] shadow-[var(--shadow-card)]"><Sparkles size={20} /></div>
                    <div>
                      <h3 className="font-bold text-teal-900 text-sm">Gerakan & Perjalanan</h3>
                      <p className="text-xs text-[var(--color-primary)]">Berkeliling ke berbagai tempat.</p>
                    </div>
                  </div>
                  {renderVocabList(TRAVEL_MOVEMENT_VOCAB, 'teal', Sparkles)}
                </>
              )}

              {vocabSection === 'essential' && (
                <>
                  <div className="bg-indigo-50 p-4 rounded-2xl mb-4 border border-indigo-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-indigo-500 shadow-[var(--shadow-card)]"><ClipboardList className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-indigo-900 text-sm">Aksi Penting</h3>
                      <p className="text-xs text-indigo-700">Frasa penting untuk diketahui.</p>
                    </div>
                  </div>
                  {renderVocabList(ESSENTIAL_ACTIONS_VOCAB, 'indigo', ClipboardList)}
                </>
              )}

<div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb size={20} />
                  <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Apa itu Frasa Kerja?</h2>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Phrasal verb adalah <b>Kata Kerja + Preposisi</b>. Artinya sering kali berbeda dari kata kerja itu sendiri.<br />
                  <i>Contoh:</i> <b>Look</b> (melihat) vs <b>Look for</b> (mencari).
                </p>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-2">Separable (Bisa Dipisah)</h3>
                    <p className="text-xs text-blue-700 mb-2">Kamu bisa meletakkan objek di tengah.</p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-1">
                      <li>"<b>Turn on</b> the light." (Boleh)</li>
                      <li>"<b>Turn</b> the light <b>on</b>." (Boleh)</li>
                      <li>"<b>Turn</b> it <b>on</b>." (Boleh - dengan kata ganti)</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                    <h3 className="font-bold text-red-800 mb-2">Inseparable (Tidak Bisa Dipisah)</h3>
                    <p className="text-xs text-red-700 mb-2">Bagian-bagiannya harus tetap bersama.</p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-1">
                      <li>"<b>Get on</b> the bus." (Benar)</li>
                      <li>"Get the bus on." (Salah)</li>
                    </ul>
                  </div>
                </div>
              </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-blue-300 hover:bg-[var(--color-background)]";
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
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500">
                    <Star className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Kuis Selesai!</h2>
                  <p className="text-[var(--color-text-muted)] mb-6">Kamu mendapatkan skor {quizScore} dari {QUIZ_QUESTIONS.length}</p>
                  <button
                    onClick={restartQuiz}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
            </div>
        </div>
      )}
    </LessonShell>
    </>
  );
};

export default Lesson14;
