import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson12';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson12() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={12}
      LessonComponent={SourceLesson}
    />
  );
}
