import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Trophy, RefreshCw } from 'lucide-react';


const QUIZ_QUESTIONS = [
  {
    "id": 1,
    "question": "What is the most polite way to ask about someone's idioms and expressions? [Q1]",
    "options": [
      "What is your idiom problem?",
      "I would love to hear about your thoughts on idioms and expressions.",
      "Tell me your idiom now."
    ],
    "answer": "I would love to hear about your thoughts on idioms and expressions.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 2,
    "question": "Fill the blank: \"When discussing idiom, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about idiom? [Q3]",
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
    "question": "If you want to interrupt politely during a conversation about idiom, you say:",
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
    "question": "Select the best transition word: \"We talked about idioms and expressions; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding idiom? [Q6]",
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
    "question": "What is the most polite way to ask about someone's idioms and expressions? [Q7]",
    "options": [
      "What is your idiom problem?",
      "I would love to hear about your thoughts on idioms and expressions.",
      "Tell me your idiom now."
    ],
    "answer": "I would love to hear about your thoughts on idioms and expressions.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 8,
    "question": "Fill the blank: \"When discussing idiom, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about idiom? [Q9]",
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
    "question": "If you want to interrupt politely during a conversation about idiom, you say:",
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
    "question": "Select the best transition word: \"We talked about idioms and expressions; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding idiom? [Q12]",
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
    "question": "What is the most polite way to ask about someone's idioms and expressions? [Q13]",
    "options": [
      "What is your idiom problem?",
      "I would love to hear about your thoughts on idioms and expressions.",
      "Tell me your idiom now."
    ],
    "answer": "I would love to hear about your thoughts on idioms and expressions.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 14,
    "question": "Fill the blank: \"When discussing idiom, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about idiom? [Q15]",
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
    "question": "If you want to interrupt politely during a conversation about idiom, you say:",
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
    "question": "Select the best transition word: \"We talked about idioms and expressions; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding idiom? [Q18]",
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
    "question": "What is the most polite way to ask about someone's idioms and expressions? [Q19]",
    "options": [
      "What is your idiom problem?",
      "I would love to hear about your thoughts on idioms and expressions.",
      "Tell me your idiom now."
    ],
    "answer": "I would love to hear about your thoughts on idioms and expressions.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 20,
    "question": "Fill the blank: \"When discussing idiom, it's important to __ open-minded.\"",
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
    title: "Easy Task",
    context: "Mendiskusikan ujian baru-baru ini.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tom', text: "How was the math test yesterday?", translation: "Bagaimana ujian matematikanya kemarin?" },
      { speaker: 'B', name: 'Jerry', text: "It was a piece of cake.", translation: "Itu sangat mudah (sepotong kue)." },
      { speaker: 'A', name: 'Tom', text: "Really? I thought it was quite hard.", translation: "Benarkah? Aku pikir itu cukup sulit." },
      { speaker: 'B', name: 'Jerry', text: "I studied all week, so it felt easy.", translation: "Aku belajar sepanjang minggu, jadi rasanya mudah." }
    ]
  },
  {
    id: 'c2',
    title: "Good Luck",
    context: "Sebelum pertunjukan panggung.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Sarah', text: "I am so nervous about the show tonight.", translation: "Aku sangat gugup tentang pertunjukan malam ini." },
      { speaker: 'B', name: 'Mike', text: "Don't worry, you will be great.", translation: "Jangan khawatir, kamu akan hebat." },
      { speaker: 'A', name: 'Sarah', text: "I hope I don't forget my lines.", translation: "Aku harap aku tidak lupa dialogku." },
      { speaker: 'B', name: 'Mike', text: "You won't. Break a leg!", translation: "Tidak akan. Semoga sukses! (Patahkan kaki!)" }
    ]
  },
  {
    id: 'c3',
    title: "Expensive Item",
    context: "Melihat mobil baru.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Bob', text: "Look at that sports car.", translation: "Lihat mobil sport itu." },
      { speaker: 'B', name: 'Alice', text: "It is beautiful, but it must be pricey.", translation: "Indah sekali, tapi pasti mahal." },
      { speaker: 'A', name: 'Bob', text: "Yeah, it costs an arm and a leg.", translation: "Ya, harganya selangit (seharga lengan dan kaki)." },
      { speaker: 'B', name: 'Alice', text: "I definitely can't afford it.", translation: "Aku pasti tidak mampu membelinya." }
    ]
  },
  {
    id: 'c4',
    title: "Feeling Sick",
    context: "Menelpon rekan kerja.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Colleague', text: "Are you coming to the meeting?", translation: "Apa kamu datang ke rapat?" },
      { speaker: 'B', name: 'You', text: "No, I'm feeling a bit under the weather.", translation: "Tidak, aku merasa agak kurang sehat (di bawah cuaca)." },
      { speaker: 'A', name: 'Colleague', text: "Oh, I am sorry to hear that.", translation: "Oh, aku turut sedih mendengarnya." },
      { speaker: 'B', name: 'You', text: "I think I have a cold. I'll stay home.", translation: "Sepertinya aku pilek. Aku akan di rumah saja." }
    ]
  },
  {
    id: 'c5',
    title: "Secret Revealed",
    context: "Mendiskusikan pesta kejutan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Jane', text: "Did you tell Mark about the party?", translation: "Apa kamu memberitahu Mark tentang pestanya?" },
      { speaker: 'B', name: 'John', text: "I accidentally let the cat out of the bag.", translation: "Aku tidak sengaja membocorkan rahasianya (mengeluarkan kucing dari tas)." },
      { speaker: 'A', name: 'Jane', text: "Oh no! Now it's not a surprise.", translation: "Oh tidak! Sekarang bukan kejutan lagi." },
      { speaker: 'B', name: 'John', text: "I know, I feel terrible about it.", translation: "Aku tahu, aku merasa sangat bersalah." }
    ]
  },
  {
    id: 'c6',
    title: "Studying Hard",
    context: "Persiapan ujian akhir.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Student 1', text: "Do you want to go to the cinema?", translation: "Mau pergi ke bioskop?" },
      { speaker: 'B', name: 'Student 2', text: "I can't. I have to hit the books.", translation: "Gak bisa. Aku harus belajar giat (memukul buku)." },
      { speaker: 'A', name: 'Student 1', text: "But the exam is next week.", translation: "Tapi ujiannya minggu depan." },
      { speaker: 'B', name: 'Student 2', text: "I have a lot to catch up on.", translation: "Banyak yang harus aku kejar." }
    ]
  },
  {
    id: 'c7',
    title: "Rare Occurrence",
    context: "Bicara tentang kebiasaan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend', text: "Does your brother ever cook?", translation: "Apa kakakmu pernah masak?" },
      { speaker: 'B', name: 'You', text: "Only once in a blue moon.", translation: "Sangat jarang (sekali dalam bulan biru)." },
      { speaker: 'A', name: 'Friend', text: "Is he good at it?", translation: "Apa dia jago?" },
      { speaker: 'B', name: 'You', text: "Actually, yes. His pasta is great.", translation: "Sebenarnya, ya. Pastanya enak." }
    ]
  },
  {
    id: 'c8',
    title: "Agreement",
    context: "Membuat keputusan.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Manager 1', text: "I think we should delay the launch.", translation: "Saya pikir kita harus menunda peluncurannya." },
      { speaker: 'B', name: 'Manager 2', text: "I see eye to eye with you on that.", translation: "Saya setuju (melihat mata ke mata) dengan Anda soal itu." },
      { speaker: 'A', name: 'Manager 1', text: "Great. We need more time to test.", translation: "Bagus. Kita butuh lebih banyak waktu untuk menguji." },
      { speaker: 'B', name: 'Manager 2', text: "Let's schedule a meeting for Monday.", translation: "Ayo jadwalkan rapat hari Senin." }
    ]
  },
  {
    id: 'c9',
    title: "Impossible Event",
    context: "Percakapan skeptis.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Sam', text: "Do you think Tom will ever arrive on time?", translation: "Apa menurutmu Tom akan pernah datang tepat waktu?" },
      { speaker: 'B', name: 'Ben', text: "Yeah, when pigs fly!", translation: "Ya, kalau babi bisa terbang! (Tidak mungkin)" },
      { speaker: 'A', name: 'Sam', text: "He is always at least 30 minutes late.", translation: "Dia selalu telat minimal 30 menit." },
      { speaker: 'B', name: 'Ben', text: "We should just tell him an earlier time.", translation: "Kita harusnya bilang jam yang lebih awal ke dia." }
    ]
  },
  {
    id: 'c10',
    title: "Efficiency",
    context: "Menjalankan tugas.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Mom', text: "I need to go to the bank and the grocery store.", translation: "Ibu harus ke bank dan toko kelontong." },
      { speaker: 'B', name: 'Dad', text: "The grocery store is right next to the bank.", translation: "Toko kelontongnya tepat di sebelah bank." },
      { speaker: 'A', name: 'Mom', text: "Perfect. I can kill two birds with one stone.", translation: "Sempurna. Ibu bisa selesaikan dua hal sekaligus (bunuh dua burung dengan satu batu)." },
      { speaker: 'B', name: 'Dad', text: "I will drive you there.", translation: "Ayah antar ke sana." }
    ]
  }
];

const InterSpeakingLesson13: React.FC = () => {
    const [activeScenario, setActiveScenario] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const currentScenario = CONVERSATION_SCENARIOS.find(c => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];

  
  
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_speaking', 13);
  const nextLessonPath = 13 < 20 ? `/modul/english/intermediate/speaking/lesson-${13+1}` : '/modul/english/intermediate';
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
        lessonLabel={"Intermediate Speaking Lesson 13"}
        accentColor="#E74C3C"
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
      title="Idiom & Ungkapan"
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
        <div className="flex-1 overflow-y-auto scroll-smooth">
          <div className="p-4 md:p-8 space-y-6 pb-24">
            <section className="rounded-2xl p-6 shadow-lg text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #E74C3C, #E74C3C99)' }}>
              <h2 className="text-xl font-bold mb-2">Bicara Secara Alami</h2>
              <p className="text-sm opacity-90 leading-relaxed">Berlatih menggunakan kiasan/Idiom (e.g. 'piece of cake', 'under the weather') agar terdengar seperti native speaker.</p>
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

export default InterSpeakingLesson13;
