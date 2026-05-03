import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson28';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson28() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={28}
      LessonComponent={SourceLesson}
    />
  );
}
