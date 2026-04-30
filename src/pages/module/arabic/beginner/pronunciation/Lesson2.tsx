import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson2';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson2() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={2}
      LessonComponent={SourceLesson}
    />
  );
}
