import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const POSITIVE_TRAITS = [

  { word: "Ambitious", ipa: "/æmˈbɪʃəs/", meaning: "Ambisius / Bertekad kuat" },
  { word: "Diligent", ipa: "/ˈdɪlɪdʒənt/", meaning: "Rajin / Tekun" },
  { word: "Reliable", ipa: "/rɪˈlaɪəbəl/", meaning: "Dapat diandalkan" },
  { word: "Considerate", ipa: "/kənˈsɪdərət/", meaning: "Penuh perhatian / Pengertian" },
  { word: "Humble", ipa: "/ˈhʌmbəl/", meaning: "Rendah hati" },
  { word: "Courageous", ipa: "/kəˈreɪdʒəs/", meaning: "Pemberani" },
  { word: "Generous", ipa: "/ˈdʒɛnərəs/", meaning: "Dermawan / Murah hati" },
  { word: "Optimistic", ipa: "/ˌɒptɪˈmɪstɪk/", meaning: "Optimis" },
  { word: "Sincere", ipa: "/sɪnˈsɪər/", meaning: "Tulus" },
  { word: "Resourceful", ipa: "/rɪˈsɔːrsfʊl/", meaning: "Banyak akal / Cerdik" },

];

const NEGATIVE_TRAITS = [

  { word: "Arrogant", ipa: "/ˈærəɡənt/", meaning: "Sombong / Angkuh" },
  { word: "Stubborn", ipa: "/ˈstʌbərn/", meaning: "Keras kepala" },
  { word: "Cynical", ipa: "/ˈsɪnɪkəl/", meaning: "Sinus / Tidak percaya kebaikan orang" },
  { word: "Impulsive", ipa: "/ɪmˈpʌlsɪv/", meaning: "Impulsif (Bertindak tanpa pikir)" },
  { word: "Selfish", ipa: "/ˈsɛlfɪʃ/", meaning: "Egois" },
  { word: "Lazy", ipa: "/ˈleɪzi/", meaning: "Malas" },
  { word: "Moody", ipa: "/ˈmuːdi/", meaning: "Murung / Suasana hati berubah-ubah" },
  { word: "Pessimistic", ipa: "/ˌpɛsɪˈmɪstɪk/", meaning: "Pesimis" },
  { word: "Vain", ipa: "/veɪn/", meaning: "Sombong (tentang penampilan)" },
  { word: "Greedy", ipa: "/ˈɡriːdi/", meaning: "Serakah / Tamak" },

];

const COMPLEX_TRAITS = [

  { word: "Introverted", ipa: "/ˈɪntrəˌvɜːrtɪd/", meaning: "Introvert / Tertutup" },
  { word: "Extroverted", ipa: "/ˈɛkstrəˌvɜːrtɪd/", meaning: "Ekstrovert / Terbuka" },
  { word: "Sensitive", ipa: "/ˈsɛnsɪtɪv/", meaning: "Sensitif / Peka" },
  { word: "Assertive", ipa: "/əˈsɜːrtɪv/", meaning: "Tegas" },
  { word: "Observant", ipa: "/əbˈzɜːrvənt/", meaning: "Jeli / Suka mengamati" },
  { word: "Curious", ipa: "/ˈkjʊəriəs/", meaning: "Ingin tahu" },
  { word: "Analytical", ipa: "/ˌænəˈlɪtɪkəl/", meaning: "Analitis" },
  { word: "Independent", ipa: "/ˌɪndɪˈpɛndənt/", meaning: "Mandiri" },
  { word: "Charismatic", ipa: "/ˌkærɪzˈmætɪk/", meaning: "Kharismatik" },
  { word: "Sarcastic", ipa: "/sɑːrˈkæstɪk/", meaning: "Sarkastik / Menyindir" },

];

const QUIZ_QUESTIONS = [

  { id: 1, question: "Someone who always expects good things to happen is ___.", options: ['Cynical', 'Pessimistic', 'Optimistic'], answer: 'Optimistic', explanation: "Orang yang optimis fokus pada sisi positif dari berbagai hal." },
  { id: 2, question: "A person who refuses to change their mind is ___.", options: ['Stubborn', 'Generous', 'Flexible'], answer: 'Stubborn', explanation: "Orang yang keras kepala bertekad secara tidak masuk akal untuk melakukan apa yang mereka inginkan." },
  { id: 3, question: "He only cares about himself. He is very ___.", options: ['sincere', 'selfless', 'selfish'], answer: 'selfish', explanation: "Selfish (Egois) berarti kurang mempertimbangkan orang lain." },
  { id: 4, question: "She works very hard and carefully. She is ___.", options: ['lazy', 'diligent', 'arrogant'], answer: 'diligent', explanation: "Diligent (Rajin) berarti memiliki atau menunjukkan ketekunan dan kesungguhan dalam pekerjaan seseorang." },
  { id: 5, question: "He enjoys being alone and finds social events tiring. He is ___.", options: ['Charismatic', 'Introverted', 'Extroverted'], answer: 'Introverted', explanation: "Orang yang introvert cenderung tertutup dan fokus pada pikiran internal." },
  { id: 6, question: "Someone who sets high goals and works hard to achieve them is ___.", options: ['Arrogant', 'Ambitious', 'Lazy'], answer: 'Ambitious', explanation: "Ambitious (Ambisius) berarti memiliki keinginan kuat untuk sukses." },
  { id: 7, question: "You can always count on her. She is very ___.", options: ['reliable', 'impulsive', 'moody'], answer: 'reliable', explanation: "Reliable (Dapat diandalkan) berarti bisa dipercaya." },
  { id: 8, question: "He gives a lot of money to charity. He is ___.", options: ['generous', 'greedy', 'vain'], answer: 'generous', explanation: "Generous (Dermawan) berarti murah hati dan suka memberi." },
  { id: 9, question: "Someone who acts without thinking is ___.", options: ['considerate', 'analytical', 'impulsive'], answer: 'impulsive', explanation: "Impulsive berarti bertindak tiba-tiba tanpa berpikir." },
  { id: 10, question: "She thinks she's better than everyone else. She is ___.", options: ['sincere', 'humble', 'arrogant'], answer: 'arrogant', explanation: "Arrogant (Sombong) berarti memiliki perasaan superioritas yang berlebihan." },
  { id: 11, question: "He never does his homework. He is ___.", options: ['diligent', 'lazy', 'resourceful'], answer: 'lazy', explanation: "Lazy (Malas) berarti tidak mau bekerja atau menggunakan energi." },
  { id: 12, question: "Someone who only sees the negative side is ___.", options: ['sincere', 'pessimistic', 'optimistic'], answer: 'pessimistic', explanation: "Pessimistic (Pesimis) berarti cenderung melihat sisi terburuk." },
  { id: 13, question: "She always thinks about other people's feelings. She is ___.", options: ['cynical', 'considerate', 'selfish'], answer: 'considerate', explanation: "Considerate (Penuh perhatian) berarti peduli terhadap perasaan orang lain." },
  { id: 14, question: "He loves talking to people and making new friends. He is ___.", options: ['extroverted', 'introverted', 'stubborn'], answer: 'extroverted', explanation: "Extroverted (Ekstrovert) berarti energik dalam situasi sosial." },
  { id: 15, question: "Someone who is good at finding solutions is ___.", options: ['greedy', 'resourceful', 'lazy'], answer: 'resourceful', explanation: "Resourceful (Cerdik) berarti pandai menemukan cara untuk mengatasi kesulitan." },
  { id: 16, question: "She is very ___ and can persuade anyone.", options: ['cynical', 'moody', 'charismatic'], answer: 'charismatic', explanation: "Charismatic (Kharismatik) berarti memiliki daya tarik yang memukau." },
  { id: 17, question: "He doesn't lie. He is always ___.", options: ['sarcastic', 'sincere', 'vain'], answer: 'sincere', explanation: "Sincere (Tulus) berarti jujur dan tulus." },
  { id: 18, question: "Someone who wants more and more money is ___.", options: ['humble', 'generous', 'greedy'], answer: 'greedy', explanation: "Greedy (Serakah) berarti memiliki keinginan berlebihan untuk kekayaan." },
  { id: 19, question: "She uses irony to make jokes. She is ___.", options: ['sarcastic', 'sincere', 'humble'], answer: 'sarcastic', explanation: "Sarcastic (Sarkastik) berarti menggunakan ironi untuk mengejek atau menyindir." },
  { id: 20, question: "He is very ___ and studies everything in detail.", options: ['analytical', 'vain', 'impulsive'], answer: 'analytical', explanation: "Analytical (Analitis) berarti suka menganalisis dan memeriksa detail." }

];

const InterVocabLesson17: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 17);
    const nextLessonPath = 17 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${17+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'positive' | string>('positive');

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
                lessonLabel={"Intermediate Vocabulary Lesson 17"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Ciri-ciri Kepribadian"
                subtitle="Vocabulary • Pelajaran 17"
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
                  onClick={() => setVocabSection('positive')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'positive' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Positif
                </button>

                <button
                  onClick={() => setVocabSection('negative')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'negative' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Negatif
                </button>

                <button
                  onClick={() => setVocabSection('complex')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'complex' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Netral
                </button>

              </div>
      
                                
              {vocabSection === 'positive' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Sifat Positif</h3>
                      <p className="text-xs text-sky-700">Karakteristik yang baik.</p>
                    </div>
                  </div>
                  {renderVocabList(POSITIVE_TRAITS, 'sky')}
                </div>
              )}

              {vocabSection === 'negative' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Sifat Negatif</h3>
                      <p className="text-xs text-sky-700">Kekurangan dan kebiasaan buruk.</p>
                    </div>
                  </div>
                  {renderVocabList(NEGATIVE_TRAITS, 'sky')}
                </div>
              )}

              {vocabSection === 'complex' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Sifat Kompleks</h3>
                      <p className="text-xs text-sky-700">Netral atau tergantung konteks.</p>
                    </div>
                  </div>
                  {renderVocabList(COMPLEX_TRAITS, 'sky')}
                </div>
              )}

                                { /* Bonus: Penggunaan Kata & Kolokasi Section */ }
                                <div className="mt-10 animate-fade-in">
                                    
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-lg font-bold text-slate-800">Mendeskripsikan Orang</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-green-800 mb-2 text-sm uppercase">Di Kantor</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"She is very <b>diligent</b> and <b>reliable</b>."</p>
                    <p className="text-xs text-slate-500 mb-2">(Dia sangat <b>rajin</b> dan <b>dapat diandalkan</b>.)</p>
                    <p className="text-sm text-slate-700 italic">"He is <b>ambitious</b> but sometimes <b>stubborn</b>."</p>
                    <p className="text-xs text-slate-500">(Dia <b>ambisius</b> tapi terkadang <b>keras kepala</b>.)</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-2 text-sm uppercase">Hubungan</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"He is <b>considerate</b> and always thinks of others."</p>
                    <p className="text-xs text-slate-500 mb-2">(Dia <b>penuh perhatian</b> dan selalu memikirkan orang lain.)</p>
                    <p className="text-sm text-slate-700 italic">"Stop being so <b>cynical</b>; try to be more <b>optimistic</b>."</p>
                    <p className="text-xs text-slate-500">(Berhentilah bersikap begitu <b>sinis</b>; cobalah untuk lebih <b>optimis</b>.)</p>
                  </div>
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

export default InterVocabLesson17;
