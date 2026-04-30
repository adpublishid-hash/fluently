import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson7';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson7() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={7}
      LessonComponent={SourceLesson}
    />
  );
}
