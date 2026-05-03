import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson4';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson4() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={4}
      LessonComponent={SourceLesson}
    />
  );
}
