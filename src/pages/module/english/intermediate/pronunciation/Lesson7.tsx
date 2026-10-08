
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Star, Volume2, TrendingUp } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';




// Custom Icon for Intonation Curves
const WaveIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12s3-7 7-7 7 7 7 7 3-7 7-7" />
  </svg>
);



const ATTITUDE_EXAMPLES = [
  {
    id: "really",
    word: "Really?",
    scenarios: [
      { mood: "Terkejut", icon: "😲", curve: "Naik Tinggi ↗", desc: "Anda tidak bisa mempercayainya!", pitch: 1.8, rate: 1.2 },
      { mood: "Ragu", icon: "🤔", curve: "Turun-Naik ↘↗", desc: "Anda skeptis.", pitch: 1, rate: 0.8 },
      { mood: "Bosan", icon: "😑", curve: "Datar/Rendah ↘", desc: "Anda tidak peduli.", pitch: 0.6, rate: 0.9 }
    ]
  },
  {
    id: "thanks",
    word: "Thanks a lot.",
    scenarios: [
      { mood: "Tulus", icon: "😊", curve: "Turun ↘", desc: "Hangat dan tulus.", pitch: 1.2, rate: 1 },
      { mood: "Sarkastik", icon: "😒", curve: "Terlalu ditekan", desc: "Anda bermaksud sebaliknya!", pitch: 0.8, rate: 0.7 }
    ]
  },
  {
    id: "excuse",
    word: "Excuse me.",
    scenarios: [
      { mood: "Sopan", icon: "👋", curve: "Naik ↗", desc: "Mencari perhatian dengan sopan.", pitch: 1.2, rate: 1 },
      { mood: "Marah", icon: "😠", curve: "Turun Tajam ↘", desc: "Seseorang menabrak Anda.", pitch: 0.7, rate: 1.3 }
    ]
  }
];

const FALL_RISE_CASES = [
  {
    title: "Ketidakpastian",
    text: "I think so...",
    visual: "↘↗",
    desc: "Anda tidak 100% yakin. Suara turun lalu naik."
  },
  {
    title: "Persetujuan Sebagian",
    text: "It's good (but expensive)...",
    visual: "↘↗",
    desc: "Anda setuju, tetapi Anda memiliki keraguan ('Ya, tapi...')."
  },
  {
    title: "Koreksi Sopan",
    text: "Actually, it's Tuesday...",
    visual: "↘↗",
    desc: "Mengoreksi seseorang dengan lembut agar sopan."
  }
];

const QUIZ_QUESTIONS = [
  { id: 1, question: "Jika seseorang mengatakan 'Really?' dengan suara naik tinggi (↗), mereka kemungkinan...", options: ['Bosan', 'Marah', 'Terkejut'], answer: 'Terkejut', explanation: "Nada tinggi dan intonasi naik biasanya menandakan keterkejutan atau kegembiraan." },
  { id: 2, question: "Nada Turun-Naik (↘↗) biasanya digunakan untuk...", options: ['Ketidakpastian atau kesopanan', 'Perintah tegas', 'Pernyataan selesai'], answer: 'Ketidakpastian atau kesopanan', explanation: "Turun-Naik menunjukkan bahwa pembicara belum selesai, tidak yakin, atau berhati-hati." },
  { id: 3, question: "Bagaimana 'Thanks' yang sarkastik biasanya terdengar?", options: ['Datar, rendah, atau terlalu ditekan', 'Lembut dan naik', 'Tinggi dan cepat'], answer: 'Datar, rendah, atau terlalu ditekan', explanation: "Sarkasme sering menggunakan nada yang kontras dengan kata-kata positif, seringkali lebih rendah atau diseret." },
  { id: 4, question: "Bukan apa yang kamu katakan, tapi...", options: ['bagaimana kamu mengatakannya', 'seberapa keras kamu'], answer: 'bagaimana kamu mengatakannya', explanation: "Intonasi (sikap) memberikan makna sebenarnya pada kata-kata." },
  { id: 5, question: "Nada tinggi biasanya menunjukkan...", options: ['Kegembiraan / Kejutan / Kesopanan', 'Kebosanan', 'Kemarahan'], answer: 'Kegembiraan / Kejutan / Kesopanan', explanation: "High pitch = energi positif, excitement, atau politeness." },
  { id: 6, question: "Nada rendah menunjukkan...", options: ['Kebahagiaan', 'Pertanyaan', 'Keseriusan / Kebosanan / Kemarahan'], answer: 'Keseriusan / Kebosanan / Kemarahan', explanation: "Low pitch = serious, bored, angry, atau factual." },
  { id: 7, question: "'I think so...' dengan pola (↘↗) berarti...", options: ['Saya tidak 100% yakin', 'Saya pasti', 'Saya sangat yakin'], answer: 'Saya tidak 100% yakin', explanation: "Fall-rise = uncertainty, doubt, atau hesitation." },
  { id: 8, question: "'Excuse me' dengan nada naik (↗) berarti...", options: ['Saya bosan', 'Saya dengan sopan meminta perhatian', 'Saya marah'], answer: 'Saya dengan sopan meminta perhatian', explanation: "Rising tone = polite, seeking attention." },
  { id: 9, question: "'Excuse me' dengan nada turun tajam (↘) berarti...", options: ['Marah atau frustrasi', 'Bertanya', 'Sopan'], answer: 'Marah atau frustrasi', explanation: "Sharp falling tone = annoyance atau anger." },
  { id: 10, question: "'Really?' dengan nada turun-naik (↘↗) menunjukkan...", options: ['Kejutan', 'Keraguan / Skeptisisme', 'Kebahagiaan'], answer: 'Keraguan / Skeptisisme', explanation: "Fall-rise = 'Are you sure? I doubt it.'" },
  { id: 11, question: "'Thanks a lot' dengan nada tulus (turun ↘) terdengar...", options: ['Marah', 'Hangat dan tulus', 'Sarkastik'], answer: 'Hangat dan tulus', explanation: "Gentle falling tone = genuine gratitude." },
  { id: 12, question: "'Thanks a lot' dengan penekanan berlebihan terdengar...", options: ['Sarkastik (bermaksud sebaliknya)', 'Tulus', 'Sopan'], answer: 'Sarkastik (bermaksud sebaliknya)', explanation: "Overly stressed atau flat tone = sarcasm." },
  { id: 13, question: "Mengubah intonasi dapat mengubah...", options: ['Sikap dan emosi pembicara', 'Arti kata', 'Tata bahasa'], answer: 'Sikap dan emosi pembicara', explanation: "Intonation controls attitude, emotion, and real meaning." },
  { id: 14, question: "'Actually, it's Tuesday...' dengan (↘↗) menunjukkan...", options: ['Koreksi sopan dan hati-hati', 'Koreksi kasar', 'Pernyataan biasa'], answer: 'Koreksi sopan dan hati-hati', explanation: "Fall-rise = polite correction, softening disagreement." },
  { id: 15, question: "'It's good (but expensive)...' dengan (↘↗) berarti...", options: ['Tidak setuju', 'Fully agree', 'Partial agreement (ada keraguan)'], answer: 'Partial agreement (ada keraguan)', explanation: "Fall-rise = 'Yes, but...' - agreement with reservation." },
  { id: 16, question: "Perubahan nada (pitch changes) menunjukkan...", options: ['Pernyataan selesai', 'Berpikir aktif / Ketidakpastian', 'Kemarahan'], answer: 'Berpikir aktif / Ketidakpastian', explanation: "Pitch movement = active thinking, uncertainty, unfinished thought." },
  { id: 17, question: "'Really?' dengan nada datar dan rendah (↘) menunjukkan...", options: ['Kejutan', 'Kegembiraan', 'Kebosanan / Tidak peduli'], answer: 'Kebosanan / Tidak peduli', explanation: "Flat, low tone = boredom, disinterest, or disappointment." },
  { id: 18, question: "Intonasi penting karena...", options: ['Membuat Anda terdengar lebih keras', 'Menyampaikan emosi dan sikap sebenarnya', 'Tidak penting'], answer: 'Menyampaikan emosi dan sikap sebenarnya', explanation: "Intonation carries the real message and emotion behind words." },
  { id: 19, question: "Untuk terdengar sopan dalam bahasa Inggris, gunakan...", options: ['Nada datar', 'Nada sangat rendah', 'Nada tinggi atau rising intonation'], answer: 'Nada tinggi atau rising intonation', explanation: "Higher pitch / rising tone = politeness and friendliness." },
  { id: 20, question: "Fall-rise pattern (↘↗) paling umum untuk...", options: ['Uncertainty, politeness, unfinished thoughts', 'Perintah', 'Pernyataan final'], answer: 'Uncertainty, politeness, unfinished thoughts', explanation: "Fall-rise signals hesitation, politeness, or 'I'm not finished yet.'" }
];

const InterPronunLesson7: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 7);
    const nextLessonPath = 7 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${7 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'intro' | 'attitude' | 'fall-rise' | 'quiz'>('intro');

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
                lessonLabel={"Intermediate Pronunciation Lesson 7"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Intonasi untuk Makna"
                subtitle="Pronunciation • Pelajaran 7"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'intro', label: 'Konsep', icon: <BookOpen size={14} /> },
                    { id: 'attitude', label: 'Sikap', icon: <BookOpen size={14} /> },
                    { id: 'fall-rise', label: 'Turun-Naik', icon: <BookOpen size={14} /> },
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
              <section className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <WaveIcon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Musik Suara 🎵</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    "Bukan apa yang Anda katakan, tapi <b>bagaimana Anda mengatakannya</b>."
                    <br />
                    Mengubah nada suara Anda mengubah makna dari sopan menjadi kasar, atau dari tertarik menjadi bosan.
                  </p>
                </div>
              </section>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-800 mb-2">Prinsip Utama</h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex gap-2">
                        <span className="font-bold text-indigo-600">Nada Tinggi:</span>
                        <span>Kegembiraan, Keterkejutan, Kesopanan.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-indigo-600">Nada Rendah:</span>
                        <span>Keseriusan, Kebosanan, Kemarahan.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-indigo-600">Perubahan Nada:</span>
                        <span>Berpikir aktif, Ketidakpastian.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          {tabId === 'attitude' && (
            <div className="space-y-6">
              {ATTITUDE_EXAMPLES.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-700 text-lg">"{item.word}"</h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {item.scenarios.map((scene, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => playSound(item.word, scene.pitch, scene.rate)}
                        className="w-full flex items-center justify-between p-4 hover:bg-indigo-50 transition-colors text-left group"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{scene.icon}</span>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{scene.mood}</p>
                            <p className="text-xs text-slate-500">{scene.desc}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-indigo-400 bg-white px-2 py-1 rounded border border-indigo-100">{scene.curve}</span>
                          <Volume2 className="w-5 h-5 text-slate-300 group-hover:text-indigo-600" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tabId === 'fall-rise' && (
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 mb-6">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                  Nada "Turun-Naik" ↘↗
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Pola khusus ini (suara turun lalu naik) sangat umum dalam bahasa Inggris Inggris dan Amerika. Ini biasanya berarti <b>"Saya belum selesai"</b> atau <b>"Saya tidak yakin"</b>.
                </p>

                <div className="space-y-3">
                  {FALL_RISE_CASES.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => playSound(item.text)} // TTS might not do perfect fall-rise, but gives context
                      className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 hover:bg-white hover:shadow-md transition-all text-left group"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">{item.title}</span>
                        <span className="text-lg font-black text-slate-300 group-hover:text-indigo-400">{item.visual}</span>
                      </div>
                      <p className="text-lg font-bold text-slate-800 mb-1">"{item.text}"</p>
                      <p className="text-xs text-slate-500 italic">{item.desc}</p>
                    </button>
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

export default InterPronunLesson7;
