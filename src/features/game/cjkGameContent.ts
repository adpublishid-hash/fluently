// Game banks for Mandarin and Japanese, shaped like arabicGameContent so the
// arcade can swap them in by target language. The authored items live in ./mandarin and ./japanese.
import { hashSeed, seededRandom, seededShuffle } from '../../utils/quiz';
import { easyAspect, hardAspect, mediumAspect, type AspectTuple } from './mandarin/aspect';
import { complementForm, contrastForms, easyComplements, hardComplements, mediumComplements, type ComplementForm, type ComplementTuple } from './mandarin/complements';
import { easyConditionals, hardConditionals, mediumConditionals } from './mandarin/conditionals';
import { easyErrors, hardErrors, mediumErrors, type ErrorFixTuple } from './mandarin/errorFix';
import { easyMeasureWords, hardMeasureWords, mediumMeasureWords } from './mandarin/measureWords';
import { easyModals, hardModals, mediumModals } from './mandarin/modals';
import { easyQuestions, hardQuestions, mediumQuestions, type ChoiceTuple } from './mandarin/questions';
import { easySentences, hardSentences, mediumSentences, type SentenceTuple } from './mandarin/sentences';
import { easyVocab, hardVocab, mediumVocab, type VocabTuple } from './mandarin/vocab';
import * as ja from './japanese';
import { japaneseClauseConnectQuestions, japanesePrepositionPathQuestions, mandarinClauseConnectQuestions, mandarinPrepositionPathQuestions, type BlankChoiceQuestion } from './connectorBanks';

type LevelLabel = 'Easy' | 'Medium' | 'Hard';
type ByLevel<T> = Record<LevelLabel, T[]>;

type ChoiceQuestion = ReturnType<typeof choiceItem>;

export type CjkGameContent = {
  wordBank: Array<{ word: string; answer: string; options: string[]; hint: string }>;
  listenTapQuestions: Array<{ word: string; answer: string; options: string[]; hint: string; level: LevelLabel }>;
  letterQuestQuestions: Array<{ word: string; icon: string; color: string; level: LevelLabel; letters: string[] }>;
  sentenceBuilderQuestions: Array<{ prompt: string; answer: string[]; words: string[]; level: LevelLabel }>;
  tenseMasterQuestions: ChoiceQuestion[];
  questionBuilderQuestions: ChoiceQuestion[];
  verbFormsQuestions?: Array<ReturnType<typeof buildComplements>[number] | ReturnType<typeof buildConjugations>[number]>;
  articleDashQuestions?: ChoiceQuestion[];
  modalQuestQuestions?: ChoiceQuestion[];
  conditionalRunQuestions?: ChoiceQuestion[];
  errorFixQuestions?: ReturnType<typeof buildErrorFix>;
  prepositionPathQuestions?: BlankChoiceQuestion[];
  clauseConnectQuestions?: BlankChoiceQuestion[];
  fillerCharacters: string;
};

const LEVELS: LevelLabel[] = ['Easy', 'Medium', 'Hard'];

/** Deterministic shuffle so every build serves the same, non-predictable option order. */
function shuffleFor<T>(items: T[], ...seed: Array<string | number>) {
  return seededShuffle(items, seededRandom(hashSeed('cjk-game', ...seed)));
}

function buildVocabBanks(vocab: ByLevel<VocabTuple>) {
  const listenTapQuestions = LEVELS.flatMap((level) =>
    vocab[level].map(([word, reading, meaning]) => {
      const others = shuffleFor(vocab[level].filter((item) => item[2] !== meaning).map((item) => item[2]), 'listen', level, word);
      return { word, answer: meaning, options: shuffleFor([meaning, ...others.slice(0, 3)], 'listen-options', level, word), hint: reading, level };
    }),
  );
  const allCharacters = [...new Set(LEVELS.flatMap((level) => vocab[level].flatMap(([word]) => word.split(''))))];
  const letterQuestQuestions = LEVELS.flatMap((level) =>
    vocab[level].map(([word, , , icon, color], index) => {
      const distractors = shuffleFor(allCharacters.filter((character) => !word.includes(character)), 'letters', level, word);
      let letters = shuffleFor([...word.split(''), ...distractors.slice(0, Math.max(6, 10 - word.length))], 'board', level, word, index);
      // Never spell the word out in the first tiles.
      if (letters.slice(0, word.length).join('') === word) letters = [...letters.slice(word.length), ...letters.slice(0, word.length)];
      return { word, icon, color, level, letters };
    }),
  );
  return {
    wordBank: listenTapQuestions.filter((item) => item.level === 'Easy').slice(0, 8),
    listenTapQuestions,
    letterQuestQuestions,
    fillerCharacters: allCharacters.join(''),
  };
}

function buildSentences(sentences: ByLevel<SentenceTuple>) {
  return LEVELS.flatMap((level) =>
    sentences[level].map(([prompt, tokens]) => {
      const answer = tokens.split(' ');
      let words = shuffleFor(answer, 'sentence', level, tokens);
      // Never hand out the puzzle already solved.
      for (let shift = 1; words.join(' ') === tokens && shift < answer.length; shift += 1) {
        words = [...answer.slice(shift), ...answer.slice(0, shift)];
      }
      return { prompt, answer, words, level };
    }),
  );
}

function choiceItem([prompt, translation, answer, distractors, label, rule]: ChoiceTuple, level: LevelLabel, extra: { time?: string } = {}) {
  return {
    word: prompt,
    prompt,
    translation,
    answer,
    options: shuffleFor([answer, ...distractors].slice(0, 4), 'choice', level, prompt, translation),
    level,
    hint: translation,
    tense: label,
    tone: label,
    type: label,
    formula: rule,
    rule,
    ...extra,
  };
}

function buildChoices(items: ByLevel<ChoiceTuple>) {
  return LEVELS.flatMap((level) => items[level].map((item) => choiceItem(item, level)));
}

function buildAspect(items: ByLevel<AspectTuple>) {
  return LEVELS.flatMap((level) => items[level].map((item) => choiceItem(item.slice(0, 6) as ChoiceTuple, level, { time: item[6] })));
}

const FORM_COPY: Record<ComplementForm, { label: string; pattern: string }> = {
  Hasil: { label: 'Komplemen hasil', pattern: 'V + komplemen (sudah / belum)' },
  Belum: { label: 'Komplemen hasil', pattern: 'V + komplemen (sudah / belum)' },
  Bisa: { label: 'Komplemen potensial', pattern: 'V + 得/不 + komplemen' },
  'Tidak bisa': { label: 'Komplemen potensial', pattern: 'V + 得/不 + komplemen' },
};

function buildComplements(items: ByLevel<ComplementTuple>) {
  return LEVELS.flatMap((level) =>
    items[level].map(([verb, pinyin, verbMeaning, complement, form, translation, wrongComplement], index) => {
      const answer = complementForm(verb, complement, form);
      // One option swaps the complement (meaning check), two keep it but change the structure (form check).
      const wrong = [complementForm(verb, wrongComplement, form), ...contrastForms[form].map((other) => complementForm(verb, complement, other))];
      const directional = complement.length > 1 && /[来去]$/.test(complement);
      const copy = directional && FORM_COPY[form].label === 'Komplemen hasil' ? { label: 'Komplemen arah', pattern: 'V + arah (sudah / belum)' } : FORM_COPY[form];
      return {
        word: verb,
        prompt: `${verb} (${pinyin}) — ${verbMeaning}`,
        translation,
        answer,
        options: shuffleFor([answer, ...wrong], 'complement', level, verb, translation),
        forms: { 'Kata kerja': verb, Pinyin: pinyin, Arti: verbMeaning, Bentuk: answer },
        activeForm: 'Bentuk',
        formLabel: copy.label,
        pattern: copy.pattern,
        level,
        hint: translation,
        id: `${level}-${verb}-${index}`,
      };
    }),
  );
}

function buildConjugations(items: ByLevel<ja.ConjugationTuple>) {
  return LEVELS.flatMap((level) =>
    items[level].map(([dictionary, romaji, meaning, group, form, answer, wrong], index) => {
      const copy = ja.FORM_COPY[form];
      return {
        word: dictionary,
        prompt: `${dictionary} (${romaji}) — ${meaning}`,
        translation: `${meaning} (${copy.gloss})`,
        answer,
        options: shuffleFor([answer, ...wrong], 'conjugation', level, dictionary, form),
        forms: { Kamus: dictionary, Romaji: romaji, Golongan: `Golongan ${group}`, Bentuk: answer },
        activeForm: 'Bentuk',
        formLabel: copy.label,
        pattern: copy.pattern,
        level,
        hint: meaning,
        id: `${level}-${dictionary}-${index}`,
      };
    }),
  );
}

function buildErrorFix(items: ByLevel<ErrorFixTuple>) {
  return LEVELS.flatMap((level) =>
    items[level].map(([wrong, correct, translation, type, rule, alternatives]) => ({
      word: wrong,
      prompt: wrong,
      translation,
      answer: correct,
      options: shuffleFor([correct, wrong, ...alternatives], 'fix', level, wrong),
      type,
      rule,
      level,
      hint: translation,
    })),
  );
}

export const mandarinGameContent: CjkGameContent = {
  ...buildVocabBanks({ Easy: easyVocab, Medium: mediumVocab, Hard: hardVocab }),
  sentenceBuilderQuestions: buildSentences({ Easy: easySentences, Medium: mediumSentences, Hard: hardSentences }),
  tenseMasterQuestions: buildAspect({ Easy: easyAspect, Medium: mediumAspect, Hard: hardAspect }),
  questionBuilderQuestions: buildChoices({ Easy: easyQuestions, Medium: mediumQuestions, Hard: hardQuestions }),
  verbFormsQuestions: buildComplements({ Easy: easyComplements, Medium: mediumComplements, Hard: hardComplements }),
  articleDashQuestions: buildChoices({ Easy: easyMeasureWords, Medium: mediumMeasureWords, Hard: hardMeasureWords }),
  modalQuestQuestions: buildChoices({ Easy: easyModals, Medium: mediumModals, Hard: hardModals }),
  conditionalRunQuestions: buildChoices({ Easy: easyConditionals, Medium: mediumConditionals, Hard: hardConditionals }),
  errorFixQuestions: buildErrorFix({ Easy: easyErrors, Medium: mediumErrors, Hard: hardErrors }),
  prepositionPathQuestions: mandarinPrepositionPathQuestions,
  clauseConnectQuestions: mandarinClauseConnectQuestions,
};

export const japaneseGameContent: CjkGameContent = {
  ...buildVocabBanks({ Easy: ja.easyVocab, Medium: ja.mediumVocab, Hard: ja.hardVocab }),
  sentenceBuilderQuestions: buildSentences({ Easy: ja.easySentences, Medium: ja.mediumSentences, Hard: ja.hardSentences }),
  tenseMasterQuestions: buildAspect({ Easy: ja.easyForms, Medium: ja.mediumForms, Hard: ja.hardForms }),
  questionBuilderQuestions: buildChoices({ Easy: ja.easyQuestions, Medium: ja.mediumQuestions, Hard: ja.hardQuestions }),
  verbFormsQuestions: buildConjugations({ Easy: ja.easyConjugations, Medium: ja.mediumConjugations, Hard: ja.hardConjugations }),
  articleDashQuestions: buildChoices({ Easy: ja.easyParticles, Medium: ja.mediumParticles, Hard: ja.hardParticles }),
  modalQuestQuestions: buildChoices({ Easy: ja.easyExpressions, Medium: ja.mediumExpressions, Hard: ja.hardExpressions }),
  conditionalRunQuestions: buildChoices({ Easy: ja.easyConditionals, Medium: ja.mediumConditionals, Hard: ja.hardConditionals }),
  errorFixQuestions: buildErrorFix({ Easy: ja.easyErrors, Medium: ja.mediumErrors, Hard: ja.hardErrors }),
  prepositionPathQuestions: japanesePrepositionPathQuestions,
  clauseConnectQuestions: japaneseClauseConnectQuestions,
};
