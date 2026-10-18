// Preposition Path, Clause Connect and Grammar Mix banks for every arcade language.
// Each of the first two has 30 authored items per level; Grammar Mix draws from the fill-in-the-blank banks.
import { hashSeed, seededRandom, seededShuffle } from '../../utils/quiz';
import { easyClauses as arEasyClauses, hardClauses as arHardClauses, mediumClauses as arMediumClauses } from './arabic/clauses';
import { easyPrepositions as arEasyPrepositions, hardPrepositions as arHardPrepositions, mediumPrepositions as arMediumPrepositions } from './arabic/prepositions';
import { easyClauses as enEasyClauses, hardClauses as enHardClauses, mediumClauses as enMediumClauses } from './english/clauses';
import { easyPrepositions as enEasyPrepositions, hardPrepositions as enHardPrepositions, mediumPrepositions as enMediumPrepositions } from './english/prepositions';
import { easyClauses as jaEasyClauses, hardClauses as jaHardClauses, mediumClauses as jaMediumClauses } from './japanese/clauses';
import { easyPositions, hardPositions, mediumPositions } from './japanese/positions';
import { easyClauses as zhEasyClauses, hardClauses as zhHardClauses, mediumClauses as zhMediumClauses } from './mandarin/clauses';
import { easyPrepositions as zhEasyPrepositions, hardPrepositions as zhHardPrepositions, mediumPrepositions as zhMediumPrepositions } from './mandarin/prepositions';
import type { ChoiceTuple } from './mandarin/questions';

type LevelLabel = 'Easy' | 'Medium' | 'Hard';
const LEVELS: LevelLabel[] = ['Easy', 'Medium', 'Hard'];

export type BlankChoiceQuestion = {
  word: string;
  prompt: string;
  translation: string;
  answer: string;
  options: string[];
  level: LevelLabel;
  hint: string;
  type: string;
  rule: string;
};

function buildBank(language: string, mode: string, byLevel: Record<LevelLabel, ChoiceTuple[]>): BlankChoiceQuestion[] {
  return LEVELS.flatMap((level) =>
    byLevel[level].map(([prompt, translation, answer, wrong, label, rule]) => ({
      word: prompt,
      prompt,
      translation,
      answer,
      options: seededShuffle([answer, ...wrong.slice(0, 3)], seededRandom(hashSeed(language, mode, level, prompt, translation))),
      level,
      hint: translation,
      type: label,
      rule,
    })),
  );
}

export const englishPrepositionPathQuestions = buildBank('en', 'preposition', { Easy: enEasyPrepositions, Medium: enMediumPrepositions, Hard: enHardPrepositions });
export const englishClauseConnectQuestions = buildBank('en', 'clause', { Easy: enEasyClauses, Medium: enMediumClauses, Hard: enHardClauses });
export const arabicPrepositionPathQuestions = buildBank('ar', 'preposition', { Easy: arEasyPrepositions, Medium: arMediumPrepositions, Hard: arHardPrepositions });
export const arabicClauseConnectQuestions = buildBank('ar', 'clause', { Easy: arEasyClauses, Medium: arMediumClauses, Hard: arHardClauses });
export const mandarinPrepositionPathQuestions = buildBank('zh', 'preposition', { Easy: zhEasyPrepositions, Medium: zhMediumPrepositions, Hard: zhHardPrepositions });
export const mandarinClauseConnectQuestions = buildBank('zh', 'clause', { Easy: zhEasyClauses, Medium: zhMediumClauses, Hard: zhHardClauses });
export const japanesePrepositionPathQuestions = buildBank('ja', 'preposition', { Easy: easyPositions, Medium: mediumPositions, Hard: hardPositions });
export const japaneseClauseConnectQuestions = buildBank('ja', 'clause', { Easy: jaEasyClauses, Medium: jaMediumClauses, Hard: jaHardClauses });

type MixSource = {
  prompt?: string;
  translation?: string;
  answer: string;
  options: string[];
  level: string;
  type?: string;
  tense?: string;
  tone?: string;
  rule?: string;
  formula?: string;
};

/**
 * Grammar Mix: 30 questions per level, taken in turn from each fill-in-the-blank bank
 * (tense, articles/particles, modals, conditionals, questions, prepositions, clauses),
 * so one round reviews every grammar game. Items keep their own options and rule.
 */
export function buildGrammarMix(sources: unknown[][], perLevel = 30): BlankChoiceQuestion[] {
  return LEVELS.flatMap((level) => {
    const pools = sources.map((source, index) =>
      seededShuffle(
        (source as MixSource[]).filter((item) => item.level === level && item.prompt?.includes('____')),
        seededRandom(hashSeed('grammar-mix', level, index)),
      ),
    );
    const picked: BlankChoiceQuestion[] = [];
    const seen = new Set<string>();
    for (let round = 0; picked.length < perLevel && pools.some((pool) => round < pool.length); round += 1) {
      pools.forEach((pool) => {
        const item = pool[round];
        if (!item || picked.length >= perLevel) return;
        const key = `${item.prompt}|${item.translation}`;
        if (seen.has(key)) return;
        seen.add(key);
        picked.push({
          word: item.prompt as string,
          prompt: item.prompt as string,
          translation: item.translation ?? '',
          answer: item.answer,
          options: item.options,
          level,
          hint: item.translation ?? '',
          type: item.type ?? item.tense ?? item.tone ?? '',
          rule: item.rule ?? item.formula ?? '',
        });
      });
    }
    return picked;
  });
}
