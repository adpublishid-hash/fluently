import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson25';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson25() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={25}
      LessonComponent={SourceLesson}
    />
  );
}
