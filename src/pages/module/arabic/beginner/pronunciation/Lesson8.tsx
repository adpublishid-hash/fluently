import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson8';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson8() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={8}
      LessonComponent={SourceLesson}
    />
  );
}
