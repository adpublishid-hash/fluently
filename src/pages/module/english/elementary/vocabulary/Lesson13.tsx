import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, Smile, TrendingUp, Star, Sparkles } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

// 30 Words divided into 3 categories
const EVENTS_VOCAB = [
  { word: "Party", ipa: "/ˈpɑːrti/", meaning: "Pesta" },
  { word: "Wedding", ipa: "/ˈwɛdɪŋ/", meaning: "Pernikahan" },
  { word: "Birthday", ipa: "/ˈbɜːrθdeɪ/", meaning: "Ulang tahun" },
  { word: "Funeral", ipa: "/ˈfjuːnərəl/", meaning: "Pemakaman" },
  { word: "Concert", ipa: "/ˈkɒnsərt/", meaning: "Konser" },
  { word: "Festival", ipa: "/ˈfɛstɪvəl/", meaning: "Festival / Perayaan" },
  { word: "Meeting", ipa: "/ˈmiːtɪŋ/", meaning: "Pertemuan / Rapat" },
  { word: "Date", ipa: "/deɪt/", meaning: "Kencan" },
  { word: "Appointment", ipa: "/əˈpɔɪntmənt/", meaning: "Janji temu" },
  { word: "Reunion", ipa: "/riːˈjuːnjən/", meaning: "Reuni" },
];

const ACTIONS_VOCAB = [
  { word: "Invite", ipa: "/ɪnˈvaɪt/", meaning: "Mengundang" },
  { word: "Accept", ipa: "/əkˈsɛpt/", meaning: "Menerima" },
  { word: "Refuse", ipa: "/rɪˈfjuːz/", meaning: "Menolak" },
  { word: "Greet", ipa: "/ɡriːt/", meaning: "Menyapa" },
  { word: "Introduce", ipa: "/ˌɪntrəˈdjuːs/", meaning: "Memperkenalkan" },
  { word: "Chat", ipa: "/tʃæt/", meaning: "Mengobrol" },
  { word: "Celebrate", ipa: "/ˈsɛlɪbreɪt/", meaning: "Merayakan" },
  { word: "Dance", ipa: "/dæns/", meaning: "Menari" },
  { word: "Argue", ipa: "/ˈɑːrɡjuː/", meaning: "Berdebat" },
  { word: "Apologize", ipa: "/əˈpɒlədʒaɪz/", meaning: "Meminta maaf" },
];

const MANNERS_VOCAB = [
  { word: "Guest", ipa: "/ɡɛst/", meaning: "Tamu" },
  { word: "Host", ipa: "/hoʊst/", meaning: "Tuan rumah" },
  { word: "Polite", ipa: "/pəˈlaɪt/", meaning: "Sopan" },
  { word: "Rude", ipa: "/ruːd/", meaning: "Kasar / Tidak sopan" },
  { word: "Gift", ipa: "/ɡɪft/", meaning: "Hadiah / Kado" },
  { word: "Invitation", ipa: "/ˌɪnvɪˈteɪʃən/", meaning: "Undangan (Kartu/Pesan)" },
  { word: "Cheers", ipa: "/tʃɪərz/", meaning: "Bersulang / Terima kasih (UK)" },
  { word: "Congrats", ipa: "/kənˈɡræts/", meaning: "Selamat (Singkatan)" },
  { word: "Welcome", ipa: "/ˈwɛlkəm/", meaning: "Selamat datang / Sama-sama" },
  { word: "Handshake", ipa: "/ˈhændʃeɪk/", meaning: "Jabat tangan" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "You received a card to go to a party. It is an ___.",
    options: ['appointment', 'invitation', 'argument'],
    answer: 'invitation',
    explanation: "Invitation (undangan) memintamu untuk pergi ke suatu tempat."
  },
  {
    id: 2,
    question: "If you cannot go to the party, you must ___ the invitation.",
    options: ['refuse', 'accept', 'celebrate'],
    answer: 'refuse',
    explanation: "To refuse berarti menolak atau mengatakan tidak."
  },
  {
    id: 3,
    question: "The person who organizes the party is the ___.",
    options: ['Guest', 'Stranger', 'Host'],
    answer: 'Host',
    explanation: "Host (tuan rumah) mengundang para tamu."
  },
  {
    id: 4,
    question: "It is ___ to say 'Thank you'.",
    options: ['angry', 'polite', 'rude'],
    answer: 'polite',
    explanation: "Mengucapkan terima kasih adalah tata krama yang polite (sopan)."
  },
  {
    id: 5,
    question: "A romantic meeting between two people is a ___.",
    options: ['Funeral', 'Reunion', 'Date'],
    answer: 'Date',
    explanation: "Date (kencan) adalah pertemuan sosial atau romantis."
  },
  {
    id: 6,
    question: "You received a card to go to a party. It is an ___.",
    options: ["appointment","invitation","argument"],
    answer: "invitation",
    explanation: "Invitation (undangan) memintamu untuk pergi ke suatu tempat."
  },
  {
    id: 7,
    question: "If you cannot go to the party, you must ___ the invitation.",
    options: ["refuse", "accept", "celebrate"],
    answer: "refuse",
    explanation: "To refuse berarti menolak atau mengatakan tidak."
  },
  {
    id: 8,
    question: "The person who organizes the party is the ___.",
    options: ["Guest", "Stranger", "Host"],
    answer: "Host",
    explanation: "Host (tuan rumah) mengundang para tamu."
  },
  {
    id: 9,
    question: "It is ___ to say 'Thank you'.",
    options: ["angry", "polite", "rude"],
    answer: "polite",
    explanation: "Mengucapkan terima kasih adalah tata krama yang polite (sopan)."
  },
  {
    id: 10,
    question: "A romantic meeting between two individuals is a ___.",
    options: ["Reunion", "Funeral", "Date"],
    answer: "Date",
    explanation: "Date (kencan) adalah pertemuan sosial atau romantis."
  },
  {
    id: 11,
    question: "You received a card to go to a party. It is an ___.",
    options: ["appointment","invitation","argument"],
    answer: "invitation",
    explanation: "Invitation (undangan) memintamu untuk pergi ke suatu tempat."
  },
  {
    id: 12,
    question: "If you cannot go to the party, you must ___ the invitation.",
    options: ["refuse", "accept", "celebrate"],
    answer: "refuse",
    explanation: "To refuse berarti menolak atau mengatakan tidak."
  },
  {
    id: 13,
    question: "The person who organizes the party is the ___.",
    options: ["Guest", "Stranger", "Host"],
    answer: "Host",
    explanation: "Host (tuan rumah) mengundang para tamu."
  },
  {
    id: 14,
    question: "It is ___ to say 'Thank you'.",
    options: ["angry", "polite", "rude"],
    answer: "polite",
    explanation: "Mengucapkan terima kasih adalah tata krama yang polite (sopan)."
  },
  {
    id: 15,
    question: "A romantic meeting between two persons is a ___.",
    options: ["Date","Funeral","Reunion"],
    answer: "Date",
    explanation: "Date (kencan) adalah pertemuan sosial atau romantis."
  },
  {
    id: 16,
    question: "You received a card to go to a party. It is an ___.",
    options: ["appointment","invitation","argument"],
    answer: "invitation",
    explanation: "Invitation (undangan) memintamu untuk pergi ke suatu tempat."
  },
  {
    id: 17,
    question: "If you cannot go to the party, you must ___ the invitation.",
    options: ["refuse", "accept", "celebrate"],
    answer: "refuse",
    explanation: "To refuse berarti menolak atau mengatakan tidak."
  },
  {
    id: 18,
    question: "The person who organizes the party is the ___.",
    options: ["Guest", "Stranger", "Host"],
    answer: "Host",
    explanation: "Host (tuan rumah) mengundang para tamu."
  },
  {
    id: 19,
    question: "It is ___ to say 'Thank you'.",
    options: ["angry", "polite", "rude"],
    answer: "polite",
    explanation: "Mengucapkan terima kasih adalah tata krama yang polite (sopan)."
  },
  {
    id: 20,
    question: "A romantic meeting between two individuals is a ___.",
    options: ["Reunion", "Funeral", "Date"],
    answer: "Date",
    explanation: "Date (kencan) adalah pertemuan sosial atau romantis."
  }
];

const Lesson13: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_vocabulary', 13);
  const nextLessonPath = '/modul/english/elementary/vocabulary/lesson-14';
  const [vocabSection, setVocabSection] = useState<'events' | 'actions' | 'manners'>('events');

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

  const renderVocabList = (list: typeof EVENTS_VOCAB, colorClass: string, icon: any) => (
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
      lessonLabel={"Elementary Vocabulary Lesson 13"}
      accentColor={"#16A085"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Situasi Sosial"
            subtitle="Vocabulary • Pelajaran 13"
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
                  onClick={() => setVocabSection('events')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'events' ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Acara
                </button>
                <button
                  onClick={() => setVocabSection('actions')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'actions' ? 'bg-violet-100 text-violet-700 ring-2 ring-violet-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Aksi
                </button>
                <button
                  onClick={() => setVocabSection('manners')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'manners' ? 'bg-teal-100 text-[var(--color-primary)] ring-2 ring-teal-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Tata Krama
                </button>
              </div>

              {vocabSection === 'events' && (
                <>
                  <div className="bg-indigo-50 p-4 rounded-2xl mb-4 border border-indigo-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-indigo-500 shadow-[var(--shadow-card)]"><Sparkles size={20} /></div>
                    <div>
                      <h3 className="font-bold text-indigo-900 text-sm">Acara Sosial</h3>
                      <p className="text-xs text-indigo-700">Pertemuan dan acara khusus.</p>
                    </div>
                  </div>
                  {renderVocabList(EVENTS_VOCAB, 'indigo', Sparkles)}
                </>
              )}

              {vocabSection === 'actions' && (
                <>
                  <div className="bg-violet-50 p-4 rounded-2xl mb-4 border border-violet-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-violet-500 shadow-[var(--shadow-card)]"><TrendingUp className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-violet-900 text-sm">Aksi Sosial</h3>
                      <p className="text-xs text-violet-700">Kata kerja untuk berinteraksi dengan orang.</p>
                    </div>
                  </div>
                  {renderVocabList(ACTIONS_VOCAB, 'violet', TrendingUp)}
                </>
              )}

              {vocabSection === 'manners' && (
                <>
                  <div className="bg-gray-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-[var(--color-primary)] shadow-[var(--shadow-card)]"><Smile className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-teal-900 text-sm">Tata Krama</h3>
                      <p className="text-xs text-[var(--color-primary)]">Bersikap sopan dalam situasi sosial.</p>
                    </div>
                  </div>
                  {renderVocabList(MANNERS_VOCAB, 'teal', Smile)}
                </>
              )}

<div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb size={20} />
                  <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Membuat Undangan</h2>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Berikut adalah cara sopan untuk mengajak seseorang pergi ke suatu tempat bersamamu.
                </p>

                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <h3 className="font-bold text-indigo-800 mb-2">Would you like to...?</h3>
                    <p className="text-xs text-indigo-700 mb-2">Ini sopan dan umum digunakan.</p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-1">
                      <li>"<b>Would you like to</b> go to the cinema?"</li>
                      <li>"<b>Would you like to</b> come to my party?"</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-teal-800 mb-2">Do you want to...?</h3>
                    <p className="text-xs text-[var(--color-primary)] mb-2">Ini santai untuk teman.</p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-1">
                      <li>"<b>Do you want to</b> hang out?"</li>
                      <li>"<b>Do you want to</b> play football?"</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Merespons</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2"><CheckCircle2 size={16} /> Menerima</h3>
                    <ul className="text-sm text-[var(--color-text-primary)] space-y-1">
                      <li>"Yes, I'd love to."</li>
                      <li>"Sure, that sounds great."</li>
                      <li>"I'll be there!"</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                    <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2"><XCircle size={16} /> Menolak</h3>
                    <ul className="text-sm text-[var(--color-text-primary)] space-y-1">
                      <li>"I'm sorry, I can't."</li>
                      <li>"I'd love to, but I'm busy."</li>
                      <li>"Maybe next time."</li>
                    </ul>
                  </div>
                </div>
              </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-indigo-300 hover:bg-[var(--color-background)]";
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
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
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

export default Lesson13;
