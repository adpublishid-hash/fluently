import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson20';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson20() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={20}
      LessonComponent={SourceLesson}
    />
  );
}
