import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson13';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson13() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={13}
      LessonComponent={SourceLesson}
    />
  );
}
