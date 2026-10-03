import type { VocabQuestion } from '../../components/PracticeQuizPage';
import { buildArabicTopicQuiz, buildQuizPool, type QuizPool } from './build';
import { istima } from './istima';
import { kalam } from './kalam';
import { kitabah } from './kitabah';
import { makharij } from './makharij';
import { mufradat } from './mufradat';
import { nahwu } from './nahwu';
import { qiraah } from './qiraah';
import type { ArabicQuizSkill, QuizTopic } from './types';

// Authored question banks for the Arabic practice topics, one entry per topic (index = topic - 1).
export const arabicQuizBanks: Partial<Record<ArabicQuizSkill, QuizTopic[]>> = {
  mufradat,
  istima,
  kalam,
  qiraah,
  kitabah,
  nahwu,
  makharij,
};

const poolCache = new Map<ArabicQuizSkill, QuizPool>();

/** The 30-question quiz for one practice topic, or null when the skill has no bank yet. */
export function getArabicTopicQuiz(skill: ArabicQuizSkill, topicNumber: number, topicId: string): VocabQuestion[] | null {
  const bank = arabicQuizBanks[skill];
  const topic = bank?.[topicNumber - 1];
  if (!bank || !topic) return null;
  if (!poolCache.has(skill)) poolCache.set(skill, buildQuizPool(bank));
  return buildArabicTopicQuiz(skill, topicId, topic, poolCache.get(skill)!);
}
