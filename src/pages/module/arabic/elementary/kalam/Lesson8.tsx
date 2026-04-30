import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson8';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson8() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={8}
      LessonComponent={SourceLesson}
    />
  );
}
