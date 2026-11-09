import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type TypingIndicatorProps = {
  /** When a real AI request started; null for the short simulated typing delay. */
  waitingSince?: number | null;
  onCancel?: () => void;
};

// AI lessons often take 20-60 s, so after a few seconds the learner sees why
// it is slow and can cancel.
const SHOW_STATUS_AFTER_S = 5;

export function aiWaitStatus(seconds: number) {
  if (seconds < SHOW_STATUS_AFTER_S) return '';
  if (seconds < 30) return 'AI sedang menyiapkan jawaban…';
  if (seconds < 90) return 'Masih diproses, biasanya selesai dalam 20–60 detik.';
  return 'Lebih lama dari biasanya. Kamu bisa batalkan lalu coba lagi.';
}

export function TypingIndicator({ waitingSince = null, onCancel }: TypingIndicatorProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (waitingSince === null) return;
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [waitingSince]);

  const seconds = waitingSince === null ? 0 : Math.max(0, Math.floor((now - waitingSince) / 1000));
  const status = aiWaitStatus(seconds);

  return (
    <motion.div
      className="flex items-center gap-2 mt-1"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 flex-shrink-0 shadow-sm">
        <span className="text-sm">🐻</span>
      </div>
      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-1.5 min-h-[42px]">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
        {status && (
          <span role="status" className="ml-2 text-xs font-semibold text-gray-500">
            {status} <span className="tabular-nums text-gray-400">{seconds} dtk</span>
          </span>
        )}
        {status && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="ml-2 flex-shrink-0 rounded-full border border-gray-200 px-3 py-1 text-xs font-bold text-gray-600 hover:bg-gray-50"
          >
            Batal
          </button>
        )}
      </div>
    </motion.div>
  );
}
