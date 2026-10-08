import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const MILESTONES_VOCAB = [

  { word: "Graduation", ipa: "/ˌɡrædʒuˈeɪʃən/", meaning: "Kelulusan / Wisuda" },
  { word: "Promotion", ipa: "/prəˈmoʊʃən/", meaning: "Kenaikan pangkat" },
  { word: "Retirement", ipa: "/rɪˈtaɪərmənt/", meaning: "Masa pensiun" },
  { word: "Marriage", ipa: "/ˈmærɪdʒ/", meaning: "Pernikahan" },
  { word: "Anniversary", ipa: "/ˌænɪˈvɜːrsəri/", meaning: "Hari peringatan tahunan" },
  { word: "Childhood", ipa: "/ˈtʃaɪldhʊd/", meaning: "Masa kecil" },
  { word: "Adulthood", ipa: "/ˈædʌlthʊd/", meaning: "Masa dewasa" },
  { word: "Upbringing", ipa: "/ˈʌpˌbrɪŋɪŋ/", meaning: "Pola asuh / Pendidikan masa kecil" },
  { word: "Funeral", ipa: "/ˈfjuːnərəl/", meaning: "Pemakaman" },
  { word: "Ceremony", ipa: "/ˈsɛrɪmoʊni/", meaning: "Upacara" },

];

const ACTIONS_VOCAB = [

  { word: "Achieve", ipa: "/əˈtʃiːv/", meaning: "Mencapai (sesuatu yang sulit)" },
  { word: "Succeed", ipa: "/səkˈsiːd/", meaning: "Berhasil" },
  { word: "Fail", ipa: "/feɪl/", meaning: "Gagal" },
  { word: "Overcome", ipa: "/ˌoʊvərˈkʌm/", meaning: "Mengatasi (masalah)" },
  { word: "Accomplish", ipa: "/əˈkʌmplɪʃ/", meaning: "Menyelesaikan / Meraih" },
  { word: "Participate", ipa: "/pɑːrˈtɪsɪpeɪt/", meaning: "Berpartisipasi" },
  { word: "Graduate", ipa: "/ˈɡrædʒueɪt/", meaning: "Lulus (sekolah/kuliah)" },
  { word: "Celebrate", ipa: "/ˈsɛlɪbreɪt/", meaning: "Merayakan" },
  { word: "Regret", ipa: "/rɪˈɡrɛt/", meaning: "Menyesali" },
  { word: "Discover", ipa: "/dɪˈskʌvər/", meaning: "Menemukan (hal baru)" },

];

const CONCEPTS_VOCAB = [

  { word: "Opportunity", ipa: "/ˌɒpərˈtuːnɪti/", meaning: "Kesempatan / Peluang" },
  { word: "Challenge", ipa: "/ˈtʃælɪndʒ/", meaning: "Tantangan" },
  { word: "Success", ipa: "/səkˈsɛs/", meaning: "Kesuksesan" },
  { word: "Failure", ipa: "/ˈfeɪljər/", meaning: "Kegagalan" },
  { word: "Memory", ipa: "/ˈmɛməri/", meaning: "Kenangan / Ingatan" },
  { word: "Ambition", ipa: "/æmˈbɪʃən/", meaning: "Ambisi / Cita-cita" },
  { word: "Goal", ipa: "/ɡoʊl/", meaning: "Tujuan / Sasaran" },
  { word: "Proud", ipa: "/praʊd/", meaning: "Bangga" },
  { word: "Grateful", ipa: "/ˈɡreɪtfʊl/", meaning: "Bersyukur" },
  { word: "Nostalgic", ipa: "/nɒˈstældʒɪk/", meaning: "Bernostalgia (Rindu masa lalu)" },

];

const QUIZ_QUESTIONS = [

  {
    id: 1,
    question: "After working for 40 years, he finally reached ___.",
    options: ['Childhood', 'Retirement', 'Promotion'],
    answer: 'Retirement',
    explanation: "Retirement (Pensiun) adalah masa hidup setelah Anda berhenti bekerja."
  },
  {
    id: 2,
    question: "It was a difficult problem, but she managed to ___ it.",
    options: ['fail', 'overcome', 'regret'],
    answer: 'overcome',
    explanation: "To overcome (Mengatasi) berarti berhasil menangani masalah atau kesulitan."
  },
  {
    id: 3,
    question: "I have a very happy ___ of my first day at school.",
    options: ['funeral', 'ambition', 'memory'],
    answer: 'memory',
    explanation: "A memory (Kenangan) adalah sesuatu yang Anda ingat dari masa lalu."
  },
  {
    id: 4,
    question: "She worked hard and got a ___ to manager.",
    options: ['promotion', 'ceremony', 'graduation'],
    answer: 'promotion',
    explanation: "A promotion (Kenaikan pangkat) adalah perpindahan ke pekerjaan atau peringkat yang lebih penting."
  },
  {
    id: 5,
    question: "I am very ___ for your help.",
    options: ['grateful', 'nostalgic', 'proud'],
    answer: 'grateful',
    explanation: "Grateful (Bersyukur) berarti merasakan atau menunjukkan penghargaan atas kebaikan."
  },
  {
    id: 6,
    question: "They held a beautiful ___ to celebrate their 10th wedding ___.",
    options: ['funeral, graduation', 'ceremony, anniversary', 'upbringing, childhood'],
    answer: 'ceremony, anniversary',
    explanation: "Ceremony (Upacara) dan Anniversary (Hari jadi) cocok untuk perayaan pernikahan."
  },
  {
    id: 7,
    question: "If you want to ___, you must work hard and never give up.",
    options: ['regret', 'succeed', 'fail'],
    answer: 'succeed',
    explanation: "To succeed (Berhasil) berarti mencapai tujuan yang Anda inginkan."
  },
  {
    id: 8,
    question: "Her ___ was very happy. She grew up in a loving family.",
    options: ['retirement', 'adulthood', 'childhood'],
    answer: 'childhood',
    explanation: "Childhood (Masa kecil) adalah periode saat seseorang masih anak-anak."
  },
  {
    id: 9,
    question: "He has a strong ___ to become a famous musician.",
    options: ['ceremony', 'ambition', 'funeral'],
    answer: 'ambition',
    explanation: "Ambition (Ambisi) adalah keinginan kuat untuk mencapai sesuatu yang membutuhkan kerja keras."
  },
  {
    id: 10,
    question: "Students usually ___ from university after four years.",
    options: ['graduate', 'achieve', 'celebrate'],
    answer: 'graduate',
    explanation: "To graduate (Lulus) berarti menyelesaikan program studi dan menerima gelar atau sertifikat."
  },
  {
    id: 11,
    question: "They ___ their wedding anniversary every year.",
    options: ['regret', 'fail', 'celebrate'],
    answer: 'celebrate',
    explanation: "To celebrate (Merayakan) berarti menghormati hari atau acara penting dengan aktivitas khusus."
  },
  {
    id: 12,
    question: "Despite many ___, she never gave up on her goals.",
    options: ['funerals', 'challenges', 'ceremonies'],
    answer: 'challenges',
    explanation: "Challenges (Tantangan) adalah situasi sulit yang memerlukan usaha untuk mengatasinya."
  },
  {
    id: 13,
    question: "I ___ not studying harder when I was young.",
    options: ['overcome', 'achieve', 'regret'],
    answer: 'regret',
    explanation: "To regret (Menyesali) berarti merasa sedih tentang sesuatu yang sudah terjadi."
  },
  {
    id: 14,
    question: "Her good ___ taught her to be polite and respectful.",
    options: ['upbringing', 'promotion', 'graduation'],
    answer: 'upbringing',
    explanation: "Upbringing (Pola asuh) adalah cara seseorang dididik dan dibesarkan saat masih kecil."
  },
  {
    id: 15,
    question: "The team worked together to ___ their goal of winning the championship.",
    options: ['regret', 'accomplish', 'fail'],
    answer: 'accomplish',
    explanation: "To accomplish (Menyelesaikan/Meraih) berarti berhasil menyelesaikan sesuatu."
  },
  {
    id: 16,
    question: "Looking at old photos makes me feel ___.",
    options: ['nostalgic', 'grateful', 'proud'],
    answer: 'nostalgic',
    explanation: "Nostalgic (Bernostalgia) berarti merasa rindu atau suka mengingat masa lalu."
  },
  {
    id: 17,
    question: "Everyone should ___ in community activities.",
    options: ['fail', 'participate', 'discover'],
    answer: 'participate',
    explanation: "To participate (Berpartisipasi) berarti ikut serta dalam suatu kegiatan."
  },
  {
    id: 18,
    question: "When you enter ___, you become responsible for your own life.",
    options: ['adulthood', 'graduation', 'childhood'],
    answer: 'adulthood',
    explanation: "Adulthood (Masa dewasa) adalah periode hidup setelah masa remaja."
  },
  {
    id: 19,
    question: "He was ___ of his daughter's achievements.",
    options: ['grateful', 'proud', 'nostalgic'],
    answer: 'proud',
    explanation: "Proud (Bangga) berarti merasa senang dan puas dengan pencapaian seseorang atau diri sendiri."
  },
  {
    id: 20,
    question: "Scientists continue to ___ new things about the universe.",
    options: ['discover', 'regret', 'fail'],
    answer: 'discover',
    explanation: "To discover (Menemukan) berarti menemukan sesuatu yang sebelumnya tidak diketahui."
  }

];

const InterVocabLesson1: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 1);
    const nextLessonPath = 1 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${1+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'milestones' | string>('milestones');

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
                lessonLabel={"Intermediate Vocabulary Lesson 1"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Pengalaman Hidup"
                subtitle="Vocabulary • Pelajaran 1"
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
                  onClick={() => setVocabSection('milestones')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'milestones' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Pencapaian
                </button>

                <button
                  onClick={() => setVocabSection('actions')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'actions' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Tindakan
                </button>

                <button
                  onClick={() => setVocabSection('concepts')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'concepts' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Konsep
                </button>

              </div>
      
                                
              {vocabSection === 'milestones' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Pencapaian Hidup</h3>
                      <p className="text-xs text-sky-700">Peristiwa penting dalam hidup seseorang.</p>
                    </div>
                  </div>
                  {renderVocabList(MILESTONES_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'actions' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Kata Kerja Aktif</h3>
                      <p className="text-xs text-sky-700">Tindakan yang berhubungan dengan pertumbuhan dan pencapaian.</p>
                    </div>
                  </div>
                  {renderVocabList(ACTIONS_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'concepts' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Konsep Abstrak</h3>
                      <p className="text-xs text-sky-700">Perasaan dan ide tentang kesuksesan.</p>
                    </div>
                  </div>
                  {renderVocabList(CONCEPTS_VOCAB, 'sky')}
                </div>
              )}

                                { /* Bonus: Penggunaan Kata & Kolokasi Section */ }
                                <div className="mt-10 animate-fade-in">
                                    
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-lg font-bold text-slate-800">Penggunaan Kata</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <h3 className="font-bold text-indigo-800 mb-2 text-sm uppercase">Kesuksesan & Kegagalan</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"She <b>achieved</b> her goal of becoming a doctor."</p>
                    <p className="text-xs text-slate-500 mb-2">(Dia <b>mencapai</b> tujuannya menjadi dokter.)</p>
                    <p className="text-sm text-slate-700 italic">"Don't be afraid to <b>fail</b>; it is part of success."</p>
                    <p className="text-xs text-slate-500">(Jangan takut <b>gagal</b>; itu bagian dari kesuksesan.)</p>
                  </div>

                  <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-sky-800 mb-2 text-sm uppercase">Kenangan & Perasaan</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"Looking at old photos makes me feel <b>nostalgic</b>."</p>
                    <p className="text-xs text-slate-500 mb-2">(Melihat foto lama membuatku merasa <b>nostalgia</b>.)</p>
                    <p className="text-sm text-slate-700 italic">"I am <b>grateful</b> for the <b>opportunity</b> to travel."</p>
                    <p className="text-xs text-slate-500">(Aku <b>bersyukur</b> atas <b>kesempatan</b> untuk bepergian.)</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
                <h3 className="font-bold text-rose-800 mb-2 text-sm uppercase tracking-wide">Kolokasi (Pasangan Kata)</h3>
                <div className="bg-white p-3 rounded-lg border border-rose-100/50">
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <b>Face</b> a challenge (Menghadapi tantangan)</li>
                    <li>• <b>Seize</b> an opportunity (Mengambil kesempatan)</li>
                    <li>• <b>Set</b> a goal (Menetapkan tujuan)</li>
                    <li>• <b>Celebrate</b> an anniversary (Merayakan hari jadi)</li>
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

export default InterVocabLesson1;
