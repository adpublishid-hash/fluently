import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson6';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson6() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={6}
      LessonComponent={SourceLesson}
    />
  );
}
