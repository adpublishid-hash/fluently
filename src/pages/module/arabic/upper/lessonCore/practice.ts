import { buildChoiceQuestion, seededRandom, type ChoiceQuestion } from '../../../../../utils/quiz';
import type { ArabicSkillId } from '../../arabicModuleData';
import { scrambledOrders } from '../arabicThemePractice';
import type { ArabicLessonCore } from './index';

type Kind = 'meaning' | 'arabic' | 'heard' | 'reading' | 'order';
type Phrase = ArabicLessonCore['phrases'][number];

// Question type per phrase, so each skill practises its own lesson material its own way.
const kindsBySkill: Record<ArabicSkillId, Kind[]> = {
  kalam: ['arabic', 'arabic', 'order', 'arabic'],
  istima: ['heard', 'heard', 'meaning', 'heard'],
  qiraah: ['meaning', 'meaning', 'order', 'meaning'],
  kitabah: ['order', 'arabic', 'order', 'arabic'],
  mufradat: ['meaning', 'arabic', 'meaning', 'arabic'],
  grammar: ['order', 'meaning', 'order', 'meaning'],
  pronunciation: ['reading', 'reading', 'meaning', 'reading'],
};

export type CorePool = { meanings: string[]; arabic: string[]; transliterations: string[] };

function ask(kind: Kind, phrase: Phrase, pool: CorePool, random: () => number): ChoiceQuestion | null {
  if (kind === 'order') {
    const distractors = scrambledOrders(phrase.arabic, random);
    if (distractors.length >= 2) {
      return buildChoiceQuestion(`Susunan yang benar untuk "${phrase.meaning}" adalah...`, phrase.arabic, distractors, random);
    }
    return ask('arabic', phrase, pool, random);
  }
  if (kind === 'arabic') return buildChoiceQuestion(`Ungkapan Arab untuk "${phrase.meaning}" adalah...`, phrase.arabic, pool.arabic, random);
  if (kind === 'heard') return buildChoiceQuestion(`Kamu mendengar: "${phrase.transliteration}". Maksudnya...`, phrase.meaning, pool.meanings, random);
  if (kind === 'reading') return buildChoiceQuestion(`Cara membaca「${phrase.arabic}」yang tepat adalah...`, phrase.transliteration, pool.transliterations, random);
  return buildChoiceQuestion(`Makna ungkapan「${phrase.arabic}」adalah...`, phrase.meaning, pool.meanings, random);
}

export function buildLessonCorePractice(skillId: ArabicSkillId, core: ArabicLessonCore, pool: CorePool, seed: number): ChoiceQuestion[] {
  const random = seededRandom(seed);
  return core.phrases
    .map((phrase, index) => ask(kindsBySkill[skillId][index % kindsBySkill[skillId].length], phrase, pool, random))
    .filter((question): question is ChoiceQuestion => question !== null);
}
