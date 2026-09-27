
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { Clock, BookOpen, PenTool, CheckCircle2, XCircle, Star, Volume2, TrendingUp, Zap } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';






const MODAL_REDUCTIONS = [
  {
    original: "Could have",
    reduced: "Could've / Coulda",
    ipa: "/ˈkʊdə/",
    sentence: "I coulda done it.",
    meaning: "Kemungkinan masa lalu yang tidak terjadi."
  },
  {
    original: "Should have",
    reduced: "Should've / Shoulda",
    ipa: "/ˈʃʊdə/",
    sentence: "You shoulda called me.",
    meaning: "Penyesalan atau saran masa lalu."
  },
  {
    original: "Would have",
    reduced: "Would've / Woulda",
    ipa: "/ˈwʊdə/",
    sentence: "I woulda gone.",
    meaning: "Niat masa lalu yang terganggu."
  },
  {
    original: "Must have",
    reduced: "Must've / Musta",
    ipa: "/ˈmʌstə/",
    sentence: "He musta been tired.",
    meaning: "Deduksi masa lalu (Kepastian tinggi)."
  }
];

const AUXILIARY_BLENDS = [
  {
    grammar: "Did you...?",
    sound: "Did-ja /dɪdʒə/",
    example: "Didja see it?"
  },
  {
    grammar: "Don't you...?",
    sound: "Don-choo /doʊntʃu/",
    example: "Don-choo like it?"
  },
  {
    grammar: "What do you...?",
    sound: "Whatcha /wɑːtʃə/",
    example: "Whatcha want?"
  },
  {
    grammar: "Going to...",
    sound: "Gonna /ɡənə/",
    example: "I'm gonna go."
  }
];

const NEGATIVE_TRAPS = [
  {
    pair: "Can vs Can't",
    details: [
      { type: "Positif", word: "Can", sound: "/kən/ (Lemah)", note: "Sangat pendek, vokal menghilang." },
      { type: "Negatif", word: "Can't", sound: "/kænt/ (Kuat)", note: "Lebih panjang, vokal lebih tajam. Dalam bahasa Inggris AS, 't' berhenti tiba-tiba." }
    ]
  },
  {
    pair: "Want vs Won't",
    details: [
      { type: "Keinginan", word: "Want", sound: "/wɑːnt/", note: "Buka mulut lebar-lebar (bunyi Ah)." },
      { type: "Negatif Masa Depan", word: "Won't", sound: "/woʊnt/", note: "Bulatkan bibir dengan kencang (bunyi Oh)." }
    ]
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Bagaimana 'Should have' biasanya diucapkan dalam pembicaraan cepat?",
    options: ['Should-of', 'Should-a', 'Should-have'],
    answer: 'Should-a',
    explanation: "Dalam pembicaraan alami, 'have' berkurang menjadi bunyi lemah /ə/, terdengar seperti 'Shoulda'."
  },
  {
    id: 2,
    question: "Jika seseorang berkata 'Whatcha doing?', apa tata bahasa lengkapnya?",
    options: ['What are you doing?', 'What do you doing?', 'What you do?'],
    answer: 'What are you doing?',
    explanation: "'Whatcha' adalah reduksi umum dari 'What are you' atau 'What do you'."
  },
  {
    id: 3,
    question: "Dengarkan perbedaannya: 'I can go' vs 'I can't go'. 'Can' positif biasanya terdengar seperti...",
    options: ['/kæn/ (Kuat)', '/kən/ (Lemah/Schwa)'],
    answer: '/kən/ (Lemah/Schwa)',
    explanation: "'Can' positif hampir selalu direduksi menjadi /kən/ kecuali ditekankan. Negatif 'can\'t' tetap kuat."
  },
  { id: 4, question: "Kata mana yang membutuhkan bibir BULAT: Want atau Won't?", options: ['Want', 'Won\'t'], answer: 'Won\'t', explanation: "'Won't' /woʊnt/ berima dengan 'Don't' dan membutuhkan gerakan bibir yang membulat." },
  { id: 5, question: "'Could have' berubah menjadi...", options: ['Couldhave', 'Coulda / Could\'ve', 'Cooda'], answer: 'Coulda / Could\'ve', explanation: "'Have' berkurang menjadi /ə/ atau contracted /'ve/." },
  { id: 6, question: "'Would have' berubah menjadi...", options: ['Woulda / Would\'ve', 'Woodhave', 'Wuda'], answer: 'Woulda / Would\'ve', explanation: "Past modals semua mengikuti pola yang sama: modal + 'a' atau +'ve'." },
  { id: 7, question: "'Must have' berubah menjadi...", options: ['Musthave', 'Musta / Must\'ve', 'Moosta'], answer: 'Musta / Must\'ve', explanation: "'Must have' = 'Musta' dalam casual speech." },
  { id: 8, question: "'Did you' terdengar seperti...", options: ['Did you', 'Did-ja / Didja', 'Di-you'], answer: 'Did-ja / Didja', explanation: "D + Y = /dʒ/ sound (j) dalam connected speech." },
  { id: 9, question: "'Don't you' terdengar seperti...", options: ['Don-tyou', 'Don-choo / Doncha', 'Don-joo'], answer: 'Don-choo / Doncha', explanation: "T + Y = /tʃ/ sound (ch) dalam assimilation." },
  { id: 10, question: "'What do you' berubah menjadi...", options: ['Whatdoyou', 'Whatcha / Whacha', 'Whaddyou'], answer: 'Whatcha / Whacha', explanation: "'What do you' → 'Whatcha' sangat umum dalam casual speech." },
  { id: 11, question: "'Going to' berubah menjadi...", options: ['Goingto', 'Gonna', 'Gonta'], answer: 'Gonna', explanation: "Reduksi paling umum dalam bahasa Inggris spoken." },
  { id: 12, question: "Bagaimana cara membedakan 'Can' vs 'Can't'?", options: ['Can = lemah /kən/, Can\'t = kuat /kænt/', 'Sama saja', 'Can = kuat, Can\'t = lemah'], answer: 'Can = lemah /kən/, Can\'t = kuat /kænt/', explanation: "Positive modals lemah, negative modals kuat dan jelas." },
  { id: 13, question: "'Want' memiliki vokal...", options: ['/ɑː/ atau /ɒ/ (open mouth)', '/oʊ/ (rounded lips)'], answer: '/ɑː/ atau /ɒ/ (open mouth)', explanation: "'Want' = /wɑːnt/, buka mulut lebar." },
  { id: 14, question: "'Won't' memiliki vokal...", options: ['/ɑː/ (open)', '/oʊ/ (rounded lips)'], answer: '/oʊ/ (rounded lips)', explanation: "'Won't' = /woʊnt/, bulatkan bibir." },
  { id: 15, question: "Apakah 'Coulda', 'Shoulda', 'Woulda' boleh ditulis dalam formal writing?", options: ['Ya', 'Tidak, hanya untuk speaking'], answer: 'Tidak, hanya untuk speaking', explanation: "Ini hanya untuk spoken English atau sangat informal texting." },
  { id: 16, question: "'Have to' berubah menjadi...", options: ['Haveto', 'Hafta / Gotta', 'Havta'], answer: 'Hafta / Gotta', explanation: "'Have to' → 'hafta' atau 'gotta' dalam casual speech." },
  { id: 17, question: "Dalam 'I can't see', bunyi /t/ di akhir 'can't' biasanya...", options: ['Sangat jelas', 'Stopped/unreleased (di AS)', 'Hilang'], answer: 'Stopped/unreleased (di AS)', explanation: "Dalam American English, /t/ akhir sering unreleased (glottal stop)." },
  { id: 18, question: "'Should have done' berubah menjadi...", options: ['Should-have-done', 'Shoulda done / Should\'ve done', 'Shoodadone'], answer: 'Shoulda done / Should\'ve done', explanation: "Pola yang sama: modal + 'a/ve' + past participle." },
  { id: 19, question: "Mengapa penting memahami reduced forms?", options: ['Untuk terdengar lebih pintar', 'Untuk memahami native speakers', 'Tidak penting'], answer: 'Untuk memahami native speakers', explanation: "Native speakers selalu gunakan reduced forms dalam natural speech." },
  { id: 20, question: "'Why did you' terdengar seperti...", options: ['Why-did-you', 'Why-didja / Whyddja', 'Why-joo'], answer: 'Why-didja / Whyddja', explanation: "'Did you' → 'didja' bahkan setelah question words." }
];

const InterPronunLesson9: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 9);
    const nextLessonPath = 9 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${9 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'modals' | 'blends' | 'negatives' | 'quiz'>('modals');

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
                lessonLabel={"Intermediate Pronunciation Lesson 9"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Pengucapan Tata Bahasa"
                subtitle="Pronunciation • Pelajaran 9"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'modals', label: 'Past Modals', icon: <BookOpen size={14} /> },
                    { id: 'blends', label: 'Penyatuan', icon: <BookOpen size={14} /> },
                    { id: 'negatives', label: 'Negatif', icon: <BookOpen size={14} /> },
                    { id: 'quiz', label: 'Kuis', icon: <PenTool size={14} /> }
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
                            

          {tabId === 'modals' && (
            <>
              {/* Intro */}
              <section className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Clock className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Past Modals</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    "Could have", "Should have", dan "Would have" merujuk ke masa lalu. Dalam bahasa Inggris lisan, "have" hampir menghilang, menjadi hanya "a" (/ə/).
                  </p>
                </div>
              </section>

              <div className="space-y-4">
                {MODAL_REDUCTIONS.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold text-slate-700">{item.original}</h3>
                      <span className="text-xs font-black bg-indigo-50 text-indigo-600 px-2 py-1 rounded">{item.reduced}</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-3">{item.meaning}</p>

                    <button
                      onClick={() => playSound(item.sentence)}
                      className="w-full flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 hover:bg-indigo-50 hover:border-indigo-100 transition-all group"
                    >
                      <span className="font-bold text-slate-800 text-sm">"{item.sentence}"</span>
                      <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabId === 'blends' && (
            <>
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                <div className="flex items-start gap-4">
                  <Zap className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-800 mb-2">Kecepatan Tata Bahasa</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Kata tanya dan kata kerja bantu sering menyatu dalam pembicaraan cepat dan santai.
                    </p>
                  </div>
                </div>
              </section>

              <div className="grid gap-3">
                {AUXILIARY_BLENDS.map((item, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{item.grammar}</p>
                      <h4 className="text-xl font-black text-slate-800">{item.sound}</h4>
                    </div>
                    <button
                      onClick={() => playSound(item.example)}
                      className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center hover:bg-orange-100 transition-colors"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabId === 'negatives' && (
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden mb-6">
                <div className="bg-red-50 px-6 py-4 border-b border-red-100">
                  <h3 className="font-bold text-red-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Negatif yang Rumit
                  </h3>
                  <p className="text-xs text-red-600 mt-1">Jangan bingung pasangan ini!</p>
                </div>
                <div className="divide-y divide-slate-100">
                  {NEGATIVE_TRAPS.map((group, idx) => (
                    <div key={idx} className="p-5">
                      <h4 className="font-bold text-slate-800 mb-3 text-center text-lg">{group.pair}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {group.details.map((detail, dIdx) => (
                          <button
                            key={dIdx}
                            onClick={() => playSound(detail.word)}
                            className={`p-3 rounded-xl border text-center transition-all ${detail.type.includes("Positive") || detail.type === "Desire"
                              ? "bg-green-50 border-sky-100 hover:bg-green-100"
                              : "bg-red-50 border-red-100 hover:bg-red-100"
                              }`}
                          >
                            <span className="block text-sm font-bold text-slate-700">{detail.word}</span>
                            <span className="block text-xs font-mono text-slate-500 mt-1">{detail.sound}</span>
                          </button>
                        ))}
                      </div>
                      <div className="mt-3 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <p><strong>Catatan:</strong> {group.details[0].note}</p>
                        <p className="mt-1"><strong>Vs:</strong> {group.details[1].note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tabId === 'quiz' && (
            <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-6 flex flex-col gap-2">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-slate-200 hover:border-indigo-300 hover:bg-slate-50";
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
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
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

export default InterPronunLesson9;
