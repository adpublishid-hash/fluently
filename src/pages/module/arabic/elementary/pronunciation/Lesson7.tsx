import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson7';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson7() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={7}
      LessonComponent={SourceLesson}
    />
  );
}
