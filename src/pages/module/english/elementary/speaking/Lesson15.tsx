import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, ClipboardList, Trophy, Star } from 'lucide-react';
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
  level: 'Mixed';
  dialogue: DialogueLine[];
};

const CONVERSATION_SCENARIOS: Scenario[] = [
  {
    id: 'c1',
    title: "Daily Routine (Review)",
    context: "Membicarakan kebiasaan pagi.",
    level: "Mixed",
    dialogue: [
      { speaker: 'A', name: 'Tom', text: "What time do you usually wake up?", translation: "Jam berapa biasanya kamu bangun?" },
      { speaker: 'B', name: 'Jerry', text: "I get up at 6:30 and have coffee.", translation: "Aku bangun jam 6:30 dan minum kopi." },
      { speaker: 'A', name: 'Tom', text: "Do you exercise in the morning?", translation: "Apa kamu olahraga pagi?" },
      { speaker: 'B', name: 'Jerry', text: "Yes, I go for a run before work.", translation: "Ya, aku lari pagi sebelum kerja." }
    ]
  },
  {
    id: 'c2',
    title: "Describing People (Review)",
    context: "Menanyakan rekan kerja baru.",
    level: "Mixed",
    dialogue: [
      { speaker: 'A', name: 'Sarah', text: "What is the new manager like?", translation: "Seperti apa manajer baru itu (sifatnya)?" },
      { speaker: 'B', name: 'Mike', text: "He is very friendly and hardworking.", translation: "Dia sangat ramah dan pekerja keras." },
      { speaker: 'A', name: 'Sarah', text: "What does he look like?", translation: "Seperti apa rupanya?" },
      { speaker: 'B', name: 'Mike', text: "He is tall and has glasses.", translation: "Dia tinggi dan berkacamata." }
    ]
  },
  {
    id: 'c3',
    title: "Job Interview (Review)",
    context: "Bicara tentang profesi.",
    level: "Mixed",
    dialogue: [
      { speaker: 'A', name: 'Interviewer', text: "What do you do?", translation: "Apa pekerjaan Anda?" },
      { speaker: 'B', name: 'Candidate', text: "I work as a software engineer.", translation: "Saya bekerja sebagai insinyur perangkat lunak." },
      { speaker: 'A', name: 'Interviewer', text: "Where did you work before?", translation: "Di mana Anda bekerja sebelumnya?" },
      { speaker: 'B', name: 'Candidate', text: "I worked for a tech company in London.", translation: "Saya bekerja untuk perusahaan teknologi di London." }
    ]
  },
  {
    id: 'c4',
    title: "Shopping (Review)",
    context: "Membeli pakaian.",
    level: "Mixed",
    dialogue: [
      { speaker: 'A', name: 'Customer', text: "How much is this jacket?", translation: "Berapa harga jaket ini?" },
      { speaker: 'B', name: 'Clerk', text: "It is $50. Would you like to try it on?", translation: "Harganya 50 dolar. Mau dicoba?" },
      { speaker: 'A', name: 'Customer', text: "Yes, please. Where is the fitting room?", translation: "Ya, tolong. Di mana kamar pas-nya?" },
      { speaker: 'B', name: 'Clerk', text: "It is over there, by the mirrors.", translation: "Di sebelah sana, dekat cermin." }
    ]
  },
  {
    id: 'c5',
    title: "Health (Review)",
    context: "Merasa tidak enak badan.",
    level: "Mixed",
    dialogue: [
      { speaker: 'A', name: 'Mom', text: "You look pale. What is wrong?", translation: "Kamu terlihat pucat. Ada apa?" },
      { speaker: 'B', name: 'Son', text: "I have a headache and a fever.", translation: "Aku sakit kepala dan demam." },
      { speaker: 'A', name: 'Mom', text: "You should see a doctor.", translation: "Kamu harus ke dokter." },
      { speaker: 'B', name: 'Son', text: "I think I just need some rest.", translation: "Sepertinya aku cuma butuh istirahat." }
    ]
  },
  {
    id: 'c6',
    title: "Travel (Review)",
    context: "Di stasiun kereta.",
    level: "Mixed",
    dialogue: [
      { speaker: 'A', name: 'Traveler', text: "One ticket to Paris, please.", translation: "Satu tiket ke Paris, tolong." },
      { speaker: 'B', name: 'Agent', text: "Single or return?", translation: "Sekali jalan atau pulang pergi?" },
      { speaker: 'A', name: 'Traveler', text: "Return, please. When is the next train?", translation: "Pulang pergi. Kapan kereta selanjutnya?" },
      { speaker: 'B', name: 'Agent', text: "It leaves in ten minutes from Platform 5.", translation: "Berangkat sepuluh menit lagi dari Peron 5." }
    ]
  },
  {
    id: 'c7',
    title: "Weather (Review)",
    context: "Merencanakan perjalanan.",
    level: "Mixed",
    dialogue: [
      { speaker: 'A', name: 'Anna', text: "What is the weather like today?", translation: "Bagaimana cuaca hari ini?" },
      { speaker: 'B', name: 'Ben', text: "It is sunny but windy.", translation: "Cerah tapi berangin." },
      { speaker: 'A', name: 'Anna', text: "Should I take a coat?", translation: "Haruskah aku bawa mantel?" },
      { speaker: 'B', name: 'Ben', text: "Yes, it might get cold later.", translation: "Ya, nanti mungkin jadi dingin." }
    ]
  },
  {
    id: 'c8',
    title: "Hobbies (Review)",
    context: "Aktivitas waktu luang.",
    level: "Mixed",
    dialogue: [
      { speaker: 'A', name: 'Sam', text: "Do you play any sports?", translation: "Apa kamu main olahraga?" },
      { speaker: 'B', name: 'Mia', text: "I play tennis on weekends.", translation: "Saya main tenis di akhir pekan." },
      { speaker: 'A', name: 'Sam', text: "I prefer watching movies.", translation: "Saya lebih suka nonton film." },
      { speaker: 'B', name: 'Mia', text: "That is relaxing too.", translation: "Itu juga menenangkan." }
    ]
  },
  {
    id: 'c9',
    title: "Technology (Review)",
    context: "Masalah dengan ponsel.",
    level: "Mixed",
    dialogue: [
      { speaker: 'A', name: 'User', text: "My phone battery is low.", translation: "Baterai HP-ku lemah." },
      { speaker: 'B', name: 'Friend', text: "Do you have a charger?", translation: "Kamu punya charger?" },
      { speaker: 'A', name: 'User', text: "No, I forgot it at home.", translation: "Tidak, ketinggalan di rumah." },
      { speaker: 'B', name: 'Friend', text: "Use mine. It is in my bag.", translation: "Pakai punyaku. Ada di tasku." }
    ]
  },
  {
    id: 'c10',
    title: "Invitations (Review)",
    context: "Rencana sosial.",
    level: "Mixed",
    dialogue: [
      { speaker: 'A', name: 'Host', text: "Would you like to come to dinner?", translation: "Maukah kamu datang makan malam?" },
      { speaker: 'B', name: 'Guest', text: "I'd love to. What time?", translation: "Aku mau banget. Jam berapa?" },
      { speaker: 'A', name: 'Host', text: "Around 7 PM on Friday.", translation: "Sekitar jam 7 malam hari Jumat." },
      { speaker: 'B', name: 'Guest', text: "Perfect. See you then.", translation: "Sempurna. Sampai jumpa nanti." }
    ]
  }
];

const PRACTICE_QUESTIONS = [
{
    id: 1,
    prompt: "I work ___ a doctor.",
    options: [
      { text: "in", correct: false },
      { text: "for", correct: false },
      { text: "as", correct: true }
    ],
    explanation: "Gunakan 'as' (sebagai) untuk profesi."
  },
  {
    id: 2,
    prompt: "She ___ blue eyes and long hair.",
    options: [
      { text: "has", correct: true },
      { text: "have", correct: false },
      { text: "is", correct: false }
    ],
    explanation: "Gunakan 'has' (memiliki) untuk ciri fisik."
  },
  {
    id: 3,
    prompt: "It is raining. Take an ___.",
    options: [
      { text: "sunglasses", correct: false },
      { text: "screen", correct: false },
      { text: "umbrella", correct: true }
    ],
    explanation: "Umbrella (payung) melindungi dari hujan."
  },
  {
    id: 4,
    prompt: "I usually ___ breakfast at 7 AM.",
    options: [
      { text: "have", correct: true },
      { text: "make to", correct: false },
      { text: "do", correct: false }
    ],
    explanation: "Gunakan 'have' untuk makan (have breakfast = sarapan)."
  },
  {
    id: 5,
    prompt: "The flight is ___. It will be late.",
    options: [
      { text: "arrived", correct: false },
      { text: "delayed", correct: true },
      { text: "boarding", correct: false }
    ],
    explanation: "Delayed berarti terlambat."
  },
  {
    id: 6,
    prompt: "Apa arti dari kalimat: \"I have a headache and a fever.\"?",
    options: [
      { text: "Aku sakit kepala dan demam.", correct: true },
      { text: "Dia tinggi dan berkacamata.", correct: false },
      { text: "Apa kamu main olahraga?", correct: false }
    ],
    explanation: "Kalimat \"I have a headache and a fever.\" memiliki arti \"Aku sakit kepala dan demam.\"."
  },
  {
    id: 7,
    prompt: "Bagaimana cara mengatakan: \"Sempurna. Sampai jumpa nanti.\"?",
    options: [
      { text: "Perfect. See you then.", correct: true },
      { text: "You should see a doctor.", correct: false },
      { text: "Would you like to come to dinner?", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Sempurna. Sampai jumpa nanti.\" adalah \"Perfect. See you then.\"."
  },
  {
    id: 8,
    prompt: "Lengkapi kalimat: \"It is ___. Would you like to try it on?\"\n(Arti: Harganya 50 dolar. Mau dicoba?)",
    options: [
      { text: "forgot", correct: false },
      { text: "$50", correct: true },
      { text: "I", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah '$50'."
  },
  {
    id: 9,
    prompt: "Apa arti dari kalimat: \"I get up at 6:30 and have coffee.\"?",
    options: [
      { text: "Aku bangun jam 6:30 dan minum kopi.", correct: true },
      { text: "Harganya 50 dolar. Mau dicoba?", correct: false },
      { text: "Kamu punya charger?", correct: false }
    ],
    explanation: "Kalimat \"I get up at 6:30 and have coffee.\" memiliki arti \"Aku bangun jam 6:30 dan minum kopi.\"."
  },
  {
    id: 10,
    prompt: "Bagaimana cara mengatakan: \"Tidak, ketinggalan di rumah.\"?",
    options: [
      { text: "No, I forgot it at home.", correct: true },
      { text: "Yes, I go for a run before work.", correct: false },
      { text: "Around 7 PM on Friday.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Tidak, ketinggalan di rumah.\" adalah \"No, I forgot it at home.\"."
  },
  {
    id: 11,
    prompt: "Lengkapi kalimat: \"He is tall ___ has glasses.\"\n(Arti: Dia tinggi dan berkacamata.)",
    options: [
      { text: "What", correct: false },
      { text: "and", correct: true },
      { text: "before", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'and'."
  },
  {
    id: 12,
    prompt: "Apa arti dari kalimat: \"Yes, I go for a run before work.\"?",
    options: [
      { text: "Dia sangat ramah dan pekerja keras.", correct: false },
      { text: "Haruskah aku bawa mantel?", correct: false },
      { text: "Ya, aku lari pagi sebelum kerja.", correct: true }
    ],
    explanation: "Kalimat \"Yes, I go for a run before work.\" memiliki arti \"Ya, aku lari pagi sebelum kerja.\"."
  },
  {
    id: 13,
    prompt: "Bagaimana cara mengatakan: \"Seperti apa rupanya?\"?",
    options: [
      { text: "Single or return?", correct: false },
      { text: "What does he look like?", correct: true },
      { text: "Do you have a charger?", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Seperti apa rupanya?\" adalah \"What does he look like?\"."
  },
  {
    id: 14,
    prompt: "Lengkapi kalimat: \"Around 7 PM on ___.\"\n(Arti: Sekitar jam 7 malam hari Jumat.)",
    options: [
      { text: "Should", correct: false },
      { text: "Friday", correct: true },
      { text: "get", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'Friday'."
  },
  {
    id: 15,
    prompt: "Apa arti dari kalimat: \"Yes, it might get cold later.\"?",
    options: [
      { text: "Ya, nanti mungkin jadi dingin.", correct: true },
      { text: "Berangkat sepuluh menit lagi dari Peron 5.", correct: false },
      { text: "Baterai HP-ku lemah.", correct: false }
    ],
    explanation: "Kalimat \"Yes, it might get cold later.\" memiliki arti \"Ya, nanti mungkin jadi dingin.\"."
  },
  {
    id: 16,
    prompt: "Bagaimana cara mengatakan: \"Haruskah aku bawa mantel?\"?",
    options: [
      { text: "Perfect. See you then.", correct: false },
      { text: "He is tall and has glasses.", correct: false },
      { text: "Should I take a coat?", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Haruskah aku bawa mantel?\" adalah \"Should I take a coat?\"."
  },
  {
    id: 17,
    prompt: "Lengkapi kalimat: \"He is very friendly and ___.\"\n(Arti: Dia sangat ramah dan pekerja keras.)",
    options: [
      { text: "weekends", correct: false },
      { text: "hardworking", correct: true },
      { text: "phone", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'hardworking'."
  },
  {
    id: 18,
    prompt: "Apa arti dari kalimat: \"My phone battery is low.\"?",
    options: [
      { text: "Sekitar jam 7 malam hari Jumat.", correct: false },
      { text: "Kamu punya charger?", correct: false },
      { text: "Baterai HP-ku lemah.", correct: true }
    ],
    explanation: "Kalimat \"My phone battery is low.\" memiliki arti \"Baterai HP-ku lemah.\"."
  },
  {
    id: 19,
    prompt: "Bagaimana cara mengatakan: \"Saya main tenis di akhir pekan.\"?",
    options: [
      { text: "I play tennis on weekends.", correct: true },
      { text: "One ticket to Paris, please.", correct: false },
      { text: "I think I just need some rest.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Saya main tenis di akhir pekan.\" adalah \"I play tennis on weekends.\"."
  },
  {
    id: 20,
    prompt: "Lengkapi kalimat: \"Do you play ___ sports?\"\n(Arti: Apa kamu main olahraga?)",
    options: [
      { text: "any", correct: true },
      { text: "London", correct: false },
      { text: "too", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'any'."
  }
];

const ElemSpeakingLesson15: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_speaking', 15);
  const nextLessonPath = undefined;
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
      alert("Kursus Selesai! Kamu telah menyelesaikan Elementary Speaking.");
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
      lessonLabel={"Elementary Speaking Lesson 15"}
      accentColor={"#E74C3C"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Tinjaun & Latihan"
            subtitle="Speaking • Pelajaran 15"
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
                      className="bg-gradient-to-br from-slate-700 to-gray-800 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Trophy className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Tinjauan Akhir</h2>
              <p className="text-slate-200 text-sm leading-relaxed mb-4">
                Selamat sudah mencapai akhir modul Elementary Speaking! Ayo tinjau semuanya mulai dari rutinitas harian hingga perjalanan dan kesehatan.
              </p>
              <div className="flex gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">40 Baris</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">10 Skenario</span>
              </div>
            </div>
          </motion.section>

          {/* Scenario Selector */}
          <section>
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 px-1">Pilih Topik</h3>
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
              <div className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-[var(--color-text-secondary)]">
                {currentScenario.level}
              </div>
            </div>

            <div className="space-y-6">
              {currentScenario.dialogue.map((line, idx) => (
                <div key={idx} className={`flex gap-4 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-[var(--shadow-card)] ${line.speaker === 'A' ? 'bg-orange-100 text-orange-600' : 'bg-slate-200 text-[var(--color-text-secondary)]'
                    }`}>
                    {line.speaker}
                  </div>

                  {/* Bubble */}
                  <div className={`flex-1 max-w-[85%] group`}>
                    <div className={`p-4 rounded-2xl relative ${line.speaker === 'A'
                        ? 'bg-white border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-tl-sm shadow-[var(--shadow-card)]'
                        : 'bg-[var(--color-background)] text-slate-900 rounded-tr-sm'
                      }`}>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-[10px] font-bold opacity-50 uppercase tracking-wide">{line.name}</span>
                        <button
                          onClick={() => handlePlayAudio(line.text)}
                          className="text-[var(--color-text-muted)] hover:text-orange-600 transition-colors"
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
                      className="bg-gray-100 rounded-2xl p-6 border border-[var(--color-border)]">
            <div className="flex items-start gap-4">
              <Star className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[var(--color-text-primary)] mb-2">Kerja Bagus!</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Kamu telah menyelesaikan modul Elementary Speaking. Teruslah berlatih frasa-frasa ini di kehidupan nyata untuk meningkatkan kelancaranmu!
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
                      className="bg-white rounded-[2rem] p-6 shadow-lg shadow-orange-900/5 border border-orange-100 relative overflow-hidden">
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-100 p-2 rounded-xl text-orange-700">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Penilaian Akhir</h2>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-xs font-bold text-[var(--color-text-muted)] mb-2 uppercase tracking-wide">
                  <span>Pertanyaan {practiceStep + 1} dari {PRACTICE_QUESTIONS.length}</span>
                  <span>Progres</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 transition-all duration-300"
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
                  let btnClass = "border-[var(--color-border)] hover:border-orange-300 hover:bg-[var(--color-background)]";
                  if (isPracticeChecked) {
                    if (opt.correct) btnClass = "bg-green-50 border-sky-500 text-green-700";
                    else if (idx === selectedPracticeOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                    else btnClass = "opacity-50 border-[var(--color-border)]";
                  } else if (selectedPracticeOption === idx) {
                    btnClass = "border-orange-500 bg-orange-50 text-orange-700";
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
                    Pertanyaan Berikutnya
                  </button>
                </div>
              )}
            </div>
          </motion.section>


        </div>
      </div>
    ) : null}</LessonShell>
    </>);};
export default ElemSpeakingLesson15;