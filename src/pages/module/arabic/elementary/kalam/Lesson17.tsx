import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson17';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson17() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={17}
      LessonComponent={SourceLesson}
    />
  );
}
