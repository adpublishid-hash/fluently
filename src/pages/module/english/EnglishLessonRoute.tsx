import { Suspense, lazy, useMemo } from 'react';
import type React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const englishLessons = import.meta.glob('./**/Lesson*.tsx');

function parseLessonPath(pathname: string) {
  const match = pathname.match(/^\/modul\/english\/([^/]+)\/([^/]+)\/lesson-(\d+)$/);
  if (!match) return null;
  return {
    levelId: match[1],
    skillId: match[2],
    lessonId: Number(match[3]),
  };
}

export default function EnglishLessonRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const parsed = parseLessonPath(location.pathname);

  const LessonComponent = useMemo(() => {
    if (!parsed) return null;
    const modulePath = `./${parsed.levelId}/${parsed.skillId}/Lesson${parsed.lessonId}.tsx`;
    const importer = englishLessons[modulePath];
    return importer ? lazy(importer as () => Promise<{ default: React.ComponentType }>) : null;
  }, [parsed?.levelId, parsed?.skillId, parsed?.lessonId]);

  if (!parsed || !LessonComponent) {
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

  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center text-slate-500 font-semibold">Memuat lesson...</div>}>
      <LessonComponent />
    </Suspense>
  );
}
