import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson6';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson6() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={6}
      LessonComponent={SourceLesson}
    />
  );
}
