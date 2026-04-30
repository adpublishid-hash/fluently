import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson3';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson3() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={3}
      LessonComponent={SourceLesson}
    />
  );
}
