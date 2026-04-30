import Phaser from 'phaser';
import eventBus from '../EventBus';

interface WordPair {
  word: string;
  meaning: string;
}

const WORD_PAIRS: WordPair[] = [
  { word: 'Ubiquitous', meaning: 'Found everywhere' },
  { word: 'Ephemeral', meaning: 'Short-lived' },
  { word: 'Resilient', meaning: 'Able to recover' },
  { word: 'Eloquent', meaning: 'Fluent speaker' },
  { word: 'Pragmatic', meaning: 'Practical approach' },
  { word: 'Ambiguous', meaning: 'Unclear meaning' },
  { word: 'Diligent', meaning: 'Hardworking' },
  { word: 'Candid', meaning: 'Honest & direct' },
];

export class WordMatchScene extends Phaser.Scene {
  private score = 0;
  private matches = 0;
  private totalPairs = 4;
  private scoreText!: Phaser.GameObjects.Text;
  private selectedWord: Phaser.GameObjects.Container | null = null;
  private selectedMeaning: Phaser.GameObjects.Container | null = null;
  private wordContainers: Phaser.GameObjects.Container[] = [];
  private meaningContainers: Phaser.GameObjects.Container[] = [];
  private currentPairs: WordPair[] = [];
  private gameWidth = 0;
  private gameHeight = 0;

  constructor() {
    super({ key: 'WordMatchScene' });
  }

  create() {
    this.gameWidth = Number(this.scale.width);
    this.gameHeight = Number(this.scale.height);
    this.score = 0;
    this.matches = 0;
    this.selectedWord = null;
    this.selectedMeaning = null;
    this.wordContainers = [];
    this.meaningContainers = [];

    // Background
    this.cameras.main.setBackgroundColor('#FFF5F0');

    // Title
    this.add.text(this.gameWidth / 2, 30, '🔤 Word Match', {
      fontSize: '20px',
      fontFamily: 'Plus Jakarta Sans, Arial',
      color: '#1A1A2E',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Score
    this.scoreText = this.add.text(this.gameWidth / 2, 60, 'Score: 0', {
      fontSize: '14px',
      fontFamily: 'Plus Jakarta Sans, Arial',
      color: '#2ECC71',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Shuffle and pick pairs
    const shuffled = Phaser.Utils.Array.Shuffle([...WORD_PAIRS]);
    this.currentPairs = shuffled.slice(0, this.totalPairs);

    // Create word cards on the left
    const startY = 100;
    const cardHeight = 55;
    const gap = 10;

    this.currentPairs.forEach((pair, i) => {
      const y = startY + i * (cardHeight + gap);
      const container = this.createCard(30, y, pair.word, 'word', i, this.gameWidth / 2 - 40);
      this.wordContainers.push(container);
    });

    // Shuffle meanings
    const shuffledMeanings = Phaser.Utils.Array.Shuffle([...this.currentPairs]);

    shuffledMeanings.forEach((pair, i) => {
      const y = startY + i * (cardHeight + gap);
      const container = this.createCard(this.gameWidth / 2 + 10, y, pair.meaning, 'meaning', this.currentPairs.indexOf(pair), this.gameWidth / 2 - 40);
      this.meaningContainers.push(container);
    });

    // Instruction
    this.add.text(this.gameWidth / 2, this.gameHeight - 30, 'Tap a word, then tap its meaning!', {
      fontSize: '11px',
      fontFamily: 'Plus Jakarta Sans, Arial',
      color: '#9CA3AF',
    }).setOrigin(0.5);
  }

  private createCard(x: number, y: number, text: string, type: 'word' | 'meaning', pairIndex: number, width: number): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);

    const bg = this.add.rectangle(0, 0, width, 48, type === 'word' ? 0xE8F8F0 : 0xEEF4FF, 1)
      .setOrigin(0)
      .setStrokeStyle(2, 0xE5E7EB);
    const label = this.add.text(width / 2, 24, text, {
      fontSize: '12px',
      fontFamily: 'Plus Jakarta Sans, Arial',
      color: '#1A1A2E',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: width - 16 },
    }).setOrigin(0.5);

    container.add([bg, label]);
    container.setSize(width, 48);
    container.setData('type', type);
    container.setData('pairIndex', pairIndex);
    container.setData('bg', bg);
    container.setData('matched', false);

    bg.setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.onCardClick(container));

    return container;
  }

  private onCardClick(container: Phaser.GameObjects.Container) {
    if (container.getData('matched')) return;

    const type = container.getData('type');
    const bg = container.getData('bg') as Phaser.GameObjects.Rectangle;

    if (type === 'word') {
      // Deselect previous
      if (this.selectedWord) {
        const prevBg = this.selectedWord.getData('bg') as Phaser.GameObjects.Rectangle;
        prevBg.setFillStyle(0xE8F8F0);
        prevBg.setStrokeStyle(2, 0xE5E7EB);
      }
      this.selectedWord = container;
      bg.setFillStyle(0x2ECC71);
      bg.setStrokeStyle(2, 0x27AE60);
    } else {
      if (this.selectedMeaning) {
        const prevBg = this.selectedMeaning.getData('bg') as Phaser.GameObjects.Rectangle;
        prevBg.setFillStyle(0xEEF4FF);
        prevBg.setStrokeStyle(2, 0xE5E7EB);
      }
      this.selectedMeaning = container;
      bg.setFillStyle(0x3498DB);
      bg.setStrokeStyle(2, 0x2980B9);
    }

    // Check match
    if (this.selectedWord && this.selectedMeaning) {
      const wordIndex = this.selectedWord.getData('pairIndex');
      const meaningIndex = this.selectedMeaning.getData('pairIndex');

      if (wordIndex === meaningIndex) {
        // Match!
        this.score += 100;
        this.matches++;
        this.scoreText.setText(`Score: ${this.score}`);

        this.selectedWord.setData('matched', true);
        this.selectedMeaning.setData('matched', true);

        // Animate matched
        this.tweens.add({
          targets: [this.selectedWord, this.selectedMeaning],
          alpha: 0.5,
          scaleX: 0.95,
          scaleY: 0.95,
          duration: 300,
        });

        const wBg = this.selectedWord.getData('bg') as Phaser.GameObjects.Rectangle;
        const mBg = this.selectedMeaning.getData('bg') as Phaser.GameObjects.Rectangle;
        wBg.setFillStyle(0x2ECC71);
        mBg.setFillStyle(0x2ECC71);

        if (this.matches >= this.totalPairs) {
          this.time.delayedCall(500, () => {
            eventBus.emit('game-complete', this.score);
          });
        }
      } else {
        // Wrong
        this.cameras.main.shake(200, 0.005);

        const wBg = this.selectedWord.getData('bg') as Phaser.GameObjects.Rectangle;
        const mBg = this.selectedMeaning.getData('bg') as Phaser.GameObjects.Rectangle;

        this.tweens.add({
          targets: [wBg, mBg],
          fillColor: { from: 0xE74C3C, to: wBg === this.selectedWord.getData('bg') ? 0xE8F8F0 : 0xEEF4FF },
          duration: 400,
        });

        wBg.setStrokeStyle(2, 0xE5E7EB);
        mBg.setStrokeStyle(2, 0xE5E7EB);
      }

      this.selectedWord = null;
      this.selectedMeaning = null;
    }
  }
}
