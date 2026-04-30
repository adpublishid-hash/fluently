import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson36';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson36() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={36}
      LessonComponent={SourceLesson}
    />
  );
}
