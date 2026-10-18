
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Sparkles, Star, Volume2, TrendingUp, BarChart } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';






const SCHWA_EXAMPLES = [
  { word: "Banana", ipa: "/bəˈnænə/", focus: "b(a)-na-n(a)" },
  { word: "Computer", ipa: "/kəmˈpjuːtər/", focus: "c(o)m-pu-t(er)" },
  { word: "Support", ipa: "/səˈpɔːrt/", focus: "s(u)-port" },
  { word: "About", ipa: "/əˈbaʊt/", focus: "(a)-bout" },
];

const STRESS_SHIFT_EXAMPLES = [
  {
    noun: "PHO-to-graph",
    person: "pho-TOG-ra-pher",
    adj: "pho-to-GRAPH-ic"
  },
  {
    noun: "E-con-o-my",
    person: "e-con-o-MIST",
    adj: "ec-o-NOM-ic"
  }
];

const INTONATION_PATTERNS = [
  {
    type: "Polite Request ↗",
    text: "Could you help me?",
    desc: "Suara NAIK di akhir agar terdengar lembut dan sopan."
  },
  {
    type: "Command ↘",
    text: "Help me now.",
    desc: "Suara TURUN. Terdengar tegas dan langsung."
  },
  {
    type: "Unfinished List ↗",
    text: "I bought bread, milk...",
    desc: "Suara NAIK untuk menunjukkan masih ada lagi."
  },
  {
    type: "Finished List ↘",
    text: "...and eggs.",
    desc: "Suara TURUN untuk menunjukkan Anda sudah selesai."
  }
];

const QUIZ_QUESTIONS = [
  { id: 1, question: "Apa bunyi vokal yang paling umum dalam bahasa Inggris (The Schwa)?", options: ['/ə/ (uh)', '/a/', '/e/'], answer: '/ə/ (uh)', explanation: "Schwa /ə/ adalah bunyi lemah dan tidak ditekan yang ditemukan dalam banyak kata bersuku kata banyak." },
  { id: 2, question: "Di mana penekanan pada kata 'Photographer'?", options: ['1st (PHO-to-gra-pher)', '2nd (pho-TOG-ra-pher)', '3rd (pho-to-GRA-pher)'], answer: '2nd (pho-TOG-ra-pher)', explanation: "Penekanan bergeser dari PHO-tograph ke pho-TOG-rapher." },
  { id: 3, question: "Jika Anda ingin terdengar sopan saat mengajukan pertanyaan Ya/Tidak, suara Anda harus...", options: ['Naik ↗', 'Turun ↘', 'Datar ➡'], answer: 'Naik ↗', explanation: "Intonasi naik terdengar lebih mengundang dan sopan untuk permintaan." },
  { id: 4, question: "Dalam kalimat 'I want to go', bagaimana 'to' biasanya diucapkan?", options: ['/tuː/ (Too)', '/tə/ (Tuh)'], answer: '/tə/ (Tuh)', explanation: "Kata-kata fungsi seperti 'to' biasanya lemah dan diucapkan dengan Schwa." },
  { id: 5, question: "Huruf 'a' mana yang diucapkan sebagai schwa /ə/ dalam 'banana'?", options: ['Tidak ada', 'Semua huruf a', 'Hanya a pertama dan terakhir'], answer: 'Hanya a pertama dan terakhir', explanation: "Dalam 'b(ə)nænə', huruf 'a' pertama dan ketiga adalah schwa karena tidak ditekan." },
  { id: 6, question: "Kata 'economy' dan 'economist' memiliki penekanan di...", options: ['Suku kata yang sama', 'Suku kata yang berbeda', 'Tidak ada penekanan'], answer: 'Suku kata yang berbeda', explanation: "Economy = e-CON-o-my, Economist = e-CON-o-MIST. Penekanan bergeser." },
  { id: 7, question: "Mengapa schwa /ə/ penting untuk pengucapan alami?", options: ['Karena paling sering muncul', 'Karena hanya ada di bahasa Inggris', 'Karena bunyi paling sulit'], answer: 'Karena paling sering muncul', explanation: "Schwa adalah bunyi vokal paling umum dalam bahasa Inggris yang digunakan." },
  { id: 8, question: "Dalam daftar 'I bought bread, milk, and eggs', di mana inton asi turun?", options: ['Setelah milk', 'Setelah bread', 'Setelah eggs'], answer: 'Setelah eggs', explanation: "Intonasi turun di akhir daftar untuk menandakan selesai." },
  { id: 9, question: "Kata 'support' diucapkan dengan penekanan pada suku kata ke...", options: ['Pertama (SUP-port)', 'Kedua (sup-PORT)'], answer: 'Kedua (sup-PORT)', explanation: "Banyak kata kerja 2 suku kata memiliki penekanan di suku kata kedua." },
  { id: 10, question: "Apa perbedaan antara 'Could you help me?' dan 'Help me now!'?", options: ['Intonasi', 'Kecepatan bicara', 'Pilihan kata'], answer: 'Intonasi', explanation: "Pertanyaan sopan naik ↗, perintah langsung turun ↘." },
  { id: 11, question: "Suku kata mana yang paling kuat dalam 'computer'?", options: ['com-', '-pu-', '-ter'], answer: '-pu-', explanation: "Penekanan ada di suku kata kedua: com-PU-ter /kəmˈpjuːtər/." },
  { id: 12, question: "Kata 'about' dimulai dengan bunyi...", options: ['/eɪ/ seperti cake', '/æ/ seperti cat', '/ə/ schwa'], answer: '/ə/ schwa', explanation: "'About' = /əˈbaʊt/, dimulai dengan schwa karena suku kata pertama tidak ditekan." },
  { id: 13, question: "Intonasi naik di akhir kalimat biasanya menunjukkan...", options: ['Pernyataan lengkap', 'Kemarahan', 'Pertanyaan atau ketidakpastian'], answer: 'Pertanyaan atau ketidakpastian', explanation: "Nada naik mengundang respon atau menunjukkan ada yang kurang pasti." },
  { id: 14, question: "Kata 'photograph', 'photographer', 'photographic' memiliki penekanan...", options: ['Selalu di suku kata pertama', 'Bergeser sesuai bentuk kata', 'Tidak ada aturan'], answer: 'Bergeser sesuai bentuk kata', explanation: "PHO-to-graph → pho-TOG-ra-pher → pho-to-GRAPH-ic. Penekanan berubah." },
  { id: 15, question: "Mengapa penting memperhatikan stress (penekanan kata)?", options: ['Agar terdengar lebih keras', 'Agar makna jelas dan alami', 'Tidak penting'], answer: 'Agar makna jelas dan alami', explanation: "Penekanan yang salah bisa membuat kata sulit dipahami atau terdengar aneh." },
  { id: 16, question: "Dalam frasa 'a cup of coffee', kata 'of' biasanya diucapkan...", options: ['/əv/ (uhv)', '/ɒv/ (ov)'], answer: '/əv/ (uhv)', explanation: "Kata fungsi 'of' dilemahkan menjadi /əv/ dalam percakapan alami." },
  { id: 17, question: "Jika Anda belum selesai berbicara dalam daftar, intonasi harus...", options: ['Datar ➡', 'Naik ↗', 'Turun ↘'], answer: 'Naik ↗', explanation: "Intonasi naik menunjukkan masih ada item lain yang akan disebutkan." },
  { id: 18, question: "Kata 'economic' memiliki penekanan di suku kata ke...", options: ['Kedua (e-CON-om-ic)', 'Ketiga (ec-o-NOM-ic)', 'Pertama (E-con-om-ic)'], answer: 'Ketiga (ec-o-NOM-ic)', explanation: "Kata sifat 'economic' = ec-o-NOM-ic, berbeda dari kata benda 'economy'." },
  { id: 19, question: "Perintah langsung seperti 'Sit down!' biasanya diucapkan dengan intonasi...", options: ['Datar', 'Naik untuk kesopanan', 'Turun untuk ketegasan'], answer: 'Turun untuk ketegasan', explanation: "Intonasi turun memberikan kesan tegas dan langsung pada perintah." },
  { id: 20, question: "Schwa /ə/ TIDAK muncul dalam kata...", options: ['Cat', 'Computer', 'Banana'], answer: 'Cat', explanation: "'Cat' /kæt/ hanya memiliki satu suku kata dengan vokal jelas /æ/, bukan schwa." }
];

const InterPronunLesson1: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 1);
    const nextLessonPath = 1 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${1 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'sounds' | 'rhythm' | 'quiz'>('sounds');

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string, rateOrLabel: number | string = 0.9, maybeRate?: number) => { const rate = typeof rateOrLabel === "number" ? rateOrLabel : (maybeRate ?? 0.9); playAudio(text, rate); };

  // Quiz Handlers
  const handleCheckQuiz = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);
    if (option === QUIZ_QUESTIONS[quizStep].answer) {
      setQuizScore(prev => prev + 1);
      playSound("Benar!");
    } else {
      playSound("Salah.");
    }
  };

  const nextQuizQuestion = () => {
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswerChecked(false);
  };

  return (
        <>
            <LessonCompleteModal
                show={showCompleteModal}
                onClose={() => setShowCompleteModal(false)}
                lessonLabel={"Intermediate Pronunciation Lesson 1"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Tinjauan Pengucapan"
                subtitle="Pronunciation • Pelajaran 1"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'sounds', label: 'The Schwa', icon: <BookOpen size={14} /> },
                    { id: 'rhythm', label: 'Stress & Tone', icon: <Sparkles size={14} /> },
                    { id: 'quiz', label: 'Latihan', icon: <PenTool size={14} /> }
                ]}
                footer={() => (
                    <button
                        onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                        className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                        style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}
                    >
                        <CheckCircle2 size={18} />
                        {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
                    </button>
                )}
            >
                {(tabId) => {
                    
                    
                    return (
                        <div className="animate-fade-in space-y-6">
                            

          {tabId === 'sounds' && (
            <>
              {/* Intro */}
              <section className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Sparkles className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Bunyi Rahasia: /ə/</h2>
                  <p className="text-violet-100 text-sm leading-relaxed">
                    Untuk berbicara bahasa Inggris alami di tingkat Menengah, Anda harus menguasai <b>Schwa</b>. Ini adalah bunyi "uh" malas pada suku kata yang tidak ditekan.
                  </p>
                </div>
              </section>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-violet-500" />
                    Dengar & Ulangi
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {SCHWA_EXAMPLES.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => playSound(item.word)}
                        className="flex justify-between items-center bg-slate-50 p-3 rounded-xl hover:bg-violet-50 transition-colors group"
                      >
                        <div className="text-left">
                          <span className="block font-bold text-slate-700">{item.word}</span>
                          <span className="text-xs text-slate-500 font-mono">{item.focus}</span>
                        </div>
                        <Volume2 className="w-8 h-8 text-slate-300 group-hover:text-violet-500" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-orange-50 rounded-2xl p-5 border border-orange-200">
                  <div className="flex gap-3">
                    <Lightbulb className="w-6 h-6 text-orange-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-orange-900 text-sm mb-1">Tip</h4>
                      <p className="text-xs text-orange-800 leading-relaxed">
                        Jangan ucapkan setiap vokal dengan jelas! "Banana" bukan "Ba-Na-Na". Tapi "Buh-NA-nuh".
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {tabId === 'rhythm' && (
            <div className="space-y-6">
              {/* Word Stress */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-indigo-500" />
                  Pergeseran Penekanan
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Saat kata menjadi lebih panjang, penekanan sering berpindah. Dengarkan baik-baik!
                </p>

                <div className="space-y-4">
                  {STRESS_SHIFT_EXAMPLES.map((group, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div className="grid grid-cols-1 gap-2">
                        <button onClick={() => playSound(group.noun)} className="text-left text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors">
                          1. {group.noun}
                        </button>
                        <button onClick={() => playSound(group.person)} className="text-left text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors">
                          2. {group.person}
                        </button>
                        <button onClick={() => playSound(group.adj)} className="text-left text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors">
                          3. {group.adj}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intonation */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  Intonasi & Sikap
                </h3>

                <div className="grid gap-3">
                  {INTONATION_PATTERNS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => playSound(item.text)}
                      className="flex flex-col items-start bg-slate-50 p-3 rounded-xl border border-slate-100 hover:bg-emerald-50 hover:border-blue-200 transition-all w-full"
                    >
                      <div className="flex justify-between w-full mb-1">
                        <span className="font-bold text-slate-800 text-sm">{item.type}</span>
                      </div>
                      <span className="text-base text-slate-700 mb-1">"{item.text}"</span>
                      <span className="text-[10px] text-slate-500 italic text-left">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tabId === 'quiz' && (
            <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-violet-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-violet-50 text-violet-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-slate-200 hover:border-violet-300 hover:bg-slate-50";
                      if (isAnswerChecked) {
                        if (option === QUIZ_QUESTIONS[quizStep].answer) btnClass = "bg-green-50 border-sky-500 text-green-700";
                        else if (option === selectedOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                        else btnClass = "opacity-50 border-slate-100";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleCheckQuiz(option)}
                          disabled={isAnswerChecked}
                          className={`w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${btnClass}`}
                        >
                          <span>{option}</span>
                          {isAnswerChecked && option === QUIZ_QUESTIONS[quizStep].answer && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                          {isAnswerChecked && option === selectedOption && option !== QUIZ_QUESTIONS[quizStep].answer && <XCircle className="w-5 h-5 text-red-500" />}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswerChecked && (
                    <div className="mt-6">
                      <div className={`p-3 rounded-lg text-sm mb-4 ${selectedOption === QUIZ_QUESTIONS[quizStep].answer ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'}`}>
                        {QUIZ_QUESTIONS[quizStep].explanation}
                      </div>
                      <button
                        onClick={nextQuizQuestion}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                      >
                        {quizStep < QUIZ_QUESTIONS.length - 1 ? "Pertanyaan Berikutnya" : "Lihat Hasil"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500">
                    <Star className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Kuis Selesai!</h2>
                  <p className="text-slate-500 mb-6">Anda mendapat skor {quizScore} dari {QUIZ_QUESTIONS.length}</p>
                  <button
                    onClick={restartQuiz}
                    className="px-8 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-200"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
            </div>
          )}

        
                        </div>
                    );
                }}
            </LessonShell>
        </>
    );
}; // END COMPONENT

export default InterPronunLesson1;
