import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson1';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson1() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={1}
      LessonComponent={SourceLesson}
    />
  );
}
