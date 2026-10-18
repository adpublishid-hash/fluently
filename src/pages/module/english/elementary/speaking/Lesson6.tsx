import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, ClipboardList, TrendingUp } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';



type DialogueLine = {
  speaker: 'A' | 'B';
  name: string;
  text: string;
  translation: string;
};

type Scenario = {
  id: string;
  title: string;
  context: string;
  level: 'Formal' | 'Casual';
  dialogue: DialogueLine[];
};

const CONVERSATION_SCENARIOS: Scenario[] = [
  {
    id: 'c1',
    title: "Asking the Price",
    context: "Melihat-lihat pakaian.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Shopper', text: "Excuse me, how much is this shirt?", translation: "Permisi, berapa harga kemeja ini?" },
      { speaker: 'B', name: 'Clerk', text: "It is $25.", translation: "Harganya 25 dolar." },
      { speaker: 'A', name: 'Shopper', text: "That is a bit expensive.", translation: "Itu agak mahal." },
      { speaker: 'B', name: 'Clerk', text: "We have cheaper ones over there.", translation: "Kami punya yang lebih murah di sebelah sana." }
    ]
  },
  {
    id: 'c2',
    title: "Checking the Size",
    context: "Mencoba pakaian.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Customer', text: "Do you have this in Medium?", translation: "Apa ada ukuran Medium untuk ini?" },
      { speaker: 'B', name: 'Assistant', text: "Let me check the stock.", translation: "Biar saya cek stoknya." },
      { speaker: 'A', name: 'Customer', text: "Can I try it on?", translation: "Boleh saya mencobanya?" },
      { speaker: 'B', name: 'Assistant', text: "Yes, the fitting room is right there.", translation: "Ya, kamar pas ada di sebelah sana." }
    ]
  },
  {
    id: 'c3',
    title: "Payment Method",
    context: "Di kasir.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Cashier', text: "That will be $50, please.", translation: "Totalnya 50 dolar." },
      { speaker: 'B', name: 'Customer', text: "Can I pay by credit card?", translation: "Bisa bayar pakai kartu kredit?" },
      { speaker: 'A', name: 'Cashier', text: "Yes, please insert your card here.", translation: "Ya, silakan masukkan kartu Anda di sini." },
      { speaker: 'B', name: 'Customer', text: "Here you go.", translation: "Ini dia." }
    ]
  },
  {
    id: 'c4',
    title: "Bargaining",
    context: "Di pasar jalanan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tourist', text: "How much for this souvenir?", translation: "Berapa harga suvenir ini?" },
      { speaker: 'B', name: 'Seller', text: "It is 100 baht.", translation: "Harganya 100 baht." },
      { speaker: 'A', name: 'Tourist', text: "Can you give me a discount?", translation: "Bisa kasih diskon?" },
      { speaker: 'B', name: 'Seller', text: "Okay, 80 baht for you.", translation: "Oke, 80 baht buat Anda." }
    ]
  },
  {
    id: 'c5',
    title: "Grocery Store",
    context: "Membeli buah.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Shopper', text: "Are these apples fresh?", translation: "Apakah apel-apel ini segar?" },
      { speaker: 'B', name: 'Grocer', text: "Yes, they arrived this morning.", translation: "Ya, baru datang pagi ini." },
      { speaker: 'A', name: 'Shopper', text: "I will take five of them.", translation: "Saya ambil lima buah." },
      { speaker: 'B', name: 'Grocer', text: "I will weigh them for you.", translation: "Saya timbangkan buat Anda." }
    ]
  },
  {
    id: 'c6',
    title: "Returning an Item",
    context: "Di layanan pelanggan.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Customer', text: "I would like to return this dress.", translation: "Saya ingin mengembalikan gaun ini." },
      { speaker: 'B', name: 'Staff', text: "Is there anything wrong with it?", translation: "Apakah ada yang salah dengan barangnya?" },
      { speaker: 'A', name: 'Customer', text: "It is too small for me.", translation: "Ini kekecilan buat saya." },
      { speaker: 'B', name: 'Staff', text: "Do you have the receipt?", translation: "Apakah Anda bawa struknya?" }
    ]
  },
  {
    id: 'c7',
    title: "Window Shopping",
    context: "Hanya melihat-lihat.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Clerk', text: "Can I help you find something?", translation: "Bisa saya bantu carikan sesuatu?" },
      { speaker: 'B', name: 'Visitor', text: "No thanks, I am just looking.", translation: "Tidak terima kasih, saya cuma lihat-lihat." },
      { speaker: 'A', name: 'Clerk', text: "Let me know if you need help.", translation: "Beri tahu saya kalau butuh bantuan." },
      { speaker: 'B', name: 'Visitor', text: "Thank you, I will.", translation: "Terima kasih." }
    ]
  },
  {
    id: 'c8',
    title: "On Sale",
    context: "Mencari barang murah.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Customer', text: "Is this jacket on sale?", translation: "Apakah jaket ini lagi diskon?" },
      { speaker: 'B', name: 'Shop Assist', text: "Yes, it is 20% off today.", translation: "Ya, diskon 20% hari ini." },
      { speaker: 'A', name: 'Customer', text: "What is the final price?", translation: "Berapa harga akhirnya?" },
      { speaker: 'B', name: 'Shop Assist', text: "It comes to $40.", translation: "Jadinya 40 dolar." }
    ]
  },
  {
    id: 'c9',
    title: "Wrong Change",
    context: "Memperbaiki kesalahan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Cashier', text: "Here is your change.", translation: "Ini kembalian Anda." },
      { speaker: 'B', name: 'Customer', text: "Wait, I think this is wrong.", translation: "Tunggu, sepertinya ini salah." },
      { speaker: 'A', name: 'Cashier', text: "Oh, I am sorry. I gave you too little.", translation: "Oh, maaf. Saya kasih kurang." },
      { speaker: 'B', name: 'Customer', text: "Yes, I gave you a 50 bill.", translation: "Ya, saya tadi kasih uang 50." }
    ]
  },
  {
    id: 'c10',
    title: "Online Delivery",
    context: "Bertanya tentang pengiriman.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Buyer', text: "When will my package arrive?", translation: "Kapan paket saya akan sampai?" },
      { speaker: 'B', name: 'Support', text: "It should arrive by Friday.", translation: "Seharusnya sampai hari Jumat." },
      { speaker: 'A', name: 'Buyer', text: "Is shipping free?", translation: "Apakah ongkos kirimnya gratis?" },
      { speaker: 'B', name: 'Support', text: "Yes, for orders over $50.", translation: "Ya, untuk pesanan di atas 50 dolar." }
    ]
  }
];

const PRACTICE_QUESTIONS = [
{
    id: 1,
    prompt: "A piece of paper that proves you bought something is a ___.",
    options: [
      { text: "receipt", correct: true },
      { text: "recipe", correct: false },
      { text: "refund", correct: false }
    ],
    explanation: "'Receipt' (struk) adalah bukti pembelian."
  },
  {
    id: 2,
    prompt: "If the clothes don't fit, you can take them to the ___.",
    options: [
      { text: "living room", correct: false },
      { text: "fitting room", correct: true },
      { text: "waiting room", correct: false }
    ],
    explanation: "'Fitting room' adalah tempat mencoba pakaian."
  },
  {
    id: 3,
    prompt: "I don't have cash. Can I pay ___ credit card?",
    options: [
      { text: "by", correct: true },
      { text: "in", correct: false },
      { text: "with", correct: false }
    ],
    explanation: "Kita bilang 'pay by credit card' atau 'pay by check'."
  },
  {
    id: 4,
    prompt: "When you get your money back, it is called a ___.",
    options: [
      { text: "reward", correct: false },
      { text: "return", correct: false },
      { text: "refund", correct: true }
    ],
    explanation: "'Refund' adalah uang yang dikembalikan padamu."
  },
  {
    id: 5,
    prompt: "This item costs a lot of money. It is ___.",
    options: [
      { text: "free", correct: false },
      { text: "cheap", correct: false },
      { text: "expensive", correct: true }
    ],
    explanation: "'Expensive' (mahal) adalah lawan kata dari 'cheap' (murah)."
  },
  {
    id: 6,
    prompt: "Apa arti dari kalimat: \"Yes, they arrived this morning.\"?",
    options: [
      { text: "Oh, maaf. Saya kasih kurang.", correct: false },
      { text: "Ya, baru datang pagi ini.", correct: true },
      { text: "Saya ambil lima buah.", correct: false }
    ],
    explanation: "Kalimat \"Yes, they arrived this morning.\" memiliki arti \"Ya, baru datang pagi ini.\"."
  },
  {
    id: 7,
    prompt: "Bagaimana cara mengatakan: \"Oke, 80 baht buat Anda.\"?",
    options: [
      { text: "Is this jacket on sale?", correct: false },
      { text: "That will be $50, please.", correct: false },
      { text: "Okay, 80 baht for you.", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Oke, 80 baht buat Anda.\" adalah \"Okay, 80 baht for you.\"."
  },
  {
    id: 8,
    prompt: "Lengkapi kalimat: \"Yes, it is 20% ___ today.\"\n(Arti: Ya, diskon 20% hari ini.)",
    options: [
      { text: "off", correct: true },
      { text: "me", correct: false },
      { text: "is", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'off'."
  },
  {
    id: 9,
    prompt: "Apa arti dari kalimat: \"It is $25.\"?",
    options: [
      { text: "Kapan paket saya akan sampai?", correct: false },
      { text: "Beri tahu saya kalau butuh bantuan.", correct: false },
      { text: "Harganya 25 dolar.", correct: true }
    ],
    explanation: "Kalimat \"It is $25.\" memiliki arti \"Harganya 25 dolar.\"."
  },
  {
    id: 10,
    prompt: "Bagaimana cara mengatakan: \"Permisi, berapa harga kemeja ini?\"?",
    options: [
      { text: "That will be $50, please.", correct: false },
      { text: "Excuse me, how much is this shirt?", correct: true },
      { text: "Yes, I gave you a 50 bill.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Permisi, berapa harga kemeja ini?\" adalah \"Excuse me, how much is this shirt?\"."
  },
  {
    id: 11,
    prompt: "Lengkapi kalimat: \"I will take five of ___.\"\n(Arti: Saya ambil lima buah.)",
    options: [
      { text: "$40", correct: false },
      { text: "Can", correct: false },
      { text: "them", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'them'."
  },
  {
    id: 12,
    prompt: "Apa arti dari kalimat: \"Can I help you find something?\"?",
    options: [
      { text: "Bisa saya bantu carikan sesuatu?", correct: true },
      { text: "Terima kasih.", correct: false },
      { text: "Seharusnya sampai hari Jumat.", correct: false }
    ],
    explanation: "Kalimat \"Can I help you find something?\" memiliki arti \"Bisa saya bantu carikan sesuatu?\"."
  },
  {
    id: 13,
    prompt: "Bagaimana cara mengatakan: \"Jadinya 40 dolar.\"?",
    options: [
      { text: "It comes to $40.", correct: true },
      { text: "Do you have the receipt?", correct: false },
      { text: "Do you have this in Medium?", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Jadinya 40 dolar.\" adalah \"It comes to $40.\"."
  },
  {
    id: 14,
    prompt: "Lengkapi kalimat: \"Here you ___.\"\n(Arti: Ini dia.)",
    options: [
      { text: "gave", correct: false },
      { text: "your", correct: false },
      { text: "go", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'go'."
  },
  {
    id: 15,
    prompt: "Apa arti dari kalimat: \"Yes, please insert your card here.\"?",
    options: [
      { text: "Bisa kasih diskon?", correct: false },
      { text: "Apakah ongkos kirimnya gratis?", correct: false },
      { text: "Ya, silakan masukkan kartu Anda di sini.", correct: true }
    ],
    explanation: "Kalimat \"Yes, please insert your card here.\" memiliki arti \"Ya, silakan masukkan kartu Anda di sini.\"."
  },
  {
    id: 16,
    prompt: "Bagaimana cara mengatakan: \"Ya, saya tadi kasih uang 50.\"?",
    options: [
      { text: "It is 100 baht.", correct: false },
      { text: "Yes, I gave you a 50 bill.", correct: true },
      { text: "I will take five of them.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Ya, saya tadi kasih uang 50.\" adalah \"Yes, I gave you a 50 bill.\"."
  },
  {
    id: 17,
    prompt: "Lengkapi kalimat: \"Do you ___ the receipt?\"\n(Arti: Apakah Anda bawa struknya?)",
    options: [
      { text: "have", correct: true },
      { text: "Here", correct: false },
      { text: "is", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'have'."
  },
  {
    id: 18,
    prompt: "Apa arti dari kalimat: \"Here is your change.\"?",
    options: [
      { text: "Apakah jaket ini lagi diskon?", correct: false },
      { text: "Apakah ongkos kirimnya gratis?", correct: false },
      { text: "Ini kembalian Anda.", correct: true }
    ],
    explanation: "Kalimat \"Here is your change.\" memiliki arti \"Ini kembalian Anda.\"."
  },
  {
    id: 19,
    prompt: "Bagaimana cara mengatakan: \"Ini kekecilan buat saya.\"?",
    options: [
      { text: "It is too small for me.", correct: true },
      { text: "I will weigh them for you.", correct: false },
      { text: "Yes, please insert your card here.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Ini kekecilan buat saya.\" adalah \"It is too small for me.\"."
  },
  {
    id: 20,
    prompt: "Lengkapi kalimat: \"It ___ arrive by Friday.\"\n(Arti: Seharusnya sampai hari Jumat.)",
    options: [
      { text: "I", correct: false },
      { text: "over", correct: false },
      { text: "should", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'should'."
  }
];

const ElemSpeakingLesson6: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_speaking', 6);
  const nextLessonPath = '/modul/english/elementary/speaking/lesson-7';
  const [activeScenario, setActiveScenario] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const [practiceStep, setPracticeStep] = useState(0);
  const [selectedPracticeOption, setSelectedPracticeOption] = useState<number | null>(null);
  const [isPracticeChecked, setIsPracticeChecked] = useState(false);

  const currentScenario = CONVERSATION_SCENARIOS.find(c => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];

  const handlePlayAudio = (text: string) => { playAudio(text, 0.9); };

  const handleCheckPractice = (idx: number) => {
    if (isPracticeChecked) return;
    setSelectedPracticeOption(idx);
    setIsPracticeChecked(true);
  };

  const nextPractice = () => {
    if (practiceStep < PRACTICE_QUESTIONS.length - 1) {
      setPracticeStep(prev => prev + 1);
      setIsPracticeChecked(false);
      setSelectedPracticeOption(null);
    } else {
      alert("Latihan Selesai! Kamu siap untuk berbelanja.");
      setPracticeStep(0);
      setIsPracticeChecked(false);
      setSelectedPracticeOption(null);
    }
  };

  return (
        <>
          <LessonCompleteModal
      show={showCompleteModal}
      onClose={() => setShowCompleteModal(false)}
      lessonLabel={"Elementary Speaking Lesson 6"}
      accentColor={"#E74C3C"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Belanja & Uang"
            subtitle="Speaking • Pelajaran 6"
            accentColor="#E74C3C"
            nextLesson={nextLessonPath}
            tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}
            footer={() => (
                <button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #E74C3C, #E74C3Ccc)' }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
                </button>
            )}
        >
            {(tabId) => tabId === 'learn' ? (
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">
        <div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">

          {/* Intro Card */}
          <motion.section
                      custom={0}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <TrendingUp className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Waktunya Belanja</h2>
              <p className="text-emerald-100 text-sm leading-relaxed mb-4">
                Belajar cara menanyakan harga, mendapatkan ukuran yang pas, dan membayar barangmu dengan lancar dalam bahasa Inggris.
              </p>
              <div className="flex gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">40 Baris</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">10 Skenario</span>
              </div>
            </div>
          </motion.section>

          {/* Scenario Selector */}
          <section>
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 px-1">Pilih Skenario</h3>
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
              {CONVERSATION_SCENARIOS.map(scenario => (
                <button
                  key={scenario.id}
                  onClick={() => setActiveScenario(scenario.id)}
                  className={`flex-shrink-0 px-5 py-3 rounded-xl border transition-all ${activeScenario === scenario.id
                      ? 'bg-slate-800 text-white border-slate-800 shadow-md transform scale-105'
                      : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-border)]'
                    }`}
                >
                  <span className="block text-sm font-bold whitespace-nowrap">{scenario.title}</span>
                  <span className="block text-[10px] opacity-70 mt-0.5 text-left">{scenario.level}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Active Conversation Display */}
          <motion.section
                      custom={1}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-white rounded-[2rem] p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] min-h-[400px]">
            <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-4">
              <div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{currentScenario.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)] font-medium">{currentScenario.context}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentScenario.level === 'Formal' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {currentScenario.level}
              </div>
            </div>

            <div className="space-y-6">
              {currentScenario.dialogue.map((line, idx) => (
                <div key={idx} className={`flex gap-4 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-[var(--shadow-card)] ${line.speaker === 'A' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-[var(--color-text-secondary)]'
                    }`}>
                    {line.speaker}
                  </div>

                  {/* Bubble */}
                  <div className={`flex-1 max-w-[85%] group`}>
                    <div className={`p-4 rounded-2xl relative ${line.speaker === 'A'
                        ? 'bg-[var(--color-background)] text-[var(--color-text-primary)] rounded-tl-sm'
                        : 'bg-emerald-50 text-emerald-900 rounded-tr-sm'
                      }`}>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-[10px] font-bold opacity-50 uppercase tracking-wide">{line.name}</span>
                        <button
                          onClick={() => handlePlayAudio(line.text)}
                          className="text-[var(--color-text-muted)] hover:text-emerald-600 transition-colors"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                      <p className="text-base font-medium leading-relaxed">{line.text}</p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-2 pt-2 border-t border-[var(--color-border)]/50 italic">
                        {line.translation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Tips Section */}
          <motion.section
                      custom={3}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
            <div className="flex items-start gap-4">
              <ClipboardList className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-amber-900 mb-2">Tips Pro: "How much?"</h3>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Gunakan <b>"How much is this?"</b> untuk benda tunggal (satu baju).<br />
                  Gunakan <b>"How much are these?"</b> untuk benda jamak (sepatu, celana, kacamata).
                </p>
              </div>
            </div>
          </motion.section>

        </div></div>) : tabId === 'practice' ? (
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">
        <div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">
          {/* Interactive Practice Section */}
          <motion.section
                      custom={2}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-white rounded-[2rem] p-6 shadow-lg shadow-blue-900/5 border border-blue-100 relative overflow-hidden">
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-100 p-2 rounded-xl text-emerald-700">
                  <Lightbulb size={24} />
                </div>
                <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Kuis Cepat</h2>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-xs font-bold text-[var(--color-text-muted)] mb-2 uppercase tracking-wide">
                  <span>Pertanyaan {practiceStep + 1} dari {PRACTICE_QUESTIONS.length}</span>
                  <span>Progres</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${((practiceStep + 1) / PRACTICE_QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-[var(--color-text-muted)] text-sm font-bold mb-2">Isi bagian yang kosong:</p>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] leading-snug">
                  {PRACTICE_QUESTIONS[practiceStep].prompt}
                </h3>
              </div>

              <div className="space-y-3">
                {PRACTICE_QUESTIONS[practiceStep].options.map((opt, idx) => {
                  let btnClass = "border-[var(--color-border)] hover:border-blue-300 hover:bg-[var(--color-background)]";
                  if (isPracticeChecked) {
                    if (opt.correct) btnClass = "bg-green-50 border-sky-500 text-green-700";
                    else if (idx === selectedPracticeOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                    else btnClass = "opacity-50 border-[var(--color-border)]";
                  } else if (selectedPracticeOption === idx) {
                    btnClass = "border-blue-500 bg-emerald-50 text-emerald-700";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleCheckPractice(idx)}
                      disabled={isPracticeChecked}
                      className={`w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${btnClass}`}
                    >
                      <span>{opt.text}</span>
                      {isPracticeChecked && opt.correct && <CheckCircle2 size={20} />}
                      {isPracticeChecked && idx === selectedPracticeOption && !opt.correct && <XCircle size={20} />}
                    </button>
                  );
                })}
              </div>

              {isPracticeChecked && (
                <div className="mt-6 animate-fade-in">
                  <div className={`p-4 rounded-xl text-sm mb-4 ${PRACTICE_QUESTIONS[practiceStep].options[selectedPracticeOption!].correct
                      ? 'bg-green-50 text-green-800'
                      : 'bg-orange-50 text-orange-800'
                    }`}>
                    <span className="font-bold block mb-1">
                      {PRACTICE_QUESTIONS[practiceStep].options[selectedPracticeOption!].correct ? "Benar!" : "Penjelasan:"}
                    </span>
                    {PRACTICE_QUESTIONS[practiceStep].explanation}
                  </div>
                  <button
                    onClick={nextPractice}
                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                  >
                    Skenario Berikutnya
                  </button>
                </div>
              )}
            </div>
          </motion.section>


        </div>
      </div>
    ) : null}</LessonShell>
    </>);};
export default ElemSpeakingLesson6;