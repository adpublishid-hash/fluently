
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Star, TrendingUp } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';






const MAGIC_SENTENCE = [
  {
    word: "I",
    text: "I didn't say he stole the money.",
    emphasis: "I",
    meaning: "Orang lain yang mengatakannya, bukan saya."
  },
  {
    word: "didn't",
    text: "I DIDN'T say he stole the money.",
    emphasis: "DIDN'T",
    meaning: "Saya menyangkalnya dengan keras. Itu tidak benar."
  },
  {
    word: "say",
    text: "I didn't SAY he stole the money.",
    emphasis: "SAY",
    meaning: "Saya hanya menyiratkannya, atau saya menuliskannya."
  },
  {
    word: "he",
    text: "I didn't say HE stole the money.",
    emphasis: "HE",
    meaning: "Orang lain yang mencurinya, bukan dia."
  },
  {
    word: "stole",
    text: "I didn't say he STOLE the money.",
    emphasis: "STOLE",
    meaning: "Mungkin dia meminjamnya atau menemukannya."
  },
  {
    word: "money",
    text: "I didn't say he stole the MONEY.",
    emphasis: "MONEY",
    meaning: "Dia mencuri hal lain (seperti perhiasan)."
  }
];

const QUIZ_QUESTIONS = [
  { id: 1, question: "Jika saya berkata 'SHE likes coffee' (menekankan 'She'), apa maksud saya?", options: ['Dia sangat menyukainya.', 'Orang lain tidak menyukainya.', 'Dia benci teh.'], answer: 'Orang lain tidak menyukainya.', explanation: "Menekankan subjek biasanya membedakannya dengan orang lain." },
  { id: 2, question: "Arti: 'I want the RED car.' (Bukan yang biru). Di mana penekanannya?", options: ['I', 'RED', 'CAR'], answer: 'RED', explanation: "Anda menekankan kata sifat untuk membedakannya dari pilihan lain." },
  { id: 3, question: "Arti: 'I can't DO it.' (Tapi saya bisa mencoba). Di mana penekanannya?", options: ['CAN\'T', 'DO', 'IT'], answer: 'DO', explanation: "Menekankan kata kerja menekankan tindakan spesifik yang tidak dapat Anda lakukan." },
  { id: 4, question: "Dengarkan: 'I never said she STOLE it.' Apa implikasinya?", options: ['Dia meminjamnya.', 'Dia mencurinya.', 'Saya tidak mengatakannya.'], answer: 'Dia meminjamnya.', explanation: "Menekankan kata kerja 'st ole' menunjukkan dia melakukan sesuatu yang lain dengannya (seperti meminjam)." },
  { id: 5, question: "'I DIDN'T say he stole the money.' - Apa maksudnya?", options: ['Saya menyiratkannya', 'Saya menyangkalnya dengan keras', 'Saya bisikan'], answer: 'Saya menyangkalnya dengan keras', explanation: "Penekanan 'DIDN\'T' memperkuat penyangkalan/negasi." },
  { id: 6, question: "'I didn't say HE stole the money.' - Siapa pencurinya?", options: ['Dia', 'Orang lain', 'Tidak ada yang mencuri'], answer: 'Orang lain', explanation: "Men ekankan 'HE' berarti orang lain yang melakukannya." },
  { id: 7, question: "'I didn't say he stole the MONEY.' - Apa yang dicuri?", options: ['Uang', 'Sesuatu yang lain (perhiasan dll)', 'Tidak ada'], answer: 'Sesuatu yang lain (perhiasan dll)', explanation: "Menekankan 'MONEY' menunjukkan benda lain yang dicuri." },
  { id: 8, question: "Dalam 'Do YOU want coffee?' (penekanan pada YOU), apa implikasinya?", options: ['Saya ingin tahu keinginan Anda', 'Anda berbeda dari orang lain', 'Saya tidak suka kopi'], answer: 'Anda berbeda dari orang lain', explanation: "Penekanan kontrastif membedakan 'you' dari orang lain yang mungkin menginginkan kopi." },
  { id: 9, question: "Apa fungsi utama penekanan kalimat dalam bahasa Inggris?", options: ['Terdengar lebih keras', 'Mengubah makna/fokus', 'Dekor an saja'], answer: 'Mengubah makna/fokus', explanation: "Sentence stress mengontrol informasi mana yang paling penting/kontras." },
  { id: 10, question: "'I didn't SAY he stole the money.' - Bagaimana saya mengomunikasikannya?", options: ['Saya mengatakannya', 'Saya menyiratkan / menulis', 'Saya berteriak'], answer: 'Saya menyiratkan / menulis', explanation: "Menekankan 'SAY' berarti saya gunakan cara lain (tulis, hint, dll)." },
  { id: 11, question: "'They want to BUY a house' vs 'They want to buy a HOUSE' - Apa bedanya?", options: ['Tidak ada bedanya', 'Pertama = fokus aksi, Kedua = fokus objek', 'Keduanya salah'], answer: 'Pertama = fokus aksi, Kedua = fokus objek', explanation: "BUY (bukan sewa) vs HOUSE (bukan apartemen)." },
  { id: 12, question: "Kata mana yang biasanya TIDAK ditekan dalam kalimat netral?", options: ['Kata benda (nouns)', 'Kata kerja (verbs)', 'Kata hubung (and, but)'], answer: 'Kata hubung (and, but)', explanation: "Function words (a, the, and, but) biasanya lemah kecuali ada penekanan kontrastif." },
  { id: 13, question: "'I NEVER said that!' - Apa yang ditegaskan?", options: ['Saya pernah mengatakannya', 'Saya sama sekali tidak pernah mengatakan', 'Saya lupa'], answer: 'Saya sama sekali tidak pernah mengatakan', explanation: "Penekanan 'NEVER' memperkuat penolakan total." },
  { id: 14, question: "Dalam 'She bought a BLUE dress', apa yang dikontraskan?", options: ['Siapa yang membeli', 'Warna dress', 'Jenis pakaian'], answer: 'Warna dress', explanation: "BLUE dikontraskan dengan warna lain (bukan merah, hijau, dll)." },
  { id: 15, question: "'I asked HER, not HIM.' - Kata mana yang ditekan?", options: ['asked', 'HER dan HIM', 'I'], answer: 'HER dan HIM', explanation: "Kedua pronoun ditekan untuk kontras langsung." },
  { id: 16, question: "Mengapa penekanan kontrastif penting dalam percakapan?", options: ['Untuk klarifikasi / memperbaiki kesalahpahaman', 'Untuk berbicara lebih cepat', 'Tidak penting '], answer: 'Untuk klarifikasi / memperbaiki kesalahpahaman', explanation: "Contrastive stress membantu memperjelas informasi yang salah atau ambigu." },
  { id: 17, question: "'I want THE book' (penekanan 'THE') - Apa maksudnya?", options: ['Buku tertentu yang sudah dikenal', 'Buku apa saja', 'Saya tidak mau buku'], answer: 'Buku tertentu yang sudah dikenal', explanation: "Menekankan 'THE' menunjukkan buku specific yang kita berdua tahu." },
  { id: 18, question: "'Can you HELP me?' vs 'Can YOU help me?' - Apa perbedaannya?", options: ['Pertama = permintaan umum, Kedua = hanya kamu (bukan orang lain)', 'Tidak ada beda', 'Keduanya kasar'], answer: 'Pertama = permintaan umum, Kedua = hanya kamu (bukan orang lain)', explanation: "Penekanan pada YOU membedakan dari orang lain yang mungkin bisa bantu." },
  { id: 19, question: "'That's MY bag!' (penekanan MY) - Apa yang ditegaskan?", options: ['Tas itu milik saya (bukan orang lain)', 'Tas itu bagus', 'Tas itu mahal'], answer: 'Tas itu milik saya (bukan orang lain)', explanation: "Penekanan possessive menunjukkan kepemilikan kontrastif." },
  { id: 20, question: "Dalam kalimat netral (tanpa kontras khusus), kata mana yang biasanya mendapat penekanan utama?", options: ['Kata terakhir yang bermakna (content word)', 'Kata pertama', 'Kata tengah'], answer: 'Kata terakhir yang bermakna (content word)', explanation: "Dalam kalimat netral, penekanan jatuh di content word terakhir (noun/verb/adjective)." }
];

const InterPronunLesson3: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 3);
    const nextLessonPath = 3 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${3 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'concept' | 'magic' | 'quiz'>('concept');

  // Magic Sentence State
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);

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
                lessonLabel={"Intermediate Pronunciation Lesson 3"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Penekanan Kalimat"
                subtitle="Pronunciation • Pelajaran 3"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'concept', label: 'Konsep', icon: <BookOpen size={14} /> },
                    { id: 'magic', label: 'Kalimat Ajaib', icon: <BookOpen size={14} /> },
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
                            

          {tabId === 'concept' && (
            <>
              {/* Intro */}
              <section className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendingUp className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Penekanan Mengubah Makna</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Dalam bahasa Inggris, Anda dapat mengubah arti kalimat hanya dengan mengucapkan satu kata <b>LEBIH KERAS</b>. Ini disebut "Penekanan Kontrastif".
                  </p>
                </div>
              </section>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Cara kerjanya
                </h3>
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="font-medium text-slate-600 mb-2">Contoh Kalimat:</p>
                    <p className="text-lg font-bold text-slate-800 mb-4">"I never said she stole my money."</p>
                    <p className="text-sm text-slate-600">Satu kalimat ini dapat memiliki <b>7 arti berbeda</b> tergantung pada kata mana yang Anda tekan!</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {tabId === 'magic' && (
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 border border-indigo-50 relative overflow-hidden">

                <div className="text-center mb-8">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Ketuk kata untuk menekannya</h3>
                  <p className="text-xs text-slate-500">Lihat bagaimana maknanya berubah!</p>
                </div>

                {/* Word Buttons */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {MAGIC_SENTENCE.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedWordIndex(idx);
                        playSound(item.text);
                      }}
                      className={`px-3 py-2 rounded-lg font-bold text-sm transition-all transform hover:scale-110 active:scale-95 ${selectedWordIndex === idx
                        ? 'bg-indigo-600 text-white shadow-lg scale-110'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                      {item.word}
                    </button>
                  ))}
                </div>

                {/* Meaning Display */}
                <div className="bg-indigo-50 rounded-2xl p-6 text-center border border-indigo-100 min-h-[140px] flex flex-col justify-center items-center transition-all">
                  {selectedWordIndex !== null ? (
                    <>
                      <h4 className="text-indigo-900 font-bold text-xl mb-2">"{MAGIC_SENTENCE[selectedWordIndex].emphasis}"</h4>
                      <p className="text-indigo-700 font-medium text-lg leading-snug">
                        {MAGIC_SENTENCE[selectedWordIndex].meaning}
                      </p>
                    </>
                  ) : (
                    <p className="text-indigo-400 font-medium">Pilih kata di atas...</p>
                  )}
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

                  <h3 className="text-lg font-bold text-slate-800 mb-6">
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

export default InterPronunLesson3;
