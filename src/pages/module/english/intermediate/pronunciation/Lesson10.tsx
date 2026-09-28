
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Star, Volume2, TrendingUp } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';






type StressPair = {
  word: string;
  noun: { ipa: string; def: string; ex: string };
  verb: { ipa: string; def: string; ex: string };
};

const STRESS_PAIRS: StressPair[] = [
  {
    word: "Suspect",
    noun: { ipa: "SUS-pect", def: "Seseorang yang diduga bersalah.", ex: "The police caught the SUS-pect." },
    verb: { ipa: "sus-PECT", def: "Menduga seseorang bersalah.", ex: "I sus-PECT he is lying." }
  },
  {
    word: "Conflict",
    noun: { ipa: "CON-flict", def: "Perselisihan atau pertengkaran.", ex: "There is a CON-flict at work." },
    verb: { ipa: "con-FLICT", def: "Bentrokan atau tidak setuju.", ex: "The dates con-FLICT with my plans." }
  },
  {
    word: "Permit",
    noun: { ipa: "PER-mit", def: "Dokumen/izin resmi.", ex: "Do you have a parking PER-mit?" },
    verb: { ipa: "per-MIT", def: "Mengizinkan.", ex: "They do not per-MIT smoking." }
  },
  {
    word: "Desert",
    noun: { ipa: "DES-ert", def: "Tanah kering berpasir (Gurun).", ex: "Camels live in the DES-ert." },
    verb: { ipa: "de-SERT", def: "Meninggalkan/menelantarkan.", ex: "Don't de-SERT your friends." }
  },
  {
    word: "Import",
    noun: { ipa: "IM-port", def: "Produk yang didatangkan.", ex: "Coffee is a major IM-port." },
    verb: { ipa: "im-PORT", def: "Membawa barang masuk.", ex: "We im-PORT cars from Japan." }
  }
];

const PRACTICE_SENTENCES = [
  {
    id: 1,
    text: "The police arrested the ___.",
    word: "Suspect",
    correct: "Noun (SUS-pect)",
    hint: "Ini merujuk pada seseorang."
  },
  {
    id: 2,
    text: "They will ___ the new data.",
    word: "Record",
    correct: "Verb (re-CORD)",
    hint: "Tindakan menyimpan data."
  },
  {
    id: 3,
    text: "This is a serious ___.",
    word: "Conflict",
    correct: "Noun (CON-flict)",
    hint: "Merujuk pada situasi."
  },
  {
    id: 4,
    text: "He plans to ___ the army.",
    word: "Desert",
    correct: "Verb (de-SERT)",
    hint: "Tindakan meninggalkan."
  },
  {
    id: 5,
    text: "We need a ___ to build here.",
    word: "Permit",
    correct: "Noun (PER-mit)",
    hint: "Sebuah dokumen (Benda)."
  }
];

const QUIZ_QUESTIONS = [
  { id: 1, question: "Aturan Umum: Di mana penekanan pada KATA BENDA 2 suku kata?", options: ['Suku Kata ke-1 (● o)', 'Suku Kata ke-2 (o ●)'], answer: 'Suku Kata ke-1 (● o)', explanation: "Sebagian besar kata benda 2 suku kata menekankan suku kata pertama (contoh: TA-ble, PEN-cil, SUS-pect)." },
  { id: 2, question: "Aturan Umum: Di mana penekanan pada KATA KERJA 2 suku kata?", options: ['Suku Kata ke-1 (● o)', 'Suku Kata ke-2 (o ●)'], answer: 'Suku Kata ke-2 (o ●)', explanation: "Sebagian besar kata kerja 2 suku kata menekankan suku kata kedua (contoh: be-GIN, re-LAX, sus-PECT)." },
  { id: 3, question: "Pengucapan mana yang cocok: 'Please RE-cord this show'?", options: ['Benar', 'Salah'], answer: 'Salah', explanation: "Sebagai kata kerja (tindakan), seharusnya 're-CORD'." },
  { id: 4, question: "Arti dari 'DES-ert' (Tekanan pada suku kata ke-1)?", options: ['Meninggalkan seseorang', 'Tempat yang panas dan kering'], answer: 'Tempat yang panas dan kering', explanation: "Kata benda (tempat) memiliki tekanan pada suku kata pertama." },
  { id: 5, question: "'SUS-pect' (noun) berarti...", options: ['Menduga seseorang bersalah', 'Orang yang diduga bersalah'], answer: 'Orang yang diduga bersalah', explanation: "Noun = ● o pattern, artinya orang/benda." },
  { id: 6, question: "'sus-PECT' (verb) berarti...", options: ['Orang yang diduga', 'Menduga / mencurigai'], answer: 'Menduga / mencurigai', explanation: "Verb = o ● pattern, artinya tindakan." },
  { id: 7, question: "'CON-flict' dengan stress pertama adalah...", options: ['Noun (perselisihan)', 'Verb (bentrok)'], answer: 'Noun (perselisihan)', explanation: "Noun stress on first syllable." },
  { id: 8, question: "'con-FLICT' dengan stress kedua adalah...", options: ['Noun', 'Verb (tidak setuju/bentrok)'], answer: 'Verb (tidak setuju/bentrok)', explanation: "Verb stress on second syllable." },
  { id: 9, question: "'PER-mit' (noun) adalah...", options: ['Tindakan mengizinkan', 'Dokumen izin'], answer: 'Dokumen izin', explanation: "Noun = benda (dokumen, kartu, dll)." },
  { id: 10, question: "'per-MIT' (verb) berarti...", options: ['Dokumen', 'Mengizinkan (tindakan)'], answer: 'Mengizinkan (tindakan)', explanation: "Verb = action word." },
  { id: 11, question: "'de-SERT' (verb) berarti...", options: ['Gurun/desert', 'Meninggalkan / menelantarkan'], answer: 'Meninggalkan / menelantarkan', explanation: "Verb form = stress on second syllable." },
  { id: 12, question: "'IM-port' (noun) adalah...", options: ['Tindakan mengimpor', 'Produk yang diimpor'], answer: 'Produk yang diimpor', explanation: "Noun = benda (barang impor)." },
  { id: 13, question: "'im-PORT' (verb) berarti...", options: ['Barang impor', 'Membawa barang masuk'], answer: 'Membawa barang masuk', explanation: "Verb = tindakan mengimpor." },
  { id: 14, question: "Mengapa pergeseran stress penting?", options: ['Hanya untuk style', 'Mengubah arti kata (noun vs verb)', 'Tidak penting'], answer: 'Mengubah arti kata (noun vs verb)', explanation: "St ress shift completely changes meaning and grammatical function." },
  { id: 15, question: "'PRO-ject' (noun) adalah...", options: ['Melempar sesuatu', 'Tugas/proyek'], answer: 'Tugas/proyek', explanation: "Noun = ● o (project, task, assignment)." },
  { id: 16, question: "'pro-JECT' (verb) berarti...", options: ['Tugas', 'Memproyeksikan / melempar'], answer: 'Memproyeksikan / melempar', explanation: "Verb = o ● (to project, display, throw)." },
  { id: 17, question: "'RE-cord' adalah...", options: ['Noun (rekaman / catatan)', 'Verb (merekam)'], answer: 'Noun (rekaman / catatan)', explanation: "Noun = first syllable stress." },
  { id: 18, question: "'re-CORD' adalah...", options: ['Noun', 'Verb (merekam / mencatat)'], answer: 'Verb (merekam / mencatat)', explanation: "Verb = second syllable stress." },
  { id: 19, question: "Pasangan stress ini paling umum di...", options: ['1-syllable words', '2-syllable words', '3+ syllable words'], answer: '2-syllable words', explanation: "Pattern noun/verb stress shift mostly applies to 2-syllable words." },
  { id: 20, question: "Cara mudah mengingat: Nouns = ___, Verbs = ___", options: ['● o, o ●', 'o ●, ● o', 'Sama saja'], answer: '● o, o ●', explanation: "Nouns stress first (● o), Verbs stress second (o ●)." }
];

const InterPronunLesson10: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 10);
    const nextLessonPath = 10 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${10 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'intro' | 'pairs' | 'practice' | 'quiz'>('intro');

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Practice State
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceFeedback, setPracticeFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Audio Handler
  const playSound = (text: string, rateOrLabel: number | string = 0.9, maybeRate?: number) => { const rate = typeof rateOrLabel === "number" ? rateOrLabel : (maybeRate ?? 0.9); playAudio(text, rate); };

  // Practice Logic
  const handlePracticeCheck = (type: string) => {
    if (practiceFeedback) return;
    const current = PRACTICE_SENTENCES[practiceIndex];
    const isNoun = current.correct.startsWith("Noun");

    if ((type === "Noun" && isNoun) || (type === "Verb" && !isNoun)) {
      setPracticeFeedback('correct');
      playSound("Benar!");
    } else {
      setPracticeFeedback('incorrect');
      playSound("Coba lagi.");
    }

    setTimeout(() => {
      setPracticeFeedback(null);
      if (practiceIndex < PRACTICE_SENTENCES.length - 1) {
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
                lessonLabel={"Intermediate Pronunciation Lesson 10"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Tekanan Kata Benda vs Kata Kerja"
                subtitle="Pronunciation • Pelajaran 10"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'intro', label: 'Aturan', icon: <BookOpen size={14} /> },
                    { id: 'pairs', label: 'Pasangan', icon: <BookOpen size={14} /> },
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
                            

          {tabId === 'intro' && (
            <>
              {/* Intro */}
              <section className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendingUp className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Pergeseran Tekanan</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Banyak kata dua suku kata bisa menjadi Kata Benda dan Kata Kerja. Makna dan pengucapan berubah berdasarkan <b>Tekanan</b>.
                    <br /><br />
                    <b>Kata Benda:</b> Tekan bagian ke-1.<br />
                    <b>Kata Kerja:</b> Tekan bagian ke-2.
                  </p>
                </div>
              </section>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Panduan Visual
                </h3>
                <div className="flex gap-4">
                  <div className="flex-1 bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                    <h4 className="font-black text-3xl text-indigo-600 mb-1">● o</h4>
                    <p className="text-sm font-bold text-slate-700 uppercase">Noun</p>
                    <p className="text-xs text-slate-500">PRO-ject</p>
                  </div>
                  <div className="flex-1 bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                    <h4 className="font-black text-3xl text-purple-600 mb-1">o ●</h4>
                    <p className="text-sm font-bold text-slate-700 uppercase">Verb</p>
                    <p className="text-xs text-slate-500">pro-JECT</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {tabId === 'pairs' && (
            <div className="space-y-6">
              {STRESS_PAIRS.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800 text-lg uppercase tracking-wide">{item.word}</h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {/* Noun */}
                    <button
                      onClick={() => playSound(item.noun.ex)}
                      className="w-full p-4 hover:bg-indigo-50 transition-colors text-left group"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded">NOUN</span>
                        <Volume2 className="w-4 h-4 text-slate-300 group-hover:text-indigo-500" />
                      </div>
                      <p className="text-lg font-bold text-slate-800 mb-1">{item.noun.ipa}</p>
                      <p className="text-xs text-slate-500 mb-2">{item.noun.def}</p>
                      <p className="text-sm text-slate-700 italic">"{item.noun.ex}"</p>
                    </button>

                    {/* Verb */}
                    <button
                      onClick={() => playSound(item.verb.ex)}
                      className="w-full p-4 hover:bg-purple-50 transition-colors text-left group"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded">VERB</span>
                        <Volume2 className="w-4 h-4 text-slate-300 group-hover:text-purple-500" />
                      </div>
                      <p className="text-lg font-bold text-slate-800 mb-1">{item.verb.ipa}</p>
                      <p className="text-xs text-slate-500 mb-2">{item.verb.def}</p>
                      <p className="text-sm text-slate-700 italic">"{item.verb.ex}"</p>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tabId === 'practice' && (
            <div className="max-w-xl mx-auto text-center pt-8">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-indigo-100/50 border border-indigo-50 relative overflow-hidden">

                <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
                  <div
                    className="h-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${((practiceIndex + 1) / PRACTICE_SENTENCES.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Kata Benda atau Kata Kerja?</h3>

                <div className="mb-8">
                  <p className="text-xs text-slate-400 font-bold mb-2">Konteks:</p>
                  <h2 className="text-xl font-medium text-slate-800 mb-6 italic px-4">"{PRACTICE_SENTENCES[practiceIndex].text}"</h2>

                  <div className="inline-block p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-sm mb-4">
                    <span className="text-3xl font-black text-slate-700">{PRACTICE_SENTENCES[practiceIndex].word}</span>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={() => playSound(PRACTICE_SENTENCES[practiceIndex].text)}
                      className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center hover:bg-indigo-200 transition-colors"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handlePracticeCheck('Noun')}
                    className="py-4 rounded-xl border-2 border-slate-100 hover:border-indigo-400 hover:bg-indigo-50 font-bold text-slate-600 transition-all active:scale-95"
                  >
                    Noun (● o)
                  </button>
                  <button
                    onClick={() => handlePracticeCheck('Verb')}
                    className="py-4 rounded-xl border-2 border-slate-100 hover:border-purple-400 hover:bg-purple-50 font-bold text-slate-600 transition-all active:scale-95"
                  >
                    Verb (o ●)
                  </button>
                </div>

                {practiceFeedback && (
                  <div className={`mt-6 font-bold animate-bounce ${practiceFeedback === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
                    {practiceFeedback === 'correct' ? 'Benar! 🎉' : 'Ups! Coba lagi.'}
                    {practiceFeedback === 'correct' && (
                      <p className="text-xs font-normal text-slate-400 mt-2">{PRACTICE_SENTENCES[practiceIndex].correct}</p>
                    )}
                  </div>
                )}
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

export default InterPronunLesson10;
