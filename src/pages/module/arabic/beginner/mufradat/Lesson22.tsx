import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson22';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson22() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={22}
      LessonComponent={SourceLesson}
    />
  );
}
