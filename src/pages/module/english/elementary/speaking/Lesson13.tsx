import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, Smile, Gift } from 'lucide-react';
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
    title: "Party Invitation",
    context: "Mengajak teman.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tom', text: "Would you like to come to my party?", translation: "Maukah kamu datang ke pestaku?" },
      { speaker: 'B', name: 'Jerry', text: "I would love to! When is it?", translation: "Aku mau banget! Kapan itu?" },
      { speaker: 'A', name: 'Tom', text: "It is this Saturday at 7 PM.", translation: "Sabtu ini jam 7 malam." },
      { speaker: 'B', name: 'Jerry', text: "Great. Can I bring anything?", translation: "Bagus. Bolehkah aku membawa sesuatu?" }
    ]
  },
  {
    id: 'c2',
    title: "Dinner Invitation",
    context: "Mengundang rekan kerja.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Colleague', text: "Would you like to join us for dinner?", translation: "Apakah Anda ingin bergabung makan malam bersama kami?" },
      { speaker: 'B', name: 'You', text: "That is very kind of you.", translation: "Anda sangat baik sekali." },
      { speaker: 'A', name: 'Colleague', text: "We are going to an Italian restaurant.", translation: "Kami akan pergi ke restoran Italia." },
      { speaker: 'B', name: 'You', text: "Sounds delicious. I will join you.", translation: "Kedengarannya enak. Saya akan ikut." }
    ]
  },
  {
    id: 'c3',
    title: "Refusing Politely",
    context: "Menolak undangan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Anna', text: "Do you want to go to the cinema?", translation: "Apa kamu mau pergi ke bioskop?" },
      { speaker: 'B', name: 'Ben', text: "I'm sorry, I can't. I am busy.", translation: "Maaf, aku tidak bisa. Aku sibuk." },
      { speaker: 'A', name: 'Anna', text: "Maybe next time then.", translation: "Mungkin lain kali kalau begitu." },
      { speaker: 'B', name: 'Ben', text: "Yes, let's try again next week.", translation: "Ya, ayo coba lagi minggu depan." }
    ]
  },
  {
    id: 'c4',
    title: "Arriving at a Party",
    context: "Menyapa tuan rumah.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Guest', text: "Hi! Thanks for inviting me.", translation: "Hai! Terima kasih sudah mengundangku." },
      { speaker: 'B', name: 'Host', text: "I am glad you could make it.", translation: "Aku senang kamu bisa datang." },
      { speaker: 'A', name: 'Guest', text: "Here is a small gift for you.", translation: "Ini ada hadiah kecil untukmu." },
      { speaker: 'B', name: 'Host', text: "You didn't have to! Come on in.", translation: "Kamu tidak perlu repot-repot! Ayo masuk." }
    ]
  },
  {
    id: 'c5',
    title: "Small Talk",
    context: "Bicara dengan orang asing.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Person 1', text: "Nice weather today, isn't it?", translation: "Cuaca hari ini bagus, kan?" },
      { speaker: 'B', name: 'Person 2', text: "Yes, it is lovely.", translation: "Ya, indah sekali." },
      { speaker: 'A', name: 'Person 1', text: "Do you live around here?", translation: "Apakah Anda tinggal di sekitar sini?" },
      { speaker: 'B', name: 'Person 2', text: "No, I am just visiting.", translation: "Tidak, saya hanya berkunjung." }
    ]
  },
  {
    id: 'c6',
    title: "Complimenting",
    context: "Memuji tuan rumah.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Guest', text: "Your house is beautiful.", translation: "Rumahmu indah sekali." },
      { speaker: 'B', name: 'Host', text: "Thank you. Make yourself at home.", translation: "Terima kasih. Anggap saja rumah sendiri." },
      { speaker: 'A', name: 'Guest', text: "The food is also delicious.", translation: "Makanannya juga enak." },
      { speaker: 'B', name: 'Host', text: "I am happy you like it.", translation: "Aku senang kamu menyukainya." }
    ]
  },
  {
    id: 'c7',
    title: "Introducing a Friend",
    context: "Pertemuan sosial.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'You', text: "Have you met my friend, Sarah?", translation: "Sudah kenal teman saya, Sarah?" },
      { speaker: 'B', name: 'Bob', text: "No, I haven't. Hi Sarah.", translation: "Belum. Hai Sarah." },
      { speaker: 'A', name: 'You', text: "She is visiting from London.", translation: "Dia berkunjung dari London." },
      { speaker: 'B', name: 'Bob', text: "Nice to meet you, Sarah.", translation: "Senang bertemu denganmu, Sarah." }
    ]
  },
  {
    id: 'c8',
    title: "Leaving Early",
    context: "Berpamitan.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Guest', text: "I'm afraid I have to leave now.", translation: "Sepertinya saya harus pergi sekarang." },
      { speaker: 'B', name: 'Host', text: "So soon? The party just started.", translation: "Secepat ini? Pestanya baru mulai." },
      { speaker: 'A', name: 'Guest', text: "I have to work early tomorrow.", translation: "Saya harus kerja pagi-pagi besok." },
      { speaker: 'B', name: 'Host', text: "I understand. Thanks for coming.", translation: "Saya mengerti. Terima kasih sudah datang." }
    ]
  },
  {
    id: 'c9',
    title: "Wedding Congrats",
    context: "Mengucapkan selamat pada pasangan.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Guest', text: "Congratulations on your wedding!", translation: "Selamat atas pernikahan kalian!" },
      { speaker: 'B', name: 'Groom', text: "Thank you very much.", translation: "Terima kasih banyak." },
      { speaker: 'A', name: 'Guest', text: "You both look very happy.", translation: "Kalian berdua terlihat sangat bahagia." },
      { speaker: 'B', name: 'Bride', text: "We are. Thank you for being here.", translation: "Iya. Terima kasih sudah hadir." }
    ]
  },
  {
    id: 'c10',
    title: "Thank You",
    context: "Setelah makan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Guest', text: "Thank you for the lovely dinner.", translation: "Terima kasih atas makan malam yang indah." },
      { speaker: 'B', name: 'Host', text: "You are very welcome.", translation: "Sama-sama." },
      { speaker: 'A', name: 'Guest', text: "I really enjoyed the pasta.", translation: "Aku sangat menikmati pastanya." },
      { speaker: 'B', name: 'Host', text: "I will make it again next time.", translation: "Aku akan buat lagi lain kali." }
    ]
  }
];

const PRACTICE_QUESTIONS = [
{
    id: 1,
    prompt: "Would you ___ to come to my party?",
    options: [
      { text: "like", correct: true },
      { text: "love", correct: false },
      { text: "want", correct: false }
    ],
    explanation: "'Would you like' adalah cara sopan untuk mengundang seseorang."
  },
  {
    id: 2,
    prompt: "I'm sorry, I ___ go. I am busy.",
    options: [
      { text: "don't", correct: false },
      { text: "won't", correct: false },
      { text: "can't", correct: true }
    ],
    explanation: "'I can't' adalah cara standar menolak undangan."
  },
  {
    id: 3,
    prompt: "Make yourself at ___.",
    options: [
      { text: "room", correct: false },
      { text: "home", correct: true },
      { text: "house", correct: false }
    ],
    explanation: "'Make yourself at home' berarti 'silakan merasa nyaman/anggap rumah sendiri'."
  },
  {
    id: 4,
    prompt: "Have you ___ my friend?",
    options: [
      { text: "meet", correct: false },
      { text: "meeting", correct: false },
      { text: "met", correct: true }
    ],
    explanation: "Present perfect tense: Have you met? (Sudahkah kamu bertemu/kenal?)"
  },
  {
    id: 5,
    prompt: "I am ___ you could come.",
    options: [
      { text: "sad", correct: false },
      { text: "glad", correct: true },
      { text: "mad", correct: false }
    ],
    explanation: "Glad berarti senang atau gembira."
  },
  {
    id: 6,
    prompt: "Apa arti dari kalimat: \"I really enjoyed the pasta.\"?",
    options: [
      { text: "Apakah Anda ingin bergabung makan malam bersama kami?", correct: false },
      { text: "Aku sangat menikmati pastanya.", correct: true },
      { text: "Sepertinya saya harus pergi sekarang.", correct: false }
    ],
    explanation: "Kalimat \"I really enjoyed the pasta.\" memiliki arti \"Aku sangat menikmati pastanya.\"."
  },
  {
    id: 7,
    prompt: "Bagaimana cara mengatakan: \"Saya harus kerja pagi-pagi besok.\"?",
    options: [
      { text: "Yes, let's try again next week.", correct: false },
      { text: "I have to work early tomorrow.", correct: true },
      { text: "I would love to! When is it?", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Saya harus kerja pagi-pagi besok.\" adalah \"I have to work early tomorrow.\"."
  },
  {
    id: 8,
    prompt: "Lengkapi kalimat: \"The ___ is also delicious.\"\n(Arti: Makanannya juga enak.)",
    options: [
      { text: "I", correct: false },
      { text: "food", correct: true },
      { text: "visiting", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'food'."
  },
  {
    id: 9,
    prompt: "Apa arti dari kalimat: \"No, I am just visiting.\"?",
    options: [
      { text: "Sepertinya saya harus pergi sekarang.", correct: false },
      { text: "Tidak, saya hanya berkunjung.", correct: true },
      { text: "Cuaca hari ini bagus, kan?", correct: false }
    ],
    explanation: "Kalimat \"No, I am just visiting.\" memiliki arti \"Tidak, saya hanya berkunjung.\"."
  },
  {
    id: 10,
    prompt: "Bagaimana cara mengatakan: \"Maaf, aku tidak bisa. Aku sibuk.\"?",
    options: [
      { text: "We are. Thank you for being here.", correct: false },
      { text: "Thank you very much.", correct: false },
      { text: "I'm sorry, I can't. I am busy.", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Maaf, aku tidak bisa. Aku sibuk.\" adalah \"I'm sorry, I can't. I am busy.\"."
  },
  {
    id: 11,
    prompt: "Lengkapi kalimat: \"You both look ___ happy.\"\n(Arti: Kalian berdua terlihat sangat bahagia.)",
    options: [
      { text: "my", correct: false },
      { text: "7", correct: false },
      { text: "very", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'very'."
  },
  {
    id: 12,
    prompt: "Apa arti dari kalimat: \"Have you met my friend, Sarah?\"?",
    options: [
      { text: "Sudah kenal teman saya, Sarah?", correct: true },
      { text: "Belum. Hai Sarah.", correct: false },
      { text: "Aku senang kamu menyukainya.", correct: false }
    ],
    explanation: "Kalimat \"Have you met my friend, Sarah?\" memiliki arti \"Sudah kenal teman saya, Sarah?\"."
  },
  {
    id: 13,
    prompt: "Bagaimana cara mengatakan: \"Sabtu ini jam 7 malam.\"?",
    options: [
      { text: "It is this Saturday at 7 PM.", correct: true },
      { text: "Yes, it is lovely.", correct: false },
      { text: "You didn't have to! Come on in.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Sabtu ini jam 7 malam.\" adalah \"It is this Saturday at 7 PM.\"."
  },
  {
    id: 14,
    prompt: "Lengkapi kalimat: \"Nice weather ___, isn't it?\"\n(Arti: Cuaca hari ini bagus, kan?)",
    options: [
      { text: "today", correct: true },
      { text: "That", correct: false },
      { text: "join", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'today'."
  },
  {
    id: 15,
    prompt: "Apa arti dari kalimat: \"Would you like to join us for dinner?\"?",
    options: [
      { text: "Apakah Anda ingin bergabung makan malam bersama kami?", correct: true },
      { text: "Kalian berdua terlihat sangat bahagia.", correct: false },
      { text: "Anda sangat baik sekali.", correct: false }
    ],
    explanation: "Kalimat \"Would you like to join us for dinner?\" memiliki arti \"Apakah Anda ingin bergabung makan malam bersama kami?\"."
  },
  {
    id: 16,
    prompt: "Bagaimana cara mengatakan: \"Anda sangat baik sekali.\"?",
    options: [
      { text: "I'm sorry, I can't. I am busy.", correct: false },
      { text: "I understand. Thanks for coming.", correct: false },
      { text: "That is very kind of you.", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Anda sangat baik sekali.\" adalah \"That is very kind of you.\"."
  },
  {
    id: 17,
    prompt: "Lengkapi kalimat: \"We are. Thank ___ for being here.\"\n(Arti: Iya. Terima kasih sudah hadir.)",
    options: [
      { text: "you", correct: true },
      { text: "beautiful", correct: false },
      { text: "are", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'you'."
  },
  {
    id: 18,
    prompt: "Apa arti dari kalimat: \"Your house is beautiful.\"?",
    options: [
      { text: "Sabtu ini jam 7 malam.", correct: false },
      { text: "Rumahmu indah sekali.", correct: true },
      { text: "Aku senang kamu bisa datang.", correct: false }
    ],
    explanation: "Kalimat \"Your house is beautiful.\" memiliki arti \"Rumahmu indah sekali.\"."
  },
  {
    id: 19,
    prompt: "Bagaimana cara mengatakan: \"Kami akan pergi ke restoran Italia.\"?",
    options: [
      { text: "I have to work early tomorrow.", correct: false },
      { text: "We are going to an Italian restaurant.", correct: true },
      { text: "Thank you for the lovely dinner.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Kami akan pergi ke restoran Italia.\" adalah \"We are going to an Italian restaurant.\"."
  },
  {
    id: 20,
    prompt: "Lengkapi kalimat: \"I am glad you could ___ it.\"\n(Arti: Aku senang kamu bisa datang.)",
    options: [
      { text: "make", correct: true },
      { text: "to", correct: false },
      { text: "Can", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'make'."
  }
];

const ElemSpeakingLesson13: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_speaking', 13);
  const nextLessonPath = '/modul/english/elementary/speaking/lesson-14';
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
      alert("Latihan Selesai! Kamu sangat sopan.");
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
      lessonLabel={"Elementary Speaking Lesson 13"}
      accentColor={"#E74C3C"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Situasi Sosial"
            subtitle="Speaking • Pelajaran 13"
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
                      className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Gift className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Mari Merayakan!</h2>
              <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                Kuasai seni interaksi sosial. Belajar cara mengundang teman, menerima undangan dengan sopan, dan berbasa-basi di pesta.
              </p>
              <div className="flex gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">40 Baris</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">10 Skenario</span>
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
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentScenario.level === 'Formal' ? 'bg-indigo-50 text-indigo-600' : 'bg-violet-50 text-violet-600'}`}>
                {currentScenario.level}
              </div>
            </div>

            <div className="space-y-6">
              {currentScenario.dialogue.map((line, idx) => (
                <div key={idx} className={`flex gap-4 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-[var(--shadow-card)] ${line.speaker === 'A' ? 'bg-gray-100 text-[var(--color-text-secondary)]' : 'bg-indigo-100 text-indigo-600'
                    }`}>
                    {line.speaker}
                  </div>

                  {/* Bubble */}
                  <div className={`flex-1 max-w-[85%] group`}>
                    <div className={`p-4 rounded-2xl relative ${line.speaker === 'A'
                        ? 'bg-[var(--color-background)] text-[var(--color-text-primary)] rounded-tl-sm'
                        : 'bg-indigo-50 text-indigo-900 rounded-tr-sm'
                      }`}>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-[10px] font-bold opacity-50 uppercase tracking-wide">{line.name}</span>
                        <button
                          onClick={() => handlePlayAudio(line.text)}
                          className="text-[var(--color-text-muted)] hover:text-indigo-600 transition-colors"
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
                      className="bg-violet-50 rounded-2xl p-6 border border-violet-100">
            <div className="flex items-start gap-4">
              <Smile className="w-6 h-6 text-violet-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-violet-900 mb-2">Tips Pro: "Would you like...?"</h3>
                <p className="text-sm text-violet-700 leading-relaxed">
                  Ini adalah frasa ajaib untuk kesopanan! <br />
                  Gunakan untuk mengundang: "Would you like to come?" (Maukah kamu datang?)<br />
                  Gunakan untuk menawarkan: "Would you like some tea?" (Mau teh?)
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
                      className="bg-white rounded-[2rem] p-6 shadow-lg shadow-indigo-900/5 border border-indigo-100 relative overflow-hidden">
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-100 p-2 rounded-xl text-indigo-700">
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
                    className="h-full bg-indigo-500 transition-all duration-300"
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
                  let btnClass = "border-[var(--color-border)] hover:border-indigo-300 hover:bg-[var(--color-background)]";
                  if (isPracticeChecked) {
                    if (opt.correct) btnClass = "bg-green-50 border-sky-500 text-green-700";
                    else if (idx === selectedPracticeOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                    else btnClass = "opacity-50 border-[var(--color-border)]";
                  } else if (selectedPracticeOption === idx) {
                    btnClass = "border-indigo-500 bg-indigo-50 text-indigo-700";
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
export default ElemSpeakingLesson13;