import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson3';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson3() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={3}
      LessonComponent={SourceLesson}
    />
  );
}
