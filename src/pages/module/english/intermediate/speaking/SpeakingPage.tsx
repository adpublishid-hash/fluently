import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Lock, Play } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { useLanguage } from '../../../../../i18n/LanguageContext';
import { useState, useEffect } from 'react';

const SKILL = {
  id: 'speaking',
  label: 'Speaking',
  icon: '/assets/icons/new/7. Webinar.png',
  color: '#E74C3C',
  bgColor: '#FDEDEC',
  totalDays: 20
};

const LESSON_TITLES: Record<number, string> = {
  1: 'Making Suggestions & Recommendations',
  2: 'Agreeing & Disagreeing Politely',
  3: 'Describing Trends & Changes',
  4: 'Expressing Opinions Formally',
  5: 'Negotiating & Compromising',
  6: 'Giving Presentations',
  7: 'Interviewing Techniques',
  8: 'Describing Problems & Solutions',
  9: 'Discussing Advantages & Disadvantages',
  10: 'Making Comparisons',
  11: 'Expressing Cause & Effect',
  12: 'Giving & Asking for Advice',
  13: 'Storytelling & Narratives',
  14: 'Discussing Future Plans',
  15: 'Handling Difficult Conversations',
  16: 'Formal & Informal Register',
  17: 'Debating a Topic',
  18: 'Phone & Video Call English',
  19: 'Meeting & Conference Language',
  20: 'Review & Advanced Speaking',
};

function generateDays(completedDays: number, totalDays: number) {
  return Array.from({ length: totalDays }, (_, i) => ({
    id: i + 1,
    status: i < completedDays ? 'completed' as const : i === completedDays ? 'available' as const : 'locked' as const,
  }));
}

function getCompletedIds(): number[] {
  try { return JSON.parse(localStorage.getItem('talky_intermediate_speaking_completed') || '[]'); } catch { return []; }
}

export default function InterSpeakingPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => { setCompletedIds(getCompletedIds()); }, []);

  const completedLocalDays = completedIds.length;
  const days = generateDays(completedLocalDays, SKILL.totalDays);

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.speaking" subtitleKey="modul.daysSubtitle" />

        <motion.div
          className="mx-5 md:mx-0 mb-6 rounded-2xl p-5 relative overflow-hidden"
          style={{ backgroundColor: SKILL.bgColor, border: `1px solid ${SKILL.color}20` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center p-2 shrink-0" style={{ backgroundColor: `${SKILL.color}15` }}>
              <img src={SKILL.icon} alt="" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">{SKILL.label}</h3>
              <p className="text-xs text-[#6B7280]">{completedLocalDays}/{SKILL.totalDays} Pelajaran</p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: SKILL.color }}>
              ðŸŽ“ Intermediate
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: SKILL.color }}
              initial={{ width: 0 }}
              animate={{ width: `${(completedLocalDays / SKILL.totalDays) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{t('modul.daysTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">{t('modul.daysSubtitle')}</p>

          <div className="space-y-3">
            {days.map((day, i) => {
              const isCompleted = day.status === 'completed';
              const isAvailable = day.status === 'available';
              const isLocked = day.status === 'locked';

              return (
                <motion.button
                  key={day.id}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all ${
                    isCompleted ? 'bg-white border border-gray-100' :
                    isAvailable ? 'bg-white border-2 shadow-md cursor-pointer' :
                    'bg-gray-50/80 border border-gray-100 opacity-60 cursor-not-allowed'
                  }`}
                  style={isAvailable ? { borderColor: SKILL.color, boxShadow: `0 4px 16px ${SKILL.color}20` } : {}}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isLocked ? 0.6 : 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                  whileHover={isAvailable ? { scale: 1.01 } : {}}
                  whileTap={isAvailable ? { scale: 0.98 } : {}}
                  onClick={() => { if (!isLocked) navigate(`/modul/english/intermediate/speaking/lesson-${day.id}`); }}
                  disabled={isLocked}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                      isCompleted || isAvailable ? 'text-white' : 'bg-gray-200 text-gray-400'
                    }`}
                    style={isCompleted || isAvailable ? { backgroundColor: SKILL.color } : {}}
                  >
                    {isCompleted ? <Check size={18} strokeWidth={3} /> :
                     isAvailable ? <Play size={16} fill="white" /> :
                     <Lock size={14} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm ${isLocked ? 'text-gray-400' : 'text-[#1A1A2E]'}`}>
                      Lesson {day.id}
                    </p>
                    <p className="text-[12px] text-[#6B7280] truncate">
                      {LESSON_TITLES[day.id] ?? `Speaking Lesson ${day.id}`}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                      isCompleted ? 'bg-[#E8F8F0] text-[#26C76D]' :
                      isAvailable ? 'text-white' :
                      'bg-gray-100 text-gray-400'
                    }`}
                    style={isAvailable ? { backgroundColor: SKILL.color } : {}}
                  >
                    {isCompleted ? t('common.completed') : isAvailable ? t('common.start') : t('common.locked')}
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

