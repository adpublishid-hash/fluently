import SourceLesson from '../../../../ai-kamus/arabic/pemula/kalam/Lesson20';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerKalamLesson20() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kalam"
      lessonId={20}
      LessonComponent={SourceLesson}
    />
  );
}
