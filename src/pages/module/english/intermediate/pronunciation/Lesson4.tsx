
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { ChevronLeft, BookOpen, PenTool, CheckCircle2, XCircle, Trophy, Lightbulb, Sparkles, Star, Volume2, Target, TrendingUp, BarChart, Zap } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';




// Custom Metronome Icon
const MetronomeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 21V10" />
    <path d="M8 21h8" />
    <path d="m5 21 6-16 6 16" />
  </svg>
);



const RHYTHM_CONCEPTS = [
  {
    title: "Diatur Suku Kata (Indonesian)",
    desc: "Setiap suku kata memakan waktu yang sama. Seperti senapan mesin: rat-a-tat-tat.",
    example: "Sa-ya per-gi ke pa-sar.",
    visual: "■ ■ ■ ■ ■ ■",
    color: "bg-slate-100 text-slate-600 border-slate-200"
  },
  {
    title: "Diatur Penekanan (English)",
    desc: "Hanya suku kata yang ditekan yang memakan waktu. Kata-kata yang tidak ditekan diperas dengan cepat. Seperti detak jantung: DA-da-DA-da.",
    example: "I WENT to the MAR-ket.",
    visual: "● · · · ● ·",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200"
  }
];

const EXPANSION_DRILL = [
  {
    level: 1,
    text: "Birds eat worms.",
    stress: ["Birds", "eat", "worms"],
    beats: 3
  },
  {
    level: 2,
    text: "The birds eat the worms.",
    stress: ["birds", "eat", "worms"],
    beats: 3
  },
  {
    level: 3,
    text: "The birds will eat the worms.",
    stress: ["birds", "eat", "worms"],
    beats: 3
  },
  {
    level: 4,
    text: "The birds might have eaten the worms.",
    stress: ["birds", "eaten", "worms"],
    beats: 3
  }
];

const NURSERY_RHYMES = [
  {
    title: "Jack and Jill",
    text: "JACK and JILL went UP the HILL.",
    hint: "Tekan kata-kata dalam HURUF KAPITAL. Luncurkan kata-kata kecilnya."
  },
  {
    title: "Twinkle Star",
    text: "TWINK-le TWINK-le LIT-tle STAR.",
    hint: "Rasakan ketukan 1-2-3-4."
  }
];

const QUIZ_QUESTIONS = [
  { id: 1, question: "Bahasa Inggris adalah bahasa yang ___.", options: ['Syllable-timed (Diatur Suku Kata)', 'Stress-timed (Diatur Penekanan)', 'Tone-timed (Diatur Nada)'], answer: 'Stress-timed (Diatur Penekanan)', explanation: "Waktu antara suku kata yang ditekan kira-kira konsisten, terlepas dari berapa banyak suku kata di antaranya." },
  { id: 2, question: "Dalam kalimat 'Dogs chase cats', berapa banyak ketukan utama yang ada?", options: ['1', '2', '3'], answer: '3', explanation: "DOGS, CHASE, CATS. Semuanya adalah kata konten." },
  { id: 3, question: "Apa yang terjadi pada kata-kata kecil seperti 'the', 'of', 'and' dalam sebuah kalimat?", options: ['Diucapkan dengan keras', 'Diperas/dipendekkan', 'Dihapus'], answer: 'Diperas/dipendekkan', explanation: "Kata-kata fungsi dikurangi (bunyi schwa) agar sesuai dengan ritme." },
  { id: 4, question: "Kalimat mana yang lebih lama untuk diucapkan?", options: ['Birds eat worms.', 'The birds eat the worms.', 'Keduanya memakan waktu yang hampir sama.'], answer: 'Keduanya memakan waktu yang hampir sama.', explanation: "Dalam ritme bahasa Inggris, menambahkan kata-kata yang tidak ditekan tidak memakan banyak waktu; kita hanya mengucapkannya lebih cepat." },
  { id: 5, question: "Bahasa Indonesia adalah bahasa ___.", options: ['Syllable-timed', 'Stress-timed', 'Tidak ada aturan'], answer: 'Syllable-timed', explanation: "Setiap suku kata dalam bahasa Indonesia memakan waktu yang sama (seperti mesin tik)." },
  { id: 6, question: "Dalam ritme Inggris, kata-kata mana yang mendapat penekanan/beat?", options: ['Semua kata', 'Kata konten (nouns, verbs, adjectives)', 'Hanya kata pertama'], answer: 'Kata konten (nouns, verbs, adjectives)', explanation: "Content words membawa makna utama dan mendapat penekanan." },
  { id: 7, question: "'I WENT to the MARket' - Berapa beat dalam kalimat ini?", options: ['2 (WENT, MARket)', '4 (semua kata)', '5 (semua suku kata)'], answer: '2 (WENT, MARket)', explanation: "Hanya kata konten yang ditekan: WENT dan MARket." },
  { id: 8, question: "Mengapa penting memahami stress-timing?", options: ['Untuk terdengar lebih formal', 'Untuk berbicara lebih alami dan lancar', 'Tidak penting'], answer: 'Untuk berbicara lebih alami dan lancar', explanation: "Stress-timing adalah kunci kefasihan alami dalam bahasa Inggris." },
  { id: 9, question: "Dalam 'The birds will eat the worms', berapa beat?", options: ['2', '3', '6'], answer: '3', explanation: "BIRDS, EAT, WORMS - tiga content words yang ditekan." },
  { id: 10, question: "Efek 'karet gelang' dalam ritme Inggris merujuk ke ___.", options: ['Kata-kata yang stretch/shrink di antara beats', 'Pengucapan yang lambat', 'Tidak ada hubungan'], answer: 'Kata-kata yang stretch/shrink di antara beats', explanation: "Function words menyesuaikan panjangnya untuk menjaga ketukan tetap teratur." },
  { id: 11, question: "Sajak anak-anak (nursery rhymes) bagus untuk latihan karena ___.", options: ['Mudah dihafal', 'Memiliki ketukan kuat dan jelas', 'Pendek'], answer: 'Memiliki ketukan kuat dan jelas', explanation: "Nursery rhymes memiliki pola beat yang sangat teratur dan jelas." },
  { id: 12, question: "'JACK and JILL went UP the HILL' - Berapa beat?", options: ['4', '7', '8'], answer: '4', explanation: "JACK, JILL, UP, HILL - empat kata konten yang ditekan." },
  { id: 13, question: "Dalam stress-timed language, apa yang tetap konsisten?", options: ['Jumlah suku kata', 'Waktu antar stressed syllables', 'Kecepatan bicara'], answer: 'Waktu antar stressed syllables', explanation: "Jarak waktu antara suku kata yang ditekan relatif sama." },
  { id: 14, question: "Kata mana yang BUKAN content word?", options: ['Dog', 'Beautiful', 'The'], answer: 'The', explanation: "'The' adalah function word yang biasanya tidak ditekan." },
  { id: 15, question: "Mengapa 'the', 'to', 'and' diucapkan cepat?", options: ['Karena tidak penting', 'Untuk menjaga ritme tetap teratur', 'Karena sulit diucapkan'], answer: 'Untuk menjaga ritme tetap teratur', explanation: "Function words dipercepat agar beats tetap konsisten." },
  { id: 16, question: "'TWINKle TWINKle LITtle STAR' - Pola ini menunjukkan ___.", options: ['Syllable-timing', 'Stress-timing dengan beat teratur', 'Tidak ada pola'], answer: 'Stress-timing dengan beat teratur', explanation: "Kata yang ditekan (TWINK, TWINK, LIT, STAR) menciptakan beat teratur." },
  { id: 17, question: "Jika menambah function words ke kalimat, waktu total ___.", options: ['Bertambah banyak', 'Hampir sama (kata dipercepat)', 'Berkurang'], answer: 'Hampir sama (kata dipercepat)', explanation: "Function words diperas agar tidak mengganggu beat utama." },
  { id: 18, question: "Dalam latihan ekspansi ('Birds eat worms' → 'The birds will eat the worms'), apa yang berubah?", options: ['Jumlah beats', 'Kecepatan function words', 'Tidak ada yang berubah'], answer: 'Kecepatan function words', explanation: "Beats tetap 3 (birds, eat, worms), tapi function words dipercepat." },
  { id: 19, question: "Rhythmic pattern bahasa Inggris seperti ___.", options: ['Mesin tik (ta-ta-ta)', 'Detak jantung (DA-da-DA-da)', 'Tidak ada pola'], answer: 'Detak jantung (DA-da-DA-da)', explanation: "Strong-weak pattern seperti heartbeat: stressed-unstressed-stressed-unstressed." },
  { id: 20, question: "Untuk berbicara Inggris alami, Anda harus ___.", options: ['Ucapkan semua kata sama jelas', 'Tekan content words, lemahkan function words', 'Bicara sangat pelan'], answer: 'Tekan content words, lemahkan function words', explanation: "Perbedaan antara stressed dan unstressed syllables menciptakan ritme alami." }
];

const InterPronunLesson4: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 4);
    const nextLessonPath = 4 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${4 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'concept' | 'expansion' | 'rhymes' | 'quiz'>('concept');

  // Practice State
  const [expansionIndex, setExpansionIndex] = useState(0);

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
                lessonLabel={"Intermediate Pronunciation Lesson 4"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Ritme Bahasa Inggris"
                subtitle="Pronunciation • Pelajaran 4"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'concept', label: 'Konsep', icon: <BookOpen size={14} /> },
                    { id: 'expansion', label: 'Latihan Elastis', icon: <BookOpen size={14} /> },
                    { id: 'rhymes', label: 'Sajak', icon: <BookOpen size={14} /> },
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
                  <MetronomeIcon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Efek "Karet Gelang"</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Ritme bahasa Inggris itu seperti karet gelang. Kata-kata yang ditekan adalah simpulnya. Tali di antaranya (kata-kata kecil) meregang atau menyusut untuk menjaga ketukan tetap stabil.
                  </p>
                </div>
              </section>

              <div className="space-y-4">
                {RHYTHM_CONCEPTS.map((concept, idx) => (
                  <div key={idx} className={`rounded-2xl border p-5 ${concept.color.replace('text-', 'border-').split(' ')[2]} bg-white shadow-sm`}>
                    <h3 className={`font-bold text-lg mb-2 ${concept.color.split(' ')[1]}`}>{concept.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{concept.desc}</p>

                    <div className="bg-slate-50 p-4 rounded-xl text-center">
                      <p className="text-lg font-mono text-slate-800 mb-2">{concept.visual}</p>
                      <p className="text-sm font-bold text-slate-800">"{concept.example}"</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm mt-4">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-indigo-500" />
                  Dengarkan
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => playSound("I went to the market", 0.6)} // Slower, more robotic
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <span className="text-xl">🤖</span>
                    <div className="text-left">
                      <span className="block font-bold text-slate-600">Datar (Gaya Indonesia)</span>
                      <span className="text-xs text-slate-400">Setiap suku kata sama</span>
                    </div>
                  </button>
                  <button
                    onClick={() => playSound("I WENT to the MARket", 1)} // Faster, natural
                    className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    <span className="text-xl">🇺🇸</span>
                    <div className="text-left">
                      <span className="block font-bold text-indigo-600">Alami (Gaya Inggris)</span>
                      <span className="text-xs text-indigo-400">Kata-kata pendek cepat</span>
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}

          {tabId === 'expansion' && (
            <div className="max-w-xl mx-auto text-center pt-6">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-indigo-100/50 border border-indigo-50 relative overflow-hidden">

                <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
                  <div
                    className="h-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${((expansionIndex + 1) / EXPANSION_DRILL.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Latihan Ekspansi</h3>
                <p className="text-xs text-slate-500 mb-4">Setiap kalimat memakan waktu yang sama untuk diucapkan!</p>

                <div className="mb-10 relative z-10">
                  <div className="text-2xl font-medium text-slate-800 mb-6 leading-relaxed">
                    {EXPANSION_DRILL[expansionIndex].text.split(' ').map((word, i) => {
                      // Check if this word is in the stressed list for this level
                      // Normalize for checking (remove punct, lowercase)
                      const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
                      const isStressed = EXPANSION_DRILL[expansionIndex].stress.map(s => s.toLowerCase()).includes(cleanWord);

                      return (
                        <span key={i} className={isStressed ? "font-black text-indigo-600 text-3xl mx-1" : "text-sm text-slate-400 mx-0.5"}>
                          {word}
                        </span>
                      )
                    })}
                  </div>

                  <div className="flex justify-center gap-4 mb-8">
                    {[1, 2, 3].map((beat) => (
                      <div key={beat} className="w-4 h-4 rounded-full bg-indigo-500 animate-pulse"></div>
                    ))}
                  </div>

                  <button
                    onClick={() => playSound(EXPANSION_DRILL[expansionIndex].text)}
                    className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-200"
                  >
                    <Volume2 className="w-10 h-10" />
                  </button>
                </div>

                <div className="flex justify-between mt-8 pt-6 border-t border-slate-50">
                  <button
                    onClick={() => setExpansionIndex(prev => Math.max(0, prev - 1))}
                    disabled={expansionIndex === 0}
                    className="text-slate-400 font-bold text-sm hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <button
                    onClick={() => setExpansionIndex(prev => Math.min(EXPANSION_DRILL.length - 1, prev + 1))}
                    disabled={expansionIndex === EXPANSION_DRILL.length - 1}
                    className="text-slate-400 font-bold text-sm hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    Next <ChevronLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {tabId === 'rhymes' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Lagu Anak-Anak
                </h3>
                <p className="text-sm text-slate-600">
                  Sajak anak-anak sempurna untuk berlatih ritme karena memiliki ketukan yang sangat kuat.
                </p>
              </div>

              {NURSERY_RHYMES.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="p-5">
                    <h4 className="font-bold text-indigo-700 mb-3">{item.title}</h4>
                    <p className="text-xl font-medium text-slate-800 leading-snug mb-4 font-mono">
                      {item.text}
                    </p>
                    <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      💡 {item.hint}
                    </p>
                  </div>
                  <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => playSound(item.text, 0.8)}
                      className="flex-1 bg-white border border-slate-200 rounded-lg py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Volume2 className="w-4 h-4" /> Dengar
                    </button>
                  </div>
                </div>
              ))}
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

export default InterPronunLesson4;
