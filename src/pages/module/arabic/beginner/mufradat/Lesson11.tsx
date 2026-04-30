import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson11';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson11() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={11}
      LessonComponent={SourceLesson}
    />
  );
}
