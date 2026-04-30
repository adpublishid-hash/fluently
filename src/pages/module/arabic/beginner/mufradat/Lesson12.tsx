import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson12';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson12() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={12}
      LessonComponent={SourceLesson}
    />
  );
}
