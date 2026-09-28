import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { BookOpen, ChevronLeft } from 'lucide-react';
import { arabicLessonCounts, arabicSkills, normalizeArabicLevel, type ArabicSkillId } from './arabicModuleData';
import ArabicLessonSupplement from './ArabicLessonSupplement';
import GeneratedArabicLessonRenderer from './beginner/GeneratedArabicLessonRenderer';
import { useAuth } from '../../../auth/AuthContext';
import { languageCompletionKey, markCompletedId } from '../../../utils/lessonProgress';

function isArabicSkill(value?: string): value is ArabicSkillId {
  return value === 'kalam' || value === 'istima' || value === 'qiraah' || value === 'kitabah' || value === 'mufradat' || value === 'grammar' || value === 'pronunciation';
}

function parseLessonId(params: { lessonId?: string; lessonSlug?: string }) {
  const raw = params.lessonId ?? params.lessonSlug ?? '1';
  const match = raw.match(/\d+/);
  return Number(match?.[0] ?? 1);
}

function markComplete(levelId: string, skillId: string, lessonId: number) {
  return markCompletedId(languageCompletionKey('arabic', levelId, skillId), lessonId);
}

export default function ArabicLessonBridge() {
  const { awardXp } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const levelId = normalizeArabicLevel(params.levelId);
  const routeLevelId = params.levelId === 'beginner' ? 'beginner' : levelId;
  const skillId: ArabicSkillId = isArabicSkill(params.skillId) ? params.skillId : 'kalam';
  const lessonId = parseLessonId(params);
  const totalLessons = arabicLessonCounts[levelId][skillId];
  const skill = arabicSkills.find((item) => item.id === skillId) ?? arabicSkills[0];
  const progress = Math.min(100, Math.max(0, (lessonId / totalLessons) * 100));
  const initialTab = searchParams.get('tab') === 'latihan' || searchParams.get('practice') === '1' ? 'latihan' : 'materi';

  const goBack = () => navigate(`/modul/arabic/${routeLevelId}/${skillId}`);
  const completeAndContinue = () => {
    markComplete(levelId, skillId, lessonId);
    void awardXp(50, 'lesson', `modul/arabic/${routeLevelId}/${skillId}/lesson-${lessonId}`);
    if (lessonId < totalLessons) navigate(`/modul/arabic/${routeLevelId}/${skillId}/lesson-${lessonId + 1}`);
    else goBack();
  };

  if (lessonId < 1 || lessonId > totalLessons) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50 p-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-w-md text-center">
          <h1 className="text-xl font-black text-slate-800 mb-2">Lesson tidak ditemukan</h1>
          <p className="text-sm text-slate-500 mb-6">Materi Arabic untuk path ini belum tersedia.</p>
          <button onClick={goBack} className="px-5 py-3 rounded-xl text-white font-bold bg-[#0F766E]">
            Kembali ke daftar
          </button>
        </div>
      </div>
    );
  }

  const GeneratedLesson = () => (
    <GeneratedArabicLessonRenderer
      skillId={skillId}
      lessonId={lessonId}
      contentLevel={levelId === 'scholar' ? 'scholar' : levelId === 'mastery' ? 'mastery' : levelId === 'proficiency' ? 'proficiency' : levelId === 'advanced' ? 'advanced' : levelId === 'upper-intermediate' ? 'upper-intermediate' : levelId === 'intermediate' ? 'intermediate' : levelId === 'elementary' ? 'elementary' : 'beginner'}
      levelLabel={levelId === 'scholar' ? 'Scholar' : levelId === 'mastery' ? 'Mastery' : levelId === 'proficiency' ? 'Proficiency' : levelId === 'advanced' ? 'Advanced' : levelId === 'upper-intermediate' ? 'Upper-Intermediate' : levelId === 'intermediate' ? 'Intermediate' : levelId === 'elementary' ? 'Elementary' : 'Beginner'}
      onComplete={completeAndContinue}
      initialTab={initialTab}
    />
  );

  return (
    <div className="arabic-lesson-page min-h-screen bg-[#F8FAFC]" style={{ fontFamily: "'Inter', 'KFGQPC Uthman Taha Naskh', 'Noto Naskh Arabic', 'Noto Sans Arabic', system-ui, sans-serif" }}>
      <div className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-3">
        <button onClick={goBack} className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center transition">
          <ChevronLeft size={20} className="text-slate-700" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0F766E] truncate">Arabic {levelId} - {skill.label}</p>
          <h1 className="text-sm md:text-base font-black text-slate-900 truncate">Lesson {lessonId}</h1>
        </div>
        <button
          onClick={completeAndContinue}
          className="px-4 h-10 rounded-xl text-xs font-black text-white bg-[#0F766E] shadow-sm shadow-teal-100 hover:bg-[#0B6B63] transition"
        >
          {lessonId < totalLessons ? 'Next' : 'Done'}
        </button>
      </div>
        <div className="h-1 bg-slate-100">
          <div className="h-full bg-[#0F766E] transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-4 pt-5">
        <div className="mb-4 rounded-2xl border border-teal-100 bg-white p-4 md:p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center shrink-0">
              <BookOpen size={21} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0F766E]">Materi Arabic</p>
              <h2 className="text-lg font-black text-slate-900">{skill.label} - Lesson {lessonId}</h2>
              <p className="text-xs text-slate-500">{Math.round(progress)}% dari {totalLessons} lesson</p>
            </div>
          </div>
        </div>

      </section>

      <ArabicLessonSupplement levelId={levelId} skillId={skillId} lessonId={lessonId} />

      <div className="arabic-lesson-content mx-auto max-w-5xl px-4 pb-28">
        <GeneratedLesson />
      </div>
    </div>
  );
}
