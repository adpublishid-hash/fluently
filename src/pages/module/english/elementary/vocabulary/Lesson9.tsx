import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, TrendingUp, Flame, Star, Sparkles } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

// 30 Words divided into 3 categories
const WEATHER_VOCAB = [
  { word: "Sunny", ipa: "/ˈsʌni/", meaning: "Cerah" },
  { word: "Rainy", ipa: "/ˈreɪni/", meaning: "Hujan" },
  { word: "Cloudy", ipa: "/ˈklaʊdi/", meaning: "Berawan / Mendung" },
  { word: "Snowy", ipa: "/ˈsnoʊi/", meaning: "Bersalju" },
  { word: "Windy", ipa: "/ˈwɪndi/", meaning: "Berangin" },
  { word: "Stormy", ipa: "/ˈstɔːrmi/", meaning: "Badai" },
  { word: "Foggy", ipa: "/ˈfɒɡi/", meaning: "Berkabut" },
  { word: "Thunder", ipa: "/ˈθʌndər/", meaning: "Guntur / Petir (Suara)" },
  { word: "Lightning", ipa: "/ˈlaɪtnɪŋ/", meaning: "Kilat (Cahaya)" },
  { word: "Rainbow", ipa: "/ˈreɪnboʊ/", meaning: "Pelangi" },
];

const NATURE_VOCAB = [
  { word: "Mountain", ipa: "/ˈmaʊntɪn/", meaning: "Gunung" },
  { word: "River", ipa: "/ˈrɪvər/", meaning: "Sungai" },
  { word: "Lake", ipa: "/leɪk/", meaning: "Danau" },
  { word: "Ocean", ipa: "/ˈoʊʃən/", meaning: "Samudra / Laut" },
  { word: "Forest", ipa: "/ˈfɒrɪst/", meaning: "Hutan" },
  { word: "Beach", ipa: "/biːtʃ/", meaning: "Pantai" },
  { word: "Island", ipa: "/ˈaɪlənd/", meaning: "Pulau" },
  { word: "Desert", ipa: "/ˈdɛzərt/", meaning: "Gurun" },
  { word: "Valley", ipa: "/ˈvæli/", meaning: "Lembah" },
  { word: "Hill", ipa: "/hɪl/", meaning: "Bukit" },
];

const SEASON_TEMP_VOCAB = [
  { word: "Hot", ipa: "/hɒt/", meaning: "Panas" },
  { word: "Cold", ipa: "/koʊld/", meaning: "Dingin" },
  { word: "Warm", ipa: "/wɔːrm/", meaning: "Hangat" },
  { word: "Cool", ipa: "/kuːl/", meaning: "Sejuk" },
  { word: "Freezing", ipa: "/ˈfriːzɪŋ/", meaning: "Sangat dingin / Membeku" },
  { word: "Spring", ipa: "/sprɪŋ/", meaning: "Musim Semi" },
  { word: "Summer", ipa: "/ˈsʌmər/", meaning: "Musim Panas" },
  { word: "Autumn", ipa: "/ˈɔːtəm/", meaning: "Musim Gugur" },
  { word: "Winter", ipa: "/ˈwɪntər/", meaning: "Musim Dingin" },
  { word: "Degrees", ipa: "/dɪˈɡriːz/", meaning: "Derajat (Suhu)" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "You hear a loud boom during a storm. It is ___.",
    options: ['Lightning', 'Thunder', 'Fog'],
    answer: 'Thunder',
    explanation: "Thunder (guntur) adalah suara yang disebabkan oleh kilat."
  },
  {
    id: 2,
    question: "It is very ___ in the desert. There is no water.",
    options: ['wet', 'cold', 'hot'],
    answer: 'hot',
    explanation: "Gurun biasanya adalah tempat yang hot (panas) dan kering."
  },
  {
    id: 3,
    question: "Water that flows to the sea is a ___.",
    options: ['Lake', 'River', 'Pond'],
    answer: 'River',
    explanation: "River (sungai) adalah aliran air alami yang besar yang mengalir ke laut."
  },
  {
    id: 4,
    question: "A: What is the weather ___? B: It is sunny.",
    options: ['like', 'look', 'do'],
    answer: 'like',
    explanation: "Format pertanyaan yang benar adalah 'What is the weather like?'."
  },
  {
    id: 5,
    question: "In Winter, it is usually ___.",
    options: ['hot', 'warm', 'cold'],
    answer: 'cold',
    explanation: "Winter (musim dingin) adalah musim terdingin dalam setahun."
  },
  {
    id: 6,
    question: "You hear a loud boom during a storm. It is ___.",
    options: ["Lightning","Thunder","Fog"],
    answer: "Thunder",
    explanation: "Thunder (guntur) adalah suara yang disebabkan oleh kilat."
  },
  {
    id: 7,
    question: "It is very ___ in the desert. There is no water.",
    options: ["wet","cold","hot"],
    answer: "hot",
    explanation: "Gurun biasanya adalah tempat yang hot (panas) dan kering."
  },
  {
    id: 8,
    question: "Water that flows to the sea is a ___.",
    options: ["Lake","River","Pond"],
    answer: "River",
    explanation: "River (sungai) adalah aliran air alami yang besar yang mengalir ke laut."
  },
  {
    id: 9,
    question: "A: What is the weather ___? B: It is sunny.",
    options: ["like","look","do"],
    answer: "like",
    explanation: "Format pertanyaan yang benar adalah 'What is the weather like?'."
  },
  {
    id: 10,
    question: "In Winter, it is usually ___.",
    options: ["hot","warm","cold"],
    answer: "cold",
    explanation: "Winter (musim dingin) adalah musim terdingin dalam setahun."
  },
  {
    id: 11,
    question: "You hear a loud boom during a storm. It is ___.",
    options: ["Lightning","Thunder","Fog"],
    answer: "Thunder",
    explanation: "Thunder (guntur) adalah suara yang disebabkan oleh kilat."
  },
  {
    id: 12,
    question: "It is very ___ in the desert. There is no water.",
    options: ["wet","cold","hot"],
    answer: "hot",
    explanation: "Gurun biasanya adalah tempat yang hot (panas) dan kering."
  },
  {
    id: 13,
    question: "Water that flows to the sea is a ___.",
    options: ["Lake","River","Pond"],
    answer: "River",
    explanation: "River (sungai) adalah aliran air alami yang besar yang mengalir ke laut."
  },
  {
    id: 14,
    question: "A: What is the weather ___? B: It is sunny.",
    options: ["like","look","do"],
    answer: "like",
    explanation: "Format pertanyaan yang benar adalah 'What is the weather like?'."
  },
  {
    id: 15,
    question: "In Winter, it is usually ___.",
    options: ["hot","warm","cold"],
    answer: "cold",
    explanation: "Winter (musim dingin) adalah musim terdingin dalam setahun."
  },
  {
    id: 16,
    question: "You hear a loud boom during a storm. It is ___.",
    options: ["Lightning","Thunder","Fog"],
    answer: "Thunder",
    explanation: "Thunder (guntur) adalah suara yang disebabkan oleh kilat."
  },
  {
    id: 17,
    question: "It is very ___ in the desert. There is no water.",
    options: ["wet","cold","hot"],
    answer: "hot",
    explanation: "Gurun biasanya adalah tempat yang hot (panas) dan kering."
  },
  {
    id: 18,
    question: "Water that flows to the sea is a ___.",
    options: ["Lake","River","Pond"],
    answer: "River",
    explanation: "River (sungai) adalah aliran air alami yang besar yang mengalir ke laut."
  },
  {
    id: 19,
    question: "A: What is the weather ___? B: It is sunny.",
    options: ["like","look","do"],
    answer: "like",
    explanation: "Format pertanyaan yang benar adalah 'What is the weather like?'."
  },
  {
    id: 20,
    question: "In Winter, it is usually ___.",
    options: ["hot","warm","cold"],
    answer: "cold",
    explanation: "Winter (musim dingin) adalah musim terdingin dalam setahun."
  }
];

const Lesson9: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_vocabulary', 9);
  const nextLessonPath = '/modul/english/elementary/vocabulary/lesson-10';
  const [vocabSection, setVocabSection] = useState<'weather' | 'nature' | 'seasons'>('weather');

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

  const renderVocabList = (list: typeof WEATHER_VOCAB, colorClass: string, icon: any) => (
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
      lessonLabel={"Elementary Vocabulary Lesson 9"}
      accentColor={"#16A085"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Cuaca & Alam"
            subtitle="Vocabulary • Pelajaran 9"
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
                  onClick={() => setVocabSection('weather')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'weather' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Cuaca
                </button>
                <button
                  onClick={() => setVocabSection('nature')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'nature' ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Alam
                </button>
                <button
                  onClick={() => setVocabSection('seasons')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'seasons' ? 'bg-orange-100 text-orange-700 ring-2 ring-orange-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Musim
                </button>
              </div>

              {vocabSection === 'weather' && (
                <>
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]"><TrendingUp className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Kondisi Cuaca</h3>
                      <p className="text-xs text-sky-700">Prakiraan harian dan atmosfer.</p>
                    </div>
                  </div>
                  {renderVocabList(WEATHER_VOCAB, 'sky', TrendingUp)}
                </>
              )}

              {vocabSection === 'nature' && (
                <>
                  <div className="bg-emerald-50 p-4 rounded-2xl mb-4 border border-blue-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-emerald-500 shadow-[var(--shadow-card)]"><Sparkles size={20} /></div>
                    <div>
                      <h3 className="font-bold text-emerald-900 text-sm">Alam & Lanskap</h3>
                      <p className="text-xs text-emerald-700">Dunia di sekitar kita.</p>
                    </div>
                  </div>
                  {renderVocabList(NATURE_VOCAB, 'emerald', Sparkles)}
                </>
              )}

              {vocabSection === 'seasons' && (
                <>
                  <div className="bg-orange-50 p-4 rounded-2xl mb-4 border border-orange-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-orange-500 shadow-[var(--shadow-card)]"><Flame className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-orange-900 text-sm">Musim & Suhu</h3>
                      <p className="text-xs text-orange-700">Panas, dingin, dan waktu dalam setahun.</p>
                    </div>
                  </div>
                  {renderVocabList(SEASON_TEMP_VOCAB, 'orange', Flame)}
                </>
              )}

<div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb size={20} />
                  <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Bicara Tentang Cuaca</h2>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Kita menggunakan <b>It is</b> (atau It's) untuk menggambarkan cuaca.
                </p>

                <div className="space-y-4">
                  <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-sky-800 mb-2">Menggambarkan Saat Ini</h3>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-2">
                      <li>It is <b>sunny</b> today.</li>
                      <li>It is <b>raining</b> now. (Action)</li>
                      <li>It is very <b>hot</b> outside.</li>
                    </ul>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <h3 className="font-bold text-indigo-800 mb-2">Mengajukan Pertanyaan</h3>
                    <p className="text-xs text-indigo-700 mb-2">Cara bertanya tentang cuaca:</p>
                    <ul className="space-y-2 text-sm text-[var(--color-text-primary)]">
                      <li>"What is the weather <b>like</b>?"</li>
                      <li>"Is it raining?"</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-5 border border-blue-100">
                <h3 className="font-bold text-emerald-800 mb-2 text-sm uppercase tracking-wide">Menggambarkan Alam</h3>
                <div className="bg-white p-3 rounded-lg border border-blue-100/50">
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Gunakan "There is / There are":</p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">There is a <b>mountain</b>.</p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)] mt-1">There are many <b>trees</b> in the forest.</p>
                </div>
              </div>
        </div>
      ) : (
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
                    className="px-8 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-200"
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

export default Lesson9;
