import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson14';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson14() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={14}
      LessonComponent={SourceLesson}
    />
  );
}
