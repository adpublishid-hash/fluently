import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, TrendingUp, Star, Sparkles } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

// 30 Words divided into 3 categories
const CREATIVE_VOCAB = [
  { word: "Painting", ipa: "/ˈpeɪntɪŋ/", meaning: "Melukis" },
  { word: "Drawing", ipa: "/ˈdrɔːɪŋ/", meaning: "Menggambar" },
  { word: "Writing", ipa: "/ˈraɪtɪŋ/", meaning: "Menulis" },
  { word: "Reading", ipa: "/ˈriːdɪŋ/", meaning: "Membaca" },
  { word: "Cooking", ipa: "/ˈkʊkɪŋ/", meaning: "Memasak" },
  { word: "Baking", ipa: "/ˈbeɪkɪŋ/", meaning: "Memanggang (kue)" },
  { word: "Knitting", ipa: "/ˈnɪtɪŋ/", meaning: "Merajut" },
  { word: "Sewing", ipa: "/ˈsoʊɪŋ/", meaning: "Menjahit" },
  { word: "Photography", ipa: "/fəˈtɒɡrəfi/", meaning: "Fotografi" },
  { word: "Collecting", ipa: "/kəˈlɛktɪŋ/", meaning: "Mengoleksi (barang)" },
];

const OUTDOOR_ACTIVE_VOCAB = [
  { word: "Hiking", ipa: "/ˈhaɪkɪŋ/", meaning: "Mendaki" },
  { word: "Camping", ipa: "/ˈkæmpɪŋ/", meaning: "Berkemah" },
  { word: "Fishing", ipa: "/ˈfɪʃɪŋ/", meaning: "Memancing" },
  { word: "Gardening", ipa: "/ˈɡɑːrdnɪŋ/", meaning: "Berkebun" },
  { word: "Cycling", ipa: "/ˈsaɪklɪŋ/", meaning: "Bersepeda" },
  { word: "Running", ipa: "/ˈrʌnɪŋ/", meaning: "Berlari" },
  { word: "Swimming", ipa: "/ˈswɪmɪŋ/", meaning: "Berenang" },
  { word: "Yoga", ipa: "/ˈjoʊɡə/", meaning: "Yoga" },
  { word: "Skiing", ipa: "/ˈskiːɪŋ/", meaning: "Bermain ski" },
  { word: "Climbing", ipa: "/ˈklaɪmɪŋ/", meaning: "Memanjat / Panjat tebing" },
];

const ENTERTAINMENT_VOCAB = [
  { word: "Shopping", ipa: "/ˈʃɒpɪŋ/", meaning: "Berbelanja" },
  { word: "Traveling", ipa: "/ˈtrævəlɪŋ/", meaning: "Bepergian / Jalan-jalan" },
  { word: "Dancing", ipa: "/ˈdænsɪŋ/", meaning: "Menari" },
  { word: "Singing", ipa: "/ˈsɪŋɪŋ/", meaning: "Menyanyi" },
  { word: "Gaming", ipa: "/ˈɡeɪmɪŋ/", meaning: "Bermain game" },
  { word: "Blogging", ipa: "/ˈblɒɡɪŋ/", meaning: "Nge-blog / Menulis blog" },
  { word: "Chess", ipa: "/tʃɛs/", meaning: "Catur" },
  { word: "Board games", ipa: "/bɔːrd ɡeɪmz/", meaning: "Permainan papan" },
  { word: "Cards", ipa: "/kɑːrdz/", meaning: "Kartu" },
  { word: "Instrument", ipa: "/ˈɪnstrʊmənt/", meaning: "Alat musik" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "I like making clothes. My hobby is ___.",
    options: ['Hiking', 'Sewing', 'Gaming'],
    answer: 'Sewing',
    explanation: "Sewing (menjahit) melibatkan pembuatan atau perbaikan pakaian."
  },
  {
    id: 2,
    question: "He loves nature and sleeping in a tent. He likes ___.",
    options: ['Shopping', 'Cooking', 'Camping'],
    answer: 'Camping',
    explanation: "Camping (berkemah) melibatkan tinggal di luar ruangan dalam tenda."
  },
  {
    id: 3,
    question: "To stay fit, she goes ___ every morning.",
    options: ['painting', 'running', 'reading'],
    answer: 'running',
    explanation: "Running (berlari) adalah latihan fisik."
  },
  {
    id: 4,
    question: "Which one is a board game?",
    options: ['Chess', 'Yoga', 'Fishing'],
    answer: 'Chess',
    explanation: "Chess (catur) adalah permainan papan strategis."
  },
  {
    id: 5,
    question: "He uses a camera for his hobby. He likes ___.",
    options: ['Singing', 'Photography', 'Gardening'],
    answer: 'Photography',
    explanation: "Photography (fotografi) adalah seni mengambil gambar dengan kamera."
  },
  {
    id: 6,
    question: "I like making clothes. My hobby is ___.",
    options: ["Hiking", "Sewing", "Gaming"],
    answer: "Sewing",
    explanation: "Sewing (menjahit) melibatkan pembuatan atau perbaikan pakaian."
  },
  {
    id: 7,
    question: "My friend loves nature and sleeping in a tent. My friend likes ___.",
    options: ["Cooking", "Camping", "Shopping"],
    answer: "Camping",
    explanation: "Camping (berkemah) melibatkan tinggal di luar ruangan dalam tenda."
  },
  {
    id: 8,
    question: "To stay fit, he goes ___ every morning.",
    options: ["running", "painting", "reading"],
    answer: "running",
    explanation: "Running (berlari) adalah latihan fisik."
  },
  {
    id: 9,
    question: "Which one is a board game?",
    options: ["Chess","Yoga","Fishing"],
    answer: "Chess",
    explanation: "Chess (catur) adalah permainan papan strategis."
  },
  {
    id: 10,
    question: "He uses a camera for her hobby. He likes ___.",
    options: ["Photography", "Singing", "Gardening"],
    answer: "Photography",
    explanation: "Photography (fotografi) adalah seni mengambil gambar dengan kamera."
  },
  {
    id: 11,
    question: "I like making clothes. My hobby is ___.",
    options: ["Hiking", "Sewing", "Gaming"],
    answer: "Sewing",
    explanation: "Sewing (menjahit) melibatkan pembuatan atau perbaikan pakaian."
  },
  {
    id: 12,
    question: "The man loves nature and sleeping in a tent. The man likes ___.",
    options: ["Shopping", "Cooking", "Camping"],
    answer: "Camping",
    explanation: "Camping (berkemah) melibatkan tinggal di luar ruangan dalam tenda."
  },
  {
    id: 13,
    question: "To stay fit, she goes ___ every morning.",
    options: ["painting","running","reading"],
    answer: "running",
    explanation: "Running (berlari) adalah latihan fisik."
  },
  {
    id: 14,
    question: "Which one is a board game?",
    options: ["Chess","Yoga","Fishing"],
    answer: "Chess",
    explanation: "Chess (catur) adalah permainan papan strategis."
  },
  {
    id: 15,
    question: "My brother uses a camera for her hobby. My brother likes ___.",
    options: ["Photography", "Singing", "Gardening"],
    answer: "Photography",
    explanation: "Photography (fotografi) adalah seni mengambil gambar dengan kamera."
  },
  {
    id: 16,
    question: "I like making clothes. My hobby is ___.",
    options: ["Hiking", "Sewing", "Gaming"],
    answer: "Sewing",
    explanation: "Sewing (menjahit) melibatkan pembuatan atau perbaikan pakaian."
  },
  {
    id: 17,
    question: "My friend loves nature and sleeping in a tent. My friend likes ___.",
    options: ["Cooking", "Camping", "Shopping"],
    answer: "Camping",
    explanation: "Camping (berkemah) melibatkan tinggal di luar ruangan dalam tenda."
  },
  {
    id: 18,
    question: "To stay fit, he goes ___ every morning.",
    options: ["running", "painting", "reading"],
    answer: "running",
    explanation: "Running (berlari) adalah latihan fisik."
  },
  {
    id: 19,
    question: "Which one is a board game?",
    options: ["Chess","Yoga","Fishing"],
    answer: "Chess",
    explanation: "Chess (catur) adalah permainan papan strategis."
  },
  {
    id: 20,
    question: "My friend uses a camera for our hobby. My friend likes ___.",
    options: ["Singing", "Photography", "Gardening"],
    answer: "Photography",
    explanation: "Photography (fotografi) adalah seni mengambil gambar dengan kamera."
  }
];

const Lesson11: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_vocabulary', 11);
  const nextLessonPath = '/modul/english/elementary/vocabulary/lesson-12';
  const [vocabSection, setVocabSection] = useState<'creative' | 'outdoor' | 'fun'>('creative');

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

  const renderVocabList = (list: typeof CREATIVE_VOCAB, colorClass: string, icon: any) => (
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
      lessonLabel={"Elementary Vocabulary Lesson 11"}
      accentColor={"#16A085"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Hobi & Waktu Luang"
            subtitle="Vocabulary • Pelajaran 11"
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
                  onClick={() => setVocabSection('creative')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'creative' ? 'bg-violet-100 text-violet-700 ring-2 ring-violet-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Kreatif
                </button>
                <button
                  onClick={() => setVocabSection('outdoor')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'outdoor' ? 'bg-green-100 text-green-700 ring-2 ring-green-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Luar Ruangan
                </button>
                <button
                  onClick={() => setVocabSection('fun')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'fun' ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Hiburan & Game
                </button>
              </div>

              {vocabSection === 'creative' && (
                <>
                  <div className="bg-violet-50 p-4 rounded-2xl mb-4 border border-violet-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-violet-500 shadow-[var(--shadow-card)]"><Sparkles size={20} /></div>
                    <div>
                      <h3 className="font-bold text-violet-900 text-sm">Hobi Kreatif</h3>
                      <p className="text-xs text-violet-700">Aktivitas artistik dan dalam ruangan.</p>
                    </div>
                  </div>
                  {renderVocabList(CREATIVE_VOCAB, 'violet', Sparkles)}
                </>
              )}

              {vocabSection === 'outdoor' && (
                <>
                  <div className="bg-green-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-green-500 shadow-[var(--shadow-card)]"><TrendingUp className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-green-900 text-sm">Luar Ruangan & Aktif</h3>
                      <p className="text-xs text-green-700">Olahraga dan aktivitas alam.</p>
                    </div>
                  </div>
                  {renderVocabList(OUTDOOR_ACTIVE_VOCAB, 'green', TrendingUp)}
                </>
              )}

              {vocabSection === 'fun' && (
                <>
                  <div className="bg-amber-50 p-4 rounded-2xl mb-4 border border-amber-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-amber-500 shadow-[var(--shadow-card)]"><Star className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-amber-900 text-sm">Hiburan</h3>
                      <p className="text-xs text-amber-700">Cara menyenangkan menghabiskan waktu.</p>
                    </div>
                  </div>
                  {renderVocabList(ENTERTAINMENT_VOCAB, 'amber', Star)}
                </>
              )}

<div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb size={20} />
                  <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Play, Go, atau Do?</h2>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Kami menggunakan kata kerja yang berbeda untuk hobi dan olahraga yang berbeda.
                </p>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-2">PLAY</h3>
                    <p className="text-xs text-blue-700 mb-2">Gunakan untuk olahraga tim, permainan bola, dan alat musik.</p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-1">
                      <li>I <b>play</b> football.</li>
                      <li>She <b>plays</b> the guitar.</li>
                      <li>We <b>play</b> chess.</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-green-800 mb-2">GO</h3>
                    <p className="text-xs text-green-700 mb-2">Gunakan untuk aktivitas yang berakhiran <b>-ing</b>.</p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-1">
                      <li>I <b>go</b> swimming.</li>
                      <li>They <b>go</b> hiking.</li>
                      <li>Let's <b>go</b> shopping.</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <h3 className="font-bold text-purple-800 mb-2">DO</h3>
                    <p className="text-xs text-purple-700 mb-2">Gunakan untuk olahraga individu dan bela diri.</p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-1">
                      <li>She <b>does</b> yoga.</li>
                      <li>He <b>does</b> karate.</li>
                      <li>I <b>do</b> a puzzle.</li>
                    </ul>
                  </div>
                </div>
              </div>
        </div>
      ) : (
        <div className="animate-fade-in">
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
                    className="px-8 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-200"
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

export default Lesson11;
