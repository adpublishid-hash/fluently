import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson18';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson18() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={18}
      LessonComponent={SourceLesson}
    />
  );
}
