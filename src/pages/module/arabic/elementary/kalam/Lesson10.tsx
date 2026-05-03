import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson10';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson10() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={10}
      LessonComponent={SourceLesson}
    />
  );
}
