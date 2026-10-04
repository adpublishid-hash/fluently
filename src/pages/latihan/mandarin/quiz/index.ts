import type { VocabQuestion } from '../../components/PracticeQuizPage';
import { buildMandarinTopicQuiz, buildQuizPool, type QuizPool } from './build';
import { cihui } from './cihui';
import { kouyu } from './kouyu';
import { pinyin } from './pinyin';
import { tingli } from './tingli';
import { xiezuo } from './xiezuo';
import { yuedu } from './yuedu';
import { yufa } from './yufa';
import type { MandarinQuizSkill, QuizTopic } from './types';

// Authored question banks for the Mandarin practice topics, one entry per topic (index = topic - 1).
export const mandarinQuizBanks: Partial<Record<MandarinQuizSkill, QuizTopic[]>> = {
  pinyin,
  cihui,
  yufa,
  tingli,
  kouyu,
  yuedu,
  xiezuo,
};

const poolCache = new Map<MandarinQuizSkill, QuizPool>();

/** The 30-question quiz for one practice topic, or null when the skill has no bank yet. */
export function getMandarinTopicQuiz(skill: MandarinQuizSkill, topicNumber: number, topicId: string): VocabQuestion[] | null {
  const bank = mandarinQuizBanks[skill];
  const topic = bank?.[topicNumber - 1];
  if (!bank || !topic) return null;
  if (!poolCache.has(skill)) poolCache.set(skill, buildQuizPool(bank));
  return buildMandarinTopicQuiz(skill, topicId, topic, poolCache.get(skill)!);
}
