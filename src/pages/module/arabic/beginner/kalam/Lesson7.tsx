import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson7';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson7() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={7}
      LessonComponent={SourceLesson}
    />
  );
}
