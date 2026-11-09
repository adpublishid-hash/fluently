import { useCallback, useEffect, useState } from 'react';

// Admin view of learner reports about wrong AI chat content.

type ContentReport = {
  id: number;
  userName: string;
  userEmail: string;
  language: string;
  focus: string;
  topic: string;
  levelId: string;
  reason: 'wrong' | 'level' | 'format' | 'other';
  note: string;
  excerpt: string;
  status: 'open' | 'resolved';
  createdAt: string;
};

type StatusFilter = 'open' | 'resolved' | 'all';

const reasonLabels: Record<ContentReport['reason'], string> = {
  wrong: 'Isi salah',
  level: 'Level tidak sesuai',
  format: 'Tampilan rusak',
  other: 'Lainnya',
};

export default function AdminContentReports({ token }: { token: string | null }) {
  const [filter, setFilter] = useState<StatusFilter>('open');
  const [items, setItems] = useState<ContentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState<number | null>(null);
  const headers = useCallback(
    () => ({ 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }),
    [token],
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    fetch(`/api/admin/content-reports?status=${filter}`, { headers: headers() })
      .then(async (res) => {
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.error || 'Gagal memuat laporan.');
        if (!cancelled) setItems(Array.isArray(data?.items) ? data.items : []);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [filter, headers]);

  const setStatus = async (report: ContentReport, status: ContentReport['status']) => {
    setSavingId(report.id);
    try {
      const res = await fetch(`/api/admin/content-reports/${report.id}`, { method: 'PATCH', headers: headers(), body: JSON.stringify({ status }) });
      if (!res.ok) throw new Error('Gagal menyimpan status.');
      setItems((current) => (filter === 'all'
        ? current.map((item) => (item.id === report.id ? { ...item, status } : item))
        : current.filter((item) => item.id !== report.id)));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <section className="overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3">
        <div>
          <h2 className="text-sm font-black text-[#0F172A]">Laporan Materi AI</h2>
          <p className="text-xs font-semibold text-gray-500">Pesan AI Chat yang ditandai salah oleh siswa.</p>
        </div>
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value as StatusFilter)}
          className="h-9 rounded-[6px] border border-[#CBD5E1] bg-white px-3 text-xs font-black"
        >
          <option value="open">Belum ditangani</option>
          <option value="resolved">Selesai</option>
          <option value="all">Semua</option>
        </select>
      </div>
      {error && <p className="px-4 pt-3 text-xs font-bold text-rose-600">{error}</p>}
      {loading ? (
        <div className="p-8 text-center text-sm font-bold text-gray-500">Memuat laporan...</div>
      ) : items.length === 0 ? (
        <div className="p-8 text-center text-sm font-bold text-gray-500">Tidak ada laporan.</div>
      ) : (
        <div className="divide-y divide-gray-100">
          {items.map((report) => (
            <article key={report.id} className="grid gap-3 p-4 md:grid-cols-[1fr_150px] md:items-start">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-black">
                  <span className="rounded-full bg-rose-50 px-2 py-0.5 text-rose-700">{reasonLabels[report.reason] ?? report.reason}</span>
                  <span className="rounded-full bg-[#E0F2FE] px-2 py-0.5 capitalize text-[#075985]">{report.language}</span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 capitalize text-gray-600">{report.focus}{report.levelId ? ` · ${report.levelId.toUpperCase()}` : ''}</span>
                  {report.topic && <span className="text-gray-500">{report.topic}</span>}
                </div>
                {report.note && <p className="mt-2 text-sm font-bold text-[#0F172A]">“{report.note}”</p>}
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs font-bold text-[#0891B2]">Lihat pesan AI</summary>
                  <pre dir="auto" className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap rounded-[8px] bg-[#F8FAFC] p-3 font-sans text-xs leading-relaxed text-gray-700">{report.excerpt}</pre>
                </details>
                <p className="mt-2 text-[11px] font-semibold text-gray-400">
                  {report.userName || 'Pengguna dihapus'}{report.userEmail ? ` · ${report.userEmail}` : ''} · {new Date(report.createdAt).toLocaleString('id-ID')}
                </p>
              </div>
              <button
                type="button"
                disabled={savingId === report.id}
                onClick={() => setStatus(report, report.status === 'open' ? 'resolved' : 'open')}
                className={`h-9 rounded-[6px] border px-3 text-xs font-black disabled:opacity-60 ${
                  report.status === 'open' ? 'border-[#0891B2] bg-[#E0F2FE] text-[#075985]' : 'border-[#CBD5E1] bg-white text-gray-500'
                }`}
              >
                {report.status === 'open' ? 'Tandai selesai' : 'Buka lagi'}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
