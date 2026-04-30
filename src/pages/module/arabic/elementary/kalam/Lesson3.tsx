import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson3';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson3() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={3}
      LessonComponent={SourceLesson}
    />
  );
}
