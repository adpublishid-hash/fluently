import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, User, TrendingUp, Star, Sparkles } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

// 30 Words divided into 3 categories
const HARDWARE_VOCAB = [
  { word: "Computer", ipa: "/kəmˈpjuːtər/", meaning: "Komputer" },
  { word: "Laptop", ipa: "/ˈlæptɒp/", meaning: "Laptop" },
  { word: "Smartphone", ipa: "/ˈsmɑːrtfoʊn/", meaning: "Ponsel pintar" },
  { word: "Tablet", ipa: "/ˈtæblɪt/", meaning: "Tablet" },
  { word: "Screen", ipa: "/skriːn/", meaning: "Layar" },
  { word: "Keyboard", ipa: "/ˈkiːbɔːrd/", meaning: "Papan ketik" },
  { word: "Mouse", ipa: "/maʊs/", meaning: "Mouse (tetikus)" },
  { word: "Battery", ipa: "/ˈbætəri/", meaning: "Baterai" },
  { word: "Charger", ipa: "/ˈtʃɑːrdʒər/", meaning: "Pengisi daya" },
  { word: "Camera", ipa: "/ˈkæmərə/", meaning: "Kamera" },
];

const SOFTWARE_VOCAB = [
  { word: "Internet", ipa: "/ˈɪntərnɛt/", meaning: "Internet" },
  { word: "Website", ipa: "/ˈwɛbsaɪt/", meaning: "Situs web" },
  { word: "App", ipa: "/æp/", meaning: "Aplikasi" },
  { word: "Password", ipa: "/ˈpæswɜːrd/", meaning: "Kata sandi" },
  { word: "Username", ipa: "/ˈjuːzərneɪm/", meaning: "Nama pengguna" },
  { word: "Email", ipa: "/ˈiːmeɪl/", meaning: "Surel / Email" },
  { word: "File", ipa: "/faɪl/", meaning: "Berkas" },
  { word: "Folder", ipa: "/ˈfoʊldər/", meaning: "Folder" },
  { word: "Link", ipa: "/lɪŋk/", meaning: "Tautan" },
  { word: "Wi-Fi", ipa: "/ˈwaɪfaɪ/", meaning: "Wi-Fi / Nirkabel" },
];

const TECH_ACTIONS_VOCAB = [
  { word: "Click", ipa: "/klɪk/", meaning: "Klik" },
  { word: "Type", ipa: "/taɪp/", meaning: "Mengetik" },
  { word: "Send", ipa: "/sɛnd/", meaning: "Mengirim" },
  { word: "Save", ipa: "/seɪv/", meaning: "Menyimpan" },
  { word: "Delete", ipa: "/dɪˈliːt/", meaning: "Menghapus" },
  { word: "Download", ipa: "/ˈdaʊnloʊd/", meaning: "Mengunduh" },
  { word: "Upload", ipa: "/ˈʌploʊd/", meaning: "Mengunggah" },
  { word: "Search", ipa: "/sɜːrtʃ/", meaning: "Mencari" },
  { word: "Call", ipa: "/kɔːl/", meaning: "Menelepon" },
  { word: "Message", ipa: "/ˈmɛsɪdʒ/", meaning: "Mengirim pesan" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "You need to ___ your username and password to access your email.",
    options: ['click', 'type', 'draw'],
    answer: 'type',
    explanation: "Kamu type (mengetik) informasi menggunakan keyboard."
  },
  {
    id: 2,
    question: "This device is portable and smaller than a laptop.",
    options: ['Tablet', 'Computer', 'Screen'],
    answer: 'Tablet',
    explanation: "Tablet adalah komputer portabel dengan layar sentuh."
  },
  {
    id: 3,
    question: "To keep a file, you must ___ it.",
    options: ['delete', 'save', 'search'],
    answer: 'save',
    explanation: "Saving (menyimpan) mengamankan file agar tidak hilang."
  },
  {
    id: 4,
    question: "If you don't want a photo anymore, you ___ it.",
    options: ['upload', 'delete', 'download'],
    answer: 'delete',
    explanation: "Deleting (menghapus) menghilangkan data dari perangkatmu."
  },
  {
    id: 5,
    question: "You need a ___ to connect to the internet wirelessly.",
    options: ['Mouse', 'Wi-Fi', 'Battery'],
    answer: 'Wi-Fi',
    explanation: "Wi-Fi memungkinkan koneksi internet nirkabel."
  },
  {
    id: 6,
    question: "You need to ___ your username and password to access your email.",
    options: ["click","type","draw"],
    answer: "type",
    explanation: "Kamu type (mengetik) informasi menggunakan keyboard."
  },
  {
    id: 7,
    question: "This device is portable and smaller than a laptop.",
    options: ["Tablet","Computer","Screen"],
    answer: "Tablet",
    explanation: "Tablet adalah komputer portabel dengan layar sentuh."
  },
  {
    id: 8,
    question: "To keep a file, you must ___ it.",
    options: ["delete","save","search"],
    answer: "save",
    explanation: "Saving (menyimpan) mengamankan file agar tidak hilang."
  },
  {
    id: 9,
    question: "If you don't want a photo anymore, you ___ it.",
    options: ["upload","delete","download"],
    answer: "delete",
    explanation: "Deleting (menghapus) menghilangkan data dari perangkatmu."
  },
  {
    id: 10,
    question: "You need a ___ to connect to the internet wirelessly.",
    options: ["Mouse","Wi-Fi","Battery"],
    answer: "Wi-Fi",
    explanation: "Wi-Fi memungkinkan koneksi internet nirkabel."
  },
  {
    id: 11,
    question: "You need to ___ your username and password to access your email.",
    options: ["click","type","draw"],
    answer: "type",
    explanation: "Kamu type (mengetik) informasi menggunakan keyboard."
  },
  {
    id: 12,
    question: "This device is portable and smaller than a laptop.",
    options: ["Tablet","Computer","Screen"],
    answer: "Tablet",
    explanation: "Tablet adalah komputer portabel dengan layar sentuh."
  },
  {
    id: 13,
    question: "To keep a file, you must ___ it.",
    options: ["delete","save","search"],
    answer: "save",
    explanation: "Saving (menyimpan) mengamankan file agar tidak hilang."
  },
  {
    id: 14,
    question: "If you don't want a photo anymore, you ___ it.",
    options: ["upload","delete","download"],
    answer: "delete",
    explanation: "Deleting (menghapus) menghilangkan data dari perangkatmu."
  },
  {
    id: 15,
    question: "You need a ___ to connect to the internet wirelessly.",
    options: ["Mouse","Wi-Fi","Battery"],
    answer: "Wi-Fi",
    explanation: "Wi-Fi memungkinkan koneksi internet nirkabel."
  },
  {
    id: 16,
    question: "You need to ___ your username and password to access your email.",
    options: ["click","type","draw"],
    answer: "type",
    explanation: "Kamu type (mengetik) informasi menggunakan keyboard."
  },
  {
    id: 17,
    question: "This device is portable and smaller than a laptop.",
    options: ["Tablet","Computer","Screen"],
    answer: "Tablet",
    explanation: "Tablet adalah komputer portabel dengan layar sentuh."
  },
  {
    id: 18,
    question: "To keep a file, you must ___ it.",
    options: ["delete","save","search"],
    answer: "save",
    explanation: "Saving (menyimpan) mengamankan file agar tidak hilang."
  },
  {
    id: 19,
    question: "If you don't want a photo anymore, you ___ it.",
    options: ["upload","delete","download"],
    answer: "delete",
    explanation: "Deleting (menghapus) menghilangkan data dari perangkatmu."
  },
  {
    id: 20,
    question: "You need a ___ to connect to the internet wirelessly.",
    options: ["Mouse","Wi-Fi","Battery"],
    answer: "Wi-Fi",
    explanation: "Wi-Fi memungkinkan koneksi internet nirkabel."
  }
];

const Lesson10: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_vocabulary', 10);
  const nextLessonPath = '/modul/english/elementary/vocabulary/lesson-11';
  const [vocabSection, setVocabSection] = useState<'hardware' | 'software' | 'actions'>('hardware');

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

  const renderVocabList = (list: typeof HARDWARE_VOCAB, colorClass: string, icon: any) => (
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
      lessonLabel={"Elementary Vocabulary Lesson 10"}
      accentColor={"#16A085"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Teknologi"
            subtitle="Vocabulary • Pelajaran 10"
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
                  onClick={() => setVocabSection('hardware')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'hardware' ? 'bg-violet-100 text-violet-700 ring-2 ring-violet-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Perangkat Keras
                </button>
                <button
                  onClick={() => setVocabSection('software')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'software' ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Perangkat Lunak
                </button>
                <button
                  onClick={() => setVocabSection('actions')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'actions' ? 'bg-fuchsia-100 text-fuchsia-700 ring-2 ring-fuchsia-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Aksi
                </button>
              </div>

              {vocabSection === 'hardware' && (
                <>
                  <div className="bg-violet-50 p-4 rounded-2xl mb-4 border border-violet-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-violet-500 shadow-[var(--shadow-card)]"><User className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-violet-900 text-sm">Perangkat & Perangkat Keras</h3>
                      <p className="text-xs text-violet-700">Bagian fisik dari teknologi.</p>
                    </div>
                  </div>
                  {renderVocabList(HARDWARE_VOCAB, 'violet', User)}
                </>
              )}

              {vocabSection === 'software' && (
                <>
                  <div className="bg-blue-50 p-4 rounded-2xl mb-4 border border-blue-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-blue-500 shadow-[var(--shadow-card)]"><Sparkles size={20} /></div>
                    <div>
                      <h3 className="font-bold text-blue-900 text-sm">Internet & Perangkat Lunak</h3>
                      <p className="text-xs text-blue-700">Alat digital dan istilah online.</p>
                    </div>
                  </div>
                  {renderVocabList(SOFTWARE_VOCAB, 'blue', Sparkles)}
                </>
              )}

              {vocabSection === 'actions' && (
                <>
                  <div className="bg-fuchsia-50 p-4 rounded-2xl mb-4 border border-fuchsia-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-fuchsia-500 shadow-[var(--shadow-card)]"><TrendingUp className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-fuchsia-900 text-sm">Aksi Teknologi</h3>
                      <p className="text-xs text-fuchsia-700">Kata kerja untuk menggunakan teknologi.</p>
                    </div>
                  </div>
                  {renderVocabList(TECH_ACTIONS_VOCAB, 'fuchsia', TrendingUp)}
                </>
              )}

<div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb size={20} />
                  <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Phrasal Verbs Teknologi</h2>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Dalam teknologi, kami menggunakan pasangan kata kerja khusus yang disebut <b>Phrasal Verbs</b>.
                </p>

                <div className="space-y-4">
                  <div className="bg-violet-50 p-4 rounded-xl border border-violet-100">
                    <h3 className="font-bold text-violet-800 mb-2">Daya</h3>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-2">
                      <li><b>Turn on</b> / Switch on (Menyalakan)</li>
                      <li><b>Turn off</b> / Switch off (Mematikan)</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-2">Akses</h3>
                    <ul className="space-y-2 text-sm text-[var(--color-text-primary)]">
                      <li><b>Log in</b> / Sign in (Masuk akun)</li>
                      <li><b>Log out</b> / Sign out (Keluar akun)</li>
                      <li><b>Sign up</b> (Mendaftar akun baru)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-fuchsia-50 rounded-2xl p-5 border border-fuchsia-100">
                <h3 className="font-bold text-fuchsia-800 mb-2 text-sm uppercase tracking-wide">Instruksi Teknologi</h3>
                <div className="bg-white p-3 rounded-lg border border-fuchsia-100/50">
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Kita menggunakan Imperatif (Perintah):</p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">Click the button.</p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)] mt-1">Don't share your password.</p>
                </div>
              </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-violet-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-violet-50 text-violet-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-violet-300 hover:bg-[var(--color-background)]";
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
                    className="px-8 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-200"
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

export default Lesson10;
