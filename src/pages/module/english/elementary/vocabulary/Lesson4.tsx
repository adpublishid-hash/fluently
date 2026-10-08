import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, User, ClipboardList, TrendingUp, Star } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

// 30 Words divided into 3 categories
const PROFESSIONS_VOCAB = [
  { word: "Doctor", ipa: "/ˈdɒktər/", meaning: "Dokter" },
  { word: "Nurse", ipa: "/nɜːrs/", meaning: "Perawat" },
  { word: "Teacher", ipa: "/ˈtiːtʃər/", meaning: "Guru" },
  { word: "Engineer", ipa: "/ˌɛndʒɪˈnɪər/", meaning: "Insinyur / Teknisi" },
  { word: "Lawyer", ipa: "/ˈlɔːjər/", meaning: "Pengacara" },
  { word: "Police Officer", ipa: "/pəˈliːs ˈɒfɪsər/", meaning: "Polisi" },
  { word: "Chef", ipa: "/ʃɛf/", meaning: "Koki" },
  { word: "Waiter", ipa: "/ˈweɪtər/", meaning: "Pelayan Pria" },
  { word: "Pilot", ipa: "/ˈpaɪlət/", meaning: "Pilot" },
  { word: "Dentist", ipa: "/ˈdɛntɪst/", meaning: "Dokter Gigi" },
];

const OFFICE_VOCAB = [
  { word: "Manager", ipa: "/ˈmænɪdʒər/", meaning: "Manajer" },
  { word: "Secretary", ipa: "/ˈsɛkrətri/", meaning: "Sekretaris" },
  { word: "Accountant", ipa: "/əˈkaʊntənt/", meaning: "Akuntan" },
  { word: "Receptionist", ipa: "/rɪˈsɛpʃənɪst/", meaning: "Resepsionis" },
  { word: "Colleague", ipa: "/ˈkɒliːɡ/", meaning: "Rekan Kerja" },
  { word: "Boss", ipa: "/bɒs/", meaning: "Bos / Atasan" },
  { word: "Employee", ipa: "/ɪmˈplɔɪiː/", meaning: "Karyawan" },
  { word: "Customer", ipa: "/ˈkʌstəmər/", meaning: "Pelanggan" },
  { word: "Office", ipa: "/ˈɒfɪs/", meaning: "Kantor" },
  { word: "Meeting", ipa: "/ˈmiːtɪŋ/", meaning: "Rapat" },
];

const EMPLOYMENT_VOCAB = [
  { word: "Salary", ipa: "/ˈsæləri/", meaning: "Gaji" },
  { word: "Resume / CV", ipa: "/ˈrɛzjʊmeɪ/", meaning: "Daftar Riwayat Hidup" },
  { word: "Interview", ipa: "/ˈɪntərvjuː/", meaning: "Wawancara" },
  { word: "Full-time", ipa: "/fʊl taɪm/", meaning: "Purna Waktu (Kerja Penuh)" },
  { word: "Part-time", ipa: "/pɑːrt taɪm/", meaning: "Paruh Waktu (Setengah Hari)" },
  { word: "Hired", ipa: "/ˈhaɪərd/", meaning: "Dipekerjakan / Diterima Kerja" },
  { word: "Fired", ipa: "/ˈfaɪərd/", meaning: "Dipecat" },
  { word: "Retired", ipa: "/rɪˈtaɪərd/", meaning: "Pensiun" },
  { word: "Promotion", ipa: "/prəˈmoʊʃən/", meaning: "Promosi / Kenaikan Jabatan" },
  { word: "Apply", ipa: "/əˈplaɪ/", meaning: "Melamar (Pekerjaan)" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "A person who designs buildings or machines is an ___.",
    options: ['Chef', 'Accountant', 'Engineer'],
    answer: 'Engineer',
    explanation: "Engineer (Insinyur) bekerja dengan desain, mesin, dan struktur."
  },
  {
    id: 2,
    question: "You need a ___ to apply for a job.",
    options: ['Menu', 'Resume', 'Receipt'],
    answer: 'Resume',
    explanation: "Resume (atau CV) mencantumkan keahlian dan pengalamanmu untuk pemberi kerja."
  },
  {
    id: 3,
    question: "If you work 40 hours a week, you work ___.",
    options: ['Retired', 'Part-time', 'Full-time'],
    answer: 'Full-time',
    explanation: "Full-time (Purna waktu) biasanya mengacu pada jam kerja standar (sekitar 35-40 jam/minggu)."
  },
  {
    id: 4,
    question: "The person you work with is your ___.",
    options: ['Patient', 'Customer', 'Colleague'],
    answer: 'Colleague',
    explanation: "Colleague adalah rekan kerja (co-worker)."
  },
  {
    id: 5,
    question: "He stopped working because he is 65. He is ___.",
    options: ['Fired', 'Hired', 'Retired'],
    answer: 'Retired',
    explanation: "Retirement (Pensiun) adalah saat kamu berhenti bekerja karena faktor usia."
  },
  {
    id: 6,
    question: "A person who designs buildings or machines is an ___.",
    options: ["Chef", "Accountant", "Engineer"],
    answer: "Engineer",
    explanation: "Engineer (Insinyur) bekerja dengan desain, mesin, dan struktur."
  },
  {
    id: 7,
    question: "You need a ___ to apply for a job.",
    options: ["Menu","Resume","Receipt"],
    answer: "Resume",
    explanation: "Resume (atau CV) mencantumkan keahlian dan pengalamanmu untuk pemberi kerja."
  },
  {
    id: 8,
    question: "If you work 40 hours a week, you work ___.",
    options: ["Retired", "Part-time", "Full-time"],
    answer: "Full-time",
    explanation: "Full-time (Purna waktu) biasanya mengacu pada jam kerja standar (sekitar 35-40 jam/minggu)."
  },
  {
    id: 9,
    question: "The person you job with is your ___.",
    options: ["Patient", "Customer", "Colleague"],
    answer: "Colleague",
    explanation: "Colleague adalah rekan kerja (co-worker)."
  },
  {
    id: 10,
    question: "My friend stopped working because he is 65. My friend is ___.",
    options: ["Fired","Hired","Retired"],
    answer: "Retired",
    explanation: "Retirement (Pensiun) adalah saat kamu berhenti bekerja karena faktor usia."
  },
  {
    id: 11,
    question: "A person who designs buildings or machines is an ___.",
    options: ["Chef", "Accountant", "Engineer"],
    answer: "Engineer",
    explanation: "Engineer (Insinyur) bekerja dengan desain, mesin, dan struktur."
  },
  {
    id: 12,
    question: "You need a ___ to apply for a job.",
    options: ["Menu","Resume","Receipt"],
    answer: "Resume",
    explanation: "Resume (atau CV) mencantumkan keahlian dan pengalamanmu untuk pemberi kerja."
  },
  {
    id: 13,
    question: "If you work 40 hours a week, you work ___.",
    options: ["Retired", "Part-time", "Full-time"],
    answer: "Full-time",
    explanation: "Full-time (Purna waktu) biasanya mengacu pada jam kerja standar (sekitar 35-40 jam/minggu)."
  },
  {
    id: 14,
    question: "The person you work with is your ___.",
    options: ["Patient", "Customer", "Colleague"],
    answer: "Colleague",
    explanation: "Colleague adalah rekan kerja (co-worker)."
  },
  {
    id: 15,
    question: "My brother stopped working because he is 65. My brother is ___.",
    options: ["Fired","Hired","Retired"],
    answer: "Retired",
    explanation: "Retirement (Pensiun) adalah saat kamu berhenti bekerja karena faktor usia."
  },
  {
    id: 16,
    question: "A person who designs buildings or machines is an ___.",
    options: ["Chef", "Accountant", "Engineer"],
    answer: "Engineer",
    explanation: "Engineer (Insinyur) bekerja dengan desain, mesin, dan struktur."
  },
  {
    id: 17,
    question: "You need a ___ to apply for a job.",
    options: ["Menu","Resume","Receipt"],
    answer: "Resume",
    explanation: "Resume (atau CV) mencantumkan keahlian dan pengalamanmu untuk pemberi kerja."
  },
  {
    id: 18,
    question: "If you job 40 hours a week, you job ___.",
    options: ["Full-time", "Part-time", "Retired"],
    answer: "Full-time",
    explanation: "Full-time (Purna waktu) biasanya mengacu pada jam kerja standar (sekitar 35-40 jam/minggu)."
  },
  {
    id: 19,
    question: "The person you building with is your ___.",
    options: ["Customer", "Patient", "Colleague"],
    answer: "Colleague",
    explanation: "Colleague adalah rekan kerja (co-worker)."
  },
  {
    id: 20,
    question: "The man stopped working because he is 65. The man is ___.",
    options: ["Retired", "Hired", "Fired"],
    answer: "Retired",
    explanation: "Retirement (Pensiun) adalah saat kamu berhenti bekerja karena faktor usia."
  }
];

const Lesson4: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_vocabulary', 4);
  const nextLessonPath = '/modul/english/elementary/vocabulary/lesson-5';
  const [vocabSection, setVocabSection] = useState<'professions' | 'office' | 'employment'>('professions');

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

  const renderVocabList = (list: typeof PROFESSIONS_VOCAB, colorClass: string, icon: any) => (
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
      lessonLabel={"Elementary Vocabulary Lesson 4"}
      accentColor={"#16A085"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Pekerjaan & Tempat Kerja"
            subtitle="Vocabulary • Pelajaran 4"
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
                  onClick={() => setVocabSection('professions')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'professions' ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Profesi
                </button>
                <button
                  onClick={() => setVocabSection('office')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'office' ? 'bg-teal-100 text-[var(--color-primary)] ring-2 ring-teal-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Kehidupan Kantor
                </button>
                <button
                  onClick={() => setVocabSection('employment')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'employment' ? 'bg-rose-100 text-rose-700 ring-2 ring-rose-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Ketenagakerjaan
                </button>
              </div>

              {vocabSection === 'professions' && (
                <>
                  <div className="bg-indigo-50 p-4 rounded-2xl mb-4 border border-indigo-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-indigo-500 shadow-[var(--shadow-card)]"><User className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-indigo-900 text-sm">Profesi Umum</h3>
                      <p className="text-xs text-indigo-700">Pekerjaan yang dilakukan orang setiap hari.</p>
                    </div>
                  </div>
                  {renderVocabList(PROFESSIONS_VOCAB, 'indigo', User)}
                </>
              )}

              {vocabSection === 'office' && (
                <>
                  <div className="bg-gray-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-[var(--color-primary)] shadow-[var(--shadow-card)]"><ClipboardList className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-teal-900 text-sm">Kehidupan Kantor</h3>
                      <p className="text-xs text-[var(--color-primary)]">Orang dan benda di tempat kerja.</p>
                    </div>
                  </div>
                  {renderVocabList(OFFICE_VOCAB, 'teal', ClipboardList)}
                </>
              )}

              {vocabSection === 'employment' && (
                <>
                  <div className="bg-rose-50 p-4 rounded-2xl mb-4 border border-rose-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-rose-500 shadow-[var(--shadow-card)]"><TrendingUp className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-rose-900 text-sm">Istilah Ketenagakerjaan</h3>
                      <p className="text-xs text-rose-700">Kata-kata tentang mendapatkan dan melakukan pekerjaan.</p>
                    </div>
                  </div>
                  {renderVocabList(EMPLOYMENT_VOCAB, 'rose', TrendingUp)}
                </>
              )}

<div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb size={20} />
                  <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Berbicara Tentang Pekerjaan</h2>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Berikut adalah cara paling umum untuk bertanya dan menjawab tentang pekerjaan.
                </p>

                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <h3 className="font-bold text-indigo-800 mb-2">Bertanya: "What do you do?"</h3>
                    <p className="text-xs text-indigo-700 mb-2">Ini berarti "Apa pekerjaanmu?", bukan apa yang sedang kamu lakukan sekarang.</p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-1">
                      <li>A: What do you do?</li>
                      <li>B: I am a teacher.</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-teal-800 mb-2">Preposisi: As, For, In</h3>
                    <ul className="space-y-2 text-sm text-[var(--color-text-primary)]">
                      <li><b>As:</b> I work <b>as</b> a manager. (Peran)</li>
                      <li><b>For:</b> I work <b>for</b> Google. (Perusahaan)</li>
                      <li><b>In:</b> I work <b>in</b> a hospital. (Tempat)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
                <h3 className="font-bold text-rose-800 mb-2 text-sm uppercase tracking-wide">Kesalahan Umum</h3>
                <div className="bg-white p-3 rounded-lg border border-rose-100/50">
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Jangan katakan:</p>
                  <p className="text-sm font-medium text-red-500 line-through">My job is teacher.</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-2 mb-1">Katakan:</p>
                  <p className="text-sm font-bold text-green-600">I am a teacher.</p>
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

export default Lesson4;
