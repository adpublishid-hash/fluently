import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson17';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson17() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={17}
      LessonComponent={SourceLesson}
    />
  );
}
