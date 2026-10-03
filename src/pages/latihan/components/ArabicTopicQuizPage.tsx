import { useCallback, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { getArabicTopicQuiz } from '../arabic/quiz';
import type { ArabicQuizSkill } from '../arabic/quiz/types';
import { VocabularyQuizPage } from './PracticeQuizPage';

const quizLabels: Record<ArabicQuizSkill, string> = {
  mufradat: 'Mufradat',
  nahwu: 'Nahwu',
  istima: 'Istima',
  kalam: 'Kalam',
  qiraah: 'Qiraah',
  kitabah: 'Kitabah',
  makharij: 'Makharij',
};

type QuizMaterial = { id: string; title: string; description: string; topicNumber: number };

/** The scored 30-question quiz of one Arabic practice topic (Basic, Intermediate, Advanced). */
export function ArabicTopicQuizPage({ skill, material }: { skill: ArabicQuizSkill; material: QuizMaterial }) {
  const topicPath = `/latihan/arabic/${skill}/topik${material.topicNumber}`;
  const questions = useMemo(() => getArabicTopicQuiz(skill, material.topicNumber, material.id) ?? [], [material.id, material.topicNumber, skill]);
  const buildQuizQuestions = useCallback(() => questions, [questions]);
  if (!questions.length) return <Navigate to={topicPath} replace />;
  return (
    <VocabularyQuizPage
      key={`${material.id}-quiz`}
      topicId={material.id}
      skillId={`arabic-${skill}`}
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel={quizLabels[skill]}
      backPath={topicPath}
    />
  );
}
