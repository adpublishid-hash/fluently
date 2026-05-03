import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Play, Sparkles } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { useLanguage } from '../../../../../i18n/LanguageContext';

const SKILL = {
  id: 'pronunciation',
  labelKey: 'skill.pronunciation' as const,
  icon: '/assets/icons/new/17. Learning Method.png',
  color: '#E83E8C',
  bgColor: '#FDEDEC',
};

const LESSONS = [
  { id: 1, title: 'English Vowel Sounds', focus: 'Vokal dasar dalam kata A2 seperti seat, sit, cup, dan card', outcome: 'Mengenali bunyi vokal umum saat mendengar dan berbicara.' },
  { id: 2, title: 'Short vs Long Vowels', focus: 'Perbedaan ship/sheep, live/leave, full/fool', outcome: 'Mengucapkan pasangan kata yang sering tertukar.' },
  { id: 3, title: 'Word Stress Basics', focus: 'Tekanan suku kata pada kata benda, kerja, dan adjective', outcome: 'Menempatkan stress kata agar terdengar natural.' },
  { id: 4, title: 'Sentence Stress', focus: 'Menekankan kata informasi dalam kalimat pendek', outcome: 'Membuat kalimat lebih mudah dipahami.' },
  { id: 5, title: '-s Endings', focus: 'Bunyi /s/, /z/, dan /iz/ pada plurals dan present simple', outcome: 'Mengucapkan books, bags, watches dengan tepat.' },
  { id: 6, title: '-ed Endings', focus: 'Bunyi /t/, /d/, dan /id/ pada past simple', outcome: 'Mengucapkan worked, played, wanted dengan tepat.' },
  { id: 7, title: 'TH Sounds', focus: 'Voiceless /theta/ dan voiced /dh/ dalam think, this, mother', outcome: 'Melatih artikulasi th yang jelas.' },
  { id: 8, title: 'L and R Sounds', focus: 'Perbedaan light/right, glass/grass, arrive/alive', outcome: 'Mengurangi kesalahan pada bunyi l dan r.' },
  { id: 9, title: 'V, B, P, and F Sounds', focus: 'Konsonan bibir dalam very, berry, fan, pan', outcome: 'Membedakan bunyi yang mirip saat speaking.' },
  { id: 10, title: 'Linking Sounds', focus: 'Menghubungkan kata dalam turn on, an apple, go out', outcome: 'Berbicara lebih lancar dalam frasa sehari-hari.' },
  { id: 11, title: 'Falling Intonation', focus: 'Nada turun untuk pernyataan, jawaban, dan instruksi', outcome: 'Menyampaikan informasi dengan intonasi jelas.' },
  { id: 12, title: 'Question Intonation', focus: 'Nada naik untuk yes/no questions dan nada turun untuk WH questions', outcome: 'Membuat pertanyaan terdengar natural.' },
  { id: 13, title: 'Schwa Sound', focus: 'Bunyi /uh/ lemah dalam about, teacher, banana', outcome: 'Mengucapkan kata umum dengan rhythm bahasa Inggris.' },
  { id: 14, title: 'Rhythm & Chunking', focus: 'Membagi kalimat menjadi kelompok kata pendek', outcome: 'Membaca dialog lebih lancar dan tidak kaku.' },
  { id: 15, title: 'A2 Pronunciation Review', focus: 'Review vowels, endings, stress, linking, dan intonation', outcome: 'Menggabungkan teknik pronunciation dalam percakapan.' },
];

const STORAGE_KEY = 'talky_elementary_pronunciation_completed';

function getCompletedIds(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

export default function PronunciationPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => { setCompletedIds(getCompletedIds()); }, []);

  const completedCount = completedIds.filter((id) => LESSONS.some((lesson) => lesson.id === id)).length;
  const progressPercent = (completedCount / LESSONS.length) * 100;

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
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">{t('skill.pronunciation')}</h3>
              <p className="text-xs text-[#6B7280]">
                {completedCount}/{LESSONS.length} Lessons - A2 Pronunciation Practice
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
          <p className="text-[13px] text-[#6B7280] mb-5">Pilih pelajaran pronunciation A2 untuk speaking yang lebih jelas.</p>

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
                  onClick={() => navigate(`/modul/english/elementary/pronunciation/lesson-${lesson.id}`)}
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
