import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson37';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson37() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={37}
      LessonComponent={SourceLesson}
    />
  );
}
