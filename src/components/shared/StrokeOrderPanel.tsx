import { useEffect, useMemo, useRef, useState } from 'react';
import { PenLine, Play } from 'lucide-react';

type HanziWriterInstance = {
  animateCharacter: () => void;
  quiz: (options?: { onComplete?: (summary: { totalMistakes: number }) => void }) => void;
  cancelQuiz: () => void;
};

type Props = {
  /** Text containing the characters to practise (e.g. all lesson vocabulary). */
  text: string;
  color: string;
  lang: 'zh-CN' | 'ja';
  maxCharacters?: number;
};

// CJK unified ideographs only: kana and Latin have no stroke data.
const IDEOGRAPH = /[一-鿿]/g;

export default function StrokeOrderPanel({ text, color, lang, maxCharacters = 12 }: Props) {
  const characters = useMemo(() => [...new Set(text.match(IDEOGRAPH) ?? [])].slice(0, maxCharacters), [text, maxCharacters]);
  const [active, setActive] = useState(characters[0] ?? '');
  const [status, setStatus] = useState('');
  const targetRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriterInstance | null>(null);

  useEffect(() => {
    setActive(characters[0] ?? '');
  }, [characters]);

  useEffect(() => {
    const target = targetRef.current;
    if (!active || !target) return;
    let cancelled = false;
    target.innerHTML = '';
    writerRef.current = null;
    setStatus('Memuat urutan goresan...');
    // Loaded on demand: stroke data for each character comes from the hanzi-writer CDN.
    import('hanzi-writer').then(({ default: HanziWriter }) => {
      if (cancelled) return;
      writerRef.current = HanziWriter.create(target, active, {
        width: 180,
        height: 180,
        padding: 8,
        strokeColor: color,
        radicalColor: color,
        showOutline: true,
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 250,
        onLoadCharDataSuccess: () => { if (!cancelled) setStatus(''); },
        onLoadCharDataError: () => { if (!cancelled) setStatus('Data goresan untuk karakter ini belum tersedia.'); },
      }) as unknown as HanziWriterInstance;
      writerRef.current.animateCharacter();
    }).catch(() => {
      if (!cancelled) setStatus('Gagal memuat modul stroke order.');
    });
    return () => {
      cancelled = true;
      writerRef.current?.cancelQuiz();
    };
  }, [active, color]);

  if (!characters.length) return null;

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
      <h2 className="mb-1 flex items-center gap-2 font-black text-slate-900">
        <PenLine size={18} style={{ color }} />
        Urutan Goresan ({lang === 'ja' ? 'Kanji' : 'Hanzi'})
      </h2>
      <p className="mb-4 text-xs font-semibold text-slate-500">Pilih karakter, lihat animasinya, lalu coba tulis sendiri dengan jari atau mouse.</p>
      <div className="flex flex-wrap gap-2">
        {characters.map((character) => (
          <button
            key={character}
            lang={lang}
            onClick={() => setActive(character)}
            className={`h-11 w-11 rounded-xl border text-xl font-bold transition ${character === active ? 'text-white' : 'border-slate-200 bg-slate-50 text-slate-800'}`}
            style={character === active ? { backgroundColor: color, borderColor: color } : undefined}
          >
            {character}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
        <div ref={targetRef} className="h-[180px] w-[180px] shrink-0 rounded-2xl border border-dashed border-slate-300 bg-slate-50" />
        <div className="flex w-full flex-col gap-2 sm:w-auto">
          <button
            onClick={() => { setStatus(''); writerRef.current?.animateCharacter(); }}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-black text-slate-700"
          >
            <Play size={15} /> Putar animasi
          </button>
          <button
            onClick={() => {
              setStatus('Tulis goresan sesuai urutan di kotak.');
              writerRef.current?.quiz({
                onComplete: ({ totalMistakes }) => setStatus(totalMistakes === 0 ? 'Sempurna! Tanpa kesalahan.' : `Selesai dengan ${totalMistakes} kesalahan. Coba lagi!`),
              });
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-black text-white"
            style={{ backgroundColor: color }}
          >
            <PenLine size={15} /> Latihan menulis
          </button>
          {status && <p className="text-xs font-semibold text-slate-500">{status}</p>}
        </div>
      </div>
    </div>
  );
}
