import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, PlayCircle, Lightbulb, Sparkles, Info, CheckCircle2, XCircle, MessageSquare, BookOpen, PenTool, Mic, ChevronLeft, MoreHorizontal, BarChart3, Flame, Hand, History, Home, Star, TrendingUp, Trophy, User } from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';
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



// Vocabulary about Time and Days
const VOCAB_LIST = [
    { word: "Time", ipa: "/taɪm/", meaning: "Waktu" },
    { word: "Second", ipa: "/ˈsɛkənd/", meaning: "Detik" },
    { word: "Minute", ipa: "/ˈmɪnɪt/", meaning: "Menit" },
    { word: "Hour", ipa: "/ˈaʊər/", meaning: "Jam (durasi)" },
    { word: "Day", ipa: "/deɪ/", meaning: "Hari" },
    { word: "Week", ipa: "/wiːk/", meaning: "Minggu (pekan)" },
    { word: "Month", ipa: "/mʌnθ/", meaning: "Bulan" },
    { word: "Year", ipa: "/jɪər/", meaning: "Tahun" },
    { word: "Morning", ipa: "/ˈmɔːrnɪŋ/", meaning: "Pagi" },
    { word: "Afternoon", ipa: "/ˌæftərˈnuːn/", meaning: "Siang/Sore" },
    { word: "Evening", ipa: "/ˈiːvnɪŋ/", meaning: "Malam (sapaan/aktivitas)" },
    { word: "Night", ipa: "/naɪt/", meaning: "Malam (tidur/gelap)" },
    { word: "Today", ipa: "/təˈdeɪ/", meaning: "Hari ini" },
    { word: "Tomorrow", ipa: "/təˈmɔːroʊ/", meaning: "Besok" },
    { word: "Yesterday", ipa: "/ˈjɛstərdeɪ/", meaning: "Kemarin" },
    { word: "Monday", ipa: "/ˈmʌndeɪ/", meaning: "Senin" },
    { word: "Tuesday", ipa: "/ˈtjuːzdeɪ/", meaning: "Selasa" },
    { word: "Wednesday", ipa: "/ˈwɛnzdeɪ/", meaning: "Rabu" },
    { word: "Thursday", ipa: "/ˈθɜːrzdeɪ/", meaning: "Kamis" },
    { word: "Friday", ipa: "/ˈfraɪdeɪ/", meaning: "Jumat" },
    { word: "Saturday", ipa: "/ˈsætərdeɪ/", meaning: "Sabtu" },
    { word: "Sunday", ipa: "/ˈsʌndeɪ/", meaning: "Minggu" },
    { word: "Weekend", ipa: "/ˈwiːkɛnd/", meaning: "Akhir pekan" },
    { word: "O'clock", ipa: "/əˈklɒk/", meaning: "Tepat (untuk jam)" },
    { word: "Half past", ipa: "/hæf pæst/", meaning: "Lewat setengah (30 menit)" },
    { word: "Quarter", ipa: "/ˈkwɔːrtər/", meaning: "Seperempat (15 menit)" },
    { word: "Clock", ipa: "/klɒk/", meaning: "Jam (dinding/meja)" },
    { word: "Watch", ipa: "/wɒtʃ/", meaning: "Jam tangan" },
    { word: "Calendar", ipa: "/ˈkælɪndər/", meaning: "Kalender" },
    { word: "Date", ipa: "/deɪt/", meaning: "Tanggal" },
];

const PHRASES_DATA = [
    { en: "What time is it?", id: "Jam berapa sekarang?" },
    { en: "It is 5 o'clock.", id: "Sekarang jam 5 tepat." },
    { en: "What day is it today?", id: "Hari apa ini?" },
    { en: "See you on Monday.", id: "Sampai jumpa hari Senin." },
    { en: "My birthday is in July.", id: "Ulang tahun saya di bulan Juli." }
];

const Lesson7: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/vocabulary/lesson-8';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedVocabLessons().includes(7));
  const [showVocabModal, setShowVocabModal] = React.useState(false);
  const handleSelesai = () => { markVocabComplete(7); setIsCompleted(true); setShowVocabModal(true); };

        // Quiz state removed

    // --- Audio Handler ---
    const handlePlayAudio = (text: string) => { playAudio(text, 0.9); };

  const vocabModal = showVocabModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowVocabModal(false)}>
      <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #3498DB, #3498DB99)' }}><span style={{ fontSize: 36 }}>🏆</span></div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Lesson Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Vocabulary Lesson 7</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowVocabModal(false); navigate('/modul/english/beginner/vocabulary/lesson-8'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #3498DB, #3498DBbb)' }}>Next ›</button>
          <button onClick={() => { setShowVocabModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

    return (
    <>
    {vocabModal}
        <LessonShell
            title="Time & Days"
            subtitle="Vocabulary • Pelajaran 7"
            accentColor="#3498DB"
            nextLesson={'/modul/english/beginner/vocabulary/lesson-8'}
            tabs={[
                { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
                { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }
            ].filter(Boolean)}
            footer={() => (
                <button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #3498DB, #3498DBcc)' }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai \u2713' : 'Selesai'}
                </button>
            )}
        >
            {(tabId) => tabId === 'learn' ? (
                <div className="space-y-6">
                    {/* Section 1: Intro */}
                            <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-gray-50 p-2 rounded-lg text-[var(--color-primary)]">
                                        <Info size={20} />
                                    </div>
                                    <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Telling Time</h2>
                                </div>
                                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                                    Mengetahui cara membaca jam dan menyebutkan hari adalah hal mendasar. Di pelajaran ini, kita akan mempelajari kosakata waktu dan preposisi yang tepat.
                                </p>
                            </motion.section>

                            {/* Section 2: Core Vocabulary */}
                            <motion.section custom={1} variants={sectionVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                                            <BookOpen size={20} />
                                        </div>
                                        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Core Vocabulary</h2>
                                    </div>
                                    <span className="text-xs font-bold bg-gray-100 text-[var(--color-text-muted)] px-2 py-1 rounded-md">{VOCAB_LIST.length} Words</span>
                                </div>

                                
                                <VocabWordList items={VOCAB_LIST} accentColor="#3498DB" />
                            </motion.section>

                            {/* Section 3: Sentence Patterns */}
                            <motion.section custom={2} variants={sectionVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                                        <Info size={20} />
                                    </div>
                                    <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Common Phrases</h2>
                                </div>

                                <div className="space-y-4">
                                    {PHRASES_DATA.map((phrase, idx) => (
                                        <div key={idx} className="bg-[var(--color-background)] rounded-xl p-4 border border-[var(--color-border)] relative group hover:border-[var(--color-border)] transition-colors">
                                            <p className="font-bold text-[var(--color-text-primary)] mb-1">{phrase.en}</p>
                                            <p className="text-xs text-[var(--color-text-muted)]">{phrase.id}</p>
                                            <button
                                                onClick={() => handlePlayAudio(phrase.en)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-[var(--color-text-muted)] border border-[var(--color-border)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:text-[var(--color-primary)] hover:border-[var(--color-border)]"
                                            >
                                                <Volume2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>

                            {/* Section 4: Practice Exercises */}
                            {/* Practice moved to tab 2 */}

                            {/* Section 5: Common Mistakes */}
                            <motion.section custom={3} variants={sectionVariants} initial="hidden" animate="visible" className="bg-orange-50 rounded-2xl p-6 shadow-[var(--shadow-card)] border border-orange-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-white p-2 rounded-lg text-orange-500 shadow-[var(--shadow-card)]">
                                        <Info size={20} />
                                    </div>
                                    <h2 className="text-lg font-bold text-orange-900">Watch Out!</h2>
                                </div>

                                <div className="space-y-4 bg-white/60 p-4 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <XCircle size={20} />
                                        <div>
                                            <p className="font-bold text-[var(--color-text-primary)] text-sm mb-1 line-through decoration-red-500 decoration-2">I wake up in 7 o'clock.</p>
                                            <p className="text-[var(--color-text-muted)] text-xs">Wrong preposition.</p>
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-orange-200/50"></div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 size={20} />
                                        <div>
                                            <p className="font-bold text-[var(--color-text-primary)] text-sm mb-1">I wake up at 7 o'clock.</p>
                                            <p className="text-[var(--color-text-muted)] text-xs">Use "AT" for specific times.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* Section 6: Sample Dialogue */}
                            <motion.section custom={4} variants={sectionVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                        <MoreHorizontal size={20} />
                                    </div>
                                    <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Dialogue: Scheduling</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 text-[var(--color-text-primary)] px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                                            When is the meeting?
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-[var(--color-primary)] text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                                            It is on Tuesday morning.
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 text-[var(--color-text-primary)] px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                                            What time?
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-[var(--color-primary)] text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                                            At 10 o'clock. Don't be late!
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* Section 7: Pro Tip */}
                            <div className="bg-indigo-600 rounded-2xl p-6 shadow-lg shadow-indigo-600/20 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Sparkles size={128} />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Lightbulb size={24} className="text-yellow-300" />
                                        <h3 className="font-bold text-lg">Pro Tip: Preposition Triangle</h3>
                                    </div>
                                    <p className="text-indigo-100 text-sm leading-relaxed">
                                        Ingat aturan segitiga:<br />
                                        <span className="font-bold text-white">IN</span> (Umum/Besar): Years, Months (In 2024, In July)<br />
                                        <span className="font-bold text-white">ON</span> (Lebih spesifik): Days, Dates (On Monday, On July 1st)<br />
                                        <span className="font-bold text-white">AT</span> (Sangat spesifik): Time (At 5 PM)
                                    </p>
                                </div>
                            </div>
                </div>
            ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                    <div className="">
                            <QuizSection questions={LESSON_EXERCISES[7]} />
                        </div>
                </motion.div>
            )}
        </LessonShell>
    </>
  );
};

export default Lesson7;
