import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, Plane, TrendingUp } from 'lucide-react';
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
    title: "Train Ticket",
    context: "Membeli tiket di stasiun.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Traveler', text: "One ticket to London, please.", translation: "Satu tiket ke London, tolong." },
      { speaker: 'B', name: 'Agent', text: "Single or return?", translation: "Sekali jalan atau pulang pergi?" },
      { speaker: 'A', name: 'Traveler', text: "Return, please. Coming back today.", translation: "Pulang pergi. Kembali hari ini." },
      { speaker: 'B', name: 'Agent', text: "That will be £25. Platform 4.", translation: "Harganya £25. Peron 4." }
    ]
  },
  {
    id: 'c2',
    title: "Airport Check-in",
    context: "Di konter maskapai.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Agent', text: "May I see your passport and ticket?", translation: "Boleh lihat paspor dan tiket Anda?" },
      { speaker: 'B', name: 'Passenger', text: "Here you go. Do I need to weigh my bag?", translation: "Ini dia. Apakah saya perlu menimbang tas saya?" },
      { speaker: 'A', name: 'Agent', text: "Yes, please put it on the scale.", translation: "Ya, tolong taruh di timbangan." },
      { speaker: 'B', name: 'Passenger', text: "I hope it is not too heavy.", translation: "Saya harap tidak terlalu berat." }
    ]
  },
  {
    id: 'c3',
    title: "Bus Information",
    context: "Bertanya pada sopir.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Commuter', text: "Does this bus stop at the City Museum?", translation: "Apakah bus ini berhenti di Museum Kota?" },
      { speaker: 'B', name: 'Driver', text: "No, you need the number 10 bus.", translation: "Tidak, Anda butuh bus nomor 10." },
      { speaker: 'A', name: 'Commuter', text: "Where can I catch that one?", translation: "Di mana saya bisa naik bus itu?" },
      { speaker: 'B', name: 'Driver', text: "At the stop across the street.", translation: "Di halte seberang jalan." }
    ]
  },
  {
    id: 'c4',
    title: "Taxi Ride",
    context: "Memberi arahan.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Driver', text: "Where to, sir?", translation: "Mau ke mana, Pak?" },
      { speaker: 'B', name: 'Passenger', text: "To the Grand Hotel, please.", translation: "Ke Hotel Grand, tolong." },
      { speaker: 'A', name: 'Driver', text: "Sure. It will take about 20 minutes.", translation: "Baik. Akan memakan waktu sekitar 20 menit." },
      { speaker: 'B', name: 'Passenger', text: "Please hurry, I have a meeting.", translation: "Tolong cepat, saya ada rapat." }
    ]
  },
  {
    id: 'c5',
    title: "Flight Delay",
    context: "Mendengar pengumuman.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Traveler 1', text: "Did you hear that? The flight is delayed.", translation: "Dengar itu? Penerbangannya ditunda." },
      { speaker: 'B', name: 'Traveler 2', text: "Oh no. How long is the delay?", translation: "Oh tidak. Berapa lama penundaannya?" },
      { speaker: 'A', name: 'Traveler 1', text: "They said about two hours.", translation: "Mereka bilang sekitar dua jam." },
      { speaker: 'B', name: 'Traveler 2', text: "We will miss our connection!", translation: "Kita akan ketinggalan penerbangan sambungan!" }
    ]
  },
  {
    id: 'c6',
    title: "Passport Control",
    context: "Wawancara imigrasi.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Officer', text: "What is the purpose of your visit?", translation: "Apa tujuan kunjungan Anda?" },
      { speaker: 'B', name: 'Tourist', text: "I am here for a holiday.", translation: "Saya di sini untuk liburan." },
      { speaker: 'A', name: 'Officer', text: "How long will you stay?", translation: "Berapa lama Anda akan tinggal?" },
      { speaker: 'B', name: 'Tourist', text: "Just one week.", translation: "Hanya satu minggu." }
    ]
  },
  {
    id: 'c7',
    title: "Renting a Vehicle",
    context: "Di tempat penyewaan.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Customer', text: "I would like to rent a scooter.", translation: "Saya ingin menyewa skuter." },
      { speaker: 'B', name: 'Clerk', text: "Do you have a driving license?", translation: "Apakah Anda punya SIM?" },
      { speaker: 'A', name: 'Customer', text: "Yes, here is my international license.", translation: "Ya, ini SIM internasional saya." },
      { speaker: 'B', name: 'Clerk', text: "Okay, it is $15 per day.", translation: "Oke, harganya $15 per hari." }
    ]
  },
  {
    id: 'c8',
    title: "Lost Luggage",
    context: "Melaporkan masalah.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Passenger', text: "Excuse me, my suitcase did not arrive.", translation: "Permisi, koper saya tidak sampai." },
      { speaker: 'B', name: 'Staff', text: "I am sorry. Can you describe it?", translation: "Maaf. Bisakah Anda mendeskripsikannya?" },
      { speaker: 'A', name: 'Passenger', text: "It is a large, black, hard-shell case.", translation: "Itu koper besar, hitam, dan keras." },
      { speaker: 'B', name: 'Staff', text: "Let me check the tracking system.", translation: "Biar saya cek sistem pelacakannya." }
    ]
  },
  {
    id: 'c9',
    title: "Subway Map",
    context: "Menjelajahi kota.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tourist 1', text: "Which line goes to the stadium?", translation: "Jalur mana yang ke stadion?" },
      { speaker: 'B', name: 'Tourist 2', text: "I think it is the Red Line.", translation: "Sepertinya Jalur Merah." },
      { speaker: 'A', name: 'Tourist 1', text: "Do we need to change trains?", translation: "Apa kita perlu ganti kereta?" },
      { speaker: 'B', name: 'Tourist 2', text: "Yes, we change at Central Station.", translation: "Ya, kita ganti di Stasiun Pusat." }
    ]
  },
  {
    id: 'c10',
    title: "Trip Review",
    context: "Bicara dengan teman.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend', text: "How was your trip to Paris?", translation: "Gimana perjalananmu ke Paris?" },
      { speaker: 'B', name: 'You', text: "It was amazing, but the flight was long.", translation: "Luar biasa, tapi penerbangannya lama." },
      { speaker: 'A', name: 'Friend', text: "Did you visit the Eiffel Tower?", translation: "Apa kamu mengunjungi Menara Eiffel?" },
      { speaker: 'B', name: 'You', text: "Yes, the view was beautiful.", translation: "Ya, pemandangannya indah." }
    ]
  }
];

const PRACTICE_QUESTIONS = [
{
    id: 1,
    prompt: "I want a ticket to go there and come back. I need a ___ ticket.",
    options: [
      { text: "single", correct: false },
      { text: "return", correct: true },
      { text: "one-way", correct: false }
    ],
    explanation: "Tiket 'return' (Inggris) atau 'round-trip' (AS) adalah untuk pergi dan pulang."
  },
  {
    id: 2,
    prompt: "You get on a plane at the ___.",
    options: [
      { text: "platform", correct: false },
      { text: "gate", correct: true },
      { text: "stop", correct: false }
    ],
    explanation: "Pesawat naik di Gate (Gerbang). Kereta menggunakan Platform (Peron)."
  },
  {
    id: 3,
    prompt: "The flight is late. It is ___.",
    options: [
      { text: "delayed", correct: true },
      { text: "cancelled", correct: false },
      { text: "arrived", correct: false }
    ],
    explanation: "'Delayed' berarti akan terjadi lebih lambat dari jadwal."
  },
  {
    id: 4,
    prompt: "You must show your ___ to enter another country.",
    options: [
      { text: "receipt", correct: false },
      { text: "passport", correct: true },
      { text: "menu", correct: false }
    ],
    explanation: "Paspor adalah ID resmi untuk perjalanan internasional."
  },
  {
    id: 5,
    prompt: "I travel ___ bus to work.",
    options: [
      { text: "in", correct: false },
      { text: "on", correct: false },
      { text: "by", correct: true }
    ],
    explanation: "Kita menggunakan 'by' untuk mode transportasi (by bus, by car, by train)."
  },
  {
    id: 6,
    prompt: "Apa arti dari kalimat: \"We will miss our connection!\"?",
    options: [
      { text: "Kita akan ketinggalan penerbangan sambungan!", correct: true },
      { text: "Sepertinya Jalur Merah.", correct: false },
      { text: "Permisi, koper saya tidak sampai.", correct: false }
    ],
    explanation: "Kalimat \"We will miss our connection!\" memiliki arti \"Kita akan ketinggalan penerbangan sambungan!\"."
  },
  {
    id: 7,
    prompt: "Bagaimana cara mengatakan: \"Ya, kita ganti di Stasiun Pusat.\"?",
    options: [
      { text: "Let me check the tracking system.", correct: false },
      { text: "Okay, it is five pounds per day.", correct: false },
      { text: "Yes, we change at Central Station.", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Ya, kita ganti di Stasiun Pusat.\" adalah \"Yes, we change at Central Station.\"."
  },
  {
    id: 8,
    prompt: "Lengkapi kalimat: \"I ___ it is not too heavy.\"\n(Arti: Saya harap tidak terlalu berat.)",
    options: [
      { text: "you", correct: false },
      { text: "Which", correct: false },
      { text: "hope", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'hope'."
  },
  {
    id: 9,
    prompt: "Apa arti dari kalimat: \"I am sorry. Can you describe it?\"?",
    options: [
      { text: "Mau ke mana, Pak?", correct: false },
      { text: "Maaf. Bisakah Anda mendeskripsikannya?", correct: true },
      { text: "Oke, harganya lima pound per hari.", correct: false }
    ],
    explanation: "Kalimat \"I am sorry. Can you describe it?\" memiliki arti \"Maaf. Bisakah Anda mendeskripsikannya?\"."
  },
  {
    id: 10,
    prompt: "Bagaimana cara mengatakan: \"Jalur mana yang ke stadion?\"?",
    options: [
      { text: "Sure. It will take about 20 minutes.", correct: false },
      { text: "Return, please. Coming back today.", correct: false },
      { text: "Which line goes to the stadium?", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Jalur mana yang ke stadion?\" adalah \"Which line goes to the stadium?\"."
  },
  {
    id: 11,
    prompt: "Lengkapi kalimat: \"May I see your passport ___ ticket?\"\n(Arti: Boleh lihat paspor dan tiket Anda?)",
    options: [
      { text: "was", correct: false },
      { text: "One", correct: false },
      { text: "and", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'and'."
  },
  {
    id: 12,
    prompt: "Apa arti dari kalimat: \"Yes, the view was beautiful.\"?",
    options: [
      { text: "Ya, pemandangannya indah.", correct: true },
      { text: "Oh tidak. Berapa lama penundaannya?", correct: false },
      { text: "Maaf. Bisakah Anda mendeskripsikannya?", correct: false }
    ],
    explanation: "Kalimat \"Yes, the view was beautiful.\" memiliki arti \"Ya, pemandangannya indah.\"."
  },
  {
    id: 13,
    prompt: "Bagaimana cara mengatakan: \"Satu tiket ke London, tolong.\"?",
    options: [
      { text: "Yes, please put it on the scale.", correct: false },
      { text: "We will miss our connection!", correct: false },
      { text: "One ticket to London, please.", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Satu tiket ke London, tolong.\" adalah \"One ticket to London, please.\"."
  },
  {
    id: 14,
    prompt: "Lengkapi kalimat: \"They said about ___ hours.\"\n(Arti: Mereka bilang sekitar dua jam.)",
    options: [
      { text: "think", correct: false },
      { text: "Yes", correct: false },
      { text: "two", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'two'."
  },
  {
    id: 15,
    prompt: "Apa arti dari kalimat: \"Yes, here is my international license.\"?",
    options: [
      { text: "Saya harap tidak terlalu berat.", correct: false },
      { text: "Tolong cepat, saya ada rapat.", correct: false },
      { text: "Ya, ini SIM internasional saya.", correct: true }
    ],
    explanation: "Kalimat \"Yes, here is my international license.\" memiliki arti \"Ya, ini SIM internasional saya.\"."
  },
  {
    id: 16,
    prompt: "Bagaimana cara mengatakan: \"Sepertinya Jalur Merah.\"?",
    options: [
      { text: "Do you have a driving license?", correct: false },
      { text: "I think it is the Red Line.", correct: true },
      { text: "Please hurry, I have a meeting.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Sepertinya Jalur Merah.\" adalah \"I think it is the Red Line.\"."
  },
  {
    id: 17,
    prompt: "Lengkapi kalimat: \"Okay, it is ___ per day.\"\n(Arti: Oke, harganya lima pound per hari.)",
    options: [
      { text: "minutes", correct: false },
      { text: "you", correct: false },
      { text: "five pounds", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'five pounds'."
  },
  {
    id: 18,
    prompt: "Apa arti dari kalimat: \"No, you need the number 10 bus.\"?",
    options: [
      { text: "Tidak, Anda butuh bus nomor 10.", correct: true },
      { text: "Baik. Akan memakan waktu sekitar 20 menit.", correct: false },
      { text: "Biar saya cek sistem pelacakannya.", correct: false }
    ],
    explanation: "Kalimat \"No, you need the number 10 bus.\" memiliki arti \"Tidak, Anda butuh bus nomor 10.\"."
  },
  {
    id: 19,
    prompt: "Bagaimana cara mengatakan: \"Baik. Akan memakan waktu sekitar 20 menit.\"?",
    options: [
      { text: "Sure. It will take about 20 minutes.", correct: true },
      { text: "Did you visit the Eiffel Tower?", correct: false },
      { text: "That will be twenty-five pounds. Platform 4.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Baik. Akan memakan waktu sekitar 20 menit.\" adalah \"Sure. It will take about 20 minutes.\"."
  },
  {
    id: 20,
    prompt: "Lengkapi kalimat: \"___ you have a driving license?\"\n(Arti: Apakah Anda punya SIM?)",
    options: [
      { text: "Do", correct: true },
      { text: "please", correct: false },
      { text: "catch", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'Do'."
  }
];

const ElemSpeakingLesson8: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_speaking', 8);
  const nextLessonPath = '/modul/english/elementary/speaking/lesson-9';
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
      alert("Latihan Selesai! Hati-hati di jalan.");
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
      lessonLabel={"Elementary Speaking Lesson 8"}
      accentColor={"#E74C3C"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Liburan & Transportasi"
            subtitle="Speaking • Pelajaran 8"
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
                      className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Plane className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Bepergian</h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-4">
                Belajar membeli tiket, bertanya di bandara dan stasiun, serta menangani masalah perjalanan.
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
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentScenario.level === 'Formal' ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'}`}>
                {currentScenario.level}
              </div>
            </div>

            <div className="space-y-6">
              {currentScenario.dialogue.map((line, idx) => (
                <div key={idx} className={`flex gap-4 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-[var(--shadow-card)] ${line.speaker === 'A' ? 'bg-gray-100 text-[var(--color-text-secondary)]' : 'bg-blue-100 text-blue-600'
                    }`}>
                    {line.speaker}
                  </div>

                  {/* Bubble */}
                  <div className={`flex-1 max-w-[85%] group`}>
                    <div className={`p-4 rounded-2xl relative ${line.speaker === 'A'
                        ? 'bg-[var(--color-background)] text-[var(--color-text-primary)] rounded-tl-sm'
                        : 'bg-blue-50 text-blue-900 rounded-tr-sm'
                      }`}>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-[10px] font-bold opacity-50 uppercase tracking-wide">{line.name}</span>
                        <button
                          onClick={() => handlePlayAudio(line.text)}
                          className="text-[var(--color-text-muted)] hover:text-blue-600 transition-colors"
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
              <TrendingUp className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-amber-900 mb-2">Tips Pro: "By" vs "On"</h3>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Gunakan <b>"by"</b> untuk mode transportasi (pergi <i>by bus</i>, jalan <i>by train</i>). <br />
                  Gunakan <b>"on"</b> saat berada di dalam kendaraan besar (Saya <i>on the bus</i>, <i>on the plane</i>). <br />
                  Pengecualian: <b>"in"</b> a car atau taxi.
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
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-xl text-blue-700">
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
                    className="h-full bg-blue-500 transition-all duration-300"
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
                    btnClass = "border-blue-500 bg-blue-50 text-blue-700";
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
export default ElemSpeakingLesson8;
