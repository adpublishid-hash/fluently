import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson2';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson2() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={2}
      LessonComponent={SourceLesson}
    />
  );
}
