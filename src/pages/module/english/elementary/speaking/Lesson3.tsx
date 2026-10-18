import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, User, Smile } from 'lucide-react';
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
    title: "Brothers & Sisters",
    context: "Bertanya tentang saudara.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tom', text: "Do you have any brothers or sisters?", translation: "Apakah kamu punya saudara laki-laki atau perempuan?" },
      { speaker: 'B', name: 'Jerry', text: "Yes, I have one older brother.", translation: "Ya, aku punya satu kakak laki-laki." },
      { speaker: 'A', name: 'Tom', text: "Is he married?", translation: "Apa dia sudah menikah?" },
      { speaker: 'B', name: 'Jerry', text: "No, he is still single.", translation: "Tidak, dia masih lajang." }
    ]
  },
  {
    id: 'c2',
    title: "The Aunt",
    context: "Melihat foto keluarga.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Lisa', text: "Who is that woman in the photo?", translation: "Siapa wanita di foto itu?" },
      { speaker: 'B', name: 'Mia', text: "That is my Aunt Sarah. She is my dad's sister.", translation: "Itu Bibi Sarah-ku. Dia saudara perempuan ayahku." },
      { speaker: 'A', name: 'Lisa', text: "She looks very young.", translation: "Dia terlihat sangat muda." },
      { speaker: 'B', name: 'Mia', text: "Yes, she is the youngest in the family.", translation: "Ya, dia yang paling muda di keluarga." }
    ]
  },
  {
    id: 'c3',
    title: "Cousins",
    context: "Membicarakan keluarga besar.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Ben', text: "Do you see your cousins often?", translation: "Apa kamu sering ketemu sepupumu?" },
      { speaker: 'B', name: 'Sam', text: "Not really. They live in another city.", translation: "Gak juga. Mereka tinggal di kota lain." },
      { speaker: 'A', name: 'Ben', text: "That is too bad.", translation: "Sayang sekali." },
      { speaker: 'B', name: 'Sam', text: "We usually meet at Christmas.", translation: "Biasanya kami ketemu pas Natal." }
    ]
  },
  {
    id: 'c4',
    title: "Marital Status",
    context: "Bercengkrama dengan teman lama.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'John', text: "Are you married now, Tom?", translation: "Apa kamu sudah menikah, Tom?" },
      { speaker: 'B', name: 'Tom', text: "No, I am divorced.", translation: "Tidak, aku sudah bercerai." },
      { speaker: 'A', name: 'John', text: "Oh, I am sorry to hear that.", translation: "Oh, maaf mendengarnya." },
      { speaker: 'B', name: 'Tom', text: "It is okay. I am happy now.", translation: "Gapapa kok. Aku bahagia sekarang." }
    ]
  },
  {
    id: 'c5',
    title: "The In-Laws",
    context: "Membahas kunjungan kerabat.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Wife', text: "My mother-in-law is coming to visit.", translation: "Ibu mertuaku mau datang berkunjung." },
      { speaker: 'B', name: 'Friend', text: "Are you nervous?", translation: "Kamu gugup?" },
      { speaker: 'A', name: 'Wife', text: "A little bit. She is very strict.", translation: "Sedikit. Dia sangat tegas." },
      { speaker: 'B', name: 'Friend', text: "Just cook a nice dinner for her.", translation: "Masakin aja makan malam yang enak buat dia." }
    ]
  },
  {
    id: 'c6',
    title: "New Baby",
    context: "Berbagi kabar baik.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Uncle', text: "I became an uncle yesterday!", translation: "Aku jadi paman kemarin!" },
      { speaker: 'B', name: 'Colleague', text: "Congratulations! Is it a boy or a girl?", translation: "Selamat! Laki-laki atau perempuan?" },
      { speaker: 'A', name: 'Uncle', text: "It is a girl. My new niece is beautiful.", translation: "Perempuan. Keponakan baruku cantik sekali." },
      { speaker: 'B', name: 'Colleague', text: "You must be very proud.", translation: "Kamu pasti bangga sekali." }
    ]
  },
  {
    id: 'c7',
    title: "Grandfather's Birthday",
    context: "Merencanakan perayaan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Grandson', text: "My grandfather is 80 years old today.", translation: "Kakekku umur 80 tahun hari ini." },
      { speaker: 'B', name: 'Friend', text: "Wow, that is a big birthday.", translation: "Wow, itu ulang tahun besar." },
      { speaker: 'A', name: 'Grandson', text: "We are having a big party for him.", translation: "Kami mengadakan pesta besar buat dia." },
      { speaker: 'B', name: 'Friend', text: "Give him my best wishes.", translation: "Sampaikan salam terbaikku." }
    ]
  },
  {
    id: 'c8',
    title: "Engagement News",
    context: "Menggosipkan teman.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Anna', text: "Did you hear the news about Jane?", translation: "Udah dengar kabar soal Jane?" },
      { speaker: 'B', name: 'Bella', text: "No, what happened?", translation: "Belum, ada apa?" },
      { speaker: 'A', name: 'Anna', text: "She is engaged to Mark!", translation: "Dia bertunangan dengan Mark!" },
      { speaker: 'B', name: 'Bella', text: "That is wonderful news.", translation: "Itu kabar yang sangat bagus." }
    ]
  },
  {
    id: 'c9',
    title: "Only Child",
    context: "Membicarakan anggota keluarga.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Kid 1', text: "Do you fight with your siblings?", translation: "Apa kamu berantem sama saudaramu?" },
      { speaker: 'B', name: 'Kid 2', text: "I don't have any. I am an only child.", translation: "Aku gak punya. Aku anak tunggal." },
      { speaker: 'A', name: 'Kid 1', text: "Do you like being an only child?", translation: "Suka gak jadi anak tunggal?" },
      { speaker: 'B', name: 'Kid 2', text: "Sometimes it is lonely, but it is okay.", translation: "Kadang kesepian, tapi oke kok." }
    ]
  },
  {
    id: 'c10',
    title: "Step-family",
    context: "Menjelaskan hubungan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'New Friend', text: "Is that your real father?", translation: "Apa itu ayah kandungmu?" },
      { speaker: 'B', name: 'Boy', text: "No, he is my stepfather.", translation: "Bukan, dia ayah tiriku." },
      { speaker: 'A', name: 'New Friend', text: "You guys look alike.", translation: "Kalian terlihat mirip." },
      { speaker: 'B', name: 'Boy', text: "People say that all the time.", translation: "Orang-orang sering bilang begitu." }
    ]
  }
];

const PRACTICE_QUESTIONS = [
{
    id: 1,
    prompt: "My sister's daughter is my ___.",
    options: [
      { text: "cousin", correct: false },
      { text: "nephew", correct: false },
      { text: "niece", correct: true }
    ],
    explanation: "Anak perempuan dari saudaramu adalah 'niece' (keponakan perempuan)."
  },
  {
    id: 2,
    prompt: "My husband's mother is my ___.",
    options: [
      { text: "stepmother", correct: false },
      { text: "mother-in-law", correct: true },
      { text: "grandmother", correct: false }
    ],
    explanation: "Ibu dari pasanganmu adalah 'mother-in-law' (ibu mertua)."
  },
  {
    id: 3,
    prompt: "I have no brothers or sisters. I am an ___.",
    options: [
      { text: "lonely child", correct: false },
      { text: "one child", correct: false },
      { text: "only child", correct: true }
    ],
    explanation: "'Only child' adalah istilah yang tepat untuk anak tunggal."
  },
  {
    id: 4,
    prompt: "He is not married. He is ___.",
    options: [
      { text: "engaged", correct: false },
      { text: "double", correct: false },
      { text: "single", correct: true }
    ],
    explanation: "'Single' berarti belum menikah atau tidak dalam hubungan."
  },
  {
    id: 5,
    prompt: "Your father's brother is your ___.",
    options: [
      { text: "grandfather", correct: false },
      { text: "aunt", correct: false },
      { text: "uncle", correct: true }
    ],
    explanation: "Saudara laki-laki dari orang tuamu adalah 'uncle' (paman)."
  },
  {
    id: 6,
    prompt: "Apa arti dari kalimat: \"We usually meet at Christmas.\"?",
    options: [
      { text: "Kamu pasti bangga sekali.", correct: false },
      { text: "Gak juga. Mereka tinggal di kota lain.", correct: false },
      { text: "Biasanya kami ketemu pas Natal.", correct: true }
    ],
    explanation: "Kalimat \"We usually meet at Christmas.\" memiliki arti \"Biasanya kami ketemu pas Natal.\"."
  },
  {
    id: 7,
    prompt: "Bagaimana cara mengatakan: \"Kadang kesepian, tapi oke kok.\"?",
    options: [
      { text: "No, he is still single.", correct: false },
      { text: "Sometimes it is lonely, but it is okay.", correct: true },
      { text: "Just cook a nice dinner for her.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Kadang kesepian, tapi oke kok.\" adalah \"Sometimes it is lonely, but it is okay.\"."
  },
  {
    id: 8,
    prompt: "Lengkapi kalimat: \"We are ___ a big party for him.\"\n(Arti: Kami mengadakan pesta besar buat dia.)",
    options: [
      { text: "I", correct: false },
      { text: "having", correct: true },
      { text: "She", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'having'."
  },
  {
    id: 9,
    prompt: "Apa arti dari kalimat: \"She is engaged to Mark!\"?",
    options: [
      { text: "Dia bertunangan dengan Mark!", correct: true },
      { text: "Aku gak punya. Aku anak tunggal.", correct: false },
      { text: "Kalian terlihat mirip.", correct: false }
    ],
    explanation: "Kalimat \"She is engaged to Mark!\" memiliki arti \"Dia bertunangan dengan Mark!\"."
  },
  {
    id: 10,
    prompt: "Bagaimana cara mengatakan: \"Aku gak punya. Aku anak tunggal.\"?",
    options: [
      { text: "We usually meet at Christmas.", correct: false },
      { text: "Not really. They live in another city.", correct: false },
      { text: "I don't have any. I am an only child.", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Aku gak punya. Aku anak tunggal.\" adalah \"I don't have any. I am an only child.\"."
  },
  {
    id: 11,
    prompt: "Lengkapi kalimat: \"Did you hear the ___ about Jane?\"\n(Arti: Udah dengar kabar soal Jane?)",
    options: [
      { text: "news", correct: true },
      { text: "uncle", correct: false },
      { text: "him", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'news'."
  },
  {
    id: 12,
    prompt: "Apa arti dari kalimat: \"Give him my best wishes.\"?",
    options: [
      { text: "Belum, ada apa?", correct: false },
      { text: "Ya, aku punya satu kakak laki-laki.", correct: false },
      { text: "Sampaikan salam terbaikku.", correct: true }
    ],
    explanation: "Kalimat \"Give him my best wishes.\" memiliki arti \"Sampaikan salam terbaikku.\"."
  },
  {
    id: 13,
    prompt: "Bagaimana cara mengatakan: \"Aku jadi paman kemarin!\"?",
    options: [
      { text: "Are you married now, Tom?", correct: false },
      { text: "I became an uncle yesterday!", correct: true },
      { text: "Just cook a nice dinner for her.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Aku jadi paman kemarin!\" adalah \"I became an uncle yesterday!\"."
  },
  {
    id: 14,
    prompt: "Lengkapi kalimat: \"My grandfather is 80 years old ___.\"\n(Arti: Kakekku umur 80 tahun hari ini.)",
    options: [
      { text: "that", correct: false },
      { text: "today", correct: true },
      { text: "woman", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'today'."
  },
  {
    id: 15,
    prompt: "Apa arti dari kalimat: \"Who is that woman in the photo?\"?",
    options: [
      { text: "Suka gak jadi anak tunggal?", correct: false },
      { text: "Tidak, aku sudah bercerai.", correct: false },
      { text: "Siapa wanita di foto itu?", correct: true }
    ],
    explanation: "Kalimat \"Who is that woman in the photo?\" memiliki arti \"Siapa wanita di foto itu?\"."
  },
  {
    id: 16,
    prompt: "Bagaimana cara mengatakan: \"Wow, itu ulang tahun besar.\"?",
    options: [
      { text: "Do you fight with your siblings?", correct: false },
      { text: "Wow, that is a big birthday.", correct: true },
      { text: "Do you see your cousins often?", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Wow, itu ulang tahun besar.\" adalah \"Wow, that is a big birthday.\"."
  },
  {
    id: 17,
    prompt: "Lengkapi kalimat: \"That is ___ news.\"\n(Arti: Itu kabar yang sangat bagus.)",
    options: [
      { text: "wonderful", correct: true },
      { text: "your", correct: false },
      { text: "all", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'wonderful'."
  },
  {
    id: 18,
    prompt: "Apa arti dari kalimat: \"Do you fight with your siblings?\"?",
    options: [
      { text: "Apa kamu berantem sama saudaramu?", correct: true },
      { text: "Dia terlihat sangat muda.", correct: false },
      { text: "Belum, ada apa?", correct: false }
    ],
    explanation: "Kalimat \"Do you fight with your siblings?\" memiliki arti \"Apa kamu berantem sama saudaramu?\"."
  },
  {
    id: 19,
    prompt: "Bagaimana cara mengatakan: \"Orang-orang sering bilang begitu.\"?",
    options: [
      { text: "People say that all the time.", correct: true },
      { text: "Do you see your cousins often?", correct: false },
      { text: "Sometimes it is lonely, but it is okay.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Orang-orang sering bilang begitu.\" adalah \"People say that all the time.\"."
  },
  {
    id: 20,
    prompt: "Lengkapi kalimat: \"Yes, she is the youngest ___ the family.\"\n(Arti: Ya, dia yang paling muda di keluarga.)",
    options: [
      { text: "No", correct: false },
      { text: "in", correct: true },
      { text: "Oh", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'in'."
  }
];

const ElemSpeakingLesson3: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_speaking', 3);
  const nextLessonPath = '/modul/english/elementary/speaking/lesson-4';
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
      alert("Latihan Selesai! Kamu sangat mengerti kosakata keluargamu.");
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
      lessonLabel={"Elementary Speaking Lesson 3"}
      accentColor={"#E74C3C"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Keluarga & Hubungan"
            subtitle="Speaking • Pelajaran 3"
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
                      className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <User className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Keluarga & Kerabatku</h2>
              <p className="text-rose-100 text-sm leading-relaxed mb-4">
                Belajar membicarakan keluarga besar, mertua, dan status hubungan dengan percaya diri.
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
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentScenario.level === 'Formal' ? 'bg-purple-50 text-purple-600' : 'bg-rose-50 text-rose-600'}`}>
                {currentScenario.level}
              </div>
            </div>

            <div className="space-y-6">
              {currentScenario.dialogue.map((line, idx) => (
                <div key={idx} className={`flex gap-4 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-[var(--shadow-card)] ${line.speaker === 'A' ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'
                    }`}>
                    {line.speaker}
                  </div>

                  {/* Bubble */}
                  <div className={`flex-1 max-w-[85%] group`}>
                    <div className={`p-4 rounded-2xl relative ${line.speaker === 'A'
                        ? 'bg-[var(--color-background)] text-[var(--color-text-primary)] rounded-tl-sm'
                        : 'bg-rose-50 text-rose-900 rounded-tr-sm'
                      }`}>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-[10px] font-bold opacity-50 uppercase tracking-wide">{line.name}</span>
                        <button
                          onClick={() => handlePlayAudio(line.text)}
                          className="text-[var(--color-text-muted)] hover:text-rose-600 transition-colors"
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
              <Smile className="w-6 h-6 text-indigo-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-indigo-900 mb-2">Info Budaya</h3>
                <p className="text-sm text-indigo-700 leading-relaxed">
                  Dalam bahasa Inggris, "Cousin" digunakan untuk laki-laki dan perempuan. Kita tidak punya kata khusus untuk "sepupu laki-laki" atau "sepupu perempuan" kecuali kita bilang "my girl cousin" (yang jarang dipakai).
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
                      className="bg-white rounded-[2rem] p-6 shadow-lg shadow-rose-900/5 border border-rose-100 relative overflow-hidden">
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-rose-100 p-2 rounded-xl text-rose-700">
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
                    className="h-full bg-rose-500 transition-all duration-300"
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
                  let btnClass = "border-[var(--color-border)] hover:border-rose-300 hover:bg-[var(--color-background)]";
                  if (isPracticeChecked) {
                    if (opt.correct) btnClass = "bg-green-50 border-sky-500 text-green-700";
                    else if (idx === selectedPracticeOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                    else btnClass = "opacity-50 border-[var(--color-border)]";
                  } else if (selectedPracticeOption === idx) {
                    btnClass = "border-rose-500 bg-rose-50 text-rose-700";
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
export default ElemSpeakingLesson3;