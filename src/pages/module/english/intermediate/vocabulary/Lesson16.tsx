import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const VERB_NOUN_COLLOCATIONS = [

  { word: "Make a decision", ipa: "/meɪk ə dɪˈsɪʒən/", meaning: "Membuat keputusan" },
  { word: "Do a favor", ipa: "/duː ə ˈfeɪvər/", meaning: "Melakukan kebaikan / Membantu" },
  { word: "Take a risk", ipa: "/teɪk ə rɪsk/", meaning: "Mengambil risiko" },
  { word: "Pay attention", ipa: "/peɪ əˈtɛnʃən/", meaning: "Memperhatikan" },
  { word: "Keep a promise", ipa: "/kiːp ə ˈprɒmɪs/", meaning: "Menepati janji" },
  { word: "Break a habit", ipa: "/breɪk ə ˈhæbɪt/", meaning: "Menghentikan kebiasaan" },
  { word: "Catch a cold", ipa: "/kætʃ ə koʊld/", meaning: "Masuk angin / Pilek" },
  { word: "Save time", ipa: "/seɪv taɪm/", meaning: "Menghemat waktu" },
  { word: "Keep a secret", ipa: "/kiːp ə ˈsiːkrɪt/", meaning: "Menjaga rahasia" },
  { word: "Have a chat", ipa: "/hæv ə tʃæt/", meaning: "Mengobrol" },

];

const ADJ_NOUN_COLLOCATIONS = [

  { word: "Heavy rain", ipa: "/ˈhɛvi reɪn/", meaning: "Hujan deras" },
  { word: "Strong coffee", ipa: "/strɔːŋ ˈkɒfi/", meaning: "Kopi kental/kuat" },
  { word: "Fast food", ipa: "/fæst fuːd/", meaning: "Makanan cepat saji" },
  { word: "Quick shower", ipa: "/kwɪk ˈʃaʊər/", meaning: "Mandi sebentar" },
  { word: "High quality", ipa: "/haɪ ˈkwɒlɪti/", meaning: "Kualitas tinggi" },
  { word: "Deep sleep", ipa: "/diːp sliːp/", meaning: "Tidur nyenyak" },
  { word: "Light meal", ipa: "/laɪt miːl/", meaning: "Makanan ringan" },
  { word: "Serious injury", ipa: "/ˈsɪəriəs ˈɪndʒəri/", meaning: "Cedera serius" },
  { word: "Golden opportunity", ipa: "/ˈɡoʊldən ˌɒpərˈtuːnɪti/", meaning: "Kesempatan emas" },
  { word: "Dry sense of humor", ipa: "/draɪ sɛns ʌv ˈhjuːmər/", meaning: "Humor kering / Sarkas halus" },

];

const INTENSIFIERS_VOCAB = [

  { word: "Highly recommended", ipa: "/ˈhaɪli ˌrɛkəˈmɛndɪd/", meaning: "Sangat direkomendasikan" },
  { word: "Fully aware", ipa: "/ˈfʊli əˈwɛər/", meaning: "Sadar sepenuhnya" },
  { word: "Deeply concerned", ipa: "/ˈdiːpli kənˈsɜːrnd/", meaning: "Sangat prihatin" },
  { word: "Absolutely sure", ipa: "/ˈæbsəluːtli ʃʊər/", meaning: "Sangat yakin" },
  { word: "Bitterly cold", ipa: "/ˈbɪtərli koʊld/", meaning: "Dingin yang menusuk" },
  { word: "Completely different", ipa: "/kəmˈpliːtli ˈdɪfrənt/", meaning: "Berbeda sama sekali" },
  { word: "Hardly likely", ipa: "/ˈhɑːrdli ˈlaɪkli/", meaning: "Sangat tidak mungkin" },
  { word: "Widely available", ipa: "/ˈwaɪdli əˈveɪləbəl/", meaning: "Tersedia secara luas" },
  { word: "Seriously ill", ipa: "/ˈsɪəriəsli ɪl/", meaning: "Sakit parah" },
  { word: "Strictly forbidden", ipa: "/ˈstrɪktli fərˈbɪdən/", meaning: "Dilarang keras" },

];

const QUIZ_QUESTIONS = [

  { id: 1, question: "It is ___ forbidden to smoke in this area.", options: ['strongly', 'strictly', 'heavily'], answer: 'strictly', explanation: "Kita mengatakan 'strictly forbidden' untuk aturan yang sangat tegas." },
  { id: 2, question: "I need to ___ a decision by tomorrow.", options: ['do', 'make', 'create'], answer: 'make', explanation: "Kita selalu 'make' (membuat) keputusan, tidak pernah 'do' keputusan." },
  { id: 3, question: "He has a ___ sense of humor. He makes jokes with a serious face.", options: ['wet', 'hard', 'dry'], answer: 'dry', explanation: "'Dry sense of humor' berarti lucu tanpa menunjukkan emosi." },
  { id: 4, question: "It was raining ___ yesterday.", options: ['strongly', 'heavily', 'thickly'], answer: 'heavily', explanation: "Kita mengatakan 'heavy rain' (hujan lebat) atau 'raining heavily', bukan strong rain." },
  { id: 5, question: "Please ___ attention to the safety announcement.", options: ['pay', 'give', 'keep'], answer: 'pay', explanation: "Frasa yang benar adalah 'pay attention' (memperhatikan)." },
  { id: 6, question: "Can you ___ me a favor?", options: ['make', 'do', 'have'], answer: 'do', explanation: "'Do a favor' adalah kolokasi yang benar untuk membantu seseorang." },
  { id: 7, question: "You need to ___ a risk if you want to succeed.", options: ['do', 'make', 'take'], answer: 'take', explanation: "Kita 'take a risk' (mengambil risiko), bukan 'make' atau 'do'." },
  { id: 8, question: "I always ___ my promises.", options: ['hold', 'keep', 'save'], answer: 'keep', explanation: "'Keep a promise' (menepati janji) adalah frasa yang tepat." },
  { id: 9, question: "I think I'm going to ___ a cold.", options: ['get', 'catch', 'take'], answer: 'catch', explanation: "Kita 'catch a cold' (masuk angin/pilek), bukan 'get' atau 'take'." },
  { id: 10, question: "Let's ___ a chat over coffee.", options: ['make', 'do', 'have'], answer: 'have', explanation: "'Have a chat' (mengobrol) adalah kolokasi yang benar." },
  { id: 11, question: "I need ___  coffee to wake up.", options: ['hard', 'strong', 'heavy'], answer: 'strong', explanation: "Kita mengatakan 'strong coffee' (kopi kental), bukan 'heavy' atau 'hard'." },
  { id: 12, question: "This restaurant serves ___ food.", options: ['quick', 'fast', 'speedy'], answer: 'fast', explanation: "'Fast food' (makanan cepat saji) adalah istilah yang tepat." },
  { id: 13, question: "I'm looking for ___ quality products.", options: ['tall', 'high', 'big'], answer: 'high', explanation: "Kita mengatakan 'high quality' (kualitas tinggi), bukan 'tall' atau 'big'." },
  { id: 14, question: "I had a ___ sleep last night. I feel great!", options: ['heavy', 'deep', 'strong'], answer: 'deep', explanation: "'Deep sleep' (tidur nyenyak) adalah kolokasi yang benar." },
  { id: 15, question: "This is a ___ opportunity. Don't miss it!", options: ['silver', 'gold', 'golden'], answer: 'golden', explanation: "'Golden opportunity' (kesempatan emas) adalah frasa yang tepat." },
  { id: 16, question: "The doctor told me I'm ___ ill.", options: ['deeply', 'seriously', 'heavily'], answer: 'seriously', explanation: "'Seriously ill' (sakit parah) adalah kolokasi yang benar." },
  { id: 17, question: "I am ___ aware of the risks.", options: ['completely', 'fully', 'totally'], answer: 'fully', explanation: "'Fully aware' (sadar sepenuhnya) adalah frasa yang paling sering digunakan." },
  { id: 18, question: "This laptop is ___ recommended by experts.", options: ['strongly', 'highly', 'deeply'], answer: 'highly', explanation: "'Highly recommended' (sangat direkomendasikan) adalah kolokasi yang tepat." },
  { id: 19, question: "The weather is ___ cold today.", options: ['deeply', 'bitterly', 'highly'], answer: 'bitterly', explanation: "'Bitterly cold' (dingin yang menusuk) digunakan untuk cuaca sangat dingin." },
  { id: 20, question: "These two products are ___ different.", options: ['highly', 'completely', 'deeply'], answer: 'completely', explanation: "'Completely different' (berbeda sama sekali) adalah kolokasi yang tepat." }

];

const InterVocabLesson16: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 16);
    const nextLessonPath = 16 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${16+1}` : '/modul/english/intermediate';

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
                lessonLabel={"Intermediate Vocabulary Lesson 16"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Kolokasi"
                subtitle="Vocabulary • Pelajaran 16"
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
                  Kata Kerja
                </button>

                <button
                  onClick={() => setVocabSection('adjectives')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'adjectives' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Kata Sifat
                </button>

                <button
                  onClick={() => setVocabSection('adverbs')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'adverbs' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Kata Keterangan
                </button>

              </div>
      
                                
              {vocabSection === 'verbs' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Pasangan Tindakan</h3>
                      <p className="text-xs text-sky-700">Kata kerja tang cocok dengan kata benda tertentu.</p>
                    </div>
                  </div>
                  {renderVocabList(VERB_NOUN_COLLOCATIONS, 'sky')}
                </div>
              )}

              {vocabSection === 'adjectives' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Pasangan Deskripsi</h3>
                      <p className="text-xs text-sky-700">Kata sifat yang secara alami menggambarkan kata benda.</p>
                    </div>
                  </div>
                  {renderVocabList(ADJ_NOUN_COLLOCATIONS, 'sky')}
                </div>
              )}

              {vocabSection === 'adverbs' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Penguat</h3>
                      <p className="text-xs text-sky-700">Kata keterangan yang memperkuat kata sifat/kata kerja.</p>
                    </div>
                  </div>
                  {renderVocabList(INTENSIFIERS_VOCAB, 'sky')}
                </div>
              )}

                                { /* Bonus: Penggunaan Kata & Kolokasi Section */ }
                                <div className="mt-10 animate-fade-in">
                                    
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-lg font-bold text-slate-800">Make vs Do</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-2 text-sm uppercase">Make (Membuat/Menghasilkan)</h3>
                    <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                      <li>Make a mistake (Membuat kesalahan)</li>
                      <li>Make a plan (Membuat rencana)</li>
                      <li>Make money (Menghasilkan uang)</li>
                      <li>Make friends (Berteman)</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-green-800 mb-2 text-sm uppercase">Do (Tindakan/Pekerjaan)</h3>
                    <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                      <li>Do your best (Lakukan yang terbaik)</li>
                      <li>Do homework (Mengerjakan PR)</li>
                      <li>Do the dishes (Mencuci piring)</li>
                      <li>Do a favor (Membantu)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2 text-sm uppercase tracking-wide">Take vs Have</h3>
                <div className="bg-white p-3 rounded-lg border border-indigo-100/50">
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <b>Take</b> a break / a chance / a look / a seat</li>
                    <li>• <b>Have</b> a problem / a dream / a feeling / a party</li>
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

export default InterVocabLesson16;
