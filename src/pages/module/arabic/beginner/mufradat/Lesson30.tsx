import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson30';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson30() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={30}
      LessonComponent={SourceLesson}
    />
  );
}
