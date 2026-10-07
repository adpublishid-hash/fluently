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
import { arabicClauseConnectQuestions, arabicPrepositionPathQuestions } from './connectorBanks';

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
  prepositionPathQuestions?: unknown[];
  clauseConnectQuestions?: unknown[];
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
    prepositionPathQuestions: arabicPrepositionPathQuestions,
    clauseConnectQuestions: arabicClauseConnectQuestions,
  },
};

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
  /** Modes this language has banks for; null means every mode. */
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
      prepositionPathQuestions: content.prepositionPathQuestions,
      clauseConnectQuestions: content.clauseConnectQuestions,
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
    'preposition-path': { title: 'Coverb Path', subtitle: 'Pilih 在, 从, 往, 给, 对, 跟, 离 dan kata posisi yang tepat.', status: 'Jiècí' },
    'modal-quest': { title: 'Mandarin Modal Quest', subtitle: 'Bedakan 会, 能, 可以, 想, 应该, 得 dalam kalimat.', status: 'Néngyuàn' },
    'conditional-run': { title: 'Mandarin Conditional Run', subtitle: 'Bangun kalimat syarat: 如果…就, 只要…就, 只有…才, 即使…也.', status: 'Syarat' },
    'error-fix': { title: 'Mandarin Error Fix', subtitle: 'Temukan versi kalimat Mandarin yang benar.', status: 'Koreksi' },
    'clause-connect': { title: 'Mandarin Clause Connect', subtitle: 'Hubungkan klausa dengan 因为…所以, 虽然…但是, 不但…而且, dan 的.', status: 'Connect' },
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
      blankModes: {
        'preposition-path': { chip: 'Pilihan jiècí', rule: '在 / 从 / 往 / 给 / 对 / 离', prompt: 'Pilih coverb atau kata posisi yang tepat:', slotText: 'Isi bagian kosong dengan jiècí yang benar.', levels: ['在 / 从 / 上 / 里', '对 / 向 / 为了', '根据 / 随着 / 通过'] },
        'clause-connect': { chip: 'Pilihan penghubung', rule: '因为 / 虽然 / 不但 / 的', prompt: 'Pilih kata penghubung Mandarin yang tepat:', slotText: 'Isi bagian kosong dengan penghubung yang benar.', levels: ['因为 / 但是 / 还是', '不但 / 而是 / 于是', '然而 / 既然 / 何况'] },
        'grammar-mix': { chip: 'Campuran yǔfǎ', rule: 'aspek · liangci · modal · syarat', prompt: 'Lengkapi kalimat Mandarin dengan pilihan yang tepat:', slotText: 'Campuran semua game grammar Mandarin.', levels: ['dasar', 'harian', 'lanjut'] },
      },
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
  // Japanese has its own bank for every grammar mode, like English, Arabic and Mandarin.
  supportedModes: null,
  extraModeCopy: {
    'verb-forms': { title: 'Conjugation Master', subtitle: 'Ubah kata kerja kamus ke bentuk ます, て, ない, potensial, pasif, dan kausatif.', status: 'Katsuyou' },
    'article-dash': { title: 'Joshi Dash', subtitle: 'Pilih partikel: は, が, を, に, で, sampai に対して dan によると.', status: '助詞' },
    'preposition-path': { title: 'Position Path', subtitle: 'Pilih kata posisi dan arah: 上, 下, 中, 前, 隣, 間, sampai 沿いに dan 越しに.', status: 'Ichi' },
    'modal-quest': { title: 'Japanese Expression Quest', subtitle: 'Bedakan たい, てもいい, なければならない, そうだ, はず, べき.', status: 'Hyougen' },
    'conditional-run': { title: 'Japanese Conditional Run', subtitle: 'Pilih と, ば, たら, なら, ても, dan のに yang tepat.', status: 'Jouken' },
    'error-fix': { title: 'Japanese Error Fix', subtitle: 'Temukan versi kalimat Jepang yang benar.', status: 'Koreksi' },
    'clause-connect': { title: 'Japanese Clause Connect', subtitle: 'Hubungkan klausa dengan から, ので, のに, ながら, それで, dan lainnya.', status: 'Connect' },
    'grammar-mix': { title: 'Japanese Grammar Mix', subtitle: 'Campuran bunpou Jepang untuk review cepat.', status: 'Mixed' },
  },
  ui: cjkGameUi({
    name: 'Jepang',
    textLang: 'ja',
    script: 'Kana & Kanji',
    romanization: 'romaji',
    tensePrompt: 'Lengkapi kalimat dengan bentuk kata kerja yang tepat:',
    tenseLevels: ['Bentuk ます', 'て / た / ない', 'Pasif & kausatif'],
    verbFormsPrompt: 'Pilih bentuk kata kerja yang tepat:',
    verbFormsLevels: ['ます', 'て / た / ない', 'Potensial dst.'],
    modalChips: ['できる', 'たい', 'てもいい', 'なければならない', 'ほうがいい', 'でしょう'],
    questionParts: ['topik', 'kata tanya', 'です', 'か'],
    extra: {
      findTitle: 'Find Japanese Words',
      wordMatchCheck: 'Cek Japanese Match',
      articleChip: 'Pilihan partikel',
      articleRule: 'kata + partikel + predikat',
      articlePrompt: 'Pilih partikel (joshi) yang tepat:',
      articleSlotText: 'Isi bagian kosong dengan partikel yang benar.',
      articleLevels: ['は / が / を / に', 'より / しか / ずつ', 'に対して / によると'],
      modalRule: 'kata kerja + ungkapan',
      modalPrompt: 'Pilih ungkapan Jepang yang tepat:',
      modalLevels: ['たい / てもいい', 'はず / べき / よう', 'わけ / ざるを得ない'],
      conditionalLevels: ['と / ば / たら', 'ても / のに / さえ', 'ものなら / 限り'],
      questionLevels: ['何 / どこ / だれ', 'どれ / どの / どう', 'tak langsung'],
      errorLevels: ['partikel dasar', 'bentuk kata kerja', 'keigo & pola'],
      blankModes: {
        'preposition-path': { chip: 'Pilihan posisi', rule: '上 / 下 / 中 / 前 / 隣 / 間', prompt: 'Pilih kata posisi atau arah yang tepat:', slotText: 'Isi bagian kosong dengan kata posisi yang benar.', levels: ['上 / 下 / 中 / 前', '奥 / 向かい / 手前', '沿いに / 越しに'] },
        'clause-connect': { chip: 'Pilihan penghubung', rule: 'から / けど / て / ながら', prompt: 'Pilih penghubung Jepang yang tepat:', slotText: 'Isi bagian kosong dengan penghubung yang benar.', levels: ['から / けど / て', 'のに / それで / ため', 'ものの / からこそ'] },
        'grammar-mix': { chip: 'Campuran bunpou', rule: 'bentuk · partikel · ungkapan · syarat', prompt: 'Lengkapi kalimat Jepang dengan pilihan yang tepat:', slotText: 'Campuran semua game grammar Jepang.', levels: ['dasar', 'harian', 'lanjut'] },
      },
    },
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
