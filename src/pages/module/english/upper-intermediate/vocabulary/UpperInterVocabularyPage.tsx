import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Play } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { useLanguage } from '../../../../../i18n/LanguageContext';

const SKILL = {
  label: 'Vocabulary',
  icon: '/assets/icons/new/16. Language Learning.png',
  color: '#117A65',
  bgColor: '#D5F5E3',
  totalDays: 20,
};

const LESSON_TITLES: Record<number, string> = {
  1: 'Academic Research',
  2: 'Business & Finance',
  3: 'Environment & Sustainability',
  4: 'Technology & Innovation',
  5: 'Health & Medicine',
  6: 'Politics & Society',
  7: 'Arts & Culture',
  8: 'Philosophy & Ethics',
  9: 'Science & Discovery',
  10: 'Media & Communication',
  11: 'Law & Justice',
  12: 'Psychology & Behavior',
  13: 'Travel & Globalization',
  14: 'Urban Life & Infrastructure',
  15: 'Education Systems',
  16: 'Food Industry & Nutrition',
  17: 'Sports & Performance',
  18: 'Relationships & Society',
  19: 'Literature & Language',
  20: 'Future & AI Technology',
};

export default function UpperInterVocabularyPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const _completed: number[] = (() => {
    try { return JSON.parse(localStorage.getItem('talky_upper_intermediate_vocabulary_completed') || '[]'); } catch { return []; }
  })();
  const completedSet = new Set(_completed);
  const completedCount = completedSet.size;


  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.vocabulary" subtitleKey="modul.daysSubtitle" />

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
              <p className="text-xs text-[#6B7280]">{completedCount}/{SKILL.totalDays} Pelajaran</p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: SKILL.color }}>
              🏆 Upper-Intermediate
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: SKILL.color }}
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / SKILL.totalDays) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{t('modul.daysTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">{t('modul.daysSubtitle')}</p>
          <div className="space-y-3">
            {Array.from({ length: SKILL.totalDays }, (_, i) => i + 1).map((id, i) => {
              const isCompleted = completedSet.has(id);
              return (
                <motion.button
                  key={id}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all bg-white border-2 shadow-sm cursor-pointer hover:shadow-md`}
                  style={{ borderColor: isCompleted ? '#26C76D' : SKILL.color, boxShadow: `0 2px 8px ${SKILL.color}15` }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/modul/english/upper-intermediate/vocabulary/lesson-${id}`)}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white"
                    style={{ backgroundColor: isCompleted ? '#26C76D' : SKILL.color }}
                  >
                    {isCompleted ? <Check size={18} strokeWidth={3} /> : <Play size={16} fill="white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-[#1A1A2E]">
                      Lesson {id}
                    </p>
                    <p className="text-[12px] text-[#6B7280] truncate">{LESSON_TITLES[id] || `Kosakata B2 · ${id}`}</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                      isCompleted ? 'bg-[#E8F8F0] text-[#26C76D]' : 'text-white'
                    }`}
                    style={!isCompleted ? { backgroundColor: SKILL.color } : {}}
                  >
                    {isCompleted ? t('common.completed') : t('common.start')}
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

