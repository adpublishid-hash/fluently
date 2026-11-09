import { describe, expect, it } from 'vitest';
import { getLocalizedModeCopy, getLocalizedTopicOptions } from './languageAdapters';
import { detectLocalizedCommand, formatLocalizedFeedback, formatLocalizedLesson, formatLocalizedReport, getLocalizedLevelLabel } from './localizedLesson';

const vocabRow = {
  word: '学生',
  reading: 'xuéshēng',
  meaning: 'siswa',
  pos: 'noun',
  note: '量词: 个 gè',
  example: '我是学生。',
  exampleReading: 'Wǒ shì xuéshēng.',
  exampleMeaning: 'Saya siswa.',
};

describe('localized chat lessons', () => {
  it('maps CEFR chat levels to the native level scale', () => {
    expect(getLocalizedLevelLabel('Japanese', 'a2')).toBe('A2 · JLPT N4');
    expect(getLocalizedLevelLabel('Mandarin', 'b1')).toBe('B1 · HSK 3');
    expect(getLocalizedLevelLabel('Arabic', 'a1')).toBe('A1 · Pemula');
  });

  it('formats vocabulary with reading, note and example translation columns', () => {
    const rows = Array.from({ length: 6 }, (_, index) => ({ ...vocabRow, word: `${vocabRow.word}${index}`, example: 'a|b' }));
    const result = formatLocalizedLesson('Mandarin', 'vocabulary', { rows }, { name: 'Ana', topic: 'Day 3 - Sekolah', levelId: 'a1' });
    const tableLine = result.message.split('\n').find((line) => line.startsWith('学生0|'));
    expect(tableLine?.split('|')).toEqual(['学生0', 'xuéshēng', 'siswa', 'noun', 'a/b', 'Wǒ shì xuéshēng.', 'Saya siswa.', '量词: 个 gè']);
    expect(result.message).toContain('"Sekolah"');
    expect(result.message).toContain('HSK 1');
    expect(result.vocabularyWords).toHaveLength(6);
    expect(result.context).toContain('学生0 (xuéshēng) = siswa');
  });

  it('keeps the reading answer key in the feedback context but not in the message', () => {
    const result = formatLocalizedLesson('Japanese', 'reading', {
      title: '私の町',
      passage: '私の町は静かです。',
      passageReading: 'わたしのまちはしずかです。',
      translation: 'Kotaku tenang.',
      glossary: [{ word: '町', reading: 'まち', meaning: 'kota' }],
      questions: ['Apa ide utama?', 'Bagaimana kotanya?', 'Siapa penulisnya?'],
      answers: ['Kota penulis', 'Tenang', 'Penulis'],
    }, { name: 'Ana', topic: 'Kota', levelId: 'a1' });
    expect(result.message).toContain('READING_PASSAGE_START\n私の町は静かです。\nREADING_PASSAGE_END');
    expect(result.message).toContain('わたしのまちはしずかです。');
    expect(result.message).not.toContain('Kotaku tenang.');
    expect(result.context).toContain('Answer key');
  });

  it('formats feedback with the corrected version and score', () => {
    const text = formatLocalizedFeedback({
      status: 'incorrect', score: 55, feedback: '"我是很高兴" salah.', corrected: '我很高兴。', correctedReading: 'Wǒ hěn gāoxìng.', completedItems: [], nextTask: 'Buat 2 kalimat dengan 很.',
    });
    expect(text).toContain('❌');
    expect(text).toContain('我很高兴。\nWǒ hěn gāoxìng.');
    expect(text).toContain('Skor: 55/100');
    expect(text).toContain('Lanjut: Buat 2 kalimat dengan 很.');
  });

  it('gives Japanese and Mandarin their own topic plans and mode copy', () => {
    const japaneseGrammar = getLocalizedTopicOptions('Japanese', 'grammar');
    expect(japaneseGrammar[1].label).toBe('Day 2 - Partikel は vs が');
    expect(getLocalizedTopicOptions('Mandarin', 'pronunciation')[5].label).toContain('Sandhi nada 3');
    expect(getLocalizedModeCopy('Japanese', 'reading').label).toBe('Dokkai Coach');
    expect(getLocalizedModeCopy('Mandarin', 'vocabulary').sublabel).toContain('pinyin');
  });

  it('recognises help commands and questions but not answers', () => {
    expect(detectLocalizedCommand('Hint')).toEqual({ type: 'hint' });
    expect(detectLocalizedCommand('contoh jawaban.')).toEqual({ type: 'example' });
    expect(detectLocalizedCommand('Lebih mudah')).toEqual({ type: 'regenerate', variation: 'easier' });
    expect(detectLocalizedCommand('terlalu gampang')).toEqual({ type: 'regenerate', variation: 'harder' });
    expect(detectLocalizedCommand('materi baru')).toEqual({ type: 'regenerate', variation: 'new' });
    expect(detectLocalizedCommand('Kenapa pakai が bukan は?')).toEqual({ type: 'ask', question: 'Kenapa pakai が bukan は?' });
    expect(detectLocalizedCommand('駅はどこですか?')).toBeNull();
    expect(detectLocalizedCommand('هل تتكلم العربية؟')).toBeNull();
    expect(detectLocalizedCommand('1. Ide utamanya tentang keluarga.')).toBeNull();
  });

  it('adds the help footer and variation intro to generated lessons', () => {
    const result = formatLocalizedLesson('Arabic', 'writing', {
      prompt: 'Tulis 4 kalimat tentang keluargamu.', requirements: [], patterns: [], wordBank: [], starter: { text: '', reading: '' }, modelAnswer: '',
    }, { name: 'Ana', topic: 'Keluarga', levelId: 'a1', variation: 'easier' });
    expect(result.message.startsWith('Oke, ini versi yang lebih mudah, Ana!')).toBe(true);
    expect(result.message).toContain('"hint"');
  });

  it('formats the AI session report', () => {
    const text = formatLocalizedReport('Japanese', 'Kosakata (語彙)', {
      score: 72, category: 'Good Progress', summary: 'Partikel masih tertukar.', strengths: ['Berani menulis kana'],
      errors: [{ original: '私が学生です', corrected: '私は学生です', explanation: 'Topik kalimat pakai は.' }],
      vocabulary: [{ word: '学生', reading: 'がくせい', meaning: 'siswa' }], nextSteps: ['Ulangi は vs が'],
    }, { topic: 'Day 2 - Sekolah', levelId: 'a1' });
    expect(text).toContain('Session Report - Bahasa Jepang · Kosakata (語彙)');
    expect(text).toContain('Topik: Sekolah');
    expect(text).toContain('Skor: 72/100');
    expect(text).toContain('❌ 私が学生です\n✅ 私は学生です');
    expect(text).toContain('学生 (がくせい) = siswa');
  });
});
