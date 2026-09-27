import { Suspense, lazy, useMemo } from 'react';
import type React from 'react';
import { useLocation } from 'react-router-dom';
import LessonNotFound from './EnglishLessonNotFound';

const ExtraEnglishLessonRoute = lazy(() => import('./extra/ExtraEnglishLessonRoute'));

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
  const parsed = parseLessonPath(location.pathname);

  const LessonComponent = useMemo(() => {
    if (!parsed) return null;
    const modulePath = `./${parsed.levelId}/${parsed.skillId}/Lesson${parsed.lessonId}.tsx`;
    const importer = englishLessons[modulePath];
    return importer ? lazy(importer as () => Promise<{ default: React.ComponentType }>) : null;
  }, [parsed?.levelId, parsed?.skillId, parsed?.lessonId]);

  if (!parsed) return <LessonNotFound />;

  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center text-slate-500 font-semibold">Memuat lesson...</div>}>
      {LessonComponent
        ? <LessonComponent />
        : <ExtraEnglishLessonRoute level={parsed.levelId} skill={parsed.skillId} lessonId={parsed.lessonId} />}
    </Suspense>
  );
}
