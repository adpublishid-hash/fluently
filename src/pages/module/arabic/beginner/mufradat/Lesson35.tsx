import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson35';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson35() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={35}
      LessonComponent={SourceLesson}
    />
  );
}
