import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson10';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson10() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={10}
      LessonComponent={SourceLesson}
    />
  );
}
