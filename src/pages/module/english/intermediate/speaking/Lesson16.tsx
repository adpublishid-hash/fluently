import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Trophy } from 'lucide-react';


const QUIZ_QUESTIONS = [
  {
    "id": 1,
    "question": "What is the most polite way to ask about someone's storytelling? [Q1]",
    "options": [
      "Tell me your story now.",
      "What is your story problem?",
      "I would love to hear about your thoughts on storytelling."
    ],
    "answer": "I would love to hear about your thoughts on storytelling.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 2,
    "question": "Fill the blank: \"When discussing story, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about story? [Q3]",
    "options": [
      "I see your point, but...",
      "That is totally wrong.",
      "I couldn't agree more."
    ],
    "answer": "I couldn't agree more.",
    "explanation": "'I couldn't agree more' menyatakan persetujuan 100% (tidak ada yang bisa ditambahkan karena sudah sangat setuju)."
  },
  {
    "id": 4,
    "question": "If you want to interrupt politely during a conversation about story, you say:",
    "options": [
      "Excuse me, may I add something here?",
      "Wait, give me a chance.",
      "Stop talking for a moment."
    ],
    "answer": "Excuse me, may I add something here?",
    "explanation": "'Excuse me, may I add something here' adalah standar baku (CEFR B2) untuk interupsi yang menghormati pembicara."
  },
  {
    "id": 5,
    "question": "Select the best transition word: \"We talked about storytelling; ____, we should also discuss the future impacts.\"",
    "options": [
      "Despite",
      "Furthermore",
      "Because"
    ],
    "answer": "Furthermore",
    "explanation": "'Furthermore' memperluas / menambahkan poin pada ide dasar sebelumnya secara terstruktur."
  },
  {
    "id": 6,
    "question": "Which idiom best describes a very easy task regarding story? [Q6]",
    "options": [
      "Bite the bullet",
      "Under the weather",
      "A piece of cake"
    ],
    "answer": "A piece of cake",
    "explanation": "'A piece of cake' secara harafiah berarti sesuatu yang sangat mudah dikerjakan atau diucapkan."
  },
  {
    "id": 7,
    "question": "What is the most polite way to ask about someone's storytelling? [Q7]",
    "options": [
      "Tell me your story now.",
      "What is your story problem?",
      "I would love to hear about your thoughts on storytelling."
    ],
    "answer": "I would love to hear about your thoughts on storytelling.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 8,
    "question": "Fill the blank: \"When discussing story, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about story? [Q9]",
    "options": [
      "I see your point, but...",
      "I couldn't agree more.",
      "That is totally wrong."
    ],
    "answer": "I couldn't agree more.",
    "explanation": "'I couldn't agree more' menyatakan persetujuan 100% (tidak ada yang bisa ditambahkan karena sudah sangat setuju)."
  },
  {
    "id": 10,
    "question": "If you want to interrupt politely during a conversation about story, you say:",
    "options": [
      "Excuse me, may I add something here?",
      "Wait, give me a chance.",
      "Stop talking for a moment."
    ],
    "answer": "Excuse me, may I add something here?",
    "explanation": "'Excuse me, may I add something here' adalah standar baku (CEFR B2) untuk interupsi yang menghormati pembicara."
  },
  {
    "id": 11,
    "question": "Select the best transition word: \"We talked about storytelling; ____, we should also discuss the future impacts.\"",
    "options": [
      "Despite",
      "Furthermore",
      "Because"
    ],
    "answer": "Furthermore",
    "explanation": "'Furthermore' memperluas / menambahkan poin pada ide dasar sebelumnya secara terstruktur."
  },
  {
    "id": 12,
    "question": "Which idiom best describes a very easy task regarding story? [Q12]",
    "options": [
      "Under the weather",
      "Bite the bullet",
      "A piece of cake"
    ],
    "answer": "A piece of cake",
    "explanation": "'A piece of cake' secara harafiah berarti sesuatu yang sangat mudah dikerjakan atau diucapkan."
  },
  {
    "id": 13,
    "question": "What is the most polite way to ask about someone's storytelling? [Q13]",
    "options": [
      "Tell me your story now.",
      "I would love to hear about your thoughts on storytelling.",
      "What is your story problem?"
    ],
    "answer": "I would love to hear about your thoughts on storytelling.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 14,
    "question": "Fill the blank: \"When discussing story, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about story? [Q15]",
    "options": [
      "That is totally wrong.",
      "I couldn't agree more.",
      "I see your point, but..."
    ],
    "answer": "I couldn't agree more.",
    "explanation": "'I couldn't agree more' menyatakan persetujuan 100% (tidak ada yang bisa ditambahkan karena sudah sangat setuju)."
  },
  {
    "id": 16,
    "question": "If you want to interrupt politely during a conversation about story, you say:",
    "options": [
      "Excuse me, may I add something here?",
      "Wait, give me a chance.",
      "Stop talking for a moment."
    ],
    "answer": "Excuse me, may I add something here?",
    "explanation": "'Excuse me, may I add something here' adalah standar baku (CEFR B2) untuk interupsi yang menghormati pembicara."
  },
  {
    "id": 17,
    "question": "Select the best transition word: \"We talked about storytelling; ____, we should also discuss the future impacts.\"",
    "options": [
      "Despite",
      "Furthermore",
      "Because"
    ],
    "answer": "Furthermore",
    "explanation": "'Furthermore' memperluas / menambahkan poin pada ide dasar sebelumnya secara terstruktur."
  },
  {
    "id": 18,
    "question": "Which idiom best describes a very easy task regarding story? [Q18]",
    "options": [
      "Under the weather",
      "Bite the bullet",
      "A piece of cake"
    ],
    "answer": "A piece of cake",
    "explanation": "'A piece of cake' secara harafiah berarti sesuatu yang sangat mudah dikerjakan atau diucapkan."
  },
  {
    "id": 19,
    "question": "What is the most polite way to ask about someone's storytelling? [Q19]",
    "options": [
      "What is your story problem?",
      "I would love to hear about your thoughts on storytelling.",
      "Tell me your story now."
    ],
    "answer": "I would love to hear about your thoughts on storytelling.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 20,
    "question": "Fill the blank: \"When discussing story, it's important to __ open-minded.\"",
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
    title: "Setting the Scene",
    context: "Memulai cerita seram.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Storyteller', text: "It was a dark and stormy night...", translation: "Malam itu gelap dan berbadai..." },
      { speaker: 'B', name: 'Listener', text: "Ooh, I like this already.", translation: "Ooh, aku sudah suka ini." },
      { speaker: 'A', name: 'Storyteller', text: "The wind howled through the old house.", translation: "Angin menderu-deru melalui rumah tua itu." },
      { speaker: 'B', name: 'Listener', text: "Sounds creepy.", translation: "Kedengarannya menyeramkan." }
    ]
  },
  {
    id: 'c2',
    title: "Building Suspense",
    context: "Menciptakan ketegangan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Storyteller', text: "He walked slowly down the long, dark hallway.", translation: "Dia berjalan perlahan menyusuri lorong panjang yang gelap." },
      { speaker: 'B', name: 'Listener', text: "And then what happened?", translation: "Lalu apa yang terjadi?" },
      { speaker: 'A', name: 'Storyteller', text: "Suddenly... he heard a noise.", translation: "Tiba-tiba... dia mendengar suara." },
      { speaker: 'B', name: 'Listener', text: "What kind of noise?", translation: "Suara apa?" }
    ]
  },
  {
    id: 'c3',
    title: "Action & Excitement",
    context: "Mendeskripsikan kejadian cepat.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Storyteller', text: "Without thinking, she grabbed the keys and ran!", translation: "Tanpa berpikir, dia menyambar kunci dan berlari!" },
      { speaker: 'B', name: 'Listener', text: "Was anyone chasing her?", translation: "Apa ada yang mengejarnya?" },
      { speaker: 'A', name: 'Storyteller', text: "Yes! A huge dog was right behind her!", translation: "Ya! Seekor anjing besar tepat di belakangnya!" },
      { speaker: 'B', name: 'Listener', text: "Wow!", translation: "Wow!" }
    ]
  },
  {
    id: 'c4',
    title: "Character Voices",
    context: "Menggunakan nada berbeda.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Narrator', text: "The giant looked down and roared...", translation: "Raksasa itu menunduk dan mengaum..." },
      { speaker: 'B', name: 'Giant (low voice)', text: "'Who dares to enter my castle?'", translation: "'Siapa yang berani masuk ke kastilku?'" },
      { speaker: 'A', name: 'Narrator', text: "A small mouse squeaked from the floor...", translation: "Seekor tikus kecil mencicit dari lantai..." },
      { speaker: 'B', name: 'Mouse (high voice)', text: "'It was only me, sir!'", translation: "'Hanya saya, Tuan!'" }
    ]
  },
  {
    id: 'c5',
    title: "The Punchline",
    context: "Menyampaikan lelucon.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Joker', text: "Why don't scientists trust atoms?", translation: "Kenapa ilmuwan tidak percaya atom?" },
      { speaker: 'B', name: 'Friend', text: "I don't know, why?", translation: "Aku tidak tahu, kenapa?" },
      { speaker: 'A', name: 'Joker', text: "(Pause)... Because they make up everything!", translation: "(Jeda)... Karena mereka menyusun segalanya! (dan juga 'mengarang cerita')" },
      { speaker: 'B', name: 'Friend', text: "(Groans) That's a terrible joke.", translation: "(Mengeluh) Itu lelucon yang buruk sekali." }
    ]
  },
  {
    id: 'c6',
    title: "Sad Moment",
    context: "Mendeskripsikan kehilangan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Storyteller', text: "She watched as the ship sailed away.", translation: "Dia melihat kapal itu berlayar pergi." },
      { speaker: 'B', name: 'Listener', text: "Did she cry?", translation: "Apa dia menangis?" },
      { speaker: 'A', name: 'Storyteller', text: "A single tear rolled down her cheek.", translation: "Setetes air mata mengalir di pipinya." },
      { speaker: 'B', name: 'Listener', text: "That is so sad.", translation: "Itu sangat sedih." }
    ]
  },
  {
    id: 'c7',
    title: "Happy Ending",
    context: "Mengakhiri dongeng.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Parent', text: "And so, the prince found his princess.", translation: "Dan begitulah, pangeran menemukan putrinya." },
      { speaker: 'B', name: 'Child', text: "Did they get married?", translation: "Apa mereka menikah?" },
      { speaker: 'A', name: 'Parent', text: "Yes, and they all lived happily ever after.", translation: "Ya, dan mereka semua hidup bahagia selamanya." },
      { speaker: 'B', name: 'Child', text: "Yay! The end.", translation: "Hore! Tamat." }
    ]
  },
  {
    id: 'c8',
    title: "Engaging the Listener",
    context: "Bertanya.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Teacher', text: "He opened the box. And what do you think was inside?", translation: "Dia membuka kotak itu. Dan menurutmu apa isinya?" },
      { speaker: 'B', name: 'Student', text: "Was it gold?", translation: "Apakah itu emas?" },
      { speaker: 'A', name: 'Teacher', text: "No, it was something much more valuable...", translation: "Bukan, itu sesuatu yang jauh lebih berharga..." },
      { speaker: 'B', name: 'Student', text: "What? Tell me!", translation: "Apa? Beritahu aku!" }
    ]
  },
  {
    id: 'c9',
    title: "Internal Thought",
    context: "Menunjukkan pikiran karakter.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Narrator', text: "He saw the two doors in front of him.", translation: "Dia melihat dua pintu di depannya." },
      { speaker: 'B', name: 'Narrator (quietly)', text: "'Which one should I choose?' he thought.", translation: "'Yang mana yang harus kupilih?' pikirnya." },
      { speaker: 'A', name: 'Narrator', text: "He had to make a decision quickly.", translation: "Dia harus membuat keputusan dengan cepat." },
      { speaker: 'B', name: 'Listener', text: "This is so tense!", translation: "Ini sangat menegangkan!" }
    ]
  },
  {
    id: 'c10',
    title: "The Grand Finale",
    context: "Kesimpulan yang kuat.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Speaker', text: "So, in the end, it was not about the destination.", translation: "Jadi, pada akhirnya, ini bukan tentang tujuan." },
      { speaker: 'B', name: 'Audience', text: "(Listening intently)", translation: "(Mendengarkan dengan saksama)" },
      { speaker: 'A', name: 'Speaker', text: "It was about the journey we shared together.", translation: "Ini tentang perjalanan yang kita lalui bersama." },
      { speaker: 'B', name: 'Audience', text: "(Applause)", translation: "(Tepuk tangan)" }
    ]
  }
];

const InterSpeakingLesson16: React.FC = () => {
    const [activeScenario, setActiveScenario] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const currentScenario = CONVERSATION_SCENARIOS.find(c => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];

  
  
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_speaking', 16);
  const nextLessonPath = 16 < 20 ? `/modul/english/intermediate/speaking/lesson-${16+1}` : '/modul/english/intermediate';
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
        lessonLabel={"Intermediate Speaking Lesson 16"}
        accentColor="#E74C3C"
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
      title="Bercerita"
      subtitle="Speaking • Pelajaran 16"
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
              <h2 className="text-xl font-bold mb-2">Jadilah Pencerita 📖</h2>
              <p className="text-sm opacity-90 leading-relaxed">Merangkai plot. Bagaimana menahan perhatian audiens menggunakan intonasi cerita yang berbobot.</p>
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

export default InterSpeakingLesson16;
