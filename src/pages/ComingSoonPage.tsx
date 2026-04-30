import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import PageContainer from '../components/layout/PageContainer';

export default function ComingSoonPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        {/* Back button */}
        <motion.button
          className="absolute top-6 left-5 md:left-0 w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm border border-gray-100"
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} className="text-[#1A1A2E]" />
        </motion.button>

        {/* Animated illustration */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        >
          {/* Pulsing ring */}
          <motion.div
            className="absolute -inset-6 rounded-full border-2 border-dashed"
            style={{ borderColor: 'rgba(38, 199, 109, 0.2)' }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          />
          <motion.div
            className="absolute -inset-12 rounded-full border border-dashed"
            style={{ borderColor: 'rgba(99, 102, 241, 0.1)' }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          />

          {/* Main icon */}
          <div className="w-32 h-32 bg-gradient-to-br from-[#4FA3D1] to-[#1E6F9F] rounded-3xl flex items-center justify-center shadow-2xl relative"
            style={{ boxShadow: '0 16px 48px rgba(38, 199, 109, 0.3)' }}
          >
            <Rocket size={56} className="text-white" />
            {/* Sparkle accents */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ scale: [1, 1.3, 1], rotate: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Sparkles size={20} className="text-[#F59E0B]" />
            </motion.div>
            <motion.div
              className="absolute -bottom-1 -left-3"
              animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
            >
              <Sparkles size={14} className="text-[#6366F1]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.h1
          className="text-3xl font-black text-[#1A1A2E] mb-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t('common.comingSoon')}
        </motion.h1>
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
          className="mt-10 w-48"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#4FA3D1] via-[#2F86B5] to-[#6366F1]"
              animate={{ width: ['20%', '65%', '45%', '80%', '60%'] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            />
          </div>
          <p className="text-[11px] text-[#9CA3AF] font-semibold mt-2">Building something amazing...</p>
        </motion.div>

        {/* Back button */}
        <motion.button
          className="mt-10 px-8 py-3.5 rounded-2xl bg-[#1A1A2E] text-white font-bold text-sm cursor-pointer hover:bg-[#2A2A4E] transition-colors"
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
