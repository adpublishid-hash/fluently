import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Trophy, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const ACADEMIC_VOCAB = [

  { word: "Scholarship", ipa: "/ˈskɒlərʃɪp/", meaning: "Beasiswa" },
  { word: "Semester", ipa: "/sɪˈmɛstər/", meaning: "Semester" },
  { word: "Lecture", ipa: "/ˈlɛktʃər/", meaning: "Kuliah / Ceramah dosen" },
  { word: "Thesis", ipa: "/ˈθiːsɪs/", meaning: "Tesis / Skripsi" },
  { word: "Tuition", ipa: "/tuˈɪʃən/", meaning: "Biaya kuliah/sekolah" },
  { word: "Campus", ipa: "/ˈkæmpəs/", meaning: "Lingkungan kampus" },
  { word: "Faculty", ipa: "/ˈfækəlti/", meaning: "Fakultas / Staf pengajar" },
  { word: "Enroll", ipa: "/ɪnˈroʊl/", meaning: "Mendaftar (sekolah/kursus)" },
  { word: "Assignment", ipa: "/əˈsaɪnmənt/", meaning: "Tugas" },
  { word: "Curriculum", ipa: "/kəˈrɪkjʊləm/", meaning: "Kurikulum" },

];

const JOB_HUNTING_VOCAB = [

  { word: "Resume", ipa: "/ˈrɛzjʊmeɪ/", meaning: "Daftar riwayat hidup (CV)" },
  { word: "Vacancy", ipa: "/ˈveɪkənsi/", meaning: "Lowongan pekerjaan" },
  { word: "Applicant", ipa: "/ˈæplɪkənt/", meaning: "Pelamar" },
  { word: "Interview", ipa: "/ˈɪntərvjuː/", meaning: "Wawancara" },
  { word: "Qualification", ipa: "/ˌkwɒlɪfɪˈkeɪʃən/", meaning: "Kualifikasi / Syarat keahlian" },
  { word: "Reference", ipa: "/ˈrɛfrəns/", meaning: "Referensi (Rekomendasi kerja)" },
  { word: "Recruit", ipa: "/rɪˈkruːt/", meaning: "Merekrut / Mempekerjakan" },
  { word: "Candidate", ipa: "/ˈkændɪdeɪt/", meaning: "Kandidat / Calon" },
  { word: "Internship", ipa: "/ˈɪntɜːrnʃɪp/", meaning: "Magang" },
  { word: "Experience", ipa: "/ɪkˈspɪəriəns/", meaning: "Pengalaman" },

];

const PROFESSIONAL_VOCAB = [

  { word: "Resignation", ipa: "/ˌrɛzɪɡˈneɪʃən/", meaning: "Pengunduran diri" },
  { word: "Salary", ipa: "/ˈsæləri/", meaning: "Gaji" },
  { word: "Bonus", ipa: "/ˈboʊnəs/", meaning: "Bonus / Insentif" },
  { word: "Deadline", ipa: "/ˈdɛdlaɪn/", meaning: "Tenggat waktu" },
  { word: "Colleague", ipa: "/ˈkɒliːɡ/", meaning: "Rekan kerja" },
  { word: "Negotiate", ipa: "/nɪˈɡoʊʃieɪt/", meaning: "Bernegosiasi" },
  { word: "Manage", ipa: "/ˈmænɪdʒ/", meaning: "Mengelola / Mengatur" },
  { word: "Organize", ipa: "/ˈɔːrɡənaɪz/", meaning: "Mengorganisir" },
  { word: "Network", ipa: "/ˈnɛtwɜːrk/", meaning: "Jejaring / Koneksi kerja" },
  { word: "Retire", ipa: "/rɪˈtaɪər/", meaning: "Pensiun" },

];

const QUIZ_QUESTIONS = [

  {
    id: 1,
    question: "You need to pay your ___ to attend the university.",
    options: ['Scholarship', 'Tuition', 'Salary'],
    answer: 'Tuition',
    explanation: "Tuition (Biaya kuliah) adalah uang yang Anda bayarkan untuk diajar di perguruan tinggi atau universitas."
  },
  {
    id: 2,
    question: "Before getting a job, you usually have to send a ___.",
    options: ['Resume', 'Thesis', 'Deadline'],
    answer: 'Resume',
    explanation: "Resume (atau CV) adalah dokumen yang menjelaskan riwayat pendidikan dan pekerjaan Anda."
  },
  {
    id: 3,
    question: "A short period of work, often unpaid, to gain experience is an ___.",
    options: ['Internship', 'Enrollment', 'Interview'],
    answer: 'Internship',
    explanation: "Internship (Magang) memberikan pengalaman praktis kepada siswa atau lulusan baru."
  },
  {
    id: 4,
    question: "The professor gave a very interesting ___ today.",
    options: ['Faculty', 'Lecture', 'Vacancy'],
    answer: 'Lecture',
    explanation: "Lecture (Kuliah) adalah ceramah pendidikan yang diberikan kepada siswa oleh seorang profesor."
  },
  {
    id: 5,
    question: "We must finish this project before the ___.",
    options: ['Deadline', 'Bonus', 'Candidate'],
    answer: 'Deadline',
    explanation: "Deadline (Tenggat waktu) adalah waktu atau tanggal terakhir di mana sesuatu harus diselesaikan."
  },
  {
    id: 6,
    question: "The company is trying to ___ new employees.",
    options: ['retire', 'recruit', 'resign'],
    answer: 'recruit',
    explanation: "To recruit (Merekrut) berarti mencari dan mempekerjakan orang baru untuk bekerja."
  },
  {
    id: 7,
    question: "She won a ___ to study at Harvard.",
    options: ['salary', 'scholarship', 'reference'],
    answer: 'scholarship',
    explanation: "Scholarship (Beasiswa) adalah bantuan keuangan untuk pendidikan."
  },
  {
    id: 8,
    question: "The ___ of the university includes many experienced professors.",
    options: ['campus', 'faculty', 'semester'],
    answer: 'faculty',
    explanation: "Faculty (Fakultas/Staf pengajar) merujuk pada kelompok pengajar di institusi pendidikan."
  },
  {
    id: 9,
    question: "There is a job ___ for a marketing manager.",
    options: ['vacancy', 'thesis', 'curriculum'],
    answer: 'vacancy',
    explanation: "Vacancy (Lowongan) adalah posisi pekerjaan yang tersedia dan belum diisi."
  },
  {
    id: 10,
    question: "He submitted his ___ for the PhD program.",
    options: ['assignment', 'thesis', 'bonus'],
    answer: 'thesis',
    explanation: "Thesis (Tesis/Skripsi) adalah karya tulis penelitian untuk gelar akademis."
  },
  {
    id: 11,
    question: "I need to ___ in the course before next Monday.",
    options: ['enroll', 'resign', 'negotiate'],
    answer: 'enroll',
    explanation: "To enroll (Mendaftar) berarti mendaftarkan diri untuk program atau kursus."
  },
  {
    id: 12,
    question: "The ___ for this position requires a master's degree.",
    options: ['applicant', 'qualification', 'colleague'],
    answer: 'qualification',
    explanation: "Qualification (Kualifikasi) adalah kemampuan, pengalaman, atau pendidikan yang diperlukan."
  },
  {
    id: 13,
    question: "My ___ at work are very friendly and helpful.",
    options: ['colleagues', 'candidates', 'applicants'],
    answer: 'colleagues',
    explanation: "Colleagues (Rekan kerja) adalah orang-orang yang bekerja dengan Anda."
  },
  {
    id: 14,
    question: "He can ___ his salary with the new employer.",
    options: ['manage', 'negotiate', 'organize'],
    answer: 'negotiate',
    explanation: "To negotiate (Bernegosiasi) berarti berdiskusi untuk mencapai kesepakatan."
  },
  {
    id: 15,
    question: "She handed in her ___ letter after accepting another job.",
    options: ['reference', 'resignation', 'interview'],
    answer: 'resignation',
    explanation: "Resignation (Pengunduran diri) adalah tindakan formal meninggalkan pekerjaan."
  },
  {
    id: 16,
    question: "The ___ covers all subjects taught in the school year.",
    options: ['curriculum', 'campus', 'semester'],
    answer: 'curriculum',
    explanation: "Curriculum (Kurikulum) adalah rencana mata pelajaran dan konten yang diajarkan."
  },
  {
    id: 17,
    question: "The ___ was very nervous before the job ___.",
    options: ['applicant, interview', 'colleague, deadline', 'faculty, campus'],
    answer: 'applicant, interview',
    explanation: "Applicant (Pelamar) adalah orang yang melamar pekerjaan, Interview (Wawancara) adalah pertemuan formal."
  },
  {
    id: 18,
    question: "He will ___ next year after 30 years of service.",
    options: ['enroll', 'retire', 'recruit'],
    answer: 'retire',
    explanation: "To retire (Pensiun) berarti berhenti bekerja karena sudah mencapai usia tertentu."
  },
  {
    id: 19,
    question: "Everyone received a year-end ___ for good performance.",
    options: ['salary', 'bonus', 'tuition'],
    answer: 'bonus',
    explanation: "Bonus adalah uang tambahan yang diberikan sebagai penghargaan atas kinerja baik."
  },
  {
    id: 20,
    question: "The teacher gave us a challenging ___ to complete.",
    options: ['assignment', 'reference', 'network'],
    answer: 'assignment',
    explanation: "Assignment (Tugas) adalah pekerjaan yang diberikan kepada siswa untuk dikerjakan."
  }

];

const InterVocabLesson2: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 2);
    const nextLessonPath = 2 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${2+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'academic' | string>('academic');

    // Quiz State
    const [quizStep, setQuizStep] = useState(0);
    const [quizScore, setQuizScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);

    // Audio Handler
    const playSound = (text: string) => { playAudio(text, 0.9); };

    // Quiz Handlers
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

    const renderVocabList = (list: any[], colorClass: string) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                lessonLabel={"Intermediate Vocabulary Lesson 2"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Pendidikan & Karir"
                subtitle="Vocabulary • Pelajaran 2"
                accentColor="#2980B9"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
                    { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }
                ]}
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
                {(tabId) => {
                    if (tabId === 'learn') {
                        return (
                            <div className="space-y-8 animate-fade-in">
                                
              <div className="flex flex-wrap justify-center gap-2 mb-6">

                <button
                  onClick={() => setVocabSection('academic')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'academic' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Akademik
                </button>

                <button
                  onClick={() => setVocabSection('hunting')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'hunting' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Lamar Kerja
                </button>

                <button
                  onClick={() => setVocabSection('pro')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'pro' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Profesional
                </button>

              </div>
      
                                
              {vocabSection === 'academic' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Universitas & Sekolah</h3>
                      <p className="text-xs text-sky-700">Kosakata untuk dunia akademis.</p>
                    </div>
                  </div>
                  {renderVocabList(ACADEMIC_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'hunting' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Mendapatkan Pekerjaan</h3>
                      <p className="text-xs text-sky-700">Kata-kata yang digunakan saat melamar kerja.</p>
                    </div>
                  </div>
                  {renderVocabList(JOB_HUNTING_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'pro' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Pertumbuhan Profesional</h3>
                      <p className="text-xs text-sky-700">Istilah tempat kerja dan kemajuan karir.</p>
                    </div>
                  </div>
                  {renderVocabList(PROFESSIONAL_VOCAB, 'sky')}
                </div>
              )}

                                { /* Bonus: Penggunaan Kata & Kolokasi Section */ }
                                <div className="mt-10 animate-fade-in">
                                    
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-lg font-bold text-slate-800">Penggunaan Kontekstual</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-2 text-sm uppercase">Di Universitas</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"I need to finish my <b>thesis</b> before the <b>deadline</b>."</p>
                    <p className="text-xs text-slate-500 mb-2">(Saya harus menyelesaikan <b>tesis</b> saya sebelum <b>tenggat waktu</b>.)</p>
                    <p className="text-sm text-slate-700 italic">"She received a full <b>scholarship</b> to study abroad."</p>
                    <p className="text-xs text-slate-500">(Dia menerima <b>beasiswa</b> penuh untuk belajar di luar negeri.)</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-green-800 mb-2 text-sm uppercase">Di Tempat Kerja</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"We are looking for a <b>candidate</b> with five years of <b>experience</b>."</p>
                    <p className="text-xs text-slate-500 mb-2">(Kami mencari <b>kandidat</b> dengan lima tahun <b>pengalaman</b>.)</p>
                    <p className="text-sm text-slate-700 italic">"He is hoping for a <b>promotion</b> and a higher <b>salary</b>."</p>
                    <p className="text-xs text-slate-500">(Dia berharap untuk <b>kenaikan pangkat</b> dan <b>gaji</b> yang lebih tinggi.)</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
                <h3 className="font-bold text-rose-800 mb-2 text-sm uppercase tracking-wide">Kolokasi Umum</h3>
                <div className="bg-white p-3 rounded-lg border border-rose-100/50">
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <b>Apply for</b> a job (Melamar pekerjaan)</li>
                    <li>• <b>Meet</b> a deadline (Menyelesaikan tepat waktu)</li>
                    <li>• <b>Enroll in</b> a course (Mendaftar kursus)</li>
                    <li>• <b>Attend</b> an interview (Menghadiri wawancara)</li>
                  </ul>
                </div>
              </div>
            
                                </div>
                            </div>
                        );
                    }
                    if (tabId === 'practice') {
                        return (
                            <div className="animate-fade-in">
                                <div className="max-w-xl mx-auto">
                                    {!showResult ? (
                                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100">
                                            <div className="flex justify-between items-center mb-6">
                                                <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                                                <span className="text-xs font-bold bg-sky-50 text-sky-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                                            </div>

                                            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                                                {QUIZ_QUESTIONS[quizStep].question}
                                            </h3>

                                            <div className="space-y-3">
                                                {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                                                    let btnClass = "border-[var(--color-border)] hover:border-sky-300 hover:bg-[var(--color-background)]";
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
                                                className="px-8 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-200"
                                            >
                                                Coba Lagi
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    }
                    return null;
                }}
            </LessonShell>
        </>
    );
};

export default InterVocabLesson2;
