import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Play, Sparkles } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { useLanguage } from '../../../../../i18n/LanguageContext';

const SKILL = {
  id: 'grammar',
  labelKey: 'skill.grammar' as const,
  icon: '/assets/icons/new/21. Pencil & Ruler.png',
  color: '#8E44AD',
  bgColor: '#F4ECF7',
};

const LESSONS = [
  { id: 1, title: 'To Be & Subject Pronouns', focus: 'am, is, are dengan I, you, he, she, it, we, they', outcome: 'Membuat kalimat identitas dan deskripsi sederhana.' },
  { id: 2, title: 'Present Simple', focus: 'Rutinitas, fakta umum, do/does, dan verb + s', outcome: 'Menjelaskan kebiasaan harian dengan benar.' },
  { id: 3, title: 'Present Continuous', focus: 'am/is/are + verb-ing untuk kegiatan yang sedang terjadi', outcome: 'Membedakan kegiatan sekarang dan kebiasaan.' },
  { id: 4, title: 'Past Simple', focus: 'Regular verbs, irregular verbs, did, dan was/were', outcome: 'Menceritakan pengalaman singkat di masa lalu.' },
  { id: 5, title: 'Future Plans', focus: 'be going to, will, dan ekspresi rencana', outcome: 'Menulis rencana akhir pekan atau tujuan pribadi.' },
  { id: 6, title: 'Countable & Uncountable Nouns', focus: 'a, an, some, any, much, many, dan food nouns', outcome: 'Memesan makanan atau membuat daftar belanja.' },
  { id: 7, title: 'Comparatives & Superlatives', focus: 'bigger, more interesting, the best, dan than', outcome: 'Membandingkan tempat, benda, dan pilihan.' },
  { id: 8, title: 'Modals: Can, Must, Should', focus: 'Kemampuan, aturan, kewajiban, dan saran', outcome: 'Memberi saran serta menjelaskan aturan sederhana.' },
  { id: 9, title: 'Prepositions of Time & Place', focus: 'in, on, at, next to, between, behind, dan near', outcome: 'Menjelaskan waktu acara dan posisi lokasi.' },
  { id: 10, title: 'Adverbs of Frequency', focus: 'always, usually, often, sometimes, rarely, never', outcome: 'Menjelaskan seberapa sering aktivitas dilakukan.' },
  { id: 11, title: 'There Is / There Are', focus: 'Deskripsi ruangan, tempat umum, dan quantifiers', outcome: 'Mendeskripsikan rumah, kelas, atau kota.' },
  { id: 12, title: 'Question Forms', focus: 'WH questions, yes/no questions, do/does/did', outcome: 'Menyusun pertanyaan untuk percakapan A2.' },
  { id: 13, title: 'Possessives & Object Pronouns', focus: 'my, your, his, her, our, their, me, him, them', outcome: 'Menjelaskan kepemilikan dan mengganti objek kalimat.' },
  { id: 14, title: 'Connectors', focus: 'and, but, because, so, then untuk kalimat majemuk', outcome: 'Menggabungkan ide menjadi paragraf pendek.' },
  { id: 15, title: 'A2 Grammar Review', focus: 'Review tenses, questions, modals, dan connectors', outcome: 'Menyelesaikan latihan campuran level Elementary.' },
];

const STORAGE_KEY = 'talky_elementary_grammar_completed';

function getCompletedIds(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

export default function GrammarPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => { setCompletedIds(getCompletedIds()); }, []);

  const completedCount = completedIds.filter((id) => LESSONS.some((lesson) => lesson.id === id)).length;
  const progressPercent = (completedCount / LESSONS.length) * 100;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.grammar" subtitleKey="modul.daysSubtitle" />

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
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">{t('skill.grammar')}</h3>
              <p className="text-xs text-[#6B7280]">
                {completedCount}/{LESSONS.length} Lessons - A2 Grammar Practice
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
          <p className="text-[13px] text-[#6B7280] mb-5">Pilih pelajaran grammar A2 dari struktur dasar sampai review.</p>

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
                  onClick={() => navigate(`/modul/english/elementary/grammar/lesson-${lesson.id}`)}
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
        </div>
      </div>
    </PageContainer>
  );
}
