import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, User, TrendingUp, Star, Sparkles } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

// 30 Words divided into 3 categories
const TRANSPORT_VOCAB = [
  { word: "Airplane", ipa: "/ˈɛrpleɪn/", meaning: "Pesawat Terbang" },
  { word: "Train", ipa: "/treɪn/", meaning: "Kereta Api" },
  { word: "Bus", ipa: "/bʌs/", meaning: "Bus" },
  { word: "Taxi", ipa: "/ˈtæksi/", meaning: "Taksi" },
  { word: "Subway", ipa: "/ˈsʌbweɪ/", meaning: "Kereta Bawah Tanah" },
  { word: "Ferry", ipa: "/ˈfɛri/", meaning: "Kapal Feri" },
  { word: "Bicycle", ipa: "/ˈbaɪsɪkəl/", meaning: "Sepeda" },
  { word: "Motorcycle", ipa: "/ˈmoʊtərsraɪkəl/", meaning: "Sepeda Motor" },
  { word: "Scooter", ipa: "/ˈskuːtər/", meaning: "Skuter" },
  { word: "Van", ipa: "/væn/", meaning: "Mobil Van" },
];

const TRAVEL_ACTIONS_VOCAB = [
  { word: "Travel", ipa: "/ˈtrævəl/", meaning: "Bepergian" },
  { word: "Depart", ipa: "/dɪˈpɑːrt/", meaning: "Berangkat" },
  { word: "Arrive", ipa: "/əˈraɪv/", meaning: "Tiba / Sampai" },
  { word: "Pack", ipa: "/pæk/", meaning: "Berkemas" },
  { word: "Book", ipa: "/bʊk/", meaning: "Memesan (Tiket/Hotel)" },
  { word: "Check-in", ipa: "/tʃɛk ɪn/", meaning: "Lapor Masuk (Hotel/Bandara)" },
  { word: "Board", ipa: "/bɔːrd/", meaning: "Naik (Pesawat/Kapal)" },
  { word: "Fly", ipa: "/flaɪ/", meaning: "Terbang" },
  { word: "Drive", ipa: "/draɪv/", meaning: "Mengemudi" },
  { word: "Ride", ipa: "/raɪd/", meaning: "Mengendarai (Sepeda/Motor)" },
];

const STATION_AIRPORT_VOCAB = [
  { word: "Ticket", ipa: "/ˈtɪkɪt/", meaning: "Tiket" },
  { word: "Passport", ipa: "/ˈpæspɔːrt/", meaning: "Paspor" },
  { word: "Luggage", ipa: "/ˈlʌɡɪdʒ/", meaning: "Bagasi" },
  { word: "Suitcase", ipa: "/ˈsuːtkeɪs/", meaning: "Koper" },
  { word: "Gate", ipa: "/ɡeɪt/", meaning: "Gerbang (Bandara)" },
  { word: "Platform", ipa: "/ˈplætfɔːrm/", meaning: "Peron (Stasiun)" },
  { word: "Seat", ipa: "/siːt/", meaning: "Kursi / Tempat Duduk" },
  { word: "Passenger", ipa: "/ˈpæsɪndʒər/", meaning: "Penumpang" },
  { word: "Driver", ipa: "/ˈdraɪvər/", meaning: "Pengemudi / Supir" },
  { word: "Tourist", ipa: "/ˈtʊərɪst/", meaning: "Turis / Wisatawan" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "You wait for the train on the ___.",
    options: ['Gate', 'Platform', 'Runway'],
    answer: 'Platform',
    explanation: "Kereta api berhenti di platform (peron)."
  },
  {
    id: 2,
    question: "To reserve a hotel room, you need to ___ it.",
    options: ['book', 'pack', 'drive'],
    answer: 'book',
    explanation: "To book berarti memesan sesuatu sebelumnya."
  },
  {
    id: 3,
    question: "A person traveling in a taxi but not driving is a ___.",
    options: ['Driver', 'Passenger', 'Pilot'],
    answer: 'Passenger',
    explanation: "Passenger (penumpang) adalah orang yang bepergian dengan kendaraan tetapi tidak mengemudikannya."
  },
  {
    id: 4,
    question: "You need a ___ to travel to another country.",
    options: ['Ticket', 'Passport', 'License'],
    answer: 'Passport',
    explanation: "Passport adalah dokumen resmi untuk perjalanan internasional."
  },
  {
    id: 5,
    question: "I am going to ___ my suitcase now.",
    options: ['pack', 'fly', 'ride'],
    answer: 'pack',
    explanation: "To pack berarti memasukkan pakaian ke dalam koper."
  },
  {
    id: 6,
    question: "You wait for the train on the ___.",
    options: ["Gate","Platform","Runway"],
    answer: "Platform",
    explanation: "Kereta api berhenti di platform (peron)."
  },
  {
    id: 7,
    question: "To reserve a hotel room, you need to ___ it.",
    options: ["book","pack","drive"],
    answer: "book",
    explanation: "To book berarti memesan sesuatu sebelumnya."
  },
  {
    id: 8,
    question: "A person traveling in a taxi but not driving is a ___.",
    options: ["Driver","Passenger","Pilot"],
    answer: "Passenger",
    explanation: "Passenger (penumpang) adalah orang yang bepergian dengan kendaraan tetapi tidak mengemudikannya."
  },
  {
    id: 9,
    question: "You need a ___ to travel to another country.",
    options: ["Ticket","Passport","License"],
    answer: "Passport",
    explanation: "Passport adalah dokumen resmi untuk perjalanan internasional."
  },
  {
    id: 10,
    question: "I am going to ___ my suitcase now.",
    options: ["pack","fly","ride"],
    answer: "pack",
    explanation: "To pack berarti memasukkan pakaian ke dalam koper."
  },
  {
    id: 11,
    question: "You wait for the train on the ___.",
    options: ["Gate","Platform","Runway"],
    answer: "Platform",
    explanation: "Kereta api berhenti di platform (peron)."
  },
  {
    id: 12,
    question: "To reserve a hotel room, you need to ___ it.",
    options: ["book","pack","drive"],
    answer: "book",
    explanation: "To book berarti memesan sesuatu sebelumnya."
  },
  {
    id: 13,
    question: "A person traveling in a taxi but not driving is a ___.",
    options: ["Driver","Passenger","Pilot"],
    answer: "Passenger",
    explanation: "Passenger (penumpang) adalah orang yang bepergian dengan kendaraan tetapi tidak mengemudikannya."
  },
  {
    id: 14,
    question: "You need a ___ to travel to another country.",
    options: ["Ticket","Passport","License"],
    answer: "Passport",
    explanation: "Passport adalah dokumen resmi untuk perjalanan internasional."
  },
  {
    id: 15,
    question: "I am going to ___ my suitcase now.",
    options: ["pack","fly","ride"],
    answer: "pack",
    explanation: "To pack berarti memasukkan pakaian ke dalam koper."
  },
  {
    id: 16,
    question: "You wait for the train on the ___.",
    options: ["Gate","Platform","Runway"],
    answer: "Platform",
    explanation: "Kereta api berhenti di platform (peron)."
  },
  {
    id: 17,
    question: "To reserve a hotel room, you need to ___ it.",
    options: ["book","pack","drive"],
    answer: "book",
    explanation: "To book berarti memesan sesuatu sebelumnya."
  },
  {
    id: 18,
    question: "A person traveling in a taxi but not driving is a ___.",
    options: ["Driver","Passenger","Pilot"],
    answer: "Passenger",
    explanation: "Passenger (penumpang) adalah orang yang bepergian dengan kendaraan tetapi tidak mengemudikannya."
  },
  {
    id: 19,
    question: "You need a ___ to travel to another country.",
    options: ["Ticket","Passport","License"],
    answer: "Passport",
    explanation: "Passport adalah dokumen resmi untuk perjalanan internasional."
  },
  {
    id: 20,
    question: "I am going to ___ my suitcase now.",
    options: ["pack","fly","ride"],
    answer: "pack",
    explanation: "To pack berarti memasukkan pakaian ke dalam koper."
  }
];

const Lesson8: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_vocabulary', 8);
  const nextLessonPath = '/modul/english/elementary/vocabulary/lesson-9';
  const [vocabSection, setVocabSection] = useState<'transport' | 'actions' | 'station'>('transport');

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string) => { playAudio(text, 0.9); };

  // Quiz Logic
  const handleCheckQuiz = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);
    if (option === QUIZ_QUESTIONS[quizStep].answer) {
      setQuizScore(prev => prev + 1);
      playSound("Correct!");
    } else {
      playSound("Incorrect.");
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

  const renderVocabList = (list: typeof TRANSPORT_VOCAB, colorClass: string, icon: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in">
      {list.map((item, idx) => (
        <button
          key={idx}
          onClick={() => playSound(item.word)}
          className={`bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-card)] flex items-center justify-between group hover:border-${colorClass}-300 hover:shadow-md transition-all active:scale-95 text-left`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full bg-${colorClass}-50 text-${colorClass}-500 flex items-center justify-center flex-shrink-0 font-bold text-sm`}>
              {idx + 1}
            </div>
            <div>
              <p className="font-bold text-[var(--color-text-primary)]">{item.word}</p>
              <p className="text-xs text-[var(--color-text-muted)] font-mono mb-1">{item.ipa}</p>
              <p className="text-xs text-[var(--color-text-muted)] italic">{item.meaning}</p>
            </div>
          </div>
          <Volume2 className={`w-5 h-5 text-slate-300 group-hover:text-${colorClass}-500`} />
        </button>
      ))}
    </div>
  );

  return (
        <>
          <LessonCompleteModal
      show={showCompleteModal}
      onClose={() => setShowCompleteModal(false)}
      lessonLabel={"Elementary Vocabulary Lesson 8"}
      accentColor={"#16A085"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Perjalanan & Transportasi"
            subtitle="Vocabulary • Pelajaran 8"
            accentColor="#2980B9"
            nextLesson={nextLessonPath}
            tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}
            footer={() => (
                <button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #2980B9, #2980B9cc)' }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
                </button>
            )}
        >
            {(tabId) => tabId === 'learn' ? (
        <div className="space-y-8 animate-fade-in">
{/* Category Switcher */}
              <div className="flex justify-center gap-2 mb-6">
                <button
                  onClick={() => setVocabSection('transport')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'transport' ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Transportasi
                </button>
                <button
                  onClick={() => setVocabSection('actions')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'actions' ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Aksi
                </button>
                <button
                  onClick={() => setVocabSection('station')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'station' ? 'bg-teal-100 text-[var(--color-primary)] ring-2 ring-teal-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Di Stasiun
                </button>
              </div>

              {vocabSection === 'transport' && (
                <>
                  <div className="bg-blue-50 p-4 rounded-2xl mb-4 border border-blue-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-blue-500 shadow-[var(--shadow-card)]"><TrendingUp className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-blue-900 text-sm">Moda Transportasi</h3>
                      <p className="text-xs text-blue-700">Cara bepergian dari A ke B.</p>
                    </div>
                  </div>
                  {renderVocabList(TRANSPORT_VOCAB, 'blue', TrendingUp)}
                </>
              )}

              {vocabSection === 'actions' && (
                <>
                  <div className="bg-indigo-50 p-4 rounded-2xl mb-4 border border-indigo-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-indigo-500 shadow-[var(--shadow-card)]"><Sparkles size={20} /></div>
                    <div>
                      <h3 className="font-bold text-indigo-900 text-sm">Aksi Perjalanan</h3>
                      <p className="text-xs text-indigo-700">Hal-hal yang kamu lakukan saat bepergian.</p>
                    </div>
                  </div>
                  {renderVocabList(TRAVEL_ACTIONS_VOCAB, 'indigo', Sparkles)}
                </>
              )}

              {vocabSection === 'station' && (
                <>
                  <div className="bg-gray-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-[var(--color-primary)] shadow-[var(--shadow-card)]"><User className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-teal-900 text-sm">Di Stasiun/Bandara</h3>
                      <p className="text-xs text-[var(--color-primary)]">Kata-kata berguna untuk terminal.</p>
                    </div>
                  </div>
                  {renderVocabList(STATION_AIRPORT_VOCAB, 'teal', User)}
                </>
              )}

<div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb size={20} />
                  <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Rencana Masa Depan: Going to</h2>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Gunakan <b>be + going to + verb</b> untuk membicarakan rencana atau niat masa depan.
                </p>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-2">Struktur</h3>
                    <p className="text-xs text-blue-700 font-mono mb-2">Subject + am/is/are + going to + Base Verb</p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-2">
                      <li>I <b>am going to travel</b> to Japan.</li>
                      <li>She <b>is going to buy</b> a ticket.</li>
                      <li>We <b>are going to fly</b> tomorrow.</li>
                    </ul>
                  </div>

                  <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
                    <h3 className="font-bold text-rose-800 mb-2">Negatif</h3>
                    <p className="text-xs text-rose-700 font-mono mb-2">Tambahkan 'not' setelah am/is/are</p>
                    <ul className="space-y-2 text-sm text-[var(--color-text-primary)]">
                      <li>I am <b>not</b> going to drive.</li>
                      <li>They are <b>not</b> going to stay in a hotel.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2 text-sm uppercase tracking-wide">Bentuk Singkat</h3>
                <div className="bg-white p-3 rounded-lg border border-indigo-100/50">
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Dalam bahasa Inggris lisan:</p>
                  <p className="text-sm font-bold text-indigo-600">"Gonna"</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-2">"I'm gonna travel" (Hanya untuk situasi informal!)</p>
                </div>
              </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-blue-300 hover:bg-[var(--color-background)]";
                      if (isAnswerChecked) {
                        if (option === QUIZ_QUESTIONS[quizStep].answer) btnClass = "bg-green-50 border-sky-500 text-green-700";
                        else if (option === selectedOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                        else btnClass = "opacity-50 border-[var(--color-border)]";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleCheckQuiz(option)}
                          disabled={isAnswerChecked}
                          className={`w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${btnClass}`}
                        >
                          <span>{option}</span>
                          {isAnswerChecked && option === QUIZ_QUESTIONS[quizStep].answer && <CheckCircle2 size={20} />}
                          {isAnswerChecked && option === selectedOption && option !== QUIZ_QUESTIONS[quizStep].answer && <XCircle size={20} />}
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
                        {quizStep < QUIZ_QUESTIONS.length - 1 ? "Pertanyaan Selanjutnya" : "Lihat Hasil"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500">
                    <Star className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Kuis Selesai!</h2>
                  <p className="text-[var(--color-text-muted)] mb-6">Kamu mendapatkan skor {quizScore} dari {QUIZ_QUESTIONS.length}</p>
                  <button
                    onClick={restartQuiz}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
            </div>
        </div>
      )}
    </LessonShell>
    </>
  );
};

export default Lesson8;
