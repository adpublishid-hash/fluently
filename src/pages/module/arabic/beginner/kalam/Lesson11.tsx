import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson11';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson11() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={11}
      LessonComponent={SourceLesson}
    />
  );
}
