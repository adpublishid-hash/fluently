
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { Briefcase, ChevronLeft, BookOpen, PenTool, CheckCircle2, XCircle, Trophy, Lightbulb, Sparkles, Star, Volume2, Target, TrendingUp, BarChart, Zap } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';






const FORMAL_TIPS = [
  {
    title: "Ucapkan dengan Jelas",
    desc: "Jangan bergumam atau menghilangkan suara. Ucapkan akhir kata Anda, terutama 'T', 'D', dan '-ING'.",
    example: "Going (bukan Goin'), Internet (bukan Inner-net).",
    icon: "🗣️",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    title: "Hindari Reduksi",
    desc: "Dalam suasana formal, gunakan bentuk lengkap. Hindari 'Gonna', 'Wanna', 'Gotta', or 'Lemme'.",
    example: "I am going to (bukan I'm gonna).",
    icon: "🚫",
    color: "bg-red-50 text-red-700 border-red-200"
  },
  {
    title: "Kecepatan Terkendali",
    desc: "Bicaralah sedikit lebih lambat dari biasanya. Jeda menunjukkan kepercayaan diri dan memberi Anda waktu untuk berpikir.",
    example: "Jeda pada koma dan titik.",
    icon: "🐢",
    color: "bg-emerald-50 text-emerald-700 border-blue-200"
  },
  {
    title: "Intonasi Sopan",
    desc: "Gunakan rentang nada yang lebih luas agar terdengar tertarik dan sopan. Suara datar bisa terdengar bosan atau kasar.",
    example: "Gunakan Nada Naik ↗ untuk permintaan.",
    icon: "📈",
    color: "bg-purple-50 text-purple-700 border-purple-200"
  }
];

const STYLE_COMPARISON = [
  {
    id: 1,
    casual: { text: "I wanna ask ya somethin'.", type: "Kasual (Direduksi)" },
    formal: { text: "I would like to ask you a question.", type: "Formal (Jelas)" }
  },
  {
    id: 2,
    casual: { text: "Gimme a sec.", type: "Kasual (Slang)" },
    formal: { text: "Could you give me a moment?", type: "Formal (Sopan)" }
  },
  {
    id: 3,
    casual: { text: "What'cha doin'?", type: "Kasual (Digabung)" },
    formal: { text: "What are you doing?", type: "Formal (Diucapkan Jelas)" }
  },
  {
    id: 4,
    casual: { text: "I dunno.", type: "Kasual (Bergumam)" },
    formal: { text: "I do not know.", type: "Formal (Tepat)" }
  },
  {
    id: 5,
    casual: { text: "It's probly fine.", type: "Kasual (Bunyi hilang)" },
    formal: { text: "It is probably fine.", type: "Formal (Bunyi penuh)" }
  }
];

const INTERVIEW_DRILL = [
  { text: "I am interested in this position.", tip: "Tekankan 'In-te-res-ted' dengan jelas." },
  { text: "Could you please repeat that?", tip: "Gunakan intonasi Naik ↗ untuk kesopanan." },
  { text: "Thank you for your time.", tip: "Ucapkan 'Thank', jangan bilang 'Thanks'." },
  { text: "I have experience in management.", tip: "Ucapkan 't' dalam 'Management' dengan jelas." },
  { text: "I look forward to hearing from you.", tip: "Hubungkan 'look-forward', tapi jaga kata-kata tetap jelas." }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Dalam wawancara kerja, lebih baik mengatakan:",
    options: ['"I wanna work here."', '"I want to work here."'],
    answer: '"I want to work here."',
    explanation: "Hindari reduksi seperti 'wanna' dalam situasi profesional atau formal."
  },
  {
    id: 2,
    question: "Apa artinya 'Enunciate'?",
    options: ['Bicara cepat', 'Bicara jelas dan mengucapkan bunyi sepenuhnya', 'Bicara pelan'],
    answer: 'Bicara jelas dan mengucapkan bunyi sepenuhnya',
    explanation: "Enunciation adalah tindakan mengucapkan kata-kata dengan jelas dan tegas."
  },
  {
    id: 3,
    question: "Kalimat mana yang terdengar lebih profesional?",
    options: ['"Gimme that paper."', '"Could you pass me the paper?"'],
    answer: '"Could you pass me the paper?"',
    explanation: "Menggunakan kata kerja modal penuh (Could you) dan pengucapan yang jelas adalah profesional."
  },
  {
    id: 4,
    question: "Berbicara terlalu cepat dalam presentasi sering kali mengomunikasikan...",
    options: ['Kegugupan', 'Kepercayaan Diri', 'Otoritas'],
    answer: 'Kegugupan',
    explanation: "Kecepatan yang terkendali dan sedang menunjukkan kepercayaan diri dan otoritas. Terburu-buru sering kali menandakan kecemasan."
  },
  {
    id: 5,
    question: "Bagaimana Anda mengucapkan '-ing' dalam pidato formal?",
    options: ['/ɪn/ (Workin\')', '/ɪŋ/ (Working)'],
    answer: '/ɪŋ/ (Working)',
    explanation: "Ucapkan bunyi 'ng' sepenuhnya. Menghilangkan 'g' adalah kasual."
  },
  { id: 6, question: "'Lemme' adalah reduksi dari...", options: ['Let me', 'Leave me', 'Let them'], answer: 'Let me', explanation: "'Lemme' is casual. Use 'Let me' formally." },
  { id: 7, question: "Dalam formal context, gunakan...", options: ['Contractions (I\'m, you\'re)', 'Full forms (I am, you are)', 'Slang'], answer: 'Full forms (I am, you are)', explanation: "Full forms sound more professional and clear." },
  { id: 8, question: "Untuk request formal, use rising intonation...", options: ['Always', 'For politeness', 'Never'], answer: 'For politeness', explanation: "Rising tone ↗ softens requests, sounds more polite." },
  { id: 9, question: "'Dunno' dalam formal setting harus menjadi...", options: ['I do not know', 'I dunno', 'Idk'], answer: 'I do not know', explanation: "Full, clear pronunciation = professional." },
  { id: 10, question: "Pronounce final consonants clearly untuk...", options: ['Sound smart', 'Clarity and professionalism', 'Nothing'], answer: 'Clarity and professionalism', explanation: "Dropping finals (goin\', doin\') = casual. Keep them formal." },
  { id: 11, question: "'Kinda', 'sorta' dalam formal speech adalah...", options: ['Good', 'Too casual, avoid', 'Required'], answer: 'Too casual, avoid', explanation: "Use 'kind of', 'sort of' fully pronounced." },
  { id: 12, question: "Pauses dalam presentations show...", options: ['Nervousness', 'Control and confidence', 'Confusion'], answer: 'Control and confidence', explanation: "Strategic pauses = deliberate, thoughtful delivery." },
  { id: 13, question: "Articulate clearly means...", options: ['Speak fast', 'Pronounce each sound distinctly', 'Use big words'], answer: 'Pronounce each sound distinctly', explanation: "Clear enunciation = professional communication." },
  { id: 14, question: "Dalam interview, avoid...", options: ['Eye contact', 'Filler words (um, like, you know)', 'Pauses'], answer: 'Filler words (um, like, you know)', explanation: "Fillers diminish professionalism. Use pauses instead." },
  { id: 15, question: "'Yeah' dalam formal setting harus menjadi...", options: ['Yes', 'Yep', 'Uh-huh'], answer: 'Yes', explanation: "'Yes' is formal and clear. 'Yeah' is casual." },
  { id: 16, question: "Volume dalam professional speaking harus...", options: ['Very loud', 'Moderate, steady, clear', 'Soft whisper'], answer: 'Moderate, steady, clear', explanation: "Consistent volume = confident and controlled." },
  { id: 17, question: "Pronounce 'ask' as...", options: ['/æsk/ (Correct)', '/æks/ (Aks - dialect)'], answer: '/æsk/ (Correct)', explanation: "Standard pronunciation = /æsk/. Avoid /æks/ in formal." },
  { id: 18, question: "'Probably' harus diucapkan...", options: ['/ˈprɑbəbli/ (Full)', "/ˈprɑbli/ (Probly)"], answer: '/ˈprɑbəbli/ (Full)', explanation: "Pronounce all syllables clearly in formal speech." },
  { id: 19, question: "Tempo formal speaking harus...", options: ['Very fast', 'Deliberately paced, clear', 'Extremely slow'], answer: 'Deliberately paced, clear', explanation: "Measured pace = professionalism and clarity." },
  { id: 20, question: "Best formal pronunciation mindset?", options: ['Sound native', 'Clarity, full pronunciation, controlled delivery', 'Use complex words'], answer: 'Clarity, full pronunciation, controlled delivery', explanation: "Formal = precise, clear, confident articulation!" }
];

const InterPronunLesson18: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 18);
    const nextLessonPath = 18 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${18 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'tips' | 'compare' | 'drill' | 'quiz'>('tips');

  // Practice State
  const [drillIndex, setDrillIndex] = useState(0);

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
                lessonLabel={"Intermediate Pronunciation Lesson 18"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Berbicara Formal"
                subtitle="Pronunciation • Pelajaran 18"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'tips', label: 'Tips Kunci', icon: <BookOpen size={14} /> },
                    { id: 'compare', label: 'Kasual vs Formal', icon: <BookOpen size={14} /> },
                    { id: 'drill', label: 'Latihan Wawancara', icon: <BookOpen size={14} /> },
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
                            

          {tabId === 'tips' && (
            <>
              {/* Intro */}
              <section className="bg-gradient-to-br from-slate-700 to-indigo-900 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Briefcase className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Terdengar Profesional 👔</h2>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    Dalam pertemuan bisnis, wawancara, atau pidato formal, cara Anda berbicara sama pentingnya dengan apa yang Anda katakan. Kejelasan dan kontrol adalah kuncinya.
                  </p>
                </div>
              </section>

              <div className="grid gap-4">
                {FORMAL_TIPS.map((tip, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-sm ${tip.color.replace('text-', 'border-').split(' ')[2]}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-lg font-bold ${tip.color.split(' ')[1]}`}>{tip.title}</h3>
                      <span className="text-2xl">{tip.icon}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{tip.desc}</p>
                    <div className="mt-2 text-xs font-medium bg-white/60 p-2 rounded border border-slate-100/50 text-slate-700">
                      Ex: "{tip.example}"
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabId === 'compare' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-indigo-500" />
                  Dengar Perbedaannya
                </h3>

                <div className="space-y-6">
                  {STYLE_COMPARISON.map((item, idx) => (
                    <div key={idx} className="border-b border-slate-100 pb-6 last:pb-0 last:border-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Casual */}
                        <button
                          onClick={() => playSound(item.casual.text, 1.1)} // Faster
                          className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-left hover:bg-orange-100 transition-all group"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-orange-600 uppercase">Casual</span>
                            <span className="text-lg">😎</span>
                          </div>
                          <p className="text-slate-700 font-medium group-hover:text-orange-900">"{item.casual.text}"</p>
                          <p className="text-[10px] text-slate-500 mt-1">{item.casual.type}</p>
                        </button>

                        {/* Formal */}
                        <button
                          onClick={() => playSound(item.formal.text, 0.9)} // Slower, clearer
                          className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-left hover:bg-indigo-100 transition-all group"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-indigo-600 uppercase">Formal</span>
                            <span className="text-lg">👔</span>
                          </div>
                          <p className="text-slate-700 font-medium group-hover:text-indigo-900">"{item.formal.text}"</p>
                          <p className="text-[10px] text-slate-500 mt-1">{item.formal.type}</p>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tabId === 'drill' && (
            <div className="max-w-xl mx-auto text-center pt-8">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200 border border-slate-100 relative overflow-hidden">

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Latihan Wawancara</h3>

                <div className="mb-8">
                  <button
                    onClick={() => playSound(INTERVIEW_DRILL[drillIndex].text, 0.85)}
                    className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-200"
                  >
                    <Volume2 className="w-10 h-10" />
                  </button>
                  <h2 className="text-xl font-bold text-slate-800 leading-snug px-4 mb-3">"{INTERVIEW_DRILL[drillIndex].text}"</h2>
                  <div className="inline-block bg-yellow-50 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full border border-yellow-100">
                    💡 {INTERVIEW_DRILL[drillIndex].tip}
                  </div>
                </div>

                <div className="flex justify-between mt-8 pt-6 border-t border-slate-50">
                  <button
                    onClick={() => setDrillIndex(prev => Math.max(0, prev - 1))}
                    disabled={drillIndex === 0}
                    className="text-slate-400 font-bold text-sm hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <span className="text-xs font-bold text-slate-300 self-center">{drillIndex + 1} / {INTERVIEW_DRILL.length}</span>
                  <button
                    onClick={() => setDrillIndex(prev => Math.min(INTERVIEW_DRILL.length - 1, prev + 1))}
                    disabled={drillIndex === INTERVIEW_DRILL.length - 1}
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

export default InterPronunLesson18;
