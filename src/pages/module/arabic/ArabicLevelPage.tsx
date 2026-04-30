import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from '../../../components/layout/PageContainer';
import { NavCard, PageHeader } from '../../../components/shared/NavComponents';
import { arabicLessonCounts, arabicLevels, arabicSkills, normalizeArabicLevel } from './arabicModuleData';

export default function ArabicLevelPage() {
  const navigate = useNavigate();
  const params = useParams();
  const levelId = normalizeArabicLevel(params.levelId);
  const routeLevelId = params.levelId === 'beginner' ? 'beginner' : levelId;
  const level = arabicLevels[levelId];

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader title={level.title} subtitle={level.subtitle} onBack={() => navigate('/modul')} />

        <div className="px-5 md:px-0 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: level.color }}>
            ع {level.badge}
          </div>
        </div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">Skills</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">Materi diimpor dari AI Kamus Arabic.</p>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {arabicSkills.filter((skill) => arabicLessonCounts[levelId][skill.id] > 0).map((skill, index) => (
              <NavCard
                key={skill.id}
                icon={skill.icon}
                label={skill.label}
                sublabel={`${arabicLessonCounts[levelId][skill.id]} lesson - ${skill.sublabel}`}
                color={skill.color}
                bgColor={skill.bgColor}
                progress={0}
                onClick={() => navigate(`/modul/arabic/${routeLevelId}/${skill.id}`)}
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
            <p className="text-sm font-bold mb-1" style={{ color: level.color }}>Arabic Module</p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Level ini memakai materi Arabic dari AI Kamus dengan wrapper Fluently: progress lesson, tombol selesai, TTS Arabic, latihan cepat, dukungan teks RTL, dan akses ulang untuk review.
            </p>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
}
