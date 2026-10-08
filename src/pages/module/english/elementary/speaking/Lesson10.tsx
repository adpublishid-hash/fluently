import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, TrendingUp, Smartphone } from 'lucide-react';
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
    title: "Low Battery",
    context: "Meminta charger.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Sam', text: "My phone is dying.", translation: "HP-ku mau mati (habis baterai)." },
      { speaker: 'B', name: 'Ben', text: "Do you have a charger?", translation: "Kamu punya charger?" },
      { speaker: 'A', name: 'Sam', text: "No, I left it at home.", translation: "Tidak, aku meninggalkannya di rumah." },
      { speaker: 'B', name: 'Ben', text: "You can use mine.", translation: "Kamu bisa pakai punyaku." }
    ]
  },
  {
    id: 'c2',
    title: "Wi-Fi Password",
    context: "Menyambung ke internet.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Guest', text: "What is the Wi-Fi password?", translation: "Apa kata sandi Wi-Fi nya?" },
      { speaker: 'B', name: 'Host', text: "It is 'Coffee123'.", translation: "Kata sandinya 'Coffee123'." },
      { speaker: 'A', name: 'Guest', text: "Is the 'C' capital?", translation: "Apakah huruf 'C' nya besar?" },
      { speaker: 'B', name: 'Host', text: "Yes, capital C.", translation: "Ya, C besar." }
    ]
  },
  {
    id: 'c3',
    title: "Bad Signal",
    context: "Masalah panggilan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Caller', text: "Hello? Can you hear me?", translation: "Halo? Bisa dengar saya?" },
      { speaker: 'B', name: 'Receiver', text: "You are breaking up.", translation: "Suaramu putus-putus." },
      { speaker: 'A', name: 'Caller', text: "The signal is very bad here.", translation: "Sinyal di sini sangat buruk." },
      { speaker: 'B', name: 'Receiver', text: "Call me back later.", translation: "Telepon aku lagi nanti." }
    ]
  },
  {
    id: 'c4',
    title: "New Phone",
    context: "Menunjukkan perangkat baru.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend 1', text: "Is that a new phone?", translation: "Apa itu HP baru?" },
      { speaker: 'B', name: 'Friend 2', text: "Yes, I bought it yesterday.", translation: "Ya, aku membelinya kemarin." },
      { speaker: 'A', name: 'Friend 1', text: "The camera looks amazing.", translation: "Kameranya terlihat luar biasa." },
      { speaker: 'B', name: 'Friend 2', text: "It takes great photos.", translation: "Hasil fotonya sangat bagus." }
    ]
  },
  {
    id: 'c5',
    title: "Social Media",
    context: "Berbagi profil.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Alex', text: "Are you on Instagram?", translation: "Kamu punya Instagram?" },
      { speaker: 'B', name: 'Mia', text: "Yes, my username is @mia_art.", translation: "Ya, username-ku @mia_art." },
      { speaker: 'A', name: 'Alex', text: "I will follow you.", translation: "Aku akan follow kamu." },
      { speaker: 'B', name: 'Mia', text: "Thanks, I will follow back.", translation: "Makasih, aku akan follow balik." }
    ]
  },
  {
    id: 'c6',
    title: "Computer Trouble",
    context: "Dukungan teknis.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'User', text: "My laptop is so slow.", translation: "Laptop saya lambat sekali." },
      { speaker: 'B', name: 'Tech', text: "Maybe you have a virus.", translation: "Mungkin ada virus." },
      { speaker: 'A', name: 'User', text: "I should run a scan.", translation: "Saya harus jalankan scan." },
      { speaker: 'B', name: 'Tech', text: "Or just restart it.", translation: "Atau restart saja." }
    ]
  },
  {
    id: 'c7',
    title: "Sending a File",
    context: "Mengirim dokumen via email.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Colleague', text: "Can you send me the photo?", translation: "Bisa kirim fotonya ke saya?" },
      { speaker: 'B', name: 'You', text: "Sure, I will email it to you.", translation: "Tentu, saya akan email ke Anda." },
      { speaker: 'A', name: 'Colleague', text: "Thanks. My email is tom@mail.com.", translation: "Trims. Email saya tom@mail.com." },
      { speaker: 'B', name: 'You', text: "Sent. Check your inbox.", translation: "Terkirim. Cek kotak masukmu." }
    ]
  },
  {
    id: 'c8',
    title: "Downloading App",
    context: "Mengunduh perangkat lunak.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Driver', text: "Do you have the Uber app?", translation: "Punya aplikasi Uber?" },
      { speaker: 'B', name: 'Rider', text: "No, I need to download it.", translation: "Tidak, saya perlu download dulu." },
      { speaker: 'A', name: 'Driver', text: "Use the free Wi-Fi here.", translation: "Pakai Wi-Fi gratis di sini." },
      { speaker: 'B', name: 'Rider', text: "Okay, I am installing it now.", translation: "Oke, saya install sekarang." }
    ]
  },
  {
    id: 'c9',
    title: "Forgot Password",
    context: "Masalah login.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'User', text: "I can't log in to my account.", translation: "Aku gak bisa masuk ke akunku." },
      { speaker: 'B', name: 'Friend', text: "Did you forget your password?", translation: "Lupa kata sandi?" },
      { speaker: 'A', name: 'User', text: "I think so. I tried three times.", translation: "Sepertinya iya. Aku coba tiga kali." },
      { speaker: 'B', name: 'Friend', text: "Click 'Forgot Password' to reset it.", translation: "Klik 'Lupa Sandi' untuk reset." }
    ]
  },
  {
    id: 'c10',
    title: "Online Shopping",
    context: "Membeli di internet.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Buyer', text: "I bought these shoes online.", translation: "Aku beli sepatu ini online." },
      { speaker: 'B', name: 'Friend', text: "Which website did you use?", translation: "Pakai website apa?" },
      { speaker: 'A', name: 'Buyer', text: "I used Amazon. It was cheap.", translation: "Pakai Amazon. Murah kok." },
      { speaker: 'B', name: 'Friend', text: "Did you pay for shipping?", translation: "Kamu bayar ongkir?" }
    ]
  }
];

const PRACTICE_QUESTIONS = [
{
    id: 1,
    prompt: "I am ___ the internet.",
    options: [
      { text: "in", correct: false },
      { text: "on", correct: true },
      { text: "at", correct: false }
    ],
    explanation: "Kita menggunakan 'on' untuk media elektronik (on the phone, on the internet, on Instagram)."
  },
  {
    id: 2,
    prompt: "Please ___ on the TV.",
    options: [
      { text: "turn", correct: true },
      { text: "open", correct: false },
      { text: "make", correct: false }
    ],
    explanation: "Gunakan 'turn on' (atau switch on) untuk elektronik, bukan 'open'."
  },
  {
    id: 3,
    prompt: "I need to ___ my phone. The battery is low.",
    options: [
      { text: "fill", correct: false },
      { text: "charge", correct: true },
      { text: "load", correct: false }
    ],
    explanation: "Kita 'charge' baterai."
  },
  {
    id: 4,
    prompt: "To enter the website, you must log ___.",
    options: [
      { text: "to", correct: false },
      { text: "in", correct: true },
      { text: "on", correct: false }
    ],
    explanation: "Frasa kerjanya adalah 'log in' (atau sign in)."
  },
  {
    id: 5,
    prompt: "What is the Wi-Fi ___?",
    options: [
      { text: "password", correct: true },
      { text: "passport", correct: false },
      { text: "word", correct: false }
    ],
    explanation: "Kode rahasianya adalah 'password' (kata sandi)."
  },
  {
    id: 6,
    prompt: "Apa arti dari kalimat: \"I bought these shoes online.\"?",
    options: [
      { text: "Kameranya terlihat luar biasa.", correct: false },
      { text: "Aku beli sepatu ini online.", correct: true },
      { text: "Pakai website apa?", correct: false }
    ],
    explanation: "Kalimat \"I bought these shoes online.\" memiliki arti \"Aku beli sepatu ini online.\"."
  },
  {
    id: 7,
    prompt: "Bagaimana cara mengatakan: \"Kameranya terlihat luar biasa.\"?",
    options: [
      { text: "The camera looks amazing.", correct: true },
      { text: "Do you have the Uber app?", correct: false },
      { text: "My phone is dying.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Kameranya terlihat luar biasa.\" adalah \"The camera looks amazing.\"."
  },
  {
    id: 8,
    prompt: "Lengkapi kalimat: \"My phone is ___.\"\n(Arti: HP-ku mau mati (habis baterai).)",
    options: [
      { text: "on", correct: false },
      { text: "three", correct: false },
      { text: "dying", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'dying'."
  },
  {
    id: 9,
    prompt: "Apa arti dari kalimat: \"Are you on Instagram?\"?",
    options: [
      { text: "Pakai website apa?", correct: false },
      { text: "Kamu punya Instagram?", correct: true },
      { text: "Halo? Bisa dengar saya?", correct: false }
    ],
    explanation: "Kalimat \"Are you on Instagram?\" memiliki arti \"Kamu punya Instagram?\"."
  },
  {
    id: 10,
    prompt: "Bagaimana cara mengatakan: \"Sepertinya iya. Aku coba tiga kali.\"?",
    options: [
      { text: "I will follow you.", correct: false },
      { text: "I think so. I tried three times.", correct: true },
      { text: "Maybe you have a virus.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Sepertinya iya. Aku coba tiga kali.\" adalah \"I think so. I tried three times.\"."
  },
  {
    id: 11,
    prompt: "Lengkapi kalimat: \"Or ___ restart it.\"\n(Arti: Atau restart saja.)",
    options: [
      { text: "just", correct: true },
      { text: "breaking", correct: false },
      { text: "you", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'just'."
  },
  {
    id: 12,
    prompt: "Apa arti dari kalimat: \"Can you send me the photo?\"?",
    options: [
      { text: "Bisa kirim fotonya ke saya?", correct: true },
      { text: "Lupa kata sandi?", correct: false },
      { text: "Suaramu putus-putus.", correct: false }
    ],
    explanation: "Kalimat \"Can you send me the photo?\" memiliki arti \"Bisa kirim fotonya ke saya?\"."
  },
  {
    id: 13,
    prompt: "Bagaimana cara mengatakan: \"Suaramu putus-putus.\"?",
    options: [
      { text: "The signal is very bad here.", correct: false },
      { text: "You are breaking up.", correct: true },
      { text: "I used Amazon. It was cheap.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Suaramu putus-putus.\" adalah \"You are breaking up.\"."
  },
  {
    id: 14,
    prompt: "Lengkapi kalimat: \"What is ___ Wi-Fi password?\"\n(Arti: Apa kata sandi Wi-Fi nya?)",
    options: [
      { text: "can't", correct: false },
      { text: "Thanks", correct: false },
      { text: "the", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'the'."
  },
  {
    id: 15,
    prompt: "Apa arti dari kalimat: \"I can't log in to my account.\"?",
    options: [
      { text: "Aku gak bisa masuk ke akunku.", correct: true },
      { text: "Tentu, saya akan email ke Anda.", correct: false },
      { text: "Atau restart saja.", correct: false }
    ],
    explanation: "Kalimat \"I can't log in to my account.\" memiliki arti \"Aku gak bisa masuk ke akunku.\"."
  },
  {
    id: 16,
    prompt: "Bagaimana cara mengatakan: \"Makasih, aku akan follow balik.\"?",
    options: [
      { text: "Which website did you use?", correct: false },
      { text: "Yes, my username is @mia_art.", correct: false },
      { text: "Thanks, I will follow back.", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Makasih, aku akan follow balik.\" adalah \"Thanks, I will follow back.\"."
  },
  {
    id: 17,
    prompt: "Lengkapi kalimat: \"___, capital C.\"\n(Arti: Ya, C besar.)",
    options: [
      { text: "Yes", correct: true },
      { text: "virus", correct: false },
      { text: "follow", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'Yes'."
  },
  {
    id: 18,
    prompt: "Apa arti dari kalimat: \"I will follow you.\"?",
    options: [
      { text: "Pakai Amazon. Murah kok. (sekitar sini)", correct: false },
      { text: "Pakai Amazon. Murah kok. (bukan ini)", correct: false },
      { text: "Aku akan follow kamu.", correct: true }
    ],
    explanation: "Kalimat \"I will follow you.\" memiliki arti \"Aku akan follow kamu.\"."
  },
  {
    id: 19,
    prompt: "Bagaimana cara mengatakan: \"Mungkin ada virus.\"?",
    options: [
      { text: "No, I left it at home.", correct: false },
      { text: "What is the Wi-Fi password?", correct: false },
      { text: "Maybe you have a virus.", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Mungkin ada virus.\" adalah \"Maybe you have a virus.\"."
  },
  {
    id: 20,
    prompt: "Lengkapi kalimat: \"No, I need to download ___.\"\n(Arti: Tidak, saya perlu download dulu.)",
    options: [
      { text: "Can", correct: false },
      { text: "it", correct: true },
      { text: "was", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'it'."
  }
];

const ElemSpeakingLesson10: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_speaking', 10);
  const nextLessonPath = '/modul/english/elementary/speaking/lesson-11';
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
      alert("Latihan Selesai! Kamu melek teknologi.");
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
      lessonLabel={"Elementary Speaking Lesson 10"}
      accentColor={"#E74C3C"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Teknologi & Komunikasi"
            subtitle="Speaking • Pelajaran 10"
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
                      className="bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Smartphone className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Kehidupan Digital</h2>
              <p className="text-violet-100 text-sm leading-relaxed mb-4">
                Belajar berbicara tentang HP, masalah internet, media sosial, dan komputer.
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
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentScenario.level === 'Formal' ? 'bg-indigo-50 text-indigo-600' : 'bg-violet-50 text-violet-600'}`}>
                {currentScenario.level}
              </div>
            </div>

            <div className="space-y-6">
              {currentScenario.dialogue.map((line, idx) => (
                <div key={idx} className={`flex gap-4 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-[var(--shadow-card)] ${line.speaker === 'A' ? 'bg-gray-100 text-[var(--color-text-secondary)]' : 'bg-violet-100 text-violet-600'
                    }`}>
                    {line.speaker}
                  </div>

                  {/* Bubble */}
                  <div className={`flex-1 max-w-[85%] group`}>
                    <div className={`p-4 rounded-2xl relative ${line.speaker === 'A'
                        ? 'bg-[var(--color-background)] text-[var(--color-text-primary)] rounded-tl-sm'
                        : 'bg-violet-50 text-violet-900 rounded-tr-sm'
                      }`}>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-[10px] font-bold opacity-50 uppercase tracking-wide">{line.name}</span>
                        <button
                          onClick={() => handlePlayAudio(line.text)}
                          className="text-[var(--color-text-muted)] hover:text-violet-600 transition-colors"
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
                      className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Tips Pro: "ON" the Internet</h3>
                <p className="text-sm text-blue-700 leading-relaxed">
                  Kita biasa menggunakan preposisi <b>"on"</b> untuk sebagian besar hal terkait internet dan layar.<br />
                  <i>"I am <b>on</b> Facebook."</i> (Saya di Facebook)<br />
                  <i>"I saw it <b>on</b> the news."</i> (Saya lihat di berita)<br />
                  <i>"I am <b>on</b> the phone."</i> (Saya sedang menelepon)
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
                      className="bg-white rounded-[2rem] p-6 shadow-lg shadow-violet-900/5 border border-violet-100 relative overflow-hidden">
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-violet-100 p-2 rounded-xl text-violet-700">
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
                    className="h-full bg-violet-500 transition-all duration-300"
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
                  let btnClass = "border-[var(--color-border)] hover:border-violet-300 hover:bg-[var(--color-background)]";
                  if (isPracticeChecked) {
                    if (opt.correct) btnClass = "bg-green-50 border-sky-500 text-green-700";
                    else if (idx === selectedPracticeOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                    else btnClass = "opacity-50 border-[var(--color-border)]";
                  } else if (selectedPracticeOption === idx) {
                    btnClass = "border-violet-500 bg-violet-50 text-violet-700";
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
export default ElemSpeakingLesson10;