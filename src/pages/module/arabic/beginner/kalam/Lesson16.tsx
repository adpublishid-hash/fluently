import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson16';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson16() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={16}
      LessonComponent={SourceLesson}
    />
  );
}
