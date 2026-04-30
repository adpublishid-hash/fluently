
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { RefreshCw, BookOpen, PenTool, CheckCircle2, XCircle, Trophy, Lightbulb, Sparkles, Star, Volume2, Target, TrendingUp, BarChart, Zap } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';




// Custom Icon for Links
const ChainIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);



const LINKING_VOWELS = [
  {
    rule: "Bunyi /w/",
    desc: "Ketika sebuah kata berakhir dengan O atau U, tambahkan 'w' kecil untuk menghubungkan ke vokal berikutnya.",
    examples: [
      { text: "Go out", phonetic: "Go /w/ out" },
      { text: "Two apples", phonetic: "Two /w/ apples" },
      { text: "Do it", phonetic: "Do /w/ it" }
    ]
  },
  {
    rule: "Bunyi /y/",
    desc: "Ketika sebuah kata berakhir dengan E atau I, tambahkan 'y' (j) kecil untuk menghubungkan.",
    examples: [
      { text: "I am", phonetic: "I /y/ am" },
      { text: "See it", phonetic: "See /y/ it" },
      { text: "The end", phonetic: "The /y/ end" }
    ]
  }
];

const REDUCTIONS = [
  { formal: "Going to", casual: "Gonna", example: "I'm gonna sleep." },
  { formal: "Want to", casual: "Wanna", example: "I wanna go." },
  { formal: "Have to", casual: "Gotta", example: "I gotta run." },
  { formal: "Kind of", casual: "Kinda", example: "It's kinda hot." },
  { formal: "Let me", casual: "Lemme", example: "Lemme help you." },
];

const ASSIMILATION = [
  {
    title: "T + Y = CH",
    visual: "Don't you ➔ Don-choo",
    example: "Don't you like it?",
    phonetic: "Don-choo like it?"
  },
  {
    title: "D + Y = J",
    visual: "Did you ➔ Did-joo",
    example: "Did you see it?",
    phonetic: "Did-joo see it?"
  },
  {
    title: "S + Y = SH",
    visual: "Miss you ➔ Mish-yoo",
    example: "I miss you.",
    phonetic: "I mish-yoo."
  }
];

const QUIZ_QUESTIONS = [
  { id: 1, question: "Bagaimana penutur asli biasanya mengucapkan 'Go out'?", options: ['Go out (Jeda)', 'Go-w-out (Hubungkan dengan W)', 'Go-y-out (Hubungkan dengan Y)'], answer: 'Go-w-out (Hubungkan dengan W)', explanation: "Karena 'Go' diakhiri dengan bunyi bibir bulat, kita menghubungkan dengan /w/." },
  { id: 2, question: "Apa bentuk reduksi dari 'Want to'?", options: ['Wonnot', 'Wanna', 'Wan-two'], answer: 'Wanna', explanation: "'Wanna' adalah reduksi kasual umum dari 'Want to'." },
  { id: 3, question: "Dalam pembicaraan cepat, 'Did you' sering terdengar seperti...", options: ['Did-yoo', 'Did-joo', 'Did-shoo'], answer: 'Did-joo', explanation: "Bunyi D dan Y menyatu menjadi bunyi /dʒ/ (J)." },
  { id: 4, question: "Haruskah Anda menulis 'Gonna' dalam email bisnis formal?", options: ['Ya, itu standar.', 'Tidak, itu hanya untuk berbicara.'], answer: 'Tidak, itu hanya untuk berbicara.', explanation: "Reduksi terutama untuk bahasa Inggris lisan atau pesan teks yang sangat kasual." },
  { id: 5, question: "'See it' diucapkan sebagai...", options: ['See-y-it', 'See-w-it', 'See / it (jeda)'], answer: 'See-y-it', explanation: "Kata yang berakhir dengan /i:/ (ee) menghubungkan ke vokal berikutnya dengan bunyi /y/." },
  { id: 6, question: "'Two apples' terdengar seperti...", options: ['Two apples (terpisah)', 'Two-w-apples', 'Two-y-apples'], answer: 'Two-w-apples', explanation: "Bunyi /u:/ (oo) menghubungkan dengan /w/." },
  { id: 7, question: "Bentuk reduksi 'Going to' adalah...", options: ['Gointo', 'Gonna', 'Gonto'], answer: 'Gonna', explanation: "'Gonna' sangat umum dalam percakapan informal." },
  { id: 8, question: "'Have to' biasanya diucapkan sebagai...", options: ['Have to', 'Hafta / Gotta', 'Havta'], answer: 'Hafta / Gotta', explanation: "'Gotta' atau 'hafta' adalah reduksi umum dari 'have to'." },
  { id: 9, question: "Dalam 'Don't you', bunyi T+Y menjadi...", options: ['/ch/ (Don-choo)', '/sh/', '/j/'], answer: '/ch/ (Don-choo)', explanation: "T + Y = CH sound dalam connected speech." },
  { id: 10, question: "'Miss you' terdengar seperti...", options: ['Miss you', 'Mish-you', 'Mis-joo'], answer: 'Mish-you', explanation: "S + Y = SH sound (assimilation)." },
  { id: 11, question: "Mengapa native speakers menggunakan linking dan reductions?", options: ['Untuk berbicara lebih cepat dan lancar', 'Karena malas', 'For terdengar lebih formal'], answer: 'Untuk berbicara lebih cepat dan lancar', explanation: "Connected speech adalah natural flow dalam bahasa Inggris." },
  { id: 12, question: "'Kind of' berubah menjadi...", options: ['Kinov', 'Kinda', 'Kindoff'], answer: 'Kinda', explanation: "'Kind of' → 'kinda' dalam casual speech." },
  { id: 13, question: "'I am' sering diucapkan sebagai...", options: ['I am', 'I-y-am', 'I-w-am'], answer: 'I-y-am', explanation: "Bunyi /aɪ/ menghubungkan ke vokal dengan /y/." },
  { id: 14, question: "'Let me' berubah menjadi...", options: ['Letme', 'Lemme', 'Letmi'], answer: 'Lemme', explanation: "'Lemme' adalah reduksi sangat umum dari 'let me'." },
  { id: 15, question: "Apakah reduksi dan linking hanya untuk slang?", options: ['Ya, hanya slang', 'Tidak, ini natural for ALL native speakers'], answer: 'Tidak, ini natural for ALL native speakers', explanation: "Semua penutur asli menggunakan connected speech tanpa sadar." },
  { id: 16, question: "'Do it' diucapkan sebagai...", options: ['Do it (terpisah)', 'Do-w-it', 'Do-y-it'], answer: 'Do-w-it', explanation: "Bunyi /u:/ menghubungkan dengan /w/." },
  { id: 17, question: "Dalam 'Would you', bunyi D+Y menjadi...", options: ['/j/ (Would-joo)', '/ch/', '/sh/'], answer: '/j/ (Would-joo)', explanation: "D + Y = J sound (assimilation)." },
  { id: 18, question: "Apa perbedaan formal vs casual speech?", options: ['Formal = jelas terpisah, Casual = linked and reduced', 'Tidak ada beda', 'Casual = lebih lambat'], answer: 'Formal = jelas terpisah, Casual = linked and reduced', explanation: "Dalam formal speech, kita ucapkan lebih jelas. Casual = lebih banyak linking." },
  { id: 19, question: "'The end' diucapkan sebagai...", options: ['The end', 'The-y-end', 'The-w-end'], answer: 'The-y-end', explanation: "Schwa /ə/ atau /i:/ sound menghubungkan dengan /y/." },
  { id: 20, question: "Untuk terdengar natural, Anda harus...", options: ['Ucapkan semua kata terpisah dengan jelas', 'Gunakan linking, reductions, assimilation', 'Bicara sangat pelan'], answer: 'Gunakan linking, reductions, assimilation', explanation: "Connected speech adalah kunci kefasihan natural." }
];

const InterPronunLesson6: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 6);
    const nextLessonPath = 6 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${6 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'linking' | 'reduction' | 'blending' | 'quiz'>('linking');

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
                lessonLabel={"Intermediate Pronunciation Lesson 6"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Ucapkan Terhubung"
                subtitle="Pronunciation • Pelajaran 6"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'linking', label: 'Bunyi Tersembunyi', icon: <BookOpen size={14} /> },
                    { id: 'reduction', label: 'Reduksi', icon: <BookOpen size={14} /> },
                    { id: 'blending', label: 'Penyatuan', icon: <BookOpen size={14} /> },
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
                            

          {tabId === 'linking' && (
            <>
              {/* Intro */}
              <section className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <ChainIcon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Bunyi Tersembunyi</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Ketika dua vokal bertemu, penutur bahasa Inggris secara alami menambahkan bunyi tersembunyi (/w/ atau /y/) agar mengalir dengan lancar.
                  </p>
                </div>
              </section>

              <div className="space-y-6">
                {LINKING_VOWELS.map((group, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <h3 className="font-bold text-slate-800 text-lg mb-2">{group.rule}</h3>
                    <p className="text-sm text-slate-600 mb-4">{group.desc}</p>

                    <div className="space-y-2">
                      {group.examples.map((ex, i) => (
                        <button
                          key={i}
                          onClick={() => playSound(ex.text)}
                          className="w-full flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 hover:bg-indigo-50 hover:border-indigo-100 transition-all group"
                        >
                          <span className="font-bold text-slate-700">{ex.text}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-indigo-500 font-bold bg-white px-2 py-1 rounded border border-indigo-100">{ex.phonetic}</span>
                            <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabId === 'reduction' && (
            <>
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                <div className="flex items-start gap-4">
                  <RefreshCw className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-800 mb-2">Gonna, Wanna, Gotta</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Dalam pembicaraan santai, kami menyingkat frasa umum.
                      <br /><br />
                      <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">⚠️ Catatan: Hanya gunakan ini saat BERBICARA, bukan menulis!</span>
                    </p>
                  </div>
                </div>
              </section>

              <div className="grid gap-3">
                {REDUCTIONS.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{item.formal}</span>
                      <span className="text-lg font-black text-orange-600">➜ {item.casual}</span>
                    </div>

                    <div className="flex items-center justify-between bg-orange-50 p-3 rounded-xl">
                      <span className="text-sm text-orange-900 font-medium italic">"{item.example}"</span>
                      <button
                        onClick={() => playSound(item.example)}
                        className="w-8 h-8 rounded-full bg-white text-orange-600 flex items-center justify-center hover:bg-orange-200 transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabId === 'blending' && (
            <div className="max-w-xl mx-auto pt-4">
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Zap className="w-32 h-32" />
                </div>

                <h3 className="text-center font-bold text-xl mb-2 flex items-center justify-center gap-2 relative z-10">
                  Asimilasi
                </h3>
                <p className="text-indigo-200 text-sm text-center mb-8 relative z-10">
                  Ketika bunyi berubah bersama untuk menciptakan bunyi baru.
                </p>

                <div className="space-y-6 relative z-10">
                  {ASSIMILATION.map((item, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-lg text-yellow-300">{item.title}</h4>
                        <span className="text-xs font-mono bg-black/30 px-2 py-1 rounded text-white">{item.visual}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-white mb-1">{item.example}</p>
                          <p className="text-xs text-indigo-300 font-mono">/{item.phonetic}/</p>
                        </div>
                        <button
                          onClick={() => playSound(item.example)}
                          className="w-10 h-10 rounded-full bg-white text-indigo-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
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

export default InterPronunLesson6;
