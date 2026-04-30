import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson5';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson5() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={5}
      LessonComponent={SourceLesson}
    />
  );
}
