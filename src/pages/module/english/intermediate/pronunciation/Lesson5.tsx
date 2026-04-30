
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Trophy, Lightbulb, Sparkles, Star, Volume2, Target, TrendingUp, BarChart, Zap } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';




// Custom Ghost Icon for Schwa/Weak sounds
const GhostIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 22v-2" /><path d="M9 12a4 4 0 1 1 6 0v2" />
    <path d="M9 14h6" /><path d="M15 22v-2" />
    <path d="M12 2a5 5 0 0 0-5 5v5" /><path d="M17 7a5 5 0 0 0-5-5" />
    <circle cx="10" cy="8" r="1" /><circle cx="14" cy="8" r="1" />
  </svg>
);



const WEAK_WORDS_LIST = [
  {
    word: "AND",
    strong: "/ænd/",
    weak: "/ən/ or /n/",
    example_phrase: "Fish and chips",
    example_phonetic: "Fish-n-chips"
  },
  {
    word: "TO",
    strong: "/tuː/",
    weak: "/tə/",
    example_phrase: "Go to work",
    example_phonetic: "Go-ta-work"
  },
  {
    word: "FOR",
    strong: "/fɔːr/",
    weak: "/fər/",
    example_phrase: "Just for you",
    example_phonetic: "Just-fer-you"
  },
  {
    word: "OF",
    strong: "/ɒv/",
    weak: "/əv/ or /ə/",
    example_phrase: "Cup of tea",
    example_phonetic: "Cup-a-tea"
  },
  {
    word: "CAN",
    strong: "/kæn/",
    weak: "/kən/",
    example_phrase: "I can swim",
    example_phonetic: "I-kn-swim"
  },
  {
    word: "WAS",
    strong: "/wɒz/",
    weak: "/wəz/",
    example_phrase: "It was good",
    example_phonetic: "It-wuz-good"
  }
];

const STRONG_VS_WEAK_SCENARIOS = [
  {
    id: 1,
    title: "AT",
    weak: { text: "I'm at home.", phonetic: "I'm /ət/ home.", desc: "Posisi normal" },
    strong: { text: "What are you looking at?", phonetic: "Looking /æt/?", desc: "Akhir kalimat" }
  },
  {
    id: 2,
    title: "CAN",
    weak: { text: "I can do it.", phonetic: "I /kən/ do it.", desc: "Sebelum kata kerja" },
    strong: { text: "Yes, I can.", phonetic: "Yes, I /kæn/.", desc: "Jawaban pendek / Akhir" }
  },
  {
    id: 3,
    title: "FOR",
    weak: { text: "This is for you.", phonetic: "This is /fər/ you.", desc: "Penggunaan normal" },
    strong: { text: "Who is this for?", phonetic: "Who is this /fɔːr/?", desc: "Akhir kalimat" }
  }
];

const QUIZ_QUESTIONS = [
  { id: 1, question: "Kapan kata-kata fungsi (seperti 'to', 'for', 'can') biasanya KUAT?", options: ['Di tengah kalimat', 'Di akhir kalimat', 'Selalu'], answer: 'Di akhir kalimat', explanation: "Di akhir kalimat, kita biasanya menggunakan bentuk kuat (contoh: 'What are you looking AT?')." },
  { id: 2, question: "Bagaimana 'AND' biasanya diucapkan dalam pembicaraan cepat (contoh: Rock and Roll)?", options: ['/ænd/', '/n/'], answer: '/n/', explanation: "Itu berkurang menjadi hanya bunyi /n/: 'Rock-n-Roll'." },
  { id: 3, question: "Kalimat mana yang menggunakan bentuk LEMAH dari 'CAN' (/kən/)?", options: ['I can swim.', 'Yes, I can.'], answer: 'I can swim.', explanation: "Sebelum kata kerja utama ('swim'), 'can' dikurangi menjadi /kən/." },
  { id: 4, question: "Disebut apakah bunyi vokal lemah itu?", options: ['The Stress', 'The Schwa (/ə/)', 'The Long Vowel'], answer: 'The Schwa (/ə/)', explanation: "The Schwa adalah bunyi 'uh' malas yang ditemukan di hampir semua bentuk lemah." },
  { id: 5, question: "'TO' dalam 'I want to go' diucapkan sebagai ___.", options: ['/tuː/', '/tə/'], answer: '/tə/', explanation: "Function word 'to' dikurangi menjadi /tə/ (bukan /tuː/)." },
  { id: 6, question: "'Fish and chips' terdengar seperti ___.", options: ['Fish-ænd-chips', 'Fish-n-chips'], answer: 'Fish-n-chips', explanation: "'And' berkurang drastis menjadi hanya bunyi /n/." },
  { id: 7, question: "'Cup of tea' diucapkan sebagai ___.", options: ['Cup-ov-tea', 'Cup-a-tea'], answer: 'Cup-a-tea', explanation: "'Of' menjadi sangat lemah: /əv/ atau bahkan hanya /ə/." },
  { id: 8, question: "Mengapa function words dilemahkan?", options: ['Karena tidak penting', 'Untuk menjaga ritme stress-timed', 'Karena terlalu panjang'], answer: 'Untuk menjaga ritme stress-timed', explanation: "Weak forms membantu menjaga beat teratur pada content words." },
  { id: 9, question: "'FOR' dalam 'This is for you' diucapkan ___.", options: ['/fɔːr/', '/fər/'], answer: '/fər/', explanation: "Bentuk lemah /fər/ digunakan di tengah kalimat." },
  { id: 10, question: "'What are you looking AT?' - 'AT' diucapkan ___.", options: ['Lemah (/ət/)', 'Kuat (/æt/)'], answer: 'Kuat (/æt/)', explanation: "Di akhir kalimat, 'at' menggunakan bentuk kuat." },
  { id: 11, question: "'CAN' dalam 'Yes, I can.' diucapkan sebagai ___.", options: ['/kən/', '/kæn/'], answer: '/kæn/', explanation: "Jawaban pendek di akhir kalimat menggunakan bentuk kuat." },
  { id: 12, question: "Function words yang paling umum dilemahkan adalah ___.", options: ['Nouns dan verbs', 'Articles, prepositions, auxiliaries', 'Adjectives'], answer: 'Articles, prepositions, auxiliaries', explanation: "The, to, for, and, can, was, dll. adalah function words yang sering lemah." },
  { id: 13, question: "'WAS' dalam 'It was good' menjadi ___.", options: ['/wɒz/', '/wəz/'], answer: '/wəz/', explanation: "Vokal berubah menjadi schwa di bentuk lemah: /wəz/." },
  { id: 14, question: "'Who is this FOR?' - 'FOR' diucapkan ___.", options: ['Lemah (/fər/)', 'Kuat (/fɔːr/)'], answer: 'Kuat (/fɔːr/)', explanation: "Preposisi di akhir kalimat pertanyaan menggunakan bentuk kuat." },
  { id: 15, question: "Kapan 'WAS' menggunakan bentuk kuat /wɒz/?", options: ['Selalu', 'Di akhir kalimat atau untuk penekanan', 'Tidak pernah'], answer: 'Di akhir kalimat atau untuk penekanan', explanation: "Contoh: 'Yes, it WAS!' menggunakan bentuk kuat untuk penekanan." },
  { id: 16, question: "'A cup of coffee' - bunyi apa yang hilang/sangat lemah?", options: ['cup', 'of', 'coffee'], answer: 'of', explanation: "'Of' menjadi hampir tidak terdengar: 'a cup-ə-coffee'." },
  { id: 17, question: "Weak forms membuat bahasa Inggris terdengar ___.", options: ['Lebih lambat', 'Lebih alami dan cepat', 'Lebih formal'], answer: 'Lebih alami dan cepat', explanation: "Native speakers selalu gunakan weak forms untuk kefasihan natural." },
  { id: 18, question: "'I'm AT home' vs 'What are you looking AT?' - Mana yang lemah?", options: ['Pertama (AT home)', 'Kedua (looking AT)', 'Keduanya lemah'], answer: 'Pertama (AT home)', explanation: "'At home' = /ət/, tapi 'looking AT?' (akhir) = /æt/." },
  { id: 19, question: "Apa perbedaan utama strong vs weak forms?", options: ['Panjang kata', 'Vokal berubah ke schwa', 'Konsonan hilang'], answer: 'Vokal berubah ke schwa', explanation: "Weak forms menggunakan /ə/ (schwa) sebagai vokal utama." },
  { id: 20, question: "Untuk berbicara alami, Anda HARUS ___.", options: ['Ucapkan semua kata dengan jelas', 'Gunakan weak forms untuk function words', 'Hindari weak forms'], answer: 'Gunakan weak forms untuk function words', explanation: "Weak forms adalah ciri khas native English speech." }
];

const InterPronunLesson5: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 5);
    const nextLessonPath = 5 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${5 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'concept' | 'list' | 'practice' | 'quiz'>('concept');

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
                lessonLabel={"Intermediate Pronunciation Lesson 5"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Bentuk Lemah"
                subtitle="Pronunciation • Pelajaran 5"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'concept', label: 'Konsep', icon: <BookOpen size={14} /> },
                    { id: 'list', label: 'Contoh', icon: <BookOpen size={14} /> },
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
                            

          {tabId === 'concept' && (
            <>
              {/* Intro */}
              <section className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <GhostIcon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Rahasia Bahasa Inggris "Malas"</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Agar lancar berbicara, Anda harus "mengecilkan" kata-kata tata bahasa kecil (seperti <i>to, for, at, and</i>).
                    Vokalnya berubah menjadi bunyi "uh" kecil yang disebut <b>Schwa /ə/</b>.
                  </p>
                </div>
              </section>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Mengapa kita melakukan ini?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Bahasa Inggris adalah bahasa <b>Stress-Timed</b>. Kita ingin bergerak cepat di antara kata-kata penting (Kata Benda, Kata Kerja).
                  Agar lebih cepat, kita membuat kata-kata kecil menjadi sangat lemah.
                </p>

                <div className="bg-slate-100 p-4 rounded-xl">
                  <p className="text-xs text-slate-500 font-bold uppercase mb-2">Example:</p>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="font-bold text-slate-800">Fish</span>
                    <span className="text-sm text-slate-400 italic">and</span>
                    <span className="font-bold text-slate-800">Chips</span>
                  </div>
                  <div className="text-center mt-2 text-indigo-600 font-bold">
                    ⬇️ <br /> "Fish-n-Chips"
                  </div>
                </div>
              </div>
            </>
          )}

          {tabId === 'list' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                <p className="text-sm text-slate-600">Kata-kata umum yang menjadi lemah:</p>
              </div>

              {WEAK_WORDS_LIST.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                    <h3 className="text-xl font-black text-indigo-600">{item.word}</h3>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 line-through mr-2">{item.strong}</span>
                      <span className="text-sm font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{item.weak}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800">"{item.example_phrase}"</p>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">Terdengar seperti: <b>{item.example_phonetic}</b></p>
                    </div>
                    <button
                      onClick={() => playSound(item.example_phrase)}
                      className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tabId === 'practice' && (
            <div className="max-w-xl mx-auto pt-4">
              <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 border border-indigo-50">
                <h3 className="text-center font-bold text-slate-800 mb-6 flex items-center justify-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                  Kuat vs Lemah
                </h3>

                <p className="text-sm text-slate-600 text-center mb-6">
                  Biasanya, kita menggunakan bentuk <b>Lemah</b>. <br />
                  Tetapi di <b>akhir</b> kalimat, kita menggunakan bentuk <b>Kuat</b>.
                </p>

                <div className="space-y-8">
                  {STRONG_VS_WEAK_SCENARIOS.map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200 rounded-full"></div>
                      <div className="pl-6 space-y-3">
                        <h4 className="font-black text-slate-300 text-sm uppercase tracking-widest">{item.title}</h4>

                        {/* Weak Example */}
                        <div className="flex items-center justify-between group cursor-pointer" onClick={() => playSound(item.weak.text)}>
                          <div>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded mb-1 inline-block">LEMAH</span>
                            <p className="text-slate-800 font-medium">{item.weak.text}</p>
                            <p className="text-xs text-slate-400 font-mono">{item.weak.phonetic}</p>
                          </div>
                          <Volume2 className="w-5 h-5 text-slate-300 group-hover:text-green-500 transition-colors" />
                        </div>

                        {/* Strong Example */}
                        <div className="flex items-center justify-between group cursor-pointer" onClick={() => playSound(item.strong.text)}>
                          <div>
                            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded mb-1 inline-block">KUAT</span>
                            <p className="text-slate-800 font-medium">{item.strong.text}</p>
                            <p className="text-xs text-slate-400 font-mono">{item.strong.phonetic}</p>
                          </div>
                          <Volume2 className="w-5 h-5 text-slate-300 group-hover:text-red-500 transition-colors" />
                        </div>
                      </div>
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

export default InterPronunLesson5;
