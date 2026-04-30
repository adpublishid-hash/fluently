import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson20';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson20() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={20}
      LessonComponent={SourceLesson}
    />
  );
}
