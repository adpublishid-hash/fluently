import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Play, Sparkles } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { useLanguage } from '../../../../../i18n/LanguageContext';
import ExtraLessonsList from '../../extra/ExtraLessonsList';

const SKILL = {
  id: 'vocabulary',
  icon: '/assets/icons/new/16. Language Learning.png',
  color: '#3498DB',
  bgColor: '#EBF5FB',
};

const vocabLessons = [
  { id: 1,  title: 'Greetings & Introductions',    subtitle: 'Hello, Hi, How are you?' },
  { id: 2,  title: 'Numbers & Counting',            subtitle: 'One, Two, Three...' },
  { id: 3,  title: 'Colors & Shapes',               subtitle: 'Red, Blue, Circle, Square' },
  { id: 4,  title: 'Family Members',                subtitle: 'Mother, Father, Brother, Sister' },
  { id: 5,  title: 'Food & Drinks',                 subtitle: 'Apple, Water, Rice, Coffee' },
  { id: 6,  title: 'Body Parts',                    subtitle: 'Head, Eyes, Hands, Feet' },
  { id: 7,  title: 'Days & Months',                 subtitle: 'Monday, January, Today, Yesterday' },
  { id: 8,  title: 'Common Verbs',                  subtitle: 'Go, Eat, Sleep, Work, Play' },
  { id: 9,  title: 'Adjectives',                    subtitle: 'Big, Small, Happy, Beautiful' },
  { id: 10, title: 'Places & Locations',            subtitle: 'School, Hospital, Market, Home' },
  { id: 11, title: 'Transportation',                subtitle: 'Bus, Car, Train, Airplane' },
];

const TOTAL = vocabLessons.length;
const STORAGE_KEY = 'talky_beginner_vocabulary_completed';

function getCompletedIds(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

export default function VocabularyPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => {
    setCompletedIds(getCompletedIds());
  }, []);

  const completedCount = completedIds.length;
  const progressPercent = TOTAL > 0 ? (completedCount / TOTAL) * 100 : 0;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.vocabulary" subtitleKey="modul.daysSubtitle" />

        {/* ── Hero Card ─────────── */}
        <motion.div
          className="mx-5 md:mx-0 mb-6 rounded-2xl p-5 relative overflow-hidden"
          style={{ backgroundColor: SKILL.bgColor, border: `1px solid ${SKILL.color}20` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center p-2 shrink-0"
              style={{ backgroundColor: `${SKILL.color}15` }}
            >
              <img src={SKILL.icon} alt="" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">{t('skill.vocabulary')}</h3>
              <p className="text-xs text-[#6B7280]">{completedCount}/{TOTAL} Lessons · Vocabulary</p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-[#26C76D]">
              🌱 Beginner
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
              {completedCount === TOTAL
                ? '🎉 Semua pelajaran selesai!'
                : `${completedCount} dari ${TOTAL} pelajaran selesai`}
            </p>
          )}
        </motion.div>

        {/* ── Lesson List ───────── */}
        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{t('modul.daysTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">Pilih pelajaran untuk mulai belajar kosakata</p>

          <div className="space-y-3">
            {vocabLessons.map((lesson, i) => {
              const done = completedIds.includes(lesson.id);
              return (
                <motion.button
                  key={lesson.id}
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
                  onClick={() => navigate(`/modul/english/beginner/vocabulary/lesson-${lesson.id}`)}
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white transition-colors"
                    style={{ backgroundColor: done ? '#26C76D' : SKILL.color }}
                  >
                    {done ? <Check size={18} strokeWidth={3} /> : <Play size={16} fill="white" />}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-[#1A1A2E]">Lesson {lesson.id}</p>
                      {done && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-[#26C76D]">
                          ✓ Selesai
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#6B7280] truncate">{lesson.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-[#9CA3AF] flex items-center gap-0.5">
                        <Sparkles size={10} /> {lesson.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Badge */}
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
          <ExtraLessonsList level="beginner" skill="vocabulary" color="#3498DB" />
        </div>
      </div>
    </PageContainer>
  );
}
