import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson11';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson11() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={11}
      LessonComponent={SourceLesson}
    />
  );
}
