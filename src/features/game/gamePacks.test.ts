import { describe, expect, it } from 'vitest';
import { getGamePack, isModeSupported, normalizeTypedAnswer } from './gamePacks';
import { japaneseGameContent, mandarinGameContent } from './cjkGameContent';
import {
  arabicArticleDashQuestions,
  arabicConditionalRunQuestions,
  arabicErrorFixQuestions,
  arabicLetterQuestQuestions,
  arabicListenTapQuestions,
  arabicModalQuestQuestions,
  arabicQuestionBuilderQuestions,
  arabicSentenceBuilderQuestions,
  arabicTenseMasterQuestions,
  arabicVerbFormsQuestions,
} from './arabicGameContent';

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

const arabicChoiceBanks = {
  listenTap: arabicListenTapQuestions,
  tenseMaster: arabicTenseMasterQuestions,
  verbForms: arabicVerbFormsQuestions,
  articleDash: arabicArticleDashQuestions,
  modalQuest: arabicModalQuestQuestions,
  conditionalRun: arabicConditionalRunQuestions,
  questionBuilder: arabicQuestionBuilderQuestions,
  errorFix: arabicErrorFixQuestions,
};

describe('Arabic game content', () => {
  it.each(Object.entries(arabicChoiceBanks))('%s has 30 unique, answerable questions per level', (_, bank) => {
    ['Easy', 'Medium', 'Hard'].forEach((level) => {
      const items = bank.filter((item) => item.level === level);
      expect(items, level).toHaveLength(30);
      const keys = items.map((item) => { const question = item as { word: string; prompt?: string; translation?: string }; return question.prompt ? `${question.prompt}|${question.translation}` : question.word; });
      expect(new Set(keys).size, level).toBe(30);
      items.forEach((item) => {
        expect(item.options).toContain(item.answer);
        expect(item.options).toHaveLength(4);
        expect(new Set(item.options).size).toBe(4);
      });
    });
  });

  it('does not always place the answer first', () => {
    Object.values(arabicChoiceBanks).forEach((bank) => {
      const first = bank.filter((item) => item.options[0] === item.answer).length;
      expect(first / bank.length).toBeLessThan(0.4);
    });
  });

  it('has a distinct prompt for every grammar question in a mode', () => {
    [arabicTenseMasterQuestions, arabicArticleDashQuestions, arabicModalQuestQuestions, arabicConditionalRunQuestions, arabicQuestionBuilderQuestions, arabicErrorFixQuestions].forEach((bank) => {
      const keys = bank.map((item) => `${item.prompt}|${item.translation}`);
      expect(new Set(keys).size).toBe(keys.length);
    });
  });

  it('gives every grammar question a blank, a label and a rule', () => {
    [arabicTenseMasterQuestions, arabicArticleDashQuestions, arabicModalQuestQuestions, arabicConditionalRunQuestions, arabicQuestionBuilderQuestions].forEach((bank) => {
      bank.forEach((item) => {
        expect(item.prompt).toContain('____');
        expect(String(item.rule ?? item.formula).length).toBeGreaterThan(0);
      });
    });
  });

  it('never names the answer in the hints shown before answering', () => {
    const strip = (value: string) => value.replace(/[\u064B-\u0652]/g, '');
    const shownBefore = [
      ...arabicTenseMasterQuestions.map((item) => [item.answer, `${item.tense} ${item.formula}`]),
      ...arabicConditionalRunQuestions.map((item) => [item.answer, `${item.type} ${item.rule}`]),
      ...arabicQuestionBuilderQuestions.map((item) => [item.answer, `${item.type} ${item.rule}`]),
    ];
    shownBefore.forEach(([answer, hint]) => {
      const words = strip(hint).split(/[^\u0621-\u064A]+/);
      strip(answer).split(' ').forEach((token) => expect(words, `${answer}: ${hint}`).not.toContain(token));
    });
  });

  it('builds sentence puzzles that are scrambled and use the answer tokens', () => {
    ['Easy', 'Medium', 'Hard'].forEach((level) => {
      const items = arabicSentenceBuilderQuestions.filter((item) => item.level === level);
      expect(items).toHaveLength(30);
      expect(new Set(items.map((item) => item.answer.join(' '))).size).toBe(30);
    });
    arabicSentenceBuilderQuestions.forEach((item) => {
      expect([...item.words].sort()).toEqual([...item.answer].sort());
      expect(item.words.join(' ')).not.toBe(item.answer.join(' '));
    });
  });

  it('builds Easy and Hard verb distractors from the same root, so morphology decides', () => {
    const strip = (value: string) => value.replace(/[\u064B-\u0652]/g, '').replace(/[أإآؤئ]/g, 'ء');
    arabicVerbFormsQuestions.filter((item) => item.level === 'Easy').forEach((item) => {
      const [c1, c2, c3] = strip(item.word).split('-');
      item.options.forEach((option) => {
        const letters = strip(option);
        [c1, c2, c3].forEach((radical) => expect(letters, `${item.answer} vs ${option}`).toContain(radical));
      });
    });
    const hard = arabicVerbFormsQuestions.filter((item) => item.level === 'Hard');
    const sameRoot = hard.filter((item) => {
      const [c1] = strip(item.word).split('-');
      return item.options.filter((option) => strip(option).includes(c1)).length === 4;
    });
    expect(sameRoot.length / hard.length).toBeGreaterThan(0.8);
  });

  it('hides the asked verb form and keeps the full paradigm', () => {
    arabicVerbFormsQuestions.forEach((item) => {
      expect(Object.keys(item.forms)).toEqual(['Madhi', 'Mudhari', 'Amr', 'Masdar']);
      expect(item.forms[item.activeForm]).toBe(item.answer);
    });
  });

  it('builds letter quests that contain every letter of the word without spelling it out', () => {
    arabicLetterQuestQuestions.forEach((item) => {
      [...item.word].forEach((letter) => expect(item.letters).toContain(letter));
      expect(item.letters.slice(0, item.word.length).join('')).not.toBe(item.word);
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
