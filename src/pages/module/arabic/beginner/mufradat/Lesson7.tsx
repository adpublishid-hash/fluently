import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson7';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson7() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={7}
      LessonComponent={SourceLesson}
    />
  );
}
