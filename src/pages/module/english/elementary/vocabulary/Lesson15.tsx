import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, Smile, ClipboardList, TrendingUp, Star } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

// 30 Words divided into 3 categories (Review Mix)
const SOCIETY_WORK_VOCAB = [
  { word: "Career", ipa: "/kəˈrɪər/", meaning: "Karir / Pekerjaan" },
  { word: "Skill", ipa: "/skɪl/", meaning: "Keahlian" },
  { word: "Success", ipa: "/səkˈsɛs/", meaning: "Kesuksesan" },
  { word: "Customer", ipa: "/ˈkʌstəmər/", meaning: "Pelanggan" },
  { word: "Manager", ipa: "/ˈmænɪdʒər/", meaning: "Manajer" },
  { word: "University", ipa: "/ˌjuːnɪˈvɜːrsɪti/", meaning: "Universitas" },
  { word: "Knowledge", ipa: "/ˈnɒlɪdʒ/", meaning: "Pengetahuan" },
  { word: "Technology", ipa: "/tɛkˈnɒlədʒi/", meaning: "Teknologi" },
  { word: "Network", ipa: "/ˈnɛtwɜːrk/", meaning: "Jaringan" },
  { word: "Community", ipa: "/kəˈmjuːnɪti/", meaning: "Komunitas" },
];

const LIFESTYLE_ACTIVITY_VOCAB = [
  { word: "Journey", ipa: "/ˈdʒɜːrni/", meaning: "Perjalanan" },
  { word: "Destination", ipa: "/ˌdɛstɪˈneɪʃən/", meaning: "Tujuan" },
  { word: "Adventure", ipa: "/ədˈvɛntʃər/", meaning: "Petualangan" },
  { word: "Culture", ipa: "/ˈkʌltʃər/", meaning: "Budaya" },
  { word: "Bargain", ipa: "/ˈbɑːrɡɪn/", meaning: "Menawar / Murah" },
  { word: "Purchase", ipa: "/ˈpɜːrtʃəs/", meaning: "Pembelian / Membeli" },
  { word: "Entertainment", ipa: "/ˌɛntərˈteɪnmənt/", meaning: "Hiburan" },
  { word: "Fitness", ipa: "/ˈfɪtnəs/", meaning: "Kebugaran" },
  { word: "Routine", ipa: "/ruːˈtiːn/", meaning: "Rutinitas" },
  { word: "Balance", ipa: "/ˈbæləns/", meaning: "Keseimbangan" },
];

const PEOPLE_FEELINGS_VOCAB = [
  { word: "Character", ipa: "/ˈkærəktər/", meaning: "Karakter / Sifat" },
  { word: "Mood", ipa: "/muːd/", meaning: "Suasana hati" },
  { word: "Relationship", ipa: "/rɪˈleɪʃənʃɪp/", meaning: "Hubungan" },
  { word: "Memory", ipa: "/ˈmɛməri/", meaning: "Kenangan / Ingatan" },
  { word: "Childhood", ipa: "/ˈtʃaɪldhʊd/", meaning: "Masa kecil" },
  { word: "Fear", ipa: "/fɪər/", meaning: "Ketakutan" },
  { word: "Joy", ipa: "/dʒɔɪ/", meaning: "Kegembiraan" },
  { word: "Opinion", ipa: "/əˈpɪnjən/", meaning: "Pendapat" },
  { word: "Advice", ipa: "/ədˈvaɪs/", meaning: "Nasihat" },
  { word: "Behavior", ipa: "/bɪˈheɪvjər/", meaning: "Perilaku" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "A person who buys things from a shop is a ___.",
    options: ['Manager', 'Customer', 'Network'],
    answer: 'Customer',
    explanation: "Customer (pelanggan) adalah seseorang yang membeli barang atau jasa."
  },
  {
    id: 2,
    question: "The feeling of great happiness is ___.",
    options: ['Fear', 'Joy', 'Mood'],
    answer: 'Joy',
    explanation: "Joy (kegembiraan) adalah perasaan bahagia yang luar biasa."
  },
  {
    id: 3,
    question: "Traveling from one place to another is a ___.",
    options: ['Balance', 'Routine', 'Journey'],
    answer: 'Journey',
    explanation: "Journey (perjalanan) adalah tindakan bepergian dari satu tempat ke tempat lain."
  },
  {
    id: 4,
    question: "Money you receive for doing your job is your ___.",
    options: ['Salary', 'Skill', 'Success'], // Note: Salary wasn't in list but is review
    answer: 'Salary',
    explanation: "Meskipun tidak ada dalam daftar spesifik ini, 'Salary' (Gaji) adalah istilah kerja utama yang dipelajari sebelumnya."
  },
  {
    id: 5,
    question: "If you want to suggest something good to do, you give ___.",
    options: ['Advice', 'Memory', 'Opinion'],
    answer: 'Advice',
    explanation: "Advice (nasihat) adalah bimbingan atau rekomendasi."
  },
  {
    id: 6,
    question: "A person who buys things from a shop is a ___.",
    options: ["Manager","Customer","Network"],
    answer: "Customer",
    explanation: "Customer (pelanggan) adalah seseorang yang membeli barang atau jasa."
  },
  {
    id: 7,
    question: "The feeling of great pleasure is ___.",
    options: ["Fear", "Joy", "Mood"],
    answer: "Joy",
    explanation: "Joy (kegembiraan) adalah perasaan bahagia yang luar biasa."
  },
  {
    id: 8,
    question: "Traveling from one place to another is a ___.",
    options: ["Balance", "Routine", "Journey"],
    answer: "Journey",
    explanation: "Journey (perjalanan) adalah tindakan bepergian dari satu tempat ke tempat lain."
  },
  {
    id: 9,
    question: "Money you receive for doing your job is your ___.",
    options: ["Salary", "Skill", "Success"],
    answer: "Salary",
    explanation: "Meskipun tidak ada dalam daftar spesifik ini, 'Salary' (Gaji) adalah istilah kerja utama yang dipelajari sebelumnya."
  },
  {
    id: 10,
    question: "If you want to suggest something good to do, you give ___.",
    options: ["Advice", "Memory", "Opinion"],
    answer: "Advice",
    explanation: "Advice (nasihat) adalah bimbingan atau rekomendasi."
  },
  {
    id: 11,
    question: "A person who purchases things from a store is a ___.",
    options: ["Network", "Customer", "Manager"],
    answer: "Customer",
    explanation: "Customer (pelanggan) adalah seseorang yang membeli barang atau jasa."
  },
  {
    id: 12,
    question: "The feeling of great joy is ___.",
    options: ["Mood", "Joy", "Fear"],
    answer: "Joy",
    explanation: "Joy (kegembiraan) adalah perasaan bahagia yang luar biasa."
  },
  {
    id: 13,
    question: "Traveling from one place to another is a ___.",
    options: ["Balance", "Routine", "Journey"],
    answer: "Journey",
    explanation: "Journey (perjalanan) adalah tindakan bepergian dari satu tempat ke tempat lain."
  },
  {
    id: 14,
    question: "Money you receive for doing your job is your ___.",
    options: ["Salary", "Skill", "Success"],
    answer: "Salary",
    explanation: "Meskipun tidak ada dalam daftar spesifik ini, 'Salary' (Gaji) adalah istilah kerja utama yang dipelajari sebelumnya."
  },
  {
    id: 15,
    question: "If you want to suggest something good to do, you give ___.",
    options: ["Advice", "Memory", "Opinion"],
    answer: "Advice",
    explanation: "Advice (nasihat) adalah bimbingan atau rekomendasi."
  },
  {
    id: 16,
    question: "A person who purchases things from a market is a ___.",
    options: ["Network", "Manager", "Customer"],
    answer: "Customer",
    explanation: "Customer (pelanggan) adalah seseorang yang membeli barang atau jasa."
  },
  {
    id: 17,
    question: "The feeling of great joy is ___.",
    options: ["Mood", "Joy", "Fear"],
    answer: "Joy",
    explanation: "Joy (kegembiraan) adalah perasaan bahagia yang luar biasa."
  },
  {
    id: 18,
    question: "Traveling from one place to another is a ___.",
    options: ["Balance", "Routine", "Journey"],
    answer: "Journey",
    explanation: "Journey (perjalanan) adalah tindakan bepergian dari satu tempat ke tempat lain."
  },
  {
    id: 19,
    question: "Money you receive for doing your job is your ___.",
    options: ["Salary", "Skill", "Success"],
    answer: "Salary",
    explanation: "Meskipun tidak ada dalam daftar spesifik ini, 'Salary' (Gaji) adalah istilah kerja utama yang dipelajari sebelumnya."
  },
  {
    id: 20,
    question: "If you want to suggest something good to do, you give ___.",
    options: ["Advice", "Memory", "Opinion"],
    answer: "Advice",
    explanation: "Advice (nasihat) adalah bimbingan atau rekomendasi."
  }
];

const Lesson15: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_vocabulary', 15);
  const nextLessonPath = undefined;
  const [vocabSection, setVocabSection] = useState<'society' | 'lifestyle' | 'people'>('society');

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

  const renderVocabList = (list: typeof SOCIETY_WORK_VOCAB, colorClass: string, icon: any) => (
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
      lessonLabel={"Elementary Vocabulary Lesson 15"}
      accentColor={"#16A085"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Ulasan & Latihan"
            subtitle="Vocabulary • Pelajaran 15"
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
                  onClick={() => setVocabSection('society')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'society' ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Masyarakat & Kerja
                </button>
                <button
                  onClick={() => setVocabSection('lifestyle')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'lifestyle' ? 'bg-teal-100 text-[var(--color-primary)] ring-2 ring-teal-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Gaya Hidup
                </button>
                <button
                  onClick={() => setVocabSection('people')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'people' ? 'bg-rose-100 text-rose-700 ring-2 ring-rose-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Orang
                </button>
              </div>

              {vocabSection === 'society' && (
                <>
                  <div className="bg-indigo-50 p-4 rounded-2xl mb-4 border border-indigo-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-indigo-500 shadow-[var(--shadow-card)]"><ClipboardList className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-indigo-900 text-sm">Masyarakat & Kerja</h3>
                      <p className="text-xs text-indigo-700">Ulasan: Karir, Teknologi, dan Komunitas</p>
                    </div>
                  </div>
                  {renderVocabList(SOCIETY_WORK_VOCAB, 'indigo', ClipboardList)}
                </>
              )}

              {vocabSection === 'lifestyle' && (
                <>
                  <div className="bg-gray-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-[var(--color-primary)] shadow-[var(--shadow-card)]"><TrendingUp className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-teal-900 text-sm">Gaya Hidup & Aktivitas</h3>
                      <p className="text-xs text-[var(--color-primary)]">Ulasan: Perjalanan, Hobi, dan Rutinitas</p>
                    </div>
                  </div>
                  {renderVocabList(LIFESTYLE_ACTIVITY_VOCAB, 'teal', TrendingUp)}
                </>
              )}

              {vocabSection === 'people' && (
                <>
                  <div className="bg-rose-50 p-4 rounded-2xl mb-4 border border-rose-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-rose-500 shadow-[var(--shadow-card)]"><Smile className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-rose-900 text-sm">Orang & Perasaan</h3>
                      <p className="text-xs text-rose-700">Ulasan: Karakter, Suasana Hati, dan Interaksi</p>
                    </div>
                  </div>
                  {renderVocabList(PEOPLE_FEELINGS_VOCAB, 'rose', Smile)}
                </>
              )}

<div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb size={20} />
                  <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Keluarga Kata (Akhiran)</h2>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Dalam bahasa Inggris, kamu bisa mengubah arti kata dengan mengubah akhirannya (suffix).
                </p>

                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <h3 className="font-bold text-indigo-800 mb-2">Kata Kerja ke Kata Benda (Orang)</h3>
                    <p className="text-xs text-indigo-700 mb-2">Tambahkan <b>-er</b>, <b>-or</b>, atau <b>-ist</b></p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-1">
                      <li>Teach &rarr; <b>Teacher</b> (Guru)</li>
                      <li>Act &rarr; <b>Actor</b> (Aktor)</li>
                      <li>Tour &rarr; <b>Tourist</b> (Turis)</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-teal-800 mb-2">Kata Sifat ke Kata Benda (Konsep)</h3>
                    <p className="text-xs text-[var(--color-primary)] mb-2">Tambahkan <b>-ness</b> atau <b>-ity</b></p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-1">
                      <li>Happy &rarr; <b>Happiness</b> (Kebahagiaan)</li>
                      <li>Sad &rarr; <b>Sadness</b> (Kesedihan)</li>
                      <li>Active &rarr; <b>Activity</b> (Aktivitas)</li>
                    </ul>
                  </div>

                  <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
                    <h3 className="font-bold text-rose-800 mb-2">Kata Benda ke Kata Sifat</h3>
                    <p className="text-xs text-rose-700 mb-2">Tambahkan <b>-ful</b> atau <b>-y</b></p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-1">
                      <li>Success &rarr; <b>Successful</b> (Sukses)</li>
                      <li>Sun &rarr; <b>Sunny</b> (Cerah)</li>
                      <li>Health &rarr; <b>Healthy</b> (Sehat)</li>
                    </ul>
                  </div>
                </div>
              </div>
        </div>
      ) : (
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
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
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

export default Lesson15;
