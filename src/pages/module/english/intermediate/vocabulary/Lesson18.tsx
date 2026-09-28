import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const OPINION_VOCAB = [

  { word: "In my opinion", ipa: "/ɪn maɪ əˈpɪnjən/", meaning: "Menurut pendapat saya" },
  { word: "Personally", ipa: "/ˈpɜːrsənəli/", meaning: "Secara pribadi" },
  { word: "I believe that", ipa: "/aɪ bɪˈliːv ðæt/", meaning: "Saya percaya bahwa" },
  { word: "From my perspective", ipa: "/frɒm maɪ pərˈspɛktɪv/", meaning: "Dari sudut pandang saya" },
  { word: "It seems to me", ipa: "/ɪt siːmz tu miː/", meaning: "Tampaknya bagi saya" },
  { word: "As far as I'm concerned", ipa: "/æz fɑːr æz aɪm kənˈsɜːrnd/", meaning: "Sepanjang yang saya tahu / Menurut hemat saya" },
  { word: "I am convinced", ipa: "/aɪ æm kənˈvɪnst/", meaning: "Saya yakin" },
  { word: "To my mind", ipa: "/tu maɪ maɪnd/", meaning: "Menurut pikiran saya" },
  { word: "I reckon", ipa: "/aɪ ˈrɛkən/", meaning: "Saya rasa / Saya kira (Informal)" },
  { word: "Frankly", ipa: "/ˈfræŋkli/", meaning: "Sejujurnya" },

];

const AGREEMENT_VOCAB = [

  { word: "Absolutely", ipa: "/ˈæbsəluːtli/", meaning: "Benar sekali / Tentu saja" },
  { word: "Exactly", ipa: "/ɪɡˈzæktli/", meaning: "Tepat sekali" },
  { word: "I beg to differ", ipa: "/aɪ bɛɡ tu ˈdɪfər/", meaning: "Saya kurang setuju (Sopan)" },
  { word: "I see your point", ipa: "/aɪ siː jʊər pɔɪnt/", meaning: "Saya mengerti maksud Anda" },
  { word: "That's true, but...", ipa: "/ðæts truː, bʌt/", meaning: "Itu benar, tapi..." },
  { word: "I couldn't agree more", ipa: "/aɪ ˈkʊdnt əˈɡriː mɔːr/", meaning: "Saya sangat setuju" },
  { word: "On the contrary", ipa: "/ɒn ðə ˈkɒntrəri/", meaning: "Sebaliknya" },
  { word: "I'm afraid I disagree", ipa: "/aɪm əˈfreɪd aɪ ˌdɪsəˈɡriː/", meaning: "Maaf, saya tidak setuju" },
  { word: "You're right", ipa: "/jʊər raɪt/", meaning: "Kamu benar" },
  { word: "Not necessarily", ipa: "/nɒt ˌnɛsəˈsɛrɪli/", meaning: "Belum tentu" },

];

const STRUCTURE_VOCAB = [

  { word: "Furthermore", ipa: "/ˌfɜːrdərˈmɔːr/", meaning: "Selanjutnya / Lagipula" },
  { word: "However", ipa: "/haʊˈɛvər/", meaning: "Akan tetapi / Namun" },
  { word: "Therefore", ipa: "/ˈðɛərfɔːr/", meaning: "Oleh karena itu" },
  { word: "On the other hand", ipa: "/ɒn ðə ˈʌðər hænd/", meaning: "Di sisi lain" },
  { word: "For instance", ipa: "/fɔːr ˈɪnstəns/", meaning: "Sebagai contoh" },
  { word: "In conclusion", ipa: "/ɪn kənˈkluːʒən/", meaning: "Kesimpulannya" },
  { word: "To sum up", ipa: "/tu sʌm ʌp/", meaning: "Singkatnya / Ringkasnya" },
  { word: "Firstly", ipa: "/ˈfɜːrstli/", meaning: "Pertama-tama" },
  { word: "Moreover", ipa: "/mɔːrˈoʊvər/", meaning: "Terlebih lagi" },
  { word: "Nevertheless", ipa: "/ˌnɛvəðəˈlɛs/", meaning: "Meskipun demikian" },

];

const QUIZ_QUESTIONS = [

  { id: 1, question: "Which phrase is used to politely disagree?", options: ['You are wrong!', 'I beg to differ.', 'Absolutely.'], answer: 'I beg to differ.', explanation: "'I beg to differ' adalah cara formal dan sopan untuk mengatakan bahwa Anda tidak setuju." },
  { id: 2, question: "When you agree 100% with someone, you can say: 'I couldn't agree ___.'", options: ['less', 'more', 'much'], answer: 'more', explanation: "'I couldn't agree more' berarti Anda setuju sepenuhnya." },
  { id: 3, question: "___, I think social media is useful.", options: ['Personally', 'However', 'Therefore'], answer: 'Personally', explanation: "'Personally' (Secara pribadi) digunakan untuk memperkenalkan pendapat Anda sendiri." },
  { id: 4, question: "This car is expensive. ___, it is very safe.", options: ['On the other hand', 'Firstly', 'For instance'], answer: 'On the other hand', explanation: "'On the other hand' (Di sisi lain) memperkenalkan poin yang kontras (mahal vs aman)." },
  { id: 5, question: "Which word means 'As a result'?", options: ['Therefore', 'Nevertheless', 'Frankly'], answer: 'Therefore', explanation: "'Therefore' (Oleh karena itu) menghubungkan sebab dengan akibat/kesimpulan." },
  { id: 6, question: "___, I think you're right about this.", options: ['In my opinion', 'However', 'Therefore'], answer: 'In my opinion', explanation: "'In my opinion' (Menurut pendapat saya) digunakan untuk menyatakan pendapat pribadi." },
  { id: 7, question: "I understand your point. ___, I still disagree.", options: ['Absolutely', 'However', 'Exactly'], answer: 'However', explanation: "'However' (Namun) digunakan untuk menunjukkan kontras atau perbedaan pendapat." },
  { id: 8, question: "To show strong agreement, you can say '___!'", options: ['I beg to differ', 'Absolutely', 'On the contrary'], answer: 'Absolutely', explanation: "'Absolutely' (Benar sekali) menunjukkan persetujuan yang kuat." },
  { id: 9, question: "___, this is not a good idea.", options: ['Frankly', 'Furthermore', 'For instance'], answer: 'Frankly', explanation: "'Frankly' (Sejujurnya) digunakan untuk menyatakan pendapat yang jujur dan direct." },
  { id: 10, question: "He is wrong. ___, he is lying.", options: ['Moreover', 'However', 'Nevertheless'], answer: 'Moreover', explanation: "'Moreover' (Terlebih lagi) menambahkan point tambahan yang mendukung pernyataan sebelumnya." },
  { id: 11, question: "I see your point. ___, I think we should reconsider.", options: ['However', 'Exactly', 'Absolutely'], answer: 'However', explanation: "'I see your point' mengakui pendapat mereka, tapi 'however' menunjukkan Anda akan memberi pandangan berbeda." },
  { id: 12, question: "You're ___! That's exactly what I think.", options: ['wrong', 'right', 'differ'], answer: 'right', explanation: "'You're right' adalah cara sederhana untuk menyatakan persetujuan." },
  { id: 13, question: "The plan failed. ___, we learned a valuable lesson.", options: ['Therefore', 'Nevertheless', 'For instance'], answer: 'Nevertheless', explanation: "'Nevertheless' (Meskipun demikian) menunjukkan bahwa meskipun ada masalah, ada juga hal positif." },
  { id: 14, question: "Which phrase introduces an example?", options: ['Therefore', 'For instance', 'In conclusion'], answer: 'For instance', explanation: "'For instance' (Sebagai contoh) digunakan untuk memberikan contoh spesifik." },
  { id: 15, question: "To conclude your argument, you can say '___'.", options: ['Firstly', 'In conclusion', 'Furthermore'], answer: 'In conclusion', explanation: "'In conclusion' (Kesimpulannya) menandakan akhir dari argumen Anda." },
  { id: 16, question: "That's not true. ___, it's the opposite.", options: ['Exactly', 'On the contrary', 'I see your point'], answer: 'On the contrary', explanation: "'On the contrary' (Sebaliknya) menunjukkan bahwa kebalikannya yang benar." },
  { id: 17, question: "___, let me explain my first point.", options: ['In conclusion', 'Firstly', 'To sum up'], answer: 'Firstly', explanation: "'Firstly' (Pertama-tama) memulai urutan poin dalam argumen." },
  { id: 18, question: "I'm afraid I ___. I think you're wrong.", options: ['agree', 'disagree', 'exactly'], answer: 'disagree', explanation: "'I'm afraid I disagree' adalah cara sopan untuk tidak setuju." },
  { id: 19, question: "___, the evidence supports this theory.", options: ['As far as I\'m concerned', 'However', 'Nevertheless'], answer: 'As far as I\'m concerned', explanation: "'As far as I'm concerned' (Menurut hemat saya) menyatakan pendapat berdasarkan pemahaman Anda." },
  { id: 20, question: "___, we should cancel the meeting.", options: ['To sum up', 'Firstly', 'For instance'], answer: 'To sum up', explanation: "'To sum up' (Singkatnya) menyimpulkan point-point sebelumnya." }

];

const InterVocabLesson18: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 18);
    const nextLessonPath = 18 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${18+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'opinion' | string>('opinion');

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
                lessonLabel={"Intermediate Vocabulary Lesson 18"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Argumen & Diskusi"
                subtitle="Vocabulary • Pelajaran 18"
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
                  onClick={() => setVocabSection('opinion')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'opinion' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Pendapat
                </button>

                <button
                  onClick={() => setVocabSection('agree')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'agree' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Setuju/Tidak Setuju
                </button>

                <button
                  onClick={() => setVocabSection('struct')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'struct' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Struktur
                </button>

              </div>
      
                                
              {vocabSection === 'opinion' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Menyatakan Pendapat</h3>
                      <p className="text-xs text-sky-700">Frasa untuk menyatakan pandangan Anda dengan jelas.</p>
                    </div>
                  </div>
                  {renderVocabList(OPINION_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'agree' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Persetujuan & Ketidaksetujuan</h3>
                      <p className="text-xs text-sky-700">Menanggapi pendapat orang lain.</p>
                    </div>
                  </div>
                  {renderVocabList(AGREEMENT_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'struct' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Menyusun Argumen</h3>
                      <p className="text-xs text-sky-700">Menghubungkan ide-ide Anda secara logis.</p>
                    </div>
                  </div>
                  {renderVocabList(STRUCTURE_VOCAB, 'sky')}
                </div>
              )}

                                { /* Bonus: Penggunaan Kata & Kolokasi Section */ }
                                <div className="mt-10 animate-fade-in">
                                    
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-lg font-bold text-slate-800">Strategi Debat</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-2 text-sm uppercase">Ketidaksetujuan yang Sopan</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"<b>I see your point, but</b> I think we should consider the cost."</p>
                    <p className="text-xs text-slate-500 mb-2">(<b>Saya mengerti maksud Anda, tapi</b> saya pikir kita harus mempertimbangkan biayanya.)</p>
                    <p className="text-sm text-slate-700 italic">"<b>I'm afraid I disagree</b> with that statement."</p>
                    <p className="text-xs text-slate-500">(<b>Maaf, saya tidak setuju</b> dengan pernyataan itu.)</p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <h3 className="font-bold text-purple-800 mb-2 text-sm uppercase">Membangun Argumen</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"<b>Firstly</b>, it is too expensive. <b>Furthermore</b>, it is not efficient."</p>
                    <p className="text-xs text-slate-500 mb-2">(<b>Pertama</b>, ini terlalu mahal. <b>Lagipula</b>, ini tidak efisien.)</p>
                    <p className="text-sm text-slate-700 italic">"<b>In conclusion</b>, this is the best option."</p>
                    <p className="text-xs text-slate-500">(<b>Kesimpulannya</b>, ini adalah pilihan terbaik.)</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2 text-sm uppercase tracking-wide">Pro Tip: "I agree"</h3>
                <div className="bg-white p-3 rounded-lg border border-indigo-100/50">
                  <p className="text-xs text-slate-500 mb-2">NEVER say "I am agree".</p>
                  <p className="text-sm font-medium text-green-600">Correct: "I agree."</p>
                  <p className="text-sm font-medium text-green-600 mt-1">Correct: "I completely agree."</p>
                  <p className="text-sm font-medium text-red-500 mt-1">Wrong: "I am agree."</p>
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

export default InterVocabLesson18;
