import { motion } from 'framer-motion';
import { Flame, TrendingUp, Crown, Medal, BarChart3, Target, Trophy } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import { mockLeaderboard } from '../data/mockData';
import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../auth/AuthContext';

function PodiumUser({ entry, position, maxXp }: { entry: typeof mockLeaderboard[0]; position: 1 | 2 | 3; maxXp: number }) {
  const heights = { 1: 150, 2: 118, 3: 98 };
  const sizes = { 1: 'h-20 w-20 md:h-24 md:w-24', 2: 'h-16 w-16 md:h-20 md:w-20', 3: 'h-16 w-16 md:h-20 md:w-20' };
  const delays = { 1: 0.3, 2: 0.1, 3: 0.5 };
  const colors = {
    1: { border: '#F7C948', bg: 'from-amber-100 to-orange-100', text: 'text-amber-600' },
    2: { border: '#BFC7D5', bg: 'from-slate-100 to-slate-50', text: 'text-slate-500' },
    3: { border: '#C47A35', bg: 'from-orange-100 to-amber-50', text: 'text-orange-600' },
  };
  const percent = Math.round((entry.user.xp / maxXp) * 100);

  return (
    <motion.div
      className="flex min-w-0 flex-1 flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delays[position], duration: 0.5 }}
    >
      <div className="relative z-10 mb-3">
        <div
          className={`${sizes[position]} overflow-hidden rounded-full border-[5px] bg-white shadow-xl`}
          style={{ borderColor: colors[position].border }}
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
        <div className={`absolute -bottom-2 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white text-xs font-black shadow-md ${colors[position].text} bg-white`}>
          {position}
        </div>
      </div>
      <p className="max-w-[110px] truncate text-center text-sm font-black text-text-primary">{entry.user.name.split(' ')[0]}</p>
      <p className="mt-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-black text-primary">{entry.user.xp.toLocaleString()} XP</p>
      <motion.div
        className={`relative mt-3 flex w-full max-w-[118px] items-end justify-center overflow-hidden rounded-t-[28px] bg-gradient-to-b ${colors[position].bg} shadow-inner`}
        initial={{ height: 0 }}
        animate={{ height: heights[position] }}
        transition={{ duration: 0.6, delay: delays[position] + 0.2, ease: 'easeOut' }}
      >
        <div className="absolute inset-x-4 bottom-4 h-2 overflow-hidden rounded-full bg-white/70">
          <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ delay: delays[position] + 0.55 }} />
        </div>
        <span className="absolute bottom-8 text-[10px] font-black text-text-muted">{percent}%</span>
      </motion.div>
    </motion.div>
  );
}

function StatPanel({ period }: { period: 'weekly' | 'monthly' }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const userXp = user?.xp ?? 0;
  const userAvatarUrl = user?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.displayName || user?.name || 'Learner')}&backgroundColor=b6e3f4`;
  const weeklyBars = [0, 0, 0, 0, 0, 0, 0];
  const weeklyXp   = [0, 0, 0, 0, 0, 0, 0];
  const top5Xp = mockLeaderboard[4]?.user.xp ?? 0;
  const targetToTop5 = Math.max(0, top5Xp - userXp + 1);
  const top5Progress = top5Xp > 0 ? Math.min(100, Math.round((userXp / top5Xp) * 100)) : 0;

  return (
    <div className="hidden lg:block w-[320px] flex-shrink-0 space-y-6">
      <div className="desktop-card overflow-hidden border-t-4 border-t-primary p-6">
        <h3 className="font-extrabold text-lg text-text-primary mb-4 flex items-center gap-2">
          <Target size={20} className="text-primary" /> {t('rank.yourRank')}
        </h3>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-primary/20 shadow-sm">
            <img src={userAvatarUrl} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-3xl font-black text-primary">#6</p>
            <p className="text-sm font-semibold text-text-secondary">{t('rank.diamondLeague')}</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-5">
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-muted font-medium">{t('rank.weeklyXP')}</span>
            <span className="font-bold text-text-primary">{userXp.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-muted font-medium">{t('rank.top3Check')}</span>
            <span className="font-bold text-danger">-{targetToTop5.toLocaleString()} XP</span>
          </div>
        </div>

        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <Medal size={16} className="text-primary" />
            <span className="text-[13px] font-bold text-text-primary leading-tight">{targetToTop5.toLocaleString()} XP to Top 5</span>
          </div>
          <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${top5Progress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="desktop-card p-6 overflow-hidden">
        <h3 className="font-extrabold text-lg text-text-primary mb-1 flex items-center gap-2">
          <BarChart3 size={20} className="text-blue-500" /> {period === 'weekly' ? t('rank.weeklyProgress') : t('rank.monthlyMomentum')}
        </h3>
        <p className="mb-4 text-xs font-semibold text-text-muted">XP activity across the selected period.</p>
        <div className="h-44 flex items-end justify-between gap-2 rounded-2xl bg-gray-50 px-4 pb-4 pt-5">
          {weeklyBars.map((height, i) => (
            <div key={i} className="flex flex-col items-center w-full gap-2">
              <motion.div 
                className="group relative w-full rounded-t-xl bg-blue-100 overflow-hidden"
                style={{ height: `${height}%` }}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <div className={`absolute inset-0 ${i === 6 ? 'bg-primary' : 'bg-primary/45'}`} />
                <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded-lg bg-text-primary px-2 py-1 text-[10px] font-black text-white group-hover:block">
                  {weeklyXp[i]} XP
                </div>
              </motion.div>
              <span className="text-[10px] font-semibold text-text-muted">
                {['M','T','W','T','F','S','S'][i]}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-primary/5 p-3">
            <p className="text-[10px] font-black uppercase tracking-wider text-primary">Best Day</p>
            <p className="mt-1 text-sm font-black text-text-primary">Saturday</p>
          </div>
          <div className="rounded-2xl bg-orange-50 p-3">
            <p className="text-[10px] font-black uppercase tracking-wider text-orange-500">Avg XP</p>
            <p className="mt-1 text-sm font-black text-text-primary">350/day</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RankPage() {
  const { t } = useLanguage();
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');

  const visibleLeaderboard = period === 'monthly'
    ? mockLeaderboard.map((entry, index) => ({
      ...entry,
      user: { ...entry.user, xp: Math.round(entry.user.xp * (index < 3 ? 4.2 : 3.8)) },
    }))
    : mockLeaderboard;
  const top3 = visibleLeaderboard.slice(0, 3);
  const rest = visibleLeaderboard.slice(3);
  const maxXp = top3[0]?.user.xp || 1;
  const userEntry = visibleLeaderboard.find((entry) => entry.isCurrentUser);

  return (
    <PageContainer>
      <div className="flex flex-col lg:flex-row gap-6 pb-6 h-full">
        
        {/* Main Leaderboard Column */}
        <div className="flex-1 min-w-0 flex flex-col md:bg-white/70 md:backdrop-blur-xl md:rounded-[32px] md:border border-white/80 md:shadow-lg overflow-hidden py-4 md:py-6 md:px-8">
          
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

          {visibleLeaderboard.length === 0 ? (
            <div className="mx-5 md:mx-0 rounded-[26px] border border-dashed border-gray-200 bg-white p-10 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50">
                <Trophy size={24} className="text-gray-300" />
              </div>
              <p className="font-bold text-text-secondary">Leaderboard belum tersedia</p>
              <p className="mt-1 text-sm text-text-muted">Mulai belajar untuk muncul di papan peringkat.</p>
            </div>
          ) : (
          <>
          {/* Podium */}
          <div className="mx-5 mb-6 rounded-[30px] border border-primary/10 bg-gradient-to-b from-sky-50 to-white px-4 pt-6 shadow-sm md:mx-0 md:px-8">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Top Performers</p>
                <h2 className="text-lg font-black text-text-primary">This {period === 'weekly' ? 'Week' : 'Month'} Champions</h2>
              </div>
              <div className="rounded-2xl bg-white px-3 py-2 text-right shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-wider text-text-muted">Top XP</p>
                <p className="text-sm font-black text-primary">{maxXp.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-end justify-center gap-3 md:gap-8">
              <PodiumUser entry={top3[1]} position={2} maxXp={maxXp} />
              <PodiumUser entry={top3[0]} position={1} maxXp={maxXp} />
              <PodiumUser entry={top3[2]} position={3} maxXp={maxXp} />
            </div>
          </div>

          {/* Leaderboard List */}
          <div className="mx-5 md:mx-0 bg-white rounded-[26px] overflow-hidden custom-scroll md:flex-1 shadow-sm border border-gray-100">
            <div className="hidden grid-cols-[72px_1fr_110px] border-b border-gray-100 bg-gray-50 px-5 py-3 text-[10px] font-black uppercase tracking-wider text-text-muted md:grid">
              <span>Rank</span>
              <span>Learner</span>
              <span className="text-right">Score</span>
            </div>
            {rest.map((entry, i) => (
              <motion.div
                key={entry.user.id}
                className={`flex items-center gap-4 px-5 py-4 transition-colors hover:bg-gray-50 cursor-pointer ${
                  entry.isCurrentUser ? 'bg-primary/5 hover:bg-primary/10 border-l-4 border-primary shadow-inner' : 'border-l-4 border-transparent'
                } ${i < rest.length - 1 ? 'border-b border-gray-50' : ''}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i + 0.6 }}
              >
                <span className={`w-8 text-center font-black text-sm md:text-base ${
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
          </>
          )}

          {/* Mobile Your Stats (hidden on LG where sidebar exists) */}
          <motion.div
            className="lg:hidden mx-5 mt-6 mb-4 bg-primary/5 rounded-2xl p-4 border border-primary/10 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Medal size={16} className="text-primary" />
              <span className="text-xs font-bold text-text-primary">Rank #{userEntry?.rank || 6} · {t('rank.keepGoing')}</span>
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
        <StatPanel period={period} />

      </div>
    </PageContainer>
  );
}
