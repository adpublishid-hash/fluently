import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson14';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson14() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={14}
      LessonComponent={SourceLesson}
    />
  );
}
