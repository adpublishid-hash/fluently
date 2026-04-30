import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, Heart, Zap } from 'lucide-react';
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
    title: "Good News",
    context: "Merayakan kesuksesan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tom', text: "You look happy! What happened?", translation: "Kamu terlihat senang! Apa yang terjadi?" },
      { speaker: 'B', name: 'Jerry', text: "I passed my exam with a high score!", translation: "Aku lulus ujian dengan nilai tinggi!" },
      { speaker: 'A', name: 'Tom', text: "That is amazing. I am proud of you.", translation: "Itu luar biasa. Aku bangga padamu." },
      { speaker: 'B', name: 'Jerry', text: "Thanks! I feel so relieved now.", translation: "Makasih! Aku merasa sangat lega sekarang." }
    ]
  },
  {
    id: 'c2',
    title: "Bad News",
    context: "Menghibur teman.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Sarah', text: "Why are you crying?", translation: "Kenapa kamu menangis?" },
      { speaker: 'B', name: 'Mike', text: "I lost my wallet on the bus.", translation: "Aku kehilangan dompetku di bus." },
      { speaker: 'A', name: 'Sarah', text: "Oh no, I am so sorry to hear that.", translation: "Oh tidak, aku turut sedih mendengarnya." },
      { speaker: 'B', name: 'Mike', text: "I feel really sad and angry at myself.", translation: "Aku merasa sangat sedih dan marah pada diriku sendiri." }
    ]
  },
  {
    id: 'c3',
    title: "Anger",
    context: "Mengekspresikan kekesalan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Alice', text: "Are you angry?", translation: "Apa kamu marah?" },
      { speaker: 'B', name: 'Bob', text: "Yes, my brother broke my phone.", translation: "Ya, saudaraku merusakkan HP-ku." },
      { speaker: 'A', name: 'Alice', text: "That is terrible. Did he apologize?", translation: "Itu parah sekali. Apa dia minta maaf?" },
      { speaker: 'B', name: 'Bob', text: "No, that makes me even more upset.", translation: "Tidak, itu membuatku makin kesal." }
    ]
  },
  {
    id: 'c4',
    title: "Boredom",
    context: "Mengeluh tidak ada kerjaan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Kid 1', text: "I am so bored.", translation: "Aku bosan sekali." },
      { speaker: 'B', name: 'Kid 2', text: "Me too. There is nothing to do.", translation: "Aku juga. Tidak ada yang bisa dilakukan." },
      { speaker: 'A', name: 'Kid 1', text: "Do you want to watch a movie?", translation: "Mau nonton film?" },
      { speaker: 'B', name: 'Kid 2', text: "No, movies are boring. Let's go outside.", translation: "Gak ah, film membosankan. Ayo keluar." }
    ]
  },
  {
    id: 'c5',
    title: "Nervousness",
    context: "Sebelum acara.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Interviewer', text: "How do you feel today?", translation: "Bagaimana perasaan Anda hari ini?" },
      { speaker: 'B', name: 'Candidate', text: "I am a little nervous about the interview.", translation: "Saya sedikit gugup tentang wawancaranya." },
      { speaker: 'A', name: 'Interviewer', text: "Don't worry. Just relax.", translation: "Jangan khawatir. Santai saja." },
      { speaker: 'B', name: 'Candidate', text: "Thank you. I will try my best.", translation: "Terima kasih. Saya akan mencoba yang terbaik." }
    ]
  },
  {
    id: 'c6',
    title: "Surprise",
    context: "Pertemuan tak terduga.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'John', text: "Hi Mary! What are you doing here?", translation: "Hai Mary! Sedang apa kamu di sini?" },
      { speaker: 'B', name: 'Mary', text: "John? I am so surprised to see you!", translation: "John? Aku kaget banget lihat kamu!" },
      { speaker: 'A', name: 'John', text: "I thought you moved to London.", translation: "Kukira kamu pindah ke London." },
      { speaker: 'B', name: 'Mary', text: "I came back last week. Whatever, I am happy.", translation: "Aku kembali minggu lalu. Pokoknya, aku senang." }
    ]
  },
  {
    id: 'c7',
    title: "Exhaustion",
    context: "Setelah hari yang panjang.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Wife', text: "You look exhausted.", translation: "Kamu terlihat sangat lelah." },
      { speaker: 'B', name: 'Husband', text: "I am. I worked for 12 hours today.", translation: "Iya. Aku kerja 12 jam hari ini." },
      { speaker: 'A', name: 'Wife', text: "You should go to sleep early.", translation: "Kamu harus tidur lebih awal." },
      { speaker: 'B', name: 'Husband', text: "Good idea. I am so sleepy.", translation: "Ide bagus. Aku ngantuk sekali." }
    ]
  },
  {
    id: 'c8',
    title: "Confusion",
    context: "Melihat peta.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tourist', text: "This map is very confusing.", translation: "Peta ini sangat membingungkan." },
      { speaker: 'B', name: 'Local', text: "Can I help you? You look lost.", translation: "Bisa saya bantu? Anda terlihat tersesat." },
      { speaker: 'A', name: 'Tourist', text: "Yes, I am confused about where to go.", translation: "Ya, saya bingung harus ke mana." },
      { speaker: 'B', name: 'Local', text: "Let me show you the way.", translation: "Biar saya tunjukkan jalannya." }
    ]
  },
  {
    id: 'c9',
    title: "Excitement",
    context: "Merencanakan perjalanan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend 1', text: "We are going to Bali next week!", translation: "Kita akan ke Bali minggu depan!" },
      { speaker: 'B', name: 'Friend 2', text: "I am so excited!", translation: "Aku sangat bersemangat!" },
      { speaker: 'A', name: 'Friend 1', text: "It will be an exciting trip.", translation: "Itu akan jadi perjalanan yang seru." },
      { speaker: 'B', name: 'Friend 2', text: "I can't wait to see the beach.", translation: "Aku gak sabar lihat pantainya." }
    ]
  },
  {
    id: 'c10',
    title: "Worry",
    context: "Khawatir pada hewan peliharaan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Neighbor', text: "Are you okay? You look worried.", translation: "Kamu oke? Kamu terlihat khawatir." },
      { speaker: 'B', name: 'Owner', text: "Yes, my dog is sick.", translation: "Ya, anjingku sakit." },
      { speaker: 'A', name: 'Neighbor', text: "I hope he gets better soon.", translation: "Semoga dia cepat sembuh." },
      { speaker: 'B', name: 'Owner', text: "Thanks. I am really scared for him.", translation: "Makasih. Aku benar-benar takut terjadi apa-apa padanya." }
    ]
  }
];

const PRACTICE_QUESTIONS = [
{
    id: 1,
    prompt: "I have nothing to do. I feel ___.",
    options: [
      { text: "boring", correct: false },
      { text: "bored", correct: true },
      { text: "happy", correct: false }
    ],
    explanation: "Gunakan '-ed' untuk mendeskripsikan perasaanmu. 'I am bored'."
  },
  {
    id: 2,
    prompt: "The movie was not interesting. It was ___.",
    options: [
      { text: "bored", correct: false },
      { text: "boring", correct: true },
      { text: "excited", correct: false }
    ],
    explanation: "Gunakan '-ing' untuk mendeskripsikan hal yang menyebabkan perasaan. 'The movie is boring'."
  },
  {
    id: 3,
    prompt: "She passed her exam. She is ___.",
    options: [
      { text: "angry", correct: false },
      { text: "happy", correct: true },
      { text: "scared", correct: false }
    ],
    explanation: "Lulus ujian adalah kejadian yang membahagiakan (happy)."
  },
  {
    id: 4,
    prompt: "I worked all day. I am ___.",
    options: [
      { text: "tired", correct: true },
      { text: "tiring", correct: false },
      { text: "confused", correct: false }
    ],
    explanation: "Tired (lelah) mendeskripsikan kondisi fisik kelelahan."
  },
  {
    id: 5,
    prompt: "He saw a ghost! He was ___.",
    options: [
      { text: "hungry", correct: false },
      { text: "scared", correct: true },
      { text: "bored", correct: false }
    ],
    explanation: "Melihat hantu menyebabkan ketakutan (scared)."
  },
  {
    id: 6,
    prompt: "Apa arti dari kalimat: \"Hi Mary! What are you doing here?\"?",
    options: [
      { text: "John? Aku kaget banget lihat kamu!", correct: false },
      { text: "Kamu harus tidur lebih awal.", correct: false },
      { text: "Hai Mary! Sedang apa kamu di sini?", correct: true }
    ],
    explanation: "Kalimat \"Hi Mary! What are you doing here?\" memiliki arti \"Hai Mary! Sedang apa kamu di sini?\"."
  },
  {
    id: 7,
    prompt: "Bagaimana cara mengatakan: \"Aku juga. Tidak ada yang bisa dilakukan.\"?",
    options: [
      { text: "Me too. There is nothing to do.", correct: true },
      { text: "Do you want to watch a movie?", correct: false },
      { text: "I thought you moved to London.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Aku juga. Tidak ada yang bisa dilakukan.\" adalah \"Me too. There is nothing to do.\"."
  },
  {
    id: 8,
    prompt: "Lengkapi kalimat: \"You should go to ___ early.\"\n(Arti: Kamu harus tidur lebih awal.)",
    options: [
      { text: "is", correct: false },
      { text: "Thanks", correct: false },
      { text: "sleep", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'sleep'."
  },
  {
    id: 9,
    prompt: "Apa arti dari kalimat: \"Thanks. I am really scared for him.\"?",
    options: [
      { text: "Makasih. Aku benar-benar takut terjadi apa-apa padanya.", correct: true },
      { text: "Ya, saudaraku merusakkan HP-ku.", correct: false },
      { text: "Biar saya tunjukkan jalannya.", correct: false }
    ],
    explanation: "Kalimat \"Thanks. I am really scared for him.\" memiliki arti \"Makasih. Aku benar-benar takut terjadi apa-apa padanya.\"."
  },
  {
    id: 10,
    prompt: "Bagaimana cara mengatakan: \"Peta ini sangat membingungkan.\"?",
    options: [
      { text: "This map is very confusing.", correct: true },
      { text: "No, that makes me even more upset.", correct: false },
      { text: "Are you okay? You look worried.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Peta ini sangat membingungkan.\" adalah \"This map is very confusing.\"."
  },
  {
    id: 11,
    prompt: "Lengkapi kalimat: \"Yes, my ___ broke my phone.\"\n(Arti: Ya, saudaraku merusakkan HP-ku.)",
    options: [
      { text: "came", correct: false },
      { text: "brother", correct: true },
      { text: "I", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'brother'."
  },
  {
    id: 12,
    prompt: "Apa arti dari kalimat: \"I am. I worked for 12 hours today.\"?",
    options: [
      { text: "Apa kamu marah?", correct: false },
      { text: "Iya. Aku kerja 12 jam hari ini.", correct: true },
      { text: "Ya, saudaraku merusakkan HP-ku.", correct: false }
    ],
    explanation: "Kalimat \"I am. I worked for 12 hours today.\" memiliki arti \"Iya. Aku kerja 12 jam hari ini.\"."
  },
  {
    id: 13,
    prompt: "Bagaimana cara mengatakan: \"Aku kembali minggu lalu. Pokoknya, aku senang.\"?",
    options: [
      { text: "I am a little nervous about the interview. (opsi lain)", correct: false },
      { text: "I came back last week. Whatever, I am happy.", correct: true },
      { text: "I am a little nervous about the interview. (opsi salah)", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Aku kembali minggu lalu. Pokoknya, aku senang.\" adalah \"I came back last week. Whatever, I am happy.\"."
  },
  {
    id: 14,
    prompt: "Lengkapi kalimat: \"Why are you ___?\"\n(Arti: Kenapa kamu menangis?)",
    options: [
      { text: "you", correct: false },
      { text: "Don't", correct: false },
      { text: "crying", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'crying'."
  },
  {
    id: 15,
    prompt: "Apa arti dari kalimat: \"Don't worry. Just relax.\"?",
    options: [
      { text: "Jangan khawatir. Santai saja.", correct: true },
      { text: "Terima kasih. Saya akan mencoba yang terbaik.", correct: false },
      { text: "Aku sangat bersemangat!", correct: false }
    ],
    explanation: "Kalimat \"Don't worry. Just relax.\" memiliki arti \"Jangan khawatir. Santai saja.\"."
  },
  {
    id: 16,
    prompt: "Bagaimana cara mengatakan: \"Biar saya tunjukkan jalannya.\"?",
    options: [
      { text: "Don't worry. Just relax.", correct: false },
      { text: "I hope he gets better soon.", correct: false },
      { text: "Let me show you the way.", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \"Biar saya tunjukkan jalannya.\" adalah \"Let me show you the way.\"."
  },
  {
    id: 17,
    prompt: "Lengkapi kalimat: \"That is ___. I am proud of you.\"\n(Arti: Itu luar biasa. Aku bangga padamu.)",
    options: [
      { text: "gets", correct: false },
      { text: "my", correct: false },
      { text: "amazing", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'amazing'."
  },
  {
    id: 18,
    prompt: "Apa arti dari kalimat: \"Yes, my dog is sick.\"?",
    options: [
      { text: "Ya, anjingku sakit.", correct: true },
      { text: "Mau nonton film?", correct: false },
      { text: "Biar saya tunjukkan jalannya.", correct: false }
    ],
    explanation: "Kalimat \"Yes, my dog is sick.\" memiliki arti \"Ya, anjingku sakit.\"."
  },
  {
    id: 19,
    prompt: "Bagaimana cara mengatakan: \"Semoga dia cepat sembuh.\"?",
    options: [
      { text: "I hope he gets better soon.", correct: true },
      { text: "I feel really sad and angry at myself.", correct: false },
      { text: "That is terrible. Did he apologize?", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \"Semoga dia cepat sembuh.\" adalah \"I hope he gets better soon.\"."
  },
  {
    id: 20,
    prompt: "Lengkapi kalimat: \"I am so ___!\"\n(Arti: Aku sangat bersemangat!)",
    options: [
      { text: "excited", correct: true },
      { text: "are", correct: false },
      { text: "Thanks", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'excited'."
  }
];

const ElemSpeakingLesson12: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_speaking', 12);
  const nextLessonPath = '/modul/english/elementary/speaking/lesson-13';
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
      alert("Latihan Selesai! Kamu cerdas secara emosional!");
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
      lessonLabel={"Elementary Speaking Lesson 12"}
      accentColor={"#E74C3C"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Perasaan & Emosi"
            subtitle="Speaking • Pelajaran 12"
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
              <Heart className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Apa yang Kamu Rasakan?</h2>
              <p className="text-rose-100 text-sm leading-relaxed mb-4">
                Ekspresikan dirimu dengan jelas. Belajar bicara tentang kebahagiaan, kesedihan, kemarahan, ketakutan, dan lainnya.
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
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentScenario.level === 'Formal' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'}`}>
                {currentScenario.level}
              </div>
            </div>

            <div className="space-y-6">
              {currentScenario.dialogue.map((line, idx) => (
                <div key={idx} className={`flex gap-4 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-[var(--shadow-card)] ${line.speaker === 'A' ? 'bg-gray-100 text-[var(--color-text-secondary)]' : 'bg-rose-100 text-rose-600'
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
              <Zap className="w-6 h-6 text-indigo-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-indigo-900 mb-2">Tips Pro: Bored vs Boring</h3>
                <p className="text-sm text-indigo-700 leading-relaxed">
                  <b>-ED</b> untuk perasaanmu: "I am bor<b>ed</b>." (Saya bosan)<br />
                  <b>-ING</b> untuk penyebabnya: "The movie is bor<b>ing</b>." (Filmnya membosankan)<br />
                  Jangan bilang "I am boring" kecuali kamu bermaksud bilang kamu bukan orang yang menarik!
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
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

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
export default ElemSpeakingLesson12;