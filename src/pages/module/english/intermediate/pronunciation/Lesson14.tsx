
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { Mic, BookOpen, PenTool, CheckCircle2, XCircle, Trophy, Lightbulb, Sparkles, Star, Volume2, Target, TrendingUp, BarChart, Zap } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';






const ACCENT_CONCEPTS = [
  {
    title: "Aksen vs. Kesalahan",
    desc: "**Aksen** adalah 'musik' dari suara Anda. Itu menunjukkan dari mana Anda berasal. **Kesalahan Pengucapan** mengubah arti (misalnya, mengatakan 'Sink' alih-alih 'Think'). Kesalahan itu buruk; Aksen itu baik-baik saja!",
    icon: "⚖️",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    title: "Keterpahaman",
    desc: "Tujuannya adalah **Kejelasan**, bukan terdengar 'Native'. Jika orang memahami Anda dengan mudah, pengucapan Anda bagus, bahkan jika Anda memiliki aksen.",
    icon: "🎯",
    color: "bg-emerald-50 text-emerald-700 border-blue-200"
  },
  {
    title: "Bunyi 'R' (Rhotisitas)",
    desc: "Dalam bahasa Inggris **Amerika**, kita biasanya mengucapkan 'R' di akhir kata (Car, Hard). Dalam bahasa Inggris **Inggris** (RP), 'R' sering kali diam (Ca_, Ha_d).",
    icon: "🦅",
    color: "bg-red-50 text-red-700 border-red-200"
  },
  {
    title: "Bunyi 'T'",
    desc: "Dalam bahasa Inggris **Amerika**, 'T' di antara vokal sering terdengar seperti 'D' lembut (Water = Wadder). Dalam bahasa Inggris **Inggris**, biasanya 'T' yang jelas.",
    icon: "☕",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200"
  }
];

const ACCENT_COMPARISONS = [
  {
    word: "Water",
    us_ipa: "/ˈwɔːtər/ (Wadder)",
    uk_ipa: "/ˈwɔːtə/ (War-tuh)",
    desc: "US: Flap T (D Lembut). UK: True T."
  },
  {
    word: "Car",
    us_ipa: "/kɑːr/ (Carrr)",
    uk_ipa: "/kɑː/ (Caa)",
    desc: "US: R Keras. UK: R Diam."
  },
  {
    word: "Better",
    us_ipa: "/ˈbɛtər/ (Bedder)",
    uk_ipa: "/ˈbɛtə/ (Bet-uh)",
    desc: "US: Flap T + R. UK: True T + R Diam."
  },
  {
    word: "Tomato",
    us_ipa: "/təˈmeɪtoʊ/ (To-MAY-to)",
    uk_ipa: "/təˈmɑːtəʊ/ (To-MAH-to)",
    desc: "Bunyi vokal yang berbeda."
  },
  {
    word: "Schedule",
    us_ipa: "/ˈskɛdʒuːl/ (Sked-jool)",
    uk_ipa: "/ˈʃɛdjuːl/ (Shed-yool)",
    desc: "K Keras vs bunyi SH lembut."
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Apakah memiliki aksen adalah hal yang buruk?",
    options: ['Ya, selalu.', 'Tidak, asalkan Anda jelas.', 'Ya, Anda harus terdengar seperti orang Amerika.'],
    answer: 'Tidak, asalkan Anda jelas.',
    explanation: "Aksen Anda adalah bagian dari identitas Anda. Kejelasan adalah yang terpenting."
  },
  {
    id: 2,
    question: "Dalam Bahasa Inggris British Standar, 'R' di akhir kata 'Car' biasanya...",
    options: ['Diucapkan dengan kuat', 'Diam / Lembut', 'Digulung seperti bahasa Spanyol'],
    answer: 'Diam / Lembut',
    explanation: "Bahasa Inggris British Standar adalah non-rhotis, artinya mereka menghilangkan R di akhir kata."
  },
  {
    id: 3,
    question: "Orang Amerika biasanya mengucapkan 'T' dalam 'Water' seperti...",
    options: ['T yang renyah', 'D yang lembut (Flap T)', 'Bunyi diam'],
    answer: 'D yang lembut (Flap T)',
    explanation: "Ini disebut 'Flap T'."
  },
  { id: 4, question: "Mengucapkan 'Sink' alih-alih 'Think' adalah...", options: ['Hanya aksen', 'Kesalahan pengucapan'], answer: 'Kesalahan pengucapan', explanation: "Ini adalah kesalahan karena mengubah arti kata." },
  { id: 5, question: "Flap T (seperti dalam 'Water' = 'Wadder') paling umum di...", options: ['American English', 'British English', 'Australian English'], answer: 'American English', explanation: "Americans often pronounce /t/ between vowels as a soft D/flap." },
  { id: 6, question: "'Non-rhotic' accent  berarti...", options: ['R di akhir kata tidak terdengar / silent', 'R sangat kuat', 'Semua R digulung'], answer: 'R di akhir kata tidak terdengar / silent', explanation: "Standard British English = non-rhotic (Car = 'Caa')." },
  { id: 7, question: "'Rhotic' accent berarti...", options: ['R selalu diucapkan', 'R selalu silent', 'R digulung'], answer: 'R selalu diucapkan', explanation: "American English = rhotic (Car = 'Carrr')." },
  { id: 8, question: "Tujuan pronunciation yang baik adalah...", options: ['Terdengar 100% native', 'Intelligibility / Kejelasan', 'No accent at all'], answer: 'Intelligibility / Kejelasan', explanation: "Goal = to be understood clearly, not to hide your identity." },
  { id: 9, question: "'Tomato' di US vs UK dalam...", options: ['Consonants', 'Vowel sound', 'Stress pattern'], answer: 'Vowel sound', explanation: "US = to-MAY-to, UK = to-MAH-to." },
  { id: 10, question: "'Schedule' di US dimulai dengan bunyi...", options: ['/sk/ (Sked)', '/ʃ/ (Shed)', '/tʃ/ (Ched)'], answer: '/sk/ (Sked)', explanation: "US = 'SKedule'. UK = 'SHedule'." },
  { id: 11, question: "'Better' di American English sering terdengar seperti...", options: ['Bet-ter (T jelas)', 'Bed-der (Flap T)', 'Bet-uh (no T)'], answer: 'Bed-der (Flap T)', explanation: "T between vowels → soft D flap." },
  { id: 12, question: "Apakah aksen menunjukkan level pendidikan?", options: ['Ya', 'Tidak'], answer: 'Tidak', explanation: "Accent shows where you're from, not intelligence or education." },
  { id: 13, question: "Jika pendengar sering salah paham dengan Anda, masalahnya mungkin...", options: ['Accent Anda', 'Pronunciation errors', 'Volume Anda'], answer: 'Pronunciation errors', explanation: "Errors (not accent) cause misunderstanding." },
  { id: 14, question: "British RP (Received Pronunciation) sering menghilangkan bunyi...", options: ['R di akhir kata', 'T di akhir kata', 'L di akhir kata'], answer: 'R di akhir kata', explanation: "RP = non-rhotic, R often silent at end." },
  { id: 15, question: "'Bottle' di British English/Cockney sering diucapkan dengan...", options: ['Strong T', "Glottal stop (Bo'le)", 'No T sound'], answer: "Glottal stop (Bo'le)", explanation: "Glottal stop replaces T in many UK accents." },
  { id: 16, question: "Untuk meningkatkan intelligibility, fokus pada...", options: ['Menghilangkan aksen sepenuhnya', 'Clear consonants, stress, dan intonation', 'Speaking louder'], answer: 'Clear consonants, stress, dan intonation', explanation: "Clarity comes from good articulation, stress, intonation." },
  { id: 17, question: "Contoh 'acceptable accent'?", options: ['Indian English', 'Singaporean English', 'Nigerian English', 'All of the above'], answer: 'All of the above', explanation: "ALL accents are valid as long as you're clear!" },
  { id: 18, question: "Jika Anda ingin terdengar American, practice...", options: ['Rhoticity (strong R), flap T', 'Silent R, clear T', 'Rolling Rs'], answer: 'Rhoticity (strong R), flap T', explanation: "American = R pronounced, T often becomes flap." },
  { id: 19, question: "Jika Anda ingin terdengar British (RP), practice...", options: ['Non-rhoticity (silent R), clear T', 'Strong R, flap T', 'No T sounds'], answer: 'Non-rhoticity (silent R), clear T', explanation: "British RP = R often silent, T pronounced clearly." },
  { id: 20, question: "Best mindset untuk pronunciation?", options: ['Harus sempurna seperti native', 'Clear dan confident, accent OK', 'Hide your accent'], answer: 'Clear dan confident, accent OK', explanation: "Confidence + clarity > perfect accent. Your accent is part of you!" }
];

const InterPronunLesson14: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 14);
    const nextLessonPath = 14 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${14 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'concept' | 'compare' | 'quiz'>('concept');

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Logic
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const playSound = (text: string, rateOrLabel: number | string = 0.9, maybeRate?: number) => { const rate = typeof rateOrLabel === "number" ? rateOrLabel : (maybeRate ?? 0.9); playAudio(text, rate); };

  // Quiz Handlers
  const handleCheckQuiz = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);
    if (option === QUIZ_QUESTIONS[quizStep].answer) {
      setQuizScore(prev => prev + 1);
      playSound("Benar!", 'US');
    } else {
      playSound("Salah.", 'US');
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
                lessonLabel={"Intermediate Pronunciation Lesson 14"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Kesadaran Aksen"
                subtitle="Pronunciation • Pelajaran 14"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'concept', label: 'Konsep', icon: <BookOpen size={14} /> },
                    { id: 'compare', label: 'AS vs Inggris', icon: <BookOpen size={14} /> },
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
              <section className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Mic className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Anda Tidak Perlu Menjadi "Sempurna"</h2>
                  <p className="text-sky-100 text-sm leading-relaxed">
                    Bahasa Inggris adalah bahasa global. Tidak apa-apa terdengar seperti orang Indonesia, Prancis, atau Jepang!
                    <br /><br />
                    Hal yang paling penting adalah orang <b>mengerti</b> Anda.
                  </p>
                </div>
              </section>

              <div className="space-y-4">
                {ACCENT_CONCEPTS.map((concept, idx) => (
                  <div key={idx} className={`rounded-2xl border p-5 ${concept.color.replace('text-', 'border-').split(' ')[2] || 'border-slate-200'} bg-white flex items-start gap-4 shadow-sm`}>
                    <div className="text-3xl bg-white p-2 rounded-xl shadow-sm border border-slate-50 flex-shrink-0">
                      {concept.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold mb-1 ${concept.color.split(' ')[1]}`}>{concept.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{concept.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabId === 'compare' && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                <p className="text-sm text-slate-600 font-medium">Ketuk bendera untuk mendengar perbedaannya!</p>
              </div>

              {ACCENT_COMPARISONS.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 mb-1 text-center">{item.word}</h3>
                  <p className="text-xs text-slate-400 text-center mb-6">{item.desc}</p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => playSound(item.word, 'US')}
                      className="flex-1 bg-red-50 border border-red-100 p-3 rounded-xl flex flex-col items-center hover:bg-red-100 transition-colors active:scale-95"
                    >
                      <span className="text-2xl mb-1">🇺🇸</span>
                      <span className="text-xs font-bold text-red-700">Amerika</span>
                      <span className="text-[10px] text-red-500 font-mono mt-1">{item.us_ipa}</span>
                    </button>

                    <button
                      onClick={() => playSound(item.word, 'UK')}
                      className="flex-1 bg-blue-50 border border-blue-100 p-3 rounded-xl flex flex-col items-center hover:bg-blue-100 transition-colors active:scale-95"
                    >
                      <span className="text-2xl mb-1">🇬🇧</span>
                      <span className="text-xs font-bold text-blue-700">Inggris</span>
                      <span className="text-[10px] text-blue-500 font-mono mt-1">{item.uk_ipa}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tabId === 'quiz' && (
            <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-sky-50 text-sky-600 px-2 py-1 rounded">Skor: {quizScore}</span>
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
                    className="px-8 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-200"
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

export default InterPronunLesson14;
