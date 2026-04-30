import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from '../../../components/layout/PageContainer';
import { NavCard, PageHeader } from '../../../components/shared/NavComponents';
import { japaneseLessonCounts, japaneseLevels, japaneseSkills, normalizeJapaneseLevel } from './japaneseModuleData';

export default function JapaneseLevelPage() {
  const navigate = useNavigate();
  const params = useParams();
  const levelId = normalizeJapaneseLevel(params.levelId);
  const level = japaneseLevels[levelId];

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader title={level.title} subtitle={level.subtitle} onBack={() => navigate('/modul')} />

        <div className="px-5 md:px-0 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: level.color }}>
            JP {level.badge}
          </div>
        </div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">Skills</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">Materi Jepang berbasis JLPT dengan kana, kanji, TTS, quiz, dan progress lesson.</p>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {japaneseSkills.map((skill, index) => (
              <NavCard
                key={skill.id}
                icon={skill.icon}
                label={skill.label}
                sublabel={`${japaneseLessonCounts[levelId][skill.id]} lesson - ${skill.sublabel}`}
                color={skill.color}
                bgColor={skill.bgColor}
                progress={0}
                onClick={() => navigate(`/modul/japanese/${levelId}/${skill.id}`)}
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
            <p className="text-sm font-bold mb-1" style={{ color: level.color }}>Japanese Module</p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Bahasa Jepang memakai standar JLPT: N5, N4, N3, N2, dan N1. Setiap level punya 7 skill dan 20 lesson per skill.
            </p>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
}
