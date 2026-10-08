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
    title: "Identifying Someone",
    context: "Mencari teman di keramaian.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Sam', text: "Do you see Tom anywhere?", translation: "Apa kamu lihat Tom?" },
      { speaker: 'B', name: 'Ben', text: "I don't know him. What does he look like?", translation: "Aku tidak kenal dia. Seperti apa rupanya?" },
      { speaker: 'A', name: 'Sam', text: "He is tall and has short blonde hair.", translation: "Dia tinggi dan punya rambut pirang pendek." },
      { speaker: 'B', name: 'Ben', text: "Oh, I see him over there by the door.", translation: "Oh, aku lihat dia di sana dekat pintu." }
    ]
  },
  {
    id: 'c2',
    title: "New Roommate",
    context: "Bertanya tentang kepribadian.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Lisa', text: "What is your new roommate like?", translation: "Seperti apa sifat teman sekamarmu yang baru?" },
      { speaker: 'B', name: 'Mia', text: "She is very friendly and outgoing.", translation: "Dia sangat ramah dan mudah bergaul." },
      { speaker: 'A', name: 'Lisa', text: "That is lucky. Is she quiet?", translation: "Beruntung sekali. Apa dia pendiam?" },
      { speaker: 'B', name: 'Mia', text: "Not really, she loves to talk!", translation: "Tidak juga, dia suka sekali bicara!" }
    ]
  },
  {
    id: 'c3',
    title: "Family Traits",
    context: "Membandingkan penampilan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Aunt', text: "You look just like your mother.", translation: "Kamu mirip sekali dengan ibumu." },
      { speaker: 'B', name: 'Niece', text: "Really? Everyone says I have her eyes.", translation: "Benarkah? Semua orang bilang aku punya matanya." },
      { speaker: 'A', name: 'Aunt', text: "Yes, and you both have curly hair.", translation: "Ya, dan kalian berdua punya rambut keriting." },
      { speaker: 'B', name: 'Niece', text: "But my personality is like my dad.", translation: "Tapi sifatku seperti ayahku." }
    ]
  },
  {
    id: 'c4',
    title: "Describing a Suspect",
    context: "Melapor ke polisi.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Officer', text: "Can you describe the man you saw?", translation: "Bisakah Anda deskripsikan pria yang Anda lihat?" },
      { speaker: 'B', name: 'Witness', text: "He was middle-aged and had a beard.", translation: "Dia paruh baya dan punya jenggot." },
      { speaker: 'A', name: 'Officer', text: "Was he wearing glasses?", translation: "Apakah dia memakai kacamata?" },
      { speaker: 'B', name: 'Witness', text: "No, but he was wearing a hat.", translation: "Tidak, tapi dia memakai topi." }
    ]
  },
  {
    id: 'c5',
    title: "The New Boss",
    context: "Gosip kantor.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Employee 1', text: "Have you met the new manager?", translation: "Sudah ketemu manajer baru?" },
      { speaker: 'B', name: 'Employee 2', text: "Yes, he seems very serious.", translation: "Ya, dia kelihatannya sangat serius." },
      { speaker: 'A', name: 'Employee 1', text: "Is he strict about time?", translation: "Apa dia ketat soal waktu?" },
      { speaker: 'B', name: 'Employee 2', text: "Very. He is extremely hardworking.", translation: "Sangat. Dia pekerja yang sangat keras." }
    ]
  },
  {
    id: 'c6',
    title: "Blind Date",
    context: "Mendeskripsikan calon pasangan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend', text: "I want to introduce you to my cousin.", translation: "Aku mau kenalkan kamu ke sepupuku." },
      { speaker: 'B', name: 'You', text: "Okay. Is he handsome?", translation: "Oke. Apa dia ganteng?" },
      { speaker: 'A', name: 'Friend', text: "Yes, he is slim and has a nice smile.", translation: "Ya, dia langsing dan punya senyum yang manis." },
      { speaker: 'B', name: 'You', text: "Is he kind?", translation: "Apa dia baik?" }
    ]
  },
  {
    id: 'c7',
    title: "Lost Child",
    context: "Membantu ibu mencari anaknya.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Guard', text: "What is your son wearing?", translation: "Apa yang dipakai anak Anda?" },
      { speaker: 'B', name: 'Mom', text: "He is wearing a red T-shirt.", translation: "Dia pakai kaos merah." },
      { speaker: 'A', name: 'Guard', text: "Does he have dark hair?", translation: "Apa dia berambut gelap?" },
      { speaker: 'B', name: 'Mom', text: "Yes, and he has a small scar on his cheek.", translation: "Ya, dan dia punya bekas luka kecil di pipinya." }
    ]
  },
  {
    id: 'c8',
    title: "Opposite Siblings",
    context: "Membandingkan kakak dan adik.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Guest', text: "Your brother is so quiet.", translation: "Kakakmu sangat pendiam." },
      { speaker: 'B', name: 'Host', text: "Yes, he is very shy.", translation: "Ya, dia sangat pemalu." },
      { speaker: 'A', name: 'Guest', text: "But you are very talkative!", translation: "Tapi kamu sangat banyak bicara!" },
      { speaker: 'B', name: 'Host', text: "I know. We are total opposites.", translation: "Aku tahu. Kami bertolak belakang." }
    ]
  },
  {
    id: 'c9',
    title: "Changes Over Time",
    context: "Bertemu teman lama.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'John', text: "Wow, Dave! You look different.", translation: "Wow, Dave! Kamu terlihat beda." },
      { speaker: 'B', name: 'Dave', text: "Yeah, I gained some weight.", translation: "Ya, berat badanku naik sedikit." },
      { speaker: 'A', name: 'John', text: "And you grew a mustache!", translation: "Dan kamu menumbuhkan kumis!" },
      { speaker: 'B', name: 'Dave', text: "Do you like it? My wife hates it.", translation: "Suka gak? Istriku membencinya." }
    ]
  },
  {
    id: 'c10',
    title: "Celebrity Crush",
    context: "Membicarakan orang terkenal.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Fan 1', text: "Who is your favorite actor?", translation: "Siapa aktor favoritmu?" },
      { speaker: 'B', name: 'Fan 2', text: "I like the one from the action movie.", translation: "Aku suka yang dari film aksi itu." },
      { speaker: 'A', name: 'Fan 1', text: "The muscular guy with blue eyes?", translation: "Pria berotot dengan mata biru itu?" },
      { speaker: 'B', name: 'Fan 2', text: "Yes! He is also very talented.", translation: "Ya! Dia juga sangat berbakat." }
    ]
  }
];

const PRACTICE_QUESTIONS = [
{
    id: 1,
    prompt: "I want to ask about someone's personality. I say:",
    options: [
      { text: "How is he like?", correct: false },
      { text: "What does he look like?", correct: false },
      { text: "What is he like?", correct: true }
    ],
    explanation: "'What is he like?' menanyakan karakter/sifat. 'What does he look like?' menanyakan penampilan."
  },
  {
    id: 2,
    prompt: "He ___ blue eyes.",
    options: [
      { text: "has", correct: true },
      { text: "is", correct: false },
      { text: "have", correct: false }
    ],
    explanation: "Kita gunakan 'have/has' untuk bagian tubuh (mata, rambut, hidung, kaki)."
  },
  {
    id: 3,
    prompt: "She ___ tall and slim.",
    options: [
      { text: "has", correct: false },
      { text: "are", correct: false },
      { text: "is", correct: true }
    ],
    explanation: "Kita gunakan 'is/are' untuk kata sifat yang mendeskripsikan keseluruhan tubuh atau orang (tinggi, pendek, gemuk, bahagia)."
  },
  {
    id: 4,
    prompt: "Someone who doesn't like to work is ___.",
    options: [
      { text: "shy", correct: false },
      { text: "hardworking", correct: false },
      { text: "lazy", correct: true }
    ],
    explanation: "'Lazy' (malas) adalah lawan kata dari hardworking (rajin)."
  },
  {
    id: 5,
    prompt: "He has no hair. He is ___.",
    options: [
      { text: "curly", correct: false },
      { text: "blonde", correct: false },
      { text: "bald", correct: true }
    ],
    explanation: "'Bald' (botak) berarti tidak punya rambut di kepala."
  },
  {
    id: 6,
    prompt: "Apa arti dari kalimat: \"The muscular guy with blue eyes?\"?",
    options: [
      { text: "Apa kamu lihat Tom?", correct: false },
      { text: "Tapi sifatku seperti ayahku.", correct: false },
      { text: "Pria berotot dengan mata biru itu?", correct: true }
    ],
    explanation: "Kalimat \"The muscular guy with blue eyes?\" memiliki arti \"Pria berotot dengan mata biru itu?\"."
  },
  {
    id: 7,
    prompt: "Bagaimana cara mengatakan: \"Wow, Dave! Kamu terlihat beda.\"?",
    options: [
      { text: "Wow, Dave! You look different.", correct: true },
      { text: "Was he wearing glasses?", correct: false },
      { text: "Really? Everyone says I have her eyes.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Wow, Dave! Kamu terlihat beda.\" adalah \"Wow, Dave! You look different.\"."
  },
  {
    id: 8,
    prompt: "Lengkapi kalimat: \"Yes, and you both have ___ hair.\"\n(Arti: Ya, dan kalian berdua punya rambut keriting.)",
    options: [
      { text: "curly", correct: true },
      { text: "tall", correct: false },
      { text: "are", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'curly'."
  },
  {
    id: 9,
    prompt: "Apa arti dari kalimat: \"But you are very talkative!\"?",
    options: [
      { text: "Kamu mirip sekali dengan ibumu.", correct: false },
      { text: "Tapi kamu sangat banyak bicara!", correct: true },
      { text: "Oke. Apa dia ganteng?", correct: false }
    ],
    explanation: "Kalimat \"But you are very talkative!\" memiliki arti \"Tapi kamu sangat banyak bicara!\"."
  },
  {
    id: 10,
    prompt: "Bagaimana cara mengatakan: \"Dia tinggi dan punya rambut pirang pendek.\"?",
    options: [
      { text: "What is your new roommate like?", correct: false },
      { text: "Wow, Dave! You look different.", correct: false },
      { text: "He is tall and has short blonde hair.", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Dia tinggi dan punya rambut pirang pendek.\" adalah \"He is tall and has short blonde hair.\"."
  },
  {
    id: 11,
    prompt: "Lengkapi kalimat: \"Really? Everyone says I have her ___.\"\n(Arti: Benarkah? Semua orang bilang aku punya matanya.)",
    options: [
      { text: "My", correct: false },
      { text: "Was", correct: false },
      { text: "eyes", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'eyes'."
  },
  {
    id: 12,
    prompt: "Apa arti dari kalimat: \"Do you like it? My wife hates it.\"?",
    options: [
      { text: "Suka gak? Istriku membencinya.", correct: true },
      { text: "Tapi kamu sangat banyak bicara!", correct: false },
      { text: "Oke. Apa dia ganteng?", correct: false }
    ],
    explanation: "Kalimat \"Do you like it? My wife hates it.\" memiliki arti \"Suka gak? Istriku membencinya.\"."
  },
  {
    id: 13,
    prompt: "Bagaimana cara mengatakan: \"Apakah dia memakai kacamata?\"?",
    options: [
      { text: "Was he wearing glasses?", correct: true },
      { text: "Yes, and you both have curly hair.", correct: false },
      { text: "Yes, he seems very serious.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Apakah dia memakai kacamata?\" adalah \"Was he wearing glasses?\"."
  },
  {
    id: 14,
    prompt: "Lengkapi kalimat: \"Yes, ___ is very shy.\"\n(Arti: Ya, dia sangat pemalu.)",
    options: [
      { text: "but", correct: false },
      { text: "grew", correct: false },
      { text: "he", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'he'."
  },
  {
    id: 15,
    prompt: "Apa arti dari kalimat: \"And you grew a mustache!\"?",
    options: [
      { text: "Dan kamu menumbuhkan kumis!", correct: true },
      { text: "Ya! Dia juga sangat berbakat.", correct: false },
      { text: "Aku tahu. Kami bertolak belakang.", correct: false }
    ],
    explanation: "Kalimat \"And you grew a mustache!\" memiliki arti \"Dan kamu menumbuhkan kumis!\"."
  },
  {
    id: 16,
    prompt: "Bagaimana cara mengatakan: \"Tidak, tapi dia memakai topi.\"?",
    options: [
      { text: "No, but he was wearing a hat.", correct: true },
      { text: "What is your new roommate like?", correct: false },
      { text: "I don't know him. What does he look like?", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Tidak, tapi dia memakai topi.\" adalah \"No, but he was wearing a hat.\"."
  },
  {
    id: 17,
    prompt: "Lengkapi kalimat: \"She is ___ friendly and outgoing.\"\n(Arti: Dia sangat ramah dan mudah bergaul.)",
    options: [
      { text: "very", correct: true },
      { text: "does", correct: false },
      { text: "do", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'very'."
  },
  {
    id: 18,
    prompt: "Apa arti dari kalimat: \"Yes! He is also very talented.\"?",
    options: [
      { text: "Ya! Dia juga sangat berbakat.", correct: true },
      { text: "Sangat. Dia pekerja yang sangat keras.", correct: false },
      { text: "Dia sangat ramah dan mudah bergaul.", correct: false }
    ],
    explanation: "Kalimat \"Yes! He is also very talented.\" memiliki arti \"Ya! Dia juga sangat berbakat.\"."
  },
  {
    id: 19,
    prompt: "Bagaimana cara mengatakan: \"Aku mau kenalkan kamu ke sepupuku.\"?",
    options: [
      { text: "I want to introduce you to my cousin.", correct: true },
      { text: "Does he have dark hair?", correct: false },
      { text: "Is he strict about time?", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Aku mau kenalkan kamu ke sepupuku.\" adalah \"I want to introduce you to my cousin.\"."
  },
  {
    id: 20,
    prompt: "Lengkapi kalimat: \"Can you describe the man you ___?\"\n(Arti: Bisakah Anda deskripsikan pria yang Anda lihat?)",
    options: [
      { text: "That", correct: false },
      { text: "dark", correct: false },
      { text: "saw", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'saw'."
  }
];

const ElemSpeakingLesson2: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_speaking', 2);
  const nextLessonPath = '/modul/english/elementary/speaking/lesson-3';
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
      alert("Latihan Selesai! Kamu sekarang bisa mendeskripsikan orang.");
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
      lessonLabel={"Elementary Speaking Lesson 2"}
      accentColor={"#E74C3C"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Orang & Kepribadian"
            subtitle="Speaking • Pelajaran 2"
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
                      className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <User className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Mendeskripsikan Orang</h2>
              <p className="text-amber-100 text-sm leading-relaxed mb-4">
                Belajar berbicara tentang penampilan dan kepribadian orang. Apakah dia tinggi? Apa dia pemalu? Ayo cari tahu!
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
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentScenario.level === 'Formal' ? 'bg-purple-50 text-purple-600' : 'bg-amber-50 text-amber-600'}`}>
                {currentScenario.level}
              </div>
            </div>

            <div className="space-y-6">
              {currentScenario.dialogue.map((line, idx) => (
                <div key={idx} className={`flex gap-4 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-[var(--shadow-card)] ${line.speaker === 'A' ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'
                    }`}>
                    {line.speaker}
                  </div>

                  {/* Bubble */}
                  <div className={`flex-1 max-w-[85%] group`}>
                    <div className={`p-4 rounded-2xl relative ${line.speaker === 'A'
                        ? 'bg-[var(--color-background)] text-[var(--color-text-primary)] rounded-tl-sm'
                        : 'bg-amber-50 text-amber-900 rounded-tr-sm'
                      }`}>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-[10px] font-bold opacity-50 uppercase tracking-wide">{line.name}</span>
                        <button
                          onClick={() => handlePlayAudio(line.text)}
                          className="text-[var(--color-text-muted)] hover:text-amber-600 transition-colors"
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
                      className="bg-emerald-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-start gap-4">
              <Smile className="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-emerald-900 mb-2">Kesalahan Umum</h3>
                <p className="text-sm text-emerald-700 leading-relaxed">
                  Hati-hati! <br />
                  <b>"What is he like?"</b> menanyakan kepribadian (baik, lucu). <br />
                  <b>"What does he look like?"</b> menanyakan penampilan (tinggi, pirang).
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
                      className="bg-white rounded-[2rem] p-6 shadow-lg shadow-amber-900/5 border border-amber-100 relative overflow-hidden">
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-100 p-2 rounded-xl text-amber-700">
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
                    className="h-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${((practiceStep + 1) / PRACTICE_QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-[var(--color-text-muted)] text-sm font-bold mb-2">Pilih opsi terbaik:</p>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] leading-snug">
                  {PRACTICE_QUESTIONS[practiceStep].prompt}
                </h3>
              </div>

              <div className="space-y-3">
                {PRACTICE_QUESTIONS[practiceStep].options.map((opt, idx) => {
                  let btnClass = "border-[var(--color-border)] hover:border-amber-300 hover:bg-[var(--color-background)]";
                  if (isPracticeChecked) {
                    if (opt.correct) btnClass = "bg-green-50 border-sky-500 text-green-700";
                    else if (idx === selectedPracticeOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                    else btnClass = "opacity-50 border-[var(--color-border)]";
                  } else if (selectedPracticeOption === idx) {
                    btnClass = "border-amber-500 bg-amber-50 text-amber-700";
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
export default ElemSpeakingLesson2;