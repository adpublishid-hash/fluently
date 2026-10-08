import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Trophy } from 'lucide-react';


const QUIZ_QUESTIONS = [
  {
    "id": 1,
    "question": "What is the most polite way to ask about someone's global topics? [Q1]",
    "options": [
      "I would love to hear about your thoughts on global topics.",
      "What is your global problem?",
      "Tell me your global now."
    ],
    "answer": "I would love to hear about your thoughts on global topics.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 2,
    "question": "Fill the blank: \"When discussing global, it's important to __ open-minded.\"",
    "options": [
      "stay",
      "make",
      "keep"
    ],
    "answer": "stay",
    "explanation": "Phrase yang tepat adalah 'stay open-minded' yang berarti mempertahankan pemikiran terbuka."
  },
  {
    "id": 3,
    "question": "Which response strongly agrees with a statement about global? [Q3]",
    "options": [
      "I couldn't agree more.",
      "I see your point, but...",
      "That is totally wrong."
    ],
    "answer": "I couldn't agree more.",
    "explanation": "'I couldn't agree more' menyatakan persetujuan 100% (tidak ada yang bisa ditambahkan karena sudah sangat setuju)."
  },
  {
    "id": 4,
    "question": "If you want to interrupt politely during a conversation about global, you say:",
    "options": [
      "Wait, give me a chance.",
      "Excuse me, may I add something here?",
      "Stop talking for a moment."
    ],
    "answer": "Excuse me, may I add something here?",
    "explanation": "'Excuse me, may I add something here' adalah standar baku (CEFR B2) untuk interupsi yang menghormati pembicara."
  },
  {
    "id": 5,
    "question": "Select the best transition word: \"We talked about global topics; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding global? [Q6]",
    "options": [
      "Under the weather",
      "Bite the bullet",
      "A piece of cake"
    ],
    "answer": "A piece of cake",
    "explanation": "'A piece of cake' secara harafiah berarti sesuatu yang sangat mudah dikerjakan atau diucapkan."
  },
  {
    "id": 7,
    "question": "What is the most polite way to ask about someone's global topics? [Q7]",
    "options": [
      "Tell me your global now.",
      "What is your global problem?",
      "I would love to hear about your thoughts on global topics."
    ],
    "answer": "I would love to hear about your thoughts on global topics.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 8,
    "question": "Fill the blank: \"When discussing global, it's important to __ open-minded.\"",
    "options": [
      "stay",
      "make",
      "keep"
    ],
    "answer": "stay",
    "explanation": "Phrase yang tepat adalah 'stay open-minded' yang berarti mempertahankan pemikiran terbuka."
  },
  {
    "id": 9,
    "question": "Which response strongly agrees with a statement about global? [Q9]",
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
    "question": "If you want to interrupt politely during a conversation about global, you say:",
    "options": [
      "Wait, give me a chance.",
      "Excuse me, may I add something here?",
      "Stop talking for a moment."
    ],
    "answer": "Excuse me, may I add something here?",
    "explanation": "'Excuse me, may I add something here' adalah standar baku (CEFR B2) untuk interupsi yang menghormati pembicara."
  },
  {
    "id": 11,
    "question": "Select the best transition word: \"We talked about global topics; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding global? [Q12]",
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
    "question": "What is the most polite way to ask about someone's global topics? [Q13]",
    "options": [
      "What is your global problem?",
      "I would love to hear about your thoughts on global topics.",
      "Tell me your global now."
    ],
    "answer": "I would love to hear about your thoughts on global topics.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 14,
    "question": "Fill the blank: \"When discussing global, it's important to __ open-minded.\"",
    "options": [
      "stay",
      "make",
      "keep"
    ],
    "answer": "stay",
    "explanation": "Phrase yang tepat adalah 'stay open-minded' yang berarti mempertahankan pemikiran terbuka."
  },
  {
    "id": 15,
    "question": "Which response strongly agrees with a statement about global? [Q15]",
    "options": [
      "I see your point, but...",
      "That is totally wrong.",
      "I couldn't agree more."
    ],
    "answer": "I couldn't agree more.",
    "explanation": "'I couldn't agree more' menyatakan persetujuan 100% (tidak ada yang bisa ditambahkan karena sudah sangat setuju)."
  },
  {
    "id": 16,
    "question": "If you want to interrupt politely during a conversation about global, you say:",
    "options": [
      "Wait, give me a chance.",
      "Excuse me, may I add something here?",
      "Stop talking for a moment."
    ],
    "answer": "Excuse me, may I add something here?",
    "explanation": "'Excuse me, may I add something here' adalah standar baku (CEFR B2) untuk interupsi yang menghormati pembicara."
  },
  {
    "id": 17,
    "question": "Select the best transition word: \"We talked about global topics; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding global? [Q18]",
    "options": [
      "Bite the bullet",
      "Under the weather",
      "A piece of cake"
    ],
    "answer": "A piece of cake",
    "explanation": "'A piece of cake' secara harafiah berarti sesuatu yang sangat mudah dikerjakan atau diucapkan."
  },
  {
    "id": 19,
    "question": "What is the most polite way to ask about someone's global topics? [Q19]",
    "options": [
      "Tell me your global now.",
      "I would love to hear about your thoughts on global topics.",
      "What is your global problem?"
    ],
    "answer": "I would love to hear about your thoughts on global topics.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 20,
    "question": "Fill the blank: \"When discussing global, it's important to __ open-minded.\"",
    "options": [
      "stay",
      "make",
      "keep"
    ],
    "answer": "stay",
    "explanation": "Phrase yang tepat adalah 'stay open-minded' yang berarti mempertahankan pemikiran terbuka."
  }
];

const CONVERSATION_SCENARIOS: Scenario[] = [
  {
    id: 'c1',
    title: "Cultural Customs",
    context: "Mendiskusikan etiket.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tourist', text: "Should I tip the waiter here?", translation: "Haruskah saya memberi tip kepada pelayan di sini?" },
      { speaker: 'B', name: 'Local', text: "No, tipping is not customary in Japan.", translation: "Tidak, memberi tip bukanlah kebiasaan di Jepang." },
      { speaker: 'A', name: 'Tourist', text: "Oh, I didn't know that. Thanks.", translation: "Oh, saya tidak tahu itu. Terima kasih." },
      { speaker: 'B', name: 'Local', text: "It can actually be considered rude.", translation: "Itu sebenarnya bisa dianggap tidak sopan." }
    ]
  },
  {
    id: 'c2',
    title: "Lost Passport",
    context: "Situasi darurat.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Traveler', text: "I think I lost my passport.", translation: "Sepertinya saya kehilangan paspor saya." },
      { speaker: 'B', name: 'Official', text: "You must report it to the embassy immediately.", translation: "Anda harus segera melaporkannya ke kedutaan." },
      { speaker: 'A', name: 'Traveler', text: "Where is the nearest embassy?", translation: "Di mana kedutaan terdekat?" },
      { speaker: 'B', name: 'Official', text: "It is downtown, next to the bank.", translation: "Ada di pusat kota, di sebelah bank." }
    ]
  },
  {
    id: 'c3',
    title: "Jet Lag",
    context: "Menghadapi zona waktu.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Alice', text: "You look exhausted.", translation: "Kamu terlihat sangat lelah." },
      { speaker: 'B', name: 'Bob', text: "I have terrible jet lag.", translation: "Saya mengalami jet lag yang parah." },
      { speaker: 'A', name: 'Alice', text: "What time is it in your country?", translation: "Jam berapa sekarang di negaramu?" },
      { speaker: 'B', name: 'Bob', text: "It is 3 AM there right now.", translation: "Sekarang jam 3 pagi di sana." }
    ]
  },
  {
    id: 'c4',
    title: "Eco-Tourism",
    context: "Wisata bertanggung jawab.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Guide', text: "Please do not touch the coral reefs.", translation: "Tolong jangan sentuh terumbu karang." },
      { speaker: 'B', name: 'Diver', text: "Why? Are they dangerous?", translation: "Kenapa? Apa berbahaya?" },
      { speaker: 'A', name: 'Guide', text: "No, but they are very fragile ecosystems.", translation: "Tidak, tapi mereka ekosistem yang sangat rapuh." },
      { speaker: 'B', name: 'Diver', text: "I understand. I will be careful.", translation: "Saya mengerti. Saya akan berhati-hati." }
    ]
  },
  {
    id: 'c5',
    title: "Language Barrier",
    context: "Kesulitan berkomunikasi.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Sam', text: "The taxi driver doesn't speak English.", translation: "Sopir taksi tidak bisa bahasa Inggris." },
      { speaker: 'B', name: 'Mia', text: "Use the translation app on your phone.", translation: "Gunakan aplikasi terjemahan di HP-mu." },
      { speaker: 'A', name: 'Sam', text: "Good idea. I will show him the address.", translation: "Ide bagus. Aku akan tunjukkan alamatnya." },
      { speaker: 'B', name: 'Mia', text: "Technology makes travel so much easier.", translation: "Teknologi membuat perjalanan jadi jauh lebih mudah." }
    ]
  },
  {
    id: 'c6',
    title: "Street Food",
    context: "Mencoba kuliner lokal.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Foodie', text: "This smells delicious. What is it?", translation: "Baunya enak. Apa ini?" },
      { speaker: 'B', name: 'Vendor', text: "It is spicy noodle soup, a local specialty.", translation: "Ini sup mie pedas, khas lokal." },
      { speaker: 'A', name: 'Foodie', text: "Is it very spicy?", translation: "Apakah sangat pedas?" },
      { speaker: 'B', name: 'Vendor', text: "Yes, but I can make it mild for you.", translation: "Ya, tapi saya bisa buatkan yang tidak terlalu pedas untuk Anda." }
    ]
  },
  {
    id: 'c7',
    title: "Global Warming",
    context: "Mendiskusikan isu dunia.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Student 1', text: "Climate change is a global crisis.", translation: "Perubahan iklim adalah krisis global." },
      { speaker: 'B', name: 'Student 2', text: "Yes, sea levels are rising every year.", translation: "Ya, permukaan laut naik setiap tahun." },
      { speaker: 'A', name: 'Student 1', text: "Countries need to work together.", translation: "Negara-negara perlu bekerja sama." },
      { speaker: 'B', name: 'Student 2', text: "We must reduce carbon emissions.", translation: "Kita harus mengurangi emisi karbon." }
    ]
  },
  {
    id: 'c8',
    title: "Souvenir Shopping",
    context: "Membeli oleh-oleh.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Shopper', text: "I want to buy something traditional.", translation: "Saya ingin membeli sesuatu yang tradisional." },
      { speaker: 'B', name: 'Seller', text: "How about this handmade silk scarf?", translation: "Bagaimana dengan syal sutra buatan tangan ini?" },
      { speaker: 'A', name: 'Shopper', text: "It is beautiful. How much is it?", translation: "Indah sekali. Berapa harganya?" },
      { speaker: 'B', name: 'Seller', text: "For you, special price. 50 dollars.", translation: "Untuk Anda, harga spesial. 50 dolar." }
    ]
  },
  {
    id: 'c9',
    title: "Immigration",
    context: "Wawancara imigrasi.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Officer', text: "What is the purpose of your visit?", translation: "Apa tujuan kunjungan Anda?" },
      { speaker: 'B', name: 'Visitor', text: "I am here for a business conference.", translation: "Saya di sini untuk konferensi bisnis." },
      { speaker: 'A', name: 'Officer', text: "How long do you intend to stay?", translation: "Berapa lama Anda berencana tinggal?" },
      { speaker: 'B', name: 'Visitor', text: "I will be here for five days.", translation: "Saya akan di sini selama lima hari." }
    ]
  },
  {
    id: 'c10',
    title: "Digital Nomad",
    context: "Bekerja sambil jalan-jalan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Traveler 1', text: "Do you live here or are you visiting?", translation: "Kamu tinggal di sini atau sedang berkunjung?" },
      { speaker: 'B', name: 'Traveler 2', text: "I am a digital nomad. I work remotely.", translation: "Saya pengembara digital. Saya kerja jarak jauh." },
      { speaker: 'A', name: 'Traveler 1', text: "That must be a great lifestyle.", translation: "Pasti gaya hidup yang menyenangkan." },
      { speaker: 'B', name: 'Traveler 2', text: "It is freedom, but the Wi-Fi must be good!", translation: "Ini kebebasan, tapi Wi-Fi-nya harus bagus!" }
    ]
  }
];

const InterSpeakingLesson6: React.FC = () => {
    const [activeScenario, setActiveScenario] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const currentScenario = CONVERSATION_SCENARIOS.find(c => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];

  
  
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_speaking', 6);
  const nextLessonPath = 6 < 20 ? `/modul/english/intermediate/speaking/lesson-${6+1}` : '/modul/english/intermediate';
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
        lessonLabel={"Intermediate Speaking Lesson 6"}
        accentColor="#E74C3C"
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
      title="Topik Global"
      subtitle="Speaking • Pelajaran 6"
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
              <h2 className="text-xl font-bold mb-2">Pelancong Dunia</h2>
              <p className="text-sm opacity-90 leading-relaxed">Tingkatkan kosakata untuk diskusi berat: berita internasional, ekonomi makro, hingga kemiskinan global.</p>
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

export default InterSpeakingLesson6;
