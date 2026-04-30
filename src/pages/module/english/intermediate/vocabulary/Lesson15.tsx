import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Trophy, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const ACADEMIC_VERBS = [

  { word: "Analyze", ipa: "/ˈænəlaɪz/", meaning: "Menganalisis / Menelaah" },
  { word: "Evaluate", ipa: "/ɪˈvæljueɪt/", meaning: "Mengevaluasi / Menilai" },
  { word: "Establish", ipa: "/ɪˈstæblɪʃ/", meaning: "Mendirikan / Menetapkan (fakta)" },
  { word: "Indicate", ipa: "/ˈɪndɪkeɪt/", meaning: "Menunjukkan / Mengindikasikan" },
  { word: "Demonstrate", ipa: "/ˈdɛmənstreɪt/", meaning: "Memperlihatkan / Membuktikan" },
  { word: "Investigate", ipa: "/ɪnˈvɛstɪɡeɪt/", meaning: "Menyelidiki" },
  { word: "Require", ipa: "/rɪˈkwaɪər/", meaning: "Memerlukan / Mewajibkan" },
  { word: "Identify", ipa: "/aɪˈdɛntɪfaɪ/", meaning: "Mengidentifikasi / Mengenali" },
  { word: "Illustrate", ipa: "/ˈɪləstreɪt/", meaning: "Mengilustrasikan / Menjelaskan" },
  { word: "Assume", ipa: "/əˈsjuːm/", meaning: "Beramsumsi / Menduga" },

];

const ABSTRACT_NOUNS = [

  { word: "Hypothesis", ipa: "/haɪˈpɒθəsɪs/", meaning: "Hipotesis / Dugaan sementara" },
  { word: "Methodology", ipa: "/ˌmɛθəˈdɒlədʒi/", meaning: "Metodologi / Cara kerja" },
  { word: "Evidence", ipa: "/ˈɛvɪdəns/", meaning: "Bukti / Fakta" },
  { word: "Context", ipa: "/ˈkɒntɛkst/", meaning: "Konteks / Latar belakang" },
  { word: "Conclusion", ipa: "/kənˈkluːʒən/", meaning: "Kesimpulan" },
  { word: "Component", ipa: "/kəmˈpoʊnənt/", meaning: "Komponen / Bagian" },
  { word: "Perspective", ipa: "/pərˈspɛktɪv/", meaning: "Perspektif / Sudut pandang" },
  { word: "Strategy", ipa: "/ˈstrætədʒi/", meaning: "Strategi" },
  { word: "Significance", ipa: "/sɪɡˈnɪfɪkəns/", meaning: "Signifikansi / Pentingnya" },
  { word: "Principle", ipa: "/ˈprɪnsəpəl/", meaning: "Prinsip / Asas" },

];

const CONNECTORS_QUALIFIERS = [

  { word: "Consequently", ipa: "/ˈkɒnsɪkwəntli/", meaning: "Akibatnya / Oleh karena itu" },
  { word: "Furthermore", ipa: "/ˌfɜːrdərˈmɔːr/", meaning: "Selanjutnya / Tambahan lagi" },
  { word: "Nevertheless", ipa: "/ˌnɛvəðəˈlɛs/", meaning: "Namun demikian / Meskipun begitu" },
  { word: "Significant", ipa: "/sɪɡˈnɪfɪkənt/", meaning: "Signifikan / Penting" },
  { word: "Relevant", ipa: "/ˈrɛləvənt/", meaning: "Relevan / Terkait" },
  { word: "Appropriate", ipa: "/əˈproʊpriət/", meaning: "Tepat / Pantas" },
  { word: "Specific", ipa: "/spəˈsɪfɪk/", meaning: "Spesifik / Khusus" },
  { word: "Sufficient", ipa: "/səˈfɪʃənt/", meaning: "Cukup / Memadai" },
  { word: "Approximately", ipa: "/əˈprɒksɪmətli/", meaning: "Kira-kira / Kurang lebih" },
  { word: "Initially", ipa: "/ɪˈnɪʃəli/", meaning: "Pada awalnya / Mulanya" },

];

const QUIZ_QUESTIONS = [

  { id: 1, question: "We need to ___ the data to understand the problem.", options: ['illustrate', 'analyze', 'assume'], answer: 'analyze', explanation: "Analyze (Menganalisis) berarti memeriksa sesuatu secara rinci." },
  { id: 2, question: "There is no scientific ___ to support this theory.", options: ['evidence', 'context', 'component'], answer: 'evidence', explanation: "Evidence (Bukti) merujuk pada fakta atau informasi yang menunjukkan apakah sesuatu itu benar." },
  { id: 3, question: "It rained all day; ___, the game was canceled.", options: ['furthermore', 'initially', 'consequently'], answer: 'consequently', explanation: "Consequently (Akibatnya) menghubungkan sebab (hujan) dengan akibat (pembatalan)." },
  { id: 4, question: "This discovery is very ___ for the medical field.", options: ['significant', 'approximate', 'sufficient'], answer: 'significant', explanation: "Significant (Signifikan) berarti cukup besar atau penting." },
  { id: 5, question: "The teacher used a diagram to ___ how the engine works.", options: ['require', 'demonstrate', 'evaluate'], answer: 'demonstrate', explanation: "Demonstrate (Mendemonstrasikan) berarti menunjukkan dengan jelas bagaimana sesuatu bekerja." },
  { id: 6, question: "The scientist will ___ different factors in the experiment.", options: ['identify', 'assume', 'require'], answer: 'identify', explanation: "Identify (Mengidentifikasi) berarti mengenali atau menemukan sesuatu." },
  { id: 7, question: "We need to ___ whether this method is effective.", options: ['illustrate', 'evaluate', 'assume'], answer: 'evaluate', explanation: "Evaluate (Mengevaluasi) berarti menilai nilai atau kualitas sesuatu." },
  { id: 8, question: "The research will ___ the impact of pollution.", options: ['illustrate', 'investigate', 'assume'], answer: 'investigate', explanation: "Investigate (Menyelidiki) berarti memeriksa sesuatu secara sistematis." },
  { id: 9, question: "The results ___ a clear pattern.", options: ['require', 'indicate', 'assume'], answer: 'indicate', explanation: "Indicate (Menunjukkan) berarti menandakan atau menyarankan sesuatu." },
  { id: 10, question: "Our ___ is that prices will rise.", options: ['principle', 'hypothesis', 'component'], answer: 'hypothesis', explanation: "Hypothesis (Hipotesis) adalah dugaan yang perlu diuji." },
  { id: 11, question: "The study follows a strict ___.", options: ['context', 'methodology', 'perspective'], answer: 'methodology', explanation: "Methodology (Metodologi) adalah sistem metode yang digunakan dalam studi." },
  { id: 12, question: "Based on the findings, we can draw a ___.", options: ['hypothesis', 'conclusion', 'component'], answer: 'conclusion', explanation: "Conclusion (Kesimpulan) adalah penilaian akhir berdasarkan penalaran." },
  { id: 13, question: "Understanding the historical ___ is important.", options: ['component', 'context', 'principle'], answer: 'context', explanation: "Context (Konteks) adalah situasi atau latar belakang sesuatu." },
  { id: 14, question: "Safety is one of the main ___ of the design.", options: ['principles', 'hypotheses', 'components'], answer: 'principles', explanation: "Principle (Prinsip) adalah aturan atau keyakinan fundamental." },
  { id: 15, question: "The law ___ all citizens to pay taxes.", options: ['illustrates', 'requires', 'evaluates'], answer: 'requires', explanation: "Require (Mewajibkan) berarti memerlukanatau mengharuskan sesuatu." },
  { id: 16, question: "___, the project was successful.", options: ['Consequently', 'Nevertheless', 'Initially'], answer: 'Nevertheless', explanation: "Nevertheless (Namun demikian) digunakan untuk menunjukkan kontras." },
  { id: 17, question: "The amount is ___ 50 dollars.", options: ['significantly', 'approximately', 'sufficiently'], answer: 'approximately', explanation: "Approximately (Kira-kira) berarti hampir tetapi tidak persis." },
  { id: 18, question: "This information is not ___ to the discussion.", options: ['significant', 'relevant', 'sufficient'], answer: 'relevant', explanation: "Relevant (Relevan) berarti berkaitan erat dengan topik." },
  { id: 19, question: "The research ___ a new connection between diet and health.", options: ['established', 'assumed', 'illustrated'], answer: 'established', explanation: "Establish (Menetapkan) berarti menunjukkan atau membuktikan sesuatu." },
  { id: 20, question: "___, we need to gather more data.", options: ['Consequently', 'Furthermore', 'Nevertheless'], answer: 'Furthermore', explanation: "Furthermore (Selanjutnya) digunakan untuk menambahkan informasi." }

];

const InterVocabLesson15: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 15);
    const nextLessonPath = 15 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${15+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'verbs' | string>('verbs');

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
                lessonLabel={"Intermediate Vocabulary Lesson 15"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Akademik & Formal"
                subtitle="Vocabulary • Pelajaran 15"
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
                  onClick={() => setVocabSection('verbs')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'verbs' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Kata Kerja Tindakan
                </button>

                <button
                  onClick={() => setVocabSection('nouns')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'nouns' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Konsep Kunci
                </button>

                <button
                  onClick={() => setVocabSection('connectors')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'connectors' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Transisi
                </button>

              </div>
      
                                
              {vocabSection === 'verbs' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Tindakan Akademis</h3>
                      <p className="text-xs text-sky-700">Kata kerja untuk penelitian dan penulisan.</p>
                    </div>
                  </div>
                  {renderVocabList(ACADEMIC_VERBS, 'sky')}
                </div>
              )}

              {vocabSection === 'nouns' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Konsep Abstrak</h3>
                      <p className="text-xs text-sky-700">Gagasan dan struktur.</p>
                    </div>
                  </div>
                  {renderVocabList(ABSTRACT_NOUNS, 'sky')}
                </div>
              )}

              {vocabSection === 'connectors' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Kualifikasi & Tautan</h3>
                      <p className="text-xs text-sky-700">Menghubungkan ide secara formal.</p>
                    </div>
                  </div>
                  {renderVocabList(CONNECTORS_QUALIFIERS, 'sky')}
                </div>
              )}

                                { /* Bonus: Penggunaan Kata & Kolokasi Section */ }
                                <div className="mt-10 animate-fade-in">
                                    
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-lg font-bold text-slate-800">Penulisan Formal</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-2 text-sm uppercase">Esai & Laporan</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"The study <b>demonstrates</b> a <b>significant</b> link between diet and health."</p>
                    <p className="text-xs text-slate-500 mb-2">(Studi ini <b>menunjukkan</b> hubungan yang <b>signifikan</b> antara diet dan kesehatan.)</p>
                    <p className="text-sm text-slate-700 italic">"<b>Consequently</b>, we must <b>evaluate</b> our current strategy."</p>
                    <p className="text-xs text-slate-500">(<b>Akibatnya</b>, kita harus <b>mengevaluasi</b> strategi kita saat ini.)</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-green-800 mb-2 text-sm uppercase">Pidato Profesional</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"Please <b>identify</b> the <b>relevant</b> factors in this case."</p>
                    <p className="text-xs text-slate-500 mb-2">(Harap <b>identifikasi</b> faktor-faktor yang <b>relevan</b> dalam kasus ini.)</p>
                    <p className="text-sm text-slate-700 italic">"We need to <b>establish</b> a clear <b>methodology</b>."</p>
                    <p className="text-xs text-slate-500">(Kita perlu <b>menetapkan</b> <b>metodologi</b> yang jelas.)</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2 text-sm uppercase tracking-wide">Sinonim (Informal vs Formal)</h3>
                <div className="bg-white p-3 rounded-lg border border-indigo-100/50">
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• Look at ➜ <b>Analyze</b></li>
                    <li>• Show ➜ <b>Demonstrate</b></li>
                    <li>• Need ➜ <b>Require</b></li>
                    <li>• Think / Guess ➜ <b>Assume</b></li>
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

export default InterVocabLesson15;
