import { motion } from 'framer-motion';
import { Flame, TrendingUp, Crown, Medal, BarChart3, Target } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import { mockLeaderboard, mockUser } from '../data/mockData';
import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

function PodiumUser({ entry, position }: { entry: typeof mockLeaderboard[0]; position: 1 | 2 | 3 }) {
  const heights = { 1: 'h-32 md:h-40', 2: 'h-24 md:h-32', 3: 'h-20 md:h-24' };
  const sizes = { 1: 'w-16 h-16 md:w-20 md:h-20', 2: 'w-13 h-13 md:w-16 md:h-16', 3: 'w-13 h-13 md:w-16 md:h-16' };
  const badges = { 1: '🥇', 2: '🥈', 3: '🥉' };
  const delays = { 1: 0.3, 2: 0.1, 3: 0.5 };
  const colors = { 1: '#FFD700', 2: '#C0C0C0', 3: '#CD7F32' };

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delays[position], duration: 0.5 }}
    >
      <div className="relative mb-3">
        <div
          className={`${sizes[position]} rounded-full overflow-hidden border-4 shadow-lg`}
          style={{ borderColor: colors[position] }}
        >
          <img src={entry.user.avatarUrl} alt={entry.user.name} className="w-full h-full object-cover bg-white" />
        </div>
        {position === 1 && (
          <motion.div
            className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Crown size={28} className="text-yellow-500 drop-shadow-md" fill="#FFD700" />
          </motion.div>
        )}
        <div className="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 text-xl md:text-2xl drop-shadow-sm">
          {badges[position]}
        </div>
      </div>
      <p className="text-[13px] md:text-sm font-extrabold text-text-primary mt-1 md:mt-2 truncate max-w-[80px] md:max-w-[100px] text-center">
        {entry.user.name.split(' ')[0]}
      </p>
      <p className="text-[11px] md:text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1">
        {entry.user.xp.toLocaleString()} XP
      </p>
      <motion.div
        className={`${heights[position]} w-20 md:w-24 rounded-t-xl mt-3 shadow-inner relative overflow-hidden`}
        style={{
          background: position === 1
            ? 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)'
            : position === 2
              ? 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)'
              : 'linear-gradient(180deg, #DEB887 0%, #CD7F32 100%)',
        }}
        initial={{ height: 0 }}
        animate={{ height: '100%' }}
        transition={{ duration: 0.6, delay: delays[position] + 0.2, ease: 'easeOut' }}
      >
        <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/20 skew-x-[-20deg]" />
      </motion.div>
    </motion.div>
  );
}

function StatPanel() {
  const { t } = useLanguage();
  return (
    <div className="hidden lg:block w-[320px] flex-shrink-0 space-y-6">
      <div className="desktop-card p-6 border-t-4 border-t-primary">
        <h3 className="font-extrabold text-lg text-text-primary mb-4 flex items-center gap-2">
          <Target size={20} className="text-primary" /> {t('rank.yourRank')}
        </h3>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100">
            <img src={mockUser.avatarUrl} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-3xl font-black text-primary">#6</p>
            <p className="text-sm font-semibold text-text-secondary">{t('rank.diamondLeague')}</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-5">
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-muted font-medium">{t('rank.weeklyXP')}</span>
            <span className="font-bold text-text-primary">{mockUser.xp.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-muted font-medium">{t('rank.top3Check')}</span>
            <span className="font-bold text-danger">-1,900 XP</span>
          </div>
        </div>

        <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <Medal size={16} className="text-primary" />
            <span className="text-[13px] font-bold text-text-primary leading-tight">{t('rank.toTop5')}</span>
          </div>
          <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: '68%' }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="desktop-card p-6">
        <h3 className="font-extrabold text-lg text-text-primary mb-4 flex items-center gap-2">
          <BarChart3 size={20} className="text-blue-500" /> {t('rank.weeklyProgress')}
        </h3>
        <div className="h-40 flex items-end justify-between px-2 gap-2">
          {[40, 60, 30, 80, 50, 90, 70].map((height, i) => (
            <div key={i} className="flex flex-col items-center w-full gap-2">
              <motion.div 
                className="w-full bg-blue-100 rounded-t-md relative overflow-hidden"
                style={{ height: `${height}%` }}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                {i === 6 && <div className="absolute inset-0 bg-blue-500 opacity-60" />}
              </motion.div>
              <span className="text-[10px] font-semibold text-text-muted">
                {['M','T','W','T','F','S','S'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RankPage() {
  const { t } = useLanguage();
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');

  const top3 = mockLeaderboard.slice(0, 3);
  const rest = mockLeaderboard.slice(3);

  return (
    <PageContainer>
      <div className="flex flex-col lg:flex-row gap-8 pb-4 h-full">
        
        {/* Main Leaderboard Column */}
        <div className="flex-1 min-w-0 flex flex-col md:bg-white/50 md:backdrop-blur-xl md:rounded-3xl md:border border-white/80 md:shadow-lg overflow-hidden py-4 md:py-6 md:px-8">
          
          <div className="px-5 md:px-0 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-text-primary">{t('rank.globalLeaderboard')}</h1>
              <p className="text-xs md:text-sm text-text-secondary mt-1">{t('rank.competeWorldwide')}</p>
            </div>

            {/* Period Toggle */}
            <div className="bg-white rounded-full p-1 flex shadow-sm border border-gray-100 w-full md:w-64">
              {(['weekly', 'monthly'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`flex-1 py-2.5 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                    period === p
                      ? 'bg-primary text-white shadow-md'
                      : 'text-text-secondary hover:bg-gray-50'
                  }`}
                >
                  {p === 'weekly' ? t('rank.thisWeek') : t('rank.thisMonth')}
                </button>
              ))}
            </div>
          </div>

          {/* Podium */}
          <div className="flex items-end justify-center gap-6 md:gap-10 px-5 mb-10 pt-4">
            <PodiumUser entry={top3[1]} position={2} />
            <PodiumUser entry={top3[0]} position={1} />
            <PodiumUser entry={top3[2]} position={3} />
          </div>

          {/* Leaderboard List */}
          <div className="mx-5 md:mx-0 bg-white rounded-2xl overflow-hidden custom-scroll md:flex-1 shadow-sm border border-gray-50">
            {rest.map((entry, i) => (
              <motion.div
                key={entry.user.id}
                className={`flex items-center gap-4 px-5 py-4 transition-colors hover:bg-gray-50 cursor-pointer ${
                  entry.isCurrentUser ? 'bg-primary/5 hover:bg-primary/10 border-l-4 border-primary' : 'border-l-4 border-transparent'
                } ${i < rest.length - 1 ? 'border-b border-gray-50' : ''}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i + 0.6 }}
              >
                <span className={`w-8 text-center font-bold text-sm md:text-base ${
                  entry.isCurrentUser ? 'text-primary' : 'text-text-muted'
                }`}>
                  {entry.rank}
                </span>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                  <img src={entry.user.avatarUrl} alt={entry.user.name} className="w-full h-full object-cover bg-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[15px] font-bold truncate ${entry.isCurrentUser ? 'text-primary' : 'text-text-primary'}`}>
                    {entry.user.name}
                    {entry.isCurrentUser && <span className="text-xs font-semibold text-primary/70 ml-2 bg-primary/10 px-2 py-0.5 rounded text-[10px]">{t('rank.you')}</span>}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[11px] font-semibold text-text-muted bg-gray-100 px-2 py-0.5 rounded hover:bg-gray-200 transition-colors">Lv. {entry.user.level}</span>
                    <div className="flex items-center gap-1 bg-orange-50 px-2 py-0.5 rounded">
                      <Flame size={12} className="text-orange-500" />
                      <span className="text-[11px] font-bold text-orange-600">{entry.user.streak}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base md:text-lg font-black text-text-primary">{entry.user.xp.toLocaleString()}</p>
                  <p className="text-[11px] font-bold text-primary tracking-wide">XP</p>
                </div>
                {i === 0 && <TrendingUp size={18} className="text-primary ml-2 hidden sm:block" />}
              </motion.div>
            ))}
          </div>

          {/* Mobile Your Stats (hidden on LG where sidebar exists) */}
          <motion.div
            className="lg:hidden mx-5 mt-6 mb-4 bg-primary/5 rounded-2xl p-4 border border-primary/10 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Medal size={16} className="text-primary" />
              <span className="text-xs font-bold text-text-primary">{t('rank.keepGoing')}</span>
            </div>
            <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: '68%' }}
                transition={{ duration: 1, delay: 1.2 }}
              />
            </div>
          </motion.div>

        </div>

        {/* Desktop Side Stats Panel */}
        <StatPanel />

      </div>
    </PageContainer>
  );
}
