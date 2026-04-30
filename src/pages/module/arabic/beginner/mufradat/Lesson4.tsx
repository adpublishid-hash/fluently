import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson4';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson4() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={4}
      LessonComponent={SourceLesson}
    />
  );
}
