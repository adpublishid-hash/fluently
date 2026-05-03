import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson12';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson12() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={12}
      LessonComponent={SourceLesson}
    />
  );
}
