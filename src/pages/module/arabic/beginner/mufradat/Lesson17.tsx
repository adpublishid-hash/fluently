import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson17';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson17() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={17}
      LessonComponent={SourceLesson}
    />
  );
}
