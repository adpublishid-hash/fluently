import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson16';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson16() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={16}
      LessonComponent={SourceLesson}
    />
  );
}
