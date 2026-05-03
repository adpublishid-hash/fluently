/**
 * BeginnerSpeakingLesson — Enhanced with Fluently theme + framer-motion
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, Volume2, Lightbulb, Info,
  CheckCircle2, XCircle, ChevronRight, Star, Trophy
} from 'lucide-react';
import LessonShell, { sectionVariants } from '../../../../../../components/shared/LessonShell';
import { BEGINNER_SPEAKING_LESSONS } from '../speakingData';
import type { Scenario, Question } from '../speakingData';
import { playAudio } from '../../../../../../services/ttsService';

/* ─── Completion Storage Helpers ─── */
const STORAGE_KEY = 'talky_beginner_speaking_completed';

export function getCompletedSpeakingLessons(): number[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function markLessonComplete(lessonId: number) {
  const done = getCompletedSpeakingLessons();
  if (!done.includes(lessonId)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...done, lessonId]));
  }
}

const ACCENT = '#E74C3C';


const TABS = [
  { id: 'material', label: 'Materi', icon: <Mic size={14} /> },
  { id: 'roleplay', label: 'Latihan Peran', icon: <Lightbulb size={14} /> },
];

interface BeginnerSpeakingLessonProps {
  lessonId: number;
}

export const BeginnerSpeakingLesson: React.FC<BeginnerSpeakingLessonProps> = ({ lessonId }) => {
    const navigate = useNavigate();
    const lessonData = BEGINNER_SPEAKING_LESSONS[lessonId];

    if (!lessonData) {
        return (
          <div className="flex items-center justify-center h-screen">
            <p className="text-[var(--color-text-muted)]">Lesson not found</p>
          </div>
        );
    }

    const { title, scenarios, practiceQuestions } = lessonData;
    const [activeScenarioId, setActiveScenarioId] = useState<string>(scenarios[0].id);
    const [practiceStep, setPracticeStep] = useState(0);
    const [selectedPracticeOption, setSelectedPracticeOption] = useState<number | null>(null);
    const [isPracticeChecked, setIsPracticeChecked] = useState(false);
    const [isCompleted, setIsCompleted] = useState(() =>
        getCompletedSpeakingLessons().includes(lessonId)
    );
    const [showModal, setShowModal] = useState(false);

    const currentScenario = scenarios.find(c => c.id === activeScenarioId) || scenarios[0];

    const handlePlayAudio = (text: string) => { playAudio(text, 0.9); };

    const handleCheckPractice = (idx: number) => {
        if (isPracticeChecked) return;
        setSelectedPracticeOption(idx);
        setIsPracticeChecked(true);
    };

    const nextPractice = () => {
        if (practiceStep < practiceQuestions.length - 1) {
            setPracticeStep(prev => prev + 1);
            setIsPracticeChecked(false);
            setSelectedPracticeOption(null);
        } else {
            setPracticeStep(0);
            setIsPracticeChecked(false);
            setSelectedPracticeOption(null);
        }
    };

    const handleSelesai = () => {
        markLessonComplete(lessonId);
        setIsCompleted(true);
        setShowModal(true);
    };

    const totalLines = scenarios.reduce((acc, curr) => acc + curr.dialogue.length, 0);

    const BASE = '/modul/english/beginner/speaking';
    const TOTAL_LESSONS = 11;
    const nextLessonPath = lessonId < TOTAL_LESSONS
        ? `${BASE}/lesson-${lessonId + 1}`
        : undefined;

    return (
        <>
        {/* ── Completion Modal ── */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setShowModal(false)}
              />
              {/* Card */}
              <motion.div
                className="relative z-10 bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl"
                initial={{ scale: 0.7, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 340, damping: 26 }}
              >
                {/* Trophy icon */}
                <motion.div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}99)` }}
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
                >
                  <Trophy size={36} color="white" />
                </motion.div>

                <motion.h2
                  className="text-xl font-extrabold text-[#1A1A2E] mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  Pelajaran Selesai! 🎉
                </motion.h2>
                <motion.p
                  className="text-[13px] text-gray-500 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.32 }}
                >
                  Kamu telah menyelesaikan <span className="font-bold text-[#1A1A2E]">Pelajaran {lessonId}</span>.
                  Terus semangat belajar!
                </motion.p>

                {/* Stars */}
                <motion.div
                  className="flex justify-center gap-2 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.38 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.42 + i * 0.1, type: 'spring', stiffness: 280 }}
                    >
                      <Star size={28} fill="#FFD700" color="#FFD700" />
                    </motion.div>
                  ))}
                </motion.div>

                <div className="flex gap-3">
                  {nextLessonPath && (
                    <motion.button
                      onClick={() => { setShowModal(false); navigate(nextLessonPath); }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-1.5 shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}bb)` }}
                    >
                      Next <ChevronRight size={16} />
                    </motion.button>
                  )}
                  <motion.button
                    onClick={() => { setShowModal(false); navigate(-1); }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700"
                  >
                    Kembali
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <LessonShell
            title={title}
            subtitle={`Berbicara • Pelajaran ${lessonId}`}
            accentColor={ACCENT}
            tabs={TABS}
            nextLesson={nextLessonPath}
            footer={() => (
                <motion.button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all"
                    style={{
                      background: isCompleted
                        ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)'
                        : `linear-gradient(135deg, ${ACCENT}, ${ACCENT}cc)`
                    }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
                </motion.button>
            )}
        >
            {(tabId) => tabId === 'material' ? (
                <div className="space-y-6">
                    {/* ── Hero Card ── */}
                    <motion.section
                      custom={0}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="rounded-2xl p-6 text-white relative overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}bb)` }}
                    >
                      <div className="absolute -top-6 -right-6 opacity-10">
                        <Mic size={120} />
                      </div>
                      <div className="relative z-10">
                        <h2 className="text-lg font-extrabold mb-2">Latihan Berbicara</h2>
                        <p className="text-white/75 text-[13px] leading-relaxed mb-4">
                          Dengarkan percakapan, ulangi dengan keras, dan cobalah peran yang berbeda.
                        </p>
                        <div className="flex gap-2">
                          <span className="bg-white/20 px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-sm">{totalLines} Baris</span>
                          <span className="bg-white/20 px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-sm">{scenarios.length} Skenario</span>
                        </div>
                      </div>
                    </motion.section>

                    {/* ── Scenario Selector ── */}
                    <motion.section
                      custom={1}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <h3 className="text-sm font-extrabold text-[var(--color-text-primary)] mb-3 px-1">Pilih Skenario</h3>
                      <div className="flex gap-2.5 overflow-x-auto pb-3 scrollbar-hide">
                        {scenarios.map((scenario, idx) => (
                          <motion.button
                            key={scenario.id}
                            onClick={() => setActiveScenarioId(scenario.id)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`shrink-0 px-4 py-2.5 rounded-xl border transition-all text-left ${
                              activeScenarioId === scenario.id
                                ? 'bg-[var(--color-text-primary)] text-white border-transparent shadow-lg'
                                : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-gray-300'
                            }`}
                          >
                            <span className="block text-[12px] font-bold whitespace-nowrap">{scenario.title}</span>
                            <span className="block text-[10px] opacity-60 mt-0.5">{scenario.level}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.section>

                    {/* ── Dialogue ── */}
                    <AnimatePresence mode="wait">
                      <motion.section
                        key={currentScenario.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.35 }}
                        className="bg-white rounded-2xl p-5 min-h-[300px]"
                        style={{ boxShadow: 'var(--shadow-card)' }}
                      >
                        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
                          <div>
                            <h3 className="text-sm font-extrabold text-[var(--color-text-primary)]">{currentScenario.title}</h3>
                            <p className="text-[11px] text-[var(--color-text-muted)]">{currentScenario.context}</p>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            currentScenario.level === 'Formal' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'
                          }`}>
                            {currentScenario.level}
                          </span>
                        </div>

                        <div className="space-y-4">
                          {currentScenario.dialogue.map((line, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.06 * idx, duration: 0.3 }}
                              className={`flex gap-3 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}
                            >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold shadow-sm ${
                                line.speaker === 'A' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
                              }`}>
                                {line.speaker}
                              </div>

                              <div className="flex-1 max-w-[82%]">
                                <div className={`p-3.5 rounded-2xl ${
                                  line.speaker === 'A'
                                    ? 'bg-gray-50 text-[var(--color-text-primary)] rounded-tl-sm'
                                    : 'bg-red-50 text-red-900 rounded-tr-sm'
                                }`}>
                                  <div className="flex justify-between items-start gap-2 mb-0.5">
                                    <span className="text-[9px] font-bold opacity-40 uppercase tracking-wide">{line.name}</span>
                                    <motion.button
                                      onClick={() => handlePlayAudio(line.text)}
                                      whileTap={{ scale: 0.85 }}
                                      className="text-gray-400 hover:text-[var(--color-primary)] transition-colors"
                                    >
                                      <Volume2 size={12} />
                                    </motion.button>
                                  </div>
                                  <p className="text-[13px] font-medium leading-relaxed">{line.text}</p>
                                  <p className="text-[10px] text-gray-400 mt-1.5 pt-1.5 border-t border-gray-200/50 italic">
                                    {line.translation}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.section>
                    </AnimatePresence>

                    {/* ── Cultural Tip ── */}
                    <motion.section
                      custom={3}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-indigo-500 shadow-sm shrink-0">
                          <Info size={18} />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sm text-indigo-900 mb-1.5">Tips Budaya</h3>
                          <p className="text-[12px] text-indigo-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: lessonData.cultureTip }} />
                        </div>
                      </div>
                    </motion.section>
                </div>
            ) : (
                /* ── Roleplay Tab ── */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-white rounded-2xl p-5 relative overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: `${ACCENT}10` }} />

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                          <Lightbulb size={18} />
                        </div>
                        <h2 className="text-base font-extrabold text-[var(--color-text-primary)]">Latihan Peran</h2>
                      </div>

                      {/* Progress */}
                      <div className="mb-5">
                        <div className="flex justify-between text-[10px] font-bold text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wider">
                          <span>Pertanyaan {practiceStep + 1} dari {practiceQuestions.length}</span>
                          <span>Kemajuan</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: ACCENT }}
                            animate={{ width: `${((practiceStep + 1) / practiceQuestions.length) * 100}%` }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                          />
                        </div>
                      </div>

                      {/* Question */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={practiceStep}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-[var(--color-text-muted)] text-[11px] font-bold mb-1.5">Skenario:</p>
                          <h3 className="text-base font-extrabold text-[var(--color-text-primary)] leading-snug mb-5">
                            {practiceQuestions[practiceStep].prompt}
                          </h3>

                          {/* Options */}
                          <div className="space-y-2.5">
                            {practiceQuestions[practiceStep].options.map((opt, idx) => {
                              let style = 'border-[var(--color-border)] hover:border-indigo-300 hover:bg-gray-50';
                              if (isPracticeChecked) {
                                if (opt.correct) style = 'bg-green-50 border-sky-400 text-green-700';
                                else if (idx === selectedPracticeOption) style = 'bg-red-50 border-red-400 text-red-700';
                                else style = 'opacity-40 border-gray-100';
                              } else if (selectedPracticeOption === idx) {
                                style = 'border-indigo-500 bg-indigo-50 text-indigo-700';
                              }

                              return (
                                <motion.button
                                  key={idx}
                                  onClick={() => handleCheckPractice(idx)}
                                  disabled={isPracticeChecked}
                                  whileHover={!isPracticeChecked ? { scale: 1.01 } : {}}
                                  whileTap={!isPracticeChecked ? { scale: 0.98 } : {}}
                                  className={`w-full p-3.5 rounded-xl border text-left text-[13px] font-medium transition-all flex items-center justify-between ${style}`}
                                >
                                  <span>{opt.text}</span>
                                  {isPracticeChecked && opt.correct && <CheckCircle2 size={16} className="text-green-600" />}
                                  {isPracticeChecked && idx === selectedPracticeOption && !opt.correct && <XCircle size={16} className="text-red-500" />}
                                </motion.button>
                              );
                            })}
                          </div>

                          {/* Feedback */}
                          {isPracticeChecked && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-5"
                            >
                              <div className={`p-3.5 rounded-xl text-[12px] mb-3 ${
                                practiceQuestions[practiceStep].options[selectedPracticeOption!].correct
                                  ? 'bg-green-50 text-green-800 border border-sky-100'
                                  : 'bg-orange-50 text-orange-800 border border-orange-100'
                              }`}>
                                <span className="font-bold block mb-0.5">
                                  {practiceQuestions[practiceStep].options[selectedPracticeOption!].correct ? "Benar! 🎉" : "Penjelasan:"}
                                </span>
                                <span dangerouslySetInnerHTML={{ __html: practiceQuestions[practiceStep].explanation }} />
                              </div>
                              <motion.button
                                onClick={nextPractice}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full py-3 bg-[var(--color-text-primary)] text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
                              >
                                {practiceStep < practiceQuestions.length - 1 ? "Skenario Berikutnya" : "Selesaikan Latihan"}
                                <ChevronRight size={16} />
                              </motion.button>
                            </motion.div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
            )}
        </LessonShell>
        </>
    );
};
