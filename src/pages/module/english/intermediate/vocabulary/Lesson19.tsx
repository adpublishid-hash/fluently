import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const SCIENCE_TECH_VOCAB = [

  { word: "Hypothesis", ipa: "/haɪˈpɒθəsɪs/", meaning: "Hipotesis (Dugaan sementara)" },
  { word: "Innovation", ipa: "/ˌɪnəˈveɪʃən/", meaning: "Inovasi / Pembaruan" },
  { word: "Variable", ipa: "/ˈvɛəriəbəl/", meaning: "Variabel / Faktor yang berubah" },
  { word: "Genome", ipa: "/ˈdʒiːnoʊm/", meaning: "Genom (Informasi genetik)" },
  { word: "Quantum", ipa: "/ˈkwɒntəm/", meaning: "Kuantum (Satuan energi)" },
  { word: "Evolution", ipa: "/ˌɛvəˈluːʃən/", meaning: "Evolusi / Perkembangan" },
  { word: "Laboratory", ipa: "/ləˈbɒrətəri/", meaning: "Laboratorium" },
  { word: "Particle", ipa: "/ˈpɑːrtɪkəl/", meaning: "Partikel" },
  { word: "Gravity", ipa: "/ˈɡrævɪti/", meaning: "Gravitasi" },
  { word: "Theory", ipa: "/ˈθɪəri/", meaning: "Teori" },

];

const ARTS_LITERATURE_VOCAB = [

  { word: "Aesthetic", ipa: "/ɛsˈθɛtɪk/", meaning: "Estetika / Keindahan" },
  { word: "Metaphor", ipa: "/ˈmɛtəfɔːr/", meaning: "Metafora (Kiasan)" },
  { word: "Abstract", ipa: "/ˈæbstrækt/", meaning: "Abstrak (Tidak nyata/konkret)" },
  { word: "Genre", ipa: "/ˈʒɑːnrə/", meaning: "Genre / Aliran seni" },
  { word: "Narrative", ipa: "/ˈnærətɪv/", meaning: "Narasi / Cerita" },
  { word: "Composition", ipa: "/ˌkɒmpəˈzɪʃən/", meaning: "Komposisi / Susunan" },
  { word: "Perspective", ipa: "/pərˈspɛktɪv/", meaning: "Perspektif / Sudut pandang" },
  { word: "Symphony", ipa: "/ˈsɪmfəni/", meaning: "Simfoni (Musik)" },
  { word: "Sculpture", ipa: "/ˈskʌlptʃər/", meaning: "Patung" },
  { word: "Exhibition", ipa: "/ˌɛksɪˈbɪʃən/", meaning: "Pameran" },

];

const ECON_POLITICS_VOCAB = [

  { word: "Inflation", ipa: "/ɪnˈfleɪʃən/", meaning: "Inflasi (Kenaikan harga)" },
  { word: "Democracy", ipa: "/dɪˈmɒkrəsi/", meaning: "Demokrasi" },
  { word: "Legislation", ipa: "/ˌlɛdʒɪsˈleɪʃən/", meaning: "Legislasi / Perundang-undangan" },
  { word: "Diplomacy", ipa: "/dɪˈploʊməsi/", meaning: "Diplomasi" },
  { word: "Investment", ipa: "/ɪnˈvɛstmənt/", meaning: "Investasi" },
  { word: "Recession", ipa: "/rɪˈsɛʃən/", meaning: "Resesi (Kemerosotan ekonomi)" },
  { word: "Candidate", ipa: "/ˈkændɪdeɪt/", meaning: "Kandidat / Calon" },
  { word: "Policy", ipa: "/ˈpɒlɪsi/", meaning: "Kebijakan" },
  { word: "Currency", ipa: "/ˈkʌrənsi/", meaning: "Mata uang" },
  { word: "Revenue", ipa: "/ˈrɛvənjuː/", meaning: "Pendapatan / Pemasukan" },

];

const QUIZ_QUESTIONS = [

  { id: 1, question: "A period of temporary economic decline is called a ___.", options: ['Revenue', 'Inflation', 'Recession'], answer: 'Recession', explanation: "Recession (Resesi) adalah periode ketika ekonomi menyusut." },
  { id: 2, question: "In science, a ___ is an idea you test through experiments.", options: ['Hypothesis', 'Theory', 'Gravity'], answer: 'Hypothesis', explanation: "Hypothesis (Hipotesis) adalah penjelasan yang diusulkan berdasarkan bukti terbatas." },
  { id: 3, question: "Art that does not attempt to represent external reality is called ___.", options: ['Narrative', 'Aesthetic', 'Abstract'], answer: 'Abstract', explanation: "Seni abstrak menggunakan bentuk, warna, dan rupa daripada penggambaran realistis." },
  { id: 4, question: "The rise in prices over time is known as ___.", options: ['Investment', 'Inflation', 'Currency'], answer: 'Inflation', explanation: "Inflation (Inflasi) adalah tingkat kenaikan harga umum barang dan jasa." },
  { id: 5, question: "A figure of speech where a word is applied to an object literally not applicable is a ___.", options: ['Metaphor', 'Sculpture', 'Genre'], answer: 'Metaphor', explanation: "Contoh: 'Time is money' adalah metafora." },
  { id: 6, question: "The force that attracts objects toward the center of the Earth is ___.", options: ['Gravity', 'Particle', 'Quantum'], answer: 'Gravity', explanation: "Gravity (Gravitasi) adalah gaya tarik universal." },
  { id: 7, question: "A place where scientific research is conducted is a ___.", options: ['Exhibition', 'Legislation', 'Laboratory'], answer: 'Laboratory', explanation: "Laboratory (Laboratorium) adalah tempat untuk penelitian ilmiah." },
  { id: 8, question: "The principle that living things change over time is ___.", options: ['Innovation', 'Evolution', 'Revolution'], answer: 'Evolution', explanation: "Evolution (Evolusi) adalah perubahan bertahap spesies dari waktu ke waktu." },
  { id: 9, question: "Money put into a business to make profit is an ___.", options: ['Investment', 'Inflation', 'Revenue'], answer: 'Investment', explanation: "Investment (Investasi) adalah uang yang digunakan untuk menghasilkan keuntungan." },
  { id: 10, question: "A public display of art is called an ___.", options: ['Laboratory', 'Exhibition', 'Symphony'], answer: 'Exhibition', explanation: "Exhibition (Pameran) adalah tampilan publik karya seni atau barang." },
  { id: 11, question: "A large musical work for orchestra is a ___.", options: ['Sculpture', 'Metaphor', 'Symphony'], answer: 'Symphony', explanation: "Symphony (Simfoni) adalah komposisi orkestra yang panjang." },
  { id: 12, question: "The art of conducting international relations is ___.", options: ['Legislation', 'Democracy', 'Diplomacy'], answer: 'Diplomacy', explanation: "Diplomacy (Diplomasi) adalah manajemen hubungan internasional." },
  { id: 13, question: "A system of government by the whole population is ___.", options: ['Democracy', 'Legislation', 'Policy'], answer: 'Democracy', explanation: "Democracy (Demokrasi) adalah pemerintahan oleh rakyat." },
  { id: 14, question: "The appreciation of beauty is ___.", options: ['Aesthetic', 'Abstract', 'Genre'], answer: 'Aesthetic', explanation: "Aesthetic (Estetika) berhubungan dengan keindahan dan apresiasi seni." },
  { id: 15, question: "A category of artistic composition is a ___.", options: ['Genre', 'Narrative', 'Composition'], answer: 'Genre', explanation: "Genre adalah kategori karya seni berdasarkan gaya atau subject matter." },
  { id: 16, question: "The introduction of something new is ___.", options: ['Innovation', 'Variable', 'Evolution'], answer: 'Innovation', explanation: "Innovation (Inovasi) adalah penciptaan ide atau metode baru." },
  { id: 17, question: "A person running for political office is a ___.", options: ['Policy', 'Candidate', 'Currency'], answer: 'Candidate', explanation: "Candidate (Kandidat) adalah seseorang yang mencalonkan diri untuk jabatan." },
  { id: 18, question: "A well-substantiated explanation of nature is a ___.", options: ['Hypothesis', 'Theory', 'Variable'], answer: 'Theory', explanation: "Theory (Teori) adalah penjelasan yang didukung oleh banyak bukti." },
  { id: 19, question: "A three-dimensional work of art is a ___.", options: ['Narrative', 'Metaphor', 'Sculpture'], answer: 'Sculpture', explanation: "Sculpture (Patung) adalah seni tiga dimensi yang dibentuk atau dipahat." },
  { id: 20, question: "Laws passed by a government are ___.", options: ['Legislation', 'Policy', 'Diplomacy'], answer: 'Legislation', explanation: "Legislation (Legislasi) adalah hukum yang dibuat oleh badan legislatif." }

];

const InterVocabLesson19: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 19);
    const nextLessonPath = 19 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${19+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'science' | string>('science');

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
                lessonLabel={"Intermediate Vocabulary Lesson 19"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Perluasan Topik"
                subtitle="Vocabulary • Pelajaran 19"
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
                  onClick={() => setVocabSection('science')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'science' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Sains
                </button>

                <button
                  onClick={() => setVocabSection('arts')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'arts' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Seni
                </button>

                <button
                  onClick={() => setVocabSection('econ')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'econ' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Ekon/Pol
                </button>

              </div>
      
                                
              {vocabSection === 'science' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Sains & Teknologi</h3>
                      <p className="text-xs text-sky-700">Kosakata untuk penelitian dan penemuan.</p>
                    </div>
                  </div>
                  {renderVocabList(SCIENCE_TECH_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'arts' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Seni & Sastra</h3>
                      <p className="text-xs text-sky-700">Kreativitas, penulisan, dan ekspresi.</p>
                    </div>
                  </div>
                  {renderVocabList(ARTS_LITERATURE_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'econ' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Ekonomi & Politik</h3>
                      <p className="text-xs text-sky-700">Masyarakat, uang, dan pemerintahan.</p>
                    </div>
                  </div>
                  {renderVocabList(ECON_POLITICS_VOCAB, 'sky')}
                </div>
              )}

                                { /* Bonus: Penggunaan Kata & Kolokasi Section */ }
                                <div className="mt-10 animate-fade-in">
                                    
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-lg font-bold text-slate-800">Topik Lanjutan</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-2 text-sm uppercase">Akademik</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"The scientist proposed a new <b>hypothesis</b> about <b>gravity</b>."</p>
                    <p className="text-xs text-slate-500 mb-2">(Ilmuwan tersebut mengajukan <b>hipotesis</b> baru tentang <b>gravitasi</b>.)</p>
                    <p className="text-sm text-slate-700 italic">"The <b>evolution</b> of technology drives <b>innovation</b>."</p>
                    <p className="text-xs text-slate-500">(<b>Evolusi</b> teknologi mendorong <b>inovasi</b>.)</p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <h3 className="font-bold text-orange-800 mb-2 text-sm uppercase">Berita & Acara Terkini</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"High <b>inflation</b> is causing a global <b>recession</b>."</p>
                    <p className="text-xs text-slate-500 mb-2">(<b>Inflasi</b> yang tinggi menyebabkan <b>resesi</b> global.)</p>
                    <p className="text-sm text-slate-700 italic">"The government passed new <b>legislation</b> on trade."</p>
                    <p className="text-xs text-slate-500">(Pemerintah mengesahkan <b>undang-undang</b> baru tentang perdagangan.)</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-2xl p-5 border border-purple-100">
                <h3 className="font-bold text-purple-800 mb-2 text-sm uppercase tracking-wide">Mendeskripsikan Seni</h3>
                <div className="bg-white p-3 rounded-lg border border-purple-100/50">
                  <p className="text-sm text-slate-700">
                    "The painting has a unique <b>aesthetic</b>. It uses an <b>abstract</b> style to convey a deep <b>narrative</b>."
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    (Lukisan itu memiliki <b>estetika</b> yang unik. Ia menggunakan gaya <b>abstrak</b> untuk menyampaikan <b>narasi</b> yang mendalam.)
                  </p>
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

export default InterVocabLesson19;
