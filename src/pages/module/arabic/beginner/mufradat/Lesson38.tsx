import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson38';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson38() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={38}
      LessonComponent={SourceLesson}
    />
  );
}
