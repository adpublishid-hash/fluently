import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2, Lightbulb, CheckCircle2, XCircle, BookOpen, PenTool, Trophy, TrendingUp
} from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const LINKING_RULES = [
  {
    word: "AND",
    func: "Penambahan (+)",
    desc: "Menghubungkan ide serupa atau menambah informasi.",
    example: "I like tea AND coffee.",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "➕"
  },
  {
    word: "BUT",
    func: "Kontras (≠)",
    desc: "Menghubungkan ide yang berbeda atau berlawanan.",
    example: "I like tea, BUT I hate coffee.",
    color: "bg-red-50 text-red-700 border-red-200",
    icon: "↔️"
  },
  {
    word: "SO",
    func: "Hasil (➜)",
    desc: "Menunjukkan konsekuensi atau hasil dari sesuatu.",
    example: "I was tired, SO I slept.",
    color: "bg-green-50 text-green-700 border-sky-200",
    icon: "➡️"
  },
  {
    word: "BECAUSE",
    func: "Alasan (Why)",
    desc: "Menjelaskan penyebab atau alasan.",
    example: "I slept BECAUSE I was tired.",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: "💡"
  },
  {
    word: "OR",
    func: "Pilihan (?)",
    desc: "Menghubungkan dua kemungkinan atau alternatif.",
    example: "Do you want tea OR coffee?",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    icon: "⚖️"
  }
];

const EXAMPLE_SENTENCES = [
  { type: "AND (Tambah)", en: "I bought apples and bananas.", id: "Saya membeli apel dan pisang.", icon: "🍎" },
  { type: "BUT (Kontras)", en: "She is small but strong.", id: "Dia kecil tapi kuat.", icon: "💪" },
  { type: "SO (Hasil)", en: "It was raining, so we stayed home.", id: "Hujan, jadi kami diam di rumah.", icon: "🏠" },
  { type: "BECAUSE (Alasan)", en: "He is happy because he passed.", id: "Dia senang karena lulus.", icon: "😃" },
  { type: "OR (Pilihan)", en: "Do you want coffee or tea?", id: "Kamu mau kopi atau teh?", icon: "☕" },
  { type: "AND (Tambah)", en: "He can sing and dance.", id: "Dia bisa menyanyi dan menari.", icon: "🕺" },
  { type: "BUT (Kontras)", en: "The car is old, but it runs well.", id: "Mobilnya tua, tapi jalannya bagus.", icon: "🚗" },
  { type: "SO (Hasil)", en: "I was hungry, so I ate a sandwich.", id: "Saya lapar, jadi saya makan sandwich.", icon: "🥪" },
  { type: "BECAUSE (Alasan)", en: "She cried because she lost her doll.", id: "Dia menangis karena bonekanya hilang.", icon: "😢" },
  { type: "OR (Pilihan)", en: "We can go by bus or train.", id: "Kita bisa pergi naik bus atau kereta.", icon: "🚌" },
  { type: "AND (Tambah)", en: "I washed the dishes and swept the floor.", id: "Saya mencuci piring dan menyapu lantai.", icon: "🧹" },
  { type: "BUT (Kontras)", en: "I wanted to buy it, but I had no money.", id: "Saya ingin membelinya, tapi tak punya uang.", icon: "💸" },
  { type: "SO (Hasil)", en: "My phone died, so I couldn't call you.", id: "HP saya mati, jadi saya tak bisa menelepon.", icon: "📱" },
  { type: "BECAUSE (Alasan)", en: "He didn't go to work because he was sick.", id: "Dia tak kerja karena sakit.", icon: "🤒" },
  { type: "OR (Pilihan)", en: "Is it a boy or a girl?", id: "Laki-laki atau perempuan?", icon: "👶" },
  { type: "AND (Tambah)", en: "The food was cheap and delicious.", id: "Makanannya murah dan enak.", icon: "🍽️" },
  { type: "BUT (Kontras)", en: "He is rich, but he is not happy.", id: "Dia kaya, tapi tidak bahagia.", icon: "😟" },
  { type: "SO (Hasil)", en: "I woke up late, so I missed the bus.", id: "Saya bangun telat, jadi ketinggalan bus.", icon: "⏰" },
  { type: "BECAUSE (Alasan)", en: "I like her because she is funny.", id: "Saya suka dia karena dia lucu.", icon: "😆" },
  { type: "OR (Pilihan)", en: "You can pay by cash or card.", id: "Bisa bayar tunai atau kartu.", icon: "💳" }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "I was tired, ___ I went to bed early.",
    options: ['but', 'because', 'so'],
    answer: 'so',
    explanation: "'So' memperkenalkan hasil (tidur lebih awal) dari kelelahan."
  },
  {
    id: 2,
    question: "He likes football, ___ he doesn't like tennis.",
    options: ['and', 'or', 'but'],
    answer: 'but',
    explanation: "'But' menghubungkan dua ide yang kontras (suka vs tidak suka)."
  },
  {
    id: 3,
    question: "She is studying ___ she has an exam tomorrow.",
    options: ['and', 'because', 'so'],
    answer: 'because',
    explanation: "'Because' memperkenalkan alasannya (ada ujian)."
  },
  {
    id: 4,
    question: "Do you want to go to the cinema ___ the park?",
    options: ['because', 'or', 'so'],
    answer: 'or',
    explanation: "'Or' digunakan untuk menawarkan pilihan di antara opsi."
  },
  {
    id: 5,
    question: "I have a brother ___ a sister.",
    options: ['but', 'and', 'so'],
    answer: 'and',
    explanation: "'And' menambahkan informasi (saudara laki-laki + saudara perempuan)."
  },
  {
    id: 6,
    question: "I was tired, ___ I went to bed early.",
    options: ["but", "because", "so"],
    answer: "so",
    explanation: "'So' memperkenalkan hasil (tidur lebih awal) dari kelelahan."
  },
  {
    id: 7,
    question: "Mark likes football, ___ he doesn't like tennis.",
    options: ["or", "but", "and"],
    answer: "but",
    explanation: "'But' menghubungkan dua ide yang kontras (suka vs tidak suka)."
  },
  {
    id: 8,
    question: "My mother is studying ___ she has an exam tomorrow.",
    options: ["because","so","and"],
    answer: "because",
    explanation: "'Because' memperkenalkan alasannya (ada ujian)."
  },
  {
    id: 9,
    question: "Do you want to go to the cinema ___ the park?",
    options: ["because", "or", "so"],
    answer: "or",
    explanation: "'Or' digunakan untuk menawarkan pilihan di antara opsi."
  },
  {
    id: 10,
    question: "I have a brother ___ a sister.",
    options: ["but","and","so"],
    answer: "and",
    explanation: "'And' menambahkan informasi (saudara laki-laki + saudara perempuan)."
  },
  {
    id: 11,
    question: "I was tired, ___ I went to bed early.",
    options: ["but", "because", "so"],
    answer: "so",
    explanation: "'So' memperkenalkan hasil (tidur lebih awal) dari kelelahan."
  },
  {
    id: 12,
    question: "She likes football, ___ he doesn't like tennis.",
    options: ["but", "or", "and"],
    answer: "but",
    explanation: "'But' menghubungkan dua ide yang kontras (suka vs tidak suka)."
  },
  {
    id: 13,
    question: "The girl is studying ___ he has an exam tomorrow.",
    options: ["and", "because", "so"],
    answer: "because",
    explanation: "'Because' memperkenalkan alasannya (ada ujian)."
  },
  {
    id: 14,
    question: "Do you want to go to the cinema ___ the park?",
    options: ["because", "or", "so"],
    answer: "or",
    explanation: "'Or' digunakan untuk menawarkan pilihan di antara opsi."
  },
  {
    id: 15,
    question: "I have a brother ___ a sister.",
    options: ["but","and","so"],
    answer: "and",
    explanation: "'And' menambahkan informasi (saudara laki-laki + saudara perempuan)."
  },
  {
    id: 16,
    question: "I was tired, ___ I went to bed early.",
    options: ["but", "because", "so"],
    answer: "so",
    explanation: "'So' memperkenalkan hasil (tidur lebih awal) dari kelelahan."
  },
  {
    id: 17,
    question: "He likes golf, ___ he doesn't like tennis.",
    options: ["but", "or", "and"],
    answer: "but",
    explanation: "'But' menghubungkan dua ide yang kontras (suka vs tidak suka)."
  },
  {
    id: 18,
    question: "He is studying ___ the girl has an exam tomorrow.",
    options: ["and", "because", "so"],
    answer: "because",
    explanation: "'Because' memperkenalkan alasannya (ada ujian)."
  },
  {
    id: 19,
    question: "Do you want to go to the cinema ___ the park?",
    options: ["because", "or", "so"],
    answer: "or",
    explanation: "'Or' digunakan untuk menawarkan pilihan di antara opsi."
  },
  {
    id: 20,
    question: "I have a uncle ___ a sister.",
    options: ["so", "but", "and"],
    answer: "and",
    explanation: "'And' menambahkan informasi (saudara laki-laki + saudara perempuan)."
  }
];

const ElemGrammarLesson17: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 17);
  const nextLessonPath = '/modul/english/elementary/grammar/lesson-18';
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
      lessonLabel={"Elementary Grammar Lesson 17"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Kata Penghubung (Linking Words)"
            subtitle="Grammar • Pelajaran 17"
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
                  <h2 className="text-xl font-bold mb-2">Hubungkan Idemu</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Linking words (Kata Sambung) bertindak seperti lem. Mereka menghubungkan dua kalimat bersama-sama untuk membuat pembicaraanmu mengalir lebih baik.
                  </p>
                </div>
              </motion.section>

              {/* Rules List */}
              <div className="grid gap-4 mb-6">
                {LINKING_RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${rule.color.replace('bg-', 'border-').split(' ')[2]} relative`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`text-xl font-black ${rule.color.split(' ')[1]}`}>{rule.word}</h3>
                        <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wide mt-1">{rule.func}</p>
                      </div>
                      <span className="text-3xl">{rule.icon}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">{rule.desc}</p>

                    <div className="bg-white/60 p-3 rounded-lg border border-[var(--color-border)]/50">
                      <p className="text-sm font-medium text-[var(--color-text-primary)] italic">"{rule.example}"</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
                  <Lightbulb size={24} />
                  Tip Pro: Tanda Baca
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Saat menghubungkan dua kalimat lengkap, kita sering menggunakan <b>koma (,)</b> sebelum kata penghubung.
                  <br /><br />
                  <i>It was raining<b>, so</b> we stayed home.</i>
                </p>
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
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${item.type.includes("BUT") ? "bg-red-100 text-red-600" :
                            item.type.includes("SO") || item.type.includes("BECAUSE") ? "bg-purple-100 text-purple-600" :
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

export default ElemGrammarLesson17;

