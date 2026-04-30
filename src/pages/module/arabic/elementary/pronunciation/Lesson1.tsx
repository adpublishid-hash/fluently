import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson1';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson1() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={1}
      LessonComponent={SourceLesson}
    />
  );
}
