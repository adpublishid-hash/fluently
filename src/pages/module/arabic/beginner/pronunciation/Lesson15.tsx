import SourceLesson from '../../../../ai-kamus/arabic/pemula/pronunciation/Lesson15';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerPronunciationLesson15() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="pronunciation"
      lessonId={15}
      LessonComponent={SourceLesson}
    />
  );
}
