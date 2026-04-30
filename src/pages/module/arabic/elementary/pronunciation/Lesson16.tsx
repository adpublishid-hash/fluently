import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson16';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson16() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={16}
      LessonComponent={SourceLesson}
    />
  );
}
