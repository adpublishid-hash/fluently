import { useCallback, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { getMandarinTopicQuiz } from '../mandarin/quiz';
import type { MandarinQuizSkill } from '../mandarin/quiz/types';
import { VocabularyQuizPage } from './PracticeQuizPage';

const quizLabels: Record<MandarinQuizSkill, string> = {
  pinyin: 'Pīnyīn',
  cihui: 'Cíhuì',
  yufa: 'Yǔfǎ',
  tingli: 'Tīnglì',
  kouyu: 'Kǒuyǔ',
  yuedu: 'Yuèdú',
  xiezuo: 'Xiězuò',
};

type QuizMaterial = { id: string; title: string; description: string; topicNumber: number };

/** The scored 30-question quiz of one Mandarin practice topic (Basic, Intermediate, Advanced). */
export function MandarinTopicQuizPage({ skill, material }: { skill: MandarinQuizSkill; material: QuizMaterial }) {
  const topicPath = `/latihan/mandarin/${skill}/topik${material.topicNumber}`;
  const questions = useMemo(() => getMandarinTopicQuiz(skill, material.topicNumber, material.id) ?? [], [material.id, material.topicNumber, skill]);
  const buildQuizQuestions = useCallback(() => questions, [questions]);
  if (!questions.length) return <Navigate to={topicPath} replace />;
  return (
    <VocabularyQuizPage
      key={`${material.id}-quiz`}
      topicId={material.id}
      skillId={`mandarin-${skill}`}
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel={quizLabels[skill]}
      backPath={topicPath}
    />
  );
}
