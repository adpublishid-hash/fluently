import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Trophy, RefreshCw } from 'lucide-react';


const QUIZ_QUESTIONS = [
  {
    "id": 1,
    "question": "What is the most polite way to ask about someone's life experiences? [Q1]",
    "options": [
      "What is your experience problem?",
      "I would love to hear about your thoughts on life experiences.",
      "Tell me your experience now."
    ],
    "answer": "I would love to hear about your thoughts on life experiences.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 2,
    "question": "Fill the blank: \"When discussing experience, it's important to __ open-minded.\"",
    "options": [
      "keep",
      "stay",
      "make"
    ],
    "answer": "stay",
    "explanation": "Phrase yang tepat adalah 'stay open-minded' yang berarti mempertahankan pemikiran terbuka."
  },
  {
    "id": 3,
    "question": "Which response strongly agrees with a statement about experience? [Q3]",
    "options": [
      "That is totally wrong.",
      "I see your point, but...",
      "I couldn't agree more."
    ],
    "answer": "I couldn't agree more.",
    "explanation": "'I couldn't agree more' menyatakan persetujuan 100% (tidak ada yang bisa ditambahkan karena sudah sangat setuju)."
  },
  {
    "id": 4,
    "question": "If you want to interrupt politely during a conversation about experience, you say:",
    "options": [
      "Excuse me, may I add something here?",
      "Stop talking for a moment.",
      "Wait, give me a chance."
    ],
    "answer": "Excuse me, may I add something here?",
    "explanation": "'Excuse me, may I add something here' adalah standar baku (CEFR B2) untuk interupsi yang menghormati pembicara."
  },
  {
    "id": 5,
    "question": "Select the best transition word: \"We talked about life experiences; ____, we should also discuss the future impacts.\"",
    "options": [
      "Because",
      "Despite",
      "Furthermore"
    ],
    "answer": "Furthermore",
    "explanation": "'Furthermore' memperluas / menambahkan poin pada ide dasar sebelumnya secara terstruktur."
  },
  {
    "id": 6,
    "question": "Which idiom best describes a very easy task regarding experience? [Q6]",
    "options": [
      "A piece of cake",
      "Under the weather",
      "Bite the bullet"
    ],
    "answer": "A piece of cake",
    "explanation": "'A piece of cake' secara harafiah berarti sesuatu yang sangat mudah dikerjakan atau diucapkan."
  },
  {
    "id": 7,
    "question": "What is the most polite way to ask about someone's life experiences? [Q7]",
    "options": [
      "What is your experience problem?",
      "I would love to hear about your thoughts on life experiences.",
      "Tell me your experience now."
    ],
    "answer": "I would love to hear about your thoughts on life experiences.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 8,
    "question": "Fill the blank: \"When discussing experience, it's important to __ open-minded.\"",
    "options": [
      "keep",
      "stay",
      "make"
    ],
    "answer": "stay",
    "explanation": "Phrase yang tepat adalah 'stay open-minded' yang berarti mempertahankan pemikiran terbuka."
  },
  {
    "id": 9,
    "question": "Which response strongly agrees with a statement about experience? [Q9]",
    "options": [
      "That is totally wrong.",
      "I see your point, but...",
      "I couldn't agree more."
    ],
    "answer": "I couldn't agree more.",
    "explanation": "'I couldn't agree more' menyatakan persetujuan 100% (tidak ada yang bisa ditambahkan karena sudah sangat setuju)."
  },
  {
    "id": 10,
    "question": "If you want to interrupt politely during a conversation about experience, you say:",
    "options": [
      "Excuse me, may I add something here?",
      "Stop talking for a moment.",
      "Wait, give me a chance."
    ],
    "answer": "Excuse me, may I add something here?",
    "explanation": "'Excuse me, may I add something here' adalah standar baku (CEFR B2) untuk interupsi yang menghormati pembicara."
  },
  {
    "id": 11,
    "question": "Select the best transition word: \"We talked about life experiences; ____, we should also discuss the future impacts.\"",
    "options": [
      "Because",
      "Despite",
      "Furthermore"
    ],
    "answer": "Furthermore",
    "explanation": "'Furthermore' memperluas / menambahkan poin pada ide dasar sebelumnya secara terstruktur."
  },
  {
    "id": 12,
    "question": "Which idiom best describes a very easy task regarding experience? [Q12]",
    "options": [
      "A piece of cake",
      "Under the weather",
      "Bite the bullet"
    ],
    "answer": "A piece of cake",
    "explanation": "'A piece of cake' secara harafiah berarti sesuatu yang sangat mudah dikerjakan atau diucapkan."
  },
  {
    "id": 13,
    "question": "What is the most polite way to ask about someone's life experiences? [Q13]",
    "options": [
      "What is your experience problem?",
      "I would love to hear about your thoughts on life experiences.",
      "Tell me your experience now."
    ],
    "answer": "I would love to hear about your thoughts on life experiences.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 14,
    "question": "Fill the blank: \"When discussing experience, it's important to __ open-minded.\"",
    "options": [
      "keep",
      "stay",
      "make"
    ],
    "answer": "stay",
    "explanation": "Phrase yang tepat adalah 'stay open-minded' yang berarti mempertahankan pemikiran terbuka."
  },
  {
    "id": 15,
    "question": "Which response strongly agrees with a statement about experience? [Q15]",
    "options": [
      "That is totally wrong.",
      "I see your point, but...",
      "I couldn't agree more."
    ],
    "answer": "I couldn't agree more.",
    "explanation": "'I couldn't agree more' menyatakan persetujuan 100% (tidak ada yang bisa ditambahkan karena sudah sangat setuju)."
  },
  {
    "id": 16,
    "question": "If you want to interrupt politely during a conversation about experience, you say:",
    "options": [
      "Excuse me, may I add something here?",
      "Stop talking for a moment.",
      "Wait, give me a chance."
    ],
    "answer": "Excuse me, may I add something here?",
    "explanation": "'Excuse me, may I add something here' adalah standar baku (CEFR B2) untuk interupsi yang menghormati pembicara."
  },
  {
    "id": 17,
    "question": "Select the best transition word: \"We talked about life experiences; ____, we should also discuss the future impacts.\"",
    "options": [
      "Because",
      "Despite",
      "Furthermore"
    ],
    "answer": "Furthermore",
    "explanation": "'Furthermore' memperluas / menambahkan poin pada ide dasar sebelumnya secara terstruktur."
  },
  {
    "id": 18,
    "question": "Which idiom best describes a very easy task regarding experience? [Q18]",
    "options": [
      "A piece of cake",
      "Under the weather",
      "Bite the bullet"
    ],
    "answer": "A piece of cake",
    "explanation": "'A piece of cake' secara harafiah berarti sesuatu yang sangat mudah dikerjakan atau diucapkan."
  },
  {
    "id": 19,
    "question": "What is the most polite way to ask about someone's life experiences? [Q19]",
    "options": [
      "What is your experience problem?",
      "I would love to hear about your thoughts on life experiences.",
      "Tell me your experience now."
    ],
    "answer": "I would love to hear about your thoughts on life experiences.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 20,
    "question": "Fill the blank: \"When discussing experience, it's important to __ open-minded.\"",
    "options": [
      "keep",
      "stay",
      "make"
    ],
    "answer": "stay",
    "explanation": "Phrase yang tepat adalah 'stay open-minded' yang berarti mempertahankan pemikiran terbuka."
  }
];

const CONVERSATION_SCENARIOS: Scenario[] = [
  {
    id: 'c1',
    title: "Job Promotion",
    context: "Berbagi berita karir.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Alex', text: "I have some great news! I got promoted.", translation: "Aku punya kabar bagus! Aku naik jabatan." },
      { speaker: 'B', name: 'Jamie', text: "Congratulations! You worked so hard for it.", translation: "Selamat! Kamu bekerja sangat keras untuk itu." },
      { speaker: 'A', name: 'Alex', text: "Thanks. I'll be leading the new team starting Monday.", translation: "Terima kasih. Aku akan memimpin tim baru mulai Senin." },
      { speaker: 'B', name: 'Jamie', text: "That is a huge achievement. Let's celebrate!", translation: "Itu pencapaian besar. Ayo kita rayakan!" }
    ]
  },
  {
    id: 'c2',
    title: "Travel Adventure",
    context: "Membahas perjalanan masa lalu.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Sarah', text: "Have you ever been to Europe?", translation: "Pernahkah kamu ke Eropa?" },
      { speaker: 'B', name: 'Ben', text: "Yes, I backpacked across Italy last summer.", translation: "Ya, aku backpacking keliling Italia musim panas lalu." },
      { speaker: 'A', name: 'Sarah', text: "That sounds amazing. What was the best part?", translation: "Kedengarannya luar biasa. Apa bagian terbaiknya?" },
      { speaker: 'B', name: 'Ben', text: "The food in Rome was unforgettable.", translation: "Makanan di Roma tak terlupakan." }
    ]
  },
  {
    id: 'c3',
    title: "Learning a Skill",
    context: "Membicarakan hobi.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tom', text: "I've started learning the guitar recently.", translation: "Aku baru mulai belajar gitar belakangan ini." },
      { speaker: 'B', name: 'Lisa', text: "Really? How is it going?", translation: "Benarkah? Bagaimana perkembangannya?" },
      { speaker: 'A', name: 'Tom', text: "It's tough, but I've mastered a few chords.", translation: "Sulit sih, tapi aku sudah menguasai beberapa kunci." },
      { speaker: 'B', name: 'Lisa', text: "Keep at it. Learning an instrument takes time.", translation: "Teruskan. Belajar alat musik butuh waktu." }
    ]
  },
  {
    id: 'c4',
    title: "Overcoming Fear",
    context: "Berbagi pertumbuhan pribadi.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Mark', text: "I used to be terrified of public speaking.", translation: "Dulu aku takut sekali bicara di depan umum." },
      { speaker: 'B', name: 'Anna', text: "Me too. How did you get over it?", translation: "Aku juga. Bagaimana kamu mengatasinya?" },
      { speaker: 'A', name: 'Mark', text: "I joined a local club and practiced every week.", translation: "Aku gabung klub lokal dan latihan setiap minggu." },
      { speaker: 'B', name: 'Anna', text: "That is brave. I should try that.", translation: "Itu berani. Aku harus mencobanya." }
    ]
  },
  {
    id: 'c5',
    title: "Graduation Day",
    context: "Mengenang masa kuliah.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'John', text: "Do you miss our university days?", translation: "Apa kamu rindu masa kuliah kita?" },
      { speaker: 'B', name: 'Emma', text: "Sometimes. Graduating was such a proud moment.", translation: "Kadang. Wisuda adalah momen yang sangat membanggakan." },
      { speaker: 'A', name: 'John', text: "I remember throwing our caps in the air.", translation: "Aku ingat kita melempar topi ke udara." },
      { speaker: 'B', name: 'Emma', text: "It feels like a lifetime ago now.", translation: "Rasanya seperti sudah lama sekali." }
    ]
  },
  {
    id: 'c6',
    title: "Volunteering",
    context: "Membahas kegiatan amal.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Interviewer', text: "I see you volunteered at the shelter.", translation: "Saya lihat Anda menjadi relawan di penampungan." },
      { speaker: 'B', name: 'Candidate', text: "Yes, I spent my weekends helping there.", translation: "Ya, saya menghabiskan akhir pekan membantu di sana." },
      { speaker: 'A', name: 'Interviewer', text: "What did you learn from that experience?", translation: "Apa yang Anda pelajari dari pengalaman itu?" },
      { speaker: 'B', name: 'Candidate', text: "It taught me patience and compassion.", translation: "Itu mengajarkan saya kesabaran dan kasih sayang." }
    ]
  },
  {
    id: 'c7',
    title: "Moving Abroad",
    context: "Tinggal di negara baru.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Sam', text: "Have you ever lived in another country?", translation: "Pernahkah kamu tinggal di negara lain?" },
      { speaker: 'B', name: 'Nina', text: "Yes, I lived in Japan for two years.", translation: "Ya, aku tinggal di Jepang selama dua tahun." },
      { speaker: 'A', name: 'Sam', text: "What was the biggest challenge?", translation: "Apa tantangan terbesarnya?" },
      { speaker: 'B', name: 'Nina', text: "The language barrier was difficult at first.", translation: "Kendala bahasa awalnya sulit." }
    ]
  },
  {
    id: 'c8',
    title: "Winning a Competition",
    context: "Prestasi olahraga.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Coach', text: "I heard you won the marathon!", translation: "Aku dengar kamu menang maraton!" },
      { speaker: 'B', name: 'Runner', text: "I did! I've been training for months.", translation: "Iya! Aku sudah latihan berbulan-bulan." },
      { speaker: 'A', name: 'Coach', text: "That is an incredible feat.", translation: "Itu prestasi yang luar biasa." },
      { speaker: 'B', name: 'Runner', text: "I pushed my limits, but it paid off.", translation: "Aku memaksakan diri, tapi itu terbayar." }
    ]
  },
  {
    id: 'c9',
    title: "Buying a House",
    context: "Tonggak kehidupan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Husband', text: "We finally bought our first house.", translation: "Akhirnya kita beli rumah pertama kita." },
      { speaker: 'B', name: 'Friend', text: "Wow! That is a major milestone.", translation: "Wow! Itu tonggak sejarah yang besar." },
      { speaker: 'A', name: 'Husband', text: "It needs some work, but it's ours.", translation: "Perlu sedikit perbaikan, tapi itu milik kami." },
      { speaker: 'B', name: 'Friend', text: "I am so happy for you both.", translation: "Aku turut bahagia untuk kalian berdua." }
    ]
  },
  {
    id: 'c10',
    title: "Bucket List",
    context: "Tujuan masa depan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Leo', text: "What is at the top of your bucket list?", translation: "Apa yang paling atas di daftar keinginanmu?" },
      { speaker: 'B', name: 'Zoe', text: "I want to see the Northern Lights.", translation: "Aku ingin melihat Cahaya Utara (Aurora)." },
      { speaker: 'A', name: 'Leo', text: "That is on my list too.", translation: "Itu ada di daftarku juga." },
      { speaker: 'B', name: 'Zoe', text: "Let's plan to go together someday.", translation: "Ayo rencanakan pergi bareng suatu hari nanti." }
    ]
  }
];

const InterSpeakingLesson1: React.FC = () => {
    const [activeScenario, setActiveScenario] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const currentScenario = CONVERSATION_SCENARIOS.find(c => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];

  
  
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_speaking', 1);
  const nextLessonPath = 1 < 20 ? `/modul/english/intermediate/speaking/lesson-${1+1}` : '/modul/english/intermediate';
  const [practiceStep, setPracticeStep] = useState(0);
  const [selectedPracticeOption, setSelectedPracticeOption] = useState<string | null>(null);
  const [isPracticeChecked, setIsPracticeChecked] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const playSound = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US'; u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };


  return (
    <>
      <LessonCompleteModal
        show={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        lessonLabel={"Intermediate Speaking Lesson 1"}
        accentColor="#E74C3C"
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
      title="Pengalaman Hidup"
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
        <div className="flex-1 overflow-y-auto scroll-smooth">
          <div className="p-4 md:p-8 space-y-6 pb-24">
            <section className="rounded-2xl p-6 shadow-lg text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #E74C3C, #E74C3C99)' }}>
              <h2 className="text-xl font-bold mb-2">Cerita Anda</h2>
              <p className="text-sm opacity-90 leading-relaxed">Bercerita tentang pengalaman pribadi, karir, dan perjalanan masa lalu menggunakan Past Tense dan Present Perfect. Pelajari ragam frasa untuk merespons percakapan kasual.</p>
            </section>
            
            
            
            {/* Scenario Selector */}
            <section className="mb-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 px-1">Pilih Situasi</h3>
              <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                {CONVERSATION_SCENARIOS.map(scenario => (
                  <button
                    key={scenario.id}
                    onClick={() => setActiveScenario(scenario.id)}
                    className={`flex-shrink-0 px-5 py-3 rounded-xl border transition-all ${activeScenario === scenario.id
                        ? 'bg-slate-800 text-white border-slate-800 shadow-md transform scale-105'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                      }`}
                  >
                    <span className="block text-sm font-bold whitespace-nowrap">{scenario.title}</span>
                    <span className="block text-[10px] opacity-70 mt-0.5 text-left">{scenario.level}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Active Conversation Display */}
            <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 min-h-[400px]">
              <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{currentScenario.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">{currentScenario.context || currentScenario.desc}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentScenario.level?.toLowerCase() === 'formal' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {currentScenario.level || 'Casual'}
                </div>
              </div>

              <div className="space-y-6">
                {currentScenario.dialogue?.map((line: any, idx: number) => {
                  const isLeft = line.speaker === 'A';
                  return (
                    <div key={idx} className={`flex gap-4 ${!isLeft ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-sm ${isLeft ? 'bg-sky-100 text-sky-600' : 'bg-indigo-100 text-indigo-600'}`}>
                        {line.speaker}
                      </div>

                      <div className="flex-1 max-w-[85%] group">
                        <div className={`p-4 rounded-2xl relative ${isLeft
                            ? 'bg-slate-50 text-slate-800 rounded-tl-sm border border-slate-100'
                            : 'bg-indigo-600 text-white rounded-tr-sm shadow-md'
                          }`}>
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <span className={`text-[10px] font-bold opacity-70 uppercase tracking-wide ${isLeft ? 'text-slate-400' : 'text-indigo-200'}`}>{line.name}</span>
                            <button
                              onClick={() => playSound(line.text)}
                              className={`transition-colors ${isLeft ? 'text-slate-400 hover:text-sky-600' : 'text-indigo-300 hover:text-white'}`}
                            >
                              <Volume2 size={16} />
                            </button>
                          </div>
                          <p className="text-base font-medium leading-relaxed">{line.text}</p>
                          {line.translation && (
                            <p className={`text-xs mt-2 pt-2 border-t italic ${isLeft ? 'text-slate-500 border-slate-200' : 'text-indigo-200 border-indigo-500/50'}`}>
                              {line.translation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      ) : (
        
        <div className="py-4">
          {!showResult ? (
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pertanyaan {practiceStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Skor: {quizScore}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-6">{QUIZ_QUESTIONS[practiceStep].question}</h3>
              <div className="space-y-3">
                {QUIZ_QUESTIONS[practiceStep].options.map((option: string, idx: number) => {
                  let cls = "border-slate-200 hover:border-indigo-300 hover:bg-slate-50";
                  if (isPracticeChecked) {
                    if (option === QUIZ_QUESTIONS[practiceStep].answer) cls = "bg-green-50 border-sky-500 text-green-700";
                    else if (option === selectedPracticeOption) cls = "bg-red-50 border-red-500 text-red-700";
                    else cls = "opacity-50 border-slate-100";
                  } else if (option === selectedPracticeOption) {
                    cls = "border-indigo-500 bg-indigo-50 text-indigo-700";
                  }
                  return (
                    <button key={idx} onClick={() => { if(!isPracticeChecked) setSelectedPracticeOption(option); }} disabled={isPracticeChecked}
                      className={"w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between " + cls}>
                      <span>{option}</span>
                      {isPracticeChecked && option === QUIZ_QUESTIONS[practiceStep].answer && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                      {isPracticeChecked && option === selectedPracticeOption && option !== QUIZ_QUESTIONS[practiceStep].answer && <XCircle className="w-5 h-5 text-red-500" />}
                    </button>
                  );
                })}
              </div>
              {!isPracticeChecked ? (
                <button 
                  onClick={() => setIsPracticeChecked(true)}
                  disabled={!selectedPracticeOption}
                  className={`mt-6 w-full py-3 rounded-xl font-bold transition-all ${selectedPracticeOption ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg' : 'bg-slate-100 text-slate-400'}`}
                >
                  Cek Jawaban
                </button>
              ) : (
                <div className="mt-6 animate-fade-in">
                  <div className={"p-3 rounded-lg text-sm mb-4 " + (selectedPracticeOption === QUIZ_QUESTIONS[practiceStep].answer ? "bg-green-50 text-green-800" : "bg-orange-50 text-orange-800")}>
                    {selectedPracticeOption === QUIZ_QUESTIONS[practiceStep].answer ? "Benar! " : "Kurang Tepat. "}
                    {QUIZ_QUESTIONS[practiceStep].explanation}
                  </div>
                  <button onClick={() => {
                    const isCorrect = selectedPracticeOption === QUIZ_QUESTIONS[practiceStep].answer;
                    if (isCorrect) setQuizScore(p => p + 1);
                    if (practiceStep < QUIZ_QUESTIONS.length - 1) { 
                      setPracticeStep(p => p + 1); 
                      setSelectedPracticeOption(null); 
                      setIsPracticeChecked(false); 
                    } else { 
                      setShowResult(true); 
                    }
                  }} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg">
                    {practiceStep < QUIZ_QUESTIONS.length - 1 ? "Selanjutnya" : "Lihat Hasil"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Latihan Selesai!</h2>
              <p className="text-slate-500 mb-6">Skor kamu: {quizScore} dari {QUIZ_QUESTIONS.length}</p>
              <button 
                onClick={() => { setPracticeStep(0); setQuizScore(0); setShowResult(false); setSelectedPracticeOption(null); setIsPracticeChecked(false); }} 
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg"
              >
                Coba Lagi
              </button>
            </div>
          )}
        </div>
      )}
    </LessonShell>
    </>
  );
};

export default InterSpeakingLesson1;
