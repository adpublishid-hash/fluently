import { useNavigate } from 'react-router-dom';

export default function LessonNotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 p-6">
      <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="mb-2 text-xl font-black text-slate-900">Lesson tidak ditemukan</h1>
        <p className="mb-6 text-sm text-slate-500">Materi English untuk path ini belum tersedia.</p>
        <button
          onClick={() => navigate('/modul')}
          className="rounded-xl bg-[#4FA3D1] px-5 py-3 font-bold text-white"
        >
          Kembali ke modul
        </button>
      </div>
    </div>
  );
}
