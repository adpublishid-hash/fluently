import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Headphones, Play, RotateCcw } from 'lucide-react';
import PageContainer from '../../../components/layout/PageContainer';
import { PageHeader } from '../../../components/shared/NavComponents';
import { isMandarinSkill, mandarinLessonCounts, mandarinLevels, mandarinSkills, normalizeMandarinLevel, type MandarinSkillId } from './mandarinModuleData';
import { getMandarinLessonPreview } from './mandarinLessonContent';

function getCompleted(levelId: string, skillId: string): number[] {
  try {
    return JSON.parse(localStorage.getItem(`talky_mandarin_${levelId}_${skillId}_completed`) || '[]');
  } catch {
    return [];
  }
}

export default function MandarinSkillPage() {
  const navigate = useNavigate();
  const params = useParams();
  const levelId = normalizeMandarinLevel(params.levelId);
  const skillId: MandarinSkillId = isMandarinSkill(params.skillId) ? params.skillId : 'grammar';
  const level = mandarinLevels[levelId];
  const skill = mandarinSkills.find((item) => item.id === skillId) ?? mandarinSkills[0];
  const totalLessons = mandarinLessonCounts[levelId][skillId];
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    setCompleted(getCompleted(levelId, skillId));
  }, [levelId, skillId]);

  const pct = totalLessons ? (completed.length / totalLessons) * 100 : 0;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader title={skill.label} subtitle={`${level.title} - ${totalLessons} lesson`} onBack={() => navigate(`/modul/mandarin/${levelId}`)} />

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
              Mandarin {level.badge}
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ backgroundColor: skill.color }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
          </div>
        </motion.div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">Learning Path</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">Pilih lesson untuk membuka materi Mandarin.</p>

          <div className="grid gap-3 md:grid-cols-2 mb-5">
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
              <div className="flex items-center gap-2 text-red-700 font-black text-sm">
                <Headphones size={17} />
                TTS Mandarin
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">Setiap lesson punya contoh Hanzi yang bisa didengarkan untuk melatih tone dan ritme.</p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-center gap-2 text-blue-700 font-black text-sm">
                <RotateCcw size={17} />
                Review System
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">Lesson selesai tersimpan di progres dan bisa diulang kapan saja.</p>
            </div>
          </div>

          <div className="space-y-3">
            {Array.from({ length: totalLessons }, (_, index) => index + 1).map((lessonId, index) => {
              const done = completed.includes(lessonId);
              const preview = getMandarinLessonPreview(skillId, lessonId, levelId);
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
                  onClick={() => navigate(`/modul/mandarin/${levelId}/${skillId}/lesson-${lessonId}`)}
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
