// Labels the arcade shows around each game, per target language. English is the default;
// language packs supply their own so a Mandarin learner is never told to "susun kalimat bahasa Inggris".
/** Copy for the fill-in-the-blank games that share the Article Dash layout. */
export type BlankModeCopy = { chip: string; rule: string; prompt: string; slotText: string; levels: [string, string, string] };
export type BlankModeId = 'preposition-path' | 'clause-connect' | 'grammar-mix';

export type GameUiCopy = {
  /** BCP-47 tag for target-language text (fonts, screen readers); undefined for English. */
  textLang?: string;
  findTitle: string;
  findHint: string;
  findCount: string;
  findCheck: string;
  nextBoard: string;
  finishing: string;
  wordMatchCount: string;
  wordMatchCheck: string;
  letterTitle: string;
  letterCount: string;
  letterCheck: string;
  memoryTitle: string;
  memoryHint: string;
  question: string;
  tensePrompt: string;
  tenseLevels: [string, string, string];
  /** Display names for the Past / Now / Future timeline. */
  timeline: [string, string, string];
  verbFormsPrompt: string;
  verbFormsLevels: [string, string, string];
  articleChip: string;
  articleRule: string;
  articlePrompt: string;
  articleSlotTitle: string;
  articleSlotText: string;
  modalRule: string;
  modalPrompt: string;
  modalChips: string[];
  modalClue: string;
  conditionalPrompt: string;
  conditionalIf: string;
  conditionalIfValue: string;
  conditionalResult: string;
  conditionalResultValue: string;
  questionPrompt: string;
  questionStarter: string;
  questionSubject: string;
  questionSubjectFallback: string;
  questionPattern: string;
  questionParts: string[];
  errorChip: string;
  errorTitle: string;
  errorOriginal: string;
  errorYourFix: string;
  errorPlaceholder: string;
  sentenceLevels: [string, string, string];
  /** Short Easy / Medium / Hard captions on each grammar game's level strip. */
  sentenceLevelHints: [string, string, string];
  articleLevels: [string, string, string];
  modalLevels: [string, string, string];
  conditionalLevels: [string, string, string];
  questionLevels: [string, string, string];
  errorLevels: [string, string, string];
  sentenceWords: string;
  sentencePrompt: string;
  sentencePath: string;
  sentenceTapHint: string;
  sentenceCorrect: string;
  listenPrompt: string;
  playAudio: string;
  typingPrompt: string;
  choosePrompt: string;
  undo: string;
  next: string;
  check: string;
  submit: string;
  correct: string;
  answer: string;
  typingPlaceholder: string;
  blankModes: Record<BlankModeId, BlankModeCopy>;
};

export const englishGameUi: GameUiCopy = {
  findTitle: 'Find the words',
  findHint: 'Pilih kartu jawaban, lalu klik huruf di papan.',
  findCount: 'words',
  findCheck: 'Check Find the Words',
  nextBoard: 'Next Board',
  finishing: 'Finishing...',
  wordMatchCount: 'visual matches',
  wordMatchCheck: 'Check Word Match',
  letterTitle: 'Letter Quest',
  letterCount: 'visual questions',
  letterCheck: 'Check Letter Quest',
  memoryTitle: 'Match picture and word',
  memoryHint: 'Buka kartu, ingat posisinya, lalu temukan pasangan visual dan kata.',
  question: 'Question',
  tensePrompt: 'Lengkapi kalimat sesuai tense:',
  tenseLevels: ['Basic tenses', 'Perfect + future', 'Advanced forms'],
  timeline: ['Past', 'Now', 'Future'],
  verbFormsPrompt: 'Pilih bentuk verb yang tepat:',
  verbFormsLevels: ['V2', 'V3 + ing', 'mixed'],
  articleChip: 'Article choice',
  articleRule: 'a / an / the / no article',
  articlePrompt: 'Pilih article yang tepat:',
  articleSlotTitle: 'Dash slot',
  articleSlotText: 'Isi bagian kosong dengan article yang benar.',
  modalRule: 'modal + V1',
  modalPrompt: 'Pilih modal verb yang tepat:',
  modalChips: ['can', 'should', 'must', 'may', 'would', 'could'],
  modalClue: 'Quest clue',
  conditionalPrompt: 'Lengkapi conditional sentence:',
  conditionalIf: 'If clause',
  conditionalIfValue: 'condition',
  conditionalResult: 'Result',
  conditionalResultValue: 'outcome',
  questionPrompt: 'Pilih kata pembuka untuk membangun pertanyaan:',
  questionStarter: 'Starter',
  questionSubject: 'Subject',
  questionSubjectFallback: 'subject',
  questionPattern: 'Pattern',
  questionParts: ['question word', 'auxiliary', 'subject', 'base verb'],
  errorChip: 'find and fix',
  errorTitle: 'Sentence with error',
  errorOriginal: 'Original',
  errorYourFix: 'Your fix',
  errorPlaceholder: 'Choose the corrected sentence below',
  sentenceLevels: ['Basic sentence', 'Expanded sentence', 'Complex sentence'],
  sentenceLevelHints: ['short', 'daily', 'complex'],
  articleLevels: ['a / an', 'the / zero', 'advanced'],
  modalLevels: ['basic', 'past modal', 'advanced'],
  conditionalLevels: ['zero / first', 'second', 'third'],
  questionLevels: ['yes / no', 'WH words', 'advanced'],
  errorLevels: ['basic errors', 'tense + pattern', 'advanced grammar'],
  sentenceWords: 'words',
  sentencePrompt: 'Susun kalimat bahasa Inggris:',
  sentencePath: 'Sentence path',
  sentenceTapHint: 'Tap kata di bawah untuk menyusun jawaban.',
  sentenceCorrect: 'Benar. Kalimatmu sudah tepat.',
  listenPrompt: 'Dengarkan kata lalu pilih artinya:',
  playAudio: 'Play Audio',
  typingPrompt: 'Ketik kata bahasa Inggris dari arti ini:',
  choosePrompt: 'Pilih arti yang paling tepat:',
  undo: 'Undo',
  next: 'Next',
  check: 'Check',
  submit: 'Submit',
  correct: 'Correct.',
  answer: 'Answer',
  typingPlaceholder: 'Type your answer...',
  blankModes: {
    'preposition-path': { chip: 'Preposition choice', rule: 'in / on / at / to / for …', prompt: 'Pilih preposition yang tepat:', slotText: 'Isi bagian kosong dengan preposition yang benar.', levels: ['place & time', 'verb + prep', 'collocations'] },
    'clause-connect': { chip: 'Connector choice', rule: 'and / but / because / which …', prompt: 'Pilih kata penghubung yang tepat:', slotText: 'Isi bagian kosong dengan conjunction yang benar.', levels: ['and / but / so', 'although / whereas', 'inversion & formal'] },
    'grammar-mix': { chip: 'Grammar mix', rule: 'tense · article · modal · preposition', prompt: 'Lengkapi kalimat dengan pilihan yang tepat:', slotText: 'Campuran semua game grammar.', levels: ['basic mix', 'daily mix', 'advanced mix'] },
  },
};

const indonesianControls = {
  nextBoard: 'Board Berikutnya',
  finishing: 'Menyelesaikan...',
  question: 'Soal',
  undo: 'Urungkan',
  next: 'Lanjut',
  check: 'Periksa',
  submit: 'Kirim',
  correct: 'Benar.',
  answer: 'Jawaban',
  errorTitle: 'Kalimat perlu dikoreksi',
  errorOriginal: 'Asal',
  errorYourFix: 'Koreksi kamu',
  sentencePath: 'Susunan kalimat',
  articleSlotTitle: 'Slot kosong',
};

export const arabicGameUi: GameUiCopy = {
  ...englishGameUi,
  ...indonesianControls,
  textLang: 'ar',
  findTitle: 'Find Arabic Words',
  findHint: 'Pilih kartu mufradat, lalu klik huruf Arab di papan.',
  findCount: 'Arabic words',
  findCheck: 'Check Arabic Words',
  wordMatchCount: 'Arabic matches',
  wordMatchCheck: 'Check Arabic Match',
  letterTitle: 'Arabic Letter Quest',
  letterCount: 'Arabic words',
  letterCheck: 'Check Arabic Letters',
  memoryTitle: 'Match picture and Arabic word',
  memoryHint: 'Buka kartu, ingat posisinya, lalu temukan pasangan visual dan mufradat Arab.',
  tensePrompt: "Lengkapi kalimat dengan fi'il yang tepat:",
  verbFormsPrompt: "Pilih bentuk fi'il yang tepat:",
  verbFormsLevels: ['Madhi + Mudhari', 'Amr + Masdar', "Fi'il mazid"],
  articleChip: 'Pilihan ال',
  articleRule: 'marifah / nakirah',
  articlePrompt: 'Pilih bentuk marifah/nakirah yang tepat:',
  articleSlotText: 'Isi bagian kosong dengan bentuk Arabic yang benar.',
  modalRule: "ungkapan + fi'il",
  modalPrompt: 'Pilih ungkapan Arab yang tepat:',
  modalChips: ['أستطيع', 'يجب', 'أريد', 'هل يمكن', 'من فضلك', 'لا بد'],
  modalClue: 'Petunjuk',
  conditionalPrompt: 'Lengkapi kalimat syarat Arabic:',
  conditionalIf: 'Syarat',
  conditionalIfValue: 'kondisi',
  conditionalResult: 'Jawab syarat',
  conditionalResultValue: 'hasil',
  questionPrompt: 'Pilih kata tanya Arab yang tepat:',
  questionStarter: 'Pembuka',
  questionSubject: 'Kalimat',
  questionSubjectFallback: 'kalimat',
  questionPattern: 'Pola',
  questionParts: ['kata tanya', 'subjek', 'predikat', 'makna'],
  errorChip: 'koreksi Arab',
  errorPlaceholder: 'Pilih kalimat Arab yang sudah benar',
  sentenceLevels: ['Jumlah dasar', 'Jumlah harian', 'Jumlah kompleks'],
  sentenceWords: 'kata Arab',
  sentencePrompt: 'Susun kalimat bahasa Arab:',
  sentenceTapHint: 'Tap kata Arab di bawah untuk menyusun jawaban.',
  sentenceCorrect: 'Benar. Jumlah Arab sudah tepat.',
  listenPrompt: 'Dengarkan kata Arab lalu pilih artinya:',
  playAudio: 'Putar Audio Arab',
  typingPrompt: 'Ketik kata Arab dari arti ini:',
  choosePrompt: 'Pilih arti mufradat yang paling tepat:',
  typingPlaceholder: 'اكتب الإجابة...',
  blankModes: {
    'preposition-path': { chip: 'Pilihan huruf jar', rule: 'في / على / إلى / من / عن', prompt: 'Pilih huruf jar yang tepat:', slotText: 'Isi bagian kosong dengan huruf jar yang benar.', levels: ['tempat & arah', "fi'il + jar", 'ungkapan lanjut'] },
    'clause-connect': { chip: 'Pilihan penghubung', rule: 'و / ثم / لكن / لأن / الذي', prompt: 'Pilih kata penghubung Arab yang tepat:', slotText: 'Isi bagian kosong dengan penghubung yang benar.', levels: ["'athf & maushul", 'waktu & tujuan', 'istitsna & lanjut'] },
    'grammar-mix': { chip: 'Campuran nahwu', rule: "fi'il · ال · huruf jar · syarat", prompt: 'Lengkapi kalimat Arab dengan pilihan yang tepat:', slotText: 'Campuran semua game nahwu.', levels: ['dasar', 'harian', 'lanjut'] },
  },
};

/** Shared copy for Mandarin and Japanese; grammar-specific labels are passed in. */
export function cjkGameUi(copy: {
  name: string;
  textLang: string;
  script: string;
  romanization: string;
  tensePrompt: string;
  tenseLevels: [string, string, string];
  verbFormsPrompt: string;
  verbFormsLevels: [string, string, string];
  modalChips: string[];
  questionParts: string[];
  extra?: Partial<GameUiCopy>;
}): GameUiCopy {
  const { name, script, romanization } = copy;
  return {
    ...englishGameUi,
    ...indonesianControls,
    textLang: copy.textLang,
    findTitle: `Find ${name} Words`,
    findHint: `Pilih kartu kosakata, lalu klik ${script} di papan.`,
    findCount: `kata ${name}`,
    findCheck: `Cek Kata ${name}`,
    wordMatchCount: `pasangan ${name}`,
    wordMatchCheck: `Cek ${name} Match`,
    letterTitle: `${script} Quest`,
    letterCount: `kata ${name}`,
    letterCheck: `Cek ${script}`,
    memoryTitle: `Cocokkan gambar dan kata ${name}`,
    memoryHint: `Buka kartu, ingat posisinya, lalu temukan pasangan gambar dan kata ${name}.`,
    tensePrompt: copy.tensePrompt,
    tenseLevels: copy.tenseLevels,
    timeline: ['Lampau', 'Sekarang', 'Nanti'],
    verbFormsPrompt: copy.verbFormsPrompt,
    verbFormsLevels: copy.verbFormsLevels,
    modalRule: 'kata kerja bantu + V',
    modalPrompt: `Pilih kata kerja bantu ${name} yang tepat:`,
    modalChips: copy.modalChips,
    modalClue: 'Petunjuk',
    conditionalPrompt: `Lengkapi kalimat syarat ${name}:`,
    conditionalIf: 'Syarat',
    conditionalIfValue: 'kondisi',
    conditionalResult: 'Hasil',
    conditionalResultValue: 'akibat',
    questionPrompt: `Pilih kata tanya ${name} yang tepat:`,
    questionStarter: 'Kata tanya',
    questionSubject: 'Kalimat',
    questionSubjectFallback: 'kalimat',
    questionPattern: 'Pola',
    questionParts: copy.questionParts,
    errorChip: `koreksi ${name}`,
    errorPlaceholder: `Pilih kalimat ${name} yang sudah benar`,
    sentenceLevels: ['Kalimat dasar', 'Kalimat harian', 'Kalimat kompleks'],
    sentenceLevelHints: ['pendek', 'harian', 'kompleks'],
    modalLevels: ['dasar', 'menengah', 'lanjutan'],
    questionLevels: ['dasar', 'cara & alasan', 'lanjutan'],
    errorLevels: ['urutan dasar', 'pola harian', 'konjungsi'],
    sentenceWords: 'kata',
    sentencePrompt: `Susun kalimat bahasa ${name}:`,
    sentenceTapHint: `Tap kata ${name} di bawah untuk menyusun jawaban.`,
    sentenceCorrect: `Benar. Kalimat ${name} sudah tepat.`,
    listenPrompt: `Dengarkan kata ${name} lalu pilih artinya:`,
    playAudio: `Putar Audio ${name}`,
    typingPrompt: `Ketik kata ${name} (${script} atau ${romanization}) dari arti ini:`,
    choosePrompt: `Pilih arti kata ${name} yang paling tepat:`,
    typingPlaceholder: `Ketik ${script} atau ${romanization}...`,
    blankModes: {
      'preposition-path': { chip: 'Pilihan posisi', rule: 'tempat · arah · posisi', prompt: `Pilih kata posisi/arah ${name} yang tepat:`, slotText: 'Isi bagian kosong dengan kata yang benar.', levels: ['dasar', 'menengah', 'lanjut'] },
      'clause-connect': { chip: 'Pilihan penghubung', rule: 'sebab · kontras · urutan', prompt: `Pilih kata penghubung ${name} yang tepat:`, slotText: 'Isi bagian kosong dengan penghubung yang benar.', levels: ['dasar', 'menengah', 'lanjut'] },
      'grammar-mix': { chip: 'Campuran grammar', rule: 'semua game grammar', prompt: `Lengkapi kalimat ${name} dengan pilihan yang tepat:`, slotText: 'Campuran semua game grammar.', levels: ['dasar', 'harian', 'lanjut'] },
    },
    ...copy.extra,
  };
}
