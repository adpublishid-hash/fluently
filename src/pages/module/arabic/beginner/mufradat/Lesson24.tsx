import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson24';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson24() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={24}
      LessonComponent={SourceLesson}
    />
  );
}
