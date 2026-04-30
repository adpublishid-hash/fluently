import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Play, Sparkles } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { useLanguage } from '../../../../../i18n/LanguageContext';

const SKILL = {
  id: 'pronunciation',
  label: 'Pronunciation',
  icon: '/assets/icons/new/17. Learning Method.png',
  color: '#16A085',
  bgColor: '#D1F2EB',
};

const TOTAL_LESSONS = 20;
const STORAGE_KEY = 'talky_intermediate_pronunciation_completed';

const LESSON_TITLES: Record<number, string> = {
  1: 'Stress in Multi-syllable Words',
  2: 'Sentence Stress & Rhythm',
  3: 'Intonation Patterns',
  4: 'Linking Words in Speech',
  5: 'Weak Forms & Contractions',
  6: 'Consonant Clusters',
  7: 'Long & Short Vowel Sounds',
  8: 'The Schwa Sound /ə/',
  9: 'Silent Letters',
  10: 'Minimal Pairs',
  11: 'Th- Sounds: /θ/ vs /ð/',
  12: 'R & L Sounds',
  13: 'V & W Sounds',
  14: 'Wide Intonation for Emphasis',
  15: 'Question Intonation',
  16: 'Connected Speech',
  17: 'Accent Reduction Basics',
  18: 'Pronunciation in Context',
  19: 'Reading Aloud Practice',
  20: 'Review & Advanced Pronunciation',
};

function getCompletedIds(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

export default function InterPronunciationPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => { setCompletedIds(getCompletedIds()); }, []);

  const completedCount = completedIds.length;
  const progressPercent = TOTAL_LESSONS > 0 ? (completedCount / TOTAL_LESSONS) * 100 : 0;
  const lessons = Array.from({ length: TOTAL_LESSONS }, (_, i) => i + 1);

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.pronunciation" subtitleKey="modul.daysSubtitle" />

        <motion.div
          className="mx-5 md:mx-0 mb-6 rounded-2xl p-5 relative overflow-hidden"
          style={{ backgroundColor: SKILL.bgColor, border: `1px solid ${SKILL.color}20` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl p-2 shrink-0" style={{ backgroundColor: `${SKILL.color}15` }}>
              <img src={SKILL.icon} alt="" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">{SKILL.label}</h3>
              <p className="text-xs text-[#6B7280]">
                {completedCount}/{TOTAL_LESSONS} Lessons · Pronunciation Practice
              </p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: SKILL.color }}>
              🎓 Intermediate
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: SKILL.color }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          {completedCount > 0 && (
            <p className="text-[11px] font-semibold mt-1.5" style={{ color: SKILL.color }}>
              {completedCount === TOTAL_LESSONS
                ? '🎉 Semua pelajaran selesai!'
                : `${completedCount} dari ${TOTAL_LESSONS} pelajaran selesai`}
            </p>
          )}
        </motion.div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{t('modul.daysTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">Pilih pelajaran untuk mulai belajar pengucapan</p>

          <div className="space-y-3">
            {lessons.map((id, i) => {
              const done = completedIds.includes(id);
              return (
                <motion.button
                  key={id}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all border-2 shadow-sm hover:shadow-md cursor-pointer"
                  style={{
                    borderColor: done ? '#26C76D' : `${SKILL.color}30`,
                    backgroundColor: done ? '#F0FDF6' : 'white',
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                  whileHover={{ scale: 1.01, borderColor: done ? '#26C76D' : SKILL.color }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/modul/english/intermediate/pronunciation/lesson-${id}`)}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white transition-colors"
                    style={{ backgroundColor: done ? '#26C76D' : SKILL.color }}
                  >
                    {done ? <Check size={18} strokeWidth={3} /> : <Play size={16} fill="white" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-[#1A1A2E]">Lesson {id}</p>
                      {done && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-[#26C76D]">
                          ✓ Selesai
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#6B7280] flex items-center gap-1 mt-0.5 truncate">
                      <Sparkles size={10} /> {LESSON_TITLES[id] ?? `Pronunciation Lesson ${id}`}
                    </p>
                  </div>

                  <span
                    className="text-[10px] font-bold px-3 py-1.5 rounded-full text-white shrink-0"
                    style={{ backgroundColor: done ? '#26C76D' : SKILL.color }}
                  >
                    {done ? 'Ulang' : 'Start'}
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
