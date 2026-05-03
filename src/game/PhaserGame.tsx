import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import type { GameType } from '../types';
import { WordMatchScene } from './scenes/WordMatchScene';
import { SpellingBeeScene } from './scenes/SpellingBeeScene';
import { SentenceBuilderScene } from './scenes/SentenceBuilderScene';

interface PhaserGameProps {
  gameType: GameType;
  width?: number;
  height?: number;
}

const sceneMap = {
  'word-match': WordMatchScene,
  'spelling-bee': SpellingBeeScene,
  'sentence-builder': SentenceBuilderScene,
};

export default function PhaserGame({ gameType, width = 380, height = 400 }: PhaserGameProps) {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameContainerRef.current) return;

    const SceneClass = sceneMap[gameType];
    if (!SceneClass) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: gameContainerRef.current,
      width,
      height,
      backgroundColor: '#FFF5F0',
      scene: SceneClass,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      render: {
        antialias: true,
        pixelArt: false,
      },
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [gameType, width, height]);

  return (
    <div
      ref={gameContainerRef}
      className="rounded-2xl overflow-hidden"
      style={{ width, height }}
    />
  );
}
