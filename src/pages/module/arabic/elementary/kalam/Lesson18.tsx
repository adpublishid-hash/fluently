import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson18';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson18() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={18}
      LessonComponent={SourceLesson}
    />
  );
}
