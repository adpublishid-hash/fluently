import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson2';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson2() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={2}
      LessonComponent={SourceLesson}
    />
  );
}
