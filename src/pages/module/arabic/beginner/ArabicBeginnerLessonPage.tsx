import { lazy, Suspense, useMemo } from 'react';
import type React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { arabicLessonCounts, type ArabicSkillId } from '../arabicModuleData';

const beginnerLessonPages = import.meta.glob('./{grammar,kalam,mufradat,pronunciation,istima,qiraah,kitabah}/Lesson*.tsx');

function isArabicSkill(value?: string): value is ArabicSkillId {
  return value === 'kalam' || value === 'istima' || value === 'qiraah' || value === 'kitabah' || value === 'mufradat' || value === 'grammar' || value === 'pronunciation';
}

function parseLessonId(params: { lessonId?: string; lessonSlug?: string }) {
  const raw = params.lessonId ?? params.lessonSlug ?? '1';
  const match = raw.match(/\d+/);
  return Number(match?.[0] ?? 1);
}

export default function ArabicBeginnerLessonPage() {
  const navigate = useNavigate();
  const params = useParams();
  const skillId: ArabicSkillId = isArabicSkill(params.skillId) ? params.skillId : 'kalam';
  const lessonId = parseLessonId(params);
  const totalLessons = arabicLessonCounts.pemula[skillId];
  const modulePath = `./${skillId}/Lesson${lessonId}.tsx`;

  const LessonPage = useMemo(() => {
    const importer = beginnerLessonPages[modulePath];
    return importer ? lazy(importer as () => Promise<{ default: React.ComponentType }>) : null;
  }, [modulePath]);

  if (!LessonPage || lessonId < 1 || lessonId > totalLessons) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50 p-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-w-md text-center">
          <h1 className="text-xl font-black text-slate-800 mb-2">Lesson tidak ditemukan</h1>
          <p className="text-sm text-slate-500 mb-6">Halaman Arabic beginner untuk lesson ini belum tersedia.</p>
          <button onClick={() => navigate(`/modul/arabic/beginner/${skillId}`)} className="px-5 py-3 rounded-xl text-white font-bold bg-[#0F766E]">
            Kembali ke daftar
          </button>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center text-slate-500 font-semibold">Memuat lesson Arabic beginner...</div>}>
      <LessonPage />
    </Suspense>
  );
}
