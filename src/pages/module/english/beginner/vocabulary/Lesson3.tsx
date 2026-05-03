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



// Vocabulary about Personal Info
const VOCAB_LIST = [
    { word: "Name", ipa: "/neɪm/", meaning: "Nama" },
    { word: "Age", ipa: "/eɪdʒ/", meaning: "Umur / Usia" },
    { word: "Live", ipa: "/lɪv/", meaning: "Tinggal (di suatu tempat)" },
    { word: "From", ipa: "/frɒm/", meaning: "Dari (asal)" },
    { word: "Country", ipa: "/ˈkʌntri/", meaning: "Negara" },
    { word: "City", ipa: "/ˈsɪti/", meaning: "Kota" },
    { word: "Job", ipa: "/dʒɒb/", meaning: "Pekerjaan" },
    { word: "Student", ipa: "/ˈstjuːdənt/", meaning: "Murid / Mahasiswa" },
    { word: "Teacher", ipa: "/ˈtiːtʃər/", meaning: "Guru" },
    { word: "Work", ipa: "/wɜːrk/", meaning: "Bekerja" },
    { word: "Hobby", ipa: "/ˈhɒbi/", meaning: "Hobi / Kegemaran" },
    { word: "Like", ipa: "/laɪk/", meaning: "Suka" },
    { word: "Single", ipa: "/ˈsɪŋɡəl/", meaning: "Lajang / Belum menikah" },
    { word: "Married", ipa: "/ˈmærid/", meaning: "Sudah menikah" },
    { word: "Years old", ipa: "/jɪərz oʊld/", meaning: "Tahun (satuan umur)" },
];

const PHRASES_DATA = [
    { en: "I am [Age] years old.", id: "Umur saya [Umur] tahun." },
    { en: "I live in [City].", id: "Saya tinggal di [Kota]." },
    { en: "I am from [Country].", id: "Saya berasal dari [Negara]." },
    { en: "I work as a [Job].", id: "Saya bekerja sebagai [Pekerjaan]." },
    { en: "I like [Hobby].", id: "Saya suka [Hobi]." }
];

const Lesson3: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/vocabulary/lesson-4';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedVocabLessons().includes(3));
  const [showVocabModal, setShowVocabModal] = React.useState(false);
  const handleSelesai = () => { markVocabComplete(3); setIsCompleted(true); setShowVocabModal(true); };

        // Quiz state removed

    // --- Audio Handler ---
    const handlePlayAudio = (text: string) => { playAudio(text, 0.9); };

  const vocabModal = showVocabModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowVocabModal(false)}>
      <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #3498DB, #3498DB99)' }}><span style={{ fontSize: 36 }}>🏆</span></div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Lesson Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Vocabulary Lesson 3</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowVocabModal(false); navigate('/modul/english/beginner/vocabulary/lesson-4'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #3498DB, #3498DBbb)' }}>Next ›</button>
          <button onClick={() => { setShowVocabModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

    return (
    <>
    {vocabModal}
        <LessonShell
            title="Introducing Yourself"
            subtitle="Vocabulary • Pelajaran 3"
            accentColor="#3498DB"
            nextLesson={'/modul/english/beginner/vocabulary/lesson-4'}
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
                                        <User size={20} />
                                    </div>
                                    <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Talking About Yourself</h2>
                                </div>
                                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                                    Memperkenalkan diri adalah keterampilan dasar terpenting. Anda akan belajar cara menyebutkan umur, asal, pekerjaan, dan hobi Anda dengan benar.
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

                            {/* Section 3: Key Sentence Patterns */}
                            <motion.section custom={2} variants={sectionVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                                        <Info size={20} />
                                    </div>
                                    <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Sentence Patterns</h2>
                                </div>

                                <div className="space-y-4">
                                    {PHRASES_DATA.map((phrase, idx) => (
                                        <div key={idx} className="bg-[var(--color-background)] rounded-xl p-4 border border-[var(--color-border)] relative group hover:border-[var(--color-border)] transition-colors">
                                            <p className="font-bold text-[var(--color-text-primary)] mb-1">{phrase.en}</p>
                                            <p className="text-xs text-[var(--color-text-muted)]">{phrase.id}</p>
                                            <button
                                                onClick={() => handlePlayAudio(phrase.en.replace('[Age]', 'twenty five').replace('[City]', 'Jakarta').replace('[Country]', 'Indonesia').replace('[Job]', 'teacher').replace('[Hobby]', 'reading'))}
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
                                    <h2 className="text-lg font-bold text-orange-900">Don't Say This!</h2>
                                </div>

                                <div className="space-y-4 bg-white/60 p-4 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <XCircle size={20} />
                                        <div>
                                            <p className="font-bold text-[var(--color-text-primary)] text-sm mb-1 line-through decoration-red-500 decoration-2">I have 20 years.</p>
                                            <p className="text-[var(--color-text-muted)] text-xs">Direct translation from many languages, but wrong in English.</p>
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-orange-200/50"></div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 size={20} />
                                        <div>
                                            <p className="font-bold text-[var(--color-text-primary)] text-sm mb-1">I am 20 years old.</p>
                                            <p className="text-[var(--color-text-muted)] text-xs">Or simply "I am 20".</p>
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
                                    <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Dialogue</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 text-[var(--color-text-primary)] px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                                            Tell me about yourself.
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-[var(--color-primary)] text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                                            My name is Sarah. I am 22 years old.
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 text-[var(--color-text-primary)] px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                                            Where are you from?
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-[var(--color-primary)] text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                                            I am from London, but I live in Tokyo now.
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 text-[var(--color-text-primary)] px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                                            What do you do?
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-[var(--color-primary)] text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                                            I am a student. I like reading books.
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
                                        <h3 className="font-bold text-lg">Pro Tip: "I am a..."</h3>
                                    </div>
                                    <p className="text-indigo-100 text-sm leading-relaxed">
                                        Saat menyebutkan pekerjaan, jangan lupa artikel "a" atau "an". <br />
                                        Salah: "I am teacher". <br />
                                        Benar: "I am <span className="font-bold text-white underline decoration-yellow-300">a</span> teacher".
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
                            <QuizSection questions={LESSON_EXERCISES[3]} />
                        </div>
                </motion.div>
            )}
        </LessonShell>
    </>
  );
};

export default Lesson3;
