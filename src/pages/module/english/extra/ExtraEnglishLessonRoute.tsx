import LessonNotFound from '../EnglishLessonNotFound';
import ExtraEnglishLessonPage from './ExtraEnglishLessonPage';
import { getExtraEnglishLesson } from '.';

export default function ExtraEnglishLessonRoute({ level, skill, lessonId }: { level: string; skill: string; lessonId: number }) {
  const lesson = getExtraEnglishLesson(level, skill, lessonId);
  if (!lesson) return <LessonNotFound />;
  return <ExtraEnglishLessonPage key={`${level}/${skill}/${lessonId}`} level={level} skill={skill} lesson={lesson} />;
}
