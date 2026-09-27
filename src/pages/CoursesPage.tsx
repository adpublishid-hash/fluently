import { motion } from 'framer-motion';
import { Play, ChevronRight, Lock, Zap, Gamepad2, Trophy, Flame, Calendar as CalendarIcon, Briefcase, Cloud, MessageSquare, LayoutGrid, Plane, Palette } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import { mockCourses, courseCollections, categoryLabels, difficultyColors } from '../data/mockData';
import type { Course, CourseCategory } from '../types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { DAILY_XP_EVENT, getTodayXp } from '../utils/dailyXp';
import { useLeaderboard } from '../features/leaderboard/leaderboard';

const categories: { id: CourseCategory | 'all'; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'All', icon: LayoutGrid },
  { id: 'work', label: 'Work', icon: Briefcase },
  { id: 'daily-life', label: 'Daily Life', icon: Cloud },
  { id: 'family-friends', label: 'Family / Friends', icon: MessageSquare },
  { id: 'travel', label: 'Travel', icon: Plane },
  { id: 'personal-interest', label: 'Personal Interest', icon: Palette },
];

function CircularProgress({ progress, size = 56 }: { progress: number; size?: number }) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="white"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-xs font-bold">{progress}%</span>
      </div>
    </div>
  );
}

function CategoryPills({ active, onChange }: { active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 px-5 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(cat.id)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
            active === cat.id
              ? 'bg-primary text-white shadow-md'
              : 'bg-gray-50/80 hover:bg-gray-100 text-[#1A1A2E]'
          }`}
          style={active === cat.id ? { boxShadow: '0 4px 12px rgba(126, 195, 230, 0.35)' } : {}}
        >
          <cat.icon size={16} fill="currentColor" strokeWidth={1} className={active === cat.id ? 'text-white' : 'text-[#1A1A2E]'} />
          <span>{cat.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

function WelcomeBanner() {
  return (
    <motion.div
      className="mx-5 mb-6 relative shadow-lg rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none" style={{ background: 'linear-gradient(135deg, #4FA3D1 0%, #1E6F9F 100%)' }}>
        <div className="absolute right-0 top-0 w-64 h-full bg-white/5 skew-x-12 translate-x-12 blur-2xl" />
      </div>
      
      <div className="p-5 md:p-8 xl:px-12 relative z-10 min-h-[170px] md:min-h-[220px] flex items-center md:justify-between">
        <div className="w-[55%] md:w-[60%] lg:w-[58%] space-y-3 md:space-y-4 xl:space-y-5 relative z-10">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight">Unlock Your Potential!</h2>
          <p className="text-white/90 text-[13px] md:text-base lg:text-lg font-medium max-w-sm md:max-w-lg leading-snug">
            Continue your language journey. You're doing great!
          </p>
          <div className="flex items-center gap-3 pt-1 md:pt-2">
            <CircularProgress progress={72} size={48} />
            <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1.5 backdrop-blur-md border border-white/20">
              <Zap size={14} className="text-yellow-300" />
              <span className="text-white text-[12px] md:text-sm font-bold">30 XP</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-1.5 text-primary bg-white px-4 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold mt-2 cursor-pointer shadow-sm hover:shadow-md transition-all"
          >
            Continue
            <Play size={14} fill="currentColor" />
          </motion.button>
        </div>
        <motion.div 
          className="absolute inset-y-0 right-0 md:right-4 xl:right-10 w-[150px] md:w-[220px] lg:w-[260px] flex-shrink-0 pointer-events-none z-20 pt-4 pb-2" 
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <img
            src="/assets/mascot/bear-reading.png"
            alt="Fluently Bear"
            className="w-full h-full object-contain object-bottom drop-shadow-xl"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function ActiveCourseCard({ course }: { course: Course }) {
  return (
    <motion.div
      className="mx-5 bg-white desktop-card p-5 mb-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-card-green flex items-center justify-center ring-4 ring-primary/5">
            <img src={course.iconUrl} alt="" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <h3 className="font-extrabold text-base md:text-lg text-text-primary">{course.title}</h3>
            <p className="text-xs text-text-secondary">{course.completedLessons} of {course.totalLessons} Lessons</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-text-secondary font-bold w-12">{course.progress}%</span>
        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full rounded-full relative"
            style={{ background: 'linear-gradient(90deg, #4FA3D1, #1E6F9F)' }}
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          >
            <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/20 skew-x-[-20deg]" />
          </motion.div>
        </div>
        <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors cursor-pointer shadow-md shadow-primary/30">
          <Play size={16} fill="white" className="text-white ml-0.5" />
        </button>
      </div>
    </motion.div>
  );
}

function RecommendationCard({ course, index }: { course: Course; index: number }) {
  return (
    <motion.div
      className="rounded-2xl p-4 flex flex-col items-center text-center relative overflow-hidden desktop-card border-none h-full"
      style={{ backgroundColor: course.bgColor || '#EAF7FC' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      {course.locked && (
        <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-gray-400/80 backdrop-blur-sm flex items-center justify-center">
          <Lock size={14} className="text-white" />
        </div>
      )}
      <div className={`w-20 h-20 mb-3 drop-shadow-md ${course.locked ? 'opacity-50 grayscale' : ''}`}>
        <img src={course.iconUrl} alt="" className="w-full h-full object-contain transform transition-transform group-hover:scale-110" />
      </div>
      <h4 className={`text-[13px] md:text-sm font-extrabold leading-tight mb-2 ${course.locked ? 'opacity-50' : 'text-text-primary'}`}>
        {course.title}
      </h4>
      <span
        className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
        style={{
          color: difficultyColors[course.difficulty],
          backgroundColor: `${difficultyColors[course.difficulty]}15`,
        }}
      >
        {course.difficulty}
      </span>
    </motion.div>
  );
}

function FeaturedBanner() {
  return (
    <motion.div
      className="mx-5 mb-8 relative shadow-md desktop-card rounded-2xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none" style={{ background: 'linear-gradient(135deg, #D7EEF9 0%, #4FA3D1 100%)' }} />
      
      <div className="absolute top-4 left-5 md:top-6 md:left-8 z-20">
        <span className="bg-primary text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
          All levels
        </span>
      </div>
      <div className="p-5 pt-14 md:p-8 md:pt-14 xl:px-12 relative min-h-[160px] md:min-h-[200px] flex items-center md:justify-between z-10 w-full">
        <div className="w-[55%] md:w-[60%] lg:w-[58%] space-y-2 md:space-y-4 relative z-10">
          <h3 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-text-primary leading-tight">
            Work Fluency Challenge
          </h3>
          <p className="text-[12px] md:text-base lg:text-lg text-text-secondary leading-tight md:leading-relaxed max-w-sm md:max-w-md lg:max-w-lg">
            Complete 10 Courses and get a special bonus from Fluently!
          </p>
          <div className="flex items-center gap-3 pt-2 max-w-xs md:max-w-sm">
            <div className="flex-1 h-2.5 md:h-3 bg-primary/20 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: '70%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <span className="text-primary font-extrabold whitespace-nowrap text-sm mt-0.5 md:text-base">7 / 10</span>
          </div>
        </div>
        <motion.div 
          className="absolute inset-y-0 right-0 md:right-2 xl:right-6 w-[130px] md:w-[190px] lg:w-[240px] flex-shrink-0 pointer-events-none z-20 pt-4 pb-2"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
        >
          <img
            src="/assets/mascot/bear-business.png"
            alt="Business Bear"
            className="w-full h-full object-contain object-bottom drop-shadow-xl"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function CourseCollectionCards() {
  return (
    <div className="mt-8 px-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-extrabold text-lg text-text-primary">Course Collections</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {courseCollections.map((col: import('../types').CourseCollection, i: number) => (
          <motion.div
            key={col.id}
            className="rounded-2xl p-5 relative overflow-hidden cursor-pointer desktop-card border-none"
            style={{ backgroundColor: col.bgColor }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <div className="relative z-10 w-2/3">
              <h4 className="font-extrabold text-[15px] md:text-base text-text-primary leading-tight mb-2">
                {col.title}
              </h4>
              <p className="text-[11px] font-semibold text-text-secondary/80 mb-2">{col.subtitle}</p>
              <p className="text-[11px] font-bold text-primary bg-white/40 px-2.5 py-1 rounded-md inline-block backdrop-blur-sm">
                {col.count} Courses
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-28 md:h-28 opacity-30 transform -rotate-12">
              <img src={col.iconUrl} alt="" className="w-full h-full object-contain" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CategoryCoursesSection({ category, courses }: { category: string; courses: Course[] }) {
  const label = categoryLabels[category] || category;
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4 px-5">
        <h3 className="font-extrabold text-lg text-text-primary">{label}</h3>
        <button className="text-[13px] text-primary font-bold flex items-center gap-1 cursor-pointer hover:underline">
          See All <ChevronRight size={16} />
        </button>
      </div>
      <div className="flex overflow-x-auto gap-4 pb-4 px-5 snap-x scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        {courses.map((course, index) => (
          <div key={course.id} className="w-[140px] md:w-[180px] flex-shrink-0 snap-start">
            <RecommendationCard course={course} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** 
 * Desktop Right Sidebar Widgets 
 */
const DAILY_XP_GOAL = 50;

function DailyGoalWidget() {
  const [todayXP, setTodayXP] = useState<number>(getTodayXp);

  useEffect(() => {
    const refresh = () => setTodayXP(getTodayXp());
    window.addEventListener(DAILY_XP_EVENT, refresh);
    window.addEventListener('storage', refresh);
    window.addEventListener('focus', refresh);
    return () => {
      window.removeEventListener(DAILY_XP_EVENT, refresh);
      window.removeEventListener('storage', refresh);
      window.removeEventListener('focus', refresh);
    };
  }, []);

  const reached = todayXP >= DAILY_XP_GOAL;
  const currentXP = Math.min(todayXP, DAILY_XP_GOAL);
  const progress = Math.min(100, (todayXP / DAILY_XP_GOAL) * 100);

  return (
    <div className="desktop-sidebar-widget mb-6 flex flex-col items-center">
      <h4 className="font-bold text-sm text-text-secondary mb-4 w-full text-left">Today's Goal</h4>
      <CircularProgress progress={progress} size={100} />
      <p className="text-sm font-extrabold text-text-primary mt-4">{currentXP} / {DAILY_XP_GOAL} XP</p>
      <p className="text-xs text-text-muted mt-1">{reached ? 'Goal complete!' : todayXP > 0 ? 'Almost there!' : 'Keep going'}</p>
    </div>
  );
}

function LeaderboardSnippetWidget() {
  const navigate = useNavigate();
  const { entries, loading } = useLeaderboard(3);
  const top3 = entries.slice(0, 3);
  return (
    <button
      type="button"
      onClick={() => navigate('/rank')}
      className="desktop-sidebar-widget mb-6 w-full text-left cursor-pointer transition-shadow hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-sm text-text-secondary flex items-center gap-2">
          <Trophy size={16} className="text-yellow-500" /> Top Learners
        </h4>
        <ChevronRight size={14} className="text-text-muted" />
      </div>
      <div className="space-y-4">
        {loading && top3.length === 0 && [0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-3" />
            <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-gray-100" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 w-3/4 animate-pulse rounded bg-gray-100" />
              <div className="h-2 w-1/3 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        ))}
        {!loading && top3.length === 0 && (
          <p className="text-[11px] text-text-muted py-1">No ranking yet. Start learning!</p>
        )}
        {top3.map((entry) => (
          <div key={entry.user.id} className="flex items-center gap-3">
            <span className="font-bold text-text-muted text-xs w-3">{entry.rank}</span>
            <img src={entry.user.avatarUrl} alt="" className="w-8 h-8 rounded-full border border-gray-100" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-text-primary truncate">{entry.user.name}</p>
              <p className="text-[10px] text-primary font-semibold">{entry.user.xp.toLocaleString()} XP</p>
            </div>
          </div>
        ))}
      </div>
    </button>
  );
}

function StreakCalendarWidget({ userStreak }: { userStreak: number }) {
  return (
    <div className="desktop-sidebar-widget">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-sm text-text-secondary flex items-center gap-2">
          <CalendarIcon size={16} className="text-blue-500" /> Activity
        </h4>
        <div className="flex items-center gap-1 bg-orange-100/50 px-2 py-0.5 rounded text-[10px] font-bold text-orange-600">
          <Flame size={12} /> {userStreak}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, index) => (
          <div key={index} className="text-center text-[10px] font-semibold text-text-muted mb-1">{d}</div>
        ))}
        {Array.from({ length: 14 }).map((_, i) => {
          // Fake some active dates
          const isActive = [0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13].includes(i);
          const isToday = i === 13;
          return (
            <div 
              key={i} 
              className={`w-full aspect-square rounded-sm ${
                isActive ? 'bg-primary' : 'bg-gray-100'
              } ${isToday ? 'ring-2 ring-primary ring-offset-1' : ''} opacity-${isActive ? (isToday ? '100' : '80') : '50'}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function CoursesPage({ onOpenGames }: { onOpenGames?: () => void }) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { user } = useAuth();
  const userDisplayName = user?.displayName || user?.name || 'Learner';
  const userAvatarUrl = user?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userDisplayName)}&backgroundColor=b6e3f4`;
  const userStreak = user?.streak ?? 0;

  const activeCourse = mockCourses.find((c: Course) => c.progress && c.progress > 0 && c.progress < 100);
  const forYouCourses = mockCourses.filter((c: Course) => c.category === 'work');

  const categorySections = ['family-friends', 'travel', 'personal-interest'] as const;

  return (
    <PageContainer>
      <div className="flex flex-col lg:flex-row gap-8 pb-4">
        
        {/* Main Content Column */}
        <div className="flex-1 min-w-0">
          {/* Header Mobile / Setup Desktop spacing */}
          <motion.div
            className="flex items-center justify-between px-5 pt-6 mb-6 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full overflow-hidden border-2 border-primary/30" style={{ width: 44, height: 44, minWidth: 44 }}>
                <img src={userAvatarUrl} alt={userDisplayName} className="object-cover w-full h-full" />
              </div>
              <div>
                <p className="text-xs text-text-secondary font-medium">Welcome Back</p>
                <h1 className="text-lg font-extrabold text-text-primary">{userDisplayName}</h1>
              </div>
            </div>
          </motion.div>

          <WelcomeBanner />

          <CategoryPills active={activeCategory} onChange={setActiveCategory} />

          {activeCourse && <ActiveCourseCard course={activeCourse} />}

          {/* For You Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-1 px-5">
              <h3 className="font-extrabold text-lg text-text-primary">Recommended for You</h3>
            </div>
            <p className="text-xs font-medium text-text-muted mb-4 px-5">
              Curated based on your level and interests
            </p>
            <div className="flex overflow-x-auto gap-4 pb-4 px-5 snap-x scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
              {forYouCourses.map((course: Course, i: number) => (
                <div key={course.id} className="w-[140px] md:w-[180px] flex-shrink-0 snap-start">
                  <RecommendationCard course={course} index={i} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <FeaturedBanner />
          </div>

          {/* Mini Games Banner */}
          <motion.button
            className="mx-5 mb-8 w-[calc(100%-2.5rem)] rounded-2xl overflow-hidden relative cursor-pointer text-left shadow-lg"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.01, boxShadow: '0 10px 25px rgba(118, 75, 162, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenGames}
          >
            <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 blur-lg" />
            <div className="p-5 md:p-6 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <Gamepad2 size={28} className="text-white drop-shadow-md" />
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-lg md:text-xl">Mini Games Zone</h3>
                  <p className="text-white/80 text-sm font-medium">Learn with fun word games!</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-white/80" />
            </div>
          </motion.button>

          <CourseCollectionCards />

          {categorySections.map((cat) => {
            const courses = mockCourses.filter((c: Course) => c.category === cat);
            if (courses.length === 0) return null;
            return <CategoryCoursesSection key={cat} category={cat} courses={courses} />;
          })}
        </div>

        {/* Right Sidebar Column (Desktop Only) */}
        <div className="hidden xl:block w-[320px] flex-shrink-0 pr-5">
          <div className="sticky top-8 space-y-6">
            <DailyGoalWidget />
            <LeaderboardSnippetWidget />
            <StreakCalendarWidget userStreak={userStreak} />
          </div>
        </div>

      </div>
    </PageContainer>
  );
}
