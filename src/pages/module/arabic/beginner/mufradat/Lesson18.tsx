import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson18';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson18() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={18}
      LessonComponent={SourceLesson}
    />
  );
}
