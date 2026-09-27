import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Play, Sparkles } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import ExtraLessonsList from '../../extra/ExtraLessonsList';

const COLOR = '#7C3AED';
const TOTAL = 10;
const STORAGE_KEY = 'talky_beginner_pronunciation_completed';

const LESSONS = [
  { id: 1,  title: 'Alfabet & Bunyi',          subtitle: 'A-Z, Vokal vs Konsonan, Phonics' },
  { id: 2,  title: 'Bunyi Vokal',               subtitle: 'Short & Long vowels, A E I O U' },
  { id: 3,  title: 'Bunyi Konsonan',            subtitle: 'Cluster & Silent letters' },
  { id: 4,  title: 'Diftong & Gliding',         subtitle: 'ai, ou, oi — bunyi ganda' },
  { id: 5,  title: 'Kata Berirama (Rhyming)',   subtitle: 'cat-bat, day-say, night-light' },
  { id: 6,  title: 'Tekanan Kata (Stress)',      subtitle: 'Syllable stress, PREsent vs preSENT' },
  { id: 7,  title: 'Intonasi & Nada',           subtitle: 'Rising & falling intonation, questions' },
  { id: 8,  title: 'Bunyi Th, R, L, W',         subtitle: 'Difficult sounds for Indonesians' },
  { id: 9,  title: 'Pengucapan Angka & Tanggal', subtitle: 'Numbers, dates, ordinals' },
  { id: 10, title: 'Percakapan & Fluency',      subtitle: 'Connected speech, natural rhythm' },
];

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

export default function PronunciationPage() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    setCompleted(getCompleted());
    const onStorage = () => setCompleted(getCompleted());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const completedCount = completed.length;
  const progress = Math.round((completedCount / TOTAL) * 100);

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.pronunciation" subtitleKey="modul.daysSubtitle" />

        {/* Progress Card */}
        <motion.div
          className="mx-5 md:mx-0 mb-6 rounded-2xl p-5 relative overflow-hidden"
          style={{ backgroundColor: '#F5F3FF', border: `1px solid ${COLOR}20` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Sparkles size={80} color={COLOR} />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl p-2 shrink-0" style={{ backgroundColor: `${COLOR}15` }}>
              <img src="/assets/icons/new/17. Learning Method.png" alt="" className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">Pronunciation</h3>
              <p className="text-xs text-[#6B7280]">{completedCount}/{TOTAL} pelajaran selesai</p>
            </div>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: COLOR }}>
              🌱 Beginner
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-white/60 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: COLOR }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <span className="text-xs font-bold shrink-0" style={{ color: COLOR }}>{progress}%</span>
          </div>
        </motion.div>

        {/* Lesson List */}
        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">
            {completedCount > 0 ? `${completedCount} dari ${TOTAL} pelajaran selesai` : `${TOTAL} Lessons`}
          </h2>
          <p className="text-[13px] text-[#6B7280] mb-5">Pelajari pengucapan bahasa Inggris dengan benar</p>

          <div className="space-y-3">
            {LESSONS.map((lesson, i) => {
              const isDone = completed.includes(lesson.id);

              return (
                <motion.button
                  key={lesson.id}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all ${
                    isDone
                      ? 'bg-[#F0FDF4] border border-[#BBF7D0]'
                      : 'bg-white border-2 shadow-md cursor-pointer'
                  }`}
                  style={!isDone ? { borderColor: COLOR, boxShadow: `0 4px 16px ${COLOR}20` } : {}}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/modul/english/beginner/pronunciation/lesson-${lesson.id}`)}
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white"
                    style={{ backgroundColor: isDone ? '#26C76D' : COLOR }}
                  >
                    {isDone ? <Check size={18} strokeWidth={3} /> : <Play size={16} fill="white" />}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-[#1A1A2E]">{lesson.title}</p>
                    <p className="text-[12px] text-[#6B7280] truncate">{lesson.subtitle}</p>
                  </div>

                  {/* Badge */}
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full shrink-0 ${
                    isDone ? 'bg-[#E8F8F0] text-[#26C76D]' : 'text-white'
                  }`} style={!isDone ? { backgroundColor: COLOR } : {}}>
                    {isDone ? '✓ Selesai' : 'Mulai'}
                  </span>
                </motion.button>
              );
            })}
          </div>
          <ExtraLessonsList level="beginner" skill="pronunciation" color="#F97316" />
        </div>
      </div>
    </PageContainer>
  );
}
