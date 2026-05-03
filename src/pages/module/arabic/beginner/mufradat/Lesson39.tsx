import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson39';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson39() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={39}
      LessonComponent={SourceLesson}
    />
  );
}
