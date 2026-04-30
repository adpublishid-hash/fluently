import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson29';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson29() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={29}
      LessonComponent={SourceLesson}
    />
  );
}
