import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2, Sparkles, CheckCircle2, XCircle, BookOpen, PenTool, Star, TrendingUp
} from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const FUTURE_FORMS = [
  {
    title: "Will",
    uses: ["Keputusan Spontan", "Janji", "Prediksi (Pendapat)"],
    example: "The phone is ringing. I'll get it.",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "⚡"
  },
  {
    title: "Going To",
    uses: ["Rencana / Niat", "Prediksi (Bukti)"],
    example: "I bought tickets. I'm going to fly tomorrow.",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: "🗓️"
  }
];

const EXAMPLES = [
  { type: "Keputusan (Will)", en: "I forgot my wallet. I'll pay later.", id: "Saya lupa dompet. Saya akan bayar nanti." },
  { type: "Rencana (Going to)", en: "I am going to visit my mom next week.", id: "Saya berencana mengunjungi ibu minggu depan." },
  { type: "Janji (Will)", en: "I won't tell anyone.", id: "Saya tidak akan memberitahu siapapun." },
  { type: "Bukti (Going to)", en: "Look at those clouds! It is going to rain.", id: "Lihat awan itu! Pasti akan hujan." },
  { type: "Prediksi (Will)", en: "I think they will win the game.", id: "Saya rasa mereka akan memenangkan pertandingan." },
  { type: "Rencana (Going to)", en: "We are going to buy a new house.", id: "Kami berencana membeli rumah baru." },
  { type: "Tawaran (Will)", en: "That bag looks heavy. I will help you.", id: "Tas itu terlihat berat. Saya akan bantu." },
  { type: "Pertanyaan (Will)", en: "Will you marry me?", id: "Maukah kamu menikah denganku?" },
  { type: "Pertanyaan (Going to)", en: "Are you going to cook dinner?", id: "Apakah kamu berencana masak makan malam?" },
  { type: "Fakta Masa Depan (Will)", en: "I will be 30 next year.", id: "Saya akan berusia 30 tahun depan." }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Oh tidak! Susunya tumpah. Saya ___ (bersihkan).",
    options: ['am going to', 'will', 'going to'],
    answer: 'will',
    explanation: "Ini adalah keputusan spontan yang dibuat saat itu juga. Gunakan 'Will'."
  },
  {
    id: 2,
    question: "Lihat mobil itu! Itu ___ (tabrakan)!",
    options: ['will', 'is going to', 'shall'],
    answer: 'is going to',
    explanation: "Prediksi berdasarkan bukti saat ini (kamu bisa melihatnya). Gunakan 'Going to'."
  },
  {
    id: 3,
    question: "Saya membeli cat karena saya ___ (cat) kamar saya besok.",
    options: ['will', 'am going to', 'will to'],
    answer: 'am going to',
    explanation: "Ini adalah rencana/niat. Kamu sudah membeli catnya."
  },
  {
    id: 4,
    question: "Saya berjanji saya ___ terlambat.",
    options: ['won\'t', 'not going to', 'don\'t'],
    answer: 'won\'t',
    explanation: "Janji menggunakan 'Will' (atau 'Won't' untuk negatif)."
  },
  {
    id: 5,
    question: "Saya pikir ___ hujan minggu depan.",
    options: ['is going to', 'will', 'is'],
    answer: 'will',
    explanation: "Prediksi berdasarkan pendapat/keyakinan ('Saya pikir'). Gunakan 'Will'."
  },
  {
    id: 6,
    question: "Oh tidak! Susunya tumpah. Saya ___ (bersihkan).",
    options: ["am going to","will","going to"],
    answer: "will",
    explanation: "Ini adalah keputusan spontan yang dibuat saat itu juga. Gunakan 'Will'."
  },
  {
    id: 7,
    question: "Lihat mobil itu! Itu ___ (tabrakan)!",
    options: ["will","is going to","shall"],
    answer: "is going to",
    explanation: "Prediksi berdasarkan bukti saat ini (kamu bisa melihatnya). Gunakan 'Going to'."
  },
  {
    id: 8,
    question: "Saya membeli cat karena saya ___ (cat) kamar saya besok.",
    options: ["will","am going to","will to"],
    answer: "am going to",
    explanation: "Ini adalah rencana/niat. Kamu sudah membeli catnya."
  },
  {
    id: 9,
    question: "Saya berjanji saya ___ terlambat.",
    options: ["won't","not going to","don't"],
    answer: "won't",
    explanation: "Janji menggunakan 'Will' (atau 'Won't' untuk negatif)."
  },
  {
    id: 10,
    question: "Saya pikir ___ hujan minggu depan.",
    options: ["is going to","will","is"],
    answer: "will",
    explanation: "Prediksi berdasarkan pendapat/keyakinan ('Saya pikir'). Gunakan 'Will'."
  },
  {
    id: 11,
    question: "Oh tidak! Susunya tumpah. Saya ___ (bersihkan).",
    options: ["am going to","will","going to"],
    answer: "will",
    explanation: "Ini adalah keputusan spontan yang dibuat saat itu juga. Gunakan 'Will'."
  },
  {
    id: 12,
    question: "Lihat mobil itu! Itu ___ (tabrakan)!",
    options: ["will","is going to","shall"],
    answer: "is going to",
    explanation: "Prediksi berdasarkan bukti saat ini (kamu bisa melihatnya). Gunakan 'Going to'."
  },
  {
    id: 13,
    question: "Saya membeli cat karena saya ___ (cat) kamar saya besok.",
    options: ["will","am going to","will to"],
    answer: "am going to",
    explanation: "Ini adalah rencana/niat. Kamu sudah membeli catnya."
  },
  {
    id: 14,
    question: "Saya berjanji saya ___ terlambat.",
    options: ["won't","not going to","don't"],
    answer: "won't",
    explanation: "Janji menggunakan 'Will' (atau 'Won't' untuk negatif)."
  },
  {
    id: 15,
    question: "Saya pikir ___ hujan minggu depan.",
    options: ["is going to","will","is"],
    answer: "will",
    explanation: "Prediksi berdasarkan pendapat/keyakinan ('Saya pikir'). Gunakan 'Will'."
  },
  {
    id: 16,
    question: "Oh tidak! Susunya tumpah. Saya ___ (bersihkan).",
    options: ["am going to","will","going to"],
    answer: "will",
    explanation: "Ini adalah keputusan spontan yang dibuat saat itu juga. Gunakan 'Will'."
  },
  {
    id: 17,
    question: "Lihat mobil itu! Itu ___ (tabrakan)!",
    options: ["will","is going to","shall"],
    answer: "is going to",
    explanation: "Prediksi berdasarkan bukti saat ini (kamu bisa melihatnya). Gunakan 'Going to'."
  },
  {
    id: 18,
    question: "Saya membeli cat karena saya ___ (cat) kamar saya besok.",
    options: ["will","am going to","will to"],
    answer: "am going to",
    explanation: "Ini adalah rencana/niat. Kamu sudah membeli catnya."
  },
  {
    id: 19,
    question: "Saya berjanji saya ___ terlambat.",
    options: ["won't","not going to","don't"],
    answer: "won't",
    explanation: "Janji menggunakan 'Will' (atau 'Won't' untuk negatif)."
  },
  {
    id: 20,
    question: "Saya pikir ___ hujan minggu depan.",
    options: ["is going to","will","is"],
    answer: "will",
    explanation: "Prediksi berdasarkan pendapat/keyakinan ('Saya pikir'). Gunakan 'Will'."
  }
];

const ElemGrammarLesson6: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 6);
  const nextLessonPath = '/modul/english/elementary/grammar/lesson-7';
  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string) => { playAudio(text, 0.9); };

  // Quiz Handlers
  const handleCheckQuiz = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);
    if (option === QUIZ_QUESTIONS[quizStep].answer) {
      setQuizScore(prev => prev + 1);
      playSound("Correct!");
    } else {
      playSound("Incorrect.");
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
      lessonLabel={"Elementary Grammar Lesson 6"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Bentuk Future"
            subtitle="Grammar • Pelajaran 6"
            accentColor="#8E44AD"
            nextLesson={nextLessonPath}
            tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'examples', label: 'Contoh', icon: <Volume2 size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}
            footer={() => (
                <button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #8E44AD, #8E44ADcc)' }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
                </button>
            )}
        >
            {(tabId) => tabId === 'learn' ? (
        <div className="space-y-8 animate-fade-in">
{/* Intro */}
              <motion.section
                      custom={0}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendingUp className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Berbicara Tentang Masa Depan</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Kita memiliki dua cara utama untuk berbicara tentang masa depan.
                    <br />
                    <b>Will:</b> Untuk keputusan spontan dan janji.
                    <br />
                    <b>Going To:</b> Untuk rencana dan bukti yang jelas.
                  </p>
                </div>
              </motion.section>

              {/* Usage Cards */}
              <div className="space-y-4">
                {FUTURE_FORMS.map((item, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${item.color.replace('bg-', 'border-').split(' ')[2]} relative overflow-hidden`}>
                    <div className="flex justify-between items-start relative z-10 mb-4">
                      <div>
                        <span className={`text-lg font-bold ${item.color.split(' ')[1]}`}>{item.title}</span>
                      </div>
                      <span className="text-3xl">{item.icon}</span>
                    </div>

                    <ul className="text-sm text-[var(--color-text-secondary)] mb-4 list-disc list-inside space-y-1">
                      {item.uses.map((u, i) => (
                        <li key={i}>{u}</li>
                      ))}
                    </ul>

                    <div className="bg-white/60 p-3 rounded-lg border border-[var(--color-border)]/50">
                      <p className="text-sm font-bold text-[var(--color-text-primary)]">"{item.example}"</p>
                    </div>
                  </div>
                ))}
              </div>

<div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-red-500" />
                  Struktur: Will
                </h3>
                <div className="space-y-3">
                  <div className="bg-[var(--color-background)] p-3 rounded-lg border border-[var(--color-border)]">
                    <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase mb-1">Positif (+)</p>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">Subjek + <b>will</b> + Verb (dasar)</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1 italic">I will go. / I'll go.</p>
                  </div>
                  <div className="bg-[var(--color-background)] p-3 rounded-lg border border-[var(--color-border)]">
                    <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase mb-1">Negatif (-)</p>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">Subjek + <b>won't</b> + Verb (dasar)</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1 italic">I won't go.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                  Struktur: Going To
                </h3>
                <div className="space-y-3">
                  <div className="bg-[var(--color-background)] p-3 rounded-lg border border-[var(--color-border)]">
                    <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase mb-1">Positif (+)</p>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">Sub + <b>am/is/are</b> + <b>going to</b> + Verb</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1 italic">She is going to buy it.</p>
                  </div>
                  <div className="bg-[var(--color-background)] p-3 rounded-lg border border-[var(--color-border)]">
                    <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase mb-1">Negatif (-)</p>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">Sub + <b>am/is/are not</b> + <b>going to</b> + Verb</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1 italic">We aren't going to fly.</p>
                  </div>
                </div>
              </div>
            </div>


        </div>
      ) : tabId === 'examples' ? (
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">
          <div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">
            <div className="space-y-8 w-full max-w-2xl mx-auto">
<div className="max-w-xl mx-auto">
              <div className="bg-white rounded-[2rem] border border-[var(--color-border)] shadow-[var(--shadow-card)] overflow-hidden">
                <div className="bg-[var(--color-background)] px-6 py-4 border-b border-[var(--color-border)]">
                  <h3 className="font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                    <BookOpen size={20} />
                    Konteks Itu Penting
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Ketuk untuk mendengarkan.</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {EXAMPLES.map((item, idx) => (
                    <div key={idx} className="p-4 hover:bg-[var(--color-background)] transition-colors flex items-center justify-between group">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${item.type.includes("Will") ? "bg-blue-100 text-blue-600" :
                            "bg-purple-100 text-purple-600"
                            }`}>
                            {item.type}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1">{item.en}</p>
                        <p className="text-xs text-[var(--color-text-muted)] italic">{item.id}</p>
                      </div>
                      <button
                        onClick={() => playSound(item.en)}
                        className="w-8 h-8 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-text-muted)] flex items-center justify-center hover:border-indigo-300 hover:text-indigo-600 transition-all"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        
</div>
          </div>
        </div>
      ) : tabId === 'practice' ? (
        <div className="animate-fade-in">
          <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-indigo-300 hover:bg-[var(--color-background)]";
                      if (isAnswerChecked) {
                        if (option === QUIZ_QUESTIONS[quizStep].answer) btnClass = "bg-green-50 border-sky-500 text-green-700";
                        else if (option === selectedOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                        else btnClass = "opacity-50 border-[var(--color-border)]";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleCheckQuiz(option)}
                          disabled={isAnswerChecked}
                          className={`w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${btnClass}`}
                        >
                          <span>{option}</span>
                          {isAnswerChecked && option === QUIZ_QUESTIONS[quizStep].answer && <CheckCircle2 size={20} />}
                          {isAnswerChecked && option === selectedOption && option !== QUIZ_QUESTIONS[quizStep].answer && <XCircle size={20} />}
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
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Kuis Selesai!</h2>
                  <p className="text-[var(--color-text-muted)] mb-6">Kamu mendapatkan skor {quizScore} dari {QUIZ_QUESTIONS.length}</p>
                  <button
                    onClick={restartQuiz}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
            </div>
        </div>
      ) : null}
    </LessonShell>
    </>
  );
};

export default ElemGrammarLesson6;
