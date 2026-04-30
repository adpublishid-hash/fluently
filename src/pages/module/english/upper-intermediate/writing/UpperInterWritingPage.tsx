import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, PenLine, Play } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { upperInterWritingLessons } from './upperInterWritingContent';

const ACCENT = '#784212';
const STORAGE_KEY = 'talky_upper_intermediate_writing_completed';
const BASE_PATH = '/modul/english/upper-intermediate/writing';

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

export default function UpperInterWritingPage() {
  const navigate = useNavigate();
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  useEffect(() => { setCompletedIds(getCompleted()); }, []);

  const count = completedIds.filter((id) => upperInterWritingLessons.some((lesson) => lesson.id === id)).length;
  const pct = (count / upperInterWritingLessons.length) * 100;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.writing" subtitle="Upper-Intermediate B2 writing curriculum" />

        <motion.div className="mx-5 md:mx-0 mb-6 rounded-2xl p-5 relative overflow-hidden"
          style={{ backgroundColor: ACCENT + '15', border: `1px solid ${ACCENT}30` }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: ACCENT }}>
              <PenLine size={22} />
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">Writing</h3>
              <p className="text-xs text-[#6B7280]">{count}/{upperInterWritingLessons.length} Pelajaran - Menulis essay, report, email, review B2</p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: ACCENT }}>
              B2
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ backgroundColor: ACCENT }}
              initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }} />
          </div>
          {count > 0 && <p className="text-[11px] font-semibold mt-1.5" style={{ color: ACCENT }}>{count === upperInterWritingLessons.length ? 'Semua pelajaran selesai!' : `${count} dari ${upperInterWritingLessons.length} pelajaran selesai`}</p>}
        </motion.div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">Learning Path</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">20 pelajaran CEFR B2 Upper-Intermediate dengan materi, contoh, tugas menulis, checklist, dan kuis.</p>
          <div className="space-y-3">
            {upperInterWritingLessons.map((lesson, i) => {
              const done = completedIds.includes(lesson.id);
              return (
                <motion.button key={lesson.id}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-left border-2 shadow-sm hover:shadow-md cursor-pointer"
                  style={{ borderColor: done ? '#26C76D' : ACCENT + '30', backgroundColor: done ? '#F0FDF6' : 'white' }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`${BASE_PATH}/lesson-${lesson.id}`)}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white" style={{ backgroundColor: done ? '#26C76D' : ACCENT }}>
                    {done ? <Check size={18} strokeWidth={3} /> : <Play size={16} fill="white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-sm text-[#1A1A2E]">Lesson {lesson.id}: {lesson.title}</p>
                      {done && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-[#26C76D]">Selesai</span>}
                    </div>
                    <p className="text-[12px] text-[#6B7280] mt-0.5 line-clamp-2">{lesson.outcome}</p>
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1.5 rounded-full text-white shrink-0" style={{ backgroundColor: done ? '#26C76D' : ACCENT }}>
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
