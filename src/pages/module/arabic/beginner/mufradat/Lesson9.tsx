import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson9';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson9() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={9}
      LessonComponent={SourceLesson}
    />
  );
}
