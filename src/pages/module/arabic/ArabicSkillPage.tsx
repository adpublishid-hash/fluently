import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Headphones, Play, RotateCcw } from 'lucide-react';
import PageContainer from '../../../components/layout/PageContainer';
import { PageHeader } from '../../../components/shared/NavComponents';
import { arabicLessonCounts, arabicLevels, arabicSkills, normalizeArabicLevel, type ArabicSkillId } from './arabicModuleData';
import { getArabicLessonPreview } from './beginner/generatedBeginnerArabicContent';

function isArabicSkill(value?: string): value is ArabicSkillId {
  return value === 'kalam' || value === 'istima' || value === 'qiraah' || value === 'kitabah' || value === 'mufradat' || value === 'grammar' || value === 'pronunciation';
}

function getCompleted(levelId: string, skillId: string): number[] {
  try {
    return JSON.parse(localStorage.getItem(`talky_arabic_${levelId}_${skillId}_completed`) || '[]');
  } catch {
    return [];
  }
}

export default function ArabicSkillPage() {
  const navigate = useNavigate();
  const params = useParams();
  const levelId = normalizeArabicLevel(params.levelId);
  const routeLevelId = params.levelId === 'beginner' ? 'beginner' : levelId;
  const skillId: ArabicSkillId = isArabicSkill(params.skillId) ? params.skillId : 'kalam';
  const level = arabicLevels[levelId];
  const skill = arabicSkills.find((item) => item.id === skillId) ?? arabicSkills[0];
  const totalLessons = arabicLessonCounts[levelId][skillId];
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    setCompleted(getCompleted(levelId, skillId));
  }, [levelId, skillId]);

  const pct = totalLessons ? (completed.length / totalLessons) * 100 : 0;

  if (!totalLessons) {
    return (
      <PageContainer>
        <div className="px-5 md:px-0 py-8">
          <PageHeader title={skill.label} subtitle="Modul ini belum tersedia untuk level ini" onBack={() => navigate(`/modul/arabic/${routeLevelId}`)} />
          <div className="rounded-2xl bg-white border border-slate-200 p-6 text-sm text-slate-600">
            Modul {skill.label} sudah dibuat untuk Arabic Beginner. Untuk level ini, kontennya akan ditambahkan setelah materi level terkait siap.
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader title={skill.label} subtitle={`${level.title} - ${totalLessons} lesson dari AI Kamus`} onBack={() => navigate(`/modul/arabic/${routeLevelId}`)} />

        <motion.div
          className="mx-5 md:mx-0 mb-6 rounded-2xl p-5 relative overflow-hidden"
          style={{ backgroundColor: skill.bgColor, border: `1px solid ${skill.color}20` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center p-2 shrink-0" style={{ backgroundColor: `${skill.color}15` }}>
              <img src={skill.icon} alt="" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">{skill.label}</h3>
              <p className="text-xs text-[#6B7280]">{completed.length}/{totalLessons} Pelajaran</p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: level.color }}>
              Arabic {level.badge}
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ backgroundColor: skill.color }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
          </div>
        </motion.div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">Learning Path</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">Pilih lesson untuk membuka materi AI Kamus Arabic.</p>

          <div className="grid gap-3 md:grid-cols-2 mb-5">
            <div className="rounded-2xl border border-teal-100 bg-teal-50 p-4">
              <div className="flex items-center gap-2 text-[#0F766E] font-black text-sm">
                <Headphones size={17} />
                TTS Arabic
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">Setiap lesson punya kartu dengarkan cepat untuk melatih bunyi Arab, makharij, dan dialog.</p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-center gap-2 text-blue-700 font-black text-sm">
                <RotateCcw size={17} />
                Review System
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">Lesson yang selesai otomatis masuk progres, lalu bisa diulang dari daftar ini kapan saja.</p>
            </div>
          </div>

          <div className="space-y-3">
            {Array.from({ length: totalLessons }, (_, index) => index + 1).map((lessonId, index) => {
              const done = completed.includes(lessonId);
              const preview = getArabicLessonPreview(
                skillId,
                lessonId,
                levelId === 'scholar' ? 'scholar' : levelId === 'mastery' ? 'mastery' : levelId === 'proficiency' ? 'proficiency' : levelId === 'advanced' ? 'advanced' : levelId === 'upper-intermediate' ? 'upper-intermediate' : levelId === 'intermediate' ? 'intermediate' : levelId === 'elementary' ? 'elementary' : 'beginner',
              );
              return (
                <motion.button
                  key={lessonId}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all border-2 shadow-sm hover:shadow-md cursor-pointer"
                  style={{ borderColor: done ? '#26C76D' : `${skill.color}30`, backgroundColor: done ? '#F0FDF6' : 'white' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.02 * index }}
                  whileHover={{ scale: 1.01, borderColor: done ? '#26C76D' : skill.color }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/modul/arabic/${routeLevelId}/${skillId}/lesson-${lessonId}`)}
                >
                  <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white" style={{ backgroundColor: done ? '#26C76D' : skill.color }}>
                    {done ? <Check size={18} strokeWidth={3} /> : <Play size={16} fill="white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-[#1A1A2E]">Lesson {lessonId}</p>
                    <p className="text-[12px] text-[#6B7280] truncate mt-0.5">{preview}</p>
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1.5 rounded-full text-white shrink-0" style={{ backgroundColor: done ? '#26C76D' : skill.color }}>
                    {done ? 'Completed' : 'Start'}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
