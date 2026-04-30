import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Notice = { id: number; message: string; variant: 'warn' | 'error' };

export default function TTSNotice() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { message: string; variant: 'warn' | 'error' };
      if (!detail?.message) return;
      setNotice({ id: Date.now(), message: detail.message, variant: detail.variant ?? 'warn' });
    };
    window.addEventListener('tts:notify', handler);
    return () => window.removeEventListener('tts:notify', handler);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 4500);
    return () => clearTimeout(t);
  }, [notice]);

  if (!notice) return null;

  const isWarn = notice.variant === 'warn';
  const palette = isWarn
    ? 'bg-amber-50 border-amber-300 text-amber-900'
    : 'bg-red-50 border-red-300 text-red-900';
  const btnPalette = isWarn
    ? 'bg-amber-500 hover:bg-amber-600 text-white'
    : 'bg-red-500 hover:bg-red-600 text-white';

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[min(92vw,420px)]">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 shadow-lg ${palette}`}>
        <span className="text-xl">{isWarn ? '🔑' : '⚠️'}</span>
        <p className="flex-1 text-xs font-semibold leading-snug">{notice.message}</p>
        {isWarn && (
          <button
            onClick={() => {
              setNotice(null);
              navigate('/profile');
            }}
            className={`shrink-0 text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all ${btnPalette}`}
          >
            Ke Profile →
          </button>
        )}
        <button
          onClick={() => setNotice(null)}
          className="shrink-0 text-xs text-slate-400 hover:text-slate-700"
          aria-label="Tutup"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
