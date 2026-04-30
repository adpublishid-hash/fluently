import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson8';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson8() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={8}
      LessonComponent={SourceLesson}
    />
  );
}
