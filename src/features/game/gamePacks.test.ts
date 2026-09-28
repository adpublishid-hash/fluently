import { describe, expect, it } from 'vitest';
import { getGamePack, isModeSupported, normalizeTypedAnswer } from './gamePacks';
import { japaneseGameContent, mandarinGameContent } from './cjkGameContent';

describe.each([
  ['Mandarin', mandarinGameContent],
  ['Japanese', japaneseGameContent],
] as const)('%s game content', (_, content) => {
  it('has answerable choice questions with unique options', () => {
    const questions = [...content.listenTapQuestions, ...content.tenseMasterQuestions, ...content.questionBuilderQuestions];
    questions.forEach((question) => {
      expect(question.options).toContain(question.answer);
      expect(new Set(question.options).size).toBe(question.options.length);
    });
  });

  it('does not always place the answer first', () => {
    const questions = [...content.listenTapQuestions, ...content.tenseMasterQuestions, ...content.questionBuilderQuestions];
    const first = questions.filter((question) => question.options[0] === question.answer).length;
    expect(first / questions.length).toBeLessThan(0.5);
  });

  it('builds letter quests that contain every character of the word', () => {
    content.letterQuestQuestions.forEach((item) => {
      [...item.word].forEach((character) => expect(item.letters).toContain(character));
    });
  });

  it('builds sentence puzzles from the same tokens as the answer', () => {
    content.sentenceBuilderQuestions.forEach((item) => {
      expect([...item.words].sort()).toEqual([...item.answer].sort());
    });
  });

  it('covers all three difficulty levels', () => {
    ['Easy', 'Medium', 'Hard'].forEach((level) => {
      expect(content.listenTapQuestions.some((item) => item.level === level)).toBe(true);
      expect(content.sentenceBuilderQuestions.some((item) => item.level === level)).toBe(true);
      expect(content.tenseMasterQuestions.some((item) => item.level === level)).toBe(true);
    });
  });
});

describe('game packs', () => {
  it('selects packs by target language', () => {
    expect(getGamePack('Arabic')?.speechLang).toBe('ar-SA');
    expect(getGamePack('Mandarin')?.speechLang).toBe('zh-CN');
    expect(getGamePack('Japanese')?.speechLang).toBe('ja-JP');
    expect(getGamePack('English')).toBeNull();
  });

  it('hides English-only grammar modes for Mandarin and Japanese', () => {
    expect(isModeSupported(getGamePack('Mandarin'), 'article-dash')).toBe(false);
    expect(isModeSupported(getGamePack('Japanese'), 'listen-tap')).toBe(true);
    expect(isModeSupported(getGamePack('Arabic'), 'article-dash')).toBe(true);
    expect(isModeSupported(null, 'article-dash')).toBe(true);
  });

  it('accepts pinyin without tone marks', () => {
    expect(normalizeTypedAnswer(' Píngguǒ ')).toBe(normalizeTypedAnswer('pingguo'));
    expect(normalizeTypedAnswer('gyuu nyuu')).toBe('gyuunyuu');
  });
});
