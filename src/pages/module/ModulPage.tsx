// @ts-nocheck
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Play, Home, Users, ChevronRight, Bell, Lock, Eye, X, Check, ClipboardCheck, Timer, Award, ShoppingBag, Tag } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { useAuth } from '../../auth/AuthContext';
import { getRecentChatRoute, getRecentChatSessions } from '../../features/chat/recentSessions';
import { formatRupiah } from '../../data/shopData';

type CategoryId = 'dailyLife' | 'family';
type RecentModule = {
  category: CategoryId;
  title: string;
  subtitle: string;
  icon: string;
  route: string;
  progress: number;
  updatedAt: number;
};

type LearningCard = Omit<RecentModule, 'category'> & { category?: CategoryId };

const RECENT_MODULES_KEY = 'fluently_recent_modules';
const DISCOUNT_POPUP_SEEN_KEY = 'fluently_discount_products_popup_seen';

function hasProductDiscount(product: any) {
  const price = Number(product?.price || 0);
  const originalPrice = Number(product?.originalPrice || 0);
  return (
    (originalPrice > 0 && originalPrice > price) ||
    Boolean(product?.proDiscountEnabled) ||
    Boolean(product?.lifetimeDiscountEnabled)
  );
}

function getProductDiscountPercent(product: any) {
  const price = Number(product?.price || 0);
  const originalPrice = Number(product?.originalPrice || 0);
  const baseDiscount = originalPrice > price && originalPrice > 0
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;
  return Math.max(
    baseDiscount,
    Number(product?.proDiscountPercent || 0),
    Number(product?.lifetimeDiscountPercent || 0)
  );
}

function readRecentModules(): RecentModule[] {
  try {
    const raw = localStorage.getItem(RECENT_MODULES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((item) => (
          item?.route &&
          item?.category &&
          item.category !== 'work' &&
          item.title !== 'Business Communication' &&
          item.title !== 'Work Fluency'
        ))
      : [];
  } catch {
    return [];
  }
}

function saveRecentModules(modules: RecentModule[]) {
  localStorage.setItem(RECENT_MODULES_KEY, JSON.stringify(modules.slice(0, 8)));
}

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

const examByLanguage = {
  English: {
    label: 'TOEFL Practice',
    title: 'Ujian Bahasa Inggris',
    subtitle: 'Pilih TOEFL Test 1 atau TOEFL Test 2 sesuai target sertifikasi kamu.',
    route: '/ujian/english',
    progress: '0 / 3',
    note: 'exam options',
    bullets: ['TOEFL PBT score', 'Timed practice', 'Review jawaban'],
    available: true,
  },
  Arabic: {
    label: 'TOAFL Practice',
    title: 'Ujian Bahasa Arab',
    subtitle: 'Latihan pemahaman qiraah, mufradat, dan struktur untuk persiapan TOAFL.',
    route: '',
    progress: 'Coming',
    note: 'soon',
    bullets: ['Qiraah', 'Mufradat', 'Tarkib'],
    available: false,
  },
  Mandarin: {
    label: 'HSK Practice',
    title: 'Ujian Mandarin HSK',
    subtitle: 'Persiapan HSK dengan latihan kosakata, grammar, dan reading bertahap.',
    route: '',
    progress: 'Coming',
    note: 'soon',
    bullets: ['HSK vocab', 'Reading', 'Grammar'],
    available: false,
  },
  Japanese: {
    label: 'JLPT Practice',
    title: 'Ujian Japanese JLPT',
    subtitle: 'Latihan JLPT untuk vocabulary, grammar, dan reading comprehension.',
    route: '',
    progress: 'Coming',
    note: 'soon',
    bullets: ['Kanji vocab', 'Bunpou', 'Dokkai'],
    available: false,
  },
};

export default function ModulPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<CategoryId>('dailyLife');
  const [showLevelPopup, setShowLevelPopup] = useState(false);
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [shopProducts, setShopProducts] = useState<any[]>([]);
  const [discountProducts, setDiscountProducts] = useState<any[]>([]);
  const [recentModules, setRecentModules] = useState<RecentModule[]>(() => readRecentModules());
  const [recentChats, setRecentChats] = useState(() => getRecentChatSessions());
  const isArabic = user?.persona?.targetLanguage === 'Arabic';
  const isMandarin = user?.persona?.targetLanguage === 'Mandarin';
  const isJapanese = user?.persona?.targetLanguage === 'Japanese';
  const targetLanguage = user?.persona?.targetLanguage || 'English';
  const exam = examByLanguage[targetLanguage] || examByLanguage.English;

  const categories = [
    { id: 'dailyLife', label: 'Daily Life', icon: Home },
    { id: 'family', label: 'Family / Friends', icon: Users },
  ];
  const recentCategoryIds = useMemo(
    () => Array.from(new Set(recentModules.map((item) => item.category))),
    [recentModules]
  );
  const visibleCategories = useMemo(
    () => categories.filter((category) => recentCategoryIds.includes(category.id as CategoryId)),
    [categories, recentCategoryIds]
  );
  const hasRecentModules = recentModules.length > 0;
  const notificationProducts = useMemo(
    () => (discountProducts.length > 0 ? discountProducts : shopProducts.slice(0, 6)),
    [discountProducts, shopProducts]
  );
  const hasDiscountNotification = discountProducts.length > 0;

  useEffect(() => {
    if (!hasRecentModules) return;
    if (!recentCategoryIds.includes(activeCategory)) {
      setActiveCategory(recentCategoryIds[0] as CategoryId);
    }
  }, [activeCategory, hasRecentModules, recentCategoryIds]);

  useEffect(() => {
    const refreshRecentChats = () => setRecentChats(getRecentChatSessions());
    refreshRecentChats();
    window.addEventListener('storage', refreshRecentChats);
    window.addEventListener('focus', refreshRecentChats);
    return () => {
      window.removeEventListener('storage', refreshRecentChats);
      window.removeEventListener('focus', refreshRecentChats);
    };
  }, []);

  useEffect(() => {
    const refreshRecentModules = () => setRecentModules(readRecentModules());
    window.addEventListener('storage', refreshRecentModules);
    window.addEventListener('focus', refreshRecentModules);
    return () => {
      window.removeEventListener('storage', refreshRecentModules);
      window.removeEventListener('focus', refreshRecentModules);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/shop/products', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Products failed'))))
      .then((data) => {
        if (cancelled) return;
        const products = Array.isArray(data?.products) ? data.products : [];
        setShopProducts(products.slice(0, 8));
        const discounted = products
          .filter(hasProductDiscount)
          .sort((a, b) => getProductDiscountPercent(b) - getProductDiscountPercent(a))
          .slice(0, 6);
        setDiscountProducts(discounted);

        if (!discounted.length || typeof sessionStorage === 'undefined') return;
        const userKey = user?.id || user?.email || 'guest';
        const seenKey = `${DISCOUNT_POPUP_SEEN_KEY}:${userKey}`;
        if (!sessionStorage.getItem(seenKey)) {
          sessionStorage.setItem(seenKey, '1');
          setShowDiscountPopup(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setShopProducts([]);
          setDiscountProducts([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id, user?.email]);

  const englishLevelCards = [
    {
      title: 'Beginner',      cefr: 'A1', level: 'BEGINNER',
      bg: ['#EAF7FC','#D7EEF9','#F3FBFE'], accent: '#4FA3D1', textColor: '#1C6F95',
      icon: '/assets/icons/new/19. Laptop.png',
      route: '/modul/english/beginner', locked: false, progress: 0,
      desc: 'Fondasi dasar',
    },
    {
      title: 'Elementary',    cefr: 'A2', level: 'ELEMENTARY',
      bg: ['#E8FFF3','#D1FAE5','#ECFDF5'], accent: '#10B981', textColor: '#065F46',
      icon: '/assets/icons/new/1. Creative Learning.png',
      route: '/modul/english/elementary', locked: false, progress: 0,
      desc: 'Bahasa sehari-hari',
    },
    {
      title: 'Intermediate',  cefr: 'B1', level: 'INTERMEDIATE',
      bg: ['#EEF2FF','#E0E7FF','#EDE9FE'], accent: '#6366F1', textColor: '#3730A3',
      icon: '/assets/icons/new/4. E-Library.png',
      route: '/modul/english/intermediate', locked: false, progress: 0,
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

  const chatModeIcons = {
    vocabulary: '/assets/icons/new/1. Creative Learning.png',
    pronunciation: '/assets/icons/new/2. Creative Thinking.png',
    grammar: '/assets/icons/new/6. Online Course.png',
    speaking: '/assets/icons/new/3. Online Course.png',
    reading: '/assets/icons/new/4. E-Library.png',
    writing: '/assets/icons/new/24. Backpack.png',
  };
  const latestRecentModule = recentModules[0];
  const latestRecentChat = recentChats[0];
  const latestRecentChatCourse: LearningCard | null = latestRecentChat
    ? {
        title: latestRecentChat.title || latestRecentChat.topic,
        subtitle: `${latestRecentChat.modeLabel || 'AI Chat'} • ${latestRecentChat.levelId?.toUpperCase() || 'AI'} • ${latestRecentChat.topic}`,
        progress: 0,
        icon: chatModeIcons[latestRecentChat.modeId] || '/assets/icons/new/1. Creative Learning.png',
        route: getRecentChatRoute(latestRecentChat),
        updatedAt: latestRecentChat.updatedAt,
      }
    : null;
  const latestUserTopicCourse: LearningCard | null =
    latestRecentModule && latestRecentChatCourse
      ? latestRecentModule.updatedAt >= latestRecentChatCourse.updatedAt
        ? latestRecentModule
        : latestRecentChatCourse
      : latestRecentModule || latestRecentChatCourse;
  const recentCourseForActiveCategory = recentModules.find((module) => module.category === activeCategory);
  const currentCourse: LearningCard | null = recentCourseForActiveCategory || latestUserTopicCourse;
  const heroRoute = currentCourse?.route || defaultModuleRoute;

  const rememberModule = (course: Omit<RecentModule, 'updatedAt'>) => {
    const nextModule = { ...course, updatedAt: Date.now() };
    setRecentModules((prev) => {
      const next = [nextModule, ...prev.filter((item) => item.route !== course.route)];
      saveRecentModules(next);
      return next.slice(0, 8);
    });
  };

  const openLearningCard = (course: LearningCard) => {
    if (course.category) {
      rememberModule(course as Omit<RecentModule, 'updatedAt'>);
    }
    navigate(course.route || heroRoute);
  };

  const openDiscountProduct = (productId: string) => {
    setShowDiscountPopup(false);
    navigate(`/shop/product/${productId}`);
  };

  const openAllDiscountProducts = () => {
    setShowDiscountPopup(false);
    navigate('/shop');
  };

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

      {showDiscountPopup && notificationProducts.length > 0 && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4"
          style={{ background: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(12px)' }}
          onClick={() => setShowDiscountPopup(false)}
        >
          <motion.div
            className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-t-[28px] bg-white shadow-2xl sm:rounded-[28px] flex flex-col"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* ─── Header with subtle gradient ─── */}
            <div
              className="relative px-5 sm:px-6 pt-5 pb-4 border-b border-gray-100"
              style={{ background: 'linear-gradient(135deg, #F4FAFD 0%, #FFFFFF 60%)' }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm"
                    style={{ background: 'linear-gradient(135deg, #7EC3E6 0%, #4FA3D1 100%)' }}
                  >
                    <ShoppingBag size={22} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10.5px] uppercase tracking-[0.22em] text-[#4FA3D1]" style={font(800)}>
                      {hasDiscountNotification ? 'Promo tersedia' : 'Shop update'}
                    </p>
                    <h3 className="text-[18px] sm:text-[20px] text-[#1A1A2E] tracking-tight leading-tight mt-0.5" style={font(800)}>
                      {hasDiscountNotification ? 'Produk diskon untuk kamu' : 'Produk belajar terbaru'}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setShowDiscountPopup(false)}
                  className="w-9 h-9 rounded-full bg-white text-gray-400 flex items-center justify-center hover:bg-gray-100 hover:text-gray-600 transition-colors shrink-0 border border-gray-100"
                  aria-label="Tutup promo"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ─── Scrollable body ─── */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">
              <p className="mb-4 text-[12.5px] leading-relaxed text-gray-500" style={font(500)}>
                {hasDiscountNotification
                  ? 'Ada produk belajar yang sedang diskon. Pilih produk yang cocok, atau lanjutkan modul dulu dan cek promo nanti.'
                  : 'Ini daftar produk aktif terbaru di Fluently Shop. Pilih produk yang cocok untuk melengkapi sesi belajarmu.'}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {notificationProducts.map((product) => {
                  const discount = getProductDiscountPercent(product);
                  const hasStrikethrough = Number(product.originalPrice || 0) > Number(product.price || 0);
                  return (
                    <motion.button
                      key={product.id}
                      onClick={() => openDiscountProduct(product.id)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                      className="group relative flex gap-3 rounded-2xl border border-gray-100 bg-white p-3 text-left shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:border-[#7EC3E6]/50 hover:shadow-[0_8px_24px_rgba(79,163,209,0.12)] transition-shadow"
                    >
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
                        {product.cover ? (
                          <img src={product.cover} alt={product.title} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[#7EC3E6]">
                            <ShoppingBag size={24} />
                          </div>
                        )}
                        {discount > 0 && (
                          <span
                            className="absolute top-1.5 left-1.5 inline-flex items-center gap-0.5 rounded-md bg-[#E74C3C] px-1.5 py-0.5 text-[9.5px] text-white shadow-sm"
                            style={font(800)}
                          >
                            <Tag size={9} strokeWidth={2.5} />
                            -{discount}%
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1 flex flex-col">
                        <span className="text-[9.5px] uppercase tracking-[0.14em] text-gray-400" style={font(800)}>
                          {product.type}
                        </span>
                        <h4 className="mt-1 line-clamp-2 text-[13.5px] leading-snug text-[#1A1A2E]" style={font(700)}>
                          {product.title}
                        </h4>
                        <p className="mt-0.5 truncate text-[11px] text-gray-400" style={font(500)}>
                          {product.author || product.category}
                        </p>
                        <div className="mt-auto pt-2 flex items-baseline gap-1.5 flex-wrap">
                          <span className="text-[15px] text-[#2F86B5]" style={font(900)}>{formatRupiah(product.price)}</span>
                          {hasStrikethrough && (
                            <span className="text-[10.5px] text-gray-400 line-through" style={font(600)}>{formatRupiah(product.originalPrice)}</span>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* ─── Sticky footer with CTAs ─── */}
            <div className="px-5 sm:px-6 py-4 border-t border-gray-100 bg-white">
              <div className="flex gap-2.5 flex-col-reverse sm:flex-row">
                <button
                  onClick={() => setShowDiscountPopup(false)}
                  className="h-11 rounded-xl border border-gray-200 px-5 text-[13px] text-gray-600 transition-colors hover:bg-gray-50 sm:flex-shrink-0"
                  style={font(700)}
                >
                  Nanti saja
                </button>
                <motion.button
                  onClick={openAllDiscountProducts}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-11 flex-1 rounded-xl px-5 text-[13px] text-white shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  style={{
                    background: 'linear-gradient(135deg, #7EC3E6 0%, #4FA3D1 100%)',
                    ...font(800),
                  }}
                >
                  {hasDiscountNotification ? 'Lihat semua promo' : 'Buka Fluently Shop'}
                  <ChevronRight size={16} strokeWidth={2.5} />
                </motion.button>
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
              <img src={user?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.displayName || user?.name || 'Learner')}&backgroundColor=b6e3f4`} alt={user?.displayName || user?.name || 'Learner'} className="w-full h-full object-cover" style={{ backgroundColor: '#b6e3f4' }} />
            </motion.div>
            <div>
              <p className="text-[12px] text-gray-400" style={font(400)}>Welcome Back 👋</p>
              <h2 className="text-[18px] text-[#1A1A2E] tracking-tight" style={font(700)}>{user?.displayName || user?.name || 'Learner'}</h2>
            </div>
          </div>
          <motion.button
            onClick={() => notificationProducts.length > 0 && setShowDiscountPopup(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center relative"
            aria-label="Lihat list produk"
          >
            <Bell size={18} className="text-gray-500" />
            {notificationProducts.length > 0 && (
              <motion.span
                className={`absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full border-2 border-white ${hasDiscountNotification ? 'bg-[#E74C3C]' : 'bg-[#7EC3E6]'}`}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
            )}
          </motion.button>
        </motion.div>

        {/* ─── Hero Banner ─── */}
        <motion.div
          variants={stagger.item}
          className="rounded-3xl overflow-hidden relative"
          style={{ background: 'linear-gradient(140deg, #4FA3D1 0%, #2F86B5 48%, #1E6F9F 100%)' }}
        >
          <div className="flex justify-between items-stretch min-h-[200px]">
            <div className="p-5 sm:p-6 pb-5 flex-1 flex flex-col justify-between z-10 max-w-[58%]">
              <h1 className="text-white text-[19px] sm:text-[22px] leading-[1.2] tracking-tight" style={font(800)}>
                Continue your lessons with excited.
              </h1>

              <div className="flex items-center gap-2 mt-4 flex-wrap">
                {/* Progress ring */}
                <div className="relative w-11 h-11 shrink-0">
                  <svg width="44" height="44" className="-rotate-90">
                    <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
                    <motion.circle
                      cx="22" cy="22" r="18"
                      fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"
                      strokeDasharray="113"
                      initial={{ strokeDashoffset: 113 }}
                      animate={{ strokeDashoffset: 113 - 113 * (((user?.xp ?? 0) % 3000) / 3000) }}
                      transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-[10px]" style={font(700)}>{Math.round((((user?.xp ?? 0) % 3000) / 3000) * 100)}%</span>
                  </div>
                </div>

                {/* Streak */}
                <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1.5">
                  <motion.span
                    animate={{ rotate: [0, -12, 12, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    className="text-[13px]"
                  >🔥</motion.span>
                  <span className="text-white text-[13px]" style={font(700)}>{user?.streak ?? 0}</span>
                </div>
              </div>

              <motion.button
                onClick={() => navigate(heroRoute)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="bg-white text-[#4FA3D1] text-[12.5px] sm:text-[13px] py-2.5 px-5 rounded-full inline-flex items-center gap-1.5 self-start mt-4"
                style={font(700)}
              >
                Continue <ChevronRight size={16} strokeWidth={2.5} />
              </motion.button>
            </div>

            <div className="relative w-[42%] sm:w-[230px] md:w-[280px] shrink-0 self-stretch">
              <motion.img
                src="/assets/mascot/bear-reading.png" alt="Bear"
                className="absolute inset-0 w-full h-full object-contain object-bottom-right pointer-events-none"
                style={{ objectPosition: '100% 100%' }}
                initial={{ opacity: 0, y: 20, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>

        {/* ─── Recent Module Filters ─── */}
        {hasRecentModules && visibleCategories.length > 0 && (
          <motion.div className="flex gap-2 overflow-x-auto scrollbar-hide" variants={stagger.item}>
            {visibleCategories.map(cat => {
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
        )}

        {/* ─── Continue Course ─── */}
        {currentCourse && (
          <motion.div
            variants={stagger.item}
            whileHover={cardHover}
            whileTap={cardTap}
            onClick={() => openLearningCard(currentCourse)}
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
        )}

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
                className={`w-[176px] aspect-square shrink-0 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden ${c.locked ? 'opacity-60' : 'cursor-pointer'}`}
                style={{ background: `linear-gradient(150deg, ${c.bg[0]} 0%, ${c.bg[1]} 60%, ${c.bg[2]} 100%)` }}
              >
                {/* CEFR Badge */}
                <div className="flex items-center justify-between">
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
                <div className="min-h-[42px]">
                  <h4 className="text-[15px] text-[#1A1A2E] leading-tight truncate" style={font(700)}>{c.title}</h4>
                  <p className="text-[11px] leading-tight line-clamp-2" style={{ color: c.accent, ...font(500) }}>{c.desc}</p>
                </div>

                {/* Icon */}
                <div className="flex items-center justify-center h-[56px]">
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

        {/* ─── Exam Practice ─── */}
        <motion.div
          variants={stagger.item}
          className="rounded-3xl overflow-hidden relative"
          style={{ background: 'linear-gradient(140deg, #4FA3D1 0%, #2F86B5 48%, #1E6F9F 100%)' }}
        >
          <div className="flex items-stretch min-h-[230px]">
            <div className="p-5 sm:p-6 z-10 relative flex-1 max-w-[64%]">
              <span className="inline-block bg-white/15 text-white text-[9px] rounded-full px-3 py-1 uppercase tracking-widest mb-3" style={font(700)}>
                {exam.label}
              </span>
              <h3 className="text-white text-[19px] sm:text-[22px] leading-[1.1] tracking-tight mb-2" style={font(800)}>{exam.title}</h3>
              <p className="mb-3 max-w-[360px] text-[11px] leading-relaxed text-white/75" style={font(500)}>{exam.subtitle}</p>
              <div className="mb-4 grid gap-1.5">
                {exam.bullets.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 text-[10.5px] text-white/85" style={font(600)}>
                    <Check size={13} className="shrink-0 text-white" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                <div className="h-2 bg-white/20 rounded-full overflow-hidden w-[80px] sm:w-[120px] shrink-0">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '70%' }}
                    transition={{ duration: 0.9, delay: 0.8, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-white text-[12px]" style={font(800)}>{exam.progress}</span>
                <span className="text-white/50 text-[10px]" style={font(500)}>{exam.note}</span>
              </div>
              <motion.button
                onClick={() => exam.available && navigate(exam.route)}
                whileHover={exam.available ? { scale: 1.03 } : {}}
                whileTap={exam.available ? { scale: 0.96 } : {}}
                className={`bg-white text-[#4FA3D1] text-[12.5px] sm:text-[13px] py-2.5 px-5 rounded-full inline-flex items-center gap-1.5 justify-center ${exam.available ? '' : 'cursor-not-allowed opacity-70'}`}
                style={font(700)}
              >
                {exam.available ? 'Mulai Ujian' : 'Segera Hadir'} <ChevronRight size={16} strokeWidth={2.5} />
              </motion.button>
            </div>

            <div className="relative w-[36%] sm:w-[235px] shrink-0 self-stretch">
              <div className="absolute bottom-5 right-4 grid gap-2">
                {[
                  { icon: ClipboardCheck, text: 'Score' },
                  { icon: Timer, text: 'Timer' },
                  { icon: Award, text: 'Review' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.text}
                      className="flex items-center gap-1.5 rounded-2xl bg-white/15 px-2.5 py-2 text-[9px] font-black text-white backdrop-blur"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.45 + index * 0.08 }}
                    >
                      <Icon size={13} />
                      <span>{item.text}</span>
                    </motion.div>
                  );
                })}
              </div>
              <motion.img
                src="/assets/mascot/bf44cc6a-9193-47a3-9526-36350e89d5d1.png" alt="Exam mascot"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-90"
                style={{ objectPosition: '100% 100%' }}
                initial={{ opacity: 0, x: 20, scale: 0.92 }}
                animate={{ opacity: 0.9, x: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
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
