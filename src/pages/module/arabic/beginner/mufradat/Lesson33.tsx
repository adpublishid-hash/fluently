import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson33';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson33() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={33}
      LessonComponent={SourceLesson}
    />
  );
}
