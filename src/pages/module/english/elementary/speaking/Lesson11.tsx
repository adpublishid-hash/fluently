import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Trophy, Star, Play } from 'lucide-react';
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
    title: "Free Time",
    context: "Mengobrol dengan teman baru.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Alex', text: "What do you do in your free time?", translation: "Apa yang kamu lakukan di waktu luang?" },
      { speaker: 'B', name: 'Ben', text: "I usually watch movies or read books.", translation: "Saya biasanya nonton film atau baca buku." },
      { speaker: 'A', name: 'Alex', text: "Do you play any sports?", translation: "Apakah kamu main olahraga?" },
      { speaker: 'B', name: 'Ben', text: "No, I prefer indoor activities.", translation: "Tidak, saya lebih suka aktivitas dalam ruangan." }
    ]
  },
  {
    id: 'c2',
    title: "Sports Activity",
    context: "Merencanakan akhir pekan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Sam', text: "Do you want to play tennis this Saturday?", translation: "Mau main tenis Sabtu ini?" },
      { speaker: 'B', name: 'Mia', text: "I can't. I go swimming every Saturday.", translation: "Gak bisa. Saya pergi berenang setiap Sabtu." },
      { speaker: 'A', name: 'Sam', text: "Wow, you are very active.", translation: "Wow, kamu aktif sekali." },
      { speaker: 'B', name: 'Mia', text: "I also do yoga on Sundays.", translation: "Saya juga melakukan yoga di hari Minggu." }
    ]
  },
  {
    id: 'c3',
    title: "Musical Instruments",
    context: "Bicara tentang keahlian.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tom', text: "Can you play the guitar?", translation: "Bisa main gitar?" },
      { speaker: 'B', name: 'Jerry', text: "Yes, but I am not very good.", translation: "Bisa, tapi saya tidak terlalu jago." },
      { speaker: 'A', name: 'Tom', text: "I want to learn the piano.", translation: "Saya ingin belajar piano." },
      { speaker: 'B', name: 'Jerry', text: "We can start a band!", translation: "Kita bisa bikin band!" }
    ]
  },
  {
    id: 'c4',
    title: "Movie Genres",
    context: "Memilih film.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Jane', text: "Do you like horror movies?", translation: "Kamu suka film horor?" },
      { speaker: 'B', name: 'Max', text: "No, I hate them. They are too scary.", translation: "Gak, saya benci. Terlalu menakutkan." },
      { speaker: 'A', name: 'Jane', text: "What kind of movies do you like?", translation: "Jenis film apa yang kamu suka?" },
      { speaker: 'B', name: 'Max', text: "I enjoy comedies and action films.", translation: "Saya menikmati komedi dan film aksi." }
    ]
  },
  {
    id: 'c5',
    title: "Hiking Frequency",
    context: "Membahas perjalanan luar ruangan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Cole', text: "How often do you go hiking?", translation: "Seberapa sering kamu pergi mendaki?" },
      { speaker: 'B', name: 'Lia', text: "I go about once a month.", translation: "Saya pergi sekitar sebulan sekali." },
      { speaker: 'A', name: 'Cole', text: "Is it far from here?", translation: "Apakah jauh dari sini?" },
      { speaker: 'B', name: 'Lia', text: "Yes, it takes two hours to drive there.", translation: "Ya, butuh dua jam menyetir ke sana." }
    ]
  },
  {
    id: 'c6',
    title: "Baking a Cake",
    context: "Mencium bau makanan di dapur.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Roommate', text: "I smell something good. Are you cooking?", translation: "Saya mencium bau enak. Kamu lagi masak?" },
      { speaker: 'B', name: 'You', text: "Yes, I am baking a chocolate cake.", translation: "Ya, saya sedang memanggang kue cokelat." },
      { speaker: 'A', name: 'Roommate', text: "I didn't know you like baking.", translation: "Saya tidak tahu kamu suka bikin kue." },
      { speaker: 'B', name: 'You', text: "It is my new hobby.", translation: "Ini hobi baru saya." }
    ]
  },
  {
    id: 'c7',
    title: "Photography",
    context: "Melihat kamera.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tourist', text: "That is a nice camera.", translation: "Kameranya bagus." },
      { speaker: 'B', name: 'Photographer', text: "Thanks. I love taking photos of nature.", translation: "Makasih. Saya suka memfoto alam." },
      { speaker: 'A', name: 'Tourist', text: "Can you take a picture of me?", translation: "Bisa tolong fotoin saya?" },
      { speaker: 'B', name: 'Photographer', text: "Sure, smile for the camera!", translation: "Tentu, senyum ke kamera!" }
    ]
  },
  {
    id: 'c8',
    title: "Video Games",
    context: "Dua gamer bicara.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Kid 1', text: "Do you play video games?", translation: "Kamu main video game?" },
      { speaker: 'B', name: 'Kid 2', text: "Sometimes, when I am bored.", translation: "Kadang-kadang, kalau lagi bosan." },
      { speaker: 'A', name: 'Kid 1', text: "Have you tried the new racing game?", translation: "Sudah coba game balapan yang baru?" },
      { speaker: 'B', name: 'Kid 2', text: "Not yet. Is it fun?", translation: "Belum. Seru gak?" }
    ]
  },
  {
    id: 'c9',
    title: "Gardening",
    context: "Memuji tetangga.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Neighbor 1', text: "Your garden looks beautiful.", translation: "Kebunmu terlihat indah." },
      { speaker: 'B', name: 'Neighbor 2', text: "Thank you. I spend a lot of time here.", translation: "Terima kasih. Saya menghabiskan banyak waktu di sini." },
      { speaker: 'A', name: 'Neighbor 1', text: "Growing flowers must be hard work.", translation: "Menanam bunga pasti kerja keras." },
      { speaker: 'B', name: 'Neighbor 2', text: "It is relaxing for me.", translation: "Ini menenangkan buat saya." }
    ]
  },
  {
    id: 'c10',
    title: "Joining a Club",
    context: "Meminta informasi.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Student', text: "I want to join the chess club.", translation: "Saya ingin bergabung dengan klub catur." },
      { speaker: 'B', name: 'Member', text: "That sounds interesting. When do they meet?", translation: "Kedengarannya menarik. Kapan mereka kumpul?" },
      { speaker: 'A', name: 'Student', text: "Every Tuesday evening at the library.", translation: "Setiap Selasa malam di perpustakaan." },
      { speaker: 'B', name: 'Member', text: "Maybe I will come with you.", translation: "Mungkin saya akan ikut denganmu." }
    ]
  }
];

const PRACTICE_QUESTIONS = [
{
    id: 1,
    prompt: "I ___ swimming every morning.",
    options: [
      { text: "go", correct: true },
      { text: "play", correct: false },
      { text: "do", correct: false }
    ],
    explanation: "Gunakan 'GO' untuk aktivitas berakhiran -ing (go swimming, go hiking)."
  },
  {
    id: 2,
    prompt: "She ___ playing the guitar.",
    options: [
      { text: "want", correct: false },
      { text: "interested", correct: false },
      { text: "likes", correct: true }
    ],
    explanation: "She likes + verb-ing. 'Want' perlu 'to' (wants to play)."
  },
  {
    id: 3,
    prompt: "We ___ football on Sundays.",
    options: [
      { text: "do", correct: false },
      { text: "go", correct: false },
      { text: "play", correct: true }
    ],
    explanation: "Gunakan 'PLAY' untuk olahraga bola dan permainan (play football, play chess)."
  },
  {
    id: 4,
    prompt: "He ___ karate.",
    options: [
      { text: "goes", correct: false },
      { text: "does", correct: true },
      { text: "plays", correct: false }
    ],
    explanation: "Gunakan 'DO' untuk latihan individu dan bela diri (do karate, do yoga)."
  },
  {
    id: 5,
    prompt: "I enjoy ___ movies.",
    options: [
      { text: "watching", correct: true },
      { text: "watch", correct: false },
      { text: "watched", correct: false }
    ],
    explanation: "Setelah 'enjoy', selalu gunakan gerund (bentuk -ing)."
  },
  {
    id: 6,
    prompt: "Apa arti dari kalimat: \"We can start a band!\"?",
    options: [
      { text: "Kita bisa bikin band!", correct: true },
      { text: "Saya menikmati komedi dan film aksi.", correct: false },
      { text: "Sudah coba game balapan yang baru?", correct: false }
    ],
    explanation: "Kalimat \"We can start a band!\" memiliki arti \"Kita bisa bikin band!\"."
  },
  {
    id: 7,
    prompt: "Bagaimana cara mengatakan: \"Saya ingin bergabung dengan klub catur.\"?",
    options: [
      { text: "I want to join the chess club.", correct: true },
      { text: "Do you play any sports?", correct: false },
      { text: "We can start a band!", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Saya ingin bergabung dengan klub catur.\" adalah \"I want to join the chess club.\"."
  },
  {
    id: 8,
    prompt: "Lengkapi kalimat: \"___ go about once a month.\"\n(Arti: Saya pergi sekitar sebulan sekali.)",
    options: [
      { text: "garden", correct: false },
      { text: "I", correct: true },
      { text: "good", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'I'."
  },
  {
    id: 9,
    prompt: "Apa arti dari kalimat: \"Your garden looks beautiful.\"?",
    options: [
      { text: "Kebunmu terlihat indah.", correct: true },
      { text: "Menanam bunga pasti kerja keras.", correct: false },
      { text: "Tidak, saya lebih suka aktivitas dalam ruangan.", correct: false }
    ],
    explanation: "Kalimat \"Your garden looks beautiful.\" memiliki arti \"Kebunmu terlihat indah.\"."
  },
  {
    id: 10,
    prompt: "Bagaimana cara mengatakan: \"Saya mencium bau enak. Kamu lagi masak?\"?",
    options: [
      { text: "I smell something good. Are you cooking?", correct: true },
      { text: "Can you take a picture of me?", correct: false },
      { text: "It is relaxing for me.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Saya mencium bau enak. Kamu lagi masak?\" adalah \"I smell something good. Are you cooking?\"."
  },
  {
    id: 11,
    prompt: "Lengkapi kalimat: \"Thanks. I love taking photos ___ nature.\"\n(Arti: Makasih. Saya suka memfoto alam.)",
    options: [
      { text: "is", correct: false },
      { text: "of", correct: true },
      { text: "How", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'of'."
  },
  {
    id: 12,
    prompt: "Apa arti dari kalimat: \"How often do you go hiking?\"?",
    options: [
      { text: "Kamu main video game?", correct: false },
      { text: "Kadang-kadang, kalau lagi bosan.", correct: false },
      { text: "Seberapa sering kamu pergi mendaki?", correct: true }
    ],
    explanation: "Kalimat \"How often do you go hiking?\" memiliki arti \"Seberapa sering kamu pergi mendaki?\"."
  },
  {
    id: 13,
    prompt: "Bagaimana cara mengatakan: \"Ini hobi baru saya.\"?",
    options: [
      { text: "Do you play video games?", correct: false },
      { text: "I want to learn the piano.", correct: false },
      { text: "It is my new hobby.", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Ini hobi baru saya.\" adalah \"It is my new hobby.\"."
  },
  {
    id: 14,
    prompt: "Lengkapi kalimat: \"Do you like ___ movies?\"\n(Arti: Kamu suka film horor?)",
    options: [
      { text: "horror", correct: true },
      { text: "free", correct: false },
      { text: "must", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'horror'."
  },
  {
    id: 15,
    prompt: "Apa arti dari kalimat: \"Growing flowers must be hard work.\"?",
    options: [
      { text: "Apakah kamu main olahraga?", correct: false },
      { text: "Menanam bunga pasti kerja keras.", correct: true },
      { text: "Setiap Selasa malam di perpustakaan.", correct: false }
    ],
    explanation: "Kalimat \"Growing flowers must be hard work.\" memiliki arti \"Menanam bunga pasti kerja keras.\"."
  },
  {
    id: 16,
    prompt: "Bagaimana cara mengatakan: \"Apa yang kamu lakukan di waktu luang?\"?",
    options: [
      { text: "Sometimes, when I am bored.", correct: false },
      { text: "Wow, you are very active.", correct: false },
      { text: "What do you do in your free time?", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Apa yang kamu lakukan di waktu luang?\" adalah \"What do you do in your free time?\"."
  },
  {
    id: 17,
    prompt: "Lengkapi kalimat: \"Is it ___ from here?\"\n(Arti: Apakah jauh dari sini?)",
    options: [
      { text: "two", correct: false },
      { text: "didn't", correct: false },
      { text: "far", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'far'."
  },
  {
    id: 18,
    prompt: "Apa arti dari kalimat: \"Yes, it takes two hours to drive there.\"?",
    options: [
      { text: "Jenis film apa yang kamu suka?", correct: false },
      { text: "Wow, kamu aktif sekali.", correct: false },
      { text: "Ya, butuh dua jam menyetir ke sana.", correct: true }
    ],
    explanation: "Kalimat \"Yes, it takes two hours to drive there.\" memiliki arti \"Ya, butuh dua jam menyetir ke sana.\"."
  },
  {
    id: 19,
    prompt: "Bagaimana cara mengatakan: \"Saya tidak tahu kamu suka bikin kue.\"?",
    options: [
      { text: "That sounds interesting. When do they meet?", correct: false },
      { text: "I didn't know you like baking.", correct: true },
      { text: "Can you play the guitar?", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Saya tidak tahu kamu suka bikin kue.\" adalah \"I didn't know you like baking.\"."
  },
  {
    id: 20,
    prompt: "Lengkapi kalimat: \"Do ___ play video games?\"\n(Arti: Kamu main video game?)",
    options: [
      { text: "a", correct: false },
      { text: "you", correct: true },
      { text: "nice", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'you'."
  }
];

const ElemSpeakingLesson11: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_speaking', 11);
  const nextLessonPath = '/modul/english/elementary/speaking/lesson-12';
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
      alert("Latihan Selesai! Bersenang-senanglah dengan hobimu.");
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
      lessonLabel={"Elementary Speaking Lesson 11"}
      accentColor={"#E74C3C"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Hobi & Waktu Luang"
            subtitle="Speaking • Pelajaran 11"
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
              <Star className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Kesenangan & Permainan</h2>
              <p className="text-lime-100 text-sm leading-relaxed mb-4">
                Bicarakan apa yang kamu suka! Belajar mendiskusikan olahraga, musik, film, dan cara menghabiskan akhir pekan.
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
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentScenario.level === 'Formal' ? 'bg-indigo-50 text-indigo-600' : 'bg-lime-50 text-lime-600'}`}>
                {currentScenario.level}
              </div>
            </div>

            <div className="space-y-6">
              {currentScenario.dialogue.map((line, idx) => (
                <div key={idx} className={`flex gap-4 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-[var(--shadow-card)] ${line.speaker === 'A' ? 'bg-gray-100 text-[var(--color-text-secondary)]' : 'bg-lime-100 text-lime-600'
                    }`}>
                    {line.speaker}
                  </div>

                  {/* Bubble */}
                  <div className={`flex-1 max-w-[85%] group`}>
                    <div className={`p-4 rounded-2xl relative ${line.speaker === 'A'
                        ? 'bg-[var(--color-background)] text-[var(--color-text-primary)] rounded-tl-sm'
                        : 'bg-lime-50 text-lime-900 rounded-tr-sm'
                      }`}>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-[10px] font-bold opacity-50 uppercase tracking-wide">{line.name}</span>
                        <button
                          onClick={() => handlePlayAudio(line.text)}
                          className="text-[var(--color-text-muted)] hover:text-lime-600 transition-colors"
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
                      className="bg-gray-50 rounded-2xl p-6 border border-sky-100">
            <div className="flex items-start gap-4">
              <Play size={24} />
              <div>
                <h3 className="font-bold text-teal-900 mb-2">Tips Pro: Play vs Go vs Do</h3>
                <p className="text-sm text-[var(--color-primary)] leading-relaxed">
                  <b>Play</b>: permainan bola, olahraga tim (football, chess, guitar). <br />
                  <b>Go</b>: aktivitas berakhiran -ing (swimming, hiking). <br />
                  <b>Do</b>: latihan individu (yoga, karate, puzzles).
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
                      className="bg-white rounded-[2rem] p-6 shadow-lg shadow-lime-900/5 border border-lime-100 relative overflow-hidden">
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-lime-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-lime-100 p-2 rounded-xl text-lime-700">
                  <Trophy className="w-6 h-6" />
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
                    className="h-full bg-lime-500 transition-all duration-300"
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
                  let btnClass = "border-[var(--color-border)] hover:border-lime-300 hover:bg-[var(--color-background)]";
                  if (isPracticeChecked) {
                    if (opt.correct) btnClass = "bg-green-50 border-sky-500 text-green-700";
                    else if (idx === selectedPracticeOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                    else btnClass = "opacity-50 border-[var(--color-border)]";
                  } else if (selectedPracticeOption === idx) {
                    btnClass = "border-lime-500 bg-lime-50 text-lime-700";
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
export default ElemSpeakingLesson11;