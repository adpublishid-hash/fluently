
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { Clock, Mic, ChevronLeft, BookOpen, PenTool, CheckCircle2, XCircle, Star, Volume2, TrendingUp } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';






const FLUENCY_CONCEPTS = [
  {
    title: "Thought Groups",
    desc: "Kita tidak berbicara kata demi kata. Kita berbicara dalam potongan makna yang dipisahkan oleh jeda kecil.",
    example: "When I arrive, / I will call you.",
    icon: "🧩",
    color: "bg-cyan-50 text-cyan-700 border-cyan-200"
  },
  {
    title: "Jeda",
    desc: "Jeda bertindak seperti tanda baca. Mereka memberi pendengar waktu untuk memproses informasi.",
    example: "I bought apples, / oranges, / and bananas.",
    icon: "⏸️",
    color: "bg-teal-50 text-teal-700 border-sky-200"
  },
  {
    title: "Kecepatan vs. Aliran",
    desc: "Kefasihan bukan tentang berbicara cepat. Ini tentang transisi yang mulus antara bunyi.",
    example: "Smooth > Fast",
    icon: "🌊",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  }
];

const CHUNKING_PRACTICE = [
  {
    id: 1,
    full: "I was wondering if you would like to go to the cinema tonight.",
    chunked: "I was wondering / if you would like / to go to the cinema / tonight.",
    hint: "Istirahat pada penghubung logis atau preposisi."
  },
  {
    id: 2,
    full: "Even though it was raining, we decided to go for a walk in the park.",
    chunked: "Even though it was raining, / we decided / to go for a walk / in the park.",
    hint: "Istirahat pada koma dan frasa preposisi panjang."
  },
  {
    id: 3,
    full: "The man who lives next door is a famous doctor from Germany.",
    chunked: "The man / who lives next door / is a famous doctor / from Germany.",
    hint: "Pisahkan frasa subjek dan frasa deskriptif."
  }
];

const SHADOWING_TEXT = {
  title: "The Marathon",
  content: "Learning a language is not a sprint; it is a marathon. You cannot expect to be perfect overnight. It takes consistency, patience, and practice every single day. Don't worry about making mistakes. Mistakes are how we learn.",
  chunks: [
    "Learning a language / is not a sprint;",
    "it is a marathon.",
    "You cannot expect / to be perfect overnight.",
    "It takes consistency, / patience, / and practice / every single day.",
    "Don't worry / about making mistakes.",
    "Mistakes / are how we learn."
  ]
};

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Apa itu 'Thought Group'?",
    options: ['Sekumpulan kata-kata yang diucapkan bersama', 'Aturan tata bahasa', 'Sekelompok orang yang berpikir'],
    answer: 'Sekumpulan kata-kata yang diucapkan bersama',
    explanation: "Thought groups membantu mengatur ucapan menjadi potongan-potongan yang bermakna."
  },
  {
    id: 2,
    question: "Benar atau Salah: Berbicara lebih cepat selalu berarti Anda lebih fasih.",
    options: ['Salah', 'Benar'],
    answer: 'Salah',
    explanation: "Kejelasan dan aliran lebih penting daripada kecepatan. Berbicara terlalu cepat dapat mengurangi pemahaman."
  },
  {
    id: 3,
    question: "Di mana Anda biasanya harus berhenti sejenak?",
    options: ['Hanya di akhir kalimat', 'Pada koma dan jeda logis', 'Setelah setiap kata'],
    answer: 'Pada koma dan jeda logis',
    explanation: "Berhenti sejenak pada jeda logis membantu pendengar memproses informasi."
  },
  { id: 4, question: "Apa itu 'Shadowing'?", options: ['Mengulangi audio hampir seketika', 'Menerjemahkan teks', 'Membaca dalam hati'], answer: 'Mengulangi audio hampir seketika', explanation: "Shadowing melibatkan berbicara bersama dengan rekaman untuk meniru ritme dan intonasi." },
  { id: 5, question: "Thought groups membantu Anda...", options: ['Berpikir lebih cepat', 'Mengorganisir speech menjadi chunks bermakna', 'Menghafal lebih baik'], answer: 'Mengorganisir speech menjadi chunks bermakna', explanation: "Thought groups = meaningful chunks yang membuat speech lebih jelas." },
  { id: 6, question: "Kapan Anda harus pause dalam speech?", options: ['Hanya saat kehabisan nafas', 'Pada transisi logis / koma / frasa', 'Setiap 2 detik'], answer: 'Pada transisi logis / koma / frasa', explanation: "Pause pada natural breaks (koma, connectors, preposisi)." },
  { id: 7, question: "Berbicara cepat tanpa clarity = ...", options: ['Impressive', 'Fluent', 'Buruk untuk comprehension'], answer: 'Buruk untuk comprehension', explanation: "Speed without clarity mengurangi pemahaman pendengar." },
  { id: 8, question: "Fluency adalah tentang...", options: ['Vocabulary besar', 'Smooth flow dan natural rhythm', 'Kecepatan maksimal'], answer: 'Smooth flow dan natural rhythm', explanation: "Fluency = smoothness, not speed." },
  { id: 9, question: "'I went to the store / to buy some milk.' Mengapa ada pause (/) di sana?", options: ['Memisahkan purpose clause', 'Kesalahan', 'Random'], answer: 'Memisahkan purpose clause', explanation: "Pause memisahkan main action dari purpose/reason." },
  { id: 10, question: "Shadowing melatih Anda untuk...", options: ['Rhythm, intonation, dan natural flow', 'Tata bahasa', 'Menulis'], answer: 'Rhythm, intonation, dan natural flow', explanation: "Shadowing = best practice untuk internalize native rhythm." },
  { id: 11, question: "Chunking (memecah kalimat) berguna karena...", options: ['Terdengar robotic', 'Lebih mudah mengingat dan practice', 'Menghemat waktu'], answer: 'Lebih mudah mengingat dan practice', explanation: "Breaking into chunks memudahkan mastery sebelum combine." },
  { id: 12, question: "Dalam 'The man / who lives next door / is a doctor', pause membantu...", options: ['Membuat lebih cepat', 'Mengidentifikasi klausa deskriptif', 'Menghindari nafas'], answer: 'Mengidentifikasi klausa deskriptif', explanation: "Pauses separate subject, relative clause, dan predicate." },
  { id: 13, question: "Untuk fluency, sebaiknya...", options: ['Practice hanya grammar', 'Focus rhythm, linking, stress', 'Bicara tanpa henti'], answer: 'Focus rhythm, linking, stress', explanation: "Fluency requires rhythm awareness, stress patterns, linking." },
  { id: 14, question: "Kalimat panjang harus...", options: ['Dipecah menjadi 2-3 thought groups', 'Diucapkan tanpa pause', 'Dihindari'], answer: 'Dipecah menjadi 2-3 thought groups', explanation: "Long sentences need chunking untuk clarity." },
  { id: 15, question: "Shadowing paling efektif dengan...", options: ['Text tanpa audio', 'Audio native speakers', 'Teman non-native'], answer: 'Audio native speakers', explanation: "Shadow native speakers untuk accurate rhythm/intonation." },
  { id: 16, question: "'Even though it was raining, / we decided / to go.' Berapa thought groups?", options: ['2', '1', '3'], answer: '3', explanation: "3 chunks: condition, decision, action." },
  { id: 17, question: "Pauses terlalu sering membuat speech...", options: ['Choppy dan tidak natural', 'Clear', 'Fluent'], answer: 'Choppy dan tidak natural', explanation: "Too many pauses = robotic/choppy. Find balance." },
  { id: 18, question: "Pauses terlalu jarang membuat...", options: ['Impressive', 'Pendengar bingung/overwhelmed', 'Speech lebih fluent'], answer: 'Pendengar bingung/overwhelmed', explanation: "No pauses = listeners can't process information." },
  { id: 19, question: "Best practice untuk improve fluency?", options: ['Grammar drills', 'Read aloud dengan chunking + shadowing', 'Hanya mendengarkan'], answer: 'Read aloud dengan chunking + shadowing', explanation: "Active practice (chunking + shadowing) paling efektif." },
  { id: 20, question: "Smooth transitions antara words dicapai dengan...", options: ['Berbicara lambat', 'Linking sounds dan reducing function words', 'Jeda di setiap kata'], answer: 'Linking sounds dan reducing function words', explanation: "Connected speech (linking, reductions) creates smooth flow." }
];

const InterPronunLesson12: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 12);
    const nextLessonPath = 12 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${12 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'concept' | 'chunking' | 'shadowing' | 'quiz'>('concept');

  // Practice State
  const [chunkIndex, setChunkIndex] = useState(0);

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
                lessonLabel={"Intermediate Pronunciation Lesson 12"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Pelatihan Kefasihan"
                subtitle="Pronunciation • Pelajaran 12"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'concept', label: 'Aliran', icon: <BookOpen size={14} /> },
                    { id: 'chunking', label: 'Pemotongan', icon: <BookOpen size={14} /> },
                    { id: 'shadowing', label: 'Bayangan', icon: <BookOpen size={14} /> },
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
                            

          {tabId === 'concept' && (
            <>
              {/* Intro */}
              <section className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendingUp className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Kefasihan adalah Aliran 🌊</h2>
                  <p className="text-cyan-100 text-sm leading-relaxed">
                    Kefasihan bukan tentang berbicara cepat. Ini tentang seberapa lancar Anda menghubungkan kata-kata Anda dan di mana Anda berhenti untuk bernapas.
                  </p>
                </div>
              </section>

              <div className="space-y-4">
                {FLUENCY_CONCEPTS.map((item, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-sm ${item.color.replace('text-', 'border-').split(' ')[2]}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-lg font-bold ${item.color.split(' ')[1]}`}>{item.title}</h3>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{item.desc}</p>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100/50">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Contoh</p>
                      <p className="text-sm font-medium text-slate-800 flex items-center justify-between">
                        "{item.example}"
                        <button onClick={() => playSound(item.example.replace('/', ','))} className="text-cyan-600">
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabId === 'chunking' && (
            <div className="max-w-xl mx-auto text-center pt-8">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-cyan-100/50 border border-cyan-50 relative overflow-hidden">

                <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
                  <div
                    className="h-full bg-cyan-500 transition-all duration-300"
                    style={{ width: `${((chunkIndex + 1) / CHUNKING_PRACTICE.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Jeda di tempat yang tepat</h3>

                <div className="mb-8">
                  <p className="text-slate-500 text-xs font-bold mb-4 uppercase">Baca ini dengan keras:</p>
                  <p className="text-lg text-slate-800 mb-6 px-4 leading-relaxed font-medium">
                    {CHUNKING_PRACTICE[chunkIndex].full}
                  </p>

                  <button
                    onClick={() => playSound(CHUNKING_PRACTICE[chunkIndex].chunked.replace(/\//g, ','), 0.85)}
                    className="w-16 h-16 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 hover:bg-cyan-200 transition-colors shadow-sm animate-pulse-subtle"
                  >
                    <Volume2 className="w-8 h-8" />
                  </button>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left mb-6">
                  <p className="text-xs text-slate-400 font-bold uppercase mb-2">Versi Terpotong:</p>
                  <p className="text-base text-slate-700 leading-loose font-mono">
                    {CHUNKING_PRACTICE[chunkIndex].chunked.split('/').map((part, i) => (
                      <span key={i} className="bg-white px-2 py-1 rounded mx-1 shadow-sm border border-slate-100 inline-block mb-2">
                        {part.trim()}
                      </span>
                    ))}
                  </p>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setChunkIndex(prev => Math.max(0, prev - 1))}
                    disabled={chunkIndex === 0}
                    className="text-slate-400 font-bold text-sm hover:text-cyan-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <button
                    onClick={() => setChunkIndex(prev => Math.min(CHUNKING_PRACTICE.length - 1, prev + 1))}
                    disabled={chunkIndex === CHUNKING_PRACTICE.length - 1}
                    className="text-slate-400 font-bold text-sm hover:text-cyan-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    Next <ChevronLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {tabId === 'shadowing' && (
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Latihan Membayangi (Shadowing)</h3>
                    <p className="text-xs text-slate-500">Dengarkan dan ulangi segera.</p>
                  </div>
                  <div className="bg-cyan-50 p-2 rounded-full text-cyan-600">
                    <Mic className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-2xl mb-6 shadow-inner">
                  <p className="text-lg font-medium leading-relaxed text-center opacity-90">
                    "{SHADOWING_TEXT.content}"
                  </p>
                </div>

                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => playSound(SHADOWING_TEXT.content, 0.7)}
                    className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Clock className="w-4 h-4" /> Slow
                  </button>
                  <button
                    onClick={() => playSound(SHADOWING_TEXT.content, 1.0)}
                    className="flex-1 py-3 bg-cyan-600 text-white rounded-xl font-bold text-sm hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-200"
                  >
                    <Volume2 className="w-4 h-4" /> Normal
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-2">Uraian (Latih potongan-potongan ini):</p>
                  {SHADOWING_TEXT.chunks.map((chunk, i) => (
                    <div
                      key={i}
                      onClick={() => playSound(chunk.replace('/', ''))}
                      className="p-3 rounded-lg border border-slate-100 hover:bg-slate-50 hover:border-cyan-200 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <span className="text-slate-700 text-sm">{chunk}</span>
                      <Volume2 className="w-4 h-4 text-slate-300 group-hover:text-cyan-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tabId === 'quiz' && (
            <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-cyan-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-cyan-50 text-cyan-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-6 flex flex-col gap-2">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-slate-200 hover:border-cyan-300 hover:bg-slate-50";
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
                    className="px-8 py-3 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-200"
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

export default InterPronunLesson12;
