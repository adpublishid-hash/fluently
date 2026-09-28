import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const JOURNALISM_VOCAB = [

  { word: "Headline", ipa: "/ˈhɛdlaɪn/", meaning: "Judul berita utama" },
  { word: "Journalist", ipa: "/ˈdʒɜːrnəlɪst/", meaning: "Wartawan / Jurnalis" },
  { word: "Article", ipa: "/ˈɑːrtɪkəl/", meaning: "Artikel" },
  { word: "Coverage", ipa: "/ˈkʌvərɪdʒ/", meaning: "Liputan berita" },
  { word: "Source", ipa: "/sɔːrs/", meaning: "Sumber (berita/informasi)" },
  { word: "Interview", ipa: "/ˈɪntərvjuː/", meaning: "Wawancara" },
  { word: "Report", ipa: "/rɪˈpɔːrt/", meaning: "Laporan / Melaporkan" },
  { word: "Column", ipa: "/ˈkɒləm/", meaning: "Kolom (opini di koran)" },
  { word: "Editor", ipa: "/ˈɛdɪtər/", meaning: "Penyunting / Editor" },
  { word: "Press", ipa: "/prɛs/", meaning: "Pers / Media cetak" },

];

const BROADCAST_VOCAB = [

  { word: "Broadcast", ipa: "/ˈbrɔːdkæst/", meaning: "Siaran / Menyiarkan" },
  { word: "Channel", ipa: "/ˈtʃænl/", meaning: "Saluran (TV/Radio)" },
  { word: "Audience", ipa: "/ˈɔːdiəns/", meaning: "Penonton / Pemirsa" },
  { word: "Commercial", ipa: "/kəˈmɜːrʃəl/", meaning: "Iklan (TV/Radio)" },
  { word: "Anchor", ipa: "/ˈæŋkər/", meaning: "Pembawa berita" },
  { word: "Live", ipa: "/laɪv/", meaning: "Langsung (Siaran)" },
  { word: "Episode", ipa: "/ˈɛpɪsoʊd/", meaning: "Episode" },
  { word: "Studio", ipa: "/ˈstjuːdioʊ/", meaning: "Studio" },
  { word: "Network", ipa: "/ˈnɛtwɜːrk/", meaning: "Jaringan (TV/Media)" },
  { word: "Series", ipa: "/ˈsɪəriːz/", meaning: "Serial" },

];

const INFO_SOCIETY_VOCAB = [

  { word: "Misinformation", ipa: "/ˌmɪsɪnfərˈmeɪʃən/", meaning: "Informasi yang salah (Hoaks)" },
  { word: "Reliable", ipa: "/rɪˈlaɪəbəl/", meaning: "Dapat dipercaya" },
  { word: "Bias", ipa: "/ˈbaɪəs/", meaning: "Bias / Keberpihakan" },
  { word: "Censorship", ipa: "/ˈsɛnsərʃɪp/", meaning: "Penyensoran" },
  { word: "Public opinion", ipa: "/ˈpʌblɪk əˈpɪnjən/", meaning: "Opini publik" },
  { word: "Statement", ipa: "/ˈsteɪtmənt/", meaning: "Pernyataan" },
  { word: "Rumor", ipa: "/ˈruːmər/", meaning: "Rumor / Gosip" },
  { word: "Fact-check", ipa: "/fækt tʃɛk/", meaning: "Cek fakta" },
  { word: "Influence", ipa: "/ˈɪnfluəns/", meaning: "Pengaruh" },
  { word: "Propaganda", ipa: "/ˌprɒpəˈɡændə/", meaning: "Propaganda" },

];

const QUIZ_QUESTIONS = [

  { id: 1, question: "The title at the top of a newspaper article is the ___.", options: ['Caption', 'Headline', 'Deadline'], answer: 'Headline', explanation: "Headline (Judul berita) adalah judul di bagian atas artikel atau halaman di surat kabar atau majalah." },
  { id: 2, question: "False information spread deliberately is often called ___.", options: ['Misinformation', 'Broadcasting', 'Coverage'], answer: 'Misinformation', explanation: "Misinformation (Informasi yang salah) mengacu pada informasi yang salah atau tidak akurat." },
  { id: 3, question: "The person who reads the news on TV is the ___.", options: ['Editor', 'Anchor', 'Actor'], answer: 'Anchor', explanation: "News Anchor (Pembawa berita) adalah orang yang menyajikan berita selama program berita." },
  { id: 4, question: "This news channel is ___ because it favors one political party.", options: ['reliable', 'biased', 'live'], answer: 'biased', explanation: "Bias (Bias) berarti menunjukkan preferensi yang tidak adil untuk atau terhadap sesuatu." },
  { id: 5, question: "We interrupt this program for a ___ news report.", options: ['live', 'dead', 'sleep'], answer: 'live', explanation: "Live (Langsung) berarti disiarkan pada saat kejadian." },
  { id: 6, question: "A person who writes news articles is a ___.", options: ['journalist', 'anchor', 'audience'], answer: 'journalist', explanation: "Journalist (Wartawan) menulis berita untuk koran, majalah, atau situs web." },
  { id: 7, question: "The reporter interviewed several ___ for the story.", options: ['broadcasts', 'sources', 'channels'], answer: 'sources', explanation: "Source (Sumber) adalah orang atau tempat dari mana informasi berasal." },
  { id: 8, question: "The ___ wrote an opinion piece about politics.", options: ['press', 'column', 'headline'], answer: 'column', explanation: "Column (Kolom) adalah artikel reguler di surat kabar atau majalah." },
  { id: 9, question: "The TV ___ will air the new show at 8 PM.", options: ['source', 'channel', 'rumor'], answer: 'channel', explanation: "Channel (Saluran) adalah stasiun TV atau radio tertentu." },
  { id: 10, question: "The ___ for the football match was excellent.", options: ['coverage', 'censorship', 'propaganda'], answer: 'coverage', explanation: "Coverage (Liputan) adalah cara sebuah subjek dilaporkan oleh media." },
  { id: 11, question: "There's a short ___ break every 15 minutes.", options: ['commercial', 'episode', 'network'], answer: 'commercial', explanation: "Commercial (Iklan) adalah iklan di TV atau radio." },
  { id: 12, question: "The final ___ of the series was amazing.", options: ['broadcast', 'episode', 'statement'], answer: 'episode', explanation: "Episode adalah satu bagian dari serial TV atau radio." },
  { id: 13, question: "You should always ___ information before sharing it.", options: ['gossip', 'fact-check', 'broadcast'], answer: 'fact-check', explanation: "Fact-check (Cek fakta) berarti memverifikasi kebenaran informasi." },
  { id: 14, question: "Don't believe every ___ you hear.", options: ['rumor', 'interview', 'report'], answer: 'rumor', explanation: "Rumor (Gosip) adalah cerita yang menyebar tanpa bukti jelas." },
  { id: 15, question: "The government issued an official ___.", options: ['rumor', 'statement', 'commercial'], answer: 'statement', explanation: "Statement (Pernyataan) adalah pernyataan resmi fakta atau pendapat." },
  { id: 16, question: "The ___ has the power to shape public opinion.", options: ['studio', 'press', 'series'], answer: 'press', explanation: "Press (Pers) mengacu pada wartawan dan organisasi berita." },
  { id: 17, question: "Some countries practice ___ of the media.", options: ['censorship', 'influence', 'interview'], answer: 'censorship', explanation: "Censorship (Penyensoran) adalah penekanan atau larangan informasi." },
  { id: 18, question: "This is a ___ source of information.", options: ['biased', 'reliable', 'rumored'], answer: 'reliable', explanation: "Reliable (Dapat dipercaya) berarti dapat diandalkan sebagai jujur atau akurat." },
  { id: 19, question: "The ___ watched the debate on TV.", options: ['anchor', 'audience', 'editor'], answer: 'audience', explanation: "Audience (Penonton) adalah orang-orang yang menonton atau mendengarkan sesuatu." },
  { id: 20, question: "The ___ will ___ the documentary tonight.", options: ['network, broadcast', 'rumor, fact-check', 'bias, influence'], answer: 'network, broadcast', explanation: "Network (Jaringan) akan broadcast (menyiarkan) acara." }

];

const InterVocabLesson8: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 8);
    const nextLessonPath = 8 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${8+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'news' | string>('news');

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
                lessonLabel={"Intermediate Vocabulary Lesson 8"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Media & Berita"
                subtitle="Vocabulary • Pelajaran 8"
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
                  onClick={() => setVocabSection('news')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'news' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Jurnalisme
                </button>

                <button
                  onClick={() => setVocabSection('media')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'media' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Siaran
                </button>

                <button
                  onClick={() => setVocabSection('info')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'info' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Informasi
                </button>

              </div>
      
                                
              {vocabSection === 'news' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Berita & Jurnalisme</h3>
                      <p className="text-xs text-sky-700">Menulis dan melaporkan cerita.</p>
                    </div>
                  </div>
                  {renderVocabList(JOURNALISM_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'media' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Media & Siaran</h3>
                      <p className="text-xs text-sky-700">TV, Radio, dan acara.</p>
                    </div>
                  </div>
                  {renderVocabList(BROADCAST_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'info' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Informasi & Masyarakat</h3>
                      <p className="text-xs text-sky-700">Kebenaran, kebohongan, dan opini publik.</p>
                    </div>
                  </div>
                  {renderVocabList(INFO_SOCIETY_VOCAB, 'sky')}
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
                    <h3 className="font-bold text-blue-800 mb-2 text-sm uppercase">Berita Terkini</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"The <b>journalist</b> interviewed the president for an exclusive <b>report</b>."</p>
                    <p className="text-xs text-slate-500 mb-2">(<b>Jurnalis</b> mewawancarai presiden untuk <b>laporan</b> eksklusif.)</p>
                    <p className="text-sm text-slate-700 italic">"The <b>headline</b> on the front page was shocking."</p>
                    <p className="text-xs text-slate-500">(<b>Judul berita utama</b> di halaman depan sangat mengejutkan.)</p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <h3 className="font-bold text-orange-800 mb-2 text-sm uppercase">Berpikir Kritis</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"You should always <b>fact-check</b> information to avoid <b>misinformation</b>."</p>
                    <p className="text-xs text-slate-500 mb-2">(Anda harus selalu <b>memeriksa fakta</b> informasi untuk menghindari <b>informasi yang salah</b>.)</p>
                    <p className="text-sm text-slate-700 italic">"Some news channels have a strong political <b>bias</b>."</p>
                    <p className="text-xs text-slate-500">(Beberapa saluran berita memiliki <b>bias</b> politik yang kuat.)</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2 text-sm uppercase tracking-wide">Kolokasi Umum</h3>
                <div className="bg-white p-3 rounded-lg border border-indigo-100/50">
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <b>Broadcast</b> live (Menyiarkan langsung)</li>
                    <li>• <b>Spread</b> rumors (Menyebarkan rumor)</li>
                    <li>• <b>Reliable</b> source (Sumber terpercaya)</li>
                    <li>• <b>Public</b> opinion (Pendapat umum)</li>
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

export default InterVocabLesson8;
