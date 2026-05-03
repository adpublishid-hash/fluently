import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson7';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson7() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={7}
      LessonComponent={SourceLesson}
    />
  );
}
