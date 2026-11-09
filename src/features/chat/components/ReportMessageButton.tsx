import { useState } from 'react';
import { contentReportReasons, sendContentReport, type ContentReportContext, type ContentReportReason } from '../services/contentReports';

type ReportMessageButtonProps = {
  context: ContentReportContext;
  excerpt: string;
};

/** "Laporkan" link under an AI coach message; opens a small form for what is wrong. */
export function ReportMessageButton({ context, excerpt }: ReportMessageButtonProps) {
  const [state, setState] = useState<'closed' | 'open' | 'sending' | 'sent' | 'failed'>('closed');
  const [reason, setReason] = useState<ContentReportReason>('wrong');
  const [note, setNote] = useState('');

  if (state === 'sent') {
    return <span role="status" className="px-1 text-[11px] font-semibold text-emerald-600">✓ Terima kasih, laporanmu terkirim.</span>;
  }

  if (state === 'closed') {
    return (
      <button
        type="button"
        onClick={() => setState('open')}
        className="px-1 text-[11px] font-semibold text-text-muted hover:text-rose-600"
      >
        ⚠️ Laporkan materi salah
      </button>
    );
  }

  const submit = async () => {
    setState('sending');
    const ok = await sendContentReport(context, { reason, note: note.trim(), excerpt });
    setState(ok ? 'sent' : 'failed');
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
      <p className="text-[12px] font-bold text-text-primary">Apa yang salah dari pesan ini?</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {contentReportReasons.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={reason === item.id}
            onClick={() => setReason(item.id)}
            className={`rounded-full border px-3 py-1 text-[11px] font-bold ${reason === item.id ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-gray-200 text-gray-600'}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        maxLength={1000}
        rows={2}
        placeholder="Opsional: tulis yang benar menurutmu"
        className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-[12px] focus:border-primary focus:outline-none"
      />
      {state === 'failed' && <p className="mt-1 text-[11px] font-semibold text-rose-600">Gagal mengirim. Coba lagi sebentar.</p>}
      <div className="mt-2 flex justify-end gap-2">
        <button type="button" onClick={() => setState('closed')} className="rounded-full px-3 py-1 text-[11px] font-bold text-gray-500">
          Batal
        </button>
        <button
          type="button"
          onClick={submit}
          disabled={state === 'sending'}
          className="rounded-full bg-rose-600 px-3 py-1 text-[11px] font-bold text-white disabled:opacity-60"
        >
          {state === 'sending' ? 'Mengirim…' : 'Kirim laporan'}
        </button>
      </div>
    </div>
  );
}
