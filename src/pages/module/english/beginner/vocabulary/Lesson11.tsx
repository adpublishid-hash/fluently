import { useNavigate } from 'react-router-dom';
import React from 'react';
import { motion } from 'framer-motion';
import {
    Volume2, PlayCircle, Lightbulb, Sparkles, Info, CheckCircle2,
    BookOpen, PenTool, Trophy, Star, TrendingUp, RefreshCw, Award
} from 'lucide-react';
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

// ── Summary of all 10 lessons ──────────────────────────────────────────────
const LESSON_SUMMARY = [
    { no: 1, topic: "Greetings & Introductions", emoji: "👋", desc: "Hello, Good morning, Nice to meet you, Goodbye, Thank you..." },
    { no: 2, topic: "The Alphabet & Spelling",   emoji: "🔤", desc: "A–Z, Vowels, Consonants, How to spell words..." },
    { no: 3, topic: "Personal Information",       emoji: "👤", desc: "Name, Age, Occupation, I am / You are / He is..." },
    { no: 4, topic: "Filling Out Forms",          emoji: "📋", desc: "Address, Email, Phone, Nationality, Marital Status..." },
    { no: 5, topic: "Daily Routines",             emoji: "🌅", desc: "Wake up, Brush teeth, Have breakfast, Go to work..." },
    { no: 6, topic: "Family Members",             emoji: "👨‍👩‍👧", desc: "Parents, Siblings, Aunt, Uncle, Cousin, Grandparents..." },
    { no: 7, topic: "Days, Months & Time",        emoji: "📅", desc: "Monday–Sunday, January–December, Quarter past, Half past..." },
    { no: 8, topic: "Places in the City",         emoji: "🏙️", desc: "Hospital, School, Supermarket, Bank, Restaurant, Directions..." },
    { no: 9, topic: "Food & Drinks",              emoji: "🍜", desc: "Rice, Noodles, Juice, Spicy, Sweet, Ordering food..." },
    { no: 10, topic: "Hobbies & Interests",       emoji: "🎨", desc: "Like, Love, Enjoy, Swimming, Reading, Playing guitar..." },
];

// ── Key phrases to remember ────────────────────────────────────────────────
const KEY_PHRASES = [
    { en: "Nice to meet you.",            id: "Senang bertemu denganmu." },
    { en: "How old are you?",             id: "Berapa umurmu?" },
    { en: "I wake up at 6 AM.",           id: "Saya bangun jam 6 pagi." },
    { en: "My aunt's name is Sarah.",     id: "Nama bibi saya Sarah." },
    { en: "What time is it?",             id: "Jam berapa sekarang?" },
    { en: "Where is the pharmacy?",       id: "Di mana apoteknya?" },
    { en: "I'd like a bowl of soup.",     id: "Saya mau semangkuk sup." },
    { en: "I enjoy swimming.",            id: "Saya menikmati berenang." },
];

// ── Common mistakes across all lessons ────────────────────────────────────
const COMMON_MISTAKES = [
    { wrong: "I have 20 years.", correct: "I am 20 years old.", tip: "Gunakan 'am' bukan 'have' untuk umur." },
    { wrong: "I very like music.", correct: "I really like music.", tip: "Jangan letakkan 'very' langsung sebelum 'like'." },
    { wrong: "Good night! (saat bertemu)", correct: "Good evening!", tip: "'Good night' hanya untuk perpisahan malam / mau tidur." },
    { wrong: "She exercise every day.", correct: "She exercises every day.", tip: "Tambahkan -s/-es untuk orang ketiga tunggal (he/she/it)." },
];

const Lesson11: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = null;
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedVocabLessons().includes(11));
  const [showVocabModal, setShowVocabModal] = React.useState(false);
  const handleSelesai = () => { markVocabComplete(11); setIsCompleted(true); setShowVocabModal(true); };

    const handlePlayAudio = (text: string) => { playAudio(text, 0.9); };

  const vocabModal = showVocabModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowVocabModal(false)}>
      <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #3498DB, #3498DB99)' }}><span style={{ fontSize: 36 }}>🏆</span></div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Semua Lesson Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>semua Vocabulary Lesson</b>. Luar biasa!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <button onClick={() => { setShowVocabModal(false); navigate(-1); }} className="w-full py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali ke Daftar</button>
      </div>
    </div>
  ) : null;

  return (
    <>
    {vocabModal}
        <LessonShell
            title="Final Review & Assessment"
            subtitle="Vocabulary • Pelajaran 11"
            accentColor="#7C3AED"
            tabs={[
                { id: 'learn', label: 'Review', icon: <BookOpen size={14} /> },
                { id: 'practice', label: 'Ujian', icon: <PenTool size={14} /> },
            ]}
            footer={() => (
                <button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #7C3AED, #5B21B6)' }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
                </button>
            )}
        >
            {(tabId) => tabId === 'learn' ? (
                <div className="space-y-6">

                    {/* Hero Banner */}
                    <motion.div
                        custom={0} variants={sectionVariants} initial="hidden" animate="visible"
                        className="rounded-2xl p-6 text-white relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)' }}
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <Trophy size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Award size={20} className="text-yellow-300" />
                                <span className="text-sm font-bold text-purple-200">Pelajaran Terakhir</span>
                            </div>
                            <h2 className="text-2xl font-extrabold mb-2">Selamat! Hampir Selesai 🎉</h2>
                            <p className="text-purple-100 text-sm leading-relaxed">
                                Kamu telah menyelesaikan <strong className="text-white">10 pelajaran</strong> kosakata bahasa Inggris level pemula.
                                Pelajaran ini akan mengulang semua materi dan menguji pemahamanmu melalui kuis komprehensif.
                            </p>
                        </div>
                    </motion.div>

                    {/* Achievement Badges */}
                    <motion.section
                        custom={1} variants={sectionVariants} initial="hidden" animate="visible"
                        className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-yellow-50 p-2 rounded-lg text-yellow-600">
                                <Star size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Topik yang Telah Dikuasai</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {LESSON_SUMMARY.map((lesson) => (
                                <div
                                    key={lesson.no}
                                    className="flex flex-col items-center text-center p-3 rounded-xl bg-purple-50 border border-purple-100 hover:border-purple-300 transition-colors cursor-default"
                                >
                                    <span className="text-2xl mb-1">{lesson.emoji}</span>
                                    <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wide">
                                        Lesson {lesson.no}
                                    </span>
                                    <span className="text-[11px] text-[var(--color-text-secondary)] mt-0.5 leading-tight font-medium">
                                        {lesson.topic}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Lesson-by-lesson summary */}
                    <motion.section
                        custom={2} variants={sectionVariants} initial="hidden" animate="visible"
                        className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                                <TrendingUp size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Ringkasan Materi</h2>
                        </div>
                        <div className="space-y-3">
                            {LESSON_SUMMARY.map((lesson) => (
                                <div
                                    key={lesson.no}
                                    className="flex items-start gap-3 p-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]"
                                >
                                    <span className="text-xl flex-shrink-0 mt-0.5">{lesson.emoji}</span>
                                    <div>
                                        <p className="text-sm font-bold text-[var(--color-text-primary)]">
                                            #{lesson.no} — {lesson.topic}
                                        </p>
                                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5 leading-relaxed">
                                            {lesson.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Key Phrases Review */}
                    <motion.section
                        custom={3} variants={sectionVariants} initial="hidden" animate="visible"
                        className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                <RefreshCw size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Frasa Penting untuk Diingat</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {KEY_PHRASES.map((phrase, idx) => (
                                <div
                                    key={idx}
                                    className="relative group bg-[var(--color-background)] rounded-xl p-4 border border-[var(--color-border)] hover:border-indigo-300 transition-colors"
                                >
                                    <p className="font-bold text-[var(--color-text-primary)] text-sm mb-0.5">{phrase.en}</p>
                                    <p className="text-xs text-[var(--color-text-muted)]">{phrase.id}</p>
                                    <button
                                        onClick={() => handlePlayAudio(phrase.en)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-[var(--color-border)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:text-indigo-600 hover:border-indigo-300"
                                    >
                                        <Volume2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Common Mistakes */}
                    <motion.section
                        custom={4} variants={sectionVariants} initial="hidden" animate="visible"
                        className="bg-orange-50 rounded-2xl p-6 shadow-[var(--shadow-card)] border border-orange-100"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-white p-2 rounded-lg text-orange-500 shadow-[var(--shadow-card)]">
                                <Info size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-orange-900">Kesalahan Umum yang Harus Dihindari</h2>
                        </div>
                        <div className="space-y-4">
                            {COMMON_MISTAKES.map((item, idx) => (
                                <div key={idx} className="bg-white/70 rounded-xl p-4 space-y-2">
                                    <div className="flex items-start gap-2">
                                        <span className="text-red-500 font-bold text-xs shrink-0 mt-0.5">✗ SALAH</span>
                                        <p className="text-sm text-red-700 line-through decoration-red-400">{item.wrong}</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold text-xs shrink-0 mt-0.5">✓ BENAR</span>
                                        <p className="text-sm font-bold text-green-800">{item.correct}</p>
                                    </div>
                                    <p className="text-xs text-orange-700 bg-orange-100/50 px-2 py-1 rounded-lg">💡 {item.tip}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Pro Tip */}
                    <div className="bg-indigo-600 rounded-2xl p-6 shadow-lg shadow-indigo-600/20 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Sparkles size={128} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <Lightbulb size={24} className="text-yellow-300" />
                                <h3 className="font-bold text-lg">Pro Tip: Belajar Adalah Proses!</h3>
                            </div>
                            <p className="text-indigo-100 text-sm leading-relaxed">
                                Jangan khawatir jika belum hafal semua kosakata. Yang terpenting adalah <strong className="text-white">konsistensi</strong>.
                                Coba praktekkan <strong className="text-white">5 kata baru setiap hari</strong> dan gunakan dalam percakapan nyata.
                                Ingat, setiap native speaker pun pernah ada di tahap pemula! 🚀
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
                    <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 mb-4 flex items-start gap-3">
                        <Trophy size={20} className="text-purple-600 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-purple-800">Final Assessment</p>
                            <p className="text-xs text-purple-600 mt-0.5">
                                20 soal dari <strong>semua topik</strong> Lesson 1–10. Buktikan bahwa kamu sudah menguasai kosakata level Beginner!
                            </p>
                        </div>
                    </div>
                    <QuizSection questions={LESSON_EXERCISES[11]} />
                </motion.div>
            )}
        </LessonShell>
    </>
  );
};

export default Lesson11;
