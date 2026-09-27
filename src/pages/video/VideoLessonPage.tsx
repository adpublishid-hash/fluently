import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, CheckCircle2, ChevronLeft, ChevronRight, Clock, FileText, PlayCircle, Video } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { useAuth } from '../../auth/AuthContext';
import {
  getDefaultVideoLanguage,
  getVideoLanguage,
  getVideoLesson,
  getVideoLessonKey,
  getVideoLessonPath,
  getVideoLessons,
  getVideoLevel,
  getVideoLevelPath,
  isVideoLanguageId,
  isVideoLevelId,
  parseVideoLessonSlug,
} from './videoLessonData';

const COMPLETED_KEY = 'fluently_video_lessons_completed';

function readCompletedLessons() {
  try {
    const parsed = JSON.parse(localStorage.getItem(COMPLETED_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function writeCompletedLessons(next: string[]) {
  localStorage.setItem(COMPLETED_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event('fluently-video-progress'));
}

const font = (weight: number) => ({ fontFamily: "'DM Sans', sans-serif", fontWeight: weight } as const);

export default function VideoLessonPage() {
  const navigate = useNavigate();
  const { languageId, levelId, lessonSlug } = useParams();
  const { user } = useAuth();
  const lessonId = parseVideoLessonSlug(lessonSlug);
  const defaultLanguageId = getDefaultVideoLanguage(user?.persona?.targetLanguage);
  const isValidLanguage = isVideoLanguageId(languageId);
  const isValidLevel = isVideoLevelId(levelId);
  const lesson = isValidLanguage && isValidLevel && lessonId
    ? getVideoLesson(languageId, levelId, lessonId)
    : undefined;
  const [completed, setCompleted] = useState<string[]>(() => readCompletedLessons());

  const lessonKey = lesson ? getVideoLessonKey(lesson.languageId, lesson.levelId, lesson.id) : '';
  const isCompleted = lessonKey ? completed.includes(lessonKey) : false;
  const language = lesson ? getVideoLanguage(lesson.languageId) : null;
  const level = lesson ? getVideoLevel(lesson.levelId) : null;
  const lessons = useMemo(
    () => lesson ? getVideoLessons(lesson.languageId, lesson.levelId) : [],
    [lesson]
  );
  const previousLesson = lesson ? getVideoLesson(lesson.languageId, lesson.levelId, lesson.id - 1) : undefined;
  const nextLesson = lesson ? getVideoLesson(lesson.languageId, lesson.levelId, lesson.id + 1) : undefined;

  useEffect(() => {
    setCompleted(readCompletedLessons());
  }, [lessonKey]);

  useEffect(() => {
    if (languageId && languageId !== defaultLanguageId && isVideoLevelId(levelId) && lessonId) {
      navigate(getVideoLessonPath(defaultLanguageId, levelId, lessonId), { replace: true });
    }
  }, [defaultLanguageId, languageId, lessonId, levelId, navigate]);

  const markComplete = () => {
    if (!lessonKey || isCompleted) return;
    const next = [...completed, lessonKey];
    setCompleted(next);
    writeCompletedLessons(next);
  };

  if (!lesson || !language || !level) {
    return (
      <PageContainer className="px-4 pb-28 md:px-0 md:pb-10">
        <div className="pt-5 md:pt-0">
          <button
            type="button"
            onClick={() => navigate('/video')}
            className="mb-4 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[12px] font-bold text-slate-600 shadow-sm"
          >
            <ArrowLeft size={15} />
            Video Lessons
          </button>
          <div className="rounded-[28px] border border-slate-100 bg-white p-6 text-center shadow-[0_14px_42px_rgba(15,23,42,0.07)]">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
              <Video size={24} />
            </div>
            <h1 className="text-[20px] text-[#1A1A2E]" style={font(900)}>Video lesson tidak ditemukan</h1>
            <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-slate-500" style={font(500)}>
              Pilih bahasa dan level dari katalog video.
            </p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="px-4 pb-28 md:px-0 md:pb-10">
      <div className="pt-5 md:pt-0 space-y-5">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(getVideoLevelPath(lesson.languageId, lesson.levelId))}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[12px] font-bold text-slate-600 shadow-sm"
          >
            <ArrowLeft size={15} />
            {language.label} {level.label}
          </button>
          <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.16em]" style={{ backgroundColor: `${lesson.accent}12`, color: lesson.accent, ...font(900) }}>
            Lesson {lesson.id}/{lessons.length}
          </span>
        </div>

        <section className="overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.07)]">
          {lesson.videoUrl ? (
            <video controls poster={lesson.poster} className="aspect-video w-full bg-slate-950 object-cover">
              <source src={lesson.videoUrl} />
            </video>
          ) : lesson.embedUrl ? (
            <iframe
              title={lesson.title}
              src={lesson.embedUrl}
              className="aspect-video w-full bg-slate-950"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              className="relative flex aspect-video w-full items-center justify-center overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${language.softBg} 0%, #0F172A 100%)` }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.15),rgba(15,23,42,0.78))]" />
              <motion.img
                src={lesson.poster}
                alt=""
                className="absolute right-6 top-1/2 h-32 w-32 -translate-y-1/2 object-contain opacity-25 sm:h-44 sm:w-44"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.25, scale: 1 }}
              />
              <div className="relative z-10 flex flex-col items-center px-5 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#1A1A2E] shadow-[0_20px_45px_rgba(15,23,42,0.25)]">
                  <PlayCircle size={34} fill="currentColor" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/65" style={font(900)}>{lesson.duration}</p>
                <h1 className="mt-2 max-w-[520px] text-[22px] leading-tight text-white sm:text-[30px]" style={font(900)}>{lesson.title}</h1>
                <p className="mt-2 max-w-[460px] text-[12.5px] leading-relaxed text-white/72" style={font(500)}>Video belum diunggah</p>
              </div>
            </div>
          )}

          <div className="p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-[11px] text-slate-500" style={font(800)}>
                <Clock size={13} />
                {lesson.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-[11px] text-slate-500" style={font(800)}>
                <Video size={13} />
                {lesson.teacher}
              </span>
              {isCompleted && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] text-emerald-600" style={font(900)}>
                  <CheckCircle2 size={13} />
                  Completed
                </span>
              )}
            </div>

            <h2 className="text-[22px] leading-tight text-[#1A1A2E]" style={font(900)}>{lesson.title}</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-500" style={font(500)}>{lesson.outcome}</p>
          </div>
        </section>

        <section className="grid gap-3 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_8px_26px_rgba(15,23,42,0.05)]">
            <div className="mb-3 flex items-center gap-2">
              <FileText size={18} style={{ color: lesson.accent }} />
              <h3 className="text-[15px] text-[#1A1A2E]" style={font(900)}>Key Lines</h3>
            </div>
            <div className="space-y-2">
              {lesson.transcript.map((line, index) => (
                <div key={line} className="rounded-xl bg-slate-50 px-3 py-2 text-[12.5px] text-slate-700" style={font(700)}>
                  <span className="mr-2 text-slate-400">{index + 1}.</span>{line}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_8px_26px_rgba(15,23,42,0.05)]">
            <h3 className="mb-3 text-[15px] text-[#1A1A2E]" style={font(900)}>Checkpoints</h3>
            <div className="space-y-2">
              {lesson.checkpoints.map((checkpoint) => (
                <div key={checkpoint} className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white" style={{ color: lesson.accent }}>
                    <Check size={13} />
                  </span>
                  <span className="text-[12px] leading-relaxed text-slate-600" style={font(600)}>{checkpoint}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_8px_26px_rgba(15,23,42,0.05)]">
          <h3 className="mb-3 text-[15px] text-[#1A1A2E]" style={font(900)}>Lesson Focus</h3>
          <div className="flex flex-wrap gap-2">
            {lesson.topics.map((topic) => (
              <span key={topic} className="rounded-full px-3 py-1.5 text-[11px]" style={{ backgroundColor: `${lesson.accent}12`, color: lesson.accent, ...font(800) }}>
                {topic}
              </span>
            ))}
          </div>
        </section>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => previousLesson && navigate(getVideoLessonPath(previousLesson.languageId, previousLesson.levelId, previousLesson.id))}
            disabled={!previousLesson}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-[13px] font-extrabold text-slate-600 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <button
            type="button"
            onClick={markComplete}
            disabled={isCompleted}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl px-4 text-[13px] font-extrabold text-white disabled:opacity-80"
            style={{ background: isCompleted ? '#10B981' : `linear-gradient(135deg, ${lesson.accent}, #1A1A2E)` }}
          >
            {isCompleted ? <CheckCircle2 size={16} /> : <Check size={16} />}
            {isCompleted ? 'Completed' : 'Mark Complete'}
          </button>
          <button
            type="button"
            onClick={() => {
              if (nextLesson) {
                navigate(getVideoLessonPath(nextLesson.languageId, nextLesson.levelId, nextLesson.id));
              } else {
                navigate(getVideoLevelPath(lesson.languageId, lesson.levelId));
              }
            }}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#1A1A2E] px-4 text-[13px] font-extrabold text-white"
          >
            {nextLesson ? 'Next' : 'Level List'}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </PageContainer>
  );
}
