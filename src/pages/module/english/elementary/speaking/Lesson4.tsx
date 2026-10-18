import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, User, ClipboardList } from 'lucide-react';
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
    title: "Asking About Job",
    context: "Bertemu orang baru.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tom', text: "What do you do for a living?", translation: "Apa pekerjaanmu?" },
      { speaker: 'B', name: 'Sarah', text: "I am a teacher at the local school.", translation: "Saya guru di sekolah setempat." },
      { speaker: 'A', name: 'Tom', text: "Do you enjoy your job?", translation: "Apakah kamu menikmati pekerjaanmu?" },
      { speaker: 'B', name: 'Sarah', text: "Yes, I love helping students learn.", translation: "Ya, saya suka membantu siswa belajar." }
    ]
  },
  {
    id: 'c2',
    title: "Work Location",
    context: "Membahas perusahaan.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Interviewer', text: "Where do you work currently?", translation: "Di mana Anda bekerja saat ini?" },
      { speaker: 'B', name: 'Candidate', text: "I work for a bank in the city center.", translation: "Saya bekerja untuk sebuah bank di pusat kota." },
      { speaker: 'A', name: 'Interviewer', text: "How long have you worked there?", translation: "Sudah berapa lama Anda bekerja di sana?" },
      { speaker: 'B', name: 'Candidate', text: "I have been there for three years.", translation: "Saya sudah di sana selama tiga tahun." }
    ]
  },
  {
    id: 'c3',
    title: "Work Schedule",
    context: "Membicarakan jam kerja.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Ben', text: "What are your working hours?", translation: "Jam berapa jam kerjamu?" },
      { speaker: 'B', name: 'Mia', text: "I work from 9 AM to 5 PM.", translation: "Saya kerja dari jam 9 pagi sampai 5 sore." },
      { speaker: 'A', name: 'Ben', text: "Do you work on weekends?", translation: "Apa kamu kerja di akhir pekan?" },
      { speaker: 'B', name: 'Mia', text: "No, I am off on Saturday and Sunday.", translation: "Tidak, saya libur hari Sabtu dan Minggu." }
    ]
  },
  {
    id: 'c4',
    title: "Daily Tasks",
    context: "Mendeskripsikan rutinitas.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Manager', text: "What do you do in the morning?", translation: "Apa yang Anda lakukan di pagi hari?" },
      { speaker: 'B', name: 'Staff', text: "I check emails and write reports.", translation: "Saya cek email dan menulis laporan." },
      { speaker: 'A', name: 'Manager', text: "Is it usually busy?", translation: "Apakah biasanya sibuk?" },
      { speaker: 'B', name: 'Staff', text: "Yes, the phone rings all the time.", translation: "Ya, telepon berdering terus-menerus." }
    ]
  },
  {
    id: 'c5',
    title: "Meeting Time",
    context: "Menjadwalkan diskusi.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Alice', text: "We have a meeting at 2 PM.", translation: "Kita ada rapat jam 2 siang." },
      { speaker: 'B', name: 'Bob', text: "Where is the meeting?", translation: "Di mana rapatnya?" },
      { speaker: 'A', name: 'Alice', text: "It is in Conference Room B.", translation: "Ada di Ruang Konferensi B." },
      { speaker: 'B', name: 'Bob', text: "Okay, I will bring my laptop.", translation: "Oke, saya akan bawa laptop saya." }
    ]
  },
  {
    id: 'c6',
    title: "New Job News",
    context: "Merayakan kesuksesan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend 1', text: "Guess what? I got a new job!", translation: "Tahu gak? Aku dapat pekerjaan baru!" },
      { speaker: 'B', name: 'Friend 2', text: "Congratulations! What is the role?", translation: "Selamat! Apa posisinya?" },
      { speaker: 'A', name: 'Friend 1', text: "I am a Marketing Manager now.", translation: "Saya sekarang Manajer Pemasaran." },
      { speaker: 'B', name: 'Friend 2', text: "That is fantastic news.", translation: "Itu kabar yang luar biasa." }
    ]
  },
  {
    id: 'c7',
    title: "Office Problem",
    context: "Kegagalan peralatan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Employee 1', text: "The printer is not working.", translation: "Printernya tidak berfungsi." },
      { speaker: 'B', name: 'Employee 2', text: "Did you check the paper?", translation: "Sudah cek kertasnya?" },
      { speaker: 'A', name: 'Employee 1', text: "Yes, the tray is full.", translation: "Ya, tempat kertasnya penuh." },
      { speaker: 'B', name: 'Employee 2', text: "We should call IT support.", translation: "Kita harus panggil dukungan IT." }
    ]
  },
  {
    id: 'c8',
    title: "The Commute",
    context: "Perjalanan ke tempat kerja.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Coworker', text: "How long is your commute?", translation: "Berapa lama perjalanan kerjamu?" },
      { speaker: 'B', name: 'You', text: "It takes about one hour.", translation: "Memakan waktu sekitar satu jam." },
      { speaker: 'A', name: 'Coworker', text: "Do you drive?", translation: "Kamu menyetir?" },
      { speaker: 'B', name: 'You', text: "No, I usually take the train.", translation: "Tidak, biasanya saya naik kereta." }
    ]
  }
];

const PRACTICE_QUESTIONS = [
{
    id: 1,
    prompt: "I work ___ a doctor.",
    options: [
      { text: "for", correct: false },
      { text: "in", correct: false },
      { text: "as", correct: true }
    ],
    explanation: "Gunakan 'as' sebelum nama jabatan (Work as a doctor)."
  },
  {
    id: 2,
    prompt: "He works ___ Google.",
    options: [
      { text: "for", correct: true },
      { text: "as", correct: false },
      { text: "on", correct: false }
    ],
    explanation: "Gunakan 'for' sebelum nama perusahaan (Work for Google)."
  },
  {
    id: 3,
    prompt: "She works ___ an office.",
    options: [
      { text: "by", correct: false },
      { text: "in", correct: true },
      { text: "as", correct: false }
    ],
    explanation: "Gunakan 'in' untuk tempat (Work in an office/hospital)."
  },
  {
    id: 4,
    prompt: "A person who buys things is a ___.",
    options: [
      { text: "Customer", correct: true },
      { text: "Manager", correct: false },
      { text: "Boss", correct: false }
    ],
    explanation: "Customer adalah orang yang membeli barang atau jasa."
  },
  {
    id: 5,
    prompt: "I am ___ duty (working).",
    options: [
      { text: "at", correct: false },
      { text: "in", correct: false },
      { text: "on", correct: true }
    ],
    explanation: "Kita bilang 'on duty' ketika seseorang sedang bertugas."
  },
  {
    id: 6,
    prompt: "Apa arti dari kalimat: \"We should call IT support.\"?",
    options: [
      { text: "Sudah cek kertasnya?", correct: false },
      { text: "Kita harus panggil dukungan IT.", correct: true },
      { text: "Di mana rapatnya?", correct: false }
    ],
    explanation: "Kalimat \"We should call IT support.\" memiliki arti \"Kita harus panggil dukungan IT.\"."
  },
  {
    id: 7,
    prompt: "Bagaimana cara mengatakan: \"Apa yang Anda lakukan di pagi hari?\"?",
    options: [
      { text: "I am a Marketing Manager now.", correct: false },
      { text: "We should call IT support.", correct: false },
      { text: "What do you do in the morning?", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Apa yang Anda lakukan di pagi hari?\" adalah \"What do you do in the morning?\"."
  },
  {
    id: 8,
    prompt: "Lengkapi kalimat: \"The printer is not ___.\"\n(Arti: Printernya tidak berfungsi.)",
    options: [
      { text: "working", correct: true },
      { text: "do", correct: false },
      { text: "teacher", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'working'."
  },
  {
    id: 9,
    prompt: "Apa arti dari kalimat: \"I am a teacher at the local school.\"?",
    options: [
      { text: "Apa yang Anda lakukan di pagi hari?", correct: false },
      { text: "Saya guru di sekolah setempat.", correct: true },
      { text: "Printernya tidak berfungsi.", correct: false }
    ],
    explanation: "Kalimat \"I am a teacher at the local school.\" memiliki arti \"Saya guru di sekolah setempat.\"."
  },
  {
    id: 10,
    prompt: "Bagaimana cara mengatakan: \"Di mana Anda bekerja saat ini?\"?",
    options: [
      { text: "Yes, the phone rings all the time.", correct: false },
      { text: "Where do you work currently?", correct: true },
      { text: "What do you do in the morning?", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Di mana Anda bekerja saat ini?\" adalah \"Where do you work currently?\"."
  },
  {
    id: 11,
    prompt: "Lengkapi kalimat: \"That is fantastic ___.\"\n(Arti: Itu kabar yang luar biasa.)",
    options: [
      { text: "the", correct: false },
      { text: "working", correct: false },
      { text: "news", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'news'."
  },
  {
    id: 12,
    prompt: "Apa arti dari kalimat: \"Where is the meeting?\"?",
    options: [
      { text: "Di mana rapatnya?", correct: true },
      { text: "Selamat! Apa posisinya?", correct: false },
      { text: "Saya sekarang Manajer Pemasaran.", correct: false }
    ],
    explanation: "Kalimat \"Where is the meeting?\" memiliki arti \"Di mana rapatnya?\"."
  },
  {
    id: 13,
    prompt: "Bagaimana cara mengatakan: \"Jam berapa jam kerjamu?\"?",
    options: [
      { text: "What are your working hours?", correct: true },
      { text: "Yes, the phone rings all the time.", correct: false },
      { text: "No, I usually take the train.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Jam berapa jam kerjamu?\" adalah \"What are your working hours?\"."
  },
  {
    id: 14,
    prompt: "Lengkapi kalimat: \"How long is ___ commute?\"\n(Arti: Berapa lama perjalanan kerjamu?)",
    options: [
      { text: "your", correct: true },
      { text: "love", correct: false },
      { text: "rings", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'your'."
  },
  {
    id: 15,
    prompt: "Apa arti dari kalimat: \"Yes, the phone rings all the time.\"?",
    options: [
      { text: "Sudah berapa lama Anda bekerja di sana?", correct: false },
      { text: "Saya sekarang Manajer Pemasaran.", correct: false },
      { text: "Ya, telepon berdering terus-menerus.", correct: true }
    ],
    explanation: "Kalimat \"Yes, the phone rings all the time.\" memiliki arti \"Ya, telepon berdering terus-menerus.\"."
  },
  {
    id: 16,
    prompt: "Bagaimana cara mengatakan: \"Ya, saya suka membantu siswa belajar.\"?",
    options: [
      { text: "That is fantastic news.", correct: false },
      { text: "Yes, I love helping students learn.", correct: true },
      { text: "I am a teacher at the local school.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Ya, saya suka membantu siswa belajar.\" adalah \"Yes, I love helping students learn.\"."
  },
  {
    id: 17,
    prompt: "Lengkapi kalimat: \"Yes, the ___ is full.\"\n(Arti: Ya, tempat kertasnya penuh.)",
    options: [
      { text: "the", correct: false },
      { text: "tray", correct: true },
      { text: "drive", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'tray'."
  },
  {
    id: 18,
    prompt: "Apa arti dari kalimat: \"I work for a bank in the city center.\"?",
    options: [
      { text: "Ya, tempat kertasnya penuh.", correct: false },
      { text: "Saya bekerja untuk sebuah bank di pusat kota.", correct: true },
      { text: "Apa kamu kerja di akhir pekan?", correct: false }
    ],
    explanation: "Kalimat \"I work for a bank in the city center.\" memiliki arti \"Saya bekerja untuk sebuah bank di pusat kota.\"."
  },
  {
    id: 19,
    prompt: "Bagaimana cara mengatakan: \"Kamu menyetir?\"?",
    options: [
      { text: "Do you drive?", correct: true },
      { text: "I work from 9 AM to 5 PM.", correct: false },
      { text: "Yes, I love helping students learn.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Kamu menyetir?\" adalah \"Do you drive?\"."
  },
  {
    id: 20,
    prompt: "Lengkapi kalimat: \"Is it usually ___?\"\n(Arti: Apakah biasanya sibuk?)",
    options: [
      { text: "in", correct: false },
      { text: "busy", correct: true },
      { text: "one", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'busy'."
  }
];

const ElemSpeakingLesson4: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_speaking', 4);
  const nextLessonPath = '/modul/english/elementary/speaking/lesson-5';
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
      alert("Latihan Selesai! Kamu telah siap untuk dunia kerja.");
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
      lessonLabel={"Elementary Speaking Lesson 4"}
      accentColor={"#E74C3C"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Pekerjaan & Tempat Kerja"
            subtitle="Speaking • Pelajaran 4"
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
                      className="bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <ClipboardList className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Di Tempat Kerja</h2>
              <p className="text-slate-100 text-sm leading-relaxed mb-4">
                Kuasai bahasa tempat kerja. Belajar membicarakan jabatan, tugas harian, dan berinteraksi dengan kolega secara profesional.
              </p>
              <div className="flex gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">32 Baris</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">8 Skenario</span>
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
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentScenario.level === 'Formal' ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-[var(--color-primary)]'}`}>
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
                      className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <div className="flex items-start gap-4">
              <User className="w-6 h-6 text-indigo-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-indigo-900 mb-2">Tips Pro: Preposisi</h3>
                <p className="text-sm text-indigo-700 leading-relaxed">
                  <b>Work AS</b> a teacher (Jabatan).<br />
                  <b>Work FOR</b> Microsoft (Nama Perusahaan).<br />
                  <b>Work IN</b> a school (Tempat/Gedung).
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
                      className="bg-white rounded-[2rem] p-6 shadow-lg shadow-slate-900/5 border border-[var(--color-border)] relative overflow-hidden">
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gray-100 p-2 rounded-xl text-[var(--color-text-primary)]">
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
                    className="h-full bg-slate-600 transition-all duration-300"
                    style={{ width: `${((practiceStep + 1) / PRACTICE_QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-[var(--color-text-muted)] text-sm font-bold mb-2">Pilih yang paling tepat:</p>
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
                    btnClass = "border-slate-500 bg-[var(--color-background)] text-[var(--color-text-primary)]";
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
export default ElemSpeakingLesson4;