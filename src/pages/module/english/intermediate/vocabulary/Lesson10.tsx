import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const BUSINESS_CONCEPTS_VOCAB = [

  { word: "Company", ipa: "/ˈkʌmpəni/", meaning: "Perusahaan" },
  { word: "Industry", ipa: "/ˈɪndəstri/", meaning: "Industri" },
  { word: "Market", ipa: "/ˈmɑːrkɪt/", meaning: "Pasar" },
  { word: "Product", ipa: "/ˈprɒdʌkt/", meaning: "Produk" },
  { word: "Service", ipa: "/ˈsɜːrvɪs/", meaning: "Layanan / Jasa" },
  { word: "Profit", ipa: "/ˈprɒfɪt/", meaning: "Keuntungan / Laba" },
  { word: "Loss", ipa: "/lɒs/", meaning: "Kerugian" },
  { word: "Brand", ipa: "/brænd/", meaning: "Merek" },
  { word: "Strategy", ipa: "/ˈstrætədʒi/", meaning: "Strategi" },
  { word: "Competition", ipa: "/ˌkɒmpəˈtɪʃən/", meaning: "Persaingan / Kompetisi" },

];

const MONEY_FINANCE_VOCAB = [

  { word: "Budget", ipa: "/ˈbʌdʒɪt/", meaning: "Anggaran" },
  { word: "Income", ipa: "/ˈɪnkʌm/", meaning: "Pendapatan" },
  { word: "Expense", ipa: "/ɪkˈspɛns/", meaning: "Pengeluaran" },
  { word: "Debt", ipa: "/dɛt/", meaning: "Utang" },
  { word: "Loan", ipa: "/loʊn/", meaning: "Pinjaman" },
  { word: "Tax", ipa: "/tæks/", meaning: "Pajak" },
  { word: "Investment", ipa: "/ɪnˈvɛstmənt/", meaning: "Investasi" },
  { word: "Salary", ipa: "/ˈsæləri/", meaning: "Gaji" },
  { word: "Currency", ipa: "/ˈkʌrənsi/", meaning: "Mata uang" },
  { word: "Account", ipa: "/əˈkaʊnt/", meaning: "Rekening / Akun" },

];

const WORKPLACE_VOCAB = [

  { word: "Employer", ipa: "/ɪmˈplɔɪər/", meaning: "Pemberi kerja (Majikan)" },
  { word: "Employee", ipa: "/ɪmˈplɔɪiː/", meaning: "Karyawan" },
  { word: "Client", ipa: "/ˈklaɪənt/", meaning: "Klien" },
  { word: "Colleague", ipa: "/ˈkɒliːɡ/", meaning: "Rekan kerja" },
  { word: "Manager", ipa: "/ˈmænɪdʒər/", meaning: "Manajer" },
  { word: "Meeting", ipa: "/ˈmiːtɪŋ/", meaning: "Rapat" },
  { word: "Deadline", ipa: "/ˈdɛdlaɪn/", meaning: "Tenggat waktu" },
  { word: "Contract", ipa: "/ˈkɒntrækt/", meaning: "Kontrak" },
  { word: "Project", ipa: "/ˈprɒdʒɛkt/", meaning: "Proyek" },
  { word: "Department", ipa: "/dɪˈpɑːrtmənt/", meaning: "Departemen / Bagian" },

];

const QUIZ_QUESTIONS = [

  { id: 1, question: "Money that you borrow from a bank is a ___.", options: ['Profit', 'Loan', 'Tax'], answer: 'Loan', explanation: "Loan (Pinjaman) adalah sejumlah uang yang diharapkan akan dibayarkan kembali dengan bunga." },
  { id: 2, question: "A plan for how to spend your money is a ___.", options: ['Budget', 'Debt', 'Loss'], answer: 'Budget', explanation: "Budget (Anggaran) adalah perkiraan pendapatan dan pengeluaran untuk jangka waktu tertentu." },
  { id: 3, question: "If a company makes more money than it spends, it makes a ___.", options: ['Loss', 'Debt', 'Profit'], answer: 'Profit', explanation: "Profit (Keuntungan) adalah keuntungan finansial dari aktivitas bisnis." },
  { id: 4, question: "The date by which you must finish a task is the ___.", options: ['Meeting', 'Deadline', 'Strategy'], answer: 'Deadline', explanation: "Deadline (Tenggat waktu) adalah waktu atau tanggal terakhir di mana sesuatu harus diselesaikan." },
  { id: 5, question: "A person who buys services from a professional is a ___.", options: ['Employee', 'Client', 'Manager'], answer: 'Client', explanation: "Client (Klien) melibatkan nasihat atau layanan profesional dari orang lain." },
  { id: 6, question: "A business organization is called a ___.", options: ['company', 'salary', 'expense'], answer: 'company', explanation: "Company (Perusahaan) adalah organisasi komersial yang menjual barang atau jasa." },
  { id: 7, question: "The place where goods are bought and sold is the ___.", options: ['industry', 'market', 'brand'], answer: 'market', explanation: "Market (Pasar) adalah area atau arena tempat pertukaran komersial berlangsung." },
  { id: 8, question: "Money you earn from work is your ___.", options: ['debt', 'income', 'expense'], answer: 'income', explanation: "Income (Pendapatan) adalah uang yang diterima untuk pekerjaan atau investasi." },
  { id: 9, question: "Money you spend is an ___.", options: ['income', 'expense', 'investment'], answer: 'expense', explanation: "Expense (Pengeluaran) adalah biaya yang diperlukan untuk sesuatu." },
  { id: 10, question: "Money you owe is ___.", options: ['profit', 'debt', 'salary'], answer: 'debt', explanation: "Debt (Utang) adalah sesuatu, biasanya uang, yang terutang." },
  { id: 11, question: "Money paid regularly for work is a ___.", options: ['tax', 'salary', 'loan'], answer: 'salary', explanation: "Salary (Gaji) adalah pembayaran tetap yang diterima untuk pekerjaan secara teratur." },
  { id: 12, question: "Money paid to the government is ___.", options: ['profit', 'tax', 'brand'], answer: 'tax', explanation: "Tax (Pajak) adalah kontribusi wajib kepada penerimaan negara." },
  { id: 13, question: "Putting money into something to make a profit is ___.", options: ['expense', 'investment', 'loss'], answer: 'investment', explanation: "Investment (Investasi) adalah tindakan menempatkan uang dengan harapan keuntungan finansial." },
  { id: 14, question: "The person who gives you a job is your ___.", options: ['employee', 'employer', 'colleague'], answer: 'employer', explanation: "Employer (Pemberi kerja) adalah orang atau organisasi yang mempekerjakan orang." },
  { id: 15, question: "A person who works for a company is an ___.", options: ['employer', 'employee', 'client'], answer: 'employee', explanation: "Employee (Karyawan) adalah orang yang dipekerjakan untuk gaji atau upah." },
  { id: 16, question: "A formal gathering for discussion is a ___.", options: ['deadline', 'meeting', 'contract'], answer: 'meeting', explanation: "Meeting (Rapat) adalah pertemuan orang untuk diskusi." },
  { id: 17, question: "A written agreement between parties is a ___.", options: ['strategy', 'contract', 'project'], answer: 'contract', explanation: "Contract (Kontrak) adalah perjanjian formal yang sah mengikat." },
  { id: 18, question: "People you work with are your ___.", options: ['clients', 'colleagues', 'managers'], answer: 'colleagues', explanation: "Colleagues (Rekan kerja) adalah orang yang bekerja dengan Anda di organisasi yang sama." },
  { id: 19, question: "A planned piece of work is a ___.", options: ['meeting', 'project', 'budget'], answer: 'project', explanation: "Project (Proyek) adalah perusahaan yang direncanakan secara individual atau kolaboratif." },
  { id: 20, question: "A recognizable name for a product is a ___.", options: ['market', 'brand', 'industry'], answer: 'brand', explanation: "Brand (Merek) adalah nama, istilah, atau simbol yang membedakan produk dari yang lain." }

];

const InterVocabLesson10: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 10);
    const nextLessonPath = 10 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${10+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'business' | string>('business');

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
                lessonLabel={"Intermediate Vocabulary Lesson 10"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Bisnis & Keuangan"
                subtitle="Vocabulary • Pelajaran 10"
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
                  onClick={() => setVocabSection('business')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'business' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Bisnis
                </button>

                <button
                  onClick={() => setVocabSection('money')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'money' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Keuangan
                </button>

                <button
                  onClick={() => setVocabSection('work')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'work' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Tempat Kerja
                </button>

              </div>
      
                                
              {vocabSection === 'business' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Dasar-dasar Bisnis</h3>
                      <p className="text-xs text-sky-700">Istilah bisnis umum.</p>
                    </div>
                  </div>
                  {renderVocabList(BUSINESS_CONCEPTS_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'money' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Uang & Keuangan</h3>
                      <p className="text-xs text-sky-700">Mengelola dana.</p>
                    </div>
                  </div>
                  {renderVocabList(MONEY_FINANCE_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'work' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Tempat Kerja</h3>
                      <p className="text-xs text-sky-700">Pekerjaan dan interaksi.</p>
                    </div>
                  </div>
                  {renderVocabList(WORKPLACE_VOCAB, 'sky')}
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
                    <h3 className="font-bold text-blue-800 mb-2 text-sm uppercase">Di Kantor</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"We have a <b>deadline</b> for the new <b>project</b> on Friday."</p>
                    <p className="text-xs text-slate-500 mb-2">(Kami memiliki <b>tenggat waktu</b> untuk <b>proyek</b> baru pada hari Jumat.)</p>
                    <p className="text-sm text-slate-700 italic">"The <b>manager</b> called a <b>meeting</b> with all <b>employees</b>."</p>
                    <p className="text-xs text-slate-500">(<b>Manajer</b> mengadakan <b>rapat</b> dengan semua <b>karyawan</b>.)</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-green-800 mb-2 text-sm uppercase">Masalah Uang</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"The company made a huge <b>profit</b> this year."</p>
                    <p className="text-xs text-slate-500 mb-2">(Perusahaan mendapat <b>keuntungan</b> besar tahun ini.)</p>
                    <p className="text-sm text-slate-700 italic">"I need to pay off my <b>debt</b> before making an <b>investment</b>."</p>
                    <p className="text-xs text-slate-500">(Saya perlu melunasi <b>utang</b> saya sebelum melakukan <b>investasi</b>.)</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2 text-sm uppercase tracking-wide">Kolokasi Umum</h3>
                <div className="bg-white p-3 rounded-lg border border-indigo-100/50">
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <b>Sign</b> a contract (Menandatangani kontrak)</li>
                    <li>• <b>Make</b> a profit/loss (Mendapat untung/rugi)</li>
                    <li>• <b>Stick to</b> a budget (Mengikuti anggaran)</li>
                    <li>• <b>Pay</b> taxes (Membayar pajak)</li>
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

export default InterVocabLesson10;
