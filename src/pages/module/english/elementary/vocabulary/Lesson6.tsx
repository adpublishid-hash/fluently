import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, TrendingUp, Star, Sparkles } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

// 30 Words divided into 3 categories
const SHOPPING_MONEY_VOCAB = [
  { word: "Money", ipa: "/ˈmʌni/", meaning: "Uang" },
  { word: "Cash", ipa: "/kæʃ/", meaning: "Uang tunai" },
  { word: "Coin", ipa: "/kɔɪn/", meaning: "Uang koin/receh" },
  { word: "Note / Bill", ipa: "/noʊt/ /bɪl/", meaning: "Uang kertas" },
  { word: "Credit card", ipa: "/ˈkrɛdɪt kɑːrd/", meaning: "Kartu kredit" },
  { word: "Price", ipa: "/praɪs/", meaning: "Harga" },
  { word: "Cost", ipa: "/kɒst/", meaning: "Biaya / Harganya" },
  { word: "Cheap", ipa: "/tʃiːp/", meaning: "Murah" },
  { word: "Expensive", ipa: "/ɪkˈspɛnsɪv/", meaning: "Mahal" },
  { word: "Wallet", ipa: "/ˈwɒlɪt/", meaning: "Dompet (pria)" },
];

const IN_THE_STORE_VOCAB = [
  { word: "Shop / Store", ipa: "/ʃɒp/ /stɔːr/", meaning: "Toko" },
  { word: "Supermarket", ipa: "/ˈsuːpərˌmɑːrkɪt/", meaning: "Supermarket" },
  { word: "Market", ipa: "/ˈmɑːrkɪt/", meaning: "Pasar" },
  { word: "Customer", ipa: "/ˈkʌstəmər/", meaning: "Pelanggan / Pembeli" },
  { word: "Shop assistant", ipa: "/ʃɒp əˈsɪstənt/", meaning: "Pelayan toko" },
  { word: "Cashier", ipa: "/kæˈʃɪər/", meaning: "Kasir" },
  { word: "Trolley / Cart", ipa: "/ˈtrɒli/ /kɑːrt/", meaning: "Kereta belanja" },
  { word: "Basket", ipa: "/ˈbæskɪt/", meaning: "Keranjang" },
  { word: "Shelf", ipa: "/ʃɛlf/", meaning: "Rak" },
  { word: "Aisle", ipa: "/aɪl/", meaning: "Lorong (di toko)" },
];

const ACTIONS_TRANSACTIONS_VOCAB = [
  { word: "Buy", ipa: "/baɪ/", meaning: "Membeli" },
  { word: "Sell", ipa: "/sɛl/", meaning: "Menjual" },
  { word: "Pay", ipa: "/peɪ/", meaning: "Membayar" },
  { word: "Spend", ipa: "/spɛnd/", meaning: "Menghabiskan (uang)" },
  { word: "Save", ipa: "/seɪv/", meaning: "Menabung / Menghemat" },
  { word: "Receipt", ipa: "/rɪˈsiːt/", meaning: "Struk / Bukti pembayaran" },
  { word: "Discount", ipa: "/ˈdɪskaʊnt/", meaning: "Diskon / Potongan harga" },
  { word: "Sale", ipa: "/seɪl/", meaning: "Obral / Penjualan" },
  { word: "Change", ipa: "/tʃeɪndʒ/", meaning: "Uang kembalian" },
  { word: "Refund", ipa: "/ˈriːfʌnd/", meaning: "Pengembalian uang" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "The paper you get after paying is a ___.",
    options: ['Receipt', 'Recipe', 'Receive'],
    answer: 'Receipt',
    explanation: "'Receipt' (/rɪˈsiːt/) adalah bukti pembelian. 'Recipe' adalah resep masakan."
  },
  {
    id: 2,
    question: "This shirt costs $1000! It is very ___.",
    options: ['expensive', 'free', 'cheap'],
    answer: 'expensive',
    explanation: "Expensive (Mahal) berarti harganya tinggi."
  },
  {
    id: 3,
    question: "Where do you pay for your items?",
    options: ['At the cashier', 'At the shelf', 'At the entrance'],
    answer: 'At the cashier',
    explanation: "Cashier (Kasir) adalah orang atau tempat kamu membayar."
  },
  {
    id: 4,
    question: "You put your items in a ___ while shopping.",
    options: ['wallet', 'receipt', 'trolley'],
    answer: 'trolley',
    explanation: "Trolley (Kereta belanja) digunakan untuk membawa barang di toko."
  },
  {
    id: 5,
    question: "If the clothes don't fit, you can ask for a ___.",
    options: ['salary', 'refund', 'cost'],
    answer: 'refund',
    explanation: "Refund (Pengembalian uang) berarti mendapatkan uangmu kembali."
  },
  {
    id: 6,
    question: "The paper you get after paying is a ___.",
    options: ["Receipt", "Recipe", "Receive"],
    answer: "Receipt",
    explanation: "'Receipt' (/rɪˈsiːt/) adalah bukti pembelian. 'Recipe' adalah resep masakan."
  },
  {
    id: 7,
    question: "This shirt costs $1000! It is very ___.",
    options: ["expensive", "free", "cheap"],
    answer: "expensive",
    explanation: "Expensive (Mahal) berarti harganya tinggi."
  },
  {
    id: 8,
    question: "Where do you pay for your items?",
    options: ["At the cashier", "At the shelf", "At the entrance"],
    answer: "At the cashier",
    explanation: "Cashier (Kasir) adalah orang atau tempat kamu membayar."
  },
  {
    id: 9,
    question: "You put your items in a ___ while shopping.",
    options: ["wallet", "receipt", "trolley"],
    answer: "trolley",
    explanation: "Trolley (Kereta belanja) digunakan untuk membawa barang di toko."
  },
  {
    id: 10,
    question: "If the clothes don't fit, you can ask for a ___.",
    options: ["salary", "refund", "cost"],
    answer: "refund",
    explanation: "Refund (Pengembalian uang) berarti mendapatkan uangmu kembali."
  },
  {
    id: 11,
    question: "The paper you get after paying is a ___.",
    options: ["Receipt", "Recipe", "Receive"],
    answer: "Receipt",
    explanation: "'Receipt' (/rɪˈsiːt/) adalah bukti pembelian. 'Recipe' adalah resep masakan."
  },
  {
    id: 12,
    question: "This shirt costs $1000! It is very ___.",
    options: ["expensive", "free", "cheap"],
    answer: "expensive",
    explanation: "Expensive (Mahal) berarti harganya tinggi."
  },
  {
    id: 13,
    question: "Where do you pay for your items?",
    options: ["At the cashier", "At the shelf", "At the entrance"],
    answer: "At the cashier",
    explanation: "Cashier (Kasir) adalah orang atau tempat kamu membayar."
  },
  {
    id: 14,
    question: "You put your items in a ___ while shopping.",
    options: ["wallet", "receipt", "trolley"],
    answer: "trolley",
    explanation: "Trolley (Kereta belanja) digunakan untuk membawa barang di toko."
  },
  {
    id: 15,
    question: "If the clothes don't fit, you can ask for a ___.",
    options: ["salary", "refund", "cost"],
    answer: "refund",
    explanation: "Refund (Pengembalian uang) berarti mendapatkan uangmu kembali."
  },
  {
    id: 16,
    question: "The paper you get after paying is a ___.",
    options: ["Receipt", "Recipe", "Receive"],
    answer: "Receipt",
    explanation: "'Receipt' (/rɪˈsiːt/) adalah bukti pembelian. 'Recipe' adalah resep masakan."
  },
  {
    id: 17,
    question: "This shirt costs $1000! It is very ___.",
    options: ["expensive", "free", "cheap"],
    answer: "expensive",
    explanation: "Expensive (Mahal) berarti harganya tinggi."
  },
  {
    id: 18,
    question: "Where do you pay for your items?",
    options: ["At the cashier", "At the shelf", "At the entrance"],
    answer: "At the cashier",
    explanation: "Cashier (Kasir) adalah orang atau tempat kamu membayar."
  },
  {
    id: 19,
    question: "You put your items in a ___ while shopping.",
    options: ["wallet", "receipt", "trolley"],
    answer: "trolley",
    explanation: "Trolley (Kereta belanja) digunakan untuk membawa barang di toko."
  },
  {
    id: 20,
    question: "If the clothes don't fit, you can ask for a ___.",
    options: ["salary", "refund", "cost"],
    answer: "refund",
    explanation: "Refund (Pengembalian uang) berarti mendapatkan uangmu kembali."
  }
];

const Lesson6: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_vocabulary', 6);
  const nextLessonPath = '/modul/english/elementary/vocabulary/lesson-7';
  const [vocabSection, setVocabSection] = useState<'money' | 'store' | 'actions'>('money');

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

  const renderVocabList = (list: typeof SHOPPING_MONEY_VOCAB, colorClass: string, icon: any) => (
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
      lessonLabel={"Elementary Vocabulary Lesson 6"}
      accentColor={"#16A085"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Belanja & Uang"
            subtitle="Vocabulary • Pelajaran 6"
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
                  onClick={() => setVocabSection('money')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'money' ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Dasar Uang
                </button>
                <button
                  onClick={() => setVocabSection('store')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'store' ? 'bg-teal-100 text-[var(--color-primary)] ring-2 ring-teal-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Di Toko
                </button>
                <button
                  onClick={() => setVocabSection('actions')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'actions' ? 'bg-rose-100 text-rose-700 ring-2 ring-rose-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Transaksi
                </button>
              </div>

              {vocabSection === 'money' && (
                <>
                  <div className="bg-indigo-50 p-4 rounded-2xl mb-4 border border-indigo-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-indigo-500 shadow-[var(--shadow-card)]"><Sparkles size={20} /></div>
                    <div>
                      <h3 className="font-bold text-indigo-900 text-sm">Uang & Pembayaran</h3>
                      <p className="text-xs text-indigo-700">Kata-kata tentang mata uang dan biaya.</p>
                    </div>
                  </div>
                  {renderVocabList(SHOPPING_MONEY_VOCAB, 'indigo', Sparkles)}
                </>
              )}

              {vocabSection === 'store' && (
                <>
                  <div className="bg-gray-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-[var(--color-primary)] shadow-[var(--shadow-card)]"><BookOpen size={20} /></div>
                    <div>
                      <h3 className="font-bold text-teal-900 text-sm">Di Toko</h3>
                      <p className="text-xs text-[var(--color-primary)]">Orang dan benda di dalam toko.</p>
                    </div>
                  </div>
                  {renderVocabList(IN_THE_STORE_VOCAB, 'teal', BookOpen)}
                </>
              )}

              {vocabSection === 'actions' && (
                <>
                  <div className="bg-rose-50 p-4 rounded-2xl mb-4 border border-rose-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-rose-500 shadow-[var(--shadow-card)]"><TrendingUp className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-rose-900 text-sm">Aksi Belanja</h3>
                      <p className="text-xs text-rose-700">Kata kerja yang digunakan saat membeli sesuatu.</p>
                    </div>
                  </div>
                  {renderVocabList(ACTIONS_TRANSACTIONS_VOCAB, 'rose', TrendingUp)}
                </>
              )}

<div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb size={20} />
                  <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Frasa Belanja</h2>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Berikut adalah pertanyaan dan kalimat berguna saat kamu berbelanja.
                </p>

                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <h3 className="font-bold text-indigo-800 mb-2">Menanyakan Harga</h3>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-2">
                      <li>"How much is this?" (Tunggal)</li>
                      <li>"How much are these?" (Jamak)</li>
                      <li>"What is the price of...?"</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-teal-800 mb-2">Membayar</h3>
                    <ul className="space-y-2 text-sm text-[var(--color-text-primary)]">
                      <li>"Can I pay by card?"</li>
                      <li>"Do you take cash?"</li>
                      <li>"Here is your change."</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
                <h3 className="font-bold text-rose-800 mb-2 text-sm uppercase tracking-wide">Tips: Mencoba Barang</h3>
                <div className="bg-white p-3 rounded-lg border border-rose-100/50">
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Untuk meminta mencoba pakaian sebelum membeli:</p>
                  <p className="text-sm font-bold text-[var(--color-text-primary)]">"Can I try this on?"</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-2">Tempat untuk melakukannya adalah <b>Fitting Room</b> (Kamar Pas).</p>
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

export default Lesson6;
