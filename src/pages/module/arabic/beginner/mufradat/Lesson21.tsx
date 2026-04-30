import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson21';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson21() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={21}
      LessonComponent={SourceLesson}
    />
  );
}
