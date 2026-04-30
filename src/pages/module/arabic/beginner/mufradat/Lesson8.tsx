import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson8';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson8() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={8}
      LessonComponent={SourceLesson}
    />
  );
}
