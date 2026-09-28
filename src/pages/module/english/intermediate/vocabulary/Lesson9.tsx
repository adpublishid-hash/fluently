import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const RELATIONSHIP_VOCAB = [

  { word: "Acquaintance", ipa: "/əˈkweɪntəns/", meaning: "Kenalan (bukan teman dekat)" },
  { word: "Peer", ipa: "/pɪər/", meaning: "Rekan sebaya / Sejawat" },
  { word: "Ancestor", ipa: "/ˈænsɛstər/", meaning: "Leluhur / Nenek moyang" },
  { word: "Spouse", ipa: "/spaʊs/", meaning: "Pasangan (Suami/Istri)" },
  { word: "Rival", ipa: "/ˈraɪvəl/", meaning: "Saingan" },
  { word: "Mentor", ipa: "/ˈmɛntɔːr/", meaning: "Pembimbing / Mentor" },
  { word: "Companion", ipa: "/kəmˈpænjən/", meaning: "Pendamping / Teman seperjalanan" },
  { word: "Associate", ipa: "/əˈsoʊʃiət/", meaning: "Rekan kerja / Sekutu" },
  { word: "Relative", ipa: "/ˈrɛlətɪv/", meaning: "Kerabat / Saudara" },
  { word: "Descendant", ipa: "/dɪˈsɛndənt/", meaning: "Keturunan" },

];

const COMMUNICATION_VOCAB = [

  { word: "Persuade", ipa: "/pərˈsweɪd/", meaning: "Membujuk" },
  { word: "Negotiate", ipa: "/nɪˈɡoʊʃieɪt/", meaning: "Bernegosiasi" },
  { word: "Interrupt", ipa: "/ˌɪntəˈrʌpt/", meaning: "Menyela / Memotong (pembicaraan)" },
  { word: "Clarify", ipa: "/ˈklærɪfaɪ/", meaning: "Mengklarifikasi / Menjelaskan" },
  { word: "Mumble", ipa: "/ˈmʌmbəl/", meaning: "Bergumam" },
  { word: "Gossip", ipa: "/ˈɡɒsɪp/", meaning: "Bergosip / Bergunjing" },
  { word: "Argue", ipa: "/ˈɑːrɡjuː/", meaning: "Berdebat / Bertengkar" },
  { word: "Discuss", ipa: "/dɪˈskʌs/", meaning: "Mendiskusikan" },
  { word: "Mention", ipa: "/ˈmɛnʃən/", meaning: "Menyebutkan" },
  { word: "Shout", ipa: "/ʃaʊt/", meaning: "Berteriak" },

];

const DYNAMICS_VOCAB = [

  { word: "Compromise", ipa: "/ˈkɒmprəmaɪz/", meaning: "Kompromi / Jalan tengah" },
  { word: "Conflict", ipa: "/ˈkɒnflɪkt/", meaning: "Konflik / Pertentangan" },
  { word: "Trust", ipa: "/trʌst/", meaning: "Kepercayaan" },
  { word: "Sympathy", ipa: "/ˈsɪmpəθi/", meaning: "Simpati" },
  { word: "Jealousy", ipa: "/ˈdʒɛləsi/", meaning: "Kecemburuan / Iri hati" },
  { word: "Tension", ipa: "/ˈtɛnʃən/", meaning: "Ketegangan" },
  { word: "Misunderstanding", ipa: "/ˌmɪsʌndərˈstændɪŋ/", meaning: "Kesalahpahaman" },
  { word: "Forgiveness", ipa: "/fərˈɡɪvnəs/", meaning: "Pengampunan / Memaafkan" },
  { word: "Loyalty", ipa: "/ˈlɔɪəlti/", meaning: "Kesetiaan" },
  { word: "Bond", ipa: "/bɒnd/", meaning: "Ikatan (emosional)" },

];

const QUIZ_QUESTIONS = [

  { id: 1, question: "A person you know slightly, but who is not a close friend, is an ___.", options: ['Ancestor', 'Acquaintance', 'Rival'], answer: 'Acquaintance', explanation: "Acquaintance (Kenalan) adalah seseorang yang Anda kenal, tetapi tidak secara intim." },
  { id: 2, question: "To speak very quietly and unclearly is to ___.", options: ['shout', 'mumble', 'clarify'], answer: 'mumble', explanation: "Mumble (Bergumam) membuat orang lain sulit mendengar atau memahami Anda." },
  { id: 3, question: "An agreement where both sides give up something is a ___.", options: ['conflict', 'tension', 'compromise'], answer: 'compromise', explanation: "Compromise (Kompromi) adalah penyelesaian perselisihan dengan masing-masing pihak membuat konsesi." },
  { id: 4, question: "It is rude to ___ someone when they are speaking.", options: ['interrupt', 'persuade', 'trust'], answer: 'interrupt', explanation: "Interrupt (Menyela) berarti menghentikan kemajuan berkelanjutan dari seseorang yang sedang berbicara." },
  { id: 5, question: "A feeling of unhappiness because someone has something you want is ___.", options: ['loyalty', 'jealousy', 'sympathy'], answer: 'jealousy', explanation: "Jealousy (Kecemburuan) adalah perasaan iri atau sakit hati." },
  { id: 6, question: "Your husband or wife is your ___.", options: ['peer', 'spouse', 'rival'], answer: 'spouse', explanation: "Spouse (Pasangan) adalah suami atau istri Anda." },
  { id: 7, question: "A person from a long time ago in your family is your ___.", options: ['descendant', 'ancestor', 'companion'], answer: 'ancestor', explanation: "Ancestor (Leluhur) adalah orang dari mana Anda berasal, dari generasi sebelumnya." },
  { id: 8, question: "Someone who competes against you is your ___.", options: ['mentor', 'rival', 'associate'], answer: 'rival', explanation: "Rival (Saingan) adalah orang yang bersaing dengan Anda." },
  { id: 9, question: "To try to make someone do something by giving reasons is to ___.", options: ['argue', 'persuade', 'gossip'], answer: 'persuade', explanation: "Persuade (Membujuk) berarti meyakinkan seseorang untuk melakukan sesuatu." },
  { id: 10, question: "To talk about other people's private lives is to ___.", options: ['discuss', 'gossip', 'mention'], answer: 'gossip', explanation: "Gossip (Bergosip) adalah percakapan kasual tentang orang lain, biasanya tidak akurat." },
  { id: 11, question: "To make something clear and easy to understand is to ___.", options: ['mumble', 'clarify', 'interrupt'], answer: 'clarify', explanation: "Clarify (Mengklarifikasi) berarti membuat sesuatu lebih jelas dan mudah dipahami." },
  { id: 12, question: "To ___ means to have an angry disagreement.", options: ['discuss', 'argue', 'mention'], answer: 'argue', explanation: "Argue (Berdebat) adalah memberikan alasan atau bukti untuk mendukung suatu ide atau tindakan." },
  { id: 13, question: "A serious disagreement is a ___.", options: ['bond', 'conflict', 'sympathy'], answer: 'conflict', explanation: "Conflict (Konflik) adalah ketidaksepakatan serius dan berkepanjangan." },
  { id: 14, question: "Firm belief in someone's reliability is ___.", options: ['tension', 'trust', 'jealousy'], answer: 'trust', explanation: "Trust (Kepercayaan) adalah keyakinan pada keandalan seseorang." },
  { id: 15, question: "Feelings of pity for someone's misfortune is ___.", options: ['jealousy', 'sympathy', 'loyalty'], answer: 'sympathy', explanation: "Sympathy (Simpati) adalah perasaan kasihan dan kesedihan atas kemalangan orang lain." },
  { id: 16, question: "A situation where people disagree creates ___.", options: ['bond', 'tension', 'forgiveness'], answer: 'tension', explanation: "Tension (Ketegangan) adalah perasaan khawatir yang disebabkan oleh kurangnya kepercayaan." },
  { id: 17, question: "When people don't understand each other, there is a ___.", options: ['bond', 'misunderstanding', 'compromise'], answer: 'misunderstanding', explanation: "Misunderstanding (Kesalahpahaman) adalah kegagalan untuk memahami sesuatu dengan benar." },
  { id: 18, question: "A teacher or experienced person who guides you is a ___.", options: ['peer', 'mentor', 'rival'], answer: 'mentor', explanation: "Mentor (Pembimbing) adalah penasihat atau guru yang berpengalaman." },
  { id: 19, question: "Strong support for a person or cause is ___.", options: ['loyalty', 'jealousy', 'tension'], answer: 'loyalty', explanation: "Loyalty (Kesetiaan) adalah dukungan kuat untuk seseorang atau kelompok." },
  { id: 20, question: "A close connection between people is a ___.", options: ['conflict', 'bond', 'misunderstanding'], answer: 'bond', explanation: "Bond (Ikatan) adalah perasaan persatuan yang kuat antara orang-orang." }

];

const InterVocabLesson9: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 9);
    const nextLessonPath = 9 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${9+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'people' | string>('people');

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
                lessonLabel={"Intermediate Vocabulary Lesson 9"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Hubungan & Komunikasi"
                subtitle="Vocabulary • Pelajaran 9"
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
                  onClick={() => setVocabSection('people')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'people' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Orang
                </button>

                <button
                  onClick={() => setVocabSection('comm')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'comm' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Gaya
                </button>

                <button
                  onClick={() => setVocabSection('dynamics')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'dynamics' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Dinamika
                </button>

              </div>
      
                                
              {vocabSection === 'people' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Peran Interpersonal</h3>
                      <p className="text-xs text-sky-700">Jenis hubungan.</p>
                    </div>
                  </div>
                  {renderVocabList(RELATIONSHIP_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'comm' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Gaya Komunikasi</h3>
                      <p className="text-xs text-sky-700">Cara kita berbicara dan berinteraksi.</p>
                    </div>
                  </div>
                  {renderVocabList(COMMUNICATION_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'dynamics' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Dinamika Hubungan</h3>
                      <p className="text-xs text-sky-700">Perasaan dan konflik.</p>
                    </div>
                  </div>
                  {renderVocabList(DYNAMICS_VOCAB, 'sky')}
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
                    <h3 className="font-bold text-blue-800 mb-2 text-sm uppercase">Menyelesaikan Masalah</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"We need to find a <b>compromise</b> to end this <b>conflict</b>."</p>
                    <p className="text-xs text-slate-500 mb-2">(Kita perlu mencari <b>kompromi</b> untuk mengakhiri <b>konflik</b> ini.)</p>
                    <p className="text-sm text-slate-700 italic">"Can you <b>clarify</b> what you mean to avoid a <b>misunderstanding</b>?"</p>
                    <p className="text-xs text-slate-500">(Bisakah Anda <b>menjelaskan</b> apa yang Anda maksud untuk menghindari <b>kesalahpahaman</b>?)</p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <h3 className="font-bold text-orange-800 mb-2 text-sm uppercase">Kehidupan Profesional</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"I tried to <b>persuade</b> my <b>colleague</b> to join the project."</p>
                    <p className="text-xs text-slate-500 mb-2">(Saya mencoba untuk <b>membujuk</b> <b>rekan</b> saya untuk bergabung dengan proyek.)</p>
                    <p className="text-sm text-slate-700 italic">"He is my <b>mentor</b>, not just an <b>acquaintance</b>."</p>
                    <p className="text-xs text-slate-500">(Dia adalah <b>mentor</b> saya, bukan hanya <b>kenalan</b>.)</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2 text-sm uppercase tracking-wide">Kolokasi Umum</h3>
                <div className="bg-white p-3 rounded-lg border border-indigo-100/50">
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <b>Build</b> trust (Membangun kepercayaan)</li>
                    <li>• <b>Resolve</b> conflict (Menyelesaikan konflik)</li>
                    <li>• <b>Express</b> sympathy (Menyatakan simpati)</li>
                    <li>• <b>Reach</b> a compromise (Mencapai kesepakatan)</li>
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

export default InterVocabLesson9;
