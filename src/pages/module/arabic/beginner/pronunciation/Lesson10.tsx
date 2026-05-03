import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson10';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson10() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={10}
      LessonComponent={SourceLesson}
    />
  );
}
