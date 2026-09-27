import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Play, Sparkles } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { useLanguage } from '../../../../../i18n/LanguageContext';
import ExtraLessonsList from '../../extra/ExtraLessonsList';

const SKILL = {
  icon: '/assets/icons/new/5. Video Lecture.png',
  color: '#8E44AD',
  bgColor: '#F5EEF8',
};

const listeningLessons = [
  { id: 1,  title: 'Salam & Perkenalan',          subtitle: 'Hello, My name is... How are you?' },
  { id: 2,  title: 'Angka & Tanggal',              subtitle: 'Mendengar angka, usia & tanggal' },
  { id: 3,  title: 'Keluargaku',                   subtitle: 'This is my mom, dad, sister...' },
  { id: 4,  title: 'Di Rumah',                     subtitle: 'Ruangan, perabot & kegiatan rumah' },
  { id: 5,  title: 'Rutinitas Harian',             subtitle: 'I wake up at... I go to work...' },
  { id: 6,  title: 'Makanan & Belanja',            subtitle: 'I would like... How much is...?' },
  { id: 7,  title: 'Bertanya Arah',                subtitle: 'Excuse me, where is...?' },
  { id: 8,  title: 'Cuaca & Waktu',               subtitle: 'What\'s the weather like? What time...?' },
  { id: 9,  title: 'Telepon & Pesan',              subtitle: 'Hello? Can I speak to...?' },
  { id: 10, title: 'Latihan Akhir',                subtitle: 'Review semua percakapan beginner' },
];

const STORAGE_KEY = 'talky_beginner_listening_completed';
function getCompleted(): number[] { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; } }

export default function BeginnerListeningPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  useEffect(() => { setCompletedIds(getCompleted()); }, []);
  const completedCount = completedIds.length;
  const progressPercent = (completedCount / listeningLessons.length) * 100;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.listening" subtitleKey="modul.daysSubtitle" />
        <motion.div className="mx-5 md:mx-0 mb-6 rounded-2xl p-5 relative overflow-hidden" style={{ backgroundColor: SKILL.bgColor, border: `1px solid ${SKILL.color}20` }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center p-2 shrink-0" style={{ backgroundColor: `${SKILL.color}15` }}>
              <img src={SKILL.icon} alt="" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">{t('skill.listening')}</h3>
              <p className="text-xs text-[#6B7280]">{completedCount}/{listeningLessons.length} Lessons · Listening Practice</p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: SKILL.color }}>
              🌱 Beginner
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ backgroundColor: SKILL.color }} initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
          </div>
          {completedCount > 0 && (
            <p className="text-[11px] font-semibold mt-1.5" style={{ color: SKILL.color }}>
              {completedCount === listeningLessons.length ? '🎉 Semua pelajaran selesai!' : `${completedCount} dari ${listeningLessons.length} pelajaran selesai`}
            </p>
          )}
        </motion.div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{t('modul.daysTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">Pilih pelajaran untuk berlatih menyimak</p>
          <div className="space-y-3">
            {listeningLessons.map((lesson, i) => {
              const done = completedIds.includes(lesson.id);
              return (
                <motion.button key={lesson.id} className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all border-2 shadow-sm hover:shadow-md cursor-pointer"
                  style={{ borderColor: done ? '#26C76D' : `${SKILL.color}30`, backgroundColor: done ? '#F0FDF6' : 'white' }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}
                  whileHover={{ scale: 1.01, borderColor: done ? '#26C76D' : SKILL.color }} whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/modul/english/beginner/listening/lesson-${lesson.id}`)}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white" style={{ backgroundColor: done ? '#26C76D' : SKILL.color }}>
                    {done ? <Check size={18} strokeWidth={3} /> : <Play size={16} fill="white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-[#1A1A2E]">Lesson {lesson.id}</p>
                      {done && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-[#26C76D]">✓ Selesai</span>}
                    </div>
                    <p className="text-[12px] text-[#6B7280] truncate">{lesson.title}</p>
                    <span className="text-[10px] text-[#9CA3AF] flex items-center gap-0.5 mt-0.5"><Sparkles size={10} /> {lesson.subtitle}</span>
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1.5 rounded-full text-white shrink-0" style={{ backgroundColor: done ? '#26C76D' : SKILL.color }}>
                    {done ? 'Ulang' : 'Start'}
                  </span>
                </motion.button>
              );
            })}
          </div>
          <ExtraLessonsList level="beginner" skill="listening" color="#8E44AD" />
        </div>
      </div>
    </PageContainer>
  );
}
