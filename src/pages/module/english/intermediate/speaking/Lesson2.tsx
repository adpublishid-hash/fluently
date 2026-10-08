import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Trophy } from 'lucide-react';


import { asNumberedQuestions, shuffledAuthored } from '../../advanced/shared/authoredQuiz';
import { intermediateSpeakingQuizBank } from './quizBank';
const QUIZ_QUESTIONS = asNumberedQuestions(shuffledAuthored(intermediateSpeakingQuizBank[2], 'intermediate/speaking/2'));

const CONVERSATION_SCENARIOS: Scenario[] = [
  {
    id: 'c1',
    title: "University Application",
    context: "Siswa bertanya pada penasihat.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Student', text: "I would like to apply for the Master's program.", translation: "Saya ingin mendaftar untuk program Magister (S2)." },
      { speaker: 'B', name: 'Advisor', text: "Excellent. Have you prepared your transcripts?", translation: "Bagus. Apakah Anda sudah menyiapkan transkrip nilai Anda?" },
      { speaker: 'A', name: 'Student', text: "Yes, and I have my recommendation letters too.", translation: "Ya, dan saya juga punya surat rekomendasi." },
      { speaker: 'B', name: 'Advisor', text: "Great. Please submit them before the deadline.", translation: "Bagus. Tolong kumpulkan sebelum tenggat waktu." }
    ]
  },
  {
    id: 'c2',
    title: "Choosing a Major",
    context: "Dua teman mendiskusikan studi.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Leo', text: "Have you decided on a major yet?", translation: "Sudah memutuskan mau ambil jurusan apa?" },
      { speaker: 'B', name: 'Mia', text: "I'm torn between Marketing and Design.", translation: "Aku bingung antara Pemasaran dan Desain." },
      { speaker: 'A', name: 'Leo', text: "You are very creative. Design suits you.", translation: "Kamu sangat kreatif. Desain cocok untukmu." },
      { speaker: 'B', name: 'Mia', text: "That is true, but Marketing pays better.", translation: "Itu benar, tapi Pemasaran bayarannya lebih baik." }
    ]
  },
  {
    id: 'c3',
    title: "Job Interview: Strengths",
    context: "Menjawab pertanyaan wawancara umum.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Interviewer', text: "What would you say is your greatest strength?", translation: "Apa kekuatan terbesar Anda?" },
      { speaker: 'B', name: 'Candidate', text: "I am very organized and detail-oriented.", translation: "Saya sangat terorganisir dan berorientasi pada detail." },
      { speaker: 'A', name: 'Interviewer', text: "Can you give me an example?", translation: "Bisa berikan saya contoh?" },
      { speaker: 'B', name: 'Candidate', text: "I managed a complex project with zero errors.", translation: "Saya mengelola proyek rumit dengan nol kesalahan." }
    ]
  },
  {
    id: 'c4',
    title: "Internship Tasks",
    context: "Magang berbicara dengan supervisor.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Intern', text: "Excuse me, what should I work on today?", translation: "Permisi, apa yang harus saya kerjakan hari ini?" },
      { speaker: 'B', name: 'Supervisor', text: "Could you update the client database?", translation: "Bisakah kamu memperbarui basis data klien?" },
      { speaker: 'A', name: 'Intern', text: "Certainly. Should I include the new leads?", translation: "Tentu. Haruskah saya masukkan prospek baru?" },
      { speaker: 'B', name: 'Supervisor', text: "Yes, prioritize them, please.", translation: "Ya, utamakan mereka, tolong." }
    ]
  },
  {
    id: 'c5',
    title: "Career Goals",
    context: "Mendiskusikan rencana masa depan.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend', text: "Where do you see yourself in five years?", translation: "Kamu lihat dirimu di mana lima tahun lagi?" },
      { speaker: 'B', name: 'You', text: "I hope to be managing my own team.", translation: "Aku berharap bisa memimpin timku sendiri." },
      { speaker: 'A', name: 'Friend', text: "That is ambitious. I believe you can do it.", translation: "Itu ambisius. Aku yakin kamu bisa." },
      { speaker: 'B', name: 'You', text: "Thanks. I am working hard for it.", translation: "Makasih. Aku bekerja keras untuk itu." }
    ]
  },
  {
    id: 'c6',
    title: "Asking for a Raise",
    context: "Pertemuan dengan atasan.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Employee', text: "I would like to discuss my salary.", translation: "Saya ingin mendiskusikan gaji saya." },
      { speaker: 'B', name: 'Boss', text: "Go ahead. Why do you think you deserve a raise?", translation: "Silakan. Kenapa Anda pikir Anda pantas dapat kenaikan?" },
      { speaker: 'A', name: 'Employee', text: "I exceeded my sales targets this year.", translation: "Saya melampaui target penjualan saya tahun ini." },
      { speaker: 'B', name: 'Boss', text: "That is a valid point. Let's review the numbers.", translation: "Itu poin yang valid. Mari kita tinjau angkanya." }
    ]
  },
  {
    id: 'c7',
    title: "Networking Event",
    context: "Memperkenalkan diri secara profesional.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Person A', text: "Hello, I don't think we've met. I'm John.", translation: "Halo, sepertinya kita belum bertemu. Saya John." },
      { speaker: 'B', name: 'Person B', text: "Nice to meet you. I work in Finance.", translation: "Senang bertemu Anda. Saya kerja di Keuangan." },
      { speaker: 'A', name: 'Person A', text: "Interesting. I am a software developer.", translation: "Menarik. Saya pengembang perangkat lunak." },
      { speaker: 'B', name: 'Person B', text: "Here is my card. Let's keep in touch.", translation: "Ini kartu nama saya. Mari tetap berhubungan." }
    ]
  },
  {
    id: 'c8',
    title: "Work-Life Balance",
    context: "Mengeluh tentang stres.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Colleague', text: "You look tired. Are you okay?", translation: "Kamu terlihat lelah. Kamu oke?" },
      { speaker: 'B', name: 'You', text: "I am burnt out. I work every weekend.", translation: "Aku kelelahan (burnout). Aku kerja tiap akhir pekan." },
      { speaker: 'A', name: 'Colleague', text: "You need a break. Take a vacation.", translation: "Kamu butuh istirahat. Ambillah liburan." },
      { speaker: 'B', name: 'You', text: "I can't. The deadline is next week.", translation: "Gak bisa. Tenggat waktunya minggu depan." }
    ]
  },
  {
    id: 'c9',
    title: "Resignation",
    context: "Berhenti dari pekerjaan.",
    level: "Formal",
    dialogue: [
      { speaker: 'A', name: 'Employee', text: "I am handing in my resignation.", translation: "Saya menyerahkan pengunduran diri saya." },
      { speaker: 'B', name: 'Manager', text: "I am sorry to hear that. Is it final?", translation: "Saya sedih mendengarnya. Apakah sudah final?" },
      { speaker: 'A', name: 'Employee', text: "Yes, I accepted an offer elsewhere.", translation: "Ya, saya menerima tawaran di tempat lain." },
      { speaker: 'B', name: 'Manager', text: "Well, we wish you the best of luck.", translation: "Baiklah, kami doakan yang terbaik untuk Anda." }
    ]
  },
  {
    id: 'c10',
    title: "Upskilling",
    context: "Berbicara tentang kursus online.",
    level: "Casual",
    dialogue: [
      { speaker: 'A', name: 'Friend', text: "I started an online coding course.", translation: "Aku mulai kursus koding online." },
      { speaker: 'B', name: 'You', text: "That is smart. Tech skills are valuable.", translation: "Itu cerdas. Keahlian teknologi sangat berharga." },
      { speaker: 'A', name: 'Friend', text: "It is hard, but I want to switch careers.", translation: "Susah sih, tapi aku mau ganti karir." },
      { speaker: 'B', name: 'You', text: "Keep going. It will pay off.", translation: "Teruskan. Itu akan terbayar nanti." }
    ]
  }
];

const InterSpeakingLesson2: React.FC = () => {
    const [activeScenario, setActiveScenario] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const currentScenario = CONVERSATION_SCENARIOS.find(c => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];

  
  
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_speaking', 2);
  const nextLessonPath = 2 < 20 ? `/modul/english/intermediate/speaking/lesson-${2+1}` : '/modul/english/intermediate';
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
        lessonLabel={"Intermediate Speaking Lesson 2"}
        accentColor="#E74C3C"
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
      title="Pendidikan & Karir"
      subtitle="Speaking • Pelajaran 2"
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
              <h2 className="text-xl font-bold mb-2">Jalur Karir</h2>
              <p className="text-sm opacity-90 leading-relaxed">Menavigasi pembicaraan seputar edukasi, wawancara kerja, dan lingkungan kerja profesional. Fokus pada struktur kalimat yang lebih sopan (Formal).</p>
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

export default InterSpeakingLesson2;
