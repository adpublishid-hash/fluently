import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Trophy, RefreshCw } from 'lucide-react';


const QUIZ_QUESTIONS = [
  {
    "id": 1,
    "question": "What is the most polite way to ask about someone's relationships and comm? [Q1]",
    "options": [
      "What is your relationship problem?",
      "I would love to hear about your thoughts on relationships and comm.",
      "Tell me your relationship now."
    ],
    "answer": "I would love to hear about your thoughts on relationships and comm.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 2,
    "question": "Fill the blank: \"When discussing relationship, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about relationship? [Q3]",
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
    "question": "If you want to interrupt politely during a conversation about relationship, you say:",
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
    "question": "Select the best transition word: \"We talked about relationships and comm; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding relationship? [Q6]",
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
    "question": "What is the most polite way to ask about someone's relationships and comm? [Q7]",
    "options": [
      "What is your relationship problem?",
      "I would love to hear about your thoughts on relationships and comm.",
      "Tell me your relationship now."
    ],
    "answer": "I would love to hear about your thoughts on relationships and comm.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 8,
    "question": "Fill the blank: \"When discussing relationship, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about relationship? [Q9]",
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
    "question": "If you want to interrupt politely during a conversation about relationship, you say:",
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
    "question": "Select the best transition word: \"We talked about relationships and comm; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding relationship? [Q12]",
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
    "question": "What is the most polite way to ask about someone's relationships and comm? [Q13]",
    "options": [
      "What is your relationship problem?",
      "I would love to hear about your thoughts on relationships and comm.",
      "Tell me your relationship now."
    ],
    "answer": "I would love to hear about your thoughts on relationships and comm.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 14,
    "question": "Fill the blank: \"When discussing relationship, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about relationship? [Q15]",
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
    "question": "If you want to interrupt politely during a conversation about relationship, you say:",
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
    "question": "Select the best transition word: \"We talked about relationships and comm; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding relationship? [Q18]",
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
    "question": "What is the most polite way to ask about someone's relationships and comm? [Q19]",
    "options": [
      "What is your relationship problem?",
      "I would love to hear about your thoughts on relationships and comm.",
      "Tell me your relationship now."
    ],
    "answer": "I would love to hear about your thoughts on relationships and comm.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 20,
    "question": "Fill the blank: \"When discussing relationship, it's important to __ open-minded.\"",
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
    title: "Resolving a Conflict",
    context: "Berbicara dengan teman dekat.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'You', text: "I feel like you haven't been listening to me lately.", translation: "Aku merasa kamu tidak mendengarkanku akhir-akhir ini." },
      { speaker: 'B', name: 'Friend', text: "I'm sorry you feel that way. I've been really stressed.", translation: "Maaf kamu merasa begitu. Aku sedang sangat stres." },
      { speaker: 'A', name: 'You', text: "I understand, but I need some support too.", translation: "Aku mengerti, tapi aku butuh dukungan juga." },
      { speaker: 'B', name: 'Friend', text: "You're right. Let's talk about it over dinner.", translation: "Kamu benar. Ayo kita bicarakan saat makan malam." }
    ]
  },
  {
    id: 'c2',
    title: "Giving Feedback",
    context: "Lingkungan profesional.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Manager', text: "Can I give you some feedback on your report?", translation: "Boleh saya beri masukan tentang laporan Anda?" },
      { speaker: 'B', name: 'Employee', text: "Of course. I am always open to suggestions.", translation: "Tentu. Saya selalu terbuka terhadap saran." },
      { speaker: 'A', name: 'Manager', text: "The content is great, but the formatting is a bit messy.", translation: "Isinya bagus, tapi formatnya agak berantakan." },
      { speaker: 'B', name: 'Employee', text: "I see. I will fix the layout immediately.", translation: "Saya mengerti. Saya akan segera perbaiki tata letaknya." }
    ]
  },
  {
    id: 'c3',
    title: "Asking for a Favor",
    context: "Meminta tolong tetangga.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'You', text: "Could you do me a huge favor?", translation: "Bisa minta tolong yang sangat besar?" },
      { speaker: 'B', name: 'Neighbor', text: "It depends on what it is!", translation: "Tergantung apa itu!" },
      { speaker: 'A', name: 'You', text: "Can you feed my cat this weekend?", translation: "Bisakah kamu memberi makan kucingku akhir pekan ini?" },
      { speaker: 'B', name: 'Neighbor', text: "Sure, I love your cat. No problem.", translation: "Tentu, aku suka kucingmu. Tidak masalah." }
    ]
  },
  {
    id: 'c4',
    title: "Apologizing Sincerely",
    context: "Kepada pasangan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'You', text: "I am so sorry for forgetting our anniversary.", translation: "Maafkan aku karena melupakan hari jadi kita." },
      { speaker: 'B', name: 'Partner', text: "It really hurt my feelings, honestly.", translation: "Jujur, itu sangat menyakiti perasaanku." },
      { speaker: 'A', name: 'You', text: "I know. I promise to make it up to you.", translation: "Aku tahu. Aku janji akan menebusnya." },
      { speaker: 'B', name: 'Partner', text: "Okay. Let's go out tonight then.", translation: "Oke. Kalau begitu ayo keluar malam ini." }
    ]
  },
  {
    id: 'c5',
    title: "Setting Boundaries",
    context: "Dengan kolega.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'You', text: "Please don't call me after 8 PM.", translation: "Tolong jangan telepon saya setelah jam 8 malam." },
      { speaker: 'B', name: 'Colleague', text: "I apologize. I thought it was urgent.", translation: "Saya minta maaf. Saya pikir itu mendesak." },
      { speaker: 'A', name: 'You', text: "Unless it's an emergency, let's keep it to work hours.", translation: "Kecuali darurat, mari kita batasi di jam kerja." },
      { speaker: 'B', name: 'Colleague', text: "Understood. I will respect that.", translation: "Dimengerti. Saya akan menghormati itu." }
    ]
  },
  {
    id: 'c6',
    title: "Expressing Gratitude",
    context: "Berterima kasih pada teman.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'You', text: "Thank you so much for being there for me.", translation: "Terima kasih banyak sudah ada untukku." },
      { speaker: 'B', name: 'Friend', text: "That's what friends are for.", translation: "Itulah gunanya teman." },
      { speaker: 'A', name: 'You', text: "I don't know what I would do without you.", translation: "Aku tidak tahu apa jadinya aku tanpamu." },
      { speaker: 'B', name: 'Friend', text: "You would do fine, but I'm glad to help.", translation: "Kamu akan baik-baik saja, tapi aku senang membantu." }
    ]
  },
  {
    id: 'c7',
    title: "Handling Misunderstanding",
    context: "Mengklarifikasi rencana.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Client', text: "I think there has been a misunderstanding.", translation: "Saya rasa ada kesalahpahaman." },
      { speaker: 'B', name: 'You', text: "What do you mean? I followed the instructions.", translation: "Maksud Anda? Saya sudah ikuti instruksinya." },
      { speaker: 'A', name: 'Client', text: "The email said 'next week', not 'this week'.", translation: "Emailnya bilang 'minggu depan', bukan 'minggu ini'." },
      { speaker: 'B', name: 'You', text: "Oh my gosh, I misread the date.", translation: "Ya ampun, saya salah baca tanggalnya." }
    ]
  },
  {
    id: 'c8',
    title: "Breaking Bad News",
    context: "Memberitahu teman.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'You', text: "I have some bad news to tell you.", translation: "Aku punya kabar buruk untukmu." },
      { speaker: 'B', name: 'Friend', text: "What is it? You're scaring me.", translation: "Apa itu? Kamu menakutiku." },
      { speaker: 'A', name: 'You', text: "I didn't get the job I wanted.", translation: "Aku tidak dapat pekerjaan yang kuinginkan." },
      { speaker: 'B', name: 'Friend', text: "Oh, I am so sorry. There will be other chances.", translation: "Oh, turut sedih. Akan ada kesempatan lain." }
    ]
  },
  {
    id: 'c9',
    title: "Discussing Future",
    context: "Pasangan berbicara.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Partner 1', text: "Where do you see this relationship going?", translation: "Mau dibawa ke mana hubungan ini?" },
      { speaker: 'B', name: 'Partner 2', text: "I think we have a bright future together.", translation: "Aku pikir kita punya masa depan cerah bersama." },
      { speaker: 'A', name: 'Partner 1', text: "Me too. I want to travel the world with you.", translation: "Aku juga. Aku ingin keliling dunia bersamamu." },
      { speaker: 'B', name: 'Partner 2', text: "Let's start planning our next trip then.", translation: "Ayo kita rencanakan perjalanan berikutnya kalau begitu." }
    ]
  },
  {
    id: 'c10',
    title: "Active Listening",
    context: "Mendengarkan masalah.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend', text: "So, my boss yelled at me today.", translation: "Jadi, bosku meneriakiku hari ini." },
      { speaker: 'B', name: 'You', text: "That sounds terrible. How did you react?", translation: "Itu terdengar buruk. Bagaimana reaksimu?" },
      { speaker: 'A', name: 'Friend', text: "I just stayed quiet, but I was angry inside.", translation: "Aku diam saja, tapi dalam hati marah." },
      { speaker: 'B', name: 'You', text: "I can imagine. You handled it well though.", translation: "Bisa kubayangkan. Kamu menanganinya dengan baik." }
    ]
  }
];

const InterSpeakingLesson9: React.FC = () => {
    const [activeScenario, setActiveScenario] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const currentScenario = CONVERSATION_SCENARIOS.find(c => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];

  
  
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_speaking', 9);
  const nextLessonPath = 9 < 20 ? `/modul/english/intermediate/speaking/lesson-${9+1}` : '/modul/english/intermediate';
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
        lessonLabel={"Intermediate Speaking Lesson 9"}
        accentColor="#E74C3C"
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
      title="Relasi & Komunikasi"
      subtitle="Speaking • Pelajaran 9"
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
              <h2 className="text-xl font-bold mb-2">Percakapan Lebih Baik</h2>
              <p className="text-sm opacity-90 leading-relaxed">Resolusi konflik, memberikan nasehat (advice), dan mengungkapkan simpati (sympathy) kepada sahabat maupun kolega.</p>
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

export default InterSpeakingLesson9;
