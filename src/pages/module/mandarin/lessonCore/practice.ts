import { buildChoiceQuestion, seededRandom, type ChoiceQuestion } from '../../../../utils/quiz';
import type { MandarinSkillId } from '../mandarinModuleData';
import { scrambledOrders, toneVariants } from '../mandarinPracticeGenerator';
import type { MandarinLessonCore } from './index';

type Kind = 'meaning' | 'hanzi' | 'heard' | 'pinyin' | 'order';
type Phrase = MandarinLessonCore['phrases'][number];

// Question type per phrase, so each skill practises its own lesson material its own way.
const kindsBySkill: Record<MandarinSkillId, Kind[]> = {
  grammar: ['order', 'meaning', 'order', 'hanzi'],
  speaking: ['hanzi', 'pinyin', 'order', 'hanzi'],
  listening: ['heard', 'heard', 'meaning', 'heard'],
  reading: ['meaning', 'meaning', 'order', 'meaning'],
  writing: ['order', 'hanzi', 'order', 'hanzi'],
  vocabulary: ['meaning', 'hanzi', 'meaning', 'hanzi'],
  pronunciation: ['pinyin', 'pinyin', 'heard', 'pinyin'],
};

export type CorePool = { meanings: string[]; hanzi: string[] };

function ask(kind: Kind, phrase: Phrase, pool: CorePool, random: () => number): ChoiceQuestion | null {
  if (kind === 'order') {
    const distractors = scrambledOrders(phrase.hanzi, random);
    if (distractors.length >= 2) return buildChoiceQuestion(`Susunan yang benar untuk "${phrase.meaning}" adalah...`, phrase.hanzi, distractors, random);
    return ask('hanzi', phrase, pool, random);
  }
  if (kind === 'pinyin') {
    const question = buildChoiceQuestion(`Cara membaca「${phrase.hanzi}」dengan nada yang tepat adalah...`, phrase.pinyin, toneVariants(phrase.pinyin, random), random);
    return question ?? ask('meaning', phrase, pool, random);
  }
  if (kind === 'hanzi') return buildChoiceQuestion(`Ungkapan Mandarin untuk "${phrase.meaning}" adalah...`, phrase.hanzi, pool.hanzi, random);
  if (kind === 'heard') return buildChoiceQuestion(`Kamu mendengar: "${phrase.pinyin}". Maksudnya...`, phrase.meaning, pool.meanings, random);
  return buildChoiceQuestion(`Makna ungkapan「${phrase.hanzi}」adalah...`, phrase.meaning, pool.meanings, random);
}

export function buildMandarinCorePractice(skillId: MandarinSkillId, core: MandarinLessonCore, pool: CorePool, seed: number): ChoiceQuestion[] {
  const random = seededRandom(seed);
  return core.phrases
    .map((phrase, index) => ask(kindsBySkill[skillId][index % kindsBySkill[skillId].length], phrase, pool, random))
    .filter((question): question is ChoiceQuestion => question !== null);
}
