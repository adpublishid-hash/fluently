import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Gamepad2, BookOpen, Type, AlignLeft } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import PhaserGame from '../game/PhaserGame';
import eventBus from '../game/EventBus';
import type { GameType } from '../types';
import { useState, useEffect } from 'react';

const games = [
  {
    id: 'word-match' as GameType,
    title: 'Word Match',
    description: 'Match English words with their meanings',
    emoji: '🔤',
    icon: BookOpen,
    color: '#2ECC71',
    bgColor: '#E8F8F0',
  },
  {
    id: 'spelling-bee' as GameType,
    title: 'Spelling Bee',
    description: 'Arrange letters to spell words correctly',
    emoji: '🐝',
    icon: Type,
    color: '#F39C12',
    bgColor: '#FFF8E1',
  },
  {
    id: 'sentence-builder' as GameType,
    title: 'Sentence Builder',
    description: 'Build correct sentences from scrambled words',
    emoji: '📝',
    icon: AlignLeft,
    color: '#3498DB',
    bgColor: '#EEF4FF',
  },
];

export default function GamePage({ onBack }: { onBack: () => void }) {
  const [activeGame, setActiveGame] = useState<GameType | null>(null);
  const [lastScore, setLastScore] = useState<number | null>(null);

  useEffect(() => {
    const unsub = eventBus.on('game-complete', (score) => {
      setLastScore(score as number);
      setActiveGame(null);
    });
    return unsub;
  }, []);

  return (
    <PageContainer>
      <div className="pt-12 pb-4">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center cursor-pointer"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <ArrowLeft size={18} className="text-text-primary" />
          </motion.button>
          <div>
            <h1 className="text-xl font-extrabold text-text-primary">Mini Games</h1>
            <p className="text-xs text-text-secondary">Learn while having fun! 🎮</p>
          </div>
        </div>

        {/* Last Score */}
        <AnimatePresence>
          {lastScore !== null && (
            <motion.div
              className="mx-5 mb-4 bg-primary/10 rounded-2xl p-4 flex items-center gap-3 border border-primary/20"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Trophy size={24} className="text-primary" />
              <div>
                <p className="text-sm font-bold text-text-primary">Game Complete! 🎉</p>
                <p className="text-xs text-text-secondary">You scored <span className="text-primary font-bold">{lastScore}</span> points!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Game */}
        {activeGame && (
          <motion.div
            className="mx-5 mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-text-primary">
                {games.find(g => g.id === activeGame)?.title}
              </h3>
              <button
                onClick={() => setActiveGame(null)}
                className="text-xs text-danger font-semibold cursor-pointer"
              >
                Exit Game
              </button>
            </div>
            <div className="flex justify-center">
              <PhaserGame
                gameType={activeGame}
                width={Math.min(380, window.innerWidth - 40)}
                height={380}
              />
            </div>
          </motion.div>
        )}

        {/* Game Selection */}
        {!activeGame && (
          <div className="px-5 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Gamepad2 size={18} className="text-primary" />
              <h3 className="font-extrabold text-sm text-text-primary">Choose a Game</h3>
            </div>
            {games.map((game, i) => {
              const Icon = game.icon;
              return (
                <motion.button
                  key={game.id}
                  className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 text-left cursor-pointer"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ y: -2, boxShadow: 'var(--shadow-card-hover)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setLastScore(null);
                    setActiveGame(game.id);
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: game.bgColor }}
                  >
                    {game.emoji}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-text-primary">{game.title}</h4>
                    <p className="text-xs text-text-secondary mt-0.5">{game.description}</p>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${game.color}15` }}
                  >
                    <Icon size={16} style={{ color: game.color }} />
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Daily Challenge Banner */}
        {!activeGame && (
          <motion.div
            className="mx-5 mt-6 rounded-2xl overflow-hidden relative"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="p-5">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                ⚡ Daily Challenge
              </span>
              <h3 className="text-white font-extrabold text-base mt-3">
                Complete all 3 games today!
              </h3>
              <p className="text-white/80 text-xs mt-1">
                Earn 500 bonus XP for finishing all mini-games
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 rounded-full bg-white" />
                </div>
                <span className="text-white text-xs font-bold">1/3</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </PageContainer>
  );
}
