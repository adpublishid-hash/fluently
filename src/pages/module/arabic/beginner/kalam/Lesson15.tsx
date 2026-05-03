import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson15';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson15() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={15}
      LessonComponent={SourceLesson}
    />
  );
}
