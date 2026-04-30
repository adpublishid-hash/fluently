// @ts-nocheck
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Play, Briefcase, Home, Users, ChevronRight, Bell, Lock, Eye, X } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { mockUser } from '../../data/mockData';
import { useAuth } from '../../auth/AuthContext';

type CategoryId = 'work' | 'dailyLife' | 'family';

/* ── Stagger helpers ── */
const stagger = {
  container: { animate: { transition: { staggerChildren: 0.06 } } },
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
};

const cardHover = { y: -4, transition: { type: 'spring', stiffness: 400, damping: 25 } };
const cardTap = { scale: 0.97 };
const font = (w: number) => ({ fontFamily: "'DM Sans', sans-serif", fontWeight: w } as const);

export default function ModulPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<CategoryId>('work');
  const [showLevelPopup, setShowLevelPopup] = useState(false);
  const isArabic = user?.persona?.targetLanguage === 'Arabic';
  const isMandarin = user?.persona?.targetLanguage === 'Mandarin';
  const isJapanese = user?.persona?.targetLanguage === 'Japanese';

  const categories = [
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'dailyLife', label: 'Daily Life', icon: Home },
    { id: 'family', label: 'Family / Friends', icon: Users },
  ];

  const englishLevelCards = [
    {
      title: 'Beginner',      cefr: 'A1', level: 'BEGINNER',
      bg: ['#EAF7FC','#D7EEF9','#F3FBFE'], accent: '#4FA3D1', textColor: '#1C6F95',
      icon: '/assets/icons/new/19. Laptop.png',
      route: '/modul/english/beginner', locked: false, progress: 45,
      desc: 'Fondasi dasar',
    },
    {
      title: 'Elementary',    cefr: 'A2', level: 'ELEMENTARY',
      bg: ['#E8FFF3','#D1FAE5','#ECFDF5'], accent: '#10B981', textColor: '#065F46',
      icon: '/assets/icons/new/1. Creative Learning.png',
      route: '/modul/english/elementary', locked: false, progress: 30,
      desc: 'Bahasa sehari-hari',
    },
    {
      title: 'Intermediate',  cefr: 'B1', level: 'INTERMEDIATE',
      bg: ['#EEF2FF','#E0E7FF','#EDE9FE'], accent: '#6366F1', textColor: '#3730A3',
      icon: '/assets/icons/new/4. E-Library.png',
      route: '/modul/english/intermediate', locked: false, progress: 10,
      desc: 'Mandiri dalam topik umum',
    },
    {
      title: 'Upper-Inter.',  cefr: 'B2', level: 'UPPER-INT',
      bg: ['#EFF6FF','#DBEAFE','#E0F2FE'], accent: '#3B82F6', textColor: '#1E40AF',
      icon: '/assets/icons/new/20. Completion Certificate.png',
      route: '/modul/english/upper-intermediate', locked: false, progress: 0,
      desc: 'Argumen kompleks',
    },
    {
      title: 'Advanced',      cefr: 'C1', level: 'ADVANCED',
      bg: ['#FDF4FF','#FAE8FF','#F3E8FF'], accent: '#9333EA', textColor: '#6B21A8',
      icon: '/assets/icons/new/30. Badge & Achievement.png',
      route: '/modul/english/advanced', locked: false, progress: 0,
      desc: 'Fasih & fleksibel',
    },
    {
      title: 'Proficiency',   cefr: 'C2',   level: 'PROFICIENCY',
      bg: ['#FFF1F2','#FFE4E6','#FEE2E2'], accent: '#E11D48', textColor: '#9F1239',
      icon: '/assets/icons/new/2. Creative Thinking.png',
      route: '/modul/english/proficiency', locked: false, progress: 0,
      desc: 'Setara mahir',
    },
  ];

  const arabicLevelCards = [
    {
      title: 'Pemula', cefr: 'NOV', level: 'ARABIC PEMULA',
      bg: ['#ECFDF5', '#CCFBF1', '#F0FDFA'], accent: '#0F766E', textColor: '#115E59',
      icon: '/assets/icons/new/1. Creative Learning.png',
      route: '/modul/arabic/beginner', locked: false, progress: 0,
      desc: 'Huruf, bunyi, dan frasa dasar',
    },
    {
      title: 'Elementary', cefr: 'A2', level: 'ARABIC ELEMENTARY',
      bg: ['#EFF6FF', '#DBEAFE', '#E0F2FE'], accent: '#1D4ED8', textColor: '#1E40AF',
      icon: '/assets/icons/new/3. Online Course.png',
      route: '/modul/arabic/elementary', locked: false, progress: 0,
      desc: 'Percakapan dan kalimat harian',
    },
    {
      title: 'Intermediate', cefr: 'B1', level: 'ARABIC INTERMEDIATE',
      bg: ['#F5F3FF', '#EDE9FE', '#F8FAFC'], accent: '#7C3AED', textColor: '#5B21B6',
      icon: '/assets/icons/new/4. E-Library.png',
      route: '/modul/arabic/intermediate', locked: false, progress: 0,
      desc: 'Dialog natural dan struktur B1',
    },
    {
      title: 'Upper-Inter.', cefr: 'B2', level: 'ARABIC UPPER-INT',
      bg: ['#FFF7ED', '#FFEDD5', '#FEF3C7'], accent: '#C2410C', textColor: '#9A3412',
      icon: '/assets/icons/new/20. Completion Certificate.png',
      route: '/modul/arabic/upper-intermediate', locked: false, progress: 0,
      desc: 'Argumen, teks panjang, dan B2',
    },
    {
      title: 'Advanced', cefr: 'C1', level: 'ARABIC ADVANCED',
      bg: ['#FFF1F2', '#FFE4E6', '#FCE7F3'], accent: '#BE123C', textColor: '#9F1239',
      icon: '/assets/icons/new/30. Badge & Achievement.png',
      route: '/modul/arabic/advanced', locked: false, progress: 0,
      desc: 'Retorika, analisis, dan C1',
    },
    {
      title: 'Proficiency', cefr: 'C2', level: 'ARABIC PROFICIENCY',
      bg: ['#F8FAFC', '#E2E8F0', '#F1F5F9'], accent: '#0F172A', textColor: '#0F172A',
      icon: '/assets/icons/new/2. Creative Thinking.png',
      route: '/modul/arabic/proficiency', locked: false, progress: 0,
      desc: 'Kemahiran setara C2',
    },
    {
      title: 'Mastery', cefr: 'Post-C2', level: 'ARABIC MASTERY',
      bg: ['#FAF5FF', '#F3E8FF', '#EEF2FF'], accent: '#6D28D9', textColor: '#581C87',
      icon: '/assets/icons/new/11. Innovation Workshop.png',
      route: '/modul/arabic/mastery', locked: false, progress: 0,
      desc: 'Turats, media, dan wacana ahli',
    },
    {
      title: 'Scholar', cefr: 'Research', level: 'ARABIC SCHOLAR',
      bg: ['#FFFBEB', '#FEF3C7', '#FDE68A'], accent: '#854D0E', textColor: '#713F12',
      icon: '/assets/icons/new/4. E-Library.png',
      route: '/modul/arabic/scholar', locked: false, progress: 0,
      desc: 'Riset, tahqiq, dan kritik sumber',
    },
  ];

  const mandarinLevelCards = [
    {
      title: 'Beginner', cefr: 'HSK 1', level: 'MANDARIN BEGINNER',
      bg: ['#FFF1F2', '#FEE2E2', '#FEF2F2'], accent: '#DC2626', textColor: '#991B1B',
      icon: '/assets/icons/new/1. Creative Learning.png',
      route: '/modul/mandarin/beginner', locked: false, progress: 0,
      desc: 'Pinyin, tone, dan frasa dasar',
    },
    {
      title: 'Elementary', cefr: 'HSK 2', level: 'MANDARIN ELEMENTARY',
      bg: ['#FFF7ED', '#FFEDD5', '#FEF3C7'], accent: '#EA580C', textColor: '#9A3412',
      icon: '/assets/icons/new/3. Online Course.png',
      route: '/modul/mandarin/elementary', locked: false, progress: 0,
      desc: 'Percakapan sehari-hari',
    },
    {
      title: 'Intermediate', cefr: 'HSK 3', level: 'MANDARIN INTERMEDIATE',
      bg: ['#FFFBEB', '#FEF3C7', '#FEFCE8'], accent: '#CA8A04', textColor: '#854D0E',
      icon: '/assets/icons/new/4. E-Library.png',
      route: '/modul/mandarin/intermediate', locked: false, progress: 0,
      desc: 'Topik familiar dan narasi',
    },
    {
      title: 'Upper-Inter.', cefr: 'HSK 4', level: 'MANDARIN UPPER-INT',
      bg: ['#F0FDF4', '#DCFCE7', '#ECFDF5'], accent: '#16A34A', textColor: '#166534',
      icon: '/assets/icons/new/20. Completion Certificate.png',
      route: '/modul/mandarin/upper-intermediate', locked: false, progress: 0,
      desc: 'Diskusi luas dan teks menengah',
    },
    {
      title: 'Advanced', cefr: 'HSK 5', level: 'MANDARIN ADVANCED',
      bg: ['#EFF6FF', '#DBEAFE', '#E0F2FE'], accent: '#2563EB', textColor: '#1E40AF',
      icon: '/assets/icons/new/30. Badge & Achievement.png',
      route: '/modul/mandarin/advanced', locked: false, progress: 0,
      desc: 'Berita, opini, dan ide abstrak',
    },
    {
      title: 'Proficiency', cefr: 'HSK 6', level: 'MANDARIN PROFICIENCY',
      bg: ['#F5F3FF', '#EDE9FE', '#F3E8FF'], accent: '#7C3AED', textColor: '#5B21B6',
      icon: '/assets/icons/new/2. Creative Thinking.png',
      route: '/modul/mandarin/proficiency', locked: false, progress: 0,
      desc: 'Wacana kompleks dan nuansa',
    },
    {
      title: 'Expert', cefr: 'HSK 7', level: 'MANDARIN EXPERT',
      bg: ['#FAF5FF', '#F3E8FF', '#EEF2FF'], accent: '#9333EA', textColor: '#6B21A8',
      icon: '/assets/icons/new/11. Innovation Workshop.png',
      route: '/modul/mandarin/hsk-7', locked: false, progress: 0,
      desc: 'Akademik dan seminar',
    },
    {
      title: 'Scholar', cefr: 'HSK 8', level: 'MANDARIN SCHOLAR',
      bg: ['#FFF1F2', '#FFE4E6', '#FCE7F3'], accent: '#BE123C', textColor: '#9F1239',
      icon: '/assets/icons/new/4. E-Library.png',
      route: '/modul/mandarin/hsk-8', locked: false, progress: 0,
      desc: 'Riset dan policy paper',
    },
    {
      title: 'Mastery', cefr: 'HSK 9', level: 'MANDARIN MASTERY',
      bg: ['#F8FAFC', '#E2E8F0', '#F1F5F9'], accent: '#0F172A', textColor: '#0F172A',
      icon: '/assets/icons/new/30. Badge & Achievement.png',
      route: '/modul/mandarin/hsk-9', locked: false, progress: 0,
      desc: 'Native-like academic',
    },
  ];

  const japaneseLevelCards = [
    {
      title: 'Beginner', cefr: 'JLPT N5', level: 'JAPANESE BEGINNER',
      bg: ['#FFF1F2', '#FEE2E2', '#FEF2F2'], accent: '#DC2626', textColor: '#991B1B',
      icon: '/assets/icons/new/1. Creative Learning.png',
      route: '/modul/japanese/beginner', locked: false, progress: 0,
      desc: 'Kana dan frasa dasar',
    },
    {
      title: 'Elementary', cefr: 'JLPT N4', level: 'JAPANESE ELEMENTARY',
      bg: ['#FFF7ED', '#FFEDD5', '#FEF3C7'], accent: '#EA580C', textColor: '#9A3412',
      icon: '/assets/icons/new/3. Online Course.png',
      route: '/modul/japanese/elementary', locked: false, progress: 0,
      desc: 'Percakapan harian',
    },
    {
      title: 'Intermediate', cefr: 'JLPT N3', level: 'JAPANESE INTERMEDIATE',
      bg: ['#EFF6FF', '#DBEAFE', '#E0F2FE'], accent: '#2563EB', textColor: '#1E40AF',
      icon: '/assets/icons/new/4. E-Library.png',
      route: '/modul/japanese/intermediate', locked: false, progress: 0,
      desc: 'Opini dan bacaan menengah',
    },
    {
      title: 'Advanced', cefr: 'JLPT N2', level: 'JAPANESE ADVANCED',
      bg: ['#F5F3FF', '#EDE9FE', '#F3E8FF'], accent: '#7C3AED', textColor: '#5B21B6',
      icon: '/assets/icons/new/30. Badge & Achievement.png',
      route: '/modul/japanese/advanced', locked: false, progress: 0,
      desc: 'Berita, keigo, dan nuansa',
    },
    {
      title: 'Proficiency', cefr: 'JLPT N1', level: 'JAPANESE PROFICIENCY',
      bg: ['#F8FAFC', '#E2E8F0', '#F1F5F9'], accent: '#0F172A', textColor: '#0F172A',
      icon: '/assets/icons/new/2. Creative Thinking.png',
      route: '/modul/japanese/proficiency', locked: false, progress: 0,
      desc: 'Wacana akademik mahir',
    },
  ];

  const levelCards = isJapanese ? japaneseLevelCards : isMandarin ? mandarinLevelCards : isArabic ? arabicLevelCards : englishLevelCards;
  const languageKey = isJapanese ? 'japanese' : isMandarin ? 'mandarin' : isArabic ? 'arabic' : 'english';
  const defaultLevelId = isArabic || isMandarin || isJapanese ? 'beginner' : 'elementary';
  const defaultModuleRoute = `/modul/${languageKey}/${defaultLevelId}`;
  const skillRoute = (levelId: string, skillId: string) => `/modul/${languageKey}/${levelId}/${skillId}`;

  const courseCatalog = {
    work: [
      {
        title: 'Business Communication',
        subtitle: 'Meetings, email, and professional speaking',
        progress: 75,
        xp: 120,
        icon: '/assets/icons/briefcase.png',
        route: skillRoute(defaultLevelId, isArabic ? 'kalam' : 'speaking'),
      },
      {
        title: 'Work Fluency',
        subtitle: 'Roleplay, presentation, and office vocabulary',
        progress: 70,
        xp: 90,
        icon: '/assets/icons/new/19. Laptop.png',
        route: skillRoute(defaultLevelId, isArabic ? 'mufradat' : 'vocabulary'),
      },
    ],
    dailyLife: [
      {
        title: 'Daily Conversation',
        subtitle: 'Food, travel, shopping, and simple routines',
        progress: 42,
        xp: 80,
        icon: '/assets/icons/new/24. Backpack.png',
        route: skillRoute(defaultLevelId, isArabic ? 'kalam' : 'speaking'),
      },
      {
        title: 'Listening Practice',
        subtitle: 'Short dialogs with natural speed',
        progress: 28,
        xp: 65,
        icon: '/assets/icons/new/3. Online Course.png',
        route: skillRoute(defaultLevelId, 'listening'),
      },
    ],
    family: [
      {
        title: 'Family & Friends',
        subtitle: 'Introduce people, describe plans, and respond warmly',
        progress: 55,
        xp: 95,
        icon: '/assets/icons/new/1. Creative Learning.png',
        route: skillRoute(defaultLevelId, isArabic ? 'mufradat' : 'vocabulary'),
      },
      {
        title: 'Story Practice',
        subtitle: 'Tell simple stories with better flow',
        progress: 35,
        xp: 70,
        icon: '/assets/icons/new/4. E-Library.png',
        route: skillRoute(defaultLevelId, 'reading'),
      },
    ],
  };
  const activeCourses = courseCatalog[activeCategory];
  const currentCourse = activeCourses[0];

  const collections = [
    { title: 'All Foundation Courses', sub: 'Foundation Friendly · 18 Courses', bg: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)', icon: '/assets/icons/new/28. Checklist.png' },
    { title: 'Travel Essentials',      sub: 'For globetrotters · 12 Courses',   bg: 'linear-gradient(135deg,#FF6B6B,#EE5A24)', icon: '/assets/icons/new/24. Backpack.png' },
    { title: 'Business English',       sub: 'Professional · 15 Courses',        bg: 'linear-gradient(135deg,#4A90D9,#2C6FBF)', icon: '/assets/icons/new/19. Laptop.png' },
  ];

  const functionalCollections = [
    { title: 'All Foundation Courses', sub: 'Foundation Friendly - 18 Courses', bg: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)', icon: '/assets/icons/new/28. Checklist.png', action: () => setShowLevelPopup(true) },
    { title: 'Travel Essentials', sub: 'For globetrotters - 12 Courses', bg: 'linear-gradient(135deg,#FF6B6B,#EE5A24)', icon: '/assets/icons/new/24. Backpack.png', action: () => setActiveCategory('dailyLife') },
    { title: 'Business English', sub: 'Professional - 15 Courses', bg: 'linear-gradient(135deg,#4A90D9,#2C6FBF)', icon: '/assets/icons/new/19. Laptop.png', action: () => setActiveCategory('work') },
  ];

  return (
    <PageContainer>
      {showLevelPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(10px)' }}
          onClick={() => setShowLevelPopup(false)}
        >
          <motion.div
            className="w-full max-w-3xl max-h-[86vh] overflow-hidden rounded-3xl bg-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-white px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-[18px] text-[#1A1A2E] tracking-tight" style={font(800)}>Semua Level</h3>
                <p className="text-[12px] text-gray-400 mt-0.5" style={font(500)}>
                  {isJapanese ? '5 Levels JLPT untuk Bahasa Jepang' : isMandarin ? '9 Levels HSK untuk Bahasa Mandarin' : isArabic ? 'Arabic Levels dari AI Kamus' : '6 Levels CEFR untuk Bahasa Inggris'}
                </p>
              </div>
              <button
                onClick={() => setShowLevelPopup(false)}
                className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 overflow-y-auto max-h-[calc(86vh-76px)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {levelCards.map((level) => (
                  <motion.button
                    key={level.cefr}
                    onClick={() => {
                      if (level.locked) return;
                      setShowLevelPopup(false);
                      navigate(level.route);
                    }}
                    whileHover={level.locked ? {} : { y: -2 }}
                    whileTap={level.locked ? {} : { scale: 0.98 }}
                    className={`text-left rounded-2xl p-4 border relative overflow-hidden ${level.locked ? 'opacity-60' : 'cursor-pointer'}`}
                    style={{
                      background: `linear-gradient(150deg, ${level.bg[0]} 0%, ${level.bg[1]} 62%, ${level.bg[2]} 100%)`,
                      borderColor: `${level.accent}28`,
                    }}
                  >
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/55 flex items-center justify-center shrink-0">
                        <img src={level.icon} alt={level.title} className="w-11 h-11 object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                            style={{ backgroundColor: `${level.accent}18`, color: level.accent }}
                          >
                            {level.cefr}
                          </span>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider" style={font(700)}>{level.level}</span>
                        </div>
                        <h4 className="text-[15px] text-[#1A1A2E] leading-tight" style={font(800)}>{level.title}</h4>
                        <p className="text-[12px] mt-1 leading-relaxed" style={{ color: level.textColor, ...font(500) }}>{level.desc}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-white/70 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: level.accent }}
                              initial={{ width: 0 }}
                              animate={{ width: `${level.progress}%` }}
                              transition={{ duration: 0.7, ease: 'easeOut' }}
                            />
                          </div>
                          <span className="text-[10px] font-bold" style={{ color: level.accent }}>
                            {level.progress > 0 ? `${level.progress}%` : 'Start'}
                          </span>
                        </div>
                      </div>
                      <div className="self-center">
                        {level.locked ? (
                          <Lock size={16} className="text-gray-400" />
                        ) : (
                          <ChevronRight size={18} style={{ color: level.accent }} />
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <motion.div
        className="pb-28 md:pb-8 flex flex-col gap-7 px-4 md:px-0"
        variants={stagger.container}
        initial="initial"
        animate="animate"
      >

        {/* ─── Header ─── */}
        <motion.div className="flex items-center justify-between pt-5 md:pt-0" variants={stagger.item}>
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#7EC3E6]/25"
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src={mockUser.avatarUrl} alt={mockUser.name} className="w-full h-full object-cover" style={{ backgroundColor: '#b6e3f4' }} />
            </motion.div>
            <div>
              <p className="text-[12px] text-gray-400" style={font(400)}>Welcome Back 👋</p>
              <h2 className="text-[18px] text-[#1A1A2E] tracking-tight" style={font(700)}>{mockUser.name}</h2>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center relative"
          >
            <Bell size={18} className="text-gray-500" />
            <motion.span
              className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#E74C3C] rounded-full border-2 border-white"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          </motion.button>
        </motion.div>

        {/* ─── Hero Banner ─── */}
        <motion.div
          variants={stagger.item}
          className="rounded-3xl overflow-hidden relative"
          style={{ background: 'linear-gradient(140deg, #4FA3D1 0%, #2F86B5 48%, #1E6F9F 100%)' }}
        >
          <div className="flex justify-between items-stretch min-h-[180px]">
            <div className="p-6 pb-5 flex-1 flex flex-col justify-between z-10" style={{ maxWidth: '60%' }}>
              <h1 className="text-white text-[22px] leading-[1.2] tracking-tight" style={font(800)}>
                Continue your lessons with excited.
              </h1>

              <div className="flex items-center gap-3 mt-4">
                {/* Progress ring */}
                <div className="relative w-11 h-11">
                  <svg width="44" height="44" className="-rotate-90">
                    <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
                    <motion.circle
                      cx="22" cy="22" r="18"
                      fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"
                      strokeDasharray="113"
                      initial={{ strokeDashoffset: 113 }}
                      animate={{ strokeDashoffset: 113 - 113 * 0.72 }}
                      transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-[10px]" style={font(700)}>%</span>
                  </div>
                </div>

                {/* Streak */}
                <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <motion.span
                    animate={{ rotate: [0, -12, 12, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    className="text-[13px]"
                  >🔥</motion.span>
                  <span className="text-white text-[13px]" style={font(700)}>{mockUser.streak}</span>
                </div>
              </div>

              <motion.button
                onClick={() => navigate(currentCourse.route)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="bg-white text-[#4FA3D1] text-[13px] py-2.5 px-6 rounded-full inline-flex items-center gap-1.5 self-start mt-4"
                style={font(700)}
              >
                Continue <ChevronRight size={16} strokeWidth={2.5} />
              </motion.button>
            </div>

            <div className="relative w-[170px] sm:w-[230px] md:w-[280px] shrink-0">
              <motion.img
                src="/assets/mascot/bear-reading.png" alt="Bear"
                className="absolute top-[-18px] right-[-10px] w-[185px] sm:w-[245px] md:w-[295px] h-auto object-contain object-top z-0 pointer-events-none"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>

        {/* ─── Category Tabs ─── */}
        <motion.div className="flex gap-2 overflow-x-auto scrollbar-hide" variants={stagger.item}>
          {categories.map(cat => {
            const active = activeCategory === cat.id;
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                layout
                onClick={() => setActiveCategory(cat.id as CategoryId)}
                whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap text-[13px] transition-colors ${
                  active
                    ? 'bg-[#7EC3E6] text-white'
                    : 'bg-white text-gray-500 border border-gray-100'
                }`}
                style={font(active ? 700 : 500)}
              >
                <Icon size={15} />
                <span>{cat.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ─── Continue Course ─── */}
        <motion.div
          variants={stagger.item}
          whileHover={cardHover}
          whileTap={cardTap}
          onClick={() => navigate(currentCourse.route)}
          className="bg-white rounded-2xl p-4 flex items-center gap-4 cursor-pointer"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <div className="w-12 h-12 rounded-xl bg-[#FFF3E0] flex items-center justify-center shrink-0">
            <img src={currentCourse.icon} alt="" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] text-[#1A1A2E] truncate mb-1" style={font(600)}>{currentCourse.title}</h3>
            <p className="text-[11px] text-gray-400 truncate mb-2" style={font(500)}>{currentCourse.subtitle}</p>
            <div className="flex items-center gap-2.5">
              <div className="flex-1 h-[6px] bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#7EC3E6] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${currentCourse.progress}%` }}
                  transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }}
                />
              </div>
              <span className="text-[11px] text-gray-400 shrink-0" style={font(500)}>{currentCourse.progress}%</span>
            </div>
          </div>
            <motion.div
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.88 }}
              className="w-10 h-10 rounded-full bg-[#7EC3E6] flex items-center justify-center text-white shrink-0"
          >
            <Play size={16} fill="currentColor" className="ml-0.5" />
          </motion.div>
        </motion.div>

        {/* ─── Level ─── */}
        <motion.div variants={stagger.item}>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[18px] text-[#1A1A2E] tracking-tight" style={font(700)}>Level</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLevelPopup(true)}
                className="h-8 px-3 rounded-full bg-[#7EC3E6]/15 text-[#2F86B5] inline-flex items-center gap-1.5 text-[11px] hover:bg-[#7EC3E6]/25 transition-colors"
                style={font(800)}
              >
                <Eye size={13} />
                View
              </button>
              <span className="text-[11px] text-gray-400" style={font(500)}>{isJapanese ? 'Japanese Levels • JLPT' : isMandarin ? 'Mandarin Levels • HSK' : isArabic ? 'Arabic Levels' : '6 Levels • CEFR'}</span>
            </div>
          </div>
          <p className="text-[12px] text-gray-400 mb-4" style={font(400)}>
            {isJapanese ? 'Pilih level Bahasa Jepang sesuai JLPT' : isMandarin ? 'Pilih level Bahasa Mandarin sesuai HSK' : isArabic ? 'Pilih level Bahasa Arab dari AI Kamus' : 'Pilih level sesuai kemampuanmu'}
          </p>

          <motion.div
            className="flex gap-3 overflow-x-auto scrollbar-hide pb-3"
            variants={stagger.container}
            initial="initial"
            animate="animate"
          >
            {levelCards.map((c, i) => (
              <motion.div
                key={i}
                variants={stagger.item}
                whileHover={c.locked ? {} : cardHover}
                whileTap={c.locked ? {} : cardTap}
                onClick={() => !c.locked && navigate(c.route)}
                className={`w-[148px] shrink-0 rounded-2xl p-4 flex flex-col relative overflow-hidden ${c.locked ? 'opacity-60' : 'cursor-pointer'}`}
                style={{ background: `linear-gradient(150deg, ${c.bg[0]} 0%, ${c.bg[1]} 60%, ${c.bg[2]} 100%)` }}
              >
                {/* CEFR Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                    style={{ backgroundColor: `${c.accent}18`, color: c.accent }}
                  >
                    {c.cefr}
                  </span>
                  {c.locked && (
                    <div className="w-5 h-5 rounded-full bg-white/70 flex items-center justify-center">
                      <Lock size={10} className="text-gray-400" />
                    </div>
                  )}
                  {!c.locked && c.progress > 0 && (
                    <span className="text-[9px] font-bold" style={{ color: c.accent }}>{c.progress}%</span>
                  )}
                </div>

                {/* Title */}
                <h4 className="text-[14px] text-[#1A1A2E] leading-tight mb-0.5" style={font(700)}>{c.title}</h4>
                <p className="text-[10px] mb-3" style={{ color: c.accent, ...font(500) }}>{c.desc}</p>

                {/* Icon */}
                <div className="flex items-end justify-center h-[64px] mb-2">
                  <motion.img
                    src={c.icon} alt={c.title}
                    className="w-14 h-14 object-contain drop-shadow-sm"
                    whileHover={{ scale: 1.12, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: c.accent }}
                    initial={{ width: 0 }}
                    animate={{ width: `${c.progress}%` }}
                    transition={{ duration: 0.9, delay: 0.1 * i, ease: 'easeOut' }}
                  />
                </div>
                {c.progress === 0 && !c.locked && (
                  <p className="text-[9px] mt-1 text-center" style={{ color: `${c.accent}99`, ...font(500) }}>Belum dimulai</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ─── Work Fluency ─── */}
        <motion.div
          variants={stagger.item}
          className="rounded-3xl overflow-hidden relative"
          style={{ background: 'linear-gradient(140deg, #4FA3D1 0%, #2F86B5 48%, #1E6F9F 100%)' }}
        >
          <div className="p-7 z-10 relative" style={{ maxWidth: '58%' }}>
            <span className="inline-block bg-white/15 text-white text-[9px] rounded-full px-3 py-1 uppercase tracking-widest mb-3" style={font(700)}>
              All Levels
            </span>
            <h3 className="text-white text-[22px] leading-[1.1] tracking-tight mb-2" style={font(800)}>Work Fluency</h3>
            <p className="text-white/75 text-[11px] mb-4 leading-relaxed" style={font(400)}>
              Complete 10 Courses and get a special bonus from Fluently AI!
            </p>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden max-w-[120px]">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ duration: 0.9, delay: 0.8, ease: 'easeOut' }}
                />
              </div>
              <span className="text-white text-[12px]" style={font(800)}>7 / 10</span>
              <span className="text-white/50 text-[10px]" style={font(500)}>3 left</span>
            </div>
            <motion.button
              onClick={() => {
                setActiveCategory('work');
                navigate(defaultModuleRoute);
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="bg-white text-[#4FA3D1] text-[13px] py-2.5 px-5 rounded-full inline-flex items-center gap-1.5 w-full justify-center"
              style={font(700)}
            >
              Take the Courses <ChevronRight size={16} strokeWidth={2.5} />
            </motion.button>
          </div>
          <motion.img
            src="/assets/mascot/bear-business.png" alt="Bear"
            className="absolute top-[-28px] right-[-10px] w-[185px] md:w-[235px] object-contain object-top pointer-events-none"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* ─── Category ─── */}
        <motion.div variants={stagger.item}>
          <h2 className="text-[18px] text-[#1A1A2E] tracking-tight mb-4" style={font(700)}>Category</h2>
          <motion.div
            className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
            variants={stagger.container}
            initial="initial"
            animate="animate"
          >
            {functionalCollections.map((c, i) => (
              <motion.div
                key={i}
                variants={stagger.item}
                whileHover={cardHover}
                whileTap={cardTap}
                onClick={c.action}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') c.action();
                }}
                className="w-[210px] shrink-0 rounded-2xl p-5 min-h-[130px] flex flex-col justify-between cursor-pointer relative overflow-hidden"
                style={{ background: c.bg }}
              >
                <div className="z-10 relative">
                  <h4 className="text-white text-[15px] leading-[1.2] mb-1" style={font(700)}>{c.title}</h4>
                  <p className="text-white/65 text-[10px]" style={font(400)}>{c.sub}</p>
                </div>
                <motion.img
                  src={c.icon} alt={c.title}
                  className="absolute bottom-3 right-3 w-14 h-14 object-contain opacity-80"
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 250 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ─── Popular Topic ─── */}
        <motion.div variants={stagger.item} className="hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] text-[#1A1A2E] tracking-tight" style={font(700)}>Popular Topic</h2>
            <motion.button whileHover={{ x: 3 }} className="text-[12px] text-[#F97316] flex items-center gap-0.5" style={font(600)}>
              See All <ChevronRight size={14} strokeWidth={2.5} />
            </motion.button>
          </div>

          <motion.div
            className="flex gap-3 overflow-x-auto scrollbar-hide pb-3"
            variants={stagger.container}
            initial="initial"
            animate="animate"
          >
            {[].map((t, i) => (
              <motion.div
                key={i}
                variants={stagger.item}
                whileHover={cardHover}
                whileTap={cardTap}
                className="w-[150px] shrink-0 rounded-2xl p-4 pb-3 flex flex-col cursor-pointer relative"
                style={{ backgroundColor: t.bg }}
              >
                <h4 className="text-[13px] text-[#1A1A2E] leading-[1.2] mb-0.5" style={font(600)}>{t.title}</h4>
                <span className="text-[9px] uppercase tracking-widest mb-3" style={{ ...font(700), color: t.lc }}>{t.level}</span>
                <div className="flex items-end justify-center h-[72px]">
                  <motion.img
                    src={t.icon} alt={t.title}
                    className="w-16 h-16 object-contain"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                </div>
                <div className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center">
                  <Lock size={11} className="text-gray-400" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </motion.div>
    </PageContainer>
  );
}
