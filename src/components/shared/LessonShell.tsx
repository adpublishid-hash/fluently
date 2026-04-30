/**
 * LessonShell — Reusable wrapper for all lesson pages.
 * Provides the Fluently-themed header, tab bar with motion indicators,
 * and animated scrollable content area.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, PenTool } from 'lucide-react';

/* ═══════ Types ═══════ */
export interface LessonTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface LessonShellProps {
  /** Lesson title, e.g. "Greetings & Introductions" */
  title: string;
  /** Subtitle line, e.g. "Vocabulary • Lesson 1" */
  subtitle: string;
  /** Accent colour used for active tab, header gradient, completion button */
  accentColor?: string;
  /** Tab definitions — defaults to Learn / Practice */
  tabs?: LessonTab[];
  /** Render callback — receives current tab id */
  children: (activeTabId: string) => React.ReactNode;
  /** Optional footer (completion button etc.) — receives current tab id */
  footer?: (activeTabId: string) => React.ReactNode;
  /** Route path for the next lesson. If provided, shows a "Next Lesson" button. */
  nextLesson?: string;
}

const DEFAULT_TABS: LessonTab[] = [
  { id: 'learn', label: 'Pelajari', icon: <BookOpen size={16} /> },
  { id: 'practice', label: 'Latihan', icon: <PenTool size={16} /> },
];

/* ═══════ Motion Variants ═══════ */
const contentVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* Re-export so lesson files can animate their own sections */
export { sectionVariants };

export default function LessonShell({
  title,
  subtitle,
  accentColor = '#4FA3D1',
  tabs = DEFAULT_TABS,
  children,
  footer,
  nextLesson,
}: LessonShellProps) {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  const activeTab = tabs[activeIdx];

  const switchTab = (newIdx: number) => {
    setDirection(newIdx > activeIdx ? 1 : -1);
    setActiveIdx(newIdx);
  };

  return (
    <div className="flex flex-col h-[100dvh] md:h-auto md:min-h-[calc(100vh-6rem)] bg-[var(--color-background)] relative font-[var(--font-sans)] md:rounded-2xl md:overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
      {/* ── Header ── */}
      <motion.header
        className="flex-none sticky top-0 z-30"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      >
        {/* Gradient top bar */}
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88, ${accentColor}44)` }}
        />

        <div className="bg-white/80 backdrop-blur-xl border-b border-[var(--color-border)]">
          <div className="px-4 py-3 flex items-center justify-between max-w-3xl mx-auto">
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-[var(--color-primary-50)] transition text-[var(--color-text-secondary)]"
            >
              <ChevronLeft size={22} />
            </motion.button>

            <div className="text-center flex-1 min-w-0 px-2">
              <h1 className="text-sm font-extrabold text-[var(--color-text-primary)] truncate">{title}</h1>
              <p className="text-[10px] text-[var(--color-text-muted)] font-semibold uppercase tracking-wider">{subtitle}</p>
            </div>

            {nextLesson ? (
              <motion.button
                onClick={() => navigate(nextLesson)}
                whileHover={{ scale: 1.06, x: 2 }}
                whileTap={{ scale: 0.93 }}
                className="flex items-center gap-1 px-3 h-9 rounded-full text-xs font-bold transition-all"
                style={{
                  background: accentColor,
                  color: '#fff',
                  boxShadow: `0 2px 10px ${accentColor}55`,
                }}
              >
                Next
                <ChevronRight size={15} strokeWidth={2.5} />
              </motion.button>
            ) : (
              <div className="w-10" />
            )}
          </div>

          {/* ── Tab Bar ── */}
          {tabs.length > 1 && (
            <div className="flex relative max-w-3xl mx-auto px-4 pb-0">
              {tabs.map((tab, idx) => (
                <button
                  key={tab.id}
                  onClick={() => switchTab(idx)}
                  className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors relative z-10 flex items-center justify-center gap-1.5 ${
                    idx === activeIdx
                      ? 'text-[var(--color-text-primary)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}

              {/* Animated underline indicator */}
              <motion.div
                className="absolute bottom-0 h-[3px] rounded-full"
                style={{ backgroundColor: accentColor, width: `${100 / tabs.length}%` }}
                animate={{ x: `${activeIdx * 100}%` }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            </div>
          )}
        </div>
      </motion.header>

      {/* ── Content Area ── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab.id}
            custom={direction}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="p-4 md:p-8 pb-32 max-w-3xl mx-auto"
          >
            {children(activeTab.id)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Footer (optional) ── */}
      {footer && (
        <motion.div
          className="flex-none bg-white/80 backdrop-blur-xl border-t border-[var(--color-border)] px-4 py-3 safe-area-bottom z-30"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="max-w-3xl mx-auto">{footer(activeTab.id)}</div>
        </motion.div>
      )}
    </div>
  );
}
