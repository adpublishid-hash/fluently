import { normalizeTargetLanguage } from '../chat/targetLanguage';
import {
  arabicArticleDashQuestions,
  arabicConditionalRunQuestions,
  arabicErrorFixQuestions,
  arabicGameCategoryCopy,
  arabicGameDifficultyCopy,
  arabicGameHomeCopy,
  arabicGameModeCopy,
  arabicLetterQuestQuestions,
  arabicListenTapQuestions,
  arabicModalQuestQuestions,
  arabicQuestionBuilderQuestions,
  arabicSentenceBuilderQuestions,
  arabicTenseMasterQuestions,
  arabicVerbFormsQuestions,
  arabicWordBank,
} from './arabicGameContent';
import { japaneseGameContent, mandarinGameContent, type CjkGameContent } from './cjkGameContent';

type ModeCopy = Record<string, { title: string; subtitle: string; status: string }>;

// Question banks a pack can override; anything missing falls back to English.
export type GameBanks = {
  wordBank?: unknown[];
  listenTapQuestions?: unknown[];
  letterQuestQuestions?: unknown[];
  sentenceBuilderQuestions?: unknown[];
  tenseMasterQuestions?: unknown[];
  verbFormsQuestions?: unknown[];
  articleDashQuestions?: unknown[];
  modalQuestQuestions?: unknown[];
  conditionalRunQuestions?: unknown[];
  questionBuilderQuestions?: unknown[];
  errorFixQuestions?: unknown[];
};

export type GamePack = {
  language: 'Arabic' | 'Mandarin' | 'Japanese';
  speechLang: string;
  accent: string;
  accentSoft: string;
  home: typeof arabicGameHomeCopy;
  categoryCopy: Record<string, string>;
  modeCopy: ModeCopy;
  difficultyCopy: Record<string, { title: string; subtitle: string }>;
  /** Modes that have content in this language; null means every mode. */
  supportedModes: Set<string> | null;
  /** Typing games also accept pinyin/romaji (tone marks optional). */
  acceptsRomanization: boolean;
  fillerCharacters?: string;
  banks: GameBanks;
};

const arabicPack: GamePack = {
  language: 'Arabic',
  speechLang: 'ar-SA',
  accent: '#0F766E',
  accentSoft: '#CCFBF1',
  home: arabicGameHomeCopy,
  categoryCopy: arabicGameCategoryCopy,
  modeCopy: arabicGameModeCopy,
  difficultyCopy: arabicGameDifficultyCopy,
  supportedModes: null,
  acceptsRomanization: false,
  banks: {
    wordBank: arabicWordBank,
    listenTapQuestions: arabicListenTapQuestions,
    letterQuestQuestions: arabicLetterQuestQuestions,
    sentenceBuilderQuestions: arabicSentenceBuilderQuestions,
    tenseMasterQuestions: arabicTenseMasterQuestions,
    verbFormsQuestions: arabicVerbFormsQuestions,
    articleDashQuestions: arabicArticleDashQuestions,
    modalQuestQuestions: arabicModalQuestQuestions,
    conditionalRunQuestions: arabicConditionalRunQuestions,
    questionBuilderQuestions: arabicQuestionBuilderQuestions,
    errorFixQuestions: arabicErrorFixQuestions,
  },
};

const CJK_MODES = new Set([
  'word-match', 'letter-quest', 'sentence-builder', 'tense-master', 'question-builder',
  'listen-tap', 'memory-card', 'find-words', 'speed-quiz', 'typing-sprint', 'boss-challenge',
]);

function cjkPack(
  language: 'Mandarin' | 'Japanese',
  content: CjkGameContent,
  copy: { name: string; speechLang: string; accent: string; accentSoft: string; vocabulary: string; grammar: string; listening: string; writing: string; speaking: string; tense: [string, string]; script: string; romanization: string },
): GamePack {
  const { name } = copy;
  return {
    language,
    speechLang: copy.speechLang,
    accent: copy.accent,
    accentSoft: copy.accentSoft,
    home: {
      title: `${name} Arcade`,
      subtitle: `Latihan kosakata, ${copy.grammar.toLowerCase()}, listening, dan menulis ${name} dalam game cepat.`,
      chooseTitle: `Pilih Game ${name}`,
      chooseSubtitle: `Filter berdasarkan skill ${name} yang ingin kamu latih.`,
      dailyQuestTitle: `${name} Daily Quest`,
      dailyQuestSubtitle: `Selesaikan 3 game ${name} untuk bonus arcade.`,
    },
    categoryCopy: {
      all: 'Semua',
      vocabulary: copy.vocabulary,
      grammar: copy.grammar,
      listening: copy.listening,
      writing: copy.writing,
      speaking: copy.speaking,
      reading: 'Reading',
    },
    modeCopy: {
      'word-match': { title: `${name} Word Match`, subtitle: `Cocokkan gambar dengan kata ${name}.`, status: copy.vocabulary },
      'letter-quest': { title: `${copy.script} Quest`, subtitle: `Susun ${copy.script} menjadi kata yang tepat.`, status: copy.script },
      'sentence-builder': { title: `${name} Sentence Builder`, subtitle: `Susun kata ${name} menjadi kalimat yang benar.`, status: 'Kalimat' },
      'tense-master': { title: copy.tense[0], subtitle: copy.tense[1], status: copy.grammar },
      'question-builder': { title: `${name} Question Builder`, subtitle: `Pilih kata tanya ${name} yang tepat.`, status: 'Kata tanya' },
      'listen-tap': { title: `${name} Listen & Tap`, subtitle: `Dengarkan kata ${name} lalu pilih artinya.`, status: copy.listening },
      'memory-card': { title: `${name} Memory Card`, subtitle: `Cocokkan gambar dan kata ${name}.`, status: 'Memory' },
      'find-words': { title: `Find ${name} Words`, subtitle: `Cari kata ${name} di grid karakter.`, status: 'Word Search' },
      'speed-quiz': { title: `${name} Speed Quiz`, subtitle: `Jawab arti kata ${name} sebelum waktu habis.`, status: 'Timed' },
      'typing-sprint': { title: `${name} Typing Sprint`, subtitle: `Ketik kata dalam ${copy.romanization} atau ${copy.script}.`, status: copy.writing },
      crossword: { title: `${name} Typing Sprint`, subtitle: `Ketik kata dalam ${copy.romanization} atau ${copy.script}.`, status: copy.writing },
      'boss-challenge': { title: `${name} Boss Challenge`, subtitle: 'Mode cepat dengan tekanan waktu dan reward lebih besar.', status: 'Hard' },
      'clan-battle': { title: `${name} Boss Challenge`, subtitle: 'Mode cepat dengan tekanan waktu dan reward lebih besar.', status: 'Hard' },
    },
    difficultyCopy: {
      easy: { title: `Easy ${name}`, subtitle: 'Kosakata dan kalimat dasar.' },
      medium: { title: `Medium ${name}`, subtitle: 'Kosakata harian dan pola kalimat umum.' },
      hard: { title: `Hard ${name}`, subtitle: 'Kosakata abstrak dan struktur lebih panjang.' },
    },
    supportedModes: CJK_MODES,
    acceptsRomanization: true,
    fillerCharacters: content.fillerCharacters,
    banks: {
      wordBank: content.wordBank,
      listenTapQuestions: content.listenTapQuestions,
      letterQuestQuestions: content.letterQuestQuestions,
      sentenceBuilderQuestions: content.sentenceBuilderQuestions,
      tenseMasterQuestions: content.tenseMasterQuestions,
      questionBuilderQuestions: content.questionBuilderQuestions,
    },
  };
}

const mandarinPack = cjkPack('Mandarin', mandarinGameContent, {
  name: 'Mandarin',
  speechLang: 'zh-CN',
  accent: '#DC2626',
  accentSoft: '#FEE2E2',
  vocabulary: 'Cíhuì',
  grammar: 'Yǔfǎ',
  listening: 'Tīnglì',
  writing: 'Xiězuò',
  speaking: 'Kǒuyǔ',
  tense: ['Aspect Master', 'Pilih 了, 过, 着, 在, dan komplemen yang tepat.'],
  script: 'Hanzi',
  romanization: 'pinyin',
});

const japanesePack = cjkPack('Japanese', japaneseGameContent, {
  name: 'Japanese',
  speechLang: 'ja-JP',
  accent: '#E11D48',
  accentSoft: '#FFE4E6',
  vocabulary: 'Goi',
  grammar: 'Bunpou',
  listening: 'Choukai',
  writing: 'Sakubun',
  speaking: 'Kaiwa',
  tense: ['Verb Form Master', 'Pilih bentuk ます, た, て, ない, pasif, dan kausatif.'],
  script: 'Kana & Kanji',
  romanization: 'romaji',
});

export function getGamePack(targetLanguage?: string): GamePack | null {
  const language = normalizeTargetLanguage(targetLanguage);
  if (language === 'Arabic') return arabicPack;
  if (language === 'Mandarin') return mandarinPack;
  if (language === 'Japanese') return japanesePack;
  return null;
}

export function isModeSupported(pack: GamePack | null, modeId: string) {
  return !pack?.supportedModes || pack.supportedModes.has(modeId);
}

/** Lenient comparison for typing games: case, spaces and tone marks are ignored. */
export function normalizeTypedAnswer(value: string) {
  return value.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '');
}
