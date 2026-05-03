import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Trophy, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const PROBLEMS_OBSTACLES = [

  { word: "Issue", ipa: "/ˈɪʃuː/", meaning: "Masalah / Pokok persoalan" },
  { word: "Obstacle", ipa: "/ˈɒbstəkəl/", meaning: "Hambatan / Rintangan" },
  { word: "Dilemma", ipa: "/dɪˈlɛmə/", meaning: "Dilema (Pilihan sulit)" },
  { word: "Crisis", ipa: "/ˈkraɪsɪs/", meaning: "Krisis / Keadaan gawat" },
  { word: "Complication", ipa: "/ˌkɒmplɪˈkeɪʃən/", meaning: "Komplikasi / Kerumitan" },
  { word: "Disaster", ipa: "/dɪˈzɑːstər/", meaning: "Bencana / Malapetaka" },
  { word: "Error", ipa: "/ˈɛrər/", meaning: "Kesalahan (teknis/sistem)" },
  { word: "Fault", ipa: "/fɔːlt/", meaning: "Kesalahan (tanggung jawab)" },
  { word: "Shortage", ipa: "/ˈʃɔːrtɪdʒ/", meaning: "Kekurangan / Kelangkaan" },
  { word: "Struggle", ipa: "/ˈstrʌɡəl/", meaning: "Perjuangan / Kesulitan" },

];

const MANAGING_SOLVING = [

  { word: "Handle", ipa: "/ˈhændl/", meaning: "Menangani / Mengatasi" },
  { word: "Resolve", ipa: "/rɪˈzɒlv/", meaning: "Menyelesaikan (masalah)" },
  { word: "Deal with", ipa: "/diːl wɪð/", meaning: "Berurusan dengan / Menangani" },
  { word: "Fix", ipa: "/fɪks/", meaning: "Memperbaiki" },
  { word: "Improve", ipa: "/ɪmˈpruːv/", meaning: "Meningkatkan / Memperbaiki" },
  { word: "Prevent", ipa: "/prɪˈvɛnt/", meaning: "Mencegah" },
  { word: "Avoid", ipa: "/əˈvɔɪd/", meaning: "Menghindari" },
  { word: "Solution", ipa: "/səˈluːʃən/", meaning: "Solusi / Jalan keluar" },
  { word: "Advice", ipa: "/ədˈvaɪs/", meaning: "Nasihat / Saran" },
  { word: "Alternative", ipa: "/ɔːlˈtɜːrnətɪv/", meaning: "Alternatif / Pilihan lain" },

];

const DESCRIPTIVE_ADJECTIVES = [

  { word: "Urgent", ipa: "/ˈɜːrdʒənt/", meaning: "Mendesak / Penting" },
  { word: "Serious", ipa: "/ˈsɪəriəs/", meaning: "Serius / Parah" },
  { word: "Minor", ipa: "/ˈmaɪnər/", meaning: "Kecil / Tidak penting" },
  { word: "Temporary", ipa: "/ˈtɛmpərɛri/", meaning: "Sementara" },
  { word: "Permanent", ipa: "/ˈpɜːrmənənt/", meaning: "Permanen / Tetap" },
  { word: "Unexpected", ipa: "/ˌʌnɪkˈspɛktɪd/", meaning: "Tidak terduga" },
  { word: "Awkward", ipa: "/ˈɔːkwərd/", meaning: "Canggung / Tidak nyaman" },
  { word: "Complicated", ipa: "/ˈkɒmplɪkeɪtɪd/", meaning: "Rumit / Kompleks" },
  { word: "Stressful", ipa: "/ˈstrɛsfʊl/", meaning: "Menegangkan" },
  { word: "Dangerous", ipa: "/ˈdeɪndʒərəs/", meaning: "Berbahaya" },

];

const QUIZ_QUESTIONS = [

  { id: 1, question: "We have a ___ with the computer system; it won't turn on.", options: ['solution', 'issue', 'success'], answer: 'issue', explanation: "Issue (Masalah) adalah masalah atau topik yang akan dibahas." },
  { id: 2, question: "This problem is very ___. We need to fix it right now!", options: ['minor', 'urgent', 'temporary'], answer: 'urgent', explanation: "Urgent (Mendesak) berarti membutuhkan tindakan segera." },
  { id: 3, question: "I don't know what to choose. I am in a ___.", options: ['dilemma', 'joy', 'habit'], answer: 'dilemma', explanation: "Dilemma (Dilema) adalah situasi di mana pilihan sulit harus dibuat." },
  { id: 4, question: "Can you ___ this situation? I am too busy.", options: ['handle', 'create', 'break'], answer: 'handle', explanation: "Handle (Menangani) berarti mengelola atau menghadapi situasi." },
  { id: 5, question: "It was an ___ moment when I forgot his name.", options: ['awkward', 'urgent', 'efficient'], answer: 'awkward', explanation: "Awkward (Canggung) berarti menyebabkan atau merasakan rasa malu." },
  { id: 6, question: "There was a ___ blocking the road after the accident.", options: ['solution', 'obstacle', 'alternative'], answer: 'obstacle', explanation: "Obstacle (Hambatan) adalah sesuatu yang menghalangi kemajuan." },
  { id: 7, question: "The country is facing an economic ___.", options: ['crisis', 'advice', 'solution'], answer: 'crisis', explanation: "Crisis (Krisis) adalah waktu kesulitan atau bahaya yang intens." },
  { id: 8, question: "We need to ___ this problem before it gets worse.", options: ['create', 'resolve', 'complicate'], answer: 'resolve', explanation: "Resolve (Menyelesaikan) berarti menemukan solusi untuk masalah." },
  { id: 9, question: "Can you ___ this broken chair?", options: ['fix', 'break', 'avoid'], answer: 'fix', explanation: "Fix (Memperbaiki) berarti memperbaiki sesuatu yang rusak." },
  { id: 10, question: "We should ___ problems before they happen.", options: ['create', 'prevent', 'complicate'], answer: 'prevent', explanation: "Prevent (Mencegah) berarti menghentikan sesuatu terjadi." },
  { id: 11, question: "There's a water ___  in the city.", options: ['complication', 'shortage', 'alternative'], answer: 'shortage', explanation: "Shortage (Kekurangan) adalahkurangnya sesuatu yang dibutuhkan." },
  { id: 12, question: "The earthquake was a terrible ___.", options: ['disaster', 'advice', 'solution'], answer: 'disaster', explanation: "Disaster (Bencana) adalah kejadian yang menyebabkan kerusakan besar." },
  { id: 13, question: "This problem is only ___. It will be fixed soon.", options: ['permanent', 'temporary', 'serious'], answer: 'temporary', explanation: "Temporary (Sementara) berarti berlangsung untuk waktu yang terbatas." },
  { id: 14, question: "It was an ___ surprise when he showed up.", options: ['expected', 'unexpected', 'appropriate'], answer: 'unexpected', explanation: "Unexpected (Tidak terduga) berarti tidak diantisipasi." },
  { id: 15, question: "This is a ___ situation that requires careful attention.", options: ['minor', 'serious', 'temporary'], answer: 'serious', explanation: "Serious (Serius) berarti memerlukan pemikiran atau tindakan yang cermat." },
  { id: 16, question: "We need to ___ with this customer complaint.", options: ['avoid', 'deal with', 'create'], answer: 'deal with', explanation: "'Deal with' (Menangani) berarti mengambil tindakan untuk menyelesaikan sesuatu." },
  { id: 17, question: "Can you suggest an ___ solution?", options: ['alternative', 'complication', 'error'], answer: 'alternative', explanation: "Alternative (Alternatif) adalah pilihan lain yang tersedia." },
  { id: 18, question: "We need to ___ the quality of our products.", options: ['worsen', 'improve', 'complicate'], answer: 'improve', explanation: "Improve (Meningkatkan) berarti membuat sesuatu menjadi lebih baik." },
  { id: 19, question: "It's a very ___ task that will take many hours.", options: ['simple', 'complicated', 'minor'], answer: 'complicated', explanation: "Complicated (Rumit) berarti terdiri dari banyak bagian yang saling terkait." },
  { id: 20, question: "This mistake was my ___. I'm sorry.", options: ['solution', 'advice', 'fault'], answer: 'fault', explanation: "Fault (Kesalahan) berarti tanggung jawab atas kesalahan." }

];

const InterVocabLesson14: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 14);
    const nextLessonPath = 14 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${14+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'problems' | string>('problems');

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
                lessonLabel={"Intermediate Vocabulary Lesson 14"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Situasi & Masalah"
                subtitle="Vocabulary • Pelajaran 14"
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
                  onClick={() => setVocabSection('problems')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'problems' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Masalah
                </button>

                <button
                  onClick={() => setVocabSection('solutions')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'solutions' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Solusi
                </button>

                <button
                  onClick={() => setVocabSection('adjectives')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'adjectives' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Kata Sifat
                </button>

              </div>
      
                                
              {vocabSection === 'problems' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Kesulitan</h3>
                      <p className="text-xs text-sky-700">Tantangan dan hambatan.</p>
                    </div>
                  </div>
                  {renderVocabList(PROBLEMS_OBSTACLES, 'sky')}
                </div>
              )}

              {vocabSection === 'solutions' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Mengelola & Menyelesaikan</h3>
                      <p className="text-xs text-sky-700">Kata kerja tindakan untuk memperbaiki sesuatu.</p>
                    </div>
                  </div>
                  {renderVocabList(MANAGING_SOLVING, 'sky')}
                </div>
              )}

              {vocabSection === 'adjectives' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Kata Deskriptif</h3>
                      <p className="text-xs text-sky-700">Menggambarkan sifat suatu situasi.</p>
                    </div>
                  </div>
                  {renderVocabList(DESCRIPTIVE_ADJECTIVES, 'sky')}
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
                    <p className="text-sm text-slate-700 italic mb-1">"We need to <b>resolve</b> this <b>issue</b> before the deadline."</p>
                    <p className="text-xs text-slate-500 mb-2">(Kita perlu <b>menyelesaikan</b> <b>masalah</b> ini sebelum tenggat waktu.)</p>
                    <p className="text-sm text-slate-700 italic">"It is an <b>urgent</b> matter, so please <b>handle</b> it quickly."</p>
                    <p className="text-xs text-slate-500">(Ini adalah masalah <b>mendesak</b>, jadi tolong <b>tangani</b> dengan cepat.)</p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <h3 className="font-bold text-purple-800 mb-2 text-sm uppercase">Kehidupan Pribadi</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"I faced a <b>dilemma</b>: should I stay or go?"</p>
                    <p className="text-xs text-slate-500 mb-2">(Saya menghadapi <b>dilemma</b>: haruskah saya tinggal atau pergi?)</p>
                    <p className="text-sm text-slate-700 italic">"It was an <b>awkward</b> situation, but we managed to <b>fix</b> it."</p>
                    <p className="text-xs text-slate-500">(Itu adalah situasi yang <b>canggung</b>, tapi kami berhasil <b>memperbaikinya</b>.)</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2 text-sm uppercase tracking-wide">Kolokasi Umum</h3>
                <div className="bg-white p-3 rounded-lg border border-indigo-100/50">
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <b>Face</b> an obstacle (Menghadapi rintangan)</li>
                    <li>• <b>Offer</b> a solution (Menawarkan solusi)</li>
                    <li>• <b>Make</b> a mistake (Membuat kesalahan)</li>
                    <li>• <b>Avoid</b> trouble (Menghindari masalah)</li>
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

export default InterVocabLesson14;
