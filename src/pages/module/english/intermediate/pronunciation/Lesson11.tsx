
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { ChevronLeft, BookOpen, PenTool, CheckCircle2, XCircle, Star, Volume2, Zap } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';






const TRICKY_SOUNDS = [
  {
    id: "dark-l",
    title: "Dark 'L' vs Light 'L'",
    desc: "L itu 'Ringan' di awal kata (Lip). Itu 'Gelap' (lebih dalam di tenggorokan) di akhir (Full).",
    examples: [
      { word: "Light L", text: "Love, Leaf, Late", note: "Ujung lidah menyentuh gigi." },
      { word: "Dark L", text: "Ball, Milk, Full", note: "Bagian belakang lidah naik." }
    ],
    color: "bg-indigo-50 text-indigo-700 border-indigo-200"
  },
  {
    id: "th-clusters",
    title: "Gugus TH",
    desc: "Beralih dari TH ke konsonan lain itu sulit! Jangan hilangkan bunyi TH.",
    examples: [
      { word: "Months", text: "/mʌnθs/", note: "N ➜ TH ➜ S" },
      { word: "Clothes", text: "/kloʊðz/", note: "TH Bersuara ➜ Z" },
      { word: "Sixth", text: "/sɪksθ/", note: "K ➜ S ➜ TH" }
    ],
    color: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    id: "rl-combo",
    title: "R & L Bersama",
    desc: "Tantangan 'World'. Anda harus mengucapkan R, lalu Dark L, lalu D.",
    examples: [
      { word: "World", text: "/wɜːrld/", note: "R... L... D" },
      { word: "Girl", text: "/ɡɜːrl/", note: "G... R... Dark L" },
      { word: "Earl", text: "/ɜːrl/", note: "R... Dark L" }
    ],
    color: "bg-emerald-50 text-emerald-700 border-blue-200"
  }
];

const PRACTICE_DRILLS = [
  {
    id: 1,
    text: "The girl in the world.",
    focus: "Kombinasi RL",
    tips: "Jangan bilang 'Gal'. Katakan 'G-er-L'."
  },
  {
    id: 2,
    text: "Six months of cold.",
    focus: "Gugus TH",
    tips: "Coba: Mun-ths. Lidah keluar untuk TH, tarik kembali untuk S."
  },
  {
    id: 3,
    text: "A tall wall.",
    focus: "Dark L",
    tips: "Jangan biarkan ujung lidah menyentuh untuk L di akhir."
  },
  {
    id: 4,
    text: "Clothes and cloths.",
    focus: "TH Bersuara vs Tak Bersuara",
    tips: "Clothes (Buzz/Dengung), Cloths (Angin)."
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Di mana Anda biasanya mendengar bunyi 'Dark L'?",
    options: ['Di awal kata', 'Di akhir kata'],
    answer: 'Di akhir kata',
    explanation: "Contoh: 'Ball'. Bunyi tersebut beresonansi di bagian belakang tenggorokan."
  },
  {
    id: 2,
    question: "Bagaimana cara mengucapkan 'Months'?",
    options: ['Mun-s', 'Mun-ths', 'Month-iz'],
    answer: 'Mun-ths',
    explanation: "Anda harus beralih dari N ke TH ke S. Itu rumit!"
  },
  {
    id: 3,
    question: "Kata mana yang mengandung kombinasi 'RL'?",
    options: ['Word', 'World', 'Wood'],
    answer: 'World',
    explanation: "World memiliki bunyi R dan L. Word hanya memiliki R."
  },
  { id: 4, question: "Dalam kata 'Sixth', bunyi akhirnya adalah...", options: ['/ks/', '/kθ/', '/ksθ/'], answer: '/ksθ/', explanation: "Itu diakhiri dengan bunyi K-S-TH bersama-sama." },
  { id: 5, question: "'Light L' (di awal kata) dibentuk oleh...", options: ['Ujung lidah menyentuh gigi bagian atas', 'Bagian belakang lidah naik', 'Bibir bulat'], answer: 'Ujung lidah menyentuh gigi bagian atas', explanation: "Light L = ujung lidah ke ridge di belakang gigi." },
  { id: 6, question: "'Dark L' (di akhir kata) dibentuk oleh...", options: ['Ujung lidah menyentuh gigi', 'Bagian belakang lidah naik', 'Bibir terbuka lebar'], answer: 'Bagian belakang lidah naik', explanation: "Dark L = back of tongue raises, sounds deeper/resonant." },
  { id: 7, question: "'Clothes' /kloʊðz/ memiliki bunyi TH yang...", options: ['Bersuara (voiced)', 'Tak bersuara (voiceless)'], answer: 'Bersuara (voiced)', explanation: "TH dalam 'clothes' adalah /ð/ (bersuara/buzz)." },
  { id: 8, question: "'Cloths' /klɔːθs/ memiliki bunyi TH yang...", options: ['Bersuara', 'Tak bersuara (voiceless)'], answer: 'Tak bersuara (voiceless)', explanation: "Cloths = /θ/ (voiceless, seperti angin)." },
  { id: 9, question: "Kata 'World' sulit karena...", options: ['Hanya satu konsonan', 'Kombinasi R + Dark L + D', 'Tidak ada vokal'], answer: 'Kombinasi R + Dark L + D', explanation: "/wɜːrld/ = R sound kemudian Dark L kemudian D." },
  { id: 10, question: "Kata 'Girl' memiliki gugus konsonan...", options: ['/rl/', '/ll/', '/rr/'], answer: '/rl/', explanation: "Girl = /gɜːrl/, R kemudian Dark L." },
  { id: 11, question: "Dalam 'Months', urutan bunyi adalah...", options: ['M-O-N-S', 'M-U-N-TH-S', 'M-O-N-TH'], answer: 'M-U-N-TH-S', explanation: "/mʌnθs/ = harus ucapkan TH sebelum S." },
  { id: 12, question: "Kesalahan umum dengan 'Sixth' adalah...", options: ['Menghilangkan /k/', 'Menghilangkan /θ/ (TH)', 'Menghilangkan /s/'], answer: 'Menghilangkan /θ/ (TH)', explanation: "Banyak learners say 'siks' instead of 'siksθ'." },
  { id: 13, question: "'Ball' dan 'Bell' berbeda dalam...", options: ['Bunyi L (sama Dark L)', 'Vokal (/ɔː/ vs /ɛ/)', 'Bunyi B'], answer: 'Vokal (/ɔː/ vs /ɛ/)', explanation: "Ball = /bɔːl/, Bell = /bɛl/. Keduanya Dark L." },
  { id: 14, question: "Untuk Dark L, posisi lidah seperti...", options: ['Datar dan rileks', 'Ujung naik, belakang turun', 'Ujung turun, belakang naik'], answer: 'Ujung turun, belakang naik', explanation: "Dark L = back of tongue rises toward soft palate." },
  { id: 15, question: "Kata 'Earl' sulit karena...", options: ['R + Dark L kombinasi', 'Terlalu panjang', 'Tidak ada vokal'], answer: 'R + Dark L kombinasi', explanation: "/ɜːrl/ = R sound blends into Dark L." },
  { id: 16, question: "'Film' sering salah diucapkan sebagai...", options: ['Fil-um (dua suku kata)', 'Correct: Film (satu suku kata)', 'Fee-lum'], answer: 'Fil-um (dua suku kata)', explanation: "Film = /fɪlm/, bukan 'fil-um'. Langsung dari L ke M." },
  { id: 17, question: "Konsonan gugus yang paling sulit biasanya...", options: ['Di awal kata', 'Di akhir kata', 'Di tengah kata'], answer: 'Di akhir kata', explanation: "Final clusters (akhir kata) seperti -nths, -ksθ paling sulit." },
  { id: 18, question: "'Fifth' diakhiri dengan bunyi...", options: ['/f/', '/fθ/', '/θ/'], answer: '/fθ/', explanation: "Fifth = /fɪfθ/, F kemudian TH." },
  { id: 19, question: "Dark L terdengar seperti vokal...", options: ['/u/ atau /w/', '/i/', '/a/'], answer: '/u/ atau /w/', explanation: "Dark L has a 'w' or 'oo' quality (back tongue raised)." },
  { id: 20, question: "Cara melatih tricky consonants terbaik adalah...", options: ['Ucapkan cepat 100x', 'Slow down, exaggerate, then speed up', 'Skip them'], answer: 'Slow down, exaggerate, then speed up', explanation: "Practice slowly with exaggeration, then gradually increase speed." }
];

const InterPronunLesson11: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 11);
    const nextLessonPath = 11 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${11 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'concepts' | 'practice' | 'quiz'>('concepts');

  // Practice State
  const [practiceIndex, setPracticeIndex] = useState(0);

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string, rateOrLabel: number | string = 0.9, maybeRate?: number) => { const rate = typeof rateOrLabel === "number" ? rateOrLabel : (maybeRate ?? 0.9); playAudio(text, rate); };

  // Quiz Handlers
  const handleCheckQuiz = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);
    if (option === QUIZ_QUESTIONS[quizStep].answer) {
      setQuizScore(prev => prev + 1);
      playSound("Benar!");
    } else {
      playSound("Salah.");
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
                lessonLabel={"Intermediate Pronunciation Lesson 11"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Konsonan Rumit"
                subtitle="Pronunciation • Pelajaran 11"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'concepts', label: 'Konsep', icon: <BookOpen size={14} /> },
                    { id: 'practice', label: 'Tantangan', icon: <PenTool size={14} /> },
                    { id: 'quiz', label: 'Kuis', icon: <PenTool size={14} /> }
                ]}
                footer={() => (
                    <button
                        onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                        className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                        style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}
                    >
                        <CheckCircle2 size={18} />
                        {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
                    </button>
                )}
            >
                {(tabId) => {
                    
                    
                    return (
                        <div className="animate-fade-in space-y-6">
                            

          {tabId === 'concepts' && (
            <>
              {/* Intro */}
              <section className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Zap className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Bunyi Sulit</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Beberapa bunyi sulit bahkan untuk pelajar tingkat lanjut. Khususnya "Dark L", dan gugus konsonan seperti dalam "Sixth" atau "World".
                  </p>
                </div>
              </section>

              <div className="space-y-6">
                {TRICKY_SOUNDS.map((item, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-sm ${item.color.replace('text-', 'border-').split(' ')[2]}`}>
                    <h3 className={`text-lg font-bold ${item.color.split(' ')[1]} mb-2`}>{item.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{item.desc}</p>

                    <div className="space-y-3">
                      {item.examples.map((ex, i) => (
                        <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div>
                            <p className="font-bold text-slate-800">{ex.word}</p>
                            <p className="text-xs text-slate-400 font-mono mt-1">{ex.text}</p>
                          </div>
                          <button
                            onClick={() => playSound(ex.word.replace('/', ''))}
                            className="w-10 h-10 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:bg-indigo-50 transition-colors shadow-sm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabId === 'practice' && (
            <div className="max-w-xl mx-auto text-center pt-8">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-indigo-100/50 border border-indigo-50 relative overflow-hidden">

                <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
                  <div
                    className="h-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${((practiceIndex + 1) / PRACTICE_DRILLS.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Latihan Pembelit Lidah</h3>
                <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold mb-6">
                  Target: {PRACTICE_DRILLS[practiceIndex].focus}
                </span>

                <div className="mb-8">
                  <button
                    onClick={() => playSound(PRACTICE_DRILLS[practiceIndex].text, 0.7)}
                    className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-200 mb-4 animate-pulse-subtle"
                  >
                    <Volume2 className="w-10 h-10" />
                  </button>
                  <h2 className="text-2xl font-bold text-slate-800 leading-snug px-4">"{PRACTICE_DRILLS[practiceIndex].text}"</h2>
                  <p className="text-xs text-slate-400 mt-4 font-medium bg-yellow-50 text-yellow-700 p-2 rounded-lg inline-block border border-yellow-100">
                    💡 {PRACTICE_DRILLS[practiceIndex].tips}
                  </p>
                </div>

                <div className="flex justify-between mt-8 pt-6 border-t border-slate-50">
                  <button
                    onClick={() => setPracticeIndex(prev => Math.max(0, prev - 1))}
                    disabled={practiceIndex === 0}
                    className="text-slate-400 font-bold text-sm hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <button
                    onClick={() => setPracticeIndex(prev => Math.min(PRACTICE_DRILLS.length - 1, prev + 1))}
                    disabled={practiceIndex === PRACTICE_DRILLS.length - 1}
                    className="text-slate-400 font-bold text-sm hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    Next <ChevronLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {tabId === 'quiz' && (
            <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-6 flex flex-col gap-2">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-slate-200 hover:border-indigo-300 hover:bg-slate-50";
                      if (isAnswerChecked) {
                        if (option === QUIZ_QUESTIONS[quizStep].answer) btnClass = "bg-green-50 border-sky-500 text-green-700";
                        else if (option === selectedOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                        else btnClass = "opacity-50 border-slate-100";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleCheckQuiz(option)}
                          disabled={isAnswerChecked}
                          className={`w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${btnClass}`}
                        >
                          <span>{option}</span>
                          {isAnswerChecked && option === QUIZ_QUESTIONS[quizStep].answer && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                          {isAnswerChecked && option === selectedOption && option !== QUIZ_QUESTIONS[quizStep].answer && <XCircle className="w-5 h-5 text-red-500" />}
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
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Kuis Selesai!</h2>
                  <p className="text-slate-500 mb-6">Anda mendapat skor {quizScore} dari {QUIZ_QUESTIONS.length}</p>
                  <button
                    onClick={restartQuiz}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
            </div>
          )}

        
                        </div>
                    );
                }}
            </LessonShell>
        </>
    );
}; // END COMPONENT

export default InterPronunLesson11;
