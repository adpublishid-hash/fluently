import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson14';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson14() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={14}
      LessonComponent={SourceLesson}
    />
  );
}
