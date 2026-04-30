import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson19';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson19() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={19}
      LessonComponent={SourceLesson}
    />
  );
}
