import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson16';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson16() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={16}
      LessonComponent={SourceLesson}
    />
  );
}
