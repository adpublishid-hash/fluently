import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson3';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson3() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={3}
      LessonComponent={SourceLesson}
    />
  );
}
