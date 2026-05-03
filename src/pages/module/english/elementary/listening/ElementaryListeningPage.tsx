import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Play, Sparkles } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { getCompletedListeningLessons } from './listeningUtils';

const COLOR = '#0D9488'; // Teal
const TOTAL = 10;

const LESSONS = [
  { id: 1, title: 'Tentang Dirimu', subtitle: 'Hobi, minat & info personal' },
  { id: 2, title: 'Di Tempat Kerja', subtitle: 'Peran kerja & percakapan kantor' },
  { id: 3, title: 'Belanja & Layanan', subtitle: 'Toko, harga & keluhan' },
  { id: 4, title: 'Lingkungan Sekitar', subtitle: 'Fasilitas umum & arah' },
  { id: 5, title: 'Kesehatan & Dokter', subtitle: 'Gejala & janji temu medis' },
  { id: 6, title: 'Perjalanan & Transport', subtitle: 'Bandara, kereta & booking' },
  { id: 7, title: 'Makan di Luar', subtitle: 'Menu, pesanan & preferensi' },
  { id: 8, title: 'Olahraga & Waktu Luang', subtitle: 'Aktivitas & rencana' },
  { id: 9, title: 'Pengumuman & Pesan', subtitle: 'PA system, voicemail & notisi' },
  { id: 10, title: 'Latihan Akhir', subtitle: 'Review semua topik A2' },
];

export default function ElementaryListeningPage() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    setCompleted(getCompletedListeningLessons());
    const onStorage = () => setCompleted(getCompletedListeningLessons());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const completedCount = completed.length;
  const progress = Math.round((completedCount / TOTAL) * 100);

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.listening" subtitleKey="modul.daysSubtitle" />

        {/* Progress Card */}
        <motion.div
          className="mx-5 md:mx-0 mb-6 rounded-2xl p-5 relative overflow-hidden"
          style={{ backgroundColor: '#F0FDFA', border: `1px solid ${COLOR}20` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Sparkles size={80} color={COLOR} />
          </div>
          <div className="flex items-center gap-3 mb-3 relative z-10">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl p-2 shrink-0 bg-teal-100/50">
              <span style={{ fontSize: 28, filter: 'drop-shadow(0px 2px 4px rgba(13,148,136,0.3))' }}>🎧</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">Listening</h3>
              <p className="text-xs text-[#6B7280]">{completedCount}/{TOTAL} pelajaran selesai</p>
            </div>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-teal-500 shadow-sm shadow-sky-500/20">
              🪴 Elementary
            </div>
          </div>
          <div className="flex items-center gap-2 relative z-10">
            <div className="flex-1 h-2 bg-white/80 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full rounded-full bg-teal-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <span className="text-xs font-bold shrink-0 text-teal-700">{progress}%</span>
          </div>
        </motion.div>

        {/* Lesson List */}
        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">
            {completedCount > 0 ? `${completedCount} dari ${TOTAL} pelajaran selesai` : `${TOTAL} Lessons`}
          </h2>
          <p className="text-[13px] text-[#6B7280] mb-5">Pahami dialog dan instruksi bahasa Inggris</p>

          <div className="space-y-3">
            {LESSONS.map((lesson, i) => {
              const isDone = completed.includes(lesson.id);

              return (
                <motion.button
                  key={lesson.id}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all ${
                    isDone
                      ? 'bg-[#F0FDF4] border border-[#BBF7D0]'
                      : 'bg-white border-2 shadow-sm cursor-pointer hover:shadow-md'
                  }`}
                  style={!isDone ? { borderColor: COLOR, boxShadow: `0 4px 12px ${COLOR}15` } : {}}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/modul/english/elementary/listening/lesson-${lesson.id}`)}
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white shadow-sm"
                    style={{ backgroundColor: isDone ? '#26C76D' : COLOR }}
                  >
                    {isDone ? <Check size={18} strokeWidth={3} /> : <Play size={16} fill="white" className="ml-1" />}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-[#1A1A2E]">Lesson {lesson.id}: {lesson.title}</p>
                    <p className="text-[12px] text-[#6B7280] truncate mt-0.5">{lesson.subtitle}</p>
                  </div>

                  {/* Badge */}
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 uppercase tracking-widest ${
                    isDone ? 'bg-[#E8F8F0] text-[#26C76D]' : 'text-white'
                  }`} style={!isDone ? { backgroundColor: COLOR } : {}}>
                    {isDone ? '✓ Selesai' : 'Mulai'}
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
