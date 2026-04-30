import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson3';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson3() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={3}
      LessonComponent={SourceLesson}
    />
  );
}
