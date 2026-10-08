import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2, Lightbulb, CheckCircle2, XCircle, BookOpen, PenTool, Trophy, Star
} from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { playAudio } from '../../../../../services/ttsService';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const MODAL_RULES = [
  {
    modal: "Can / Can't",
    usage: "Kemampuan & Izin",
    desc: "Gunakan untuk hal yang bisa kamu lakukan, atau permintaan informal.",
    example: "I can swim. / Can I go?",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "💪"
  },
  {
    modal: "Could / Couldn't",
    usage: "Kemampuan Lampau & Permintaan Sopan",
    desc: "Bentuk lampau dari 'Can', atau cara sangat sopan untuk bertanya.",
    example: "I could run fast when I was young. / Could you help me?",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    icon: "🎩"
  },
  {
    modal: "Should / Shouldn't",
    usage: "Saran",
    desc: "Gunakan untuk menyarankan apa yang baik atau buruk untuk dilakukan.",
    example: "You should sleep more. / You shouldn't smoke.",
    color: "bg-green-50 text-green-700 border-sky-200",
    icon: "💡"
  },
  {
    modal: "Must / Mustn't",
    usage: "Kewajiban & Larangan",
    desc: "Keharusan yang kuat. 'Mustn't' artinya dilarang.",
    example: "I must study. / You must not touch that.",
    color: "bg-red-50 text-red-700 border-red-200",
    icon: "🛑"
  }
];

const EXAMPLE_SENTENCES = [
  { type: "Can (Kemampuan)", en: "I can play the guitar.", id: "Saya bisa bermain gitar.", icon: "🎸" },
  { type: "Can (Izin)", en: "Can I open the window?", id: "Boleh saya buka jendelanya?", icon: "🪟" },
  { type: "Can't (Negatif)", en: "She can't speak Japanese.", id: "Dia tidak bisa bicara bahasa Jepang.", icon: "🗣️" },
  { type: "Could (Kemampuan Lampau)", en: "I could read when I was four.", id: "Saya bisa membaca saat umur 4 tahun.", icon: "👶" },
  { type: "Could (Sopan)", en: "Could you pass the salt, please?", id: "Bisakah Anda mengoper garamnya?", icon: "🧂" },
  { type: "Could (Kemungkinan)", en: "It could rain later.", id: "Nanti mungkin hujan.", icon: "☁️" },
  { type: "Should (Saran)", en: "You look tired, you should rest.", id: "Kamu terlihat lelah, kamu harus istirahat.", icon: "🛌" },
  { type: "Should (Saran)", en: "We should eat more vegetables.", id: "Kita sebaiknya makan lebih banyak sayur.", icon: "🥦" },
  { type: "Shouldn't (Negatif)", en: "You shouldn't watch TV all day.", id: "Kamu tidak seharusnya nonton TV seharian.", icon: "📺" },
  { type: "Should (?)", en: "Should I call him?", id: "Haruskah saya meneleponnya?", icon: "📞" },
  { type: "Must (Kewajiban)", en: "I must finish this work today.", id: "Saya harus menyelesaikan pekerjaan ini hari ini.", icon: "📝" },
  { type: "Must (Kuat)", en: "You must wear a seatbelt.", id: "Kamu wajib memakai sabuk pengaman.", icon: "🚗" },
  { type: "Mustn't (Dilarang)", en: "You mustn't smoke here.", id: "Kamu dilarang merokok di sini.", icon: "🚭" },
  { type: "Mustn't (Dilarang)", en: "Students must not use phones in class.", id: "Siswa dilarang pakai HP di kelas.", icon: "📱" },
  { type: "Can (Permintaan)", en: "Can you help me?", id: "Bisakah kamu membantuku?", icon: "🤝" },
  { type: "Could (Negatif)", en: "He couldn't come to the party.", id: "Dia tidak bisa datang ke pesta (kemarin).", icon: "🎉" },
  { type: "Should (Opini)", en: "They should buy a new car.", id: "Mereka sebaiknya membeli mobil baru.", icon: "🚙" },
  { type: "Must (Deduksi)", en: "He is crying. He must be sad.", id: "Dia menangis. Dia pasti sedih.", icon: "😢" },
  { type: "Can't (Tidak Mungkin)", en: "It can't be true!", id: "Itu tidak mungkin benar!", icon: "😱" },
  { type: "Could (Sopan)", en: "Could I have a glass of water?", id: "Bolehkah saya minta segelas air?", icon: "💧" }
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "You ___ smoke in a hospital. It is forbidden.",
    options: ['must not', 'don\'t have to', 'should not'],
    answer: 'must not',
    explanation: "'Must not' (Mustn't) digunakan untuk larangan keras (aturan/hukum)."
  },
  {
    id: 2,
    question: "I ___ swim when I was 5 years old.",
    options: ['should', 'could', 'can'],
    answer: 'could',
    explanation: "'When I was 5' ada di masa lalu. Bentuk lampau 'Can' adalah 'Could'."
  },
  {
    id: 3,
    question: "It is raining. You ___ take an umbrella.",
    options: ['mustn\'t', 'can\'t', 'should'],
    answer: 'should',
    explanation: "Ini adalah saran. 'Should' adalah pilihan yang paling tepat."
  },
  {
    id: 4,
    question: "___ you help me with this bag, please?",
    options: ['Could', 'Should', 'Must'],
    answer: 'Could',
    explanation: "'Could' digunakan untuk permintaan sopan."
  },
  {
    id: 5,
    question: "I ___ go now, it is very late.",
    options: ['must', 'shouldn\'t', 'can'],
    answer: 'must',
    explanation: "'Must' menunjukkan kebutuhan atau kewajiban yang kuat."
  },
  {
    id: 6,
    question: "You ___ smoke in a hospital. It is forbidden.",
    options: ["must not", "don't have to", "should not"],
    answer: "must not",
    explanation: "'Must not' (Mustn't) digunakan untuk larangan keras (aturan/hukum)."
  },
  {
    id: 7,
    question: "I ___ swim when I was 5 years old.",
    options: ["should", "could", "can"],
    answer: "could",
    explanation: "'When I was 5' ada di masa lalu. Bentuk lampau 'Can' adalah 'Could'."
  },
  {
    id: 8,
    question: "It is raining. You ___ take an umbrella.",
    options: ["mustn't", "can't", "should"],
    answer: "should",
    explanation: "Ini adalah saran. 'Should' adalah pilihan yang paling tepat."
  },
  {
    id: 9,
    question: "___ you help me with this bag, please?",
    options: ["Could", "Should", "Must"],
    answer: "Could",
    explanation: "'Could' digunakan untuk permintaan sopan."
  },
  {
    id: 10,
    question: "I ___ go now, it is very late.",
    options: ["must", "shouldn't", "can"],
    answer: "must",
    explanation: "'Must' menunjukkan kebutuhan atau kewajiban yang kuat."
  },
  {
    id: 11,
    question: "You ___ smoke in a hospital. It is forbidden.",
    options: ["must not", "don't have to", "should not"],
    answer: "must not",
    explanation: "'Must not' (Mustn't) digunakan untuk larangan keras (aturan/hukum)."
  },
  {
    id: 12,
    question: "I ___ swim when I was 5 years old.",
    options: ["should", "could", "can"],
    answer: "could",
    explanation: "'When I was 5' ada di masa lalu. Bentuk lampau 'Can' adalah 'Could'."
  },
  {
    id: 13,
    question: "It is raining. You ___ take an umbrella.",
    options: ["mustn't", "can't", "should"],
    answer: "should",
    explanation: "Ini adalah saran. 'Should' adalah pilihan yang paling tepat."
  },
  {
    id: 14,
    question: "___ you help me with this bag, please?",
    options: ["Could", "Should", "Must"],
    answer: "Could",
    explanation: "'Could' digunakan untuk permintaan sopan."
  },
  {
    id: 15,
    question: "I ___ go now, it is very late.",
    options: ["must", "shouldn't", "can"],
    answer: "must",
    explanation: "'Must' menunjukkan kebutuhan atau kewajiban yang kuat."
  },
  {
    id: 16,
    question: "You ___ smoke in a hospital. It is forbidden.",
    options: ["must not", "don't have to", "should not"],
    answer: "must not",
    explanation: "'Must not' (Mustn't) digunakan untuk larangan keras (aturan/hukum)."
  },
  {
    id: 17,
    question: "I ___ swim when I was 5 years old.",
    options: ["should", "could", "can"],
    answer: "could",
    explanation: "'When I was 5' ada di masa lalu. Bentuk lampau 'Can' adalah 'Could'."
  },
  {
    id: 18,
    question: "It is raining. You ___ take an umbrella.",
    options: ["mustn't", "can't", "should"],
    answer: "should",
    explanation: "Ini adalah saran. 'Should' adalah pilihan yang paling tepat."
  },
  {
    id: 19,
    question: "___ you help me with this bag, please?",
    options: ["Could", "Should", "Must"],
    answer: "Could",
    explanation: "'Could' digunakan untuk permintaan sopan."
  },
  {
    id: 20,
    question: "I ___ go now, it is very late.",
    options: ["must", "shouldn't", "can"],
    answer: "must",
    explanation: "'Must' menunjukkan kebutuhan atau kewajiban yang kuat."
  }
];

const ElemGrammarLesson11: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_grammar', 11);
  const nextLessonPath = '/modul/english/elementary/grammar/lesson-12';
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
      lessonLabel={"Elementary Grammar Lesson 11"}
      accentColor={"#8E44AD"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Modal Verbs"
            subtitle="Grammar • Pelajaran 11"
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
                  <h2 className="text-xl font-bold mb-2">Kata Kerja Modal</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Kata kerja modal menambah makna pada kata kerja utama. Mereka tidak pernah berubah bentuk (tidak ada 's', 'ing', 'ed').
                    <br />
                    <b>Can, Could, Should, Must</b>
                  </p>
                </div>
              </motion.section>

              {/* Rules List */}
              <div className="grid gap-4">
                {MODAL_RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-[var(--shadow-card)] ${rule.color.replace('bg-', 'border-').split(' ')[2]} relative`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`text-xl font-bold ${rule.color.split(' ')[1]}`}>{rule.modal}</h3>
                        <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wide mt-1">{rule.usage}</p>
                      </div>
                      <span className="text-3xl">{rule.icon}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">{rule.desc}</p>
                    <div className="bg-white/60 p-3 rounded-lg border border-[var(--color-border)]/50">
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">{rule.example}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Important Rule */}
              <div className="mt-6 bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-yellow-600 mt-1" />
                  <div>
                    <h4 className="font-bold text-yellow-900 mb-1">Aturan Emas</h4>
                    <p className="text-sm text-yellow-800 leading-relaxed">
                      Jangan pernah tambahkan <b>to</b> setelah modal ini.
                      <br />
                      Benar: I can swim.
                      <br />
                      Salah: I can <s>to</s> swim.
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
                    20 Contoh Modal
                  </h3>
                  <p className="text-xs text-indigo-600 mt-1">Ketuk untuk mendengarkan.</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {EXAMPLE_SENTENCES.map((item, idx) => (
                    <div key={idx} className="p-4 hover:bg-[var(--color-background)] transition-colors flex items-center justify-between group">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${item.type.includes("Must") ? "bg-red-100 text-red-600" :
                            item.type.includes("Can") ? "bg-blue-100 text-blue-600" :
                              item.type.includes("Should") ? "bg-green-100 text-green-600" :
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

export default ElemGrammarLesson11;
