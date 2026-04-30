import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson16';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson16() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={16}
      LessonComponent={SourceLesson}
    />
  );
}
