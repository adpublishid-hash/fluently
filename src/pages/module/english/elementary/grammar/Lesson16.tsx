import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Trophy, TrendingUp
} from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const REPORTED_RULES = [
  {
    title: "Perubahan Tense (Backshift)",
    desc: "Biasanya, kita memindahkan kata kerja satu langkah mundur ke masa lalu.",
    formula: "Present Simple ➡️ Past Simple",
    example: "'I like it' ➡️ He said he liked it.",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "🔙"
  },
  {
    title: "Perubahan Kata Ganti",
    desc: "Ubah kata ganti agar sesuai dengan pembicara.",
    formula: "I ➡️ He / She",
    example: "'I am happy' ➡️ She said she was happy.",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: "👤"
  },
  {
    title: "Say vs Tell",
    desc: "Gunakan 'Said' sendirian. Gunakan 'Told' dengan objek (me, him, her).",
    formula: "He said... / He told me...",
    example: "He said (that) he was busy.",
    color: "bg-emerald-50 text-emerald-700 border-blue-200",
    icon: "🗣️"
  }
];

const TENSE_MAP = [
  { direct: "am / is", reported: "was" },
  { direct: "are", reported: "were" },
  { direct: "have / has", reported: "had" },
  { direct: "can", reported: "could" },
  { direct: "will", reported: "would" },
  { direct: "do / does", reported: "did" },
  { direct: "want", reported: "wanted" },
  { direct: "go", reported: "went" }
];

const EXAMPLE_SENTENCES = [
  { type: "Present ➡️ Past", en: "'I am happy.' ➜ He said he was happy.", id: "Dia berkata dia bahagia.", reported: "He said he was happy.", icon: "😊" },
  { type: "Present ➡️ Past", en: "'I like ice cream.' ➜ She said she liked ice cream.", id: "Dia berkata dia suka es krim.", reported: "She said she liked ice cream.", icon: "🍦" },
  { type: "Continuous ➡️ Past Cont.", en: "'I am working.' ➜ He said he was working.", id: "Dia berkata dia sedang bekerja.", reported: "He said he was working.", icon: "💼" },
  { type: "Have ➡️ Had", en: "'I have a car.' ➜ She said she had a car.", id: "Dia berkata dia punya mobil.", reported: "She said she had a car.", icon: "🚗" },
  { type: "Can ➡️ Could", en: "'I can swim.' ➜ He said he could swim.", id: "Dia berkata dia bisa berenang.", reported: "He said he could swim.", icon: "🏊" },
  { type: "Will ➡️ Would", en: "'I will call you.' ➜ She said she would call me.", id: "Dia berkata dia akan menelepon saya.", reported: "She said she would call me.", icon: "📞" },
  { type: "Must ➡️ Had to", en: "'I must go.' ➜ He said he had to go.", id: "Dia berkata dia harus pergi.", reported: "He said he had to go.", icon: "🚪" },
  { type: "Present ➡️ Past", en: "'My name is Bond.' ➜ He said his name was Bond.", id: "Dia berkata namanya Bond.", reported: "He said his name was Bond.", icon: "🕴️" },
  { type: "Present ➡️ Past", en: "'We are happy.' ➜ They said they were happy.", id: "Mereka berkata pak mereka bahagia.", reported: "They said they were happy.", icon: "🥳" },
  { type: "Negative", en: "'I don't know.' ➜ She said she didn't know.", id: "Dia berkata dia tidak tahu.", reported: "She said she didn't know.", icon: "🤷" },
  { type: "Continuous", en: "'I am cooking.' ➜ He said he was cooking.", id: "Dia berkata dia sedang memasak.", reported: "He said he was cooking.", icon: "🍳" },
  { type: "Want ➡️ Wanted", en: "'I want water.' ➜ She said she wanted water.", id: "Dia berkata dia ingin air.", reported: "She said she wanted water.", icon: "💧" },
  { type: "Is ➡️ Was", en: "'It is raining.' ➜ He said it was raining.", id: "Dia berkata hari sedang hujan.", reported: "He said it was raining.", icon: "🌧️" },
  { type: "Play ➡️ Played", en: "'I play tennis.' ➜ She said she played tennis.", id: "Dia berkata dia bermain tenis.", reported: "She said she played tennis.", icon: "🎾" },
  { type: "Feel ➡️ Felt", en: "'I feel sick.' ➜ He said he felt sick.", id: "Dia berkata dia merasa sakit.", reported: "He said he felt sick.", icon: "🤢" },
  { type: "Need ➡️ Needed", en: "'I need help.' ➜ She said she needed help.", id: "Dia berkata dia butuh bantuan.", reported: "She said she needed help.", icon: "🆘" },
  { type: "Live ➡️ Lived", en: "'We live here.' ➜ They said they lived there.", id: "Mereka berkata mereka tinggal di sana.", reported: "They said they lived there.", icon: "🏠" },
  { type: "Am ➡️ Was", en: "'I am busy.' ➜ He said he was busy.", id: "Dia berkata dia sibuk.", reported: "He said he was busy.", icon: "⏳" },
  { type: "Love ➡️ Loved", en: "'I love you.' ➜ She said she loved him.", id: "Dia berkata dia mencintainya.", reported: "She said she loved him.", icon: "❤️" },
  { type: "Drink ➡️ Drank", en: "'I drink coffee.' ➜ He said he drank coffee.", id: "Dia berkata dia minum kopi.", reported: "He said he drank coffee.", icon: "☕" }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "'I am tired.' ➡️ He said he ___ tired.",
    options: ['were', 'was', 'is'],
    answer: 'was',
    explanation: "Present 'am' berubah menjadi Past 'was'."
  },
  {
    id: 2,
    question: "'I can fly.' ➡️ She said she ___ fly.",
    options: ['can', 'canned', 'could'],
    answer: 'could',
    explanation: "'Can' berubah menjadi 'could' dalam reported speech."
  },
  {
    id: 3,
    question: "'I want pizza.' ➡️ He said he ___ pizza.",
    options: ['wanted', 'want', 'wants'],
    answer: 'wanted',
    explanation: "Present Simple 'want' berubah menjadi Past Simple 'wanted'."
  },
  {
    id: 4,
    question: "'I will help.' ➡️ She said she ___ help.",
    options: ['will', 'would', 'willed'],
    answer: 'would',
    explanation: "'Will' menjadi 'would'."
  },
  {
    id: 5,
    question: "'We are leaving.' ➡️ They said they ___ leaving.",
    options: ['was', 'were', 'are'],
    answer: 'were',
    explanation: "'Are' berubah menjadi 'were'."
  },
  {
    id: 6,
    question: "'I am sad.' ➡️ The boy said he ___ sad.",
    options: ["were", "was", "is"],
    answer: "was",
    explanation: "Present 'am' berubah menjadi Past 'was'."
  },
  {
    id: 7,
    question: "'I can fly.' ➡️ My sister said she ___ fly.",
    options: ["can", "canned", "could"],
    answer: "could",
    explanation: "'Can' berubah menjadi 'could' dalam reported speech."
  },
  {
    id: 8,
    question: "'I want pizza.' ➡️ He said she ___ pizza.",
    options: ["wants", "wanted", "want"],
    answer: "wanted",
    explanation: "Present Simple 'want' berubah menjadi Past Simple 'wanted'."
  },
  {
    id: 9,
    question: "'I will help.' ➡️ She said she ___ help.",
    options: ["will","would","willed"],
    answer: "would",
    explanation: "'Will' menjadi 'would'."
  },
  {
    id: 10,
    question: "'They are leaving.' ➡️ They said we ___ leaving.",
    options: ["was", "were", "are"],
    answer: "were",
    explanation: "'Are' berubah menjadi 'were'."
  },
  {
    id: 11,
    question: "'I am thirsty.' ➡️ My brother said he ___ thirsty.",
    options: ["were", "is", "was"],
    answer: "was",
    explanation: "Present 'am' berubah menjadi Past 'was'."
  },
  {
    id: 12,
    question: "'I can fly.' ➡️ She said she ___ fly.",
    options: ["can", "canned", "could"],
    answer: "could",
    explanation: "'Can' berubah menjadi 'could' dalam reported speech."
  },
  {
    id: 13,
    question: "'I want pasta.' ➡️ My father said he ___ pasta.",
    options: ["want", "wanted", "wants"],
    answer: "wanted",
    explanation: "Present Simple 'want' berubah menjadi Past Simple 'wanted'."
  },
  {
    id: 14,
    question: "'I will help.' ➡️ She said he ___ help.",
    options: ["would", "willed", "will"],
    answer: "would",
    explanation: "'Will' menjadi 'would'."
  },
  {
    id: 15,
    question: "'My parents are leaving.' ➡️ The teachers said they ___ leaving.",
    options: ["were", "was", "are"],
    answer: "were",
    explanation: "'Are' berubah menjadi 'were'."
  },
  {
    id: 16,
    question: "'I am thirsty.' ➡️ She said she ___ thirsty.",
    options: ["is", "were", "was"],
    answer: "was",
    explanation: "Present 'am' berubah menjadi Past 'was'."
  },
  {
    id: 17,
    question: "'I can fly.' ➡️ Mark said she ___ fly.",
    options: ["could", "can", "canned"],
    answer: "could",
    explanation: "'Can' berubah menjadi 'could' dalam reported speech."
  },
  {
    id: 18,
    question: "'I want pizza.' ➡️ He said the boy ___ pizza.",
    options: ["wanted","want","wants"],
    answer: "wanted",
    explanation: "Present Simple 'want' berubah menjadi Past Simple 'wanted'."
  },
  {
    id: 19,
    question: "'I will help.' ➡️ My father said the girl ___ help.",
    options: ["would", "willed", "will"],
    answer: "would",
    explanation: "'Will' menjadi 'would'."
  },
  {
    id: 20,
    question: "'We are leaving.' ➡️ We said we ___ leaving.",
    options: ["was", "are", "were"],
    answer: "were",
    explanation: "'Are' berubah menjadi 'were'."
  }
];

const ElemGrammarLesson16: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 16);
  const nextLessonPath = '/modul/english/elementary/grammar/lesson-17';
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
      lessonLabel={"Elementary Grammar Lesson 16"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Reported Speech (Kalimat Tidak Langsung)"
            subtitle="Grammar • Pelajaran 16"
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
                  <h2 className="text-xl font-bold mb-2">Dia berkata, Dia bilang...</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Reported speech digunakan untuk menceritakan apa yang dikatakan orang lain.
                    <br />
                    Biasanya, tata bahasa mundur satu langkah ke <b>masa lalu (past)</b>.
                  </p>
                </div>
              </motion.section>

              {/* Rules List */}
              <div className="grid gap-4 mb-6">
                {REPORTED_RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${rule.color.replace('bg-', 'border-').split(' ')[2]} relative`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`text-xl font-bold ${rule.color.split(' ')[1]}`}>{rule.title}</h3>
                      </div>
                      <span className="text-3xl">{rule.icon}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">{rule.desc}</p>

                    <div className="bg-white/60 p-3 rounded-lg border border-[var(--color-border)]/50 mb-2">
                      <p className="text-xs text-[var(--color-text-muted)] font-bold uppercase mb-1">Formula</p>
                      <p className="text-sm font-mono text-[var(--color-text-primary)]">{rule.formula}</p>
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)] italic">"{rule.example}"</p>
                  </div>
                ))}
              </div>

              {/* Tense Map */}
              <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-[var(--shadow-card)]">
                <div className="bg-[var(--color-background)] px-4 py-3 border-b border-[var(--color-border)]">
                  <h3 className="font-bold text-[var(--color-text-primary)]">Perubahan Tense</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {TENSE_MAP.map((t, i) => (
                    <div key={i} className="p-3 flex justify-between items-center text-sm">
                      <span className="font-medium text-[var(--color-text-secondary)]">{t.direct}</span>
                      <span className="text-slate-300">➜</span>
                      <span className="font-bold text-indigo-600">{t.reported}</span>
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
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${item.type.includes("Present") ? "bg-blue-100 text-blue-600" :
                            "bg-purple-100 text-purple-600"
                            }`}>
                            {item.type}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">{item.en}</p>
                        <p className="text-sm text-[var(--color-text-muted)] italic">{item.id}</p>
                      </div>
                      <button
                        onClick={() => playSound(item.reported)}
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

export default ElemGrammarLesson16;
