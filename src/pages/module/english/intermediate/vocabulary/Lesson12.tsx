import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const RELATIONSHIP_PHRASAL = [

  { word: "Get along", ipa: "/ɡɛt əˈlɔːŋ/", meaning: "Akur / Memiliki hubungan baik" },
  { word: "Break up", ipa: "/breɪk ʌp/", meaning: "Putus (hubungan)" },
  { word: "Look after", ipa: "/lʊk ˈæftər/", meaning: "Merawat / Menjaga" },
  { word: "Grow up", ipa: "/ɡroʊ ʌp/", meaning: "Tumbuh dewasa" },
  { word: "Calm down", ipa: "/kɑːm daʊn/", meaning: "Tenang / Menenangkan diri" },
  { word: "Let down", ipa: "/lɛt daʊn/", meaning: "Mengecewakan" },
  { word: "Cheer up", ipa: "/tʃɪər ʌp/", meaning: "Menghibur / Menjadi ceria" },
  { word: "Count on", ipa: "/kaʊnt ɒn/", meaning: "Mengandalkan" },
  { word: "Look up to", ipa: "/lʊk ʌp tuː/", meaning: "Mengagumi / Menghormati" },
  { word: "Take after", ipa: "/teɪk ˈæftər/", meaning: "Mirip (sifat/wajah dengan ortu)" },

];

const WORK_STUDY_PHRASAL = [

  { word: "Find out", ipa: "/faɪnd aʊt/", meaning: "Mengetahui / Menemukan info" },
  { word: "Figure out", ipa: "/ˈfɪɡjər aʊt/", meaning: "Memecahkan masalah / Memahami" },
  { word: "Call off", ipa: "/kɔːl ɒf/", meaning: "Membatalkan" },
  { word: "Put off", ipa: "/pʊt ɒf/", meaning: "Menunda" },
  { word: "Carry on", ipa: "/ˈkæri ɒn/", meaning: "Melanjutkan" },
  { word: "Fill out", ipa: "/fɪl aʊt/", meaning: "Mengisi (formulir)" },
  { word: "Give up", ipa: "/ɡɪv ʌp/", meaning: "Menyerah / Berhenti (kebiasaan)" },
  { word: "Keep up with", ipa: "/kiːp ʌp wɪð/", meaning: "Mengimbangi / Mengikuti" },
  { word: "Hand in", ipa: "/hænd ɪn/", meaning: "Mengumpulkan (tugas)" },
  { word: "Look into", ipa: "/lʊk ˈɪntuː/", meaning: "Menyelidiki / Memeriksa" },

];

const DAILY_LIFE_PHRASAL = [

  { word: "Set off", ipa: "/sɛt ɒf/", meaning: "Berangkat (perjalanan)" },
  { word: "Pick up", ipa: "/pɪk ʌp/", meaning: "Menjemput / Mengambil" },
  { word: "Drop off", ipa: "/drɒp ɒf/", meaning: "Mengantar / Menurunkan" },
  { word: "Run out of", ipa: "/rʌn aʊt ɒv/", meaning: "Kehabisan" },
  { word: "Look forward to", ipa: "/lʊk ˈfɔːrwərd tuː/", meaning: "Menantikan / Tidak sabar" },
  { word: "Put up with", ipa: "/pʊt ʌp wɪð/", meaning: "Menoleransi / Bersabar terhadap" },
  { word: "Throw away", ipa: "/θroʊ əˈweɪ/", meaning: "Membuang" },
  { word: "Cut down on", ipa: "/kʌt daʊn ɒn/", meaning: "Mengurangi (konsumsi)" },
  { word: "Go on", ipa: "/ɡoʊ ɒn/", meaning: "Terjadi / Berlangsung" },
  { word: "Turn into", ipa: "/tɜːrn ˈɪntuː/", meaning: "Berubah menjadi" },

];

const QUIZ_QUESTIONS = [

  { id: 1, question: "I need someone to ___ my cat while I am on holiday.", options: ['look up', 'look for', 'look after'], answer: 'look after', explanation: "Look after (Merawat) berarti menjaga seseorang atau sesuatu." },
  { id: 2, question: "The meeting was ___ because the boss was sick.", options: ['set off', 'carried on', 'called off'], answer: 'called off', explanation: "Call off (Membatalkan) berarti membatalkan suatu acara." },
  { id: 3, question: "We have ___ milk. I need to buy more.", options: ['cut down on', 'filled out', 'run out of'], answer: 'run out of', explanation: "Run out of (Kehabisan) berarti Anda telah menggunakan semuanya." },
  { id: 4, question: "Don't ___! You can do it.", options: ['cheer up', 'grow up', 'give up'], answer: 'give up', explanation: "Give up (Menyerah) berarti berhenti mencoba." },
  { id: 5, question: "I really ___ my older brother. He is so smart.", options: ['look down on', 'look into', 'look up to'], answer: 'look up to', explanation: "Look up to (Mengagumi) berarti mengagumi dan menghormati seseorang." },
  { id: 6, question: "They ___ after 5 years of marriage.", options: ['cheered up', 'made up', 'broke up'], answer: 'broke up', explanation: "Break up (Putus) berarti mengakhiri hubungan." },
  { id: 7, question: "Children ___ so fast these days!", options: ['break up', 'give up', 'grow up'], answer: 'grow up', explanation: "Grow up (Tumbuh dewasa) berarti menjadi dewasa." },
  { id: 8, question: "You can ___ me. I will help you.", options: ['count on', 'look after', 'take after'], answer: 'count on', explanation: "Count on (Mengandalkan) berarti percaya bahwa seseorang akan membantu." },
  { id: 9, question: "Please ___ this form with your personal information.", options: ['figure out', 'fill out', 'find out'], answer: 'fill out', explanation: "Fill out (Mengisi) berarti mengisi formulir atau dokumen." },
  { id: 10, question: "I finally___ the answer to the problem!", options: ['figured out', 'gave up', 'put off'], answer: 'figured out', explanation: "Figure out (Memecahkan) berarti menemukan solusi atau jawaban." },
  { id: 11, question: "The investigation will ___ the cause of the accident.", options: ['look up to', 'look after', 'look into'], answer: 'look into', explanation: "Look into (Menyelidiki) berarti memeriksa atau menyelidiki sesuatu." },
  { id: 12, question: "I need to ___ smoking for my health.", options: ['grow up', 'give up', 'pick up'], answer: 'give up', explanation: "Give up berarti berhenti melakukan kebiasaan buruk." },
  { id: 13, question: "We will ___ at 6 AM tomorrow.", options: ['put off', 'call off', 'set off'], answer: 'set off', explanation: "Set off (Berangkat) berarti memulai perjalanan." },
  { id: 14, question: "Can you ___ me at the airport?", options: ['throw away', 'pick up', 'drop off'], answer: 'pick up', explanation: "Pick up (Menjemput) berarti mengambil seseorang dengan kendaraan." },
  { id: 15, question: "I ___ my mother; we have the same personality.", options: ['look after', 'take after', 'look up to'], answer: 'take after', explanation: "Take after (Mirip) berarti menyerupai orang tua atau kerabat." },
  { id: 16, question: "I really ___ meeting you next week!", options: ['run out of', 'put up with', 'look forward to'], answer: 'look forward to', explanation: "Look forward to (Menantikan) berarti dengan senang hati menunggu sesuatu." },
  { id: 17, question: "I can't ___ this noise anymore!", options: ['put up with', 'cheer up', 'pick up'], answer: 'put up with', explanation: "Put up with (Menoleransi) berarti bertahan terhadap sesuatu yang tidak menyenangkan." },
  { id: 18, question: "Please don't ___ these old photos.", options: ['hand in', 'throw away', 'carry on'], answer: 'throw away', explanation: "Throw away (Membuang) berarti membuang sesuatu." },
  { id: 19, question: "Despite the problems, we decided to ___.", options: ['call off', 'drop off', 'carry on'], answer: 'carry on', explanation: "Carry on (Melanjutkan) berarti terus melakukan sesuatu." },
  { id: 20, question: "I need to ___ on coffee; I drink too much.", options: ['cut down on', 'keep up with', 'look up to'], answer: 'cut down on', explanation: "Cut down on (Mengurangi) berarti mengurangi konsumsi atau penggunaan." }

];

const InterVocabLesson12: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 12);
    const nextLessonPath = 12 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${12+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'relationships' | string>('relationships');

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
                lessonLabel={"Intermediate Vocabulary Lesson 12"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Frasa Kerja Umum"
                subtitle="Vocabulary • Pelajaran 12"
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
                  onClick={() => setVocabSection('relationships')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'relationships' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Hubungan
                </button>

                <button
                  onClick={() => setVocabSection('work')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'work' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Kerja & Belajar
                </button>

                <button
                  onClick={() => setVocabSection('life')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'life' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Kehidupan Sehari-hari
                </button>

              </div>
      
                                
              {vocabSection === 'relationships' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Orang & Perasaan</h3>
                      <p className="text-xs text-sky-700">Interaksi dan emosi.</p>
                    </div>
                  </div>
                  {renderVocabList(RELATIONSHIP_PHRASAL, 'sky')}
                </div>
              )}

              {vocabSection === 'work' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Kerja & Kemajuan</h3>
                      <p className="text-xs text-sky-700">Tugas, solusi, dan tindakan.</p>
                    </div>
                  </div>
                  {renderVocabList(WORK_STUDY_PHRASAL, 'sky')}
                </div>
              )}

              {vocabSection === 'life' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Kehidupan Sehari-hari</h3>
                      <p className="text-xs text-sky-700">Rutinitas dan tindakan perjalanan.</p>
                    </div>
                  </div>
                  {renderVocabList(DAILY_LIFE_PHRASAL, 'sky')}
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
                    <p className="text-sm text-slate-700 italic mb-1">"The manager decided to <b>call off</b> the meeting."</p>
                    <p className="text-xs text-slate-500 mb-2">(Manajer memutuskan untuk <b>membatalkan</b> rapat.)</p>
                    <p className="text-sm text-slate-700 italic">"Can you <b>figure out</b> why the printer isn't working?"</p>
                    <p className="text-xs text-slate-500">(Bisakah kamu <b>mencari tahu</b> mengapa printernya tidak bekerja?)</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-green-800 mb-2 text-sm uppercase">Tujuan Pribadi</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"I need to <b>cut down on</b> sugar to lose weight."</p>
                    <p className="text-xs text-slate-500 mb-2">(Saya perlu <b>mengurangi</b> gula untuk menurunkan berat badan.)</p>
                    <p className="text-sm text-slate-700 italic">"I decided to <b>give up</b> smoking."</p>
                    <p className="text-xs text-slate-500">(Saya memutuskan untuk <b>berhenti</b> merokok.)</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2 text-sm uppercase tracking-wide">Kolokasi Umum</h3>
                <div className="bg-white p-3 rounded-lg border border-indigo-100/50">
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <b>Fill out</b> a form (Mengisi formulir)</li>
                    <li>• <b>Look forward to</b> the weekend (Menunggu akhir pekan)</li>
                    <li>• <b>Run out of</b> time (Kehabisan waktu)</li>
                    <li>• <b>Get along with</b> colleagues (Akur dengan rekan kerja)</li>
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

export default InterVocabLesson12;
