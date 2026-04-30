import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson6';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson6() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={6}
      LessonComponent={SourceLesson}
    />
  );
}
