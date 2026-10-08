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

const PLACE_PREPOSITIONS = [
  {
    prep: "Next to / Beside",
    desc: "Di samping.",
    example: "The bank is next to the hotel.",
    icon: "🏨🏦"
  },
  {
    prep: "Between",
    desc: "Di tengah dua benda.",
    example: "I am sitting between Tom and Ann.",
    icon: "🧍‍♂️🧍‍♀️🧍‍♂️"
  },
  {
    prep: "Opposite",
    desc: "Berhadap-hadapan.",
    example: "The shop is opposite the park.",
    icon: "🏪 ↔️ 🌳"
  },
  {
    prep: "In front of / Behind",
    desc: "Di depan atau Di belakang.",
    example: "The car is in front of the bus.",
    icon: "🚗 🚌"
  },
  {
    prep: "Above / Below",
    desc: "Lebih tinggi atau Lebih rendah (tidak menyentuh).",
    example: "The clock is above the door.",
    icon: "🕰️ 🚪"
  }
];

const MOVEMENT_PREPOSITIONS = [
  {
    prep: "Into / Out of",
    desc: "Masuk atau Keluar ruangan.",
    example: "Go into the room. / Get out of the car.",
    icon: "🚪🚶"
  },
  {
    prep: "Through",
    desc: "Masuk dan keluar dari sisi lain.",
    example: "Walk through the tunnel.",
    icon: "🚇"
  },
  {
    prep: "Across",
    desc: "Dari satu sisi ke sisi lain.",
    example: "Swim across the river.",
    icon: "🏊"
  },
  {
    prep: "Along",
    desc: "Bergerak di sepanjang garis.",
    example: "Walk along the beach.",
    icon: "🏖️🚶"
  },
  {
    prep: "Past",
    desc: "Melewati sesuatu.",
    example: "Go past the post office.",
    icon: "➡️🏤"
  }
];

const EXAMPLE_SENTENCES = [
  { type: "Tempat", en: "The cat is under the table.", id: "Kucing ada di bawah meja.", icon: "🐱" },
  { type: "Gerakan", en: "He walked into the room.", id: "Dia berjalan masuk ke ruangan.", icon: "🚶" },
  { type: "Tempat", en: "Our house is next to a park.", id: "Rumah kami di sebelah taman.", icon: "🏡" },
  { type: "Gerakan", en: "The bird flew over the roof.", id: "Burung itu terbang di atas atap.", icon: "🐦" },
  { type: "Tempat", en: "Who is standing behind you?", id: "Siapa yang berdiri di belakangmu?", icon: "👤" },
  { type: "Gerakan", en: "They drove through the city.", id: "Mereka berkendara melewati kota.", icon: "🚗" },
  { type: "Tempat", en: "The picture is above the sofa.", id: "Gambar itu ada di atas sofa.", icon: "🖼️" },
  { type: "Gerakan", en: "Get out of bed!", id: "Bangun dari kasur! (Keluar dari)", icon: "🛌" },
  { type: "Tempat", en: "The pharmacy is opposite the bank.", id: "Apotek ada di seberang bank.", icon: "💊" },
  { type: "Gerakan", en: "Be careful when you walk across the street.", id: "Hati-hati saat menyeberang jalan.", icon: "🚦" },
  { type: "Tempat", en: "I sit between Jack and Jill.", id: "Saya duduk di antara Jack dan Jill.", icon: "🪑" },
  { type: "Gerakan", en: "Go past the cinema and turn left.", id: "Lewati bioskop dan belok kiri.", icon: "🎬" },
  { type: "Tempat", en: "There is a fence around the house.", id: "Ada pagar di sekeliling rumah.", icon: "🚧" },
  { type: "Gerakan", en: "The train went through the tunnel.", id: "Kereta api melewati terowongan.", icon: "🚂" },
  { type: "Tempat", en: "Your shoes are under the chair.", id: "Sepatumu ada di bawah kursi.", icon: "👞" },
  { type: "Gerakan", en: "Put the money into your pocket.", id: "Masukkan uang ke dalam sakumu.", icon: "💰" },
  { type: "Tempat", en: "She is popular among her friends.", id: "Dia populer di antara teman-temannya.", icon: "👥" },
  { type: "Gerakan", en: "We walked along the river.", id: "Kami berjalan menyusuri sungai.", icon: "🌊" },
  { type: "Tempat", en: "The book is on top of the shelf.", id: "Buku itu ada di atas rak.", icon: "📚" },
  { type: "Gerakan", en: "He jumped off the wall.", id: "Dia melompat turun dari tembok.", icon: "🧱" }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "The car drove ___ the tunnel.",
    options: ['on', 'through', 'across'],
    answer: 'through',
    explanation: "Gunakan 'Through' untuk ruang 3D seperti terowongan atau hutan."
  },
  {
    id: 2,
    question: "The bank is ___ the post office.",
    options: ['next to', 'near to', 'next'],
    answer: 'next to',
    explanation: "Kita selalu bilang 'Next TO'. 'Near' tidak pakai 'to'."
  },
  {
    id: 3,
    question: "Please put the milk ___ the fridge.",
    options: ['out of', 'onto', 'into'],
    answer: 'into',
    explanation: "Gerakan ke dalam sesuatu menggunakan 'Into'."
  },
  {
    id: 4,
    question: "He swam ___ the river to the other side.",
    options: ['across', 'through', 'along'],
    answer: 'across',
    explanation: "'Across' berarti dari satu sisi ke sisi lain."
  },
  {
    id: 5,
    question: "There is a bridge ___ the river.",
    options: ['above', 'on', 'over'],
    answer: 'over',
    explanation: "Gunakan 'Over' untuk gerakan atau posisi melintasi di atas sesuatu."
  },
  {
    id: 6,
    question: "The bike drove ___ the tunnel.",
    options: ["through", "across", "on"],
    answer: "through",
    explanation: "Gunakan 'Through' untuk ruang 3D seperti terowongan atau hutan."
  },
  {
    id: 7,
    question: "The bank is ___ the post office.",
    options: ["next to", "near to", "next"],
    answer: "next to",
    explanation: "Kita selalu bilang 'Next TO'. 'Near' tidak pakai 'to'."
  },
  {
    id: 8,
    question: "Please put the milk ___ the fridge.",
    options: ["out of", "onto", "into"],
    answer: "into",
    explanation: "Gerakan ke dalam sesuatu menggunakan 'Into'."
  },
  {
    id: 9,
    question: "He swam ___ the river to the other side.",
    options: ["across", "through", "along"],
    answer: "across",
    explanation: "'Across' berarti dari satu sisi ke sisi lain."
  },
  {
    id: 10,
    question: "There is a bridge ___ the river.",
    options: ["above", "on", "over"],
    answer: "over",
    explanation: "Gunakan 'Over' untuk gerakan atau posisi melintasi di atas sesuatu."
  },
  {
    id: 11,
    question: "The car drove ___ the tunnel.",
    options: ["on", "through", "across"],
    answer: "through",
    explanation: "Gunakan 'Through' untuk ruang 3D seperti terowongan atau hutan."
  },
  {
    id: 12,
    question: "The bank is ___ the post office.",
    options: ["next to", "near to", "next"],
    answer: "next to",
    explanation: "Kita selalu bilang 'Next TO'. 'Near' tidak pakai 'to'."
  },
  {
    id: 13,
    question: "Please put the milk ___ the fridge.",
    options: ["out of", "onto", "into"],
    answer: "into",
    explanation: "Gerakan ke dalam sesuatu menggunakan 'Into'."
  },
  {
    id: 14,
    question: "Mark swam ___ the river to the other side.",
    options: ["across", "along", "through"],
    answer: "across",
    explanation: "'Across' berarti dari satu sisi ke sisi lain."
  },
  {
    id: 15,
    question: "There is a bridge ___ the river.",
    options: ["above", "on", "over"],
    answer: "over",
    explanation: "Gunakan 'Over' untuk gerakan atau posisi melintasi di atas sesuatu."
  },
  {
    id: 16,
    question: "The car drove ___ the tunnel.",
    options: ["on", "through", "across"],
    answer: "through",
    explanation: "Gunakan 'Through' untuk ruang 3D seperti terowongan atau hutan."
  },
  {
    id: 17,
    question: "The bank is ___ the post office.",
    options: ["next to", "near to", "next"],
    answer: "next to",
    explanation: "Kita selalu bilang 'Next TO'. 'Near' tidak pakai 'to'."
  },
  {
    id: 18,
    question: "Please put the milk ___ the fridge.",
    options: ["out of", "onto", "into"],
    answer: "into",
    explanation: "Gerakan ke dalam sesuatu menggunakan 'Into'."
  },
  {
    id: 19,
    question: "The boy swam ___ the river to the other side.",
    options: ["through", "along", "across"],
    answer: "across",
    explanation: "'Across' berarti dari satu sisi ke sisi lain."
  },
  {
    id: 20,
    question: "There is a bridge ___ the river.",
    options: ["above", "on", "over"],
    answer: "over",
    explanation: "Gunakan 'Over' untuk gerakan atau posisi melintasi di atas sesuatu."
  }
];

const ElemGrammarLesson9: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 9);
  const nextLessonPath = '/modul/english/elementary/grammar/lesson-10';
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
      lessonLabel={"Elementary Grammar Lesson 9"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Preposisi"
            subtitle="Grammar • Pelajaran 9"
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
                  <h2 className="text-xl font-bold mb-2">Preposisi Tempat</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Di mana itu? Kata-kata ini membantu kita menjelaskan lokasi benda dan orang dengan tepat.
                  </p>
                </div>
              </motion.section>

              {/* Rules List */}
              <div className="grid gap-4">
                {PLACE_PREPOSITIONS.map((rule, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-[var(--shadow-card)]">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-indigo-700">{rule.prep}</h3>
                        <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wide mt-1">{rule.desc}</p>
                      </div>
                      <span className="text-2xl bg-indigo-50 p-2 rounded-xl">{rule.icon}</span>
                    </div>
                    <div className="bg-[var(--color-background)] p-3 rounded-lg border border-[var(--color-border)]">
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">{rule.example}</p>
                    </div>
                  </div>
                ))}
              </div>

<div className="space-y-6">
              <motion.section
                      custom={1}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendingUp className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Preposisi Gerakan</h2>
                  <p className="text-teal-100 text-sm leading-relaxed">
                    Mau ke mana kita? Kata-kata ini menunjukkan aksi dan arah.
                  </p>
                </div>
              </motion.section>

              <div className="grid gap-4">
                {MOVEMENT_PREPOSITIONS.map((rule, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-[var(--shadow-card)]">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-[var(--color-primary)]">{rule.prep}</h3>
                        <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wide mt-1">{rule.desc}</p>
                      </div>
                      <span className="text-2xl bg-gray-50 p-2 rounded-xl">{rule.icon}</span>
                    </div>
                    <div className="bg-[var(--color-background)] p-3 rounded-lg border border-[var(--color-border)]">
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">{rule.example}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-orange-50 rounded-2xl p-5 border border-orange-200">
                <div className="flex gap-3">
                  <Sparkles className="w-6 h-6 text-orange-600" />
                  <div>
                    <h4 className="font-bold text-orange-900 text-sm mb-1">Kesalahan Umum</h4>
                    <p className="text-xs text-orange-800 leading-relaxed">
                      Jangan bingung antara <b>IN</b> (tempat) dengan <b>INTO</b> (gerakan).
                      <br />
                      "I am <b>in</b> the room." (Diam)
                      <br />
                      "I walked <b>into</b> the room." (Aksi)
                    </p>
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
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${item.type === "Gerakan" ? "bg-teal-100 text-[var(--color-primary)]" :
                            "bg-indigo-100 text-indigo-600"
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

export default ElemGrammarLesson9;
