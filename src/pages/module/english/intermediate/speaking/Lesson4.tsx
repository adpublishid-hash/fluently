import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Trophy } from 'lucide-react';


import { asNumberedQuestions, shuffledAuthored } from '../../advanced/shared/authoredQuiz';
import { intermediateSpeakingQuizBank } from './quizBank';
const QUIZ_QUESTIONS = asNumberedQuestions(shuffledAuthored(intermediateSpeakingQuizBank[4], 'intermediate/speaking/4'));

const CONVERSATION_SCENARIOS: Scenario[] = [
  {
    id: 'c1',
    title: "Gym Membership",
    context: "Bertanya di pusat kebugaran.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Receptionist', text: "Welcome to Titan Fitness. How can I help you?", translation: "Selamat datang di Titan Fitness. Ada yang bisa saya bantu?" },
      { speaker: 'B', name: 'Customer', text: "I would like to ask about your membership rates.", translation: "Saya ingin bertanya tentang harga keanggotaan Anda." },
      { speaker: 'A', name: 'Receptionist', text: "We have a monthly plan for $50.", translation: "Kami punya paket bulanan seharga $50." },
      { speaker: 'B', name: 'Customer', text: "Does that include access to the swimming pool?", translation: "Apakah itu termasuk akses ke kolam renang?" }
    ]
  },
  {
    id: 'c2',
    title: "Diet Changes",
    context: "Mendiskusikan kebiasaan makan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Sarah', text: "I am trying to cut down on sugar.", translation: "Aku sedang mencoba mengurangi gula." },
      { speaker: 'B', name: 'Mike', text: "That is a good idea. It's hard though.", translation: "Itu ide bagus. Tapi susah lho." },
      { speaker: 'A', name: 'Sarah', text: "I know, but I want to have more energy.", translation: "Aku tahu, tapi aku ingin punya lebih banyak energi." },
      { speaker: 'B', name: 'Mike', text: "You should try eating more fruit instead.", translation: "Kamu harus coba makan lebih banyak buah sebagai gantinya." }
    ]
  },
  {
    id: 'c3',
    title: "Doctor's Advice",
    context: "Menerima diagnosis.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Doctor', text: "Your blood pressure is a bit high.", translation: "Tekanan darah Anda agak tinggi." },
      { speaker: 'B', name: 'Patient', text: "What should I do to lower it?", translation: "Apa yang harus saya lakukan untuk menurunkannya?" },
      { speaker: 'A', name: 'Doctor', text: "You need to reduce salt and exercise daily.", translation: "Anda perlu mengurangi garam dan olahraga setiap hari." },
      { speaker: 'B', name: 'Patient', text: "I will start walking every morning.", translation: "Saya akan mulai jalan kaki setiap pagi." }
    ]
  },
  {
    id: 'c4',
    title: "Workout Routine",
    context: "Berbagi tips olahraga.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Jim', text: "Do you prefer cardio or weightlifting?", translation: "Kamu lebih suka kardio atau angkat beban?" },
      { speaker: 'B', name: 'Tom', text: "I mostly do weights to build muscle.", translation: "Aku kebanyakan angkat beban untuk membentuk otot." },
      { speaker: 'A', name: 'Jim', text: "I usually just run on the treadmill.", translation: "Aku biasanya cuma lari di treadmill." },
      { speaker: 'B', name: 'Tom', text: "You should mix it up for better results.", translation: "Kamu harus memvariasikannya untuk hasil yang lebih baik." }
    ]
  },
  {
    id: 'c5',
    title: "Mental Health",
    context: "Berbicara tentang stres.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Anna', text: "I have been feeling very stressed lately.", translation: "Aku merasa sangat stres akhir-akhir ini." },
      { speaker: 'B', name: 'Bella', text: "Have you tried meditation?", translation: "Sudah coba meditasi?" },
      { speaker: 'A', name: 'Anna', text: "No, does it really help?", translation: "Belum, apa itu benar-benar membantu?" },
      { speaker: 'B', name: 'Bella', text: "Yes, it calms your mind significantly.", translation: "Ya, itu sangat menenangkan pikiranmu." }
    ]
  },
  {
    id: 'c6',
    title: "Insomnia",
    context: "Masalah tidur.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Dan', text: "I tossed and turned all night.", translation: "Aku gelisah (bolak-balik) semalaman." },
      { speaker: 'B', name: 'Leo', text: "Maybe you drank too much coffee.", translation: "Mungkin kamu minum terlalu banyak kopi." },
      { speaker: 'A', name: 'Dan', text: "Possibly. I need to fix my sleep schedule.", translation: "Mungkin. Aku perlu perbaiki jadwal tidurku." },
      { speaker: 'B', name: 'Leo', text: "Try reading a book before bed.", translation: "Coba baca buku sebelum tidur." }
    ]
  },
  {
    id: 'c7',
    title: "Calling in Sick",
    context: "Melaporkan ketidakhadiran.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Employee', text: "I cannot come in today. I have the flu.", translation: "Saya tidak bisa masuk hari ini. Saya kena flu." },
      { speaker: 'B', name: 'Manager', text: "I understand. Do you have a fever?", translation: "Saya mengerti. Apakah Anda demam?" },
      { speaker: 'A', name: 'Employee', text: "Yes, and a terrible headache.", translation: "Ya, dan sakit kepala yang parah." },
      { speaker: 'B', name: 'Manager', text: "Please rest and send a doctor's note.", translation: "Tolong istirahat dan kirimkan surat dokter." }
    ]
  },
  {
    id: 'c8',
    title: "Sports Injury",
    context: "Menjelaskan kecelakaan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Coach', text: "What happened to your ankle?", translation: "Ada apa dengan pergelangan kakimu?" },
      { speaker: 'B', name: 'Player', text: "I twisted it while playing soccer.", translation: "Aku terkilir saat main sepak bola." },
      { speaker: 'A', name: 'Coach', text: "Is it swollen?", translation: "Apakah bengkak?" },
      { speaker: 'B', name: 'Player', text: "Yes, and it is very painful to walk.", translation: "Ya, dan sakit sekali buat jalan." }
    ]
  },
  {
    id: 'c9',
    title: "Pharmacy Visit",
    context: "Membeli obat.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Customer', text: "Do you have anything for a sore throat?", translation: "Ada obat untuk sakit tenggorokan?" },
      { speaker: 'B', name: 'Pharmacist', text: "These lozenges are very effective.", translation: "Permen pereda tenggorokan ini sangat ampuh." },
      { speaker: 'A', name: 'Customer', text: "How often should I take them?", translation: "Seberapa sering saya harus meminumnya?" },
      { speaker: 'B', name: 'Pharmacist', text: "Take one every four hours.", translation: "Minum satu setiap empat jam." }
    ]
  },
  {
    id: 'c10',
    title: "Setting Goals",
    context: "Resolusi Tahun Baru.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend 1', text: "What is your fitness goal this year?", translation: "Apa tujuan kebugaranmu tahun ini?" },
      { speaker: 'B', name: 'Friend 2', text: "I want to run a marathon.", translation: "Aku ingin lari maraton." },
      { speaker: 'A', name: 'Friend 1', text: "That requires a lot of training.", translation: "Itu butuh banyak latihan." },
      { speaker: 'B', name: 'Friend 2', text: "I am ready for the challenge.", translation: "Aku siap untuk tantangannya." }
    ]
  }
];

const InterSpeakingLesson4: React.FC = () => {
    const [activeScenario, setActiveScenario] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const currentScenario = CONVERSATION_SCENARIOS.find(c => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];

  
  
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_speaking', 4);
  const nextLessonPath = 4 < 20 ? `/modul/english/intermediate/speaking/lesson-${4+1}` : '/modul/english/intermediate';
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
        lessonLabel={"Intermediate Speaking Lesson 4"}
        accentColor="#E74C3C"
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
      title="Kesehatan & Kebugaran"
      subtitle="Speaking • Pelajaran 4"
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
              <h2 className="text-xl font-bold mb-2">Hidup Sehat</h2>
              <p className="text-sm opacity-90 leading-relaxed">Berdiskusi santai maupun serius mengenai olahraga, gaya hidup, hingga janji temu dengan dokter.</p>
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

export default InterSpeakingLesson4;
