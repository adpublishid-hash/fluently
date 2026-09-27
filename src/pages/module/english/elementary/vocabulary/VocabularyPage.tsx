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
  labelKey: 'skill.vocabulary' as const,
  icon: '/assets/icons/new/16. Language Learning.png',
  color: '#2980B9',
  bgColor: '#D6EAF8',
};

const LESSONS = [
  { id: 1, title: 'Daily Routine & Time', focus: 'Wake up, commute, weekdays, time expressions', outcome: 'Menceritakan rutinitas harian dengan urutan waktu.' },
  { id: 2, title: 'Food, Drinks & Ordering', focus: 'Menu items, taste words, portions, polite requests', outcome: 'Memesan makanan dan menjelaskan preferensi.' },
  { id: 3, title: 'Home, Rooms & Furniture', focus: 'Rooms, furniture, appliances, household objects', outcome: 'Mendeskripsikan rumah atau apartemen sederhana.' },
  { id: 4, title: 'City Places & Directions', focus: 'Bank, pharmacy, station, turn left, go straight', outcome: 'Meminta dan memberi arah di kota.' },
  { id: 5, title: 'Shopping, Prices & Clothes', focus: 'Sizes, colors, prices, sale, try on, receipt', outcome: 'Berbelanja pakaian dan bertanya harga.' },
  { id: 6, title: 'Health, Body & Symptoms', focus: 'Body parts, headache, cough, medicine, appointment', outcome: 'Menjelaskan keluhan kesehatan dasar.' },
  { id: 7, title: 'Travel & Transportation', focus: 'Tickets, airport, bus stop, platform, luggage', outcome: 'Mengatur perjalanan pendek dengan transportasi umum.' },
  { id: 8, title: 'Work, Jobs & Study', focus: 'Jobs, workplace verbs, subjects, assignments', outcome: 'Membicarakan pekerjaan, sekolah, dan tugas.' },
  { id: 9, title: 'Hobbies, Sports & Free Time', focus: 'Free-time verbs, sports equipment, invitations', outcome: 'Mengajak teman dan membahas hobi.' },
  { id: 10, title: 'Weather, Seasons & Nature', focus: 'Sunny, cloudy, rainy, temperature, seasons', outcome: 'Membicarakan cuaca dan rencana berdasarkan musim.' },
  { id: 11, title: 'Family & Describing People', focus: 'Relatives, appearance, personality adjectives', outcome: 'Memperkenalkan keluarga dan mendeskripsikan orang.' },
  { id: 12, title: 'Feelings, Opinions & Preferences', focus: 'Happy, worried, interested, I think, I prefer', outcome: 'Menyampaikan perasaan dan opini sederhana.' },
  { id: 13, title: 'Technology & Communication', focus: 'Phone, message, app, password, online actions', outcome: 'Berbicara tentang komunikasi digital sehari-hari.' },
  { id: 14, title: 'Money, Services & Appointments', focus: 'Cash, card, bill, repair, reservation, schedule', outcome: 'Mengurus layanan dan membuat janji temu.' },
  { id: 15, title: 'A2 Vocabulary Review', focus: 'Review kosakata inti untuk situasi A2', outcome: 'Menggunakan kosakata lintas topik dalam dialog.' },
];

const STORAGE_KEY = 'talky_elementary_vocabulary_completed';

function getCompletedIds(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

export default function VocabularyPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => { setCompletedIds(getCompletedIds()); }, []);

  const completedCount = completedIds.filter((id) => LESSONS.some((lesson) => lesson.id === id)).length;
  const progressPercent = (completedCount / LESSONS.length) * 100;

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
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl p-2 shrink-0" style={{ backgroundColor: `${SKILL.color}15` }}>
              <img src={SKILL.icon} alt="" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">{t('skill.vocabulary')}</h3>
              <p className="text-xs text-[#6B7280]">
                {completedCount}/{LESSONS.length} Lessons - A2 Vocabulary Practice
              </p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-[#3498DB]">
              Elementary
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
              {completedCount === LESSONS.length
                ? 'Semua pelajaran selesai!'
                : `${completedCount} dari ${LESSONS.length} pelajaran selesai`}
            </p>
          )}
        </motion.div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{t('modul.daysTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">Pilih pelajaran kosakata A2 untuk situasi sehari-hari.</p>

          <div className="space-y-3">
            {LESSONS.map((lesson, i) => {
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
                  onClick={() => navigate(`/modul/english/elementary/vocabulary/lesson-${lesson.id}`)}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white transition-colors"
                    style={{ backgroundColor: done ? '#26C76D' : SKILL.color }}
                  >
                    {done ? <Check size={18} strokeWidth={3} /> : <Play size={16} fill="white" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-sm text-[#1A1A2E]">Lesson {lesson.id}: {lesson.title}</p>
                      {done && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-[#26C76D]">
                          Selesai
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#6B7280] flex items-center gap-1 mt-1">
                      <Sparkles size={10} /> {lesson.focus}
                    </p>
                    <p className="text-[11px] text-[#8A94A6] mt-1">{lesson.outcome}</p>
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
          <ExtraLessonsList level="elementary" skill="vocabulary" color="#2980B9" />
        </div>
      </div>
    </PageContainer>
  );
}
