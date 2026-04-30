import Phaser from 'phaser';
import eventBus from '../EventBus';

const SENTENCES = [
  { words: ['I', 'am', 'learning', 'English', 'today'], correct: 'I am learning English today' },
  { words: ['She', 'goes', 'to', 'school', 'every', 'day'], correct: 'She goes to school every day' },
  { words: ['The', 'cat', 'is', 'sitting', 'on', 'the', 'mat'], correct: 'The cat is sitting on the mat' },
  { words: ['We', 'will', 'have', 'a', 'meeting', 'tomorrow'], correct: 'We will have a meeting tomorrow' },
  { words: ['Please', 'send', 'me', 'the', 'report'], correct: 'Please send me the report' },
];

export class SentenceBuilderScene extends Phaser.Scene {
  private score = 0;
  private currentIndex = 0;
  private selectedWords: string[] = [];
  private wordButtons: Phaser.GameObjects.Container[] = [];
  private sentenceDisplay!: Phaser.GameObjects.Text;
  private scoreText!: Phaser.GameObjects.Text;
  private gameWidth = 0;

  constructor() {
    super({ key: 'SentenceBuilderScene' });
  }

  create() {
    this.gameWidth = Number(this.scale.width);
    this.score = 0;
    this.currentIndex = 0;

    this.cameras.main.setBackgroundColor('#FFF5F0');

    this.add.text(this.gameWidth / 2, 30, '📝 Sentence Builder', {
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

    this.add.text(this.gameWidth / 2, 80, 'Arrange words to form a correct sentence', {
      fontSize: '11px',
      fontFamily: 'Plus Jakarta Sans, Arial',
      color: '#9CA3AF',
    }).setOrigin(0.5);

    // Sentence display area
    this.add.rectangle(this.gameWidth / 2, 120, this.gameWidth - 40, 50, 0xFFFFFF, 1)
      .setStrokeStyle(2, 0xE5E7EB);

    this.sentenceDisplay = this.add.text(this.gameWidth / 2, 120, 'Tap words in order...', {
      fontSize: '13px',
      fontFamily: 'Plus Jakarta Sans, Arial',
      color: '#9CA3AF',
      align: 'center',
      wordWrap: { width: this.gameWidth - 60 },
    }).setOrigin(0.5);

    this.setupSentence();
  }

  private setupSentence() {
    this.wordButtons.forEach(c => c.destroy());
    this.wordButtons = [];
    this.selectedWords = [];
    this.sentenceDisplay.setText('Tap words in order...');
    this.sentenceDisplay.setColor('#9CA3AF');

    if (this.currentIndex >= SENTENCES.length) {
      eventBus.emit('game-complete', this.score);
      return;
    }

    const sentence = SENTENCES[this.currentIndex];
    const shuffled = Phaser.Utils.Array.Shuffle([...sentence.words]);

    const startY = 170;
    let currentX = 20;
    let currentY = startY;
    const gap = 8;
    const lineHeight = 44;

    shuffled.forEach((word) => {
      const textWidth = word.length * 10 + 24;

      if (currentX + textWidth > this.gameWidth - 20) {
        currentX = 20;
        currentY += lineHeight;
      }

      const container = this.add.container(currentX, currentY);

      const bg = this.add.rectangle(0, 0, textWidth, 36, 0xEEF4FF, 1)
        .setOrigin(0)
        .setStrokeStyle(2, 0xE5E7EB);

      const label = this.add.text(textWidth / 2, 18, word, {
        fontSize: '14px',
        fontFamily: 'Plus Jakarta Sans, Arial',
        color: '#1A1A2E',
        fontStyle: 'bold',
      }).setOrigin(0.5);

      container.add([bg, label]);
      container.setSize(textWidth, 36);
      container.setData('word', word);
      container.setData('used', false);
      container.setData('bg', bg);

      bg.setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.onWordClick(container));

      this.wordButtons.push(container);
      currentX += textWidth + gap;
    });

    // Clear button
    const clearY = currentY + lineHeight + 10;
    const clearText = this.add.text(this.gameWidth / 2, clearY, '↺ Reset', {
      fontSize: '14px',
      fontFamily: 'Plus Jakarta Sans, Arial',
      color: '#E74C3C',
      fontStyle: 'bold',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.resetSentence());

    this.wordButtons.push(this.add.container(0, 0).add(clearText));
  }

  private onWordClick(container: Phaser.GameObjects.Container) {
    if (container.getData('used')) return;

    container.setData('used', true);
    const bg = container.getData('bg') as Phaser.GameObjects.Rectangle;
    bg.setFillStyle(0x2ECC71);
    bg.setStrokeStyle(2, 0x27AE60);

    this.selectedWords.push(container.getData('word'));
    this.sentenceDisplay.setText(this.selectedWords.join(' '));
    this.sentenceDisplay.setColor('#1A1A2E');

    // Check if all words selected
    const sentence = SENTENCES[this.currentIndex];
    if (this.selectedWords.length === sentence.words.length) {
      const guess = this.selectedWords.join(' ');
      if (guess === sentence.correct) {
        this.score += 200;
        this.scoreText.setText(`Score: ${this.score}`);
        this.sentenceDisplay.setColor('#2ECC71');

        this.time.delayedCall(1000, () => {
          this.currentIndex++;
          this.setupSentence();
        });
      } else {
        this.cameras.main.shake(200, 0.005);
        this.sentenceDisplay.setColor('#E74C3C');
        this.time.delayedCall(800, () => this.resetSentence());
      }
    }
  }

  private resetSentence() {
    this.selectedWords = [];
    this.sentenceDisplay.setText('Tap words in order...');
    this.sentenceDisplay.setColor('#9CA3AF');
    this.wordButtons.forEach(c => {
      if (c.getData('bg')) {
        c.setData('used', false);
        (c.getData('bg') as Phaser.GameObjects.Rectangle).setFillStyle(0xEEF4FF);
        (c.getData('bg') as Phaser.GameObjects.Rectangle).setStrokeStyle(2, 0xE5E7EB);
      }
    });
  }
}
