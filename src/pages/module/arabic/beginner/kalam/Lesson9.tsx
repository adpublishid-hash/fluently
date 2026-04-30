import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson9';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson9() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={9}
      LessonComponent={SourceLesson}
    />
  );
}
