import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson23';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson23() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={23}
      LessonComponent={SourceLesson}
    />
  );
}
