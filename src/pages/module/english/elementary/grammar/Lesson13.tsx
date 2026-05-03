import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2, PlayCircle, Lightbulb, Sparkles, Info, CheckCircle2, XCircle, MessageSquare, BookOpen, PenTool, Trophy, Star, TrendingUp
} from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const RELATIVE_RULES = [
  {
    pronoun: "WHO",
    usage: "Untuk Orang",
    desc: "Gunakan 'who' saat membicarakan orang.",
    example: "The man who called me.",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "👤"
  },
  {
    pronoun: "WHICH",
    usage: "Untuk Benda & Hewan",
    desc: "Gunakan 'which' saat membicarakan benda atau hewan.",
    example: "The car which I bought.",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: "🚗"
  },
  {
    pronoun: "THAT",
    usage: "Untuk Orang atau Benda",
    desc: "Biasanya bisa menggantikan 'who' atau 'which' dalam kalimat sederhana.",
    example: "The man that called / The car that I bought.",
    color: "bg-emerald-50 text-emerald-700 border-blue-200",
    icon: "✨"
  }
];

const EXAMPLE_SENTENCES = [
  { type: "Orang (Who)", en: "The man who called me is my uncle.", id: "Pria yang menelepon saya adalah paman saya.", icon: "👨" },
  { type: "Benda (Which)", en: "The car which I bought is red.", id: "Mobil yang saya beli berwarna merah.", icon: "🚗" },
  { type: "Benda (That)", en: "This is the book that I read.", id: "Ini adalah buku yang saya baca.", icon: "📖" },
  { type: "Orang (Who)", en: "The girl who sits next to me is nice.", id: "Gadis yang duduk di sebelah saya baik.", icon: "👧" },
  { type: "Benda (Which)", en: "I like the cake which you made.", id: "Saya suka kue yang kamu buat.", icon: "🎂" },
  { type: "Hewan (That)", en: "The dog that bit me was big.", id: "Anjing yang menggigit saya besar.", icon: "🐕" },
  { type: "Orang (Who)", en: "He is the actor who won the award.", id: "Dia aktor yang memenangkan penghargaan.", icon: "🏆" },
  { type: "Benda (Which)", en: "Where is the pen which I gave you?", id: "Di mana pulpen yang saya berikan padamu?", icon: "🖊️" },
  { type: "Orang (Who)", en: "The woman who works here is friendly.", id: "Wanita yang bekerja di sini ramah.", icon: "👩‍💼" },
  { type: "Benda (Which)", en: "The phone which is on the table is mine.", id: "HP yang ada di meja itu milik saya.", icon: "📱" },
  { type: "Orang (Who)", en: "I know a boy who speaks five languages.", id: "Saya kenal anak laki-laki yang bicara 5 bahasa.", icon: "🗣️" },
  { type: "Benda (That)", en: "The movie that we watched was boring.", id: "Film yang kami tonton membosankan.", icon: "🎬" },
  { type: "Orang (Who)", en: "The students who study hard pass the exam.", id: "Siswa yang belajar giat lulus ujian.", icon: "🎓" },
  { type: "Benda (Which)", en: "The bag which I lost was expensive.", id: "Tas yang saya hilangkan itu mahal.", icon: "👜" },
  { type: "Orang (That)", en: "She is the teacher that taught me English.", id: "Dia guru yang mengajari saya bahasa Inggris.", icon: "👩‍🏫" },
  { type: "Benda (Which)", en: "The house which they bought is old.", id: "Rumah yang mereka beli itu tua.", icon: "🏠" },
  { type: "Orang (Who)", en: "People who live in glass houses shouldn't throw stones.", id: "Orang yang tinggal di rumah kaca jangan lempar batu.", icon: "🧱" },
  { type: "Benda (That)", en: "The computer that I use is slow.", id: "Komputer yang saya pakai lambat.", icon: "💻" },
  { type: "Orang (Who)", en: "The nurse who helped me was kind.", id: "Perawat yang membantu saya baik.", icon: "🏥" },
  { type: "Benda (Which)", en: "The pizza which we ate was delicious.", id: "Pizza yang kami makan enak.", icon: "🍕" }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "The man ___ stole the car was caught.",
    options: ['which', 'who', 'where'],
    answer: 'who',
    explanation: "'The man' adalah orang, jadi kita gunakan 'who' (atau 'that')."
  },
  {
    id: 2,
    question: "This is the cake ___ Mary baked.",
    options: ['who', 'which', 'what'],
    answer: 'which',
    explanation: "'The cake' adalah benda, jadi kita gunakan 'which' (atau 'that')."
  },
  {
    id: 3,
    question: "I have a friend ___ lives in Japan.",
    options: ['which', 'who', 'it'],
    answer: 'who',
    explanation: "'A friend' adalah orang."
  },
  {
    id: 4,
    question: "The book ___ is on the shelf is mine.",
    options: ['who', 'which', 'whom'],
    answer: 'which',
    explanation: "'The book' adalah benda."
  },
  {
    id: 5,
    question: "Can I talk to the person ___ is in charge?",
    options: ['which', 'who', 'where'],
    answer: 'who',
    explanation: "'The person' membutuhkan 'who'."
  },
  {
    id: 6,
    question: "The man ___ stole the car was caught.",
    options: ["which","who","where"],
    answer: "who",
    explanation: "'The man' adalah orang, jadi kita gunakan 'who' (atau 'that')."
  },
  {
    id: 7,
    question: "This is the cake ___ Sarah baked.",
    options: ["who","which","what"],
    answer: "which",
    explanation: "'The cake' adalah benda, jadi kita gunakan 'which' (atau 'that')."
  },
  {
    id: 8,
    question: "I have a friend ___ lives in Japan.",
    options: ["which","who","it"],
    answer: "who",
    explanation: "'A friend' adalah orang."
  },
  {
    id: 9,
    question: "The book ___ is on the shelf is mine.",
    options: ["who","which","whom"],
    answer: "which",
    explanation: "'The book' adalah benda."
  },
  {
    id: 10,
    question: "Can I talk to the person ___ is in charge?",
    options: ["which","who","where"],
    answer: "who",
    explanation: "'The person' membutuhkan 'who'."
  },
  {
    id: 11,
    question: "The man ___ stole the car was caught.",
    options: ["which","who","where"],
    answer: "who",
    explanation: "'The man' adalah orang, jadi kita gunakan 'who' (atau 'that')."
  },
  {
    id: 12,
    question: "This is the cake ___ Mary baked.",
    options: ["who","which","what"],
    answer: "which",
    explanation: "'The cake' adalah benda, jadi kita gunakan 'which' (atau 'that')."
  },
  {
    id: 13,
    question: "I have a friend ___ lives in Japan.",
    options: ["which","who","it"],
    answer: "who",
    explanation: "'A friend' adalah orang."
  },
  {
    id: 14,
    question: "The book ___ is on the shelf is mine.",
    options: ["who","which","whom"],
    answer: "which",
    explanation: "'The book' adalah benda."
  },
  {
    id: 15,
    question: "Can I talk to the person ___ is in charge?",
    options: ["which","who","where"],
    answer: "who",
    explanation: "'The person' membutuhkan 'who'."
  },
  {
    id: 16,
    question: "The man ___ stole the car was caught.",
    options: ["which","who","where"],
    answer: "who",
    explanation: "'The man' adalah orang, jadi kita gunakan 'who' (atau 'that')."
  },
  {
    id: 17,
    question: "This is the cake ___ Lisa baked.",
    options: ["who","which","what"],
    answer: "which",
    explanation: "'The cake' adalah benda, jadi kita gunakan 'which' (atau 'that')."
  },
  {
    id: 18,
    question: "I have a friend ___ lives in Japan.",
    options: ["which","who","it"],
    answer: "who",
    explanation: "'A friend' adalah orang."
  },
  {
    id: 19,
    question: "The novel ___ is on the shelf is mine.",
    options: ["who","which","whom"],
    answer: "which",
    explanation: "'The novel' adalah benda."
  },
  {
    id: 20,
    question: "Can I talk to the person ___ is in charge?",
    options: ["which","who","where"],
    answer: "who",
    explanation: "'The person' membutuhkan 'who'."
  }
];

const ElemGrammarLesson13: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 13);
  const nextLessonPath = '/modul/english/elementary/grammar/lesson-14';
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
      lessonLabel={"Elementary Grammar Lesson 13"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Kata Ganti Penghubung (Relative Pronouns)"
            subtitle="Grammar • Pelajaran 13"
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
                      className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Star className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Menghubungkan Kalimat</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Relative pronouns (<b>who, which, that</b>) menghubungkan dua ide tentang orang atau benda. Mereka diterjemahkan menjadi "yang" dalam bahasa Indonesia.
                  </p>
                </div>
              </motion.section>

              {/* Rules List */}
              <div className="grid gap-4">
                {RELATIVE_RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${rule.color.replace('bg-', 'border-').split(' ')[2]} relative`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`text-xl font-bold ${rule.color.split(' ')[1]}`}>{rule.pronoun}</h3>
                        <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wide mt-1">{rule.usage}</p>
                      </div>
                      <span className="text-3xl">{rule.icon}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">{rule.desc}</p>
                    <div className="bg-white/60 p-3 rounded-lg border border-[var(--color-border)]/50">
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">"{rule.example}"</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tip */}
              <div className="mt-6 bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <Lightbulb size={24} />
                  <div>
                    <h4 className="font-bold text-yellow-900 mb-1">Tip Pro</h4>
                    <p className="text-sm text-yellow-800 leading-relaxed">
                      Dalam bahasa Inggris informal, kita sering menggunakan <b>THAT</b> untuk orang dan benda.
                      <br />
                      "The man <b>who</b> called" = "The man <b>that</b> called".
                    </p>
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
                <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                  <h3 className="font-bold text-indigo-800 flex items-center gap-2">
                    <BookOpen size={20} />
                    20 Contoh
                  </h3>
                  <p className="text-xs text-indigo-600 mt-1">Ketuk untuk mendengarkan.</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {EXAMPLE_SENTENCES.map((item, idx) => (
                    <div key={idx} className="p-4 hover:bg-[var(--color-background)] transition-colors flex items-center justify-between group">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${item.type.includes("Who") ? "bg-blue-100 text-blue-600" :
                            item.type.includes("Which") ? "bg-purple-100 text-purple-600" :
                              "bg-emerald-100 text-emerald-600"
                            }`}>
                            {item.type}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1 flex items-center gap-2">
                          <span>{item.icon}</span> {item.en}
                        </p>
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
                    <Trophy className="w-10 h-10" />
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

export default ElemGrammarLesson13;

