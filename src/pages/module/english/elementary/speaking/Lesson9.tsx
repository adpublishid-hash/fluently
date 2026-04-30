import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, Sun, CloudRain } from 'lucide-react';
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
    title: "Current Weather",
    context: "Mengobrol tentang cuaca hari ini.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tom', text: "What is the weather like?", translation: "Bagaimana cuacanya?" },
      { speaker: 'B', name: 'Jerry', text: "It is sunny and warm.", translation: "Cerah dan hangat." },
      { speaker: 'A', name: 'Tom', text: "Perfect for a walk.", translation: "Sempurna untuk jalan-jalan." },
      { speaker: 'B', name: 'Jerry', text: "Yes, let's go to the park.", translation: "Ya, ayo kita ke taman." }
    ]
  },
  {
    id: 'c2',
    title: "Rain Forecast",
    context: "Merencanakan ke depan.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Colleague', text: "Do you think it will rain?", translation: "Apa menurutmu akan hujan?" },
      { speaker: 'B', name: 'You', text: "The forecast says 100% chance.", translation: "Prakiraan bilang kemungkinannya 100%." },
      { speaker: 'A', name: 'Colleague', text: "I should bring an umbrella.", translation: "Saya harus bawa payung." },
      { speaker: 'B', name: 'You', text: "Definitely. Don't get wet.", translation: "Pasti. Jangan sampai basah." }
    ]
  },
  {
    id: 'c3',
    title: "Freezing Cold",
    context: "Mengeluh tentang suhu.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Sam', text: "It is freezing today!", translation: "Hari ini dingin sekali!" },
      { speaker: 'B', name: 'Mia', text: "I know. It is minus 5 degrees.", translation: "Aku tahu. Suhunya minus 5 derajat." },
      { speaker: 'A', name: 'Sam', text: "I need a hot coffee.", translation: "Aku butuh kopi panas." },
      { speaker: 'B', name: 'Mia', text: "Me too. Let's go inside.", translation: "Aku juga. Ayo masuk ke dalam." }
    ]
  },
  {
    id: 'c4',
    title: "Seasons",
    context: "Membahas kesukaan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Alice', text: "Which season do you like best?", translation: "Musim apa yang paling kamu suka?" },
      { speaker: 'B', name: 'Bob', text: "I love Spring because of the flowers.", translation: "Aku suka Musim Semi karena bunga-bunganya." },
      { speaker: 'A', name: 'Alice', text: "I prefer Summer for the beach.", translation: "Aku lebih suka Musim Panas untuk ke pantai." },
      { speaker: 'B', name: 'Bob', text: "Summer is too hot for me.", translation: "Musim Panas terlalu panas buatku." }
    ]
  },
  {
    id: 'c5',
    title: "Mountain View",
    context: "Perjalanan mendaki.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Hiker 1', text: "Look at that mountain!", translation: "Lihat gunung itu!" },
      { speaker: 'B', name: 'Hiker 2', text: "It is so high and beautiful.", translation: "Sangat tinggi dan indah." },
      { speaker: 'A', name: 'Hiker 1', text: "Do you want to climb it?", translation: "Apa kamu mau mendakinya?" },
      { speaker: 'B', name: 'Hiker 2', text: "No, I am just happy looking.", translation: "Tidak, aku senang melihatnya saja." }
    ]
  },
  {
    id: 'c6',
    title: "At the Beach",
    context: "Bersantai di tepi laut.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend 1', text: "The ocean is very blue today.", translation: "Lautnya sangat biru hari ini." },
      { speaker: 'B', name: 'Friend 2', text: "The water looks refreshing.", translation: "Airnya terlihat menyegarkan." },
      { speaker: 'A', name: 'Friend 1', text: "Let's go for a swim.", translation: "Ayo kita berenang." },
      { speaker: 'B', name: 'Friend 2', text: "Wait, I need sunscreen first.", translation: "Tunggu, aku butuh tabir surya dulu." }
    ]
  },
  {
    id: 'c7',
    title: "A Storm is Coming",
    context: "Situasi mendesak.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Dad', text: "Look at those dark clouds.", translation: "Lihat awan gelap itu." },
      { speaker: 'B', name: 'Mom', text: "A storm is coming soon.", translation: "Badai akan segera datang." },
      { speaker: 'A', name: 'Dad', text: "We should go home now.", translation: "Kita harus pulang sekarang." },
      { speaker: 'B', name: 'Mom', text: "Run! I feel the rain starting.", translation: "Lari! Aku merasa hujan mulai turun." }
    ]
  },
  {
    id: 'c8',
    title: "Snow Day",
    context: "Keseruan musim dingin.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Child 1', text: "It is snowing outside!", translation: "Di luar turun salju!" },
      { speaker: 'B', name: 'Child 2', text: "Wow, everything is white.", translation: "Wah, semuanya putih." },
      { speaker: 'A', name: 'Child 1', text: "Let's build a snowman.", translation: "Ayo buat boneka salju." },
      { speaker: 'B', name: 'Child 2', text: "Okay, I will get my gloves.", translation: "Oke, aku ambil sarung tanganku." }
    ]
  },
  {
    id: 'c9',
    title: "Humidity",
    context: "Mengeluh tentang panas.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Visitor', text: "It is so humid today.", translation: "Hari ini lembap sekali." },
      { speaker: 'B', name: 'Local', text: "I feel sticky and hot.", translation: "Aku merasa lengket dan panas." },
      { speaker: 'A', name: 'Visitor', text: "I wish there was a breeze.", translation: "Andai saja ada angin sepoi-sepoi." },
      { speaker: 'B', name: 'Local', text: "We need air conditioning.", translation: "Kita butuh AC." }
    ]
  },
  {
    id: 'c10',
    title: "Autumn Leaves",
    context: "Menikmati alam.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Artist', text: "The trees are changing color.", translation: "Pohon-pohon berubah warna." },
      { speaker: 'B', name: 'Photographer', text: "Red, orange, and yellow.", translation: "Merah, oranye, dan kuning." },
      { speaker: 'A', name: 'Artist', text: "Autumn is a beautiful season.", translation: "Musim gugur adalah musim yang indah." },
      { speaker: 'B', name: 'Photographer', text: "Yes, but winter is coming.", translation: "Ya, tapi musim dingin akan datang." }
    ]
  }
];

const PRACTICE_QUESTIONS = [
{
    id: 1,
    prompt: "What is the weather ___?",
    options: [
      { text: "look", correct: false },
      { text: "like", correct: true },
      { text: "love", correct: false }
    ],
    explanation: "Pertanyaan standarnya adalah 'What is the weather like?'."
  },
  {
    id: 2,
    prompt: "It is raining. Take an ___.",
    options: [
      { text: "umbrella", correct: true },
      { text: "sunglasses", correct: false },
      { text: "ice cream", correct: false }
    ],
    explanation: "Kamu butuh payung (umbrella) saat hujan."
  },
  {
    id: 3,
    prompt: "The temperature is very low. It is ___.",
    options: [
      { text: "boiling", correct: false },
      { text: "freezing", correct: true },
      { text: "burning", correct: false }
    ],
    explanation: "'Freezing' berarti sangat dingin (di bawah 0°C)."
  },
  {
    id: 4,
    prompt: "Flowers bloom in ___.",
    options: [
      { text: "winter", correct: false },
      { text: "spring", correct: true },
      { text: "autumn", correct: false }
    ],
    explanation: "Musim semi (Spring) adalah musim saat bunga mulai tumbuh."
  },
  {
    id: 5,
    prompt: "I check the ___ to know if it will rain.",
    options: [
      { text: "menu", correct: false },
      { text: "receipt", correct: false },
      { text: "forecast", correct: true }
    ],
    explanation: "Prakiraan cuaca (weather forecast) memprediksi cuaca."
  },
  {
    id: 6,
    prompt: "Apa arti dari kalimat: \"I feel sticky and hot.\"?",
    options: [
      { text: "Aku merasa lengket dan panas.", correct: true },
      { text: "Badai akan segera datang.", correct: false },
      { text: "Wah, semuanya putih.", correct: false }
    ],
    explanation: "Kalimat \"I feel sticky and hot.\" memiliki arti \"Aku merasa lengket dan panas.\"."
  },
  {
    id: 7,
    prompt: "Bagaimana cara mengatakan: \"Musim apa yang paling kamu suka?\"?",
    options: [
      { text: "The ocean is very blue today.", correct: false },
      { text: "It is so high and beautiful.", correct: false },
      { text: "Which season do you like best?", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Musim apa yang paling kamu suka?\" adalah \"Which season do you like best?\"."
  },
  {
    id: 8,
    prompt: "Lengkapi kalimat: \"A ___ is coming soon.\"\n(Arti: Badai akan segera datang.)",
    options: [
      { text: "at", correct: false },
      { text: "home", correct: false },
      { text: "storm", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'storm'."
  },
  {
    id: 9,
    prompt: "Apa arti dari kalimat: \"We should go home now.\"?",
    options: [
      { text: "Aku suka Musim Semi karena bunga-bunganya.", correct: false },
      { text: "Prakiraan bilang kemungkinannya 100%.", correct: false },
      { text: "Kita harus pulang sekarang.", correct: true }
    ],
    explanation: "Kalimat \"We should go home now.\" memiliki arti \"Kita harus pulang sekarang.\"."
  },
  {
    id: 10,
    prompt: "Bagaimana cara mengatakan: \"Lihat awan gelap itu.\"?",
    options: [
      { text: "Perfect for a walk.", correct: false },
      { text: "Look at those dark clouds.", correct: true },
      { text: "Autumn is a beautiful season.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Lihat awan gelap itu.\" adalah \"Look at those dark clouds.\"."
  },
  {
    id: 11,
    prompt: "Lengkapi kalimat: \"Wait, I need ___ first.\"\n(Arti: Tunggu, aku butuh tabir surya dulu.)",
    options: [
      { text: "a", correct: false },
      { text: "umbrella", correct: false },
      { text: "sunscreen", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'sunscreen'."
  },
  {
    id: 12,
    prompt: "Apa arti dari kalimat: \"I should bring an umbrella.\"?",
    options: [
      { text: "Lihat awan gelap itu.", correct: false },
      { text: "Saya harus bawa payung.", correct: true },
      { text: "Badai akan segera datang.", correct: false }
    ],
    explanation: "Kalimat \"I should bring an umbrella.\" memiliki arti \"Saya harus bawa payung.\"."
  },
  {
    id: 13,
    prompt: "Bagaimana cara mengatakan: \"Ayo kita berenang.\"?",
    options: [
      { text: "We should go home now.", correct: false },
      { text: "Me too. Let's go inside.", correct: false },
      { text: "Let's go for a swim.", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Ayo kita berenang.\" adalah \"Let's go for a swim.\"."
  },
  {
    id: 14,
    prompt: "Lengkapi kalimat: \"Do you think ___ will rain?\"\n(Arti: Apa menurutmu akan hujan?)",
    options: [
      { text: "flowers", correct: false },
      { text: "weather", correct: false },
      { text: "it", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'it'."
  },
  {
    id: 15,
    prompt: "Apa arti dari kalimat: \"What is the weather like?\"?",
    options: [
      { text: "Bagaimana cuacanya?", correct: true },
      { text: "Musim gugur adalah musim yang indah.", correct: false },
      { text: "Oke, aku ambil sarung tanganku.", correct: false }
    ],
    explanation: "Kalimat \"What is the weather like?\" memiliki arti \"Bagaimana cuacanya?\"."
  },
  {
    id: 16,
    prompt: "Bagaimana cara mengatakan: \"Aku suka Musim Semi karena bunga-bunganya.\"?",
    options: [
      { text: "I love Spring because of the flowers.", correct: true },
      { text: "I should bring an umbrella.", correct: false },
      { text: "It is so humid today.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Aku suka Musim Semi karena bunga-bunganya.\" adalah \"I love Spring because of the flowers.\"."
  },
  {
    id: 17,
    prompt: "Lengkapi kalimat: \"___, I am just happy looking.\"\n(Arti: Tidak, aku senang melihatnya saja.)",
    options: [
      { text: "rain", correct: false },
      { text: "Don't", correct: false },
      { text: "No", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'No'."
  },
  {
    id: 18,
    prompt: "Apa arti dari kalimat: \"Definitely. Don't get wet.\"?",
    options: [
      { text: "Pasti. Jangan sampai basah.", correct: true },
      { text: "Aku tahu. Suhunya minus 5 derajat.", correct: false },
      { text: "Ya, tapi musim dingin akan datang.", correct: false }
    ],
    explanation: "Kalimat \"Definitely. Don't get wet.\" memiliki arti \"Pasti. Jangan sampai basah.\"."
  },
  {
    id: 19,
    prompt: "Bagaimana cara mengatakan: \"Lari! Aku merasa hujan mulai turun.\"?",
    options: [
      { text: "Run! I feel the rain starting.", correct: true },
      { text: "Definitely. Don't get wet.", correct: false },
      { text: "It is so humid today.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Lari! Aku merasa hujan mulai turun.\" adalah \"Run! I feel the rain starting.\"."
  },
  {
    id: 20,
    prompt: "Lengkapi kalimat: \"It is snowing ___!\"\n(Arti: Di luar turun salju!)",
    options: [
      { text: "outside", correct: true },
      { text: "sunny", correct: false },
      { text: "Wow", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'outside'."
  }
];

const ElemSpeakingLesson9: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_speaking', 9);
  const nextLessonPath = '/modul/english/elementary/speaking/lesson-10';
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
      alert("Latihan Selesai! Tetap hangat (atau sejuk)!");
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
      lessonLabel={"Elementary Speaking Lesson 9"}
      accentColor={"#E74C3C"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Cuaca & Alam"
            subtitle="Speaking • Pelajaran 9"
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
                      className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Sun className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Prakiraan Cuaca</h2>
              <p className="text-sky-100 text-sm leading-relaxed mb-4">
                Belajar berbicara tentang hari cerah, badai, pemandangan indah, dan pergantian musim.
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
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentScenario.level === 'Formal' ? 'bg-indigo-50 text-indigo-600' : 'bg-sky-50 text-sky-600'}`}>
                {currentScenario.level}
              </div>
            </div>

            <div className="space-y-6">
              {currentScenario.dialogue.map((line, idx) => (
                <div key={idx} className={`flex gap-4 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-[var(--shadow-card)] ${line.speaker === 'A' ? 'bg-gray-100 text-[var(--color-text-secondary)]' : 'bg-sky-100 text-sky-600'
                    }`}>
                    {line.speaker}
                  </div>

                  {/* Bubble */}
                  <div className={`flex-1 max-w-[85%] group`}>
                    <div className={`p-4 rounded-2xl relative ${line.speaker === 'A'
                        ? 'bg-[var(--color-background)] text-[var(--color-text-primary)] rounded-tl-sm'
                        : 'bg-sky-50 text-sky-900 rounded-tr-sm'
                      }`}>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-[10px] font-bold opacity-50 uppercase tracking-wide">{line.name}</span>
                        <button
                          onClick={() => handlePlayAudio(line.text)}
                          className="text-[var(--color-text-muted)] hover:text-sky-600 transition-colors"
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
                      className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <div className="flex items-start gap-4">
              <CloudRain className="w-6 h-6 text-indigo-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-indigo-900 mb-2">Tips Pro: "How is" vs "What is... like"</h3>
                <p className="text-sm text-indigo-700 leading-relaxed">
                  Kamu bisa bilang <b>"How is the weather?"</b> ATAU <b>"What is the weather like?"</b>.<br />
                  TAPI jangan bilang "How is the weather like?". Itu salah.
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
                      className="bg-white rounded-[2rem] p-6 shadow-lg shadow-sky-900/5 border border-sky-100 relative overflow-hidden">
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-sky-100 p-2 rounded-xl text-sky-700">
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
                    className="h-full bg-sky-500 transition-all duration-300"
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
                  let btnClass = "border-[var(--color-border)] hover:border-sky-300 hover:bg-[var(--color-background)]";
                  if (isPracticeChecked) {
                    if (opt.correct) btnClass = "bg-green-50 border-sky-500 text-green-700";
                    else if (idx === selectedPracticeOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                    else btnClass = "opacity-50 border-[var(--color-border)]";
                  } else if (selectedPracticeOption === idx) {
                    btnClass = "border-sky-500 bg-sky-50 text-sky-700";
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
export default ElemSpeakingLesson9;
