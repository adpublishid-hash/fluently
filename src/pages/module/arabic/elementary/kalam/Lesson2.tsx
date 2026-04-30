import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson2';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson2() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={2}
      LessonComponent={SourceLesson}
    />
  );
}
