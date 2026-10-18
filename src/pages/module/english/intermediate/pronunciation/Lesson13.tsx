
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { User, BookOpen, PenTool, CheckCircle2, XCircle, Star, Volume2, TrendingUp } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';






const SHADOWING_TIPS = [
  {
    title: "Salin Semuanya",
    desc: "Jangan cuma menyalin kata-kata. Salin napasnya, jedanya, nadanya (tinggi/rendah), dan kecepatannya.",
    icon: "🎭",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200"
  },
  {
    title: "Jadilah Dramatis",
    desc: "Lebih-lebihkan bunyinya! Terasa konyol, tapi ini membantu otot mulut Anda mempelajari posisi baru.",
    icon: "😲",
    color: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    title: "Percepat",
    desc: "Mulai perlahan untuk mendapatkan akurasi, lalu percepat untuk mendapatkan ritme yang alami.",
    icon: "🐆",
    color: "bg-amber-50 text-amber-700 border-amber-200"
  }
];

const EMOTION_DRILLS = [
  {
    sentence: "I can't believe you did that.",
    emotions: [
      { mood: "Marah 😠", audiotext: "I CAN'T BELIEVE you did that!", hint: "Keras, T tajam, nada turun." },
      { mood: "Senang/Terkejut 😃", audiotext: "I can't BELIEVE you did that!", hint: "Nada tinggi, rentang lebar, tersenyum." },
      { mood: "Sedih 😢", audiotext: "I can't believe you did that...", hint: "Nada rendah, lambat, konsonan lebih lembut." }
    ]
  },
  {
    sentence: "What are you doing here?",
    emotions: [
      { mood: "Curiga 🤨", audiotext: "What are YOU doing here?", hint: "Lambat, mata menyipit, nada rendah." },
      { mood: "Semangat 😍", audiotext: "What are you DOING here?!", hint: "Cepat, nada tinggi, kejutan bahagia." }
    ]
  }
];

const FULL_TEXT_CHALLENGE = {
  title: "Cerita Kedai Kopi",
  full: "Yesterday, I went to my favorite coffee shop. It was really crowded, but I managed to find a seat. I sat down, opened my book, and just relaxed for an hour. It was perfect.",
  chunks: [
    "Yesterday, / I went to my favorite coffee shop.",
    "It was really crowded, / but I managed to find a seat.",
    "I sat down, / opened my book, / and just relaxed for an hour.",
    "It was perfect."
  ]
};

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Saat shadowing, Anda harus menyalin...",
    options: ['Kata-kata, nada, kecepatan, dan emosi', 'Hanya kecepatannya', 'Hanya kata-katanya'],
    answer: 'Kata-kata, nada, kecepatan, dan emosi',
    explanation: "Shadowing adalah tentang imitasi total untuk menginternalisasi aliran alami bahasa."
  },
  {
    id: 2,
    question: "Jika Anda ingin terdengar marah, suara Anda biasanya menjadi...",
    options: ['Lebih lembut dan lebih tinggi', 'Lebih keras dan lebih tajam', 'Datar dan monoton'],
    answer: 'Lebih keras dan lebih tajam',
    explanation: "Kemarahan sering melibatkan tekanan yang lebih kuat dan bunyi konsonan yang lebih tajam."
  },
  {
    id: 3,
    question: "Mengapa Anda harus 'melebih-lebihkan' (menjadi dramatis) saat berlatih?",
    options: ['Untuk berbicara lebih cepat', 'Untuk menjadi lucu', 'Untuk melatih otot mulut'],
    answer: 'Untuk melatih otot mulut',
    explanation: "Bahasa Inggris membutuhkan gerakan otot yang berbeda dari bahasa ibu Anda. Melebih-lebihkan membangun kekuatan."
  },
  { id: 4, question: "Apa cara terbaik untuk melatih cerita yang panjang?", options: ['Membaca semuanya sekaligus dengan cepat', 'Memecahnya menjadi potongan-potongan (thought groups)', 'Melewati kata-kata yang sulit'], answer: 'Memecahnya menjadi potongan-potongan (thought groups)', explanation: "Pemotongan (Chunking) memungkinkan Anda menguasai bagian-bagian kecil sebelum menggabungkannya." },
  { id: 5, question: "Shadowing berarti Anda harus copy...", options: ['Words, tone, speed, emotion, dan rhythm', 'Hanya speed', 'Hanya pronunciation'], answer: 'Words, tone, speed, emotion, dan rhythm', explanation: "Shadowing = total imitation, bukan hanya words." },
  { id: 6, question: "'Exaggeration' (melebih-lebihkan) saat practice membantu...", options: ['Terdengar silly', 'Membingungkan', 'Train mouth muscles untuk posisi baru'], answer: 'Train mouth muscles untuk posisi baru', explanation: "Exaggeration builds muscle memory untuk sounds yang asing." },
  { id: 7, question: "Untuk terdengar angry, Anda harus...", options: ['Speak louder dengan sharper consonants', 'Use high pitch', 'Speak softer'], answer: 'Speak louder dengan sharper consonants', explanation: "Anger = louder volume, sharper/harder sounds, falling intonation." },
  { id: 8, question: "Untuk terdengar sad, voice Anda menjadi...", options: ['High dan fast', 'Low, slow, dan softer', 'Loud dan sharp'], answer: 'Low, slow, dan softer', explanation: "Sadness = lower pitch, slower pace, softer articulation." },
  { id: 9, question: "Untuk terdengar excited/happy, Anda gunakan...", options: ['Low pitch', 'High pitch dan wider intonation range', 'Monotone'], answer: 'High pitch dan wider intonation range', explanation: "Excitement = higher pitch, more variation, faster pace." },
  { id: 10, question: "Shadowing paling efektif dengan...", options: ['Audio native speakers', 'Text saja', 'Silent reading'], answer: 'Audio native speakers', explanation: "Need authentic audio untuk copy rhythm/intonation accurately." },
  { id: 11, question: "Mengapa 'acting' (peragaan) penting untuk pronunciation?", options: ['Tidak penting', 'Helps internalize emotions dan natural delivery', 'Hanya untuk fun'], answer: 'Helps internalize emotions dan natural delivery', explanation: "Acting = you practice HOW natives say things, not just WHAT." },
  { id: 12, question: "'I CAN'T BELIEVE you did that!' dengan stress pada CAN'T menunjukkan...", options: ['Happiness', 'Sadness', 'Anger/frustration'], answer: 'Anger/frustration', explanation: "Heavy stress + sharp sounds + falling tone = anger." },
  { id: 13, question: "Untuk sound polite/friendly, gunakan...", options: ['Rising atau gentle intonation', 'Falling intonation', 'Monotone'], answer: 'Rising atau gentle intonation', explanation: "Politeness = higher/rising pitch, softer tone." },
  { id: 14, question: "Saat shadowing, best approach adalah...", options: ['Start slow, exaggerate, then speed up', 'Start fast', 'Skip difficult parts'], answer: 'Start slow, exaggerate, then speed up', explanation: "Slow practice → accuracy. Then increase speed gradually." },
  { id: 15, question: "Emotional delivery mengubah...", options: ['Vocabulary', 'Meaning dan impact of the message', 'Grammar'], answer: 'Meaning dan impact of the message', explanation: "HOW you say something changes the entire meaning." },
  { id: 16, question: "Untuk suspicious tone, voice menjadi...", options: ['Lower, slower, careful', 'Very loud', 'High dan excited'], answer: 'Lower, slower, careful', explanation: "Suspicion = lower pitch, slower, narrowed eyes (visual)." },
  { id: 17, question: "Breaking long stories into chunks helps dengan...", options: ['Memorization dan fluent practice', 'Confusing listeners', 'Making it longer'], answer: 'Memorization dan fluent practice', explanation: "Chunking = easier to master small parts, then combine." },
  { id: 18, question: "Best resource untuk shadowing practice adalah...", options: ['Textbooks', 'Movies, podcasts, audiobooks dengan native speakers', 'Your own voice'], answer: 'Movies, podcasts, audiobooks dengan native speakers', explanation: "Authentic native audio = best models untuk shadowing." },
  { id: 19, question: "Mengapa 'overdo' (berlebihan) saat practice?", options: ['It\'s not helpful', 'To sound funny', 'To build strong muscle memory'], answer: 'To build strong muscle memory', explanation: "Exaggeration = stronger training effect, builds habit." },
  { id: 20, question: "Combination of shadowing + chunking + emotion =", options: ['Waste of time', 'Most effective pronunciation practice', 'Only for actors'], answer: 'Most effective pronunciation practice', explanation: "This combo trains rhythm, delivery, dan naturalness together." }
];

const InterPronunLesson13: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 13);
    const nextLessonPath = 13 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${13 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'tips' | 'emotions' | 'workout' | 'quiz'>('tips');

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
                lessonLabel={"Intermediate Pronunciation Lesson 13"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Shadowing & Imitasi"
                subtitle="Pronunciation • Pelajaran 13"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'tips', label: 'Teknik', icon: <BookOpen size={14} /> },
                    { id: 'emotions', label: 'Akting', icon: <BookOpen size={14} /> },
                    { id: 'workout', label: 'Cerita', icon: <BookOpen size={14} /> },
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
              <section className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <User className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Jadilah Peniru 🦜</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Untuk berbicara seperti penutur asli, Anda harus meniru seperti penutur asli. Jangan hanya mengucapkan kata-kata—peragakan! Teknik ini disebut <b>Shadowing</b>.
                  </p>
                </div>
              </section>

              <div className="space-y-4">
                {SHADOWING_TIPS.map((tip, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-sm ${tip.color.replace('text-', 'border-').split(' ')[2]} flex items-start gap-4`}>
                    <div className="text-3xl bg-white p-2 rounded-xl shadow-sm border border-slate-50 flex-shrink-0">
                      {tip.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold mb-1 ${tip.color.split(' ')[1]}`}>{tip.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabId === 'emotions' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Nada Mengubah Makna
                </h3>

                {EMOTION_DRILLS.map((item, idx) => (
                  <div key={idx} className="mb-6 last:mb-0">
                    <p className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wide">Kalimat Dasar: "{item.sentence}"</p>
                    <div className="grid gap-3">
                      {item.emotions.map((emo, i) => (
                        <button
                          key={i}
                          onClick={() => playSound(emo.audiotext, 1.0, emo.mood.includes("Happy") ? 1.4 : emo.mood.includes("Sad") || emo.mood.includes("Suspicious") ? 0.7 : 1)}
                          className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100 hover:bg-white hover:shadow-md transition-all group text-left"
                        >
                          <div>
                            <span className="font-bold text-slate-800 block mb-1">{emo.mood}</span>
                            <span className="text-xs text-slate-500 italic">{emo.hint}</span>
                          </div>
                          <Volume2 className="w-5 h-5 text-indigo-400 group-hover:text-indigo-600" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tabId === 'workout' && (
            <div className="max-w-xl mx-auto pt-4">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-indigo-100/50 border border-indigo-50 relative overflow-hidden">

                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-indigo-100 p-2 rounded-xl text-indigo-700">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Tantangan Cerita</h3>
                    <p className="text-xs text-slate-500">Dengar, Jeda, Ulangi.</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-slate-700 text-base leading-relaxed mb-8 relative font-medium">
                  {FULL_TEXT_CHALLENGE.full}
                  <button
                    onClick={() => playSound(FULL_TEXT_CHALLENGE.full, 0.85)}
                    className="absolute bottom-[-16px] right-4 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 active:scale-95 transition-all"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>

                <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-3 px-1">Latih Potongan</h4>
                <div className="space-y-2">
                  {FULL_TEXT_CHALLENGE.chunks.map((line, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-indigo-100" onClick={() => playSound(line.replace('/', ','), 0.8)}>
                      <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                      <p className="text-sm text-slate-700 font-medium">{line}</p>
                      <Volume2 className="w-4 h-4 text-slate-300 ml-auto" />
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

export default InterPronunLesson13;
