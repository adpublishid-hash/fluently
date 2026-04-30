import SourceLesson from '../../../../ai-kamus/arabic/pemula/mufradat/Lesson40';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerMufradatLesson40() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="mufradat"
      lessonId={40}
      LessonComponent={SourceLesson}
    />
  );
}
