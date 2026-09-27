import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, CheckCircle2, ChevronRight, Clock, Languages, PlayCircle, Video } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { useAuth } from '../../auth/AuthContext';
import {
  getDefaultVideoLanguage,
  getVideoLanguage,
  getVideoLessonKey,
  getVideoLessonPath,
  getVideoLessons,
  getVideoLevel,
  getVideoLevelPath,
  isVideoLevelId,
  videoLevels,
  type VideoLanguageId,
  type VideoLevelId,
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

const cardHover = { y: -3, transition: { type: 'spring' as const, stiffness: 360, damping: 26 } };
const font = (weight: number) => ({ fontFamily: "'DM Sans', sans-serif", fontWeight: weight } as const);

export default function VideoLessonsPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useAuth();
  const [completed, setCompleted] = useState<string[]>(() => readCompletedLessons());

  const defaultLanguageId = getDefaultVideoLanguage(user?.persona?.targetLanguage);
  const selectedLanguageId: VideoLanguageId = defaultLanguageId;
  const selectedLevelId: VideoLevelId = isVideoLevelId(params.levelId) ? params.levelId : 'basic';
  const selectedLanguage = getVideoLanguage(selectedLanguageId);
  const selectedLevel = getVideoLevel(selectedLevelId);
  const lessons = useMemo(
    () => getVideoLessons(selectedLanguageId, selectedLevelId),
    [selectedLanguageId, selectedLevelId]
  );
  const completedCount = lessons.filter((lesson) =>
    completed.includes(getVideoLessonKey(lesson.languageId, lesson.levelId, lesson.id))
  ).length;
  const progress = lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0;

  useEffect(() => {
    const refresh = () => setCompleted(readCompletedLessons());
    window.addEventListener('storage', refresh);
    window.addEventListener('focus', refresh);
    window.addEventListener('fluently-video-progress', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('fluently-video-progress', refresh);
    };
  }, []);

  useEffect(() => {
    if (params.languageId && params.languageId !== selectedLanguageId) {
      navigate(getVideoLevelPath(selectedLanguageId, selectedLevelId), { replace: true });
    }
  }, [navigate, params.languageId, selectedLanguageId, selectedLevelId]);

  const openLevel = (levelId: VideoLevelId) => {
    navigate(getVideoLevelPath(selectedLanguageId, levelId));
  };

  return (
    <PageContainer className="px-4 pb-28 md:px-0 md:pb-10">
      <div className="pt-5 md:pt-0 space-y-6">
        <motion.section
          className="relative overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.07)]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(245,158,11,0.10) 52%, rgba(236,72,153,0.12) 100%)',
            }}
          />
          <div className="relative flex min-h-[210px] items-stretch">
            <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 max-w-[66%]">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/75 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-500" style={font(800)}>
                  <Video size={13} />
                  Video Lessons
                </span>
              <h1 className="mt-4 text-[25px] leading-tight tracking-tight text-[#1A1A2E] sm:text-[30px]" style={font(900)}>
                {selectedLanguage.label} video path
              </h1>
                <p className="mt-2 max-w-[360px] text-[12.5px] leading-relaxed text-slate-500" style={font(500)}>
                  {selectedLevel.label} lessons for guided watching, listening, and speaking practice.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <div className="rounded-2xl bg-white/80 px-3 py-2 shadow-sm">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400" style={font(800)}>Progress</p>
                  <p className="text-[18px] text-[#1A1A2E]" style={font(900)}>{progress}%</p>
                </div>
                <div className="rounded-2xl bg-white/80 px-3 py-2 shadow-sm">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400" style={font(800)}>Lessons</p>
                  <p className="text-[18px] text-[#1A1A2E]" style={font(900)}>{completedCount}/{lessons.length}</p>
                </div>
              </div>
            </div>

            <div className="relative flex w-[34%] min-w-[118px] items-center justify-center overflow-hidden">
              <motion.img
                src="/assets/icons/new/5. Video Lecture.png"
                alt=""
                className="relative z-10 h-28 w-28 object-contain sm:h-36 sm:w-36"
                initial={{ opacity: 0, scale: 0.88, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.42, delay: 0.12 }}
              />
            </div>
          </div>
        </motion.section>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-[18px] tracking-tight text-[#1A1A2E]" style={font(800)}>Bahasa Belajar</h2>
              <p className="text-[12px] text-slate-400" style={font(500)}>Mengikuti bahasa yang dipilih di setting</p>
            </div>
            <Languages size={20} className="text-slate-300" />
          </div>

          <motion.div
            whileHover={cardHover}
            className="rounded-2xl border bg-white p-4 shadow-[0_8px_26px_rgba(15,23,42,0.05)]"
            style={{
              borderColor: `${selectedLanguage.accent}55`,
              background: `linear-gradient(160deg, ${selectedLanguage.softBg} 0%, #FFFFFF 86%)`,
            }}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: selectedLanguage.softBg }}>
                <img src={selectedLanguage.icon} alt="" className="h-10 w-10 object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="text-[16px] leading-tight text-[#1A1A2E]" style={font(900)}>{selectedLanguage.label}</h3>
                  <CheckCircle2 size={17} style={{ color: selectedLanguage.accent }} />
                </div>
                <p className="text-[12px] text-slate-400" style={font(800)}>{selectedLanguage.nativeLabel}</p>
                <p className="mt-2 text-[12px] leading-relaxed text-slate-500" style={font(500)}>{selectedLanguage.subtitle}</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="space-y-3">
          <div>
            <h2 className="text-[18px] tracking-tight text-[#1A1A2E]" style={font(800)}>Level</h2>
            <p className="text-[12px] text-slate-400" style={font(500)}>Basic, Intermediate, and Advanced</p>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            {videoLevels.map((level) => {
              const isActive = level.id === selectedLevelId;
              return (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => openLevel(level.id)}
                  className="min-h-[68px] rounded-xl px-2 py-2 text-center transition-colors"
                  style={{
                    backgroundColor: isActive ? `${level.accent}14` : 'transparent',
                    color: isActive ? level.accent : '#64748B',
                  }}
                >
                  <span className="block text-[10px] uppercase tracking-[0.16em]" style={font(900)}>{level.tag}</span>
                  <span className="mt-0.5 block text-[11px] leading-tight sm:text-[12px]" style={font(800)}>{level.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-[18px] tracking-tight text-[#1A1A2E]" style={font(800)}>
                {selectedLanguage.label} {selectedLevel.label}
              </h2>
              <p className="text-[12px] text-slate-400" style={font(500)}>{selectedLevel.subtitle}</p>
            </div>
            <BookOpen size={20} className="text-slate-300" />
          </div>

          <div className="grid gap-3">
            {lessons.map((lesson) => {
              const isDone = completed.includes(getVideoLessonKey(lesson.languageId, lesson.levelId, lesson.id));
              return (
                <motion.button
                  key={lesson.id}
                  type="button"
                  onClick={() => navigate(getVideoLessonPath(lesson.languageId, lesson.levelId, lesson.id))}
                  whileHover={cardHover}
                  whileTap={{ scale: 0.985 }}
                  className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 text-left shadow-[0_8px_26px_rgba(15,23,42,0.05)]"
                >
                  <div
                    className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl"
                    style={{ background: `linear-gradient(145deg, ${selectedLanguage.softBg}, #FFFFFF)` }}
                  >
                    <img src={lesson.poster} alt="" className="h-12 w-12 object-contain" />
                    <span className="absolute bottom-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm">
                      <PlayCircle size={15} style={{ color: lesson.accent }} />
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full px-2 py-0.5 text-[9.5px] uppercase tracking-[0.14em]" style={{ backgroundColor: `${lesson.accent}12`, color: lesson.accent, ...font(900) }}>
                        Lesson {lesson.id}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10.5px] text-slate-400" style={font(700)}>
                        <Clock size={11} />
                        {lesson.duration}
                      </span>
                      {isDone && (
                        <span className="inline-flex items-center gap-1 text-[10.5px] text-emerald-600" style={font(800)}>
                          <CheckCircle2 size={11} />
                          Done
                        </span>
                      )}
                    </div>
                    <h3 className="truncate text-[14.5px] text-[#1A1A2E]" style={font(800)}>{lesson.title}</h3>
                    <p className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-slate-500" style={font(500)}>{lesson.subtitle}</p>
                  </div>

                  <ChevronRight size={18} className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5" />
                </motion.button>
              );
            })}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
