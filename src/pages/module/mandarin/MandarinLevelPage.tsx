import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from '../../../components/layout/PageContainer';
import { NavCard, PageHeader } from '../../../components/shared/NavComponents';
import { mandarinLessonCounts, mandarinLevels, mandarinSkills, normalizeMandarinLevel } from './mandarinModuleData';

export default function MandarinLevelPage() {
  const navigate = useNavigate();
  const params = useParams();
  const levelId = normalizeMandarinLevel(params.levelId);
  const level = mandarinLevels[levelId];

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader title={level.title} subtitle={level.subtitle} onBack={() => navigate('/modul')} />

        <div className="px-5 md:px-0 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: level.color }}>
            中 {level.badge}
          </div>
        </div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">Skills</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">Materi Mandarin berbasis HSK dengan TTS, Hanzi, pinyin, latihan, dan progress lesson.</p>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {mandarinSkills.map((skill, index) => (
              <NavCard
                key={skill.id}
                icon={skill.icon}
                label={skill.label}
                sublabel={`${mandarinLessonCounts[levelId][skill.id]} lesson - ${skill.sublabel}`}
                color={skill.color}
                bgColor={skill.bgColor}
                progress={0}
                onClick={() => navigate(`/modul/mandarin/${levelId}/${skill.id}`)}
                delay={0.05 * index}
              />
            ))}
          </div>

          <motion.div
            className="mt-6 rounded-2xl p-5 border"
            style={{ backgroundColor: level.bgColor, borderColor: `${level.color}30` }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm font-bold mb-1" style={{ color: level.color }}>Mandarin Module</p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Jalur Mandarin memakai standar HSK 1-6. Setiap lesson menampilkan Hanzi, pinyin, arti, contoh TTS Mandarin, quiz, dan tugas produksi.
            </p>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
}
