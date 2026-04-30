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



// Vocabulary about Spelling
const VOCAB_LIST = [
    { word: "Alphabet", ipa: "/ˈælfəˌbɛt/", meaning: "Abjad / Alfabet" },
    { word: "Spelling", ipa: "/ˈspɛlɪŋ/", meaning: "Ejaan" },
    { word: "Letter", ipa: "/ˈlɛtər/", meaning: "Huruf" },
    { word: "Capital letter", ipa: "/ˈkæpɪtl ˈlɛtər/", meaning: "Huruf Besar / Kapital" },
    { word: "Small letter / Lowercase", ipa: "/smɔːl ˈlɛtər/", meaning: "Huruf Kecil" },
    { word: "Vowel", ipa: "/ˈvaʊəl/", meaning: "Huruf Vokal (A, E, I, O, U)" },
    { word: "Consonant", ipa: "/ˈkɒnsənənt/", meaning: "Huruf Konsonan" },
    { word: "First name", ipa: "/fɜːrst neɪm/", meaning: "Nama depan" },
    { word: "Surname / Last name", ipa: "/ˈsɜːrneɪm/", meaning: "Nama belakang / Marga" },
    { word: "Full name", ipa: "/fʊl neɪm/", meaning: "Nama lengkap" },
    { word: "@ (At)", ipa: "/æt/", meaning: "Simbol 'At' (di email)" },
    { word: ". (Dot)", ipa: "/dɒt/", meaning: "Titik (di website/email)" },
    { word: "_ (Underscore)", ipa: "/ˈʌndərˌskɔːr/", meaning: "Garis bawah" },
    { word: "- (Dash / Hyphen)", ipa: "/dæʃ/", meaning: "Strip / Tanda hubung" },
    { word: "/ (Slash)", ipa: "/slæʃ/", meaning: "Garis miring" },
];

const ALPHABET = [
    { char: "A", ipa: "/eɪ/" }, { char: "B", ipa: "/biː/" }, { char: "C", ipa: "/siː/" },
    { char: "D", ipa: "/diː/" }, { char: "E", ipa: "/iː/" }, { char: "F", ipa: "/ɛf/" },
    { char: "G", ipa: "/dʒiː/" }, { char: "H", ipa: "/eɪtʃ/" }, { char: "I", ipa: "/aɪ/" },
    { char: "J", ipa: "/dʒeɪ/" }, { char: "K", ipa: "/keɪ/" }, { char: "L", ipa: "/ɛl/" },
    { char: "M", ipa: "/ɛm/" }, { char: "N", ipa: "/ɛn/" }, { char: "O", ipa: "/oʊ/" },
    { char: "P", ipa: "/piː/" }, { char: "Q", ipa: "/kjuː/" }, { char: "R", ipa: "/ɑːr/" },
    { char: "S", ipa: "/ɛs/" }, { char: "T", ipa: "/tiː/" }, { char: "U", ipa: "/juː/" },
    { char: "V", ipa: "/viː/" }, { char: "W", ipa: "/ˈdʌbəl.juː/" }, { char: "X", ipa: "/ɛks/" },
    { char: "Y", ipa: "/waɪ/" }, { char: "Z", ipa: "/ziː/" },
];

const Lesson2: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/vocabulary/lesson-3';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedVocabLessons().includes(2));
  const [showVocabModal, setShowVocabModal] = React.useState(false);
  const handleSelesai = () => { markVocabComplete(2); setIsCompleted(true); setShowVocabModal(true); };

    // --- Audio Handler ---
    const handlePlayAudio = (text: string) => { playAudio(text, 0.8); };

  const vocabModal = showVocabModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowVocabModal(false)}>
      <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #3498DB, #3498DB99)' }}><span style={{ fontSize: 36 }}>🏆</span></div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Lesson Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Vocabulary Lesson 2</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowVocabModal(false); navigate(nextLessonPath); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #3498DB, #3498DBbb)' }}>Next ›</button>
          <button onClick={() => { setShowVocabModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    {vocabModal}
        <LessonShell
            title="The Alphabet & Spelling"
            subtitle="Vocabulary • Pelajaran 2"
            accentColor="#3498DB"
            nextLesson={nextLessonPath}
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
                    {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
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
                                    <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Why Spelling Matters</h2>
                                </div>
                                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                                    Dalam bahasa Inggris, ejaan sangat penting untuk menyebutkan nama, alamat email, atau kata sandi. Huruf Inggris diucapkan berbeda dengan bahasa Indonesia.
                                </p>
                            </motion.section>

                            {/* Section 2: The Alphabet Grid */}
                            <motion.section custom={1} variants={sectionVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                                        <Volume2 size={20} />
                                    </div>
                                    <h2 className="text-lg font-bold text-[var(--color-text-primary)]">The Alphabet (A-Z)</h2>
                                </div>

                                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                                    {ALPHABET.map((letter) => (
                                        <button
                                            key={letter.char}
                                            onClick={() => handlePlayAudio(letter.char)}
                                            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] hover:bg-gray-50 hover:border-[var(--color-border)] hover:scale-105 transition-all group"
                                        >
                                            <span className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] mb-1">{letter.char}</span>
                                            <span className="text-[10px] text-[var(--color-text-muted)] font-mono group-hover:text-[var(--color-primary)]">{letter.ipa}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.section>

                            {/* Section 3: Core Vocabulary Table */}
                            <motion.section custom={2} variants={sectionVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]">
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

                            {/* Section 4: Practice Exercises */}
                            {/* Practice moved to tab 2 */}

                            {/* Section 5: Tricky Letters */}
                            <motion.section custom={3} variants={sectionVariants} initial="hidden" animate="visible" className="bg-orange-50 rounded-2xl p-6 shadow-[var(--shadow-card)] border border-orange-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-white p-2 rounded-lg text-orange-500 shadow-[var(--shadow-card)]">
                                        <Info size={20} />
                                    </div>
                                    <h2 className="text-lg font-bold text-orange-900">Tricky Letters</h2>
                                </div>

                                <div className="space-y-3 bg-white/60 p-4 rounded-xl">
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">A</div>
                                        <div>
                                            <p className="font-bold text-[var(--color-text-primary)]">A vs E vs I</p>
                                            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                                                <span className="font-bold">A</span> /eɪ/ (sounds like 'ei'), <span className="font-bold">E</span> /iː/ (sounds like 'i'), <span className="font-bold">I</span> /aɪ/ (sounds like 'ai').
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-orange-200/50"></div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">G</div>
                                        <div>
                                            <p className="font-bold text-[var(--color-text-primary)]">G vs J</p>
                                            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                                                <span className="font-bold">G</span> /dʒiː/ (sounds like 'ji'), <span className="font-bold">J</span> /dʒeɪ/ (sounds like 'jei').
                                            </p>
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
                                    <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Dialogue: Checking Email</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 text-[var(--color-text-primary)] px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                                            What is your email address?
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-[var(--color-primary)] text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                                            It's john.doe@gmail.com
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 text-[var(--color-text-primary)] px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                                            Can you spell that, please?
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-[var(--color-primary)] text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                                            Sure. J-O-H-N <span className="text-teal-200 font-bold">dot</span> D-O-E <span className="text-teal-200 font-bold">at</span> gmail <span className="text-teal-200 font-bold">dot</span> com.
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
                                        <h3 className="font-bold text-lg">Pro Tip: "Double"</h3>
                                    </div>
                                    <p className="text-indigo-100 text-sm leading-relaxed">
                                        Jika ada dua huruf yang sama berdampingan, orang Inggris biasanya menyebutnya "Double". Contoh: "Apple" dieja A - P - P - L - E, tapi sering diucapkan "A - <span className="font-bold text-white">Double P</span> - L - E".
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
                            <QuizSection questions={LESSON_EXERCISES[2]} />
                        </div>
                </motion.div>
            )}
        </LessonShell>
    </>
  );
};

export default Lesson2;
