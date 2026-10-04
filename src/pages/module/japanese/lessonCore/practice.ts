import { buildChoiceQuestion, seededRandom, seededShuffle, type ChoiceQuestion } from '../../../../utils/quiz';
import type { JapaneseSkillId } from '../japaneseModuleData';
import { CLOSE, PARTICLES, romajiVariants, segmenter } from '../japanesePracticeGenerator';
import type { JapaneseLessonCore } from './index';

export type JapaneseQuestionKind = 'meaning' | 'japanese' | 'heard' | 'romaji' | 'particle' | 'order';
type Kind = JapaneseQuestionKind;
type Phrase = JapaneseLessonCore['phrases'][number];

// Question type per phrase, so each skill practises its own lesson material its own way.
const kindsBySkill: Record<JapaneseSkillId, Kind[]> = {
  grammar: ['particle', 'order', 'particle', 'order'],
  speaking: ['japanese', 'heard', 'japanese', 'heard'],
  listening: ['heard', 'heard', 'heard', 'heard'],
  reading: ['meaning', 'meaning', 'order', 'meaning'],
  writing: ['japanese', 'order', 'japanese', 'order'],
  vocabulary: ['meaning', 'japanese', 'meaning', 'japanese'],
  pronunciation: ['romaji', 'romaji', 'heard', 'romaji'],
};

// A second, different question type per phrase, so the authored material fills more of the drill.
const followUpKindsBySkill: Record<JapaneseSkillId, Kind[]> = {
  grammar: ['meaning', 'japanese', 'meaning', 'japanese'],
  speaking: ['romaji', 'order', 'heard', 'japanese'],
  listening: ['meaning', 'japanese', 'meaning', 'japanese'],
  reading: ['particle', 'japanese', 'meaning', 'romaji'],
  writing: ['order', 'japanese', 'particle', 'japanese'],
  vocabulary: ['japanese', 'meaning', 'romaji', 'heard'],
  pronunciation: ['heard', 'meaning', 'romaji', 'heard'],
};

const BACKUP_KINDS: Kind[] = ['meaning', 'japanese', 'heard', 'romaji'];

const SENTENCE_END = /[。？！?!]+$/;

export type CorePool = { meanings: string[]; japanese: string[] };

const isSentence = (text: string) => SENTENCE_END.test(text);

/** Keeps distractors the same shape as the answer: full sentences against sentences, phrases against phrases. */
function sameShape(pool: CorePool, phrase: Phrase): CorePool {
  // Items with the answer's exact meaning are left out, so only one option can be right.
  const keep = pool.japanese.map((japanese, index) => isSentence(japanese) === isSentence(phrase.japanese) && pool.meanings[index] !== phrase.meaning);
  return { japanese: pool.japanese.filter((_, index) => keep[index]), meanings: pool.meanings.filter((_, index) => keep[index]) };
}


const HIRAGANA_ONLY = /^[\u3041-\u309f]+$/;
const ENDS_WITH_PARTICLE = /[はがをにでへとものやかねよ、]$/;
const ENDS_WITH_WORD = /[\u30a0-\u30ff\u4e00-\u9fff0-9０-９]$/;

/**
 * Splits a sentence into phrase chunks (bunsetsu-like): kana endings and
 * particles stay with their word, compounds stay together.
 */
function chunks(japanese: string): string[] {
  if (!segmenter) return [];
  const body = japanese.replace(SENTENCE_END, '');
  const result: string[] = [];
  [...segmenter.segment(body)].forEach(({ segment }) => {
    if (!segment.trim()) return;
    const last = result[result.length - 1];
    const attach = last !== undefined && (
      /^[、，」』]+$/.test(segment)
      || (HIRAGANA_ONLY.test(segment) && !ENDS_WITH_PARTICLE.test(last))
      || (!HIRAGANA_ONLY.test(segment) && ENDS_WITH_WORD.test(last))
    );
    if (attach) result[result.length - 1] += segment;
    else result.push(segment);
  });
  return result;
}

function scrambled(japanese: string, random: () => number): string[] {
  const parts = chunks(japanese);
  if (parts.length < 3) return [];
  const end = japanese.match(SENTENCE_END)?.[0] ?? '';
  const variants = new Set<string>();
  // Japanese word order is free except that the predicate comes last, so only orders that move the
  // final chunk away from the end are certainly wrong; other shuffles can still be correct sentences.
  const predicate = parts[parts.length - 1];
  for (let attempt = 0; attempt < 24 && variants.size < 3; attempt += 1) {
    const shuffled = seededShuffle(parts, random);
    if (shuffled[shuffled.length - 1] === predicate) continue;
    variants.add(shuffled.join('') + end);
  }
  return [...variants];
}

function blankParticle(phrase: Phrase, random: () => number): ChoiceQuestion | null {
  if (!segmenter) return null;
  const parts = [...segmenter.segment(phrase.japanese)].map((item) => item.segment);
  const positions = parts.flatMap((part, index) => (index > 0 && PARTICLES.includes(part) ? [index] : []));
  if (!positions.length) return null;
  const position = positions[Math.floor(random() * positions.length)];
  const answer = parts[position];
  const blanked = parts.map((part, index) => (index === position ? '＿' : part)).join('');
  const pool = PARTICLES.filter((item) => item !== answer && !(CLOSE[answer] ?? []).includes(item));
  return buildChoiceQuestion(`Partikel yang tepat: ${blanked} (${phrase.meaning})`, answer, pool, random);
}

/** One question of the given kind about a phrase; falls back to a related kind when the phrase does not fit. */
export function askJapaneseQuestion(kind: Kind, phrase: Phrase, fullPool: CorePool, random: () => number): ChoiceQuestion | null {
  const pool = sameShape(fullPool, phrase);
  if (kind === 'particle') return blankParticle(phrase, random) ?? askJapaneseQuestion('order', phrase, pool, random);
  if (kind === 'order') {
    const distractors = scrambled(phrase.japanese, random);
    if (distractors.length >= 2) return buildChoiceQuestion(`Susunan yang benar untuk "${phrase.meaning}" adalah...`, phrase.japanese, distractors, random);
    return askJapaneseQuestion('japanese', phrase, pool, random);
  }
  if (kind === 'romaji') {
    const variants = romajiVariants(phrase.romaji, random);
    if (variants.length >= 2) return buildChoiceQuestion(`Romaji yang tepat untuk「${phrase.japanese}」adalah...`, phrase.romaji, variants, random);
    return askJapaneseQuestion('meaning', phrase, pool, random);
  }
  if (kind === 'japanese') return buildChoiceQuestion(`Ungkapan Jepang untuk "${phrase.meaning}" adalah...`, phrase.japanese, pool.japanese, random);
  if (kind === 'heard') return buildChoiceQuestion(`Kamu mendengar: "${phrase.romaji}". Maksudnya...`, phrase.meaning, pool.meanings, random);
  return buildChoiceQuestion(`Makna ungkapan「${phrase.japanese}」adalah...`, phrase.meaning, pool.meanings, random);
}

export function buildJapaneseCorePractice(skillId: JapaneseSkillId, core: JapaneseLessonCore, pool: CorePool, seed: number): ChoiceQuestion[] {
  const random = seededRandom(seed);
  const seen = new Set<string>();
  const questions: ChoiceQuestion[] = [];
  [kindsBySkill, followUpKindsBySkill].forEach((kinds) => core.phrases.forEach((phrase, index) => {
    // When a fallback repeats an earlier question, try the remaining kinds instead.
    const preferred = kinds[skillId][index % kinds[skillId].length];
    for (const kind of [preferred, ...BACKUP_KINDS]) {
      const question = askJapaneseQuestion(kind, phrase, pool, random);
      if (question && !seen.has(question.question)) {
        seen.add(question.question);
        questions.push(question);
        return;
      }
    }
  }));
  return questions;
}
