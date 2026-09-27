import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Trophy } from 'lucide-react';


const QUIZ_QUESTIONS = [
  {
    "id": 1,
    "question": "What is the most polite way to ask about someone's public speaking? [Q1]",
    "options": [
      "What is your speaking problem?",
      "I would love to hear about your thoughts on public speaking.",
      "Tell me your speaking now."
    ],
    "answer": "I would love to hear about your thoughts on public speaking.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 2,
    "question": "Fill the blank: \"When discussing speaking, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about speaking? [Q3]",
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
    "question": "If you want to interrupt politely during a conversation about speaking, you say:",
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
    "question": "Select the best transition word: \"We talked about public speaking; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding speaking? [Q6]",
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
    "question": "What is the most polite way to ask about someone's public speaking? [Q7]",
    "options": [
      "What is your speaking problem?",
      "I would love to hear about your thoughts on public speaking.",
      "Tell me your speaking now."
    ],
    "answer": "I would love to hear about your thoughts on public speaking.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 8,
    "question": "Fill the blank: \"When discussing speaking, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about speaking? [Q9]",
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
    "question": "If you want to interrupt politely during a conversation about speaking, you say:",
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
    "question": "Select the best transition word: \"We talked about public speaking; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding speaking? [Q12]",
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
    "question": "What is the most polite way to ask about someone's public speaking? [Q13]",
    "options": [
      "What is your speaking problem?",
      "I would love to hear about your thoughts on public speaking.",
      "Tell me your speaking now."
    ],
    "answer": "I would love to hear about your thoughts on public speaking.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 14,
    "question": "Fill the blank: \"When discussing speaking, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about speaking? [Q15]",
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
    "question": "If you want to interrupt politely during a conversation about speaking, you say:",
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
    "question": "Select the best transition word: \"We talked about public speaking; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding speaking? [Q18]",
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
    "question": "What is the most polite way to ask about someone's public speaking? [Q19]",
    "options": [
      "What is your speaking problem?",
      "I would love to hear about your thoughts on public speaking.",
      "Tell me your speaking now."
    ],
    "answer": "I would love to hear about your thoughts on public speaking.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 20,
    "question": "Fill the blank: \"When discussing speaking, it's important to __ open-minded.\"",
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
    title: "Opening a Presentation",
    context: "Memulai pidato formal.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Speaker', text: "Good morning, everyone. Thank you for being here.", translation: "Selamat pagi semuanya. Terima kasih telah hadir." },
      { speaker: 'B', name: 'Audience', text: "(Clapping)", translation: "(Bertepuk tangan)" },
      { speaker: 'A', name: 'Speaker', text: "Today, I am going to talk about our new strategy.", translation: "Hari ini, saya akan berbicara tentang strategi baru kita." },
      { speaker: 'B', name: 'Audience', text: "(Listening attentively)", translation: "(Mendengarkan dengan saksama)" }
    ]
  },
  {
    id: 'c2',
    title: "Feeling Nervous",
    context: "Sebelum naik panggung.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend', text: "Are you okay? You look nervous.", translation: "Kamu oke? Kamu terlihat gugup." },
      { speaker: 'B', name: 'Speaker', text: "I have butterflies in my stomach.", translation: "Perutku terasa mulas (gugup)." },
      { speaker: 'A', name: 'Friend', text: "Just take a deep breath. You've rehearsed this.", translation: "Tarik napas dalam-dalam saja. Kamu sudah melatih ini." },
      { speaker: 'B', name: 'Speaker', text: "I know, but there are so many people in the audience.", translation: "Aku tahu, tapi ada begitu banyak orang di antara penonton." }
    ]
  },
  {
    id: 'c3',
    title: "Using Visual Aids",
    context: "Selama presentasi.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Presenter', text: "If you look at this chart, you will see the sales figures.", translation: "Jika Anda lihat grafik ini, Anda akan melihat angka penjualan." },
      { speaker: 'B', name: 'Audience', text: "The numbers are quite low in Q2.", translation: "Angkanya cukup rendah di Kuartal 2." },
      { speaker: 'A', name: 'Presenter', text: "That is a good point. I will explain why in a moment.", translation: "Itu poin yang bagus. Saya akan jelaskan alasannya sebentar lagi." },
      { speaker: 'B', name: 'Audience', text: "(Nods)", translation: "(Mengangguk)" }
    ]
  },
  {
    id: 'c4',
    title: "Handling Questions (Q&A)",
    context: "Setelah pidato.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Speaker', text: "Are there any questions?", translation: "Apakah ada pertanyaan?" },
      { speaker: 'B', name: 'Audience', text: "Yes, could you clarify your point about the budget?", translation: "Ya, bisakah Anda memperjelas poin Anda tentang anggaran?" },
      { speaker: 'A', name: 'Speaker', text: "Certainly. What I meant was...", translation: "Tentu. Maksud saya adalah..." },
      { speaker: 'B', name: 'Audience', text: "Thank you, that makes it clearer.", translation: "Terima kasih, itu membuatnya lebih jelas." }
    ]
  },
  {
    id: 'c5',
    title: "Losing Your Place",
    context: "Lupa dialog.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Speaker', text: "I apologize, I seem to have lost my train of thought.", translation: "Maaf, sepertinya saya kehilangan alur pikiran saya." },
      { speaker: 'B', name: 'Audience', text: "(Waits patiently)", translation: "(Menunggu dengan sabar)" },
      { speaker: 'A', name: 'Speaker', text: "Let me just check my notes for a moment.", translation: "Biarkan saya periksa catatan saya sebentar." },
      { speaker: 'B', name: 'Audience', text: "(Nods encouragingly)", translation: "(Mengangguk memberi semangat)" }
    ]
  },
  {
    id: 'c6',
    title: "The Conclusion",
    context: "Mengakhiri pidato dengan kuat.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Speaker', text: "To sum up, our new strategy is innovative and effective.", translation: "Singkatnya, strategi baru kita inovatif dan efektif." },
      { speaker: 'A', name: 'Speaker', text: "I'd like to thank you all for your attention.", translation: "Saya ingin berterima kasih atas perhatian Anda semua." },
      { speaker: 'A', name: 'Speaker', text: "I am now happy to answer any questions.", translation: "Sekarang saya senang menjawab pertanyaan apa pun." },
      { speaker: 'B', name: 'Audience', text: "(Loud applause)", translation: "(Tepuk tangan meriah)" }
    ]
  },
  {
    id: 'c7',
    title: "Technical Difficulties",
    context: "Proyektor tidak berfungsi.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Presenter', text: "It seems we are having some technical difficulties.", translation: "Sepertinya kita mengalami beberapa kesulitan teknis." },
      { speaker: 'B', name: 'Tech Support', text: "Give me one moment to check the connection.", translation: "Beri saya waktu sebentar untuk memeriksa koneksi." },
      { speaker: 'A', name: 'Presenter', text: "While we wait, let me briefly explain the next slide.", translation: "Sambil menunggu, izinkan saya menjelaskan slide berikutnya secara singkat." },
      { speaker: 'B', name: 'Tech Support', text: "Okay, it should be working now.", translation: "Oke, seharusnya sudah berfungsi sekarang." }
    ]
  },
  {
    id: 'c8',
    title: "Engaging the Audience",
    context: "Membuat pidato interaktif.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Speaker', text: "How many of you have experienced this?", translation: "Berapa banyak dari Anda yang pernah mengalami ini?" },
      { speaker: 'B', name: 'Audience', text: "(Many people raise their hands)", translation: "(Banyak orang mengangkat tangan)" },
      { speaker: 'A', name: 'Speaker', text: "Wow, a lot of you. Can anyone share their story?", translation: "Wow, banyak sekali. Ada yang bisa berbagi cerita?" },
      { speaker: 'B', name: 'Audience Member', text: "Yes, I remember one time when...", translation: "Ya, saya ingat suatu kali ketika..." }
    ]
  },
  {
    id: 'c9',
    title: "Rehearsing",
    context: "Berlatih sebelum acara.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend', text: "Are you ready for your presentation?", translation: "Kamu siap untuk presentasimu?" },
      { speaker: 'B', name: 'Presenter', text: "I think so. I rehearsed it five times.", translation: "Aku rasa begitu. Aku sudah melatihnya lima kali." },
      { speaker: 'A', name: 'Friend', text: "You should time yourself to make sure it's not too long.", translation: "Kamu harus menghitung waktu untuk memastikan tidak terlalu panjang." },
      { speaker: 'B', name: 'Presenter', text: "Good idea. I will do that now.", translation: "Ide bagus. Aku akan lakukan itu sekarang." }
    ]
  },
  {
    id: 'c10',
    title: "Body Language",
    context: "Seorang pelatih memberikan umpan balik.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Coach', text: "Your content is excellent, but you need to make eye contact.", translation: "Konten Anda sangat bagus, tapi Anda perlu melakukan kontak mata." },
      { speaker: 'B', name: 'Speaker', text: "I get nervous and look at the floor.", translation: "Saya jadi gugup dan melihat ke lantai." },
      { speaker: 'A', name: 'Coach', text: "Try to look at different people in the audience.", translation: "Cobalah untuk melihat orang yang berbeda di antara penonton." },
      { speaker: 'B', name: 'Speaker', text: "Okay, I will practice that. Thank you.", translation: "Baik, saya akan melatih itu. Terima kasih." }
    ]
  }
];

const InterSpeakingLesson15: React.FC = () => {
    const [activeScenario, setActiveScenario] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const currentScenario = CONVERSATION_SCENARIOS.find(c => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];

  
  
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_speaking', 15);
  const nextLessonPath = 15 < 20 ? `/modul/english/intermediate/speaking/lesson-${15+1}` : '/modul/english/intermediate';
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
        lessonLabel={"Intermediate Speaking Lesson 15"}
        accentColor="#E74C3C"
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
      title="Dasar-Dasar Public Speaking"
      subtitle="Speaking • Pelajaran 15"
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
              <h2 className="text-xl font-bold mb-2">Bicara dengan Percaya Diri</h2>
              <p className="text-sm opacity-90 leading-relaxed">Teknik 'Ice Breaking' dan transisi pergantian slide yang mulus untuk public speaking.</p>
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

export default InterSpeakingLesson15;
