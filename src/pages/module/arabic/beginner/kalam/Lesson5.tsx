import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson5';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson5() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={5}
      LessonComponent={SourceLesson}
    />
  );
}
