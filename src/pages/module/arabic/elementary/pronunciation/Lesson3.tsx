import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson3';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson3() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={3}
      LessonComponent={SourceLesson}
    />
  );
}
