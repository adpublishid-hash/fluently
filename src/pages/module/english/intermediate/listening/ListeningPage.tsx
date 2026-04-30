import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Play, Headphones, Sparkles } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { useLanguage } from '../../../../../i18n/LanguageContext';
import { getCompletedListeningLessons } from './listeningUtils';

const SKILL = {
  id: 'listening',
  label: 'Listening',
  labelKey: 'skill.listening' as const,
  icon: '/assets/icons/new/5. Video Lecture.png', // Assuming this exists from previous patterns
  fallbackIcon: <Headphones size={24} className="text-indigo-600" />,
  color: '#4F46E5', // Indigo-600
  bgColor: '#EEF2FF', // Indigo-50
};

const TOTAL_LESSONS = 20;

export default function InterListeningPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => { setCompletedIds(getCompletedListeningLessons()); }, []);

  const completedCount = completedIds.length;
  const progressPercent = TOTAL_LESSONS > 0 ? (completedCount / TOTAL_LESSONS) * 100 : 0;
  const lessons = Array.from({ length: TOTAL_LESSONS }, (_, i) => i + 1);

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.listening" subtitleKey="modul.daysSubtitle" />

        <motion.div
          className="mx-5 md:mx-0 mb-6 rounded-2xl p-5 relative overflow-hidden shadow-sm"
          style={{ backgroundColor: SKILL.bgColor, border: `1px solid ${SKILL.color}20` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl p-2 shrink-0 bg-white/50 backdrop-blur-sm border border-indigo-100">
               {/* Use fallback if img icon is missing, but Fluently apps typically map 8. Listening.png */}
              <img src={SKILL.icon} alt="" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.removeAttribute('hidden'); }} />
              <span hidden>{SKILL.fallbackIcon}</span>
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">{SKILL.label}</h3>
              <p className="text-xs text-[#6B7280]">
                {completedCount}/{TOTAL_LESSONS} Lessons · Listening Practice
              </p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm" style={{ backgroundColor: SKILL.color }}>
               Intermediate
            </div>
          </div>
          <div className="mt-4 h-2.5 bg-white/60 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          {completedCount > 0 && (
            <p className="text-[11px] font-semibold mt-2 text-indigo-700">
              {completedCount === TOTAL_LESSONS
                ? '🎉 Semua pelajaran selesai!'
                : `${completedCount} dari ${TOTAL_LESSONS} pelajaran selesai`}
            </p>
          )}
        </motion.div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-slate-800 mb-1">{t('modul.daysTitle')}</h2>
          <p className="text-[13px] text-slate-500 mb-5">Pilih pelajaran untuk mempraktikkan pemahaman mendengar standar B1.</p>

          <div className="space-y-3">
            {lessons.map((id, i) => {
              const done = completedIds.includes(id);
              return (
                <motion.button
                  key={id}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all border shadow-sm hover:shadow-md cursor-pointer group"
                  style={{
                    borderColor: done ? '#26C76D' : `${SKILL.color}30`,
                    backgroundColor: done ? '#F0FDF6' : 'white',
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                  whileHover={{ scale: 1.01, borderColor: done ? '#26C76D' : SKILL.color }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/modul/english/intermediate/listening/lesson-${id}`)}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white transition-colors shadow-sm"
                    style={{ backgroundColor: done ? '#26C76D' : SKILL.color }}
                  >
                    {done ? <Check size={18} strokeWidth={3} /> : <Play size={16} fill="white" className="ml-0.5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-[#1A1A2E] group-hover:text-indigo-700 transition-colors">Lesson {id}</p>
                      {done && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-[#26C76D]">
                          ✓ Selesai
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#6B7280] flex items-center gap-1 mt-0.5 truncate">
                      <Sparkles size={10} className="text-indigo-400" /> B1 Listening & Conversations
                    </p>
                  </div>

                  <span
                    className="text-[10px] font-bold px-3 py-1.5 rounded-full text-white shrink-0 shadow-sm"
                    style={{ backgroundColor: done ? '#26C76D' : SKILL.color }}
                  >
                    {done ? 'Ulangi' : 'Start'}
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
