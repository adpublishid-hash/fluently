import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson27';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson27() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={27}
      LessonComponent={SourceLesson}
    />
  );
}
