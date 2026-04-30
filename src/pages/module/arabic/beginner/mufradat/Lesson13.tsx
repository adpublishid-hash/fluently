import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson13';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson13() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={13}
      LessonComponent={SourceLesson}
    />
  );
}
