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

const NOUN_TYPES = [
  {
    title: "Dapat Dihitung (Countable)",
    desc: "Benda yang bisa kamu hitung menggunakan angka.",
    rules: ["Bisa pakai angka (one, two, three)", "Punya bentuk tunggal dan jamak", "Gunakan 'a' atau 'an'"],
    examples: ["One apple, two apples", "A car, three cars", "A student, many students"],
    color: "bg-emerald-50 text-emerald-700 border-blue-200",
    icon: "🍎"
  },
  {
    title: "Tak Dapat Dihitung (Uncountable)",
    desc: "Benda yang tidak bisa dihitung satu per satu (cairan, bubuk, ide).",
    rules: ["Tidak bisa pakai angka langsung", "Hanya bentuk tunggal (Tanpa 's')", "JANGAN gunakan 'a' atau 'an'"],
    examples: ["Water (BUKAN: two waters)", "Rice (BUKAN: three rices)", "Money (BUKAN: a money)"],
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "💧"
  }
];

const QUANTIFIERS = [
  { label: "A / An", use: "Satu Benda (Singular)", ex: "A cat, An apple" },
  { label: "Some", use: "Jamak & Tak Terhitung (+)", ex: "Some apples, Some water" },
  { label: "Any", use: "Jamak & Tak Terhitung (- / ?)", ex: "Any apples? Any water?" },
  { label: "Many", use: "Jamak (Countable)", ex: "Many cars" },
  { label: "Much", use: "Tak Terhitung (Uncountable)", ex: "Much time" },
  { label: "A lot of", use: "Keduanya", ex: "A lot of friends, A lot of money" }
];

const EXAMPLE_SENTENCES = [
  { type: "Countable", en: "I have an apple.", id: "Saya punya sebuah apel.", icon: "🍎" },
  { type: "Uncountable", en: "I need some water.", id: "Saya butuh air.", icon: "💧" },
  { type: "Countable", en: "There are two cats.", id: "Ada dua kucing.", icon: "🐱" },
  { type: "Uncountable", en: "He has a lot of money.", id: "Dia punya banyak uang.", icon: "💰" },
  { type: "Uncountable", en: "She drinks milk.", id: "Dia minum susu.", icon: "🥛" },
  { type: "Countable", en: "We bought three bananas.", id: "Kami membeli tiga pisang.", icon: "🍌" },
  { type: "Uncountable", en: "Do you have any rice?", id: "Apa kamu punya beras?", icon: "🍚" },
  { type: "Countable", en: "I see a bird.", id: "Saya melihat seekor burung.", icon: "🐦" },
  { type: "Uncountable", en: "This coffee is hot.", id: "Kopi ini panas.", icon: "☕" },
  { type: "Uncountable", en: "There is some bread.", id: "Ada roti.", icon: "🍞" },
  { type: "Countable", en: "I eat an egg for breakfast.", id: "Saya makan sebutir telur untuk sarapan.", icon: "🥚" },
  { type: "Uncountable", en: "He likes cheese.", id: "Dia suka keju.", icon: "🧀" },
  { type: "Countable", en: "I have five pens.", id: "Saya punya lima pulpen.", icon: "🖊️" },
  { type: "Uncountable", en: "There is too much noise.", id: "Terlalu banyak suara berisik.", icon: "🔊" },
  { type: "Countable", en: "I need a new phone.", id: "Saya butuh HP baru.", icon: "📱" },
  { type: "Uncountable", en: "Do you want some tea?", id: "Kamu mau teh?", icon: "🍵" },
  { type: "Countable", en: "She has many friends.", id: "Dia punya banyak teman.", icon: "👥" },
  { type: "Uncountable", en: "There isn't much time.", id: "Tidak banyak waktu.", icon: "⏳" },
  { type: "Countable", en: "I ate a sandwich.", id: "Saya makan roti lapis.", icon: "🥪" },
  { type: "Uncountable", en: "Put some sugar in it.", id: "Taruh gula di dalamnya.", icon: "🍬" }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "Apakah 'Rice' (Nasi) dapat dihitung (countable)?",
    options: ['Countable', 'Uncountable'],
    answer: 'Uncountable',
    explanation: "Nasi terdiri dari butiran kecil yang kita anggap sebagai satu kesatuan massa, jadi tak terhitung."
  },
  {
    id: 2,
    question: "I don't have ___ money.",
    options: ['many', 'much', 'a'],
    answer: 'much',
    explanation: "Uang (Money) tak terhitung, jadi gunakan 'much' dalam kalimat negatif."
  },
  {
    id: 3,
    question: "There are ___ apples on the table.",
    options: ['some', 'much', 'a'],
    answer: 'some',
    explanation: "Apel (Apples) dapat dihitung dan jamak, jadi gunakan 'some'."
  },
  {
    id: 4,
    question: "Can I have ___ advice?",
    options: ['an', 'a', 'some'],
    answer: 'some',
    explanation: "'Advice' (Nasihat) tak terhitung dalam bahasa Inggris. Katakan 'some advice', jangan pernah 'an advice'."
  },
  {
    id: 5,
    question: "How ___ cars do you see?",
    options: ['much', 'many', 'any'],
    answer: 'many',
    explanation: "Mobil (Cars) dapat dihitung, jadi tanyakan 'How many'."
  },
  {
    id: 6,
    question: "Apakah 'Rice' (Nasi) dapat dihitung (countable)?",
    options: ["Countable","Uncountable"],
    answer: "Uncountable",
    explanation: "Nasi terdiri dari butiran kecil yang kita anggap sebagai satu kesatuan massa, jadi tak terhitung."
  },
  {
    id: 7,
    question: "I don't have ___ money.",
    options: ["many","much","a"],
    answer: "much",
    explanation: "Uang (Money) tak terhitung, jadi gunakan 'much' dalam kalimat negatif."
  },
  {
    id: 8,
    question: "There are ___ apples on the table.",
    options: ["some","much","a"],
    answer: "some",
    explanation: "Apel (Apples) dapat dihitung dan jamak, jadi gunakan 'some'."
  },
  {
    id: 9,
    question: "Can I have ___ advice?",
    options: ["an","a","some"],
    answer: "some",
    explanation: "'Advice' (Nasihat) tak terhitung dalam bahasa Inggris. Katakan 'some advice', jangan pernah 'an advice'."
  },
  {
    id: 10,
    question: "How ___ cars do you see?",
    options: ["much","many","any"],
    answer: "many",
    explanation: "Mobil (Cars) dapat dihitung, jadi tanyakan 'How many'."
  },
  {
    id: 11,
    question: "Apakah 'Rice' (Nasi) dapat dihitung (countable)?",
    options: ["Countable","Uncountable"],
    answer: "Uncountable",
    explanation: "Nasi terdiri dari butiran kecil yang kita anggap sebagai satu kesatuan massa, jadi tak terhitung."
  },
  {
    id: 12,
    question: "I don't have ___ money.",
    options: ["many","much","a"],
    answer: "much",
    explanation: "Uang (Money) tak terhitung, jadi gunakan 'much' dalam kalimat negatif."
  },
  {
    id: 13,
    question: "There are ___ apples on the table.",
    options: ["some","much","a"],
    answer: "some",
    explanation: "Apel (Apples) dapat dihitung dan jamak, jadi gunakan 'some'."
  },
  {
    id: 14,
    question: "Can I have ___ advice?",
    options: ["an","a","some"],
    answer: "some",
    explanation: "'Advice' (Nasihat) tak terhitung dalam bahasa Inggris. Katakan 'some advice', jangan pernah 'an advice'."
  },
  {
    id: 15,
    question: "How ___ cars do you see?",
    options: ["much","many","any"],
    answer: "many",
    explanation: "Mobil (Cars) dapat dihitung, jadi tanyakan 'How many'."
  },
  {
    id: 16,
    question: "Apakah 'Rice' (Nasi) dapat dihitung (countable)?",
    options: ["Countable","Uncountable"],
    answer: "Uncountable",
    explanation: "Nasi terdiri dari butiran kecil yang kita anggap sebagai satu kesatuan massa, jadi tak terhitung."
  },
  {
    id: 17,
    question: "I don't have ___ money.",
    options: ["many","much","a"],
    answer: "much",
    explanation: "Uang (Money) tak terhitung, jadi gunakan 'much' dalam kalimat negatif."
  },
  {
    id: 18,
    question: "There are ___ apples on the table.",
    options: ["some","much","a"],
    answer: "some",
    explanation: "Apel (Apples) dapat dihitung dan jamak, jadi gunakan 'some'."
  },
  {
    id: 19,
    question: "Can I have ___ advice?",
    options: ["an","a","some"],
    answer: "some",
    explanation: "'Advice' (Nasihat) tak terhitung dalam bahasa Inggris. Katakan 'some advice', jangan pernah 'an advice'."
  },
  {
    id: 20,
    question: "How ___ cars do you see?",
    options: ["much","many","any"],
    answer: "many",
    explanation: "Mobil (Cars) dapat dihitung, jadi tanyakan 'How many'."
  }
];

const ElemGrammarLesson7: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 7);
  const nextLessonPath = '/modul/english/elementary/grammar/lesson-8';
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
      lessonLabel={"Elementary Grammar Lesson 7"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Countable vs Uncountable"
            subtitle="Grammar • Pelajaran 7"
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
                  <BookOpen className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Bisa dihitung?</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Dalam bahasa Inggris, beberapa kata benda bisa dihitung (1, 2, 3...) dan beberapa tidak. Ini mengubah aturan tata bahasa yang kita gunakan!
                  </p>
                </div>
              </motion.section>

              {/* Comparison Cards */}
              <div className="grid gap-4 md:grid-cols-2">
                {NOUN_TYPES.map((item, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${item.color.replace('bg-', 'border-').split(' ')[2]} relative overflow-hidden`}>
                    <div className="flex justify-between items-start relative z-10 mb-4">
                      <div>
                        <span className={`text-lg font-bold ${item.color.split(' ')[1]}`}>{item.title}</span>
                      </div>
                      <span className="text-3xl">{item.icon}</span>
                    </div>

                    <p className="text-sm text-[var(--color-text-secondary)] mb-4 font-medium">{item.desc}</p>

                    <ul className="text-xs text-[var(--color-text-secondary)] mb-4 space-y-1 list-disc list-inside">
                      {item.rules.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>

                    <div className="bg-white/60 p-3 rounded-lg border border-[var(--color-border)]/50">
                      <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase mb-1">Contoh:</p>
                      <p className="text-sm font-bold text-[var(--color-text-primary)]">{item.examples.join(", ")}</p>
                    </div>
                  </div>
                ))}
              </div>

<div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                  Berapa Banyak (Much/Many)?
                </h3>

                <div className="grid gap-3">
                  {QUANTIFIERS.map((q, idx) => (
                    <div key={idx} className="bg-[var(--color-background)] p-4 rounded-xl border border-[var(--color-border)] flex justify-between items-center">
                      <div>
                        <span className="font-black text-indigo-700 text-lg">{q.label}</span>
                        <p className="text-xs text-[var(--color-text-muted)] font-bold uppercase tracking-wide mt-1">{q.use}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-[var(--color-text-primary)] font-medium">{q.ex}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
                <h4 className="font-bold text-yellow-900 mb-2 flex items-center gap-2"><Lightbulb size={16} /> Tip Pro</h4>
                <p className="text-sm text-yellow-800 leading-relaxed">
                  <b>"A lot of"</b> itu aman! Kamu bisa menggunakannya untuk benda yang bisa dihitung maupun yang tidak.
                  <br /><br />
                  ✅ A lot of apples.<br />
                  ✅ A lot of water.
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
                <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                  <h3 className="font-bold text-indigo-800 flex items-center gap-2">
                    <BookOpen size={20} />
                    20 Kalimat Contoh
                  </h3>
                  <p className="text-xs text-indigo-600 mt-1">Ketuk untuk mendengarkan.</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {EXAMPLE_SENTENCES.map((item, idx) => (
                    <div key={idx} className="p-4 hover:bg-[var(--color-background)] transition-colors flex items-center justify-between group">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${item.type === "Countable" ? "bg-emerald-100 text-emerald-600" :
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

export default ElemGrammarLesson7;
