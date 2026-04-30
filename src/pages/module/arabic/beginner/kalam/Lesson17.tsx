import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson17';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson17() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={17}
      LessonComponent={SourceLesson}
    />
  );
}
