import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson13';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson13() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={13}
      LessonComponent={SourceLesson}
    />
  );
}
