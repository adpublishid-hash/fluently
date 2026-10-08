import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const NATURE_SYSTEMS_VOCAB = [

  { word: "Environment", ipa: "/ɪnˈvaɪrənmənt/", meaning: "Lingkungan" },
  { word: "Ecosystem", ipa: "/ˈiːkoʊˌsɪstəm/", meaning: "Ekosistem" },
  { word: "Biodiversity", ipa: "/ˌbaɪoʊdaɪˈvɜːrsɪti/", meaning: "Keanekaragaman hayati" },
  { word: "Habitat", ipa: "/ˈhæbɪtæt/", meaning: "Habitat / Tempat tinggal alami" },
  { word: "Climate", ipa: "/ˈklaɪmət/", meaning: "Iklim" },
  { word: "Atmosphere", ipa: "/ˈætməsfɪər/", meaning: "Atmosfer / Udara" },
  { word: "Resource", ipa: "/ˈriːsɔːrs/", meaning: "Sumber daya" },
  { word: "Wildlife", ipa: "/ˈwaɪldlaɪf/", meaning: "Margasatwa / Hewan liar" },
  { word: "Agriculture", ipa: "/ˈæɡrɪkʌltʃər/", meaning: "Pertanian" },
  { word: "Species", ipa: "/ˈspiːʃiːz/", meaning: "Spesies / Jenis" },

];

const ISSUES_THREATS_VOCAB = [

  { word: "Pollution", ipa: "/pəˈluːʃən/", meaning: "Polusi / Pencemaran" },
  { word: "Global warming", ipa: "/ˈɡloʊbəl ˈwɔːrmɪŋ/", meaning: "Pemanasan global" },
  { word: "Deforestation", ipa: "/diːˌfɔːrɪˈsteɪʃən/", meaning: "Penebangan hutan" },
  { word: "Waste", ipa: "/weɪst/", meaning: "Limbah / Sampah" },
  { word: "Emission", ipa: "/ɪˈmɪʃən/", meaning: "Emisi / Buangan gas" },
  { word: "Drought", ipa: "/draʊt/", meaning: "Kekeringan" },
  { word: "Flood", ipa: "/flʌd/", meaning: "Banjir" },
  { word: "Endangered", ipa: "/ɪnˈdeɪndʒərd/", meaning: "Terancam punah" },
  { word: "Extinction", ipa: "/ɪkˈstɪŋkʃən/", meaning: "Kepunahan" },
  { word: "Contamination", ipa: "/kənˌtæmɪˈneɪʃən/", meaning: "Kontaminasi / Pencemaran" },

];

const SUSTAINABILITY_VOCAB = [

  { word: "Sustainability", ipa: "/səˌsteɪnəˈbɪlɪti/", meaning: "Keberlanjutan / Kelestarian" },
  { word: "Renewable", ipa: "/rɪˈnuːəbəl/", meaning: "Terbarukan" },
  { word: "Recycle", ipa: "/ˌriːˈsaɪkəl/", meaning: "Mendaur ulang" },
  { word: "Conservation", ipa: "/ˌkɒnsərˈveɪʃən/", meaning: "Konservasi / Pelestarian" },
  { word: "Eco-friendly", ipa: "/ˈiːkoʊ ˈfrɛndli/", meaning: "Ramah lingkungan" },
  { word: "Organic", ipa: "/ɔːrˈɡænɪk/", meaning: "Organik / Alami" },
  { word: "Solar", ipa: "/ˈsoʊlər/", meaning: "Tenaga surya / Matahari" },
  { word: "Efficient", ipa: "/ɪˈfɪʃənt/", meaning: "Efisien / Hemat energi" },
  { word: "Alternative", ipa: "/ɔːlˈtɜːrnətɪv/", meaning: "Alternatif / Pilihan lain" },
  { word: "Reduce", ipa: "/rɪˈduːs/", meaning: "Mengurangi" },

];

const QUIZ_QUESTIONS = [

  { id: 1, question: "We should use ___ energy like solar and wind power.", options: ['fossil', 'renewable', 'waste'], answer: 'renewable', explanation: "Renewable (Terbarukan) energy comes from sources that don't run out." },
  { id: 2, question: "Cutting down too many trees causes ___.", options: ['reforestation', 'conservation', 'deforestation'], answer: 'deforestation', explanation: "Deforestation (Penebangan hutan) is the action of clearing a wide area of trees." },
  { id: 3, question: "Animals that might disappear forever are ___.", options: ['common', 'endangered', 'domestic'], answer: 'endangered', explanation: "Endangered (Terancam punah) species are at risk of extinction." },
  { id: 4, question: "Please ___ your plastic bottles.", options: ['recycle', 'pollute', 'waste'], answer: 'recycle', explanation: "Recycling (Daur ulang) converts waste into reusable material." },
  { id: 5, question: "A long period with no rain is called a ___.", options: ['drought', 'storm', 'flood'], answer: 'drought', explanation: "Drought (Kekeringan) adalah periode panjang dengan curah hujan yang sangat rendah." },
  { id: 6, question: "The ___ is the air surrounding Earth.", options: ['habitat', 'atmosphere', 'species'], answer: 'atmosphere', explanation: "Atmosphere (Atmosfer) adalah lapisan gas yang mengelilingi planet." },
  { id: 7, question: "This product is ___, so it won't harm nature.", options: ['eco-friendly', 'contaminated', 'polluted'], answer: 'eco-friendly', explanation: "Eco-friendly (Ramah lingkungan) berarti tidak merusak alam." },
  { id: 8, question: "___ warming is caused by greenhouse gases.", options: ['Regional', 'Local', 'Global'], answer: 'Global', explanation: "Global warming (Pemanasan global) adalah kenaikan suhu rata-rata Bumi." },
  { id: 9, question: "Cars produce harmful ___.", options: ['emissions', 'biodiversity', 'conservation'], answer: 'emissions', explanation: "Emissions (Emisi) adalah gas atau polutan yang dilepaskan ke udara." },
  { id: 10, question: "Too much ___ in the ocean kills fish.", options: ['conservation', 'agriculture', 'pollution'], answer: 'pollution', explanation: "Pollution (Polusi) adalah pengenalan zat berbahaya ke lingkungan." },
  { id: 11, question: "Each animal lives in its natural ___.", options: ['emission', 'waste', 'habitat'], answer: 'habitat', explanation: "Habitat adalah tempat tinggal alami suatu organisme." },
  { id: 12, question: "___ refers to the variety of life on Earth.", options: ['Drought', 'Waste', 'Biodiversity'], answer: 'Biodiversity', explanation: "Biodiversity (Keanekaragaman hayati)adalah keragaman makhluk hidup." },
  { id: 13, question: "We need to ___ water and electricity.", options: ['pollute', 'reduce', 'waste'], answer: 'reduce', explanation: "Reduce (Mengurangi) berarti menggunakan lebih sedikit." },
  { id: 14, question: "The panda is a ___ that might become extinct.", options: ['species', 'resource', 'climate'], answer: 'species', explanation: "Species (Spesies) adalah kelompok organisme yang dapat berkembang biak bersama." },
  { id: 15, question: "___ panels convert sunlight into electricity.", options: ['Drought', 'Waste', 'Solar'], answer: 'Solar', explanation: "Solar (Tenaga surya) menggunakan energi dari matahari." },
  { id: 16, question: "The ___ is all living and non-living things around us.", options: ['extinction', 'environment', 'flood'], answer: 'environment', explanation: "Environment (Lingkungan) adalah segala sesuatu di sekitar kita." },
  { id: 17, question: "___ of forests leads to habitat loss.", options: ['Recycling', 'Conservation', 'Deforestation'], answer: 'Deforestation', explanation: "Deforestation menghancurkan rumah hewan." },
  { id: 18, question: "We should buy ___ vegetables without chemicals.", options: ['polluted', 'organic', 'contaminated'], answer: 'organic', explanation: "Organic (Organik) ditanam tanpa pestisida kimia." },
  { id: 19, question: "Heavy rain caused a ___ in the city.", options: ['climate', 'flood', 'drought'], answer: 'flood', explanation: "Flood (Banjir) terjadi ketika terlalu banyak air menutupi tanah." },
  { id: 20, question: "___ is about using resources wisely for the future.", options: ['Waste', 'Extinction', 'Sustainability'], answer: 'Sustainability', explanation: "Sustainability (Keberlanjutan) berarti memenuhi kebutuhan tanpa merusak masa depan." }

];

const InterVocabLesson5: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 5);
    const nextLessonPath = 5 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${5+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'nature' | string>('nature');

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
                lessonLabel={"Intermediate Vocabulary Lesson 5"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Lingkungan & Ekologi"
                subtitle="Vocabulary • Pelajaran 5"
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
                  onClick={() => setVocabSection('nature')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'nature' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Alam
                </button>

                <button
                  onClick={() => setVocabSection('issues')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'issues' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Masalah
                </button>

                <button
                  onClick={() => setVocabSection('solutions')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'solutions' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Solusi
                </button>

              </div>
      
                                
              {vocabSection === 'nature' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Alam & Sistem</h3>
                      <p className="text-xs text-sky-700">Bagaimana dunia bekerja.</p>
                    </div>
                  </div>
                  {renderVocabList(NATURE_SYSTEMS_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'issues' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Ancaman Lingkungan</h3>
                      <p className="text-xs text-sky-700">Masalah yang dihadapi planet kita.</p>
                    </div>
                  </div>
                  {renderVocabList(ISSUES_THREATS_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'solutions' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Keberlanjutan</h3>
                      <p className="text-xs text-sky-700">Solusi untuk masa depan yang lebih baik.</p>
                    </div>
                  </div>
                  {renderVocabList(SUSTAINABILITY_VOCAB, 'sky')}
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
                    <h3 className="font-bold text-blue-800 mb-2 text-sm uppercase">Perubahan Iklim</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"We need to reduce carbon <b>emissions</b> to stop <b>global warming</b>."</p>
                    <p className="text-xs text-slate-500 mb-2">(Kita perlu mengurangi <b>emisi</b> karbon untuk menghentikan <b>pemanasan global</b>.)</p>
                    <p className="text-sm text-slate-700 italic">"The <b>glaciers</b> are melting due to rising temperatures."</p>
                    <p className="text-xs text-slate-500">(<b>Gletser</b> mencair karena kenaikan suhu.)</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-green-800 mb-2 text-sm uppercase">Hidup Hijau</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"I try to buy <b>organic</b> food and use <b>eco-friendly</b> products."</p>
                    <p className="text-xs text-slate-500 mb-2">(Saya mencoba membeli makanan <b>organik</b> dan menggunakan produk <b>ramah lingkungan</b>.)</p>
                    <p className="text-sm text-slate-700 italic">"<b>Recycling</b> plastic helps reduce <b>pollution</b>."</p>
                    <p className="text-xs text-slate-500">(<b>Mendaur ulang</b> plastik membantu mengurangi <b>polusi</b>.)</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2 text-sm uppercase tracking-wide">Kolokasi Umum</h3>
                <div className="bg-white p-3 rounded-lg border border-indigo-100/50">
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <b>Protect</b> the environment (Melindungi lingkungan)</li>
                    <li>• <b>Reduce</b> waste (Mengurangi limbah)</li>
                    <li>• <b>Conserve</b> energy (Menghemat energi)</li>
                    <li>• <b>Face</b> extinction (Menghadapi kepunahan)</li>
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

export default InterVocabLesson5;
