import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson13';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson13() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={13}
      LessonComponent={SourceLesson}
    />
  );
}
