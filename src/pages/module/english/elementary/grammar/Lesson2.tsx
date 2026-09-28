import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2, Lightbulb, CheckCircle2, XCircle, BookOpen, PenTool, Star, TrendingUp
} from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const REGULAR_RULES = [
  {
    rule: "Aturan Umum (+ed)",
    desc: "Cukup tambahkan -ed di akhir.",
    examples: ["Walk ➝ Walked", "Clean ➝ Cleaned", "Play ➝ Played"],
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    rule: "Berakhiran 'e' (+d)",
    desc: "Hanya tambahkan -d.",
    examples: ["Live ➝ Lived", "Love ➝ Loved", "Dance ➝ Danced"],
    color: "bg-indigo-50 text-indigo-700 border-indigo-200"
  },
  {
    rule: "Konsonan + y (-ied)",
    desc: "Ubah 'y' menjadi 'i' dan tambahkan -ed.",
    examples: ["Study ➝ Studied", "Cry ➝ Cried", "Try ➝ Tried"],
    color: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    rule: "CVC (Konsonan Ganda)",
    desc: "Satu vokal + satu konsonan di akhir? Gandakan huruf terakhir.",
    examples: ["Stop ➝ Stopped", "Plan ➝ Planned", "Jog ➝ Jogged"],
    color: "bg-pink-50 text-pink-700 border-pink-200"
  }
];

const IRREGULAR_VERBS = [
  { base: "Go", past: "Went", sentence: "I went to the shops." },
  { base: "Eat", past: "Ate", sentence: "She ate pizza." },
  { base: "Have", past: "Had", sentence: "We had a good time." },
  { base: "See", past: "Saw", sentence: "I saw a movie." },
  { base: "Buy", past: "Bought", sentence: "He bought a car." },
  { base: "Do", past: "Did", sentence: "I did my homework." },
  { base: "Get", past: "Got", sentence: "She got up early." },
  { base: "Make", past: "Made", sentence: "He made a cake." },
  { base: "Say", past: "Said", sentence: "They said hello." },
  { base: "Come", past: "Came", sentence: "She came home late." },
];

const MIXED_EXAMPLES = [
  { type: "Positive (+)", text: "I visited my grandma.", translation: "Saya mengunjungi nenek saya.", icon: "👵" },
  { type: "Negative (-)", text: "I didn't visit my uncle.", translation: "Saya tidak mengunjungi paman saya.", icon: "🚫" },
  { type: "Question (?)", text: "Did you visit them?", translation: "Apakah kamu mengunjungi mereka?", icon: "❓" },
  { type: "Positive (+)", text: "She cleaned her room.", translation: "Dia membersihkan kamarnya.", icon: "🧹" },
  { type: "Negative (-)", text: "She didn't clean the kitchen.", translation: "Dia tidak membersihkan dapur.", icon: "🚫" },
  { type: "Question (?)", text: "Did she clean the car?", translation: "Apakah dia membersihkan mobil?", icon: "❓" },
  { type: "Positive (+)", text: "They played soccer.", translation: "Mereka bermain sepak bola.", icon: "⚽" },
  { type: "Negative (-)", text: "They didn't play tennis.", translation: "Mereka tidak bermain tenis.", icon: "🚫" },
  { type: "Question (?)", text: "Did they play well?", translation: "Apakah mereka bermain dengan baik?", icon: "❓" },
  { type: "Positive (+)", text: "He stopped the car.", translation: "Dia menghentikan mobilnya.", icon: "🛑" },
  { type: "Irregular (+)", text: "I went to the park.", translation: "Saya pergi ke taman.", icon: "🌳" },
  { type: "Irregular (-)", text: "I didn't go to school.", translation: "Saya tidak pergi ke sekolah.", icon: "🚫" },
  { type: "Irregular (?)", text: "Did you go home?", translation: "Apakah kamu pulang ke rumah?", icon: "❓" },
  { type: "Irregular (+)", text: "She ate a burger.", translation: "Dia makan burger.", icon: "🍔" },
  { type: "Irregular (-)", text: "She didn't eat salad.", translation: "Dia tidak makan salad.", icon: "🚫" },
  { type: "Irregular (?)", text: "Did she eat lunch?", translation: "Apakah dia makan siang?", icon: "❓" },
  { type: "Irregular (+)", text: "We saw a bird.", translation: "Kami melihat burung.", icon: "🐦" },
  { type: "Irregular (-)", text: "We didn't see a bear.", translation: "Kami tidak melihat beruang.", icon: "🚫" },
  { type: "Irregular (?)", text: "Did you see that?", translation: "Apakah kamu melihat itu?", icon: "❓" },
  { type: "Irregular (+)", text: "He bought milk.", translation: "Dia membeli susu.", icon: "🥛" }
];

const NEGATIVE_QUESTION_RULES = [
  {
    type: "Negative (-)",
    formula: "Subject + didn't + BASE VERB",
    example: "I didn't go. (NOT: I didn't went)",
    icon: "❌",
    color: "bg-red-50 text-red-700 border-red-200"
  },
  {
    type: "Question (?)",
    formula: "Did + Subject + BASE VERB?",
    example: "Did you play? (NOT: Did you played?)",
    icon: "❓",
    color: "bg-amber-50 text-amber-700 border-amber-200"
  }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Apa bentuk lampau dari 'Stop'?",
    options: ['Stoped', 'Stopped', 'Stopt'],
    answer: 'Stopped',
    explanation: "Aturan CVC: Satu vokal + satu konsonan di akhir = Gandakan konsonan (p -> pp)."
  },
  {
    id: 2,
    question: "I ___ (not / see) him yesterday.",
    options: ['didn\'t saw', 'didn\'t see', 'don\'t saw'],
    answer: 'didn\'t see',
    explanation: "Setelah 'didn't', gunakan kata kerja DASAR (see)."
  },
  {
    id: 3,
    question: "She ___ (study) for the exam.",
    options: ['studyed', 'stayed', 'studied'],
    answer: 'studied',
    explanation: "Aturan Konsonan + y: Ubah 'y' menjadi 'i' dan tambahkan 'ed'."
  },
  {
    id: 4,
    question: "Apa bentuk lampau dari 'Buy'?",
    options: ['Buyed', 'Bought', 'Brought'],
    answer: 'Bought',
    explanation: "'Buy' tidak beraturan. Bentuk lampaunya adalah 'Bought'. ('Brought' adalah bentuk lampau dari 'Bring')."
  },
  {
    id: 5,
    question: "___ you go to the party?",
    options: ['Do', 'Were', 'Did'],
    answer: 'Did',
    explanation: "Gunakan 'Did' untuk pertanyaan waktu lampau dengan kata kerja tindakan."
  },
  {
    id: 6,
    question: "He ___ (come) to my house last night.",
    options: ['comed', 'came', 'come'],
    answer: 'came',
    explanation: "'Come' tidak beraturan. Bentuk lampaunya adalah 'Came'."
  },
  {
    id: 7,
    question: "Apa bentuk lampau dari 'Stop'?",
    options: ["Stoped","Stopped","Stopt"],
    answer: "Stopped",
    explanation: "Aturan CVC: Satu vokal + satu konsonan di akhir = Gandakan konsonan (p -> pp)."
  },
  {
    id: 8,
    question: "I ___ (not / see) him last month.",
    options: ["didn't saw","didn't see","don't saw"],
    answer: "didn't see",
    explanation: "Setelah 'didn't', gunakan kata kerja DASAR (see)."
  },
  {
    id: 9,
    question: "She ___ (study) for the exam.",
    options: ["studyed","stayed","studied"],
    answer: "studied",
    explanation: "Aturan Konsonan + y: Ubah 'y' menjadi 'i' dan tambahkan 'ed'."
  },
  {
    id: 10,
    question: "Apa bentuk lampau dari 'Buy'?",
    options: ["Buyed","Bought","Brought"],
    answer: "Bought",
    explanation: "'Buy' tidak beraturan. Bentuk lampaunya adalah 'Bought'. ('Brought' adalah bentuk lampau dari 'Bring')."
  },
  {
    id: 11,
    question: "___ you go to the party?",
    options: ["Do","Were","Did"],
    answer: "Did",
    explanation: "Gunakan 'Did' untuk pertanyaan waktu lampau dengan kata kerja tindakan."
  },
  {
    id: 12,
    question: "She ___ (come) to my office last night.",
    options: ["comed","came","come"],
    answer: "came",
    explanation: "'Come' tidak beraturan. Bentuk lampaunya adalah 'Came'."
  },
  {
    id: 13,
    question: "Apa bentuk lampau dari 'Stop'?",
    options: ["Stoped","Stopped","Stopt"],
    answer: "Stopped",
    explanation: "Aturan CVC: Satu vokal + satu konsonan di akhir = Gandakan konsonan (p -> pp)."
  },
  {
    id: 14,
    question: "I ___ (not / see) him this morning.",
    options: ["didn't saw","didn't see","don't saw"],
    answer: "didn't see",
    explanation: "Setelah 'didn't', gunakan kata kerja DASAR (see)."
  },
  {
    id: 15,
    question: "My sister ___ (study) for the exam.",
    options: ["studyed","stayed","studied"],
    answer: "studied",
    explanation: "Aturan Konsonan + y: Ubah 'y' menjadi 'i' dan tambahkan 'ed'."
  },
  {
    id: 16,
    question: "Apa bentuk lampau dari 'Buy'?",
    options: ["Buyed","Bought","Brought"],
    answer: "Bought",
    explanation: "'Buy' tidak beraturan. Bentuk lampaunya adalah 'Bought'. ('Brought' adalah bentuk lampau dari 'Bring')."
  },
  {
    id: 17,
    question: "___ you go to the party?",
    options: ["Do","Were","Did"],
    answer: "Did",
    explanation: "Gunakan 'Did' untuk pertanyaan waktu lampau dengan kata kerja tindakan."
  },
  {
    id: 18,
    question: "My father ___ (come) to my flat last night.",
    options: ["comed","came","come"],
    answer: "came",
    explanation: "'Come' tidak beraturan. Bentuk lampaunya adalah 'Came'."
  },
  {
    id: 19,
    question: "Apa bentuk lampau dari 'Stop'?",
    options: ["Stoped","Stopped","Stopt"],
    answer: "Stopped",
    explanation: "Aturan CVC: Satu vokal + satu konsonan di akhir = Gandakan konsonan (p -> pp)."
  },
  {
    id: 20,
    question: "I ___ (not / see) him last week.",
    options: ["didn't saw","didn't see","don't saw"],
    answer: "didn't see",
    explanation: "Setelah 'didn't', gunakan kata kerja DASAR (see)."
  }
];

const ElemGrammarLesson2: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 2);
  const nextLessonPath = '/modul/english/elementary/grammar/lesson-3';
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
      lessonLabel={"Elementary Grammar Lesson 2"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Simple Past Tense"
            subtitle="Grammar • Pelajaran 2"
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
                  <TrendingUp className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Akhiran "-ed"</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Untuk sebagian besar kata kerja, kita hanya menambahkan <b>-ed</b> untuk berbicara tentang masa lalu. Namun, ejaannya bisa berubah!
                  </p>
                </div>
              </motion.section>

              <div className="space-y-4">
                {REGULAR_RULES.map((item, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${item.color.replace('text-', 'border-').split(' ')[2]}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`font-bold text-lg ${item.color.split(' ')[1]}`}>{item.rule}</h3>
                      <BookOpen className={`w-5 h-5 ${item.color.split(' ')[1]}`} />
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">{item.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.examples.map((ex, i) => (
                        <span key={i} className="bg-white/50 px-2 py-1 rounded text-xs font-bold border border-[var(--color-border)] text-[var(--color-text-secondary)]">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

<motion.section
                      custom={1}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Star className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Pelanggar Aturan!</h2>
                  <p className="text-orange-100 text-sm leading-relaxed">
                    Kata kerja tidak beraturan tidak mengikuti aturan. Mereka berubah sepenuhnya. Kamu hanya perlu menghafalnya!
                  </p>
                </div>
              </motion.section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {IRREGULAR_VERBS.map((verb, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-card)] flex items-center justify-between group hover:border-orange-300 transition-all">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[var(--color-text-muted)] font-medium text-sm">{verb.base}</span>
                        <span className="text-slate-300">➜</span>
                        <span className="text-orange-600 font-bold text-lg">{verb.past}</span>
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] italic">"{verb.sentence}"</p>
                    </div>
                    <button
                      onClick={() => playSound(verb.sentence)}
                      className="w-8 h-8 rounded-full bg-[var(--color-background)] text-[var(--color-text-muted)] flex items-center justify-center hover:bg-orange-100 hover:text-orange-600 transition-colors"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

<div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                  Logika "Did"
                </h3>
                <div className="space-y-4">
                  {NEGATIVE_QUESTION_RULES.map((rule, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border ${rule.color.replace('text-', 'border-').split(' ')[2]} bg-[var(--color-background)]`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-bold ${rule.color.split(' ')[1]}`}>{rule.type}</span>
                        <span className="text-xl">{rule.icon}</span>
                      </div>
                      <p className="font-mono text-xs bg-white p-2 rounded border border-[var(--color-border)] text-[var(--color-text-secondary)] mb-2">
                        {rule.formula}
                      </p>
                      <p className="text-sm text-[var(--color-text-primary)] italic">"{rule.example}"</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 p-5 rounded-2xl border border-yellow-200">
                <div className="flex gap-3">
                  <Lightbulb size={24} />
                  <div>
                    <h4 className="font-bold text-yellow-900 text-sm mb-1">Aturan Emas</h4>
                    <p className="text-xs text-yellow-800 leading-relaxed">
                      Ketika kamu menggunakan <b>Did</b> atau <b>Didn't</b>, kata kerja kembali ke <b>bentuk DASAR</b> (Present). "Did" sudah memberi tahu kita bahwa itu adalah bentuk lampau!
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
              <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] overflow-hidden">
                <div className="bg-[var(--color-background)] px-6 py-4 border-b border-[var(--color-border)]">
                  <h3 className="font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                    <BookOpen size={20} />
                    20 Kalimat Latihan
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Ketuk speaker untuk mendengarkan dan ulangi.</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {MIXED_EXAMPLES.map((item, idx) => (
                    <div key={idx} className="p-4 hover:bg-[var(--color-background)] transition-colors flex items-center justify-between group">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-[var(--color-text-muted)] w-6">{idx + 1}.</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1 ${item.type.includes("Negative") ? "bg-red-100 text-red-600" :
                            item.type.includes("Question") ? "bg-amber-100 text-amber-600" :
                              item.type.includes("Irregular") ? "bg-purple-100 text-purple-600" :
                                "bg-emerald-100 text-emerald-600"
                            }`}>
                            {item.icon} {item.type}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1">{item.text}</p>
                        <p className="text-xs text-[var(--color-text-muted)] italic">{item.translation}</p>
                      </div>
                      <button
                        onClick={() => playSound(item.text)}
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

export default ElemGrammarLesson2;

