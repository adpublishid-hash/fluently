import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson8';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson8() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={8}
      LessonComponent={SourceLesson}
    />
  );
}
