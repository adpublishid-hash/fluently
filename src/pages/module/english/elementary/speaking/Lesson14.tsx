import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, TrendingUp, ArrowLeftRight } from 'lucide-react';
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
    title: "Waking Up",
    context: "Rutinitas pagi.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Mom', text: "It is 7 AM. Wake up!", translation: "Sudah jam 7 pagi. Bangun!" },
      { speaker: 'B', name: 'Son', text: "I am awake, but I can't get up.", translation: "Aku sudah bangun (sadar), tapi gak bisa bangun (dari kasur)." },
      { speaker: 'A', name: 'Mom', text: "Come on, turn on the light.", translation: "Ayolah, nyalakan lampunya." },
      { speaker: 'B', name: 'Son', text: "Okay, I am getting up now.", translation: "Oke, aku bangun sekarang." }
    ]
  },
  {
    id: 'c2',
    title: "Getting Dressed",
    context: "Bersiap pergi keluar.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Wife', text: "It is cold. Put on your jacket.", translation: "Di luar dingin. Pakai jaketmu." },
      { speaker: 'B', name: 'Husband', text: "Should I take off my sandals?", translation: "Haruskah aku lepas sandalku?" },
      { speaker: 'A', name: 'Wife', text: "Yes, put on your boots instead.", translation: "Ya, pakailah sepatu botmu sebagai gantinya." },
      { speaker: 'B', name: 'Husband', text: "Good idea. I don't want cold feet.", translation: "Ide bagus. Aku tidak mau kakiku kedinginan." }
    ]
  },
  {
    id: 'c3',
    title: "Taking the Bus",
    context: "Transportasi umum.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Sam', text: "Quick, get on the bus!", translation: "Cepat, naik busnya!" },
      { speaker: 'B', name: 'Leo', text: "Wait, I need to pay first.", translation: "Tunggu, aku harus bayar dulu." },
      { speaker: 'A', name: 'Sam', text: "Where do we get off?", translation: "Di mana kita turun?" },
      { speaker: 'B', name: 'Leo', text: "We get off at the next stop.", translation: "Kita turun di pemberhentian berikutnya." }
    ]
  },
  {
    id: 'c4',
    title: "Lost Item",
    context: "Mencari kunci.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Alice', text: "What are you looking for?", translation: "Apa yang sedang kamu cari?" },
      { speaker: 'B', name: 'Bob', text: "I am looking for my keys.", translation: "Aku sedang mencari kunciku." },
      { speaker: 'A', name: 'Alice', text: "Did you pick them up?", translation: "Apa kamu tadi mengambilnya?" },
      { speaker: 'B', name: 'Bob', text: "No, I put them down here.", translation: "Tidak, aku menaruhnya di sini." }
    ]
  },
  {
    id: 'c5',
    title: "Cleaning Up",
    context: "Merapikan ruangan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Dad', text: "Please pick up that paper.", translation: "Tolong ambil kertas itu." },
      { speaker: 'B', name: 'Kid', text: "Should I throw it away?", translation: "Haruskah aku membuangnya?" },
      { speaker: 'A', name: 'Dad', text: "Yes, throw it away in the bin.", translation: "Ya, buang ke tempat sampah." },
      { speaker: 'B', name: 'Kid', text: "Okay, I will clean up this mess.", translation: "Oke, aku akan membereskan kekacauan ini." }
    ]
  },
  {
    id: 'c6',
    title: "Volume Control",
    context: "Menonton TV.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Ann', text: "Can you turn down the music?", translation: "Bisa kecilkan musiknya?" },
      { speaker: 'B', name: 'Ben', text: "Sorry, I will turn it down.", translation: "Maaf, aku akan mengecilkannya." },
      { speaker: 'A', name: 'Ann', text: "Or just turn it off, please.", translation: "Atau matikan saja, tolong." },
      { speaker: 'B', name: 'Ben', text: "Fine, I will put on headphones.", translation: "Baiklah, aku akan pakai headphone." }
    ]
  },
  {
    id: 'c7',
    title: "Relationships",
    context: "Bicara tentang keluarga.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend', text: "Do you get along with your sister?", translation: "Apa kamu akur dengan kakakmu?" },
      { speaker: 'B', name: 'You', text: "Yes, we hang out every weekend.", translation: "Ya, kami nongkrong setiap akhir pekan." },
      { speaker: 'A', name: 'Friend', text: "That is nice. I often argue with mine.", translation: "Itu bagus. Aku sering berdebat dengan kakakku." },
      { speaker: 'B', name: 'You', text: "You should try to make up.", translation: "Kamu harus mencoba berbaikan." }
    ]
  },
  {
    id: 'c8',
    title: "Don't Give Up",
    context: "Menyemangati teman.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Student', text: "This exercise is too hard. I give up.", translation: "Latihan ini terlalu sulit. Aku menyerah." },
      { speaker: 'B', name: 'Tutor', text: "Don't give up! Keep on trying.", translation: "Jangan menyerah! Teruslah mencoba." },
      { speaker: 'A', name: 'Student', text: "I can't figure it out.", translation: "Aku tidak bisa memecahkannya." },
      { speaker: 'B', name: 'Tutor', text: "Let's look up the answer together.", translation: "Ayo kita cari jawabannya bersama." }
    ]
  },
  {
    id: 'c9',
    title: "At the Hotel",
    context: "Lapor masuk dan keluar.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Guest', text: "We need to check in at 2 PM.", translation: "Kami perlu check in jam 2 siang." },
      { speaker: 'B', name: 'Receptionist', text: "Certainly. When do you check out?", translation: "Tentu. Kapan Anda check out?" },
      { speaker: 'A', name: 'Guest', text: "We check out on Sunday morning.", translation: "Kami check out hari Minggu pagi." },
      { speaker: 'B', name: 'Receptionist', text: "Great. Please fill in this form.", translation: "Bagus. Tolong isi formulir ini." }
    ]
  },
  {
    id: 'c10',
    title: "Babysitting",
    context: "Meminta bantuan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Neighbor', text: "Can you look after my cat?", translation: "Bisa tolong jaga kucingku?" },
      { speaker: 'B', name: 'You', text: "Sure. I grew up with cats.", translation: "Tentu. Aku tumbuh besar dengan kucing." },
      { speaker: 'A', name: 'Neighbor', text: "Thanks. He likes to run away.", translation: "Makasih. Dia suka kabur." },
      { speaker: 'B', name: 'You', text: "Don't worry. I will watch out for him.", translation: "Jangan khawatir. Aku akan mengawasinya." }
    ]
  }
];

const PRACTICE_QUESTIONS = [
{
    id: 1,
    prompt: "I need to find my keys. I am ___ them.",
    options: [
      { text: "looking after", correct: false },
      { text: "looking up", correct: false },
      { text: "looking for", correct: true }
    ],
    explanation: "'Look for' artinya mencari. 'Look after' artinya merawat/menjaga."
  },
  {
    id: 2,
    prompt: "It is dark. Please ___ the light.",
    options: [
      { text: "turn on", correct: true },
      { text: "turn off", correct: false },
      { text: "turn up", correct: false }
    ],
    explanation: "'Turn on' artinya menyalakan daya/lampu."
  },
  {
    id: 3,
    prompt: "When you enter a house, usually you ___ your shoes.",
    options: [
      { text: "put on", correct: false },
      { text: "get off", correct: false },
      { text: "take off", correct: true }
    ],
    explanation: "'Take off' artinya melepas pakaian/sepatu."
  },
  {
    id: 4,
    prompt: "To leave a bus, you ___.",
    options: [
      { text: "get up", correct: false },
      { text: "get out", correct: false },
      { text: "get off", correct: true }
    ],
    explanation: "Untuk transportasi umum (bus, kereta, pesawat), kita bilang 'get off'."
  },
  {
    id: 5,
    prompt: "Please ___ the form with your name.",
    options: [
      { text: "write in", correct: false },
      { text: "fill up", correct: false },
      { text: "fill in", correct: true }
    ],
    explanation: "'Fill in' (atau fill out) artinya melengkapi formulir."
  },
  {
    id: 6,
    prompt: "Apa arti dari kalimat: \"Okay, I am getting up now.\"?",
    options: [
      { text: "Bisa tolong jaga kucingku?", correct: false },
      { text: "Oke, aku bangun sekarang.", correct: true },
      { text: "Maaf, aku akan mengecilkannya.", correct: false }
    ],
    explanation: "Kalimat \"Okay, I am getting up now.\" memiliki arti \"Oke, aku bangun sekarang.\"."
  },
  {
    id: 7,
    prompt: "Bagaimana cara mengatakan: \"Makasih. Dia suka kabur.\"?",
    options: [
      { text: "Let's look up the answer together.", correct: false },
      { text: "Good idea. I don't want cold feet.", correct: false },
      { text: "Thanks. He likes to run away.", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Makasih. Dia suka kabur.\" adalah \"Thanks. He likes to run away.\"."
  },
  {
    id: 8,
    prompt: "Lengkapi kalimat: \"Can you look ___ my cat?\"\n(Arti: Bisa tolong jaga kucingku?)",
    options: [
      { text: "after", correct: true },
      { text: "stop", correct: false },
      { text: "This", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'after'."
  },
  {
    id: 9,
    prompt: "Apa arti dari kalimat: \"This exercise is too hard. I give up.\"?",
    options: [
      { text: "Latihan ini terlalu sulit. Aku menyerah.", correct: true },
      { text: "Haruskah aku lepas sandalku?", correct: false },
      { text: "Bisa tolong jaga kucingku?", correct: false }
    ],
    explanation: "Kalimat \"This exercise is too hard. I give up.\" memiliki arti \"Latihan ini terlalu sulit. Aku menyerah.\"."
  },
  {
    id: 10,
    prompt: "Bagaimana cara mengatakan: \"Kita turun di pemberhentian berikutnya.\"?",
    options: [
      { text: "Do you get along with your sister?", correct: false },
      { text: "We get off at the next stop.", correct: true },
      { text: "Quick, get on the bus!", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Kita turun di pemberhentian berikutnya.\" adalah \"We get off at the next stop.\"."
  },
  {
    id: 11,
    prompt: "Lengkapi kalimat: \"Let's look up the ___ together.\"\n(Arti: Ayo kita cari jawabannya bersama.)",
    options: [
      { text: "bin", correct: false },
      { text: "keys", correct: false },
      { text: "answer", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'answer'."
  },
  {
    id: 12,
    prompt: "Apa arti dari kalimat: \"I am looking for my keys.\"?",
    options: [
      { text: "Cepat, naik busnya!", correct: false },
      { text: "Aku sedang mencari kunciku.", correct: true },
      { text: "Ayolah, nyalakan lampunya.", correct: false }
    ],
    explanation: "Kalimat \"I am looking for my keys.\" memiliki arti \"Aku sedang mencari kunciku.\"."
  },
  {
    id: 13,
    prompt: "Bagaimana cara mengatakan: \"Ya, buang ke tempat sampah.\"?",
    options: [
      { text: "Yes, throw it away in the bin.", correct: true },
      { text: "Thanks. He likes to run away.", correct: false },
      { text: "No, I put them down here.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Ya, buang ke tempat sampah.\" adalah \"Yes, throw it away in the bin.\"."
  },
  {
    id: 14,
    prompt: "Lengkapi kalimat: \"Fine, I ___ put on headphones.\"\n(Arti: Baiklah, aku akan pakai headphone.)",
    options: [
      { text: "to", correct: false },
      { text: "feet", correct: false },
      { text: "will", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'will'."
  },
  {
    id: 15,
    prompt: "Apa arti dari kalimat: \"Good idea. I don't want cold feet.\"?",
    options: [
      { text: "Ide bagus. Aku tidak mau kakiku kedinginan.", correct: true },
      { text: "Ayo kita cari jawabannya bersama.", correct: false },
      { text: "Bagus. Tolong isi formulir ini.", correct: false }
    ],
    explanation: "Kalimat \"Good idea. I don't want cold feet.\" memiliki arti \"Ide bagus. Aku tidak mau kakiku kedinginan.\"."
  },
  {
    id: 16,
    prompt: "Bagaimana cara mengatakan: \"Kami perlu check in jam 2 siang.\"?",
    options: [
      { text: "We need to check in at 2 PM.", correct: true },
      { text: "That is nice. I often argue with mine.", correct: false },
      { text: "You should try to make up.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Kami perlu check in jam 2 siang.\" adalah \"We need to check in at 2 PM.\"."
  },
  {
    id: 17,
    prompt: "Lengkapi kalimat: \"Yes, ___ on your boots instead.\"\n(Arti: Ya, pakailah sepatu botmu sebagai gantinya.)",
    options: [
      { text: "Did", correct: false },
      { text: "do", correct: false },
      { text: "put", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'put'."
  },
  {
    id: 18,
    prompt: "Apa arti dari kalimat: \"Did you pick them up?\"?",
    options: [
      { text: "Apa kamu tadi mengambilnya?", correct: true },
      { text: "Tidak, aku menaruhnya di sini.", correct: false },
      { text: "Sudah jam 7 pagi. Bangun!", correct: false }
    ],
    explanation: "Kalimat \"Did you pick them up?\" memiliki arti \"Apa kamu tadi mengambilnya?\"."
  },
  {
    id: 19,
    prompt: "Bagaimana cara mengatakan: \"Di mana kita turun?\"?",
    options: [
      { text: "Sorry, I will turn it down.", correct: false },
      { text: "Sure. I grew up with cats.", correct: false },
      { text: "Where do we get off?", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Di mana kita turun?\" adalah \"Where do we get off?\"."
  },
  {
    id: 20,
    prompt: "Lengkapi kalimat: \"I am awake, but I can't get ___.\"\n(Arti: Aku sudah bangun (sadar), tapi gak bisa bangun (dari kasur).)",
    options: [
      { text: "you", correct: false },
      { text: "up", correct: true },
      { text: "check", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'up'."
  }
];

const ElemSpeakingLesson14: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_speaking', 14);
  const nextLessonPath = '/modul/english/elementary/speaking/lesson-15';
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
      alert("Latihan Selesai! Teruslah belajar!");
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
      lessonLabel={"Elementary Speaking Lesson 14"}
      accentColor={"#E74C3C"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Phrasal Verbs Umum"
            subtitle="Speaking • Pelajaran 14"
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
                      className="bg-gradient-to-br from-cyan-500 to-sky-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <ArrowLeftRight className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Phrasal Verbs</h2>
              <p className="text-cyan-100 text-sm leading-relaxed mb-4">
                Phrasal verbs adalah kata kerja yang terdiri dari dua bagian (Kata Kerja + Preposisi). Ini sangat umum dalam bahasa Inggris sehari-hari!
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
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentScenario.level === 'Formal' ? 'bg-indigo-50 text-indigo-600' : 'bg-cyan-50 text-cyan-600'}`}>
                {currentScenario.level}
              </div>
            </div>

            <div className="space-y-6">
              {currentScenario.dialogue.map((line, idx) => (
                <div key={idx} className={`flex gap-4 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-[var(--shadow-card)] ${line.speaker === 'A' ? 'bg-gray-100 text-[var(--color-text-secondary)]' : 'bg-cyan-100 text-cyan-600'
                    }`}>
                    {line.speaker}
                  </div>

                  {/* Bubble */}
                  <div className={`flex-1 max-w-[85%] group`}>
                    <div className={`p-4 rounded-2xl relative ${line.speaker === 'A'
                        ? 'bg-[var(--color-background)] text-[var(--color-text-primary)] rounded-tl-sm'
                        : 'bg-cyan-50 text-cyan-900 rounded-tr-sm'
                      }`}>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-[10px] font-bold opacity-50 uppercase tracking-wide">{line.name}</span>
                        <button
                          onClick={() => handlePlayAudio(line.text)}
                          className="text-[var(--color-text-muted)] hover:text-cyan-600 transition-colors"
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
                      className="bg-sky-50 rounded-2xl p-6 border border-sky-100">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-sky-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-sky-900 mb-2">Tips Pro: Penempatan Objek</h3>
                <p className="text-sm text-sky-700 leading-relaxed">
                  Dengan banyak phrasal verb, kamu bisa menaruh objek di tengah atau di akhir.<br />
                  "<b>Turn on</b> the light" ATAU "<b>Turn</b> the light <b>on</b>."<br />
                  TAPI jika kamu pakai "it", itu HARUS di tengah: "<b>Turn it on</b>" (Bukan "Turn on it").
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
                      className="bg-white rounded-[2rem] p-6 shadow-lg shadow-cyan-900/5 border border-cyan-100 relative overflow-hidden">
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-cyan-100 p-2 rounded-xl text-cyan-700">
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
                    className="h-full bg-cyan-500 transition-all duration-300"
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
                  let btnClass = "border-[var(--color-border)] hover:border-cyan-300 hover:bg-[var(--color-background)]";
                  if (isPracticeChecked) {
                    if (opt.correct) btnClass = "bg-green-50 border-sky-500 text-green-700";
                    else if (idx === selectedPracticeOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                    else btnClass = "opacity-50 border-[var(--color-border)]";
                  } else if (selectedPracticeOption === idx) {
                    btnClass = "border-cyan-500 bg-cyan-50 text-cyan-700";
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
export default ElemSpeakingLesson14;