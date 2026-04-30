import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson19';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson19() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={19}
      LessonComponent={SourceLesson}
    />
  );
}
