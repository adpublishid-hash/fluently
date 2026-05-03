import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson19';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson19() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={19}
      LessonComponent={SourceLesson}
    />
  );
}
