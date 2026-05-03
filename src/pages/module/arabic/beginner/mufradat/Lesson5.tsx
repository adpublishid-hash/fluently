import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson5';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson5() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={5}
      LessonComponent={SourceLesson}
    />
  );
}
