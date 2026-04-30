import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, ClipboardList } from 'lucide-react';
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
    title: "Favorite Subject",
    context: "Teman sekelas mengobrol saat istirahat.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tom', text: "What is your favorite subject?", translation: "Apa mata pelajaran favoritmu?" },
      { speaker: 'B', name: 'Jerry', text: "I really like History. It is interesting.", translation: "Aku sangat suka Sejarah. Itu menarik." },
      { speaker: 'A', name: 'Tom', text: "I prefer Math. I like numbers.", translation: "Aku lebih suka Matematika. Aku suka angka." },
      { speaker: 'B', name: 'Jerry', text: "Math is too difficult for me.", translation: "Matematika terlalu sulit buatku." }
    ]
  },
  {
    id: 'c2',
    title: "Borrowing Supplies",
    context: "Di dalam kelas.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Student 1', text: "Excuse me, can I borrow a pen?", translation: "Permisi, bolehkah aku pinjam pulpen?" },
      { speaker: 'B', name: 'Student 2', text: "Sure. Here is a blue one.", translation: "Tentu. Ini yang warna biru." },
      { speaker: 'A', name: 'Student 1', text: "Thanks. I forgot mine at home.", translation: "Makasih. Aku lupa bawa punyaku di rumah." },
      { speaker: 'B', name: 'Student 2', text: "No problem. Just give it back later.", translation: "Tidak masalah. Kembalikan saja nanti." }
    ]
  },
  {
    id: 'c3',
    title: "Homework Help",
    context: "Meminta bantuan teman.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Alice', text: "Did you finish the English homework?", translation: "Apa kamu sudah selesai PR Bahasa Inggris?" },
      { speaker: 'B', name: 'Bob', text: "No, I didn't understand the last part.", translation: "Belum, aku tidak paham bagian terakhirnya." },
      { speaker: 'A', name: 'Alice', text: "I can help you with it after lunch.", translation: "Aku bisa bantu kamu setelah makan siang." },
      { speaker: 'B', name: 'Bob', text: "That would be great. Thank you!", translation: "Itu akan sangat membantu. Terima kasih!" }
    ]
  },
  {
    id: 'c4',
    title: "Late for Class",
    context: "Menjelaskan kepada teman.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend', text: "Why are you late for class?", translation: "Kenapa kamu terlambat masuk kelas?" },
      { speaker: 'B', name: 'You', text: "I missed the bus this morning.", translation: "Aku ketinggalan bus pagi ini." },
      { speaker: 'A', name: 'Friend', text: "The teacher will be angry.", translation: "Gurunya bakal marah." },
      { speaker: 'B', name: 'You', text: "I know. I will apologize to her.", translation: "Aku tahu. Aku akan minta maaf padanya." }
    ]
  },
  {
    id: 'c5',
    title: "University Major",
    context: "Mahasiswa mengobrol.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Student A', text: "What is your major?", translation: "Apa jurusanmu?" },
      { speaker: 'B', name: 'Student B', text: "I am studying Computer Science.", translation: "Saya belajar Ilmu Komputer." },
      { speaker: 'A', name: 'Student A', text: "Is it a hard course?", translation: "Apakah itu kuliah yang sulit?" },
      { speaker: 'B', name: 'Student B', text: "Yes, but I want to be a programmer.", translation: "Ya, tapi saya ingin jadi programmer." }
    ]
  },
  {
    id: 'c6',
    title: "Exam Stress",
    context: "Sebelum ujian besar.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Sam', text: "Are you ready for the big exam?", translation: "Kamu siap buat ujian besarnya?" },
      { speaker: 'B', name: 'Mia', text: "Not really. I am very nervous.", translation: "Gak juga. Aku gugup banget." },
      { speaker: 'A', name: 'Sam', text: "You should study more tonight.", translation: "Kamu harus belajar lagi nanti malam." },
      { speaker: 'B', name: 'Mia', text: "I will study at the library.", translation: "Aku akan belajar di perpustakaan." }
    ]
  },
  {
    id: 'c7',
    title: "In the Library",
    context: "Berbisik.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Librarian', text: "Be quiet, please. We are in the library.", translation: "Harap tenang. Kita di perpustakaan." },
      { speaker: 'B', name: 'Student', text: "Sorry, I was asking for a book.", translation: "Maaf, saya sedang menanyakan buku." },
      { speaker: 'A', name: 'Librarian', text: "You have to whisper here.", translation: "Anda harus berbisik di sini." },
      { speaker: 'B', name: 'Student', text: "Okay, I will be silent.", translation: "Oke, saya akan diam." }
    ]
  },
  {
    id: 'c8',
    title: "Class Schedule",
    context: "Mengecek waktu.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Dan', text: "When is our next break?", translation: "Kapan istirahat kita selanjutnya?" },
      { speaker: 'B', name: 'Kim', text: "It is at 10:30, after Science class.", translation: "Jam 10:30, setelah kelas IPA." },
      { speaker: 'A', name: 'Dan', text: "Good. I am hungry.", translation: "Bagus. Aku lapar." },
      { speaker: 'B', name: 'Kim', text: "Me too. Let's go to the cafeteria.", translation: "Aku juga. Ayo ke kantin." }
    ]
  },
  {
    id: 'c9',
    title: "Learning English",
    context: "Membahas kemampuan bahasa.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Teacher', text: "How long have you learned English?", translation: "Sudah berapa lama kamu belajar bahasa Inggris?" },
      { speaker: 'B', name: 'Student', text: "For about two years now.", translation: "Sudah sekitar dua tahun." },
      { speaker: 'A', name: 'Teacher', text: "Your pronunciation is very good.", translation: "Pengucapanmu sangat bagus." },
      { speaker: 'B', name: 'Student', text: "Thanks, I practice every day.", translation: "Terima kasih, saya latihan setiap hari." }
    ]
  },
  {
    id: 'c10',
    title: "Graduation Plans",
    context: "Membicarakan masa depan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend 1', text: "When do you graduate?", translation: "Kapan kamu wisuda?" },
      { speaker: 'B', name: 'Friend 2', text: "Next year in June.", translation: "Tahun depan bulan Juni." },
      { speaker: 'A', name: 'Friend 1', text: "Do you have a job lined up?", translation: "Apa kamu sudah dapat kerja?" },
      { speaker: 'B', name: 'Friend 2', text: "I hope to find one soon.", translation: "Aku harap segera dapat satu." }
    ]
  }
];

const PRACTICE_QUESTIONS = [
{
    id: 1,
    prompt: "I want to ask for a pen. I say: '___ I borrow a pen?'",
    options: [
      { text: "Do", correct: false },
      { text: "Can", correct: true },
      { text: "Have", correct: false }
    ],
    explanation: "'Can I' atau 'May I' digunakan untuk meminta izin."
  },
  {
    id: 2,
    prompt: "Math, History, and Science are ___.",
    options: [
      { text: "objects", correct: false },
      { text: "subjects", correct: true },
      { text: "projects", correct: false }
    ],
    explanation: "Di sekolah, hal-hal yang kamu pelajari disebut 'Subjects' (Mata Pelajaran)."
  },
  {
    id: 3,
    prompt: "A person who learns at school is a ___.",
    options: [
      { text: "teacher", correct: false },
      { text: "student", correct: true },
      { text: "principal", correct: false }
    ],
    explanation: "Student adalah pelajar. Teacher adalah pengajar."
  },
  {
    id: 4,
    prompt: "To get a degree, you must ___ from university.",
    options: [
      { text: "graduate", correct: true },
      { text: "fail", correct: false },
      { text: "leave", correct: false }
    ],
    explanation: "Graduate berarti berhasil menyelesaikan kursus/kuliah (lulus)."
  },
  {
    id: 5,
    prompt: "If you study hard, you will get a good ___.",
    options: [
      { text: "grade", correct: true },
      { text: "class", correct: false },
      { text: "lesson", correct: false }
    ],
    explanation: "Grade (atau nilai) adalah skor yang kamu dapatkan di ujian."
  },
  {
    id: 6,
    prompt: "Apa arti dari kalimat: \"Not really. I am very nervous.\"?",
    options: [
      { text: "Gak juga. Aku gugup banget.", correct: true },
      { text: "Apa kamu sudah selesai PR Bahasa Inggris?", correct: false },
      { text: "Apakah itu kuliah yang sulit?", correct: false }
    ],
    explanation: "Kalimat \"Not really. I am very nervous.\" memiliki arti \"Gak juga. Aku gugup banget.\"."
  },
  {
    id: 7,
    prompt: "Bagaimana cara mengatakan: \"Anda harus berbisik di sini.\"?",
    options: [
      { text: "You have to whisper here.", correct: true },
      { text: "Thanks. I forgot mine at home.", correct: false },
      { text: "Your pronunciation is very good.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Anda harus berbisik di sini.\" adalah \"You have to whisper here.\"."
  },
  {
    id: 8,
    prompt: "Lengkapi kalimat: \"Next year in ___.\"\n(Arti: Tahun depan bulan Juni.)",
    options: [
      { text: "June", correct: true },
      { text: "later", correct: false },
      { text: "numbers", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'June'."
  },
  {
    id: 9,
    prompt: "Apa arti dari kalimat: \"I prefer Math. I like numbers.\"?",
    options: [
      { text: "Aku lebih suka Matematika. Aku suka angka.", correct: true },
      { text: "Kapan kamu wisuda?", correct: false },
      { text: "Aku bisa bantu kamu setelah makan siang.", correct: false }
    ],
    explanation: "Kalimat \"I prefer Math. I like numbers.\" memiliki arti \"Aku lebih suka Matematika. Aku suka angka.\"."
  },
  {
    id: 10,
    prompt: "Bagaimana cara mengatakan: \"Tidak masalah. Kembalikan saja nanti.\"?",
    options: [
      { text: "No problem. Just give it back later.", correct: true },
      { text: "You have to whisper here.", correct: false },
      { text: "That would be great. Thank you!", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Tidak masalah. Kembalikan saja nanti.\" adalah \"No problem. Just give it back later.\"."
  },
  {
    id: 11,
    prompt: "Lengkapi kalimat: \"I missed the bus this ___.\"\n(Arti: Aku ketinggalan bus pagi ini.)",
    options: [
      { text: "morning", correct: true },
      { text: "about", correct: false },
      { text: "Me", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'morning'."
  },
  {
    id: 12,
    prompt: "Apa arti dari kalimat: \"For about two years now.\"?",
    options: [
      { text: "Kamu harus belajar lagi nanti malam.", correct: false },
      { text: "Sudah sekitar dua tahun.", correct: true },
      { text: "Apakah itu kuliah yang sulit?", correct: false }
    ],
    explanation: "Kalimat \"For about two years now.\" memiliki arti \"Sudah sekitar dua tahun.\"."
  },
  {
    id: 13,
    prompt: "Bagaimana cara mengatakan: \"Aku juga. Ayo ke kantin.\"?",
    options: [
      { text: "Me too. Let's go to the cafeteria.", correct: true },
      { text: "No, I didn't understand the last part.", correct: false },
      { text: "Okay, I will be silent.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Aku juga. Ayo ke kantin.\" adalah \"Me too. Let's go to the cafeteria.\"."
  },
  {
    id: 14,
    prompt: "Lengkapi kalimat: \"What ___ your favorite subject?\"\n(Arti: Apa mata pelajaran favoritmu?)",
    options: [
      { text: "is", correct: true },
      { text: "book", correct: false },
      { text: "Science", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'is'."
  },
  {
    id: 15,
    prompt: "Apa arti dari kalimat: \"Sorry, I was asking for a book.\"?",
    options: [
      { text: "Anda harus berbisik di sini.", correct: false },
      { text: "Aku harap segera dapat satu.", correct: false },
      { text: "Maaf, saya sedang menanyakan buku.", correct: true }
    ],
    explanation: "Kalimat \"Sorry, I was asking for a book.\" memiliki arti \"Maaf, saya sedang menanyakan buku.\"."
  },
  {
    id: 16,
    prompt: "Bagaimana cara mengatakan: \"Saya belajar Ilmu Komputer.\"?",
    options: [
      { text: "I am studying Computer Science.", correct: true },
      { text: "Why are you late for class?", correct: false },
      { text: "I will study at the library.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Saya belajar Ilmu Komputer.\" adalah \"I am studying Computer Science.\"."
  },
  {
    id: 17,
    prompt: "Lengkapi kalimat: \"Are you ___ for the big exam?\"\n(Arti: Kamu siap buat ujian besarnya?)",
    options: [
      { text: "ready", correct: true },
      { text: "will", correct: false },
      { text: "History", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'ready'."
  },
  {
    id: 18,
    prompt: "Apa arti dari kalimat: \"The teacher will be angry.\"?",
    options: [
      { text: "Sudah berapa lama kamu belajar bahasa Inggris?", correct: false },
      { text: "Permisi, bolehkah aku pinjam pulpen?", correct: false },
      { text: "Gurunya bakal marah.", correct: true }
    ],
    explanation: "Kalimat \"The teacher will be angry.\" memiliki arti \"Gurunya bakal marah.\"."
  },
  {
    id: 19,
    prompt: "Bagaimana cara mengatakan: \"Aku sangat suka Sejarah. Itu menarik.\"?",
    options: [
      { text: "I really like History. It is interesting.", correct: true },
      { text: "What is your major?", correct: false },
      { text: "No problem. Just give it back later.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Aku sangat suka Sejarah. Itu menarik.\" adalah \"I really like History. It is interesting.\"."
  },
  {
    id: 20,
    prompt: "Lengkapi kalimat: \"Be quiet, please. We ___ in the library.\"\n(Arti: Harap tenang. Kita di perpustakaan.)",
    options: [
      { text: "mine", correct: false },
      { text: "are", correct: true },
      { text: "you", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'are'."
  }
];

const ElemSpeakingLesson5: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_speaking', 5);
  const nextLessonPath = '/modul/english/elementary/speaking/lesson-6';
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
      alert("Latihan Selesai! Kamu telah siap untuk sekolah.");
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
      lessonLabel={"Elementary Speaking Lesson 5"}
      accentColor={"#E74C3C"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Pendidikan & Belajar"
            subtitle="Speaking • Pelajaran 5"
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
                      className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <BookOpen size={96} />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Kehidupan Sekolah</h2>
              <p className="text-sky-100 text-sm leading-relaxed mb-4">
                Belajar cara membicarakan studimu, minta bantuan di kelas, dan diskusikan tujuan masa depanmu.
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
              <ClipboardList className="w-6 h-6 text-indigo-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-indigo-900 mb-2">Tips Pro: "Study" vs "Learn"</h3>
                <p className="text-sm text-indigo-700 leading-relaxed">
                  <b>Study</b> adalah tindakan mencoba mendapatkan pengetahuan (misal: baca buku, kerja PR). <br />
                  <b>Learn</b> adalah hasil dari mendapatkan pengetahuan atau keahlian (misal: "Saya belajar berenang").
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
export default ElemSpeakingLesson5;