import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson1';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson1() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={1}
      LessonComponent={SourceLesson}
    />
  );
}
