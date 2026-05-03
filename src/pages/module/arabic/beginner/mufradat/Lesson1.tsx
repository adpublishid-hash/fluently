import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson1';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson1() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={1}
      LessonComponent={SourceLesson}
    />
  );
}
