import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson14';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson14() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={14}
      LessonComponent={SourceLesson}
    />
  );
}
