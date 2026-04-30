import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, Crown, Gamepad2, Headphones, Keyboard, Pencil, Play, Search, Timer, Trophy, Zap } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';

const gameModes = [
  {
    id: 'word-match',
    category: 'vocabulary',
    title: 'Word Match',
    subtitle: 'Match picture to word: Easy 30 item, lalu Medium dan Hard.',
    icon: BookOpen,
    color: '#4FA3D1',
    bg: '#EAF7FC',
    route: '/game/vocabulary/word-match/play?difficulty=easy',
    status: 'Playable',
  },
  {
    id: 'letter-quest',
    category: 'vocabulary',
    title: 'Letter Quest',
    subtitle: 'Mulai Easy 30 soal, lalu unlock Medium dan Hard.',
    icon: Pencil,
    color: '#8B6BC0',
    bg: '#F3E8FF',
    route: '/game/vocabulary/letter-quest/play?difficulty=easy',
    status: 'Visual',
  },
  {
    id: 'sentence-builder',
    category: 'grammar',
    title: 'Sentence Builder',
    subtitle: 'Susun kalimat: Easy 30 soal, lalu Medium dan Hard.',
    icon: Brain,
    color: '#8E44AD',
    bg: '#F4ECF7',
    route: '/game/grammar/sentence-builder/play?difficulty=easy',
    status: 'Playable',
  },
  {
    id: 'listen-tap',
    category: 'listening',
    title: 'Listen & Tap',
    subtitle: 'Dengarkan TTS: Easy 30 soal, lalu Medium dan Hard.',
    icon: Headphones,
    color: '#F59E0B',
    bg: '#FEF3C7',
    route: '/game/listening/listen-tap/play?difficulty=easy',
    status: 'Audio',
  },
  {
    id: 'memory-card',
    category: 'vocabulary',
    title: 'Memory Card',
    subtitle: 'Cocokkan visual dan kata: Easy 30 pasangan, lalu Medium dan Hard.',
    icon: Zap,
    color: '#10B981',
    bg: '#ECFDF5',
    route: '/game/vocabulary/memory-card/play?difficulty=easy',
    status: 'Pairing',
  },
  {
    id: 'find-words',
    category: 'vocabulary',
    title: 'Find the Words',
    subtitle: 'Cari kata di grid dan tulis jawabannya: Easy 30, lalu Medium dan Hard.',
    icon: Search,
    color: '#2F80ED',
    bg: '#EAF7FC',
    route: '/game/vocabulary/find-words/play?difficulty=easy',
    status: 'Word Search',
  },
  {
    id: 'speed-quiz',
    category: 'grammar',
    title: 'Speed Quiz',
    subtitle: 'Jawab sebanyak mungkin sebelum waktu habis.',
    icon: Timer,
    color: '#EF4444',
    bg: '#FEF2F2',
    route: '/game/grammar/speed-quiz/play?difficulty=medium',
    status: 'Timed',
  },
  {
    id: 'typing-sprint',
    category: 'writing',
    title: 'Typing Sprint',
    subtitle: 'Ketik kata Inggris dari arti dan hint.',
    icon: Keyboard,
    color: '#6366F1',
    bg: '#EEF2FF',
    route: '/game/writing/typing-sprint/play?difficulty=medium',
    status: 'Typing',
  },
  {
    id: 'boss-challenge',
    category: 'speaking',
    title: 'Boss Challenge',
    subtitle: 'Mode cepat dengan tekanan waktu dan reward lebih besar.',
    icon: Crown,
    color: '#A16207',
    bg: '#FEFCE8',
    route: '/game/speaking/clan-battle/play?difficulty=hard',
    status: 'Hard',
  },
];

function readStats() {
  try {
    const raw = localStorage.getItem('fluently_game_stats');
    return raw ? JSON.parse(raw) : { xp: 0, played: 0, completed: 0, bestScore: 0, modeBest: {} };
  } catch {
    return { xp: 0, played: 0, completed: 0, bestScore: 0, modeBest: {} };
  }
}

export default function GamePage() {
  const navigate = useNavigate();
  const stats = useMemo(() => readStats(), []);
  const dailyProgress = Math.min(100, Math.round((stats.completed / 3) * 100));

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8 px-5 md:px-0">
        <motion.div
          className="mt-6 md:mt-0 rounded-3xl overflow-hidden relative bg-[#7EC3E6]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-[-40px] right-[-20px] w-56 h-56 rounded-full bg-white" />
            <div className="absolute bottom-[-60px] left-[-30px] w-44 h-44 rounded-full bg-[#1E6F9F]" />
          </div>
          <div className="relative p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <Gamepad2 size={30} className="text-white" />
                </div>
                <h1 className="text-white text-2xl md:text-3xl font-black">Fluently Arcade</h1>
                <p className="text-white/80 text-sm font-semibold mt-1 max-w-md">
                  Latihan vocabulary, grammar, listening, dan writing dalam format game cepat.
                </p>
              </div>
              <div className="bg-white/18 rounded-2xl px-4 py-3 text-right">
                <p className="text-white/70 text-[11px] font-bold uppercase tracking-wider">Game XP</p>
                <p className="text-white text-2xl font-black">{stats.xp || 0}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            ['Played', stats.played || 0],
            ['Complete', stats.completed || 0],
            ['Best', stats.bestScore || 0],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white border border-gray-100 p-4 text-center shadow-sm">
              <p className="text-[20px] font-black text-[#1A1A2E]">{value}</p>
              <p className="text-[11px] font-bold text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        <section className="mt-8">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-[20px] font-black text-[#1A1A2E]">Choose Game</h2>
              <p className="text-[13px] text-gray-500 font-medium">Mulai dari mode ringan yang langsung bisa dimainkan.</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {gameModes.map((mode, index) => {
              const Icon = mode.icon;
              const best = stats.modeBest?.[mode.title] || 0;
              return (
                <motion.button
                  key={mode.id}
                  onClick={() => navigate(mode.route)}
                  className="text-left rounded-3xl bg-white border border-gray-100 p-5 shadow-sm relative overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                  whileHover={{ y: -4, boxShadow: `0 16px 38px ${mode.color}22` }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: mode.bg }}>
                      <Icon size={27} style={{ color: mode.color }} />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black" style={{ color: mode.color, backgroundColor: `${mode.color}14` }}>
                      {mode.status}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[17px] font-black text-[#1A1A2E]">{mode.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-gray-500 font-medium">{mode.subtitle}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-400">Best score: {best}</span>
                    <span className="w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: mode.color }}>
                      <Play size={15} fill="currentColor" />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] flex items-center justify-center text-[#F59E0B]">
                <Trophy size={25} />
              </div>
              <div>
                <h3 className="font-black text-[#1A1A2E]">Daily Quest</h3>
                <p className="text-[12px] text-gray-500 font-medium">Selesaikan 3 game untuk bonus arcade.</p>
              </div>
            </div>
            <span className="text-[13px] font-black text-[#7EC3E6]">{Math.min(stats.completed || 0, 3)} / 3</span>
          </div>
          <div className="mt-4 h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div className="h-full bg-[#7EC3E6] rounded-full" initial={{ width: 0 }} animate={{ width: `${dailyProgress}%` }} />
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
