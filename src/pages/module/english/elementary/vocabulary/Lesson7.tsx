import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, User, Flame, Star, Sparkles } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

// 30 Words divided into 3 categories
const NUTRITION_VOCAB = [
  { word: "Healthy", ipa: "/ˈhɛlθi/", meaning: "Sehat" },
  { word: "Unhealthy", ipa: "/ʌnˈhɛlθi/", meaning: "Tidak sehat" },
  { word: "Vitamin", ipa: "/ˈvaɪtəmɪn/", meaning: "Vitamin" },
  { word: "Protein", ipa: "/ˈproʊtiːn/", meaning: "Protein" },
  { word: "Fat", ipa: "/fæt/", meaning: "Lemak" },
  { word: "Carbohydrate", ipa: "/ˌkɑːrboʊˈhaɪdreɪt/", meaning: "Karbohidrat" },
  { word: "Fiber", ipa: "/ˈfaɪbər/", meaning: "Serat" },
  { word: "Diet", ipa: "/ˈdaɪət/", meaning: "Diet / Pola makan" },
  { word: "Calories", ipa: "/ˈkæləriz/", meaning: "Kalori" },
  { word: "Sugar", ipa: "/ˈʃʊɡər/", meaning: "Gula" },
];

const COOKING_VOCAB = [
  { word: "Boil", ipa: "/bɔɪl/", meaning: "Merebus" },
  { word: "Fry", ipa: "/fraɪ/", meaning: "Menggoreng" },
  { word: "Bake", ipa: "/beɪk/", meaning: "Memanggang (kue/roti)" },
  { word: "Grill", ipa: "/ɡrɪl/", meaning: "Membakar (daging)" },
  { word: "Chop", ipa: "/tʃɒp/", meaning: "Mencincang / Memotong" },
  { word: "Slice", ipa: "/slaɪs/", meaning: "Mengiris" },
  { word: "Peel", ipa: "/piːl/", meaning: "Mengupas" },
  { word: "Stir", ipa: "/stɜːr/", meaning: "Mengaduk" },
  { word: "Mix", ipa: "/mɪks/", meaning: "Mencampur" },
  { word: "Taste", ipa: "/teɪst/", meaning: "Mencicipi / Rasa" },
];

const HEALTH_SYMPTOMS_VOCAB = [
  { word: "Pain", ipa: "/peɪn/", meaning: "Rasa sakit / Nyeri" },
  { word: "Headache", ipa: "/ˈhɛdeɪk/", meaning: "Sakit kepala" },
  { word: "Stomachache", ipa: "/ˈstʌməkˌeɪk/", meaning: "Sakit perut" },
  { word: "Fever", ipa: "/ˈfiːvər/", meaning: "Demam" },
  { word: "Cold", ipa: "/koʊld/", meaning: "Pilek / Masuk angin" },
  { word: "Medicine", ipa: "/ˈmɛdɪsɪn/", meaning: "Obat" },
  { word: "Doctor", ipa: "/ˈdɒktər/", meaning: "Dokter" },
  { word: "Dentist", ipa: "/ˈdɛntɪst/", meaning: "Dokter gigi" },
  { word: "Exercise", ipa: "/ˈɛksərsaɪz/", meaning: "Olahraga" },
  { word: "Rest", ipa: "/rɛst/", meaning: "Istirahat" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "To cook bread or cake, you usually ___ it.",
    options: ['boil', 'bake', 'fry'],
    answer: 'bake',
    explanation: "Baking (memanggang) adalah memasak makanan (seperti kue/roti) di oven."
  },
  {
    id: 2,
    question: "Apples and oranges are healthy because they have ___.",
    options: ['fat', 'vitamins', 'salt'],
    answer: 'vitamins',
    explanation: "Buah-buahan kaya akan vitamins (vitamin)."
  },
  {
    id: 3,
    question: "My head hurts. I have a ___.",
    options: ['stomachache', 'headache', 'fever'],
    answer: 'headache',
    explanation: "Rasa sakit di kepala disebut headache (sakit kepala)."
  },
  {
    id: 4,
    question: "You should ___ vegetables before cooking them.",
    options: ['chop', 'drink', 'rest'],
    answer: 'chop',
    explanation: "To chop berarti memotong menjadi potongan-potongan."
  },
  {
    id: 5,
    question: "If you have a cold, you should take some ___.",
    options: ['sugar', 'medicine', 'exercise'],
    answer: 'medicine',
    explanation: "Medicine (obat) membantu menyembuhkan penyakit."
  },
  {
    id: 6,
    question: "To cook bread or cake, you usually ___ it.",
    options: ["boil","bake","fry"],
    answer: "bake",
    explanation: "Baking (memanggang) adalah memasak makanan (seperti kue/roti) di oven."
  },
  {
    id: 7,
    question: "Apples and oranges are healthy because they have ___.",
    options: ["fat","vitamins","salt"],
    answer: "vitamins",
    explanation: "Buah-buahan kaya akan vitamins (vitamin)."
  },
  {
    id: 8,
    question: "My head hurts. I have a ___.",
    options: ["stomachache","headache","fever"],
    answer: "headache",
    explanation: "Rasa sakit di kepala disebut headache (sakit kepala)."
  },
  {
    id: 9,
    question: "You should ___ vegetables before cooking them.",
    options: ["chop","drink","rest"],
    answer: "chop",
    explanation: "To chop berarti memotong menjadi potongan-potongan."
  },
  {
    id: 10,
    question: "If you have a cold, you should take some ___.",
    options: ["sugar","medicine","exercise"],
    answer: "medicine",
    explanation: "Medicine (obat) membantu menyembuhkan penyakit."
  },
  {
    id: 11,
    question: "To cook bread or cake, you usually ___ it.",
    options: ["boil","bake","fry"],
    answer: "bake",
    explanation: "Baking (memanggang) adalah memasak makanan (seperti kue/roti) di oven."
  },
  {
    id: 12,
    question: "Apples and oranges are healthy because they have ___.",
    options: ["fat","vitamins","salt"],
    answer: "vitamins",
    explanation: "Buah-buahan kaya akan vitamins (vitamin)."
  },
  {
    id: 13,
    question: "My head hurts. I have a ___.",
    options: ["stomachache","headache","fever"],
    answer: "headache",
    explanation: "Rasa sakit di kepala disebut headache (sakit kepala)."
  },
  {
    id: 14,
    question: "You should ___ vegetables before cooking them.",
    options: ["chop","drink","rest"],
    answer: "chop",
    explanation: "To chop berarti memotong menjadi potongan-potongan."
  },
  {
    id: 15,
    question: "If you have a cold, you should take some ___.",
    options: ["sugar","medicine","exercise"],
    answer: "medicine",
    explanation: "Medicine (obat) membantu menyembuhkan penyakit."
  },
  {
    id: 16,
    question: "To cook bread or cake, you usually ___ it.",
    options: ["boil","bake","fry"],
    answer: "bake",
    explanation: "Baking (memanggang) adalah memasak makanan (seperti kue/roti) di oven."
  },
  {
    id: 17,
    question: "Apples and oranges are healthy because they have ___.",
    options: ["fat","vitamins","salt"],
    answer: "vitamins",
    explanation: "Buah-buahan kaya akan vitamins (vitamin)."
  },
  {
    id: 18,
    question: "My head hurts. I have a ___.",
    options: ["stomachache","headache","fever"],
    answer: "headache",
    explanation: "Rasa sakit di kepala disebut headache (sakit kepala)."
  },
  {
    id: 19,
    question: "You should ___ vegetables before cooking them.",
    options: ["chop","drink","rest"],
    answer: "chop",
    explanation: "To chop berarti memotong menjadi potongan-potongan."
  },
  {
    id: 20,
    question: "If you have a cold, you should take some ___.",
    options: ["sugar","medicine","exercise"],
    answer: "medicine",
    explanation: "Medicine (obat) membantu menyembuhkan penyakit."
  }
];

const Lesson7: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_vocabulary', 7);
  const nextLessonPath = '/modul/english/elementary/vocabulary/lesson-8';
  const [vocabSection, setVocabSection] = useState<'nutrition' | 'cooking' | 'health'>('nutrition');

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string) => { playAudio(text, 0.9); };

  // Quiz Logic
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

  const renderVocabList = (list: typeof NUTRITION_VOCAB, colorClass: string, icon: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in">
      {list.map((item, idx) => (
        <button
          key={idx}
          onClick={() => playSound(item.word)}
          className={`bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-card)] flex items-center justify-between group hover:border-${colorClass}-300 hover:shadow-md transition-all active:scale-95 text-left`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full bg-${colorClass}-50 text-${colorClass}-500 flex items-center justify-center flex-shrink-0 font-bold text-sm`}>
              {idx + 1}
            </div>
            <div>
              <p className="font-bold text-[var(--color-text-primary)]">{item.word}</p>
              <p className="text-xs text-[var(--color-text-muted)] font-mono mb-1">{item.ipa}</p>
              <p className="text-xs text-[var(--color-text-muted)] italic">{item.meaning}</p>
            </div>
          </div>
          <Volume2 className={`w-5 h-5 text-slate-300 group-hover:text-${colorClass}-500`} />
        </button>
      ))}
    </div>
  );

  return (
        <>
          <LessonCompleteModal
      show={showCompleteModal}
      onClose={() => setShowCompleteModal(false)}
      lessonLabel={"Elementary Vocabulary Lesson 7"}
      accentColor={"#16A085"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Makanan & Kesehatan"
            subtitle="Vocabulary • Pelajaran 7"
            accentColor="#2980B9"
            nextLesson={nextLessonPath}
            tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}
            footer={() => (
                <button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #2980B9, #2980B9cc)' }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
                </button>
            )}
        >
            {(tabId) => tabId === 'learn' ? (
        <div className="space-y-8 animate-fade-in">
{/* Category Switcher */}
              <div className="flex justify-center gap-2 mb-6">
                <button
                  onClick={() => setVocabSection('nutrition')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'nutrition' ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Nutrisi
                </button>
                <button
                  onClick={() => setVocabSection('cooking')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'cooking' ? 'bg-orange-100 text-orange-700 ring-2 ring-orange-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Memasak
                </button>
                <button
                  onClick={() => setVocabSection('health')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'health' ? 'bg-rose-100 text-rose-700 ring-2 ring-rose-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Kesehatan
                </button>
              </div>

              {vocabSection === 'nutrition' && (
                <>
                  <div className="bg-emerald-50 p-4 rounded-2xl mb-4 border border-blue-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-emerald-500 shadow-[var(--shadow-card)]"><Sparkles size={20} /></div>
                    <div>
                      <h3 className="font-bold text-emerald-900 text-sm">Nutrisi & Diet</h3>
                      <p className="text-xs text-emerald-700">Kata-kata tentang apa yang kita makan.</p>
                    </div>
                  </div>
                  {renderVocabList(NUTRITION_VOCAB, 'emerald', Sparkles)}
                </>
              )}

              {vocabSection === 'cooking' && (
                <>
                  <div className="bg-orange-50 p-4 rounded-2xl mb-4 border border-orange-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-orange-500 shadow-[var(--shadow-card)]"><Flame className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-orange-900 text-sm">Di Dapur</h3>
                      <p className="text-xs text-orange-700">Kata kerja untuk menyiapkan makanan.</p>
                    </div>
                  </div>
                  {renderVocabList(COOKING_VOCAB, 'orange', Flame)}
                </>
              )}

              {vocabSection === 'health' && (
                <>
                  <div className="bg-rose-50 p-4 rounded-2xl mb-4 border border-rose-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-rose-500 shadow-[var(--shadow-card)]"><User className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-rose-900 text-sm">Kesehatan & Tubuh</h3>
                      <p className="text-xs text-rose-700">Penyakit dan menjaga kebugaran.</p>
                    </div>
                  </div>
                  {renderVocabList(HEALTH_SYMPTOMS_VOCAB, 'rose', User)}
                </>
              )}

<div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb size={20} />
                  <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Memberi Saran: Should</h2>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Gunakan <b>Should</b> untuk memberi saran atau mengatakan apa yang baik untuk dilakukan.
                </p>

                <div className="space-y-4">
                  <div className="bg-emerald-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-emerald-800 mb-2">Should (Lakukan)</h3>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-2">
                      <li>You <b>should</b> eat more fruit.</li>
                      <li>He <b>should</b> see a doctor.</li>
                      <li>We <b>should</b> exercise daily.</li>
                    </ul>
                  </div>

                  <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
                    <h3 className="font-bold text-rose-800 mb-2">Shouldn't (Jangan Lakukan)</h3>
                    <ul className="space-y-2 text-sm text-[var(--color-text-primary)]">
                      <li>You <b>shouldn't</b> eat too much sugar.</li>
                      <li>She <b>shouldn't</b> stay up late.</li>
                      <li>They <b>shouldn't</b> smoke.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2 text-sm uppercase tracking-wide">Kesalahan Umum</h3>
                <div className="bg-white p-3 rounded-lg border border-indigo-100/50">
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Jangan katakan:</p>
                  <p className="text-sm font-medium text-red-500 line-through">You should to eat.</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-2 mb-1">Katakan:</p>
                  <p className="text-sm font-bold text-green-600">You should eat.</p>
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-1">(Tidak ada 'to' setelah Should)</p>
                </div>
              </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-blue-300 hover:bg-[var(--color-background)]";
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
                        {quizStep < QUIZ_QUESTIONS.length - 1 ? "Pertanyaan Selanjutnya" : "Lihat Hasil"}
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
                    className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-blue-200"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
            </div>
        </div>
      )}
    </LessonShell>
    </>
  );
};

export default Lesson7;
