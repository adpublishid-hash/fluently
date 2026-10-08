import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const TRAVEL_VOCAB = [

  { word: "Destination", ipa: "/ˌdɛstɪˈneɪʃən/", meaning: "Tujuan (wisata)" },
  { word: "Accommodation", ipa: "/əˌkɒməˈdeɪʃən/", meaning: "Akomodasi / Penginapan" },
  { word: "Itinerary", ipa: "/aɪˈtɪnərəri/", meaning: "Rencana perjalanan" },
  { word: "Landscape", ipa: "/ˈlændskeɪp/", meaning: "Pemandangan alam" },
  { word: "Border", ipa: "/ˈbɔːrdər/", meaning: "Perbatasan (negara)" },
  { word: "Foreign", ipa: "/ˈfɔːrən/", meaning: "Asing / Luar negeri" },
  { word: "Local", ipa: "/ˈloʊkəl/", meaning: "Lokal / Penduduk setempat" },
  { word: "Souvenir", ipa: "/ˌsuːvəˈnɪər/", meaning: "Cenderamata / Oleh-oleh" },
  { word: "Tourism", ipa: "/ˈtʊərɪzəm/", meaning: "Pariwisata" },
  { word: "Excursion", ipa: "/ɪkˈskɜːrʒən/", meaning: "Karyawisata / Darmawisata singkat" },

];

const CULTURE_VOCAB = [

  { word: "Heritage", ipa: "/ˈhɛrɪtɪdʒ/", meaning: "Warisan budaya" },
  { word: "Custom", ipa: "/ˈkʌstəm/", meaning: "Adat kebiasaan" },
  { word: "Tradition", ipa: "/trəˈdɪʃən/", meaning: "Tradisi" },
  { word: "Diversity", ipa: "/daɪˈvɜːrsɪti/", meaning: "Keberagaman" },
  { word: "Values", ipa: "/ˈvæljuːz/", meaning: "Nilai-nilai (moral/sosial)" },
  { word: "Etiquette", ipa: "/ˈɛtɪkɛt/", meaning: "Etiket / Tata krama" },
  { word: "Belief", ipa: "/bɪˈliːf/", meaning: "Kepercayaan / Keyakinan" },
  { word: "Ritual", ipa: "/ˈrɪtʃuəl/", meaning: "Ritual / Upacara" },
  { word: "Society", ipa: "/səˈsaɪəti/", meaning: "Masyarakat" },
  { word: "Citizen", ipa: "/ˈsɪtɪzən/", meaning: "Warga negara" },

];

const GLOBAL_VOCAB = [

  { word: "Globalization", ipa: "/ˌɡloʊbələˈzeɪʃən/", meaning: "Globalisasi" },
  { word: "Economy", ipa: "/ɪˈkɒnəmi/", meaning: "Ekonomi" },
  { word: "Crisis", ipa: "/ˈkraɪsɪs/", meaning: "Krisis" },
  { word: "Poverty", ipa: "/ˈpɒvərti/", meaning: "Kemiskinan" },
  { word: "Migration", ipa: "/maɪˈɡreɪʃən/", meaning: "Migrasi / Perpindahan penduduk" },
  { word: "Democracy", ipa: "/dɪˈmɒkrəsi/", meaning: "Demokrasi" },
  { word: "Politics", ipa: "/ˈpɒlɪtɪks/", meaning: "Politik" },
  { word: "Population", ipa: "/ˌpɒpjʊˈleɪʃən/", meaning: "Populasi / Jumlah penduduk" },
  { word: "Diplomacy", ipa: "/dɪˈploʊməsi/", meaning: "Diplomasi" },
  { word: "Trade", ipa: "/treɪd/", meaning: "Perdagangan" },

];

const QUIZ_QUESTIONS = [

  { id: 1, question: "We planned our trip carefully and wrote a detailed ___.", options: ['migration', 'itinerary', 'heritage'], answer: 'itinerary', explanation: "An itinerary (Rencana perjalanan) adalah rute atau perjalanan yang direncanakan." },
  { id: 2, question: "Respecting the local ___ is important when traveling.", options: ['borders', 'poverty', 'customs'], answer: 'customs', explanation: "Customs (Adat istiadat) adalah cara berperilaku tradisional." },
  { id: 3, question: "The country is facing an economic ___.", options: ['crisis', 'ritual', 'souvenir'], answer: 'crisis', explanation: "A crisis (Krisis) adalah masa kesulitan atau bahaya yang intens." },
  { id: 4, question: "Hotels and hostels are types of ___.", options: ['population', 'diversity', 'accommodation'], answer: 'accommodation', explanation: "Accommodation (Akomodasi) mengacu pada tempat tinggal." },
  { id: 5, question: "The movement of people from one place to another is called ___.", options: ['migration', 'globalization', 'democracy'], answer: 'migration', explanation: "Migration (Migrasi) adalah perpindahan orang ke daerah baru." },
  { id: 6, question: "Our vacation ___ is Bali, Indonesia.", options: ['crisis', 'border', 'destination'], answer: 'destination', explanation: "Destination (Tujuan) adalah tempat yang dituju seseorang." },
  { id: 7, question: "We crossed the ___ to enter the next country.", options: ['heritage', 'border', 'souvenir'], answer: 'border', explanation: "Border (Perbatasan) adalah garis yang memisahkan dua negara." },
  { id: 8, question: "The mountain ___ was breathtaking.", options: ['landscape', 'etiquette', 'politics'], answer: 'landscape', explanation: "Landscape (Pemandangan) adalah pemandangan alam suatu area." },
  { id: 9, question: "I bought a ___ to remember my trip.", options: ['population', 'crisis', 'souvenir'], answer: 'souvenir', explanation: "Souvenir (Cenderamata) adalah barang untuk mengingat perjalanan." },
  { id: 10, question: "___ is an important industry in many countries.", options: ['Poverty', 'Migration', 'Tourism'], answer: 'Tourism', explanation: "Tourism (Pariwisata) adalah bisnis menyediakan layanan untuk wisatawan." },
  { id: 11, question: "We went on a day ___ to  the nearby island.", options: ['diversity', 'excursion', 'democracy'], answer: 'excursion', explanation: "Excursion (Karyawisata) adalah perjalanan singkat untuk bersenang-senang." },
  { id: 12, question: "This temple is part of our cultural ___.", options: ['trade', 'economy', 'heritage'], answer: 'heritage', explanation: "Heritage (Warisan budaya) adalah tradisi yang diturunkan." },
  { id: 13, question: "Every culture has different ___ and values.", options: ['borders', 'traditions', 'crises'], answer: 'traditions', explanation: "Traditions (Tradisi) adalah keyakinan atau adat yang diwariskan." },
  { id: 14, question: "Indonesia has great cultural ___.", options: ['diplomacy', 'diversity', 'poverty'], answer: 'diversity', explanation: "Diversity (Keberagaman) adalah keragaman elemen berbeda." },
  { id: 15, question: "It's polite to learn basic ___ before visiting.", options: ['trade', 'population', 'etiquette'], answer: 'etiquette', explanation: "Etiquette (Etiket) adalah aturan perilaku sopan." },
  { id: 16, question: "The ___ of the city is over 10 million.", options: ['excursion', 'ritual', 'population'], answer: 'population', explanation: "Population (Populasi) adalah jumlah orang yang tinggal di suatu tempat." },
  { id: 17, question: "___ helps nations communicate peacefully.", options: ['Poverty', 'Diplomacy', 'Crisis'], answer: 'Diplomacy', explanation: "Diplomacy (Diplomasi) adalah mengelola hubungan internasional." },
  { id: 18, question: "The country benefits from international ___.", options: ['trade', 'ritual', 'poverty'], answer: 'trade', explanation: "Trade (Perdagangan) adalah jual beli barang antar negara." },
  { id: 19, question: "They performed a traditional ___ ceremony.", options: ['economy', 'crisis', 'ritual'], answer: 'ritual', explanation: "Ritual adalah serangkaian tindakan yang dilakukan untuk tujuan keagamaan atau budaya." },
  { id: 20, question: "Every ___ has rights and responsibilities.", options: ['landscape', 'citizen', 'souvenir'], answer: 'citizen', explanation: "Citizen (Warga negara) adalah anggota resmi suatu negara." }

];

const InterVocabLesson6: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 6);
    const nextLessonPath = 6 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${6+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'travel' | string>('travel');

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
                lessonLabel={"Intermediate Vocabulary Lesson 6"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Perjalanan & Budaya"
                subtitle="Vocabulary • Pelajaran 6"
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
                  onClick={() => setVocabSection('travel')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'travel' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Perjalanan
                </button>

                <button
                  onClick={() => setVocabSection('culture')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'culture' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Budaya
                </button>

                <button
                  onClick={() => setVocabSection('global')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'global' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Global
                </button>

              </div>
      
                                
              {vocabSection === 'travel' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Perjalanan & Pariwisata</h3>
                      <p className="text-xs text-sky-700">Menjelajahi dunia.</p>
                    </div>
                  </div>
                  {renderVocabList(TRAVEL_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'culture' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Masyarakat & Budaya</h3>
                      <p className="text-xs text-sky-700">Orang dan tradisi.</p>
                    </div>
                  </div>
                  {renderVocabList(CULTURE_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'global' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Topik Global</h3>
                      <p className="text-xs text-sky-700">Masalah dunia dan politik.</p>
                    </div>
                  </div>
                  {renderVocabList(GLOBAL_VOCAB, 'sky')}
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
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <h3 className="font-bold text-orange-800 mb-2 text-sm uppercase">Perjalanan</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"We booked our <b>accommodation</b> in advance."</p>
                    <p className="text-xs text-slate-500 mb-2">(Kami memesan <b>akomodasi</b> kami sebelumnya.)</p>
                    <p className="text-sm text-slate-700 italic">"The <b>itinerary</b> includes a visit to the museum."</p>
                    <p className="text-xs text-slate-500">(<b>Rencana perjalanan</b> termasuk kunjungan ke museum.)</p>
                  </div>

                  <div className="bg-teal-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-teal-800 mb-2 text-sm uppercase">Masalah Global</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"<b>Globalization</b> connects people around the world."</p>
                    <p className="text-xs text-slate-500 mb-2">(<b>Globalisasi</b> menghubungkan orang di seluruh dunia.)</p>
                    <p className="text-sm text-slate-700 italic">"The government is trying to reduce <b>poverty</b>."</p>
                    <p className="text-xs text-slate-500">(Pemerintah sedang berusaha mengurangi <b>kemiskinan</b>.)</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2 text-sm uppercase tracking-wide">Kolokasi Umum</h3>
                <div className="bg-white p-3 rounded-lg border border-indigo-100/50">
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <b>Book</b> accommodation (Memesan penginapan)</li>
                    <li>• <b>Cross</b> the border (Melintasi perbatasan)</li>
                    <li>• <b>Preserve</b> heritage (Melestarikan warisan)</li>
                    <li>• <b>Respect</b> customs (Menghormati adat)</li>
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

export default InterVocabLesson6;
