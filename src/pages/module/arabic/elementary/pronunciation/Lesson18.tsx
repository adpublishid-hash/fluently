import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson18';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson18() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={18}
      LessonComponent={SourceLesson}
    />
  );
}
