
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { Mic, BookOpen, PenTool, CheckCircle2, XCircle, Trophy, Lightbulb, Sparkles, Star, Volume2, Target, TrendingUp, BarChart, Zap } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';




// Custom Icon for 'Presentation'
const PodiumIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 22h16" /><path d="m12 11-4-7h8l-4 7" /><path d="M12 11v11" />
  </svg>
);



const SPEAKING_PILLARS = [
  {
    title: "Jeda",
    desc: "Keheningan itu kuat. Berhenti sejenak setelah poin penting untuk membiarkan audiens berpikir. Jangan terburu-buru.",
    icon: "⏸️",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    title: "Tempo (Kecepatan)",
    desc: "Bicaralah perlahan untuk ide-ide besar. Bicaralah lebih cepat untuk kegembiraan. Variasi membuat orang tetap mendengarkan.",
    icon: "🐇",
    color: "bg-green-50 text-green-700 border-sky-200"
  },
  {
    title: "Nada & Melodi",
    desc: "Jangan jadi robot (Monoton). NAIK untuk pertanyaan/kegembiraan, TURUN untuk otoritas.",
    icon: "📈",
    color: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    title: "Proyeksi",
    desc: "Bicaralah dari perut, bukan tenggorokan. Jelas, bukan hanya keras.",
    icon: "📢",
    color: "bg-orange-50 text-orange-700 border-orange-200"
  }
];

const SPEECH_DRILL = [
  {
    id: 1,
    text: "Ladies and gentlemen, / thank you for being here.",
    hint: "Jeda pada koma. Tersenyum.",
    tone: "Hangat & Menyambut"
  },
  {
    id: 2,
    text: "Today, / we are not just dreaming of the future. / We are building it.",
    hint: "Tekankan 'dreaming' dan 'building'.",
    tone: "Percaya Diri"
  },
  {
    id: 3,
    text: "Is it going to be easy? / No. / Is it going to be worth it? / Absolutely.",
    hint: "Naik pada pertanyaan (↗), Turun pada jawaban (↘).",
    tone: "Serius lalu Penuh Gairah"
  },
  {
    id: 4,
    text: "Let's start / right now.",
    hint: "Akhiran yang kuat. Nada rendah pada 'now'.",
    tone: "Memerintah"
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Apa itu suara 'Monoton'?",
    options: ['Suara yang sangat bervariasi', 'Suara datar, seperti robot', 'Suara keras'],
    answer: 'Suara datar, seperti robot',
    explanation: "Monoton (satu nada) terdengar membosankan dan membuat audiens kehilangan minat."
  },
  {
    id: 2,
    question: "Mengapa Anda harus berhenti sejenak saat berpidato?",
    options: ['Untuk mengingat baris Anda', 'Untuk membiarkan audiens memproses ide', 'Untuk memeriksa telepon Anda'],
    answer: 'Untuk membiarkan audiens memproses ide',
    explanation: "Keheningan memberikan bobot pada kata-kata Anda dan membiarkan pendengar mengejar ketinggalan."
  },
  {
    id: 3,
    question: "Ketika Anda mengajukan pertanyaan retoris (misalnya, 'Is it easy?'), suara Anda biasanya...",
    options: ['Naik ↗', 'Turun ↘'],
    answer: 'Naik ↗',
    explanation: "Pertanyaan biasanya naik untuk melibatkan pendengar."
  },
  { id: 4, question: "Untuk poin penting dan serius, Anda umumnya harus berbicara...", options: ['Lebih cepat', 'Lebih lambat'], answer: 'Lebih lambat', explanation: "Mem perlambat memberi sinyal kepada audiens: 'Ini penting, dengarkan baik-baik.'" },
  { id: 5, question: "Proyeksi yang baik berarti Anda berbicara dari...", options: ['Tenggorokan', 'Diaphragm/perut', 'Hidung'], answer: 'Diaphragm/perut', explanation: "Breathing dari diaphragm memberikan volume dan control." },
  { id: 6, question: "'Monotone' delivery membuat audiens...", options: ['Engaged', 'Bored / disengaged', 'Inspired'], answer: 'Bored / disengaged', explanation: "No variation = boring, listeners tune out." },
  { id: 7, question: "Untuk menunjukkan excitement, gunakan...", options: ['Lower pitch, slow', 'Higher pitch, faster tempo', 'Monotone'], answer: 'Higher pitch, faster tempo', explanation: "Excitement = higher energy, pitch up, speed up." },
  { id: 8, question: "Untuk menunjukkan authority/seriousness, gunakan...", options: ['High pitch', 'Low pitch, slower', 'Fast speech'], answer: 'Low pitch, slower', explanation: "Lower pitch + slow pace = authority, gravity." },
  { id: 9, question: "Pauses di public speaking membantu...", options: ['Anda ingat script', 'Audiens process informasi', 'Mengisi waktu'], answer: 'Audiens process informasi', explanation: "Strategic pauses let ideas sink in." },
  { id: 10, question: "Rhetorical question (misalnya 'Is this possible?') biasanya menggunakan intonation...", options: ['Falling ↘', 'Rising ↗'], answer: 'Rising ↗', explanation: "Questions rise untuk engage listeners emotionally." },
  { id: 11, question: "Untuk end speech dengan impact, gunakan...", options: ['High pitch', 'Lower pitch dengan confident tone', 'Whisper'], answer: 'Lower pitch dengan confident tone', explanation: "Lower, firm tone gives finality dan authority." },
  { id: 12, question: "Variasi dalam tempo membantu...", options: ['Confuse audience', 'Keep attention, emphasize points', 'Nothing'], answer: 'Keep attention, emphasize points', explanation: "Variety = interest. Slow down untuk emphasis, speed up untuk momentum." },
  { id: 13, question: "Best way untuk practice public speaking pronunciation?", options: ['Silent reading', 'Record yourself dan listen', 'Just wing it'], answer: 'Record yourself dan listen', explanation: "Recording helps you hear filler words, pace, clarity." },
  { id: 14, question: "Filler words (um, uh, like) harus...", options: ['Digunakan sesering mungkin', 'Diminimalisir dengan pauses', 'Tidak masalah'], answer: 'Diminimalisir dengan pauses', explanation: "Replace fillers dengan silent pauses untuk sound more confident." },
  { id: 15, question: "Eye contact membantu dengan pronunciation karena...", options: ['Tidak ada hubungan', 'Forces you to speak clearly', 'Makes you nervous'], answer: 'Forces you to speak clearly', explanation: "When you look at people, you naturally articulate better." },
  { id: 16, question: "Opening speech yang kuat menggunakan...", options: ['Monotone, fast', 'Warm, welcoming tone', 'Loud shouting'], answer: 'Warm, welcoming tone', explanation: "First impression = warm, confident, engaging." },
  { id: 17, question: "Untuk emphasize contrast ('not X, but Y'), gunakan...", options: ['Same stress', 'Heavy stress pada both X and Y', 'Soft delivery'], answer: 'Heavy stress pada both X and Y', explanation: "Stress BOTH contrasting elements untuk make them clear." },
  { id: 18, question: "Speaking terlalu cepat membuat...", options: ['You sound smart', 'Hard to understand', 'No difference'], answer: 'Hard to understand', explanation: "Too fast = words blend, audience can't follow." },
  { id: 19, question: "Untuk quote important text, Anda harus...", options: ['Slow down, emphasize key words', 'Speed up', 'Whisper'], answer: 'Slow down, emphasize key words', explanation: "Quotes deserve emphasis dan clarity." },
  { id: 20, question: "Best vocal delivery untuk public speaking =  ___", options: ['Monotone consistency', 'Dynamic variation (pause, pitch, tempo changes)', 'Always loud'], answer: 'Dynamic variation (pause, pitch, tempo changes)', explanation: "Variety keeps audience engaged, makes message memorable!" }
];

const InterPronunLesson15: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 15);
    const nextLessonPath = 15 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${15 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'pillars' | 'speech' | 'quiz'>('pillars');

  // Speech State
  const [activeLine, setActiveLine] = useState<number | null>(null);

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
                lessonLabel={"Intermediate Pronunciation Lesson 15"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Berbicara di Depan Umum"
                subtitle="Pronunciation • Pelajaran 15"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'pillars', label: '4 Pilar', icon: <BookOpen size={14} /> },
                    { id: 'speech', label: 'Latihan Pidato', icon: <BookOpen size={14} /> },
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
                            

          {tabId === 'pillars' && (
            <>
              {/* Intro */}
              <section className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <PodiumIcon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Bicara untuk Menginspirasi 🎤</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Berbicara di depan umum bukan hanya tentang kata-kata. Ini tentang bagaimana Anda menyampaikannya. Pengucapan yang baik + Kepercayaan Diri = Pembicara Hebat.
                  </p>
                </div>
              </section>

              <div className="grid gap-4">
                {SPEAKING_PILLARS.map((pillar, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-sm ${pillar.color.replace('text-', 'border-').split(' ')[2]}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-lg font-bold ${pillar.color.split(' ')[1]}`}>{pillar.title}</h3>
                      <span className="text-2xl">{pillar.icon}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabId === 'speech' && (
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 border border-indigo-50 relative overflow-hidden">

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg text-white">
                    <Mic className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">"Momen Besar"</h3>
                  <p className="text-xs text-slate-500">Latih pidato singkat ini baris demi baris.</p>
                </div>

                <div className="space-y-4">
                  {SPEECH_DRILL.map((line, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${activeLine === idx
                        ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                        : 'border-slate-100 hover:border-indigo-200 bg-white'
                        }`}
                      onClick={() => {
                        setActiveLine(idx);
                        playSound(line.text.replace(/\//g, ','), 0.85); // Slower for effect
                      }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Baris {idx + 1}</span>
                        <span className="text-xs font-bold text-indigo-600 bg-white px-2 py-1 rounded border border-indigo-100">{line.tone}</span>
                      </div>
                      <p className="text-lg font-medium text-slate-800 mb-2 leading-relaxed">
                        {line.text.split('/').map((part, i) => (
                          <span key={i}>
                            {part}
                            {i < line.text.split('/').length - 1 && <span className="text-red-300 font-bold mx-1">|</span>}
                          </span>
                        ))}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Lightbulb className="w-3 h-3 text-yellow-500" />
                        {line.hint}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => playSound(SPEECH_DRILL.map(l => l.text.replace(/\//g, ',')).join(' '), 0.85)}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2 mx-auto"
                  >
                    <Volume2 className="w-5 h-5" />
                    Putar Pidato Lengkap
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

export default InterPronunLesson15;
