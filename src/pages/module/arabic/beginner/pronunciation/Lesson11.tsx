import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson11';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson11() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={11}
      LessonComponent={SourceLesson}
    />
  );
}
