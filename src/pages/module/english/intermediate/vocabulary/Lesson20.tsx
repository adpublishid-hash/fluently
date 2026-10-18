import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const CAREER_EDU_REVIEW = [

  { word: "Resume", ipa: "/ˈrɛzjʊmeɪ/", meaning: "CV / Riwayat Hidup" },
  { word: "Deadline", ipa: "/ˈdɛdlaɪn/", meaning: "Tenggat waktu" },
  { word: "Investment", ipa: "/ɪnˈvɛstmənt/", meaning: "Investasi" },
  { word: "Scholarship", ipa: "/ˈskɒlərʃɪp/", meaning: "Beasiswa" },
  { word: "Entrepreneur", ipa: "/ˌɒntrəprəˈnɜːr/", meaning: "Pengusaha" },
  { word: "Tuition", ipa: "/tuˈɪʃən/", meaning: "Biaya kuliah" },
  { word: "Budget", ipa: "/ˈbʌdʒɪt/", meaning: "Anggaran" },
  { word: "Promotion", ipa: "/prəˈmoʊʃən/", meaning: "Kenaikan jabatan" },

];

const PEOPLE_SOCIETY_REVIEW = [

  { word: "Ambitious", ipa: "/æmˈbɪʃəs/", meaning: "Ambisius / Bertekad" },
  { word: "Introverted", ipa: "/ˈɪntrəˌvɜːrtɪd/", meaning: "Tertutup (Introvert)" },
  { word: "Nostalgia", ipa: "/nɒˈstældʒə/", meaning: "Rindu masa lalu" },
  { word: "Anxiety", ipa: "/æŋˈzaɪəti/", meaning: "Kecemasan" },
  { word: "Diversity", ipa: "/daɪˈvɜːrsɪti/", meaning: "Keberagaman" },
  { word: "Citizen", ipa: "/ˈsɪtɪzən/", meaning: "Warga negara" },
  { word: "Acquaintance", ipa: "/əˈkweɪntəns/", meaning: "Kenalan" },
  { word: "Reputation", ipa: "/ˌrɛpjʊˈteɪʃən/", meaning: "Reputasi / Nama baik" },

];

const WORLD_TECH_REVIEW = [

  { word: "Sustainability", ipa: "/səˌsteɪnəˈbɪlɪti/", meaning: "Keberlanjutan (Lingkungan)" },
  { word: "Pollution", ipa: "/pəˈluːʃən/", meaning: "Polusi" },
  { word: "Algorithm", ipa: "/ˈælɡəˌrɪðəm/", meaning: "Algoritma" },
  { word: "Viral", ipa: "/ˈvaɪrəl/", meaning: "Viral / Menyebar cepat" },
  { word: "Headline", ipa: "/ˈhɛdlaɪn/", meaning: "Judul berita" },
  { word: "Innovation", ipa: "/ˌɪnəˈveɪʃən/", meaning: "Inovasi" },
  { word: "Global warming", ipa: "/ˈɡloʊbəl ˈwɔːrmɪŋ/", meaning: "Pemanasan global" },
  { word: "Artificial Intelligence", ipa: "/AI/", meaning: "Kecerdasan Buatan" },

];

const QUIZ_QUESTIONS = [

  { id: 1, question: "A person who starts their own business is an ___.", options: ['Entrepreneur', 'Introvert', 'Employee'], answer: 'Entrepreneur', explanation: "Seorang pebisnis (entrepreneur) adalah seseorang yang mengorganisir dan menjalankan bisnis." },
  { id: 2, question: "We need to finish this project before the ___.", options: ['resume', 'deadline', 'headline'], answer: 'deadline', explanation: "Deadline (Tenggat waktu) adalah waktu terakhir di mana sesuatu harus diselesaikan." },
  { id: 3, question: "Using energy that doesn't harm the future environment is called ___.", options: ['sustainability', 'pollution', 'anxiety'], answer: 'sustainability', explanation: "Sustainability (Keberlanjutan) berarti memenuhi kebutuhan tanpa mengorbankan generasi mendatang." },
  { id: 4, question: "Someone who prefers to be alone or with few people is ___.", options: ['introverted', 'viral', 'ambitious'], answer: 'introverted', explanation: "Orang yang introvert cenderung tertutup dan pendiam." },
  { id: 5, question: "The title of a newspaper article is the ___.", options: ['budget', 'tuition', 'headline'], answer: 'headline', explanation: "Headline adalah judul di bagian atas artikel." },
  { id: 6, question: "You need to ___ a decision quickly.", options: ['have', 'make', 'do'], answer: 'make', explanation: "Kita 'make a decision', bukan 'do' atau 'have' a decision." },
  { id: 7, question: "It's raining ___. We should stay inside.", options: ['deeply', 'strongly', 'heavily'], answer: 'heavily', explanation: "'Heavily' digunakan untuk mendeskripsikan hujan deras." },
  { id: 8, question: "The value of money is decreasing. This is called ___.", options: ['recession', 'inflation', 'investment'], answer: 'inflation', explanation: "Inflation (Inflasi) adalah kenaikan harga yang mengurangi daya beli uang." },
  { id: 9, question: "To protect the environment, we should use ___ energy sources.", options: ['renewable', 'expensive', 'traditional'], answer: 'renewable', explanation: "Renewable energy (Energi terbarukan) dapat diperbaharui dan tidak habis." },
  { id: 10, question: "She is very ___. She always helps other people.", options: ['generous', 'greedy', 'selfish'], answer: 'generous', explanation: "Generous (Dermawan) berarti suka memberi dan membantu." },
  { id: 11, question: "We need to ___ the data before making conclusions.", options: ['require', 'assume', 'analyze'], answer: 'analyze', explanation: "Analyze (Menganalisis) berarti memeriksa secara detail untuk memahami." },
  { id: 12, question: "The researcher proposed a new ___ to test.", options: ['evidence', 'hypothesis', 'theory'], answer: 'hypothesis', explanation: "Hypothesis (Hipotesis) adalah dugaan awal yang perlu dibuktikan melalui eksperimen." },
  { id: 13, question: "My phone ___ and stopped working.", options: ['upgraded', 'crashed', 'malfunctioned'], answer: 'crashed', explanation: "'Crash' berarti berhenti bekerja tiba-tiba (untuk perangkat elektronik)." },
  { id: 14, question: "To say you don't agree politely, you can say '___'.", options: ['You are wrong', 'That is stupid', 'I beg to differ'], answer: 'I beg to differ', explanation: "'I beg to differ' adalah cara formal dan sopan untuk tidak setuju." },
  { id: 15, question: "A very serious problem or danger is a ___.", options: ['alternative', 'crisis', 'solution'], answer: 'crisis', explanation: "Crisis (Krisis) adalah situasi berbahaya atau sulit yang ekstrem." },
  { id: 16, question: "This job requires ___ knowledge of computers.", options: ['high', 'deep', 'strong'], answer: 'deep', explanation: "'Deep knowledge' (Pengetahuan mendalam) adalah kolokasi yang tepat." },
  { id: 17, question: "She is very ___. She changes her mind every minute.", options: ['reliable', 'impulsive', 'decisive'], answer: 'impulsive', explanation: "Impulsive berarti bertindak dan memutuskan sesuatu secara tiba-tiba tanpa berpikir panjang." },
  { id: 18, question: "___, I think this plan will work.", options: ['Nevertheless', 'Therefore', 'In my opinion'], answer: 'In my opinion', explanation: "'In my opinion' (Menurut pendapat saya) digunakan untuk menyatakan pendapat pribadi." },
  { id: 19, question: "She gave a great ___ presentation.", options: ['deeply', 'strong', 'highly'], answer: 'highly', explanation: "'Highly' digunakan dengan kata sifat positif seperti 'effective', 'successful', atau dengan past participles." },
  { id: 20, question: "The economy is growing. ___, unemployment is decreasing.", options: ['Moreover', 'However', 'Nevertheless'], answer: 'Moreover', explanation: "'Moreover' (Terlebih lagi) menambahkan informasi yang mendukung pernyataan sebelumnya." }

];

const InterVocabLesson20: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 20);
    const nextLessonPath = 20 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${20+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'career' | string>('career');

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
                lessonLabel={"Intermediate Vocabulary Lesson 20"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Ulasan Akhir"
                subtitle="Vocabulary • Pelajaran 20"
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
                  onClick={() => setVocabSection('career')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'career' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Karir
                </button>

                <button
                  onClick={() => setVocabSection('people')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'people' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Orang
                </button>

                <button
                  onClick={() => setVocabSection('world')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'world' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Dunia
                </button>

              </div>
      
                                
              {vocabSection === 'career' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Karir & Uang</h3>
                      <p className="text-xs text-sky-700">Istilah bisnis penting.</p>
                    </div>
                  </div>
                  {renderVocabList(CAREER_EDU_REVIEW, 'sky')}
                </div>
              )}

              {vocabSection === 'people' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Orang & Emosi</h3>
                      <p className="text-xs text-sky-700">Mendeskripsikan kehidupan dan perasaan.</p>
                    </div>
                  </div>
                  {renderVocabList(PEOPLE_SOCIETY_REVIEW, 'sky')}
                </div>
              )}

              {vocabSection === 'world' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Dunia & Teknologi</h3>
                      <p className="text-xs text-sky-700">Isu global dan teknologi.</p>
                    </div>
                  </div>
                  {renderVocabList(WORLD_TECH_REVIEW, 'sky')}
                </div>
              )}

                                { /* Bonus: Penggunaan Kata & Kolokasi Section */ }
                                <div className="mt-10 animate-fade-in">
                                    
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

export default InterVocabLesson20;
