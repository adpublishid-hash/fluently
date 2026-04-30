import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson12';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson12() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={12}
      LessonComponent={SourceLesson}
    />
  );
}
