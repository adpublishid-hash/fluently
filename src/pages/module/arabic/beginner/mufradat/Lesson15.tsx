import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson15';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson15() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={15}
      LessonComponent={SourceLesson}
    />
  );
}
