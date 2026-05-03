import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeftIcon, MoreIcon, VolumeIcon, InfoIcon,
    CheckCircleIcon, XCircleIcon, PlayCircleIcon, LightBulbIcon,
    Sparkles, TrendUpIcon, BookIcon, PuzzleIcon
} from '../../../../../components/Icons';
import { QuizSection } from './QuizSection';
import { LESSON_EXERCISES } from './exercises';
import VocabWordList from './VocabWordList';
import { playAudio } from '../../../../../services/ttsService';


/* ─── Vocabulary Completion Helpers ─── */
const VOCAB_STORAGE_KEY = 'talky_beginner_vocabulary_completed';
function getCompletedVocabLessons(): number[] {
  try { return JSON.parse(localStorage.getItem(VOCAB_STORAGE_KEY) || '[]'); } catch { return []; }
}
function markVocabComplete(lessonId: number) {
  const done = getCompletedVocabLessons();
  if (!done.includes(lessonId)) localStorage.setItem(VOCAB_STORAGE_KEY, JSON.stringify([...done, lessonId]));
}

interface Lesson1Props {
    apiKey?: string;
    onNavigate?: (view: any) => void;
    userParams?: { name: string; isLifetime: boolean };
    onComplete?: () => void;
}

const VOCAB_LIST = [
    { word: "Hello", ipa: "/həˈloʊ/", meaning: "Halo (Formal/Umum)" },
    { word: "Hi", ipa: "/haɪ/", meaning: "Hai (Informal)" },
    { word: "Good morning", ipa: "/ˌɡʊd ˈmɔːrnɪŋ/", meaning: "Selamat pagi" },
    { word: "Good afternoon", ipa: "/ˌɡʊd ˌæftərˈnuːn/", meaning: "Selamat siang/sore" },
    { word: "Good evening", ipa: "/ˌɡʊd ˈiːvnɪŋ/", meaning: "Selamat malam (sapaan)" },
    { word: "Good night", ipa: "/ˌɡʊd ˈnaɪt/", meaning: "Selamat tidur (perpisahan)" },
    { word: "How are you?", ipa: "/haʊ ɑːr juː/", meaning: "Apa kabar?" },
    { word: "I'm fine, thanks", ipa: "/aɪm faɪn, θæŋks/", meaning: "Saya baik, terima kasih" },
    { word: "Not bad", ipa: "/nɒt bæd/", meaning: "Lumayan / Tidak buruk" },
    { word: "What's up?", ipa: "/wɒts ʌp/", meaning: "Ada apa? (Sangat Informal)" },
    { word: "How's it going?", ipa: "/haʊz ɪt ˈɡoʊɪŋ/", meaning: "Bagaimana kabarmu?" },
    { word: "Nice to meet you", ipa: "/naɪs tu miːt juː/", meaning: "Senang bertemu denganmu" },
    { word: "Pleased to meet you", ipa: "/pliːzd tu miːt juː/", meaning: "Senang berkenalan (Formal)" },
    { word: "Goodbye", ipa: "/ˌɡʊdˈbaɪ/", meaning: "Selamat tinggal" },
    { word: "Bye", ipa: "/baɪ/", meaning: "Dah / Dadah" },
    { word: "See you later", ipa: "/siː juː ˈleɪtər/", meaning: "Sampai jumpa lagi" },
    { word: "See you soon", ipa: "/siː juː suːn/", meaning: "Sampai jumpa segera" },
    { word: "Take care", ipa: "/teɪk ker/", meaning: "Hati-hati" },
    { word: "Have a nice day", ipa: "/hæv ə naɪs deɪ/", meaning: "Semoga harimu menyenangkan" },
    { word: "Welcome", ipa: "/ˈwɛlkəm/", meaning: "Selamat datang" },
    { word: "Thank you", ipa: "/θæŋk juː/", meaning: "Terima kasih" },
    { word: "You're welcome", ipa: "/jʊr ˈwɛlkəm/", meaning: "Sama-sama" },
    { word: "Excuse me", ipa: "/ɪkˈskjuːz miː/", meaning: "Permisi" },
    { word: "I'm sorry", ipa: "/aɪm ˈsɔːri/", meaning: "Saya minta maaf" },
    { word: "Please", ipa: "/pliːz/", meaning: "Tolong / Silakan" },
    { word: "My name is...", ipa: "/maɪ neɪm ɪz/", meaning: "Nama saya..." },
    { word: "What is your name?", ipa: "/wɒts jʊr neɪm/", meaning: "Siapa namamu?" },
    { word: "Where are you from?", ipa: "/wɛr ɑːr juː frɒm/", meaning: "Dari mana asalmu?" },
    { word: "I'm from...", ipa: "/aɪm frɒm/", meaning: "Saya dari..." },
    { word: "Long time no see", ipa: "/lɔːŋ taɪm noʊ siː/", meaning: "Lama tidak bertemu" },
];

const PHRASES_DATA = [
    { en: "My name is [Name].", id: "Nama saya [Nama]." },
    { en: "I am [Name].", id: "Saya [Nama]." },
    { en: "What is your name?", id: "Siapa nama anda?" },
    { en: "Nice to meet you.", id: "Senang bertemu denganmu." }
];

const Lesson1: React.FC<Lesson1Props> = ({ onNavigate, userParams, onComplete }) => {
    const navigate = useNavigate();

    const nextLessonPath = '/modul/english/beginner/vocabulary/lesson-2';
    const [isCompleted, setIsCompleted] = React.useState(() => getCompletedVocabLessons().includes(1));
    const [showVocabModal, setShowVocabModal] = React.useState(false);
    const handleSelesai = () => { markVocabComplete(1); setIsCompleted(true); setShowVocabModal(true); };

    const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
    // Quiz state removed in favor of QuizSection component

    // --- Audio Handler ---
    const handlePlayAudio = (text: string) => { playAudio(text, 0.9); };

  const vocabModal = showVocabModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowVocabModal(false)}>
      <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #3498DB, #3498DB99)' }}><span style={{ fontSize: 36 }}>🏆</span></div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Lesson Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Vocabulary Lesson 1</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowVocabModal(false); navigate('/modul/english/beginner/vocabulary/lesson-2'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #3498DB, #3498DBbb)' }}>Next ›</button>
          <button onClick={() => { setShowVocabModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

    return (
        <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50 relative">
            {vocabModal}
            {/* Header - Sticky */}
            <header className="flex-none bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100">
                <div className="px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => onNavigate ? onNavigate(null) : navigate(-1)}
                        className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-50 transition text-slate-600 active:bg-slate-100"
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <div className="text-center">
                        <h1 className="text-sm font-bold text-slate-800">Greetings & Introductions</h1>
                        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">English • Lesson 1</p>
                    </div>
                    {nextLessonPath ? (
                    <button
                      onClick={() => navigate(nextLessonPath)}
                      className="flex items-center gap-1 px-3 h-9 rounded-full text-xs font-bold text-white"
                      style={{ background: '#3498DB', boxShadow: '0 2px 10px #3498DB55' }}
                    >
                      Next ›
                    </button>
                  ) : (
                    <div className="w-10" />
                  )}
                </div>

                {/* Tabs (Desktop Only) */}
                <div className="hidden md:flex border-b border-slate-200 bg-white/50 backdrop-blur-sm">
                    <button
                        onClick={() => setActiveTab('learn')}
                        className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-all ${activeTab === 'learn' ? 'border-sky-500 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                        Learn
                    </button>
                    <button
                        onClick={() => setActiveTab('practice')}
                        className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-all ${activeTab === 'practice' ? 'border-sky-500 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                        Practice
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">
                <div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">
                    {activeTab === 'learn' ? (
                        <>
                            {/* Section 1: Why Greetings Matter */}
                            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-teal-50 p-2 rounded-lg text-teal-600">
                                        <InfoIcon className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-lg font-bold text-slate-800">Why Greetings Matter</h2>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Menyapa adalah langkah pertama dalam setiap percakapan. Pelajaran ini akan membantu Anda menyapa orang lain dan memperkenalkan diri dengan percaya diri dalam situasi apapun.
                                </p>
                            </section>

                            {/* Section 2: Core Vocabulary */}
                            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                                            <VolumeIcon className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-lg font-bold text-slate-800">Core Vocabulary</h2>
                                    </div>
                                    <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-md">{VOCAB_LIST.length} Words</span>
                                </div>

                                
                                <VocabWordList items={VOCAB_LIST} accentColor="#3498DB" />
                            </section>

                            {/* Section 3: Practice Exercises */}
                            {/* Practice moved to tab 2 */}

                            {/* Section 4: Key Phrases */}
                            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                                        <InfoIcon className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-lg font-bold text-slate-800">Key Phrases for Introduction</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {PHRASES_DATA.map((phrase, idx) => (
                                        <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                            <p className="font-bold text-slate-800 mb-1">{phrase.en}</p>
                                            <p className="text-xs text-slate-500">{phrase.id}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Section 5: Common Mistakes */}
                            <section className="bg-orange-50 rounded-2xl p-6 shadow-sm border border-orange-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-white p-2 rounded-lg text-orange-500 shadow-sm">
                                        <InfoIcon className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-lg font-bold text-orange-900">Common Mistakes to Avoid</h2>
                                </div>

                                <div className="space-y-3 bg-white/60 p-4 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <XCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-red-600 text-sm">Mistake:</span>
                                            <p className="text-slate-600 text-sm">Greeting someone at 8 PM with "Good Night".</p>
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-orange-200/50"></div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-green-600 text-sm">Correct:</span>
                                            <p className="text-slate-600 text-sm">Use "Good evening" when you meet someone in the evening. "Good night" is only for saying goodbye or going to sleep.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section 6: Sample Dialogue */}
                            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                        <MoreIcon className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-lg font-bold text-slate-800">Sample Dialogue</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-start">
                                        <div className="bg-slate-100 text-slate-700 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                                            Hello. My name is Anna. What is your name?
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-teal-600 text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                                            Hi Anna. I am Jack. Nice to meet you.
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-slate-100 text-slate-700 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                                            Nice to meet you too, Jack.
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-teal-600 text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                                            Goodbye, Anna.
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-slate-100 text-slate-700 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                                            Bye, Jack.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section 7: Pro Tip */}
                            <div className="bg-indigo-600 rounded-2xl p-6 shadow-lg shadow-indigo-600/20 text-white relative overflow-hidden mb-6">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Sparkles className="w-32 h-32" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <LightBulbIcon className="w-5 h-5 text-yellow-300" />
                                        <h3 className="font-bold text-lg">Pro Tip: Timing is Everything!</h3>
                                    </div>
                                    <p className="text-indigo-100 text-sm leading-relaxed">
                                        Ingat! Good morning (pukul 5 am - 12 siang), Good afternoon (12 siang - 6 sore), dan Good evening (setelah jam 6 sore). Good night hanya diucapkan saat akan berpisah di malam hari atau sebelum tidur, bukan saat bertemu.
                                    </p>
                                </div>
                            </div>

                            {/* Completion Button */}
                            <div className="flex justify-center pb-6">
                                <button
                                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                                    className="w-full md:w-auto px-8 py-4 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                                    style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #3498DB, #3498DBcc)' }}
                                >
                                    <CheckCircleIcon className="w-6 h-6" />
                                    {isCompleted ? 'Sudah Selesai ✓' : 'Complete Lesson'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="animate-fade-in">
                            <QuizSection questions={LESSON_EXERCISES[1]} />
                        </div>
                    )}
                </div>
            </div>
            {/* Bottom Navigation (Mobile Only) */}
            <div className="md:hidden flex-none bg-white border-t border-slate-200 pb-safe pt-2 px-2 safe-area-bottom z-30">
                <div className="flex justify-around items-center pb-2">
                    <button
                        onClick={() => setActiveTab('learn')}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all w-full active:scale-95 ${activeTab === 'learn' ? 'text-teal-600 bg-teal-50' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <BookIcon className={`w-6 h-6 ${activeTab === 'learn' ? 'fill-current' : 'stroke-current'}`} />
                        <span className="text-[10px] font-bold">Learn</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('practice')}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all w-full active:scale-95 ${activeTab === 'practice' ? 'text-teal-600 bg-teal-50' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <PuzzleIcon className={`w-6 h-6 ${activeTab === 'practice' ? 'fill-current' : 'stroke-current'}`} />
                        <span className="text-[10px] font-bold">Practice</span>
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Lesson1;
