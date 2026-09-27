import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, Lightbulb, Sparkles, Info, CheckCircle2, XCircle, BookOpen, PenTool, MoreHorizontal } from 'lucide-react';
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



// Vocabulary about Daily Routines
const VOCAB_LIST = [
    { word: "Wake up", ipa: "/weɪk ʌp/", meaning: "Bangun (membuka mata)" },
    { word: "Get up", ipa: "/ɡɛt ʌp/", meaning: "Bangun (turun dari kasur)" },
    { word: "Brush teeth", ipa: "/brʌʃ tiːθ/", meaning: "Menggosok gigi" },
    { word: "Take a shower", ipa: "/teɪk ə ˈʃaʊər/", meaning: "Mandi" },
    { word: "Get dressed", ipa: "/ɡɛt drɛst/", meaning: "Berpakaian" },
    { word: "Have breakfast", ipa: "/hæv ˈbrɛkfəst/", meaning: "Sarapan" },
    { word: "Go to work", ipa: "/ɡoʊ tu wɜːrk/", meaning: "Pergi bekerja" },
    { word: "Go to school", ipa: "/ɡoʊ tu skuːl/", meaning: "Pergi sekolah" },
    { word: "Have lunch", ipa: "/hæv lʌntʃ/", meaning: "Makan siang" },
    { word: "Go home", ipa: "/ɡoʊ hoʊm/", meaning: "Pulang ke rumah" },
    { word: "Have dinner", ipa: "/hæv ˈdɪnər/", meaning: "Makan malam" },
    { word: "Watch TV", ipa: "/wɒtʃ tiː viː/", meaning: "Menonton TV" },
    { word: "Read a book", ipa: "/riːd ə bʊk/", meaning: "Membaca buku" },
    { word: "Go to bed", ipa: "/ɡoʊ tu bɛd/", meaning: "Pergi tidur (ke kasur)" },
    { word: "Sleep", ipa: "/sliːp/", meaning: "Tidur (terlelap)" },
    // Added 30 new items
    { word: "Wash face", ipa: "/wɒʃ feɪs/", meaning: "Mencuci muka" },
    { word: "Comb hair", ipa: "/koʊm hɛr/", meaning: "Menyisir rambut" },
    { word: "Shave", ipa: "/ʃeɪv/", meaning: "Mencukur" },
    { word: "Put on makeup", ipa: "/pʊt ɒn ˈmeɪkʌp/", meaning: "Memakai riasan" },
    { word: "Make the bed", ipa: "/meɪk ðə bɛd/", meaning: "Merapikan tempat tidur" },
    { word: "Check phone", ipa: "/tʃɛk foʊn/", meaning: "Mengecek HP" },
    { word: "Drink coffee", ipa: "/drɪŋk ˈkɒfi/", meaning: "Minum kopi" },
    { word: "Drive", ipa: "/draɪv/", meaning: "Menyeti / Mengemudi" },
    { word: "Take the bus", ipa: "/teɪk ðə bʌs/", meaning: "Naik bus" },
    { word: "Arrive", ipa: "/əˈraɪv/", meaning: "Tiba / Sampai" },
    { word: "Leave", ipa: "/liːv/", meaning: "Berangkat / Pergi" },
    { word: "Study", ipa: "/ˈstʌdi/", meaning: "Belajar" },
    { word: "Cook", ipa: "/kʊk/", meaning: "Memasak" },
    { word: "Wash dishes", ipa: "/wɒʃ ˈdɪʃɪz/", meaning: "Mencuci piring" },
    { word: "Clean the house", ipa: "/kliːn ðə haʊs/", meaning: "Membersihkan rumah" },
    { word: "Do laundry", ipa: "/duː ˈlɔːndri/", meaning: "Mencuci baju" },
    { word: "Iron clothes", ipa: "/ˈaɪərn kloʊðz/", meaning: "Menyetrika baju" },
    { word: "Exercise", ipa: "/ˈɛksərsaɪz/", meaning: "Olahraga" },
    { word: "Walk the dog", ipa: "/wɔːk ðə dɔːɡ/", meaning: "Mengajak anjing jalan-jalan" },
    { word: "Play games", ipa: "/pleɪ ɡeɪmz/", meaning: "Bermain game" },
    { word: "Listen to music", ipa: "/ˈlɪsən tu ˈmjuːzɪk/", meaning: "Mendengarkan musik" },
    { word: "Surf the internet", ipa: "/sɜːrf ðə ˈɪntərnɛt/", meaning: "Menjelajah internet" },
    { word: "Chat with friends", ipa: "/tʃæt wɪð frɛndz/", meaning: "Mengobrol dengan teman" },
    { word: "Relax", ipa: "/rɪˈlæks/", meaning: "Bersantai" },
    { word: "Take a nap", ipa: "/teɪk ə næp/", meaning: "Tidur siang" },
    { word: "Set the alarm", ipa: "/sɛt ðə əˈlɑːrm/", meaning: "Mengatur alarm" },
    { word: "Stay up late", ipa: "/steɪ ʌp leɪt/", meaning: "Begadang" },
    { word: "Oversleep", ipa: "/ˌoʊvərˈsliːp/", meaning: "Kesiangan / Tidur berlebihan" },
    { word: "Routine", ipa: "/ruːˈtiːn/", meaning: "Rutinitas" },
    { word: "Weekend", ipa: "/ˈwiːkɛnd/", meaning: "Akhir pekan" }
];

const PHRASES_DATA = [
    { en: "I wake up at 6 AM.", id: "Saya bangun jam 6 pagi." },
    { en: "I brush my teeth.", id: "Saya menggosok gigi." },
    { en: "I have breakfast at 7 o'clock.", id: "Saya sarapan jam 7 tepat." },
    { en: "I go to work by bus.", id: "Saya pergi kerja naik bus." },
    { en: "I watch TV in the evening.", id: "Saya menonton TV di malam hari." }
];

const Lesson5: React.FC = () => {
  const navigate = useNavigate();
  const nextLessonPath = '/modul/english/beginner/vocabulary/lesson-6';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedVocabLessons().includes(5));
  const [showVocabModal, setShowVocabModal] = React.useState(false);
  const handleSelesai = () => { markVocabComplete(5); setIsCompleted(true); setShowVocabModal(true); };

        // Quiz state removed

    // --- Audio Handler ---
    const handlePlayAudio = (text: string) => { playAudio(text, 0.9); };

  const vocabModal = showVocabModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowVocabModal(false)}>
      <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #3498DB, #3498DB99)' }}><span style={{ fontSize: 36 }}>🏆</span></div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Lesson Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Vocabulary Lesson 5</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowVocabModal(false); navigate('/modul/english/beginner/vocabulary/lesson-6'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #3498DB, #3498DBbb)' }}>Next ›</button>
          <button onClick={() => { setShowVocabModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

    return (
    <>
    {vocabModal}
        <LessonShell
            title="Daily Activities"
            subtitle="Vocabulary • Pelajaran 5"
            accentColor="#3498DB"
            nextLesson={'/modul/english/beginner/vocabulary/lesson-6'}
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
                                    <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Your Daily Routine</h2>
                                </div>
                                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                                    Menceritakan keseharian adalah topik percakapan yang sangat umum. Di pelajaran ini, kita akan belajar kata kerja untuk rutinitas dari bangun tidur sampai tidur lagi.
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
                                            <p className="font-bold text-[var(--color-text-primary)] text-sm mb-1 line-through decoration-red-500 decoration-2">I eat breakfast.</p>
                                            <p className="text-[var(--color-text-muted)] text-xs">Grammatically okay, but less common.</p>
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-orange-200/50"></div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 size={20} />
                                        <div>
                                            <p className="font-bold text-[var(--color-text-primary)] text-sm mb-1">I have breakfast.</p>
                                            <p className="text-[var(--color-text-muted)] text-xs">Native speakers usually use "Have" for meals.</p>
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
                                    <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Dialogue: Morning Routine</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 text-[var(--color-text-primary)] px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                                            What time do you get up?
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-[var(--color-primary)] text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                                            I usually get up at 6:30.
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 text-[var(--color-text-primary)] px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                                            What do you do then?
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-[var(--color-primary)] text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                                            I take a shower and have coffee.
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 text-[var(--color-text-primary)] px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                                            When do you go to work?
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-[var(--color-primary)] text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                                            I leave the house at 8 o'clock.
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
                                        <h3 className="font-bold text-lg">Pro Tip: "Wake up" vs "Get up"</h3>
                                    </div>
                                    <p className="text-indigo-100 text-sm leading-relaxed">
                                        <span className="font-bold text-white">Wake up</span> artinya saat mata Anda terbuka (sadar). <br />
                                        <span className="font-bold text-white">Get up</span> artinya saat Anda benar-benar keluar/turun dari kasur. <br />
                                        Anda bisa "wake up" jam 7, tapi baru "get up" jam 7.15!
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
                            <QuizSection questions={LESSON_EXERCISES[5]} />
                        </div>
                </motion.div>
            )}
        </LessonShell>
    </>
  );
};

export default Lesson5;
