import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const COMMON_IDIOMS = [

  { word: "A piece of cake", ipa: "/ə piːs ʌv keɪk/", meaning: "Sangat mudah" },
  { word: "Break a leg", ipa: "/breɪk ə lɛɡ/", meaning: "Semoga sukses (untuk pertunjukan)" },
  { word: "Cost an arm and a leg", ipa: "/kɒst ən ɑːrm ənd ə lɛɡ/", meaning: "Sangat mahal" },
  { word: "Hit the books", ipa: "/hɪt ðə bʊks/", meaning: "Belajar dengan giat" },
  { word: "Let the cat out of the bag", ipa: "/lɛt ðə kæt aʊt ʌv ðə bæɡ/", meaning: "Membocorkan rahasia" },
  { word: "When pigs fly", ipa: "/wɛn pɪɡz flaɪ/", meaning: "Sesuatu yang tidak mungkin terjadi" },
  { word: "See eye to eye", ipa: "/siː aɪ tuː aɪ/", meaning: "Setuju / Sepaham" },
  { word: "Kill two birds with one stone", ipa: "/kɪl tuː bɜːrdz wɪð wʌn stoʊn/", meaning: "Sekali dayung dua pulau terlampaui" },
  { word: "Speak of the devil", ipa: "/spiːk ʌv ðə ˈdɛvəl/", meaning: "Panjang umur (orang yang dibicarakan muncul)" },
  { word: "Once in a blue moon", ipa: "/wʌns ɪn ə bluː muːn/", meaning: "Sangat jarang" },

];

const EMOTIONAL_IDIOMS = [

  { word: "Over the moon", ipa: "/ˈoʊvər ðə muːn/", meaning: "Sangat bahagia" },
  { word: "Feeling blue", ipa: "/ˈfiːlɪŋ bluː/", meaning: "Merasa sedih" },
  { word: "Butterflies in stomach", ipa: "/ˈbʌtərflaɪz ɪn ˈstʌmək/", meaning: "Gugup / Deg-degan" },
  { word: "Under the weather", ipa: "/ˈʌndər ðə ˈwɛðər/", meaning: "Kurang sehat / Sakit ringan" },
  { word: "On cloud nine", ipa: "/ɒn klaʊd naɪn/", meaning: "Sangat gembira" },
  { word: "Down in the dumps", ipa: "/daʊn ɪn ðə dʌmps/", meaning: "Sedih / Depresi" },
  { word: "On edge", ipa: "/ɒn ɛdʒ/", meaning: "Tegang / Gelisah" },
  { word: "Lose your temper", ipa: "/luːz jʊər ˈtɛmpər/", meaning: "Marah besar / Hilang kesabaran" },
  { word: "Drive someone crazy", ipa: "/draɪv ˈsʌmwʌn ˈkreɪzi/", meaning: "Membuat orang gila/kesal" },
  { word: "Green with envy", ipa: "/ɡriːn wɪð ˈɛnvi/", meaning: "Sangat iri" },

];

const ACTION_IDIOMS = [

  { word: "Hang in there", ipa: "/hæŋ ɪn ðɛər/", meaning: "Jangan menyerah / Bertahanlah" },
  { word: "Call it a day", ipa: "/kɔːl ɪt ə deɪ/", meaning: "Berhenti bekerja hari ini" },
  { word: "Cut corners", ipa: "/kʌt ˈkɔːrnərz/", meaning: "Mengambil jalan pintas (hemat biaya/kualitas)" },
  { word: "Get out of hand", ipa: "/ɡɛt aʊt ʌv hænd/", meaning: "Tak terkendali" },
  { word: "Miss the boat", ipa: "/mɪs ðə boʊt/", meaning: "Kehilangan kesempatan" },
  { word: "Pull yourself together", ipa: "/pʊl jərˈsɛlf təˈɡɛðər/", meaning: "Tenangkan diri / Sadarlah" },
  { word: "So far so good", ipa: "/soʊ fɑːr soʊ ɡʊd/", meaning: "Sejauh ini baik-baik saja" },
  { word: "The best of both worlds", ipa: "/ðə bɛst ʌv boʊθ wɜːrldz/", meaning: "Situasi ideal / Menang banyak" },
  { word: "Time flies", ipa: "/taɪm flaɪz/", meaning: "Waktu berlalu cepat" },
  { word: "Hit the sack", ipa: "/hɪt ðə sæk/", meaning: "Pergi tidur" },

];

const QUIZ_QUESTIONS = [

  { id: 1, question: "The exam was very easy. It was ___.", options: ['a piece of cake', 'under the weather', 'out of hand'], answer: 'a piece of cake', explanation: "'A piece of cake' berarti sesuatu yang sangat mudah dilakukan." },
  { id: 2, question: "I'm not feeling well today. I'm feeling a bit ___.", options: ['over the moon', 'under the weather', 'on cloud nine'], answer: 'under the weather', explanation: "'Under the weather' berarti merasa sakit atau tidak enak badan." },
  { id: 3, question: "Stop crying and ___! We need to solve this.", options: ['pull yourself together', 'call it a day', 'miss the boat'], answer: 'pull yourself together', explanation: "'Pull yourself together' berarti menenangkan diri dan bersikap normal." },
  { id: 4, question: "I rarely go to the cinema. Only ___.", options: ['when pigs fly', 'once in a blue moon', 'so far so good'], answer: 'once in a blue moon', explanation: "'Once in a blue moon' berarti sangat jarang." },
  { id: 5, question: "We agree on everything. We ___.", options: ['see eye to eye', 'cut corners', 'hit the sack'], answer: 'see eye to eye', explanation: "'See eye to eye' berarti setuju sepenuhnya dengan seseorang." },
  { id: 6, question: "She was ___ when she won the competition.", options: ['feeling blue', 'over the moon', 'under the weather'], answer: 'over the moon', explanation: "'Over the moon' berarti sangat bahagia/gembira." },
  { id: 7, question: "Before the interview, I felt ___ in my stomach.", options: ['butterflies', 'birds', 'fish'], answer: 'butterflies', explanation: "'Butterflies in the stomach' berarti gugup atau deg-degan." },
  { id: 8, question: "That car must ___. It looks so expensive!", options: ['cost an arm and a leg', 'break a leg', 'hit the books'], answer: 'cost an arm and a leg', explanation: "'Cost an arm and a leg' berarti sangat mahal." },
  { id: 9, question: "Good luck with your performance tonight! ___!", options: ['Break a leg', 'Kill two birds', 'Hit the books'], answer: 'Break a leg', explanation: "'Break a leg' digunakan untuk mengucapkan semoga sukses, terutama untuk pertunjukan." },
  { id: 10, question: "They discovered his secret. Someone ___.", options: ['hit the sack', 'let the cat out of the bag', 'cut corners'], answer: 'let the cat out of the bag', explanation: "'Let the cat out of the bag' berarti membocorkan rahas ia." },
  { id: 11, question: "Him becoming a billionaire? That will happen ___!", options: ['once in a blue moon', 'when pigs fly', 'so far so good'], answer: 'when pigs fly', explanation: "'When pigs fly' berarti sesuatu yang tidak mungkin terjadi." },
  { id: 12, question: "By shopping on sale, I can ___.", options: ['cut corners', 'kill two birds with one stone', 'call it a day'], answer: 'kill two birds with one stone', explanation: "'Kill two birds with one stone' berarti menyelesaikan dua hal sekaligus." },
  { id: 13, question: "I'm tired. Let's ___ and go home.", options: ['call it a day', 'hit the books', 'hang in there'], answer: 'call it a day', explanation: "'Call it a day' berarti berhenti bekerja untuk hari ini." },
  { id: 14, question: "The project is difficult, but ___ so far.", options: ['miss the boat', 'so far so good', 'get out of hand'], answer: 'so far so good', explanation: "'So far so good' berarti sejauh ini baik-baik saja." },
  { id: 15, question: "I'm so tired. I need to ___.", options: ['hit the sack', 'hit the books', 'hit the road'], answer: 'hit the sack', explanation: "'Hit the sack' berarti pergi tidur." },
  { id: 16, question: "She was ___ with envy when she saw the new car.", options: ['red', 'green', 'blue'], answer: 'green', explanation: "'Green with envy' berarti sangat iri hati." },
  { id: 17, question: "I forgot to register. I think I ___.", options: ['hit the sack', 'missed the boat', 'cut corners'], answer: 'missed the boat', explanation: "'Miss the boat' berarti kehilangan kesempatan." },
  { id: 18, question: "The situation is starting to ___.", options: ['get out of hand', 'hang in there', 'call it a day'], answer: 'get out of hand', explanation: "'Get out of hand' berarti menjadi tak terkendali." },
  { id: 19, question: "Don't give up! ___ and keep trying!", options: ['Hit the sack', 'Hang in there', 'Cut corners'], answer: 'Hang in there', explanation: "'Hang in there' berarti bertahan dan jangan menyerah." },
  { id: 20, question: "I need to ___ for tomorrow's exam.", options: ['hit the books', 'hit the sack', 'see eye to eye'], answer: 'hit the books', explanation: "'Hit the books' berarti belajar dengan giat." }

];

const InterVocabLesson13: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 13);
    const nextLessonPath = 13 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${13+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'common' | string>('common');

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
                lessonLabel={"Intermediate Vocabulary Lesson 13"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Idiom & Ungkapan"
                subtitle="Vocabulary • Pelajaran 13"
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
                  onClick={() => setVocabSection('common')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'common' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Umum
                </button>

                <button
                  onClick={() => setVocabSection('emotions')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'emotions' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Emosi
                </button>

                <button
                  onClick={() => setVocabSection('actions')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'actions' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Tindakan
                </button>

              </div>
      
                                
              {vocabSection === 'common' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Idiom Sehari-hari</h3>
                      <p className="text-xs text-sky-700">Ungkapan yang sering digunakan.</p>
                    </div>
                  </div>
                  {renderVocabList(COMMON_IDIOMS, 'sky')}
                </div>
              )}

              {vocabSection === 'emotions' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Perasaan & Suasana Hati</h3>
                      <p className="text-xs text-sky-700">Mengekspresikan perasaan Anda.</p>
                    </div>
                  </div>
                  {renderVocabList(EMOTIONAL_IDIOMS, 'sky')}
                </div>
              )}

              {vocabSection === 'actions' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Tindakan & Usaha</h3>
                      <p className="text-xs text-sky-700">Melakukan sesuatu dan mencoba.</p>
                    </div>
                  </div>
                  {renderVocabList(ACTION_IDIOMS, 'sky')}
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
                    <h3 className="font-bold text-blue-800 mb-2 text-sm uppercase">Di Kantor/Sekolah</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"The exam was <b>a piece of cake</b>." (Ujiannya sangat mudah)</p>
                    <p className="text-sm text-slate-700 italic">"I'm tired, let's <b>call it a day</b>." (Ayo berhenti kerja hari ini)</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-green-800 mb-2 text-sm uppercase">Kehidupan Pribadi</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"I was <b>over the moon</b> when I got the gift." (Sangat bahagia)</p>
                    <p className="text-sm text-slate-700 italic">"Sorry I can't come, I'm feeling <b>under the weather</b>." (Agak sakit)</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2 text-sm uppercase tracking-wide">Tips untuk Pelajar</h3>
                <div className="bg-white p-3 rounded-lg border border-indigo-100/50">
                  <p className="text-sm text-slate-700">
                    Idiom tidak bisa diterjemahkan kata per kata. <br />
                    Contoh: "Break a leg" TIDAK berarti mematahkan tulang! Itu berarti "Semoga sukses".
                    Konteks adalah kunci untuk memahaminya.
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

export default InterVocabLesson13;
