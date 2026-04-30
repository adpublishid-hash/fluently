import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson34';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson34() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={34}
      LessonComponent={SourceLesson}
    />
  );
}
