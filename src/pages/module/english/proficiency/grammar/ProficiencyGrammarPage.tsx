import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Play } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { proficiencyGrammarLessons } from './proficiencyGrammarContent';

const SKILL = {
  label: 'Grammar',
  icon: '/assets/icons/new/21. Pencil & Ruler.png',
  color: '#1C2833',
  bgColor: '#D5D8DC',
};

const STORAGE_KEY = 'talky_proficiency_grammar_completed';

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

export default function ProficiencyGrammarPage() {
  const navigate = useNavigate();
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => { setCompletedIds(getCompleted()); }, []);

  const count = completedIds.length;
  const totalLessons = proficiencyGrammarLessons.length;
  const pct = (count / totalLessons) * 100;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader title="Grammar" subtitle="20 pelajaran CEFR C2 Proficiency" />

        <motion.div className="mx-5 md:mx-0 mb-6 rounded-2xl p-5 relative overflow-hidden" style={{ backgroundColor: SKILL.bgColor, border: `1px solid ${SKILL.color}20` }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center p-2 shrink-0" style={{ backgroundColor: `${SKILL.color}15` }}>
              <img src={SKILL.icon} alt="" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">{SKILL.label}</h3>
              <p className="text-xs text-[#6B7280]">{count}/{totalLessons} Pelajaran</p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: SKILL.color }}>Proficiency</div>
          </div>
          <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ backgroundColor: SKILL.color }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
          </div>
        </motion.div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">Learning Path</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">Materi grammar C2 dengan rumus, contoh, latihan transformasi, dan kuis 20 soal.</p>

          <div className="space-y-3">
            {proficiencyGrammarLessons.map((lesson, index) => {
              const done = completedIds.includes(lesson.id);
              return (
                <motion.button
                  key={lesson.id}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all border-2 shadow-sm hover:shadow-md cursor-pointer"
                  style={{ borderColor: done ? '#26C76D' : `${SKILL.color}30`, backgroundColor: done ? '#F0FDF6' : 'white' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * index }}
                  whileHover={{ scale: 1.01, borderColor: done ? '#26C76D' : SKILL.color }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/modul/english/proficiency/grammar/lesson-${lesson.id}`)}
                >
                  <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white" style={{ backgroundColor: done ? '#26C76D' : SKILL.color }}>
                    {done ? <Check size={18} strokeWidth={3} /> : <Play size={16} fill="white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-[#1A1A2E]">Lesson {lesson.id}</p>
                      {done && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-[#26C76D]">Selesai</span>}
                    </div>
                    <p className="text-[12px] text-[#6B7280] truncate mt-0.5">{lesson.title}</p>
                    <p className="text-[11px] text-[#8A94A6] truncate mt-0.5">{lesson.subtitle}</p>
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1.5 rounded-full text-white shrink-0" style={{ backgroundColor: done ? '#26C76D' : SKILL.color }}>
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
