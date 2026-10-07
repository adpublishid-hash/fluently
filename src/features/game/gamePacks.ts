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
import { arabicGameUi, cjkGameUi, type GameUiCopy } from './gameUiCopy';

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
  ui: GameUiCopy;
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
  ui: arabicGameUi,
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

type CjkCopy = {
  name: string;
  speechLang: string;
  accent: string;
  accentSoft: string;
  vocabulary: string;
  grammar: string;
  listening: string;
  writing: string;
  speaking: string;
  tense: [string, string];
  script: string;
  romanization: string;
  ui: GameUiCopy;
  /** Modes beyond CJK_MODES that this language has banks for; null means every mode. */
  supportedModes: Set<string> | null;
  extraModeCopy?: ModeCopy;
};

function cjkPack(language: 'Mandarin' | 'Japanese', content: CjkGameContent, copy: CjkCopy): GamePack {
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
      ...copy.extraModeCopy,
    },
    difficultyCopy: {
      easy: { title: `Easy ${name}`, subtitle: 'Kosakata dan kalimat dasar.' },
      medium: { title: `Medium ${name}`, subtitle: 'Kosakata harian dan pola kalimat umum.' },
      hard: { title: `Hard ${name}`, subtitle: 'Kosakata abstrak dan struktur lebih panjang.' },
    },
    supportedModes: copy.supportedModes,
    acceptsRomanization: true,
    fillerCharacters: content.fillerCharacters,
    ui: copy.ui,
    banks: {
      wordBank: content.wordBank,
      listenTapQuestions: content.listenTapQuestions,
      letterQuestQuestions: content.letterQuestQuestions,
      sentenceBuilderQuestions: content.sentenceBuilderQuestions,
      tenseMasterQuestions: content.tenseMasterQuestions,
      questionBuilderQuestions: content.questionBuilderQuestions,
      verbFormsQuestions: content.verbFormsQuestions,
      articleDashQuestions: content.articleDashQuestions,
      modalQuestQuestions: content.modalQuestQuestions,
      conditionalRunQuestions: content.conditionalRunQuestions,
      errorFixQuestions: content.errorFixQuestions,
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
  // Mandarin has its own bank for every grammar mode, like English and Arabic.
  supportedModes: null,
  extraModeCopy: {
    'verb-forms': { title: 'Complement Master', subtitle: 'Pilih komplemen hasil, potensial, dan arah: 听懂, 听不懂, 想起来.', status: 'Komplemen' },
    'article-dash': { title: 'Liangci Dash', subtitle: 'Pilih kata bantu bilangan: 本, 张, 只, 条, 件, dan lainnya.', status: '量词' },
    'preposition-path': { title: 'Mandarin Word Order Path', subtitle: 'Susun kalimat dengan urutan waktu, tempat, dan cara yang benar.', status: 'Urutan' },
    'modal-quest': { title: 'Mandarin Modal Quest', subtitle: 'Bedakan 会, 能, 可以, 想, 应该, 得 dalam kalimat.', status: 'Néngyuàn' },
    'conditional-run': { title: 'Mandarin Conditional Run', subtitle: 'Bangun kalimat syarat: 如果…就, 只要…就, 只有…才, 即使…也.', status: 'Syarat' },
    'error-fix': { title: 'Mandarin Error Fix', subtitle: 'Temukan versi kalimat Mandarin yang benar.', status: 'Koreksi' },
    'clause-connect': { title: 'Mandarin Clause Connect', subtitle: 'Hubungkan klausa dengan 因为, 虽然, 不但, dan lainnya.', status: 'Connect' },
    'grammar-mix': { title: 'Mandarin Grammar Mix', subtitle: 'Campuran yǔfǎ Mandarin untuk review cepat.', status: 'Mixed' },
  },
  ui: cjkGameUi({
    name: 'Mandarin',
    textLang: 'zh-CN',
    script: 'Hanzi',
    romanization: 'pinyin',
    tensePrompt: 'Lengkapi kalimat dengan aspek atau komplemen yang tepat:',
    tenseLevels: ['Aspek dasar', 'Komplemen', 'Pola lanjutan'],
    verbFormsPrompt: 'Pilih bentuk komplemen yang sesuai artinya:',
    verbFormsLevels: ['Hasil', 'Potensial', 'Arah'],
    modalChips: ['会', '能', '可以', '想', '应该', '得'],
    questionParts: ['subjek', 'kata kerja', 'kata tanya', 'partikel'],
    extra: {
      articleChip: 'Pilihan liangci',
      articleRule: 'bilangan + liangci + benda',
      articlePrompt: 'Pilih kata bantu bilangan (liangci) yang tepat:',
      articleSlotText: 'Isi bagian kosong dengan liangci yang benar.',
      articleLevels: ['benda sehari-hari', 'wadah & frekuensi', 'abstrak'],
      modalLevels: ['会 / 能 / 想', '必须 / 敢 / 可能', '不得不 / 值得'],
      conditionalLevels: ['如果 / 一…就', '只要 / 只有 / 即使', '要不是 / 既然'],
      questionLevels: ['什么 / 哪儿 / 吗', '怎么 / 为什么', 'retoris & tak tentu'],
    },
  }),
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
  supportedModes: CJK_MODES,
  ui: cjkGameUi({
    name: 'Jepang',
    textLang: 'ja',
    script: 'Kana & Kanji',
    romanization: 'romaji',
    tensePrompt: 'Lengkapi kalimat dengan bentuk kata kerja yang tepat:',
    tenseLevels: ['Bentuk ます', 'て / た / ない', 'Pasif & kausatif'],
    verbFormsPrompt: 'Pilih bentuk kata kerja yang tepat:',
    verbFormsLevels: ['ます', 'て / た', 'Lanjutan'],
    modalChips: ['できる', 'たい', 'てもいい', 'なければならない', 'ほうがいい', 'でしょう'],
    questionParts: ['topik', 'kata tanya', 'です', 'か'],
    extra: { findTitle: 'Find Japanese Words', wordMatchCheck: 'Cek Japanese Match' },
  }),
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
