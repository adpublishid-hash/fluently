import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson1';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson1() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={1}
      LessonComponent={SourceLesson}
    />
  );
}
