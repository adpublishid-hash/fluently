import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson13';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson13() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={13}
      LessonComponent={SourceLesson}
    />
  );
}
