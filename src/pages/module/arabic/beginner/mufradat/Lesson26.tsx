import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson26';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson26() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={26}
      LessonComponent={SourceLesson}
    />
  );
}
