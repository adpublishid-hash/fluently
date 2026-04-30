
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Trophy, Lightbulb, Sparkles, Star, Volume2, Target, TrendingUp, BarChart, Zap } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';






const REVIEW_TOPICS = [
  {
    title: "The Schwa /ə/",
    desc: "Suara 'malas' yang ditemukan dalam suku kata yang tidak ditekan. Ini menciptakan ritme bahasa Inggris.",
    example: "Banana -> b(ə)-NA-n(ə)",
    icon: "😴",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200"
  },
  {
    title: "Word Stress (Tekanan Kata)",
    desc: "Kata yang lebih panjang memiliki satu suku kata yang kuat. Kata benda sering menekankan yang ke-1, Kata kerja yang ke-2.",
    example: "PRE-sent (Hadiah) vs pre-SENT (Menunjukkan)",
    icon: "📊",
    color: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    title: "Connected Speech (Ucapan Terhubung)",
    desc: "Penghubungan (Konsonan+Vokal), Intrusi (/w/, /y/), dan Elisi (bunyi yang hilang).",
    example: "Do it -> Do-/w/-it",
    icon: "🔗",
    color: "bg-emerald-50 text-emerald-700 border-blue-200"
  },
  {
    title: "Intonasi",
    desc: "Melodi ucapan. Naik untuk memeriksa/kesopanan, Turun untuk pernyataan.",
    example: "Really? ↗ vs Really. ↘",
    icon: "🎶",
    color: "bg-amber-50 text-amber-700 border-amber-200"
  }
];

const SPEAKING_CHALLENGES = [
  {
    id: 1,
    type: "Ritme & Schwa",
    text: "I went to the supermarket to buy a banana.",
    focus: "Gunakan Schwa untuk 'to', 'the', 'a'. Tekankan 'went', 'super-', 'buy', 'na'.",
    audioTarget: "I WENT t(ə) th(ə) SU-per-mar-ket t(ə) BUY (ə) b(ə)-NA-n(ə)."
  },
  {
    id: 2,
    type: "Penghubungan (Linking)",
    text: "Can I have a bit of egg?",
    focus: "Hubungkan: Can-I, have-a, bit-of-egg.",
    audioTarget: "Ca-nI ha-va bi-to-vegg?"
  },
  {
    id: 3,
    type: "Intonasi (Sikap)",
    text: "Oh, that's just great.",
    focus: "Katakan dengan sarkastik (Melodi Naik-Turun pada 'Great').",
    audioTarget: "Oh, that's just greaaaat... (Sarcastic)"
  },
  {
    id: 4,
    type: "Pergeseran Tekanan Kata",
    text: "I will record the record.",
    focus: "re-CORD (Kata Kerja) vs RE-cord (Kata Benda).",
    audioTarget: "I will re-CORD the RE-cord."
  }
];

const FINAL_QUIZ = [
  {
    id: 1,
    question: "Kata mana yang mengandung bunyi Schwa?",
    options: ['Cat', 'Sit', 'About'],
    answer: 'About',
    explanation: "'A' dalam 'About' tidak ditekan dan diucapkan /ə/."
  },
  {
    id: 2,
    question: "Di mana letak tekanan dalam 'Political'?",
    options: ['PO-li-ti-cal', 'po-LI-ti-cal', 'po-li-TI-cal'],
    answer: 'po-LI-ti-cal',
    explanation: "Kata-kata yang berakhiran -ical biasanya menekan suku kata sebelum akhiran."
  },
  {
    id: 3,
    question: "Bagaimana cara menghubungkan 'Stop it'?",
    options: ['Stop... it', 'Sto-pit'],
    answer: 'Sto-pit',
    explanation: "Konsonan P terhubung ke Vokal I."
  },
  {
    id: 4,
    question: "Intonasi mana yang terbaik untuk permintaan sopan?",
    options: ['Turun ↘', 'Naik ↗'],
    answer: 'Naik ↗',
    explanation: "Intonasi naik terdengar lebih lembut dan lebih sopan."
  },
  {
    id: 5,
    question: "Dalam kalimat 'I didn't SAY that', apa yang tersirat?",
    options: ['Saya menulisnya sebagai gantinya.', 'Saya tidak melakukannya.', 'Orang lain yang mengatakannya.'],
    answer: 'Saya menulisnya sebagai gantinya.',
    explanation: "Menekankan 'SAY' membedakan dengan metode komunikasi lain (seperti menulis)."
  },
  {
    id: 6,
    question: "Pasangan mana yang mengikuti aturan tekanan Kata Benda (ke-1) vs Kata Kerja (ke-2)?",
    options: ['Water / Water', 'Object / Object', 'Happy / Happy'],
    answer: 'Object / Object',
    explanation: "OB-ject (Benda) vs ob-JECT (Tidak setuju/Keberatan)."
  },
  {
    id: 7,
    question: "Bagaimana 'Two eggs' dihubungkan?",
    options: ['Two-w-eggs', 'Two-y-eggs'],
    answer: 'Two-w-eggs',
    explanation: "/uː/ dalam 'Two' terhubung dengan bunyi /w/."
  },
  {
    id: 8,
    question: "Kata mana yang memiliki bunyi 'Dark L'?",
    options: ['Light', 'Love', 'Full'],
    answer: 'Full',
    explanation: "L di akhir kata biasanya Gelap (belakang tenggorokan)."
  },
  {
    id: 9,
    question: "Grup pemikiran (Thought groups) dipisahkan oleh...",
    options: ['Napas panjang', 'Jeda singkat', 'Teriakan'],
    answer: 'Jeda singkat',
    explanation: "Kami berhenti sejenak di antara potongan makna."
  },
  { id: 10, question: "Jika Anda ingin menekankan kontras, Anda membuat kata...", options: ['Lebih cepat', 'Lebih pelan', 'Lebih Keras dan Lebih Tinggi'], answer: 'Lebih Keras dan Lebih Tinggi', explanation: "Tekanan untuk penekanan melibatkan volume dan nada." },
  { id: 11, question: "'Going to' berkurang menjadi...", options: ['Go-to', 'Gonna', 'Goin'], answer: 'Gonna', explanation: "'Gonna' = paling umum reduction dari 'going to'." },
  { id: 12, question: "Weak forms terjadi pada...", options: ['Content words (nouns, main verbs)', 'Function words (the, to, and, can)', 'Semua kata'], answer: 'Function words (the, to, and, can)', explanation: "Function words dilemahkan / reduced dalam connected speech." },
  { id: 13, question: "'Can' vs 'Can\'t' dibedakan dengan...", options: ['Can = weak /kən/, Can\'t = strong /kænt/', 'Sama saja', 'Hanya context'], answer: 'Can = weak /kən/, Can\'t = strong /kænt/', explanation: "Positive can = weak, negative can't = strong and clear." },
  { id: 14, question: "Shadowing technique melatih...", options: ['Grammar', 'Rhythm dan intonation', 'Vocabulary'], answer: 'Rhythm dan intonation', explanation: "Shadowing = repeat after audio immediately untuk internalize native rhythm." },
  { id: 15, question: "Sentence stress biasanya jatuh pada...", options: ['Function words', 'Content words (nouns, main verbs, adjectives)', 'Random'], answer: 'Content words (nouns, main verbs, adjectives)', explanation: "Content words carry meaning, jadi mereka stressed." },
  { id: 16, question: "Fall-rise intonation (↘↗) menunjukkan...", options: ['Statement selesai', 'Uncertainty atau politeness', 'Anger'], answer: 'Uncertainty atau politeness', explanation: "Fall-rise = hedging, politeness, not finished." },
  { id: 17, question: "Untuk public speaking yang kuat, vary your...", options: ['Vocabulary only', 'Pace, pitch, dan pauses', 'Nothing'], answer: 'Pace, pitch, dan pauses', explanation: "Dynamic delivery = engaging. Monotone = boring." },
  { id: 18, question: "Tricky consonant clusters (seperti 'months') require...", options: ['Skipping sounds', 'Slow practice, then speed up', 'Give up'], answer: 'Slow practice, then speed up', explanation: "Master clusters slowly dengan exaggeration, lalu gradually speed up." },
  { id: 19, question: "Best approach untuk meningkatkan accent awareness?", options: ['Ignore it', 'Compare US/UK, practice intelligibility', 'Hanya copy satu accent'], answer: 'Compare US/UK, practice intelligibility', explanation: "Understanding accent variations helps, tapi goal = clarity, not perfection." },
  { id: 20, question: "Pronunciation mastery = ___", options: ['Sound 100% native', 'Clear, confident, intelligible', 'No mistakes ever'], answer: 'Clear, confident, intelligible', explanation: "Goal = to communicate effectively, not hide your identity. Mastery = clarity + confidence!" }
];

const InterPronunLesson20: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 20);
    const nextLessonPath = 20 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${20 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'review' | 'test' | 'quiz'>('review');

  // Test State
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string, rateOrLabel: number | string = 0.9, maybeRate?: number) => { const rate = typeof rateOrLabel === "number" ? rateOrLabel : (maybeRate ?? 0.9); playAudio(text, rate); };

  // Test Handlers
  const toggleChallenge = (id: number) => {
    if (completedChallenges.includes(id)) {
      setCompletedChallenges(prev => prev.filter(c => c !== id));
    } else {
      setCompletedChallenges(prev => [...prev, id]);
      playSound("Kerja bagus!");
    }
  };

  // Quiz Handlers
  const handleCheckQuiz = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);
    if (option === FINAL_QUIZ[quizStep].answer) {
      setQuizScore(prev => prev + 1);
      playSound("Benar!");
    } else {
      playSound("Salah.");
    }
  };

  const nextQuizQuestion = () => {
    if (quizStep < FINAL_QUIZ.length - 1) {
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
                lessonLabel={"Intermediate Pronunciation Lesson 20"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Penilaian Akhir"
                subtitle="Pronunciation • Pelajaran 20"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'review', label: 'Ringkasan', icon: <BookOpen size={14} /> },
                    { id: 'test', label: 'Tes Berbicara', icon: <BookOpen size={14} /> },
                    { id: 'quiz', label: 'Kuis Akhir', icon: <PenTool size={14} /> }
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
                            

          {tabId === 'review' && (
            <>
              {/* Intro */}
              <section className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Trophy className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Anda Berhasil! 🎓</h2>
                  <p className="text-violet-100 text-sm leading-relaxed">
                    Ini adalah akhir dari modul Pengucapan Menengah. Mari kita rekap keterampilan inti yang telah Anda kuasai.
                  </p>
                </div>
              </section>

              <div className="grid gap-4">
                {REVIEW_TOPICS.map((topic, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-sm ${topic.color.replace('text-', 'border-').split(' ')[2]}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-lg font-bold ${topic.color.split(' ')[1]}`}>{topic.title}</h3>
                      <span className="text-2xl">{topic.icon}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{topic.desc}</p>
                    <div className="bg-slate-50 p-2 rounded text-xs font-mono text-slate-500 border border-slate-100">
                      {topic.example}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabId === 'test' && (
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-violet-100/50 border border-violet-50 relative overflow-hidden">

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Tantangan Berbicara</h3>
                    <p className="text-xs text-slate-500">Baca dengan keras dan bandingkan.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-violet-600">{completedChallenges.length}</span>
                    <span className="text-xs text-slate-400">/ {SPEAKING_CHALLENGES.length}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {SPEAKING_CHALLENGES.map((item) => (
                    <div key={item.id} className={`p-4 rounded-xl border-2 transition-all ${completedChallenges.includes(item.id)
                      ? 'border-sky-200 bg-green-50'
                      : 'border-slate-100 hover:border-violet-200 bg-white'
                      }`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.type}</span>
                        <button
                          onClick={() => playSound(item.audioTarget)}
                          className="text-violet-500 hover:text-violet-700"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-lg font-bold text-slate-800 mb-2 leading-relaxed">"{item.text}"</p>
                      <p className="text-xs text-slate-500 italic mb-4">Focus: {item.focus}</p>

                      <button
                        onClick={() => toggleChallenge(item.id)}
                        className={`w-full py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${completedChallenges.includes(item.id)
                          ? 'bg-green-500 text-white'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                      >
                        {completedChallenges.includes(item.id) ? (
                          <> <CheckCircle2 className="w-4 h-4" /> Selesai </>
                        ) : (
                          "Tandai Selesai"
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tabId === 'quiz' && (
            <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-violet-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {FINAL_QUIZ.length}</span>
                    <span className="text-xs font-bold bg-violet-50 text-violet-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-6 flex flex-col gap-2">
                    {FINAL_QUIZ[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {FINAL_QUIZ[quizStep].options.map((option, idx) => {
                      let btnClass = "border-slate-200 hover:border-violet-300 hover:bg-slate-50";
                      if (isAnswerChecked) {
                        if (option === FINAL_QUIZ[quizStep].answer) btnClass = "bg-green-50 border-sky-500 text-green-700";
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
                          {isAnswerChecked && option === FINAL_QUIZ[quizStep].answer && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                          {isAnswerChecked && option === selectedOption && option !== FINAL_QUIZ[quizStep].answer && <XCircle className="w-5 h-5 text-red-500" />}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswerChecked && (
                    <div className="mt-6">
                      <div className={`p-3 rounded-lg text-sm mb-4 ${selectedOption === FINAL_QUIZ[quizStep].answer ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'}`}>
                        {FINAL_QUIZ[quizStep].explanation}
                      </div>
                      <button
                        onClick={nextQuizQuestion}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                      >
                        {quizStep < FINAL_QUIZ.length - 1 ? "Pertanyaan Berikutnya" : "Lihat Hasil"}
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
                  <p className="text-slate-500 mb-6">Anda mendapat skor {quizScore} dari {FINAL_QUIZ.length}</p>
                  <button
                    onClick={restartQuiz}
                    className="px-8 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-200"
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

export default InterPronunLesson20;
