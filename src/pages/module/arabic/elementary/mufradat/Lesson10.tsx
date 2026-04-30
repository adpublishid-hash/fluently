import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson10';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson10() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={10}
      LessonComponent={SourceLesson}
    />
  );
}
