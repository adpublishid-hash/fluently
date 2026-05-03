import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson19';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson19() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={19}
      LessonComponent={SourceLesson}
    />
  );
}
