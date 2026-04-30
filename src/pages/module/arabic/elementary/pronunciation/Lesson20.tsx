import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson20';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson20() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={20}
      LessonComponent={SourceLesson}
    />
  );
}
