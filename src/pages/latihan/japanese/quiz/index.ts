import type { JapaneseLevelId, JapaneseSkillId } from '../../../module/japanese/japaneseModuleData';
import { japaneseLessonCore } from '../../../module/japanese/lessonCore';
import type { CorePool } from '../../../module/japanese/lessonCore/practice';
import type { VocabQuestion } from '../../components/PracticeQuizPage';
import { beginnerQuiz } from './beginner';
import { elementaryQuiz } from './elementary';
import { intermediateQuiz } from './intermediate';
import { advancedQuiz } from './advanced';
import { proficiencyQuiz } from './proficiency';
import { buildJapaneseTopicQuiz } from './build';
import type { JapaneseQuizTopic, QuizItem } from './types';

// Practice-only items per level and skill, one entry per topic (index = topic - 1).
export const japaneseQuizBanks: Partial<Record<JapaneseLevelId, Partial<Record<JapaneseSkillId, JapaneseQuizTopic[]>>>> = {
  beginner: beginnerQuiz,
  elementary: elementaryQuiz,
  intermediate: intermediateQuiz,
  advanced: advancedQuiz,
  proficiency: proficiencyQuiz,
};

const poolCache = new Map<JapaneseLevelId, CorePool>();

/** Level-wide distractor pool: every lesson phrase and every practice item of that level. */
function levelPool(level: JapaneseLevelId): CorePool {
  if (!poolCache.has(level)) {
    const lessonPhrases = Object.values(japaneseLessonCore[level] ?? {}).flatMap((lessons) => (lessons ?? []).flatMap(([, , phrases]) => phrases));
    const practiceItems = Object.values(japaneseQuizBanks[level] ?? {}).flatMap((topics) => (topics ?? []).flatMap(([basic, advanced]) => [...basic, ...advanced]));
    const all = [...lessonPhrases, ...practiceItems];
    poolCache.set(level, { japanese: all.map(([japanese]) => japanese), meanings: all.map(([, , meaning]) => meaning) });
  }
  return poolCache.get(level)!;
}

/** The 30-question quiz for one practice topic, or null when that level and skill has no bank yet. */
export function getJapaneseTopicQuiz(level: JapaneseLevelId, skill: JapaneseSkillId, topicNumber: number, topicId: string): VocabQuestion[] | null {
  const topic = japaneseQuizBanks[level]?.[skill]?.[topicNumber - 1];
  const lessonPhrases = japaneseLessonCore[level]?.[skill]?.[topicNumber - 1]?.[2];
  if (!topic || !lessonPhrases) return null;
  const intermediate: QuizItem[] = lessonPhrases.map(([japanese, romaji, meaning]) => [japanese, romaji, meaning]);
  return buildJapaneseTopicQuiz(level, skill, topicId, [topic[0], intermediate, topic[1]], levelPool(level));
}
