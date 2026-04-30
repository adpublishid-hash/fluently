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

const USAGE_RULES = [
  {
    title: "Sedang Terjadi",
    desc: "Tindakan yang terjadi pada saat ini juga.",
    example: "I am eating now.",
    icon: "⏱️",
    color: "bg-emerald-50 text-emerald-700 border-blue-200"
  },
  {
    title: "Tindakan Sementara",
    desc: "Hal-hal yang terjadi sekitar waktu ini, tetapi tidak permanen.",
    example: "I am reading a good book these days.",
    icon: "📖",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  }
];

const SPELLING_RULES = [
  { rule: "Aturan Umum", change: "Tambahkan -ing", ex: "Play ➝ Playing" },
  { rule: "Berakhiran 'e'", change: "Hapus 'e' + ing", ex: "Make ➝ Making" },
  { rule: "CVC (1 Vokal + 1 Konsonan)", change: "Gandakan huruf + ing", ex: "Run ➝ Running" },
  { rule: "Berakhiran 'ie'", change: "Ubah 'ie' menjadi 'y' + ing", ex: "Die ➝ Dying" }
];

const EXAMPLE_SENTENCES = [
  { type: "Positif (+)", en: "I am reading a book.", id: "Saya sedang membaca buku." },
  { type: "Positif (+)", en: "She is cooking dinner.", id: "Dia sedang memasak makan malam." },
  { type: "Positif (+)", en: "They are playing football.", id: "Mereka sedang bermain sepak bola." },
  { type: "Positif (+)", en: "He is sleeping.", id: "Dia sedang tidur." },
  { type: "Positif (+)", en: "We are watching TV.", id: "Kami sedang menonton TV." },
  { type: "Positif (+)", en: "You are listening to music.", id: "Kamu sedang mendengarkan musik." },
  { type: "Positif (+)", en: "It is raining outside.", id: "Di luar sedang hujan." },
  { type: "Positif (+)", en: "The dog is running.", id: "Anjing itu sedang berlari." },
  { type: "Positif (+)", en: "I am sitting on a chair.", id: "Saya sedang duduk di kursi." },
  { type: "Positif (+)", en: "He is swimming in the pool.", id: "Dia sedang berenang di kolam." },
  { type: "Negatif (-)", en: "I am not working today.", id: "Saya tidak bekerja hari ini." },
  { type: "Negatif (-)", en: "She isn't crying.", id: "Dia tidak sedang menangis." },
  { type: "Negatif (-)", en: "We aren't going to the park.", id: "Kami tidak pergi ke taman." },
  { type: "Negatif (-)", en: "They aren't studying.", id: "Mereka tidak sedang belajar." },
  { type: "Pertanyaan (?)", en: "Are you coming?", id: "Apakah kamu ikut?" },
  { type: "Pertanyaan (?)", en: "Is he eating?", id: "Apakah dia sedang makan?" },
  { type: "Pertanyaan (?)", en: "Are they sleeping?", id: "Apakah mereka sedang tidur?" },
  { type: "Pertanyaan (?)", en: "What are you doing?", id: "Apa yang sedang kamu lakukan?" },
  { type: "Pertanyaan (?)", en: "Where is she going?", id: "Ke mana dia pergi?" },
  { type: "Pertanyaan (?)", en: "Why are you laughing?", id: "Kenapa kamu tertawa?" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Pilih kalimat yang benar:",
    options: ['She is runing.', 'She is running.', 'She running.'],
    answer: 'She is running.',
    explanation: "Run berakhiran CVC (Konsonan-Vokal-Konsonan), jadi kita menggandakan 'n'. Jangan lupakan 'is'!"
  },
  {
    id: 2,
    question: "I ___ to music right now.",
    options: ['listen', 'am listening', 'listening'],
    answer: 'am listening',
    explanation: "Untuk 'I', gunakan 'am' + verb-ing."
  },
  {
    id: 3,
    question: "___ they watching TV?",
    options: ['Is', 'Am', 'Are'],
    answer: 'Are',
    explanation: "Untuk 'They', gunakan 'Are'."
  },
  {
    id: 4,
    question: "He ___ (not / work) today.",
    options: ['isn\'t working', 'not working', 'isn\'t work'],
    answer: 'isn\'t working',
    explanation: "Struktur negatif: Subjek + is/are + not + verb-ing."
  },
  {
    id: 5,
    question: "Ejaan: Make (verb) ➝ ___ (continuous)",
    options: ['Makeing', 'Making', 'Makking'],
    answer: 'Making',
    explanation: "Hapus 'e' sebelum menambahkan 'ing'."
  },
  {
    id: 6,
    question: "Pilih kalimat yang benar:",
    options: ["My sister is runing.","My sister is running.","My sister running."],
    answer: "My sister is running.",
    explanation: "Run berakhiran CVC (Konsonan-Vokal-Konsonan), jadi kita menggandakan 'n'. Jangan lupakan 'is'!"
  },
  {
    id: 7,
    question: "I ___ to music right now.",
    options: ["listen","am listening","listening"],
    answer: "am listening",
    explanation: "Untuk 'I', gunakan 'am' + verb-ing."
  },
  {
    id: 8,
    question: "___ they watching TV?",
    options: ["Is","Am","Are"],
    answer: "Are",
    explanation: "Untuk 'The dogs', gunakan 'Are'."
  },
  {
    id: 9,
    question: "He ___ (not / work) today.",
    options: ["isn't working","not working","isn't work"],
    answer: "isn't working",
    explanation: "Struktur negatif: Subjek + is/are + not + verb-ing."
  },
  {
    id: 10,
    question: "Ejaan: Make (verb) ➝ ___ (continuous)",
    options: ["Makeing","Making","Makking"],
    answer: "Making",
    explanation: "Hapus 'e' sebelum menambahkan 'ing'."
  },
  {
    id: 11,
    question: "Pilih kalimat yang benar:",
    options: ["My mother is runing.","My mother is running.","My mother running."],
    answer: "My mother is running.",
    explanation: "Run berakhiran CVC (Konsonan-Vokal-Konsonan), jadi kita menggandakan 'n'. Jangan lupakan 'is'!"
  },
  {
    id: 12,
    question: "I ___ to music right now.",
    options: ["listen","am listening","listening"],
    answer: "am listening",
    explanation: "Untuk 'I', gunakan 'am' + verb-ing."
  },
  {
    id: 13,
    question: "___ we watching TV?",
    options: ["Is","Am","Are"],
    answer: "Are",
    explanation: "Untuk 'The teachers', gunakan 'Are'."
  },
  {
    id: 14,
    question: "My sister ___ (not / work) this morning.",
    options: ["isn't working","not working","isn't work"],
    answer: "isn't working",
    explanation: "Struktur negatif: Subjek + is/are + not + verb-ing."
  },
  {
    id: 15,
    question: "Ejaan: Make (verb) ➝ ___ (continuous)",
    options: ["Makeing","Making","Makking"],
    answer: "Making",
    explanation: "Hapus 'e' sebelum menambahkan 'ing'."
  },
  {
    id: 16,
    question: "Pilih kalimat yang benar:",
    options: ["She is runing.","She is running.","She running."],
    answer: "She is running.",
    explanation: "Run berakhiran CVC (Konsonan-Vokal-Konsonan), jadi kita menggandakan 'n'. Jangan lupakan 'is'!"
  },
  {
    id: 17,
    question: "I ___ to music right now.",
    options: ["listen","am listening","listening"],
    answer: "am listening",
    explanation: "Untuk 'I', gunakan 'am' + verb-ing."
  },
  {
    id: 18,
    question: "___ the kids watching TV?",
    options: ["Is","Am","Are"],
    answer: "Are",
    explanation: "Untuk 'The teachers', gunakan 'Are'."
  },
  {
    id: 19,
    question: "He ___ (not / work) today.",
    options: ["isn't working","not working","isn't work"],
    answer: "isn't working",
    explanation: "Struktur negatif: Subjek + is/are + not + verb-ing."
  },
  {
    id: 20,
    question: "Ejaan: Make (verb) ➝ ___ (continuous)",
    options: ["Makeing","Making","Makking"],
    answer: "Making",
    explanation: "Hapus 'e' sebelum menambahkan 'ing'."
  }
];

const ElemGrammarLesson4: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 4);
  const nextLessonPath = '/modul/english/elementary/grammar/lesson-5';
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
      lessonLabel={"Elementary Grammar Lesson 4"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Present Continuous"
            subtitle="Grammar • Pelajaran 4"
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
                      className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendingUp className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Sedang Terjadi!</h2>
                  <p className="text-teal-100 text-sm leading-relaxed">
                    Kita menggunakan Present Continuous untuk tindakan yang terjadi <b>saat ini juga</b>.
                    <br /><br />
                    <b>Struktur:</b> Subjek + am/is/are + Verb-ing.
                  </p>
                </div>
              </motion.section>

              {/* Usage Cards */}
              <div className="space-y-4">
                {USAGE_RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${rule.color.replace('bg-', 'border-').split(' ')[2]} relative overflow-hidden`}>
                    <div className="flex justify-between items-start relative z-10 mb-2">
                      <div>
                        <span className={`text-lg font-bold ${rule.color.split(' ')[1]}`}>{rule.title}</span>
                      </div>
                      <span className="text-2xl">{rule.icon}</span>
                    </div>

                    <p className="text-sm text-[var(--color-text-secondary)] mb-3 font-medium">{rule.desc}</p>

                    <div className="bg-white/60 p-3 rounded-lg border border-[var(--color-border)]/50">
                      <p className="text-sm font-bold text-[var(--color-text-primary)]">"{rule.example}"</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Visual Formula */}
              <div className="mt-6 bg-[var(--color-background)] rounded-2xl p-5 border border-[var(--color-border)]">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[var(--color-primary)]" />
                  Rumus
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold text-xs">(+)</span>
                    <p className="text-sm font-mono text-[var(--color-text-secondary)]">I <b>am</b> eating.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded font-bold text-xs">(-)</span>
                    <p className="text-sm font-mono text-[var(--color-text-secondary)]">I <b>am not</b> eating.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold text-xs">(?)</span>
                    <p className="text-sm font-mono text-[var(--color-text-secondary)]"><b>Am</b> I eating?</p>
                  </div>
                </div>
              </div>

<div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  Aturan Ejaan "-ING"
                </h3>

                <div className="space-y-3">
                  {SPELLING_RULES.map((item, idx) => (
                    <div key={idx} className="bg-[var(--color-background)] p-4 rounded-xl border border-[var(--color-border)]">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-[var(--color-text-primary)] text-sm">{item.rule}</span>
                        <span className="text-xs text-[var(--color-text-muted)] bg-white px-2 py-1 rounded border border-[var(--color-border)]">{item.change}</span>
                      </div>
                      <p className="text-sm font-mono text-[var(--color-primary)] font-bold">{item.ex}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                <h4 className="font-bold text-amber-800 mb-2">Aturan Penggandaan (CVC)</h4>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Jika kata kerja pendek berakhir dengan <b>Konsonan-Vokal-Konsonan</b>, gandakan huruf terakhir!
                  <br />
                  <br />
                  Run ➝ Ru<b>nn</b>ing
                  <br />
                  Sit ➝ Si<b>tt</b>ing
                  <br />
                  Swim ➝ Swi<b>mm</b>ing
                </p>
              </div>
            </div>


        </div>
      ) : tabId === 'examples' ? (
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">
          <div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">
            <div className="space-y-8 w-full max-w-2xl mx-auto">
<div className="max-w-xl mx-auto">
              <div className="bg-white rounded-[2rem] border border-[var(--color-border)] shadow-[var(--shadow-card)] overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-sky-100">
                  <h3 className="font-bold text-teal-800 flex items-center gap-2">
                    <BookOpen size={20} />
                    20 Kalimat Contoh
                  </h3>
                  <p className="text-xs text-[var(--color-primary)] mt-1">Ketuk untuk mendengarkan.</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {EXAMPLE_SENTENCES.map((item, idx) => (
                    <div key={idx} className="p-4 hover:bg-[var(--color-background)] transition-colors flex items-center justify-between group">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${item.type.includes("Negative") ? "bg-red-100 text-red-600" :
                            item.type.includes("Question") ? "bg-blue-100 text-blue-600" :
                              "bg-emerald-100 text-emerald-600"
                            }`}>
                            {item.type}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1">{item.en}</p>
                        <p className="text-xs text-[var(--color-text-muted)] italic">{item.id}</p>
                      </div>
                      <button
                        onClick={() => playSound(item.en)}
                        className="w-8 h-8 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-text-muted)] flex items-center justify-center hover:border-sky-300 hover:text-[var(--color-primary)] transition-all"
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
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-gray-50 text-[var(--color-primary)] px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-sky-300 hover:bg-[var(--color-background)]";
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
                    className="px-8 py-3 bg-[var(--color-primary)] text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-sky-200"
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

export default ElemGrammarLesson4;
