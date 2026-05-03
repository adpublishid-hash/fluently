import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson17';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson17() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={17}
      LessonComponent={SourceLesson}
    />
  );
}
