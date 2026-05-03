import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson5';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson5() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={5}
      LessonComponent={SourceLesson}
    />
  );
}
