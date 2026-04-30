import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Trophy, RefreshCw } from 'lucide-react';


const QUIZ_QUESTIONS = [
  {
    "id": 1,
    "question": "What is the most polite way to ask about someone's environment? [Q1]",
    "options": [
      "What is your environment problem?",
      "I would love to hear about your thoughts on environment.",
      "Tell me your environment now."
    ],
    "answer": "I would love to hear about your thoughts on environment.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 2,
    "question": "Fill the blank: \"When discussing environment, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about environment? [Q3]",
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
    "question": "If you want to interrupt politely during a conversation about environment, you say:",
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
    "question": "Select the best transition word: \"We talked about environment; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding environment? [Q6]",
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
    "question": "What is the most polite way to ask about someone's environment? [Q7]",
    "options": [
      "What is your environment problem?",
      "I would love to hear about your thoughts on environment.",
      "Tell me your environment now."
    ],
    "answer": "I would love to hear about your thoughts on environment.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 8,
    "question": "Fill the blank: \"When discussing environment, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about environment? [Q9]",
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
    "question": "If you want to interrupt politely during a conversation about environment, you say:",
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
    "question": "Select the best transition word: \"We talked about environment; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding environment? [Q12]",
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
    "question": "What is the most polite way to ask about someone's environment? [Q13]",
    "options": [
      "What is your environment problem?",
      "I would love to hear about your thoughts on environment.",
      "Tell me your environment now."
    ],
    "answer": "I would love to hear about your thoughts on environment.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 14,
    "question": "Fill the blank: \"When discussing environment, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about environment? [Q15]",
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
    "question": "If you want to interrupt politely during a conversation about environment, you say:",
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
    "question": "Select the best transition word: \"We talked about environment; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding environment? [Q18]",
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
    "question": "What is the most polite way to ask about someone's environment? [Q19]",
    "options": [
      "What is your environment problem?",
      "I would love to hear about your thoughts on environment.",
      "Tell me your environment now."
    ],
    "answer": "I would love to hear about your thoughts on environment.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 20,
    "question": "Fill the blank: \"When discussing environment, it's important to __ open-minded.\"",
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
    title: "Sorting Trash",
    context: "Di rumah.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Roommate', text: "Where should I put this plastic bottle?", translation: "Di mana saya harus taruh botol plastik ini?" },
      { speaker: 'B', name: 'You', text: "Put it in the recycling bin, not the trash.", translation: "Taruh di tempat sampah daur ulang, bukan sampah biasa." },
      { speaker: 'A', name: 'Roommate', text: "Okay. Do I need to wash it first?", translation: "Oke. Apa perlu dicuci dulu?" },
      { speaker: 'B', name: 'You', text: "Yes, please rinse it out.", translation: "Ya, tolong bilas dulu." }
    ]
  },
  {
    id: 'c2',
    title: "Climate Change",
    context: "Mendiskusikan cuaca.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Person A', text: "The summers seem to be getting hotter.", translation: "Musim panas sepertinya makin panas." },
      { speaker: 'B', name: 'Person B', text: "I agree. Global warming is a serious issue.", translation: "Saya setuju. Pemanasan global adalah masalah serius." },
      { speaker: 'A', name: 'Person A', text: "We need to reduce our carbon footprint.", translation: "Kita perlu mengurangi jejak karbon kita." },
      { speaker: 'B', name: 'Person B', text: "Absolutely, everyone must do their part.", translation: "Benar sekali, setiap orang harus ambil bagian." }
    ]
  },
  {
    id: 'c3',
    title: "Grocery Shopping",
    context: "Di kasir.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Cashier', text: "Would you like a plastic bag?", translation: "Mau pakai kantong plastik?" },
      { speaker: 'B', name: 'Shopper', text: "No thanks, I brought my reusable bag.", translation: "Tidak makasih, saya bawa tas guna ulang." },
      { speaker: 'A', name: 'Cashier', text: "That is great for the environment.", translation: "Itu bagus untuk lingkungan." },
      { speaker: 'B', name: 'Shopper', text: "I try to avoid single-use plastic.", translation: "Saya mencoba menghindari plastik sekali pakai." }
    ]
  },
  {
    id: 'c4',
    title: "Saving Energy",
    context: "Meninggalkan ruangan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Dad', text: "Hey, you left the lights on.", translation: "Hei, kamu biarkan lampunya menyala." },
      { speaker: 'B', name: 'Kid', text: "Sorry, I forgot to turn them off.", translation: "Maaf, aku lupa mematikannya." },
      { speaker: 'A', name: 'Dad', text: "We need to save electricity.", translation: "Kita perlu menghemat listrik." },
      { speaker: 'B', name: 'Kid', text: "I will be more careful next time.", translation: "Aku akan lebih hati-hati lain kali." }
    ]
  },
  {
    id: 'c5',
    title: "Commuting",
    context: "Berbicara tentang transportasi.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Alex', text: "Do you drive to work?", translation: "Kamu menyetir ke tempat kerja?" },
      { speaker: 'B', name: 'Sam', text: "No, I take the train.", translation: "Tidak, aku naik kereta." },
      { speaker: 'A', name: 'Alex', text: "Is it convenient?", translation: "Apakah nyaman?" },
      { speaker: 'B', name: 'Sam', text: "Yes, and it is better for the planet.", translation: "Ya, dan itu lebih baik untuk bumi." }
    ]
  },
  {
    id: 'c6',
    title: "Water Conservation",
    context: "Selama musim kemarau.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Neighbor 1', text: "The city declared a drought warning.", translation: "Kota mengumumkan peringatan kekeringan." },
      { speaker: 'B', name: 'Neighbor 2', text: "We must stop watering our lawns.", translation: "Kita harus berhenti menyiram halaman rumput." },
      { speaker: 'A', name: 'Neighbor 1', text: "I am taking shorter showers too.", translation: "Saya juga mandi lebih sebentar." },
      { speaker: 'B', name: 'Neighbor 2', text: "Every drop counts right now.", translation: "Setiap tetes berharga sekarang." }
    ]
  },
  {
    id: 'c7',
    title: "Clean Energy",
    context: "Melihat rumah.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Buyer', text: "Does this house have solar panels?", translation: "Apakah rumah ini punya panel surya?" },
      { speaker: 'B', name: 'Agent', text: "Yes, on the roof. It generates clean energy.", translation: "Ya, di atap. Itu menghasilkan energi bersih." },
      { speaker: 'A', name: 'Buyer', text: "Does it lower the electric bill?", translation: "Apakah itu menurunkan tagihan listrik?" },
      { speaker: 'B', name: 'Agent', text: "Significantly, especially in summer.", translation: "Secara signifikan, terutama di musim panas." }
    ]
  },
  {
    id: 'c8',
    title: "Ocean Pollution",
    context: "Berjalan di pantai.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tourist', text: "Look at all this trash on the sand.", translation: "Lihat semua sampah di pasir ini." },
      { speaker: 'B', name: 'Local', text: "It is terrible. The ocean is full of plastic.", translation: "Mengerikan. Laut penuh dengan plastik." },
      { speaker: 'A', name: 'Tourist', text: "We should pick some of it up.", translation: "Kita harus memungut sebagian." },
      { speaker: 'B', name: 'Local', text: "Good idea. Let's clean the beach.", translation: "Ide bagus. Ayo bersihkan pantainya." }
    ]
  },
  {
    id: 'c9',
    title: "Organic Food",
    context: "Di pasar petani.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Customer', text: "Are these vegetables organic?", translation: "Apakah sayuran ini organik?" },
      { speaker: 'B', name: 'Farmer', text: "Yes, we don't use harmful chemicals.", translation: "Ya, kami tidak pakai bahan kimia berbahaya." },
      { speaker: 'A', name: 'Customer', text: "That is healthier and eco-friendly.", translation: "Itu lebih sehat dan ramah lingkungan." },
      { speaker: 'B', name: 'Farmer', text: "Exactly. It protects the soil.", translation: "Tepat. Itu melindungi tanah." }
    ]
  },
  {
    id: 'c10',
    title: "Air Quality",
    context: "Berjalan di kota.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Pedestrian 1', text: "The smog is really bad today.", translation: "Kabut asapnya parah sekali hari ini." },
      { speaker: 'B', name: 'Pedestrian 2', text: "I know, it is hard to breathe.", translation: "Aku tahu, susah bernapas." },
      { speaker: 'A', name: 'Pedestrian 1', text: "Too many cars on the road.", translation: "Terlalu banyak mobil di jalan." },
      { speaker: 'B', name: 'Pedestrian 2', text: "We need more electric vehicles.", translation: "Kita butuh lebih banyak kendaraan listrik." }
    ]
  }
];

const InterSpeakingLesson5: React.FC = () => {
    const [activeScenario, setActiveScenario] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const currentScenario = CONVERSATION_SCENARIOS.find(c => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];

  
  
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_speaking', 5);
  const nextLessonPath = 5 < 20 ? `/modul/english/intermediate/speaking/lesson-${5+1}` : '/modul/english/intermediate';
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
        lessonLabel={"Intermediate Speaking Lesson 5"}
        accentColor="#E74C3C"
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
      title="Lingkungan"
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
        <div className="flex-1 overflow-y-auto scroll-smooth">
          <div className="p-4 md:p-8 space-y-6 pb-24">
            <section className="rounded-2xl p-6 shadow-lg text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #E74C3C, #E74C3C99)' }}>
              <h2 className="text-xl font-bold mb-2">Ramah Lingkungan</h2>
              <p className="text-sm opacity-90 leading-relaxed">Mempelajari cara membangun opini ekologis: pemanasan global, polusi, dan gaya hidup berkelanjutan.</p>
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

export default InterSpeakingLesson5;
