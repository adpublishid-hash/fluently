import { useCallback, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { japaneseLevels, japaneseSkills, type JapaneseLevelId, type JapaneseSkillId } from '../../module/japanese/japaneseModuleData';
import { getJapaneseTopicQuiz } from '../japanese/quiz';
import { VocabularyQuizPage } from './PracticeQuizPage';

/** The scored 30-question quiz of one Japanese practice topic (Basic, Intermediate, Advanced). */
export function JapaneseTopicQuizPage({ level, skill, topicNumber, topicTitle }: { level: JapaneseLevelId; skill: JapaneseSkillId; topicNumber: number; topicTitle: string }) {
  const topicPath = `/latihan/japanese/${skill}/topik${topicNumber}?level=${level}`;
  const topicId = `japanese-${level}-${skill}-${topicNumber}`;
  const questions = useMemo(() => getJapaneseTopicQuiz(level, skill, topicNumber, topicId) ?? [], [level, skill, topicNumber, topicId]);
  const buildQuizQuestions = useCallback(() => questions, [questions]);
  const quizTopics = useMemo(
    () => [{ id: topicId, title: `${japaneseLevels[level].badge} · ${topicTitle}`, description: '', topicNumber }],
    [level, topicId, topicNumber, topicTitle],
  );
  if (!questions.length) return <Navigate to={topicPath} replace />;
  return (
    <VocabularyQuizPage
      key={`${topicId}-quiz`}
      topicId={topicId}
      skillId={`japanese-${skill}`}
      quizTopics={quizTopics}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel={japaneseSkills.find((item) => item.id === skill)?.label ?? 'Japanese'}
      backPath={topicPath}
    />
  );
}
