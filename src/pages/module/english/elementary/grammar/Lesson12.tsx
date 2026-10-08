import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2, Lightbulb, CheckCircle2, XCircle, BookOpen, PenTool, Trophy, Star, TrendingUp
} from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const COMPARISON_RULES = [
  {
    title: "Kata Sifat (Adjectives)",
    desc: "Menjelaskan KATA BENDA (Orang, Tempat, Benda).",
    position: "Sebelum kata benda ATAU setelah 'To Be' / 'Feel' / 'Look'.",
    example: "She is a happy girl. / She looks happy.",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "👩"
  },
  {
    title: "Kata Keterangan (Adverbs)",
    desc: "Menjelaskan KATA KERJA (Aksi). Bagaimana Anda melakukannya?",
    position: "Biasanya setelah kata kerja.",
    example: "She sings happily.",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: "🏃‍♀️"
  }
];

const FORMATION_RULES = [
  { type: "Beraturan", rule: "Tambah -ly", ex: "Slow ➜ Slowly, Quick ➜ Quickly" },
  { type: "Berakhiran 'y'", rule: "Ubah -y jadi -ily", ex: "Happy ➜ Happily, Easy ➜ Easily" },
  { type: "Berakhiran 'le'", rule: "Ubah -e jadi -y", ex: "Terrible ➜ Terribly" },
  { type: "Tidak Beraturan", rule: "Berubah sepenuhnya", ex: "Good ➜ Well" },
  { type: "Tidak Berubah", rule: "Kata yang sama", ex: "Fast ➜ Fast, Hard ➜ Hard, Late ➜ Late" }
];

const EXAMPLE_SENTENCES = [
  { type: "Kata Sifat", en: "He is a slow driver.", id: "Dia pengemudi yang lambat.", icon: "🐢" },
  { type: "Kata Keterangan", en: "He drives slowly.", id: "Dia mengemudi dengan lambat.", icon: "🚗" },
  { type: "Kata Sifat", en: "The music is loud.", id: "Musiknya keras.", icon: "🔊" },
  { type: "Kata Keterangan", en: "He speaks loudly.", id: "Dia berbicara dengan keras.", icon: "🗣️" },
  { type: "Kata Sifat", en: "She is a good singer.", id: "Dia penyanyi yang bagus.", icon: "🎤" },
  { type: "Kata Keterangan", en: "She sings well.", id: "Dia menyanyi dengan baik.", icon: "🎵" },
  { type: "Kata Sifat", en: "Be careful!", id: "Berhati-hatilah!", icon: "⚠️" },
  { type: "Kata Keterangan", en: "Listen carefully.", id: "Dengarkan dengan saksama.", icon: "👂" },
  { type: "Kata Sifat", en: "The exam was easy.", id: "Ujiannya mudah.", icon: "📝" },
  { type: "Kata Keterangan", en: "I passed easily.", id: "Saya lulus dengan mudah.", icon: "✅" },
  { type: "Kata Sifat", en: "He is a fast runner.", id: "Dia pelari cepat.", icon: "🏃" },
  { type: "Kata Keterangan", en: "He runs fast.", id: "Dia berlari dengan cepat.", icon: "⚡" },
  { type: "Kata Sifat", en: "This bed is hard.", id: "Kasur ini keras.", icon: "🛏️" },
  { type: "Kata Keterangan", en: "We work hard.", id: "Kami bekerja keras.", icon: "💪" },
  { type: "Kata Sifat", en: "She was angry.", id: "Dia marah.", icon: "😠" },
  { type: "Kata Keterangan", en: "She shouted angrily.", id: "Dia berteriak dengan marah.", icon: "🗯️" },
  { type: "Kata Sifat", en: "They are happy children.", id: "Mereka anak-anak yang bahagia.", icon: "😊" },
  { type: "Kata Keterangan", en: "They played happily.", id: "Mereka bermain dengan gembira.", icon: "🧸" },
  { type: "Kata Sifat", en: "Her English is perfect.", id: "Bahasa Inggrisnya sempurna.", icon: "👌" },
  { type: "Kata Keterangan", en: "She speaks perfectly.", id: "Dia berbicara dengan sempurna.", icon: "💬" }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "This is a ___ car.",
    options: ['slow', 'slowly'],
    answer: 'slow',
    explanation: "Car adalah kata benda. Kita butuh Kata Sifat untuk menjelaskannya."
  },
  {
    id: 2,
    question: "He plays the piano ___.",
    options: ['good', 'well', 'goodly'],
    answer: 'well',
    explanation: "Play adalah kata kerja. Kita butuh kata keterangan 'Well'. 'Good' adalah kata sifat."
  },
  {
    id: 3,
    question: "Please speak ___.",
    options: ['quietly', 'quiet'],
    answer: 'quietly',
    explanation: "Speak adalah kata kerja. Kita butuh Kata Keterangan (Bagaimana cara bicara? Quietly)."
  },
  {
    id: 4,
    question: "She works very ___.",
    options: ['hardly', 'hard'],
    answer: 'hard',
    explanation: "'Hard' tidak beraturan. Kata keterangannya adalah 'Hard'. ('Hardly' artinya 'hampir tidak')."
  },
  {
    id: 5,
    question: "You look ___ today.",
    options: ['happy', 'happily'],
    answer: 'happy',
    explanation: "Setelah kata kerja seperti 'Look', 'Feel', 'Smell', 'Sound' (Indra), gunakan Kata Sifat."
  },
  {
    id: 6,
    question: "This is a ___ car.",
    options: ["slow","slowly"],
    answer: "slow",
    explanation: "Car adalah kata benda. Kita butuh Kata Sifat untuk menjelaskannya."
  },
  {
    id: 7,
    question: "He plays the piano ___.",
    options: ["good","well","goodly"],
    answer: "well",
    explanation: "Play adalah kata kerja. Kita butuh kata keterangan 'Well'. 'Good' adalah kata sifat."
  },
  {
    id: 8,
    question: "Please speak ___.",
    options: ["quietly", "quiet"],
    answer: "quietly",
    explanation: "Speak adalah kata kerja. Kita butuh Kata Keterangan (Bagaimana cara bicara? Quietly)."
  },
  {
    id: 9,
    question: "My mother works very ___.",
    options: ["hard","hardly"],
    answer: "hard",
    explanation: "'Hard' tidak beraturan. Kata keterangannya adalah 'Hard'. ('Hardly' artinya 'hampir tidak')."
  },
  {
    id: 10,
    question: "You look ___ today.",
    options: ["happy","happily"],
    answer: "happy",
    explanation: "Setelah kata kerja seperti 'Look', 'Feel', 'Smell', 'Sound' (Indra), gunakan Kata Sifat."
  },
  {
    id: 11,
    question: "This is a ___ car.",
    options: ["slow","slowly"],
    answer: "slow",
    explanation: "Car adalah kata benda. Kita butuh Kata Sifat untuk menjelaskannya."
  },
  {
    id: 12,
    question: "Mark plays the piano ___.",
    options: ["goodly", "well", "nice"],
    answer: "well",
    explanation: "Play adalah kata kerja. Kita butuh kata keterangan 'Well'. 'Good' adalah kata sifat."
  },
  {
    id: 13,
    question: "Please speak ___.",
    options: ["quietly", "quiet"],
    answer: "quietly",
    explanation: "Speak adalah kata kerja. Kita butuh Kata Keterangan (Bagaimana cara bicara? Quietly)."
  },
  {
    id: 14,
    question: "She works very ___.",
    options: ["hardly", "hard"],
    answer: "hard",
    explanation: "'Hard' tidak beraturan. Kata keterangannya adalah 'Hard'. ('Hardly' artinya 'hampir tidak')."
  },
  {
    id: 15,
    question: "You look ___ today.",
    options: ["happy","happily"],
    answer: "happy",
    explanation: "Setelah kata kerja seperti 'Look', 'Feel', 'Smell', 'Sound' (Indra), gunakan Kata Sifat."
  },
  {
    id: 16,
    question: "This is a ___ van.",
    options: ["slowly", "slow"],
    answer: "slow",
    explanation: "Car adalah kata benda. Kita butuh Kata Sifat untuk menjelaskannya."
  },
  {
    id: 17,
    question: "She plays the piano ___.",
    options: ["goodly", "excellent", "well"],
    answer: "well",
    explanation: "Play adalah kata kerja. Kita butuh kata keterangan 'Well'. 'Good' adalah kata sifat."
  },
  {
    id: 18,
    question: "Please speak ___.",
    options: ["quietly", "quiet"],
    answer: "quietly",
    explanation: "Speak adalah kata kerja. Kita butuh Kata Keterangan (Bagaimana cara bicara? Quietly)."
  },
  {
    id: 19,
    question: "She works very ___.",
    options: ["hardly", "hard"],
    answer: "hard",
    explanation: "'Hard' tidak beraturan. Kata keterangannya adalah 'Hard'. ('Hardly' artinya 'hampir tidak')."
  },
  {
    id: 20,
    question: "You look ___ this morning.",
    options: ["happily", "happy"],
    answer: "happy",
    explanation: "Setelah kata kerja seperti 'Look', 'Feel', 'Smell', 'Sound' (Indra), gunakan Kata Sifat."
  }
];

const ElemGrammarLesson12: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 12);
  const nextLessonPath = '/modul/english/elementary/grammar/lesson-13';
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
      lessonLabel={"Elementary Grammar Lesson 12"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Kata Sifat & Keterangan"
            subtitle="Grammar • Pelajaran 12"
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
                  <h2 className="text-xl font-bold mb-2">Menjelaskan Benda vs Aksi</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    <b>Adjectives</b> menjelaskan kata benda (benda). <br />
                    <b>Adverbs</b> menjelaskan kata kerja (aksi).
                  </p>
                </div>
              </motion.section>

              {/* Rules List */}
              <div className="grid gap-4">
                {COMPARISON_RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${rule.color.replace('bg-', 'border-').split(' ')[2]} relative`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`text-xl font-bold ${rule.color.split(' ')[1]}`}>{rule.title}</h3>
                      </div>
                      <span className="text-3xl">{rule.icon}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-2 font-medium">{rule.desc}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mb-3">{rule.position}</p>

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
                    <h4 className="font-bold text-yellow-900 mb-1">Pengecualian Kata Kerja Indra</h4>
                    <p className="text-sm text-yellow-800 leading-relaxed">
                      Kata kerja seperti <b>Look, Sound, Smell, Taste, Feel</b> menggunakan Kata Sifat, bukan Kata Keterangan.
                      <br />
                      Benar: "The food smells good." (Bukan well)
                      <br />
                      Benar: "You look happy." (Bukan happily)
                    </p>
                  </div>
                </div>
              </div>

<div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                  Cara membuat Adverbs
                </h3>

                <div className="space-y-3">
                  {FORMATION_RULES.map((item, idx) => (
                    <div key={idx} className="bg-[var(--color-background)] p-4 rounded-xl border border-[var(--color-border)]">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-[var(--color-text-primary)] text-sm">{item.type}</span>
                        <span className="text-xs text-[var(--color-text-muted)] bg-white px-2 py-1 rounded border border-[var(--color-border)]">{item.rule}</span>
                      </div>
                      <p className="text-sm font-mono text-indigo-600 font-bold">{item.ex}</p>
                    </div>
                  ))}
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
                    20 Contoh Pasangan
                  </h3>
                  <p className="text-xs text-indigo-600 mt-1">Ketuk untuk mendengar perbedaannya.</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {EXAMPLE_SENTENCES.map((item, idx) => (
                    <div key={idx} className="p-4 hover:bg-[var(--color-background)] transition-colors flex items-center justify-between group">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${item.type === "Kata Keterangan" ? "bg-purple-100 text-purple-600" :
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

export default ElemGrammarLesson12;

