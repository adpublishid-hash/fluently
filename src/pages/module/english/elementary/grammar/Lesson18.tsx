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

const QUESTION_RULES = [
  {
    title: "Yes / No Questions",
    rule: "Helper + Subject + Verb",
    desc: "Jawabannya selalu Ya atau Tidak.",
    example: "Do you like coffee? / Is she sleeping?",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "👍"
  },
  {
    title: "Wh- Questions (Objek)",
    rule: "Wh- + Helper + Subject + Verb",
    desc: "Menanyakan tentang objek. Jenis paling umum.",
    example: "Where do you live? / What did you buy?",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: "❓"
  },
  {
    title: "Subject Questions",
    rule: "Wh- (Subjek) + Verb",
    desc: "Menanyakan 'Siapa' atau 'Apa' yang melakukan tindakan. TANPA HELPER (do/did)!",
    example: "Who called you? (NOT: Who did call you?)",
    color: "bg-orange-50 text-orange-700 border-orange-200",
    icon: "👑"
  }
];

const WH_WORDS = [
  { word: "Who", use: "Orang" },
  { word: "What", use: "Benda / Tindakan" },
  { word: "Where", use: "Tempat" },
  { word: "When", use: "Waktu" },
  { word: "Why", use: "Alasan" },
  { word: "How", use: "Cara" },
  { word: "Which", use: "Pilihan" },
  { word: "Whose", use: "Kepemilikan" }
];

const EXAMPLE_SENTENCES = [
  { type: "Yes/No", en: "Do you like pizza?", id: "Apakah kamu suka pizza?", icon: "🍕" },
  { type: "Yes/No", en: "Did he go to school?", id: "Apakah dia pergi ke sekolah?", icon: "🏫" },
  { type: "Yes/No", en: "Are they playing football?", id: "Apakah mereka sedang main bola?", icon: "⚽" },
  { type: "Yes/No", en: "Can she swim?", id: "Bisakah dia berenang?", icon: "🏊" },
  { type: "Wh- (Tempat)", en: "Where do you live?", id: "Di mana kamu tinggal?", icon: "🏠" },
  { type: "Wh- (Benda)", en: "What did you eat?", id: "Apa yang kamu makan?", icon: "🍽️" },
  { type: "Wh- (Waktu)", en: "When will they arrive?", id: "Kapan mereka akan tiba?", icon: "⏰" },
  { type: "Wh- (Alasan)", en: "Why are you crying?", id: "Kenapa kamu menangis?", icon: "😢" },
  { type: "Wh- (Orang)", en: "Who is your teacher?", id: "Siapa gurumu?", icon: "👨‍🏫" },
  { type: "Wh- (Cara)", en: "How do you spell that?", id: "Bagaimana cara mengejanya?", icon: "🔤" },
  { type: "Subjek Q", en: "Who called you?", id: "Siapa yang meneleponmu?", icon: "📞" },
  { type: "Subjek Q", en: "What happened?", id: "Apa yang terjadi?", icon: "💥" },
  { type: "Subjek Q", en: "Who broke the window?", id: "Siapa yang memecahkan jendela?", icon: "🪟" },
  { type: "Subjek Q", en: "What fell off the table?", id: "Apa yang jatuh dari meja?", icon: "⬇️" },
  { type: "Subjek Q", en: "Who lives in that house?", id: "Siapa yang tinggal di rumah itu?", icon: "🏡" },
  { type: "Wh- Frasa", en: "How much does it cost?", id: "Berapa harganya?", icon: "💰" },
  { type: "Wh- Frasa", en: "How many brothers do you have?", id: "Berapa saudara laki-laki yang kamu punya?", icon: "👦" },
  { type: "Wh- Frasa", en: "How long is the movie?", id: "Berapa lama filmnya?", icon: "🎬" },
  { type: "Wh- Frasa", en: "How often do you exercise?", id: "Seberapa sering kamu olahraga?", icon: "💪" },
  { type: "Wh- Pilihan", en: "Which color do you prefer?", id: "Warna mana yang kamu lebih suka?", icon: "🎨" }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "___ you like chocolate?",
    options: ['Do', 'Are', 'Have'],
    answer: 'Do',
    explanation: "Pertanyaan Simple Present dengan 'You' menggunakan 'Do'."
  },
  {
    id: 2,
    question: "Where ___ she live?",
    options: ['do', 'does', 'is'],
    answer: 'does',
    explanation: "Simple Present dengan 'She' menggunakan 'Does'."
  },
  {
    id: 3,
    question: "Who ___ the window? (Subject Question)",
    options: ['did break', 'broke', 'does break'],
    answer: 'broke',
    explanation: "Subject questions (Siapa yang melakukan tindakan?) TIDAK menggunakan helper verbs seperti did/do. Gunakan bentuk past tense secara langsung."
  },
  {
    id: 4,
    question: "___ car is this?",
    options: ['Who', 'Who\'s', 'Whose'],
    answer: 'Whose',
    explanation: "'Whose' menanyakan tentang kepemilikan (Milik siapa)."
  },
  {
    id: 5,
    question: "___ many apples do you need?",
    options: ['How', 'What', 'Who'],
    answer: 'How',
    explanation: "'How many' digunakan untuk jumlah yang dapat dihitung."
  },
  {
    id: 6,
    question: "___ you like chocolate?",
    options: ["Do","Are","Have"],
    answer: "Do",
    explanation: "Pertanyaan Simple Present dengan 'You' menggunakan 'Do'."
  },
  {
    id: 7,
    question: "Where ___ he live?",
    options: ["do","does","is"],
    answer: "does",
    explanation: "Simple Present dengan 'The boy' menggunakan 'Does'."
  },
  {
    id: 8,
    question: "Who ___ the window? (Subject Question)",
    options: ["did break","broke","does break"],
    answer: "broke",
    explanation: "Subject questions (Siapa yang melakukan tindakan?) TIDAK menggunakan helper verbs seperti did/do. Gunakan bentuk past tense secara langsung."
  },
  {
    id: 9,
    question: "___ car is this?",
    options: ["Who","Who's","Whose"],
    answer: "Whose",
    explanation: "'Whose' menanyakan tentang kepemilikan (Milik siapa)."
  },
  {
    id: 10,
    question: "___ many apples do you need?",
    options: ["How","What","Who"],
    answer: "How",
    explanation: "'How many' digunakan untuk jumlah yang dapat dihitung."
  },
  {
    id: 11,
    question: "___ you like chocolate?",
    options: ["Do","Are","Have"],
    answer: "Do",
    explanation: "Pertanyaan Simple Present dengan 'You' menggunakan 'Do'."
  },
  {
    id: 12,
    question: "Where ___ she live?",
    options: ["do","does","is"],
    answer: "does",
    explanation: "Simple Present dengan 'My mother' menggunakan 'Does'."
  },
  {
    id: 13,
    question: "Who ___ the window? (Subject Question)",
    options: ["did break","broke","does break"],
    answer: "broke",
    explanation: "Subject questions (Siapa yang melakukan tindakan?) TIDAK menggunakan helper verbs seperti did/do. Gunakan bentuk past tense secara langsung."
  },
  {
    id: 14,
    question: "___ bus is this?",
    options: ["Who","Who's","Whose"],
    answer: "Whose",
    explanation: "'Whose' menanyakan tentang kepemilikan (Milik siapa)."
  },
  {
    id: 15,
    question: "___ many apples do you need?",
    options: ["How","What","Who"],
    answer: "How",
    explanation: "'How many' digunakan untuk jumlah yang dapat dihitung."
  },
  {
    id: 16,
    question: "___ you like chocolate?",
    options: ["Do","Are","Have"],
    answer: "Do",
    explanation: "Pertanyaan Simple Present dengan 'You' menggunakan 'Do'."
  },
  {
    id: 17,
    question: "Where ___ the girl live?",
    options: ["do","does","is"],
    answer: "does",
    explanation: "Simple Present dengan 'Anna' menggunakan 'Does'."
  },
  {
    id: 18,
    question: "Who ___ the window? (Subject Question)",
    options: ["did break","broke","does break"],
    answer: "broke",
    explanation: "Subject questions (Siapa yang melakukan tindakan?) TIDAK menggunakan helper verbs seperti did/do. Gunakan bentuk past tense secara langsung."
  },
  {
    id: 19,
    question: "___ car is this?",
    options: ["Who","Who's","Whose"],
    answer: "Whose",
    explanation: "'Whose' menanyakan tentang kepemilikan (Milik siapa)."
  },
  {
    id: 20,
    question: "___ many apples do you need?",
    options: ["How","What","Who"],
    answer: "How",
    explanation: "'How many' digunakan untuk jumlah yang dapat dihitung."
  }
];

const ElemGrammarLesson18: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 18);
  const nextLessonPath = '/modul/english/elementary/grammar/lesson-19';
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
      lessonLabel={"Elementary Grammar Lesson 18"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Bentuk Pertanyaan"
            subtitle="Grammar • Pelajaran 18"
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
                  <h2 className="text-xl font-bold mb-2">Bertanya</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Pertanyaan biasanya dimulai dengan <b>Kata Kerja Bantu (Helper Verb)</b> (Do, Did, Is) atau <b>Kata Tanya Wh-</b> (What, Where, Who).
                  </p>
                </div>
              </motion.section>

              {/* Rules List */}
              <div className="grid gap-4 mb-6">
                {QUESTION_RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${rule.color.replace('bg-', 'border-').split(' ')[2]} relative`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`text-xl font-black ${rule.color.split(' ')[1]}`}>{rule.title}</h3>
                      </div>
                      <span className="text-3xl">{rule.icon}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">{rule.desc}</p>

                    <div className="bg-white/60 p-3 rounded-lg border border-[var(--color-border)]/50 mb-2">
                      <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wide mb-1">Struktur</p>
                      <p className="text-sm font-mono text-[var(--color-text-primary)] font-bold">{rule.rule}</p>
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)] italic">"{rule.example}"</p>
                  </div>
                ))}
              </div>

              {/* Wh Words */}
              <div className="bg-white rounded-2xl p-5 border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-4">Kata Tanya (Wh-)</h3>
                <div className="grid grid-cols-2 gap-3">
                  {WH_WORDS.map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-[var(--color-background)] p-2 rounded-lg text-sm">
                      <span className="font-bold text-indigo-700">{item.word}</span>
                      <span className="text-[var(--color-text-muted)] text-xs">{item.use}</span>
                    </div>
                  ))}
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
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${item.type.includes("Subjek") ? "bg-orange-100 text-orange-600" :
                            item.type.includes("Wh-") ? "bg-purple-100 text-purple-600" :
                              "bg-blue-100 text-blue-600"
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

export default ElemGrammarLesson18;
