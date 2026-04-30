import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, ClipboardList, TrendingUp, Star } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

// 30 Words divided into 3 categories
const PLACES_PEOPLE_VOCAB = [
  { word: "University", ipa: "/ˌjuːnɪˈvɜːrsɪti/", meaning: "Universitas" },
  { word: "College", ipa: "/ˈkɒlɪdʒ/", meaning: "Perguruan Tinggi / Kuliah" },
  { word: "Library", ipa: "/ˈlaɪbrəri/", meaning: "Perpustakaan" },
  { word: "Classroom", ipa: "/ˈklɑːsruːm/", meaning: "Ruang kelas" },
  { word: "Laboratory", ipa: "/ləˈbɒrətəri/", meaning: "Laboratorium" },
  { word: "Campus", ipa: "/ˈkæmpəs/", meaning: "Kampus" },
  { word: "Principal", ipa: "/ˈprɪnsəpəl/", meaning: "Kepala sekolah" },
  { word: "Professor", ipa: "/prəˈfɛsər/", meaning: "Profesor / Dosen" },
  { word: "Classmate", ipa: "/ˈklæsmeɪt/", meaning: "Teman sekelas" },
  { word: "Graduate", ipa: "/ˈɡrædʒuət/", meaning: "Lulusan / Wisudawan" },
];

const ACADEMIC_VOCAB = [
  { word: "Subject", ipa: "/ˈsʌbdʒɪkt/", meaning: "Mata pelajaran" },
  { word: "Lesson", ipa: "/ˈlɛsən/", meaning: "Pelajaran" },
  { word: "Schedule", ipa: "/ˈʃɛdjuːl/", meaning: "Jadwal" },
  { word: "Homework", ipa: "/ˈhoʊmwɜːrk/", meaning: "Pekerjaan rumah (PR)" },
  { word: "Exam", ipa: "/ɪɡˈzæm/", meaning: "Ujian" },
  { word: "Grade", ipa: "/ɡreɪd/", meaning: "Nilai / Tingkat kelas" },
  { word: "Degree", ipa: "/dɪˈɡriː/", meaning: "Gelar (Sarjana, dll)" },
  { word: "Certificate", ipa: "/sərˈtɪfɪkət/", meaning: "Sertifikat / Ijazah" },
  { word: "Project", ipa: "/ˈprɒdʒɛkt/", meaning: "Proyek / Tugas besar" },
  { word: "Scholarship", ipa: "/ˈskɒlərʃɪp/", meaning: "Beasiswa" },
];

const STUDY_VERBS_VOCAB = [
  { word: "Study", ipa: "/ˈstʌdi/", meaning: "Belajar (secara akademis)" },
  { word: "Learn", ipa: "/lɜːrn/", meaning: "Mempelajari / Mendapat ilmu" },
  { word: "Teach", ipa: "/tiːtʃ/", meaning: "Mengajar" },
  { word: "Memorize", ipa: "/ˈmɛməraɪz/", meaning: "Menghafal" },
  { word: "Practice", ipa: "/ˈpræktɪs/", meaning: "Berlatih" },
  { word: "Pass", ipa: "/pɑːs/", meaning: "Lulus (ujian)" },
  { word: "Fail", ipa: "/feɪl/", meaning: "Gagal (ujian)" },
  { word: "Research", ipa: "/rɪˈsɜːrtʃ/", meaning: "Meneliti / Riset" },
  { word: "Revise", ipa: "/rɪˈvaɪz/", meaning: "Mengulang / Merevisi" },
  { word: "Improve", ipa: "/ɪmˈpruːv/", meaning: "Meningkatkan" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "You go to the ___ to borrow books.",
    options: ['Laboratory', 'Library', 'Classroom'],
    answer: 'Library',
    explanation: "Library (Perpustakaan) adalah tempat buku disimpan untuk dibaca atau dipinjam."
  },
  {
    id: 2,
    question: "If you get a good score, you ___ the exam.",
    options: ['fail', 'pass', 'miss'],
    answer: 'pass',
    explanation: "To pass (lulus) berarti berhasil dalam tes atau ujian."
  },
  {
    id: 3,
    question: "A person who teaches at a university is a ___.",
    options: ['Student', 'Principal', 'Professor'],
    answer: 'Professor',
    explanation: "Professor adalah pengajar tingkat tinggi di perguruan tinggi atau universitas."
  },
  {
    id: 4,
    question: "Math, Science, and History are ___.",
    options: ['Subjects', 'Grades', 'Projects'],
    answer: 'Subjects',
    explanation: "Subjects (Mata pelajaran) adalah topik yang kamu pelajari di sekolah."
  },
  {
    id: 5,
    question: "When you finish university, you ___.",
    options: ['fail', 'graduate', 'start'],
    answer: 'graduate',
    explanation: "Graduate (Lulus/Wisuda) berarti berhasil menyelesaikan gelar atau kursus."
  },
  {
    id: 6,
    question: "You go to the ___ to borrow books.",
    options: ["Laboratory","Library","Classroom"],
    answer: "Library",
    explanation: "Library (Perpustakaan) adalah tempat buku disimpan untuk dibaca atau dipinjam."
  },
  {
    id: 7,
    question: "If you get a good score, you ___ the exam.",
    options: ["fail","pass","miss"],
    answer: "pass",
    explanation: "To pass (lulus) berarti berhasil dalam tes atau ujian."
  },
  {
    id: 8,
    question: "A person who teaches at a university is a ___.",
    options: ["Student","Principal","Professor"],
    answer: "Professor",
    explanation: "Professor adalah pengajar tingkat tinggi di perguruan tinggi atau universitas."
  },
  {
    id: 9,
    question: "Math, Science, and History are ___.",
    options: ["Subjects","Grades","Projects"],
    answer: "Subjects",
    explanation: "Subjects (Mata pelajaran) adalah topik yang kamu pelajari di sekolah."
  },
  {
    id: 10,
    question: "When you finish university, you ___.",
    options: ["fail","graduate","start"],
    answer: "graduate",
    explanation: "Graduate (Lulus/Wisuda) berarti berhasil menyelesaikan gelar atau kursus."
  },
  {
    id: 11,
    question: "You go to the ___ to borrow books.",
    options: ["Laboratory","Library","Classroom"],
    answer: "Library",
    explanation: "Library (Perpustakaan) adalah tempat buku disimpan untuk dibaca atau dipinjam."
  },
  {
    id: 12,
    question: "If you get a good score, you ___ the exam.",
    options: ["fail","pass","miss"],
    answer: "pass",
    explanation: "To pass (lulus) berarti berhasil dalam tes atau ujian."
  },
  {
    id: 13,
    question: "A person who teaches at a university is a ___.",
    options: ["Student","Principal","Professor"],
    answer: "Professor",
    explanation: "Professor adalah pengajar tingkat tinggi di perguruan tinggi atau universitas."
  },
  {
    id: 14,
    question: "Math, Science, and History are ___.",
    options: ["Subjects","Grades","Projects"],
    answer: "Subjects",
    explanation: "Subjects (Mata pelajaran) adalah topik yang kamu pelajari di sekolah."
  },
  {
    id: 15,
    question: "When you finish university, you ___.",
    options: ["fail","graduate","start"],
    answer: "graduate",
    explanation: "Graduate (Lulus/Wisuda) berarti berhasil menyelesaikan gelar atau kursus."
  },
  {
    id: 16,
    question: "You go to the ___ to borrow books.",
    options: ["Laboratory","Library","Classroom"],
    answer: "Library",
    explanation: "Library (Perpustakaan) adalah tempat buku disimpan untuk dibaca atau dipinjam."
  },
  {
    id: 17,
    question: "If you get a good score, you ___ the exam.",
    options: ["fail","pass","miss"],
    answer: "pass",
    explanation: "To pass (lulus) berarti berhasil dalam tes atau ujian."
  },
  {
    id: 18,
    question: "A person who teaches at a university is a ___.",
    options: ["Student","Principal","Professor"],
    answer: "Professor",
    explanation: "Professor adalah pengajar tingkat tinggi di perguruan tinggi atau universitas."
  },
  {
    id: 19,
    question: "Math, Science, and History are ___.",
    options: ["Subjects","Grades","Projects"],
    answer: "Subjects",
    explanation: "Subjects (Mata pelajaran) adalah topik yang kamu pelajari di sekolah."
  },
  {
    id: 20,
    question: "When you finish university, you ___.",
    options: ["fail","graduate","start"],
    answer: "graduate",
    explanation: "Graduate (Lulus/Wisuda) berarti berhasil menyelesaikan gelar atau kursus."
  }
];

const Lesson5: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_vocabulary', 5);
  const nextLessonPath = '/modul/english/elementary/vocabulary/lesson-6';
  const [vocabSection, setVocabSection] = useState<'places' | 'academic' | 'verbs'>('places');

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

  const renderVocabList = (list: typeof PLACES_PEOPLE_VOCAB, colorClass: string, icon: any) => (
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
          <TrendingUp className={`w-5 h-5 text-slate-300 group-hover:text-${colorClass}-500`} />
        </button>
      ))}
    </div>
  );

  return (
        <>
          <LessonCompleteModal
      show={showCompleteModal}
      onClose={() => setShowCompleteModal(false)}
      lessonLabel={"Elementary Vocabulary Lesson 5"}
      accentColor={"#16A085"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Pendidikan & Pembelajaran"
            subtitle="Vocabulary • Pelajaran 5"
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
                  onClick={() => setVocabSection('places')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'places' ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Tempat & Orang
                </button>
                <button
                  onClick={() => setVocabSection('academic')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'academic' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Kehidupan Akademik
                </button>
                <button
                  onClick={() => setVocabSection('verbs')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'verbs' ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Kata Kerja Belajar
                </button>
              </div>

              {vocabSection === 'places' && (
                <>
                  <div className="bg-indigo-50 p-4 rounded-2xl mb-4 border border-indigo-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-indigo-500 shadow-[var(--shadow-card)]"><BookOpen size={20} /></div>
                    <div>
                      <h3 className="font-bold text-indigo-900 text-sm">Tempat & Orang</h3>
                      <p className="text-xs text-indigo-700">Kata-kata penting untuk lingkungan sekolah.</p>
                    </div>
                  </div>
                  {renderVocabList(PLACES_PEOPLE_VOCAB, 'indigo', BookOpen)}
                </>
              )}

              {vocabSection === 'academic' && (
                <>
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]"><ClipboardList className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Kehidupan Akademik</h3>
                      <p className="text-xs text-sky-700">Istilah terkait kursus dan evaluasi.</p>
                    </div>
                  </div>
                  {renderVocabList(ACADEMIC_VOCAB, 'sky', ClipboardList)}
                </>
              )}

              {vocabSection === 'verbs' && (
                <>
                  <div className="bg-amber-50 p-4 rounded-2xl mb-4 border border-amber-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-amber-500 shadow-[var(--shadow-card)]"><TrendingUp className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-amber-900 text-sm">Kata Kerja Belajar</h3>
                      <p className="text-xs text-amber-700">Kata kerja tindakan untuk belajar.</p>
                    </div>
                  </div>
                  {renderVocabList(STUDY_VERBS_VOCAB, 'amber', TrendingUp)}
                </>
              )}

<div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb size={20} />
                  <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Frasa Ruang Kelas</h2>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Berikut adalah frasa yang berguna untuk digunakan di kelas bahasa Inggris atau saat meminta bantuan.
                </p>

                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <h3 className="font-bold text-indigo-800 mb-2">Meminta Penjelasan</h3>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-2">
                      <li>"What does [word] mean?"</li>
                      <li>"How do you spell [word]?"</li>
                      <li>"Can you repeat that, please?"</li>
                      <li>"I don't understand."</li>
                    </ul>
                  </div>

                  <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-sky-800 mb-2">Meminta Izin</h3>
                    <ul className="space-y-2 text-sm text-[var(--color-text-primary)]">
                      <li><b>Can I...?</b> (Santai) - "Can I borrow a pen?"</li>
                      <li><b>May I...?</b> (Formal) - "May I ask a question?"</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
                <h3 className="font-bold text-rose-800 mb-2 text-sm uppercase tracking-wide">Tips Belajar</h3>
                <div className="bg-white p-3 rounded-lg border border-rose-100/50">
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Untuk meningkatkan kosakatamu:</p>
                  <p className="text-sm font-bold text-rose-600">Baca buku, dengarkan podcast, dan gunakan kartu memori (flashcards).</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-2">Practice makes perfect!</p>
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

export default Lesson5;
