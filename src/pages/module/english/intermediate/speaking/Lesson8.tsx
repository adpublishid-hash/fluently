import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Trophy } from 'lucide-react';


const QUIZ_QUESTIONS = [
  {
    "id": 1,
    "question": "What is the most polite way to ask about someone's media and news? [Q1]",
    "options": [
      "What is your media problem?",
      "I would love to hear about your thoughts on media and news.",
      "Tell me your media now."
    ],
    "answer": "I would love to hear about your thoughts on media and news.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 2,
    "question": "Fill the blank: \"When discussing media, it's important to __ open-minded.\"",
    "options": [
      "make",
      "stay",
      "keep"
    ],
    "answer": "stay",
    "explanation": "Phrase yang tepat adalah 'stay open-minded' yang berarti mempertahankan pemikiran terbuka."
  },
  {
    "id": 3,
    "question": "Which response strongly agrees with a statement about media? [Q3]",
    "options": [
      "I couldn't agree more.",
      "That is totally wrong.",
      "I see your point, but..."
    ],
    "answer": "I couldn't agree more.",
    "explanation": "'I couldn't agree more' menyatakan persetujuan 100% (tidak ada yang bisa ditambahkan karena sudah sangat setuju)."
  },
  {
    "id": 4,
    "question": "If you want to interrupt politely during a conversation about media, you say:",
    "options": [
      "Wait, give me a chance.",
      "Stop talking for a moment.",
      "Excuse me, may I add something here?"
    ],
    "answer": "Excuse me, may I add something here?",
    "explanation": "'Excuse me, may I add something here' adalah standar baku (CEFR B2) untuk interupsi yang menghormati pembicara."
  },
  {
    "id": 5,
    "question": "Select the best transition word: \"We talked about media and news; ____, we should also discuss the future impacts.\"",
    "options": [
      "Because",
      "Furthermore",
      "Despite"
    ],
    "answer": "Furthermore",
    "explanation": "'Furthermore' memperluas / menambahkan poin pada ide dasar sebelumnya secara terstruktur."
  },
  {
    "id": 6,
    "question": "Which idiom best describes a very easy task regarding media? [Q6]",
    "options": [
      "A piece of cake",
      "Bite the bullet",
      "Under the weather"
    ],
    "answer": "A piece of cake",
    "explanation": "'A piece of cake' secara harafiah berarti sesuatu yang sangat mudah dikerjakan atau diucapkan."
  },
  {
    "id": 7,
    "question": "What is the most polite way to ask about someone's media and news? [Q7]",
    "options": [
      "Tell me your media now.",
      "I would love to hear about your thoughts on media and news.",
      "What is your media problem?"
    ],
    "answer": "I would love to hear about your thoughts on media and news.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 8,
    "question": "Fill the blank: \"When discussing media, it's important to __ open-minded.\"",
    "options": [
      "make",
      "stay",
      "keep"
    ],
    "answer": "stay",
    "explanation": "Phrase yang tepat adalah 'stay open-minded' yang berarti mempertahankan pemikiran terbuka."
  },
  {
    "id": 9,
    "question": "Which response strongly agrees with a statement about media? [Q9]",
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
    "question": "If you want to interrupt politely during a conversation about media, you say:",
    "options": [
      "Wait, give me a chance.",
      "Stop talking for a moment.",
      "Excuse me, may I add something here?"
    ],
    "answer": "Excuse me, may I add something here?",
    "explanation": "'Excuse me, may I add something here' adalah standar baku (CEFR B2) untuk interupsi yang menghormati pembicara."
  },
  {
    "id": 11,
    "question": "Select the best transition word: \"We talked about media and news; ____, we should also discuss the future impacts.\"",
    "options": [
      "Because",
      "Furthermore",
      "Despite"
    ],
    "answer": "Furthermore",
    "explanation": "'Furthermore' memperluas / menambahkan poin pada ide dasar sebelumnya secara terstruktur."
  },
  {
    "id": 12,
    "question": "Which idiom best describes a very easy task regarding media? [Q12]",
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
    "question": "What is the most polite way to ask about someone's media and news? [Q13]",
    "options": [
      "Tell me your media now.",
      "What is your media problem?",
      "I would love to hear about your thoughts on media and news."
    ],
    "answer": "I would love to hear about your thoughts on media and news.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 14,
    "question": "Fill the blank: \"When discussing media, it's important to __ open-minded.\"",
    "options": [
      "make",
      "stay",
      "keep"
    ],
    "answer": "stay",
    "explanation": "Phrase yang tepat adalah 'stay open-minded' yang berarti mempertahankan pemikiran terbuka."
  },
  {
    "id": 15,
    "question": "Which response strongly agrees with a statement about media? [Q15]",
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
    "question": "If you want to interrupt politely during a conversation about media, you say:",
    "options": [
      "Wait, give me a chance.",
      "Stop talking for a moment.",
      "Excuse me, may I add something here?"
    ],
    "answer": "Excuse me, may I add something here?",
    "explanation": "'Excuse me, may I add something here' adalah standar baku (CEFR B2) untuk interupsi yang menghormati pembicara."
  },
  {
    "id": 17,
    "question": "Select the best transition word: \"We talked about media and news; ____, we should also discuss the future impacts.\"",
    "options": [
      "Because",
      "Furthermore",
      "Despite"
    ],
    "answer": "Furthermore",
    "explanation": "'Furthermore' memperluas / menambahkan poin pada ide dasar sebelumnya secara terstruktur."
  },
  {
    "id": 18,
    "question": "Which idiom best describes a very easy task regarding media? [Q18]",
    "options": [
      "Bite the bullet",
      "A piece of cake",
      "Under the weather"
    ],
    "answer": "A piece of cake",
    "explanation": "'A piece of cake' secara harafiah berarti sesuatu yang sangat mudah dikerjakan atau diucapkan."
  },
  {
    "id": 19,
    "question": "What is the most polite way to ask about someone's media and news? [Q19]",
    "options": [
      "Tell me your media now.",
      "What is your media problem?",
      "I would love to hear about your thoughts on media and news."
    ],
    "answer": "I would love to hear about your thoughts on media and news.",
    "explanation": "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  },
  {
    "id": 20,
    "question": "Fill the blank: \"When discussing media, it's important to __ open-minded.\"",
    "options": [
      "make",
      "stay",
      "keep"
    ],
    "answer": "stay",
    "explanation": "Phrase yang tepat adalah 'stay open-minded' yang berarti mempertahankan pemikiran terbuka."
  }
];

const CONVERSATION_SCENARIOS: Scenario[] = [
  {
    id: 'c1',
    title: "Breaking News",
    context: "Mendiskusikan kejadian terkini.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Tom', text: "Did you see the breaking news?", translation: "Apakah kamu melihat berita terkini?" },
      { speaker: 'B', name: 'Jerry', text: "No, what happened?", translation: "Tidak, apa yang terjadi?" },
      { speaker: 'A', name: 'Tom', text: "There was a huge earthquake in the Pacific.", translation: "Ada gempa bumi besar di Pasifik." },
      { speaker: 'B', name: 'Jerry', text: "That is terrible. I hope everyone is safe.", translation: "Itu mengerikan. Saya harap semua orang selamat." }
    ]
  },
  {
    id: 'c2',
    title: "Fake News",
    context: "Mengidentifikasi misinformasi.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Alice', text: "I read that drinking coffee cures all diseases.", translation: "Saya baca minum kopi menyembuhkan semua penyakit." },
      { speaker: 'B', name: 'Bob', text: "You should verify that source. It sounds like fake news.", translation: "Kamu harus memverifikasi sumber itu. Kedengarannya seperti berita palsu." },
      { speaker: 'A', name: 'Alice', text: "Really? It was shared by a friend on Facebook.", translation: "Benarkah? Itu dibagikan teman di Facebook." },
      { speaker: 'B', name: 'Bob', text: "Social media is not always reliable. Check a news site.", translation: "Media sosial tidak selalu dapat diandalkan. Cek situs berita." }
    ]
  },
  {
    id: 'c3',
    title: "Viral Video",
    context: "Berbicara tentang tren.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Sarah', text: "Have you seen that viral video of the dancing cat?", translation: "Sudah lihat video viral kucing menari itu?" },
      { speaker: 'B', name: 'Mike', text: "Yes, it is everywhere on my feed today.", translation: "Ya, itu ada di mana-mana di beranda saya hari ini." },
      { speaker: 'A', name: 'Sarah', text: "It got five million views in one day.", translation: "Itu dapat lima juta tayangan dalam satu hari." },
      { speaker: 'B', name: 'Mike', text: "The internet loves cute animals.", translation: "Internet suka hewan lucu." }
    ]
  },
  {
    id: 'c4',
    title: "Opinion Column",
    context: "Mendiskusikan artikel.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Reader 1', text: "What did you think of the editorial in today's paper?", translation: "Apa pendapat Anda tentang tajuk rencana di koran hari ini?" },
      { speaker: 'B', name: 'Reader 2', text: "I thought the writer made some valid points about the economy.", translation: "Saya pikir penulis membuat beberapa poin valid tentang ekonomi." },
      { speaker: 'A', name: 'Reader 1', text: "I found it a bit biased towards one political party.", translation: "Saya merasa itu agak bias ke satu partai politik." },
      { speaker: 'B', name: 'Reader 2', text: "True, but it is an opinion piece, not a news report.", translation: "Benar, tapi itu artikel opini, bukan laporan berita." }
    ]
  },
  {
    id: 'c5',
    title: "Podcast Recommendation",
    context: "Menyarankan konten audio.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend 1', text: "Do you listen to any good podcasts?", translation: "Kamu dengerin podcast bagus gak?" },
      { speaker: 'B', name: 'Friend 2', text: "I love 'The Daily'. It covers current events.", translation: "Saya suka 'The Daily'. Itu meliput peristiwa terkini." },
      { speaker: 'A', name: 'Friend 1', text: "Is it long? I have a short commute.", translation: "Apa itu panjang? Perjalanan kerjaku sebentar." },
      { speaker: 'B', name: 'Friend 2', text: "No, episodes are only twenty minutes.", translation: "Tidak, episodenya hanya dua puluh menit." }
    ]
  },
  {
    id: 'c6',
    title: "Weather Forecast",
    context: "Mengecek berita.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Dad', text: "The news anchor said a storm is approaching.", translation: "Pembawa berita bilang badai mendekat." },
      { speaker: 'B', name: 'Mom', text: "We should secure the outdoor furniture then.", translation: "Kita harus mengamankan perabot luar kalau begitu." },
      { speaker: 'A', name: 'Dad', text: "They predict heavy rain and strong winds.", translation: "Mereka memprediksi hujan lebat dan angin kencang." },
      { speaker: 'B', name: 'Mom', text: "I will check the weather app for updates.", translation: "Saya akan cek aplikasi cuaca untuk pembaruan." }
    ]
  },
  {
    id: 'c7',
    title: "Fact-Checking",
    context: "Skeptis tentang cerita.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Colleague', text: "This article claims aliens landed in London.", translation: "Artikel ini mengklaim alien mendarat di London." },
      { speaker: 'B', name: 'You', text: "That sounds highly unlikely. Did you fact-check it?", translation: "Itu terdengar sangat tidak mungkin. Sudahkah Anda cek faktanya?" },
      { speaker: 'A', name: 'Colleague', text: "No, but the photos look real.", translation: "Tidak, tapi fotonya terlihat asli." },
      { speaker: 'B', name: 'You', text: "Photos can be edited easily these days.", translation: "Foto bisa diedit dengan mudah zaman sekarang." }
    ]
  },
  {
    id: 'c8',
    title: "Subscription Service",
    context: "Streaming konten.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Fan', text: "Did you subscribe to that new streaming service?", translation: "Apa kamu langganan layanan streaming baru itu?" },
      { speaker: 'B', name: 'Friend', text: "Yes, they have exclusive documentaries.", translation: "Ya, mereka punya dokumenter eksklusif." },
      { speaker: 'A', name: 'Fan', text: "Is it worth the monthly fee?", translation: "Apa itu sepadan dengan biaya bulanannya?" },
      { speaker: 'B', name: 'Friend', text: "Definitely. The content quality is high.", translation: "Pasti. Kualitas kontennya tinggi." }
    ]
  },
  {
    id: 'c9',
    title: "Censorship Debate",
    context: "Diskusi kebebasan internet.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Debater 1', text: "What is your view on internet censorship?", translation: "Apa pandangan Anda tentang penyensoran internet?" },
      { speaker: 'B', name: 'Debater 2', text: "It is a complex issue. We need to protect children.", translation: "Ini masalah rumit. Kita perlu melindungi anak-anak." },
      { speaker: 'A', name: 'Debater 1', text: "However, freedom of speech is also essential.", translation: "Namun, kebebasan berbicara juga penting." },
      { speaker: 'B', name: 'Debater 2', text: "Finding the balance is the challenge for policymakers.", translation: "Menemukan keseimbangan adalah tantangan bagi pembuat kebijakan." }
    ]
  },
  {
    id: 'c10',
    title: "The Interview",
    context: "Mengomentari program TV.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Viewer 1', text: "Did you watch the interview with the Prime Minister?", translation: "Apa kamu nonton wawancara dengan Perdana Menteri?" },
      { speaker: 'B', name: 'Viewer 2', text: "Yes, the journalist asked some tough questions.", translation: "Ya, wartawannya mengajukan pertanyaan sulit." },
      { speaker: 'A', name: 'Viewer 1', text: "He seemed a bit nervous answering them.", translation: "Dia terlihat agak gugup menjawabnya." },
      { speaker: 'B', name: 'Viewer 2', text: "It is hard to be in the spotlight like that.", translation: "Sulit untuk berada di sorotan seperti itu." }
    ]
  }
];

const InterSpeakingLesson8: React.FC = () => {
    const [activeScenario, setActiveScenario] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const currentScenario = CONVERSATION_SCENARIOS.find(c => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];

  
  
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_speaking', 8);
  const nextLessonPath = 8 < 20 ? `/modul/english/intermediate/speaking/lesson-${8+1}` : '/modul/english/intermediate';
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
        lessonLabel={"Intermediate Speaking Lesson 8"}
        accentColor="#E74C3C"
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
      title="Media & Berita"
      subtitle="Speaking • Pelajaran 8"
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
              <h2 className="text-xl font-bold mb-2">Era Informasi</h2>
              <p className="text-sm opacity-90 leading-relaxed">Melatih filter opini: membicarakan berita viral, hoax, liputan jurnalisme, dan bias stasiun berita.</p>
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

export default InterSpeakingLesson8;
