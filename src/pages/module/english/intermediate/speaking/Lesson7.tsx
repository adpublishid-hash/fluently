import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Trophy } from 'lucide-react';


const QUIZ_QUESTIONS = [
  {
    "id": 1,
    "question": "What is the most polite way to ask about someone's society and issues? [Q1]",
    "options": [
      "What is your society problem?",
      "I would love to hear about your thoughts on society and issues.",
      "Tell me your society now."
    ],
    "answer": "I would love to hear about your thoughts on society and issues.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 2,
    "question": "Fill the blank: \"When discussing society, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about society? [Q3]",
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
    "question": "If you want to interrupt politely during a conversation about society, you say:",
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
    "question": "Select the best transition word: \"We talked about society and issues; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding society? [Q6]",
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
    "question": "What is the most polite way to ask about someone's society and issues? [Q7]",
    "options": [
      "What is your society problem?",
      "I would love to hear about your thoughts on society and issues.",
      "Tell me your society now."
    ],
    "answer": "I would love to hear about your thoughts on society and issues.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 8,
    "question": "Fill the blank: \"When discussing society, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about society? [Q9]",
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
    "question": "If you want to interrupt politely during a conversation about society, you say:",
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
    "question": "Select the best transition word: \"We talked about society and issues; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding society? [Q12]",
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
    "question": "What is the most polite way to ask about someone's society and issues? [Q13]",
    "options": [
      "What is your society problem?",
      "I would love to hear about your thoughts on society and issues.",
      "Tell me your society now."
    ],
    "answer": "I would love to hear about your thoughts on society and issues.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 14,
    "question": "Fill the blank: \"When discussing society, it's important to __ open-minded.\"",
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
    "question": "Which response strongly agrees with a statement about society? [Q15]",
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
    "question": "If you want to interrupt politely during a conversation about society, you say:",
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
    "question": "Select the best transition word: \"We talked about society and issues; ____, we should also discuss the future impacts.\"",
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
    "question": "Which idiom best describes a very easy task regarding society? [Q18]",
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
    "question": "What is the most polite way to ask about someone's society and issues? [Q19]",
    "options": [
      "What is your society problem?",
      "I would love to hear about your thoughts on society and issues.",
      "Tell me your society now."
    ],
    "answer": "I would love to hear about your thoughts on society and issues.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 20,
    "question": "Fill the blank: \"When discussing society, it's important to __ open-minded.\"",
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
    title: "Voting Day",
    context: "Mendiskusikan pemilu.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Citizen 1', text: "Are you going to vote today?", translation: "Apakah kamu akan memilih hari ini?" },
      { speaker: 'B', name: 'Citizen 2', text: "Yes, I think it is important to participate.", translation: "Ya, saya pikir penting untuk berpartisipasi." },
      { speaker: 'A', name: 'Citizen 1', text: "The line at the polling station is long.", translation: "Antrean di tempat pemungutan suara panjang." },
      { speaker: 'B', name: 'Citizen 2', text: "I don't mind waiting. Every vote counts.", translation: "Saya tidak keberatan menunggu. Setiap suara berharga." }
    ]
  },
  {
    id: 'c2',
    title: "Charity Work",
    context: "Berbicara tentang kerja sukarela.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Interviewer', text: "Do you have any volunteer experience?", translation: "Apakah Anda punya pengalaman sukarela?" },
      { speaker: 'B', name: 'Applicant', text: "I help at the local food bank on weekends.", translation: "Saya membantu di bank makanan lokal setiap akhir pekan." },
      { speaker: 'A', name: 'Interviewer', text: "That is very noble of you.", translation: "Itu sangat mulia dari Anda." },
      { speaker: 'B', name: 'Applicant', text: "I like giving back to the community.", translation: "Saya suka memberi kembali kepada masyarakat." }
    ]
  },
  {
    id: 'c3',
    title: "Cost of Living",
    context: "Mengeluhkan harga.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Resident 1', text: "Rent is getting so expensive.", translation: "Sewa rumah jadi makin mahal." },
      { speaker: 'B', name: 'Resident 2', text: "I know. Inflation is a big problem.", translation: "Aku tahu. Inflasi adalah masalah besar." },
      { speaker: 'A', name: 'Resident 1', text: "It is hard to save money these days.", translation: "Susah menabung zaman sekarang." },
      { speaker: 'B', name: 'Resident 2', text: "We need better economic policies.", translation: "Kita butuh kebijakan ekonomi yang lebih baik." }
    ]
  },
  {
    id: 'c4',
    title: "Healthcare Access",
    context: "Mendiskusikan asuransi.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Newcomer', text: "Is healthcare free in this country?", translation: "Apakah layanan kesehatan gratis di negara ini?" },
      { speaker: 'B', name: 'Local', text: "No, most people have private insurance.", translation: "Tidak, kebanyakan orang punya asuransi swasta." },
      { speaker: 'A', name: 'Newcomer', text: "That sounds expensive.", translation: "Kedengarannya mahal." },
      { speaker: 'B', name: 'Local', text: "It can be, but emergency care is available to all.", translation: "Bisa jadi, tapi perawatan darurat tersedia untuk semua." }
    ]
  },
  {
    id: 'c5',
    title: "Gender Equality",
    context: "Diskusi di tempat kerja.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Manager', text: "We need more diversity in our team.", translation: "Kita butuh lebih banyak keragaman di tim kita." },
      { speaker: 'B', name: 'HR', text: "I agree. We should hire more women leaders.", translation: "Saya setuju. Kita harus mempekerjakan lebih banyak pemimpin wanita." },
      { speaker: 'A', name: 'Manager', text: "Equal pay is also a priority.", translation: "Upah yang setara juga prioritas." },
      { speaker: 'B', name: 'HR', text: "Absolutely. Everyone deserves fair treatment.", translation: "Tentu saja. Semua orang berhak perlakuan adil." }
    ]
  },
  {
    id: 'c6',
    title: "Safety & Crime",
    context: "Jaga lingkungan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Neighbor 1', text: "Did you hear about the robbery?", translation: "Kamu dengar tentang perampokan itu?" },
      { speaker: 'B', name: 'Neighbor 2', text: "Yes, we need better security here.", translation: "Ya, kita butuh keamanan yang lebih baik di sini." },
      { speaker: 'A', name: 'Neighbor 1', text: "Maybe we should install cameras.", translation: "Mungkin kita harus pasang kamera." },
      { speaker: 'B', name: 'Neighbor 2', text: "And look out for each other.", translation: "Dan saling menjaga satu sama lain." }
    ]
  },
  {
    id: 'c7',
    title: "Education System",
    context: "Orang tua mengobrol.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Parent 1', text: "Are you happy with the public schools?", translation: "Apa kamu senang dengan sekolah negeri?" },
      { speaker: 'B', name: 'Parent 2', text: "They are okay, but classes are too big.", translation: "Oke sih, tapi kelasnya terlalu besar." },
      { speaker: 'A', name: 'Parent 1', text: "Teachers cannot focus on every student.", translation: "Guru tidak bisa fokus pada setiap siswa." },
      { speaker: 'B', name: 'Parent 2', text: "The government should invest more in education.", translation: "Pemerintah harus berinvestasi lebih di pendidikan." }
    ]
  },
  {
    id: 'c8',
    title: "Immigration",
    context: "Mendiskusikan budaya baru.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Local', text: "Our city is becoming very multicultural.", translation: "Kota kita jadi sangat multikultural." },
      { speaker: 'B', name: 'Immigrant', text: "Yes, many people move here for work.", translation: "Ya, banyak orang pindah ke sini untuk kerja." },
      { speaker: 'A', name: 'Local', text: "I love trying all the new foods.", translation: "Saya suka mencoba semua makanan barunya." },
      { speaker: 'B', name: 'Immigrant', text: "Diversity makes society stronger.", translation: "Keragaman membuat masyarakat lebih kuat." }
    ]
  },
  {
    id: 'c9',
    title: "Homelessness",
    context: "Melihat orang yang membutuhkan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Passerby 1', text: "It is sad to see so many homeless people.", translation: "Sedih melihat begitu banyak tunawisma." },
      { speaker: 'B', name: 'Passerby 2', text: "The shelters are full this winter.", translation: "Tempat penampungan penuh musim dingin ini." },
      { speaker: 'A', name: 'Passerby 1', text: "We should donate some blankets.", translation: "Kita harus menyumbang selimut." },
      { speaker: 'B', name: 'Passerby 2', text: "Small acts of kindness help.", translation: "Tindakan kebaikan kecil sangat membantu." }
    ]
  },
  {
    id: 'c10',
    title: "Freedom of Speech",
    context: "Memperdebatkan topik.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Debater 1', text: "People should be allowed to say anything.", translation: "Orang harus dibolehkan bicara apa saja." },
      { speaker: 'B', name: 'Debater 2', text: "I agree, but hate speech is dangerous.", translation: "Saya setuju, tapi ujaran kebencian itu berbahaya." },
      { speaker: 'A', name: 'Debater 1', text: "Where do we draw the line?", translation: "Di mana kita tarik batasnya?" },
      { speaker: 'B', name: 'Debater 2', text: "Respect must be the priority.", translation: "Rasa hormat harus jadi prioritas." }
    ]
  }
];

const InterSpeakingLesson7: React.FC = () => {
    const [activeScenario, setActiveScenario] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const currentScenario = CONVERSATION_SCENARIOS.find(c => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];

  
  
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_speaking', 7);
  const nextLessonPath = 7 < 20 ? `/modul/english/intermediate/speaking/lesson-${7+1}` : '/modul/english/intermediate';
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
        lessonLabel={"Intermediate Speaking Lesson 7"}
        accentColor="#E74C3C"
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
      title="Masyarakat & Isu"
      subtitle="Speaking • Pelajaran 7"
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
              <h2 className="text-xl font-bold mb-2">Masyarakat Modern</h2>
              <p className="text-sm opacity-90 leading-relaxed">Menyampaikan pemikiran kritis mengenai isu sosial seperti kesetaraan, pendidikan, dan hak-hak masyarakat urban.</p>
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

export default InterSpeakingLesson7;
