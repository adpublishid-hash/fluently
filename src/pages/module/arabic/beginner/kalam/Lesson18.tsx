import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson18';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson18() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={18}
      LessonComponent={SourceLesson}
    />
  );
}
