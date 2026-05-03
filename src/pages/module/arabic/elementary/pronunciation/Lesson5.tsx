import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson5';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson5() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={5}
      LessonComponent={SourceLesson}
    />
  );
}
