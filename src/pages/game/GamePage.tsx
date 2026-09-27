import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, Crown, Gamepad2, Headphones, Keyboard, Lock, Pencil, Play, Search, Timer, Trophy, Zap } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { useAuth } from '../../auth/AuthContext';
import { FREE_GAME_MODE_IDS, hasFullAccess } from '../../utils/accessControl';
import { normalizeTargetLanguage } from '../../features/chat/targetLanguage';
import { arabicGameCategoryCopy, arabicGameHomeCopy, arabicGameModeCopy } from '../../features/game/arabicGameContent';

const arcadeMascotSrc = '/assets/mascot/89b30199-8e8b-40c7-8b41-6684be727e2e.png';

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
    id: 'tense-master',
    category: 'grammar',
    title: 'Tense Master',
    subtitle: 'Latih pola present, past, dan future dalam 30 soal per level.',
    icon: Timer,
    color: '#2563EB',
    bg: '#DBEAFE',
    route: '/game/grammar/tense-master/play?difficulty=easy',
    status: 'Tenses',
  },
  {
    id: 'verb-forms',
    category: 'grammar',
    title: 'Verb Forms',
    subtitle: 'Pilih dan susun bentuk verb yang tepat dari Easy sampai Hard.',
    icon: Pencil,
    color: '#16A34A',
    bg: '#DCFCE7',
    route: '/game/grammar/verb-forms/play?difficulty=easy',
    status: 'Verbs',
  },
  {
    id: 'article-dash',
    category: 'grammar',
    title: 'Article Dash',
    subtitle: 'Latih a, an, the, dan zero article lewat 30 ronde cepat.',
    icon: BookOpen,
    color: '#EA580C',
    bg: '#FFEDD5',
    route: '/game/grammar/article-dash/play?difficulty=easy',
    status: 'Articles',
  },
  {
    id: 'preposition-path',
    category: 'grammar',
    title: 'Preposition Path',
    subtitle: 'Kuasai in, on, at, to, for, from, dan preposition umum lain.',
    icon: Search,
    color: '#0EA5E9',
    bg: '#E0F2FE',
    route: '/game/grammar/preposition-path/play?difficulty=easy',
    status: 'Prepositions',
  },
  {
    id: 'modal-quest',
    category: 'grammar',
    title: 'Modal Quest',
    subtitle: 'Latih can, should, must, would, dan modal verbs lainnya.',
    icon: Zap,
    color: '#CA8A04',
    bg: '#FEF3C7',
    route: '/game/grammar/modal-quest/play?difficulty=easy',
    status: 'Modals',
  },
  {
    id: 'conditional-run',
    category: 'grammar',
    title: 'Conditional Run',
    subtitle: 'Bangun kalimat if clause dan conditional bertahap.',
    icon: Brain,
    color: '#9333EA',
    bg: '#F3E8FF',
    route: '/game/grammar/conditional-run/play?difficulty=easy',
    status: 'If Clauses',
  },
  {
    id: 'question-builder',
    category: 'grammar',
    title: 'Question Builder',
    subtitle: 'Susun yes/no question dan WH question dengan cepat.',
    icon: Keyboard,
    color: '#0891B2',
    bg: '#CFFAFE',
    route: '/game/grammar/question-builder/play?difficulty=easy',
    status: 'Questions',
  },
  {
    id: 'error-fix',
    category: 'grammar',
    title: 'Error Fix',
    subtitle: 'Temukan pola grammar yang benar dari kalimat yang membingungkan.',
    icon: Trophy,
    color: '#DC2626',
    bg: '#FEE2E2',
    route: '/game/grammar/error-fix/play?difficulty=easy',
    status: 'Correction',
  },
  {
    id: 'clause-connect',
    category: 'grammar',
    title: 'Clause Connect',
    subtitle: 'Latih relative clause, connectors, dan kalimat kompleks.',
    icon: Crown,
    color: '#7C3AED',
    bg: '#EDE9FE',
    route: '/game/grammar/clause-connect/play?difficulty=easy',
    status: 'Clauses',
  },
  {
    id: 'grammar-mix',
    category: 'grammar',
    title: 'Grammar Mix',
    subtitle: 'Campuran grammar challenge untuk review Easy, Medium, dan Hard.',
    icon: Gamepad2,
    color: '#0F766E',
    bg: '#CCFBF1',
    route: '/game/grammar/grammar-mix/play?difficulty=easy',
    status: 'Mixed',
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

const gameCategories = [
  { id: 'all', label: 'All' },
  { id: 'vocabulary', label: 'Vocabulary' },
  { id: 'grammar', label: 'Grammar' },
  { id: 'listening', label: 'Listening' },
  { id: 'writing', label: 'Writing' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'reading', label: 'Reading' },
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
  const { user } = useAuth();
  const isArabicGame = normalizeTargetLanguage(user?.persona?.targetLanguage) === 'Arabic';
  const fullAccess = hasFullAccess(user);
  const [activeCategory, setActiveCategory] = useState('all');
  const stats = useMemo(() => readStats(), []);
  const dailyProgress = Math.min(100, Math.round((stats.completed / 3) * 100));
  const filteredGameModes = useMemo(() => {
    if (activeCategory === 'all') return gameModes;
    return gameModes.filter((mode) => mode.category === activeCategory);
  }, [activeCategory]);
  const gameAccent = isArabicGame ? '#0F766E' : '#7EC3E6';
  const heroBg = isArabicGame ? '#0F766E' : '#7EC3E6';

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8 px-5 md:px-0">
        <motion.div
          className="mt-6 md:mt-0 rounded-3xl overflow-hidden relative"
          style={{ backgroundColor: heroBg }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-[-40px] right-[-20px] w-56 h-56 rounded-full bg-white" />
            <div className="absolute bottom-[-60px] left-[-30px] w-44 h-44 rounded-full bg-[#1E6F9F]" />
          </div>
          <div className="relative p-6 md:p-8">
            <img
              src={arcadeMascotSrc}
              alt=""
              className="pointer-events-none absolute bottom-0 right-[-42px] z-0 hidden h-[150px] max-w-none object-contain sm:block md:right-[-20px] md:h-[176px] lg:right-8 lg:h-[198px] xl:right-16"
            />
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="max-w-[min(100%,28rem)] sm:max-w-[25rem] md:max-w-[27rem]">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <Gamepad2 size={30} className="text-white" />
                </div>
                <h1 className="text-white text-2xl md:text-3xl font-black">{isArabicGame ? arabicGameHomeCopy.title : 'Fluently Arcade'}</h1>
                <p className="text-white/80 text-sm font-semibold mt-1 max-w-[26rem] leading-relaxed">
                  {isArabicGame ? arabicGameHomeCopy.subtitle : 'Latihan vocabulary, grammar, listening,'}
                  {!isArabicGame && <span className="block">dan writing dalam format game cepat.</span>}
                </p>
                {isArabicGame && (
                  <div className="mt-4 inline-flex flex-col rounded-2xl border border-white/20 bg-white/15 px-4 py-2">
                    <span dir="rtl" lang="ar" className="text-2xl font-black leading-relaxed text-white">تَحَدِّي العَرَبِيَّة</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Arabic game mode aktif</span>
                  </div>
                )}
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
            [isArabicGame ? 'Dimainkan' : 'Played', stats.played || 0],
            [isArabicGame ? 'Selesai' : 'Complete', stats.completed || 0],
            [isArabicGame ? 'Terbaik' : 'Best', stats.bestScore || 0],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white border border-gray-100 p-4 text-center shadow-sm">
              <p className="text-[20px] font-black text-[#1A1A2E]">{value}</p>
              <p className="text-[11px] font-bold text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        <section className="mt-8">
          <div className="flex flex-col gap-4 mb-4">
            <div>
              <h2 className="text-[20px] font-black text-[#1A1A2E]">{isArabicGame ? arabicGameHomeCopy.chooseTitle : 'Choose Game'}</h2>
              <p className="text-[13px] text-gray-500 font-medium">{isArabicGame ? arabicGameHomeCopy.chooseSubtitle : 'Filter game berdasarkan skill yang ingin kamu latih.'}</p>
            </div>

            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {gameCategories.map((category) => {
                const active = activeCategory === category.id;
                const count = category.id === 'all' ? gameModes.length : gameModes.filter((mode) => mode.category === category.id).length;

                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`h-10 shrink-0 rounded-full px-4 text-[12px] font-black border transition-colors ${active ? 'bg-[#1A1A2E] text-white border-[#1A1A2E]' : 'bg-white text-gray-500 border-gray-100 hover:border-[#7EC3E6] hover:text-[#2F86B5]'}`}
                  >
                    {isArabicGame ? arabicGameCategoryCopy[category.id] || category.label : category.label}
                    <span className={`ml-2 ${active ? 'text-white/65' : 'text-gray-300'}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredGameModes.map((mode, index) => {
              const Icon = mode.icon;
              const copy = isArabicGame ? arabicGameModeCopy[mode.id] : null;
              const best = stats.modeBest?.[mode.title] || 0;
              const locked = !fullAccess && !FREE_GAME_MODE_IDS.includes(mode.id);
              return (
                <motion.button
                  key={mode.id}
                  onClick={() => locked ? navigate('/upgrade') : navigate(mode.route)}
                  className={`text-left rounded-3xl bg-white border p-5 shadow-sm relative overflow-hidden group ${locked ? 'border-gray-100 opacity-80' : 'border-gray-100'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                  whileHover={{ y: -4, boxShadow: `0 16px 38px ${(isArabicGame ? gameAccent : mode.color)}22` }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: isArabicGame ? '#CCFBF1' : mode.bg }}>
                      <Icon size={27} style={{ color: isArabicGame ? gameAccent : mode.color }} />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black" style={{ color: isArabicGame ? gameAccent : mode.color, backgroundColor: `${isArabicGame ? gameAccent : mode.color}14` }}>
                      {locked ? 'Pro' : copy?.status || mode.status}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[17px] font-black text-[#1A1A2E]">{copy?.title || mode.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-gray-500 font-medium">{copy?.subtitle || mode.subtitle}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-400 capitalize">{isArabicGame ? arabicGameCategoryCopy[mode.category] || mode.category : mode.category} · {isArabicGame ? 'Skor terbaik' : 'Best score'}: {best}</span>
                    <span className="w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: isArabicGame ? gameAccent : mode.color }}>
                      {locked ? <Lock size={15} /> : <Play size={15} fill="currentColor" />}
                    </span>
                  </div>
                  {locked && (
                    <div className="absolute inset-0 rounded-3xl bg-white/55 opacity-0 backdrop-blur-[1px] transition group-hover:opacity-100">
                      <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-[#1A1A2E] px-4 py-3 text-xs font-black text-white">
                        Upgrade untuk membuka game ini
                      </div>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {filteredGameModes.length === 0 && (
            <div className="rounded-3xl bg-white border border-gray-100 p-8 text-center shadow-sm">
              <p className="text-[15px] font-black text-[#1A1A2E]">Belum ada game di kategori ini.</p>
              <p className="text-[13px] text-gray-500 font-medium mt-1">Pilih kategori lain untuk mulai latihan.</p>
            </div>
          )}
        </section>

        <section className="mt-8 rounded-3xl bg-white border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] flex items-center justify-center text-[#F59E0B]">
                <Trophy size={25} />
              </div>
              <div>
                <h3 className="font-black text-[#1A1A2E]">Daily Quest</h3>
                <p className="text-[12px] text-gray-500 font-medium">{isArabicGame ? arabicGameHomeCopy.dailyQuestSubtitle : 'Selesaikan 3 game untuk bonus arcade.'}</p>
              </div>
            </div>
            <span className="text-[13px] font-black" style={{ color: gameAccent }}>{Math.min(stats.completed || 0, 3)} / 3</span>
          </div>
          <div className="mt-4 h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ backgroundColor: gameAccent }} initial={{ width: 0 }} animate={{ width: `${dailyProgress}%` }} />
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
