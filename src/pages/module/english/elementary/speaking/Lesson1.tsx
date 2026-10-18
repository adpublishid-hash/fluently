import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, Info, Clock } from 'lucide-react';
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
    title: "Waking Up & Alarm",
    context: "Membahas bangun terlambat.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tom', text: "Did your alarm go off this morning?", translation: "Apakah alarmmu berbunyi pagi ini?" },
      { speaker: 'B', name: 'Jerry', text: "Yes, but I hit snooze three times.", translation: "Ya, tapi aku tekan tombol tunda tiga kali." },
      { speaker: 'A', name: 'Tom', text: "You will be late for work!", translation: "Kamu akan terlambat kerja!" },
      { speaker: 'B', name: 'Jerry', text: "I know. I need to get ready fast.", translation: "Aku tahu. Aku harus bersiap cepat-cepat." }
    ]
  },
  {
    id: 'c2',
    title: "Morning Coffee Run",
    context: "Terburu-buru di pagi hari.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Sarah', text: "Do you have time for coffee?", translation: "Apa kamu punya waktu untuk ngopi?" },
      { speaker: 'B', name: 'Mike', text: "No, I am running really late.", translation: "Tidak, aku sangat terlambat." },
      { speaker: 'A', name: 'Sarah', text: "I can make it to-go for you.", translation: "Aku bisa buatkan untuk dibawa." },
      { speaker: 'B', name: 'Mike', text: "That would be amazing. Thanks!", translation: "Itu akan sangat membantu. Terima kasih!" }
    ]
  },
  {
    id: 'c3',
    title: "The Commute",
    context: "Membicarakan lalu lintas.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Colleague', text: "How do you usually get to the office?", translation: "Biasanya naik apa ke kantor?" },
      { speaker: 'B', name: 'You', text: "I take the subway to avoid traffic.", translation: "Saya naik kereta bawah tanah untuk menghindari macet." },
      { speaker: 'A', name: 'Colleague', text: "Is it crowded in the morning?", translation: "Apakah ramai di pagi hari?" },
      { speaker: 'B', name: 'You', text: "Yes, it is packed. I rarely get a seat.", translation: "Ya, padat sekali. Saya jarang dapat tempat duduk." }
    ]
  },
  {
    id: 'c4',
    title: "Arriving at Work",
    context: "Memulai hari kerja.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Boss', text: "Good morning. Have you checked your email?", translation: "Selamat pagi. Sudah cek email Anda?" },
      { speaker: 'B', name: 'Employee', text: "Not yet. I just arrived at my desk.", translation: "Belum. Saya baru saja sampai di meja saya." },
      { speaker: 'A', name: 'Boss', text: "We have a team meeting at 10 AM.", translation: "Kita ada rapat tim jam 10 pagi." },
      { speaker: 'B', name: 'Employee', text: "Okay, I will prepare the presentation now.", translation: "Baik, saya akan siapkan presentasinya sekarang." }
    ]
  },
  {
    id: 'c5',
    title: "Lunch Break Routine",
    context: "Membahas kebiasaan makan siang.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Anna', text: "Where do you usually eat lunch?", translation: "Biasanya makan siang di mana?" },
      { speaker: 'B', name: 'Ben', text: "I usually bring a packed lunch from home.", translation: "Saya biasanya bawa bekal dari rumah." },
      { speaker: 'A', name: 'Anna', text: "That is healthy and saves money.", translation: "Itu sehat dan hemat uang." },
      { speaker: 'B', name: 'Ben', text: "Exactly. Do you want to eat together?", translation: "Tepat sekali. Mau makan bareng?" }
    ]
  },
  {
    id: 'c6',
    title: "Housework & Chores",
    context: "Membagi tugas di rumah.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Mom', text: "It is your turn to do the dishes.", translation: "Giliranmu mencuci piring." },
      { speaker: 'B', name: 'Son', text: "I know, but I am so tired right now.", translation: "Aku tahu, tapi aku capek sekali sekarang." },
      { speaker: 'A', name: 'Mom', text: "If you wash, I will dry them.", translation: "Kalau kamu mencuci, ibu yang mengeringkan." },
      { speaker: 'B', name: 'Son', text: "Deal. Let's finish it quickly.", translation: "Setuju. Ayo selesaikan dengan cepat." }
    ]
  },
  {
    id: 'c7',
    title: "Evening Relaxation",
    context: "Bersantai setelah kerja.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend 1', text: "How do you unwind after work?", translation: "Gimana caramu santai pulang kerja?" },
      { speaker: 'B', name: 'Friend 2', text: "I usually go for a run or read a book.", translation: "Biasanya aku lari atau baca buku." },
      { speaker: 'A', name: 'Friend 1', text: "I prefer watching Netflix on the sofa.", translation: "Aku lebih suka nonton Netflix di sofa." },
      { speaker: 'B', name: 'Friend 2', text: "That is also a good way to relax.", translation: "Itu juga cara bagus untuk bersantai." }
    ]
  },
  {
    id: 'c8',
    title: "Grocery Shopping",
    context: "Mengecek kebutuhan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Wife', text: "Do we need anything from the store?", translation: "Apa kita butuh sesuatu dari toko?" },
      { speaker: 'B', name: 'Husband', text: "We are out of milk and eggs.", translation: "Susu dan telur kita habis." },
      { speaker: 'A', name: 'Wife', text: "Okay, I will stop by the supermarket.", translation: "Oke, aku mampir ke supermarket." },
      { speaker: 'B', name: 'Husband', text: "Don't forget to buy bread too.", translation: "Jangan lupa beli roti juga." }
    ]
  },
  {
    id: 'c9',
    title: "Weekend Plans",
    context: "Membicarakan rutinitas Sabtu.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Sam', text: "Do you have any plans for Saturday?", translation: "Ada rencana hari Sabtu?" },
      { speaker: 'B', name: 'Lily', text: "I usually clean the house in the morning.", translation: "Aku biasanya bersihin rumah pagi-pagi." },
      { speaker: 'A', name: 'Sam', text: "Boring! Let's go to the park instead.", translation: "Membosankan! Ayo ke taman saja." },
      { speaker: 'B', name: 'Lily', text: "Maybe in the afternoon. I have chores.", translation: "Mungkin sore. Aku ada tugas rumah." }
    ]
  },
  {
    id: 'c10',
    title: "Late Night",
    context: "Begadang terlalu larut.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Dad', text: "Why are you still awake? It is midnight.", translation: "Kenapa masih bangun? Sudah tengah malam." },
      { speaker: 'B', name: 'Kid', text: "I can't sleep. I drank coffee too late.", translation: "Gak bisa tidur. Aku minum kopi kemalaman." },
      { speaker: 'A', name: 'Dad', text: "You should drink herbal tea next time.", translation: "Harusnya minum teh herbal lain kali." },
      { speaker: 'B', name: 'Kid', text: "Good idea. Good night, Dad.", translation: "Ide bagus. Selamat tidur, Yah." }
    ]
  }
];

const PRACTICE_QUESTIONS = [
{
    id: 1,
    prompt: "I hit the ___ button because I wanted to sleep more.",
    options: [
      { text: "snooze", correct: true },
      { text: "stop", correct: false },
      { text: "start", correct: false }
    ],
    explanation: "Tombol 'snooze' pada jam alarm membiarkanmu tidur beberapa menit lagi."
  },
  {
    id: 2,
    prompt: "I take the subway to avoid ___.",
    options: [
      { text: "people", correct: false },
      { text: "walking", correct: false },
      { text: "traffic", correct: true }
    ],
    explanation: "Kereta bawah tanah berjalan di bawah tanah, jadi menghindari macet jalan raya."
  },
  {
    id: 3,
    prompt: "We are ___ of milk. We need to buy more.",
    options: [
      { text: "off", correct: false },
      { text: "out", correct: true },
      { text: "full", correct: false }
    ],
    explanation: "To be 'out of' something berarti kamu tidak punya sisanya lagi (habis)."
  },
  {
    id: 4,
    prompt: "I need to ___ after a long day at work.",
    options: [
      { text: "undo", correct: false },
      { text: "unlock", correct: false },
      { text: "unwind", correct: true }
    ],
    explanation: "'Unwind' berarti bersantai dan melepas stres."
  },
  {
    id: 5,
    prompt: "It is my ___ to wash the dishes.",
    options: [
      { text: "turn", correct: true },
      { text: "circle", correct: false },
      { text: "spin", correct: false }
    ],
    explanation: "'It is my turn' berarti ini waktuku/tanggung jawabku untuk melakukannya."
  },
  {
    id: 6,
    prompt: "Apa arti dari kalimat: \"Don't forget to buy bread too.\"?",
    options: [
      { text: "Tidak, aku sangat terlambat.", correct: false },
      { text: "Itu sehat dan hemat uang.", correct: false },
      { text: "Jangan lupa beli roti juga.", correct: true }
    ],
    explanation: "Kalimat \"Don't forget to buy bread too.\" memiliki arti \"Jangan lupa beli roti juga.\"."
  },
  {
    id: 7,
    prompt: "Bagaimana cara mengatakan: \"Tepat sekali. Mau makan bareng?\"?",
    options: [
      { text: "Boring! Let's go to the park instead.", correct: false },
      { text: "I can make it to-go for you.", correct: false },
      { text: "Exactly. Do you want to eat together?", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Tepat sekali. Mau makan bareng?\" adalah \"Exactly. Do you want to eat together?\"."
  },
  {
    id: 8,
    prompt: "Lengkapi kalimat: \"___, but I hit snooze three times.\"\n(Arti: Ya, tapi aku tekan tombol tunda tiga kali.)",
    options: [
      { text: "Yes", correct: true },
      { text: "so", correct: false },
      { text: "office", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'Yes'."
  },
  {
    id: 9,
    prompt: "Apa arti dari kalimat: \"How do you usually get to the office?\"?",
    options: [
      { text: "Biasanya naik apa ke kantor?", correct: true },
      { text: "Kamu akan terlambat kerja!", correct: false },
      { text: "Aku lebih suka nonton Netflix di sofa.", correct: false }
    ],
    explanation: "Kalimat \"How do you usually get to the office?\" memiliki arti \"Biasanya naik apa ke kantor?\"."
  },
  {
    id: 10,
    prompt: "Bagaimana cara mengatakan: \"Aku tahu, tapi aku capek sekali sekarang.\"?",
    options: [
      { text: "Did your alarm go off this morning?", correct: false },
      { text: "I know, but I am so tired right now.", correct: true },
      { text: "Deal. Let's finish it quickly.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Aku tahu, tapi aku capek sekali sekarang.\" adalah \"I know, but I am so tired right now.\"."
  },
  {
    id: 11,
    prompt: "Lengkapi kalimat: \"I take the subway ___ avoid traffic.\"\n(Arti: Saya naik kereta bawah tanah untuk menghindari macet.)",
    options: [
      { text: "have", correct: false },
      { text: "to", correct: true },
      { text: "to-go", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'to'."
  },
  {
    id: 12,
    prompt: "Apa arti dari kalimat: \"Maybe in the afternoon. I have chores.\"?",
    options: [
      { text: "Itu akan sangat membantu. Terima kasih!", correct: false },
      { text: "Mungkin sore. Aku ada tugas rumah.", correct: true },
      { text: "Apa kita butuh sesuatu dari toko?", correct: false }
    ],
    explanation: "Kalimat \"Maybe in the afternoon. I have chores.\" memiliki arti \"Mungkin sore. Aku ada tugas rumah.\"."
  },
  {
    id: 13,
    prompt: "Bagaimana cara mengatakan: \"Aku bisa buatkan untuk dibawa.\"?",
    options: [
      { text: "Where do you usually eat lunch?", correct: false },
      { text: "I can't sleep. I drank coffee too late.", correct: false },
      { text: "I can make it to-go for you.", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Aku bisa buatkan untuk dibawa.\" adalah \"I can make it to-go for you.\"."
  },
  {
    id: 14,
    prompt: "Lengkapi kalimat: \"We are out of ___ and eggs.\"\n(Arti: Susu dan telur kita habis.)",
    options: [
      { text: "it", correct: false },
      { text: "go", correct: false },
      { text: "milk", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'milk'."
  },
  {
    id: 15,
    prompt: "Apa arti dari kalimat: \"Is it crowded in the morning?\"?",
    options: [
      { text: "Kenapa masih bangun? Sudah tengah malam.", correct: false },
      { text: "Apakah ramai di pagi hari?", correct: true },
      { text: "Setuju. Ayo selesaikan dengan cepat.", correct: false }
    ],
    explanation: "Kalimat \"Is it crowded in the morning?\" memiliki arti \"Apakah ramai di pagi hari?\"."
  },
  {
    id: 16,
    prompt: "Bagaimana cara mengatakan: \"Apakah alarmmu berbunyi pagi ini?\"?",
    options: [
      { text: "Good morning. Have you checked your email?", correct: false },
      { text: "Is it crowded in the morning?", correct: false },
      { text: "Did your alarm go off this morning?", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Apakah alarmmu berbunyi pagi ini?\" adalah \"Did your alarm go off this morning?\"."
  },
  {
    id: 17,
    prompt: "Lengkapi kalimat: \"Deal. Let's finish ___ quickly.\"\n(Arti: Setuju. Ayo selesaikan dengan cepat.)",
    options: [
      { text: "it", correct: true },
      { text: "a", correct: false },
      { text: "morning", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'it'."
  },
  {
    id: 18,
    prompt: "Apa arti dari kalimat: \"I usually clean the house in the morning.\"?",
    options: [
      { text: "Aku biasanya bersihin rumah pagi-pagi.", correct: true },
      { text: "Saya naik kereta bawah tanah untuk menghindari macet.", correct: false },
      { text: "Itu akan sangat membantu. Terima kasih!", correct: false }
    ],
    explanation: "Kalimat \"I usually clean the house in the morning.\" memiliki arti \"Aku biasanya bersihin rumah pagi-pagi.\"."
  },
  {
    id: 19,
    prompt: "Bagaimana cara mengatakan: \"Kita ada rapat tim jam 10 pagi.\"?",
    options: [
      { text: "Okay, I will stop by the supermarket.", correct: false },
      { text: "We have a team meeting at 10 AM.", correct: true },
      { text: "I usually bring a packed lunch from home.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Kita ada rapat tim jam 10 pagi.\" adalah \"We have a team meeting at 10 AM.\"."
  },
  {
    id: 20,
    prompt: "Lengkapi kalimat: \"Boring! Let's go ___ the park instead.\"\n(Arti: Membosankan! Ayo ke taman saja.)",
    options: [
      { text: "usually", correct: false },
      { text: "to", correct: true },
      { text: "unwind", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'to'."
  }
];

const ElemSpeakingLesson1: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_speaking', 1);
  const nextLessonPath = '/modul/english/elementary/speaking/lesson-2';
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
      alert("Latihan Selesai! Kamu telah menguasai kosakata rutinitas harian.");
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
      lessonLabel={"Elementary Speaking Lesson 1"}
      accentColor={"#E74C3C"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Kehidupan Sehari-hari & Rutinitas"
            subtitle="Speaking • Pelajaran 1"
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
              <Clock className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Kehidupan Sehari-hariku</h2>
              <p className="text-sky-100 text-sm leading-relaxed mb-4">
                Belajar membicarakan kebiasaan sehari-hari, dari bangun tidur hingga tidur malam, mengerjakan tugas rumah, dan perjalanan kerja.
              </p>
              <div className="flex gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">40 Baris</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">10 Situasi</span>
              </div>
            </div>
          </motion.section>

          {/* Scenario Selector */}
          <section>
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 px-1">Pilih Situasi</h3>
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
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentScenario.level === 'Formal' ? 'bg-purple-50 text-purple-600' : 'bg-sky-50 text-sky-600'}`}>
                {currentScenario.level}
              </div>
            </div>

            <div className="space-y-6">
              {currentScenario.dialogue.map((line, idx) => (
                <div key={idx} className={`flex gap-4 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-[var(--shadow-card)] ${line.speaker === 'A' ? 'bg-sky-100 text-sky-600' : 'bg-indigo-100 text-indigo-600'
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
              <Info size={24} />
              <div>
                <h3 className="font-bold text-indigo-900 mb-2">Info Budaya</h3>
                <p className="text-sm text-indigo-700 leading-relaxed">
                  Di banyak tempat kerja Barat, orang mengobrol tentang akhir pekan mereka pada Senin pagi. Merupakan hal sopan untuk bertanya "How was your weekend?" sebelum memulai diskusi kerja.
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
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

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
export default ElemSpeakingLesson1;