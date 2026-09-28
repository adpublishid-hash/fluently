
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { AlertTriangle, Mic, BookOpen, PenTool, CheckCircle2, XCircle, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';






const SILENT_LETTERS = [
  {
    word: "Comfortable",
    wrong: "Com-for-ta-ble (4 suku kata)",
    right: "Comf-ta-ble (3 suku kata)",
    ipa: "/ˈkʌmftəbəl/",
    note: "'or' tidak diucapkan/direduksi."
  },
  {
    word: "Vegetable",
    wrong: "Ve-ge-ta-ble (4 suku kata)",
    right: "Veg-ta-ble (3 suku kata)",
    ipa: "/ˈvɛdʒtəbəl/",
    note: "'e' kedua tidak diucapkan."
  },
  {
    word: "Receipt",
    wrong: "Re-cept (Mengucapkan P)",
    right: "Re-seet",
    ipa: "/rɪˈsiːt/",
    note: "'p' tidak diucapkan."
  },
  {
    word: "Debt",
    wrong: "De-bt (Mengucapkan B)",
    right: "Det",
    ipa: "/dɛt/",
    note: "'b' tidak diucapkan. Berima dengan 'Jet'."
  },
  {
    word: "Island",
    wrong: "Is-land (Mengucapkan S)",
    right: "Eye-land",
    ipa: "/ˈaɪlənd/",
    note: "'s' tidak diucapkan."
  },
  {
    word: "Chaos",
    wrong: "Cha-os (Seperti Chat)",
    right: "Kay-os",
    ipa: "/ˈkeɪɒs/",
    note: "'ch' berbunyi seperti 'K'."
  }
];

const TRICKY_VOWELS = [
  {
    word: "Women (Plural)",
    sounds_like: "Wih-min",
    ipa: "/ˈwɪmɪn/",
    desc: "'O' berubah menjadi bunyi 'I'.",
    icon: "👩‍👩‍👧"
  },
  {
    word: "Police",
    sounds_like: "Puh-lease",
    ipa: "/pəˈliːs/",
    desc: "'O' adalah Schwa (uh), bukan 'Oh'.",
    icon: "👮"
  },
  {
    word: "Bury",
    sounds_like: "Berry",
    ipa: "/ˈbɛri/",
    desc: "Berima dengan 'Cherry', bukan 'Fury'.",
    icon: "⚰️"
  },
  {
    word: "Onion",
    sounds_like: "Un-yon",
    ipa: "/ˈʌnjən/",
    desc: "Dimulai dengan bunyi 'Uh', bukan 'On'.",
    icon: "🧅"
  }
];

const STRESS_SHIFTS = [
  {
    base: "PHO-to-graph",
    shift: "pho-TOG-ra-phy",
    hint: "Tekanan pindah ke suku kata ke-2."
  },
  {
    base: "AN-a-lyze",
    shift: "a-NAL-y-sis",
    hint: "Tekanan pindah ke suku kata ke-2."
  },
  {
    base: "PO-li-tics",
    shift: "po-lit-i-cal",
    hint: "Tekanan pindah ke suku kata ke-3."
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Berapa banyak suku kata dalam 'Vegetable'?",
    options: ['4 (Ve-ge-ta-ble)', '3 (Veg-ta-ble)'],
    answer: '3 (Veg-ta-ble)',
    explanation: "Penutur asli menghilangkan 'e' kedua. Veg-ta-ble."
  },
  {
    id: 2,
    question: "Kata mana yang berima dengan 'Debt'?",
    options: ['Bet', 'Bead', 'Dept'],
    answer: 'Bet',
    explanation: "'b' tidak diucapkan. Terdengar seperti 'Det'."
  },
  {
    id: 3,
    question: "Bagaimana Anda mengucapkan 'Women' (Jamak)?",
    options: ['Woo-men', 'Wih-min'],
    answer: 'Wih-min',
    explanation: "Bunyi 'O' berubah menjadi bunyi 'I' pendek."
  },
  {
    id: 4,
    question: "Di mana letak tekanan pada 'Photography'?",
    options: ['PHO-to-gra-phy', 'pho-TOG-ra-phy'],
    answer: 'pho-TOG-ra-phy',
    explanation: "Tekanan berpindah ke suku kata kedua."
  },
  { id: 5, question: "'CH' dalam 'Chaos' terdengar seperti...", options: ['CH (Cheese)', 'K (King)', 'SH (Shoe)'], answer: 'K (King)', explanation: "Chaos diucapkan 'Kay-os'." },
  { id: 6, question: "'Island' diucapkan...", options: ['Is-land (S diucapkan)', 'Eye-land (S silent)'], answer: 'Eye-land (S silent)', explanation: "The 'S' is silent. Sounds like 'I-land'." },
  { id: 7, question: "'Receipt' memiliki silent letter...", options: ['P', 'C', 'T'], answer: 'P', explanation: "Receipt = /rɪˈsiːt/ (Re-seet). P is silent." },
  { id: 8, question: "'Comfortable' has ___ syllables.", options: ['4 (Com-for-ta-ble)', '3 (Comf-ta-ble)'], answer: '3 (Comf-ta-ble)', explanation: "Native speakers reduce it: Comf-ta-ble." },
  { id: 9, question: "'Bury' berima dengan...", options: ['Fury', 'Berry', 'Bury (unique)'], answer: 'Berry', explanation: "Bury = /ˈbɛri/ like cherry, berry." },
  { id: 10, question: "'Police' dimulai dengan bunyi...", options: ['/pə/ (Puh)', '/poʊ/ (Po)', '/pɑ/ (Paa)'], answer: '/pə/ (Puh)', explanation: "Police = /pəˈliːs/. First syllable is schwa." },
  { id: 11, question: "'Onion' dimulai dengan bunyi...", options: ['/ʌn/ (Un)', '/oʊn/ (Own)', '/ɑn/ (On)'], answer: '/ʌn/ (Un)', explanation: "Onion = /ˈʌnjən/ (Un-yin)." },
  { id: 12, question: "Stress shift: PHO-to-graph → ___", options: ['PHO-to-gra-phy', 'pho-TOG-ra-phy'], answer: 'pho-TOG-ra-phy', explanation: "Stress moves to second syllable in photography." },
  { id: 13, question: "Stress shift: AN-a-lyze → ___", options: ['AN-a-ly-sis', 'a-NAL-y-sis'], answer: 'a-NAL-y-sis', explanation: "Stress shifts to second syllable." },
  { id: 14, question: "'Colonel' (military rank) diucapkan...", options: ['/kəˈloʊnəl/ (Ko-lo-nel)', '/ˈkɜrnəl/ (Ker-nel)'], answer: '/ˈkɜrnəl/ (Ker-nel)', explanation: "Colonel sounds like 'kernel'! Silent 'o', 'l'." },
  { id: 15, question: "'Wednesday' diucapkan...", options: ['/ˈwɛdnɪzdeɪ/ (Wed-nes-day)', '/ˈwɛnzdeɪ/ (Wenz-day)'], answer: '/ˈwɛnzdeɪ/ (Wenz-day)', explanation: "First 'd' is silent. Wenz-day." },
  { id: 16, question: "'Salmon' has silent...", options: ['S', 'L', 'N'], answer: 'L', explanation: "Salmon = /ˈsæmən/ (Sam-on). L is silent." },
  { id: 17, question: "'Suite' (hotel room) diucapkan...", options: ['/suːt/ (Suit)', '/swiːt/ (Sweet)'], answer: '/swiːt/ (Sweet)', explanation: "Suite rhymes with 'sweet', not 'suit'." },
  { id: 18, question: "'Knife' has silent...", options: ['K', 'I', 'E'], answer: 'K', explanation: "Knife = /naɪf/ (Nife). K is silent." },
  { id: 19, question: "Common mistake: 'Nuclear' is NOT pronounced...", options: ['/ˈnukliər/ (Correct)', "/ˈnukjələr/ (Nucular - wrong)"], answer: '/ˈnukjələr/ (Nucular - wrong)', explanation: "Correct = /ˈnukliər/ (New-klee-er), NOT nucular." },
  { id: 20, question: "Best way to avoid common mistakes?", options: ['Guess', 'Listen to natives, use dictionaries', 'Give up'], answer: 'Listen to natives, use dictionaries', explanation: "Learn correct pronunciation through exposure and reference tools!" }
];

const InterPronunLesson19: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 19);
    const nextLessonPath = 19 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${19 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'silent' | 'vowels' | 'stress' | 'quiz'>('silent');

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
                lessonLabel={"Intermediate Pronunciation Lesson 19"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Kesalahan Umum"
                subtitle="Pronunciation • Pelajaran 19"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'silent', label: 'Huruf Mati', icon: <BookOpen size={14} /> },
                    { id: 'vowels', label: 'Vokal Rumit', icon: <BookOpen size={14} /> },
                    { id: 'stress', label: 'Pergeseran Tekanan', icon: <BookOpen size={14} /> },
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
                            

          {tabId === 'silent' && (
            <>
              {/* Intro */}
              <section className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Mic className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Jebakan Huruf Mati 🤫</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Bahasa Inggris penuh dengan huruf yang kita tulis tetapi tidak kita ucapkan. Mengucapkannya adalah kesalahan umum!
                  </p>
                </div>
              </section>

              <div className="grid gap-4">
                {SILENT_LETTERS.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-black text-slate-800">{item.word}</h3>
                      <button
                        onClick={() => playSound(item.word)}
                        className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors shadow-sm"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex gap-4 text-sm mb-3">
                      <div className="text-red-500 line-through opacity-70">{item.wrong}</div>
                      <div className="text-green-600 font-bold">{item.right}</div>
                    </div>
                    <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      💡 {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabId === 'vowels' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Vokal Tak Terduga
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                  Ejaannya berbohong! Kata-kata ini tidak terdengar seperti kelihatannya.
                </p>

                <div className="grid gap-4">
                  {TRICKY_VOWELS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => playSound(item.word)}
                      className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200 hover:bg-white hover:shadow-md transition-all group text-left"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{item.icon}</span>
                          <span className="text-lg font-bold text-slate-800">{item.word}</span>
                        </div>
                        <div className="text-sm text-indigo-600 font-bold">"{item.sounds_like}"</div>
                        <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                      </div>
                      <Volume2 className="w-6 h-6 text-slate-300 group-hover:text-indigo-500" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tabId === 'stress' && (
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 border border-indigo-50 relative overflow-hidden">

                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-slate-800">Pergeseran Tekanan</h3>
                  <p className="text-xs text-slate-500">Ketika kata menjadi lebih panjang, tekanannya berpindah!</p>
                </div>

                <div className="space-y-4">
                  {STRESS_SHIFTS.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <button
                          onClick={() => playSound(item.base.replace(/-/g, ''))}
                          className="hover:text-indigo-600 transition-colors"
                        >
                          <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Base</span>
                          <span className="block font-medium text-slate-800">{item.base}</span>
                        </button>
                        <div className="flex flex-col justify-center items-center">
                          <span className="text-slate-300 mb-1">➜</span>
                        </div>
                        <button
                          onClick={() => playSound(item.shift.replace(/-/g, ''))}
                          className="col-start-2 row-start-1 hover:text-indigo-600 transition-colors"
                        >
                          <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Derivative</span>
                          <span className="block font-medium text-slate-800">{item.shift}</span>
                        </button>
                      </div>
                      <p className="text-xs text-center text-indigo-500 mt-3 font-medium bg-white py-1 rounded border border-indigo-100">
                        {item.hint}
                      </p>
                    </div>
                  ))}
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

export default InterPronunLesson19;
