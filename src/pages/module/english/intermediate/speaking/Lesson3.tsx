import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Trophy } from 'lucide-react';


const QUIZ_QUESTIONS = [
  {
    "id": 1,
    "question": "What is the most polite way to ask about someone's digital life? [Q1]",
    "options": [
      "I would love to hear about your thoughts on digital life.",
      "What is your digital problem?",
      "Tell me your digital now."
    ],
    "answer": "I would love to hear about your thoughts on digital life.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 2,
    "question": "Fill the blank: \"When discussing digital, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about digital? [Q3]",
    "options": [
      "That is totally wrong.",
      "I couldn't agree more.",
      "I see your point, but..."
    ],
    "answer": "I couldn't agree more.",
    "explanation": "'I couldn't agree more' menyatakan persetujuan 100% (tidak ada yang bisa ditambahkan karena sudah sangat setuju)."
  },
  {
    "id": 4,
    "question": "If you want to interrupt politely during a conversation about digital, you say:",
    "options": [
      "Stop talking for a moment.",
      "Wait, give me a chance.",
      "Excuse me, may I add something here?"
    ],
    "answer": "Excuse me, may I add something here?",
    "explanation": "'Excuse me, may I add something here' adalah standar baku (CEFR B2) untuk interupsi yang menghormati pembicara."
  },
  {
    "id": 5,
    "question": "Select the best transition word: \"We talked about digital life; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding digital? [Q6]",
    "options": [
      "Under the weather",
      "A piece of cake",
      "Bite the bullet"
    ],
    "answer": "A piece of cake",
    "explanation": "'A piece of cake' secara harafiah berarti sesuatu yang sangat mudah dikerjakan atau diucapkan."
  },
  {
    "id": 7,
    "question": "What is the most polite way to ask about someone's digital life? [Q7]",
    "options": [
      "I would love to hear about your thoughts on digital life.",
      "What is your digital problem?",
      "Tell me your digital now."
    ],
    "answer": "I would love to hear about your thoughts on digital life.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 8,
    "question": "Fill the blank: \"When discussing digital, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about digital? [Q9]",
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
    "question": "If you want to interrupt politely during a conversation about digital, you say:",
    "options": [
      "Stop talking for a moment.",
      "Wait, give me a chance.",
      "Excuse me, may I add something here?"
    ],
    "answer": "Excuse me, may I add something here?",
    "explanation": "'Excuse me, may I add something here' adalah standar baku (CEFR B2) untuk interupsi yang menghormati pembicara."
  },
  {
    "id": 11,
    "question": "Select the best transition word: \"We talked about digital life; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding digital? [Q12]",
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
    "question": "What is the most polite way to ask about someone's digital life? [Q13]",
    "options": [
      "What is your digital problem?",
      "Tell me your digital now.",
      "I would love to hear about your thoughts on digital life."
    ],
    "answer": "I would love to hear about your thoughts on digital life.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 14,
    "question": "Fill the blank: \"When discussing digital, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about digital? [Q15]",
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
    "question": "If you want to interrupt politely during a conversation about digital, you say:",
    "options": [
      "Stop talking for a moment.",
      "Wait, give me a chance.",
      "Excuse me, may I add something here?"
    ],
    "answer": "Excuse me, may I add something here?",
    "explanation": "'Excuse me, may I add something here' adalah standar baku (CEFR B2) untuk interupsi yang menghormati pembicara."
  },
  {
    "id": 17,
    "question": "Select the best transition word: \"We talked about digital life; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding digital? [Q18]",
    "options": [
      "A piece of cake",
      "Bite the bullet",
      "Under the weather"
    ],
    "answer": "A piece of cake",
    "explanation": "'A piece of cake' secara harafiah berarti sesuatu yang sangat mudah dikerjakan atau diucapkan."
  },
  {
    "id": 19,
    "question": "What is the most polite way to ask about someone's digital life? [Q19]",
    "options": [
      "Tell me your digital now.",
      "I would love to hear about your thoughts on digital life.",
      "What is your digital problem?"
    ],
    "answer": "I would love to hear about your thoughts on digital life.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 20,
    "question": "Fill the blank: \"When discussing digital, it's important to __ open-minded.\"",
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
    title: "Wi-Fi Issues",
    context: "Mengatasi masalah koneksi.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tom', text: "The Wi-Fi keeps dropping out today.", translation: "Wi-Fi nya putus-nyambung hari ini." },
      { speaker: 'B', name: 'Lisa', text: "Have you tried resetting the router?", translation: "Sudah coba reset routernya?" },
      { speaker: 'A', name: 'Tom', text: "Yes, twice. It is still unstable.", translation: "Ya, dua kali. Masih tidak stabil." },
      { speaker: 'B', name: 'Lisa', text: "Maybe we should call the provider.", translation: "Mungkin kita harus telepon penyedianya." }
    ]
  },
  {
    id: 'c2',
    title: "Digital Detox",
    context: "Mendiskusikan media sosial.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Sara', text: "I am taking a break from Instagram.", translation: "Aku mau istirahat dari Instagram." },
      { speaker: 'B', name: 'Mike', text: "Really? Why did you decide that?", translation: "Benarkah? Kenapa kamu memutuskan itu?" },
      { speaker: 'A', name: 'Sara', text: "I was scrolling for hours every day.", translation: "Aku scrolling berjam-jam setiap hari." },
      { speaker: 'B', name: 'Mike', text: "That sounds like a healthy choice.", translation: "Itu terdengar seperti pilihan yang sehat." }
    ]
  },
  {
    id: 'c3',
    title: "Video Call Lag",
    context: "Kesulitan teknis.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Alex', text: "Can you hear me? The screen is frozen.", translation: "Bisa dengar aku? Layarnya beku (macet)." },
      { speaker: 'B', name: 'Ben', text: "You are lagging a bit. Turn off your video.", translation: "Kamu agak nge-lag. Matikan videomu." },
      { speaker: 'A', name: 'Alex', text: "Okay, is the audio better now?", translation: "Oke, apa suaranya lebih baik sekarang?" },
      { speaker: 'B', name: 'Ben', text: "Yes, it is much clearer without video.", translation: "Ya, jauh lebih jelas tanpa video." }
    ]
  },
  {
    id: 'c4',
    title: "Software Update",
    context: "Pemeliharaan komputer.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'User', text: "My laptop prompted a system update.", translation: "Laptop saya minta pembaruan sistem." },
      { speaker: 'B', name: 'Tech', text: "Make sure you back up your files first.", translation: "Pastikan Anda mencadangkan file dulu." },
      { speaker: 'A', name: 'User', text: "Good point. I don't want to lose data.", translation: "Poin bagus. Saya tidak mau kehilangan data." },
      { speaker: 'B', name: 'Tech', text: "Updates can sometimes cause glitches.", translation: "Pembaruan terkadang bisa menyebabkan gangguan." }
    ]
  },
  {
    id: 'c5',
    title: "Smart Home",
    context: "Gadget baru.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Jim', text: "I installed smart lights in the living room.", translation: "Aku pasang lampu pintar di ruang tamu." },
      { speaker: 'B', name: 'Kim', text: "Can you control them with your voice?", translation: "Bisa dikontrol pakai suara?" },
      { speaker: 'A', name: 'Jim', text: "Yes, and I can change the colors too.", translation: "Ya, dan aku bisa ubah warnanya juga." },
      { speaker: 'B', name: 'Kim', text: "That is very high-tech.", translation: "Canggih sekali." }
    ]
  },
  {
    id: 'c6',
    title: "Cybersecurity",
    context: "Keamanan akun.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Victim', text: "I think my email account was hacked.", translation: "Sepertinya akun email saya diretas." },
      { speaker: 'B', name: 'Support', text: "Did you use a strong password?", translation: "Apakah Anda pakai kata sandi yang kuat?" },
      { speaker: 'A', name: 'Victim', text: "No, I used the same one everywhere.", translation: "Tidak, saya pakai yang sama di mana-mana." },
      { speaker: 'B', name: 'Support', text: "You need to change it immediately.", translation: "Anda harus segera menggantinya." }
    ]
  },
  {
    id: 'c7',
    title: "Streaming Services",
    context: "Pilihan hiburan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Fan', text: "Have you seen the new documentary?", translation: "Sudah lihat dokumenter baru itu?" },
      { speaker: 'B', name: 'Friend', text: "No, I cancelled my subscription.", translation: "Tidak, aku membatalkan langgananku." },
      { speaker: 'A', name: 'Fan', text: "Why? It has so much good content.", translation: "Kenapa? Isinya banyak yang bagus." },
      { speaker: 'B', name: 'Friend', text: "I wasn't watching it enough.", translation: "Aku jarang nonton." }
    ]
  },
  {
    id: 'c8',
    title: "Smartwatch",
    context: "Teknologi yang dapat dikenakan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Buyer', text: "Is that the latest smartwatch?", translation: "Apa itu jam pintar terbaru?" },
      { speaker: 'B', name: 'Owner', text: "Yes, it tracks my sleep and heart rate.", translation: "Ya, ini melacak tidur dan detak jantungku." },
      { speaker: 'A', name: 'Buyer', text: "Does the battery last long?", translation: "Apakah baterainya tahan lama?" },
      { speaker: 'B', name: 'Owner', text: "It lasts about two days per charge.", translation: "Tahan sekitar dua hari per pengisian." }
    ]
  },
  {
    id: 'c9',
    title: "Online Return",
    context: "Masalah e-commerce.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Customer', text: "I need to return these headphones.", translation: "Saya perlu mengembalikan headphone ini." },
      { speaker: 'B', name: 'Service', text: "Why? Are they defective?", translation: "Kenapa? Apakah cacat?" },
      { speaker: 'A', name: 'Customer', text: "No, the sound quality isn't great.", translation: "Tidak, kualitas suaranya kurang bagus." },
      { speaker: 'B', name: 'Service', text: "Check the return policy online.", translation: "Cek kebijakan pengembalian secara online." }
    ]
  },
  {
    id: 'c10',
    title: "AI Tools",
    context: "Teknologi masa depan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Worker', text: "I used an AI tool to draft this email.", translation: "Aku pakai alat AI untuk buat konsep email ini." },
      { speaker: 'B', name: 'Colleague', text: "It sounds very professional.", translation: "Kedengarannya sangat profesional." },
      { speaker: 'A', name: 'Worker', text: "It saves me so much time at work.", translation: "Ini menghemat banyak waktuku saat kerja." },
      { speaker: 'B', name: 'Colleague', text: "Technology is advancing so fast.", translation: "Teknologi maju sangat cepat." }
    ]
  }
];

const InterSpeakingLesson3: React.FC = () => {
    const [activeScenario, setActiveScenario] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const currentScenario = CONVERSATION_SCENARIOS.find(c => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];

  
  
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_speaking', 3);
  const nextLessonPath = 3 < 20 ? `/modul/english/intermediate/speaking/lesson-${3+1}` : '/modul/english/intermediate';
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
        lessonLabel={"Intermediate Speaking Lesson 3"}
        accentColor="#E74C3C"
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
      title="Kehidupan Digital"
      subtitle="Speaking • Pelajaran 3"
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
              <h2 className="text-xl font-bold mb-2">Bicara Tekno</h2>
              <p className="text-sm opacity-90 leading-relaxed">Menjelajahi kosa kata era modern: remote work, AI, social media, dan keamanan digital. Praktikkan skenario terkait masalah teknologi harian.</p>
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

export default InterSpeakingLesson3;
