import { useEffect, useState } from 'react';
import { CheckCircle2, NotebookPen } from 'lucide-react';
import type { TargetLanguage } from '../targetLanguage';
import { MISTAKES_CHANGED_EVENT, fetchMistakes, markMistakeMastered, type ChatMistake } from '../services/mistakes';

const COLLAPSED_COUNT = 4;

/** Open mistakes from AI chat corrections; the next lessons practise them until marked as understood. */
export function MistakeNotebook({ targetLanguage }: { targetLanguage: TargetLanguage }) {
  const [items, setItems] = useState<ChatMistake[] | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let active = true;
    const load = () => {
      void fetchMistakes(targetLanguage, 20).then((rows) => {
        if (active) setItems(rows);
      });
    };
    load();
    window.addEventListener(MISTAKES_CHANGED_EVENT, load);
    window.addEventListener('focus', load);
    return () => {
      active = false;
      window.removeEventListener(MISTAKES_CHANGED_EVENT, load);
      window.removeEventListener('focus', load);
    };
  }, [targetLanguage]);

  if (!items) return null;

  const markMastered = async (id: number) => {
    setItems((current) => current?.filter((item) => item.id !== id) ?? null);
    await markMistakeMastered(id);
  };
  const visible = expanded ? items : items.slice(0, COLLAPSED_COUNT);

  return (
    <section className="px-5 md:px-0 mt-8">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-base font-extrabold text-text-primary"><NotebookPen size={17} className="text-rose-500" /> Catatan Kesalahan</h2>
          <p className="mt-0.5 text-[12.5px] text-text-muted">Koreksi dari Chat AI. Sesi berikutnya akan mengulangnya sampai kamu tandai paham.</p>
        </div>
        {items.length > COLLAPSED_COUNT && (
          <button onClick={() => setExpanded((value) => !value)} className="text-[11px] font-bold text-primary hover:underline">
            {expanded ? 'Ringkas' : `Lihat semua (${items.length})`}
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-3 text-[12.5px] font-semibold text-text-muted">
          Belum ada catatan. Kesalahan yang dikoreksi AI saat latihan akan muncul di sini.
        </p>
      ) : (
        <div className="grid gap-2.5 md:grid-cols-2">
          {visible.map((item) => (
            <div key={item.id} className="rounded-2xl border border-gray-100 bg-white p-4" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <p dir="auto" className="text-[13px] font-semibold text-rose-600 line-through decoration-rose-300">{item.original}</p>
              <p dir="auto" className="mt-1 text-[13.5px] font-extrabold text-emerald-700">{item.corrected}</p>
              {item.explanation && <p className="mt-1.5 text-[12px] leading-relaxed text-text-secondary">{item.explanation}</p>}
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-[10.5px] font-bold text-text-muted">
                  {item.timesSeen > 1 ? `Terulang ${item.timesSeen}× · ` : ''}{item.topic || item.focus}
                </span>
                <button
                  onClick={() => void markMastered(item.id)}
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-black text-emerald-700 ring-1 ring-emerald-100 hover:bg-emerald-100"
                >
                  <CheckCircle2 size={13} /> Sudah paham
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
