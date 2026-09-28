import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Play, Sparkles } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { useLanguage } from '../../../../../i18n/LanguageContext';
import ExtraLessonsList from '../../extra/ExtraLessonsList';

const SKILL = {
  id: 'grammar',
  labelKey: 'skill.grammar' as const,
  icon: '/assets/icons/new/21. Pencil & Ruler.png',
  color: '#8E44AD',
  bgColor: '#F4ECF7',
};

const grammarLessons = [
  { id: 1,  title: 'Dasar Kalimat',              subtitle: 'Subject, Verb, Object & Tanda Baca' },
  { id: 2,  title: 'To Be (am / is / are)',       subtitle: 'Positif, Negatif & Pertanyaan' },
  { id: 3,  title: 'Kata Ganti & Kepemilikan',    subtitle: 'Subject, Object, Possessive' },
  { id: 4,  title: 'Kata Benda & Artikel',        subtitle: 'Jamak, a/an/the, Countable/Uncountable' },
  { id: 5,  title: 'There is / There are',        subtitle: 'Keberadaan & some/any' },
  { id: 6,  title: 'Simple Present Tense',        subtitle: 'Kebiasaan & Fakta Umum' },
  { id: 7,  title: 'Adverbs of Frequency',        subtitle: 'Always, Usually, Sometimes, Never' },
  { id: 8,  title: 'Negatif & Pertanyaan',        subtitle: "don't/doesn't & do/does" },
  { id: 9,  title: 'Kata Depan (In/On/At)',       subtitle: 'Waktu, Tempat & Arah' },
  { id: 10, title: 'Can / Cannot',                subtitle: 'Kemampuan, Izin & Kemungkinan' },
  { id: 11, title: 'Like / Want / Have',          subtitle: 'Preferensi & Kepemilikan' },
  { id: 12, title: 'Simple Past',                 subtitle: 'Beraturan, Tidak Beraturan & was/were' },
  { id: 13, title: 'Imperatives & Requests',      subtitle: 'Perintah, Instruksi & Permintaan Sopan' },
  { id: 14, title: 'Ulasan & Penilaian',          subtitle: 'Tinjauan Keseluruhan Materi' },
];

const totalLessons = grammarLessons.length;
const STORAGE_KEY = 'talky_beginner_grammar_completed';

function getCompletedIds(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

export default function BeginnerGrammarPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => {
    setCompletedIds(getCompletedIds());
  }, []);

  const completedCount = completedIds.length;
  const progressPercent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.grammar" subtitleKey="modul.daysSubtitle" />

        {/* ── Skill Hero Card ─────────────── */}
        <motion.div
          className="mx-5 md:mx-0 mb-6 rounded-2xl p-5 relative overflow-hidden"
          style={{ backgroundColor: SKILL.bgColor, border: `1px solid ${SKILL.color}20` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl p-2 shrink-0"
              style={{ backgroundColor: `${SKILL.color}15` }}
            >
              {SKILL.icon.startsWith('/assets/') ? (
                <img src={SKILL.icon} alt="" className="w-full h-full object-contain" />
              ) : (
                SKILL.icon
              )}
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">{t('skill.grammar')}</h3>
              <p className="text-xs text-[#6B7280]">
                {completedCount}/{totalLessons} Lessons · Grammar Practice
              </p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-[#26C76D]">
              🌱 Beginner
            </div>
          </div>
          {/* Progress bar */}
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
              {completedCount === totalLessons
                ? '🎉 Semua pelajaran selesai!'
                : `${completedCount} dari ${totalLessons} pelajaran selesai`}
            </p>
          )}
        </motion.div>

        {/* ── Learning Path ───────────────── */}
        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{t('modul.daysTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">
            Pilih pelajaran untuk mulai belajar tata bahasa
          </p>

          <div className="space-y-3">
            {grammarLessons.map((lesson, i) => {
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
                  onClick={() => navigate(`/modul/english/beginner/grammar/lesson-${lesson.id}`)}
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
          <ExtraLessonsList level="beginner" skill="grammar" color="#8E44AD" />
        </div>
      </div>
    </PageContainer>
  );
}
