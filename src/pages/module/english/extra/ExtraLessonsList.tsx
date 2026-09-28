import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Play, Sparkles } from 'lucide-react';
import { PROGRESS_CHANGED_EVENT, readCompletedIds } from '../../../../utils/lessonProgress';
import { getExtraEnglishLessons } from '.';

/** Lists the extra (data-driven) lessons of a skill below the original lesson list. */
export default function ExtraLessonsList({ level, skill, color }: { level: string; skill: string; color: string }) {
  const navigate = useNavigate();
  const lessons = getExtraEnglishLessons(level, skill);
  const storageKey = `talky_${level}_${skill}_completed`;
  const [completed, setCompleted] = useState(() => readCompletedIds(storageKey));

  useEffect(() => {
    const refresh = () => setCompleted(readCompletedIds(storageKey));
    window.addEventListener(PROGRESS_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(PROGRESS_CHANGED_EVENT, refresh);
  }, [storageKey]);

  if (lessons.length === 0) return null;
  const doneCount = lessons.filter((lesson) => completed.includes(lesson.id)).length;

  return (
    <div className="mt-8">
      <div className="mb-3 flex items-end justify-between gap-2">
        <div>
          <h3 className="flex items-center gap-1.5 text-base font-extrabold text-[#1A1A2E]"><Sparkles size={16} style={{ color }} /> Pelajaran lanjutan</h3>
          <p className="text-[12px] text-[#6B7280]">Lesson {lessons[0].id}–{lessons[lessons.length - 1].id} · {doneCount}/{lessons.length} selesai</p>
        </div>
      </div>
      <div className="space-y-3">
        {lessons.map((lesson) => {
          const done = completed.includes(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => navigate(`/modul/english/${level}/${skill}/lesson-${lesson.id}`)}
              className="flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left shadow-sm transition-all hover:shadow-md"
              style={{ borderColor: done ? '#26C76D' : `${color}30`, backgroundColor: done ? '#F0FDF6' : 'white' }}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white" style={{ backgroundColor: done ? '#26C76D' : color }}>
                {done ? <Check size={18} /> : lesson.id}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-bold text-[#6B7280]">Lesson {lesson.id}</span>
                <span className="block truncate text-[15px] font-bold text-[#1A1A2E]">{lesson.title}</span>
                <span className="block truncate text-xs text-[#6B7280]">{lesson.subtitle}</span>
              </span>
              <Play size={16} style={{ color }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
