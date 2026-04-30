import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson6';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson6() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={6}
      LessonComponent={SourceLesson}
    />
  );
}
