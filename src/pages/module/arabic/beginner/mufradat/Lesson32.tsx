import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson32';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson32() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={32}
      LessonComponent={SourceLesson}
    />
  );
}
