
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { PenTool, CheckCircle2, XCircle, Sparkles, Star, Volume2, TrendingUp } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';






const COMPOUND_PAIRS = [
  {
    id: "greenhouse",
    compound: { text: "GREENhouse", desc: "Bangunan kaca untuk tanaman", stress: "● o" },
    phrase: { text: "Green HOUSE", desc: "Rumah yang dicat hijau", stress: "o ●" }
  },
  {
    id: "hotdog",
    compound: { text: "HOTdog", desc: "Sosis dalam roti", stress: "● o" },
    phrase: { text: "Hot DOG", desc: "Anjing yang kepanasan", stress: "o ●" }
  },
  {
    id: "blackbird",
    compound: { text: "BLACKbird", desc: "Spesies burung tertentu", stress: "● o" },
    phrase: { text: "Black BIRD", desc: "Burung apa saja yang berwarna hitam", stress: "o ●" }
  },
  {
    id: "whitehouse",
    compound: { text: "WHITE House", desc: "Tempat tinggal Presiden AS", stress: "● o" },
    phrase: { text: "White HOUSE", desc: "Rumah apa saja yang dicat putih", stress: "o ●" }
  }
];

const PHRASAL_PAIRS = [
  {
    id: "workout",
    noun: { text: "WORKout", desc: "Sesi olahraga", stress: "● o" },
    verb: { text: "Work OUT", desc: "Berolahraga", stress: "o ●" }
  },
  {
    id: "makeup",
    noun: { text: "MAKEup", desc: "Kosmetik", stress: "● o" },
    verb: { text: "Make UP", desc: "Menciptakan / Mewaafkan", stress: "o ●" }
  },
  {
    id: "setup",
    noun: { text: "SETup", desc: "Pengaturan / Jebakan", stress: "● o" },
    verb: { text: "Set UP", desc: "Mengatur / Memasang", stress: "o ●" }
  },
  {
    id: "breakdown",
    noun: { text: "BREAKdown", desc: "Kerusakan (mekanis/mental)", stress: "● o" },
    verb: { text: "Break DOWN", desc: "Berhenti bekerja", stress: "o ●" }
  }
];

const PRACTICE_ITEMS = [
  { id: 1, audio: "BLUEberry", type: "Compound", display: "Blueberry", hint: "Buah tertentu" },
  { id: 2, audio: "Blue BERRY", type: "Phrase", display: "Blue Berry", hint: "Beri yang berwarna biru" },
  { id: 3, audio: "Take OVER", type: "Verb", display: "Take Over", hint: "Tindakan" },
  { id: 4, audio: "TAKEover", type: "Noun", display: "Takeover", hint: "Peristiwa/benda" },
  { id: 5, audio: "SOFTball", type: "Compound", display: "Softball", hint: "Olahraga" },
  { id: 6, audio: "Soft BALL", type: "Phrase", display: "Soft Ball", hint: "Bola yang lunak" }
];

const QUIZ_QUESTIONS = [
  { id: 1, question: "Di mana penekanan pada Kata Benda Majemuk (contoh: Toothpaste)?", options: ['Kata Pertama (TOOTH-paste)', 'Kata Kedua (tooth-PASTE)'], answer: 'Kata Pertama (TOOTH-paste)', explanation: "Kata benda majemuk biasanya membawa penekanan pada bagian pertama." },
  { id: 2, question: "Jika saya berkata 'I need to check IN', apakah 'check IN' itu kata benda atau kata kerja?", options: ['Kata Benda (CHECKin)', 'Kata Kerja (Check IN)'], answer: 'Kata Kerja (Check IN)', explanation: "PHRASAL VERBS ditekan pada partikel (bagian kedua)." },
  { id: 3, question: "Mana yang merujuk pada serangga tertentu: 'Butter FLY' atau 'BUTTERfly'?", options: ['Butter FLY', 'BUTTERfly'], answer: 'BUTTERfly', explanation: "Butterfly adalah kata benda majemuk, jadi penekanan ada pada bagian pertama." },
  { id: 4, question: "Dengarkan: 'Green HOUSE'. Apa artinya ini?", options: ['Rumah yang dicat hijau', 'Tempat menanam tanaman'], answer: 'Rumah yang dicat hijau', explanation: "Penekanan pada kata kedua menunjukkan frasa Kata Sifat + Kata Benda." },
  { id: 5, question: "'HOTdog' (penekanan pertama) berarti...", options: ['Tidak ada arti', 'Anjing kepanasan', 'Sosis dalam roti'], answer: 'Sosis dalam roti', explanation: "Compound noun dengan penekanan pertama adalah objek spesifik." },
  { id: 6, question: "'WORKout' vs 'Work OUT' - mana yang kata benda?", options: ['WORKout', 'Work OUT'], answer: 'WORKout', explanation: "Kata benda dari phrasal verb menekankan kata pertama." },
  { id: 7, question: "Penekanan pada 'BLACKbird' ada di mana?", options: ['BIRD (kedua)', 'Sama rata', 'BLACK (pertama)'], answer: 'BLACK (pertama)', explanation: "Sebagai compound noun (jenis burung tertentu), penekanan di bagian pertama." },
  { id: 8, question: "'White HOUSE' (penekanan kedua) merujuk ke...", options: ['Keduanya', 'Gedung Putih (Presiden AS)', 'Rumah berwarna putih'], answer: 'Rumah berwarna putih', explanation: "Penekanan kedua = frasa deskriptif biasa. Compound 'WHITE House' = Gedung Putih." },
  { id: 9, question: "Jika saya berkata 'I will make UP', saya sedang...", options: ['Memakai kosmetik', 'Tidur', 'Merekonsiliasi / menciptakan sesuatu'], answer: 'Merekonsiliasi / menciptakan sesuatu', explanation: "Phrasal verb 'make UP' (penekanan kedua) = tindakan." },
  { id: 10, question: "'SETup' (penekanan pertama) adalah...", options: ['Tindakan mengatur', 'Pengaturan/konfigurasi (noun)'], answer: 'Pengaturan/konfigurasi (noun)', explanation: "SE Tup = kata benda. Set UP = kata kerja." },
  { id: 11, question: "Mengapa penekanan penting dalam compound vs phrase?", options: ['Tidak penting', 'Untuk terdengar lebih keras', 'Untuk membedakan makna'], answer: 'Untuk membedakan makna', explanation: "Penekanan yang berbeda mengubah arti: BLACKbird (burung) vs Black BIRD (burung hitam)." },
  { id: 12, question: "'TAKEover' (penekanan pertama) berarti...", options: ['Mengambil alih (verb)', 'Pengambilalihan (noun)'], answer: 'Pengambilalihan (noun)', explanation: "Phrasal noun selalu penekanan pertama." },
  { id: 13, question: "'BREAKdown' vs 'Break DOWN' - mana yang kata kerja?", options: ['Break DOWN', 'BREAKdown'], answer: 'Break DOWN', explanation: "Kata kerja frasa menekankan partikel: Break DOWN." },
  { id: 14, question: "Compound noun 'CUPcake' memiliki penekanan di...", options: ['CUP (pertama)', 'CAKE (kedua)'], answer: 'CUP (pertama)', explanation: "Semua compound nouns menekankan elemen pertama." },
  { id: 15, question: "'SOFTball' (penekanan pertama) adalah...", options: ['Descripsi: bola yang lunak', 'Nama olahraga spesifik'], answer: 'Nama olahraga spesifik', explanation: "Compound = benda/konsep khusus dengan penekanan pertama." },
  { id: 16, question: "Jika saya berkata 'My car broke DOWN', 'broke DOWN' adalah...", options: ['Kata benda', 'Kata kerja'], answer: 'Kata kerja', explanation: "Penekanan pada DOWN menunjukkan tindakan (kata kerja frasa)." },
  { id: 17, question: "'MAKEup' (satu kata, penekanan pertama) berarti...", options: ['Tindakan berdandan', 'Kosmetik (benda)'], answer: 'Kosmetik (benda)', explanation: "MAKEup = noun. Make UP = verb." },
  { id: 18, question: "Pattern 'Adj + Noun' (seperti 'blue SKY') memiliki penekanan di...", options: ['Noun (kedua)', 'Adjective (pertama)'], answer: 'Noun (kedua)', explanation: "Frasa biasa (bukan compound) menekankan kata benda." },
  { id: 19, question: "'WHITEboard' (penekanan pertama) adalah...", options: ['Papan putih biasa', 'Papan tulis khusus'], answer: 'Papan tulis khusus', explanation: "Compound noun = objek spesifik (whiteboard untuk spidol)." },
  { id: 20, question: "Kata kerja frasa 'turn ON' memiliki penekanan di...", options: ['TURN', 'ON'], answer: 'ON', explanation: "Phrasal verbs selalu menekankan partikel (turn ON, give UP, dll)." }
];

const InterPronunLesson2: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 2);
    const nextLessonPath = 2 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${2 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'compounds' | 'phrasals' | 'practice' | 'quiz'>('compounds');

  // Practice State
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceFeedback, setPracticeFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string, rateOrLabel: number | string = 0.9, maybeRate?: number) => { const rate = typeof rateOrLabel === "number" ? rateOrLabel : (maybeRate ?? 0.9); playAudio(text, rate); };

  // Practice Handlers
  const checkPractice = (type: string) => {
    if (practiceFeedback) return;

    const current = PRACTICE_ITEMS[practiceIndex];
    // Simplify types for matching
    const isCompoundOrNoun = (type === "Compound/Noun");
    const isPhraseOrVerb = (type === "Phrase/Verb");

    const correctIsCompound = (current.type === "Compound" || current.type === "Noun");

    if ((isCompoundOrNoun && correctIsCompound) || (isPhraseOrVerb && !correctIsCompound)) {
      setPracticeFeedback('correct');
      playSound("Benar!");
    } else {
      setPracticeFeedback('incorrect');
      playSound("Coba lagi.");
    }

    setTimeout(() => {
      setPracticeFeedback(null);
      if (practiceIndex < PRACTICE_ITEMS.length - 1) {
        setPracticeIndex(prev => prev + 1);
      } else {
        
        setActiveTab('quiz');
        setPracticeIndex(0);
      }
    }, 1500);
  };

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
                lessonLabel={"Intermediate Pronunciation Lesson 2"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Penekanan Tingkat Lanjut"
                subtitle="Pronunciation • Pelajaran 2"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'compounds', label: 'Compounds', icon: <Sparkles size={14} /> },
                    { id: 'phrasals', label: 'Phrasals', icon: <Sparkles size={14} /> },
                    { id: 'practice', label: 'Tantangan', icon: <PenTool size={14} /> },
                    { id: 'quiz', label: 'Latihan', icon: <PenTool size={14} /> }
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
                            

          {tabId === 'compounds' && (
            <>
              {/* Intro */}
              <section className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Star className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Majemuk vs. Frasa</h2>
                  <p className="text-teal-100 text-sm leading-relaxed">
                    <b>Kata Benda Majemuk</b> (satu benda khusus) menekankan kata PERTAMA.<br />
                    <b>Kata Sifat + Kata Benda</b> (deskripsi) menekankan kata KEDUA.
                  </p>
                </div>
              </section>

              {/* Comparison List */}
              <div className="space-y-6">
                {COMPOUND_PAIRS.map((pair, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                      {/* Compound Side */}
                      <button
                        onClick={() => playSound(pair.compound.text)}
                        className="p-5 hover:bg-teal-50 transition-colors text-left group"
                      >
                        <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider mb-1 block">Compound (Thing)</span>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">{pair.compound.text}</h3>
                        <p className="text-xs text-slate-500 mb-2">{pair.compound.desc}</p>
                        <div className="flex items-center gap-2">
                          <Volume2 className="w-4 h-4 text-teal-400 group-hover:text-teal-600" />
                          <span className="text-xs font-mono text-teal-600 font-bold">{pair.compound.stress}</span>
                        </div>
                      </button>

                      {/* Phrase Side */}
                      <button
                        onClick={() => playSound(pair.phrase.text)}
                        className="p-5 hover:bg-blue-50 transition-colors text-left group"
                      >
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1 block">Phrase (Description)</span>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">{pair.phrase.text}</h3>
                        <p className="text-xs text-slate-500 mb-2">{pair.phrase.desc}</p>
                        <div className="flex items-center gap-2">
                          <Volume2 className="w-4 h-4 text-blue-400 group-hover:text-blue-600" />
                          <span className="text-xs font-mono text-blue-600 font-bold">{pair.phrase.stress}</span>
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabId === 'phrasals' && (
            <>
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                <div className="flex items-start gap-4">
                  <TrendingUp className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-800 mb-2">Kata Benda vs Kata Kerja</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <b>Kata Benda:</b> Tekan kata pertama (<b>WORK</b>out).<br />
                      <b>Kata Kerja:</b> Tekan kata kedua (Work <b>OUT</b>).
                    </p>
                  </div>
                </div>
              </section>

              <div className="grid gap-4">
                {PHRASAL_PAIRS.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => playSound(item.noun.text)}
                        className="text-center p-2 rounded-xl hover:bg-orange-50 transition-colors"
                      >
                        <span className="block text-xs font-bold text-orange-600 mb-1">NOUN</span>
                        <span className="block font-bold text-slate-800 text-lg">{item.noun.text}</span>
                        <span className="text-[10px] text-slate-500">{item.noun.desc}</span>
                      </button>

                      <button
                        onClick={() => playSound(item.verb.text)}
                        className="text-center p-2 rounded-xl hover:bg-blue-50 transition-colors"
                      >
                        <span className="block text-xs font-bold text-blue-600 mb-1">VERB</span>
                        <span className="block font-bold text-slate-800 text-lg">{item.verb.text}</span>
                        <span className="text-[10px] text-slate-500">{item.verb.desc}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabId === 'practice' && (
            <div className="max-w-xl mx-auto text-center pt-8">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-sky-100/50 border border-sky-50 relative overflow-hidden">

                <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
                  <div
                    className="h-full bg-teal-500 transition-all duration-300"
                    style={{ width: `${((practiceIndex + 1) / PRACTICE_ITEMS.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Dengar & Identifikasi</h3>

                <div className="mb-8">
                  <button
                    onClick={() => playSound(PRACTICE_ITEMS[practiceIndex].audio)}
                    className="bg-teal-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-teal-100 transition-colors shadow-inner animate-pulse-subtle"
                  >
                    <Volume2 className="w-10 h-10 text-teal-600" />
                  </button>
                  <p className="text-slate-500 text-sm mb-2 font-bold">Petunjuk: {PRACTICE_ITEMS[practiceIndex].hint}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => checkPractice("Compound/Noun")}
                    className={`px-4 py-4 rounded-xl border-2 font-bold text-sm transition-all active:scale-95 ${practiceFeedback
                      ? (PRACTICE_ITEMS[practiceIndex].type === 'Compound' || PRACTICE_ITEMS[practiceIndex].type === 'Noun'
                        ? 'bg-green-500 text-white border-sky-500 shadow-lg'
                        : 'opacity-30 border-slate-200')
                      : 'bg-white border-slate-200 text-slate-600 hover:border-sky-400 hover:text-teal-600'
                      }`}
                  >
                    <span className="block text-xs uppercase mb-1 opacity-70">Tekan Pertama</span>
                    Majemuk / Kata Benda
                  </button>

                  <button
                    onClick={() => checkPractice("Phrase/Verb")}
                    className={`px-4 py-4 rounded-xl border-2 font-bold text-sm transition-all active:scale-95 ${practiceFeedback
                      ? (PRACTICE_ITEMS[practiceIndex].type === 'Phrase' || PRACTICE_ITEMS[practiceIndex].type === 'Verb'
                        ? 'bg-green-500 text-white border-sky-500 shadow-lg'
                        : 'opacity-30 border-slate-200')
                      : 'bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600'
                      }`}
                  >
                    <span className="block text-xs uppercase mb-1 opacity-70">Tekan Kedua</span>
                    Frasa / Kata Kerja
                  </button>
                </div>

                {practiceFeedback && (
                  <div className={`mt-6 font-bold animate-bounce ${practiceFeedback === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
                    {practiceFeedback === 'correct' ? 'Benar! 🎉' : 'Oops! Dengarkan lagi.'}
                  </div>
                )}
              </div>
            </div>
          )}

          {tabId === 'quiz' && (
            <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-teal-50 text-teal-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-slate-200 hover:border-sky-300 hover:bg-slate-50";
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
                    className="px-8 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-sky-200"
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

export default InterPronunLesson2;
