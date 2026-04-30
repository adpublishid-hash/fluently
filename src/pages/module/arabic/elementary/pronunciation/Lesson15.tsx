import SourceLesson from '../../../../ai-kamus/arabic/elementary/pronunciation/Lesson15';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryPronunciationLesson15() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="pronunciation"
      lessonId={15}
      LessonComponent={SourceLesson}
    />
  );
}
