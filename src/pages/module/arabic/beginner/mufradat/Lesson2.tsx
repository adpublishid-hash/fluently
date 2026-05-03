import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson2';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson2() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={2}
      LessonComponent={SourceLesson}
    />
  );
}
