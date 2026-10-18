import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Trophy } from 'lucide-react';


import { asNumberedQuestions, shuffledAuthored } from '../../advanced/shared/authoredQuiz';
import { intermediateSpeakingQuizBank } from './quizBank';
const QUIZ_QUESTIONS = asNumberedQuestions(shuffledAuthored(intermediateSpeakingQuizBank[12], 'intermediate/speaking/12'));

const CONVERSATION_SCENARIOS: Scenario[] = [
  {
    id: 'c1',
    title: "Making Plans",
    context: "Mengatur pertemuan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend 1', text: "Are we still meeting up this weekend?", translation: "Jadi kita tetap bertemu akhir pekan ini?" },
      { speaker: 'B', name: 'Friend 2', text: "I'm not sure. I might have to call it off.", translation: "Aku tidak yakin. Aku mungkin harus membatalkannya (call it off)." },
      { speaker: 'A', name: 'Friend 1', text: "Oh no! I was really looking forward to it.", translation: "Oh tidak! Padahal aku sangat menantikannya." },
      { speaker: 'B', name: 'Friend 2', text: "Let's put it off until next week instead.", translation: "Ayo kita tunda (put it off) saja sampai minggu depan." }
    ]
  },
  {
    id: 'c2',
    title: "At Work",
    context: "Menangani tugas sulit.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Manager', text: "How are you getting on with the report?", translation: "Bagaimana perkembangan laporanmu?" },
      { speaker: 'B', name: 'Employee', text: "I'm finding it hard to figure out the data.", translation: "Saya kesulitan memahami (figure out) datanya." },
      { speaker: 'A', name: 'Manager', text: "Don't give up. Carry on with the analysis.", translation: "Jangan menyerah. Lanjutkan (carry on) analisisnya." },
      { speaker: 'B', name: 'Employee', text: "Okay, I will look into it more deeply.", translation: "Baik, saya akan memeriksanya (look into) lebih dalam." }
    ]
  },
  {
    id: 'c3',
    title: "Social Life",
    context: "Bertemu orang baru.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'You', text: "Do you get along with your new roommate?", translation: "Apa kamu akur (get along) dengan teman sekamarmu yang baru?" },
      { speaker: 'B', name: 'Friend', text: "Yes, we get on really well.", translation: "Ya, kami sangat akrab (get on)." },
      { speaker: 'A', name: 'You', text: "That's great. We should all hang out sometime.", translation: "Bagus sekali. Kita harus kumpul (hang out) kapan-kapan." },
      { speaker: 'B', name: 'Friend', text: "Definitely! I will ask her.", translation: "Tentu! Aku akan tanyakan padanya." }
    ]
  },
  {
    id: 'c4',
    title: "Daily Routine",
    context: "Keramaian pagi.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Dad', text: "Hurry up! We need to set off now.", translation: "Cepat! Kita harus berangkat (set off) sekarang." },
      { speaker: 'B', name: 'Kid', text: "Wait! I can't find my shoes.", translation: "Tunggu! Aku tidak bisa menemukan sepatuku." },
      { speaker: 'A', name: 'Dad', text: "Just put on any pair.", translation: "Pakai (put on) saja pasang yang mana pun." },
      { speaker: 'B', name: 'Kid', text: "I found them! Let's go.", translation: "Aku menemukannya! Ayo pergi." }
    ]
  },
  {
    id: 'c5',
    title: "Problem Solving",
    context: "Kehabisan persediaan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Cook 1', text: "Oh no, we have run out of flour.", translation: "Oh tidak, kita kehabisan (run out of) tepung." },
      { speaker: 'B', name: 'Cook 2', text: "How are we going to make the cake?", translation: "Bagaimana kita akan membuat kuenya?" },
      { speaker: 'A', name: 'Cook 1', text: "I can't deal with this right now.", translation: "Aku tidak bisa menangani (deal with) ini sekarang." },
      { speaker: 'B', name: 'Cook 2', text: "Calm down. I will go to the store.", translation: "Tenang. Aku akan pergi ke toko." }
    ]
  },
  {
    id: 'c6',
    title: "Travel",
    context: "Kembali dari perjalanan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend', text: "When did you get back from your trip?", translation: "Kapan kamu kembali (get back) dari perjalananmu?" },
      { speaker: 'B', name: 'Traveler', text: "I got back late last night.", translation: "Aku kembali tadi malam." },
      { speaker: 'A', name: 'Friend', text: "Did you bring me back a souvenir?", translation: "Apa kamu membawakanku oleh-oleh?" },
      { speaker: 'B', 'name': 'Traveler', text: "Of course! I will drop it off tomorrow.", translation: "Tentu saja! Aku akan mengantarkannya (drop it off) besok." }
    ]
  },
  {
    id: 'c7',
    title: "Shopping",
    context: "Mencoba pakaian.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Shopper', text: "I need to try this on.", translation: "Aku perlu mencoba (try on) ini." },
      { speaker: 'B', name: 'Assistant', text: "The fitting room is over there.", translation: "Kamar pas ada di sebelah sana." },
      { speaker: 'A', name: 'Shopper', text: "Thanks. Can you help me pick out a color?", translation: "Makasih. Bisa bantu aku memilih (pick out) warna?" },
      { speaker: 'B', name: 'Assistant', text: "The blue one looks good on you.", translation: "Yang biru terlihat bagus untukmu." }
    ]
  },
  {
    id: 'c8',
    title: "Health",
    context: "Pulih dari penyakit.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'You', text: "I am finally getting over my cold.", translation: "Aku akhirnya sembuh (get over) dari pilekku." },
      { speaker: 'B', name: 'Friend', text: "That is good to hear. You were sick for a week.", translation: "Senang mendengarnya. Kamu sakit selama seminggu." },
      { speaker: 'A', name: 'You', text: "I know. I need to cut down on junk food.", translation: "Aku tahu. Aku perlu mengurangi (cut down on) makanan tidak sehat." },
      { speaker: 'B', name: 'Friend', text: "Yes, a healthy diet is important.", translation: "Ya, pola makan sehat itu penting." }
    ]
  },
  {
    id: 'c9',
    title: "Relationships",
    context: "Mendiskusikan pertengkaran.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend 1', text: "Did you and Tom break up?", translation: "Apa kamu dan Tom putus (break up)?" },
      { speaker: 'B', name: 'Friend 2', text: "No, we just had an argument. We made up.", translation: "Tidak, kami hanya bertengkar. Kami sudah berbaikan (made up)." },
      { speaker: 'A', name: 'Friend 1', text: "I'm glad. I can't put up with drama.", translation: "Aku senang. Aku tidak tahan (put up with) dengan drama." },
      { speaker: 'B', name: 'Friend 2', text: "Me neither. I am happy we fixed it.", translation: "Aku juga. Aku senang kami memperbaikinya." }
    ]
  },
  {
    id: 'c10',
    title: "Information",
    context: "Mencari informasi.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Student', text: "I don't know this word. I'll look it up.", translation: "Saya tidak tahu kata ini. Saya akan mencarinya (look it up)." },
      { speaker: 'B', name: 'Librarian', text: "You can use the online dictionary.", translation: "Anda bisa pakai kamus online." },
      { speaker: 'A', name: 'Student', text: "I found out it's an old English word.", translation: "Saya menemukan (found out) bahwa itu adalah kata Inggris kuno." },
      { speaker: 'B', name: 'Librarian', text: "Interesting. Please write down the definition.", translation: "Menarik. Tolong catat (write down) definisinya." }
    ]
  }
];

const InterSpeakingLesson12: React.FC = () => {
    const [activeScenario, setActiveScenario] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const currentScenario = CONVERSATION_SCENARIOS.find(c => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];

  
  
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_speaking', 12);
  const nextLessonPath = 12 < 20 ? `/modul/english/intermediate/speaking/lesson-${12+1}` : '/modul/english/intermediate';
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
        lessonLabel={"Intermediate Speaking Lesson 12"}
        accentColor="#E74C3C"
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
      title="Frasa Kata Kerja Umum"
      subtitle="Speaking • Pelajaran 12"
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
              <h2 className="text-xl font-bold mb-2">Terdengar Alami</h2>
              <p className="text-sm opacity-90 leading-relaxed">Mengenal 'Phrasal Verbs' kunci di percakapan sehari-hari seperti 'look into', 'bring up', dan 'turn out'.</p>
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

export default InterSpeakingLesson12;
