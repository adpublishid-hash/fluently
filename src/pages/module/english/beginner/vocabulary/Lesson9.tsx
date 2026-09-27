import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, Lightbulb, Sparkles, Info, CheckCircle2, XCircle, BookOpen, PenTool, MoreHorizontal, Flame } from 'lucide-react';
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



// Vocabulary about Food & Drinks
const VOCAB_LIST = [
    { word: "Food", ipa: "/fuːd/", meaning: "Makanan" },
    { word: "Drink", ipa: "/drɪŋk/", meaning: "Minuman" },
    { word: "Breakfast", ipa: "/ˈbrɛkfəst/", meaning: "Sarapan" },
    { word: "Lunch", ipa: "/lʌntʃ/", meaning: "Makan siang" },
    { word: "Dinner", ipa: "/ˈdɪnər/", meaning: "Makan malam" },
    { word: "Water", ipa: "/ˈwɔːtər/", meaning: "Air" },
    { word: "Coffee", ipa: "/ˈkɒfi/", meaning: "Kopi" },
    { word: "Tea", ipa: "/tiː/", meaning: "Teh" },
    { word: "Milk", ipa: "/mɪlk/", meaning: "Susu" },
    { word: "Juice", ipa: "/dʒuːs/", meaning: "Jus" },
    { word: "Rice", ipa: "/raɪs/", meaning: "Nasi" },
    { word: "Bread", ipa: "/brɛd/", meaning: "Roti" },
    { word: "Noodle", ipa: "/ˈnuːdəl/", meaning: "Mie" },
    { word: "Meat", ipa: "/miːt/", meaning: "Daging" },
    { word: "Chicken", ipa: "/ˈtʃɪkɪn/", meaning: "Ayam" },
    { word: "Fish", ipa: "/fɪʃ/", meaning: "Ikan" },
    { word: "Beef", ipa: "/biːf/", meaning: "Daging sapi" },
    { word: "Egg", ipa: "/ɛɡ/", meaning: "Telur" },
    { word: "Cheese", ipa: "/tʃiːz/", meaning: "Keju" },
    { word: "Fruit", ipa: "/fruːt/", meaning: "Buah" },
    { word: "Vegetable", ipa: "/ˈvɛdʒtəbəl/", meaning: "Sayuran" },
    { word: "Apple", ipa: "/ˈæpəl/", meaning: "Apel" },
    { word: "Banana", ipa: "/bəˈnænə/", meaning: "Pisang" },
    { word: "Sugar", ipa: "/ˈʃʊɡər/", meaning: "Gula" },
    { word: "Salt", ipa: "/sɔːlt/", meaning: "Garam" },
    { word: "Pepper", ipa: "/ˈpɛpər/", meaning: "Lada / Merica" },
    { word: "Delicious", ipa: "/dɪˈlɪʃəs/", meaning: "Enak / Lezat" },
    { word: "Hungry", ipa: "/ˈhʌŋɡri/", meaning: "Lapar" },
    { word: "Thirsty", ipa: "/ˈθɜːrsti/", meaning: "Haus" },
    { word: "Menu", ipa: "/ˈmɛnjuː/", meaning: "Menu" },
];

const PHRASES_DATA = [
    { en: "I am hungry.", id: "Saya lapar." },
    { en: "I am thirsty.", id: "Saya haus." },
    { en: "What would you like to eat?", id: "Kamu mau makan apa?" },
    { en: "Can I have the menu, please?", id: "Boleh minta menunya?" },
    { en: "The food is delicious.", id: "Makanannya enak." }
];

const Lesson9: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/vocabulary/lesson-10';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedVocabLessons().includes(9));
  const [showVocabModal, setShowVocabModal] = React.useState(false);
  const handleSelesai = () => { markVocabComplete(9); setIsCompleted(true); setShowVocabModal(true); };

        // Quiz state removed

    // --- Audio Handler ---
    const handlePlayAudio = (text: string) => { playAudio(text, 0.9); };

  const vocabModal = showVocabModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowVocabModal(false)}>
      <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #3498DB, #3498DB99)' }}><span style={{ fontSize: 36 }}>🏆</span></div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Lesson Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Vocabulary Lesson 9</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowVocabModal(false); navigate('/modul/english/beginner/vocabulary/lesson-10'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #3498DB, #3498DBbb)' }}>Next ›</button>
          <button onClick={() => { setShowVocabModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

    return (
    <>
    {vocabModal}
        <LessonShell
            title="Food & Drinks"
            subtitle="Vocabulary • Pelajaran 9"
            accentColor="#3498DB"
            nextLesson={'/modul/english/beginner/vocabulary/lesson-10'}
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
                                        <Flame size={20} />
                                    </div>
                                    <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Eating & Drinking</h2>
                                </div>
                                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                                    Makanan adalah bagian besar dari kehidupan sosial. Pelajaran ini akan membantu Anda memesan makanan, mengungkapkan rasa lapar, dan mengenal nama-nama makanan dasar.
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
                                            <p className="font-bold text-[var(--color-text-primary)] text-sm mb-1 line-through decoration-red-500 decoration-2">I want a bread.</p>
                                            <p className="text-[var(--color-text-muted)] text-xs">Bread is usually uncountable.</p>
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-orange-200/50"></div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 size={20} />
                                        <div>
                                            <p className="font-bold text-[var(--color-text-primary)] text-sm mb-1">I want some bread.</p>
                                            <p className="text-[var(--color-text-muted)] text-xs">Or "a slice of bread".</p>
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
                                    <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Dialogue: Ordering Food</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 text-[var(--color-text-primary)] px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                                            Are you hungry?
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-[var(--color-primary)] text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                                            Yes, I am starving. Let's eat.
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 text-[var(--color-text-primary)] px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                                            What do you want to eat?
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-[var(--color-primary)] text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                                            I want fried rice and a glass of tea.
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 text-[var(--color-text-primary)] px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                                            Okay, I will have chicken noodles.
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
                                        <h3 className="font-bold text-lg">Pro Tip: "To Have"</h3>
                                    </div>
                                    <p className="text-indigo-100 text-sm leading-relaxed">
                                        Penutur asli sering menggunakan kata kerja <span className="font-bold text-white">"Have"</span> daripada "Eat" atau "Drink" saat memesan atau berbicara tentang makanan. <br />
                                        Contoh: "I'll have a coffee" (Saya pesan kopi) atau "Let's have dinner" (Ayo makan malam).
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
                            <QuizSection questions={LESSON_EXERCISES[9]} />
                        </div>
                </motion.div>
            )}
        </LessonShell>
    </>
  );
};

export default Lesson9;
