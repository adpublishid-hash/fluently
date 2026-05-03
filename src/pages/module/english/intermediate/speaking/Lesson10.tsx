import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Trophy, RefreshCw } from 'lucide-react';


const QUIZ_QUESTIONS = [
  {
    "id": 1,
    "question": "What is the most polite way to ask about someone's academic education? [Q1]",
    "options": [
      "What is your academic problem?",
      "I would love to hear about your thoughts on academic education.",
      "Tell me your academic now."
    ],
    "answer": "I would love to hear about your thoughts on academic education.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 2,
    "question": "Fill the blank: \"When discussing academic, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about academic? [Q3]",
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
    "question": "If you want to interrupt politely during a conversation about academic, you say:",
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
    "question": "Select the best transition word: \"We talked about academic education; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding academic? [Q6]",
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
    "question": "What is the most polite way to ask about someone's academic education? [Q7]",
    "options": [
      "What is your academic problem?",
      "I would love to hear about your thoughts on academic education.",
      "Tell me your academic now."
    ],
    "answer": "I would love to hear about your thoughts on academic education.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 8,
    "question": "Fill the blank: \"When discussing academic, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about academic? [Q9]",
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
    "question": "If you want to interrupt politely during a conversation about academic, you say:",
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
    "question": "Select the best transition word: \"We talked about academic education; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding academic? [Q12]",
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
    "question": "What is the most polite way to ask about someone's academic education? [Q13]",
    "options": [
      "What is your academic problem?",
      "I would love to hear about your thoughts on academic education.",
      "Tell me your academic now."
    ],
    "answer": "I would love to hear about your thoughts on academic education.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 14,
    "question": "Fill the blank: \"When discussing academic, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about academic? [Q15]",
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
    "question": "If you want to interrupt politely during a conversation about academic, you say:",
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
    "question": "Select the best transition word: \"We talked about academic education; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding academic? [Q18]",
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
    "question": "What is the most polite way to ask about someone's academic education? [Q19]",
    "options": [
      "What is your academic problem?",
      "I would love to hear about your thoughts on academic education.",
      "Tell me your academic now."
    ],
    "answer": "I would love to hear about your thoughts on academic education.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 20,
    "question": "Fill the blank: \"When discussing academic, it's important to __ open-minded.\"",
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
    title: "University Application",
    context: "Siswa bertanya kepada penasihat.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Student', text: "I would like to apply for the Master's program.", translation: "Saya ingin mendaftar untuk program Magister (S2)." },
      { speaker: 'B', name: 'Advisor', text: "Okay, what is your undergraduate background?", translation: "Baik, apa latar belakang sarjana Anda?" },
      { speaker: 'A', name: 'Student', text: "I have a Bachelor's degree in Computer Science.", translation: "Saya memiliki gelar Sarjana Ilmu Komputer." },
      { speaker: 'B', name: 'Advisor', text: "We will review your application. Do you have any questions?", translation: "Kami akan meninjau aplikasi Anda. Apakah ada pertanyaan?" }
    ]
  },
  {
    id: 'c2',
    title: "Exam Preparation",
    context: "Teman belajar bersama.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend 1', text: "Are you ready for the final exam?", translation: "Apa kamu siap untuk ujian akhir?" },
      { speaker: 'B', name: 'Friend 2', text: "No, I still have a lot of material to review.", translation: "Belum, aku masih punya banyak materi untuk ditinjau." },
      { speaker: 'A', name: 'Friend 1', text: "Do you want to study together in the library?", translation: "Mau belajar bareng di perpustakaan?" },
      { speaker: 'B', name: 'Friend 2', text: "That sounds like a good plan.", translation: "Kedengarannya rencana bagus." }
    ]
  },
  {
    id: 'c3',
    title: "Library Rules",
    context: "Pustakawan menjelaskan aturan.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Student', text: "Can I borrow these books?", translation: "Boleh saya pinjam buku-buku ini?" },
      { speaker: 'B', name: 'Librarian', text: "Yes, but you must return them within two weeks.", translation: "Ya, tapi Anda harus mengembalikannya dalam dua minggu." },
      { speaker: 'A', name: 'Student', text: "Is there a fine for late returns?", translation: "Apakah ada denda untuk pengembalian terlambat?" },
      { speaker: 'B', name: 'Librarian', text: "Yes, it is 50 cents per day.", translation: "Ya, 50 sen per hari." }
    ]
  },
  {
    id: 'c4',
    title: "Project Deadline",
    context: "Siswa meminta perpanjangan.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Student', text: "Professor, I need more time for my assignment.", translation: "Profesor, saya butuh lebih banyak waktu untuk tugas saya." },
      { speaker: 'B', name: 'Professor', text: "Why? The deadline was set a month ago.", translation: "Kenapa? Tenggat waktunya sudah ditetapkan sebulan lalu." },
      { speaker: 'A', name: 'Student', text: "I was sick last week and couldn't work on it.", translation: "Saya sakit minggu lalu dan tidak bisa mengerjakannya." },
      { speaker: 'B', name: 'Professor', text: "Okay, I will give you an extra two days.", translation: "Baik, saya beri kamu tambahan dua hari." }
    ]
  },
  {
    id: 'c5',
    title: "Language Class",
    context: "Berlatih frasa baru.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Student 1', text: "How do you say 'Thank you' in French?", translation: "Bagaimana cara bilang 'Terima kasih' dalam bahasa Prancis?" },
      { speaker: 'B', name: 'Student 2', text: "It is 'Merci'. It's quite easy.", translation: "Itu 'Merci'. Cukup mudah kok." },
      { speaker: 'A', name: 'Student 1', text: "Your pronunciation is very good.", translation: "Pelafalanmu sangat bagus." },
      { speaker: 'B', name: 'Student 2', text: "Thanks, I practice every day.", translation: "Terima kasih, aku berlatih setiap hari." }
    ]
  },
  {
    id: 'c6',
    title: "Online Learning",
    context: "Mendiskusikan kursus daring.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'User 1', text: "Do you like taking online courses?", translation: "Kamu suka ambil kursus online?" },
      { speaker: 'B', name: 'User 2', text: "Yes, it is flexible and convenient.", translation: "Ya, itu fleksibel dan nyaman." },
      { speaker: 'A', name: 'User 1', text: "I find it hard to stay motivated.", translation: "Aku merasa sulit untuk tetap termotivasi." },
      { speaker: 'B', name: 'User 2', text: "You need to set a schedule for yourself.", translation: "Kamu perlu buat jadwal untuk dirimu sendiri." }
    ]
  },
  {
    id: 'c7',
    title: "Graduation",
    context: "Merayakan kesuksesan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Graduate', text: "I can't believe we are finally graduating.", translation: "Gak nyangka kita akhirnya wisuda." },
      { speaker: 'B', name: 'Friend', text: "It has been a long four years.", translation: "Empat tahun yang panjang." },
      { speaker: 'A', name: 'Graduate', text: "What are your plans now?", translation: "Apa rencanamu sekarang?" },
      { speaker: 'B', name: 'Friend', text: "I am going to travel before finding a job.", translation: "Aku mau jalan-jalan dulu sebelum cari kerja." }
    ]
  },
  {
    id: 'c8',
    title: "Research Paper",
    context: "Mendiskusikan topik.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Student', text: "I am writing my thesis on climate change.", translation: "Saya sedang menulis tesis tentang perubahan iklim." },
      { speaker: 'B', name: 'Tutor', text: "That is a very relevant topic.", translation: "Itu topik yang sangat relevan." },
      { speaker: 'A', name: 'Student', text: "I need to find more sources.", translation: "Saya perlu mencari lebih banyak sumber." },
      { speaker: 'B', name: 'Tutor', text: "Check the academic database provided by the university.", translation: "Cek basis data akademik yang disediakan universitas." }
    ]
  },
  {
    id: 'c9',
    title: "Student Loan",
    context: "Berbicara tentang keuangan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Student 1', text: "Tuition fees are so high.", translation: "Biaya kuliah mahal sekali." },
      { speaker: 'B', name: 'Student 2', text: "I had to take out a student loan.", translation: "Aku harus ambil pinjaman mahasiswa." },
      { speaker: 'A', name: 'Student 1', text: "Taking on debt is stressful.", translation: "Berutang itu bikin stres." },
      { speaker: 'B', name: 'Student 2', text: "Hopefully, it will be worth it in the end.", translation: "Semoga pada akhirnya itu sepadan." }
    ]
  },
  {
    id: 'c10',
    title: "Study Abroad",
    context: "Merencanakan perjalanan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Student', text: "I applied for an exchange program in Spain.", translation: "Aku mendaftar program pertukaran di Spanyol." },
      { speaker: 'B', name: 'Friend', text: "That sounds amazing! You will learn so much.", translation: "Kedengarannya luar biasa! Kamu bakal belajar banyak." },
      { speaker: 'A', name: 'Student', text: "I am excited but also a bit nervous.", translation: "Aku bersemangat tapi juga agak gugup." },
      { speaker: 'B', name: 'Friend', text: "You will have the time of your life.", translation: "Kamu akan mengalami masa-masa terindah." }
    ]
  }
];

const InterSpeakingLesson10: React.FC = () => {
    const [activeScenario, setActiveScenario] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const currentScenario = CONVERSATION_SCENARIOS.find(c => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];

  
  
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_speaking', 10);
  const nextLessonPath = 10 < 20 ? `/modul/english/intermediate/speaking/lesson-${10+1}` : '/modul/english/intermediate';
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
        lessonLabel={"Intermediate Speaking Lesson 10"}
        accentColor="#E74C3C"
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
      title="Akademik & Edu"
      subtitle="Speaking • Pelajaran 10"
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
              <h2 className="text-xl font-bold mb-2">Dunia Akademik</h2>
              <p className="text-sm opacity-90 leading-relaxed">Simulasi presentasi penelitian, diskusi proyek kuliah, hingga bimbingan dosen.</p>
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

export default InterSpeakingLesson10;
