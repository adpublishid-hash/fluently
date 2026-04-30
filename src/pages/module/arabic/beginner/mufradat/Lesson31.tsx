import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson31';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson31() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={31}
      LessonComponent={SourceLesson}
    />
  );
}
