import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson12';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson12() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={12}
      LessonComponent={SourceLesson}
    />
  );
}
