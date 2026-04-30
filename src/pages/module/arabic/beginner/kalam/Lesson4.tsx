import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson4';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson4() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={4}
      LessonComponent={SourceLesson}
    />
  );
}
