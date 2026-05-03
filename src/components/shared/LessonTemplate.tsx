import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Rocket, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import PageContainer from '../layout/PageContainer';

interface LessonTemplateProps {
  lessonNumber: number;
  skill: string;
  level: string;
  language?: string;
}

export default function LessonTemplate({ lessonNumber, skill, level }: LessonTemplateProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const skillColors: Record<string, string> = {
    speaking: '#E74C3C', listening: '#3498DB', reading: '#7EC3E6',
    writing: '#F39C12', grammar: '#8E44AD', vocabulary: '#2980B9',
  };
  const color = skillColors[skill] || '#6366F1';

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center relative">
        <motion.button
          className="absolute top-6 left-5 md:left-0 w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm border border-gray-100"
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} className="text-[#1A1A2E]" />
        </motion.button>

        {/* Lesson badge */}
        <motion.div
          className="mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-4 rounded-full border-2 border-dashed opacity-20"
              style={{ borderColor: color }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            />
            <div
              className="w-28 h-28 rounded-3xl flex flex-col items-center justify-center shadow-2xl"
              style={{ backgroundColor: color, boxShadow: `0 16px 48px ${color}40` }}
            >
              <BookOpen size={32} className="text-white mb-1" />
              <span className="text-white text-2xl font-black">{lessonNumber}</span>
            </div>
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ scale: [1, 1.3, 1], rotate: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Sparkles size={18} className="text-[#F59E0B]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-2xl font-black text-[#1A1A2E] mb-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t('modul.dayLabel')} {lessonNumber}
        </motion.h1>
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-white mb-3"
          style={{ backgroundColor: color }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <span className="capitalize">{level}</span> • <span className="capitalize">{skill}</span>
        </motion.div>
        <motion.p
          className="text-[15px] text-[#6B7280] font-medium max-w-xs leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {t('common.comingSoonDesc')}
        </motion.p>

        {/* Progress animation */}
        <motion.div
          className="mt-8 w-48"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2 justify-center mb-3">
            <Rocket size={16} style={{ color }} />
            <p className="text-[12px] font-bold" style={{ color }}>{t('common.comingSoon')}</p>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
              animate={{ width: ['20%', '65%', '45%', '80%', '60%'] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        <motion.button
          className="mt-8 px-8 py-3.5 rounded-2xl bg-[#1A1A2E] text-white font-bold text-sm cursor-pointer hover:bg-[#2A2A4E] transition-colors"
          style={{ boxShadow: '0 6px 20px rgba(26,26,46,0.2)' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {t('common.back')}
        </motion.button>
      </div>
    </PageContainer>
  );
}
