import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, Heart, Flame } from 'lucide-react';
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
    title: "Feeling Sick",
    context: "Merasa sakit.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tom', text: "You look tired. Are you okay?", translation: "Kamu terlihat lelah. Kamu baik-baik saja?" },
      { speaker: 'B', name: 'Jerry', text: "No, I have a terrible headache.", translation: "Tidak, saya sakit kepala parah." },
      { speaker: 'A', name: 'Tom', text: "You should take some medicine.", translation: "Kamu harus minum obat." },
      { speaker: 'B', name: 'Jerry', text: "I did, but it still hurts.", translation: "Sudah, tapi masih sakit." }
    ]
  },
  {
    id: 'c2',
    title: "Healthy Eating",
    context: "Membahas pilihan makan siang.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Sarah', text: "I am going to have a salad.", translation: "Saya mau makan salad." },
      { speaker: 'B', name: 'Mike', text: "Just a salad? Is that enough?", translation: "Cuma salad? Apa itu cukup?" },
      { speaker: 'A', name: 'Sarah', text: "I am trying to eat healthy.", translation: "Saya mencoba makan sehat." },
      { speaker: 'B', name: 'Mike', text: "Good for you. I want a burger.", translation: "Baguslah. Saya mau burger." }
    ]
  },
  {
    id: 'c3',
    title: "Doctor's Appointment",
    context: "Menjelaskan gejala.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Doctor', text: "What seems to be the problem?", translation: "Apa keluhannya?" },
      { speaker: 'B', name: 'Patient', text: "I have a sore throat and a fever.", translation: "Saya sakit tenggorokan dan demam." },
      { speaker: 'A', name: 'Doctor', text: "How long have you felt this way?", translation: "Sudah berapa lama Anda merasa begini?" },
      { speaker: 'B', name: 'Patient', text: "Since yesterday morning.", translation: "Sejak kemarin pagi." }
    ]
  },
  {
    id: 'c4',
    title: "Food Allergies",
    context: "Memesan di restoran.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Diner', text: "Does this cake contain nuts?", translation: "Apakah kue ini mengandung kacang?" },
      { speaker: 'B', name: 'Waiter', text: "Yes, it has almonds inside.", translation: "Ya, ada almond di dalamnya." },
      { speaker: 'A', name: 'Diner', text: "I cannot eat it. I am allergic.", translation: "Saya tidak bisa memakannya. Saya alergi." },
      { speaker: 'B', name: 'Waiter', text: "I will bring you the fruit tart instead.", translation: "Saya akan bawakan kue buah saja." }
    ]
  },
  {
    id: 'c5',
    title: "Cooking Together",
    context: "Memberi instruksi.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Mom', text: "Can you chop the onions?", translation: "Bisakah kamu memotong bawang?" },
      { speaker: 'B', name: 'Son', text: "Sure. How small should I cut them?", translation: "Tentu. Seberapa kecil harus kupotong?" },
      { speaker: 'A', name: 'Mom', text: "Very small pieces, please.", translation: "Potongan sangat kecil, tolong." },
      { speaker: 'B', name: 'Son', text: "Okay, I am doing it now.", translation: "Oke, saya kerjakan sekarang." }
    ]
  },
  {
    id: 'c6',
    title: "At the Pharmacy",
    context: "Membeli obat.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Customer', text: "Do you have anything for a cold?", translation: "Ada obat untuk pilek?" },
      { speaker: 'B', name: 'Pharmacist', text: "Yes, these tablets are very good.", translation: "Ya, tablet ini sangat bagus." },
      { speaker: 'A', name: 'Customer', text: "Do I take them with food?", translation: "Apakah saya meminumnya dengan makanan?" },
      { speaker: 'B', name: 'Pharmacist', text: "Yes, take one after every meal.", translation: "Ya, minum satu setiap habis makan." }
    ]
  },
  {
    id: 'c7',
    title: "Calling in Sick",
    context: "Telepon ke bos.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Employee', text: "Hello, I cannot come to work today.", translation: "Halo, saya tidak bisa masuk kerja hari ini." },
      { speaker: 'B', name: 'Boss', text: "Oh no. What is wrong?", translation: "Oh tidak. Ada apa?" },
      { speaker: 'A', name: 'Employee', text: "I have a bad stomachache.", translation: "Saya sakit perut parah." },
      { speaker: 'B', name: 'Boss', text: "Rest well. Get better soon.", translation: "Istirahatlah. Semoga cepat sembuh." }
    ]
  },
  {
    id: 'c8',
    title: "Gym Routine",
    context: "Bicara tentang olahraga.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Jim', text: "Do you go to the gym often?", translation: "Apa kamu sering ke gym?" },
      { speaker: 'B', name: 'Bob', text: "I try to go three times a week.", translation: "Saya coba pergi tiga kali seminggu." },
      { speaker: 'A', name: 'Jim', text: "What do you do there?", translation: "Apa yang kamu lakukan di sana?" },
      { speaker: 'B', name: 'Bob', text: "Mostly running and lifting weights.", translation: "Kebanyakan lari dan angkat beban." }
    ]
  },
  {
    id: 'c9',
    title: "Favorite Fruit",
    context: "Membahas kesukaan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Anna', text: "Do you like tropical fruits?", translation: "Apa kamu suka buah tropis?" },
      { speaker: 'B', name: 'Ben', text: "Yes, I love mangoes and pineapples.", translation: "Ya, saya suka mangga dan nanas." },
      { speaker: 'A', name: 'Anna', text: "Me too. They are so sweet.", translation: "Saya juga. Rasanya manis sekali." },
      { speaker: 'B', name: 'Ben', text: "We should make a fruit salad.", translation: "Kita harus membuat salad buah." }
    ]
  },
  {
    id: 'c10',
    title: "Dentist Visit",
    context: "Sakit gigi.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Dentist', text: "Open your mouth wide, please.", translation: "Buka mulut Anda lebar-lebar." },
      { speaker: 'B', name: 'Patient', text: "Ahhh. My back tooth hurts.", translation: "Ahhh. Gigi belakang saya sakit." },
      { speaker: 'A', name: 'Dentist', text: "I see a small cavity there.", translation: "Saya lihat ada lubang kecil di sana." },
      { speaker: 'B', name: 'Patient', text: "Can you fix it today?", translation: "Bisakah Anda memperbaikinya hari ini?" }
    ]
  }
];

const PRACTICE_QUESTIONS = [
{
    id: 1,
    prompt: "I have a pain in my head. I have a ___.",
    options: [
      { text: "stomachache", correct: false },
      { text: "headache", correct: true },
      { text: "backache", correct: false }
    ],
    explanation: "'Pain in the head' (sakit di kepala) disebut 'headache' (sakit kepala)."
  },
  {
    id: 2,
    prompt: "You look sick. You ___ go to the doctor.",
    options: [
      { text: "should", correct: true },
      { text: "want", correct: false },
      { text: "like", correct: false }
    ],
    explanation: "Kita, menggunakan 'should' untuk memberi saran."
  },
  {
    id: 3,
    prompt: "To make water hot for tea, you ___ it.",
    options: [
      { text: "fry", correct: false },
      { text: "boil", correct: true },
      { text: "bake", correct: false }
    ],
    explanation: "'Boiling' (merebus) adalah memanaskan cairan sampai berbuih."
  },
  {
    id: 4,
    prompt: "I eat vegetables because they are ___.",
    options: [
      { text: "healthy", correct: true },
      { text: "sick", correct: false },
      { text: "painful", correct: false }
    ],
    explanation: "'Healthy' (sehat) berarti baik untuk tubuhmu."
  },
  {
    id: 5,
    prompt: "My body temperature is high. I have a ___.",
    options: [
      { text: "cold", correct: false },
      { text: "fever", correct: true },
      { text: "cough", correct: false }
    ],
    explanation: "'Fever' (demam) adalah saat tubuhmu terlalu panas."
  },
  {
    id: 6,
    prompt: "Apa arti dari kalimat: \"What do you do there?\"?",
    options: [
      { text: "Apa yang kamu lakukan di sana?", correct: true },
      { text: "Apa kamu sering ke gym?", correct: false },
      { text: "Oke, saya kerjakan sekarang.", correct: false }
    ],
    explanation: "Kalimat \"What do you do there?\" memiliki arti \"Apa yang kamu lakukan di sana?\"."
  },
  {
    id: 7,
    prompt: "Bagaimana cara mengatakan: \"Istirahatlah. Semoga cepat sembuh.\"?",
    options: [
      { text: "Do I take them with food?", correct: false },
      { text: "I try to go three times a week.", correct: false },
      { text: "Rest well. Get better soon.", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Istirahatlah. Semoga cepat sembuh.\" adalah \"Rest well. Get better soon.\"."
  },
  {
    id: 8,
    prompt: "Lengkapi kalimat: \"Okay, I am doing ___ now.\"\n(Arti: Oke, saya kerjakan sekarang.)",
    options: [
      { text: "will", correct: false },
      { text: "it", correct: true },
      { text: "lifting", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'it'."
  },
  {
    id: 9,
    prompt: "Apa arti dari kalimat: \"I will bring you the fruit tart instead.\"?",
    options: [
      { text: "Saya akan bawakan kue buah saja.", correct: true },
      { text: "Saya sakit tenggorokan dan demam.", correct: false },
      { text: "Apa yang kamu lakukan di sana?", correct: false }
    ],
    explanation: "Kalimat \"I will bring you the fruit tart instead.\" memiliki arti \"Saya akan bawakan kue buah saja.\"."
  },
  {
    id: 10,
    prompt: "Bagaimana cara mengatakan: \"Kebanyakan lari dan angkat beban.\"?",
    options: [
      { text: "You should take some medicine.", correct: false },
      { text: "Ahhh. My back tooth hurts.", correct: false },
      { text: "Mostly running and lifting weights.", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Kebanyakan lari dan angkat beban.\" adalah \"Mostly running and lifting weights.\"."
  },
  {
    id: 11,
    prompt: "Lengkapi kalimat: \"Ahhh. ___ back tooth hurts.\"\n(Arti: Ahhh. Gigi belakang saya sakit.)",
    options: [
      { text: "My", correct: true },
      { text: "long", correct: false },
      { text: "fix", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'My'."
  },
  {
    id: 12,
    prompt: "Apa arti dari kalimat: \"How long have you felt this way?\"?",
    options: [
      { text: "Sudah berapa lama Anda merasa begini?", correct: true },
      { text: "Apakah saya meminumnya dengan makanan?", correct: false },
      { text: "Ya, saya suka mangga dan nanas.", correct: false }
    ],
    explanation: "Kalimat \"How long have you felt this way?\" memiliki arti \"Sudah berapa lama Anda merasa begini?\"."
  },
  {
    id: 13,
    prompt: "Bagaimana cara mengatakan: \"Bisakah Anda memperbaikinya hari ini?\"?",
    options: [
      { text: "Can you fix it today?", correct: true },
      { text: "I will bring you the fruit tart instead.", correct: false },
      { text: "I try to go three times a week.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Bisakah Anda memperbaikinya hari ini?\" adalah \"Can you fix it today?\"."
  },
  {
    id: 14,
    prompt: "Lengkapi kalimat: \"I try to ___ three times a week.\"\n(Arti: Saya coba pergi tiga kali seminggu.)",
    options: [
      { text: "allergic", correct: false },
      { text: "go", correct: true },
      { text: "to", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'go'."
  },
  {
    id: 15,
    prompt: "Apa arti dari kalimat: \"I cannot eat it. I am allergic.\"?",
    options: [
      { text: "Saya tidak bisa memakannya. Saya alergi.", correct: true },
      { text: "Oh tidak. Ada apa?", correct: false },
      { text: "Kamu terlihat lelah. Kamu baik-baik saja?", correct: false }
    ],
    explanation: "Kalimat \"I cannot eat it. I am allergic.\" memiliki arti \"Saya tidak bisa memakannya. Saya alergi.\"."
  },
  {
    id: 16,
    prompt: "Bagaimana cara mengatakan: \"Apa kamu sering ke gym?\"?",
    options: [
      { text: "You look tired. Are you okay?", correct: false },
      { text: "Do you go to the gym often?", correct: true },
      { text: "Mostly running and lifting weights.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Apa kamu sering ke gym?\" adalah \"Do you go to the gym often?\"."
  },
  {
    id: 17,
    prompt: "Lengkapi kalimat: \"Do ___ like tropical fruits?\"\n(Arti: Apa kamu suka buah tropis?)",
    options: [
      { text: "you", correct: true },
      { text: "medicine", correct: false },
      { text: "Yes", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'you'."
  },
  {
    id: 18,
    prompt: "Apa arti dari kalimat: \"You should take some medicine.\"?",
    options: [
      { text: "Ya, ada almond di dalamnya.", correct: false },
      { text: "Kamu harus minum obat.", correct: true },
      { text: "Oke, saya kerjakan sekarang.", correct: false }
    ],
    explanation: "Kalimat \"You should take some medicine.\" memiliki arti \"Kamu harus minum obat.\"."
  },
  {
    id: 19,
    prompt: "Bagaimana cara mengatakan: \"Ya, ada almond di dalamnya.\"?",
    options: [
      { text: "Yes, it has almonds inside.", correct: true },
      { text: "Can you chop the onions?", correct: false },
      { text: "Yes, I love mangoes and pineapples.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Ya, ada almond di dalamnya.\" adalah \"Yes, it has almonds inside.\"."
  },
  {
    id: 20,
    prompt: "Lengkapi kalimat: \"Very small pieces, ___.\"\n(Arti: Potongan sangat kecil, tolong.)",
    options: [
      { text: "please", correct: true },
      { text: "small", correct: false },
      { text: "I", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'please'."
  }
];

const ElemSpeakingLesson7: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_speaking', 7);
  const nextLessonPath = '/modul/english/elementary/speaking/lesson-8';
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
      alert("Latihan Selesai! Tetap sehat.");
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
      lessonLabel={"Elementary Speaking Lesson 7"}
      accentColor={"#E74C3C"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Dapur & Kesehatan"
            subtitle="Speaking • Pelajaran 7"
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
              <Heart className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Hidup Sehat</h2>
              <p className="text-emerald-100 text-sm leading-relaxed mb-4">
                Belajar berbicara tentang sakit, ke dokter, memesan makanan sehat, dan memasak.
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
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentScenario.level === 'Formal' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {currentScenario.level}
              </div>
            </div>

            <div className="space-y-6">
              {currentScenario.dialogue.map((line, idx) => (
                <div key={idx} className={`flex gap-4 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-[var(--shadow-card)] ${line.speaker === 'A' ? 'bg-gray-100 text-[var(--color-text-secondary)]' : 'bg-emerald-100 text-emerald-600'
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
                      className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
            <div className="flex items-start gap-4">
              <Flame className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-orange-900 mb-2">Tips Pro: "I have..."</h3>
                <p className="text-sm text-orange-700 leading-relaxed">
                  Gunakan <b>"I have..."</b> untuk penyakit dan gejala.<br />
                  <i>"I have a cold."</i> (Saya pilek)<br />
                  <i>"I have a fever."</i> (Saya demam)<br />
                  Jangan bilang "I am a cold".
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
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

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
export default ElemSpeakingLesson7;