import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Trophy, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const COMPLEX_EMOTIONS_VOCAB = [

  { word: "Anxiety", ipa: "/æŋˈzaɪəti/", meaning: "Kecemasan / Kegelisahan" },
  { word: "Frustration", ipa: "/frʌˈstreɪʃən/", meaning: "Frustrasi / Kekesalan" },
  { word: "Gratitude", ipa: "/ˈɡrætɪtuːd/", meaning: "Rasa syukur / Terima kasih" },
  { word: "Envy", ipa: "/ˈɛnvi/", meaning: "Iri hati / Dengki" },
  { word: "Compassion", ipa: "/kəmˈpæʃən/", meaning: "Belas kasihan / Kasih sayang" },
  { word: "Nostalgia", ipa: "/nɒˈstældʒə/", meaning: "Nostalgia (Rindu masa lalu)" },
  { word: "Optimism", ipa: "/ˈɒptɪmɪzəm/", meaning: "Optimisme / Harapan baik" },
  { word: "Pessimism", ipa: "/ˈpɛsɪmɪzəm/", meaning: "Pesimisme" },
  { word: "Confidence", ipa: "/ˈkɒnfɪdəns/", meaning: "Kepercayaan diri" },
  { word: "Insecurity", ipa: "/ˌɪnsɪˈkjʊərɪti/", meaning: "Rasa tidak aman / Minder" },

];

const PERSONAL_GROWTH_VOCAB = [

  { word: "Improvement", ipa: "/ɪmˈpruːvmənt/", meaning: "Perbaikan / Peningkatan" },
  { word: "Achievement", ipa: "/əˈtʃiːvmənt/", meaning: "Prestasi / Pencapaian" },
  { word: "Failure", ipa: "/ˈfeɪljər/", meaning: "Kegagalan" },
  { word: "Motivation", ipa: "/ˌmoʊtɪˈveɪʃən/", meaning: "Motivasi / Dorongan" },
  { word: "Discipline", ipa: "/ˈdɪsɪplɪn/", meaning: "Disiplin" },
  { word: "Habit", ipa: "/ˈhæbɪt/", meaning: "Kebiasaan" },
  { word: "Challenge", ipa: "/ˈtʃælɪndʒ/", meaning: "Tantangan" },
  { word: "Opportunity", ipa: "/ˌɒpərˈtuːnɪti/", meaning: "Kesempatan / Peluang" },
  { word: "Progress", ipa: "/ˈproʊɡrɛs/", meaning: "Kemajuan" },
  { word: "Determination", ipa: "/dɪˌtɜːrmɪˈneɪʃən/", meaning: "Tekad / Keteguhan hati" },

];

const MIND_PSYCHOLOGY_VOCAB = [

  { word: "Consciousness", ipa: "/ˈkɒnʃəsnɪs/", meaning: "Kesadaran" },
  { word: "Mindset", ipa: "/ˈmaɪndsɛt/", meaning: "Pola pikir" },
  { word: "Behavior", ipa: "/bɪˈheɪvjər/", meaning: "Perilaku / Tingkah laku" },
  { word: "Attitude", ipa: "/ˈætɪtuːd/", meaning: "Sikap" },
  { word: "Perspective", ipa: "/pərˈspɛktɪv/", meaning: "Sudut pandang / Perspektif" },
  { word: "Stress", ipa: "/strɛs/", meaning: "Stres / Tekanan mental" },
  { word: "Depression", ipa: "/dɪˈprɛʃən/", meaning: "Depresi / Kesedihan mendalam" },
  { word: "Therapy", ipa: "/ˈθɛrəpi/", meaning: "Terapi / Pengobatan" },
  { word: "Personality", ipa: "/ˌpɜːrsəˈnælɪti/", meaning: "Kepribadian" },
  { word: "Intelligence", ipa: "/ɪnˈtɛlɪdʒəns/", meaning: "Kecerdasan" },

];

const QUIZ_QUESTIONS = [

  { id: 1, question: "Feeling thankful for what you have is called ___.", options: ['Envy', 'Gratitude', 'Anxiety'], answer: 'Gratitude', explanation: "Gratitude (Rasa syukur) adalah kualitas bersyukur." },
  { id: 2, question: "To reach your goals, you need strong ___ to keep working hard.", options: ['failure', 'determination', 'stress'], answer: 'determination', explanation: "Determination (Tekad) adalah keteguhan tujuan." },
  { id: 3, question: "A feeling of worry or nervousness about something is ___.", options: ['Optimism', 'Confidence', 'Anxiety'], answer: 'Anxiety', explanation: "Anxiety (Kecemasan) adalah perasaan khawatir, gugup, atau gelisah." },
  { id: 4, question: "Changing your ___ can change how you see the world.", options: ['mindset', 'habit', 'therapy'], answer: 'mindset', explanation: "Mindset (Pola pik) adalah serangkaian sikap mapan yang dimiliki oleh seseorang." },
  { id: 5, question: "Looking back at the past with a sentimental feeling is ___.", options: ['Compassion', 'Nostalgia', 'Frustration'], answer: 'Nostalgia', explanation: "Nostalgia (Nostalgia) adalah kerinduan sentimental akan masa lalu." },
  { id: 6, question: "Feeling unhappy because someone else has something you want is ___.", options: ['compassion', 'envy', 'optimism'], answer: 'envy', explanation: "Envy (Iri hati) adalah keinginan untuk memiliki apa yang dimiliki orang lain." },
  { id: 7, question: "Being hopeful about the future is ___.", options: ['pessimism', 'optimism', 'frustration'], answer: 'optimism', explanation: "Optimism (Optimisme) adalah harapan dan kepercayaan akan masa depan yang baik." },
  { id: 8, question: "Belief in yourself and your abilities is ___.", options: ['insecurity', 'confidence', 'depression'], answer: 'confidence', explanation: "Confidence (Kepercayaan diri) adalah keyakinan pada kemampuan diri sendiri." },
  { id: 9, question: "When you feel upset because things didn't work out, you feel ___.", options: ['gratitude', 'frustration', 'compassion'], answer: 'frustration', explanation: "Frustration (Frustrasi) adalah perasaan kecewa atau kesal." },
  { id: 10, question: "Making your life better is called personal ___.", options: ['failure', 'improvement', 'stress'], answer: 'improvement', explanation: "Improvement (Perbaikan) adalah proses menjadi lebih baik." },
  { id: 11, question: "Something you do regularly is a ___.", options: ['challenge', 'habit', 'opportunity'], answer: 'habit', explanation: "Habit (Kebiasaan) adalah sesuatu yang Anda lakukan berulang kali." },
  { id: 12, question: "When you don't succeed at something, it is a ___.", options: ['achievement', 'failure', 'progress'], answer: 'failure', explanation: "Failure (Kegagalan) adalah tidak berhasilnya suatu upaya." },
  { id: 13, question: "The mental or emotional strain is called ___.", options: ['consciousness', 'stress', 'attitude'], answer: 'stress', explanation: "Stress (Stres) adalah tekanan mental atau emosional." },
  { id: 14, question: "Your unique character and qualities make up your ___.", options: ['behavior', 'personality', 'perspective'], answer: 'personality', explanation: "Personality (Kepribadian) adalah kumpulan karakteristik yang membuat Anda unik." },
  { id: 15, question: "The way you think about or view something is your ___.", options: ['therapy', 'perspective', 'intelligence'], answer: 'perspective', explanation: "Perspective (Sudut pandang) adalah pandangan atau sikap terhadap sesuatu." },
  { id: 16, question: "Treating emotional or mental problems is ___.", options: ['depression', 'therapy', 'attitude'], answer: 'therapy', explanation: "Therapy (Terapi) adalah pengobatan untuk masalah mental atau emosional." },
  { id: 17, question: "Your general way of thinking or feeling about something is your ___.", options: ['mindset', 'attitude', 'behavior'], answer: 'attitude', explanation: "Attitude (Sikap) adalah cara Anda berpikir dan merasa tentang sesuatu." },
  { id: 18, question: "What gives you the desire to do something is ___.", options: ['motivation', 'discipline', 'consciousness'], answer: 'motivation', explanation: "Motivation (Motivasi) adalah alasan atau hasrat untuk melakukan sesuatu." },
  { id: 19, question: "Controlling your actions and working hard requires ___.", options: ['discipline', 'failure', 'envy'], answer: 'discipline', explanation: "Discipline (Disiplin) adalah kemampuan untuk mengontrol diri dan bekerja keras." },
  { id: 20, question: "An accomplishment you're proud of is an ___.", options: ['achievement', 'challenge', 'opportunity'], answer: 'achievement', explanation: "Achievement (Prestasi) adalah sesuatu yang berhasil Anda capai." }

];

const InterVocabLesson11: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 11);
    const nextLessonPath = 11 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${11+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'emotions' | string>('emotions');

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
                lessonLabel={"Intermediate Vocabulary Lesson 11"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Pengembangan Diri"
                subtitle="Vocabulary • Pelajaran 11"
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
                  onClick={() => setVocabSection('emotions')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'emotions' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Emosi
                </button>

                <button
                  onClick={() => setVocabSection('growth')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'growth' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Pertumbuhan
                </button>

                <button
                  onClick={() => setVocabSection('mind')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'mind' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Pikiran
                </button>

              </div>
      
                                
              {vocabSection === 'emotions' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Emosi Kompleks</h3>
                      <p className="text-xs text-sky-700">Perasaan di luar senang dan sedih.</p>
                    </div>
                  </div>
                  {renderVocabList(COMPLEX_EMOTIONS_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'growth' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Pertumbuhan Pribadi</h3>
                      <p className="text-xs text-sky-700">Perbaikan diri dan tujuan.</p>
                    </div>
                  </div>
                  {renderVocabList(PERSONAL_GROWTH_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'mind' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Pikiran & Psikologi</h3>
                      <p className="text-xs text-sky-700">Berpikir dan keadaan mental.</p>
                    </div>
                  </div>
                  {renderVocabList(MIND_PSYCHOLOGY_VOCAB, 'sky')}
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
                    <h3 className="font-bold text-blue-800 mb-2 text-sm uppercase">Mengatasi Tantangan</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"With enough <b>determination</b>, you can turn <b>failure</b> into <b>success</b>."</p>
                    <p className="text-xs text-slate-500 mb-2">(Dengan <b>tekad</b> yang cukup, Anda dapat mengubah <b>kegagalan</b> menjadi <b>kesuksesan</b>.)</p>
                    <p className="text-sm text-slate-700 italic">"Face every <b>challenge</b> as an <b>opportunity</b> to learn."</p>
                    <p className="text-xs text-slate-500">(Hadapi setiap <b>tantangan</b> sebagai <b>kesempatan</b> untuk belajar.)</p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <h3 className="font-bold text-purple-800 mb-2 text-sm uppercase">Kesehatan Mental</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"Changing your <b>mindset</b> can reduce <b>anxiety</b>."</p>
                    <p className="text-xs text-slate-500 mb-2">(Mengubah <b>pola pikir</b> Anda dapat mengurangi <b>kecemasan</b>.)</p>
                    <p className="text-sm text-slate-700 italic">"He felt deep <b>gratitude</b> for the support he received."</p>
                    <p className="text-xs text-slate-500">(Dia merasakan <b>rasa syukur</b> yang mendalam atas dukungan yang dia terima.)</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2 text-sm uppercase tracking-wide">Kolokasi Umum</h3>
                <div className="bg-white p-3 rounded-lg border border-indigo-100/50">
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <b>Build</b> a habit (Membangun kebiasaan)</li>
                    <li>• <b>Boost</b> confidence (Meningkatkan kepercayaan diri)</li>
                    <li>• <b>Overcome</b> fear (Mengatasi rasa takut)</li>
                    <li>• <b>Seek</b> therapy (Mencari terapi/pengobatan)</li>
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

export default InterVocabLesson11;
