
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { Mic, BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Star } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';






const STORY_TOOLS = [
  {
    title: "Rentang Nada",
    desc: "Gunakan nada tinggi untuk kegembiraan atau karakter kecil. Gunakan nada rendah untuk keseriusan atau karakter besar.",
    icon: "🎢",
    color: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    title: "Tempo (Kecepatan)",
    desc: "Percepat untuk aksi dan bahaya. Perlambat untuk detail penting, kesedihan, atau ketegangan.",
    icon: "🐇",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    title: "Volume",
    desc: "Jangan hanya keras. Berbisiklah untuk rahasia atau ketakutan. Berteriak untuk kemarahan atau jarak. Variasi adalah kuncinya.",
    icon: "🔊",
    color: "bg-orange-50 text-orange-700 border-orange-200"
  },
  {
    title: "Jeda Dramatis",
    desc: "Berhenti berbicara selama 1-2 detik sebelum pengungkapan besar. Keheningan menarik perhatian.",
    icon: "🛑",
    color: "bg-red-50 text-red-700 border-red-200"
  }
];

const STORY_PRACTICE = [
  {
    id: 1,
    text: "It was a dark and stormy night.",
    direction: "Nada Rendah + Lambat",
    hint: "Kondisikan suasana seram.",
    params: { rate: 0.7, pitch: 0.6 }
  },
  {
    id: 2,
    text: "Suddenly, the phone rang! Ring! Ring!",
    direction: "Cepat + Keras",
    hint: "Kejutkan pendengar.",
    params: { rate: 1.3, pitch: 1.2 }
  },
  {
    id: 3,
    text: "'Is anyone there?' she whispered.",
    direction: "Bisik (Lembut) + Nada Tinggi",
    hint: "Tunjukkan ketakutan.",
    params: { rate: 0.9, pitch: 1.3 }
  },
  {
    id: 4,
    text: "There was no answer... just silence.",
    direction: "Lambat + Jeda",
    hint: "Jeda setelah 'answer'.",
    params: { rate: 0.6, pitch: 0.8 }
  },
  {
    id: 5,
    text: "Then, the door CREAKED open.",
    direction: "Bangun perlahan + Tekankan 'CREAKED'",
    hint: "Perpanjang kata 'creaked'.",
    params: { rate: 0.7, pitch: 0.5 }
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Jika Anda menceritakan adegan aksi (misalnya, kejar-kejaran mobil), bagaimana seharusnya Anda berbicara?",
    options: ['Cepat dan energik', 'Monoton', 'Perlahan dan pelan'],
    answer: 'Cepat dan energik',
    explanation: "Kecepatan menciptakan rasa urgensi dan kegembiraan."
  },
  {
    id: 2,
    question: "Apa tujuan dari 'Jeda Dramatis'?",
    options: ['Untuk membangun ketegangan/perhatian', 'Untuk mengingat baris Anda', 'Untuk membosankan audiens'],
    answer: 'Untuk membangun ketegangan/perhatian',
    explanation: "Keheningan membuat pendengar mencondongkan tubuh dan menunggu apa yang akan terjadi selanjutnya."
  },
  {
    id: 3,
    question: "Jika Anda menyuarakan karakter 'Raksasa', Anda kemungkinan akan menggunakan nada ___.",
    options: ['Normal', 'Rendah', 'Tinggi'],
    answer: 'Rendah',
    explanation: "Karakter yang lebih besar atau nada serius biasanya dikaitkan dengan suara yang lebih dalam dan lebih rendah."
  },
  { id: 4, question: "Untuk menunjukkan bahwa karakter takut, Anda mungkin...", options: ['Berteriak keras', 'Berbisik atau menggunakan suara gemetar', 'Berbicara sangat jelas'], answer: 'Berbisik atau menggunakan suara gemetar', explanation: "Ketakutan sering diekspresikan melalui napas, nada tinggi, atau bisikan." },
  { id: 5, question: "Untuk character child/anak kecil, gunakan pitch...", options: ['Normal', 'Higher/lebih tinggi', 'Lower/lebih rendah'], answer: 'Higher/lebih tinggi', explanation: "Children have higher voices, so raise your pitch." },
  { id: 6, question: "Dramatic pause digunakan...", options: ['Setiap detik', 'Tidak pernah', 'After important reveals'], answer: 'After important reveals', explanation: "Pause creates suspense and gives weight to key moments." },
  { id: 7, question: "Untuk scene sadness/kesedihan, use...", options: ['Fast pace', 'Slow pace, lower pitch', 'Loud volume'], answer: 'Slow pace, lower pitch', explanation: "Sadness = slow, low, soft delivery." },
  { id: 8, question: "Untuk excitement/kegembiraan, use...", options: ['Monotone', 'Higher pitch, faster pace', 'Lower pitch, slower'], answer: 'Higher pitch, faster pace', explanation: "Energy = faster tempo + higher pitch." },
  { id: 9, question: "Whisper digunakan untuk...", options: ['Anger', 'Secrets, fear, intimacy', 'Joy'], answer: 'Secrets, fear, intimacy', explanation: "Whisper creates closeness atau menunjukkan ketakutan." },
  { id: 10, question: "Volume variety membantu...", options: ['Create emotional dynamics', 'Confuse listeners', 'Nothing'], answer: 'Create emotional dynamics', explanation: "Loud vs soft = drama and interest." },
  { id: 11, question: "Untuk villain character, gunakan...", options: ['Whisper', 'High pitch, fast', 'Low pitch, slow, menacing'], answer: 'Low pitch, slow, menacing', explanation: "Villains often sound deep, controlled, threatening." },
  { id: 12, question: "Story pacing: slow down untuk...", options: ['Filler', 'Action scenes', 'Important details, tension'], answer: 'Important details, tension', explanation: "Slow = emphasize, build suspense." },
  { id: 13, question: "Story pacing: speed up untuk...", options: ['Action, excitement', 'Sad moments', 'Endings'], answer: 'Action, excitement', explanation: "Fast = urgency, energy, movement." },
  { id: 14, question: "Onomatopoeia (sound words like BOOM) harus...", options: ['Exaggerated dengan emosi', 'Said quietly', 'Skipped'], answer: 'Exaggerated dengan emosi', explanation: "Sound words are fun! Make them dramatic." },
  { id: 15, question: "Untuk narrator voice, gunakan...", options: ['Extreme emotions', 'Neutral, clear, steady', 'Monotone'], answer: 'Neutral, clear, steady', explanation: "Narrator = balanced, authoritative tone." },
  { id: 16, question: "Dialogue tags ('she said') harus...", options: ['Loud', 'Soft, de-emphasized', 'Skipped'], answer: 'Soft, de-emphasized', explanation: "Focus on dialogue, not tags." },
  { id: 17, question: "Untuk cliffhanger ending, use...", options: ['Fast finish', 'Falling intonation ↘', 'Rising intonation ↗ + pause'], answer: 'Rising intonation ↗ + pause', explanation: "Rising tone = unresolved, suspenseful." },
  { id: 18, question: "Eye contact with audience membantu...", options: ['You forget lines', 'Connection and engagement', 'Nothing'], answer: 'Connection and engagement', explanation: "Looking at listeners makes story come alive." },
  { id: 19, question: "Practice storytelling dengan...", options: ['Silent reading', 'Reading aloud dengan emotions', 'Speed reading'], answer: 'Reading aloud dengan emotions', explanation: "Practice vocal variety OUT LOUD." },
  { id: 20, question: "Best storytelling pronunciation goal?", options: ['Emotional clarity and variety', 'Perfect accent', 'Speed'], answer: 'Emotional clarity and variety', explanation: "Make listeners FEEL the story through your voice!" }
];

const InterPronunLesson16: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 16);
    const nextLessonPath = 16 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${16 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'tools' | 'story' | 'quiz'>('tools');

  // Practice State
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
                lessonLabel={"Intermediate Pronunciation Lesson 16"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Bercerita (Storytelling)"
                subtitle="Pronunciation • Pelajaran 16"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'tools', label: 'Alat Bantu', icon: <BookOpen size={14} /> },
                    { id: 'story', label: 'Latihan Cerita', icon: <BookOpen size={14} /> },
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
                            

          {tabId === 'tools' && (
            <>
              {/* Intro */}
              <section className="bg-gradient-to-br from-indigo-500 to-fuchsia-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <BookOpen className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Jadilah Pencerita 📖</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Jangan hanya membaca kata-kata. Lukis gambar dengan suara Anda. Gunakan rentang nada Anda untuk membuat orang <i>merasakan</i> ceritanya.
                  </p>
                </div>
              </section>

              <div className="grid gap-4">
                {STORY_TOOLS.map((tool, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-sm ${tool.color.replace('text-', 'border-').split(' ')[2]}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-lg font-bold ${tool.color.split(' ')[1]}`}>{tool.title}</h3>
                      <span className="text-2xl">{tool.icon}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabId === 'story' && (
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 border border-indigo-50 relative overflow-hidden">

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                    <Mic className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">"Ketukan Tengah Malam"</h3>
                  <p className="text-xs text-slate-500">Ketuk setiap baris untuk mendengar aktingnya.</p>
                </div>

                <div className="space-y-4">
                  {STORY_PRACTICE.map((line, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${activeLine === idx
                        ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                        : 'border-slate-100 hover:border-indigo-200 bg-white'
                        }`}
                      onClick={() => {
                        setActiveLine(idx);
                        playSound(line.text, line.params.rate, line.params.pitch);
                      }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Baris {idx + 1}</span>
                        <span className="text-xs font-bold text-indigo-600 bg-white px-2 py-1 rounded border border-indigo-100">{line.direction}</span>
                      </div>
                      <p className="text-lg font-medium text-slate-800 mb-2 leading-relaxed font-serif">
                        "{line.text}"
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Lightbulb className="w-3 h-3 text-yellow-500" />
                        {line.hint}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-xs text-slate-400 mb-2">Cobalah membaca seluruh cerita:</p>
                  <div className="p-4 bg-slate-50 rounded-xl text-sm italic text-slate-600 leading-relaxed font-serif">
                    "It was a dark and stormy night. Suddenly, the phone rang! 'Is anyone there?' she whispered. There was no answer... just silence. Then, the door CREAKED open."
                  </div>
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

export default InterPronunLesson16;
