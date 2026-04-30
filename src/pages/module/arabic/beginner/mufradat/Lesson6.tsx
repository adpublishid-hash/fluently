import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson6';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson6() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={6}
      LessonComponent={SourceLesson}
    />
  );
}
