import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, User, Smile, Star, Eye } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

// 30 Words divided into 3 categories
const APPEARANCE_VOCAB = [
  { word: "Curly hair", ipa: "/ˈkɜːrli hɛr/", meaning: "Rambut keriting" },
  { word: "Straight hair", ipa: "/streɪt hɛr/", meaning: "Rambut lurus" },
  { word: "Bald", ipa: "/bɔːld/", meaning: "Botak" },
  { word: "Blonde", ipa: "/blɒnd/", meaning: "Pirang" },
  { word: "Beard", ipa: "/bɪərd/", meaning: "Jenggot" },
  { word: "Mustache", ipa: "/ˈmʌstæʃ/", meaning: "Kumis" },
  { word: "Slim", ipa: "/slɪm/", meaning: "Langsing" },
  { word: "Chubby", ipa: "/ˈtʃʌbi/", meaning: "Gemuk / Tembem" },
  { word: "Muscular", ipa: "/ˈmʌskjʊlər/", meaning: "Berotot" },
  { word: "Pale", ipa: "/peɪl/", meaning: "Pucat" },
];

const PERSONALITY_VOCAB = [
  { word: "Friendly", ipa: "/ˈfrɛndli/", meaning: "Ramah" },
  { word: "Shy", ipa: "/ʃaɪ/", meaning: "Pemalu" },
  { word: "Polite", ipa: "/pəˈlaɪt/", meaning: "Sopan" },
  { word: "Rude", ipa: "/ruːd/", meaning: "Kasar / Tidak sopan" },
  { word: "Funny", ipa: "/ˈfʌni/", meaning: "Lucu / Humoris" },
  { word: "Serious", ipa: "/ˈsɪəriəs/", meaning: "Serius" },
  { word: "Generous", ipa: "/ˈdʒɛnərəs/", meaning: "Dermawan / Murah hati" },
  { word: "Stingy", ipa: "/ˈstɪndʒi/", meaning: "Pelit" },
  { word: "Honest", ipa: "/ˈɒnɪst/", meaning: "Jujur" },
  { word: "Lazy", ipa: "/ˈleɪzi/", meaning: "Malas" },
];

const ROLES_VOCAB = [
  { word: "Neighbor", ipa: "/ˈneɪbər/", meaning: "Tetangga" },
  { word: "Colleague", ipa: "/ˈkɒliːɡ/", meaning: "Rekan kerja" },
  { word: "Classmate", ipa: "/ˈklæsmeɪt/", meaning: "Teman sekelas" },
  { word: "Stranger", ipa: "/ˈstreɪndʒər/", meaning: "Orang asing" },
  { word: "Guest", ipa: "/ɡɛst/", meaning: "Tamu" },
  { word: "Host", ipa: "/hoʊst/", meaning: "Tuan rumah" },
  { word: "Acquaintance", ipa: "/əˈkweɪntəns/", meaning: "Kenalan (bukan teman dekat)" },
  { word: "Best friend", ipa: "/bɛst frɛnd/", meaning: "Sahabat" },
  { word: "Enemy", ipa: "/ˈɛnəmi/", meaning: "Musuh" },
  { word: "Relative", ipa: "/ˈrɛlətɪv/", meaning: "Kerabat / Saudara" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "He never lies. He is very ___.",
    options: ['shy', 'honest', 'lazy'],
    answer: 'honest',
    explanation: "Honest (Jujur) berarti seseorang yang mengatakan kebenaran."
  },
  {
    id: 2,
    question: "She has no hair. She is ___.",
    options: ['blonde', 'curly', 'bald'],
    answer: 'bald',
    explanation: "Bald (Botak) berarti tidak memiliki rambut di kepala."
  },
  {
    id: 3,
    question: "This is my ___. We work in the same office.",
    options: ['classmate', 'colleague', 'neighbor'],
    answer: 'colleague',
    explanation: "Colleague (Rekan kerja) adalah seseorang yang bekerja denganmu."
  },
  {
    id: 4,
    question: "He likes to give money to charity. He is ___.",
    options: ['stingy', 'generous', 'rude'],
    answer: 'generous',
    explanation: "Orang yang Generous (Dermawan) suka memberi atau berbagi."
  },
  {
    id: 5,
    question: "Which sentence is correct?",
    options: ['She has tall.', 'She is tall.', 'She is long hair.'],
    answer: 'She is tall.',
    explanation: "Gunakan 'IS' untuk kata sifat (tall). Gunakan 'HAS' untuk bagian tubuh (long hair)."
  },
  {
    id: 6,
    question: "He never lies. He is very ___.",
    options: ["shy","honest","lazy"],
    answer: "honest",
    explanation: "Honest (Jujur) berarti seseorang yang mengatakan kebenaran."
  },
  {
    id: 7,
    question: "my friend has no hair. my friend is ___.",
    options: ["blonde","curly","bald"],
    answer: "bald",
    explanation: "Bald (Botak) berarti tidak memiliki rambut di kepala."
  },
  {
    id: 8,
    question: "This is my ___. We work in the same office.",
    options: ["classmate","colleague","neighbor"],
    answer: "colleague",
    explanation: "Colleague (Rekan kerja) adalah seseorang yang bekerja denganmu."
  },
  {
    id: 9,
    question: "The man likes to give cash to charity. The man is ___.",
    options: ["stingy","generous","rude"],
    answer: "generous",
    explanation: "Orang yang Generous (Dermawan) suka memberi atau berbagi."
  },
  {
    id: 10,
    question: "Choose the correct sentence.",
    options: ["She has tall.","She is tall.","She is long hair."],
    answer: "the woman is tall.",
    explanation: "Gunakan 'IS' untuk kata sifat (tall). Gunakan 'HAS' untuk bagian tubuh (long hair)."
  },
  {
    id: 11,
    question: "He never lies. He is very ___.",
    options: ["shy","honest","lazy"],
    answer: "honest",
    explanation: "Honest (Jujur) berarti seseorang yang mengatakan kebenaran."
  },
  {
    id: 12,
    question: "He has no hair. He is ___.",
    options: ["blonde","curly","bald"],
    answer: "bald",
    explanation: "Bald (Botak) berarti tidak memiliki rambut di kepala."
  },
  {
    id: 13,
    question: "This is my ___. We work in the same office.",
    options: ["classmate","colleague","neighbor"],
    answer: "colleague",
    explanation: "Colleague (Rekan kerja) adalah seseorang yang bekerja denganmu."
  },
  {
    id: 14,
    question: "he likes to give funds to charity. he is ___.",
    options: ["stingy","generous","rude"],
    answer: "generous",
    explanation: "Orang yang Generous (Dermawan) suka memberi atau berbagi."
  },
  {
    id: 15,
    question: "Identify the right sentence.",
    options: ["She has tall.","She is tall.","She is long hair."],
    answer: "he is tall.",
    explanation: "Gunakan 'IS' untuk kata sifat (tall). Gunakan 'HAS' untuk bagian tubuh (long hair)."
  },
  {
    id: 16,
    question: "My friend never lies. My friend is very ___.",
    options: ["shy","honest","lazy"],
    answer: "honest",
    explanation: "Honest (Jujur) berarti seseorang yang mengatakan kebenaran."
  },
  {
    id: 17,
    question: "She has no hair. She is ___.",
    options: ["blonde","curly","bald"],
    answer: "bald",
    explanation: "Bald (Botak) berarti tidak memiliki rambut di kepala."
  },
  {
    id: 18,
    question: "This is my ___. We work in the same office.",
    options: ["classmate","colleague","neighbor"],
    answer: "colleague",
    explanation: "Colleague (Rekan kerja) adalah seseorang yang bekerja denganmu."
  },
  {
    id: 19,
    question: "He likes to give cash to charity. He is ___.",
    options: ["stingy","generous","rude"],
    answer: "generous",
    explanation: "Orang yang Generous (Dermawan) suka memberi atau berbagi."
  },
  {
    id: 20,
    question: "Which sentence is correct?",
    options: ["She has tall.","She is tall.","She is long hair."],
    answer: "He is tall.",
    explanation: "Gunakan 'IS' untuk kata sifat (tall). Gunakan 'HAS' untuk bagian tubuh (long hair)."
  }
];

const Lesson2: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_vocabulary', 2);
  const nextLessonPath = '/modul/english/elementary/vocabulary/lesson-3';
  const [vocabSection, setVocabSection] = useState<'looks' | 'traits' | 'roles'>('looks');

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

  const renderVocabList = (list: typeof APPEARANCE_VOCAB, colorClass: string, icon: any) => (
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
      lessonLabel={"Elementary Vocabulary Lesson 2"}
      accentColor={"#16A085"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Orang & Kepribadian"
            subtitle="Vocabulary • Pelajaran 2"
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
                  onClick={() => setVocabSection('looks')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'looks' ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Penampilan
                </button>
                <button
                  onClick={() => setVocabSection('traits')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'traits' ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Kepribadian
                </button>
                <button
                  onClick={() => setVocabSection('roles')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'roles' ? 'bg-rose-100 text-rose-700 ring-2 ring-rose-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Peran
                </button>
              </div>

              {vocabSection === 'looks' && (
                <>
                  <div className="bg-amber-50 p-4 rounded-2xl mb-4 border border-amber-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-amber-500 shadow-[var(--shadow-card)]"><Eye className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-amber-900 text-sm">Penampilan Fisik</h3>
                      <p className="text-xs text-amber-700">Mendeskripsikan penampilan orang.</p>
                    </div>
                  </div>
                  {renderVocabList(APPEARANCE_VOCAB, 'amber', Eye)}
                </>
              )}

              {vocabSection === 'traits' && (
                <>
                  <div className="bg-indigo-50 p-4 rounded-2xl mb-4 border border-indigo-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-indigo-500 shadow-[var(--shadow-card)]"><Smile className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-indigo-900 text-sm">Sifat Kepribadian</h3>
                      <p className="text-xs text-indigo-700">Mendeskripsikan karakter orang.</p>
                    </div>
                  </div>
                  {renderVocabList(PERSONALITY_VOCAB, 'indigo', Smile)}
                </>
              )}

              {vocabSection === 'roles' && (
                <>
                  <div className="bg-rose-50 p-4 rounded-2xl mb-4 border border-rose-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-rose-500 shadow-[var(--shadow-card)]"><User className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-rose-900 text-sm">Peran Sosial</h3>
                      <p className="text-xs text-rose-700">Orang-orang di sekitar kita dalam kehidupan sehari-hari.</p>
                    </div>
                  </div>
                  {renderVocabList(ROLES_VOCAB, 'rose', User)}
                </>
              )}

<div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb size={20} />
                  <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Mendeskripsikan Orang</h2>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Kita menggunakan dua kata kerja berbeda untuk mendeskripsikan orang: <b>Be (Is/Am/Are)</b> dan <b>Have (Has/Have)</b>.
                </p>

                <div className="space-y-4">
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                    <h3 className="font-bold text-amber-800 mb-2">Subject + BE + Kata Sifat</h3>
                    <p className="text-xs text-amber-700 mb-2">Gunakan untuk deskripsi umum dan perasaan.</p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-1">
                      <li>She <b>is</b> tall.</li>
                      <li>They <b>are</b> friendly.</li>
                      <li>He <b>is</b> bald.</li>
                    </ul>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <h3 className="font-bold text-indigo-800 mb-2">Subject + HAVE + Kata Benda (Fitur)</h3>
                    <p className="text-xs text-indigo-700 mb-2">Gunakan untuk bagian tubuh seperti rambut, mata, dll.</p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-1">
                      <li>She <b>has</b> curly hair.</li>
                      <li>He <b>has</b> blue eyes.</li>
                      <li>I <b>have</b> a beard.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
                <h3 className="font-bold text-rose-800 mb-2 text-sm uppercase tracking-wide">Kesalahan Umum</h3>
                <div className="bg-white p-3 rounded-lg border border-rose-100/50">
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Jangan katakan:</p>
                  <p className="text-sm font-medium text-red-500 line-through">She is long hair.</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-2 mb-1">Katakan:</p>
                  <p className="text-sm font-bold text-green-600">She has long hair.</p>
                </div>
              </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-pink-50 text-pink-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-pink-300 hover:bg-[var(--color-background)]";
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
                    className="px-8 py-3 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700 transition-all shadow-lg shadow-pink-200"
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

export default Lesson2;
