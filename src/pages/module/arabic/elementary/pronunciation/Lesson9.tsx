import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson9';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson9() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={9}
      LessonComponent={SourceLesson}
    />
  );
}
