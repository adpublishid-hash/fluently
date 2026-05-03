import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Trophy, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const ONLINE_VOCAB = [

  { word: "Algorithm", ipa: "/ˈælɡəˌrɪðəm/", meaning: "Algoritma (Sistem rekomendasi)" },
  { word: "Viral", ipa: "/ˈvaɪrəl/", meaning: "Viral (Menyebar cepat)" },
  { word: "Influencer", ipa: "/ˈɪnfluənsər/", meaning: "Pemberi pengaruh (di medsos)" },
  { word: "Platform", ipa: "/ˈplætfɔːrm/", meaning: "Platform / Wadah digital" },
  { word: "Engagement", ipa: "/ɪnˈɡeɪdʒmənt/", meaning: "Interaksi (Like, Comment, Share)" },
  { word: "Subscription", ipa: "/səbˈskrɪpʃən/", meaning: "Langganan" },
  { word: "Notification", ipa: "/ˌnoʊtɪfɪˈkeɪʃən/", meaning: "Pemberitahuan" },
  { word: "Content", ipa: "/ˈkɒntɛnt/", meaning: "Konten / Isi" },
  { word: "Trending", ipa: "/ˈtrɛndɪŋ/", meaning: "Sedang tren / Populer" },
  { word: "Stream", ipa: "/striːm/", meaning: "Siaran langsung / Mengalirkan data" },

];

const SOFTWARE_HARDWARE_VOCAB = [

  { word: "Interface", ipa: "/ˈɪntərfeɪs/", meaning: "Antarmuka (Tampilan)" },
  { word: "Glitch", ipa: "/ɡlɪtʃ/", meaning: "Gangguan teknis tiba-tiba" },
  { word: "Compatible", ipa: "/kəmˈpætəbəl/", meaning: "Kompatibel / Cocok" },
  { word: "Wireless", ipa: "/ˈwaɪərlɪs/", meaning: "Nirkabel (Tanpa kabel)" },
  { word: "Browser", ipa: "/ˈbraʊzər/", meaning: "Peramban web" },
  { word: "Operating System", ipa: "/ˈɒpəreɪtɪŋ ˈsɪstəm/", meaning: "Sistem Operasi (OS)" },
  { word: "Update", ipa: "/ʌpˈdeɪt/", meaning: "Pembaruan" },
  { word: "Device", ipa: "/dɪˈvaɪs/", meaning: "Perangkat / Gawai" },
  { word: "Network", ipa: "/ˈnɛtwɜːrk/", meaning: "Jaringan" },
  { word: "Database", ipa: "/ˈdeɪtəˌbeɪs/", meaning: "Basis data" },

];

const SECURITY_INNOVATION_VOCAB = [

  { word: "Artificial Intelligence", ipa: "/ˌɑːrtɪˈfɪʃəl ɪnˈtɛlɪdʒəns/", meaning: "Kecerdasan Buatan (AI)" },
  { word: "Encryption", ipa: "/ɪnˈkrɪpʃən/", meaning: "Enkripsi (Pengacakan data)" },
  { word: "Privacy", ipa: "/ˈpraɪvəsi/", meaning: "Privasi" },
  { word: "Malware", ipa: "/ˈmælweər/", meaning: "Perangkat lunak berbahaya (Virus)" },
  { word: "Hacker", ipa: "/ˈhækər/", meaning: "Peretas" },
  { word: "Backup", ipa: "/ˈbækʌp/", meaning: "Cadangan data" },
  { word: "Cyberbullying", ipa: "/ˈsaɪbərˌbʊliɪŋ/", meaning: "Perundungan dunia maya" },
  { word: "Virtual Reality", ipa: "/ˈvɜːrtʃuəl riˈæləti/", meaning: "Realitas Maya (VR)" },
  { word: "Authentication", ipa: "/ɔːˌθɛntɪˈkeɪʃən/", meaning: "Otentikasi / Verifikasi" },
  { word: "Innovation", ipa: "/ˌɪnəˈveɪʃən/", meaning: "Inovasi" },

];

const QUIZ_QUESTIONS = [

  {
    id: 1,
    question: "A video that becomes very popular very quickly is going ___.",
    options: ['viral', 'glitch', 'wireless'],
    answer: 'viral',
    explanation: "Viral (Viral) berarti menyebar dengan cepat melalui internet."
  },
  {
    id: 2,
    question: "You should always ___ your important files to a hard drive.",
    options: ['hack', 'backup', 'stream'],
    answer: 'backup',
    explanation: "To backup (Mencadangkan) berarti membuat salinan data jika yang asli hilang."
  },
  {
    id: 3,
    question: "This software uses ___ to learn from user behavior.",
    options: ['Artificial Intelligence', 'Malware', 'Browser'],
    answer: 'Artificial Intelligence',
    explanation: "AI (Kecerdasan Buatan) mengacu pada sistem komputer yang dapat melakukan tugas yang membutuhkan kecerdasan manusia."
  },
  {
    id: 4,
    question: "My phone has a ___; the screen keeps freezing.",
    options: ['subscription', 'glitch', 'network'],
    answer: 'glitch',
    explanation: "Glitch (Gangguan) adalah kerusakan mendadak, biasanya sementara."
  },
  {
    id: 5,
    question: "You need to update your ___ to the latest version.",
    options: ['Operating System', 'Cyberbullying', 'Influencer'],
    answer: 'Operating System',
    explanation: "Operating System (seperti Windows, iOS) perlu pembaruan agar berjalan lancar."
  },
  {
    id: 6,
    question: "The ___ determines what posts you see on social media.",
    options: ['algorithm', 'interface', 'device'],
    answer: 'algorithm',
    explanation: "Algorithm (Algoritma) adalah set aturan yang digunakan komputer untuk membuat keputusan tentang konten yang ditampilkan."
  },
  {
    id: 7,
    question: "Many young people want to become social media ___.",
    options: ['browsers', 'influencers', 'glitches'],
    answer: 'influencers',
    explanation: "Influencers (Pemberi pengaruh) adalah orang yang memiliki kekuatan untuk mempengaruhi keputusan pembelian orang lain."
  },
  {
    id: 8,
    question: "I pay a monthly ___ to watch movies on this ___.",
    options: ['subscription, platform', 'encryption, device', 'notification, browser'],
    answer: 'subscription, platform',
    explanation: "Subscription (Langganan) adalah pembayaran berkala untuk layanan di Platform (Wadah digital)."
  },
  {
    id: 9,
    question: "___ uses ___ to protect your personal information.",
    options: ['The database, encryption', 'The influencer, malware', 'The glitch, wireless'],
    answer: 'The database, encryption',
    explanation: "Database (Basis data) menggunakan Encryption (Enkripsi) untuk mengamankan informasi."
  },
  {
    id: 10,
    question: "This app is not ___ with older phones.",
    options: ['trending', 'compatible', 'viral'],
    answer: 'compatible',
    explanation: "Compatible (Kompatibel) berarti dapat bekerja dengan baik dengan sistem lain."
  },
  {
    id: 11,
    question: "I received a ___ that someone liked my photo.",
    options: ['hacker', 'notification', 'database'],
    answer: 'notification',
    explanation: "Notification (Pemberitahuan) adalah pesan yang memberi tahu Anda tentang aktivitas."
  },
  {
    id: 12,
    question: "The ___ was friendly and easy to navigate.",
    options: ['interface', 'malware', 'privacy'],
    answer: 'interface',
    explanation: "Interface (Antarmuka) adalah cara pengguna berinteraksi dengan software atau hardware."
  },
  {
    id: 13,
    question: "A ___ stole credit card information from the website.",
    options: ['browser', 'hacker', 'platform'],
    answer: 'hacker',
    explanation: "Hacker (Peretas) adalah seseorang yang mengakses sistem komputer secara ilegal."
  },
  {
    id: 14,
    question: "___ is a serious problem for children online.",
    options: ['Cyberbullying', 'Streaming', 'Authentication'],
    answer: 'Cyberbullying',
    explanation: "Cyberbullying (Perundungan dunia maya) adalah intimidasi yang terjadi melalui platform digital."
  },
  {
    id: 15,
    question: "My internet connection is ___, so I don't need cables.",
    options: ['wireless', 'viral', 'trending'],
    answer: 'wireless',
    explanation: "Wireless (Nirkabel) berarti tidak memerlukan kabel fisik untuk koneksi."
  },
  {
    id: 16,
    question: "That topic is ___ right now; everyone is talking about it.",
    options: ['trending', 'encrypted', 'compatible'],
    answer: 'trending',
    explanation: "Trending (Sedang tren) berarti sangat populer saat ini."
  },
  {
    id: 17,
    question: "He uses ___ to watch live gaming videos.",
    options: ['malware', 'stream', 'innovation'],
    answer: 'stream',
    explanation: "To stream (Menyiarkan/Menonton siaran langsung) berarti menonton atau mengirim video secara real-time."
  },
  {
    id: 18,
    question: "___ technology creates immersive gaming experiences.",
    options: ['Viral', 'Virtual Reality', 'Trending'],
    answer: 'Virtual Reality',
    explanation: "Virtual Reality (Realitas Maya) menciptakan lingkungan simulasi 3D yang dapat dijelajahi."
  },
  {
    id: 19,
    question: "Use two-factor ___ to secure your account.",
    options: ['engagement', 'authentication', 'content'],
    answer: 'authentication',
    explanation: "Authentication (Otentikasi) adalah proses memverifikasi identitas pengguna."
  },
  {
    id: 20,
    question: "The company is known for its technological ___.",
    options: ['glitch', 'innovation', 'malware'],
    answer: 'innovation',
    explanation: "Innovation (Inovasi) adalah pengenalan ide, metode, atau produk baru."
  }

];

const InterVocabLesson3: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 3);
    const nextLessonPath = 3 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${3+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'online' | string>('online');

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
                lessonLabel={"Intermediate Vocabulary Lesson 3"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Teknologi & Kehidupan Digital"
                subtitle="Vocabulary • Pelajaran 3"
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
                  onClick={() => setVocabSection('online')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'online' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Kehidupan Online
                </button>

                <button
                  onClick={() => setVocabSection('tech')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'tech' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Teknologi
                </button>

                <button
                  onClick={() => setVocabSection('security')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'security' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Keamanan
                </button>

              </div>
      
                                
              {vocabSection === 'online' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Internet & Media Sosial</h3>
                      <p className="text-xs text-sky-700">Kosakata untuk dunia digital.</p>
                    </div>
                  </div>
                  {renderVocabList(ONLINE_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'tech' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Perangkat Keras & Lunak</h3>
                      <p className="text-xs text-sky-700">Istilah teknologi dan alat.</p>
                    </div>
                  </div>
                  {renderVocabList(SOFTWARE_HARDWARE_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'security' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Keamanan & Inovasi</h3>
                      <p className="text-xs text-sky-700">Keamanan dan teknologi masa depan.</p>
                    </div>
                  </div>
                  {renderVocabList(SECURITY_INNOVATION_VOCAB, 'sky')}
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
                    <h3 className="font-bold text-blue-800 mb-2 text-sm uppercase">Media Sosial</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"The algorithm shows me content I like."</p>
                    <p className="text-xs text-slate-500 mb-2">(Algoritma menunjukkan konten yang saya sukai.)</p>
                    <p className="text-sm text-slate-700 italic">"Her video went viral and she gained many subscribers."</p>
                    <p className="text-xs text-slate-500">(Videonya menjadi viral dan dia mendapatkan banyak pelanggan.)</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-green-800 mb-2 text-sm uppercase">Keamanan</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"Enable two-factor authentication for better privacy."</p>
                    <p className="text-xs text-slate-500 mb-2">(Aktifkan otentikasi dua faktor untuk privasi yang lebih baik.)</p>
                    <p className="text-sm text-slate-700 italic">"My computer was infected with malware."</p>
                    <p className="text-xs text-slate-500">(Komputer saya terinfeksi perangkat lunak berbahaya.)</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2 text-sm uppercase tracking-wide">Kolokasi Teknologi</h3>
                <div className="bg-white p-3 rounded-lg border border-indigo-100/50">
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <b>Post</b> content (Mengunggah konten)</li>
                    <li>• <b>Install</b> an update (Menginstal pembaruan)</li>
                    <li>• <b>Secure</b> a connection (Mengamankan koneksi)</li>
                    <li>• <b>Browse</b> the internet (Menjelajah internet)</li>
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

export default InterVocabLesson3;
