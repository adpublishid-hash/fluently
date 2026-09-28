import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Trophy } from 'lucide-react';


const QUIZ_QUESTIONS = [
  {
    "id": 1,
    "question": "What is the most polite way to ask about someone's emotions and motivation? [Q1]",
    "options": [
      "What is your emotion problem?",
      "I would love to hear about your thoughts on emotions and motivation.",
      "Tell me your emotion now."
    ],
    "answer": "I would love to hear about your thoughts on emotions and motivation.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 2,
    "question": "Fill the blank: \"When discussing emotion, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about emotion? [Q3]",
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
    "question": "If you want to interrupt politely during a conversation about emotion, you say:",
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
    "question": "Select the best transition word: \"We talked about emotions and motivation; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding emotion? [Q6]",
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
    "question": "What is the most polite way to ask about someone's emotions and motivation? [Q7]",
    "options": [
      "What is your emotion problem?",
      "I would love to hear about your thoughts on emotions and motivation.",
      "Tell me your emotion now."
    ],
    "answer": "I would love to hear about your thoughts on emotions and motivation.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 8,
    "question": "Fill the blank: \"When discussing emotion, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about emotion? [Q9]",
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
    "question": "If you want to interrupt politely during a conversation about emotion, you say:",
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
    "question": "Select the best transition word: \"We talked about emotions and motivation; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding emotion? [Q12]",
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
    "question": "What is the most polite way to ask about someone's emotions and motivation? [Q13]",
    "options": [
      "What is your emotion problem?",
      "I would love to hear about your thoughts on emotions and motivation.",
      "Tell me your emotion now."
    ],
    "answer": "I would love to hear about your thoughts on emotions and motivation.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 14,
    "question": "Fill the blank: \"When discussing emotion, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about emotion? [Q15]",
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
    "question": "If you want to interrupt politely during a conversation about emotion, you say:",
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
    "question": "Select the best transition word: \"We talked about emotions and motivation; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding emotion? [Q18]",
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
    "question": "What is the most polite way to ask about someone's emotions and motivation? [Q19]",
    "options": [
      "What is your emotion problem?",
      "I would love to hear about your thoughts on emotions and motivation.",
      "Tell me your emotion now."
    ],
    "answer": "I would love to hear about your thoughts on emotions and motivation.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 20,
    "question": "Fill the blank: \"When discussing emotion, it's important to __ open-minded.\"",
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
    title: "Expressing Happiness",
    context: "Menerima kabar baik.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend 1', text: "I'm so happy right now! I got the job.", translation: "Aku senang sekali sekarang! Aku dapat pekerjaannya." },
      { speaker: 'B', name: 'Friend 2', text: "That is fantastic! I knew you could do it.", translation: "Itu luar biasa! Aku tahu kamu bisa." },
      { speaker: 'A', name: 'Friend 1', text: "I am absolutely thrilled. I can't stop smiling.", translation: "Aku benar-benar gembira. Aku tidak bisa berhenti tersenyum." },
      { speaker: 'B', name: 'Friend 2', text: "You totally deserve it. Let's go celebrate.", translation: "Kamu sangat pantas mendapatkannya. Ayo kita rayakan." }
    ]
  },
  {
    id: 'c2',
    title: "Dealing with Sadness",
    context: "Menghibur teman.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend 1', text: "What's wrong? You seem a bit down.", translation: "Ada apa? Kamu kelihatan agak sedih." },
      { speaker: 'B', name: 'Friend 2', text: "I'm just feeling a bit lonely these days.", translation: "Aku hanya merasa agak kesepian akhir-akhir ini." },
      { speaker: 'A', name: 'Friend 1', text: "I'm here for you if you need to talk.", translation: "Aku ada di sini untukmu jika kamu butuh teman bicara." },
      { speaker: 'B', name: 'Friend 2', text: "Thanks, I really appreciate that.", translation: "Terima kasih, aku sangat menghargainya." }
    ]
  },
  {
    id: 'c3',
    title: "Managing Stress",
    context: "Mendiskusikan tekanan kerja.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Colleague 1', text: "I am so overwhelmed with this project.", translation: "Aku sangat kewalahan dengan proyek ini." },
      { speaker: 'B', name: 'Colleague 2', text: "Tell me about it. The deadline is too tight.", translation: "Sama, ceritakan padaku. Tenggat waktunya terlalu mepet." },
      { speaker: 'A', name: 'Colleague 1', text: "I think I'm heading for a burnout.", translation: "Sepertinya aku menuju kelelahan mental (burnout)." },
      { speaker: 'B', name: 'Colleague 2', text: "Let's take a short break and get some coffee.", translation: "Ayo istirahat sebentar dan minum kopi." }
    ]
  },
  {
    id: 'c4',
    title: "Setting a Goal",
    context: "Merencanakan masa depan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'You', text: "I've set a new goal for myself this year.", translation: "Aku sudah menetapkan tujuan baru untuk diriku tahun ini." },
      { speaker: 'B', name: 'Friend', text: "Oh really? What is it?", translation: "Oh ya? Apa itu?" },
      { speaker: 'A', name: 'You', text: "I want to run a half-marathon.", translation: "Aku ingin lari setengah maraton." },
      { speaker: 'B', name: 'Friend', text: "That is a great challenge. You need to be disciplined.", translation: "Itu tantangan yang hebat. Kamu harus disiplin." }
    ]
  },
  {
    id: 'c5',
    title: "Overcoming a Challenge",
    context: "Setelah tugas yang sulit.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Student 1', text: "That exam was so hard, but I passed!", translation: "Ujian itu susah sekali, tapi aku lulus!" },
      { speaker: 'B', name: 'Student 2', text: "You must be so relieved.", translation: "Kamu pasti lega sekali." },
      { speaker: 'A', name: 'Student 1', text: "I am. It feels good to overcome that obstacle.", translation: "Iya. Rasanya senang bisa mengatasi rintangan itu." },
      { speaker: 'B', name: 'Student 2', text: "Your hard work paid off.", translation: "Kerja kerasmu terbayar." }
    ]
  },
  {
    id: 'c6',
    title: "Feeling Anxious",
    context: "Sebelum presentasi.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'You', text: "I have butterflies in my stomach.", translation: "Aku merasa gugup (ada kupu-kupu di perutku)." },
      { speaker: 'B', name: 'Colleague', text: "Are you nervous about the speech?", translation: "Apa kamu gugup soal pidatonya?" },
      { speaker: 'A', name: 'You', text: "Yes, I'm really anxious. I hope I don't forget my lines.", translation: "Ya, aku cemas sekali. Semoga aku tidak lupa dialogku." },
      { speaker: 'B', name: 'Colleague', text: "You'll be great. Just take a deep breath.", translation: "Kamu akan hebat. Tarik napas dalam-dalam saja." }
    ]
  },
  {
    id: 'c7',
    title: "Expressing Gratitude",
    context: "Berterima kasih atas bantuan.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'You', text: "I wanted to express my gratitude for your help.", translation: "Saya ingin mengucapkan terima kasih atas bantuan Anda." },
      { speaker: 'B', name: 'Mentor', text: "It was my pleasure. You did all the work.", translation: "Dengan senang hati. Anda yang melakukan semua pekerjaannya." },
      { speaker: 'A', name: 'You', text: "Your advice was invaluable. I am very grateful.", translation: "Nasihat Anda sangat berharga. Saya sangat berterima kasih." },
      { speaker: 'B', name: 'Mentor', text: "You're welcome. Keep up the good work.", translation: "Sama-sama. Teruslah bekerja dengan baik." }
    ]
  },
  {
    id: 'c8',
    title: "Dealing with Disappointment",
    context: "Tidak mendapatkan promosi.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend', text: "I'm so disappointed I didn't get the promotion.", translation: "Aku kecewa sekali tidak dapat promosi itu." },
      { speaker: 'B', name: 'You', text: "I'm sorry to hear that. You must be upset.", translation: "Aku turut sedih mendengarnya. Kamu pasti kesal." },
      { speaker: 'A', name: 'Friend', text: "I really thought I had a good chance.", translation: "Aku benar-benar mengira punya kesempatan bagus." },
      { speaker: 'B', name: 'You', text: "Don't let it get you down. Another opportunity will come.", translation: "Jangan biarkan itu membuatmu sedih. Kesempatan lain akan datang." }
    ]
  },
  {
    id: 'c9',
    title: "Finding Motivation",
    context: "Merasa malas berolahraga.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'You', text: "I have zero motivation to go to the gym today.", translation: "Aku sama sekali tidak punya motivasi ke gym hari ini." },
      { speaker: 'B', name: 'Friend', text: "I know the feeling. It is hard to get started.", translation: "Aku tahu rasanya. Sulit untuk memulai." },
      { speaker: 'A', name: 'You', text: "How do you stay so disciplined?", translation: "Bagaimana kamu bisa tetap disiplin begitu?" },
      { speaker: 'B', name: 'Friend', text: "I just think about how good I'll feel afterward.", translation: "Aku hanya memikirkan betapa enaknya perasaanku setelahnya." }
    ]
  },
  {
    id: 'c10',
    title: "Self-Reflection",
    context: "Memikirkan perubahan diri.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Therapist', text: "What progress have you made this month?", translation: "Kemajuan apa yang telah Anda buat bulan ini?" },
      { speaker: 'B', name: 'Patient', text: "I think I've become more resilient.", translation: "Saya rasa saya menjadi lebih tangguh." },
      { speaker: 'A', name: 'Therapist', text: "In what way?", translation: "Dalam hal apa?" },
      { speaker: 'B', name: 'Patient', text: "I don't get as stressed by small problems anymore.", translation: "Saya tidak lagi terlalu stres karena masalah kecil." }
    ]
  }
];

const InterSpeakingLesson11: React.FC = () => {
    const [activeScenario, setActiveScenario] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const currentScenario = CONVERSATION_SCENARIOS.find(c => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];

  
  
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_speaking', 11);
  const nextLessonPath = 11 < 20 ? `/modul/english/intermediate/speaking/lesson-${11+1}` : '/modul/english/intermediate';
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
        lessonLabel={"Intermediate Speaking Lesson 11"}
        accentColor="#E74C3C"
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
      title="Emosi & Pengembangan Diri"
      subtitle="Speaking • Pelajaran 11"
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
              <h2 className="text-xl font-bold mb-2">Dunia Batin</h2>
              <p className="text-sm opacity-90 leading-relaxed">Menyelami emosi. Cara sopan menyampaikan rasa frustrasi, empati, serta merayakan kesuksesan.</p>
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

export default InterSpeakingLesson11;
