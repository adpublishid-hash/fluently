import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson10';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson10() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={10}
      LessonComponent={SourceLesson}
    />
  );
}
