import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson11';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson11() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={11}
      LessonComponent={SourceLesson}
    />
  );
}
