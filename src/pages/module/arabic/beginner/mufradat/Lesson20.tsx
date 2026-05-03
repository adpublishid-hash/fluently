import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson20';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson20() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={20}
      LessonComponent={SourceLesson}
    />
  );
}
