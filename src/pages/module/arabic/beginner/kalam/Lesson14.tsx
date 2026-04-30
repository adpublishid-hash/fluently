import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson14';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson14() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={14}
      LessonComponent={SourceLesson}
    />
  );
}
