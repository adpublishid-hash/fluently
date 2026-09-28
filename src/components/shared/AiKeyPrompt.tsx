import { useEffect, useState } from 'react';
import { ExternalLink, KeyRound, Loader2, X } from 'lucide-react';
import {
  AI_KEY_NEEDED_EVENT, AI_STUDIO_KEY_URL, getStudioKey, removeStudioKey, saveStudioKey, verifyStudioKey,
  type AiKeyNeededDetail,
} from '../../services/aiClient';

function resetLabel(iso?: string) {
  if (!iso) return '00.00 WIB';
  return `${new Intl.DateTimeFormat('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit' }).format(new Date(iso))} WIB`;
}

/** Global modal: explains the daily AI quota and lets the learner add a free Google AI Studio key. */
export default function AiKeyPrompt() {
  const [detail, setDetail] = useState<AiKeyNeededDetail | null>(null);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const existing = getStudioKey();

  useEffect(() => {
    const open = (event: Event) => {
      setDetail((event as CustomEvent<AiKeyNeededDetail>).detail ?? { code: 'MANAGE' });
      setValue('');
      setError('');
      setSaved(false);
    };
    window.addEventListener(AI_KEY_NEEDED_EVENT, open);
    return () => window.removeEventListener(AI_KEY_NEEDED_EVENT, open);
  }, []);

  if (!detail) return null;
  const close = () => setDetail(null);

  const save = async () => {
    setSaving(true);
    setError('');
    const result = await verifyStudioKey(value);
    setSaving(false);
    if (!result.ok) {
      setError(result.error || 'Key tidak valid.');
      return;
    }
    saveStudioKey(value);
    setSaved(true);
  };

  const heading = detail.code === 'AI_QUOTA_EXCEEDED' ? 'Kuota AI harian habis'
    : detail.code === 'BYOK_INVALID' ? 'Key AI Studio ditolak'
    : detail.code === 'AI_KEY_REQUIRED' ? 'AI server belum aktif'
    : 'Key Google AI Studio';

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/40 p-4 sm:items-center" role="dialog" aria-modal="true" onClick={close}>
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-black text-slate-900"><KeyRound size={20} className="text-indigo-600" /> {heading}</h2>
          <button onClick={close} aria-label="Tutup" className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>

        {detail.code === 'AI_QUOTA_EXCEEDED' && (
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Kamu sudah memakai {detail.quota?.used ?? detail.quota?.limit ?? ''} dari {detail.quota?.limit ?? ''} permintaan AI hari ini. Kuota kembali penuh pukul {resetLabel(detail.quota?.resetsAt)}.
            Mau lanjut sekarang? Pakai API key <b>gratis</b> dari Google AI Studio.
          </p>
        )}
        {detail.code !== 'AI_QUOTA_EXCEEDED' && (
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {detail.message || 'Key ini hanya dipakai setelah kuota AI harianmu habis, dan juga mengaktifkan suara Gemini.'}
          </p>
        )}

        {saved ? (
          <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
            Key tersimpan. Kirim ulang permintaanmu; setelah kuota habis, AI akan memakai key ini.
            <button onClick={close} className="mt-3 block w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-black text-white">Selesai</button>
          </div>
        ) : (
          <>
            <ol className="mt-4 space-y-1.5 text-sm text-slate-700">
              <li>1. Buka <a href={AI_STUDIO_KEY_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-indigo-600">Google AI Studio <ExternalLink size={12} /></a> dan login dengan akun Google.</li>
              <li>2. Klik <b>Create API key</b>, lalu salin key-nya (diawali <code>AIza</code>).</li>
              <li>3. Tempel di bawah, lalu simpan.</li>
            </ol>
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="AIza..."
              autoComplete="off"
              spellCheck={false}
              className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm outline-none focus:border-indigo-400"
            />
            {error && <p className="mt-2 text-sm font-semibold text-rose-600">{error}</p>}
            <button
              onClick={save}
              disabled={saving || value.trim().length < 30}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-black text-white disabled:opacity-40"
            >
              {saving && <Loader2 size={16} className="animate-spin" />} Verifikasi & simpan
            </button>
            {existing && (
              <button onClick={() => { removeStudioKey(); close(); }} className="mt-2 w-full rounded-xl py-2 text-xs font-bold text-rose-600 hover:bg-rose-50">
                Hapus key tersimpan (…{existing.slice(-4)})
              </button>
            )}
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
              Key disimpan hanya di browser ini, dikirim lewat koneksi aman saat kuota habis, dan tidak disimpan di server Fluently.
              Batas gratis mengikuti kebijakan Google AI Studio.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
