import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson4';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson4() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={4}
      LessonComponent={SourceLesson}
    />
  );
}
