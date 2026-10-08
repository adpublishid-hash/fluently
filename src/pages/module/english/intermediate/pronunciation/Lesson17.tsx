
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { User, BookOpen, PenTool, CheckCircle2, XCircle, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';




// Custom Hand Icon for Interrupting
const HandIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </svg>
);



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

const FLOW_RULES = [
  {
    title: "Pergantian Giliran (Turn-Taking)",
    desc: "Percakapan bahasa Inggris seperti tenis. Pukul bola (bicara), lalu tunggu bola kembali (dengarkan).",
    icon: "🎾",
    color: "bg-green-50 text-green-700 border-sky-200"
  },
  {
    title: "Backchanneling",
    desc: "Membuat suara kecil ('Uh-huh', 'Right', 'I see') untuk menunjukkan bahwa Anda mendengarkan. Jangan diam saja!",
    icon: "👂",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    title: "Menyela",
    desc: "Jika Anda perlu menghentikan seseorang, gunakan frasa sopan dan intonasi khusus (nada lebih tinggi/lebih cepat).",
    icon: "✋",
    color: "bg-red-50 text-red-700 border-red-200"
  }
];

const CONVERSATION_SCENARIOS: Scenario[] = [
  {
    id: 'c1',
    title: "Menyela dengan Sopan",
    context: "Selama pertemuan.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Pembicara', text: "So, the data shows a significant increase in...", translation: "Jadi, data menunjukkan peningkatan signifikan pada..." },
      { speaker: 'B', name: 'Rekan', text: "Sorry to interrupt, but could you clarify that number?", translation: "Maaf menyela, bisakah Anda perjelas angka itu?" },
      { speaker: 'A', name: 'Pembicara', text: "Of course. It increased by 15%.", translation: "Tentu. Meningkat sebesar 15%." },
      { speaker: 'B', name: 'Rekan', text: "Thank you. Please continue.", translation: "Terima kasih. Silakan lanjutkan." }
    ]
  },
  {
    id: 'c2',
    title: "Backchanneling",
    context: "Mendengarkan cerita.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Teman', text: "I went to that new restaurant yesterday.", translation: "Aku pergi ke restoran baru itu kemarin." },
      { speaker: 'B', name: 'Anda', text: "Uh-huh. Was it good?", translation: "Uh-huh. Enak nggak?" },
      { speaker: 'A', name: 'Teman', text: "The food was amazing, but the service was slow.", translation: "Makanannya luar biasa, tapi pelayanannya lambat." },
      { speaker: 'B', name: 'Anda', text: "Really? That is too bad.", translation: "Benarkah? Sayang sekali." }
    ]
  },
  {
    id: 'c3',
    title: "Mengganti Topik",
    context: "Pindah ke subjek baru.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Ben', text: "...and that is why I don't like cats.", translation: "...dan itulah kenapa aku tidak suka kucing." },
      { speaker: 'B', name: 'Sam', text: "I see. By the way, did you watch the game?", translation: "Aku mengerti. Ngomong-ngomong, kamu nonton pertandingan gak?" },
      { speaker: 'A', name: 'Ben', text: "Oh yes! It was intense.", translation: "Oh ya! Itu menegangkan." },
      { speaker: 'B', name: 'Sam', text: "I couldn't believe the final score.", translation: "Aku gak percaya skor akhirnya." }
    ]
  },
  {
    id: 'c4',
    title: "Mengakhiri Percakapan",
    context: "Meninggalkan pesta.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Tamu', text: "It has been lovely talking to you.", translation: "Senang berbincang dengan Anda." },
      { speaker: 'B', name: 'Tuan Rumah', text: "You too. We should do this again.", translation: "Anda juga. Kita harus lakukan ini lagi." },
      { speaker: 'A', name: 'Tamu', text: "I'd better get going now. Goodbye.", translation: "Saya sebaiknya pergi sekarang. Selamat tinggal." },
      { speaker: 'B', name: 'Tuan Rumah', text: "Safe travels. Have a good night.", translation: "Hati-hati di jalan. Selamat malam." }
    ]
  },
  {
    id: 'c5',
    title: "Meminta Klarifikasi",
    context: "Instruksi yang membingungkan.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Manajer', text: "Please file the report by EOD.", translation: "Tolong arsipkan laporannya di akhir hari." },
      { speaker: 'B', name: 'Karyawan', text: "Can I just check something? Which report?", translation: "Boleh saya cek sesuatu? Laporan yang mana?" },
      { speaker: 'A', name: 'Manajer', text: "The quarterly sales report.", translation: "Laporan penjualan kuartalan." },
      { speaker: 'B', name: 'Karyawan', text: "Got it. I will do it right away.", translation: "Mengerti. Saya akan kerjakan segera." }
    ]
  },
  {
    id: 'c6',
    title: "Menahan Lantai (Holding the Floor)",
    context: "Mencegah interupsi.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Presenter', text: "There are three main reasons for this.", translation: "Ada tiga alasan utama untuk ini." },
      { speaker: 'B', name: 'Audiens', text: "But what about...", translation: "Tapi bagaimana dengan..." },
      { speaker: 'A', name: 'Presenter', text: "Please let me finish. The first reason is cost.", translation: "Tolong biarkan saya selesaikan. Alasan pertama adalah biaya." },
      { speaker: 'B', name: 'Audiens', text: "My apologies.", translation: "Maafkan saya." }
    ]
  },
  {
    id: 'c7',
    title: "Mengundang Orang Lain Berbicara",
    context: "Diskusi kelompok.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tom', text: "I think we should go to the beach.", translation: "Aku pikir kita harus ke pantai." },
      { speaker: 'B', name: 'Jerry', text: "What do you think, Sarah?", translation: "Bagaimana menurutmu, Sarah?" },
      { speaker: 'A', name: 'Sarah', text: "The beach sounds fun.", translation: "Pantai kedengarannya asik." },
      { speaker: 'B', name: 'Tom', text: "Great, it's decided then.", translation: "Bagus, sudah diputuskan kalau begitu." }
    ]
  },
  {
    id: 'c8',
    title: "Kembali ke Topik",
    context: "Setelah penyimpangan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Alice', text: "...so that is my new car.", translation: "...jadi itulah mobil baruku." },
      { speaker: 'B', name: 'Bob', text: "Nice. Oh look, it is raining!", translation: "Bagus. Oh lihat, hujan!" },
      { speaker: 'A', name: 'Alice', text: "Anyway, as I was saying, the engine is great.", translation: "Ngomong-ngomong, seperti yang kubilang, mesinnya hebat." },
      { speaker: 'B', name: 'Bob', text: "Right, the car. How fast does it go?", translation: "Benar, mobilnya. Seberapa cepat larinya?" }
    ]
  },
  {
    id: 'c9',
    title: "Menunjukkan Ketertarikan",
    context: "Mendengarkan aktif.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Pembicara', text: "I finally finished my book.", translation: "Aku akhirnya menyelesaikan bukuku." },
      { speaker: 'B', name: 'Pendengar', text: "No way! That is awesome.", translation: "Masa sih! Itu keren banget." },
      { speaker: 'A', name: 'Pembicara', text: "It took me two years.", translation: "Butuh waktu dua tahun." },
      { speaker: 'B', name: 'Pendengar', text: "Wow. You must be proud.", translation: "Wow. Kamu pasti bangga." }
    ]
  },
  {
    id: 'c10',
    title: "Keheningan Canggung",
    context: "Memulai kembali percakapan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Orang 1', text: "So... yeah.", translation: "Jadi... ya begitu." },
      { speaker: 'B', name: 'Orang 2', text: "(Silence)...", translation: "(Hening)..." },
      { speaker: 'A', name: 'Orang 1', text: "So, have you watched any good movies lately?", translation: "Jadi, kamu nonton film bagus gak belakangan ini?" },
      { speaker: 'B', name: 'Orang 2', text: "Actually, yes. I saw Dune yesterday.", translation: "Sebenarnya, ya. Aku nonton Dune kemarin." }
    ]
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Apa itu 'Backchanneling'?",
    options: ['Menyela dengan kasar', 'Membuat suara untuk menunjukkan Anda sedang mendengarkan', 'Mengganti topik'],
    answer: 'Membuat suara untuk menunjukkan Anda sedang mendengarkan',
    explanation: "Backchanneling (Uh-huh, I see) menjaga alur tetap berjalan tanpa mengambil giliran penuh."
  },
  {
    id: 2,
    question: "Jika Anda ingin menyela dengan sopan, Anda harus...",
    options: ['Gunakan frasa seperti "Sorry, can I just..."', 'Lambaikan tangan dengan liar', 'Berteriak "BERHENTI!"'],
    answer: 'Gunakan frasa seperti "Sorry, can I just..."',
    explanation: "Frasa sopan melembutkan interupsi."
  },
  {
    id: 3,
    question: "Bagaimana Anda memberi sinyal bahwa Anda sudah selesai berbicara?",
    options: ['Naikkan nada Anda ↗', 'Turunkan nada Anda (Intonasi turun) ↘', 'Lihat ke lantai'],
    answer: 'Turunkan nada Anda (Intonasi turun) ↘',
    explanation: "Intonasi menurun dan jeda memberi sinyal kepada orang lain bahwa giliran mereka tiba."
  },
  {
    id: 4,
    question: "Frasa mana yang membantu kembali ke topik utama?",
    options: ['By the way...', 'Anyway, as I was saying...', 'What do you think?'],
    answer: 'Anyway, as I was saying...',
    explanation: "'Anyway' memberi sinyal kembali ke subjek sebelumnya setelah gangguan."
  },
  { id: 5, question: "Suara mana yang berarti 'Saya mendengarkan' atau 'Ya'?", options: ['Pfft', 'Ugh', 'Uh-huh'], answer: 'Uh-huh', explanation: "'Uh-huh' /əˈhʌ/ adalah suara universal untuk 'Saya mengikuti Anda'." },
  { id: 6, question: "Untuk take a turn dalam conversation, tunggu untuk...", options: ['Nothing', 'Falling intonation ↘ + pause', 'Interruption signal'], answer: 'Falling intonation ↘ + pause', explanation: "Falling tone + pause = turn is over, you can speak." },
  { id: 7, question: "'By the way' digunakan untuk...", options: ['Change topic', 'End conversation', 'Agree'], answer: 'Change topic', explanation: "'By the way' signals shifting to a new subject." },
  { id: 8, question: "Untuk hold the floor (keep speaking), use...", options: ['Fast speaking', 'Fillers like um, uh', 'Silent pause'], answer: 'Fillers like um, uh', explanation: "Fillers signal 'I'm not done yet' while you think." },
  { id: 9, question: "Untuk give the floor to someone else, say...", options: ['I disagree', 'Nothing', 'What do you think?'], answer: 'What do you think?', explanation: "Direct questions invite others to speak." },
  { id: 10, question: "'Right', 'I see', 'Got it' adalah contoh...", options: ['Endings', 'Backchannels', 'Interruptions'], answer: 'Backchannels', explanation: "Short responses show you're listening actively." },
  { id: 11, question: "Untuk politely end conversation, use...", options: ['It\'s been great talking', 'Walk away', 'Change topic'], answer: 'It\'s been great talking', explanation: "Positive closing phrases signal end gracefully." },
  { id: 12, question: "'Anyway' digunakan untuk...", options: ['Return to previous topic', 'Start new topic', 'End talk'], answer: 'Return to previous topic', explanation: "'Anyway' brings you back after digression." },
  { id: 13, question: "Overlapping speech (speaking same time) is...", options: ['Always rude', 'OK in casual, avoid in formal', 'Required'], answer: 'OK in casual, avoid in formal', explanation: "Casual talk = some overlap OK. Formal = wait your turn." },
  { id: 14, question: "'Let me just stop you there' adalah...", options: ['Polite interruption', 'Backchannel', 'Rude'], answer: 'Polite interruption', explanation: "Acknowledges you're interrupting but need to speak." },
  { id: 15, question: "Untuk show agreement, use...", options: ['Ugh', 'Mm-hmm, exactly, absolutely', 'Silence'], answer: 'Mm-hmm, exactly, absolutely', explanation: "Agreement backchannels keep conversation flowing." },
  { id: 16, question: "Falling intonation pada 'Really.' (not question) shows...", options: ['Joy', 'Doubt/skepticism', 'Surprise'], answer: 'Doubt/skepticism', explanation: "Really↘ = I don't believe you. Really↗ = Wow, amazing!" },
  { id: 17, question: "Untuk clarify what someone said, use...", options: ['Can I just check...?', 'You\'re wrong', 'Never mind'], answer: 'Can I just check...?', explanation: "Polite clarification opens space for correction." },
  { id: 18, question: "Eye contact dalam conversation helps with...", options: ['Nothing', 'Turn-taking signals', 'Intimidation'], answer: 'Turn-taking signals', explanation: "Eye contact shows you're listening/ready to speak." },
  { id: 19, question: "Untuk avoid awkward silence, use...", options: ['Stare', 'Leave', 'Small talk questions'], answer: 'Small talk questions', explanation: "Open questions restart conversation flow." },
  { id: 20, question: "Best conversation pronunciation skill?", options: ['Active listening + responsive backchanneling', 'Speed', 'Perfect grammar'], answer: 'Active listening + responsive backchanneling', explanation: "Good conversation = show you're engaged through vocal responses!" }
];

const InterPronunLesson17: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 17);
    const nextLessonPath = 17 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${17 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'flow' | 'scenarios' | 'quiz'>('flow');
  const [activeScenario, setActiveScenario] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const [isPracticeChecked, setIsPracticeChecked] = useState(false);
  const [selectedPracticeOption, setSelectedPracticeOption] = useState<number | null>(null);

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const currentScenario = CONVERSATION_SCENARIOS.find(c => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];

  // Audio Handler
  const playSound = (text: string, rateOrLabel: number | string = 0.9, maybeRate?: number) => { const rate = typeof rateOrLabel === "number" ? rateOrLabel : (maybeRate ?? 0.9); playAudio(text, rate); };

  // Quiz Handlers
  const handleCheckQuiz = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);
    if (option === QUIZ_QUESTIONS[quizStep].answer) {
      setQuizScore(prev => prev + 1);
      playSound("Benar!");
    } else {
      playSound("Salah.");
    }
  };

  const nextQuizQuestion = () => {
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswerChecked(false);
  };

  // Practice Check
  const handleCheckPractice = (idx: number) => {
    // This is a placeholder for interactive practice if needed
    // For now, we reuse the quiz logic structure
  };

  const nextPractice = () => {
    // Placeholder
  };

  return (
        <>
            <LessonCompleteModal
                show={showCompleteModal}
                onClose={() => setShowCompleteModal(false)}
                lessonLabel={"Intermediate Pronunciation Lesson 17"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Alur Percakapan"
                subtitle="Pronunciation • Pelajaran 17"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'flow', label: 'Aturan', icon: <BookOpen size={14} /> },
                    { id: 'scenarios', label: 'Latihan', icon: <BookOpen size={14} /> },
                    { id: 'quiz', label: 'Kuis', icon: <PenTool size={14} /> }
                ]}
                footer={() => (
                    <button
                        onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                        className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                        style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}
                    >
                        <CheckCircle2 size={18} />
                        {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
                    </button>
                )}
            >
                {(tabId) => {
                    
                    
                    return (
                        <div className="animate-fade-in space-y-6">
                            

          {tabId === 'flow' && (
            <>
              {/* Intro */}
              <section className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <User className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Irama Bicara</h2>
                  <p className="text-teal-100 text-sm leading-relaxed">
                    Percakapan adalah sebuah tarian! Anda perlu tahu kapan harus memimpin (bicara), kapan harus mengikuti (mendengarkan), dan bagaimana mengubah arah dengan lancar.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">40 Baris Dialog</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">10 Skenario</span>
                  </div>
                </div>
              </section>

              <div className="grid gap-4">
                {FLOW_RULES.map((rule, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-sm ${rule.color.replace('text-', 'border-').split(' ')[2]}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-lg font-bold ${rule.color.split(' ')[1]}`}>{rule.title}</h3>
                      <span className="text-2xl">{rule.icon}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabId === 'scenarios' && (
            <div className="space-y-6">
              {/* Scenario Selector */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 px-1">Pilih Situasi</h3>
                <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                  {CONVERSATION_SCENARIOS.map(scenario => (
                    <button
                      key={scenario.id}
                      onClick={() => setActiveScenario(scenario.id)}
                      className={`flex-shrink-0 px-5 py-3 rounded-xl border transition-all ${activeScenario === scenario.id
                        ? 'bg-slate-800 text-white border-slate-800 shadow-md transform scale-105'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                    >
                      <span className="block text-sm font-bold whitespace-nowrap">{scenario.title}</span>
                      <span className="block text-[10px] opacity-70 mt-0.5 text-left">{scenario.level}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Conversation Display */}
              <section className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 min-h-[400px]">
                <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{currentScenario.title}</h3>
                    <p className="text-xs text-slate-400 font-medium">{currentScenario.context}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentScenario.level === 'Formal' ? 'bg-indigo-50 text-indigo-600' : 'bg-teal-50 text-teal-600'}`}>
                    {currentScenario.level}
                  </div>
                </div>

                <div className="space-y-6">
                  {currentScenario.dialogue.map((line, idx) => (
                    <div key={idx} className={`flex gap-4 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-sm ${line.speaker === 'A' ? 'bg-teal-100 text-teal-600' : 'bg-indigo-100 text-indigo-600'
                        }`}>
                        {line.speaker}
                      </div>

                      {/* Bubble */}
                      <div className={`flex-1 max-w-[85%] group`}>
                        <div className={`p-4 rounded-2xl relative ${line.speaker === 'A'
                          ? 'bg-slate-50 text-slate-800 rounded-tl-sm'
                          : 'bg-teal-50 text-teal-900 rounded-tr-sm'
                          }`}>
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <span className="text-[10px] font-bold opacity-50 uppercase tracking-wide">{line.name}</span>
                            <button
                              onClick={() => playSound(line.text)}
                              className="text-slate-400 hover:text-teal-600 transition-colors"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-base font-medium leading-relaxed">{line.text}</p>
                          <p className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-200/50 italic">
                            {line.translation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {tabId === 'quiz' && (
            <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-teal-50 text-teal-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-6 flex flex-col gap-2">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-slate-200 hover:border-sky-300 hover:bg-slate-50";
                      if (isAnswerChecked) {
                        if (option === QUIZ_QUESTIONS[quizStep].answer) btnClass = "bg-green-50 border-sky-500 text-green-700";
                        else if (option === selectedOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                        else btnClass = "opacity-50 border-slate-100";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleCheckQuiz(option)}
                          disabled={isAnswerChecked}
                          className={`w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${btnClass}`}
                        >
                          <span>{option}</span>
                          {isAnswerChecked && option === QUIZ_QUESTIONS[quizStep].answer && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                          {isAnswerChecked && option === selectedOption && option !== QUIZ_QUESTIONS[quizStep].answer && <XCircle className="w-5 h-5 text-red-500" />}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswerChecked && (
                    <div className="mt-6">
                      <div className={`p-3 rounded-lg text-sm mb-4 ${selectedOption === QUIZ_QUESTIONS[quizStep].answer ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'}`}>
                        {QUIZ_QUESTIONS[quizStep].explanation}
                      </div>
                      <button
                        onClick={nextQuizQuestion}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                      >
                        {quizStep < QUIZ_QUESTIONS.length - 1 ? "Pertanyaan Berikutnya" : "Lihat Hasil"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500">
                    <Star className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Kuis Selesai!</h2>
                  <p className="text-slate-500 mb-6">Anda mendapat skor {quizScore} dari {QUIZ_QUESTIONS.length}</p>
                  <button
                    onClick={restartQuiz}
                    className="px-8 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-sky-200"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
            </div>
          )}

        
                        </div>
                    );
                }}
            </LessonShell>
        </>
    );
}; // END COMPONENT

export default InterPronunLesson17;
