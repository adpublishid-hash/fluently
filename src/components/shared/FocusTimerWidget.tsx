import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, RotateCcw, Timer } from 'lucide-react';
import { formatFocusTime, recordFocusSession } from '../../utils/focusTimer';

interface FocusTimerWidgetProps {
  source?: string;
  compact?: boolean;
  onComplete?: (minutes: number) => void;
}

export default function FocusTimerWidget({ source = 'Focus timer', compact = false, onComplete }: FocusTimerWidgetProps) {
  const [duration, setDuration] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const totalSeconds = duration * 60;
  const progress = Math.round(((totalSeconds - secondsLeft) / totalSeconds) * 100);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setRunning(false);
          recordFocusSession(duration, source);
          onComplete?.(duration);
          return totalSeconds;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [duration, onComplete, running, source, totalSeconds]);

  const setPreset = (minutes: number) => {
    setRunning(false);
    setDuration(minutes);
    setSecondsLeft(minutes * 60);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={compact
        ? 'rounded-3xl border border-slate-100 bg-white p-4 shadow-sm'
        : 'rounded-3xl bg-gradient-to-br from-[#0D2B55] to-[#1E6F9F] p-5 text-white shadow-lg shadow-blue-100'}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={compact
            ? 'text-[10px] font-black uppercase tracking-[0.16em] text-slate-400'
            : 'text-[11px] font-black uppercase tracking-[0.18em] text-white/60'}
          >
            Focus Timer
          </p>
          <h2 className={compact ? 'mt-1 text-2xl font-black text-[#101828]' : 'mt-1 text-3xl font-black'}>
            {formatFocusTime(secondsLeft)}
          </h2>
          <p className={compact ? 'mt-1 text-[11px] font-semibold text-slate-400' : 'mt-1 text-xs font-semibold text-white/65'}>
            {compact ? 'Sesi fokus singkat.' : 'Gunakan timer ini untuk sesi belajar fokus.'}
          </p>
        </div>
        <div className={compact
          ? 'flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#4FA3D1]'
          : 'flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15'}
        >
          <Timer size={compact ? 21 : 24} />
        </div>
      </div>

      <div className={compact ? 'mt-4 h-2 overflow-hidden rounded-full bg-slate-100' : 'mt-5 h-2 overflow-hidden rounded-full bg-white/15'}>
        <motion.div
          className={compact ? 'h-full rounded-full bg-[#4FA3D1]' : 'h-full rounded-full bg-white'}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[15, 25, 50].map(minutes => (
          <button
            key={minutes}
            type="button"
            onClick={() => setPreset(minutes)}
            className={compact
              ? `rounded-full px-3 py-1.5 text-[11px] font-black ${duration === minutes ? 'bg-[#4FA3D1] text-white' : 'bg-slate-50 text-slate-500'}`
              : `rounded-full px-3 py-1.5 text-xs font-black ${duration === minutes ? 'bg-white text-[#1E6F9F]' : 'bg-white/12 text-white/80'}`}
          >
            {minutes} min
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setRunning(value => !value)}
          className={compact
            ? 'flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#4FA3D1] py-3 text-xs font-black text-white'
            : 'flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white py-3 text-sm font-black text-[#1E6F9F]'}
        >
          {running ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
          {running ? 'Pause' : 'Start'}
        </button>
        <button
          type="button"
          onClick={() => {
            setRunning(false);
            setSecondsLeft(totalSeconds);
          }}
          className={compact
            ? 'flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-500'
            : 'flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-white'}
        >
          <RotateCcw size={17} />
        </button>
      </div>
    </motion.div>
  );
}
