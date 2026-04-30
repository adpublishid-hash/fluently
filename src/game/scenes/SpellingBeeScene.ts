import Phaser from 'phaser';
import eventBus from '../EventBus';

const WORDS = [
  { word: 'BEAUTIFUL', hint: 'Pleasing to look at' },
  { word: 'KNOWLEDGE', hint: 'Facts and information' },
  { word: 'ADVENTURE', hint: 'An exciting experience' },
  { word: 'WONDERFUL', hint: 'Causing delight' },
  { word: 'BRILLIANT', hint: 'Extremely clever' },
  { word: 'CHALLENGE', hint: 'A difficult task' },
];

export class SpellingBeeScene extends Phaser.Scene {
  private score = 0;
  private currentWordIndex = 0;
  private currentGuess: string[] = [];
  private letterButtons: Phaser.GameObjects.Container[] = [];
  private guessDisplay: Phaser.GameObjects.Text[] = [];
  private scoreText!: Phaser.GameObjects.Text;
  private hintText!: Phaser.GameObjects.Text;
  private gameWidth = 0;

  constructor() {
    super({ key: 'SpellingBeeScene' });
  }

  create() {
    this.gameWidth = Number(this.scale.width);
    this.score = 0;
    this.currentWordIndex = 0;
    this.currentGuess = [];
    this.letterButtons = [];
    this.guessDisplay = [];

    this.cameras.main.setBackgroundColor('#FFF5F0');

    // Title
    this.add.text(this.gameWidth / 2, 30, '🐝 Spelling Bee', {
      fontSize: '20px',
      fontFamily: 'Plus Jakarta Sans, Arial',
      color: '#1A1A2E',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.scoreText = this.add.text(this.gameWidth / 2, 55, 'Score: 0', {
      fontSize: '14px',
      fontFamily: 'Plus Jakarta Sans, Arial',
      color: '#2ECC71',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.hintText = this.add.text(this.gameWidth / 2, 80, '', {
      fontSize: '12px',
      fontFamily: 'Plus Jakarta Sans, Arial',
      color: '#6B7280',
      fontStyle: 'italic',
    }).setOrigin(0.5);

    this.setupWord();
  }

  private setupWord() {
    // Clear previous
    this.letterButtons.forEach(c => c.destroy());
    this.guessDisplay.forEach(t => t.destroy());
    this.letterButtons = [];
    this.guessDisplay = [];
    this.currentGuess = [];

    if (this.currentWordIndex >= WORDS.length) {
      eventBus.emit('game-complete', this.score);
      return;
    }

    const wordObj = WORDS[this.currentWordIndex];
    this.hintText.setText(`Hint: ${wordObj.hint}`);

    // Guess blanks
    const blankStartX = this.gameWidth / 2 - ((wordObj.word.length * 28) / 2);
    wordObj.word.split('').forEach((_, i) => {
      const t = this.add.text(blankStartX + i * 28, 120, '_', {
        fontSize: '22px',
        fontFamily: 'Plus Jakarta Sans, Arial',
        color: '#1A1A2E',
        fontStyle: 'bold',
      }).setOrigin(0, 0);
      this.guessDisplay.push(t);
    });

    // Shuffle letters
    const letters = Phaser.Utils.Array.Shuffle(wordObj.word.split(''));
    const cols = Math.min(letters.length, 5);
    const rows = Math.ceil(letters.length / cols);
    const btnSize = 40;
    const gap = 8;
    const totalW = cols * (btnSize + gap) - gap;
    const startX = (this.gameWidth - totalW) / 2;
    const startY = 180;

    letters.forEach((letter, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = startX + col * (btnSize + gap);
      const y = startY + row * (btnSize + gap);

      const container = this.add.container(x, y);
      const bg = this.add.rectangle(0, 0, btnSize, btnSize, 0xFFFFFF, 1)
        .setOrigin(0)
        .setStrokeStyle(2, 0xE5E7EB);

      const text = this.add.text(btnSize / 2, btnSize / 2, letter, {
        fontSize: '18px',
        fontFamily: 'Plus Jakarta Sans, Arial',
        color: '#1A1A2E',
        fontStyle: 'bold',
      }).setOrigin(0.5);

      container.add([bg, text]);
      container.setSize(btnSize, btnSize);
      container.setData('letter', letter);
      container.setData('used', false);
      container.setData('bg', bg);

      bg.setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.onLetterClick(container));

      this.letterButtons.push(container);
    });

    // Clear button
    const clearBtn = this.add.text(this.gameWidth / 2, startY + rows * (btnSize + gap) + 20, '⌫ Clear', {
      fontSize: '14px',
      fontFamily: 'Plus Jakarta Sans, Arial',
      color: '#E74C3C',
      fontStyle: 'bold',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.clearGuess());

    this.letterButtons.push(this.add.container(0, 0).add(clearBtn));
  }

  private onLetterClick(container: Phaser.GameObjects.Container) {
    if (container.getData('used')) return;

    const letter = container.getData('letter') as string;
    container.setData('used', true);
    const bg = container.getData('bg') as Phaser.GameObjects.Rectangle;
    bg.setFillStyle(0xD3D3D3);

    this.currentGuess.push(letter);

    // Update display
    const idx = this.currentGuess.length - 1;
    if (idx < this.guessDisplay.length) {
      this.guessDisplay[idx].setText(letter);
      this.guessDisplay[idx].setColor('#2ECC71');
    }

    // Check if complete
    if (this.currentGuess.length === WORDS[this.currentWordIndex].word.length) {
      const guess = this.currentGuess.join('');
      const correct = WORDS[this.currentWordIndex].word;

      if (guess === correct) {
        this.score += 150;
        this.scoreText.setText(`Score: ${this.score}`);
        this.guessDisplay.forEach(t => t.setColor('#2ECC71'));

        this.time.delayedCall(800, () => {
          this.currentWordIndex++;
          this.setupWord();
        });
      } else {
        this.cameras.main.shake(200, 0.005);
        this.guessDisplay.forEach(t => t.setColor('#E74C3C'));
        this.time.delayedCall(600, () => this.clearGuess());
      }
    }
  }

  private clearGuess() {
    this.currentGuess = [];
    this.guessDisplay.forEach(t => {
      t.setText('_');
      t.setColor('#1A1A2E');
    });
    this.letterButtons.forEach(c => {
      if (c.getData('bg')) {
        c.setData('used', false);
        (c.getData('bg') as Phaser.GameObjects.Rectangle).setFillStyle(0xFFFFFF);
      }
    });
  }
}
