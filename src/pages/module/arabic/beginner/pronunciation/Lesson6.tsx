import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson6';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson6() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={6}
      LessonComponent={SourceLesson}
    />
  );
}
